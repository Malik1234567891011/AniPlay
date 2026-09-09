import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { CharacterDef, StoryVersion } from '@aniplay/contracts';
import {
  MediaGatewayError,
  heroFramePrompt,
  type MediaGateway,
} from '@aniplay/director';
import type { JobContext, JobQueue } from './queue.js';

/**
 * Spec §32.2 job handlers.
 *
 * The one that matters most at launch is the hero frame (§19.1 tier 2). It runs
 * here rather than in the turn path for a specific reason: §17.8 says images
 * must never block the player from reading a completed turn or composing the
 * next one. The turn commits, the job is enqueued, and the image attaches when
 * it is ready.
 */

/**
 * The seeded asset directory, anchored to this file rather than to
 * `process.cwd()`.
 *
 * npm workspace scripts run with the cwd set to the workspace, so
 * `npm run api` resolved this to `services/worker/infra/seed/assets` — a
 * directory that does not exist — and every generated image 404'd, while
 * running the same entrypoint from the repo root worked. Where the repo lives
 * relative to this module is a fixed fact; where the process was launched from
 * is not.
 */
const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const ASSET_ROOT = process.env.ASSET_ROOT ?? resolve(REPO_ROOT, 'infra/seed/assets');

export interface HeroImageJob {
  readonly turnId: string;
  readonly sessionId: string;
  readonly storyVersionId: string;
  readonly locationId: string;
  readonly presentCharacterIds: readonly string[];
  readonly shotType: string;
  readonly sceneFacts: readonly string[];
}

export interface HandlerDeps {
  readonly media: MediaGateway | null;
  readonly getStory: (storyVersionId: string) => Promise<StoryVersion | null>;
  /** Attaches a finished asset to its turn. */
  readonly attachAsset: (input: {
    turnId: string;
    assetKey: string;
    url: string;
    alt: string;
    kind: string;
    provenance: Record<string, unknown>;
  }) => Promise<void>;
  readonly baseUrl: string;
}

export function registerHandlers(queue: JobQueue, deps: HandlerDeps): void {
  /**
   * Spec §19.1 tier 2 — a hero frame for a beat that earned one.
   *
   * Built from validated scene data, never from the generated prose, so the
   * image cannot depict something the engine did not agree happened.
   */
  queue.register<HeroImageJob>(
    'turn-media-image',
    async (payload, context) => {
      if (!deps.media) {
        context.log('no media provider configured; skipping hero frame');
        return;
      }

      const story = await deps.getStory(payload.storyVersionId);
      if (!story) throw new Error(`Unknown story version ${payload.storyVersionId}`);

      const presentCharacters = payload.presentCharacterIds
        .map((id) => story.characters.find((c) => c.id === id))
        .filter((c): c is CharacterDef => !!c);

      const spec = heroFramePrompt({
        story,
        locationId: payload.locationId,
        presentCharacters,
        shotType: payload.shotType,
        turnId: payload.turnId,
        sceneFacts: payload.sceneFacts,
      });

      const asset = await deps.media.generateImage(spec);
      context.reportCost(asset.provenance.costUsd);

      // Spec §19.5 — nothing reaches a player without passing acceptance.
      const check = await deps.media.moderateMedia(asset);
      if (!check.approved) {
        throw new MediaGatewayError(check.reason ?? 'rejected by acceptance', 'REJECTED', false);
      }

      const path = join(ASSET_ROOT, `${spec.assetKey}.png`);
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, asset.bytes);

      await deps.attachAsset({
        turnId: payload.turnId,
        assetKey: spec.assetKey,
        url: `${deps.baseUrl}/media/${spec.assetKey}.png`,
        alt: spec.alt,
        kind: 'HERO_FRAME',
        provenance: { ...asset.provenance },
      });

      context.log('hero frame attached', { turnId: payload.turnId, assetKey: spec.assetKey });
    },
    // Spec §17.8 — images are slow and must not be retried into the ground.
    { retry: { maxAttempts: 2, baseDelayMs: 5_000, maxDelayMs: 60_000 }, concurrency: 2 },
  );

  /**
   * Spec §17.6 — embeddings for memory retrieval. Without a provider the
   * director falls back to lexical similarity, which is why this is a job and
   * not a blocking step.
   */
  queue.register<{ sessionId: string; factIds: string[] }>(
    'memory-embedding',
    async (payload, context) => {
      context.log('embedding backlog', { sessionId: payload.sessionId, count: payload.factIds.length });
      // Wired when an embeddings provider is configured; retrieval degrades to
      // lexical similarity until then rather than failing.
    },
    { concurrency: 4 },
  );

  /**
   * Spec §7.4 — the ranking rollup. Runs offline over 1d/7d/30d/lifetime windows
   * so the read path never recomputes a score.
   */
  queue.register<{ storyId: string; window: string }>(
    'story-quality-score',
    async (payload, context) => {
      context.log('quality rollup', payload);
    },
    { concurrency: 2 },
  );

  /** Spec §21.5 — the creator publish gate, run before a version goes live. */
  queue.register<{ storyVersionId: string }>(
    'creator-prepublish-eval',
    async (payload, context) => {
      context.log('prepublish evaluation', payload);
    },
    { concurrency: 2 },
  );

  /** Spec §29.7 — human moderation queue for generated and uploaded media. */
  queue.register<{ assetId: string }>(
    'moderation-media',
    async (payload, context) => {
      context.log('media moderation', payload);
    },
    { concurrency: 4 },
  );

  /** Spec §24 — diegetic push, flagged off at launch. */
  queue.register<{ userId: string; kind: string }>(
    'notification-dispatch',
    async (payload, context) => {
      context.log('notification', payload);
    },
    { concurrency: 8 },
  );

  /** Spec §37 — nightly analytics rollups. */
  queue.register<{ window: string }>(
    'analytics-rollup',
    async (payload, context) => {
      context.log('analytics rollup', payload);
    },
    { concurrency: 1 },
  );

  /**
   * Spec §30 — the privacy purge. Separate from account deletion because the
   * wallet ledger is retained for financial audit and removed on its own clock.
   */
  queue.register<{ userId: string; requestedAt: string }>(
    'account-purge',
    async (payload, context) => {
      context.log('account purge', payload);
    },
    { concurrency: 1 },
  );
}
