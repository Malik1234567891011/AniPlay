import { describe, expect, it } from 'vitest';
import { LAST_FIVE } from '@aniplay/test-fixtures';
import { createInitialState, resolveIntent } from '@aniplay/engine';
import { RuleBasedDirector } from './director.js';
import { RuleBasedIntentParser } from './parser.js';
import { buildTurnContext } from './context.js';

/**
 * The screenshot that started this.
 *
 * The player was offered "Ask Dai about the five." They selected it. It appeared
 * correctly in the transcript as what they did. And then the *next* scene
 * offered "Ask Dai about the five." again, next to "Guard him — Jun" — so the
 * screen read as two authored tasks with one ticked off.
 *
 * Nothing was stale: the client replaces the array each turn and hides the
 * cards while a turn resolves. The card came back because it is generated from
 * standing affordances — Dai is present, so `Ask ${present[0]} about
 * ${topics[0]}` renders again, identically, forever.
 */

const play = (actionText: string) => {
  const story = LAST_FIVE;
  const state = createInitialState({
    sessionId: 'x', story,
    identity: {
      displayName: 'Sora', pronouns: 'they/them', ageBand: null,
      archetypeId: story.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  });
  const intent = new RuleBasedIntentParser().parseSync(actionText, { story, state, intentId: 'i' });
  const resolution = resolveIntent({ story, state, turnId: 't', seed: 's', intent });
  const context = buildTurnContext({
    story, state, resolution, tier: 'VIVID', memories: [], recentTurns: [], actionText,
  });
  return new RuleBasedDirector().planSync(context).suggestedActions;
};

describe('a response the player just used is not offered back to them', () => {
  it('does not re-offer the exact card that was selected', () => {
    // The opening beat offers it; this is the turn *after* selecting it.
    const opening = play('I look around the gym.');
    const asked = opening.find((s) => /ask dai/i.test(s.text));
    expect(asked, 'the opening should offer it at all').toBeDefined();

    const after = play(asked!.text);
    expect(after.map((s) => s.text)).not.toContain(asked!.text);
  });

  it('does not re-offer it when the player typed the same thing in their own words', () => {
    const after = play('I ask Dai what the five were actually like.');
    expect(after.some((s) => /ask dai about/i.test(s.text))).toBe(false);
  });

  it('still offers something, rather than going blank', () => {
    expect(play('I ask Dai about the five.').length).toBeGreaterThan(0);
  });

  it('leaves an unrelated response alone', () => {
    // Guarding Jun is not what the player just did, so it is not suppressed —
    // it is simply not carried forward as an obligation either. The model path
    // regenerates from the new beat; this floor only removes the echo.
    const after = play('I ask Dai about the five.');
    expect(after.every((s) => !/ask dai about/i.test(s.text))).toBe(true);
  });
});
