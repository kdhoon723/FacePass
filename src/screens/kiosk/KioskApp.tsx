import { useCallback, useEffect, useRef, useState } from 'react';
import { useCamera } from '@/lib/face/useCamera';
import { createDetector, detectFaces } from '@/lib/face/detector';
import { cropAndAlign, extractEmbedding } from '@/lib/face/embedding';
import { matchFace } from '@/lib/api';
import type { MatchResponse } from '@/lib/api-types';
import type { FaceDetector } from '@mediapipe/tasks-vision';
import ScreenIdle from './ScreenIdle';
import ScreenCamera from './ScreenCamera';
import ScreenRecognizing from './ScreenRecognizing';
import ScreenSuccess from './ScreenSuccess';
import ScreenFailure from './ScreenFailure';
import ScreenPermDenied from '@/screens/edge/ScreenPermDenied';

type Step = 'idle' | 'camera' | 'recognizing' | 'success' | 'failure' | 'permission-denied';

const FACE_CONFIDENCE_THRESHOLD = 0.7;
const FACE_HOLD_MS = 1000;
const POLL_INTERVAL_MS = 100;
const AUTO_RETURN_MS = 3000;

export default function KioskApp() {
  const [step, setStep] = useState<Step>('idle');
  const [employee, setEmployee] = useState<MatchResponse['employee'] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkType, setCheckType] = useState<'check_in' | 'check_out'>('check_in');

  const camera = useCamera();

  // Single <video> element always mounted; ref callback feeds it to useCamera
  const videoElRef = useRef<HTMLVideoElement | null>(null);
  const videoRefCallback = useCallback(
    (el: HTMLVideoElement | null) => {
      videoElRef.current = el;
      camera.videoRef(el);
    },
    [camera],
  );

  const detectorRef = useRef<FaceDetector | null>(null);
  const faceFirstSeenRef = useRef<number | null>(null);
  const recognizingRef = useRef(false);
  const stepRef = useRef<Step>('idle');
  stepRef.current = step;

  // Start camera on mount
  useEffect(() => {
    camera.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle camera state → permission denied
  useEffect(() => {
    if (camera.state === 'denied') {
      setStep('permission-denied');
    }
  }, [camera.state]);

  // Load MediaPipe detector once
  useEffect(() => {
    let cancelled = false;
    createDetector()
      .then((d) => {
        if (!cancelled) detectorRef.current = d;
      })
      .catch(() => {
        // detector unavailable — user can still tap to start recognition
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Detection + recognition poll loop (persistent, reads stepRef)
  useEffect(() => {
    let checkTypeSnapshot = checkType;

    const id = setInterval(async () => {
      const detector = detectorRef.current;
      const video = videoElRef.current;
      const currentStep = stepRef.current;

      if (!detector || !video || video.readyState < 2) return;

      let faces: ReturnType<typeof detectFaces> = [];
      try {
        faces = detectFaces(detector, video);
      } catch {
        return;
      }

      const best = faces.reduce(
        (acc, f) => (f.confidence > (acc?.confidence ?? 0) ? f : acc),
        null as (typeof faces)[0] | null,
      );

      // --- idle: watch for sustained face presence ---
      if (currentStep === 'idle') {
        if (best && best.confidence >= FACE_CONFIDENCE_THRESHOLD) {
          if (!faceFirstSeenRef.current) {
            faceFirstSeenRef.current = performance.now();
          } else if (performance.now() - faceFirstSeenRef.current >= FACE_HOLD_MS) {
            faceFirstSeenRef.current = null;
            setStep('camera');
            window.setTimeout(() => setStep('recognizing'), 1000);
          }
        } else {
          faceFirstSeenRef.current = null;
        }
        return;
      }

      // --- recognizing: one-shot embedding + API call ---
      if (currentStep === 'recognizing') {
        if (recognizingRef.current) return;
        recognizingRef.current = true;

        try {
          if (!best) {
            setError('얼굴을 감지하지 못했어요');
            setStep('failure');
            return;
          }

          const imageData = cropAndAlign(video, best.bbox);
          const embedding = await extractEmbedding(imageData);

          const result = await matchFace({
            embedding: Array.from(embedding),
            type: checkTypeSnapshot,
          });

          if (result.matched && result.employee) {
            setEmployee(result.employee);
            setStep('success');
          } else {
            setError('일치하는 직원을 찾지 못했어요');
            setStep('failure');
          }
        } catch {
          setError('인식 중 오류가 발생했어요');
          setStep('failure');
        } finally {
          recognizingRef.current = false;
        }
      }
    }, POLL_INTERVAL_MS);

    checkTypeSnapshot = checkType;

    return () => clearInterval(id);
    // intentionally omit checkType — we snapshot it inside
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-return from terminal states
  useEffect(() => {
    if (step !== 'success' && step !== 'failure') return;
    const id = window.setTimeout(() => {
      setStep('idle');
      setEmployee(null);
      setError(null);
      recognizingRef.current = false;
    }, AUTO_RETURN_MS);
    return () => clearTimeout(id);
  }, [step]);

  const handleRetry = useCallback(() => {
    setError(null);
    recognizingRef.current = false;
    setStep('camera');
    window.setTimeout(() => setStep('recognizing'), 1000);
  }, []);

  const handleIdleTap = useCallback(() => {
    if (stepRef.current !== 'idle') return;
    faceFirstSeenRef.current = null;
    setStep('camera');
    window.setTimeout(() => setStep('recognizing'), 1000);
  }, []);

  return (
    <div
      role="presentation"
      onClick={step === 'idle' ? handleIdleTap : undefined}
      style={{ width: '100%', minHeight: '100dvh', cursor: step === 'idle' ? 'pointer' : 'default' }}
    >
      {/*
        Single persistent <video> element.
        When step === 'camera', we render ScreenCamera with the same video element passed as ref.
        Otherwise the video is visually hidden (used for idle detection).
      */}
      <video
        ref={videoRefCallback}
        autoPlay
        playsInline
        muted
        style={
          step === 'camera'
            ? { position: 'fixed', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }
            : { position: 'fixed', width: 1, height: 1, opacity: 0, pointerEvents: 'none', top: 0, left: 0 }
        }
      />

      {step === 'idle' && <ScreenIdle />}
      {step === 'camera' && (
        <ScreenCamera
          type={checkType}
          onTypeChange={setCheckType}
        />
      )}
      {step === 'recognizing' && <ScreenRecognizing />}
      {step === 'success' && (
        <ScreenSuccess employee={employee ?? undefined} checkType={checkType} />
      )}
      {step === 'failure' && (
        <ScreenFailure error={error} onRetry={handleRetry} />
      )}
      {step === 'permission-denied' && <ScreenPermDenied />}
    </div>
  );
}
