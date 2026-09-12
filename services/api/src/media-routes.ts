import { createReadStream } from 'node:fs';
import { access, readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { FastifyInstance } from 'fastify';
import type { GameState, StoryVersion } from '@plotbreak/contracts';
import {
  createMediaGatewayFromEnv,
  playerPortraitPrompt,
  MediaGatewayError,
  type MediaGateway,
} from '@plotbreak/director';
import { relationshipLabel } from '@plotbreak/engine';
import type { AppContext } from './context.js';
import { requireUser, sendError } from './context.js';
import { InsufficientCreditsError } from './wallet.js';

/**
 * Media serving and player-portrait generation (spec §9.3, §19, §32.6).
 *
 * In production these assets sit behind a CDN and generation runs on the worker
 * queue. Serving them from the API keeps local development to one process while
 * exercising the identical URLs and the identical credit path.
 */

/**
 * The seeded asset directory, anchored to this file rather than to
 * `process.cwd()`.
 *
 * npm workspace scripts run with the cwd set to the workspace, so
 * `npm run api` resolved this to `services/api/infra/seed/assets` — a
 * directory that does not exist — and every generated image 404'd, while
 * running the same entrypoint from the repo root worked. Where the repo lives
 * relative to this module is a fixed fact; where the process was launched from
 * is not.
 */
const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
/** World art as authored and shipped: the seed directory the image is built with. */
const SEED_ROOT = resolve(REPO_ROOT, 'infra/seed/assets');
/** Where generated art is written. In production a mounted volume, so it survives a redeploy. */
const ASSET_ROOT = process.env.ASSET_ROOT ?? SEED_ROOT;
/**
 * Roots searched when serving, in order. Generated art lives in `ASSET_ROOT`;
 * world art ships inside the image under `SEED_ROOT`. When the two differ —
 * production points `ASSET_ROOT` at an empty volume — nothing copies the seed
 * art across, so a single-root lookup 404'd every cover. Falling through to
 * the seed directory serves both from wherever each actually is.
 */
const READ_ROOTS: readonly string[] = ASSET_ROOT === SEED_ROOT ? [ASSET_ROOT] : [ASSET_ROOT, SEED_ROOT];

/** Spec §20.11 sets animation at 600; a still portrait is priced well below it. */
export const PORTRAIT_COST_CREDITS = 150;

const CONTENT_TYPES: Record<string, string> = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};

export function registerMediaRoutes(app: FastifyInstance, ctx: AppContext): void {
  const gateway: MediaGateway | null = createMediaGatewayFromEnv();

  /**
   * Serves a generated asset. Prefers the optimized WebP derivative and falls
   * back to the PNG master, so a freshly generated asset is servable before the
   * optimization pass has run.
   */
  app.get<{ Params: { '*': string } }>('/media/*', async (request, reply) => {
    const requested = request.params['*'] ?? '';

    const relative = normalize(requested).replace(/^(\.\.[/\\])+/, '');

    for (const root of READ_ROOTS) {
      // Path traversal guard: the resolved path must stay inside the root.
      // Compared with the separator attached, because a bare prefix test also
      // accepts a sibling directory whose name merely starts with the root's.
      const candidate = resolve(root, relative);
      if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) {
        return sendError(reply, 400, 'INVALID_PATH', 'Bad asset path.');
      }

      const base = candidate.replace(/\.(webp|png)$/, '');
      for (const extension of ['.webp', '.png'] as const) {
        const path = `${base}${extension}`;
        try {
          const info = await stat(path);
          if (!info.isFile()) continue;
          void reply
            .header('content-type', CONTENT_TYPES[extension]!)
            .header('content-length', String(info.size))
            // Spec §36.2 — generated assets are immutable once written.
            .header('cache-control', 'public, max-age=31536000, immutable');
          return reply.send(createReadStream(path));
        } catch {
          // Try the next extension, then the next root.
        }
      }
    }

    return sendError(reply, 404, 'NOT_FOUND', 'No such asset.');
  });

  /**
   * Spec §9.3 — the player's portrait.
   *
   * Offered only after the first session has begun, never before first value.
   * Costs credits through the same two-phase reserve as a turn, so a provider
   * failure refunds automatically. An accepted portrait is stored as a stable
   * reference asset; regenerating produces a new variant rather than mutating
   * the old one, and never touches mechanical traits.
   */
  app.post<{ Params: { sessionId: string } }>(
    '/v1/sessions/:sessionId/portrait',
    async (request, reply) => {
      const user = await requireUser(ctx, request, reply);
      if (!user) return reply;

      const session = await ctx.repo.getSession(request.params.sessionId);
      if (!session || session.userId !== user.userId) {
        return sendError(reply, 404, 'NOT_FOUND', 'That session does not exist.');
      }

      const story = await ctx.repo.getStoryVersion(session.storyVersionId);
      const state = await ctx.repo.getState(session.sessionId);
      if (!story || !state) {
        return sendError(reply, 500, 'SESSION_CORRUPT', 'That session could not be loaded.');
      }

      if (!gateway) {
        return sendError(
          reply,
          503,
          'MEDIA_UNAVAILABLE',
          'Portrait generation is not available right now. You have not been charged.',
        );
      }

      // A canon protagonist is not drawn. Refused here as well as hidden in the
      // client, so an older build cannot spend a player's credits producing an
      // approximation of a character they can already picture exactly.
      if (story.protagonist?.kind === 'NAMED') {
        return sendError(
          reply,
          409,
          'PORTRAIT_NOT_AVAILABLE',
          'This world already knows what its lead looks like. You have not been charged.',
        );
      }

      // Spec §9.3 — after the first turn, not before.
      if (state.turnIndex < 1) {
        return sendError(
          reply,
          409,
          'TOO_EARLY',
          'Play a turn first — your portrait is drawn from what actually happened.',
        );
      }

      const reference = `portrait_${session.sessionId}_${crypto.randomUUID()}`;
      let reservation;
      try {
        reservation = await ctx.wallet.reserve(user.userId, PORTRAIT_COST_CREDITS, reference, 'MEDIA_RESERVE');
      } catch (error) {
        if (error instanceof InsufficientCreditsError) {
          return sendError(reply, 402, 'INSUFFICIENT_CREDITS', 'You need more credits for a portrait.', {
            required: error.required,
            balance: error.balance,
            shortfall: error.shortfall,
          });
        }
        throw error;
      }

      try {
        const body = (request.body ?? {}) as { appearanceNote?: string; variant?: number };
        const variant = Math.max(1, Math.trunc(body.variant ?? nextVariant(state.player.identity.portraitAssetId)));

        const spec = playerPortraitPrompt({
          story,
          displayName: state.player.identity.displayName,
          pronouns: state.player.identity.pronouns,
          // The player may refine the description at regeneration time; setup's
          // answer is the default.
          appearanceNote: (body.appearanceNote ?? state.player.identity.advanced.appearance ?? '').slice(0, 240),
          archetypeName: archetypeNameFor(story, state.player.identity.archetypeId, state.player.identity.advanced),
          canonDetails: canonDetailsFor(story, state),
          locationId: state.player.locationId,
          variant,
        });

        const asset = await gateway.generateImage(spec);

        // Spec §19.5 — nothing reaches a player without passing acceptance.
        const check = await gateway.moderateMedia(asset);
        if (!check.approved) throw new MediaGatewayError(check.reason ?? 'rejected', 'REJECTED', false);

        const path = join(ASSET_ROOT, `${spec.assetKey}.png`);
        await mkdir(dirname(path), { recursive: true });
        await writeFile(path, asset.bytes);

        // Spec §9.3 — the accepted portrait becomes the stable reference, and
        // mechanical traits are untouched by it.
        //
        // Generation takes tens of seconds, so a turn can easily commit while
        // it runs and move the revision on. The optimistic write would then
        // fail and the player would be charged for a portrait that never
        // attached, so this re-reads and re-applies the one field it owns.
        // Retrying is safe precisely because the portrait key conflicts with
        // nothing else in the state.
        let attached = false;
        for (let attempt = 0; attempt < 5 && !attached; attempt += 1) {
          const current = attempt === 0 ? state : await ctx.repo.getState(session.sessionId);
          if (!current) break;
          const nextState = structuredClone(current);
          nextState.player.identity.portraitAssetId = spec.assetKey;
          attached = await ctx.repo.saveState(session.sessionId, current.revision, nextState);
        }
        if (!attached) {
          // The image exists and is returned either way; what did not stick is
          // the reference, so charging for it would be charging for nothing.
          throw new MediaGatewayError('could not attach portrait to session', 'PROVIDER_ERROR', true);
        }

        await ctx.wallet.finalize(reservation, 'MEDIA_FINALIZE');

        void reply.code(201);
        return {
          assetKey: spec.assetKey,
          url: `${ctx.config.baseUrl}/media/${spec.assetKey}.png`,
          alt: spec.alt,
          variant,
          creditsCharged: PORTRAIT_COST_CREDITS,
          balance: await ctx.wallet.getBalance(user.userId),
        };
      } catch (error) {
        // Spec §10.8 — a media failure the player did not cause is refunded.
        await ctx.wallet.release(reservation, 'PORTRAIT_FAILED', 'MEDIA_RELEASE');
        const retryable = !(error instanceof MediaGatewayError) || error.retryable;
        return sendError(
          reply,
          502,
          'PORTRAIT_FAILED',
          retryable
            ? "That portrait didn't come through. You weren't charged."
            : "We couldn't draw that one. You weren't charged — try describing yourself differently.",
        );
      }
    },
  );

  /**
   * "Your characters" — every player character across every world, with the
   * canon each one accumulated. A run is a person, not a save slot.
   */
  app.get('/v1/me/characters', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;

    const characters = [];
    for (const session of await ctx.repo.listSessions(user.userId)) {
      const story = await ctx.repo.getStoryVersion(session.storyVersionId);
      const state = await ctx.repo.getState(session.sessionId);
      if (!story || !state) continue;

      const turns = await ctx.repo.listTurns(session.sessionId);
      const memories = await ctx.repo.listMemories(session.sessionId);

      characters.push({
        sessionId: session.sessionId,
        storyId: session.storyId,
        storyTitle: story.title,
        displayName: state.player.identity.displayName,
        pronouns: state.player.identity.pronouns,
        archetypeName: archetypeNameFor(story, state.player.identity.archetypeId, state.player.identity.advanced),
        portraitUrl: state.player.identity.portraitAssetId
          ? `${ctx.config.baseUrl}/media/${state.player.identity.portraitAssetId}.png`
          : null,
        appearanceNote: state.player.identity.advanced.appearance ?? '',
        worldKnowsAboutYou: state.player.identity.worldKnowsAboutYou,
        turnCount: turns.length,
        level: state.player.level,
        milestones: state.player.milestones.length,
        locationName: story.locations.find((l) => l.id === state.player.locationId)?.name ?? '',
        // The three things that actually happened to this character.
        canon: canonDetailsFor(story, state).slice(0, 3),
        notableMemories: memories
          .filter((f) => f.supersededByFactId === null && f.importance >= 0.6)
          .slice(-3)
          .map((f) => f.text),
        status: session.status,
        lastPlayedAt: session.lastPlayedAt,
        portraitCost: PORTRAIT_COST_CREDITS,
        // A world whose protagonist is canon does not get a drawn portrait.
        // Everybody already knows what Itachi looks like, and a generated
        // approximation of a character the player can picture exactly is worse
        // than no picture: it is the one image in the app they can compare
        // against the real thing, and it will lose.
        protagonistIsCanon: story.protagonist?.kind === 'NAMED',
      });
    }

    return { characters };
  });
}

function nextVariant(current: string | null): number {
  const match = current?.match(/_v(\d+)$/);
  return match ? Number(match[1]) + 1 : 1;
}

function archetypeNameFor(
  story: StoryVersion,
  archetypeId: string | null,
  advanced: Record<string, string>,
): string | null {
  if (archetypeId) return story.archetypes.find((a) => a.id === archetypeId)?.name ?? null;
  // A player who wrote their own background gets that treated as their identity.
  const custom = advanced.customArchetype;
  return custom && custom.length > 0 ? custom.split(/[.,]/)[0]!.trim() : null;
}

/**
 * Engine-recorded facts about this character. Drawn from authoritative state, so
 * a portrait shows the run that was actually played rather than an invented one.
 */
function canonDetailsFor(story: StoryVersion, state: GameState): string[] {
  const details: string[] = [];

  for (const entry of state.player.inventory) {
    if (!entry.equipped) continue;
    const item = story.items.find((i) => i.id === entry.itemId);
    if (item) details.push(`carrying ${item.name}`);
  }

  for (const status of state.player.statuses) {
    details.push(status.kind === 'DEBUFF' ? `visibly ${status.label.toLowerCase()}` : status.label.toLowerCase());
  }

  for (const faction of state.factions) {
    if (faction.rankLabel && Math.abs(faction.reputation) >= 30) {
      const name = story.factions.find((f) => f.id === faction.factionId)?.name;
      if (name) details.push(`${faction.rankLabel} of ${name}`);
    }
  }

  const closest = [...state.relationships]
    .filter((r) => r.lastChangedTurn >= 0)
    .sort((a, b) => b.trust - a.trust)[0];
  if (closest) {
    const name = story.characters.find((c) => c.id === closest.characterId)?.name;
    if (name) details.push(`${relationshipLabel(closest)} with ${name}`);
  }

  return details.slice(0, 5);
}
