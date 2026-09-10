import { describe, expect, it } from 'vitest';
import { NINE_WEEKS } from '@aniplay/test-fixtures';
import { createInitialState } from './state.js';
import { resolveIntent } from './resolve.js';
import type { ActionIntent } from '@aniplay/contracts';

/**
 * Things the world should not forget.
 *
 * Two findings with one shape: the engine knew something had happened and
 * nothing downstream was ever told, so the prose greeted the player as though
 * it had not.
 */

const story = NINE_WEEKS;
const base = () =>
  createInitialState({
    sessionId: 'sess_c',
    story,
    identity: {
      displayName: 'Robin', pronouns: 'they/them', ageBand: null,
      archetypeId: story.archetypes[0]!.id, worldKnowsAboutYou: '',
      advanced: {}, portraitAssetId: null,
    },
  });

const intent = (over: Partial<ActionIntent>): ActionIntent =>
  ({
    schemaVersion: '1.0', intentId: 'int_c', rawAction: 'x', confidence: 0.9,
    actions: [], dialogue: [], ambiguities: [], unsafeOrMetaRequests: [],
    ...over,
  }) as ActionIntent;

const speakTo = (id: string, name: string) =>
  intent({
    rawAction: `"Everyone. Ask ${name} what happened last September."`,
    actions: [
      {
        verb: 'speak',
        actor: { entityType: 'player', entityId: 'player' },
        targets: [{ entityType: 'npc', entityId: id, displayName: name }],
        method: `Everyone. Ask ${name} what happened last September.`,
        declaredOutcome: '',
        timeIntent: 'NOW',
      },
    ],
  } as Partial<ActionIntent>);

const run = (state: ReturnType<typeof base>, i: ActionIntent) =>
  resolveIntent({ story, state, intent: i, turnId: 't1', seed: 'seed' });

describe('speaking in front of other people', () => {
  it('records that the room heard it', () => {
    const state = base();
    const present = state.characters.filter((c) => c.locationId === state.player.locationId);
    // A guard that returned early here would make this test pass by doing
    // nothing, which is worse than not having it.
    expect(present.length, 'opening scene needs a target and a witness').toBeGreaterThanOrEqual(2);
    const target = present[0]!;
    const def = story.characters.find((c) => c.id === target.characterId)!;

    const out = run(state, speakTo(def.id, def.name));

    expect(
      out.mutations.some((m) => m.reasonCode === 'SPOKE_IN_PUBLIC'),
      'a public statement left no trace at all in twenty-five turns of play',
    ).toBe(true);
    expect(out.observableFacts.join(' ')).toMatch(/in front of/i);
    expect(out.privateFacts.map((f) => f.fact).join(' ')).toMatch(/said in public/i);
  });

  it('says nothing about witnesses when there are none', () => {
    const state = base();
    // Constructed rather than found, so this cannot pass vacuously.
    const present = state.characters.filter((c) => c.locationId === state.player.locationId);
    expect(present.length).toBeGreaterThan(0);
    const def = story.characters.find((c) => c.id === present[0]!.characterId)!;
    const alone = {
      ...state,
      characters: state.characters.map((c) =>
        c.characterId === def.id ? c : { ...c, locationId: '__elsewhere__' },
      ),
    };
    const out = run(alone, speakTo(def.id, def.name));
    expect(out.mutations.some((m) => m.reasonCode === 'SPOKE_IN_PUBLIC')).toBe(false);
  });
});

describe('coming back to somebody you hit', () => {
  it('reminds the writer even when the new action names nobody', () => {
    // The smoke probe that failed five times: "I go back and find Renna again"
    // resolves no target, so the reminder — which only fired on a targeted
    // action — never reached the writer and the character greeted the player
    // normally.
    const state = base();
    const present = state.characters.filter((c) => c.locationId === state.player.locationId);
    expect(present.length).toBeGreaterThan(0);
    const def = story.characters.find((c) => c.id === present[0]!.characterId)!;
    const hit = { ...state, flags: { ...state.flags, [`attacked:${def.id}`]: true } };

    const out = run(hit, intent({
      rawAction: 'I look around.',
      actions: [
        {
          verb: 'custom',
          actor: { entityType: 'player', entityId: 'player' },
          targets: [],
          method: 'I look around.',
          declaredOutcome: '',
          timeIntent: 'NOW',
        },
      ],
    } as Partial<ActionIntent>));

    expect(
      out.privateFacts.map((f) => f.fact).join(' '),
      'the world forgot it had been attacked because this turn named nobody',
    ).toMatch(new RegExp(`attacked ${def.name}`, 'i'));
  });
});
