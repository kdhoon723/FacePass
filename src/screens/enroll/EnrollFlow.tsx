import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCamera } from '@/lib/face/useCamera';
import { createDetector, detectFaces } from '@/lib/face/detector';
import { cropAndAlign, extractEmbedding } from '@/lib/face/embedding';
import { validateInvite, submitEnrollment } from '@/lib/api';
import type { InviteValidation } from '@/lib/api-types';
import type { FaceDetector } from '@mediapipe/tasks-vision';
import ScreenEnrollIntro from './ScreenEnrollIntro';
import ScreenEnrollCapture from './ScreenEnrollCapture';
import ScreenEnrollDone from './ScreenEnrollDone';

type EnrollStep = 'intro' | 'capture' | 'done';

const CAPTURE_COUNT = 3;
const COUNTDOWN_SECS = 3;
const MIN_CONFIDENCE = 0.7;

export default function EnrollFlow() {
  const { token = '' } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [step, setStep] = useState<EnrollStep>('intro');
  const [inviteInfo, setInviteInfo] = useState<InviteValidation['employee'] | null>(null);
  const [captureIndex, setCaptureIndex] = useState(0); // 0-based, 0..2
  const [countdown, setCountdown] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const camera = useCamera();
  const videoElRef = useRef<HTMLVideoElement | null>(null);
  const videoRefCallback = useCallback(
    (el: HTMLVideoElement | null) => {
      videoElRef.current = el;
      camera.videoRef(el);
    },
    [camera],
  );

  const detectorRef = useRef<FaceDetector | null>(null);
  const embeddingsRef = useRef<number[][]>([]);
  const captureRunningRef = useRef(false);

  // Validate invite token on mount
  useEffect(() => {
    if (!token) {
      navigate('/invite-error');
      return;
    }
    validateInvite(token)
      .then((res) => {
        if (!res.valid) {
          navigate('/invite-error');
        } else {
          setInviteInfo(res.employee ?? null);
        }
      })
      .catch(() => navigate('/invite-error'));
  }, [token, navigate]);

  // Load detector
  useEffect(() => {
    let cancelled = false;
    createDetector()
      .then((d) => { if (!cancelled) detectorRef.current = d; })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  // Start camera when entering capture step
  useEffect(() => {
    if (step === 'capture') {
      camera.start();
    }
  }, [step, camera]);

  // Run a capture cycle: countdown → detect face → embed → store
  const runCapture = useCallback(async (index: number) => {
    if (captureRunningRef.current) return;
    captureRunningRef.current = true;

    try {
      // Countdown 3-2-1
      for (let s = COUNTDOWN_SECS; s >= 1; s--) {
        setCountdown(s);
        await new Promise<void>((r) => setTimeout(r, 1000));
      }
      setCountdown(0);

      const video = videoElRef.current;
      const detector = detectorRef.current;

      if (!video || video.readyState < 2) {
        throw new Error('카메라가 준비되지 않았어요');
      }

      // Detect face
      let faces: ReturnType<typeof detectFaces> = [];
      if (detector) {
        try { faces = detectFaces(detector, video); } catch {}
      }

      const best = detector
        ? faces.reduce(
            (acc, f) => (f.confidence > (acc?.confidence ?? 0) ? f : acc),
            null as (typeof faces)[0] | null,
          )
        : null;

      let imageData: ImageData;
      if (best && best.confidence >= MIN_CONFIDENCE) {
        imageData = cropAndAlign(video, best.bbox);
      } else {
        // Fallback: crop center square of video
        const size = Math.min(video.videoWidth, video.videoHeight);
        const x = (video.videoWidth - size) / 2;
        const y = (video.videoHeight - size) / 2;
        imageData = cropAndAlign(video, { x, y, width: size, height: size });
      }

      const embedding = await extractEmbedding(imageData);
      embeddingsRef.current[index] = Array.from(embedding);

      const nextIndex = index + 1;
      if (nextIndex < CAPTURE_COUNT) {
        setCaptureIndex(nextIndex);
        captureRunningRef.current = false;
        setCountdown(null);
        // Auto-start next capture after a short pause
        await new Promise<void>((r) => setTimeout(r, 800));
        runCapture(nextIndex);
      } else {
        // All captures done — submit
        setSubmitting(true);
        setCountdown(null);
        try {
          await submitEnrollment(token, embeddingsRef.current);
          setStep('done');
        } catch {
          alert('등록 중 오류가 발생했어요. 다시 시도해주세요.');
          embeddingsRef.current = [];
          setCaptureIndex(0);
          setStep('intro');
        } finally {
          setSubmitting(false);
          captureRunningRef.current = false;
        }
      }
    } catch {
      // Face capture failed — retry same index
      setCountdown(null);
      captureRunningRef.current = false;
      await new Promise<void>((r) => setTimeout(r, 600));
      runCapture(index);
    }
  }, [token]);

  const handleStart = useCallback(() => {
    embeddingsRef.current = [];
    setCaptureIndex(0);
    setCountdown(null);
    captureRunningRef.current = false;
    setStep('capture');
    // runCapture is triggered in the capture useEffect below
  }, []);

  // Start first capture when step becomes 'capture' and camera is streaming
  useEffect(() => {
    if (step !== 'capture') return;
    if (camera.state !== 'streaming') return;
    if (captureRunningRef.current) return;
    runCapture(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, camera.state]);

  return (
    <div style={{ width: '100%', minHeight: '100dvh' }}>
      {step === 'capture' && (
        <video
          ref={videoRefCallback}
          autoPlay
          playsInline
          muted
          style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        />
      )}

      {step === 'intro' && (
        <ScreenEnrollIntro
          employee={inviteInfo ?? undefined}
          onStart={handleStart}
        />
      )}
      {step === 'capture' && (
        <ScreenEnrollCapture
          captureIndex={captureIndex}
          countdown={countdown}
          submitting={submitting}
        />
      )}
      {step === 'done' && (
        <ScreenEnrollDone
          employee={inviteInfo ?? undefined}
        />
      )}
    </div>
  );
}
