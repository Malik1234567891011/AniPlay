import { describe, expect, it } from 'vitest';
import type { Resolution, StateMutation } from '@aniplay/contracts';
import { createInitialState } from '@aniplay/engine';
import { NINTH_ARCHIVE } from '@aniplay/test-fixtures';
import { beatBudget } from './director.js';
import { buildTurnContext } from './context.js';

/**
 * How much writing a turn has earned.
 *
 * `wordBudget` was a constant per quality tier — 95 for VIVID, always — so
 * walking into a corridor and the death of a major character got the same
 * amount of prose. Measured across a real session: every single turn between
 * 57 and 91 words, including the one the whole scene was building to.
 */

const state = () =>
  createInitialState({
    sessionId: 'sess_b',
    story: NINTH_ARCHIVE,
    identity: {
      displayName: 'Sora', pronouns: 'they/them', ageBand: null,
      archetypeId: NINTH_ARCHIVE.archetypes[0]?.id ?? null,
      worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  });

const resolution = (over: Partial<Resolution> = {}): Resolution => ({
  schemaVersion: '1.0',
  turnId: 't',
  valid: true,
  invalidReason: null,
  normalizedActions: [{ verb: 'custom', status: 'RESOLVED' }],
  checks: [],
  mutations: [],
  observableFacts: [],
  privateFacts: [],
  timeAdvancedMinutes: 5,
  newOpportunities: [],
  rngSeedHash: 'h',
  ...over,
});

const mutation = (over: Partial<StateMutation>): StateMutation => ({
  mutationId: 'm', type: 'FLAG_SET', subjectId: 's', reasonCode: 'X', payload: {}, ...over,
});

const budgetFor = (res: Resolution, tier = 95): number => {
  const s = state();
  // Everyone already met, so a first meeting does not skew the baseline.
  for (const c of NINTH_ARCHIVE.characters) s.flags[`met:${c.id}`] = true;
  const context = buildTurnContext({
    story: NINTH_ARCHIVE, state: s, resolution: res, tier: 'VIVID',
    memories: [], recentTurns: [], actionText: 'I look around.', playerDialogue: [],
  });
  return beatBudget(context, tier);
};

describe('length follows what happened', () => {
  it('gives a turn where nothing moved less than the tier', () => {
    expect(budgetFor(resolution())).toBeLessThan(95);
  });

  it('gives a refusal barely any room', () => {
    const refused = resolution({ normalizedActions: [{ verb: 'custom', status: 'REJECTED', reason: 'NO_ROUTE' }] });
    expect(budgetFor(refused)).toBeLessThan(budgetFor(resolution()));
  });

  it('gives a busy turn more than a quiet one', () => {
    const busy = resolution({
      mutations: Array.from({ length: 7 }, (_, i) => mutation({ mutationId: `m${i}` })),
    });
    expect(budgetFor(busy)).toBeGreaterThan(budgetFor(resolution()));
  });

  it('gives a death the most of all', () => {
    const death = resolution({ mutations: [mutation({ reasonCode: 'KILLED_BY_PLAYER' })] });
    const ordinary = resolution({ mutations: [mutation({ reasonCode: 'FLAG_SET' })] });
    expect(budgetFor(death)).toBeGreaterThan(budgetFor(ordinary));
    expect(budgetFor(death)).toBeGreaterThan(140);
  });

  it('spends words on the turn a quest actually moves', () => {
    const moved = resolution({ mutations: [mutation({ type: 'QUEST_TRANSITION' })] });
    expect(budgetFor(moved)).toBeGreaterThan(budgetFor(resolution({ mutations: [mutation({})] })));
  });

  it('spends words when a fight starts', () => {
    const fight = resolution({ mutations: [mutation({ type: 'ENCOUNTER_START' })] });
    expect(budgetFor(fight)).toBeGreaterThan(budgetFor(resolution({ mutations: [mutation({})] })));
  });

  it('spends words when the player establishes something about themselves', () => {
    const authored = resolution({
      privateFacts: [{ visibility: 'SELF', fact: 'The player has established something about themselves…' }],
    });
    expect(budgetFor(authored)).toBeGreaterThan(budgetFor(resolution()));
  });

  it('spends words on a critical outcome and not on a routine one', () => {
    const check = (outcome: string) =>
      resolution({
        checks: [{ checkId: 'c', label: 'l', attribute: 'mind', skill: null, dc: 12, advantageLevel: 0, rolls: [10], keptRoll: 10, modifier: 2, total: 12, margin: 0, outcome: outcome as never }],
      });
    expect(budgetFor(check('CRITICAL_SUCCESS'))).toBeGreaterThan(budgetFor(check('SUCCESS')));
    expect(budgetFor(check('COMPLICATION'))).toBeGreaterThan(budgetFor(check('SUCCESS')));
  });

  it('stays inside what the AI contract allows', () => {
    // BeatPlan.wordBudget is 20–220 in ai_contracts.json. Everything, however
    // dramatic, has to fit.
    const enormous = resolution({
      mutations: [
        mutation({ reasonCode: 'KILLED_BY_PLAYER' }),
        mutation({ type: 'QUEST_TRANSITION' }),
        mutation({ type: 'ENCOUNTER_START' }),
        mutation({ reasonCode: 'UNDERTAKING_BEGUN' }),
        mutation({ reasonCode: 'CREW_BETRAYAL' }),
        mutation({ reasonCode: 'WORLD_EVENT:x' }),
        mutation({ reasonCode: 'LEVEL_CHANGE' }),
      ],
    });
    const budget = budgetFor(enormous, 190);
    expect(budget).toBeLessThanOrEqual(220);
    expect(budget).toBeGreaterThanOrEqual(30);
  });

  it('still respects what the player paid for', () => {
    const res = resolution({ mutations: [mutation({ type: 'QUEST_TRANSITION' })] });
    expect(budgetFor(res, 190)).toBeGreaterThan(budgetFor(res, 60));
  });

  it('produces real variance across a plausible run of turns', () => {
    // The actual defect: a session of uniform eighty-word paragraphs.
    const turns = [
      resolution(),
      resolution({ normalizedActions: [{ verb: 'custom', status: 'REJECTED' }] }),
      resolution({ mutations: [mutation({}), mutation({}), mutation({})] }),
      resolution({ mutations: [mutation({ type: 'QUEST_TRANSITION' })] }),
      resolution({ mutations: [mutation({ reasonCode: 'KILLED_BY_PLAYER' })] }),
    ];
    const budgets = turns.map((t) => budgetFor(t));
    expect(Math.max(...budgets) - Math.min(...budgets)).toBeGreaterThan(60);
  });
});
