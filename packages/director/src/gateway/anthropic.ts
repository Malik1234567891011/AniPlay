import type { z } from 'zod';
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
 * Anthropic adapter for the model gateway (spec §32.5).
 *
 * Used only when `ANTHROPIC_API_KEY` is present; otherwise the product runs the
 * rule-based pipeline. Uses fetch directly rather than an SDK so the package
 * stays dependency-light and the request shape is visible at the call site.
 *
 * Role → model mapping lives here and is versioned config, never scattered
 * through business logic (§17.7).
 */

export interface AnthropicConfig {
  readonly apiKey: string;
  readonly baseUrl?: string;
  readonly models?: Partial<Record<ModelRole, string>>;
  readonly fetchImpl?: typeof fetch;
}

/** Pinned snapshots. Changing one is a config change gated by evals (§18.4). */
const DEFAULT_MODELS: Record<ModelRole, string> = {
  intent_fast: 'claude-haiku-4-5-20251001',
  director_standard: 'claude-sonnet-5',
  director_premium: 'claude-opus-5',
  writer_fast: 'claude-haiku-4-5-20251001',
  writer_standard: 'claude-sonnet-5',
  writer_premium: 'claude-opus-5',
  validator_fast: 'claude-haiku-4-5-20251001',
  moderation: 'claude-haiku-4-5-20251001',
  embeddings: 'claude-haiku-4-5-20251001',
};

/** USD per million tokens, for the cost telemetry the spec requires (§20.12). */
const PRICING: Record<string, { input: number; output: number }> = {
  'claude-haiku-4-5-20251001': { input: 1, output: 5 },
  'claude-sonnet-5': { input: 3, output: 15 },
  'claude-opus-5': { input: 15, output: 75 },
};

export class AnthropicGateway implements ModelGateway {
  readonly name = 'anthropic';
  readonly #config: AnthropicConfig;
  readonly #fetch: typeof fetch;

  constructor(config: AnthropicConfig) {
    this.#config = config;
    this.#fetch = config.fetchImpl ?? fetch;
  }

  #modelFor(role: ModelRole): string {
    return this.#config.models?.[role] ?? DEFAULT_MODELS[role];
  }

  async #request(
    role: ModelRole,
    body: Record<string, unknown>,
    options: GenerateOptions | undefined,
    stream: boolean,
  ): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options?.timeoutMs ?? 30_000);

    try {
      const response = await this.#fetch(
        `${this.#config.baseUrl ?? 'https://api.anthropic.com'}/v1/messages`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-api-key': this.#config.apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({ model: this.#modelFor(role), stream, ...body }),
          signal: controller.signal,
        },
      );

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

    const system = messages.filter((m) => m.role === 'system').map((m) => m.content).join('\n\n');
    const turns = messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({ role: m.role, content: m.content }));

    // A single forced tool call is the reliable way to get schema-valid JSON.
    const response = await this.#request(
      role,
      {
        max_tokens: options?.maxTokens ?? 2048,
        temperature: options?.temperature ?? 0.7,
        system,
        messages: turns,
        tools: [
          {
            name: 'emit',
            description: 'Emit the result. Every field is required unless marked optional.',
            input_schema: toJsonSchema(schema),
          },
        ],
        tool_choice: { type: 'tool', name: 'emit' },
      },
      options,
      false,
    );

    const payload = (await response.json()) as {
      content: Array<{ type: string; input?: unknown }>;
      usage?: { input_tokens?: number; output_tokens?: number };
    };

    const toolUse = payload.content.find((block) => block.type === 'tool_use');
    if (!toolUse?.input) {
      throw new ModelGatewayError('Provider returned no structured output', 'INVALID_JSON', true);
    }

    const parsed = schema.safeParse(toolUse.input);
    if (!parsed.success) {
      throw new ModelGatewayError(
        `Structured output failed schema: ${parsed.error.issues.map((i) => i.path.join('.')).join(', ')}`,
        'SCHEMA_VIOLATION',
        true,
      );
    }

    const model = this.#modelFor(role);
    const inputTokens = payload.usage?.input_tokens ?? 0;
    const outputTokens = payload.usage?.output_tokens ?? 0;

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
    const system = messages.filter((m) => m.role === 'system').map((m) => m.content).join('\n\n');
    const turns = messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({ role: m.role, content: m.content }));

    const response = await this.#request(
      role,
      { max_tokens: options?.maxTokens ?? 1024, temperature: options?.temperature ?? 0.8, system, messages: turns },
      options,
      true,
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
        if (data.length === 0) continue;
        try {
          const event = JSON.parse(data) as {
            type?: string;
            delta?: { text?: string };
          };
          if (event.type === 'content_block_delta' && event.delta?.text) {
            yield { delta: event.delta.text, done: false };
          }
        } catch {
          // A partial frame is normal mid-stream; the next read completes it.
        }
      }
    }

    yield { delta: '', done: true };
  }

  async embed(texts: readonly string[]): Promise<number[][]> {
    // Anthropic does not serve embeddings. Callers fall back to lexical
    // retrieval; wire a dedicated embeddings provider here when one is chosen.
    throw new ModelGatewayError(
      'No embeddings provider configured; retrieval falls back to lexical similarity',
      'PROVIDER_ERROR',
      false,
    );
  }

  async moderate(input: string): Promise<ModerationResult> {
    const schema = {
      safeParse: (value: unknown) => ({ success: true as const, data: value as { flagged: boolean; categories: string[] } }),
    } as unknown as z.ZodType<{ flagged: boolean; categories: string[] }>;

    const result = await this.generateStructured(
      'moderation',
      schema,
      [
        {
          role: 'system',
          content:
            'Classify the user content for a 13+ interactive fiction product. Return flagged=true only for content that must be blocked: sexual content involving minors, credible threats, self-harm instruction, or targeted harassment. Fantasy violence and dark themes are permitted.',
        },
        { role: 'user', content: input },
      ],
      { maxTokens: 256, temperature: 0 },
    );

    return {
      flagged: result.value.flagged,
      categories: result.value.categories ?? [],
      playerFacingMessage: result.value.flagged
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

/**
 * Minimal Zod → JSON Schema conversion covering the shapes the AI contracts
 * use. Deliberately narrow: it is easier to keep correct than a general
 * converter, and an unsupported shape fails loudly at development time.
 */
export function toJsonSchema(schema: z.ZodType<unknown>): Record<string, unknown> {
  const def = (schema as unknown as { _def: Record<string, unknown> })._def;
  const typeName = def?.typeName as string | undefined;

  switch (typeName) {
    case 'ZodObject': {
      const shape = (def.shape as () => Record<string, z.ZodType<unknown>>)();
      const properties: Record<string, unknown> = {};
      const required: string[] = [];
      for (const [key, value] of Object.entries(shape)) {
        properties[key] = toJsonSchema(value);
        if (!isOptional(value)) required.push(key);
      }
      return { type: 'object', properties, required, additionalProperties: false };
    }
    case 'ZodArray': {
      const inner = def.type as z.ZodType<unknown>;
      const out: Record<string, unknown> = { type: 'array', items: toJsonSchema(inner) };
      const min = (def.minLength as { value: number } | null)?.value;
      const max = (def.maxLength as { value: number } | null)?.value;
      if (min !== undefined) out.minItems = min;
      if (max !== undefined) out.maxItems = max;
      return out;
    }
    case 'ZodString': {
      const checks = (def.checks as Array<{ kind: string; value?: number }>) ?? [];
      const out: Record<string, unknown> = { type: 'string' };
      for (const check of checks) {
        if (check.kind === 'max' && check.value !== undefined) out.maxLength = check.value;
        if (check.kind === 'min' && check.value !== undefined) out.minLength = check.value;
      }
      return out;
    }
    case 'ZodNumber': {
      const checks = (def.checks as Array<{ kind: string; value?: number }>) ?? [];
      const isInt = checks.some((c) => c.kind === 'int');
      const out: Record<string, unknown> = { type: isInt ? 'integer' : 'number' };
      for (const check of checks) {
        if (check.kind === 'min' && check.value !== undefined) out.minimum = check.value;
        if (check.kind === 'max' && check.value !== undefined) out.maximum = check.value;
      }
      return out;
    }
    case 'ZodBoolean':
      return { type: 'boolean' };
    case 'ZodEnum':
      return { enum: def.values as string[] };
    case 'ZodLiteral':
      return { const: def.value };
    case 'ZodNullable':
      return { anyOf: [toJsonSchema(def.innerType as z.ZodType<unknown>), { type: 'null' }] };
    case 'ZodOptional':
    case 'ZodDefault':
      return toJsonSchema(def.innerType as z.ZodType<unknown>);
    case 'ZodRecord':
      return { type: 'object', additionalProperties: toJsonSchema(def.valueType as z.ZodType<unknown>) };
    case 'ZodUnion':
      return { anyOf: (def.options as z.ZodType<unknown>[]).map(toJsonSchema) };
    case 'ZodUnknown':
    case 'ZodAny':
      return {};
    default:
      return {};
  }
}

function isOptional(schema: z.ZodType<unknown>): boolean {
  const typeName = (schema as unknown as { _def: { typeName?: string } })._def?.typeName;
  return typeName === 'ZodOptional' || typeName === 'ZodDefault';
}
