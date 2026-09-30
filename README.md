# FacePass

브라우저에서 얼굴 특징값을 만들고 출퇴근 기록까지 연결하는 사내 출석관리 프로토타입입니다. 직원 등록, 키오스크 인증, 관리자 조회를 하나의 흐름으로 구성하고, 출석 데이터와 얼굴 임베딩은 Supabase에서 관리합니다.

## 동작 흐름

1. 관리자가 직원을 추가하고 얼굴 등록용 초대 링크를 발급합니다.
2. 직원은 초대 링크에서 카메라로 얼굴을 세 번 촬영해 임베딩을 등록합니다.
3. 키오스크는 브라우저에서 얼굴을 검출하고 512차원 임베딩을 생성합니다.
4. Supabase Edge Function이 pgvector로 등록된 임베딩을 비교하고 출근 또는 퇴근 기록을 남깁니다.
5. 관리자는 대시보드에서 직원, 출석 기록, 리포트, 키오스크와 인식 정책을 확인합니다.

## 구현된 기능

- 출근·퇴근을 선택할 수 있는 얼굴인식 키오스크
- 초대 토큰을 이용한 직원 얼굴 등록
- 직원 목록과 출석 기록 조회
- 일간 현황 및 주간·월간 리포트
- 키오스크와 인식 임계값·출퇴근 시간 설정
- Supabase Auth 기반 관리자 로그인

## 구현 구조

| 영역 | 역할 | 사용 기술 |
| --- | --- | --- |
| 얼굴 처리 | 카메라 입력, 얼굴 검출, 임베딩 생성 | MediaPipe Tasks Vision, ONNX Runtime Web |
| 웹 애플리케이션 | 키오스크·등록·관리자 화면 | React, TypeScript, Vite |
| API | 공개 등록·인식 API와 관리자 API | Supabase Edge Functions, Hono |
| 데이터 | 직원, 임베딩, 출석 기록, 설정 | PostgreSQL, pgvector |
| 인증 | 관리자 세션과 API 권한 확인 | Supabase Auth |

얼굴 검출과 임베딩 생성은 브라우저에서 수행합니다. 현재 API 요청에는 카메라 원본 이미지 대신 생성된 임베딩 배열을 담습니다. 데이터베이스 직접 접근은 차단하고, 클라이언트는 Edge Function API를 통해 데이터를 읽고 씁니다.

## 현재 상태

이 저장소는 실제 운영 시스템이 아닌 프로토타입입니다. 화면과 주요 데이터 흐름은 구현되어 있지만, 운영에 필요한 본인 동의 절차, 개인정보 보관·파기 정책, 키 관리, 접근 로그, 장애 대응 체계는 별도로 마련해야 합니다.

저장소에는 실제 직원 얼굴 이미지, 실제 얼굴 임베딩, 운영 데이터베이스 덤프가 없습니다. `supabase/migrations/*_seed.sql`의 직원·연락처·임베딩 값은 화면과 API 확인을 위한 더미 데이터입니다.

## 로컬 실행 준비

프론트엔드 실행에는 Supabase 프로젝트 URL과 anon key가 필요합니다. 등록·인식·관리 기능까지 사용하려면 데이터베이스 마이그레이션과 Edge Function 배포도 먼저 완료해야 합니다. 마이그레이션, 관리자 등록, API 배포 순서는 [Supabase 셋업 가이드](./supabase/README.md)를 참고하세요.

### 1. 패키지 설치

```bash
npm install
```

### 2. 얼굴 임베딩 모델 준비

애플리케이션은 `public/models/w600k_mbf.onnx`를 사용합니다. 모델 파일은 저장소에 포함하지 않으며 `npm install`만으로 자동 다운로드되지 않습니다.

다음 스크립트는 InsightFace `buffalo_s` 모델 묶음을 내려받아 필요한 ONNX 파일을 `public/models/`에 배치합니다. 실행 환경에 `unzip` 명령과 네트워크 연결이 필요합니다.

```bash
node scripts/fetch-models.mjs
```

### 3. 환경 변수 설정

```bash
cp .env.example .env.local
```

`.env.local`에 Supabase 프로젝트의 URL과 anon key를 입력합니다.

```env
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

`SUPABASE_SERVICE_ROLE_KEY`는 프론트엔드 환경 파일에 넣지 않습니다. 이 값은 Edge Function 런타임에서만 사용합니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 얼굴 등록과 인식을 확인하려면 카메라 권한이 필요합니다.

## 기타 명령

```bash
npm run build    # 타입 검사 후 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # ESLint 검사
```

## 저장소 구조

```text
src/              프론트엔드 앱, 얼굴 처리 코드, API 클라이언트
supabase/         마이그레이션, Edge Function, 셋업 문서
design-reference/ UI 구현에 참고한 디자인 원본
scripts/          얼굴 모델 준비 스크립트
```

## 보안 및 개인정보 유의사항

- 얼굴 임베딩도 개인을 식별할 수 있는 민감정보로 취급해야 합니다.
- 실제 배포 전에는 명시적 동의, 최소 보관, 삭제 요청, 접근 권한과 감사 정책을 정해야 합니다.
- `service_role` 키와 운영 데이터는 저장소나 브라우저 번들에 포함하지 않습니다.
- 프로토타입의 인식 결과를 출입 통제나 인사 평가에 그대로 사용하지 않습니다.

## 라이선스

[MIT License](./LICENSE)
