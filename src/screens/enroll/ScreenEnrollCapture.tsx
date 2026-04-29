import { tokens } from '@/lib/tokens';

interface Props {
  captureIndex?: number;   // 0-based, current capture (0, 1, 2)
  countdown?: number | null; // 3, 2, 1, 0 (0 = capturing), null = idle
  submitting?: boolean;
}

const LABELS = ['자연스럽게', '살짝 미소', '자유 등록'];

export default function ScreenEnrollCapture({ captureIndex = 0, countdown = null, submitting = false }: Props = {}) {
  const currentLabel = submitting ? '제출 중…' : (countdown !== null && countdown > 0 ? `${countdown}초 후 촬영` : countdown === 0 ? '촬영 중!' : '얼굴을 맞춰주세요');

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100dvh',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-body)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden auto',
      }}
    >
      {/* Dark gradient overlay on top of the EnrollFlow fixed <video> */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(120% 90% at 50% 38%, rgba(58,66,82,0.55) 0%, rgba(28,34,48,0.70) 45%, rgba(10,13,18,0.85) 100%)',
          pointerEvents: 'none',
        }}
      />


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
          · 사진 {captureIndex + 1} / 3 ·
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
          {captureIndex === 0 && '자연스러운 표정으로\n정면을 봐주세요'}
          {captureIndex === 1 && '살짝 미소 지어\n보여주세요'}
          {captureIndex === 2 && '한 장 더 자유롭게\n등록해볼까요?'}
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
          {LABELS.map((label, i) => {
            const done = i < captureIndex;
            const active = i === captureIndex;
            return (
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
                    background: done
                      ? 'linear-gradient(135deg,#FFCCA8,#FFB582)'
                      : active
                        ? 'rgba(49,130,246,.2)'
                        : 'rgba(255,255,255,.08)',
                    border: active ? `2px solid ${tokens.brand}` : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {done && (
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
                  {active && (
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
                    color: done
                      ? 'rgba(255,255,255,.85)'
                      : active
                        ? tokens.brand
                        : 'rgba(255,255,255,.4)',
                    fontWeight: 700,
                  }}
                >
                  {label}
                </div>
              </div>
            );
          })}
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

      {/* Countdown / status badge */}
      <div
        style={{ position: 'relative', padding: '16px 28px 0', textAlign: 'center' }}
      >
        <div
          style={{
            display: 'inline-flex',
            padding: '8px 14px',
            borderRadius: 999,
            background: countdown === 0 ? 'rgba(49,130,246,.25)' : 'rgba(0,123,51,.2)',
            border: `1px solid ${countdown === 0 ? 'rgba(49,130,246,.5)' : 'rgba(0,123,51,.5)'}`,
            fontSize: 13,
            fontWeight: 700,
            alignItems: 'center',
            gap: 6,
            backdropFilter: 'blur(20px)',
          }}
        >
          {countdown === 0 ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={tokens.brand} strokeWidth="3" strokeLinecap="round" style={{ animation: 'fp-spin 0.6s linear infinite', transformOrigin: 'center' }}><path d="M12 2a10 10 0 0110 10"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          )}
          {submitting ? '등록 중…' : currentLabel}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* Countdown large display */}
      {countdown !== null && countdown > 0 && (
        <div style={{ position: 'relative', textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1, color: '#fff', opacity: 0.9, fontVariantNumeric: 'tabular-nums' }}>
            {countdown}
          </div>
        </div>
      )}

      {/* Shutter row (visual only during auto-capture) */}
      <div
        style={{
          position: 'relative',
          padding: '0 24px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ width: 56, height: 56 }} />
        {/* Shutter button */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 99,
            background: countdown === 0 ? tokens.brand : '#fff',
            border: '4px solid rgba(255,255,255,.4)',
            boxShadow: '0 8px 28px rgba(0,0,0,.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 99,
              background: countdown === 0 ? tokens.brand : '#fff',
              border: `2px solid #0E1116`,
              boxShadow: 'inset 0 0 0 4px #fff',
            }}
          />
        </div>
        <div style={{ width: 56, height: 56 }} />
      </div>
    </div>
  );
}
