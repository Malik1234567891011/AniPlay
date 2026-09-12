import { describe, expect, it } from 'vitest';
import { LAST_FIVE } from '@plotbreak/test-fixtures';
import type { GameState, StoryVersion } from '@plotbreak/contracts';
import { createInitialState, charactersPresent } from './state.js';
import { advanceObligations, detectCommitment, minutesIn, pressureOf, settleOnArrival } from './commitments.js';
import { beyondName } from './resolve.js';

/**
 * Time somebody is owed.
 *
 * The Itachi opening says Fugaku expects him in eighty minutes; the player then
 * gives Sasuke forty of them. Both are load-bearing and neither existed outside
 * the prose, so the clock advanced six minutes a turn — correctly — while
 * nothing in the world knew there was anything to be late for. The player could
 * wander a tea shop indefinitely and the meeting never arrived.
 */

const story = LAST_FIVE as unknown as StoryVersion;
const world = (): GameState =>
  createInitialState({
    sessionId: 'sess_c', story,
    identity: {
      displayName: 'Sora', pronouns: 'they/them', ageBand: null,
      archetypeId: story.archetypes[0]?.id ?? null,
      worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  }) as GameState;

describe('reading a duration the way people write it', () => {
  it('takes digits and words alike', () => {
    expect(minutesIn('he can have forty of them')).toBe(null); // no unit: not a duration
    expect(minutesIn('I will give you forty minutes')).toBe(40);
    expect(minutesIn('give me 20 mins')).toBe(20);
    expect(minutesIn('half an hour, no more')).toBe(30);
    expect(minutesIn('an hour and a half')).toBe(90);
  });
});

describe('what counts as a commitment', () => {
  const state = world();
  const someone = story.characters[0]!;

  it('hears a promise', () => {
    const c = detectCommitment("I'm not going anywhere.", state, someone);
    expect(c?.kind).toBe('PROMISE');
    expect(c?.withCharacterId).toBe(someone.id);
  });

  it('keeps the player’s own words, because a promise gets quoted back', () => {
    const said = "I promise I will be at the gate before it closes.";
    expect(detectCommitment(said, state, someone)?.what).toBe(said);
  });

  it('reads a time budget as a budget, not a deadline', () => {
    const c = detectCommitment("I'll give you thirty minutes, then I have to go.", state, someone);
    expect(c?.budgetMinutes).toBe(30);
    expect(c?.dueWorldMinute).toBe(null);
  });

  it('does not treat hedging as a vow', () => {
    // The bar is high on purpose. A world that records every future-tense verb
    // as a promise is worse than one that records none, because the player
    // stops being able to speak casually.
    for (const hedge of [
      'maybe I will come by later',
      'I might be there',
      "I'll try to make it",
      'I think I will stay',
      'Will you be there?',
    ]) {
      expect(detectCommitment(hedge, state, someone), hedge).toBeNull();
    }
  });

  it('does not invent one out of ordinary description', () => {
    expect(detectCommitment('I sit down and look at the water.', state, someone)).toBeNull();
  });
});

describe('the clock reaching an obligation', () => {
  const at = (dueIn: number | null, budget: number | null = null) => ({
    id: 'o1', kind: 'APPOINTMENT' as const, what: 'be under the seventh mat',
    withCharacterId: story.characters[0]!.id,
    dueWorldMinute: dueIn === null ? null : 100 + dueIn,
    budgetMinutes: budget, createdTurn: 0, status: 'OPEN' as const,
  });

  it('reports how hard it is pressing', () => {
    expect(pressureOf(at(60), 100)).toBe('LATER');
    expect(pressureOf(at(25), 100)).toBe('SOON');
    expect(pressureOf(at(5), 100)).toBe('NOW');
    expect(pressureOf(at(-5), 100)).toBe('LATE');
  });

  it('an untimed promise never becomes late, because it has no moment', () => {
    // "I am not going anywhere" is not weaker than an appointment. It is
    // harder: there is no time at which it is discharged.
    expect(pressureOf(at(null), 100_000)).toBe('LATER');
  });

  it('says so, once, when the player becomes late', () => {
    const state = { ...world(), worldMinute: 106, obligations: [at(5)] };
    const { facts } = advanceObligations(state, 6);
    expect(facts.join(' ')).toMatch(/late/i);
  });

  it('does not repeat itself every turn after that', () => {
    // The second turn past due is not news. A game that reminds you every turn
    // about a meeting you have not forgotten is nagging you.
    const state = { ...world(), worldMinute: 130, obligations: [at(5)] };
    expect(advanceObligations(state, 6).facts).toEqual([]);
  });

  it('spends a time budget and says when it is gone', () => {
    const state = { ...world(), worldMinute: 140, obligations: [at(null, 40)] };
    const first = advanceObligations(state, 30);
    expect(first.obligations[0]!.budgetMinutes).toBe(10);
    expect(first.facts).toEqual([]);

    const second = advanceObligations({ ...state, obligations: first.obligations }, 10);
    expect(second.obligations[0]!.budgetMinutes).toBe(0);
    expect(second.facts.join(' ')).toMatch(/time you said you would give is up/i);
  });

  it('counts an appointment kept when the player is standing in front of them', () => {
    const state = world();
    const who = charactersPresent(state)[0];
    if (!who) return;
    const withThem = {
      ...state,
      obligations: [{ ...at(20), withCharacterId: who.characterId }],
    };
    const settled = settleOnArrival(withThem, story, [who.characterId]);
    expect(settled[0]!.status).toBe('KEPT');
  });

  it('leaves it open while they are somewhere else', () => {
    const state = world();
    const settled = settleOnArrival(
      { ...state, obligations: [at(20)] },
      story,
      ['somebody-else'],
    );
    expect(settled[0]!.status).toBe('OPEN');
  });
});

describe('walking off the edge of the map', () => {
  it('names the new place in the run’s language, with the contraction', () => {
    // A French player walked off the map and arrived somewhere called
    // "Beyond Les", which is neither language. `de` + `les cabanons` is
    // `des cabanons`, and French contracts rather than concatenating.
    expect(beyondName('Les cabanons', 'fr')).toBe('Au-delà des cabanons');
    expect(beyondName('Le ponton', 'fr')).toBe('Au-delà du ponton');
    expect(beyondName('La pointe', 'fr')).toBe('Au-delà de la pointe');
    // Vowel-initial elides rather than contracting.
    expect(beyondName('Auberge', 'fr')).toBe('Au-delà d’Auberge');
  });

  it('leaves English exactly as it was', () => {
    // The English branch is byte-identical on purpose; French takes the other.
    expect(beyondName('The Dock', 'en')).toBe('Beyond The Dock');
    expect(beyondName(null, 'en')).toBe('Beyond here');
  });
});
