const AX_BLUE = '#3182F6';
const AX_GRAY_300 = '#B0B8C1';

interface AxToggleProps {
  on?: boolean;
}

export default function AxToggle({ on = false }: AxToggleProps) {
  return (
    <div
      style={{
        width: 44,
        height: 26,
        borderRadius: 99,
        background: on ? AX_BLUE : AX_GRAY_300,
        display: 'flex',
        alignItems: 'center',
        padding: 3,
        justifyContent: on ? 'flex-end' : 'flex-start',
        cursor: 'pointer',
        transition: 'all .2s',
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 99,
          background: '#fff',
          boxShadow: '0 1px 3px rgba(0,19,43,.2)',
        }}
      />
    </div>
  );
}
