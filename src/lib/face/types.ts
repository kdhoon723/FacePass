export interface FaceDetection {
  bbox: { x: number; y: number; width: number; height: number };
  confidence: number;
  keypoints?: Array<{ x: number; y: number; label?: string }>;
}

export type FaceEmbedding = Float32Array; // 512-dim

export interface MatchResult {
  similarity: number; // 코사인 유사도 -1 ~ 1
  matched: boolean; // similarity >= threshold
}
