import { describe, expect, it } from 'vitest';
import { SEVEN_DAYS } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import { RuleBasedIntentParser } from './parser.js';

/**
 * If the player put words in quotes, somebody is being spoken to.
 *
 * Caught live. "I stop walking. 'Who's Ivy? You said she chased koi out of a
 * bus shelter with an umbrella. I want to meet her.'" produced one `custom`
 * action for the stage direction and no speech at all — so the engine had no
 * addressee, the writer had no directive that anybody was being spoken to, and
 * the low-confidence `custom` sent the turn to the model parser, which advanced
 * the clock three hours and walked Mina off down the platform.
 */

const parse = (text: string) => {
  const story = SEVEN_DAYS;
  const state = createInitialState({
    sessionId: 'x', story,
    identity: {
      displayName: 'Wren', pronouns: 'they/them', ageBand: null,
      archetypeId: story.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  });
  return new RuleBasedIntentParser().parseSync(text, { story, state, intentId: 'i' });
};

const spokenTo = (text: string) =>
  parse(text).actions.find((a) => a.verb === 'speak')?.targets.map((t) => t.entityId);

describe('who the player is talking to', () => {
  it('hears the question inside the stage direction', () => {
    const intent = parse('I stop walking. “Who’s Ivy? I want to meet her.”');
    expect(intent.actions.map((a) => a.verb)).toContain('speak');
    // The stage direction survives as its own action; it is not replaced.
    expect(intent.actions.map((a) => a.verb)).toContain('custom');
  });

  it('addresses the person in the room, not the person being asked about', () => {
    // Ivy Sable is authored and elsewhere. Aiming the sentence at her would
    // have the engine refuse a turn that was perfectly sensible.
    expect(spokenTo('I stop walking. “Who’s Ivy? I want to meet her.”')).toEqual(['mina']);
  });

  it('needs no name when there is only one person to talk to', () => {
    expect(spokenTo('“So what happens on Sunday?”')).toEqual(['mina']);
  });

  it('leaves an action that already has a target alone', () => {
    const intent = parse('I ask Mina “what happens on Sunday?”');
    expect(intent.actions.filter((a) => a.verb === 'speak')).toHaveLength(1);
  });

  it('hears the quotes an iPhone actually produces', () => {
    // Smart punctuation is on by default, so every quote a player types on a
    // phone is curly. The ASCII-only pattern meant their dialogue was never
    // extracted at all.
    for (const text of [
      'I turn to her. "So what happens on Sunday?"',
      'I turn to her. \u201cSo what happens on Sunday?\u201d',
      'I turn to her. \u00abSo what happens on Sunday?\u00bb',
    ]) {
      expect(spokenTo(text), text).toEqual(['mina']);
    }
  });

  it('does not let an apostrophe end the sentence', () => {
    const intent = parse('I ask her \u201cWho\u2019s Ivy? I don\u2019t know that name.\u201d');
    expect(intent.dialogue[0]!.text).toBe('Who\u2019s Ivy? I don\u2019t know that name.');
  });

  it('adds nothing when the player said nothing aloud', () => {
    expect(parse('I pick up my bags and walk down the hill.').actions.some((a) => a.verb === 'speak'))
      .toBe(false);
  });
});
