import { describe, expect, it } from 'vitest';
import { NINE_WEEKS } from '@aniplay/test-fixtures';
import { createInitialState } from '@aniplay/engine';
import type { TurnRecord } from '@aniplay/contracts';
import { RuleBasedIntentParser } from './parser.js';
import { addresseeFrom } from './pipeline.js';

/**
 * A room with three people in it and a line that names none of them.
 *
 * From the 25-turn Nine Weeks run. The response cards are first-person prose —
 * "I lean back, arms crossed with a smirk. 'So it's pancakes and swims, huh?
 * Sounds like you're dodging the juicy stuff.'" — and the addressee fallback
 * was `present(spoken) ?? present(raw) ?? soleCompanion`. With Juno, Cass and
 * Nadia at the bar, all three failed: the line names nobody, and there is no
 * *sole* companion. So no speech action was created, nobody was obliged to
 * answer, and the beat came back as the player talking to a room.
 */

const story = NINE_WEEKS;
const state = createInitialState({
  sessionId: 'sess_a',
  story,
  identity: {
    displayName: 'Robin', pronouns: 'they/them', ageBand: null,
    archetypeId: story.archetypes[0]!.id, worldKnowsAboutYou: '',
    advanced: {}, portraitAssetId: null,
  },
});

const parse = (text: string, addressee?: string | null) =>
  new RuleBasedIntentParser().parseSync(text, { story, state, intentId: 'int_x', addressee });

const speechTargets = (text: string, addressee?: string | null) =>
  parse(text, addressee)
    .actions.filter((a) => a.verb === 'speak')
    .flatMap((a) => a.targets.map((t) => t.entityId));

describe('who a line with no name in it is aimed at', () => {
  it('names nobody and reaches nobody without a hint', () => {
    expect(speechTargets('I lean back with a smirk. "So it’s pancakes and swims, huh?"')).toEqual([]);
  });

  it('reaches the person the caller says it is aimed at', () => {
    expect(
      speechTargets('I lean back with a smirk. "So it’s pancakes and swims, huh?"', 'juno'),
    ).toContain('juno');
  });

  it('ignores a hint naming somebody who is not in the room', () => {
    expect(
      speechTargets('I lean back with a smirk. "So it’s pancakes and swims, huh?"', 'nobody_here'),
    ).toEqual([]);
  });

  it('still prefers a name the player actually wrote over the hint', () => {
    const targets = speechTargets('I turn to Teo. "You alright?"', 'juno');
    expect(targets).toContain('teo');
  });

  it('does not invent a speech act where there is no dialogue', () => {
    expect(speechTargets('I walk out to the dock.', 'juno')).toEqual([]);
  });
});

describe('where the hint comes from', () => {
  const turn = (blocks: TurnRecord['blocks']) => [{ blocks }] as unknown as readonly TurnRecord[];

  it('prefers the tapped card’s own hint', () => {
    expect(
      addresseeFrom({ selectedIntentHint: 'speak:juno', recentTurns: turn([]) }),
    ).toBe('juno');
  });

  it('falls back to whoever spoke to the player last', () => {
    expect(
      addresseeFrom({
        selectedIntentHint: null,
        recentTurns: turn([
          { type: 'DIALOGUE', speakerId: 'juno', text: 'Robin, all right.' },
          { type: 'NARRATION', speakerId: null, text: 'The glass sweats in their hand.' },
          { type: 'DIALOGUE', speakerId: 'cass', text: 'Everybody messes something up.' },
        ] as unknown as TurnRecord['blocks']),
      }),
    ).toBe('cass');
  });

  it('is null when nobody spoke and nothing was tapped', () => {
    expect(
      addresseeFrom({
        selectedIntentHint: null,
        recentTurns: turn([
          { type: 'NARRATION', speakerId: null, text: 'The dock is empty.' },
        ] as unknown as TurnRecord['blocks']),
      }),
    ).toBeNull();
  });

  it('treats a bare "freeform" hint as no hint at all', () => {
    expect(addresseeFrom({ selectedIntentHint: 'freeform', recentTurns: turn([]) })).toBeNull();
  });
});
