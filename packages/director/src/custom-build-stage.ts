import { z } from 'zod';
import type { ArchetypeDef, StoryVersion } from '@plotbreak/contracts';
import { buildBudget, deriveCustomBuild } from '@plotbreak/engine';
import type { ModelGateway } from './gateway/types.js';
import { ModelGatewayError } from './gateway/types.js';
import { buildMessages, SAFETY_POLICY } from './model-stages.js';

/**
 * Spec §9.4 — reading a background the player wrote.
 *
 * The deterministic version in the engine matches the player's words against
 * the world's own vocabulary, and it is genuinely good where a world's
 * affordances are written in plain language. It is not good against evocative
 * prose: the persuasion skill in The Ninth Archive reads "Being believed,
 * which is harder than being right", and no amount of stemming gets there from
 * "I survived by talking people out of fights".
 *
 * So the model reads it, once, at character creation — the cheapest possible
 * place for a model call, since it happens once per session rather than once
 * per turn. The engine's version stays as the fallback for offline runs, tests
 * and any failure, which is the same shape every other model stage here uses.
 *
 * The model chooses *which* skills. It does not choose how many points there
 * are: the budget comes from the world's own authored archetypes, and is
 * enforced here rather than trusted, so a freeform background is exactly as
 * strong as a preset and never stronger.
 */

const CustomBuildChoice = z
  .object({
    /** Two to four skill ids from this world, most central first. */
    skillIds: z.array(z.string()).min(1).max(4),
    /** At most one ability id this background would plausibly already know. */
    abilityIds: z.array(z.string()).max(2).default([]),
    /** A faction this background would already stand with, if any. */
    factionId: z.string().nullable().default(null),
    /** Two or three words for the card. "Aggressive", "Close range". */
    playstyle: z.array(z.string()).min(1).max(4),
    role: z.string().max(40),
    summary: z.string().max(220),
  })
  .strict();

const POLICY = [
  'You read a background a player wrote for themselves and decide what it means mechanically.',
  'Choose only from the ids you are given. Never invent one.',
  'Choose what they actually described, not the nearest preset: "a healer who learned sword fighting" is',
  'both of those things, not whichever single option is closest.',
  'Do not judge whether the background is powerful, balanced or sensible. The budget is fixed elsewhere.',
].join(' ');

export async function deriveCustomBuildWithModel(
  gateway: ModelGateway,
  story: StoryVersion,
  description: string,
): Promise<ArchetypeDef | null> {
  const text = description.trim();
  if (text.length === 0) return null;

  const fallback = (): ArchetypeDef | null => deriveCustomBuild(story, text);

  try {
    const result = await gateway.generateStructured(
      'intent_fast',
      CustomBuildChoice,
      buildMessages({
        rolePolicy: POLICY,
        safety: SAFETY_POLICY,
        worldRules: `World: ${story.title}. ${story.rules.toneGuide}`,
        state: {
          skills: story.skills.map((s) => ({ id: s.id, name: s.name, about: s.description })),
          abilities: story.abilities
            .filter((a) => !a.tags.includes('relic') && !a.unlockedByDefault)
            .map((a) => ({ id: a.id, name: a.name, about: a.description })),
          factions: story.factions.map((f) => ({ id: f.id, name: f.name, about: f.description })),
        },
        task: 'Pick the skills, abilities and standing this background actually implies.',
        untrustedUserText: text,
      }),
      { maxTokens: 500, temperature: 0.1, timeoutMs: 8000 },
    );

    return spendBudget(story, text, result.value);
  } catch (error) {
    if (error instanceof ModelGatewayError) return fallback();
    throw error;
  }
}

/**
 * Turns the model's choices into a build, against the world's own budget.
 *
 * Everything the model returned is filtered to ids that exist and then spent
 * against a budget measured off the authored archetypes. The model is choosing
 * a shape; it is not choosing a size.
 */
function spendBudget(
  story: StoryVersion,
  description: string,
  choice: z.infer<typeof CustomBuildChoice>,
): ArchetypeDef | null {
  const budget = buildBudget(story);

  const skills = choice.skillIds
    .map((id) => story.skills.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => !!s);
  if (skills.length === 0) return deriveCustomBuild(story, description);

  // Weighted toward what the player put first, which is what they led with.
  const weights = skills.map((_, index) => skills.length - index);
  const total = weights.reduce((a, b) => a + b, 0);

  const skillProficiencies: Record<string, number> = {};
  let remaining = budget.skillPoints;
  skills.forEach((skill, index) => {
    if (remaining <= 0) return;
    const share = Math.min(3, Math.max(1, Math.round((weights[index]! / total) * budget.skillPoints)));
    const value = Math.min(share, remaining);
    if (value > 0) {
      skillProficiencies[skill.id] = value;
      remaining -= value;
    }
  });

  const attributeBonus: ArchetypeDef['attributeBonus'] = {};
  let attributeLeft = budget.attributePoints;
  for (const skill of skills) {
    if (attributeLeft <= 0) break;
    const add = Math.min(2, attributeLeft);
    attributeBonus[skill.attribute] = (attributeBonus[skill.attribute] ?? 0) + add;
    attributeLeft -= add;
  }

  const startingAbilities = choice.abilityIds
    .filter((id) => {
      const ability = story.abilities.find((a) => a.id === id);
      return ability && !ability.tags.includes('relic') && !ability.unlockedByDefault;
    })
    .slice(0, Math.max(0, budget.abilities));

  const faction = choice.factionId ? story.factions.find((f) => f.id === choice.factionId) : null;

  return {
    id: 'arch_custom',
    name: 'Your own',
    role: choice.role.slice(0, 40) || 'Your own way',
    summary: choice.summary.slice(0, 220),
    playstyle: choice.playstyle.map((p) => p.slice(0, 24)).slice(0, 4),
    blurb: description.slice(0, 400),
    attributeBonus,
    skillProficiencies,
    startingItems: [],
    startingAbilities,
    startingReputation: faction && budget.standing > 0 ? [{ factionId: faction.id, amount: budget.standing }] : [],
  };
}
