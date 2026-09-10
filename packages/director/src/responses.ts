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
import { stateBands } from './state-bands.js';

const ResponseSet = z
  .object({
    responses: z
      .array(
        z
          .object({
            text: z.string().max(320),
            /** The attitude this one takes, for the diversity check below. */
            attitude: z.string().max(40),
            /**
             * Who this response is aimed at, by id, from `inTheRoom`.
             *
             * Not a command language — the text still goes to the interpreter
             * verbatim, exactly as if it were typed. This is the one fact the
             * card already knows and a regex has to guess: a tap of *"So it's
             * pancakes and swims, huh? Sounds like you're dodging"* names
             * nobody, and in a room of three the parser gave up and created no
             * speech act at all, so nobody was obliged to answer.
             */
            addressedTo: z.string().max(64).nullable(),
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
  'they would like to do, not what the engine is doing about it. `worldState` says how the world is',
  'behaving; write responses that fit it and never refer to it.',
  '',
  'Only people who are actually in the room. Somebody who has left, or is dead, is not somebody to',
  'address. Use their name the way the prose does. `inTheRoom` is the whole cast available to you.',
  '',
  'If `inTheRoom` is EMPTY the player is alone, and none of the three may be a line of dialogue.',
  'Nobody is there to hear it. A player alone on a dock, offered "Want to come?", has been handed a',
  'card that cannot work — and one of the three must be a way out of the room, because a scene with',
  'nobody in it has nothing left to give.',
  '',
  'Start from where the player is NOW and what actually happened to them, not from what they tried.',
  '`howItWentForYou` says which. If the thing they attempted was refused, no response may assume it',
  'worked. Juno saying "we are not sneaking out those steps" and the next card opening "I step out',
  'onto the back steps" is the story ignoring its own best moment.',
  '',
  'The player owns nothing you have not seen. No cigarette, no drink, no jacket, no knife unless the',
  'beat put it there. Inventing a prop for a gesture writes a character the player did not.',
  '',
  'Never steer. If the player has walked away from what the story wanted, the responses are about the',
  'life they are living now, not about getting them back. Somebody who quit the team is not offered',
  'three ways to apologise to the coach.',
  '',
  'Do not re-ask what has just been asked. `youHaveAlreadyTried` is what the player has said in the',
  'last few turns: if they put a question to somebody and got deflected, offering a politer version of',
  'the same question is the story standing still. Press differently, drop it and go at something else,',
  'or do something instead of asking — but move.',
  '',
  'At least one of the three should be able to change the scene: go somewhere, start something, end the',
  'conversation, involve somebody else. Three ways to keep talking to the same person about the same',
  'thing is a story that cannot move.',
  '',
  'When a response goes somewhere, NAME the place, using one of `whereYouCouldGo` and the world\'s own',
  'word for it. "Lead the way" and "as we walk" read like movement and are not movement — the player',
  'stays exactly where they were. "I pick up my bag and follow her down to the Esplanade" is movement.',
  'If a scene has been in one room for a while and nothing is holding the player there, one of the',
  'three should leave it.',
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
    /**
     * What actually became of the attempt.
     *
     * The payload used to carry only the attempt and the prose, and left the
     * model to infer the outcome from the writing. It inferred wrong at the
     * most important moment of a 25-turn run: Juno refused, out loud and in
     * character, to leave the bar — and all three of the next cards put the
     * player outside on the steps.
     */
    howItWentForYou: outcomeOf(context),
    youAreAlone: context.presentCharacters.length === 0,
    /**
     * Real exits, by name.
     *
     * Without these the responses talk about leaving instead of leaving. Nine
     * turns of a Seven Days playtest stayed on one railway platform while the
     * cards said "lead the way — pastries before secrets" and "I glance at the
     * bakery sign as we walk": the prose moved and the player did not, because
     * nothing named a destination the parser could resolve.
     */
    whereYouCouldGo: exitsFrom(context),
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
    // How the world is behaving right now. A response written against a house
    // that has started staging scenes around you is a different response from
    // one written against a house that has barely noticed you.
    worldState: stateBands(context),
    /** So a response can pick up a thread rather than restart the conversation. */
    recently: context.recentTurns.slice(-3).map((t) => t.sceneSummary),
    /**
     * What the player has already tried, in their own words.
     *
     * Without this the responses circle. The player asked what Mina's watch
     * was hiding, she deflected, and the next set opened with "You're hiding
     * something, Mina. Tell me — what's the story behind that old watch?" —
     * the same question, one turn later, which is the original checklist
     * problem wearing a better sentence.
     */
    youHaveAlreadyTried: context.recentTurns
      .slice(-4)
      .map((t) => t.actionText)
      .filter((text): text is string => !!text),
    remembered: context.retrievedFacts.map((f) => f.fact.text),
  };
}



/**
 * A line of dialogue offered to a player who is standing on their own.
 *
 * The policy says not to, and the policy is not enough on its own: turn 17 of
 * a Nine Weeks run produced a beat that said *"Nobody answers. No Juno, no
 * Teo, no Nadia"* and then offered *"Maybe a walk down there will clear my
 * head. Want to come?"* — a question to an empty dock. Eight turns later,
 * unchanged: *"I wave at Juno with a grin, stepping closer"*, on a beat whose
 * own prose said Juno had left.
 *
 * Dropping the card is better than showing it. Two workable responses beat
 * three where one cannot function, and if too few survive the caller falls
 * back to the rule-built suggestions, which only ever address people the
 * engine has in the room.
 */
export function talksToNobody(text: string, peoplePresent: number): boolean {
  if (peoplePresent > 0) return false;
  return /["\u201c\u00ab][^"\u201c\u201d\u00ab\u00bb]{2,}["\u201d\u00bb]/.test(text);
}

/**
 * One plain sentence about what became of what the player tried.
 *
 * Read off the engine, not the prose, so it cannot be talked out of by good
 * writing. Costs and margins stay out of it — the player is being offered
 * something to do next, not a scoreboard.
 */
export function outcomeOf(context: TurnContext): string {
  const checks = context.resolution.checks;
  const refused = checks.some((c) => c.outcome === 'FAILURE' || c.outcome === 'COMPLICATION');
  const moved = context.resolution.mutations.some((m) => m.type === 'LOCATION_CHANGE');

  if (refused && !moved) return 'It did not work. Do not write a response that assumes it did.';
  if (moved) return `It worked, and the player is now in ${context.scene.locationName}.`;
  if (checks.length === 0) return 'Nothing was tested; the scene simply carried on.';
  return 'It worked.';
}

/** The places this room actually connects to, as the world names them. */
function exitsFrom(context: TurnContext): string[] {
  return context.resolution.newOpportunities
    .filter((o) => o.startsWith('travel_to:'))
    .map((o) => context.story.locations.find((l) => l.id === o.slice('travel_to:'.length))?.name)
    .filter((name): name is string => !!name);
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
          'an action and usually a line of dialogue. Give each a one-word attitude, and the id of the ' +
          'person it is addressed to from inTheRoom — null if it is addressed to nobody in particular.',
      }),
      { maxTokens: 700, temperature: 0.9, timeoutMs: 12_000 },
    );

    const inRoom = new Set(context.presentCharacters.map((c) => c.def.id));
    const responses = result.value.responses
      .map((r) => ({
        // The interpreter reads the text exactly as if it were typed — no verb
        // is privileged and nothing is pre-resolved. The hint carries only the
        // addressee, and only when the model named somebody who is actually in
        // the room, so a hallucinated id can never reach the engine.
        text: r.text.trim(),
        intentHint: inRoom.has(r.addressedTo ?? '') ? `speak:${r.addressedTo}` : 'freeform',
        risk: undefined,
        resourceCostLabel: null,
      }))
      .filter((r) => r.text.length > 0)
      .filter((r) => !talksToNobody(r.text, inRoom.size))
      .slice(0, 3);

    return responses.length >= 2 ? responses : null;
  } catch (error) {
    if (error instanceof ModelGatewayError) return null;
    throw error;
  }
}
