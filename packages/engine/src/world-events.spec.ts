import { describe, expect, it } from 'vitest';
import { NINTH_ARCHIVE } from '@aniplay/test-fixtures';
import type { GameState, StoryVersion, WorldEventDef } from '@aniplay/contracts';
import { createInitialState } from './state.js';
import { applyMutations } from './mutations.js';
import { fireWorldEvents, firedFlag, upcomingWorldEvents } from './world-events.js';
import { resetLoop, loopNumber, loopShouldReset, echoDirectorNotes } from './loop.js';

/**
 * The world moving on its own is what makes a timetable a game rather than a
 * setting. These pin the two properties that matter: it is deterministic, and
 * a player who knows when something happens can stop it.
 */

const baseState = (): GameState =>
  createInitialState({
    sessionId: 'sess_events',
    story: NINTH_ARCHIVE,
    identity: {
      displayName: 'Robin Vale',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId: 'arch_scholar',
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const event = (overrides: Partial<WorldEventDef> = {}): WorldEventDef => ({
  id: 'theft',
  atWorldMinute: 600,
  locationId: 'commons',
  publicCopy: 'A case goes off the shelf and out of the door under someone’s coat.',
  directorNotes: 'Bram takes the ledger page while the floor is busy.',
  setsFlags: ['ledger_page_taken'],
  cancelledByFlags: ['bram_warned_off'],
  requiresFlags: [],
  movesCharacters: [],
  ...overrides,
});

const worldWith = (...events: WorldEventDef[]): StoryVersion => ({
  ...NINTH_ARCHIVE,
  worldEvents: events,
});

let counter = 0;
const nextId = (): string => `m${counter++}`;

describe('the world on its own clock', () => {
  it('fires when the hour passes, and only once', () => {
    const state = baseState();
    state.worldMinute = 500;
    const story = worldWith(event());

    const first = fireWorldEvents(state, story, 500, 700, nextId);
    expect(first.fired).toHaveLength(1);
    expect(first.mutations.some((m) => m.type === 'FLAG_SET')).toBe(true);

    const after = applyMutations(state, story, first.mutations);
    expect(fireWorldEvents(after, story, 700, 900, nextId).fired).toHaveLength(0);
  });

  it('fires everything inside a long turn, in order', () => {
    const story = worldWith(
      event({ id: 'a', atWorldMinute: 550 }),
      event({ id: 'c', atWorldMinute: 900 }),
      event({ id: 'b', atWorldMinute: 700 }),
    );
    const fired = fireWorldEvents(baseState(), story, 500, 1000, nextId).fired;
    // Waiting out an afternoon must not skip the afternoon.
    expect(fired.map((f) => f.def.id)).toEqual(['a', 'b', 'c']);
  });

  it('does not fire what the player already changed', () => {
    const state = baseState();
    state.flags.bram_warned_off = true;
    expect(fireWorldEvents(state, worldWith(event()), 500, 700, nextId).fired).toHaveLength(0);
  });

  it('waits for what has not happened yet', () => {
    const story = worldWith(event({ requiresFlags: ['floor_is_busy'] }));
    expect(fireWorldEvents(baseState(), story, 500, 700, nextId).fired).toHaveLength(0);

    const state = baseState();
    state.flags.floor_is_busy = true;
    expect(fireWorldEvents(state, story, 500, 700, nextId).fired).toHaveLength(1);
  });

  it('tells the player only what they were there to see', () => {
    const state = baseState();
    const elsewhere = fireWorldEvents(state, worldWith(event()), 500, 700, nextId, 'dorm');
    expect(elsewhere.observableFacts).toHaveLength(0);
    // …and warns the writer off narrating it.
    expect(elsewhere.privateFacts.join(' ')).toMatch(/Do not narrate this/);

    const there = fireWorldEvents(state, worldWith(event()), 500, 700, nextId, 'commons');
    expect(there.observableFacts).toHaveLength(1);
  });

  it('moves people to where the event leaves them', () => {
    const story = worldWith(event({ movesCharacters: [{ characterId: 'bram', toLocationId: 'rooftop' }] }));
    const outcome = fireWorldEvents(baseState(), story, 500, 700, nextId);
    const move = outcome.mutations.find((m) => m.type === 'LOCATION_CHANGE');
    expect(move).toMatchObject({ subjectId: 'bram', payload: { locationId: 'rooftop' } });
  });

  it('is the same world twice', () => {
    const story = worldWith(event());
    const a = fireWorldEvents(baseState(), story, 500, 700, () => 'm');
    const b = fireWorldEvents(baseState(), story, 500, 700, () => 'm');
    expect(a).toEqual(b);
  });

  it('can say what is still coming, so a clock can be felt', () => {
    const state = baseState();
    state.worldMinute = 500;
    const story = worldWith(event({ atWorldMinute: 560 }), event({ id: 'far', atWorldMinute: 5000 }));
    expect(upcomingWorldEvents(state, story, 120).map((e) => e.id)).toEqual(['theft']);

    state.flags[firedFlag('theft')] = true;
    expect(upcomingWorldEvents(state, story, 120)).toHaveLength(0);
  });
});

/** A week that starts again, and the one thing that crosses. */
describe('the loop', () => {
  const looping = (overrides = {}): StoryVersion => ({
    ...NINTH_ARCHIVE,
    rules: {
      ...NINTH_ARCHIVE.rules,
      loop: {
        startWorldMinute: 480,
        endWorldMinute: 10_560,
        persistentFlagPrefixes: ['knows:'],
        echoRetention: 0.5,
        echoThreshold: 40,
        resetCopy: 'Monday again.',
        ...overrides,
      },
    },
  });

  it('resets only when the clock reaches the end', () => {
    const state = baseState();
    state.worldMinute = 10_000;
    expect(loopShouldReset(state, looping())).toBe(false);
    state.worldMinute = 10_560;
    expect(loopShouldReset(state, looping())).toBe(true);
  });

  it('puts the world back and keeps what the player learned', () => {
    const state = baseState();
    state.worldMinute = 10_560;
    state.player.locationId = 'rooftop';
    state.flags['knows:gate_code'] = true;
    state.flags['visited:rooftop'] = true;
    state.flags.ledger_page_taken = true;
    state.player.inventory.push({
      entryId: 'inv_1',
      itemId: 'stack_key',
      quantity: 1,
      equipped: false,
      instanceName: null,
    });

    const { state: next, loopNumber: n } = resetLoop(state, looping());

    expect(n).toBe(2);
    expect(next.worldMinute).toBe(480);
    expect(next.player.locationId).toBe(NINTH_ARCHIVE.rules.startingLocationId);
    // The one thing that crosses.
    expect(next.flags['knows:gate_code']).toBe(true);
    // And everything that does not.
    expect(next.flags['visited:rooftop']).toBeUndefined();
    expect(next.flags.ledger_page_taken).toBeUndefined();
    expect(next.player.inventory.some((e) => e.itemId === 'stack_key')).toBe(false);
  });

  it('counts the weeks, across the reset that erases everything else', () => {
    let state = baseState();
    state.worldMinute = 10_560;
    for (let expected = 2; expected <= 4; expected += 1) {
      const result = resetLoop(state, looping());
      expect(result.loopNumber).toBe(expected);
      state = result.state;
      state.worldMinute = 10_560;
      expect(loopNumber(state)).toBe(expected);
    }
  });

  it('leaves a residue only where something extreme happened', () => {
    const state = baseState();
    state.worldMinute = 10_560;
    const deep = state.relationships.find((r) => r.characterId === 'mira')!;
    const shallow = state.relationships.find((r) => r.characterId === 'kael')!;
    deep.trust = 80;
    shallow.trust = 12;

    const { state: next, echoes } = resetLoop(state, looping());

    expect(next.relationships.find((r) => r.characterId === 'mira')!.trust).toBe(40);
    expect(next.relationships.find((r) => r.characterId === 'kael')!.trust).toBe(0);
    expect(echoes).toHaveLength(1);

    // And the director is told to play it as an instinct, not a memory.
    const notes = echoDirectorNotes(NINTH_ARCHIVE, echoes).join(' ');
    expect(notes).toMatch(/never met you/);
    expect(notes).toMatch(/must not refer to it/);
  });

  it('leaves nothing behind when the world does not do echoes', () => {
    const state = baseState();
    state.worldMinute = 10_560;
    state.relationships.find((r) => r.characterId === 'mira')!.trust = 80;

    const { state: next, echoes } = resetLoop(state, looping({ echoRetention: 0 }));

    // Back to what the story authored, not to zero — a reset restores the
    // world, and the world is not neutral about the player to begin with.
    const authored = NINTH_ARCHIVE.characters.find((c) => c.id === 'mira')!.startingRelationship.trust;
    expect(next.relationships.find((r) => r.characterId === 'mira')!.trust).toBe(authored);
    expect(echoes).toHaveLength(0);
  });

  it('does nothing at all to a world that does not loop', () => {
    const state = baseState();
    state.worldMinute = 99_999;
    expect(loopShouldReset(state, NINTH_ARCHIVE)).toBe(false);
    expect(resetLoop(state, NINTH_ARCHIVE).state).toBe(state);
  });
});

/**
 * What an ability costs you, and which way that moves the number.
 *
 * Spending 8 Breath leaves you with less of it. Costing 12 Strain leaves you
 * with more. Subtracting in both cases meant the most dangerous techniques in
 * a world were quietly reducing the meter that was the reason not to use them.
 */
describe('paying for an ability', () => {
  it('moves an ascending cost the way the fiction means it', async () => {
    const { UNBOUND } = await import('@aniplay/test-fixtures');
    const { resolveIntent } = await import('./resolve.js');
    const { RuleBasedIntentParser } = await import('@aniplay/director');

    const state = createInitialState({
      sessionId: 's',
      story: UNBOUND,
      identity: {
        displayName: 'Robin',
        pronouns: 'they/them',
        ageBand: null,
        // Starts with the Quiet Opening's sibling; any Strain-costing trait.
        archetypeId: 'lean_gale',
        worldKnowsAboutYou: '',
        advanced: {},
        portraitAssetId: null,
      },
    });
    state.player.abilities.push('the_unnamed_form');

    const intent = new RuleBasedIntentParser().parseSync('I use the unnamed form on Tam.', {
      story: UNBOUND,
      state,
      intentId: 'i',
    });
    const resolution = resolveIntent({ story: UNBOUND, state, intent, turnId: 't', seed: 's' });

    const strain = resolution.mutations.find(
      (m) => m.type === 'RESOURCE_DELTA' && (m.payload as { resourceId?: string }).resourceId === 'strain',
    );
    const breath = resolution.mutations.find(
      (m) => m.type === 'RESOURCE_DELTA' && (m.payload as { resourceId?: string }).resourceId === 'breath',
    );

    if (strain) expect(Number((strain.payload as { amount: number }).amount)).toBeGreaterThan(0);
    if (breath) expect(Number((breath.payload as { amount: number }).amount)).toBeLessThan(0);
    expect(strain ?? breath, 'the ability should have cost something').toBeDefined();
  });
});

/** In a world that starts again, dying is how most weeks end. */
describe('dying inside a loop', () => {
  it('sends the clock to midnight rather than inventing a second ending', async () => {
    const { NINTH_ARCHIVE } = await import('@aniplay/test-fixtures');
    const looping = {
      ...NINTH_ARCHIVE,
      rules: {
        ...NINTH_ARCHIVE.rules,
        loop: {
          startWorldMinute: 480,
          endWorldMinute: 10_080,
          persistentFlagPrefixes: ['knows:'],
          echoRetention: 0,
          echoThreshold: 40,
          resetCopy: '',
        },
      },
    };

    const state = baseState();
    state.worldMinute = 3_000;
    state.flags['knows:the_code'] = true;
    // A fight the player is losing badly.
    state.encounter = {
      encounterId: 'enc_1',
      objective: 'Survive',
      round: 1,
      participants: [
        {
          entityId: 'player',
          kind: 'PLAYER',
          team: 'ALLY',
          initiative: 10,
          health: 0,
          maxHealth: 30,
          statuses: [],
          zoneId: 'z',
          downed: true,
        },
        {
          entityId: 'kael',
          kind: 'NPC',
          team: 'ENEMY',
          initiative: 8,
          health: 20,
          maxHealth: 20,
          statuses: [],
          zoneId: 'z',
          downed: false,
        },
      ],
      zones: [{ id: 'z', label: 'The arch', adjacentTo: [] }],
      activeEntityId: 'kael',
      turnOrder: ['kael', 'player'],
      environmentalAffordances: [],
      escapeCondition: 'Get through the arch.',
      surrenderAllowed: true,
    };

    const { commitTurn } = await import('./commit.js');
    const { resolveIntent } = await import('./resolve.js');
    const { RuleBasedIntentParser } = await import('@aniplay/director');
    const intent = new RuleBasedIntentParser().parseSync('I wait.', {
      story: looping,
      state,
      intentId: 'i',
    });
    const resolution = resolveIntent({ story: looping, state, intent, turnId: 't', seed: 's' });
    const result = commitTurn({ story: looping, state, resolution, turnId: 't' });

    expect(result.defeat.occurred).toBe(true);
    expect(result.loopReset.occurred).toBe(true);
    expect(result.state.worldMinute).toBe(480);
    // And the one thing that crosses still crossed.
    expect(result.state.flags['knows:the_code']).toBe(true);
  });
});

/** A turn that crosses two days has to let Tuesday cause Friday. */
describe('one event causing another inside the same turn', () => {
  it('fires an event gated on a flag an earlier event in the same span set', () => {
    const story = worldWith(
      event({ id: 'theft', atWorldMinute: 600, setsFlags: ['page_gone'], cancelledByFlags: [] }),
      event({
        id: 'row',
        atWorldMinute: 900,
        setsFlags: [],
        cancelledByFlags: [],
        requiresFlags: ['page_gone'],
      }),
    );

    // One long turn covering both. Without in-sweep causality the row never
    // happens, and only ever when the player happened to wait a long time.
    const fired = fireWorldEvents(baseState(), story, 500, 1000, nextId).fired;
    expect(fired.map((f) => f.def.id)).toEqual(['theft', 'row']);
  });

  it('and does not fire it when the first one was cancelled', () => {
    const story = worldWith(
      event({ id: 'theft', atWorldMinute: 600, setsFlags: ['page_gone'], cancelledByFlags: ['stopped'] }),
      event({ id: 'row', atWorldMinute: 900, setsFlags: [], cancelledByFlags: [], requiresFlags: ['page_gone'] }),
    );
    const state = baseState();
    state.flags.stopped = true;
    expect(fireWorldEvents(state, story, 500, 1000, nextId).fired).toHaveLength(0);
  });
});
