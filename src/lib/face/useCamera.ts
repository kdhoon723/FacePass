import { useCallback, useRef, useState } from 'react';

export type CameraState = 'idle' | 'requesting' | 'streaming' | 'denied' | 'error';

export interface UseCameraReturn {
  videoRef: (el: HTMLVideoElement | null) => void;
  state: CameraState;
  error: Error | null;
  start: () => Promise<void>;
  stop: () => void;
}

export function useCamera(): UseCameraReturn {
  const [state, setState] = useState<CameraState>('idle');
  const [error, setError] = useState<Error | null>(null);
  const stateRef = useRef<CameraState>('idle');
  stateRef.current = state;

  const videoElRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const videoRef = useCallback((el: HTMLVideoElement | null) => {
    videoElRef.current = el;
    if (el && streamRef.current) {
      el.srcObject = streamRef.current;
    }
  }, []);

  const start = useCallback(async () => {
    if (stateRef.current === 'requesting' || stateRef.current === 'streaming') return;

    setState('requesting');
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;

      if (videoElRef.current) {
        videoElRef.current.srcObject = stream;
        await videoElRef.current.play();
      }

      setState('streaming');
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);

      if (
        e.name === 'NotAllowedError' ||
        e.name === 'PermissionDeniedError'
      ) {
        setState('denied');
      } else {
        setState('error');
      }
    }
  }, []);

  const stop = useCallback(() => {
    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) {
        track.stop();
      }
      streamRef.current = null;
    }

    if (videoElRef.current) {
      videoElRef.current.srcObject = null;
    }

    setState('idle');
    setError(null);
  }, []);

  return { videoRef, state, error, start, stop };
}
