import type { CharacterDef, GameState, MemoryFact, MemoryProposal, StoryVersion } from '@aniplay/contracts';
import { canCharacterKnow } from '@aniplay/engine';

/**
 * Spec §17.6 — memory retrieval.
 *
 * Facts are filtered by visibility *before* ranking, so an NPC's prompt cannot
 * contain something they were never told. Ranking then blends similarity,
 * entity overlap, importance, recency, and player-pinned canon.
 */

export const RETRIEVAL_WEIGHTS = {
  semanticSimilarity: 0.35,
  entityOverlap: 0.25,
  importance: 0.2,
  recency: 0.1,
  pinnedCanonBoost: 0.1,
} as const;

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'of', 'to', 'in', 'on', 'at', 'for', 'with',
  'is', 'was', 'are', 'were', 'be', 'been', 'it', 'this', 'that', 'they', 'them',
  'i', 'you', 'he', 'she', 'his', 'her', 'their', 'my', 'me', 'we', 'us', 'as',
  'from', 'by', 'not', 'no', 'do', 'does', 'did', 'has', 'have', 'had', 'will',
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP_WORDS.has(t));
}

/**
 * Lexical cosine similarity. Used when no embedding provider is configured, so
 * retrieval degrades gracefully rather than failing shut. `EmbeddingSimilarity`
 * swaps in vectors when pgvector and an embeddings model are available.
 */
export function lexicalSimilarity(a: string, b: string): number {
  const tokensA = tokenize(a);
  const tokensB = tokenize(b);
  if (tokensA.length === 0 || tokensB.length === 0) return 0;

  const countsA = new Map<string, number>();
  const countsB = new Map<string, number>();
  for (const t of tokensA) countsA.set(t, (countsA.get(t) ?? 0) + 1);
  for (const t of tokensB) countsB.set(t, (countsB.get(t) ?? 0) + 1);

  let dot = 0;
  for (const [token, count] of countsA) dot += count * (countsB.get(token) ?? 0);
  if (dot === 0) return 0;

  const magA = Math.sqrt([...countsA.values()].reduce((s, c) => s + c * c, 0));
  const magB = Math.sqrt([...countsB.values()].reduce((s, c) => s + c * c, 0));
  return dot / (magA * magB);
}

export function cosine(a: readonly number[], b: readonly number[]): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    dot += a[i]! * b[i]!;
    magA += a[i]! * a[i]!;
    magB += b[i]! * b[i]!;
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

export interface RetrievalQuery {
  /** Usually the player's action plus the current scene summary. */
  readonly text: string;
  /** Entity ids in play this turn, for the overlap term. */
  readonly entityIds: readonly string[];
  readonly limit: number;
  /**
   * When set, results are restricted to what this NPC could know (spec §14.5).
   * Omit for the player's own narrative context.
   */
  readonly forCharacter?: CharacterDef;
}

export interface ScoredFact {
  readonly fact: MemoryFact;
  readonly score: number;
  readonly breakdown: Record<string, number>;
}

export function retrieveMemories(
  facts: readonly MemoryFact[],
  state: GameState,
  query: RetrievalQuery,
  similarity: (a: string, b: string) => number = lexicalSimilarity,
): ScoredFact[] {
  const playerFactionIds = state.factions.filter((f) => f.reputation >= 20).map((f) => f.factionId);

  const visible = facts.filter((fact) => {
    // Superseded facts are history, not canon.
    if (fact.supersededByFactId !== null) return false;
    if (!query.forCharacter) return fact.visibility !== 'CREATOR_ONLY';
    const runtime = state.characters.find((c) => c.characterId === query.forCharacter!.id);
    return canCharacterKnow(query.forCharacter, runtime, fact, playerFactionIds);
  });

  const newestTurn = Math.max(1, state.turnIndex);

  const scored = visible.map((fact) => {
    const semantic = similarity(query.text, fact.text);
    const overlap =
      query.entityIds.length === 0
        ? 0
        : query.entityIds.filter((id) => fact.subjectId === id || fact.text.includes(id)).length /
          query.entityIds.length;
    const recency = Math.max(0, Math.min(1, fact.createdAtTurn / newestTurn));
    const pinned = fact.pinned || fact.correctedByPlayer ? 1 : 0;

    const breakdown = {
      semantic: semantic * RETRIEVAL_WEIGHTS.semanticSimilarity,
      overlap: overlap * RETRIEVAL_WEIGHTS.entityOverlap,
      importance: fact.importance * RETRIEVAL_WEIGHTS.importance,
      recency: recency * RETRIEVAL_WEIGHTS.recency,
      pinned: pinned * RETRIEVAL_WEIGHTS.pinnedCanonBoost,
    };

    return {
      fact,
      score: Object.values(breakdown).reduce((a, b) => a + b, 0),
      breakdown,
    };
  });

  return scored
    .sort((a, b) => b.score - a.score || a.fact.factId.localeCompare(b.fact.factId))
    .slice(0, query.limit);
}

/**
 * Turns a director's memory proposals into stored facts. Importance and
 * visibility come from the proposal; identity and provenance come from the
 * engine, so a fact always knows which turn produced it.
 */
export function materializeProposals(
  proposals: readonly MemoryProposal[],
  state: GameState,
  turnId: string,
): MemoryFact[] {
  return proposals.map((proposal, index) => ({
    factId: `fact_${turnId}_${index}`,
    subjectId: proposal.subjectId,
    predicate: proposal.predicate,
    value: proposal.value,
    text: renderFactText(proposal),
    visibility: proposal.visibility,
    importance: proposal.importance,
    confidence: 1,
    pinned: false,
    createdAtTurn: state.turnIndex,
    createdAtWorldMinute: state.worldMinute,
    sourceEventIds: [...proposal.sourceEventIds],
    supersededByFactId: null,
    correctedByPlayer: false,
  }));
}

function renderFactText(proposal: MemoryProposal): string {
  const value =
    typeof proposal.value === 'string'
      ? proposal.value
      : proposal.value === null || proposal.value === undefined
        ? ''
        : JSON.stringify(proposal.value);
  return `${proposal.subjectId} ${proposal.predicate.replace(/_/g, ' ')}${value ? `: ${value}` : ''}`;
}

/**
 * Spec §11.8 — a player correction becomes a high-priority canon fact and
 * supersedes the fact it repairs. It never rewrites authoritative game state;
 * `checkCorrectionConflict` decides whether it is allowed at all.
 */
export function applyCorrection(
  facts: MemoryFact[],
  factId: string,
  correctedText: string,
  state: GameState,
  turnId: string,
): { updated: MemoryFact[]; fact: MemoryFact } | null {
  const original = facts.find((f) => f.factId === factId);
  if (!original) return null;

  const replacement: MemoryFact = {
    ...original,
    factId: `fact_${turnId}_correction`,
    text: correctedText,
    importance: Math.max(original.importance, 0.9),
    pinned: true,
    correctedByPlayer: true,
    createdAtTurn: state.turnIndex,
    createdAtWorldMinute: state.worldMinute,
    supersededByFactId: null,
  };

  const updated = facts.map((f) =>
    f.factId === factId ? { ...f, supersededByFactId: replacement.factId } : f,
  );
  updated.push(replacement);
  return { updated, fact: replacement };
}

/**
 * Spec §11.8 step 5 — a correction that contradicts authoritative state is
 * refused with an explanation, not silently accepted. Claiming an item you never
 * earned is exactly the case this exists for.
 */
export function checkCorrectionConflict(
  correctedText: string,
  state: GameState,
  story: StoryVersion,
): string | null {
  const lower = correctedText.toLowerCase();

  for (const item of story.items) {
    const mentionsItem = lower.includes(item.name.toLowerCase());
    if (!mentionsItem) continue;
    const claimsPossession = /\b(i (have|own|carry|hold|took|kept)|my)\b/.test(lower);
    const holds = state.player.inventory.some((e) => e.itemId === item.id);
    if (claimsPossession && !holds) {
      return `Your record does not show you ever obtained ${item.name}. A correction cannot add an item you have not earned — but you can fork the timeline from the point where you might have.`;
    }
  }

  for (const location of story.locations) {
    const bare = location.name.toLowerCase().replace(/^the\s+/, '');
    // `i'm` has no space before the contraction, so the alternation has to sit
    // tight against the pronoun rather than after a space.
    const claimsHere = new RegExp(`\\bi(?:'m| am) (?:at|in) (?:the )?${escapeRegex(bare)}`).test(lower);
    if (claimsHere && state.player.locationId !== location.id) {
      const current = story.locations.find((l) => l.id === state.player.locationId);
      return `You are at ${current?.name ?? 'somewhere else'} right now, not ${location.name}. Travel there instead, and the record will follow.`;
    }
  }

  for (const character of story.characters) {
    const runtime = state.characters.find((c) => c.characterId === character.id);
    if (runtime && !runtime.alive && new RegExp(`${escapeRegex(character.name.toLowerCase())}[^.]*\\b(is alive|survived|lives)\\b`).test(lower)) {
      return `${character.name} is gone in this branch. Correcting the record cannot undo it, but forking from an earlier moment can.`;
    }
  }

  return null;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
