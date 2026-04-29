import { createClient } from '@supabase/supabase-js';

// service_role singleton — bypasses RLS by default.
// Only available inside Supabase Edge Function runtime.
export const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);
