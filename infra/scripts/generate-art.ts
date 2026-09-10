/**
 * Generates the launch catalog's art (spec §19).
 *
 * Writes PNGs plus a manifest to `infra/seed/assets/`, keyed by the same asset
 * keys the story definitions already reference — so the API's `resolveAssetUrl`
 * picks them up with no story edits.
 *
 * Idempotent: an asset that already exists is skipped unless `--force` is given,
 * so a failed or interrupted run resumes rather than paying to redo work.
 *
 *   npx tsx infra/scripts/generate-art.ts [--force] [--only=<substring>] [--concurrency=3]
 */
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LAUNCH_CATALOG } from '@aniplay/test-fixtures';
import {
  characterPrompt,
  coverPrompt,
  reactionPrompt,
  createMediaGatewayFromEnv,
  keyArtPrompt,
  locationPrompt,
  MediaGatewayError,
  type GeneratedAsset,
  type ImagePromptSpec,
} from '@aniplay/director';
import { coverAssetKey, REACTION_EMOTIONS } from '@aniplay/contracts';
import { compositeTitle } from './cover-title.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const ASSET_DIR = join(ROOT, 'infra/seed/assets');
const MANIFEST = join(ASSET_DIR, 'manifest.json');

interface ManifestEntry {
  assetKey: string;
  file: string;
  kind: string;
  alt: string;
  width: number;
  height: number;
  styleVersion: string;
  provenance: GeneratedAsset['provenance'];
}

async function loadEnv(): Promise<void> {
  // Deliberately not a dependency: the file is two lines of KEY=VALUE.
  try {
    const raw = await readFile(join(ROOT, '.env'), 'utf8');
    for (const line of raw.split('\n')) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (match?.[1] && !process.env[match[1]]) process.env[match[1]] = match[2];
    }
  } catch {
    // No .env is fine when the variables are already exported.
  }
}

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/** Runs tasks with bounded concurrency — image generation is slow and rate-limited. */
async function pool<T>(items: readonly T[], limit: number, worker: (item: T, index: number) => Promise<void>): Promise<void> {
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      await worker(items[index]!, index);
    }
  });
  await Promise.all(runners);
}

async function main(): Promise<void> {
  await loadEnv();

  const args = process.argv.slice(2);
  const force = args.includes('--force');
  // Proving what a run would touch matters more than usual here: the rule is
  // that finished covers are never regenerated, and "I checked the code" is a
  // worse guarantee than a list of exactly which files would be written.
  const dryRun = args.includes('--dry-run');
  /** Reaction decks are a large batch, so they are opt-in. */
  const reactions = args.includes('--reactions');
  const only = args.find((a) => a.startsWith('--only='))?.slice('--only='.length) ?? null;
  const concurrency = Number(args.find((a) => a.startsWith('--concurrency='))?.slice('--concurrency='.length) ?? 3);

  const gateway = dryRun ? null : createMediaGatewayFromEnv();
  if (!gateway && !dryRun) {
    console.error('No OPENAI_API_KEY configured. Set it in .env — the app falls back to placeholder art without it.');
    process.exit(1);
  }

  // Build the full work list from validated story data (§19.4).
  const specs: ImagePromptSpec[] = [];
  for (const story of LAUNCH_CATALOG) {
    specs.push(coverPrompt(story), keyArtPrompt(story));
    for (const location of story.locations) specs.push(locationPrompt(story, location));
    for (const character of story.characters) specs.push(characterPrompt(story, character));

    // Spec §19.7 — reaction decks, for characters a player actually talks to.
    //
    // Only for the cast with a card blurb: those are the people a world puts
    // in front of the player, and generating eight faces for a shopkeeper who
    // appears once is how an art budget disappears. `--only=_react` builds
    // just these.
    if (reactions) {
      for (const character of story.characters.filter((c) => c.cardBlurb.trim().length > 0)) {
        for (const emotion of REACTION_EMOTIONS) {
          specs.push(reactionPrompt(story, character, emotion));
        }
      }
    }
  }

  const filtered = only ? specs.filter((s) => s.assetKey.includes(only)) : specs;

  await mkdir(ASSET_DIR, { recursive: true });
  const manifest: Record<string, ManifestEntry> = (await exists(MANIFEST))
    ? (JSON.parse(await readFile(MANIFEST, 'utf8')) as Record<string, ManifestEntry>)
    : {};

  console.log(`${filtered.length} assets planned · concurrency ${concurrency}`);

  let generated = 0;
  let skipped = 0;
  let failed = 0;
  let costUsd = 0;

  await pool(filtered, concurrency, async (spec) => {
    const file = `${spec.assetKey}.png`;
    const path = join(ASSET_DIR, file);

    // Against the spec's own direction, not a global. Bumping the cover
    // standard for new worlds must never mark a finished asset stale — that is
    // the difference between "new worlds get the new look" and "everything is
    // silently regenerated overnight".
    if (!force && (await exists(path)) && manifest[spec.assetKey]?.styleVersion === spec.styleVersion) {
      skipped++;
      return;
    }

    if (dryRun) {
      generated++;
      console.log(`  · would write ${spec.assetKey} (${spec.kind}, ${spec.styleVersion})`);
      return;
    }

    try {
      let asset = await gateway!.generateImage(spec);

      // The art reserved a quiet band; the wordmark goes on here rather than
      // being spelled by a model that cannot spell.
      if (spec.titleSafeArea) {
        const story = LAUNCH_CATALOG.find((s) => coverAssetKey(s.storyId) === spec.assetKey);
        if (story) {
          // The untouched art is kept beside the finished cover. Typography is
          // the part most likely to want another pass, and without this every
          // adjustment to the wordmark costs a fresh generation of a picture
          // that was already correct.
          const rawPath = join(ASSET_DIR, `${spec.assetKey}.raw.png`);
          await mkdir(dirname(rawPath), { recursive: true });
          await writeFile(rawPath, asset.bytes);

          const plated = await compositeTitle(Buffer.from(asset.bytes), {
            title: story.title,
            kicker: story.fantasyLabel,
            safeTop: spec.titleSafeArea.top,
          });
          asset = { ...asset, bytes: plated.bytes, width: plated.width, height: plated.height };
        }
      }

      // Spec §19.5 — nothing reaches a player without passing acceptance.
      const check = await gateway!.moderateMedia(asset);
      if (!check.approved) {
        failed++;
        console.error(`  ✗ ${spec.assetKey} — rejected: ${check.reason}`);
        return;
      }

      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, asset.bytes);

      manifest[spec.assetKey] = {
        assetKey: spec.assetKey,
        file,
        kind: spec.kind,
        alt: spec.alt,
        width: asset.width,
        height: asset.height,
        styleVersion: spec.styleVersion,
        provenance: asset.provenance,
      };
      await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

      generated++;
      costUsd += asset.provenance.costUsd;
      console.log(
        `  ✓ ${spec.assetKey} (${asset.width}×${asset.height}, ${Math.round(asset.bytes.length / 1024)}KB, ${(asset.provenance.latencyMs / 1000).toFixed(1)}s)`,
      );
    } catch (error) {
      failed++;
      const message = error instanceof MediaGatewayError ? `${error.code}: ${error.message}` : String(error);
      console.error(`  ✗ ${spec.assetKey} — ${message}`);
    }
  });

  console.log(
    dryRun
      ? `\nDry run. ${generated} would be written, ${skipped} already current and untouched.`
      : `\nDone. ${generated} generated, ${skipped} already current, ${failed} failed. Approx cost $${costUsd.toFixed(2)}.`,
  );
  if (failed > 0) process.exitCode = 1;
}

void main();
