import type { ReactNode } from 'react';

interface PhoneShellProps {
  children: ReactNode;
  /**
   * When true the screen fills the actual viewport (real device / kiosk).
   * Otherwise the 390×844 design frame is rendered with a phone bezel — used
   * when previewing the screen on a wider-than-mobile viewport during dev.
   */
  fullscreen?: boolean;
}

/**
 * Wraps a 390×844 mobile screen so it can be developed and demoed on any
 * device size. On real mobile devices the shell is invisible (the screen fills
 * the viewport); on desktop the design frame is shown so the proportions stay
 * stable while iterating.
 */
export function PhoneShell({ children, fullscreen = false }: PhoneShellProps) {
  if (fullscreen) {
    return <div style={{ width: '100%', minHeight: '100dvh' }}>{children}</div>;
  }
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--color-gray-100)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          width: 390,
          height: 844,
          borderRadius: 48,
          boxShadow:
            '0 0 0 11px #1a1d22, 0 0 0 12px #2a2e35, 0 30px 60px rgba(0,19,43,.18)',
          overflow: 'hidden',
          position: 'relative',
          background: '#fff',
        }}
      >
        {children}
      </div>
    </div>
  );
}
