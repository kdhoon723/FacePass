import { tokens } from '@/lib/tokens';

const FP_BLUE = tokens.brand;
const FP_GRAY_900 = tokens.gray900;
const FP_GRAY_600 = tokens.gray600;
const FP_GRAY_400 = tokens.gray400;
const FP_GRAY_200 = tokens.gray200;
const FP_GRAY_100 = tokens.gray100;
const FP_RED = tokens.danger;

interface Tip {
  icon: string;
  title: string;
  desc: string;
}

const tips: Tip[] = [
  { icon: '💡', title: '조명을 밝게 해주세요', desc: '역광이나 어두운 곳은 인식이 어려워요' },
  { icon: '👤', title: '얼굴이 가려지지 않도록', desc: '눈·코·입이 모두 보여야 해요' },
  { icon: '📏', title: '30cm 정도 거리에서', desc: '너무 멀거나 가까우면 안 돼요' },
];

interface Props {
  error?: string | null;
  onRetry?: () => void;
  onEmpnoFallback?: () => void;
  onClose?: () => void;
}

export default function ScreenFailure({ error: _error, onRetry, onEmpnoFallback, onClose }: Props = {}) {
  return (
    <div style={{ width: '100%', minHeight: '100dvh', background: '#fff', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-body)', color: FP_GRAY_900, position: 'relative', overflow: 'hidden auto' }}>
      <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 600, height: 360, background: 'radial-gradient(ellipse at center, rgba(239,68,82,.10) 0%, rgba(239,68,82,0) 70%)' }} />


      <div style={{ position: 'relative', padding: '10px 16px', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onClose} style={{ width: 40, height: 40, borderRadius: 99, background: FP_GRAY_100, border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: FP_GRAY_900 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div style={{ position: 'relative', padding: '20px 28px 0', textAlign: 'center' }}>
        <div style={{ width: 88, height: 88, borderRadius: 99, background: 'rgba(239,68,82,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={FP_RED} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>

        <div style={{ marginTop: 22, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          얼굴을 인식하지{'\n'}못했어요
        </div>
        <div style={{ marginTop: 10, fontSize: 16, color: FP_GRAY_600, lineHeight: 1.5 }}>
          조명, 거리, 각도 등을 확인하고{'\n'}다시 시도해주세요
        </div>
      </div>

      {/* Tips */}
      <div style={{ padding: '28px 20px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: FP_GRAY_400, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '0 4px 10px' }}>이렇게 해보세요</div>
        <div style={{ background: FP_GRAY_100, borderRadius: 20, padding: 6 }}>
          {tips.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', borderBottom: i < 2 ? `1px solid ${FP_GRAY_200}` : 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 14, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{t.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: FP_GRAY_900 }}>{t.title}</div>
                <div style={{ fontSize: 13, color: FP_GRAY_600, marginTop: 2 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14, fontSize: 13, color: FP_GRAY_400, textAlign: 'center' }}>
          시도 횟수 <b style={{ color: FP_GRAY_600 }}>2 / 3</b>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ padding: '16px 20px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button onClick={onRetry} style={{
          width: '100%', height: 56, borderRadius: 16, border: 0,
          background: FP_BLUE, color: '#fff', fontSize: 17, fontWeight: 700,
          fontFamily: 'inherit', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10"/></svg>
          다시 시도하기
        </button>
        <button onClick={onEmpnoFallback} style={{
          width: '100%', height: 52, borderRadius: 14, border: 0,
          background: 'rgba(7,25,76,0.05)', color: FP_GRAY_600, fontSize: 16, fontWeight: 700,
          fontFamily: 'inherit', cursor: 'pointer',
        }}>
          사번으로 입력하기
        </button>
      </div>
    </div>
  );
}
