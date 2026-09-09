import { describe, expect, it } from 'vitest';
import type { BeatPlan, Resolution, StateMutation } from '@aniplay/contracts';
import { createInitialState, resolveIntent } from '@aniplay/engine';
import { NINTH_ARCHIVE } from '@aniplay/test-fixtures';
import { buildTurnContext } from './context.js';
import { RuleBasedDirector } from './director.js';
import { reconcilePlan } from './model-stages.js';

/**
 * What the engine decides is not the model's to decide.
 *
 * `ModelDirector` returned `{ ...result.value }`, so everything the rule-based
 * director computes deterministically existed only in the fallback — which in
 * production runs solely when the model errors. Four guarantees were silently
 * dead in the shipped path, including the record of the player having attacked
 * somebody, which is why the sweep kept reporting FORGOT_VIOLENCE.
 *
 * These tests are the invariant, not the fix: they fail if anyone adds a field
 * the model is allowed to overwrite when the engine already knows the answer.
 */

const director = new RuleBasedDirector();

const state = () =>
  createInitialState({
    sessionId: 'sess_r',
    story: NINTH_ARCHIVE,
    identity: {
      displayName: 'Sora', pronouns: 'they/them', ageBand: null,
      archetypeId: 'arch_duelist', worldKnowsAboutYou: '',
      advanced: {}, portraitAssetId: null,
    },
  });

/** A turn in which the player attacked somebody who is standing right there. */
function violentTurn(): { context: ReturnType<typeof buildTurnContext>; resolution: Resolution } {
  const s = state();
  s.characters.find((c) => c.characterId === 'kael')!.locationId = s.player.locationId;
  const resolution = resolveIntent({
    story: NINTH_ARCHIVE,
    state: s,
    turnId: 't',
    seed: 'violent',
    intent: {
      schemaVersion: '1.0', intentId: 'i', rawAction: 'I attack Kael.', dialogue: [],
      confidence: 0.9, ambiguities: [], unsafeOrMetaRequests: [],
      actions: [{
        verb: 'attack', actor: { entityType: 'player', entityId: 'player' },
        targets: [{ entityType: 'npc', entityId: 'kael' }],
        method: 'attack', declaredOutcome: '', timeIntent: 'NOW',
      }],
    },
  });
  return {
    context: buildTurnContext({
      story: NINTH_ARCHIVE, state: s, resolution, tier: 'VIVID',
      memories: [], recentTurns: [], actionText: 'I attack Kael.',
    }),
    resolution,
  };
}

/** What a model might plausibly return: plausible, and missing the guarantees. */
function modelPlan(rules: BeatPlan): BeatPlan {
  return {
    ...rules,
    memoryProposals: [
      {
        subjectId: 'player',
        predicate: 'model_noticed_something',
        value: 'The gate was busy.',
        visibility: 'WORLD_PUBLIC',
        importance: 0.4,
        sourceEventIds: [],
      },
    ],
    wordBudget: 95,
    mediaPlan: { ...rules.mediaPlan, heroImage: { eligible: true, reason: 'model felt like it', shotType: 'MOMENT' } },
    arcUpdates: [{ tensionDelta: 0.9, pacingStage: 'REST' }] as BeatPlan['arcUpdates'],
  };
}

describe('deterministic guarantees survive the model', () => {
  it('keeps the record of the player having attacked somebody', () => {
    const { context } = violentTurn();
    const rules = director.planSync(context);

    // The rule-based director does propose it…
    const attacked = rules.memoryProposals.find((p) => p.predicate === 'was_attacked_by_player');
    expect(attacked, 'the rules did not propose a violence memory').toBeDefined();
    expect(attacked!.importance).toBe(1);
    expect(attacked!.subjectId).toBe('kael');

    // …and it survives being merged with a model that never mentioned it.
    const merged = reconcilePlan(modelPlan(rules), rules, context, []);
    expect(merged.memoryProposals.some((p) => p.predicate === 'was_attacked_by_player')).toBe(true);
  });

  it('does not throw away what the model noticed', () => {
    const { context } = violentTurn();
    const rules = director.planSync(context);
    const merged = reconcilePlan(modelPlan(rules), rules, context, []);
    expect(merged.memoryProposals.some((p) => p.predicate === 'model_noticed_something')).toBe(true);
  });

  it('does not duplicate a proposal both of them made', () => {
    const { context } = violentTurn();
    const rules = director.planSync(context);
    const both = { ...modelPlan(rules), memoryProposals: [...rules.memoryProposals] };
    const merged = reconcilePlan(both, rules, context, []);
    const keys = merged.memoryProposals.map((p) => `${p.subjectId}:${p.predicate}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('uses the event-driven word budget, not the flat tier constant', () => {
    const { context } = violentTurn();
    const rules = director.planSync(context);
    const merged = reconcilePlan(modelPlan(rules), rules, context, []);
    expect(merged.wordBudget).toBe(rules.wordBudget);
    // And the rules genuinely disagree with the tier default here.
    expect(rules.wordBudget).not.toBe(95);
  });

  it('lets the engine decide whether a frame happens at all', () => {
    const { context } = violentTurn();
    const rules = director.planSync(context);

    // A model that wants a frame the cadence forbids does not get one.
    const forbidding: BeatPlan = {
      ...rules,
      mediaPlan: { ...rules.mediaPlan, heroImage: { eligible: false, reason: 'too soon', shotType: 'NONE' } },
    };
    const merged = reconcilePlan(modelPlan(rules), forbidding, context, []);
    expect(merged.mediaPlan.heroImage.eligible).toBe(false);
    expect(merged.mediaPlan.heroImage.reason).toBe('too soon');
  });

  it('keeps the model’s shot choice when the engine allows a frame', () => {
    const { context } = violentTurn();
    const rules = director.planSync(context);
    const allowing: BeatPlan = {
      ...rules,
      mediaPlan: { ...rules.mediaPlan, heroImage: { eligible: true, reason: 'earned', shotType: 'ACTION' } },
    };
    const fromModel = {
      ...modelPlan(rules),
      mediaPlan: { ...rules.mediaPlan, heroImage: { eligible: true, reason: 'x', shotType: 'TWO_SHOT' as const } },
    };
    const merged = reconcilePlan(fromModel, allowing, context, []);
    expect(merged.mediaPlan.heroImage.eligible).toBe(true);
    expect(merged.mediaPlan.heroImage.shotType).toBe('TWO_SHOT');
  });

  it('uses pacing computed from state rather than guessed', () => {
    const { context } = violentTurn();
    const rules = director.planSync(context);
    const merged = reconcilePlan(modelPlan(rules), rules, context, []);
    expect(merged.arcUpdates).toEqual(rules.arcUpdates);
  });

  it('keeps everything the model is genuinely for', () => {
    const { context } = violentTurn();
    const rules = director.planSync(context);
    const fromModel = { ...modelPlan(rules), dramaticFocus: 'Something only a model would write.' };
    const merged = reconcilePlan(fromModel, rules, context, []);
    expect(merged.dramaticFocus).toBe('Something only a model would write.');
  });
});
