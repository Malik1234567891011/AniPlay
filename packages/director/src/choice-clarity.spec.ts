import { describe, expect, it } from 'vitest';
import { LAUNCH_CATALOG } from '@aniplay/test-fixtures';
import type { ArchetypeDef, CharacterSetupField, StoryVersion } from '@aniplay/contracts';
import { abilityEffect, archetypeGrants } from '@aniplay/contracts';
import { checkChoiceClarity, checkStoryChoiceClarity } from './choice-clarity.js';

/**
 * The five questions a player has to be able to answer before committing to a
 * build. Every launch world is held to them, so a new world cannot ship a
 * screen that reads well and explains nothing.
 */
describe('choice clarity across the launch catalog', () => {
  for (const story of LAUNCH_CATALOG) {
    describe(story.title, () => {
      const field = story.setupFields.find((f) => f.kind === 'ARCHETYPE');

      it('has no clarity errors on any choice screen', () => {
        const report = checkStoryChoiceClarity(story);
        expect(
          report.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.optionId ?? '-'}: ${i.message}`),
        ).toEqual([]);
      });

      it('1. says what the player is choosing before asking', () => {
        expect(field).toBeDefined();
        expect(field!.helpText.length).toBeGreaterThan(60);
      });

      it('4. says whether the choice can be changed later', () => {
        expect(field!.helpText).toMatch(/fixed|permanent|keep it|for the whole story/i);
      });

      it('2 & 3. every option is nameable, comparable and distinct', () => {
        for (const option of story.archetypes) {
          expect(option.name, option.id).not.toMatch(/—/); // a name, not a name plus a clue
          expect(option.role.length, option.id).toBeGreaterThan(2);
          expect(option.summary.length, option.id).toBeGreaterThan(40);
          expect(option.playstyle.length, option.id).toBeGreaterThanOrEqual(2);
        }
        const tagSets = story.archetypes.map((a) => a.playstyle.join('|'));
        expect(new Set(tagSets).size).toBe(tagSets.length);
      });

      it('5. every option changes the character in a way the rules implement', () => {
        for (const option of story.archetypes) {
          const grants = archetypeGrants(story, option);
          const total =
            grants.abilities.length + grants.skills.length + grants.attributes.length + grants.items.length;
          expect(total, `${option.id} grants nothing`).toBeGreaterThan(0);
        }
      });
    });
  }
});

describe('the checker itself', () => {
  const story = LAUNCH_CATALOG[0]!;
  const field = story.setupFields.find((f) => f.kind === 'ARCHETYPE')! as CharacterSetupField;

  it('catches a title that is a riddle rather than a name', () => {
    const riddle: ArchetypeDef = { ...story.archetypes[0]!, name: 'Ember lean — forward and hot' };
    const report = checkChoiceClarity(story, field, [riddle]);
    expect(report.issues.some((i) => i.code === 'CRYPTIC_TITLE')).toBe(true);
    expect(report.passed).toBe(false);
  });

  it('catches a screen that asks before it explains', () => {
    const report = checkChoiceClarity(story, { ...field, helpText: '' }, story.archetypes);
    expect(report.issues.some((i) => i.code === 'MISSING_SYSTEM_EXPLAINER')).toBe(true);
  });

  it('catches an option that reads as a real choice and grants nothing', () => {
    const hollow: ArchetypeDef = {
      ...story.archetypes[0]!,
      id: 'hollow',
      attributeBonus: {},
      skillProficiencies: {},
      startingItems: [],
      startingAbilities: [],
    };
    const report = checkChoiceClarity(story, field, [hollow]);
    expect(report.issues.some((i) => i.code === 'NO_MECHANICAL_EFFECT')).toBe(true);
  });

  it('catches two options that are the same option twice', () => {
    const twin: ArchetypeDef = { ...story.archetypes[0]!, id: 'twin', name: 'Twin' };
    const report = checkChoiceClarity(story, field, [story.archetypes[0]!, twin]);
    expect(report.issues.some((i) => i.code === 'INDISTINGUISHABLE_OPTIONS')).toBe(true);
  });

  it('does not object to invented words once the screen has glossed them', () => {
    const report = checkChoiceClarity(story as StoryVersion, field, story.archetypes);
    expect(report.passed).toBe(true);
  });
});

/**
 * An ability in combat is a choice card too, and "heat carried in the hand and
 * put into something at the moment of contact" does not tell a player whether
 * it hits one person or the room, what it costs, or whether it can fail.
 */
describe('what an ability says it does', () => {
  for (const story of LAUNCH_CATALOG) {
    it(`${story.title} — every ability states its own shape`, () => {
      for (const ability of story.abilities) {
        const effect = abilityEffect(story, ability);
        // Whether it can fail is the thing most needed and least told.
        expect(effect, ability.id).toMatch(/rolls |always works/);
        // And what it costs, either way.
        expect(effect, ability.id).toMatch(/costs /);
        // Layer 1 never leans on the world's own vocabulary to carry meaning.
        expect(effect.length, ability.id).toBeLessThan(120);
      }
    });
  }
});
