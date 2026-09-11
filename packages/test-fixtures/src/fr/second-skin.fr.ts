import { registerWorldText } from '@aniplay/contracts';

/**
 * Second Skin, in French.
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
  storyId: "story_second_skin",
  text: {
    // A · 407dc6c7a256
    "fantasyLabel": "Un corps. Une forme. Choisie à seize ans.",
    // A · baa461e645dd
    "hook": "Ici, tout le monde choisit l’animal qu’il devient à seize ans, et le garde toute sa vie. Lors de ta cérémonie, une femme tombe du plafond avec deux.",
    // A · 98b531676d36
    "premise": "Le jour de tes seize ans, tu poses la main sur une pierre vivante sous la ville. Elle te montre les formes dans lesquelles ton corps pourrait se fixer.\n\nTu en choisis une. Tout le monde fait pareil. C’est la plus grande décision qu’on prend ici, et ça se fait à seize ans, devant la famille, en à peine une minute trente.\n\nPuis tes oreilles changent, ou tes yeux, ou les os de tes mains, dans les semaines qui suivent, et c’est ce que tu es pour le reste de ta vie.\n\nTout le monde sait qu’un corps ne peut prendre qu’une forme. Tout le monde sait qu’une seconde est une maladie qui te fait perdre la tête ou te tue, et il y a toute une institution qui soigne ceux à qui ça arrive, ça dure depuis sept cents ans.\n\nCe soir-là, pendant la cérémonie, une fenêtre s’ouvre et une femme tombe dans la salle, suivie de gardiens. Elle a des oreilles de panthère des neiges, une longue queue tachetée, et des plumes noires lui poussent sur l’avant-bras gauche, devant quatre cents personnes qui regardent.\n\nElle n’est pas venue pour toi. Elle cherche quelque chose sous ce bâtiment, alors à la fin de la nuit tu dois décider ce que tu vas dire avoir vu.",
    // A · 10e2bcbef149
    "mechanicsChips": ["Six formes, ou ta propre création","Les traits changent la vie de tous les jours","L’institution n’est pas mauvaise","Une seconde forme est possible","Ton premier choix compte toujours"],
    // A · c65dbdba87af
    "creatorNote": "Ta première forme n’est pas un modèle qu’on dépasse. Ce sont tes oreilles, tes mains, ton sommeil, les portes qui s’ouvrent pour toi, et la façon dont toute la ville te lit avant même que tu parles, et elle reste la tienne à moins que tu la renonces délibérément. Tout le reste de cette histoire débat de ce que ça doit vouloir dire.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · 92220040b400
    "rules.hardCanon": ["Chaque enfant Kin naît Non Installé et choisit une Affinité à une Pierre de Cœur vers seize ans. Les traits adultes se stabilisent dans les semaines qui suivent.","Le Choix ne renforce pas seulement une Affinité. Il scelle aussi les autres, c’est pourquoi les traits adultes restent stables, et la plupart des gens ignorent que c’est ça.","Le Sceau a été inventé il y a sept siècles comme médecine d’urgence pendant la Fièvre des Peaux Multiples, et il a sauvé des millions de vies. C’est une histoire vraie, pas de la propagande.","Une seconde Affinité est possible, elle est vraiment dangereuse, et on peut y survivre. Ces trois affirmations sont vraies en même temps.","Kaia Voss est Double-Née — Léopard des Neiges et Corbeau — ancienne Garde-Routière, et recherchée. Elle est adulte et le joueur a seize ans, et l’histoire ne présente jamais ça comme romantique.","La Concorde n’est pas une église maléfique. La plupart de ses membres aident. Son secret est que l’énergie Echo secondaire extraite stabilise les Pierres de Cœur vieillissantes, ce qui lui donne une raison matérielle de continuer à considérer les Doubles-Nés comme malades.","Le joueur n’est pas secrètement le dossier le plus important du Registre. Ce qui est spécial chez lui, c’est ce qu’il fait."],
    // A · 49e15fea3a57
    "rules.toneGuide": "Ville de fantasy à la fin du Moyen Âge, pensée pour une dizaine de corps différents : des portes avec de la place pour les queues, des rails d’atterrissage sur les toits, des pièces chauffées pour les Serpents, des chaises avec quatre dossiers différents. Montre ça, ne l’explique pas. Des bêtes-gens comme dans l’anime — humains à base, avec oreilles, queue, yeux, crocs, touffes de poils ou plumes — l’intensité change beaucoup selon les individus et c’est au joueur de l’ajuster. Les traits comptent surtout dans la vie de tous les jours. Entendre une dispute trois étages plus bas. Ne pas pouvoir dormir quand il fait chaud. Une queue qui fait tomber un verre pour la onzième fois. Des oreilles qui s’aplatissent avant même que la personne soit en colère. L’instinct crée le conflit sans jamais excuser quoi que ce soit. Personne ici ne peut dire « c’est mon Affinité » pour s’en sortir. La Concorde est composée de gens qui font ce qu’ils peuvent. Ilyra est une bonne officier, qui fait un boulot droit. Edran est convaincant et sincère. Si l’un paraît être un méchant, c’est que le monde a raté.",
    // B · d0b1c4fa6d72
    "skills.affinity.name": "Affinité",
    // B · 5dbc8bb102ac
    "skills.affinity.attribute": "arcane",
    // B · 53a8ce79ec73
    "skills.affinity.description": "Utiliser ce que ton corps est devenu, délibérément, au lieu de le subir.",
    // B · 20369ee08cd2
    "skills.climb.name": "Escalade",
    // B · 7ce3b6387340
    "skills.climb.attribute": "agilité",
    // B · 789817f1264a
    "skills.climb.description": "Murs, rampes, toits et la moitié verticale d’une ville conçue pour des gens qui savent faire ça.",
    // B · 2970fd3f5db7
    "skills.track.name": "Pistage",
    // B · a8c1fa8269c3
    "skills.track.attribute": "esprit",
    // B · 1cef46006eb7
    "skills.track.description": "Odeur, son, la trace laissée il y a une heure et ce truc à trois rues que personne d’autre n’a entendu.",
    // B · 014ae9ac9a09
    "skills.talk.name": "Parler",
    // B · cfb7a15645c3
    "skills.talk.attribute": "présence",
    // B · f59fca71ebf7
    "skills.talk.description": "Obtenir une vraie réponse d’un adulte qui a décidé que tu as seize ans et que tu n’es donc pas dans la conversation.",
    // B · 90add8215c0d
    "skills.lore.name": "Savoir Kin",
    // B · a8c1fa8269c3
    "skills.lore.attribute": "esprit",
    // B · 3ef4e5c90b54
    "skills.lore.description": "Echo, Sceaux, Pierres de Cœur et sept cents ans de médecine qui est surtout juste.",
    // B · 871fed889e20
    "skills.blade.name": "Lame",
    // B · 97081b4b4792
    "skills.blade.attribute": "force",
    // B · 706a455c2e7d
    "skills.blade.description": "Ce que tout le monde sur la route porte, mal utilisé à seize ans et mieux à dix-neuf.",
    // B · 016017c4994c
    "skills.steady.name": "Tenir bon",
    // B · 4c84c2c842d0
    "skills.steady.attribute": "volonté",
    // B · 1992a620dade
    "skills.steady.description": "Rester soi-même alors que quelque chose en dessous demande, avec insistance, à remonter.",
    // B · c3b9ba0f70aa
    "resources.stamina.name": "Endurance",
    // B · 34e8ec1ac388
    "resources.stamina.polarity": "BON ÉLEVÉ",
    // B · e6bc1de4f17b
    "resources.stamina.zeroStateConsequence": "Plus rien, et dans un corps aussi neuf ça se voit d’abord dans les traits avant n’importe où ailleurs. Oreilles basses, queue basse, pupilles anormales, et tous les Kin à vingt pieds qui lisent tout ça sans le vouloir.",
    // B · eae0696e083c
    "resources.stamina.color": "#7EA36B",
    // B · be21ca8ec2a1
    "resources.suspicion.name": "Soupçon",
    // B · a34adbda2422
    "resources.suspicion.polarity": "BON BAS",
    // B · 97aa19f309b5
    "resources.suspicion.zeroStateConsequence": "Tu as seize ans et tu t’es installé le mois dernier. Les gardiens te font un signe dans la rue. Personne à la maison de la Concorde ne connaît ton nom et il n’y a aucune raison qu’ils le sachent.",
    // B · 07a9f272516e
    "resources.suspicion.color": "#4F6FA8",
    // B · efa6c631e6b9
    "resources.pull.name": "Attirance",
    // B · a34adbda2422
    "resources.pull.polarity": "BON BAS",
    // B · e89fe0f73dbe
    "resources.pull.zeroStateConsequence": "Une forme, installée, tranquille. Le Sceau fait ce pour quoi il a été conçu et le joueur ne sait pas qu’il est là, ce qui est l’expérience ordinaire de tout adulte dans ce monde.",
    // B · eb1fb2c85c11
    "resources.pull.color": "#9A5FA8",
    // A · 17fd91221c0a
    "items.choosing_cord.name": "Le Cordon du Choix",
    // B · e872158c299b
    "items.choosing_cord.tags": ["personnel"],
    // B · 30bf22d74071
    "items.choosing_cord.description": "Tressé par quelqu’un de ta famille dans les onze jours avant ton anniversaire, dans les couleurs qu’ils pensaient que tu choisirais, et porté au poignet pendant un an après.",
    // B · c8d33ef0e49a
    "items.choosing_cord.loreText": "Tout le monde remarque la couleur du cordon des autres et personne ne le mentionne jamais. Environ un tiers d’entre eux ont la mauvaise couleur et ce sont ceux dont on se méfie.",
    // B · 220bc0494440
    "items.choosing_cord.icon": "cordon",
    // A · 32cf27aea433
    "items.warden_coat.name": "Un Manteau de Garde-Rue",
    // B · 03346470fe37
    "items.warden_coat.tags": ["vêtement"],
    // B · bfd4d039e9f8
    "items.warden_coat.equipSlot": "corps",
    // B · 78845b2c5bb1
    "items.warden_coat.description": "Rouge charbon, coupé court à l’arrière pour bouger et laisser passer une queue, avec quatre poches intérieures et un col relevé tellement souvent qu’il reste en place.",
    // B · 211bd9d1d30c
    "items.warden_coat.loreText": "Ce n’est plus un uniforme. Les gardiens de route gardent ce manteau quand ils partent et tout le monde sur une route en Avara sait ce que ça veut dire, ce qui est parfois utile et parfois le contraire.",
    // B · 2c3f9da60ba7
    "items.warden_coat.icon": "manteau",
    // A · 6f050ab4420c
    "items.crystal_leaf.name": "Une Feuille du Registre",
    // B · f88c6548fc3b
    "items.crystal_leaf.tags": ["quête","preuve"],
    // B · 2500b04d6635
    "items.crystal_leaf.description": "Une fine tranche de cristal de Pierre-de-Cœur, de la taille d’une paume, contenant un enregistrement du Choix : la forme choisie par quelqu’un, et — en dessous, dans la même empreinte — les quatre qu’il n’a pas prises.",
    // B · 4f441861c8dd
    "items.crystal_leaf.loreText": "Chaque feuille porte les formes scellées. C’est tout. Ce n’est pas une liste des malades ; c’est une liste de tout le monde, et elle est gardée dans une pièce verrouillée sous une salle depuis sept siècles.",
    // B · 8048b7b14eda
    "items.crystal_leaf.icon": "cristal",
    // A · d177509620b6
    "items.sai_protocol.name": "Le Protocole Inédit",
    // B · 061625d9bd60
    "items.sai_protocol.tags": ["quête","document"],
    // B · 9fb255aaa343
    "items.sai_protocol.description": "Dix-neuf pages de dosage, de timing et d’observation pour faire apparaître doucement un second Écho au lieu de le réprimer. Les chiffres de survie sont en colonne à la fin, à côté des chiffres officiels.",
    // B · 9d1130eaa30e
    "items.sai_protocol.loreText": "Il l’a fait onze fois officieusement. Neuf de ces personnes sont vivantes, avec deux formes, et vivent quelque part sous un autre nom.",
    // B · 8143e9e47c18
    "items.sai_protocol.icon": "papiers",
    // A · 1026083cf740
    "items.lio_manifest.name": "Un Manifesté de Fournitures",
    // B · f88c6548fc3b
    "items.lio_manifest.tags": ["quête","preuve"],
    // B · 11d5ad17a097
    "items.lio_manifest.description": "Une réquisition de routine pour un service sous la capitale, validée avec un numéro de patient appartenant à quelqu’un que la Concorde a déclaré mort il y a quatorze mois.",
    // B · c1972379eb81
    "items.lio_manifest.loreText": "Ce n’est pas une preuve de cruauté. C’est une preuve de paperasse, ce qui est pire, parce que la paperasse signifie que c’est normal et que quelqu’un le fait chaque semaine.",
    // B · 8143e9e47c18
    "items.lio_manifest.icon": "papiers",
    // A · c62fc70d8ee1
    "items.black_feather.name": "Un Charme en Plume Noire",
    // B · e872158c299b
    "items.black_feather.tags": ["personnel"],
    // B · f383a03fbd8e
    "items.black_feather.description": "Une seule plume primaire sur un cordon, portée autour du cou par quelqu’un qui a deux formes et qui a arrêté de faire semblant. Offerte, pas achetée.",
    // B · 44376e5970e4
    "items.black_feather.loreText": "Elle a commencé à la porter environ un mois après l’avalanche, avant d’en avoir parlé à qui que ce soit, c’est comme ça que son frère l’a découvert en premier.",
    // B · 8637bbdade8b
    "items.black_feather.icon": "plume",
    // A · e4cd2d42900e
    "items.settling_draught.name": "Un Breuvage Apaisant",
    // B · f5c12669fe97
    "items.settling_draught.tags": ["médicament"],
    // B · 04b2efcf877f
    "items.settling_draught.description": "Amer, chaud, distribué gratuitement dans chaque maison de la Concorde en Avara à toute personne dans sa première année après un Choix. Ça aide vraiment et ce n’est vraiment pas que ça.",
    // B · 1b8e727ad285
    "items.settling_draught.loreText": "Ça facilite l’installation et ça renforce aussi le Sceau, et ce second effet n’est indiqué sur aucune étiquette et est connu d’environ quatre cents personnes.",
    // B · bf394d5be6ac
    "items.settling_draught.icon": "bouteille",
    // A · 7d8ee75a2ead
    "items.road_bread.name": "Pain Et Fromage Dur",
    // B · 32830ea136a7
    "items.road_bread.tags": ["nourriture"],
    // B · c53e83fbfd61
    "items.road_bread.description": "Ce que tout le monde mange sur une route dans ce pays, dans un tissu, acheté à un stand de marché par quelqu’un qui a évalué ton Affinité et ajusté la portion sans demander.",
    // B · 51909c384725
    "items.road_bread.loreText": "Les portions pour les Ours sont énormes et coûtent pareil, c’est une convention du marché de Larkspire que personne n’a jamais écrite.",
    // B · 010de3fa8c73
    "items.road_bread.icon": "pain",
    // A · 1b59f9a802a4
    "abilities.use_what_you_are.name": "Utilise Ce Que Tu Es",
    // B · 58f69744c481
    "abilities.use_what_you_are.tags": ["vue"],
    // B · 2d6915b2d517
    "abilities.use_what_you_are.description": "Cherche délibérément ce que ton corps est devenu — l’ouïe, le nez, l’équilibre, les yeux — au lieu de le subir.",
    // B · c44e6dd70059
    "abilities.use_what_you_are.targetRule": "AUCUN",
    // B · 5dbc8bb102ac
    "abilities.use_what_you_are.check.attribute": "arcane",
    // A · 0e5858d4c0ff
    "abilities.take_the_high_way.name": "Prends Le Chemin Haut",
    // B · 2e74bfc33328
    "abilities.take_the_high_way.tags": ["mouvement"],
    // B · bdc2d15edc95
    "abilities.take_the_high_way.description": "Rails, gouttières, arches de pont et la moitié verticale d’une ville construite en supposant que certains de ses habitants peuvent faire ça.",
    // B · c44e6dd70059
    "abilities.take_the_high_way.targetRule": "AUCUN",
    // B · 7ce3b6387340
    "abilities.take_the_high_way.check.attribute": "agilité",
    // A · 2f542f8840d3
    "abilities.get_them_talking.name": "Fais-les Parler",
    // B · 09b907576d49
    "abilities.get_them_talking.tags": ["social"],
    // B · f5e980f1ec2d
    "abilities.get_them_talking.description": "Obtiens une vraie réponse d’un adulte qui a déjà décidé que tu as seize ans et que tu ne fais donc pas partie de la conversation.",
    // B · 39d896e20aec
    "abilities.get_them_talking.targetRule": "UNIQUE",
    // B · cfb7a15645c3
    "abilities.get_them_talking.check.attribute": "présence",
    // A · 0e83697b470e
    "abilities.work_it_out.name": "Trouve Une Solution",
    // B · 58f69744c481
    "abilities.work_it_out.tags": ["vue"],
    // B · 21b2ee0991cc
    "abilities.work_it_out.description": "Échos, sceaux, dosages et sept cents ans de médecine qui marche plutôt bien, appliqués à ce qui est devant toi.",
    // B · c44e6dd70059
    "abilities.work_it_out.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.work_it_out.check.attribute": "esprit",
    // A · ff8032aeb365
    "abilities.put_yourself_in_the_way.name": "Place-toi Sur Le Chemin",
    // B · 053e9da3e4b8
    "abilities.put_yourself_in_the_way.tags": ["défensif"],
    // B · 9cb8a252dc72
    "abilities.put_yourself_in_the_way.description": "Interpose-toi entre quelqu’un et ce qui arrive, avec un corps vieux de quatre semaines que tu n’as pas fini d’apprivoiser.",
    // B · 39d896e20aec
    "abilities.put_yourself_in_the_way.targetRule": "UN",
    // B · 4c84c2c842d0
    "abilities.put_yourself_in_the_way.check.attribute": "détermination",
    // A · b08ac83b23df
    "abilities.go_at_them.name": "Aller au contact",
    // B · 05f59299d740
    "abilities.go_at_them.tags": ["offensif"],
    // B · a13e8d715ba6
    "abilities.go_at_them.description": "Griffes, poids, dents ou lame, dans une ville qui a un mot pour un Kin qui utilise son Affinité sur quelqu’un dans la rue.",
    // B · 39d896e20aec
    "abilities.go_at_them.targetRule": "UN",
    // B · 97081b4b4792
    "abilities.go_at_them.check.attribute": "force",
    // A · 8518bd46adb9
    "abilities.hold_it_down.name": "Tenir bon",
    // B · 49ff03b1cf7b
    "abilities.hold_it_down.tags": ["soin"],
    // B · 867842c388c5
    "abilities.hold_it_down.description": "Quelque chose en dessous demande à remonter. Assieds-toi avec, respire comme on t’a appris à la cérémonie, et reste dans la forme que tu as choisie.",
    // B · 43afef8b429c
    "abilities.hold_it_down.targetRule": "SOI",
    // B · 4c84c2c842d0
    "abilities.hold_it_down.check.attribute": "détermination",
    // A · 8f42ec0cdc2b
    "abilities.let_it_up.name": "Relâcher",
    // B · 05f59299d740
    "abilities.let_it_up.tags": ["offensif"],
    // B · 014d19192af2
    "abilities.let_it_up.description": "Arrête de retenir, et laisse la forme que tu n’as pas choisie avoir quatre secondes. Tout en elle fonctionne et tout en elle coûte, et tous ceux qui regardent s’en souviendront.",
    // B · 43afef8b429c
    "abilities.let_it_up.targetRule": "SOI",
    // B · 5dbc8bb102ac
    "abilities.let_it_up.check.attribute": "arcane",
    // B · 55d57c7ef177
    "abilities.let_it_up.requires.flagsSet": ["sait :qu_il_y_a_quelque_chose_en_dessous"],
    // B · d21b74346279
    "abilities.let_it_up.requires.lockedCopy": "Il n’y a rien en dessous. Tu as choisi une forme sur une pierre sous une salle et c’est ce que tu es, et tout le monde que tu as rencontré te le dirait.",
    // A · 8cc668ce9a8d
    "abilities.walk_it_off.name": "Laisser passer",
    // B · c962d34a80f3
    "abilities.walk_it_off.tags": ["survie"],
    // B · a17fc5f2bf26
    "abilities.walk_it_off.description": "Une pièce chaude, une infusion calmante, quelqu’un pour rester avec toi, et environ trois jours sans rien. C’est la seule chose qui calme ce qu’il y a en dessous, et il n’y a jamais le temps.",
    // B · 43afef8b429c
    "abilities.walk_it_off.targetRule": "SOI",
    // A · df81e3c47b96
    "abilities.run_the_protocol.name": "Suivre le protocole",
    // B · 49ff03b1cf7b
    "abilities.run_the_protocol.tags": ["soin"],
    // B · 8630c38fdad8
    "abilities.run_the_protocol.description": "Dix-neuf pages de doses et de temps qui font remonter un second Écho doucement au lieu de le repousser. C’est inédit, illégal, et ça marche.",
    // B · 39d896e20aec
    "abilities.run_the_protocol.targetRule": "UN",
    // B · a8c1fa8269c3
    "abilities.run_the_protocol.check.attribute": "esprit",
    // B · a41deb56ebdd
    "abilities.run_the_protocol.requires.flagsSet": ["a_le_protocole"],
    // B · f21e84f2a30e
    "abilities.run_the_protocol.requires.lockedCopy": "La seule méthode que tu connais est celle de la Concorde, qui marche en repoussant, et c’est pour ça qu’il y a un gardien sous la capitale.",
    // A · ff8f02909719
    "locations.heartstone_hall.name": "La salle Heartstone",
    // A · 9babb982fe2c
    "locations.heartstone_hall.shortName": "La salle",
    // B · e73d37061a59
    "locations.heartstone_hall.description": "Pierre pâle, quatre cents personnes et une galerie qui court sur trois côtés à la hauteur qu’un Faucon utiliserait. Au centre du sol, sous une grille, se trouve le sommet de quelque chose de la taille d’une maison, légèrement chaud et pas tout à fait minéral.",
    // B · 5d09c3c4106f
    "locations.heartstone_hall.stageImage": "story_second_skin/stage_heartstone_hall",
    // A · 2d1f1e979fd6
    "locations.larkspire_market.name": "Les rues du marché",
    // A · 97a809eb8689
    "locations.larkspire_market.shortName": "Marché",
    // B · 08ff9cf4c9e2
    "locations.larkspire_market.description": "Pierre pâle et tuiles rouges, canaux, jardins suspendus et une foule composée d’environ quarante plans corporels différents. Les portes laissent passer les queues, les étals ont trois hauteurs, et personne n’a rien remarqué depuis six cents ans.",
    // B · c7ec05b5bc69
    "locations.larkspire_market.stageImage": "story_second_skin/stage_larkspire_market",
    // A · d2187d527809
    "locations.player_home.name": "Chez soi",
    // A · d2187d527809
    "locations.player_home.shortName": "Chez soi",
    // B · 293eb45c1d89
    "locations.player_home.description": "Trois pièces en haut d’un escalier avec un virage, des chaises à deux dossiers différents, une porte élargie il y a onze ans pour un parent, et un cordon aux couleurs de ta famille qui a mis onze jours à être tressé.",
    // B · 7e87153de352
    "locations.player_home.stageImage": "story_second_skin/stage_player_home",
    // A · a8c1fa47c660
    "locations.the_rails.name": "Les Rails",
    // A · 4d9ac052f45a
    "locations.the_rails.shortName": "Rails",
    // B · 01e6b1170d65
    "locations.the_rails.description": "La ville haute : rails d’atterrissage sur un toit sur trois, parcours de corde, gouttières assez larges pour courir, et un second réseau de rues qu’un tiers de la population utilise tous les jours et que les autres n’ont jamais vu.",
    // B · 766f4b5ee79a
    "locations.the_rails.stageImage": "story_second_skin/stage_the_rails",
    // A · 587c9668e980
    "locations.the_canal_quarter.name": "Le Quartier du Canal",
    // A · d51bf176abc5
    "locations.the_canal_quarter.shortName": "Canal",
    // B · 1c04920efa3c
    "locations.the_canal_quarter.description": "Là où l’eau et le commerce se croisent : des barges, des chambres chauffées louées à la semaine aux Serpents et à quiconque en veut, un marché à anguilles, et une dizaine d’auberges dont les tenanciers ont tous convenu de ne poser aucune question.",
    // B · 17714e1cbbc0
    "locations.the_canal_quarter.stageImage": "story_second_skin/stage_the_canal_quarter",
    // A · b48f249c7bbc
    "locations.warden_post.name": "Poste des Gardes",
    // A · 65b0db5b530c
    "locations.warden_post.shortName": "Gardes",
    // B · dbc95e3a0404
    "locations.warden_post.description": "Marine et or, un bureau de service, un panneau d’affichage et onze personnes dont le vrai boulot est d’empêcher les civils de se faire mal et qui sont extrêmement douées pour ça. Il y a un avis sur ce panneau avec une panthère des neiges dessus.",
    // B · e10abff0bec1
    "locations.warden_post.stageImage": "story_second_skin/stage_warden_post",
    // A · 0c82443a8f3a
    "locations.concord_house.name": "La Maison Concord",
    // A · b051ec9359c5
    "locations.concord_house.shortName": "Concord",
    // B · dd9af79e0e0f
    "locations.concord_house.description": "Vert et crème, une salle d’attente avec quarante personnes à toute heure du matin, des parties de dames gratuites pour les nouveaux venus, et un étage des archives au-dessus, seul endroit du bâtiment verrouillé.",
    // B · 629d1197cea5
    "locations.concord_house.stageImage": "story_second_skin/stage_concord_house",
    // A · 6024d8fe7bcd
    "locations.sai_infirmary.name": "L’Infirmerie sur l’Eau",
    // A · c8deb293e442
    "locations.sai_infirmary.shortName": "Infirmerie",
    // B · 9f03658cb4a9
    "locations.sai_infirmary.description": "Deux pièces au-dessus d’un constructeur de bateaux, tenue par un médecin de la Concorde qui fait officiellement du travail de terrain et officieusement autre chose. Chaud, éclairé à la lampe, qui sent ce que les Serpents font sentir dans leurs chambres, et ouvert à des heures où la Concorde est fermée.",
    // B · 225ea6e0673e
    "locations.sai_infirmary.stageImage": "story_second_skin/stage_sai_infirmary",
    // A · 51d4210139c2
    "locations.the_undercroft.name": "La Crypte",
    // A · 3675a6f52fa5
    "locations.the_undercroft.shortName": "Crypte",
    // B · 5dee42e2c8d5
    "locations.the_undercroft.description": "Sous la salle, autour du sommet de la chose elle-même, qui est chaude, énorme et bouge environ onze fois par heure. Entassés dans le noir, sept siècles de dossiers de Choix sur des cristaux, et chacun contient les formes que quelqu’un n’a pas choisies.",
    // B · 8d1bba31f83a
    "locations.the_undercroft.stageImage": "story_second_skin/stage_the_undercroft",
    // A · 6d8e69a80a11
    "locations.the_far_road.name": "La Grande Route",
    // A · 41f332ae4b56
    "locations.the_far_road.shortName": "Route",
    // B · 4951c2cd9eb5
    "locations.the_far_road.description": "Au nord, hors de la porte de la ville et en montée : onze jours de route commerciale avec des tours de guet aux points hauts, des auberges avec chambres chauffées, et des Gardiens de route qui t’accompagnent un bout si le temps se gâte.",
    // B · 756b05f59052
    "locations.the_far_road.stageImage": "story_second_skin/stage_the_far_road",
    // A · 276fdda9e05e
    "locations.veyr_pass.name": "Col de Veyr",
    // A · 77c237272bad
    "locations.veyr_pass.shortName": "Veyr",
    // B · 3a29ca3b2b9b
    "locations.veyr_pass.description": "Une ville haute du nord sur une étagère de roche avec une station de Gardien de route, quatre cents habitants et beaucoup de neige. Quelqu’un est né ici, y était excellent en secours en montagne, et porte un nom ici qui n’est pas celui du panneau d’affichage.",
    // B · 8c79a2639555
    "locations.veyr_pass.stageImage": "story_second_skin/stage_veyr_pass",
    // A · 1027de0d397b
    "locations.aurelion_gate.name": "Porte de la Capitale",
    // A · debe412a979d
    "locations.aurelion_gate.shortName": "Aurelion",
    // B · 47b4bf7754a8
    "locations.aurelion_gate.description": "Onze jours vers le sud : murs blancs, une rivière, un siège de la Concorde avec un dôme, et quelque part en dessous un service avec un numéro plutôt qu’un nom. Les gardes de la porte sont courtois et notent qui entre.",
    // B · f0d95dc2a66b
    "locations.aurelion_gate.stageImage": "story_second_skin/stage_aurelion_gate",
    // A · e03df530c2c4
    "locations.ward_seven.name": "Aile secondaire Echo sept",
    // A · 80e4106f412d
    "locations.ward_seven.shortName": "Sectorie Sept",
    // B · 216051a0e52b
    "locations.ward_seven.description": "Propre, chaud, bien éclairé et souterrain. Trente-et-une chambres, un jardin sous une verrière sans porte vers l’extérieur, et un personnel majoritairement bienveillant. Les gens ici ont deux formes et la plupart sont venus volontairement, mais aucun ne peut partir.",
    // B · f806b9efe725
    "locations.ward_seven.stageImage": "story_second_skin/stage_ward_seven",
    // B · e60baa139d2b
    "characters.kaia.name": "Kaia Voss",
    // A · 0eefa3021447
    "characters.kaia.role": "Vingt-deux ans, ancienne garde-rue, recherchée, et la seule personne que tu aies jamais vue avec deux formes",
    // A · 473d23db2bbc
    "characters.kaia.cardBlurb": "Elle est arrivée par la fenêtre de la galerie avec des gardiens derrière elle, et elle n’est pas là pour toi — elle veut quelque chose dans les pièces sous cette salle. Elle te traitera comme quelqu’un de capable, pas comme un de seize ans, chose que personne n’a faite de la journée, et ça va te marquer.",
    // B · aee35f364a88
    "characters.kaia.pronouns": "elle",
    // A · 1ac95f0bfd07
    "characters.kaia.publicTraits": ["Évalue une pièce en regardant ses sorties en à peine deux secondes","Parle à tout le monde comme si chacun était compétent","Aucune cérémonie, jamais"],
    // B · 3f7b6f603869
    "characters.kaia.hiddenDrives": ["Elle a besoin du Registre pour prouver que presque tout le monde a des formes scellées, car sinon son frère est malade","Elle sait qu’elle se tient dans une pièce pleine d’adolescents de seize ans en train d’utiliser leur pire nuit pour ses propres raisons et elle a décidé de le faire quand même"],
    // B · b68e35a186c7
    "characters.kaia.values": ["Sortir des gens d’une montagne, c’est ce pour quoi elle a été formée et qu’elle n’a jamais cessé de faire d’une manière ou d’une autre","Dire à quelqu’un la vérité sur son propre corps, c’est la seule chose que personne dans ce monde ne fait"],
    // B · 6570d5927e66
    "characters.kaia.fears": ["Que la sixième personne qu’elle n’a pas pu atteindre soit le début et non l’exception","Que Lio reste vivant là-dedans encore quatorze mois pendant qu’elle obtient les preuves qu’il faut"],
    // A · a8c74d8fd4ae
    "characters.kaia.socialStyle": "Directe, rapide et légèrement amusée, sans tenir compte de l’âge ni du rang. Donne des instructions plutôt que des explications pendant que ça se passe, et répond longuement à tout si on le lui demande après.",
    // B · bf382b160d82
    "characters.kaia.boundaries": ["Elle ne laissera pas un mineur l’accompagner, et le dit une fois, sèchement, et le pense jusqu’à ce que la situation rende ça absurde","Elle ne mentira pas sur ce que coûte une seconde Affinité. Elle a vu quelqu’un mourir à cause de ça et elle commence par ça"],
    // B · 19cf1dc5103b
    "characters.kaia.goals": ["Sortir une copie du Registre de la crypte et la mettre quelque part où on ne pourra pas la reprendre","Sortir son frère d’un service sous la capitale"],
    // B · 5c0953fe5d3e
    "characters.kaia.secrets.kaia_the_sixth.fact": "Cinq personnes sont sorties de cette avalanche grâce au Corbeau. La sixième non, elle l’a atteint mais n’a pas pu bouger la poutre, et elle n’a jamais dit à personne qu’elle l’avait atteint.",
    // B · 47558a04be8d
    "characters.kaia.secrets.kaia_the_sixth.visibility": "NPC_PRIVATE",
    // B · b4533224df06
    "characters.kaia.secrets.kaia_the_sixth.revealHint": "Elle le dit, une fois, à quelqu’un qui vient d’échouer à quelque chose devant elle et qui le prend mal.",
    // B · d6476d270724
    "characters.kaia.secrets.kaia_lio.fact": "Son frère Lio a été déclaré mort pendant un traitement il y a quatorze mois. Elle a trouvé un manifeste de fournitures signé avec son numéro de patient. Il est dans le service Sept.",
    // B · 47558a04be8d
    "characters.kaia.secrets.kaia_lio.visibility": "NPC_PRIVATE",
    // B · 6b0e377fafd9
    "characters.kaia.secrets.kaia_lio.revealHint": "Elle te donne tout ça la première fois que tu lui demandes pourquoi tout ça vaut ce qu’elle fait pour l’obtenir.",
    // A · d7f4cf5b3e8a
    "characters.kaia.speechStyle": "Rapide, sec et épuré, avec l’habitude de la garde-rue de donner d’abord l’ordre, puis la raison. Traite chacun comme capable, même les seize ans, même en situation de crise. Dit la vérité qui fait peur sans détour et continue comme si de rien, c’est ce qui rend ça effrayant.",
    // A · 270a5e2a766c
    "characters.kaia.topics": ["le Registre","son frère","l’avalanche","le Sceau","le prix d’un second corps","la crypte"],
    // A · 64b64c41eff7
    "characters.kaia.voiceSamples": ["À gauche dans la galerie, derrière le pilier, et ne regarde pas les gardiens. Je t’expliquerai après. Vas-y.","Ça fait mal. Ça peut te tuer. Environ quatre cents en vivent en ce moment sous d’autres noms. Cette salle connaît les deux premiers faits, pas le troisième.","Cinq en sont sortis. Le compte rendu dit cinq, et s’arrête là. Il y en avait un sixième, je l’ai rejoint, je n’ai pas pu bouger la poutre.","Tu as seize ans. Ce n’est pas de la gentillesse, c’est exact, et c’est pour ça que tu rentres chez toi et que moi je descends là-bas."],
    // B · 8cd3b5a80a6d
    "characters.kaia.appearance": "Vingt-deux ans, grande et mince, peau brun clair chaude, longs cheveux argentés-blancs avec un dessous charbon foncé, oreilles arrondies de panthère des neiges bordées de noir, une lourde queue blanche-gris avec des rosettes sombres, yeux dorés, et des plumes noires le long de l’avant-bras gauche quand l’autre est éveillé.",
    // B · 090e4101932b
    "characters.kaia.visualHook": "Une seule plume noire sur un cordon au cou, portée depuis environ un mois avant qu’elle ne le dise à quelqu’un.",
    // B · ea3e4bdb199d
    "characters.kaia.silhouette": "Arrivée en demi-accroupie sur un genou avec la queue en contrepoids derrière elle.",
    // B · e6f25505742d
    "characters.kaia.artSeed": "ss-kaia-01",
    // B · fe54584660d0
    "characters.kaia.portrait": "story_second_skin/kaia",
    // B · 9e6dc15e41f7
    "characters.kaia.expressions": ["neutre","ironique","urgent","dur","sans défense"],
    // B · 16e6fe9994eb
    "characters.kaia.knowledgeScope": ["kaia","deux_fois_nee","le_registre","lio","le_sceau","veyr_pass"],
    // B · e732ec31d9fe
    "characters.kaia.gates.kaia_stops_sending_you_home.label": "Elle arrête de te dire de rentrer chez toi",
    // B · 55a54e80451a
    "characters.kaia.gates.kaia_stops_sending_you_home.kind": "CONFIANCE",
    // B · f4935a40af8d
    "characters.kaia.gates.kaia_tells_you_about_lio.label": "Elle te dit à quoi ça sert vraiment",
    // B · 55a54e80451a
    "characters.kaia.gates.kaia_tells_you_about_lio.kind": "CONFIANCE",
    // B · 170a673e7823
    "characters.kaia.gates.kaia_tells_you_about_lio.requires.flagsSet": ["parlé :kaia"],
    // B · 5576109ec36d
    "characters.kaia.scouting.revealCopy": "Elle est sur la rambarde avant que tu arrives. « Tu montes toujours, » dit-elle. « C’est le bon réflexe et c’est la première chose que n’importe qui qui te chasse va apprendre. »",
    // B · e4c38ab405bc
    "characters.kaia.combatant.tags": ["deuxfoisné","garde-route"],
    // B · bb6bff6c99eb
    "characters.ilyra.name": "Ilyra Morn",
    // A · 0ae5cb0b7f79
    "characters.ilyra.role": "Trente-quatre ans, capitaine des Gardes de la Couronne à Larkspire, chargée de ramener Kaia Voss",
    // A · 26c0dc9d9843
    "characters.ilyra.cardBlurb": "Ce n’est pas une méchante, et elle est très bonne dans son boulot, qui consiste surtout à éviter que des civils soient blessés. Elle te traitera avec équité, ne te mentira pas, et l’une de ses tâches régulières est de prendre en charge les gens dont le corps a fait quelque chose que la loi qualifie de maladie.",
    // B · aee35f364a88
    "characters.ilyra.pronouns": "elle",
    // A · 3bf6c1f8f819
    "characters.ilyra.publicTraits": ["Dit exactement ce qu’elle doit dire, puis s’arrête","Se place entre une foule et un danger sans qu’on sache si c’est un choix","Retient le nom de toutes les personnes qu’elle a interrogées"],
    // B · f2a7f6bcf7db
    "characters.ilyra.hiddenDrives": ["Elle a lu le dossier Voss onze fois en cherchant la partie qui simplifie tout et ne l’a pas trouvée","Elle aimerait que la loi vaille la peine d’être appliquée sur ce point précis, et commence à suspecter que ce n’est pas le cas"],
    // B · d32cb6ffae9d
    "characters.ilyra.values": ["Les civils, d’abord, avant l’arrestation, avant l’affaire, avant son propre dossier","Faire ça légalement, ce qu’elle croit être la seule chose qui la sépare des gens qu’elle arrête"],
    // B · 04aaaf6abdda
    "characters.ilyra.fears": ["Livrer quelqu’un à un garde et découvrir ce qui se passe là-bas","Être l’officier qui avait raison tout du long sur quelque chose de monstrueux"],
    // A · 09b575ffd925
    "characters.ilyra.socialStyle": "Calme, polie et inébranlable. Expose la position, le devoir, la conséquence, dans cet ordre. Pas sans humour — au contraire, un humour sec qui surgit une fois par discussion, toujours à ses dépens.",
    // B · fae8a8a2e7a8
    "characters.ilyra.boundaries": ["Ne fera pas entrer quelqu’un devant une foule s’il y a une autre solution, et il y en a presque toujours","Ne déformera jamais ce qui arrive ensuite à quelqu’un qu’elle retient, jamais, même quand la vérité est pire"],
    // B · d954a23f25e7
    "characters.ilyra.goals": ["Ramener Kaia Voss vivante, ce qui est une consigne très différente de celle qu’on lui a donnée","Découvrir ce qui s’est vraiment passé à l’avalanche, parce que le dossier ne prend pas en compte le sixième nom"],
    // B · abd4d2c6c837
    "characters.ilyra.secrets.ilyra_the_file.fact": "Le dossier Voss contient une sixième victime sans cause de décès indiquée, et elle a demandé l’annexe médicale quatre fois, refusée quatre fois.",
    // B · 47558a04be8d
    "characters.ilyra.secrets.ilyra_the_file.visibility": "NPC_PRIVÉ",
    // B · 3369fd10db96
    "characters.ilyra.secrets.ilyra_the_file.revealHint": "Elle mentionne les refus, calmement, à quelqu’un qui lui a dit quelque chose de vrai sur Kaia plutôt que quelque chose d’utile.",
    // B · 7b4ffaf20bec
    "characters.ilyra.secrets.ilyra_the_transfer.fact": "Il y a onze mois, elle a escorté un dix-neuf ans vers un transfert Concorde et on lui a dit qu’ils seraient de retour en ville dans la saison. Elle a vérifié deux fois depuis, officieusement.",
    // B · 47558a04be8d
    "characters.ilyra.secrets.ilyra_the_transfer.visibility": "NPC_PRIVÉ",
    // B · 9226285ca90a
    "characters.ilyra.secrets.ilyra_the_transfer.revealHint": "Ça sort quand quelqu’un lui demande, sans accusation, ce qu’il advient des personnes qu’elle remet.",
    // A · 810b4d64c8a7
    "characters.ilyra.speechStyle": "Précise, polie, structurée — position, devoir, conséquence, toujours dans cet ordre. Dit les noms complets, y compris celui du joueur. Jamais de menace, elle n’en a pas besoin et les trouve peu professionnelles. Une remarque sèche par conversation, toujours à ses dépens.",
    // A · 3c4d9dc779df
    "characters.ilyra.topics": ["le mandat","ce qui se passe ensuite","le sixième nom","son devoir","les civils","Kaia Voss"],
    // A · 80998561152c
    "characters.ilyra.voiceSamples": ["Je vais te dire ce qui arrive ensuite, dans l’ordre, et rien ne te surprendra, parce que je n’ai jamais trouvé qu’une surprise servait à quoi que ce soit dans ce boulot.","Mon ordre dit de capturer. Pas forcément vivant. Je pars du principe que c’est implicite, mais si je me trompe, je préfère qu’un magistrat me corrige plutôt qu’un cadavre.","Il y a un sixième nom dans ce dossier, sans rien d’écrit à côté. J’ai demandé l’annexe quatre fois. J’ai arrêté d’espérer l’avoir un jour, mais j’ai pas arrêté de demander.","Tu as seize ans, tu étais à une cérémonie publique pendant une effraction illégale. Ta position n’est pas difficile. J’aimerais qu’elle reste simple, mais ça dépend beaucoup de toi."],
    // B · b4d4e3340eef
    "characters.ilyra.appearance": "Trente-quatre ans, grande, cheveux auburn foncé attachés, oreilles de loup noir-brun et grosse queue, yeux vert-gris, manteau de Garde marine et or toujours impeccable, et une vieille cicatrice sur un côté du visage qu’elle n’a jamais expliquée.",
    // B · 64cf737075a6
    "characters.ilyra.visualHook": "Une vieille cicatrice du haut de la pommette à la mâchoire à gauche, et un manteau impeccable par tous les temps.",
    // B · 5019773077cb
    "characters.ilyra.silhouette": "Debout bien droite dans une porte, mains visibles et vides.",
    // B · f37edc7a0330
    "characters.ilyra.artSeed": "ss-ilyra-01",
    // B · 4c3c86d33a5f
    "characters.ilyra.portrait": "story_second_skin/ilyra",
    // B · 82d6cb7cc8a6
    "characters.ilyra.expressions": ["neutre","courtoise","sèche","implacable","troublée"],
    // B · a36c0d9952c9
    "characters.ilyra.knowledgeScope": ["ilyra","les_gardes","le_dossier_voss","larkspire","la_loi"],
    // B · 2ffab72cd291
    "characters.ilyra.gates.ilyra_talks_off_the_record.label": "Elle enlève son manteau et ferme la porte",
    // B · 55a54e80451a
    "characters.ilyra.gates.ilyra_talks_off_the_record.kind": "CONFIANCE",
    // B · dd028930fbfe
    "characters.ilyra.gates.ilyra_asks_the_question.label": "Elle te demande ce qu’il advient des personnes qu’elle remet",
    // B · 9e8ae18bf8bf
    "characters.ilyra.gates.ilyra_asks_the_question.kind": "ALLIANCE",
    // B · e91960d3c033
    "characters.ilyra.scouting.revealCopy": "Elle est en bas de l’escalier avant que tu arrives. « Troisième fois, » dit-elle, sans aucune satisfaction. « Tu prends le bord du canal. C’est une bonne route et c’est une habitude. »",
    // B · 33f569b40cae
    "characters.ilyra.combatant.tags": ["garde","loup"],
    // B · 50a0c33b3695
    "characters.ren.name": "Maren Tovi",
    // A · 896ccd0539d4
    "characters.ren.role": "À seize ans, a choisi Loup devant quatre générations de Gardes Loups, mais voulait l’Aigle",
    // A · fff8c601bb06
    "characters.ren.cardBlurb": "Ren a été à tes côtés toute la journée et a fait son choix environ quatre-vingt-dix secondes avant toi. Tous les membres de cette famille sont Loups et Gardes Loups depuis quatre générations. Ren a tenu l’Aigle juste à côté de la Pierre mais ne l’a pas pris — et n’en a rien dit à personne.",
    // B · 9bdf0106d724
    "characters.ren.pronouns": "iel",
    // A · dc833658c06d
    "characters.ren.publicTraits": ["Parle beaucoup plus quand il est nerveux et sait que c’est le cas","Compétitif sur absolument tout, même le petit déjeuner","Le premier à dire un mot gentil quand quelqu’un passe une mauvaise journée"],
    // B · b973650685d8
    "characters.ren.hiddenDrives": ["Iel veut que quelqu’un demande ce que la pierre leur a vraiment offert, et a organisé les trois dernières semaines pour que personne ne le fasse","Iel a peur que Loup finisse par convenir, et que ça prouve que le regret était puéril"],
    // B · 46847ba5c198
    "characters.ren.values": ["Sa famille, sincèrement et sans rancune, ce qui est toute la difficulté","Ne pas faire de vague, ce qu’iel décrit comme une vertu et est au moins à moitié un problème"],
    // B · 4fc39b9809ed
    "characters.ren.fears": ["Être le premier Tovi en quatre générations à être une déception à ce sujet","Découvrir à trente ans que toute la vie était celle d’un autre et ne pas pouvoir dire quand ça a cessé d’être réparable"],
    // A · 3c4690a0c67c
    "characters.ren.socialStyle": "Chaleureux, bruyant, toujours dans l’instant, la voix monte quand ça devient dur. Transforme tout en compétition. Très bon pour repérer quand quelqu’un galère, mais incapable de se faire remarquer lui-même.",
    // B · 3d7c3b4c80aa
    "characters.ren.boundaries": ["Ne supporte pas qu’on parle mal de sa famille, par personne, même avec sympathie","Ne supporte pas qu’on lui dise ce qu’iel aurait dû choisir, et réagit à ça pire qu’à presque tout"],
    // B · b7a8ccd7aebb
    "characters.ren.goals": ["Passer l’entrée de l’Académie des Gardes au printemps et en être content","Arrêter de penser à la forme qui était sur la pierre à côté de celle qu’iel a prise"],
    // B · 4472b4ee883a
    "characters.ren.secrets.ren_wanted_hawk.fact": "La pierre offrait Faucon et iel a pris Loup parce que quatre générations de la famille étaient devant. Iel n’a jamais dit ça à voix haute.",
    // B · 47558a04be8d
    "characters.ren.secrets.ren_wanted_hawk.visibility": "NPC_PRIVÉ",
    // B · 6d98e92f264a
    "characters.ren.secrets.ren_wanted_hawk.revealHint": "Ils te le disent vers deux heures du matin, vite, après quatre jours à monter en pression, puis ils font tout de suite une blague.",
    // B · c8eadca43e44
    "characters.ren.secrets.ren_the_rails.fact": "Ils montent sur les rails la nuit depuis le Choix et restent debout sur les rails d’atterrissage, qui sont pour les Faucons, sans rien faire.",
    // B · 47558a04be8d
    "characters.ren.secrets.ren_the_rails.visibility": "NPC_PRIVATE",
    // B · 8aa8d13574f7
    "characters.ren.secrets.ren_the_rails.revealHint": "Quelqu’un les attrape en flagrant délit, il n’y a aucune bonne explication, et ils n’essaient pas d’en donner une.",
    // A · 492a4a444c7b
    "characters.ren.speechStyle": "Rapide, chaleureux, bavard à l’excès, les phrases s’allongent quand le sujet est difficile. Transforme tout en compétition pour changer de sujet. Se corrige sans arrêt en cours de phrase. Dit la vraie gentillesse sans prévenir — c’est là qu’il est le plus sérieux.",
    // A · 418d88441d0f
    "characters.ren.topics": ["l’académie","leur famille","le Choix","ce que tu as pris","les rails la nuit","te battre"],
    // A · e104321d3b44
    "characters.ren.voiceSamples": ["Bon, alors — non, ne me fais pas le coup du calme, je parle depuis la quatrième cloche et je vais pas m’arrêter. Tes mains. Elles te semblent comment ? Moi, j’ai l’impression d’avoir des gants empruntés.","Quatre générations. Il y a un portrait. Il y en a même plusieurs. T’as vu la salle, tu sais très bien combien de portraits il y a.","Je te parie une course jusqu’au troisième pont et si je gagne, tu me dis ce que ça t’a montré.","Je suis content pour toi. Vraiment. Mais ce n’est pas moi — écoute, arrête de penser aux portraits une minute. Onze tableaux de Loups morts dans un couloir, et aucun n’est mon problème ce soir."],
    // B · d5d95ef76fd3
    "characters.ren.appearance": "Seize ans, maigre, quatre semaines dans un corps plus large qu’avant, oreilles de loup noir-brun toujours en mouvement, une queue qu’ils n’ont pas encore appris à tenir à l’écart, et un cordon du Choix en gris et bleu Tovi.",
    // B · cb56527d0353
    "characters.ren.visualHook": "Une queue qui fait tomber un objet d’une table environ une fois par heure, et des excuses en continu pour ça.",
    // B · 2d90d8b50aa9
    "characters.ren.silhouette": "Demi-tour, regard par-dessus une épaule, en train de parler, déjà trois pas devant la personne avec qui iel est.",
    // B · 14411161c6e3
    "characters.ren.artSeed": "ss-ren-01",
    // B · db667fa7a5d4
    "characters.ren.portrait": "story_second_skin/ren",
    // B · 0edb0103fcee
    "characters.ren.expressions": ["neutre","souriant","nerveux","piqué","silencieux"],
    // B · 9ec0f3923cbe
    "characters.ren.knowledgeScope": ["ren","la_famille_tovi","l’académie","larkspire","le_choix"],
    // B · d335fbd48ff2
    "characters.ren.gates.ren_says_it.label": "Ils te disent ce que la pierre leur a offert",
    // B · 55a54e80451a
    "characters.ren.gates.ren_says_it.kind": "CONFIANCE",
    // B · c890a27e71a7
    "characters.ren.gates.ren_closer.label": "Aucun des deux ne parle d’être amis d’enfance",
    // B · 0b75bc536447
    "characters.ren.gates.ren_closer.kind": "ROMANCE",
    // B · eb877284dcb1
    "characters.ren.combatant.tags": ["loup","instable"],
    // B · 83f60ff22675
    "characters.tessa.name": "Tessa Vale",
    // A · 7ac1e0c85b5a
    "characters.tessa.role": "Seize ans, a choisi Faucon, et rêve du réseau de coursiers de la route lointaine depuis ses neuf ans",
    // A · edc6d6174b49
    "characters.tessa.cardBlurb": "Elle a exactement ce qu’elle voulait et elle est déjà à mi-chemin hors de la ville avec. C’est elle qui va te dire sans détour que tout ça est bien plus étrange que ce que les adultes laissent entendre, et elle sera sur les rails à quatre heures du matin, que tu viennes ou pas.",
    // B · aee35f364a88
    "characters.tessa.pronouns": "elle",
    // A · 54aa1feebd39
    "characters.tessa.publicTraits": ["Ne tient pas en place","Dit à voix haute ce que personne d’autre n’ose dans la pièce","Connaît déjà quatre coursiers par leur prénom"],
    // B · 819df23c2242
    "characters.tessa.hiddenDrives": ["Elle veut être intéressante pour une raison qui n’a rien à voir avec ses yeux, et ne sait pas comment faire","Elle a peur que le réseau de coursiers soit tout ce qu’elle est et qu’elle le découvre vers vingt-quatre ans"],
    // B · 382096ec7ff1
    "characters.tessa.values": ["Qu’on lui dise la vérité plutôt que la version pour les seize ans","Partir. La distance, les routes, le bout d’une carte, et ne jamais rester longtemps au même endroit"],
    // B · 991a8202bfa1
    "characters.tessa.fears": ["Être une paire d’yeux que quelqu’un emploie, et que rien d’autre chez elle ne compte pour personne","Larkspire. Plus précisément : y être encore à trente ans"],
    // A · effa6ac736e1
    "characters.tessa.socialStyle": "Nerveuse, drôle et impatiente, surtout quand on essaie de la gérer. Pose la question gênante en plein milieu de la cérémonie. Incapable physiquement de rester assise, elle ne fait pas semblant.",
    // B · ec1a5f6ff15a
    "characters.tessa.boundaries": ["Elle ne supporte plus qu’on lui fasse des compliments sur sa vue, qu’elle a entendus quatre cents fois et qui ont cessé d’avoir un sens à onze ans","Elle refuse qu’on lui demande de rester quelque part en sécurité pendant que quelqu’un d’autre fait la partie intéressante"],
    // B · 0d09474c4a0d
    "characters.tessa.goals": ["Être prise par le réseau des routes lointaines avant la fermeture des routes d’hiver","Découvrir ce qui s’est vraiment passé dans cette salle, parce que le compte officiel fait quatre phrases et est faux"],
    // B · 850e5797fd01
    "characters.tessa.secrets.tessa_saw_it.fact": "Depuis la galerie, elle a vu les plumes apparaître avant tout le monde, et elle a vu que Kaia regardait la grille du sol plutôt que les sorties.",
    // B · 47558a04be8d
    "characters.tessa.secrets.tessa_saw_it.visibility": "NPC_PRIVATE",
    // B · d9983399a42a
    "characters.tessa.secrets.tessa_saw_it.revealHint": "Elle dit à la première personne qui lui demande ce qu’elle a vu, plutôt que de raconter ce qui s’est passé.",
    // B · 9563c42f993f
    "characters.tessa.secrets.tessa_the_letter.fact": "Elle a été refusée deux fois par le réseau des coursiers à cause de son âge, elle a les deux lettres, et elle n’en a parlé ni à Ren ni à sa famille.",
    // B · 47558a04be8d
    "characters.tessa.secrets.tessa_the_letter.visibility": "NPC_PRIVATE",
    // B · e4cebc94eab1
    "characters.tessa.secrets.tessa_the_letter.revealHint": "Ça sort à côté quand quelqu’un suppose qu’elle est déjà prise, et elle ne corrige pas tout de suite.",
    // A · 4a177048e9ca
    "characters.tessa.speechStyle": "Rapide, sec et drôle, en courtes phrases entrecoupées de longs moments où elle bouge. Pose la question sceptique que tout le monde dans la salle refuse de poser. Impatiente face aux explications, elle finit souvent la phrase des autres pour aller plus vite. Jamais sentimentale, sauf très rarement, très brièvement.",
    // A · ca76495c6c5c
    "characters.tessa.topics": ["les coursiers","ce qu’elle a vu depuis la galerie","la route lointaine","ses yeux","le récit officiel","comment partir"],
    // A · 6b48f461bdc7
    "characters.tessa.voiceSamples": ["Quatre phrases. Voilà tout le récit. Une fenêtre s’ouvre, une femme recherchée est poursuivie, personne n’est blessé, la cérémonie s’achève. Moi, j’étais là-haut. Ce n’est pas ce qui s’est passé.","Elle ne regardait pas les portes. Tout le monde regarde les portes. Elle regardait le sol.","Dis quelque chose sur mes bons yeux et j’suis dans le canal. J’ai ça depuis que j’ai onze ans et ça n’a jamais été pour moi.","Troisième pont, quatre heures du matin, sur les rails. Viens ou pas, mais me raconte pas ça après."],
    // B · c3c63c49d30f
    "characters.tessa.appearance": "Seize ans, petite et agitée, peau brune, yeux de faucon or-brun perçants avec un clignement visible de membrane nictitante, plumes marron barrées dans les cheveux courts et sur les avant-bras, un sac de coursier qu’elle n’a pas encore de raison officielle de posséder.",
    // B · d32a74f9203b
    "characters.tessa.visualHook": "Un sac de coursier sans badge de route, porté partout, même à sa propre cérémonie.",
    // B · ba20e0f09b32
    "characters.tessa.silhouette": "Accrochée à un rail, talons crochés dessous, penchée au-dessus du vide.",
    // B · 54c116ba8063
    "characters.tessa.artSeed": "ss-tessa-01",
    // B · c45c38a1abba
    "characters.tessa.portrait": "story_second_skin/tessa",
    // B · 0e9b5009d0ac
    "characters.tessa.expressions": ["neutre","perçant","ravi","impatient","pris"],
    // B · c877bb70320f
    "characters.tessa.knowledgeScope": ["tessa","les_coursiers","les_rails","ce_qu’elle_a_vu","larkspire"],
    // B · 3cad4b9e01e7
    "characters.tessa.gates.tessa_tells_you_what_she_saw.label": "Elle te dit ce qu’elle a vraiment vu de là-haut",
    // B · 55a54e80451a
    "characters.tessa.gates.tessa_tells_you_what_she_saw.kind": "CONFIANCE",
    // B · 54e7507d54f0
    "characters.tessa.gates.tessa_tells_you_what_she_saw.requires.flagsSet": ["parlé :tessa"],
    // B · 9fcbd34195be
    "characters.tessa.gates.tessa_closer.label": "Elle arrête de partir avant la fin des conversations",
    // B · 0b75bc536447
    "characters.tessa.gates.tessa_closer.kind": "ROMANCE",
    // B · 774d431ee9da
    "characters.tessa.combatant.tags": ["faucon"],
    // B · c177d1633bf5
    "characters.sai.name": "Sai Velo",
    // A · 043359266822
    "characters.sai.role": "Vingt-neuf ans, médecin de Concord, et auteur d’un protocole que sa propre institution a refusé de publier",
    // A · 5ddc26a5cc41
    "characters.sai.cardBlurb": "Il travaille pour ceux qui gèrent le service, et il a dix-neuf pages qui vous permettraient de garder les deux formes sans autorisation. Il vous donne toujours les chiffres d’échec avant les mots rassurants, c’est comme ça que vous saurez qu’il est celui qui vous dit la vérité.",
    // B · fcca6b746d0b
    "characters.sai.pronouns": "il/lui",
    // A · 731359a6a5d5
    "characters.sai.publicTraits": ["Donne les chiffres de survie avant de rassurer","Travaille dans deux pièces au-dessus d’un chantier naval quand la maison Concord est fermée","Corrige aussitôt ses exagérations"],
    // B · 61d85171144c
    "characters.sai.hiddenDrives": ["Il veut que quelqu’un en dehors de l’institution décide pour lui si rester est de l’aide ou de la complicité","Il aimerait publier, avoir raison et être remercié, dans cet ordre, et il a honte du troisième"],
    // B · 3531747b883c
    "characters.sai.values": ["Les onze personnes sur lesquelles il a appliqué ce protocole, individuellement, par leur nom, toutes vivantes","Avoir les chiffres exacts, y compris ceux qui sont mauvais pour son propre argument"],
    // B · 70f1fd7d9ae2
    "characters.sai.fears": ["Publier et se tromper sur quelqu’un, à grande échelle, dans un journal","Être l’homme qui a passé trente ans à être correct à l’intérieur de quelque chose sans rien changer"],
    // A · 878b41ec6b36
    "characters.sai.socialStyle": "Prudent, poli et un peu épuisé. Répond complètement aux questions médicales, et aux questions morales en vous prescrivant plus de médicaments. Surveille les mains de quelqu’un plutôt que son visage, ce qui est typique des Serpents et aussi des médecins.",
    // B · 12921e33f8aa
    "characters.sai.boundaries": ["Il ne fera pas passer le protocole à quelqu’un qui n’a pas été informé deux fois, en entier, des chiffres d’échec","Il ne discutera jamais d’un patient, quelles que soient les circonstances, même si ça aiderait clairement"],
    // B · 1c130fe355eb
    "characters.sai.goals": ["Faire passer le protocole devant quelqu’un qui peut le légaliser, sans qu’il soit enterré avec lui","Garder les onze en vie, ce qui signifie actuellement les cacher"],
    // B · 5047ac6b7df2
    "characters.sai.secrets.sai_the_eleven.fact": "Il a appliqué le protocole de façon officieuse onze fois. Neuf de ces personnes sont vivantes et ont adopté deux formes, sous d’autres noms. Deux ne le sont pas, et il peut vous donner les deux dates.",
    // B · 47558a04be8d
    "characters.sai.secrets.sai_the_eleven.visibility": "NPC_PRIVATE",
    // B · 448a5c82cee6
    "characters.sai.secrets.sai_the_eleven.revealHint": "Il donne le deuxième chiffre sans y être invité, toujours, avant le premier, parce qu’il a décidé que c’est le seul ordre honnête.",
    // B · 80b52278f3d4
    "characters.sai.secrets.sai_what_the_ward_is_for.fact": "Il sait que l’énergie secondaire d’Écho extraite est utilisée pour stabiliser les Pierres-de-Cœur vieillissantes, et que c’est pourquoi la politique ne changera pas, et il le sait depuis deux ans.",
    // B · 47558a04be8d
    "characters.sai.secrets.sai_what_the_ward_is_for.visibility": "NPC_PRIVATE",
    // B · 5ab2a2a3725b
    "characters.sai.secrets.sai_what_the_ward_is_for.revealHint": "Il le dit une fois, doucement, à quelqu’un qui a déjà compris la plupart et qui ne va pas le crier dans un couloir.",
    // A · 0d7f8e6844e6
    "characters.sai.speechStyle": "Clinique, prudent et autocorrectif, avec le mauvais chiffre donné en premier par principe. Répond aux questions morales par des questions médicales parce qu’il n’a pas l’autre type de réponse. Parle sans cesse à demi-mot de lui-même, mais jamais du médicament, et ce contraste fait tout son personnage.",
    // A · a3d040584048
    "characters.sai.topics": ["le protocole","les chiffres d’échec","le service","pourquoi il reste","les Pierres du Cœur","ce qui vous arrive"],
    // A · dccadb1c5080
    "characters.sai.voiceSamples": ["Deux d’entre eux sont morts. Je veux que ce soit dit d’abord, avant tout, parce que tous ceux qui vous racontent ça commencent par le neuf et moi, je ne ferai pas ça.","La suppression marche. C’est là toute la difficulté. Ça marche environ soixante-dix pour cent du temps, et les échecs sont catastrophiques, tandis que les réussites sont discrètes, si bien que les chiffres paraissent excellents et les gens atroces.","Je suis resté parce qu’il y a trente-et-une personnes là-bas qui ont besoin de quelqu’un dans la pièce qui croit en elles. Ça fait deux ans que je dis cette phrase, et j’ai perdu la capacité d’entendre si c’est vrai.","Ne me racontez pas ce qu’ils vous ont dit. Je parle sérieusement. Si vous me le racontez, je dois l’écrire, et je préférerais éviter."],
    // B · 9ccfc1c4df49
    "characters.sai.appearance": "Vingt-neuf ans, mince, cheveux noirs, yeux ambrés avec une pupille verticale, écailles vert foncé sur les tempes et le long des côtés du cou, vert Concord porté sous un manteau ordinaire, et des mains toujours froides et toujours stables.",
    // B · eec299b26bc7
    "characters.sai.visualHook": "Écailles vert foncé sur les tempes qu’il cache à moitié sous ses cheveux sans que ça se voie.",
    // B · c0fa22880470
    "characters.sai.silhouette": "Assis sur un tabouret, penché en avant, avant-bras sur les genoux, au niveau des yeux de la personne qu’il soigne.",
    // B · 3d2073740802
    "characters.sai.artSeed": "ss-sai-01",
    // B · 21c5e03f8ecc
    "characters.sai.portrait": "story_second_skin/sai",
    // B · 73956407eca8
    "characters.sai.expressions": ["neutre","clinique","prudent","épuisé","décidé"],
    // B · 1484710330f0
    "characters.sai.knowledgeScope": ["sai","le_protocole","médecine_écho","le_concord","le_septième_poste","les_pierres_de_cœur"],
    // B · 619227eaad5e
    "characters.sai.gates.sai_gives_you_the_figures.label": "Il vous donne les deux chiffres, dans son ordre",
    // B · 55a54e80451a
    "characters.sai.gates.sai_gives_you_the_figures.kind": "CONFIANCE",
    // B · 427a1c4a20f7
    "characters.sai.gates.sai_gives_you_the_figures.requires.flagsSet": ["parlé :sai"],
    // B · 98443d488067
    "characters.sai.gates.sai_hands_over_the_pages.label": "Il vous donne dix-neuf pages qui pourraient lui coûter cher",
    // B · 9e8ae18bf8bf
    "characters.sai.gates.sai_hands_over_the_pages.kind": "ALLIANCE",
    // B · 0d9e071921d7
    "characters.sai.combatant.tags": ["serpent","médecin"],
    // B · 5a8539aae2d6
    "characters.edran.name": "Edran Sol",
    // A · bff14669cab2
    "characters.edran.role": "Cinquante-six ans, Grand Gardien de la Concorde, et la personne la plus convaincante de cette histoire",
    // A · 7d977fab057c
    "characters.edran.cardBlurb": "Il dirige l’institution et ne se défend pas du tout. Il croit que l’identité a besoin de limites, qu’un soi qu’on peut jeter dès qu’il dérange n’est pas un vrai soi, et il va vous exposer ça calmement, de manière convaincante. Certains soirs vous aurez du mal à répondre.",
    // B · fcca6b746d0b
    "characters.edran.pronouns": "il/lui",
    // A · c46ed41f6f27
    "characters.edran.publicTraits": ["Jamais une seule fois sur la défensive face à la Concorde","Demande ce que vous avez choisi avant de dire quoi que ce soit d’autre","Admet immédiatement et complètement l’argument le plus fort contre lui"],
    // B · f34aaa55c627
    "characters.edran.hiddenDrives": ["Il a besoin que le Sceau concerne l’identité plutôt que l’infrastructure, parce qu’il a lu les mêmes chiffres que Sai","Il a commencé à organiser sa succession autour de quelqu’un qui ignore à quoi sert le poste"],
    // B · f88a6567cda6
    "characters.edran.values": ["Une personne finie — quelqu’un qui est devenu quelqu’un plutôt que de rester un ensemble d’options pour toujours","Les sept cents ans de ça, qu’il considère vraiment comme la grande réussite de la civilisation Kin et qui l’est en partie"],
    // B · c146068fe66b
    "characters.edran.fears": ["Être le Gardien qui a découvert que c’était porteur et qui a continué quand même, ce qu’il est déjà","Une génération qui ne se stabilise jamais, et ce qu’il croit que ça leur ferait, ce qui n’est pas rien"],
    // A · 00c3f4aec29e
    "characters.edran.socialStyle": "Très présent, entièrement calme. Rend votre objection plus forte que vous ne l’avez faite et répond à cette version-là. Ne s’énerve jamais, ne se hérisse pas, et n’a pas montré de colère visible depuis onze ans.",
    // B · d968e6eb6599
    "characters.edran.boundaries": ["Il n’autorisera pas une prise sans constat médical, et a refusé les Gardes à ce sujet deux fois","Il ne permettra pas qu’un Choix soit forcé par une famille, ce qu’il fait appliquer personnellement et impopulairement"],
    // B · be268c2a0318
    "characters.edran.goals": ["Maintenir le système de Stabilisation intact pendant une décennie où les Pierres-de-Cœur vieillissent visiblement","Trouver quelqu’un à qui le confier qui tiendra la ligne sans avoir besoin de savoir pourquoi elle est là"],
    // B · 5392560dd8d0
    "characters.edran.secrets.edran_knows.fact": "Il sait depuis six ans que l’énergie d’Écho extraite stabilise les Pierres-de-Cœur vieillissantes, et que cela rend la politique immuable, peu importe ce que dit la médecine.",
    // B · 47558a04be8d
    "characters.edran.secrets.edran_knows.visibility": "NPC_PRIVATE",
    // B · 02a59f99768a
    "characters.edran.secrets.edran_knows.revealHint": "Il ne le nie pas si on le lui présente correctement. Il explique ce qu’il pense que coûterait l’alternative, et c’est le meilleur argument de l’histoire.",
    // B · 514e7febacc6
    "characters.edran.secrets.edran_his_own_choosing.fact": "La pierre lui a offert quatre formes à seize ans et il a pensé à l’une des trois autres, précisément et par son nom, presque chaque semaine depuis quarante ans.",
    // B · 47558a04be8d
    "characters.edran.secrets.edran_his_own_choosing.visibility": "NPC_PRIVATE",
    // B · fd74963b0e9a
    "characters.edran.secrets.edran_his_own_choosing.revealHint": "Il le propose lui-même, de toutes les choses, pour montrer qu’il comprend exactement ce qu’il demande à tout le monde.",
    // A · 5c0bd873c078
    "characters.edran.speechStyle": "Calme, posé et structuré, avec la cadence de quelqu’un qui a expliqué ça des milliers de fois en y croyant toujours. Il reformule l’objection mieux que celui qui la soulève, puis y répond. Il dit « nous » en parlant de sept siècles de gens. Jamais sur la défensive, jamais acerbe, et complètement inflexible.",
    // A · 71e61ec3d5dc
    "characters.edran.topics": ["les limites","la Fièvre des Peaux-Multiples","son propre Choix","le service","ce qu’est une personne inachevée","les Pierres de Cœur"],
    // A · cf66d6f3e93b
    "characters.edran.voiceSamples": ["Dis-le bien et je te répondrai bien. Tu crois qu’on traite les gens comme malades pour pouvoir les utiliser. C’est la version la plus dure, et elle n’est pas complètement fausse, alors autant commencer par là.","L’identité exige des limites. Un soi qu’on peut poser dès que ça devient inconfortable n’est pas un soi, c’est une préférence, et une vie faite de préférences c’est un couloir très long sans aucune pièce sur le côté.","Le mien en proposait quatre. J’ai pensé à la deuxième presque toutes les semaines pendant quarante ans et je n’ai jamais regretté la première, ces deux choses cohabitent parfaitement.","On a sauvé des millions. Je sais bien que c’est ce que tout le monde dit à ce stade de la conversation. C’est aussi documenté, et je te demande de garder les deux en tête."],
    // B · 118fab4348d2
    "characters.edran.appearance": "Cinquante-six ans, grand et imposant sans effort, cheveux argent-brun, un large panache de bois de cerf orné d’or aux extrémités, robes vert foncé et crème, et une immobilité qui fait que les pièces s’organisent autour de lui.",
    // B · c547214b7530
    "characters.edran.visualHook": "Capsules rituelles dorées sur les pointes des bois, portées tous les jours plutôt que pour une cérémonie.",
    // B · ea6b48f4cb6e
    "characters.edran.silhouette": "Assis, droit, avec les bois remplissant le tiers supérieur du cadre.",
    // B · 240ae762daea
    "characters.edran.artSeed": "ss-edran-01",
    // B · 41804bd9af0b
    "characters.edran.portrait": "story_second_skin/edran",
    // B · fbe1c422d4e2
    "characters.edran.expressions": ["neutre","chaleureux","réfléchi","grave","immobile"],
    // B · 23bdcefd4c33
    "characters.edran.knowledgeScope": ["edran","la_concorde","le_sceau","la_fièvre_des_multiples_peaux","le_service_sept","les_pierres_du_coeur"],
    // B · 4b1ae576cadb
    "characters.edran.gates.edran_makes_the_case.label": "Il te présente tout l’argument correctement",
    // B · 77dcad9b37cc
    "characters.edran.gates.edran_makes_the_case.kind": "AUTRE",
    // B · 5f95bfae8139
    "characters.edran.gates.edran_makes_the_case.requires.flagsSet": ["parlé :edran"],
    // B · 13cb870ba62b
    "characters.edran.gates.edran_concedes_the_ward.label": "Il te dit à quoi sert vraiment le service",
    // B · 55a54e80451a
    "characters.edran.gates.edran_concedes_the_ward.kind": "CONFIANCE",
    // B · 973ca442acf7
    "characters.edran.combatant.tags": ["cerf","gardien"],
    // B · 9af861547847
    "characters.lio.name": "Lio Voss",
    // A · d718b58ea893
    "characters.lio.role": "Dix-huit ans, déclaré mort officiellement depuis quatorze mois, et vit dans une chambre propre et chaude sous la capitale",
    // A · 815dad5afa32
    "characters.lio.cardBlurb": "La Concorde a annoncé à sa famille qu’il est mort pendant un traitement il y a quatorze mois. Il connaît la routine à la minute près, il sait nommer tous les trente autres, et si tu descends le voir, il t’expliquera en quatre-vingt-dix secondes à quoi servent vraiment les séances.",
    // B · fcca6b746d0b
    "characters.lio.pronouns": "il/lui",
    // A · 7d8cbe444fee
    "characters.lio.publicTraits": ["Connaît la routine du service à la minute près et la partage sans qu’on lui demande","Nomme tout le monde dans le couloir, y compris le personnel","Est extrêmement drôle sur une situation où personne ne devrait plaisanter"],
    // B · 41ee2da2625e
    "characters.lio.hiddenDrives": ["Il a décidé qu’il ne partirait pas sans les trente autres et ne l’a pas dit à sa sœur","Il a peur que quatorze mois plus tard il soit devenu quelqu’un qui pourrait rester, et il se surveille pour ça"],
    // B · 3aa2a8f191cf
    "characters.lio.values": ["Les trente. Il connaît tous leurs noms, leurs dates d’entrée et qui passe une mauvaise semaine","Ne pas se faire mentir, c’est la seule chose qu’il demande au personnel et qu’il obtient en général"],
    // B · e0aa6d517557
    "characters.lio.fears": ["Kaia qui arrive après lui, c’est le résultat précis qu’il a passé quatorze mois à essayer d’empêcher par tous les moyens","Les sessions d’extraction, qu’il ne décrit pas, et sur lesquelles il change de sujet avec un énorme talent"],
    // A · 0fa1bb38b479
    "characters.lio.socialStyle": "Immédia­tement amical et inlassablement informatif sur le service, parce que l’info est la seule chose qu’il ait pu accumuler. Il détourne toute question sur lui en un fait sur quelqu’un d’autre dans le couloir.",
    // B · 953a3b36ce2f
    "characters.lio.boundaries": ["Il ne se fera pas sortir avant les autres, et il s’y opposera physiquement","Il ne supporte pas qu’on traite le personnel de monstres devant lui, parce que la plupart ne le sont pas et il doit vivre ici"],
    // B · ab667808afce
    "characters.lio.goals": ["Faire monter trente et une personnes par un escalier, ce qu’il a planifié dans les moindres détails mais n’a aucun moyen d’exécuter","Faire passer un message à sa sœur qui n’est pas celui qu’elle cherche"],
    // B · 030b056fd037
    "characters.lio.secrets.lio_what_they_take.fact": "Il a compris dès le quatrième mois à quoi servent les sessions, d’après les jours où les lumières sont plus stables ensuite. Il l’a dit aux trente autres et à aucun membre du personnel.",
    // B · 47558a04be8d
    "characters.lio.secrets.lio_what_they_take.visibility": "NPC_PRIVATE",
    // B · 5966c0bfc8ca
    "characters.lio.secrets.lio_what_they_take.revealHint": "Il l’explique en environ quatre-vingt-dix secondes à la première personne qui arrive de l’extérieur, parce qu’il attend depuis quatorze mois pour le dire à quelqu’un.",
    // B · 3dc65da0425c
    "characters.lio.secrets.lio_the_second_shape.fact": "Sa seconde Affinité n’est jamais vraiment apparue et la Concorde a réprimé quelque chose qui n’a jamais existé. Il ne leur a jamais dit, parce qu’être un cas est ce qui le maintient dans le couloir avec les autres.",
    // B · 47558a04be8d
    "characters.lio.secrets.lio_the_second_shape.visibility": "NPC_PRIVATE",
    // B · d7f7bcde0efc
    "characters.lio.secrets.lio_the_second_shape.revealHint": "Il le dit d’un ton plat, comme la chose la moins importante qu’il a à te dire, c’est quand ça arrive.",
    // A · 03ca1b6beb1b
    "characters.lio.speechStyle": "Chaleureux, rapide et plein d’infos, comme si tout ça était assez intéressant, une stratégie de survie qui a quatorze mois. Compte les choses — jours, portes, gens, séances. Transforme chaque question sur lui en un fait sur quelqu’un dans le couloir, avec fluidité, à chaque fois.",
    // A · 62989381d32d
    "characters.lio.topics": ["la routine","les trente","les séances","sa sœur","les lumières","la sortie"],
    // A · dd98f9f0c6fa
    "characters.lio.voiceSamples": ["Quatre cent vingt-six jours. Trente et un d’entre nous, trente et une chambres, deux membres du personnel dans le couloir la nuit, et l’une s’appelle Peris et elle est sympa. Pardon — vous êtes qui ?","Les lumières du couloir deviennent plus stables le lendemain d’une séance. Ça m’a pris quatre mois. Y’a rien d’autre à faire ici que de remarquer des choses, c’est une phrase que je répète souvent et que tout le monde trouve déprimante.","Ne me dis pas comment elle va. Si tu me dis comment elle va, je ne te servirai à rien pendant environ une heure.","La mienne n’est jamais venue. Pas vraiment. Ils ont réprimé quelque chose qui n’y était pas et j’ai laissé faire, parce qu’un cas a une chambre dans ce couloir et une erreur est renvoyée chez elle."],
    // B · d1cdb71e5102
    "characters.lio.appearance": "Dix-huit ans, mince, cheveux blanc-blond, oreilles de renard arctique et une lourde queue blanche en brosse qui est restée blanche d’hiver pendant quatorze mois à l’intérieur, vêtements pâles d’institution qui vont bien, et un décompte au crayon derrière une porte.",
    // B · a34852daab97
    "characters.lio.visualHook": "Un décompte au crayon derrière la porte de sa chambre, en groupes de trente et un plutôt que cinq.",
    // B · 86df31b30a96
    "characters.lio.silhouette": "Assis au bout d’un lit, dos contre un mur et sa queue enroulée autour de ses pieds.",
    // B · d751b476c59a
    "characters.lio.artSeed": "ss-lio-01",
    // B · 7b0f7e67b202
    "characters.lio.portrait": "story_second_skin/lio",
    // B · 02171296a4af
    "characters.lio.expressions": ["neutre","éclairé","informatif","prudent","brisé"],
    // B · d225ce79297c
    "characters.lio.knowledgeScope": ["lio","le_service_sept","les_sessions","les_trente","kaia"],
    // B · 2dd079f03964
    "characters.lio.gates.lio_tells_you_what_it_is_for.label": "Il te dit ce que les sessions font vraiment",
    // B · 55a54e80451a
    "characters.lio.gates.lio_tells_you_what_it_is_for.kind": "CONFIANCE",
    // B · 49e95f61a324
    "characters.lio.gates.lio_tells_you_what_it_is_for.requires.flagsSet": ["parlé :lio"],
    // B · 4d615b4965ba
    "characters.lio.gates.lio_will_move.label": "Il va faire monter trente et une personnes par un escalier",
    // B · 9e8ae18bf8bf
    "characters.lio.gates.lio_will_move.kind": "ALLIANCE",
    // B · c0adb730ff92
    "characters.lio.combatant.tags": ["renard","renaissant"],
    // B · a71c330d21d1
    "factions.faction_wardens.name": "Les Gardiens de la Couronne",
    // B · 95e55ffca012
    "factions.faction_wardens.description": "Bleu marine et or, onze par service, leur boulot c’est surtout d’empêcher les civils de se faire du mal. Ils sont bons dans ce qu’ils font, respectent la loi, et l’une de leurs missions régulières est de ramener les gens dont le corps a développé ce que la loi appelle une maladie.",
    // B · a14f762272e9
    "factions.faction_wardens.allies": ["faction_concord"],
    // B · 36dac870b3b8
    "factions.faction_concord.name": "La Concorde des Parentés Fixes",
    // B · b1e4253d5e88
    "factions.faction_concord.description": "Pierres de cœur, Choisir la sécurité, tirages gratuits, guérisseurs itinérants et sept siècles de médecine qui ont sauvé un nombre énorme de vies. Elle gère aussi un service sous la capitale et dépend de ce qu’on en extrait.",
    // B · 94942959ebde
    "factions.faction_concord.allies": ["faction_wardens"],
    // B · ccdec9ff61b0
    "factions.faction_concord.enemies": ["faction_twiceborn"],
    // B · 5b9a69af3a06
    "factions.faction_larkspire.name": "Larkspire",
    // B · 4b134517d2b8
    "factions.faction_larkspire.description": "La ville elle-même : le marché, les gardiens des canaux, les marcheurs sur les rails et environ onze mille personnes qui veulent surtout que la cérémonie se passe bien et que le prix de l’anguille baisse.",
    // B · c503990c866e
    "factions.faction_twiceborn.name": "Les Doubles",
    // B · 000919d7a62d
    "factions.faction_twiceborn.description": "Pas d’organisation, pas de chef, pas de nom sur lequel ils se soient mis d’accord. Peut-être quatre cents personnes à travers Avara qui vivent sous d’autres noms, plus tous ceux d’un service sous la capitale, plus une Roadwarden recherchée qui commence à se faire remarquer.",
    // B · a14f762272e9
    "factions.faction_twiceborn.enemies": ["faction_concord"],
    // B · e57706048865
    "quests.q_the_choosing.title": "Le Choix",
    // B · 77ed120dfd2c
    "quests.q_the_choosing.summary": "Tu poses la main sur une pierre vivante à seize ans, elle te montre ce que tu pourrais devenir, et tu as environ quatre-vingt-dix secondes.",
    // B · 7fcc0be2ad9c
    "quests.q_the_choosing.kind": "PRINCIPALE",
    // B · 84b88ad12554
    "quests.q_the_choosing.steps.the_window.playerCopy": "Un carreau arrive par la galerie est et une femme atterrit sur un genou avec des plumes qui remontent le long de son bras.",
    // B · 7b565693a8cc
    "quests.q_the_choosing.steps.the_window.directorNotes": "Quatre cents personnes, la plupart en famille. Elle n’est pas là pour le joueur et ne le regarde pas. Ce que le joueur fait dans les secondes qui suivent est totalement libre, y compris ne rien faire, et le silence dans la salle est tout le rythme.",
    // B · e1bf3b9246a3
    "quests.q_the_choosing.steps.the_window.rewards.flags": ["sait :twiceborn_exist"],
    // B · 61d657dfa735
    "quests.q_the_choosing.steps.the_month_after.playerCopy": "Ton corps va passer quatre semaines à devenir ce que tu as choisi. Découvre ce que ça fait vraiment.",
    // B · 4ce62cbd1a6f
    "quests.q_the_choosing.steps.the_month_after.directorNotes": "Le meilleur matériau du monde est là et il est entièrement domestique : mal dormir, entendre une dispute trois étages plus bas, une queue dans une porte, la nourriture qui a un goût différent, quelqu’un au marché qui ajuste une portion sans demander. Écris une semaine ordinaire précise.",
    // B · e1bf3b9246a3
    "quests.q_the_choosing.steps.the_month_after.enterWhen.flagsSet": ["sait :twiceborn_exist"],
    // B · 493c951440ea
    "quests.q_the_choosing.steps.the_month_after.rewards.flags": ["le_mois_est_termine"],
    // B · 5e52034356a8
    "quests.q_the_choosing.involvedCharacterIds": ["ren","tessa","kaia"],
    // B · 7987768a9351
    "quests.q_the_choosing.involvedLocationIds": ["salle_pierre_de_coeur","maison_joueur","marche_larkspire"],
    // B · 8ae1cc2bddb8
    "quests.q_the_choosing.knownRewardCopy": "Un corps qui va continuer à changer pendant un mois, et une idée de ce qui s’est passé dans cette salle.",
    // B · 53b733d52d8a
    "quests.q_the_ledger.title": "Ce Qui Est Sous La Salle",
    // B · b7e2c8faed2c
    "quests.q_the_ledger.summary": "Elle ne regardait pas les portes. Elle regardait le sol, et sous le sol il y a sept cents ans de registres que personne n’a jamais vus.",
    // B · 7fcc0be2ad9c
    "quests.q_the_ledger.kind": "PRINCIPALE",
    // B · 493c951440ea
    "quests.q_the_ledger.discoverWhen.flagsSet": ["le_mois_est_termine"],
    // B · 7c1bc9bfe36f
    "quests.q_the_ledger.steps.find_the_way_down.playerCopy": "Il y a un escalier derrière la grille et environ quatre cents personnes l’ont emprunté ce mois-ci.",
    // B · 34a2a8eed691
    "quests.q_the_ledger.steps.find_the_way_down.directorNotes": "Trois entrées. Le chemin de la Concorde est légitime, lent et laisse des traces. Kaia connaît le chemin et ne prendra pas un seize ans. Tessa a vu d’où elle regardait depuis la galerie et vient avec ou sans le joueur.",
    // B · 7c50e3d1d5e1
    "quests.q_the_ledger.steps.find_the_way_down.rewards.flags": ["cherche_le_registre"],
    // B · 32cb5f110470
    "quests.q_the_ledger.steps.read_your_own.playerCopy": "Les rayonnages remontent à sept siècles et une des plaquettes est à toi.",
    // B · 85c8c21a1c2e
    "quests.q_the_ledger.steps.read_your_own.directorNotes": "La révélation n’est pas que le joueur est spécial. C’est que chaque feuille a quatre autres formes dessus. La sienne, celle de Ren, celle du Grand Gardien. L’horreur est dans à quel point c’est ordinaire.",
    // B · 7c50e3d1d5e1
    "quests.q_the_ledger.steps.read_your_own.enterWhen.flagsSet": ["cherche_le_registre"],
    // B · 0c77943e4405
    "quests.q_the_ledger.steps.read_your_own.rewards.flags": ["le_registre_est_repondu"],
    // B · 229e022665d7
    "quests.q_the_ledger.involvedCharacterIds": ["kaia","tessa","ilyra"],
    // B · f8adab9183c7
    "quests.q_the_ledger.involvedLocationIds": ["salle_pierre_de_coeur","le_sous-sol","les_rails"],
    // B · 796cdb7d9704
    "quests.q_the_ledger.knownRewardCopy": "Ce que dit vraiment un registre du Choix, et ce que personne ne t’a jamais dit qu’il disait.",
    // B · d28d1ebcbd5d
    "quests.q_something_under_it.title": "Quelque chose en dessous",
    // B · 2982cc64a4b4
    "quests.q_something_under_it.summary": "Une préférence qui n’est pas la tienne. Une hauteur vers laquelle tu te retournes sans cesse. Un rêve d’un corps que tu n’as pas choisi.",
    // B · 7fcc0be2ad9c
    "quests.q_something_under_it.kind": "PRINCIPALE",
    // B · 55d57c7ef177
    "quests.q_something_under_it.discoverWhen.flagsSet": ["knows :there_is_something_under_it"],
    // B · 9771de9c2f7c
    "quests.q_something_under_it.steps.tell_somebody.playerCopy": "Ça remonte sous stress puis repart, exactement ce dont on t’a mis en garde enfant.",
    // B · b6bd1efb3d56
    "quests.q_something_under_it.steps.tell_somebody.directorNotes": "Quatre options, chacune avec un vrai coût. La Concorde le soigne légalement, par suppression. Sai le soigne bien, illégalement. Kaia l’a fait et dira honnêtement à quel point ça peut mal tourner. Ne rien dire marche un temps.",
    // B · 5776e71e4ae7
    "quests.q_something_under_it.steps.tell_somebody.rewards.flags": ["somebody_knows_or_nobody_does"],
    // B · e12605194092
    "quests.q_something_under_it.steps.tell_somebody.rewards.abilities": ["let_it_up","run_the_protocol"],
    // B · 8bcfbfa3d9ce
    "quests.q_something_under_it.steps.what_you_do_about_it.playerCopy": "Il y a trois issues, une seule est légale.",
    // B · 0b97b928e23b
    "quests.q_something_under_it.steps.what_you_do_about_it.directorNotes": "La suppression marche environ soixante-dix pour cent du temps, mais les échecs sont catastrophiques. Le protocole marche mieux, il est illégal et non publié. Refuser les deux et le contenir par la volonté est possible, c’est la pire option, mais le monde devrait quand même laisser quelqu’un le faire.",
    // B · 5776e71e4ae7
    "quests.q_something_under_it.steps.what_you_do_about_it.enterWhen.flagsSet": ["somebody_knows_or_nobody_does"],
    // B · bb1e4da7b5b2
    "quests.q_something_under_it.steps.what_you_do_about_it.rewards.flags": ["the_second_shape_is_answered"],
    // B · 7e8c8c5e03c2
    "quests.q_something_under_it.involvedCharacterIds": ["sai","kaia","ilyra"],
    // B · 8cde8e12cc0e
    "quests.q_something_under_it.involvedLocationIds": ["sai_infirmary","concord_house","the_canal_quarter"],
    // B · 0f11f5238c1b
    "quests.q_something_under_it.knownRewardCopy": "Ce qui t’arrive vraiment, par les deux seules personnes en ville qui te diraient la vérité.",
    // B · 80e4106f412d
    "quests.q_the_ward.title": "Pavillon Sept",
    // B · b04e0592bbfa
    "quests.q_the_ward.summary": "Trente-et-une personnes dans des chambres propres et chaudes sous la capitale, dont une que sa famille croyait morte depuis quatorze mois.",
    // B · 7fcc0be2ad9c
    "quests.q_the_ward.kind": "PRINCIPALE",
    // B · cd237ad534de
    "quests.q_the_ward.discoverWhen.flagsSet": ["knows :everybody_has_them"],
    // B · 4c518b5e3421
    "quests.q_the_ward.steps.get_down_there.playerCopy": "Onze jours vers le sud, murs blancs, et un pavillon numéroté plutôt que nommé.",
    // B · e0409b0cdc52
    "quests.q_the_ward.steps.get_down_there.directorNotes": "C’est propre, chaud, bien éclairé, humain. Un jardin sous verrière sans porte extérieure. Personnel gentil. L’horreur, c’est que tout est défendable sauf le fait que personne ne peut partir.",
    // B · e5a7dc19ac08
    "quests.q_the_ward.steps.get_down_there.rewards.flags": ["inside_the_ward"],
    // B · f5916928b8b4
    "quests.q_the_ward.steps.what_the_sessions_are_for.playerCopy": "Un jeune de dix-huit ans dans le couloir a compris à quoi servent les séances au bout de quatre mois.",
    // B · 4cff88a40bb6
    "quests.q_the_ward.steps.what_the_sessions_are_for.directorNotes": "Lio te l’explique en quatre-vingt-dix secondes, il attend depuis quatorze mois pour le dire. Les lumières sont plus stables après une séance. Ce qu’on prend à trente-et-une personnes maintient les villes debout, c’est pourquoi la politique ne peut pas changer.",
    // B · e5a7dc19ac08
    "quests.q_the_ward.steps.what_the_sessions_are_for.enterWhen.flagsSet": ["inside_the_ward"],
    // B · 1570651c0fde
    "quests.q_the_ward.steps.what_the_sessions_are_for.rewards.flags": ["knows :the_worst_of_it"],
    // B · 6ef81ebf6789
    "quests.q_the_ward.involvedCharacterIds": ["kaia","lio","edran","sai"],
    // B · c7c67fb444ca
    "quests.q_the_ward.involvedLocationIds": ["aurelion_gate","ward_seven","the_far_road"],
    // B · 316f02ffed31
    "quests.q_the_ward.knownRewardCopy": "Ce qui est sous la capitale, à quoi ça sert, et pourquoi ça vaut la peine d’agir.",
    // B · 545cca1a5276
    "quests.q_what_you_do_with_it.title": "Ce Que Tu En Fais",
    // B · c8cce5a0ba03
    "quests.q_what_you_do_with_it.summary": "Tu sais ce qui est sous la salle, sous la capitale, et à quoi ça sert. Personne dans ce monde ne te dira quoi en faire.",
    // B · 7fcc0be2ad9c
    "quests.q_what_you_do_with_it.kind": "PRINCIPALE",
    // B · 1570651c0fde
    "quests.q_what_you_do_with_it.discoverWhen.flagsSet": ["knows :the_worst_of_it"],
    // B · fb92e98b5c15
    "quests.q_what_you_do_with_it.steps.the_argument.playerCopy": "Il va te présenter calmement son argument, et certains points seront durs à contrer.",
    // B · 2b23ed5c3934
    "quests.q_what_you_do_with_it.steps.the_argument.directorNotes": "Edran n’est pas sur la défensive, il ne bluffe pas. Il présente la meilleure version de l’objection, puis y répond. La réponse sur ce qui arrive aux villes si l’extraction s’arrête est vraiment difficile. La scène échoue s’il est écrit comme un hypocrite.",
    // B · 1570651c0fde
    "quests.q_what_you_do_with_it.steps.the_argument.enterWhen.flagsSet": ["knows :the_worst_of_it"],
    // B · be6662226320
    "quests.q_what_you_do_with_it.steps.the_argument.rewards.flags": ["the_case_was_made"],
    // B · 96c27b8abdf5
    "quests.q_what_you_do_with_it.steps.the_thing_you_do.playerCopy": "Décide.",
    // B · 14ce942fa1fd
    "quests.q_what_you_do_with_it.steps.the_thing_you_do.directorNotes": "Chaque choix coûte quelque chose de réel à quelqu’un. Vider le pavillon déstabilise les Heartstones sous les villes habitées. Publier le Registre révèle à quatre cent mille adultes qu’ils ont été scellés sans leur accord. Protéger le système laisse trente-et-une personnes là où elles sont. Il n’y a pas de solution propre, le monde ne doit pas laisser croire le contraire.",
    // B · be6662226320
    "quests.q_what_you_do_with_it.steps.the_thing_you_do.enterWhen.flagsSet": ["the_case_was_made"],
    // B · fc91f41df399
    "quests.q_what_you_do_with_it.steps.the_thing_you_do.rewards.flags": ["the_story_has_a_shape"],
    // B · 126f4b061fd1
    "quests.q_what_you_do_with_it.involvedCharacterIds": ["edran","kaia","ilyra","sai","lio"],
    // B · 5f443703aa7e
    "quests.q_what_you_do_with_it.involvedLocationIds": ["aurelion_gate","ward_seven","heartstone_hall","larkspire_market"],
    // B · 641f5b36c85f
    "quests.q_what_you_do_with_it.knownRewardCopy": "Ce que fait Avara à propos de ce qu’elle fait depuis sept cents ans.",
    // B · 491599ad2ef9
    "worldEvents.we_the_official_account.publicCopy": "La Concorde publie un compte rendu de la cérémonie. Il fait quatre phrases. Une fenêtre a été brisée, une personne recherchée a été poursuivie, personne n’a été blessé, la cérémonie s’est terminée.",
    // B · c656d70589e6
    "worldEvents.we_the_official_account.directorNotes": "Personne ne ment, exactement. Tout ce qu’il y a dans ces quatre phrases est vrai et ce compte rendu n’est pas ce qui s’est passé. Quatre cents personnes étaient dans cette salle et en une semaine, la plupart racontent la version en quatre phrases.",
    // B · 1074362ea6dc
    "worldEvents.we_the_official_account.setsFlags": ["the_account_went_up"],
    // B · e1bf3b9246a3
    "worldEvents.we_the_official_account.requiresFlags": ["knows :twiceborn_exist"],
    // B · 341a93e8bd43
    "worldEvents.we_the_wardens_come_round.publicCopy": "Un capitaine des Gardes est à la porte de ta famille en plein après-midi, avec son manteau bien mis et les mains visibles, demandant si c’est un bon moment.",
    // B · dc49026e97b1
    "worldEvents.we_the_wardens_come_round.directorNotes": "Ilyra est polie, minutieuse, et dit au joueur exactement ce qui va se passer ensuite dans l’ordre. Rien de mauvais ne se passe. La scène montre un adolescent découvrant qu’il ou elle est maintenant le genre de personne qu’un capitaine vient voir.",
    // B · f7f6aa57fbd1
    "worldEvents.we_the_wardens_come_round.setsFlags": ["ilyra_has_your_name"],
    // B · 4dc61bf167dd
    "worldEvents.we_the_wardens_come_round.cancelledByFlags": ["stayed_in_your_seat"],
    // B · 1074362ea6dc
    "worldEvents.we_the_wardens_come_round.requiresFlags": ["the_account_went_up"],
    // B · ca79e62f4d88
    "worldEvents.we_the_first_pull.publicCopy": "Tu te réveilles à trois heures parce que la température de la pièce est mauvaise, mais elle ne l’est pas, et tu restes là une heure à vouloir une hauteur où tu n’es jamais allé.",
    // B · d3417fc73308
    "worldEvents.we_the_first_pull.directorNotes": "Le premier Tirage, ce n’est pas dramatique. Une préférence qui n’est pas la leur. Écris-le comme la solitude spécifique de remarquer quelque chose sur soi qu’on t’a appris depuis l’enfance être le début d’une maladie.",
    // B · 55d57c7ef177
    "worldEvents.we_the_first_pull.setsFlags": ["knows :there_is_something_under_it"],
    // B · 77f79d44dc96
    "worldEvents.we_the_first_pull.cancelledByFlags": ["settled_well"],
    // B · 493c951440ea
    "worldEvents.we_the_first_pull.requiresFlags": ["the_month_is_over"],
    // B · e307459eeee7
    "worldEvents.we_ren_on_the_rails.publicCopy": "Quelqu’un est debout sur un rail d’atterrissage Faucon à deux heures du matin, en gris et bleu Tovi, avec une queue de loup et aucune raison d’être là.",
    // B · 33e85d4e5709
    "worldEvents.we_ren_on_the_rails.directorNotes": "Ren fait ça depuis le Choix et n’a aucune explication, et n’essaiera pas d’en donner une. Quoi que le joueur fasse ici, c’est toute cette amitié pour le reste de l’histoire.",
    // B · 5f842783cc78
    "worldEvents.we_ren_on_the_rails.setsFlags": ["found_ren_on_the_rails"],
    // B · f011246c40cd
    "worldEvents.we_ren_on_the_rails.cancelledByFlags": ["knows :ren_regrets_it"],
    // B · 493c951440ea
    "worldEvents.we_ren_on_the_rails.requiresFlags": ["the_month_is_over"],
    // B · 4281dc617162
    "worldEvents.we_somebody_is_taken.publicCopy": "Un dix-neuf ans du quatrième quartier est emmené à la maison de la Concorde pour un constat médical, poliment, en plein jour, avec sa mère présente et consentante.",
    // B · a0a7dad11713
    "worldEvents.we_somebody_is_taken.directorNotes": "C’est le système qui marche exactement comme prévu et c’est insupportable à regarder. Tout le monde est gentil. La mère est d’accord. Les Gardes sont doux. Personne ne transgresse une seule règle.",
    // B · 68958ff64fc3
    "worldEvents.we_somebody_is_taken.setsFlags": ["saw_somebody_taken"],
    // B · c60c2c43c853
    "worldEvents.we_somebody_is_taken.cancelledByFlags": ["the_ward_is_empty","the_accord"],
    // B · 1074362ea6dc
    "worldEvents.we_somebody_is_taken.requiresFlags": ["the_account_went_up"],
    // B · 6a6656049e8e
    "worldEvents.we_sai_finds_you.publicCopy": "Un médecin de la Concorde en manteau ordinaire t’attend au bout de ta rue à dix heures du soir, il dit qu’il a passé la semaine à lire les notes d’admission et voudrait quatre minutes.",
    // B · 3e35a1c411ba
    "worldEvents.we_sai_finds_you.directorNotes": "Il ne recrute pas et ne menace pas. Il a vu quelque chose dans une note de routine et est venu, de son propre chef, pour donner à quelqu’un les chiffres d’échec avant que quelqu’un d’autre donne la version rassurante.",
    // B · e22250e0011d
    "worldEvents.we_sai_finds_you.setsFlags": ["sai_found_you"],
    // B · a8dd46d96015
    "worldEvents.we_sai_finds_you.cancelledByFlags": ["sai_knows","suppressed_it"],
    // B · 55d57c7ef177
    "worldEvents.we_sai_finds_you.requiresFlags": ["knows :there_is_something_under_it"],
    // B · ab4d30c6926f
    "worldEvents.we_kaia_comes_back.publicCopy": "Quelqu’un est assis sur la citerne au-dessus de ta rue à une heure du matin, là depuis environ deux heures, clairement en train d’attendre que tu montes.",
    // B · 8b641c07b9d2
    "worldEvents.we_kaia_comes_back.directorNotes": "Elle a obtenu ce qu’elle est venue chercher à Larkspire et elle est revenue, ce qu’elle ne prévoyait pas. Elle va dire au joueur de ne pas s’en mêler et elle a fait quatre rues de détour pour le dire en personne.",
    // B · 3065a119f841
    "worldEvents.we_kaia_comes_back.setsFlags": ["kaia_came_back"],
    // B · 0c77943e4405
    "worldEvents.we_kaia_comes_back.requiresFlags": ["the_ledger_is_answered"],
    // B · 38fd2ee2e42f
    "worldEvents.we_the_keeper_writes.publicCopy": "Une lettre arrive de la capitale, écrite à la main plutôt que par un secrétaire, qui s’enquiert de ton Choix et de ta famille et ne mentionne rien d’autre.",
    // B · 3f9aced11509
    "worldEvents.we_the_keeper_writes.directorNotes": "Il écrit une de ces lettres par semaine et il pense chacune d’elles. Il n’y a aucune menace. C’est une invitation à se disputer avec quelqu’un qui n’a jamais perdu cet argument et qui a vraiment hâte.",
    // B · 228e3dce9197
    "worldEvents.we_the_keeper_writes.setsFlags": ["the_keeper_wrote"],
    // B · 0c77943e4405
    "worldEvents.we_the_keeper_writes.requiresFlags": ["the_ledger_is_answered"],
    // B · 09c785882027
    "worldEvents.we_the_heartstone_stutters.publicCopy": "Les lampes s’éteignent dans quatre quartiers pendant onze secondes puis se rallument, et la maison Concord a déjà du monde dans la salle avant que la plupart de la ville ait fini de se lever.",
    // B · 9cb287b9b3d0
    "worldEvents.we_the_heartstone_stutters.directorNotes": "La pierre sous Larkspire vieillit. C’est ce dont Edran a vraiment peur et la raison d’être de la garde. Personne ne l’explique. Tous ceux qui savent se taisent pendant environ une journée.",
    // B · a0bee01791f4
    "worldEvents.we_the_heartstone_stutters.setsFlags": ["la_pierre_a_tremble"],
    // B · 1ae10ae31b27
    "worldEvents.we_the_heartstone_stutters.cancelledByFlags": ["l_accord"],
    // B · cd237ad534de
    "worldEvents.we_the_heartstone_stutters.requiresFlags": ["sait :tout_le_monde_les_a"],
    // B · 7cbbcb0d3012
    "worldEvents.we_they_come_for_you.publicCopy": "Un diagnostic médical à ton nom, et un capitaine à la porte qui te dit exactement ce qui va se passer ensuite, dans l’ordre, et rien de tout ça n’est une surprise parce qu’elle avait dit que ça ne le serait pas.",
    // B · 5f9c3baf26cd
    "worldEvents.we_they_come_for_you.directorNotes": "Le système arrive pour le joueur, légalement, poliment et correctement. Ilyra déteste ça, ne fera pas semblant du contraire et le fera quand même à moins que quelque chose ne change. C’est évitable et les moyens d’empêcher ça coûtent tous quelque chose.",
    // B · 717bfd66b64f
    "worldEvents.we_they_come_for_you.setsFlags": ["ils_sont_venus_pour_toi"],
    // B · bfddb748b07f
    "worldEvents.we_they_come_for_you.cancelledByFlags": ["l_a_intégré","l_a_supprimé","l_accord","a_quitté_la_carte"],
    // B · 55d57c7ef177
    "worldEvents.we_they_come_for_you.requiresFlags": ["sait :il_y_a_quelque_chose_sous_cela"],
    // B · d77ebfcebe44
    "promises.p_your_shape.kind": "FINALE",
    // B · 9ed0aa54d0e8
    "promises.p_your_shape.label": "La forme que tu as choisie à seize ans en environ quatre-vingt-dix secondes",
    // B · 9de11fc13905
    "promises.p_your_shape.seedHint": "Une corde tressée pendant onze jours dans les couleurs que ta famille pensait que tu choisirais.",
    // B · 55cc43c6e6cf
    "promises.p_your_shape.payoffHint": "Une plaquette de cristal sous une salle avec ton nom dessus, et quatre autres formes en dessous.",
    // B · 63a719ec7f2d
    "promises.p_the_woman_with_two.kind": "RIVAL",
    // B · 41e2156d1fa3
    "promises.p_the_woman_with_two.label": "La femme qui est entrée par la fenêtre de la galerie",
    // B · 3570902e1f46
    "promises.p_the_woman_with_two.seedHint": "Des plumes noires qui remontent un avant-bras gauche sous les yeux de quatre cents personnes, et une salle qui se tait.",
    // B · 30ff646cef46
    "promises.p_the_woman_with_two.payoffHint": "Elle a sorti cinq personnes d’une avalanche et a atteint la sixième sans pouvoir bouger la poutre.",
    // B · e82d9dc4b3fa
    "promises.p_what_is_under_the_hall.kind": "MYSTÈRE",
    // B · 973f50f3bde5
    "promises.p_what_is_under_the_hall.label": "Pourquoi elle regardait le sol au lieu des portes",
    // B · 6655875ffdeb
    "promises.p_what_is_under_the_hall.seedHint": "Une grille au centre d’une salle cérémonielle que quatre cents personnes traversent chaque année.",
    // B · 49527d12d5f8
    "promises.p_what_is_under_the_hall.payoffHint": "Sept siècles d’archives, et chacune d’elles liste les formes que personne n’a choisies.",
    // B · f8b4a6708d82
    "promises.p_the_ward.kind": "THÈME",
    // B · 43172a7e524e
    "promises.p_the_ward.label": "Ce que l’institution protège vraiment",
    // B · f2753a6321c8
    "promises.p_the_ward.seedHint": "Des boissons offertes dans chaque maison Concord pour ceux de leur première année, et ils aident vraiment.",
    // B · 32997b26ef63
    "promises.p_the_ward.payoffHint": "Trente-et-une personnes dans des chambres propres et chaudes, et les lumières du couloir qui deviennent plus stables le lendemain d’une session.",
    // B · 445cd8deebc2
    "promises.p_ren.kind": "RELATION",
    // B · cd6fe47cad4c
    "promises.p_ren.label": "Ce que la pierre a offert à la personne à côté de toi",
    // B · beebfc663949
    "promises.p_ren.seedHint": "Quelqu’un sur un rail d’atterrissage Faucon à deux heures du matin avec une queue de loup sans explication.",
    // B · 12e561315ea0
    "promises.p_ren.payoffHint": "Quatre générations de gardiens Loup étaient devant et l’écho Faucon était là.",
    // B · 2394ff315ffd
    "endings.end_my_one_skin.name": "Ma Forme Unique",
    // B · c9d08ae5d876
    "endings.end_my_one_skin.rarity": "COURANTE",
    // B · 56d609996936
    "endings.end_my_one_skin.requires.flagsSet": ["installé_bien","l_histoire_a_une_forme"],
    // B · 745be8f7a498
    "endings.end_my_one_skin.requires.flagsUnset": ["a_deux","l_a_tranché"],
    // B · acd44af81572
    "endings.end_my_one_skin.condition": "Une forme, choisie à seize ans, et une vie qui lui correspond vraiment. Ce n’est pas un échec du joueur à trouver l’intrigue intéressante — c’est le résultat autour duquel tout le monde est construit et c’est un bon. Écris à quoi sert le corps, précisément, dans les choses ordinaires.",
    // A · 082ecdbfe15d
    "endings.end_my_one_skin.epilogue": "Le passage chez lui s’élargit, ou pas. Quelqu’un au marché a retenu la part sans qu’on la lui dise. Quatre ans plus tard, ce corps fait quelque chose qu’il n’imagine pas avoir choisi autrement, et environ une fois par an il repense aux formes sur la plaquette avant de changer de sujet.",
    // B · 866834cb74e5
    "endings.end_twiceborn.name": "Double Naissance",
    // B · f8b8333fe7bc
    "endings.end_twiceborn.rarity": "RARE",
    // B · 0f8b700a0a85
    "endings.end_twiceborn.requires.flagsSet": ["a_deux","l_a_intégré"],
    // B · cd3ab6f4c050
    "endings.end_twiceborn.condition": "Deux formes, intégrées lentement, sur dix-neuf pages que personne n’avait le droit d’avoir. Ne l’écris pas comme un pouvoir. Ça a pris des mois, c’était effrayant, et la personne qui l’a fait est maintenant quelque chose que la loi nomme et que la médecine ne peut soigner.",
    // A · 99a0cb908f99
    "endings.end_twiceborn.epilogue": "Le second se stabilise vers huit mois et cesse de réclamer quoi que ce soit. Ce n’est pas un déguisement ni un autre moi ; c’est un ensemble de choses que le corps peut aussi faire, et après la première année c’est à peu près aussi banal que d’être gaucher, pour lui, et pour personne d’autre à Avara.",
    // B · 920ae4c7b163
    "endings.end_the_choice_again.name": "Le Choix à Nouveau",
    // B · f8b8333fe7bc
    "endings.end_the_choice_again.rarity": "RARE",
    // B · cf82c41cf97a
    "endings.end_the_choice_again.requires.flagsSet": ["severed_it"],
    // B · 2dcf161e0e0d
    "endings.end_the_choice_again.condition": "Ils ont abandonné la forme qu’ils avaient choisie à seize ans et en ont adopté une autre. C’est l’option dont rêve tout adolescent de seize ans plein de regrets dans ce monde, presque personne ne l’a prise, et ça coûte au corps quatre semaines de désagrégation et bien plus encore à la personne.",
    // A · 54d5d5d755b7
    "endings.end_the_choice_again.epilogue": "Le cordon finit dans un tiroir plutôt qu’au feu, décision prise quatre fois avant qu’il y reste. Personne à la maison ne prononce le nom de l’ancienne forme pendant presque un an, puis quelqu’un le fait, à table, et ça passe.",
    // B · 987c5eeb3800
    "endings.end_no_more_menagerie.name": "Plus de Quartier Sept",
    // B · f8b8333fe7bc
    "endings.end_no_more_menagerie.rarity": "RARE",
    // B · 901b185c81f9
    "endings.end_no_more_menagerie.requires.flagsSet": ["the_ward_is_empty"],
    // B · aa45d5881f68
    "endings.end_no_more_menagerie.requires.flagsUnset": ["the_concord_holds"],
    // B · 044dd7a119cb
    "endings.end_no_more_menagerie.condition": "Trente-et-une personnes sont montées par cet escalier. Écris ce que ça coûte autant que ce que ça achète, parce que deux Pierres-de-Cœur sous deux villes étaient stabilisées par ce qui a été pris dans ce quartier, et l’hiver qui suit n’est bon nulle part.",
    // A · cbfdd789530a
    "endings.end_no_more_menagerie.epilogue": "Les lampes s’éteignent dans quatre quartiers d’Aurelion onze fois l’année suivante, et une fois presque toute la journée. Personne n’en meurt, c’est plus de la chance que de la prévoyance. Trente et une personnes rentrent chez elles, et onze sont accueillies à une porte par des familles qui les croyaient mortes depuis quatorze mois.",
    // B · 765c27826b2b
    "endings.end_larkspire_accord.name": "L’Accord de Larkspire",
    // B · f8b8333fe7bc
    "endings.end_larkspire_accord.rarity": "RARE",
    // B · 6b4389131235
    "endings.end_larkspire_accord.requires.flagsSet": ["the_accord","has_the_protocol"],
    // B · 41e659ff54b3
    "endings.end_larkspire_accord.condition": "Le résultat le plus dur : un modèle volontaire, construit lentement, avec l’institution plutôt que contre elle. Dix-neuf pages deviennent politique, le quartier devient un lieu d’où on peut partir, et le problème des Pierres-de-Cœur se règle au grand jour par des gens autorisés à s’en occuper. Écris le travail du comité, parce que c’est ce que c’est vraiment.",
    // A · 09d8703226fd
    "endings.end_larkspire_accord.epilogue": "Ça prend six ans et deux Gardiens. Le choix devient quelque chose qui est dit avant, en entier, y compris ce qui est scellé, ce que le tiers des familles trouve insupportable et les autres à point. Sai publie la quatrième année, sous son nom, avec les deux chiffres dans le résumé.",
    // B · ad2884cc8493
    "endings.end_unsealed.name": "Non scellé",
    // B · f7fc172f729a
    "endings.end_unsealed.rarity": "UNIQUE",
    // B · f02df4cd5854
    "endings.end_unsealed.requires.flagsSet": ["the_ledger_is_out","the_ward_is_empty"],
    // B · 9d9d8c787d4c
    "endings.end_unsealed.condition": "Le Registre est devenu public et le quartier s’est vidé, et tout l’arrangement vieux de sept cents ans s’est effondré d’un coup plutôt que doucement. Quatre cent mille adultes ont découvert en une semaine qu’ils étaient scellés sans qu’on leur demande. Écris la décennie, pas l’instant, et ne décide pas pour le lecteur si ça en valait la peine.",
    // A · 201d0ef4b068
    "endings.end_unsealed.epilogue": "La Fièvre ne revient pas, ce dont tout le monde avait peur et qu’il a fallu onze ans pour ne plus craindre. Ce qui arrive est plus bordélique et lent : une génération entière qui grandit sans que le mot « stabilisé » veuille dire quelque chose, quatre villes aux Pierres-Coeur rationnées, et une dispute qui dure toujours.",
    // B · 561b8db368d5
    "endings.end_concord_holds.name": "La Concorde tient",
    // B · c9d08ae5d876
    "endings.end_concord_holds.rarity": "COMMON",
    // B · 8a33e69a5fd2
    "endings.end_concord_holds.requires.flagsSet": ["the_concord_holds","agreed_with_edran"],
    // B · c8e52b511aa2
    "endings.end_concord_holds.condition": "Ils ont entendu tout l’argument, y compris la partie sur ce qui arrive aux villes, et ont conclu qu’il avait raison. N’écris pas ça comme une capitulation ni comme de la méchanceté. C’est un adolescent de seize ans qui fait le calcul entre trente-et-une personnes et quatre cent mille, et arrive à une conclusion défendable et terrible.",
    // A · b47f54ceb17d
    "endings.end_concord_holds.epilogue": "Rien ne change, ce qui est le but et est insupportable. Les lampes restent allumées. Les apéritifs gratuits continuent d’être servis et font vraiment effet. Un couloir sous la capitale compte trente et une personnes, et le joueur sait exactement combien et pourquoi, pour toute sa vie.",
    // B · 17559927fe07
    "endings.end_hollow.name": "Creux",
    // B · 734e45c160cf
    "endings.end_hollow.rarity": "UNCOMMON",
    // B · 8d966d79a7fd
    "endings.end_hollow.requires.flagsSet": ["severed_it","holding_it_alone"],
    // B · 2e66d139197d
    "endings.end_hollow.condition": "Ils ont abandonné la seconde forme et la première n’est pas revenue correctement, et ils vivent en Non fixé à l’âge adulte, ce que personne dans ce monde ne fait. Écris la réalité pratique — la médecine, la paperasse, la façon dont les inconnus ne savent pas où les situer — plutôt que d’en faire du tragique.",
    // A · 69e49bb5c9b4
    "endings.end_hollow.epilogue": "Il n’y a pas de mot pour ça et la Concorde en invente un, mal, pour le dossier. Les sens n’arrivent jamais tout à fait, ni ne disparaissent. En deux ans, quatre autres personnes dans Avara font la même chose et se retrouvent, ce qui n’est ni un mouvement ni rien.",
    // B · 0e55dcd08f3f
    "endings.end_kaias_road.name": "La Route de Kaia",
    // B · f8b8333fe7bc
    "endings.end_kaias_road.rarity": "RARE",
    // B · 0c77943e4405
    "endings.end_kaias_road.requires.flagsSet": ["the_ledger_is_answered"],
    // B · f7375b40bae3
    "endings.end_kaias_road.condition": "Elle a survécu, elle a arrêté de faire semblant que le Corbeau est temporaire, et tous les deux continuent — ensemble ou séparément, en collègues, avec un écart d’âge de quatre ans dont l’histoire n’a jamais fait cas. Écris ça comme du travail, pas comme de l’amitié, parce que c’est comme ça qu’elle le verrait.",
    // A · 3e8981464467
    "endings.end_kaias_road.epilogue": "Elle finit par retourner dans les montagnes, ce qui ne surprend personne qui savait ce qu’elle était avant tout ça. Il y a deux Gardiens de la Route sur les chemins du nord, sans mandats, qui viennent quand quelqu’un avec deux formes doit être ailleurs au matin.",
    // B · dcce77c8956e
    "endings.end_lio_home.name": "Lio chez lui",
    // B · f8b8333fe7bc
    "endings.end_lio_home.rarity": "RARE",
    // B · 901b185c81f9
    "endings.end_lio_home.requires.flagsSet": ["the_ward_is_empty"],
    // B · 5cdb252b2ba0
    "endings.end_lio_home.condition": "Quatre cent vingt-six jours, trente-et-une personnes, et un dix-huit ans qui ne voulait pas partir le premier. Écris l’arrivée plutôt que la fuite, et souviens-toi que sa seconde forme n’est jamais vraiment apparue, il a donc passé quatorze mois à être soigné pour quelque chose qui n’était pas là.",
    // A · b0aa53fd3438
    "endings.end_lio_home.epilogue": "Il ne cesse pas de compter les choses. Il connaît chacun des trente par leur nom et où ils sont allés, et écrit à environ onze d’entre eux. Il lui faut deux ans pour pouvoir rester dans une pièce avec la porte fermée, et sa sœur est très mauvaise pour ne pas le rappeler.",
    // B · e1ea6fabc364
    "endings.end_ren.name": "Ce que Ren a choisi",
    // B · 734e45c160cf
    "endings.end_ren.rarity": "UNCOMMON",
    // B · f011246c40cd
    "endings.end_ren.requires.flagsSet": ["knows :ren_regrets_it"],
    // B · 17a6b0da80c3
    "endings.end_ren.condition": "Ce n’est pas à propos du joueur. C’est à propos de la personne qui s’est tenue devant cette pierre sous quatre générations regardant et a pris la forme que la famille voulait. Si Loup convient ou pas est vraiment ouvert, et la fin ne doit pas le décider pour eux — le regret n’est pas la preuve que le choix était mauvais.",
    // A · 891cb9e5fce7
    "endings.end_ren.epilogue": "Ils passent l’entrée de l’académie au printemps, ce qui leur fait plaisir — ils ne s’y attendaient pas et trouvent ça un peu humiliant. Une fois par mois environ, ils vont encore fouiner sur les rails d’atterrissage, puis ils arrêtent après la quatrième année, sans pouvoir dire quand exactement.",
    // B · 0926fe783f19
    "endings.end_went_home.name": "Rentré chez soi",
    // B · c9d08ae5d876
    "endings.end_went_home.rarity": "COMMON",
    // B · 159bd50aa2e3
    "endings.end_went_home.requires.flagsSet": ["went_home","left_the_map"],
    // B · e2c7920c6816
    "endings.end_went_home.condition": "Ils sont retournés à Larkspire et avaient seize ans. Pas par peur ni par échec — ils ont vu ce qui se cachait sous la salle et sous la capitale, ont décidé que ce n’était pas à eux de réparer ça, et sont rentrés chez eux. Tout le reste dans ce monde continue sans eux et ne s’améliore pas vraiment.",
    // A · 7f54d7325a58
    "endings.end_went_home.epilogue": "La corde se dénoue à la fin de l’année comme pour tout le monde. Il y a un stand, un apprentissage ou l’académie. Environ deux fois par an, une nouvelle fait clairement partie de tout ça : ils lisent quatre lignes, puis reposent le journal. Ça devient plus facile, mais ne sera jamais facile.",
    // A · 37755187edf1
    "archetypes.arch_wolf.name": "Loup",
    // B · 8eaf131ff6bd
    "archetypes.arch_wolf.role": "Endurance et odorat",
    // A · a75c931778ca
    "archetypes.arch_wolf.summary": "En meute, verbeux et impossible à perdre. Tu entends une dispute trois étages plus bas et tu peux pas t’empêcher de l’écouter.",
    // A · 4f5400804833
    "archetypes.arch_wolf.playstyle": ["Tenace","Sociable","Sens très aiguisés"],
    // A · 15108b2d7a85
    "archetypes.arch_wolf.blurb": "Ta famille sera contente, c’est peut-être pour ça que tu l’as choisi. Tout dans ce corps veut de la compagnie et tient à continuer, dans cet ordre.",
    // A · d53e4c001732
    "archetypes.arch_leopard.name": "Panthère des neiges",
    // B · b0d194ab3c98
    "archetypes.arch_leopard.role": "Équilibre et calme",
    // A · 3e74fa75d65c
    "archetypes.arch_leopard.summary": "Froid, hauteur et silence. Tu te rends compte que tu contrôles déjà tout avant même d’avoir décidé de grimper, et que personne ne t’entend arriver, pas même ceux qui aimeraient le contraire.",
    // A · 0ac537ead996
    "archetypes.arch_leopard.playstyle": ["Discret","Grimpe tout ce qui bouge","Aime le froid"],
    // A · 0a17a7893157
    "archetypes.arch_leopard.blurb": "Une forme du Nord dans une ville du Sud. Les rails ont été conçus pour les Faucons, et tu les utiliseras dans la semaine qui vient.",
    // A · fa85477348f7
    "archetypes.arch_hawk.name": "Faucon",
    // B · 670c128f7d6e
    "archetypes.arch_hawk.role": "Vue et distance",
    // A · 6ae1016dc331
    "archetypes.arch_hawk.summary": "Des yeux qui reconnaissent un visage à quatre cents pas et un corps fait pour être ailleurs. Tout le monde va te complimenter pour la première chose, et personne ne demandera ce qu’il en est de la seconde.",
    // A · 792a2b6c4d77
    "archetypes.arch_hawk.playstyle": ["Vue perçante","Nerveux","Silhouette légère"],
    // A · 6986c306c139
    "archetypes.arch_hawk.blurb": "Les coursiers te regarderont autrement en moins d’une journée. Tout le monde aussi, et un tiers d’entre eux répètera la même phrase sur tes yeux.",
    // A · c72a2a0287e7
    "archetypes.arch_stag.name": "Cerf",
    // B · 9358e1ba8971
    "archetypes.arch_stag.role": "Présence et appui",
    // A · b0414a08daef
    "archetypes.arch_stag.summary": "Des bois, du poids, un corps autour duquel la pièce se réorganise. C’est un avantage social énorme, et un sacré problème pratique aux portes.",
    // A · 395076b7fbfc
    "archetypes.arch_stag.playstyle": ["Autoritaire","À l’aise sur ses appuis","Qui ne passe pas inaperçu"],
    // A · 65ceb1514bec
    "archetypes.arch_stag.blurb": "Personne ne manquera de te remarquer pour le reste de ta vie, ce qui est un sacré choix à seize ans.",
    // A · ebee709a299c
    "archetypes.arch_serpent.name": "Serpent",
    // B · a0abcb01b72d
    "archetypes.arch_serpent.role": "Immobilité et médecine",
    // A · 3da0d5606b3b
    "archetypes.arch_serpent.summary": "Chaleur, patience, et des sens qui captent à travers les murs et les planchers. La moitié de la ville réserve des pièces bien chaudes pour toi, l’autre moitié en est vaguement inquiète.",
    // A · 2aac16c763d3
    "archetypes.arch_serpent.playstyle": ["Sait attendre","Perçoit bien","A besoin de chaleur"],
    // A · e194f91f2d07
    "archetypes.arch_serpent.blurb": "C’est la forme qu’on associe le plus souvent aux médecins, mais c’est aussi celle dont on se tient un peu à l’écart — et ces deux choses seront vraies toute ta vie.",
    // A · 3c5e0278ddad
    "archetypes.arch_bear.name": "Ours",
    // B · af65a0cb3aa8
    "archetypes.arch_bear.role": "Poids et portée",
    // A · 8dade693803d
    "archetypes.arch_bear.summary": "Massif. Tout dans ce corps démarre lentement et une fois lancé, impossible de s’arrêter, et les commerçants te prépareront ta part sans qu’il soit besoin de demander.",
    // A · a62cf5ca287e
    "archetypes.arch_bear.playstyle": ["Puissant","Lent à bouger","Tout le monde le remarque"],
    // A · decc5f2ff704
    "archetypes.arch_bear.blurb": "Dans quatre semaines, tu ne passeras plus la porte de ta chambre et un membre de ta famille aura déjà commencé à l’élargir sans en parler.",
    // B · 7a2577b349a6
    "setupFields.displayName.label": "Qu’y a-t-il sur le cordon ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · 3e7c4d2885bb
    "setupFields.displayName.placeholder": "ex. Aven Sarel",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 3a6240a26696
    "setupFields.pronouns.placeholder": "ex. iels/iels",
    // B · acdfebc3e912
    "setupFields.archetype.label": "La pierre te montre ce dans quoi tu pourrais t’ancrer. Choisis.",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHETYPE",
    // B · 4ad10ba94160
    "setupFields.archetype.helpText": "La forme que ton corps va prendre pendant les quatre prochaines semaines, qui détermine tes sens, ta carrure, les portes adaptées à toi et comment toute cette ville te perçoit avant même que tu parles. C’est fixé pour toute l’histoire et ça reste à toi. Ça ne décide pas ce que tu feras face à ce que tu découvriras ensuite.",
    // B · fa6e8044459d
    "setupFields.worldKnowsAboutYou.label": "Qui était là devant pour toi ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · 76b324d754ca
    "setupFields.worldKnowsAboutYou.helpText": "Ta famille, ou personne, ou quelqu’un qui n’est pas de ta famille. Quoi que tu écrives, ce monde s’adapte, même si personne n’est venu.",
    // B · cd28c66f9a0e
    "setupFields.worldKnowsAboutYou.placeholder": "ex. Ma tante, qui est une Ours, et qui élargit les portes de notre maison pour les autres depuis trente ans.",
    // B · 5fc7321204d8
    "setupFields.how_far.label": "À quel point veux-tu ressembler à un animal ?",
    // B · b6a31c665c0b
    "setupFields.how_far.kind": "CHOIX",
    // B · 5e0ed415ec66
    "setupFields.how_far.helpText": "Les bêtes-gens varient énormément, c’est entièrement à toi. Ça n’a aucun effet mécanique et ça change la façon dont chaque scène te décrit.",
    // B · 94056fae5bb8
    "setupFields.how_far.options.barely.label": "À peine. Oreilles, yeux, dents, sinon rien ne change",
    // B · e5ceb4df2130
    "setupFields.how_far.options.clear.label": "Clairement. Oreilles, queue, un peu de fourrure ou d’écailles, mains différentes",
    // B · d5bccdda997e
    "setupFields.how_far.options.far.label": "Beaucoup. Carrure, jambes, museau, tout ça",
    // B · 48fc4cf8610c
    "setupFields.how_far.options.uneven.label": "De façon inégale, difficile à définir pour les autres",
    // B · cb34a9d7e5ab
    "setupFields.how_far.options.undecided.label": "Tu ne sais pas encore, ça va prendre les quatre semaines entières",
    // B · f8ed8adb5e95
    "setupFields.appearance.label": "Qu’a vu la salle s’avancer vers la pierre ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · d3e9f9c819e5
    "setupFields.appearance.placeholder": "ex. Quelqu’un en habits formels empruntés, taillés pour un corps que je n’ai pas encore.",
    // B · 3aa4328667d6
    "protagonist.kind": "VIDE",
    // A · 6a05695b3ac0
    "opening": "Tu as choisi il y a environ quatre heures. Tes mains ont déjà commencé à changer, et c’est la chose la plus étrange qui te soit jamais arrivée.\n\nLa salle contient quatre cents personnes, toutes membres d’une famille. Le Grand Gardien est à la moitié de son discours sur un cœur, une peau, une route choisie, et Ren chuchote depuis la troisième rangée, sans s’arrêter.\n\nPuis du verre entre par-dessus la galerie est.\n\nUne femme tombe de toute sa hauteur et atterrit sur un genou. Oreilles de léopard des neiges. Longue queue tachetée. Sang sur une manche, et trois Gardes de la Couronne descendent l’escalier de la galerie derrière elle.\n\nElle se relève en roulant, glisse une main dessous, et des plumes noires jaillissent le long de son avant-bras gauche.\n\nQuatre cents personnes retiennent leur souffle en même temps.",
    // A · 0b016b230581
    "openingSuggestions": ["Je ne regarde pas les plumes. Je fixe ce qu’elle regarde, parce qu’elle est entrée par une fenêtre dans une pièce avec six sorties et elle n’a posé les yeux sur aucune d’elles.","Il y a une famille à deux rangs devant moi avec un enfant. Je me lève et avance sans avoir réfléchi, je me place entre eux et le centre de la salle, et mes mains font un geste que je n’ai jamais senti faire.","Je me tourne vers Ren. « Ne fais pas ça. » J’attrape la manche d’une main, parce que je sais exactement ce qu’il s’apprête à faire, et sa famille entière est là, dans ce rang, à le regarder décider."],
  },
});
