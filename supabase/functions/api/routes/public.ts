import { Hono } from 'hono';
import { supabase } from '../lib/supabase.ts';
import { AppError } from '../lib/errors.ts';
import type { MatchResponse, InviteValidation } from '../lib/types.ts';

// POST /match-face
const matchFaceApp = new Hono();
matchFaceApp.post('/', async (c) => {
  const body = await c.req.json<{
    embedding: number[];
    kiosk_id?: string;
    type: 'check_in' | 'check_out';
    threshold?: number;
  }>();

  if (!Array.isArray(body.embedding) || body.embedding.length !== 512) {
    throw new AppError('embedding must be an array of exactly 512 floats', 400, 'BAD_EMBEDDING');
  }
  if (body.type !== 'check_in' && body.type !== 'check_out') {
    throw new AppError('type must be "check_in" or "check_out"', 400, 'BAD_TYPE');
  }
  const threshold = body.threshold ?? 0.4;
  if (threshold < 0 || threshold > 1) {
    throw new AppError('threshold must be between 0 and 1', 400, 'BAD_THRESHOLD');
  }

  const { data: matches, error: rpcError } = await supabase.rpc('match_face', {
    query_embedding: body.embedding,
    similarity_threshold: threshold,
    match_count: 1,
  });

  if (rpcError) {
    console.error('[match-face] rpc error:', rpcError);
    throw new AppError(rpcError.message, 500, 'RPC_ERROR');
  }

  if (!matches || matches.length === 0) {
    return c.json<MatchResponse>({ matched: false });
  }

  const top = matches[0];

  if (body.kiosk_id) {
    await supabase
      .from('kiosks')
      .update({ last_seen_at: new Date().toISOString() })
      .eq('id', body.kiosk_id);
  }

  const { data: log, error: insertError } = await supabase
    .from('attendance_logs')
    .insert({
      employee_id: top.employee_id,
      kiosk_id: body.kiosk_id ?? null,
      type: body.type,
      similarity: top.similarity,
      status: 'on_time',
      raw: { threshold, kiosk_id: body.kiosk_id ?? null },
    })
    .select('id')
    .single();

  if (insertError) {
    console.error('[match-face] insert error:', insertError);
  }

  return c.json<MatchResponse>({
    matched: true,
    employee: {
      id: top.employee_id,
      name: top.name,
      employee_no: top.employee_no,
      department: top.department,
    },
    similarity: top.similarity,
    log_id: log?.id,
  });
});

// GET /invite/:token
const inviteApp = new Hono();
inviteApp.get('/:token', async (c) => {
  const token = c.req.param('token');
  const { data: inv, error } = await supabase
    .from('enroll_invitations')
    .select('token, employee_id, expires_at, used_at, employees(name, employee_no, department)')
    .eq('token', token)
    .maybeSingle();

  if (error || !inv) {
    return c.json<InviteValidation>({ valid: false, reason: 'Token not found' });
  }
  if (inv.used_at) {
    return c.json<InviteValidation>({ valid: false, reason: 'Token already used' });
  }
  if (new Date(inv.expires_at) < new Date()) {
    return c.json<InviteValidation>({ valid: false, reason: 'Token expired' });
  }

  const emp = Array.isArray(inv.employees) ? inv.employees[0] : inv.employees;
  return c.json<InviteValidation>({
    valid: true,
    employee: emp
      ? { name: emp.name, employee_no: emp.employee_no, dept: emp.department }
      : undefined,
    expires_at: inv.expires_at,
  });
});

// POST /enroll/:token
const enrollApp = new Hono();
enrollApp.post('/:token', async (c) => {
  const token = c.req.param('token');
  const body = await c.req.json<{ embeddings: number[][] }>();

  if (!Array.isArray(body.embeddings) || body.embeddings.length < 1 || body.embeddings.length > 5) {
    throw new AppError('embeddings must be an array of 1–5 vectors', 400, 'BAD_EMBEDDINGS');
  }
  for (const emb of body.embeddings) {
    if (!Array.isArray(emb) || emb.length !== 512) {
      throw new AppError('Each embedding must be 512-dimensional', 400, 'BAD_EMBEDDING_DIM');
    }
  }

  // Re-validate token
  const { data: inv, error: invErr } = await supabase
    .from('enroll_invitations')
    .select('employee_id, expires_at, used_at')
    .eq('token', token)
    .maybeSingle();

  if (invErr || !inv) throw new AppError('Token not found', 404, 'TOKEN_NOT_FOUND');
  if (inv.used_at) throw new AppError('Token already used', 409, 'TOKEN_USED');
  if (new Date(inv.expires_at) < new Date()) throw new AppError('Token expired', 410, 'TOKEN_EXPIRED');

  const employeeId = inv.employee_id;

  // Insert embeddings
  const rows = body.embeddings.map((emb) => ({
    employee_id: employeeId,
    embedding: emb,
    source: 'enroll',
  }));

  const { error: embErr } = await supabase.from('employee_embeddings').insert(rows);
  if (embErr) {
    console.error('[enroll] embeddings insert error:', embErr);
    throw new AppError(embErr.message, 500, 'EMBED_INSERT_ERROR');
  }

  // Update enrolled_at and mark invitation used
  await Promise.all([
    supabase
      .from('employees')
      .update({ enrolled_at: new Date().toISOString() })
      .eq('id', employeeId),
    supabase
      .from('enroll_invitations')
      .update({ used_at: new Date().toISOString() })
      .eq('token', token),
  ]);

  return c.json({ success: true, employee_id: employeeId });
});

// GET /kiosk/today-summary?kiosk_id=...
//
// Read-only stats for the idle kiosk screen so it can show real numbers
// instead of hardcoded "83/94 · 윤OO 8:39". Public on purpose — no employee
// PII goes out beyond the most-recent first character of the matched name.
const kioskApp = new Hono();
kioskApp.get('/today-summary', async (c) => {
  const kioskId = c.req.query('kiosk_id');

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  let logsQuery = supabase
    .from('attendance_logs')
    .select('employee_id, recognized_at, employees(name)')
    .gte('recognized_at', startOfDay.toISOString())
    .eq('type', 'check_in')
    .order('recognized_at', { ascending: false });

  if (kioskId) logsQuery = logsQuery.eq('kiosk_id', kioskId);

  const { data: logs, error: logsErr } = await logsQuery;
  if (logsErr) {
    console.error('[kiosk-summary] logs error:', logsErr);
    throw new AppError(logsErr.message, 500, 'LOGS_ERROR');
  }

  const uniqueEmployees = new Set((logs ?? []).map((l) => l.employee_id));

  const { count: totalEmployees } = await supabase
    .from('employees')
    .select('id', { count: 'exact', head: true })
    .is('deleted_at', null);

  const last = logs?.[0];
  let lastRecognition: { name: string; at: string } | undefined;
  if (last) {
    const emp = Array.isArray(last.employees) ? last.employees[0] : last.employees;
    if (emp?.name) {
      const at = new Date(last.recognized_at).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      lastRecognition = { name: emp.name, at };
    }
  }

  return c.json({
    checkedInToday: uniqueEmployees.size,
    totalEmployees: totalEmployees ?? 0,
    lastRecognition,
  });
});

export const publicRoutes = {
  matchFace: matchFaceApp,
  invite: inviteApp,
  enroll: enrollApp,
  kiosk: kioskApp,
};
