/**
 * Redraws the wordmark on covers whose raw art is already on disk.
 *
 * Typography is the part of a cover most likely to want another pass, and a
 * generated picture that was already correct should not be paid for twice to
 * move a line of type. Covers generated after this existed keep their untouched
 * art beside them as `<key>.raw.png`; this reads those and re-runs only the
 * compositing step.
 *
 *   npx tsx infra/scripts/recomposite-titles.ts
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LAUNCH_CATALOG } from '@aniplay/test-fixtures';
import { coverAssetKey } from '@aniplay/contracts';
import { TITLE_SAFE_AREA } from '@aniplay/director';
import { compositeTitle } from './cover-title.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const ASSET_DIR = join(ROOT, 'infra/seed/assets');

async function main(): Promise<void> {
  let done = 0;
  let missing = 0;

  for (const story of LAUNCH_CATALOG) {
    const key = coverAssetKey(story.storyId);
    const rawPath = join(ASSET_DIR, `${key}.raw.png`);

    let raw: Buffer;
    try {
      raw = await readFile(rawPath);
    } catch {
      missing += 1;
      continue;
    }

    const plated = await compositeTitle(raw, {
      title: story.title,
      kicker: story.fantasyLabel,
      safeTop: TITLE_SAFE_AREA.top,
    });
    await writeFile(join(ASSET_DIR, `${key}.png`), plated.bytes);
    console.log(`  ✓ ${story.title}`);
    done += 1;
  }

  console.log(`\n${done} recomposited, ${missing} without raw art (nothing regenerated).`);
  void readdir;
}

void main();
