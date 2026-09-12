import { describe, expect, it } from 'vitest';
import {
  createInitialState,
  fireWorldEvents,
  firedFlag,
  loopNumber,
  loopShouldReset,
  resetLoop,
  upcomingWorldEvents,
} from '@plotbreak/engine';
import { SEVEN_DAYS } from './index.js';

/**
 * A looping mystery is only a game if the week is authoritative. These hold
 * this world to that: the timetable is fixed, the player can get in front of
 * it, and the only thing that survives a reset is what they worked out.
 */

const DAY = 1440;
const at = (day: number, hour: number, minute = 0): number => day * DAY + hour * 60 + minute;

const arrival = () =>
  createInitialState({
    sessionId: 'sess_sd',
    story: SEVEN_DAYS,
    identity: {
      displayName: 'Noa Fenwick',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId: 'arch_watcher',
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

let n = 0;
const nextId = (): string => `m${n++}`;

describe('the week is a real timetable', () => {
  it('has an event on every day of it', () => {
    const days = new Set(SEVEN_DAYS.worldEvents.map((e) => Math.floor(e.atWorldMinute / DAY)));
    expect(days.size).toBeGreaterThanOrEqual(6);
  });

  it('runs on its own whether the player is involved or not', () => {
    const state = arrival();
    const whole = fireWorldEvents(state, SEVEN_DAYS, 0, 7 * DAY, nextId, 'the_esplanade');
    expect(whole.fired.length).toBe(SEVEN_DAYS.worldEvents.length);
    // In order, every time.
    const minutes = whole.fired.map((f) => f.def.atWorldMinute);
    expect([...minutes].sort((a, b) => a - b)).toEqual(minutes);
  });

  it('is the same week twice', () => {
    const a = fireWorldEvents(arrival(), SEVEN_DAYS, 0, 7 * DAY, () => 'm', 'the_esplanade');
    const b = fireWorldEvents(arrival(), SEVEN_DAYS, 0, 7 * DAY, () => 'm', 'the_esplanade');
    expect(a).toEqual(b);
  });

  it('only tells the player what they were there to see', () => {
    const state = arrival();
    const elsewhere = fireWorldEvents(state, SEVEN_DAYS, at(1, 21), at(1, 23), nextId, 'the_library');
    const there = fireWorldEvents(state, SEVEN_DAYS, at(1, 21), at(1, 23), nextId, 'the_marina');
    expect(elsewhere.observableFacts).toHaveLength(0);
    expect(there.observableFacts.join(' ')).toMatch(/portacabin|berth records/i);
  });
});

describe('getting in front of it', () => {
  it('lets the theft be cancelled by a flag the player can earn', () => {
    const theft = SEVEN_DAYS.worldEvents.find((e) => e.id === 'the_marina_theft')!;
    expect(theft.cancelledByFlags).toContain('stopped_the_theft');

    const stopped = arrival();
    stopped.flags.stopped_the_theft = true;
    expect(fireWorldEvents(stopped, SEVEN_DAYS, at(1, 21), at(1, 23), nextId).fired).toHaveLength(0);
    expect(fireWorldEvents(arrival(), SEVEN_DAYS, at(1, 21), at(1, 23), nextId).fired).toHaveLength(1);
  });

  it('lets Wednesday be changed, and Thursday changes with it', () => {
    const ivy = SEVEN_DAYS.worldEvents.find((e) => e.id === 'ivy_at_the_point')!;
    expect(ivy.cancelledByFlags).toContain('ivy_stopped');

    const saved = arrival();
    saved.flags.ivy_stopped = true;
    expect(fireWorldEvents(saved, SEVEN_DAYS, at(2, 22), at(3, 1), nextId).fired).toHaveLength(0);
  });

  it('makes one event depend on another, so a change ripples', () => {
    // The harbour row only happens because the ledger page went missing.
    const row = SEVEN_DAYS.worldEvents.find((e) => e.id === 'the_harbour_row')!;
    expect(row.requiresFlags).toContain('ledger_page_gone');

    const state = arrival();
    expect(fireWorldEvents(state, SEVEN_DAYS, at(4, 17), at(4, 19), nextId).fired).toHaveLength(0);

    state.flags.ledger_page_gone = true;
    expect(fireWorldEvents(state, SEVEN_DAYS, at(4, 17), at(4, 19), nextId).fired).toHaveLength(1);
  });

  it('gives the player a quest for each intervention, with a window to hit', () => {
    for (const [questId, locationId] of [
      ['q_the_office', 'the_marina'],
      ['q_the_bench', 'the_point'],
    ] as const) {
      const step = SEVEN_DAYS.quests.find((q) => q.id === questId)!.steps[0]!;
      expect(step.succeedWhen!.atLocation).toBe(locationId);
      expect(step.succeedWhen!.afterWorldMinute).not.toBeNull();
      expect(step.succeedWhen!.beforeWorldMinute).not.toBeNull();
      expect(step.succeedWhen!.beforeWorldMinute!).toBeGreaterThan(step.succeedWhen!.afterWorldMinute!);
    }
  });

  it('closes the window before the event, not after it', () => {
    const office = SEVEN_DAYS.quests.find((q) => q.id === 'q_the_office')!.steps[0]!;
    const theft = SEVEN_DAYS.worldEvents.find((e) => e.id === 'the_marina_theft')!;
    expect(office.succeedWhen!.beforeWorldMinute!).toBeLessThanOrEqual(theft.atWorldMinute);
  });
});

describe('what survives Sunday', () => {
  it('ends the week at midnight and starts it on Monday morning', () => {
    const state = arrival();
    state.worldMinute = 7 * DAY - 1;
    expect(loopShouldReset(state, SEVEN_DAYS)).toBe(false);
    state.worldMinute = 7 * DAY;
    expect(loopShouldReset(state, SEVEN_DAYS)).toBe(true);

    const { state: monday } = resetLoop(state, SEVEN_DAYS);
    expect(monday.worldMinute).toBe(at(0, 8, 12));
    expect(monday.player.locationId).toBe('the_platform');
  });

  it('keeps only what the player worked out', () => {
    const state = arrival();
    state.worldMinute = 7 * DAY;
    state.flags['knows:ivy_goes'] = true;
    state.flags['knows:theft_happened'] = true;
    state.flags.stopped_the_theft = true;
    state.flags[firedFlag('the_marina_theft')] = true;
    state.flags['visited:the_clock_tower'] = true;

    const { state: next } = resetLoop(state, SEVEN_DAYS);

    // Knowledge crosses.
    expect(next.flags['knows:ivy_goes']).toBe(true);
    expect(next.flags['knows:theft_happened']).toBe(true);
    // Everything the week did does not — including the theft having happened,
    // so it is available to be stopped again.
    expect(next.flags.stopped_the_theft).toBeUndefined();
    expect(next.flags[firedFlag('the_marina_theft')]).toBeUndefined();
    expect(next.flags['visited:the_clock_tower']).toBeUndefined();
  });

  it('gives the whole week back, so the timetable can run again', () => {
    const state = arrival();
    state.worldMinute = 7 * DAY;
    for (const event of SEVEN_DAYS.worldEvents) state.flags[firedFlag(event.id)] = true;

    const { state: next } = resetLoop(state, SEVEN_DAYS);
    const upcoming = upcomingWorldEvents(next, SEVEN_DAYS, 7 * DAY);
    expect(upcoming.length).toBe(SEVEN_DAYS.worldEvents.length - 1);
  });

  it('counts the weeks', () => {
    let state = arrival();
    state.worldMinute = 7 * DAY;
    const first = resetLoop(state, SEVEN_DAYS);
    expect(first.loopNumber).toBe(2);
    state = first.state;
    state.worldMinute = 7 * DAY;
    expect(resetLoop(state, SEVEN_DAYS).loopNumber).toBe(3);
    expect(loopNumber(first.state)).toBe(2);
  });

  it('leaves an Echo only where something extreme happened', () => {
    const state = arrival();
    state.worldMinute = 7 * DAY;
    const mina = state.relationships.find((r) => r.characterId === 'mina')!;
    const theo = state.relationships.find((r) => r.characterId === 'theo')!;
    mina.affection = 90;
    theo.affection = 20;

    const { state: next, echoes } = resetLoop(state, SEVEN_DAYS);

    // She has never met you and finds she likes you anyway.
    expect(next.relationships.find((r) => r.characterId === 'mina')!.affection).toBe(36);
    expect(echoes.some((e) => e.characterId === 'mina')).toBe(true);
    // A pleasant week with Theo leaves nothing.
    expect(echoes.some((e) => e.characterId === 'theo')).toBe(false);
  });

  it('records being believed as an Echo, so it can outlast the week', () => {
    const believing = SEVEN_DAYS.quests.find((q) => q.id === 'q_make_someone_believe')!.steps[0]!;
    for (const route of believing.succeedWhenAny) {
      expect(route.setsFlags.some((f) => f.startsWith('echo:')), route.routeId).toBe(true);
    }
    expect(SEVEN_DAYS.rules.loop!.persistentFlagPrefixes).toContain('echo:');
  });
});

describe('knowing things unlocks doing things', () => {
  it('locks the mechanism until the player knows the tower matters', () => {
    const ability = SEVEN_DAYS.abilities.find((a) => a.id === 'read_the_mechanism')!;
    expect(ability.requires.flagsSet).toContain('knows:tower_matters');
    // And the refusal is a sentence about a clock, not about a flag.
    expect(ability.requires.lockedCopy).toMatch(/very large clock/i);
  });

  it('gates every knowledge-locked ability on a flag that survives a reset', () => {
    const prefixes = SEVEN_DAYS.rules.loop!.persistentFlagPrefixes;
    for (const ability of SEVEN_DAYS.abilities) {
      for (const flag of ability.requires.flagsSet) {
        expect(prefixes.some((p) => flag.startsWith(p)), `${ability.id} needs ${flag}`).toBe(true);
      }
    }
  });
});
