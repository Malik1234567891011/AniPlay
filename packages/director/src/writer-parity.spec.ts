import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { policyFor, WRITER_POLICY } from './model-stages.js';
import { FAST_WRITER_POLICY_FOR_TEST, fastWriterPolicyForTest } from './fast-writer.js';
import { FRENCH_EMPTY_CONSEQUENCES } from './policies-fr.js';
import { RESPONSE_POLICY_FOR_TEST } from './responses.js';

/**
 * The two writers must be told the same things.
 *
 * The streaming writer is the one on the fast path, which is to say the one
 * that writes almost every beat a player ever reads — and it carried a
 * five-sentence policy of its own while every rule earned by playing the game
 * lived in `WRITER_POLICY` and reached the writer production does not use.
 *
 * Nothing failed. The prose was simply worse, in exactly the ways the rules
 * existed to prevent.
 */
describe('both writers are told the same things', () => {
  it('the streaming writer carries the whole policy', () => {
    expect(FAST_WRITER_POLICY_FOR_TEST).toContain(WRITER_POLICY);
  });

  it('and the rules that came out of real sessions are in it', () => {
    for (const rule of [
      // Characters saying the player's name like a bot.
      'barely use your name at all',
      // The coach written out of the room she was standing in.
      'is in the room, right now',
      // A cast that is voiced but not motivated.
      'what is actually moving them',
      // (The endings rule lives in `worldRules` rather than here, because it
      // belongs next to the endings data. Both writers get that string from
      // `writerPayload`, so it is not part of this parity check.)
      // Length that reads on a phone.
      'Write in short paragraphs',
    ]) {
      expect(FAST_WRITER_POLICY_FOR_TEST, rule).toContain(rule);
    }
  });

  it('shows the player what changed, on the path that actually runs', () => {
    // `stateDeltaPresentation` was hardcoded empty on the streaming writer, so
    // on every ordinary turn the world moved and nobody was told: insulting
    // someone to their face produced a relationship delta the engine recorded
    // and the screen never mentioned. Fourteen of these in one sweep.
    const source = readFileSync(new URL('./fast-writer.ts', import.meta.url), 'utf8');
    expect(source).toContain('stateDeltaPresentation: buildDeltas(context)');
    expect(source).not.toContain('stateDeltaPresentation: []');
  });

  it('adds only what is genuinely different about streaming', () => {
    const extra = FAST_WRITER_POLICY_FOR_TEST.replace(WRITER_POLICY, '');
    expect(extra).toContain('plain prose, not JSON');
    expect(extra.length).toBeLessThan(400);
  });
});

/**
 * The same trap, in French.
 *
 * `WRITER_POLICY_FR` is authored rather than translated, so it cannot be
 * checked by diffing it against the English. What *can* be checked is the thing
 * that actually goes wrong: a rule reaching one writer and not the other. The
 * streaming writer is production; a French rule that landed only on the
 * structured path would fail silently and forever.
 */
describe('both writers are told the same things in French too', () => {
  it('the streaming writer carries the whole French policy', () => {
    expect(fastWriterPolicyForTest('fr')).toContain(policyFor('fr').writer);
  });

  it('does not hand the French writer the English policy', () => {
    // The failure this catches: `policyFor` falling back to `en` for an
    // unrecognised locale, which would look like nothing at all.
    expect(policyFor('fr').writer).not.toBe(policyFor('en').writer);
    expect(policyFor('fr').safety).not.toBe(policyFor('en').safety);
    expect(fastWriterPolicyForTest('fr')).not.toContain(policyFor('en').writer);
  });

  it('carries the rules that only French needs', () => {
    for (const rule of [
      // Présent de narration, and the passé simple ban that goes with it.
      'présent de narration',
      'passé simple',
      // tu, always, even when a character vouvoies the player.
      'Le narrateur ne vouvoie jamais',
      // Rhythm is content — three short sentences stay three short sentences.
      'Trois phrases courtes restent trois phrases courtes',
      // `du coup` is a fault in narration, fine in dialogue.
      'du coup',
      // The -ment adverb cap, which is machine translation's fingerprint.
      'adverbe en -ment par beat',
      // Never spell the sound.
      'n’écris pas le son',
      // Agreement with the player, and the midpoint ban.
      'playerGrammar.gender',
      'N’écris JAMAIS de point médian',
      // Length is a floor, not a ceiling.
      'valoir la peine d’être lu',
    ]) {
      expect(fastWriterPolicyForTest('fr'), rule).toContain(rule);
    }
  });

  it('gives the French writer the French empty-consequence list', () => {
    // A translated blocklist does not catch the French set: these are the
    // phrases a French model reaches for, and they are a different list.
    for (const phrase of FRENCH_EMPTY_CONSEQUENCES) {
      expect(fastWriterPolicyForTest('fr'), phrase).toContain(phrase);
    }
    // And the English writer is not carrying French it cannot use.
    expect(fastWriterPolicyForTest('en')).not.toContain('quelque chose change entre vous');
  });

  it('tells the French writer, in French, that it is not translating', () => {
    expect(policyFor('fr').writer).toContain('Tu ne traduis pas');
  });

  it('leaves the English policy exactly as it was', () => {
    // Adding a locale dimension must not have moved English by one character.
    expect(policyFor('en').writer).toBe(WRITER_POLICY);
    expect(fastWriterPolicyForTest('en')).toBe(FAST_WRITER_POLICY_FOR_TEST);
  });
});

/**
 * The two policies are authored separately and must still say the same things.
 *
 * `WRITER_POLICY_FR` is written in French rather than translated, on purpose: a
 * policy is mostly examples, and a translated example teaches the English
 * rhythm. The cost of that decision is that the two can drift silently — a rule
 * added to one is simply absent from the other, nothing errors, and the prose
 * is just worse in the locale that missed it.
 *
 * That is not hypothetical. Action realisation, the anti-tic rules and the
 * obligation handling all landed in English first and reached French only
 * because somebody remembered. This test is the thing that remembers.
 *
 * Matched on *concepts*, never on wording. A probe is a pair of patterns, one
 * per locale, each loose enough that rewriting the paragraph does not break the
 * test and specific enough that deleting the rule does.
 */
describe('every rule reaches both locales', () => {
  const RULES: Array<{ concept: string; en: RegExp; fr: RegExp }> = [
    {
      concept: 'the player’s action actually happened',
      en: /DID WHAT THEY SAID THEY DID/i,
      fr: /A FAIT CE QU.IL A DIT/i,
    },
    {
      concept: 'a failed action is written as a refusal, not as silence',
      en: /never the silent version/i,
      fr: /jamais la version silencieuse/i,
    },
    {
      concept: 'do not hand the question to whoever is nearby',
      en: /whoever\s+(?:is\s+)?standing nearby/i,
      fr: /qui se trouve à côté/i,
    },
    {
      concept: 'obligations: LATER is not news',
      en: /`LATER` is not news/i,
      fr: /`LATER` n.est pas une information/i,
    },
    {
      concept: 'obligations: late is the story',
      en: /`NOW` and `LATE` are the story/i,
      fr: /`NOW` et\s+`LATE` sont l.histoire/i,
    },
    {
      concept: 'stop ending every beat on a thesis',
      en: /CLOSING EVERY BEAT WITH A THESIS/i,
      fr: /FINIR CHAQUE BEAT SUR UNE MORALE/i,
    },
    {
      concept: 'watch repeated props and gestures',
      en: /Watch your own repetitions/i,
      fr: /Surveille tes propres répétitions/i,
    },
    {
      concept: 'a person is not a motif',
      en: /A person is not a motif/i,
      fr: /Une personne n.est pas un motif/i,
    },
    {
      concept: 'two things can be true of one person',
      en: /Two things can be true/i,
      fr: /Deux choses peuvent être vraies/i,
    },
  ];

  for (const rule of RULES) {
    it(`${rule.concept} — in English`, () => {
      expect(policyFor('en').writer).toMatch(rule.en);
    });
    it(`${rule.concept} — in French`, () => {
      expect(policyFor('fr').writer).toMatch(rule.fr);
    });
  }

  it('and the French policy is not the English one wearing a hat', () => {
    // If these ever collide, somebody has translated instead of authored.
    expect(policyFor('fr').writer).not.toMatch(/DID WHAT THEY SAID THEY DID/i);
    expect(policyFor('en').writer).not.toMatch(/MORALE/);
  });
});

describe('the card policy reaches both locales too', () => {
  const CARD_RULES: Array<{ concept: string; en: RegExp; fr: RegExp }> = [
    {
      concept: 'three intentions, not three tones',
      en: /THREE DIFFERENT INTENTIONS, NOT THREE TONES/i,
      fr: /TROIS INTENTIONS DIFFÉRENTES, PAS TROIS TONS/i,
    },
    {
      concept: 'a card is not built from the nouns lying around',
      en: /nouns lying\s+around/i,
      fr: /noms qui traînent/i,
    },
    {
      concept: 'a pressing obligation is actionable from a card',
      en: /`SOON`, `NOW` or `LATE`/i,
      fr: /`SOON`, `NOW` ou `LATE`/i,
    },
  ];

  for (const rule of CARD_RULES) {
    it(`${rule.concept} — in English`, () => {
      expect(RESPONSE_POLICY_FOR_TEST.en).toMatch(rule.en);
    });
    it(`${rule.concept} — in French`, () => {
      expect(RESPONSE_POLICY_FOR_TEST.fr).toMatch(rule.fr);
    });
  }
});
