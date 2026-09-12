import { describe, expect, it } from 'vitest';
import type { CheckOutcome, MutationType, Resolution } from '@plotbreak/contracts';
import { buildBeats, heroImageDecision } from './director.js';
import type { TurnContext } from './context.js';

/**
 * A romance world that could never show you a picture.
 *
 * Twenty-five turns of Nine Weeks produced two hero frames — turn 1 and turn 10
 * — and none at all in the last fifteen, while the director's own log said
 * things like *"Worth a frame, but only 7 turns since the last one"* and
 * *"Ordinary beat; the persistent stage covers it"* on the turn where the
 * player stood on a bar and silenced a room.
 *
 * The cause was that `notable` was ENCOUNTER_START, QUEST_TRANSITION,
 * CRITICAL_SUCCESS and REVEAL — four combat-and-quest events, none of which a
 * slice-of-life world ever generates. The only remaining road was `landmark`,
 * which in such a world means "a new room" or "a new face", and both run out.
 */

const ctx = (over: {
  tier?: string;
  turnsSinceHeroImage?: number | null;
  mutations?: { type: MutationType }[];
  checks?: { outcome: CheckOutcome }[];
}): TurnContext =>
  ({
    tier: over.tier ?? 'VIVID',
    turnsSinceHeroImage: over.turnsSinceHeroImage ?? 6,
    presentCharacters: [],
    state: { flags: {} },
    resolution: {
      mutations: (over.mutations ?? []).map((m) => ({ ...m, reasonCode: 'X' })),
      checks: over.checks ?? [],
    } as unknown as Resolution,
  }) as unknown as TurnContext;

const ordinary = { locationChanged: false, firstVisit: false };

/** Just enough context for `buildBeats` to reach the state-reveal branch. */
const planBeats = (over: Record<string, unknown>) =>
  buildBeats(
    {
      story: { rules: { toneGuide: '' } },
      toneGuide: 'Warm, funny, slightly sunburnt.',
      scene: { locationName: 'The Longhouse Bar', dayPart: 'EVENING' },
      presentCharacters: [],
      quests: [],
      reveals: [],
      state: { flags: {} },
      ...over,
    } as unknown as TurnContext,
    'DIALOGUE',
    [],
  );

describe('a conversation world earning a frame', () => {
  it('gives a frame when somebody’s feeling about you changes', () => {
    const decision = heroImageDecision(
      ctx({ mutations: [{ type: 'RELATIONSHIP_DELTA' }] }),
      'DIALOGUE',
      ordinary,
    );
    expect(decision.eligible).toBe(true);
  });

  it('gives a frame when somebody refuses you — the world’s promised "real rejection"', () => {
    expect(heroImageDecision(ctx({ checks: [{ outcome: 'FAILURE' }] }), 'DIALOGUE', ordinary).eligible).toBe(true);
  });

  it('gives a frame when the stage is about to change a face', () => {
    expect(
      heroImageDecision(ctx({}), 'DIALOGUE', ordinary, { juno: 'delighted' }).eligible,
    ).toBe(true);
  });

  it('still says no to a genuinely flat beat', () => {
    const decision = heroImageDecision(ctx({}), 'DIALOGUE', ordinary, { juno: 'neutral' });
    expect(decision.eligible).toBe(false);
    expect(decision.reason).toMatch(/ordinary/i);
  });

  it('still spaces frames out, so they keep meaning something', () => {
    const justHadOne = ctx({
      turnsSinceHeroImage: 1,
      mutations: [{ type: 'RELATIONSHIP_DELTA' }],
    });
    expect(heroImageDecision(justHadOne, 'DIALOGUE', ordinary).eligible).toBe(false);
  });

  it('does not make the default tier wait ten turns any more', () => {
    const fiveTurnsOn = ctx({
      tier: 'VIVID',
      turnsSinceHeroImage: 5,
      mutations: [{ type: 'RELATIONSHIP_DELTA' }],
    });
    expect(heroImageDecision(fiveTurnsOn, 'DIALOGUE', ordinary).eligible).toBe(true);
  });
});

/**
 * The stamina tic.
 *
 * `buildBeats` emitted a `STATE_REVEAL` for every `RESOURCE_DELTA` with the
 * instruction *"Let the change be felt physically. The chip in the UI states
 * the number; the prose states the cost."* Six beats in a 25-turn romance run
 * spent their closing paragraph on being tired, twice in nearly the same words
 * on consecutive turns, because the writer was doing what it was told. The chip
 * the instruction promised had also been removed, so nothing stated the number.
 */
describe('when a resource change is worth a sentence', () => {
  const beats = (current: number, max: number, amount: number, polarity = 'GOOD_HIGH') =>
    planBeats({
      player: { resources: [{ id: 'energy', name: 'Energy', current, max, polarity }] },
      resolution: {
        observableFacts: [],
        privateFacts: [],
        mutations: [
          {
            mutationId: 'm1',
            type: 'RESOURCE_DELTA',
            subjectId: 'player',
            reasonCode: 'PARTIAL:interact',
            payload: { resourceId: 'energy', amount },
          },
        ],
        checks: [],
      },
    });

  it('says nothing about two points of energy off a full bar', () => {
    expect(beats(18, 20, -2).some((b) => b.kind === 'STATE_REVEAL')).toBe(false);
  });

  it('says something when the bar is nearly out, because that constrains the next move', () => {
    const reveal = beats(4, 20, -2).find((b) => b.kind === 'STATE_REVEAL');
    expect(reveal).toBeDefined();
    expect(reveal!.instruction).toMatch(/one clause/i);
    expect(reveal!.instruction).not.toMatch(/felt physically/i);
  });

  it('never tells the player they are running low on a bad-is-high resource', () => {
    expect(beats(1, 20, -2, 'GOOD_LOW').some((b) => b.kind === 'STATE_REVEAL')).toBe(false);
  });

  it('still announces an item the player gained', () => {
    const found = planBeats({
      player: { resources: [] },
      resolution: {
        observableFacts: [],
        privateFacts: [],
        mutations: [
          { mutationId: 'm2', type: 'ITEM_ADD', subjectId: 'player', reasonCode: 'X', payload: {} },
        ],
        checks: [],
      },
    });
    expect(found.some((b) => b.kind === 'STATE_REVEAL')).toBe(true);
  });
});
