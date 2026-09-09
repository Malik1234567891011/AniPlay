import { AnthropicGateway } from './anthropic.js';
import type { ModelGateway } from './types.js';

export * from './types.js';
export { AnthropicGateway, toJsonSchema } from './anthropic.js';

/**
 * Spec §31.4 — the gateway is chosen by environment, never by business logic.
 * With no key configured the product runs the rule-based pipeline, which is a
 * first-class mode rather than a degraded one: the engine is identical and every
 * turn is still deterministic and auditable.
 */
export function createGatewayFromEnv(
  env: Record<string, string | undefined> = process.env,
): ModelGateway | null {
  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  return new AnthropicGateway({
    apiKey,
    ...(env.ANTHROPIC_BASE_URL ? { baseUrl: env.ANTHROPIC_BASE_URL } : {}),
  });
}
