import type { Verb } from '@aniplay/contracts';

/**
 * The French verb lexicon.
 *
 * **Not a translation of `VERB_LEXICON`, and it must never become one.** The
 * English lexicon carries fixes earned from live bugs — `deck`, `beat`, `kick`
 * and `hold` all needed disambiguating from ordinary nouns after a player
 * called somebody "useless on a deck" and started a fistfight on a ship. Those
 * fixes are about *English* words that are both violence and furniture. French
 * has an entirely different set of traps, so porting the English ones by
 * translation would import solutions to problems French does not have and miss
 * every problem it does.
 *
 * ## What French actually breaks
 *
 * Measured with `npm run fr:probe` against the shipped parser:
 * **37 of 39 French probes parsed as `custom`.** The two that did not were the
 * English control sentences. `custom` carries no check, no relationship
 * movement, no flag and no resource cost — so in French *every single turn* was
 * the bug the English side already paid for once.
 *
 * Three structural reasons, none of which a word list fixes on its own:
 *
 * 1. **Elision.** `j'attaque`, `l'homme`, `qu'elle`, `s'il`, `n'importe`. The
 *    verb is glued to a pronoun by an apostrophe, and the apostrophe may be
 *    U+0027 (AZERTY) or U+2019 (iOS Smart Punctuation, on by default). Both
 *    forms will exist in the same player's input.
 * 2. **Clitic pronouns come before the verb.** `je le frappe`, `je lui parle`,
 *    `je me cache`. English puts the object after; French puts it in front, so
 *    a pattern written as verb-then-object matches nothing, and the object is a
 *    pronoun with no name in it for the entity resolver to find.
 * 3. **`\b` is ASCII.** JavaScript defines a word boundary over `[A-Za-z0-9_]`,
 *    so `/\bécoute\b/` never matches `écoute` after a space: `é` is not a word
 *    character, the space is not either, and there is no boundary between them.
 *    **Every accented verb in a `\b`-delimited pattern silently fails.** That
 *    one is worth stating loudly, because the pattern looks completely correct.
 */

/**
 * A French word boundary that actually works on French.
 *
 * `\b` is ASCII-only in JavaScript. These lookarounds are Unicode-aware, so
 * `écoute`, `révèle` and `dégaine` match where `\b` would have failed — and
 * they treat the apostrophe as a boundary, so `j'attaque` matches `attaque`.
 */
const B = '(?<![\\p{L}\\p{M}])';
const E = '(?![\\p{L}\\p{M}])';

/** Both apostrophes, always. AZERTY types one and iOS rewrites it to the other. */
const APOS = "['’]";

/**
 * Build a Unicode-aware French pattern from a list of alternatives.
 *
 * Every pattern in this file goes through here rather than being written by
 * hand, so that nobody reintroduces `\b` by accident.
 */
function fr(...alternatives: string[]): RegExp {
  return new RegExp(`${B}(?:${alternatives.join('|')})${E}`, 'iu');
}

/**
 * The clitics that sit between `je` and the verb.
 *
 * `me`, `te`, `se`, `le`, `la`, `les`, `lui`, `leur`, `y`, `en`, and their
 * elided forms. Written as an optional prefix on every verb pattern, which is
 * what lets `je le frappe` and `je frappe Rook` match the same verb.
 */
const CLITIC = `(?:(?:me|m${APOS}|te|t${APOS}|se|s${APOS}|le|la|l${APOS}|les|lui|leur|y|en)\\s+)*`;

/**
 * `je`, `j'`, `j` glued to the verb, or nothing at all.
 *
 * The bare `j` is not a typo allowance for its own sake — `jparle a mako` is in
 * the probe corpus because it is what people type on a phone, and a parser that
 * only understands correctly-punctuated French understands almost nobody.
 */
const SUBJECT = `(?:je\\s+|j${APOS}?\\s*)?`;

/**
 * A verb, however the player conjugated it, with the clitics in front.
 *
 * French verb endings are the reason this takes stems rather than whole words:
 * a player writes `j'attaque`, `j'ai attaqué`, `attaquer`, `attaquons`. Matching
 * the stem and allowing the endings is far more robust than enumerating forms,
 * and far less likely to miss the one form somebody actually types.
 */
function verbForms(...stems: string[]): string {
  // `s` is here because `j'attends` is `attend` + `s`, and leaving it out made
  // every `-ds` present-tense form silently fail — which is exactly the class of
  // bug that made 37 of 39 probes `custom` in the first place.
  const endings = '(?:e|es|ent|er|é|ée|és|ées|ais|ait|aient|ons|ez|a|as|â|î|i|is|it|issent|s)?';
  return `${CLITIC}(?:${stems.join('|')})${endings}`;
}

export const VERB_LEXICON_FR: Array<{ verb: Verb; patterns: RegExp[] }> = [
  {
    verb: 'travel',
    patterns: [
      fr(`${SUBJECT}${verbForms('vais', 'va', 'aller', 'pars', 'part', 'partir', 'sors', 'sort', 'sortir', 'rentre', 'rentrer', 'monte', 'monter', 'descends', 'descend', 'descendre', 'retourne', 'retourner', 'avance', 'avancer', 'marche', 'marcher', 'entre', 'entrer')}`),
      // `direction vers/à/dans` — the preposition is what makes it travel.
      fr(`${SUBJECT}${verbForms('me\\s+dirige', 'me\\s+rends')}`),
      // `je me casse`, `je me tire`, `je me barre` — leaving, in the register a
      // player actually uses. Not violence, despite `casse` and `tire`.
      fr(`${SUBJECT}me\\s+(?:casse|tire|barre|sauve)`),
    ],
  },
  {
    verb: 'attack',
    patterns: [
      // Unambiguous violence. None of these is also a piece of furniture.
      fr(`${SUBJECT}${verbForms('attaqu', 'frapp', 'cogn', 'agress', 'poignard', 'égorg', 'étrangl', 'tabass', 'rou', 'assomm', 'charg', 'bouscul', 'pouss')}`),
      fr(`${SUBJECT}${verbForms('tue', 'tuer', 'abats', 'abattre', 'achève', 'achever')}`),
      // `je lui mets une droite`, `je lui casse la figure` — the idioms a
      // French player actually types, which no verb list would catch.
      new RegExp(`${B}(?:mets?|met|colle|fous|fout|casse|éclate|défonce)\\s+(?:lui\\s+|leur\\s+)?(?:une|la|le|les|son|sa|ses)\\s+(?:droite|gauche|tarte|beigne|gueule|figure|tête)${E}`, 'iu'),
      fr(`${SUBJECT}${verbForms('me\\s+bats', 'me\\s+batt', 'continu')}`),
    ],
  },
  {
    verb: 'speak',
    patterns: [
      fr(`${SUBJECT}${verbForms('parl', 'dis', 'dit', 'dire', 'raconte', 'raconter', 'répond', 'réponds', 'répondre', 'demande', 'demander', 'appelle', 'appeler', 'salue', 'saluer', 'interroge', 'interroger')}`),
      // `je m'adresse à`, `je lui adresse la parole`.
      fr(`${SUBJECT}${verbForms(`m${APOS}adress`, 'adress')}`),
    ],
  },
  {
    verb: 'persuade',
    patterns: [
      fr(`${SUBJECT}${verbForms('convainc', 'convaincre', 'persuad', 'suppli', 'implor', 'négoci', 'plaid', 'insist', 'rassur', 'calm')}`),
      fr(`${SUBJECT}${verbForms('essaie\\s+de\\s+convaincre', 'tente\\s+de\\s+convaincre')}`),
    ],
  },
  {
    verb: 'deceive',
    patterns: [
      // `mentir` is irregular enough to be worth its own forms.
      fr(`${SUBJECT}${CLITIC}(?:mens|ment|mentir|mentons|mentez|menti)`),
      fr(`${SUBJECT}${verbForms('tromp', 'dupe', 'duper', 'berne', 'berner', 'bluff', 'feins', 'feint', 'feindre', 'prétend', 'prétends', 'prétendre', 'invent')}`),
      fr(`${SUBJECT}${verbForms('fais\\s+semblant', 'fait\\s+semblant')}`),
    ],
  },
  {
    verb: 'threaten',
    patterns: [
      fr(`${SUBJECT}${verbForms('menac', 'intimid', 'avertis', 'avertit', 'avertir', 'préviens', 'prévient')}`),
      fr(`${SUBJECT}${verbForms('hauss')}\\s+(?:le\\s+)?ton`),
    ],
  },
  {
    verb: 'oppose',
    patterns: [
      fr(`${SUBJECT}${verbForms('refus', 'oppos', 'conteste', 'contester', 'résist', 'proteste', 'protester', 'défie', 'défier')}`),
      fr(`${SUBJECT}${verbForms('tiens\\s+tête', 'tient\\s+tête', 'tenir\\s+tête')}`),
      // Refusal as an idiom rather than as a verb. `hors de question` has no
      // verb in it at all, and it is one of the commonest ways to say no.
      fr('hors\\s+de\\s+question', 'pas\\s+envie', 'pas\\s+question', 'jamais\\s+de\\s+la\\s+vie'),
    ],
  },
  {
    verb: 'inspect',
    patterns: [
      fr(`${SUBJECT}${verbForms('regard', 'observ', 'examin', 'inspect', 'fouill', 'cherch', 'scrut', 'étudi', 'lis', 'lit', 'lire', 'écoute', 'écouter', 'sens', 'sent', 'sentir')}`),
      fr(`${SUBJECT}${verbForms('jette')}\\s+un\\s+(?:coup\\s+d${APOS}|)?œil`),
    ],
  },
  {
    verb: 'interact',
    patterns: [
      fr(`${SUBJECT}${verbForms('ouvr', 'ferm', 'pouss', 'tir', 'touch', 'attrap', 'ramass', 'soulèv', 'soulev', 'appuie', 'appuyer', 'actionn', 'allume', 'allumer', 'éteins', 'éteint', 'éteindre', 'frapp\\s+à\\s+la\\s+porte')}`),
    ],
  },
  {
    verb: 'steal',
    patterns: [
      fr(`${SUBJECT}${verbForms('vol', 'dérob', 'subtilis', 'pique', 'piquer', 'chourav')}`),
      fr(`${SUBJECT}${verbForms('fais\\s+les\\s+poches', 'fait\\s+les\\s+poches')}`),
    ],
  },
  {
    verb: 'hide',
    patterns: [
      fr(`${SUBJECT}${verbForms('me\\s+cach', 'cach', 'me\\s+planqu', 'me\\s+dissimul', 'me\\s+faufil', 'me\\s+glisse', 'me\\s+glisser')}`),
      fr(`${SUBJECT}${verbForms('reste')}\\s+(?:dans\\s+l${APOS}ombre|discret|discrète)`),
    ],
  },
  {
    verb: 'defend',
    patterns: [
      fr(`${SUBJECT}${verbForms('me\\s+défend', 'défend', 'pare', 'parer', 'bloqu', 'esquiv', 'protège', 'protéger', 'me\\s+protège', 'me\\s+protéger')}`),
    ],
  },
  {
    verb: 'help',
    patterns: [
      fr(`${SUBJECT}${verbForms('aide', 'aider', 'secour', 'soutiens', 'soutient', 'soutenir', 'soign', 'assiste', 'assister', 'accompagn')}`),
      fr(`${SUBJECT}${verbForms('donne\\s+un\\s+coup\\s+de\\s+main')}`),
    ],
  },
  {
    verb: 'rest',
    patterns: [
      fr(`${SUBJECT}${verbForms('me\\s+repos', 'repos', 'dors', 'dort', 'dormir', `m${APOS}assois`, `m${APOS}assied`, `m${APOS}assoir`, 'souffle', 'souffler', 'récupèr', 'récupér')}`),
    ],
  },
  {
    verb: 'wait',
    patterns: [
      fr(`${SUBJECT}${verbForms('attend', 'patient', 'observ\\s+sans\\s+bouger', 'ne\\s+fais\\s+rien')}`),
      // Negation without `ne`, which is how French is actually spoken.
      // `je bouge pas`, `je fais rien`, `je dis rien`.
      fr(`${SUBJECT}(?:bouge|fais|dis|réponds)\\s+(?:pas|rien)`),
    ],
  },
  {
    verb: 'use_item',
    patterns: [
      fr(`${SUBJECT}${verbForms('utilis', 'emploie', 'employer', 'bois', 'boit', 'boire', 'mange', 'manger', 'lance', 'lancer', 'équipe', 'équiper', 'dégain', 'sors\\s+mon', 'sort\\s+son')}`),
    ],
  },
  {
    verb: 'use_ability',
    patterns: [
      fr(`${SUBJECT}${verbForms('active', 'activer', 'invoque', 'invoquer', 'déclench', 'canalise', 'canaliser')}`),
      fr(`${SUBJECT}${verbForms('utilis')}\\s+(?:ma|mon|mes)\\s+(?:technique|capacité|pouvoir|don)`),
    ],
  },
];

/**
 * The French half of `META_PATTERNS`.
 *
 * Spec §18.3 — the player's text is data, never instruction. A French player
 * attempting a prompt injection does it in French, and an English-only pattern
 * list routes it to the writer instead of to a refusal.
 */
export const META_PATTERNS_FR: Array<{ pattern: RegExp; label: string }> = [
  {
    pattern: fr('(?:ignore|oublie|oubliez|ignorez)\\s+(?:toutes\\s+)?(?:les\\s+)?(?:instructions|règles|consignes)\\s+(?:précédentes|au-dessus|antérieures)'),
    label: 'instruction_override',
  },
  {
    pattern: fr('(?:montre|donne|révèle|affiche)(?:-moi)?\\s+(?:ton|le|votre)\\s+(?:prompt|invite\\s+système|message\\s+système)'),
    label: 'prompt_extraction',
  },
  {
    pattern: fr('(?:donne|ajoute|offre)(?:-moi)?\\s+(?:\\d+\\s+)?(?:crédits?|pièces?|argent)'),
    label: 'currency_request',
  },
  {
    pattern: fr(`(?:tu\\s+es\\s+maintenant|comporte-toi\\s+comme|fais\\s+comme\\s+si\\s+tu\\s+étais|joue\\s+le\\s+rôle\\s+d${APOS})`),
    label: 'role_override',
  },
  {
    pattern: fr('(?:mets|met|règle|change)\\s+(?:mes|ma|mon)\\s+(?:stats?|statistiques|points\\s+de\\s+vie|niveau|attributs?)\\s+à'),
    label: 'state_override',
  },
  { pattern: fr('mode\\s+(?:développeur|debug|administrateur|admin)'), label: 'privilege_escalation' },
];

/**
 * Clause separators that indicate genuinely sequential actions, in French.
 *
 * `puis`, `ensuite`, `et puis`, `avant de`. Note `et` alone is **not** here for
 * the same reason `and` alone is not in the English: `je prends la lampe et la
 * corde` is one action with two objects, not two actions.
 */
export const CLAUSE_SPLIT_FR =
  /\s*(?:,\s*(?:puis|ensuite|et\s+puis)\s+|\s+et\s+puis\s+|\s+puis\s+|\s+ensuite\s+|;\s*|\s+avant\s+de\s+)\s*/iu;

/**
 * Quotation marks a French player actually produces.
 *
 * The French iOS keyboard with Smart Punctuation on — the default — produces
 * guillemets, so the player who quotes their character *correctly* is the one
 * whose speech would be dropped by an ASCII-only pattern. The shipped
 * `QUOTED_SPEECH` already carries `«`/`»` and no longer treats an apostrophe as
 * an opening quote, which was the highest-value single fix in the French parser
 * audit and has since landed on `main`. Kept here as a regression witness: if
 * either ever regresses, `fr-parser-probe` says so before a French player does.
 */
export const FRENCH_QUOTE_WITNESS = {
  guillemets: '«»',
  /** `j'ouvre et j'attends` must not be read as a quotation. */
  elisionIsNotAQuote: "j'ouvre et j'attends",
} as const;
