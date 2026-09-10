import { describe, expect, it } from 'vitest';
import { LAST_FIVE } from '@aniplay/test-fixtures';
import { createInitialState, resolveIntent } from '@aniplay/engine';
import { RuleBasedDirector } from './director.js';
import { RuleBasedIntentParser } from './parser.js';
import { buildTurnContext } from './context.js';

/**
 * Cruelty that leaves a mark.
 *
 * Only a physical attack was ever written down. Four of the ten launch worlds
 * have `allowsCombat: false`, so in those the worst thing a player can do — say
 * it out loud, in front of everybody — moved two points of respect and was
 * remembered by nobody. The adversarial sweep caught it seven times as
 * "came back to someone they attacked and nothing referred to it".
 */

const insult = (text: string) => {
  const story = LAST_FIVE;
  const state = createInitialState({
    sessionId: 'x', story,
    identity: {
      displayName: 'Sora', pronouns: 'they/them', ageBand: null,
      archetypeId: story.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  });
  const intent = new RuleBasedIntentParser().parseSync(text, { story, state, intentId: 'i' });
  const resolution = resolveIntent({ story, state, turnId: 't', seed: 's', intent });
  const context = buildTurnContext({
    story, state, resolution, tier: 'VIVID', memories: [], recentTurns: [],
    actionText: text, playerDialogue: [],
  });
  return new RuleBasedDirector().planSync(context).memoryProposals;
};

describe('what an NPC carries away from being humiliated', () => {
  it('writes it down, as theirs', () => {
    const proposals = insult(
      'I tell Dai, in front of everyone, that they are a fraud and I am done pretending otherwise.',
    );
    const mark = proposals.find((p) => p.subjectId === 'dai');
    expect(mark).toBeDefined();
    expect(mark!.visibility).toBe('NPC_PRIVATE');
    expect(mark!.value).toMatch(/Dai Okonkwo/);
    expect(mark!.value).toMatch(/belittled|threatened/);
  });

  it('makes it important enough to survive until the player comes back', () => {
    const mark = insult('I tell Kai they have always been useless and I never wanted them here.')
      .find((p) => p.subjectId === 'kai')!;
    expect(mark.importance).toBeGreaterThan(0.9);
  });

  it('records one memory per person, not one per dimension that moved', () => {
    // A single insult moves respect and rivalry. Two memories saying the same
    // thing is how an NPC ends up repeating themselves.
    const proposals = insult('I tell Dai they are a fraud.');
    expect(proposals.filter((p) => p.subjectId === 'dai' && p.predicate === 'was_treated_badly_by_player'))
      .toHaveLength(1);
  });

  it('says nothing about an ordinary conversation', () => {
    const proposals = insult('I ask Dai how long he has been playing here.');
    expect(proposals.some((p) => p.predicate === 'was_treated_badly_by_player')).toBe(false);
  });
});
