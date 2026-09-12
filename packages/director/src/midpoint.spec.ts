import { describe, expect, it } from 'vitest';
import { BLACKWAKE } from '@plotbreak/test-fixtures';
import type { GameState, StoryVersion } from '@plotbreak/contracts';
import { charactersPresent, createInitialState } from '@plotbreak/engine';
import { buildTurnContext } from './context.js';
import { validateNarrative } from './validator.js';

/**
 * The inclusive midpoint, in prose rather than in a card.
 *
 * A fourteen-turn French run of Nine Weeks produced "la façon dont Juno traîne
 * la dernière syllabe quand iel est fatigué·e ou agacé·e" — about an NPC, not
 * the player, which is the case the policy had not covered. The cards had a
 * filter; the prose had only a prompt.
 *
 * `PLAYER_GRAMMAR.md` rule 4: administrative register, banned from school
 * documents by ministerial circular, and unreadable aloud on a product that
 * marks blocks `voiceEligible`.
 */
const story = BLACKWAKE as unknown as StoryVersion;

const state = (locale: 'en' | 'fr'): GameState =>
  createInitialState({
    sessionId: 'sess_m', story, locale,
    identity: {
      displayName: 'Sora', pronouns: 'they/them', ageBand: null,
      archetypeId: story.archetypes[0]?.id ?? null,
      worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  }) as GameState;

const emptyResolution = {
  valid: true, schemaVersion: '1.0' as const, turnId: 't', normalizedActions: [],
  checks: [], mutations: [], observableFacts: [], privateFacts: [],
  timeAdvancedMinutes: 0, rngCursorAfter: 0, refusal: null,
};

const turn = (text: string): any => ({
  sceneSummary: 'Une scène.',
  endStatePrompt: 'Tu fais quoi ?',
  suggestedActions: [],
  blocks: [{ type: 'NARRATION', text, speakerId: null, visibility: 'GROUP', voiceEligible: true }],
});

const flagged = (locale: 'en' | 'fr', text: string): boolean =>
  validateNarrative({
    context: buildTurnContext({
      story, state: state(locale), resolution: emptyResolution as any, tier: 'VIVID',
      memories: [], recentTurns: [], actionText: '',
    }) as any,
    turn: turn(text),
  }).violations.some((v) => /midpoint/i.test(v.description));

describe('a midpoint in French narration', () => {
  it('is caught, including about a non-binary character', () => {
    expect(flagged('fr', 'Tu reconnais la façon dont iel parle quand iel est fatigué·e.')).toBe(true);
  });

  it('is caught in its parenthesised and full-stop spellings too', () => {
    expect(flagged('fr', 'Tu es prêt(e) à partir.')).toBe(true);
    expect(flagged('fr', 'Elle est parti.e depuis une heure.')).toBe(true);
  });

  it('leaves the avoidance form alone, which is the answer', () => {
    // Turning the sentence so there is nothing to agree. Always available.
    expect(flagged('fr', 'Tu reconnais la façon dont iel parle quand la fatigue le prend.')).toBe(false);
    expect(flagged('fr', 'Tu es prête à partir.')).toBe(false);
    expect(flagged('fr', 'Iel s’en va.')).toBe(false);
  });

  it('does not fire in English, which has no such hedge', () => {
    expect(flagged('en', 'You are ready(e) to go.')).toBe(false);
  });
});
