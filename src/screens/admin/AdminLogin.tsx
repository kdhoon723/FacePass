import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/api';

const AX_BLUE = '#3182F6';
const AX_GRAY_900 = '#191F28';
const AX_GRAY_700 = '#333D4B';
const AX_GRAY_600 = '#4E5968';
const AX_GRAY_500 = '#6B7683';
const AX_GRAY_400 = '#8B95A1';
const AX_GRAY_200 = '#E5E8EB';
const AX_GRAY_100 = '#F2F4F6';
const AX_GREEN = '#007B33';
const AX_RED = '#EF4452';

interface RedirectState {
  from?: { pathname?: string };
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo =
    (location.state as RedirectState | null)?.from?.pathname ?? '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) {
        setError(translateAuthError(signInError.message));
        return;
      }
      navigate(redirectTo, { replace: true });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : '로그인 중 오류가 발생했어요');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMagicLink = async () => {
    if (!email.trim()) {
      setError('이메일을 먼저 입력해주세요');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const { error: linkError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (linkError) {
        setError(translateAuthError(linkError.message));
        return;
      }
      setError(null);
      alert('이메일로 매직 링크를 보냈어요. 받은 편지함을 확인해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100dvh',
        display: 'flex',
        fontFamily: 'var(--font-body)',
        color: AX_GRAY_900,
        overflow: 'hidden',
      }}
    >
      {/* Left brand panel */}
      <div
        style={{
          flex: '0 0 580px',
          background: 'linear-gradient(160deg, #1858CC 0%, #3182F6 60%, #5BA0FF 100%)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '56px 56px 48px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: 999,
            background:
              'radial-gradient(circle, rgba(255,255,255,.18) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -160,
            left: -120,
            width: 460,
            height: 460,
            borderRadius: 999,
            background:
              'radial-gradient(circle, rgba(255,255,255,.10) 0%, rgba(255,255,255,0) 70%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
          <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
            <rect x="2" y="2" width="28" height="28" rx="9" fill="#fff" />
            <circle cx="16" cy="13" r="4" fill={AX_BLUE} />
            <path
              d="M7 25c1.6-4.2 5.1-6.5 9-6.5s7.4 2.3 9 6.5"
              stroke={AX_BLUE}
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>FacePass</div>
        </div>

        <div style={{ marginTop: 'auto', position: 'relative' }}>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.25,
            }}
          >
            출근부터 보고서까지,{'\n'}얼굴 한 번이면 끝나요
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 16,
              color: 'rgba(255,255,255,.85)',
              lineHeight: 1.6,
              maxWidth: 420,
            }}
          >
            FacePass 관리자 콘솔에서 직원 등록, 실시간 출석 현황, 월간 리포트를 한곳에서
            관리하세요.
          </div>
          <div style={{ marginTop: 36, display: 'flex', gap: 32 }}>
            {[
              { v: '284', l: '등록 직원' },
              { v: '98.4%', l: '이번 달 정시율' },
              { v: '1.2초', l: '평균 인식 시간' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>{s.v}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', marginTop: 2 }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right login panel */}
      <div
        style={{
          flex: 1,
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 56px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 14,
            fontSize: 13,
            color: AX_GRAY_500,
          }}
        >
          <span>도움이 필요하신가요?</span>
          <a style={{ color: AX_BLUE, fontWeight: 700, textDecoration: 'none' }}>고객센터</a>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: 420,
            width: '100%',
            margin: '0 auto',
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.25 }}>
            관리자 로그인
          </div>
          <div style={{ marginTop: 8, fontSize: 15, color: AX_GRAY_500, lineHeight: 1.5 }}>
            가입한 회사 이메일로 로그인해주세요
          </div>

          {/* Error banner */}
          {error && (
            <div
              role="alert"
              style={{
                marginTop: 24,
                padding: '12px 14px',
                borderRadius: 12,
                background: 'rgba(239,68,82,.08)',
                color: AX_RED,
                fontSize: 13,
                fontWeight: 600,
                lineHeight: 1.45,
              }}
            >
              {error}
            </div>
          )}

          {/* Email field */}
          <label style={{ marginTop: error ? 16 : 32, display: 'block' }}>
            <div style={{ fontSize: 13, color: AX_GRAY_600, fontWeight: 600, marginBottom: 8 }}>
              업무 이메일
            </div>
            <div
              style={{
                height: 56,
                background: AX_GRAY_100,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                gap: 10,
                border: `1.5px solid ${email ? AX_BLUE : AX_GRAY_200}`,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={AX_GRAY_500}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.invalid"
                disabled={submitting}
                style={{
                  flex: 1,
                  fontSize: 15,
                  fontWeight: 500,
                  color: AX_GRAY_900,
                  background: 'transparent',
                  border: 0,
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>
          </label>

          {/* Password field */}
          <label style={{ marginTop: 16, display: 'block' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <div style={{ fontSize: 13, color: AX_GRAY_600, fontWeight: 600 }}>비밀번호</div>
              <button
                type="button"
                onClick={handleMagicLink}
                disabled={submitting || !email}
                style={{
                  fontSize: 13,
                  color: AX_BLUE,
                  fontWeight: 600,
                  background: 'transparent',
                  border: 0,
                  cursor: submitting || !email ? 'default' : 'pointer',
                  fontFamily: 'inherit',
                  padding: 0,
                  opacity: submitting || !email ? 0.4 : 1,
                }}
              >
                매직 링크로 받기 →
              </button>
            </div>
            <div
              style={{
                height: 56,
                background: AX_GRAY_100,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                gap: 10,
                border: `1.5px solid ${password ? AX_BLUE : AX_GRAY_200}`,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={AX_GRAY_500}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: AX_GRAY_900,
                  letterSpacing: showPassword ? 'normal' : '0.1em',
                  background: 'transparent',
                  border: 0,
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
                style={{
                  border: 0,
                  background: 'transparent',
                  cursor: 'pointer',
                  color: AX_GRAY_400,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || !email || !password}
            style={{
              marginTop: 24,
              width: '100%',
              height: 56,
              borderRadius: 14,
              border: 0,
              background: AX_BLUE,
              color: '#fff',
              fontSize: 16,
              fontWeight: 700,
              fontFamily: 'inherit',
              cursor: submitting || !email || !password ? 'default' : 'pointer',
              opacity: submitting || !email || !password ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'opacity .15s',
            }}
          >
            {submitting && (
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 999,
                  border: '2.5px solid rgba(255,255,255,.4)',
                  borderTopColor: '#fff',
                  animation: 'fp-spin 0.9s linear infinite',
                }}
              />
            )}
            {submitting ? '확인 중…' : '로그인'}
          </button>

          <div
            style={{
              marginTop: 24,
              fontSize: 12,
              color: AX_GRAY_500,
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            계속 진행하면{' '}
            <a style={{ color: AX_GRAY_700, fontWeight: 600 }}>이용약관</a>과{' '}
            <a style={{ color: AX_GRAY_700, fontWeight: 600 }}>개인정보처리방침</a>에 동의하는
            것으로 간주됩니다
          </div>
        </form>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 12,
            color: AX_GRAY_400,
          }}
        >
          <div>© 2026 FacePass</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <span>v0.1.0</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{ width: 6, height: 6, borderRadius: 99, background: AX_GREEN }}
              />
              모든 시스템 정상
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function translateAuthError(message: string): string {
  if (message.includes('Invalid login credentials')) {
    return '이메일 또는 비밀번호가 올바르지 않아요';
  }
  if (message.includes('Email not confirmed')) {
    return '이메일 인증이 완료되지 않았어요';
  }
  if (message.includes('rate limit')) {
    return '시도가 너무 많아요. 잠시 후 다시 시도해주세요';
  }
  return message;
}
