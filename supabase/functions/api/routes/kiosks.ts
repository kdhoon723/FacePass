import { Hono } from 'hono';
import { supabase } from '../lib/supabase.ts';
import { AppError } from '../lib/errors.ts';

export const kiosksRoutes = new Hono();

// GET /kiosks
kiosksRoutes.get('/', async (c) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('kiosks')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw new AppError(error.message, 500, 'DB_ERROR');

  // Count today's events per kiosk
  const { data: logs } = await supabase
    .from('attendance_logs')
    .select('kiosk_id')
    .gte('recognized_at', todayStart.toISOString());

  const eventCount: Record<string, number> = {};
  for (const log of logs ?? []) {
    if (log.kiosk_id) eventCount[log.kiosk_id] = (eventCount[log.kiosk_id] ?? 0) + 1;
  }

  const result = (data ?? []).map((k) => ({ ...k, today_events: eventCount[k.id] ?? 0 }));
  return c.json(result);
});

// POST /kiosks
kiosksRoutes.post('/', async (c) => {
  const body = await c.req.json<{
    name: string;
    location?: string;
    ip_addr?: string;
  }>();

  if (!body.name) throw new AppError('name is required', 400, 'MISSING_FIELDS');

  const { data, error } = await supabase
    .from('kiosks')
    .insert({ name: body.name, location: body.location ?? null, ip_addr: body.ip_addr ?? null })
    .select()
    .single();

  if (error) throw new AppError(error.message, 500, 'DB_ERROR');
  return c.json(data, 201);
});

// PATCH /kiosks/:id
kiosksRoutes.patch('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json<{
    name?: string;
    location?: string;
    ip_addr?: string;
    is_active?: boolean;
  }>();

  const allowed = ['name', 'location', 'ip_addr', 'is_active'] as const;
  const update: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) update[key] = body[key];
  }
  if (Object.keys(update).length === 0) {
    throw new AppError('No updatable fields provided', 400, 'NO_FIELDS');
  }

  const { data, error } = await supabase
    .from('kiosks')
    .update(update)
    .eq('id', id)
    .select()
    .single();

  if (error || !data) throw new AppError('Kiosk not found or update failed', 404, 'NOT_FOUND');
  return c.json(data);
});
