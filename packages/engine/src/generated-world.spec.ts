import { describe, expect, it } from 'vitest';
import { GameState } from '@aniplay/contracts';
import { NINTH_ARCHIVE } from '@aniplay/test-fixtures';
import {
  composeStory,
  generatedId,
  isGenerated,
  matchMention,
  mentionFlag,
  mentionedNames,
  promoteCharacter,
  promoteLocation,
  recordMentions,
} from './generated-world.js';
import { applyMutations } from './mutations.js';
import { commitTurn } from './commit.js';
import { resolveIntent } from './resolve.js';
import { createInitialState, charactersPresent } from './state.js';

/**
 * The world the player made.
 *
 * A published StoryVersion is immutable and shared, so anything the story
 * invented for one player had nowhere to live. The café the writer conjured on
 * the way out of the academy read beautifully and was gone by the next
 * session, because it had never been anywhere but a paragraph.
 */

const state = (): GameState =>
  createInitialState({
    sessionId: 'sess_g',
    story: NINTH_ARCHIVE,
    identity: {
      displayName: 'Sora', pronouns: 'they/them', ageBand: null,
      archetypeId: 'arch_duelist', worldKnowsAboutYou: '',
      advanced: {}, portraitAssetId: null,
    },
  });

let n = 0;
const nextId = (): string => `m${n++}`;

describe('composition', () => {
  it('changes nothing when the player has made nothing', () => {
    expect(composeStory(NINTH_ARCHIVE, state())).toBe(NINTH_ARCHIVE);
  });

  it('adds the player’s people and places to the world', () => {
    const s = state();
    s.generated.characters.push(promoteCharacter(s, 'Riku Sato', 'talked to them', nextId).character!);
    s.generated.locations.push(promoteLocation(s, 'Moonlight Café', 'went there', 20, nextId).location!);

    const composed = composeStory(NINTH_ARCHIVE, s);
    expect(composed.characters.some((c) => c.name === 'Riku Sato')).toBe(true);
    expect(composed.locations.some((l) => l.name === 'Moonlight Café')).toBe(true);
    // And leaves the authored world intact.
    expect(composed.characters.some((c) => c.id === 'mira')).toBe(true);
  });

  it('never lets a generated entry shadow an authored one', () => {
    const s = state();
    const fake = { ...NINTH_ARCHIVE.characters[0]!, name: 'Not Really Mira' };
    s.generated.characters.push(fake);
    const composed = composeStory(NINTH_ARCHIVE, s);
    expect(composed.characters.filter((c) => c.id === fake.id)).toHaveLength(1);
    expect(composed.characters.find((c) => c.id === fake.id)!.name).toBe(NINTH_ARCHIVE.characters[0]!.name);
  });

  it('marks generated ids so they are never mistaken for authored ones', () => {
    expect(isGenerated(generatedId('npc', 'Riku Sato'))).toBe(true);
    expect(isGenerated('mira')).toBe(false);
    expect(generatedId('loc', 'The Moonlight Café')).toBe('gen_loc_the_moonlight_cafe');
  });
});

describe('what the story has put in front of the player', () => {
  it('records proper nouns from a beat', () => {
    const text = 'You push out past the gate and the street opens up. The Moonlight Café is still lit.';
    const mutations = recordMentions(text, NINTH_ARCHIVE, nextId);
    const names = mutations.map((m) => m.payload.value);
    expect(names).toContain('Moonlight Café');
  });

  it('ignores names the world already has', () => {
    const text = 'Mira is at the Gate Arch.';
    expect(recordMentions(text, NINTH_ARCHIVE, nextId)).toEqual([]);
  });

  it('ignores ordinary sentence starters', () => {
    const text = 'You look around. There is nothing here. Nobody speaks.';
    expect(recordMentions(text, NINTH_ARCHIVE, nextId)).toEqual([]);
  });

  it('matches what the player is pointing at, longest name first', () => {
    const s = state();
    s.flags[mentionFlag('Moonlight')] = 'Moonlight';
    s.flags[mentionFlag('Moonlight Café')] = 'Moonlight Café';
    expect(matchMention('go back to the moonlight café', s)).toBe('Moonlight Café');
    expect(mentionedNames(s)).toHaveLength(2);
  });

  it('matches nothing when the player names something never mentioned', () => {
    expect(matchMention('go to the Crystal Palace', state())).toBeNull();
  });
});

describe('promotion happens because the player made it happen', () => {
  it('turns a mentioned place into somewhere you can actually go', () => {
    const s = state();
    s.flags[mentionFlag('Moonlight Café')] = 'Moonlight Café';

    const resolution = resolveIntent({
      story: NINTH_ARCHIVE, state: s, turnId: 't', seed: 'go',
      intent: {
        schemaVersion: '1.0', intentId: 'i', rawAction: 'I go to the Moonlight Café.',
        dialogue: [], confidence: 0.9, ambiguities: [], unsafeOrMetaRequests: [],
        actions: [{
          verb: 'travel', actor: { entityType: 'player', entityId: 'player' },
          targets: [{ entityType: 'location', entityId: 'nowhere', displayName: 'Moonlight Café' }],
          method: 'go to the Moonlight Café', declaredOutcome: '', timeIntent: 'NOW',
        }],
      },
    });

    expect(resolution.normalizedActions[0]).toMatchObject({ status: 'RESOLVED' });
    const after = commitTurn({ story: NINTH_ARCHIVE, state: s, resolution, turnId: 't' }).state;

    // It exists, the player is in it, and it is on the session.
    expect(after.generated.locations.map((l) => l.name)).toContain('Moonlight Café');
    expect(after.player.locationId).toBe(generatedId('loc', 'Moonlight Café'));
    expect(after.generated.origins[0]).toMatchObject({ kind: 'LOCATION' });
  });

  it('still refuses a place the story never mentioned', () => {
    const resolution = resolveIntent({
      story: NINTH_ARCHIVE, state: state(), turnId: 't', seed: 'go',
      intent: {
        schemaVersion: '1.0', intentId: 'i', rawAction: 'I go to Atlantis.',
        dialogue: [], confidence: 0.9, ambiguities: [], unsafeOrMetaRequests: [],
        actions: [{
          verb: 'travel', actor: { entityType: 'player', entityId: 'player' },
          targets: [{ entityType: 'location', entityId: 'atlantis', displayName: 'Atlantis' }],
          method: 'go to Atlantis', declaredOutcome: '', timeIntent: 'NOW',
        }],
      },
    });
    expect(resolution.normalizedActions[0]).toMatchObject({ status: 'REJECTED' });
  });

  it('gives a promoted place a way back, so it is not a trap', () => {
    const s = state();
    const promotion = promoteLocation(s, 'Moonlight Café', 'went there', 20, nextId);
    expect(promotion.location!.connections.some((c) => c.to === s.player.locationId)).toBe(true);
  });

  it('tells the writer that nothing about it is authored', () => {
    const s = state();
    expect(promoteLocation(s, 'Moonlight Café', 'went there', 20, nextId).note).toMatch(
      /still be here next session/i,
    );
    expect(promoteCharacter(s, 'Riku Sato', 'talked to them', nextId).note).toMatch(
      /whatever you establish now is what they are/i,
    );
  });

  it('makes a promoted person a real character in every sense', () => {
    const s = state();
    const riku = promoteCharacter(s, 'Riku Sato', 'talked to them', nextId).character!;
    s.generated.characters.push(riku);
    s.characters.push({
      characterId: riku.id, locationId: s.player.locationId, alive: true,
      health: null, statuses: [], revealedSecretIds: [], learnedFactIds: [],
    });

    const composed = composeStory(NINTH_ARCHIVE, s);
    // On the stage, addressable, and a legal target.
    expect(charactersPresent(s).map((c) => c.characterId)).toContain(riku.id);
    expect(composed.characters.find((c) => c.id === riku.id)!.name).toBe('Riku Sato');
  });
});

describe('it survives the thing that used to erase it', () => {
  it('is on the session snapshot, so a reload keeps it', () => {
    const s = state();
    const promotion = promoteLocation(s, 'Moonlight Café', 'went there', 20, nextId);
    const after = applyMutations(s, NINTH_ARCHIVE, [
      ...promotion.mutations,
      {
        mutationId: 'm', type: 'LOCATION_CHANGE', subjectId: 'player', reasonCode: 'TRAVEL_TO_GENERATED',
        payload: { locationId: promotion.location!.id, generated: promotion.location },
      },
    ]);

    // The whole point: serialise and come back, the way a session does.
    const reloaded = GameState.parse(JSON.parse(JSON.stringify(after)));
    expect(reloaded.generated.locations.map((l) => l.name)).toContain('Moonlight Café');
    expect(composeStory(NINTH_ARCHIVE, reloaded).locations.some((l) => l.name === 'Moonlight Café')).toBe(true);
  });

  it('does not promote the same place twice', () => {
    const s = state();
    const promotion = promoteLocation(s, 'Moonlight Café', 'went there', 20, nextId);
    const move = {
      mutationId: 'm', type: 'LOCATION_CHANGE' as const, subjectId: 'player',
      reasonCode: 'TRAVEL_TO_GENERATED', payload: { locationId: promotion.location!.id, generated: promotion.location },
    };
    let after = applyMutations(s, NINTH_ARCHIVE, [move]);
    after = applyMutations(after, NINTH_ARCHIVE, [move]);
    expect(after.generated.locations).toHaveLength(1);
  });
});
