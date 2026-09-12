import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent, locationForSchedule } from '@plotbreak/engine';
import { FOURTH_BEAST } from './index.js';

/**
 * The Fourth Beast, held to the two decisions that make it work and to the
 * class of failure no catalog-wide test can see.
 *
 * The starter is the archetype. That is the whole structural bet: what you
 * picked out of three open habitats is what you can do for the rest of the
 * story, so every one of the three has to grant something the other two do
 * not, and refusing all three has to be a real option rather than a way of
 * ending up with nothing.
 *
 * And the creatures are deliberately not in the cast. A `CharacterDef` carries
 * `voiceSamples`, and the moment a creature has quotable dialogue it stops
 * being an animal. This checks that the line held.
 */

const start = (archetypeId = 'arch_aurel') =>
  createInitialState({
    sessionId: 'sess_fb',
    story: FOURTH_BEAST,
    identity: {
      displayName: 'Nour Bellanger',
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
  for (const quest of FOURTH_BEAST.quests) {
    for (const step of quest.steps) {
      for (const flag of step.rewards.flags) flags.add(flag);
      for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
    }
  }
  for (const event of FOURTH_BEAST.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  return flags;
}

describe('the room with three of them in it', () => {
  it('has the professor and the other candidate actually in it', () => {
    // The opening is Morel saying "choose" and Camille being sarcastic about
    // the selection process, and all three openingSuggestions address one or
    // the other. Their schedules have to put them here at 19:40.
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toContain('morel');
    expect(present).toContain('camille');
  });

  it('does not let the rest of Paris wander into the lab', () => {
    for (const c of FOURTH_BEAST.characters) {
      const placed = locationForSchedule(c.schedule, FOURTH_BEAST.rules.startWorldMinute) ?? c.homeLocationId;
      expect(placed, `${c.id} is nowhere at the starting minute`).not.toBeNull();
      if (c.id === 'morel' || c.id === 'camille') continue;
      expect(placed, `${c.id} arrives in the opening scene by default`).not.toBe(
        FOURTH_BEAST.rules.startingLocationId,
      );
    }
  });

  it('names nobody in the prose who is not there', () => {
    const present = new Set(charactersPresent(start()).map((c) => c.characterId));
    for (const character of FOURTH_BEAST.characters) {
      const first = character.name.split(' ')[0]!;
      if (!FOURTH_BEAST.opening.includes(first)) continue;
      expect(present, `the opening names ${character.name}, who is elsewhere`).toContain(character.id);
    }
  });
});

describe('the starter is the build', () => {
  it('gives each of the three something the other two do not', () => {
    const beasts = ['arch_aurel', 'arch_nox', 'arch_marea'].map(
      (id) => FOURTH_BEAST.archetypes.find((a) => a.id === id)!,
    );
    for (const beast of beasts) {
      expect(beast, 'a starter is missing').toBeDefined();
      expect(beast.startingAbilities.length, `${beast.id} grants no ability of its own`).toBe(1);
    }
    const granted = beasts.flatMap((b) => b.startingAbilities);
    expect(new Set(granted).size, 'two starters grant the same thing').toBe(3);
    // And each of those abilities exists and is not handed out by default.
    for (const id of granted) {
      const ability = FOURTH_BEAST.abilities.find((a) => a.id === id)!;
      expect(ability, id).toBeDefined();
      expect(ability.unlockedByDefault, `${id} is free to everybody`).toBe(false);
    }
  });

  it('lets somebody walk out of that room without one', () => {
    // "Player can refuse starter" is in the bible's hard canon section. A
    // refusal that grants nothing would be a trap dressed as a choice.
    const none = FOURTH_BEAST.archetypes.find((a) => a.id === 'arch_none')!;
    expect(none, 'there is no way to say no').toBeDefined();
    expect(none.startingAbilities).toEqual([]);
    const total =
      Object.keys(none.attributeBonus).length +
      Object.keys(none.skillProficiencies).length +
      none.startingItems.length;
    expect(total, 'refusing grants nothing at all').toBeGreaterThan(0);
  });

  it('keeps the animals out of the cast list', () => {
    // They are animals. A CharacterDef carries voiceSamples, and a creature
    // with quotable dialogue is a person in a costume.
    for (const name of ['Aurel', 'Nox', 'Marea', 'Alba']) {
      expect(
        FOURTH_BEAST.characters.some((c) => c.name.includes(name)),
        `${name} is in the cast list`,
      ).toBe(false);
    }
    // But the fourth one is still somewhere the player can arrive at.
    expect(settable()).toContain('knows:alba');
  });

  it('never lets the beast-specific abilities be free', () => {
    const beastOnly = ['run_it_down', 'burn_through', 'sound_the_walls'];
    const grantable = new Set([
      ...FOURTH_BEAST.archetypes.flatMap((a) => a.startingAbilities),
      ...FOURTH_BEAST.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ]);
    for (const id of beastOnly) {
      expect(grantable.has(id), `${id} is granted by nothing`).toBe(true);
    }
  });
});

describe('an impossible animal in a real city', () => {
  it('sends a creature being seen to the meter about being seen', () => {
    // PUBLIC_VIOLENCE raises the FIRST GOOD_LOW in array order by 20, and it
    // does not read displayPriority. Something impossible doing something
    // impossible in a crowded street is what Exposure is for.
    expect(FOURTH_BEAST.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('exposure');
    const attack = FOURTH_BEAST.abilities.find((a) => a.id === 'set_it_on_them')!;
    expect(attack.costs.map((c) => c.resourceId)).toEqual(expect.arrayContaining(['exposure', 'strain']));
  });

  it('gives resting exactly one honest thing to restore', () => {
    // A bond meter as GOOD_HIGH would mean `resolveRest` repairing a frightened
    // animal with a nap. Strain is descending and comes down with days instead.
    expect(FOURTH_BEAST.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['breath']);
    const strain = FOURTH_BEAST.resources.find((r) => r.id === 'strain')!;
    expect(strain.polarity).toBe('GOOD_LOW');
    expect(strain.regenPerHour, 'nothing brings it back down').toBeLessThan(0);
  });

  it('has something the player can do that moves each descending one', () => {
    for (const r of FOURTH_BEAST.resources) {
      if (r.polarity !== 'GOOD_LOW') continue;
      const driven = FOURTH_BEAST.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(driven, `nothing the player can do changes ${r.id}`).toBe(true);
    }
  });

  it('describes every band as behaviour rather than as a measurement', () => {
    for (const r of FOURTH_BEAST.resources) {
      expect(r.visible, `${r.id} is on the screen`).toBe(false);
      expect(r.bands.length, `${r.id} has no bands`).toBeGreaterThanOrEqual(3);
      expect(Math.max(...r.bands.map((b) => b.upTo)), `${r.id} top band`).toBe(r.max);
      for (const band of r.bands) {
        expect(band.behaviour.length, `${r.id}@${band.upTo}`).toBeGreaterThan(80);
        expect(band.behaviour.toLowerCase()).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('makes the city crossable rather than a list of names', () => {
    // A chase has to be able to run Métro -> street -> roof -> courtyard ->
    // bridge, so the map needs real edges rather than a hub with spokes.
    const edges = FOURTH_BEAST.locations.flatMap((l) => l.connections.map((c) => `${l.id}->${c.to}`));
    expect(edges.length, 'Paris is a hub and spokes').toBeGreaterThanOrEqual(28);
    const roofs = FOURTH_BEAST.locations.find((l) => l.id === 'the_roofline')!;
    expect(roofs.connections.length, 'the roofs go nowhere').toBeGreaterThanOrEqual(3);
  });

  it('keeps the underneath hidden until somebody finds it', () => {
    for (const id of ['service_tunnels', 'the_quarries', 'the_boundary']) {
      const location = FOURTH_BEAST.locations.find((l) => l.id === id)!;
      expect(location, id).toBeDefined();
      expect(location.discoveredByDefault, `${id} is on the map from turn one`).toBe(false);
    }
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
    const vocab = new Map(FOURTH_BEAST.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of FOURTH_BEAST.characters) {
      for (const b of FOURTH_BEAST.characters) {
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
      const users = FOURTH_BEAST.characters
        .filter((c) => c.voiceSamples.some((v) => pattern.test(v)))
        .map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('demonstrates each declared differentiator in the samples the writer gets', () => {
    const sample = (id: string) => FOURTH_BEAST.characters.find((c) => c.id === id)!.voiceSamples.join(' | ');
    // Camille answers questions with plans and stops being funny in danger.
    expect(sample('camille').toLowerCase()).toMatch(/let us go|put it away/);
    // Lucien never threatens and talks about living things as a category.
    expect(sample('lucien')).not.toMatch(/\bor else\b|\bif you don|\bI will kill\b/i);
    expect(sample('lucien').toLowerCase()).toMatch(/animal|alive|living/);
    // Lina fact-checks mid-sentence.
    expect(sample('lina').toLowerCase()).toMatch(/wait —|the report says/);
    // Morel apologises as punctuation and uses names not "subject".
    expect(sample('morel').toLowerCase()).toContain('sorry');
    expect(sample('morel').toLowerCase()).toContain('subject');
    // Ravel repeats your sentence back with one word changed.
    expect(sample('ravel').toLowerCase()).toContain('passing');
    // Théo counts things precisely inside loose sentences.
    expect(sample('theo')).toMatch(/\b(eighty-four|nineteen|eleven)\b/i);
  });

  it('gives every one of them something to want, fear and refuse', () => {
    for (const c of FOURTH_BEAST.characters) {
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

  it('never writes the antagonist as obviously the antagonist', () => {
    // "Do not make him look obviously evil in public." His boundaries and his
    // samples are what stop the writer reaching for a villain register.
    const lucien = FOURTH_BEAST.characters.find((c) => c.id === 'lucien')!;
    expect(lucien.boundaries.join(' ').toLowerCase()).toContain('will not harm an animal');
    expect(lucien.speechStyle.toLowerCase()).toContain('never threatens');
  });
});

describe('the world moves without the player', () => {
  it('gives every scheduled pressure a way to be switched off', () => {
    const flags = settable();
    for (const id of ['we_another_one', 'we_the_lab_is_found', 'we_lina_is_approached', 'we_the_city_notices', 'we_camille_gets_there_first']) {
      const event = FOURTH_BEAST.worldEvents.find((e) => e.id === id)!;
      expect(event, id).toBeDefined();
      expect(event.cancelledByFlags.length, `${id} fires whatever the player does`).toBeGreaterThan(0);
      for (const flag of event.cancelledByFlags) {
        expect(flags, `${id} is cancelled by "${flag}", which nothing sets`).toContain(flag);
      }
    }
  });

  it('lets the rival solve a piece of it while the player is elsewhere', () => {
    // "The player should sometimes discover: things happened while I was
    // somewhere else." That has to be authored, or it is a promise the
    // narrator makes and the engine never keeps.
    const event = FOURTH_BEAST.worldEvents.find((e) => e.id === 'we_camille_gets_there_first')!;
    expect(event.setsFlags).toContain('camille_got_there_first');
    const ending = FOURTH_BEAST.endings.find((e) => e.id === 'end_camille_wins')!;
    expect(ending, 'she can never actually win it').toBeDefined();
    expect(ending.requires.flagsSet).toContain('camille_got_there_first');
  });

  it('moves people into the events that are about them', () => {
    const characters = new Set(FOURTH_BEAST.characters.map((c) => c.id));
    const locations = new Set(FOURTH_BEAST.locations.map((l) => l.id));
    for (const event of FOURTH_BEAST.worldEvents) {
      if (event.locationId) expect(locations, event.id).toContain(event.locationId);
      for (const move of event.movesCharacters) {
        expect(characters, `${event.id} moves ${move.characterId}`).toContain(move.characterId);
        expect(locations, `${event.id} moves somebody to ${move.toLocationId}`).toContain(move.toLocationId);
      }
    }
  });

  it('schedules everybody somewhere that exists', () => {
    const locations = new Set(FOURTH_BEAST.locations.map((l) => l.id));
    for (const c of FOURTH_BEAST.characters) {
      for (const block of c.schedule) {
        expect(locations, `${c.id} is scheduled into ${block.locationId}`).toContain(block.locationId);
      }
      if (c.homeLocationId) expect(locations, `${c.id} lives nowhere`).toContain(c.homeLocationId);
    }
  });
});

describe('where this can end up', () => {
  it('offers a loss reachable by being slow rather than wrong', () => {
    const ending = FOURTH_BEAST.endings.find((e) => e.id === 'end_empty_lab')!;
    expect(ending.requires.minRelationship).toEqual([]);
    expect(ending.requires.hasItems).toEqual([]);
    expect(ending.requires.minFactionReputation).toEqual([]);
  });

  it('lets somebody simply keep the animal and go, and early', () => {
    const walk = FOURTH_BEAST.endings.find((e) => e.id === 'end_just_us')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(28);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(FOURTH_BEAST.endings.map((e) => e.rarity)).size).toBe(4);
  });

  it('names only flags something in this world sets', () => {
    const flags = settable();
    const ENGINE = ['met:', 'spoke:', 'visited:', 'used:', 'knows:', 'route:', 'closed:'];
    for (const ending of FOURTH_BEAST.endings) {
      for (const flag of [...ending.requires.flagsSet, ...ending.requires.flagsUnset]) {
        if (ENGINE.some((p) => flag.startsWith(p))) continue;
        expect(flags, `${ending.name} needs "${flag}", which nothing sets`).toContain(flag);
      }
    }
  });
});

describe('the copy is the right length and says the right amount', () => {
  it('keeps the premise inside the window', () => {
    const words = FOURTH_BEAST.premise.trim().split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(120);
    expect(words).toBeLessThanOrEqual(250);
  });

  it('offers three responses that are answers rather than errands', () => {
    expect(FOURTH_BEAST.openingSuggestions.length).toBe(3);
    for (const s of FOURTH_BEAST.openingSuggestions) {
      expect(s.length).toBeLessThanOrEqual(320);
      expect(s, s).toMatch(/\bI\b/);
      expect(s).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Pick|Choose|Take) /);
    }
  });

  it('does not answer its own mystery on the store card', () => {
    const premise = FOURTH_BEAST.premise.toLowerCase();
    expect(premise).not.toContain('quarr');
    expect(premise).not.toContain('alba');
    expect(premise).not.toContain('boundary');
    expect(premise).not.toContain('still alive');
  });
});
