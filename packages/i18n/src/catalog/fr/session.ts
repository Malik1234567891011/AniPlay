/**
 * L’écran de jeu — le français que le joueur lit à chaque tour.
 *
 * This file is the chrome that stands around the prose: the composer, the
 * stage, the turn menu, the tier sheet, the five errors. It is read on every
 * single turn, right next to the beat, and that is the whole argument for it —
 * **if the chrome reads as translated, the beat reads as translated too.** So
 * it is written in French rather than translated from the English, per
 * `PRODUCT_VOICE.md`, and it stays in the register `world.ts` established,
 * because these strings and those strings share a screen.
 *
 * ## Ce qui a été décidé ici
 *
 * **`tour`, jamais `virage` ni `se tourner`.** A turn is a game turn
 * (`TERMINOLOGY.md` §3.1), and the one place the word does *not* survive is the
 * tier sheet: `Turn quality` is `Qualité de la scène`, because `Qualité de
 * tour` is on the calque blacklist and `la scène` is the UI word for a beat.
 *
 * **Les espaces insécables sont écrites en échappement**, `\u00A0`, comme dans
 * `world.ts` et `setup.ts` et pour la même raison : une espace insécable est
 * invisible dans un diff, et c’est exactement le caractère que quelqu’un
 * « nettoie » sans le voir. Written as the literal character it did not even
 * survive being written to this file once — it came back as U+0020.
 *
 * Six strings carry one, and it is load-bearing in all six: before `?` in
 * `what_do_you_do`, before `:` in `stage_a11y`, `player_action_a11y`,
 * `resource_nearly_gone` and `retry_explainer`, and inside the guillemets of
 * `quoted_action`. `translate()` folds U+202F to U+00A0 on the way out, but it
 * never *inserts* a space — a missing one here is a visible typographic fault
 * on the play screen, on every turn.
 *
 * **Rien n’a été ajouté.** No exclamation mark, no adjective, no connector the
 * English did not have. The documented failure mode of French genre
 * localization is addition, and a play screen is where addition accumulates.
 *
 * **Les étiquettes VoiceOver sont à l’infinitif.** `Toucher pour afficher`,
 * not `Touche pour afficher`: VoiceOver chrome is one of the system seams
 * `PRODUCT_VOICE.md` rule 1 carves out, and French reads an infinitive as label
 * voice rather than as person voice. Everything the *player* is addressed by —
 * the composer, the explainers — stays `tu`.
 *
 * **Les quatre paliers gardent leur nom anglais.** See the block above them.
 *
 * ## À vérifier sur un appareil
 *
 * `more_credits_needed` and `last_turn` share one `Row` at `Session.tsx:728`
 * in `micro` type. French runs 43 characters across that row against English's
 * 34 — under the 1.37× mean of `UI_AUDIT.md` §2.6, but it is still the row to
 * look at first on a small screen.
 */
export const session = {
  /* ---------------------------------------------------------------------- */
  /* A. Session header                                                       */
  /* ---------------------------------------------------------------------- */

  'session.back_to_library': 'Retour à la bibliothèque',
  /**
   * `la fiche du monde` — the word French RPGs use for a reference sheet
   * (`fiche de personnage`), and already the phrasing `world.ts` uses for this
   * screen. Infinitive: it is navigation.
   */
  'session.open_world_sheet': 'Ouvrir la fiche du monde',

  /* ---------------------------------------------------------------------- */
  /* C. Story beat / transcript                                              */
  /* ---------------------------------------------------------------------- */

  'session.scene_image_a11y': 'Image de la scène. Toucher pour afficher en plein écran.',
  'session.reaction_image_a11y': '{name}, {emotion}. Toucher pour afficher en plein écran.',
  /**
   * `Résolution…` is impossible: `résolution` is a screen setting in French and
   * the false friend the blacklist bans for the attribute. `En cours…` is the
   * plainest honest French for a state, which is what the English is being on
   * purpose (spec §25.12). No loading theatre.
   */
  'session.resolving': 'En cours…',
  'session.try_again': 'Réessayer',

  /* ---------------------------------------------------------------------- */
  /* D. Composer dock                                                        */
  /* ---------------------------------------------------------------------- */

  /** U+00A0 avant le `?`. La forme neutre et non marquée — jamais `Que fais-tu ?`. */
  'session.what_do_you_do': 'Qu’est-ce que tu fais\u00A0?',
  /** `ce que tu veux`, jamais `n’importe quoi` — qui veut dire « des bêtises ». */
  'session.say_or_do_anything': 'Dis ou fais ce que tu veux…',
  /** Arrêter la génération. Jamais l’interjection, jamais `Stop`. */
  'session.stop': 'Arrêter',
  'session.send_action': 'Envoyer l’action',
  /**
   * `Il te manque…` is how French states a shortfall — the English shape
   * (`# more credits needed`) has no French equivalent that is not a form.
   * ICU plural, so zero says `crédit` and not `crédits`.
   */
  'session.more_credits_needed':
    '{count, plural, one {Il te manque # crédit} other {Il te manque # crédits}}',
  'session.turn_options': 'Options du tour',
  /**
   * Le `··· ` initial fait partie de la chaîne.
   *
   * `Le tour précédent` rather than `Dernier tour`: in French `le dernier tour`
   * is the *final* lap or round, which is the opposite of what this opens. The
   * article is what keeps it a noun phrase and out of Title Case.
   */
  'session.last_turn': '··· Le tour précédent',

  /* ---------------------------------------------------------------------- */
  /* Full-screen media viewer                                                */
  /* ---------------------------------------------------------------------- */

  'session.close_image': 'Fermer l’image',
  /** `l’écran` carries "anywhere" — the whole surface dismisses. */
  'session.tap_anywhere_to_close': 'Toucher l’écran pour fermer',

  /* ---------------------------------------------------------------------- */
  /* Errors                                                                  */
  /* ---------------------------------------------------------------------- */

  /* `Impossible de…`, jamais `Une erreur s’est produite`. PRODUCT_VOICE règle 4. */
  'session.load_failed': 'Impossible de charger cette histoire.',
  /** La promesse d’argent doit rester nette : rien n’a été prélevé. */
  'session.turn_failed': 'Ce tour n’est pas allé au bout. Tu n’as rien payé.',
  'session.stale_revision': 'L’histoire a avancé. Ton action est toujours là — envoie-la quand tu veux.',
  /** `gardée` = gardée en local, pas perdue. */
  'session.offline': 'Tu es hors connexion. Ton action est gardée.',
  /** Même promesse d’argent que `turn_failed`, écrite pareil pour être crue. */
  'session.rephrase_failed': 'Impossible de réécrire pour le moment. Tu n’as rien payé.',

  /* ---------------------------------------------------------------------- */
  /* The stage                                                               */
  /* ---------------------------------------------------------------------- */

  /** Pas de virgule avant `et`, comme en anglais et comme en français. */
  'session.name_list': '{others} et {last}',
  /** U+00A0 avant le `:`. */
  'session.stage_a11y': 'Scène\u00A0: {location}. {presence}',
  /**
   * `Il y a {names}` plutôt que `{names} sont là` : `{names}` peut être un seul
   * nom, et `il y a` est invariable au singulier comme au pluriel. Un verbe
   * accordé se serait trompé une fois sur deux, et un adjectif (`présents` /
   * `présentes`) une fois sur deux aussi — c’est le raisonnement de `world.ts`
   * sur l’échelle des relations, appliqué ici.
   */
  'session.present': 'Il y a {names}.',
  /** `d’autre` porte le « else » : personne à part toi. */
  'session.nobody_else_here': 'Il n’y a personne d’autre.',
  /** `redessiner` = refaire l’image. Jamais `retirer`, jamais `tirer`. */
  'session.your_character_a11y': 'Ton personnage. Toucher pour voir ou redessiner.',
  /** `Dessiner`, jamais `Tirer` — et rien à voir avec `draw` = dégainer. */
  'session.draw_your_character_a11y': 'Dessiner ton personnage.',
  /** Le joueur comme locuteur. `Toi`, comme dans `memory.you`. */
  'session.you': 'Toi',
  /** 56–76 pt sur deux lignes : 11 caractères, deux de moins que l’anglais. */
  'session.draw_yourself': 'Dessine-toi',
  /** `{mood}` vient du moteur et n’est pas traduit ici. */
  'session.crew_member': '{name} · {mood}',
  /**
   * Un état, pas un nombre. `il n’en reste presque plus` reprend `{name}` par
   * `en`, donc la ressource peut être de n’importe quel genre — un adjectif
   * (`épuisé` / `épuisée`) aurait demandé un genre que le monde ne donne pas.
   * U+00A0 avant le `:`.
   */
  'session.resource_nearly_gone': '{name}\u00A0: il n’en reste presque plus',

  /* ---------------------------------------------------------------------- */
  /* Narrative blocks                                                        */
  /* ---------------------------------------------------------------------- */

  /** Une voix qu’on n’identifie pas. `Une voix` marchait aussi ; `Quelqu’un` est plus court et se lit comme une étiquette de locuteur. */
  'session.someone': 'Quelqu’un',
  /** U+00A0 avant le `:`. `{text}` est dans la langue où le joueur l’a tapé. */
  'session.player_action_a11y': 'Toi\u00A0: {text}',

  /* ---------------------------------------------------------------------- */
  /* GP-04 — the turn menu                                                   */
  /* ---------------------------------------------------------------------- */

  'session.this_turn': 'Ce tour',
  /**
   * Guillemets français, U+00A0 à l’intérieur. Les guillemets anglais de
   * `components.tsx:316` sont une convention anglaise ; en français ce sont
   * ceux-ci, et jamais `"` U+0022. Voir TYPOGRAPHY.md §1.
   */
  'session.quoted_action': '\u00AB\u00A0{text}\u00A0\u00BB',
  /**
   * `Retenter` porte la tentative — c’est un nouveau tour, pas une annulation.
   * `Réessayer` est déjà pris par le bouton d’erreur et ne dirait pas la même
   * chose ici.
   */
  'session.retry': 'Retenter la même chose · {cost}',
  /** Trois phrases courtes restent trois phrases courtes. U+00A0 avant le `:`. */
  'session.retry_explainer':
    'Ton action repart comme un nouveau tour. Les dés sont relancés\u00A0: c’est une nouvelle tentative. Le monde ne revient pas en arrière.',
  /** `autrement` porte sur le récit, pas sur ce qui arrive. */
  'session.rephrase': 'Raconter autrement · {cost}',
  'session.rewriting': 'Réécriture…',
  /** `Rien … ne change` / `Seuls les mots changent` : le miroir fait la promesse. */
  'session.rephrase_explainer':
    'Le même moment, écrit autrement. Rien de ce qui s’est passé ne change — mêmes jets, même résultat, mêmes conséquences. Seuls les mots changent.',
  /** `la barre` = le champ de saisie en bas de l’écran (TERMINOLOGY §3.1). */
  'session.edit_action': 'Remettre l’action dans la barre',
  'session.edit_explainer': 'Change les mots et envoie quand tu veux. Ça ne coûte rien tant que tu n’as pas envoyé.',
  'session.share_action': 'Partager ce moment',
  /** `C’est toi qui choisis` : le clivage donne l’insistance que l’anglais tire de « You choose ». */
  'session.share_explainer': 'La carte se crée sur ton téléphone. C’est toi qui choisis ce qu’elle dit et où elle va.',
  /**
   * L’histoire s’est contredite. Ce n’est ni un signalement d’abus ni un
   * rapport de plantage, et `Signaler une incohérence` en ferait un formulaire
   * — l’anglais garde exprès les mots du joueur, le français aussi.
   */
  'session.report_action': 'Quelque chose ne colle pas',
  /** `chronologie` = l’onglet Timeline de la fiche du monde. */
  'session.report_explainer': 'Ça ouvre la chronologie, où tu peux corriger ce que l’histoire a retenu. Gratuit.',

  /* ---------------------------------------------------------------------- */
  /* The bottom-sheet shell                                                  */
  /* ---------------------------------------------------------------------- */

  /** `{title}` arrive déjà en minuscules. Rien n’est ajouté autour. */
  'session.close_sheet': 'Fermer {title}',

  /* ---------------------------------------------------------------------- */
  /* GP-02 — the quality tier sheet                                          */
  /* ---------------------------------------------------------------------- */

  /** `Qualité de la scène`, pas `Qualité de tour` : TERMINOLOGY §3.6, et la liste noire §5. */
  'session.turn_quality': 'Qualité de la scène',
  /** La dernière proposition est une promesse d’équité et ne doit pas s’adoucir. */
  'session.turn_quality_explainer':
    'Plus le palier est haut, plus la mise en scène est riche et les images soignées. Tous les paliers lancent les mêmes dés — payer plus ne change jamais le résultat.',
  'session.tier_a11y': '{label}, {cost, plural, one {# crédit} other {# crédits}}. {promise}',

  /*
   * Les quatre paliers gardent leur nom anglais.
   *
   * `TERMINOLOGY.md` §3.6 recommends Rapide / Intense / Cinéma / Apex — and
   * says in its own header that **nothing in it has been applied to code** and
   * that the tier names are recommendations *pending approval*. They may be
   * brand names. So they stay in English until somebody approves the rename,
   * and the four promise lines below them — which are description, not brand —
   * are written in French.
   *
   * The one thing that must never happen if the rename does go ahead:
   * `CINEMATIC` is **not** `Cinématique`. In French games a `cinématique` is a
   * cutscene, so that label would promise the player a video.
   */
  /** Nom de palier. Renommage en attente d’approbation — TERMINOLOGY.md §3.6 (`Rapide`). */
  'session.tier_quick': 'Quick',
  /** Nom de palier. Renommage en attente d’approbation — TERMINOLOGY.md §3.6 (`Intense`). */
  'session.tier_vivid': 'Vivid',
  /** Nom de palier. Renommage en attente d’approbation — TERMINOLOGY.md §3.6 (`Cinéma`, jamais `Cinématique`). */
  'session.tier_cinematic': 'Cinematic',
  /** Nom de palier. Renommage en attente d’approbation — TERMINOLOGY.md §3.6 (`Apex`, inchangé). */
  'session.tier_apex': 'Apex',

  /** La présentation, jamais les dés (§20.3). */
  'session.tier_quick_promise': 'Un tour rapide et concis',
  /** `direction` = celle d’un réalisateur, donc `mise en scène`. */
  'session.tier_vivid_promise': 'Dialogues et mise en scène plus riches',
  /** `rapidité` = le temps que met le tour à arriver. */
  'session.tier_cinematic_promise': 'Le meilleur équilibre entre immersion et rapidité',
  /** De la profondeur de présentation, pas un meilleur résultat. */
  'session.tier_apex_promise': 'Le raisonnement le plus poussé, la narration la plus soignée',

  /**
   * Une image fixe pour le tour — ni un personnage, ni une image de vidéo. La
   * dire `image de la scène` la rattache à `scene_image_a11y`, qui est la même
   * image.
   */
  'session.hero_frame_eligible': 'Peut générer une image de la scène',
  /** Zéro est singulier en français : `0 tour restant`. */
  'session.turns_left': '{count, plural, one {# tour restant} other {# tours restants}}',
  /** Minuscule : la chaîne se lit sous un nombre de crédits, pas en début de phrase. */
  'session.not_enough': 'pas assez',
} as const;
