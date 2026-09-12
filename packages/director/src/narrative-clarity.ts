import type { StoryVersion } from '@plotbreak/contracts';

/**
 * Narrative clarity checker.
 *
 * The failure this exists to catch is not long writing. It is writing that
 * *sounds* sophisticated while leaving a first-time reader unable to say what
 * literally happened.
 *
 *   Mystery is when the player does not know WHY something happened.
 *   Confusion is when the player does not understand WHAT happened.
 *   We want mystery, never confusion.
 *
 * Concretely: a premise may withhold who erased you, why, and whether Mira can
 * be trusted. It may not withhold what happened at the gate, why you are in
 * trouble, or what you are trying to do next.
 *
 * The checks below are mechanical on purpose. They are a floor that catches the
 * habitual failure modes — invented nouns arriving before their function,
 * metaphor carrying exposition, proper-noun pile-ups, em-dash tics — and they
 * run without a model so they can gate the creator publish path (§21.5).
 *
 * Deliberately NOT optimised for brevity. A 250-word understandable premise
 * beats a 100-word confusing one, and nothing here rewards cutting words.
 */

export type ClaritySeverity = 'ERROR' | 'WARN';

export interface ClarityIssue {
  readonly code:
    | 'MISSING_PROTAGONIST'
    | 'MISSING_SETTING'
    | 'MISSING_INCITING_INCIDENT'
    | 'MISSING_CONSEQUENCE'
    | 'MISSING_OBJECTIVE'
    | 'MISSING_TENSION'
    | 'UNEXPLAINED_TERM'
    | 'TERM_DENSITY'
    | 'ABSTRACT_OPENING'
    | 'METAPHOR_CARRIES_EXPOSITION'
    | 'PROPER_NOUN_PILEUP'
    | 'AI_PROSE_TIC';
  readonly severity: ClaritySeverity;
  readonly message: string;
  /** The offending fragment, so an author can find it without hunting. */
  readonly evidence?: string;
  readonly fix?: string;
}

export interface ClarityReport {
  readonly passed: boolean;
  readonly issues: ClarityIssue[];
  readonly wordCount: number;
}

// --- Signals for the six questions a premise must answer --------------------

/** 1. Who am I? Second person, addressed directly. */
const PROTAGONIST = /\b(you|your|you're|you are)\b/i;

/** 2. Where am I? A concrete place word, not only a proper noun. */
const SETTING =
  /\b(academy|school|company|theatre|theater|road|city|town|village|station|ship|house|college|camp|desert|flats|coast|archive|library|dorm|stage|rehearsal|gate|hall|office|room)\b/i;

/** 3. What happened? A past-tense event, stated as an event. */
const INCITING =
  /\b(was|were|has been|have been|did not|does not|didn't|doesn't|cannot|can't|found|finds|discovered|discovers|arrived|arrives|erased|deleted|removed|vanished|refused|refuses|stopped|stops|failed|fails|died|hired|paid|accepted|assigned|cast|joined)\b/i;

/** 4. So what? An explicit causal or consequential connective. */
const CONSEQUENCE =
  /\b(so|because|which means|therefore|now|as a result|until|unless|that means|since|and so|the problem is|officially)\b/i;

/** 5. What do I need to do? An objective stated as a verb. */
const OBJECTIVE =
  /\b(find|prove|reach|get|deliver|escape|survive|convince|persuade|stop|recover|clear|earn|make|keep|before|need to|have to|must|want to|trying to|looking for)\b/i;

/**
 * 6. What is the tension? Something that could go wrong, named.
 *
 * Stems rather than exact words: the first version listed `lose` and `lost`
 * and so missed `loses`, which meant a premise that spelled out exactly what
 * everybody stood to lose was reported as having no stakes at all.
 */
const TENSION =
  /\b(danger(?:ous)?|risk(?:s|ed|ing)?|threat(?:en(?:s|ed|ing)?)?|trouble|expel(?:led)?|removed|caught|detained|arrested|dies?|dying|death|los(?:e|es|ing|t)|fail(?:s|ed|ing|ure)?|shut(?:s|ting)? down|run(?:s|ning)? out|deadline|weeks|days|watching|suspicious|hidden|secret|lying|lied)\b/i;

/** Habitual AI-fantasy constructions that read as prestige-fantasy filler. */
const PROSE_TICS: Array<{ pattern: RegExp; label: string; fix: string }> = [
  {
    pattern: /\bnot (?:a|an|the|merely|simply|just)?\s*[\w\s]{2,28},\s*but\s+/i,
    label: '"not X, but Y" construction',
    fix: 'State the thing directly rather than defining it by what it is not.',
  },
  {
    pattern: /\b(?:it is|this is|there is) (?:not|never) (?:a|an|the)\b[^.]{0,40}\bit is\b/i,
    label: 'definition-by-negation',
    fix: 'Say what it is on the first attempt.',
  },
  {
    pattern: /\bthe kind of \w+ that\b/i,
    label: '"the kind of X that" hedge',
    fix: 'Name the thing instead of gesturing at its category.',
  },
  {
    pattern: /\bsomething (?:like|between|closer to)\b/i,
    label: 'vague approximation',
    fix: 'Commit to what it actually is.',
  },
];

/**
 * A term counts as explained when a gloss sits near it: a copula, a relative
 * clause, or an explicit definition verb within roughly a clause's distance.
 */
const GLOSS_NEAR =
  /\b(is|are|was|were|means|records?|holds?|contains?|carries|carry|which|that|called|known as|keeps?|stores?|lists?|shows?|tells?|marks?|opens?|controls?|runs?|decides?|checks?|searches|reads?)\b/i;

function words(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean);
}

function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Story-specific vocabulary a reader cannot be expected to know: the invented
 * nouns this world introduces. Drawn from the story's own definitions rather
 * than a fixed list, so it works for any world including creator-made ones.
 */
/**
 * Words a story may use as an entity name that a reader already knows.
 *
 * A resource called "Water" or "Health", or a location called "Stage", is
 * ordinary English. Flagging those as unexplained jargon is noise that trains
 * authors to ignore the checker.
 */
const ORDINARY_ENGLISH = new Set([
  'water', 'health', 'stamina', 'focus', 'energy', 'stage', 'gate', 'commons',
  'debt', 'standing', 'strain', 'suspicion', 'map', 'key', 'coat', 'road',
  'wardrobe', 'office', 'stacks', 'archives', 'archive', 'rooftop', 'room',
  'breath', 'forms', 'form', 'vigor', 'blight', 'wall', 'yard', 'lines',
  'tents', 'hall', 'post', 'kiln', 'wire', 'thread', 'sight', 'letter',
]);

export function inventedVocabulary(story: StoryVersion): string[] {
  const terms = new Set<string>();

  const add = (value: string): void => {
    const trimmed = value.trim();
    if (trimmed.length <= 2) return;
    // A single ordinary word is not jargon even when a story uses it as a name.
    if (!trimmed.includes(' ') && ORDINARY_ENGLISH.has(trimmed.toLowerCase())) return;
    terms.add(trimmed);
  };

  for (const item of story.items) add(item.name);
  for (const ability of story.abilities) add(ability.name);
  for (const faction of story.factions) add(faction.name);
  for (const location of story.locations) add(location.name);
  for (const resource of story.resources) add(resource.name);

  return [...terms];
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export interface CheckPremiseOptions {
  /** The world the premise belongs to, used to know which nouns are invented. */
  readonly story: StoryVersion;
  /** `premise` is held to the full standard; `opening` to a lighter one. */
  readonly kind: 'premise' | 'opening' | 'hook';
}

export function checkNarrativeClarity(text: string, options: CheckPremiseOptions): ClarityReport {
  const { story, kind } = options;
  const issues: ClarityIssue[] = [];
  const allWords = words(text);
  const allSentences = sentences(text);

  const push = (issue: ClarityIssue): void => {
    issues.push(issue);
  };

  // --- The six questions -------------------------------------------------
  // A hook is one line and cannot carry all six; a premise must.
  if (kind === 'premise') {
    if (!PROTAGONIST.test(text)) {
      push({
        code: 'MISSING_PROTAGONIST',
        severity: 'ERROR',
        message: 'The reader cannot tell who they are in this story.',
        fix: 'Address the player directly and say what position they are in.',
      });
    }
    if (!SETTING.test(text)) {
      push({
        code: 'MISSING_SETTING',
        severity: 'ERROR',
        message: 'The reader cannot tell where this takes place.',
        fix: 'Name the kind of place in ordinary words, not only by its proper noun.',
      });
    }
    if (!INCITING.test(text)) {
      push({
        code: 'MISSING_INCITING_INCIDENT',
        severity: 'ERROR',
        message: 'No concrete event is stated. The reader cannot tell what happened.',
        fix: 'State the literal event plainly before describing it any other way.',
      });
    }
    if (!CONSEQUENCE.test(text)) {
      push({
        code: 'MISSING_CONSEQUENCE',
        severity: 'WARN',
        message: 'The causal chain is implied rather than stated.',
        fix: 'Make it explicit: X happened, so Y is now true.',
      });
    }
    if (!OBJECTIVE.test(text)) {
      push({
        code: 'MISSING_OBJECTIVE',
        severity: 'ERROR',
        message: 'The reader cannot tell what they are supposed to want.',
        fix: 'State the immediate goal as something the player can act on.',
      });
    }
    if (!TENSION.test(text)) {
      push({
        code: 'MISSING_TENSION',
        severity: 'WARN',
        message: 'Nothing is named that could go wrong.',
        fix: 'Say what happens if the player fails, in concrete terms.',
      });
    }
  }

  // --- Concrete before abstract -----------------------------------------
  // The first sentence sets the reader's footing. An invented noun there
  // arrives before there is anything to attach it to.
  const vocabulary = inventedVocabulary(story);
  const first = allSentences[0] ?? '';

  for (const term of vocabulary) {
    if (!new RegExp(`\\b${escapeRegex(term)}\\b`).test(first)) continue;
    push({
      code: 'ABSTRACT_OPENING',
      severity: 'WARN',
      message: `The opening sentence uses the invented term "${term}" before the reader knows what it is.`,
      evidence: first.slice(0, 120),
      fix: 'Open with the ordinary situation. Introduce invented nouns once there is something to attach them to.',
    });
    break;
  }

  // --- Unexplained terminology ------------------------------------------
  for (const term of vocabulary) {
    const pattern = new RegExp(`\\b${escapeRegex(term)}\\b`, 'i');
    const sentence = allSentences.find((s) => pattern.test(s));
    if (!sentence) continue;

    // A term is fine once a gloss sits beside it in the same sentence.
    const index = sentence.search(pattern);
    const window = sentence.slice(Math.max(0, index - 90), index + term.length + 90);
    if (GLOSS_NEAR.test(window)) continue;

    push({
      code: 'UNEXPLAINED_TERM',
      severity: 'WARN',
      message: `"${term}" is used without saying what it does.`,
      evidence: sentence.slice(0, 120),
      fix: 'Explain a new term through its function the first time it appears.',
    });
  }

  // --- Proper-noun pile-up ----------------------------------------------
  // Capitalised words that are not sentence-initial and not ordinary English.
  const properNouns = new Set<string>();
  for (const sentence of allSentences) {
    const tokens = words(sentence);
    tokens.slice(1).forEach((token) => {
      const clean = token.replace(/[^A-Za-z-]/g, '');
      if (clean.length > 2 && /^[A-Z]/.test(clean)) properNouns.add(clean);
    });
  }

  const first60 = allWords.slice(0, 60).join(' ');
  const earlyNouns = [...properNouns].filter((n) => new RegExp(`\\b${escapeRegex(n)}\\b`).test(first60));
  if (earlyNouns.length > 3) {
    push({
      code: 'PROPER_NOUN_PILEUP',
      severity: 'WARN',
      message: `${earlyNouns.length} proper nouns in the first 60 words: ${earlyNouns.join(', ')}.`,
      fix: 'Introduce at most two or three names before the reader has the situation.',
    });
  }

  const density = properNouns.size / Math.max(1, allWords.length / 100);
  if (density > 9) {
    push({
      code: 'TERM_DENSITY',
      severity: 'WARN',
      message: `${properNouns.size} distinct proper nouns across ${allWords.length} words is dense.`,
      fix: 'Use ordinary words — guard, record, teacher, restricted library — until a name earns its place.',
    });
  }

  // --- Metaphor carrying exposition --------------------------------------
  // Em-dashes are the reliable signature: piling clarification onto a clause
  // that never stated the plain fact.
  const emDashes = (text.match(/—/g) ?? []).length;
  if (emDashes > Math.max(1, allWords.length / 90)) {
    push({
      code: 'METAPHOR_CARRIES_EXPOSITION',
      severity: 'WARN',
      message: `${emDashes} em-dashes in ${allWords.length} words. Clarifying asides are doing the work of plain sentences.`,
      fix: 'State the fact in its own sentence, then let the aside enrich it.',
    });
  }

  for (const tic of PROSE_TICS) {
    const match = text.match(tic.pattern);
    if (!match) continue;
    push({
      code: 'AI_PROSE_TIC',
      severity: 'WARN',
      message: `Habitual construction: ${tic.label}.`,
      evidence: match[0].slice(0, 90),
      fix: tic.fix,
    });
  }

  return {
    passed: !issues.some((i) => i.severity === 'ERROR'),
    issues,
    wordCount: allWords.length,
  };
}

/** Runs every clarity check a story's player-facing copy is subject to. */
export function checkStoryClarity(story: StoryVersion): ClarityReport {
  const premise = checkNarrativeClarity(story.premise, { story, kind: 'premise' });
  const opening = checkNarrativeClarity(story.opening, { story, kind: 'opening' });

  return {
    passed: premise.passed && opening.passed,
    issues: [
      ...premise.issues,
      ...opening.issues.map((i) => ({ ...i, message: `Opening: ${i.message}` })),
    ],
    wordCount: premise.wordCount,
  };
}

/**
 * The writing standard, as prompt text.
 *
 * Shared by every generation path so a creator-made world is held to the same
 * bar as a first-party one. Kept beside the checker deliberately: the rules a
 * model is told and the rules the validator enforces should not drift apart.
 */
export const NARRATIVE_CLARITY_RULES = [
  'Concrete before abstract. State the literal event in plain words first, then let the prose be atmospheric about it.',
  'Explain an invented term through its function the first time it appears, then use it freely.',
  'At most two or three names in the first sixty words. Prefer ordinary words — guard, record, teacher, restricted library — until a name has earned its place.',
  'One strange thing at a time. Establish the normal baseline before the unusual thing means anything.',
  'Make causation explicit: this happened, so this is now true, so you need to do this.',
  'Introduce a person by what they do and what they are to the player, before any title or rank.',
  'Metaphor enriches information the reader already has. It must never be the only place essential information lives.',
  'Withhold why, never what. The reader may not know who did it or why; they must always know what literally happened.',
  'Write like a good anime, not like prestige fantasy. Avoid em-dash pile-ups, "not X but Y", relentless ominous abstraction, and sentences whose purpose is to sound profound.',
  'Length is not the problem. A long clear passage is better than a short confusing one.',
  'Name the cost. If something was lost, say what: the hours, the water, the person’s trust, the door that '
    + 'is now shut. "It works, but it takes something from you", "success with a cost", "something shifts '
    + 'between you", "the air changes" — these describe a consequence without containing one, and a player '
    + 'cannot act on them. If you cannot name what changed, nothing changed, and the beat should say so.',
  'Do not write filler where an event happened. "For a long moment, nothing" and "the silence stretches" '
    + 'are what you write when the turn was quiet. On a turn that resolved a check or moved the world they '
    + 'are the beat refusing to report itself.',
].join('\n- ');
