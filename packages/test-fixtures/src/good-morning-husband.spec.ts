import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { GOOD_MORNING_HUSBAND, LAUNCH_CATALOG } from './index.js';

/**
 * Good Morning, Husband, held to the promise on its own card: that a player
 * who never wonders why they woke up still gets a whole game.
 *
 * The failure this world is most exposed to is the opposite of the usual one.
 * It is not that the mystery is unreachable — it is that the mystery leaks into
 * a run that did not ask for it, and a cosy domestic romance turns into a
 * puzzle about a railway platform on turn six.
 */

const start = (archetypeId = 'arch_hands') =>
  createInitialState({
    sessionId: 'sess_gmh',
    story: GOOD_MORNING_HUSBAND,
    identity: {
      displayName: 'Rowan Adeyemi',
      pronouns: 'he/him',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

describe('prose is prose', () => {
  it('never ships a literal backslash-n in anything a player reads', () => {
    // Written as '\\n\\n' in a TypeScript single-quoted string, a paragraph
    // break is two characters of garbage in the middle of the premise, and the
    // only thing that noticed was a paragraph-count assertion three packages
    // away. It is worth one cheap check across everybody.
    for (const story of LAUNCH_CATALOG) {
      for (const [field, text] of [
        ['premise', story.premise],
        ['opening', story.opening],
        ['hook', story.hook],
      ] as const) {
        expect(text, `${story.title}/${field}`).not.toContain('\\n');
      }
      for (const suggestion of story.openingSuggestions) {
        expect(suggestion, story.title).not.toContain('\\n');
      }
    }
  });
});

describe('the mystery is optional and behaves like it', () => {
  it('hides the whole Platform 11 lead behind a flag only a curious player sets', () => {
    const lead = GOOD_MORNING_HUSBAND.quests.find((q) => q.id === 'q_platform_eleven')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:the_seam']);
  });

  it('never sets that flag from a world event everybody gets', () => {
    // Both sources require the player to have done something deliberate:
    // gone through the flat, or gone to the station at night.
    const sources = GOOD_MORNING_HUSBAND.worldEvents.filter((e) => e.setsFlags.includes('knows:the_seam'));
    expect(sources.length, 'nothing opens the lead').toBeGreaterThanOrEqual(2);
    for (const event of sources) {
      expect(event.requiresFlags.length, `${event.id} fires for everybody`).toBeGreaterThan(0);
    }
  });

  it('keeps the locked ability locked, in the world’s own words', () => {
    const seam = GOOD_MORNING_HUSBAND.abilities.find((a) => a.id === 'chase_the_seam')!;
    expect(seam.requires.flagsSet).toEqual(['knows:the_seam']);
    expect(seam.requires.lockedCopy.length).toBeGreaterThan(30);
    expect(seam.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);
  });

  it('leaves most of the ending space reachable without it', () => {
    const mystery = new Set(['platform_answered', 'went_back', 'chose_to_stay', 'knows:what_happened']);
    const ordinary = GOOD_MORNING_HUSBAND.endings.filter(
      (e) => !e.requires.flagsSet.some((f) => mystery.has(f)),
    );
    expect(ordinary.length, 'the mystery gates too much').toBeGreaterThanOrEqual(8);
  });
});

describe('she is a person, not a meter', () => {
  it('is in the kitchen when the story starts', () => {
    expect(charactersPresent(start()).map((c) => c.characterId)).toContain('hana');
  });

  it('starts already loving the player, because the marriage already happened', () => {
    const hana = GOOD_MORNING_HUSBAND.characters.find((c) => c.id === 'hana')!;
    expect(hana.startingRelationship.affection).toBeGreaterThanOrEqual(65);
    expect(hana.startingRelationship.trust).toBeGreaterThanOrEqual(55);
  });

  it('gives her limits, a want of her own, and a way to refuse', () => {
    const hana = GOOD_MORNING_HUSBAND.characters.find((c) => c.id === 'hana')!;
    expect(hana.boundaries.length).toBeGreaterThanOrEqual(2);
    expect(hana.fears.length).toBeGreaterThanOrEqual(2);
    expect(hana.hiddenDrives.length).toBeGreaterThanOrEqual(2);
    expect(hana.secrets.length).toBeGreaterThanOrEqual(2);
    expect(hana.voiceSamples.length).toBeGreaterThanOrEqual(4);
  });

  it('gives the whole cast something to want, fear and refuse', () => {
    for (const c of GOOD_MORNING_HUSBAND.characters) {
      expect(c.fears.length, `${c.id} fears nothing`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values nothing`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} wants nothing privately`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} would do anything`).toBeGreaterThan(0);
      expect(c.goals.length, `${c.id} is not after anything`).toBeGreaterThan(0);
      expect(c.voiceSamples.length, `${c.id} has too few samples`).toBeGreaterThanOrEqual(3);
      for (const secret of c.secrets) expect(secret.revealHint.length, secret.id).toBeGreaterThan(10);
    }
  });

  it('does not let two people share a construction', () => {
    const MOVE = /\bI am not (?:upset|telling|asking|saying)\b/i;
    const users = GOOD_MORNING_HUSBAND.characters
      .filter((c) => c.voiceSamples.some((v) => MOVE.test(v)))
      .map((c) => c.id);
    expect(users.length, users.join(', ')).toBeLessThanOrEqual(2);
  });
});

describe('the marriage can genuinely fail', () => {
  it('has more than one way for it to end', () => {
    const endings = GOOD_MORNING_HUSBAND.endings.filter((e) => e.requires.flagsSet.includes('separated'));
    expect(endings.length, 'the marriage cannot end').toBeGreaterThanOrEqual(3);
  });

  it('lets it end because nobody said anything', () => {
    // The honest failure mode of a real marriage, reachable by playing
    // pleasantly and quietly for long enough. It must not require a mistake.
    const drift = GOOD_MORNING_HUSBAND.quests
      .flatMap((q) => q.steps)
      .flatMap((s) => s.succeedWhenAny)
      .find((r) => r.routeId === 'drifted')!;
    expect(drift.predicate.minRelationship).toEqual([]);
    expect(drift.predicate.hasItems).toEqual([]);
  });

  it('lets somebody walk out, and reaches that early', () => {
    const walk = GOOD_MORNING_HUSBAND.endings.find((e) => e.id === 'end_the_man_who_left')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(GOOD_MORNING_HUSBAND.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
  });
});

describe('the state is small and does the engine’s homework', () => {
  it('keeps three invisible banded variables', () => {
    expect(GOOD_MORNING_HUSBAND.resources.length).toBe(3);
    for (const r of GOOD_MORNING_HUSBAND.resources) {
      expect(r.visible, r.id).toBe(false);
      expect(r.bands.length, r.id).toBeGreaterThanOrEqual(3);
      expect(Math.max(...r.bands.map((b) => b.upTo)), r.id).toBe(r.max);
      for (const band of r.bands) {
        expect(band.behaviour.length, `${r.id}@${band.upTo}`).toBeGreaterThan(80);
        expect(band.behaviour.toLowerCase()).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('has something rest can restore, so resting is not a lie', () => {
    // `resolveRest` refills every GOOD_HIGH resource. A world with none prints
    // "you rest, and recover" and emits nothing — and a world whose only
    // GOOD_HIGH resource is a relationship meter refills the marriage with a
    // nap, which is worse.
    const high = GOOD_MORNING_HUSBAND.resources.filter((r) => r.polarity === 'GOOD_HIGH');
    expect(high.map((r) => r.id)).toEqual(['energy']);
  });

  it('spends the day rather than the marriage when a cost has no price on it', () => {
    // The generic cost path takes the lowest-displayPriority GOOD_HIGH resource
    // the player has more than 2 of.
    const cheapest = [...GOOD_MORNING_HUSBAND.resources]
      .filter((r) => r.polarity === 'GOOD_HIGH')
      .sort((a, b) => a.displayPriority - b.displayPriority)[0];
    expect(cheapest?.id).toBe('energy');
  });
});
