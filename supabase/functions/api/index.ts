import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { publicRoutes } from './routes/public.ts';
import { employeesRoutes } from './routes/employees.ts';
import { attendanceRoutes } from './routes/attendance.ts';
import { dashboardRoutes } from './routes/dashboard.ts';
import { kiosksRoutes } from './routes/kiosks.ts';
import { settingsRoutes } from './routes/settings.ts';
import { requireAdmin } from './lib/auth.ts';
import { AppError } from './lib/errors.ts';

// Supabase routes Edge Functions at `/functions/v1/<function-name>/<path>`,
// so when this function is named `api` every request path arrives prefixed
// with `/api`. basePath strips that prefix so route definitions stay clean.
const app = new Hono().basePath('/api');

app.use('*', logger());
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Authorization', 'Content-Type', 'X-Kiosk-Id', 'apikey'],
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
}));

// Health
app.get('/health', (c) => c.json({ ok: true }));

// Public (no auth)
app.route('/match-face', publicRoutes.matchFace);
app.route('/invite', publicRoutes.invite);
app.route('/enroll', publicRoutes.enroll);
app.route('/kiosk', publicRoutes.kiosk);

// Admin (auth required)
app.use('/me', requireAdmin);
app.use('/employees/*', requireAdmin);
app.use('/employees', requireAdmin);
app.use('/attendance/*', requireAdmin);
app.use('/attendance', requireAdmin);
app.use('/dashboard/*', requireAdmin);
app.use('/dashboard', requireAdmin);
app.use('/reports/*', requireAdmin);
app.use('/kiosks/*', requireAdmin);
app.use('/kiosks', requireAdmin);
app.use('/settings', requireAdmin);

app.get('/me', (c) => c.json({ admin: c.get('admin') }));
app.route('/employees', employeesRoutes);
app.route('/attendance', attendanceRoutes);
app.route('/dashboard', dashboardRoutes);
app.route('/reports', dashboardRoutes); // weekly/monthly handled in same module
app.route('/kiosks', kiosksRoutes);
app.route('/settings', settingsRoutes);

// Error handler
app.onError((err, c) => {
  console.error('[api error]', err);
  if (err instanceof AppError) {
    return c.json({ error: err.message, code: err.code }, err.status);
  }
  return c.json({ error: 'Internal server error' }, 500);
});

app.notFound((c) => c.json({ error: 'Not found' }, 404));

Deno.serve(app.fetch);
