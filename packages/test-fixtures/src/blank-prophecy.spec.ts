import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent, locationForSchedule } from '@plotbreak/engine';
import { BLANK_PROPHECY } from './index.js';

/**
 * The Blank Prophecy, held to the one line of hard canon and to the thing that
 * line is most likely to get quietly violated by.
 *
 * The bible fixes exactly one fact — the Loom cannot currently read the player
 * — and explicitly leaves *why* open, listing eight possible explanations and
 * instructing that none be fixed early. A world that commits to one in its copy
 * has spent the best decision in the story before the player has typed
 * anything, so this checks that it does not.
 *
 * And blank is freedom, not invincibility. The failure mode is a world that
 * gives the player unreadability and forgets to charge for it, so the second
 * half of the costs is a resource with its own bands and its own drivers.
 */

const start = (archetypeId = 'arch_runner') =>
  createInitialState({
    sessionId: 'sess_bp',
    story: BLANK_PROPHECY,
    identity: {
      displayName: 'Nadia Farrell',
      pronouns: 'she/her',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

function settable(): Set<string> {
  const flags = new Set<string>(['left_the_map', 'qualified']);
  for (const quest of BLANK_PROPHECY.quests) {
    for (const step of quest.steps) {
      for (const flag of step.rewards.flags) flags.add(flag);
      for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
    }
  }
  for (const event of BLANK_PROPHECY.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  return flags;
}

describe('the one line of hard canon, and no more than that', () => {
  it('never commits to why the player is blank', () => {
    const copy = [
      BLANK_PROPHECY.premise,
      BLANK_PROPHECY.hook,
      BLANK_PROPHECY.opening,
      BLANK_PROPHECY.creatorNote,
      ...BLANK_PROPHECY.rules.hardCanon,
    ]
      .join(' ')
      .toLowerCase();
    // Every one of these is one of the bible's eight candidate explanations.
    // Committing to any of them in the world's own copy forecloses the rest.
    for (const phrase of ['you were hidden at birth', 'you are descended from', 'you come from another world', 'a god hid you', 'your future self']) {
      expect(copy, phrase).not.toContain(phrase);
    }
    // And the hard canon says only what it is allowed to say.
    const blankCanon = BLANK_PROPHECY.rules.hardCanon.find((l) => l.toLowerCase().includes('cannot currently read'))!;
    expect(blankCanon, 'the one fixed fact is not stated').toBeDefined();
    expect(blankCanon.toLowerCase()).toContain('open');
  });

  it('offers the player the theory rather than supplying one', () => {
    const field = BLANK_PROPHECY.setupFields.find((f) => f.id === 'why_you_are_blank')!;
    expect(field, 'nothing asks').toBeDefined();
    expect(field.options.length).toBeGreaterThanOrEqual(4);
    // Including having no theory at all, which has to be a real option.
    expect(field.options.some((o) => o.id === 'no_idea')).toBe(true);
    expect(field.helpText.toLowerCase()).toContain('will not decide without you');
  });
});

describe('blank is not invincibility', () => {
  it('charges for it with a meter that has its own bands', () => {
    const fray = BLANK_PROPHECY.resources.find((r) => r.id === 'fray')!;
    expect(fray, 'the hole costs nothing').toBeDefined();
    expect(fray.polarity).toBe('GOOD_LOW');
    expect(fray.bands.length).toBeGreaterThanOrEqual(4);
  });

  it('makes using the hole the thing that widens it', () => {
    const slip = BLANK_PROPHECY.abilities.find((a) => a.id === 'go_where_you_are_not_read')!;
    const name = BLANK_PROPHECY.abilities.find((a) => a.id === 'wear_the_name')!;
    expect(slip.costs.some((c) => c.resourceId === 'fray')).toBe(true);
    expect(name.costs.some((c) => c.resourceId === 'fray')).toBe(true);
  });

  it('lets the protections fail too, in an authored route', () => {
    // "Fate-based protections may also fail." That has to be a thing the player
    // can actually run into rather than a line in a lore document.
    const route = BLANK_PROPHECY.quests
      .flatMap((q) => q.steps)
      .flatMap((s) => s.succeedWhenAny)
      .find((r) => r.routeId === 'it_failed_you')!;
    expect(route, 'nothing ever fails on them').toBeDefined();
    expect(route.setsFlags).toContain('knows:what_it_costs');
  });

  it('gives the fix no shortcut', () => {
    // Closing the edges is days of nothing in a house with rules. There is no
    // ability that repairs it and there should not be.
    const closes = BLANK_PROPHECY.abilities.filter((a) => a.costs.some((c) => c.resourceId === 'fray' && c.amount < 0));
    expect(closes.length, 'something repairs the hole on demand').toBe(0);
    const fray = BLANK_PROPHECY.resources.find((r) => r.id === 'fray')!;
    expect(fray.regenPerHour, 'it never comes down at all').toBeLessThan(0);
  });

  it('gives resting exactly one honest thing to restore', () => {
    expect(BLANK_PROPHECY.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['footing']);
  });

  it('sends a mythic event in a crowded street to the gods, not to the hole', () => {
    expect(BLANK_PROPHECY.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('notice');
  });

  it('describes every band as behaviour rather than as a measurement', () => {
    for (const r of BLANK_PROPHECY.resources) {
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

describe('gods are characters, not vending machines', () => {
  it('gives every god a want, a fear and a boundary', () => {
    for (const id of ['hecate', 'hermes']) {
      const god = BLANK_PROPHECY.characters.find((c) => c.id === id)!;
      expect(god, id).toBeDefined();
      expect(god.hiddenDrives.length, `${id} wants nothing`).toBeGreaterThan(0);
      expect(god.fears.length, `${id} fears nothing`).toBeGreaterThan(0);
      expect(god.boundaries.length, `${id} would do anything`).toBeGreaterThan(0);
      expect(god.schedule.length, `${id} is nowhere`).toBeGreaterThan(0);
    }
  });

  it('never hands a Name over for free', () => {
    const step = BLANK_PROPHECY.quests
      .find((q) => q.id === 'q_a_name')!
      .steps.find((s) => s.id === 'somebody_offers')!;
    for (const route of step.succeedWhenAny) {
      if (route.routeId === 'took_none') continue;
      // Every route to a Name costs a relationship threshold or an oath.
      const priced =
        route.predicate.minRelationship.length > 0 || route.predicate.flagsSet.includes('used:swear_it');
      expect(priced, `${route.routeId} is free`).toBe(true);
    }
  });

  it('lets the player refuse all of them', () => {
    const step = BLANK_PROPHECY.quests
      .find((q) => q.id === 'q_a_name')!
      .steps.find((s) => s.id === 'somebody_offers')!;
    const none = step.succeedWhenAny.find((r) => r.routeId === 'took_none')!;
    expect(none, 'there is no way to carry nothing').toBeDefined();
    expect(none.setsFlags).toContain('carries_nothing');
    // And carrying nothing still leads somewhere.
    expect(settable()).toContain('stayed_unwritten');
  });
});

describe('the platform has the girl with the bow on it', () => {
  it('puts Thalia there at twenty-three forty-three', () => {
    expect(charactersPresent(start()).map((c) => c.characterId)).toContain('thalia');
  });

  it('does not let a god or an oracle be standing on it too', () => {
    for (const c of BLANK_PROPHECY.characters) {
      const placed = locationForSchedule(c.schedule, BLANK_PROPHECY.rules.startWorldMinute) ?? c.homeLocationId;
      expect(placed, `${c.id} is nowhere at the starting minute`).not.toBeNull();
      if (c.id === 'thalia') continue;
      expect(placed, `${c.id} is on the platform`).not.toBe(BLANK_PROPHECY.rules.startingLocationId);
    }
  });

  it('explains nothing about fate while the thing is attacking', () => {
    const step = BLANK_PROPHECY.quests.find((q) => q.id === 'q_the_last_train')!.steps[0]!;
    expect(step.directorNotes.toLowerCase()).toContain('do not explain');
    // And getting the bystanders out is a route, because that is who she is.
    expect(step.succeedWhenAny.some((r) => r.routeId === 'got_people_out')).toBe(true);
  });
});

describe('six people, six mouths', () => {
  const content = (text: string): Set<string> =>
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 3),
    );

  it('keeps every pair of them lexically apart', () => {
    const vocab = new Map(BLANK_PROPHECY.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of BLANK_PROPHECY.characters) {
      for (const b of BLANK_PROPHECY.characters) {
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
      const users = BLANK_PROPHECY.characters
        .filter((c) => c.voiceSamples.some((v) => pattern.test(v)))
        .map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('demonstrates each declared differentiator in the samples the writer gets', () => {
    const sample = (id: string) => BLANK_PROPHECY.characters.find((c) => c.id === id)!.voiceSamples.join(' | ');
    // Thalia gives instructions in twos and is sarcastic mid-emergency.
    expect(sample('thalia').toLowerCase()).toMatch(/hate that|left, not the stairs/);
    // Kyros builds a case in explicit steps and says Mara's name plainly.
    expect(sample('kyros')).toContain('Mara');
    expect(sample('kyros').toLowerCase()).toMatch(/an oracle says a thing/);
    // Hecate speaks in stated terms and never uses a metaphor.
    expect(sample('hecate').toLowerCase()).toMatch(/you may ask one thing|the payment is for the asking/);
    // Hermes prices things out loud, mid-sentence.
    expect(sample('hermes').toLowerCase()).toMatch(/here is the price|two euros/);
    // Despina issues domestic imperatives with the enormous thing underneath.
    expect(sample('despina').toLowerCase()).toMatch(/sit\. eat that|give me the bag/);
    // Eirene describes instruments and counts.
    expect(sample('eirene').toLowerCase()).toMatch(/four thousand and eleven|procedure is to destroy/);
  });

  it('gives every one of them something to want, fear and refuse', () => {
    for (const c of BLANK_PROPHECY.characters) {
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

describe('the antagonist is not wrong about everything', () => {
  it('makes the thing he objects to happen while the player is there', () => {
    // A nineteen-year-old taken into custody on a reading, this week, in this
    // city. His argument is much harder to dismiss with that in the world.
    const event = BLANK_PROPHECY.worldEvents.find((e) => e.id === 'we_a_bearer_is_taken')!;
    expect(event, 'nothing demonstrates his case').toBeDefined();
    expect(event.setsFlags).toContain('somebody_was_taken');
  });

  it('lets the player agree with him and act differently', () => {
    const ending = BLANK_PROPHECY.endings.find((e) => e.id === 'end_kyros_was_right')!;
    expect(ending, 'agreeing with him is not a destination').toBeDefined();
    expect(ending.requires.flagsUnset).toContain('joined_the_cut_thread');
  });

  it('lets him win without the player having made a mistake', () => {
    const ending = BLANK_PROPHECY.endings.find((e) => e.id === 'end_kyros_wins')!;
    expect(ending.requires.minRelationship).toEqual([]);
    expect(ending.requires.hasItems).toEqual([]);
    expect(ending.requires.minFactionReputation).toEqual([]);
  });
});

describe('the world moves without the player', () => {
  it('gives every scheduled pressure a way to be switched off', () => {
    const flags = settable();
    for (const id of ['we_the_second_one', 'we_thalia_gets_ordered', 'we_a_bearer_is_taken', 'we_the_fray_widens', 'we_kyros_moves', 'we_the_oracles_go_quiet', 'we_the_letter_arrives']) {
      const event = BLANK_PROPHECY.worldEvents.find((e) => e.id === id)!;
      expect(event, id).toBeDefined();
      expect(event.cancelledByFlags.length, `${id} fires whatever the player does`).toBeGreaterThan(0);
      for (const flag of event.cancelledByFlags) {
        expect(flags, `${id} is cancelled by "${flag}", which nothing sets`).toContain(flag);
      }
    }
  });

  it('schedules everybody somewhere that exists', () => {
    const locations = new Set(BLANK_PROPHECY.locations.map((l) => l.id));
    for (const c of BLANK_PROPHECY.characters) {
      for (const block of c.schedule) {
        expect(locations, `${c.id} is scheduled into ${block.locationId}`).toContain(block.locationId);
      }
      if (c.homeLocationId) expect(locations, `${c.id} lives nowhere`).toContain(c.homeLocationId);
    }
  });
});

describe('where this can end up', () => {
  it('lets somebody simply leave, and early', () => {
    const walk = BLANK_PROPHECY.endings.find((e) => e.id === 'end_walk_away')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(28);
  });

  it('offers a destination for carrying nothing', () => {
    const unwritten = BLANK_PROPHECY.endings.find((e) => e.id === 'end_unwritten')!;
    expect(unwritten.requires.flagsSet).toContain('stayed_unwritten');
  });

  it('uses the whole rarity range', () => {
    expect(new Set(BLANK_PROPHECY.endings.map((e) => e.rarity)).size).toBe(4);
  });

  it('names only flags something in this world sets', () => {
    const flags = settable();
    const ENGINE = ['met:', 'spoke:', 'visited:', 'used:', 'knows:', 'route:', 'closed:'];
    for (const ending of BLANK_PROPHECY.endings) {
      for (const flag of [...ending.requires.flagsSet, ...ending.requires.flagsUnset]) {
        if (ENGINE.some((p) => flag.startsWith(p))) continue;
        expect(flags, `${ending.name} needs "${flag}", which nothing sets`).toContain(flag);
      }
    }
  });
});

describe('the copy is the right length and says the right amount', () => {
  it('keeps the premise inside the window', () => {
    const words = BLANK_PROPHECY.premise.trim().split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(120);
    expect(words).toBeLessThanOrEqual(250);
  });

  it('offers three responses that are answers rather than errands', () => {
    expect(BLANK_PROPHECY.openingSuggestions.length).toBe(3);
    for (const s of BLANK_PROPHECY.openingSuggestions) {
      expect(s.length).toBeLessThanOrEqual(320);
      expect(s, s).toMatch(/\bI\b/);
      expect(s).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Run|Fight) /);
    }
  });

  it('does not answer its own mystery on the store card', () => {
    const premise = BLANK_PROPHECY.premise.toLowerCase();
    expect(premise).not.toContain('loom');
    expect(premise).not.toContain('shears');
    expect(premise).not.toContain('epithet');
  });
});
