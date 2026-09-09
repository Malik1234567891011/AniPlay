import { AnthropicGateway } from './anthropic.js';
import { OpenAiGateway } from './openai.js';
import type { ModelGateway } from './types.js';

export * from './types.js';
export { AnthropicGateway, toJsonSchema } from './anthropic.js';
export { OpenAiGateway } from './openai.js';

/**
 * Spec §31.4 — the gateway is chosen by environment, never by business logic.
 * With no key configured the product runs the rule-based pipeline, which is a
 * first-class mode rather than a degraded one: the engine is identical and every
 * turn is still deterministic and auditable.
 *
 * `MODEL_PROVIDER` pins the choice when both keys are present. Otherwise
 * whichever key exists wins, so configuring one key is all it takes — a key
 * sitting in the environment being quietly ignored is worse than no key at all.
 */
export function createGatewayFromEnv(
  env: Record<string, string | undefined> = process.env,
): ModelGateway | null {
  const preferred = env.MODEL_PROVIDER?.toLowerCase();

  if (preferred !== 'openai' && env.ANTHROPIC_API_KEY) {
    return new AnthropicGateway({
      apiKey: env.ANTHROPIC_API_KEY,
      ...(env.ANTHROPIC_BASE_URL ? { baseUrl: env.ANTHROPIC_BASE_URL } : {}),
    });
  }

  if (preferred !== 'anthropic' && env.OPENAI_API_KEY) {
    return new OpenAiGateway({
      apiKey: env.OPENAI_API_KEY,
      ...(env.OPENAI_BASE_URL ? { baseUrl: env.OPENAI_BASE_URL } : {}),
    });
  }

  return null;
}
