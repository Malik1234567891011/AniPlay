import type { ArchetypeDef, AttributeKey, StoryVersion } from '@plotbreak/contracts';
import { ATTRIBUTE_KEYS } from '@plotbreak/contracts';

/**
 * Spec §9.4 — a background you wrote yourself is worth the same as one we wrote.
 *
 * The failure this exists for was stated in a code comment, approvingly: "a
 * custom archetype grants no mechanical package, so writing your own is a
 * narrative choice rather than a way to dodge the stat budget." Which means
 * picking a preset gave you attributes, four skills, a starting technique and
 * standing, and writing "I fought with a massive broadsword" gave you a
 * sentence and a character with every skill at zero.
 *
 * The freeform path is one of this product's central promises, so it cannot be
 * the weak option. The build is derived from the world's own vocabulary: what
 * the player wrote is matched against the skills, abilities and factions this
 * world actually has, and the result is spent against the same budget the
 * authored archetypes were written to.
 *
 * It is deliberately not a classifier onto the nearest preset. "I was a healer
 * who learned sword fighting" should produce a hybrid, not whichever authored
 * option it resembles most.
 */

/**
 * The budget, measured off the authored archetypes rather than invented.
 *
 * If a world's presets are generous, custom builds are generous in the same
 * way; if they are lean, so is this. Parity is the point.
 */
export function buildBudget(story: StoryVersion): {
  attributePoints: number;
  skillPoints: number;
  abilities: number;
  standing: number;
} {
  const presets = story.archetypes;
  if (presets.length === 0) {
    return { attributePoints: 4, skillPoints: 6, abilities: 1, standing: 0 };
  }

  const mean = (values: number[]): number =>
    values.length === 0 ? 0 : Math.round(values.reduce((a, b) => a + b, 0) / values.length);

  return {
    attributePoints: mean(
      presets.map((a) => Object.values(a.attributeBonus).reduce((sum, v) => sum + Math.max(0, v), 0)),
    ),
    skillPoints: mean(
      presets.map((a) => Object.values(a.skillProficiencies).reduce((sum, v) => sum + Math.max(0, v), 0)),
    ),
    abilities: mean(presets.map((a) => a.startingAbilities.length)),
    standing: mean(
      presets.map((a) => a.startingReputation.reduce((sum, r) => sum + Math.max(0, r.amount), 0)),
    ),
  };
}

const STOP = new Set([
  'the', 'and', 'was', 'were', 'with', 'that', 'this', 'from', 'have', 'been',
  'they', 'them', 'their', 'she', 'her', 'his', 'him', 'who', 'what', 'when',
  'about', 'into', 'very', 'just', 'like', 'able', 'used', 'learned', 'always',
]);

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9']+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
}

/**
 * Whether two words are about the same thing.
 *
 * Prefix matching alone was not enough: "broadsword" and "sword" share no
 * prefix at all, and a player who wrote "I fought with a massive broadsword"
 * got a blank character. Containment catches compounds, which is most of how
 * people describe fighting, and a shortened prefix catches inflections
 * ("shot" / "shooting", "heal" / "healer").
 *
 * Deliberately loose. A false match spends a point of a budget on a related
 * skill; a missed match hands somebody a character with nothing, and only one
 * of those is worth avoiding.
 */
function related(a: string, b: string): boolean {
  if (a.length >= 4 && b.includes(a)) return true;
  if (b.length >= 4 && a.includes(b)) return true;

  const limit = Math.min(a.length, b.length);
  let i = 0;
  while (i < limit && a[i] === b[i]) i += 1;
  return i >= 4 || (i >= 3 && limit <= 5);
}

interface Scored<T> {
  readonly item: T;
  readonly score: number;
}

function scoreAgainst<T>(words: readonly string[], items: readonly T[], textOf: (item: T) => string): Scored<T>[] {
  return items
    .map((item) => {
      const vocabulary = tokens(textOf(item));
      let score = 0;
      for (const word of words) {
        for (const known of vocabulary) {
          if (word === known) score += 2;
          else if (related(word, known)) score += 1;
        }
      }
      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);
}

/**
 * Turns a sentence into a real starting build.
 *
 * Returns null when nothing in the description touches this world at all,
 * which is the honest answer — a player who wrote something unrelated to the
 * setting gets the world's baseline rather than a build assembled from noise.
 */
export function deriveCustomBuild(story: StoryVersion, description: string): ArchetypeDef | null {
  const words = tokens(description);
  if (words.length === 0) return null;

  const budget = buildBudget(story);

  const abilityMatches = scoreAgainst(
    words,
    story.abilities.filter((a) => !a.tags.includes('relic')),
    (a) => `${a.name} ${a.description} ${a.affordances.join(' ')}`,
  );
  const factionMatches = scoreAgainst(words, story.factions, (f) => `${f.name} ${f.description}`);

  // Skills are reached through abilities as well as directly.
  //
  // Skill descriptions in these worlds are deliberately evocative — the
  // persuasion skill reads "Being believed, which is harder than being right"
  // — so matching a player's plain sentence against them finds nothing.
  // Affordances are the opposite by design: they are the literal phrases a
  // player would type. So an ability that matches lends its weight to the
  // skill it checks, which is how "I survived by talking people out of
  // fights" reaches persuasion without anybody having to author a keyword list.
  const skillScores = new Map<string, number>();
  const bump = (id: string | null | undefined, amount: number): void => {
    if (!id) return;
    skillScores.set(id, (skillScores.get(id) ?? 0) + amount);
  };

  for (const entry of scoreAgainst(words, story.skills, (s) => `${s.name} ${s.description}`)) {
    bump(entry.item.id, entry.score);
  }
  for (const entry of abilityMatches) {
    bump(entry.item.check?.skillId ?? null, entry.score);
  }

  const skillMatches = [...skillScores.entries()]
    .map(([id, score]) => ({ item: story.skills.find((s) => s.id === id)!, score }))
    .filter((entry) => entry.item)
    .sort((a, b) => b.score - a.score);

  if (skillMatches.length === 0 && abilityMatches.length === 0) return null;

  // Spend the skill budget across what they described, heaviest first, so a
  // single-minded description produces a specialist and a hybrid one produces
  // a hybrid — rather than both being flattened to the nearest preset.
  const skillProficiencies: Record<string, number> = {};
  let remaining = budget.skillPoints;
  const ranked = skillMatches.slice(0, 4);
  const total = ranked.reduce((sum, entry) => sum + entry.score, 0) || 1;
  for (const entry of ranked) {
    if (remaining <= 0) break;
    const share = Math.max(1, Math.round((entry.score / total) * budget.skillPoints));
    const value = Math.min(3, share, remaining);
    if (value > 0) {
      skillProficiencies[entry.item.id] = value;
      remaining -= value;
    }
  }

  // Attributes follow the skills, because that is what the skills are for.
  const attributeBonus: Partial<Record<AttributeKey, number>> = {};
  let attributeLeft = budget.attributePoints;
  for (const entry of ranked) {
    if (attributeLeft <= 0) break;
    const key = entry.item.attribute;
    if (!ATTRIBUTE_KEYS.includes(key)) continue;
    const add = Math.min(2, attributeLeft);
    attributeBonus[key] = (attributeBonus[key] ?? 0) + add;
    attributeLeft -= add;
  }

  const startingAbilities = abilityMatches
    .filter((entry) => !entry.item.unlockedByDefault)
    .slice(0, Math.max(0, budget.abilities))
    .map((entry) => entry.item.id);

  const startingReputation =
    budget.standing > 0 && factionMatches[0]
      ? [{ factionId: factionMatches[0].item.id, amount: budget.standing }]
      : [];

  const headline = describeBuild(story, skillProficiencies, startingAbilities);

  return {
    id: 'arch_custom',
    name: 'Your own',
    role: headline.role,
    summary: headline.summary,
    playstyle: headline.playstyle,
    blurb: description.slice(0, 400),
    attributeBonus,
    skillProficiencies,
    startingItems: [],
    startingAbilities,
    startingReputation,
  };
}

/**
 * What the derived build actually is, in the world's own words.
 *
 * So the setup screen can show a custom build the same card an authored one
 * gets, rather than an empty space where the mechanics would be.
 */
function describeBuild(
  story: StoryVersion,
  skills: Record<string, number>,
  abilityIds: readonly string[],
): { role: string; summary: string; playstyle: string[] } {
  const named = Object.entries(skills)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => story.skills.find((s) => s.id === id)?.name)
    .filter((n): n is string => !!n);

  const abilities = abilityIds
    .map((id) => story.abilities.find((a) => a.id === id)?.name)
    .filter((n): n is string => !!n);

  const role = named.slice(0, 2).join(' and ') || 'Your own way';
  const summary =
    named.length > 0
      ? `Trained in ${named.slice(0, 3).join(', ')}${abilities.length > 0 ? `, starting with ${abilities[0]}` : ''}.`
      : 'A background of your own.';

  return { role: role.slice(0, 40), summary: summary.slice(0, 220), playstyle: named.slice(0, 3) };
}
