import Fastify, { type FastifyInstance } from 'fastify';
import {
  CanonCorrectionRequest,
  CreateReportRequest,
  CreateSessionRequest,
  DEFAULT_QUALITY_TIER,
  FIRST_PURCHASE_OFFER,
  FORK_COST_CREDITS,
  PurchaseRestoreRequest,
  PurchaseSyncRequest,
  QUALITY_TIERS,
  STORE_OFFERS,
  SubmitTurnRequest,
  type ContentDescriptor,
  type DiscoverRail,
  type StorySummary,
} from '@aniplay/contracts';
import { createInitialState, forkState, sha256Hex } from '@aniplay/engine';
import {
  applyCorrection,
  buildRecap,
  checkCorrectionConflict,
  rephraseNarration,
} from '@aniplay/director';
import {
  CONTRACT_HEADER,
  CONTRACT_VERSION,
  createAppContext,
  newUserRecord,
  optionalUser,
  readAuth,
  requireUser,
  resolveUser,
  sendError,
  type AppContext,
} from './context.js';
import { NoVerifierError } from './store-verifier.js';
import { TurnStreamHub, formatSse } from './stream.js';
import {
  ContentBlockedError,
  StaleRevisionError,
  submitTurn,
  InsufficientCreditsError,
} from './turn-service.js';
import {
  toContinueCard,
  toPlayerTurn,
  toSceneState,
  toSessionSummary,
  toStoryDetail,
  toStorySummary,
  toTimeline,
  toWorldSheet,
} from './projections.js';
import { registerMediaRoutes } from './media-routes.js';
import type { SessionRecord, StorySignals } from './repo/types.js';

/**
 * Spec §33 — the `/v1` surface.
 *
 * The API is stateless apart from short-lived stream metadata; everything
 * durable lives in the repository (§32.1).
 */

/**
 * The taste vocabulary, derived from what the catalog actually contains.
 *
 * It used to be a hand-written list including Isekai, Sci-fi and Cozy, none of
 * which any world is tagged with — so a player could pick three things and be
 * shown nothing related to any of them. An option with nothing behind it is
 * worse than a shorter list.
 */
async function genresFrom(repo: AppContext['repo']): Promise<Array<{ id: string; label: string }>> {
  const counts = new Map<string, number>();
  for (const story of await repo.listStories()) {
    for (const tag of story.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([label]) => ({ id: label.toLowerCase().replace(/[^a-z0-9]+/g, '_'), label }));
}

const CONTENT_DESCRIPTORS: ContentDescriptor[] = [
  'FANTASY_VIOLENCE',
  'ROMANCE',
  'SUGGESTIVE_THEMES',
  'HORROR',
  'PSYCHOLOGICAL_THEMES',
  'ALCOHOL_REFERENCES',
  'LANGUAGE',
  'PERMANENT_DEATH',
  'MORAL_AMBIGUITY',
];

export interface BuildServerOptions {
  readonly ctx?: AppContext;
  readonly logger?: boolean;
}

export function buildServer(options: BuildServerOptions = {}): FastifyInstance & { ctx: AppContext; hub: TurnStreamHub } {
  const ctx = options.ctx ?? createAppContext();
  const hub = new TurnStreamHub();
  const app = Fastify({ logger: options.logger ?? false });

  app.addHook('onSend', async (_request, reply, payload) => {
    void reply.header(CONTRACT_HEADER, CONTRACT_VERSION);
    return payload;
  });

  registerMediaRoutes(app, ctx);

  // --- Health ---

  app.get('/health', async () => ({
    ok: true,
    environment: ctx.config.environment,
    modelProvider: ctx.modelProvider ?? 'rule-based',
    contractVersion: CONTRACT_VERSION,
  }));

  // --- Bootstrap (§33.1) ---

  app.get('/v1/bootstrap', async (request) => {
    const user = await optionalUser(ctx, request);
    const wallet = user ? await ctx.wallet.getSummary(user.userId) : null;

    return {
      featureFlags: {
        coopBeta: false,
        animationBeta: false,
        voicePlayback: true,
        heroImages: true,
        offScreenEvents: false,
        creatorPublishing: true,
        pushNotifications: false,
      },
      qualityTiers: Object.values(QUALITY_TIERS).map((tier) => ({
        id: tier.id,
        label: tier.label,
        costCredits: tier.costCredits,
        promise: tier.promise,
        heroImageEligible: tier.heroImageEligible,
      })),
      defaultQualityTier: DEFAULT_QUALITY_TIER,
      contentDescriptors: CONTENT_DESCRIPTORS,
      genres: await genresFrom(ctx.repo),
      minSupportedAppVersion: '1.0.0',
      maintenance: { active: false, message: null },
      profile: user
        ? {
            userId: user.userId,
            displayName: user.displayName,
            handle: user.handle,
            isGuest: user.isGuest,
            avatarUrl: user.avatarUrl,
            ageVerified: user.ageVerified,
          }
        : null,
      wallet,
    };
  });

  // --- Discover (§33.2) ---

  app.get<{ Querystring: { tastes?: string } }>('/v1/discover', async (request) => {
    const user = await optionalUser(ctx, request);
    const tastes = (request.query.tastes ?? '')
      .split(',')
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);
    const stories = await ctx.repo.listStories();
    const saved = user ? await ctx.repo.getSaves(user.userId) : [];
    const hidden = user ? await ctx.repo.getHidden(user.userId) : [];

    const entries: RankedEntry[] = [];
    for (const story of stories) {
      if (hidden.includes(story.storyId)) continue;
      const signals = await ctx.repo.getSignals(story.storyId);
      entries.push({ summary: toStorySummary(story, signals, saved.includes(story.storyId)), signals });
    }

    const ranked = rankStories(entries);

    const rails: DiscoverRail[] = [];
    if (ranked[0]) {
      rails.push({ id: 'hero', title: 'Featured', kind: 'HERO', subtitle: null, stories: [ranked[0]] });
    }
    if (ranked.length > 0) {
      // "Based on what you picked" was the same array as Trending, in the same
      // order, and the tastes the onboarding collected were never sent
      // anywhere. Either the rail means something or it should not say that.
      const matched = (summary: (typeof ranked)[number]): string[] =>
        stories
          .find((s) => s.storyId === summary.storyId)
          ?.tags.filter((tag) => tastes.includes(tag.toLowerCase())) ?? [];

      const forYou =
        tastes.length > 0
          ? [...ranked]
              .filter((s) => matched(s).length > 0)
              .sort((a, b) => matched(b).length - matched(a).length)
          : [];

      // Named as the catalog spells them, not as the query did.
      const because = [...new Set(forYou.flatMap(matched))].slice(0, 3);

      rails.push(
        forYou.length > 0
          ? {
              id: 'for_you',
              title: 'For you',
              kind: 'FOR_YOU',
              subtitle: `Because you picked ${because.join(', ')}`,
              stories: forYou,
            }
          : { id: 'for_you', title: 'Everything', kind: 'FOR_YOU', subtitle: null, stories: ranked },
      );
      rails.push({ id: 'trending', title: 'Trending now', kind: 'TRENDING', subtitle: null, stories: ranked });
      rails.push({
        id: 'new',
        title: 'New worlds',
        kind: 'NEW',
        subtitle: null,
        // Spec §7.4 — 15–20% of inventory is reserved for exploration, so new
        // worlds are not permanently buried by incumbents.
        stories: [...ranked].reverse().slice(0, Math.max(1, Math.ceil(ranked.length * 0.2))),
      });
    }

    const continueCards = [];
    if (user) {
      for (const session of (await ctx.repo.listSessions(user.userId)).slice(0, 5)) {
        const story = await ctx.repo.getStoryVersion(session.storyVersionId);
        const state = await ctx.repo.getState(session.sessionId);
        if (!story || !state || session.status === 'ARCHIVED') continue;
        const turns = await ctx.repo.listTurns(session.sessionId);
        continueCards.push(toContinueCard(session, story, state, turns));
      }
      if (continueCards.length > 0) {
        rails.splice(1, 0, {
          id: 'continue',
          title: 'Continue',
          kind: 'CONTINUE',
          subtitle: null,
          stories: [],
        });
      }
    }

    return { rails, continueCards };
  });

  app.get<{ Querystring: { q?: string } }>('/v1/search', async (request) => {
    const user = await optionalUser(ctx, request);
    const saved = user ? await ctx.repo.getSaves(user.userId) : [];
    const query = (request.query.q ?? '').trim().toLowerCase();
    const stories = await ctx.repo.listStories();

    const results: RankedEntry[] = [];
    for (const story of stories) {
      // Deliberately not filtered by the hide list: hiding is about what gets
      // recommended, and a player typing a story's name is asking for that
      // story, not being offered it.
      // Spec §7.5 — title, creator, tags, premise, character names, mechanics.
      const haystack = [
        story.title,
        story.creatorName,
        story.premise,
        story.hook,
        ...story.tags,
        ...story.mechanicsChips,
        ...story.characters.map((c) => c.name),
      ]
        .join(' ')
        .toLowerCase();
      if (query.length > 0 && !haystack.includes(query)) continue;
      const signals = await ctx.repo.getSignals(story.storyId);
      results.push({ summary: toStorySummary(story, signals, saved.includes(story.storyId)), signals });
    }

    return { results: rankStories(results) };
  });

  app.get<{ Params: { storyId: string } }>('/v1/stories/:storyId', async (request, reply) => {
    const story = await ctx.repo.getStoryByStoryId(request.params.storyId);
    if (!story) return sendError(reply, 404, 'NOT_FOUND', 'That world does not exist.');

    const user = await optionalUser(ctx, request);
    const saved = user ? await ctx.repo.getSaves(user.userId) : [];
    const signals = await ctx.repo.getSignals(story.storyId);

    // "Hide this from my recommendations" has to mean everywhere a
    // recommendation appears, not only the Discover rails. A story the player
    // just reported and hid was still being offered two taps later.
    const hidden = user ? await ctx.repo.getHidden(user.userId) : [];

    const related: StorySummary[] = [];
    for (const other of await ctx.repo.listStories()) {
      if (other.storyId === story.storyId) continue;
      if (hidden.includes(other.storyId)) continue;
      const otherSignals = await ctx.repo.getSignals(other.storyId);
      related.push(toStorySummary(other, otherSignals, saved.includes(other.storyId)));
    }

    const activeSession = user
      ? (await ctx.repo.listSessions(user.userId)).find(
          (s) => s.storyId === story.storyId && s.status === 'ACTIVE',
        )
      : undefined;

    await ctx.repo.bumpSignal(story.storyId, 'impressions', 1);

    return toStoryDetail(
      story,
      signals,
      saved.includes(story.storyId),
      related.slice(0, 6),
      activeSession?.sessionId ?? null,
    );
  });

  app.post<{ Params: { storyId: string } }>('/v1/stories/:storyId/save', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    await ctx.repo.setSaved(user.userId, request.params.storyId, true);
    await ctx.repo.bumpSignal(request.params.storyId, 'saves', 1);
    return { saved: true };
  });

  app.delete<{ Params: { storyId: string } }>('/v1/stories/:storyId/save', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    await ctx.repo.setSaved(user.userId, request.params.storyId, false);
    await ctx.repo.bumpSignal(request.params.storyId, 'saves', -1);
    return { saved: false };
  });

  app.post<{ Params: { storyId: string } }>('/v1/stories/:storyId/like', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    await ctx.repo.bumpSignal(request.params.storyId, 'likes', 1);
    return { liked: true };
  });

  app.post<{ Params: { storyId: string } }>('/v1/stories/:storyId/hide', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    await ctx.repo.setHidden(user.userId, request.params.storyId, true);
    await ctx.repo.bumpSignal(request.params.storyId, 'hides', 1);
    return { hidden: true };
  });

  // --- Sessions (§33.3) ---

  app.post<{ Params: { storyId: string } }>('/v1/stories/:storyId/sessions', async (request, reply) => {
    const user = await resolveUser(ctx, request);
    if (!user) return sendError(reply, 401, 'UNAUTHENTICATED', 'Start a guest session first.');

    const story = await ctx.repo.getStoryByStoryId(request.params.storyId);
    if (!story) return sendError(reply, 404, 'NOT_FOUND', 'That world does not exist.');

    const parsed = CreateSessionRequest.safeParse(request.body);
    if (!parsed.success) {
      return sendError(reply, 400, 'INVALID_REQUEST', 'Character setup is incomplete.', {
        issues: parsed.error.issues,
      });
    }

    const sessionId = `sess_${crypto.randomUUID()}`;
    const state = createInitialState({ sessionId, story, identity: parsed.data.identity });

    const record: SessionRecord = {
      sessionId,
      userId: user.userId,
      storyId: story.storyId,
      // Spec §35.3 — the session pins the version it started on and stays there.
      storyVersionId: story.id,
      displayName: parsed.data.identity.displayName,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      lastPlayedAt: new Date().toISOString(),
      // Server-generated, never sent to the client. Turn seeds derive from it.
      sessionSeed: sha256Hex(`${sessionId}:${crypto.randomUUID()}`),
      forkedFromSessionId: null,
      forkedAtTurnIndex: null,
      branchKey: 'main',
    };

    await ctx.repo.createSession(record, state);
    // The world as it was before anything happened, so a fork from the opening
    // is a real fork rather than a copy of wherever the player has got to.
    await ctx.repo.putStateSnapshot(record.sessionId, state.turnIndex, state);
    await ctx.repo.bumpSignal(story.storyId, 'runs', 1);

    // The opening beat is authored, not generated, so it is free and instant
    // (spec §43.2 — the player reaches a decision inside one turn).
    const openingTurn = {
      turnId: `turn_${crypto.randomUUID()}`,
      sessionId,
      turnIndex: 0,
      actionText: null,
      qualityTier: DEFAULT_QUALITY_TIER,
      creditsCharged: 0,
      sceneSummary: `${story.locations.find((l) => l.id === state.player.locationId)?.name ?? ''}, morning.`,
      blocks: story.opening
        .split('\n\n')
        .filter((p) => p.trim().length > 0)
        .map((paragraph) => ({
          type: 'NARRATION' as const,
          speakerId: null,
          text: paragraph.trim(),
          visibility: 'GROUP' as const,
          voiceEligible: false,
        })),
      checks: [],
      stateDeltas: [],
      mutations: [],
      suggestions: story.openingSuggestions.map((text) => ({
        text,
        intentHint: 'opening',
        risk: 'SAFE' as const,
        resourceCostLabel: null,
      })),
      endStatePrompt: 'What do you do?',
      mediaPlan: null,
      heroImageUrl: null,
      revisionAfter: state.revision,
      createdAt: new Date().toISOString(),
      // The authored opening resolved nothing, so there is nothing to rephrase
      // it against; the turn menu is not offered on it.
      resolution: null,
      beatPlan: null,
      repairViolations: [],
    };
    await ctx.repo.appendTurn(openingTurn);

    void reply.code(201);
    return {
      session: toSessionSummary(record, story, state, 1),
      scene: toSceneState(story, state),
      recentTurns: [openingTurn],
      suggestions: openingTurn.suggestions,
      recap: null,
      revision: state.revision,
    };
  });

  app.get('/v1/sessions', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;

    const sessions = [];
    for (const record of await ctx.repo.listSessions(user.userId)) {
      const story = await ctx.repo.getStoryVersion(record.storyVersionId);
      const state = await ctx.repo.getState(record.sessionId);
      if (!story || !state) continue;
      const turns = await ctx.repo.listTurns(record.sessionId);
      sessions.push(toSessionSummary(record, story, state, turns.length));
    }
    return { sessions };
  });

  app.get<{ Params: { sessionId: string } }>('/v1/sessions/:sessionId', async (request, reply) => {
    const loaded = await loadSession(request.params.sessionId, request, reply);
    if (!loaded) return reply;
    const { session, story, state, user } = loaded;

    const turns = await ctx.repo.listTurns(session.sessionId);
    const last = turns.at(-1);

    // Spec §16.6 — a recap on return after more than eight hours away.
    const hoursAway = last
      ? (Date.now() - new Date(last.createdAt).getTime()) / 3_600_000
      : 0;
    const recap = hoursAway > 8 ? buildRecap(story, state, turns) : null;

    return {
      session: toSessionSummary(session, story, state, turns.length),
      scene: toSceneState(story, state),
      // Spec §10.2 C — recent beats only; history is paged separately.
      // Projected, so the exact DC and the raw mutations stay server-side.
      recentTurns: turns.slice(-8).map((turn) => toPlayerTurn(story, turn)),
      suggestions: last?.suggestions ?? [],
      recap,
      revision: state.revision,
    };
  });

  app.delete<{ Params: { sessionId: string } }>('/v1/sessions/:sessionId', async (request, reply) => {
    const loaded = await loadSession(request.params.sessionId, request, reply);
    if (!loaded) return reply;
    await ctx.repo.deleteSession(request.params.sessionId);
    return { deleted: true };
  });

  app.get<{ Params: { sessionId: string } }>('/v1/sessions/:sessionId/world-sheet', async (request, reply) => {
    const loaded = await loadSession(request.params.sessionId, request, reply);
    if (!loaded) return reply;
    const { session, story, state, user } = loaded;

    return toWorldSheet(
      story,
      state,
      await ctx.repo.listMemories(session.sessionId),
      await ctx.repo.listEvents(session.sessionId),
      user.settings.showAdvancedRelationshipStats,
    );
  });

  app.get<{ Params: { sessionId: string } }>('/v1/sessions/:sessionId/timeline', async (request, reply) => {
    const loaded = await loadSession(request.params.sessionId, request, reply);
    if (!loaded) return reply;
    const { session, story } = loaded;

    return {
      entries: toTimeline(
        story,
        await ctx.repo.listEvents(session.sessionId),
        await ctx.repo.listMemories(session.sessionId),
        await ctx.repo.listTurns(session.sessionId),
      ),
    };
  });

  /** Spec §11.8 — free, and refused when it contradicts authoritative state. */
  /**
   * WS-07 — pin a moment as canon you want kept.
   *
   * Not decoration: retrieval weights a pinned fact higher, so this is how a
   * player says "whatever else the story forgets, it does not forget this".
   * Free, because it changes nothing about the world — only what the world is
   * most likely to remember about it.
   */
  app.post<{ Params: { sessionId: string; factId: string }; Body: { pinned?: boolean } }>(
    '/v1/sessions/:sessionId/timeline/:factId/pin',
    async (request, reply) => {
      const loaded = await loadSession(request.params.sessionId, request, reply);
      if (!loaded) return reply;

      const pinned = request.body?.pinned ?? true;
      const fact = await ctx.repo.setMemoryPinned(loaded.session.sessionId, request.params.factId, pinned);
      if (!fact) return sendError(reply, 404, 'NOT_FOUND', 'That moment is not in this timeline.');
      return { factId: fact.factId, pinned: fact.pinned };
    },
  );

  app.post<{ Params: { sessionId: string } }>('/v1/sessions/:sessionId/canon-corrections', async (request, reply) => {
    const loaded = await loadSession(request.params.sessionId, request, reply);
    if (!loaded) return reply;
    const { session, story, state } = loaded;

    const parsed = CanonCorrectionRequest.safeParse(request.body);
    if (!parsed.success) return sendError(reply, 400, 'INVALID_REQUEST', 'Correction is malformed.');

    const conflict = checkCorrectionConflict(parsed.data.correctedText, state, story);
    if (conflict) {
      return { accepted: false, conflictExplanation: conflict, offerFork: true, fact: null };
    }

    const facts = await ctx.repo.listMemories(session.sessionId);
    const result = applyCorrection(
      facts,
      parsed.data.factId,
      parsed.data.correctedText,
      state,
      `corr_${crypto.randomUUID()}`,
    );
    if (!result) return sendError(reply, 404, 'NOT_FOUND', 'That memory is not in this timeline.');

    await ctx.repo.replaceMemories(session.sessionId, result.updated);
    return { accepted: true, conflictExplanation: null, offerFork: false, fact: result.fact };
  });

  /** Spec §11.7/§20.10 — forking never destroys the original branch. */
  app.post<{ Params: { sessionId: string }; Body: { atTurnIndex?: number; displayName?: string } }>(
    '/v1/sessions/:sessionId/forks',
    async (request, reply) => {
      const loaded = await loadSession(request.params.sessionId, request, reply);
      if (!loaded) return reply;
      const { session, story, state, user } = loaded;

      const cost = story.rules.forkCostCredits || FORK_COST_CREDITS;
      try {
        await ctx.wallet.chargeFork(user.userId, session.sessionId, cost);
      } catch (error) {
        if (error instanceof InsufficientCreditsError) {
          return sendError(reply, 402, 'INSUFFICIENT_CREDITS', 'You need more credits to fork.', {
            required: error.required,
            balance: error.balance,
            shortfall: error.shortfall,
          });
        }
        throw error;
      }

      const newSessionId = `sess_${crypto.randomUUID()}`;

      // Spec §11.7 / §20.10 — a fork copies authoritative state at the selected
      // event. Cloning the present would charge 120 credits for a branch that
      // is not branched, so the snapshot the chosen turn started from is what
      // gets copied; only a fork from the latest moment uses the live state.
      const atTurnIndex = request.body?.atTurnIndex ?? state.turnIndex;
      const snapshot = await ctx.repo.getStateSnapshot(session.sessionId, atTurnIndex);
      const forked = forkState(snapshot ?? state, newSessionId);

      const record: SessionRecord = {
        sessionId: newSessionId,
        userId: user.userId,
        storyId: session.storyId,
        storyVersionId: session.storyVersionId,
        displayName: request.body?.displayName ?? `${session.displayName} (fork)`,
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        lastPlayedAt: new Date().toISOString(),
        // Same root seed, different branch key: the fork gets its own roll
        // lineage rather than replaying the parent's dice.
        sessionSeed: session.sessionSeed,
        forkedFromSessionId: session.sessionId,
        forkedAtTurnIndex: atTurnIndex,
        branchKey: `fork_${newSessionId.slice(-8)}`,
      };

      await ctx.repo.createSession(record, forked);
      await ctx.repo.appendMemories(newSessionId, await ctx.repo.listMemories(session.sessionId));

      // Spec §11.7 — a fork is the same run taking a different turn from here,
      // so it inherits everything up to the fork point. Without the transcript
      // the branch opens with an empty screen in the middle of a story and
      // reads as starting over, which is not what was paid for.
      const inherited = (await ctx.repo.listTurns(session.sessionId))
        .filter((turn) => turn.turnIndex < atTurnIndex)
        .map((turn, index) => ({
          ...turn,
          // New ids: a turn is addressed globally, and two sessions cannot
          // share one record.
          turnId: `turn_${newSessionId.slice(-8)}_${index}`,
          sessionId: newSessionId,
        }));
      for (const turn of inherited) await ctx.repo.appendTurn(turn);

      void reply.code(201);
      return {
        session: toSessionSummary(record, story, forked, inherited.length),
        creditsCharged: cost,
      };
    },
  );

  // --- Turns (§33.4) ---

  app.post<{ Params: { sessionId: string } }>('/v1/sessions/:sessionId/turns', async (request, reply) => {
    const loaded = await loadSession(request.params.sessionId, request, reply);
    if (!loaded) return reply;
    const { session, story, user } = loaded;

    // Spec §17.3 — every turn POST carries a UUID idempotency key.
    const idempotencyKey = request.headers['idempotency-key'];
    if (typeof idempotencyKey !== 'string' || idempotencyKey.length === 0) {
      return sendError(reply, 400, 'IDEMPOTENCY_KEY_REQUIRED', 'Idempotency-Key header is required.');
    }

    const parsed = SubmitTurnRequest.safeParse(request.body);
    if (!parsed.success) {
      return sendError(reply, 400, 'INVALID_REQUEST', 'That action could not be read.', {
        issues: parsed.error.issues,
      });
    }

    const requestHash = sha256Hex(JSON.stringify(parsed.data));
    const existing = await ctx.repo.getIdempotency(idempotencyKey);
    if (existing) {
      // Same key, same body: return the original result rather than charging
      // twice. Same key, different body: a client bug, and a 409 (§17.3).
      if (existing.requestHash !== requestHash) {
        return sendError(reply, 409, 'IDEMPOTENCY_KEY_REUSED', 'That key was used for a different action.');
      }
      return existing.responseBody;
    }

    try {
      const accepted = await submitTurn({
        ctx,
        hub,
        user,
        session,
        story,
        actionText: parsed.data.actionText,
        qualityTier: parsed.data.qualityTier,
        clientRevision: parsed.data.sessionRevision,
      });

      const body = {
        turnId: accepted.turnId,
        reservedCredits: accepted.reservedCredits,
        balanceAfterReserve: accepted.balanceAfterReserve,
        acceptedRevision: accepted.acceptedRevision,
        streamUrl: accepted.streamUrl,
        streamToken: accepted.streamToken,
      };

      await ctx.repo.putIdempotency({
        key: idempotencyKey,
        userId: user.userId,
        sessionId: session.sessionId,
        requestHash,
        turnId: accepted.turnId,
        status: 'IN_PROGRESS',
        responseBody: body,
        createdAt: new Date().toISOString(),
      });

      void accepted.completion.then(() =>
        ctx.repo.updateIdempotency(idempotencyKey, { status: 'COMPLETED' }),
      );

      void reply.code(202);
      return body;
    } catch (error) {
      if (error instanceof InsufficientCreditsError) {
        // Spec §26.7 / WL-03 — the exact shortfall, so the wallet sheet can show it.
        return sendError(reply, 402, 'INSUFFICIENT_CREDITS', 'You need more credits for this turn.', {
          required: error.required,
          balance: error.balance,
          shortfall: error.shortfall,
        });
      }
      if (error instanceof ContentBlockedError) {
        // Spec §29.2 — redirect rather than lecture, and never charge. Nothing
        // was reserved, so there is nothing to release.
        request.log.warn(
          { userId: user.userId, categories: error.categories },
          'turn blocked by input moderation',
        );
        return sendError(reply, 422, 'CONTENT_BLOCKED', error.message);
      }
      if (error instanceof StaleRevisionError) {
        return sendError(reply, 409, 'STALE_REVISION', 'This story moved on while you were away.', {
          currentRevision: error.currentRevision,
          latestTurnId: error.latestTurnId,
        });
      }
      throw error;
    }
  });

  app.get<{ Params: { turnId: string }; Querystring: { token?: string } }>(
    '/v1/turns/:turnId/stream',
    async (request, reply) => {
      const auth = await readAuth(ctx, request);
      if (auth.kind !== 'OK') {
        return sendError(
          reply,
          401,
          auth.kind === 'EXPIRED' ? 'TOKEN_EXPIRED' : 'UNAUTHENTICATED',
          'Sign in to continue.',
        );
      }

      const token = request.query.token ?? '';
      const { turnId } = request.params;

      void reply.raw.writeHead(200, {
        'content-type': 'text/event-stream',
        'cache-control': 'no-cache, no-transform',
        connection: 'keep-alive',
        'x-accel-buffering': 'no',
      });

      const write = (chunk: string): void => {
        if (!reply.raw.writableEnded) reply.raw.write(chunk);
      };

      const result = hub.subscribe(turnId, token, auth.user.userId, (event) => {
        write(formatSse(event));
        if (event.event === 'turn.completed' || event.event === 'turn.failed') {
          reply.raw.end();
        }
      });

      if (!result.ok) {
        write(`event: turn.failed\ndata: ${JSON.stringify({ code: result.reason })}\n\n`);
        reply.raw.end();
        return reply;
      }

      if (result.done) {
        reply.raw.end();
        return reply;
      }

      // Comment frames keep intermediaries from closing an idle connection.
      const heartbeat = setInterval(() => write(': keep-alive\n\n'), 15_000);
      request.raw.on('close', () => {
        clearInterval(heartbeat);
        result.unsubscribe();
      });
      reply.raw.on('finish', () => clearInterval(heartbeat));

      return reply;
    },
  );

  app.get<{ Params: { turnId: string } }>('/v1/turns/:turnId', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;

    const turn = await ctx.repo.getTurn(request.params.turnId);
    if (!turn) return sendError(reply, 404, 'NOT_FOUND', 'That turn does not exist.');

    const session = await ctx.repo.getSession(turn.sessionId);
    if (!session || session.userId !== user.userId) {
      return sendError(reply, 404, 'NOT_FOUND', 'That turn does not exist.');
    }

    const story = await ctx.repo.getStoryVersion(session.storyVersionId);
    if (!story) return sendError(reply, 500, 'SESSION_CORRUPT', 'That turn could not be loaded.');
    return toPlayerTurn(story, turn);
  });

  /**
   * GP-04 / §20.9 — `Rephrase narration`.
   *
   * Reruns the writer over a turn that already happened, from the resolution
   * and beat plan that turn stored. The engine is not called: the dice, the
   * outcomes, the mutations and the events are exactly what they were, and only
   * the words change. "Never silently re-roll deterministic dice when only
   * narration is regenerated" is the rule, and the only way to keep it is to
   * have nothing here that could roll one.
   *
   * Charged as a generation, except when it is repairing a defect the system
   * produced — a turn that needed a repair pass is not something to bill for.
   */
  app.post<{ Params: { turnId: string } }>('/v1/turns/:turnId/rephrase', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;

    const turn = await ctx.repo.getTurn(request.params.turnId);
    if (!turn) return sendError(reply, 404, 'NOT_FOUND', 'That turn does not exist.');

    const session = await ctx.repo.getSession(turn.sessionId);
    if (!session || session.userId !== user.userId) {
      return sendError(reply, 404, 'NOT_FOUND', 'That turn does not exist.');
    }

    if (!turn.resolution || !turn.beatPlan) {
      return sendError(
        reply,
        409,
        'NOT_REPHRASABLE',
        'This moment was written before the story began, so there is nothing to say differently.',
      );
    }

    const story = await ctx.repo.getStoryVersion(session.storyVersionId);
    // The state the turn started from, which is what the writer saw the first
    // time. Rephrasing against the state it produced would describe the
    // aftermath rather than the moment.
    const before = await ctx.repo.getStateSnapshot(session.sessionId, turn.turnIndex - 1);
    if (!story || !before) {
      return sendError(
        reply,
        409,
        'NOT_REPHRASABLE',
        'That moment is too far back to rewrite. Older turns are kept as they were told.',
      );
    }

    // Free when the original needed repairing: that defect is ours.
    const free = turn.repairViolations.length > 0;
    const cost = free ? 0 : QUALITY_TIERS[turn.qualityTier].costCredits;
    const reservation = cost > 0 ? await ctx.wallet.reserve(user.userId, cost, `${turn.turnId}:rephrase`) : null;

    try {
      const result = await rephraseNarration({
        story,
        state: before,
        resolution: turn.resolution,
        plan: turn.beatPlan,
        memories: await ctx.repo.listMemories(session.sessionId),
        recentTurns: (await ctx.repo.listTurns(session.sessionId)).filter(
          (t) => t.turnIndex < turn.turnIndex,
        ),
        actionText: turn.actionText ?? '',
        tier: turn.qualityTier,
        // Recovered from the committed turn rather than re-parsed: re-running
        // the parse is a model call that could decide the player said something
        // other than what the story already records them saying.
        playerDialogue: turn.blocks
          .filter((block) => block.speakerId === 'player')
          .map((block) => ({ speaker: { entityType: 'player', entityId: 'player' }, text: block.text, visibility: 'GROUP' })),
        deps: ctx.pipeline,
      });

      await ctx.repo.replaceNarration(turn.turnId, {
        blocks: result.narrative.blocks,
        sceneSummary: result.narrative.sceneSummary,
        endStatePrompt: result.narrative.endStatePrompt,
        stateDeltas: result.narrative.stateDeltaPresentation,
      });

      if (reservation) await ctx.wallet.finalize(reservation);

      const updated = await ctx.repo.getTurn(turn.turnId);
      return {
        turn: toPlayerTurn(story, updated ?? turn),
        creditsCharged: cost,
        balance: await ctx.wallet.getBalance(user.userId),
      };
    } catch (error) {
      // Nothing was written, so nothing is charged. A failed rewrite must not
      // cost a player anything.
      if (reservation) await ctx.wallet.release(reservation, 'REPHRASE_FAILED');
      request.log.error({ err: error, turnId: turn.turnId }, 'rephrase failed');
      return sendError(reply, 502, 'GENERATION_FAILED', 'That could not be rewritten just now. Nothing was charged.');
    }
  });

  // --- Wallet / store (§33.5) ---

  app.get('/v1/wallet', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;

    const wallet = await ctx.wallet.getSummary(user.userId);
    const offers = wallet.firstPurchaseOfferExpiresAt
      ? [{ ...FIRST_PURCHASE_OFFER, expiresAt: wallet.firstPurchaseOfferExpiresAt }, ...STORE_OFFERS]
      : [...STORE_OFFERS];
    return { wallet, offers };
  });

  app.get<{ Querystring: { cursor?: string; limit?: string } }>('/v1/wallet/ledger', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    return ctx.wallet.listLedger(user.userId, Number(request.query.limit ?? 50), request.query.cursor);
  });

  app.get('/v1/store/offers', async () => ({ offers: STORE_OFFERS }));

  app.post('/v1/wallet/daily-claim', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    if (user.isGuest) {
      // Spec §20.5 — the daily grant requires an authenticated account.
      return sendError(reply, 403, 'SIGN_IN_REQUIRED', 'Sign in to claim your daily credits.');
    }
    const result = await ctx.wallet.claimDaily(user.userId);
    return {
      granted: result.granted,
      amount: result.entry?.amount ?? 0,
      balance: await ctx.wallet.getBalance(user.userId),
      nextClaimAt: result.nextAt,
    };
  });

  app.post('/v1/store/purchases/sync', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;

    const parsed = PurchaseSyncRequest.safeParse(request.body);
    if (!parsed.success) return sendError(reply, 400, 'INVALID_REQUEST', 'Purchase payload is malformed.');

    // Spec §33.5 — the store decides whether money moved, not the caller. This
    // endpoint grants credits, so an unverified body is worth nothing here.
    let verdict;
    try {
      verdict = await ctx.storeVerifier.verify({
        productId: parsed.data.productId,
        storeTransactionId: parsed.data.storeTransactionId,
        platform: parsed.data.platform,
        receipt: parsed.data.receipt,
        userId: user.userId,
      });
    } catch (error) {
      if (error instanceof NoVerifierError) {
        // Nothing can check this platform right now. Refusing is the only safe
        // answer, and 503 tells the client the purchase is still theirs to
        // retry rather than lost.
        request.log.error({ platform: parsed.data.platform }, 'no store verifier configured');
        return sendError(
          reply,
          503,
          'STORE_VERIFICATION_UNAVAILABLE',
          'We cannot confirm purchases right now. Your purchase is safe — reopen the wallet shortly and it will be applied.',
        );
      }
      throw error;
    }

    if (!verdict.valid) {
      request.log.warn(
        { userId: user.userId, platform: parsed.data.platform, reason: verdict.reason },
        'purchase verification failed',
      );
      return verdict.retryable
        ? sendError(
            reply,
            503,
            'STORE_VERIFICATION_UNAVAILABLE',
            'We could not reach the store to confirm that purchase. Your purchase is safe — try again shortly.',
          )
        : sendError(
            reply,
            402,
            'PURCHASE_NOT_VERIFIED',
            'The store could not confirm that purchase. If you were charged, contact support and nothing will be lost.',
          );
    }

    const result = await ctx.wallet.reconcilePurchase(
      user.userId,
      // What the store says was bought, not what the client claimed.
      verdict.productId,
      verdict.originalTransactionId,
      parsed.data.platform,
    );

    return {
      credited: result.credited,
      duplicate: result.duplicate,
      balance: await ctx.wallet.getBalance(user.userId),
    };
  });

  /**
   * Spec §20.6 — `Restore purchases`.
   *
   * Credits are consumable, so this is not the App Store's "restore
   * non-consumables" flow. It is the recovery path for the case that actually
   * hurts: the store charged, and reconciliation did not finish. Every
   * transaction the client's platform still holds gets re-verified and
   * re-reconciled; anything already credited comes back as a duplicate and
   * changes nothing.
   */
  app.post('/v1/store/purchases/restore', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;

    const parsed = PurchaseRestoreRequest.safeParse(request.body);
    if (!parsed.success) return sendError(reply, 400, 'INVALID_REQUEST', 'Restore payload is malformed.');

    let verified = 0;
    let restored = 0;
    let creditsRestored = 0;

    for (const transaction of parsed.data.transactions) {
      let verdict;
      try {
        verdict = await ctx.storeVerifier.verify({
          productId: transaction.productId,
          storeTransactionId: transaction.storeTransactionId,
          platform: transaction.platform,
          receipt: transaction.receipt,
          userId: user.userId,
        });
      } catch (error) {
        if (error instanceof NoVerifierError) continue;
        throw error;
      }

      // One bad or unverifiable entry must not abandon the rest: a restore that
      // gives up halfway is worse than one that reports what it managed.
      if (!verdict.valid) continue;
      verified += 1;

      const result = await ctx.wallet.reconcilePurchase(
        user.userId,
        verdict.productId,
        verdict.originalTransactionId,
        transaction.platform,
      );
      if (!result.duplicate && result.credited > 0) {
        restored += 1;
        creditsRestored += result.credited;
      }
    }

    return {
      verified,
      restored,
      creditsRestored,
      balance: await ctx.wallet.getBalance(user.userId),
    };
  });

  // --- Safety (§33.8) ---

  app.post('/v1/reports', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;

    const parsed = CreateReportRequest.safeParse(request.body);
    if (!parsed.success) return sendError(reply, 400, 'INVALID_REQUEST', 'Report is malformed.');

    const report = {
      reportId: `rep_${crypto.randomUUID()}`,
      reporterUserId: user.userId,
      targetType: parsed.data.targetType,
      targetId: parsed.data.targetId,
      reason: parsed.data.reason,
      details: parsed.data.details,
      status: 'OPEN' as const,
      createdAt: new Date().toISOString(),
    };
    await ctx.repo.createReport(report);

    if (parsed.data.alsoHide && parsed.data.targetType === 'STORY') {
      await ctx.repo.setHidden(user.userId, parsed.data.targetId, true);
    }
    if (parsed.data.targetType === 'STORY') {
      await ctx.repo.bumpSignal(parsed.data.targetId, 'reports', 1);
    }

    void reply.code(201);
    return { reportId: report.reportId, caseReference: report.reportId.slice(-8).toUpperCase() };
  });

  app.get('/v1/report-history', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    return { reports: await ctx.repo.listReports(user.userId) };
  });

  app.post<{ Body: { targetId?: string } }>('/v1/blocks', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    const targetId = request.body?.targetId;
    if (!targetId) return sendError(reply, 400, 'INVALID_REQUEST', 'targetId is required.');
    await ctx.repo.setBlocked(user.userId, targetId, true);
    return { blocked: true };
  });

  app.delete<{ Params: { targetId: string } }>('/v1/blocks/:targetId', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    await ctx.repo.setBlocked(user.userId, request.params.targetId, false);
    return { blocked: false };
  });

  app.get('/v1/blocks', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    return { blocked: await ctx.repo.listBlocks(user.userId) };
  });

  // --- Account (§33.9) ---

  app.get('/v1/me', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;

    const sessions = await ctx.repo.listSessions(user.userId);
    let turnsPlayed = 0;
    for (const session of sessions) turnsPlayed += (await ctx.repo.listTurns(session.sessionId)).length;

    return {
      userId: user.userId,
      displayName: user.displayName,
      handle: user.handle,
      email: user.email,
      isGuest: user.isGuest,
      avatarUrl: user.avatarUrl,
      ageVerified: user.ageVerified,
      createdAt: user.createdAt,
      settings: user.settings,
      stats: {
        storiesPlayed: new Set(sessions.map((s) => s.storyId)).size,
        turnsPlayed,
        worldsCreated: 0,
      },
    };
  });

  app.patch('/v1/me', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    const body = (request.body ?? {}) as Record<string, unknown>;

    const patch: Record<string, unknown> = {};
    if (typeof body.displayName === 'string') patch.displayName = body.displayName.slice(0, 40);
    if (typeof body.ageVerified === 'boolean') patch.ageVerified = body.ageVerified;
    if (body.settings && typeof body.settings === 'object') patch.settings = body.settings;

    const updated = await ctx.repo.updateUser(user.userId, patch);
    return updated;
  });

  /** Spec §6.5 — a guest's sessions and migratable grants follow them in. */
  app.post<{ Body: { guestUserId?: string; email?: string; displayName?: string } }>(
    '/v1/auth/guest-migrate',
    async (request, reply) => {
      const auth = await readAuth(ctx, request);
      if (auth.kind === 'EXPIRED') {
        return sendError(reply, 401, 'TOKEN_EXPIRED', 'Your session expired. Sign in again.');
      }
      if (auth.kind !== 'OK') {
        return sendError(reply, 401, 'UNAUTHENTICATED', 'Provide the new account token.');
      }
      if (auth.user.isGuest) {
        return sendError(reply, 400, 'INVALID_REQUEST', 'Authenticate first, then migrate.');
      }

      const guestUserId = request.body?.guestUserId;
      let user = await ctx.repo.getUser(auth.user.userId);
      if (!user) {
        user = newUserRecord(auth.user.userId, false, auth.user.email ?? request.body?.email ?? null);
        if (request.body?.displayName) user.displayName = request.body.displayName;
        await ctx.repo.createUser(user);
        await ctx.wallet.grantNewUser(auth.user.userId);
      }

      if (!guestUserId) return { migrated: false, sessionsMoved: 0 };

      const guest = await ctx.repo.getUser(guestUserId);
      // Only an actual guest may be absorbed, and only once (§6.5 dedupe).
      if (!guest?.isGuest || user.migratedFromGuestId) {
        return { migrated: false, sessionsMoved: 0 };
      }

      const sessions = await ctx.repo.listSessions(guestUserId);
      for (const session of sessions) {
        await ctx.repo.updateSession(session.sessionId, { userId: auth.user.userId } as Partial<SessionRecord>);
      }

      // Spec §6.5 — grants migrate; purchases are never duplicated. A guest
      // cannot have purchased, so only the new-user grant is in play, and the
      // new account already received its own.
      await ctx.repo.updateUser(auth.user.userId, { migratedFromGuestId: guestUserId });
      await ctx.repo.deleteUser(guestUserId);

      return { migrated: true, sessionsMoved: sessions.length };
    },
  );

  app.post('/v1/account/deletion-request', async (request, reply) => {
    const user = await requireUser(ctx, request, reply);
    if (!user) return reply;
    await ctx.repo.updateUser(user.userId, { deletionRequestedAt: new Date().toISOString() });
    // Spec §23.3 — the account is removed from the product immediately; the
    // ledger is retained for financial audit and purged by a separate workflow.
    await ctx.repo.deleteUser(user.userId);
    return { deleted: true, purgeCompletesWithinDays: 30 };
  });

  // --- Helpers ---

  async function loadSession(
    sessionId: string,
    request: Parameters<typeof requireUser>[1],
    reply: Parameters<typeof requireUser>[2],
  ) {
    const user = await requireUser(ctx, request, reply);
    if (!user) return null;

    const session = await ctx.repo.getSession(sessionId);
    // A session belonging to someone else is reported as missing, not forbidden,
    // so ids cannot be probed.
    if (!session || session.userId !== user.userId) {
      sendError(reply, 404, 'NOT_FOUND', 'That session does not exist.');
      return null;
    }

    const story = await ctx.repo.getStoryVersion(session.storyVersionId);
    const state = await ctx.repo.getState(sessionId);
    if (!story || !state) {
      sendError(reply, 500, 'SESSION_CORRUPT', 'That session could not be loaded.');
      return null;
    }

    return { user, session, story, state };
  }

  return Object.assign(app, { ctx, hub });
}

/**
 * Spec §7.4 — launch ranking.
 *
 * Deliberately not "sort by runs": that makes incumbents permanent winners. This
 * scores engagement rates rather than volume, penalises hides and reports, and
 * applies Bayesian shrinkage toward a prior so a world with three great runs
 * does not outrank one with three thousand good ones.
 *
 * The full multi-window formula runs as an offline rollup job; this is the fast
 * read-path approximation over the same signals.
 */
const RANKING_PRIOR_WEIGHT = 500;
const RANKING_PRIOR_RATE = 0.25;

export function scoreStory(signals: StorySignals): number {
  const runs = Math.max(1, signals.runs);

  const likeRate = signals.likes / runs;
  const saveRate = signals.saves / runs;
  const hideRate = signals.hides / Math.max(1, signals.impressions);
  const reportRate = signals.reports / runs;

  const raw = 0.5 * likeRate + 0.5 * saveRate - 8 * hideRate - 15 * reportRate;

  // Shrink toward the prior in proportion to how little evidence there is.
  return (raw * signals.runs + RANKING_PRIOR_RATE * RANKING_PRIOR_WEIGHT) / (signals.runs + RANKING_PRIOR_WEIGHT);
}

function rankStories(entries: readonly RankedEntry[]): StorySummary[] {
  return [...entries]
    .sort(
      (a, b) =>
        scoreStory(b.signals) + (b.summary.official ? 0.05 : 0) -
          (scoreStory(a.signals) + (a.summary.official ? 0.05 : 0)) ||
        a.summary.title.localeCompare(b.summary.title),
    )
    .map((e) => e.summary);
}

interface RankedEntry {
  readonly summary: StorySummary;
  readonly signals: StorySignals;
}
