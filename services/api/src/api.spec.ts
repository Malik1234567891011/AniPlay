import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { GRANT_DAILY, GRANT_NEW_USER, QUALITY_TIERS } from '@aniplay/contracts';
import { createDefaultPipeline } from '@aniplay/director';
import { buildServer } from './server.js';
import { createAppContext, loadConfig } from './context.js';
import { MemoryRepository } from './repo/memory.js';
import { WalletService } from './wallet.js';
import type { AppContext } from './context.js';
import type { TurnStreamHub } from './stream.js';

type Server = FastifyInstance & { ctx: AppContext; hub: TurnStreamHub };

let app: Server;
let ctx: AppContext;
const GUEST = 'guest_test_user';
const auth = { authorization: `Bearer ${GUEST}` };

function makeContext(now: () => Date = () => new Date()): AppContext {
  const repo = new MemoryRepository();
  return {
    config: loadConfig({ PORT: '4000' } as NodeJS.ProcessEnv),
    repo,
    wallet: new WalletService(repo, now),
    // Pinned to the rule-based pipeline so tests never depend on a provider key.
    pipeline: createDefaultPipeline(),
    modelProvider: null,
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
    for (const member of detail.json().cast) {
      expect(Object.keys(member)).toEqual(['id', 'name', 'role', 'portrait', 'publicTraits']);
    }
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
      settings: { showAdvancedRelationshipStats: false, showCheckMath: false, reduceMotion: false, voiceAutoplay: false, hapticsEnabled: true, defaultQualityTier: 'VIVID', contentFilters: [] },
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
    const payload = { productId: 'crd_10000', storeTransactionId: 'txn_abc', platform: 'SANDBOX', receipt: null };

    const first = await app.inject({ method: 'POST', url: '/v1/store/purchases/sync', headers: auth, payload });
    expect(first.json().credited).toBe(10_300);
    expect(first.json().duplicate).toBe(false);

    const replay = await app.inject({ method: 'POST', url: '/v1/store/purchases/sync', headers: auth, payload });
    expect(replay.json().duplicate).toBe(true);
    expect(replay.json().credited).toBe(0);

    expect(await ctx.wallet.getBalance(GUEST)).toBe(before + 10_300);
  });
});

describe('turns (spec §17.3, §17.4)', () => {
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
    expect(moved!.userId).toBe('real_account_1');
    // One new-user grant, not two.
    expect(await ctx.wallet.getBalance('real_account_1')).toBe(GRANT_NEW_USER);
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
