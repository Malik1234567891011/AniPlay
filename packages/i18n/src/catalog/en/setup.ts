/**
 * CS-01 / CS-02 — character setup.
 *
 * Two things about this screen are unlike the rest of the catalogue.
 *
 * **The placeholders are writing, not labels.** `e.g. I ran messages for the
 * lower-city courts until someone noticed I could read the seals.` is teaching
 * the player how to answer, by example, in the register the game is written in.
 * Translated word-for-word it becomes an instruction; the French has to be
 * *written*, in French, doing the same job. It is the first prose a French
 * player reads in the product.
 *
 * **The grammar question is French-only.** `setup.grammar.*` has no English
 * rendering because English never asks it — see `fr/setup.ts` and
 * `PLAYER_GRAMMAR.md`. The English values here exist so the keys typecheck and
 * so an English build that somehow reached them shows something sane, not
 * because the question belongs on the English screen.
 */
export const setup = {
  'setup.back': 'Back',
  'setup.heading': 'Who are you?',
  'setup.subheading':
    'Only your name is required. Everything else is yours to invent, and the world will use whatever you give it.',
  'setup.could_not_start': 'Could not start the story.',

  'setup.name_label': 'What do they call you?',
  'setup.name_placeholder': 'e.g. Malik Sarrow',

  /**
   * Free text, and it stays free text — the player is invited to write
   * anything. It is **not** the grammar signal; `setup.grammar.*` is.
   */
  'setup.pronouns_label': 'Pronouns',
  'setup.pronouns_placeholder': 'e.g. he/him — or write anything',

  'setup.archetype_heading': 'What kind of character are you?',
  /** Read aloud: name, then role, then the one-line summary. */
  'setup.archetype_a11y': '{name}. {role}. {summary}',
  'setup.write_own_background': 'Write your own background',
  /** The escape hatch at the end of every preset list. */
  'setup.something_else': 'Something else',
  'setup.custom_background_body':
    'Describe your own background instead. The world takes it as canon — but it grants no stats, skills or techniques, so you start with none of the packages above.',
  'setup.custom_background_label': 'So what did you do?',
  'setup.custom_background_placeholder':
    'e.g. I ran messages for the lower-city courts until someone noticed I could read the seals.',

  'setup.about_label': 'What should the world know about you?',
  'setup.about_placeholder':
    'e.g. I transferred in a term late and nobody will say who signed for me.',
  'setup.appearance_label': 'What do you look like?',
  'setup.appearance_hint':
    "Used if you generate a portrait later. Skip it and we'll go on what the world sees.",
  'setup.appearance_placeholder':
    'e.g. Short, dark hair cut badly by myself, a coat two sizes too big.',

  'setup.write_own_answer': 'Write your own answer',
  'setup.own_answer_a11y': '{label}, your own answer',

  /** The primary action: begin the story. Not "enter a value". */
  'setup.enter': 'Enter',
  'setup.entering': 'Entering…',
  'setup.use_quick_setup': 'Use quick setup',
  'setup.customize_more': 'Customize more',

  // What an archetype grants, on the card.
  'setup.grants.starts_with': 'Starts with',
  'setup.grants.better_at': 'Better at',
  'setup.grants.attributes': 'Attributes',
  'setup.grants.carries': 'Carries',
  /** Reputation with a faction — what your standing is counted by. */
  'setup.grants.counted_by': 'Counted by',

  // --- The grammar question, French-only ----------------------------------
  /**
   * Asked only when the interface is French, because only French needs it.
   * Never shown in an English session, and never a translation of the
   * `Pronouns` field above — that field keeps doing its own job.
   *
   * The right-hand column shows the player **the sentence they will read**,
   * which is the only way to make an abstract grammatical question concrete.
   */
  'setup.grammar.heading': 'How the world talks about you',
  'setup.grammar.hint': 'French narration has to agree with you. Pick what fits.',
  'setup.grammar.masculine': 'He',
  'setup.grammar.feminine': 'She',
  'setup.grammar.neutral': 'They',
  'setup.grammar.unspecified': "Doesn't matter",
  'setup.grammar.example_masculine': 'You arrived',
  'setup.grammar.example_feminine': 'You arrived',
  'setup.grammar.example_neutral': 'You just got here',
  'setup.grammar.example_unspecified': 'You just got here',
  'setup.grammar.note_masculine': 'the story speaks of you in the masculine',
  'setup.grammar.note_feminine': 'the story speaks of you in the feminine',
  'setup.grammar.note_neutral': 'the story speaks of you with iel',
  'setup.grammar.note_unspecified': 'the story avoids the question',
  /** Read aloud: the option, the sentence it produces, then what it means. */
  'setup.grammar.option_a11y': '{label}. {example}. {note}.',
  /**
   * The quotation marks around the example sentence.
   *
   * A key rather than a literal because the convention is not shared: English
   * uses `“ ”` closed up, French uses `«` and `»` **with U+00A0 inside**. This
   * is the only place in the app where that convention is written down as a
   * translatable string rather than hardcoded in JSX.
   */
  'setup.grammar.quoted_example': '\u201C{example}\u201D',
} as const;
