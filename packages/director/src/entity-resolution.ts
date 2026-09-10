import type { ActionIntent, CharacterDef, GameState, StoryVersion } from '@aniplay/contracts';
import { nameKeys } from '@aniplay/contracts';
import { charactersPresent } from '@aniplay/engine';

/**
 * Entity resolution and world-authoring detection.
 *
 * Two failures this exists to prevent:
 *
 * 1. A typo silently becoming nothing. "I beat the shit out of Kaela" must
 *    resolve to Kael when Kael is standing in front of the player and no Kaela
 *    exists — but it must never invent a character called Kaela.
 *
 * 2. The player authoring facts that belong to the world. "Mira gives me the
 *    key" is not an action the player can take; it is a sentence about a
 *    decision Mira makes. The player may *ask*. Mira decides.
 */

/** Levenshtein distance, capped early — names are short and the cap keeps it cheap. */
export function editDistance(a: string, b: string, max = 3): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;

  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const value = Math.min(current[j - 1]! + 1, previous[j]! + 1, previous[j - 1]! + cost);
      current.push(value);
      if (value < rowMin) rowMin = value;
    }
    if (rowMin > max) return max + 1;
    previous = current;
  }
  return previous[b.length]!;
}

export interface ResolvedEntity {
  readonly characterId: string;
  readonly matchedText: string;
  readonly confidence: number;
  /** True when the match required correcting the player's spelling. */
  readonly corrected: boolean;
}

/**
 * Resolves a name the player typed against the cast.
 *
 * Exact matches win. Otherwise a near-match is accepted only when it is close
 * enough *and* unambiguous, and characters standing in the room are strongly
 * preferred — "Kaela" beside Kael is a typo; the same word with nobody present
 * is not worth guessing at.
 */
export function resolveCharacterMention(
  text: string,
  story: StoryVersion,
  state: GameState,
): ResolvedEntity | null {
  const lower = text.toLowerCase();
  const presentIds = new Set(charactersPresent(state).map((c) => c.characterId));

  const candidates: Array<{ character: CharacterDef; name: string }> = [];
  for (const character of story.characters) {
    for (const key of nameKeys(character.name)) candidates.push({ character, name: key });
  }

  // Exact, on a word boundary.
  for (const { character, name } of candidates) {
    if (new RegExp(`\\b${escapeRegex(name)}\\b`).test(lower)) {
      return { characterId: character.id, matchedText: name, confidence: 1, corrected: false };
    }
  }

  // Near match against each word the player typed.
  // Only words the player capitalised.
  //
  // A misspelled name is still typed as a name, and requiring the capital is
  // what stops the edit-distance pass firing on ordinary vocabulary. Without
  // it, in Blackwake, "I take the sale price" and "I look at the vale below"
  // both resolved to Nessa Vale — one edit away, and then handed a presence
  // bonus that made them look confident.
  //
  // Exact matches below are unaffected: those still work in any case, because
  // "i talk to nessa" is a real and common way to type it.
  const words = text
    .replace(/[^\p{L}\p{M}\s'’]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && /^\p{Lu}/u.test(w))
    .map((w) => w.toLowerCase());
  let best: (ResolvedEntity & { distance: number }) | null = null;
  let runnerUpDistance = Infinity;

  for (const word of words) {
    for (const { character, name } of candidates) {
      if (name.includes(' ')) continue;
      // Allow one edit for short names, two for longer ones.
      const tolerance = name.length >= 6 ? 2 : 1;
      const distance = editDistance(word, name, tolerance);
      if (distance > tolerance) continue;

      // Presence is the tiebreak that makes this safe: the person in the room
      // is overwhelmingly the person being referred to.
      const score = distance - (presentIds.has(character.id) ? 0.5 : 0);
      if (!best || score < best.distance) {
        if (best) runnerUpDistance = best.distance;
        best = {
          characterId: character.id,
          matchedText: word,
          confidence: presentIds.has(character.id) ? 0.9 : 0.6,
          corrected: true,
          distance: score,
        };
      } else if (score < runnerUpDistance) {
        runnerUpDistance = score;
      }
    }
  }

  if (!best) return null;
  // Ambiguous between two equally close names: refuse to guess.
  if (runnerUpDistance - best.distance < 0.5) return null;
  // A guess at someone who is not even here is not worth making.
  if (!presentIds.has(best.characterId) && best.confidence < 0.9) return null;

  const { distance: _distance, ...resolved } = best;
  return resolved;
}

/**
 * Spec §3.2 — freedom without omnipotence.
 *
 * Detects the player writing an outcome that belongs to someone else: an NPC's
 * decision, a world fact, or another character's action. These are not illegal
 * inputs — they are simply not *actions*, and the engine reinterprets them as
 * the attempt they imply, or refuses them when there is no attempt inside.
 */
export interface WorldAuthoringVerdict {
  readonly detected: boolean;
  /** What the player tried to make true on the world's behalf. */
  readonly claim: string | null;
  /** The action actually available to them, when one exists. */
  readonly reinterpretation: 'REQUEST' | 'ATTEMPT' | 'NONE';
  readonly subjectCharacterId: string | null;
}

/** "Mira gives me the key", "the guard opens the door", "Kael agrees". */
const NPC_DECISION =
  /\b([A-Z][a-z]+|the \w+)\b[^.]{0,30}?\s(gives?|hands?|offers?|grants?|tells?|agrees?|admits?|confesses?|allows?|lets?|opens?|reveals?|surrenders?|obeys?|decides?|steps aside|backs down|stands aside|walks away|nods|relents?|falls in love|forgives?)\b/;

/** "she falls in love with me", "he becomes my ally", "they trust me now". */
const NPC_STATE_CLAIM =
  /\b(?:he|she|they|everyone|the \w+)\s+(?:now\s+)?(?:is|are|becomes?|falls?|trusts?|loves?|believes?|fears?)\b[^.]{0,40}\b(?:me|my|mine|ally|friend|in love)\b/i;

/** "the king gives me his kingdom", "I own the archive now". */
const WORLD_FACT_CLAIM =
  /\b(?:i|we)\s+(?:now\s+)?(?:own|control|rule|command|have always|already have|am the)\b/i;

/**
 * A declaration that is a campaign rather than an action.
 *
 * "I burn down the academy" is not one atomic attempt the dice can settle; it
 * is an outcome that would take a plan, and resolving it with a single check
 * means a lucky roll destroys the setting. These are refused as stated and
 * pushed back to the player as something they can actually start doing.
 */
const OUT_OF_SCOPE =
  /\b(?:burn down|destroy|level|raze|blow up|take over|conquer|overthrow|abolish|dismantle|wipe out|massacre|kill everyone|kill them all|kill all)\b/i;

export function detectOutOfScope(text: string): { detected: boolean; claim: string | null } {
  const match = text.match(OUT_OF_SCOPE);
  return { detected: !!match, claim: match?.[0] ?? null };
}

export function detectWorldAuthoring(
  text: string,
  story: StoryVersion,
  state: GameState,
): WorldAuthoringVerdict {
  const none: WorldAuthoringVerdict = {
    detected: false,
    claim: null,
    reinterpretation: 'NONE',
    subjectCharacterId: null,
  };

  // A first-person verb is the player acting, which is always legitimate —
  // "I ask Mira for the key" must never be caught by this.
  const firstPersonAction = /^\s*(?:i|we)\s+\w+/i.test(text.trim());

  const decision = text.match(NPC_DECISION);
  if (decision && !firstPersonAction) {
    const resolved = resolveCharacterMention(decision[1] ?? '', story, state);
    return {
      detected: true,
      claim: decision[0],
      // There is an implied request inside "Mira gives me the key", so the
      // player gets the action they actually have: asking.
      reinterpretation: 'REQUEST',
      subjectCharacterId: resolved?.characterId ?? null,
    };
  }

  const stateClaim = text.match(NPC_STATE_CLAIM);
  if (stateClaim && !firstPersonAction) {
    return { detected: true, claim: stateClaim[0], reinterpretation: 'NONE', subjectCharacterId: null };
  }

  const factClaim = text.match(WORLD_FACT_CLAIM);
  if (factClaim) {
    return { detected: true, claim: factClaim[0], reinterpretation: 'NONE', subjectCharacterId: null };
  }

  return none;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// --- Unrequested travel ----------------------------------------------------

/**
 * Movement language. A player who wants to be somewhere else says so.
 */
const MOVEMENT_VERBS =
  /\b(go|goes|going|walk|walks|walking|head|heads|heading|travel|travels|travelling|traveling|leave|leaves|leaving|run|runs|running|move|moves|moving|climb|climbs|enter|enters|return|returns|returning|ride|rides|riding|make my way|set off|set out|back to|over to|up to|down to|out to|off to|toward|towards|into|onto|through|follow|follows)\b/i;

/**
 * Drops travel the player never asked for.
 *
 * A model parser will occasionally read a phrase that merely mentions a place —
 * "I take the front rank", "put me against them in the yard" — as a request to
 * relocate, and pick the most evocative destination on the map. The engine then
 * faithfully moves the player somewhere they did not go, and the beat is
 * written about a room they never entered. It is the same failure as a turn
 * ignoring the player, arrived at from the other direction.
 *
 * The rule is deliberately conservative: a travel action survives if the player
 * used movement language at all, or named the destination. Only travel with
 * neither is dropped, because only that is certainly invented.
 */
export function stripInventedTravel(
  intent: ActionIntent,
  options: { readonly story: StoryVersion; readonly text: string },
): ActionIntent {
  const { story, text } = options;
  const isRealLocation = (id: string): boolean => story.locations.some((l) => l.id === id);

  // Travel to somewhere that is not a place can only ever produce a refusal, so
  // it is dropped whatever the player said.
  const impossible = intent.actions.some(
    (a) =>
      (a.verb === 'travel' || a.verb === 'move') &&
      !a.targets.some((t) => t.entityType === 'location' && isRealLocation(t.entityId)),
  );
  if (MOVEMENT_VERBS.test(text) && !impossible) return intent;

  const lower = text.toLowerCase();
  const names = (locationId: string): string[] => {
    const location = story.locations.find((l) => l.id === locationId);
    if (!location) return [];
    return [location.name, location.shortName].filter((n): n is string => !!n && n.length > 2);
  };

  const kept = intent.actions.filter((action) => {
    if (action.verb !== 'travel' && action.verb !== 'move') return true;
    const destination = action.targets.find(
      (t) => t.entityType === 'location' && isRealLocation(t.entityId),
    );
    if (!destination) return false;
    // The player naming the place is enough on its own.
    if (MOVEMENT_VERBS.test(text)) return true;
    return names(destination.entityId).some((name) => lower.includes(name.toLowerCase()));
  });

  if (kept.length === intent.actions.length) return intent;

  // Dropping every action would turn a real attempt into a no-op, so whatever
  // the player was actually doing is preserved as an interaction in the place
  // they are already standing.
  if (kept.length === 0) {
    const first = intent.actions[0];
    return {
      ...intent,
      actions: [
        {
          ...(first as ActionIntent['actions'][number]),
          verb: 'interact',
          targets: (first?.targets ?? []).filter((t) => t.entityType !== 'location'),
        },
      ],
    };
  }

  return { ...intent, actions: kept };
}

// --- Named but not present ------------------------------------------------

/**
 * Whether the clause named a person the world does not contain.
 *
 * The engine needs to tell "I keep fighting" from "I attack Zorbulax the
 * Undying". Both arrive with no resolved target, but the first should carry on
 * against whoever the player is already fighting and the second must be
 * refused — quietly redirecting a named stranger at whoever happens to be in
 * the room is the same failure as inventing them.
 */
export function namesSomeoneUnknown(clause: string, story: StoryVersion): boolean {
  const known = story.characters.flatMap((c) => [c.name.toLowerCase(), c.name.split(/\s+/)[0]!.toLowerCase()]);
  const words = clause.split(/\s+/);

  for (let index = 0; index < words.length; index += 1) {
    const word = words[index]!.replace(/[^A-Za-z'-]/g, '');
    if (word.length < 3) continue;
    // A capitalised word that is not the first in the clause reads as a name.
    const isName = index > 0 && /^[A-Z]/.test(word);
    // "the headmaster", "the warden" — a definite role nobody here holds.
    const isRole =
      words[index - 1]?.toLowerCase() === 'the' && /^[a-z]+$/.test(word) && ROLE_WORDS.test(word);
    if (!isName && !isRole) continue;
    if (known.some((name) => name.includes(word.toLowerCase()) || word.toLowerCase().includes(name))) {
      continue;
    }
    return true;
  }
  return false;
}

/** Words that read as "a specific person by their position". */
const ROLE_WORDS =
  /^(headmaster|headmistress|principal|warden|commander|captain|master|mistress|director|manager|owner|king|queen|prince|princess|lord|lady|chief|boss|sergeant|general|professor|doctor|nurse|priest|abbot|mayor|sheriff|guard|guards|prefect|prefects|drillmaster|instructor|reader|clerk|barman|barmaid|chef)$/i;

/**
 * Stops a model parser substituting a person the player did not name.
 *
 * Found in play: "I attack Zorbulax the Undying" mid-fight came back as an
 * attack on Hollis, and the beat cheerfully narrated "not at Zorbulax, who
 * isn't here, but at Hollis Ferrant". Resolving a misspelling of someone
 * present is correct; resolving a stranger into whoever is handy is the same
 * failure as inventing them, arrived at from the other side.
 *
 * Only fires when the sentence actually named somebody the world does not
 * contain, so pronouns and continuations are untouched.
 */
export function stripSubstitutedPeople(
  intent: ActionIntent,
  options: { readonly story: StoryVersion; readonly text: string },
): ActionIntent {
  const { story, text } = options;
  if (!namesSomeoneUnknown(text, story)) return intent;

  const lower = text.toLowerCase();
  const namedInText = (characterId: string): boolean => {
    const character = story.characters.find((c) => c.id === characterId);
    if (!character) return false;
    const first = character.name.split(/\s+/)[0]!.toLowerCase();
    return lower.includes(character.name.toLowerCase()) || lower.includes(first);
  };

  const actions = intent.actions.map((action) => ({
    ...action,
    targets: action.targets.filter(
      (target) => target.entityType !== 'npc' || namedInText(target.entityId),
    ),
  }));

  // Marked whether or not a substitution had to be removed. A model that
  // correctly declines to target anyone still leaves an action with no person
  // in it, and the engine must not then continue it against whoever the player
  // happens to be fighting.
  const unresolved = actions.some((a) => !a.targets.some((t) => t.entityType === 'npc'));
  if (!unresolved && actions.every((a, i) => a.targets.length === intent.actions[i]!.targets.length)) {
    return intent;
  }

  return {
    ...intent,
    actions,
    unsafeOrMetaRequests: [...new Set([...intent.unsafeOrMetaRequests, 'unresolved_target'])],
  };
}
