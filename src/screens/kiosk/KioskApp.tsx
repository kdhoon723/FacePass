import { useEffect, useState } from 'react';
import { PhoneShell } from '@/components/common';
import ScreenIdle from './ScreenIdle';
import ScreenCamera from './ScreenCamera';
import ScreenRecognizing from './ScreenRecognizing';
import ScreenSuccess from './ScreenSuccess';
import ScreenFailure from './ScreenFailure';

type KioskStep = 'idle' | 'camera' | 'recognizing' | 'success' | 'failure';

/**
 * Auto-advancing demo state machine for the kiosk flow.
 *
 *   idle → camera → recognizing → (success | failure) → idle
 *
 * Each step holds for the duration in `STEP_MS`. Tapping anywhere drops back
 * to idle (operator can interrupt). Once camera + ONNX inference are wired in
 * (see `src/lib/face/`), recognizing transitions become real instead of timed,
 * and idle→camera will be triggered by face-presence detection.
 */
const STEP_MS: Record<KioskStep, number> = {
  idle: 5000, // simulated "person approaches" trigger
  camera: 1800,
  recognizing: 1300,
  success: 3500,
  failure: 4500,
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
    const id = window.setTimeout(() => setStep((prev) => nextStep(prev)), ms);
    return () => window.clearTimeout(id);
  }, [step]);

  return (
    <PhoneShell>
      <div
        role="presentation"
        onClick={() => setStep('idle')}
        style={{ width: '100%', height: '100%', cursor: step === 'idle' ? 'default' : 'pointer' }}
      >
        {step === 'idle' && <ScreenIdle />}
        {step === 'camera' && <ScreenCamera />}
        {step === 'recognizing' && <ScreenRecognizing />}
        {step === 'success' && <ScreenSuccess />}
        {step === 'failure' && <ScreenFailure />}
      </div>
    </PhoneShell>
  );
}
