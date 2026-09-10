/**
 * French agreement with the player.
 *
 * French needs the player's grammatical gender constantly, in second person, in
 * ordinary sentences — `Tu es arrivé` against `Tu es arrivée`. English barely
 * needs it at all, which is why nothing in the product collected it before.
 *
 * Two rules from `docs/localization/fr-FR/PLAYER_GRAMMAR.md` are enforced here
 * rather than left to whoever writes the next sentence:
 *
 * **Never a midpoint.** `arrivé·e` does not appear, in prose or in UI. Not
 * because inclusive writing is wrong, but because the midpoint dot is an
 * administrative register in France — HR circulars, university mail, municipal
 * signage — it was banned from school documents by ministerial circular, and in
 * a story about a person opening a door it reads as paperwork. It also breaks
 * read-aloud, and the product marks blocks `voiceEligible`.
 *
 * **`NEUTRAL` and `UNSPECIFIED` take the unmarked masculine**, and the writer is
 * told to avoid the construction entirely where it can — present tense has no
 * participle, a verb beats an adjective, `Il n'y a personne d'autre` beats
 * `Tu es seul(e)`. That avoidance is not a compromise: present-tense,
 * verb-driven, adjective-light French is what `NARRATIVE_STYLE.md` asks for on
 * completely independent grounds, which is why it is affordable.
 *
 * This module is the deterministic half. It agrees a word that is already
 * there. It cannot restructure a sentence, and it is not meant to — that is
 * `WRITER_POLICY_FR`'s job.
 */

import type { GrammaticalGender } from './locale.js';

/**
 * Feminine forms that are not `+e`.
 *
 * Ordered longest-suffix-first, because `-eur` and `-er` and `-r` would
 * otherwise race. Only endings that actually occur in second-person narration
 * are here; this is not a French morphology engine and should not become one.
 */
const FEMININE_ENDINGS: readonly (readonly [RegExp, string])[] = [
  // `heureux` → `heureuse`, `jaloux` → `jalouse`.
  [/eux$/, 'euse'],
  // `menteur` → `menteuse`. Before the `-eur` → `-eure` cases, which are rarer
  // in narration and are handled by the caller passing the right base word.
  [/teur$/, 'teuse'],
  // `neuf` → `neuve`, `vif` → `vive`.
  [/f$/, 've'],
  // `premier` → `première`, `dernier` → `dernière`.
  [/er$/, 'ère'],
  // `cruel` → `cruelle`, `nul` → `nulle`.
  [/el$/, 'elle'],
  [/eil$/, 'eille'],
  // `ancien` → `ancienne`, `bon` → `bonne`.
  [/ien$/, 'ienne'],
  [/on$/, 'onne'],
  // `net` → `nette`, `muet` → `muette`.
  [/et$/, 'ette'],
  // `gras` → `grasse`, `bas` → `basse`.
  [/as$/, 'asse'],
  // `gentil` → `gentille`.
  [/il$/, 'ille'],
  // `franc` → `franche`.
  [/anc$/, 'anche'],
  // `long` → `longue`.
  [/ong$/, 'ongue'],
  // `faux` → `fausse` is irregular enough to be worth naming.
  [/^faux$/, 'fausse'],
  // `frais` → `fraîche`.
  [/^frais$/, 'fraîche'],
];

/**
 * Words whose feminine is identical to their masculine.
 *
 * Anything already ending in an unaccented `e` is invariable — `calme`,
 * `tranquille`, `jeune`, `libre`, `honnête` — and adding another would produce
 * `calmee`.
 */
function isInvariable(word: string): boolean {
  return /e$/.test(word) && !/é$/.test(word);
}

/**
 * Agree a French past participle or adjective with the player.
 *
 * Takes the **masculine singular** and returns the form to print.
 *
 * ```ts
 * agree('arrivé', 'FEMININE')     // 'arrivée'
 * agree('arrivé', 'MASCULINE')    // 'arrivé'
 * agree('arrivé', 'UNSPECIFIED')  // 'arrivé'  — unmarked, never 'arrivé·e'
 * agree('prêt', 'FEMININE')       // 'prête'
 * agree('calme', 'FEMININE')      // 'calme'
 * ```
 */
export function agree(masculine: string, gender: GrammaticalGender): string {
  if (gender !== 'FEMININE') return masculine;
  if (masculine.length === 0) return masculine;
  if (isInvariable(masculine)) return masculine;

  for (const [pattern, replacement] of FEMININE_ENDINGS) {
    if (pattern.test(masculine)) return masculine.replace(pattern, replacement);
  }
  return `${masculine}e`;
}

/**
 * The third-person pronoun an NPC uses about the player.
 *
 * A player who typed a neologism into the free-text `pronouns` field gets that
 * string back verbatim: `iel` is in Le Robert and is what French non-binary
 * speakers actually use, and a product that offers a neutral option and then
 * quietly writes `il` has done something worse than not offering one.
 */
export function thirdPersonPronoun(
  gender: GrammaticalGender,
  declared: string,
): string {
  const trimmed = declared.trim();
  if (trimmed.length > 0) return trimmed;
  switch (gender) {
    case 'MASCULINE':
      return 'il';
    case 'FEMININE':
      return 'elle';
    case 'NEUTRAL':
      return 'iel';
    case 'UNSPECIFIED':
      return '';
  }
}

/**
 * True when a rendered string contains a midpoint between two letters —
 * `arrivé·e`, `étudiant·e·s`.
 *
 * A hard failure wherever it fires. Used by `fr-lint` and by the catalogue
 * tests; it is here rather than in the linter so the runtime and the lint agree
 * on what the rule is.
 */
export function hasMidpoint(text: string): boolean {
  return /\p{L}[·.\-]\p{L}\b/u.test(text) && /\p{L}·\p{L}/u.test(text);
}
