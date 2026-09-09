import type { AbilityDef, GameState, StateMutation, StoryVersion, TendencyDef } from '@aniplay/contracts';

/**
 * Spec §12.10 — what you keep doing, and who has noticed.
 *
 * Two features that are normally built as separate systems are the same piece
 * of state here, because they are the same question asked twice.
 *
 * A sports story wants a player's identity to emerge from play rather than
 * from a stat allocation screen: you become an isolation scorer because you
 * kept isolating, not because you put points into it. That needs a count of
 * what you did.
 *
 * The same story wants opponents to figure you out — the loop that makes
 * sports fiction work is discover a strength, dominate with it, get scouted,
 * evolve, come back. That needs a count of what you did, plus a record of who
 * has been watching.
 *
 * So: `tend:<id>` counts habits, `scout:<characterId>:<id>` counts what one
 * opponent has worked out, and both live in flags, which already hold numbers
 * and already persist through a reload, a fork and a replay.
 *
 * The design rule this is built to enforce is the user's: an opponent who has
 * "learned you" must be a number that changes a roll, never a line of prose
 * asserting it happened.
 */

export function tendencyFlag(tendencyId: string): string {
  return `tend:${tendencyId}`;
}

export function scoutFlag(characterId: string, tendencyId: string): string {
  return `scout:${characterId}:${tendencyId}`;
}

function counter(state: GameState, flag: string): number {
  const raw = state.flags[flag];
  return typeof raw === 'number' ? raw : 0;
}

export function tendencyCount(state: GameState, tendencyId: string): number {
  return counter(state, tendencyFlag(tendencyId));
}

export function scoutedLevel(state: GameState, characterId: string, tendencyId: string): number {
  return counter(state, scoutFlag(characterId, tendencyId));
}

/**
 * The habit counters this action feeds, as mutations.
 *
 * Recorded on use rather than on success: leaning on a move that keeps failing
 * is still leaning on it, and an opponent watching film sees the attempts.
 */
export function tendencyMutations(
  story: StoryVersion,
  state: GameState,
  ability: AbilityDef,
  nextMutationId: () => string,
): StateMutation[] {
  const known = new Set(story.tendencies.map((t) => t.id));
  return ability.tendencies
    .filter((id) => known.has(id))
    .map((id) => ({
      mutationId: nextMutationId(),
      type: 'FLAG_SET' as const,
      subjectId: 'player',
      reasonCode: `TENDENCY:${id}`,
      payload: { flag: tendencyFlag(id), value: tendencyCount(state, id) + 1 },
    }));
}

export interface TendencyShare {
  readonly def: TendencyDef;
  readonly count: number;
  /** Fraction of everything the player has done that this represents. */
  readonly share: number;
}

/** The whole distribution, heaviest first. */
export function tendencyProfile(state: GameState, story: StoryVersion): TendencyShare[] {
  const counts = story.tendencies.map((def) => ({ def, count: tendencyCount(state, def.id) }));
  const total = counts.reduce((sum, entry) => sum + entry.count, 0);
  return counts
    .map((entry) => ({ ...entry, share: total === 0 ? 0 : entry.count / total }))
    .sort((a, b) => b.count - a.count);
}

export interface PlayerIdentity {
  /** What the world would call this player, or null before it can tell. */
  readonly label: string | null;
  readonly dominant: TendencyDef | null;
  readonly secondary: TendencyDef | null;
  /** 0 = one-dimensional, 1 = does everything equally. */
  readonly balance: number;
  readonly profile: TendencyShare[];
}

/**
 * Who the player has become, read off what they did.
 *
 * Deliberately refuses to answer early. Calling somebody an isolation scorer
 * after three possessions is a label the game made up; the identity is only
 * real once there is enough evidence for it to have been earned, which is also
 * roughly when an opponent could have spotted it.
 */
export function playerIdentity(state: GameState, story: StoryVersion): PlayerIdentity {
  const profile = tendencyProfile(state, story);
  const total = profile.reduce((sum, entry) => sum + entry.count, 0);

  const used = profile.filter((entry) => entry.count > 0);
  // Normalised spread: how evenly the player's actions are distributed.
  const balance =
    used.length <= 1 ? 0 : Math.min(1, (used.length - 1) / Math.max(1, story.tendencies.length - 1));

  if (total < IDENTITY_THRESHOLD || !profile[0] || profile[0].count === 0) {
    return { label: null, dominant: null, secondary: null, balance, profile };
  }

  const dominant = profile[0];
  const second = profile[1] && profile[1].count > 0 ? profile[1] : null;

  // A player who does two things nearly equally is not the first thing with a
  // qualifier; they are a different kind of player, and saying so is more
  // honest than picking a winner by one possession.
  const hybrid = second !== null && second.count / dominant.count >= 0.7;

  return {
    label: hybrid ? `${dominant.def.identity} / ${second!.def.identity}` : dominant.def.identity,
    dominant: dominant.def,
    secondary: second?.def ?? null,
    balance,
    profile,
  };
}

/** Below this, nobody — the game or an opponent — claims to know anything. */
export const IDENTITY_THRESHOLD = 6;

/** A habit has to be this much of what you do before it is worth studying. */
export const SCOUTABLE_SHARE = 0.25;

/** Scouting at or above this changes what happens on the floor. */
export const SCOUTED_THRESHOLD = 3;

/**
 * What an opponent takes away from having faced you.
 *
 * They only learn habits you actually lean on — a move used twice in a season
 * is not a tendency, it is a move — and they stop at their own cap, because
 * nobody solves another player completely and a rival who eventually shuts
 * down everything is just a wall.
 */
export function scoutingMutations(
  state: GameState,
  story: StoryVersion,
  characterId: string,
  nextMutationId: () => string,
): StateMutation[] {
  const character = story.characters.find((c) => c.id === characterId);
  const scouting = character?.scouting;
  if (!scouting) return [];

  const profile = tendencyProfile(state, story);
  const total = profile.reduce((sum, entry) => sum + entry.count, 0);
  if (total < IDENTITY_THRESHOLD) return [];

  const mutations: StateMutation[] = [];
  for (const entry of profile) {
    if (entry.share < SCOUTABLE_SHARE || entry.count === 0) continue;
    const current = scoutedLevel(state, characterId, entry.def.id);
    if (current >= scouting.cap) continue;
    mutations.push({
      mutationId: nextMutationId(),
      type: 'FLAG_SET',
      subjectId: characterId,
      reasonCode: `SCOUTED:${entry.def.id}`,
      payload: {
        flag: scoutFlag(characterId, entry.def.id),
        value: Math.min(scouting.cap, current + scouting.learnRate),
      },
    });
  }
  return mutations;
}

export interface ScoutingPressure {
  /** Added to the DC. Positive is harder. */
  readonly dcDelta: number;
  /** The habit being sat on, if any. */
  readonly tendency: TendencyDef | null;
  readonly opponentId: string | null;
  /** For the director. Never rendered raw. */
  readonly note: string | null;
}

/**
 * How much harder this action is because of who is guarding you.
 *
 * This is the entire adaptation mechanic in one number. An opponent who has
 * studied a habit makes every action feeding that habit measurably harder, and
 * an action authored as the counter to that habit is not merely unpenalised —
 * it is easier, because a defender committed to taking one thing away has
 * given up something else.
 */
export function scoutingPressure(
  state: GameState,
  story: StoryVersion,
  ability: AbilityDef,
  opponentIds: readonly string[],
): ScoutingPressure {
  let worst: ScoutingPressure = { dcDelta: 0, tendency: null, opponentId: null, note: null };

  for (const opponentId of opponentIds) {
    // The counter first: beating somebody who is sitting on your habit is the
    // reward for having developed a second thing.
    if (ability.countersTendency) {
      const level = scoutedLevel(state, opponentId, ability.countersTendency);
      if (level >= SCOUTED_THRESHOLD) {
        const def = story.tendencies.find((t) => t.id === ability.countersTendency) ?? null;
        const bonus = -Math.min(4, Math.floor(level / 2) + 1);
        if (bonus < worst.dcDelta) {
          worst = {
            dcDelta: bonus,
            tendency: def,
            opponentId,
            note: def
              ? `They are committed to taking away ${def.label.toLowerCase()}, which is exactly what this beats.`
              : null,
          };
        }
        continue;
      }
    }

    for (const tendencyId of ability.tendencies) {
      const level = scoutedLevel(state, opponentId, tendencyId);
      if (level < SCOUTED_THRESHOLD) continue;
      const def = story.tendencies.find((t) => t.id === tendencyId) ?? null;
      const penalty = Math.min(5, Math.floor(level / 2) + 1);
      if (penalty > worst.dcDelta) {
        worst = {
          dcDelta: penalty,
          tendency: def,
          opponentId,
          note: def?.scoutedNote || (def ? `They have seen ${def.label.toLowerCase()} before.` : null),
        };
      }
    }
  }

  return worst;
}

/**
 * Whether anybody has genuinely worked the player out yet.
 *
 * Used to decide when the world is allowed to say so — an opponent commenting
 * on a habit before the counters support it is the exact failure this system
 * exists to prevent.
 */
export function isScouted(state: GameState, story: StoryVersion, characterId: string): boolean {
  return story.tendencies.some(
    (def) => scoutedLevel(state, characterId, def.id) >= SCOUTED_THRESHOLD,
  );
}
