import { registerWorldText } from '@aniplay/contracts';

/**
 * Last Five, in French.
 *
 * Written under `packages/director/src/fr-adaptation.ts` — the shared house
 * style, the glossary, and the tier brief. Tier A was authored (the wording is
 * the product); tier B was adapted for meaning.
 *
 * `sourceHash` on each entry is the English it was written from. When English
 * moves, `npm run fr:stale` says which of these now describes a world that no
 * longer exists.
 */
registerWorldText('fr', {
  storyId: "story_last_five",
  text: {
    // A · 8a39bd60a0c8
    "title": "Last Five",
    // A · 9ae612c79d10
    "fantasyLabel": "Reconstruis l’équipe. Battez les cinq qui sont partis.",
    // A · ffd207d4756f
    "hook": "Les cinq titulaires de Kosei sont partis au printemps dernier. Le collège ferme le programme en mars, sauf si ce qu’il en reste atteint les Nationals.",
    // A · 9a596677c14a
    "premise": "Kosei High a remporté trois titres consécutifs au niveau préfectoral. Puis, au printemps dernier, les cinq titulaires ont tous changé d’école, chacun dans un établissement différent, sans jamais qu’on sache pourquoi.\n\nCe qu’il restait a fini avec un bilan de 2 victoires pour 17 défaites.\n\nEn août, le conseil a voté la fin du programme de basket à la fin de l’année scolaire. Une condition a été ajoutée, en guise de blague : si Kosei atteint les Nationals, le programme continue. Sinon, tous ceux qui restent perdent la seule chose qu’ils font.\n\nL’équipe compte six joueurs. L’un d’eux est le capitaine en troisième année, qui n’a jamais commencé un match s’il ne devait pas. L’un est un meneur de première année qui pèse à peine plus qu’une serviette mouillée. Un autre n’a jamais joué au basket de sa vie et était, jusqu’en septembre, nageur.\n\nTu es le septième.\n\nPersonne ne t’a vu jouer. L’entraîneur a quarante minutes d’entraînement pour décider si c’est une bonne chose.\n\nEt toutes les routes vers les Nationals passent par un des cinq qui sont partis.",
    // A · 6ffbd72627e7
    "mechanicsChips": ["Ton style vient du jeu","Les rivaux te repèrent","Chrono réel du match","Gagne tes minutes","Cinq problèmes différents"],
    // A · a3c70b4fdfea
    "creatorNote": "Tu ne choisis pas de poste. Tu en deviens un, grâce à ce que tu essaies vraiment sur le terrain. Et plus tu es bon sur un point, plus l’adversaire suivant s’acharne pour te l’enlever — tout le match tourne autour de comment tu réagis.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · 2eb28782d9a8
    "rules.hardCanon": ["Les cinq titulaires de Kosei ont tous été transférés dans le même mois au printemps dernier, dans cinq écoles différentes.","Le conseil ferme le programme à la fin de cette année scolaire sauf si Kosei atteint les Nationaux.","L’histoire officielle dit qu’ils ont lâché l’école. Cette histoire est fausse.","L’entraîneur Denda, qui dirigeait le programme avant, a démissionné le même mois et personne ne prononce son nom.","Il n’y a rien de surnaturel dans ce monde. Tous ici sont des ados doués au basket."],
    // A · f4d0e356064d
    "rules.toneGuide": "De la sueur, des parquets qui crissent, et des gamins de seize ans. Le basket se décrit en langage simple et physique, pour que quelqu’un qui n’a jamais regardé un match comprenne — où la balle est allée, qui est arrivé le premier, qui a été en retard. On le souligne quand ça compte : une belle action est une belle action. Hors du terrain, c’est petit et précis — distributeurs, bus, groupes de discussion, examens pour lesquels personne n’a révisé. Jamais sentimental sur la victoire. Perdre, c’est courant et ce n’est pas la fin de quoi que ce soit.",
    // B · 41483b645efc
    "skills.handle.name": "Dribble",
    // B · 7ce3b6387340
    "skills.handle.attribute": "agilité",
    // B · 088b1d6a06fa
    "skills.handle.description": "Garder la balle collée à soi avec quelqu’un dans la poitrine.",
    // B · a22a870f1caa
    "skills.shooting.name": "Tir",
    // B · 7ce3b6387340
    "skills.shooting.attribute": "agilité",
    // B · 3c44054e5288
    "skills.shooting.description": "Mécanique répétée avec une main dans la figure.",
    // B · 19c8ccc88775
    "skills.finishing.name": "Finition",
    // B · 97081b4b4792
    "skills.finishing.attribute": "puissance",
    // B · b9fe76235f36
    "skills.finishing.description": "Faire rentrer le ballon dans la peinture, malgré le contact.",
    // B · f5ef5bea5a46
    "skills.passing.name": "Passe",
    // B · a8c1fa8269c3
    "skills.passing.attribute": "esprit",
    // B · 907224909930
    "skills.passing.description": "Mettre le ballon là où quelqu’un va être.",
    // B · 3950f9960648
    "skills.defense.name": "Défense",
    // B · 4c84c2c842d0
    "skills.defense.attribute": "détermination",
    // B · a2e47c1ce2da
    "skills.defense.description": "Rester devant. En vouloir plus qu’eux.",
    // B · 88b61be9bf3d
    "skills.rebounding.name": "Rebond",
    // B · 97081b4b4792
    "skills.rebounding.attribute": "puissance",
    // B · ee4eacec3b8b
    "skills.rebounding.description": "Savoir d’où ça va sortir et arriver le premier.",
    // B · 7e59a90bca3b
    "skills.court_iq.name": "Q.I. du terrain",
    // B · a8c1fa8269c3
    "skills.court_iq.attribute": "esprit",
    // B · 450f926f2add
    "skills.court_iq.description": "Lire ce que la défense a décidé avant qu’elle ait fini de décider.",
    // B · 7b20ee3044ae
    "skills.conditioning.name": "Endurance",
    // B · 4c84c2c842d0
    "skills.conditioning.attribute": "détermination",
    // B · b6acef704f45
    "skills.conditioning.description": "Être le même joueur en quatrième quart-temps qu’au premier.",
    // B · a97bb1d68ec7
    "skills.leadership.name": "Leadership",
    // B · cfb7a15645c3
    "skills.leadership.attribute": "présence",
    // B · 35f76cee05ef
    "skills.leadership.description": "Se faire écouter dans un regroupement.",
    // B · d7894ae5cdfa
    "resources.legs.name": "Jambes",
    // B · 34e8ec1ac388
    "resources.legs.polarity": "BON ÉLEVÉ",
    // B · 909e9a6081a5
    "resources.legs.zeroStateConsequence": "Parties. Ton tir est court et tout le monde le voit.",
    // B · d492a7650052
    "resources.legs.color": "#E8B44A",
    // B · 96a5ce654496
    "resources.minutes.name": "Minutes",
    // B · 34e8ec1ac388
    "resources.minutes.polarity": "BON ÉLEVÉ",
    // B · 931b1ad5b1f6
    "resources.minutes.zeroStateConsequence": "Tu ne quittes pas le banc.",
    // B · c53b2f634060
    "resources.minutes.color": "#7C6BFF",
    // B · 0bbe82f1aa1c
    "resources.chemistry.name": "Chimie",
    // B · 34e8ec1ac388
    "resources.chemistry.polarity": "BON ÉLEVÉ",
    // B · 63c21a8ed342
    "resources.chemistry.zeroStateConsequence": "Cinq personnes sur le terrain et pas d’équipe.",
    // B · 4cb44ccbfac8
    "resources.chemistry.color": "#7A9E7E",
    // A · 0c668c01974f
    "items.kosei_reversible.name": "Un Kosei Réversible",
    // B · 4bff0469c29c
    "items.kosei_reversible.tags": ["kit"],
    // B · d55525b3f16c
    "items.kosei_reversible.description": "Maillot d’entraînement, blanc d’un côté, marine de l’autre. Numéro 24, parce que personne n’en voulait.",
    // B · 81bc35fb171c
    "items.kosei_reversible.icon": "jersey",
    // A · 8bca75e88831
    "items.nori_tape.name": "La Coupe de Nori",
    // B · 11c50ece65b4
    "items.nori_tape.tags": ["quête","film"],
    // B · b7f1b086bf25
    "items.nori_tape.description": "Onze minutes des tendances de quelqu’un d’autre, coupées de quatre heures par un seize ans à 2h du matin.",
    // B · e1714cb3fd3a
    "items.nori_tape.loreText": "Nori fait ça pour tout le monde dans l’équipe et personne ne lui a jamais demandé.",
    // B · db2add652d8e
    "items.nori_tape.icon": "tape",
    // A · 7946907d9823
    "items.denda_report.name": "Le Rapport d’Incident",
    // B · 061625d9bd60
    "items.denda_report.tags": ["quête","document"],
    // B · ded66dc9791a
    "items.denda_report.description": "Quatre pages, déposées en mars, signées par un en deuxième année. La réponse de l’école tient en un paragraphe.",
    // B · 8143e9e47c18
    "items.denda_report.icon": "papers",
    // A · 0e8ade13f58c
    "items.good_shoes.name": "Chaussures Qui Vont Bien",
    // B · 4bff0469c29c
    "items.good_shoes.tags": ["kit"],
    // B · 4c33748a60dc
    "items.good_shoes.equipSlot": "pieds",
    // B · 0fc034c8e29f
    "items.good_shoes.description": "Ta première paire qui n’était pas la première de quelqu’un d’autre.",
    // B · d257e0ce2dc3
    "items.good_shoes.icon": "shoe",
    // A · 56daa95e1fe9
    "items.brace.name": "Une Attelle de Cheville",
    // B · c1d4f3caf241
    "items.brace.tags": ["kit","médical"],
    // B · 22ffc7e32800
    "items.brace.equipSlot": "cheville",
    // B · 1b7fbf41e280
    "items.brace.description": "Moche, chaud, et la raison pour laquelle tu joues encore en février.",
    // B · b225fad1e334
    "items.brace.icon": "brace",
    // A · 29cc5c374238
    "items.energy_drink.name": "Un Truc du Distributeur",
    // B · 56e08362805f
    "items.energy_drink.tags": ["consommable"],
    // B · 9f1abb1950b0
    "items.energy_drink.description": "Bleu. Ça a le goût d’une couleur. Ça marche.",
    // B · bd80b3bd91ef
    "items.energy_drink.icon": "can",
    // A · fc22216dca82
    "abilities.hard_drive.name": "Descendre à Fond",
    // B · 9eb8e93adb79
    "abilities.hard_drive.tags": ["attaque"],
    // B · cedfc0282552
    "abilities.hard_drive.description": "Passe ton épaule devant la leur et arrive au panier avant que l’aide n’arrive.",
    // B · 39d896e20aec
    "abilities.hard_drive.targetRule": "SINGLE",
    // B · 7ce3b6387340
    "abilities.hard_drive.check.attribute": "agilité",
    // B · 59e00de7731e
    "abilities.hard_drive.tendencies": ["drive"],
    // B · e9ebc6cc6af3
    "abilities.hard_drive.countersTendency": "pullup",
    // A · b5e29a07d029
    "abilities.pull_up.name": "Sortir du Dribble",
    // B · 9eb8e93adb79
    "abilities.pull_up.tags": ["attaque"],
    // B · 9fbadabbee4b
    "abilities.pull_up.description": "Arrête-toi net, saute, et tire avant que la défense n’arrive.",
    // B · c44e6dd70059
    "abilities.pull_up.targetRule": "NONE",
    // B · 7ce3b6387340
    "abilities.pull_up.check.attribute": "agilité",
    // B · df101767737b
    "abilities.pull_up.tendencies": ["pullup"],
    // B · bfc2f23ba08b
    "abilities.pull_up.countersTendency": "drive",
    // A · db30ecd0a0f2
    "abilities.read_and_pass.name": "Trouver le Joueur Libre",
    // B · 9eb8e93adb79
    "abilities.read_and_pass.tags": ["attaque"],
    // B · 5c03d283f081
    "abilities.read_and_pass.description": "Attire deux défenseurs et passe là où le troisième n’est pas.",
    // B · 39d896e20aec
    "abilities.read_and_pass.targetRule": "SINGLE",
    // B · a8c1fa8269c3
    "abilities.read_and_pass.check.attribute": "esprit",
    // B · 80db2c62f9b2
    "abilities.read_and_pass.tendencies": ["dish"],
    // B · bfc2f23ba08b
    "abilities.read_and_pass.countersTendency": "drive",
    // A · 59b913c64cf2
    "abilities.post_up.name": "Montrer ce Qu’on Sait Faire",
    // B · 9eb8e93adb79
    "abilities.post_up.tags": ["attaque"],
    // B · 4a445f029626
    "abilities.post_up.description": "Prends position près du panier, sens où ils sont, et marque par-dessus.",
    // B · 39d896e20aec
    "abilities.post_up.targetRule": "SINGLE",
    // B · 97081b4b4792
    "abilities.post_up.check.attribute": "puissance",
    // B · c1741718978c
    "abilities.post_up.tendencies": ["poste"],
    // B · b58a7214be38
    "abilities.post_up.countersTendency": "hors_ballon",
    // A · 7a58753b30b3
    "abilities.face_up.name": "Prendre de Face",
    // B · 9eb8e93adb79
    "abilities.face_up.tags": ["attaque"],
    // B · bae64a4fc999
    "abilities.face_up.description": "Tourne-toi et regarde-les. Maintenant, tout le terrain est ouvert et ils doivent deviner.",
    // B · 39d896e20aec
    "abilities.face_up.targetRule": "SINGLE",
    // B · 7ce3b6387340
    "abilities.face_up.check.attribute": "agilité",
    // B · caa80814fcd3
    "abilities.face_up.tendencies": ["poste","tir_rapide"],
    // B · 751c1407721f
    "abilities.face_up.countersTendency": "poste",
    // A · 0411892a3b3a
    "abilities.come_off_screen.name": "Arriver au Contact Net",
    // B · 9eb8e93adb79
    "abilities.come_off_screen.tags": ["attaque"],
    // B · 6574a264dd9c
    "abilities.come_off_screen.description": "Prépare-les, frôle l’écran assez près pour gêner, et attrape déjà en tournant.",
    // B · c44e6dd70059
    "abilities.come_off_screen.targetRule": "NONE",
    // B · 7ce3b6387340
    "abilities.come_off_screen.check.attribute": "agilité",
    // B · 821c05f1d764
    "abilities.come_off_screen.tendencies": ["hors_ballon"],
    // B · 7877663aee72
    "abilities.come_off_screen.countersTendency": "défense_serrée",
    // A · a9f050babee6
    "abilities.face_guard.name": "Contrer Le Type",
    // B · a0cfef55b82a
    "abilities.face_guard.tags": ["défense"],
    // B · ee703b73613a
    "abilities.face_guard.description": "Prends en charge leur meilleur joueur et ne le laisse pas respirer pendant toute la possession.",
    // B · 39d896e20aec
    "abilities.face_guard.targetRule": "SINGLE",
    // B · 4c84c2c842d0
    "abilities.face_guard.check.attribute": "détermination",
    // B · 7407aec5a559
    "abilities.face_guard.tendencies": ["défense_serrée"],
    // A · b7ca04b122c8
    "abilities.crash_glass.name": "Va le chercher",
    // B · a0cfef55b82a
    "abilities.crash_glass.tags": ["défense"],
    // B · 5c4f4e532425
    "abilities.crash_glass.description": "Lis la trajectoire, trouve le corps, et récupère le ballon au milieu de la mêlée.",
    // B · c44e6dd70059
    "abilities.crash_glass.targetRule": "NONE",
    // B · 97081b4b4792
    "abilities.crash_glass.check.attribute": "puissance",
    // B · 849ee7625a81
    "abilities.crash_glass.tendencies": ["reprise"],
    // A · f6e96d9f83ab
    "abilities.call_it_out.name": "Lance-le",
    // B · 4b4c5e2836b8
    "abilities.call_it_out.tags": ["social","leadership"],
    // B · 7b71210a160a
    "abilities.call_it_out.description": "Annonce la mise en place à voix haute et place quatre joueurs où ils doivent être.",
    // B · e9383e6237fe
    "abilities.call_it_out.targetRule": "MULTI",
    // B · cfb7a15645c3
    "abilities.call_it_out.check.attribute": "présence",
    // B · 80db2c62f9b2
    "abilities.call_it_out.tendencies": ["distribution"],
    // A · f590ed2a1787
    "abilities.watch_film.name": "Regarder le match",
    // B · 5251d369d3b6
    "abilities.watch_film.tags": ["utilitaire"],
    // B · f9af38027660
    "abilities.watch_film.description": "Assieds-toi dans le noir avec Nori et repère ce que quelqu’un fait avant qu’il le fasse.",
    // B · 39d896e20aec
    "abilities.watch_film.targetRule": "SINGLE",
    // B · a8c1fa8269c3
    "abilities.watch_film.check.attribute": "esprit",
    // A · ea8e4a5e0669
    "locations.kosei_gym.name": "Le gymnase de Kosei",
    // A · a511a328cb59
    "locations.kosei_gym.shortName": "Le gymnase",
    // B · 6399e58c022e
    "locations.kosei_gym.description": "Deux terrains, dont un avec une zone morte près du coude gauche que tout le monde connaît. Trois banderoles de championnat et beaucoup de murs vides.",
    // B · 682c39b3fb83
    "locations.kosei_gym.stageImage": "story_last_five/stage_kosei_gym",
    // A · a75712ef930d
    "locations.locker_room.name": "Le vestiaire",
    // A · 1204b61765e8
    "locations.locker_room.shortName": "Vestiaire",
    // B · 01d54a850cd9
    "locations.locker_room.description": "Onze casiers, six sont utilisés. Quelqu’un a collé une impression de la décision du conseil sur la porte.",
    // B · a448761cae72
    "locations.locker_room.stageImage": "story_last_five/stage_locker_room",
    // A · 4cbd35680e37
    "locations.film_room.name": "La salle des vidéos",
    // A · a815ad35aed9
    "locations.film_room.shortName": "Salle des vidéos",
    // B · 21560f6f4f19
    "locations.film_room.description": "Un placard de rangement avec un projecteur dedans. L’ordinateur de Nori, quatre cents heures d’enregistrements, et un tableau blanc couvert de l’écriture d’une seule personne.",
    // B · 1c97b4e6db9d
    "locations.film_room.stageImage": "story_last_five/stage_film_room",
    // A · 645515497e12
    "locations.kosei_school.name": "Kosei High",
    // A · 68ccf2177c88
    "locations.kosei_school.shortName": "Lycée",
    // B · efd1ddd70531
    "locations.kosei_school.description": "Des couloirs, un distributeur qui ne prend que la monnaie exacte, et le bureau du personnel d’où vient la lettre du conseil.",
    // B · 62c54465854e
    "locations.kosei_school.stageImage": "story_last_five/stage_kosei_school",
    // A · 7c6759bd7ffc
    "locations.the_roof.name": "Le Toit",
    // A · 7c6759bd7ffc
    "locations.the_roof.shortName": "Le Toit",
    // B · 62a5e37ff0cf
    "locations.the_roof.description": "Officiellement fermé. La porte ne s’est jamais bien verrouillée depuis avant que quelqu’un ici ne commence.",
    // B · 88dd84b428d3
    "locations.the_roof.stageImage": "story_last_five/stage_the_roof",
    // A · ebe91db40350
    "locations.away_seiran.name": "Académie Seiran",
    // A · 9e416d363391
    "locations.away_seiran.shortName": "Seiran",
    // B · bf060e2f9687
    "locations.away_seiran.description": "Un gymnase avec deux mille places et un tableau de score qui marche. Rei Amagi y joue maintenant.",
    // B · 48bd3d2b1f74
    "locations.away_seiran.stageImage": "story_last_five/stage_away_seiran",
    // A · 7c8a2cefef74
    "locations.away_hakuba.name": "Hakuba Ouest",
    // A · 292f7d6d9235
    "locations.away_hakuba.shortName": "Hakuba",
    // B · 84dd1fe750be
    "locations.away_hakuba.description": "Un gymnase public avec un toit qui fuit et le meilleur meneur de la préfecture. Tsubame Kirisawa y joue maintenant.",
    // B · e57cd1feb834
    "locations.away_hakuba.stageImage": "story_last_five/stage_away_hakuba",
    // A · 474b33bcd074
    "locations.away_tessen.name": "Tessen Industriel",
    // A · 0b7633c71f70
    "locations.away_tessen.shortName": "Tessen",
    // B · 60c5e9cd3d35
    "locations.away_tessen.description": "Une ancienne usine transformée en salle de sport. Tout y résonne. Gora Vance y joue maintenant.",
    // B · 07c832144385
    "locations.away_tessen.stageImage": "story_last_five/stage_away_tessen",
    // A · ef3ded804902
    "locations.away_onda.name": "Onda Commercial",
    // A · 69df52594fc0
    "locations.away_onda.shortName": "Onda",
    // B · ca7462f8a687
    "locations.away_onda.description": "Le gymnase le plus bruyant de la préfecture, et la plupart du temps, c’est une seule personne qui parle. Mikael Sorrel y joue maintenant.",
    // B · b412b8a8e3b2
    "locations.away_onda.stageImage": "story_last_five/stage_away_onda",
    // A · bacd9fe8cf7d
    "locations.away_kurogane.name": "Kurogane",
    // A · bacd9fe8cf7d
    "locations.away_kurogane.shortName": "Kurogane",
    // B · 45f3e899f418
    "locations.away_kurogane.description": "Petit, calme, impeccable. Ils ont gagné ici onze fois d’affilée. Yuki Hoshizawa y joue maintenant.",
    // B · 270135d90661
    "locations.away_kurogane.stageImage": "story_last_five/stage_away_kurogane",
    // A · b0a4e0623e95
    "locations.nationals.name": "Le championnat national",
    // A · 3146a66f075b
    "locations.nationals.shortName": "Nationaux",
    // B · f299fff30c25
    "locations.nationals.description": "Neuf mille places, un parquet posé ce matin, et un programme avec Kosei imprimé dedans.",
    // B · 294807bcda02
    "locations.nationals.stageImage": "story_last_five/stage_nationals",
    // B · 836d00d6e6a3
    "characters.dai.name": "Dai Okonkwo",
    // A · f0d8d5da938a
    "characters.dai.role": "Capitaine, en terminale",
    // A · 7bc225b5df47
    "characters.dai.cardBlurb": "Le seul titulaire qui est resté, et le capitaine qui te donne le ballon avant de demander ton prénom. Ce n’est pas le meilleur joueur ici, mais il a couru à chaque entraînement depuis mars.",
    // B · fcca6b746d0b
    "characters.dai.pronouns": "il/lui",
    // A · f64c7b68359e
    "characters.dai.publicTraits": ["Fiable","Bavard en regroupement","Mauvais pour cacher sa douleur"],
    // B · d37b4da1525e
    "characters.dai.hiddenDrives": ["Il veut que l’un d’eux l’appelle et aucun ne l’a fait"],
    // B · dafae72ad393
    "characters.dai.values": ["Être présent","Ne pas parler des absents"],
    // B · d31619217ec6
    "characters.dai.fears": ["Qu’il soit resté parce que personne ne le voulait"],
    // A · f5ec6eed9539
    "characters.dai.socialStyle": "Il salue tout le monde. Il détourne toute question sur lui en te demandant quelque chose sur toi.",
    // B · 1a40ab906936
    "characters.dai.boundaries": ["Ne critique pas les cinq"],
    // B · 42f1918b81db
    "characters.dai.goals": ["Terminer la saison avec une équipe","Mériter une place de titulaire"],
    // B · c43648b63cab
    "characters.dai.secrets.dai_the_call.fact": "Tsubame l’a appelé la nuit où elle a changé d’école. Il n’a pas répondu et n’a jamais rien dit.",
    // B · 47558a04be8d
    "characters.dai.secrets.dai_the_call.visibility": "NPC_PRIVATE",
    // B · fd3c88773935
    "characters.dai.secrets.dai_the_call.revealHint": "Dans le bus du retour d’Hakuba, si le joueur demande après elle.",
    // A · dcd4531f78af
    "characters.dai.speechStyle": "Chaleureux, rapide, répète deux fois le prénom de chacun dans une phrase.",
    // A · 7233164e6829
    "characters.dai.topics": ["les cinq","le capitanat","comment c’était avant","tes minutes"],
    // A · 3cb9cf3c377a
    "characters.dai.voiceSamples": ["Ok — nouveau. Kai, file-lui un ballon. Bo, arrête ça.","C’étaient mes amis. C’est tout ce que j’ai à dire.","T’es meilleur que moi. Je préfère le découvrir en octobre qu’en mars."],
    // B · 151c42cbaea2
    "characters.dai.appearance": "Dix-huit ans, un mètre quatre-vingt-trois, large d’épaules, trois doigts de sa main de tir sont bandés.",
    // B · 1265a6b8902b
    "characters.dai.visualHook": "Trois doigts bandés à la main droite, rebandés à chaque service, jamais guéris.",
    // B · 5f034099869d
    "characters.dai.silhouette": "Large et droit, un bras toujours levé pour demander quelque chose.",
    // B · dd8e8c9d10cc
    "characters.dai.artSeed": "lastfive-dai-01",
    // B · bda05a011a25
    "characters.dai.portrait": "story_last_five/dai",
    // B · 47f354749ec0
    "characters.dai.expressions": ["neutre","souriant","fatigué"],
    // B · 8499ee8dc07f
    "characters.dai.knowledgeScope": ["kosei","les_cinq","basket"],
    // B · 76104bb13f81
    "characters.dai.gates.dai_opens_up.label": "Il te parle de l’appel",
    // B · 55a54e80451a
    "characters.dai.gates.dai_opens_up.kind": "CONFIANCE",
    // B · ce223861d2cf
    "characters.dai.gates.dai_opens_up.requires.flagsSet": ["visité :away_hakuba"],
    // B · aa5e46abdfe8
    "characters.kai.name": "Kai Sumire",
    // A · 408ea97dfc52
    "characters.kai.role": "Meneur, premier année",
    // A · c8edda31f794
    "characters.kai.cardBlurb": "Quinze ans, tout petit, il voit la passe pour toi deux secondes avant que tu ne réalises que tu es ouvert. Il a peur de la faire, mais la fait quand même.",
    // B · fcca6b746d0b
    "characters.kai.pronouns": "il/lui",
    // A · 1606b8c2b1b5
    "characters.kai.publicTraits": ["Anxieux","Drôle quand il oublie d’être anxieux","Perçoit tout"],
    // B · 665d8a6e5351
    "characters.kai.hiddenDrives": ["Il est venu à Kosei spécialement parce que Tsubame Kirisawa jouait ici"],
    // B · 87054d6f06a4
    "characters.kai.values": ["Bien faire","Ne pas décevoir les autres"],
    // B · d683b76153ec
    "characters.kai.fears": ["Être la cause"],
    // A · c5a278d9760e
    "characters.kai.socialStyle": "S’excuse d’abord, puis dit la bonne chose.",
    // B · 483a8bb1e835
    "characters.kai.boundaries": ["Ne pas lui crier dessus devant les autres"],
    // B · ce5065648c63
    "characters.kai.goals": ["Ne pas être viré","Faire une passe qui finisse aux infos"],
    // B · 4c85740d8a40
    "characters.kai.secrets.kai_why_kosei.fact": "Il a choisi Kosei pour jouer avec Tsubame, mais elle est partie le mois avant son arrivée.",
    // B · 47558a04be8d
    "characters.kai.secrets.kai_why_kosei.visibility": "NPC_PRIVATE",
    // B · d17495aac1c2
    "characters.kai.secrets.kai_why_kosei.revealHint": "Il le balance sur le toit si le joueur est indulgent après une erreur.",
    // A · d1f05a5ca75c
    "characters.kai.speechStyle": "Il enchaîne les phrases sans respirer, puis marque une longue pause, puis la vraie idée.",
    // A · 878e2527860f
    "characters.kai.topics": ["la passe qu’il a ratée","Tsubame Kirisawa","le fait d’être petit","ton jeu"],
    // A · fe01d1e0c0d4
    "characters.kai.voiceSamples": ["Désolé — désolé, je t’avais, je t’ai vu, je — je l’aurai la prochaine fois.","Tu seras ouvert dans environ deux secondes. Ne me regarde pas.","Tout le monde dit que je vais grandir. J’ai quinze ans. J’ai déjà grandi."],
    // B · 110d29275997
    "characters.kai.appearance": "Quinze ans, un mètre soixante-dix, manches tirées sur les mains hors du terrain, genouillères qu’il n’a pas encore besoin de porter.",
    // B · be168d328994
    "characters.kai.visualHook": "Manches tirées sur les deux mains dès qu’il ne tient pas le ballon.",
    // B · cc0ef3be70a8
    "characters.kai.silhouette": "Petit et voûté au repos ; sur le terrain, soudain droit et regardant par-dessus tout le monde.",
    // B · bc7719a13613
    "characters.kai.artSeed": "lastfive-kai-01",
    // B · 731dada216a0
    "characters.kai.portrait": "story_last_five/kai",
    // B · aaf84513d455
    "characters.kai.expressions": ["neutre","paniqué","ravi"],
    // B · b1be0ea50b77
    "characters.kai.knowledgeScope": ["kosei","basketball","the_five"],
    // B · 0f58da377b5f
    "characters.kai.gates.kai_trusts_you.label": "Il te dit pourquoi il est venu ici",
    // B · 55a54e80451a
    "characters.kai.gates.kai_trusts_you.kind": "CONFIANCE",
    // B · 2951c95f49d6
    "characters.jun.name": "Jun Hasabe",
    // A · 1e3b3d23bc35
    "characters.jun.role": "Arrière, deuxième année",
    // A · 7726356d3dbc
    "characters.jun.cardBlurb": "Il tire quatre cents fois par jour depuis mars pour décrocher une place de titulaire, et toi tu débarques en octobre.",
    // B · fcca6b746d0b
    "characters.jun.pronouns": "il/lui",
    // A · 2185b84971a4
    "characters.jun.publicTraits": ["Discipliné","Froid avec les inconnus","Hyper compétitif"],
    // B · 901c9ea61ddc
    "characters.jun.hiddenDrives": ["Il n’est pas sûr d’être bon, juste qu’il a bossé plus dur que tout le monde"],
    // B · 89f885c8ff4d
    "characters.jun.values": ["Le mériter","Que personne n’ait rien de cadeau"],
    // B · 23722677734a
    "characters.jun.fears": ["Que l’effort ne suffise pas et n’ait jamais suffi"],
    // A · dbd5851674a8
    "characters.jun.socialStyle": "Poli, distant, et garde un compte de tout.",
    // B · 9dc69e988f3d
    "characters.jun.boundaries": ["Ne lui dis pas qu’il est malchanceux"],
    // B · ee323a55b831
    "characters.jun.goals": ["Être titulaire","Te battre à quelque chose devant les autres"],
    // B · 466beb5d4333
    "characters.jun.secrets.jun_the_list.fact": "Il tient un carnet de tous les exercices de tir, et il bat ses propres scores chaque semaine.",
    // B · 47558a04be8d
    "characters.jun.secrets.jun_the_list.visibility": "NPC_PRIVATE",
    // B · 4db31f232d24
    "characters.jun.secrets.jun_the_list.revealHint": "Il montre le carnet au joueur quand il ne le voit plus comme une menace.",
    // A · 58d485cdb3a8
    "characters.jun.speechStyle": "Sec. Ses compliments ressemblent à des notes.",
    // A · 184bd4e761d5
    "characters.jun.topics": ["la rotation","son tir","que tu prennes ses minutes","les cinq"],
    // A · f864da733b19
    "characters.jun.voiceSamples": ["Tu as fait onze sur dix-neuf. Ça va. Moi, dimanche, tout seul, j’ai fait dix-neuf sur dix-neuf.","Je suis pas en colère. Je voudrais juste que quelqu’un explique les critères.","Tire. Si tu rates, tente le suivant. J’ai horreur que tu passes la balle."],
    // B · b0420198a208
    "characters.jun.appearance": "Dix-sept ans, sec, manche de tir au bras droit, coupe de cheveux faite la même semaine chaque mois.",
    // B · 5581a16d9a92
    "characters.jun.visualHook": "Une manche noire de tir toujours portée au bras droit, même en cours.",
    // B · 145ec6bb34e7
    "characters.jun.silhouette": "Étroit et très droit, mains déjà prêtes à tirer au repos.",
    // B · 4255d8277f69
    "characters.jun.artSeed": "lastfive-jun-01",
    // B · db2614ef5eb8
    "characters.jun.portrait": "story_last_five/jun",
    // B · 667b8a0c8e39
    "characters.jun.expressions": ["neutre","froid","impressionné à contrecoeur"],
    // B · 61beb6ba2268
    "characters.jun.knowledgeScope": ["kosei","basketball"],
    // B · 7058ea8b09ad
    "characters.jun.gates.jun_respects_you.label": "Il arrête de te voir comme une menace",
    // B · 55a54e80451a
    "characters.jun.gates.jun_respects_you.kind": "CONFIANCE",
    // B · a5421ec47c7d
    "characters.jun.scouting.revealCopy": "« Tu vas toujours à droite quand tu es fatigué. Toujours. »",
    // B · 13c36b4b94c0
    "characters.coach.name": "Ena Torakawa",
    // A · 58da87333618
    "characters.coach.role": "Entraîneuse principale, deuxième année",
    // A · b8275cfa0f97
    "characters.coach.cardBlurb": "L’entraîneuse que personne ne voulait. C’est elle qui décide si tu joues, elle t’expliquera exactement pourquoi, et elle ne fera pas dans la dentelle.",
    // B · aee35f364a88
    "characters.coach.pronouns": "elle",
    // A · fc63f0ffa456
    "characters.coach.publicTraits": ["Brutale","Précise","Ne hausse jamais la voix"],
    // B · d21e3de19475
    "characters.coach.hiddenDrives": ["Elle était assistante ici quand ça s’est passé et elle n’a rien dit"],
    // B · 47f7c6b4d6c8
    "characters.coach.values": ["Dire la vérité aux joueurs","Gagner sa place sur le terrain"],
    // B · 4193536c3f78
    "characters.coach.fears": ["Faire à ces six ce qui a été fait aux cinq derniers"],
    // A · fc441c6efcb1
    "characters.coach.socialStyle": "Elle répond en une phrase. C’est toujours la vraie réponse.",
    // B · bc3c422dbf2e
    "characters.coach.boundaries": ["Ne jouera pas quelqu’un qui ne défend pas"],
    // B · 9bfa358c609a
    "characters.coach.goals": ["Atteindre les Nationaux","Que les six veuillent encore jouer en mars"],
    // B · 626e9bee6c87
    "characters.coach.secrets.coach_knew.fact": "Elle était l’assistante de Denda. Elle a vu assez pour le signaler et elle ne l’a pas fait.",
    // B · 47558a04be8d
    "characters.coach.secrets.coach_knew.visibility": "NPC_PRIVATE",
    // B · a519a598fb59
    "characters.coach.secrets.coach_knew.revealHint": "Elle le dit elle-même une fois que le joueur a trouvé le rapport.",
    // A · 5bb1381ca8d9
    "characters.coach.speechStyle": "Courtes. Impératives. Dit ton prénom au début des phrases dures.",
    // A · 1ab7d9925bf9
    "characters.coach.topics": ["tes minutes","les cinq qui sont partis","ce dans quoi tu es bon","l’entraîneur Denda","les Nationaux"],
    // A · 5ac5891f88d6
    "characters.coach.voiceSamples": ["Tu vas pas aimer la réponse, alors je fais court.","Refais ça et je te fais jouer. C’est le système.","Je te demande pas d’être Rei Amagi. Lui, il est à Seiran."],
    // B · c7088ccbf524
    "characters.coach.appearance": "Quarante-quatre ans, cheveux courts grisonnants sur une tempe, un genou qui la fait s’asseoir à la fin de chaque entraînement.",
    // B · af1fbe32b4c6
    "characters.coach.visualHook": "Une lourde attelle au genou gauche, portée par-dessus le survêtement, jamais mentionnée.",
    // B · 26d4ce28e8a5
    "characters.coach.silhouette": "Bras croisés, tout le poids sur une jambe, debout au bord de tout.",
    // B · e13fa11f999f
    "characters.coach.artSeed": "lastfive-coach-01",
    // B · 13bc8b0c58f7
    "characters.coach.portrait": "story_last_five/coach",
    // B · a0ed85038078
    "characters.coach.expressions": ["neutre","impressionnée","discrètement satisfaite"],
    // B · 8771e30793aa
    "characters.coach.knowledgeScope": ["kosei","les_cinq","denda","basket"],
    // B · 77c2670613ac
    "characters.coach.gates.coach_trusts_you.label": "Elle te dit ce qu’elle a vu",
    // B · 55a54e80451a
    "characters.coach.gates.coach_trusts_you.kind": "CONFIANCE",
    // B · 314550807f14
    "characters.coach.gates.coach_trusts_you.requires.hasItems": ["rapport_denda"],
    // B · ed48fef37216
    "characters.bo.name": "Bo Ferrand",
    // A · 3c803c8032c8
    "characters.bo.role": "Pivot, deuxième année, six semaines d’expérience",
    // A · f097633cbeec
    "characters.bo.cardBlurb": "Deux mètres six, nageur jusqu’en septembre, et il te demandera sans gêne ce qu’est un écran. C’est aussi la plus grande personne du département.",
    // B · fcca6b746d0b
    "characters.bo.pronouns": "il/lui",
    // A · 027ffda9d078
    "characters.bo.publicTraits": ["Souriant","Imposant","Il s’en fiche vraiment d’être nul à ça"],
    // B · 62387871c3d9
    "characters.bo.hiddenDrives": ["Il a arrêté la natation parce qu’il allait être très bon et que ça le rendait malheureux"],
    // B · f2fbc3b1ccb3
    "characters.bo.values": ["Prendre du plaisir","Ne pas se faire crier dessus"],
    // B · 1900c36a5096
    "characters.bo.fears": ["Être gâché"],
    // A · acd205eb41a4
    "characters.bo.socialStyle": "Pose des questions évidentes sans gêne, c’est une superpuissance.",
    // B · 89a38f55eed3
    "characters.bo.boundaries": ["Refuse qu’on lui dise qu’il est un projet"],
    // B · 4ab2c497747f
    "characters.bo.goals": ["Apprendre une chose correctement","Faire un dunk en vrai match"],
    // B · dcd2e9b98e91
    "characters.bo.secrets.bo_the_times.fact": "Ses temps au 200 mètres nage libre étaient assez bons pour l’équipe junior nationale. Il ne l’a dit à personne à Kosei.",
    // B · 47558a04be8d
    "characters.bo.secrets.bo_the_times.visibility": "NPC_PRIVATE",
    // B · 3589c5d3cea1
    "characters.bo.secrets.bo_the_times.revealHint": "Il en parle en plaisantant, une fois, sans plus de détails.",
    // A · 70216aed1589
    "characters.bo.speechStyle": "Souriant, très littéral, demande ce que les mots veulent dire en plein milieu d’une phrase.",
    // A · b9c19cdeaf46
    "characters.bo.topics": ["ce qu’est un écran","la natation","être grand","faire un dunk"],
    // A · 2c413fc95cce
    "characters.bo.voiceSamples": ["C’est quoi un hedge ? Non, sérieusement. Personne m’a expliqué et je fais ça mal depuis un mois.","Je peux juste — rester là ? Et personne passe ? C’est le boulot ?","Si tu la lances assez haut, je vais l’avoir. C’est promis."],
    // B · 1f087cd56ed1
    "characters.bo.appearance": "Dix-sept ans, deux mètres six, toujours bâti comme un nageur, constamment un peu essoufflé.",
    // B · ebb6e791a125
    "characters.bo.visualHook": "Des épaules bien trop larges pour le maillot, qui remonte tout le temps.",
    // B · baed79fb5c27
    "characters.bo.silhouette": "Ridiculement grand et légèrement voûté, occupant le haut de chaque cadre où il est.",
    // B · ed9427ae0c7a
    "characters.bo.artSeed": "lastfive-bo-01",
    // B · a9ff40d6052a
    "characters.bo.portrait": "story_last_five/bo",
    // B · 341fe070498e
    "characters.bo.expressions": ["neutre","ravi","perplexe"],
    // B · a770390724de
    "characters.bo.knowledgeScope": ["kosei","natation"],
    // B · 6af83bd95039
    "characters.nori.name": "Nori Abe",
    // A · d0381ace3359
    "characters.nori.role": "Manager et analyste, en deuxième année",
    // A · 2f8f7a499e8d
    "characters.nori.cardBlurb": "C’est eux qui montent les vidéos, ils connaissent toutes les habitudes de l’adversaire, et ils te diront ce que tu continues de faire avant tout le monde.",
    // B · 9bdf0106d724
    "characters.nori.pronouns": "iel/iels",
    // A · 31e278f482d0
    "characters.nori.publicTraits": ["Précis","Sec","Ils remarquent tout"],
    // B · 6f39450cdb76
    "characters.nori.hiddenDrives": ["Iel veut devenir coach et ne l’a jamais dit à voix haute"],
    // B · 13340142895e
    "characters.nori.values": ["Avoir raison","Être utile"],
    // B · a0a9fccaf5d9
    "characters.nori.fears": ["Que le programme s’arrête et que tout ça n’ait servi à rien"],
    // A · e4e2d0c91cbc
    "characters.nori.socialStyle": "Ils te disent l’essentiel, sans détour.",
    // B · 8fbb17861593
    "characters.nori.boundaries": ["Ne pas appeler ça « juste la bande »"],
    // B · ef87c0e18bda
    "characters.nori.goals": ["Faire gagner un de ses lectures","Garder le programme en vie"],
    // B · ad2a5878b05c
    "characters.nori.secrets.nori_has_the_report.fact": "Ils ont une copie du rapport d’incident que Yuki a déposé. Ils l’ont depuis mars.",
    // B · 47558a04be8d
    "characters.nori.secrets.nori_has_the_report.visibility": "NPC_PRIVATE",
    // B · c17eb8c88e97
    "characters.nori.secrets.nori_has_the_report.revealHint": "Ils le donnent quand le joueur pose une question qui montre qu’il sait déjà à moitié.",
    // A · 1583304d2c56
    "characters.nori.speechStyle": "Calme, précis, parfois très drôle sans changer de ton.",
    // A · bdde42384379
    "characters.nori.topics": ["vidéos","habitudes des adversaires","ce que tu refais","les cinq","le rapport"],
    // A · 836f5087c965
    "characters.nori.voiceSamples": ["Tu as pris la droite onze fois sur treize. Je suis pas le seul à avoir une caméra.","Il croise sur le deuxième dribble. À chaque fois. C’est le truc le plus fiable de tout le département.","Je veux pas que tu t’y intéresses. Je veux que tu regardes."],
    // B · dcf0a65142fb
    "characters.nori.appearance": "Seize ans, petit, toujours avec un ordinateur portable dont une charnière est cassée.",
    // B · 2bf479430210
    "characters.nori.visualHook": "Un ordinateur avec une charnière maintenue par du gaffer, porté partout comme un clipboard.",
    // B · b801775c80e6
    "characters.nori.silhouette": "Compact, un bras serré autour de l’ordinateur, toujours un peu à l’écart du groupe.",
    // B · 509f30144fc3
    "characters.nori.artSeed": "lastfive-nori-01",
    // B · 0bb4e08bdeb5
    "characters.nori.portrait": "story_last_five/nori",
    // B · b55fda1baf89
    "characters.nori.expressions": ["neutre","sec","urgent"],
    // B · 65c349bfcea5
    "characters.nori.knowledgeScope": ["film","les_cinq","denda","basketball","kosei"],
    // B · 80a0b343d23c
    "characters.nori.gates.nori_hands_it_over.label": "Ils te donnent le rapport",
    // B · 55a54e80451a
    "characters.nori.gates.nori_hands_it_over.kind": "TRUST",
    // B · f0fadc76c607
    "characters.nori.gates.nori_hands_it_over.requires.flagsSet": ["sait :denda_existait"],
    // B · c23e2ca2d70f
    "characters.rei.name": "Rei Amagi",
    // A · bb63219709d9
    "characters.rei.role": "Académie Seiran · arrière scoreur",
    // A · 6b0f8a96ce24
    "characters.rei.cardBlurb": "Le meilleur marqueur du département et le premier des cinq que tu dois battre. Il est parti parce que Kosei n’arrivait plus à gagner, et il te le dira en face.",
    // B · fcca6b746d0b
    "characters.rei.pronouns": "il/lui",
    // A · 08c15b177096
    "characters.rei.publicTraits": ["Froid","Précis","Totalement sans cruauté"],
    // B · 9e35cbefe83a
    "characters.rei.hiddenDrives": ["Il est parti le premier, les quatre autres ont suivi, et on ne lui a jamais demandé ce que ça faisait"],
    // B · 0bf9d09dc3da
    "characters.rei.values": ["Gagner","Ne pas mentir pour être aimé"],
    // B · 56613353b897
    "characters.rei.fears": ["Qu’il soit la raison de l’effondrement"],
    // A · ed4680345327
    "characters.rei.socialStyle": "Répond franchement, même si ça lui coûte. Ne fait pas de conversation inutile.",
    // B · 49b259dd8c76
    "characters.rei.boundaries": ["Ne parle pas de Denda"],
    // B · 1db997963da5
    "characters.rei.goals": ["Gagner un titre national","Ne pas penser à Kosei"],
    // B · 48018115a164
    "characters.rei.secrets.rei_went_first.fact": "Il a transféré deux jours après que Yuki a déposé le rapport. Il savait ce qu’il disait.",
    // B · 47558a04be8d
    "characters.rei.secrets.rei_went_first.visibility": "NPC_PRIVATE",
    // B · 0417a96ee9b7
    "characters.rei.secrets.rei_went_first.revealHint": "Seulement après que le joueur a lu le rapport et l’a battu, ou a bien perdu.",
    // A · da0b5eee8d45
    "characters.rei.speechStyle": "Calme, posé, sans mots superflus. Dit les choses dures sans colère.",
    // A · 07d0f26f4c89
    "characters.rei.topics": ["pourquoi il est parti","Kosei","ton jeu","les Nationaux"],
    // A · 1a3546efdf5c
    "characters.rei.voiceSamples": ["Tu es meilleur que n’importe qui qu’ils avaient l’an dernier. Ce n’est pas un compliment pour toi.","Je ne dois rien à cette école, et aucun d’entre nous non plus.","Va à gauche. Je te le demande. Je veux voir si tu peux."],
    // B · bcfbcf311829
    "characters.rei.appearance": "Dix-huit ans, grand et mince, blanc et rouge de Seiran, un visage qui ne trahit rien.",
    // B · 3b8176fcff09
    "characters.rei.visualHook": "Un seul bracelet blanc au poignet gauche, d’un équipement Kosei qu’il ne porte plus.",
    // B · 6dbfff332f53
    "characters.rei.silhouette": "Long, immobile, mains le long du corps tandis que les autres bougent.",
    // B · a154a0b9253d
    "characters.rei.artSeed": "lastfive-rei-01",
    // B · 3b27496c2c80
    "characters.rei.portrait": "story_last_five/rei",
    // B · 083a9b61ddbf
    "characters.rei.expressions": ["neutre","concentré","surpris"],
    // B · 0243ec5b7b91
    "characters.rei.knowledgeScope": ["les_cinq","denda","basketball","seiran"],
    // B · 79df7e47da75
    "characters.rei.gates.rei_tells_you.label": "Il te dit pourquoi il est parti le premier",
    // B · 55a54e80451a
    "characters.rei.gates.rei_tells_you.kind": "TRUST",
    // B · 314550807f14
    "characters.rei.gates.rei_tells_you.requires.hasItems": ["rapport_denda"],
    // B · 5cc2d84ce31c
    "characters.rei.scouting.revealCopy": "« Deuxième dribble. Tu décides toujours au deuxième dribble. »",
    // B · e2449b8e1e0d
    "characters.tsubame.name": "Tsubame Kirisawa",
    // A · 8d269807787c
    "characters.tsubame.role": "Hakuba West · meneuse",
    // A · 68c928f4543c
    "characters.tsubame.cardBlurb": "La deuxième des cinq, et celle dont tout le monde se trompe. Elle te demandera comment va Dai avant de te demander qui tu es.",
    // B · aee35f364a88
    "characters.tsubame.pronouns": "elle/elle",
    // A · cde21518dfa2
    "characters.tsubame.publicTraits": ["Sympathie","Sur ses gardes","Ne se défend pas"],
    // B · 9550b14d9e51
    "characters.tsubame.hiddenDrives": ["Sa famille a déménagé pour le traitement de sa mère et elle n’a dit à personne pourquoi elle a transféré"],
    // B · 17ee9df466b6
    "characters.tsubame.values": ["Sa famille","Ne pas en faire une affaire personnelle"],
    // B · 528de7e1ca86
    "characters.tsubame.fears": ["Être celle dont on se souvient comme celle qui a abandonné"],
    // A · 83b70e6f6b43
    "characters.tsubame.socialStyle": "Te questionne jusqu’à ce que tu oublies que c’est elle que tu voulais interroger.",
    // B · 08641593b1f6
    "characters.tsubame.boundaries": ["Ne parlera pas de sa mère"],
    // B · 698602146298
    "characters.tsubame.goals": ["Passer cette année","Reparler à Dai"],
    // B · 33087efebbff
    "characters.tsubame.secrets.tsubame_why.fact": "Elle a été transférée parce que sa famille a déménagé à quatre-vingt-dix minutes pour le traitement de sa mère. Rien à voir avec l’équipe.",
    // B · 47558a04be8d
    "characters.tsubame.secrets.tsubame_why.visibility": "NPC_PRIVATE",
    // B · 7ff6c4807313
    "characters.tsubame.secrets.tsubame_why.revealHint": "Elle le dit au joueur s’il demande sans l’accuser.",
    // A · e10d8fd7daf1
    "characters.tsubame.speechStyle": "Douce, vive, renvoie chaque question par une autre.",
    // A · 01fb76ef2715
    "characters.tsubame.topics": ["Kosei","Dai","pourquoi elle est partie","Kai"],
    // A · 6da339b980b2
    "characters.tsubame.voiceSamples": ["Comment il va ? Dai. Il est — il va bien ?","Tu penses ce que tu veux. La plupart ont déjà fait leur choix.","Ton premier année va être meilleur que moi. Dis-lui que je l’ai dit."],
    // B · a21cb205bf39
    "characters.tsubame.appearance": "Dix-sept ans, petite, bleu délavé de Hakuba, une natte qu’elle refait entre chaque quart-temps.",
    // B · 1a88b63fbf16
    "characters.tsubame.visualHook": "Une natte qu’elle défait et refait constamment, toujours en mouvement.",
    // B · a62d8f71a9df
    "characters.tsubame.silhouette": "Basse et large, tête haute, regardant ailleurs que là où elle va lancer.",
    // B · a9206b0fea9c
    "characters.tsubame.artSeed": "lastfive-tsubame-01",
    // B · f752c814034a
    "characters.tsubame.portrait": "story_last_five/tsubame",
    // B · 3d76662e7392
    "characters.tsubame.expressions": ["neutre","chaleureux","blessée"],
    // B · afcbf793c95c
    "characters.tsubame.knowledgeScope": ["the_five","basketball","hakuba","kosei"],
    // B · 7ee08ece9eab
    "characters.tsubame.gates.tsubame_explains.label": "Elle te dit la vraie raison",
    // B · 55a54e80451a
    "characters.tsubame.gates.tsubame_explains.kind": "TRUST",
    // B · 378206dbaf3e
    "characters.tsubame.scouting.revealCopy": "« Tu le regardes avant de lui passer le ballon. À chaque fois. Je l’ai dit à tout le monde. »",
    // B · b961a05b4779
    "characters.gora.name": "Gora Vance",
    // A · bc001bb25502
    "characters.gora.role": "Tessen Industrial · pivot",
    // A · 0bd67c90b6b3
    "characters.gora.cardBlurb": "Sept pieds un, la personne la plus gentille que tu rencontreras, et la raison pour laquelle rien de ce que tu lances dans ce cercle ne rentre. Il est parti parce que rester le changeait en quelqu’un qu’il ne voulait pas être.",
    // B · fcca6b746d0b
    "characters.gora.pronouns": "il/lui",
    // A · c55838378858
    "characters.gora.publicTraits": ["Silencieux","Doué de douceur","Impassible"],
    // B · e518568ef45b
    "characters.gora.hiddenDrives": ["Denda l’a pris en exemple quand il voulait effrayer les autres"],
    // B · 0244d09aaabc
    "characters.gora.values": ["Ne pas avoir peur d’un gymnase","Protéger celui qui est le plus petit"],
    // B · b0d142852698
    "characters.gora.fears": ["Être à nouveau un instrument"],
    // A · 47c7864c8425
    "characters.gora.socialStyle": "Il parle peu, et toujours dans le vif du sujet.",
    // B · abaa55a93dbc
    "characters.gora.boundaries": ["Ne plus jamais se faire crier dessus par qui que ce soit"],
    // B · 2c7f3dd00a2e
    "characters.gora.goals": ["Jouer quelque part où il n’a pas peur","Ne plus jamais revoir Denda"],
    // B · 3be5bd7e9512
    "characters.gora.secrets.gora_was_the_example.fact": "Denda l’a pris pour cible. Les autres ont regardé ça pendant deux ans.",
    // B · 47558a04be8d
    "characters.gora.secrets.gora_was_the_example.visibility": "NPC_PRIVATE",
    // B · 26d6dc5290b4
    "characters.gora.secrets.gora_was_the_example.revealHint": "Il le dit franchement si le joueur parle du rapport.",
    // A · 32b059e06266
    "characters.gora.speechStyle": "Phrases lentes et courtes, longues pauses qui ne sont pas de l’hésitation.",
    // A · 101db1a2811f
    "characters.gora.topics": ["Kosei","Denda","pourquoi il est parti","ton pivot"],
    // A · 07105af97601
    "characters.gora.voiceSamples": ["Ton grand. Bo. Il kiffe ça. Garde ça.","Je suis pas en colère contre qui que ce soit là-bas. Juste impossible de remettre les pieds dans ce bâtiment.","T’es rapide. Ça suffira pas. Reviens quand même."],
    // B · 786594a3f5e8
    "characters.gora.appearance": "Dix-huit ans, deux mètres seize, bouge prudemment comme si le monde était un peu trop petit.",
    // B · 16e2dddbcb22
    "characters.gora.visualHook": "Il se baisse réflexivement sous chaque porte et la moitié des plafonniers.",
    // B · dbea1a457099
    "characters.gora.silhouette": "Énorme et légèrement recroquevillé sur lui-même, occupant plus d’espace qu’il ne voudrait.",
    // B · fb2251d26502
    "characters.gora.artSeed": "lastfive-gora-01",
    // B · bde3d797ebc6
    "characters.gora.portrait": "story_last_five/gora",
    // B · b783e38fda2c
    "characters.gora.expressions": ["neutre","doux","fermé"],
    // B · 78a40298fd86
    "characters.gora.knowledgeScope": ["the_five","denda","basketball","tessen"],
    // B · 650366ca0002
    "characters.gora.gates.gora_says_it.label": "Il te dit comment c’était",
    // B · 55a54e80451a
    "characters.gora.gates.gora_says_it.kind": "TRUST",
    // B · f0fadc76c607
    "characters.gora.gates.gora_says_it.requires.flagsSet": ["knows :denda_existed"],
    // B · 33dc0d9a90a1
    "characters.gora.scouting.revealCopy": "« Tu passes en dessous. Tu passes toujours en dessous. Je serai là. »",
    // B · 47a6b0edfde3
    "characters.mikael.name": "Mikael Sorrel",
    // A · bd632d362359
    "characters.mikael.role": "Onda Commercial · arrière défensif",
    // A · 18c4012b92df
    "characters.mikael.cardBlurb": "Il va te défendre trente-deux minutes en parlant tout le temps, et il a regardé toutes les vidéos où tu apparais. Il est parti pour une bourse dont sa famille avait besoin, et il regrette pas.",
    // B · fcca6b746d0b
    "characters.mikael.pronouns": "il/lui",
    // A · 521d0d48acfc
    "characters.mikael.publicTraits": ["Inlassable","Parle sans arrêt","Pas gêné pour deux sous"],
    // B · 890dec300206
    "characters.mikael.hiddenDrives": ["Il renvoie la plupart de l’argent de sa bourse à la maison et personne à Onda ne le sait"],
    // B · e405a82e24c8
    "characters.mikael.values": ["Sa famille","L’effort comme position morale"],
    // B · 7404edd95366
    "characters.mikael.fears": ["Être ordinaire une fois que les paroles s’arrêtent"],
    // A · 51dbb0c47f23
    "characters.mikael.socialStyle": "Dit tout pour provoquer, puis voit ce que ça donne.",
    // B · eb5706ec7e81
    "characters.mikael.boundaries": ["Ne pas parler d’argent"],
    // B · b82b454ba24c
    "characters.mikael.goals": ["Être le meilleur défenseur du pays","Faire finir ses études à son frère"],
    // B · 4c5d3d3034fb
    "characters.mikael.secrets.mik_the_money.fact": "Onda paie ses frais. La plupart de ce qui reste part à son frère cadet.",
    // B · 47558a04be8d
    "characters.mikael.secrets.mik_the_money.visibility": "NPC_PRIVATE",
    // B · ed9b9f32b59c
    "characters.mikael.secrets.mik_the_money.revealHint": "Seulement si le joueur le mérite, et il le niera une fois d’abord.",
    // A · ca772e9d9781
    "characters.mikael.speechStyle": "Parle vite, joue, glisse une vraie phrase toutes les dix.",
    // A · 96d6ba9bfb13
    "characters.mikael.topics": ["pense à te protéger","pourquoi il est parti","Kosei","son frère"],
    // A · bdfb1a7ee933
    "characters.mikael.voiceSamples": ["À gauche. À gauche. Il va à gauche — oh, t’es allé à gauche. Je l’ai dit à voix haute et t’as quand même fait.","Ils ont proposé, j’ai accepté, ma mère a pleuré. La trahison, c’est quoi dans tout ça ?","Trente-deux minutes. Voilà ce que t’as. Une à une."],
    // B · ca510427ccc4
    "characters.mikael.appearance": "Dix-huit ans, compact et épais des jambes, noir et or d’Onda, toujours en plein milieu d’une phrase.",
    // B · 943bc65bddbb
    "characters.mikael.visualHook": "Une dent en or qu’il a eue à quinze ans et dont il parle sans qu’on lui demande.",
    // B · c6de8affe2d3
    "characters.mikael.silhouette": "Bas, large, bras écartés, toujours entre quelqu’un et un endroit.",
    // B · cf47baa8b579
    "characters.mikael.artSeed": "lastfive-mikael-01",
    // B · 4ec77be8804a
    "characters.mikael.portrait": "story_last_five/mikael",
    // B · f0f02bdd3a5d
    "characters.mikael.expressions": ["neutre","souriant","sérieux"],
    // B · a12e3ead2c01
    "characters.mikael.knowledgeScope": ["the_five","basketball","onda"],
    // B · 818948a5fe29
    "characters.mikael.gates.mik_is_honest.label": "Il te parle de l’argent",
    // B · 55a54e80451a
    "characters.mikael.gates.mik_is_honest.kind": "TRUST",
    // B · 48405ef8d342
    "characters.mikael.scouting.revealCopy": "« J’ai regardé chaque minute que tu as jouée cette saison. Chaque minute. »",
    // B · 3b20a9ad4eaa
    "characters.yuki.name": "Yuki Hoshizawa",
    // A · 5b66659d25e6
    "characters.yuki.role": "Kurogane · shooteuse",
    // A · 323129e58bd0
    "characters.yuki.cardBlurb": "La dernière entre toi et les Nationaux. C’est elle qui a déposé le rapport qui a fait tomber Coach Denda, l’école a laissé croire que les cinq avaient juste lâché l’affaire, et elle ne l’a jamais corrigé.",
    // B · aee35f364a88
    "characters.yuki.pronouns": "elle",
    // A · 6141ec630553
    "characters.yuki.publicTraits": ["Impassible","Précise","Posée"],
    // B · 0c3d6994ed99
    "characters.yuki.hiddenDrives": ["Elle le referait et ça lui a tout coûté et les deux sont vrais"],
    // B · 5413960fcd82
    "characters.yuki.values": ["Dire la vérité une fois, vraiment","Ne pas avoir besoin qu’on la remercie"],
    // B · d7387bc6886c
    "characters.yuki.fears": ["Que ça n’ait servi à rien"],
    // A · c98c6b3c5202
    "characters.yuki.socialStyle": "Longs silences. Répond à la question que t’aurais dû poser.",
    // B · fd6a13c66783
    "characters.yuki.boundaries": ["Ne jouera pas la victime"],
    // B · 856c5e315b34
    "characters.yuki.goals": ["Finir l’école","Entendre une personne le dire à voix haute"],
    // B · 50c0ff7633c6
    "characters.yuki.secrets.yuki_filed_it.fact": "C’est elle qui a écrit et déposé le rapport d’incident en mars. L’école l’a enterré et a laissé les transferts s’expliquer.",
    // B · 47558a04be8d
    "characters.yuki.secrets.yuki_filed_it.visibility": "NPC_PRIVATE",
    // B · f7d21de9ac63
    "characters.yuki.secrets.yuki_filed_it.revealHint": "Le joueur peut le deviner à la signature du rapport avant même qu’elle ne le dise.",
    // A · 1328de92db7b
    "characters.yuki.speechStyle": "Rare et calme. Ne hausse jamais la voix.",
    // A · 52b907961a1c
    "characters.yuki.topics": ["le rapport","Denda","Kosei","les quatre autres"],
    // A · 3a8a0f642e0c
    "characters.yuki.voiceSamples": ["Tu l’as lu, alors. Sinon tu ne serais pas là.","Ils ne m’ont pas suivi. Ils sont partis pour leurs raisons. Tu ferais mieux de savoir ça.","Je vais en faire environ neuf. Tu ferais bien de faire quelque chose."],
    // B · 87be9661c936
    "characters.yuki.appearance": "Dix-huit ans, immobile, vert foncé de Kurogane, cheveux attachés exactement de la même façon chaque jour.",
    // B · 68ce99d71042
    "characters.yuki.visualHook": "Deux épingles noires simples qui tiennent ses cheveux, toujours au même endroit.",
    // B · 5b8f80583a57
    "characters.yuki.silhouette": "Droit et immobile, mains lâches, la seule personne dans le gymnase à ne pas s’agiter.",
    // B · 5b823878b54e
    "characters.yuki.artSeed": "lastfive-yuki-01",
    // B · aaa8b98f3292
    "characters.yuki.portrait": "story_last_five/yuki",
    // B · f91d55cc3a01
    "characters.yuki.expressions": ["neutre","calme","brièvement déstabilisée"],
    // B · 061cf50e6e3d
    "characters.yuki.knowledgeScope": ["the_five","denda","the_report","basketball","kurogane"],
    // B · 0dd7270174ce
    "characters.yuki.gates.yuki_speaks.label": "Elle parle du rapport",
    // B · 55a54e80451a
    "characters.yuki.gates.yuki_speaks.kind": "TRUST",
    // B · 314550807f14
    "characters.yuki.gates.yuki_speaks.requires.hasItems": ["denda_report"],
    // B · b84db252942b
    "characters.yuki.scouting.revealCopy": "« Tu me laisses toujours en retard sur la défense. Tu l’as fait quatre fois. »",
    // B · d12b409aa371
    "factions.faction_team.name": "L’Équipe",
    // B · bee68db3cdc5
    "factions.faction_team.description": "Six personnes et toi. Ce qu’ils pensent de toi décide qui joue à la fin des matchs.",
    // B · cc19096b0743
    "factions.faction_school.name": "Kosei",
    // B · 2b64a58e7767
    "factions.faction_school.description": "Le conseil d’administration, la salle des profs, et tous ceux qu’il faut convaincre que ça vaut le coup de garder ça.",
    // B · 45cd46c8caf5
    "factions.faction_scouts.name": "Le Circuit",
    // B · b3a4f3fec6ec
    "factions.faction_scouts.description": "Les coachs, les recruteurs, et ceux qui décident quels gamins de seize ans vont être remarqués.",
    // B · 5b5b3ba0c115
    "quests.q_make_the_team.title": "Quarante minutes",
    // B · 8f50d2bb2c80
    "quests.q_make_the_team.summary": "Le coach Torakawa a une séance pour décider si tu mérites un maillot.",
    // B · 7fcc0be2ad9c
    "quests.q_make_the_team.kind": "PRINCIPALE",
    // B · fc19803fbd9e
    "quests.q_make_the_team.steps.show_her_something.playerCopy": "Montre au coach Torakawa une chose que tu sais vraiment faire.",
    // B · 52ec7f94d590
    "quests.q_make_the_team.steps.show_her_something.directorNotes": "Un match d’entraînement en direct dans les cinq premières minutes. Elle ne cherche pas un joueur complet, juste une force répétable. Ce que le joueur tente ici lance son profil de tendance — ne pas l’orienter vers un poste.",
    // B · 422eec60ab4b
    "quests.q_make_the_team.steps.show_her_something.rewards.flags": ["dans_l’équipe"],
    // B · bf2dbf4eb3d5
    "quests.q_make_the_team.steps.meet_them.playerCopy": "Découvre avec qui tu vas vraiment jouer.",
    // B · 23f3b214b0a1
    "quests.q_make_the_team.steps.meet_them.directorNotes": "Dai présente tout le monde, qu’ils veuillent ou pas. Jun ne te serre pas la main. Bo te demande ce qu’est une haie.",
    // B · 422eec60ab4b
    "quests.q_make_the_team.steps.meet_them.enterWhen.flagsSet": ["dans_l’équipe"],
    // B · 60c6be720297
    "quests.q_make_the_team.steps.meet_them.succeedWhen.flagsSet": ["parlé :dai","parlé :kai"],
    // B · d7c7473eec00
    "quests.q_make_the_team.steps.meet_them.rewards.flags": ["connaît :l’équipe"],
    // B · 8689e68eb08d
    "quests.q_make_the_team.involvedCharacterIds": ["coach","dai","kai","jun"],
    // B · 39c6630aa170
    "quests.q_make_the_team.involvedLocationIds": ["kosei_gym"],
    // B · 4034d46fd53a
    "quests.q_make_the_team.knownRewardCopy": "Une place dans l’équipe, et un numéro que personne d’autre ne voulait.",
    // B · c68cbc0eac8f
    "quests.q_earn_minutes.title": "Gagne ta place",
    // B · 4a97df206363
    "quests.q_earn_minutes.summary": "Les minutes ne se donnent pas. Jun Hasabe a pris quatre cents tirs par jour depuis mars pour le prouver.",
    // B · 7fcc0be2ad9c
    "quests.q_earn_minutes.kind": "PRINCIPALE",
    // B · 422eec60ab4b
    "quests.q_earn_minutes.discoverWhen.flagsSet": ["dans_l’équipe"],
    // B · eb629663857b
    "quests.q_earn_minutes.steps.become_something.playerCopy": "Deviens assez bon dans un truc pour que le coach soit obligé de te faire jouer.",
    // B · e8513ed2a0f3
    "quests.q_earn_minutes.steps.become_something.directorNotes": "Cette étape complète le système de tendance : le joueur doit s’appuyer assez fort sur quelque chose pour que ça devienne une identité. Ne pas leur dire quoi. Le coach le nomme quand ça arrive.",
    // B · 3fadc5de6fce
    "quests.q_earn_minutes.steps.become_something.rewards.flags": ["cinq_de_départ"],
    // B · 9db7e46e0261
    "quests.q_earn_minutes.steps.become_something.rewards.abilities": ["sortir_du_cadre"],
    // B · 40f9ca3b7f39
    "quests.q_earn_minutes.steps.sort_out_jun.playerCopy": "Fais quelque chose avec Jun Hasabe.",
    // B · 5f7f4a892136
    "quests.q_earn_minutes.steps.sort_out_jun.directorNotes": "Il n’y a pas de chemin où c’est gratuit. En faire un ami coûte quelque chose au joueur ; le laisser en colère coûte la chimie d’équipe et un match à terme.",
    // B · 3fadc5de6fce
    "quests.q_earn_minutes.steps.sort_out_jun.enterWhen.flagsSet": ["cinq_de_départ"],
    // B · 333221d0313a
    "quests.q_earn_minutes.steps.sort_out_jun.rewards.abilities": ["le_révéler"],
    // B · 4da2c93e8d14
    "quests.q_earn_minutes.involvedCharacterIds": ["coach","jun","nori"],
    // B · 441dd7851dc6
    "quests.q_earn_minutes.involvedLocationIds": ["kosei_gym","film_room"],
    // B · 919735dd01e9
    "quests.q_earn_minutes.knownRewardCopy": "Une place de titulaire, et l’avis de quelqu’un d’autre dessus.",
    // B · 41f332ae4b56
    "quests.q_the_road.title": "La Route",
    // B · b78fa1c83717
    "quests.q_the_road.summary": "Cinq écoles entre ici et les Nationals, et un des cinq qui sont partis est dans chacune.",
    // B · 7fcc0be2ad9c
    "quests.q_the_road.kind": "PRINCIPALE",
    // B · 422eec60ab4b
    "quests.q_the_road.discoverWhen.flagsSet": ["dans_l’équipe"],
    // B · ed7d7cf4da2b
    "quests.q_the_road.steps.seiran.playerCopy": "Académie Seiran. Rei Amagi marque quarante points sans célébrer.",
    // B · c12881fad4bd
    "quests.q_the_road.steps.seiran.directorNotes": "Le premier des cinq. Rei est un problème de score pur : pas de solution de système, quelqu’un doit le garder. Perdre ici est normal et ouvre l’arc d’entraînement plutôt que de finir quoi que ce soit.",
    // B · c7aaad1f608b
    "quests.q_the_road.steps.seiran.succeedWhen.flagsSet": ["played :rei"],
    // B · 5a7bacae2571
    "quests.q_the_road.steps.seiran.rewards.flags": ["knows :the_five_are_real"],
    // B · 81a1c15b67aa
    "quests.q_the_road.steps.hakuba.playerCopy": "Hakuba West. Tsubame Kirisawa rend quatre autres joueurs injouables.",
    // B · d994f67fd9db
    "quests.q_the_road.steps.hakuba.directorNotes": "Un problème de passes, pas de tirs. La défendre ne sert à rien ; la solution est d’empêcher tous ceux qu’elle cherche. Dai ne parlera pas dans le bus.",
    // B · c7aaad1f608b
    "quests.q_the_road.steps.hakuba.enterWhen.flagsSet": ["played :rei"],
    // B · 40baad50dacb
    "quests.q_the_road.steps.hakuba.succeedWhen.flagsSet": ["played :tsubame"],
    // B · 6635c40d58a2
    "quests.q_the_road.steps.hakuba.rewards.flags": ["knows :tsubame_side"],
    // B · 2a097fdb6145
    "quests.q_the_road.steps.tessen.playerCopy": "Tessen Industrial. Gora Vance mesure deux mètres seize et le cercle lui appartient.",
    // B · fa6e93d3d000
    "quests.q_the_road.steps.tessen.directorNotes": "Un mur physique. Rien ne passe près de lui, donc le jeu doit se faire ailleurs. Il est gentil avec Bo tout le long, ce que personne n’attend.",
    // B · 40baad50dacb
    "quests.q_the_road.steps.tessen.enterWhen.flagsSet": ["played :tsubame"],
    // B · 9bfcf3575338
    "quests.q_the_road.steps.tessen.succeedWhen.flagsSet": ["played :gora"],
    // B · f0fadc76c607
    "quests.q_the_road.steps.tessen.rewards.flags": ["knows :denda_existed"],
    // B · c2b2ac20385a
    "quests.q_the_road.steps.onda.playerCopy": "Onda Commercial. Mikael Sorrel a regardé chaque minute que tu as jouée.",
    // B · b90d5235e284
    "quests.q_the_road.steps.onda.directorNotes": "C’est le match où le scouting paie. Tout ce sur quoi le joueur s’est appuyé toute la saison, Mikael l’a filmé et le supprimera dans le premier quart-temps. Le match se joue sur ce qu’ils font ensuite.",
    // B · 9bfcf3575338
    "quests.q_the_road.steps.onda.enterWhen.flagsSet": ["played :gora"],
    // B · 6c1230b17621
    "quests.q_the_road.steps.onda.succeedWhen.flagsSet": ["played :mikael"],
    // B · 264216e58cb9
    "quests.q_the_road.steps.onda.rewards.abilities": ["face_up"],
    // B · ab9f1b6ce7d6
    "quests.q_the_road.steps.kurogane.playerCopy": "Kurogane. Yuki Hoshizawa, et ce qu’il s’est passé en mars dernier que personne ne te dira.",
    // B · 8c122e6e3d00
    "quests.q_the_road.steps.kurogane.directorNotes": "Le dernier avant les Nationals. À ce stade, le joueur devrait soit savoir ce que disait le rapport, soit être à une question de le découvrir.",
    // B · 6c1230b17621
    "quests.q_the_road.steps.kurogane.enterWhen.flagsSet": ["played :mikael"],
    // B · d11cf803d5c7
    "quests.q_the_road.involvedCharacterIds": ["rei","tsubame","gora","mikael","yuki"],
    // B · 19d77d671ef4
    "quests.q_the_road.involvedLocationIds": ["away_seiran","away_hakuba","away_tessen","away_onda","away_kurogane"],
    // B · 051f2471d365
    "quests.q_the_road.knownRewardCopy": "Les Nationals, et que le programme existe encore en mars.",
    // B · cca161e7f6c9
    "quests.q_why_they_left.title": "Pourquoi ils sont partis",
    // B · ebcdd5461aa1
    "quests.q_why_they_left.summary": "Tout le monde dans cette école donne la même réponse, mais personne ne te regarde en la donnant.",
    // B · 7fcc0be2ad9c
    "quests.q_why_they_left.kind": "PRINCIPALE",
    // B · d7c7473eec00
    "quests.q_why_they_left.discoverWhen.flagsSet": ["knows :the_team"],
    // B · 021ab822bd90
    "quests.q_why_they_left.steps.the_name.playerCopy": "Découvre qui entraînait Kosei avant Torakawa.",
    // B · a5b1058aba4d
    "quests.q_why_they_left.steps.the_name.directorNotes": "Personne ne prononce le nom de Denda. Les banderoles s’arrêtent à la bonne année, la vitrine à trophées a un trou, et Bo dira volontiers ce que tout le monde évite.",
    // B · d6ddba3461ba
    "quests.q_why_they_left.steps.the_report.playerCopy": "Récupère ce qui a été déposé en mars.",
    // B · ddf5ac7ced33
    "quests.q_why_they_left.steps.the_report.directorNotes": "Nori a une copie depuis mars et attend que quelqu’un pose une question qui montre qu’il sait déjà presque tout.",
    // B · f0fadc76c607
    "quests.q_why_they_left.steps.the_report.enterWhen.flagsSet": ["knows :denda_existed"],
    // B · 314550807f14
    "quests.q_why_they_left.steps.the_report.succeedWhen.hasItems": ["denda_report"],
    // B · 35726f317ed4
    "quests.q_why_they_left.steps.the_report.rewards.flags": ["knows :what_happened"],
    // B · 9f22f8ed93c0
    "quests.q_why_they_left.steps.what_you_do_with_it.playerCopy": "Décide ce que tu fais de ce que tu sais maintenant.",
    // B · 16b7da53ceb5
    "quests.q_why_they_left.steps.what_you_do_with_it.directorNotes": "Il n’y a pas de bonne réponse et l’histoire ne donne pas d’indication. Dire la vérité à l’équipe change l’ambiance. Dire à l’école change les chances du programme. Ne rien dire est une vraie option avec de vrais coûts.",
    // B · 35726f317ed4
    "quests.q_why_they_left.steps.what_you_do_with_it.enterWhen.flagsSet": ["knows :what_happened"],
    // B · cf93b21d95a7
    "quests.q_why_they_left.involvedCharacterIds": ["nori","coach","yuki","gora","dai"],
    // B · ddbbb80dcab4
    "quests.q_why_they_left.involvedLocationIds": ["film_room","kosei_school","away_kurogane"],
    // B · 7e78ddd38584
    "quests.q_why_they_left.knownRewardCopy": "Ce qui s’est vraiment passé en mars.",
    // B · cc4170218307
    "quests.q_kai.title": "La Passe",
    // B · d13b142d73f9
    "quests.q_kai.summary": "Kai Sumire voit les choses deux secondes avant tout le monde et a trop peur pour les faire.",
    // B · 552c0b7f83c2
    "quests.q_kai.kind": "SECONDAIRE",
    // B · cd26d81e446d
    "quests.q_kai.discoverWhen.flagsSet": ["parlé :kai"],
    // B · 58112c4ff337
    "quests.q_kai.steps.get_him_to_throw_it.playerCopy": "Fais passer le ballon à Kai, celui qu’il n’arrive jamais à faire.",
    // B · 6c7692f1c4e2
    "quests.q_kai.steps.get_him_to_throw_it.directorNotes": "Il faut soit que quelqu’un soit toujours là où il regarde, soit qu’il entende que Tsubame l’a apprécié. Pas un discours de motivation — une raison.",
    // B · 8514ccdfeeba
    "quests.q_kai.involvedCharacterIds": ["kai","tsubame"],
    // B · f8aa0a4b5b79
    "quests.q_kai.involvedLocationIds": ["kosei_gym","the_roof"],
    // B · 781499024a45
    "quests.q_kai.knownRewardCopy": "Un meneur qui fait la passe.",
    // B · 4cd414362e0a
    "tendencies.drive.label": "Percée",
    // B · 5079eb429c12
    "tendencies.drive.identity": "Slasher",
    // B · c72dbbd2d597
    "tendencies.drive.scoutedNote": "Ils savent que tu vas au cercle et connaissent ton épaule préférée.",
    // B · 4fb364e99448
    "tendencies.pullup.label": "Tir en suspension",
    // B · bcedd75c3ad5
    "tendencies.pullup.identity": "Shooter",
    // B · ec99c3e00dfb
    "tendencies.pullup.scoutedNote": "Ils te poussent toujours hors de la ligne dès que tu attrapes le ballon.",
    // B · f9873568c8e6
    "tendencies.post.label": "Dos au panier",
    // B · c3d8c043d6ea
    "tendencies.post.identity": "Scoreur dos au panier",
    // B · c4f92eb06dfc
    "tendencies.post.scoutedNote": "Ils te bloquent avant que tu atteignes la zone.",
    // B · a963bdfb061d
    "tendencies.dish.label": "Passe",
    // B · 3a961392da2c
    "tendencies.dish.identity": "Organisateur",
    // B · 781c6ddfc5f2
    "tendencies.dish.scoutedNote": "Ils ont arrêté d’aider tes coéquipiers. Ils veulent que tu tires.",
    // B · 96f6fb8f4399
    "tendencies.lockdown.label": "Marquage serré",
    // B · cd7a84925203
    "tendencies.lockdown.identity": "Stoppeur",
    // B · e9269e16bf17
    "tendencies.lockdown.scoutedNote": "Ils font toute leur attaque loin de toi.",
    // B · 5028e2d06b9c
    "tendencies.offball.label": "Mouvement sans ballon",
    // B · 97283a5c59db
    "tendencies.offball.identity": "Scoreur en mouvement",
    // B · c85aa86f8308
    "tendencies.offball.scoutedNote": "Ils changent tout pour que tu ne sortes jamais propre d’un écran.",
    // B · 489b146d049b
    "tendencies.board.label": "Rebond offensif",
    // B · a28fbf88ebab
    "tendencies.board.identity": "Récupérateur",
    // B · 32b03ab7b7e4
    "tendencies.board.scoutedNote": "Ils te collent dès que le ballon est en l’air.",
    // B · 0c563ce550a9
    "worldEvents.we_the_notice.publicCopy": "Quelqu’un a collé la lettre du conseil à l’intérieur de la porte du vestiaire, à hauteur des yeux, impossible de ne pas la lire. Personne ne veut dire qui.",
    // B · dd0268134d17
    "worldEvents.we_the_notice.directorNotes": "C’était Dai. Il ne le dira pas. La lettre donne la date de mars et la condition des Nationaux dans un langage aussi sec que possible.",
    // B · e69051d8dbd6
    "worldEvents.we_the_notice.setsFlags": ["sait :la_date_limite"],
    // B · ba9e96b77b54
    "worldEvents.we_the_draw.publicCopy": "Le tirage régional est affiché devant la salle des profs. Kosei est dans la moitié avec Seiran, Hakuba, Tessen, Onda et Kurogane. Tous les cinq. Quelqu’un rit, puis s’arrête.",
    // B · c4db14a58593
    "worldEvents.we_the_draw.directorNotes": "La route devient concrète ici. C’est le moment où la saison cesse d’être abstraite et devient cinq personnes précises.",
    // B · ce1f45abccf8
    "worldEvents.we_the_draw.setsFlags": ["sait :le_tirage"],
    // B · 422eec60ab4b
    "worldEvents.we_the_draw.requiresFlags": ["dans_l’équipe"],
    // B · 05003e222a7d
    "worldEvents.we_jun_snaps.publicCopy": "Jun Hasabe s’arrête en plein exercice, pose le ballon doucement et demande à l’entraîneur Torakawa d’expliquer les critères devant tout le monde.",
    // B · b7fe6a664af1
    "worldEvents.we_jun_snaps.directorNotes": "Il a raison de demander et elle ne fait pas semblant du contraire. La façon dont le joueur se comporte dans les trente secondes suivantes vaut plus que ce qu’ils font en match.",
    // B · 061d88c82b24
    "worldEvents.we_jun_snaps.setsFlags": ["jun_a_demandé_à_haute_voix"],
    // B · 176483dd952b
    "worldEvents.we_jun_snaps.cancelledByFlags": ["jun_est_avec_toi"],
    // B · 3fadc5de6fce
    "worldEvents.we_jun_snaps.requiresFlags": ["cinq_de_départ"],
    // B · 811c5bb979fa
    "worldEvents.we_bo_gets_it.publicCopy": "Bo Ferrand attrape la balle au-dessus du carré, la ramène au sol, et reste là, tenant la balle, l’air vraiment choqué. Le gymnase fait un bruit qu’il n’a pas fait depuis un an.",
    // B · af09918f66fc
    "worldEvents.we_bo_gets_it.directorNotes": "La première fois que quelque chose de bon arrive sur ce parquet depuis mars. Petit, et tout le monde le sent.",
    // B · 5ce95f16a727
    "worldEvents.we_bo_gets_it.setsFlags": ["bo_arrivé"],
    // B · d7c7473eec00
    "worldEvents.we_bo_gets_it.requiresFlags": ["connaît :l’équipe"],
    // B · 32247cb58d78
    "worldEvents.we_the_ankle.publicCopy": "Dai Okonkwo atterrit sur le pied de quelqu’un pendant un exercice où personne ne jouait vraiment, et le bruit que fait le gymnase, c’est celui de tout le monde qui fait le même calcul en même temps.",
    // B · 391177ae9316
    "worldEvents.we_the_ankle.directorNotes": "Une entorse haute à la cheville. Il va jouer malgré ça et empirer ; le laisser sur la touche coûte des matchs maintenant et le garde pour mars. Il n’y a pas d’option gratuite.",
    // B · 0f74503ee992
    "worldEvents.we_the_ankle.setsFlags": ["dai_blessé"],
    // B · ce1f45abccf8
    "worldEvents.we_the_ankle.requiresFlags": ["connaît :le_tirage"],
    // B · 00c25ecd25a6
    "worldEvents.we_scouts_arrive.publicCopy": "Deux personnes que tu ne reconnais pas sont debout au fond du gymnase avec des badges autour du cou, et aucune ne s’est assise.",
    // B · 43408106498c
    "worldEvents.we_scouts_arrive.directorNotes": "Le circuit a entendu parler de quelqu’un à Kosei. Si c’est ce joueur-là dépend de ce qu’il a vraiment fait.",
    // B · eba6c3022e63
    "worldEvents.we_scouts_arrive.setsFlags": ["scouts_à_l’observation"],
    // B · c7aaad1f608b
    "worldEvents.we_scouts_arrive.requiresFlags": ["joué :rei"],
    // B · d77ebfcebe44
    "promises.p_the_program.kind": "FINALE",
    // B · 585190406a2f
    "promises.p_the_program.label": "S’il y a une équipe ici en mars",
    // B · 0ceab53cf958
    "promises.p_the_program.seedHint": "La lettre du conseil sur la porte du vestiaire, dans un langage trop sec pour ce qu’elle dit.",
    // B · 5e7837c4a584
    "promises.p_the_program.payoffHint": "Les Nationaux, ou un dernier match dans un gymnase vide, et dans les deux cas six personnes qui étaient là.",
    // B · e82d9dc4b3fa
    "promises.p_why_they_left.kind": "MYSTÈRE",
    // B · 1fbd426b74b5
    "promises.p_why_they_left.label": "Ce qui s’est vraiment passé en mars dernier",
    // B · 1b482b23eccf
    "promises.p_why_they_left.seedHint": "Tout le monde donne la même réponse à propos des cinq et personne ne te regarde en la donnant.",
    // B · 4e8a3c5d5609
    "promises.p_why_they_left.payoffHint": "Yuki a déposé un rapport sur l’entraîneur Denda, l’école l’a enterré, et a laissé cinq ados porter le blâme.",
    // B · f8b4a6708d82
    "promises.p_who_you_become.kind": "THÈME",
    // B · c10f63842c30
    "promises.p_who_you_become.label": "Le type de joueur que tu deviens",
    // B · b97b0e47622a
    "promises.p_who_you_become.seedHint": "L’entraîneuse Torakawa refuse de te dire ce qu’elle attend de toi.",
    // B · 796795653a71
    "promises.p_who_you_become.payoffHint": "Quelqu’un le nomme à voix haute, et c’est une description de ce que tu as vraiment fait.",
    // B · 63a719ec7f2d
    "promises.p_getting_solved.kind": "RIVALITÉ",
    // B · 5f04605f985c
    "promises.p_getting_solved.label": "La nuit où quelqu’un a toute ta technique filmée",
    // B · 280c5d4cead3
    "promises.p_getting_solved.seedHint": "Nori dit, sans émotion, qu’il n’est pas le seul dans la préfecture à avoir une caméra.",
    // B · 350d47faac90
    "promises.p_getting_solved.payoffHint": "Mikael Sorrel te retire ce que tu sais faire de mieux en un quart-temps, et tu dois devenir quelqu’un d’autre.",
    // B · 445cd8deebc2
    "promises.p_jun.kind": "RELATION",
    // B · aa6307c8f681
    "promises.p_jun.label": "Le coéquipier dont tu as pris la place",
    // B · 322c82491838
    "promises.p_jun.seedHint": "Jun Hasabe ne te serre pas la main et reste parfaitement poli.",
    // B · f64048647201
    "promises.p_jun.payoffHint": "Soit il devient la raison pour laquelle tu es bon, soit il a raison à ton sujet et tout le monde le voit.",
    // B · 211fcc730068
    "endings.end_nationals.name": "Le programme continue",
    // B · f8b8333fe7bc
    "endings.end_nationals.rarity": "RARE",
    // B · 801930643981
    "endings.end_nationals.requires.flagsSet": ["qualifié"],
    // B · 9d431ddc4dff
    "endings.end_nationals.condition": "Kosei a atteint les Nationaux, donc la condition du conseil est remplie et le programme survit. Joue ça quand la saison est vraiment finie, pas au moment de la qualification — l’important, c’est ce qui vient après, pas le buzzer.",
    // A · 610fb4a6b776
    "endings.end_nationals.epilogue": "La condition du conseil a été remplie et personne à l’école n’en parle plus. Le gymnase est réservé pour la saison prochaine. Ceux qui sont restés ont eu ce qu’ils cherchaient, et les cinq partis sont ailleurs, en train d’entendre parler de ça.",
    // B · 4709fbd421cf
    "endings.end_nationals.hint": "Tous les chemins vers les Nationaux passent par un des cinq.",
    // B · e868403f4873
    "endings.end_season_over.name": "À deux points près",
    // B · c9d08ae5d876
    "endings.end_season_over.rarity": "COURANT",
    // B · 232aba9d5b9d
    "endings.end_season_over.requires.flagsSet": ["season_over"],
    // B · 801930643981
    "endings.end_season_over.requires.flagsUnset": ["qualified"],
    // B · 159284eaf9b6
    "endings.end_season_over.condition": "La saison s’est terminée sans qualification. Le programme ferme en mars. Ne pas adoucir ça et ne pas chercher de faille — l’histoire, c’est ce que ces gens font la dernière nuit d’une chose qui se termine, et c’est la fin qu’ils ont le droit d’avoir.",
    // A · b0e1a14adfb0
    "endings.end_season_over.epilogue": "Le conseil n’a pas besoin de se réunir de nouveau. Quelqu’un enlève les bannières en avril, et les terminales qui n’ont jamais commencé un match qu’ils n’avaient pas à commencer sont les derniers à quitter le gymnase.",
    // B · 3186c88efa66
    "endings.end_captain.name": "Celui qu’ils Suivent",
    // B · 734e45c160cf
    "endings.end_captain.rarity": "PEU COMMUN",
    // B · 3fadc5de6fce
    "endings.end_captain.requires.flagsSet": ["starting_five"],
    // B · 4d0ca3dd4ad4
    "endings.end_captain.condition": "L’équipe est à ce joueur maintenant, que quelqu’un ait dit ou non le mot capitaine. Accessible avec n’importe quel résultat — il ne faut pas avoir gagné pour être la personne vers qui la pièce se tourne.",
    // A · a9083f4b7f37
    "endings.end_captain.epilogue": "Personne ne vote là-dessus. C’est devenu une évidence en février que le regroupement attend que tu parles, et que Torakawa a arrêté d’expliquer les choses deux fois.",
    // B · 251bd6a9cbd6
    "endings.end_captain.hint": "Le regroupement a commencé à t’attendre.",
    // B · f9b2c6705f14
    "endings.end_transfer.name": "Plus Personne à Entraîner",
    // B · 734e45c160cf
    "endings.end_transfer.rarity": "PEU COMMUN",
    // B · c95f7812a36e
    "endings.end_transfer.requires.flagsSet": ["scouts_watching","left_the_map"],
    // B · 26f3e767023c
    "endings.end_transfer.condition": "Le joueur a été vu, puis est parti. C’est ce que les cinq ont fait, de l’intérieur. Écris-le sans jugement — c’est une vraie chose qu’un adolescent de seize ans fait quand une meilleure école l’appelle, et ceux qui restent ont le droit d’être furieux.",
    // A · 515fe09fe232
    "endings.end_transfer.epilogue": "Les papiers prennent une semaine. Quelqu’un à Kosei l’apprend via un groupe de discussion. Quelle que soit l’histoire officielle, ce ne sera pas la vraie, celle que tu connaissais déjà.",
    // B · 1e6391bca31e
    "endings.end_collapse.name": "Six Devinrent Quatre",
    // B · f8b8333fe7bc
    "endings.end_collapse.rarity": "RARE",
    // B · 07472018955c
    "endings.end_collapse.requires.flagsSet": ["jun_is_against_you","dai_hurt"],
    // B · c085ed6f7965
    "endings.end_collapse.condition": "L’équipe s’est effondrée avant que la saison ne puisse finir — des gens ont arrêté de venir, et ceux qui venaient ont arrêté de parler. Accessible que le joueur en soit la cause ou non. Ne fais pas s’excuser quelqu’un à la fin, sauf si ça serait naturel.",
    // A · ec5ea15df821
    "endings.end_collapse.epilogue": "La défaite par forfait est enregistrée comme telle. Il n’y a pas de réunion ni de discours, juste un entraînement où quatre personnes attendent vingt minutes puis rentrent chez elles.",
    // B · e04610be3017
    "endings.end_reconciliation.name": "Ce Qui S’est Vraiment Passé",
    // B · f7fc172f729a
    "endings.end_reconciliation.rarity": "UNIQUE",
    // B · 4ba73a424c33
    "endings.end_reconciliation.requires.flagsSet": ["knows :denda_existed","knows :gora_was_the_example"],
    // B · f2535cf39bb8
    "endings.end_reconciliation.condition": "Le joueur a découvert pourquoi les cinq sont partis, de suffisamment de côtés pour que ce ne soit plus la version d’une seule personne. Indépendant du résultat de la saison : ça peut arriver une année qui finit en mars. La raison appartient à l’histoire et n’est flatteuse pour personne.",
    // A · 57b6129b5230
    "endings.end_reconciliation.epilogue": "L’histoire officielle reste l’histoire officielle, parce que personne n’a de raison de la corriger. Mais ceux qui savent savent, et l’un des cinq arrête de répondre au téléphone.",
    // B · 42df0f7e9265
    "endings.end_reconciliation.hint": "Quelqu’un a démissionné le même mois et personne ne prononce son nom.",
    // B · fee51c1dd963
    "endings.end_quit.name": "Tu Arrêtes de Venir",
    // B · 734e45c160cf
    "endings.end_quit.rarity": "PEU COMMUN",
    // B · b0eff3470103
    "endings.end_quit.requires.flagsSet": ["left_the_map"],
    // B · eba6c3022e63
    "endings.end_quit.requires.flagsUnset": ["scouts_watching"],
    // B · 29011b30b2f9
    "endings.end_quit.condition": "Le joueur a arrêté. Ce n’est pas un échec ni une mauvaise fin — écris le soulagement précis et la perte précise de ça, et laisse ceux qui voulaient qu’il reste être blessés sans que ce soit une leçon.",
    // A · 670f0b810d7c
    "endings.end_quit.epilogue": "Kosei termine la saison à six. Ton nom figure sur une feuille d’équipe dans un dossier que personne n’ouvre. Certains après-midis de mars, tu remarques que tu n’es nulle part en particulier à quinze heures trente.",
    // A · 422c982d8714
    "archetypes.arch_streetball.name": "Jamais Entraîné",
    // B · d4217aa641a5
    "archetypes.arch_streetball.role": "Gestion du ballon et créativité",
    // A · 0c2de75bae25
    "archetypes.arch_streetball.summary": "Tu as appris sur un terrain en plein air sans arbitre. Ton maniement est vrai et tes habitudes sont mauvaises, et l’entraîneur te dira ce qui est quoi.",
    // A · 8d4c883268e2
    "archetypes.arch_streetball.playstyle": ["Créatif","Maîtrise du ballon","Indiscipliné"],
    // A · 42a0af937607
    "archetypes.arch_streetball.blurb": "Personne ne t’a jamais appris à faire ça correctement, alors tu t’es débrouillé à ta façon, et il se trouve que ta façon bat la plupart des joueurs.",
    // A · 72016739c256
    "archetypes.arch_gym_rat.name": "Accro au gymnase",
    // B · 4ffd1daa8ba2
    "archetypes.arch_gym_rat.role": "Tirs et endurance",
    // A · d2d7856cbc80
    "archetypes.arch_gym_rat.summary": "Tu n’es pas le plus doué dans une pièce mais tu n’as jamais été dépassé par l’effort. Ton tir est fiable et tes jambes ne lâchent pas.",
    // A · 4abd5a3011bd
    "archetypes.arch_gym_rat.playstyle": ["Tir","Inlassable","Pas explosif"],
    // A · bd3190b16818
    "archetypes.arch_gym_rat.blurb": "Quatre cents tirs par jour depuis tes onze ans, dans un gymnase qui t’a laissé venir parce que le gardien t’aimait bien.",
    // A · cac597eb4a63
    "archetypes.arch_late.name": "Grand tardif",
    // B · 6594f3a1442e
    "archetypes.arch_late.role": "Taille et défense",
    // A · 9d1e2da5cff5
    "archetypes.arch_late.summary": "Tu étais le petit jusqu’à dix-huit mois. Tu joues encore comme un arrière et tu mesures maintenant un mètre quatre-vingt-dix-huit, ce que personne n’a encore su gérer.",
    // A · 7b67181e7404
    "archetypes.arch_late.playstyle": ["Grand","Défensif","Vous l’apprends encore"],
    // A · 576c65629190
    "archetypes.arch_late.blurb": "Tu as passé quatre ans à apprendre à survivre en étant le plus petit sur le terrain, puis tu as cessé de l’être.",
    // A · 9516cdab5ff5
    "archetypes.arch_analyst.name": "A tout regardé",
    // B · 6ed912fbd449
    "archetypes.arch_analyst.role": "Lecture du jeu",
    // A · aa207e184c3f
    "archetypes.arch_analyst.summary": "Tu as regardé plus de matchs de basket que n’importe qui dans cette école, sans presque jamais jouer. Tu sais où va la balle avant même de pouvoir l’atteindre.",
    // A · d4fde8f93787
    "archetypes.arch_analyst.playstyle": ["Cérébral","Passe","Physiquement en retrait"],
    // A · e982a8cc2843
    "archetypes.arch_analyst.blurb": "Tu peux nommer la combinaison qu’ils lancent dès la première percée. Mais tu n’as jamais vraiment fait de regroupement en vrai.",
    // B · d4327cd0250d
    "setupFields.displayName.label": "Quel nom est inscrit dans ton dos ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · 0689f7d04542
    "setupFields.displayName.placeholder": "ex. Sora Kimura",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 3a6240a26696
    "setupFields.pronouns.placeholder": "ex. iel",
    // B · ecca980e9efc
    "setupFields.archetype.label": "Comment as-tu appris à jouer ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHETYPE",
    // B · 344c36d79ee5
    "setupFields.archetype.helpText": "D’où tu viens, ce qui détermine tes attributs et ton entraînement. Ça ne fixe PAS ta position — personne ici n’en a une. Le genre de joueur que tu deviens dépend de ce que tu essaies vraiment sur le terrain, pendant la saison, et ça peut être n’importe quoi. Ce choix est fixe pour cette partie ; ce que tu deviens ne l’est pas.",
    // B · 7fe3cd7124d0
    "setupFields.worldKnowsAboutYou.label": "Est-ce que quelqu’un à Kosei a déjà entendu parler de toi ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · a0a752c18781
    "setupFields.worldKnowsAboutYou.helpText": "La plupart des joueurs arrivent sans réputation. C’est normal et ça ne pose aucun problème.",
    // B · 414803916627
    "setupFields.worldKnowsAboutYou.placeholder": "ex. J’ai joué un an dans un lycée à deux préfectures d’ici et je suis parti en plein milieu de la saison, sans vraiment expliquer pourquoi.",
    // B · 619b299a6588
    "setupFields.why_here.label": "Pourquoi Kosei, parmi tous les lycées ?",
    // B · b6a31c665c0b
    "setupFields.why_here.kind": "CHOIX",
    // B · aceabd3cfac6
    "setupFields.why_here.helpText": "Ça montre ce que tu risques de perdre si le programme ferme en mars.",
    // B · 13dc3c9277a5
    "setupFields.why_here.options.nowhere_else.label": "Aucun autre lycée ne voulait de toi",
    // B · 59dcf1e743f6
    "setupFields.why_here.options.saw_them.label": "Tu as vu l’ancienne équipe jouer une fois, et ça ne t’a jamais quitté",
    // B · 4f903684aee0
    "setupFields.why_here.options.family.label": "Ta famille a déménagé ici, tu n’as pas eu ton mot à dire",
    // B · 27cf10e10e59
    "setupFields.why_here.options.the_challenge.label": "Tu as entendu dire que le programme allait mourir, et ça t’a intrigué",
    // B · f6093d6587c4
    "setupFields.appearance.label": "Qu’est-ce que les gens remarquent en premier ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · cba51bcf2dd7
    "setupFields.appearance.placeholder": "ex. Gaucher, et environ dix centimètres plus grand que ce que les gens attendent de dos.",
    // B · 3aa4328667d6
    "protagonist.kind": "VIDE",
    // A · 8a613dbc45ba
    "opening": "Le gymnase sent le polish pour sol, et le chauffage n’a pas tourné depuis mars.\n\nIl y a six personnes dedans. Un garçon très grand tient un ballon comme si on le lui avait filé par erreur. Un premier année qui doit pas peser cinquante kilos est sous le panier, en train de lancer des passes parfaites à personne. Un troisième année en maillot réversible Kosei court déjà vers toi, la main tendue, en prononçant ton nom comme s’il s’y était entraîné.\n\nL’entraîneuse Torakawa est au bord du terrain, les bras croisés, sans venir vers vous.\n\n« Bon, » dit-elle quand le grand garçon laisse enfin tomber le ballon. « Chasubles contre débardeurs, trois contre trois, et j’aimerais voir le nouveau faire enfin quelque chose. »\n\nPersonne ici ne sait ce que tu sais faire. Et, pour être honnête, toi non plus.",
    // A · 58ecb4cc5865
    "openingSuggestions": ["Je prends le ballon et fonce direct sur celui qui me garde. Pas de passe, pas de coup monté — juste lui, maintenant.","Je lâche vite le ballon, je vais me placer là où je peux servir, et je regarde lequel de ces six peut vraiment attraper une passe.","Je choisis le meilleur joueur ici et je me colle à lui. « Toute la séance. Chaque action. On va voir ça. »"],
  },
});
