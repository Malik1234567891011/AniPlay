import Fastify, { type FastifyInstance } from 'fastify';
import {
  CanonCorrectionRequest,
  CreateReportRequest,
  CreateSessionRequest,
  DEFAULT_QUALITY_TIER,
  FIRST_PURCHASE_OFFER,
  FORK_COST_CREDITS,
  PurchaseSyncRequest,
  QUALITY_TIERS,
  STORE_OFFERS,
  SubmitTurnRequest,
  type ContentDescriptor,
  type DiscoverRail,
  type StorySummary,
} from '@aniplay/contracts';
import { createInitialState, forkState, sha256Hex } from '@aniplay/engine';
import { applyCorrection, buildRecap, checkCorrectionConflict } from '@aniplay/director';
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
import { TurnStreamHub, formatSse } from './stream.js';
import {
  StaleRevisionError,
  submitTurn,
  InsufficientCreditsError,
} from './turn-service.js';
import {
  toContinueCard,
  toSceneState,
  toSessionSummary,
  toStoryDetail,
  toStorySummary,
  toTimeline,
  toWorldSheet,
} from './projections.js';
import type { SessionRecord, StorySignals } from './repo/types.js';

/**
 * Spec §33 — the `/v1` surface.
 *
 * The API is stateless apart from short-lived stream metadata; everything
 * durable lives in the repository (§32.1).
 */

const GENRES = [
  { id: 'magic_academy', label: 'Magic academy' },
  { id: 'romance', label: 'Romance' },
  { id: 'dark_fantasy', label: 'Dark fantasy' },
  { id: 'isekai', label: 'Isekai' },
  { id: 'mystery', label: 'Mystery' },
  { id: 'supernatural', label: 'Supernatural' },
  { id: 'rivalry', label: 'Rivalry' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'sci_fi', label: 'Sci-fi' },
  { id: 'cozy', label: 'Cozy' },
];

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
      genres: GENRES,
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

  app.get('/v1/discover', async (request) => {
    const user = await optionalUser(ctx, request);
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
      rails.push({ id: 'for_you', title: 'For you', kind: 'FOR_YOU', subtitle: 'Based on what you picked', stories: ranked });
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

    const related: StorySummary[] = [];
    for (const other of await ctx.repo.listStories()) {
      if (other.storyId === story.storyId) continue;
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
      recentTurns: turns.slice(-8),
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
      const forked = forkState(state, newSessionId);

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
        forkedAtTurnIndex: request.body?.atTurnIndex ?? state.turnIndex,
        branchKey: `fork_${newSessionId.slice(-8)}`,
      };

      await ctx.repo.createSession(record, forked);
      await ctx.repo.appendMemories(newSessionId, await ctx.repo.listMemories(session.sessionId));

      void reply.code(201);
      return {
        session: toSessionSummary(record, story, forked, 0),
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
      const auth = readAuth(request);
      if (!auth) return sendError(reply, 401, 'UNAUTHENTICATED', 'Sign in to continue.');

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

      const result = hub.subscribe(turnId, token, auth.userId, (event) => {
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
    return turn;
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

    const result = await ctx.wallet.reconcilePurchase(
      user.userId,
      parsed.data.productId,
      parsed.data.storeTransactionId,
      parsed.data.platform,
    );

    return {
      credited: result.credited,
      duplicate: result.duplicate,
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
      const auth = readAuth(request);
      if (!auth) return sendError(reply, 401, 'UNAUTHENTICATED', 'Provide the new account token.');
      if (auth.isGuest) {
        return sendError(reply, 400, 'INVALID_REQUEST', 'Authenticate first, then migrate.');
      }

      const guestUserId = request.body?.guestUserId;
      let user = await ctx.repo.getUser(auth.userId);
      if (!user) {
        user = newUserRecord(auth.userId, false);
        user.email = request.body?.email ?? null;
        user.displayName = request.body?.displayName ?? 'Player';
        await ctx.repo.createUser(user);
        await ctx.wallet.grantNewUser(auth.userId);
      }

      if (!guestUserId) return { migrated: false, sessionsMoved: 0 };

      const guest = await ctx.repo.getUser(guestUserId);
      // Only an actual guest may be absorbed, and only once (§6.5 dedupe).
      if (!guest?.isGuest || user.migratedFromGuestId) {
        return { migrated: false, sessionsMoved: 0 };
      }

      const sessions = await ctx.repo.listSessions(guestUserId);
      for (const session of sessions) {
        await ctx.repo.updateSession(session.sessionId, { userId: auth.userId } as Partial<SessionRecord>);
      }

      // Spec §6.5 — grants migrate; purchases are never duplicated. A guest
      // cannot have purchased, so only the new-user grant is in play, and the
      // new account already received its own.
      await ctx.repo.updateUser(auth.userId, { migratedFromGuestId: guestUserId });
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
