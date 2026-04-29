-- =============================================================
-- FacePass · Initial Schema
-- Migration: 20260429_001_initial_schema.sql
-- =============================================================

-- Extensions
create extension if not exists "vector";
create extension if not exists "pgcrypto";

-- =============================================================
-- EMPLOYEES
-- =============================================================
create table public.employees (
  id           uuid        primary key default gen_random_uuid(),
  employee_no  text        not null unique,             -- e.g. EMP-0142
  name         text        not null,
  department   text,
  email        text,
  phone        text,
  photo_url    text,                                    -- Supabase Storage URL (등록 시 정면 셀카)
  created_at   timestamptz not null default now(),
  enrolled_at  timestamptz,                             -- 얼굴 등록 완료 시각
  deleted_at   timestamptz                              -- soft delete
);

create index employees_employee_no_idx
  on public.employees (employee_no)
  where deleted_at is null;

-- =============================================================
-- EMPLOYEE EMBEDDINGS  (ArcFace MobileNet, 512-dim)
-- =============================================================
create table public.employee_embeddings (
  id           uuid        primary key default gen_random_uuid(),
  employee_id  uuid        not null references public.employees(id) on delete cascade,
  embedding    vector(512) not null,
  quality      numeric(4,3),                            -- 검출 confidence 0~1
  captured_at  timestamptz not null default now(),
  source       text        not null
                 check (source in ('enroll', 'auto-update'))  -- 등록 / 자동 학습
);

-- HNSW index for fast ANN cosine search
create index employee_embeddings_vec_idx
  on public.employee_embeddings
  using hnsw (embedding vector_cosine_ops);

create index employee_embeddings_employee_id_idx
  on public.employee_embeddings (employee_id);

-- =============================================================
-- KIOSKS
-- =============================================================
create table public.kiosks (
  id           uuid        primary key default gen_random_uuid(),
  name         text        not null,                   -- e.g. "본사 7층 라운지"
  location     text,
  ip_addr      inet,
  created_at   timestamptz not null default now(),
  last_seen_at timestamptz,
  is_active    boolean     not null default true
);

-- =============================================================
-- ATTENDANCE LOGS
-- =============================================================
create type public.attendance_type as enum ('check_in', 'check_out');
create type public.attendance_status as enum ('on_time', 'late', 'absent', 'leave');

create table public.attendance_logs (
  id            uuid                     primary key default gen_random_uuid(),
  employee_id   uuid                     not null references public.employees(id) on delete cascade,
  kiosk_id      uuid                     references public.kiosks(id) on delete set null,
  type          public.attendance_type   not null,
  status        public.attendance_status not null default 'on_time',
  similarity    numeric(5,4),            -- cosine similarity vs matched embedding
  recognized_at timestamptz              not null default now(),
  raw           jsonb                    -- 디버그용 부가 정보
);

create index attendance_logs_employee_idx
  on public.attendance_logs (employee_id, recognized_at desc);

create index attendance_logs_recognized_at_idx
  on public.attendance_logs (recognized_at desc);

-- =============================================================
-- ENROLL INVITATIONS
-- =============================================================
create table public.enroll_invitations (
  token        text        primary key,                -- 8자 랜덤 토큰
  employee_id  uuid        not null references public.employees(id) on delete cascade,
  invited_by   uuid        references auth.users(id),
  send_method  text        check (send_method in ('sms', 'email', 'slack')),
  created_at   timestamptz not null default now(),
  expires_at   timestamptz not null default (now() + interval '72 hours'),
  used_at      timestamptz
);

create index enroll_invitations_employee_id_idx
  on public.enroll_invitations (employee_id);

-- =============================================================
-- ADMINS  (Supabase Auth users 매핑)
-- =============================================================
create table public.admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  role       text not null default 'admin'
               check (role in ('owner', 'admin', 'viewer')),
  created_at timestamptz not null default now()
);

-- =============================================================
-- RPC: match_face
-- pgvector cosine similarity 검색 (Edge Function에서 호출)
-- =============================================================
create or replace function public.match_face(
  query_embedding    vector(512),
  similarity_threshold float,
  match_count        int default 1
)
returns table (
  employee_id  uuid,
  name         text,
  employee_no  text,
  department   text,
  similarity   float
)
language sql stable
as $$
  select
    e.id            as employee_id,
    e.name,
    e.employee_no,
    e.department,
    1 - (ee.embedding <=> query_embedding) as similarity
  from public.employee_embeddings ee
  join public.employees e on e.id = ee.employee_id
  where e.deleted_at is null
    and (1 - (ee.embedding <=> query_embedding)) >= similarity_threshold
  order by ee.embedding <=> query_embedding
  limit match_count;
$$;
