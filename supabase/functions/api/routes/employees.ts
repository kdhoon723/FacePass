import { Hono } from 'hono';
import { supabase } from '../lib/supabase.ts';
import { AppError } from '../lib/errors.ts';
import type { CreateEmployeeInput } from '../lib/types.ts';

function generateToken(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'; // base32 alphabet
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (b) => chars[b % chars.length]).join('');
}

export const employeesRoutes = new Hono();

// GET /employees
employeesRoutes.get('/', async (c) => {
  const { status, q, limit: limitStr, offset: offsetStr } = c.req.query();
  const limit = Math.min(parseInt(limitStr ?? '20', 10), 100);
  const offset = parseInt(offsetStr ?? '0', 10);

  let query = supabase
    .from('employees')
    .select('*, employee_embeddings(count)', { count: 'exact' })
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (q) {
    query = query.or(`name.ilike.%${q}%,employee_no.ilike.%${q}%`);
  }
  if (status === 'enrolled') {
    query = query.not('enrolled_at', 'is', null);
  } else if (status === 'pending') {
    query = query.is('enrolled_at', null);
  }

  const { data, error, count } = await query;
  if (error) throw new AppError(error.message, 500, 'DB_ERROR');

  const mapped = (data ?? []).map((emp) => ({
    ...emp,
    embedding_count: Array.isArray(emp.employee_embeddings)
      ? emp.employee_embeddings.length
      : (emp.employee_embeddings as { count: number } | null)?.count ?? 0,
    employee_embeddings: undefined,
  }));

  return c.json({ data: mapped, total: count ?? 0, limit, offset });
});

// POST /employees
employeesRoutes.post('/', async (c) => {
  const admin = c.get('admin');
  const body = await c.req.json<CreateEmployeeInput>();

  if (!body.name || !body.employee_no) {
    throw new AppError('name and employee_no are required', 400, 'MISSING_FIELDS');
  }

  const { data: emp, error: empErr } = await supabase
    .from('employees')
    .insert({
      name: body.name,
      employee_no: body.employee_no,
      department: body.department ?? null,
      email: body.email ?? null,
      phone: body.phone ?? null,
    })
    .select()
    .single();

  if (empErr) throw new AppError(empErr.message, 500, 'DB_ERROR');

  let invite_token: string | undefined;
  let invite_expires_at: string | undefined;

  if (body.invite !== false) {
    const token = generateToken(8);
    const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();
    const { error: invErr } = await supabase.from('enroll_invitations').insert({
      token,
      employee_id: emp.id,
      invited_by: admin.user_id,
      send_method: body.send_method ?? null,
      expires_at: expiresAt,
    });
    if (!invErr) {
      invite_token = token;
      invite_expires_at = expiresAt;
    }
  }

  return c.json({ ...emp, invite_token, invite_expires_at }, 201);
});

// GET /employees/:id
employeesRoutes.get('/:id', async (c) => {
  const id = c.req.param('id');
  const { data: emp, error } = await supabase
    .from('employees')
    .select('*')
    .eq('id', id)
    .is('deleted_at', null)
    .single();

  if (error || !emp) throw new AppError('Employee not found', 404, 'NOT_FOUND');

  const [{ data: embMeta }, { data: recentLogs }] = await Promise.all([
    supabase
      .from('employee_embeddings')
      .select('id, quality, captured_at, source')
      .eq('employee_id', id)
      .order('captured_at', { ascending: false }),
    supabase
      .from('attendance_logs')
      .select('id, type, status, similarity, recognized_at')
      .eq('employee_id', id)
      .order('recognized_at', { ascending: false })
      .limit(10),
  ]);

  return c.json({ ...emp, embeddings_meta: embMeta ?? [], recent_logs: recentLogs ?? [] });
});

// PATCH /employees/:id
employeesRoutes.patch('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json<Partial<CreateEmployeeInput>>();
  const allowed = ['name', 'employee_no', 'department', 'email', 'phone'] as const;
  const update: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) update[key] = body[key];
  }
  if (Object.keys(update).length === 0) {
    throw new AppError('No updatable fields provided', 400, 'NO_FIELDS');
  }

  const { data, error } = await supabase
    .from('employees')
    .update(update)
    .eq('id', id)
    .is('deleted_at', null)
    .select()
    .single();

  if (error || !data) throw new AppError('Employee not found or update failed', 404, 'NOT_FOUND');
  return c.json(data);
});

// DELETE /employees/:id  (soft delete)
employeesRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const { error } = await supabase
    .from('employees')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
    .is('deleted_at', null);

  if (error) throw new AppError(error.message, 500, 'DB_ERROR');
  return c.json({ success: true });
});

// POST /employees/:id/invitations  (re-send invite)
employeesRoutes.post('/:id/invitations', async (c) => {
  const id = c.req.param('id');
  const admin = c.get('admin');
  const body = await c.req.json<{ send_method?: 'sms' | 'email' | 'slack' }>().catch(() => ({}));

  const { data: emp, error: empErr } = await supabase
    .from('employees')
    .select('id')
    .eq('id', id)
    .is('deleted_at', null)
    .single();

  if (empErr || !emp) throw new AppError('Employee not found', 404, 'NOT_FOUND');

  const token = generateToken(8);
  const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();

  const { error: invErr } = await supabase.from('enroll_invitations').insert({
    token,
    employee_id: id,
    invited_by: admin.user_id,
    send_method: body.send_method ?? null,
    expires_at: expiresAt,
  });

  if (invErr) throw new AppError(invErr.message, 500, 'DB_ERROR');
  return c.json({ token, expires_at: expiresAt }, 201);
});
