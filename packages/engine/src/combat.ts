import type {
  CharacterDef,
  EncounterParticipant,
  EncounterState,
  GameState,
  StateMutation,
  StoryVersion,
} from '@plotbreak/contracts';
import type { SeededRng } from './rng.js';
import { attributeModifier } from './check.js';

/**
 * Spec §13 — high-stakes encounters.
 *
 * Combat stays freeform: the player still types a sentence. The engine converts
 * it into zone movement plus a Major action and enforces the turn economy, so
 * "I do six things at once" resolves as what one round actually permits rather
 * than as an API error the player has to read.
 */

export const DEFAULT_ZONES = [
  { id: 'near', label: 'Close quarters', adjacentTo: ['mid'] },
  { id: 'mid', label: 'Open floor', adjacentTo: ['near', 'far'] },
  { id: 'far', label: 'Perimeter', adjacentTo: ['mid'] },
] as const;

export interface StartEncounterOptions {
  readonly encounterId: string;
  readonly objective: string;
  readonly enemyIds: readonly string[];
  readonly allyIds?: readonly string[];
  readonly environmentalAffordances?: readonly string[];
  readonly escapeCondition?: string;
  readonly surrenderAllowed?: boolean;
}

/** Initiative: d20 + Agility modifier, highest first. Ties break by id for determinism. */
export function rollInitiative(
  rng: SeededRng,
  entries: readonly { entityId: string; agility: number }[],
): Array<{ entityId: string; initiative: number }> {
  return entries
    .map((entry) => ({
      entityId: entry.entityId,
      initiative: rng.d20() + attributeModifier(entry.agility),
    }))
    .sort((a, b) => b.initiative - a.initiative || a.entityId.localeCompare(b.entityId));
}

export function buildEncounter(
  rng: SeededRng,
  state: GameState,
  story: StoryVersion,
  options: StartEncounterOptions,
): EncounterState {
  const playerHealth = state.player.resources.find((r) => r.id === 'health');

  const participants: EncounterParticipant[] = [
    {
      entityId: 'player',
      kind: 'PLAYER',
      team: 'ALLY',
      initiative: 0,
      health: Math.round(playerHealth?.current ?? 20),
      maxHealth: Math.round(playerHealth?.max ?? 20),
      zoneId: 'mid',
      statuses: [],
      downed: false,
    },
  ];

  const addCharacter = (characterId: string, team: 'ALLY' | 'ENEMY'): void => {
    const def = story.characters.find((c) => c.id === characterId);
    if (!def) return;
    const runtime = state.characters.find((c) => c.characterId === characterId);
    const maxHealth = def.combatant?.health ?? 14;
    participants.push({
      entityId: characterId,
      kind: 'NPC',
      team,
      initiative: 0,
      health: runtime?.health ?? maxHealth,
      maxHealth,
      zoneId: team === 'ENEMY' ? 'far' : 'mid',
      statuses: [],
      downed: false,
    });
  };

  for (const id of options.enemyIds) addCharacter(id, 'ENEMY');
  for (const id of options.allyIds ?? []) addCharacter(id, 'ALLY');

  const agilityOf = (entityId: string): number =>
    entityId === 'player'
      ? (state.player.attributes.agility ?? 10)
      : (story.characters.find((c) => c.id === entityId)?.attributes.agility ?? 10);

  const initiative = rollInitiative(
    rng,
    participants.map((p) => ({ entityId: p.entityId, agility: agilityOf(p.entityId) })),
  );
  for (const roll of initiative) {
    const participant = participants.find((p) => p.entityId === roll.entityId);
    if (participant) participant.initiative = roll.initiative;
  }

  const turnOrder = initiative.map((i) => i.entityId);

  return {
    encounterId: options.encounterId,
    objective: options.objective,
    participants,
    zones: DEFAULT_ZONES.map((z) => ({ id: z.id, label: z.label, adjacentTo: [...z.adjacentTo] })),
    round: 1,
    activeEntityId: turnOrder[0] ?? 'player',
    turnOrder,
    environmentalAffordances: [...(options.environmentalAffordances ?? [])],
    escapeCondition: options.escapeCondition ?? 'Break line of sight and reach the perimeter.',
    surrenderAllowed: options.surrenderAllowed ?? true,
  };
}

export function areZonesAdjacent(encounter: EncounterState, from: string, to: string): boolean {
  if (from === to) return true;
  const zone = encounter.zones.find((z) => z.id === from);
  return !!zone?.adjacentTo.includes(to);
}

/** Spec §13.3 — one Major, one Minor, and movement between adjacent zones. */
export interface TurnEconomy {
  major: boolean;
  minor: boolean;
  moved: boolean;
}

export function newTurnEconomy(): TurnEconomy {
  return { major: false, minor: false, moved: false };
}

export type ActionWeight = 'MAJOR' | 'MINOR' | 'MOVE' | 'FREE';

/**
 * Returns whether an action fits in what remains of the actor's round.
 * A rejected action is deferred, not errored — the narrator explains it in
 * fiction (§13.3).
 */
export function canSpend(economy: TurnEconomy, weight: ActionWeight): boolean {
  switch (weight) {
    case 'MAJOR':
      return !economy.major;
    case 'MINOR':
      return !economy.minor;
    case 'MOVE':
      return !economy.moved;
    case 'FREE':
      return true;
  }
}

export function spend(economy: TurnEconomy, weight: ActionWeight): void {
  if (weight === 'MAJOR') economy.major = true;
  else if (weight === 'MINOR') economy.minor = true;
  else if (weight === 'MOVE') economy.moved = true;
}

/**
 * Spec §13.5 — enemy information is limited to what the player could observe.
 * Exact hit points never leave the server as numbers.
 */
export function qualitativeHealth(participant: EncounterParticipant): string {
  const ratio = participant.maxHealth === 0 ? 0 : participant.health / participant.maxHealth;
  if (participant.downed || ratio <= 0) return 'Down';
  if (ratio >= 0.95) return 'Unhurt';
  if (ratio >= 0.7) return 'Grazed';
  if (ratio >= 0.4) return 'Wounded';
  if (ratio >= 0.15) return 'Badly hurt';
  return 'Barely standing';
}

export function visibleEnemyState(
  encounter: EncounterState,
  story: StoryVersion,
): Array<{ id: string; name: string; condition: string; statuses: string[]; zoneLabel: string }> {
  return encounter.participants
    .filter((p) => p.team === 'ENEMY')
    .map((p) => {
      const def: CharacterDef | undefined = story.characters.find((c) => c.id === p.entityId);
      return {
        id: p.entityId,
        name: def?.name ?? p.entityId,
        condition: qualitativeHealth(p),
        statuses: p.statuses.map((s) => s.label),
        zoneLabel: encounter.zones.find((z) => z.id === p.zoneId)?.label ?? p.zoneId,
      };
    });
}

export function advanceTurnOrder(encounter: EncounterState): {
  activeEntityId: string;
  round: number;
} {
  const living = encounter.turnOrder.filter((id) => {
    const participant = encounter.participants.find((p) => p.entityId === id);
    return participant && !participant.downed;
  });
  if (living.length === 0) return { activeEntityId: encounter.activeEntityId, round: encounter.round };

  const currentIndex = living.indexOf(encounter.activeEntityId);
  const nextIndex = (currentIndex + 1) % living.length;
  const wrapped = nextIndex <= currentIndex;
  return {
    activeEntityId: living[nextIndex]!,
    round: wrapped ? encounter.round + 1 : encounter.round,
  };
}

/** True when one side can no longer act. */
export function encounterOutcome(
  encounter: EncounterState,
): 'ONGOING' | 'PLAYER_VICTORY' | 'PLAYER_DEFEAT' {
  const enemiesStanding = encounter.participants.some((p) => p.team === 'ENEMY' && !p.downed);
  const player = encounter.participants.find((p) => p.entityId === 'player');
  if (player?.downed) return 'PLAYER_DEFEAT';
  if (!enemiesStanding) return 'PLAYER_VICTORY';
  return 'ONGOING';
}

/**
 * Spec §13.6 — the engine enforces the story's defeat mode. `LETHAL` is the
 * only mode that may end a run, and stories that allow it must have declared
 * `PERMANENT_DEATH` in their content descriptors before the player started.
 */
export function defeatMutations(
  state: GameState,
  story: StoryVersion,
  nextMutationId: () => string,
): { mutations: StateMutation[]; narrativeHint: string } {
  const mutations: StateMutation[] = [
    { mutationId: nextMutationId(), type: 'ENCOUNTER_END', subjectId: 'session', reasonCode: 'DEFEAT', payload: {} },
  ];

  switch (story.rules.defeatMode) {
    case 'LETHAL':
      mutations.push({
        mutationId: nextMutationId(),
        type: 'FLAG_SET',
        subjectId: 'session',
        reasonCode: 'DEFEAT_LETHAL',
        payload: { flag: 'player_dead', value: true },
      });
      return { mutations, narrativeHint: 'The run ends here. Death is permanent in this world.' };

    case 'CHECKPOINT':
      mutations.push({
        mutationId: nextMutationId(),
        type: 'FLAG_SET',
        subjectId: 'session',
        reasonCode: 'DEFEAT_CHECKPOINT',
        payload: { flag: 'awaiting_checkpoint_retry', value: true },
      });
      return { mutations, narrativeHint: 'You wake at the last safe point, the attempt undone.' };

    case 'ROGUELIKE':
      mutations.push({
        mutationId: nextMutationId(),
        type: 'FLAG_SET',
        subjectId: 'session',
        reasonCode: 'DEFEAT_ROGUELIKE',
        payload: { flag: 'run_ended', value: true },
      });
      return { mutations, narrativeHint: 'This run is over. What you learned carries forward.' };

    case 'FAIL_FORWARD':
    default: {
      const health = state.player.resources.find((r) => r.id === 'health');
      if (health) {
        mutations.push({
          mutationId: nextMutationId(),
          type: 'RESOURCE_DELTA',
          subjectId: 'player',
          reasonCode: 'DEFEAT_FAIL_FORWARD',
          payload: { resourceId: health.id, amount: Math.max(1, Math.ceil(health.max * 0.25)) - health.current },
        });
      }
      mutations.push({
        mutationId: nextMutationId(),
        type: 'STATUS_ADD',
        subjectId: 'player',
        reasonCode: 'DEFEAT_FAIL_FORWARD',
        payload: {
          id: 'wounded',
          label: 'Wounded',
          kind: 'DEBUFF',
          durationMinutes: 480,
          attributeModifiers: { might: -2, agility: -2 },
          description: 'You lost that fight. Moving hurts.',
        },
      });
      return {
        mutations,
        narrativeHint: 'You lose, and the story continues from the consequence rather than a game over.',
      };
    }
  }
}


// ---------------------------------------------------------------------------
// Death
// ---------------------------------------------------------------------------

export function deadFlag(characterId: string): string {
  return `dead:${characterId}`;
}

/**
 * Somebody who has stopped fighting and said so.
 *
 * Outlives the encounter deliberately. Surrender ends the encounter, and while
 * that state lived only on the participant it meant the person who gave up was
 * restored to full health the moment the fight object was cleared — so the
 * scene where a player stands over somebody who has surrendered, which the
 * engine explicitly tells the writer is "a choice with consequences", could
 * not actually be played.
 */
export function surrenderedFlag(characterId: string): string {
  return `surrendered:${characterId}`;
}

export function isAlive(state: GameState, characterId: string): boolean {
  return state.characters.find((c) => c.characterId === characterId)?.alive ?? true;
}

/**
 * Spec §13.9 — whether this attack finishes them.
 *
 * The rule the engine needs to be able to answer honestly is the user's: if
 * the action reasonably happens, commit it. Not "is this character needed in
 * act three".
 *
 * Two ways someone dies. A world that runs `LETHAL` kills anyone whose health
 * reaches zero, because that is what that mode means. Every other world
 * requires the player to be standing over somebody already down and to do it
 * deliberately — which keeps a scuffle from becoming a killing by accident,
 * and keeps a killing from being impossible.
 */
export function lethalMutations(
  state: GameState,
  story: StoryVersion,
  characterId: string,
  options: { deliberate: boolean; incomingDamage?: number },
  nextMutationId: () => string,
): StateMutation[] {
  if (!isAlive(state, characterId)) return [];

  const participant = state.encounter?.participants.find((p) => p.entityId === characterId);

  // Counting the blow that is landing right now, not only the state before it.
  //
  // This is why nobody could be killed. The check ran during resolution, which
  // sees the world *before* the attack applies, so the target was never
  // already down — and by the time they were, commit had seen no enemy
  // standing, declared victory and ended the encounter, which reset them to
  // full health for the next attack. A player could take somebody to two hit
  // points forever and never finish them.
  const after = participant ? participant.health - (options.incomingDamage ?? 0) : Number.POSITIVE_INFINITY;
  const surrendered = Boolean(state.flags[surrenderedFlag(characterId)]);
  const down = surrendered || (participant ? participant.downed || after <= 0 : false);

  const lethalWorld = story.rules.defeatMode === 'LETHAL';
  const kills = lethalWorld ? down : down && options.deliberate;
  if (!kills) return [];

  return [
    {
      mutationId: nextMutationId(),
      type: 'FLAG_SET',
      subjectId: characterId,
      reasonCode: 'KILLED_BY_PLAYER',
      payload: { flag: deadFlag(characterId), value: true },
    },
  ];
}

/**
 * What the world lost when somebody died.
 *
 * Returned so the director can be told rather than left to notice. The point
 * is not to undo it — nobody is resurrected to protect a plot — it is that
 * everything the dead person was carrying is now a hole in the story that has
 * to be routed around, and the writer needs to know the shape of the hole.
 */
export function deathConsequences(story: StoryVersion, characterId: string): string[] {
  const character = story.characters.find((c) => c.id === characterId);
  if (!character) return [];

  const notes: string[] = [`${character.name} is dead. They stay dead.`];

  const secrets = character.secrets.map((s) => s.fact);
  if (secrets.length > 0) {
    notes.push(
      `What died with them, unless it exists somewhere else in the world: ${secrets.join(' | ')} ` +
        'Do not have anyone else simply know it now. If the player is to learn it, they learn it another way.',
    );
  }

  const quests = story.quests.filter((q) => q.involvedCharacterIds.includes(characterId));
  if (quests.length > 0) {
    notes.push(
      `These were built around them and now have to happen differently or not at all: ${quests
        .map((q) => q.title)
        .join(', ')}.`,
    );
  }

  const bereaved = story.characters.filter(
    (c) => c.id !== characterId && c.knowledgeScope.some((k) => character.knowledgeScope.includes(k)),
  );
  if (bereaved.length > 0) {
    notes.push(`People who will find out and have a view: ${bereaved.map((c) => c.name).join(', ')}.`);
  }

  return notes;
}
