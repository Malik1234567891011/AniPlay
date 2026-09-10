/**
 * What the world's own variables are doing, in behaviour rather than in numbers.
 *
 * The same gap `speaker-brief.ts` exists for, one layer out. A world authors
 * "House Attention" with four described bands — subtle and impersonal at the
 * bottom, the building staging scenes around the people you care about at the
 * top — and what reached the model was `{ id: 'house_attention', current: 62,
 * max: 100 }`. A number with a noun on it is not a behaviour, and no amount of
 * prompt guidance turns one into the other.
 *
 * The writer got worse than that: it was never sent the resources at all.
 *
 * One projection, used by the director, both writers and the response stage, so
 * the fast path cannot quietly receive less than the slow one.
 */
import { resourceBand } from '@aniplay/contracts';
import type { TurnContext } from './context.js';

export interface StateBand {
  readonly id: string;
  /** The world's own word for it. "House Attention", "Momentum". */
  readonly name: string;
  /** How the world behaves right now, because of where this sits. */
  readonly behaviour: string;
  /**
   * Present only when the resource has bottomed out and the author wrote what
   * that means. `zeroStateConsequence` was the one point of the range the
   * schema could already express, and it is still the sharpest one.
   */
  readonly atZero: string | null;
}

/**
 * Every banded resource, as the behaviour it is currently producing.
 *
 * Resources with no authored bands are left out entirely rather than passed
 * through as numbers: Legs is legs, and a model told "Legs: 44/100" will invent
 * a meaning for it. Empty in most worlds and on most turns, which is correct.
 */
export function stateBands(context: TurnContext): StateBand[] {
  const bands: StateBand[] = [];

  for (const runtime of context.player.resources) {
    const def = context.story.resources.find((r) => r.id === runtime.id);
    if (!def) continue;
    const band = resourceBand(def, runtime.current);
    if (!band) continue;
    bands.push({
      id: def.id,
      name: def.name,
      behaviour: band.behaviour,
      atZero: runtime.current === 0 ? def.zeroStateConsequence : null,
    });
  }

  return bands;
}

/**
 * What the model is told these are for.
 *
 * Stated once, in the writer policy and the director policy, because a payload
 * key called `worldState` with a sentence in it is otherwise read as scenery.
 */
export const STATE_BAND_RULES = [
  '`worldState` is how this world is behaving right now, not a status readout.',
  'Each entry describes what is true at the level the world has actually reached — how guarded somebody',
  'is, how far the pressure has gone, what the place is doing. Write the beat so a reader could infer it',
  'without being told it. Never name the variable, never give it a number, and never have a character',
  'announce it: "the house is paying attention to you now" is a stat sheet with adjectives on.',
].join(' ');
