import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { ResilientGateway } from './resilient.js';
import { ModelGatewayError, type ModelGateway } from './types.js';

/**
 * A single 429 used to drop a whole turn to the rule-based pipeline, and
 * nothing anywhere said so. For a product whose output is the product, that is
 * the worst kind of failure: invisible and total.
 */
const schema = z.object({ ok: z.boolean() });

function gateway(impl: () => Promise<unknown>): ModelGateway {
  return {
    name: 'stub',
    generateStructured: impl as ModelGateway['generateStructured'],
    streamText: async function* () {},
    embed: async () => [],
    moderate: async () => ({ flagged: false, categories: [], playerFacingMessage: null }),
  } as ModelGateway;
}

describe('ResilientGateway', () => {
  const sleep = async (): Promise<void> => undefined;

  it('rides out a rate limit instead of degrading on the first one', async () => {
    let calls = 0;
    const inner = gateway(async () => {
      calls += 1;
      if (calls < 3) throw new ModelGatewayError('Rate limited by provider', 'RATE_LIMITED', true);
      return { value: { ok: true }, invocation: {} };
    });

    const degraded = vi.fn();
    const resilient = new ResilientGateway(inner, { sleep, onDegraded: degraded, baseDelayMs: 0 });

    expect(await resilient.generateStructured('writer_fast', schema, [])).toMatchObject({
      value: { ok: true },
    });
    expect(calls).toBe(3);
    expect(degraded).not.toHaveBeenCalled();
  });

  it('says so when it finally gives up', async () => {
    const inner = gateway(async () => {
      throw new ModelGatewayError('Rate limited by provider', 'RATE_LIMITED', true);
    });
    const degraded = vi.fn();
    const resilient = new ResilientGateway(inner, { sleep, onDegraded: degraded, baseDelayMs: 0, attempts: 2 });

    await expect(resilient.generateStructured('writer_fast', schema, [])).rejects.toBeInstanceOf(
      ModelGatewayError,
    );
    expect(degraded).toHaveBeenCalledOnce();
    expect(degraded.mock.calls[0]![0]).toBe('writer_fast');
  });

  it('does not retry something retrying cannot fix', async () => {
    let calls = 0;
    const inner = gateway(async () => {
      calls += 1;
      throw new ModelGatewayError('Schema violation', 'SCHEMA_VIOLATION', false);
    });
    const degraded = vi.fn();
    const resilient = new ResilientGateway(inner, { sleep, onDegraded: degraded, baseDelayMs: 0 });

    await expect(resilient.generateStructured('writer_fast', schema, [])).rejects.toBeInstanceOf(
      ModelGatewayError,
    );
    expect(calls).toBe(1);
    expect(degraded).toHaveBeenCalledOnce();
  });

  it('retries moderation too, because failing it open is worse', async () => {
    let calls = 0;
    const inner = {
      ...gateway(async () => ({ value: {}, invocation: {} })),
      moderate: async () => {
        calls += 1;
        if (calls < 2) throw new ModelGatewayError('down', 'PROVIDER_ERROR', true);
        return { flagged: true, categories: ['X'], playerFacingMessage: 'No.' };
      },
    } as ModelGateway;

    const resilient = new ResilientGateway(inner, { sleep, baseDelayMs: 0 });
    expect((await resilient.moderate('anything')).flagged).toBe(true);
    expect(calls).toBe(2);
  });
});

/**
 * Both providers return 429 for "slow down" and for "you have no money left".
 * Only one of those is worth retrying.
 */
describe('telling a rate limit from an empty balance', () => {
  const respondWith = (status: number, body: string) =>
    (async () => new Response(body, { status })) as unknown as typeof fetch;

  it('retries a real rate limit', async () => {
    const { OpenAiGateway } = await import('./openai.js');
    const gateway = new OpenAiGateway({
      apiKey: 'k',
      fetchImpl: respondWith(429, JSON.stringify({ error: { message: 'Rate limit reached' } })),
    });
    await expect(
      gateway.generateStructured('writer_fast', schema, [{ role: 'user', content: 'x' }]),
    ).rejects.toMatchObject({ code: 'RATE_LIMITED', retryable: true });
  });

  it('does not retry an exhausted balance', async () => {
    const { OpenAiGateway } = await import('./openai.js');
    const gateway = new OpenAiGateway({
      apiKey: 'k',
      fetchImpl: respondWith(
        429,
        JSON.stringify({ error: { code: 'credit_balance_exhausted', type: 'insufficient_quota' } }),
      ),
    });
    await expect(
      gateway.generateStructured('writer_fast', schema, [{ role: 'user', content: 'x' }]),
    ).rejects.toMatchObject({ code: 'RATE_LIMITED', retryable: false });
  });
});
