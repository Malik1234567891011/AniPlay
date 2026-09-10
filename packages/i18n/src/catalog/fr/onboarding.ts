/**
 * Le français de `onboarding`. Écrit, pas traduit — voir PRODUCT_VOICE.md.
 *
 * **This is the first French a player ever reads.** The age gate and the taste
 * picker decide, before any story does, whether the product is a person talking
 * to them or a form asking them to declare something. So: `Dis-nous ton âge`,
 * not `Veuillez indiquer votre tranche d’âge`; `Tu peux aussi passer`, not
 * `Cette étape est facultative`. Every institutional word that could have got in
 * here — `tranche d’âge`, `sélectionner`, `préférences` — was kept out on
 * purpose, because a form here makes every screen after it a form too.
 *
 * The register is `tu` throughout, including on the age gate, which is the one
 * screen where a French product is most tempted to reach for `vous` because it
 * feels legal. It is not legal text; it is a question with four chips.
 */
export const onboarding = {
  /* ---------------------------------------------------------------------- */
  /* OB-01 — splash                                                         */
  /* ---------------------------------------------------------------------- */

  /** A status, not an instruction. U+2026, one character, never three periods. */
  'onboarding.loading': 'Chargement…',

  /* ---------------------------------------------------------------------- */
  /* OB-02 — the age gate                                                   */
  /* ---------------------------------------------------------------------- */

  /**
   * No person at all, which is what French does on a threshold — and it reads
   * as an invitation rather than as a checkpoint. `Avant que tu entres` would
   * be a subjunctive and a border post.
   */
  'onboarding.age_gate_title': 'Avant d’entrer',
  /**
   * `ton âge` and not `ta tranche d’âge`: the chips do the banding, and
   * `tranche d’âge` is the vocabulary of a census form. The colon carries the
   * "so we can" — a French `pour qu’on te montre` would be a subjunctive, which
   * PRODUCT_VOICE rule 4 keeps out of the UI.
   */
  'onboarding.age_gate_body':
    'Certains mondes parlent de conflit, de danger et de choix difficiles. Dis-nous ton âge : on te montrera ceux qu’il te faut.',
  /**
   * The four chips. The two ranges keep the English's digits and en dash
   * (U+2013) and take U+00A0 on both sides so a chip can never break across
   * lines; the two open bands need `ans`, exactly as the English needs `Under`
   * and `or older`. `Moins de 13 ans` is the longest of the four — check the
   * row on a small device.
   */
  'onboarding.age_band_under_13': 'Moins de 13 ans',
  'onboarding.age_band_13_17': '13 – 17',
  'onboarding.age_band_18_24': '18 – 24',
  'onboarding.age_band_25_plus': '25 ans et plus',
  /**
   * Warm, not scolding — they told the truth and the line has to sound like it
   * was worth doing. `c’est à partir de 13 ans` is how a French product says an
   * age floor; `est destiné aux joueurs de 13 ans et plus` is how a legal
   * notice says it.
   *
   * La marque est tranchée : le produit s’appelle PLOTBREAK partout — `app.json`,
   * `server.ts`, l’icône, la doc. Un nom de marque ne se traduit pas, ne
   * s’accentue pas et ne s’espace pas.*/
  'onboarding.age_too_young':
    'PLOTBREAK, c’est à partir de 13 ans. Merci d’être honnête avec nous.',
  /**
   * The imperative, per PRODUCT_VOICE rule 2 — onboarding is momentum, and this
   * button is ours rather than Apple's, so it is not the infinitive
   * `Continuer`. It is identical to the English word and that is a coincidence
   * of spelling, not an untranslated string.
   */
  'onboarding.continue': 'Continue',
  /**
   * ⚠️ These two name published legal documents, so they must match whatever
   * the French versions are actually titled once they exist — if the published
   * document is headed `Politique de confidentialité`, this row changes to
   * match it. `Confidentialité` and `Conditions d’utilisation` are the standard
   * French titles and the ones PRODUCT_VOICE assumes; `Termes` and `Conditions`
   * alone are both calques.
   */
  'onboarding.privacy': 'Confidentialité',
  'onboarding.terms': 'Conditions d’utilisation',

  /* ---------------------------------------------------------------------- */
  /* OB-03 — taste picker                                                   */
  /* ---------------------------------------------------------------------- */

  /**
   * `ce que tu jouerais` — never `n’importe quoi`, which means *nonsense* in
   * French and is the trap PRODUCT_VOICE names by hand. `vraiment` carries the
   * English `actually`: pick what you would really play, not what looks good.
   * The full stop is part of the line.
   */
  'onboarding.taste_title': 'Choisis ce que tu jouerais vraiment.',
  /**
   * `Découvrir` travels with `nav.discover` and is the tab's name, so it opens
   * the second sentence rather than sitting inside one — a French sentence that
   * puts a capitalised label mid-clause reads as English Title Case leaking in.
   * `ça se change quand tu veux` is the reassurance, and it is the content of
   * the string: an optional step that sounds compulsory gets skipped by nobody
   * and resented by everybody.
   */
  'onboarding.taste_body':
    'Cinq maximum. Découvrir mettra ça en haut de la page — rien n’est caché pour autant, et ça se change quand tu veux. Tu peux aussi passer.',
  /** `Passer` is the step. `Sauter` is a jump and `Ignorer` is a snub. */
  'onboarding.skip': 'Passer',
  /**
   * OB-04, la vitrine.
   *
   * `Tout est prêt\u202f!` et non `Prêt\u202f!` : l\u2019anglais félicite le joueur d\u2019avoir
   * fini un formulaire, et le français fait ça en parlant de la chose, pas de
   * la personne. `Choisis` à l\u2019impératif — c\u2019est un bouton qui s\u2019adresse au
   * joueur, pas une étiquette.
   *
   * `See all stories` devient `Voir tous les mondes` : le produit dit `monde`
   * partout ailleurs (TERMINOLOGY §2.1), et `histoires` ici rouvrirait une
   * question de vocabulaire déjà tranchée.
   */
  'onboarding.showcase_title': 'Tout est prêt\u202f! Choisis un titre et lance-toi.',
  'onboarding.showcase_body': 'On t\u2019en a mis quelques-uns de côté pour commencer.',
  'onboarding.showcase_card_a11y': '{title}. Lancer cette histoire.',
  'onboarding.see_all_stories': 'Voir tous les mondes',
} as const;
