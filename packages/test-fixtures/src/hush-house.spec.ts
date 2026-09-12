import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent, locationForSchedule } from '@plotbreak/engine';
import { resourceBand } from '@plotbreak/contracts';
import { HUSH_HOUSE } from './index.js';

/**
 * Hush House, held to the three things that were wrong with it and that no
 * catalog-wide test could see.
 *
 * All three were invisible because `catalog.spec.ts` and `endings.spec.ts`
 * check wiring between authored objects, and every one of these is a
 * disagreement between the authoring and the *engine* — who the schedule puts
 * in the room, which resource the generic cost path reaches for, whether a
 * band of prose is a state the world can actually arrive in. A world can pass
 * every structural check in the repo and still open in an empty room.
 */

const start = () =>
  createInitialState({
    sessionId: 'sess_hh',
    story: HUSH_HOUSE,
    identity: {
      displayName: 'Rei Sandoval',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId: 'arch_between_places',
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

describe('the opening scene has the person the opening scene is about in it', () => {
  it('puts Ayame in 312 on turn one', () => {
    // The opening is her knocking, and all three openingSuggestions answer
    // her. She was scheduled into 314 at this minute, `charactersPresent`
    // returned nothing, and `applySchedules` only exempts characters already
    // co-located — so nothing would ever have walked her in. Turn one reached
    // the writer with no speakers and `speaker-brief.ts` carrying nobody.
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present, 'nobody is in the room the story opens in').toContain('ayame');
  });

  it('describes somebody who is actually there', () => {
    const present = new Set(charactersPresent(start()).map((c) => c.characterId));
    // Every character named in the opening prose must be in the room, because
    // `present-absence.ts` will otherwise be protecting an empty stage.
    for (const character of HUSH_HOUSE.characters) {
      if (!HUSH_HOUSE.opening.includes(character.name)) continue;
      expect(present, `the opening names ${character.name}, who is elsewhere`).toContain(character.id);
    }
  });
});

describe('nobody lives in a corridor', () => {
  it('never schedules anybody asleep in a public part of the building', () => {
    const PUBLIC = new Set(['stairwell', 'hall_third', 'lobby', 'shared_kitchen', 'bellweather', 'rooftop']);
    for (const character of HUSH_HOUSE.characters) {
      for (const block of character.schedule) {
        if (!/asleep/i.test(block.activity)) continue;
        expect(
          PUBLIC.has(block.locationId),
          `${character.id} sleeps in ${block.locationId}, which anybody can walk into`,
        ).toBe(false);
      }
    }
  });

  it('gives every tenant a door of their own', () => {
    const locations = new Set(HUSH_HOUSE.locations.map((l) => l.id));
    for (const character of HUSH_HOUSE.characters) {
      if (!character.homeLocationId) continue;
      expect(locations, `${character.id} lives nowhere that exists`).toContain(character.homeLocationId);
    }
  });

  it('schedules every character somewhere real, all day', () => {
    const locations = new Set(HUSH_HOUSE.locations.map((l) => l.id));
    for (const character of HUSH_HOUSE.characters) {
      for (const block of character.schedule) {
        expect(locations, `${character.id} is scheduled into ${block.locationId}`).toContain(block.locationId);
      }
    }
  });
});

describe('the variables are variables', () => {
  it('describes every band as behaviour rather than as a measurement', () => {
    for (const resource of HUSH_HOUSE.resources) {
      expect(resource.bands.length, `${resource.id} has no bands`).toBeGreaterThanOrEqual(3);
      expect(resource.visible, `${resource.id} is on the screen`).toBe(false);
      for (const band of resource.bands) {
        expect(band.behaviour.length, `${resource.id}@${band.upTo}`).toBeGreaterThan(80);
        // A band that names its own resource is a status readout with adjectives.
        expect(band.behaviour.toLowerCase()).not.toContain(resource.name.toLowerCase());
      }
      // The top band has to reach the ceiling, or the highest range is unwritten.
      expect(Math.max(...resource.bands.map((b) => b.upTo)), resource.id).toBe(resource.max);
    }
  });

  it('has something in the world that moves each one', () => {
    // Eight bands of very good prose describing states nothing can reach is
    // the most expensive kind of dead code, because it reads as finished.
    for (const resource of HUSH_HOUSE.resources) {
      if (resource.polarity !== 'GOOD_LOW') continue;
      const driven = HUSH_HOUSE.abilities.some((a) => a.costs.some((c) => c.resourceId === resource.id));
      expect(driven, `nothing the player can do changes ${resource.id}`).toBe(true);
    }
  });

  it('lets resting mean something', () => {
    // `resolveRest` restores every GOOD_HIGH resource. With none, the engine
    // printed "you rest, and recover" and emitted no mutations at all.
    expect(HUSH_HOUSE.resources.some((r) => r.polarity === 'GOOD_HIGH')).toBe(true);
  });

  it('sends what the street saw to the street, not to the house', () => {
    // PUBLIC_VIOLENCE and the generic cost fallback both take the FIRST
    // GOOD_LOW resource in array order. Being seen fighting on Bellweather
    // Street used to raise the building's interest in you.
    const firstDescending = HUSH_HOUSE.resources.find((r) => r.polarity === 'GOOD_LOW');
    expect(firstDescending?.id).toBe('public_suspicion');
  });

  it('reaches its own top band from ordinary play', () => {
    const attention = HUSH_HOUSE.resources.find((r) => r.id === 'house_attention')!;
    const perOpen = HUSH_HOUSE.abilities
      .find((a) => a.id === 'open_the_door')!
      .costs.find((c) => c.resourceId === 'house_attention')!.amount;
    // Opening the door at 2:13 six times should be enough to be rehearsed,
    // rather than a number nobody can move far enough to matter.
    expect(resourceBand(attention, attention.start + perOpen * 6)?.upTo).toBeGreaterThanOrEqual(80);
  });
});

describe('the cast do not share a mouth', () => {
  it('gives everybody three or more voice samples', () => {
    for (const character of HUSH_HOUSE.characters) {
      expect(character.voiceSamples.length, character.id).toBeGreaterThanOrEqual(3);
    }
  });

  it('does not let two people run the same rhetorical move', () => {
    // Ayame and Tomas both used to negate-then-substitute off the same phrase
    // ("I am not saying it was nothing"). A reader could not tell them apart
    // on the one kind of line the world asks them both for most often.
    const NEGATE_THEN_SUBSTITUTE = /\bI(?:’m| am)? ?not (?:going to )?(?:say|tell|saying|telling)\b/i;
    const users = HUSH_HOUSE.characters
      .filter((c) => c.voiceSamples.some((v) => NEGATE_THEN_SUBSTITUTE.test(v)))
      .map((c) => c.id);
    expect(users.length, `${users.join(' and ')} share a construction`).toBeLessThanOrEqual(1);
  });

  it('gives every major character something to want, fear and refuse', () => {
    // What `speakerBrief` carries. A character with an empty `fears` is a
    // character the writer cannot motivate.
    for (const c of HUSH_HOUSE.characters) {
      expect(c.fears.length, `${c.id} fears nothing`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values nothing`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} wants nothing privately`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} would do anything`).toBeGreaterThan(0);
      expect(c.goals.length, `${c.id} is not trying to get anything`).toBeGreaterThan(0);
      for (const secret of c.secrets) {
        expect(secret.revealHint.length, `${c.id}/${secret.id} has no way out`).toBeGreaterThan(10);
      }
    }
  });
});

describe('Hush House as a world', () => {
  it('makes the room the first rule is about a place you can stand in', () => {
    // Rule one is "do not look through the peephole of 309". It was a clause
    // in a corridor description, which `authored-lore.ts` excludes whenever
    // the player is standing in that corridor.
    const room = HUSH_HOUSE.locations.find((l) => l.id === 'room_309');
    expect(room, '309 is not a place').toBeDefined();
    expect(room!.discoveredByDefault, 'you should have to find it').toBe(false);
  });

  it('lets a player leave, and calls that an ending', () => {
    const walkAway = HUSH_HOUSE.endings.find((e) => e.requires.flagsSet.includes('left_the_map'));
    expect(walkAway, 'there is no way to simply move out').toBeDefined();
  });

  it('offers more losses than one', () => {
    const losses = HUSH_HOUSE.endings.filter((e) =>
      /became_echo|house_owns_you|ayame_left_the_house|became_keeper/.test(e.requires.flagsSet.join(' ')),
    );
    expect(losses.length).toBeGreaterThanOrEqual(2);
  });

  it('keeps the premise inside the length the schema asks for', () => {
    const words = HUSH_HOUSE.premise.trim().split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(120);
    expect(words).toBeLessThanOrEqual(250);
  });

  it('does not print the answer to its own mystery on the store card', () => {
    // "It does not haunt anybody. It rehearses them" is the payoff of the
    // `p_what_it_is` promise. It was in the premise.
    expect(HUSH_HOUSE.premise.toLowerCase()).not.toContain('rehearse');
  });

  it('never lands somebody in the player’s room because their schedule ran out', () => {
    // `createInitialState` falls back schedule → homeLocationId → the story's
    // starting location. A gap in a schedule with no home is how a character
    // ends up in the opening scene by accident rather than by authoring, and
    // Mika's deliberate gaps (she is on Floor 0 unless something put her
    // somewhere) must resolve to Floor 0 and not to 312.
    for (const c of HUSH_HOUSE.characters) {
      const placed =
        locationForSchedule(c.schedule, HUSH_HOUSE.rules.startWorldMinute) ?? c.homeLocationId;
      expect(placed, `${c.id} has neither a scheduled place nor a home`).not.toBeNull();
      if (c.id === 'ayame') continue; // she is meant to be at the door.
      expect(placed, `${c.id} arrives in the opening scene by default`).not.toBe(
        HUSH_HOUSE.rules.startingLocationId,
      );
    }
  });
});
