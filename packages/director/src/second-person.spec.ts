import { describe, expect, it } from 'vitest';
import { narratesPlayerInThirdPerson, toSecondPerson } from './second-person.js';

describe('toSecondPerson', () => {
  it('rewrites the sentence that started this', () => {
    expect(
      toSecondPerson(
        'Robin lunges toward Mira Senn and swings. Mira twists aside; Robin’s hand cuts only damp air.',
        'Robin Vale',
      ),
    ).toBe('You lunge toward Mira Senn and swings. Mira twists aside; your hand cuts only damp air.');
  });

  it('fixes verb agreement, including the irregulars', () => {
    expect(toSecondPerson('Robin is late. Robin has the letter. Robin goes inside.', 'Robin')).toBe(
      'You are late. You have the letter. You go inside.',
    );
    expect(toSecondPerson('Robin watches. Robin tries again. Robin passes the gate.', 'Robin')).toBe(
      'You watch. You try again. You pass the gate.',
    );
  });

  it('does not mangle a word that only looks like a verb', () => {
    expect(toSecondPerson('Robin and Kael wait. Robin, still holding it, says nothing.', 'Robin')).toBe(
      'You and Kael wait. You, still holding it, says nothing.',
    );
  });

  it('prefers the full name over the first name', () => {
    expect(toSecondPerson('Robin Vale steps through.', 'Robin Vale')).toBe('You step through.');
  });

  it('leaves prose that is already second person alone', () => {
    const text = 'You step through the arch and the light goes red.';
    expect(toSecondPerson(text, 'Robin Vale')).toBe(text);
  });

  it('does nothing for a name too short to match safely', () => {
    expect(toSecondPerson('A stands there.', 'A')).toBe('A stands there.');
  });
});

describe('narratesPlayerInThirdPerson', () => {
  it('spots the player being written about', () => {
    expect(narratesPlayerInThirdPerson('Robin lunges forward.', 'Robin Vale')).toBe(true);
    expect(narratesPlayerInThirdPerson('You lunge forward.', 'Robin Vale')).toBe(false);
  });
});

/**
 * The two problems that share the NAME_IDENTITY_DRIFT code are not the same
 * repair: the player narrated in third person is rewritten, and a block spoken
 * by somebody who does not exist is dropped. Clearing the code wholesale after
 * the rewrite kept `speakerId: "narrator"` in the turn.
 */
describe('repairing voice without swallowing an unknown speaker', () => {
  it('rewrites the one and drops the other', async () => {
    const { NINTH_ARCHIVE } = await import('@aniplay/test-fixtures');
    const { createInitialState, resolveIntent } = await import('@aniplay/engine');
    const { RuleBasedIntentParser } = await import('./parser.js');
    const { buildTurnContext } = await import('./context.js');
    const { validateNarrative, repairNarrative } = await import('./validator.js');

    const state = createInitialState({
      sessionId: 's',
      story: NINTH_ARCHIVE,
      identity: {
        displayName: 'Robin Vale',
        pronouns: 'they/them',
        ageBand: null,
        archetypeId: null,
        worldKnowsAboutYou: '',
        advanced: {},
        portraitAssetId: null,
      },
    });
    const intent = new RuleBasedIntentParser().parseSync('I look around', {
      story: NINTH_ARCHIVE,
      state,
      intentId: 'i',
    });
    const resolution = resolveIntent({ story: NINTH_ARCHIVE, state, intent, turnId: 't', seed: 's' });
    const context = buildTurnContext({
      story: NINTH_ARCHIVE,
      state,
      resolution,
      tier: 'VIVID',
      memories: [],
      recentTurns: [],
      actionText: 'I look around',
      playerDialogue: [],
    });

    const turn = {
      schemaVersion: '1.0' as const,
      sceneSummary: 'x',
      blocks: [
        {
          type: 'NARRATION' as const,
          speakerId: 'narrator',
          text: 'The light over the arch is red.',
          visibility: 'GROUP' as const,
          voiceEligible: false,
        },
        {
          type: 'NARRATION' as const,
          speakerId: null,
          text: 'Robin steps under the arch.',
          visibility: 'GROUP' as const,
          voiceEligible: false,
        },
      ],
      stateDeltaPresentation: [],
      endStatePrompt: 'x',
    };

    const repaired = repairNarrative(turn, validateNarrative({ context, turn }), 'Robin Vale');
    expect(repaired.blocks.some((b) => b.speakerId === 'narrator')).toBe(false);
    expect(repaired.blocks.map((b) => b.text).join(' ')).toContain('You step under the arch');
  });
});
