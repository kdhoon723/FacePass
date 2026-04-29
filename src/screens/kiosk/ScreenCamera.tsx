import { tokens } from '@/lib/tokens';

const FP_BLUE = tokens.brand;
const FP_BLUE_WEAK = tokens.brandWeak;
const FP_GRAY_900 = tokens.gray900;
const FP_RED = tokens.danger;

interface Props {
  type?: 'check_in' | 'check_out';
  onTypeChange?: (t: 'check_in' | 'check_out') => void;
}

export default function ScreenCamera({ type = 'check_in', onTypeChange }: Props = {}) {
  return (
    <div style={{ width: '100%', minHeight: '100dvh', background: 'transparent', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-body)', color: '#fff', position: 'relative', overflow: 'hidden auto' }}>
      {/* Dark gradient overlay on top of the KioskApp fixed <video> */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 50% 38%, rgba(58,66,82,0.55) 0%, rgba(28,34,48,0.70) 45%, rgba(10,13,18,0.85) 100%)', pointerEvents: 'none' }} />

      {/* Top bar */}
      <div style={{ position: 'relative', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ width: 40, height: 40, borderRadius: 99, background: 'rgba(255,255,255,.14)', backdropFilter: 'blur(20px)', border: 0, color: '#fff', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,.14)', backdropFilter: 'blur(20px)', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: 99, background: FP_RED, animation: 'fp-pulse 1.6s infinite' }} />
          {type === 'check_out' ? '퇴근 인증' : '출근 인증'}
        </div>
        <button style={{ width: 40, height: 40, borderRadius: 99, background: 'rgba(255,255,255,.14)', backdropFilter: 'blur(20px)', border: 0, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
        </button>
      </div>

      {/* Compact QR-style corner guide */}
      <div style={{ position: 'relative', padding: '20px 0 0', display: 'flex', justifyContent: 'center' }}>
        <svg width="220" height="220" viewBox="0 0 220 220">
          {([
            [10, 10, 1, 1], [210, 10, -1, 1], [10, 210, 1, -1], [210, 210, -1, -1],
          ] as [number, number, number, number][]).map(([x, y, dx, dy], i) => (
            <g key={i} stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none">
              <path d={`M${x} ${y} L${x + dx * 32} ${y}`} />
              <path d={`M${x} ${y} L${x} ${y + dy * 32}`} />
            </g>
          ))}
        </svg>
      </div>

      {/* Title */}
      <div style={{ position: 'relative', padding: '20px 28px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          얼굴을 비춰주세요
        </div>
        <div style={{ marginTop: 8, fontSize: 14, color: 'rgba(255,255,255,.6)', lineHeight: 1.5 }}>
          카메라에 자연스럽게 잡히면 자동으로 인식돼요
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* Bottom controls */}
      <div style={{ position: 'relative', padding: '0 24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: 'rgba(255,255,255,.08)', borderRadius: 18, backdropFilter: 'blur(20px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: FP_BLUE_WEAK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={FP_BLUE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{type === 'check_out' ? '퇴근으로 기록' : '출근으로 기록'}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', marginTop: 1 }}>탭해서 {type === 'check_out' ? '출근' : '퇴근'}으로 변경</div>
            </div>
          </div>
          <div
            onClick={() => onTypeChange?.(type === 'check_in' ? 'check_out' : 'check_in')}
            style={{ display: 'flex', background: 'rgba(0,0,0,.3)', borderRadius: 999, padding: 3, cursor: 'pointer' }}
          >
            <div style={{ padding: '7px 14px', borderRadius: 999, background: type === 'check_in' ? '#fff' : 'transparent', color: type === 'check_in' ? FP_GRAY_900 : 'rgba(255,255,255,.55)', fontSize: 13, fontWeight: 700 }}>출근</div>
            <div style={{ padding: '7px 14px', borderRadius: 999, background: type === 'check_out' ? '#fff' : 'transparent', color: type === 'check_out' ? FP_GRAY_900 : 'rgba(255,255,255,.55)', fontSize: 13, fontWeight: 700 }}>퇴근</div>
          </div>
        </div>
      </div>
    </div>
  );
}
