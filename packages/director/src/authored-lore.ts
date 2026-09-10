/**
 * The world's own knowledge, made retrievable.
 *
 * Retrieval starts empty. Every fact in a session is one the *player* created —
 * a promise made, a door opened, somebody hit — and nothing the author wrote
 * was ever in the index at all. So a world could describe the Ninth Fleet as
 * "the navy of the coastal kingdoms, who set the bounties, own the charts, and
 * one of whose blades killed Ferro Vane", and when the player asked what the
 * Ninth Fleet was, the writer improvised, because that sentence lived in a
 * field nothing read at runtime.
 *
 * What reached the model was the current room, the people standing in it, and
 * four to six lines of hard canon. Everything else the author wrote about the
 * world — every other place, every faction, every person not in the room, what
 * the techniques are and what the relics do — was invisible.
 *
 * This is the same idea as a keyword book, built out of what the world already
 * has rather than a second thing to author. Derived per turn from the
 * StoryVersion rather than seeded into storage: nothing to migrate, nothing to
 * fall out of sync, and a published story that gets edited is immediately
 * correct in every session running it.
 *
 * Retrieved on its own small budget rather than sharing the session's, because
 * lore that crowds out what happened two turns ago is worse than no lore.
 */
import type { GameState, MemoryFact, StoryVersion } from '@aniplay/contracts';
import { lexicalSimilarity, retrieveMemories, type ScoredFact } from './memory.js';

/** How many authored facts a turn may pull in beyond its session memories. */
export const LORE_BUDGET = 4;

/**
 * How much of the turn's words a fact has to actually match.
 *
 * Without a floor this returns the four most *important* facts on every turn,
 * relevant or not — "I dribble." pulled the school board, the recruiting
 * circuit, the team, and a seven-foot centre at a school seventy minutes away.
 * That is not a keyword book, it is noise in every prompt, and noise is
 * expensive twice: it costs tokens and it dilutes what the writer should be
 * paying attention to.
 *
 * Lore is answered *when asked for*, and stays quiet the rest of the time.
 */
const RELEVANCE_FLOOR = 0.08;

const lore = (
  factId: string,
  subjectId: string,
  predicate: string,
  text: string,
  importance: number,
): MemoryFact => ({
  factId: `lore_${factId}`,
  subjectId,
  predicate,
  value: null,
  text,
  visibility: 'WORLD_PUBLIC',
  importance,
  confidence: 1,
  pinned: false,
  // Turn zero, so recency never ranks authored lore above what just happened.
  createdAtTurn: 0,
  createdAtWorldMinute: 0,
  sourceEventIds: [],
  supersededByFactId: null,
  correctedByPlayer: false,
});

/**
 * Everything the author wrote that a beat might need to be accurate about.
 *
 * Deliberately excludes the current room and the people in it — those already
 * reach the writer in full, and duplicating them here would spend the lore
 * budget on what the writer can already see.
 */
export function authoredLore(story: StoryVersion, state: GameState): MemoryFact[] {
  const facts: MemoryFact[] = [];
  const presentIds = new Set(
    state.characters.filter((c) => c.locationId === state.player.locationId).map((c) => c.characterId),
  );

  for (const faction of story.factions) {
    facts.push(lore(faction.id, faction.id, 'is', `${faction.name}: ${faction.description}`, 0.6));
  }

  for (const location of story.locations) {
    if (location.id === state.player.locationId) continue;
    facts.push(
      lore(location.id, location.id, 'is', `${location.name}: ${location.description}`, 0.5),
    );
  }

  // People who are not in the room. The writer had their name and pronouns and
  // nothing else, so anybody talked about rather than talked to was invented
  // from scratch each time they came up.
  for (const character of story.characters) {
    if (presentIds.has(character.id)) continue;
    facts.push(
      lore(character.id, character.id, 'is', `${character.name}, ${character.role}. ${character.cardBlurb}`, 0.55),
    );
  }

  for (const ability of story.abilities) {
    facts.push(lore(ability.id, ability.id, 'is', `${ability.name}: ${ability.description}`, 0.4));
  }

  for (const item of story.items) {
    if (!item.description) continue;
    facts.push(lore(item.id, item.id, 'is', `${item.name}: ${item.description}`, 0.4));
  }

  return facts;
}

/**
 * The authored facts this turn is actually about.
 *
 * Scored by the same retrieval the session's own memories use, so "the Ninth
 * Fleet" in the player's sentence is what surfaces the Ninth Fleet — which is
 * the whole behaviour, and it costs a lexical pass over a few dozen strings.
 */
export function retrieveLore(
  story: StoryVersion,
  state: GameState,
  query: { text: string; entityIds: readonly string[] },
): ScoredFact[] {
  return retrieveMemories(
    authoredLore(story, state),
    state,
    { text: query.text, entityIds: query.entityIds, limit: LORE_BUDGET },
    lexicalSimilarity,
    // Importance and recency are tie-breakers among things already relevant,
    // never a reason to surface something on their own.
  ).filter(
    (scored) => (scored.breakdown.semantic ?? 0) + (scored.breakdown.overlap ?? 0) >= RELEVANCE_FLOOR,
  );
}
