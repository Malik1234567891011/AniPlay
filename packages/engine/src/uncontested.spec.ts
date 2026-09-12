import { describe, expect, it } from 'vitest';
import { BLACKWAKE, LAST_FIVE } from '@plotbreak/test-fixtures';
import type { GameState, StoryVersion } from '@plotbreak/contracts';
import { charactersPresent, createInitialState } from './state.js';
import { resolveIntent } from './resolve.js';

/**
 * The player did the thing they said they did.
 *
 * A `custom` verb does not mean "difficult". It means the parser could not
 * identify the sentence — and the engine was rolling a die on it anyway, so an
 * action nobody opposed could come back FAILURE and the writer, told the
 * attempt failed, would write a refusal.
 *
 * Found in a tap-only Itachi playthrough. The player tapped a card that read
 * "I take it, turn it over once, and point at his grip" — the shuriken being
 * held out to them, handle first, by a nine-year-old who had waited two hours
 * to be taught. It resolved `Attempt=FAILURE`, and the beat came back with
 * Sasuke's fist closed around it, refusing. Nothing in the world opposed that
 * action. The dice did.
 *
 * These tests are about the invariant, not about that card: an unparsed action
 * with nothing standing in its way happens, and one with something in its way
 * still gets rolled.
 */

const world = (story: StoryVersion): GameState =>
  createInitialState({
    sessionId: 'sess_u',
    story,
    identity: {
      displayName: 'Sora', pronouns: 'they/them', ageBand: null,
      archetypeId: story.archetypes[0]?.id ?? null,
      worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  }) as GameState;

const act = (
  story: StoryVersion,
  state: GameState,
  over: Partial<{ method: string; declaredOutcome: string; targets: any[] }> = {},
) =>
  resolveIntent({
    story, state, turnId: 't', seed: 'seed-uncontested',
    intent: {
      schemaVersion: '1.0', intentId: 'i',
      rawAction: over.method ?? 'hand it back and show them the grip',
      dialogue: [], confidence: 0.9, ambiguities: [], unsafeOrMetaRequests: [],
      actions: [{
        verb: 'custom',
        actor: { entityType: 'player', entityId: 'player' },
        targets: over.targets ?? [],
        method: over.method ?? 'hand it back and show them the grip',
        declaredOutcome: over.declaredOutcome ?? '',
        timeIntent: 'NOW',
      }],
    },
  });

describe('an action nothing opposes', () => {
  it('does not roll a check the player can fail', () => {
    const story = LAST_FIVE as unknown as StoryVersion;
    const resolution = act(story, world(story));
    expect(resolution.checks).toHaveLength(0);
    expect(resolution.checks.map((c) => c.outcome)).not.toContain('FAILURE');
  });

  it('tells the writer to realise it rather than adjudicate it', () => {
    const story = LAST_FIVE as unknown as StoryVersion;
    const resolution = act(story, world(story));
    const directives = resolution.privateFacts.map((f) => f.fact).join(' ');
    expect(directives).toMatch(/happened/i);
  });

  it('is not sensitive to the seed, because there is no roll', () => {
    const story = LAST_FIVE as unknown as StoryVersion;
    const state = world(story);
    const outcomes = ['a', 'b', 'c', 'd'].map((seed) =>
      resolveIntent({
        story, state, turnId: 't', seed,
        intent: {
          schemaVersion: '1.0', intentId: 'i', rawAction: 'straighten the row of them',
          dialogue: [], confidence: 0.9, ambiguities: [], unsafeOrMetaRequests: [],
          actions: [{
            verb: 'custom', actor: { entityType: 'player', entityId: 'player' },
            targets: [], method: 'straighten the row of them', declaredOutcome: '', timeIntent: 'NOW',
          }],
        },
      }).checks.length,
    );
    // Every seed, no check. Before this, four seeds gave four different verdicts
    // on the same uncontested sentence.
    expect(outcomes).toEqual([0, 0, 0, 0]);
  });
});

describe('an action something does oppose', () => {
  it('still rolls when the player declares their own outcome', () => {
    const story = LAST_FIVE as unknown as StoryVersion;
    const resolution = act(story, world(story), {
      method: 'talk them round',
      // The one thing a player never gets for free.
      declaredOutcome: 'and they agree to come with me',
    });
    expect(resolution.checks.length).toBeGreaterThan(0);
  });

  it('still rolls when the named person is not in the room', () => {
    const story = BLACKWAKE as unknown as StoryVersion;
    const state = world(story);
    const absent = story.characters.find(
      (c) => !charactersPresent(state).some((p) => p.characterId === c.id),
    );
    if (!absent) return; // every world puts somebody elsewhere; if not, nothing to assert
    const resolution = act(story, state, {
      method: `find ${absent.name} and settle it`,
      targets: [{ entityType: 'npc', entityId: absent.id, displayName: absent.name }],
    });
    expect(resolution.checks.length).toBeGreaterThan(0);
  });

  it('still rolls against somebody who has reason to resist', () => {
    const story = LAST_FIVE as unknown as StoryVersion;
    const state = world(story);
    const target = charactersPresent(state)[0];
    if (!target) return;
    const hostile: GameState = {
      ...state,
      flags: { ...state.flags, [`attacked:${target.characterId}`]: true },
    };
    const resolution = act(story, hostile, {
      method: 'reach past them for it',
      targets: [{ entityType: 'npc', entityId: target.characterId, displayName: 'them' }],
    });
    expect(resolution.checks.length).toBeGreaterThan(0);
  });

  it('leaves every verb the parser did understand exactly as it was', () => {
    // The change is scoped to `custom`. A verb with its own resolver keeps its
    // own rules, including the ones that can fail.
    const story = LAST_FIVE as unknown as StoryVersion;
    const state = world(story);
    const resolution = resolveIntent({
      story, state, turnId: 't', seed: 'seed-verb',
      intent: {
        schemaVersion: '1.0', intentId: 'i', rawAction: 'search the room',
        dialogue: [], confidence: 0.9, ambiguities: [], unsafeOrMetaRequests: [],
        actions: [{
          verb: 'inspect', actor: { entityType: 'player', entityId: 'player' },
          targets: [], method: 'search the room', declaredOutcome: '', timeIntent: 'NOW',
        }],
      },
    });
    expect(resolution.checks.length).toBeGreaterThan(0);
  });
});
