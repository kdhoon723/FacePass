import { useEffect, useState } from 'react';
import ScreenIdle from './ScreenIdle';
import ScreenCamera from './ScreenCamera';
import ScreenRecognizing from './ScreenRecognizing';
import ScreenSuccess from './ScreenSuccess';
import ScreenFailure from './ScreenFailure';

type KioskStep = 'idle' | 'camera' | 'recognizing' | 'success' | 'failure';

/**
 * Kiosk state machine.
 *
 *   idle → (user tap) → camera → recognizing → (success | failure) → idle
 *
 * idle no longer auto-advances — the user (or future face-presence detection)
 * triggers entry. Camera/recognizing use mock timers until ONNX is integrated.
 */
const STEP_MS: Partial<Record<KioskStep, number>> = {
  // idle: NO auto-advance — wait for user tap or face-presence detection
  camera: 2000,       // mock: detect face after 2s
  recognizing: 1300,  // mock: inference time
  success: 3000,
  failure: 4000,
};

function nextStep(current: KioskStep): KioskStep {
  switch (current) {
    case 'idle':
      return 'camera';
    case 'camera':
      return 'recognizing';
    case 'recognizing':
      // Mock: ~70% success rate. Replace with real cosine-similarity threshold.
      return Math.random() > 0.3 ? 'success' : 'failure';
    case 'success':
    case 'failure':
      return 'idle';
  }
}

export default function KioskApp() {
  const [step, setStep] = useState<KioskStep>('idle');

  useEffect(() => {
    const ms = STEP_MS[step];
    if (ms === undefined) return;
    const id = window.setTimeout(() => setStep((prev) => nextStep(prev)), ms);
    return () => window.clearTimeout(id);
  }, [step]);

  return (
    <div
      role="presentation"
      onClick={() => { if (step === 'idle') setStep('camera'); }}
      style={{ width: '100%', minHeight: '100dvh', cursor: step === 'idle' ? 'pointer' : 'default' }}
    >
      {step === 'idle' && <ScreenIdle />}
      {step === 'camera' && <ScreenCamera />}
      {step === 'recognizing' && <ScreenRecognizing />}
      {step === 'success' && <ScreenSuccess />}
      {step === 'failure' && <ScreenFailure />}
    </div>
  );
}
