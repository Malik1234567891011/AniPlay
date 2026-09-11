import { describe, expect, it } from 'vitest';
import { NINE_WEEKS, NINTH_ARCHIVE as STORY } from '@aniplay/test-fixtures';
import type { ActionIntent, GameState, StateMutation } from '@aniplay/contracts';
import { SeededRng, deriveTurnSeed, sha256Hex } from './rng.js';
import {
  attributeModifier,
  classifyOutcome,
  clampAdvantage,
  estimateRisk,
  resolveCheck,
  rollWithAdvantage,
} from './check.js';
import { createInitialState, countItem, getRelationship, locationForSchedule } from './state.js';
import { applyMutations, validateMutations } from './mutations.js';
import {
  clampRelationshipDelta,
  isGateSatisfied,
  relationshipLabel,
  RELATIONSHIP_LABELS,
} from './relationships.js';
import { advanceQuests, evaluatePredicate, topObjective } from './quests.js';
import { resolveIntent } from './resolve.js';
import { commitTurn } from './commit.js';
import { qualitativeHealth } from './combat.js';
import { chooseNpcAction } from './npc-turns.js';
import { formatWorldTime, dayNumber, TIME_COST_MINUTES } from './clock.js';

const baseState = (): GameState =>
  createInitialState({
    sessionId: 'sess_test',
    story: STORY,
    identity: {
      displayName: 'Malik',
      pronouns: 'he/him',
      ageBand: null,
      archetypeId: 'arch_scholar',
      worldKnowsAboutYou: 'Arrived late, with no paperwork.',
      advanced: {},
      portraitAssetId: null,
    },
  });

const intent = (actions: ActionIntent['actions'], dialogue: ActionIntent['dialogue'] = []): ActionIntent => ({
  schemaVersion: '1.0',
  intentId: 'int_test',
  rawAction: 'test',
  dialogue,
  actions,
  confidence: 0.9,
  ambiguities: [],
  unsafeOrMetaRequests: [],
});

const player = { entityType: 'player' as const, entityId: 'player' };

// ---------------------------------------------------------------------------

describe('seeded RNG', () => {
  it('produces identical streams from the same seed', () => {
    const a = new SeededRng('seed-1');
    const b = new SeededRng('seed-1');
    const drawsA = Array.from({ length: 50 }, () => a.d20());
    const drawsB = Array.from({ length: 50 }, () => b.d20());
    expect(drawsA).toEqual(drawsB);
  });

  it('produces different streams from different seeds', () => {
    const a = Array.from({ length: 50 }, (_, i) => new SeededRng('seed-1', i).d20());
    const b = Array.from({ length: 50 }, (_, i) => new SeededRng('seed-2', i).d20());
    expect(a).not.toEqual(b);
  });

  it('resumes exactly from a stored cursor, so a turn can be replayed', () => {
    const original = new SeededRng('seed-x');
    original.d20();
    original.d20();
    const nextFromOriginal = original.d20();
    const resumed = new SeededRng('seed-x', 2);
    expect(resumed.d20()).toBe(nextFromOriginal);
  });

  it('never exposes the seed through the audit hash', () => {
    const rng = new SeededRng('a-very-secret-seed');
    expect(rng.seedHash).toBe(sha256Hex('a-very-secret-seed'));
    expect(rng.seedHash).not.toContain('secret');
  });

  it('gives sibling branches independent roll lineages', () => {
    expect(deriveTurnSeed('root', 5, 'main')).not.toBe(deriveTurnSeed('root', 5, 'fork_a'));
  });

  it('stays in range across 20k draws', () => {
    const rng = new SeededRng('range-check');
    for (let i = 0; i < 20_000; i++) {
      const roll = rng.d20();
      expect(roll).toBeGreaterThanOrEqual(1);
      expect(roll).toBeLessThanOrEqual(20);
    }
  });
});

describe('check maths (spec §12.3, §12.5, §12.6)', () => {
  it.each([
    [6, -2],
    [10, 0],
    [11, 0],
    [14, 2],
    [18, 4],
    [3, -4],
  ])('attribute %i has modifier %i', (score, expected) => {
    expect(attributeModifier(score)).toBe(expected);
  });

  it('classifies every outcome band', () => {
    // A natural 20 is critical regardless of margin.
    expect(classifyOutcome(-3, 20, false)).toBe('CRITICAL_SUCCESS');
    expect(classifyOutcome(8, 12, false)).toBe('CRITICAL_SUCCESS');
    expect(classifyOutcome(3, 12, false)).toBe('CLEAN_SUCCESS');
    expect(classifyOutcome(0, 12, false)).toBe('SUCCESS');
    expect(classifyOutcome(2, 12, false)).toBe('SUCCESS');
    expect(classifyOutcome(-2, 12, true)).toBe('SUCCESS_WITH_COST');
    expect(classifyOutcome(-2, 12, false)).toBe('FAILURE');
    expect(classifyOutcome(-6, 12, true)).toBe('FAILURE');
    expect(classifyOutcome(-6, 1, true)).toBe('COMPLICATION');
  });

  it('never lets a natural 1 upgrade into a partial success', () => {
    expect(classifyOutcome(-2, 1, true)).toBe('FAILURE');
  });

  it('clamps advantage to ±2 and rolls the right number of dice', () => {
    expect(clampAdvantage(5)).toBe(2);
    expect(clampAdvantage(-9)).toBe(-2);
    const rng = new SeededRng('adv');
    expect(rollWithAdvantage(rng, 2).rolls).toHaveLength(3);
    expect(rollWithAdvantage(rng, -1).rolls).toHaveLength(2);
    expect(rollWithAdvantage(rng, 0).rolls).toHaveLength(1);
  });

  it('keeps highest on advantage and lowest on disadvantage', () => {
    for (let i = 0; i < 300; i++) {
      const up = rollWithAdvantage(new SeededRng(`s${i}`), 1);
      expect(up.keptRoll).toBe(Math.max(...up.rolls));
      const down = rollWithAdvantage(new SeededRng(`s${i}`), -1);
      expect(down.keptRoll).toBe(Math.min(...down.rolls));
    }
  });

  it('computes total as kept roll plus every modifier', () => {
    const check = resolveCheck(new SeededRng('math'), {
      checkId: 'c1',
      label: 'Test',
      attribute: 'arcana',
      attributeScore: 16, // +3
      skillProficiency: 2,
      equipmentModifier: 1,
      statusModifier: -1,
      situationalModifier: 1,
      dc: 15,
    });
    expect(check.modifier).toBe(3 + 2 + 1 - 1 + 1);
    expect(check.total).toBe(check.keptRoll + check.modifier);
    expect(check.margin).toBe(check.total - 15);
  });

  it('estimates risk monotonically as difficulty rises', () => {
    expect(estimateRisk(5, 3)).toBe('SAFE');
    expect(estimateRisk(12, 3)).toBe('UNCERTAIN');
    expect(estimateRisk(18, 3)).toBe('RISKY');
    expect(estimateRisk(25, 0)).toBe('EXTREME');
  });

  it('rates advantage as strictly safer than a flat roll', () => {
    const order = ['EXTREME', 'RISKY', 'UNCERTAIN', 'SAFE'];
    const flat = order.indexOf(estimateRisk(16, 2, 0));
    const withAdvantage = order.indexOf(estimateRisk(16, 2, 1));
    expect(withAdvantage).toBeGreaterThanOrEqual(flat);
  });
});

describe('initial state', () => {
  it('applies archetype bonuses and starting kit', () => {
    const state = baseState();
    // Scholar: mind 13 + 2, arcana 12 + 1.
    expect(state.player.attributes.mind).toBe(15);
    expect(state.player.attributes.arcana).toBe(13);
    expect(state.player.skills.arcana_lore).toBe(2);
    expect(countItem(state, 'sigil_pendant')).toBe(1);
    expect(countItem(state, 'ward_chalk')).toBe(2);
    expect(state.player.abilities).toContain('sigil_read');
    expect(state.player.abilities).not.toContain('veilstep');
  });

  it('places NPCs by their schedule, not all in one room', () => {
    const state = baseState(); // 08:10
    const mira = state.characters.find((c) => c.characterId === 'mira');
    const kael = state.characters.find((c) => c.characterId === 'kael');
    expect(mira?.locationId).toBe('lecture_hall');
    expect(kael?.locationId).toBe('gate_arch');
  });

  it('resolves schedule blocks by minute of day', () => {
    const mira = STORY.characters.find((c) => c.id === 'mira')!;
    expect(locationForSchedule(mira.schedule, 13 * 60)).toBe('archive_floor');
    expect(locationForSchedule(mira.schedule, 17 * 60)).toBe('rooftop');
    expect(locationForSchedule(mira.schedule, 3 * 60)).toBeNull();
  });
});

describe('mutation validation (spec §11.3 — the LLM cannot invent inventory)', () => {
  it('rejects an item the story never defined', () => {
    const state = baseState();
    const fabricated: StateMutation = {
      mutationId: 'm1',
      type: 'ITEM_ADD',
      subjectId: 'player',
      reasonCode: 'MODEL_HALLUCINATION',
      payload: { itemId: 'excalibur_of_infinite_power', quantity: 1 },
    };
    const { accepted, rejected } = validateMutations([fabricated], state, STORY);
    expect(accepted).toHaveLength(0);
    expect(rejected[0]?.reason).toContain('not defined by this story');
  });

  it('accepts an item the story does define', () => {
    const state = baseState();
    const { accepted } = validateMutations(
      [
        {
          mutationId: 'm1',
          type: 'ITEM_ADD',
          subjectId: 'player',
          reasonCode: 'QUEST_REWARD',
          payload: { itemId: 'reading_lens', quantity: 1 },
        },
      ],
      state,
      STORY,
    );
    expect(accepted).toHaveLength(1);
  });

  it('rejects unknown resources, characters, quests, factions, locations, and abilities', () => {
    const state = baseState();
    const bogus: StateMutation[] = [
      { mutationId: 'a', type: 'RESOURCE_DELTA', subjectId: 'player', reasonCode: 'x', payload: { resourceId: 'mana', amount: 5 } },
      { mutationId: 'b', type: 'RELATIONSHIP_DELTA', subjectId: 'nobody', reasonCode: 'x', payload: { dimension: 'trust', amount: 5 } },
      { mutationId: 'c', type: 'QUEST_TRANSITION', subjectId: 'q_nope', reasonCode: 'x', payload: { status: 'COMPLETED' } },
      { mutationId: 'd', type: 'FACTION_DELTA', subjectId: 'f_nope', reasonCode: 'x', payload: { amount: 10 } },
      { mutationId: 'e', type: 'LOCATION_CHANGE', subjectId: 'player', reasonCode: 'x', payload: { locationId: 'the_moon' } },
      { mutationId: 'f', type: 'ABILITY_UNLOCK', subjectId: 'player', reasonCode: 'x', payload: { abilityId: 'wish' } },
      { mutationId: 'g', type: 'TIME_ADVANCE', subjectId: 'session', reasonCode: 'x', payload: { minutes: -60 } },
    ];
    const { accepted, rejected } = validateMutations(bogus, state, STORY);
    expect(accepted).toHaveLength(0);
    expect(rejected).toHaveLength(7);
  });

  it('refuses to run world time backwards', () => {
    const state = baseState();
    const { rejected } = validateMutations(
      [{ mutationId: 'm', type: 'TIME_ADVANCE', subjectId: 'session', reasonCode: 'x', payload: { minutes: -1 } }],
      state,
      STORY,
    );
    expect(rejected[0]?.reason).toBe('time may not run backwards');
  });

  it('clamps resources to their bounds', () => {
    const state = baseState();
    const drained = applyMutations(state, STORY, [
      { mutationId: 'm', type: 'RESOURCE_DELTA', subjectId: 'player', reasonCode: 'x', payload: { resourceId: 'focus', amount: -9999 } },
    ]);
    expect(drained.player.resources.find((r) => r.id === 'focus')?.current).toBe(0);

    const overfilled = applyMutations(state, STORY, [
      { mutationId: 'm', type: 'RESOURCE_DELTA', subjectId: 'player', reasonCode: 'x', payload: { resourceId: 'focus', amount: 9999 } },
    ]);
    expect(overfilled.player.resources.find((r) => r.id === 'focus')?.current).toBe(20);
  });

  it('leaves the input snapshot untouched', () => {
    const state = baseState();
    const before = structuredClone(state);
    applyMutations(state, STORY, [
      { mutationId: 'm', type: 'RESOURCE_DELTA', subjectId: 'player', reasonCode: 'x', payload: { resourceId: 'focus', amount: -5 } },
    ]);
    expect(state).toEqual(before);
  });

  it('displaces the previous item in an equip slot', () => {
    let state = baseState();
    state = applyMutations(state, STORY, [
      { mutationId: 'a', type: 'ITEM_ADD', subjectId: 'player', reasonCode: 'x', payload: { itemId: 'reading_lens', quantity: 1 } },
    ]);
    const entryId = state.player.inventory.find((e) => e.itemId === 'reading_lens')!.entryId;
    state = applyMutations(state, STORY, [
      { mutationId: 'b', type: 'ITEM_UPDATE', subjectId: 'player', reasonCode: 'x', payload: { itemId: 'reading_lens', entryId, equipped: true } },
    ]);
    expect(state.player.inventory.filter((e) => e.equipped)).toHaveLength(1);
  });
});

describe('relationships (spec §14.2, §14.3)', () => {
  it('caps a single ordinary exchange at a few points', () => {
    const state = baseState();
    const clamped = clampRelationshipDelta(state, STORY, {
      characterId: 'mira',
      dimension: 'affection',
      delta: 90,
      severity: 'MINOR',
      reasonCode: 'persuade',
    });
    expect(clamped.appliedDelta).toBeLessThanOrEqual(2);
    expect(clamped.clampReason).toContain('severity cap');
  });

  it('allows a major event to move a dimension substantially', () => {
    const state = baseState();
    const clamped = clampRelationshipDelta(state, STORY, {
      characterId: 'mira',
      dimension: 'trust',
      delta: 18,
      severity: 'MAJOR',
      reasonCode: 'sacrifice',
    });
    expect(clamped.appliedDelta).toBe(18);
  });

  it('dampens repeated attempts on the same target', () => {
    const state = baseState();
    state.turnIndex = 10;
    const rel = getRelationship(state, 'mira')!;
    rel.lastChangedTurn = 10; // moved this very turn

    const clamped = clampRelationshipDelta(state, STORY, {
      characterId: 'mira',
      dimension: 'affection',
      delta: 4,
      severity: 'NOTABLE',
      reasonCode: 'persuade',
    });
    expect(clamped.appliedDelta).toBeLessThan(4);
    expect(clamped.clampReason).toContain('recency dampening');
  });

  it('resists warmth won by deception when the NPC values honesty', () => {
    const state = baseState();
    const clamped = clampRelationshipDelta(state, STORY, {
      characterId: 'mira', // values Honesty
      dimension: 'trust',
      delta: 4,
      severity: 'NOTABLE',
      reasonCode: 'deceive',
    });
    expect(clamped.clampReason).toContain('NPC values');
    expect(clamped.appliedDelta).toBeLessThan(4);
  });

  it('never pushes a dimension past its bounds', () => {
    const state = baseState();
    const rel = getRelationship(state, 'mira')!;
    rel.affection = 99;
    const clamped = clampRelationshipDelta(state, STORY, {
      characterId: 'mira',
      dimension: 'affection',
      delta: 20,
      severity: 'MAJOR',
      reasonCode: 'sacrifice',
    });
    expect(rel.affection + clamped.appliedDelta).toBe(100);
  });

  it('holds a romance gate shut until every predicate is met', () => {
    const state = baseState();
    const gate = STORY.characters.find((c) => c.id === 'mira')!.gates[0]!;
    const rel = getRelationship(state, 'mira')!;

    expect(isGateSatisfied(gate, rel, state)).toBe(false);

    rel.trust = 90; // thresholds alone are not enough
    expect(isGateSatisfied(gate, rel, state)).toBe(false);

    // The gate now hangs off the flag the rooftop payoff awards, because
    // nothing in the engine ever recorded an event called `mira_rooftop_truth`.
    state.flags.mira_trusts_you = true;
    expect(isGateSatisfied(gate, rel, state)).toBe(true);

    state.flags.mira_burned = true; // a flagsUnset requirement re-closes it
    expect(isGateSatisfied(gate, rel, state)).toBe(false);
  });

  it('reports qualitative labels rather than numbers', () => {
    const base = { characterId: 'x', trust: 0, affection: 0, respect: 0, fear: 0, rivalry: 0, lastChangedTurn: 0, unlockedGates: [] };
    expect(relationshipLabel({ ...base })).toBe('Wary');
    expect(relationshipLabel({ ...base, trust: 45 })).toBe('Trusted');
    expect(relationshipLabel({ ...base, trust: 60, affection: 75 })).toBe('Devoted');
    expect(relationshipLabel({ ...base, fear: 70 })).toBe('Afraid');
    expect(relationshipLabel({ ...base, rivalry: 60 })).toBe('Rival');
  });
});

describe('quests (spec §15.1)', () => {
  it('evaluates every predicate clause', () => {
    const state = baseState();
    expect(evaluatePredicate({ flagsSet: ['nope'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null }, state)).toBe(false);

    state.flags.yes = true;
    expect(evaluatePredicate({ flagsSet: ['yes'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null }, state)).toBe(true);

    expect(evaluatePredicate({ flagsSet: [], flagsUnset: [], hasItems: ['sigil_pendant'], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null }, state)).toBe(true);
    expect(evaluatePredicate({ flagsSet: [], flagsUnset: [], hasItems: ['ledger_page'], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null }, state)).toBe(false);
  });

  it('advances the opening quest when the player reaches the commons', () => {
    const state = baseState();
    expect(state.quests.find((q) => q.questId === 'q_red_ward')?.currentStepId).toBe('step_gate');

    // The gate is four routes now, and the cheapest of them is having actually
    // dealt with Kael and then walked through. Being in the Commons is no
    // longer, on its own, having got past him.
    state.flags['spoke:kael'] = true;
    state.player.locationId = 'commons';
    const transitions = advanceQuests(state, STORY);
    expect(transitions.some((t) => t.reasonCode === 'STEP_ADVANCED')).toBe(true);
    expect(state.quests.find((q) => q.questId === 'q_red_ward')?.currentStepId).toBe('step_find_mira');
  });

  it('discovers a gated quest only once its flag is set', () => {
    const state = baseState();
    expect(state.quests.find((q) => q.questId === 'q_ninth_shelf')?.status).toBe('UNAVAILABLE');
    state.flags.knows_erasure = true;
    advanceQuests(state, STORY);
    expect(state.quests.find((q) => q.questId === 'q_ninth_shelf')?.status).not.toBe('UNAVAILABLE');
  });

  it('surfaces the main quest as the top objective', () => {
    const state = baseState();
    expect(topObjective(state, STORY)).toBe('Get past Kael at the gate.');
  });
});

describe('resolveIntent (spec §12.1 determinism)', () => {
  it('names the real exits when the destination does not exist', () => {
    const state = baseState();
    const result = resolveIntent({
      story: STORY,
      state,
      intent: intent([
        {
          verb: 'travel',
          actor: player,
          // Nothing in the world is called this. The old refusal said only
          // "there is nowhere by that name", which told the player nothing and
          // left the writer with nothing true to say — so a live turn invented
          // a magical barrier to explain why the player could not leave.
          targets: [{ entityType: 'location', entityId: 'down_the_hill' }],
          method: 'walk back down the hill',
          declaredOutcome: null,
          timeIntent: 'NOW',
        },
      ]),
      turnId: 't_exits',
      seed: 'seed-exits',
    });

    const here = STORY.locations.find((l) => l.id === state.player.locationId)!;
    const exits = here.connections
      .map((edge) => STORY.locations.find((l) => l.id === edge.to)?.name)
      .filter((name): name is string => !!name);
    expect(exits.length).toBeGreaterThan(0);

    const observable = result.observableFacts.join(' ');
    for (const exit of exits) expect(observable).toContain(exit);

    // The writer is told not to invent a way to explain the refusal.
    const priv = result.privateFacts.map((f) => f.fact).join(' ');
    expect(priv).toMatch(/Invent no barrier and no new rule/);

    // A refusal still costs no world time.
    expect(result.timeAdvancedMinutes).toBe(0);
  });


  it('produces byte-identical resolutions from the same seed', () => {
    const state = baseState();
    const i = intent([
      {
        verb: 'persuade',
        actor: player,
        targets: [{ entityType: 'npc', entityId: 'kael' }],
        method: 'explain the ward is wrong',
        declaredOutcome: 'he lets me through',
        timeIntent: 'NOW',
      },
    ]);

    const a = resolveIntent({ story: STORY, state, intent: i, turnId: 't1', seed: 'seed-determinism' });
    const b = resolveIntent({ story: STORY, state, intent: i, turnId: 't1', seed: 'seed-determinism' });
    expect(a).toEqual(b);
  });

  it('records the seed hash rather than the seed', () => {
    const state = baseState();
    const result = resolveIntent({
      story: STORY,
      state,
      intent: intent([{ verb: 'inspect', actor: player, targets: [], method: 'look around', declaredOutcome: null, timeIntent: 'NOW' }]),
      turnId: 't1',
      seed: 'top-secret',
    });
    expect(result.rngSeedHash).toBe(sha256Hex('top-secret'));
    expect(JSON.stringify(result)).not.toContain('top-secret');
  });

  it('ignores a declared outcome the dice did not support', () => {
    const state = baseState();
    // Kael is at the gate with the player at 08:10, so the target is present.
    let sawFailure = false;
    for (let i = 0; i < 40 && !sawFailure; i++) {
      const result = resolveIntent({
        story: STORY,
        state,
        intent: intent([
          {
            verb: 'persuade',
            actor: player,
            targets: [{ entityType: 'npc', entityId: 'kael' }],
            method: 'insist',
            declaredOutcome: 'Kael apologises and hands me his sash',
            timeIntent: 'NOW',
          },
        ]),
        turnId: `t${i}`,
        seed: `seed-${i}`,
      });
      const check = result.checks[0];
      if (check && (check.outcome === 'FAILURE' || check.outcome === 'COMPLICATION')) {
        sawFailure = true;
        // Nothing in the resolution grants the declared outcome, and the writer
        // is explicitly told not to narrate it.
        expect(result.mutations.filter((m) => m.type === 'ITEM_ADD')).toHaveLength(0);
        expect(result.privateFacts.some((f) => /does not comply/i.test(f.fact))).toBe(true);
      }
    }
    expect(sawFailure).toBe(true);
  });

  it('refuses an ability the player has not unlocked', () => {
    const state = baseState(); // scholar: no veilstep
    const result = resolveIntent({
      story: STORY,
      state,
      intent: intent([
        {
          verb: 'use_ability',
          actor: player,
          targets: [],
          method: 'slip through the shadow',
          abilityId: 'veilstep',
          declaredOutcome: 'I cross unseen',
          timeIntent: 'NOW',
        },
      ]),
      turnId: 't1',
      seed: 's',
    });
    expect(result.normalizedActions[0]).toMatchObject({ status: 'REJECTED', reason: 'ABILITY_LOCKED' });
    expect(result.mutations).toHaveLength(0);
  });

  it('refuses an ability the player cannot pay for', () => {
    const state = baseState();
    state.player.abilities.push('veilstep');
    state.player.resources.find((r) => r.id === 'focus')!.current = 2;

    const result = resolveIntent({
      story: STORY,
      state,
      intent: intent([
        { verb: 'use_ability', actor: player, targets: [], method: 'veilstep', abilityId: 'veilstep', declaredOutcome: null, timeIntent: 'NOW' },
      ]),
      turnId: 't1',
      seed: 's',
    });
    expect(result.normalizedActions[0]).toMatchObject({ reason: 'INSUFFICIENT_RESOURCE' });
  });

  it('charges the ability cost even when the check fails', () => {
    const state = baseState();
    const result = resolveIntent({
      story: STORY,
      state,
      intent: intent([
        { verb: 'use_ability', actor: player, targets: [], method: 'read the ward', abilityId: 'sigil_read', declaredOutcome: null, timeIntent: 'NOW' },
      ]),
      turnId: 't1',
      seed: 'cost-seed',
    });
    expect(result.mutations.some((m) => m.type === 'RESOURCE_DELTA' && (m.payload as any).amount === -3)).toBe(true);
  });

  it('refuses an item the player does not hold', () => {
    const state = baseState();
    const result = resolveIntent({
      story: STORY,
      state,
      intent: intent([
        { verb: 'use_item', actor: player, targets: [], method: 'drink it', itemId: 'bramble_tonic', declaredOutcome: null, timeIntent: 'NOW' },
      ]),
      turnId: 't1',
      seed: 's',
    });
    expect(result.normalizedActions[0]).toMatchObject({ reason: 'ITEM_NOT_HELD' });
  });

  it('refuses travel with no authored route', () => {
    const state = baseState(); // at the gate
    const result = resolveIntent({
      story: STORY,
      state,
      intent: intent([
        {
          verb: 'travel',
          actor: player,
          targets: [{ entityType: 'location', entityId: 'archive_stacks' }],
          method: 'walk there',
          declaredOutcome: null,
          timeIntent: 'NOW',
        },
      ]),
      turnId: 't1',
      seed: 's',
    });
    expect(result.normalizedActions[0]).toMatchObject({ reason: 'NO_ROUTE' });
  });

  it('refuses travel through a locked route until the flag is set', () => {
    const state = baseState();
    state.player.locationId = 'archive_floor';
    const travel = intent([
      {
        verb: 'travel',
        actor: player,
        targets: [{ entityType: 'location', entityId: 'archive_stacks' }],
        method: 'go into the stacks',
        declaredOutcome: null,
        timeIntent: 'NOW',
      },
    ]);

    expect(
      resolveIntent({ story: STORY, state, intent: travel, turnId: 't1', seed: 's' }).normalizedActions[0],
    ).toMatchObject({ reason: 'ROUTE_LOCKED' });

    state.flags.stacks_access = true;
    expect(
      resolveIntent({ story: STORY, state, intent: travel, turnId: 't2', seed: 's' }).normalizedActions[0],
    ).toMatchObject({ status: 'RESOLVED' });
  });

  it('refuses to address someone who is not in the room', () => {
    const state = baseState(); // gate at 08:10; Mira is in lectures
    const result = resolveIntent({
      story: STORY,
      state,
      intent: intent([
        {
          verb: 'persuade',
          actor: player,
          targets: [{ entityType: 'npc', entityId: 'mira' }],
          method: 'ask her about the ward',
          declaredOutcome: null,
          timeIntent: 'NOW',
        },
      ]),
      turnId: 't1',
      seed: 's',
    });
    expect(result.normalizedActions[0]).toMatchObject({ reason: 'TARGET_ABSENT' });
  });

  it('advances world time by the action time cost', () => {
    const state = baseState();
    const result = resolveIntent({
      story: STORY,
      state,
      intent: intent([
        {
          verb: 'travel',
          actor: player,
          targets: [{ entityType: 'location', entityId: 'commons' }],
          method: 'walk in',
          declaredOutcome: null,
          timeIntent: 'NOW',
        },
      ]),
      turnId: 't1',
      seed: 's',
    });
    expect(result.timeAdvancedMinutes).toBe(4);
    expect(result.mutations.some((m) => m.type === 'TIME_ADVANCE')).toBe(true);
  });

  it('only offers opportunities that actually exist', () => {
    const state = baseState();
    const result = resolveIntent({
      story: STORY,
      state,
      intent: intent([{ verb: 'wait', actor: player, targets: [], method: 'wait', declaredOutcome: null, timeIntent: 'NOW' }]),
      turnId: 't1',
      seed: 's',
    });
    // Kael is at the gate; Mira is not.
    expect(result.newOpportunities).toContain('speak_to:kael');
    expect(result.newOpportunities).not.toContain('speak_to:mira');
    // Veilstep is locked for the scholar archetype.
    expect(result.newOpportunities).not.toContain('use_ability:veilstep');
    expect(result.newOpportunities).toContain('use_ability:sigil_read');
    // The stacks are not reachable from the gate.
    expect(result.newOpportunities).not.toContain('travel_to:archive_stacks');
    expect(result.newOpportunities).toContain('travel_to:commons');
  });
});

describe('commitTurn', () => {
  it('advances revision and turn index exactly once', () => {
    const state = baseState();
    const resolution = resolveIntent({
      story: STORY,
      state,
      intent: intent([{ verb: 'inspect', actor: player, targets: [], method: 'look', declaredOutcome: null, timeIntent: 'NOW' }]),
      turnId: 't1',
      seed: 's',
    });
    const result = commitTurn({ story: STORY, state, resolution, turnId: 't1' });
    expect(result.state.revision).toBe(state.revision + 1);
    expect(result.state.turnIndex).toBe(state.turnIndex + 1);
  });

  it('drops fabricated mutations while committing legitimate ones', () => {
    const state = baseState();
    const resolution = resolveIntent({
      story: STORY,
      state,
      intent: intent([{ verb: 'inspect', actor: player, targets: [], method: 'look', declaredOutcome: null, timeIntent: 'NOW' }]),
      turnId: 't1',
      seed: 's',
    });
    const result = commitTurn({
      story: STORY,
      state,
      resolution,
      turnId: 't1',
      extraMutations: [
        { mutationId: 'bad', type: 'ITEM_ADD', subjectId: 'player', reasonCode: 'director_overreach', payload: { itemId: 'crown_of_kings', quantity: 1 } },
        { mutationId: 'good', type: 'FLAG_SET', subjectId: 'session', reasonCode: 'director', payload: { flag: 'met_kael', value: true } },
      ],
    });
    expect(result.rejectedMutations).toHaveLength(1);
    expect(result.state.flags.met_kael).toBe(true);
    expect(countItem(result.state, 'crown_of_kings')).toBe(0);
  });

  it('moves NPCs along their schedules as time passes', () => {
    const state = baseState(); // 08:10
    state.player.locationId = 'commons';
    const resolution = resolveIntent({
      story: STORY,
      state,
      intent: intent([{ verb: 'rest', actor: player, targets: [], method: 'wait out the morning', declaredOutcome: null, timeIntent: 'NOW' }]),
      turnId: 't1',
      seed: 's',
    });
    const result = commitTurn({ story: STORY, state, resolution, turnId: 't1' });
    // Rest is 4 hours: 08:10 -> 12:10, when Mira moves to the commons.
    expect(result.state.worldMinute).toBe(state.worldMinute + 240);
    expect(result.state.characters.find((c) => c.characterId === 'mira')?.locationId).toBe('commons');
  });

  it('grants quest rewards through the validated path when a step completes', () => {
    const state = baseState();
    // Past the gate, and the archivist has actually been spoken to. Both steps
    // are routed now, so the flags are what the routes themselves set.
    state.flags['spoke:kael'] = true;
    state.flags['spoke:mira'] = true;
    state.player.locationId = 'commons';
    const resolution = resolveIntent({
      story: STORY,
      state,
      intent: intent([{ verb: 'wait', actor: player, targets: [], method: 'wait', declaredOutcome: null, timeIntent: 'NOW' }]),
      turnId: 't1',
      seed: 's',
    });
    const result = commitTurn({ story: STORY, state, resolution, turnId: 't1' });
    expect(result.state.flags.through_the_gate).toBe(true);
    expect(result.state.player.xp).toBeGreaterThan(0);
  });

  it('regenerates resources as world time passes', () => {
    const state = baseState();
    state.player.resources.find((r) => r.id === 'focus')!.current = 5;
    const resolution = resolveIntent({
      story: STORY,
      state,
      intent: intent([{ verb: 'inspect', actor: player, targets: [], method: 'read the arch', declaredOutcome: null, timeIntent: 'NOW' }]),
      turnId: 't1',
      seed: 's',
    });
    const committed = commitTurn({ story: STORY, state, resolution, turnId: 't1' });
    // Suspicion regenerates negatively — it decays when you are not being noticed.
    expect(committed.state.player.resources.find((r) => r.id === 'suspicion')!.current).toBeLessThanOrEqual(15);
  });
});

describe('combat (spec §13.5, §13.6)', () => {
  it('reports enemy condition qualitatively, never as numbers', () => {
    const make = (health: number) => ({
      entityId: 'k', kind: 'NPC' as const, team: 'ENEMY' as const, initiative: 0,
      health, maxHealth: 20, zoneId: 'far', statuses: [], downed: false,
    });
    expect(qualitativeHealth(make(20))).toBe('Unhurt');
    expect(qualitativeHealth(make(15))).toBe('Grazed');
    expect(qualitativeHealth(make(9))).toBe('Wounded');
    expect(qualitativeHealth(make(4))).toBe('Badly hurt');
    expect(qualitativeHealth(make(1))).toBe('Barely standing');
    expect(qualitativeHealth({ ...make(0), downed: true })).toBe('Down');
  });

  it('opens an encounter on the first strike', () => {
    const state = baseState();
    const result = resolveIntent({
      story: STORY,
      state,
      intent: intent([
        { verb: 'attack', actor: player, targets: [{ entityType: 'npc', entityId: 'kael' }], method: 'swing', declaredOutcome: null, timeIntent: 'NOW' },
      ]),
      turnId: 't1',
      seed: 's',
    });
    expect(result.mutations.some((m) => m.type === 'ENCOUNTER_START')).toBe(true);
  });

  it('enforces the round economy once combat has started', () => {
    let state = baseState();
    const opening = resolveIntent({
      story: STORY,
      state,
      intent: intent([
        { verb: 'attack', actor: player, targets: [{ entityType: 'npc', entityId: 'kael' }], method: 'swing', declaredOutcome: null, timeIntent: 'NOW' },
      ]),
      turnId: 't1',
      seed: 's',
    });
    state = commitTurn({ story: STORY, state, resolution: opening, turnId: 't1' }).state;
    expect(state.encounter).not.toBeNull();

    // Three Major actions in one sentence: only the first can land this round.
    const greedy = resolveIntent({
      story: STORY,
      state,
      intent: intent([
        { verb: 'attack', actor: player, targets: [{ entityType: 'npc', entityId: 'kael' }], method: 'strike', declaredOutcome: null, timeIntent: 'NOW' },
        { verb: 'attack', actor: player, targets: [{ entityType: 'npc', entityId: 'kael' }], method: 'strike again', declaredOutcome: null, timeIntent: 'NOW' },
        { verb: 'steal', actor: player, targets: [{ entityType: 'npc', entityId: 'kael' }], method: 'take his sash', declaredOutcome: null, timeIntent: 'NOW' },
      ]),
      turnId: 't2',
      seed: 's2',
    });
    const deferred = greedy.normalizedActions.filter((a) => (a as any).status === 'DEFERRED');
    expect(deferred).toHaveLength(2);
    expect(greedy.privateFacts.some((f) => /Deferred this round/.test(f.fact))).toBe(true);
  });

  it('applies the story defeat mode rather than ending the run', () => {
    let state = baseState();
    const opening = resolveIntent({
      story: STORY,
      state,
      intent: intent([
        { verb: 'attack', actor: player, targets: [{ entityType: 'npc', entityId: 'kael' }], method: 'swing', declaredOutcome: null, timeIntent: 'NOW' },
      ]),
      turnId: 't1',
      seed: 's',
    });
    state = commitTurn({ story: STORY, state, resolution: opening, turnId: 't1' }).state;

    // Force the player down; The Ninth Archive is FAIL_FORWARD.
    state.encounter!.participants.find((p) => p.entityId === 'player')!.health = 0;
    state.encounter!.participants.find((p) => p.entityId === 'player')!.downed = true;

    const next = resolveIntent({
      story: STORY,
      state,
      intent: intent([{ verb: 'defend', actor: player, targets: [], method: 'brace', declaredOutcome: null, timeIntent: 'NOW' }]),
      turnId: 't2',
      seed: 's2',
    });
    const result = commitTurn({ story: STORY, state, resolution: next, turnId: 't2' });

    expect(result.defeat.occurred).toBe(true);
    expect(result.state.encounter).toBeNull();
    expect(result.state.flags.player_dead).toBeUndefined();
    expect(result.state.player.statuses.some((s) => s.id === 'wounded')).toBe(true);
  });
});

describe('relationship labels say something', () => {
  it('tells four different starting relationships apart', () => {
    // The bug: a single catch-all meant Juno, Teo, Nadia and Cass all read
    // "Familiar" on the panel whose whole job is telling them apart.
    const labels = NINE_WEEKS.characters.map((c) => ({
      name: c.name,
      label: relationshipLabel({
        characterId: c.id,
        ...c.startingRelationship,
        unlockedGates: [],
        lastChangedTurn: -1,
      }),
    }));

    const distinct = new Set(labels.map((l) => l.label));
    expect(distinct.size, JSON.stringify(labels)).toBeGreaterThanOrEqual(3);

    // Liked and not yet trusted is the specific shape this story is about.
    expect(labels.find((l) => l.name === 'Juno Vale')?.label).toBe('Complicated');
  });

  it('only ever returns a label the UI knows about', () => {
    const sample = (over: Partial<Record<string, number>>) =>
      relationshipLabel({
        characterId: 'x',
        trust: 0,
        affection: 0,
        respect: 0,
        fear: 0,
        rivalry: 0,
        unlockedGates: [],
        lastChangedTurn: -1,
        ...over,
      } as Parameters<typeof relationshipLabel>[0]);

    const seen = new Set<string>();
    for (const dimension of ['trust', 'affection', 'respect', 'fear', 'rivalry']) {
      for (let value = -100; value <= 100; value += 5) seen.add(sample({ [dimension]: value }));
    }
    seen.add(sample({ affection: 80, trust: 60 }));
    seen.add(sample({ affection: 50, trust: 35 }));

    for (const label of seen) {
      expect(RELATIONSHIP_LABELS as readonly string[]).toContain(label);
    }
  });
});

describe('waiting actually moves the world', () => {
  const waitIntent = (
    targets: { entityType: 'npc'; entityId: string }[] = [],
    method = 'wait',
  ) =>
    intent([
      {
        verb: 'wait',
        actor: player,
        targets,
        method,
        declaredOutcome: null,
        timeIntent: 'NOW',
      },
    ]);

  it('advances to the next moment something is different', () => {
    // The bug: "I wait until after service" advanced the clock by six minutes,
    // so a player could not wait for anything and every authored schedule was
    // unreachable by the one action that exists to reach it.
    //
    // The method carries the player's own words now, because a *qualified*
    // wait — until, till, for, while — is the one that has to be able to cross
    // hours. A bare "I wait" with people standing in front of you is a pause;
    // see the sibling case below. That distinction came out of a live session
    // where an unqualified wait took a handshake from four in the afternoon to
    // eight at night and moved the whole gym along with it.
    const state = baseState();
    const result = resolveIntent({
      story: STORY,
      state,
      intent: waitIntent([], 'wait until after service'),
      turnId: 't_wait',
      seed: 'wait-seed',
    });

    expect(result.timeAdvancedMinutes).toBeGreaterThan(TIME_COST_MINUTES.BRIEF);
    expect(result.timeAdvancedMinutes).toBeLessThanOrEqual(8 * 60);

    // It lands exactly on a boundary in somebody's day, not on a round number.
    const landing = ((state.worldMinute + result.timeAdvancedMinutes) % 1440 + 1440) % 1440;
    const boundaries = new Set<number>();
    for (const character of STORY.characters) {
      for (const block of character.schedule) {
        boundaries.add(block.startMinute);
        boundaries.add(block.endMinute);
      }
    }
    expect(boundaries.has(landing)).toBe(true);
  });

  it('waits for the person you named, not just for anything', () => {
    const state = baseState();
    const mira = STORY.characters.find((c) => c.id === 'mira')!;

    const result = resolveIntent({
      story: STORY,
      state,
      intent: waitIntent([{ entityType: 'npc', entityId: 'mira' }]),
      turnId: 't_wait_mira',
      seed: 'wait-seed',
    });

    const landing = ((state.worldMinute + result.timeAdvancedMinutes) % 1440 + 1440) % 1440;
    const hers = new Set(mira.schedule.flatMap((b) => [b.startMinute, b.endMinute]));
    expect(hers.has(landing)).toBe(true);
    expect(result.observableFacts.join(' ')).toContain(mira.name);
  });

  it('never swallows a whole day in one turn', () => {
    const state = baseState();
    // Somewhere with nothing scheduled ahead of it for a long time.
    state.worldMinute = 3 * 60;
    const result = resolveIntent({
      story: STORY,
      state,
      intent: waitIntent(),
      turnId: 't_wait_long',
      seed: 'wait-seed',
    });
    expect(result.timeAdvancedMinutes).toBeLessThanOrEqual(8 * 60);
  });
});

describe('world clock', () => {
  it('formats the header label', () => {
    expect(formatWorldTime(8 * 60 + 10)).toBe('Day 1 · 8:10 AM');
    expect(formatWorldTime(1440 + 13 * 60 + 5)).toBe('Day 2 · 1:05 PM');
    expect(formatWorldTime(0)).toBe('Day 1 · 12:00 AM');
    expect(formatWorldTime(12 * 60)).toBe('Day 1 · 12:00 PM');
  });

  it('counts days from minute zero', () => {
    expect(dayNumber(0)).toBe(1);
    expect(dayNumber(1439)).toBe(1);
    expect(dayNumber(1440)).toBe(2);
  });
});

// --- Property tests (spec §40.1) -------------------------------------------

describe('property: engine invariants hold across many random turns', () => {
  const VERBS = ['inspect', 'hide', 'interact', 'wait', 'defend', 'help', 'oppose', 'custom'] as const;

  it('never produces an out-of-range roll, a negative resource, or a backwards clock', () => {
    let state = baseState();
    for (let i = 0; i < 400; i++) {
      const rng = new SeededRng(`prop-${i}`);
      const verb = VERBS[rng.int(0, VERBS.length - 1)]!;
      const before = state.worldMinute;

      const resolution = resolveIntent({
        story: STORY,
        state,
        intent: intent([
          { verb, actor: player, targets: [], method: `attempt ${i}`, declaredOutcome: null, timeIntent: 'NOW' },
        ]),
        turnId: `pt${i}`,
        seed: `prop-seed-${i}`,
      });

      for (const check of resolution.checks) {
        for (const roll of check.rolls) {
          expect(roll).toBeGreaterThanOrEqual(1);
          expect(roll).toBeLessThanOrEqual(20);
        }
        expect(check.rolls).toContain(check.keptRoll);
        expect(check.total).toBe(check.keptRoll + check.modifier);
        expect(check.margin).toBe(check.total - check.dc);
        expect(Math.abs(check.advantageLevel ?? 0)).toBeLessThanOrEqual(2);
      }

      state = commitTurn({ story: STORY, state, resolution, turnId: `pt${i}` }).state;

      expect(state.worldMinute).toBeGreaterThanOrEqual(before);
      for (const resource of state.player.resources) {
        expect(resource.current).toBeGreaterThanOrEqual(0);
        expect(resource.current).toBeLessThanOrEqual(resource.max);
      }
      for (const rel of state.relationships) {
        expect(rel.trust).toBeGreaterThanOrEqual(-100);
        expect(rel.trust).toBeLessThanOrEqual(100);
        expect(rel.fear).toBeGreaterThanOrEqual(0);
        expect(rel.rivalry).toBeGreaterThanOrEqual(0);
      }
      expect(state.player.inventory.every((e) => e.quantity > 0)).toBe(true);
    }

    expect(state.turnIndex).toBe(400);
    expect(state.revision).toBe(400);
  });

  it('replays a whole session identically from the same seeds', () => {
    const run = (): GameState => {
      let state = baseState();
      for (let i = 0; i < 25; i++) {
        const resolution = resolveIntent({
          story: STORY,
          state,
          intent: intent([
            { verb: 'inspect', actor: player, targets: [], method: `look ${i}`, declaredOutcome: null, timeIntent: 'NOW' },
          ]),
          turnId: `r${i}`,
          seed: deriveTurnSeed('root-seed', i),
        });
        state = commitTurn({ story: STORY, state, resolution, turnId: `r${i}`, now: () => '2026-09-09T00:00:00.000Z' }).state;
      }
      return state;
    };
    expect(run()).toEqual(run());
  });
});

describe('NPC turns (spec §13.3 — the other side of the round)', () => {
  const fight = (seed: string, turns = 1) => {
    let state = baseState();
    let last;
    for (let i = 0; i < turns; i++) {
      const resolution = resolveIntent({
        story: STORY,
        state,
        intent: intent([
          { verb: 'attack', actor: player, targets: [{ entityType: 'npc', entityId: 'kael' }], method: 'swing', declaredOutcome: null, timeIntent: 'NOW' },
        ]),
        turnId: `t${i}`,
        seed: `${seed}-${i}`,
      });
      last = commitTurn({ story: STORY, state, resolution, turnId: `t${i}` });
      state = last.state;
      if (!state.encounter) break;
    }
    return { state, commit: last! };
  };

  it('gives the enemy a turn with the same dice the player uses', () => {
    let sawEnemyAction = false;
    for (let i = 0; i < 12 && !sawEnemyAction; i++) {
      const state = baseState();
      const resolution = resolveIntent({
        story: STORY, state,
        intent: intent([
          { verb: 'attack', actor: player, targets: [{ entityType: 'npc', entityId: 'kael' }], method: 'swing', declaredOutcome: null, timeIntent: 'NOW' },
        ]),
        turnId: 't', seed: `npc-${i}`,
      });
      if (resolution.mutations.some((m) => m.reasonCode.startsWith('NPC_'))) sawEnemyAction = true;
    }
    expect(sawEnemyAction).toBe(true);
  });

  it('does not apply damage twice for a single missed swing', () => {
    const state = baseState();
    const resolution = resolveIntent({
      story: STORY, state,
      intent: intent([
        { verb: 'attack', actor: player, targets: [{ entityType: 'npc', entityId: 'kael' }], method: 'swing', declaredOutcome: null, timeIntent: 'NOW' },
      ]),
      turnId: 't', seed: 'double-damage',
    });
    // The old stopgap counterattack plus a real NPC turn hit the player twice.
    expect(resolution.mutations.filter((m) => m.reasonCode === 'COUNTERATTACK')).toHaveLength(0);
    const playerHits = resolution.mutations.filter(
      (m) => m.type === 'RESOURCE_DELTA' && m.subjectId === 'player' && (m.payload as { resourceId?: string }).resourceId === 'health',
    );
    expect(playerHits.length).toBeLessThanOrEqual(1);
  });

  it('keeps the encounter alive across rounds', () => {
    // The aliasing bug made ENCOUNTER_START share a reference with its payload,
    // so replaying mutations compounded damage and ended the fight instantly.
    const { state } = fight('survive', 2);
    expect(state.encounter).not.toBeNull();
    const health = state.player.resources.find((r) => r.id === 'health')!;
    expect(health.current).toBeGreaterThan(0);
  });

  it('lets an authored role drive tactics rather than a model', () => {
    const state = baseState();
    const resolution = resolveIntent({
      story: STORY, state,
      intent: intent([
        { verb: 'attack', actor: player, targets: [{ entityType: 'npc', entityId: 'kael' }], method: 'swing', declaredOutcome: null, timeIntent: 'NOW' },
      ]),
      turnId: 't', seed: 'tactics',
    });
    const committed = commitTurn({ story: STORY, state, resolution, turnId: 't' }).state;

    // Kael is a prefect; hurt him and he escalates procedurally, not physically.
    const hurt = structuredClone(committed);
    const kael = hurt.encounter!.participants.find((p) => p.entityId === 'kael')!;
    kael.health = Math.floor(kael.maxHealth * 0.5);

    expect(chooseNpcAction(STORY, hurt.encounter!, 'kael')).toBe('CALL_FOR_HELP');
    // Once help is coming, they stop shouting and fight or withdraw.
    expect(chooseNpcAction(STORY, hurt.encounter!, 'kael', true)).not.toBe('CALL_FOR_HELP');
  });

  it('surrenders rather than fighting to the death when the story allows it', () => {
    const state = baseState();
    const resolution = resolveIntent({
      story: STORY, state,
      intent: intent([
        { verb: 'attack', actor: player, targets: [{ entityType: 'npc', entityId: 'kael' }], method: 'swing', declaredOutcome: null, timeIntent: 'NOW' },
      ]),
      turnId: 't', seed: 'surrender',
    });
    const committed = commitTurn({ story: STORY, state, resolution, turnId: 't' }).state;

    const nearlyDown = structuredClone(committed);
    const kael = nearlyDown.encounter!.participants.find((p) => p.entityId === 'kael')!;
    kael.health = 1;
    expect(chooseNpcAction(STORY, nearlyDown.encounter!, 'kael')).toBe('SURRENDER');
  });
});

describe('scene invalidation (spec §16.5)', () => {
  it('abandons the planned beat when the player breaks the scene', () => {
    const state = baseState();
    state.arc.pacingStage = 'CHOICES';
    state.arc.tensionScore = 0.3;

    const resolution = resolveIntent({
      story: STORY, state,
      intent: intent([
        { verb: 'attack', actor: player, targets: [{ entityType: 'npc', entityId: 'kael' }], method: 'swing', declaredOutcome: null, timeIntent: 'NOW' },
      ]),
      turnId: 't', seed: 'broken-scene',
    });
    const committed = commitTurn({ story: STORY, state, resolution, turnId: 't' }).state;

    // The director does not resume a plan that assumed a conversation.
    expect(committed.arc.pacingStage).toBe('CONSEQUENCE');
    expect(committed.arc.tensionScore).toBeGreaterThan(0.3);
  });

  it('leaves pacing alone for an ordinary turn', () => {
    const state = baseState();
    state.arc.pacingStage = 'CHOICES';

    const resolution = resolveIntent({
      story: STORY, state,
      intent: intent([{ verb: 'inspect', actor: player, targets: [], method: 'look', declaredOutcome: null, timeIntent: 'NOW' }]),
      turnId: 't', seed: 'ordinary',
    });
    const committed = commitTurn({ story: STORY, state, resolution, turnId: 't' }).state;
    expect(committed.arc.pacingStage).not.toBe('CONSEQUENCE');
  });
});

describe('branching (a story that is actually yours)', () => {
  /** Puts the player in the stacks having taken one specific route. */
  const enterStacksVia = (route: 'mira' | 'bram' | 'force'): GameState => {
    const state = baseState();
    state.flags.knows_erasure = true;
    advanceQuests(state, STORY);
    state.player.locationId = 'archive_stacks';

    if (route === 'mira') {
      state.relationships.find((r) => r.characterId === 'mira')!.trust = 40;
    } else if (route === 'bram') {
      state.player.inventory.push({
        entryId: 'inv_key', itemId: 'stack_key', quantity: 1, equipped: false, instanceName: null,
      });
    } else {
      state.flags.forced_the_stacks = true;
    }
    return state;
  };

  it('completes the same step through three genuinely different routes', () => {
    for (const route of ['mira', 'bram', 'force'] as const) {
      const state = enterStacksVia(route);
      const transitions = advanceQuests(state, STORY);
      const advanced = transitions.find((t) => t.stepId === 'step_ledger' || t.routeId);
      expect(advanced, `route ${route} did not open the step`).toBeDefined();
    }
  });

  it('records which route was taken and what it closed off', () => {
    const state = enterStacksVia('bram');
    const transitions = advanceQuests(state, STORY);
    const routed = transitions.find((t) => t.routeId);

    expect(routed?.routeId).toBe('bram_key');
    expect(routed?.setsFlags).toContain('bram_has_leverage');
    // Buying a key means Mira never had to take the risk.
    expect(routed?.closesFlags).toContain('mira_took_a_risk');
  });

  it('gives different players different downstream stories', () => {
    const played = (route: 'mira' | 'bram' | 'force') => {
      let state = enterStacksVia(route);
      const resolution = resolveIntent({
        story: STORY, state,
        intent: intent([{ verb: 'inspect', actor: player, targets: [], method: 'look', declaredOutcome: null, timeIntent: 'NOW' }]),
        turnId: 't', seed: `branch-${route}`,
      });
      state = commitTurn({ story: STORY, state, resolution, turnId: 't' }).state;
      // Quests that only exist because of the route taken.
      return state.quests
        .filter((q) => q.status !== 'UNAVAILABLE')
        .map((q) => q.questId)
        .sort();
    };

    const viaMira = played('mira');
    const viaForce = played('force');

    expect(viaMira).toContain('q_owed_favour');
    expect(viaMira).not.toContain('q_wards_watching');
    expect(viaForce).toContain('q_wards_watching');
    expect(viaForce).not.toContain('q_owed_favour');
    // The two runs are genuinely different stories, not the same one reskinned.
    expect(viaMira).not.toEqual(viaForce);
  });

  it('leaves a route closed once another was taken', () => {
    let state = enterStacksVia('force');
    const resolution = resolveIntent({
      story: STORY, state,
      intent: intent([{ verb: 'inspect', actor: player, targets: [], method: 'look', declaredOutcome: null, timeIntent: 'NOW' }]),
      turnId: 't', seed: 'closed',
    });
    state = commitTurn({ story: STORY, state, resolution, turnId: 't' }).state;

    expect(state.flags['route:q_ninth_shelf:broke_in']).toBe(true);
    expect(state.flags['closed:mira_took_a_risk']).toBe(true);
    expect(state.flags.wards_flagged_you).toBe(true);
  });
});

/**
 * The words on a check chip.
 *
 * `resolveIntent` built these by concatenation — `Strike ${name}`, `Take
 * ${item}`, a `SOCIAL_LABEL` table, a `labelForVerb` table — so a French
 * session rolled "Strike Sasuke" and carried a status called "Shaken". They
 * reach the player twice, on the Session check chip and in the WorldSheet
 * status list, and neither screen could do anything about it.
 *
 * Asserted in both languages, because the English half is what silently
 * regresses when somebody adds the French.
 */
describe('check labels are in the language the session is played in', () => {
  const fr = (): GameState => ({ ...baseState(), locale: 'fr' });

  const persuadeKael = intent([
    {
      verb: 'persuade',
      actor: player,
      targets: [{ entityType: 'npc', entityId: 'kael' }],
      method: 'explain the ward is wrong',
      declaredOutcome: 'he lets me through',
      timeIntent: 'NOW',
    },
  ]);

  it('names a social check after the person it is aimed at', () => {
    const en = resolveIntent({ story: STORY, state: baseState(), intent: persuadeKael, turnId: 't', seed: 's' });
    const label = en.checks[0]?.label;
    expect(label).toMatch(/^Persuade /);

    const french = resolveIntent({ story: STORY, state: fr(), intent: persuadeKael, turnId: 't', seed: 's' });
    expect(french.checks[0]?.label).toMatch(/^Persuader /);
    // The person's name is not a word to translate.
    expect(french.checks[0]?.label).toBe(label?.replace('Persuade ', 'Persuader '));
  });

  it('translates a verb check with no target', () => {
    const look = intent([
      { verb: 'inspect', actor: player, targets: [], method: 'look around', declaredOutcome: '', timeIntent: 'NOW' },
    ]);
    const en = resolveIntent({ story: STORY, state: baseState(), intent: look, turnId: 't', seed: 's' });
    const french = resolveIntent({ story: STORY, state: fr(), intent: look, turnId: 't', seed: 's' });
    if (en.checks[0]) {
      expect(en.checks[0].label).toBe('Investigate');
      expect(french.checks[0]?.label).toBe('Enquête');
    }
  });

  it('rolls the same dice in both languages', () => {
    const en = resolveIntent({ story: STORY, state: baseState(), intent: persuadeKael, turnId: 't', seed: 'same' });
    const french = resolveIntent({ story: STORY, state: fr(), intent: persuadeKael, turnId: 't', seed: 'same' });
    expect(french.checks[0]?.rolls).toEqual(en.checks[0]?.rolls);
    expect(french.checks[0]?.outcome).toBe(en.checks[0]?.outcome);
    expect(french.checks[0]?.total).toBe(en.checks[0]?.total);
  });
});
