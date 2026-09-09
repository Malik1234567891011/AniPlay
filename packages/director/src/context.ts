import type {
  CharacterDef,
  GameState,
  IntentDialogue,
  MemoryFact,
  QualityTier,
  Resolution,
  StoryVersion,
  TurnRecord,
} from '@aniplay/contracts';
import { QUALITY_TIERS } from '@aniplay/contracts';
import {
  charactersPresent,
  formatWorldTime,
  relationshipLabel,
  topObjective,
  dayPart,
} from '@aniplay/engine';
import { lexicalSimilarity, retrieveMemories, type ScoredFact } from './memory.js';

/**
 * Spec §17.5 — the context budget.
 *
 * Never send full lifetime history. This assembles the nine layers the spec
 * lists, sized by quality tier, and hands the director structured state rather
 * than a wall of transcript. Summaries are never substituted for authoritative
 * inventory or quest state.
 */

export interface PresentCharacterContext {
  readonly def: CharacterDef;
  readonly relationshipLabel: string;
  readonly relationship: { trust: number; affection: number; respect: number; fear: number; rivalry: number };
  /** Only what this NPC could know — filtered before it ever reaches a prompt. */
  readonly knownMemories: ScoredFact[];
  readonly revealableSecrets: Array<{ id: string; fact: string }>;
  readonly openGates: string[];
}

export interface TurnContext {
  readonly story: StoryVersion;
  readonly state: GameState;
  readonly tier: QualityTier;

  // Layer 1 — immutable rules.
  readonly hardCanon: readonly string[];
  readonly toneGuide: string;

  // Layer 2 — the scene as it stands.
  readonly scene: {
    readonly locationId: string;
    readonly locationName: string;
    readonly locationDescription: string;
    readonly artDirection: string;
    readonly worldTimeLabel: string;
    readonly dayPart: string;
    readonly presentCharacterIds: readonly string[];
  };

  // Layer 3 — the player.
  readonly player: {
    readonly name: string;
    readonly pronouns: string;
    readonly about: string;
    /** The archetype's name, so the prose knows what kind of person this is. */
    readonly archetype: string | null;
    /** What the player wrote about how they look, if they wrote anything. */
    readonly appearance: string;
    /**
     * Every other setup answer, as question and answer in plain words.
     *
     * Option ids mean nothing to a writer, so a chosen option is resolved to
     * its label here. Without this the advanced questions were collected,
     * stored, and read by nothing.
     */
    readonly setupAnswers: ReadonlyArray<{ question: string; answer: string }>;
    readonly resources: Array<{ id: string; name: string; current: number; max: number; polarity: string }>;
    readonly statuses: string[];
    readonly inventoryNames: string[];
    readonly abilityNames: string[];
  };

  // Layer 4 — objectives and standing.
  readonly objective: string | null;
  readonly activeQuests: Array<{ id: string; title: string; step: string; directorNotes: string }>;
  readonly factions: Array<{ name: string; rank: string; reputation: number }>;

  // Layer 5 — who is on stage, and what they may know.
  readonly presentCharacters: readonly PresentCharacterContext[];

  // Layer 6 — the last few turns only.
  readonly recentTurns: readonly { actionText: string | null; sceneSummary: string }[];

  // Layer 7 — retrieved canon.
  readonly retrievedFacts: readonly ScoredFact[];

  // Layer 8 — arc and promises.
  readonly arc: {
    readonly episode: number;
    readonly pacingStage: string;
    readonly tension: number;
    readonly promises: Array<{ id: string; label: string; stage: string; seedHint: string; payoffHint: string; weight: number }>;
  };

  // Layer 9 — what the engine already decided.
  readonly resolution: Resolution;

  /** The player's own parsed speech, so the writer can open the beat with it. */
  readonly playerDialogue: readonly IntentDialogue[];

  /**
   * What the player actually typed, verbatim.
   *
   * The engine decides the outcome and the beat plan describes it, but neither
   * carries the specific thing the player did — so a beat written from the plan
   * alone reads as a reply to some generic attempt. "I hand Kael my acceptance
   * letter" came back as prose that never mentioned a letter. Untrusted input:
   * it reaches the model through the untrusted channel, never as instructions.
   */
  readonly playerAction: string;
}

export interface BuildContextOptions {
  readonly story: StoryVersion;
  readonly state: GameState;
  readonly resolution: Resolution;
  readonly tier: QualityTier;
  readonly memories: readonly MemoryFact[];
  readonly recentTurns: readonly TurnRecord[];
  readonly actionText: string;
  readonly playerDialogue?: readonly IntentDialogue[];
}

export function buildTurnContext(options: BuildContextOptions): TurnContext {
  const { story, state, resolution, tier, memories, recentTurns, actionText } = options;
  const config = QUALITY_TIERS[tier];

  const location = story.locations.find((l) => l.id === state.player.locationId);
  const present = charactersPresent(state);
  const presentIds = present.map((p) => p.characterId);

  // Entities in play this turn drive the overlap term in retrieval.
  const entityIds = [
    ...presentIds,
    state.player.locationId,
    ...resolution.mutations.map((m) => m.subjectId),
  ];

  const query = `${actionText} ${resolution.observableFacts.join(' ')}`;

  const retrievedFacts = retrieveMemories(
    memories,
    state,
    { text: query, entityIds, limit: config.memoryBudget },
    lexicalSimilarity,
  );

  const presentCharacters: PresentCharacterContext[] = present
    .map((runtime) => {
      const def = story.characters.find((c) => c.id === runtime.characterId);
      if (!def) return null;
      const rel = state.relationships.find((r) => r.characterId === def.id);
      const dimensions = {
        trust: rel?.trust ?? 0,
        affection: rel?.affection ?? 0,
        respect: rel?.respect ?? 0,
        fear: rel?.fear ?? 0,
        rivalry: rel?.rivalry ?? 0,
      };

      return {
        def,
        relationshipLabel: rel
          ? relationshipLabel(rel)
          : 'Wary',
        relationship: dimensions,
        // Per-NPC retrieval, filtered to their own knowledge scope.
        knownMemories: retrieveMemories(
          memories,
          state,
          { text: query, entityIds, limit: Math.max(2, Math.floor(config.memoryBudget / 2)), forCharacter: def },
          lexicalSimilarity,
        ),
        // A secret is only offered to the writer once its gate has opened.
        revealableSecrets: def.secrets
          .filter((secret) => runtime.revealedSecretIds.includes(secret.id))
          .map((secret) => ({ id: secret.id, fact: secret.fact })),
        openGates: rel?.unlockedGates ?? [],
      } satisfies PresentCharacterContext;
    })
    .filter((c): c is PresentCharacterContext => c !== null);

  const activeQuests = state.quests
    .filter((q) => q.status === 'ACTIVE' || q.status === 'BLOCKED')
    .map((progress) => {
      const def = story.quests.find((q) => q.id === progress.questId);
      const step = def?.steps.find((s) => s.id === progress.currentStepId);
      return {
        id: progress.questId,
        title: def?.title ?? progress.questId,
        step: step?.playerCopy ?? '',
        directorNotes: step?.directorNotes ?? '',
      };
    });

  const promises = state.arc.promises.map((p) => {
    const def = story.promises.find((d) => d.id === p.promiseId);
    return {
      id: p.promiseId,
      label: def?.label ?? p.promiseId,
      stage: p.stage,
      seedHint: def?.seedHint ?? '',
      payoffHint: def?.payoffHint ?? '',
      weight: def?.weight ?? 0.5,
    };
  });

  return {
    story,
    state,
    tier,
    hardCanon: story.rules.hardCanon,
    toneGuide: story.rules.toneGuide,
    scene: {
      locationId: state.player.locationId,
      locationName: location?.name ?? state.player.locationId,
      locationDescription: location?.description ?? '',
      artDirection: location?.artDirection ?? '',
      worldTimeLabel: formatWorldTime(state.worldMinute),
      dayPart: dayPart(state.worldMinute),
      presentCharacterIds: presentIds,
    },
    player: {
      name: state.player.identity.displayName,
      pronouns: state.player.identity.pronouns,
      about: state.player.identity.worldKnowsAboutYou,
      // Setup asks four questions and the screen promises the world will use
      // the answers. Only two of them were reaching the prose.
      archetype:
        story.archetypes.find((a) => a.id === state.player.identity.archetypeId)?.name ??
        state.player.identity.advanced.customArchetype ??
        null,
      appearance: state.player.identity.advanced.appearance ?? '',
      setupAnswers: Object.entries(state.player.identity.advanced)
        .filter(([id]) => id !== 'appearance' && id !== 'customArchetype')
        .flatMap(([id, value]) => {
          if (!value) return [];
          const field = story.setupFields.find((f) => f.id === id);
          if (!field) return [];
          const answer = field.options.find((o) => o.id === value)?.label ?? value;
          return [{ question: field.label, answer }];
        }),
      resources: state.player.resources.map((r) => {
        const def = story.resources.find((d) => d.id === r.id);
        return {
          id: r.id,
          name: def?.name ?? r.id,
          current: r.current,
          max: r.max,
          polarity: def?.polarity ?? 'GOOD_HIGH',
        };
      }),
      statuses: state.player.statuses.map((s) => s.label),
      inventoryNames: state.player.inventory.map(
        (e) => story.items.find((i) => i.id === e.itemId)?.name ?? e.itemId,
      ),
      abilityNames: state.player.abilities.map(
        (id) => story.abilities.find((a) => a.id === id)?.name ?? id,
      ),
    },
    objective: topObjective(state, story),
    activeQuests,
    factions: state.factions.map((f) => ({
      name: story.factions.find((d) => d.id === f.factionId)?.name ?? f.factionId,
      rank: f.rankLabel,
      reputation: f.reputation,
    })),
    presentCharacters,
    // Spec §17.5 layer 6 — the last 2–4 turns, never the whole history.
    recentTurns: recentTurns.slice(-4).map((t) => ({
      actionText: t.actionText,
      sceneSummary: t.sceneSummary,
    })),
    retrievedFacts,
    arc: {
      episode: state.arc.episode,
      pacingStage: state.arc.pacingStage,
      tension: state.arc.tensionScore,
      promises,
    },
    resolution,
    playerAction: actionText,
    playerDialogue: options.playerDialogue ?? [],
  };
}

/**
 * Rough token accounting so cost telemetry and the §17.5 budget can be enforced
 * without pulling in a tokenizer. Four characters per token is close enough for
 * budgeting decisions.
 */
export function estimateTokens(value: unknown): number {
  return Math.ceil(JSON.stringify(value).length / 4);
}
