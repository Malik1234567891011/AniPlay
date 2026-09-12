import type {
  CharacterDef,
  CompanionDef,
  GameState,
  StateMutation,
  StoryVersion,
} from '@plotbreak/contracts';

/**
 * Spec §14.7 — companions who can leave.
 *
 * The failure mode this is built against is the party-as-inventory: you clear a
 * recruitment scene, a portrait appears in a sidebar, and from then on that
 * person is a permanent stat bonus who says something when you click them. It
 * is the single most common way a game claims to have characters and does not.
 *
 * So membership, morale and departure are all engine state:
 *
 * - `crew:<id>`   boolean, whether they are with you
 * - `morale:<id>` number 0–100, how that is going
 * - `left:<id>`   boolean, they went, and the world can gate on it
 *
 * Flags already carry numbers and already persist, so a companion survives a
 * reload, a fork and a replay with no new storage. Morale is not decoration:
 * a companion's contribution to the player's rolls scales with it, so a crew
 * the player has neglected is measurably worse at their jobs before anybody
 * announces that they are unhappy.
 *
 * Bonds run the other way round from most implementations. They are not the
 * player's relationship with a companion (that is the ordinary relationship
 * block); they are what two companions think of *each other*, and two people
 * who cannot stand each other cost both of them morale every day they are on
 * the same deck. Recruiting well therefore means thinking about the group,
 * which is the only thing that makes a roster a system rather than a shop.
 */

export function crewFlag(characterId: string): string {
  return `crew:${characterId}`;
}

export function moraleFlag(characterId: string): string {
  return `morale:${characterId}`;
}

export function departedFlag(characterId: string): string {
  return `left:${characterId}`;
}

export function isAboard(state: GameState, characterId: string): boolean {
  return Boolean(state.flags[crewFlag(characterId)]);
}

export function moraleOf(state: GameState, characterId: string): number {
  const raw = state.flags[moraleFlag(characterId)];
  return typeof raw === 'number' ? raw : 0;
}

export interface CompanionCharacter {
  readonly def: CharacterDef;
  readonly companion: CompanionDef;
}

/** Everyone the story says could ever sail with you. */
export function recruitableCharacters(story: StoryVersion): CompanionCharacter[] {
  return story.characters
    .filter((c): c is CharacterDef & { companion: CompanionDef } => c.companion !== null)
    .map((def) => ({ def, companion: def.companion }));
}

export interface CrewMember extends CompanionCharacter {
  readonly morale: number;
  /** 'steady' | 'unhappy' | 'about to walk' — legible without a number. */
  readonly moodLabel: string;
  /** What they are actually contributing right now, after the morale scale. */
  readonly effectiveSkills: Record<string, number>;
}

/**
 * Morale scales contribution rather than gating it, because a hard cutoff
 * makes an unhappy navigator identical to no navigator and that reads as a
 * bug. Thirds are coarse on purpose: the player should be able to feel the
 * step without being shown the number.
 */
export function moraleScale(morale: number): number {
  if (morale >= 60) return 1;
  if (morale >= 30) return 0.5;
  return 0;
}

export function moodLabel(morale: number): string {
  if (morale >= 75) return 'with you';
  if (morale >= 60) return 'steady';
  if (morale >= 40) return 'restless';
  if (morale >= 20) return 'unhappy';
  return 'about to walk';
}

export function crewRoster(state: GameState, story: StoryVersion): CrewMember[] {
  return recruitableCharacters(story)
    .filter((entry) => isAboard(state, entry.def.id))
    .map((entry) => {
      const morale = moraleOf(state, entry.def.id);
      const scale = moraleScale(morale);
      const effectiveSkills: Record<string, number> = {};
      for (const [skillId, value] of Object.entries(entry.companion.grantsSkills)) {
        const scaled = Math.floor(value * scale);
        if (scaled !== 0) effectiveSkills[skillId] = scaled;
      }
      return { ...entry, morale, moodLabel: moodLabel(morale), effectiveSkills };
    });
}

/**
 * What the crew is worth on a roll. Folded into the same modifier equipment
 * uses, so having the right people aboard is worth exactly as much as having
 * the right gear and is visible in the same place.
 */
export function crewSkillModifier(
  state: GameState,
  story: StoryVersion,
  skillId: string | null,
): number {
  if (!skillId) return 0;
  let mod = 0;
  for (const member of crewRoster(state, story)) mod += member.effectiveSkills[skillId] ?? 0;
  return mod;
}

/** Supplies the crew eats per day. A big crew is a reason to keep working. */
export function crewUpkeepPerDay(state: GameState, story: StoryVersion): number {
  return crewRoster(state, story).reduce((sum, m) => sum + m.companion.upkeepPerDay, 0);
}

export interface RecruitCheck {
  readonly ok: boolean;
  /** Plain-language reasons, in the order the player should hear them. */
  readonly unmet: string[];
  /** What they say. Their words, not a system message. */
  readonly copy: string;
}

/**
 * Whether this person will come, and if not, why — in words rather than a
 * boolean. A recruitment that fails silently teaches the player nothing, so
 * every unmet condition names the thing that would change it.
 */
export function recruitCheck(
  state: GameState,
  story: StoryVersion,
  characterId: string,
): RecruitCheck {
  const entry = recruitableCharacters(story).find((c) => c.def.id === characterId);
  if (!entry) {
    return { ok: false, unmet: ['They do not sail with anyone.'], copy: '' };
  }
  if (state.flags[departedFlag(characterId)]) {
    return {
      ok: false,
      unmet: ['They already left once.'],
      copy: entry.companion.refusalCopy,
    };
  }
  if (isAboard(state, characterId)) {
    return { ok: false, unmet: ['Already aboard.'], copy: '' };
  }

  const runtime = state.characters.find((c) => c.characterId === characterId);
  if (runtime && !runtime.alive) {
    return { ok: false, unmet: ['They are dead.'], copy: '' };
  }

  const want = entry.companion.joinsWhen;
  const unmet: string[] = [];

  for (const flag of want.flagsSet) {
    if (!state.flags[flag]) unmet.push(`Not yet: ${humanizeFlag(flag)}.`);
  }
  for (const flag of want.flagsUnset) {
    if (state.flags[flag]) unmet.push(`Already done, and it cannot be undone: ${humanizeFlag(flag)}.`);
  }
  for (const itemId of want.hasItems) {
    const held = state.player.inventory.some((e) => e.itemId === itemId && e.quantity > 0);
    if (!held) {
      const name = story.items.find((i) => i.id === itemId)?.name ?? itemId;
      unmet.push(`You are not carrying the ${name}.`);
    }
  }

  const rel = state.relationships.find((r) => r.characterId === characterId);
  if (want.minTrust !== null && (rel?.trust ?? 0) < want.minTrust) {
    unmet.push(`${entry.def.name} does not trust you enough yet.`);
  }
  if (want.minRespect !== null && (rel?.respect ?? 0) < want.minRespect) {
    unmet.push(`${entry.def.name} does not rate you yet.`);
  }
  for (const req of want.minFactionReputation) {
    const standing = state.factions.find((f) => f.factionId === req.factionId)?.reputation ?? 0;
    if (standing < req.value) {
      const name = story.factions.find((f) => f.id === req.factionId)?.name ?? req.factionId;
      unmet.push(`You do not stand well enough with ${name}.`);
    }
  }
  for (const otherId of want.companionsAboard) {
    if (!isAboard(state, otherId)) {
      const name = story.characters.find((c) => c.id === otherId)?.name ?? otherId;
      unmet.push(`${name} would have to be aboard first.`);
    }
  }

  // Somebody already aboard refuses to sail with them. This is the whole point
  // of bonds: a roster can be blocked by the people you already chose.
  const blocker = crewRoster(state, story).find((member) =>
    member.companion.bonds.some((bond) => bond.characterId === characterId && bond.value <= -3),
  );
  if (blocker) {
    unmet.push(`${blocker.def.name} will not sail with ${entry.def.name}. One of them, not both.`);
  }

  return {
    ok: unmet.length === 0,
    unmet,
    copy: unmet.length === 0 ? entry.companion.acceptCopy : entry.companion.refusalCopy,
  };
}

/** Bringing someone aboard: membership and their starting morale, together. */
export function recruitMutations(
  story: StoryVersion,
  characterId: string,
  nextMutationId: () => string,
): StateMutation[] {
  const entry = recruitableCharacters(story).find((c) => c.def.id === characterId);
  if (!entry) return [];
  return [
    {
      mutationId: nextMutationId(),
      type: 'FLAG_SET',
      subjectId: characterId,
      reasonCode: 'CREW_JOINED',
      payload: { flag: crewFlag(characterId), value: true },
    },
    {
      mutationId: nextMutationId(),
      type: 'FLAG_SET',
      subjectId: characterId,
      reasonCode: 'CREW_JOINED',
      payload: { flag: moraleFlag(characterId), value: entry.companion.startingMorale },
    },
  ];
}

export interface CrewDeparture {
  readonly characterId: string;
  readonly name: string;
  readonly reasonId: string;
  readonly copy: string;
  readonly betrayal: boolean;
}

export interface CrewWarning {
  readonly characterId: string;
  readonly name: string;
  readonly copy: string;
}

export interface CrewOutcome {
  readonly mutations: StateMutation[];
  readonly departures: CrewDeparture[];
  /** Nobody walks without the player having been told first. */
  readonly warnings: CrewWarning[];
  readonly observableFacts: string[];
  readonly privateFacts: string[];
}

/**
 * A day aboard, then a look at who is still willing to be here.
 *
 * Called once per commit with the minutes the turn consumed. Morale moves for
 * three reasons — their own drift, the things the player has done that they
 * have opinions about, and whoever else is on the deck with them — and then
 * anybody whose conditions are met goes.
 *
 * Reactions are keyed on flags and applied once each, tracked by a
 * `reacted:<id>:<flag>` marker, so a player is charged for a decision on the
 * turn they make it rather than every turn afterwards.
 */
export function updateCrew(
  state: GameState,
  story: StoryVersion,
  minutesElapsed: number,
  nextMutationId: () => string,
): CrewOutcome {
  const mutations: StateMutation[] = [];
  const departures: CrewDeparture[] = [];
  const warnings: CrewWarning[] = [];
  const observableFacts: string[] = [];
  const privateFacts: string[] = [];

  const roster = crewRoster(state, story);
  if (roster.length === 0) {
    return { mutations, departures, warnings, observableFacts, privateFacts };
  }

  const days = minutesElapsed / 1440;
  const aboardIds = new Set(roster.map((m) => m.def.id));

  for (const member of roster) {
    let morale = member.morale;

    morale += member.companion.moraleDriftPerDay * days;

    // Who else is on this deck. Friction is symmetric in effect but authored
    // one-way, so a story can have somebody who hates a person who is fine
    // with them — which is how most crews actually work.
    for (const bond of member.companion.bonds) {
      if (!aboardIds.has(bond.characterId)) continue;
      morale += bond.value * 2 * days;
      if (bond.value <= -2 && days > 0) {
        privateFacts.push(
          `${member.def.name} and ${story.characters.find((c) => c.id === bond.characterId)?.name ?? bond.characterId} ` +
            `are both aboard and it is costing them. ${bond.note}`,
        );
      }
    }

    for (const reaction of member.companion.reactions) {
      if (!state.flags[reaction.flag]) continue;
      const marker = `reacted:${member.def.id}:${reaction.flag}`;
      if (state.flags[marker]) continue;
      morale += reaction.morale;
      mutations.push({
        mutationId: nextMutationId(),
        type: 'FLAG_SET',
        subjectId: member.def.id,
        reasonCode: 'CREW_REACTION',
        payload: { flag: marker, value: true },
      });
      if (reaction.note) privateFacts.push(`${member.def.name}: ${reaction.note}`);
    }

    const next = Math.max(0, Math.min(100, Math.round(morale)));
    if (next !== member.morale) {
      mutations.push({
        mutationId: nextMutationId(),
        type: 'FLAG_SET',
        subjectId: member.def.id,
        reasonCode: 'CREW_MORALE',
        payload: { flag: moraleFlag(member.def.id), value: next },
      });
    }

    const rel = state.relationships.find((r) => r.characterId === member.def.id);
    const trust = rel?.trust ?? 0;

    const triggered = member.companion.leavesWhen.find((rule) =>
      departureTriggered(rule, state, next, trust),
    );
    if (triggered) {
      departures.push({
        characterId: member.def.id,
        name: member.def.name,
        reasonId: triggered.id,
        copy: triggered.departureCopy,
        betrayal: triggered.betrayal,
      });
      observableFacts.push(triggered.departureCopy);
      mutations.push(
        {
          mutationId: nextMutationId(),
          type: 'FLAG_SET',
          subjectId: member.def.id,
          reasonCode: triggered.betrayal ? 'CREW_BETRAYAL' : 'CREW_DEPARTED',
          payload: { flag: crewFlag(member.def.id), value: false },
        },
        {
          mutationId: nextMutationId(),
          type: 'FLAG_SET',
          subjectId: member.def.id,
          // The rule that fired and the words it produced ride along in the
          // payload, so a committed turn can report the departure without the
          // engine having to work out a second time who left and why.
          reasonCode: triggered.betrayal ? 'CREW_BETRAYAL' : 'CREW_DEPARTED',
          payload: {
            flag: departedFlag(member.def.id),
            value: true,
            reasonId: triggered.id,
            copy: triggered.departureCopy,
          },
        },
      );
      for (const flag of triggered.setsFlags) {
        mutations.push({
          mutationId: nextMutationId(),
          type: 'FLAG_SET',
          subjectId: member.def.id,
          reasonCode: 'CREW_DEPARTED',
          payload: { flag, value: true },
        });
      }
      if (triggered.toLocationId) {
        mutations.push({
          mutationId: nextMutationId(),
          type: 'LOCATION_CHANGE',
          subjectId: member.def.id,
          reasonCode: 'CREW_DEPARTED',
          payload: { locationId: triggered.toLocationId },
        });
      }
      continue;
    }

    // Still here, but on the way out. The warning is the game being fair.
    const nearMiss = member.companion.leavesWhen.find(
      (rule) =>
        rule.warningCopy !== '' &&
        rule.when.moraleAtMost !== null &&
        next <= rule.when.moraleAtMost + 15 &&
        next > rule.when.moraleAtMost,
    );
    if (nearMiss) {
      warnings.push({ characterId: member.def.id, name: member.def.name, copy: nearMiss.warningCopy });
      observableFacts.push(nearMiss.warningCopy);
    }
  }

  return { mutations, departures, warnings, observableFacts, privateFacts };
}

function departureTriggered(
  rule: { when: { moraleAtMost: number | null; trustAtMost: number | null; flagsSet: string[]; flagsUnset: string[]; afterWorldMinute: number | null } },
  state: GameState,
  morale: number,
  trust: number,
): boolean {
  const w = rule.when;
  // An empty condition block would fire on turn one for everyone. That is a
  // story bug, not a departure, so it is treated as never.
  const hasCondition =
    w.moraleAtMost !== null ||
    w.trustAtMost !== null ||
    w.flagsSet.length > 0 ||
    w.flagsUnset.length > 0 ||
    w.afterWorldMinute !== null;
  if (!hasCondition) return false;

  if (w.moraleAtMost !== null && morale > w.moraleAtMost) return false;
  if (w.trustAtMost !== null && trust > w.trustAtMost) return false;
  if (!w.flagsSet.every((flag) => Boolean(state.flags[flag]))) return false;
  if (w.flagsUnset.some((flag) => Boolean(state.flags[flag]))) return false;
  if (w.afterWorldMinute !== null && state.worldMinute < w.afterWorldMinute) return false;
  return true;
}

/**
 * The roster line the session HUD and the director both read from.
 * "Nessa Vale — Navigator, steady · Rook Arden — Gunner, unhappy"
 */
export function crewSummary(state: GameState, story: StoryVersion): string {
  const roster = crewRoster(state, story);
  if (roster.length === 0) return 'No crew.';
  return roster.map((m) => `${m.def.name} — ${m.companion.station}, ${m.moodLabel}`).join(' · ');
}

function humanizeFlag(flag: string): string {
  const [prefix, rest] = flag.includes(':') ? [flag.slice(0, flag.indexOf(':')), flag.slice(flag.indexOf(':') + 1)] : ['', flag];
  const words = (rest || flag).replace(/[_:]/g, ' ');
  switch (prefix) {
    case 'met':
      return `you have not met ${words}`;
    case 'spoke':
      return `you have not spoken to ${words}`;
    case 'visited':
      return `you have not been to ${words}`;
    default:
      return words;
  }
}

/**
 * Reading a committed turn back: who stopped being crew, from the mutations
 * that were actually accepted. The decision is made during resolution so the
 * copy reaches the writer; this is how the transaction reports it afterwards
 * without re-deciding anything.
 */
export function departuresFromMutations(
  story: StoryVersion,
  mutations: readonly StateMutation[],
): CrewDeparture[] {
  const out: CrewDeparture[] = [];
  for (const mutation of mutations) {
    if (mutation.type !== 'FLAG_SET') continue;
    if (mutation.reasonCode !== 'CREW_DEPARTED' && mutation.reasonCode !== 'CREW_BETRAYAL') continue;
    if (mutation.payload.flag !== departedFlag(mutation.subjectId)) continue;
    const def = story.characters.find((c) => c.id === mutation.subjectId);
    out.push({
      characterId: mutation.subjectId,
      name: def?.name ?? mutation.subjectId,
      reasonId: typeof mutation.payload.reasonId === 'string' ? mutation.payload.reasonId : '',
      copy: typeof mutation.payload.copy === 'string' ? mutation.payload.copy : '',
      betrayal: mutation.reasonCode === 'CREW_BETRAYAL',
    });
  }
  return out;
}
