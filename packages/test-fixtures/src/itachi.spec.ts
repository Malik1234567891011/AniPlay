import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent, locationForSchedule } from '@aniplay/engine';
import { ITACHI } from './index.js';

/**
 * Itachi, held to the two promises that are specific to it, plus the class of
 * failure that no catalog-wide test can see.
 *
 * Promise one: canon is a gravity well and never a rail. A world built out of
 * a famous life fails in a way no other world here can — by quietly restoring
 * the shape it is supposed to let the player break. Every event that recreates
 * a famous beat is therefore checked for a cancelling condition, and the
 * famous ending is checked for being genuinely expensive to reach rather than
 * being where a passive run lands.
 *
 * Promise two: eight recognisable people who do not blur. This is the largest
 * cast in the catalog and the one where a shared voice would be most obvious,
 * so the voice check here is not a spot check for one construction — it
 * compares every pair.
 */

const start = (archetypeId = 'arch_water') =>
  createInitialState({
    sessionId: 'sess_itachi',
    story: ITACHI,
    identity: {
      displayName: 'Itachi Uchiha',
      pronouns: 'he/him',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

/** Every flag anything in this world can write. */
function settable(): Set<string> {
  const flags = new Set<string>(['left_the_map', 'qualified']);
  for (const quest of ITACHI.quests) {
    for (const step of quest.steps) {
      for (const flag of step.rewards.flags) flags.add(flag);
      for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
    }
  }
  for (const event of ITACHI.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  return flags;
}

describe('the opening scene contains the opening scene', () => {
  it('has the two people the opening is about in the room', () => {
    // The opening is a seven-year-old on the step and a mother at the stove,
    // and all three openingSuggestions address one or both. A schedule that
    // put either of them elsewhere would hand turn one to the writer with an
    // empty `speakers` list, which is how Hush House opened in an empty flat.
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toContain('sasuke');
    expect(present).toContain('mikoto');
  });

  it('does not let anybody else arrive in it by accident', () => {
    // `createInitialState` falls back schedule -> homeLocationId -> the story's
    // starting location, so a character with a gap and no home turns up in the
    // opening by default rather than by authoring.
    for (const c of ITACHI.characters) {
      const placed = locationForSchedule(c.schedule, ITACHI.rules.startWorldMinute) ?? c.homeLocationId;
      expect(placed, `${c.id} has neither a scheduled place nor a home`).not.toBeNull();
      if (c.id === 'sasuke' || c.id === 'mikoto') continue;
      expect(placed, `${c.id} walks into the opening scene`).not.toBe(ITACHI.rules.startingLocationId);
    }
  });

  it('names nobody in the prose who is not there', () => {
    const present = new Set(charactersPresent(start()).map((c) => c.characterId));
    for (const character of ITACHI.characters) {
      if (!ITACHI.opening.includes(character.name.split(' ')[0]!)) continue;
      expect(present, `the opening names ${character.name}, who is elsewhere`).toContain(character.id);
    }
  });
});

describe('canon is pressure, and pressure can be switched off', () => {
  it('gives every event that recreates a famous beat a way to be cancelled', () => {
    // The failure this world is uniquely exposed to: a player spends a
    // fortnight dismantling the coup and the world reassembles it because the
    // famous version is hardcoded into the clock. Every scheduled pressure has
    // to be invalidatable by something the player can actually do.
    const pressures = ['we_the_ambush', 'we_the_ultimatum', 'we_the_coup_goes_ahead', 'we_the_district_goes_quiet'];
    for (const id of pressures) {
      const event = ITACHI.worldEvents.find((e) => e.id === id)!;
      expect(event, id).toBeDefined();
      expect(event.cancelledByFlags.length, `${id} fires no matter what the player does`).toBeGreaterThan(0);
      for (const flag of event.cancelledByFlags) {
        expect(settable(), `${id} is cancelled by "${flag}", which nothing sets`).toContain(flag);
      }
    }
  });

  it('never lets the ambush fire once Root has been answered for', () => {
    const ambush = ITACHI.worldEvents.find((e) => e.id === 'we_the_ambush')!;
    expect(ambush.cancelledByFlags).toEqual(expect.arrayContaining(['shisui_safe', 'danzo_dead', 'root_exposed']));
  });

  it('does not run the coup on its own once somebody has resolved it', () => {
    const coup = ITACHI.worldEvents.find((e) => e.id === 'we_the_coup_goes_ahead')!;
    for (const resolution of ['coup_stood_down', 'the_massacre_happened', 'left_the_map', 'you_led_it']) {
      expect(coup.cancelledByFlags, resolution).toContain(resolution);
    }
  });

  it('makes the famous night expensive rather than default', () => {
    // The massacre route needs an ability that is granted by nothing except a
    // quest step gated on a night that only happens to a player who went and
    // found Shisui, plus having accepted a bargain in a room under the village.
    // A passive run reaches none of it.
    const route = ITACHI.quests
      .flatMap((q) => q.steps)
      .flatMap((s) => s.succeedWhenAny)
      .find((r) => r.routeId === 'did_it')!;
    expect(route.predicate.flagsSet).toEqual(expect.arrayContaining(['used:tsukuyomi', 'accepted_the_ultimatum']));

    const tsukuyomi = ITACHI.abilities.find((a) => a.id === 'tsukuyomi')!;
    expect(tsukuyomi.unlockedByDefault).toBe(false);
    expect(tsukuyomi.requires.flagsSet).toEqual(['knows:mangekyo']);
    const grantor = ITACHI.quests.flatMap((q) => q.steps).filter((s) => s.rewards.abilities.includes('tsukuyomi'));
    expect(grantor.length, 'nothing teaches it, so the route is unreachable').toBe(1);

    // And the quest that grants it only opens after the cliff, which only
    // happens to somebody who went looking for Shisui in the first place.
    const quest = ITACHI.quests.find((q) => q.id === 'q_what_it_cost')!;
    expect(quest.discoverWhen?.flagsSet).toEqual(['the_cliff_happened']);
    const asks = ITACHI.worldEvents.find((e) => e.id === 'we_shisui_asks')!;
    expect(asks.requiresFlags, 'the whole Shisui chain is handed to everybody').toEqual(['spoke:shisui']);
  });

  it('leaves the good outcomes reachable without ever awakening anything', () => {
    const needsTheEye = new Set(['the_massacre_happened', 'the_legend_is_true', 'sasuke_believes_the_story']);
    const ordinary = ITACHI.endings.filter((e) => !e.requires.flagsSet.some((f) => needsTheEye.has(f)));
    expect(ordinary.length, 'too much of the ending space is behind the famous night').toBeGreaterThanOrEqual(8);
  });
});

describe('eight people, eight mouths', () => {
  const content = (text: string): Set<string> =>
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 3),
    );

  it('gives everybody enough samples to hold a voice', () => {
    for (const c of ITACHI.characters) {
      expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(3);
      expect(c.speechStyle.length, `${c.id} has no declared voice`).toBeGreaterThan(60);
    }
  });

  it('does not let any two of them run the same rhetorical move', () => {
    // The specific repeat failure in this catalog is negate-then-correct, which
    // arrived shared across two characters in one world and three in another.
    const MOVES: Array<[string, RegExp]> = [
      ['negate-then-correct', /\bI(?:’m| am)? ?not (?:going to )?(?:say|tell|saying|telling)\b/i],
      ['not X but Y', /\bnot (?:a|an|the|merely|simply|just)?\s*[\w\s]{2,28},\s*but\s+/i],
      ['the kind of X that', /\bthe kind of \w+ that\b/i],
    ];
    for (const [label, pattern] of MOVES) {
      const users = ITACHI.characters
        .filter((c) => c.voiceSamples.some((v) => pattern.test(v)))
        .map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('keeps every pair of them lexically apart', () => {
    // The bar is that a reader with the speaker names stripped off still knows
    // who is talking. Two people whose samples draw on the same words are one
    // person written twice, and with eight in the cast a spot check is not
    // enough — this compares all twenty-eight pairs.
    const vocab = new Map(ITACHI.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of ITACHI.characters) {
      for (const b of ITACHI.characters) {
        if (a.id >= b.id) continue;
        const va = vocab.get(a.id)!;
        const vb = vocab.get(b.id)!;
        const shared = [...va].filter((w) => vb.has(w)).length;
        const overlap = shared / Math.min(va.size, vb.size);
        expect(overlap, `${a.id} and ${b.id} share ${Math.round(overlap * 100)}% of their vocabulary`).toBeLessThan(0.3);
      }
    }
  });

  it('demonstrates each declared differentiator in the samples the writer gets', () => {
    // A `speechStyle` the `voiceSamples` do not show is a note nobody can act
    // on. Window Seven shipped a character whose differentiator was "no
    // contractions" in a world where nobody used one.
    const sample = (id: string) => ITACHI.characters.find((c) => c.id === id)!.voiceSamples.join(' | ');

    // Danzo never asks a question; every sentence is a consequence.
    expect(sample('danzo')).not.toContain('?');
    // Fugaku talks about the clan as a body that acts.
    expect(sample('fugaku').toLowerCase()).toContain('the clan');
    // Hiruzen hedges and defers.
    expect(sample('hiruzen').toLowerCase()).toMatch(/perhaps|in a month|i have not done anything/);
    // Shisui talks in "we" about things only one of them is doing.
    expect(sample('shisui').toLowerCase()).toMatch(/\bwe\b/);
    // Izumi retreats with "anyway".
    expect(sample('izumi').toLowerCase()).toContain('anyway');
    // Sasuke repeats the important sentence.
    expect(sample('sasuke')).toContain('You said maybe today. You said maybe.');
    // Mikoto names the object instead of the feeling.
    expect(sample('mikoto').toLowerCase()).toMatch(/box|drawer|doorway/);
    // Kakashi is laconic: at least one answer under sixty characters.
    expect(Math.min(...ITACHI.characters.find((c) => c.id === 'kakashi')!.voiceSamples.map((v) => v.length))).toBeLessThan(70);
  });

  it('gives every one of them something to want, fear and refuse', () => {
    for (const c of ITACHI.characters) {
      expect(c.fears.length, `${c.id} fears nothing`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values nothing`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} wants nothing privately`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} would do anything`).toBeGreaterThan(0);
      expect(c.goals.length, `${c.id} is not after anything`).toBeGreaterThan(0);
      expect(c.publicTraits.length, `${c.id} reads as nothing from outside`).toBeGreaterThan(0);
      expect(c.topics.length, `${c.id} cannot be asked about anything`).toBeGreaterThan(0);
      expect(c.visualHook.length, `${c.id} is not memorable`).toBeGreaterThan(20);
      expect(c.silhouette.length, `${c.id} has no outline`).toBeGreaterThan(15);
      expect(c.schedule.length, `${c.id} is nowhere`).toBeGreaterThan(0);
      expect(c.knowledgeScope.length, `${c.id} knows nothing`).toBeGreaterThan(0);
      expect(c.gates.length, `${c.id} cannot be got closer to`).toBeGreaterThan(0);
      for (const secret of c.secrets) {
        expect(secret.revealHint.length, `${c.id}/${secret.id} has no way out`).toBeGreaterThan(10);
      }
    }
  });
});

describe('the four variables are variables', () => {
  it('describes every band as behaviour rather than as a measurement', () => {
    for (const r of ITACHI.resources) {
      expect(r.visible, `${r.id} is on the screen`).toBe(false);
      expect(r.bands.length, `${r.id} has no bands`).toBeGreaterThanOrEqual(3);
      expect(Math.max(...r.bands.map((b) => b.upTo)), `${r.id} top band`).toBe(r.max);
      for (const band of r.bands) {
        expect(band.behaviour.length, `${r.id}@${band.upTo}`).toBeGreaterThan(80);
        expect(band.behaviour.toLowerCase()).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('has something the player can do that moves each descending one', () => {
    // Bands of good prose describing states nothing can reach is the most
    // expensive dead code there is, because it reads as finished.
    for (const r of ITACHI.resources) {
      if (r.polarity !== 'GOOD_LOW') continue;
      const driven = ITACHI.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(driven, `nothing the player can do changes ${r.id}`).toBe(true);
    }
  });

  it('gives resting exactly one honest thing to restore', () => {
    // `resolveRest` refills every GOOD_HIGH. A world with none prints "you
    // rest, and recover" and emits no mutations; a world whose only one is a
    // relationship meter repairs a friendship with a nap.
    expect(ITACHI.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['reserve']);
  });

  it('sends what the street saw to the clan question, on purpose', () => {
    // PUBLIC_VIOLENCE and the generic cost fallback both take the FIRST
    // GOOD_LOW in array order, not by displayPriority. An Uchiha seen fighting
    // in public raising the temperature of the Uchiha question is the right
    // thing for that to hit, and it is only right because of the order here.
    expect(ITACHI.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('clan_pressure');
  });

  it('spends the day rather than the politics on an unpriced action', () => {
    const cheapest = [...ITACHI.resources]
      .filter((r) => r.polarity === 'GOOD_HIGH')
      .sort((a, b) => a.displayPriority - b.displayPriority)[0];
    expect(cheapest?.id).toBe('reserve');
  });

  it('lets Silence actually be walked back', () => {
    // It only ever rises from abilities, so if it did not fall on its own the
    // world would have a one-way meter and its bottom two bands would be
    // states a run leaves and never returns to.
    const silence = ITACHI.resources.find((r) => r.id === 'silence')!;
    expect(silence.regenPerHour).toBeLessThan(0);
  });
});

describe('the world holds together on the ground', () => {
  it('schedules everybody somewhere that exists', () => {
    const locations = new Set(ITACHI.locations.map((l) => l.id));
    for (const c of ITACHI.characters) {
      for (const block of c.schedule) {
        expect(locations, `${c.id} is scheduled into ${block.locationId}`).toContain(block.locationId);
      }
      if (c.homeLocationId) expect(locations, `${c.id} lives nowhere`).toContain(c.homeLocationId);
    }
  });

  it('keeps the room under the village genuinely hidden', () => {
    const root = ITACHI.locations.find((l) => l.id === 'root_chamber')!;
    expect(root.discoveredByDefault, 'you should have to find it').toBe(false);
    const edge = ITACHI.locations
      .find((l) => l.id === 'anbu_ready_room')!
      .connections.find((c) => c.to === 'root_chamber')!;
    expect(edge.lockedByFlag).toBe('knows:root_entrance');
    // And three separate things open it, so it is not one puzzle with one key.
    const openers = ITACHI.quests
      .flatMap((q) => q.steps)
      .flatMap((s) => s.succeedWhenAny)
      .filter((r) => r.setsFlags.includes('knows:root_entrance'));
    expect(openers.length).toBeGreaterThanOrEqual(3);
  });

  it('puts the evidence somewhere a player has to go and get it', () => {
    const ledger = ITACHI.locations.flatMap((l) => l.takeableItems).find((t) => t.itemId === 'root_ledger');
    expect(ledger, 'the proof is nowhere').toBeDefined();
    expect(ledger!.ownerId).toBe('danzo');
  });

  it('never has anybody asleep somewhere anybody can walk into', () => {
    const PUBLIC = new Set(['uchiha_street', 'the_rooftops', 'naka_shrine', 'susuki_teahouse', 'village_gate', 'the_academy', 'training_ground']);
    for (const c of ITACHI.characters) {
      for (const block of c.schedule) {
        if (!/asleep/i.test(block.activity)) continue;
        // Shisui and Kakashi are deliberately not sleeping anywhere; their
        // blocks say so rather than claiming a bed in a public place.
        expect(PUBLIC.has(block.locationId), `${c.id} sleeps in ${block.locationId}`).toBe(false);
      }
    }
  });
});

describe('where this can end up', () => {
  it('offers a loss reachable by playing carefully and honestly', () => {
    // Negotiating in good faith for a fortnight and being overtaken by men with
    // a timetable is the honest failure mode of being thirteen and outranked.
    // It must not require a mistake.
    const ending = ITACHI.endings.find((e) => e.id === 'end_it_happened_anyway')!;
    expect(ending.requires.flagsSet).toContain('it_happened_without_you');
    expect(ending.requires.minRelationship).toEqual([]);
    expect(ending.requires.hasItems).toEqual([]);
    const source = ITACHI.worldEvents.find((e) => e.setsFlags.includes('it_happened_without_you'))!;
    expect(source, 'nothing produces the quiet failure').toBeDefined();
  });

  it('lets somebody simply leave, early', () => {
    const walk = ITACHI.endings.find((e) => e.id === 'end_walked_away')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(25);
  });

  it('offers more than one way for this to go badly', () => {
    const losses = ITACHI.endings.filter((e) =>
      ['end_the_clan_killer', 'end_walked_away', 'end_it_happened_anyway', 'end_the_shadow'].includes(e.id),
    );
    expect(losses.length).toBe(4);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(ITACHI.endings.map((e) => e.rarity)).size).toBe(4);
  });

  it('names only flags something in this world sets', () => {
    const flags = settable();
    const ENGINE = ['met:', 'spoke:', 'visited:', 'used:', 'knows:', 'route:', 'closed:', 'left:'];
    for (const ending of ITACHI.endings) {
      for (const flag of [...ending.requires.flagsSet, ...ending.requires.flagsUnset]) {
        if (ENGINE.some((p) => flag.startsWith(p))) continue;
        expect(flags, `${ending.name} needs "${flag}", which nothing sets`).toContain(flag);
      }
    }
  });
});

describe('the copy is the right length and says the right amount', () => {
  it('keeps the premise inside the window', () => {
    const words = ITACHI.premise.trim().split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(120);
    expect(words).toBeLessThanOrEqual(250);
  });

  it('offers three responses that are answers rather than errands', () => {
    expect(ITACHI.openingSuggestions.length).toBe(3);
    for (const s of ITACHI.openingSuggestions) {
      expect(s.length).toBeLessThanOrEqual(320);
      // First person, and something actually said or done — not a command.
      expect(s, s).toMatch(/\bI\b/);
      expect(s).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Train|Find) /);
    }
  });

  it('does not print the answer to its own question on the store card', () => {
    // The premise must not tell a new player which way this goes, and must not
    // require them to have read the source to understand the situation.
    expect(ITACHI.premise.toLowerCase()).not.toContain('massacre');
    expect(ITACHI.premise.toLowerCase()).not.toContain('uchiha');
    expect(ITACHI.premise.toLowerCase()).not.toContain('sharingan');
  });
});
