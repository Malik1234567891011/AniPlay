/**
 * Three things the player could say next.
 *
 * The old model was an affordance list. `buildOpportunities` returns everything
 * currently *possible* — who is in the room, where the exits go, which abilities
 * are affordable — and `buildSuggestions` rendered the first of each into a
 * label: `Ask ${presentCharacters[0]} about ${topics[0]}`. That is a pure
 * function of the scene, with no memory of the turn that just happened, so
 * "Ask Dai about the five." regenerated verbatim on the turn immediately after
 * the player asked Dai about the five.
 *
 * Nothing was stale and nothing was carried forward. The card came back because
 * Dai was still standing there. But the effect on screen is a checklist — two
 * authored tasks, one ticked, one outstanding — and that is most of why
 * ordinary play read as a quest system rather than a story.
 *
 * So these are generated *after* the beat is written, from what the beat
 * actually says. They are the protagonist's own words, in first person, with an
 * action and usually a line of dialogue, and they are three genuinely different
 * attitudes rather than three different quest branches.
 *
 * Latency: this runs after the prose has finished streaming, so it is off the
 * first-text path entirely. The player is already reading when it starts.
 */
import type { NarrativeTurn, SuggestedAction } from '@aniplay/contracts';
import { z } from 'zod';
import type { TurnContext } from './context.js';
import type { ModelGateway } from './gateway/types.js';
import { ModelGatewayError } from './gateway/types.js';
import { buildMessages, SAFETY_POLICY, worldRules } from './model-stages.js';
import { speakerBrief } from './speaker-brief.js';

const ResponseSet = z
  .object({
    responses: z
      .array(
        z
          .object({
            text: z.string().max(320),
            /** The attitude this one takes, for the diversity check below. */
            attitude: z.string().max(40),
          })
          .strict(),
      )
      .min(2)
      .max(4),
  })
  .strict();

const POLICY = [
  'You write what the player could say and do next. Three of them, as the player would write them.',
  '',
  'Each is a complete response in first person: an action, and usually a line of dialogue with it.',
  'Write them the way the player would type them into the box, because that is exactly where they go —',
  'the same interpreter reads a tapped response and a typed one, and they must mean the same thing.',
  '',
  'GOOD: "I lean against the scorer’s table and look at Dai. ‘Everyone keeps talking about those five',
  'like they were untouchable. What were they actually like?’"',
  'BAD: "Ask Dai about the five." That is a menu item. Nobody talks like that, and tapping it does not',
  'feel like playing a person.',
  '',
  'The three are different ATTITUDES, not different errands. Curious, cocky, careful, cruel, funny,',
  'flirtatious, blunt, evasive, kind — whichever contrasts actually exist in this moment. Never',
  '"progress the quest / do something else / be silly", and never one obviously correct option with two',
  'filler ones. Somebody should plausibly pick each of them.',
  '',
  'They answer the beat that just happened. If a character asked a question, at least one should answer',
  'it. If somebody walked out, the responses are about that. If the player just burned the room down,',
  'nobody is discussing homework.',
  '',
  'Never announce the outcome. "I cross him over and dunk on him" decides something the world decides.',
  'Write the attempt and the intent: "I wave Jun over. ‘Guard me.’ The second he squares up I go at his',
  'weak side and try to get all the way to the rim."',
  '',
  'Never mention dice, difficulty, costs, resources, stats, quests or objectives. The player sees what',
  'they would like to do, not what the engine is doing about it.',
  '',
  'Only people who are actually in the room. Somebody who has left, or is dead, is not somebody to',
  'address. Use their name the way the prose does.',
  '',
  'Never steer. If the player has walked away from what the story wanted, the responses are about the',
  'life they are living now, not about getting them back. Somebody who quit the team is not offered',
  'three ways to apologise to the coach.',
].join('\n');

/**
 * What the responses are allowed to know.
 *
 * Deliberately the same reality the writer just used, plus the prose it
 * produced. Choices generated from quest state alone are how a suggestion ends
 * up pointing at content the player abandoned four turns ago.
 */
function payload(context: TurnContext, narrative: NarrativeTurn): Record<string, unknown> {
  return {
    theBeatThatJustHappened: narrative.blocks.map((b) => b.text),
    whatThePlayerDid: context.playerAction,
    where: context.scene.locationName,
    when: context.scene.worldTimeLabel,
    you: {
      name: context.player.name,
      pronouns: context.player.pronouns,
      youAre: context.player.archetype,
      whatTheWorldKnows: context.player.about,
      // What this player has established about themselves. A 271-year-old elf
      // who keeps making jokes should sometimes be offered a joke.
      aboutYou: context.player.setupAnswers,
    },
    inTheRoom: context.presentCharacters.map(speakerBrief),
    /** So a response can pick up a thread rather than restart the conversation. */
    recently: context.recentTurns.slice(-2).map((t) => t.sceneSummary),
    remembered: context.retrievedFacts.map((f) => f.fact.text),
  };
}

/**
 * Generated responses, or null when the model is unavailable.
 *
 * Null rather than a throw: a turn without cards is a turn the player types
 * into, which is a worse experience and not a broken one.
 */
export async function generateResponses(
  gateway: ModelGateway,
  context: TurnContext,
  narrative: NarrativeTurn,
): Promise<SuggestedAction[] | null> {
  try {
    const result = await gateway.generateStructured(
      'writer_fast',
      ResponseSet,
      buildMessages({
        rolePolicy: POLICY,
        safety: SAFETY_POLICY,
        worldRules: worldRules(context),
        state: payload(context, narrative),
        task:
          'Write three responses the player could send next. Each is first person, 1–3 sentences, ' +
          'an action and usually a line of dialogue. Give each a one-word attitude.',
      }),
      { maxTokens: 700, temperature: 0.9, timeoutMs: 12_000 },
    );

    const responses = result.value.responses
      .map((r) => ({
        // The interpreter reads this exactly as if it were typed, so the hint
        // says nothing the words do not: no verb to privilege, no target to
        // pre-resolve, no separate command language for cards.
        text: r.text.trim(),
        intentHint: 'freeform',
        risk: undefined,
        resourceCostLabel: null,
      }))
      .filter((r) => r.text.length > 0)
      .slice(0, 3);

    return responses.length >= 2 ? responses : null;
  } catch (error) {
    if (error instanceof ModelGatewayError) return null;
    throw error;
  }
}
