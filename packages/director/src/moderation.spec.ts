import { describe, expect, it } from 'vitest';
import { GatewayModerator, RuleBasedModerator, createModerator } from './moderation.js';
import type { ModelGateway } from './gateway/types.js';

/**
 * The hard part of moderating this product is what it must *not* block.
 * These worlds are about violence, betrayal, grief and people behaving badly,
 * and an app that refuses "I hit him" is not shippable either (§29.2).
 */
describe('RuleBasedModerator', () => {
  const moderator = new RuleBasedModerator();
  const flagged = async (text: string): Promise<boolean> => (await moderator.check(text)).flagged;

  it('lets the game through', async () => {
    for (const text of [
      'I hit Kael as hard as I can.',
      'I kill him and take the ledger.',
      'I tell Mira she is a fraud and I am done pretending otherwise.',
      'I kiss Juno on the dock.',
      'I steal the stack key and run.',
      'I threaten to burn the whole archive down.',
      'I lie about where I was when the third one died.',
      'I get drunk with the kitchen staff and say something I regret.',
      'She is a child of the wall and I promise to protect her.',
      'I hold the dying man and tell him it was quick.',
    ]) {
      expect(await flagged(text), text).toBe(false);
    }
  });

  it('blocks what no fiction makes acceptable', async () => {
    const result = await moderator.check('I undress the twelve year old.');
    expect(result.flagged).toBe(true);
    expect(result.categories).toEqual(['SEXUAL_MINORS']);
    // §29.2 — redirect inside the product's voice, never a policy readout.
    expect(result.playerFacingMessage).not.toMatch(/policy|violation|prohibited|guidelines/i);
  });

  it('answers a real question as a real question', async () => {
    const result = await moderator.check('how do i kill myself');
    expect(result.flagged).toBe(true);
    expect(result.playerFacingMessage).toMatch(/talk to someone/i);
  });

  it('does not mistake a character in despair for a person in danger', async () => {
    expect(await flagged('My character wants to die and says so to Talia.')).toBe(false);
    expect(await flagged('I tell Oswin I would rather be dead than go on stage.')).toBe(false);
  });
});

describe('GatewayModerator', () => {
  const gateway = (impl: Partial<ModelGateway>): ModelGateway =>
    ({
      name: 'stub',
      generateStructured: async () => {
        throw new Error('unused');
      },
      streamText: async function* () {},
      embed: async () => [],
      moderate: async () => ({ flagged: false, categories: [], playerFacingMessage: null }),
      ...impl,
    }) as ModelGateway;

  it('asks the provider when the floor lets something through', async () => {
    let asked = false;
    const moderator = new GatewayModerator(
      gateway({
        moderate: async () => {
          asked = true;
          return { flagged: true, categories: ['HARASSMENT'], playerFacingMessage: 'No.' };
        },
      }),
    );
    expect((await moderator.check('something subtle')).flagged).toBe(true);
    expect(asked).toBe(true);
  });

  it('does not ask the provider about something the floor already refused', async () => {
    let asked = false;
    const moderator = new GatewayModerator(
      gateway({
        moderate: async () => {
          asked = true;
          return { flagged: false, categories: [], playerFacingMessage: null };
        },
      }),
    );
    expect((await moderator.check('I undress the ten year old.')).flagged).toBe(true);
    expect(asked).toBe(false);
  });

  it('an outage is neither an open door nor a closed one', async () => {
    const moderator = new GatewayModerator(
      gateway({
        moderate: async () => {
          throw new Error('provider down');
        },
      }),
    );
    // The game still plays…
    expect((await moderator.check('I hit Kael.')).flagged).toBe(false);
    // …and the floor still holds.
    expect((await moderator.check('I undress the ten year old.')).flagged).toBe(true);
  });

  it('falls back to the narrow rules with no provider configured', () => {
    expect(createModerator(null).name).toBe('rule-based');
  });
});
