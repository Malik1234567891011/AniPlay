import type { GameState, StateMutation, StoryVersion } from '@aniplay/contracts';

/**
 * Spec §12.11 — two progression modes, both enforced by the engine.
 *
 * The director may narrate a triumph but cannot grant a level or a milestone.
 * XP comes from quest milestones and meaningful challenges, never from raw
 * message count, so grinding chat does not level anyone up.
 */

/** Cumulative XP required to reach each level. */
export const XP_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200] as const;

export function levelForXp(xp: number): number {
  let level = 1;
  for (let i = 0; i < XP_THRESHOLDS.length; i++) {
    if (xp >= XP_THRESHOLDS[i]!) level = i + 1;
  }
  return level;
}

export function xpToNextLevel(xp: number): { needed: number; nextLevel: number } | null {
  const level = levelForXp(xp);
  const next = XP_THRESHOLDS[level];
  if (next === undefined) return null;
  return { needed: next - xp, nextLevel: level + 1 };
}

/**
 * Emits a level change when accumulated XP crosses a threshold. Level mode only —
 * milestone worlds progress purely through quest predicates.
 */
export function levelUpMutations(
  state: GameState,
  story: StoryVersion,
  nextMutationId: () => string,
): StateMutation[] {
  if (story.rules.progressionMode !== 'LEVEL') return [];

  const earned = levelForXp(state.player.xp);
  if (earned <= state.player.level) return [];

  return [
    {
      mutationId: nextMutationId(),
      type: 'LEVEL_CHANGE',
      subjectId: 'player',
      reasonCode: 'XP_THRESHOLD',
      payload: { level: earned },
    },
  ];
}

/**
 * Milestone mode: the creator declares milestone predicates and the engine
 * checks them. Spec §12.11 — "the director cannot grant milestones directly".
 * A milestone is earned when its matching quest completes.
 */
export function milestoneMutations(
  state: GameState,
  story: StoryVersion,
  nextMutationId: () => string,
): StateMutation[] {
  if (story.rules.progressionMode !== 'MILESTONE') return [];

  const mutations: StateMutation[] = [];
  for (const progress of state.quests) {
    if (progress.status !== 'COMPLETED') continue;
    const milestoneId = `milestone:${progress.questId}`;
    if (state.player.milestones.includes(milestoneId)) continue;
    mutations.push({
      mutationId: nextMutationId(),
      type: 'LEVEL_CHANGE',
      subjectId: 'player',
      reasonCode: 'MILESTONE_EARNED',
      payload: { milestoneId },
    });
  }
  return mutations;
}
