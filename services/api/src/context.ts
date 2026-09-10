import type { FastifyReply, FastifyRequest } from 'fastify';
import { CONTRACT_VERSION } from '@aniplay/contracts';
import type { ModelGateway } from '@aniplay/director';
import { createGatewayFromEnv, createModerator, ModelDirector, ModelIntentParser, ModelWriter, createDefaultPipeline, type Moderator, type TurnPipelineDeps } from '@aniplay/director';
import { createMediaGatewayFromEnv } from '@aniplay/director';
import { JobQueue, registerHandlers } from '@aniplay/worker';
import { MemoryRepository } from './repo/memory.js';
import { PostgresRepository } from './repo/postgres.js';
import { createTokenVerifierFromEnv, type TokenVerifier, type VerifiedToken } from './auth.js';
import { SlidingWindowRateLimiter, type RateLimiter } from './rate-limit.js';
import { createStoreVerifierFromEnv, type StoreVerifier } from './store-verifier.js';
import type { Repository, UserRecord } from './repo/types.js';
import { WalletService } from './wallet.js';

/**
 * Application wiring. One place decides which repository, model gateway, and
 * pipeline the routes get, so tests can substitute any of them.
 */

export interface AppConfig {
  readonly port: number;
  readonly host: string;
  readonly environment: 'dev' | 'staging' | 'production';
  readonly baseUrl: string;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const port = Number(env.PORT ?? 4000);
  const host = env.HOST ?? '0.0.0.0';
  const environment = (env.NODE_ENV === 'production'
    ? 'production'
    : env.NODE_ENV === 'staging'
      ? 'staging'
      : 'dev') as AppConfig['environment'];
  const baseUrl = env.PUBLIC_BASE_URL ?? `http://localhost:${port}`;

  // Generated art is served by this process in development. Setting
  // MEDIA_CDN_BASE_URL points the same asset keys at a real CDN in production.
  if (!env.MEDIA_CDN_BASE_URL) process.env.MEDIA_CDN_BASE_URL = `${baseUrl}/media`;

  return { port, host, environment, baseUrl };
}

/**
 * Refuses to start a production process that is still wearing its development
 * clothes.
 *
 * `readAuth` below treats the bearer token as the user id, which is fine for
 * local work and catastrophic in front of real users: anyone could send another
 * account's id and become them. It is the kind of thing that ships by accident
 * exactly once, so production has to name a real auth provider or not boot.
 */
export function assertProductionReady(
  config: AppConfig,
  env: NodeJS.ProcessEnv = process.env,
): void {
  if (config.environment !== 'production') return;

  const missing: string[] = [];
  if (!env.SUPABASE_JWT_SECRET && !env.AUTH_JWKS_URL) {
    missing.push('SUPABASE_JWT_SECRET or AUTH_JWKS_URL (bearer tokens are unverified without one)');
  }
  if (!env.DATABASE_URL) {
    missing.push('DATABASE_URL (the in-memory repository loses every session on restart)');
  }

  if (missing.length > 0) {
    throw new Error(
      `Refusing to start in production without:\n  - ${missing.join('\n  - ')}`,
    );
  }
}

export interface AppContext {
  /** Spec §9.4 — used once per session, at character creation. */
  readonly modelGateway: ModelGateway | null;
  readonly config: AppConfig;
  readonly repo: Repository;
  readonly wallet: WalletService;
  readonly pipeline: TurnPipelineDeps;
  /** Null when no provider key is configured; the rule-based path then runs. */
  readonly modelProvider: string | null;
  /**
   * Spec §17.8 — media is enqueued, never awaited. An image must not stop a
   * player from reading a finished turn or composing the next one.
   */
  readonly jobs: JobQueue;
  /**
   * Spec §33.5 — decides whether a claimed purchase really happened. The route
   * credits nothing this has not approved, so a client cannot mint credits by
   * posting a transaction id it made up.
   */
  readonly storeVerifier: StoreVerifier;
  /**
   * Decides whether a bearer token is real and whose it is. Supabase Auth in
   * production; a token-is-the-user-id stub locally, which cannot be selected
   * in production (§6.4).
   */
  readonly auth: TokenVerifier;
  /**
   * Spec §29.1 layer 3 — runs on what the player typed, before anything is
   * reserved or generated, so a blocked turn costs nothing.
   */
  readonly moderator: Moderator;
  /**
   * Spec §31.7 — rate limits by user, device and IP. The turn endpoint spends
   * money on every call, so this is a cost control before it is anything else.
   */
  readonly rateLimiter: RateLimiter;
}

/**
 * Postgres when DATABASE_URL names one, the in-process store otherwise.
 *
 * The in-process store is a legitimate mode — it is what makes `npm run api`
 * work with no infrastructure, and what the unit tests run against — but it
 * loses every session when the process exits, so production is not allowed to
 * reach it (`assertProductionReady`).
 */
export function createRepositoryFromEnv(env: NodeJS.ProcessEnv = process.env): Repository {
  const url = env.DATABASE_URL;
  if (!url) return new MemoryRepository();
  return new PostgresRepository({
    connectionString: url,
    ssl: /supabase|amazonaws|render|neon/.test(url),
    maxConnections: Number(env.DATABASE_POOL_MAX ?? 10),
  });
}

/**
 * The last few times a model stage gave up. Read by /health, so "why has the
 * writing gone flat" has an answer that is not a guess.
 */
const degradations: Array<{ role: string; code: string; at: string }> = [];

export function recentDegradations(): ReadonlyArray<{ role: string; code: string; at: string }> {
  return degradations;
}

export function createAppContext(overrides: Partial<AppContext> = {}): AppContext {
  const config = overrides.config ?? loadConfig();
  const repo = overrides.repo ?? createRepositoryFromEnv();
  const wallet = overrides.wallet ?? new WalletService(repo);

  // Spec §31.4 — the gateway is selected by environment. With no key the
  // rule-based pipeline runs, which is a supported mode, not a broken one.
  // A stage that gives up and falls back to the deterministic pipeline is a
  // supported mode, and it must never be a quiet one: the player gets the plain
  // prose and every log line still says 200.
  const gateway = createGatewayFromEnv(process.env, {
    onDegraded: (role, error) => {
      degradations.push({ role, code: error.code, at: new Date().toISOString() });
      if (degradations.length > 50) degradations.shift();
      console.warn(
        `[model] ${role} degraded to the rule-based path after retries: ${error.code} — ${error.message}`,
      );
    },
  });
  const pipeline =
    overrides.pipeline ??
    (gateway
      ? {
          parser: new ModelIntentParser(gateway),
          director: new ModelDirector(gateway),
          writer: new ModelWriter(gateway),
        }
      : createDefaultPipeline());

  const jobs = overrides.jobs ?? new JobQueue();
  if (!overrides.jobs) {
    const media = createMediaGatewayFromEnv();
    registerHandlers(jobs, {
      media,
      getStory: (storyVersionId) => repo.getStoryVersion(storyVersionId),
      attachAsset: async ({ turnId, url }) => {
        const turn = await repo.getTurn(turnId);
        // The turn is already authoritative; the image only decorates it.
        if (turn) await repo.attachHeroImage(turnId, url);
      },
      baseUrl: config.baseUrl,
    });
  }

  return {
    config,
    repo,
    wallet,
    pipeline,
    modelProvider: overrides.modelProvider ?? gateway?.name ?? null,
    // Exposed so the one non-turn place that needs a model — reading a
    // background the player wrote, once, at character creation — can reach it
    // without another factory. Spec §9.4.
    modelGateway: gateway ?? null,
    jobs,
    storeVerifier: overrides.storeVerifier ?? createStoreVerifierFromEnv(config),
    auth: overrides.auth ?? createTokenVerifierFromEnv(config),
    moderator: overrides.moderator ?? createModerator(gateway),
    rateLimiter: overrides.rateLimiter ?? new SlidingWindowRateLimiter(),
  };
}

// --- Auth ------------------------------------------------------------------

/**
 * Spec §6.3 — browsing, story detail, and one guest session work before any
 * account exists. A guest identity is a bearer token the client keeps; signing
 * in migrates that guest's sessions into the real account (§6.5).
 *
 * This is a development-grade token scheme: the production build swaps it for
 * Supabase Auth behind the same `requireUser`/`optionalUser` interface.
 */
const GUEST_PREFIX = 'guest_';

export interface AuthedUser {
  readonly userId: string;
  readonly isGuest: boolean;
  readonly email: string | null;
}

export type AuthOutcome =
  | { readonly kind: 'ANONYMOUS' }
  | { readonly kind: 'EXPIRED' }
  | { readonly kind: 'INVALID' }
  | { readonly kind: 'OK'; readonly user: AuthedUser };

/**
 * Reads and verifies the bearer token.
 *
 * An absent token is anonymous, not an error: browsing and story detail work
 * signed out (§6.3). A present token that does not verify is an error, and an
 * expired one is distinguished from a forged one so the client knows to refresh
 * rather than to sign the player out.
 */
export async function readAuth(ctx: AppContext, request: FastifyRequest): Promise<AuthOutcome> {
  const header = request.headers.authorization;
  if (!header?.startsWith('Bearer ')) return { kind: 'ANONYMOUS' };
  const token = header.slice('Bearer '.length).trim();
  if (token.length === 0) return { kind: 'ANONYMOUS' };

  const result = await ctx.auth.verify(token);
  if (!result.ok) return { kind: result.reason };
  return { kind: 'OK', user: toAuthedUser(result.token) };
}

function toAuthedUser(token: VerifiedToken): AuthedUser {
  return {
    userId: token.userId,
    // Supabase marks anonymous sessions; the dev verifier uses the prefix.
    isGuest: token.isGuest || token.userId.startsWith(GUEST_PREFIX),
    email: token.email,
  };
}

export async function optionalUser(ctx: AppContext, request: FastifyRequest): Promise<UserRecord | null> {
  const auth = await readAuth(ctx, request);
  if (auth.kind !== 'OK') return null;
  return ctx.repo.getUser(auth.user.userId);
}

/**
 * Resolves the caller, creating the profile the first time a verified token
 * arrives so a player never waits on a separate provisioning round trip.
 *
 * The record is created from claims the verifier vouched for, never from
 * anything the client asserted about itself.
 */
export async function resolveUser(ctx: AppContext, request: FastifyRequest): Promise<UserRecord | null> {
  const auth = await readAuth(ctx, request);
  if (auth.kind !== 'OK') return null;

  const existing = await ctx.repo.getUser(auth.user.userId);
  if (existing) return existing;

  const user = newUserRecord(auth.user.userId, auth.user.isGuest, auth.user.email);
  await ctx.repo.createUser(user);
  await ctx.wallet.grantNewUser(auth.user.userId);
  return user;
}

export function newUserRecord(userId: string, isGuest: boolean, email: string | null = null): UserRecord {
  return {
    userId,
    displayName: isGuest ? 'Guest' : (email?.split('@')[0] ?? 'Player'),
    // Unique per account: a handle collision between two players is a bug the
    // database would report as a constraint violation at signup.
    handle: `${isGuest ? 'guest' : 'player'}_${userId.replace(/-/g, '').slice(0, 12)}`,
    email,
    isGuest,
    avatarUrl: null,
    ageVerified: false,
    createdAt: new Date().toISOString(),
    settings: {
      showAdvancedRelationshipStats: false,
      showCheckMath: false,
      reduceMotion: false,
      voiceAutoplay: false,
      hapticsEnabled: true,
      defaultQualityTier: 'VIVID',
      contentFilters: [],
    },
    migratedFromGuestId: null,
    deletionRequestedAt: null,
  };
}

export async function requireUser(
  ctx: AppContext,
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<UserRecord | null> {
  const auth = await readAuth(ctx, request);

  // An expired token is a different problem from a bad one, and the client can
  // fix it silently by refreshing. Saying so is the difference between a
  // seamless refresh and signing a player out mid-scene.
  if (auth.kind === 'EXPIRED') {
    await reply
      .code(401)
      .send({ code: 'TOKEN_EXPIRED', message: 'Your session expired. Signing you back in.' });
    return null;
  }
  if (auth.kind === 'INVALID') {
    await reply.code(401).send({ code: 'UNAUTHENTICATED', message: 'Sign in to continue.' });
    return null;
  }

  const user = await resolveUser(ctx, request);
  if (!user) {
    await reply.code(401).send({ code: 'UNAUTHENTICATED', message: 'Sign in to continue.' });
    return null;
  }
  return user;
}

export function sendError(
  reply: FastifyReply,
  status: number,
  code: string,
  message: string,
  details?: Record<string, unknown>,
): FastifyReply {
  void reply.code(status).send({ code, message, ...(details ? { details } : {}) });
  return reply;
}

export const CONTRACT_HEADER = 'x-contract-version';
export { CONTRACT_VERSION };
