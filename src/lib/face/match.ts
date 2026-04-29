import type { FaceEmbedding, MatchResult } from './types';

export function l2Normalize(v: FaceEmbedding): FaceEmbedding {
  let sumSq = 0;
  for (let i = 0; i < v.length; i++) {
    sumSq += v[i]! * v[i]!;
  }
  const norm = Math.sqrt(sumSq);
  if (norm === 0) return new Float32Array(v.length);
  const out = new Float32Array(v.length);
  for (let i = 0; i < v.length; i++) {
    out[i] = v[i]! / norm;
  }
  return out;
}

export function cosineSimilarity(a: FaceEmbedding, b: FaceEmbedding): number {
  const na = l2Normalize(a);
  const nb = l2Normalize(b);
  let dot = 0;
  for (let i = 0; i < na.length; i++) {
    dot += na[i]! * nb[i]!;
  }
  return Math.max(-1, Math.min(1, dot));
}

export function matchEmbedding(
  query: FaceEmbedding,
  reference: FaceEmbedding,
  threshold = 0.4,
): MatchResult {
  const similarity = cosineSimilarity(query, reference);
  return { similarity, matched: similarity >= threshold };
}

export function bestMatch(
  query: FaceEmbedding,
  candidates: Array<{ id: string; embedding: FaceEmbedding }>,
  threshold = 0.4,
): { id: string; similarity: number } | null {
  if (candidates.length === 0) return null;

  let best: { id: string; similarity: number } | null = null;
  for (const candidate of candidates) {
    const similarity = cosineSimilarity(query, candidate.embedding);
    if (similarity >= threshold && (best === null || similarity > best.similarity)) {
      best = { id: candidate.id, similarity };
    }
  }
  return best;
}
