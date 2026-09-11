import type { CheckOutcome, CheckResult } from '@aniplay/contracts';
import type { AttributeKey } from '@aniplay/contracts';
import { translate, type Locale } from '@aniplay/i18n';
import type { SeededRng } from './rng.js';

/** Spec §12.3 — `floor((attribute - 10) / 2)`. */
export function attributeModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

/** Spec §12.5 — named DC bands. Stories may use raw numbers too. */
export const DC_BANDS = {
  ROUTINE: 8,
  EASY: 10,
  MODERATE: 12,
  HARD: 15,
  VERY_HARD: 18,
  EXCEPTIONAL: 22,
  NEARLY_IMPOSSIBLE: 25,
} as const;
export type DcBand = keyof typeof DC_BANDS;

/**
 * Which difficulty band a DC falls in, as an **id**.
 *
 * Split from the wording so the band can be compared, logged and branched on
 * without anybody comparing against a word a translation would change.
 */
export type DcBandName =
  | 'ROUTINE'
  | 'EASY'
  | 'MODERATE'
  | 'HARD'
  | 'VERY_HARD'
  | 'EXCEPTIONAL'
  | 'NEARLY_IMPOSSIBLE';

export function dcBandName(dc: number): DcBandName {
  if (dc <= 8) return 'ROUTINE';
  if (dc <= 10) return 'EASY';
  if (dc <= 12) return 'MODERATE';
  if (dc <= 15) return 'HARD';
  if (dc <= 18) return 'VERY_HARD';
  if (dc <= 22) return 'EXCEPTIONAL';
  return 'NEARLY_IMPOSSIBLE';
}

const DC_BAND_KEY = {
  ROUTINE: 'world.dc.routine',
  EASY: 'world.dc.easy',
  MODERATE: 'world.dc.moderate',
  HARD: 'world.dc.hard',
  VERY_HARD: 'world.dc.very_hard',
  EXCEPTIONAL: 'world.dc.exceptional',
  NEARLY_IMPOSSIBLE: 'world.dc.nearly_impossible',
} as const;

export function dcBandLabel(dc: number, locale: Locale = 'en'): string {
  return translate(locale, DC_BAND_KEY[dcBandName(dc)]);
}

/** Spec §12.4 — proficiency scale. */
export const PROFICIENCY_LABELS = [
  'Untrained',
  'Familiar',
  'Trained',
  'Expert',
  'Master',
  'Legendary',
] as const;

const PROFICIENCY_KEYS = [
  'world.proficiency.untrained',
  'world.proficiency.familiar',
  'world.proficiency.trained',
  'world.proficiency.expert',
  'world.proficiency.master',
  'world.proficiency.legendary',
] as const;

export function proficiencyLabel(value: number, locale: Locale = 'en'): string {
  return translate(locale, PROFICIENCY_KEYS[Math.max(0, Math.min(5, value))]!);
}

export interface CheckSpec {
  readonly checkId: string;
  readonly label: string;
  readonly attribute: AttributeKey;
  readonly attributeScore: number;
  readonly skillId?: string | null;
  readonly skillProficiency?: number;
  readonly dc: number;
  readonly equipmentModifier?: number;
  readonly statusModifier?: number;
  readonly situationalModifier?: number;
  /** Spec §12.6, clamped to ±2 — advantage does not stack indefinitely. */
  readonly advantageLevel?: number;
  /**
   * Whether a near miss can land as a partial result. Spec §12.5: the engine
   * decides this from the action type, the writer never upgrades a failure.
   */
  readonly allowsPartial?: boolean;
}

export function clampAdvantage(level: number): number {
  return Math.max(-2, Math.min(2, Math.trunc(level)));
}

/**
 * Spec §12.6 — advantage rolls extra d20s and keeps the best; disadvantage
 * keeps the worst. All rolls are recorded so the math can be shown.
 */
export function rollWithAdvantage(
  rng: SeededRng,
  advantageLevel: number,
): { rolls: number[]; keptRoll: number } {
  const level = clampAdvantage(advantageLevel);
  const count = Math.abs(level) + 1;
  const rolls: number[] = [];
  for (let i = 0; i < count; i++) rolls.push(rng.d20());
  const keptRoll = level >= 0 ? Math.max(...rolls) : Math.min(...rolls);
  return { rolls, keptRoll };
}

/** Spec §12.5 outcome bands. */
export function classifyOutcome(
  margin: number,
  keptRoll: number,
  allowsPartial: boolean,
): CheckOutcome {
  // A natural 20 is always a critical success, and a natural 1 can only worsen
  // a result that already failed — never invent an unrelated catastrophe (§12.5).
  if (keptRoll === 20) return 'CRITICAL_SUCCESS';
  if (margin >= 8) return 'CRITICAL_SUCCESS';
  if (margin >= 3) return 'CLEAN_SUCCESS';
  if (margin >= 0) return 'SUCCESS';
  if (margin >= -4 && allowsPartial && keptRoll !== 1) return 'SUCCESS_WITH_COST';
  if (margin >= -4) return 'FAILURE';
  return keptRoll === 1 ? 'COMPLICATION' : 'FAILURE';
}

export const SUCCESSFUL_OUTCOMES: ReadonlySet<CheckOutcome> = new Set<CheckOutcome>([
  'CRITICAL_SUCCESS',
  'CLEAN_SUCCESS',
  'SUCCESS',
  'SUCCESS_WITH_COST',
]);

export function isSuccess(outcome: CheckOutcome): boolean {
  return SUCCESSFUL_OUTCOMES.has(outcome);
}

/**
 * The single place dice are rolled. Spec §10.6: the engine generates the roll
 * first — narration is written against a result that already exists.
 */
export function resolveCheck(rng: SeededRng, spec: CheckSpec): CheckResult {
  const advantageLevel = clampAdvantage(spec.advantageLevel ?? 0);
  const { rolls, keptRoll } = rollWithAdvantage(rng, advantageLevel);

  const modifier =
    attributeModifier(spec.attributeScore) +
    (spec.skillProficiency ?? 0) +
    (spec.equipmentModifier ?? 0) +
    (spec.statusModifier ?? 0) +
    (spec.situationalModifier ?? 0);

  const total = keptRoll + modifier;
  const margin = total - spec.dc;
  const outcome = classifyOutcome(margin, keptRoll, spec.allowsPartial ?? false);

  return {
    checkId: spec.checkId,
    label: spec.label,
    attribute: spec.attribute,
    skill: spec.skillId ?? null,
    dc: spec.dc,
    advantageLevel,
    rolls,
    keptRoll,
    modifier,
    total,
    margin,
    outcome,
  };
}

/**
 * Spec §12.7 — coarse pre-send risk estimate. Deliberately banded, never the
 * exact DC, unless the story opts into a crunchy presentation.
 */
export function estimateRisk(
  dc: number,
  modifier: number,
  advantageLevel = 0,
): 'SAFE' | 'UNCERTAIN' | 'RISKY' | 'EXTREME' {
  // P(d20 + modifier >= dc) for a single die.
  const needed = dc - modifier;
  let p = needed <= 1 ? 1 : needed > 20 ? 0 : (21 - needed) / 20;

  const level = clampAdvantage(advantageLevel);
  if (level > 0) p = 1 - Math.pow(1 - p, level + 1);
  else if (level < 0) p = Math.pow(p, Math.abs(level) + 1);

  if (p >= 0.85) return 'SAFE';
  if (p >= 0.55) return 'UNCERTAIN';
  if (p >= 0.25) return 'RISKY';
  return 'EXTREME';
}

const OUTCOME_KEY = {
  CRITICAL_SUCCESS: 'world.outcome.critical_success',
  CLEAN_SUCCESS: 'world.outcome.clean_success',
  SUCCESS: 'world.outcome.success',
  SUCCESS_WITH_COST: 'world.outcome.success_with_cost',
  FAILURE: 'world.outcome.failure',
  COMPLICATION: 'world.outcome.complication',
} as const;

/** Plain-language description for the check reveal module (spec §26.8). */
export function outcomeLabel(outcome: CheckOutcome, locale: Locale = 'en'): string {
  return translate(locale, OUTCOME_KEY[outcome]);
}

/** `d20 13 + Arcana 4 + Ritual 2 = 19 vs DC 18` — only when the story allows it (§10.6). */
export function formatCheckMath(check: CheckResult): string {
  const sign = check.modifier >= 0 ? '+' : '−';
  return `d20 ${check.keptRoll} ${sign} ${Math.abs(check.modifier)} = ${check.total} vs DC ${check.dc}`;
}
