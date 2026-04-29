import type { InferenceSession, Tensor } from 'onnxruntime-web';
import type { FaceEmbedding } from './types';
import type { FaceDetection } from './types';

const MODEL_PATH = '/models/w600k_mbf.onnx';
const INPUT_SIZE = 112;
const MEAN = 0.5;
const STD = 0.5;

let sessionPromise: Promise<InferenceSession> | null = null;

async function getSession(): Promise<InferenceSession> {
  if (sessionPromise) return sessionPromise;

  sessionPromise = (async () => {
    const ort = await import('onnxruntime-web');
    try {
      return await ort.InferenceSession.create(MODEL_PATH, {
        executionProviders: ['webgpu', 'wasm'],
      });
    } catch {
      // WebGPU may not be available — fall back explicitly to wasm
      return await ort.InferenceSession.create(MODEL_PATH, {
        executionProviders: ['wasm'],
      });
    }
  })();

  return sessionPromise;
}

export async function loadEmbeddingModel(): Promise<void> {
  await getSession();
}

function imageDataToTensor(imageData: ImageData): Tensor {
  const { data, width, height } = imageData;
  // NCHW: [1, 3, H, W]
  const float32 = new Float32Array(3 * height * width);
  const channelSize = height * width;

  for (let i = 0; i < height * width; i++) {
    const r = data[i * 4]! / 255;
    const g = data[i * 4 + 1]! / 255;
    const b = data[i * 4 + 2]! / 255;

    float32[0 * channelSize + i] = (r - MEAN) / STD;
    float32[1 * channelSize + i] = (g - MEAN) / STD;
    float32[2 * channelSize + i] = (b - MEAN) / STD;
  }

  // Import ort lazily — we only need Tensor constructor here
  // Use a synchronous path: build tensor manually as plain object
  // ort.Tensor is a class; we rely on InferenceSession.run() typing
  return {
    data: float32,
    dims: [1, 3, INPUT_SIZE, INPUT_SIZE],
    type: 'float32',
  } as unknown as Tensor;
}

export function cropAndAlign(
  source: HTMLVideoElement | HTMLCanvasElement | HTMLImageElement,
  bbox: FaceDetection['bbox'],
): ImageData {
  const canvas = document.createElement('canvas');
  canvas.width = INPUT_SIZE;
  canvas.height = INPUT_SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D context for crop');

  ctx.drawImage(
    source,
    bbox.x,
    bbox.y,
    bbox.width,
    bbox.height,
    0,
    0,
    INPUT_SIZE,
    INPUT_SIZE,
  );

  return ctx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);
}

export async function extractEmbedding(
  faceImage: ImageData | HTMLCanvasElement,
): Promise<FaceEmbedding> {
  let imageData: ImageData;

  if (faceImage instanceof HTMLCanvasElement) {
    const ctx = faceImage.getContext('2d');
    if (!ctx) throw new Error('Failed to get 2D context from canvas');
    imageData = ctx.getImageData(0, 0, faceImage.width, faceImage.height);
  } else {
    imageData = faceImage;
  }

  // Resize to 112x112 if needed
  let processedData = imageData;
  if (imageData.width !== INPUT_SIZE || imageData.height !== INPUT_SIZE) {
    const offscreen = document.createElement('canvas');
    offscreen.width = INPUT_SIZE;
    offscreen.height = INPUT_SIZE;
    const ctx2 = offscreen.getContext('2d');
    if (!ctx2) throw new Error('Failed to get 2D context for resize');

    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = imageData.width;
    tmpCanvas.height = imageData.height;
    const tmpCtx = tmpCanvas.getContext('2d');
    if (!tmpCtx) throw new Error('Failed to get 2D context for temp canvas');
    tmpCtx.putImageData(imageData, 0, 0);

    ctx2.drawImage(tmpCanvas, 0, 0, INPUT_SIZE, INPUT_SIZE);
    processedData = ctx2.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);
  }

  const session = await getSession();
  const ort = await import('onnxruntime-web');

  const { data, dims } = imageDataToTensor(processedData) as unknown as {
    data: Float32Array;
    dims: number[];
  };
  const inputTensor = new ort.Tensor('float32', data, dims);

  const inputName = session.inputNames[0] ?? 'input';
  const feeds: Record<string, InstanceType<typeof ort.Tensor>> = {
    [inputName]: inputTensor,
  };

  const results = await session.run(feeds);
  const outputName = session.outputNames[0] ?? 'output';
  const outputTensor = results[outputName];
  if (!outputTensor) throw new Error('No output tensor from model');

  return new Float32Array(outputTensor.data as Float32Array);
}
