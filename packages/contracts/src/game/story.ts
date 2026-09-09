import { z } from 'zod';
import { FactVisibility } from '../ai/primitives.js';

/**
 * The authored story definition. A published `StoryVersion` is immutable
 * (spec §31.6) and every session pins the version it started on (§35.3).
 */

/** Spec §12.2 — the six universal attributes, base range 3–18. */
export const ATTRIBUTE_KEYS = [
  'might',
  'agility',
  'mind',
  'presence',
  'resolve',
  'arcana',
] as const;
export const AttributeKey = z.enum(ATTRIBUTE_KEYS);
export type AttributeKey = z.infer<typeof AttributeKey>;

export const AttributeBlock = z.record(AttributeKey, z.number().int().min(1).max(30));
export type AttributeBlock = Record<AttributeKey, number>;

/** Spec §12.4 — proficiency 0 Untrained … 5 Legendary. */
export const SkillDef = z
  .object({
    id: z.string(),
    name: z.string(),
    attribute: AttributeKey,
    description: z.string(),
  })
  .strict();
export type SkillDef = z.infer<typeof SkillDef>;

export const ResourceDef = z
  .object({
    id: z.string(),
    name: z.string(),
    max: z.number().int().min(1),
    start: z.number().int().min(0),
    /** Per-hour of world time. Spec §12.8 regeneration rule. */
    regenPerHour: z.number().default(0),
    /** Ascending resources (Suspicion, Heat) are bad when high. */
    polarity: z.enum(['GOOD_HIGH', 'GOOD_LOW']).default('GOOD_HIGH'),
    displayPriority: z.number().int().min(1).max(9).default(5),
    /** Shown in the compact session HUD. Spec §12.8: 1–4 visible resources max. */
    visible: z.boolean().default(true),
    zeroStateConsequence: z.string().nullable().default(null),
    color: z.string().nullable().default(null),
  })
  .strict();
export type ResourceDef = z.infer<typeof ResourceDef>;

export const ItemDef = z
  .object({
    id: z.string(),
    name: z.string(),
    tags: z.array(z.string()).default([]),
    stackable: z.boolean().default(false),
    maxStack: z.number().int().min(1).default(1),
    equipSlot: z.string().nullable().default(null),
    /** Applied while equipped. Spec §12.9 stat modifiers. */
    attributeModifiers: z.record(AttributeKey, z.number().int()).default({}),
    skillModifiers: z.record(z.string(), z.number().int()).default({}),
    consumable: z
      .object({
        resourceId: z.string(),
        amount: z.number().int(),
        consumesItem: z.boolean().default(true),
      })
      .strict()
      .nullable()
      .default(null),
    questItem: z.boolean().default(false),
    droppable: z.boolean().default(true),
    rarity: z.string().nullable().default(null),
    description: z.string().default(''),
    loreText: z.string().default(''),
    icon: z.string().nullable().default(null),
  })
  .strict();
export type ItemDef = z.infer<typeof ItemDef>;

export const AbilityDef = z
  .object({
    id: z.string(),
    name: z.string(),
    tags: z.array(z.string()).default([]),
    description: z.string(),
    /** Narrative phrasings the parser can match freeform text against. Spec §12.10. */
    affordances: z.array(z.string()).default([]),
    costs: z.array(z.object({ resourceId: z.string(), amount: z.number().int() }).strict()).default([]),
    cooldownMinutes: z.number().int().min(0).default(0),
    targetRule: z.enum(['SELF', 'SINGLE', 'MULTI', 'AREA', 'NONE']).default('SINGLE'),
    /** Ability resolves as a check unless this is null (then it is deterministic). */
    check: z
      .object({
        attribute: AttributeKey,
        skillId: z.string().nullable().default(null),
        baseDc: z.number().int(),
      })
      .strict()
      .nullable()
      .default(null),
    unlockedByDefault: z.boolean().default(false),
  })
  .strict();
export type AbilityDef = z.infer<typeof AbilityDef>;

export const LocationDef = z
  .object({
    id: z.string(),
    name: z.string(),
    shortName: z.string().default(''),
    description: z.string(),
    /** Fed to the image prompt composer. Spec §19.3 location consistency. */
    artDirection: z.string().default(''),
    stageImage: z.string().nullable().default(null),
    /** 2D node map edges. Spec §11.6. */
    connections: z
      .array(
        z
          .object({
            to: z.string(),
            travelMinutes: z.number().int().min(0),
            lockedByFlag: z.string().nullable().default(null),
            label: z.string().default(''),
          })
          .strict(),
      )
      .default([]),
    discoveredByDefault: z.boolean().default(false),
    mapPosition: z.object({ x: z.number(), y: z.number() }).strict().default({ x: 0, y: 0 }),
    ambientSfx: z.array(z.string()).default([]),
  })
  .strict();
export type LocationDef = z.infer<typeof LocationDef>;

/** Spec §14.6 — deterministic NPC time blocks, so "find Mira at the archive" means something. */
export const ScheduleBlock = z
  .object({
    startMinute: z.number().int().min(0).max(1439),
    endMinute: z.number().int().min(0).max(1440),
    locationId: z.string(),
    activity: z.string(),
  })
  .strict();
export type ScheduleBlock = z.infer<typeof ScheduleBlock>;

/** Spec §14.3 — relationship outcomes gate on predicates, not one-turn persuasion. */
export const RelationshipGate = z
  .object({
    id: z.string(),
    label: z.string(),
    /**
     * What the gate permits. The consistency validator keys off this rather than
     * the gate's id, so protection does not depend on how a creator named it.
     */
    kind: z.enum(['ROMANCE', 'TRUST', 'ALLIANCE', 'OTHER']).default('OTHER'),
    requires: z
      .object({
        trust: z.number().int().optional(),
        affection: z.number().int().optional(),
        respect: z.number().int().optional(),
        fear: z.number().int().optional(),
        rivalry: z.number().int().optional(),
        completedEvents: z.array(z.string()).default([]),
        flagsSet: z.array(z.string()).default([]),
        flagsUnset: z.array(z.string()).default([]),
      })
      .strict(),
  })
  .strict();
export type RelationshipGate = z.infer<typeof RelationshipGate>;

/** Spec §14.4 — structured NPC contract. Deliberately not one giant prose prompt. */
export const CharacterDef = z
  .object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    /**
     * One line for the cast carousel: what this person does *to the player's
     * situation*, not their job title.
     *
     * "Archive assistant, third year" tells a new player nothing about why they
     * should care. "The archivist who covers for you at the gate, and clearly
     * knows more than she is saying" tells them the story function and the hook
     * in the same breath — without spoiling anything they should discover.
     */
    cardBlurb: z.string().default(''),
    pronouns: z.string().default('they/them'),
    publicTraits: z.array(z.string()).default([]),
    hiddenDrives: z.array(z.string()).default([]),
    values: z.array(z.string()).default([]),
    fears: z.array(z.string()).default([]),
    socialStyle: z.string().default(''),
    boundaries: z.array(z.string()).default([]),
    goals: z.array(z.string()).default([]),
    secrets: z
      .array(
        z
          .object({
            id: z.string(),
            fact: z.string(),
            visibility: FactVisibility,
            revealHint: z.string().default(''),
          })
          .strict(),
      )
      .default([]),
    speechStyle: z.string().default(''),
    /**
     * Noun phrases this character can be asked about, used verbatim in suggested
     * actions ("Ask Mira about the ward."). Authored rather than derived, because
     * text assembled from quest copy is rarely grammatical.
     */
    topics: z.array(z.string()).default([]),
    /** Short, quotable lines the writer may draw on to keep voice stable. */
    voiceSamples: z.array(z.string()).default([]),
    appearance: z.string().default(''),
    /**
     * The single memorable feature that makes this character readable at a
     * glance and impossible to confuse with anyone else — a scar, a missing
     * finger, half a face of stage makeup.
     *
     * Kept separate from `appearance` because it is the load-bearing part of the
     * design: it goes into the portrait prompt with emphasis, and it is what a
     * player will describe when they talk about this character to someone else.
     */
    visualHook: z.string().default(''),
    /** What their outline reads as across a dark room. Drives pose and costume. */
    silhouette: z.string().default(''),
    /** Spec §19.2 — stable seed + descriptor keeps the face consistent across generations. */
    artSeed: z.string().nullable().default(null),
    portrait: z.string().nullable().default(null),
    expressions: z.array(z.string()).default(['neutral']),
    voiceId: z.string().nullable().default(null),
    schedule: z.array(ScheduleBlock).default([]),
    homeLocationId: z.string().nullable().default(null),
    /** Facts this NPC starts already knowing. Retrieval filters against this. */
    knowledgeScope: z.array(z.string()).default([]),
    startingRelationship: z
      .object({
        trust: z.number().int().default(0),
        affection: z.number().int().default(0),
        respect: z.number().int().default(0),
        fear: z.number().int().default(0),
        rivalry: z.number().int().default(0),
      })
      .strict()
      .default({ trust: 0, affection: 0, respect: 0, fear: 0, rivalry: 0 }),
    gates: z.array(RelationshipGate).default([]),
    attributes: AttributeBlock.default({
      might: 10,
      agility: 10,
      mind: 10,
      presence: 10,
      resolve: 10,
      arcana: 10,
    }),
    combatant: z
      .object({
        health: z.number().int().min(1),
        defenseDc: z.number().int(),
        damage: z.number().int().min(0),
        tags: z.array(z.string()).default([]),
      })
      .strict()
      .nullable()
      .default(null),
  })
  .strict();
export type CharacterDef = z.infer<typeof CharacterDef>;

export const FactionDef = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string().default(''),
    startingReputation: z.number().int().min(-100).max(100).default(0),
    ranks: z
      .array(z.object({ atReputation: z.number().int(), label: z.string() }).strict())
      .default([]),
    allies: z.array(z.string()).default([]),
    enemies: z.array(z.string()).default([]),
  })
  .strict();
export type FactionDef = z.infer<typeof FactionDef>;

/** Spec §15.1 — quest state graph. Steps carry predicates, not prose. */
export const QuestPredicate = z
  .object({
    flagsSet: z.array(z.string()).default([]),
    flagsUnset: z.array(z.string()).default([]),
    hasItems: z.array(z.string()).default([]),
    atLocation: z.string().nullable().default(null),
    completedEvents: z.array(z.string()).default([]),
    minRelationship: z
      .array(
        z
          .object({
            characterId: z.string(),
            dimension: z.enum(['trust', 'affection', 'respect', 'fear', 'rivalry']),
            value: z.number().int(),
          })
          .strict(),
      )
      .default([]),
    minFactionReputation: z
      .array(z.object({ factionId: z.string(), value: z.number().int() }).strict())
      .default([]),
    beforeWorldMinute: z.number().int().nullable().default(null),
  })
  .strict();
export type QuestPredicate = z.infer<typeof QuestPredicate>;

export const QuestStepDef = z
  .object({
    id: z.string(),
    playerCopy: z.string(),
    directorNotes: z.string().default(''),
    enterWhen: QuestPredicate.nullable().default(null),
    succeedWhen: QuestPredicate.nullable().default(null),
    /**
     * Alternative ways to satisfy this step. Any one of them completes it.
     *
     * A single success predicate means exactly one route works and everything
     * else a player tries is wasted effort — the golden-path problem. Routes
     * here are genuinely different: they cost different things, set different
     * flags, and change what the rest of the story can offer.
     */
    succeedWhenAny: z.array(
      z
        .object({
          routeId: z.string(),
          label: z.string(),
          predicate: QuestPredicate,
          /** Set when this route is the one taken, so later content can branch. */
          setsFlags: z.array(z.string()).default([]),
          /** Closed off by taking this route. Choices should cost something. */
          closesFlags: z.array(z.string()).default([]),
        })
        .strict(),
    ).default([]),
    failWhen: QuestPredicate.nullable().default(null),
    deadlineWorldMinute: z.number().int().nullable().default(null),
    hiddenUntilEntered: z.boolean().default(false),
    rewards: z
      .object({
        xp: z.number().int().default(0),
        items: z.array(z.object({ itemId: z.string(), qty: z.number().int() }).strict()).default([]),
        flags: z.array(z.string()).default([]),
      })
      .strict()
      .default({ xp: 0, items: [], flags: [] }),
  })
  .strict();
export type QuestStepDef = z.infer<typeof QuestStepDef>;

export const QuestDef = z
  .object({
    id: z.string(),
    title: z.string(),
    summary: z.string(),
    kind: z.enum(['MAIN', 'SIDE', 'LEAD']).default('SIDE'),
    discoverWhen: QuestPredicate.nullable().default(null),
    steps: z.array(QuestStepDef).min(1),
    involvedCharacterIds: z.array(z.string()).default([]),
    involvedLocationIds: z.array(z.string()).default([]),
    knownRewardCopy: z.string().default(''),
    startsActive: z.boolean().default(false),
  })
  .strict();
export type QuestDef = z.infer<typeof QuestDef>;

/** Spec §16.4 — authored promises the director seeds and pays off. */
export const StoryPromiseDef = z
  .object({
    id: z.string(),
    kind: z.enum(['MYSTERY', 'RIVAL', 'RELATIONSHIP', 'BOSS', 'THEME', 'FINALE']),
    label: z.string(),
    seedHint: z.string(),
    payoffHint: z.string(),
    weight: z.number().min(0).max(1).default(0.5),
  })
  .strict();
export type StoryPromiseDef = z.infer<typeof StoryPromiseDef>;

export const ArchetypeDef = z
  .object({
    id: z.string(),
    name: z.string(),
    blurb: z.string(),
    attributeBonus: z.record(AttributeKey, z.number().int()).default({}),
    skillProficiencies: z.record(z.string(), z.number().int().min(0).max(5)).default({}),
    startingItems: z.array(z.object({ itemId: z.string(), qty: z.number().int() }).strict()).default([]),
    startingAbilities: z.array(z.string()).default([]),
  })
  .strict();
export type ArchetypeDef = z.infer<typeof ArchetypeDef>;

/** Spec §13.6 — the engine, not the writer, enforces the defeat mode. */
export const DefeatMode = z.enum(['LETHAL', 'FAIL_FORWARD', 'CHECKPOINT', 'ROGUELIKE']);
export type DefeatMode = z.infer<typeof DefeatMode>;

export const ProgressionMode = z.enum(['LEVEL', 'MILESTONE']);
export type ProgressionMode = z.infer<typeof ProgressionMode>;

export const ContentDescriptor = z.enum([
  'FANTASY_VIOLENCE',
  'ROMANCE',
  'SUGGESTIVE_THEMES',
  'HORROR',
  'PSYCHOLOGICAL_THEMES',
  'ALCOHOL_REFERENCES',
  'LANGUAGE',
  'PERMANENT_DEATH',
  'MORAL_AMBIGUITY',
]);
export type ContentDescriptor = z.infer<typeof ContentDescriptor>;

export const StoryRules = z
  .object({
    defeatMode: DefeatMode.default('FAIL_FORWARD'),
    progressionMode: ProgressionMode.default('MILESTONE'),
    /** Spec §12.7 — most worlds hide exact DCs. Crunchy worlds may opt in. */
    revealExactDc: z.boolean().default(false),
    revealCheckMath: z.boolean().default(false),
    allowsCombat: z.boolean().default(true),
    allowsRomance: z.boolean().default(true),
    startingLocationId: z.string(),
    startWorldMinute: z.number().int().min(0).default(8 * 60),
    /**
     * What every player carries because the fiction says so, whatever
     * background they chose — or chose not to choose.
     *
     * An archetype's `startingItems` is what that background adds. The item the
     * premise depends on is a fact about the world: The Salt Road's sealed case
     * is the job, and a player who skipped the archetype step was setting out
     * across eleven days of desert without it.
     */
    startingItems: z
      .array(z.object({ itemId: z.string(), qty: z.number().int().min(1) }).strict())
      .default([]),
    /** In-fiction rules the director may never contradict. */
    hardCanon: z.array(z.string()).default([]),
    toneGuide: z.string().default(''),
    /** Fork price in credits. Spec §20.10 default 120. */
    forkCostCredits: z.number().int().min(0).default(120),
  })
  .strict();
export type StoryRules = z.infer<typeof StoryRules>;

export const CharacterSetupField = z
  .object({
    id: z.string(),
    label: z.string(),
    kind: z.enum(['TEXT', 'CHOICE', 'ARCHETYPE']),
    required: z.boolean().default(false),
    advanced: z.boolean().default(false),
    maxLength: z.number().int().default(300),
    options: z.array(z.object({ id: z.string(), label: z.string() }).strict()).default([]),
    placeholder: z.string().default(''),
  })
  .strict();
export type CharacterSetupField = z.infer<typeof CharacterSetupField>;

export const StoryVersion = z
  .object({
    id: z.string(),
    storyId: z.string(),
    version: z.number().int().min(1),
    title: z.string(),
    /** Max 42 chars. Spec §7.3 card fantasy label. */
    fantasyLabel: z.string().max(42),
    hook: z.string(),
    /** 120–240 words. Spec §8.2 item 8. */
    premise: z.string(),
    creatorId: z.string(),
    creatorName: z.string(),
    official: z.boolean().default(false),
    coverImage: z.string().nullable().default(null),
    keyArt: z.string().nullable().default(null),
    tags: z.array(z.string()).default([]),
    /** "What you can do here" chips. Spec §8.2 item 7. */
    mechanicsChips: z.array(z.string()).default([]),
    contentDescriptors: z.array(ContentDescriptor).default([]),
    intensity: z.enum(['LIGHT', 'MODERATE', 'INTENSE']).default('MODERATE'),
    creatorNote: z.string().default(''),
    rules: StoryRules,
    attributes: AttributeBlock,
    skills: z.array(SkillDef).default([]),
    resources: z.array(ResourceDef).default([]),
    items: z.array(ItemDef).default([]),
    abilities: z.array(AbilityDef).default([]),
    locations: z.array(LocationDef).min(1),
    characters: z.array(CharacterDef).default([]),
    factions: z.array(FactionDef).default([]),
    quests: z.array(QuestDef).default([]),
    promises: z.array(StoryPromiseDef).default([]),
    archetypes: z.array(ArchetypeDef).default([]),
    setupFields: z.array(CharacterSetupField).default([]),
    /** 50–150 words. Spec §21.3 step 8 / §43.2. */
    opening: z.string(),
    openingSuggestions: z.array(z.string()).max(3).default([]),
    publishedAt: z.string().nullable().default(null),
  })
  .strict();
export type StoryVersion = z.infer<typeof StoryVersion>;

/** Catalog-shaped projection of a story. What Discover and search return. */
export const StorySummary = z
  .object({
    storyId: z.string(),
    storyVersionId: z.string(),
    title: z.string(),
    fantasyLabel: z.string(),
    hook: z.string(),
    creatorName: z.string(),
    official: z.boolean(),
    coverImage: z.string().nullable(),
    keyArt: z.string().nullable(),
    tags: z.array(z.string()),
    mechanicsChips: z.array(z.string()),
    contentDescriptors: z.array(ContentDescriptor),
    intensity: z.enum(['LIGHT', 'MODERATE', 'INTENSE']),
    runs: z.number().int(),
    likes: z.number().int(),
    saved: z.boolean().default(false),
    badges: z.array(z.enum(['NEW', 'TRENDING', 'OFFICIAL'])).default([]),
    updatedAt: z.string(),
  })
  .strict();
export type StorySummary = z.infer<typeof StorySummary>;
