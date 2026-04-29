import { Hono } from 'hono';
import { supabase } from '../lib/supabase.ts';
import { AppError } from '../lib/errors.ts';

export const attendanceRoutes = new Hono();

// GET /attendance
attendanceRoutes.get('/', async (c) => {
  const { from, to, dept, status, limit: limitStr, offset: offsetStr } = c.req.query();
  const limit = Math.min(parseInt(limitStr ?? '50', 10), 200);
  const offset = parseInt(offsetStr ?? '0', 10);

  let query = supabase
    .from('attendance_logs')
    .select(
      'id, type, status, similarity, recognized_at, kiosk_id, employees(id, name, employee_no, department)',
      { count: 'exact' },
    )
    .order('recognized_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (from) query = query.gte('recognized_at', from);
  if (to) query = query.lte('recognized_at', to);
  if (status) query = query.eq('status', status);

  const { data, error, count } = await query;
  if (error) throw new AppError(error.message, 500, 'DB_ERROR');

  let rows = data ?? [];
  if (dept) {
    rows = rows.filter((r) => {
      const emp = Array.isArray(r.employees) ? r.employees[0] : r.employees;
      return emp?.department === dept;
    });
  }

  return c.json({ data: rows, total: count ?? 0, limit, offset });
});

// GET /attendance/today
attendanceRoutes.get('/today', async (c) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('attendance_logs')
    .select('employee_id, type, status, employees(department)')
    .eq('type', 'check_in')
    .gte('recognized_at', todayStart.toISOString());

  if (error) throw new AppError(error.message, 500, 'DB_ERROR');

  const logs = data ?? [];

  // Deduplicate by employee (first check-in of the day)
  const seen = new Map<string, (typeof logs)[0]>();
  for (const log of logs) {
    if (!seen.has(log.employee_id)) seen.set(log.employee_id, log);
  }

  let check_in_count = 0;
  let late_count = 0;
  const by_department: Record<string, { on_time: number; late: number }> = {};

  for (const log of seen.values()) {
    check_in_count++;
    const dept = (Array.isArray(log.employees) ? log.employees[0] : log.employees)?.department ?? 'Unknown';
    if (!by_department[dept]) by_department[dept] = { on_time: 0, late: 0 };
    if (log.status === 'late') {
      late_count++;
      by_department[dept].late++;
    } else {
      by_department[dept].on_time++;
    }
  }

  const { count: total_employees } = await supabase
    .from('employees')
    .select('*', { count: 'exact', head: true })
    .is('deleted_at', null)
    .not('enrolled_at', 'is', null);

  const absent_count = Math.max(0, (total_employees ?? 0) - check_in_count);

  return c.json({ check_in_count, late_count, absent_count, by_department });
});
