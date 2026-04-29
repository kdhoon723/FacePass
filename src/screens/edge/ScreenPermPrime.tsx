import { StatusBar, HomeIndicator } from '@/components/common';
import { tokens } from '@/lib/tokens';

const FX_BLUE = tokens.brand;
const FX_BLUE_WEAK = tokens.brandWeak;
const FX_GRAY_900 = tokens.gray900;
const FX_GRAY_600 = tokens.gray600;
const FX_GRAY_500 = tokens.gray500;
const FX_GRAY_100 = tokens.gray100;

export default function ScreenPermPrime() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100dvh',
        maxWidth: 480,
        margin: '0 auto',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-body)',
        color: FX_GRAY_900,
        position: 'relative',
        overflow: 'hidden auto',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 460,
          background:
            'radial-gradient(ellipse at center, rgba(49,130,246,.10) 0%, rgba(49,130,246,0) 65%)',
        }}
      />
      <StatusBar />

      <div
        style={{
          padding: '10px 16px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <button
          style={{
            width: 40,
            height: 40,
            borderRadius: 99,
            background: FX_GRAY_100,
            border: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: FX_GRAY_900,
          }}
        >
          <svg
            width="18"
            height="18"
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
      </div>

      {/* Hero camera illustration */}
      <div
        style={{
          position: 'relative',
          padding: '20px 0 0',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ position: 'relative', width: 156, height: 156 }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 99,
              background: FX_BLUE_WEAK,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 24,
              borderRadius: 99,
              background: FX_BLUE,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(49,130,246,.35)',
            }}
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
        </div>
      </div>

      <div style={{ padding: '32px 28px 0', textAlign: 'center' }}>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
          }}
        >
          카메라 권한이{'\n'}필요해요
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 15,
            color: FX_GRAY_600,
            lineHeight: 1.55,
          }}
        >
          얼굴을 인식해 출퇴근을 자동으로 기록해요.{'\n'}촬영된 이미지는 기기
          밖으로 전송되지 않아요.
        </div>
      </div>

      <div style={{ padding: '28px 24px 0' }}>
        <div
          style={{
            background: FX_GRAY_100,
            borderRadius: 18,
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {[
            {
              icon: (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={FX_BLUE}
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ),
              t: '1초 안에 인식',
              d: '별도 입력 없이 빠르게 출근',
            },
            {
              icon: (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={FX_BLUE}
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ),
              t: '기기에서만 처리',
              d: '이미지는 서버로 전송되지 않아요',
            },
            {
              icon: (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={FX_BLUE}
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              ),
              t: '언제든 해제 가능',
              d: '설정 → 권한에서 변경할 수 있어요',
            },
          ].map((row, i) => (
            <div
              key={i}
              style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: FX_BLUE_WEAK,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {row.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: FX_GRAY_900,
                  }}
                >
                  {row.t}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: FX_GRAY_500,
                    marginTop: 2,
                    lineHeight: 1.45,
                  }}
                >
                  {row.d}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div
        style={{
          padding: '12px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <button
          style={{
            width: '100%',
            height: 56,
            borderRadius: 16,
            border: 0,
            background: FX_BLUE,
            color: '#fff',
            fontSize: 17,
            fontWeight: 700,
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          카메라 권한 허용
        </button>
        <button
          style={{
            width: '100%',
            height: 48,
            borderRadius: 14,
            border: 0,
            background: 'transparent',
            color: FX_GRAY_500,
            fontSize: 14,
            fontWeight: 700,
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          나중에 하기
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}
