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

/**
 * What a resource *does* while it sits in a particular range.
 *
 * A variable exists to change behaviour, not to be displayed. Authors already
 * think in these terms — every story bible in `docs/story-bibles` describes its
 * state as behaviour bands, "Ayame Trust low: guarded, shares only survival
 * rules / high: shares Mika evidence, takes personal risks" — and `ResourceDef`
 * could express exactly one point of that range, `zeroStateConsequence`, which
 * is the band nobody spends the story in.
 *
 * So the useful half of the idea had nowhere to live and the writer received a
 * number with a noun on it. "House Attention: 62 / 100" tells a model nothing;
 * "the building is staging scenes around the people you care about" tells it
 * what the next beat is.
 *
 * `upTo` is the inclusive top of the band. Bands are read in ascending order
 * and the first one the value fits is the one that applies, so the last band
 * should reach `max`.
 */
export const ResourceBand = z
  .object({
    /** Inclusive upper bound. A value at or below this is in this band. */
    upTo: z.number().int(),
    /**
     * How the world behaves in this range, in the same words a writer would
     * use. Never a measurement, never shown to the player as text.
     */
    behaviour: z.string(),
  })
  .strict();
export type ResourceBand = z.infer<typeof ResourceBand>;

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
    /**
     * What this resource does at each level, ascending. Empty on a resource
     * that is genuinely only a number — Legs is legs.
     */
    bands: z.array(ResourceBand).default([]),
  })
  .strict();
export type ResourceDef = z.infer<typeof ResourceDef>;

/**
 * The band a value is currently in, or null if the resource has no bands.
 *
 * Derived rather than stored, for the same reason `archetypeGrants` is: a band
 * written into state would drift the moment the author changed a threshold, and
 * the drift would be invisible.
 */
export function resourceBand(def: ResourceDef, value: number): ResourceBand | null {
  if (def.bands.length === 0) return null;
  const ascending = [...def.bands].sort((a, b) => a.upTo - b.upTo);
  return ascending.find((band) => value <= band.upTo) ?? ascending.at(-1) ?? null;
}

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
    /**
     * Habits this action feeds. Spec §12.10.
     *
     * Every use increments these counters, which is what makes a playstyle
     * something the player grew into rather than something they declared at
     * setup — and what gives an opponent something real to study.
     */
    tendencies: z.array(z.string()).default([]),
    /**
     * The habit this action punishes.
     *
     * A defender sitting on your drive is beaten by the pull-up, and the
     * engine has to know that or "develop a counter" is only ever narration.
     * Using a counter against a scouted habit removes the scouting penalty.
     */
    countersTendency: z.string().nullable().default(null),
    /**
     * What the world has to be like before this can be used at all.
     *
     * Knowing a technique and being able to use it are different things: a
     * hybrid's heavier traits only answer once they have stopped holding
     * themselves together, and a Relic does nothing in a hand that has not been
     * accepted by it. Without this, "power at a price" could only ever be
     * modelled as a resource cost, which is a price you pay rather than a line
     * you cross.
     */
    requires: z
      .object({
        flagsSet: z.array(z.string()).default([]),
        flagsUnset: z.array(z.string()).default([]),
        /** Usable only at or above this much of a resource. */
        minResources: z
          .array(z.object({ resourceId: z.string(), value: z.number().int() }).strict())
          .default([]),
        /** Usable only at or below it — the shape a stability meter needs. */
        maxResources: z
          .array(z.object({ resourceId: z.string(), value: z.number().int() }).strict())
          .default([]),
        /** Shown to the player when it is not available. Never a rules readout. */
        lockedCopy: z.string().default(''),
      })
      .strict()
      .default({ flagsSet: [], flagsUnset: [], minResources: [], maxResources: [], lockedCopy: '' }),
  })
  .strict();
export type AbilityDef = z.infer<typeof AbilityDef>;

/**
 * Something the world does on its own, at a specific hour, whether or not the
 * player is there to see it.
 *
 * A schedule says where a person is. This says what happens. The difference
 * matters for any world where events have their own momentum — a theft at nine
 * on Wednesday, a tide, a ship leaving — because without it "the world moves
 * without you" can only be a promise the narrator makes.
 *
 * Firing is deterministic: same world minute, same flags, same outcome. A
 * player who learns an event's timing can be somewhere else beforehand and stop
 * it, which is the whole point.
 */
export const WorldEventDef = z
  .object({
    id: z.string(),
    /** Minutes since the world began. Fires the first time the clock passes it. */
    atWorldMinute: z.number().int().min(0),
    /** Where it happens. Null means everywhere, or nowhere in particular. */
    locationId: z.string().nullable().default(null),
    /** What a player standing there would see. Plain, concrete, one sentence. */
    publicCopy: z.string(),
    /** Told to the director wherever the player is. Never shown raw. */
    directorNotes: z.string().default(''),
    setsFlags: z.array(z.string()).default([]),
    /** Any one of these means the player already changed it. It does not fire. */
    cancelledByFlags: z.array(z.string()).default([]),
    /** All of these must hold, or it is not time yet. */
    requiresFlags: z.array(z.string()).default([]),
    /** Where people end up because of it. */
    movesCharacters: z
      .array(z.object({ characterId: z.string(), toLocationId: z.string() }).strict())
      .default([]),
  })
  .strict();
export type WorldEventDef = z.infer<typeof WorldEventDef>;

/**
 * A world that starts again.
 *
 * The reset is the engine's, not the narrator's: the clock reaching the end
 * rebuilds the world exactly as it began, and what survives is declared here
 * rather than decided per turn. Everything else — position, injuries, who is
 * angry with whom, what was stolen — goes back.
 */
export const LoopRules = z
  .object({
    /** Where a new loop begins. */
    startWorldMinute: z.number().int().min(0),
    /** When the world ends, and the next one starts. */
    endWorldMinute: z.number().int().min(1),
    /**
     * Flag prefixes that survive. This is what the player *knows*, and it is
     * the whole progression system of a looping world: a code, a schedule, a
     * name, a place — carried out of a week nobody else remembers.
     */
    persistentFlagPrefixes: z.array(z.string()).default(['knows:', 'echo:']),
    /**
     * How much of a relationship survives, 0 to 1.
     *
     * Nobody remembers the loop. But something extreme leaves a residue, and a
     * person who trusted you completely does not meet you as a total stranger
     * next time — they meet you as someone they have no reason to like and
     * inexplicably do.
     */
    echoRetention: z.number().min(0).max(1).default(0),
    /** Only relationships past this far from neutral leave one. */
    echoThreshold: z.number().int().min(0).default(40),
    /** Shown when a loop restarts. The player's own experience of it. */
    resetCopy: z.string().default(''),
  })
  .strict();
export type LoopRules = z.infer<typeof LoopRules>;

/**
 * A habit the engine counts.
 *
 * Spec §12.10 — the same piece of state answers two questions that are usually
 * built as separate systems: what kind of player you have become, and what a
 * good opponent has worked out about you. Both are "what does this person keep
 * doing", so both read the same counters.
 *
 * Authored per world because what counts as a habit is domain knowledge: a
 * basketball world tracks driving direction and shot zones, a duelling world
 * would track opening and distance.
 */
export const TendencyDef = z
  .object({
    id: z.string(),
    /** How the world names it when somebody talks about it. "Driving right." */
    label: z.string().max(48),
    /**
     * What a player who leans on this becomes known as. Shown as an earned
     * identity, never as a class the player picked.
     */
    identity: z.string().max(40),
    /** One line the director can use once an opponent has this scouted. */
    scoutedNote: z.string().default(''),
  })
  .strict();
export type TendencyDef = z.infer<typeof TendencyDef>;

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
    /**
     * What is lying around here that a player could take.
     *
     * Without this, `steal` resolved to a check and nothing else: the prose
     * said you pocketed something and your inventory stayed empty, which is the
     * world contradicting itself in the player's own bag. If a place has
     * nothing listed, there is nothing here worth taking, and the attempt is
     * refused in those words rather than rolled and silently voided.
     */
    takeableItems: z
      .array(
        z
          .object({
            itemId: z.string(),
            qty: z.number().int().min(1).default(1),
            /** Whose it is. Taking it in front of them is a different act. */
            ownerId: z.string().nullable().default(null),
            /** How the player would refer to it before they know its name. */
            aka: z.array(z.string()).default([]),
          })
          .strict(),
      )
      .default([]),
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
        /**
         * Something the player must be carrying. "Show me the page and I will
         * talk to you" is a normal way for a person to open up, and without
         * this a gate can only ever be about numbers and flags.
         */
        hasItems: z.array(z.string()).default([]),
      })
      .strict(),
  })
  .strict();
export type RelationshipGate = z.infer<typeof RelationshipGate>;

/**
 * How one crew member feels about another.
 *
 * Without this a crew is a list of stat bonuses that happen to have faces. The
 * value is a small signed number rather than the five-dimension relationship
 * block because nobody needs to model an NPC's romantic history with another
 * NPC — what matters mechanically is whether these two can work the same deck.
 */
export const CompanionBond = z
  .object({
    characterId: z.string(),
    /** −3 will not sail with them, +3 followed them here. */
    value: z.number().int().min(-3).max(3),
    /** One line the director may draw on. Never shown raw. */
    note: z.string().default(''),
  })
  .strict();
export type CompanionBond = z.infer<typeof CompanionBond>;

/**
 * A condition under which this person stops being yours.
 *
 * Authored, checked every turn, and never a surprise: `warningCopy` fires one
 * step before `departureCopy` does. A companion who can only ever be gained is
 * a possession, and the whole point of a crew is that they are not.
 */
export const CompanionDeparture = z
  .object({
    id: z.string(),
    /** All present conditions must hold. */
    when: z
      .object({
        moraleAtMost: z.number().int().nullable().default(null),
        trustAtMost: z.number().int().nullable().default(null),
        flagsSet: z.array(z.string()).default([]),
        flagsUnset: z.array(z.string()).default([]),
        /** Their own goal went unanswered past this hour. */
        afterWorldMinute: z.number().int().nullable().default(null),
      })
      .strict(),
    /** Shown while it is still avoidable. */
    warningCopy: z.string().default(''),
    /** Shown on the turn they go. */
    departureCopy: z.string(),
    /** Where they end up. Null leaves them off the board. */
    toLocationId: z.string().nullable().default(null),
    setsFlags: z.array(z.string()).default([]),
    /** They do not merely leave — they take something or tell someone. */
    betrayal: z.boolean().default(false),
  })
  .strict();
export type CompanionDeparture = z.infer<typeof CompanionDeparture>;

/**
 * Spec §14.7 — an NPC who can travel with the player.
 *
 * The design constraint this exists to enforce: a companion is a relationship
 * with running costs, not an item with a portrait. They have to be earned
 * (`joinsWhen`), they cost something to keep (`upkeepPerDay`, morale drift),
 * they do something the player cannot (`grantsSkills`, scaled by how they are
 * feeling), they want something of their own (`wantsQuestId`), they have
 * opinions about each other (`bonds`), and they can go (`leavesWhen`).
 *
 * Every one of those is state the engine owns, so a story cannot claim a crew
 * matters without it actually mattering.
 */
export const CompanionDef = z
  .object({
    /** What they do aboard: "Navigator", "Gunner", "Surgeon". */
    station: z.string().max(40),
    /** One line for the roster: why they are worth the trouble. */
    summary: z.string().max(220).default(''),
    /** What has to be true before they will come. */
    joinsWhen: z
      .object({
        flagsSet: z.array(z.string()).default([]),
        flagsUnset: z.array(z.string()).default([]),
        hasItems: z.array(z.string()).default([]),
        minTrust: z.number().int().nullable().default(null),
        minRespect: z.number().int().nullable().default(null),
        minFactionReputation: z
          .array(z.object({ factionId: z.string(), value: z.number().int() }).strict())
          .default([]),
        /** Somebody already aboard vouched for them. */
        companionsAboard: z.array(z.string()).default([]),
      })
      .strict()
      .default({}),
    /** Said when the player asks and the answer is no. Must name the reason. */
    refusalCopy: z.string(),
    /** Said when they come aboard. */
    acceptCopy: z.string(),
    /** Their contribution to the player's rolls, scaled by morale. */
    grantsSkills: z.record(z.string(), z.number().int()).default({}),
    /** Their own goal, which becomes live once they are aboard. */
    wantsQuestId: z.string().nullable().default(null),
    startingMorale: z.number().int().min(0).max(100).default(55),
    /** Where they drift on their own, per day aboard. */
    moraleDriftPerDay: z.number().default(0),
    /** How they take the things the player does. */
    reactions: z
      .array(
        z
          .object({
            flag: z.string(),
            morale: z.number().int(),
            note: z.string().default(''),
          })
          .strict(),
      )
      .default([]),
    bonds: z.array(CompanionBond).default([]),
    leavesWhen: z.array(CompanionDeparture).default([]),
    /** What feeding them costs, per day. */
    upkeepPerDay: z.number().min(0).default(0),
  })
  .strict();
export type CompanionDef = z.infer<typeof CompanionDef>;

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
    /** Set when this person can sail with you. Spec §14.7. */
    companion: CompanionDef.nullable().default(null),
    /**
     * How well this person learns what you keep doing. Spec §12.10.
     *
     * `null` for anyone who never studies you. The whole point of the field is
     * that being figured out is a property of the opponent — a rival who
     * watches film is a different problem from one who does not, and both
     * should exist.
     */
    scouting: z
      .object({
        /** Habit points gained per encounter with the player. */
        learnRate: z.number().min(0).max(10).default(1),
        /** They stop learning past this. Nobody solves you completely. */
        cap: z.number().min(1).max(20).default(6),
        /** What they say the first time they show you they know. */
        revealCopy: z.string().default(''),
      })
      .strict()
      .nullable()
      .default(null),
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
    /**
     * The other end of the clock. A deadline needs `beforeWorldMinute`; a
     * season that only opens up once you are five weeks into it needs this,
     * and without it a story can only ever be gated on running out of time.
     */
    afterWorldMinute: z.number().int().nullable().default(null),
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
        /**
         * Standing gained with a faction for finishing this step.
         *
         * The point of the field is that institutional reputation could only
         * ever go *down*: the engine drops it for public violence and for an
         * NPC calling for help, and nothing raised it. Every faction gate in
         * the catalog sat above its own starting value, so all of them were
         * unreachable — including the five that were meant to be the whole
         * point of choosing a class.
         */
        reputation: z
          .array(z.object({ factionId: z.string(), amount: z.number().int() }).strict())
          .default([]),
        /**
         * Abilities taught by finishing this step.
         *
         * The point of the field is that a build is not settled at character
         * creation. A player who starts with no technique has to be able to
         * acquire one by playing, or the option to start without one is a trap
         * dressed as a choice.
         */
        abilities: z.array(z.string()).default([]),
      })
      .strict()
      .default({ xp: 0, items: [], flags: [], abilities: [], reputation: [] }),
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

/**
 * A place this story could genuinely end up.
 *
 * Endings are *eligibility*, never rails. A world does not have a route; it has
 * destinations, and one becomes reachable because the player's run has actually
 * arrived somewhere that conclusion makes sense. Nothing herds them toward one,
 * nothing is failed by not reaching one, and a run that ends somewhere nobody
 * authored is a legitimate outcome of a world with open edges.
 *
 * Two conditions, because they answer different questions. `requires` is the
 * engine's: a deterministic predicate over flags, quests, relationships and the
 * clock, checked every turn for nothing, with no model call and no ambiguity.
 * `condition` is the writer's: what this ending *means*, in words, so that a
 * state which qualifies on paper is only played when it also lands — a team
 * reaching Nationals on the last possible night is a different scene from
 * reaching it comfortably in February, and only the second condition knows that.
 */
export const EndingDef = z
  .object({
    id: z.string(),
    /** What this ending is called, in the world's voice. "The Program Stays". */
    name: z.string().max(60),
    /**
     * How far off the common path this is. Not a reward tier and not shown as
     * one — it tells the director how hard to work to notice the ending is in
     * reach, and it is what a completion record would eventually be built from.
     */
    rarity: z.enum(['COMMON', 'UNCOMMON', 'RARE', 'UNIQUE']).default('COMMON'),
    /**
     * The earliest turn this can be offered. A story that can end on turn three
     * has not been a story yet, however neatly the state lines up.
     */
    minTurn: z.number().int().min(0).default(0),
    /** The engine's half: what must be true before this is even considered. */
    requires: QuestPredicate,
    /**
     * The writer's half: when this is the right ending, said as a person would
     * say it. Read, never parsed.
     */
    condition: z.string(),
    /** What the world looks like afterwards. The writer expands this; it is not printed raw. */
    epilogue: z.string(),
    /** Optional nudge when the run is close, for a world that wants to show one. */
    hint: z.string().default(''),
    image: z.string().nullable().default(null),
  })
  .strict();
export type EndingDef = z.infer<typeof EndingDef>;

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

/**
 * A build option the player picks before they know the world.
 *
 * Spec §9.2 — the copy is two layers and they are separate fields on purpose,
 * because one field always ends up doing both jobs badly. Layer 1 (`name`,
 * `role`, `summary`, `playstyle`) says what this is and what it does for you,
 * in words a player who has read nothing can act on. Layer 2 (`blurb`) is the
 * world's voice, and it is never responsible for communicating layer 1.
 *
 * What the option *grants* is not authored at all. It is derived from
 * `startingAbilities`, `skillProficiencies` and `startingItems`, so the card
 * cannot promise something the engine does not hand over.
 */
export const ArchetypeDef = z
  .object({
    id: z.string(),
    /** The option's name, on its own. "Ember", not "Ember lean — forward and hot". */
    name: z.string().max(28),
    /**
     * What kind of thing this is, in ordinary words. Two to four of them:
     * "Fire affinity", "Heavy melee", "Support and healing".
     */
    role: z.string().max(40),
    /**
     * One sentence a new player can act on: what it does for you in play.
     * Plain English. No invented nouns that the screen has not already glossed.
     */
    summary: z.string().max(220),
    /**
     * Two to four scannable tags, so four cards can be compared at a glance.
     * "Aggressive", "Close range", "Hard to move".
     */
    playstyle: z.array(z.string().max(24)).min(2).max(4),
    /** Layer 2. The world's voice. Never the only place meaning appears. */
    blurb: z.string(),
    attributeBonus: z.record(AttributeKey, z.number().int()).default({}),
    skillProficiencies: z.record(z.string(), z.number().int().min(0).max(5)).default({}),
    startingItems: z.array(z.object({ itemId: z.string(), qty: z.number().int() }).strict()).default([]),
    startingAbilities: z.array(z.string()).default([]),
    /**
     * Standing this choice confers on its own.
     *
     * In a world where the class *is* an order, being a Healer means the
     * Stillhand already counts you as one of theirs. Without this, faction
     * reputation started at zero for everyone and could only ever fall, so
     * every door the class was supposed to open was locked to everybody.
     */
    startingReputation: z
      .array(z.object({ factionId: z.string(), amount: z.number().int() }).strict())
      .default([]),
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
    /** Set on a world that starts again. Null on every world that does not. */
    loop: LoopRules.nullable().default(null),
  })
  .strict();
export type StoryRules = z.infer<typeof StoryRules>;

export const CharacterSetupField = z
  .object({
    id: z.string(),
    label: z.string(),
    kind: z.enum(['TEXT', 'CHOICE', 'ARCHETYPE']),
    /**
     * Shown once above the options, before the player is asked to choose.
     *
     * A build choice is unanswerable until the player knows what system they
     * are choosing inside of. This is the sentence that establishes it —
     * what the thing is, and what picking one will change.
     */
    helpText: z.string().default(''),
    required: z.boolean().default(false),
    advanced: z.boolean().default(false),
    maxLength: z.number().int().default(300),
    options: z.array(z.object({ id: z.string(), label: z.string() }).strict()).default([]),
    placeholder: z.string().default(''),
  })
  .strict();
export type CharacterSetupField = z.infer<typeof CharacterSetupField>;

/**
 * Whether the player invents who they are, or the story already knows.
 *
 * Caught on Itachi. Its own premise reads *"you are thirteen, you are the best
 * shinobi your clan has produced in a generation"* — and the setup screen then
 * asked the player to type their own name, invent their appearance and choose
 * pronouns, with placeholder text describing Itachi back at them. The game was
 * asking the player to author a character the world had already written.
 *
 * Nine Weeks is the other case and the reason this is a field rather than a
 * rule: you are an unnamed person coming back to a summer job, and inventing
 * yourself is the whole premise. Both are correct; they are different stories.
 *
 * `BLANK` is the default, so the fifteen worlds written before this keep the
 * behaviour they were authored for.
 *
 * This changes the *setup screen only*. A named protagonist constrains who you
 * are, never what you may do — the archetype question, and every choice after
 * it, stays exactly as free as it was.
 */
export const Protagonist = z
  .object({
    kind: z.enum(['BLANK', 'NAMED']).default('BLANK'),
    /** Canon, for a NAMED protagonist. Ignored when BLANK. */
    name: z.string().default(''),
    pronouns: z.string().default(''),
    /** How the world sees them, in place of the player's own description. */
    description: z.string().default(''),
    /**
     * The heading the setup screen uses instead of "Who are you?".
     *
     * "What kind of Itachi are you?" is a different and better question, and
     * only the world knows how to phrase it.
     */
    setupHeading: z.string().default(''),
  })
  .strict()
  .default({ kind: 'BLANK', name: '', pronouns: '', description: '', setupHeading: '' });
export type Protagonist = z.infer<typeof Protagonist>;

export const StoryVersion = z
  .object({
    id: z.string(),
    storyId: z.string(),
    version: z.number().int().min(1),
    title: z.string(),
    /**
     * Clocks the player is already on when the story opens.
     *
     * Some premises start you late. Itachi's says his father expects him in
     * eighty minutes with everything the tower told him this week — which is
     * the whole engine of the scene, and it existed only in the opening prose,
     * so nothing in the world knew there was anything to be late for.
     *
     * A player's own promises are detected from what they say (see
     * `commitments.ts`). This is the other half: a deadline the world imposes
     * before the player has said anything at all. Empty for most worlds, and
     * that is correct — most stories do not start you on a clock.
     */
    openingObligations: z
      .array(
        z
          .object({
            what: z.string().max(300),
            withCharacterId: z.string().nullable().default(null),
            /** Minutes from the story's start, not an absolute world minute. */
            dueInMinutes: z.number().int().min(1),
          })
          .strict(),
      )
      .default([]),
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
    /** Habits this world counts. Spec §12.10. Empty in most worlds. */
    tendencies: z.array(TendencyDef).default([]),
    /** What the world does on its own, at its own hours. */
    worldEvents: z.array(WorldEventDef).default([]),
    promises: z.array(StoryPromiseDef).default([]),
    /**
     * Where this story could end up. Empty is legitimate — a world with no
     * authored destinations simply runs until the player stops.
     */
    endings: z.array(EndingDef).default([]),
    archetypes: z.array(ArchetypeDef).default([]),
    setupFields: z.array(CharacterSetupField).default([]),
    protagonist: Protagonist,
    /**
     * A hand-written brief for this world's cover, replacing the generated one.
     *
     * Covers are normally composed — a genre composition, a staging picked per
     * story, the cast read out of the schema. That is right for twenty worlds
     * and wrong for the one somebody has actually art-directed. When this is
     * set, it replaces the composed middle of the prompt; the style spine, the
     * framing rule, the appeal direction and the negatives still apply, because
     * those are the house rules rather than the subject.
     */
    coverDirection: z.string().default(''),
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
    /** Comments on the world. Real rows plus curated launch content. */
    comments: z.number().int().default(0),
    /** Whether the person asking has liked it. Always false for guests. */
    likedByMe: z.boolean().default(false),
    saved: z.boolean().default(false),
    badges: z.array(z.enum(['NEW', 'TRENDING', 'OFFICIAL', 'STAFF_PICK'])).default([]),
    updatedAt: z.string(),
  })
  .strict();
export type StorySummary = z.infer<typeof StorySummary>;

/**
 * What choosing this option actually gives you, read off the option itself.
 *
 * Deliberately derived rather than authored. A hand-written "you start with
 * Ember Palm" line drifts the moment the ability list changes, and the drift is
 * invisible — the card keeps promising something the engine stopped handing
 * over. Same reasoning as the asset keys.
 */
export interface ArchetypeGrants {
  /** Ability names, in the order the option lists them. */
  readonly abilities: string[];
  /** Skills this option is trained in, best first, as "Name (Skilled)". */
  readonly skills: string[];
  /** Attributes it raises, best first, as "Might +3". */
  readonly attributes: string[];
  /** Item names and counts. */
  readonly items: string[];
  /** "The Stillhand +20" — where this choice already counts as one of them. */
  readonly standing: string[];
}

/** Spec §12.4 — proficiency 0–5. */
const PROFICIENCY_LABELS = ['Untrained', 'Novice', 'Practised', 'Skilled', 'Expert', 'Legendary'];

const ATTRIBUTE_LABELS: Record<string, string> = {
  might: 'Might',
  agility: 'Agility',
  mind: 'Mind',
  presence: 'Presence',
  resolve: 'Resolve',
  arcana: 'Arcana',
};

export function archetypeGrants(story: StoryVersion, archetype: ArchetypeDef): ArchetypeGrants {
  const abilities = archetype.startingAbilities
    .map((id) => story.abilities.find((a) => a.id === id)?.name)
    .filter((name): name is string => !!name);

  const skills = Object.entries(archetype.skillProficiencies)
    .filter(([, level]) => level > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([id, level]) => {
      const name = story.skills.find((s) => s.id === id)?.name ?? id;
      return `${name} (${PROFICIENCY_LABELS[Math.min(level, 5)]})`;
    });

  const attributes = Object.entries(archetype.attributeBonus)
    .filter(([, value]) => typeof value === 'number' && value !== 0)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .map(([key, value]) => `${ATTRIBUTE_LABELS[key] ?? key} +${value}`);

  const items = archetype.startingItems.map((entry) => {
    const name = story.items.find((i) => i.id === entry.itemId)?.name ?? entry.itemId;
    return entry.qty > 1 ? `${name} ×${entry.qty}` : name;
  });

  const standing = archetype.startingReputation.map((entry) => {
    const faction = story.factions.find((f) => f.id === entry.factionId);
    return `${faction?.name ?? entry.factionId} ${entry.amount > 0 ? '+' : ''}${entry.amount}`;
  });

  return { abilities, skills, attributes, items, standing };
}

/**
 * What an ability does, in ordinary words, derived from what it is.
 *
 * The same two-layer rule the setup screen follows (see `ArchetypeGrants`):
 * "Heat carried in the hand and put into something at the moment of contact"
 * is good writing and does not tell a player in a fight whether it hits one
 * person or the room, or what it costs, or whether it can fail. That comes
 * from the ability's own shape rather than from a second authored string,
 * because a hand-written effect line goes stale the first time somebody
 * changes the target rule.
 */
export function abilityEffect(story: StoryVersion, ability: AbilityDef): string {
  // A tag if one says what this is, otherwise the skill it rolls, which is the
  // world's own word for the same thing — "Stealth", "Mending", "Riding".
  const skillName = story.skills.find((s) => s.id === ability.check?.skillId)?.name;
  const kind =
    ABILITY_KIND.find((entry) => ability.tags.includes(entry.tag))?.label ?? skillName ?? 'Technique';

  const target = {
    SELF: 'on yourself',
    SINGLE: 'on one target',
    MULTI: 'on several targets',
    AREA: 'across the area',
    NONE: '',
  }[ability.targetRule];

  const cost = ability.costs
    .map((entry) => {
      const resource = story.resources.find((r) => r.id === entry.resourceId);
      return `${entry.amount} ${resource?.name ?? entry.resourceId}`;
    })
    .join(' and ');

  // Whether it can fail is the thing a player most needs and is least told.
  const certainty = ability.check
    ? `rolls ${story.skills.find((s) => s.id === ability.check?.skillId)?.name ?? ATTRIBUTE_LABELS[ability.check.attribute] ?? 'a check'}`
    : 'always works';

  const parts = [
    [kind, target].filter(Boolean).join(' '),
    certainty,
    cost ? `costs ${cost}` : 'costs nothing',
    ability.cooldownMinutes > 0 ? `once every ${formatMinutes(ability.cooldownMinutes)}` : null,
  ].filter(Boolean);

  return `${parts.join(' · ')}.`;
}

/** Ordered: the first tag that matches wins, so "ember, offensive" is an attack. */
const ABILITY_KIND: Array<{ tag: string; label: string }> = [
  { tag: 'offensive', label: 'Attack' },
  { tag: 'combat', label: 'Attack' },
  { tag: 'defensive', label: 'Defence' },
  { tag: 'movement', label: 'Movement' },
  { tag: 'healing', label: 'Healing' },
  { tag: 'social', label: 'Social' },
  { tag: 'sight', label: 'Perception' },
  { tag: 'survival', label: 'Survival' },
  { tag: 'stagecraft', label: 'Craft' },
  { tag: 'utility', label: 'Utility' },
];

function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} minutes`;
  const hours = minutes / 60;
  return hours === 1 ? 'hour' : `${Number.isInteger(hours) ? hours : hours.toFixed(1)} hours`;
}
