import type { z } from 'zod';
import {
  ModelGatewayError,
  type GenerateOptions,
  type ModelGateway,
  type ModelMessage,
  type ModelRole,
  type ModerationResult,
  type StructuredResult,
  type TextStreamChunk,
} from './types.js';

/**
 * Retries the failures that are worth retrying, and says so when it gives up.
 *
 * Every model stage falls back to the deterministic pipeline when the gateway
 * throws. That fallback is a real mode and the right answer to a provider being
 * down — but a single 429 was enough to trigger it, and nothing anywhere said
 * it had happened. A rate-limited account therefore produced a whole session of
 * the plain template prose, silently, while the logs showed nothing but 200s.
 *
 * Prose quality is the product. Degrading to the floor is allowed; degrading to
 * the floor invisibly is not.
 */

export interface ResilientOptions {
  /** Attempts in total, including the first. */
  readonly attempts?: number;
  readonly baseDelayMs?: number;
  /** Called once per stage that ends up degraded, with the last error. */
  readonly onDegraded?: (role: ModelRole, error: ModelGatewayError) => void;
  readonly sleep?: (ms: number) => Promise<void>;
}

const DEFAULT_ATTEMPTS = 3;
const DEFAULT_BASE_DELAY_MS = 400;

export class ResilientGateway implements ModelGateway {
  readonly #inner: ModelGateway;
  readonly #options: ResilientOptions;

  constructor(inner: ModelGateway, options: ResilientOptions = {}) {
    this.#inner = inner;
    this.#options = options;
  }

  get name(): string {
    return this.#inner.name;
  }

  async generateStructured<T>(
    role: ModelRole,
    schema: z.ZodType<T, z.ZodTypeDef, unknown>,
    messages: readonly ModelMessage[],
    options?: GenerateOptions,
  ): Promise<StructuredResult<T>> {
    return this.#attempt(role, () => this.#inner.generateStructured(role, schema, messages, options));
  }

  streamText(
    role: ModelRole,
    messages: readonly ModelMessage[],
    options?: GenerateOptions,
  ): AsyncIterable<TextStreamChunk> {
    // A stream is already partly delivered by the time it can fail, so
    // retrying it would repeat text the player has read. Passed through.
    return this.#inner.streamText(role, messages, options);
  }

  async embed(texts: readonly string[]): Promise<number[][]> {
    return this.#inner.embed(texts);
  }

  async moderate(input: string): Promise<ModerationResult> {
    return this.#attempt('moderation', () => this.#inner.moderate(input));
  }

  async #attempt<T>(role: ModelRole, run: () => Promise<T>): Promise<T> {
    const attempts = this.#options.attempts ?? DEFAULT_ATTEMPTS;
    const base = this.#options.baseDelayMs ?? DEFAULT_BASE_DELAY_MS;
    const sleep = this.#options.sleep ?? ((ms: number) => new Promise((resolve) => setTimeout(resolve, ms)));

    let last: ModelGatewayError | null = null;
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        return await run();
      } catch (error) {
        if (!(error instanceof ModelGatewayError) || !error.retryable) {
          if (error instanceof ModelGatewayError) this.#options.onDegraded?.(role, error);
          throw error;
        }
        last = error;
        if (attempt === attempts) break;
        // Exponential, with jitter so a burst of turns does not retry in step
        // and reproduce the burst that caused the limit.
        const delay = base * 2 ** (attempt - 1);
        await sleep(delay + Math.floor(Math.random() * base));
      }
    }

    this.#options.onDegraded?.(role, last!);
    throw last!;
  }
}
