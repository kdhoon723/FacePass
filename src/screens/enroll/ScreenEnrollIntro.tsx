import { tokens } from '@/lib/tokens';

interface Props {
  employee?: { name: string; employee_no: string; dept?: string | null };
  onStart?: () => void;
}

export default function ScreenEnrollIntro({ employee, onStart }: Props = {}) {
  const name = employee?.name ?? '김지원';
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100dvh',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-body)',
        color: tokens.gray900,
        position: 'relative',
        overflow: 'hidden auto',
      }}
    >
      {/* Soft brand aura */}
      <div
        style={{
          position: 'absolute',
          top: -120,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 460,
          background:
            'radial-gradient(ellipse at center, rgba(49,130,246,.10) 0%, rgba(49,130,246,0) 65%)',
          pointerEvents: 'none',
        }}
      />


      {/* Nav row */}
      <div
        style={{
          position: 'relative',
          padding: '10px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <button
          style={{
            width: 40,
            height: 40,
            borderRadius: 99,
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            color: tokens.gray900,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div style={{ fontSize: 13, color: tokens.gray500, fontWeight: 700 }}>1 / 3</div>
        <div style={{ width: 40 }} />
      </div>

      {/* Hero */}
      <div
        style={{ position: 'relative', padding: '20px 28px 0', textAlign: 'center' }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: 36,
            background: tokens.brandWeak,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <svg
            width="68"
            height="68"
            viewBox="0 0 24 24"
            fill="none"
            stroke={tokens.brand}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="9" r="4" />
            <path d="M5 21c1.5-4 4-6 7-6s5.5 2 7 6" />
          </svg>
          <div
            style={{
              position: 'absolute',
              top: -6,
              right: -6,
              width: 36,
              height: 36,
              borderRadius: 99,
              background: '#fff',
              boxShadow: '0 4px 12px rgba(0,19,43,.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={tokens.brand}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 13,
            fontWeight: 700,
            color: tokens.brand,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
          }}
        >
          FacePass 등록
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 28,
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
          }}
        >
          {name}님,{'\n'}얼굴 등록을 시작할게요
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 15,
            color: tokens.gray600,
            lineHeight: 1.5,
          }}
        >
          앞으로 출근할 때 이 얼굴로 인식해요.{'\n'}1분이면 충분해요.
        </div>
      </div>

      {/* Steps */}
      <div style={{ padding: '28px 20px 0' }}>
        {[
          {
            n: 1,
            t: '얼굴 사진 3장 촬영',
            d: '자연스러운 표정과 다른 모습을 담아 인식률을 높여요',
          },
          { n: 2, t: '본인 확인', d: '사번과 매칭해서 정확히 등록해요' },
          { n: 3, t: '등록 완료', d: '내일부터 키오스크에서 바로 출근할 수 있어요' },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
              padding: '14px 16px',
              borderRadius: 16,
              background: i === 0 ? tokens.brandWeak : 'transparent',
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 99,
                background: i === 0 ? tokens.brand : tokens.gray100,
                color: i === 0 ? '#fff' : tokens.gray500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {s.n}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: tokens.gray900 }}>
                {s.t}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: tokens.gray600,
                  marginTop: 2,
                  lineHeight: 1.45,
                }}
              >
                {s.d}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Privacy notice */}
      <div
        style={{
          margin: '16px 20px 0',
          padding: '12px 14px',
          background: tokens.gray100,
          borderRadius: 14,
          display: 'flex',
          gap: 10,
          alignItems: 'flex-start',
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke={tokens.gray600}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, marginTop: 1 }}
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <div style={{ fontSize: 12, color: tokens.gray600, lineHeight: 1.5 }}>
          얼굴 데이터는{' '}
          <b style={{ color: tokens.gray900 }}>회사 서버에서 암호화</b>되어 저장되며,
          출근 인증 외 용도로 사용되지 않아요.
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ padding: '16px 20px 12px' }}>
        <button
          onClick={onStart}
          style={{
            width: '100%',
            height: 56,
            borderRadius: 16,
            border: 0,
            background: tokens.brand,
            color: '#fff',
            fontSize: 17,
            fontWeight: 700,
            fontFamily: 'inherit',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(49,130,246,.35)',
          }}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
