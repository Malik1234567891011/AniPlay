import type { CharacterDef, GameState, StoryVersion } from '@aniplay/contracts';
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
    candidates.push({ character, name: character.name.toLowerCase() });
    const first = character.name.split(/\s+/)[0]?.toLowerCase();
    if (first && first.length > 2) candidates.push({ character, name: first });
  }

  // Exact, on a word boundary.
  for (const { character, name } of candidates) {
    if (new RegExp(`\\b${escapeRegex(name)}\\b`).test(lower)) {
      return { characterId: character.id, matchedText: name, confidence: 1, corrected: false };
    }
  }

  // Near match against each word the player typed.
  const words = lower.replace(/[^a-z\s']/g, ' ').split(/\s+/).filter((w) => w.length > 2);
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
  /\b([A-Z][a-z]+|the \w+)\s+(gives?|hands?|offers?|grants?|tells?|agrees?|admits?|confesses?|allows?|lets?|opens?|reveals?|surrenders?|obeys?|decides?|falls in love|forgives?)\b/;

/** "she falls in love with me", "he becomes my ally", "they trust me now". */
const NPC_STATE_CLAIM =
  /\b(?:he|she|they|everyone|the \w+)\s+(?:now\s+)?(?:is|are|becomes?|falls?|trusts?|loves?|believes?|fears?)\b[^.]{0,40}\b(?:me|my|mine|ally|friend|in love)\b/i;

/** "the king gives me his kingdom", "I own the archive now". */
const WORLD_FACT_CLAIM =
  /\b(?:i|we)\s+(?:now\s+)?(?:own|control|rule|command|have always|already have|am the)\b/i;

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
