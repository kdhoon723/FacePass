-- FacePass: All DB access goes through the `api` Edge Function (service_role).
-- RLS stays enabled as a defense-in-depth net: anon/authenticated keys can never
-- bypass the function gateway because no policies grant them access.

alter table public.employees             enable row level security;
alter table public.employee_embeddings   enable row level security;
alter table public.attendance_logs       enable row level security;
alter table public.kiosks                enable row level security;
alter table public.enroll_invitations    enable row level security;
alter table public.admins                enable row level security;

-- Revoke anon/authenticated grants so PostgREST + supabase-js client cannot read
-- anything directly even with the anon key. service_role bypasses RLS by default.
revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;
revoke all on all functions in schema public from anon, authenticated;

-- Future tables in the public schema also locked down by default.
alter default privileges in schema public revoke all on tables from anon, authenticated;
alter default privileges in schema public revoke all on sequences from anon, authenticated;
alter default privileges in schema public revoke all on functions from anon, authenticated;
