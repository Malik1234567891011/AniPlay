import { describe, expect, it } from 'vitest';
import type { Resolution, TurnRecord } from '@plotbreak/contracts';
import { LAST_FIVE, NINTH_ARCHIVE } from '@plotbreak/test-fixtures';
import { expandElliptical } from './elliptical.js';

/**
 * "Again."
 *
 * Observed live: a player landed two attacks on Kael, then typed "Again,
 * harder" and "Keep going" — and both parsed to no action at all, so the fight
 * stopped happening while the player thought they were still swinging.
 */

const turn = (actionText: string, normalized: Record<string, unknown>[]): TurnRecord =>
  ({
    turnId: 't', sessionId: 's', turnIndex: 0, actionText,
    qualityTier: 'VIVID', creditsCharged: 0, sceneSummary: '',
    blocks: [], checks: [], stateDeltas: [], mutations: [], suggestions: [],
    endStatePrompt: '', mediaPlan: null, heroImageUrl: null, revisionAfter: 1,
    createdAt: new Date(0).toISOString(), repairViolations: [], beatPlan: null,
    resolution: {
      schemaVersion: '1.0', turnId: 't', valid: true, invalidReason: null,
      normalizedActions: normalized, checks: [], mutations: [],
      observableFacts: [], privateFacts: [], timeAdvancedMinutes: 1,
      newOpportunities: [], rngSeedHash: 'h',
    } as unknown as Resolution,
  }) as unknown as TurnRecord;

const attackedKael = [turn('I attack Kael.', [{ verb: 'attack', status: 'RESOLVED', targets: [{ entityId: 'kael' }] }])];

describe('a bare continuation becomes the sentence it means', () => {
  it('expands "Again."', () => {
    const r = expandElliptical('Again.', attackedKael, NINTH_ARCHIVE);
    expect(r.expanded).toBe(true);
    expect(r.text.toLowerCase()).toContain('attack');
    expect(r.text).toContain('Kael');
  });

  it('keeps the player’s own modifier, because that is how they did it', () => {
    const r = expandElliptical('Again, harder.', attackedKael, NINTH_ARCHIVE);
    expect(r.expanded).toBe(true);
    expect(r.text.toLowerCase()).toContain('harder');
  });

  it('expands a bare intensifier with nothing to modify', () => {
    for (const text of ['Harder.', 'Faster.', 'Properly this time.']) {
      const r = expandElliptical(text, attackedKael, NINTH_ARCHIVE);
      expect(r.expanded, text).toBe(true);
      expect(r.text.toLowerCase(), text).toContain('attack');
    }
  });

  it('expands the ones that shipped broken', () => {
    for (const text of ['Keep going.', 'Again, harder', 'Once more', "Don't stop"]) {
      expect(expandElliptical(text, attackedKael, NINTH_ARCHIVE).expanded, text).toBe(true);
    }
  });

  it('tells the player how it was read', () => {
    const r = expandElliptical('Again.', attackedKael, NINTH_ARCHIVE);
    expect(r.note).toContain('Kael');
    expect(r.note).toMatch(/continuing your last action/i);
  });

  it('carries a non-combat action forward too', () => {
    const talked = [turn('I talk to Mira.', [{ verb: 'speak', status: 'RESOLVED', targets: [{ entityId: 'mira' }] }])];
    const r = expandElliptical('Again.', talked, NINTH_ARCHIVE);
    expect(r.text.toLowerCase()).toContain('talk to');
    expect(r.text).toContain('Mira');
  });
});

describe('what it deliberately leaves alone', () => {
  it('does not touch a sentence with its own verb', () => {
    for (const text of ['I attack him again.', 'Again, I go to the archive.', 'I keep going toward the gate.']) {
      expect(expandElliptical(text, attackedKael, NINTH_ARCHIVE).expanded, text).toBe(false);
    }
  });

  it('does nothing on the first turn, when there is nothing to continue', () => {
    const r = expandElliptical('Again.', [], NINTH_ARCHIVE);
    expect(r.expanded).toBe(false);
    expect(r.text).toBe('Again.');
  });

  it('does not continue a wait or a refused action', () => {
    const waited = [turn('I wait.', [{ verb: 'wait', status: 'RESOLVED' }])];
    expect(expandElliptical('Again.', waited, NINTH_ARCHIVE).expanded).toBe(false);

    const refused = [turn('I fly.', [{ verb: 'custom', status: 'REJECTED', reason: 'IMPOSSIBLE' }])];
    expect(expandElliptical('Again.', refused, NINTH_ARCHIVE).expanded).toBe(false);
  });

  it('skips back past a turn that resolved nothing', () => {
    const history = [
      turn('I attack Kael.', [{ verb: 'attack', status: 'RESOLVED', targets: [{ entityId: 'kael' }] }]),
      turn('I wait.', [{ verb: 'wait', status: 'RESOLVED' }]),
    ];
    const r = expandElliptical('Again.', history, NINTH_ARCHIVE);
    expect(r.expanded).toBe(true);
    expect(r.text).toContain('Kael');
  });

  it('leaves ordinary sentences completely untouched', () => {
    for (const text of ['I drive at whoever is guarding me.', 'I ask Coach about my minutes.']) {
      const r = expandElliptical(text, attackedKael, LAST_FIVE);
      expect(r.expanded, text).toBe(false);
      expect(r.text, text).toBe(text);
    }
  });
});
