import type { FastifyReply, FastifyRequest } from 'fastify';
import { CONTRACT_VERSION } from '@aniplay/contracts';
import { createGatewayFromEnv, ModelDirector, ModelIntentParser, ModelWriter, createDefaultPipeline, type TurnPipelineDeps } from '@aniplay/director';
import { createMediaGatewayFromEnv } from '@aniplay/director';
import { JobQueue, registerHandlers } from '@aniplay/worker';
import { MemoryRepository } from './repo/memory.js';
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

export interface AppContext {
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
}

export function createAppContext(overrides: Partial<AppContext> = {}): AppContext {
  const config = overrides.config ?? loadConfig();
  const repo = overrides.repo ?? new MemoryRepository();
  const wallet = overrides.wallet ?? new WalletService(repo);

  // Spec §31.4 — the gateway is selected by environment. With no key the
  // rule-based pipeline runs, which is a supported mode, not a broken one.
  const gateway = createGatewayFromEnv();
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
    jobs,
    storeVerifier: overrides.storeVerifier ?? createStoreVerifierFromEnv(config),
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
}

export function readAuth(request: FastifyRequest): AuthedUser | null {
  const header = request.headers.authorization;
  if (!header?.startsWith('Bearer ')) return null;
  const token = header.slice('Bearer '.length).trim();
  if (token.length === 0) return null;
  return { userId: token, isGuest: token.startsWith(GUEST_PREFIX) };
}

export async function optionalUser(ctx: AppContext, request: FastifyRequest): Promise<UserRecord | null> {
  const auth = readAuth(request);
  if (!auth) return null;
  return ctx.repo.getUser(auth.userId);
}

/**
 * Resolves the caller, creating the record on first sight of a guest token so a
 * guest can play without a round-trip to a signup screen.
 */
export async function resolveUser(ctx: AppContext, request: FastifyRequest): Promise<UserRecord | null> {
  const auth = readAuth(request);
  if (!auth) return null;

  const existing = await ctx.repo.getUser(auth.userId);
  if (existing) return existing;
  if (!auth.isGuest) return null;

  const user = newUserRecord(auth.userId, true);
  await ctx.repo.createUser(user);
  await ctx.wallet.grantNewUser(auth.userId);
  return user;
}

export function newUserRecord(userId: string, isGuest: boolean): UserRecord {
  return {
    userId,
    displayName: isGuest ? 'Guest' : 'Player',
    handle: userId.slice(0, 12),
    email: null,
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
