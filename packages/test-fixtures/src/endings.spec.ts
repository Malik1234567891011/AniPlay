import { describe, expect, it } from 'vitest';
import { LAUNCH_CATALOG } from './index.js';

/**
 * Endings that can actually be reached.
 *
 * An authored ending whose predicate names a flag nothing sets, or an item that
 * does not exist, is worse than no ending at all: it looks like a destination in
 * every audit and is unreachable in every session. This checks the wiring, not
 * the writing.
 */

/** Every flag any part of this world can set, plus the ones the engine sets. */
function settableFlags(story: (typeof LAUNCH_CATALOG)[number]): Set<string> {
  const flags = new Set<string>([
    // Engine-set, by prefix or exactly. See the observation-flag families in
    // `resolve.ts` and `commit.ts`.
    'left_the_map',
    'qualified',
  ]);
  for (const quest of story.quests) {
    for (const step of quest.steps) {
      // Both places a step writes flags: finishing it, and which route was used.
      for (const flag of step.rewards.flags) flags.add(flag);
      for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
    }
  }
  for (const event of story.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  // What it records when a companion walks off the ship. (`reactions` reads
  // flags rather than setting them, so it is not a source.)
  for (const character of story.characters) {
    for (const departure of character.companion?.leavesWhen ?? []) {
      for (const flag of departure.setsFlags) flags.add(flag);
    }
  }
  return flags;
}

/** Flag families the engine writes from play rather than from authoring. */
const ENGINE_PREFIXES = [
  'met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:',
  'cooldown:', 'route:', 'closed:', 'played:', 'beat:', 'lost_to:', 'dead:',
  'surrendered:', 'crew:', 'morale:', 'left:', 'tend:', 'scout:', 'mentioned:',
  'promoted:', 'undertaking:', 'knows:',
];

describe('every authored ending is reachable', () => {
  for (const story of LAUNCH_CATALOG) {
    if (story.endings.length === 0) continue;

    describe(story.title, () => {
      const flags = settableFlags(story);
      const items = new Set(story.items.map((i) => i.id));
      const locations = new Set(story.locations.map((l) => l.id));
      const characters = new Set(story.characters.map((c) => c.id));
      const factions = new Set(story.factions.map((f) => f.id));

      for (const ending of story.endings) {
        it(`${ending.name} names only things this world has`, () => {
          for (const flag of [...ending.requires.flagsSet, ...ending.requires.flagsUnset]) {
            if (ENGINE_PREFIXES.some((p) => flag.startsWith(p))) continue;
            expect(flags, `no part of ${story.title} sets "${flag}"`).toContain(flag);
          }
          for (const item of ending.requires.hasItems) expect(items).toContain(item);
          if (ending.requires.atLocation) expect(locations).toContain(ending.requires.atLocation);
          for (const rel of ending.requires.minRelationship) expect(characters).toContain(rel.characterId);
          for (const rep of ending.requires.minFactionReputation) expect(factions).toContain(rep.factionId);
        });
      }

      it('offers more than one destination, and at least one that is not a win', () => {
        expect(story.endings.length).toBeGreaterThanOrEqual(3);
        // A world whose only endings are victories has a route, not
        // destinations.
        expect(story.endings.some((e) => e.rarity === 'COMMON' || e.rarity === 'UNCOMMON')).toBe(true);
      });

      it('does not let the story end before it has been one', () => {
        for (const ending of story.endings) expect(ending.minTurn).toBeGreaterThan(0);
      });

      it('tells the writer what each ending means, not only what unlocks it', () => {
        for (const ending of story.endings) {
          expect(ending.condition.length, ending.name).toBeGreaterThan(80);
          expect(ending.epilogue.length, ending.name).toBeGreaterThan(60);
        }
      });
    });
  }
});
