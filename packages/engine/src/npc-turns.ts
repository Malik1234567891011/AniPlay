import type { EncounterState, GameState, StateMutation, StoryVersion } from '@plotbreak/contracts';
import { attributeModifier, resolveCheck } from './check.js';
import type { SeededRng } from './rng.js';
import { advanceTurnOrder, surrenderedFlag, qualitativeHealth } from './combat.js';

/**
 * Spec §13.3 — the other side of the round.
 *
 * A fight where only the player acts is not a fight, it is a punching bag with
 * a health bar. After the player's action resolves, every hostile who is still
 * standing takes their turn against the same deterministic rules the player
 * does: same dice, same modifiers, same seeded stream.
 *
 * NPC choices are driven by their authored personality, not by a model. Someone
 * whose boundaries say they will not start anything defends; someone who is
 * losing badly and is allowed to surrender does; a professional presses.
 */

export type NpcTacticalChoice = 'ATTACK' | 'DEFEND' | 'DISENGAGE' | 'SURRENDER' | 'CALL_FOR_HELP';

export interface NpcTurnResult {
  readonly mutations: StateMutation[];
  readonly observableFacts: string[];
  readonly privateFacts: Array<{ visibility: string; fact: string }>;
  readonly choices: Array<{ entityId: string; choice: NpcTacticalChoice }>;
}

/**
 * Decides what one hostile does with their turn.
 *
 * Deliberately legible rather than clever: a player should be able to work out
 * why an enemy did something, and an authored boundary should visibly hold.
 */
export function chooseNpcAction(
  story: StoryVersion,
  encounter: EncounterState,
  entityId: string,
  alreadyCalledForHelp = false,
): NpcTacticalChoice {
  const participant = encounter.participants.find((p) => p.entityId === entityId);
  const character = story.characters.find((c) => c.id === entityId);
  if (!participant || !character) return 'DEFEND';

  const healthRatio = participant.maxHealth === 0 ? 0 : participant.health / participant.maxHealth;

  // Spec §14.4 — an authored boundary is a hard rule, not a tendency.
  const wontFight = character.boundaries.some((b) => /will not start|never raises|not.*violen/i.test(b));

  if (healthRatio <= 0.25) {
    if (encounter.surrenderAllowed && !character.combatant?.tags.includes('fanatic')) return 'SURRENDER';
    return 'DISENGAGE';
  }

  // Someone whose whole role is procedure calls it in rather than brawling —
  // but only once. Help is already coming after that.
  if (!alreadyCalledForHelp && /prefect|guard|warden|officer|steward/i.test(character.role) && healthRatio < 0.7) {
    return 'CALL_FOR_HELP';
  }

  if (wontFight && healthRatio > 0.5) return 'DEFEND';
  if (character.combatant?.tags.includes('untrained') && healthRatio < 0.6) return 'DISENGAGE';

  return 'ATTACK';
}

/**
 * Runs every hostile's turn after the player's action.
 *
 * Uses the same seeded RNG stream as the rest of the turn, so a replay from the
 * stored seed reproduces the enemies' actions exactly along with the player's.
 */
export function resolveNpcTurns(
  story: StoryVersion,
  state: GameState,
  rng: SeededRng,
  nextMutationId: () => string,
): NpcTurnResult {
  const encounter = state.encounter;
  const empty: NpcTurnResult = { mutations: [], observableFacts: [], privateFacts: [], choices: [] };
  if (!encounter) return empty;

  const mutations: StateMutation[] = [];
  const observableFacts: string[] = [];
  const privateFacts: Array<{ visibility: string; fact: string }> = [];
  const choices: NpcTurnResult['choices'] = [];

  const player = encounter.participants.find((p) => p.entityId === 'player');
  // A downed player ends the exchange; the defeat path takes over from here.
  if (!player || player.downed) return empty;

  const health = story.resources.find((r) => r.id === 'health');

  for (const participant of encounter.participants) {
    if (participant.team !== 'ENEMY' || participant.downed) continue;

    const character = story.characters.find((c) => c.id === participant.entityId);
    if (!character) continue;

    const choice = chooseNpcAction(
      story,
      encounter,
      participant.entityId,
      state.flags.help_called === true,
    );
    choices.push({ entityId: participant.entityId, choice });

    switch (choice) {
      case 'ATTACK': {
        // Same maths the player is held to: d20 plus modifiers against a DC.
        const check = resolveCheck(rng, {
          checkId: `chk_npc_${participant.entityId}_${state.turnIndex}`,
          label: `${character.name} strikes`,
          attribute: 'might',
          attributeScore: character.attributes.might ?? 10,
          dc: 12 + Math.max(0, attributeModifier(state.player.attributes.agility ?? 10)),
          allowsPartial: false,
        });

        if (check.total >= check.dc) {
          const damage = character.combatant?.damage ?? 4;
          if (health) {
            mutations.push({
              mutationId: nextMutationId(),
              type: 'RESOURCE_DELTA',
              subjectId: 'player',
              reasonCode: `NPC_ATTACK:${character.id}`,
              payload: { resourceId: health.id, amount: -damage },
            });
          }
          mutations.push({
            mutationId: nextMutationId(),
            type: 'ENCOUNTER_UPDATE',
            subjectId: 'session',
            reasonCode: `NPC_ATTACK:${character.id}`,
            payload: { participantId: 'player', healthDelta: -damage },
          });
          observableFacts.push(
            `${character.name} hits you${health ? `, costing ${damage} ${health.name}` : ''}.`,
          );
        } else {
          observableFacts.push(`${character.name} comes at you and misses.`);
        }
        break;
      }

      case 'DEFEND': {
        mutations.push({
          mutationId: nextMutationId(),
          type: 'STATUS_ADD',
          subjectId: character.id,
          reasonCode: 'NPC_DEFEND',
          payload: {
            id: 'guarding',
            label: 'Guarding',
            kind: 'BUFF',
            durationMinutes: 10,
            description: 'Covering up rather than swinging back.',
          },
        });
        observableFacts.push(`${character.name} covers up rather than swinging back.`);
        privateFacts.push({
          visibility: 'SELF',
          fact: `${character.name} is refusing to escalate. That is a choice, and it should read as one.`,
        });
        break;
      }

      case 'CALL_FOR_HELP': {
        // Spec §15.3 — the institution notices, which is worse than losing.
        for (const faction of story.factions) {
          mutations.push({
            mutationId: nextMutationId(),
            type: 'FACTION_DELTA',
            subjectId: faction.id,
            reasonCode: 'NPC_CALLED_FOR_HELP',
            payload: { amount: -10 },
          });
          break;
        }
        const suspicion = story.resources.find((r) => r.polarity === 'GOOD_LOW');
        if (suspicion) {
          mutations.push({
            mutationId: nextMutationId(),
            type: 'RESOURCE_DELTA',
            subjectId: 'player',
            reasonCode: 'NPC_CALLED_FOR_HELP',
            payload: { resourceId: suspicion.id, amount: 25 },
          });
        }
        mutations.push({
          mutationId: nextMutationId(),
          type: 'FLAG_SET',
          subjectId: 'session',
          reasonCode: 'NPC_CALLED_FOR_HELP',
          payload: { flag: 'help_called', value: true },
        });
        observableFacts.push(`${character.name} stops fighting and starts shouting for help.`);
        break;
      }

      case 'SURRENDER': {
        mutations.push({
          mutationId: nextMutationId(),
          type: 'ENCOUNTER_UPDATE',
          subjectId: 'session',
          reasonCode: 'NPC_SURRENDER',
          payload: { participantId: character.id, downed: true },
        });
        // Surrender ends the encounter, which used to reset the person who
        // surrendered to full health — so the "choice with consequences" this
        // beat promises the player was not actually available to them. The
        // flag outlives the encounter, so somebody who has given up stays
        // somebody who has given up.
        mutations.push({
          mutationId: nextMutationId(),
          type: 'FLAG_SET',
          subjectId: character.id,
          reasonCode: 'NPC_SURRENDER',
          payload: { flag: surrenderedFlag(character.id), value: true },
        });
        observableFacts.push(`${character.name} is done. They put their hands up.`);
        privateFacts.push({
          visibility: 'SELF',
          fact: `${character.name} has surrendered. They are not a threat and hitting them again is a choice with consequences.`,
        });
        break;
      }

      case 'DISENGAGE': {
        mutations.push({
          mutationId: nextMutationId(),
          type: 'ENCOUNTER_UPDATE',
          subjectId: 'session',
          reasonCode: 'NPC_DISENGAGE',
          payload: { participantId: character.id, zoneId: 'far' },
        });
        observableFacts.push(
          `${character.name} breaks away, ${qualitativeHealth(participant).toLowerCase()} and not interested in more.`,
        );
        break;
      }
    }
  }

  if (choices.length > 0) {
    const next = advanceTurnOrder(encounter);
    mutations.push({
      mutationId: nextMutationId(),
      type: 'ENCOUNTER_UPDATE',
      subjectId: 'session',
      reasonCode: 'ROUND_ADVANCE',
      payload: { round: next.round, activeEntityId: next.activeEntityId },
    });
  }

  return { mutations, observableFacts, privateFacts, choices };
}
