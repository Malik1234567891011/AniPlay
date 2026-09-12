import { translate, type Locale } from '@plotbreak/i18n';

/**
 * Spec §15.4 — world time, action time costs, and deadline crossings.
 *
 * Every function that produces a *string* takes a `locale`, defaulted to `en`
 * so that a caller who has not been given one behaves exactly as it did. The
 * ones that produce a *number* or an *id* do not, because they are the same in
 * every language and that is the point of the split.
 *
 * These strings are shown to the player **and** read by the model — the scene
 * header and the day part both go into the writer's prompt — so they are
 * rendered in the session's locale rather than sent to the client as keys. An
 * English `Day 3 · 4:15 PM` in a French context window is drift
 * (`LOCALIZATION_ARCHITECTURE.md` §7).
 */

export type TimeCostCategory = 'INSTANT' | 'BRIEF' | 'SCENE' | 'TRAVEL' | 'REST';

/** Representative minutes per category. `TRAVEL` uses the authored edge duration. */
export const TIME_COST_MINUTES: Record<Exclude<TimeCostCategory, 'TRAVEL'>, number> = {
  INSTANT: 1,
  BRIEF: 6,
  SCENE: 25,
  REST: 240,
};

export function dayNumber(worldMinute: number): number {
  return Math.floor(worldMinute / 1440) + 1;
}

export function minuteOfDay(worldMinute: number): number {
  return ((worldMinute % 1440) + 1440) % 1440;
}

/**
 * The time of day.
 *
 * English is the 12-hour clock with AM/PM; **France runs on the 24-hour
 * clock**, so French is `16:15` and not `4:15 PM`. Built from arithmetic
 * rather than `Intl.DateTimeFormat`, because world time is a minute count and
 * not a moment on any calendar — there is no date and no time zone to be wrong
 * about.
 */
export function formatClock(worldMinute: number, locale: Locale = 'en'): string {
  const m = minuteOfDay(worldMinute);
  const hours = Math.floor(m / 60);
  const minutes = m % 60;
  const padded = minutes.toString().padStart(2, '0');
  if (locale === 'fr') return `${hours.toString().padStart(2, '0')}:${padded}`;
  const suffix = hours < 12 ? 'AM' : 'PM';
  const display = hours % 12 === 0 ? 12 : hours % 12;
  return `${display}:${padded} ${suffix}`;
}

/**
 * Which part of the day it is, as an **id**.
 *
 * Was a union of English display strings, which made the decision and the
 * wording the same value — so there was no way to ask "is it night?" without
 * comparing against a word that a translation would change. Splitting them is
 * better English architecture and is what makes the French possible at all.
 */
export type DayPart =
  | 'DAWN'
  | 'MORNING'
  | 'MIDDAY'
  | 'AFTERNOON'
  | 'EVENING'
  | 'NIGHT'
  | 'LATE_NIGHT';

const DAY_PART_KEY = {
  DAWN: 'world.daypart.dawn',
  MORNING: 'world.daypart.morning',
  MIDDAY: 'world.daypart.midday',
  AFTERNOON: 'world.daypart.afternoon',
  EVENING: 'world.daypart.evening',
  NIGHT: 'world.daypart.night',
  LATE_NIGHT: 'world.daypart.late_night',
} as const;

export function dayPart(worldMinute: number): DayPart {
  const hour = Math.floor(minuteOfDay(worldMinute) / 60);
  if (hour < 5) return 'LATE_NIGHT';
  if (hour < 8) return 'DAWN';
  if (hour < 11) return 'MORNING';
  if (hour < 14) return 'MIDDAY';
  if (hour < 17) return 'AFTERNOON';
  if (hour < 21) return 'EVENING';
  return 'NIGHT';
}

/**
 * The day part as a word — `Afternoon`, `Après-midi`.
 *
 * A bare noun, not a sentence, because the writer puts it into prose itself
 * and lowercases it.
 */
export function dayPartLabel(worldMinute: number, locale: Locale = 'en'): string {
  return translate(locale, DAY_PART_KEY[dayPart(worldMinute)]);
}

/**
 * What the light is doing, in words a writer can put in a sentence.
 *
 * `dayPart` alone was all the writer got, and "afternoon" is vague enough to
 * reach for atmosphere: a beat at **4:44 PM** at a summer lake camp opened "out
 * into the dusk… the air already shifting toward night", and one at 5:32 PM
 * managed "the hush of late afternoon" and "the sun is down behind the lake" in
 * the same breath. The header said the time the whole while.
 *
 * Deliberately conservative and deliberately not seasonal. We do not model
 * latitude or time of year, so this says only what is true almost anywhere:
 * mid-afternoon is not dusk, and eight in the evening is not noon. A world that
 * wants "dark by four" can say so in its tone guide, which the writer also gets.
 *
 * Localized rather than translated at the seam. This is prose the writer reads
 * and echoes, so an English phrase here teaches a French beat the English
 * rhythm — the same reason `WRITER_POLICY_FR` is authored and not translated.
 */
const LIGHT_KEY = [
  [5, 'world.light.full_dark_early'],
  [7, 'world.light.first_light'],
  [16, 'world.light.broad_day'],
  [18, 'world.light.gold_and_low'],
  [20, 'world.light.going'],
  [22, 'world.light.lamps'],
] as const;

export function lightAt(worldMinute: number, locale: Locale = 'en'): string {
  const hour = Math.floor(minuteOfDay(worldMinute) / 60);
  const band = LIGHT_KEY.find(([until]) => hour < until);
  return translate(locale, band ? band[1] : 'world.light.full_dark_late');
}

/** Header label: `Day 2 · 4:15 PM`, `Jour 2 · 16:15`. Spec §10.2 A. */
export function formatWorldTime(worldMinute: number, locale: Locale = 'en'): string {
  return translate(locale, 'world.time_label', {
    day: dayNumber(worldMinute),
    time: formatClock(worldMinute, locale),
  });
}

export function formatDuration(minutes: number, locale: Locale = 'en'): string {
  if (minutes < 1) return translate(locale, 'world.duration_moment');
  if (minutes < 60) return translate(locale, 'world.duration_minutes', { count: minutes });
  const hours = Math.floor(minutes / 60);
  const rem = minutes % 60;
  if (rem === 0) return translate(locale, 'world.duration_hours', { count: hours });
  return translate(locale, 'world.duration_hours_minutes', { hours, minutes: rem });
}

/**
 * True when advancing from `from` to `to` crosses `deadline`. Used to fire
 * scheduled events and expire quests exactly once (§15.4).
 */
export function crossesThreshold(from: number, to: number, deadline: number): boolean {
  return from < deadline && to >= deadline;
}

export function isDeadlinePassed(worldMinute: number, deadline: number | null): boolean {
  return deadline !== null && worldMinute >= deadline;
}

/** `in 3h 20m` / `overdue` — quest card deadline copy. */
export function formatDeadline(
  worldMinute: number,
  deadline: number | null,
  locale: Locale = 'en',
): string | null {
  if (deadline === null) return null;
  const remaining = deadline - worldMinute;
  if (remaining <= 0) return translate(locale, 'world.deadline_overdue');
  return translate(locale, 'world.deadline_in', { duration: formatDuration(remaining, locale) });
}
