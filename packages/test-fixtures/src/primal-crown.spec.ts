import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent, locationForSchedule } from '@plotbreak/engine';
import { PRIMAL_CROWN } from './index.js';

/**
 * Primal Crown, held to the promises that are specific to it.
 *
 * Two things make this world different from everything else in the catalog and
 * both of them are places it can quietly fail.
 *
 * It has five peoples and no global reputation number, because being trusted by
 * the river people and distrusted by the grassland riders is the normal state of
 * anybody useful here. So faction standing has to be genuinely per-faction, and
 * every rank ladder has to be climbable from where it starts.
 *
 * And the bond is an animal rather than a meter. The trap the engine sets for
 * that is precise: `resolveRest` refills every GOOD_HIGH resource, so a world
 * that models a mount's trust as ascending-good repairs a frightened animal
 * with a nap. This checks that it does not.
 */

const start = (archetypeId = 'arch_rider') =>
  createInitialState({
    sessionId: 'sess_pc',
    story: PRIMAL_CROWN,
    identity: {
      displayName: 'Ren Ashfall',
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
  for (const quest of PRIMAL_CROWN.quests) {
    for (const step of quest.steps) {
      for (const flag of step.rewards.flags) flags.add(flag);
      for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
    }
  }
  for (const event of PRIMAL_CROWN.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  return flags;
}

describe('the opening scene contains the opening scene', () => {
  it('has Kaia in the lane she is shouting across', () => {
    // The opening is a loose juvenile in a market lane and a woman in a red
    // sash asking "left side or right?", and all three openingSuggestions
    // answer her. Her schedule has to put her in `market_lanes` at minute 440
    // or turn one reaches the writer with an empty `speakers` list.
    expect(charactersPresent(start()).map((c) => c.characterId)).toContain('kaia');
  });

  it('does not let the other five wander into it', () => {
    for (const c of PRIMAL_CROWN.characters) {
      const placed = locationForSchedule(c.schedule, PRIMAL_CROWN.rules.startWorldMinute) ?? c.homeLocationId;
      expect(placed, `${c.id} is nowhere at the starting minute`).not.toBeNull();
      if (c.id === 'kaia') continue;
      expect(placed, `${c.id} arrives in the opening scene by default`).not.toBe(
        PRIMAL_CROWN.rules.startingLocationId,
      );
    }
  });

  it('names nobody in the prose who is not there', () => {
    const present = new Set(charactersPresent(start()).map((c) => c.characterId));
    for (const character of PRIMAL_CROWN.characters) {
      if (!PRIMAL_CROWN.opening.includes(character.name.split(' ')[0]!)) continue;
      expect(present, `the opening names ${character.name}, who is elsewhere`).toContain(character.id);
    }
  });

  it('opens on a situation rather than a fight', () => {
    // The bible is explicit that the loose animal is not a mandatory tutorial
    // combat. Walking away has to be an authored route, not an absence.
    const step = PRIMAL_CROWN.quests.find((q) => q.id === 'q_the_crossing')!.steps[0]!;
    const routes = step.succeedWhenAny.map((r) => r.routeId);
    expect(routes).toContain('let_it_run');
    expect(routes).toContain('cleared_the_lane');
    // And the walk-away route must not require anything but having been there.
    const walk = step.succeedWhenAny.find((r) => r.routeId === 'let_it_run')!;
    expect(walk.predicate.hasItems).toEqual([]);
    expect(walk.predicate.minRelationship).toEqual([]);
  });
});

describe('five peoples, five standings', () => {
  it('never collapses them into one reputation', () => {
    // The bible asks for qualitative per-faction standing rather than a global
    // score, which is what `FactionDef.ranks` is for. A world with one faction
    // has one meter with a noun on it.
    expect(PRIMAL_CROWN.factions.length).toBeGreaterThanOrEqual(5);
    for (const faction of PRIMAL_CROWN.factions) {
      expect(faction.ranks.length, `${faction.id} has no ladder`).toBeGreaterThanOrEqual(3);
      expect(faction.description.length, `${faction.id}`).toBeGreaterThan(60);
    }
  });

  it('gives every ladder a rung above where it starts', () => {
    // Institutional standing could only ever fall until `rewards.reputation`
    // existed. A rank whose threshold sits below the starting value is not a
    // thing anybody can climb to.
    for (const faction of PRIMAL_CROWN.factions) {
      const top = Math.max(...faction.ranks.map((r) => r.atReputation));
      expect(top, `${faction.id} starts at its own ceiling`).toBeGreaterThan(faction.startingReputation);
    }
  });

  it('sends a brawl at the crossing to the people whose law the crossing runs on', () => {
    // PUBLIC_VIOLENCE drops the FIRST faction in array order by 8, and raises
    // the FIRST GOOD_LOW resource by 20. Neither reads displayPriority. The
    // crossing is neutral ground because of Stoneback oath law, so that is who
    // a fight in the lanes costs you with.
    expect(PRIMAL_CROWN.factions[0]?.id).toBe('faction_stoneback');
    expect(PRIMAL_CROWN.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('unrest');
  });

  it('lets an archetype start as somebody to one of them', () => {
    const withStanding = PRIMAL_CROWN.archetypes.filter((a) => a.startingReputation.length > 0);
    expect(withStanding.length, 'no background counts as anybody anywhere').toBeGreaterThanOrEqual(4);
    const factions = new Set(PRIMAL_CROWN.factions.map((f) => f.id));
    for (const archetype of PRIMAL_CROWN.archetypes) {
      for (const entry of archetype.startingReputation) {
        expect(factions, `${archetype.id} -> ${entry.factionId}`).toContain(entry.factionId);
      }
    }
  });
});

describe('the animal is an animal', () => {
  it('never lets a nap repair a frightened mount', () => {
    // `resolveRest` restores every GOOD_HIGH resource. Modelling the bond as
    // ascending-good would mean an animal that has been ridden into the ground
    // and frightened forgives it because the rider slept. So the bond is
    // Wariness: descending, raised by specific acts, and falling only with time.
    expect(PRIMAL_CROWN.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['wind']);
    const wariness = PRIMAL_CROWN.resources.find((r) => r.id === 'wariness')!;
    expect(wariness.polarity).toBe('GOOD_LOW');
    expect(wariness.regenPerHour, 'nothing brings an animal back down').toBeLessThan(0);
  });

  it('makes the things that frighten it the things that raise it', () => {
    const raisers = PRIMAL_CROWN.abilities
      .filter((a) => a.costs.some((c) => c.resourceId === 'wariness'))
      .map((a) => a.id);
    expect(raisers).toEqual(expect.arrayContaining(['ride_it_down', 'work_by_fear']));
  });

  it('does not put a mount behind a background', () => {
    // "Bonding is not a class lock." Every route to an animal has to be open to
    // every archetype, and going without one has to be authored rather than
    // being what happens when you fail.
    const step = PRIMAL_CROWN.quests.find((q) => q.id === 'q_your_own_animal')!.steps[0]!;
    const onFoot = step.succeedWhenAny.find((r) => r.routeId === 'stayed_on_foot')!;
    expect(onFoot.setsFlags).toContain('on_foot_by_choice');
    expect(onFoot.predicate.hasItems).toEqual([]);
    expect(step.succeedWhenAny.length, 'only one way to end up mounted').toBeGreaterThanOrEqual(4);
  });

  it('keeps the largest animal in the world out of the cast list', () => {
    // White Maw is an animal. A CharacterDef would have to carry voiceSamples,
    // and the moment it has dialogue it stops being a predator and becomes a
    // person in a costume.
    expect(PRIMAL_CROWN.characters.some((c) => /maw/i.test(c.name))).toBe(false);
    // But it still has to be a destination somebody can reach.
    expect(settable()).toContain('bonded_white_maw');
    expect(settable()).toContain('killed_white_maw');
  });

  it('makes bonding it cost understanding rather than kindness', () => {
    // It flinches left because everything that ever hurt it came from the left.
    // Knowing that is the Ashen method, which is a thing somebody has to teach
    // you, so this is not a reward for being nice to an animal.
    const route = PRIMAL_CROWN.quests
      .flatMap((q) => q.steps)
      .flatMap((s) => s.succeedWhenAny)
      .find((r) => r.routeId === 'bonded_it')!;
    expect(route.predicate.flagsSet).toEqual(expect.arrayContaining(['knows:the_ashen_method', 'used:steady_it']));
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
    // Strip the speaker names off and a reader should still know who is
    // talking. Two people whose samples draw on the same words are one person
    // written twice, and this compares all fifteen pairs rather than spot
    // checking one construction.
    const vocab = new Map(PRIMAL_CROWN.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of PRIMAL_CROWN.characters) {
      for (const b of PRIMAL_CROWN.characters) {
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
      const users = PRIMAL_CROWN.characters
        .filter((c) => c.voiceSamples.some((v) => pattern.test(v)))
        .map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('demonstrates each declared differentiator in the samples the writer gets', () => {
    const sample = (id: string) => PRIMAL_CROWN.characters.find((c) => c.id === id)!.voiceSamples.join(' | ');

    // Kaia frames things as a bet or a race and cannot produce formal phrasing.
    expect(sample('kaia').toLowerCase()).toMatch(/fifty says|circle version/);
    // Suri answers in one clause and understates.
    expect(Math.min(...PRIMAL_CROWN.characters.find((c) => c.id === 'suri')!.voiceSamples.map((v) => v.length))).toBeLessThan(70);
    // Ilya prices things out loud, mid-sentence.
    expect(sample('ilya').toLowerCase()).toMatch(/blocks of salt|sold it|paid me/);
    // Torren cites a year and never says a flat no.
    expect(sample('torren').toLowerCase()).toMatch(/eleventh year|would have to be true/);
    // Mako names the tissue and the number.
    expect(sample('mako').toLowerCase()).toMatch(/tendon|twelve thousand/);
    // Vesh describes animals as mechanism and people almost never.
    expect(sample('vesh').toLowerCase()).toMatch(/hunger, a wound|approach from the right/);
  });

  it('gives every one of them something to want, fear and refuse', () => {
    for (const c of PRIMAL_CROWN.characters) {
      expect(c.fears.length, `${c.id} fears nothing`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values nothing`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} wants nothing privately`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} would do anything`).toBeGreaterThan(0);
      expect(c.goals.length, `${c.id} is not after anything`).toBeGreaterThan(0);
      expect(c.topics.length, `${c.id} cannot be asked about anything`).toBeGreaterThan(0);
      expect(c.voiceSamples.length, `${c.id} has too few samples`).toBeGreaterThanOrEqual(3);
      expect(c.speechStyle.length, `${c.id} has no declared voice`).toBeGreaterThan(60);
      expect(c.visualHook.length, `${c.id} is not memorable`).toBeGreaterThan(20);
      expect(c.silhouette.length, `${c.id} has no outline`).toBeGreaterThan(15);
      expect(c.gates.length, `${c.id} cannot be got closer to`).toBeGreaterThan(0);
      for (const secret of c.secrets) {
        expect(secret.revealHint.length, `${c.id}/${secret.id} has no way out`).toBeGreaterThan(10);
      }
    }
  });
});

describe('the world pressures can all be switched off', () => {
  it('never cancels an event on a flag nothing sets', () => {
    const flags = settable();
    for (const event of PRIMAL_CROWN.worldEvents) {
      for (const flag of event.cancelledByFlags) {
        expect(flags, `${event.id} is cancelled by "${flag}", which nothing sets`).toContain(flag);
      }
      for (const flag of event.requiresFlags) {
        if (flag.startsWith('knows:') || flag.startsWith('visited:') || flag.startsWith('spoke:')) continue;
        expect(flags, `${event.id} requires "${flag}", which nothing sets`).toContain(flag);
      }
    }
  });

  it('lets the corridor fight be prevented rather than merely survived', () => {
    const fight = PRIMAL_CROWN.worldEvents.find((e) => e.id === 'we_the_corridor_fight')!;
    expect(fight.cancelledByFlags.length).toBeGreaterThanOrEqual(3);
    expect(fight.cancelledByFlags).toEqual(
      expect.arrayContaining(['the_hand_is_named', 'one_fire_five_peoples', 'the_numbers_changed']),
    );
  });

  it('moves people into the events that are about them', () => {
    const characters = new Set(PRIMAL_CROWN.characters.map((c) => c.id));
    const locations = new Set(PRIMAL_CROWN.locations.map((l) => l.id));
    for (const event of PRIMAL_CROWN.worldEvents) {
      if (event.locationId) expect(locations, event.id).toContain(event.locationId);
      for (const move of event.movesCharacters) {
        expect(characters, `${event.id} moves ${move.characterId}`).toContain(move.characterId);
        expect(locations, `${event.id} moves somebody to ${move.toLocationId}`).toContain(move.toLocationId);
      }
    }
  });
});

describe('the world holds together on the ground', () => {
  it('schedules everybody somewhere that exists', () => {
    const locations = new Set(PRIMAL_CROWN.locations.map((l) => l.id));
    for (const c of PRIMAL_CROWN.characters) {
      for (const block of c.schedule) {
        expect(locations, `${c.id} is scheduled into ${block.locationId}`).toContain(block.locationId);
      }
      if (c.homeLocationId) expect(locations, `${c.id} lives nowhere`).toContain(c.homeLocationId);
    }
  });

  it('keeps the hidden places hidden and reachable', () => {
    for (const id of ['ashen_camp', 'blackglass_ridge', 'the_bone_caves', 'southern_grass']) {
      const location = PRIMAL_CROWN.locations.find((l) => l.id === id)!;
      expect(location, id).toBeDefined();
      expect(location.discoveredByDefault, `${id} is on the map from turn one`).toBe(false);
    }
    const edge = PRIMAL_CROWN.locations
      .find((l) => l.id === 'blackglass_ridge')!
      .connections.find((c) => c.to === 'ashen_camp')!;
    expect(edge.lockedByFlag).toBe('knows:the_ashen_camp');
  });

  it('describes every band as behaviour rather than as a measurement', () => {
    for (const r of PRIMAL_CROWN.resources) {
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

describe('where this can end up', () => {
  it('offers a loss reachable by playing well', () => {
    // You can spend three days being useful, honest and liked, never find out
    // about the fires on the ridge, and have two peoples meet at one water
    // anyway. It must not require a mistake.
    const ending = PRIMAL_CROWN.endings.find((e) => e.id === 'end_the_long_hunger')!;
    expect(ending.requires.minRelationship).toEqual([]);
    expect(ending.requires.hasItems).toEqual([]);
    expect(ending.requires.minFactionReputation).toEqual([]);
    expect(PRIMAL_CROWN.worldEvents.some((e) => e.setsFlags.includes('the_corridor_fight_happened'))).toBe(true);
  });

  it('lets somebody walk out of the politics entirely', () => {
    const walk = PRIMAL_CROWN.endings.find((e) => e.id === 'end_beyond_the_map')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(28);
  });

  it('offers more than one way for this to go badly', () => {
    const losses = ['end_the_long_hunger', 'end_the_one_you_lost', 'end_they_blamed_you', 'end_the_broken_migration'];
    for (const id of losses) expect(PRIMAL_CROWN.endings.some((e) => e.id === id), id).toBe(true);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(PRIMAL_CROWN.endings.map((e) => e.rarity)).size).toBe(4);
  });

  it('names only flags something in this world sets', () => {
    const flags = settable();
    const ENGINE = ['met:', 'spoke:', 'visited:', 'used:', 'knows:', 'route:', 'closed:'];
    for (const ending of PRIMAL_CROWN.endings) {
      for (const flag of [...ending.requires.flagsSet, ...ending.requires.flagsUnset]) {
        if (ENGINE.some((p) => flag.startsWith(p))) continue;
        expect(flags, `${ending.name} needs "${flag}", which nothing sets`).toContain(flag);
      }
    }
  });
});

describe('the copy is the right length and says the right amount', () => {
  it('keeps the premise inside the window', () => {
    const words = PRIMAL_CROWN.premise.trim().split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(120);
    expect(words).toBeLessThanOrEqual(250);
  });

  it('offers three responses that are answers rather than errands', () => {
    expect(PRIMAL_CROWN.openingSuggestions.length).toBe(3);
    for (const s of PRIMAL_CROWN.openingSuggestions) {
      expect(s.length).toBeLessThanOrEqual(320);
      expect(s, s).toMatch(/\bI\b/);
      expect(s).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Ride|Find|Calm) /);
    }
  });

  it('does not answer its own mystery on the store card', () => {
    // Why the herds turned is a promise with a payoff eleven miles up a ridge.
    const premise = PRIMAL_CROWN.premise.toLowerCase();
    expect(premise).not.toContain('volcan');
    expect(premise).not.toContain('ashen');
    expect(premise).not.toContain('white maw');
  });
});
