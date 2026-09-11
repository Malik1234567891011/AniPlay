import { registerWorldText } from '@aniplay/contracts';

/**
 * The Unbound, in French.
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
  storyId: "story_unbound",
  text: {
    // A · b4a9815a3e27
    "title": "The Unbound",
    // A · 0ec7247d723e
    "fantasyLabel": "Ton école a été dissoute. Pas toi.",
    // A · 80cd2e8046ca
    "hook": "Ton école a été dissoute et ses élèves dispersés. Toi, personne n’a encore décidé ce qu’il allait faire de toi.",
    // A · 6f2321dc0d56
    "premise": "Ici, tout le monde entraîne sa respiration — l’énergie que le corps porte — en formes, les techniques qu’un combattant peut utiliser. Cinq écoles, dans la ville fluviale d’Anvar Reach, enseignent ça, et chaque enfant est lié à l’une d’elles à quatorze ans, pour la vie.\n\nIl y a six mois, ton école a été dissoute. Le Concordat qui gère les cinq autres a tranché que ton maître avait appris une forme interdite. Il a scellé les portes et dispersé les élèves comme du mobilier.\n\nTu es allé au Kiln, qui n’entraîne rien de ce que tu connais. Tu y es en probation, donc invité qui peut être renvoyé, et tu dois mériter ta place complète avant le bilan de fin d’année, sinon tu repars bredouille.\n\nTon maître insiste, il ne l’a jamais enseignée. Quelqu’un l’a fait, parce que cette forme a été utilisée trois fois hors de ces murs cette année, et chaque fois ça a causé une mort qu’on n’explique pas.\n\nTu as donc deux objectifs. Gagner ta place dans une école qui ne t’a pas demandé, et découvrir qui a vraiment enseigné cette forme, avant que le Concordat finisse d’examiner le cas de l’homme qui nie.",
    // A · b599b43178ba
    "mechanicsChips": ["Liberté construite","Pouvoirs éveillés","Écoles rivales","Travail à contrat","Formes interdites"],
    // A · 38472fd0d79f
    "creatorNote": "La moitié de ce que ton personnage finira par faire n’apparaît pas sur l’écran de création. Ça s’apprend, ça se réveille au pire moment, ou ça s’écrit là où ça ne devrait pas être. Deux joueurs ne doivent jamais avoir la même liste de capacités.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · 2fc09333e057
    "rules.hardCanon": ["Le Souffle s’entraîne, il ne s’hérite pas. Ce qui s’hérite, c’est la facilité à pencher vers un côté.","Une forme utilisée sur quelqu’un laisse une trace en lui que tout combattant entraîné peut lire pendant environ un jour.","La Concorde gouverne les cinq écoles. Elle n’a aucun combattant et n’en a jamais eu besoin.","Une ouverture — un changement dans le regard — ne peut pas s’enseigner, s’acheter ou se simuler. Elle arrive ou pas.","La Maison Oyan est scellée, pas démolie. Tout ce qu’elle contient y est encore."],
    // A · 5e7800b2b79e
    "rules.toneGuide": "Matins frais, air froid du fleuve, adolescents à fond dans leur art. Les entraînements sont répétitifs et physiques ; la puissance est silencieuse jusqu’au moment où elle explose. Les rivalités sont réelles et presque toujours affectueuses. Pas de discours en plein combat.",
    // B · 3341db65aeea
    "skills.breathwork.name": "Souffle",
    // B · 5dbc8bb102ac
    "skills.breathwork.attribute": "arcane",
    // B · 78fe8cdf0799
    "skills.breathwork.description": "Bouger sa propre énergie sans la perdre.",
    // B · 8f59b41c7cc1
    "skills.hand_forms.name": "Formes à mains nues",
    // B · 97081b4b4792
    "skills.hand_forms.attribute": "puissance",
    // B · 7573f0f31050
    "skills.hand_forms.description": "Tout ce qui se fait à mains nues, au corps à corps.",
    // B · cca72ec69ed2
    "skills.blade_forms.name": "Formes à lame",
    // B · 7ce3b6387340
    "skills.blade_forms.attribute": "agilité",
    // B · 3443dae20369
    "skills.blade_forms.description": "Acier court, dégainé tard et rangé tôt.",
    // B · 1d6dd5db9e6a
    "skills.thrown_forms.name": "Formes lancées",
    // B · 7ce3b6387340
    "skills.thrown_forms.attribute": "agilité",
    // B · d22c69ede09b
    "skills.thrown_forms.description": "Ce qui quitte ta main et t’appartient encore.",
    // B · 4e8c314c4953
    "skills.stillness.name": "Immobilesse",
    // B · 4c84c2c842d0
    "skills.stillness.attribute": "volonté",
    // B · b3bb1ea04f4b
    "skills.stillness.description": "Maintenir une forme ouverte pendant que quelqu’un te frappe.",
    // B · 34c65840f4da
    "skills.reading.name": "Lecture",
    // B · a8c1fa8269c3
    "skills.reading.attribute": "esprit",
    // B · a8f1380c7d9d
    "skills.reading.description": "Voir la trace qu’une forme laisse, et qui l’a laissée.",
    // B · 72a55afdb2b2
    "skills.stealth.name": "Discrétion",
    // B · 7ce3b6387340
    "skills.stealth.attribute": "agilité",
    // B · 07b7b39e6b91
    "skills.stealth.description": "La ville la nuit, et les endroits où elle est surveillée.",
    // B · 04890a36609e
    "skills.persuasion.name": "Persuasion",
    // B · cfb7a15645c3
    "skills.persuasion.attribute": "présence",
    // B · bff2d8a407aa
    "skills.persuasion.description": "Obtenir une réponse claire de quelqu’un payé pour ne pas en donner.",
    // B · f03ce9f211c3
    "skills.lore.name": "Savoir de l’école",
    // B · a8c1fa8269c3
    "skills.lore.attribute": "esprit",
    // B · aa55adf24330
    "skills.lore.description": "Qui a enseigné à qui, et ce qu’ils ont cessé d’enseigner.",
    // B · b3f73706ed78
    "skills.endurance.name": "Endurance",
    // B · 4c84c2c842d0
    "skills.endurance.attribute": "volonté",
    // B · 62139c333f87
    "skills.endurance.description": "La quatrième heure du même exercice.",
    // B · ea0b35a4dc9f
    "resources.health.name": "Santé",
    // B · 34e8ec1ac388
    "resources.health.polarity": "BON_HAUT",
    // B · 73be5c38be7d
    "resources.health.zeroStateConsequence": "Tu tombes. Le Four conserve une pièce pour ça et une très courte mémoire de qui l’a utilisée.",
    // B · 1a3c168896b6
    "resources.health.color": "#FF5B69",
    // B · ae15483c317b
    "resources.breath.name": "Souffle",
    // B · 34e8ec1ac388
    "resources.breath.polarity": "BON_HAUT",
    // B · 1cced17b7175
    "resources.breath.zeroStateConsequence": "Vide. Les formes ne tiendront pas, et tous les entraînés verront que ça ne tiendra pas.",
    // B · 94e56ebb6b77
    "resources.breath.color": "#6CC8FF",
    // B · 46adc881193f
    "resources.standing.name": "Statut",
    // B · 34e8ec1ac388
    "resources.standing.polarity": "BON_HAUT",
    // B · cfd91a72d8ae
    "resources.standing.zeroStateConsequence": "Ta période d’essai est réévaluée en avance, et ces révisions anticipées tournent toujours mal.",
    // B · 35e13f5571ca
    "resources.standing.color": "#5FD3A8",
    // B · f0924a6aaad6
    "resources.strain.name": "Tension",
    // B · a34adbda2422
    "resources.strain.polarity": "BON_BAS",
    // B · 857a37692abd
    "resources.strain.zeroStateConsequence": "Reposé. Rien ne s’effiloche.",
    // B · ad1dcb42b294
    "resources.strain.color": "#F6BE55",
    // A · 3fc3ce4623f8
    "items.oyan_band.name": "Bande de la maison Oyan",
    // B · aede8ea259cc
    "items.oyan_band.tags": ["quête","vêtement"],
    // B · 458f8214a910
    "items.oyan_band.description": "Un simple bracelet gris d’une école que le Concord a déclaré disparue. Le porter n’est pas illégal. Ça se remarque juste.",
    // B · e8e4664e19fc
    "items.oyan_band.loreText": "La teinture vient de la vase du fleuve. Toute la ville connaît cette couleur sans jamais le dire.",
    // B · 697e4406b544
    "items.oyan_band.icon": "band",
    // A · ba8b338b65f3
    "items.probation_slip.name": "Feuillet de probation",
    // B · 061625d9bd60
    "items.probation_slip.tags": ["quête","document"],
    // B · 981dbed488aa
    "items.probation_slip.description": "Une carte tamponnée par le Kiln, listant ce que tu peux faire ici et ce que tu ne peux pas. La deuxième liste est plus longue.",
    // B · 06cd6f669f7d
    "items.probation_slip.loreText": "Il y a une ligne en bas pour la signature d’un élève à part entière. Elle est vide.",
    // B · b6e5c4d2d440
    "items.probation_slip.icon": "card",
    // A · cb96e4adfdc2
    "items.river_salt.name": "Sel du fleuve",
    // B · 1467deed44a7
    "items.river_salt.tags": ["consommable"],
    // B · fcd707d09dfd
    "items.river_salt.description": "Du gros sel du fleuve, pris sous la langue. Calme le souffle poussé trop loin.",
    // B · 8f9e7189ce76
    "items.river_salt.loreText": "Vendu sur les marches par des gens qui ne devraient pas le faire.",
    // B · 9a345730c3b0
    "items.river_salt.icon": "salt",
    // A · a8b07bf35af5
    "items.wrapped_blade.name": "Lame Courte Enveloppée",
    // B · 4d94618e9d1d
    "items.wrapped_blade.tags": ["lame"],
    // B · 110688b7cca2
    "items.wrapped_blade.equipSlot": "main",
    // B · ffdbec2af219
    "items.wrapped_blade.description": "Une lame d’élève, le tranchant enveloppé de lin parce que les probationnaires n’ont pas le droit d’avoir une vraie.",
    // B · 33d3daade90d
    "items.wrapped_blade.loreText": "L’enveloppement tient quatre secondes. Tout le monde le sait aussi.",
    // B · e56e483d3fba
    "items.wrapped_blade.icon": "blade",
    // A · 47beb9833586
    "items.trace_glass.name": "Lorgnette",
    // B · f3a60c587a13
    "items.trace_glass.tags": ["outil"],
    // B · 110688b7cca2
    "items.trace_glass.equipSlot": "main",
    // B · 5b524be82d2b
    "items.trace_glass.description": "Un disque de verre sombre, taille paume. Posé sur une trace fraîche, il montre la forme qui l’a laissée.",
    // B · 13c1c5db72f4
    "items.trace_glass.loreText": "Fourniture standard pour les lecteurs du Concord. Pas pour toi.",
    // B · 5b4a520fa042
    "items.trace_glass.icon": "glass",
    // A · 67ca0a65db1e
    "items.sealed_page.name": "Page d’une Salle Scellée",
    // B · 061625d9bd60
    "items.sealed_page.tags": ["quête","document"],
    // B · 2fcca0332fbc
    "items.sealed_page.description": "Une page d’un registre d’entraînement, écrite par ton maître, listant un élève qu’il a formé en secret et jamais enregistré.",
    // B · b76c0996465a
    "items.sealed_page.loreText": "Le nom a été repassé deux fois avec le même stylo, ce n’est pas la façon de corriger une erreur.",
    // B · 861424bc7e8c
    "items.sealed_page.icon": "page",
    // A · 758df41c4e12
    "abilities.settle.name": "S’installer",
    // B · ae55d331ff03
    "abilities.settle.tags": ["universel","utilitaire"],
    // B · 51d1b256058a
    "abilities.settle.description": "Remets ton souffle là où il doit être avant que ça te coûte quelque chose.",
    // B · 43afef8b429c
    "abilities.settle.targetRule": "SOI",
    // A · db19d2e33f38
    "abilities.read_trace.name": "Lire la Trace",
    // B · ae55d331ff03
    "abilities.read_trace.tags": ["universel","utilitaire"],
    // B · b569a1694670
    "abilities.read_trace.description": "Regarde ce qu’une forme a laissé dans une personne ou un lieu et dis quelle forme c’était.",
    // B · 39d896e20aec
    "abilities.read_trace.targetRule": "SINGLE",
    // B · a8c1fa8269c3
    "abilities.read_trace.check.attribute": "esprit",
    // A · ca1c42282f78
    "abilities.ember_palm.name": "Paume de Braise",
    // B · 0751adbf1fe2
    "abilities.ember_palm.tags": ["braise","offensif"],
    // B · c4e7ea763299
    "abilities.ember_palm.description": "Chaleur portée dans la main et transmise à quelque chose au moment du contact.",
    // B · 39d896e20aec
    "abilities.ember_palm.targetRule": "SINGLE",
    // B · 97081b4b4792
    "abilities.ember_palm.check.attribute": "force",
    // A · 457e4ef8e7ef
    "abilities.tide_turn.name": "Marée Montante",
    // B · 8a44e4d8a8a5
    "abilities.tide_turn.tags": ["vague","défensif"],
    // B · 12ca6579e8d4
    "abilities.tide_turn.description": "Prends la force qui arrive vers toi et donne-lui une autre direction.",
    // B · 39d896e20aec
    "abilities.tide_turn.targetRule": "SINGLE",
    // B · 7ce3b6387340
    "abilities.tide_turn.check.attribute": "agilité",
    // A · 680e643490ac
    "abilities.stone_root.name": "Enracinement",
    // B · 3fa412540745
    "abilities.stone_root.tags": ["pierre","défensif"],
    // B · 39bab4290ba7
    "abilities.stone_root.description": "Fais-toi, brièvement, partie du sol sur lequel tu te tiens.",
    // B · 43afef8b429c
    "abilities.stone_root.targetRule": "SOI",
    // B · 4c84c2c842d0
    "abilities.stone_root.check.attribute": "volonté",
    // A · ce8febc3675e
    "abilities.gale_step.name": "Pas de Gale",
    // B · f953e973ef46
    "abilities.gale_step.tags": ["rafale","déplacement"],
    // B · 248478b6b711
    "abilities.gale_step.description": "Deux pas de distance qui n’étaient pas là il y a un instant.",
    // B · 43afef8b429c
    "abilities.gale_step.targetRule": "SOI",
    // B · 7ce3b6387340
    "abilities.gale_step.check.attribute": "agilité",
    // A · c77a16e230c1
    "abilities.thrown_line.name": "Ligne Lancée",
    // B · da4ab70a319c
    "abilities.thrown_line.tags": ["universel","à distance"],
    // B · 4e8ea6f88b11
    "abilities.thrown_line.description": "Quelque chose quitte ta main avec ton souffle encore attaché.",
    // B · 39d896e20aec
    "abilities.thrown_line.targetRule": "SINGLE",
    // B · 7ce3b6387340
    "abilities.thrown_line.check.attribute": "agilité",
    // A · 4c5539139e81
    "abilities.quiet_opening.name": "L’Ouverture Silencieuse",
    // B · ef21c0d5ca59
    "abilities.quiet_opening.tags": ["éveillé","vue"],
    // B · 21fcdc64c1d4
    "abilities.quiet_opening.description": "Tes yeux changent. Pendant quelques secondes, tu vois ce qu’une personne s’apprête à faire, environ un souffle avant qu’elle le fasse.",
    // B · 39d896e20aec
    "abilities.quiet_opening.targetRule": "SINGLE",
    // B · 5dbc8bb102ac
    "abilities.quiet_opening.check.attribute": "arcane",
    // A · a87d0bab0830
    "abilities.lantern_opening.name": "L’Ouverture de la Lanterne",
    // B · ef21c0d5ca59
    "abilities.lantern_opening.tags": ["éveillé","vue"],
    // B · 371e1833b9ab
    "abilities.lantern_opening.description": "Tes yeux changent dans l’autre sens. Tu arrêtes de voir les gens et tu commences à voir où leur souffle est concentré.",
    // B · c44e6dd70059
    "abilities.lantern_opening.targetRule": "AUCUN",
    // B · 5dbc8bb102ac
    "abilities.lantern_opening.check.attribute": "arcane",
    // A · b0a202c8e8d6
    "abilities.the_unnamed_form.name": "La Forme sans Nom",
    // B · 09dd9939fcc5
    "abilities.the_unnamed_form.tags": ["interdit","offensif"],
    // B · baf9a996149a
    "abilities.the_unnamed_form.description": "La forme qui a fait fermer ton école. Elle ne frappe pas un corps. Elle prend le contrôle du souffle à l’intérieur et l’arrête.",
    // B · 39d896e20aec
    "abilities.the_unnamed_form.targetRule": "SINGLE",
    // B · 5dbc8bb102ac
    "abilities.the_unnamed_form.check.attribute": "arcane",
    // A · 827dfe187fc4
    "locations.kiln_yard.name": "La Cour du Kiln",
    // A · f3e419f8fe94
    "locations.kiln_yard.shortName": "Kiln",
    // B · 63ada6b80a69
    "locations.kiln_yard.description": "Une place close de terre rouge tassée derrière les fours du Kiln, chaude même avant le lever du soleil. Deux cents élèves s’y entraînent en service et la terre n’a jamais le temps de refroidir.",
    // B · 56617771b495
    "locations.kiln_yard.stageImage": "story_unbound/stage_kiln_yard",
    // B · ac3d034cc39e
    "locations.kiln_yard.ambientSfx": ["feu_bas","pas_terre"],
    // A · 940e9b87c5fb
    "locations.river_stair.name": "L’Escalier du Fleuve",
    // A · 53d7084bc41c
    "locations.river_stair.shortName": "Escalier",
    // B · 6f878d03b818
    "locations.river_stair.description": "Quatre-vingt-dix marches de pierre larges, du haut de la ville jusqu’à l’eau, où les élèves des cinq écoles se croisent deux fois par jour en faisant semblant de ne pas se regarder. Tout ce qui est officieux dans cette ville se passe sur ces marches.",
    // B · 98b42876283c
    "locations.river_stair.stageImage": "story_unbound/stage_river_stair",
    // B · c2824e3f8402
    "locations.river_stair.ambientSfx": ["eau","murmure_foule"],
    // A · bf74add6b1c6
    "locations.contract_office.name": "Le Bureau des Contrats",
    // A · c1f1fcd9cb41
    "locations.contract_office.shortName": "Bureau",
    // B · a87693228674
    "locations.contract_office.description": "Un long comptoir, cinq files d’attente, et un tableau des contrats que les écoles ont accepté de laisser aux étudiants. La préposée derrière le comptoir n’appartient à aucune des cinq, c’est tout l’intérêt.",
    // B · da692d4ab5a5
    "locations.contract_office.stageImage": "story_unbound/stage_contract_office",
    // B · 7951fe49d22d
    "locations.contract_office.ambientSfx": ["papier","voix_basses"],
    // A · 819f018f107e
    "locations.night_market.name": "Le Marché de Nuit",
    // A · 97a809eb8689
    "locations.night_market.shortName": "Marché",
    // B · dcf7d1649272
    "locations.night_market.description": "Quatre rues de toiles tendues au bord de l’eau qui n’ouvrent qu’après la tombée de la nuit, vendant nourriture, sel, et parfois un objet qu’une école confisquerait. Personne ne demande ici à quel groupe tu appartiens.",
    // B · 880148546a45
    "locations.night_market.stageImage": "story_unbound/stage_night_market",
    // B · 79fabd1a02f3
    "locations.night_market.ambientSfx": ["bourdonnement_foule","grésillement"],
    // A · 76c0283f1434
    "locations.oyan_house.name": "Maison Oyan",
    // A · 3e1849c5c4e0
    "locations.oyan_house.shortName": "Oyan",
    // B · 3be0ab190e09
    "locations.oyan_house.description": "Ton ancienne école, portes scellées d’un bandeau du Concord et d’un cachet de cire, tout est encore à l’intérieur. Le sol d’entraînement est visible à travers la grille de la fenêtre et n’a pas été balayé depuis la décision.",
    // B · e0244c23d184
    "locations.oyan_house.stageImage": "story_unbound/stage_oyan_house",
    // B · e261670c57d6
    "locations.oyan_house.ambientSfx": ["vent_faible","craquement_bois"],
    // A · 3e698d281eeb
    "locations.concord_hall.name": "Salle de la Concorde",
    // A · b051ec9359c5
    "locations.concord_hall.shortName": "Concorde",
    // B · 48827b6cbd11
    "locations.concord_hall.description": "Là où cinq écoles qui préfèreraient ne pas se mettre d’accord le font quand même par écrit. Les visiteurs attendent sur un banc à l’entrée et se font dire, poliment, exactement combien de temps ils vont patienter.",
    // B · 274cfb637ecf
    "locations.concord_hall.stageImage": "story_unbound/stage_concord_hall",
    // B · 557f05003af9
    "locations.concord_hall.ambientSfx": ["écho_pierre","horloge"],
    // A · fc8bb8a4d75d
    "locations.confinement_house.name": "Maison de Confinement",
    // A · 337983f429d0
    "locations.confinement_house.shortName": "Confinement",
    // B · cd1b9659187a
    "locations.confinement_house.description": "Trois pièces derrière le Concord où les personnes en attente d’une décision sont gardées confortablement et sans compromis. Il y a du thé, une fenêtre, et une porte qui s’ouvre selon la décision de quelqu’un d’autre.",
    // B · 4569a9551d11
    "locations.confinement_house.stageImage": "story_unbound/stage_confinement_house",
    // B · 2b585df93a41
    "locations.confinement_house.ambientSfx": ["horloge","tribunal_lointain"],
    // B · 72d3a058c1bb
    "characters.renna.name": "Renna Vosk",
    // A · 51e331db9860
    "characters.renna.role": "Instructrice du Kiln, elle gère ta période d’essai",
    // A · c9bf7aa46aec
    "characters.renna.cardBlurb": "L’instructrice qui décide si le Kiln te garde. Elle ne voulait pas de toi et elle le dit — c’est la chose la plus honnête qu’on ait vue ici.",
    // B · aee35f364a88
    "characters.renna.pronouns": "elle",
    // A · a75390909f8e
    "characters.renna.publicTraits": ["Franche","Débordée","Allergique aux sentiments"],
    // B · 1857a5763c2b
    "characters.renna.hiddenDrives": ["Elle s’est opposée à l’accueil des étudiants d’Oyan et a perdu, elle est déterminée à ne pas avoir tort.","Elle s’est entraînée deux ans sous ton maître et n’en a jamais parlé à personne au Kiln."],
    // B · 52e31040de6c
    "characters.renna.values": ["Un travail qui se voit","Dire ce qu’elle pense une fois pour toutes","Que les étudiants ne meurent pas sur des contrats"],
    // B · b7c2e18c40ea
    "characters.renna.fears": ["Signer pour quelqu’un qui n’est pas prêt","Être interrogée sur la maison Oyan en public"],
    // A · 014412ef23e0
    "characters.renna.socialStyle": "Directe, rapide et juste. Elle te reprend devant tout le monde et te défend avec la même franchise.",
    // B · ef8d9eafbdf0
    "characters.renna.boundaries": ["Ne pas enseigner une forme d’Oyan sur le sol du Kiln","Ne pas signer une probation plus tôt pour être appréciée"],
    // B · 7360850f6bff
    "characters.renna.goals": ["Faire passer cette promotion à l’évaluation","Découvrir ce que son ancien maître a vraiment fait"],
    // B · 29ef7e577a64
    "characters.renna.secrets.renna_trained_under_sedge.fact": "Renna a passé deux ans comme étudiante de Sedge Oyan avant de rejoindre le Kiln.",
    // B · 47558a04be8d
    "characters.renna.secrets.renna_trained_under_sedge.visibility": "NPC_PRIVATE",
    // B · d55e33f9873a
    "characters.renna.secrets.renna_trained_under_sedge.revealHint": "Se révèle à 35+ de Confiance, ou immédiatement si le joueur exécute une forme clairement d’Oyan devant elle.",
    // B · 0cbd3dd27f5c
    "characters.renna.secrets.renna_knows_the_shape.fact": "Renna a lu une des trois traces elle-même et sait qu’elle n’a pas été faite par une main d’Oyan.",
    // B · 47558a04be8d
    "characters.renna.secrets.renna_knows_the_shape.visibility": "NPC_PRIVATE",
    // B · 5921304cf527
    "characters.renna.secrets.renna_knows_the_shape.revealHint": "Nécessite 45+ de Respect et la loupe en possession du joueur.",
    // A · 777b2fe9bccb
    "characters.renna.speechStyle": "Des phrases impératives, pas de remplissage. Elle t’appelle « stagiaire » jusqu’à ce qu’elle décide autrement, puis utilise ton prénom sans expliquer ce changement.",
    // A · cfb808e24393
    "characters.renna.topics": ["ma période d’essai","l’évaluation","les formes Oyan","ce qu’une trace peut révéler"],
    // A · 5601bbd27ba6
    "characters.renna.voiceSamples": ["Tu n’es pas un élève ici. Tu es une invitée avec un laisser-passer. Entraîne-toi comme ça et je réglerai ça.","Je ne t’ai pas demandé. Ce n’est pas la même chose que vouloir que tu partes, alors arrête de chercher ça.","Refais-le. Plus lentement. Je veux voir d’où tu l’as appris."],
    // B · b88b506bdf09
    "characters.renna.appearance": "Trentenaire, avant-bras toujours rouges à force de frotter contre le mur du four, cheveux coupés courts au couteau.",
    // B · 82c8c4bdd43f
    "characters.renna.visualHook": "Les deux avant-bras brûlés d’un rouge brique uniforme jusqu’au coude à force d’années contre le mur du four, et les cheveux coupés à la hâte au rasoir.",
    // B · 23efadbf0a23
    "characters.renna.silhouette": "Compacte et carrée, bras croisés haut sur la poitrine, assez proche pour corriger ta posture sans bouger.",
    // B · bccef71e147c
    "characters.renna.artSeed": "renna-vosk-v1",
    // B · e218595f2535
    "characters.renna.portrait": "story_unbound/renna",
    // B · 5989f9cd9356
    "characters.renna.expressions": ["neutre","sévère","évaluant","impatient","approuvant","sur ses gardes"],
    // B · 64374242f72b
    "characters.renna.knowledgeScope": ["faction_kiln","faction_concord"],
    // B · c4a90aff7cbe
    "characters.renna.gates.renna_teaches_you.label": "Renna va t’apprendre quelque chose hors programme",
    // B · 55a54e80451a
    "characters.renna.gates.renna_teaches_you.kind": "CONFIANCE",
    // B · e0bf14b9ab0c
    "characters.renna.gates.renna_teaches_you.requires.flagsSet": ["renna_ta_vu_travailler"],
    // B · 9d9010cc0fdc
    "characters.renna.gates.renna_teaches_you.requires.flagsUnset": ["renna_a_perdu_foi"],
    // B · 6e6ebed11054
    "characters.renna.gates.renna_signs_you.label": "Renna signera ta ligne d’étudiant à plein temps",
    // B · 9e8ae18bf8bf
    "characters.renna.gates.renna_signs_you.kind": "ALLIANCE",
    // B · ef7793163c41
    "characters.renna.gates.renna_signs_you.requires.flagsSet": ["assessment_passed"],
    // B · 97bd3c9e6fac
    "characters.renna.combatant.tags": ["instructeur","non létal"],
    // B · 6c560df8bfda
    "characters.tam.name": "Tam Ashgrove",
    // A · 7a90baa9d6d9
    "characters.tam.role": "Élève à plein temps au Kiln, troisième année",
    // A · 9bff96ef1b06
    "characters.tam.cardBlurb": "L’élève dont tu as pris la place. Il n’est pas cruel, ce qui est encore pire.",
    // B · fcca6b746d0b
    "characters.tam.pronouns": "il/lui",
    // A · ecf6e50e4a8d
    "characters.tam.publicTraits": ["Charmant","Compétitif","Vraiment doué"],
    // B · cf9ec76b4a9a
    "characters.tam.hiddenDrives": ["Sa famille a payé sa place et il n’a jamais été sûr que le Kiln l’aurait pris sinon.","Il veut se faire battre honnêtement par quelqu’un, une fois, pour savoir où il en est vraiment."],
    // B · 66f2b94759fb
    "characters.tam.values": ["Être apprécié","Gagner proprement","Ne pas être son père"],
    // B · fa6610baed2a
    "characters.tam.fears": ["Qu’il soit là seulement à cause de l’argent","Perdre devant Renna"],
    // A · 1c9630d29034
    "characters.tam.socialStyle": "Chaleureux en public, taquin en privé, et complètement sérieux quand ça fait mal.",
    // B · 88a604b9179d
    "characters.tam.boundaries": ["Ne te dénoncera pas pour quelque chose qu’il ferait aussi","Ne truquera pas un combat"],
    // B · c209680575e5
    "characters.tam.goals": ["Être premier à l’évaluation","Obtenir un premier contrat à son nom"],
    // B · bca01129b8ed
    "characters.tam.secrets.tam_bought_in.fact": "La place de Tam au Kiln a été obtenue par un paiement de sa famille.",
    // B · 47558a04be8d
    "characters.tam.secrets.tam_bought_in.visibility": "NPC_PRIVATE",
    // B · f1f210376103
    "characters.tam.secrets.tam_bought_in.revealHint": "Seulement à partir de 40 de confiance, et jamais où un autre élève pourrait entendre.",
    // B · 615ebc58d594
    "characters.tam.secrets.tam_saw_the_third.fact": "Tam était sur l’escalier la nuit de la troisième mort et a vu qui est parti.",
    // B · 47558a04be8d
    "characters.tam.secrets.tam_saw_the_third.visibility": "NPC_PRIVATE",
    // B · d914973e421d
    "characters.tam.secrets.tam_saw_the_third.revealHint": "Nécessite 50 de confiance ou de le battre dans un vrai combat.",
    // A · b1aa7de13f01
    "characters.tam.speechStyle": "Rapide, drôle, toujours un peu provocateur. Il dit ton prénom sans arrêt. Il baisse la com’ dès qu’il y a du sang.",
    // A · 4b39b6736247
    "characters.tam.topics": ["l’évaluation","le Kiln","ce qui s’est passé dans l’escalier","ma famille"],
    // A · b9d70b7f30e8
    "characters.tam.voiceSamples": ["Oyan, c’est ça ? J’ai entendu dire que les formes sont jolies. Montre-m’en une jolie.","T’es pas mauvais. C’est un vrai compliment et je tiens à ce qu’il soit bien compris.","J’étais sur l’escalier cette nuit-là. Je l’ai jamais dit à personne, alors évite de me faire regretter."],
    // B · f443fa121cbe
    "characters.tam.appearance": "Vingt ans, grand, coupe de cheveux coûteuse en repousse, rouge du Kiln portée un peu trop bien.",
    // B · 7cbf81f95f73
    "characters.tam.visualHook": "Rouge du Kiln mieux taillé que celui de n’importe qui d’autre et une coupe de cheveux coûteuse trois mois après sa forme, en repousse irrégulière.",
    // B · 8a7be2959ea6
    "characters.tam.silhouette": "Grand et décontracté, mains lâches sur les côtés, debout avec le poids en arrière comme s’il avait déjà décidé de ne pas s’inquiéter.",
    // B · 6e975edefb57
    "characters.tam.artSeed": "tam-ashgrove-v1",
    // B · fd6378d7bcbd
    "characters.tam.portrait": "story_unbound/tam",
    // B · 11ce1c5466ef
    "characters.tam.expressions": ["neutre","souriant","compétitif","piqué","sérieux","gêné"],
    // B · c029e1aa7799
    "characters.tam.knowledgeScope": ["faction_kiln"],
    // B · 909d67e931c6
    "characters.tam.gates.tam_takes_you_seriously.label": "Tam s’entraînera sérieusement avec toi",
    // B · 55a54e80451a
    "characters.tam.gates.tam_takes_you_seriously.kind": "CONFIANCE",
    // B · 379c0c58cd92
    "characters.tam.gates.tam_takes_you_seriously.requires.flagsUnset": ["tam_humiliated"],
    // B · bb5bf8b9421d
    "characters.tam.gates.tam_tells_you.label": "Tam te dira ce qu’il a vu sur l’escalier",
    // B · 9e8ae18bf8bf
    "characters.tam.gates.tam_tells_you.kind": "ALLIANCE",
    // B · 4ce59c36a547
    "characters.tam.gates.tam_tells_you.requires.flagsSet": ["attacked :tam"],
    // B · 379c0c58cd92
    "characters.tam.gates.tam_tells_you.requires.flagsUnset": ["tam_humiliated"],
    // B · 764a5b7d06a8
    "characters.tam.combatant.tags": ["étudiant","spectaculaire"],
    // B · 67089b4588d2
    "characters.sera.name": "Sera Ilm",
    // A · d4f505fbb3c4
    "characters.sera.role": "Élève du clan Oyan, envoyée au Long Silence",
    // A · 96f36e226d0c
    "characters.sera.cardBlurb": "La seule autre personne à avoir grandi dans ta guilde. Elle a atterri quelque part qui lui va, sans trop savoir ce qu’elle en pense.",
    // B · aee35f364a88
    "characters.sera.pronouns": "elle",
    // A · 689eb4b0aacb
    "characters.sera.publicTraits": ["Sur ses gardes","Drôle à voix basse","Lente à s’engager"],
    // B · 02884e132354
    "characters.sera.hiddenDrives": ["Elle réussit bien au Long Quiet et se sent comme une traîtresse pour ça.","Elle était la dernière élève de la maison Oyan avant qu’elle soit scellée, et elle a emporté quelque chose avec elle."],
    // B · 5754c7873674
    "characters.sera.values": ["Les gens d’avant","Ne pas te mentir spécifiquement","Sortir de là"],
    // B · 930a0b8ad1bd
    "characters.sera.fears": ["Être forcée de choisir entre les deux écoles à voix haute","Ce qui est sur la page qu’elle a prise"],
    // A · ae6d19b0ac24
    "characters.sera.socialStyle": "Elle en dit moins qu’elle ne sait, puis finit par tout lâcher d’un coup quand elle estime que tu l’as mérité.",
    // B · b4729c8c4f5e
    "characters.sera.boundaries": ["Ne retournera pas dans la maison Oyan","Ne te laissera pas prendre la faute pour elle"],
    // B · bf3315d5e8a9
    "characters.sera.goals": ["Réussir sa propre évaluation sans se faire remarquer","Décider quoi faire de la page"],
    // B · c46bf435cdbc
    "characters.sera.secrets.sera_has_the_page.fact": "Sera a pris une page des dossiers privés d’entraînement hors de la maison Oyan la nuit où elle a été scellée.",
    // B · 47558a04be8d
    "characters.sera.secrets.sera_has_the_page.visibility": "NPC_PRIVATE",
    // B · f473aff8b3bb
    "characters.sera.secrets.sera_has_the_page.revealHint": "Confiance 45+, ou si le joueur est surpris en train d’essayer d’entrer à la Maison Oyan et qu’elle doit se justifier.",
    // B · d74f8de6596b
    "characters.sera.secrets.sera_reported.fact": "Sera a répondu honnêtement aux questions d’un lecteur du Concord, et une partie de la décision repose sur ce qu’elle a dit.",
    // B · 47558a04be8d
    "characters.sera.secrets.sera_reported.visibility": "NPC_PRIVÉ",
    // B · e2efe86708cd
    "characters.sera.secrets.sera_reported.revealHint": "Révélation tardive. Nécessite une confiance de 60+ et que la page soit déjà ouverte.",
    // A · 1e9823181cce
    "characters.sera.speechStyle": "Calme, précise et sèche. Elle utilise ton prénom comme on le fait quand c’est la seule chose qui reste d’avant dans la pièce.",
    // A · 3b65b082ade8
    "characters.sera.topics": ["Clan Oyan","Long Silence","ce qu’elle a pris","le maître"],
    // A · 58049aa8f71e
    "characters.sera.voiceSamples": ["Tu portes toujours le bandeau. Moi, je l’ai mis dans un tiroir et je pense souvent à ce tiroir.","Le Silence me va bien. J’aimerais pourtant que ça ne soit pas le cas.","Pose-moi la vraie question. Ça fait longtemps que tu tournes autour, depuis l’escalier."],
    // B · c71658718809
    "characters.sera.appearance": "Dix-neuf ans, petite, cheveux gris Long Quiet, un bandeau Oyan conspicu à son poignet.",
    // B · b7abee9f250e
    "characters.sera.visualHook": "Cheveux gris Long Quiet portés parfaitement, et une bande de peau pâle et non exposée sur son poignet gauche là où quelque chose se trouvait.",
    // B · bb4a3121b860
    "characters.sera.silhouette": "Petite et très immobile, mains derrière le dos, debout juste à la limite d’un groupe plutôt qu’à l’intérieur.",
    // B · f5603865694e
    "characters.sera.artSeed": "sera-ilm-v1",
    // B · 15e172b2627b
    "characters.sera.portrait": "story_unbound/sera",
    // B · 466b4dc5eb1d
    "characters.sera.expressions": ["neutre","vigilante","sèche","coupable","chaleureuse","fermée"],
    // B · c9de6b65c0b5
    "characters.sera.knowledgeScope": ["faction_long_quiet","faction_oyan"],
    // B · 2226f3d2ed91
    "characters.sera.gates.sera_shows_the_page.label": "Sera te montrera ce qu’elle a pris",
    // B · 55a54e80451a
    "characters.sera.gates.sera_shows_the_page.kind": "CONFIANCE",
    // B · b2fdc9d36c30
    "characters.sera.gates.sera_shows_the_page.requires.flagsUnset": ["sera_brûlée"],
    // B · 823768c5ef61
    "characters.sera.gates.sera_stands_with_you.label": "Sera le dira devant le Concord",
    // B · 9e8ae18bf8bf
    "characters.sera.gates.sera_stands_with_you.kind": "ALLIANCE",
    // B · ea3c54f3b0b1
    "characters.sera.gates.sera_stands_with_you.requires.flagsSet": ["a_parlé :sera","a_la_page_scellée"],
    // B · 26f20082a90b
    "characters.sera.combatant.tags": ["évasive","silencieuse"],
    // B · 1ad2a21ff16c
    "characters.auber.name": "Lecteur Auber Kell",
    // A · 5c6dab0bd443
    "characters.auber.role": "Huissier du Concordat, chargé de la dissolution d’Oyan",
    // A · 4029150ed6f3
    "characters.auber.cardBlurb": "L’officiel qui a lu les traces et fermé ta guilde. Toujours poli, et le seul à avoir vu les trois.",
    // B · fcca6b746d0b
    "characters.auber.pronouns": "il/lui",
    // A · 38ddfa283132
    "characters.auber.publicTraits": ["Courtois","Précis","Jamais pressé"],
    // B · 81d54c4c7865
    "characters.auber.hiddenDrives": ["Il sait que la troisième trace ne correspond pas aux deux premières et l’a quand même enregistrée.","Il attend que quelqu’un le remarque, car il ne peut pas être celui qui le dit."],
    // B · b75f2c2ebbb7
    "characters.auber.values": ["Que le dossier soit complet","La procédure","Que sa propre signature ait du sens"],
    // B · 27eef2e626a7
    "characters.auber.fears": ["Avoir signé la mauvaise décision","La quatrième"],
    // A · 6e39da6e7a8e
    "characters.auber.socialStyle": "Il te donne toute son attention, répond précisément, et ne concède rien que tu n’avais déjà.",
    // B · 2b211d7b2b04
    "characters.auber.boundaries": ["Ne discutera pas d’une décision en cours avec un étudiant","Ne mentira jamais franchement"],
    // B · a2bedf4c1bf5
    "characters.auber.goals": ["Clore correctement l’affaire Oyan","Que quelqu’un lui pose la bonne question"],
    // B · 3fc3f62cd472
    "characters.auber.secrets.auber_third_trace.fact": "La troisième trace a été faite par une main différente des deux premières, et Auber l’a enregistrée comme la même.",
    // B · 47558a04be8d
    "characters.auber.secrets.auber_third_trace.visibility": "NPC_PRIVÉ",
    // B · 125b03470bf7
    "characters.auber.secrets.auber_third_trace.revealHint": "Seulement si le joueur lui apporte sa propre lecture, ou la lecture de Renna de la trace.",
    // B · e1b69995d411
    "characters.auber.secrets.auber_taught_once.fact": "Auber a étudié à la Maison Oyan pendant un an, il y a quarante ans, et ce n’est pas dans son dossier.",
    // B · 47558a04be8d
    "characters.auber.secrets.auber_taught_once.visibility": "NPC_PRIVÉ",
    // B · 5d02295fe632
    "characters.auber.secrets.auber_taught_once.revealHint": "Fin de partie. Nécessite la page scellée.",
    // A · 9ad4926c5cd4
    "characters.auber.speechStyle": "Des phrases complètes, posées. Il répète ta question à l’identique avant de répondre sur une version plus précise.",
    // A · faa979ca6265
    "characters.auber.topics": ["la décision","les trois traces","mon maître","ce qu’un lecteur peut prouver"],
    // A · 3a3a831e3259
    "characters.auber.voiceSamples": ["Tu demandes si je suis sûr. Je demande si tu m’as apporté quelque chose.","J’ai lu ce qui était devant moi et j’ai noté ce que j’ai lu. Les deux sont vrais.","Apporte-moi une lecture. Pas un avis, pas un ressenti. Une lecture."],
    // B · de2dd98a1334
    "characters.auber.appearance": "Soixante ans, petit, lunettes sur cordon, gris Concord sans aucune couleur d’école.",
    // B · 6b110582b5dc
    "characters.auber.visualHook": "Gris Concord sans aucune couleur d’école, et une paire de lunettes de lecture foncées portées relevées sur le front plutôt que sur les yeux.",
    // B · b9dbb7e51aad
    "characters.auber.silhouette": "Petit et droit, mains croisées devant, debout avec la patience de quelqu’un qui n’a jamais été en retard.",
    // B · 47d75a13f97f
    "characters.auber.artSeed": "auber-kell-v1",
    // B · 3982e1bf1cd1
    "characters.auber.portrait": "story_unbound/auber",
    // B · 458087b87864
    "characters.auber.expressions": ["neutre","courtois","précis","inquiet","fermé","soulagé"],
    // B · cca1d70c4462
    "characters.auber.knowledgeScope": ["faction_concord","faction_kiln","faction_long_quiet","faction_oyan"],
    // B · 7a626dbb05a3
    "characters.auber.gates.auber_hears_a_reading.label": "Auber examinera une lecture que tu lui apportes",
    // B · 55a54e80451a
    "characters.auber.gates.auber_hears_a_reading.kind": "CONFIANCE",
    // B · efe12643c8a8
    "characters.auber.gates.auber_hears_a_reading.requires.flagsSet": ["a_sa_propre_lecture"],
    // B · af231b0d99aa
    "characters.auber.gates.auber_reopens.label": "Auber va rouvrir la décision Oyan",
    // B · 9e8ae18bf8bf
    "characters.auber.gates.auber_reopens.kind": "ALLIANCE",
    // B · d09ca3126df8
    "characters.auber.gates.auber_reopens.requires.flagsSet": ["decision_en_question"],
    // B · 7b010fb579f5
    "factions.faction_kiln.name": "Le Fourneau",
    // B · a873fb1e4b71
    "factions.faction_kiln.description": "Chaleur et pression vers l’avant. Forme plus d’étudiants que les quatre autres réunis et en perd plus.",
    // B · a14f762272e9
    "factions.faction_kiln.allies": ["faction_concord"],
    // B · fe2bd62a8ef9
    "factions.faction_long_quiet.name": "Le Long Silence",
    // B · 3ab28a29dfdb
    "factions.faction_long_quiet.description": "Distance, patience et choses invisibles. Prend peu d’étudiants et ne dit jamais lesquels.",
    // B · c029e1aa7799
    "factions.faction_long_quiet.enemies": ["faction_kiln"],
    // B · e53633dbd82b
    "factions.faction_concord.name": "La Concorde",
    // B · 56a1fb802b36
    "factions.faction_concord.description": "Les cinq écoles sur le papier. Ne possède aucun combattant, décide tout, et n’a jamais haussé la voix.",
    // B · c029e1aa7799
    "factions.faction_concord.allies": ["faction_kiln"],
    // B · 76c0283f1434
    "factions.faction_oyan.name": "Maison Oyan",
    // B · 480c5d7c407b
    "factions.faction_oyan.description": "Ton école. Dissoute par décision, scellée à la cire, et toujours la première chose qu’on apprend sur toi.",
    // B · a14f762272e9
    "factions.faction_oyan.enemies": ["faction_concord"],
    // B · fad45a1f51b1
    "quests.q_the_opening.title": "Quelque chose qu’on ne t’a pas appris",
    // B · 0f0a474f5793
    "quests.q_the_opening.summary": "Tes yeux ont fait un truc au mauvais moment et tu veux savoir quoi.",
    // B · 552c0b7f83c2
    "quests.q_the_opening.kind": "SECONDAIRE",
    // B · 70f49f43371b
    "quests.q_the_opening.steps.step_awaken_the_opening.playerCopy": "Découvre ce qui s’est passé derrière tes yeux — et fais-le arriver à nouveau.",
    // B · 3df2772f5670
    "quests.q_the_opening.steps.step_awaken_the_opening.directorNotes": "C’est la seule entrée au Silence Ouvert, et elle est volontairement accessible de trois façons différentes : par un vrai combat, par quelqu’un qui l’a déjà vu, ou en lisant des traces jusqu’à ce que le schéma soit évident. Un joueur sans inclination en a besoin. Un joueur avec une inclination peut aussi la prendre, c’est rare. Ne la donne jamais ; fais-les aller la chercher.",
    // B · fe9919723ae6
    "quests.q_the_opening.steps.step_awaken_the_opening.rewards.abilities": ["silence_ouvert"],
    // B · c5f0f961f529
    "quests.q_the_opening.involvedCharacterIds": ["sera","auber","tam"],
    // B · bb8ec19512bc
    "quests.q_the_opening.involvedLocationIds": ["river_stair","kiln_yard","night_market"],
    // B · 46f7431456f9
    "quests.q_the_opening.knownRewardCopy": "Quoi que ce soit, fait exprès, la prochaine fois.",
    // B · dde397028c01
    "quests.q_probation.title": "Un invité avec un avertissement",
    // B · c2b3c56bc825
    "quests.q_probation.summary": "Transforme une période d’essai en place, avant que l’évaluation de l’année décide pour toi.",
    // B · 7fcc0be2ad9c
    "quests.q_probation.kind": "PRINCIPALE",
    // B · c1cab172f509
    "quests.q_probation.steps.step_first_shift.playerCopy": "Tiens ton premier service au Fourneau.",
    // B · eaa5b2835fc0
    "quests.q_probation.steps.step_first_shift.directorNotes": "Renna mesure si le joueur peut accepter une correction d’une école qui n’est pas la sienne. Utiliser une forme Oyan ici n’est pas interdit, mais ce sera vu et retenu — et la forme décide ce qu’elle note. Le Fourneau forme Ember. Un service chaud est banal ; un service pierre est têtu ; un service marée est ce qu’on leur a dit de ne pas enseigner. Chaque inclination passe. Pas tous de la même façon.",
    // B · 6d1f562a89c9
    "quests.q_probation.steps.step_earn_the_line.playerCopy": "Donne au Fourneau une raison de te garder.",
    // B · fa63acf53c25
    "quests.q_probation.steps.step_earn_the_line.directorNotes": "Quatre routes, et la construction du joueur décide lesquelles sont accessibles. Aucune n’est celle prévue. Un joueur qui prend un contrat et revient avec le travail fait est aussi valable qu’un qui gagne le sol.",
    // B · e0bf14b9ab0c
    "quests.q_probation.steps.step_earn_the_line.enterWhen.flagsSet": ["renna_ta_vu_travailler"],
    // B · 79aef8f97c12
    "quests.q_probation.involvedCharacterIds": ["renna","tam"],
    // B · a7129bc1844e
    "quests.q_probation.involvedLocationIds": ["kiln_yard","contract_office","river_stair"],
    // B · cfb27078aece
    "quests.q_probation.knownRewardCopy": "Une place d’étudiant à part entière avec une signature.",
    // B · 4f44f9ca1457
    "quests.q_three_traces.title": "Trois Traces",
    // B · 16346910ff1f
    "quests.q_three_traces.summary": "Une forme interdite a été utilisée trois fois. Découvre qui les a faites.",
    // B · 7fcc0be2ad9c
    "quests.q_three_traces.kind": "PRINCIPALE",
    // B · 6b08737adc73
    "quests.q_three_traces.steps.step_learn_to_read.playerCopy": "Apprends ce qu’une trace montre vraiment, avec quelqu’un qui sait la lire.",
    // B · 586bb117aa45
    "quests.q_three_traces.steps.step_learn_to_read.directorNotes": "Renna peut l’enseigner. Le marché aussi, mais mal et contre de l’argent. Auber ne l’enseignera pas et le dira poliment.",
    // B · 9093ec95bfac
    "quests.q_three_traces.steps.step_learn_to_read.succeedWhen.flagsSet": ["spoke :renna"],
    // B · 618faabb57e6
    "quests.q_three_traces.steps.step_learn_to_read.rewards.flags": ["can_read_traces"],
    // B · c332cf5b3763
    "quests.q_three_traces.steps.step_get_a_reading.playerCopy": "Obtiens ta propre lecture de l’un des trois.",
    // B · 5b56cbce0962
    "quests.q_three_traces.steps.step_get_a_reading.directorNotes": "Trois sources, trois prix. L’escalier est public et récent. Le marché vend une copie qui peut être fausse. La maison Oyan est scellée et y entrer est un vrai crime avec de vraies conséquences.",
    // B · 618faabb57e6
    "quests.q_three_traces.steps.step_get_a_reading.enterWhen.flagsSet": ["can_read_traces"],
    // B · 1d93aacfeabc
    "quests.q_three_traces.steps.step_show_auber.playerCopy": "Présente une lecture au lecteur Auber Kell.",
    // B · c15be8de6348
    "quests.q_three_traces.steps.step_show_auber.directorNotes": "Il attend ça et ne sera pas content. La façon dont la lecture a été obtenue change ce qu’il peut en faire — une lecture propre rouvre la décision, une volée fait accuser aussi le joueur.",
    // B · efe12643c8a8
    "quests.q_three_traces.steps.step_show_auber.enterWhen.flagsSet": ["has_own_reading"],
    // B · 2df52946ef9b
    "quests.q_three_traces.involvedCharacterIds": ["auber","renna","sera","tam"],
    // B · a78040ee1910
    "quests.q_three_traces.involvedLocationIds": ["concord_hall","river_stair","oyan_house","night_market"],
    // B · 819089870962
    "quests.q_three_traces.knownRewardCopy": "Une lecture que le Concord ne peut pas classer comme les autres.",
    // B · e82d9dc4b3fa
    "promises.promise_who_taught_it.kind": "MYSTÈRE",
    // B · 8f0ddd8f2c0c
    "promises.promise_who_taught_it.label": "Qui a vraiment enseigné la forme sans nom",
    // B · f8fb03ee8b20
    "promises.promise_who_taught_it.seedHint": "Trois morts, trois traces, et une décision qui les traite comme la même main.",
    // B · 5b49952dfeb4
    "promises.promise_who_taught_it.payoffHint": "La troisième ne correspond pas aux deux premières, et le lecteur qui l’a enregistrée le sait.",
    // B · f8b4a6708d82
    "promises.promise_your_build.kind": "THÈME",
    // B · 34f69260a235
    "promises.promise_your_build.label": "Ce que tu deviens",
    // B · c2bef294e886
    "promises.promise_your_build.seedHint": "Plus personne ne possède ta formation, et chacun a quelque chose à t’apprendre.",
    // B · d86694850087
    "promises.promise_your_build.payoffHint": "Un ensemble de formes que personne d’autre en ville n’a dans cette combinaison.",
    // B · 63a719ec7f2d
    "promises.promise_tam_rival.kind": "RIVALITÉ",
    // B · 02839e153d79
    "promises.promise_tam_rival.label": "Tam Ashgrove, à la place où tu essaies de te tenir",
    // B · 357392e9fef8
    "promises.promise_tam_rival.seedHint": "Il est le premier sur le sol du Kiln et te le fait savoir, bruyamment.",
    // B · 0cf0f2f1aeb8
    "promises.promise_tam_rival.payoffHint": "Il était sur l’escalier la nuit de la troisième mort, et te le dire lui coûte quelque chose.",
    // B · 445cd8deebc2
    "promises.promise_sera.kind": "RELATION",
    // B · ad392bad046e
    "promises.promise_sera.label": "Sera Ilm, la seule personne qui se souvient des mêmes pièces que toi",
    // B · 2f4923d15fdc
    "promises.promise_sera.seedHint": "Elle ne porte plus le bandeau et n’a pas expliqué pourquoi.",
    // B · 5940c02a646a
    "promises.promise_sera.payoffHint": "Elle a pris une page de la maison, et une partie de la décision repose sur ce qu’elle leur a dit.",
    // B · d77ebfcebe44
    "promises.promise_the_room.kind": "FINALE",
    // B · 49b794a93836
    "promises.promise_the_room.label": "La pièce où ils retiennent ton maître",
    // B · 560923d140bf
    "promises.promise_the_room.seedHint": "Derrière la salle du Concord, il y a une porte sans poignée à l’intérieur, et du thé pour deux sur la table.",
    // B · ffc5f0c0bc32
    "promises.promise_the_room.payoffHint": "Il répondra à toutes tes questions. C’est ça qui s’avère difficile.",
    // A · a19cab6d41df
    "archetypes.lean_ember.name": "Braise",
    // B · 2db94a6ad97a
    "archetypes.lean_ember.role": "Affinité feu — agressif",
    // A · 78974bca5e92
    "archetypes.lean_ember.summary": "De près et puissant. Tu transmets la chaleur à travers ce que tu frappes, et tu es assez fort pour tenir là où ça compte.",
    // A · c5500dffad65
    "archetypes.lean_ember.playstyle": ["Agressif","De près","Dégâts maximum"],
    // A · 8de0532835b1
    "archetypes.lean_ember.blurb": "Ton souffle est brûlant et ne demande qu’à traverser les choses. C’est proche de la façon dont le Fourneau s’entraîne déjà, ce qui pose problème.",
    // B · 8fe7b59561bc
    "archetypes.lean_ember.startingAbilities": ["ember_palm"],
    // A · 3b347e3b22f2
    "archetypes.lean_tide.name": "Marée",
    // B · b91dd449b3d7
    "archetypes.lean_tide.role": "Affinité eau — contre-attaquant",
    // A · 3c3efb9810c6
    "archetypes.lean_tide.summary": "Tu récupères la force qui arrive vers toi et tu la renvoies ailleurs. Tu es le plus fort quand tu laisses l’autre attaquer le premier.",
    // A · 62173b5f1808
    "archetypes.lean_tide.playstyle": ["Contre-attaque","Redirige la force","Rapide"],
    // A · 8504e048938d
    "archetypes.lean_tide.blurb": "Ton souffle préfère dévier plutôt que de s’opposer. Très dur à apprendre, très dur à affronter.",
    // B · 62b7c9a2469e
    "archetypes.lean_tide.startingAbilities": ["tide_turn"],
    // A · 44c6466e6907
    "archetypes.lean_stone.name": "Pierre",
    // B · 23919323f28e
    "archetypes.lean_stone.role": "Affinité terre — défensif",
    // A · 45cc41e3e133
    "archetypes.lean_stone.summary": "Tu t’enracines et deviens très dur à bouger, renverser ou dépasser. Lent, solide, et le dernier à tenir debout.",
    // A · b5a063d52572
    "archetypes.lean_stone.playstyle": ["Défensif","Difficile à bouger","Tiens plus longtemps que les autres"],
    // A · 8ce0f006040c
    "archetypes.lean_stone.blurb": "Ton souffle s’enfonce. Tu es plus lent que les autres et bien plus dur à déloger.",
    // B · 213ca174d374
    "archetypes.lean_stone.startingAbilities": ["stone_root"],
    // A · 855fb866a721
    "archetypes.lean_gale.name": "Coup de vent",
    // B · bc6316ea3998
    "archetypes.lean_gale.role": "Affinité vent — mobilité",
    // A · 76ffc3331fd0
    "archetypes.lean_gale.summary": "Tu bouges le premier et de loin. Le lean le plus rapide, et le seul qui peut attaquer à distance dès le départ.",
    // A · b90293a6fea6
    "archetypes.lean_gale.playstyle": ["Rapide","Évasif","Combat à distance"],
    // A · 27b7015f9a86
    "archetypes.lean_gale.blurb": "Ton souffle te guide avant même de bouger. C’est toi qui décides de la distance.",
    // B · 9880e7260967
    "archetypes.lean_gale.startingAbilities": ["gale_step","thrown_line"],
    // A · 6a2db3c25fbc
    "archetypes.lean_none.name": "Indécis",
    // B · f1bcde2a0376
    "archetypes.lean_none.role": "Pas encore d’affinité — le départ le plus dur",
    // A · 1aa0313f0245
    "archetypes.lean_none.summary": "Tu commences sans technique, avec l’esprit le plus affûté des cinq. Ta première capacité, ce sera une forme que tu découvres en cours de partie, pas une des quatre autres.",
    // A · 59f039a3df87
    "archetypes.lean_none.playstyle": ["Début difficile","Observer et analyser","Construire en jouant"],
    // A · 5ee99fa844fa
    "archetypes.lean_none.blurb": "Rien n’est fixé. Rare, maladroit, c’est pourquoi certains se retrouvent avec une forme qu’on n’a jamais vue.",
    // B · 8924ac369030
    "setupFields.displayName.label": "Quel nom est écrit sur le papier ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · f2cc3eb866d6
    "setupFields.displayName.placeholder": "ex. Ilan Oyan-Reth",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 5965ecf877b1
    "setupFields.pronouns.placeholder": "ex. elle/la",
    // B · bd735544b90c
    "setupFields.archetype.label": "Choisis un style de souffle",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHETYPE",
    // B · cc9201672415
    "setupFields.archetype.helpText": "Le travail du souffle, c’est la façon dont on se bat ici : tu pousses ton souffle dans une forme, et la forme décide ce que tu peux en faire. Ton inclinaison est la forme dans laquelle le tien se pose — elle détermine tes attributs, ton entraînement et ta première technique. Tu la gardes pour toute l’histoire, mais tu peux apprendre des techniques de n’importe quelle inclinaison plus tard, en te les faisant enseigner.",
    // B · 102e53659b4a
    "setupFields.worldKnowsAboutYou.label": "Que dit-on déjà de toi ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · d9f69e34d811
    "setupFields.worldKnowsAboutYou.placeholder": "ex. Je porte encore le bandeau Oyan, et tout le monde a décidé ce que ça veut dire sur moi.",
    // B · d947918a16d1
    "setupFields.origin.label": "Comment as-tu atterri à la maison Oyan ?",
    // B · b6a31c665c0b
    "setupFields.origin.kind": "CHOIX",
    // B · 2b89615e34b8
    "setupFields.origin.options.bound_normally.label": "Assigné à quatorze ans comme tout le monde",
    // B · dda80e39a633
    "setupFields.origin.options.taken_in.label": "Pris tard, hors des rangs",
    // B · f9a10abc89c1
    "setupFields.origin.options.family.label": "Ta famille est Oyan depuis trois générations",
    // B · 6be60f549bd9
    "setupFields.origin.options.chose_you.label": "Le maître t’a choisi sans jamais dire pourquoi",
    // B · f6093d6587c4
    "setupFields.appearance.label": "Qu’est-ce qu’on remarque en premier chez toi ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · e763e37acb12
    "setupFields.appearance.placeholder": "ex. Des rouges du Fourneau qui ne vont pas, et un bandeau gris que je n’ai pas enlevé.",
    // B · 3aa4328667d6
    "protagonist.kind": "VIDE",
    // A · b85828e23885
    "opening": "Le Kiln s’entraîne avant l’aube, et la terre du terrain est déjà chaude à travers tes chaussures.\n\nDeux cents élèves en rouge répètent un premier exercice en rangs serrés. Toi, tu es au fond, avec les mauvaises couleurs, une carte à la main qui précise ce que tu as le droit de faire ici.\n\nRenna Vosk parcourt la ligne, s’arrête devant toi, et lit ta carte sans la sortir de ta main.\n\n« En probation, » qu’elle dit. « Ça fait cinq ans qu’on t’a appris à bouger autrement, et pendant cette heure tu vas faire ça à ma manière. Si tu te plantes, je le dirai à voix haute. »\n\nPlus loin, Tam Ashgrove se retourne pour regarder, sans aucune malveillance, ce qui rend les choses encore plus pesantes.",
    // A · 72976406b749
    "openingSuggestions": ["Je me fonds dans le groupe et fais ça à sa façon, exactement pareil, en fermant ma gueule sur le reste.","Je garde la posture un instant et regarde Renna. « Et si je me plante deux fois ? J’aimerais bien savoir maintenant. »","Je passe par la version Oyan — plus lente, plus basse, pas adaptée à cette salle — et la laisse tout voir."],
  },
});
