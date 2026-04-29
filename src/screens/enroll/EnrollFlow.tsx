import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PhoneShell } from '@/components/common';
import ScreenEnrollIntro from './ScreenEnrollIntro';
import ScreenEnrollCapture from './ScreenEnrollCapture';
import ScreenEnrollDone from './ScreenEnrollDone';

type EnrollStep = 'intro' | 'capture' | 'done';

const STEP_MS: Record<EnrollStep, number> = {
  intro: 6000,
  capture: 5000,
  done: 5000,
};

const NEXT: Record<EnrollStep, EnrollStep> = {
  intro: 'capture',
  capture: 'done',
  done: 'intro',
};

/**
 * Demo state machine for the magic-link enrollment flow.
 *   intro → capture → done → intro (loop)
 *
 * Once the API is wired up (see `src/lib/api.ts` `validateInvite` /
 * `submitEnrollment`), `intro` will gate on a server token check and
 * `capture` will collect three real embeddings before advancing to `done`.
 */
export default function EnrollFlow() {
  // Token is captured but not yet used (validation happens during integration).
  useParams<{ token: string }>();
  const [step, setStep] = useState<EnrollStep>('intro');

  useEffect(() => {
    const ms = STEP_MS[step];
    const id = window.setTimeout(() => setStep(NEXT[step]), ms);
    return () => window.clearTimeout(id);
  }, [step]);

  return (
    <PhoneShell>
      <div
        role="presentation"
        onClick={() => setStep('intro')}
        style={{ width: '100%', height: '100%', cursor: 'pointer' }}
      >
        {step === 'intro' && <ScreenEnrollIntro />}
        {step === 'capture' && <ScreenEnrollCapture />}
        {step === 'done' && <ScreenEnrollDone />}
      </div>
    </PhoneShell>
  );
}
