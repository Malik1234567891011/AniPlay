import { describe, expect, it } from 'vitest';
import { LAST_FIVE } from '@aniplay/test-fixtures';
import { createInitialState, resolveIntent } from './index.js';
import type { ActionIntent } from '@aniplay/contracts';

/**
 * Waiting in a conversation is a pause, not an afternoon.
 *
 * The schedule walk in `resolveWait` exists so "wait for Mira" lands when Mira
 * arrives. With people standing in front of the player and nobody named, it
 * took a live session from four in the afternoon to eight at night in the
 * middle of a handshake, and moved everyone else along with it.
 */

const state = () =>
  createInitialState({
    sessionId: 'w', story: LAST_FIVE,
    identity: {
      displayName: 'Sora', pronouns: 'they/them', ageBand: null,
      archetypeId: LAST_FIVE.archetypes[0]!.id, worldKnowsAboutYou: '',
      advanced: {}, portraitAssetId: null,
    },
  });

const wait = (s: ReturnType<typeof state>, targetId?: string) => {
  const intent = {
    schemaVersion: '1.0', intentId: 'i', rawAction: 'I wait.',
    dialogue: [], confidence: 0.9, ambiguities: [], unsafeOrMetaRequests: [],
    actions: [{
      verb: 'wait', actor: { entityType: 'player', entityId: 'player' },
      targets: targetId ? [{ entityType: 'npc', entityId: targetId, displayName: targetId }] : [],
      method: 'wait', declaredOutcome: '', timeIntent: 'NOW',
    }],
  } as ActionIntent;
  return resolveIntent({ story: LAST_FIVE, state: s, turnId: 't', seed: 's', intent });
};

describe('waiting', () => {
  it('is a pause when somebody is standing there', () => {
    // The gym opens with six people in it.
    expect(wait(state()).timeAdvancedMinutes).toBeLessThanOrEqual(10);
  });

  it('still crosses hours when the player said what they are waiting for', () => {
    // "I wait until after service" is a wait *for* something. It has to be able
    // to cross hours or no authored schedule is ever reachable.
    const s = state();
    const intent = {
      schemaVersion: '1.0', intentId: 'i', rawAction: 'I wait until practice ends.',
      dialogue: [], confidence: 0.9, ambiguities: [], unsafeOrMetaRequests: [],
      actions: [{
        verb: 'wait', actor: { entityType: 'player', entityId: 'player' }, targets: [],
        method: 'wait until practice ends', declaredOutcome: '', timeIntent: 'NOW',
      }],
    } as ActionIntent;
    const result = resolveIntent({ story: LAST_FIVE, state: s, turnId: 't', seed: 's', intent });
    expect(result.timeAdvancedMinutes).toBeGreaterThan(10);
  });

  it('still reaches the person when the player names one', () => {
    // "Wait for Nori" has to be able to cross hours, or no authored schedule
    // is ever reachable by the one action that exists to reach it.
    const s = state();
    expect(wait(s, 'nori').timeAdvancedMinutes).toBeGreaterThan(0);
  });

  it('still crosses hours when the player is alone', () => {
    const s = state();
    s.characters = s.characters.map((c) => ({ ...c, locationId: 'away_seiran' }));
    expect(wait(s).timeAdvancedMinutes).toBeGreaterThan(10);
  });

  it('tells the writer to give the pause to somebody, not to skip time', () => {
    expect(wait(state()).privateFacts.map((f) => f.fact).join(' ')).toMatch(/rather than skipping ahead/);
  });
});
