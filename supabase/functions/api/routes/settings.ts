import { Hono } from 'hono';
import { supabase } from '../lib/supabase.ts';
import { AppError } from '../lib/errors.ts';
import type { AppSettings } from '../lib/types.ts';

export const settingsRoutes = new Hono();

// GET /settings
settingsRoutes.get('/', async (c) => {
  const { data, error } = await supabase
    .from('app_settings')
    .select('*')
    .eq('id', 1)
    .single();

  if (error || !data) throw new AppError('Settings not found', 500, 'SETTINGS_NOT_FOUND');

  const { id: _id, updated_by: _ub, ...settings } = data;
  return c.json(settings as AppSettings);
});

// PATCH /settings
settingsRoutes.patch('/', async (c) => {
  const admin = c.get('admin');
  const body = await c.req.json<Partial<AppSettings>>();

  const allowed: Array<keyof AppSettings> = [
    'recognition_threshold',
    'liveness_check',
    'duplicate_prevent_minutes',
    'default_check_in_time',
    'late_grace_minutes',
    'auto_check_out_time',
    'retention_days',
    'store_raw_images',
    'flexible_departments',
  ];

  const update: Record<string, unknown> = { updated_at: new Date().toISOString(), updated_by: admin.user_id };
  for (const key of allowed) {
    if (key in body) update[key] = body[key];
  }

  const { data, error } = await supabase
    .from('app_settings')
    .update(update)
    .eq('id', 1)
    .select()
    .single();

  if (error || !data) throw new AppError(error?.message ?? 'Update failed', 500, 'DB_ERROR');

  const { id: _id, updated_by: _ub, ...settings } = data;
  return c.json(settings as AppSettings);
});
