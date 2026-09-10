import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent, locationForSchedule } from '@aniplay/engine';
import { SEVEN_NAMES } from './index.js';

/**
 * Seven Names, held to the instruction the bible is most emphatic about and to
 * the class of failure no catalog-wide test can see.
 *
 * The instruction is a negative one: **do not hard-canon that the player is
 * innocent.** Valère is dead, the player was convicted, seven people had a
 * hand in it — and everything else, including whether they did it, is theirs.
 * A world that quietly assumes innocence in its copy has taken the best
 * decision in the story away before the player has typed anything, so this
 * checks the premise, the setup screen and the endings for it.
 *
 * The second is that the list is seven doors rather than seven villains, and
 * the fourth name is the proof. If she can be reached with a weapon and still
 * hand over what she has, the argument collapses.
 */

const start = (archetypeId = 'arch_thief') =>
  createInitialState({
    sessionId: 'sess_sn',
    story: SEVEN_NAMES,
    identity: {
      displayName: 'Aurélien Roche',
      pronouns: 'he/him',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

function settable(): Set<string> {
  const flags = new Set<string>(['left_the_map', 'qualified']);
  for (const quest of SEVEN_NAMES.quests) {
    for (const step of quest.steps) {
      for (const flag of step.rewards.flags) flags.add(flag);
      for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
    }
  }
  for (const event of SEVEN_NAMES.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  return flags;
}

describe('nobody in this world knows whether you did it', () => {
  it('never asserts innocence in the copy', () => {
    const copy = [SEVEN_NAMES.premise, SEVEN_NAMES.hook, SEVEN_NAMES.opening].join(' ').toLowerCase();
    // "Framed", "wrongly convicted" and "the real killer" are all the story
    // deciding for the player.
    for (const phrase of ['you were framed', 'wrongly convicted', 'you did not do it', 'the real killer', 'your innocence']) {
      expect(copy, phrase).not.toContain(phrase);
    }
  });

  it('asks the player what happened rather than telling them', () => {
    const field = SEVEN_NAMES.setupFields.find((f) => f.id === 'worldKnowsAboutYou')!;
    expect(field, 'nothing asks').toBeDefined();
    expect(field.label.toLowerCase()).toContain('what do you say happened');
    expect(field.helpText.toLowerCase()).toContain('guilty');
  });

  it('offers destinations that work from either position', () => {
    // Reclaiming the name is about the conviction being unsound, which is a
    // separate question from whether they did it — so the ending must not
    // require an innocence flag, because there is no such flag.
    const cleared = SEVEN_NAMES.endings.find((e) => e.id === 'end_the_name_returned')!;
    expect(cleared.requires.flagsSet).toEqual(['name_cleared']);
    expect(settable()).toContain('name_cleared');
  });
});

describe('the list is seven doors', () => {
  it('lets the fourth name be closed permanently by arriving badly', () => {
    // "If the player approaches her violently, they may never learn what
    // happened." That has to be an authored route with a flag on it, or the
    // world will quietly forgive it.
    const step = SEVEN_NAMES.quests
      .find((q) => q.id === 'q_the_fourth_name')!
      .steps.find((s) => s.id === 'go_and_see_her')!;
    const threatened = step.succeedWhenAny.find((r) => r.routeId === 'threatened_her')!;
    const asked = step.succeedWhenAny.find((r) => r.routeId === 'asked_her')!;
    expect(threatened.setsFlags).toContain('frightened_her');
    expect(threatened.closesFlags).toContain('anais_told_you');
    expect(asked.closesFlags).toContain('frightened_her');
  });

  it('gives her a reason rather than a role', () => {
    const anais = SEVEN_NAMES.characters.find((c) => c.id === 'anais')!;
    expect(anais.secrets.length).toBeGreaterThanOrEqual(2);
    expect(anais.startingRelationship.fear).toBeGreaterThan(30);
    expect(anais.boundaries.length).toBeGreaterThanOrEqual(2);
    // And the world event that would take her son again is preventable.
    const event = SEVEN_NAMES.worldEvents.find((e) => e.id === 'we_they_go_for_the_doctor')!;
    expect(event.cancelledByFlags.length).toBeGreaterThan(0);
  });

  it('never writes the seventh name as a man waiting in a castle', () => {
    // "Veyrac should not sit in a castle waiting to be the final boss." He has
    // a schedule, he moves first in the world events, and he can be dealt with
    // four different ways.
    const veyrac = SEVEN_NAMES.characters.find((c) => c.id === 'veyrac')!;
    expect(veyrac.schedule.length).toBeGreaterThanOrEqual(4);
    expect(SEVEN_NAMES.worldEvents.some((e) => e.setsFlags.includes('veyrac_moved_first'))).toBe(true);
    const step = SEVEN_NAMES.quests
      .find((q) => q.id === 'q_the_seventh_name')!
      .steps.find((s) => s.id === 'what_happens_to_him')!;
    expect(step.succeedWhenAny.length).toBeGreaterThanOrEqual(4);
    // Including one where he simply wins.
    expect(step.succeedWhenAny.some((r) => r.setsFlags.includes('veyrac_holds'))).toBe(true);
  });
});

describe('the cell has the man in the wall in it', () => {
  it('puts Marcel on the floor of the opening scene', () => {
    expect(charactersPresent(start()).map((c) => c.characterId)).toContain('marcel');
  });

  it('does not let anybody else be in a prison cell at one in the morning', () => {
    for (const c of SEVEN_NAMES.characters) {
      const placed = locationForSchedule(c.schedule, SEVEN_NAMES.rules.startWorldMinute) ?? c.homeLocationId;
      expect(placed, `${c.id} is nowhere at the starting minute`).not.toBeNull();
      if (c.id === 'marcel') continue;
      expect(placed, `${c.id} is in the cell`).not.toBe(SEVEN_NAMES.rules.startingLocationId);
    }
  });

  it('lets him die on the way out', () => {
    const step = SEVEN_NAMES.quests.find((q) => q.id === 'q_six_hours')!.steps.find((s) => s.id === 'the_water')!;
    expect(step.succeedWhenAny.some((r) => r.setsFlags.includes('marcel_died'))).toBe(true);
    expect(step.succeedWhenAny.some((r) => r.setsFlags.includes('marcel_lived'))).toBe(true);
  });

  it('lets the player stay in the cell, and calls that a route', () => {
    const step = SEVEN_NAMES.quests.find((q) => q.id === 'q_six_hours')!.steps[0]!;
    const refused = step.succeedWhenAny.find((r) => r.routeId === 'refused_him')!;
    expect(refused, 'there is no way to say no').toBeDefined();
    expect(refused.closesFlags).toContain('took_the_tunnel');
  });
});

describe('seven people, seven mouths', () => {
  const content = (text: string): Set<string> =>
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 3),
    );

  it('keeps every pair of them lexically apart', () => {
    const vocab = new Map(SEVEN_NAMES.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of SEVEN_NAMES.characters) {
      for (const b of SEVEN_NAMES.characters) {
        if (a.id >= b.id) continue;
        const va = vocab.get(a.id)!;
        const vb = vocab.get(b.id)!;
        const shared = [...va].filter((w) => vb.has(w)).length;
        const overlap = shared / Math.min(va.size, vb.size);
        expect(overlap, `${a.id} and ${b.id} share ${Math.round(overlap * 100)}% of their vocabulary`).toBeLessThan(0.3);
      }
    }
  });

  it('does not let two of them run the same rhetorical move', () => {
    const MOVES: Array<[string, RegExp]> = [
      ['negate-then-correct', /\bI(?:’m| am)? ?not (?:going to )?(?:say|tell|saying|telling)\b/i],
      ['not X but Y', /\bnot (?:a|an|the|merely|simply|just)?\s*[\w\s]{2,28},\s*but\s+/i],
      ['the kind of X that', /\bthe kind of \w+ that\b/i],
    ];
    for (const [label, pattern] of MOVES) {
      const users = SEVEN_NAMES.characters
        .filter((c) => c.voiceSamples.some((v) => pattern.test(v)))
        .map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('demonstrates each declared differentiator in the samples the writer gets', () => {
    const sample = (id: string) => SEVEN_NAMES.characters.find((c) => c.id === id)!.voiceSamples.join(' | ');
    // Céleste prices things.
    expect(sample('celeste').toLowerCase()).toMatch(/worth|costs|eleven thousand|beautiful safe/);
    // Veyrac frames arithmetic on the country's behalf and never sounds villainous.
    expect(sample('veyrac').toLowerCase()).toMatch(/counted|smaller number/);
    // Renaud numbers his facts and refuses to speculate.
    expect(sample('renaud').toLowerCase()).toMatch(/first,.*second,/s);
    expect(sample('renaud').toLowerCase()).toContain('speculate');
    // Marcel reaches for craft detail first.
    expect(sample('marcel').toLowerCase()).toMatch(/limestone|ink|letters|hands/);
    // Solène talks about publics rather than people.
    expect(sample('solene').toLowerCase()).toMatch(/opinion|circulation/);
    // Anaïs puts times and quantities in ordinary sentences.
    expect(sample('anais').toLowerCase()).toMatch(/eleven forty|forty-eight hours/);
    // Varenne talks about people as positions and exposure.
    expect(sample('varenne').toLowerCase()).toMatch(/position|sum/);
  });

  it('gives every one of them something to want, fear and refuse', () => {
    for (const c of SEVEN_NAMES.characters) {
      expect(c.fears.length, `${c.id} fears nothing`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values nothing`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} wants nothing privately`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} would do anything`).toBeGreaterThan(0);
      expect(c.goals.length, `${c.id} is not after anything`).toBeGreaterThan(0);
      expect(c.topics.length, `${c.id} cannot be asked about anything`).toBeGreaterThan(0);
      expect(c.voiceSamples.length, `${c.id} has too few samples`).toBeGreaterThanOrEqual(3);
      expect(c.speechStyle.length, `${c.id} has no declared voice`).toBeGreaterThan(60);
      expect(c.visualHook.length, `${c.id} is not memorable`).toBeGreaterThan(20);
      expect(c.gates.length, `${c.id} cannot be got closer to`).toBeGreaterThan(0);
      for (const secret of c.secrets) {
        expect(secret.revealHint.length, `${c.id}/${secret.id} has no way out`).toBeGreaterThan(10);
      }
    }
  });
});

describe('a legend is not the same as being hunted', () => {
  it('keeps the two meters doing different jobs', () => {
    // Heat is the police knowing where you are this week and it decays. The
    // alias is a public force and it never does — a legend does not cool off.
    const heat = SEVEN_NAMES.resources.find((r) => r.id === 'heat')!;
    const notoriety = SEVEN_NAMES.resources.find((r) => r.id === 'notoriety')!;
    expect(heat.regenPerHour).toBeLessThan(0);
    expect(notoriety.regenPerHour).toBe(0);
    // And the ability that builds one costs both, which is the trade.
    const card = SEVEN_NAMES.abilities.find((a) => a.id === 'let_them_know_who_did_it')!;
    expect(card.costs.map((c) => c.resourceId)).toEqual(expect.arrayContaining(['notoriety', 'heat']));
  });

  it('sends a man killed in a Paris street to the police, not to the papers', () => {
    expect(SEVEN_NAMES.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('heat');
    expect(SEVEN_NAMES.factions[0]?.id).toBe('faction_prefecture');
  });

  it('gives resting exactly one honest thing to restore', () => {
    expect(SEVEN_NAMES.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['condition']);
  });

  it('has something the player can do that moves each descending one', () => {
    for (const r of SEVEN_NAMES.resources) {
      if (r.polarity !== 'GOOD_LOW') continue;
      const driven = SEVEN_NAMES.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(driven, `nothing the player can do changes ${r.id}`).toBe(true);
    }
  });

  it('starts the player worn out, because they have been in a cell', () => {
    const condition = SEVEN_NAMES.resources.find((r) => r.id === 'condition')!;
    expect(condition.start).toBeLessThan(condition.max * 0.6);
  });

  it('describes every band as behaviour rather than as a measurement', () => {
    for (const r of SEVEN_NAMES.resources) {
      expect(r.visible, `${r.id} is on the screen`).toBe(false);
      expect(r.bands.length, `${r.id} has no bands`).toBeGreaterThanOrEqual(3);
      expect(Math.max(...r.bands.map((b) => b.upTo)), `${r.id} top band`).toBe(r.max);
      for (const band of r.bands) {
        expect(band.behaviour.length, `${r.id}@${band.upTo}`).toBeGreaterThan(80);
        expect(band.behaviour.toLowerCase()).not.toContain(r.name.toLowerCase());
      }
    }
  });
});

describe('the world moves without the player', () => {
  it('gives every scheduled pressure a way to be switched off', () => {
    const flags = settable();
    for (const id of ['we_veyrac_speaks', 'we_the_amnesty', 'we_the_circle_notices', 'we_they_go_for_the_doctor', 'we_the_reward', 'we_the_session_opens', 'we_nocturne_again']) {
      const event = SEVEN_NAMES.worldEvents.find((e) => e.id === id)!;
      expect(event, id).toBeDefined();
      expect(event.cancelledByFlags.length, `${id} fires whatever the player does`).toBeGreaterThan(0);
      for (const flag of event.cancelledByFlags) {
        expect(flags, `${id} is cancelled by "${flag}", which nothing sets`).toContain(flag);
      }
    }
  });

  it('lets the rival get there first', () => {
    const event = SEVEN_NAMES.worldEvents.find((e) => e.id === 'we_nocturne_again')!;
    expect(event.setsFlags).toContain('nocturne_struck_again');
    expect(event.cancelledByFlags).toContain('worked_it_out_together');
  });

  it('schedules everybody somewhere that exists', () => {
    const locations = new Set(SEVEN_NAMES.locations.map((l) => l.id));
    for (const c of SEVEN_NAMES.characters) {
      for (const block of c.schedule) {
        expect(locations, `${c.id} is scheduled into ${block.locationId}`).toContain(block.locationId);
      }
      if (c.homeLocationId) expect(locations, `${c.id} lives nowhere`).toContain(c.homeLocationId);
    }
  });
});

describe('where this can end up', () => {
  it('offers a loss reachable by being outrun rather than by being wrong', () => {
    const ending = SEVEN_NAMES.endings.find((e) => e.id === 'end_veyrac_wins')!;
    expect(ending.requires.minRelationship).toEqual([]);
    expect(ending.requires.hasItems).toEqual([]);
    expect(ending.requires.minFactionReputation).toEqual([]);
  });

  it('lets somebody simply leave the country, and early', () => {
    const walk = SEVEN_NAMES.endings.find((e) => e.id === 'end_the_road_out')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(26);
  });

  it('makes the archive decision cost something whichever way it goes', () => {
    for (const id of ['end_burn_the_registry', 'end_print_everything', 'end_the_eighth_name']) {
      const ending = SEVEN_NAMES.endings.find((e) => e.id === id)!;
      expect(ending, id).toBeDefined();
      expect(ending.condition.length, id).toBeGreaterThan(160);
      expect(ending.epilogue.length, id).toBeGreaterThan(160);
    }
  });

  it('uses the whole rarity range', () => {
    expect(new Set(SEVEN_NAMES.endings.map((e) => e.rarity)).size).toBe(4);
  });

  it('names only flags something in this world sets', () => {
    const flags = settable();
    const ENGINE = ['met:', 'spoke:', 'visited:', 'used:', 'knows:', 'route:', 'closed:'];
    for (const ending of SEVEN_NAMES.endings) {
      for (const flag of [...ending.requires.flagsSet, ...ending.requires.flagsUnset]) {
        if (ENGINE.some((p) => flag.startsWith(p))) continue;
        expect(flags, `${ending.name} needs "${flag}", which nothing sets`).toContain(flag);
      }
    }
  });
});

describe('the copy is the right length and says the right amount', () => {
  it('keeps the premise inside the window', () => {
    const words = SEVEN_NAMES.premise.trim().split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(120);
    expect(words).toBeLessThanOrEqual(250);
  });

  it('offers three responses that are answers rather than errands', () => {
    expect(SEVEN_NAMES.openingSuggestions.length).toBe(3);
    for (const s of SEVEN_NAMES.openingSuggestions) {
      expect(s.length).toBeLessThanOrEqual(320);
      expect(s, s).toMatch(/\bI\b/);
      expect(s).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Take|Escape|Refuse) /);
    }
  });

  it('does not answer its own mystery on the store card', () => {
    const premise = SEVEN_NAMES.premise.toLowerCase();
    expect(premise).not.toContain('registry');
    expect(premise).not.toContain('veyrac');
  });
});
