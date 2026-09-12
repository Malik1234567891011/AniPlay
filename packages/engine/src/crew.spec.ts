import { describe, expect, it } from 'vitest';
import type { ActionIntent, GameState } from '@plotbreak/contracts';
import { BLACKWAKE } from '@plotbreak/test-fixtures';
import { commitTurn } from './commit.js';
import { crewFlag, departedFlag, isAboard, moraleFlag, moraleOf, moraleScale, moodLabel } from './crew.js';
import { resolveIntent } from './resolve.js';
import { createInitialState } from './state.js';

/**
 * The crew subsystem itself, end to end: an offer is an action a player takes
 * in a turn, the answer is the companion's, and a turn that commits records
 * the whole thing as state.
 */

const player = { entityType: 'player' as const, entityId: 'player' };

const intent = (actions: ActionIntent['actions']): ActionIntent => ({
  schemaVersion: '1.0',
  intentId: 'int_crew',
  rawAction: 'test',
  dialogue: [],
  actions,
  confidence: 0.9,
  ambiguities: [],
  unsafeOrMetaRequests: [],
});

const offerTo = (entityId: string): ActionIntent =>
  intent([
    {
      verb: 'use_ability',
      actor: player,
      abilityId: 'offer_a_berth',
      targets: [{ entityType: 'npc', entityId }],
      method: 'ask them to sail with me',
      declaredOutcome: '',
      timeIntent: 'NOW',
    },
  ]);

const start = (): GameState =>
  createInitialState({
    sessionId: 'sess_crew',
    story: BLACKWAKE,
    identity: {
      displayName: 'Sable Vane',
      pronouns: 'she/her',
      ageBand: null,
      archetypeId: 'arch_apprentice',
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

describe('morale is legible without being a number on screen', () => {
  it('scales what somebody gives you in steps a player can feel', () => {
    expect(moraleScale(100)).toBe(1);
    expect(moraleScale(60)).toBe(1);
    expect(moraleScale(59)).toBe(0.5);
    expect(moraleScale(30)).toBe(0.5);
    expect(moraleScale(29)).toBe(0);
  });

  it('has a word for every band', () => {
    const labels = [95, 65, 50, 25, 5].map(moodLabel);
    expect(new Set(labels).size).toBe(5);
    expect(moodLabel(5)).toBe('about to walk');
  });
});

describe('an offer is a turn, and the answer is theirs', () => {
  it('refuses somebody whose conditions are not met, in their own voice', () => {
    const state = start();
    // The player is standing with her, but has not yet spoken to her.
    state.characters.find((c) => c.characterId === 'nessa')!.locationId = state.player.locationId;

    // Every seed, because the answer is hers and not the dice's. A bad roll is
    // an awkward ask; it is never the reason a companion is unavailable.
    for (const seed of ['s', 'seed-2', 'seed-3', 'seed-4', 'seed-5']) {
      const result = resolveIntent({ story: BLACKWAKE, state, intent: offerTo('nessa'), turnId: 't1', seed });
      expect(result.observableFacts.join(' '), seed).toContain('Nessa Vale says no');
      expect(result.mutations.some((m) => m.payload.flag === crewFlag('nessa')), seed).toBe(false);
    }
  });

  it('signs them on when the conditions are met, and says so as state', () => {
    const state = start();
    state.characters.find((c) => c.characterId === 'nessa')!.locationId = state.player.locationId;
    state.flags['spoke:nessa'] = true;

    const result = resolveIntent({ story: BLACKWAKE, state, intent: offerTo('nessa'), turnId: 't2', seed: 'seed-yes' });
    const joined = result.mutations.filter((m) => m.reasonCode === 'CREW_JOINED');
    expect(joined.map((m) => m.payload.flag)).toEqual([crewFlag('nessa'), moraleFlag('nessa')]);
    expect(joined[1]!.payload.value).toBe(60);
    expect(result.observableFacts.join(' ')).toContain('Nessa Vale signs on');
  });

  it('refuses to sign on somebody who cannot sail with anyone', () => {
    const state = start();
    state.characters.find((c) => c.characterId === 'tolla')!.locationId = state.player.locationId;
    const result = resolveIntent({ story: BLACKWAKE, state, intent: offerTo('tolla'), turnId: 't3', seed: 's' });
    expect(result.normalizedActions[0]).toMatchObject({ status: 'REJECTED' });
  });

  it('does not let the same person be recruited twice', () => {
    const state = start();
    state.characters.find((c) => c.characterId === 'nessa')!.locationId = state.player.locationId;
    state.flags[crewFlag('nessa')] = true;
    state.flags[moraleFlag('nessa')] = 60;
    const result = resolveIntent({ story: BLACKWAKE, state, intent: offerTo('nessa'), turnId: 't4', seed: 's' });
    expect(result.normalizedActions[0]).toMatchObject({ status: 'REJECTED', reason: 'ALREADY_TRUE' });
  });

  it('resolves the same way every time from the same seed', () => {
    const build = (): GameState => {
      const state = start();
      state.characters.find((c) => c.characterId === 'nessa')!.locationId = state.player.locationId;
      state.flags['spoke:nessa'] = true;
      return state;
    };
    const a = resolveIntent({ story: BLACKWAKE, state: build(), intent: offerTo('nessa'), turnId: 't', seed: 'x' });
    const b = resolveIntent({ story: BLACKWAKE, state: build(), intent: offerTo('nessa'), turnId: 't', seed: 'x' });
    expect(a).toEqual(b);
  });
});

describe('committing a turn writes the crew down', () => {
  it('puts them aboard for good', () => {
    const state = start();
    state.characters.find((c) => c.characterId === 'nessa')!.locationId = state.player.locationId;
    state.flags['spoke:nessa'] = true;

    const resolution = resolveIntent({ story: BLACKWAKE, state, intent: offerTo('nessa'), turnId: 't5', seed: 'seed-yes' });
    const commit = commitTurn({ story: BLACKWAKE, state, resolution, turnId: 't5' });

    expect(isAboard(commit.state, 'nessa')).toBe(true);
    expect(moraleOf(commit.state, 'nessa')).toBe(60);
    expect(commit.crewDepartures).toEqual([]);
  });

  it('reports a departure the turn it happens, and only that turn', () => {
    const state = start();
    state.flags[crewFlag('nessa')] = true;
    state.flags[moraleFlag('nessa')] = 60;
    state.flags['took_house_contract'] = true;

    const wait = intent([
      { verb: 'wait', actor: player, targets: [], method: '', declaredOutcome: '', timeIntent: 'NOW' },
    ]);
    const resolution = resolveIntent({ story: BLACKWAKE, state, intent: wait, turnId: 't6', seed: 's' });
    const commit = commitTurn({ story: BLACKWAKE, state, resolution, turnId: 't6' });

    expect(commit.crewDepartures.map((d) => d.name)).toEqual(['Nessa Vale']);
    expect(commit.crewDepartures[0]!.copy).toContain('Good luck with the rest of it');
    expect(commit.state.flags[crewFlag('nessa')]).toBe(false);
    expect(commit.state.flags[departedFlag('nessa')]).toBe(true);

    // The world moved on. Nobody leaves twice.
    const next = resolveIntent({
      story: BLACKWAKE,
      state: commit.state,
      intent: wait,
      turnId: 't7',
      seed: 's',
    });
    const after = commitTurn({ story: BLACKWAKE, state: commit.state, resolution: next, turnId: 't7' });
    expect(after.crewDepartures).toEqual([]);
  });

  it('records the departure in the event log, so a session can be replayed', () => {
    const state = start();
    state.flags[crewFlag('nessa')] = true;
    state.flags[moraleFlag('nessa')] = 60;
    state.flags['took_house_contract'] = true;

    const wait = intent([
      { verb: 'wait', actor: player, targets: [], method: '', declaredOutcome: '', timeIntent: 'NOW' },
    ]);
    const resolution = resolveIntent({ story: BLACKWAKE, state, intent: wait, turnId: 't8', seed: 's' });
    const commit = commitTurn({ story: BLACKWAKE, state, resolution, turnId: 't8' });

    const departed = commit.events.find((e) => e.reasonCode === 'CREW_DEPARTED');
    expect(departed?.subjectId).toBe('nessa');
  });
});
