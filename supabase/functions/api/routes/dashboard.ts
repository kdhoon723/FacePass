import { Hono } from 'hono';
import { supabase } from '../lib/supabase.ts';
import { AppError } from '../lib/errors.ts';

export const dashboardRoutes = new Hono();

// GET /dashboard
dashboardRoutes.get('/', async (c) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayIso = todayStart.toISOString();

  const [
    { count: total_employees },
    { data: todayLogs, error: logsErr },
  ] = await Promise.all([
    supabase
      .from('employees')
      .select('*', { count: 'exact', head: true })
      .is('deleted_at', null)
      .not('enrolled_at', 'is', null),
    supabase
      .from('attendance_logs')
      .select('employee_id, type, status, recognized_at, employees(department)')
      .gte('recognized_at', todayIso),
  ]);

  if (logsErr) throw new AppError(logsErr.message, 500, 'DB_ERROR');

  const logs = todayLogs ?? [];
  const checkIns = logs.filter((l) => l.type === 'check_in');

  // Deduplicate check-ins per employee
  const seen = new Set<string>();
  let checked_in_today = 0;
  let late_today = 0;
  for (const log of checkIns) {
    if (!seen.has(log.employee_id)) {
      seen.add(log.employee_id);
      checked_in_today++;
      if (log.status === 'late') late_today++;
    }
  }

  const absent_today = Math.max(0, (total_employees ?? 0) - checked_in_today);

  // Hourly distribution (0–23)
  const hourly: Record<number, { check_in: number; check_out: number }> = {};
  for (const log of logs) {
    const h = new Date(log.recognized_at).getHours();
    if (!hourly[h]) hourly[h] = { check_in: 0, check_out: 0 };
    if (log.type === 'check_in') hourly[h].check_in++;
    else hourly[h].check_out++;
  }
  const hourlyArr = Array.from({ length: 24 }, (_, h) => ({
    hour: h,
    check_in: hourly[h]?.check_in ?? 0,
    check_out: hourly[h]?.check_out ?? 0,
  }));

  // By department
  const by_department: Record<string, number> = {};
  for (const log of checkIns) {
    const dept = (Array.isArray(log.employees) ? log.employees[0] : log.employees)?.department ?? 'Unknown';
    by_department[dept] = (by_department[dept] ?? 0) + 1;
  }

  // Simple alerts
  const alerts: string[] = [];
  if (late_today > 0) alerts.push(`오늘 지각 ${late_today}명`);
  if (absent_today > 0) alerts.push(`미출근 ${absent_today}명`);

  return c.json({
    kpi: { total_employees: total_employees ?? 0, checked_in_today, late_today, absent_today },
    hourly: hourlyArr,
    by_department,
    alerts,
  });
});

// GET /reports/weekly
dashboardRoutes.get('/weekly', async (c) => {
  // Last 7 calendar days (Mon–today)
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    days.push(d.toISOString());
  }
  const from = days[0];

  const { data: logs, error } = await supabase
    .from('attendance_logs')
    .select('employee_id, type, status, recognized_at')
    .eq('type', 'check_in')
    .gte('recognized_at', from);

  if (error) throw new AppError(error.message, 500, 'DB_ERROR');

  const { count: total_employees } = await supabase
    .from('employees')
    .select('*', { count: 'exact', head: true })
    .is('deleted_at', null)
    .not('enrolled_at', 'is', null);

  const result = days.map((dayIso) => {
    const dayDate = new Date(dayIso);
    const nextDay = new Date(dayDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const dayLogs = (logs ?? []).filter((l) => {
      const t = new Date(l.recognized_at);
      return t >= dayDate && t < nextDay;
    });

    const seen = new Map<string, string>();
    for (const log of dayLogs) {
      if (!seen.has(log.employee_id)) seen.set(log.employee_id, log.status);
    }

    let on_time = 0;
    let late = 0;
    for (const status of seen.values()) {
      if (status === 'late') late++;
      else on_time++;
    }
    const absent = Math.max(0, (total_employees ?? 0) - on_time - late);

    return {
      date: dayIso.slice(0, 10),
      on_time,
      late,
      absent,
    };
  });

  return c.json({ data: result });
});

// GET /reports/monthly
dashboardRoutes.get('/monthly', async (c) => {
  const months: { label: string; from: string; to: string }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - i);
    d.setHours(0, 0, 0, 0);
    const from = d.toISOString();
    const end = new Date(d);
    end.setMonth(end.getMonth() + 1);
    months.push({ label: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`, from, to: end.toISOString() });
  }

  const from = months[0].from;
  const { data: logs, error } = await supabase
    .from('attendance_logs')
    .select('employee_id, status, recognized_at')
    .eq('type', 'check_in')
    .gte('recognized_at', from);

  if (error) throw new AppError(error.message, 500, 'DB_ERROR');

  const { count: total_employees } = await supabase
    .from('employees')
    .select('*', { count: 'exact', head: true })
    .is('deleted_at', null)
    .not('enrolled_at', 'is', null);

  const monthly = months.map(({ label, from: mFrom, to: mTo }) => {
    const mLogs = (logs ?? []).filter((l) => l.recognized_at >= mFrom && l.recognized_at < mTo);
    const seen = new Map<string, string>();
    for (const log of mLogs) {
      if (!seen.has(log.employee_id)) seen.set(log.employee_id, log.status);
    }
    const on_time = Array.from(seen.values()).filter((s) => s === 'on_time').length;
    const rate = total_employees ? Math.round((on_time / total_employees) * 100) : 0;
    return { month: label, on_time_rate: rate };
  });

  // TOP 5 on-time employees (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentLogs = (logs ?? []).filter((l) => new Date(l.recognized_at) >= thirtyDaysAgo);
  const empOnTime: Record<string, number> = {};
  for (const log of recentLogs) {
    if (log.status === 'on_time') {
      empOnTime[log.employee_id] = (empOnTime[log.employee_id] ?? 0) + 1;
    }
  }
  const top5 = Object.entries(empOnTime)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([employee_id, days_on_time]) => ({ employee_id, days_on_time }));

  return c.json({ monthly, top5_attendees: top5 });
});
