import { abilityEffect, archetypeGrants } from '@aniplay/contracts';
import type {
  ContinueCard,
  GameEvent,
  GameState,
  MemoryFact,
  PlayerTurnRecord,
  SessionSceneState,
  SessionSummary,
  StoryDetailResponse,
  StorySummary,
  StoryVersion,
  TimelineEntry,
  TurnRecord,
  WorldSheetResponse,
} from '@aniplay/contracts';
import {
  attributeModifier,
  charactersPresent,
  composeStory,
  crewRoster,
  dcBandLabel,
  formatCheckMath,
  formatDeadline,
  formatWorldTime,
  proficiencyLabel,
  relationshipLabel,
  topObjective,
  dayNumber,
} from '@aniplay/engine';
import { translatorFor, type Locale, type TranslationKey, type Translator } from '@aniplay/i18n';
import type { SessionRecord, StorySignals } from './repo/types.js';

/**
 * Read models. Authoritative state lives in `GameState`; these shape it into
 * exactly what a screen needs, so the client never has to derive game rules.
 */

/**
 * Stories reference art by asset key ("ninth-archive/cover"), not by URL, so the
 * same world can be served from any CDN. This resolves a key against the
 * configured media host and returns null when there is none — the client then
 * renders its deterministic placeholder rather than a broken image box.
 */
export function resolveAssetUrl(key: string | null): string | null {
  if (!key) return null;
  if (/^https?:\/\//.test(key)) return key;
  const base = process.env.MEDIA_CDN_BASE_URL;
  return base ? `${base.replace(/\/$/, '')}/${key}` : null;
}

/**
 * Plain-language attribute copy for the World Sheet (spec §11.2).
 *
 * Was a table of English sentences, which is one of the two reasons a
 * fully-translated client would still have shown `Might — Force, endurance, and
 * raw physical power.` to a French player (`UI_AUDIT.md` §5). Now a table of
 * catalogue keys, rendered in the **run's** locale — the World Sheet is a view
 * of one run, and a run's language is frozen.
 *
 * An attribute key the catalogue does not know still falls back to the raw id,
 * exactly as before.
 */
const ATTRIBUTE_KEYS: Record<string, { name: TranslationKey; plain: TranslationKey }> = {
  might: { name: 'world.attr.might.name', plain: 'world.attr.might.plain' },
  agility: { name: 'world.attr.agility.name', plain: 'world.attr.agility.plain' },
  mind: { name: 'world.attr.mind.name', plain: 'world.attr.mind.plain' },
  presence: { name: 'world.attr.presence.name', plain: 'world.attr.presence.plain' },
  resolve: { name: 'world.attr.resolve.name', plain: 'world.attr.resolve.plain' },
  arcana: { name: 'world.attr.arcana.name', plain: 'world.attr.arcana.plain' },
};

function attributeName(key: string, t: Translator): string {
  const entry = ATTRIBUTE_KEYS[key];
  return entry ? t(entry.name) : key;
}

function attributePlain(key: string, t: Translator): string {
  const entry = ATTRIBUTE_KEYS[key];
  return entry ? t(entry.plain) : '';
}

export function toStorySummary(
  story: StoryVersion,
  signals: StorySignals,
  saved: boolean,
): StorySummary {
  const badges: Array<'NEW' | 'TRENDING' | 'OFFICIAL'> = [];
  if (story.official) badges.push('OFFICIAL');
  if (signals.runs > 5000) badges.push('TRENDING');

  return {
    storyId: story.storyId,
    storyVersionId: story.id,
    title: story.title,
    fantasyLabel: story.fantasyLabel,
    hook: story.hook,
    creatorName: story.creatorName,
    official: story.official,
    coverImage: resolveAssetUrl(story.coverImage),
    keyArt: resolveAssetUrl(story.keyArt),
    tags: story.tags,
    mechanicsChips: story.mechanicsChips,
    contentDescriptors: story.contentDescriptors,
    intensity: story.intensity,
    runs: signals.runs,
    likes: signals.likes,
    saved,
    badges,
    updatedAt: story.publishedAt ?? new Date().toISOString(),
  };
}

export function toStoryDetail(
  story: StoryVersion,
  signals: StorySignals,
  saved: boolean,
  related: StorySummary[],
  activeSessionId: string | null,
): StoryDetailResponse {
  return {
    story: toStorySummary(story, signals, saved),
    premise: story.premise,
    creatorNote: story.creatorNote,
    opening: story.opening,
    // Spec §8.2 item 9 — public traits only. Hidden drives never ship to a client.
    cast: story.characters.map((c) => ({
      id: c.id,
      name: c.name,
      role: c.role,
      // The blurb leads on the card; the role stays available underneath it.
      cardBlurb: c.cardBlurb,
      portrait: resolveAssetUrl(c.portrait),
      publicTraits: c.publicTraits,
      pronouns: c.pronouns,
      appearance: c.appearance,
    })),
    stats: {
      runs: signals.runs,
      medianDepthLabel: story.quests.length > 3 ? 'Open-ended' : 'Episodic',
      intensity: story.intensity,
      updatedAt: story.publishedAt ?? new Date().toISOString(),
    },
    related,
    activeSessionId,
    setupFields: story.setupFields,
    // What each option gives you is derived from the option, never restated by
    // hand, so the card cannot drift away from the stat block it describes.
    archetypes: story.archetypes.map((archetype) => ({
      ...archetype,
      grants: archetypeGrants(story, archetype),
    })),
  };
}

export function toSessionSummary(record: SessionRecord, story: StoryVersion, state: GameState, turnCount: number): SessionSummary {
  return {
    sessionId: record.sessionId,
    storyId: record.storyId,
    storyVersionId: record.storyVersionId,
    title: story.title,
    coverImage: resolveAssetUrl(story.coverImage),
    revision: state.revision,
    turnCount,
    status: record.status,
    createdAt: record.createdAt,
    lastPlayedAt: record.lastPlayedAt,
    displayName: record.displayName,
    forkedFromSessionId: record.forkedFromSessionId,
    forkedAtTurnIndex: record.forkedAtTurnIndex,
    // From the state, never from the session row or the request. The run's
    // locale was frozen when it was created and this is the copy that froze.
    locale: state.locale,
  };
}

export function toSceneState(rawStory: StoryVersion, state: GameState): SessionSceneState {
  // Spec §11.9 — the client sees the composed world, or a player standing in a
  // place they made turns into a raw id on the HUD.
  const story = composeStory(rawStory, state);
  const location = story.locations.find((l) => l.id === state.player.locationId);

  return {
    locationId: state.player.locationId,
    locationName: location?.name ?? state.player.locationId,
    stageImage: resolveAssetUrl(location?.stageImage ?? null),
    worldTimeLabel: formatWorldTime(state.worldMinute, state.locale),
    worldMinute: state.worldMinute,
    dayNumber: dayNumber(state.worldMinute),
    // Everybody who is actually here.
    //
    // This used to be capped at three, because §10.2 B says the stage carries
    // at most three portraits — but that is a rule about the portrait row, not
    // about what the client is allowed to know. Kosei's gym holds six people,
    // so the coach could speak, legitimately, and the client could not resolve
    // her name or face for the dialogue block because she was fourth in a list
    // of three. The cap now lives where the portraits are drawn.
    presentCharacters: charactersPresent(state)
      .map((runtime) => {
        const def = story.characters.find((c) => c.id === runtime.characterId);
        if (!def) return null;
        return {
          id: def.id,
          name: def.name,
          portrait: resolveAssetUrl(def.portrait),
          expression: 'neutral',
          speaking: false,
          reactionUrl: null,
          reactionEmotion: null,
        };
      })
      .filter((c): c is NonNullable<typeof c> => c !== null),
    objective: topObjective(state, story),
    resources: visibleResources(story, state),
    encounter: state.encounter,
    contest: state.contest,
    // Whoever is sailing with the player, in the order they came aboard.
    crew: crewRoster(state, story).map((member) => ({
      id: member.def.id,
      name: member.def.name,
      station: member.companion.station,
      mood: member.moodLabel,
      portrait: resolveAssetUrl(member.def.portrait),
    })),
  };
}

/** Spec §12.8 — 1–4 visible resources in normal UI, by display priority. */
function visibleResources(story: StoryVersion, state: GameState): SessionSceneState['resources'] {
  return state.player.resources
    .map((r) => {
      const def = story.resources.find((d) => d.id === r.id);
      if (!def || !def.visible) return null;
      return {
        id: r.id,
        name: def.name,
        current: r.current,
        max: r.max,
        start: def.start,
        color: def.color,
        polarity: def.polarity,
        priority: def.displayPriority,
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 4)
    .map(({ priority: _priority, ...rest }) => rest);
}

export function toWorldSheet(
  story: StoryVersion,
  state: GameState,
  memories: readonly MemoryFact[],
  events: readonly GameEvent[],
  showAdvancedRelationshipStats: boolean,
): WorldSheetResponse {
  const location = story.locations.find((l) => l.id === state.player.locationId);
  // The run's locale, frozen at creation — not the interface's. This sheet
  // describes one run, and its numbers and names are the ones the writer is
  // already using.
  const t = translatorFor(state.locale);

  return {
    overview: {
      locationName: location?.name ?? state.player.locationId,
      worldTimeLabel: formatWorldTime(state.worldMinute, state.locale),
      chapterLabel: `Episode ${state.arc.episode}`,
      topObjective: topObjective(state, story),
      resources: visibleResources(story, state),
      statuses: state.player.statuses,
      relationshipHighlights: [...state.relationships]
        .filter((r) => r.lastChangedTurn >= 0)
        .sort((a, b) => b.lastChangedTurn - a.lastChangedTurn)
        .slice(0, 3)
        .map((r) => ({
          characterId: r.characterId,
          name: story.characters.find((c) => c.id === r.characterId)?.name ?? r.characterId,
          label: relationshipLabel(r, state.locale),
        })),
      recentEvents: memories
        .filter((f) => f.supersededByFactId === null)
        .slice(-5)
        .map((f) => f.text),
    },

    character: {
      identity: state.player.identity,
      level: state.player.level,
      xp: state.player.xp,
      progressionMode: story.rules.progressionMode,
      milestones: state.player.milestones,
      attributes: Object.entries(state.player.attributes).map(([key, value]) => ({
        key,
        name: attributeName(key, t),
        value,
        modifier: attributeModifier(value),
        plainLanguage: attributePlain(key, t),
      })),
      skills: story.skills.map((skill) => ({
        id: skill.id,
        name: skill.name,
        attribute: attributeName(skill.attribute, t),
        proficiency: state.player.skills[skill.id] ?? 0,
        proficiencyLabel: proficiencyLabel(state.player.skills[skill.id] ?? 0, state.locale),
      })),
      abilities: state.player.abilities
        .map((id) => {
          const def = story.abilities.find((a) => a.id === id);
          if (!def) return null;
          const cooldownUntil = state.player.abilityCooldowns[id] ?? 0;
          return {
            id: def.id,
            name: def.name,
            effect: abilityEffect(story, def),
            description: def.description,
            costLabel: def.costs
              .map((c) => `${c.amount} ${story.resources.find((r) => r.id === c.resourceId)?.name ?? c.resourceId}`)
              .join(' · '),
            cooldownRemaining: Math.max(0, cooldownUntil - state.worldMinute),
          };
        })
        .filter((a): a is NonNullable<typeof a> => a !== null),
      statuses: state.player.statuses,
      factions: state.factions.map((f) => ({
        factionId: f.factionId,
        name: story.factions.find((d) => d.id === f.factionId)?.name ?? f.factionId,
        reputation: f.reputation,
        rankLabel: f.rankLabel,
      })),
      canonFacts: memories
        .filter((f) => f.supersededByFactId === null && (f.pinned || f.importance >= 0.7))
        .map((f) => f.text)
        .slice(0, 12),
    },

    inventory: state.player.inventory
      .map((entry) => {
        const def = story.items.find((i) => i.id === entry.itemId);
        if (!def) return null;
        const effects: string[] = [];
        for (const [key, value] of Object.entries(def.attributeModifiers)) {
          effects.push(`${value > 0 ? '+' : ''}${value} ${attributeName(key, t)}`);
        }
        for (const [skillId, value] of Object.entries(def.skillModifiers)) {
          const name = story.skills.find((s) => s.id === skillId)?.name ?? skillId;
          effects.push(`${value > 0 ? '+' : ''}${value} ${name}`);
        }
        if (def.consumable) {
          const resource = story.resources.find((r) => r.id === def.consumable!.resourceId);
          effects.push(`Restores ${def.consumable.amount} ${resource?.name ?? def.consumable.resourceId}`);
        }
        return {
          entryId: entry.entryId,
          itemId: entry.itemId,
          name: entry.instanceName ?? def.name,
          quantity: entry.quantity,
          equipped: entry.equipped,
          equipSlot: def.equipSlot,
          rarity: def.rarity,
          icon: def.icon,
          effects,
          description: def.description,
          loreText: def.loreText,
          canUse: def.consumable !== null,
          canEquip: def.equipSlot !== null,
        };
      })
      .filter((i): i is NonNullable<typeof i> => i !== null),

    quests: state.quests
      .filter((p) => p.status !== 'UNAVAILABLE')
      .map((progress) => {
        const def = story.quests.find((q) => q.id === progress.questId);
        if (!def) return null;
        const step = def.steps.find((s) => s.id === progress.currentStepId);
        return {
          questId: def.id,
          title: def.title,
          summary: def.summary,
          status: progress.status,
          // Spec §11.4 — mystery worlds may hide steps the player has not reached.
          currentStepCopy: step && !step.hiddenUntilEntered ? step.playerCopy : null,
          deadlineLabel: formatDeadline(state.worldMinute, step?.deadlineWorldMinute ?? null, state.locale),
          rewardCopy: def.knownRewardCopy,
          involvedNames: def.involvedCharacterIds.map(
            (id) => story.characters.find((c) => c.id === id)?.name ?? id,
          ),
        };
      })
      .filter((q): q is NonNullable<typeof q> => q !== null),

    // Spec §11.5 — sorted by recent relevance, not by highest romance.
    relationships: [...state.relationships]
      .sort((a, b) => b.lastChangedTurn - a.lastChangedTurn)
      .map((rel) => {
        const def = story.characters.find((c) => c.id === rel.characterId);
        return {
          characterId: rel.characterId,
          name: def?.name ?? rel.characterId,
          portrait: resolveAssetUrl(def?.portrait ?? null),
          label: relationshipLabel(rel, state.locale),
          lastInteractionTurn: rel.lastChangedTurn,
          // Numbers are sent only when the player asked to see them.
          dimensions: showAdvancedRelationshipStats
            ? {
                trust: rel.trust,
                affection: rel.affection,
                respect: rel.respect,
                fear: rel.fear,
                rivalry: rel.rivalry,
              }
            : { trust: 0, affection: 0, respect: 0, fear: 0, rivalry: 0 },
        };
      }),

    map: {
      currentLocationId: state.player.locationId,
      nodes: story.locations
        .filter((l) => state.discoveredLocationIds.includes(l.id))
        .map((l) => {
          const here = story.locations.find((x) => x.id === state.player.locationId);
          const edge = here?.connections.find((c) => c.to === l.id);
          const locked = !!edge?.lockedByFlag && !state.flags[edge.lockedByFlag];
          return {
            id: l.id,
            name: l.name,
            discovered: true,
            current: l.id === state.player.locationId,
            hasQuest: state.quests.some(
              (p) =>
                (p.status === 'ACTIVE' || p.status === 'BLOCKED') &&
                story.quests.find((q) => q.id === p.questId)?.involvedLocationIds.includes(l.id),
            ),
            locked,
            lockReason: locked ? 'Closed to you for now.' : null,
            travelMinutes: edge?.travelMinutes ?? null,
            position: l.mapPosition,
          };
        }),
      edges: story.locations
        .filter((l) => state.discoveredLocationIds.includes(l.id))
        .flatMap((l) =>
          l.connections
            .filter((c) => state.discoveredLocationIds.includes(c.to))
            .map((c) => ({ from: l.id, to: c.to })),
        ),
    },
  };
}

/** Spec §11.7 — the canon memory inspector, grouped and chronological. */
export function toTimeline(
  story: StoryVersion,
  events: readonly GameEvent[],
  memories: readonly MemoryFact[],
  turns: readonly TurnRecord[],
  /** The run's locale. Defaulted so a caller that has not been given one behaves as before. */
  locale: Locale = 'en',
): TimelineEntry[] {
  const entries: TimelineEntry[] = [];

  for (const fact of memories) {
    if (fact.supersededByFactId !== null) continue;
    entries.push({
      id: fact.factId,
      group: 'CANON',
      turnIndex: fact.createdAtTurn,
      worldTimeLabel: formatWorldTime(fact.createdAtWorldMinute, locale),
      text: fact.text,
      pinned: fact.pinned,
      // Only generated canon is correctable; engine events are not opinions.
      correctable: true,
      forkable: false,
    });
  }

  for (const event of events) {
    const group = groupForEvent(event.type);
    if (!group) continue;
    entries.push({
      id: event.eventId,
      group,
      turnIndex: turns.find((t) => t.turnId === event.turnId)?.turnIndex ?? 0,
      worldTimeLabel: formatWorldTime(event.worldMinute, locale),
      text: describeEvent(story, event),
      pinned: false,
      correctable: false,
      forkable: true,
    });
  }

  for (const turn of turns) {
    if (!turn.actionText) continue;
    entries.push({
      id: `turn_${turn.turnId}`,
      group: 'CHOICE',
      turnIndex: turn.turnIndex,
      worldTimeLabel: '',
      text: turn.actionText,
      pinned: false,
      correctable: false,
      forkable: true,
    });
  }

  return entries.sort((a, b) => a.turnIndex - b.turnIndex || a.id.localeCompare(b.id));
}

function groupForEvent(type: string): TimelineEntry['group'] | null {
  switch (type) {
    case 'QUEST_TRANSITION':
      return 'QUEST';
    case 'RELATIONSHIP_DELTA':
      return 'RELATIONSHIP';
    case 'ITEM_ADD':
    case 'ITEM_REMOVE':
    case 'ABILITY_UNLOCK':
      return 'ITEM';
    case 'LOCATION_CHANGE':
    case 'ENCOUNTER_START':
    case 'ENCOUNTER_END':
    case 'LEVEL_CHANGE':
      return 'WORLD';
    default:
      return null;
  }
}

function describeEvent(story: StoryVersion, event: GameEvent): string {
  const p = event.payload as Record<string, unknown>;
  switch (event.type) {
    case 'QUEST_TRANSITION': {
      const quest = story.quests.find((q) => q.id === event.subjectId);
      return `${quest?.title ?? event.subjectId} → ${String(p.to ?? p.status ?? 'updated')}`;
    }
    case 'RELATIONSHIP_DELTA': {
      const character = story.characters.find((c) => c.id === event.subjectId);
      const amount = Number(p.amount ?? 0);
      return `${character?.name ?? event.subjectId}: ${String(p.dimension)} ${amount > 0 ? '+' : ''}${amount}`;
    }
    case 'ITEM_ADD':
    case 'ITEM_REMOVE': {
      const item = story.items.find((i) => i.id === p.itemId);
      return `${event.type === 'ITEM_ADD' ? 'Gained' : 'Lost'} ${item?.name ?? String(p.itemId)}`;
    }
    case 'LOCATION_CHANGE': {
      const location = story.locations.find((l) => l.id === p.locationId);
      return `Moved to ${location?.name ?? String(p.locationId)}`;
    }
    case 'ABILITY_UNLOCK': {
      const ability = story.abilities.find((a) => a.id === p.abilityId);
      return `Learned ${ability?.name ?? String(p.abilityId)}`;
    }
    case 'ENCOUNTER_START':
      return 'A fight began';
    case 'ENCOUNTER_END':
      return 'The fight ended';
    case 'LEVEL_CHANGE':
      return p.milestoneId ? `Milestone: ${String(p.milestoneId)}` : `Reached level ${String(p.level)}`;
    default:
      return event.type;
  }
}

export function toContinueCard(
  record: SessionRecord,
  story: StoryVersion,
  state: GameState,
  turns: readonly TurnRecord[],
): ContinueCard {
  return {
    sessionId: record.sessionId,
    storyId: record.storyId,
    title: story.title,
    coverImage: resolveAssetUrl(story.coverImage),
    lastPlayedAt: record.lastPlayedAt,
    turnCount: turns.length,
    currentObjective: topObjective(state, story),
    recapLine: turns.at(-1)?.sceneSummary.split('\n')[0] ?? null,
  };
}

/**
 * Spec §12.7 — a committed turn as its player is allowed to see it.
 *
 * The stored `TurnRecord` is the engine's own record: exact DC, every die,
 * the modifier, the margin, the raw mutation list, and the repair violations
 * the contract itself marks as creator/debug trace. Handing all of that to the
 * client turns a world that hides its numbers into one that merely declines to
 * draw them on screen. This is the projection that actually withholds them.
 */
export function toPlayerTurn(
  story: StoryVersion,
  turn: TurnRecord,
  /** The run's locale. Defaulted so a caller that has not been given one behaves as before. */
  locale: Locale = 'en',
): PlayerTurnRecord {
  return {
    turnId: turn.turnId,
    sessionId: turn.sessionId,
    turnIndex: turn.turnIndex,
    actionText: turn.actionText,
    qualityTier: turn.qualityTier,
    creditsCharged: turn.creditsCharged,
    sceneSummary: turn.sceneSummary,
    blocks: turn.blocks,
    checks: turn.checks.map((check) => ({
      checkId: check.checkId,
      label: check.label,
      attribute: check.attribute,
      skill: check.skill ?? null,
      outcome: check.outcome,
      // Always allowed: a band is a feeling, not a target number.
      difficultyLabel: dcBandLabel(check.dc, locale),
      dc: story.rules.revealExactDc ? check.dc : null,
      math: story.rules.revealCheckMath ? formatCheckMath(check) : null,
    })),
    stateDeltas: turn.stateDeltas,
    suggestions: turn.suggestions,
    endStatePrompt: turn.endStatePrompt,
    heroImageUrl: turn.heroImageUrl,
    revisionAfter: turn.revisionAfter,
    createdAt: turn.createdAt,
  };
}
