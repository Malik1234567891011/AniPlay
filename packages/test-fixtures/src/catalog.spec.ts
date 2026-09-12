import { describe, expect, it } from 'vitest';
import { LAUNCH_CATALOG } from './index.js';

/**
 * Is this a game, or an AI chat with statistics drawn around it?
 *
 * These are the structural half of that question — the half a test can answer
 * without playing. A world that fails one of them can still produce good prose;
 * it just cannot produce two runs that differ.
 */
describe('every launch world', () => {
  for (const story of LAUNCH_CATALOG) {
    describe(story.title, () => {
      const steps = story.quests.flatMap((quest) =>
        quest.steps.map((step) => ({ quest: quest.id, step })),
      );
      const routes = steps.flatMap(({ quest, step }) =>
        (step.succeedWhenAny ?? []).map((route) => ({ quest, step: step.id, route })),
      );

      it('has more than one way through', () => {
        // A world where every step has exactly one predicate is the same run
        // for everybody, however well it is written.
        expect(routes.length, 'no branching steps at all').toBeGreaterThanOrEqual(3);
      });

      it('never offers a route nobody could take', () => {
        const grantable = new Set([
          ...story.archetypes.flatMap((a) => a.startingAbilities),
          ...story.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id),
          ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
        ]);
        const obtainable = new Set([
          ...story.archetypes.flatMap((a) => a.startingItems.map((i) => i.itemId)),
          ...story.rules.startingItems.map((i) => i.itemId),
          ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.items.map((i) => i.itemId))),
          ...story.locations.flatMap((l) => l.takeableItems.map((i) => i.itemId)),
        ]);

        for (const { quest, step, route } of routes) {
          const where = `${quest}/${step}/${route.routeId}`;
          for (const flag of route.predicate.flagsSet) {
            if (!flag.startsWith('used:')) continue;
            const abilityId = flag.slice('used:'.length);
            expect(grantable.has(abilityId), `${where} needs ${abilityId}, which nobody can have`).toBe(true);
          }
          for (const itemId of route.predicate.hasItems) {
            expect(obtainable.has(itemId), `${where} needs ${itemId}, which nothing gives out`).toBe(true);
          }
        }
      });

      it('never demands the thing it is about to hand you', () => {
        for (const { quest, step } of steps) {
          const granted = new Set(step.rewards.items.map((i) => i.itemId));
          const demanded = [
            ...(step.succeedWhen?.hasItems ?? []),
            ...(step.succeedWhenAny ?? []).flatMap((r) => r.predicate.hasItems),
          ];
          for (const itemId of demanded) {
            expect(
              granted.has(itemId),
              `${quest}/${step.id} can only be finished by someone who already has the ${itemId} it awards`,
            ).toBe(false);
          }
        }
      });

      it('gives every archetype something the rules can see', () => {
        for (const archetype of story.archetypes) {
          const total =
            Object.keys(archetype.attributeBonus).length +
            Object.keys(archetype.skillProficiencies).length +
            archetype.startingAbilities.length +
            archetype.startingItems.length;
          expect(total, `${archetype.id} grants nothing`).toBeGreaterThan(0);
        }
      });

      it('leaves something worth taking somewhere in the world', () => {
        if (story.items.length === 0) return;
        const takeable = story.locations.flatMap((l) => l.takeableItems);
        expect(takeable.length, 'nothing anywhere can be picked up or stolen').toBeGreaterThan(0);
        for (const entry of takeable) {
          expect(story.items.some((item) => item.id === entry.itemId), entry.itemId).toBe(true);
          if (entry.ownerId) {
            expect(story.characters.some((c) => c.id === entry.ownerId), entry.ownerId).toBe(true);
          }
        }
      });

      it('closes something when a route is taken, at least somewhere', () => {
        // A choice that costs nothing is not a choice. Not every route needs to
        // shut a door, but a world where none of them ever does has no branches
        // that matter.
        if (routes.length === 0) return;
        expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
      });
    });
  }
});

/**
 * A world whose art exists must actually ask for it.
 *
 * `derive-assets.ts` says this failure is "invisible in tests and only shows up
 * in a screenshot, so it is designed out rather than guarded against". It was
 * not designed out: Hush House, Window Seven and Good Morning, Husband were
 * exported raw — correct while their art was uncommissioned, and silently wrong
 * the moment it was generated. 180 files sat on disk while the catalog served
 * null and every card drew a gradient.
 *
 * So: guarded against, since the design did not hold.
 */
describe('worlds that have art declare it', () => {
  const assetsRoot = new URL('../../../infra/seed/assets/', import.meta.url);

  for (const story of LAUNCH_CATALOG) {
    it(`${story.title} declares a cover if one has been generated`, async () => {
      const { existsSync } = await import('node:fs');
      const generated = existsSync(new URL(`${story.storyId}/cover.webp`, assetsRoot));
      if (!generated) return; // Art not commissioned yet: null keys are correct.
      expect(story.coverImage, `${story.title} has cover art on disk but declares none`).toBeTruthy();
      expect(story.keyArt, `${story.title} has art on disk but declares no key art`).toBeTruthy();
    });
  }
});

/**
 * Every expression a world authors must resolve to a face that exists.
 *
 * Reaction decks are generated from a fixed eight, and worlds name expressions
 * in their own voice — `sulking`, `implacable`, `unimpressed`. Nothing
 * reconciled the two, so the director picked an authored word, the asset key
 * had never been drawn, and the frame 404'd silently. Measured when this was
 * written: **257 of 374 authored expressions across the catalog had no asset.**
 * Sixty-four of Itachi's eighty-nine files are reaction frames and only
 * `neutral` could be reached, which is why a world with eighty-nine images
 * looked like a world with none.
 *
 * `toReactionEmotion` maps the authored word onto one of the eight. This checks
 * the map actually covers what the catalog says, so a new world introducing a
 * new word fails here rather than shipping an invisible hole.
 */
describe('authored expressions resolve to a real face', () => {
  for (const story of LAUNCH_CATALOG) {
    it(`${story.title} uses expressions the generator draws`, async () => {
      const { knownExpression } = await import('@plotbreak/contracts');
      const unknown = story.characters
        .flatMap((c) => c.expressions.map((e) => ({ character: c.name, expression: e })))
        .filter(({ expression }) => !knownExpression(expression));
      expect(
        unknown.map((u) => `${u.character}: ${u.expression}`),
        'add these to EMOTION_SYNONYMS in packages/contracts/src/game/assets.ts',
      ).toEqual([]);
    });
  }
});
