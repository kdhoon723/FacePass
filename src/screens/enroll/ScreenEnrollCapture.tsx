import { StatusBar, HomeIndicator } from '@/components/common';
import { tokens } from '@/lib/tokens';

export default function ScreenEnrollCapture() {
  return (
    <div
      style={{
        width: 390,
        height: 844,
        background: '#0E1116',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-body)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Camera bg gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(120% 90% at 50% 38%, #3a4252 0%, #1c2230 45%, #0a0d12 100%)',
        }}
      />
      {/* Face hint silhouette */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 360,
          transform: 'translate(-50%,-50%)',
          width: 220,
          height: 270,
          borderRadius: '48%',
          background:
            'radial-gradient(ellipse at center, rgba(255,200,170,.18) 0%, rgba(255,200,170,0) 70%)',
        }}
      />

      <StatusBar dark />

      {/* Nav row */}
      <div
        style={{
          position: 'relative',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          style={{
            width: 40,
            height: 40,
            borderRadius: 99,
            background: 'rgba(255,255,255,.14)',
            backdropFilter: 'blur(20px)',
            border: 0,
            color: '#fff',
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
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,.8)' }}>
          2 / 3
        </div>
        <div style={{ width: 40 }} />
      </div>

      {/* Title + capture progress */}
      <div style={{ position: 'relative', padding: '12px 28px 0', textAlign: 'center' }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: tokens.brand,
            letterSpacing: '0.04em',
          }}
        >
          · 사진 3 / 3 ·
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
          }}
        >
          한 장 더 자유롭게{'\n'}등록해볼까요?
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 13,
            color: 'rgba(255,255,255,.6)',
            lineHeight: 1.5,
          }}
        >
          안경을 끼셨다면 <b style={{ color: '#fff' }}>안경을 벗은 모습</b>,{'\n'}
          아니면 웃는 표정을 추가해도 좋아요
        </div>

        {/* 3-step thumbnails */}
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {[
            { label: '자연스럽게', done: true, active: false },
            { label: '살짝 미소', done: true, active: false },
            { label: '자유 등록', done: false, active: true },
          ].map((t, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: t.done
                    ? 'linear-gradient(135deg,#FFCCA8,#FFB582)'
                    : t.active
                      ? 'rgba(49,130,246,.2)'
                      : 'rgba(255,255,255,.08)',
                  border: t.active ? `2px solid ${tokens.brand}` : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {t.done && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: -4,
                      right: -4,
                      width: 22,
                      height: 22,
                      borderRadius: 99,
                      background: tokens.brand,
                      border: '2px solid #0E1116',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
                {t.active && (
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 99,
                      background: tokens.brand,
                      animation: 'fp-pulse 1s infinite',
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: t.done
                    ? 'rgba(255,255,255,.85)'
                    : t.active
                      ? tokens.brand
                      : 'rgba(255,255,255,.4)',
                  fontWeight: 700,
                }}
              >
                {t.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Corner guide */}
      <div
        style={{
          position: 'relative',
          padding: '20px 0 0',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <svg width="220" height="220" viewBox="0 0 220 220">
          {([
            [10, 10, 1, 1],
            [210, 10, -1, 1],
            [10, 210, 1, -1],
            [210, 210, -1, -1],
          ] as const).map(([x, y, dx, dy], i) => (
            <g
              key={i}
              stroke={tokens.success}
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
              style={{ filter: 'drop-shadow(0 0 10px rgba(0,123,51,.6))' }}
            >
              <path d={`M${x} ${y} L${x + dx * 32} ${y}`} />
              <path d={`M${x} ${y} L${x} ${y + dy * 32}`} />
            </g>
          ))}
        </svg>
      </div>

      {/* Countdown badge */}
      <div
        style={{ position: 'relative', padding: '16px 28px 0', textAlign: 'center' }}
      >
        <div
          style={{
            display: 'inline-flex',
            padding: '8px 14px',
            borderRadius: 999,
            background: 'rgba(0,123,51,.2)',
            border: '1px solid rgba(0,123,51,.5)',
            fontSize: 13,
            fontWeight: 700,
            alignItems: 'center',
            gap: 6,
            backdropFilter: 'blur(20px)',
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          좋아요! 3·2·1초 후 촬영돼요
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* Shutter row */}
      <div
        style={{
          position: 'relative',
          padding: '0 24px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Flip icon */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: 'rgba(255,255,255,.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="23 4 23 10 17 10" />
            <path d="M3.51 9a9 9 0 0114.85-3.36L23 10" />
          </svg>
        </div>

        {/* Shutter button */}
        <button
          style={{
            width: 80,
            height: 80,
            borderRadius: 99,
            background: '#fff',
            border: '4px solid rgba(255,255,255,.4)',
            cursor: 'pointer',
            boxShadow: '0 8px 28px rgba(0,0,0,.3)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 99,
              background: '#fff',
              border: '2px solid #0E1116',
              boxShadow: 'inset 0 0 0 4px #fff',
            }}
          />
        </button>

        {/* Info icon */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: 'rgba(255,255,255,.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        </div>
      </div>

      <HomeIndicator dark />
    </div>
  );
}
