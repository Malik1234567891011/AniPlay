/**
 * Spec §25 — the design system.
 *
 * A premium story game that happens to be generative: dark neutral foundation,
 * one selective accent, art gets the loudest colour. Every value here is a
 * token, so a light theme is a swap rather than a rewrite (§25.2).
 */

import { formatCompact, formatNumber, type Locale } from '@plotbreak/i18n';

export const colors = {
  bg: {
    base: '#0B0D12',
    elevated: '#121620',
    raised: '#191E2A',
  },
  text: {
    primary: '#F7F8FA',
    secondary: '#A7AFBE',
    muted: '#707888',
    /** For text sitting on the accent fill. */
    onAccent: '#0B0D12',
  },
  accent: {
    primary: '#7C6CFF',
    secondary: '#FF6B9E',
  },
  semantic: {
    success: '#43D6A4',
    warning: '#F6BE55',
    danger: '#FF5B69',
  },
  border: {
    subtle: '#262C39',
    strong: '#333B4C',
  },
  /** Scrim behind sheets and full-screen media. */
  // i18n-exempt: a CSS colour value
  scrim: 'rgba(4, 6, 11, 0.72)',
} as const;

/** Spec §25.4 — base grid 4pt. */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  giant: 48,
} as const;

/** Default horizontal phone gutter (§25.4). */
export const GUTTER = 16;

/** Spec §25.5 — do not round every container into a floating bubble. */
export const radius = {
  control: 10,
  card: 14,
  large: 20,
  pill: 999,
} as const;

/**
 * Spec §25.3. Body is 17pt because gameplay dialogue must be readable at arm's
 * length; `scale` respects Dynamic Type without letting extreme sizes break
 * layout (§27.3).
 */
export const type = {
  display: { fontSize: 32, lineHeight: 38, fontWeight: '600' as const },
  h1: { fontSize: 26, lineHeight: 32, fontWeight: '600' as const },
  h2: { fontSize: 22, lineHeight: 28, fontWeight: '600' as const },
  h3: { fontSize: 18, lineHeight: 24, fontWeight: '600' as const },
  body: { fontSize: 17, lineHeight: 24, fontWeight: '400' as const },
  bodyStrong: { fontSize: 17, lineHeight: 24, fontWeight: '600' as const },
  bodyCompact: { fontSize: 15, lineHeight: 21, fontWeight: '400' as const },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' as const },
  /** Nonessential labels only (§25.3). */
  micro: { fontSize: 11, lineHeight: 14, fontWeight: '500' as const },
} as const;

/**
 * Narration uses a serif for short passages only (§25.3). Falls back to the
 * platform serif rather than shipping a font file for v1.
 */
// ⚠️ Worth knowing: a CoreText glyph probe found **Georgia has no U+202F**, the
// narrow no-break space CLDR uses to group French thousands. That is not a
// theoretical problem — it is why `@plotbreak/i18n` folds U+202F to U+00A0 on
// every string it renders. Without the fold, every grouped number in French
// narration would draw its separator from a fallback face at a width nobody
// chose. See `docs/localization/fr-FR/research/typography.md`.
// i18n-exempt: a font family name, not copy
export const NARRATION_FONT = 'Georgia';

/** Spec §25.8 — 44×44pt minimum for anything used frequently. */
export const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 } as const;
export const MIN_TOUCH_TARGET = 44;

export const durations = {
  /** Press feedback. */
  instant: 120,
  short: 200,
  /** Spec §26.8 — check reveal is 550–900ms and always skippable. */
  checkReveal: 700,
  sheet: 280,
} as const;

/**
 * Spec §25.6 — the dark theme relies on luminance separation; shadows are
 * reserved for overlays and sheets.
 */
export const elevation = {
  sheet: {
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: -6 },
    elevation: 16,
  },
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
} as const;

/** Spec §25.11 — haptics are never the sole feedback for anything. */
export type HapticKind = 'light' | 'medium' | 'warning' | 'error' | 'success';

/** Risk colour, always paired with a label — never colour alone (§27.3). */
export function riskColor(risk: string | undefined): string {
  switch (risk) {
    case 'EXTREME':
      return colors.semantic.danger;
    case 'RISKY':
      return colors.semantic.warning;
    case 'UNCERTAIN':
      return colors.text.secondary;
    default:
      return colors.semantic.success;
  }
}

export function outcomeColor(outcome: string): string {
  switch (outcome) {
    case 'CRITICAL_SUCCESS':
      return colors.semantic.success;
    case 'CLEAN_SUCCESS':
    case 'SUCCESS':
      return colors.semantic.success;
    case 'SUCCESS_WITH_COST':
      return colors.semantic.warning;
    case 'COMPLICATION':
      return colors.semantic.danger;
    default:
      return colors.text.secondary;
  }
}

/**
 * Spec §26.10 — never abbreviate below 10,000; the wallet always shows the
 * full number.
 *
 * English keeps its own arithmetic, deliberately. `Intl`'s compact notation is
 * **not** a drop-in for the hand-rolled `K`/`M`: it drops the trailing `.0`
 * (`10K` where this says `10.0K`) and rounds half-to-even (`10 850` becomes
 * `10.9K` where this says `10.8K`). Measured across 285 728 values, the two
 * disagree on about a tenth of them. Swapping English onto `Intl` would be a
 * visible English change, so French gets a branch instead of English getting a
 * rewrite.
 *
 * French cannot use this arithmetic at all: French compact is `10 k` —
 * lowercase, with a space — and `1 M`, which no amount of suffix concatenation
 * produces.
 *
 * One thing did change for English: the uncompacted path was
 * `value.toLocaleString()` with **no locale**, which meant an English session
 * on a French phone rendered `10 000`. It now names its locale. On an English
 * phone the output is identical; on a French one it is finally right.
 */
export function formatCredits(value: number, compact = false, locale: Locale = 'en'): string {
  if (locale !== 'en') {
    if (!compact || value < 10_000) return formatNumber(value, locale);
    return formatCompact(value, locale);
  }
  if (!compact || value < 10_000) return formatNumber(value, 'en');
  // i18n-exempt: the English branch, kept byte-identical on purpose — French takes the branch above
  if (value < 1_000_000) return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
  // i18n-exempt: as above
  return `${(value / 1_000_000).toFixed(1)}M`;
}
