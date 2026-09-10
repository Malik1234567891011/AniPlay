import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent, locationForSchedule } from '@aniplay/engine';
import { RED_FLOOR } from './index.js';

/**
 * The Red Floor, held to the two arguments it is actually making.
 *
 * The first is that the room works *because* nothing in it is written down. A
 * world champion can be dropped down there and still be champion in the
 * morning, and that protection is what lets anybody find out what they are. So
 * the protection has to be fragile and losable, which is what Attention is,
 * and losing it has to be an authored destination rather than a warning.
 *
 * The second is that not everybody's arc is greatness. Koji has lost more than
 * he has won, will probably never be champion, and loves this. If his ending
 * reads as a consolation prize the world has failed at the thing it set out to
 * do, so it is checked for rarity, length and the absence of any comparison.
 *
 * And underneath both: Maki asked a boxer for one more round twenty years ago
 * and got it. Damage is therefore a real accumulating variable with a doctor
 * attached who can say no and mean it.
 */

const start = (archetypeId = 'arch_boxer') =>
  createInitialState({
    sessionId: 'sess_rf',
    story: RED_FLOOR,
    identity: {
      displayName: 'Hana Odagiri',
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
  for (const quest of RED_FLOOR.quests) {
    for (const step of quest.steps) {
      for (const flag of step.rewards.flags) flags.add(flag);
      for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
    }
  }
  for (const event of RED_FLOOR.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  return flags;
}

describe('nothing down there is written down', () => {
  it('makes losing the protection a destination rather than a warning', () => {
    const ending = RED_FLOOR.endings.find((e) => e.id === 'end_no_bell')!;
    expect(ending, 'the room can never actually be lost').toBeDefined();
    expect(ending.requires.flagsSet).toContain('the_room_is_exposed');
    expect(settable()).toContain('the_room_is_exposed');
  });

  it('lets it start going wrong without anybody having done anything wrong', () => {
    // A clip that is not even from this basement. Nobody in the room made a
    // mistake and the pressure arrives anyway, which is how this actually dies.
    const event = RED_FLOOR.worldEvents.find((e) => e.id === 'we_the_clip')!;
    expect(event.publicCopy.toLowerCase()).toContain('not this basement');
    expect(event.cancelledByFlags).toContain('the_heat_came_off');
  });

  it('sends being seen fighting to the meter that ends the room', () => {
    // PUBLIC_VIOLENCE raises the FIRST GOOD_LOW in array order by 20, and does
    // not read displayPriority. A fight outside the room bringing commissions
    // and press down on the room is the correct consequence.
    expect(RED_FLOOR.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('attention');
  });

  it('gives the room its own standing, separate from the sanctioned world', () => {
    const ids = RED_FLOOR.factions.map((f) => f.id);
    expect(ids).toEqual(expect.arrayContaining(['faction_floor', 'faction_commission', 'faction_promotion']));
    // And they are not the same ladder wearing two names.
    const floor = RED_FLOOR.factions.find((f) => f.id === 'faction_floor')!;
    const commission = RED_FLOOR.factions.find((f) => f.id === 'faction_commission')!;
    expect(floor.ranks.map((r) => r.label)).not.toEqual(commission.ranks.map((r) => r.label));
  });
});

describe('not everybody becomes champion', () => {
  it('gives the journeyman ending the same weight as the belt', () => {
    const koji = RED_FLOOR.endings.find((e) => e.id === 'end_kojis_answer')!;
    const belt = RED_FLOOR.endings.find((e) => e.id === 'end_world_belt')!;
    expect(koji, 'there is no ending for loving this and not being elite').toBeDefined();
    // Comparable length, because length is how a catalog signals which endings
    // it takes seriously.
    expect(koji.condition.length).toBeGreaterThan(belt.condition.length * 0.7);
    expect(koji.epilogue.length).toBeGreaterThan(belt.epilogue.length * 0.7);
    // And it is not gated behind having failed at something better.
    expect(koji.requires.flagsUnset).toEqual(expect.arrayContaining(['beat_daigo', 'won_the_belt']));
  });

  it('writes him as somebody who likes people rather than as a fool', () => {
    const koji = RED_FLOOR.characters.find((c) => c.id === 'koji')!;
    expect(koji.values.join(' ').toLowerCase()).toContain('whether or not anybody puts your face on a poster');
    expect(koji.fears.join(' ').toLowerCase()).toContain('being the joke');
    // He gives both halves of the record immediately if asked.
    expect(koji.voiceSamples.join(' ')).toContain('Fourteen and nineteen');
  });

  it('offers a destination for stopping while still capable', () => {
    const enough = RED_FLOOR.endings.find((e) => e.id === 'end_enough')!;
    expect(enough.requires.flagsSet).toContain('stopped_on_purpose');
    expect(enough.requires.flagsUnset).toContain('somebody_got_hurt');
  });
});

describe('the damage is real and there is a doctor', () => {
  it('accumulates and does not come back quickly', () => {
    const damage = RED_FLOOR.resources.find((r) => r.id === 'damage')!;
    expect(damage.polarity).toBe('GOOD_LOW');
    expect(damage.regenPerHour).toBeLessThan(0);
    expect(damage.regenPerHour, 'it heals faster than it accrues').toBeGreaterThan(-0.5);
    expect(damage.bands.length).toBeGreaterThanOrEqual(4);
  });

  it('makes going past the doctor an authored act with an authored price', () => {
    const ability = RED_FLOOR.abilities.find((a) => a.id === 'one_more_round')!;
    expect(ability.unlockedByDefault).toBe(false);
    expect(ability.requires.flagsSet).toEqual(['knows:what_it_costs']);
    const damageCost = ability.costs.find((c) => c.resourceId === 'damage')!;
    expect(damageCost.amount, 'the famous decision is cheap').toBeGreaterThanOrEqual(20);
    // And something has to actually grant it, or the route is dead.
    const grantors = RED_FLOOR.quests.flatMap((q) => q.steps).filter((s) => s.rewards.abilities.includes('one_more_round'));
    expect(grantors.length, 'nothing teaches it').toBe(1);
  });

  it('gives the cost an ending of its own', () => {
    const ending = RED_FLOOR.endings.find((e) => e.id === 'end_one_more_round')!;
    expect(ending.rarity, 'the ordinary outcome of bravery is treated as rare').toBe('COMMON');
    expect(ending.requires.minRelationship).toEqual([]);
    expect(ending.requires.hasItems).toEqual([]);
  });

  it('gives the doctor a refusal that is not a suggestion', () => {
    const mei = RED_FLOOR.characters.find((c) => c.id === 'mei')!;
    expect(mei.boundaries.join(' ').toLowerCase()).toContain('will not clear somebody because a fight is important');
    expect(mei.hiddenDrives.length).toBeGreaterThan(0);
    // Arguing with her is authored as a route, and it does not change the answer.
    const argued = RED_FLOOR.quests
      .flatMap((q) => q.steps)
      .flatMap((s) => s.succeedWhenAny)
      .find((r) => r.routeId === 'argued_with_her')!;
    expect(argued.setsFlags).toContain('knows:what_you_are_carrying');
  });

  it('gives resting exactly one honest thing to restore', () => {
    expect(RED_FLOOR.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['gas']);
  });

  it('has something the player can do that moves each descending one', () => {
    for (const r of RED_FLOOR.resources) {
      if (r.polarity !== 'GOOD_LOW') continue;
      const driven = RED_FLOOR.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(driven, `nothing the player can do changes ${r.id}`).toBe(true);
    }
  });

  it('describes every band as behaviour rather than as a measurement', () => {
    for (const r of RED_FLOOR.resources) {
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

describe('a style is a thing other people can read', () => {
  it('counts habits and gives each of them a counter', () => {
    expect(RED_FLOOR.tendencies.length).toBeGreaterThanOrEqual(4);
    const counters = RED_FLOOR.abilities.map((a) => a.countersTendency).filter(Boolean);
    const counted = new Set(RED_FLOOR.abilities.flatMap((a) => a.tendencies));
    expect(counted.size, 'nothing feeds the habit counters').toBeGreaterThanOrEqual(4);
    expect(counters.length, 'no habit has an answer to it').toBeGreaterThanOrEqual(3);
    for (const id of counters) {
      expect(RED_FLOOR.tendencies.map((t) => t.id), `${id} is countered and does not exist`).toContain(id);
    }
  });

  it('has somebody who actually studies the player', () => {
    const scouts = RED_FLOOR.characters.filter((c) => c.scouting !== null);
    expect(scouts.length, 'nobody watches film').toBeGreaterThanOrEqual(3);
    const riku = RED_FLOOR.characters.find((c) => c.id === 'riku')!;
    expect(riku.scouting!.learnRate).toBeGreaterThan(1.5);
    expect(riku.scouting!.revealCopy).not.toMatch(/tendency|scouted|counter/i);
  });

  it('makes the answer a second option rather than more conviction', () => {
    const step = RED_FLOOR.quests
      .find((q) => q.id === 'q_what_you_are')!
      .steps.find((s) => s.id === 'somebody_solves_you')!;
    const second = step.succeedWhenAny.find((r) => r.routeId === 'found_a_second_thing')!;
    const harder = step.succeedWhenAny.find((r) => r.routeId === 'went_through_it_anyway')!;
    expect(second.setsFlags).toContain('has_a_second_option');
    expect(harder.closesFlags).toContain('has_a_second_option');
  });
});

describe('the gym at twenty past midnight', () => {
  it('has the woman with the wrap in the room', () => {
    expect(charactersPresent(start()).map((c) => c.characterId)).toContain('aya');
  });

  it('does not let a world champion be standing in it', () => {
    for (const c of RED_FLOOR.characters) {
      const placed = locationForSchedule(c.schedule, RED_FLOOR.rules.startWorldMinute) ?? c.homeLocationId;
      expect(placed, `${c.id} is nowhere at the starting minute`).not.toBeNull();
      if (c.id === 'aya') continue;
      expect(placed, `${c.id} is upstairs in the opening scene`).not.toBe(RED_FLOOR.rules.startingLocationId);
    }
  });

  it('never pressures anybody onto the mats', () => {
    const step = RED_FLOOR.quests.find((q) => q.id === 'q_step_on')!.steps.find((s) => s.id === 'the_first_time')!;
    const refuse = step.succeedWhenAny.find((r) => r.routeId === 'said_no')!;
    expect(refuse, 'saying no is not authored').toBeDefined();
    expect(refuse.predicate.hasItems).toEqual([]);
    expect(refuse.predicate.minRelationship).toEqual([]);
    // And there is a whole route through the world that never fights at all.
    expect(step.succeedWhenAny.some((r) => r.routeId === 'cornered_somebody')).toBe(true);
  });

  it('schedules everybody somewhere that exists', () => {
    const locations = new Set(RED_FLOOR.locations.map((l) => l.id));
    for (const c of RED_FLOOR.characters) {
      for (const block of c.schedule) {
        expect(locations, `${c.id} is scheduled into ${block.locationId}`).toContain(block.locationId);
      }
      if (c.homeLocationId) expect(locations, `${c.id} lives nowhere`).toContain(c.homeLocationId);
    }
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
    const vocab = new Map(RED_FLOOR.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of RED_FLOOR.characters) {
      for (const b of RED_FLOOR.characters) {
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
      const users = RED_FLOOR.characters
        .filter((c) => c.voiceSamples.some((v) => pattern.test(v)))
        .map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('demonstrates each declared differentiator in the samples the writer gets', () => {
    const sample = (id: string) => RED_FLOOR.characters.find((c) => c.id === id)!.voiceSamples.join(' | ');
    // Aya sets a joke up and flattens it deliberately.
    expect(sample('aya').toLowerCase()).toMatch(/brave on a tuesday/);
    // Riku is minimal until it is technical, then two full minutes.
    expect(sample('riku').toLowerCase()).toMatch(/your weight is not|half-inch/);
    // Maki says whose decision it was, in the same voice as everything else.
    expect(sample('maki')).toContain('I asked him for another round.');
    // Mei gives a number and a timescale rather than an opinion.
    expect(sample('mei').toLowerCase()).toMatch(/six weeks/);
    // Junpei deflects onto whoever is asking within two sentences.
    expect(sample('junpei').toLowerCase()).toMatch(/never mind me/);
    // Koji gives both halves of his record without any performance.
    expect(sample('koji')).toContain('Fourteen and nineteen');
    // Daigo answers in proportion to how technical the question was.
    expect(sample('daigo').toLowerCase()).toMatch(/i drove an hour/);
  });

  it('gives every one of them something to want, fear and refuse', () => {
    for (const c of RED_FLOOR.characters) {
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

  it('gives everybody in this building a different definition of strength', () => {
    // The bible gives four of them one each and they are all defensible and
    // incomplete. They reach the writer through `values`.
    const values = RED_FLOOR.characters.map((c) => c.values.join(' ').toLowerCase());
    expect(values.some((v) => v.includes('knowing what you are responsible for'))).toBe(true);
    expect(values.some((v) => v.includes('poster'))).toBe(true);
    expect(values.some((v) => v.includes('enduring longer'))).toBe(true);
    expect(values.some((v) => v.includes('next forty years'))).toBe(true);
  });
});

describe('the world moves without the player', () => {
  it('gives every scheduled pressure a way to be switched off', () => {
    const flags = settable();
    for (const id of ['we_the_clip', 'we_riku_solves_you', 'we_junpei_takes_one', 'we_the_commission_asks', 'we_maki_leaves_the_book_out', 'we_daigo_comes_down', 'we_somebody_gets_hurt', 'we_the_offer']) {
      const event = RED_FLOOR.worldEvents.find((e) => e.id === id)!;
      expect(event, id).toBeDefined();
      expect(event.cancelledByFlags.length, `${id} fires whatever the player does`).toBeGreaterThan(0);
      for (const flag of event.cancelledByFlags) {
        expect(flags, `${id} is cancelled by "${flag}", which nothing sets`).toContain(flag);
      }
    }
  });

  it('moves people into the events that are about them', () => {
    const characters = new Set(RED_FLOOR.characters.map((c) => c.id));
    const locations = new Set(RED_FLOOR.locations.map((l) => l.id));
    for (const event of RED_FLOOR.worldEvents) {
      if (event.locationId) expect(locations, event.id).toContain(event.locationId);
      for (const move of event.movesCharacters) {
        expect(characters, `${event.id} moves ${move.characterId}`).toContain(move.characterId);
        expect(locations, `${event.id} moves somebody to ${move.toLocationId}`).toContain(move.toLocationId);
      }
    }
  });
});

describe('where this can end up', () => {
  it('lets somebody simply go home, and early', () => {
    const walk = RED_FLOOR.endings.find((e) => e.id === 'end_walk_away')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(26);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(RED_FLOOR.endings.map((e) => e.rarity)).size).toBe(4);
  });

  it('names only flags something in this world sets', () => {
    const flags = settable();
    const ENGINE = ['met:', 'spoke:', 'visited:', 'used:', 'knows:', 'route:', 'closed:'];
    for (const ending of RED_FLOOR.endings) {
      for (const flag of [...ending.requires.flagsSet, ...ending.requires.flagsUnset]) {
        if (ENGINE.some((p) => flag.startsWith(p))) continue;
        expect(flags, `${ending.name} needs "${flag}", which nothing sets`).toContain(flag);
      }
    }
  });
});

describe('the copy is the right length and says the right amount', () => {
  it('keeps the premise inside the window', () => {
    const words = RED_FLOOR.premise.trim().split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(120);
    expect(words).toBeLessThanOrEqual(250);
  });

  it('offers three responses that are answers rather than errands', () => {
    expect(RED_FLOOR.openingSuggestions.length).toBe(3);
    for (const s of RED_FLOOR.openingSuggestions) {
      expect(s.length).toBeLessThanOrEqual(320);
      expect(s, s).toMatch(/\bI\b/);
      expect(s).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Fight|Leave) /);
    }
  });

  it('does not put the champion on the store card', () => {
    const premise = RED_FLOOR.premise.toLowerCase();
    expect(premise).not.toContain('daigo');
    expect(premise).not.toContain('champion of');
  });
});
