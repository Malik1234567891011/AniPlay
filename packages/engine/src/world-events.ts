import type { GameState, StateMutation, StoryVersion, WorldEventDef } from '@plotbreak/contracts';

/**
 * Spec §15.3 — the world moves on its own.
 *
 * A schedule says where a person is at a given hour. This says what *happens*
 * at one: a theft at nine on Wednesday, a ship leaving, a body found. Without
 * it "the world does not wait for you" could only ever be something the
 * narrator asserted, which means the same beat is equally available at any
 * hour and none of it is real.
 *
 * Deterministic, which is what makes it a game: the same minute with the same
 * flags produces the same event, so a player who learns when something happens
 * can be somewhere else beforehand and stop it. That is the entire loop of a
 * mystery, and it only works if the timetable is authoritative.
 */

export interface FiredWorldEvent {
  readonly def: WorldEventDef;
  /** True when the player was there to see it. */
  readonly witnessed: boolean;
}

export interface WorldEventOutcome {
  readonly fired: FiredWorldEvent[];
  readonly mutations: StateMutation[];
  /** Safe to render: what a player standing there would have seen. */
  readonly observableFacts: string[];
  /** For the director. Never shown raw. */
  readonly privateFacts: string[];
}

/** The flag that records an event as having happened, so it fires once. */
export function firedFlag(eventId: string): string {
  return `world_event:${eventId}`;
}

/**
 * Everything whose hour has passed since the clock last moved.
 *
 * `from` is exclusive and `to` inclusive, so a turn that crosses several hours
 * fires everything inside it in order rather than only the last one — waiting
 * out an afternoon should not skip the afternoon.
 */
export function fireWorldEvents(
  state: GameState,
  story: StoryVersion,
  from: number,
  to: number,
  nextMutationId: () => string,
  /** Where the player will be when the hour lands, if the turn moves them. */
  playerLocationId: string = state.player.locationId,
): WorldEventOutcome {
  const fired: FiredWorldEvent[] = [];
  const mutations: StateMutation[] = [];
  const observableFacts: string[] = [];
  const privateFacts: string[] = [];

  const due = story.worldEvents
    .filter((event) => event.atWorldMinute > from && event.atWorldMinute <= to)
    .sort((a, b) => a.atWorldMinute - b.atWorldMinute);

  // Flags set by an event earlier in this same span. A turn that crosses two
  // days has to let Tuesday cause Friday: without this, an event gated on
  // another event's flag silently never fires whenever both fall inside one
  // turn, which is exactly what waiting out a long stretch does.
  const setThisSweep = new Set<string>();
  const isSet = (flag: string): boolean => Boolean(state.flags[flag]) || setThisSweep.has(flag);

  for (const event of due) {
    if (isSet(firedFlag(event.id))) continue;
    // The player already changed this. That is the reward for knowing.
    if (event.cancelledByFlags.some(isSet)) continue;
    if (!event.requiresFlags.every(isSet)) continue;

    setThisSweep.add(firedFlag(event.id));
    for (const flag of event.setsFlags) setThisSweep.add(flag);

    const witnessed = event.locationId === null || event.locationId === playerLocationId;
    fired.push({ def: event, witnessed });

    mutations.push({
      mutationId: nextMutationId(),
      type: 'FLAG_SET',
      subjectId: 'session',
      reasonCode: `WORLD_EVENT:${event.id}`,
      payload: { flag: firedFlag(event.id), value: true },
    });
    for (const flag of event.setsFlags) {
      mutations.push({
        mutationId: nextMutationId(),
        type: 'FLAG_SET',
        subjectId: 'session',
        reasonCode: `WORLD_EVENT:${event.id}`,
        payload: { flag, value: true },
      });
    }

    // People end up where the event puts them, overriding the timetable, because
    // the thing that just happened outranks where they were supposed to be.
    for (const move of event.movesCharacters) {
      mutations.push({
        mutationId: nextMutationId(),
        type: 'LOCATION_CHANGE',
        subjectId: move.characterId,
        reasonCode: `WORLD_EVENT:${event.id}`,
        payload: { locationId: move.toLocationId },
      });
    }

    if (witnessed) {
      observableFacts.push(event.publicCopy);
    } else if (event.directorNotes) {
      // It happened somewhere else. The writer must not narrate it, and must
      // not contradict it either.
      privateFacts.push(
        `Elsewhere, unwitnessed by the player: ${event.directorNotes} Do not narrate this. ` +
          'The player finds out about it the way anyone finds anything out.',
      );
    }
    if (witnessed && event.directorNotes) privateFacts.push(event.directorNotes);
  }

  return { fired, mutations, observableFacts, privateFacts };
}

/**
 * What the player could still get in front of.
 *
 * Only events they have some reason to know about — one whose timing they have
 * learned, which is exactly what `requiresFlags`-style knowledge represents.
 * Used to keep the objective honest about a clock that is running.
 */
export function upcomingWorldEvents(
  state: GameState,
  story: StoryVersion,
  withinMinutes: number,
): WorldEventDef[] {
  return story.worldEvents
    .filter((event) => !state.flags[firedFlag(event.id)])
    .filter((event) => !event.cancelledByFlags.some((flag) => state.flags[flag]))
    .filter(
      (event) =>
        event.atWorldMinute > state.worldMinute &&
        event.atWorldMinute <= state.worldMinute + withinMinutes,
    )
    .sort((a, b) => a.atWorldMinute - b.atWorldMinute);
}
