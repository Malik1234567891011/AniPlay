/**
 * Which endings this run has actually earned the right to reach.
 *
 * The distinction that matters is eligibility versus rails. A world does not
 * hold a route the player is walked along; it holds destinations, and one
 * becomes reachable because the run genuinely arrived somewhere that conclusion
 * makes sense. Nothing here selects an ending, nothing forces a scene, and
 * nothing fails a player for reaching none of them — a story that ends
 * somewhere nobody authored is the point of a world with open edges.
 *
 * So this answers one question and stops: *what could this end as, from here?*
 * The director may notice; the writer may steer toward one when the player is
 * already going that way; the player decides.
 */
import type { EndingDef, GameState, StoryVersion } from '@plotbreak/contracts';
import { evaluatePredicate } from './quests.js';

export interface EligibleEnding {
  readonly def: EndingDef;
  /** Why it is reachable now, for the director's benefit. */
  readonly because: string;
}

/**
 * Endings whose authored conditions the current state satisfies.
 *
 * Deterministic and cheap — a predicate walk per ending, no model call — so it
 * can run every turn without anyone deciding whether it is worth it.
 */
export function eligibleEndings(story: StoryVersion, state: GameState): EligibleEnding[] {
  return story.endings
    .filter((def) => state.turnIndex >= def.minTurn)
    .filter((def) => evaluatePredicate(def.requires, state))
    .map((def) => ({ def, because: def.condition }));
}

/**
 * Endings the run is close to but has not reached.
 *
 * "Close" is deliberately shallow: everything the predicate asks for except the
 * flags, which are the part a player is usually still working on. It exists so
 * a world can hint, and so the director can tell the difference between a story
 * with somewhere to go and one that has quietly run out of destinations.
 */
export function approachingEndings(story: StoryVersion, state: GameState): EndingDef[] {
  const already = new Set(eligibleEndings(story, state).map((e) => e.def.id));
  return story.endings.filter((def) => {
    if (already.has(def.id)) return false;
    if (state.turnIndex < def.minTurn) return false;
    return evaluatePredicate({ ...def.requires, flagsSet: [] }, state);
  });
}
