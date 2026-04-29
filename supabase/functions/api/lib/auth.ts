import type { MiddlewareHandler } from 'hono';
import { supabase } from './supabase.ts';
import { AppError } from './errors.ts';
import type { AdminContext } from './types.ts';

declare module 'hono' {
  interface ContextVariableMap {
    admin: AdminContext;
  }
}

export const requireAdmin: MiddlewareHandler = async (c, next) => {
  const auth = c.req.header('Authorization');
  if (!auth?.startsWith('Bearer ')) {
    throw new AppError('Missing bearer token', 401, 'NO_TOKEN');
  }
  const token = auth.slice(7);
  const { data: userData, error: userErr } = await supabase.auth.getUser(token);
  if (userErr || !userData.user) {
    throw new AppError('Invalid token', 401, 'BAD_TOKEN');
  }
  const { data: admin, error: adminErr } = await supabase
    .from('admins')
    .select('user_id, role')
    .eq('user_id', userData.user.id)
    .maybeSingle();
  if (adminErr || !admin) {
    throw new AppError('Not an admin', 403, 'NOT_ADMIN');
  }
  c.set('admin', {
    user_id: admin.user_id,
    email: userData.user.email ?? '',
    role: admin.role,
  });
  await next();
};
