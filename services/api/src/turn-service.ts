import type { GameState, QualityTier, StoryVersion, TurnRecord } from '@aniplay/contracts';
import { QUALITY_TIERS } from '@aniplay/contracts';
import { dayPart, deriveTurnSeed, outcomeLabel, formatCheckMath, dcBandLabel } from '@aniplay/engine';
import { runTurn } from '@aniplay/director';
import type { AppContext } from './context.js';
import { toSceneState } from './projections.js';
import type { SessionRecord, UserRecord } from './repo/types.js';
import { InsufficientCreditsError, type Reservation } from './wallet.js';
import type { TurnStreamHub } from './stream.js';

/**
 * Spec §17.1 — the turn entrypoint: steps 1–3 and 12–17 around the pipeline.
 *
 * The ordering here is the whole contract with the player's wallet:
 *
 *   reserve → resolve+write → commit → finalize
 *
 * If anything fails before the commit, the reserve is released and the player
 * pays nothing (§17.2, §20.8). Once the transaction commits the turn is
 * authoritative, and no later media failure may undo it.
 */

export class StaleRevisionError extends Error {
  constructor(
    readonly currentRevision: number,
    readonly latestTurnId: string | null,
  ) {
    super('Session revision is stale');
    this.name = 'StaleRevisionError';
  }
}

export class TurnFailedError extends Error {
  constructor(
    override readonly message: string,
    readonly code: string,
  ) {
    super(message);
    this.name = 'TurnFailedError';
  }
}

export interface SubmitTurnArgs {
  readonly ctx: AppContext;
  readonly hub: TurnStreamHub;
  readonly user: UserRecord;
  readonly session: SessionRecord;
  readonly story: StoryVersion;
  readonly actionText: string;
  readonly qualityTier: QualityTier;
  readonly clientRevision: number;
}

export interface AcceptedTurn {
  readonly turnId: string;
  readonly reservedCredits: number;
  readonly balanceAfterReserve: number;
  readonly acceptedRevision: number;
  readonly streamUrl: string;
  readonly streamToken: string;
  /** Resolves when background processing finishes. Awaited by tests. */
  readonly completion: Promise<void>;
}

/**
 * The action was refused before anything happened. Nothing was reserved, no
 * state moved, and the message is the one the player sees.
 */
export class ContentBlockedError extends Error {
  constructor(
    override readonly message: string,
    readonly categories: readonly string[],
  ) {
    super(message);
    this.name = 'ContentBlockedError';
  }
}

export async function submitTurn(args: SubmitTurnArgs): Promise<AcceptedTurn> {
  const { ctx, hub, user, session, story, actionText, qualityTier, clientRevision } = args;

  const state = await ctx.repo.getState(session.sessionId);
  if (!state) throw new TurnFailedError('Session state missing', 'SESSION_NOT_FOUND');

  // Spec §17.4 — a stale revision means the client is acting on a world that has
  // already moved. Reject before spending anything.
  if (clientRevision !== state.revision) {
    const turns = await ctx.repo.listTurns(session.sessionId);
    throw new StaleRevisionError(state.revision, turns.at(-1)?.turnId ?? null);
  }

  // Spec §29.1 layer 3 / §29.2. Before the reserve, so a refusal costs the
  // player nothing, and before the parser, so nothing is generated from it.
  const verdict = await ctx.moderator.check(actionText);
  if (verdict.flagged) {
    throw new ContentBlockedError(
      verdict.playerFacingMessage ?? 'That takes the story somewhere it cannot go. Try something else.',
      verdict.categories,
    );
  }

  const turnId = `turn_${crypto.randomUUID()}`;
  const cost = QUALITY_TIERS[qualityTier].costCredits;

  // Spec §17.1 step 3 — reserve before any generation work begins.
  const reservation = await ctx.wallet.reserve(user.userId, cost, turnId);

  const { token } = hub.open(turnId, user.userId);
  hub.emit(turnId, 'turn.accepted', { turnId, qualityTier, reservedCredits: cost }, state.revision);

  const completion = processTurn({ ...args, turnId, reservation, state }).catch(() => {
    // Errors are already surfaced as `turn.failed`; this keeps a background
    // rejection from becoming an unhandled promise.
  });

  return {
    turnId,
    reservedCredits: cost,
    balanceAfterReserve: reservation.balanceAfter,
    acceptedRevision: state.revision,
    streamUrl: `${ctx.config.baseUrl}/v1/turns/${turnId}/stream`,
    streamToken: token,
    completion,
  };
}

async function processTurn(
  args: SubmitTurnArgs & {
    turnId: string;
    reservation: Reservation;
    state: NonNullable<Awaited<ReturnType<AppContext['repo']['getState']>>>;
  },
): Promise<void> {
  const { ctx, hub, user, session, story, actionText, qualityTier, turnId, reservation, state } = args;

  try {
    const memories = await ctx.repo.listMemories(session.sessionId);
    const recentTurns = await ctx.repo.listTurns(session.sessionId);

    hub.emit(turnId, 'check.started', { label: 'Resolving' });

    // Spec §11.7 — remember where this turn started, so a fork can come back
    // to it. Saved before anything resolves, because that is the state a
    // branch from this moment means.
    await ctx.repo.putStateSnapshot(session.sessionId, state.turnIndex, state);

    const seed = deriveTurnSeed(session.sessionSeed, state.turnIndex, session.branchKey);
    const result = await runTurn({
      // Spec §17.8 — the engine knows the answer about nine seconds before the
      // prose describing it exists. Measured: first readable text at a median
      // of 11.3s, with nothing between 1.8s and then. This closes that gap
      // with the one thing that is both true and final that early: what
      // actually happened. Nothing here is ever reversed by the writer — the
      // writer describes this, it does not overturn it.
      onResolved: (resolution) => {
        for (const check of resolution.checks) {
          hub.emit(turnId, 'check.resolved', {
            checkId: check.checkId,
            label: check.label,
            outcome: check.outcome,
            outcomeLabel: outcomeLabel(check.outcome),
            difficultyLabel: dcBandLabel(check.dc),
            dc: story.rules.revealExactDc ? check.dc : null,
            math: story.rules.revealCheckMath ? formatCheckMath(check) : null,
          });
        }
        hub.emit(turnId, 'resolution.ready', {
          facts: resolution.observableFacts.slice(0, 4),
          minutes: resolution.timeAdvancedMinutes,
        });
      },
      story,
      state,
      memories,
      recentTurns,
      actionText,
      qualityTier,
      turnId,
      seed,
      deps: ctx.pipeline,
    });

    // Spec §10.6 — the check reveal is emitted before the prose, because the
    // engine genuinely rolled first. The exact maths only ships when the story
    // and the player's settings both allow it.
    for (const check of result.resolution.checks) {
      hub.emit(turnId, 'check.resolved', {
        checkId: check.checkId,
        label: check.label,
        difficultyLabel: dcBandLabel(check.dc),
        outcome: check.outcome,
        outcomeLabel: outcomeLabel(check.outcome),
        math:
          story.rules.revealCheckMath && user.settings.showCheckMath ? formatCheckMath(check) : null,
      });
    }

    // Spec §17.1 step 12 — the transaction. Optimistic concurrency guards it, so
    // a turn that raced another one fails here rather than overwriting it.
    const saved = await ctx.repo.saveState(session.sessionId, state.revision, result.state);
    if (!saved) {
      throw new TurnFailedError('Session changed while the turn was resolving', 'REVISION_CONFLICT');
    }

    const record: TurnRecord = {
      turnId,
      sessionId: session.sessionId,
      // The index this turn produced, not the one it started from. The opening
      // record is 0, so using the pre-turn index gave the first player turn 0
      // as well and two different beats shared an index.
      turnIndex: result.state.turnIndex,
      actionText,
      qualityTier,
      creditsCharged: reservation.amount,
      sceneSummary: result.narrative.sceneSummary,
      blocks: result.narrative.blocks,
      checks: result.resolution.checks,
      stateDeltas: result.narrative.stateDeltaPresentation,
      mutations: result.resolution.mutations,
      suggestions: result.plan.suggestedActions,
      endStatePrompt: result.narrative.endStatePrompt,
      mediaPlan: result.plan.mediaPlan,
      heroImageUrl: null,
      revisionAfter: result.state.revision,
      createdAt: new Date().toISOString(),
      repairViolations: result.repaired ? result.report.violations : [],
      // Kept so `Rephrase narration` reruns the prose against the same
      // resolution and the same staging, rather than rolling the turn again.
      resolution: result.resolution,
      beatPlan: result.plan,
    };

    await ctx.repo.appendTurn(record);
    await ctx.repo.appendEvents(result.events);
    await ctx.repo.appendMemories(session.sessionId, result.newMemories);
    await ctx.repo.updateSession(session.sessionId, { lastPlayedAt: record.createdAt });

    // Spec §17.1 step 13 — only now does the reserve become a real charge.
    await ctx.wallet.finalize(reservation);

    // Text streams after commit so a client can never render a turn that did not
    // land. Chunking by block keeps the SSE contract simple and replayable.
    for (const [index, block] of result.narrative.blocks.entries()) {
      hub.emit(turnId, 'text.delta', {
        blockIndex: index,
        type: block.type,
        speakerId: block.speakerId ?? null,
        text: block.text,
        visibility: block.visibility,
        voiceEligible: block.voiceEligible ?? false,
      });
    }

    for (const delta of result.narrative.stateDeltaPresentation) {
      hub.emit(turnId, 'state.delta', { ...delta });
    }

    // Spec §17.1 step 15 — media is enqueued, never awaited. Images must not
    // block the player from reading the turn or composing the next one (§17.8).
    if (result.plan.mediaPlan.heroImage.eligible) {
      const job = ctx.jobs.enqueue(
        'turn-media-image',
        {
          turnId,
          sessionId: session.sessionId,
          storyVersionId: session.storyVersionId,
          locationId: result.state.player.locationId,
          presentCharacterIds: result.plan.mediaPlan.activeCharacterIds,
          shotType: result.plan.mediaPlan.heroImage.shotType,
          sceneFacts: result.resolution.observableFacts,
          // What the player looks like and how they are doing, so the frame is
          // of this run rather than of the world in general.
          player: {
            appearance: result.state.player.identity.advanced.appearance ?? undefined,
            condition: playerCondition(result.state),
            carrying: result.state.player.inventory
              .filter((e) => e.equipped)
              .map((e) => story.items.find((i) => i.id === e.itemId)?.name)
              .filter((n): n is string => !!n)
              .slice(0, 3),
          },
          timeOfDay: dayPart(result.state.worldMinute),
        },
        // Keyed on the turn, so a retried commit never generates twice.
        `hero:${turnId}`,
      );

      hub.emit(turnId, 'media.queued', {
        kind: 'HERO_IMAGE',
        jobId: job.jobId,
        shotType: result.plan.mediaPlan.heroImage.shotType,
        reason: result.plan.mediaPlan.heroImage.reason,
      });

      // The turn is already committed and streamed; this only decorates it.
      void (async () => {
        await ctx.jobs.drain(120_000);
        const finished = await ctx.repo.getTurn(turnId);
        if (finished?.heroImageUrl) {
          hub.emit(turnId, 'media.completed', {
            kind: 'HERO_IMAGE',
            url: finished.heroImageUrl,
          });
        }
      })();
    }

    const balance = await ctx.wallet.getBalance(user.userId);
    hub.emit(
      turnId,
      'turn.completed',
      {
        turnId,
        sceneSummary: result.narrative.sceneSummary,
        endStatePrompt: result.narrative.endStatePrompt,
        suggestions: result.plan.suggestedActions,
        creditsCharged: reservation.amount,
        balance,
        // The updated stage ships with the completion event so the client can
        // repaint without a round-trip.
        scene: toSceneState(story, result.state),
      },
      result.state.revision,
    );
  } catch (error) {
    // Spec §17.2 / §20.8 — nothing committed, so nothing is charged. The player
    // is never billed for a provider timeout or an internal fault.
    await ctx.wallet.release(reservation, 'TURN_FAILED');

    const code = error instanceof TurnFailedError ? error.code : 'GENERATION_FAILED';
    hub.emit(turnId, 'turn.failed', {
      code,
      // Spec §10.8 — plain copy, no policy jargon, and an explicit reassurance
      // that the credits came back.
      message: "That turn didn't complete. You weren't charged.",
      refunded: reservation.amount,
    });
  }
}

export { InsufficientCreditsError };


/**
 * How hurt the player is, as a word.
 *
 * An image prompt should never carry a number: "12 health" means nothing to a
 * model, and the point is what the picture shows.
 */
function playerCondition(state: GameState): string {
  const health = state.player.resources.find((r) => r.id === 'health' || r.id === 'hp');
  if (!health || health.max === 0) return 'unhurt';
  const ratio = health.current / health.max;
  if (ratio > 0.75) return 'unhurt';
  if (ratio > 0.4) return 'hurt';
  return 'badly hurt';
}
