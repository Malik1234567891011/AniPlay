import { describe, expect, it } from 'vitest';
import { outcomeOf, talksToNobody } from './responses.js';
import type { TurnContext } from './context.js';

/**
 * Two things the cards kept getting wrong in a 25-turn Nine Weeks run, both
 * because they were written from what the player *tried* rather than from what
 * became of it.
 */

const ctx = (over: {
  checks?: { outcome: string }[];
  mutations?: { type: string }[];
  location?: string;
}): TurnContext =>
  ({
    scene: { locationName: over.location ?? 'The Longhouse Bar' },
    resolution: {
      checks: over.checks ?? [],
      mutations: over.mutations ?? [],
    },
  }) as unknown as TurnContext;

describe('telling the cards what actually happened', () => {
  it('says plainly when the attempt was refused', () => {
    // Turn 22: Juno refused to leave the bar, and all three cards put the
    // player outside on the steps anyway.
    expect(outcomeOf(ctx({ checks: [{ outcome: 'FAILURE' }] }))).toMatch(/did not work/i);
  });

  it('treats a complication as a refusal too', () => {
    expect(outcomeOf(ctx({ checks: [{ outcome: 'COMPLICATION' }] }))).toMatch(/did not work/i);
  });

  it('names where the player ended up when they actually moved', () => {
    const said = outcomeOf(
      ctx({ mutations: [{ type: 'LOCATION_CHANGE' }], location: 'The Dock' }),
    );
    expect(said).toMatch(/The Dock/);
  });

  it('does not call a refusal a failure to move when the player moved anyway', () => {
    const said = outcomeOf(
      ctx({ checks: [{ outcome: 'FAILURE' }], mutations: [{ type: 'LOCATION_CHANGE' }], location: 'The Dock' }),
    );
    expect(said).toMatch(/The Dock/);
  });

  it('says nothing dramatic about a beat with no check in it', () => {
    expect(outcomeOf(ctx({}))).toMatch(/carried on/i);
  });
});

describe('not handing dialogue to a player standing alone', () => {
  it('drops a question asked of an empty room', () => {
    expect(
      talksToNobody('I take a deep breath and turn toward the trail. "Maybe a walk will clear my head. Want to come?"', 0),
    ).toBe(true);
  });

  it('keeps an action that needs nobody', () => {
    expect(talksToNobody('I sit down on the end of the dock and let my feet hang over the water.', 0)).toBe(false);
  });

  it('leaves dialogue alone when there is somebody to hear it', () => {
    expect(talksToNobody('I turn to Juno. "You in?"', 2)).toBe(false);
  });

  it('catches curly quotes, which is what the model actually writes', () => {
    expect(talksToNobody('I wave at the dark. “Anyone out there?”', 0)).toBe(true);
  });
});
