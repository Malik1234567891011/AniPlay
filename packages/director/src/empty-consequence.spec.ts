import { describe, expect, it } from 'vitest';
import { findEmptyConsequences, stripEmptyConsequences } from './empty-consequence.js';

/**
 * Phrases that sound like a consequence and contain none.
 *
 * Every one of these is verbatim from a sweep. They roughly doubled when beat
 * budgets went from 95 words to 260, which is the honest cost of longer beats:
 * they are what a model reaches for when it has more room than event.
 */
const CAUGHT_IN_THE_WILD = [
  'Something cold settles behind your ribs as the air shifts.',
  'The one gives nothing away but the tempo of the room changes.',
  'You feel the weight of that decision.',
  'The banners do not move, but the air shifts.',
  'You have lost something you will not get back today.',
  'The quiet stretches.',
];

const narration = (text: string) => [{ type: 'NARRATION', text }];

describe('a change with nothing changed', () => {
  it('catches every phrase the sweep has caught', () => {
    for (const sentence of CAUGHT_IN_THE_WILD) {
      expect(findEmptyConsequences(narration(sentence)), sentence).toHaveLength(1);
    }
  });

  it('keeps the rest of the paragraph', () => {
    const text =
      'The gulls go silent overhead. You feel the weight of that decision. ' +
      'Veyra folds her hands behind her back, a parade ground habit.';
    expect(stripEmptyConsequences(text)).toBe(
      'The gulls go silent overhead. Veyra folds her hands behind her back, a parade ground habit.',
    );
  });

  it('leaves prose that actually names what changed', () => {
    for (const text of [
      'The air is thick with resin dust and somebody has left the back door open.',
      'You lost four minutes and the drill has already started without you.',
      'Nessa puts the chart case down and does not pick it up again.',
      'She shifts her weight onto her back foot.',
    ]) {
      expect(findEmptyConsequences(narration(text)), text).toEqual([]);
    }
  });

  it('lets a character speak vaguely, because people do', () => {
    const spoken = [{ type: 'DIALOGUE', text: 'Something changed in me out there. I felt the weight of it.' }];
    expect(findEmptyConsequences(spoken)).toEqual([]);
  });

  it('names the block so the repair can strip a sentence rather than a beat', () => {
    const found = findEmptyConsequences([
      { type: 'NARRATION', text: 'You step onto the court.' },
      { type: 'NARRATION', text: 'The air shifts. Kai does not look up.' },
    ]);
    expect(found).toHaveLength(1);
    expect(found[0]!.blockIndex).toBe(1);
    expect(found[0]!.sentence).toBe('The air shifts.');
  });
});

describe('the repair actually runs', () => {
  it('treats a filler-only turn as worth repairing', async () => {
    const { isRepairable } = await import('./validator.js');
    // WARN-only, so `valid` stays true. Keying the repair on validity alone
    // meant filler was stripped only on turns that were invalid for some other
    // reason — which in a sweep looked like a 7-in-8 fix rate and was luck.
    const report = {
      valid: true,
      violations: [
        {
          code: 'UNSUPPORTED_STATE' as const,
          severity: 'WARN' as const,
          description: 'Names a change without naming what changed: "The world shifts."',
          blockIndex: 0,
        },
      ],
    };
    expect(isRepairable(report)).toBe(true);
  });

  it('leaves a clean turn alone', async () => {
    const { isRepairable } = await import('./validator.js');
    expect(isRepairable({ valid: true, violations: [] })).toBe(false);
  });
});
