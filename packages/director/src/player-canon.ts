import type { GameState, MemoryProposal, StoryVersion } from '@plotbreak/contracts';

/**
 * Spec §3.3 — who gets to decide a thing is true.
 *
 * The old model had exactly two categories: the player attempts, and the world
 * decides. Everything declarative the player wrote was pushed into the first
 * one — "I have always been able to read wards" became a Sigil Read roll, and
 * failing it quietly deleted the claim. That is a coherent game. It is not
 * Plotbreak, where the whole promise is that a player can write themselves
 * into the story and the world rebuilds around it.
 *
 * So there is a third category: the player *establishes*. The question a
 * declarative sentence now gets is not "can they do this" but "whose fact is
 * this to state", and the answer depends on what kind of fact it is:
 *
 *   SELF and HISTORY   the player is the authority. Nobody else knows what
 *                      they can do or where they came from. Establish it.
 *   REPUTATION         the world already has an opinion, so a claim about it
 *                      is something to be tested rather than asserted.
 *   NPC INTERIORITY    that person's, unless nothing has been established yet
 *                      — a shared history the story deliberately left open is
 *                      fair game at the start and not on turn ninety.
 *   WORLD FACT         the world's, and locked canon is where it stops.
 *
 * The one hard boundary is `rules.hardCanon`. It exists already and it is
 * exactly the right list: the handful of things a world would not be itself
 * without. A claim that collides with one of those is refused *as a claim* —
 * but the attempt inside it still resolves, so the turn is never wasted.
 *
 * Deliberately lexical and deterministic. It runs on every turn, it must not
 * cost a model call, and a player must be able to learn what it does.
 */

export type CanonScope = 'SELF' | 'HISTORY' | 'REPUTATION' | 'RELATIONSHIP' | 'WORLD';

export type CanonVerdict =
  /** The player's to state. It becomes true and the world adapts to it. */
  | { kind: 'ESTABLISH'; scope: CanonScope; fact: string; subjectId: string | null }
  /** Plausible, but somebody here would already know. They get to ask for proof. */
  | { kind: 'TEST'; scope: CanonScope; fact: string; why: string }
  /** Collides with something the world cannot stop being. */
  | { kind: 'CONTRADICTS'; fact: string; canon: string }
  /** Nothing was claimed; it is an ordinary action. */
  | { kind: 'NONE' };

/** "I am / I was / I have always / I can / my name is" — the player about themselves. */
const SELF_CLAIM =
  /\b(?:i|my)\s+(?:am|was|were|have always|had always|always|can|could|used to|grew up|come from|came from|know how to|have been|had been|trained|learned|trained as|am actually|really am)\b/i;

/** A claim about something that happened before the story started. */
const HISTORY_MARKER =
  /\b(?:before (?:i|we|any of this)|back (?:home|then)|when i was|years ago|since i was|growing up|as a child|in my (?:old|last|previous)|used to|my (?:father|mother|family|village|master|teacher|sister|brother))\b/i;

/** A claim about what other people think of the player. */
const REPUTATION_MARKER =
  /\b(?:everyone|everybody|people|they all|the whole \w+|nobody)\s+(?:\w+\s+)?(?:knows?|thinks?|says?|believes?|fears?|respects?|hates?|remembers?)\b/i;

/** A claim about a specific other person's inner state or history with you. */
const RELATIONSHIP_MARKER =
  /\b(?:has always|have always|has never|never|already)\s+(?:hated|loved|trusted|known|owed|feared|wanted)\s+me\b|\b(?:is|are)\s+(?:obsessed with|in love with|terrified of|loyal to)\s+me\b/i;

/**
 * Power claims that are only extraordinary relative to the world.
 *
 * Not a list of forbidden things — a list of things a world either models or
 * does not, so the verdict can differ per story rather than per phrase.
 */
const POWER_CLAIM =
  /\b(?:strongest|most powerful|greatest|best)\b|\bi (?:can|could)\s+(?:\w+\s+){0,3}(?:anything|anyone|everything|at will|without)\b/i;

export interface CanonContext {
  readonly story: StoryVersion;
  readonly state: GameState;
  /** How many turns have been played. Openness narrows as a story sets. */
  readonly turnIndex: number;
}

/** Content words, for overlap against locked canon. */
function keywords(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .split(/[^a-z']+/)
      .filter((w) => w.length > 3 && !STOP.has(w)),
  );
}

const STOP = new Set([
  'this', 'that', 'they', 'them', 'their', 'there', 'here', 'have', 'been', 'with', 'from',
  'what', 'when', 'where', 'which', 'will', 'would', 'could', 'should', 'about', 'into',
  'been', 'were', 'because', 'always', 'never', 'really', 'actually', 'just', 'only',
]);

/**
 * Whether a claim runs into something the world cannot stop being.
 *
 * Deliberately requires real overlap — two shared content words with a single
 * canon line — so an ordinary sentence that happens to mention a ward is not
 * treated as an attack on the setting. The failure mode to avoid here is a
 * checker so eager that the player learns to write around it.
 */
function collidesWithCanon(claim: string, story: StoryVersion): string | null {
  const words = keywords(claim);
  if (words.size === 0) return null;

  // A claim only threatens canon if it also negates or overrides something.
  const overrides =
    /\b(?:not|never|no longer|actually|really|in fact|the truth is|i am the|i was the|i own|i control|there (?:is|was) no)\b/i.test(
      claim,
    );
  if (!overrides) return null;

  for (const line of story.rules.hardCanon) {
    const canonWords = keywords(line);
    let shared = 0;
    for (const word of words) if (canonWords.has(word)) shared += 1;
    if (shared >= 2) return line;
  }
  return null;
}

/** Does this world model the kind of power being claimed? */
function worldModels(claim: string, story: StoryVersion): boolean {
  const words = keywords(claim);
  const vocabulary = keywords(
    [
      ...story.abilities.map((a) => `${a.name} ${a.description} ${a.affordances.join(' ')}`),
      ...story.skills.map((s) => `${s.name} ${s.description}`),
      ...story.resources.map((r) => r.name),
      ...story.tags,
    ].join(' '),
  );

  // Shared prefix rather than exact match. A world whose vocabulary is "ward",
  // "warding" and "wards" plainly models a player who says they are a
  // "wardwright", and requiring the exact token meant it did not.
  //
  // Erring loose is deliberate: a false positive here means the claim is
  // established rather than tested, and on this product that is the side to be
  // wrong on.
  const vocab = [...vocabulary];
  for (const word of words) {
    if (word.length < 4) continue;
    for (const known of vocab) {
      if (sharedPrefix(word, known) >= 4) return true;
    }
  }
  return false;
}

function sharedPrefix(a: string, b: string): number {
  const limit = Math.min(a.length, b.length);
  let i = 0;
  while (i < limit && a[i] === b[i]) i += 1;
  return i;
}

/**
 * Who owns this sentence.
 *
 * Returns NONE for the overwhelming majority of turns — a player writing
 * "I drive at him" is not authoring anything and must never be slowed down by
 * this.
 */
export function classifyClaim(text: string, context: CanonContext): CanonVerdict {
  const { story, state, turnIndex } = context;
  const claim = text.trim();
  if (claim.length === 0) return { kind: 'NONE' };

  const collision = collidesWithCanon(claim, story);

  // A claim about a specific person's feelings or shared history.
  if (RELATIONSHIP_MARKER.test(claim)) {
    const named = story.characters.find((c) =>
      new RegExp(`\\b${c.name.split(/\s+/)[0]}\\b`, 'i').test(claim),
    );
    // Early, with nothing established, a shared history the story left open is
    // the player's to fill in. Once the story has been running, or once this
    // person has an actual history with the player, it is theirs.
    const relationship = named ? state.relationships.find((r) => r.characterId === named.id) : null;
    const established = (relationship?.lastChangedTurn ?? -1) >= 0 || Boolean(named && state.flags[`met:${named.id}`]);

    if (turnIndex <= OPEN_HISTORY_TURNS && !established) {
      return {
        kind: 'ESTABLISH',
        scope: 'RELATIONSHIP',
        fact: claim,
        subjectId: named?.id ?? null,
      };
    }
    return {
      kind: 'TEST',
      scope: 'RELATIONSHIP',
      fact: claim,
      why: named
        ? `${named.name} has their own history with the player and it is already on the record.`
        : 'That person has their own view of this.',
    };
  }

  if (REPUTATION_MARKER.test(claim)) {
    if (collision) return { kind: 'CONTRADICTS', fact: claim, canon: collision };
    return {
      kind: 'TEST',
      scope: 'REPUTATION',
      fact: claim,
      why: 'What people here think of the player is something they already think.',
    };
  }

  if (SELF_CLAIM.test(claim) || HISTORY_MARKER.test(claim)) {
    if (collision) return { kind: 'CONTRADICTS', fact: claim, canon: collision };

    const scope: CanonScope = HISTORY_MARKER.test(claim) ? 'HISTORY' : 'SELF';

    // A power claim is established when the world has that kind of power in it
    // at all, and tested when it does not — which is how a player becomes
    // extraordinary in a world with magic and merely interesting in one
    // without.
    if (POWER_CLAIM.test(claim) && !worldModels(claim, story)) {
      return {
        kind: 'TEST',
        scope,
        fact: claim,
        why: 'Nothing in this world works like that, so it is a thing to be shown rather than said.',
      };
    }

    return { kind: 'ESTABLISH', scope, fact: claim, subjectId: null };
  }

  if (collision) return { kind: 'CONTRADICTS', fact: claim, canon: collision };
  return { kind: 'NONE' };
}

/**
 * How long a story's shared history stays open.
 *
 * "Kael has always hated me" is a reasonable premise detail on turn two and a
 * retcon on turn ninety. The number is small on purpose: this is about the
 * setup a player did not get to write at character creation, not a licence to
 * rewrite relationships mid-run.
 */
export const OPEN_HISTORY_TURNS = 6;

/**
 * What an established claim becomes: a pinned, high-importance fact.
 *
 * Pinned because the player put it there deliberately and it must not be
 * ranked out of context by ordinary retrieval, and high-importance because
 * everything downstream should be treating it as load-bearing.
 */
export function proposalFor(verdict: CanonVerdict, turnIndex: number): MemoryProposal | null {
  if (verdict.kind !== 'ESTABLISH') return null;

  return {
    subjectId: verdict.subjectId ?? 'player',
    predicate: `player_canon:${verdict.scope.toLowerCase()}`,
    value: verdict.fact,
    // Self and history are things the world learns as the player shows them;
    // a relationship claim is about two people and is public between them.
    visibility: verdict.scope === 'RELATIONSHIP' ? 'PAIR_PRIVATE' : 'WORLD_PUBLIC',
    importance: 0.9,
    sourceEventIds: [],
  };
}

/**
 * What the writer is told, so an established claim actually changes the scene
 * instead of being filed somewhere nobody reads.
 */
export function directorNoteFor(verdict: CanonVerdict, story: StoryVersion): string | null {
  switch (verdict.kind) {
    case 'ESTABLISH':
      return (
        `The player has established something about themselves and it is now true in this world: ` +
        `"${verdict.fact}" Treat it as fact from this point. Do not have anyone contradict it, and do not ` +
        `quietly ignore it. Show the world adjusting: who notices, who does not believe it yet, what it ` +
        `changes about what happens next. It should cost them something or attract something.`
      );
    case 'TEST':
      return (
        `The player claimed: "${verdict.fact}" — which is theirs to prove rather than to state, because ` +
        `${verdict.why} Do not refuse it and do not confirm it. Have somebody here ask them to show it, ` +
        `or react as if it might be true and they intend to find out.`
      );
    case 'CONTRADICTS':
      return (
        `The player claimed: "${verdict.fact}" — which collides with something this world cannot stop ` +
        `being: "${verdict.canon}" Do not argue with the player and do not lecture them. Let the world be ` +
        `itself: whatever they said, the thing that is true stays true, and somebody may find the claim ` +
        `interesting, alarming, or funny. Resolve whatever they actually attempted.`
      );
    case 'NONE':
      return null;
  }
}
