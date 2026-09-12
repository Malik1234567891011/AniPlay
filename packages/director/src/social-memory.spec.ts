import { describe, expect, it } from 'vitest';
import { LAST_FIVE } from '@plotbreak/test-fixtures';
import { createInitialState, resolveIntent } from '@plotbreak/engine';
import { RuleBasedDirector } from './director.js';
import { RuleBasedIntentParser } from './parser.js';
import { buildTurnContext } from './context.js';
import { isStructuredFact, type StructuredFact } from './memory-facts.js';
import { renderFactText } from './memory.js';

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

    // The mark is **structure**, not a sentence. It used to be
    // `Sora threatened and belittled Dai Okonkwo at …` — English prose, stored,
    // and then read back into the writer's context window every turn. In a
    // French session that is the most reliable way to induce language drift
    // there is, and it compounds as memory accumulates.
    expect(isStructuredFact(mark!.value)).toBe(true);
    const fact = mark!.value as Extract<StructuredFact, { kind: 'HOSTILE_ACT' }>;
    expect(fact.kind).toBe('HOSTILE_ACT');
    expect(fact.targetId).toBe('dai');
    expect(fact.actorId).toBe('player');
    expect(['threaten', 'oppose', 'deceive']).toContain(fact.verb);
  });

  it('still says the same thing in English once it is rendered', () => {
    // The structure is what is stored; the sentence is what is read. English
    // must be exactly what it was before the fact stopped being prose.
    const mark = insult(
      'I tell Dai, in front of everyone, that they are a fraud and I am done pretending otherwise.',
    ).find((p) => p.subjectId === 'dai')!;

    const text = renderFactText(mark, LAST_FIVE, 'Sora', 'en');
    expect(text).toMatch(/Dai Okonkwo/);
    expect(text).toMatch(/belittled|threatened|refused|lied/);
    expect(text).toMatch(/^Dai Okonkwo was treated badly by player: Sora /);
  });

  it('says it in French for a French run, with no English left in it', () => {
    // The point of the whole change: nothing English reaches a French context
    // window, and the same fact is legible in both languages — which is what
    // makes a French run and an English run comparable during QA.
    const mark = insult(
      'I tell Dai, in front of everyone, that they are a fraud and I am done pretending otherwise.',
    ).find((p) => p.subjectId === 'dai')!;

    const text = renderFactText(mark, LAST_FIVE, 'Sora', 'fr');
    expect(text).toContain('Dai Okonkwo');
    expect(text).toContain('a été maltraité par le joueur');
    expect(text).not.toMatch(/\b(threatened|belittled|attacked|saw|at)\b/);
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
