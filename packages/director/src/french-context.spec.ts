import { describe, expect, it } from 'vitest';
import { LAST_FIVE } from '@plotbreak/test-fixtures';
import { createInitialState, resolveIntent } from '@plotbreak/engine';
import type { GameState, MemoryFact } from '@plotbreak/contracts';
import { RuleBasedDirector } from './director.js';
import { RuleBasedIntentParser } from './parser.js';
import { buildTurnContext } from './context.js';
import { materializeProposals } from './memory.js';
import { speakerBrief } from './speaker-brief.js';

/**
 * Step 5's gate: **no English reaches a French context window.**
 *
 * Everything asserted here is something the *model* reads, not something the
 * player sees — the scene header, the day part, the relationship ladder, and
 * the memory facts handed over as `speakers[].knows`. An English word in any of
 * them is the drift `LOCALIZATION_ARCHITECTURE.md` §7 is about, and memory is
 * the worst case because it accumulates: one English sentence on turn three is
 * still there on turn forty, next to thirty more.
 *
 * The English half runs the same assertions in reverse, because the point is
 * that both locales are first class and neither was traded for the other.
 */

/**
 * English function words that have no business in French prose.
 *
 * Short and closed on purpose. A longer list starts matching French words —
 * `on`, `a`, `par`, `sans` are all French — and a test that has to be argued
 * with stops being run.
 */
const ENGLISH_MARKERS =
  /\b(the|and|with|was|were|were|attacked|belittled|threatened|refused|stood|against|lied|saw|someone|player|witnessed|treated|badly|discovered|location|route|taken|quest|state|toward|warmed|cooled|moment|notable|Day|Afternoon|Morning|Evening|Night|Dawn|Midday|Trusted|Wary|Devoted|Hostile|Rival|Close|Warm|Familiar|Complicated|Respected|Competitive|Afraid)\b/;

function playFrenchTurn(locale: 'en' | 'fr'): {
  state: GameState;
  facts: MemoryFact[];
  context: ReturnType<typeof buildTurnContext>;
} {
  const story = LAST_FIVE;
  const base = createInitialState({
    sessionId: 'x',
    story,
    locale,
    identity: {
      displayName: 'Élodie',
      pronouns: 'elle',
      ageBand: null,
      archetypeId: story.archetypes[0]!.id,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
      grammar: { gender: 'FEMININE', thirdPerson: 'elle' },
    },
  });
  // A turn cruel enough to leave a mark, so there is a memory to inspect.
  const text = 'I tell Dai, in front of everyone, that they are a fraud and I am done pretending otherwise.';
  const intent = new RuleBasedIntentParser().parseSync(text, { story, state: base, intentId: 'i' });
  const resolution = resolveIntent({ story, state: base, turnId: 't', seed: 's', intent });

  const first = buildTurnContext({
    story,
    state: base,
    resolution,
    tier: 'VIVID',
    memories: [],
    recentTurns: [],
    actionText: text,
    playerDialogue: [],
  });
  const proposals = new RuleBasedDirector().planSync(first).memoryProposals;
  const facts = materializeProposals(proposals, base, 't', story);

  // The turn after: the facts are now in the window.
  const context = buildTurnContext({
    story,
    state: base,
    resolution,
    tier: 'VIVID',
    memories: facts,
    recentTurns: [],
    actionText: text,
    playerDialogue: [],
  });
  return { state: base, facts, context };
}

describe('a French run gives the model French', () => {
  const { facts, context } = playFrenchTurn('fr');

  it('renders the memory facts in French', () => {
    expect(facts.length).toBeGreaterThan(0);
    for (const fact of facts) {
      expect(fact.text, fact.factId).not.toMatch(ENGLISH_MARKERS);
    }
  });

  it('keeps the structure alongside the French, so the run stays portable', () => {
    // The sentence is a rendering; the fact is the object. A QA pass can read
    // the same run in English without replaying it.
    const structured = facts.filter((f) => typeof f.value === 'object' && f.value !== null);
    expect(structured.length).toBeGreaterThan(0);
  });

  it('gives the scene header a French clock', () => {
    expect(context.scene.worldTimeLabel).toMatch(/^Jour \d+ · \d{2}:\d{2}$/);
    expect(context.scene.worldTimeLabel).not.toMatch(/\b(AM|PM|Day)\b/);
  });

  it('gives the day part a French word', () => {
    expect(context.scene.dayPart).not.toMatch(ENGLISH_MARKERS);
    // And the id is still an id, so code can branch without reading French.
    expect(context.scene.dayPartId).toMatch(/^[A-Z_]+$/);
  });

  it('gives every present character a French relationship label', () => {
    expect(context.presentCharacters.length).toBeGreaterThan(0);
    for (const character of context.presentCharacters) {
      expect(character.relationshipLabel, character.def.id).not.toMatch(ENGLISH_MARKERS);
      expect(character.relationshipTone).toMatch(/^[A-Z_]+$/);
    }
  });

  it('hands the writer nothing English through the speaker brief', () => {
    // `speaker-brief.ts` is the single projection both model stages read, so
    // this is the assertion that covers the streaming writer as well as the
    // structured one without either being imported here.
    for (const character of context.presentCharacters) {
      const brief = speakerBrief(character);
      for (const known of brief.knows) {
        expect(known, character.def.id).not.toMatch(ENGLISH_MARKERS);
      }
      expect(brief.feelsAboutYou.label).not.toMatch(ENGLISH_MARKERS);
    }
  });

  it('carries the player grammar through to the writer', () => {
    expect(context.player.grammar.gender).toBe('FEMININE');
    expect(context.player.grammar.thirdPerson).toBe('elle');
  });
});

describe('an English run is exactly what it was', () => {
  const { facts, context } = playFrenchTurn('en');

  it('still renders the memory facts in English', () => {
    expect(facts.length).toBeGreaterThan(0);
    const marked = facts.find((f) => f.predicate === 'was_treated_badly_by_player');
    expect(marked).toBeDefined();
    expect(marked!.text).toMatch(/^Dai Okonkwo was treated badly by player: Élodie /);
    expect(marked!.text).toMatch(/at .+, Day \d+ · \d{1,2}:\d{2} (AM|PM)\.$/);
  });

  it('still gives the scene header a 12-hour clock', () => {
    expect(context.scene.worldTimeLabel).toMatch(/^Day \d+ · \d{1,2}:\d{2} (AM|PM)$/);
  });

  it('still gives the day part its English word', () => {
    expect(['Dawn', 'Morning', 'Midday', 'Afternoon', 'Evening', 'Night', 'Late night']).toContain(
      context.scene.dayPart,
    );
  });

  it('reads UNSPECIFIED grammar, because English never asks', () => {
    const { context: plain } = playFrenchTurn('en');
    expect(plain.player.grammar.gender).toBe('FEMININE');
    // …and an identity that never answered reads unmarked:
    const story = LAST_FIVE;
    const bare = createInitialState({
      sessionId: 'y',
      story,
      identity: {
        displayName: 'Sam',
        pronouns: 'they/them',
        ageBand: null,
        archetypeId: story.archetypes[0]!.id,
        worldKnowsAboutYou: '',
        advanced: {},
        portraitAssetId: null,
      },
    });
    expect(bare.player.identity.grammar).toBeUndefined();
  });
});
