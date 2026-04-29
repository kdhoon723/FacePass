-- =============================================================
-- FacePass · Demo Seed Data
-- Migration: 20260429_003_seed.sql
-- (개발/스테이징 환경 전용 — 프로덕션에서는 실행 금지)
-- =============================================================

-- =============================================================
-- KIOSKS (고정 UUID)
-- =============================================================
insert into public.kiosks (id, name, location, ip_addr, is_active)
values
  (
    '00000000-0000-0000-0000-000000000001',
    '본사 1층 정문',
    '서울시 강남구 테헤란로 123, 1층',
    '192.168.1.101',
    true
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    '본사 7층 라운지',
    '서울시 강남구 테헤란로 123, 7층',
    '192.168.1.107',
    true
  );

-- =============================================================
-- EMPLOYEES (고정 UUID, 5명)
-- =============================================================
insert into public.employees (id, employee_no, name, department, email, phone, enrolled_at)
values
  (
    'aaaaaaaa-0000-0000-0000-000000000001',
    'EMP-0001',
    '김지수',
    '개발팀',
    'user@example.invalid',
    '000-0000-0000',
    now()
  ),
  (
    'aaaaaaaa-0000-0000-0000-000000000002',
    'EMP-0002',
    '이민준',
    '디자인팀',
    'user@example.invalid',
    '000-0000-0000',
    now()
  ),
  (
    'aaaaaaaa-0000-0000-0000-000000000003',
    'EMP-0003',
    '박서연',
    '마케팅팀',
    'user@example.invalid',
    '000-0000-0000',
    now()
  ),
  (
    'aaaaaaaa-0000-0000-0000-000000000004',
    'EMP-0004',
    '최현우',
    '인사팀',
    'user@example.invalid',
    '000-0000-0000',
    now()
  ),
  (
    'aaaaaaaa-0000-0000-0000-000000000005',
    'EMP-0005',
    '정다은',
    '개발팀',
    'user@example.invalid',
    '000-0000-0000',
    now()
  );

-- =============================================================
-- EMPLOYEE EMBEDDINGS (더미 벡터 — 실제 얼굴 아님)
-- 각 직원당 3개의 임베딩 (정면 / 미소 / 자유각도 대용)
-- array_fill로 512차원 더미 벡터 생성
-- =============================================================

-- 김지수 (EMP-0001)
insert into public.employee_embeddings (employee_id, embedding, quality, source)
values
  ('aaaaaaaa-0000-0000-0000-000000000001', array_fill(0.01::float4, array[512])::vector(512), 0.982, 'enroll'),
  ('aaaaaaaa-0000-0000-0000-000000000001', array_fill(0.02::float4, array[512])::vector(512), 0.975, 'enroll'),
  ('aaaaaaaa-0000-0000-0000-000000000001', array_fill(0.03::float4, array[512])::vector(512), 0.961, 'enroll');

-- 이민준 (EMP-0002)
insert into public.employee_embeddings (employee_id, embedding, quality, source)
values
  ('aaaaaaaa-0000-0000-0000-000000000002', array_fill(0.11::float4, array[512])::vector(512), 0.990, 'enroll'),
  ('aaaaaaaa-0000-0000-0000-000000000002', array_fill(0.12::float4, array[512])::vector(512), 0.988, 'enroll'),
  ('aaaaaaaa-0000-0000-0000-000000000002', array_fill(0.13::float4, array[512])::vector(512), 0.979, 'enroll');

-- 박서연 (EMP-0003)
insert into public.employee_embeddings (employee_id, embedding, quality, source)
values
  ('aaaaaaaa-0000-0000-0000-000000000003', array_fill(0.21::float4, array[512])::vector(512), 0.993, 'enroll'),
  ('aaaaaaaa-0000-0000-0000-000000000003', array_fill(0.22::float4, array[512])::vector(512), 0.985, 'enroll'),
  ('aaaaaaaa-0000-0000-0000-000000000003', array_fill(0.23::float4, array[512])::vector(512), 0.971, 'enroll');

-- 최현우 (EMP-0004)
insert into public.employee_embeddings (employee_id, embedding, quality, source)
values
  ('aaaaaaaa-0000-0000-0000-000000000004', array_fill(0.31::float4, array[512])::vector(512), 0.978, 'enroll'),
  ('aaaaaaaa-0000-0000-0000-000000000004', array_fill(0.32::float4, array[512])::vector(512), 0.969, 'enroll'),
  ('aaaaaaaa-0000-0000-0000-000000000004', array_fill(0.33::float4, array[512])::vector(512), 0.955, 'enroll');

-- 정다은 (EMP-0005)
insert into public.employee_embeddings (employee_id, embedding, quality, source)
values
  ('aaaaaaaa-0000-0000-0000-000000000005', array_fill(0.41::float4, array[512])::vector(512), 0.995, 'enroll'),
  ('aaaaaaaa-0000-0000-0000-000000000005', array_fill(0.42::float4, array[512])::vector(512), 0.991, 'enroll'),
  ('aaaaaaaa-0000-0000-0000-000000000005', array_fill(0.43::float4, array[512])::vector(512), 0.983, 'enroll');

-- =============================================================
-- SAMPLE ATTENDANCE LOGS (오늘 오전 출근 기록)
-- =============================================================
insert into public.attendance_logs (employee_id, kiosk_id, type, status, similarity, recognized_at)
values
  ('aaaaaaaa-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'check_in', 'on_time', 0.9872, now() - interval '3 hours'),
  ('aaaaaaaa-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'check_in', 'on_time', 0.9541, now() - interval '3 hours 10 minutes'),
  ('aaaaaaaa-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'check_in', 'late',    0.9213, now() - interval '1 hour 30 minutes'),
  ('aaaaaaaa-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'check_in', 'on_time', 0.9654, now() - interval '2 hours 50 minutes'),
  ('aaaaaaaa-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000002', 'check_in', 'on_time', 0.9789, now() - interval '2 hours 45 minutes');
