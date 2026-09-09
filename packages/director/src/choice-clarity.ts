import type { ArchetypeDef, CharacterSetupField, StoryVersion } from '@aniplay/contracts';
import { archetypeGrants } from '@aniplay/contracts';
import { inventedVocabulary } from './narrative-clarity.js';

/**
 * Clarity for a decision, as distinct from clarity for a story.
 *
 * `narrative-clarity.ts` governs prose the player reads. This governs copy the
 * player has to *act* on, and the standard is different: a premise may withhold
 * why something happened, but a build screen may not withhold what the options
 * are. Mystery is a story device. On a choice screen it is just a worse screen.
 *
 * The bar is the five questions a player with no context must be able to
 * answer before they are asked to commit:
 *
 *   1. What am I choosing?
 *   2. How are these options different from each other?
 *   3. What kind of character does each one make?
 *   4. Can I change it later?
 *   5. What does it actually do in play?
 *
 * Deliberately not a style guide. It does not object to invented words, poetry
 * or voice — only to those being the *only* place the meaning lives.
 */

export interface ChoiceIssue {
  readonly code:
    | 'MISSING_SYSTEM_EXPLAINER'
    | 'MISSING_PERMANENCE'
    | 'CRYPTIC_TITLE'
    | 'MISSING_ROLE'
    | 'MISSING_PLAYSTYLE'
    | 'JARGON_IN_LAYER_ONE'
    | 'INDISTINGUISHABLE_OPTIONS'
    | 'UNBACKED_CLAIM'
    | 'NO_MECHANICAL_EFFECT';
  readonly severity: 'ERROR' | 'WARN';
  readonly message: string;
  readonly optionId?: string;
  readonly fix: string;
}

export interface ChoiceClarityReport {
  readonly passed: boolean;
  readonly issues: ChoiceIssue[];
}

/**
 * A title that is a riddle rather than a name.
 *
 * "forward and hot", "around and back", "down and set" — direction-and-quality
 * pairs that mean something only once you already know the system. A name may
 * be invented; it may not be a clue.
 */
const CRYPTIC_TITLE =
  /\b(forward|back|backward|around|down|up|sideways|inward|outward|through|across)\b\s+and\s+\b\w+\b/i;

/** Ordinary words that read as a role even though they are not in the glossary. */
const PLAIN_ROLE_WORDS =
  /\b(fire|flame|heat|water|tide|stone|earth|air|wind|gale|light|shadow|melee|ranged|range|magic|magical|healer?|healing|support|defen[cs]e|defensive|attack|attacking|offen[cs]e|offensive|speed|stealth|scout|tank|archer|blade|sword|bow|spear|fist|hand|social|talk|persuasion|craft|technical|affinity|specialis[mt]|specialization|class|order|discipline|style|background|training|role)\b/i;

export function checkChoiceClarity(
  story: StoryVersion,
  field: CharacterSetupField,
  options: readonly ArchetypeDef[],
): ChoiceClarityReport {
  const issues: ChoiceIssue[] = [];
  const push = (issue: ChoiceIssue): void => {
    issues.push(issue);
  };

  // 1. What am I choosing? — the screen has to say what the system is before
  //    it asks. A label alone is a question, not an explanation.
  if (field.helpText.trim().length < 30) {
    push({
      code: 'MISSING_SYSTEM_EXPLAINER',
      severity: 'ERROR',
      message: `"${field.label}" asks the player to choose without first saying what the choice is inside of.`,
      fix: 'Add helpText: one or two sentences establishing the system and what picking one of these changes.',
    });
  }

  // 4. Can I change it later? — an irreversible choice has to say so where it
  //    is made, not in a support article.
  if (!/\b(permanent|cannot be changed|for life|for good|not change|never change|stays|keep it|later)\b/i.test(field.helpText)) {
    push({
      code: 'MISSING_PERMANENCE',
      severity: 'WARN',
      message: `"${field.label}" does not say whether the choice can be changed later.`,
      fix: 'State it plainly in helpText, either way.',
    });
  }

  const vocabulary = inventedVocabulary(story).map((term) => term.toLowerCase());
  const glossed = field.helpText.toLowerCase();

  for (const option of options) {
    // 1 & 2. A name may be invented. It may not be a riddle.
    if (CRYPTIC_TITLE.test(option.name)) {
      push({
        code: 'CRYPTIC_TITLE',
        severity: 'ERROR',
        optionId: option.id,
        message: `"${option.name}" is a riddle, not a name. It only parses once you already know the system.`,
        fix: 'Name it, then put the direction-and-quality phrasing in the flavour line where it belongs.',
      });
    }

    // 1. Every option needs a plain-language "what kind of thing is this".
    if (option.role.trim().length === 0) {
      push({
        code: 'MISSING_ROLE',
        severity: 'ERROR',
        optionId: option.id,
        message: `"${option.name}" has no plain-language role.`,
        fix: 'Two to four ordinary words: "Fire affinity", "Heavy melee", "Support and healing".',
      });
    } else if (!PLAIN_ROLE_WORDS.test(option.role)) {
      push({
        code: 'JARGON_IN_LAYER_ONE',
        severity: 'WARN',
        optionId: option.id,
        message: `The role "${option.role}" is made only of this world's own vocabulary.`,
        fix: 'A player who has read nothing has to understand it. Anchor it to an ordinary word.',
      });
    }

    // 3. Playstyle tags are what make four cards comparable at a glance.
    if (option.playstyle.length < 2) {
      push({
        code: 'MISSING_PLAYSTYLE',
        severity: 'ERROR',
        optionId: option.id,
        message: `"${option.name}" has fewer than two playstyle tags.`,
        fix: 'Two to four scannable tags, so the options can be compared without reading paragraphs.',
      });
    }

    // An invented noun in layer 1 is fine once the explainer above has said
    // what it means, and a problem when it has not.
    const layerOne = `${option.role} ${option.summary}`.toLowerCase();
    for (const term of vocabulary) {
      if (term.length < 4 || !layerOne.includes(term)) continue;
      if (glossed.includes(term)) continue;
      push({
        code: 'JARGON_IN_LAYER_ONE',
        severity: 'WARN',
        optionId: option.id,
        message: `"${term}" appears in what this option means before anything has said what it is.`,
        fix: 'Gloss it in helpText, or keep it in the flavour line until the player has met it in play.',
      });
      break;
    }

    // 5. What does it do? — the card must not be the only thing that is
    //    different about the option.
    const grants = archetypeGrants(story, option);
    const total =
      grants.abilities.length +
      grants.skills.length +
      grants.attributes.length +
      grants.items.length +
      grants.standing.length;
    if (total === 0) {
      push({
        code: 'NO_MECHANICAL_EFFECT',
        severity: 'ERROR',
        optionId: option.id,
        message: `"${option.name}" changes nothing about the character. It reads as a real choice and is not one.`,
        fix: 'Give it attributes, skills, abilities or kit — or remove the option.',
      });
    }
  }

  // 2. Two options that grant the same things are one option with two names.
  const signatures = new Map<string, string>();
  for (const option of options) {
    const grants = archetypeGrants(story, option);
    const signature = JSON.stringify([grants.abilities, grants.skills, grants.attributes]);
    const twin = signatures.get(signature);
    if (twin) {
      push({
        code: 'INDISTINGUISHABLE_OPTIONS',
        severity: 'ERROR',
        optionId: option.id,
        message: `"${option.name}" and "${twin}" give exactly the same thing.`,
        fix: 'Make them different, or make them one option.',
      });
    }
    signatures.set(signature, option.name);
  }

  return { passed: !issues.some((issue) => issue.severity === 'ERROR'), issues };
}

/** Runs the check over every choice screen a story presents. */
export function checkStoryChoiceClarity(story: StoryVersion): ChoiceClarityReport {
  const issues: ChoiceIssue[] = [];

  for (const field of story.setupFields) {
    if (field.kind === 'ARCHETYPE') {
      issues.push(...checkChoiceClarity(story, field, story.archetypes).issues);
    }
    // A CHOICE field's options are the same kind of decision at smaller scale.
    if (field.kind === 'CHOICE' && field.options.length > 0 && field.helpText.trim().length === 0) {
      issues.push({
        code: 'MISSING_SYSTEM_EXPLAINER',
        severity: 'WARN',
        message: `"${field.label}" offers ${field.options.length} options and never says what the answer changes.`,
        fix: 'Say what it establishes about the character, or what it affects.',
      });
    }
  }

  return { passed: !issues.some((issue) => issue.severity === 'ERROR'), issues };
}

/**
 * The rule, in the words a prompt needs. Shared with the generation prompts so
 * authored and generated choice copy are held to one standard.
 */
export const CHOICE_CLARITY_RULES = [
  'Copy for a choice the player has to make is two layers, and they are separate.',
  'Layer 1 says what the option is and what it does for the player, in ordinary words they can act on',
  'without having read anything: a name, a plain role like "Fire affinity" or "Heavy melee", one sentence',
  'of what it does in play, and two to four scannable tags.',
  'Layer 2 is the world’s voice — lore, metaphor, character. It never carries layer 1.',
  'A name may be invented. It may not be a riddle: "Ember" is a name, "Ember lean — forward and hot" is a clue.',
  'Never claim an effect the rules do not implement, and never describe two options so that a player',
  'cannot tell at a glance which is the aggressive one and which is the careful one.',
].join(' ');
