import type { GameState, StoryVersion } from '@plotbreak/contracts';
import { createInitialState } from './state.js';

/**
 * A world that starts again.
 *
 * The reset is the engine's, not the narrator's. When the clock reaches the
 * end, the world is rebuilt exactly as it began — same positions, same
 * injuries healed, same people un-angered, same objects un-stolen — and the
 * only things that cross are the ones the story declared could.
 *
 * That declaration is the whole progression system of a looping world. What
 * survives is what the *player* knows: a code, a schedule, a name, the hour
 * something happens. Nobody else remembers, and the player's advantage is
 * entirely made of things they wrote down in their own head.
 *
 * Doing this in the engine rather than in prose is what makes it a game. A
 * narrator that "remembers the last loop" remembers whatever is convenient. A
 * flag set survives or it does not.
 */

export interface LoopResetResult {
  readonly state: GameState;
  readonly loopNumber: number;
  /** Relationships that left a residue, for the director to play. */
  readonly echoes: Array<{ characterId: string; dimension: string; value: number }>;
}

/** The flag holding how many times the world has ended. */
const LOOP_COUNT_FLAG = 'loop:count';

export function loopNumber(state: GameState): number {
  // Stored as a flag rather than a field so it survives its own reset without
  // the reset needing to know about it.
  const explicit = Object.keys(state.flags)
    .filter((flag) => flag.startsWith('loop:n:'))
    .map((flag) => Number(flag.slice('loop:n:'.length)))
    .filter((n) => Number.isFinite(n));
  return explicit.length > 0 ? Math.max(...explicit) : 1;
}

/** True when the clock has reached the end of the week. */
export function loopShouldReset(state: GameState, story: StoryVersion): boolean {
  const loop = story.rules.loop;
  if (!loop) return false;
  return state.worldMinute >= loop.endWorldMinute;
}

/**
 * Rebuilds the world at the start of the loop.
 *
 * Everything is reconstructed from the story rather than edited, so a reset
 * cannot leave a fragment of the old week behind — which is the bug this shape
 * exists to make impossible.
 */
export function resetLoop(state: GameState, story: StoryVersion): LoopResetResult {
  const loop = story.rules.loop;
  if (!loop) return { state, loopNumber: 1, echoes: [] };

  const next = loopNumber(state) + 1;

  const fresh = createInitialState({
    sessionId: state.sessionId,
    story,
    identity: state.player.identity,
  });
  fresh.worldMinute = loop.startWorldMinute;
  fresh.revision = state.revision;
  fresh.turnIndex = state.turnIndex;
  fresh.rngCursor = state.rngCursor;

  // What the player knows. The only thing that crosses, and the reason a
  // second week is different from the first.
  for (const [flag, value] of Object.entries(state.flags)) {
    if (!value) continue;
    if (loop.persistentFlagPrefixes.some((prefix) => flag.startsWith(prefix))) {
      fresh.flags[flag] = true;
    }
  }
  for (let n = 1; n <= next; n += 1) fresh.flags[`loop:n:${n}`] = true;
  fresh.flags[LOOP_COUNT_FLAG] = true;

  // Nobody remembers. But something extreme leaves a residue: a person who
  // trusted you completely meets you as someone they have no reason to like
  // and inexplicably do.
  const echoes: LoopResetResult['echoes'] = [];
  if (loop.echoRetention > 0) {
    for (const before of state.relationships) {
      const after = fresh.relationships.find((r) => r.characterId === before.characterId);
      if (!after) continue;
      for (const dimension of ['trust', 'affection', 'respect', 'fear', 'rivalry'] as const) {
        const value = before[dimension];
        if (Math.abs(value) < loop.echoThreshold) continue;
        const kept = Math.trunc(value * loop.echoRetention);
        if (kept === 0) continue;
        after[dimension] = kept;
        echoes.push({ characterId: before.characterId, dimension, value: kept });
      }
    }
  }

  return { state: fresh, loopNumber: next, echoes };
}

/**
 * What the director is told about a residue.
 *
 * Deliberately about behaviour rather than about the loop: the character does
 * not know why they feel this, and writing them as though they do is the
 * failure mode this whole system is built to avoid.
 */
export function echoDirectorNotes(
  story: StoryVersion,
  echoes: LoopResetResult['echoes'],
): string[] {
  const byCharacter = new Map<string, string[]>();
  for (const echo of echoes) {
    const name = story.characters.find((c) => c.id === echo.characterId)?.name ?? echo.characterId;
    const feeling = {
      trust: echo.value > 0 ? 'finds themselves believing you' : 'is wary of you',
      affection: echo.value > 0 ? 'likes you' : 'cannot warm to you',
      respect: echo.value > 0 ? 'takes you seriously' : 'does not rate you',
      fear: 'is uneasy around you',
      rivalry: 'bristles at you',
    }[echo.dimension] ?? 'reacts to you';

    const notes = byCharacter.get(name) ?? [];
    notes.push(feeling);
    byCharacter.set(name, notes);
  }

  return [...byCharacter].map(
    ([name, feelings]) =>
      `${name} has never met you and ${feelings.join(' and ')}, and has no explanation for it. ` +
      'Play it as an instinct they would not be able to defend. They do not know about the loop and ' +
      'must not refer to it.',
  );
}
