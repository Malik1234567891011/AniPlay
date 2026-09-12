import { registerWorldText } from '@plotbreak/contracts';

/**
 * Nine Weeks, in French.
 *
 * The pilot world for step 12: no combat, the richest tu/vous arc in the
 * catalogue, and a cast small enough that every voice can be written properly
 * rather than approximated.
 *
 * **Written in French, not rendered from the English.** `STORY_AUDIT.md` §2 is
 * the authority and the reason: the premise reaches the model verbatim as
 * `worldRules`, `speechStyle` decides whether the cast sounds French at all,
 * and `voiceSamples` are the single highest-value field per character — a
 * translated voice sample is a translated voice, forever, in every line that
 * character ever speaks.
 *
 * ## Decisions worth stating
 *
 * **The register is `tu` throughout, and that is a fact about this world rather
 * than a default.** These are people between about nineteen and twenty-five
 * sharing six cabins and a shift rota for a summer. French students working a
 * season tutoient each other within the hour; `vous` between them would read as
 * a translation of an English text that has no way to mark the difference.
 * Nadia is the exception the world earns — see her `addressMode`.
 *
 * **`Longhouse` stays.** It is the name of the hotel. Names never travel
 * (§2), and `la Grande Maison` would be a different building in a different
 * country.
 *
 * **The season is `la saison`, never `neuf semaines` as a label.** French
 * seasonal work has its own word and its own weight; using the count where the
 * word exists is the calque.
 */
registerWorldText('fr', {
  storyId: 'story_nine_weeks',
  text: {
    hook: 'Tu reviens faire la même saison. Juno aussi. Et Juno n’est pas revenu seul.',
    fantasyLabel: 'Tu es revenu. Juno aussi.',

    premise: [
      'La ville au bord de ce lac n’existe qu’une dizaine de semaines par an. Le Longhouse, l’hôtel qui la fait tenir, embauche une vingtaine de personnes chaque été pour la cuisine, le bar et les bateaux, et les loge toutes dans six cabanons derrière le parking.',
      '',
      'Tu y as travaillé l’été dernier. Juno aussi, et pendant presque toute la saison vous étiez le sujet dont tout le monde avait un avis à donner. La dernière semaine, Juno a quitté la saison avec une semaine d’avance, sans dire au revoir, et vous ne vous êtes pas reparlé depuis.',
      '',
      'Vous revenez tous les deux. Juno descend du bus cet après-midi avec Teo, qui est gentil, drôle, facile à aimer, et qui ne sait absolument rien de l’été dernier.',
      '',
      'La saison dure neuf semaines. Vous partagez une cuisine, une salle de bains et un planning avec tous ces gens, et à la troisième semaine tout le monde sait tout sur tout le monde.',
      '',
      'Tu as donc neuf semaines pour comprendre ce que tu veux vraiment, et si tu acceptes que ça coûte quelque chose à quelqu’un d’autre. Certaines de ces personnes seront encore dans ta vie en octobre. Lesquelles, ce n’est pas décidé.',
    ].join('\n'),

    creatorNote:
      'Personne ici n’attend d’être choisi. Chacun a ses gens, ses limites, et son souvenir de la façon dont tu t’es comporté en semaine deux. Tu peux finir la saison avec quelqu’un, avec un ami que tu n’avais pas vu venir, ou seul — et le dernier n’est pas la mauvaise fin.',

    // An instruction *to the model*, so it is written as one, in French.
    'rules.toneGuide':
      'Chaleureux, drôle, un peu coup de soleil. Des services qui n’en finissent pas, du vin pas cher sur les marches de derrière, et tout le monde qui a vingt et un ans en même temps. Les sentiments sont énormes et personne ne sait les dire. Pas de méchants, pas de mélodrame : juste des gens qui veulent des choses incompatibles dans un endroit très petit. Tout le monde se tutoie, sauf indication contraire sur le personnage.',

    opening: [
      'Le bus te dépose en haut de la route à quatre heures vingt, et tu descends ton sac en passant devant le parking, comme l’an dernier.',
      '',
      'Nadia est sur les marches du cabanon avec le planning. Elle lève les yeux et dit ton prénom d’une façon qui veut dire qu’elle savait déjà que tu venais, et qu’elle y a déjà réfléchi.',
      '',
      'Derrière elle, deux personnes sortent des sacs du coffre d’une voiture. L’une des deux, c’est Juno. L’autre rit de quelque chose que Juno vient de dire, la main posée à plat au creux de son dos.',
      '',
      'Juno lève les yeux et te voit. Pendant deux secondes, ni l’un ni l’autre ne fait quoi que ce soit.',
      '',
      '« Bon », dit Nadia, sans relever la tête. « Cabanon quatre. Tu prends à six heures. »',
    ].join('\n'),

    openingSuggestions: [
      'Je porte mon sac au cabanon quatre et je ne dis rien à personne, pas tout de suite.',
      'Je vais droit vers la personne qui est avec Juno et je tends la main. « On ne se connaît pas, je crois. Je viens d’arriver. »',
      'Je m’assois à côté de Nadia comme si de rien n’était. « Vous êtes là depuis combien de temps ? J’essaie de voir à quel point je suis à la bourre. »',
    ],

    // --- Juno -------------------------------------------------------------
    'characters.juno.role': 'Au bar, deuxième saison',
    'characters.juno.cardBlurb':
      'La personne avec qui tu étais l’été dernier, et qui a quitté la saison une semaine plus tôt sans dire au revoir. Iel est là, et iel est avec Teo.',
    'characters.juno.publicTraits': ['Drôle', 'Jamais en place', 'Ne sait pas finir les choses'],
    'characters.juno.hiddenDrives': [
      'Sa mère est tombée malade en septembre dernier, iel a pris le train le soir même, et iel a écrit quatre pages qu’iel n’a jamais envoyées.',
      'Iel revient un peu pour le travail et surtout pour savoir ce qui va se passer.',
    ],
    'characters.juno.values': [
      'Ne pas mentir à Teo',
      'Les gens de l’été dernier',
      'Être quelque part où on ne lui demande rien',
    ],
    'characters.juno.fears': [
      'Être la personne qui fait ça aux gens',
      'Devoir choisir devant tout le monde',
    ],
    'characters.juno.socialStyle':
      'Esquive avec une blague, deux fois, puis répond pour de vrai si tu es toujours là.',
    'characters.juno.boundaries': [
      'Ne sera le secret de personne',
      'N’humiliera pas Teo, quoi qu’il arrive',
    ],
    'characters.juno.goals': [
      'Traverser la saison sans faire exploser l’été de quelqu’un d’autre',
      'Dire ce qui s’est passé en septembre',
    ],
    // The tell, kept: saying your name before the serious sentence works the
    // same way in French and is the thing that makes them recognisable.
    'characters.juno.speechStyle':
      'Rapide, chaleureux, esquive. Dit ton prénom en début de phrase juste avant de dire quelque chose de sérieux — c’est le signe.',
    'characters.juno.topics': [
      'septembre dernier',
      'Teo',
      'pourquoi iel est là',
      'le bar',
      'les gens de l’an dernier',
    ],

    // --- Teo --------------------------------------------------------------
    'characters.teo.role': 'En cuisine, première saison',
    'characters.teo.cardBlurb':
      'Le copain de Juno. Il est gentil, il est drôle, il ne sait rien, et il n’a rien fait de mal.',
    'characters.teo.speechStyle':
      'Franc et sans détour. Pose des vraies questions et attend la réponse au lieu de meubler.',

    // --- Nadia ------------------------------------------------------------
    'characters.nadia.role': 'Responsable de salle, quatrième saison',
    'characters.nadia.cardBlurb':
      'Elle tient le planning et elle a déjà vu cet été-là se produire trois fois. Elle ne sauvera personne.',
    'characters.nadia.speechStyle':
      'Phrases courtes, ton égal. Dit la chose vraie une seule fois et passe à autre chose.',

    // --- Cass -------------------------------------------------------------
    'characters.cass.role': 'Au bar, troisième saison',
    'characters.cass.cardBlurb':
      'Iel sait pourquoi Juno a disparu. Iel ne te l’a jamais dit, et ça fait un an que ça lui reste en travers.',
    'characters.cass.speechStyle':
      'Ironique, sur la réserve. Change de sujet d’un cran quand ça devient précis.',

    /*
     * Places.
     *
     * `STORY_AUDIT.md` §2 says location names never travel, and that rule was
     * written for invented proper nouns — Blackwake, the Tidewall, the Ninth
     * Archive. These are not that. `The Back Steps`, `The Dock`, `The Road Into
     * Town` are ordinary descriptions with a definite article, and leaving them
     * in English puts `place: The Staff Cabins` in a French HUD, under a French
     * clock, beside French prose. That is the single most visible untranslated
     * thing in a French session.
     *
     * `Longhouse` stays, because that one genuinely is a name — it is what the
     * hotel is called, and `la Grande Maison` would be a different building.
     */
    'locations.staff_cabins.name': 'Les cabanons',
    'locations.staff_cabins.shortName': 'Cabanons',
    'locations.kitchen.name': 'La cuisine',
    'locations.kitchen.shortName': 'Cuisine',
    'locations.longhouse_bar.name': 'Le bar du Longhouse',
    'locations.longhouse_bar.shortName': 'Bar',
    'locations.back_steps.name': 'Les marches de derrière',
    'locations.back_steps.shortName': 'Marches',
    'locations.the_dock.name': 'Le ponton',
    'locations.the_dock.shortName': 'Ponton',
    'locations.town_road.name': 'La route du village',
    'locations.town_road.shortName': 'Route',
    'locations.the_point.name': 'La pointe',
    'locations.the_point.shortName': 'Pointe',
  },
});
