import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ScreenEnrollIntro from './ScreenEnrollIntro';
import ScreenEnrollCapture from './ScreenEnrollCapture';
import ScreenEnrollDone from './ScreenEnrollDone';

type EnrollStep = 'intro' | 'capture' | 'done';

/**
 * Enrollment flow (magic-link).
 *   intro → (user taps "시작하기") → capture → (shutter tap) → done → (완료 tap) → intro
 *
 * Auto-advance removed: each step waits for an explicit user action.
 * Once the API is wired up (`validateInvite` / `submitEnrollment`),
 * intro will gate on a server token check and capture will collect
 * three real embeddings before advancing to done.
 */
export default function EnrollFlow() {
  // Token is captured but not yet used (validation happens during integration).
  useParams<{ token: string }>();
  const [step, setStep] = useState<EnrollStep>('intro');

  return (
    <div
      role="presentation"
      onClick={() => { if (step === 'intro') setStep('capture'); }}
      style={{ width: '100%', minHeight: '100dvh', cursor: step === 'intro' ? 'pointer' : 'default' }}
    >
      {step === 'intro' && <ScreenEnrollIntro />}
      {step === 'capture' && <ScreenEnrollCapture />}
      {step === 'done' && <ScreenEnrollDone />}
    </div>
  );
}
