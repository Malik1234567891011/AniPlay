import type { ModelGateway, ModerationResult } from './gateway/types.js';

/**
 * Spec §29.1 layer 3 — moderation of what the player types.
 *
 * Player input reached the model with nothing between it and the prompt but a
 * safety instruction, which is a request not to comply rather than a control.
 * This is the control: it runs before anything is reserved or generated, so a
 * blocked turn costs nothing and produces nothing.
 *
 * §29.2 is explicit that this must classify request and context rather than
 * keyword-block fantasy violence — these worlds are *about* violence, and an
 * app that refuses "I hit him" is not shippable either. So the model gateway
 * does the classifying whenever one is configured, and the fallback below is
 * deliberately narrow: it catches only what must never pass regardless of
 * fiction, and lets everything else through.
 */

export interface Moderator {
  readonly name: string;
  check(input: string): Promise<ModerationResult>;
}

const ALLOWED: ModerationResult = { flagged: false, categories: [], playerFacingMessage: null };

/**
 * The floor, for when no provider is configured.
 *
 * Three categories, each one a thing that cannot be made acceptable by being
 * in a story. Everything else — violence, cruelty, death, drugs, despair — is
 * what these worlds are made of and passes through untouched.
 */
export class RuleBasedModerator implements Moderator {
  readonly name = 'rule-based';

  async check(input: string): Promise<ModerationResult> {
    const text = input.toLowerCase();

    // 1. Sexual content involving minors. The age words are required, so
    //    "I kiss her" is not caught and "sexual" alone is not either.
    const minor =
      /\b(child|children|kid|kids|minor|minors|underage|toddler|infant|schoolgirl|schoolboy|pre[- ]?teen|(?:\d{1,2}|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen)[- ]year[- ]old)\b/;
    const sexual = /\b(sex|sexual|sexually|naked|nude|undress|molest|rape|aroused|erotic|fondle|genitals)\b/;
    if (minor.test(text) && sexual.test(text)) {
      return flag('SEXUAL_MINORS', 'That takes the story somewhere it cannot go. Try something else.');
    }

    // 2. Instructions for self-harm, as opposed to a character in despair.
    const selfHarm =
      /\b(how (do|to|can) (i|you|one)\s+(kill myself|end my life|hang myself|overdose)|best way to (kill myself|die|overdose)|i want to kill myself)\b/;
    if (selfHarm.test(text)) {
      return flag(
        'SELF_HARM',
        'This is a story, and that is a real question. If you are struggling, please talk to someone who can help.',
      );
    }

    // 3. A credible threat against a real, named person outside the fiction.
    const realThreat = /\b(i(?:'m| am) going to|i will)\s+(kill|murder|shoot|stab|bomb)\b[^.]{0,40}\b(my|his|her|their)\s+(real|actual)\b/;
    if (realThreat.test(text)) {
      return flag('THREAT', 'That is not something this story can take. Try something else.');
    }

    return ALLOWED;
  }
}

function flag(category: string, message: string): ModerationResult {
  return { flagged: true, categories: [category], playerFacingMessage: message };
}

/**
 * The provider's classifier, with the rule-based floor underneath it.
 *
 * A moderation outage must not become an open door, and it must not become a
 * closed one either: a player mid-scene should not be blocked because a
 * classifier timed out. So a failure falls back to the narrow rules rather
 * than to "allow" or to "deny".
 */
export class GatewayModerator implements Moderator {
  readonly name = 'gateway';
  readonly #gateway: ModelGateway;
  readonly #floor = new RuleBasedModerator();

  constructor(gateway: ModelGateway) {
    this.#gateway = gateway;
  }

  async check(input: string): Promise<ModerationResult> {
    const floor = await this.#floor.check(input);
    if (floor.flagged) return floor;
    try {
      return await this.#gateway.moderate(input);
    } catch {
      return floor;
    }
  }
}

export function createModerator(gateway: ModelGateway | null): Moderator {
  return gateway ? new GatewayModerator(gateway) : new RuleBasedModerator();
}
