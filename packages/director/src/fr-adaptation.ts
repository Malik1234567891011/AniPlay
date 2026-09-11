/**
 * The instructions every French world adaptation is written under.
 *
 * One file, imported by the batch script, so twenty-three worlds cannot
 * independently invent three French versions of the same idea. It is not a
 * translation brief — it is a writing brief, and the difference is the whole
 * project.
 *
 * Split by tier because the source contains genuinely different kinds of
 * content and giving them identical treatment is how a localization takes a
 * year and still reads translated:
 *
 *   **A** — the wording *is* the product. Rewritten in French.
 *   **B** — the model needs the meaning; the phrasing shapes no voice.
 *   **C** — never reaches here.
 */

/**
 * What French this is, before anything else.
 *
 * Shared by both tiers because a register mistake is a register mistake
 * wherever it happens.
 */
export const FR_HOUSE_STYLE = [
  'Tu écris en français de France, pour des joueurs entre quinze et trente ans.',
  '',
  'TYPOGRAPHIE — apostrophe courbe ’ toujours. Espace insécable avant ? ! ; : et à',
  'l’intérieur des guillemets « ». Jamais de guillemets droits. Jamais de tiret cadratin',
  'à l’anglaise pour une incise : le français emploie la virgule, la parenthèse ou le',
  'tiret demi-cadratin.',
  '',
  'PAS DE POINT MÉDIAN. Ni « prêt·e », ni « prêt(e) », ni « prêt.e ». C’est un registre',
  'administratif, c’est interdit dans les documents scolaires par circulaire, et le produit',
  'lit ses textes à voix haute. Si tu ne sais pas accorder, tourne la phrase : le français',
  'a toujours une sortie, et le point médian est l’aveu qu’on ne l’a pas cherchée. Cela vaut',
  'aussi pour un personnage non binaire — « iel » se décrit sans point médian.',
  '',
  'REGISTRE — c’est du français parlé quand quelqu’un parle. Le « ne » de négation tombe',
  'à l’oral : « je sais pas », « t’as vu », « faut qu’on parle ». Le garder partout est la',
  'signature d’un texte traduit. En narration, le « ne » reste.',
  '',
  'ANGLICISMES — garde ceux que les Français emploient vraiment (un mail, un job, le week-end,',
  'cool, un crush, spoiler) et refuse ceux qu’ils n’emploient pas (« réaliser » pour se rendre',
  'compte, « supporter » pour soutenir, « éventuellement » pour finalement, « opportunité »',
  'pour occasion).',
  '',
  'PAS DE FAUX ANCIEN FRANÇAIS. Un monde médiéval parle un français moderne et sobre, pas',
  '« moult » et « point n’ai-je ». Sauf si le monde demande explicitement le contraire.',
  '',
  'PAS DE FRANÇAIS DE MANUEL. « Je suis en train de me demander si je ne devrais pas »',
  'est grammatical et personne ne parle comme ça.',
].join('\n');

/**
 * Tier A: the wording is the product.
 *
 * The instruction that matters most is the last one. A French sentence that
 * preserves English word order, English rhythm and English imagery is not a
 * French sentence — it is an English sentence wearing French words, and a
 * French reader spots it in a paragraph.
 */
export const FR_TIER_A = [
  FR_HOUSE_STYLE,
  '',
  '--- CE TEXTE-CI ---',
  '',
  'Ce texte est du texte de STYLE : soit le joueur le lit, soit il conditionne la façon',
  'dont le jeu écrit en français. Sa formulation *est* le produit.',
  '',
  'NE TRADUIS PAS. Lis l’intention, puis écris ce qu’un auteur français aurait écrit si',
  'l’anglais n’avait jamais existé.',
  '',
  'Tu dois conserver : le sens, la fonction dans l’histoire, l’information, la personnalité,',
  'l’intention émotionnelle, et l’identité du personnage.',
  '',
  'Tu es libre de changer : l’ordre des mots, la longueur des phrases, les images, la',
  'structure d’une blague, le rythme, la ponctuation, le niveau de langue.',
  '',
  'EXEMPLE DU PIÈGE :',
  'Anglais   : "Quick, warm, deflecting. Says your name at the start of a sentence when',
  '            they are about to be serious, which is the tell."',
  'Traduit   : « Rapide, chaleureux, esquivant. Dit votre nom au début d’une phrase quand',
  '            il est sur le point d’être sérieux, ce qui est le signe. »  ← anglais déguisé',
  'Écrit     : « Rapide, chaleureux, esquive. Dit ton prénom en début de phrase juste avant',
  '            de dire quelque chose de sérieux — c’est le signe. »',
  '',
  'La différence n’est pas le vocabulaire. C’est que la deuxième version a le rythme du',
  'français et pas celui de l’anglais.',
  '',
  'LE JOUEUR N’A PAS DE GENRE ICI. Un champ qui décrit le joueur — un archétype, son style de',
  'jeu, ce qu’il sait faire — est écrit avant qu’on sache qui il est. Tu ne peux donc accorder',
  'avec personne, et « Patient·e » est interdit comme partout ailleurs.',
  '',
  'Emploie un nom : « Patience » plutôt que « Patient ». Ou une tournure sans accord :',
  '« Sait attendre », « Ne se fait pas remarquer », « Encaisse sans broncher ». C’est souvent',
  'meilleur que l’adjectif de toute façon — « Physiquement peu impressionnant·e » devient',
  '« Ne paie pas de mine », qui est du français et pas un compromis.',
  '',
  'VOIX — si tu adaptes un `speechStyle`, un `voiceSample` ou un `socialStyle`, c’est la',
  'voix d’une personne précise. Deux personnages du même monde ne doivent pas sortir de ta',
  'plume en parlant pareil. Regarde leur âge, leur métier, leur milieu, leur rapport au',
  'joueur, et écris quelqu’un qu’on reconnaîtrait les yeux fermés.',
].join('\n');

/**
 * Tier B: the meaning, accurately, in unfussy French.
 *
 * The explicit permission not to polish is doing real work here. Without it a
 * model spends its effort making a hidden factual paragraph beautiful, which
 * costs time, costs money, and changes nothing a player will ever experience.
 */
export const FR_TIER_B = [
  FR_HOUSE_STYLE,
  '',
  '--- CE TEXTE-CI ---',
  '',
  'Ce texte est du texte de FAIT : le modèle doit savoir ce qu’il veut dire. Le joueur ne le',
  'lit pas, et sa formulation ne détermine la voix de personne.',
  '',
  'Ce qu’il faut : le sens exact, les relations de cause à effet, la chronologie, les',
  'contraintes, les secrets, les conditions. Rien ne se perd, rien ne s’ajoute, rien ne',
  's’adoucit.',
  '',
  'Ce qu’il ne faut pas : y passer du temps. Ce n’est pas de la littérature et ça n’a pas',
  'à en être. Du français juste, idiomatique, direct.',
  '',
  'Évite quand même : les calques, les chaînes de noms à l’anglaise (« la stratégie de',
  'gestion de crise du clan » plutôt que « comment le clan gère une crise »), et le français',
  'administratif si la source ne le demande pas.',
].join('\n');

/**
 * Terms that must mean the same thing in every world.
 *
 * Twenty-three worlds adapted separately will otherwise invent three French
 * words for the same concept, and a player who learns one shelf's vocabulary
 * will not recognise the next one's.
 *
 * `KEEP` is a decision, not an omission: a proper noun or an established
 * loanword that French players already use is left alone on purpose.
 */
export const FR_GLOSSARY: ReadonlyArray<{
  readonly en: string;
  readonly fr: string;
  readonly decision: 'KEEP' | 'TRANSLATE' | 'ADAPT';
  readonly note?: string;
}> = [
  // --- System vocabulary -------------------------------------------------
  { en: 'turn', fr: 'tour', decision: 'TRANSLATE', note: 'jamais « virage », jamais « tour de rôle »' },
  { en: 'world', fr: 'monde', decision: 'TRANSLATE' },
  { en: 'session / run', fr: 'partie', decision: 'ADAPT', note: '« session » en français est un examen ou le parlement' },
  { en: 'credits', fr: 'crédits', decision: 'TRANSLATE' },
  { en: 'ending', fr: 'fin', decision: 'TRANSLATE', note: '« une fin », pas « un ending », pas « une finale »' },
  { en: 'save (a story)', fr: 'enregistrer', decision: 'TRANSLATE' },
  { en: 'like', fr: 'j’aime', decision: 'TRANSLATE', note: 'invariable — « 3 j’aime », jamais « j’aimes »' },
  { en: 'spoiler', fr: 'spoiler', decision: 'KEEP', note: 'les joueurs français disent spoiler' },
  { en: 'badge', fr: 'badge', decision: 'KEEP' },

  // --- Play --------------------------------------------------------------
  { en: 'check', fr: 'jet', decision: 'ADAPT', note: 'le mot du jeu de rôle français' },
  { en: 'ability', fr: 'capacité', decision: 'TRANSLATE', note: 'pas « habileté », pas « abilité »' },
  { en: 'skill', fr: 'compétence', decision: 'TRANSLATE' },
  { en: 'quest', fr: 'quête', decision: 'TRANSLATE' },
  { en: 'faction', fr: 'faction', decision: 'KEEP' },
  { en: 'rank', fr: 'rang', decision: 'TRANSLATE' },
  { en: 'party / crew', fr: 'équipe', decision: 'ADAPT', note: '« groupe » en fantasy, « équipe » ailleurs' },

  // --- The relationship ladder, pinned as invariable nouns ---------------
  //
  // A French adjective agrees with the person, and `CharacterDef` carries no
  // gender — so `Dévoué` would be a coin flip on every NPC. Nouns do not agree.
  { en: 'Devotion', fr: 'Dévouement', decision: 'ADAPT', note: 'nom, pas adjectif — voir engine/locale.spec' },
  { en: 'Fear', fr: 'Crainte', decision: 'ADAPT' },
  { en: 'Trust', fr: 'Confiance', decision: 'ADAPT' },
  { en: 'Complicated', fr: 'C’est compliqué', decision: 'ADAPT' },
  { en: 'Wary', fr: 'Sur ses gardes', decision: 'ADAPT' },
  { en: 'Rival', fr: 'Rivalité', decision: 'ADAPT' },
  { en: 'Warm', fr: 'Sympathie', decision: 'ADAPT' },
  { en: 'Familiar', fr: 'Familiarité', decision: 'ADAPT' },

  // --- Genre vocabulary --------------------------------------------------
  { en: 'shinobi / ninja', fr: 'shinobi', decision: 'KEEP', note: 'le vocabulaire anime passe tel quel en français' },
  { en: 'clan', fr: 'clan', decision: 'KEEP' },
  { en: 'village (Konoha-style)', fr: 'village', decision: 'TRANSLATE' },
  { en: 'guild', fr: 'guilde', decision: 'TRANSLATE' },
  { en: 'academy', fr: 'académie', decision: 'TRANSLATE' },
  { en: 'beastfolk', fr: 'bêtes-gens', decision: 'ADAPT', note: 'inventé, et il doit rester le même partout' },
  { en: 'service (restaurant)', fr: 'service', decision: 'TRANSLATE', note: 'le mot du métier' },
  { en: 'shift', fr: 'service', decision: 'ADAPT', note: 'en restauration ; « poste » ailleurs' },
];

/** The glossary as a line the model can read. */
export function glossaryBrief(): string {
  return [
    'GLOSSAIRE — ces termes ont déjà été tranchés. Emploie exactement ceux-ci.',
    '',
    ...FR_GLOSSARY.map(
      (entry) =>
        `  ${entry.en.padEnd(24)} → ${entry.fr}${entry.note ? `   (${entry.note})` : ''}`,
    ),
  ].join('\n');
}
