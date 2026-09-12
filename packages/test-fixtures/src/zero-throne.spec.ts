import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent, locationForSchedule } from '@plotbreak/engine';
import { ZERO_THRONE } from './index.js';

/**
 * Zero Throne, held to the two things the bible is emphatic about and to the
 * class of failure no catalog-wide test can see.
 *
 * "Do not delay this behind onboarding" — the machine kneels on turn one, in
 * public, and refusing the cockpit has to be an authored route rather than an
 * absence. A world whose famous opening is gated behind a tutorial has broken
 * its own premise before the player has typed anything.
 *
 * And public reputation is deliberately not one number, because "Helion thinks
 * you are an asset and the Lysandra survivors think you are obscene" is the
 * normal state of anybody who gets into that cockpit. Six ladders, each of
 * which has to be climbable from where it actually starts — which is the trap
 * this world fell into on the first pass.
 */

const start = (archetypeId = 'arch_nobody') =>
  createInitialState({
    sessionId: 'sess_zt',
    story: ZERO_THRONE,
    identity: {
      displayName: 'Sena Okoro',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

function settable(): Set<string> {
  const flags = new Set<string>(['left_the_map', 'qualified']);
  for (const quest of ZERO_THRONE.quests) {
    for (const step of quest.steps) {
      for (const flag of step.rewards.flags) flags.add(flag);
      for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
    }
  }
  for (const event of ZERO_THRONE.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  return flags;
}

describe('the famous moment is turn one', () => {
  it('starts in the plaza at eight minutes past one', () => {
    expect(ZERO_THRONE.rules.startingLocationId).toBe('memorial_plaza');
    expect(ZERO_THRONE.rules.startWorldMinute).toBe(13 * 60 + 8);
  });

  it('has the one other person who did not run actually in the room', () => {
    // The opening ends on a woman with her sidearm out who is not pointing it
    // at the mech, and two of the three openingSuggestions address her. Her
    // schedule has to put her here or turn one reaches the writer with an
    // empty `speakers` list.
    expect(charactersPresent(start()).map((c) => c.characterId)).toContain('rhea');
  });

  it('does not let the rest of the cast wander into the plaza', () => {
    for (const c of ZERO_THRONE.characters) {
      const placed = locationForSchedule(c.schedule, ZERO_THRONE.rules.startWorldMinute) ?? c.homeLocationId;
      expect(placed, `${c.id} is nowhere at the starting minute`).not.toBeNull();
      if (c.id === 'rhea') continue;
      expect(placed, `${c.id} arrives in the opening scene by default`).not.toBe(
        ZERO_THRONE.rules.startingLocationId,
      );
    }
  });

  it('makes refusing the cockpit a route rather than an absence', () => {
    // "If they refuse the cockpit, the story continues. Vesper does not force
    // them inside." That has to be authored, or refusing is just failing to
    // trigger anything.
    const step = ZERO_THRONE.quests.find((q) => q.id === 'q_pilot_recognised')!.steps[0]!;
    const walk = step.succeedWhenAny.find((r) => r.routeId === 'walked_away')!;
    expect(walk, 'there is no way to say no').toBeDefined();
    expect(walk.setsFlags).toContain('refused_the_cockpit');
    expect(walk.predicate.hasItems).toEqual([]);
    expect(walk.predicate.minRelationship).toEqual([]);
    // And a run that refuses still has somewhere to go.
    const later = ZERO_THRONE.quests
      .flatMap((q) => q.steps)
      .flatMap((s) => s.succeedWhenAny)
      .filter((r) => r.predicate.flagsSet.includes('refused_the_cockpit'));
    expect(later.length, 'refusing dead-ends the story').toBeGreaterThanOrEqual(1);
  });
});

describe('six reputations, and every one of them climbable', () => {
  it('never gates on standing nothing can earn', () => {
    // Institutional standing can only ever *fall* unless a step awards it —
    // the engine drops it for public violence and nothing raises it. This
    // world shipped its first draft with two gates above their own ceiling.
    const earned = new Map(ZERO_THRONE.factions.map((f) => [f.id, f.startingReputation]));
    for (const archetype of ZERO_THRONE.archetypes) {
      for (const entry of archetype.startingReputation) {
        earned.set(entry.factionId, Math.max(earned.get(entry.factionId)!, ZERO_THRONE.factions.find((f) => f.id === entry.factionId)!.startingReputation + entry.amount));
      }
    }
    for (const quest of ZERO_THRONE.quests) {
      for (const step of quest.steps) {
        for (const entry of step.rewards.reputation) {
          earned.set(entry.factionId, (earned.get(entry.factionId) ?? 0) + entry.amount);
        }
      }
    }
    const gates = [
      ...ZERO_THRONE.endings.flatMap((e) => e.requires.minFactionReputation),
      ...ZERO_THRONE.quests.flatMap((q) =>
        q.steps.flatMap((s) => s.succeedWhenAny.flatMap((r) => r.predicate.minFactionReputation)),
      ),
    ];
    expect(gates.length, 'no faction gates at all, so the ladders are decoration').toBeGreaterThan(0);
    for (const gate of gates) {
      expect(earned.get(gate.factionId) ?? -100, `${gate.factionId} needs ${gate.value}`).toBeGreaterThanOrEqual(gate.value);
    }
  });

  it('gives every ladder a rung above where it starts', () => {
    for (const faction of ZERO_THRONE.factions) {
      expect(faction.ranks.length, `${faction.id} has no ladder`).toBeGreaterThanOrEqual(3);
      const top = Math.max(...faction.ranks.map((r) => r.atReputation));
      expect(top, `${faction.id} starts at its own ceiling`).toBeGreaterThan(faction.startingReputation);
    }
  });

  it('sends a fight on a neutral station to the people who administer neutrality', () => {
    // PUBLIC_VIOLENCE drops the FIRST faction in array order and raises the
    // FIRST GOOD_LOW resource. Neither reads displayPriority.
    expect(ZERO_THRONE.factions[0]?.id).toBe('faction_meridian');
    expect(ZERO_THRONE.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('pressure');
  });
});

describe('the machine has opinions and does not act on them', () => {
  it('makes Morrow somebody rather than a system', () => {
    const morrow = ZERO_THRONE.characters.find((c) => c.id === 'morrow')!;
    expect(morrow.fears.length).toBeGreaterThan(0);
    expect(morrow.boundaries.length).toBeGreaterThan(0);
    expect(morrow.secrets.length).toBeGreaterThanOrEqual(2);
    // "It should not casually override the player."
    expect(morrow.boundaries.join(' ').toLowerCase()).toContain('will not take control');
  });

  it('never gives it a probability to say out loud', () => {
    // The bible names the exact failure: "Based on probabilistic analysis, I
    // calculate a 73.4 percent chance". The samples the writer receives are
    // what stop that.
    const morrow = ZERO_THRONE.characters.find((c) => c.id === 'morrow')!;
    for (const sample of morrow.voiceSamples) {
      expect(sample, sample).not.toMatch(/\d+(\.\d+)?\s*(per ?cent|%)/i);
      expect(sample.toLowerCase()).not.toContain('probabil');
    }
    // And at least one of them is four words or fewer.
    expect(Math.min(...morrow.voiceSamples.map((v) => v.split(/\s+/).length))).toBeLessThanOrEqual(6);
  });

  it('keeps the reactor behind its consent rather than behind a level', () => {
    const hot = ZERO_THRONE.abilities.find((a) => a.id === 'run_it_hot')!;
    expect(hot.unlockedByDefault).toBe(false);
    expect(hot.requires.flagsSet).toEqual(['morrow_will_let_you']);
    expect(hot.requires.lockedCopy).not.toMatch(/flag|predicate|locked|requirement/i);
    expect(settable(), 'nothing ever lifts the limiter').toContain('morrow_will_let_you');
  });

  it('lets the player read its mind and makes that a decision', () => {
    // Reading the deleted sector over its objection is authored as its own
    // route, so the world can tell the difference afterwards.
    const routes = ZERO_THRONE.quests
      .flatMap((q) => q.steps)
      .flatMap((s) => s.succeedWhenAny)
      .map((r) => r.routeId);
    expect(routes).toContain('read_it_together');
    expect(routes).toContain('read_it_anyway');
    expect(routes).toContain('left_it_alone');
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
    const vocab = new Map(ZERO_THRONE.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of ZERO_THRONE.characters) {
      for (const b of ZERO_THRONE.characters) {
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
      const users = ZERO_THRONE.characters
        .filter((c) => c.voiceSamples.some((v) => pattern.test(v)))
        .map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('demonstrates each declared differentiator in the samples the writer gets', () => {
    const sample = (id: string) => ZERO_THRONE.characters.find((c) => c.id === id)!.voiceSamples.join(' | ');
    // Rhea talks about what people did, not what they meant.
    expect(sample('rhea').toLowerCase()).toMatch(/what you do now|habit/);
    // Mina uses technical specifics as affection.
    expect(sample('mina').toLowerCase()).toMatch(/actuator|reactor/);
    // Talon is never formal and admits he is working you.
    expect(sample('talon').toLowerCase()).toMatch(/sit down|i want something|charming/);
    // Orin refers to a dead pilot in the present tense and catches himself.
    expect(sample('orin')).toContain('Did. He did that.');
    // Venn concedes fully and it changes nothing.
    expect(sample('venn').toLowerCase()).toMatch(/you are right/);
    // Eli cites the report from memory and apologises for it.
    expect(sample('eli').toLowerCase()).toMatch(/section four|paragraph/);
  });

  it('gives every one of them something to want, fear and refuse', () => {
    for (const c of ZERO_THRONE.characters) {
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

describe('the second war is not owed to anybody', () => {
  it('gives every scheduled pressure a way to be switched off', () => {
    const flags = settable();
    for (const id of ['we_the_second_war', 'we_the_recall', 'we_the_first_engagement', 'we_rhea_has_an_order', 'we_talon_gets_the_order']) {
      const event = ZERO_THRONE.worldEvents.find((e) => e.id === id)!;
      expect(event, id).toBeDefined();
      expect(event.cancelledByFlags.length, `${id} fires whatever the player does`).toBeGreaterThan(0);
      for (const flag of event.cancelledByFlags) {
        expect(flags, `${id} is cancelled by "${flag}", which nothing sets`).toContain(flag);
      }
    }
  });

  it('lets one person on one station actually stop it', () => {
    const war = ZERO_THRONE.worldEvents.find((e) => e.id === 'we_the_second_war')!;
    expect(war.cancelledByFlags).toEqual(
      expect.arrayContaining(['nobody_fired_first', 'the_truth_is_out', 'holds_the_belt', 'left_the_map']),
    );
  });

  it('offers a loss reachable without a mistake', () => {
    // Two governments with eighteen years of momentum outrunning one person is
    // the ordinary way this ends and must not require playing badly.
    const ending = ZERO_THRONE.endings.find((e) => e.id === 'end_the_second_nine_day_war')!;
    expect(ending.requires.minRelationship).toEqual([]);
    expect(ending.requires.hasItems).toEqual([]);
    expect(ending.requires.minFactionReputation).toEqual([]);
  });

  it('lets somebody simply leave, and early', () => {
    const walk = ZERO_THRONE.endings.find((e) => e.id === 'end_walk_away')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(26);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(ZERO_THRONE.endings.map((e) => e.rarity)).size).toBe(4);
  });

  it('names only flags something in this world sets', () => {
    const flags = settable();
    const ENGINE = ['met:', 'spoke:', 'visited:', 'used:', 'knows:', 'route:', 'closed:'];
    for (const ending of ZERO_THRONE.endings) {
      for (const flag of [...ending.requires.flagsSet, ...ending.requires.flagsUnset]) {
        if (ENGINE.some((p) => flag.startsWith(p))) continue;
        expect(flags, `${ending.name} needs "${flag}", which nothing sets`).toContain(flag);
      }
    }
  });
});

describe('the state stays underneath the prose', () => {
  it('keeps three invisible banded variables', () => {
    expect(ZERO_THRONE.resources.length).toBe(3);
    for (const r of ZERO_THRONE.resources) {
      expect(r.visible, `${r.id} is on the screen`).toBe(false);
      expect(r.bands.length, `${r.id} has no bands`).toBeGreaterThanOrEqual(3);
      expect(Math.max(...r.bands.map((b) => b.upTo)), `${r.id} top band`).toBe(r.max);
      for (const band of r.bands) {
        expect(band.behaviour.length, `${r.id}@${band.upTo}`).toBeGreaterThan(80);
        expect(band.behaviour.toLowerCase()).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('gives resting exactly one honest thing to restore', () => {
    expect(ZERO_THRONE.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['nerve']);
  });

  it('has something the player can do that moves each descending one', () => {
    for (const r of ZERO_THRONE.resources) {
      if (r.polarity !== 'GOOD_LOW') continue;
      const driven = ZERO_THRONE.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(driven, `nothing the player can do changes ${r.id}`).toBe(true);
    }
  });

  it('lets the machine be repaired rather than only broken', () => {
    const wear = ZERO_THRONE.resources.find((r) => r.id === 'wear')!;
    expect(wear.regenPerHour, 'damage is permanent and the bottom bands are unreachable').toBeLessThan(0);
  });

  it('schedules everybody somewhere that exists', () => {
    const locations = new Set(ZERO_THRONE.locations.map((l) => l.id));
    for (const c of ZERO_THRONE.characters) {
      for (const block of c.schedule) {
        expect(locations, `${c.id} is scheduled into ${block.locationId}`).toContain(block.locationId);
      }
      if (c.homeLocationId) expect(locations, `${c.id} lives nowhere`).toContain(c.homeLocationId);
    }
  });
});

describe('the copy is the right length and says the right amount', () => {
  it('keeps the premise inside the window', () => {
    const words = ZERO_THRONE.premise.trim().split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(120);
    expect(words).toBeLessThanOrEqual(250);
  });

  it('offers three responses that are answers rather than errands', () => {
    expect(ZERO_THRONE.openingSuggestions.length).toBe(3);
    for (const s of ZERO_THRONE.openingSuggestions) {
      expect(s.length).toBeLessThanOrEqual(320);
      expect(s, s).toMatch(/\bI\b/);
      expect(s).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Climb|Enter|Get) /);
    }
  });

  it('does not answer its own mystery on the store card', () => {
    const premise = ZERO_THRONE.premise.toLowerCase();
    expect(premise).not.toContain('helios');
    expect(premise).not.toContain('morrow');
    expect(premise).not.toContain('autonomous');
  });
});
