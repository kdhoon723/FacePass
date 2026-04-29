import { FPLogo } from '@/components/common';
import { tokens } from '@/lib/tokens';

const FP_BLUE = tokens.brand;
const FP_GRAY_900 = tokens.gray900;
const FP_GRAY_600 = tokens.gray600;
const FP_GRAY_400 = tokens.gray400;
const FP_GRAY_100 = tokens.gray100;
const FP_GREEN = tokens.success;

export default function ScreenIdle() {
  return (
    <div style={{ width: '100%', minHeight: '100dvh', background: '#fff', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-body)', color: FP_GRAY_900, position: 'relative', overflow: 'hidden auto' }}>
      {/* Soft brand aura */}
      <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse at center, rgba(49,130,246,.10) 0%, rgba(49,130,246,0) 65%)', pointerEvents: 'none' }} />


      {/* Top: company brand + connection */}
      <div style={{ position: 'relative', padding: '12px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <FPLogo size={26} />
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>FacePass</span>
          <span style={{ fontSize: 13, color: FP_GRAY_400, fontWeight: 600, marginLeft: 4 }}>· 본사 7층</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: FP_GRAY_100, borderRadius: 999, fontSize: 12, fontWeight: 700, color: FP_GRAY_600 }}>
          <div style={{ width: 6, height: 6, borderRadius: 99, background: FP_GREEN }} />
          정상
        </div>
      </div>

      {/* Hero — date + big clock, centered */}
      <div style={{ position: 'relative', padding: '56px 28px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: FP_BLUE, letterSpacing: '-0.005em' }}>2026년 4월 29일 수요일</div>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 96, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: FP_GRAY_900, fontVariantNumeric: 'tabular-nums' }}>
            08:42
          </div>
        </div>
        <div style={{ marginTop: 32, fontSize: 28, fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.02em' }}>
          좋은 아침이에요{'\n'}오늘도 잘 부탁드려요
        </div>
        <div style={{ marginTop: 12, fontSize: 15, color: FP_GRAY_600, lineHeight: 1.5 }}>
          출근 마감까지 <b style={{ color: FP_GRAY_900 }}>18분</b> 남았어요
        </div>
      </div>

      {/* Animated face-detect prompt — implies "approach to start" */}
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
        <div style={{ position: 'relative', width: 160, height: 160 }}>
          {/* Pulsing rings */}
          <div style={{ position: 'absolute', inset: 0, borderRadius: 999, border: `2px solid ${FP_BLUE}`, opacity: 0.4, animation: 'fp-ring 2.4s ease-out infinite' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 999, border: `2px solid ${FP_BLUE}`, opacity: 0.4, animation: 'fp-ring 2.4s ease-out 0.8s infinite' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 999, border: `2px solid ${FP_BLUE}`, opacity: 0.4, animation: 'fp-ring 2.4s ease-out 1.6s infinite' }} />
          {/* Center face icon */}
          <div style={{ position: 'absolute', inset: 36, borderRadius: 999, background: FP_BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px rgba(49,130,246,.4)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11.5a.5.5 0 100-1 .5.5 0 000 1zM15 11.5a.5.5 0 100-1 .5.5 0 000 1z" fill="#fff" stroke="none"/>
              <path d="M8 15s1.5 2 4 2 4-2 4-2"/>
              <path d="M3 7V5a2 2 0 012-2h2M21 7V5a2 2 0 00-2-2h-2M3 17v2a2 2 0 002 2h2M21 17v2a2 2 0 01-2 2h-2"/>
            </svg>
          </div>
        </div>

        <div style={{ marginTop: 32, fontSize: 19, fontWeight: 700, color: FP_GRAY_900, letterSpacing: '-0.01em' }}>
          얼굴을 화면에 비춰주세요
        </div>
        <div style={{ marginTop: 6, fontSize: 14, color: FP_GRAY_600 }}>
          다가오시면 자동으로 인식이 시작돼요
        </div>
      </div>

      {/* Bottom: stats + alt method */}
      <div style={{ position: 'relative', padding: '0 20px 16px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1, padding: '12px 14px', background: FP_GRAY_100, borderRadius: 14 }}>
            <div style={{ fontSize: 11, color: FP_GRAY_600, fontWeight: 600 }}>오늘 출근</div>
            <div style={{ marginTop: 2, fontSize: 18, fontWeight: 700, color: FP_GRAY_900, fontVariantNumeric: 'tabular-nums' }}>83<span style={{ fontSize: 12, color: FP_GRAY_400, fontWeight: 600 }}> / 94</span></div>
          </div>
          <div style={{ flex: 1, padding: '12px 14px', background: FP_GRAY_100, borderRadius: 14 }}>
            <div style={{ fontSize: 11, color: FP_GRAY_600, fontWeight: 600 }}>마지막 인증</div>
            <div style={{ marginTop: 2, fontSize: 18, fontWeight: 700, color: FP_GRAY_900 }}>윤<span style={{ color: FP_GRAY_400 }}>OO</span> · 8:39</div>
          </div>
        </div>
        <button style={{
          width: '100%', height: 48, borderRadius: 14, border: 0,
          background: 'rgba(7,25,76,0.05)', color: FP_GRAY_600, fontSize: 14, fontWeight: 700,
          fontFamily: 'inherit', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          얼굴 인식이 안 되시나요? <span style={{ color: FP_GRAY_900 }}>사번으로 입력</span>
        </button>
      </div>
    </div>
  );
}
