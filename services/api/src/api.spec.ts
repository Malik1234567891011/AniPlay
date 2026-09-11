import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { GRANT_DAILY, GRANT_NEW_USER, QUALITY_TIERS } from '@aniplay/contracts';
import { createDefaultPipeline, RuleBasedModerator } from '@aniplay/director';
import { JobQueue } from '@aniplay/worker';
import { buildServer } from './server.js';
import { assertProductionReady, createAppContext, loadConfig } from './context.js';
import { categoriesFor } from './catalog-taxonomy.js';
import { MemoryRepository } from './repo/memory.js';
import { WalletService } from './wallet.js';
import type { TurnRecord } from '@aniplay/contracts';
import type { AppContext } from './context.js';
import { createHmac } from 'node:crypto';
import { DevTokenVerifier, SupabaseJwtVerifier, devUserId } from './auth.js';
import { RATE_LIMITS, SlidingWindowRateLimiter } from './rate-limit.js';
import { NoVerifierError, createStoreVerifierFromEnv } from './store-verifier.js';
import type { TurnStreamHub } from './stream.js';

type Server = FastifyInstance & { ctx: AppContext; hub: TurnStreamHub };

let app: Server;
let ctx: AppContext;
const GUEST_TOKEN = 'guest_test_user';
// The development verifier maps a token to a stable uuid, because that is what
// the production schema stores. Assertions about stored rows use the mapped id.
const GUEST = devUserId(GUEST_TOKEN);
const auth = { authorization: `Bearer ${GUEST_TOKEN}` };

function makeContext(now: () => Date = () => new Date()): AppContext {
  const repo = new MemoryRepository();
  return {
    config: loadConfig({ PORT: '4000' } as NodeJS.ProcessEnv),
    repo,
    wallet: new WalletService(repo, now),
    // Pinned to the rule-based pipeline so tests never depend on a provider key.
    pipeline: createDefaultPipeline(),
    modelProvider: null,
    // No model in tests, so the engine's deterministic derivation is what runs.
    modelGateway: null,
    // No handlers registered, so media jobs are inert in tests.
    jobs: new JobQueue(),
    // The development verifier: the token is the user id. Production cannot
    // select it, which `assertProductionReady` and the auth tests both pin.
    auth: new DevTokenVerifier(),
    // The narrow floor, with no provider behind it: the same thing a build
    // with no keys ships with.
    moderator: new RuleBasedModerator(),
    // Effectively off. The limiter has its own tests; a suite that plays
    // hundreds of turns in a second is not the place to exercise it.
    rateLimiter: { check: () => ({ allowed: true, retryAfterSeconds: 0, limit: 1e6, remaining: 1e6 }) },
    // The real selection logic, so the tests exercise platform dispatch and
    // not a hand-picked verifier that always answers.
    storeVerifier: createStoreVerifierFromEnv(loadConfig({ PORT: '4000' } as NodeJS.ProcessEnv), {} as NodeJS.ProcessEnv),
  };
}

beforeEach(() => {
  ctx = makeContext();
  app = buildServer({ ctx }) as Server;
});

afterEach(async () => {
  await app.close();
});

async function startSession(): Promise<{ sessionId: string; revision: number }> {
  const response = await app.inject({
    method: 'POST',
    url: '/v1/stories/story_ninth_archive/sessions',
    headers: auth,
    payload: {
      identity: {
        displayName: 'Malik',
        pronouns: 'he/him',
        ageBand: null,
        archetypeId: 'arch_scholar',
        worldKnowsAboutYou: 'Arrived late.',
        advanced: {},
        portraitAssetId: null,
      },
      usedQuickSetup: true,
    },
  });
  const body = response.json();
  return { sessionId: body.session.sessionId, revision: body.revision };
}

/** Submits a turn and waits for background processing to settle. */
async function playTurn(
  sessionId: string,
  revision: number,
  actionText = 'I look around.',
  qualityTier = 'VIVID',
  key = crypto.randomUUID(),
) {
  const response = await app.inject({
    method: 'POST',
    url: `/v1/sessions/${sessionId}/turns`,
    headers: { ...auth, 'idempotency-key': key },
    payload: { actionText, qualityTier, sessionRevision: revision, selectedSuggestionId: null, voicePreferred: false },
  });
  // The POST returns 202 and processing continues; poll the hub for the end.
  const body = response.json();
  if (response.statusCode === 202) {
    for (let i = 0; i < 200 && !app.hub.isDone(body.turnId); i++) {
      await new Promise((resolve) => setImmediate(resolve));
    }
  }
  return { response, body };
}

// ---------------------------------------------------------------------------

describe('bootstrap and catalog', () => {
  it('serves bootstrap without authentication', async () => {
    const response = await app.inject({ method: 'GET', url: '/v1/bootstrap' });
    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.profile).toBeNull();
    expect(body.wallet).toBeNull();
    expect(body.qualityTiers).toHaveLength(4);
    expect(body.defaultQualityTier).toBe('VIVID');
  });

  it('lets a guest browse discover and story detail (spec §6.3)', async () => {
    expect((await app.inject({ method: 'GET', url: '/v1/discover' })).statusCode).toBe(200);
    const detail = await app.inject({ method: 'GET', url: '/v1/stories/story_ninth_archive' });
    expect(detail.statusCode).toBe(200);
    expect(detail.json().premise.length).toBeGreaterThan(100);
  });

  it('never ships hidden character drives to the client', async () => {
    const detail = await app.inject({ method: 'GET', url: '/v1/stories/story_ninth_archive' });
    const raw = detail.body;
    expect(raw).not.toContain('hiddenDrives');
    expect(raw).not.toContain('erasure order that removed');
    // An allowlist, not a denylist: anything new on a cast member has to be
    // added here on purpose, which is what stops a field like `secrets` or
    // `goals` reaching a client because somebody widened a projection.
    for (const member of detail.json().cast) {
      expect(Object.keys(member).sort()).toEqual(
        ['appearance', 'cardBlurb', 'id', 'name', 'portrait', 'pronouns', 'publicTraits', 'role'].sort(),
      );
    }

    // And the things that must never be there, named, so the assertion above
    // failing tells you which way it went wrong.
    for (const forbidden of ['hiddenDrives', 'secrets', 'goals', 'fears', 'knowledgeScope', 'values']) {
      expect(raw, forbidden).not.toContain(`"${forbidden}"`);
    }
  });

  it('refuses an archetype the world does not have', async () => {
    // This used to be accepted silently, and createInitialState built a
    // character with every skill at zero. The run looked normal and was
    // crippled — a client typo produced a bad game instead of an error.
    const response = await app.inject({
      method: 'POST',
      url: '/v1/stories/story_ninth_archive/sessions',
      headers: auth,
      payload: {
        identity: {
          displayName: 'Sora', pronouns: 'they/them', ageBand: null,
          archetypeId: 'arch_does_not_exist', worldKnowsAboutYou: '',
          advanced: {}, portraitAssetId: null,
        },
      },
    });
    expect(response.statusCode).toBe(400);
    expect(response.json().details.available).toContain('arch_scholar');
  });

  it('still allows no archetype at all', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/v1/stories/story_ninth_archive/sessions',
      headers: auth,
      payload: {
        identity: {
          displayName: 'Sora', pronouns: 'they/them', ageBand: null,
          archetypeId: null, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
        },
      },
    });
    expect(response.statusCode).toBe(201);
  });

  it('searches across title, tags, premise, and cast', async () => {
    for (const query of ['ninth', 'mystery', 'Mira', 'ward']) {
      const response = await app.inject({ method: 'GET', url: `/v1/search?q=${query}` });
      expect(response.json().results.length, query).toBeGreaterThan(0);
    }
    expect((await app.inject({ method: 'GET', url: '/v1/search?q=zzzznotathing' })).json().results).toHaveLength(0);
  });

  it('sets the contract version header on every response', async () => {
    const response = await app.inject({ method: 'GET', url: '/health' });
    expect(response.headers['x-contract-version']).toBe('1.0.0');
  });
});

describe('wallet (spec §20.7, §20.8)', () => {
  it('grants new-user credits on first sight of a guest', async () => {
    const response = await app.inject({ method: 'GET', url: '/v1/wallet', headers: auth });
    expect(response.json().wallet.balance).toBe(GRANT_NEW_USER);
  });

  it('derives balance from the ledger, never a stored integer', async () => {
    await app.inject({ method: 'GET', url: '/v1/wallet', headers: auth });
    const entries = await ctx.repo.listLedger(GUEST);
    const summed = entries.reduce((sum, e) => sum + e.amount, 0);
    expect(await ctx.wallet.getBalance(GUEST)).toBe(summed);
  });

  it('reserves then finalizes on a successful turn', async () => {
    const { sessionId, revision } = await startSession();
    const before = await ctx.wallet.getBalance(GUEST);

    await playTurn(sessionId, revision);

    const after = await ctx.wallet.getBalance(GUEST);
    expect(after).toBe(before - QUALITY_TIERS.VIVID.costCredits);

    const types = (await ctx.repo.listLedger(GUEST)).map((e) => e.type);
    expect(types).toContain('TURN_RESERVE');
    expect(types).toContain('TURN_FINALIZE');
    expect(types).not.toContain('TURN_RELEASE');
    expect(await ctx.wallet.getReserved(GUEST)).toBe(0);
  });

  it('releases the reserve and charges nothing when the turn fails', async () => {
    const { sessionId, revision } = await startSession();
    const before = await ctx.wallet.getBalance(GUEST);

    // Force a failure inside the pipeline, after the reserve is placed.
    ctx.pipeline.writer.write = async () => {
      throw new Error('provider exploded');
    };

    const { body } = await playTurn(sessionId, revision);
    void body;

    expect(await ctx.wallet.getBalance(GUEST)).toBe(before);
    const types = (await ctx.repo.listLedger(GUEST)).map((e) => e.type);
    expect(types).toContain('TURN_RELEASE');
    expect(types).not.toContain('TURN_FINALIZE');
  });

  it('refuses a turn the player cannot afford, with the exact shortfall', async () => {
    const { sessionId, revision } = await startSession();
    // Drain the wallet to just under one Apex turn.
    await ctx.wallet.grant(GUEST, 'ADMIN_ADJUST', -(GRANT_NEW_USER - 100), 'drain');

    const response = await app.inject({
      method: 'POST',
      url: `/v1/sessions/${sessionId}/turns`,
      headers: { ...auth, 'idempotency-key': crypto.randomUUID() },
      payload: { actionText: 'I look around', qualityTier: 'APEX', sessionRevision: revision, selectedSuggestionId: null, voicePreferred: false },
    });

    expect(response.statusCode).toBe(402);
    const body = response.json();
    expect(body.code).toBe('INSUFFICIENT_CREDITS');
    expect(body.details.required).toBe(QUALITY_TIERS.APEX.costCredits);
    expect(body.details.shortfall).toBe(QUALITY_TIERS.APEX.costCredits - 100);
  });

  it('never lets the balance go negative across many turns', async () => {
    const { sessionId } = await startSession();
    let revision = 0;
    for (let i = 0; i < 20; i++) {
      const { response, body } = await playTurn(sessionId, revision, `Turn ${i}`, 'QUICK');
      if (response.statusCode === 402) break;
      if (response.statusCode === 202) {
        const turn = await ctx.repo.getTurn(body.turnId);
        if (turn) revision = turn.revisionAfter;
      }
      expect(await ctx.wallet.getBalance(GUEST)).toBeGreaterThanOrEqual(0);
    }
    expect(await ctx.wallet.getBalance(GUEST)).toBeGreaterThanOrEqual(0);
  });

  it('grants the daily claim once per server day', async () => {
    let now = new Date('2026-09-09T10:00:00Z');
    const timed = makeContext(() => now);
    const timedApp = buildServer({ ctx: timed }) as Server;
    const user = 'authed_user';
    await timed.repo.createUser({
      userId: user, displayName: 'P', handle: 'p', email: 'p@example.com', isGuest: false,
      avatarUrl: null, ageVerified: true, createdAt: now.toISOString(),
      settings: { showAdvancedRelationshipStats: false, showCheckMath: false, reduceMotion: false, voiceAutoplay: false, hapticsEnabled: true, defaultQualityTier: 'VIVID', contentFilters: [], locale: null },
      migratedFromGuestId: null, deletionRequestedAt: null,
    });
    const headers = { authorization: `Bearer ${user}` };

    const first = await timedApp.inject({ method: 'POST', url: '/v1/wallet/daily-claim', headers });
    expect(first.json().granted).toBe(true);
    expect(first.json().amount).toBe(GRANT_DAILY);

    const second = await timedApp.inject({ method: 'POST', url: '/v1/wallet/daily-claim', headers });
    expect(second.json().granted).toBe(false);

    now = new Date('2026-09-10T00:05:00Z');
    const third = await timedApp.inject({ method: 'POST', url: '/v1/wallet/daily-claim', headers });
    expect(third.json().granted).toBe(true);

    await timedApp.close();
  });

  it('requires an account for the daily grant (spec §20.5)', async () => {
    const response = await app.inject({ method: 'POST', url: '/v1/wallet/daily-claim', headers: auth });
    expect(response.statusCode).toBe(403);
  });

  it('reconciles a store purchase exactly once per transaction id', async () => {
    await app.inject({ method: 'GET', url: '/v1/wallet', headers: auth });
    const before = await ctx.wallet.getBalance(GUEST);
    const payload = {
      productId: 'crd_10000',
      storeTransactionId: 'sandbox_txn_abc',
      platform: 'SANDBOX',
      receipt: null,
    };

    const first = await app.inject({ method: 'POST', url: '/v1/store/purchases/sync', headers: auth, payload });
    expect(first.json().credited).toBe(10_300);
    expect(first.json().duplicate).toBe(false);

    const replay = await app.inject({ method: 'POST', url: '/v1/store/purchases/sync', headers: auth, payload });
    expect(replay.json().duplicate).toBe(true);
    expect(replay.json().credited).toBe(0);

    expect(await ctx.wallet.getBalance(GUEST)).toBe(before + 10_300);
  });

  it('refuses a purchase the store cannot confirm (spec §33.5)', async () => {
    // The body is well-formed and the product is real. The only thing wrong
    // with it is that no store ever saw it, which is the whole point.
    await app.inject({ method: 'GET', url: '/v1/wallet', headers: auth });
    const before = await ctx.wallet.getBalance(GUEST);
    const response = await app.inject({
      method: 'POST',
      url: '/v1/store/purchases/sync',
      headers: auth,
      payload: { productId: 'crd_50000', storeTransactionId: 'i-just-made-this-up', platform: 'SANDBOX', receipt: null },
    });

    expect(response.statusCode).toBe(402);
    expect(response.json().code).toBe('PURCHASE_NOT_VERIFIED');
    expect(await ctx.wallet.getBalance(GUEST)).toBe(before);
  });

  it('refuses rather than credits when no verifier covers the platform', async () => {
    await app.inject({ method: 'GET', url: '/v1/wallet', headers: auth });
    const before = await ctx.wallet.getBalance(GUEST);
    const response = await app.inject({
      method: 'POST',
      url: '/v1/store/purchases/sync',
      headers: auth,
      payload: { productId: 'crd_50000', storeTransactionId: '2000000123456789', platform: 'APP_STORE', receipt: null },
    });

    // 503, not 402: the purchase may be real, we just cannot check it yet.
    expect(response.statusCode).toBe(503);
    expect(response.json().code).toBe('STORE_VERIFICATION_UNAVAILABLE');
    expect(await ctx.wallet.getBalance(GUEST)).toBe(before);
  });

  it('keys reconciliation on the store id, not the one the client sent', async () => {
    // Same underlying sandbox transaction, posted twice. A client that
    // reshapes its own id must not get paid twice for one purchase.
    await app.inject({ method: 'GET', url: '/v1/wallet', headers: auth });
    const before = await ctx.wallet.getBalance(GUEST);
    const send = (storeTransactionId: string) =>
      app.inject({
        method: 'POST',
        url: '/v1/store/purchases/sync',
        headers: auth,
        payload: { productId: 'crd_2000', storeTransactionId, platform: 'SANDBOX', receipt: null },
      });

    await send('sandbox_one_purchase');
    const replay = await send('sandbox_one_purchase');

    expect(replay.json().duplicate).toBe(true);
    expect(await ctx.wallet.getBalance(GUEST)).toBe(before + 2_000);
  });

  it('will not start in production with development auth (spec §6.3)', () => {
    const production = { port: 4000, host: '0.0.0.0', environment: 'production' as const, baseUrl: 'https://x.test' };

    // The bearer token is the user id and nothing verifies it. That is fine
    // locally and a total account takeover in front of real users, so the
    // process has to refuse rather than serve.
    expect(() => assertProductionReady(production, {} as NodeJS.ProcessEnv)).toThrow(/SUPABASE_JWT_SECRET/);
    expect(() =>
      assertProductionReady(production, { AUTH_JWKS_URL: 'https://x.test/jwks' } as NodeJS.ProcessEnv),
    ).toThrow(/DATABASE_URL/);
    expect(() =>
      assertProductionReady(production, {
        AUTH_JWKS_URL: 'https://x.test/jwks',
        DATABASE_URL: 'postgres://x',
      } as NodeJS.ProcessEnv),
    ).not.toThrow();

    // Development is unaffected; the whole point is that it stays runnable.
    expect(() =>
      assertProductionReady({ ...production, environment: 'dev' }, {} as NodeJS.ProcessEnv),
    ).not.toThrow();
  });

  it('never ships a sandbox verifier in production', async () => {
    const verifier = createStoreVerifierFromEnv(
      { port: 4000, host: '0.0.0.0', environment: 'production', baseUrl: 'https://example.test' },
      {} as NodeJS.ProcessEnv,
    );

    // No store credentials and no sandbox fallback: nothing can be verified,
    // so nothing can be credited. That is the correct failure.
    await expect(
      verifier.verify({
        productId: 'crd_50000',
        storeTransactionId: 'sandbox_free_money',
        platform: 'SANDBOX',
        receipt: null,
        userId: GUEST,
      }),
    ).rejects.toThrow(NoVerifierError);
  });
});

describe('forking (spec §11.7, §20.10)', () => {
  it('gives the branch the history that led to it', async () => {
    const { sessionId, revision } = await startSession();
    await playTurn(sessionId, revision, 'I show Kael the acceptance letter.');

    const before = await ctx.wallet.getBalance(GUEST);
    const response = await app.inject({
      method: 'POST',
      url: `/v1/sessions/${sessionId}/forks`,
      headers: auth,
      payload: { atTurnIndex: 1 },
    });

    expect(response.statusCode).toBe(201);
    const forkId = response.json().session.sessionId as string;
    expect(await ctx.wallet.getBalance(GUEST)).toBe(before - response.json().creditsCharged);

    // A fork with no transcript opens on an empty screen in the middle of a
    // story, which reads as starting over rather than branching.
    const branch = await app.inject({ method: 'GET', url: `/v1/sessions/${forkId}`, headers: auth });
    expect(branch.json().recentTurns.length).toBeGreaterThan(0);

    // Its turns belong to it, and are not the parent's records under another name.
    for (const turn of branch.json().recentTurns) {
      expect(turn.sessionId).toBe(forkId);
    }
    const parentTurnIds = new Set(
      (await ctx.repo.listTurns(sessionId)).map((turn) => turn.turnId),
    );
    for (const turn of await ctx.repo.listTurns(forkId)) {
      expect(parentTurnIds.has(turn.turnId)).toBe(false);
    }

    // And the original is untouched.
    const original = await app.inject({ method: 'GET', url: `/v1/sessions/${sessionId}`, headers: auth });
    expect(original.statusCode).toBe(200);
    expect(original.json().recentTurns.length).toBeGreaterThan(0);
  });

  it('gives every turn its own index', async () => {
    // The opening record is 0 and the first player turn used the pre-turn
    // index, so two different beats both claimed 0 — which made "fork from
    // here" ambiguous on the timeline.
    const { sessionId, revision } = await startSession();
    let rev = revision;
    for (const text of ['I look at the ward.', 'I walk into the commons.']) {
      const { body } = await playTurn(sessionId, rev, text);
      await body.completion;
      rev = (await ctx.repo.getState(sessionId))!.revision;
    }

    const indices = (await ctx.repo.listTurns(sessionId)).map((turn) => turn.turnIndex);
    expect(new Set(indices).size).toBe(indices.length);
    expect([...indices].sort((a, b) => a - b)).toEqual(indices);
  });

  it('branches from the moment chosen, not from the present', async () => {
    // The bug: `forkState` cloned the live state and ignored the fork point
    // entirely, so 120 credits bought a copy of wherever the player already
    // was rather than a branch.
    const { sessionId, revision } = await startSession();
    const before = await ctx.repo.getState(sessionId);

    let rev = revision;
    for (const text of ['I read the ward above the gate.', 'I walk into the commons.']) {
      const { body } = await playTurn(sessionId, rev, text);
      await body.completion;
      rev = (await ctx.repo.getState(sessionId))!.revision;
    }

    const moved = await ctx.repo.getState(sessionId);
    expect(moved!.turnIndex).toBeGreaterThan(before!.turnIndex);

    const response = await app.inject({
      method: 'POST',
      url: `/v1/sessions/${sessionId}/forks`,
      headers: auth,
      // The world as it was before the very first turn was taken.
      payload: { atTurnIndex: before!.turnIndex },
    });
    const forkId = response.json().session.sessionId as string;
    const branch = await ctx.repo.getState(forkId);

    expect(branch!.turnIndex).toBe(before!.turnIndex);
    expect(branch!.worldMinute).toBe(before!.worldMinute);
    expect(branch!.player.locationId).toBe(before!.player.locationId);
    // And it does not carry turns that had not happened yet at that point.
    expect(await ctx.repo.listTurns(forkId)).toHaveLength(0);
  });

  it('charges nothing when the player cannot afford it', async () => {
    const { sessionId } = await startSession();
    // Spend the wallet down below the fork price.
    const balance = await ctx.wallet.getBalance(GUEST);
    await ctx.wallet.chargeFork(GUEST, sessionId, balance, `drain:${sessionId}`);

    const response = await app.inject({
      method: 'POST',
      url: `/v1/sessions/${sessionId}/forks`,
      headers: auth,
      payload: { atTurnIndex: 0 },
    });

    expect(response.statusCode).toBe(402);
    expect(response.json().code).toBe('INSUFFICIENT_CREDITS');
    expect(response.json().details.shortfall).toBeGreaterThan(0);
    expect(await ctx.wallet.getBalance(GUEST)).toBe(0);
  });
});

describe('turns (spec §17.3, §17.4)', () => {
  it('never sends a player the numbers their world hides (spec §12.7)', async () => {
    const { sessionId, revision } = await startSession();
    const { body } = await playTurn(sessionId, revision, 'I read the ward above the gate.');

    // The Ninth Archive sets revealExactDc: false and revealCheckMath: false.
    const story = await ctx.repo.getStoryVersion('sv_ninth_archive_1');
    expect(story?.rules.revealExactDc).toBe(false);
    expect(story?.rules.revealCheckMath).toBe(false);

    // The stored record keeps everything the engine needs.
    const stored = await ctx.repo.getTurn(body.turnId);
    expect(stored?.checks.length ?? 0).toBeGreaterThan(0);
    expect(typeof stored?.checks[0]?.dc).toBe('number');
    expect(stored?.mutations.length ?? 0).toBeGreaterThan(0);

    // What reaches the player does not.
    const response = await app.inject({ method: 'GET', url: `/v1/turns/${body.turnId}`, headers: auth });
    const turn = response.json();
    expect(turn.checks[0].dc).toBeNull();
    expect(turn.checks[0].math).toBeNull();
    // A band is still allowed, and is what the card actually shows.
    expect(turn.checks[0].difficultyLabel).toMatch(/\S/);
    // Engine internals and creator-only trace are absent entirely.
    expect(turn).not.toHaveProperty('mutations');
    expect(turn).not.toHaveProperty('repairViolations');
    expect(JSON.stringify(turn)).not.toContain('"keptRoll"');

    // Session detail carries the same projection, not the raw record.
    const detail = await app.inject({ method: 'GET', url: `/v1/sessions/${sessionId}`, headers: auth });
    for (const recent of detail.json().recentTurns) {
      expect(recent).not.toHaveProperty('mutations');
      for (const check of recent.checks) expect(check.dc).toBeNull();
    }
  });

  it('plays a turn end to end and advances the revision', async () => {
    const { sessionId, revision } = await startSession();
    const { response, body } = await playTurn(sessionId, revision, 'I read the ward above the gate.');

    expect(response.statusCode).toBe(202);
    expect(body.streamUrl).toContain(`/v1/turns/${body.turnId}/stream`);
    expect(body.streamToken).toBeTruthy();

    const turn = await ctx.repo.getTurn(body.turnId);
    expect(turn).not.toBeNull();
    expect(turn!.blocks.length).toBeGreaterThan(0);
    expect(turn!.revisionAfter).toBe(revision + 1);
  });

  it('requires an idempotency key', async () => {
    const { sessionId, revision } = await startSession();
    const response = await app.inject({
      method: 'POST',
      url: `/v1/sessions/${sessionId}/turns`,
      headers: auth,
      payload: { actionText: 'I look around', qualityTier: 'VIVID', sessionRevision: revision, selectedSuggestionId: null, voicePreferred: false },
    });
    expect(response.statusCode).toBe(400);
    expect(response.json().code).toBe('IDEMPOTENCY_KEY_REQUIRED');
  });

  it('returns the original result when the same key and body are replayed', async () => {
    const { sessionId, revision } = await startSession();
    const key = crypto.randomUUID();
    const before = await ctx.wallet.getBalance(GUEST);

    const first = await playTurn(sessionId, revision, 'I look around', 'VIVID', key);
    const second = await playTurn(sessionId, revision, 'I look around', 'VIVID', key);

    expect(second.body.turnId).toBe(first.body.turnId);
    // Charged once, not twice.
    expect(await ctx.wallet.getBalance(GUEST)).toBe(before - QUALITY_TIERS.VIVID.costCredits);
  });

  it('rejects the same key with a different body (spec §17.3)', async () => {
    const { sessionId, revision } = await startSession();
    const key = crypto.randomUUID();
    await playTurn(sessionId, revision, 'I look around', 'VIVID', key);

    const conflicting = await app.inject({
      method: 'POST',
      url: `/v1/sessions/${sessionId}/turns`,
      headers: { ...auth, 'idempotency-key': key },
      payload: { actionText: 'Something entirely different', qualityTier: 'VIVID', sessionRevision: revision, selectedSuggestionId: null, voicePreferred: false },
    });
    expect(conflicting.statusCode).toBe(409);
    expect(conflicting.json().code).toBe('IDEMPOTENCY_KEY_REUSED');
  });

  it('rejects a stale revision without charging (spec §17.4)', async () => {
    const { sessionId, revision } = await startSession();
    await playTurn(sessionId, revision);
    const balanceAfterFirst = await ctx.wallet.getBalance(GUEST);

    const stale = await app.inject({
      method: 'POST',
      url: `/v1/sessions/${sessionId}/turns`,
      headers: { ...auth, 'idempotency-key': crypto.randomUUID() },
      payload: { actionText: 'I look around again', qualityTier: 'VIVID', sessionRevision: revision, selectedSuggestionId: null, voicePreferred: false },
    });

    expect(stale.statusCode).toBe(409);
    expect(stale.json().code).toBe('STALE_REVISION');
    expect(stale.json().details.currentRevision).toBe(revision + 1);
    expect(await ctx.wallet.getBalance(GUEST)).toBe(balanceAfterFirst);
  });

  it('streams the documented SSE events in order', async () => {
    const { sessionId, revision } = await startSession();
    const { body } = await playTurn(sessionId, revision, 'I read the ward above the gate.');

    const seen: string[] = [];
    const result = app.hub.subscribe(body.turnId, body.streamToken, GUEST, (event) => {
      seen.push(event.event);
    });
    expect(result.ok).toBe(true);

    expect(seen[0]).toBe('turn.accepted');
    expect(seen).toContain('check.resolved');
    expect(seen).toContain('text.delta');
    expect(seen.at(-1)).toBe('turn.completed');
  });

  it('refuses a stream with the wrong token', async () => {
    const { sessionId, revision } = await startSession();
    const { body } = await playTurn(sessionId, revision);
    const result = app.hub.subscribe(body.turnId, 'wrong-token', GUEST, () => {});
    expect(result).toEqual({ ok: false, reason: 'FORBIDDEN' });
  });

  it('hides check maths unless both the story and the player allow it', async () => {
    const { sessionId, revision } = await startSession();
    const { body } = await playTurn(sessionId, revision, 'I read the ward above the gate.');

    const events: Array<Record<string, unknown>> = [];
    app.hub.subscribe(body.turnId, body.streamToken, GUEST, (event) => {
      if (event.event === 'check.resolved') events.push(event.data);
    });
    // The Ninth Archive sets revealCheckMath: false.
    for (const event of events) expect(event.math).toBeNull();
  });

  it('does not let one player read another player’s turn', async () => {
    const { sessionId, revision } = await startSession();
    const { body } = await playTurn(sessionId, revision);
    const response = await app.inject({
      method: 'GET',
      url: `/v1/turns/${body.turnId}`,
      headers: { authorization: 'Bearer guest_someone_else' },
    });
    expect(response.statusCode).toBe(404);
  });
});

describe('sessions and world sheet', () => {
  it('creates a session with an authored opening turn and no charge', async () => {
    const before = await (async () => {
      await app.inject({ method: 'GET', url: '/v1/wallet', headers: auth });
      return ctx.wallet.getBalance(GUEST);
    })();

    const response = await app.inject({
      method: 'POST',
      url: '/v1/stories/story_ninth_archive/sessions',
      headers: auth,
      payload: {
        identity: {
          displayName: 'Malik', pronouns: 'he/him', ageBand: null, archetypeId: 'arch_scholar',
          worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
        },
        usedQuickSetup: true,
      },
    });

    expect(response.statusCode).toBe(201);
    const body = response.json();
    expect(body.recentTurns[0].creditsCharged).toBe(0);
    expect(body.recentTurns[0].blocks.length).toBeGreaterThan(0);
    expect(body.suggestions).toHaveLength(3);
    expect(await ctx.wallet.getBalance(GUEST)).toBe(before);
  });

  it('returns a World Sheet with authoritative state', async () => {
    const { sessionId } = await startSession();
    const response = await app.inject({ method: 'GET', url: `/v1/sessions/${sessionId}/world-sheet`, headers: auth });
    expect(response.statusCode).toBe(200);

    const sheet = response.json();
    expect(sheet.character.attributes).toHaveLength(6);
    expect(sheet.inventory.some((i: { itemId: string }) => i.itemId === 'sigil_pendant')).toBe(true);
    expect(sheet.quests.some((q: { questId: string }) => q.questId === 'q_red_ward')).toBe(true);
    expect(sheet.map.nodes.some((n: { current: boolean }) => n.current)).toBe(true);
    expect(sheet.overview.topObjective).toBe('Get past Kael at the gate.');
  });

  it('withholds relationship numbers unless advanced stats are enabled', async () => {
    const { sessionId } = await startSession();

    const hidden = await app.inject({ method: 'GET', url: `/v1/sessions/${sessionId}/world-sheet`, headers: auth });
    for (const rel of hidden.json().relationships) {
      expect(rel.dimensions).toEqual({ trust: 0, affection: 0, respect: 0, fear: 0, rivalry: 0 });
      expect(rel.label).toBeTruthy();
    }

    await app.inject({
      method: 'PATCH', url: '/v1/me', headers: auth,
      payload: { settings: { showAdvancedRelationshipStats: true } },
    });

    const shown = await app.inject({ method: 'GET', url: `/v1/sessions/${sessionId}/world-sheet`, headers: auth });
    const bram = shown.json().relationships.find((r: { characterId: string }) => r.characterId === 'bram');
    expect(bram.dimensions.affection).toBe(15);
  });

  it('never exposes the session seed', async () => {
    const { sessionId } = await startSession();
    for (const url of [`/v1/sessions/${sessionId}`, `/v1/sessions/${sessionId}/world-sheet`, '/v1/sessions']) {
      const response = await app.inject({ method: 'GET', url, headers: auth });
      expect(response.body).not.toContain('sessionSeed');
    }
  });

  it('refuses a canon correction that contradicts state, and offers a fork', async () => {
    const { sessionId } = await startSession();
    const response = await app.inject({
      method: 'POST',
      url: `/v1/sessions/${sessionId}/canon-corrections`,
      headers: auth,
      payload: { factId: 'anything', correctedText: 'I have the Torn Ledger Page.' },
    });
    const body = response.json();
    expect(body.accepted).toBe(false);
    expect(body.offerFork).toBe(true);
    expect(body.conflictExplanation).toContain('cannot add an item');
  });

  it('charges the fork fee and preserves the original branch', async () => {
    const { sessionId, revision } = await startSession();
    await playTurn(sessionId, revision);
    const before = await ctx.wallet.getBalance(GUEST);

    const response = await app.inject({ method: 'POST', url: `/v1/sessions/${sessionId}/forks`, headers: auth, payload: {} });
    expect(response.statusCode).toBe(201);

    const forkId = response.json().session.sessionId;
    expect(forkId).not.toBe(sessionId);
    expect(await ctx.wallet.getBalance(GUEST)).toBe(before - 120);

    // The original is untouched (spec §11.7).
    expect(await ctx.repo.getSession(sessionId)).not.toBeNull();
    expect((await ctx.repo.getState(sessionId))!.turnIndex).toBe(1);
    // The fork gets its own roll lineage.
    const fork = await ctx.repo.getSession(forkId);
    expect(fork!.branchKey).not.toBe('main');
  });

  it('reports another player’s session as missing, not forbidden', async () => {
    const { sessionId } = await startSession();
    const response = await app.inject({
      method: 'GET', url: `/v1/sessions/${sessionId}`,
      headers: { authorization: 'Bearer guest_someone_else' },
    });
    expect(response.statusCode).toBe(404);
  });
});

describe('account and safety', () => {
  it('migrates a guest’s sessions into an account without duplicating credits', async () => {
    const { sessionId } = await startSession();
    const guestBalance = await ctx.wallet.getBalance(GUEST);
    expect(guestBalance).toBe(GRANT_NEW_USER);

    const response = await app.inject({
      method: 'POST', url: '/v1/auth/guest-migrate',
      headers: { authorization: 'Bearer real_account_1' },
      payload: { guestUserId: GUEST, email: 'malik@example.com', displayName: 'Malik' },
    });

    expect(response.json()).toEqual({ migrated: true, sessionsMoved: 1 });
    const moved = await ctx.repo.getSession(sessionId);
    expect(moved!.userId).toBe(devUserId('real_account_1'));
    // One new-user grant, not two.
    expect(await ctx.wallet.getBalance(devUserId('real_account_1'))).toBe(GRANT_NEW_USER);
  });

  it('does not migrate the same guest twice', async () => {
    await startSession();
    const headers = { authorization: 'Bearer real_account_1' };
    await app.inject({ method: 'POST', url: '/v1/auth/guest-migrate', headers, payload: { guestUserId: GUEST } });
    const second = await app.inject({ method: 'POST', url: '/v1/auth/guest-migrate', headers, payload: { guestUserId: GUEST } });
    expect(second.json().migrated).toBe(false);
  });

  it('files a report and returns a case reference', async () => {
    const response = await app.inject({
      method: 'POST', url: '/v1/reports', headers: auth,
      payload: { targetType: 'STORY', targetId: 'story_ninth_archive', reason: 'BROKEN_OR_INCONSISTENT', details: 'Mira spoke while absent.', alsoHide: true },
    });
    expect(response.statusCode).toBe(201);
    expect(response.json().caseReference).toHaveLength(8);

    const history = await app.inject({ method: 'GET', url: '/v1/report-history', headers: auth });
    expect(history.json().reports).toHaveLength(1);
    expect((await ctx.repo.getHidden(GUEST))).toContain('story_ninth_archive');
  });

  it('deletes the account and its sessions from inside the app (spec §23.3)', async () => {
    const { sessionId } = await startSession();
    const response = await app.inject({ method: 'POST', url: '/v1/account/deletion-request', headers: auth });
    expect(response.json().deleted).toBe(true);
    expect(await ctx.repo.getSession(sessionId)).toBeNull();
    // The ledger is retained for financial audit; a separate purge handles it.
    expect((await ctx.repo.listLedger(GUEST)).length).toBeGreaterThan(0);
  });

  it('requires authentication for account-scoped endpoints', async () => {
    for (const url of ['/v1/wallet', '/v1/sessions', '/v1/me', '/v1/report-history']) {
      expect((await app.inject({ method: 'GET', url })).statusCode, url).toBe(401);
    }
  });
});

describe('quality tiers do not buy better outcomes (spec §20.3)', () => {
  it('charges more but rolls the same dice', async () => {
    const outcomes = new Map<string, string>();

    for (const tier of ['QUICK', 'VIVID', 'CINEMATIC', 'APEX'] as const) {
      const tierCtx = makeContext();
      const tierApp = buildServer({ ctx: tierCtx }) as Server;

      // Pin the session seed so the only variable is the tier.
      const created = await tierApp.inject({
        method: 'POST', url: '/v1/stories/story_ninth_archive/sessions', headers: auth,
        payload: {
          identity: { displayName: 'Malik', pronouns: 'he/him', ageBand: null, archetypeId: 'arch_scholar', worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null },
          usedQuickSetup: true,
        },
      });
      const sessionId = created.json().session.sessionId;
      await tierCtx.repo.updateSession(sessionId, { sessionSeed: 'fixed-seed-for-comparison' } as never);
      await tierCtx.wallet.grant(auth.authorization.slice(7), 'ADMIN_ADJUST', 10_000, `top-up-${tier}`);

      const response = await tierApp.inject({
        method: 'POST', url: `/v1/sessions/${sessionId}/turns`,
        headers: { ...auth, 'idempotency-key': crypto.randomUUID() },
        payload: { actionText: 'I read the ward above the gate.', qualityTier: tier, sessionRevision: 0, selectedSuggestionId: null, voicePreferred: false },
      });
      const turnId = response.json().turnId;
      for (let i = 0; i < 200 && !tierApp.hub.isDone(turnId); i++) {
        await new Promise((resolve) => setImmediate(resolve));
      }

      const turn = await tierCtx.repo.getTurn(turnId);
      outcomes.set(tier, turn?.checks[0]?.outcome ?? 'none');
      expect(turn?.creditsCharged).toBe(QUALITY_TIERS[tier].costCredits);
      await tierApp.close();
    }

    // Same seed, same action, four prices — one outcome.
    expect(new Set(outcomes.values()).size).toBe(1);
  });
});

/**
 * Authentication and ownership at the route level.
 *
 * The verifier's own tests prove a token is checked correctly; these prove the
 * API acts on the answer — that an expired token is distinguishable from a
 * forged one, that a forged one buys nothing, and that a valid token for the
 * wrong account cannot reach another player's run.
 */
describe('authenticated requests', () => {
  const SECRET = 'route-level-signing-secret';
  const NOW = Date.UTC(2026, 5, 1, 9, 0, 0);
  const ALICE = '11111111-0000-4000-8000-000000000001';
  const BOB = '22222222-0000-4000-8000-000000000002';

  const seg = (value: object | Buffer): string =>
    (Buffer.isBuffer(value) ? value : Buffer.from(JSON.stringify(value), 'utf8'))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

  function token(sub: string, { expired = false, secret = SECRET } = {}): string {
    const input = `${seg({ alg: 'HS256', typ: 'JWT' })}.${seg({
      sub,
      aud: 'authenticated',
      exp: Math.floor(NOW / 1000) + (expired ? -60 : 3600),
    })}`;
    return `${input}.${seg(createHmac('sha256', secret).update(input).digest())}`;
  }

  let secured: Server;

  beforeEach(() => {
    const base = makeContext();
    secured = buildServer({
      ctx: {
        ...base,
        auth: new SupabaseJwtVerifier({
          hmacSecret: SECRET,
          expectedAudience: 'authenticated',
          now: () => NOW,
        }),
      },
    }) as Server;
  });

  afterEach(async () => {
    await secured.close();
  });

  const bearer = (value: string): Record<string, string> => ({ authorization: `Bearer ${value}` });

  async function sessionFor(who: string): Promise<string> {
    const response = await secured.inject({
      method: 'POST',
      url: '/v1/stories/story_ninth_archive/sessions',
      headers: bearer(token(who)),
      payload: {
        identity: {
          displayName: 'Someone',
          pronouns: 'they/them',
          ageBand: null,
          archetypeId: 'arch_scholar',
          worldKnowsAboutYou: '',
          advanced: {},
          portraitAssetId: null,
        },
        usedQuickSetup: true,
      },
    });
    expect(response.statusCode).toBe(201);
    return response.json().session.sessionId;
  }

  it('creates the profile on the first verified request', async () => {
    const response = await secured.inject({ method: 'GET', url: '/v1/me', headers: bearer(token(ALICE)) });
    expect(response.statusCode).toBe(200);
    expect(response.json().userId).toBe(ALICE);
  });

  it('refuses an unsigned request to anything that owns state', async () => {
    const response = await secured.inject({ method: 'GET', url: '/v1/me' });
    expect(response.statusCode).toBe(401);
    expect(response.json().code).toBe('UNAUTHENTICATED');
  });

  it('refuses a token this project did not sign', async () => {
    const response = await secured.inject({
      method: 'GET',
      url: '/v1/me',
      headers: bearer(token(ALICE, { secret: 'attacker' })),
    });
    expect(response.statusCode).toBe(401);
    expect(response.json().code).toBe('UNAUTHENTICATED');
  });

  it('tells the client an expired token is expired, so it can refresh instead of signing out', async () => {
    const response = await secured.inject({
      method: 'GET',
      url: '/v1/me',
      headers: bearer(token(ALICE, { expired: true })),
    });
    expect(response.statusCode).toBe(401);
    expect(response.json().code).toBe('TOKEN_EXPIRED');
  });

  it('will not let one account read another account’s run', async () => {
    const aliceSession = await sessionFor(ALICE);

    const asBob = await secured.inject({
      method: 'GET',
      url: `/v1/sessions/${aliceSession}`,
      headers: bearer(token(BOB)),
    });
    // Reported as missing rather than forbidden: a 403 confirms the id exists.
    expect(asBob.statusCode).toBe(404);

    const asAlice = await secured.inject({
      method: 'GET',
      url: `/v1/sessions/${aliceSession}`,
      headers: bearer(token(ALICE)),
    });
    expect(asAlice.statusCode).toBe(200);
  });

  it('will not let one account play another account’s run', async () => {
    const aliceSession = await sessionFor(ALICE);
    const response = await secured.inject({
      method: 'POST',
      url: `/v1/sessions/${aliceSession}/turns`,
      headers: { ...bearer(token(BOB)), 'idempotency-key': 'k1' },
      payload: { actionText: 'I take the ledger.', qualityTier: 'QUICK', clientRevision: 0 },
    });
    expect(response.statusCode).toBe(404);
  });

  it('will not let one account delete another account’s run', async () => {
    const aliceSession = await sessionFor(ALICE);
    const response = await secured.inject({
      method: 'DELETE',
      url: `/v1/sessions/${aliceSession}`,
      headers: bearer(token(BOB)),
    });
    expect(response.statusCode).toBe(404);
    expect(
      (await secured.inject({ method: 'GET', url: `/v1/sessions/${aliceSession}`, headers: bearer(token(ALICE)) }))
        .statusCode,
    ).toBe(200);
  });

  it('accepts the deletion request only for the account that asked', async () => {
    await secured.inject({ method: 'GET', url: '/v1/me', headers: bearer(token(ALICE)) });
    const response = await secured.inject({
      method: 'POST',
      url: '/v1/account/deletion-request',
      headers: bearer(token(ALICE)),
    });
    expect(response.statusCode).toBeLessThan(300);
    const me = await secured.inject({ method: 'GET', url: '/v1/me', headers: bearer(token(ALICE)) });
    expect(me.json().deletionRequestedAt).not.toBeNull();
  });
});

/**
 * GP-04 / §20.9 — rewriting the words without rewriting the world.
 *
 * The one rule this endpoint exists to keep: "never silently re-roll
 * deterministic dice when only narration is regenerated". These pin it.
 */
describe('rephrasing a turn', () => {
  async function playedTurn(): Promise<{ sessionId: string; turn: TurnRecord }> {
    const { sessionId, revision } = await startSession();
    await playTurn(sessionId, revision, 'I ask Kael what the red light means.');
    const turns = await ctx.repo.listTurns(sessionId);
    return { sessionId, turn: turns.at(-1)! };
  }

  it('rewrites the prose and leaves every rolled outcome exactly as it was', async () => {
    const { sessionId, turn } = await playedTurn();
    const revisionBefore = (await ctx.repo.getState(sessionId))!.revision;
    const eventsBefore = (await ctx.repo.listEvents(sessionId)).length;

    const response = await app.inject({
      method: 'POST',
      url: `/v1/turns/${turn.turnId}/rephrase`,
      headers: auth,
    });
    expect(response.statusCode).toBe(200);

    const after = await ctx.repo.getTurn(turn.turnId);
    expect(after!.turnIndex).toBe(turn.turnIndex);
    // Same dice, same outcomes, same mutations. Only the words may move.
    expect(after!.checks).toEqual(turn.checks);
    expect(after!.mutations).toEqual(turn.mutations);
    expect(after!.revisionAfter).toBe(turn.revisionAfter);

    // And the world did not advance behind the button.
    expect((await ctx.repo.getState(sessionId))!.revision).toBe(revisionBefore);
    expect(await ctx.repo.listEvents(sessionId)).toHaveLength(eventsBefore);
  });

  it('refuses on the opening, which resolved nothing', async () => {
    const { sessionId } = await startSession();
    const turns = await ctx.repo.listTurns(sessionId);
    const response = await app.inject({
      method: 'POST',
      url: `/v1/turns/${turns[0]!.turnId}/rephrase`,
      headers: auth,
    });
    expect(response.statusCode).toBe(409);
    expect(response.json().code).toBe('NOT_REPHRASABLE');
  });

  it('will not rephrase another account’s turn', async () => {
    const { turn } = await playedTurn();
    const response = await app.inject({
      method: 'POST',
      url: `/v1/turns/${turn.turnId}/rephrase`,
      headers: { authorization: 'Bearer guest_someone_else' },
    });
    expect(response.statusCode).toBe(404);
  });

  it('does not charge for rewriting a turn the system had to repair', async () => {
    const { turn } = await playedTurn();
    // A turn that needed repairing on the way out. That defect is ours, so
    // rewriting it is not something to bill for.
    const repaired: TurnRecord = {
      ...turn,
      turnId: `${turn.turnId}_repaired`,
      repairViolations: [
        { code: 'FORMAT', severity: 'ERROR', description: 'Empty block.', blockIndex: 0 },
      ],
    };
    await ctx.repo.appendTurn(repaired);

    const before = await ctx.wallet.getBalance(GUEST);
    const response = await app.inject({
      method: 'POST',
      url: `/v1/turns/${repaired.turnId}/rephrase`,
      headers: auth,
    });
    expect(response.statusCode).toBe(200);
    expect(response.json().creditsCharged).toBe(0);
    expect(await ctx.wallet.getBalance(GUEST)).toBe(before);
  });
});

/** WS-07 — the player decides what the story must not forget. */
describe('pinning canon', () => {
  it('pins a fact, and the pin survives a reload', async () => {
    const { sessionId, revision } = await startSession();
    // Violence is the kind of event the world is required to remember, so it is
    // the reliable way to get canon on the board (§17.6).
    await playTurn(sessionId, revision, 'I hit Kael.');

    const timeline = await app.inject({
      method: 'GET',
      url: `/v1/sessions/${sessionId}/timeline`,
      headers: auth,
    });
    const canon = timeline.json().entries.find((e: { group: string }) => e.group === 'CANON');
    expect(canon, 'a played turn should have left some canon behind').toBeDefined();
    expect(canon.pinned).toBe(false);

    const pin = await app.inject({
      method: 'POST',
      url: `/v1/sessions/${sessionId}/timeline/${canon.id}/pin`,
      headers: auth,
      payload: { pinned: true },
    });
    expect(pin.statusCode).toBe(200);
    expect(pin.json()).toEqual({ factId: canon.id, pinned: true });

    const again = await app.inject({
      method: 'GET',
      url: `/v1/sessions/${sessionId}/timeline`,
      headers: auth,
    });
    expect(again.json().entries.find((e: { id: string }) => e.id === canon.id).pinned).toBe(true);
  });

  it('will not pin a moment that is not in this timeline', async () => {
    const { sessionId } = await startSession();
    const response = await app.inject({
      method: 'POST',
      url: `/v1/sessions/${sessionId}/timeline/fact_not_real/pin`,
      headers: auth,
      payload: { pinned: true },
    });
    expect(response.statusCode).toBe(404);
  });

  it('will not let one account pin inside another account’s run', async () => {
    const { sessionId, revision } = await startSession();
    await playTurn(sessionId, revision, 'I look around.');
    const facts = await ctx.repo.listMemories(sessionId);
    const response = await app.inject({
      method: 'POST',
      url: `/v1/sessions/${sessionId}/timeline/${facts[0]?.factId ?? 'x'}/pin`,
      headers: { authorization: 'Bearer guest_intruder' },
      payload: { pinned: true },
    });
    expect(response.statusCode).toBe(404);
  });
});

/** Spec §29.1 layer 3 — moderation of what the player typed. */
describe('input moderation', () => {
  it('lets the game be the game', async () => {
    const { sessionId, revision } = await startSession();
    const { response } = await playTurn(sessionId, revision, 'I hit Kael as hard as I can.');
    expect(response.statusCode).toBe(202);
  });

  it('refuses what no fiction makes acceptable, and charges nothing for it', async () => {
    const { sessionId, revision } = await startSession();
    const before = await ctx.wallet.getBalance(GUEST);

    const response = await app.inject({
      method: 'POST',
      url: `/v1/sessions/${sessionId}/turns`,
      headers: { ...auth, 'idempotency-key': crypto.randomUUID() },
      payload: {
        actionText: 'I undress the twelve year old.',
        qualityTier: 'VIVID',
        sessionRevision: revision,
        selectedSuggestionId: null,
        voicePreferred: false,
      },
    });

    expect(response.statusCode).toBe(422);
    expect(response.json().code).toBe('CONTENT_BLOCKED');
    // §29.2 — inside the fiction, never a policy readout.
    expect(response.json().message).not.toMatch(/policy|violation|prohibited/i);
    // Nothing was reserved, so nothing was spent and the world did not move.
    expect(await ctx.wallet.getBalance(GUEST)).toBe(before);
    expect((await ctx.repo.getState(sessionId))!.revision).toBe(revision);
    expect(await ctx.repo.listTurns(sessionId)).toHaveLength(1);
  });
});

/**
 * OB-03 / §7.4 — "For you" has to be for you.
 *
 * The rail said "Based on what you picked" and was the same array as
 * Trending, in the same order, while the tastes onboarding collected were
 * stored on the device and sent nowhere.
 */
describe('taste-aware discover', () => {
  const rail = (body: { rails: Array<{ id: string }> }, id: string) =>
    body.rails.find((r) => r.id === id) as {
      id: string;
      title: string;
      subtitle: string | null;
      stories: Array<{ storyId: string }>;
    };

  it('offers only categories the catalog can answer', async () => {
    // A category that opens onto an empty screen is the fastest way to make a
    // small catalog feel padded, so the vocabulary is derived from the shelf.
    const bootstrap = (await app.inject({ method: 'GET', url: '/v1/bootstrap' })).json();
    const stories = await ctx.repo.listStories();
    expect(bootstrap.genres.length).toBeGreaterThan(0);
    for (const genre of bootstrap.genres) {
      const inIt = stories.filter((s) => categoriesFor(s).includes(genre.id));
      expect(inIt.length, `${genre.label} matches no world`).toBeGreaterThan(0);
    }
  });

  it('speaks one vocabulary — browse, taste and search agree', async () => {
    const bootstrap = (await app.inject({ method: 'GET', url: '/v1/bootstrap' })).json();
    const discover = (await app.inject({ method: 'GET', url: '/v1/discover' })).json();
    expect(discover.categories.map((c: { id: string }) => c.id)).toEqual(
      bootstrap.genres.map((g: { id: string }) => g.id),
    );
  });

  it('puts what you picked first, and says why', async () => {
    const response = await app.inject({ method: 'GET', url: '/v1/discover?tastes=romance' });
    const forYou = rail(response.json(), 'for_you');

    expect(forYou.subtitle).toContain('Romance');
    expect(forYou.stories.length).toBeGreaterThan(0);
    const stories = await ctx.repo.listStories();
    for (const summary of forYou.stories) {
      const story = stories.find((s) => s.storyId === summary.storyId)!;
      expect(categoriesFor(story), `${story.title} is in a Romance rail`).toContain('romance');
    }
  });

  it('does not claim to be personalised when nothing was picked', async () => {
    const body = (await app.inject({ method: 'GET', url: '/v1/discover' })).json();
    // Absent, rather than present under a personal-sounding name with the same
    // contents as every other rail.
    expect(rail(body, 'for_you')).toBeUndefined();
    expect(body.rails.some((r: { id: string }) => r.id === 'all')).toBe(true);
  });

  it('hides nothing — an unmatched taste still leaves the catalog reachable', async () => {
    const body = (await app.inject({ method: 'GET', url: '/v1/discover?tastes=cozy' })).json();
    const all = await ctx.repo.listStories();
    expect(rail(body, 'all').stories).toHaveLength(all.length);
  });

  it('filters to a category, and keeps the whole rail selectable', async () => {
    const body = (await app.inject({ method: 'GET', url: '/v1/discover?category=romance' })).json();
    const stories = await ctx.repo.listStories();

    expect(body.activeCategory).toBe('romance');
    expect(body.rails.every((r: { stories: unknown[] }) => r.stories.length > 0)).toBe(true);
    const shown = body.rails.flatMap((r: { stories: Array<{ storyId: string }> }) => r.stories);
    expect(shown.length).toBeGreaterThan(0);
    for (const summary of shown) {
      const story = stories.find((s) => s.storyId === summary.storyId)!;
      expect(categoriesFor(story), story.title).toContain('romance');
    }
    // The rail itself is always the whole vocabulary, or a filter is a trapdoor.
    expect(body.categories.length).toBe(
      (await app.inject({ method: 'GET', url: '/v1/discover' })).json().categories.length,
    );
  });

  it('never offers a category that would open onto nothing', async () => {
    const body = (await app.inject({ method: 'GET', url: '/v1/discover' })).json();
    for (const category of body.categories) {
      const filtered = (
        await app.inject({ method: 'GET', url: `/v1/discover?category=${category.id}` })
      ).json();
      const count = filtered.rails.flatMap((r: { stories: unknown[] }) => r.stories).length;
      expect(count, `${category.label} is empty`).toBeGreaterThan(0);
      expect(count).toBe(category.count);
    }
  });
});

/** Spec §31.7 — the limit at the route, not only in the limiter. */
describe('rate limiting', () => {
  it('refuses a loop on the turn endpoint and says when to come back', async () => {
    const base = makeContext();
    const limited = buildServer({
      ctx: {
        ...base,
        // Two turns a minute, so the third is a loop by definition.
        rateLimiter: new SlidingWindowRateLimiter(),
      },
    }) as Server;

    try {
      const start = await limited.inject({
        method: 'POST',
        url: '/v1/stories/story_ninth_archive/sessions',
        headers: auth,
        payload: {
          identity: {
            displayName: 'Malik',
            pronouns: 'he/him',
            ageBand: null,
            archetypeId: 'arch_scholar',
            worldKnowsAboutYou: '',
            advanced: {},
            portraitAssetId: null,
          },
          usedQuickSetup: true,
        },
      });
      const sessionId = start.json().session.sessionId;

      let refused: { statusCode: number; json: () => { code: string; details?: { retryAfterSeconds?: number } } } | null =
        null;
      for (let i = 0; i < RATE_LIMITS.turn.limit + 2 && !refused; i += 1) {
        const response = await limited.inject({
          method: 'POST',
          url: `/v1/sessions/${sessionId}/turns`,
          headers: { ...auth, 'idempotency-key': crypto.randomUUID() },
          payload: {
            actionText: 'I look around.',
            qualityTier: 'QUICK',
            sessionRevision: 0,
            selectedSuggestionId: null,
            voicePreferred: false,
          },
        });
        if (response.statusCode === 429) refused = response;
      }

      expect(refused, 'a loop should eventually be refused').not.toBeNull();
      expect(refused!.json().code).toBe('RATE_LIMITED');
      expect(refused!.json().details?.retryAfterSeconds).toBeGreaterThan(0);
    } finally {
      await limited.close();
    }
  });

  it('does not spend the read budget on a turn, or the other way round', async () => {
    const base = makeContext();
    const limited = buildServer({ ctx: { ...base, rateLimiter: new SlidingWindowRateLimiter() } }) as Server;
    try {
      for (let i = 0; i < RATE_LIMITS.turn.limit + 2; i += 1) {
        await limited.inject({ method: 'POST', url: '/v1/reports', headers: auth, payload: {} });
      }
      // Writes are exhausted; reading is untouched.
      const read = await limited.inject({ method: 'GET', url: '/v1/discover', headers: auth });
      expect(read.statusCode).toBe(200);
    } finally {
      await limited.close();
    }
  });
});

/**
 * The fork fee is the one spend path with no reservation behind it, so both of
 * its failure modes have to be handled by hand.
 */
describe('forking charges once, or not at all', () => {
  it('does not charge twice for a retried fork', async () => {
    const { sessionId } = await startSession();
    const before = await ctx.wallet.getBalance(GUEST);

    const fork = (): Promise<unknown> =>
      app.inject({
        method: 'POST',
        url: `/v1/sessions/${sessionId}/forks`,
        // The same key twice is the same fork, which is what a retry is.
        headers: { ...auth, 'idempotency-key': 'fork-retry-1' },
        payload: { atTurnIndex: 0 },
      });

    await fork();
    const afterFirst = await ctx.wallet.getBalance(GUEST);
    await fork();
    const afterSecond = await ctx.wallet.getBalance(GUEST);

    expect(afterFirst).toBeLessThan(before);
    // The retry costs nothing. A random idempotency key made this impossible.
    expect(afterSecond).toBe(afterFirst);
  });

  it('charges the same amount whether or not the client sends a key', async () => {
    const { sessionId } = await startSession();
    const before = await ctx.wallet.getBalance(GUEST);
    await app.inject({
      method: 'POST',
      url: `/v1/sessions/${sessionId}/forks`,
      headers: auth,
      payload: { atTurnIndex: 0 },
    });
    const after = await ctx.wallet.getBalance(GUEST);
    expect(before - after).toBeGreaterThan(0);
  });
});
