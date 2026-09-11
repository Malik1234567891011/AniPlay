import { describe, expect, it } from 'vitest';
import { hasMidpoint, outcomeOf, talksToNobody } from './responses.js';
import { stripQuotesForTest } from './fast-writer.js';
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
  // As `nameKeys` produces them: every word, plus the full name.
  const ABSENT = ['juno vale', 'juno', 'vale', 'teo sandoval', 'teo', 'sandoval'];

  it('drops a card that speaks to somebody who is not there', () => {
    expect(
      talksToNobody('I wave at Juno with a grin, stepping closer in the dim light.', 0, ABSENT),
    ).toBe(true);
  });

  it('drops it on the surname too', () => {
    expect(talksToNobody('I call after Sandoval. "Wait!"', 0, ABSENT)).toBe(true);
  });

  it('keeps an action that needs nobody', () => {
    expect(
      talksToNobody('I sit down on the end of the dock and let my feet hang over the water.', 0, ABSENT),
    ).toBe(false);
  });

  it('lets a player alone speak into the air, which people do', () => {
    // Dropping every quoted line in an empty room emptied the whole set, and
    // the cards fell back to the rule-built menu items the prose responses
    // exist to replace.
    expect(talksToNobody('I read the duty board aloud. "Three cousins. All steady."', 0, ABSENT)).toBe(false);
    expect(talksToNobody('I wave at the dark. “Anyone out there?”', 0, ABSENT)).toBe(false);
  });

  it('leaves dialogue alone when there is somebody to hear it', () => {
    expect(talksToNobody('I turn to Juno. "You in?"', 2, ABSENT)).toBe(false);
  });
});

describe('a card the player cannot read aloud', () => {
  it('drops the midpoint in every spelling', () => {
    for (const bad of ['Tu es sûr·e ?', 'Je suis prêt(e).', 'Je suis arrivé.e hier', 'Tu es parti‧e']) {
      expect(hasMidpoint(bad), bad).toBe(true);
    }
  });

  it('leaves ordinary French alone', () => {
    for (const good of [
      'Je suis prête, on y va.',
      'Je préfère attendre ici.',
      'C’est à toi de voir.',
      "J'y vais.",
      // A midpoint is a letter either side. A bullet in a list is not.
      'Trois choses · deux personnes',
    ]) {
      expect(hasMidpoint(good), good).toBe(false);
    }
  });

  it('leaves English alone, which has no such hedge', () => {
    expect(hasMidpoint('I am ready. Let us go.')).toBe(false);
  });
});

describe('a spoken line, stored', () => {
  it('arrives bare whatever the model wrapped it in', () => {
    // English, as before.
    expect(stripQuotesForTest('“You said two. Not three.”')).toBe('You said two. Not three.');
    expect(stripQuotesForTest('"Right."')).toBe('Right.');
    // French. Guillemets were missing from the strip list, so only French
    // lines kept their punctuation — the stored text differed between locales
    // for no reason anybody chose.
    expect(stripQuotesForTest('« Tu viens ? »')).toBe('Tu viens ?');
    // The non-breaking space French puts inside them goes too, or the line
    // begins with a space.
    expect(stripQuotesForTest('« Il y a encore de la soupe. »')).toBe(
      'Il y a encore de la soupe.',
    );
    expect(stripQuotesForTest('« Bon. »')).toBe('Bon.');
  });

  it('leaves a line that was never wrapped alone', () => {
    expect(stripQuotesForTest('Tu reprends le même lit.')).toBe('Tu reprends le même lit.');
  });

  it('leaves quotes that are inside the line', () => {
    // Somebody quoting somebody else is theirs, not ours.
    expect(stripQuotesForTest('Elle a dit « demain » et elle est partie.')).toBe(
      'Elle a dit « demain » et elle est partie.',
    );
  });
});
