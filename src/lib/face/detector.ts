import {
  FaceDetector,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import type { FaceDetection } from './types';

const WASM_BASE = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm';
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite';

export async function createDetector(): Promise<FaceDetector> {
  const vision = await FilesetResolver.forVisionTasks(WASM_BASE);

  const detector = await FaceDetector.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: MODEL_URL,
      delegate: 'GPU',
    },
    runningMode: 'VIDEO',
    minDetectionConfidence: 0.5,
    minSuppressionThreshold: 0.3,
  });

  return detector;
}

export function detectFaces(
  detector: FaceDetector,
  source: HTMLVideoElement | HTMLCanvasElement | HTMLImageElement,
): FaceDetection[] {
  const timestampMs = performance.now();

  let rawResult;
  if (source instanceof HTMLVideoElement || source instanceof HTMLCanvasElement) {
    rawResult = detector.detectForVideo(source, timestampMs);
  } else {
    rawResult = detector.detect(source);
  }

  const { detections } = rawResult;

  return detections.map((d) => {
    const box = d.boundingBox;
    const kps = d.keypoints ?? [];
    return {
      bbox: {
        x: box?.originX ?? 0,
        y: box?.originY ?? 0,
        width: box?.width ?? 0,
        height: box?.height ?? 0,
      },
      confidence: d.categories[0]?.score ?? 0,
      keypoints: kps.map((kp) => ({
        x: kp.x,
        y: kp.y,
        label: kp.label,
      })),
    };
  });
}
