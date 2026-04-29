import { StatusBar, HomeIndicator } from '@/components/common';
import { tokens } from '@/lib/tokens';

const FX_BLUE = tokens.brand;
const FX_GRAY_900 = tokens.gray900;
const FX_GRAY_600 = tokens.gray600;
const FX_GRAY_500 = tokens.gray500;
const FX_GRAY_200 = tokens.gray200;
const FX_GRAY_100 = tokens.gray100;
const FX_RED = tokens.danger;

export default function ScreenInviteError() {
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
            'radial-gradient(ellipse at center, rgba(239,68,82,.10) 0%, rgba(239,68,82,0) 65%)',
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

      {/* Broken link illustration */}
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
              background: 'rgba(239,68,82,.10)',
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
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              stroke={FX_RED}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
              <line
                x1="2"
                y1="2"
                x2="22"
                y2="22"
                stroke={FX_RED}
                strokeWidth="2.4"
              />
            </svg>
          </div>
        </div>
      </div>

      <div style={{ padding: '36px 28px 0', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            padding: '5px 12px',
            borderRadius: 999,
            background: 'rgba(239,68,82,.12)',
            color: FX_RED,
            fontSize: 12,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          만료된 링크
        </div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
          }}
        >
          이 등록 링크는{'\n'}더 이상 사용할 수 없어요
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 15,
            color: FX_GRAY_600,
            lineHeight: 1.55,
          }}
        >
          보안을 위해 등록 링크는 발급 후 72시간 동안만 유효해요. 관리자에게 새
          링크를 요청해주세요.
        </div>
      </div>

      {/* Detail card */}
      <div style={{ padding: '28px 24px 0' }}>
        <div
          style={{
            background: FX_GRAY_100,
            borderRadius: 18,
            padding: '16px 20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '6px 0',
            }}
          >
            <div
              style={{ fontSize: 13, color: FX_GRAY_500, fontWeight: 600 }}
            >
              발급일
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: FX_GRAY_900 }}>
              2026.04.25 09:12
            </div>
          </div>
          <div
            style={{ height: 1, background: FX_GRAY_200, margin: '4px 0' }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '6px 0',
            }}
          >
            <div
              style={{ fontSize: 13, color: FX_GRAY_500, fontWeight: 600 }}
            >
              만료
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: FX_RED }}>
              2026.04.28 09:12 (1일 전)
            </div>
          </div>
          <div
            style={{ height: 1, background: FX_GRAY_200, margin: '4px 0' }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '6px 0',
            }}
          >
            <div
              style={{ fontSize: 13, color: FX_GRAY_500, fontWeight: 600 }}
            >
              요청 담당자
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: FX_GRAY_900 }}>
              이수민 (HR)
            </div>
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
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          담당자에게 새 링크 요청
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
          도움말 보기
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}
