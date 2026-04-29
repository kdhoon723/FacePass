-- supabase/migrations/20260429_004_settings.sql
create table public.app_settings (
  id int primary key default 1 check (id = 1), -- singleton
  recognition_threshold numeric(3,2) not null default 0.85,
  liveness_check boolean not null default true,
  duplicate_prevent_minutes int not null default 5,
  default_check_in_time time not null default '09:00',
  late_grace_minutes int not null default 10,
  auto_check_out_time time not null default '23:00',
  retention_days int not null default 90,
  store_raw_images boolean not null default false,
  flexible_departments text[] not null default '{}',
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);
insert into public.app_settings (id) values (1);
alter table public.app_settings enable row level security;
