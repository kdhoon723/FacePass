import { useCallback, useEffect, useRef, useState } from 'react';
import { useCamera } from '@/lib/face/useCamera';
import { createDetector, detectFaces } from '@/lib/face/detector';
import { cropAndAlign, extractEmbedding } from '@/lib/face/embedding';
import { matchFace, fetchKioskSummary } from '@/lib/api';
import type { MatchResponse, KioskSummary } from '@/lib/api-types';
import type { FaceDetector } from '@mediapipe/tasks-vision';
import ScreenIdle from './ScreenIdle';
import ScreenCamera from './ScreenCamera';
import ScreenRecognizing from './ScreenRecognizing';
import ScreenSuccess from './ScreenSuccess';
import ScreenFailure from './ScreenFailure';
import ScreenPermDenied from '@/screens/edge/ScreenPermDenied';
import ScreenEmpNo from '@/screens/edge/ScreenEmpNo';

type Step = 'idle' | 'camera' | 'recognizing' | 'success' | 'failure' | 'permission-denied' | 'empno';

const FACE_CONFIDENCE_THRESHOLD = 0.75; // raised from 0.7 to avoid jitter at the boundary
const FACE_HOLD_MS = 1200; // raised from 1000 — gives the user time to settle
const POLL_INTERVAL_MS = 100;
const AUTO_RETURN_SUCCESS_MS = 3000;
const AUTO_RETURN_FAILURE_MS = 4500; // longer than success so failure cycles slow down
const POST_TERMINAL_COOLDOWN_MS = 1500; // ignore face presence right after returning to idle

export default function KioskApp() {
  const [step, setStep] = useState<Step>('idle');
  const [employee, setEmployee] = useState<MatchResponse['employee'] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkType, setCheckType] = useState<'check_in' | 'check_out'>('check_in');
  const [recognizedAt, setRecognizedAt] = useState<Date | null>(null);
  const [summary, setSummary] = useState<KioskSummary | null>(null);
  /**
   * Bounding box of the most recent detected face, in **video pixel space**
   * (not screen pixels). ScreenCamera/ScreenRecognizing render an SVG overlay
   * on top of the live <video> using these numbers, so the user can see the
   * kiosk is tracking *their* face — not just spinning a generic animation.
   */
  const [faceBox, setFaceBox] = useState<{ x: number; y: number; width: number; height: number; videoW: number; videoH: number } | null>(null);
  /** dataURL of the cropped face used for embedding extraction. Surfaces in
   *  ScreenRecognizing so it's obvious which exact image is being analyzed. */
  const [capturedFace, setCapturedFace] = useState<string | null>(null);

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
  /** Timestamp of the last entry into idle. We refuse to start a new face hold
   *  until POST_TERMINAL_COOLDOWN_MS has passed — otherwise a single user
   *  standing in front of the kiosk after a failure would immediately retrigger
   *  another recognition cycle and the screen would flap every few seconds. */
  const idleEnteredAtRef = useRef<number>(performance.now());

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

      // Update the live face bounding box for SVG overlay
      if (best) {
        setFaceBox({
          x: best.bbox.x,
          y: best.bbox.y,
          width: best.bbox.width,
          height: best.bbox.height,
          videoW: video.videoWidth || 1280,
          videoH: video.videoHeight || 720,
        });
      } else if (currentStep === 'idle' || currentStep === 'camera') {
        setFaceBox(null);
      }

      // --- idle: watch for sustained face presence ---
      if (currentStep === 'idle') {
        // Cooldown: don't restart the face-hold timer for the first 1.5s after
        // returning to idle. Prevents fast cycle of failure → idle → camera again.
        if (performance.now() - idleEnteredAtRef.current < POST_TERMINAL_COOLDOWN_MS) {
          faceFirstSeenRef.current = null;
          return;
        }
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

          // Surface the cropped face as a thumbnail so the user sees exactly
          // which frame the kiosk is analyzing.
          try {
            const canvas = document.createElement('canvas');
            canvas.width = imageData.width;
            canvas.height = imageData.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.putImageData(imageData, 0, 0);
              setCapturedFace(canvas.toDataURL('image/jpeg', 0.85));
            }
          } catch {
            // best-effort — don't block recognition on thumbnail failures
          }

          const embedding = await extractEmbedding(imageData);

          const result = await matchFace({
            embedding: Array.from(embedding),
            type: checkTypeRef.current,
          });

          if (result.matched && result.employee) {
            setEmployee(result.employee);
            setRecognizedAt(new Date());
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

  // Auto-return from terminal states. Failure waits longer than success so the
  // user has time to read why it failed, and so a person standing in front of
  // the kiosk doesn't immediately retrigger another cycle.
  useEffect(() => {
    if (step !== 'success' && step !== 'failure') return;
    const ms = step === 'success' ? AUTO_RETURN_SUCCESS_MS : AUTO_RETURN_FAILURE_MS;
    const id = window.setTimeout(() => {
      setStep('idle');
      setEmployee(null);
      setError(null);
      setRecognizedAt(null);
      setCapturedFace(null);
      setFaceBox(null);
      recognizingRef.current = false;
      idleEnteredAtRef.current = performance.now();
    }, ms);
    return () => clearTimeout(id);
  }, [step]);

  // Today summary — refresh on mount, after each terminal state, and every minute
  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetchKioskSummary()
        .then((s) => { if (!cancelled) setSummary(s); })
        .catch(() => { /* swallow — idle screen falls back to dashes */ });
    };
    load();
    const id = window.setInterval(load, 60_000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  // Pull a fresh summary right after a successful check-in/out so the idle
  // screen shows the new "마지막 인증" instantly.
  useEffect(() => {
    if (step !== 'success') return;
    fetchKioskSummary().then(setSummary).catch(() => {});
  }, [step]);

  const handleRetry = useCallback(() => {
    setError(null);
    setCapturedFace(null);
    setFaceBox(null);
    recognizingRef.current = false;
    idleEnteredAtRef.current = performance.now();
    setStep('idle');
  }, []);

  return (
    <div
      role="presentation"
      style={{ width: '100%', minHeight: '100dvh', position: 'relative' }}
    >
      {/*
        Single persistent <video> element. Visible as fullscreen background
        during BOTH camera and recognizing so the user keeps seeing themselves
        through the analysis (no jarring cut-to-black). Hidden in idle/success/
        failure where the designed screens own the visuals.
      */}
      <video
        ref={videoRefCallback}
        autoPlay
        playsInline
        muted
        style={
          step === 'camera' || step === 'recognizing'
            ? {
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                // Mirror the front-facing video so users see themselves
                // selfie-style (left hand on the left side of the screen).
                transform: 'scaleX(-1)',
                zIndex: 0,
              }
            : {
                position: 'fixed',
                width: 1,
                height: 1,
                opacity: 0,
                pointerEvents: 'none',
                top: 0,
                left: 0,
              }
        }
      />

      {/* Live face-detection overlay — drawn on top of the video during
          camera/recognizing so the user can see the kiosk is tracking them. */}
      {(step === 'camera' || step === 'recognizing') && faceBox && (
        <FaceBoxOverlay box={faceBox} active={step === 'recognizing'} />
      )}

      {/* Live status overlay — visible on every step. Confirms the kiosk is
          really running ONNX/MediaPipe instead of a canned demo. */}
      <StatusOverlay
        cameraState={camera.state}
        detectorReady={detectorReady}
        faceConfidence={faceConfidence}
        step={step}
      />

      {step === 'idle' && (
        <ScreenIdle
          stats={
            summary
              ? {
                  checkedInToday: summary.checkedInToday,
                  totalEmployees: summary.totalEmployees,
                  lastRecognition: summary.lastRecognition,
                }
              : null
          }
          onEmpnoFallback={() => setStep('empno')}
        />
      )}
      {step === 'camera' && <ScreenCamera type={checkType} onTypeChange={setCheckType} onBack={() => setStep('idle')} />}
      {step === 'recognizing' && <ScreenRecognizing capturedFace={capturedFace} />}
      {step === 'success' && (
        <ScreenSuccess
          employee={employee ?? undefined}
          checkType={checkType}
          recognizedAt={recognizedAt ?? undefined}
          onClose={() => setStep('idle')}
        />
      )}
      {step === 'failure' && (
        <ScreenFailure
          error={error}
          onRetry={handleRetry}
          onClose={() => setStep('idle')}
          onEmpnoFallback={() => setStep('empno')}
        />
      )}
      {step === 'permission-denied' && <ScreenPermDenied />}
      {step === 'empno' && (
        <ScreenEmpNo
          onBack={() => setStep('idle')}
          onSubmit={(_empNo, _type) => {
            alert('사번 매칭 기능은 다음 업데이트에서 추가될 예정이에요. 얼굴 인식을 다시 시도해주세요.');
            setStep('idle');
          }}
        />
      )}
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

interface FaceBoxOverlayProps {
  box: { x: number; y: number; width: number; height: number; videoW: number; videoH: number };
  active: boolean;
}

/**
 * Draws the live face bounding box on top of the fullscreen video. The
 * coordinates from MediaPipe are in video pixel space, but the video uses
 * `object-fit: cover`, so we map video-px → viewport-px with the same cover
 * math the browser uses internally (scale = max(viewportW/videoW, viewportH/videoH)).
 */
function FaceBoxOverlay({ box, active }: FaceBoxOverlayProps) {
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scale = Math.max(vp.w / box.videoW, vp.h / box.videoH);
  const renderedW = box.videoW * scale;
  const renderedH = box.videoH * scale;
  const offsetX = (vp.w - renderedW) / 2;
  const offsetY = (vp.h - renderedH) / 2;

  // user-facing camera is mirrored visually (the browser doesn't mirror by
  // default but most kiosk styles do), so we mirror the X coordinate.
  const left = offsetX + (box.videoW - box.x - box.width) * scale;
  const top = offsetY + box.y * scale;
  const w = box.width * scale;
  const h = box.height * scale;

  const color = active ? '#3182F6' : 'rgba(255,255,255,0.85)';
  const corner = Math.max(20, Math.min(40, w * 0.15));

  return (
    <svg
      width={vp.w}
      height={vp.h}
      style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}
    >
      {/* corner ticks */}
      {([
        [left, top, 1, 1],
        [left + w, top, -1, 1],
        [left, top + h, 1, -1],
        [left + w, top + h, -1, -1],
      ] as [number, number, number, number][]).map(([cx, cy, dx, dy], i) => (
        <g key={i} stroke={color} strokeWidth="3" strokeLinecap="round" fill="none"
           style={{ filter: active ? 'drop-shadow(0 0 8px rgba(49,130,246,.7))' : undefined }}>
          <path d={`M${cx} ${cy} L${cx + dx * corner} ${cy}`} />
          <path d={`M${cx} ${cy} L${cx} ${cy + dy * corner}`} />
        </g>
      ))}
    </svg>
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
