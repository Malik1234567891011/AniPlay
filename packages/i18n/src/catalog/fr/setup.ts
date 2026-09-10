/**
 * La question que seul le français pose.
 *
 * Only the grammar question is written here for now. The rest of
 * `CharacterSetup` — and in particular its placeholders, which are *writing*
 * rather than labels — belongs to step 7 and must be **authored in French**,
 * not translated. `e.g. I ran messages for the lower-city courts…` teaches the
 * player how to answer by example, in the register the game is written in; a
 * word-for-word French version of it becomes an instruction and is the first
 * thing a French player reads.
 *
 * ## The question, and why it looks like this
 *
 * `PLAYER_GRAMMAR.md` rule 2 drafts this screen with `« Tu es arrivé·e »` in
 * the `Iel` row. **That midpoint is not shipped**, because rule 4 of the same
 * document forbids the midpoint in UI as well as in prose — it is an
 * administrative register, it was banned from school documents by ministerial
 * circular, and it breaks read-aloud on a screen whose blocks are
 * `voiceEligible`.
 *
 * So `Iel` and `Peu importe` both show the **avoidance** form, which is what
 * the player will actually read: `Tu viens d'arriver`, present tense, no
 * participle to agree. The two options still differ, and the third column says
 * how — `iel` in the third person against avoiding the question entirely.
 *
 * Showing the sentence rather than naming the rule is the point. It is the only
 * way to make an abstract grammatical question concrete, and it is a nicer
 * piece of product design than the English field it sits beside.
 */
export const setup = {
  'setup.grammar.heading': 'Comment le monde parle de toi',
  'setup.grammar.hint': 'Le français doit s’accorder avec toi. Choisis ce qui te va.',

  'setup.grammar.masculine': 'Il',
  'setup.grammar.feminine': 'Elle',
  'setup.grammar.neutral': 'Iel',
  'setup.grammar.unspecified': 'Peu importe',

  // La phrase que le joueur lira vraiment.
  'setup.grammar.example_masculine': 'Tu es arrivé',
  'setup.grammar.example_feminine': 'Tu es arrivée',
  /** Présent : pas de participe, donc pas d’accord. Jamais `arrivé·e`. */
  'setup.grammar.example_neutral': 'Tu viens d’arriver',
  'setup.grammar.example_unspecified': 'Tu viens d’arriver',

  'setup.grammar.note_masculine': 'on parle de toi au masculin',
  'setup.grammar.note_feminine': 'on parle de toi au féminin',
  'setup.grammar.note_neutral': 'on parle de toi avec iel',
  'setup.grammar.note_unspecified': 'le récit évite la question',
  'setup.grammar.option_a11y': '{label}. {example}. {note}.',
  /**
   * Guillemets, avec U+00A0 à l'intérieur — jamais `"` U+0022, jamais collés.
   * Écrit en échappement parce qu'une espace insécable est invisible dans un
   * diff, et c'est exactement le caractère que quelqu'un « nettoie ».
   */
  'setup.grammar.quoted_example': '\u00AB\u00A0{example}\u00A0\u00BB',
} as const;
