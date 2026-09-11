import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { GameState } from '@aniplay/contracts';
import { createInitialState, forkState } from '@aniplay/engine';
import { createDefaultPipeline, RuleBasedModerator } from '@aniplay/director';
import { JobQueue } from '@aniplay/worker';
import { buildServer } from './server.js';
import { loadConfig } from './context.js';
import { MemoryRepository } from './repo/memory.js';
import { WalletService } from './wallet.js';
import { DevTokenVerifier, devUserId } from './auth.js';
import { createStoreVerifierFromEnv } from './store-verifier.js';
import type { AppContext } from './context.js';
import type { TurnStreamHub } from './stream.js';

/**
 * Step 2's gate: **an `fr` session round-trips through the API and the
 * database**, and — the half that matters more — an English session is exactly
 * what it was before the locale existed.
 */

type Server = FastifyInstance & { ctx: AppContext; hub: TurnStreamHub };

let app: Server;
let ctx: AppContext;
const TOKEN = 'guest_locale_user';
const auth = { authorization: `Bearer ${TOKEN}` };

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

const IDENTITY = {
  displayName: 'Élodie',
  pronouns: 'elle',
  ageBand: null,
  archetypeId: 'arch_scholar',
  worldKnowsAboutYou: 'Arrivée en retard.',
  advanced: {},
  portraitAssetId: null,
};

async function startSession(payload: Record<string, unknown> = {}): Promise<Record<string, any>> {
  const response = await app.inject({
    method: 'POST',
    url: '/v1/stories/story_ninth_archive/sessions',
    headers: auth,
    payload: { identity: IDENTITY, usedQuickSetup: true, ...payload },
  });
  return { status: response.statusCode, ...response.json() };
}

describe('a French session round-trips', () => {
  it('freezes the requested locale into the state and gives it back', async () => {
    const created = await startSession({ locale: 'fr' });
    expect(created.session.locale).toBe('fr');

    // Through the database: the state is read back from the snapshot store,
    // not from anything the request left in memory.
    const stored = await ctx.repo.getState(created.session.sessionId);
    expect(stored?.locale).toBe('fr');

    // And back out through a second, independent request.
    const fetched = await app.inject({
      method: 'GET',
      url: `/v1/sessions/${created.session.sessionId}`,
      headers: auth,
    });
    expect(fetched.json().session.locale).toBe('fr');

    const listed = await app.inject({ method: 'GET', url: '/v1/sessions', headers: auth });
    expect(listed.json().sessions[0].locale).toBe('fr');
  });

  it('keeps the two languages apart in one library', async () => {
    const french = await startSession({ locale: 'fr' });
    const english = await startSession({ locale: 'en' });

    const listed = await app.inject({ method: 'GET', url: '/v1/sessions', headers: auth });
    const byId = new Map<string, string>(
      listed.json().sessions.map((s: { sessionId: string; locale: string }) => [s.sessionId, s.locale]),
    );
    expect(byId.get(french.session.sessionId)).toBe('fr');
    expect(byId.get(english.session.sessionId)).toBe('en');
  });

  it('carries the locale into a fork, because a fork is the same run', async () => {
    const french = await startSession({ locale: 'fr' });
    const state = await ctx.repo.getState(french.session.sessionId);
    expect(state).not.toBeNull();
    expect(forkState(state!, 'sess_forked').locale).toBe('fr');
  });
});

describe('English is untouched', () => {
  it('defaults to English when nothing asks for anything', async () => {
    const created = await startSession();
    expect(created.session.locale).toBe('en');
    expect((await ctx.repo.getState(created.session.sessionId))?.locale).toBe('en');
  });

  it('does not follow a French device while the autodetect flag is off', async () => {
    // The whole point of `DEVICE_LOCALE_AUTODETECT`: the plumbing works, and
    // it stays off until there is French copy behind it. A French phone must
    // not be handed a half-built app on the strength of its OS settings.
    const response = await app.inject({
      method: 'POST',
      url: '/v1/stories/story_ninth_archive/sessions',
      headers: { ...auth, 'accept-language': 'fr-FR,fr;q=0.9' },
      payload: { identity: IDENTITY, usedQuickSetup: true },
    });
    expect(response.json().session.locale).toBe('en');
  });

  it('still honours an explicit French request from that same device', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/v1/stories/story_ninth_archive/sessions',
      headers: { ...auth, 'accept-language': 'fr-FR,fr;q=0.9' },
      payload: { identity: IDENTITY, usedQuickSetup: true, locale: 'fr' },
    });
    expect(response.json().session.locale).toBe('fr');
  });

  it('rejects a locale nobody has written a bible for', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/v1/stories/story_ninth_archive/sessions',
      headers: auth,
      payload: { identity: IDENTITY, usedQuickSetup: true, locale: 'de' },
    });
    expect(response.statusCode).toBe(400);
  });
});

describe('the locale is frozen, not tracked', () => {
  it('survives a state that was written before the field existed', async () => {
    // Every snapshot already in the database predates this field. They must
    // load as English and behave exactly as they did.
    const story = await ctx.repo.getStoryByStoryId('story_ninth_archive');
    expect(story).not.toBeNull();
    const legacy = createInitialState({
      sessionId: 'sess_legacy',
      story: story!,
      identity: { ...IDENTITY, archetypeId: null },
      locale: 'fr',
    });
    const { locale: _dropped, ...withoutLocale } = legacy;
    expect(GameState.parse(withoutLocale).locale).toBe('en');
  });

  it('is written in exactly one place', async () => {
    // A grep-shaped assertion, deliberately. `createInitialState` is the only
    // site allowed to set a run's locale. If a second one appears, a run can
    // change language mid-transcript — and by then the memory facts and the
    // authored canon corrections are already in the other language, which is
    // not recoverable.
    const { readdir, readFile } = await import('node:fs/promises');
    const root = new URL('../../../', import.meta.url);
    const offenders: string[] = [];

    for (const area of ['packages', 'services']) {
      const areaUrl = new URL(`${area}/`, root);
      for (const pkg of await readdir(areaUrl, { withFileTypes: true })) {
        if (!pkg.isDirectory()) continue;
        const srcUrl = new URL(`${pkg.name}/src/`, areaUrl);
        let entries: string[];
        try {
          entries = await readdir(srcUrl, { recursive: true });
        } catch {
          continue;
        }
        for (const entry of entries) {
          if (!entry.endsWith('.ts') || entry.includes('.spec.')) continue;
          const source = await readFile(new URL(entry, srcUrl), 'utf8');
          // An assignment to `.locale` on anything state-shaped.
          if (/\b(state|forked|next|snapshot|draft)\.locale\s*=[^=]/.test(source)) {
            offenders.push(`${area}/${pkg.name}/src/${entry}`);
          }
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
