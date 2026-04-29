export type { FaceDetection, FaceEmbedding, MatchResult } from './types';
export type { CameraState, UseCameraReturn } from './useCamera';

export { useCamera } from './useCamera';
export { createDetector, detectFaces } from './detector';
export { loadEmbeddingModel, extractEmbedding, cropAndAlign } from './embedding';
export { cosineSimilarity, bestMatch, l2Normalize, matchEmbedding } from './match';
