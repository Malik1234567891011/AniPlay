import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import type { QuestPredicate, StoryVersion } from '@plotbreak/contracts';
import { WINDOW_SEVEN } from './index.js';

/**
 * Window Seven, held to the ways a wired-up world can still be unplayable.
 *
 * This file existed for a while without being in `LAUNCH_CATALOG`, which meant
 * no test in the repo had ever loaded it — and it did not parse. That is the
 * first thing here, and the rest are the failures that survive parsing: a flag
 * that gates two endings and is handed to everybody, a flag that gates two
 * endings and is obtainable for ninety minutes on the first night, and five of
 * eight destinations funnelling through one purchase off a concierge.
 *
 * `endings.spec.ts` cannot see any of it. It asks whether *something* sets a
 * flag, never whether a single run could reach it.
 */

const steps = WINDOW_SEVEN.quests.flatMap((q) => q.steps.map((step) => ({ quest: q.id, step })));
const routes = steps.flatMap(({ quest, step }) =>
  step.succeedWhenAny.map((route) => ({ quest, step: step.id, route })),
);

/** Everything that can put a flag on the board, by source. */
function sources(story: StoryVersion): Map<string, string[]> {
  const map = new Map<string, string[]>();
  const add = (flag: string, where: string) => {
    map.set(flag, [...(map.get(flag) ?? []), where]);
  };
  for (const quest of story.quests) {
    for (const step of quest.steps) {
      for (const flag of step.rewards.flags) add(flag, `${quest.id}/${step.id}:reward`);
      for (const route of step.succeedWhenAny) {
        for (const flag of route.setsFlags) add(flag, `${quest.id}/${step.id}/${route.routeId}`);
      }
    }
  }
  for (const event of story.worldEvents) for (const flag of event.setsFlags) add(flag, `event:${event.id}`);
  return map;
}

describe('the world loads at all', () => {
  it('is in the launch catalog, which is what turns the tests on', () => {
    expect(WINDOW_SEVEN.title).toBe('Window Seven');
    expect(WINDOW_SEVEN.characters.length).toBeGreaterThanOrEqual(5);
  });

  it('never gates an ability on an item, which the schema cannot express', () => {
    // `AbilityDef.requires` is strict and has no `hasItems` — that key belongs
    // to `QuestPredicate`. Two abilities carried one, and the whole file threw
    // on import for months without a single test noticing.
    for (const ability of WINDOW_SEVEN.abilities) {
      expect(Object.keys(ability.requires).sort()).toEqual(
        ['flagsSet', 'flagsUnset', 'lockedCopy', 'maxResources', 'minResources'],
      );
    }
  });

  it('tells the player why a locked ability is locked, in the world’s own words', () => {
    for (const ability of WINDOW_SEVEN.abilities) {
      if (ability.unlockedByDefault) continue;
      expect(ability.requires.lockedCopy.length, ability.id).toBeGreaterThan(30);
      expect(ability.requires.lockedCopy, ability.id).not.toMatch(/flag|predicate|requires/i);
    }
  });
});

describe('a flag that gates an ending is a flag a run can actually get', () => {
  it('does not hand out the flag that means "you kept to the brief"', () => {
    // `closesFlags` writes `closed:X`; it never unsets `X`. So a flag in a
    // step's `rewards` reaches every run regardless of route, and the sibling
    // route that tried to revoke it could not. A player who rang the target on
    // night one still qualified as having run a clean operation.
    const where = sources(WINDOW_SEVEN).get('clean_operation') ?? [];
    expect(where.length, 'nothing sets clean_operation').toBeGreaterThan(0);
    for (const source of where) {
      expect(source, 'clean_operation is granted by a step, so every run gets it').not.toMatch(/:reward$/);
    }
  });

  it('never tries to revoke a flag its own step hands out', () => {
    for (const { quest, step } of steps) {
      const granted = new Set(step.rewards.flags);
      for (const route of step.succeedWhenAny) {
        for (const flag of route.closesFlags) {
          expect(
            granted.has(flag),
            `${quest}/${step.id}/${route.routeId} closes ${flag}, which the step awards anyway`,
          ).toBe(false);
        }
      }
    }
  });

  it('gives "you broke the brief" more than one night to happen on', () => {
    // It had exactly one source, on the first step of the first quest, and
    // gated a UNIQUE ending, a RARE ending and a branch of Mara's arc. Rule
    // four of the brief is "make no contact", so every route that reaches the
    // target breaks it.
    const where = sources(WINDOW_SEVEN).get('broke_the_brief') ?? [];
    expect(where.length, `only ${where.join(', ')} sets it`).toBeGreaterThanOrEqual(3);
  });

  it('gives every ending-gating flag at least one source', () => {
    const known = sources(WINDOW_SEVEN);
    const ENGINE = ['left_the_map', 'dead:', 'knows:', 'met:', 'spoke:', 'visited:', 'used:'];
    for (const ending of WINDOW_SEVEN.endings) {
      for (const flag of [...ending.requires.flagsSet, ...ending.requires.flagsUnset]) {
        if (ENGINE.some((p) => flag === p || flag.startsWith(p))) continue;
        expect(known.has(flag), `${ending.name} needs "${flag}" and nothing sets it`).toBe(true);
      }
    }
  });

  it('does not funnel the endgame through one purchase', () => {
    // Every route to the archive used to require holding `palisade_drive`,
    // which is takeable in one locked room, whose only key was an item bought
    // from the concierge. Five of eight destinations ran through that desk.
    const ways = routes.filter(({ route }) => route.setsFlags.includes('penthouse_access'));
    expect(ways.length, 'one way into the penthouse').toBeGreaterThanOrEqual(2);
    const predicates = ways.map(({ route }) => route.predicate);
    expect(
      predicates.some((p: QuestPredicate) => p.hasItems.length === 0),
      'every way up still costs an item',
    ).toBe(true);
  });

  it('cannot dead-end the quest about whether Mara follows the order', () => {
    const step = steps.find(({ step: s }) => s.id === 'whether_she_uses_it')!.step;
    // At least one route must be reachable without a relationship threshold,
    // an item, or a flag from a different branch — or a player who was simply
    // told about the order has no way to finish the arc.
    const unconditional = step.succeedWhenAny.filter(
      (r) =>
        r.predicate.minRelationship.length === 0 &&
        r.predicate.hasItems.length === 0 &&
        r.predicate.flagsSet.every((f) => f === 'seventh_night'),
    );
    expect(unconditional.length, 'every route needs something a run might not have').toBeGreaterThan(0);
  });
});

describe('the geography agrees with itself', () => {
  it('does not put a lift between two buildings on opposite sides of a road', () => {
    const lobby = WINDOW_SEVEN.locations.find((l) => l.id === 'orpheum_lobby')!;
    const penthouse = WINDOW_SEVEN.locations.find((l) => l.id === 'voss_penthouse')!;
    expect(lobby.connections.map((c) => c.to)).not.toContain('voss_penthouse');
    expect(penthouse.connections.map((c) => c.to)).not.toContain('orpheum_lobby');
  });

  it('connects every location to something', () => {
    const ids = new Set(WINDOW_SEVEN.locations.map((l) => l.id));
    for (const location of WINDOW_SEVEN.locations) {
      const inbound = WINDOW_SEVEN.locations.some((l) => l.connections.some((c) => c.to === location.id));
      expect(inbound || location.connections.length > 0, `${location.id} is an island`).toBe(true);
      for (const c of location.connections) expect(ids, `${location.id} -> ${c.to}`).toContain(c.to);
    }
  });
});

describe('five people, five mouths', () => {
  it('does not let three of them run the same construction', () => {
    // Selene, Ash and Halden all negated-then-corrected in contraction-free
    // sentences with a number in them. Ask any of the three "why should I
    // trust you" and the answer was indistinguishable.
    const NEGATE_THEN_CORRECT = /\bI (?:am|’m) not (?:asking|accusing|saying|going to)\b/i;
    const users = WINDOW_SEVEN.characters
      .filter((c) => c.voiceSamples.some((v) => NEGATE_THEN_CORRECT.test(v)))
      .map((c) => c.id);
    expect(users.length, `${users.join(', ')} share a construction`).toBeLessThanOrEqual(1);
  });

  it('gives everybody three or more samples and nothing empty', () => {
    for (const c of WINDOW_SEVEN.characters) {
      expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(3);
      expect(c.fears.length, `${c.id} fears nothing`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values nothing`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} wants nothing privately`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} would do anything`).toBeGreaterThan(0);
      for (const secret of c.secrets) expect(secret.revealHint.length, secret.id).toBeGreaterThan(10);
    }
  });

  it('does not write one schedule block three times', () => {
    // Halden had all 1440 minutes at one desk across three blocks, two of which
    // were "at the desk" and "still at the desk". Mara legitimately never
    // leaves — not leaving is the job — so the property that holds for
    // everybody is that the day is made of distinguishable activities.
    // Juno's night shift legitimately appears at both ends of the day, because
    // it wraps midnight. What must not happen is two blocks in a row that say
    // the same thing.
    for (const c of WINDOW_SEVEN.characters) {
      expect(c.schedule.length, `${c.id} has almost no day`).toBeGreaterThanOrEqual(3);
      for (let i = 1; i < c.schedule.length; i++) {
        expect(
          c.schedule[i]!.activity,
          `${c.id} block ${i} repeats the one before it`,
        ).not.toBe(c.schedule[i - 1]!.activity);
      }
    }
  });

  it('sends everybody except the one on the glass somewhere', () => {
    for (const c of WINDOW_SEVEN.characters) {
      if (c.id === 'mara') continue; // seven nights in the flat is the premise.
      const places = new Set(c.schedule.map((b) => b.locationId));
      expect(places.size, `${c.id} never goes anywhere`).toBeGreaterThan(1);
    }
  });
});

describe('Window Seven as a world', () => {
  it('opens with the partner in the room', () => {
    const state = createInitialState({
      sessionId: 'sess_w7',
      story: WINDOW_SEVEN,
      identity: {
        displayName: 'Rowan Ash-Bell',
        pronouns: 'they/them',
        ageBand: null,
        archetypeId: WINDOW_SEVEN.archetypes[0]!.id,
        worldKnowsAboutYou: '',
        advanced: {},
        portraitAssetId: null,
      },
    });
    expect(charactersPresent(state).map((c) => c.characterId)).toContain('mara');
  });

  it('lets somebody simply stop, and calls that a destination', () => {
    const walk = WINDOW_SEVEN.endings.find((e) => e.id === 'end_stopped_going');
    expect(walk, 'no way to leave without defecting or being burned').toBeDefined();
    expect(walk!.requires.flagsUnset).toContain('broke_the_brief');
  });

  it('uses the whole rarity range rather than calling everything rare', () => {
    const tiers = new Set(WINDOW_SEVEN.endings.map((e) => e.rarity));
    expect(tiers.size, [...tiers].join(',')).toBeGreaterThanOrEqual(4);
  });

  it('carries enough authored sequence for seven nights', () => {
    // Six steps used to cover a week. The house norm is ten to seventeen.
    expect(steps.length).toBeGreaterThanOrEqual(10);
  });

  it('keeps one invisible variable, described as behaviour', () => {
    expect(WINDOW_SEVEN.resources.length).toBeLessThanOrEqual(2);
    for (const resource of WINDOW_SEVEN.resources) {
      expect(resource.visible, resource.id).toBe(false);
      expect(resource.bands.length, resource.id).toBeGreaterThanOrEqual(3);
    }
  });
});
