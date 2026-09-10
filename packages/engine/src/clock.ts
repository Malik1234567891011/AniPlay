/** Spec §15.4 — world time, action time costs, and deadline crossings. */

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

export function formatClock(worldMinute: number): string {
  const m = minuteOfDay(worldMinute);
  const hours = Math.floor(m / 60);
  const minutes = m % 60;
  const suffix = hours < 12 ? 'AM' : 'PM';
  const display = hours % 12 === 0 ? 12 : hours % 12;
  return `${display}:${minutes.toString().padStart(2, '0')} ${suffix}`;
}

export type DayPart = 'Dawn' | 'Morning' | 'Midday' | 'Afternoon' | 'Evening' | 'Night' | 'Late night';

export function dayPart(worldMinute: number): DayPart {
  const hour = Math.floor(minuteOfDay(worldMinute) / 60);
  if (hour < 5) return 'Late night';
  if (hour < 8) return 'Dawn';
  if (hour < 11) return 'Morning';
  if (hour < 14) return 'Midday';
  if (hour < 17) return 'Afternoon';
  if (hour < 21) return 'Evening';
  return 'Night';
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
 */
export function lightAt(worldMinute: number): string {
  const hour = Math.floor(minuteOfDay(worldMinute) / 60);
  if (hour < 5) return 'full dark, hours from any light';
  if (hour < 7) return 'first light, the sky going grey then colour';
  if (hour < 16) return 'broad daylight — it is not getting dark and will not for hours';
  if (hour < 18) return 'daylight still, going gold and low; sunset has not happened';
  if (hour < 20) return 'the light going, sun low or just gone';
  if (hour < 22) return 'dark, with whatever lamps this place has';
  return 'full dark and late';
}

/** Header label: `Day 2 · 4:15 PM`. Spec §10.2 A. */
export function formatWorldTime(worldMinute: number): string {
  return `Day ${dayNumber(worldMinute)} · ${formatClock(worldMinute)}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 1) return 'a moment';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rem = minutes % 60;
  if (rem === 0) return `${hours}h`;
  return `${hours}h ${rem}m`;
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
export function formatDeadline(worldMinute: number, deadline: number | null): string | null {
  if (deadline === null) return null;
  const remaining = deadline - worldMinute;
  if (remaining <= 0) return 'Overdue';
  return `in ${formatDuration(remaining)}`;
}
