import { describe, expect, it } from 'vitest';
import { BLACKWAKE, LAST_FIVE, NINTH_ARCHIVE } from '@plotbreak/test-fixtures';
import type { GameState, StoryVersion } from '@plotbreak/contracts';
import { createInitialState } from './state.js';
import { resolveIntent } from './resolve.js';

/**
 * Picking something up.
 *
 * The adversarial sweep reported NO_INVENTORY_MOVEMENT in six of ten worlds,
 * which read as a broken `steal` verb. It was a difficulty band applied to the
 * wrong act: every take rolled against DC 15 — HARD — including lifting an
 * unowned can of drink off a bench in an empty gym.
 */

const start = (story: StoryVersion, alone = true): GameState => {
  const s = createInitialState({
    sessionId: 'sess_t',
    story,
    identity: {
      displayName: 'Sora', pronouns: 'they/them', ageBand: null,
      archetypeId: story.archetypes[0]?.id ?? null,
      worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  });
  if (alone) for (const c of s.characters) c.locationId = '__elsewhere';
  return s;
};

const take = (story: StoryVersion, state: GameState, seed: string, method = 'take the most valuable thing in reach') =>
  resolveIntent({
    story,
    state,
    turnId: 't',
    seed,
    intent: {
      schemaVersion: '1.0', intentId: 'i', rawAction: method, dialogue: [],
      confidence: 0.9, ambiguities: [], unsafeOrMetaRequests: [],
      actions: [{
        verb: 'steal', actor: { entityType: 'player', entityId: 'player' },
        targets: [], method, declaredOutcome: '', timeIntent: 'NOW',
      }],
    },
  });

describe('taking something nobody owns, with nobody watching', () => {
  it('is not a feat, and always works', () => {
    for (const story of [LAST_FIVE, BLACKWAKE, NINTH_ARCHIVE]) {
      for (let seed = 0; seed < 10; seed++) {
        const result = take(story, start(story), `s${seed}`);
        expect(result.mutations.some((m) => m.type === 'ITEM_ADD'), `${story.title} seed ${seed}`).toBe(true);
      }
    }
  });

  it('rolls no dice at all', () => {
    // A resolution that reports a roll it did not make is how a check reveal
    // ends up showing a player dice for picking up a drink.
    const result = take(LAST_FIVE, start(LAST_FIVE), 'x');
    expect(result.checks).toEqual([]);
  });

  it('still refuses something the story has, but not here', () => {
    // Nori's tape is in the film room, not the gym.
    const result = take(LAST_FIVE, start(LAST_FIVE), 'x', 'take Nori’s Cut');
    expect(result.normalizedActions[0]).toMatchObject({ status: 'REJECTED', reason: 'NOT_HERE' });
  });

  it('KNOWN GAP: a thing the story has nowhere falls through to whatever is nearest', () => {
    // "I take the priceless emerald" hands the player a can of energy drink.
    // The named-item guard only recognises names the story defines somewhere,
    // so a name it has never heard of is treated as no name at all. Pinned as
    // a test so the behaviour is a decision rather than a surprise.
    const result = take(LAST_FIVE, start(LAST_FIVE), 'x', 'take the priceless emerald');
    expect(result.mutations.some((m) => m.type === 'ITEM_ADD')).toBe(true);
  });

  it('still does not restock the room', () => {
    const story = LAST_FIVE;
    const s = start(story);
    const first = take(story, s, 'a');
    const itemId = (first.mutations.find((m) => m.type === 'ITEM_ADD')!.payload as { itemId: string }).itemId;
    s.flags[`taken:${s.player.locationId}:${itemId}`] = true;

    // Kosei's gym has exactly one takeable, so once it is gone there is nothing.
    const second = take(story, s, 'b');
    expect(second.normalizedActions[0]).toMatchObject({ status: 'REJECTED', reason: 'NOTHING_TO_TAKE' });
  });
});

describe('taking is still a risk when it should be', () => {
  it('rolls when somebody is in the room, even for an unowned thing', () => {
    const story = LAST_FIVE;
    const s = start(story, false);
    // Put the whole team on the court with the player.
    for (const c of s.characters) c.locationId = s.player.locationId;
    expect(take(story, s, 'watched').checks.length).toBeGreaterThan(0);
  });

  it('is hardest in front of the person it belongs to', () => {
    const story = BLACKWAKE;
    const dcFor = (ownerHere: boolean): number => {
      const s = start(story, true);
      // Blackwake's yard has topsails belonging to Tolla.
      s.player.locationId = 'the_yard';
      if (ownerHere) {
        const tolla = s.characters.find((c) => c.characterId === 'tolla')!;
        tolla.locationId = 'the_yard';
      }
      return take(story, s, 'dc', 'take the topsails').checks[0]?.dc ?? 0;
    };
    expect(dcFor(true)).toBeGreaterThan(dcFor(false));
    expect(dcFor(false)).toBeGreaterThan(0);
  });
});
