import { registerWorldText } from '@aniplay/contracts';

/**
 * Window Seven, in French.
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
  storyId: "story_window_seven",
  text: {
    // A · 443e2967ab84
    "title": "Window Seven",
    // A · 3d976b785823
    "fantasyLabel": "Sept nuits. Une fenêtre. Elle a fait signe.",
    // A · 64d9c2926dc3
    "hook": "Sept nuits dans un appartement de surveillance avec une agente que vous n’avez jamais côtoyée, à observer une traîtresse qui vient de regarder droit dans votre caméra cachée.",
    // A · e7fd4559a107
    "premise": "Pendant sept nuits, vous êtes assis dans un appartement sombre au sixième étage d’un immeuble banal et vous observez le penthouse qui occupe tout le dernier étage de l’immeuble d’en face.\n\nLa mission suit quatre règles, qui tiennent en une ligne. Notez chaque visiteur. Rédigez votre rapport à six heures du matin. Ne quittez pas l’appartement. Ne contactez pas la femme qui habite là-bas.\n\nElle s’appelle Dr Selene Voss. C’est une chercheuse en cybernétique et conseillère politique, et le dossier que votre service détient sur elle dit qu’elle vend des données de défense au ministère depuis onze mois.\n\nVotre partenaire, Mara Ellison, a déjà fait quatre missions comme celle-ci et elle organise la nourriture du planque selon la date de péremption.\n\nIl y a une mallette noire dans la penderie. Elle est à elle. Vous ne devez pas l’ouvrir.\n\nÀ 01:16, la première nuit, Voss sort sur son balcon en chemise blanche, regarde à travers quatre voies de route vide directement dans un objectif qu’elle ne peut pas savoir, et fait signe.\n\nQuatre-vingt-dix secondes plus tard, votre combiné reçoit quatre mots d’une personne qui se fait appeler Glass.\n\nVOUS NE REGARDEZ PAS LE BON APPARTEMENT.\n\nAlors soit la cible sait exactement où vous êtes, soit quelqu’un dans votre propre service voulait que vous soyez dans cette pièce précise. Il vous reste six nuits pour comprendre laquelle, et ce service n’existe officiellement pas, donc personne ne viendra si vous vous êtes trompé.",
    // A · cae70647843a
    "mechanicsChips": ["Sept nuits au compteur","Une partenaire avec ses propres ordres","La cible sait que vous êtes là","Interrompez la mission quand vous voulez","Tout ce que vous faites est enregistré"],
    // A · ab4e167d7f82
    "creatorNote": "Deux personnes, une pièce, sept nuits, et une femme en face qui a décidé d’être vue. Vous pouvez mener l’opération exactement comme prévu et découvrir à quoi elle servait vraiment, ou décrocher le téléphone la première nuit et l’appeler. Les deux choix font partie du jeu.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE CLÉ",
    // B · bc5180eb3936
    "rules.hardCanon": ["Le joueur commence l’opération dans l’appartement 7C des Orpheum Towers avec Mara Ellison.","La mission concerne la docteure Selene Voss et dure sept nuits.","PALISADE est réel : un programme de surveillance prédictive qui identifie les dissidents probables avant qu’ils n’agissent, et la Direction Neuf l’a déployé sur le territoire.","Mara porte une autorisation scellée pour tuer Selene Voss si Selene tente de quitter Veyra avec les archives de PALISADE. Elle ne l’a pas dit au joueur.","Glass n’est pas une personne. C’est une identité de dépôt mort partagée par trois membres de la Direction.","Veyra est une cité-État moderne ordinaire. Rien de surnaturel ne s’y produit."],
    // A · 233eca1a33b7
    "rules.toneGuide": "Un ton proche, calme, précis. L’essentiel de cette histoire, ce sont deux personnes dans une pièce sombre : le bruit de l’immeuble, de la nourriture à emporter froide, un bouchon d’objectif, c’est à qui de surveiller l’appareil. Le travail d’espionnage est clair et intelligible — aucun acronyme n’apparaît sans qu’on explique ce qu’il signifie, comme on le dirait vraiment. La paranoïa vient d’incohérences concrètes que le joueur peut vérifier, jamais de l’ambiance. Quand la violence éclate, elle est rapide, proche, mal éclairée, et expédiée en quatre phrases. Personne ne fait de monologue.",
    // B · d5be1efa4178
    "skills.surveil.name": "Surveillance",
    // B · a8c1fa8269c3
    "skills.surveil.attribute": "esprit",
    // B · 70c09d4974fe
    "skills.surveil.description": "Regarder une fenêtre six heures d’affilée et remarquer les quatre minutes qui comptent.",
    // B · 725bc338a045
    "skills.tradecraft.name": "Savoir-faire",
    // B · a8c1fa8269c3
    "skills.tradecraft.attribute": "esprit",
    // B · a207a5e58efb
    "skills.tradecraft.description": "Dépôts, itinéraires, couvertures, et savoir quand quelque chose a déjà mal tourné.",
    // B · 2d61b7213705
    "skills.systems.name": "Systèmes",
    // B · a8c1fa8269c3
    "skills.systems.attribute": "esprit",
    // B · 18e053243412
    "skills.systems.description": "Caméras, combinés, interceptions, et les archives que personne n’admet exister.",
    // B · cab8efccf91a
    "skills.cover.name": "Couverture",
    // B · cfb7a15645c3
    "skills.cover.attribute": "présence",
    // B · c1cfef0767d0
    "skills.cover.description": "Être une autre personne plausible aussi longtemps que le couloir le demande.",
    // B · f5db3d3690c4
    "skills.read_people.name": "Lire les gens",
    // B · cfb7a15645c3
    "skills.read_people.attribute": "présence",
    // B · ae071e720ef5
    "skills.read_people.description": "Comprendre quelle partie de ce que quelqu’un vient de dire est la vraie.",
    // B · b92bff6d0e1d
    "skills.close_work.name": "Proximité",
    // B · 97081b4b4792
    "skills.close_work.attribute": "force",
    // B · 7c2833935d6f
    "skills.close_work.description": "Escaliers, portes, et les onze secondes avant qu’on crie.",
    // B · b7507f05e27b
    "skills.movement.name": "Déplacement",
    // B · 7ce3b6387340
    "skills.movement.attribute": "agilité",
    // B · 17a759bb1be0
    "skills.movement.description": "Toits, gaines de service, et une filature à garder.",
    // B · c56d9224ffb1
    "resources.directorate_suspicion.name": "Suspicion de la Direction",
    // B · a34adbda2422
    "resources.directorate_suspicion.polarity": "BON_FAIBLE",
    // B · 97373b498c74
    "resources.directorate_suspicion.zeroStateConsequence": "Aux yeux de la Direction Neuf, le joueur est un nom sur une liste de service qui dépose ses rapports à l’heure. Personne ne pense à lui, et c’est ce qu’il a de plus utile.",
    // B · 6a9d0f7aa30c
    "resources.directorate_suspicion.color": "#3E5C7A",
    // A · 9cc1d60cdfdb
    "items.handset.name": "Un combiné sécurisé",
    // B · 4bff0469c29c
    "items.handset.tags": ["équipement"],
    // B · 2f544085016f
    "items.handset.description": "Mat, lourd, une touche physique. Il reçoit le trafic de la Direction et, depuis 01:17 la première nuit, d’une identité appelée Glass.",
    // B · a64d4d96a2aa
    "items.handset.loreText": "Les messages de Glass n’apparaissent pas dans le journal du combiné, ce qui est le premier fait vraiment inquiétant de l’opération.",
    // B · d5511d58ae89
    "items.handset.icon": "téléphone",
    // A · c67360a76aab
    "items.long_lens.name": "Le téléobjectif",
    // B · 8abc190e5364
    "items.long_lens.tags": ["équipement","surveillance"],
    // B · 3b4423a31292
    "items.long_lens.equipSlot": "mains",
    // B · d04c22f339ce
    "items.long_lens.description": "Sur un trépied à la fente de l’occultation, pointé vers un balcon de penthouse onze étages plus haut et quatre voies plus loin. Mara a réglé la mise au point et n’aime pas qu’on la bouge.",
    // B · ac0cd8bc1e52
    "items.long_lens.icon": "appareil-photo",
    // A · 5d37f5e0b0b2
    "items.the_black_case.name": "La mallette noire",
    // B · 239b78d9d62b
    "items.the_black_case.tags": ["quête","scellé"],
    // B · 552f296cf3ad
    "items.the_black_case.description": "Dans la penderie du 7C sous deux couvertures pliées. Aluminium, sceau intact, et le seul objet de l’appartement que vous n’avez aucune raison de toucher.",
    // B · b9596692b450
    "items.the_black_case.loreText": "Équipement de secours et une enveloppe scellée avec contre-signature. L’enveloppe est à Mara et l’équipement sert à ce que l’enveloppe autorise.",
    // B · 909ac0144b71
    "items.the_black_case.icon": "mallette",
    // A · 527ac46da22f
    "items.palisade_drive.name": "L’Archive PALISADE",
    // B · 5507006b04e5
    "items.palisade_drive.tags": ["quête","données"],
    // B · 85057ef6d682
    "items.palisade_drive.description": "Quatre cent mille personnes dans une ville de deux millions, notées selon leur probabilité de poser problème, mise à jour toutes les heures. Ça tient dans une poche de manteau.",
    // B · 84325fc943da
    "items.palisade_drive.loreText": "Selene a créé le modèle de notation. Elle n’a pas créé le déploiement, et elle a les mémos qui prouvent la différence.",
    // B · bfc2f23ba08b
    "items.palisade_drive.icon": "drive",
    // A · abd5fd2043e6
    "items.juno_log.name": "Le Journal d’Accès à l’Immeuble",
    // B · 061625d9bd60
    "items.juno_log.tags": ["quête","document"],
    // B · 09f165d015e6
    "items.juno_log.description": "Neuf semaines de tous les passages de carte dans ton propre immeuble, imprimées sur l’imprimante du concierge et vendues à un prix que Juno considère comme un service. Il garde aussi celles de l’immeuble d’en face, parce que les deux conciergeries échangent.",
    // B · b2f720f3c3b9
    "items.juno_log.loreText": "Deux des entrées appartiennent à un badge de la Direction qui n’a rien à faire dans cet immeuble.",
    // B · 8143e9e47c18
    "items.juno_log.icon": "papers",
    // A · e8bf1434cf71
    "items.burner_set.name": "Un Jeu de Téléphones Jetables",
    // B · 4bff0469c29c
    "items.burner_set.tags": ["kit"],
    // B · 483813a37713
    "items.burner_set.description": "Trois d’entre eux dans un sac de supermarché dans le tiroir de la cuisine, encore sous blister, achetés dans trois quartiers différents.",
    // B · 9313263584df
    "items.burner_set.icon": "burner",
    // A · f9bf96719567
    "items.voss_memoranda.name": "Les Notes de Voss",
    // B · 061625d9bd60
    "items.voss_memoranda.tags": ["quête","document"],
    // B · a84bbfec3ffc
    "items.voss_memoranda.description": "Quatorze mois où Selene a fait remonter le déploiement domestique en interne, par écrit, et s’est fait dire par écrit d’arrêter.",
    // B · 79046e295304
    "items.voss_memoranda.loreText": "Le dernier est contresigné par Halden. C’est la raison pour laquelle l’enquête sur la fuite existe.",
    // B · bfdde6f5651a
    "items.voss_memoranda.icon": "file",
    // A · 0855784afeb1
    "abilities.work_the_glass.name": "Surveiller la Fenêtre",
    // B · a49c68ce2271
    "abilities.work_the_glass.tags": ["vue","surveillance"],
    // B · 409a95706e04
    "abilities.work_the_glass.description": "Prends l’objectif et regarde vraiment, aussi longtemps qu’il faut pour voir ce qui est différent ce soir.",
    // B · 39d896e20aec
    "abilities.work_the_glass.targetRule": "SINGLE",
    // B · a8c1fa8269c3
    "abilities.work_the_glass.check.attribute": "esprit",
    // A · ff395dc61935
    "abilities.file_the_report.name": "Rendre le Rapport",
    // B · 5251d369d3b6
    "abilities.file_the_report.tags": ["utilitaire"],
    // B · 55f9983a95b0
    "abilities.file_the_report.description": "Envoie le rapport de 06:00. Ce qui y entre, ce qui n’y entre pas, et ce qui est formulé avec soin, c’est entièrement le joueur qui décide.",
    // B · c44e6dd70059
    "abilities.file_the_report.targetRule": "NONE",
    // B · a8c1fa8269c3
    "abilities.file_the_report.check.attribute": "esprit",
    // A · 5ead54363529
    "abilities.make_contact.name": "Prendre Contact",
    // B · 09b907576d49
    "abilities.make_contact.tags": ["social"],
    // B · 7ac4fbc8fbb3
    "abilities.make_contact.description": "Brise l’ordre unique dont le briefing a insisté, et parle à la cible.",
    // B · 39d896e20aec
    "abilities.make_contact.targetRule": "SINGLE",
    // B · cfb7a15645c3
    "abilities.make_contact.check.attribute": "présence",
    // A · c21d69d8451e
    "abilities.open_the_case.name": "Ouvrir la Mallette",
    // B · 5251d369d3b6
    "abilities.open_the_case.tags": ["utilitaire"],
    // B · 4970aaa837d5
    "abilities.open_the_case.description": "Brise un sceau qui enregistre l’heure à laquelle il a été brisé.",
    // B · 39d896e20aec
    "abilities.open_the_case.targetRule": "SINGLE",
    // B · 7ce3b6387340
    "abilities.open_the_case.check.attribute": "agilité",
    // A · 4e0f8b363503
    "abilities.sweep_the_flat.name": "Balayage",
    // B · c2bd69575dc2
    "abilities.sweep_the_flat.tags": ["vue","utilitaire"],
    // B · 630d563e77f1
    "abilities.sweep_the_flat.description": "Découvre si la pièce où tu te caches est aussi écoutée.",
    // B · 503eb62e7676
    "abilities.sweep_the_flat.targetRule": "AREA",
    // B · a8c1fa8269c3
    "abilities.sweep_the_flat.check.attribute": "esprit",
    // A · 3adde7b0f34f
    "abilities.run_a_tail.name": "Suivre une Cible",
    // B · 2e74bfc33328
    "abilities.run_a_tail.tags": ["mouvement"],
    // B · 5923978e8aee
    "abilities.run_a_tail.description": "Sors de l’appartement et suis quelqu’un, ou perds quelqu’un, sur quatre voies et une ligne de tram.",
    // B · 39d896e20aec
    "abilities.run_a_tail.targetRule": "SINGLE",
    // B · 7ce3b6387340
    "abilities.run_a_tail.check.attribute": "agilité",
    // A · 9896bda7ea91
    "abilities.put_it_to_her.name": "Confronter",
    // B · 09b907576d49
    "abilities.put_it_to_her.tags": ["social"],
    // B · e1a371e7b76a
    "abilities.put_it_to_her.description": "Arrête de tourner autour du pot avec Mara Ellison et pose-lui la question directement, dans une pièce dont elle ne peut pas sortir.",
    // B · 39d896e20aec
    "abilities.put_it_to_her.targetRule": "SINGLE",
    // B · cfb7a15645c3
    "abilities.put_it_to_her.check.attribute": "présence",
    // A · 67248d4dfb00
    "abilities.burn_the_archive.name": "Brûler les archives",
    // B · 54edc4e04f95
    "abilities.burn_the_archive.tags": ["offensif","utilitaire"],
    // B · 89f94e30b74d
    "abilities.burn_the_archive.description": "Détruis les archives plutôt que de les déplacer, ce que personne dans cette histoire ne veut et que plusieurs personnes tueraient pour empêcher.",
    // B · 39d896e20aec
    "abilities.burn_the_archive.targetRule": "SINGLE",
    // B · a8c1fa8269c3
    "abilities.burn_the_archive.check.attribute": "esprit",
    // B · e619653cde31
    "abilities.burn_the_archive.requires.flagsSet": ["sait :palisade"],
    // B · 963b2381d56a
    "abilities.burn_the_archive.requires.lockedCopy": "Tu ne peux pas détruire une archive que tu n’as pas trouvée. Pour l’instant, PALISADE est un mot que deux personnes t’ont dit et aucune n’a rien écrit.",
    // A · 2d3b0f29de89
    "abilities.publish_it.name": "Publier",
    // B · f0af660f46a4
    "abilities.publish_it.tags": ["social","utilitaire"],
    // B · 56ec53c1b3f1
    "abilities.publish_it.description": "Donne PALISADE à quelqu’un qui imprime des choses, et fais-en un problème permanent pour tout le monde.",
    // B · c44e6dd70059
    "abilities.publish_it.targetRule": "NONE",
    // B · cfb7a15645c3
    "abilities.publish_it.check.attribute": "présence",
    // B · e619653cde31
    "abilities.publish_it.requires.flagsSet": ["sait :palisade"],
    // B · a510759a9307
    "abilities.publish_it.requires.lockedCopy": "Personne n’imprime une accusation. Ils impriment un document, et tu n’en as pas encore reçu.",
    // A · caefb8a0b9a2
    "locations.apt_7c.name": "Appartement 7C",
    // A · 69abb98e672a
    "locations.apt_7c.shortName": "7C",
    // B · d944ee9a6478
    "locations.apt_7c.description": "Toutes les fenêtres sont noires sauf une, avec une fente de la largeur d’un objectif. Un trépied, deux chaises pliantes, une bouilloire, et de la nourriture organisée par date de péremption dans un placard que personne n’a demandé à Mara d’organiser.",
    // B · 1e2bcea526fa
    "locations.apt_7c.stageImage": "story_window_seven/stage_apt_7c",
    // A · 8c26221e494e
    "locations.orpheum_corridor.name": "Septième étage",
    // A · cc7ad30d94cb
    "locations.orpheum_corridor.shortName": "7e étage",
    // B · 39a420dafcaa
    "locations.orpheum_corridor.description": "Un tapis qui absorbe le son, onze portes, et une gaine technique au bout avec une serrure déjà crochettée. Personne à cet étage ne vous a jamais vus.",
    // B · 998906c42672
    "locations.orpheum_corridor.stageImage": "story_window_seven/stage_orpheum_corridor",
    // A · 842593fb87f8
    "locations.orpheum_lobby.name": "Hall de l’Orpheum",
    // A · 7a38753b5ce3
    "locations.orpheum_lobby.shortName": "Hall",
    // B · 1d11211bec38
    "locations.orpheum_lobby.description": "Du marbre, un bureau, et Juno Vale derrière à chaque heure où quelqu’un a jamais vérifié. Deux ascenseurs, une salle de colis, et une imprimante qu’il ne doit pas utiliser pour autre chose que des colis.",
    // B · 102124639c89
    "locations.orpheum_lobby.stageImage": "story_window_seven/stage_orpheum_lobby",
    // A · 65c20e3cf5f2
    "locations.the_avenue.name": "avenue Kellis",
    // A · aa2f6a63cfea
    "locations.the_avenue.shortName": "L’Avenue",
    // B · c821dbc12314
    "locations.the_avenue.description": "Quatre voies, une ligne de tram au milieu, et onze étages de verre en face. À trois heures du matin, c’est la rue la plus vide de Veyra et l’endroit le plus facile de la ville pour être photographié.",
    // B · 9acccdf1fbc3
    "locations.the_avenue.stageImage": "story_window_seven/stage_the_avenue",
    // A · 982ab8e363cb
    "locations.voss_tower.name": "Le Bâtiment Lointain",
    // A · 864c11de136d
    "locations.voss_tower.shortName": "Tour Voss",
    // B · 5533378277c2
    "locations.voss_tower.description": "Plus récent que l’Orpheum et mieux équipé. Un portier qui travaille en service, une entrée de service au nord, et un escalier de secours avec alarme à tous les étages sauf le onzième.",
    // B · fcdd70ba5ed9
    "locations.voss_tower.stageImage": "story_window_seven/stage_voss_tower",
    // A · 5a0598a678b5
    "locations.voss_penthouse.name": "Le Penthouse",
    // A · 22ea16095821
    "locations.voss_penthouse.shortName": "Penthouse",
    // B · 3bd711785bbf
    "locations.voss_penthouse.description": "À onze étages, avec toute l’avenue dans une fenêtre. Des livres en trois langues, un piano à queue que personne ne joue, et un balcon où, à 01:16, une femme en chemise blanche a fait signe à un objectif qu’elle n’aurait pas dû voir.",
    // B · d320e027a2a0
    "locations.voss_penthouse.stageImage": "story_window_seven/stage_voss_penthouse",
    // A · 000a639e05d4
    "locations.orpheum_roof.name": "Le Toit de l’Orpheum",
    // A · 7c6759bd7ffc
    "locations.orpheum_roof.shortName": "Le Toit",
    // B · 09b0df8d6343
    "locations.orpheum_roof.description": "Machinerie, un parapet, et une ligne de vue sur le penthouse que l’appartement n’a pas. C’est aussi le seul endroit de l’opération où vous pouvez parler sans que l’appartement entende.",
    // B · 343eed816c99
    "locations.orpheum_roof.stageImage": "story_window_seven/stage_orpheum_roof",
    // A · 8bf12f568a80
    "locations.the_subway.name": "Quai de la rue Halberd",
    // A · d8f0415d6f00
    "locations.the_subway.shortName": "Le Quai",
    // B · 44d1d8942175
    "locations.the_subway.description": "Deux lignes, quatre sorties, et un service toutes les onze minutes jusqu’à une heure du matin. Le meilleur endroit de Veyra pour perdre quelqu’un, c’est pour ça que tout le monde l’utilise et qu’il est surveillé.",
    // B · e8d4c7db4880
    "locations.the_subway.stageImage": "story_window_seven/stage_the_subway",
    // A · f07d79e5b6c7
    "locations.riverside.name": "Le Bord de l’Eau",
    // A · 9d92eba99534
    "locations.riverside.shortName": "Bords de Seine",
    // B · 4aead6f95952
    "locations.riverside.description": "Anciens quais transformés en rien de spécial, un pont piéton, et le troisième bollard depuis l’est avec une cavité derrière la plaque. Glass l’utilise. Et apparemment, quelqu’un d’autre aussi.",
    // B · 1e41134453eb
    "locations.riverside.stageImage": "story_window_seven/stage_riverside",
    // A · a8d9ec6dac7a
    "locations.directorate.name": "Direction Neuf",
    // A · 37c84ea0e45b
    "locations.directorate.shortName": "Le Bureau",
    // B · dfceb6bea2e8
    "locations.directorate.description": "Deux étages sous un bâtiment qui est légalement une agence d’archives. Le bureau de Halden n’a pas de fenêtre et une chaise placée pour que celui qui s’y assied fasse face à la porte.",
    // B · f5245845e4d9
    "locations.directorate.stageImage": "story_window_seven/stage_directorate",
    // B · 349222a6ed42
    "characters.mara.name": "Mara Ellison",
    // A · 30437c48963a
    "characters.mara.role": "Ton partenaire pour sept nuits. Quatre opérations longue durée, zéro échec officiel",
    // A · 47a08cf97e5b
    "characters.mara.cardBlurb": "Elle a fait ça jusqu’à ce que ça cesse de l’intéresser, et elle gèrera l’appart, le planning et toi, sauf si tu lui donnes une raison de ne pas le faire. Elle a aussi sur elle un ordre scellé dont elle n’a jamais parlé.",
    // B · aee35f364a88
    "characters.mara.pronouns": "elle",
    // A · ffff7ff59e79
    "characters.mara.publicTraits": ["Sèche","Extrêmement observatrice","Allergique à l’improvisation"],
    // B · a9a7c40d5b5c
    "characters.mara.hiddenDrives": ["Elle veut assez de levier pour quitter le travail de terrain en choisissant, pas en étant retirée."],
    // B · e1fd438ee737
    "characters.mara.values": ["Bien faire les choses","Que tout le monde s’en sorte"],
    // B · 725f676632e1
    "characters.mara.fears": ["Être responsable de la mort d’un autre partenaire"],
    // A · 613597fa7335
    "characters.mara.socialStyle": "Annoncer d’abord ce qui concerne l’opération, puis la partie humaine six heures plus tard, généralement vers quatre heures du matin.",
    // B · 15dbcd1b7422
    "characters.mara.boundaries": ["Ne se tiendra pas devant la vitre","Ne parlera pas de Sandrine"],
    // B · f023eedaa653
    "characters.mara.goals": ["Tenir sept nuits sans accroc","Découvrir à quoi sert vraiment l’opération avant qu’elle ne se termine"],
    // B · abc68b81f8eb
    "characters.mara.secrets.mara_contingency.fact": "L’enveloppe dans la mallette noire est une autorisation de secours avec sa contre-signature. Si Voss tente de quitter Veyra avec l’archive, Mara est autorisée à la tuer.",
    // B · 47558a04be8d
    "characters.mara.secrets.mara_contingency.visibility": "NPC_PRIVATE",
    // B · 48fcb51a042e
    "characters.mara.secrets.mara_contingency.revealHint": "Elle le dit elle-même au joueur sur le toit, une fois qu’elle a décidé qu’ils ne vont pas le déposer, et pas une heure avant.",
    // B · fccf61499899
    "characters.mara.secrets.mara_sandrine.fact": "Sa dernière partenaire, Sandrine Achterberg, est morte dans une cage d’escalier du quartier ministériel parce que Mara a suivi un ordre qu’elle savait déjà faux.",
    // B · 47558a04be8d
    "characters.mara.secrets.mara_sandrine.visibility": "NPC_PRIVATE",
    // B · 5171e87f4f0e
    "characters.mara.secrets.mara_sandrine.revealHint": "Seulement après que le joueur a désobéi devant elle et que ça a marché.",
    // A · 2e059787ba84
    "characters.mara.speechStyle": "Déclarations courtes. Presque pas de mots inutiles. Drôle en privé et uniquement en privé — ses blagues sont sèches, arrivent en décalé, jamais répétées.",
    // A · 9bcd28a44672
    "characters.mara.topics": ["l’opération","la valise noire","Selene Voss","le directeur Halden","son dernier partenaire","à qui le tour de se charger du verre"],
    // A · ec53557e9a03
    "characters.mara.voiceSamples": ["Verrouille la porte. Et reste pas devant la vitre.","Elle a fait signe. Note qu’elle a fait signe, à 01:16, on décidera plus tard de ce que ça veut dire.","J’en ai fait quatre. Deux étaient chiantes. Tu veux que celle-ci soit chiant.","C’est la troisième nuit que la même voiture est sur l’avenue et les plaques sont consécutives. Quelqu’un les a achetées d’un coup."],
    // B · 0f8d9f9300f0
    "characters.mara.appearance": "Vingt-sept ans, cheveux châtain foncé coupés au niveau de la mâchoire, yeux gris-vert, mince, col roulé noir ajusté et une veste discrète qu’elle ne retire jamais à l’intérieur.",
    // B · 639bf3009cfb
    "characters.mara.visualHook": "Un carré châtain à la mâchoire qu’elle remet derrière une oreille avant de dire quoi que ce soit de difficile.",
    // B · 3ef91c61306e
    "characters.mara.silhouette": "Assise, coudes sur les genoux, une épaule tournée vers la fenêtre et jamais face à elle.",
    // B · 293d2817b4d3
    "characters.mara.artSeed": "window7-mara-01",
    // B · 817165952550
    "characters.mara.portrait": "story_window_seven/mara",
    // B · 0d70c38ad7c1
    "characters.mara.expressions": ["neutre","amusée","alarmée","épuisée"],
    // B · 801f0ca0d355
    "characters.mara.knowledgeScope": ["direction","l_opération","apt_7c","palisade","veyra","la_mallette"],
    // B · 84b755c449d4
    "characters.mara.gates.mara_talks.label": "Elle te dit ce qu’elle pense vraiment du briefing",
    // B · 55a54e80451a
    "characters.mara.gates.mara_talks.kind": "CONFIANCE",
    // B · 74561bd8715c
    "characters.mara.gates.mara_shows_the_order.label": "Elle te montre l’enveloppe",
    // B · 55a54e80451a
    "characters.mara.gates.mara_shows_the_order.kind": "CONFIANCE",
    // B · e619653cde31
    "characters.mara.gates.mara_shows_the_order.requires.flagsSet": ["sait :palisade"],
    // B · 03d60fd072f4
    "characters.mara.gates.mara_romance.label": "Quoi que ce soit, ça cesse d’être professionnel",
    // B · 0b75bc536447
    "characters.mara.gates.mara_romance.kind": "ROMANCE",
    // B · 9b2d19230ea2
    "characters.mara.combatant.tags": ["entraînée","armé"],
    // B · 5880327d0579
    "characters.selene.name": "Dr Selene Voss",
    // A · c68667710db1
    "characters.selene.role": "La cible. Chercheuse en cybernétique, conseillère politique, et la personne qui a construit ce qu’elle veut détruire.",
    // A · fce23e4b1414
    "characters.selene.cardBlurb": "Elle a fait signe à une caméra dont elle ne pouvait pas savoir qu’elle existait, et chaque conversation depuis est plus agréable pour elle que pour toi.",
    // B · aee35f364a88
    "characters.selene.pronouns": "elle",
    // A · bc9a85998e5e
    "characters.selene.publicTraits": ["Précise","Maîtrise totale","Légèrement amusée"],
    // B · 3e7bf2ae1711
    "characters.selene.hiddenDrives": ["Elle essaie de faire de ce dont elle est la plus fière ce dont on se souviendra comme de ce qu’elle a stoppé"],
    // B · ec8ca37907f3
    "characters.selene.values": ["Les preuves avant les accusations","Finir ce qu’elle a commencé"],
    // B · 869e04ab8013
    "characters.selene.fears": ["Que l’archive lui survive et soit utilisée par quelqu’un avec moins de scrupules"],
    // A · 19b166953916
    "characters.selene.socialStyle": "Elle répond à une question que tu n’as pas posée, juste, et attend que tu réalises laquelle c’était.",
    // B · d2ed73b87040
    "characters.selene.boundaries": ["Ne remettra pas l’archive sans savoir où elle va","Ne fuira pas sans les mémos"],
    // B · 60c25b5af157
    "characters.selene.goals": ["Sortir PALISADE et la piste papier de Veyra ensemble","Découvrir laquelle des trois identités Glass la vend"],
    // B · 651f797155d0
    "characters.selene.secrets.selene_knows_you.fact": "Elle avait l’historique de service du joueur quatre jours avant le début de l’opération. Elle sait quelles missions précédentes ont mal tourné et pourquoi.",
    // B · 47558a04be8d
    "characters.selene.secrets.selene_knows_you.visibility": "NPC_PRIVATE",
    // B · 90dd02d87557
    "characters.selene.secrets.selene_knows_you.revealHint": "Elle le dit légèrement, par courtoisie, la première fois que le joueur essaie d’établir qui il est.",
    // B · 6f3bead254a2
    "characters.selene.secrets.selene_built_it.fact": "Elle a construit le modèle de scoring qui est devenu PALISADE, elle en était fière, et elle le dit sans détour.",
    // B · 47558a04be8d
    "characters.selene.secrets.selene_built_it.visibility": "NPC_PRIVATE",
    // B · e45b86461ed7
    "characters.selene.secrets.selene_built_it.revealHint": "Elle le dit d’elle-même tôt, si le joueur est honnête avec elle — c’est la partie dont elle refuse de se cacher.",
    // A · a94ab09a3c19
    "characters.selene.speechStyle": "Précise et posée. Des phrases complètes, un humour sec et discret, avec l’habitude de commencer par la précision pour finir sur l’essentiel.",
    // A · c9385e7152a2
    "characters.selene.topics": ["PALISADE","le ministère","le directeur Halden","pourquoi elle a fait signe","Glass","ce qu’elle a construit"],
    // A · a34f3b358885
    "characters.selene.voiceSamples": ["Tu es dans cet appartement depuis deux jours. Je suppose que c’est la grande qui a rangé le placard.","Oui, c’est moi qui l’ai construite. Je tiens à ce que ce soit clair avant qu’on te dise le contraire.","Pose-moi la question pour laquelle tu as été envoyé. Je vais y répondre correctement, puis te montrer pourquoi c’est la mauvaise question.","Il y a un ascenseur sur le côté nord que le portier ne surveille plus après deux heures. Je te le signale par politesse."],
    // B · 2dcd51bc9cb3
    "characters.selene.appearance": "Trente ans, cheveux blond argentés portés courts et raides, chemises blanches, manteaux sombres, le calme de quelqu’un qui a décidé de ne pas se presser.",
    // B · 798755d0e7a4
    "characters.selene.visualHook": "Cheveux blond argenté et chemise blanche simple, portée à toute heure, même sur un balcon à une heure du matin.",
    // B · 0e9b8de20f8a
    "characters.selene.silhouette": "Droit et posé, une main sur la rambarde du balcon, entièrement éclairée par derrière.",
    // B · 2c72aa14e516
    "characters.selene.artSeed": "window7-selene-01",
    // B · 3c4a90275b03
    "characters.selene.portrait": "story_window_seven/selene",
    // B · 8704029bb41e
    "characters.selene.expressions": ["neutre","amusée","directe","effrayée"],
    // B · 68aec4031fe2
    "characters.selene.knowledgeScope": ["palisade","le_ministère","direction","glass","veyra","l_opération"],
    // B · 8a314b16a320
    "characters.selene.gates.selene_talks.label": "Elle vous explique ce qu’est vraiment PALISADE",
    // B · 55a54e80451a
    "characters.selene.gates.selene_talks.kind": "CONFIANCE",
    // B · c42191ce1e8a
    "characters.selene.gates.selene_talks.requires.flagsSet": ["contact_établi"],
    // B · 8e287e77b214
    "characters.selene.gates.selene_trusts_you.label": "Elle vous laisse accéder aux archives",
    // B · 9e8ae18bf8bf
    "characters.selene.gates.selene_trusts_you.kind": "ALLIANCE",
    // B · f36ae25ede65
    "characters.selene.gates.selene_trusts_you.requires.hasItems": ["voss_mémorandums"],
    // B · 8892751daa9f
    "characters.selene.gates.selene_romance.label": "Elle cesse de vous voir comme un simple atout",
    // B · 0b75bc536447
    "characters.selene.gates.selene_romance.kind": "ROMANCE",
    // B · 8d234559d531
    "characters.selene.combatant.tags": ["civil"],
    // B · e5836fe92ee6
    "characters.halden.name": "Directeur Elias Halden",
    // A · a78617241fd5
    "characters.halden.role": "Ton contact. Vingt-neuf ans dans le service, tous niables.",
    // A · 66c626eb4f70
    "characters.halden.cardBlurb": "Il prend des nouvelles de ta santé et le pense vraiment, il archive tout ce que tu dis dans la même conversation, et il ne t’a jamais crié dessus. C’est aussi lui qui a validé ce que tu dois surveiller.",
    // B · fcca6b746d0b
    "characters.halden.pronouns": "il/lui",
    // A · 1f0498fc69f9
    "characters.halden.publicTraits": ["Paternal","D’une patience infinie","Jamais menaçant ouvertement"],
    // B · eee62031c98b
    "characters.halden.hiddenDrives": ["Il croit avoir évité onze morts grâce à PALISADE et ne peut jamais le dire à personne"],
    // B · 9334f92ce7f0
    "characters.halden.values": ["Le service","Les résultats avant le principe"],
    // B · 5561c12822ea
    "characters.halden.fears": ["Une enquête publique avec sa signature sur les pièces à conviction"],
    // A · 0f5a07d2576e
    "characters.halden.socialStyle": "Demande des nouvelles de ta santé, le fait sincèrement, et garde tout ce que tu dis dans la même conversation.",
    // B · de8b38ccc0a2
    "characters.halden.boundaries": ["Ne mettra jamais un ordre par écrit","Ne se laisse pas presser au téléphone"],
    // B · 016465414c1f
    "characters.halden.goals": ["Limiter PALISADE","Identifier tous les collaborateurs internes, y compris le joueur si c’en est un"],
    // B · 2dcebef4ec83
    "characters.halden.secrets.halden_signed.fact": "Il a contresigné le mémorandum autorisant le déploiement intérieur. Son nom figure sur le dernier des quatorze mois de correspondance que Selene a gardée.",
    // B · 47558a04be8d
    "characters.halden.secrets.halden_signed.visibility": "NPC_PRIVÉ",
    // B · 8d3eee8d0b07
    "characters.halden.secrets.halden_signed.revealHint": "Le joueur le lit dans les mémorandums avant qu’il ne le dise jamais.",
    // B · f299387f7afc
    "characters.halden.secrets.halden_the_purge.fact": "L’opération n’est pas une mission de surveillance. C’est un test : Selene est un appât, et ce qu’il surveille, c’est qui, parmi ses propres gens, lui parle.",
    // B · 47558a04be8d
    "characters.halden.secrets.halden_the_purge.visibility": "NPC_PRIVÉ",
    // B · b1ca5938f58a
    "characters.halden.secrets.halden_the_purge.revealHint": "Il l’admet presque chaleureusement, une fois que le joueur est de l’autre côté de l’avenue et qu’il le sait déjà.",
    // A · 4b2db0cd7465
    "characters.halden.speechStyle": "Chaleureux, posé, paternel. Ses phrases accumulent trois ou quatre propositions rassurantes, puis s’arrêtent net sur une petite question qu’il veut vraiment que tu lui répondes. La question est tout l’appel ; tout ce qui la précède n’est que remplissage.",
    // A · 1e129da4dd9f
    "characters.halden.topics": ["l’opération","tes rapports","Mara Ellison","Selene Voss","le service"],
    // A · 1df82b63c9cd
    "characters.halden.voiceSamples": ["Je retourne l’histoire du balcon depuis mardi, et les quatre heures entre ça et ton rapport, et j’en conclus que ça ne veut rien dire du tout. Qu’est-ce qu’il y a dans la valise ?","Il y a une version de cette semaine où tout le monde rentre chez soi, et une version où j’écris à la mère de quelqu’un, et la différence tient à environ quatre phrases de ta part. Laquelle tu me donnes ?","Ellison est très bonne, jamais une fois elle ne m’a fait douter d’elle, et elle porte quelque chose que je préfère que tu entendes de ma bouche plutôt que de trouver dans une armoire. Tu vas l’ouvrir ?","Personne n’a d’emmerdes. Voilà une phrase que j’ai le droit de dire maintenant."],
    // B · cf4b283294ff
    "characters.halden.appearance": "Soixante-et-un ans, cheveux gris, bien entretenu, cardigan sous une veste de costume, lunettes de lecture posées sur le nez et jamais utilisées.",
    // B · caca1015a97e
    "characters.halden.visualHook": "Un cardigan porté sous une veste de costume, dans un bureau sans fenêtre.",
    // B · 54a4203ad728
    "characters.halden.silhouette": "Assis, mains croisées sur un bureau nu, complètement immobile.",
    // B · d52f87d85420
    "characters.halden.artSeed": "window7-halden-01",
    // B · 3888313b9f6d
    "characters.halden.portrait": "story_window_seven/halden",
    // B · 84fd7e7dc0c4
    "characters.halden.expressions": ["neutre","chaleureux","froid"],
    // B · 4c96109ac6f0
    "characters.halden.knowledgeScope": ["direction","palisade","l_opération","glass","veyra"],
    // B · 477b2afe97da
    "characters.halden.gates.halden_says_it.label": "Il vous explique à quoi sert vraiment l’opération",
    // B · 55a54e80451a
    "characters.halden.gates.halden_says_it.kind": "CONFIANCE",
    // B · e619653cde31
    "characters.halden.gates.halden_says_it.requires.flagsSet": ["sait :palisade"],
    // B · 9d8cabdd85cf
    "characters.halden.combatant.tags": ["civil","armé"],
    // B · 1fe89a1b49b4
    "characters.juno.name": "Juno Vale",
    // A · 0508d7380524
    "characters.juno.role": "Concierge de la tour Orpheum, et la seule personne de cette avenue qui connaît les affaires de tout le monde",
    // A · 22c699097b6f
    "characters.juno.cardBlurb": "Il tient l’accueil, la porte, les colis et les registres d’accès, et il te vendra tout ça à un prix qu’il juge très raisonnable.",
    // B · fcca6b746d0b
    "characters.juno.pronouns": "il/lui",
    // A · 32321e6068a2
    "characters.juno.publicTraits": ["Charmant","Marchand d’affaires joyeux","Ne perd jamais une tête"],
    // B · bc41af2ea6ad
    "characters.juno.hiddenDrives": ["Il vend aux deux camps parce qu’il a compris qu’être utile à un seul, c’est comme finir au fond d’une rivière"],
    // B · d5e52d90a644
    "characters.juno.values": ["Être payé","Que tout le monde reste calme"],
    // B · aaa84bbb9a3b
    "characters.juno.fears": ["Être le seul à savoir quelque chose"],
    // A · ecb2e7b725f6
    "characters.juno.socialStyle": "Te salue comme un habitué dès la première nuit, et facture en conséquence.",
    // B · 285020c80671
    "characters.juno.boundaries": ["Ne laisser personne passer par l’ascenseur du penthouse","Ne pas mentir à un policier"],
    // B · 8fa0310ead05
    "characters.juno.goals": ["Vendre la même information trois fois","Être ailleurs quand ça arrive"],
    // B · 080bdf4ccdb0
    "characters.juno.secrets.juno_two_sides.fact": "Il a vendu les journaux d’accès de l’Orpheum à la sécurité interne de la Direction ainsi qu’au joueur, et la copie de la Direction remonte neuf semaines plus loin.",
    // B · 47558a04be8d
    "characters.juno.secrets.juno_two_sides.visibility": "NPC_PRIVATE",
    // B · 5265d48a1755
    "characters.juno.secrets.juno_two_sides.revealHint": "Il le dit joyeusement dès que le joueur offre plus que l’autre acheteur.",
    // A · 878a0d5714b0
    "characters.juno.speechStyle": "Rapide, chaleureux, commercial. Il met un prix en fin de phrase comme une ponctuation.",
    // A · ad9f7e976361
    "characters.juno.topics": ["l’immeuble","les allées et venues","l’ascenseur du penthouse","les registres d’accès","les autres personnes qui demandent"],
    // A · c15a2946e831
    "characters.juno.voiceSamples": ["Septième étage. Tranquille là-haut. Vous êtes deux, c’est ça ? Deux.","Je peux te dégoter neuf semaines de passages. Onze, c’est possible aussi, mais là c’est une autre histoire.","Tu es la troisième personne à me poser des questions sur cet ascenseur ce mois-ci, et les deux autres étaient beaucoup mieux habillées."],
    // B · 98d2af5779f9
    "characters.juno.appearance": "Quarante-quatre ans, impeccable dans un uniforme d’immeuble qu’il a fait reprendre, un stylo derrière une oreille qu’il n’utilise jamais.",
    // B · 5aa6c7a4b0bd
    "characters.juno.visualHook": "Un stylo glissé derrière une oreille qui ne sort jamais.",
    // B · 81838b6ad01b
    "characters.juno.silhouette": "Appuyé sur un bureau en marbre, les deux avant-bras posés, toujours en plein milieu d’une phrase.",
    // B · d4bf7c3775ff
    "characters.juno.artSeed": "window7-juno-01",
    // B · 336e2f5a0ca4
    "characters.juno.portrait": "story_window_seven/juno",
    // B · e18c069e1849
    "characters.juno.expressions": ["neutre","ravi","nerveux"],
    // B · be8a6ab2efe3
    "characters.juno.knowledgeScope": ["orpheum","veyra","the_avenue","the_operation"],
    // B · bee0221377b2
    "characters.juno.gates.juno_sells_you_the_logs.label": "Il vous imprime le journal d’accès",
    // B · 9e8ae18bf8bf
    "characters.juno.gates.juno_sells_you_the_logs.kind": "ALLIANCE",
    // B · c661d1d59675
    "characters.juno.gates.juno_tells_you_who_else.label": "Il vous dit qui d’autre a demandé",
    // B · 55a54e80451a
    "characters.juno.gates.juno_tells_you_who_else.kind": "CONFIANCE",
    // B · 8d234559d531
    "characters.juno.combatant.tags": ["civil"],
    // B · 03ac46a6e4e9
    "characters.ash.name": "Tobin Ash",
    // A · 5e96a7c5fd62
    "characters.ash.role": "Service de sécurité interne de la direction. Il n’est pas sur cette opération et il traîne dans cette rue.",
    // A · 3914205214e6
    "characters.ash.cardBlurb": "Il enquête sur des types comme toi, c’est son boulot. Il est poli, et la première fois que tu le vois, il sait déjà depuis combien de temps tu es au 7C.",
    // B · fcca6b746d0b
    "characters.ash.pronouns": "il/lui",
    // A · 1b0de989e8af
    "characters.ash.publicTraits": ["Méthodique","Courtois","Impossible à presser"],
    // B · 4ec4eed77908
    "characters.ash.hiddenDrives": ["Il est l’une des trois personnes qui partagent l’identité Glass, et c’est lui qui dit la vérité"],
    // B · f297fa96e1d4
    "characters.ash.values": ["Que le dossier soit exact","Que les gens sachent ce dont on les accuse"],
    // B · 94617cd55edd
    "characters.ash.fears": ["Avoir eu raison sur la mauvaise personne"],
    // A · 0648cea9502a
    "characters.ash.socialStyle": "Il se présente correctement, explique pourquoi il est là, puis attend — ce qui fait bien plus peur que l’inverse.",
    // B · 9b711640a0f1
    "characters.ash.boundaries": ["Ne détiendra personne sans lui dire pourquoi","Ne mentira pas dans un rapport écrit"],
    // B · 0b5b2b3b5e42
    "characters.ash.goals": ["Identifier qui, dans la Direction Neuf, aide Voss","Faire enregistrer le déploiement intérieur pour qu’une personne extérieure au service le lise"],
    // B · 0ab86dd404ed
    "characters.ash.secrets.ash_is_glass.fact": "Il est l’une des trois identités Glass. C’est lui qui a envoyé VOUS VOUS TROMPEZ D’APPARTEMENT, et il parlait de l’appartement derrière le joueur, pas de celui en face.",
    // B · 47558a04be8d
    "characters.ash.secrets.ash_is_glass.visibility": "NPC_PRIVATE",
    // B · 1e71c07a4163
    "characters.ash.secrets.ash_is_glass.revealHint": "Seulement après que le joueur a compris que Glass se contredit, et qu’il le lui dit en face.",
    // A · b7a343bff122
    "characters.ash.speechStyle": "Formel et posé. Il énonce sa procédure à voix haute avant de la suivre, cite les documents par longueur et horodatage plutôt que par contenu, et te donne une façon de dire non avant de demander quoi que ce soit.",
    // A · a3c0e9108fbf
    "characters.ash.topics": ["les logs d’accès","l’opération","le directeur Halden","Glass","ce que tu as déposé"],
    // A · fb1e06700c18
    "characters.ash.voiceSamples": ["Je m’appelle Tobin Ash, je suis sécurité interne, et avant qu’on aille plus loin tu peux refuser de me parler. Je noterai que tu as refusé. C’est tout ce que ça dira.","Ton rapport de mardi fait deux cent onze mots et le balcon n’y apparaît pas. Je te donne la chance d’y ajouter quelque chose avant de déposer le mien.","J’ai lu chaque mot que tu as écrit depuis que tu es arrivé. Je te le dis parce que tu as le droit de le savoir, pas pour te mettre mal à l’aise.","Si je me trompe sur toi, je le mettrai par écrit et je signerai. Je l’ai déjà fait deux fois."],
    // B · 30fbf5688b80
    "characters.ash.appearance": "Cinquante ans, grand, un imperméable qui a pris la pluie pendant dix ans, un porte-documents qu’il serre contre sa poitrine comme un bouclier.",
    // B · 45064c14b63f
    "characters.ash.visualHook": "Un porte-documents en cuir tenu contre sa poitrine à deux mains.",
    // B · 047ebdc4113f
    "characters.ash.silhouette": "Debout très droit dans un cadre de porte, manteau encore sur lui, ne rentrant pas plus loin.",
    // B · f693d1f7fd7f
    "characters.ash.artSeed": "window7-ash-01",
    // B · afd6ea60dab9
    "characters.ash.portrait": "story_window_seven/ash",
    // B · ca4327217244
    "characters.ash.expressions": ["neutre","attentif","désolé"],
    // B · c68dbe6f4440
    "characters.ash.knowledgeScope": ["direction","glass","palisade","the_operation","veyra"],
    // B · aac28552aff1
    "characters.ash.gates.ash_admits_it.label": "Il admet quels messages étaient les siens",
    // B · 55a54e80451a
    "characters.ash.gates.ash_admits_it.kind": "CONFIANCE",
    // B · 8f38f89f31ef
    "characters.ash.gates.ash_admits_it.requires.flagsSet": ["sait :glass_is_three"],
    // B · 9b2d19230ea2
    "characters.ash.combatant.tags": ["entraîné","armé"],
    // B · a8d9ec6dac7a
    "factions.faction_directorate.name": "Direction Neuf",
    // B · 4c03b9f9c693
    "factions.faction_directorate.description": "Le service pour lequel le joueur travaille, qui n’existe pas, et qui mène actuellement une purge interne déguisée en enquête sur une fuite.",
    // B · 0cbf336b573b
    "factions.faction_directorate.enemies": ["faction_voss"],
    // B · b38d4303cee4
    "factions.faction_voss.name": "Le camp de Selene",
    // B · 52c7fe9a95bc
    "factions.faction_voss.description": "Selene Voss, deux personnes au ministère qui n’ont pas encore été identifiées, et l’une des trois identités Glass qui dit la vérité en ce moment.",
    // B · 9abbd4a50997
    "factions.faction_voss.enemies": ["faction_directorate"],
    // B · 53b1bea79758
    "factions.faction_veyra.name": "Veyra",
    // B · 46109444c929
    "factions.faction_veyra.description": "La presse, le ministère, et deux millions de personnes qui n’ont jamais entendu parler de PALISADE et qui en font toutes partie.",
    // B · 1b5f13d12028
    "quests.q_seven_nights.title": "Sept Nuits",
    // B · 4f464d884bbf
    "quests.q_seven_nights.summary": "Surveille le penthouse, note les visiteurs, rends ton rapport à six heures, ne prends aucun contact. Ça tient environ quatre-vingt-dix minutes.",
    // B · 7fcc0be2ad9c
    "quests.q_seven_nights.kind": "PRINCIPALE",
    // B · 0b721303c5d8
    "quests.q_seven_nights.steps.the_first_night.playerCopy": "Passer la première nuit dans l’appartement 7C.",
    // B · 3c1d12e03d81
    "quests.q_seven_nights.steps.the_first_night.directorNotes": "Mara gère l’appartement et s’y attend. Ce qui change, c’est si le joueur prend la mission au sérieux, la teste, ou la casse tout de suite. Les trois sont des débuts valides et aucun ne met fin à l’opération.",
    // B · 743922b25170
    "quests.q_seven_nights.steps.the_first_night.rewards.flags": ["night_one"],
    // B · 52660b74f317
    "quests.q_seven_nights.steps.wrong_apartment.playerCopy": "Comprendre ce que Glass voulait dire par le mauvais appartement.",
    // B · 34bd7a6d168e
    "quests.q_seven_nights.steps.wrong_apartment.directorNotes": "Glass parlait du 7C. Quelqu’un dans la Direction Neuf a mis le joueur et Mara dans cet appartement pour voir à qui ils parlaient, et la surveillance va dans les deux sens. Les trois voies le découvrent depuis trois directions incompatibles.",
    // B · 743922b25170
    "quests.q_seven_nights.steps.wrong_apartment.enterWhen.flagsSet": ["night_one"],
    // B · 342fd9730607
    "quests.q_seven_nights.steps.wrong_apartment.rewards.flags": ["knows :watched_both_ways"],
    // B · 86755148cbfd
    "quests.q_seven_nights.steps.the_middle_nights.playerCopy": "Passer les nuits entre la découverte et la décision.",
    // B · 09ba0e9a8206
    "quests.q_seven_nights.steps.the_middle_nights.directorNotes": "Les nuits trois, quatre et cinq. Rien ne s’impose au joueur ici, c’est le but — c’est la période où l’appartement est petit, le planning réel, et ce qu’ils sont l’un pour l’autre se décide sur quatre cents heures de rien. Chaque voie est une façon différente d’avoir passé la semaine, et chacune change qui est à côté du joueur quand ça compte.",
    // B · 342fd9730607
    "quests.q_seven_nights.steps.the_middle_nights.enterWhen.flagsSet": ["knows :watched_both_ways"],
    // B · 297a86ab581c
    "quests.q_seven_nights.steps.the_middle_nights.rewards.flags": ["knows :the_shape_of_it"],
    // B · 275643d8f220
    "quests.q_seven_nights.steps.the_archive_moves.playerCopy": "Décider ce qui arrive à PALISADE.",
    // B · 3aefff0e5792
    "quests.q_seven_nights.steps.the_archive_moves.directorNotes": "Chaque voie ici correspond à une position réelle que quelqu’un dans cette histoire défend, et chacune fait au moins deux ennemis parmi les autres. L’archive est un objet physique dans une poche de manteau ; celui qui l’a à la fin de la septième nuit, c’est de ça que ça parlait.",
    // B · 297a86ab581c
    "quests.q_seven_nights.steps.the_archive_moves.enterWhen.flagsSet": ["knows :the_shape_of_it"],
    // B · ec79661f7d4f
    "quests.q_seven_nights.steps.the_archive_moves.rewards.flags": ["the_archive_settled"],
    // B · 44a42ac1e49d
    "quests.q_seven_nights.involvedCharacterIds": ["mara","selene","halden"],
    // B · a2d3615a427d
    "quests.q_seven_nights.involvedLocationIds": ["apt_7c","voss_penthouse"],
    // B · 3faf00f51b0b
    "quests.q_seven_nights.knownRewardCopy": "Sept nuits propres et un vol retour, si quelqu’un en veut encore jeudi.",
    // B · c9e9e8853625
    "quests.q_the_case.title": "Ce qu’il y a dans la mallette",
    // B · 93d2e013948a
    "quests.q_the_case.summary": "Aluminium, scellée, dans la penderie, et la seule chose dans l’appartement que personne n’a de raison de toucher.",
    // B · 7fcc0be2ad9c
    "quests.q_the_case.kind": "PRINCIPALE",
    // B · 743922b25170
    "quests.q_the_case.discoverWhen.flagsSet": ["night_one"],
    // B · b945f8f5ed20
    "quests.q_the_case.steps.find_out.playerCopy": "Découvrir ce que porte Mara Ellison.",
    // B · f609785c7f5c
    "quests.q_the_case.steps.find_out.directorNotes": "Être informé et découvrir sont deux scènes différentes qui mènent à des partenaires différents. Ouvrir le sceau dans son dos n’est pas une trahison qu’elle pardonnera vite, et c’est une chose tout à fait raisonnable à faire pour un agent.",
    // B · 0a4d0fb94630
    "quests.q_the_case.steps.find_out.rewards.flags": ["knows :the_case"],
    // B · 403a8cab6d17
    "quests.q_the_case.steps.whether_she_uses_it.playerCopy": "Découvrir si Mara va suivre l’ordre.",
    // B · 88f440ee218e
    "quests.q_the_case.steps.whether_she_uses_it.directorNotes": "Le cœur du personnage. Elle a déjà suivi un mauvais ordre et une personne est morte. Si elle le refait, c’est vraiment ouvert et ça dépend de ce que le joueur a vécu avec elle dans l’appartement — pas d’une seule conversation.",
    // B · 6dc605d129a4
    "quests.q_the_case.steps.whether_she_uses_it.enterWhen.flagsSet": ["knows :the_order"],
    // B · d78038032f48
    "quests.q_the_case.steps.whether_she_uses_it.rewards.flags": ["the_order_settled"],
    // B · e926ad3a88a5
    "quests.q_the_case.involvedCharacterIds": ["mara","halden"],
    // B · 85f018ff9c77
    "quests.q_the_case.involvedLocationIds": ["apt_7c","orpheum_roof"],
    // B · 17a074de9cc7
    "quests.q_the_case.knownRewardCopy": "Ce que ta partenaire porte depuis avant que tu la connaisses.",
    // B · 40aa17749d30
    "quests.q_selene.title": "Pourquoi elle a fait signe",
    // B · fd7c10c87821
    "quests.q_selene.summary": "Elle a regardé dans un objectif dont elle ne pouvait pas savoir l’existence, et elle vous a toujours eu d’avance depuis.",
    // B · 552c0b7f83c2
    "quests.q_selene.kind": "SECONDAIRE",
    // B · ead1cdd0123f
    "quests.q_selene.discoverWhen.flagsSet": ["saw_the_wave"],
    // B · f0f22c033257
    "quests.q_selene.steps.get_to_her.playerCopy": "Approche-toi assez près pour parler à Selene Voss.",
    // B · 8fda040f45d9
    "quests.q_selene.steps.get_to_her.directorNotes": "Elle s’est rendue accessible exprès et le dira. La vraie question, c’est ce que le joueur fait avec Mara — partir sans lui dire a un coût, et lui dire en a un autre.",
    // B · e579f703dd55
    "quests.q_selene.steps.get_to_her.rewards.flags": ["reached_her"],
    // B · 0db4a5cf6504
    "quests.q_selene.steps.what_she_is_asking.playerCopy": "Découvre ce que Selene Voss veut de toi.",
    // B · a6f661d8b792
    "quests.q_selene.steps.what_she_is_asking.directorNotes": "Elle ne veut pas être sauvée ni convertie. Elle veut un témoin avec un dossier de service, parce qu’un document d’un déserteur est un document de déserteur, mais un document d’un agent envoyé pour la surveiller est une preuve. Que le joueur accepte d’être ça, refuse, ou prenne les papiers et parte, ce sont trois vraies réponses.",
    // B · e579f703dd55
    "quests.q_selene.steps.what_she_is_asking.enterWhen.flagsSet": ["reached_her"],
    // B · e619653cde31
    "quests.q_selene.steps.what_she_is_asking.rewards.flags": ["knows :palisade"],
    // B · 2deb027a7486
    "quests.q_selene.steps.what_she_is_asking.rewards.abilities": ["burn_the_archive","publish_it"],
    // B · ebc0c02c4762
    "quests.q_selene.involvedCharacterIds": ["selene","juno"],
    // B · 506ff0c4e9df
    "quests.q_selene.involvedLocationIds": ["voss_penthouse","riverside","the_avenue"],
    // B · 51227af8e0f0
    "quests.q_selene.knownRewardCopy": "Quatorze mois de correspondance, et une idée de ce à quoi sert vraiment cette opération.",
    // B · f7a237f4b54b
    "quests.q_glass.title": "Qui est Glass",
    // B · 3dafb2437f05
    "quests.q_glass.summary": "Quatre mots sur un portable dont personne n’a le numéro, d’une identité qui se contredit sans cesse.",
    // B · eff80c847ff6
    "quests.q_glass.kind": "PRINCIPALE",
    // B · 5658d182a12f
    "quests.q_glass.discoverWhen.flagsSet": ["knows :glass"],
    // B · b86ee83f92a6
    "quests.q_glass.steps.the_contradiction.playerCopy": "Comprends pourquoi Glass change toujours d’avis.",
    // B · b1f49c2d72fd
    "quests.q_glass.steps.the_contradiction.directorNotes": "Parce que Glass, c’est trois personnes sous une identité, et ils ne sont pas d’accord sur l’opération. Le joueur n’a pas besoin de passer par une porte particulière — les messages seuls suffisent si quelqu’un les lit côte à côte.",
    // B · 71018bf7e807
    "quests.q_glass.steps.the_contradiction.rewards.flags": ["knows :glass_contradicts"],
    // B · 9a66786d3b88
    "quests.q_glass.steps.which_one_wrote_the_first_message.playerCopy": "Découvre lequel d’entre eux a envoyé VOUS VOUS TROMPEZ D’APPARTEMENT.",
    // B · 66a4c908cf48
    "quests.q_glass.steps.which_one_wrote_the_first_message.directorNotes": "C’est Tobin Ash, et il parlait de l’appart où le joueur est, pas de celui d’en face. Il le confirmera à quelqu’un qui l’a compris et le lui dit en face, mais ne le dira pas à qui que ce soit d’autre, parce que le dire volontairement ruinerait sa carrière au lieu de celle des autres.",
    // B · 71018bf7e807
    "quests.q_glass.steps.which_one_wrote_the_first_message.enterWhen.flagsSet": ["knows :glass_contradicts"],
    // B · b86a77e52b8b
    "quests.q_glass.steps.which_one_wrote_the_first_message.rewards.flags": ["knows :who_glass_is"],
    // B · f1cef33ddd91
    "quests.q_glass.involvedCharacterIds": ["ash","halden","selene"],
    // B · 1f42b933331c
    "quests.q_glass.involvedLocationIds": ["apt_7c","the_subway","directorate"],
    // B · ac7b34435187
    "quests.q_glass.knownRewardCopy": "Un nom, et la raison pour laquelle les messages ne concordent jamais vraiment.",
    // B · 65e57e50763a
    "worldEvents.we_the_wave.publicCopy": "À 01:16, la porte du balcon du penthouse s’ouvre. La Dr Selene Voss sort en chemise blanche, un verre à la main, va vers la rambarde, regarde à travers quatre voies directement dans l’objectif, et lève l’autre main.",
    // B · 6f0522c9eb6b
    "worldEvents.we_the_wave.directorNotes": "Quatre-vingt-dix secondes plus tard, le portable du joueur reçoit quatre mots d’une identité appelée Glass : VOUS VOUS TROMPEZ D’APPARTEMENT. Mara voudra que ce soit enregistré et discuté à une heure raisonnable. Ça arrive la première nuit, que quelqu’un soit au verre ou pas.",
    // B · 14f066088d14
    "worldEvents.we_the_wave.setsFlags": ["saw_the_wave","knows :glass"],
    // B · 394dc9c422b4
    "worldEvents.we_the_car.publicCopy": "La même berline grise est avenue pour la troisième nuit de suite, et Mara lit la plaque à voix haute puis celle de la nuit précédente. Elles se suivent. Quelqu’un les a achetées en lot.",
    // B · ea5275171d8d
    "worldEvents.we_the_car.directorNotes": "C’est Tobin Ash, ce n’est pas encore hostile. C’est la première incohérence vérifiable que le joueur a gratuitement, et sa réaction fait bouger la Suspicion de la Direction dans un sens ou l’autre.",
    // B · d2c75a8e68e5
    "worldEvents.we_the_car.setsFlags": ["knows :the_car"],
    // B · 743922b25170
    "worldEvents.we_the_car.requiresFlags": ["night_one"],
    // B · df79d5b29adf
    "worldEvents.we_ash_knocks.publicCopy": "Quelqu’un frappe à la porte de 7C à onze heures du matin, ce que personne n’a jamais fait, et dit son nom avant qu’on demande. Tobin Ash, sécurité interne, onze minutes.",
    // B · 3a8c43a77d32
    "worldEvents.we_ash_knocks.directorNotes": "Il dira exactement ce qu’il veut et attendra. Il n’est pas là pour arrêter quelqu’un. Il est là parce que le joueur a enregistré à 06:04 une nuit où le balcon était à 01:16, et il voudrait qu’on explique ces quatre heures.",
    // B · 2a1b53029123
    "worldEvents.we_ash_knocks.setsFlags": ["ash_a_ton_dossier"],
    // B · d2c75a8e68e5
    "worldEvents.we_ash_knocks.requiresFlags": ["sait :la_voiture"],
    // B · 5ef6594434ad
    "worldEvents.we_halden_visits.publicCopy": "Le directeur Halden vient en personne à la planque, ce que les directeurs ne font pas, avec un sac de bon café et aucune explication pour l’un ou l’autre.",
    // B · 60269ac074cb
    "worldEvents.we_halden_visits.directorNotes": "Il veut voir les deux dans la même pièce. Il posera une question dont il connaît déjà la réponse. Quoi qu’on lui dise, il reste chaleureux, et rien ne change lors de l’appel le lendemain matin.",
    // B · 2233791b7c80
    "worldEvents.we_halden_visits.setsFlags": ["halden_est_venu_lui_même"],
    // B · 743922b25170
    "worldEvents.we_halden_visits.requiresFlags": ["nuit_un"],
    // B · fad9f9f29998
    "worldEvents.we_archive_moves.publicCopy": "Le penthouse s’éteint deux heures plus tôt que prévu. Vingt minutes plus tard, Selene Voss sort par l’entrée nord du service, portant un manteau qui n’est pas le sien, sans rien en main, ce qui montre qu’elle porte quelque chose.",
    // B · 387ecbd51613
    "worldEvents.we_archive_moves.directorNotes": "C’est le déclencheur nommé dans l’ordre de contingence. Mara le sait, pas forcément le joueur. S’ils sont tous les deux dans l’appartement, les dix minutes suivantes décident la partie.",
    // B · 8b9232267a2a
    "worldEvents.we_archive_moves.setsFlags": ["archive_en_mouvement"],
    // B · 4bbb06d12a5f
    "worldEvents.we_archive_moves.cancelledByFlags": ["mort :selene"],
    // B · ead1cdd0123f
    "worldEvents.we_archive_moves.requiresFlags": ["a_vu_le_signe"],
    // B · 949bcfcfbd81
    "worldEvents.we_seventh_night.publicCopy": "Septième nuit, et l’opération se termine à 6 h quoi qu’il arrive. Mara commence à démonter le trépied à cinq heures, ce qu’elle n’a pas fait depuis six jours, et vous ne dites rien pendant un moment.",
    // B · 775bd01b2e4b
    "worldEvents.we_seventh_night.directorNotes": "L’heure arrive. L’extraction est à six heures. Ce que ça signifie dépend entièrement de la Crainte de la Direction — une voiture et un débrief, ou une équipe et une pièce. Ne le résous pas pour le joueur ; rends la différence visible dans la rue.",
    // B · 0fe6d22f45a6
    "worldEvents.we_seventh_night.setsFlags": ["septième_nuit"],
    // B · 743922b25170
    "worldEvents.we_seventh_night.requiresFlags": ["nuit_un"],
    // B · e82d9dc4b3fa
    "promises.p_the_wave.kind": "MYSTÈRE",
    // B · b14744a508c3
    "promises.p_the_wave.label": "Comment Selene Voss a su où était la caméra",
    // B · 99fdab019cc2
    "promises.p_the_wave.seedHint": "Elle regarde dans un objectif à 01:16 que personne hors de la Direction Neuf ne pouvait connaître, puis elle fait signe.",
    // B · f0ec9d409dc3
    "promises.p_the_wave.payoffHint": "Quelqu’un à l’intérieur du service le lui a dit, c’est la fuite que l’enquête sur les fuites devait trouver.",
    // B · 445cd8deebc2
    "promises.p_the_envelope.kind": "RELATION",
    // B · 9a0041d459d3
    "promises.p_the_envelope.label": "Ce que ton partenaire porte depuis avant que vous ne vous rencontriez",
    // B · 24d3402b00d0
    "promises.p_the_envelope.seedHint": "Une mallette en aluminium scellée dans la penderie et un ordre permanent de ne pas l’ouvrir.",
    // B · 6dd212e93687
    "promises.p_the_envelope.payoffHint": "Une autorisation de tuer la cible, avec la contresignature de Mara, et un partenaire mort derrière la raison pour laquelle elle le ferait.",
    // B · f8b4a6708d82
    "promises.p_palisade.kind": "THÈME",
    // B · 9190d6c44040
    "promises.p_palisade.label": "Une ville où être probable suffit",
    // B · 5dfc21ccc5a8
    "promises.p_palisade.seedHint": "Un nom dont le joueur n’a jamais été briefé apparaît dans un trafic qu’il n’était pas censé voir.",
    // B · 4b88ad7369e6
    "promises.p_palisade.payoffHint": "Quatre cent mille personnes sont notées à l’heure sur leur probabilité de devenir un problème, et ça tourne déjà.",
    // B · 5631e4ba6537
    "promises.p_halden.kind": "PATRON",
    // B · 7c7ba475f5fa
    "promises.p_halden.label": "L’homme qui n’a jamais élevé la voix",
    // B · fbbccdad6a7b
    "promises.p_halden.seedHint": "Halden appelle à l’heure prévue, est chaleureux, bref, et raccroche le premier, chaque nuit.",
    // B · 7050384e77a4
    "promises.p_halden.payoffHint": "Sa signature est sur le dernier des quatorze mois de notes de Selene, et l’opération était un test de ses propres gens.",
    // B · 63a719ec7f2d
    "promises.p_glass.kind": "RIVAL",
    // B · eb2d0c1e2727
    "promises.p_glass.label": "Qui est Glass",
    // B · a63be90c6dcf
    "promises.p_glass.seedHint": "Le trafic Glass n’apparaît pas dans le journal du combiné, et deux messages se contredisent.",
    // B · 3dd1bf719765
    "promises.p_glass.payoffHint": "Trois personnes partagent cette identité. L’une d’elles essaie d’aider, et ce n’est pas celle que le joueur soupçonne.",
    // B · 64a65650e29e
    "endings.end_seven_nights.name": "Sept Nuits Terminées",
    // B · c9d08ae5d876
    "endings.end_seven_nights.rarity": "COURANT",
    // B · e0e9d1fc6a5f
    "endings.end_seven_nights.requires.flagsSet": ["septième_nuit","opération_propre"],
    // B · a2cffa88ddd3
    "endings.end_seven_nights.requires.flagsUnset": ["a_brisé_le_brief"],
    // B · 756771895ec7
    "endings.end_seven_nights.condition": "L’opération a eu lieu, les rapports ont été déposés, et l’extraction est arrivée à six heures le septième matin. Accessible à un joueur qui n’a jamais su ce qu’était PALISADE, et tant mieux — c’est la fin où la machine a continué de tourner et personne dans l’appartement n’a découvert à quoi il avait participé.",
    // A · 65e30a8b9900
    "endings.end_seven_nights.epilogue": "Le débrief dure deux heures et porte entièrement sur le matériel. Mara te serre la main dans un parking et est sur une autre opération dans le mois. Onze semaines plus tard, un nom que tu as noté à 02:40 la quatrième nuit est dans le journal, mais l’histoire parle complètement d’autre chose.",
    // B · 73487a6952ba
    "endings.end_stopped_going.name": "Tu t’arrêtes simplement",
    // B · 734e45c160cf
    "endings.end_stopped_going.rarity": "PEU COMMUN",
    // B · b0eff3470103
    "endings.end_stopped_going.requires.flagsSet": ["left_the_map"],
    // B · 5fb16d4c8e7e
    "endings.end_stopped_going.requires.flagsUnset": ["broke_the_brief","archive_is_yours"],
    // B · cf8f36beeb47
    "endings.end_stopped_going.condition": "Le joueur s’est éloigné de l’opération sans trahir, sans rien prendre, et sans scène. Personne ne l’a grillé et ça n’a pas été nécessaire. Décris précisément comment quitter un job qu’on ne reconnaît pas — le sac, le combiné, l’heure — et laisse l’appartement continuer sans eux. Ce n’est pas un échec et personne ne doit le dire.",
    // A · 8f82c803a4e0
    "endings.end_stopped_going.epilogue": "Le combiné finit dans la rivière, au bout de la Halberd Street, ce qui viole quatre protocoles différents et prend à peine une seconde. Mara fait la septième nuit seule, puis rend un rapport qui ne parle pas de toi — parce que le formulaire ne prévoit pas ce cas. Quelque part, dans un bâtiment qui n’existe pas, un nom cesse d’être lié à des choses.",
    // B · 2d1171296c35
    "endings.end_burn_notice.name": "Avis de brûlage",
    // B · f8b8333fe7bc
    "endings.end_burn_notice.rarity": "RARE",
    // B · 737e61c9cdbc
    "endings.end_burn_notice.requires.flagsSet": ["broke_the_brief","left_the_map"],
    // B · 5a5f08f6aaee
    "endings.end_burn_notice.condition": "Le joueur est officiellement grillé et hors de Veyra. Ni triomphe ni désastre — il est vivant, il n’appartient à personne, et tout ce qu’il savait faire est maintenant quelque chose qu’on ne peut plus le voir faire. Décris précisément comment partir, pas un montage.",
    // A · 4dac96d449a6
    "endings.end_burn_notice.epilogue": "La frontière, c’est un bus, une rivière, et quarante minutes avec le passeport de quelqu’un d’autre. La direction Neuf ne délivre rien, parce que la direction Neuf n’existe pas. Une version du dossier raconte que le joueur est mort à Veyra, et c’est cette version qu’on lit.",
    // B · 6980836e5ad0
    "endings.end_two_tickets.name": "Deux billets pour partir",
    // B · f8b8333fe7bc
    "endings.end_two_tickets.rarity": "RARE",
    // B · bd576ca86798
    "endings.end_two_tickets.requires.flagsSet": ["mara_refused_the_order","left_the_map"],
    // B · 0366adf8fd7a
    "endings.end_two_tickets.condition": "Mara a posé l’enveloppe et est partie avec le joueur. Elle a brisé vingt-neuf ans d’habitude institutionnelle pour ça et elle n’est pas romantique — la scène montre deux pros qui font une exfiltration qu’ils ont déjà menée pour d’autres. Ce qu’il y a entre eux se voit dans la logistique.",
    // A · 711353fa8ec7
    "endings.end_two_tickets.epilogue": "Deux places dans un service côtier, espacées de quarante minutes, achetées avec des cartes différentes. Elle prépare la nourriture du voyage en fonction de sa durée de conservation. Quelque part après la troisième frontière, elle arrête de s’asseoir dos à l’allée, et aucun de vous ne le mentionne.",
    // B · 01a662500b91
    "endings.end_two_tickets.hint": "Elle a déjà suivi un mauvais ordre et quelqu’un en est mort.",
    // B · 1a8cf6b4c133
    "endings.end_target_was_right.name": "La cible avait raison",
    // B · 734e45c160cf
    "endings.end_target_was_right.rarity": "PEU COMMUN",
    // B · 0dfb46c81944
    "endings.end_target_was_right.requires.flagsSet": ["palisade_exposed"],
    // B · 4bbb06d12a5f
    "endings.end_target_was_right.requires.flagsUnset": ["dead :selene"],
    // B · 2d54bd501db9
    "endings.end_target_was_right.condition": "PALISADE est public et Selene Voss est vivante pour le dire. Le joueur a pris le parti de la personne qu’il devait attraper et il avait raison. Ce n’est pas net : l’exposition a un coût qui retombe sur des innocents, et Selene a construit le truc.",
    // A · 81dbffa8dfa9
    "endings.end_target_was_right.epilogue": "Ça dure neuf jours, puis un an. Il y a un comité, qui conserve quatorze mois de correspondance avec un contreseing à la dernière page. Selene témoigne pendant deux jours et affirme officiellement qu’elle l’a construit et qu’elle en était fière à l’époque.",
    // B · a3f8a13f84c1
    "endings.end_target_was_right.hint": "Elle a gardé toutes les lettres.",
    // B · 072fcb4ae679
    "endings.end_perfect_operative.name": "L’agent parfait",
    // B · f8b8333fe7bc
    "endings.end_perfect_operative.rarity": "RARE",
    // B · e018a0811087
    "endings.end_perfect_operative.requires.flagsSet": ["archive_to_directorate","clean_operation"],
    // B · 9085044af140
    "endings.end_perfect_operative.condition": "Le joueur a fait exactement ce que voulait Halden, y compris ce qu’il n’a jamais demandé, et le service l’a remarqué. Décris ça comme une victoire, parce que c’en est une, et que la dernière phrase soit le prix : il est maintenant celui qui recevra la prochaine enveloppe.",
    // A · e4c31d50b6f5
    "endings.end_perfect_operative.epilogue": "La promotion est orale, sans papier. Halden te file le bureau, deux portes plus loin, et l’opération est présentée comme un modèle. Quelque part à Veyra, quatre cent mille personnes sont notées chaque heure selon leur risque de devenir un problème, et cette tâche est désormais la tienne.",
    // B · 6690f8e23b86
    "endings.end_no_more_windows.name": "Plus de fenêtres",
    // B · f7fc172f729a
    "endings.end_no_more_windows.rarity": "UNIQUE",
    // B · b1976dc5b61b
    "endings.end_no_more_windows.requires.flagsSet": ["archive_destroyed","left_the_map"],
    // B · 2d83e258253e
    "endings.end_no_more_windows.condition": "L’archive a disparu, tous les leviers avec, et le joueur a disparu. Personne ne le remercie et personne ne peut prouver que ça a eu lieu, c’est le but et le prix. Selene est furieuse si elle est vivante : la preuve est partie avec l’arme.",
    // A · f96f9b095b48
    "endings.end_no_more_windows.epilogue": "Pas de comité, pas d’histoire, pas de dossier. PALISADE est reconstruit de zéro en deux ans par des gens qui n’ont jamais vu le premier, parce que la raison d’être de ce projet n’a mené nulle part. Plus personne ne peut dire que ça a été détruit une fois, par quelqu’un, un jeudi.",
    // B · 7985f6476d67
    "endings.end_palisade_crown.name": "La couronne de Palisade",
    // B · f7fc172f729a
    "endings.end_palisade_crown.rarity": "UNIQUE",
    // B · 213f16b65ab1
    "endings.end_palisade_crown.requires.flagsSet": ["archive_is_yours"],
    // B · 65a77074c185
    "endings.end_palisade_crown.condition": "Le joueur l’a gardée. Pas pour publier, ni détruire, ni rendre. Joue ça avec sérieux total et sans fanfaronnade — il tient maintenant ce que tout le monde dans cette histoire était prêt à tuer pour, et le premier qui le comprend est quelqu’un qu’il connaît.",
    // A · 18e0ed705ea2
    "endings.end_palisade_crown.epilogue": "Ça tient dans la poche d’un manteau et ça se met à jour chaque heure. Il n’existe aucune version des dix années suivantes où le joueur pose ça quelque part. Halden arrête d’appeler. Selene envoie un message, d’une identité qui n’est pas Glass, et ce message fait quatre mots.",
    // B · df1da6e1f012
    "endings.end_maras_order.name": "L’ordre de Mara",
    // B · 734e45c160cf
    "endings.end_maras_order.rarity": "PEU COMMUN",
    // B · d78038032f48
    "endings.end_maras_order.requires.flagsSet": ["the_order_settled"],
    // B · d731e278ac4f
    "endings.end_maras_order.condition": "La septième nuit arrive au truc que Mara porte depuis avant que le joueur la rencontre, et ça se règle devant eux. Joue ce que la partie a gagné, sans commentaire : suivre cet ordre, c’est une personne qui fait mal son boulot pour des raisons qu’on comprend, et le refuser lui coûte la carrière qu’elle comptait quitter dans trois opérations.",
    // A · 599e4be3ffd1
    "endings.end_maras_order.epilogue": "Quoi qu’elle ait fait, elle remplit elle-même la paperasse et ne laisse personne d’autre signer. L’enveloppe retourne dans la mallette, ou pas. Quoi qu’il en soit, la mallette retourne dans la penderie, sous deux couvertures pliées, et le 7C est reloué au printemps.",
    // B · a3c049105d95
    "endings.end_maras_order.hint": "Le sceau sur la valise enregistre l’heure où il a été brisé.",
    // A · 470556de790f
    "archetypes.arch_field.name": "Sur le terrain, onze ans",
    // B · 6d30c7e103f2
    "archetypes.arch_field.role": "Tradecraft et travail rapproché",
    // A · 73fbd91a3528
    "archetypes.arch_field.summary": "Tu as fait plus de ces missions que tu n’en as classé. Tu restes calme dans une cage d’escalier et t’es dépassé par tout ce qui a un écran.",
    // A · 4bf5f24f0aef
    "archetypes.arch_field.playstyle": ["Expérimenté","Physique","À la traîne sur la tech"],
    // A · 604bb7e43991
    "archetypes.arch_field.blurb": "Onze ans, quatre services, et un genou qui sent la pluie venir à Veyra.",
    // A · 70bf792753cc
    "archetypes.arch_analyst.name": "Bureau, Jusqu’ici",
    // B · c8437acb9fa6
    "archetypes.arch_analyst.role": "Systèmes et motifs",
    // A · fbaf21d969cd
    "archetypes.arch_analyst.summary": "Tu as lu quatre cents opérations comme ça sans jamais en faire partie. Tu verras l’incohérence trois jours avant tout le monde et tu seras inutile dans un couloir.",
    // A · 3df36b2c0d4a
    "archetypes.arch_analyst.playstyle": ["Cérébral","Repère les schémas","Non testé"],
    // A · 720103f4191d
    "archetypes.arch_analyst.blurb": "On t’a sorti d’un sous-sol parce que quelqu’un a décidé que l’opération avait besoin d’un lecteur.",
    // A · ff69dc241a0e
    "archetypes.arch_informant.name": "Récupéré, pas Recruté",
    // B · f3d543f82770
    "archetypes.arch_informant.role": "Gens et couverture",
    // A · 8a2621c126f5
    "archetypes.arch_informant.summary": "Tu étais un problème pour quelqu’un avant d’être un atout. Tu peux jouer un autre rôle aussi longtemps qu’un couloir dure, mais personne dans le service ne te fait vraiment confiance.",
    // A · f4b26886a9a7
    "archetypes.arch_informant.playstyle": ["Persuasif","Adaptable","Pas fiable"],
    // A · c1d01bf65fad
    "archetypes.arch_informant.blurb": "Ils avaient assez sur toi pour t’envoyer en prison, mais ils ont préféré t’avoir en flat.",
    // A · b95643b23189
    "archetypes.arch_soldier.name": "Muté",
    // B · e5f6dfcc581e
    "archetypes.arch_soldier.role": "Mouvement et violence",
    // A · bbc52d046ab2
    "archetypes.arch_soldier.summary": "Militaire il y a trois ans, et le service t’a confié les aspects du boulot qu’on note jamais. Tu es très rapide et tu détestes rester immobile.",
    // A · 62e972c89373
    "archetypes.arch_soldier.playstyle": ["Rapide","Dangereux","Agité"],
    // A · 4b90c1713d4f
    "archetypes.arch_soldier.blurb": "Tu n’as jamais été enfermé aussi longtemps dans un si petit espace, et c’est déjà la partie la plus dure de la mission.",
    // B · 33521d2cd6a0
    "setupFields.displayName.label": "Quel nom figure sur le dossier ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · 0edb74437d32
    "setupFields.displayName.placeholder": "ex. Idris Kalvan",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 3a6240a26696
    "setupFields.pronouns.placeholder": "ex. iel/iels",
    // B · 705b68343417
    "setupFields.archetype.label": "Comment la Direction Neuf vous a-t-elle recruté ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHÉTYPE",
    // B · ace57b6339ab
    "setupFields.archetype.helpText": "D’où vous venez, ce que ça détermine dans vos compétences. C’est fixé pour toute la partie. Ça ne dit pas de quel côté vous êtes, ce que vous mettez dans vos rapports, ni si vous bossez encore pour eux jeudi — rien de tout ça ne se décide ici, et tout peut changer pendant les sept nuits.",
    // B · 43aed0136396
    "setupFields.worldKnowsAboutYou.label": "Que pense déjà le service de vous ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · 44746a38fe14
    "setupFields.worldKnowsAboutYou.helpText": "Halden a lu ça. Selene Voss aussi, apparemment.",
    // B · 5692ce7dcf20
    "setupFields.worldKnowsAboutYou.placeholder": "ex. Il y a une opération à Ferrand il y a deux ans dont tout le monde évite de parler devant moi.",
    // B · d8a95e94c1e6
    "setupFields.why_you.label": "Pourquoi vous ont-ils mis dans cet appartement ?",
    // B · b6a31c665c0b
    "setupFields.why_you.kind": "CHOIX",
    // B · 595c1c7aecf9
    "setupFields.why_you.helpText": "Ça montre ce que vous perdez si l’opération foire, la seule pression qu’on peut avoir dans cette histoire.",
    // B · a7b245de932a
    "setupFields.why_you.options.safe_pair.label": "Vous êtes la paire de mains la plus sûre qu’ils avaient de dispo",
    // B · d8585c3ff12b
    "setupFields.why_you.options.expendable.label": "Vous êtes celui qu’ils peuvent renier le plus vite",
    // B · 8094758516d0
    "setupFields.why_you.options.volunteered.label": "Vous l’avez demandé, et personne ne vous a demandé pourquoi",
    // B · fd0e04ec662f
    "setupFields.why_you.options.punishment.label": "C’est une punition, et tout le monde le sait",
    // B · 920940999956
    "setupFields.why_you.options.watching_you.label": "C’est vous qu’ils surveillent vraiment",
    // B · f6093d6587c4
    "setupFields.appearance.label": "Qu’est-ce que les gens remarquent en premier ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · 92a15829ec62
    "setupFields.appearance.placeholder": "ex. Je fais un pied de plus que tout le monde et je n’ai jamais réussi à rester assis tranquille sur une chaise.",
    // B · 3aa4328667d6
    "protagonist.kind": "VIDE",
    // A · 8b41b590b98c
    "opening": "La serrure prend trois secondes de plus que prévu, puis tu es à l’intérieur, et il fait noir.\n\nToutes les fenêtres de l’appartement 7C sont masquées, sauf une, où une fente laisse passer la largeur d’un objectif. Une caméra est posée sur un trépied à cette ouverture, braquée à travers quatre voies d’une avenue déserte sur un penthouse situé onze étages plus haut. Deux mugs traînent par terre à côté. L’un d’eux est encore chaud.\n\nMara Ellison ne se retourne pas.\n\n« Verrouille la porte, » dit-elle. « Et ne reste pas devant la vitre. »\n\nDe l’autre côté de la rue, le penthouse est dans l’ombre.\n\nIl est vingt-deux quarante. Tu as sept nuits.",
    // A · b04a9158b6d5
    "openingSuggestions": ["Je verrouille la porte, contourne la pièce et m’accroupis près du trépied sans le toucher. « C’est lequel le mug à moi, et depuis quand t’es seule à cette fenêtre ? »","Je reste dans l’encadrement de la porte, regardant l’arrière de sa tête. « Sept nuits, pas de contact, pas de héros. C’est ce qu’on t’a dit, ou ce que t’aurais écrit ? »","Je pose mon sac et commence à fouiller l’appartement — placards, prises, la garde-robe. « Avant de regarder son immeuble, je veux savoir ce qu’il y a dans celui-ci. »"],
  },
});
