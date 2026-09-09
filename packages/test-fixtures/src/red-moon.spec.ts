import { describe, expect, it } from 'vitest';
import { createInitialState, resolveIntent, unmetRequirement } from '@aniplay/engine';
import { RuleBasedIntentParser } from '@aniplay/director';
import { RED_MOON } from './index.js';

/**
 * The systems this world is made of, held to what it claims.
 *
 * The claim is that the meter which makes you dangerous is the same one that
 * stops you being a person, and that both directions are a real build. That is
 * only true if the numbers actually do it.
 */

const player = (archetypeId: string) =>
  createInitialState({
    sessionId: 'sess_rm',
    story: RED_MOON,
    identity: {
      displayName: 'Sena Ardry',
      pronouns: 'she/her',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const parser = new RuleBasedIntentParser();
const act = (state: ReturnType<typeof player>, text: string) =>
  resolveIntent({
    story: RED_MOON,
    state,
    intent: parser.parseSync(text, { story: RED_MOON, state, intentId: 'i' }),
    turnId: 't',
    seed: 'rm',
  });

const instability = (state: ReturnType<typeof player>): number =>
  state.player.resources.find((r) => r.id === 'instability')!.current;

describe('being a hybrid', () => {
  it('starts you with the trait the premise says you already have', () => {
    const state = player('arch_longblade');
    expect(state.player.abilities).toContain('plating_held');
    expect(state.player.abilities).toContain('long_guard');
  });

  it('every weapon style brings its own technique and nobody else’s', () => {
    const techniques = ['long_guard', 'overhead', 'brace_and_thrust', 'crown_shot', 'two_line', 'close_work'];
    for (const archetype of RED_MOON.archetypes) {
      const mine = archetype.startingAbilities.filter((a) => techniques.includes(a));
      expect(mine, archetype.id).toHaveLength(1);
    }
    // And between them they cover all six, so no route is unreachable.
    const covered = new Set(RED_MOON.archetypes.flatMap((a) => a.startingAbilities));
    for (const technique of techniques) expect(covered.has(technique), technique).toBe(true);
  });

  it('using a trait costs you instability rather than paying you in it', () => {
    const state = player('arch_bare');
    const before = instability(state);
    const resolution = act(state, 'I raise the plating on my arm.');

    const delta = resolution.mutations.find(
      (m) =>
        m.type === 'RESOURCE_DELTA' &&
        (m.payload as { resourceId?: string }).resourceId === 'instability',
    );
    expect(delta, 'plating should move instability').toBeDefined();
    expect(Number((delta!.payload as { amount: number }).amount)).toBeGreaterThan(0);
    expect(before).toBeLessThan(100);
  });
});

describe('the two forms of every trait', () => {
  const pairs = [
    ['plating_held', 'plating_loosed'],
    ['live_wire_held', 'live_wire_loosed'],
    ['shear_cry_held', 'shear_cry_loosed'],
    ['knitting_held', 'knitting_loosed'],
    ['kite_step_held', 'kite_step_loosed'],
    ['unseen_held', 'unseen_loosed'],
  ] as const;

  it('every trait has a held form and a loosed one', () => {
    for (const [held, loosed] of pairs) {
      expect(RED_MOON.abilities.some((a) => a.id === held), held).toBe(true);
      expect(RED_MOON.abilities.some((a) => a.id === loosed), loosed).toBe(true);
    }
  });

  it('the loosed form does not answer to somebody holding themselves together', () => {
    const state = player('arch_bare');
    for (const [, loosed] of pairs) {
      const ability = RED_MOON.abilities.find((a) => a.id === loosed)!;
      const blocked = unmetRequirement(state, RED_MOON, ability);
      expect(blocked, `${loosed} should be locked at low instability`).not.toBeNull();
      // And the refusal is written in the world, never as a threshold.
      expect(blocked!.inWorld).not.toMatch(/\d/);
    }
  });

  it('and answers once you have stopped', () => {
    const state = player('arch_bare');
    state.player.resources.find((r) => r.id === 'instability')!.current = 55;
    for (const [, loosed] of pairs) {
      const ability = RED_MOON.abilities.find((a) => a.id === loosed)!;
      expect(unmetRequirement(state, RED_MOON, ability), loosed).toBeNull();
    }
  });

  it('the held form works either way, so the human path is still a path', () => {
    const low = player('arch_bare');
    const high = player('arch_bare');
    high.player.resources.find((r) => r.id === 'instability')!.current = 70;
    for (const [held] of pairs) {
      const ability = RED_MOON.abilities.find((a) => a.id === held)!;
      expect(unmetRequirement(low, RED_MOON, ability), held).toBeNull();
      expect(unmetRequirement(high, RED_MOON, ability), held).toBeNull();
    }
  });
});

describe('anchoring, and the point of no return', () => {
  it('pulls you back while there is still something to pull on', () => {
    const state = player('arch_longblade');
    state.player.resources.find((r) => r.id === 'instability')!.current = 60;
    const anchor = RED_MOON.abilities.find((a) => a.id === 'anchor')!;
    expect(unmetRequirement(state, RED_MOON, anchor)).toBeNull();
  });

  it('stops working once you have gone far enough', () => {
    const state = player('arch_longblade');
    state.player.resources.find((r) => r.id === 'instability')!.current = 92;
    const anchor = RED_MOON.abilities.find((a) => a.id === 'anchor')!;
    const blocked = unmetRequirement(state, RED_MOON, anchor);
    expect(blocked, 'anchoring should close above 85').not.toBeNull();
    expect(blocked!.inWorld).toMatch(/nothing on the other end/i);
  });
});

describe('being found out', () => {
  it('tracks suspicion as its own meter, separately from instability', () => {
    const suspicion = RED_MOON.resources.find((r) => r.id === 'suspicion')!;
    expect(suspicion.polarity).toBe('GOOD_LOW');
    expect(suspicion.visible).toBe(true);
  });

  it('lets a whole run happen without anyone finding out', () => {
    const step = RED_MOON.quests
      .find((q) => q.id === 'q_back_on_the_roster')!
      .steps.find((s) => s.id === 'step_who_knows')!;
    const silent = step.succeedWhenAny.find((r) => r.routeId === 'told_nobody');
    expect(silent, 'telling nobody must be a real route').toBeDefined();
    expect(silent!.predicate.flagsUnset).toContain('told_someone');
  });

  it('gives every person you could tell a different consequence', () => {
    const step = RED_MOON.quests
      .find((q) => q.id === 'q_back_on_the_roster')!
      .steps.find((s) => s.id === 'step_who_knows')!;
    const flags = step.succeedWhenAny.map((r) => r.setsFlags.join(','));
    expect(new Set(flags).size).toBe(flags.length);
  });
});

describe('missions are not all "kill the monster"', () => {
  it('lets the culvert be solved without touching the animal', () => {
    const step = RED_MOON.quests
      .find((q) => q.id === 'q_the_nettlejaw')!
      .steps.find((s) => s.id === 'step_deal_with_it')!;

    const bloodless = step.succeedWhenAny.filter(
      (r) => !r.predicate.flagsSet.some((f) => f.startsWith('attacked:')),
    );
    expect(bloodless.length, 'at least one route that never attacks it').toBeGreaterThan(0);
  });

  it('opens the mission by investigation rather than by being handed it', () => {
    const step = RED_MOON.quests
      .find((q) => q.id === 'q_the_nettlejaw')!
      .steps.find((s) => s.id === 'step_find_it')!;
    expect(step.succeedWhenAny.length).toBeGreaterThanOrEqual(3);
  });
});

describe('the world on its own clock', () => {
  it('has a day that happens whether the player is involved or not', () => {
    expect(RED_MOON.worldEvents.length).toBeGreaterThanOrEqual(5);
    const minutes = RED_MOON.worldEvents.map((e) => e.atWorldMinute);
    expect(new Set(minutes).size).toBe(minutes.length);
  });

  it('lets the player change one of them', () => {
    const cancellable = RED_MOON.worldEvents.filter((e) => e.cancelledByFlags.length > 0);
    expect(cancellable.length).toBeGreaterThan(0);
  });

  it('only fires events at places the world contains', () => {
    for (const event of RED_MOON.worldEvents) {
      if (event.locationId === null) continue;
      expect(RED_MOON.locations.some((l) => l.id === event.locationId), event.id).toBe(true);
      for (const move of event.movesCharacters) {
        expect(RED_MOON.characters.some((c) => c.id === move.characterId), move.characterId).toBe(true);
        expect(RED_MOON.locations.some((l) => l.id === move.toLocationId), move.toLocationId).toBe(true);
      }
    }
  });
});
