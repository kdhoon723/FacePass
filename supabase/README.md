# FacePass · Supabase 셋업 가이드

## 폴더 구조

```
supabase/
├── migrations/
│   ├── 20260429_001_initial_schema.sql   # 테이블, 인덱스, match_face RPC
│   ├── 20260429_002_rls_policies.sql     # RLS 활성화 + anon/authenticated 완전 차단
│   ├── 20260429_003_seed.sql             # 데모 데이터 (선택)
│   └── 20260429_004_settings.sql        # app_settings 싱글톤 테이블
├── functions/
│   └── api/                             # 단일 Hono Edge Function
│       ├── index.ts                     # Hono 앱 진입점
│       ├── deno.json                    # JSR imports (hono, supabase-js)
│       ├── lib/
│       │   ├── supabase.ts              # service_role 싱글턴
│       │   ├── auth.ts                  # requireAdmin 미들웨어
│       │   ├── errors.ts               # AppError 클래스
│       │   └── types.ts                # 공유 DTO 타입
│       └── routes/
│           ├── public.ts               # /match-face, /invite/:token, /enroll/:token
│           ├── employees.ts            # /employees CRUD + invitations
│           ├── attendance.ts           # /attendance, /attendance/today
│           ├── dashboard.ts            # /dashboard, /reports/weekly, /reports/monthly
│           ├── kiosks.ts               # /kiosks CRUD
│           └── settings.ts             # /settings
└── README.md
```

---

## 아키텍처 개요

- **RLS는 켜져 있지만 정책은 없음** — anon/authenticated 역할의 GRANT를 전부 회수.
  PostgREST나 supabase-js 클라이언트로 DB에 직접 접근 불가.
- **모든 DB 접근은 `api` Edge Function 경유** — service_role 키로 RLS를 우회.
- **인증** — Supabase Auth JWT를 `requireAdmin` 미들웨어가 검증, admins 테이블로 권한 확인.

---

## 셋업 순서

### 1. Supabase 프로젝트 생성

1. [app.supabase.com](https://app.supabase.com) → **New project**
2. Region: **ap-northeast-2 (Seoul)**
3. Database password 안전하게 저장

### 2. SQL Migrations 실행

Supabase 대시보드 → **SQL Editor**에서 순서대로 실행:

```
1. migrations/20260429_001_initial_schema.sql   ← 테이블 + pgvector + match_face RPC
2. migrations/20260429_002_rls_policies.sql     ← RLS 잠금 (anon 차단)
3. migrations/20260429_003_seed.sql             ← 개발 환경에서만 선택적으로 실행
4. migrations/20260429_004_settings.sql         ← app_settings 싱글톤
```

> pgvector 익스텐션은 마이그레이션 001에서 자동 활성화됩니다.

### 3. Edge Function 배포

```bash
# Supabase CLI 설치 (없는 경우)
npm install -g supabase

# 프로젝트 로그인 및 링크
supabase login
supabase link --project-ref <your-project-ref>

# api 함수 배포 (--no-verify-jwt: Hono 미들웨어가 JWT 직접 검증)
supabase functions deploy api --no-verify-jwt
```

### 4. 환경 변수

**Edge Function** — SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY는 자동 주입됩니다.

**클라이언트** — 프로젝트 루트에 `.env.local` 파일 생성:

```env
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

> Supabase 대시보드 → **Settings → API**에서 값 확인.  
> `service_role` 키는 절대 클라이언트에 포함하지 마세요.

### 5. 첫 관리자 추가

1. 대시보드 → **Authentication → Users** → **Add user**로 관리자 계정 생성
2. 생성된 user UUID 확인 후 SQL Editor에서 실행:

```sql
insert into public.admins (user_id, role)
values ('<your-auth-user-uuid>', 'owner');
```

### 6. 키오스크 추가

```bash
# API로 추가 (관리자 Bearer 토큰 필요)
curl -X POST https://<project-ref>.supabase.co/functions/v1/api/kiosks \
  -H "Authorization: Bearer <access-token>" \
  -H "apikey: <anon-key>" \
  -H "Content-Type: application/json" \
  -d '{"name": "본사 1층 정문", "location": "서울시 강남구 123, 1층"}'
```

---

## API 라우트 요약

### Public (인증 불필요)

| Method | Path | 설명 |
|--------|------|------|
| POST | `/match-face` | 얼굴 임베딩 매칭 + 출석 로그 기록 |
| GET | `/invite/:token` | 초대 토큰 검증 |
| POST | `/enroll/:token` | 얼굴 임베딩 등록 |

### Admin (Bearer JWT 필요)

| Method | Path | 설명 |
|--------|------|------|
| GET | `/me` | 내 관리자 정보 |
| GET/POST | `/employees` | 직원 목록 / 생성 |
| GET/PATCH/DELETE | `/employees/:id` | 직원 상세 / 수정 / 삭제 |
| POST | `/employees/:id/invitations` | 초대 재발송 |
| GET | `/attendance` | 출석 로그 |
| GET | `/attendance/today` | 오늘 요약 |
| GET | `/dashboard` | KPI + 차트 데이터 |
| GET | `/reports/weekly` | 주간 리포트 |
| GET | `/reports/monthly` | 월별 리포트 |
| GET/POST/PATCH | `/kiosks`, `/kiosks/:id` | 키오스크 관리 |
| GET/PATCH | `/settings` | 인식 정책 설정 |

---

## 스키마 요약

| 테이블 | 용도 |
|--------|------|
| `employees` | 직원 마스터 (soft delete) |
| `employee_embeddings` | ArcFace 512-dim 벡터 (직원당 N개) |
| `kiosks` | 출입구 키오스크 단말 |
| `attendance_logs` | 출퇴근 기록 |
| `enroll_invitations` | 얼굴 등록 초대 토큰 (72h 유효) |
| `admins` | Auth user → 관리자 역할 매핑 |
| `app_settings` | 인식 정책 싱글톤 |
