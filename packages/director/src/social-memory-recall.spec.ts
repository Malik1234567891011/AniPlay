import { describe, expect, it } from 'vitest';
import { LAST_FIVE } from '@plotbreak/test-fixtures';
import { createInitialState, resolveIntent } from '@plotbreak/engine';
import { RuleBasedDirector } from './director.js';
import { RuleBasedIntentParser } from './parser.js';
import { buildTurnContext } from './context.js';
import { materializeProposals } from './memory.js';
import { speakerBrief } from './speaker-brief.js';
import { commitTurn } from '@plotbreak/engine';

/**
 * The other half of remembering: it has to come back.
 *
 * Proposing a memory and retrieving it are different things, and the adversarial
 * sweep measures the second one — it comes back to somebody the player was
 * cruel to and checks whether anything refers to it. A fact that is stored and
 * never surfaces is the same experience as no fact at all.
 */
describe('coming back to somebody you were cruel to', () => {
  it('puts what you did in front of the writer, in their own words', () => {
    const story = LAST_FIVE;
    let state = createInitialState({
      sessionId: 'x', story,
      identity: {
        displayName: 'Sora', pronouns: 'they/them', ageBand: null,
        archetypeId: story.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
      },
    });

    // Turn one: the insult.
    const cruel = 'I tell Dai, in front of everyone, that they are a fraud and I am done pretending otherwise.';
    const intent = new RuleBasedIntentParser().parseSync(cruel, { story, state, intentId: 'i' });
    const resolution = resolveIntent({ story, state, turnId: 't1', seed: 's', intent });
    const plan = new RuleBasedDirector().planSync(
      buildTurnContext({ story, state, resolution, tier: 'VIVID', memories: [], recentTurns: [], actionText: cruel }),
    );
    const committed = commitTurn({ story, state, resolution, turnId: 't1' });
    const memories = materializeProposals(plan.memoryProposals, committed.state, 't1', story);
    state = committed.state;

    expect(memories.some((m) => m.subjectId === 'dai')).toBe(true);

    // Turn two: come back to him, several beats later.
    state = { ...state, turnIndex: 8 };
    const back = 'I ask Dai whether he is still angry about what I said.';
    const laterIntent = new RuleBasedIntentParser().parseSync(back, { story, state, intentId: 'i2' });
    const later = buildTurnContext({
      story, state,
      resolution: resolveIntent({ story, state, turnId: 't2', seed: 's2', intent: laterIntent }),
      tier: 'VIVID', memories, recentTurns: [], actionText: back,
    });

    // The writer is handed it as something *Dai* knows, not as scenery.
    const dai = later.presentCharacters.find((c) => c.def.id === 'dai')!;
    expect(dai.knownMemories.map((m) => m.fact.text).join(' ')).toMatch(/belittled|threatened/i);

    // And pulled out of the list, because buried among eight things somebody
    // knows it reads like scenery rather than like the reason they are cold.
    const brief = speakerBrief(dai);
    expect(brief.holdingAgainstYou.join(' ')).toMatch(/belittled|threatened/i);
  });

  it('holds nothing against somebody the player has been fine to', () => {
    const story = LAST_FIVE;
    const state = createInitialState({
      sessionId: 'y', story,
      identity: {
        displayName: 'Sora', pronouns: 'they/them', ageBand: null,
        archetypeId: story.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
      },
    });
    const text = 'I ask Kai how long he has been playing.';
    const context = buildTurnContext({
      story, state,
      resolution: resolveIntent({
        story, state, turnId: 't', seed: 's',
        intent: new RuleBasedIntentParser().parseSync(text, { story, state, intentId: 'i' }),
      }),
      tier: 'VIVID', memories: [], recentTurns: [], actionText: text,
    });
    for (const character of context.presentCharacters) {
      expect(speakerBrief(character).holdingAgainstYou).toEqual([]);
    }
  });
});
