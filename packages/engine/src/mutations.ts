import type {
  AttributeKey,
  GameState,
  InventoryEntry,
  StateMutation,
  StatusEffect,
  StoryVersion,
} from '@aniplay/contracts';
import { ATTRIBUTE_KEYS } from '@aniplay/contracts';
import { rankLabelFor } from './state.js';
import { RELATIONSHIP_DIMENSIONS, dimensionBounds, type RelationshipDimension } from './relationships.js';

/**
 * Spec §12.9 / §11.3 — the only sanctioned write path into game state.
 *
 * A narrated item does not exist until a validated `ITEM_ADD` mutation lands
 * here and names an item the story actually defines. Everything the director or
 * writer proposes passes through `validateMutations` first; anything referencing
 * an unknown entity is rejected, not coerced.
 */

export interface MutationRejection {
  readonly mutationId: string;
  readonly type: string;
  readonly reason: string;
}

export interface ValidationResult {
  readonly accepted: StateMutation[];
  readonly rejected: MutationRejection[];
}

function isAttributeKey(value: unknown): value is AttributeKey {
  return typeof value === 'string' && (ATTRIBUTE_KEYS as readonly string[]).includes(value);
}

function isRelationshipDimension(value: unknown): value is RelationshipDimension {
  return typeof value === 'string' && RELATIONSHIP_DIMENSIONS.includes(value as RelationshipDimension);
}

function num(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function str(value: unknown): string | null {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * Spec §32.4 `validateMutations` — every mutation must reference an entity the
 * pinned story version defines. This is the layer that holds even when a model
 * has been talked into inventing a magic sword.
 */
export function validateMutations(
  mutations: readonly StateMutation[],
  state: GameState,
  story: StoryVersion,
): ValidationResult {
  const accepted: StateMutation[] = [];
  const rejected: MutationRejection[] = [];

  const reject = (m: StateMutation, reason: string): void => {
    rejected.push({ mutationId: m.mutationId, type: m.type, reason });
  };

  for (const mutation of mutations) {
    const p = mutation.payload as Record<string, unknown>;

    switch (mutation.type) {
      case 'RESOURCE_DELTA': {
        const resourceId = str(p.resourceId);
        if (!resourceId || !story.resources.some((r) => r.id === resourceId)) {
          reject(mutation, `unknown resource "${String(p.resourceId)}"`);
          continue;
        }
        break;
      }
      case 'ITEM_ADD':
      case 'ITEM_REMOVE':
      case 'ITEM_UPDATE': {
        const itemId = str(p.itemId);
        if (!itemId || !story.items.some((i) => i.id === itemId)) {
          reject(mutation, `item "${String(p.itemId)}" is not defined by this story`);
          continue;
        }
        if (mutation.type === 'ITEM_UPDATE' && p.equipped === true) {
          const def = story.items.find((i) => i.id === itemId)!;
          if (!def.equipSlot) {
            reject(mutation, `item "${itemId}" has no equip slot`);
            continue;
          }
        }
        break;
      }
      case 'RELATIONSHIP_DELTA': {
        if (!story.characters.some((c) => c.id === mutation.subjectId)) {
          reject(mutation, `unknown character "${mutation.subjectId}"`);
          continue;
        }
        if (!isRelationshipDimension(p.dimension)) {
          reject(mutation, `invalid relationship dimension "${String(p.dimension)}"`);
          continue;
        }
        break;
      }
      case 'QUEST_TRANSITION': {
        if (!story.quests.some((q) => q.id === mutation.subjectId)) {
          reject(mutation, `unknown quest "${mutation.subjectId}"`);
          continue;
        }
        break;
      }
      case 'FACTION_DELTA': {
        if (!story.factions.some((f) => f.id === mutation.subjectId)) {
          reject(mutation, `unknown faction "${mutation.subjectId}"`);
          continue;
        }
        break;
      }
      case 'LOCATION_CHANGE': {
        const locationId = str(p.locationId);
        // A move that carries its own definition is creating the place it goes
        // to. Spec §11.9 — the destination cannot already be in the story,
        // because the player is inventing it by walking into it, and rejecting
        // it here was silently discarding every generated location.
        const carriesDefinition =
          Boolean((p.generated as { id?: string } | undefined)?.id) ||
          Boolean((p.generatedCharacter as { id?: string } | undefined)?.id);
        if (!locationId || (!carriesDefinition && !story.locations.some((l) => l.id === locationId))) {
          reject(mutation, `unknown location "${String(p.locationId)}"`);
          continue;
        }
        break;
      }
      case 'ABILITY_UNLOCK': {
        const abilityId = str(p.abilityId);
        if (!abilityId || !story.abilities.some((a) => a.id === abilityId)) {
          reject(mutation, `unknown ability "${String(p.abilityId)}"`);
          continue;
        }
        break;
      }
      case 'TIME_ADVANCE': {
        if (num(p.minutes, -1) < 0) {
          reject(mutation, 'time may not run backwards');
          continue;
        }
        break;
      }
      case 'STATUS_ADD':
      case 'STATUS_REMOVE':
      case 'XP_DELTA':
      case 'LEVEL_CHANGE':
      case 'FLAG_SET':
      case 'ENCOUNTER_START':
      case 'ENCOUNTER_UPDATE':
      case 'ENCOUNTER_END':
        break;
      default:
        reject(mutation, `unsupported mutation type "${mutation.type}"`);
        continue;
    }

    accepted.push(mutation);
  }

  return { accepted, rejected };
}

/**
 * Applies one validated mutation in place. Callers work on a clone; `applyMutations`
 * handles that. Assumes `validateMutations` has already run.
 */
function applyOne(state: GameState, story: StoryVersion, mutation: StateMutation): void {
  const p = mutation.payload as Record<string, unknown>;

  switch (mutation.type) {
    case 'RESOURCE_DELTA': {
      const resourceId = str(p.resourceId)!;
      const resource = state.player.resources.find((r) => r.id === resourceId);
      if (!resource) return;
      const next = resource.current + num(p.amount);
      resource.current = Math.max(0, Math.min(resource.max, next));
      return;
    }

    case 'ITEM_ADD': {
      const itemId = str(p.itemId)!;
      const def = story.items.find((i) => i.id === itemId)!;
      const quantity = Math.max(1, Math.trunc(num(p.quantity, 1)));

      if (def.stackable) {
        const existing = state.player.inventory.find((e) => e.itemId === itemId && !e.instanceName);
        if (existing) {
          existing.quantity = Math.min(def.maxStack, existing.quantity + quantity);
          return;
        }
      }
      const entry: InventoryEntry = {
        entryId: `inv_${state.turnIndex}_${itemId}_${state.player.inventory.length}`,
        itemId,
        quantity: def.stackable ? Math.min(def.maxStack, quantity) : 1,
        equipped: false,
        instanceName: str(p.instanceName),
      };
      state.player.inventory.push(entry);
      // A non-stackable item granted in quantity becomes distinct entries.
      if (!def.stackable && quantity > 1) {
        for (let i = 1; i < quantity; i++) {
          state.player.inventory.push({
            ...entry,
            entryId: `${entry.entryId}_${i}`,
          });
        }
      }
      return;
    }

    case 'ITEM_REMOVE': {
      const itemId = str(p.itemId)!;
      let remaining = Math.max(1, Math.trunc(num(p.quantity, 1)));
      for (const entry of [...state.player.inventory]) {
        if (entry.itemId !== itemId || remaining <= 0) continue;
        const take = Math.min(entry.quantity, remaining);
        entry.quantity -= take;
        remaining -= take;
        if (entry.quantity <= 0) {
          state.player.inventory = state.player.inventory.filter((e) => e.entryId !== entry.entryId);
        }
      }
      return;
    }

    case 'ITEM_UPDATE': {
      const itemId = str(p.itemId)!;
      const entryId = str(p.entryId);
      const entry = entryId
        ? state.player.inventory.find((e) => e.entryId === entryId)
        : state.player.inventory.find((e) => e.itemId === itemId);
      if (!entry) return;
      if (typeof p.equipped === 'boolean') {
        const def = story.items.find((i) => i.id === entry.itemId);
        if (p.equipped && def?.equipSlot) {
          // One item per slot: equipping displaces whatever occupied it.
          for (const other of state.player.inventory) {
            if (other.entryId === entry.entryId || !other.equipped) continue;
            const otherDef = story.items.find((i) => i.id === other.itemId);
            if (otherDef?.equipSlot === def.equipSlot) other.equipped = false;
          }
        }
        entry.equipped = p.equipped;
      }
      if (typeof p.instanceName === 'string') entry.instanceName = p.instanceName;
      return;
    }

    case 'RELATIONSHIP_DELTA': {
      const rel = state.relationships.find((r) => r.characterId === mutation.subjectId);
      if (!rel) return;
      const dimension = p.dimension as RelationshipDimension;
      if (!isRelationshipDimension(dimension)) return;
      const { min, max } = dimensionBounds(dimension);
      rel[dimension] = Math.max(min, Math.min(max, rel[dimension] + Math.trunc(num(p.amount))));
      rel.lastChangedTurn = state.turnIndex;
      const gateId = str(p.unlockGateId);
      if (gateId && !rel.unlockedGates.includes(gateId)) rel.unlockedGates.push(gateId);
      return;
    }

    case 'QUEST_TRANSITION': {
      const progress = state.quests.find((q) => q.questId === mutation.subjectId);
      if (!progress) return;
      const status = str(p.status);
      if (status) progress.status = status as typeof progress.status;
      if ('stepId' in p) progress.currentStepId = str(p.stepId);
      if (progress.startedAtWorldMinute === null && status === 'ACTIVE') {
        progress.startedAtWorldMinute = state.worldMinute;
      }
      return;
    }

    case 'FACTION_DELTA': {
      const faction = state.factions.find((f) => f.factionId === mutation.subjectId);
      if (!faction) return;
      faction.reputation = Math.max(-100, Math.min(100, faction.reputation + Math.trunc(num(p.amount))));
      const def = story.factions.find((f) => f.id === mutation.subjectId);
      if (def) faction.rankLabel = rankLabelFor(def.ranks, faction.reputation);
      return;
    }

    case 'STATUS_ADD': {
      const status: StatusEffect = {
        id: str(p.id) ?? `status_${state.turnIndex}`,
        label: str(p.label) ?? 'Status',
        kind: (str(p.kind) as StatusEffect['kind']) ?? 'NEUTRAL',
        expiresAtWorldMinute:
          typeof p.durationMinutes === 'number'
            ? state.worldMinute + Math.trunc(p.durationMinutes)
            : (typeof p.expiresAtWorldMinute === 'number' ? Math.trunc(p.expiresAtWorldMinute) : null),
        attributeModifiers: Object.fromEntries(
          Object.entries((p.attributeModifiers as Record<string, unknown>) ?? {}).filter(
            (pair): pair is [AttributeKey, number] => isAttributeKey(pair[0]) && typeof pair[1] === 'number',
          ),
        ) as Partial<Record<AttributeKey, number>>,
        description: str(p.description) ?? '',
      };

      if (mutation.subjectId === 'player') {
        state.player.statuses = state.player.statuses.filter((s) => s.id !== status.id);
        state.player.statuses.push(status);
      } else {
        const character = state.characters.find((c) => c.characterId === mutation.subjectId);
        if (!character) return;
        character.statuses = character.statuses.filter((s) => s.id !== status.id);
        character.statuses.push(status);
      }
      return;
    }

    case 'STATUS_REMOVE': {
      const id = str(p.id);
      if (!id) return;
      if (mutation.subjectId === 'player') {
        state.player.statuses = state.player.statuses.filter((s) => s.id !== id);
      } else {
        const character = state.characters.find((c) => c.characterId === mutation.subjectId);
        if (character) character.statuses = character.statuses.filter((s) => s.id !== id);
      }
      return;
    }

    case 'LOCATION_CHANGE': {
      const locationId = str(p.locationId)!;
      // Spec §11.9 — a move into somewhere the story invented carries the
      // definition with it, and that is where it becomes permanent. It is
      // stored on the session, so it survives the reload the way everything
      // else on the session does.
      const generatedLocation = p.generated as { id?: string } | undefined;
      if (generatedLocation?.id && !state.generated.locations.some((l) => l.id === generatedLocation.id)) {
        state.generated.locations.push(generatedLocation as (typeof state.generated.locations)[number]);
        state.generated.origins.push({
          entityId: generatedLocation.id,
          kind: 'LOCATION',
          promotedAtTurn: state.turnIndex,
          reason: mutation.reasonCode,
        });
      }

      // The same move for a person the story invented. Putting somebody in a
      // room is exactly what promoting them means — they exist, and they are
      // here — so this rides the mutation that already says that rather than
      // inventing a nineteenth type the AI contract does not have.
      const generatedCharacter = p.generatedCharacter as { id?: string } | undefined;
      if (generatedCharacter?.id && !state.generated.characters.some((c) => c.id === generatedCharacter.id)) {
        state.generated.characters.push(generatedCharacter as (typeof state.generated.characters)[number]);
        state.generated.origins.push({
          entityId: generatedCharacter.id,
          kind: 'CHARACTER',
          promotedAtTurn: state.turnIndex,
          reason: mutation.reasonCode,
        });
      }

      if (mutation.subjectId === 'player') {
        state.player.locationId = locationId;
        if (!state.discoveredLocationIds.includes(locationId)) {
          state.discoveredLocationIds.push(locationId);
        }
      } else {
        const character = state.characters.find((c) => c.characterId === mutation.subjectId);
        if (character) {
          character.locationId = locationId;
        } else if (generatedCharacter?.id === mutation.subjectId) {
          // A promoted NPC needs a runtime row as well as a definition, or
          // nothing in the engine can see them standing there.
          state.characters.push({
            characterId: mutation.subjectId,
            locationId,
            alive: true,
            health: null,
            statuses: [],
            revealedSecretIds: [],
            learnedFactIds: [],
          });
        }
      }
      return;
    }

    case 'TIME_ADVANCE': {
      state.worldMinute += Math.max(0, Math.trunc(num(p.minutes)));
      return;
    }

    case 'ABILITY_UNLOCK': {
      const abilityId = str(p.abilityId)!;
      if (!state.player.abilities.includes(abilityId)) state.player.abilities.push(abilityId);
      return;
    }

    case 'XP_DELTA': {
      state.player.xp = Math.max(0, state.player.xp + Math.trunc(num(p.amount)));
      return;
    }

    case 'LEVEL_CHANGE': {
      const milestone = str(p.milestoneId);
      if (milestone) {
        if (!state.player.milestones.includes(milestone)) state.player.milestones.push(milestone);
        return;
      }
      state.player.level = Math.max(1, Math.trunc(num(p.level, state.player.level)));
      return;
    }

    case 'FLAG_SET': {
      const flag = str(p.flag);
      if (!flag) return;
      const value = p.value;
      // `cooldown:<abilityId>` is a reserved flag namespace that writes to the
      // typed cooldown map instead of the free-form flag bag, so cooldowns stay
      // queryable without a second mutation type.
      if (flag.startsWith('cooldown:') && typeof value === 'number') {
        state.player.abilityCooldowns[flag.slice('cooldown:'.length)] = Math.trunc(value);
        return;
      }
      // `dead:<characterId>` is the other reserved namespace, and it exists
      // because nothing in the engine could previously make a character stop
      // being alive. `CharacterRuntimeState.alive` was in the schema, read in
      // three places, and never written — so an NPC the story needed in act
      // three was quietly immortal, which is the exact thing a game called
      // Plotbreak must not do. The mutation enum is fixed by the AI contract,
      // so death travels as a flag and lands on the typed field.
      if (flag.startsWith('dead:')) {
        const characterId = flag.slice('dead:'.length);
        const runtime = state.characters.find((c) => c.characterId === characterId);
        if (runtime) runtime.alive = value === false;
        state.flags[flag] = value !== false;
        return;
      }
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        state.flags[flag] = value;
      } else {
        state.flags[flag] = true;
      }
      return;
    }

    case 'ENCOUNTER_START': {
      const encounter = p.encounter;
      if (encounter && typeof encounter === 'object') {
        // Cloned, not aliased. Storing the payload object directly means every
        // later ENCOUNTER_UPDATE edits the mutation itself, so replaying the
        // same mutation list — which `projectState` and `commitTurn` both do —
        // compounds damage and silently kills the player.
        state.encounter = structuredClone(encounter) as GameState['encounter'];
      }
      return;
    }

    case 'ENCOUNTER_UPDATE': {
      if (!state.encounter) return;
      const participantId = str(p.participantId);
      if (participantId) {
        const participant = state.encounter.participants.find((x) => x.entityId === participantId);
        if (participant) {
          if (typeof p.healthDelta === 'number') {
            participant.health = Math.max(
              0,
              Math.min(participant.maxHealth, participant.health + Math.trunc(p.healthDelta)),
            );
            if (participant.health === 0) participant.downed = true;
          }
          const zoneId = str(p.zoneId);
          if (zoneId) participant.zoneId = zoneId;
          if (typeof p.downed === 'boolean') participant.downed = p.downed;
        }
      }
      if (typeof p.round === 'number') state.encounter.round = Math.trunc(p.round);
      const activeEntityId = str(p.activeEntityId);
      if (activeEntityId) state.encounter.activeEntityId = activeEntityId;
      return;
    }

    case 'ENCOUNTER_END': {
      state.encounter = null;
      return;
    }
  }
}

/**
 * Applies validated mutations to a copy of state and returns the new snapshot.
 * State is never mutated in place, so a failed turn cannot leave a half-written
 * world behind (spec §17.2).
 */
export function applyMutations(
  state: GameState,
  story: StoryVersion,
  mutations: readonly StateMutation[],
): GameState {
  const next = structuredClone(state);
  for (const mutation of mutations) applyOne(next, story, mutation);
  expireStatuses(next);
  return next;
}

/** Drops statuses whose expiry the world clock has passed. */
export function expireStatuses(state: GameState): void {
  const live = (s: StatusEffect): boolean =>
    s.expiresAtWorldMinute === null || s.expiresAtWorldMinute > state.worldMinute;
  state.player.statuses = state.player.statuses.filter(live);
  for (const character of state.characters) {
    character.statuses = character.statuses.filter(live);
  }
}

/** Spec §12.8 — resource regeneration, applied when world time advances. */
export function regenerateResources(
  state: GameState,
  story: StoryVersion,
  minutesElapsed: number,
): void {
  if (minutesElapsed <= 0) return;
  for (const resource of state.player.resources) {
    const def = story.resources.find((r) => r.id === resource.id);
    if (!def || def.regenPerHour === 0) continue;
    const gain = (def.regenPerHour * minutesElapsed) / 60;
    resource.current = Math.max(0, Math.min(resource.max, resource.current + gain));
    // Keep resources on integers so the HUD never shows 41.6 Mana.
    resource.current = Math.round(resource.current);
  }
}
