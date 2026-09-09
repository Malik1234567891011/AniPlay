import type { z } from 'zod';
import { toJsonSchema } from './anthropic.js';
import {
  ModelGatewayError,
  type GenerateOptions,
  type ModelGateway,
  type ModelInvocation,
  type ModelMessage,
  type ModelRole,
  type ModerationResult,
  type StructuredResult,
  type TextStreamChunk,
} from './types.js';

/**
 * OpenAI adapter for the model gateway (spec §32.5).
 *
 * Same interface, same roles, same cost telemetry as the Anthropic adapter —
 * business logic cannot tell them apart, which is the point of §32.5. Uses
 * fetch directly rather than an SDK so the package stays dependency-light.
 *
 * Unlike Anthropic this provider also serves embeddings and a dedicated
 * moderation endpoint, so `embed` and `moderate` are real here rather than the
 * lexical fallback.
 */

export interface OpenAiConfig {
  readonly apiKey: string;
  readonly baseUrl?: string;
  readonly models?: Partial<Record<ModelRole, string>>;
  readonly embeddingModel?: string;
  readonly fetchImpl?: typeof fetch;
}

/** Pinned snapshots. Changing one is a config change gated by evals (§18.4). */
const DEFAULT_MODELS: Record<ModelRole, string> = {
  intent_fast: 'gpt-4.1-mini',
  director_standard: 'gpt-4.1',
  director_premium: 'gpt-4.1',
  writer_fast: 'gpt-4.1-mini',
  writer_standard: 'gpt-4.1',
  writer_premium: 'gpt-4.1',
  validator_fast: 'gpt-4.1-mini',
  moderation: 'omni-moderation-latest',
  embeddings: 'text-embedding-3-small',
};

/** USD per million tokens, for the cost telemetry the spec requires (§20.12). */
const PRICING: Record<string, { input: number; output: number }> = {
  'gpt-4.1': { input: 2, output: 8 },
  'gpt-4.1-mini': { input: 0.4, output: 1.6 },
  'text-embedding-3-small': { input: 0.02, output: 0 },
};

/**
 * Spec §29 — what must never appear, and nothing more.
 *
 * This is a 13+ interactive fiction product whose worlds are built on fantasy
 * violence, moral ambiguity and dark themes. Blocking on the provider's
 * `violence`, `illicit` or `sexual` flags would refuse the genre it exists to
 * serve, so only the categories with no legitimate place in it block a turn.
 * Everything the provider flags is still reported in `categories` for review.
 */
const BLOCKING_CATEGORIES = new Set([
  'sexual/minors',
  'self-harm/instructions',
  'self-harm/intent',
  'harassment/threatening',
  'hate/threatening',
  'illicit/violent',
]);

export class OpenAiGateway implements ModelGateway {
  readonly name = 'openai';
  readonly #config: OpenAiConfig;
  readonly #fetch: typeof fetch;

  constructor(config: OpenAiConfig) {
    this.#config = config;
    this.#fetch = config.fetchImpl ?? fetch;
  }

  get #baseUrl(): string {
    return this.#config.baseUrl ?? 'https://api.openai.com/v1';
  }

  #modelFor(role: ModelRole): string {
    return this.#config.models?.[role] ?? DEFAULT_MODELS[role];
  }

  async #post(path: string, body: unknown, options: GenerateOptions | undefined): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options?.timeoutMs ?? 30_000);

    try {
      const response = await this.#fetch(`${this.#baseUrl}${path}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${this.#config.apiKey}`,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (response.status === 429) {
        throw new ModelGatewayError('Rate limited by provider', 'RATE_LIMITED', true);
      }
      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new ModelGatewayError(
          `Provider returned ${response.status}: ${text.slice(0, 200)}`,
          'PROVIDER_ERROR',
          response.status >= 500,
        );
      }
      return response;
    } catch (error) {
      if (error instanceof ModelGatewayError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ModelGatewayError('Provider timed out', 'TIMEOUT', true);
      }
      throw new ModelGatewayError(String(error), 'PROVIDER_ERROR', true);
    } finally {
      clearTimeout(timeout);
    }
  }

  async generateStructured<T>(
    role: ModelRole,
    schema: z.ZodType<T>,
    messages: readonly ModelMessage[],
    options?: GenerateOptions,
  ): Promise<StructuredResult<T>> {
    const started = performance.now();
    const requestId = options?.requestId ?? crypto.randomUUID();
    const model = this.#modelFor(role);

    // A single forced function call, mirroring the Anthropic adapter.
    //
    // Not `response_format: json_schema` with strict mode: that subset rejects
    // open-ended objects, and several AI contracts carry `z.record(z.unknown())`
    // payloads by design. Function parameters accept general JSON Schema, and
    // `schema.safeParse` below is the actual guarantee either way.
    const response = await this.#post(
      '/chat/completions',
      {
        model,
        max_completion_tokens: options?.maxTokens ?? 2048,
        temperature: options?.temperature ?? 0.7,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        tools: [
          {
            type: 'function',
            function: {
              name: 'emit',
              description: 'Emit the result. Every field is required unless marked optional.',
              parameters: toJsonSchema(schema),
            },
          },
        ],
        tool_choice: { type: 'function', function: { name: 'emit' } },
      },
      options,
    );

    const payload = (await response.json()) as {
      choices?: Array<{
        message?: { tool_calls?: Array<{ function?: { arguments?: string } }> };
      }>;
      usage?: { prompt_tokens?: number; completion_tokens?: number };
    };

    const content = payload.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!content) {
      throw new ModelGatewayError('Provider returned no structured output', 'INVALID_JSON', true);
    }

    let raw: unknown;
    try {
      raw = JSON.parse(content);
    } catch {
      // A truncated response is the usual cause, and it is worth retrying.
      throw new ModelGatewayError('Provider returned malformed JSON', 'INVALID_JSON', true);
    }

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      throw new ModelGatewayError(
        `Structured output failed schema: ${parsed.error.issues.map((i) => i.path.join('.')).join(', ')}`,
        'SCHEMA_VIOLATION',
        true,
      );
    }

    const inputTokens = payload.usage?.prompt_tokens ?? 0;
    const outputTokens = payload.usage?.completion_tokens ?? 0;

    const invocation: ModelInvocation = {
      requestId,
      role,
      provider: this.name,
      model,
      inputTokens,
      outputTokens,
      costUsd: costOf(model, inputTokens, outputTokens),
      latencyMs: Math.round(performance.now() - started),
      ok: true,
      errorCode: null,
    };

    return { value: parsed.data, invocation };
  }

  async *streamText(
    role: ModelRole,
    messages: readonly ModelMessage[],
    options?: GenerateOptions,
  ): AsyncIterable<TextStreamChunk> {
    const response = await this.#post(
      '/chat/completions',
      {
        model: this.#modelFor(role),
        max_completion_tokens: options?.maxTokens ?? 1024,
        temperature: options?.temperature ?? 0.8,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        stream: true,
      },
      options,
    );

    if (!response.body) {
      throw new ModelGatewayError('Provider returned no stream body', 'PROVIDER_ERROR', true);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const data = line.slice(5).trim();
        if (data.length === 0 || data === '[DONE]') continue;
        try {
          const event = JSON.parse(data) as {
            choices?: Array<{ delta?: { content?: string } }>;
          };
          const delta = event.choices?.[0]?.delta?.content;
          if (delta) yield { delta, done: false };
        } catch {
          // A partial frame is normal mid-stream; the next read completes it.
        }
      }
    }

    yield { delta: '', done: true };
  }

  async embed(texts: readonly string[]): Promise<number[][]> {
    if (texts.length === 0) return [];

    const model = this.#config.embeddingModel ?? DEFAULT_MODELS.embeddings;
    const response = await this.#post('/embeddings', { model, input: [...texts] }, undefined);
    const payload = (await response.json()) as {
      data?: Array<{ index: number; embedding: number[] }>;
    };

    const rows = payload.data ?? [];
    if (rows.length !== texts.length) {
      throw new ModelGatewayError('Embedding count did not match input count', 'PROVIDER_ERROR', true);
    }

    // The API does not promise ordering, and memory retrieval would silently
    // pair the wrong vector with the wrong fact if this trusted it to.
    const out: number[][] = new Array<number[]>(texts.length);
    for (const row of rows) out[row.index] = row.embedding;
    return out;
  }

  async moderate(input: string): Promise<ModerationResult> {
    const response = await this.#post(
      '/moderations',
      { model: this.#modelFor('moderation'), input },
      { timeoutMs: 10_000 },
    );

    const payload = (await response.json()) as {
      results?: Array<{ flagged?: boolean; categories?: Record<string, boolean> }>;
    };

    const result = payload.results?.[0];
    const categories = Object.entries(result?.categories ?? {})
      .filter(([, hit]) => hit)
      .map(([name]) => name);

    const blocking = categories.filter((name) => BLOCKING_CATEGORIES.has(name));

    return {
      flagged: blocking.length > 0,
      categories,
      playerFacingMessage:
        blocking.length > 0
          ? 'That takes the story somewhere it cannot go. Try a different approach.'
          : null,
    };
  }
}

function costOf(model: string, inputTokens: number, outputTokens: number): number {
  const pricing = PRICING[model];
  if (!pricing) return 0;
  return (inputTokens * pricing.input + outputTokens * pricing.output) / 1_000_000;
}
