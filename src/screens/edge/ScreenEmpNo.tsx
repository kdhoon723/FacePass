import { useState } from 'react';
import { tokens } from '@/lib/tokens';

const FX_BLUE = tokens.brand;
const FX_GRAY_900 = tokens.gray900;
const FX_GRAY_500 = tokens.gray500;
const FX_GRAY_200 = tokens.gray200;
const FX_GRAY_100 = tokens.gray100;

interface Props {
  onBack?: () => void;
  onSubmit?: (empNo: string, type: 'check_in' | 'check_out') => void;
}

export default function ScreenEmpNo({ onBack, onSubmit }: Props = {}) {
  const [inputValue, setInputValue] = useState('');
  const [checkType, setCheckType] = useState<'check_in' | 'check_out'>('check_in');

  const digits = inputValue.padEnd(6, '').split('');

  function handleKey(n: string) {
    if (n === '⌫') {
      setInputValue((v) => v.slice(0, -1));
      return;
    }
    if (inputValue.length >= 6) return;
    const next = inputValue + n;
    setInputValue(next);
    if (next.length === 6) {
      onSubmit?.(next, checkType);
    }
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100dvh',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-body)',
        color: FX_GRAY_900,
        position: 'relative',
        overflow: 'hidden auto',
      }}
    >

      {/* Top bar */}
      <div
        style={{
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={onBack}
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
        <div style={{ fontSize: 15, fontWeight: 700 }}>사번으로 인증</div>
        <div style={{ width: 40 }} />
      </div>

      {/* Title */}
      <div style={{ padding: '20px 28px 0', textAlign: 'center' }}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
          }}
        >
          사번 6자리를 입력해주세요
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 14,
            color: FX_GRAY_500,
            lineHeight: 1.5,
          }}
        >
          얼굴 인식이 어려운 경우 사용해요
        </div>
      </div>

      {/* PIN dots */}
      <div
        style={{
          padding: '32px 28px 0',
          display: 'flex',
          justifyContent: 'center',
          gap: 14,
        }}
      >
        {digits.map((d, i) => (
          <div
            key={i}
            style={{
              width: 44,
              height: 56,
              borderRadius: 12,
              background: FX_GRAY_100,
              border: `1.5px solid ${d ? FX_BLUE : FX_GRAY_200}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 700,
              color: FX_GRAY_900,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 14,
          textAlign: 'center',
          fontSize: 13,
          color: FX_GRAY_500,
        }}
      >
        EMP-
        <span style={{ color: FX_GRAY_900, fontWeight: 700 }}>
          {inputValue || '______'}
        </span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Action mode pills */}
      <div
        style={{
          padding: '0 24px 16px',
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <div
          style={{
            display: 'flex',
            background: FX_GRAY_100,
            borderRadius: 999,
            padding: 3,
          }}
        >
          <div
            onClick={() => setCheckType('check_in')}
            style={{
              padding: '8px 16px',
              borderRadius: 999,
              background: checkType === 'check_in' ? '#fff' : 'transparent',
              color: checkType === 'check_in' ? FX_GRAY_900 : FX_GRAY_500,
              fontSize: 13,
              fontWeight: 700,
              boxShadow: checkType === 'check_in' ? '0 1px 3px rgba(0,19,43,.06)' : 'none',
              cursor: 'pointer',
            }}
          >
            출근
          </div>
          <div
            onClick={() => setCheckType('check_out')}
            style={{
              padding: '8px 16px',
              borderRadius: 999,
              background: checkType === 'check_out' ? '#fff' : 'transparent',
              color: checkType === 'check_out' ? FX_GRAY_900 : FX_GRAY_500,
              fontSize: 13,
              fontWeight: 700,
              boxShadow: checkType === 'check_out' ? '0 1px 3px rgba(0,19,43,.06)' : 'none',
              cursor: 'pointer',
            }}
          >
            퇴근
          </div>
        </div>
      </div>

      {/* Numeric keypad */}
      <div style={{ background: FX_GRAY_100, padding: '12px 4px 8px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
          }}
        >
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map(
            (n, i) => (
              <button
                key={i}
                disabled={!n}
                onClick={() => n && handleKey(n)}
                style={{
                  height: 54,
                  border: 0,
                  background: 'transparent',
                  fontSize: n === '⌫' ? 22 : 28,
                  fontWeight: 500,
                  color: FX_GRAY_900,
                  fontFamily: 'inherit',
                  cursor: n ? 'pointer' : 'default',
                  opacity: n ? 1 : 0,
                }}
              >
                {n}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
