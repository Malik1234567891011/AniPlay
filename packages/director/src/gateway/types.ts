import type { z } from 'zod';

/**
 * Spec §32.5 — one internal interface abstracts every model provider.
 *
 * Business logic never touches a vendor SDK. It asks for a *role*, and
 * configuration decides which provider and snapshot answers. That is what makes
 * quality tiers, cost control, and provider failover a config change rather than
 * a refactor.
 */

/** Spec §17.7 — roles, never marketing model names, in production code. */
export type ModelRole =
  | 'intent_fast'
  | 'director_standard'
  | 'director_premium'
  | 'writer_fast'
  | 'writer_standard'
  | 'writer_premium'
  | 'validator_fast'
  | 'moderation'
  | 'embeddings';

export interface ModelMessage {
  readonly role: 'system' | 'user' | 'assistant';
  /**
   * Untrusted content is passed as data, never concatenated into privileged
   * instructions (spec §18.2/§18.3).
   */
  readonly content: string;
}

export interface GenerateOptions {
  readonly maxTokens?: number;
  readonly temperature?: number;
  readonly timeoutMs?: number;
  readonly requestId?: string;
  /** Deterministic providers use this so a turn replays identically. */
  readonly seed?: string;
}

export interface ModelInvocation {
  readonly requestId: string;
  readonly role: ModelRole;
  readonly provider: string;
  readonly model: string;
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly costUsd: number;
  readonly latencyMs: number;
  readonly ok: boolean;
  readonly errorCode: string | null;
}

export interface StructuredResult<T> {
  readonly value: T;
  readonly invocation: ModelInvocation;
}

export interface TextStreamChunk {
  readonly delta: string;
  readonly done: boolean;
}

export interface ModerationResult {
  readonly flagged: boolean;
  readonly categories: string[];
  /** Copy safe to show a player. Never raw policy jargon (spec §10.8). */
  readonly playerFacingMessage: string | null;
}

/** Spec §32.5 — the whole surface. Everything else is an implementation detail. */
export interface ModelGateway {
  readonly name: string;

  /**
   * `T` binds to the schema's *output* type. With `.default()` the input and
   * output types differ, and inferring from the input made guaranteed fields
   * come back as possibly undefined at every call site.
   */
  generateStructured<T>(
    role: ModelRole,
    schema: z.ZodType<T, z.ZodTypeDef, unknown>,
    messages: readonly ModelMessage[],
    options?: GenerateOptions,
  ): Promise<StructuredResult<T>>;

  streamText(
    role: ModelRole,
    messages: readonly ModelMessage[],
    options?: GenerateOptions,
  ): AsyncIterable<TextStreamChunk>;

  embed(texts: readonly string[]): Promise<number[][]>;

  moderate(input: string): Promise<ModerationResult>;
}

export class ModelGatewayError extends Error {
  constructor(
    override readonly message: string,
    readonly code: 'TIMEOUT' | 'INVALID_JSON' | 'PROVIDER_ERROR' | 'SCHEMA_VIOLATION' | 'RATE_LIMITED',
    readonly retryable: boolean,
  ) {
    super(message);
    this.name = 'ModelGatewayError';
  }
}
