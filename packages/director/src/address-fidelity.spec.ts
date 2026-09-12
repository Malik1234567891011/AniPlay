import { describe, expect, it } from 'vitest';
import { BLACKWAKE } from '@plotbreak/test-fixtures';
import type { GameState, StoryVersion } from '@plotbreak/contracts';
import { charactersPresent, createInitialState } from '@plotbreak/engine';
import { buildTurnContext } from './context.js';
import { validateNarrative } from './validator.js';

/**
 * A question put to somebody who is not in the room.
 *
 * From a tap-only Itachi run. The player chose "I need to hear what is really
 * happening from those at the police post". The beat opened inside the police
 * building, with Fugaku, who answered instead. Both scenes were good. Only one
 * of them was the one that was chosen.
 *
 * Structural rather than a prompt rule, because a prompt cannot be verified and
 * this can. Writing the refusal, the interruption, or the empty post all pass.
 * Quietly handing the question to whoever is standing nearby does not.
 */
const story = BLACKWAKE as unknown as StoryVersion;

/**
 * A real context, not a hand-built one.
 *
 * The validator reads a dozen fields and a literal stub goes stale the moment
 * any of them moves — which is how this spec spent its first three runs
 * failing on `undefined.length` rather than on the thing it is about.
 */
const state = createInitialState({
  sessionId: 'sess_a', story,
  identity: {
    displayName: 'Sora', pronouns: 'they/them', ageBand: null,
    archetypeId: story.archetypes[0]?.id ?? null,
    worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
  },
}) as GameState;

const presentIds = charactersPresent(state).map((c) => c.characterId);
const present = story.characters.find((c) => presentIds.includes(c.id))!;
const absent = story.characters.find((c) => !presentIds.includes(c.id))!;

const emptyResolution = {
  valid: true, schemaVersion: '1.0' as const, turnId: 't', normalizedActions: [],
  checks: [], mutations: [], observableFacts: [], privateFacts: [],
  timeAdvancedMinutes: 0, rngCursorAfter: 0, refusal: null,
};

const context = (addressedIds: string[]): any =>
  buildTurnContext({
    story, state, resolution: emptyResolution as any, tier: 'VIVID',
    memories: [], recentTurns: [], actionText: 'ask about it', addressedIds,
  });

const turnWithReply = (text: string): any => ({
  sceneSummary: 'A question at the post.',
  endStatePrompt: 'What do you do?',
  suggestedActions: [],
  blocks: [
    { type: 'NARRATION', text, speakerId: null, visibility: 'GROUP', voiceEligible: false },
    { type: 'DIALOGUE', text: 'There is nothing to learn there.', speakerId: present.id, visibility: 'GROUP', voiceEligible: true },
  ],
});

/** Matched on the message, so another rule reaching the same code cannot pass this by accident. */
const substituted = (addressedIds: string[], text: string): boolean =>
  validateNarrative({ context: context(addressedIds), turn: turnWithReply(text) }).violations.some((v) =>
    /somebody else in the room answered/i.test(v.description),
  );

describe('addressing somebody who is not here', () => {
  it('flags a beat where somebody else answers the question', () => {
    expect(substituted([absent.id], 'You ask what is happening.')).toBe(true);
  });

  it('accepts a beat that says they are not there', () => {
    expect(substituted([absent.id], 'The post is empty. Nobody is standing there.')).toBe(false);
  });

  it('accepts a beat that names them, because naming them is acknowledging them', () => {
    expect(substituted([absent.id], `You ask after ${absent.name.split(' ')[0]}, and get a look for it.`)).toBe(false);
  });

  it('says nothing when the player addressed somebody who is actually here', () => {
    expect(substituted([present.id], 'You put the question to them and wait.')).toBe(false);
  });

  it('says nothing when the player addressed nobody', () => {
    expect(substituted([], 'You keep walking, and the street narrows to blue.')).toBe(false);
  });
});
