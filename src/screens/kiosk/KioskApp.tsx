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

  // Live status — surfaced in a tiny overlay so an operator can confirm at a
  // glance that the camera is actually streaming and the detector is loaded.
  // Without this people assume "the screen advanced therefore it must be a demo"
  // because they can't see the underlying signals.
  const [detectorReady, setDetectorReady] = useState(false);
  const [faceConfidence, setFaceConfidence] = useState<number | null>(null);

  const camera = useCamera();
  const cameraStateRef = useRef(camera.state);
  cameraStateRef.current = camera.state;

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
  const checkTypeRef = useRef(checkType);
  checkTypeRef.current = checkType;

  // Start camera on mount
  useEffect(() => {
    camera.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Camera state → permission denied
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
        if (cancelled) return;
        detectorRef.current = d;
        setDetectorReady(true);
      })
      .catch(() => {
        // detector unavailable — kiosk can't auto-recognize; status badge will
        // surface the failure instead of silently bypassing detection.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Detection + recognition poll loop
  useEffect(() => {
    const id = setInterval(async () => {
      const detector = detectorRef.current;
      const video = videoElRef.current;
      const currentStep = stepRef.current;

      if (!detector || !video || video.readyState < 2) return;
      if (cameraStateRef.current !== 'streaming') return;

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

      // Always surface the live confidence so operators can see detection working
      setFaceConfidence(best ? best.confidence : null);

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
            type: checkTypeRef.current,
          });

          if (result.matched && result.employee) {
            setEmployee(result.employee);
            setStep('success');
          } else {
            setError('등록된 직원과 일치하지 않아요');
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

    return () => clearInterval(id);
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
    setStep('idle');
  }, []);

  return (
    <div
      role="presentation"
      style={{ width: '100%', minHeight: '100dvh', position: 'relative' }}
    >
      {/*
        Single persistent <video> element. Hidden during idle / recognizing /
        success / failure so the kiosk shows the designed screens. During the
        camera step the same element is rescaled to cover the viewport.
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

      {/* Live status overlay — visible on every step. Confirms the kiosk is
          really running ONNX/MediaPipe instead of a canned demo. */}
      <StatusOverlay
        cameraState={camera.state}
        detectorReady={detectorReady}
        faceConfidence={faceConfidence}
        step={step}
      />

      {step === 'idle' && <ScreenIdle />}
      {step === 'camera' && <ScreenCamera type={checkType} onTypeChange={setCheckType} />}
      {step === 'recognizing' && <ScreenRecognizing />}
      {step === 'success' && <ScreenSuccess employee={employee ?? undefined} checkType={checkType} />}
      {step === 'failure' && <ScreenFailure error={error} onRetry={handleRetry} />}
      {step === 'permission-denied' && <ScreenPermDenied />}
    </div>
  );
}

interface StatusOverlayProps {
  cameraState: ReturnType<typeof useCamera>['state'];
  detectorReady: boolean;
  faceConfidence: number | null;
  step: Step;
}

function StatusOverlay({ cameraState, detectorReady, faceConfidence, step }: StatusOverlayProps) {
  const cameraColor =
    cameraState === 'streaming' ? '#22c55e'
    : cameraState === 'denied' || cameraState === 'error' ? '#ef4452'
    : '#f59e0b';
  const detectorColor = detectorReady ? '#22c55e' : '#f59e0b';
  const cameraLabel =
    cameraState === 'streaming' ? '카메라'
    : cameraState === 'requesting' ? '카메라 요청'
    : cameraState === 'denied' ? '권한 거부'
    : cameraState === 'error' ? '카메라 오류'
    : '카메라 대기';

  return (
    <div
      style={{
        position: 'fixed',
        top: 12,
        right: 12,
        zIndex: 1000,
        display: 'flex',
        gap: 6,
        fontFamily: 'var(--font-mono, ui-monospace), monospace',
        fontSize: 10,
        fontWeight: 700,
        pointerEvents: 'none',
      }}
    >
      <Pill color={cameraColor} label={cameraLabel} />
      <Pill color={detectorColor} label={detectorReady ? '검출기' : '검출기 로드중'} />
      {faceConfidence !== null && (
        <Pill
          color={faceConfidence >= 0.7 ? '#22c55e' : '#94a3b8'}
          label={`얼굴 ${(faceConfidence * 100).toFixed(0)}%`}
        />
      )}
      <Pill color="#3182F6" label={`step: ${step}`} />
    </div>
  );
}

function Pill({ color, label }: { color: string; label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        padding: '4px 9px',
        borderRadius: 999,
        background: 'rgba(15,23,42,0.78)',
        color: '#fff',
        backdropFilter: 'blur(8px)',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 99, background: color }} />
      {label}
    </div>
  );
}
