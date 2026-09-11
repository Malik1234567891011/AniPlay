/**
 * Le français de `misc`. Écrit, pas traduit — voir PRODUCT_VOICE.md.
 *
 * Two surfaces share this file and they are not the same register.
 *
 * **The sign-in sheet** is ours, so it says `tu` — except where it sits
 * directly against Apple's own chrome, where French reads an infinitive as
 * label voice rather than as a person speaking (PRODUCT_VOICE, the system
 * seam). It is also deliberately not a bank: `Connexion…` and `Impossible de
 * te connecter pour le moment.` are the whole of its technical vocabulary and
 * everything else on the sheet is reassurance. The reassurance is the content,
 * not decoration, so it is written as French reassurance rather than carried
 * over from the English sentence shape.
 *
 * **The report sheet is safety and legal text.** The reason list is not a
 * translator's free choice: it uses the wording French platforms use in their
 * own reporting flows, and each reason carries a comment because **every one
 * of them needs a human safety review before launch.** Where the platform
 * wording and plain French disagree, the comment says so instead of hiding it.
 *
 * One structural note, because it decides several strings here: French cannot
 * say "you're signed in" without choosing between `connecté` and `connectée`,
 * and PLAYER_GRAMMAR rule 4 forbids the midpoint. So these strings are built so
 * the choice never arises — the subject becomes the account or the device, or a
 * verb replaces the adjective. That is avoidance, not compromise; it is what a
 * French writer does anyway.
 */
export const misc = {
  /* ---------------------------------------------------------------------- */
  /* AU-01 — the sign-in sheet                                              */
  /* ---------------------------------------------------------------------- */

  /** VoiceOver only — the glyph is the label. The action, so an infinitive. */
  'misc.close': 'Fermer',
  /**
   * Apple's French for `Done`. Nothing is submitted, so it is the reading that
   * is finished, not the player: no agreement to make.
   */
  'misc.done': 'Terminé',
  /** Apple's own French for `Not Now`, and this button sits beside Apple's. */
  'misc.not_now': 'Pas maintenant',
  /**
   * PRODUCT_VOICE rule 4: `Impossible de…`, then what to do — and here the
   * English offers no next step, so neither does the French. No `Oups !`, no
   * apology, no exclamation mark the source did not have.
   */
  'misc.sign_in_failed': 'Impossible de te connecter pour le moment.',
  /**
   * `t’a suivi` would agree with the player (`suivie`), so the progress is the
   * subject instead. `C’est bon.` is what a French product says here — short,
   * spoken, and not `Connexion réussie`, which is a bank.
   */
  'misc.signed_in_notice': 'C’est bon. Tout ce que tu as joué est là.',
  /**
   * A state, not an action. `Tu es connecté` forces an agreement the app has no
   * right to guess, so the account is the subject and the question disappears.
   */
  'misc.signed_in_title': 'Ton compte est connecté',
  'misc.signed_in_as':
    'Cet appareil est connecté avec {email}. Tes mondes sont enregistrés, et tu les retrouveras sur n’importe quel appareil où tu te connectes.',
  /** `n’importe quel appareil` is fine; `n’importe quoi` for "anything" is not. */
  'misc.worlds_saved_anywhere':
    'Tes mondes sont enregistrés, et tu les retrouveras sur n’importe quel appareil où tu te connectes.',
  /**
   * The headline, so imperative — onboarding and in-flow momentum take `tu`.
   * `Enregistrer` is the frozen word for save-to-library; `Sauver` means
   * *rescue*, which in a product full of characters in danger is a real
   * ambiguity. The English pun on "save the world" does not survive, and
   * inventing a French pun here would be an addition.
   */
  'misc.sign_in_title': 'Enregistre ce monde',
  'misc.sign_in_body':
    'Connecte-toi pour garder ta progression, continuer sur un autre appareil et récupérer tes crédits quotidiens. Tout ce que tu as joué jusqu’ici te suit.',
  /**
   * `tu joues sans compte` rather than `tu joues en invité`: `invité` agrees
   * with the player, and `sans compte` is both ungendered and clearer about
   * what is actually true.
   */
  'misc.sign_in_not_configured':
    'Aucune connexion n’est configurée dans cette version : tu joues sans compte sur cet appareil. Tes mondes sont quand même enregistrés sur le serveur, et ils seront encore là la prochaine fois.',
  /** Apple's own French wording for the button. Do not improve on it. */
  'misc.continue_with_apple': 'Continuer avec Apple',
  /** The status French apps show here. `Connexion en cours…` is longer, not clearer. */
  'misc.signing_in': 'Connexion…',
  /** `e-mail`, never `courriel` — that is fr-CA and a translation-memory leak. */
  'misc.email_code_hint': 'Ou reçois un code à six chiffres par e-mail. Aucun mot de passe à créer.',
  /**
   * `example.com` is the reserved example domain (RFC 2606) and stays; the
   * French for it, `exemple.com`, is a domain someone actually owns. Only the
   * local part is written in French, and `toi@` keeps the sheet's `tu`.
   */
  'misc.email_placeholder': 'toi@example.com',
  /** VoiceOver label for the field. */
  'misc.email_address': 'Adresse e-mail',
  /**
   * `Envoie-moi un code` inverts who is speaking: everywhere else on this sheet
   * the product says `tu` to the player, so a `tu` imperative reads as the app
   * giving the order. The infinitive is the label voice and matches the rest of
   * the button group (`Continuer avec Apple`, `Se connecter`).
   */
  'misc.email_me_a_code': 'Recevoir un code par e-mail',
  'misc.sending': 'Envoi…',
  'misc.code_sent': 'Code envoyé à {email}. Il expire dans quelques minutes.',
  /** `Saisis` is the verb of an administrative form. `Entre` is the product. */
  'misc.enter_code_sent_to': 'Entre le code à six chiffres envoyé à {email}.',
  /** VoiceOver label for the one-time-code field. */
  'misc.six_digit_code': 'Code à six chiffres',
  /** The frozen French for sign in. Never `se logger`, never `s’identifier`. */
  'misc.sign_in': 'Se connecter',
  'misc.use_a_different_email': 'Utiliser une autre adresse',
  /**
   * `à ta place` is the French for "on your behalf" — `en ton nom` is the legal
   * register and would make a reassurance sound like a clause.
   */
  'misc.no_password_footer': 'Aucun mot de passe à créer. On ne publie jamais rien à ta place.',

  /* ---------------------------------------------------------------------- */
  /* SF-01 — the report sheet                                               */
  /*                                                                        */
  /* Safety and legal surface. Every reason below is wording a French        */
  /* platform already uses in its own reporting flow rather than a           */
  /* translation of the English, and every one of them needs a human safety  */
  /* review before launch. The ones flagged ⚠️ are the ones where I know     */
  /* the French is defensible but not that it is what a French moderation    */
  /* team would sign off on.                                                 */
  /* ---------------------------------------------------------------------- */

  /** The action, which is what French flows title this sheet. Never `Rapporter`. */
  'misc.report_title': 'Signaler',
  'misc.cancel': 'Annuler',
  /**
   * {target} is dropped, deliberately. French needs a gendered determiner glued
   * to the noun — `cette histoire`, `ce message`, `ce personnage` — and there
   * is no French sentence that takes a bare noun of unknown gender after
   * `ce/cette`. `ce contenu` is the generic French reporting flows use and it
   * is correct for all three targets. **English-side fix:** if the server ever
   * sends a determined French noun phrase rather than a bare lower-cased noun,
   * this key should become `Qu’est-ce qui ne va pas avec {target} ?`.
   */
  'misc.report_target_question': 'Qu’est-ce qui ne va pas avec ce contenu ?',
  /**
   * ⚠️ SAFETY — human review before launch.
   * The wording French platforms use on the chip itself. French law's term of
   * art is `à caractère pédopornographique`; it is deliberately not used on a
   * player-facing control read by 13-year-olds. This chip is 49 characters
   * against the English 31 — check it on a small device.
   */
  'misc.report_reason_sexual_content_involving_minors':
    'Contenu à caractère sexuel impliquant des mineurs',
  /**
   * ⚠️ SAFETY — human review before launch, and the one I am least sure of.
   * `Harcèlement` is certain. `intimidation` is what the French versions of the
   * big platforms use for "bullying", but in France the everyday word for
   * bullying is `harcèlement` itself (`harcèlement scolaire`), so the pair can
   * read as one idea said twice rather than as two reasons. `Harcèlement`
   * alone is the fallback if review agrees.
   */
  'misc.report_reason_harassment': 'Harcèlement ou intimidation',
  /**
   * ⚠️ SAFETY — human review before launch.
   * `Discours haineux` is the platform wording. French law says `provocation à
   * la haine`, which names a charge, not a report reason.
   */
  'misc.report_reason_hate': 'Discours haineux',
  /**
   * ⚠️ SAFETY — human review before launch.
   * `Menaces de violence` reads as the threat itself. `Violence ou menaces`
   * would widen the reason to depicted violence, which this product allows by
   * design (fantasy violence is in the content descriptors), so it is narrower
   * on purpose.
   */
  'misc.report_reason_violence_threat': 'Menaces de violence',
  /**
   * ⚠️ SAFETY — human review before launch.
   * `Automutilation` is the exact French and is not negotiable. What is: French
   * flows almost always pair it with suicide (`Suicide ou automutilation`). The
   * English says only `Self-harm`, and adding `suicide` is an addition the
   * source did not make — but on a safety surface that addition may be the
   * right call, so it is flagged here rather than made unilaterally.
   */
  'misc.report_reason_self_harm': 'Automutilation',
  /**
   * Plain language, as the English is: the legal register would be `Atteinte au
   * droit d’auteur`. `œuvre` is the French copyright word for a created work,
   * and the ligature is mandatory — `oeuvre` is a spelling error.
   */
  'misc.report_reason_ip_violation': 'Copie l’œuvre de quelqu’un d’autre',
  /**
   * ⚠️ SAFETY — human review before launch.
   * Kept as a verb phrase so the list reads as one list with `Copie l’œuvre…`.
   * The nominal French platforms use is `Usurpation d’identité`, which is also
   * the legal term; it is the stronger choice if the list is ever made nominal.
   */
  'misc.report_reason_impersonation': 'Se fait passer pour une personne réelle',
  /**
   * Not a safety reason — a quality one. `Cassé` is the calque and means
   * snapped in two; the French for a world that does not work is that it does
   * not work.
   */
  'misc.report_reason_broken': 'Ne fonctionne pas ou se contredit',
  /** `Autre chose` keeps the English's warmth. A form would say `Autre`. */
  'misc.report_reason_other': 'Autre chose',
  /** `facultatif` is the French UI word. `optionnel` is the calque. */
  'misc.report_details_placeholder': 'Autre chose à nous dire ? (facultatif)',
  /** VoiceOver label for the free-text box. */
  'misc.report_details_label': 'Détails supplémentaires',
  /**
   * A switch. `mes recommandations` is the personalised feed on Découvrir, and
   * the first person is the player's own voice, which is a French UI
   * convention in its own right and sidesteps the register question entirely.
   */
  'misc.report_also_hide': 'Masquer aussi ce contenu dans mes recommandations',
  /** `Soumettre` is the calque; a French form `envoie` a `signalement`. */
  'misc.submit_report': 'Envoyer le signalement',
  'misc.submitting': 'Envoi…',
  /**
   * `Merci de nous l’avoir dit.` — `l’` is the fact, invariable, so there is no
   * agreement to guess. `Merci de nous l’avoir signalé` would have to agree
   * with whatever was reported. Warm, and the period is there because it is a
   * full sentence.
   */
  'misc.report_thanks_title': 'Merci de nous l’avoir dit.',
  /**
   * `dossier` is the French for a moderation case — a support reference, not a
   * court case and not a box. `historique des signalements` is lower-cased
   * inside the sentence on purpose: it is the same words as the profile row
   * `Historique des signalements`, and in French a UI label's initial capital
   * is positional, so quoting it mid-sentence keeps the words and drops the
   * capital. That is French sentence case working, not a mismatch.
   */
  'misc.report_thanks_body':
    'Un modérateur va l’examiner. Ta référence de dossier est {caseRef} — tu la retrouveras dans l’historique des signalements, sur ton profil.',

  /* ---------------------------------------------------------------------- */
  /* SF-02 — report history                                                 */
  /* ---------------------------------------------------------------------- */

  /**
   * 27 characters against the English 14 — the worst measured inflation in the
   * profile list (UI_AUDIT §2.6). There is no shorter honest French: a
   * `signalement` is what this product files, and `Mes signalements` would
   * drop the history, which is the point of the screen.
   */
  'misc.report_history_title': 'Historique des signalements',
  'misc.report_history_empty_title': 'Aucun signalement',
  'misc.report_history_empty_body':
    'Les signalements que tu envoies apparaîtront ici, avec leur référence de dossier.',
  /** One row. `Dossier`, matching `misc.report_thanks_body`. */
  'misc.report_case_line': 'Dossier {reference} · {date}',

  /* ---------------------------------------------------------------------- */
  /* CR-01 — the creator teaser                                             */
  /* ---------------------------------------------------------------------- */

  /** An activity, so an infinitive — French titles a screen the way Apple does. */
  'misc.create_title': 'Créer des mondes',
  'misc.create_coming_title': 'L’éditeur de mondes arrive',
  'misc.create_coming_body':
    'Tu construiras tes mondes avec des outils structurés, pas en collant un prompt géant : des personnages qui ont de vraies motivations, des lieux reliés entre eux, des quêtes avec de vraies conditions de victoire et des systèmes que le moteur fait respecter.',
  'misc.create_credits_body':
    'Chaque monde que tu crées tourne sur le même moteur déterministe que les mondes officiels, avec des crédits gratuits et illimités pendant que tu le testes.',
  /** French says it in the present. The future here would be English grammar. */
  'misc.create_what_you_define': 'Ce que tu définis',
  'misc.create_concept': 'Concept',
  /**
   * `the fantasy` is `la promesse` here and `Le rôle du joueur` below. It is
   * never `le fantasme`: in French that word is first and mainly sexual, and
   * this is a 13+ product.
   */
  'misc.create_concept_body': 'Le titre, la promesse, et pour qui c’est.',
  'misc.create_player_fantasy': 'Le rôle du joueur',
  /**
   * `on` rather than `il` — the player being described has no gender the app
   * knows, and `on` is how French says this anyway.
   */
  'misc.create_player_fantasy_body': 'Qui on est en arrivant, et ce qu’on peut faire.',
  'misc.create_world_rules': 'Règles du monde',
  /** `le canon` is the frozen word; `canon dur` for "hard canon" is not French. */
  'misc.create_world_rules_body': 'Ce qui est canon et que l’histoire ne peut jamais contredire.',
  /** `Systèmes` alone is ambiguous in French UI (systems as in settings). */
  'misc.create_systems': 'Systèmes de jeu',
  'misc.create_systems_body':
    'Les attributs, les compétences, les ressources et ce qui se passe quand on perd.',
  /** The frozen word for the cast, taken together. Never `le casting`. */
  'misc.create_cast': 'Personnages',
  /** `limites` is what a character will never do — `frontières` would be a map. */
  'misc.create_cast_body': 'Traits, motivations, limites, secrets et emplois du temps.',
  'misc.create_locations': 'Lieux',
  'misc.create_locations_body':
    'Une carte où les lieux se rejoignent, avec des temps de trajet et des verrous.',
  'misc.create_progression': 'Progression',
  /**
   * `des prédicats, pas au feeling` keeps the English joke — the engine word
   * against the vague one — and `au feeling` is real spoken French, not a
   * borrowing invented for this string.
   */
  'misc.create_progression_body': 'Des quêtes avec des prédicats, pas au feeling.',
  /**
   * The opening passage. `Incipit` is the exact French literary term and is
   * exactly the wrong register for a UI label — RULE 7, simple in the UI.
   */
  'misc.create_opening': 'Ouverture',
  'misc.create_opening_body': 'De 50 à 150 mots qui mènent à une décision.',
} as const;
