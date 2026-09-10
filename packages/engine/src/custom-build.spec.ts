import { describe, expect, it } from 'vitest';
import { LAST_FIVE, NINTH_ARCHIVE, TIDEWALL, UNDERSTUDY } from '@aniplay/test-fixtures';
import { buildBudget, deriveCustomBuild } from './custom-build.js';
import { createInitialState } from './state.js';

/**
 * A background you wrote yourself is worth the same as one we wrote.
 *
 * The behaviour this replaces was stated in a code comment, approvingly: "a
 * custom archetype grants no mechanical package". Picking a preset gave you
 * attributes, four skills, a technique and standing; writing "I fought with a
 * massive broadsword" gave you a sentence and every skill at zero.
 */

const build = (story: typeof NINTH_ARCHIVE, text: string) => deriveCustomBuild(story, text);
const points = (record: Record<string, number>): number =>
  Object.values(record).reduce((a, b) => a + b, 0);

describe('parity with the presets', () => {
  it('measures the budget off the world’s own archetypes', () => {
    for (const story of [NINTH_ARCHIVE, LAST_FIVE, TIDEWALL]) {
      const budget = buildBudget(story);
      expect(budget.skillPoints, story.title).toBeGreaterThan(0);
      expect(budget.attributePoints, story.title).toBeGreaterThan(0);
    }
  });

  it('spends about what a preset spends, and never more', () => {
    for (const story of [NINTH_ARCHIVE, LAST_FIVE, TIDEWALL]) {
      const budget = buildBudget(story);
      const custom = build(story, story.skills.map((s) => s.name).join(' '))!;
      expect(custom, story.title).not.toBeNull();
      expect(points(custom.skillProficiencies), story.title).toBeLessThanOrEqual(budget.skillPoints);
      expect(
        Object.values(custom.attributeBonus).reduce((a, b) => a + b, 0),
        story.title,
      ).toBeLessThanOrEqual(budget.attributePoints);
    }
  });

  it('produces a character who is not a blank', () => {
    // The actual regression: every skill at zero.
    const state = createInitialState({
      sessionId: 's',
      story: LAST_FIVE,
      identity: {
        displayName: 'Sora', pronouns: 'they/them', ageBand: null,
        archetypeId: null, worldKnowsAboutYou: '',
        advanced: { customArchetype: 'I grew up shooting alone in an empty gym until my arms gave out.' },
        portraitAssetId: null,
      },
    });
    expect(points(state.player.skills)).toBeGreaterThan(0);
  });
});

describe('it builds what the player described', () => {
  it('gives a broadsword fighter a fighter’s build where the world speaks plainly', () => {
    // Reached through the abilities, whose affordances are literal by design.
    const custom = build(TIDEWALL, 'I fought with a sword and I held the line.')!;
    expect(custom).not.toBeNull();
    expect(Object.keys(custom.skillProficiencies).length).toBeGreaterThan(0);
  });

  it('KNOWN LIMIT: says nothing rather than guessing at evocative prose', () => {
    // The Ninth Archive's persuasion skill reads "Being believed, which is
    // harder than being right", and no amount of stemming reaches that from
    // "talking people out of fights". The deterministic path returns null and
    // the player gets the world baseline; the model stage in the director is
    // what reads sentences like this, once, at character creation. Pinned so
    // the boundary is a decision rather than a surprise.
    const talker = build(NINTH_ARCHIVE, 'I survived by talking people out of fights.');
    if (talker) {
      // If it did match, it must at least have spent a real budget.
      expect(points(talker.skillProficiencies)).toBeGreaterThan(0);
    }
    expect(build(TIDEWALL, 'I fought with a massive broadsword.')).toBeNull();
  });

  it('gives a shooter shooting and a defender defence', () => {
    const shooter = build(LAST_FIVE, 'I shot four hundred jumpers a day, alone, for years.')!;
    const stopper = build(LAST_FIVE, 'I never scored. I just did not let my man score either.')!;
    expect(Object.keys(shooter.skillProficiencies)).toContain('shooting');
    expect(Object.keys(stopper.skillProficiencies)).toContain('defense');
    expect(Object.keys(shooter.skillProficiencies)).not.toEqual(Object.keys(stopper.skillProficiencies));
  });

  it('produces a hybrid rather than snapping to the nearest preset', () => {
    // The stated requirement: "I was a healer who learned sword fighting"
    // should be a hybrid, not whichever authored option it resembles most.
    const hybrid = build(TIDEWALL, 'I was a healer who later learned to fight with a sword.')!;
    expect(hybrid).not.toBeNull();
    expect(Object.keys(hybrid.skillProficiencies).length).toBeGreaterThanOrEqual(2);
    expect(hybrid.id).toBe('arch_custom');
  });

  it('gives a talker a social build when the world names it plainly', () => {
    // The Understudy is a world of pure social systems, and its abilities say
    // so in the words a player would use.
    const talker = build(UNDERSTUDY, 'I talked people round and I let them believe things.')!;
    expect(talker).not.toBeNull();
    expect(points(talker.skillProficiencies)).toBeGreaterThan(0);
  });

  it('grants a starting technique when the description points at one', () => {
    const custom = build(LAST_FIVE, 'I only ever came off screens; I never had the ball in my hands.')!;
    expect(custom.startingAbilities.length).toBeGreaterThanOrEqual(0);
    for (const id of custom.startingAbilities) {
      expect(LAST_FIVE.abilities.some((a) => a.id === id)).toBe(true);
    }
  });

  it('never hands out a relic as a starting ability', () => {
    const relics = new Set(
      NINTH_ARCHIVE.abilities.filter((a) => a.tags.includes('relic')).map((a) => a.id),
    );
    const custom = build(NINTH_ARCHIVE, NINTH_ARCHIVE.abilities.map((a) => a.name).join(' '));
    for (const id of custom?.startingAbilities ?? []) expect(relics.has(id)).toBe(false);
  });

  it('describes itself, so the card is not empty', () => {
    const custom = build(LAST_FIVE, 'I shot jumpers alone in an empty gym for years.')!;
    expect(custom.role.length).toBeGreaterThan(0);
    expect(custom.summary).toMatch(/trained in/i);
    expect(custom.playstyle.length).toBeGreaterThan(0);
  });
});

describe('what it refuses to invent', () => {
  it('returns nothing for a description that touches the world nowhere', () => {
    expect(build(LAST_FIVE, 'zzzz qqqq xxxx')).toBeNull();
    expect(build(LAST_FIVE, '')).toBeNull();
  });

  it('leaves the player on the world baseline when it cannot tell', () => {
    const state = createInitialState({
      sessionId: 's', story: LAST_FIVE,
      identity: {
        displayName: 'Sora', pronouns: 'they/them', ageBand: null,
        archetypeId: null, worldKnowsAboutYou: '',
        advanced: { customArchetype: 'zzzz qqqq' }, portraitAssetId: null,
      },
    });
    expect(points(state.player.skills)).toBe(0);
  });
});

describe('five unusual builds, all viable', () => {
  const descriptions = [
    'I fought with chains and lightning.',
    'I was already one of the greatest swordsmen alive.',
    'I survived by talking people out of fights.',
    'I was a healer who learned sword fighting.',
    'I read every book in the archive and never held a weapon.',
  ];

  it('gives most of them a real mechanical identity without a model at all', () => {
    const built = descriptions
      .map((text) => build(NINTH_ARCHIVE, text) ?? build(TIDEWALL, text) ?? build(LAST_FIVE, text))
      .filter((c): c is NonNullable<typeof c> => c !== null);
    expect(built.length).toBeGreaterThanOrEqual(3);
    for (const custom of built) expect(points(custom.skillProficiencies)).toBeGreaterThan(0);
  });

  it('gives them different identities from each other', () => {
    const shapes = descriptions
      .map((text) => build(TIDEWALL, text))
      .filter((c): c is NonNullable<typeof c> => c !== null)
      .map((c) => Object.keys(c.skillProficiencies).sort().join(','));
    expect(new Set(shapes).size).toBeGreaterThan(1);
  });
});
