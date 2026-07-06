# FacePass

FacePass는 브라우저에서 얼굴 임베딩을 생성하고, Supabase Edge Function을 통해 출석 체크를 처리하는 사내 출석관리 프로토타입입니다.

## 주요 기능

- 온디바이스 얼굴 검출/임베딩 생성
- 키오스크 출근/퇴근 체크인 화면
- 직원 초대 및 얼굴 등록 플로우
- 관리자용 직원·출석·키오스크 대시보드
- Supabase Edge Function API + Postgres/pgvector 스키마
- Vite + React + TypeScript 프론트엔드

## 저장소 구조

```text
src/        프론트엔드 앱과 API 클라이언트
supabase/   마이그레이션, Edge Function, 셋업 문서
design-reference/  UI 이식 과정에서 참고한 디자인 코드
```

## 환경 변수

```bash
cp .env.example .env.local
```

프론트엔드에는 Supabase URL과 anon key만 설정합니다. `SUPABASE_SERVICE_ROLE_KEY`는 Edge Function 런타임/배포 플랫폼의 secret으로만 주입하고 저장소에 커밋하지 않습니다.

## 개발

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

## 보안/개인정보 안내

- 이 저장소에는 실제 직원 얼굴 이미지, 실제 얼굴 임베딩, 운영 DB 덤프를 포함하지 않습니다.
- `supabase/migrations/*_seed.sql`의 직원/연락처/임베딩 값은 데모용 더미 데이터입니다.
- 실제 운영 배포에는 별도의 인증, 키 관리, 개인정보 처리방침, 접근 로그 정책이 필요합니다.

## 라이선스

MIT License
