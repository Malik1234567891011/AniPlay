/**
 * Which French now describes a world that has moved.
 *
 *   npm run fr:stale
 *   npm run fr:stale -- --world=story_hush_house
 *
 * English is not finished and will not be. Every time a premise is sharpened or
 * a voice is retuned, the French written from the old version quietly becomes
 * wrong — and nothing about it looks wrong. The file is still French, still
 * grammatical, still in the right place. It just no longer says what the world
 * says.
 *
 * So every entry in an overlay carries the hash of the English it was written
 * from, in a comment above it. This compares those against the English as it is
 * now. It reports three things:
 *
 *   **STALE**   — the English changed. The French needs redoing.
 *   **ORPHAN**  — the path no longer exists. The French is describing something
 *                 that was deleted.
 *   **MISSING** — English prose with no French at all. Coverage, not rot.
 *
 * Run it before a release and after any English content change.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { LAUNCH_CATALOG } from '@aniplay/test-fixtures';
import { manifestFor } from './fr-manifest.js';

const ROOT = new URL('../..', import.meta.url).pathname.replace(/\/$/, '');
const FR_DIR = join(ROOT, 'packages/test-fixtures/src/fr');

/** `// A · 3f9c1a2b4d5e` then `"path": …` on the next line. */
const ENTRY = /\/\/\s*([ABC])\s*·\s*([0-9a-f]{6,})\s*\n\s*"([^"]+)":/g;

interface Recorded {
  readonly tier: string;
  readonly hash: string;
}

function recorded(file: string): Map<string, Recorded> {
  const source = readFileSync(file, 'utf8');
  const found = new Map<string, Recorded>();
  for (const match of source.matchAll(ENTRY)) {
    found.set(match[3]!, { tier: match[1]!, hash: match[2]! });
  }
  return found;
}

function main(): void {
  const only = process.argv.slice(2).find((a) => a.startsWith('--world='))?.slice('--world='.length);

  const byStory = new Map<string, Map<string, Recorded>>();
  for (const file of readdirSync(FR_DIR)) {
    if (!file.endsWith('.fr.ts')) continue;
    const source = readFileSync(join(FR_DIR, file), 'utf8');
    const id = /storyId:\s*"([^"]+)"|storyId:\s*'([^']+)'/.exec(source);
    const storyId = id?.[1] ?? id?.[2];
    if (storyId) byStory.set(storyId, recorded(join(FR_DIR, file)));
  }

  let stale = 0;
  let orphan = 0;
  let missing = 0;

  for (const world of LAUNCH_CATALOG as unknown as Array<{ storyId: string; title: string }>) {
    if (only && world.storyId !== only) continue;
    const overlay = byStory.get(world.storyId);
    if (!overlay) continue;

    const current = new Map(
      manifestFor(world)
        .filter((f) => f.tier !== 'C')
        .map((f) => [f.path, f]),
    );

    const problems: string[] = [];

    for (const [path, entry] of overlay) {
      const now = current.get(path);
      if (!now) {
        problems.push(`  ORPHAN  ${path}`);
        orphan += 1;
        continue;
      }
      if (now.sourceHash !== entry.hash) {
        problems.push(`  STALE   ${path}  (${entry.tier})  ${entry.hash} → ${now.sourceHash}`);
        stale += 1;
      }
    }

    for (const [path, field] of current) {
      // Only prose worth reporting. A three-word label with no French is noise
      // next to a premise with none.
      if (overlay.has(path)) continue;
      if (field.chars < 40) continue;
      missing += 1;
      if (problems.length < 40) problems.push(`  MISSING ${path}  (${field.tier}, ${field.chars} chars)`);
    }

    if (problems.length > 0) {
      console.log(`\n${world.title}`);
      for (const line of problems.slice(0, 40)) console.log(line);
      if (problems.length > 40) console.log(`  … and ${problems.length - 40} more`);
    }
  }

  console.log(`\n${stale} stale, ${orphan} orphaned, ${missing} missing.`);
  if (stale > 0 || orphan > 0) {
    console.log('Re-run `npm run fr:adapt -- --world=<id>` for anything stale or orphaned.');
    process.exitCode = 1;
  }
}

main();
