import { tokens } from '@/lib/tokens';

const FP_BLUE = tokens.brand;

interface Props {
  /** dataURL of the cropped face used for embedding extraction.
   *  Shown as a small thumbnail so the user sees exactly which image is being analyzed. */
  capturedFace?: string | null;
}

export default function ScreenRecognizing({ capturedFace }: Props = {}) {
  return (
    <div style={{ width: '100%', minHeight: '100dvh', background: 'transparent', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-body)', color: '#fff', position: 'relative', overflow: 'hidden auto', zIndex: 2 }}>
      {/* Semi-transparent dark overlay so the kiosk's live video stays visible
          underneath while text/UI remains legible. */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 50% 38%, rgba(58,66,82,.55) 0%, rgba(28,34,48,.72) 45%, rgba(10,13,18,.85) 100%)', pointerEvents: 'none' }} />


      <div style={{ position: 'relative', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 40 }} />
        <div style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(49,130,246,.2)', backdropFilter: 'blur(20px)', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, color: '#fff', border: `1px solid rgba(49,130,246,.4)` }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" style={{ animation: 'fp-spin 0.9s linear infinite', transformOrigin: 'center' }}><path d="M12 2a10 10 0 0110 10"/></svg>
          인증 중
        </div>
        <div style={{ width: 40 }} />
      </div>

      {/* Title */}
      <div style={{ position: 'relative', padding: '20px 28px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>얼굴을 확인하고 있어요</div>
        <div style={{ marginTop: 8, fontSize: 14, color: 'rgba(255,255,255,.6)' }}>잠시만 그대로 있어주세요</div>
      </div>

      {/* Compact corner guide with scan line */}
      <div style={{ position: 'relative', padding: '24px 0 0', display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 220, height: 220 }}>
          <svg width="220" height="220" viewBox="0 0 220 220" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={FP_BLUE} stopOpacity="0" />
                <stop offset="50%" stopColor={FP_BLUE} stopOpacity="1" />
                <stop offset="100%" stopColor={FP_BLUE} stopOpacity="0" />
              </linearGradient>
            </defs>
            {([
              [10, 10, 1, 1], [210, 10, -1, 1], [10, 210, 1, -1], [210, 210, -1, -1],
            ] as [number, number, number, number][]).map(([x, y, dx, dy], i) => (
              <g key={i} stroke={FP_BLUE} strokeWidth="4" strokeLinecap="round" fill="none" style={{ filter: 'drop-shadow(0 0 8px rgba(49,130,246,.6))' }}>
                <path d={`M${x} ${y} L${x + dx * 32} ${y}`} />
                <path d={`M${x} ${y} L${x} ${y + dy * 32}`} />
              </g>
            ))}
            {/* scan line */}
            <g style={{ animation: 'fp-scan 2.2s cubic-bezier(.6,0,.4,1) infinite' }}>
              <rect x="15" y="0" width="190" height="3" fill="url(#scanGrad)" />
            </g>
            {/* face landmarks */}
            {([[80,90],[140,90],[110,120],[95,150],[125,150]] as [number, number][]).map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="3" fill={FP_BLUE} style={{ animation: `fp-landmark 1.4s ${i * 0.08}s infinite` }} />
            ))}
          </svg>
        </div>
      </div>

      {/* Captured face thumbnail — shows the exact frame being analyzed */}
      {capturedFace && (
        <div style={{ position: 'relative', padding: '20px 24px 0', display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              padding: 6,
              background: 'rgba(255,255,255,.12)',
              borderRadius: 14,
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,.18)',
            }}
          >
            <img
              src={capturedFace}
              alt="분석 중인 얼굴"
              style={{ width: 96, height: 96, borderRadius: 10, objectFit: 'cover', display: 'block' }}
            />
            <div style={{ marginTop: 6, fontSize: 11, color: 'rgba(255,255,255,.7)', fontWeight: 600, textAlign: 'center' }}>
              분석 이미지
            </div>
          </div>
        </div>
      )}

      <div style={{ flex: 1 }} />

      {/* Progress steps */}
      <div style={{ position: 'relative', padding: '0 24px 18px' }}>
        <div style={{ background: 'rgba(255,255,255,.08)', borderRadius: 20, padding: '16px 20px', backdropFilter: 'blur(20px)' }}>
          {([
            { label: '얼굴 감지', done: true },
            { label: '특징점 매칭', done: true },
            { label: '신원 확인', done: false, active: true },
          ] as { label: string; done: boolean; active?: boolean }[]).map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
              <div style={{ width: 22, height: 22, borderRadius: 99, background: s.done ? FP_BLUE : (s.active ? 'rgba(49,130,246,.2)' : 'rgba(255,255,255,.1)'), border: s.active && !s.done ? `2px solid ${FP_BLUE}` : '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {s.done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                {s.active && !s.done && <div style={{ width: 8, height: 8, borderRadius: 99, background: FP_BLUE, animation: 'fp-pulse 1s infinite' }} />}
              </div>
              <div style={{ flex: 1, fontSize: 15, fontWeight: 600, color: s.done || s.active ? '#fff' : 'rgba(255,255,255,.4)' }}>{s.label}</div>
              {s.done && <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)' }}>0.3s</div>}
              {s.active && <div style={{ fontSize: 13, color: FP_BLUE, fontWeight: 700 }}>처리 중…</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
