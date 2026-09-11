import type {
  CharacterDef,
  GameState,
  RelationshipGate,
  RelationshipState,
  StoryVersion,
} from '@aniplay/contracts';
import { translate, type Locale } from '@aniplay/i18n';

/**
 * Spec §14 — relationship simulation.
 *
 * The AI may *propose* a delta. This module clamps and validates it. Nothing
 * else may write relationship numbers, which is what stops "she falls in love
 * with me" from being a valid move.
 */

export type RelationshipDimension = 'trust' | 'affection' | 'respect' | 'fear' | 'rivalry';

export const RELATIONSHIP_DIMENSIONS: readonly RelationshipDimension[] = [
  'trust',
  'affection',
  'respect',
  'fear',
  'rivalry',
];

/** `fear` and `rivalry` are 0..100; the rest are -100..100 (§14.1). */
export function dimensionBounds(dimension: RelationshipDimension): { min: number; max: number } {
  return dimension === 'fear' || dimension === 'rivalry'
    ? { min: 0, max: 100 }
    : { min: -100, max: 100 };
}

export type EventSeverity = 'MINOR' | 'NOTABLE' | 'MAJOR';

/**
 * Spec §14.2 — "a normal single exchange should rarely change a dimension by
 * more than 1–4 points. Major sacrifices/betrayals may change 8–20."
 */
export const SEVERITY_CAPS: Record<EventSeverity, number> = {
  MINOR: 2,
  NOTABLE: 4,
  MAJOR: 20,
};

export interface RelationshipDeltaProposal {
  readonly characterId: string;
  readonly dimension: RelationshipDimension;
  readonly delta: number;
  readonly severity: EventSeverity;
  readonly reasonCode: string;
}

export interface ClampedDelta {
  readonly characterId: string;
  readonly dimension: RelationshipDimension;
  readonly appliedDelta: number;
  readonly proposedDelta: number;
  readonly reasonCode: string;
  /** Set when the proposal was reduced, so the trace explains why. */
  readonly clampReason: string | null;
}

/**
 * Spec §14.2 recency dampening: a dimension already moved this turn or last
 * turn resists further movement, so a player cannot grind affection by
 * repeating the same flattery.
 */
function recencyFactor(state: GameState, characterId: string): number {
  const rel = state.relationships.find((r) => r.characterId === characterId);
  if (!rel) return 1;
  // A negative `lastChangedTurn` means the relationship has never moved, so the
  // first meaningful interaction of a session is not treated as a repeat.
  if (rel.lastChangedTurn < 0) return 1;
  const turnsSince = state.turnIndex - rel.lastChangedTurn;
  if (turnsSince >= 3) return 1;
  if (turnsSince === 2) return 0.75;
  if (turnsSince === 1) return 0.5;
  return 0.34;
}

/**
 * An NPC's own values resist changes that contradict them: someone whose stated
 * value is loyalty does not warm to a betrayal, however well phrased (§14.2).
 */
function valueAlignmentFactor(
  character: CharacterDef | undefined,
  dimension: RelationshipDimension,
  delta: number,
  reasonCode: string,
): number {
  if (!character) return 1;
  const reason = reasonCode.toLowerCase();
  const resistsWarmth =
    character.values.some((v) => /loyal|honest|duty|discipline/i.test(v)) &&
    /(deceive|lie|betray|threaten|steal)/.test(reason);
  if (resistsWarmth && delta > 0 && (dimension === 'trust' || dimension === 'affection')) return 0.25;

  const amplifiesFear =
    character.fears.length > 0 && dimension === 'fear' && /(threaten|attack|violence)/.test(reason);
  if (amplifiesFear && delta > 0) return 1.5;

  return 1;
}

/**
 * The only sanctioned path from a proposed delta to an applied one.
 * Returns the clamped value plus why it was clamped, for the debug trace.
 */
export function clampRelationshipDelta(
  state: GameState,
  story: StoryVersion,
  proposal: RelationshipDeltaProposal,
): ClampedDelta {
  const character = story.characters.find((c) => c.id === proposal.characterId);
  const current = state.relationships.find((r) => r.characterId === proposal.characterId);

  if (!character || !current) {
    return {
      characterId: proposal.characterId,
      dimension: proposal.dimension,
      appliedDelta: 0,
      proposedDelta: proposal.delta,
      reasonCode: proposal.reasonCode,
      clampReason: 'UNKNOWN_CHARACTER',
    };
  }

  const cap = SEVERITY_CAPS[proposal.severity];
  const reasons: string[] = [];

  let value = proposal.delta;
  if (Math.abs(value) > cap) {
    value = Math.sign(value) * cap;
    reasons.push(`severity cap ${proposal.severity} (±${cap})`);
  }

  const recency = recencyFactor(state, proposal.characterId);
  if (recency < 1) {
    value = value * recency;
    reasons.push(`recency dampening ×${recency}`);
  }

  const alignment = valueAlignmentFactor(character, proposal.dimension, value, proposal.reasonCode);
  if (alignment !== 1) {
    value = value * alignment;
    reasons.push(`NPC values ×${alignment}`);
  }

  // Round away from zero so a dampened-but-real change never silently vanishes.
  let applied = value === 0 ? 0 : Math.sign(value) * Math.max(1, Math.round(Math.abs(value)));

  const { min, max } = dimensionBounds(proposal.dimension);
  const next = current[proposal.dimension] + applied;
  if (next > max) {
    applied = max - current[proposal.dimension];
    reasons.push(`clamped at ${max}`);
  } else if (next < min) {
    applied = min - current[proposal.dimension];
    reasons.push(`clamped at ${min}`);
  }

  return {
    characterId: proposal.characterId,
    dimension: proposal.dimension,
    appliedDelta: applied,
    proposedDelta: proposal.delta,
    reasonCode: proposal.reasonCode,
    clampReason: reasons.length > 0 ? reasons.join('; ') : null,
  };
}

/**
 * Spec §11.5 — where a character sits on the ladder, as an **id**.
 *
 * Split from the wording, because `relationshipLabel` was being compared
 * against literal English in the director (`=== 'Rival'`) — which is a latent
 * bug in English too, and would have silently stopped working the moment the
 * label was translated.
 */
export type RelationshipTone =
  | 'AFRAID'
  | 'RIVAL'
  | 'HOSTILE'
  | 'DEVOTED'
  | 'CLOSE'
  | 'TRUSTED'
  | 'COMPLICATED'
  | 'RESPECTED'
  | 'COMPETITIVE'
  | 'WARM'
  | 'FAMILIAR'
  | 'WARY';

const RELATIONSHIP_KEY = {
  AFRAID: 'world.relationship.afraid',
  RIVAL: 'world.relationship.rival',
  HOSTILE: 'world.relationship.hostile',
  DEVOTED: 'world.relationship.devoted',
  CLOSE: 'world.relationship.close',
  TRUSTED: 'world.relationship.trusted',
  COMPLICATED: 'world.relationship.complicated',
  RESPECTED: 'world.relationship.respected',
  COMPETITIVE: 'world.relationship.competitive',
  WARM: 'world.relationship.warm',
  FAMILIAR: 'world.relationship.familiar',
  WARY: 'world.relationship.wary',
} as const;

export function relationshipTone(rel: RelationshipState): RelationshipTone {
  if (rel.fear >= 55 && rel.fear > rel.affection) return 'AFRAID';
  if (rel.rivalry >= 50 && rel.rivalry > rel.affection) return 'RIVAL';
  if (rel.trust <= -30 || rel.affection <= -30) return 'HOSTILE';
  if (rel.affection >= 70 && rel.trust >= 50) return 'DEVOTED';
  if (rel.affection >= 45 && rel.trust >= 30) return 'CLOSE';
  if (rel.trust >= 40) return 'TRUSTED';

  // The interesting shapes below the top of the ladder, which a single
  // catch-all used to flatten. Four people the player feels four different ways
  // about all read "Familiar", on the panel that exists to tell them apart.
  //
  // Liked without being trusted is the specific state a lot of this product is
  // about, so it gets its own word.
  if (rel.affection >= 35 && rel.trust < 30) return 'COMPLICATED';
  if (rel.respect >= 40 && rel.affection < 35) return 'RESPECTED';
  if (rel.rivalry >= 25 && rel.rivalry > rel.trust) return 'COMPETITIVE';
  if (rel.affection >= 20) return 'WARM';
  if (rel.trust >= 10 || rel.affection >= 10) return 'FAMILIAR';
  return 'WARY';
}

/**
 * The qualitative label shown by default. Underlying numbers stay hidden
 * unless the player enables advanced stats.
 *
 * Shown in the UI **and** injected into the writer prompt, which is why it is
 * rendered in the session's locale here rather than sent to the client as a
 * key: an English `Trusted` inside a French context window is drift.
 */
export function relationshipLabel(rel: RelationshipState, locale: Locale = 'en'): string {
  return translate(locale, RELATIONSHIP_KEY[relationshipTone(rel)]);
}

/** All labels the UI may render, so legends and filters stay in sync. */
export const RELATIONSHIP_LABELS = [
  'Wary',
  'Familiar',
  'Warm',
  'Competitive',
  'Respected',
  'Complicated',
  'Trusted',
  'Close',
  'Devoted',
  'Rival',
  'Afraid',
  'Hostile',
] as const;

/**
 * Spec §14.3 — gates are predicates, not persuasion. The writer cannot open one
 * by asserting it happened.
 */
export function isGateSatisfied(
  gate: RelationshipGate,
  rel: RelationshipState,
  state: GameState,
): boolean {
  const req = gate.requires;
  for (const dimension of RELATIONSHIP_DIMENSIONS) {
    const threshold = req[dimension];
    if (threshold !== undefined && rel[dimension] < threshold) return false;
  }
  for (const eventId of req.completedEvents) {
    if (!state.completedEventIds.includes(eventId)) return false;
  }
  for (const flag of req.flagsSet) {
    if (!state.flags[flag]) return false;
  }
  for (const flag of req.flagsUnset) {
    if (state.flags[flag]) return false;
  }
  for (const itemId of req.hasItems) {
    if (!state.player.inventory.some((entry) => entry.itemId === itemId && entry.quantity > 0)) {
      return false;
    }
  }
  return true;
}

export function evaluateGates(
  state: GameState,
  story: StoryVersion,
): Array<{ characterId: string; gateId: string; label: string }> {
  const newlyOpen: Array<{ characterId: string; gateId: string; label: string }> = [];
  for (const character of story.characters) {
    const rel = state.relationships.find((r) => r.characterId === character.id);
    if (!rel) continue;
    for (const gate of character.gates) {
      if (rel.unlockedGates.includes(gate.id)) continue;
      if (isGateSatisfied(gate, rel, state)) {
        newlyOpen.push({ characterId: character.id, gateId: gate.id, label: gate.label });
      }
    }
  }
  return newlyOpen;
}

/**
 * Spec §14.5 — filters facts to what this NPC could actually know, before any
 * of them reach a prompt. The model cannot leak what it was never given.
 */
export function canCharacterKnow(
  character: CharacterDef,
  characterState: { revealedSecretIds: string[]; learnedFactIds: string[] } | undefined,
  fact: { factId: string; subjectId: string; visibility: string },
  playerFactionIds: readonly string[] = [],
): boolean {
  switch (fact.visibility) {
    case 'WORLD_PUBLIC':
      return true;
    case 'CREATOR_ONLY':
      return false;
    case 'PLAYER_PRIVATE':
      return false;
    case 'NPC_PRIVATE':
      // Their own private matter, or something they were explicitly told.
      return fact.subjectId === character.id || !!characterState?.learnedFactIds.includes(fact.factId);
    case 'PAIR_PRIVATE':
      return fact.subjectId === character.id || !!characterState?.learnedFactIds.includes(fact.factId);
    case 'PARTY':
      return !!characterState?.learnedFactIds.includes(fact.factId);
    case 'FACTION':
      return (
        playerFactionIds.length > 0 &&
        character.knowledgeScope.some((scope) => playerFactionIds.includes(scope))
      );
    default:
      return false;
  }
}
