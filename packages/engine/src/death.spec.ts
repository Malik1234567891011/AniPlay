import { describe, expect, it } from 'vitest';
import type { GameState, StateMutation } from '@plotbreak/contracts';
import { NINTH_ARCHIVE, SALT_ROAD } from '@plotbreak/test-fixtures';
import { applyMutations } from './mutations.js';
import { deadFlag, deathConsequences, isAlive, lethalMutations, surrenderedFlag } from './combat.js';
import { createInitialState } from './state.js';

/**
 * Whether an important character can actually die.
 *
 * `CharacterRuntimeState.alive` was in the schema from the start, read in three
 * places, and written by nothing — so every NPC in every world was quietly
 * immortal, and an attempt to kill one produced prose about a fight and no
 * change to the world. That is the story protecting itself from the player,
 * which is the one thing a game called Plotbreak must not do.
 */

const state = (story = NINTH_ARCHIVE, archetypeId?: string): GameState =>
  createInitialState({
    sessionId: 'sess_d',
    story,
    identity: {
      displayName: 'Sora',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId: archetypeId ?? story.archetypes[0]?.id ?? null,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

let n = 0;
const nextId = (): string => `m${n++}`;

/** Puts a character into an encounter, already down. */
const downed = (s: GameState, characterId: string): GameState => {
  s.encounter = {
    encounterId: 'enc',
    objective: 'test',
    participants: [
      { entityId: 'player', kind: 'PLAYER', team: 'ALLY', initiative: 10, health: 20, maxHealth: 20, zoneId: 'z', statuses: [], downed: false },
      { entityId: characterId, kind: 'NPC', team: 'ENEMY', initiative: 8, health: 0, maxHealth: 20, zoneId: 'z', statuses: [], downed: true },
    ],
    zones: [{ id: 'z', label: 'here', adjacentTo: [] }],
    round: 2,
    activeEntityId: 'player',
    turnOrder: ['player', characterId],
    environmentalAffordances: [],
    escapeCondition: '',
    surrenderAllowed: true,
  };
  return s;
};

describe('a character can stop being alive', () => {
  it('starts everyone alive', () => {
    const s = state();
    for (const runtime of s.characters) expect(runtime.alive).toBe(true);
  });

  it('does not kill somebody who is merely losing', () => {
    const s = state();
    expect(lethalMutations(s, NINTH_ARCHIVE, 'kael', { deliberate: true }, nextId)).toEqual([]);
  });

  it('kills a downed character when the player means it', () => {
    const s = downed(state(), 'kael');
    const mutations = lethalMutations(s, NINTH_ARCHIVE, 'kael', { deliberate: true }, nextId);
    expect(mutations).toHaveLength(1);
    expect(mutations[0]!.payload.flag).toBe(deadFlag('kael'));
    expect(mutations[0]!.reasonCode).toBe('KILLED_BY_PLAYER');
  });

  it('does not kill a downed character by accident', () => {
    // Winning a scuffle is not a killing. The player has to be doing it.
    const s = downed(state(), 'kael');
    expect(lethalMutations(s, NINTH_ARCHIVE, 'kael', { deliberate: false }, nextId)).toEqual([]);
  });

  it('kills on health alone in a world whose rules say so', () => {
    // The Salt Road ships PERMANENT_DEATH and runs LETHAL.
    expect(SALT_ROAD.rules.defeatMode).toBe('LETHAL');
    const s = downed(state(SALT_ROAD), SALT_ROAD.characters[0]!.id);
    const mutations = lethalMutations(s, SALT_ROAD, SALT_ROAD.characters[0]!.id, { deliberate: false }, nextId);
    expect(mutations).toHaveLength(1);
  });

  it('writes through to the typed field, not only to a flag', () => {
    const s = downed(state(), 'kael');
    const mutations = lethalMutations(s, NINTH_ARCHIVE, 'kael', { deliberate: true }, nextId);
    const after = applyMutations(s, NINTH_ARCHIVE, mutations);
    expect(isAlive(after, 'kael')).toBe(false);
    expect(after.characters.find((c) => c.characterId === 'kael')!.alive).toBe(false);
    expect(after.flags[deadFlag('kael')]).toBe(true);
  });

  it('takes them off the stage', () => {
    const s = downed(state(), 'kael');
    s.characters.find((c) => c.characterId === 'kael')!.locationId = s.player.locationId;
    const after = applyMutations(s, NINTH_ARCHIVE, lethalMutations(s, NINTH_ARCHIVE, 'kael', { deliberate: true }, nextId));
    const present = after.characters.filter((c) => c.alive && c.locationId === after.player.locationId);
    expect(present.map((c) => c.characterId)).not.toContain('kael');
  });

  it('does not kill the same person twice', () => {
    const s = downed(state(), 'kael');
    const after = applyMutations(s, NINTH_ARCHIVE, lethalMutations(s, NINTH_ARCHIVE, 'kael', { deliberate: true }, nextId));
    expect(lethalMutations(after, NINTH_ARCHIVE, 'kael', { deliberate: true }, nextId)).toEqual([]);
  });

  it('never resurrects anybody to protect a plot', () => {
    // There is no path back. The only mutation that touches `dead:` sets it.
    const s = downed(state(), 'kael');
    let after = applyMutations(s, NINTH_ARCHIVE, lethalMutations(s, NINTH_ARCHIVE, 'kael', { deliberate: true }, nextId));
    const unrelated: StateMutation[] = [
      { mutationId: 'x', type: 'FLAG_SET', subjectId: 'session', reasonCode: 'TEST', payload: { flag: 'anything', value: true } },
    ];
    after = applyMutations(after, NINTH_ARCHIVE, unrelated);
    expect(isAlive(after, 'kael')).toBe(false);
  });
});

describe('the world is told what it lost', () => {
  it('names the secrets that died with them', () => {
    const notes = deathConsequences(NINTH_ARCHIVE, 'mira').join(' ');
    expect(notes).toContain('Mira');
    expect(notes).toMatch(/died with them/i);
    expect(notes).toMatch(/do not have anyone else simply know it now/i);
  });

  it('names the quests that were built around them', () => {
    const involved = NINTH_ARCHIVE.quests.filter((q) => q.involvedCharacterIds.includes('mira'));
    expect(involved.length).toBeGreaterThan(0);
    const notes = deathConsequences(NINTH_ARCHIVE, 'mira').join(' ');
    expect(notes).toMatch(/happen differently or not at all/i);
    expect(notes).toContain(involved[0]!.title);
  });

  it('never tells the story to undo it', () => {
    const notes = deathConsequences(NINTH_ARCHIVE, 'mira').join(' ');
    expect(notes).toMatch(/They stay dead/i);
    expect(notes).not.toMatch(/resurrect|bring (?:her|him|them) back|restore/i);
  });

  it('says nothing about somebody who was never in the story', () => {
    expect(deathConsequences(NINTH_ARCHIVE, 'nobody_at_all')).toEqual([]);
  });
});

describe('killing somebody, end to end through a real turn', () => {
  const intent = (method: string) => ({
    schemaVersion: '1.0' as const,
    intentId: 'i',
    rawAction: method,
    dialogue: [],
    confidence: 0.9,
    ambiguities: [],
    unsafeOrMetaRequests: [],
    actions: [
      {
        verb: 'attack' as const,
        actor: { entityType: 'player' as const, entityId: 'player' },
        targets: [{ entityType: 'npc' as const, entityId: 'kael' }],
        method,
        declaredOutcome: '',
        timeIntent: 'NOW' as const,
      },
    ],
  });

  it('kills them when the player keeps going and means it', async () => {
    const { resolveIntent } = await import('./resolve.js');
    const { commitTurn } = await import('./commit.js');

    // A duellist, because the question is whether a character can be killed at
    // all — not whether a scholar wins a fight with a trained one.
    let s = state(NINTH_ARCHIVE, 'arch_duelist');
    s.characters.find((c) => c.characterId === 'kael')!.locationId = s.player.locationId;
    for (const r of s.player.resources) r.current = r.max;

    let killed = false;
    for (let turn = 0; turn < 60 && !killed; turn++) {
      // Keep the player standing; this test is about whether the *target* can
      // die, not about who wins a fair fight.
      for (const r of s.player.resources) r.current = r.max;
      const participant = s.encounter?.participants.find((p) => p.entityId === 'player');
      if (participant) participant.health = participant.maxHealth;

      const text = 'I finish him and make sure he is dead';
      const resolution = resolveIntent({
        story: NINTH_ARCHIVE,
        state: s,
        intent: intent(text),
        turnId: `t${turn}`,
        seed: `kill-${turn}`,
      });
      s = commitTurn({ story: NINTH_ARCHIVE, state: s, resolution, turnId: `t${turn}` }).state;
      killed = !isAlive(s, 'kael');
    }

    expect(killed, 'Kael survived sixty deliberate attempts on his life').toBe(true);
    expect(s.flags[deadFlag('kael')]).toBe(true);
    // And he is gone from the scene, not standing there dead.
    const present = s.characters.filter((c) => c.alive && c.locationId === s.player.locationId);
    expect(present.map((c) => c.characterId)).not.toContain('kael');
  });

  it('tells the writer what the world lost, on the turn it happens', async () => {
    const { resolveIntent } = await import('./resolve.js');
    const { commitTurn } = await import('./commit.js');

    let s = downed(state(), 'kael');
    s.characters.find((c) => c.characterId === 'kael')!.locationId = s.player.locationId;

    const resolution = resolveIntent({
      story: NINTH_ARCHIVE,
      state: s,
      intent: intent('I finish him and make sure he is dead'),
      turnId: 't',
      seed: 'kill-notes',
    });

    const notes = resolution.privateFacts.map((f) => f.fact).join(' ');
    if (resolution.mutations.some((m) => m.reasonCode === 'KILLED_BY_PLAYER')) {
      expect(notes).toMatch(/stay dead/i);
      expect(notes).not.toMatch(/resurrect/i);
      const after = commitTurn({ story: NINTH_ARCHIVE, state: s, resolution, turnId: 't' }).state;
      expect(isAlive(after, 'kael')).toBe(false);
    }
  });
});

describe('somebody who has given up', () => {
  it('stays given up after the fight object is gone', () => {
    const s = state();
    s.flags[surrenderedFlag('kael')] = true;
    s.encounter = null;

    // The scene the engine promises the writer — "hitting them again is a
    // choice with consequences" — is now actually playable. It was not: the
    // surrender ended the encounter, which restored them to full health.
    const mutations = lethalMutations(s, NINTH_ARCHIVE, 'kael', { deliberate: true }, nextId);
    expect(mutations).toHaveLength(1);
    expect(mutations[0]!.reasonCode).toBe('KILLED_BY_PLAYER');
  });

  it('is still not killed by accident', () => {
    const s = state();
    s.flags[surrenderedFlag('kael')] = true;
    expect(lethalMutations(s, NINTH_ARCHIVE, 'kael', { deliberate: false }, nextId)).toEqual([]);
  });
});
