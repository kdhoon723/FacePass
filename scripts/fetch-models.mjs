#!/usr/bin/env node
/**
 * Downloads + extracts the ONNX models needed for on-device face recognition.
 *
 * Source: InsightFace's official `buffalo_s` model pack (public, ~127 MB) which
 * ships SCRFD detection + MobileFaceNet (w600k_mbf) embedding. We extract only
 * the two ONNX files we actually use and drop them in `public/models/` so
 * Vite copies them to `dist/models/` during build.
 *
 * Runs automatically on `postinstall` and `prebuild` (see package.json scripts),
 * so neither the developer nor the deployed kiosk ever needs to fetch the
 * model manually. Idempotent: skips download when both ONNX files already
 * exist with the expected size.
 */

import { execSync } from 'node:child_process';
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  mkdtempSync,
  renameSync,
  rmSync,
  statSync,
  unlinkSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MODELS_DIR = join(ROOT, 'public', 'models');

const PACK_URL = 'https://github.com/deepinsight/insightface/releases/download/v0.7/buffalo_s.zip';

// Files we want out of the pack. Internal zip layout varies between
// InsightFace pack versions (sometimes `buffalo_s/<file>`, sometimes flat),
// so we extract every *.onnx into a flat dir with `unzip -j` and pick by
// filename.
const TARGETS = [
  {
    name: 'w600k_mbf.onnx',
    minBytes: 4_000_000, // ~5 MB
    note: 'MobileFaceNet 512-dim face embedding (ArcFace, InsightFace buffalo_s)',
  },
  {
    name: 'det_500m.onnx',
    minBytes: 1_000_000, // ~2.5 MB
    note: 'SCRFD-500m face detector (alternative to MediaPipe)',
  },
];

function bytesOnDisk(file) {
  try {
    return statSync(file).size;
  } catch {
    return 0;
  }
}

function allTargetsPresent() {
  return TARGETS.every((t) => bytesOnDisk(join(MODELS_DIR, t.name)) >= t.minBytes);
}

async function streamToFile(url, dest) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}`);
  if (!res.body) throw new Error(`Empty response body for ${url}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
}

function extractAllOnnx(zipPath, destDir) {
  // -j strips the directory tree so every *.onnx ends up flat in destDir.
  // -o overwrites existing files; -q suppresses unzip's per-file chatter.
  try {
    execSync(`unzip -j -o -q '${zipPath}' '*.onnx' -d '${destDir}'`, { stdio: 'inherit' });
  } catch (error) {
    throw new Error(`unzip failed (is the 'unzip' command installed?): ${error.message}`);
  }
}

async function main() {
  if (process.env.FACEPASS_SKIP_MODEL_FETCH === '1') {
    console.log('[fetch-models] FACEPASS_SKIP_MODEL_FETCH=1 — skipping');
    return;
  }
  if (!existsSync(MODELS_DIR)) mkdirSync(MODELS_DIR, { recursive: true });

  if (allTargetsPresent()) {
    for (const t of TARGETS) {
      const sz = bytesOnDisk(join(MODELS_DIR, t.name));
      console.log(`[fetch-models] ✓ ${t.name} (${(sz / 1_000_000).toFixed(2)} MB, cached)`);
    }
    return;
  }

  const tmpDir = mkdtempSync(join(tmpdir(), 'facepass-models-'));
  const zipPath = join(tmpDir, 'buffalo_s.zip');
  console.log(`[fetch-models] ↓ buffalo_s.zip (~127 MB) ← ${PACK_URL}`);

  try {
    await streamToFile(PACK_URL, zipPath);
    const zipSize = statSync(zipPath).size;
    if (zipSize < 100_000_000) {
      throw new Error(`buffalo_s.zip looks too small (${zipSize} B)`);
    }
    console.log(`[fetch-models] ✓ downloaded ${(zipSize / 1_000_000).toFixed(1)} MB → extracting`);

    const extractDir = join(tmpDir, 'extracted');
    mkdirSync(extractDir, { recursive: true });
    extractAllOnnx(zipPath, extractDir);

    for (const t of TARGETS) {
      const src = join(extractDir, t.name);
      const dst = join(MODELS_DIR, t.name);
      if (!existsSync(src)) throw new Error(`missing ${t.name} after unzip`);
      const sz = statSync(src).size;
      if (sz < t.minBytes) {
        throw new Error(`${t.name} too small (${sz} B, expected ≥${t.minBytes})`);
      }
      if (existsSync(dst)) unlinkSync(dst);
      renameSync(src, dst);
      console.log(`[fetch-models] ✓ ${t.name} (${(sz / 1_000_000).toFixed(2)} MB)`);
    }
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error('[fetch-models] failed:', error.message);
  process.exit(1);
});
