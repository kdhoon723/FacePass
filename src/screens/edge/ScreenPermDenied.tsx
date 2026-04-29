import { StatusBar, HomeIndicator } from '@/components/common';
import { tokens } from '@/lib/tokens';

const FX_BLUE = tokens.brand;
const FX_BLUE_WEAK = tokens.brandWeak;
const FX_GRAY_900 = tokens.gray900;
const FX_GRAY_700 = tokens.gray700;
const FX_GRAY_600 = tokens.gray600;
const FX_GRAY_400 = tokens.gray400;
const FX_GRAY_200 = tokens.gray200;
const FX_GRAY_100 = tokens.gray100;
const FX_AMBER = tokens.amber;

export default function ScreenPermDenied() {
  return (
    <div
      style={{
        width: 390,
        height: 844,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-body)',
        color: FX_GRAY_900,
        position: 'relative',
        overflow: 'hidden',
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
            'radial-gradient(ellipse at center, rgba(245,158,11,.10) 0%, rgba(245,158,11,0) 65%)',
        }}
      />
      <StatusBar />

      <div
        style={{
          padding: '10px 16px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <button
          style={{
            width: 40,
            height: 40,
            borderRadius: 99,
            background: FX_GRAY_100,
            border: 0,
            color: FX_GRAY_900,
            cursor: 'pointer',
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
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div style={{ width: 40 }} />
      </div>

      {/* Locked camera illustration */}
      <div
        style={{
          position: 'relative',
          padding: '16px 0 0',
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
              background: 'rgba(245,158,11,.12)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 28,
              borderRadius: 99,
              background: '#fff',
              border: `1px solid ${FX_GRAY_200}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0,19,43,.08)',
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke={FX_GRAY_400}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <div
              style={{
                position: 'absolute',
                bottom: -8,
                right: -8,
                width: 44,
                height: 44,
                borderRadius: 99,
                background: FX_AMBER,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #fff',
                boxShadow: '0 4px 12px rgba(245,158,11,.4)',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '36px 28px 0', textAlign: 'center' }}>
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
          }}
        >
          카메라 권한이{'\n'}꺼져 있어요
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 15,
            color: FX_GRAY_600,
            lineHeight: 1.55,
          }}
        >
          얼굴 인식 출근을 사용하려면{'\n'}설정에서 카메라 권한을 허용해주세요
        </div>
      </div>

      {/* Settings path hint */}
      <div style={{ padding: '28px 24px 0' }}>
        <div
          style={{
            background: FX_GRAY_100,
            borderRadius: 18,
            padding: '18px 20px',
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: FX_GRAY_400,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
            }}
          >
            설정 경로
          </div>
          <div
            style={{
              marginTop: 10,
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 6,
              fontSize: 14,
              color: FX_GRAY_900,
              fontWeight: 600,
            }}
          >
            <span
              style={{
                padding: '5px 10px',
                background: '#fff',
                borderRadius: 8,
                border: `1px solid ${FX_GRAY_200}`,
              }}
            >
              설정
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={FX_GRAY_400}
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span
              style={{
                padding: '5px 10px',
                background: '#fff',
                borderRadius: 8,
                border: `1px solid ${FX_GRAY_200}`,
              }}
            >
              FacePass
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={FX_GRAY_400}
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span
              style={{
                padding: '5px 10px',
                background: FX_BLUE_WEAK,
                borderRadius: 8,
                border: `1px solid ${FX_BLUE}`,
                color: FX_BLUE,
              }}
            >
              카메라
            </span>
          </div>
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          설정 앱 열기
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </button>
        <button
          style={{
            width: '100%',
            height: 48,
            borderRadius: 14,
            border: 0,
            background: FX_GRAY_100,
            color: FX_GRAY_700,
            fontSize: 14,
            fontWeight: 700,
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          사번으로 출근하기
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}
