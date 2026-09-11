import { registerWorldText } from '@aniplay/contracts';

/**
 * Primal Crown, in French.
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
  storyId: "story_primal_crown",
  text: {
    // A · aa00e7207489
    "title": "Primal Crown",
    // A · ef3ef7e6161b
    "fantasyLabel": "Les troupeaux avancent trop tôt. Quelqu’un va perdre.",
    // A · bcb77bbf27f4
    "hook": "Les grands troupeaux sont partis six semaines en avance, sur une route qu’aucun n’a prise depuis quarante ans. Les cinq peuples qui la partagent doivent se mettre d’accord en trois jours sur qui passe où.",
    // A · f8a6fff9ed65
    "premise": "Les coupes s’entrechoquent sur les tables du marché avant que personne ne comprenne pourquoi. Au-delà des tentes, cent mille animaux lèvent la tête au même instant, puis l’horizon tout entier commence à se déplacer vers le sud.\n\nLes grands troupeaux sont partis six semaines en avance, sur une route différente de celle de l’année dernière, parce que les montagnes tremblent depuis le printemps.\n\nCinq peuples se retrouvent à ce marché chaque saison pour décider qui traverse où. Ils ont maintenant trois jours pour redessiner un accord qui a mis quarante ans à se construire, et chacun est arrivé convaincu que c’était la faute d’un autre.\n\nCelui qui tiendra les corridors à l’arrivée des troupeaux contrôlera la viande, le bétail reproducteur, l’eau et le commerce pour une décennie. Les autres passeront l’hiver à mendier auprès de lui.\n\nTu es là avec ce que tu as : une monture ou pas, un peuple ou aucun, un nom qui ouvre des tentes ou qu’on n’a jamais entendu.\n\nQuelque chose tue aussi des animaux liés au nord, et les laisse là où ils tombent. Personne ne veut en parler avant d’avoir réglé la question des corridors, alors personne ne le fera.\n\nIl te faut décider, en trois jours, à qui de ces cinq tu préfères devoir.",
    // A · eb9fbc120626
    "mechanicsChips": ["Cinq peuples, cinq réputations","Les animaux ne sont pas des véhicules","Lier n’importe quoi, ou rien","La migration ne peut pas attendre","Un prédateur qui n’est pas un méchant"],
    // A · 7706a4207020
    "creatorNote": "Tu peux partir d’ici à dos de raptor, de tigre à dents de sabre, d’une bête des rivières, d’un animal qu’aucun mot ne désigne, ou à pieds. Ce que les cinq peuples décident pour les corridors est vraiment ouvert, et une partie où tu passes trois jours à commercer, partager le feu des autres et apprendre à connaître un animal est une vraie manière de jouer.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · e387b598e3d2
    "rules.hardCanon": ["La Grande Migration a commencé six semaines en avance et sur une route modifiée. C’est réel, causé par un mouvement volcanique, et personne au passage ne le sait encore.","Cinq peuples se rencontrent à Sunscar Crossing sous la loi du serment : Emberclaw, Stoneback, Frostfang, Skyfire et Mireborn. Le passage est un terrain neutre et tout le monde y est armé.","La Main Cendrée existe, agit par le feu, l’odeur et des prédateurs capturés, et veut briser les anciennes alliances. Le joueur peut finir l’histoire sans jamais avoir appris son existence.","White Maw est un animal réel. Il a été blessé et chassé à plusieurs reprises, c’est pourquoi il tue sans se nourrir. Il n’est pas surnaturel sauf si le monde donne une raison de le penser.","Le lien avec la monture est un savoir-faire, pas un droit de naissance. N’importe quel peuple peut monter n’importe quel animal maladroitement et chaque peuple monte bien un type d’animal.","Les montures ont un tempérament et une mémoire. Elles peuvent refuser, s’effrayer, être blessées, préférer quelqu’un d’autre, et mourir, et rien de tout cela ne se répare par des excuses."],
    // A · 364282ee789f
    "rules.toneGuide": "Grand, coloré, aventureux. L’émerveillement a autant de place que le danger : la première fois qu’un mammouth passe devant un stand du marché, ça mérite trois phrases. Les animaux agissent comme des animaux — ils flairent avant de voir, ils ont peur de ce qui ne fait pas peur, ils ont leurs préférences, et jamais on ne les décrit comme des machines. Personne ne parle un dialecte primitif inventé. Ce sont des gens avec un droit oral, de l’astronomie, de la médecine et quarante ans d’histoire de traités, et ils discutent comme ça. Aucune faction n’est mauvaise. Le courage d’Emberclaw se voit de l’extérieur comme de l’imprudence, et de l’intérieur comme de la compétence, et les deux points de vue ont leurs preuves. Les scènes calmes portent l’attachement : toilettage, feux de camp, quelqu’un qui t’offre à manger, une mauvaise blague sur la nourriture d’un autre peuple. Les grandes batailles restent rares pour garder leur ampleur.",
    // B · 146b983399d6
    "skills.riding.name": "Équitation",
    // B · 7ce3b6387340
    "skills.riding.attribute": "agilité",
    // B · 5c3526fe6462
    "skills.riding.description": "Rester sur quelque chose qui a sa propre idée de l’endroit où vous allez tous les deux.",
    // B · cfd4a26a761e
    "skills.beastlore.name": "Sens des bêtes",
    // B · a8c1fa8269c3
    "skills.beastlore.attribute": "esprit",
    // B · fcc939487330
    "skills.beastlore.description": "Lire les oreilles, le poids et la respiration d’un animal quelques secondes avant qu’il ne fasse ce qu’il va faire.",
    // B · 2970fd3f5db7
    "skills.tracking.name": "Pistage",
    // B · a8c1fa8269c3
    "skills.tracking.attribute": "esprit",
    // B · 6a2d0539a06f
    "skills.tracking.description": "Sol, crottes, herbe cassée, et depuis combien de temps la chose qui les a faites est passée.",
    // B · 6f898fcdc11d
    "skills.bargain.name": "Négociation",
    // B · cfb7a15645c3
    "skills.bargain.attribute": "présence",
    // B · b32a851a164a
    "skills.bargain.description": "Savoir ce qu’une sac de sel vaut pour quelqu’un qui en a trois et pour quelqu’un qui n’en a pas.",
    // B · 9d5505ee04f0
    "skills.oathspeak.name": "Parole de serment",
    // B · cfb7a15645c3
    "skills.oathspeak.attribute": "présence",
    // B · c77e9ee5bfc2
    "skills.oathspeak.description": "Dire une chose devant des témoins dans la forme qui la rend contraignante pour cinq peuples.",
    // B · a71f96d8aa79
    "skills.spear.name": "Lance",
    // B · 97081b4b4792
    "skills.spear.attribute": "force",
    // B · 09a257c540bb
    "skills.spear.description": "L’arme longue que tout le monde porte, utilisée depuis le sol et depuis le dos de quelque chose qui bouge.",
    // B · fec534f093e2
    "skills.doctoring.name": "Médecine",
    // B · 4c84c2c842d0
    "skills.doctoring.attribute": "volonté",
    // B · 5bba8b8f5097
    "skills.doctoring.description": "Blessures, fièvres et mise bas, chez les gens et chez des animaux quatre fois plus gros.",
    // B · a16ef3e7a48e
    "resources.wind.name": "Vent",
    // B · 34e8ec1ac388
    "resources.wind.polarity": "BON_HAUT",
    // B · 922713d7fb2b
    "resources.wind.zeroStateConsequence": "Le cavalier et la monture sont tous deux finis. Les réactions arrivent une demi-seconde trop tard, ce qui, sur le dos de quelque chose au galop, fait la différence entre un tour et une chute, et tous les animaux alentour le sentent.",
    // B · 478117077a83
    "resources.wind.color": "#D9A441",
    // B · c8ab49bcc0da
    "resources.unrest.name": "Agitation",
    // B · a34adbda2422
    "resources.unrest.polarity": "BON_BAS",
    // B · 35a824fcd1aa
    "resources.unrest.zeroStateConsequence": "Cinq délégations se disputent autour des feux et se plaignent de la nourriture. La question du passage est un problème administratif avec un comité, ce qui est la chose la plus ennuyeuse et la meilleure qui soit arrivée ici depuis une génération.",
    // B · 89230f0f904e
    "resources.unrest.color": "#A64B2A",
    // B · 0a6d180684f2
    "resources.wariness.name": "Sur ses gardes",
    // B · a34adbda2422
    "resources.wariness.polarity": "BON_BAS",
    // B · 6e47f2de686a
    "resources.wariness.zeroStateConsequence": "Il vient quand on l’appelle à travers une voie bondée. Il reste immobile quand quelqu’un qu’il ne connaît pas pose la main dessus parce que vous êtes là, dort dos à vous, et entre dans l’eau, le feu et le bruit rien qu’à la force de votre voix.",
    // B · 74fa1a051fd1
    "resources.wariness.color": "#6B8E5A",
    // A · 6af7d166a7b8
    "items.trade_tally.name": "Le Cordage du Compte",
    // B · e72573287188
    "items.trade_tally.tags": ["document"],
    // B · 16e571f24ed2
    "items.trade_tally.description": "Un bout de corde tressée avec des nœuds et des fils colorés qui enregistrent chaque dette qu’on vous doit et chaque dette que vous devez. Au passage, c’est le seul document que cinq peuples acceptent tous de lire.",
    // B · b0fbcd96a261
    "items.trade_tally.loreText": "Trois des nœuds sont ceux de quelqu’un d’autre et vous les portez depuis le printemps. Personne ne les a réclamés, ce qui est un message en soi.",
    // B · 195edf70942c
    "items.trade_tally.icon": "corde",
    // A · c13b4769fee3
    "items.salt_block.name": "Un Bloc de Sel Gris",
    // B · df860e6599cb
    "items.salt_block.tags": ["commerce"],
    // B · d08f3cc488ce
    "items.salt_block.description": "La taille de deux poings, enveloppée de cuir. Monnaie, médicament, conservateur et la seule chose dont chacun des cinq peuples manque avant l’hiver.",
    // B · df5963c7e3f3
    "items.salt_block.loreText": "Le sel de Mireborn est blanc et celui de Stoneback est gris. Tout le monde prétend pouvoir les différencier, et environ un tiers y arrive vraiment.",
    // B · 065594071e40
    "items.salt_block.icon": "pierre",
    // A · cfeedcec682c
    "items.bond_harness.name": "Un Harnais pour Cavalier",
    // B · 4734de9b2439
    "items.bond_harness.tags": ["équipement"],
    // B · bfd4d039e9f8
    "items.bond_harness.equipSlot": "corps",
    // B · 992eb73a182c
    "items.bond_harness.description": "Cuir découpé, boutons en os et une sangle de poitrine, façonnés pendant des années pour un animal et un cavalier. Mettre celui de quelqu’un d’autre, c’est comme enfiler ses bottes.",
    // B · eabf2986187a
    "items.bond_harness.loreText": "Les coutures indiquent quel peuple l’a fabriqué. Un harnais Emberclaw a un fil rouge dans la sangle ventrale, que tout le monde au passage peut lire à dix mètres.",
    // B · 77e2d3fdeec0
    "items.bond_harness.icon": "harnais",
    // A · 9b2adbd77140
    "items.long_spear.name": "Une Longue Lance",
    // B · b5e8d28b4848
    "items.long_spear.tags": ["arme"],
    // B · 110688b7cca2
    "items.long_spear.equipSlot": "main",
    // B · c819336949a0
    "items.long_spear.description": "Deux fois ta taille, lestée pour être utilisée depuis le dos d’un animal en mouvement, avec une barre transversale derrière la pointe pour qu’elle ne traverse pas complètement ce que tu frappes.",
    // B · d4be2275116f
    "items.long_spear.loreText": "La barre transversale est là à cause de ce qui arrive à un cavalier dont la lance traverse complètement un animal au galop.",
    // B · fb8d6e760c4d
    "items.long_spear.icon": "lance",
    // A · a620352828ce
    "items.scent_pot.name": "Un Pot de Parfum Scellé",
    // B · f88c6548fc3b
    "items.scent_pot.tags": ["quête","preuve"],
    // B · c1ce95b6264e
    "items.scent_pot.description": "Argile cuite, cirée et fermée, contenant quelque chose qui sent le sang et la graisse brûlée. Ouvre-la au vent devant une ligne de piquets, et tous les animaux liés dans un rayon d’un kilomètre essaient de s’enfuir.",
    // B · 9a65e3cd4dd1
    "items.scent_pot.loreText": "Personne à ce passage ne fabrique ça. La cire porte l’empreinte du pouce du fabricant, et cette empreinte pourrait être attribuée à quelqu’un.",
    // B · c93de720b80c
    "items.scent_pot.icon": "flacon",
    // A · c77a55356cf0
    "items.burnt_hide.name": "Un Morceau de Peau Brûlée",
    // B · f88c6548fc3b
    "items.burnt_hide.tags": ["quête","preuve"],
    // B · c3c0fd1a791f
    "items.burnt_hide.description": "Découpée sur un herbivore mort au nord d’ici. La brûlure est sur le flanc, elle est ancienne, et sa forme n’est pas celle d’un feu de prairie.",
    // B · 955760d21aa3
    "items.burnt_hide.loreText": "Tenue à la lumière, la brûlure forme quatre lignes parallèles. Quelqu’un a conduit cet animal avec une torche, au pas, sur une longue distance.",
    // B · e7e13988aa91
    "items.burnt_hide.icon": "peau",
    // A · 262e80cc43db
    "items.corridor_stones.name": "Les Pierres du Corridor",
    // B · 061625d9bd60
    "items.corridor_stones.tags": ["quête","document"],
    // B · 89f310f13d40
    "items.corridor_stones.description": "Cinq pierres de rivière gravées, une par peuple, qui enregistrent ensemble quarante ans d’accords sur qui traverse où. Elles sont posées sur une peau au centre du passage, et déplacer une pierre est un acte officiel.",
    // B · 534e0c881369
    "items.corridor_stones.loreText": "La pierre Frostfang est la plus ancienne et la plus usée, parce qu’elle a été déplacée plus souvent que les autres, toujours par eux, toujours vers le bas.",
    // B · c7269a12e017
    "items.corridor_stones.icon": "pierres",
    // A · 432605a5915d
    "items.nightmeat.name": "Quelqu’un Cuisine",
    // B · 32830ea136a7
    "items.nightmeat.tags": ["nourriture"],
    // B · 94012d496d70
    "items.nightmeat.description": "Un bol tendu au feu par quelqu’un qui ne demande pas si tu as faim. Poisson, moelle ou racines, selon le feu auquel tu es.",
    // B · 9dc9afcfadea
    "items.nightmeat.loreText": "Refuser de manger au feu Frostfang n’est pas impoli. Le refuser deux fois est un message sur les gens qui t’ont offert.",
    // B · 9522ca746de3
    "items.nightmeat.icon": "bol",
    // A · b6bacfcac312
    "abilities.read_the_animal.name": "Comprendre l’Animal",
    // B · 58f69744c481
    "abilities.read_the_animal.tags": ["vue"],
    // B · 6e10f1f8d0f1
    "abilities.read_the_animal.description": "Prends les oreilles, le poids sur les pattes avant et la respiration, et devine ce qu’il va faire quelques secondes avant qu’il ne le fasse.",
    // B · 39d896e20aec
    "abilities.read_the_animal.targetRule": "SINGLE",
    // B · a8c1fa8269c3
    "abilities.read_the_animal.check.attribute": "esprit",
    // A · 6022319d5996
    "abilities.steady_it.name": "Le Calmer",
    // B · 49ff03b1cf7b
    "abilities.steady_it.tags": ["soin"],
    // B · 29561932018e
    "abilities.steady_it.description": "Interpose-toi entre un animal effrayé et ce qui l’effraie, et sois la chose la moins intéressante dans son champ de vision jusqu’à ce qu’il se calme.",
    // B · 39d896e20aec
    "abilities.steady_it.targetRule": "SINGLE",
    // B · cfb7a15645c3
    "abilities.steady_it.check.attribute": "présence",
    // A · fc5cf71978b3
    "abilities.ride_it_down.name": "Le Rattraper à Cheval",
    // B · 2e74bfc33328
    "abilities.ride_it_down.tags": ["déplacement"],
    // B · f54e70b7014f
    "abilities.ride_it_down.description": "Demande à un animal tout ce qu’il a, puis un peu plus, et arrive à destination avant ce que tu poursuis.",
    // B · c44e6dd70059
    "abilities.ride_it_down.targetRule": "AUCUN",
    // B · 7ce3b6387340
    "abilities.ride_it_down.check.attribute": "agilité",
    // A · da29e42150c3
    "abilities.spear_work.name": "Travail de Lance",
    // B · 05f59299d740
    "abilities.spear_work.tags": ["offensif"],
    // B · f2c78a7b180f
    "abilities.spear_work.description": "Plante le talon, choisis l’angle, et laisse quelque chose d’énorme arriver au point plutôt que d’essayer de l’atteindre.",
    // B · 39d896e20aec
    "abilities.spear_work.targetRule": "SINGLE",
    // B · 97081b4b4792
    "abilities.spear_work.check.attribute": "puissance",
    // A · 879fd35d0634
    "abilities.speak_in_form.name": "Parler En Forme",
    // B · 09b907576d49
    "abilities.speak_in_form.tags": ["social"],
    // B · 054d6096cc39
    "abilities.speak_in_form.description": "Dis la chose devant des témoins sous la forme qui la rend contraignante, c’est une forme précise que tout le monde présent peut entendre que tu respectes.",
    // B · 39d896e20aec
    "abilities.speak_in_form.targetRule": "SINGLE",
    // B · cfb7a15645c3
    "abilities.speak_in_form.check.attribute": "présence",
    // A · c1f54d142b9b
    "abilities.trade_hard.name": "Négocier Dur",
    // B · 09b907576d49
    "abilities.trade_hard.tags": ["social"],
    // B · 800a5e7550a9
    "abilities.trade_hard.description": "Comprends ce que la chose devant toi vaut pour la personne qui la tient plutôt que pour toi, puis sois patient.",
    // B · 39d896e20aec
    "abilities.trade_hard.targetRule": "SINGLE",
    // B · cfb7a15645c3
    "abilities.trade_hard.check.attribute": "présence",
    // A · a055d2283ff1
    "abilities.read_the_ground.name": "Lire le Terrain",
    // B · c962d34a80f3
    "abilities.read_the_ground.tags": ["survie"],
    // B · a9936ab15150
    "abilities.read_the_ground.description": "Herbe cassée, bouse, la profondeur d’une empreinte dans la terre humide, et depuis combien d’heures est passé ce qui les a laissées.",
    // B · c44e6dd70059
    "abilities.read_the_ground.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.read_the_ground.check.attribute": "esprit",
    // A · 71fc9541407a
    "abilities.patch_them_up.name": "Recoudre",
    // B · 49ff03b1cf7b
    "abilities.patch_them_up.tags": ["soin"],
    // B · 9cbc2910a0be
    "abilities.patch_them_up.description": "Arrête le saignement, immobilise une jambe, fait baisser la fièvre. Ça marche sur une personne comme sur quelque chose quatre fois plus gros, avec les mêmes mains et beaucoup plus de corde.",
    // B · 39d896e20aec
    "abilities.patch_them_up.targetRule": "SINGLE",
    // B · 4c84c2c842d0
    "abilities.patch_them_up.check.attribute": "volonté",
    // A · bd6845a92481
    "abilities.push_the_herd.name": "Pousser le Troupeau",
    // B · 5251d369d3b6
    "abilities.push_the_herd.tags": ["utilitaire"],
    // B · 571f03dd31fd
    "abilities.push_the_herd.description": "Déplace un grand nombre d’animaux vers un endroit où ils n’allaient pas, en utilisant le bruit, les cavaliers et le terrain. Ça marche, c’est énorme, et tout le monde en aval s’en rend compte.",
    // B · 503eb62e7676
    "abilities.push_the_herd.targetRule": "ZONE",
    // B · a8c1fa8269c3
    "abilities.push_the_herd.check.attribute": "esprit",
    // A · 2f88ff64b327
    "abilities.work_by_fear.name": "Agir par la Crainte",
    // B · 5251d369d3b6
    "abilities.work_by_fear.tags": ["utilitaire"],
    // B · 841194de07a8
    "abilities.work_by_fear.description": "Feu, odeur et un prédateur capturé en amont du vent. Les animaux vont où tu veux sans que tu les touches, et les gens qui les possèdent aussi.",
    // B · 503eb62e7676
    "abilities.work_by_fear.targetRule": "ZONE",
    // B · a8c1fa8269c3
    "abilities.work_by_fear.check.attribute": "esprit",
    // B · eec0abd9d1bf
    "abilities.work_by_fear.requires.flagsSet": ["sait :la_méthode_cendrée"],
    // B · caab97624a24
    "abilities.work_by_fear.requires.lockedCopy": "Tu sais que les animaux peuvent être déplacés en les effrayant. Tu ne sais pas comment c’est fait à l’échelle à laquelle quelqu’un le fait, et deviner ça avec une torche en saison sèche, c’est comme brûler un corridor.",
    // A · 018a4c8a7721
    "locations.market_lanes.name": "Les Allées du Marché",
    // A · 2e4520fc1476
    "locations.market_lanes.shortName": "Les Allées",
    // B · df90b3e71256
    "locations.market_lanes.description": "Six cents étals en quatre rangées tordues, couverts de peaux contre un soleil qui n’est pas encore vraiment là. Sel, poisson séché, bois de cervidé, obsidienne, corde, médecine, et quelqu’un qui vend de très petits animaux sculptés aux enfants. Les allées sont serrées, tout le monde est armé, et personne ne trouve ça étrange.",
    // B · 22c1142b6231
    "locations.market_lanes.stageImage": "story_primal_crown/stage_market_lanes",
    // A · 813aca36c58c
    "locations.the_stone_circle.name": "Le Cercle de Pierres",
    // A · 813aca36c58c
    "locations.the_stone_circle.shortName": "Le Cercle",
    // B · 1d2322c20456
    "locations.the_stone_circle.description": "Une peau plate de la taille d’une pièce, attachée au sol, avec cinq pierres de rivière gravées posées dessus en un motif vieux de quarante ans. Cinq délégations sont assises autour. N’importe qui peut se tenir au bord et écouter, et environ deux cents personnes le font.",
    // B · a17cf917a5f6
    "locations.the_stone_circle.stageImage": "story_primal_crown/stage_the_stone_circle",
    // A · 519e99e7ba82
    "locations.the_picket_lines.name": "Les Lignes de Surveillance",
    // A · 506d06f1899e
    "locations.the_picket_lines.shortName": "Avant-postes",
    // B · 1843c2fdec15
    "locations.the_picket_lines.description": "Un kilomètre de terrain clouté où quatre mille animaux sont attachés par des gens qui ne font pas totalement confiance aux bêtes des autres. Des rapaces protégés des tigres à dents de sabre, des tigres protégés de tout. Ça sent l’énorme. C’est là que les cavaliers passent vraiment leur temps et où se fait la vraie affaire des passages.",
    // B · d36842edf05c
    "locations.the_picket_lines.stageImage": "story_primal_crown/stage_the_picket_lines",
    // A · 003d088fbd25
    "locations.emberclaw_ground.name": "Le Terrain Emberclaw",
    // A · 15ff1578d201
    "locations.emberclaw_ground.shortName": "Emberclaw",
    // B · a8f2cd118acf
    "locations.emberclaw_ground.description": "Ce n’est pas un camp, plutôt une large zone plate avec des tentes autour et beaucoup de courses au milieu. Quatre clans sont là et trois ne se parlent pas, ce qui n’empêche aucun d’eux de miser sur le quatrième.",
    // B · dd8592201e0d
    "locations.emberclaw_ground.stageImage": "story_primal_crown/stage_emberclaw_ground",
    // A · 81b826cb8022
    "locations.stoneback_wharf.name": "Le Quai Stoneback",
    // A · 86b61bc34107
    "locations.stoneback_wharf.shortName": "Quai",
    // B · 5493c06a9703
    "locations.stoneback_wharf.description": "Du bois, des cordes, des grues actionnées par des animaux gros comme des maisons, et plus d’archives écrites que dans tout le reste de ce passage réuni. Tout ici est mesuré, pesé, noté sur des cordelettes et rangé sous un toit. C’est de loin le terrain le plus riche du marché et le moins amusant.",
    // B · 6a9850158f57
    "locations.stoneback_wharf.stageImage": "story_primal_crown/stage_stoneback_wharf",
    // A · 9fa40feee106
    "locations.frostfang_fires.name": "Les Feux Frostfang",
    // A · e5d37a7e3534
    "locations.frostfang_fires.shortName": "Les Feux",
    // B · 992593ad7a82
    "locations.frostfang_fires.description": "Neuf feux en cercle large avec des plateformes pour dormir entre eux, et un silence qu’on entend à cent mètres. Ils sont venus de plus loin, ils partiront les derniers, et on leur donne le pire terrain de ce passage depuis onze ans sans qu’ils ne s’en plaignent jamais.",
    // B · 79e155e8ee7b
    "locations.frostfang_fires.stageImage": "story_primal_crown/stage_frostfang_fires",
    // A · 549039233150
    "locations.skyfire_perch.name": "Le Perchoir",
    // A · 0b777a2dafc3
    "locations.skyfire_perch.shortName": "Perchoir",
    // B · 38c824c491e7
    "locations.skyfire_perch.description": "Un doigt de roche à soixante mètres au-dessus du passage avec un escalier de corde derrière et aucune rambarde. Six ptérosaures et leurs cavaliers vivent ici pendant le marché. Du sommet, on voit tout le passage, la route du nord, et la poussière des troupeaux.",
    // B · 1ecd525a86ff
    "locations.skyfire_perch.stageImage": "story_primal_crown/stage_skyfire_perch",
    // A · 91302e8f7d73
    "locations.mireborn_landing.name": "Le Quai d’Atterrissage",
    // A · de9566487b17
    "locations.mireborn_landing.shortName": "Point d’arrivée",
    // B · e4e2ce1ab0b2
    "locations.mireborn_landing.description": "Passerelles flottantes, nattes de roseaux et une douzaine de barques plates poussées depuis le delta, avec des hadrosaures debout jusqu’à la poitrine à côté qui mâchent. C’est le seul terrain de ce passage où quelqu’un soignera votre animal gratuitement et demandera ce que vous lui donnez à manger.",
    // B · 2e3499117036
    "locations.mireborn_landing.stageImage": "story_primal_crown/stage_mireborn_landing",
    // A · b0e71bed5737
    "locations.the_north_road.name": "La Route du Nord",
    // A · 1f0e553d9397
    "locations.the_north_road.shortName": "Route du Nord",
    // B · 8b293f4cedfc
    "locations.the_north_road.description": "Ce n’est pas une route. Une largeur de six kilomètres de terrain piétiné que les troupeaux utilisent depuis plus longtemps que personne ne compte, qui monte entre deux crêtes vers les hautes terres. En ce moment, trois peuples différents l’explorent en même temps et tous font semblant de ne pas voir les autres.",
    // B · 862e0d59addd
    "locations.the_north_road.stageImage": "story_primal_crown/stage_the_north_road",
    // A · f533a5249ffc
    "locations.blackglass_ridge.name": "Crête de Verre-Noir",
    // A · af1d8166a3df
    "locations.blackglass_ridge.shortName": "Verre-Noir",
    // B · 606a34222d40
    "locations.blackglass_ridge.description": "Une arête de roche volcanique qui est chaude sous les pieds depuis le printemps, avec de nouvelles fissures et une odeur d’œufs dans l’air. Plus rien ne broute ici. C’est là que le sol a bougé, c’est la vraie raison pour laquelle les troupeaux ont changé de route, et environ quatre personnes vivantes l’ont compris.",
    // B · d8ce3f0ebec6
    "locations.blackglass_ridge.stageImage": "story_primal_crown/stage_blackglass_ridge",
    // A · 366938c13d08
    "locations.the_bone_caves.name": "Les Grottes aux Os",
    // A · 7277b9340703
    "locations.the_bone_caves.shortName": "Grottes aux Os",
    // B · 230f2ab88e41
    "locations.the_bone_caves.description": "Trois chambres dans une falaise calcaire, au sol couvert d’os d’animaux dont personne à ce passage ne connaît le nom. Chaque peuple a une histoire différente sur ces grottes, mais toutes s’accordent à dire qu’un animal lié y entre calmement et n’en ressort pas tout seul.",
    // B · 30cdaee13eca
    "locations.the_bone_caves.stageImage": "story_primal_crown/stage_the_bone_caves",
    // A · 40aab8c605d9
    "locations.ashen_camp.name": "Le Terrain Brisé",
    // A · 9155258f6143
    "locations.ashen_camp.shortName": "Terrain Brisé",
    // B · e7c2e42a5524
    "locations.ashen_camp.description": "Quatre abris en peau dans un pli de roche sous la crête, trois cages, et beaucoup d’argile cuite. Personne ici ne porte les couleurs de quelqu’un. Les animaux dans les cages sont des prédateurs, tous blessés de la même façon précise, et ils ont tous été maintenus affamés exprès.",
    // B · 146ba151241b
    "locations.ashen_camp.stageImage": "story_primal_crown/stage_ashen_camp",
    // A · b8fad8d657b3
    "locations.southern_grass.name": "Les Herbes du Sud",
    // A · eb602ab3abfd
    "locations.southern_grass.shortName": "Le Sud",
    // B · f2756156532c
    "locations.southern_grass.description": "Ce dont tout cela parle. À neuf jours au sud du passage, une plaine d’herbe haute plus que le genou d’un cavalier, assez large pour qu’un troupeau de quatre-vingt mille s’y perde. Celui qui arrive ici le premier avec des animaux vivants a fait une bonne année.",
    // B · 36927c6cd6af
    "locations.southern_grass.stageImage": "story_primal_crown/stage_southern_grass",
    // B · b002ebd82118
    "characters.kaia.name": "Kaia Thorn",
    // A · 0369c294ea50
    "characters.kaia.role": "Cavalière de rapaces Emberclaw, la plus rapide de ce passage, celle qui discutera encore du corridor quand tout le monde sera au lit",
    // A · f2bb55d4c042
    "characters.kaia.cardBlurb": "Elle te défiera, misera contre toi et arrivera sur la route du nord avant toi. Elle est la seule ici à avoir compris que le changement de direction des troupeaux n’est la faute de personne. À toi de décider si c’est ta rivale ou ta partenaire d’équitation.",
    // B · aee35f364a88
    "characters.kaia.pronouns": "elle",
    // A · 5ed13ab7a6ed
    "characters.kaia.publicTraits": ["Transforme tout en pari","Incroyable, elle ne tient pas en place pendant un discours","La première à foncer vers ce qui brûle"],
    // B · 164633f83ced
    "characters.kaia.hiddenDrives": ["Elle veut qu’un des clans les plus anciens dise à voix haute, au cercle, que son père n’était pas l’homme qu’on disait","Elle a peur que la témérité dont on l’accuse soit réelle et héritée, et elle monte plus vite pour le vérifier"],
    // B · 29127b9f9253
    "characters.kaia.values": ["Un cavalier qui s’occupe de son animal avant de s’occuper de lui-même","Aller sur place et découvrir, plutôt que d’envoyer quelqu’un et attendre"],
    // B · 4eb9dac95743
    "characters.kaia.fears": ["Devenir l’histoire que son père est devenu : un nom que quatre clans utilisent comme avertissement","Qu’Emberclaw obtienne un corridor en faveur plutôt qu’en droit"],
    // A · faf0ef2ea158
    "characters.kaia.socialStyle": "Elle coupe la parole, s’excuse, puis recommence. Parle trop près et avec les mains. En moins de deux minutes, elle t’expliquera exactement ce qu’elle pense de ta façon de monter.",
    // B · 2776b5d1dd0a
    "characters.kaia.boundaries": ["Ne laissera personne parler pour son clan au cercle, même pas quelqu’un qui lui fait une faveur","Ne fera pas courir un animal qui n’est pas en état, et rompra une amitié pour quelqu’un qui le fait"],
    // B · 14be4ad60b96
    "characters.kaia.goals": ["Faire entrer Emberclaw dans le corridor nord par droit plutôt que par permission","Découvrir ce qui a vraiment fait changer les troupeaux avant que les quatre autres peuples ne se mettent à s’accuser"],
    // B · 3dfc05dfb682
    "characters.kaia.secrets.kaia_the_raid.fact": "Son père a été accusé du raid à Sixwater. En fait, il y allait pour l’arrêter et est arrivé second, et les deux personnes qui pourraient le dire sont Stoneback et ne l’ont pas fait.",
    // B · 47558a04be8d
    "characters.kaia.secrets.kaia_the_raid.visibility": "NPC_PRIVATE",
    // B · 6443298fa7be
    "characters.kaia.secrets.kaia_the_raid.revealHint": "Elle le raconte d’un trait, une fois, à quelqu’un qui l’a déjà défendue devant d’autres sans qu’on lui demande.",
    // B · 12dc3ba8a8dc
    "characters.kaia.secrets.kaia_the_ground.fact": "Elle a parcouru la route du nord il y a huit jours, a senti le sol chaud sous les pieds de sa monture sur l’arête noire, et ne l’a pas rapporté parce que ça ressemble à une excuse.",
    // B · 47558a04be8d
    "characters.kaia.secrets.kaia_the_ground.visibility": "NPC_PRIVATE",
    // B · 6fa9202b5323
    "characters.kaia.secrets.kaia_the_ground.revealHint": "Elle en parle à demi-mot à quiconque dit que les troupeaux ont changé de route pour une raison que personne n’a choisie.",
    // A · b1814ed11e7d
    "characters.kaia.speechStyle": "Rapide, sec, compétitif. Elle laisse ses phrases en suspens parce que la suite est plus intéressante. Tout devient un pari ou une course, même quand ce n’est pas le cas. Méprise ouvertement le langage formel, incapable de le produire.",
    // A · 950331b7bfd4
    "characters.kaia.topics": ["le corridor nord","son clan","son père","l’arête noire","la course","ta monture","les quatre autres peuples"],
    // A · 40f891c57d97
    "characters.kaia.voiceSamples": ["À gauche. À gauche, prends à gauche, j’ai la corde — non, c’est toi, vas-y.","Je parie cinquante qu’on est sur l’arête avant que votre groupe ait fini de se disputer autour de cette peau.","Tu veux la version honnête ou celle que je raconte au cercle ? Parce que la version du cercle a quarante mots de plus et aucun sens.","Je l’ai senti remonter sous ses pieds. Roches chaudes, il y a huit jours, et je n’ai rien dit, parce que qui croirait un Emberclaw à propos du sol ?"],
    // B · 856793f466b5
    "characters.kaia.appearance": "Vingt-trois ans, cheveux cuivre foncé en une tresse grossière qui se défait à la fin, peau bronzée, yeux ambre, fine et rapide, en harnais de cuir coupé avec une ceinture rouge tissée à la taille.",
    // B · 866e9347e7e2
    "characters.kaia.visualHook": "La ceinture rouge, portée comme une ceinture et toujours à moitié défaite, qu’elle refait six fois par heure en parlant.",
    // B · 203ae379985a
    "characters.kaia.silhouette": "Toujours en train de marcher ou déjà montée, une épaule baissée, la tresse qui balance.",
    // B · fc5a58e32ea4
    "characters.kaia.artSeed": "pc-kaia-01",
    // B · e1edb919f924
    "characters.kaia.portrait": "story_primal_crown/kaia",
    // B · 91033f9482ae
    "characters.kaia.expressions": ["neutre","souriante","compétitive","furieuse","bouleversée"],
    // B · 19373d068c3f
    "characters.kaia.knowledgeScope": ["kaia","emberclaw","the_north_road","blackglass_ridge","bond_riding","sunscar_crossing"],
    // B · a2f96b3518b4
    "characters.kaia.gates.kaia_rides_with_you.label": "Elle éclaire le corridor avec toi plutôt que seule",
    // B · 9e8ae18bf8bf
    "characters.kaia.gates.kaia_rides_with_you.kind": "ALLIANCE",
    // B · 342dc82d5645
    "characters.kaia.gates.kaia_tells_you_about_sixwater.label": "Elle te parle de son père",
    // B · 55a54e80451a
    "characters.kaia.gates.kaia_tells_you_about_sixwater.kind": "CONFIANCE",
    // B · 170a673e7823
    "characters.kaia.gates.kaia_tells_you_about_sixwater.requires.flagsSet": ["parlé :kaia"],
    // B · 7e0061b94d63
    "characters.kaia.gates.kaia_closer.label": "Ce que c’est devenu est nommé",
    // B · 0b75bc536447
    "characters.kaia.gates.kaia_closer.kind": "ROMANCE",
    // B · 8ccacaf921b4
    "characters.kaia.scouting.revealCopy": "Elle coupe à l’intérieur avant que tu ne t’engages. « Tu vas toujours à droite quand tu hésites. À chaque fois. Je t’ai regardé faire ça pendant deux jours. »",
    // B · 43f6e984f5c3
    "characters.kaia.combatant.tags": ["cavalier","rapace"],
    // B · 21463e6832ab
    "characters.suri.name": "Suri Snow",
    // A · f05d6bc29c9a
    "characters.suri.role": "Cavalière de tigres à dents de sabre Frostfang, ici pour sécuriser les routes des troupeaux du nord, et la personne qui parle le moins mais observe le plus à ce passage",
    // A · ceded2b9c330
    "characters.suri.cardBlurb": "Elle te nourrira avant de te poser une question, a mesuré la largeur du corridor plus précisément que la délégation qui s’en dispute, et a trois frères et sœurs plus jeunes dont l’hiver dépend de ces trois jours.",
    // B · aee35f364a88
    "characters.suri.pronouns": "elle",
    // A · ee0526cf7b43
    "characters.suri.publicTraits": ["Ne répond qu’en quatre mots ou moins tant qu’elle ne vous apprécie pas","Donne à manger sans en parler","Ne mentionne jamais la distance qu’ils ont parcourue"],
    // B · 9f1980cbe4dd
    "characters.suri.hiddenDrives": ["Elle veut que les quatre autres peuples remarquent, sans qu’on le leur dise, que Frostfang a pris le pire terrain onze années de suite","Elle préfère être sous-estimée plutôt que devoir s’expliquer, et sait que ce choix a coûté du terrain à son peuple"],
    // B · 63a498f98ac6
    "characters.suri.values": ["Nourrir celui qui est devant toi, même si c’est quelqu’un avec qui tu vas te disputer","La compétence plutôt que les paroles, et la compétence spécifique de faire un travail froid correctement du premier coup"],
    // B · 9a8b416c7932
    "characters.suri.fears": ["Rentrer avec un corridor qui ne porte pas assez d’animaux pour passer l’hiver","Que le silence soit pris pour un accord, et que onze ans de silence aient été compris exactement comme ça"],
    // A · 598cc5214088
    "characters.suri.socialStyle": "Des silences longs qui la gênent pas mais qui pèsent sur tout le monde. Elle répond à la question posée, pas à celle sous-entendue. Elle s’ouvre d’un coup, sans prévenir, souvent autour d’un repas.",
    // B · e01dca670e35
    "characters.suri.boundaries": ["Ne fera pas de remerciements pour quelque chose que son peuple méritait","Ne laissera personne manipuler son tigre à dents de sabre comme démonstration pour les autres"],
    // B · 55eec333da31
    "characters.suri.goals": ["Sortir de ce passage avec une route nord qui porte assez de bêtes pour nourrir neuf cents personnes","Mettre son frère cadet sur un monture avant l’hiver, ce qu’elle n’a dit à personne"],
    // B · 5575c19af0e0
    "characters.suri.secrets.suri_the_count.fact": "Elle a elle-même parcouru le corridor contesté avant l’ouverture du marché et l’a mesuré. Il est plus étroit que ce que dit le relevé de Stoneback, ce qui veut dire que les chiffres sur lesquels tout le cercle se dispute sont faux.",
    // B · 47558a04be8d
    "characters.suri.secrets.suri_the_count.visibility": "NPC_PRIVÉ",
    // B · 5d75b83674d5
    "characters.suri.secrets.suri_the_count.revealHint": "Elle le montre simplement, avec le relevé, à la première personne qui lui demande un fait plutôt qu’un avis.",
    // B · b83ed4dc7f08
    "characters.suri.secrets.suri_the_carcasses.fact": "Son groupe de chasse a trouvé quatre animaux liés morts et non mangés sur la route du sud, tous avec de vieilles brûlures sur le flanc, et elle a décidé de ne pas en parler parce que Frostfang ne fait pas avancer une plainte.",
    // B · 47558a04be8d
    "characters.suri.secrets.suri_the_carcasses.visibility": "NPC_PRIVÉ",
    // B · 458565680597
    "characters.suri.secrets.suri_the_carcasses.revealHint": "Elle le dit une fois qu’elle a été nourrie au feu de quelqu’un d’autre, ce que personne à ce passage n’a jamais fait.",
    // A · cac6bb327c61
    "characters.suri.speechStyle": "Très brève. Souvent juste une proposition. L’atténuation comme humour, jamais annoncée comme telle, du coup la moitié des rencontres croit qu’elle n’en a pas. Elle parle plutôt du temps, du sol et de la viande que des intentions. Jamais elle n’adoucit un propos en disant le nom de quelqu’un.",
    // A · a9ab4020645c
    "characters.suri.topics": ["la route du nord","ses frères et sœurs","les animaux morts","la largeur du corridor","son sabretooth","le froid"],
    // A · 090078598f8c
    "characters.suri.voiceSamples": ["Pas étroit. Plus étroit que ce qu’ils ont écrit. Problème différent.","Mange ça. Ça fait que tu tiens debout depuis la nuit et tu vas faire une connerie le ventre vide.","Quatre morts. Pas mangés. Brûlures sur le flanc, anciennes. J’ai rien dit, parce qu’on dit les choses puis on rentre.","Bon chat. Mauvais caractère. On a ça en commun, ça n’a jamais posé de souci entre nous."],
    // B · dc96c83660c5
    "characters.suri.appearance": "Fin de vingtaine, cheveux courts et clairs, visage large et plat marqué par le vent, lourdes fourrures superposées même par cette chaleur, et avant-bras scarifiés en lignes parallèles par une centaine de séances de toilettage.",
    // B · 0db386e1ced2
    "characters.suri.visualHook": "Une énorme tête de tigre à dents de sabre reposant sur ses bottes où qu’elle s’assoie, ce qu’elle ne reconnaît jamais.",
    // B · 747930ba2cb6
    "characters.suri.silhouette": "Assise, basse et carrée, avec quelque chose de très gros endormi contre elle.",
    // B · febe295e5497
    "characters.suri.artSeed": "pc-suri-01",
    // B · 726acff71584
    "characters.suri.portrait": "story_primal_crown/suri",
    // B · 803b7d8670b3
    "characters.suri.expressions": ["neutre","sec","vigilant","chaleureux","froid"],
    // B · 297d03967dd4
    "characters.suri.knowledgeScope": ["suri","frostfang","la_route_du_nord","monture_liée","les_troupeaux_morts","le_passage_soleil_cicatrice"],
    // B · 8c701d7c9646
    "characters.suri.gates.suri_gives_you_the_count.label": "Elle te donne ce qu’elle a vraiment mesuré",
    // B · 55a54e80451a
    "characters.suri.gates.suri_gives_you_the_count.kind": "CONFIANCE",
    // B · df7be1e24f9e
    "characters.suri.gates.suri_gives_you_the_count.requires.flagsSet": ["parlé :suri"],
    // B · c7472aea8e78
    "characters.suri.gates.suri_speaks_at_the_circle.label": "Elle le dira à voix haute devant les cinq peuples",
    // B · 9e8ae18bf8bf
    "characters.suri.gates.suri_speaks_at_the_circle.kind": "ALLIANCE",
    // B · 415a756234ad
    "characters.suri.combatant.tags": ["cavalier","tigredentsdesabre"],
    // B · 0923024e10ca
    "characters.ilya.name": "Ilya Crest",
    // A · e50c259f3857
    "characters.ilya.role": "Éclaireur Skyfire et marchand d’infos, il a déjà vendu ce qu’il sait du nord à deux peuples différents et est prêt à le faire pour un troisième",
    // A · 269ff54e1453
    "characters.ilya.cardBlurb": "Il a survolé la crête noire il y a trois semaines et vu des incendies là où il n’y aurait pas dû y en avoir. Il a déjà vendu ça deux fois, il vous le vendra volontiers, et il ne trouve aucune honte à ces trois ventes.",
    // B · fcca6b746d0b
    "characters.ilya.pronouns": "il",
    // A · 2347de1d985c
    "characters.ilya.publicTraits": ["Annonce ses prix à voix haute, en plein milieu de phrase","Se réjouit sincèrement du levier des autres","Ne fait jamais croire qu’un service n’est pas un échange"],
    // B · 3687559ec8d6
    "characters.ilya.hiddenDrives": ["Il veut compter pour la colonie plutôt que d’être juste payé par tout le monde, et ne sait pas comment le demander","Il essaie de découvrir ce que sont les incendies sans que personne ne réalise qu’il ne le sait pas déjà"],
    // B · 5a8a11ac9ee6
    "characters.ilya.values": ["Un prix honnête, annoncé dès le départ, même pour ce que les gens pensent devoir être gratuit","Être le premier informé, ce qu’il ferait gratuitement et n’a jamais admis"],
    // B · 3b3dbf5d5274
    "characters.ilya.fears": ["Vendre l’information qui fait tuer beaucoup de monde, et le découvrir après","Que Skyfire n’ait aucun terrain à défendre et que tout le monde l’ait remarqué"],
    // A · f37004b850f0
    "characters.ilya.socialStyle": "Il arrive en parlant déjà. Il donne son prix avant même que vous ayez posé une question, puis il négocie à la baisse pendant que vous hésitez encore. Incapable de faire semblant de ne pas être intéressé.",
    // B · ecb63ca5eb23
    "characters.ilya.boundaries": ["Ne vendra pas la position d’une famille ou d’une ligne de piquets, ce qu’on lui demande le plus souvent","Ne portera pas un message qu’il n’a pas lu, et le dit avant de le prendre"],
    // B · 3e9cbb1f6179
    "characters.ilya.goals": ["Vendre l’observation de la crête nord une troisième fois, idéalement à quelqu’un qui en fera quelque chose","Obtenir pour la délégation Skyfire une place aux discussions sur les corridors plutôt qu’un tabouret de coursier derrière eux"],
    // B · 9e62297b1f2f
    "characters.ilya.secrets.ilya_sold_it_twice.fact": "Il a vendu les feux de la crête à Stoneback et à Emberclaw la même semaine, et aucun des deux ne sait que l’autre l’a, ce qui veut dire que les deux agissent délibérément avec une vision partielle.",
    // B · 47558a04be8d
    "characters.ilya.secrets.ilya_sold_it_twice.visibility": "NPC_PRIVATE",
    // B · d01b90e493ba
    "characters.ilya.secrets.ilya_sold_it_twice.revealHint": "Il l’admet joyeusement, sans qu’on lui demande, à quiconque lui pose une deuxième question sur la première vente.",
    // B · 769c30ccc41f
    "characters.ilya.secrets.ilya_saw_the_cages.fact": "Lors du dernier passage, il a volé assez bas pour voir des cages, et il n’a vendu cette partie à personne, car il n’a pas encore déterminé à qui il serait sûr de la vendre.",
    // B · 47558a04be8d
    "characters.ilya.secrets.ilya_saw_the_cages.visibility": "NPC_PRIVATE",
    // B · e3588bac220b
    "characters.ilya.secrets.ilya_saw_the_cages.revealHint": "Ça sort quand quelqu’un lui montre une preuve physique plutôt que de lui payer l’histoire.",
    // A · 42d0bdc9d0dd
    "characters.ilya.speechStyle": "Rapide, chaleureux et commerçant. Il s’interrompt pour annoncer un prix, puis argumente contre. Fait des compliments en disant ce que valent les infos. Termine les transactions par une petite blague sur lui-même.",
    // A · 56b356114ee9
    "characters.ilya.topics": ["les feux sur la crête","le prix des choses","la route du nord","sa monture","qui paye qui","les délégations"],
    // A · e42ba7c0c4ad
    "characters.ilya.voiceSamples": ["Deux pains de sel. Non — un seul, et tu me dis ce que tu trouves, je considérerai ça comme un geste de ma part plus tard, quand je serai plus pauvre.","Je l’ai vendu à Stoneback un mardi et à votre bande un vendredi. Personne n’a demandé si je l’avais fait. Ce n’est pas mentir, c’est que personne n’a demandé.","Tout ce qui est au-dessus de cent vingt mètres m’appartient, et tout ce qui est en dessous appartient à celui qui m’a payé en dernier.","Il y avait des cages. Je ne l’ai pas vendue. Je la traîne depuis trois semaines pour comprendre à qui je peux dire ça sans me faire tuer."],
    // B · 3843c1b321f0
    "characters.ilya.appearance": "Trente ans, mince et marqué par le vent, cheveux foncés rasés d’un côté, cuir taillé par le vent avec une douzaine de petites poches, et des lunettes de vol en corne posées sur le front, dedans comme dehors.",
    // B · e7c24005f8fc
    "characters.ilya.visualHook": "Lunettes de vol en corne et cuir portées en permanence sur le front, même au dîner et en dormant.",
    // B · 2736afd74c14
    "characters.ilya.silhouette": "Appuyé en arrière sur une rambarde, le poids sur les talons et les deux mains occupées.",
    // B · 05fda2bc5ed0
    "characters.ilya.artSeed": "pc-ilya-01",
    // B · db48f750b23d
    "characters.ilya.portrait": "story_primal_crown/ilya",
    // B · dfb3632b3563
    "characters.ilya.expressions": ["neutre","ravi","calculateur","évasif","déconcerté"],
    // B · 7419967804f4
    "characters.ilya.knowledgeScope": ["ilya","skyfire","blackglass_ridge","the_north_road","the_delegations","sunscar_crossing"],
    // B · a388ebeb6d48
    "characters.ilya.gates.ilya_sells_you_the_ridge.label": "Il te vend ce qu’il a vu par-dessus la crête",
    // B · 77dcad9b37cc
    "characters.ilya.gates.ilya_sells_you_the_ridge.kind": "OTHER",
    // B · f64f4adf7f52
    "characters.ilya.gates.ilya_sells_you_the_ridge.requires.hasItems": ["salt_block"],
    // B · 4b71b3098df5
    "characters.ilya.gates.ilya_gives_you_the_cages.label": "Il te raconte la partie qu’il n’a vendue à personne",
    // B · 55a54e80451a
    "characters.ilya.gates.ilya_gives_you_the_cages.kind": "TRUST",
    // B · 914d56c9d9cd
    "characters.ilya.gates.ilya_gives_you_the_cages.requires.hasItems": ["burnt_hide"],
    // B · 5b96f506ddf3
    "characters.ilya.combatant.tags": ["cavalier","ptérosaure"],
    // B · 62afbf15e2b8
    "characters.torren.name": "Torren Vale",
    // A · 54b0bd2e5642
    "characters.torren.role": "Héritier Stoneback et négociateur, sa famille gère le relevé des corridors dont tout le monde dispute, et il est bien plus fin que son savoir-vivre ne le laisse entendre",
    // A · c5d3b603a1c5
    "characters.torren.cardBlurb": "C’est lui qui a fait que ce passage ait des règles, et il expliquera ta position mieux que toi avant de la contester. Sa famille achète aussi discrètement des prédateurs capturés, il le sait à moitié, et ça pourrait bien être toi qui lui en parlera.",
    // B · fcca6b746d0b
    "characters.torren.pronouns": "il/lui",
    // A · 492325e2855e
    "characters.torren.publicTraits": ["Ne hausse jamais la voix, et on ne lui coupe jamais la parole","Cite une année et un précédent pour tout","Note ce que les autres disent et le leur lit"],
    // B · 318f0ac9b0b6
    "characters.torren.hiddenDrives": ["Il veut être celui qui a tenu la région unie, et il ne sait pas combien de sa patience vient du principe et combien de ça","Il a commencé à soupçonner ce que sa famille achetait et choisit dans quel ordre il le découvre"],
    // B · a7428397fc4a
    "characters.torren.values": ["Un accord écrit qui survit aux gens qui l’ont fait","Le travail ingrat — relevés, comptes, droits d’eau — qui nourrit quatre cent mille personnes"],
    // B · d6e3245d7e28
    "characters.torren.fears": ["Une guerre qui détruit quarante ans de réseau commercial en une saison","Découvrir que la stabilité qu’il a passé sa vie à défendre a été achetée avec quelque chose qu’il n’aurait pas approuvé"],
    // A · c5b9dc320442
    "characters.torren.socialStyle": "Il écoute tout, reformule ta position mieux que toi, puis conteste. Il se sert du silence avant sa réponse comme d’un outil. Presque impossible à énerver, très facile à décevoir.",
    // B · dfb15a8627e6
    "characters.torren.boundaries": ["Ne signera rien au cercle qu’il ne peut pas mettre sur le cordon devant témoins","Ne acceptera pas qu’on lui donne des preuves en privé sur lesquelles il doit agir en public sans dire d’où elles viennent"],
    // B · a02cbc33f068
    "characters.torren.goals": ["Obtenir cinq signatures sur un accord de corridor avant l’arrivée des troupeaux, à presque n’importe quel prix pour Stoneback","Découvrir ce que son oncle a payé, et décider quoi faire ensuite"],
    // B · 2d648a77d279
    "characters.torren.secrets.torren_the_purchases.fact": "L’argent des Vale a acheté onze prédateurs capturés en deux ans via un intermédiaire géré par son oncle. Il connaît le nombre et ne sait pas encore à quoi ils servaient.",
    // B · 47558a04be8d
    "characters.torren.secrets.torren_the_purchases.visibility": "NPC_PRIVATE",
    // B · fba62f5e54fa
    "characters.torren.secrets.torren_the_purchases.revealHint": "Il te donne lui-même le nombre, précisément, si tu lui apportes une preuve de la méthode plutôt qu’une accusation contre sa famille.",
    // B · f07dc4787adc
    "characters.torren.secrets.torren_the_survey.fact": "L’enquête sur le corridor Stoneback date de onze ans et n’a jamais été refaite. Il sait depuis un an qu’elle est probablement fausse, mais il l’a utilisée quand même parce qu’un chiffre faux partagé maintient les négociations.",
    // B · 47558a04be8d
    "characters.torren.secrets.torren_the_survey.visibility": "NPC_PRIVATE",
    // B · fdf65a8e79bc
    "characters.torren.secrets.torren_the_survey.revealHint": "Il l’admet instantanément, et avec un soulagement visible, à quiconque arrive avec une mesure plus récente.",
    // A · 85be76795e13
    "characters.torren.speechStyle": "Phrases mesurées et complètes, avec la subordonnée qui fait tout le travail. Dates et précédents utilisés comme d’autres usent d’adjectifs. Ne dit jamais non franchement, mais ce qui devrait être vrai pour que ça soit possible. Formules de politesse, même sous pression, surtout sous pression.",
    // A · 7b327d76b7f0
    "characters.torren.topics": ["le relevé des corridors","la loi du serment","sa famille","le traité","les droits sur l’eau","les autres délégations"],
    // A · 2b709509e23a
    "characters.torren.voiceSamples": ["La onzième année, on a donné à Frostfang les terres de l’est en sachant que c’était temporaire, et ça fait un moment que je sais que personne n’a jamais remis en question le mot temporaire.","Ce n’est pas impossible. Quatre choses doivent d’abord être vraies, aucune n’est à ma portée. Va les rendre vraies, puis reviens me demander devant témoins.","Onze animaux, sur deux ans, par l’intermédiaire d’un homme avec qui mon oncle traite et moi non. C’est le chiffre. Tu fais ce que tu veux, mais j’aimerais que ce soit devant témoins.","Ta mesure est plus récente que la mienne et elle est pire pour mon peuple. Écris ça sur la peau."],
    // B · 19739f24ab77
    "characters.torren.appearance": "Fin de vingtaine, grand et légèrement voûté par une vie passée à des tables basses, cheveux foncés et soignés, tissu tissé en couches aux couleurs de la confédération, et un cordon noué de relevés autour d’un poignet qu’il touche en réfléchissant.",
    // B · 7c3c9c449385
    "characters.torren.visualHook": "Un cordon de relevés enroulé deux fois autour de son poignet gauche, dont il fait glisser les nœuds du pouce quand il cherche une solution.",
    // B · 9ead5b860480
    "characters.torren.silhouette": "Debout très immobile, les mains dans le dos pendant que tout le monde autour fait des gestes.",
    // B · 66ecd96bf9a5
    "characters.torren.artSeed": "pc-torren-01",
    // B · 76d300354dbb
    "characters.torren.portrait": "story_primal_crown/torren",
    // B · f233ece4b2f5
    "characters.torren.expressions": ["neutre","pensif","grave","content","épouvanté"],
    // B · 4335cf3b71d5
    "characters.torren.knowledgeScope": ["torren","stoneback","the_corridor_survey","oath_law","sunscar_crossing","the_delegations"],
    // B · fa9f7fe53cf9
    "characters.torren.gates.torren_shows_you_the_survey.label": "Il admet que l’enquête a onze ans",
    // B · 55a54e80451a
    "characters.torren.gates.torren_shows_you_the_survey.kind": "CONFIANCE",
    // B · 25f771471789
    "characters.torren.gates.torren_shows_you_the_survey.requires.flagsSet": ["parlé :torren"],
    // B · 1a3fbea3c8e8
    "characters.torren.gates.torren_names_his_uncle.label": "Il te donne le numéro et le nom",
    // B · 55a54e80451a
    "characters.torren.gates.torren_names_his_uncle.kind": "CONFIANCE",
    // B · 92e27ab3b965
    "characters.torren.gates.torren_names_his_uncle.requires.hasItems": ["pot_de_parfum"],
    // B · d0a0d6aadac3
    "characters.torren.combatant.tags": ["confédération"],
    // B · 5eb167276466
    "characters.mako.name": "Mako Reed",
    // A · 94c16ec0227f
    "characters.mako.role": "Guérisseur Mireborn et guide de rivière, il soigne ton animal gratuitement puis te dit exactement ce que tu lui as fait",
    // A · 3943c27045c0
    "characters.mako.cardBlurb": "Il soigne ton animal gratuitement, puis t’explique exactement ce que tu lui as fait. Si les négociations sur le corridor échouent et que les réfugiés descendent sa rivière, il a déjà calculé combien ils seront, et il te donnera ce chiffre si tu lui poses une vraie question.",
    // B · fcca6b746d0b
    "characters.mako.pronouns": "il/lui",
    // A · f9bc0608fbc1
    "characters.mako.publicTraits": ["Travaille en parlant sans jamais lever les yeux","Corrige immédiatement la version romantique des choses","Nourrit et soigne tout le monde, même ceux qu’il vient d’insulter"],
    // B · 918b6a37b8df
    "characters.mako.hiddenDrives": ["Il veut qu’un des quatre peuples les plus importants reconnaisse que le delta est là où leurs échecs vont être pris en charge","Il calcule discrètement combien les zones humides peuvent réellement supporter, et ce nombre lui fait peur"],
    // B · 2b647468cbd6
    "characters.mako.values": ["L’animal devant lui, avant la politique de qui le possède","Dire la vérité physique d’une chose à voix haute, surtout à une table où les gens s’amusent"],
    // B · 4f70323d2488
    "characters.mako.fears": ["Soixante mille personnes arrivant au delta en une saison sans rien","Être chaleureusement remercié par des gens qui ont déjà décidé de ne rien changer"],
    // A · ba99ede7abbf
    "characters.mako.socialStyle": "Calme au point d’en être déstabilisant. Il demande ce que tu as vraiment fait, pas ce que tu voulais faire. Il balance le fait froid sur le même ton que la bonne humeur, ce qui dérange.",
    // B · ac842c894b0d
    "characters.mako.boundaries": ["Ne soignera pas un animal devant un public invité à l’admirer","Ne laissera pas quelqu’un décrire une guerre comme une solution en sa présence sans dire ce que ça coûte en vies humaines"],
    // B · eafe076b7e94
    "characters.mako.goals": ["Obtenir un accord écrit sur l’eau et le passage pour le delta avant, pas après, le début de la lutte pour le corridor","Comprendre lequel des quatre peuples les plus importants respecterait vraiment un tel accord"],
    // B · 1a597534f305
    "characters.mako.secrets.mako_the_count.fact": "Il a calculé ce que les zones humides peuvent nourrir pendant un mauvais hiver. C’est moins de douze mille, et quatre peuples supposent actuellement que c’est illimité.",
    // B · 47558a04be8d
    "characters.mako.secrets.mako_the_count.visibility": "NPC_PRIVÉ",
    // B · ad98bedd7ded
    "characters.mako.secrets.mako_the_count.revealHint": "Il donne le chiffre clairement à la première personne qui demande ce qui se passe si les négociations échouent, plutôt que de lui demander d’espérer.",
    // B · b09abdc9e47e
    "characters.mako.secrets.mako_treated_them.fact": "Trois prédateurs blessés lui ont été amenés il y a un an par des gens sans couleurs qui ont payé en obsidienne travaillée, et les blessures étaient identiques et délibérées.",
    // B · 47558a04be8d
    "characters.mako.secrets.mako_treated_them.visibility": "NPC_PRIVÉ",
    // B · 8833c0ec9491
    "characters.mako.secrets.mako_treated_them.revealHint": "Il reconnaît instantanément le motif si on lui montre une blessure, et il la décrit en détail médical sans qu’on lui demande deux fois.",
    // A · e69fd495d5bb
    "characters.mako.speechStyle": "Posé, clair et précis physiquement. Il nomme le tissu, l’os, le nombre de jours. Il répond à une grande question par une petite, concrète. Il ne hausse jamais la voix et ne minimise jamais un chiffre. Il dit « tu » là où les autres choisiraient une forme passive.",
    // A · 0ebb30c1010e
    "characters.mako.topics": ["le delta","ce que les zones humides peuvent supporter","les blessures","les prédateurs blessés","les droits sur l’eau","ton animal"],
    // A · f3fc40394a43
    "characters.mako.voiceSamples": ["Le tendon est coupé, ça ne reviendra pas. Il lui reste neuf ou dix bonnes années, mais aucune sans te porter. Assieds-toi.","Douze mille. C’est ce que les zones humides nourrissent en hiver difficile. Quatre peuples en amont partent du principe que ce chiffre est le ciel.","Les gens n’arrêtent pas de me raconter ce qu’ils avaient en tête. Moi, je demande ce que tu as fait. Ce sont deux phrases différentes, et une seule a un traitement.","Quelqu’un m’en a amené trois l’année dernière. Même blessure, même endroit, même côté. Ce n’est pas de la chasse. C’est une méthode."],
    // B · b7837e97a72b
    "characters.mako.appearance": "Quarantaine, tête rasée de près, avant-bras puissants, un guide de rivière avec un vêtement en roseaux superposés sur les épaules nues, et des mains tachées en permanence en vert-brun jusqu’au poignet à cause des plantes avec lesquelles il travaille.",
    // B · 2ffe19770495
    "characters.mako.visualHook": "Mains teintées en vert-brun jusqu’au poignet, qu’il ne nettoie pas parce que ça revient en moins d’un jour.",
    // B · 800c94a4699b
    "characters.mako.silhouette": "Accroupi au niveau de ce qu’il soigne, dos à la pièce.",
    // B · 45e829301b9d
    "characters.mako.artSeed": "pc-mako-01",
    // B · 362f2dad270d
    "characters.mako.portrait": "story_primal_crown/mako",
    // B · 99fc4cc99e80
    "characters.mako.expressions": ["neutre","absorbé","brut","gentil","sombre"],
    // B · 4154185fdcb4
    "characters.mako.knowledgeScope": ["mako","mireborn","le_delta","soins","les_prédateurs_blessés","passage_du_soleil"],
    // B · be64065ef118
    "characters.mako.gates.mako_gives_you_the_number.label": "Il te dit ce que les zones humides peuvent réellement supporter",
    // B · 55a54e80451a
    "characters.mako.gates.mako_gives_you_the_number.kind": "CONFIANCE",
    // B · 32d5f69049ac
    "characters.mako.gates.mako_gives_you_the_number.requires.flagsSet": ["parlé :mako"],
    // B · d9c6fdbd7193
    "characters.mako.gates.mako_identifies_the_method.label": "Il nomme le motif des blessures pour ce que c’est",
    // B · 9e8ae18bf8bf
    "characters.mako.gates.mako_identifies_the_method.kind": "ALLIANCE",
    // B · 914d56c9d9cd
    "characters.mako.gates.mako_identifies_the_method.requires.hasItems": ["peau_brieûlée"],
    // B · 60c18a94db40
    "characters.mako.combatant.tags": ["mireborn"],
    // B · ba6bab24aa2b
    "characters.vesh.name": "Vesh Ardan",
    // A · 3e4ddc61e712
    "characters.vesh.role": "Dompteuse d’animaux sauvages sans couleurs qui vend des bêtes compliquées aux avant-postes et s’y connaît parfaitement",
    // A · 9546593d5cfa
    "characters.vesh.cardBlurb": "Elle peut toucher un animal que personne d’autre n’approche, elle charge très peu, et elle n’appartient à aucun des cinq peuples ici. C’est la première vraie personne utile que tu croiseras au passage — c’est son but.",
    // B · aee35f364a88
    "characters.vesh.pronouns": "elle",
    // A · 532787b70db1
    "characters.vesh.publicTraits": ["S’occupe d’animaux que les autres ont abandonnés","Propose des prix toujours plus bas que les autres sans jamais dire pourquoi","Ne parle jamais de ses origines"],
    // B · d59f55deeedf
    "characters.vesh.hiddenDrives": ["Elle veut que les négociations sur le corridor échouent, et elle veut être à côté de quelqu’un d’utile quand ça arrive","Elle commence à aimer certaines des personnes qu’elle est venue détruire, et gère ça comme un problème technique"],
    // B · ac979b1b3d5a
    "characters.vesh.values": ["Précision. Une méthode qui marche à chaque fois sur chaque animal, peu importe ce que les gens en pensent","Ne pas mentir, au sens strict de ne jamais dire une phrase fausse, ce dont elle est rigoureuse"],
    // B · dd93538c336b
    "characters.vesh.fears": ["Être identifiée par son travail plutôt que par ce qu’elle a dit","Que le réseau qu’elle sert la considère comme un des animaux en cage"],
    // A · f3bb08042ba0
    "characters.vesh.socialStyle": "Directe, voix basse, sans une once de bavardage. Répond complètement aux questions techniques, et aux questions personnelles d’une phrase vraie plus courte. Elle regarde les mains, pas les visages.",
    // B · 67387519b3a9
    "characters.vesh.boundaries": ["Ne discutera pas d’où elle l’a appris, et mettra fin à la conversation plutôt que de détourner","Ne prendra pas en charge un animal qu’elle pense ne pas pouvoir sauver, et le dit tout de suite"],
    // B · 39920f6c0a57
    "characters.vesh.goals": ["Rendre le corridor nord inutilisable jusqu’à ce que l’accord s’effondre","Recruter quelqu’un à ce passage qui s’y connaît en animaux et manque de gens qui ne lui doivent rien"],
    // B · d96a0947190d
    "characters.vesh.secrets.vesh_the_hand.fact": "Elle est la Main Cendrée. Les pots à odeur sont à elle, les blessures sur les prédateurs sont son œuvre, et elle a été à chacun des quatre derniers passages sous un commerce différent.",
    // B · 47558a04be8d
    "characters.vesh.secrets.vesh_the_hand.visibility": "NPC_PRIVATE",
    // B · 3899cb9844da
    "characters.vesh.secrets.vesh_the_hand.revealHint": "Elle ne nie pas quand on lui montre un pot avec son empreinte digitale dans la cire. Elle demande ce que tu veux, ce qui est déjà la réponse.",
    // B · 431a30193ad9
    "characters.vesh.secrets.vesh_the_method.fact": "La méthode est répétable et transmissible : une blessure à un endroit précis, la faim, le feu et l’odeur, et n’importe quel prédateur devient un outil qui fait bouger les troupeaux sur cent milles.",
    // B · 47558a04be8d
    "characters.vesh.secrets.vesh_the_method.visibility": "NPC_PRIVATE",
    // B · fde4d3f2ddcd
    "characters.vesh.secrets.vesh_the_method.revealHint": "Elle l’enseignera, simplement et sans conditions, à quiconque lui demande après avoir compris ce qu’elle est.",
    // A · 558004875c70
    "characters.vesh.speechStyle": "Voix posée, technique, sans se presser, ni chaleureuse ni menaçante pour autant. Décrit les animaux comme des mécanismes — pression, faim, angle d’une blessure — mais rarement les humains. Répond à une question sur elle par une phrase courte et vraie, puis s’arrête.",
    // A · eea1b2c58341
    "characters.vesh.topics": ["animaux difficiles","la méthode","les cages","l’utilité d’un prédateur","le corridor","son prix"],
    // A · 10ed3c99a079
    "characters.vesh.voiceSamples": ["Ce n’est pas vicieux. Il a été blessé à l’épaule et il a appris que tout ce qui venait de la gauche était ce qui l’avait blessé. Approche par la droite et c’est un animal différent.","La faim, une blessure à un endroit précis, le feu derrière et une odeur devant. Quatre choses. Il fait traverser quatre-vingt mille têtes sur cent kilomètres sans en toucher une seule.","Tu me demandes où je l’ai appris. Je ne vais pas te le dire.","On pourrait tenir le corridor avec six personnes et une saison sèche. Personne ici ne l’a calculé, c’est pourquoi ils tournent tous autour d’une peau de bête à se disputer des cailloux."],
    // B · 1603449011e6
    "characters.vesh.appearance": "Trentenaire, maigre, cheveux tirés en arrière, vêtements en peau non marqués aux couleurs d’aucun peuple, et les deux avant-bras couverts de cicatrices en croissants qui se chevauchent, souvenir d’une vie avec des animaux qui ne voulaient pas être manipulés.",
    // B · f5403cc529e2
    "characters.vesh.visualHook": "Cicatrices de morsures en croissants qui se chevauchent sur les deux avant-bras, visibles par tous les temps.",
    // B · aa98bacc2021
    "characters.vesh.silhouette": "Debout de profil par rapport à ce qu’elle regarde, mains lâches et vides.",
    // B · 3d9461e612fb
    "characters.vesh.artSeed": "pc-vesh-01",
    // B · 8ad61be06dbd
    "characters.vesh.portrait": "story_primal_crown/vesh",
    // B · 42a68e71db04
    "characters.vesh.expressions": ["neutre","évaluative","technique","immobile","franche"],
    // B · d4fe12f4651d
    "characters.vesh.knowledgeScope": ["vesh","la_méthode_cendrée","camp_cendré","crête_verre_noir","monture_liée","les_lignes_de_piquet"],
    // B · 2de747c8b14f
    "characters.vesh.gates.vesh_works_your_animal.label": "Elle posera une main sur quelque chose qui t’appartient",
    // B · 77dcad9b37cc
    "characters.vesh.gates.vesh_works_your_animal.kind": "OTHER",
    // B · 8a50d5e0d573
    "characters.vesh.gates.vesh_works_your_animal.requires.flagsSet": ["parlé :vesh"],
    // B · 00f73fca005e
    "characters.vesh.gates.vesh_stops_lying_by_omission.label": "Elle répond à la question que tu as vraiment posée",
    // B · 55a54e80451a
    "characters.vesh.gates.vesh_stops_lying_by_omission.kind": "TRUST",
    // B · 92e27ab3b965
    "characters.vesh.gates.vesh_stops_lying_by_omission.requires.hasItems": ["pot_odeur"],
    // B · 9ea032601f71
    "characters.vesh.scouting.revealCopy": "Elle regarde tes mains plutôt que ton visage quand tu parles. « Tu te tais avant de décider quelque chose. À chaque fois. Tu l’as fait trois fois depuis que tu es assis. »",
    // B · ea901526dd59
    "characters.vesh.combatant.tags": ["cendrée","dresseuse"],
    // B · a3f3310d3256
    "factions.faction_stoneback.name": "La Confédération Dos-de-Pierre",
    // B · 1262e34b37a7
    "factions.faction_stoneback.description": "Agriculteurs, ingénieurs et commerçants de la vallée, qui déplacent d’énormes animaux cornus et d’énormes quantités de marchandises, et dont la loi du serment est la raison pour laquelle ce passage est un terrain neutre.",
    // B · 5d8dbddf2622
    "factions.faction_stoneback.allies": ["faction_mireborn"],
    // B · 9ad5fd253c98
    "factions.faction_stoneback.enemies": ["faction_ashen"],
    // B · 1fc8e6b1cbeb
    "factions.faction_emberclaw.name": "Les Clans Griffe-de-Flamme",
    // B · eda35e30a085
    "factions.faction_emberclaw.description": "Cavaliers des prairies sur raptors et carnivores légers, les plus rapides à ce passage et les pires pour s’entendre entre eux. Quatre clans, quatre avis, une très bonne raison d’explorer la route nord en ce moment.",
    // B · 9ad5fd253c98
    "factions.faction_emberclaw.enemies": ["faction_ashen"],
    // B · c58b0f85fce1
    "factions.faction_frostfang.name": "Les Tribus Croc-de-Givre",
    // B · 318d76e77a4d
    "factions.faction_frostfang.description": "Parenté de chasseurs du nord sur tigres à dents de sabre, loups terribles et mammouths. Ils sont venus de le plus loin, ont eu le pire terrain pendant onze ans d’affilée, et ne l’ont jamais évoqué au cercle.",
    // B · 9ad5fd253c98
    "factions.faction_frostfang.enemies": ["faction_ashen"],
    // B · cfac5c10d648
    "factions.faction_skyfire.name": "Les Nomades Feu-du-Ciel",
    // B · b4043364777c
    "factions.faction_skyfire.description": "Peuple des falaises et du désert sur ptérosaures, qui porte tous les messages qui traversent cette région et connaît donc ce qu’ils contiennent pour la plupart. Riche en informations et pauvre en terrain.",
    // B · 92bbebe12436
    "factions.faction_mireborn.name": "La Fédération Marécageuse",
    // B · d1361def1db6
    "factions.faction_mireborn.description": "Peuple des deltas et zones humides sur hadrosaures et bêtes fluviales, avec la meilleure médecine et la meilleure connaissance des plantes de la région, constamment sous-estimés par tous ceux qui ont eu besoin de l’un ou de l’autre.",
    // B · 219dcb5fda20
    "factions.faction_mireborn.allies": ["faction_stoneback"],
    // B · 9ad5fd253c98
    "factions.faction_mireborn.enemies": ["faction_ashen"],
    // B · 58368778ee7a
    "factions.faction_ashen.name": "La Main Cendrée",
    // B · 9ed5cdd918cd
    "factions.faction_ashen.description": "Pas un peuple. Un réseau sans couleurs, sans territoire et sans anciens, qui déplace les animaux en les effrayant et les peuples de la même façon, et qui veut que les accords sur les corridors échouent.",
    // B · edb2a9b914b2
    "factions.faction_ashen.enemies": ["faction_stoneback","faction_emberclaw","faction_frostfang","faction_mireborn"],
    // B · 26beec586eee
    "quests.q_the_crossing.title": "Trois jours à Sunscar",
    // B · 250b4b7c0a99
    "quests.q_the_crossing.summary": "Cinq peuples, une peau avec cinq pierres dessus, et un accord qui a mis quarante ans à se construire et qu’il faut maintenant redessiner avant l’arrivée des troupeaux.",
    // B · 7fcc0be2ad9c
    "quests.q_the_crossing.kind": "PRINCIPALE",
    // B · 27ea671682ad
    "quests.q_the_crossing.steps.the_loose_animal.playerCopy": "Un prédateur effrayé est lâché dans une allée pleine de monde. Fais quelque chose, ou pas.",
    // B · 9f6adfa96daa
    "quests.q_the_crossing.steps.the_loose_animal.directorNotes": "Ce n’est pas un combat tutoriel. Toutes les options sont valides, y compris partir, et l’animal est un juvénile terrifié plutôt que chasseur. Quoi que le joueur fasse, une quarantaine de personnes le regardent ainsi que Kaia, déjà sur le toit de l’étal avec une corde et sans plan.",
    // B · 8b2b464a7f07
    "quests.q_the_crossing.steps.the_loose_animal.rewards.flags": ["knows :the_crossing"],
    // B · 0ee67ea83c73
    "quests.q_the_crossing.steps.find_out_what_they_want.playerCopy": "Cinq délégations, cinq histoires sur pourquoi les troupeaux ont changé de route. Va les recueillir.",
    // B · 57b5a0f34783
    "quests.q_the_crossing.steps.find_out_what_they_want.directorNotes": "C’est l’étape de construction du monde et ça doit être agréable. Feux, nourriture, courses, une dispute sur la cuisine de quelqu’un. Chaque peuple donne un récit différent, chaque récit est honnête et partiel. Personne ne ment ici et les cinq ont tort sur la cause.",
    // B · 8b2b464a7f07
    "quests.q_the_crossing.steps.find_out_what_they_want.enterWhen.flagsSet": ["knows :the_crossing"],
    // B · 415964032bf0
    "quests.q_the_crossing.steps.find_out_what_they_want.rewards.flags": ["knows :five_accounts"],
    // B · d3fd385510b8
    "quests.q_the_crossing.steps.the_corridor_question.playerCopy": "Le cercle va régler la question du corridor nord. Décide si tu as quelque chose à mettre sur la peau.",
    // B · fcef2521d615
    "quests.q_the_crossing.steps.the_corridor_question.directorNotes": "Quatre façons de faire bouger ça, et elles ne sont pas équivalentes. Une mesure plus récente change les chiffres dont tout le monde débat. Une preuve physique change complètement le sujet. Parler pour un peuple t’engage envers lui. Ne rien faire est une vraie option et le cercle tranche sans toi, ce qui ne doit pas être écrit comme une punition.",
    // B · 415964032bf0
    "quests.q_the_crossing.steps.the_corridor_question.enterWhen.flagsSet": ["knows :five_accounts"],
    // B · 625dd29e0c22
    "quests.q_the_crossing.steps.the_corridor_question.rewards.flags": ["the_circle_has_ruled"],
    // B · 7bdbc0965a2c
    "quests.q_the_crossing.involvedCharacterIds": ["kaia","torren","suri","ilya","mako"],
    // B · 43e7d0324e26
    "quests.q_the_crossing.involvedLocationIds": ["market_lanes","the_stone_circle","the_picket_lines"],
    // B · 10d3ab43378b
    "quests.q_the_crossing.knownRewardCopy": "Une place au bord du cercle, et une idée de qui, parmi ces cinq, tiendrait vraiment une promesse.",
    // B · c8e32684eb9e
    "quests.q_the_dead_herds.title": "Tués et abandonnés",
    // B · 671f13690cff
    "quests.q_the_dead_herds.summary": "Des animaux liés sont tués au nord du passage et ne sont pas mangés. Quatre peuples ont décidé que ce n’est pas leur problème tant que le corridor n’est pas réglé.",
    // B · 7fcc0be2ad9c
    "quests.q_the_dead_herds.kind": "PRINCIPALE",
    // B · b20940f700ce
    "quests.q_the_dead_herds.discoverWhen.flagsSet": ["knows :the_dead_herds"],
    // B · 23249446591f
    "quests.q_the_dead_herds.steps.go_and_look.playerCopy": "Va au nord et regarde un des animaux morts toi-même.",
    // B · 58fb43acbb82
    "quests.q_the_dead_herds.steps.go_and_look.directorNotes": "La brûlure est sur le flanc, elle est ancienne, et elle suit quatre lignes parallèles au pas, ce qui n’est ni un feu de prairie ni un prédateur. Un joueur qui ne sait pas ce qu’il regarde peut quand même montrer la peau à quelqu’un qui sait.",
    // B · 30356a581c66
    "quests.q_the_dead_herds.steps.go_and_look.rewards.flags": ["following_the_burns"],
    // B · ec868e0a03d7
    "quests.q_the_dead_herds.steps.the_broken_ground.playerCopy": "Trouve d’où viennent les pots et les prédateurs blessés.",
    // B · fd998f86be6e
    "quests.q_the_dead_herds.steps.the_broken_ground.directorNotes": "Quatre abris, trois cages et beaucoup d’argile cuite. Les animaux sont blessés de la même façon et gardés affamés exprès. Il n’y a pas de confrontation ici sauf si le joueur la provoque, et Vesh répondra aux questions techniques si on lui en pose.",
    // B · 30356a581c66
    "quests.q_the_dead_herds.steps.the_broken_ground.enterWhen.flagsSet": ["following_the_burns"],
    // B · 170f68be3faa
    "quests.q_the_dead_herds.steps.the_broken_ground.rewards.flags": ["knows :who_is_doing_it"],
    // B · 8913053e8208
    "quests.q_the_dead_herds.steps.the_broken_ground.rewards.abilities": ["work_by_fear"],
    // B · 2bc4e60fdec7
    "quests.q_the_dead_herds.steps.what_you_do_about_it.playerCopy": "Tu sais comment c’est fait et plus ou moins par qui. Décide ce que ça vaut.",
    // B · 73116c400313
    "quests.q_the_dead_herds.steps.what_you_do_about_it.directorNotes": "Nommer ça au cercle met fin au débat sur le corridor et en lance un autre. Le démonter toi-même, c’est un combat contre des gens très bons pour se battre avec des animaux. Rejoindre est une voie cohérente et doit être écrite comme telle — elle offre compétence et pas de couleurs à quelqu’un qui a passé trois jours à voir cinq peuples échouer à s’entendre.",
    // B · 170f68be3faa
    "quests.q_the_dead_herds.steps.what_you_do_about_it.enterWhen.flagsSet": ["knows :who_is_doing_it"],
    // B · aa05b9f67bff
    "quests.q_the_dead_herds.steps.what_you_do_about_it.rewards.flags": ["the_north_is_answered"],
    // B · 88ec5687e7a9
    "quests.q_the_dead_herds.involvedCharacterIds": ["suri","mako","ilya","vesh"],
    // B · 501cb4df6560
    "quests.q_the_dead_herds.involvedLocationIds": ["the_north_road","blackglass_ridge","mireborn_landing","ashen_camp"],
    // B · 35aa63064067
    "quests.q_the_dead_herds.knownRewardCopy": "Ce qui les tue vraiment, ce que aucun des cinq peuples ne croit pour l’instant.",
    // B · f3a18cfea4b3
    "quests.q_the_white_one.title": "Le Blanc",
    // B · b96ac8340163
    "quests.q_the_white_one.summary": "Un tyrannosaure albinos tue des animaux liés le long du corridor depuis deux ans. Trois peuples veulent le tuer et un pense qu’il est sacré.",
    // B · 552c0b7f83c2
    "quests.q_the_white_one.kind": "SECONDAIRE",
    // B · b20940f700ce
    "quests.q_the_white_one.discoverWhen.flagsSet": ["sait :les_troupes_mortes"],
    // B · 713ed7fa4fd5
    "quests.q_the_white_one.steps.find_the_white_one.playerCopy": "Trouve-le avant une des équipes de chasse.",
    // B · b774351756d5
    "quests.q_the_white_one.steps.find_the_white_one.directorNotes": "Il est énorme, il est vieux, il est couvert de blessures toutes au même endroit, et il ne chasse pas quand le joueur le trouve. Il se tient dans les grottes aux os, là où vont les animaux liés et d’où ils ne reviennent pas, et il ne fait rien du tout.",
    // B · e9f837818133
    "quests.q_the_white_one.steps.find_the_white_one.rewards.flags": ["sait :mâchoire_blanche"],
    // B · 5cab0d69092b
    "quests.q_the_white_one.steps.what_it_is_for.playerCopy": "Décide ce qu’est un animal qui a été conduit pendant deux ans.",
    // B · 041a21f12402
    "quests.q_the_white_one.steps.what_it_is_for.directorNotes": "Il peut être tué, et le tuer est un acte légitime et célébré qui ne résout rien, parce que ce qui le pousse est toujours dans un pli de roche à dix-sept kilomètres. Il peut être soigné. Il peut être laissé. Sous conditions très coûteuses, il peut être lié, et ce n’est pas une récompense pour avoir été gentil avec lui.",
    // B · e9f837818133
    "quests.q_the_white_one.steps.what_it_is_for.enterWhen.flagsSet": ["sait :mâchoire_blanche"],
    // B · a50341d0ebfc
    "quests.q_the_white_one.steps.what_it_is_for.rewards.flags": ["mâchoire_blanche_est_réglée"],
    // B · b5a169d48b0e
    "quests.q_the_white_one.involvedCharacterIds": ["suri","kaia","mako","vesh"],
    // B · 5fd9ab207c88
    "quests.q_the_white_one.involvedLocationIds": ["la_route_du_nord","les_grottes_aux_os","la_crête_de_verre_noir"],
    // B · 7e1178c35cf0
    "quests.q_the_white_one.knownRewardCopy": "Quelle que soit la plus grande bête que ces gens aient jamais vue, découvre à quoi elle sert.",
    // B · 5ae7904c4e36
    "quests.q_your_own_animal.title": "Quelque chose à toi",
    // B · 188ca6a5f8c2
    "quests.q_your_own_animal.summary": "Tout le monde à ce passage est quelqu’un grâce à ce qu’il monte. Toi, peut-être oui, peut-être non, et c’est une façon entière de jouer ça.",
    // B · 552c0b7f83c2
    "quests.q_your_own_animal.kind": "SECONDAIRE",
    // B · da46c9da86fa
    "quests.q_your_own_animal.steps.the_picket_lines_at_dusk.playerCopy": "Une demi-mile d’animaux attachés, quatre mille d’entre eux. Décide ce que tu vas en faire.",
    // B · 9ba2b2f14bb2
    "quests.q_your_own_animal.steps.the_picket_lines_at_dusk.directorNotes": "Quatre routes, aucune n’est la bonne. Un joueur qui finit l’histoire à pied, en bons termes avec les cinq peuples, a bien joué. Ne force personne à prendre une monture s’il ne l’a pas demandé.",
    // B · 3f46ba57345d
    "quests.q_your_own_animal.steps.the_picket_lines_at_dusk.rewards.flags": ["la_question_de_la_monture_est_réglée"],
    // B · 71dd798a14a1
    "quests.q_your_own_animal.steps.what_it_costs_to_keep_one.playerCopy": "Découvre ce que l’animal pense des trois derniers jours.",
    // B · 1568d63f1b21
    "quests.q_your_own_animal.steps.what_it_costs_to_keep_one.directorNotes": "Cette étape lit la bande de Sur ses gardes et la rejoue en comportement, pas en nombre. Un animal qui a été monté durement, effrayé et laissé à des étrangers est un animal différent de celui qui a été nourri, toiletté et laissé tranquille, et la différence doit se voir comme un refus ou un acte de confiance devant témoins.",
    // B · 3f46ba57345d
    "quests.q_your_own_animal.steps.what_it_costs_to_keep_one.enterWhen.flagsSet": ["la_question_de_la_monture_est_réglée"],
    // B · e54a689b1d38
    "quests.q_your_own_animal.steps.what_it_costs_to_keep_one.rewards.flags": ["tu_sais_à_quoi_t’en_tenir"],
    // B · 3d46de816ab9
    "quests.q_your_own_animal.involvedCharacterIds": ["kaia","vesh","mako","suri"],
    // B · 8759eb32725f
    "quests.q_your_own_animal.involvedLocationIds": ["les_lignes_de_piquet","allées_du_marché","l’atterrissage_des_mireborn"],
    // B · 3065f710d9c0
    "quests.q_your_own_animal.knownRewardCopy": "Un animal qui reconnaît ta voix, ou une très bonne raison de ne pas en avoir.",
    // B · d2daaf803cf2
    "quests.q_south.title": "Neuf jours vers le sud",
    // B · ad317be7ee65
    "quests.q_south.summary": "Quoi que le cercle ait décidé, les troupeaux avancent encore, et au bout il y a une plaine d’herbe haute où quelqu’un arrive le premier.",
    // B · 7fcc0be2ad9c
    "quests.q_south.kind": "PRINCIPALE",
    // B · 625dd29e0c22
    "quests.q_south.discoverWhen.flagsSet": ["le_cercle_a_tranché"],
    // B · ddfc904b91de
    "quests.q_south.steps.the_last_night_at_the_crossing.playerCopy": "Le marché se démonte. Décide avec qui tu voyages.",
    // B · 8f248b68f1a2
    "quests.q_south.steps.the_last_night_at_the_crossing.directorNotes": "Les tentes se replient, les dettes se règlent avec des cordes, des gens se disent au revoir pour un an. C’est l’étape chaleureuse, elle doit pouvoir être chaleureuse même si la partie a mal tourné.",
    // B · 625dd29e0c22
    "quests.q_south.steps.the_last_night_at_the_crossing.enterWhen.flagsSet": ["le_cercle_a_tranché"],
    // B · 50c729af01fd
    "quests.q_south.steps.the_last_night_at_the_crossing.rewards.flags": ["le_passage_est_terminé"],
    // B · 3bdeff838e4a
    "quests.q_south.steps.what_arrives.playerCopy": "Neuf jours, puis découvre ce qui se tient dans l’herbe au bout.",
    // B · 9150f3d52f2c
    "quests.q_south.steps.what_arrives.directorNotes": "L’étape de résolution. Elle lit l’Agitation et le résultat du corridor, et les rejoue comme des nombres sur le terrain : combien de têtes, combien de peuples, si quelqu’un se bat pour l’eau au sud. Ne pas commenter. Compter.",
    // B · 50c729af01fd
    "quests.q_south.steps.what_arrives.enterWhen.flagsSet": ["le_passage_est_terminé"],
    // B · d598a2bade41
    "quests.q_south.steps.what_arrives.rewards.flags": ["la_saison_est_décidée"],
    // B · e8007dcac344
    "quests.q_south.involvedCharacterIds": ["kaia","suri","torren","mako","ilya"],
    // B · fbf774d7b1b8
    "quests.q_south.involvedLocationIds": ["la_route_du_nord","herbe_du_sud","l’atterrissage_des_mireborn"],
    // B · 8d215460cd44
    "quests.q_south.knownRewardCopy": "Combien d’animaux et de personnes sortent de cette saison.",
    // B · faf55941450b
    "worldEvents.we_the_horizon_moves.publicCopy": "Les coupes s’immobilisent puis reprennent, plus fort. Au-delà des tentes, tout l’horizon nord a pris une couleur qu’il n’avait pas, et il bouge.",
    // B · 3e5ec497b90e
    "worldEvents.we_the_horizon_moves.directorNotes": "La migration arrive six semaines en avance, vue du milieu d’un marché. Tout le monde s’arrête. Puis tout le monde se met à bouger en même temps dans cinq directions différentes, et le jour prévu pour la traversée cesse d’exister.",
    // B · 4a2c85ac2b33
    "worldEvents.we_the_horizon_moves.setsFlags": ["les_troupeaux_ont_commence"],
    // B · 5846f902ff69
    "worldEvents.we_the_first_dead_herd.publicCopy": "Une équipe de chasse Frostfang arrive du nord avec rien sur ses traîneaux et tout le monde aux piquets s’arrête pour les regarder ne rien décharger.",
    // B · 20af62168f4a
    "worldEvents.we_the_first_dead_herd.directorNotes": "Ils ont trouvé quatre bêtes liées mortes et non mangées un jour plus au nord. Suri est avec eux. Elle ne compte pas en parler au cercle et expliquera pourquoi à quiconque lui demande directement, pas avec sympathie.",
    // B · b20940f700ce
    "worldEvents.we_the_first_dead_herd.setsFlags": ["sait :les_troupeaux_morts"],
    // B · 32e991e1a762
    "worldEvents.we_the_survey_argument.publicCopy": "Deux délégations se disputent sur un chiffre et une troisième a discrètement compris qu’aucune des deux n’est montée dans le corridor depuis l’année où ce chiffre a été écrit.",
    // B · 70ddb698ed1a
    "worldEvents.we_the_survey_argument.directorNotes": "Le relevé Stoneback date de onze ans et n’a jamais été refait. Torren le sait. Suri a une mesure plus récente en tête mais ne la donnera pas d’elle-même. Tout sur la peau dépend d’un chiffre que personne n’a vérifié.",
    // B · 359cd4b5b140
    "worldEvents.we_the_survey_argument.setsFlags": ["sait :le_releve"],
    // B · 8b2b464a7f07
    "worldEvents.we_the_survey_argument.requiresFlags": ["sait :la_traversee"],
    // B · 9db5ab4321a6
    "worldEvents.we_the_water_price.publicCopy": "Le prix de l’eau dans les allées a doublé depuis ce matin, et les vendeurs sont désolés mais ne baissent pas le prix.",
    // B · 1e1baf7c5458
    "worldEvents.we_the_water_price.directorNotes": "La première personne ordinaire touchée par la politique. Il n’y a pas de pénurie — il y a une attente de pénurie, ce qui est pire et arrive plus vite. Quelqu’un à un stand expliquera la raison et ce sera complètement logique.",
    // B · 422f705ff1df
    "worldEvents.we_the_water_price.setsFlags": ["le_prix_de_l_eau_a_hausse"],
    // B · f612d23a5b70
    "worldEvents.we_the_water_price.cancelledByFlags": ["la_main_est_nommee"],
    // B · 8b2b464a7f07
    "worldEvents.we_the_water_price.requiresFlags": ["sait :la_traversee"],
    // B · f50732bb6f47
    "worldEvents.we_a_picket_line_bolts.publicCopy": "Quelque chose au vent à quatre heures du matin fait que cent quarante animaux quittent les lignes en même temps, traversent deux camps, dans le noir.",
    // B · 3e02f59b3e0f
    "worldEvents.we_a_picket_line_bolts.directorNotes": "C’est la méthode utilisée sur la traversée elle-même. Personne n’est tué et beaucoup de choses sont cassées, et au matin trois peuples ont chacun décidé quel autre des deux l’a fait. Ne laissez personne deviner la vérité juste avec cet événement.",
    // B · 3b9c105b8296
    "worldEvents.we_a_picket_line_bolts.setsFlags": ["les_piquets_se_sont_enfuis"],
    // B · 8ffb15343c8b
    "worldEvents.we_a_picket_line_bolts.cancelledByFlags": ["la_main_est_nommee","le_camp_a_disparu"],
    // B · 8b2b464a7f07
    "worldEvents.we_a_picket_line_bolts.requiresFlags": ["sait :la_traversee"],
    // B · 2834e76a7121
    "worldEvents.we_the_ridge_smokes.publicCopy": "La crête noire au nord du corridor fume en colonne fine depuis l’aube, à midi il y en a deux, et personne à la traversée n’a d’histoire qui colle.",
    // B · 4e805b323021
    "worldEvents.we_the_ridge_smokes.directorNotes": "La vraie cause du changement de migration, visible de tous mais comprise de personne. Les cavaliers Skyfire l’ont vue de près. Ce n’est pas la Main Cendrée et ça sera imputé à eux ou à un peuple demain.",
    // B · 107e204fecea
    "worldEvents.we_the_ridge_smokes.setsFlags": ["sait :le_sol_bouge"],
    // B · 412faa7fe77c
    "worldEvents.we_white_maw_takes_one.publicCopy": "Quelque chose a emporté un rhino lié adulte sur le corridor en plein jour et l’a laissé là où il est tombé, et les cavaliers qui l’ont vu ne s’accordent pas sur sa taille.",
    // B · b9e06c0b8a30
    "worldEvents.we_white_maw_takes_one.directorNotes": "Le blanc, vu correctement pour la première fois. Il tue sans manger, ce que tout le monde interprète comme de la malveillance ou du sacré, alors que c’est ce qu’un animal fait quand il souffre depuis deux ans.",
    // B · e9f837818133
    "worldEvents.we_white_maw_takes_one.setsFlags": ["sait :machoire_blanche"],
    // B · 3c8f0111249a
    "worldEvents.we_white_maw_takes_one.cancelledByFlags": ["a_tue_machoire_blanche","a_lie_machoire_blanche"],
    // B · b20940f700ce
    "worldEvents.we_white_maw_takes_one.requiresFlags": ["sait :les_troupeaux_morts"],
    // B · 25dccd113cf5
    "worldEvents.we_the_circle_rules.publicCopy": "Cinq pierres sont déplacées sur la peau, dans un ordre que chacun présent décrira différemment toute sa vie, et le corridor nord appartient à quelqu’un.",
    // B · 58aa75d11b98
    "worldEvents.we_the_circle_rules.directorNotes": "La décision tombe que le joueur ait fait quelque chose ou pas. S’il a apporté une mesure ou une preuve physique, l’accord est différent et meilleur. Sinon les cinq le règlent eux-mêmes, mal mais honnêtement, ce n’est pas un échec.",
    // B · 625dd29e0c22
    "worldEvents.we_the_circle_rules.setsFlags": ["le_cercle_a_decide"],
    // B · cc43a8d4325a
    "worldEvents.we_the_circle_rules.cancelledByFlags": ["a_rejoint_la_main"],
    // B · 8b2b464a7f07
    "worldEvents.we_the_circle_rules.requiresFlags": ["sait :la_traversee"],
    // B · 2a3792cfaa8e
    "worldEvents.we_the_market_comes_down.publicCopy": "Six cents stands deviennent quatre cents puis quatre-vingts. Les dettes se règlent en public sur des cordes, et ceux qui ne se reverront pas avant un an prennent plus de temps que nécessaire.",
    // B · 7f0ca5accc44
    "worldEvents.we_the_market_comes_down.directorNotes": "Le moment chaleureux. Quoi qu’il soit arrivé, ça arrive : les tentes se replient, les adieux, la grand-mère de quelqu’un qui offre à l’enfant d’un autre une bête sculptée. Que ce soit agréable même si la partie a mal tourné.",
    // B · e6a18fa05aef
    "worldEvents.we_the_market_comes_down.setsFlags": ["le_marche_a_ferme"],
    // B · 625dd29e0c22
    "worldEvents.we_the_market_comes_down.requiresFlags": ["le_cercle_a_decide"],
    // B · 3cd5ecfa43ee
    "worldEvents.we_the_corridor_fight.publicCopy": "Deux peuples arrivent à la même eau le même matin avec le même document mais des interprétations différentes, et quand un responsable arrive, c’est déjà fini.",
    // B · 2400b09f283f
    "worldEvents.we_the_corridor_fight.directorNotes": "Ce que produit un pic d’Agitation au maximum. Personne ne l’a prévu et tout le monde était prêt. Écris petit et au ras du sol — une eau, deux équipes, quarante personnes, et un événement irréversible.",
    // B · 347e32ce11ec
    "worldEvents.we_the_corridor_fight.setsFlags": ["la_bagarre_du_corridor_est_arrivee","la_migration_a_casse"],
    // B · a046e2029330
    "worldEvents.we_the_corridor_fight.cancelledByFlags": ["la_main_est_nommee","un_feu_cinq_peuples","les_chiffres_ont_change"],
    // B · 625dd29e0c22
    "worldEvents.we_the_corridor_fight.requiresFlags": ["le_cercle_a_regne"],
    // B · d77ebfcebe44
    "promises.p_who_holds_the_corridor.kind": "FINALE",
    // B · fe786eabb73b
    "promises.p_who_holds_the_corridor.label": "Qui tient le corridor nord quand les troupeaux arrivent",
    // B · 8c38c68a7837
    "promises.p_who_holds_the_corridor.seedHint": "Cinq pierres de rivière gravées sur une peau tendue, et quarante ans d’accords sur qui traverse où.",
    // B · 97d19374baf1
    "promises.p_who_holds_the_corridor.payoffHint": "Les pierres sont déplacées, dans un ordre que chacun présent décrira différemment pour le reste de sa vie.",
    // B · e82d9dc4b3fa
    "promises.p_why_they_turned.kind": "MYSTÈRE",
    // B · 03bb2d4ee80f
    "promises.p_why_they_turned.label": "Pourquoi les troupeaux ont tourné six semaines en avance",
    // B · 9e6c3297da0c
    "promises.p_why_they_turned.seedHint": "Quelqu’un dit que le sol sur la crête noire est chaud depuis le printemps, mais personne ne le croit.",
    // B · 3f52da858868
    "promises.p_why_they_turned.payoffHint": "Une arête de roche volcanique avec de nouvelles fissures, et quatre personnes vivantes qui ont compris ce que ça signifie.",
    // B · 5631e4ba6537
    "promises.p_the_white_one.kind": "PATRON",
    // B · 9d5beab29c77
    "promises.p_the_white_one.label": "L’animal qui tue sans se nourrir",
    // B · 77aeb7f7104f
    "promises.p_the_white_one.seedHint": "Quatre animaux liés morts et non mangés, et une chasse qui revient sans rien sur ses traîneaux.",
    // B · 35fb37c26899
    "promises.p_the_white_one.payoffHint": "Il est énorme, il est vieux, chaque blessure est au même endroit, et il reste immobile dans une grotte.",
    // B · 63a719ec7f2d
    "promises.p_the_method.kind": "RIVALITÉ",
    // B · 967345ff7d30
    "promises.p_the_method.label": "Quelqu’un qui déplace quatre-vingt mille animaux sans en toucher un seul",
    // B · 707d32393055
    "promises.p_the_method.seedHint": "Un dompteur au bout des piquets qui gère ce que personne d’autre ne veut et facture trop peu.",
    // B · fa728d1a0718
    "promises.p_the_method.payoffHint": "Faim, une blessure au même endroit, du feu derrière et une odeur devant. Quatre choses, et un corridor tenu par six personnes.",
    // B · 445cd8deebc2
    "promises.p_your_own_animal.kind": "RELATION",
    // B · 80cb097ada65
    "promises.p_your_own_animal.label": "Si quelque chose à ce passage finit par être à vous",
    // B · b5c2ffc72298
    "promises.p_your_own_animal.seedHint": "Un demi-kilomètre d’animaux attachés, et un au bout que trois personnes ont déjà abandonné.",
    // B · fb9756e8ee67
    "promises.p_your_own_animal.payoffHint": "Il traverse une allée bondée parce que vous le lui avez demandé, ou il place trois autres animaux entre vous deux.",
    // B · a1877cdd6c86
    "endings.end_the_herds_reach_south.name": "Les Troupeaux Arrivent au Sud",
    // B · c9d08ae5d876
    "endings.end_the_herds_reach_south.rarity": "FRÉQUENT",
    // B · 7f72deb6afe4
    "endings.end_the_herds_reach_south.requires.flagsSet": ["les_troupeaux_sont_arrives_au_sud"],
    // B · 0d23e59311c4
    "endings.end_the_herds_reach_south.requires.flagsUnset": ["la_migration_a_echoue"],
    // B · 2ba81a0db61f
    "endings.end_the_herds_reach_south.condition": "Le bon résultat ordinaire. Un accord que personne n’aime mais qui tient assez longtemps pour que la plupart des animaux atteignent l’herbe, et cinq peuples reviendront à ce marché la saison prochaine pour en rediscuter. Écris l’arithmétique plutôt que le triomphe : combien de têtes, quel corridor, qui est furieux en silence et revient pour ça.",
    // A · 5a246531aa3b
    "endings.end_the_herds_reach_south.epilogue": "La plaine du sud les accueille comme chaque année dont on se souvienne. Un quinzaine difficile au milieu quand deux peuples partagent une eau qu’ils n’avaient pas prévu de partager, sans que ça ne gêne personne. Au deuxième mois, les mises bas sont meilleures que l’an dernier et l’arrangement que tout le monde critiquait commence à être vu comme une tradition.",
    // B · 1033e8919a66
    "endings.end_one_fire_five_peoples.name": "Un Feu, Cinq Peuples",
    // B · f8b8333fe7bc
    "endings.end_one_fire_five_peoples.rarity": "RARE",
    // B · 747b4c0734bc
    "endings.end_one_fire_five_peoples.requires.flagsSet": ["un_feu_cinq_peuples","la_main_est_nommee"],
    // B · fd3a56d4764d
    "endings.end_one_fire_five_peoples.condition": "Le corridor a été réglé sur des chiffres réels avec le sabotage nommé à voix haute, et cinq peuples en sont sortis avec un accord plutôt que cinq griefs. C’est la chose la plus difficile au monde à faire et ça ne doit pas se lire comme une récompense pour être conciliant — il a fallu une mesure, une preuve physique, et quelqu’un prêt à être détesté au cercle.",
    // A · 6944814b46d9
    "endings.end_one_fire_five_peoples.epilogue": "Ils gardent la peau. Elle va au sud avec les Stoneback et revient chaque saison avec une pierre ajoutée, chose imprévue et qui, en neuf ans, devient la raison même de ce passage. Les Frostfang reprennent leurs terres de l’est la deuxième année. Personne ne remercie jamais formellement, mais chacun des cinq sait exactement qui c’était.",
    // B · aa00e7207489
    "endings.end_primal_crown.name": "Couronne Primal",
    // B · f8b8333fe7bc
    "endings.end_primal_crown.rarity": "RARE",
    // B · 2c0c81ce3b47
    "endings.end_primal_crown.requires.flagsSet": ["les_troupeaux_sont_arrives_au_sud","a_parle_pour_un_peuple"],
    // B · 0ab725cacdac
    "endings.end_primal_crown.condition": "Ni trône ni titre. Quelqu’un qui il y a trois jours n’était qu’un cavalier de plus au marché est maintenant la personne que quatre des cinq peuples consultent avant de décider quoi que ce soit, et aucun ne sait vraiment quand ça a commencé. Écris ce que ça coûte : tout le monde veut quelque chose maintenant et personne ne demande comment tu vas.",
    // A · 3128dedf9ecd
    "endings.end_primal_crown.epilogue": "Il n’y a pas de couronne, et personne n’en propose une. Ce qu’il y a, en revanche, à la troisième saison, c’est une habitude : cinq délégations qui arrivent tôt pour savoir où tu dors. Tu as une vingtaine d’années et tu gères une région parce que tu es la seule personne avec qui les cinq veulent bien partager une tente. Tu es épuisé, mais tu gères ça comme un chef.",
    // B · d6fc29542b8f
    "endings.end_sixth_banner.name": "La Sixième Bannière",
    // B · f8b8333fe7bc
    "endings.end_sixth_banner.rarity": "RARE",
    // B · c0f711fe259f
    "endings.end_sixth_banner.requires.flagsSet": ["les_troupeaux_sont_arrives_au_sud","sont_reste_non_alignes","ont_un_monture"],
    // B · 07e0a4b30600
    "endings.end_sixth_banner.condition": "Ceux qui ne rentraient dans aucun des cinq se sont retrouvés derrière une personne qui n’en faisait pas non plus partie, et à la fin de la saison ça a un nom, un territoire et une pierre à lui. C’est un truc institutionnel lent, pas un couronnement. La partie intéressante, c’est lequel des cinq le reconnaît en premier et ce qu’il veut en échange.",
    // A · 5554afab04c5
    "endings.end_sixth_banner.epilogue": "Tout commence avec une quarantaine de personnes qui étaient au passage et n’avaient pas de route évidente après. À la deuxième saison, ils sont presque trois cents et donnent leur avis sur les droits d’eau. Les Skyfire le remarquent en premier, parce qu’ils repèrent tout ce qui devra faire circuler des messages, et les Stoneback le reconnaissent en dernier, et de façon officielle.",
    // B · 0a2ebb7ebeff
    "endings.end_white_maws_rider.name": "Le Cavalier de la Mâchoire Blanche",
    // B · f7fc172f729a
    "endings.end_white_maws_rider.rarity": "UNIQUE",
    // B · 91a5b2dfbc74
    "endings.end_white_maws_rider.requires.flagsSet": ["bonded_white_maw"],
    // B · cdfc42f7acc1
    "endings.end_white_maws_rider.condition": "Le plus grand prédateur dont l’un de ces peuples a un nom, traqué pendant deux ans par des gens qui avaient besoin qu’il ait peur, approché par le côté qui ne lui a jamais fait de mal par quelqu’un qui savait exactement pourquoi ça marcherait. Ne décris pas ça comme une domestication. Raconte plutôt un vieil animal souffrant qui décide, lentement, qu’un humain en particulier n’est pas ce qui lui arrive.",
    // A · bf53d7047fd8
    "endings.end_white_maws_rider.epilogue": "Il n’est jamais sûr et ne devient jamais une monture dans le sens que les cinq peuples donnent au mot. Il suit, à distance, à son propre rythme, et il est là à trois des quatre événements importants pour le reste de ta vie. Quarante ans plus tard, on dit encore aux enfants du passage d’arrêter de poser des questions à son sujet.",
    // B · 5083b73805ae
    "endings.end_white_maws_rider.hint": "Tout ce qui vient de la gauche a été ce qui lui a fait du mal.",
    // B · 45972e1b6467
    "endings.end_beyond_the_map.name": "Au-delà de la carte",
    // B · 734e45c160cf
    "endings.end_beyond_the_map.rarity": "PEU COMMUN",
    // B · 1b4d76e1d969
    "endings.end_beyond_the_map.requires.flagsSet": ["left_the_map","went_alone"],
    // B · cc43a8d4325a
    "endings.end_beyond_the_map.requires.flagsUnset": ["joined_the_hand"],
    // B · 1f74af3cee23
    "endings.end_beyond_the_map.condition": "La question du corridor, c’était cinq peuples qui se disputaient une route, et il s’est avéré qu’il y avait beaucoup de monde en dehors de cette route. Ne considère pas ça comme une fuite — c’est une lecture légitime de trois jours au marché, et ce que ça coûte, c’est de ne jamais savoir comment tout ça s’est passé.",
    // A · 4a152836cc4d
    "endings.end_beyond_the_map.epilogue": "À l’ouest de la crête, le terrain n’appartient plus à personne. Il y a des animaux pour lesquels les cinq peuples n’ont pas de mot, et une rivière qui coule à contre-courant pendant onze jours. Des années plus tard, quelqu’un au passage raconte avoir vu un cavalier qu’aucun ne peut identifier, et quatre personnes autour du feu ont entendu une version différente de la même histoire.",
    // B · 71eb12e6b25c
    "endings.end_the_broken_migration.name": "La migration brisée",
    // B · f8b8333fe7bc
    "endings.end_the_broken_migration.rarity": "RARE",
    // B · 0d23e59311c4
    "endings.end_the_broken_migration.requires.flagsSet": ["the_migration_broke"],
    // B · cc43a8d4325a
    "endings.end_the_broken_migration.requires.flagsUnset": ["joined_the_hand"],
    // B · 058cc8729a6c
    "endings.end_the_broken_migration.condition": "L’ancien système a échoué et quelque chose d’autre va devoir exister. Ce n’est pas juste une perte — l’accord sur le corridor avait quarante ans, il était fait pour une route que les troupeaux ne prennent plus, et son effondrement force cinq peuples à adopter une forme qu’aucun d’eux n’aurait choisie et que certains avaient besoin. Raconte l’adaptation autant que le coût.",
    // A · bad208be88c0
    "endings.end_the_broken_migration.epilogue": "Le premier hiver est très dur. Les Frostfang perdent un tiers de leur bétail reproducteur et les Mireborn accueillent quatre mille personnes qu’ils ne peuvent pas nourrir correctement. Ce qui en sort, au bout de quatre ans, est plus petit, plus local et ne tourne plus autour d’une seule route — c’est l’arrangement que le terrain demandait depuis le printemps où les montagnes ont commencé à bouger.",
    // B · 30902b83befd
    "endings.end_ashen_victory.name": "Victoire cendrée",
    // B · f7fc172f729a
    "endings.end_ashen_victory.rarity": "UNIQUE",
    // B · 2995e27a4e08
    "endings.end_ashen_victory.requires.flagsSet": ["joined_the_hand","knows :the_ashen_method"],
    // B · a55fb984bbf2
    "endings.end_ashen_victory.condition": "Six personnes et une saison sèche se sont révélés un système plus fiable que cinq peuples et une peau, et tu fais partie des six. La méthode marche et ce n’est pas glamour — c’est la faim, une blessure à un endroit précis, le feu et l’odeur, appliqués patiemment à des animaux qui n’ont rien choisi. Raconte ça sans la joie du méchant ni l’absolution.",
    // A · e5c2650867ef
    "endings.end_ashen_victory.epilogue": "Les corridors sont tenus et les cinq peuples n’arrivent pas à savoir par qui. Les prix sont fixés aux points d’étranglement et personne n’est jamais vu en train de les régler. Quel que soit le critère de stabilité, ça marche. Il y a onze cages dans un repli rocheux sous la crête et quelqu’un doit s’en occuper, et de plus en plus, cette personne c’est toi.",
    // B · ce84b1f1b24c
    "endings.end_the_long_hunger.name": "La longue faim",
    // B · c9d08ae5d876
    "endings.end_the_long_hunger.rarity": "COMMUN",
    // B · 793380488858
    "endings.end_the_long_hunger.requires.flagsSet": ["the_corridor_fight_happened"],
    // B · 5d6cfd7188f2
    "endings.end_the_long_hunger.requires.flagsUnset": ["the_hand_is_named","one_fire_five_peoples"],
    // B · aa4678011374
    "endings.end_the_long_hunger.condition": "Deux peuples sont arrivés au même point d’eau le même matin avec le même document, et personne ne l’avait prévu. C’est la perte accessible en jouant prudemment : tu peux passer trois jours à être utile, honnête et apprécié, ne jamais apprendre les incendies sur la crête, et que ça arrive quand même. Ça ne doit pas se lire comme une punition.",
    // A · c1a706d84ff1
    "endings.end_the_long_hunger.epilogue": "Quarante personnes autour d’une seule source d’eau, et ce genre de chose dont cinq peuples ne sortent jamais en une seule saison. Les troupeaux continuent de descendre vers le sud et environ un tiers de ceux qui sont partis arrivent. Le marché se tient l’année suivante avec trois délégations, et la peau avec les pierres dessus n’est pas sortie, parce que personne ne sait ce qui arriverait si elle l’était.",
    // B · 575ffb9ba465
    "endings.end_the_one_you_lost.name": "Celui que tu as perdu",
    // B · 734e45c160cf
    "endings.end_the_one_you_lost.rarity": "PEU COMMUN",
    // B · be56244615b4
    "endings.end_the_one_you_lost.requires.flagsSet": ["the_animal_refused_you","have_a_mount"],
    // B · b3e6b19922fd
    "endings.end_the_one_you_lost.condition": "L’animal se souvient de ce qu’on lui a fait et c’est toi qui l’as fait. Rien ici ne se répare par des excuses ou un bon résultat ailleurs dans l’histoire — il ne se laissera pas attraper en terrain découvert, il a commencé à surveiller quelqu’un de l’autre côté de la ligne de piquets, et c’est un fait sur les trois derniers jours, pas une humeur. Quoi qu’ait accompli cette partie, ça aussi.",
    // A · 1362bccadf47
    "endings.end_the_one_you_lost.epilogue": "Quelqu’un aux piquets prend ça en charge, sans faire de bruit ni en faire tout un plat, et en moins de quinze jours ça leur arrivera par une ruelle bondée. Tu vois ça se passer. Personne ne dit rien, car à un passage c’est un événement ordinaire, et tout le monde présent est déjà passé d’un côté ou de l’autre.",
    // B · 85c7bd4d7a69
    "endings.end_they_blamed_you.name": "On t’a accusé",
    // B · 734e45c160cf
    "endings.end_they_blamed_you.rarity": "PEU COMMUN",
    // B · ee6433cb4b67
    "endings.end_they_blamed_you.requires.flagsSet": ["sold_what_you_knew","the_migration_broke"],
    // B · 87dd325c1e36
    "endings.end_they_blamed_you.condition": "Tu savais ce qui se passait sur la crête et tu l’as vendu au lieu de le dire, et quand ça s’est effondré, les cinq peuples avaient besoin de quelqu’un à blâmer. Ils n’ont pas tout à fait tort et ils sont loin d’avoir raison, et il n’y a pas de scène où tu peux expliquer la différence à quelqu’un qui voudra écouter.",
    // A · 005bd5cc3b2b
    "endings.end_they_blamed_you.epilogue": "La version qui circule dit qu’un cavalier au passage savait pour les incendies depuis deux jours et en a profité. C’est vrai. Ce qu’on oublie, c’est qui d’autre savait et depuis combien de temps, et aucune de ces personnes n’est là où tu te trouves. Tu ne retournes pas à Sunscar. Deux des cinq t’accueilleraient encore et tu ne sauras jamais lesquels.",
    // A · e01a124298db
    "archetypes.arch_rider.name": "Tu es arrivé à cheval",
    // B · 7fd2650cd10e
    "archetypes.arch_rider.role": "Conduite et vitesse",
    // A · cb4423fb2861
    "archetypes.arch_rider.summary": "Tu es arrivé à ce passage sur quelque chose qui t’appartient, ce qui fait que tout le monde aux piquets a déjà une opinion sur toi, et la plupart ont tort.",
    // A · 54c7a3cb3762
    "archetypes.arch_rider.playstyle": ["Rapide","À cheval","Qui se remarque"],
    // A · b3aa45797eeb
    "archetypes.arch_rider.blurb": "Personne aux piquets ne t’a demandé ton nom. Trois d’entre eux ont demandé ce que tu montais, et un a demandé ce que tu avais payé, ce qui, à ce passage, revient au même.",
    // A · 2918cfa44b4c
    "archetypes.arch_trader.name": "Tu es venu pour commercer",
    // B · b3c53934ed30
    "archetypes.arch_trader.role": "Négociation et présence",
    // A · 542fc1d8785e
    "archetypes.arch_trader.summary": "Tu es là avec une corde pleine de dettes des autres, ce qui, sur un marché où se rencontrent cinq peuples, vaut plus qu’une monture et bien plus qu’une lance.",
    // A · d4fec5cbbc5d
    "archetypes.arch_trader.playstyle": ["Persuasif","Bien connecté","Sans arme"],
    // A · 3f4e0f4d0c45
    "archetypes.arch_trader.blurb": "Tu as déjà vécu quatre éditions de ce marché. Tu sais à quel prix se vend le sel les bonnes années, et cette année, et tu connais la délégation qui paye toujours trop le dernier matin.",
    // A · 7e60ef63d32b
    "archetypes.arch_hunter.name": "Tu es venu chasser",
    // B · 27e75be6bb43
    "archetypes.arch_hunter.role": "Pistage et lance",
    // A · 55757e82be45
    "archetypes.arch_hunter.summary": "Tu as passé la saison dans les terres du nord à décrypter bouses et herbes cassées, ce qui s’avère être la compétence la plus utile que quelqu’un ait apportée à ce marché.",
    // A · fedb33603862
    "archetypes.arch_hunter.playstyle": ["Observateur","Autonome","Discret"],
    // A · fac8d956c927
    "archetypes.arch_hunter.blurb": "Tu es arrivé au sud derrière les troupeaux, pas devant, et en chemin tu as vu quatre choses dont personne à ce passage ne connaît encore l’histoire.",
    // A · 618531f8b064
    "archetypes.arch_healer.name": "Tu es venu travailler",
    // B · bc84a1e6a863
    "archetypes.arch_healer.role": "Médecine et sens des bêtes",
    // A · bd320dd3580c
    "archetypes.arch_healer.summary": "Tu soignes gens et bêtes, ce qui fait que chaque camp à ce passage te laisse entrer sans jamais demander à quel peuple tu appartiens.",
    // A · f78fcda4c287
    "archetypes.arch_healer.playstyle": ["Approuvé","Non-combattant","Partout chez soi"],
    // A · 96c64bc8135a
    "archetypes.arch_healer.blurb": "Tu as mis la main sur trois des cinq peuples à ce marché et aucun ne t’a jamais demandé de signe avant de te laisser passer.",
    // B · 9f4b59ea7790
    "setupFields.displayName.label": "Qu’est-ce qu’ils crient par-dessus les piquets ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · 962b89565479
    "setupFields.displayName.placeholder": "ex. Ren Ashfall",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 5965ecf877b1
    "setupFields.pronouns.placeholder": "ex. elle / elle",
    // B · 8b7883802b7e
    "setupFields.archetype.label": "Qu’est-ce que tu es venu faire à ce marché ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHÉTYPE",
    // B · c00c08f8a0da
    "setupFields.archetype.helpText": "Le commerce avec lequel tu es arrivé, qui détermine ce dans quoi tu es bon et quel camp a déjà une raison de t’accepter. C’est fixé pour toute la partie. Ça ne décide pas à qui, parmi les cinq peuples, tu devras quelque chose, si tu montes un animal, ni ce que tu fais pour le corridor — tout ça, c’est toi qui choisis.",
    // B · 89c349935c37
    "setupFields.worldKnowsAboutYou.label": "Qu’est-ce que les gens savent déjà de toi ici ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · 447a9abbc160
    "setupFields.worldKnowsAboutYou.helpText": "Une phrase simple. Une réputation, une dette, une famille, ou rien du tout, ce qui est aussi une réponse et une bonne.",
    // B · 3eb201cb76cb
    "setupFields.worldKnowsAboutYou.placeholder": "ex. J’ai déjà traversé trois fois ce passage et je dois toujours un bateau à un employé des Stoneback.",
    // B · adc3ac3ae00d
    "setupFields.where_you_are_from.label": "Tu viens de quel peuple ?",
    // B · b6a31c665c0b
    "setupFields.where_you_are_from.kind": "CHOIX",
    // B · b8082a411104
    "setupFields.where_you_are_from.helpText": "Un point de départ léger, pas un engagement. Chacun des cinq peut t’accepter ou te refuser selon ce qui se passe dans les trois prochains jours, pas selon ça.",
    // B · 831741ebf8c9
    "setupFields.where_you_are_from.options.emberclaw.label": "Emberclaw — prairies, rapaces, quatre clans qui ne sont d’accord sur rien",
    // B · 550f1d022357
    "setupFields.where_you_are_from.options.stoneback.label": "Stoneback — vallées fluviales, géants cornus, loi du serment et paperasse",
    // B · a17a540b38fa
    "setupFields.where_you_are_from.options.frostfang.label": "Frostfang — le nord, tigres à dents de sabre et mammouths, et la route la plus longue ici",
    // B · 667046bc6fc7
    "setupFields.where_you_are_from.options.skyfire.label": "Skyfire — falaises et désert, ptérosaures, et les messages des autres",
    // B · 970ae7d45655
    "setupFields.where_you_are_from.options.mireborn.label": "Mireborn — le delta, bêtes-rivières, médecine, et être sous-estimé",
    // B · 846d96088e74
    "setupFields.where_you_are_from.options.none.label": "Aucun d’eux. Tu viens d’un endroit que ces cinq peuples ne nomment pas",
    // B · a15b20837724
    "setupFields.appearance.label": "Qu’est-ce qu’on voit arriver dans l’allée ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · 23a648d9be36
    "setupFields.appearance.placeholder": "ex. Trop propre pour un chasseur, trop marqué pour un commerçant, et avec un harnais qui n’est pas le sien.",
    // B · 3aa4328667d6
    "protagonist.kind": "VIDE",
    // A · bfe46b404322
    "opening": "Les gobelets partent les premiers. Puis les tables. Quelqu’un à deux allées de là commence à crier sans s’arrêter.\n\nUn jeune est sorti d’une manifestation quelque part derrière les étals de sel — à hauteur de torse, les yeux égarés de panique, remontant une allée bondée de monde qui n’a jamais dû se pousser devant un pareil.\n\nUne femme ceinturée de rouge saute un étal à ta gauche, retombe mal et jure contre ça. Elle a une corde enroulée, mais zéro plan.\n\n« Toi, » lance Kaia sans se retourner pour voir qui tu es. « À gauche ou à droite ? »\n\nEt derrière tout ça, au-delà des tentes, l’horizon du nord commence à bouger.",
    // A · d60fc8a10a18
    "openingSuggestions": ["Je prends à gauche. « Passe-moi la corde quand ça tourne, mais ne la lance pas trop tôt. » Je me mets entre l’animal et les étals où sont les gamins, et je lui montre que la sortie n’est pas par-dessus quelqu’un.","Je l’ignore et je fonce vers l’animal. À hauteur de torse, paniqué, il s’est enfermé dans une allée sans sortie. Je me baisse, je ralentis, je fais rien d’intéressant, et je garde les mains bien en vue.","« Ni l’un ni l’autre. » Je dégage les gens de l’allée — les étals tombent, la foule recule, et la bête peut enfin filer. « Laisse-le faire, il est plus flippé que vous tous réunis. »"],
  },
});
