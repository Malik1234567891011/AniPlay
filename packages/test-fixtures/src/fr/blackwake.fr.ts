import { registerWorldText } from '@aniplay/contracts';

/**
 * Blackwake, in French.
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
  storyId: "story_blackwake",
  text: {
    // A · b92b0425d675
    "fantasyLabel": "Un navire brisé. Personne ne sait qui vous êtes.",
    // A · 0cc8c2d2d330
    "hook": "Votre tuteur a passé quarante ans à chercher une mer qui n’est sur aucune carte. Quelqu’un l’a tué pour ça et vous a laissé la boussole.",
    // A · 94ac7c2d4d25
    "premise": "Le Blackwake, c’est neuf cents milles de mer ouverte et environ quatre cents îles, chacune appartenant à quelqu’un : la Neuvième Flotte, une maison marchande, un roi, ou quiconque l’a tenue assez longtemps pour le dire.\n\nFerro Vane vous a élevé. Il a passé sa vie à chercher une région d’océan appelée la Mer Sans Couronne que presque tout le monde est sûr de ne pas exister, et il a été chassé de chaque port sur la côte pour ça.\n\nIl y a onze jours, quelqu’un est entré dans l’atelier et lui a tranché la gorge, sans prendre son argent.\n\nIl vous a laissé trois choses : un cotre vieux de quarante ans avec une quille fendue et sans équipage, le tiers est d’une carte dont le reste est déchiré, et une boussole en laiton qui pointe là où aucune boussole ne pointe.\n\nVous êtes dans le port de Saltmarket avec un navire que vous ne pouvez pas naviguer seul, et la seule personne qui a proposé de vous aider est une navigatrice recherchée qui refuse de dire pourquoi elle peut lire l’écriture de votre tuteur.\n\nPersonne ne connaît encore votre nom.",
    // A · f30dd0405086
    "mechanicsChips": ["Recruter un vrai équipage","Améliorer votre navire","Primes et notoriété","Arcs d’îles","Reliques"],
    // A · f0e0d827d152
    "creatorNote": "Votre équipage, c’est des gens, pas du matériel. Ils vous disputent, ils se disputent entre eux, et n’importe qui peut partir. Une relique casse exactement une règle du monde — et vous pouvez devenir la chose la plus dangereuse de cet océan sans jamais en tenir une.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · f7826ea794a3
    "rules.hardCanon": ["La Mer Couronne Perdue ne figure sur aucune carte imprimée depuis quatre-vingt-dix ans. C’est volontaire et quelqu’un l’a fait.","Une relique enfreint exactement une règle du monde et rien d’autre. Il n’existe pas de reliques polyvalentes.","La Neuvième Flotte ne négocie avec personne qui a une prime de plus de quatre cents couronnes.","Un navire a besoin de quatre personnes pour naviguer et onze pour combattre. Le Marrow en a une.","Ferro Vane a été tué avec une lame de modèle naval et rien n’a été volé."],
    // A · fc67a49ac253
    "rules.toneGuide": "Sel, cordages, météo et argent. L’aventure avant tout : c’est un monde où on prend la mer parce qu’il est immense et rempli de choses que personne n’a vues. Les échanges entre l’équipage sont la colonne vertébrale — ils se parlent entre eux, pas seulement au joueur. La violence est rapide et lourde de conséquences, pas sale ni longue. Un rythme à la japonaise : une nuit tranquille sur le pont mène à la prochaine île.",
    // B · aef0340e48b9
    "skills.blades.name": "Lames",
    // B · 7ce3b6387340
    "skills.blades.attribute": "agilité",
    // B · c286a8e66b63
    "skills.blades.description": "Cutter, hache d’abordage, et le jeu de jambes sur un pont en mouvement.",
    // B · 648bc28e3e50
    "skills.gunnery.name": "Artillerie",
    // B · a8c1fa8269c3
    "skills.gunnery.attribute": "esprit",
    // B · b119343282d0
    "skills.gunnery.description": "Calculer la portée, viser et tirer quelque chose qui pèse une tonne.",
    // B · 177607b38d26
    "skills.seamanship.name": "Navigation",
    // B · 97081b4b4792
    "skills.seamanship.attribute": "force",
    // B · 720307fc25f0
    "skills.seamanship.description": "Voile, corde, météo, et ce que la coque peut encaisser.",
    // B · 24c81a3986dd
    "skills.navigation.name": "Navigation",
    // B · a8c1fa8269c3
    "skills.navigation.attribute": "esprit",
    // B · 8bd992bf7cd1
    "skills.navigation.description": "Cartes, étoiles, et savoir quand la carte est fausse.",
    // B · f400330b9c9c
    "skills.command.name": "Commandement",
    // B · cfb7a15645c3
    "skills.command.attribute": "présence",
    // B · 85ca3a548de6
    "skills.command.description": "Être suivi par des gens qui pourraient partir.",
    // B · 6f898fcdc11d
    "skills.bargaining.name": "Négociation",
    // B · cfb7a15645c3
    "skills.bargaining.attribute": "présence",
    // B · b3043b7d1af0
    "skills.bargaining.description": "Marchandises, contrats, et ce qu’une chose vaut ici.",
    // B · 4585bc1a10b9
    "skills.larceny.name": "Vol",
    // B · 7ce3b6387340
    "skills.larceny.attribute": "agilité",
    // B · 8ae011cf26af
    "skills.larceny.description": "Serrures, cales, et être là où on n’est pas censé être.",
    // B · 4d381c359c62
    "skills.lore.name": "Savoir profond",
    // B · a8c1fa8269c3
    "skills.lore.attribute": "esprit",
    // B · 72eaf81e069d
    "skills.lore.description": "Reliques, vieilles cartes, et comment on appelait la mer autrefois.",
    // B · 7f02acff7b63
    "skills.medicine.name": "Médecine",
    // B · a8c1fa8269c3
    "skills.medicine.attribute": "esprit",
    // B · c66bb90273c7
    "skills.medicine.description": "Échardes, fièvre, et l’heure qui suit un combat.",
    // B · c3b9ba0f70aa
    "resources.stamina.name": "Endurance",
    // B · 34e8ec1ac388
    "resources.stamina.polarity": "BON ÉLEVÉ",
    // B · f8ab7af39c3c
    "resources.stamina.zeroStateConsequence": "Épuisé. Quelqu’un d’autre prend la barre.",
    // B · d492a7650052
    "resources.stamina.color": "#E8B44A",
    // B · 3b62fa421578
    "resources.hull.name": "Coque",
    // B · 34e8ec1ac388
    "resources.hull.polarity": "BON ÉLEVÉ",
    // B · ec7580c03204
    "resources.hull.zeroStateConsequence": "Elle coule et tout le monde le sait.",
    // B · 4cb44ccbfac8
    "resources.hull.color": "#7A9E7E",
    // B · 0e2d0e1dbc06
    "resources.notoriety.name": "Notoriété",
    // B · 34e8ec1ac388
    "resources.notoriety.polarity": "BON ÉLEVÉ",
    // B · 6a07f61de3b4
    "resources.notoriety.zeroStateConsequence": "Personne ne connaît ton nom. Ça peut servir.",
    // B · c589f52fa224
    "resources.notoriety.color": "#B14A6C",
    // B · 8b06fdfe8c1b
    "resources.supplies.name": "Vivres",
    // B · 34e8ec1ac388
    "resources.supplies.polarity": "GOOD_HIGH",
    // B · 84b343844409
    "resources.supplies.zeroStateConsequence": "Tonneaux vides et équipage qui s’en est aperçu.",
    // B · 3e58d5f710c0
    "resources.supplies.color": "#8A7A5E",
    // A · 4785f43e71cd
    "items.vanes_compass.name": "La Boussole de Vane",
    // B · 2c779dba248b
    "items.vanes_compass.tags": ["quête","relique"],
    // B · 79518563d9af
    "items.vanes_compass.description": "En laiton, lourde, et elle n’a jamais pointé vers le nord. Elle pointe vers quelque chose, sans bouger, et ce quelque chose bouge.",
    // B · a81e7014308f
    "items.vanes_compass.loreText": "Il l’a portée quarante ans et n’a jamais laissé personne d’autre la tenir.",
    // B · 51db4f8a21e2
    "items.vanes_compass.icon": "compass",
    // A · cc79ef35e080
    "items.torn_chart.name": "Le Tiers Est",
    // B · 061625d9bd60
    "items.torn_chart.tags": ["quête","document"],
    // B · 7e4230de3691
    "items.torn_chart.description": "Un tiers d’une carte dans la main de Ferro. La déchirure est vieille et nette — elle a été coupée, pas arrachée.",
    // B · 016744cf3756
    "items.torn_chart.icon": "chart",
    // A · 659598d7cb3e
    "items.workshop_cutlass.name": "Le Cimeterre de l’Atelier",
    // B · b5e8d28b4848
    "items.workshop_cutlass.tags": ["arme"],
    // B · 110688b7cca2
    "items.workshop_cutlass.equipSlot": "main",
    // B · 430fe2df2815
    "items.workshop_cutlass.description": "Celle de Ferro, et pas une bonne. Il s’en servait pour ouvrir les caisses.",
    // B · b28936223705
    "items.workshop_cutlass.icon": "cutlass",
    // A · 2add9c87c865
    "items.ships_papers.name": "Les papiers du Marrow",
    // B · e72573287188
    "items.ships_papers.tags": ["document"],
    // B · f1be99c9f601
    "items.ships_papers.description": "Enregistrement, jauge, et un contrôle de coque vieux de neuf ans que quelqu’un ignore.",
    // B · 8143e9e47c18
    "items.ships_papers.icon": "papers",
    // A · b1506174f22d
    "items.new_keel.name": "Un quille saine",
    // B · 8be4a7e4af88
    "items.new_keel.tags": ["navire"],
    // B · 6b2d300b679a
    "items.new_keel.equipSlot": "coque_navire",
    // B · 9db5518d9adb
    "items.new_keel.description": "Quatorze mètres de chêne lamellé et onze jours de travail au chantier. Elle pourra affronter la mer à nouveau.",
    // B · 210a43b8ab3a
    "items.new_keel.icon": "keel",
    // A · 857ba258017b
    "items.topsails.name": "Grand-voiles débattues",
    // B · 8be4a7e4af88
    "items.topsails.tags": ["navire"],
    // B · 587e9bbe48eb
    "items.topsails.equipSlot": "mât_navire",
    // B · 3aec1731cab8
    "items.topsails.description": "Trois nœuds en plus que tu n’avais pas, et la capacité de semer quelqu’un qui veut te parler.",
    // B · d3e943101169
    "items.topsails.icon": "sail",
    // A · cc55bc1631cd
    "items.long_nines.name": "Une paire de Long Nines",
    // B · ac1de00c0d8f
    "items.long_nines.tags": ["navire","arme"],
    // B · c5bf981835e2
    "items.long_nines.equipSlot": "canons_navire",
    // B · ae1d7b061d27
    "items.long_nines.description": "Deux canons longs de neuf livres. Pas beaucoup, mais ils tirent plus loin que tout ce qu’un cutter devrait avoir.",
    // B · f113d303424a
    "items.long_nines.icon": "cannon",
    // A · aaef38906073
    "items.surgeons_chest.name": "La trousse du chirurgien",
    // B · 6d6c7f38683b
    "items.surgeons_chest.tags": ["navire","médical"],
    // B · 399e22d1e8f4
    "items.surgeons_chest.equipSlot": "cales_navire",
    // B · 90aaa081057e
    "items.surgeons_chest.description": "Scie, aiguille, alcool, et quarante pages de notes de quelqu’un d’autre sur la fièvre.",
    // B · 47ecf7fab7e9
    "items.surgeons_chest.icon": "chest",
    // A · 24fc48ab1916
    "items.stillpoint.name": "Le Point Mort",
    // B · f2b57525dff2
    "items.stillpoint.tags": ["relique"],
    // B · ea27d8f5a7f9
    "items.stillpoint.description": "Un poids en fer de la taille d’une paume. Tout ce contre quoi tu le poses s’arrête de bouger — pas arrêté par la force. Arrêté.",
    // B · 2aee11d99cec
    "items.stillpoint.loreText": "Il fait exactement une chose et n’a jamais rien fait d’autre.",
    // B · 8deaae71d09e
    "items.stillpoint.icon": "weight",
    // A · 5e54cb857696
    "items.the_hush.name": "Le Silence",
    // B · f2b57525dff2
    "items.the_hush.tags": ["relique"],
    // B · eb5d1e75abb0
    "items.the_hush.description": "Une cloche fêlée sans battant. La sonner et pendant onze secondes il n’y a aucun bruit dans un rayon de douze mètres.",
    // B · fb1c91d4dbf8
    "items.the_hush.icon": "cloche",
    // A · 4a4b533773d0
    "items.salt_rations.name": "Rations de sel",
    // B · 56e08362805f
    "items.salt_rations.tags": ["provisions"],
    // B · 2e92d20cee15
    "items.salt_rations.description": "Porc, biscuit, et ce dont le dernier port avait trop.",
    // B · 0c4535200606
    "items.salt_rations.icon": "baril",
    // A · 02136eb45136
    "items.naval_blade.name": "Une lame de marine",
    // B · 43d7ace0cb18
    "items.naval_blade.tags": ["quête","arme"],
    // B · 110688b7cca2
    "items.naval_blade.equipSlot": "main",
    // B · ae5793b92666
    "items.naval_blade.description": "Équipement de la flotte, usé par le service, et du même modèle que celui qui a tué Ferro Vane.",
    // B · ab0622962944
    "items.naval_blade.icon": "épée",
    // A · ef336863ac38
    "abilities.read_the_water.name": "Lire l’eau",
    // B · 286434ed868d
    "abilities.read_the_water.tags": ["utilitaire","navigation"],
    // B · 8ecacf504d10
    "abilities.read_the_water.description": "Courant, houle, couleur et oiseaux. Où est le fond, où sera le vent dans une heure, et ce qu’il y a sous toi.",
    // B · c44e6dd70059
    "abilities.read_the_water.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.read_the_water.check.attribute": "esprit",
    // A · bc69f598cc70
    "abilities.take_the_deck.name": "Prendre la Barre",
    // B · f50abad5f579
    "abilities.take_the_deck.tags": ["social","commandement"],
    // B · be2c152bf156
    "abilities.take_the_deck.description": "Calme la dispute, donne trois ordres, et fais-les suivre avant que quelqu’un décide de ne pas le faire.",
    // B · e9383e6237fe
    "abilities.take_the_deck.targetRule": "MULTI",
    // B · cfb7a15645c3
    "abilities.take_the_deck.check.attribute": "présence",
    // A · 17bb2ea1fd69
    "abilities.boarding_rush.name": "Assaut éclair",
    // B · 26109b4e1399
    "abilities.boarding_rush.tags": ["offensif","armes_blanches"],
    // B · 48662eca6840
    "abilities.boarding_rush.description": "Traverse le vide et monte sur leur pont avant la deuxième volée. Tout ce qui suit, c’est du corps à corps.",
    // B · 39d896e20aec
    "abilities.boarding_rush.targetRule": "SINGLE",
    // B · 7ce3b6387340
    "abilities.boarding_rush.check.attribute": "agilité",
    // A · 714204a576f4
    "abilities.rake_her.name": "La Hors-la-loi",
    // B · 33c66b84ead2
    "abilities.rake_her.tags": ["offensif","artillerie"],
    // B · ea9fa0d7e45c
    "abilities.rake_her.description": "Un passage sur sa poupe avec tout ce que tu as. C’est la raison principale de posséder des canons longs.",
    // B · 39d896e20aec
    "abilities.rake_her.targetRule": "SINGLE",
    // B · a8c1fa8269c3
    "abilities.rake_her.check.attribute": "esprit",
    // A · f30c5eb72c3f
    "abilities.ghost_the_hold.name": "Fantôme de la cale",
    // B · 52c4eef8b2f3
    "abilities.ghost_the_hold.tags": ["utilitaire","larcin"],
    // B · a70f10846d8c
    "abilities.ghost_the_hold.description": "Descends par la trappe arrière pendant que la veille est à l’avant, et remonte avec ce qui vaut la peine d’être pris.",
    // B · 39d896e20aec
    "abilities.ghost_the_hold.targetRule": "SINGLE",
    // B · 7ce3b6387340
    "abilities.ghost_the_hold.check.attribute": "agilité",
    // A · 429eabffa1a3
    "abilities.set_the_terms.name": "Poser les conditions",
    // B · bc0d06bde33a
    "abilities.set_the_terms.tags": ["social","négociation"],
    // B · f14368f70991
    "abilities.set_the_terms.description": "Décide de quoi porte la négociation avant que l’autre personne ne le fasse.",
    // B · 39d896e20aec
    "abilities.set_the_terms.targetRule": "SINGLE",
    // B · cfb7a15645c3
    "abilities.set_the_terms.check.attribute": "présence",
    // A · 245d1e232e8a
    "abilities.offer_a_berth.name": "Proposer une couchette",
    // B · f3f5b0d60149
    "abilities.offer_a_berth.tags": ["social","recrutement"],
    // B · 0e3abdef0e88
    "abilities.offer_a_berth.description": "Propose à quelqu’un de naviguer avec toi. Bien réussir le jet, c’est comment on te prend au sérieux ; qu’ils viennent ou pas, c’est leur choix.",
    // B · 39d896e20aec
    "abilities.offer_a_berth.targetRule": "SINGLE",
    // B · cfb7a15645c3
    "abilities.offer_a_berth.check.attribute": "présence",
    // A · aba62499a3c7
    "abilities.work_the_hull.name": "Entretenir la coque",
    // B · 5d551fae1c3f
    "abilities.work_the_hull.tags": ["utilitaire","navire"],
    // B · 2b6df4099aee
    "abilities.work_the_hull.description": "Calfeutrer, réparer et pomper. Lent, ingrat, et la différence entre une tempête et un naufrage.",
    // B · c44e6dd70059
    "abilities.work_the_hull.targetRule": "AUCUN",
    // B · 97081b4b4792
    "abilities.work_the_hull.check.attribute": "force",
    // A · 24fc48ab1916
    "abilities.use_stillpoint.name": "Le Point fixe",
    // B · f2b57525dff2
    "abilities.use_stillpoint.tags": ["relique"],
    // B · 8abf7bcf4438
    "abilities.use_stillpoint.description": "Pose-le contre quelque chose en mouvement et le mouvement s’arrête. Une lame, une vague, une vergue qui tombe, un homme.",
    // B · 39d896e20aec
    "abilities.use_stillpoint.targetRule": "SINGLE",
    // B · d46524b8ff44
    "abilities.use_stillpoint.requires.flagsSet": ["accord_stillpoint"],
    // B · 6f5281a0ea36
    "abilities.use_stillpoint.requires.lockedCopy": "C’est un morceau de fer dans ta main et ça reste ça.",
    // A · 5e54cb857696
    "abilities.ring_the_hush.name": "Le Silence",
    // B · 2374b9cbc463
    "abilities.ring_the_hush.tags": ["relique","utilitaire"],
    // B · 9ca045ed8503
    "abilities.ring_the_hush.description": "Onze secondes pendant lesquelles rien dans un rayon de douze mètres ne fait le moindre bruit, toi y compris.",
    // B · 503eb62e7676
    "abilities.ring_the_hush.targetRule": "ZONE",
    // B · 93ac3de1cfd3
    "abilities.ring_the_hush.requires.flagsSet": ["accord_hush"],
    // B · 33c18cb0a6a6
    "abilities.ring_the_hush.requires.lockedCopy": "Tu le balances et ça fait ce qu’une cloche sans battant fait.",
    // A · b5ec41b3e198
    "locations.saltmarket.name": "Saltmarket",
    // A · b5ec41b3e198
    "locations.saltmarket.shortName": "Saltmarket",
    // B · 3225c296a168
    "locations.saltmarket.description": "Quatre cents ans de port construit les uns sur les autres. Poissons, cordages, douaniers, et onze tavernes entre le quai et la boutique de marine.",
    // B · f328e8c701ea
    "locations.saltmarket.stageImage": "story_blackwake/stage_saltmarket",
    // A · 4147242080e8
    "locations.the_marrow.name": "La Moelle",
    // A · 4cc2e8031ba9
    "locations.the_marrow.shortName": "Ton Navire",
    // B · da3fe54d9657
    "locations.the_marrow.description": "Douze mètres de cutter vieux de quarante ans avec une quille fendue, une seule voile fatiguée, et personne à bord à part toi.",
    // B · 300fe0186b68
    "locations.the_marrow.stageImage": "story_blackwake/stage_the_marrow",
    // A · bb91c47462b7
    "locations.the_yard.name": "Le Chantier de Corrow",
    // A · 568a20a96f02
    "locations.the_yard.shortName": "Le Chantier",
    // B · 631ff766053e
    "locations.the_yard.description": "Une cale de halage, trois hangars, et une femme qui peut te dire ce qui cloche sur ton bateau à dix-huit mètres et te le dira, à la longue.",
    // B · edddd99aef0e
    "locations.the_yard.stageImage": "story_blackwake/stage_the_yard",
    // A · 39ffc60ae0d7
    "locations.the_drift.name": "La Dérive",
    // A · 39ffc60ae0d7
    "locations.the_drift.shortName": "La Dérive",
    // B · dca69acea6d2
    "locations.the_drift.description": "Un port sans loi construit sur neuf épaves attachées ensemble et qui ont fini par ne faire plus qu’une. Pas de drapeau, pas de douane, et un marché qui te vendra deux fois n’importe quoi.",
    // B · 6665962d854b
    "locations.the_drift.stageImage": "story_blackwake/stage_the_drift",
    // A · 1bd7cf4d4b8b
    "locations.stormlee.name": "Stormlee",
    // A · 1bd7cf4d4b8b
    "locations.stormlee.shortName": "Stormlee",
    // B · f1421d37f7d8
    "locations.stormlee.description": "Une île prise dans une tempête qui n’a jamais cessé de mémoire d’homme. Le côté abrité est calme, vert, et a un village où personne ne part.",
    // B · 4d7c8f0c2d71
    "locations.stormlee.stageImage": "story_blackwake/stage_stormlee",
    // A · 19ac976e441a
    "locations.the_crownless.name": "La Mer Sans Couronne",
    // A · edbfd0a7d304
    "locations.the_crownless.shortName": "Sans Couronne",
    // B · 0e36e8f9ee92
    "locations.the_crownless.description": "Deux mille trois cents kilomètres carrés d’eau absente de toutes les cartes imprimées depuis quatre-vingt-dix ans, et tout ce qu’il y a dedans qui explique pourquoi.",
    // B · 3530b8e23054
    "locations.the_crownless.stageImage": "story_blackwake/stage_the_crownless",
    // B · c73559e61df3
    "characters.nessa.name": "Nessa Vale",
    // A · 3a6035aac8fa
    "characters.nessa.role": "Navigatrice, recherchée dans trois ports",
    // A · cb6430be4055
    "characters.nessa.cardBlurb": "La navigatrice qui sait déchiffrer l’écriture de ton protecteur et refuse de dire comment elle a appris. C’est elle qui a proposé de t’aider avant même que tu demandes.",
    // B · aee35f364a88
    "characters.nessa.pronouns": "elle",
    // A · b495c8241ce1
    "characters.nessa.publicTraits": ["Précise","Imperturbable","Lit une pièce sans rien dire"],
    // B · c6eedaf04b1b
    "characters.nessa.hiddenDrives": ["Elle a navigué avec Ferro Vane pendant deux ans sans jamais te le dire"],
    // B · 66dbddaddd3c
    "characters.nessa.values": ["Bien faire les choses","Payer ce qu’elle doit"],
    // B · d6b610feb701
    "characters.nessa.fears": ["Être la raison pour laquelle quelqu’un d’autre meurt pour la Mer sans Couronne"],
    // A · 2e896d69f67d
    "characters.nessa.socialStyle": "Elle répond à la question que tu as posée, pas à celle que tu voulais poser.",
    // B · 6ea89800c4a4
    "characters.nessa.boundaries": ["Ne naviguera pas pour une maison marchande","Ne parlera pas du mandat"],
    // B · 2e5ee28c8c66
    "characters.nessa.goals": ["Finir la carte que Ferro a commencée","Échapper aux griffes de la Neuvième Flotte"],
    // B · 533dfae93c2f
    "characters.nessa.secrets.nessa_sailed_with_ferro.fact": "Elle a été la navigatrice de Ferro Vane pendant deux ans et a quitté son navire à Stormlee.",
    // B · 47558a04be8d
    "characters.nessa.secrets.nessa_sailed_with_ferro.visibility": "NPC_PRIVATE",
    // B · c9aca3fd8f88
    "characters.nessa.secrets.nessa_sailed_with_ferro.revealHint": "Elle le dira elle-même quand elle croira que tu vas jusqu’au bout.",
    // B · 49656f3264b7
    "characters.nessa.secrets.nessa_warrant.fact": "Son mandat est pour avoir coulé un cutter de la Neuvième Flotte qui tirait sur une flottille de pêche.",
    // B · 47558a04be8d
    "characters.nessa.secrets.nessa_warrant.visibility": "NPC_PRIVATE",
    // B · ef95aacde372
    "characters.nessa.secrets.nessa_warrant.revealHint": "Seulement après que tu aies traversé la Flotte toi-même.",
    // A · 9b3dc95b1937
    "characters.nessa.speechStyle": "Déclarations courtes. Elle donne un chiffre quand un chiffre suffit.",
    // A · b431a80587f3
    "characters.nessa.topics": ["la carte déchirée","Ferro Vane","la mer Sans Couronne","son mandat","la Derive"],
    // A · 5dde2ab026b4
    "characters.nessa.voiceSamples": ["Onze jours dehors, si le temps tient, ce qu’il ne fera pas.","Je le connaissais. C’est tout ce que tu auras aujourd’hui.","Tu me demandes de deviner. Je ne devine pas, j’estime, et ça te coûte une heure."],
    // B · d8b36a01f84b
    "characters.nessa.appearance": "Fin de trentaine, marquée par le temps, cheveux courts gris-noir, un manteau marine dont l’insigne a été découpé.",
    // B · b01ea3eb2276
    "characters.nessa.visualHook": "Un manteau marine avec les insignes de rang volontairement coupés, les fils encore visibles.",
    // B · 686a1dce0970
    "characters.nessa.silhouette": "Dos droit, mains derrière le dos, un long manteau qui bouge peu.",
    // B · 6b146856f04a
    "characters.nessa.artSeed": "blackwake-nessa-01",
    // B · 47b926d11307
    "characters.nessa.portrait": "story_blackwake/nessa",
    // B · dd3915b30385
    "characters.nessa.expressions": ["neutre","ironique","sombre"],
    // B · bdd5cbd3c4e5
    "characters.nessa.knowledgeScope": ["ferro_vane","la_carte","mer_couronne","neuvième_flotte"],
    // B · 070dd16ea8f1
    "characters.nessa.gates.nessa_tells_you.label": "Elle te dit comment elle connaît l’écriture",
    // B · 55a54e80451a
    "characters.nessa.gates.nessa_tells_you.kind": "CONFIANCE",
    // B · a9ac2e427fa3
    "characters.nessa.gates.nessa_tells_you.requires.flagsSet": ["équipe :nessa"],
    // B · 9c96501a6013
    "characters.nessa.companion.station": "Navigatrice",
    // B · 4720dcc84ba3
    "characters.nessa.companion.summary": "Elle peut trouver une côte même par mauvais temps. Rien à l’est de Saltmarket ne se fait sans elle.",
    // B · 126a8e169931
    "characters.nessa.companion.joinsWhen.flagsSet": ["parlé :nessa"],
    // B · bfa669c070ff
    "characters.nessa.companion.refusalCopy": "« Pas encore. Tu as un navire qui ne tient pas la haute mer et personne pour le piloter. Reviens quand le Marrow flottera correctement. »",
    // B · c57fd323e296
    "characters.nessa.companion.acceptCopy": "« Très bien. Je veux le tiers est en main et être celle qui décide quand on fait demi-tour. Ce sont mes conditions. »",
    // B · c23af234165e
    "characters.nessa.companion.leavesWhen.nessa_house_flag.when.flagsSet": ["contrat_maison_signé"],
    // B · 9cd8b189df04
    "characters.nessa.companion.leavesWhen.nessa_house_flag.warningCopy": "Nessa ne t’a pas parlé depuis que le contrat a été signé. Elle range lentement les cartes, comme elle fait quand c’est décidé.",
    // B · d53045b3db50
    "characters.nessa.companion.leavesWhen.nessa_house_flag.departureCopy": "Nessa Vale range ses cartes dans l’étui, le ferme et descend sur le quai. « Je t’ai dit l’essentiel. Bonne chance pour le reste. »",
    // B · 7ca75d8e63e5
    "characters.nessa.companion.leavesWhen.nessa_house_flag.setsFlags": ["nessa_partie"],
    // B · db8f6b446b91
    "characters.nessa.companion.leavesWhen.nessa_broken.warningCopy": "Nessa te donne la direction sans rien dire de plus. Elle ne te corrige plus quand tu te trompes, et c’est pire.",
    // B · 5de1e3778cf7
    "characters.nessa.companion.leavesWhen.nessa_broken.departureCopy": "Nessa Vale laisse l’étui à cartes sur la table, ce qui est la chose la plus généreuse qu’elle pouvait faire, puis elle descend à terre sans attendre que tu protestes.",
    // B · 7ca75d8e63e5
    "characters.nessa.companion.leavesWhen.nessa_broken.setsFlags": ["nessa_partie"],
    // B · 5e6a8301c098
    "characters.nessa.combatant.tags": ["alliée"],
    // B · 908c791ae020
    "characters.rook.name": "Rook Arden",
    // A · b1b8b1a1879e
    "characters.rook.role": "Ancien canonnier de la Neuvième Flotte",
    // A · 41e64058e197
    "characters.rook.cardBlurb": "Le canonnier qui a quitté un navire de la Flotte et refuse de dire ce qui s’est passé à bord. Il porte une lame à la mode navale — la même qui a tué ton protecteur.",
    // B · fcca6b746d0b
    "characters.rook.pronouns": "il/lui",
    // A · d71c9fbff7d4
    "characters.rook.publicTraits": ["Bavard","Compétent","Rit avant tout le monde"],
    // B · c67a55eae786
    "characters.rook.hiddenDrives": ["Il veut que quelqu’un lui demande pour la lame, mais ne veut pas répondre"],
    // B · 17f5931de0dd
    "characters.rook.values": ["Faire le boulot correctement","Ne pas mentir sur ce qu’on a fait"],
    // B · 0da8d64a4f77
    "characters.rook.fears": ["Être l’homme que tout le monde croit qu’il est"],
    // A · 7520b83e4679
    "characters.rook.socialStyle": "Remplit le silence. S’en sert pour éviter la question.",
    // B · f7b65df4be5e
    "characters.rook.boundaries": ["Ne tirera pas sur un bateau qui ne peut pas riposter"],
    // B · a950494e76ad
    "characters.rook.goals": ["Aller assez à l’ouest pour que la flotte n’ait plus d’importance"],
    // B · ee56b304264f
    "characters.rook.secrets.rook_the_blade.fact": "Sa lame est celle de l’escouade côtière de la Neuvième Flotte. Il y était il y a onze jours.",
    // B · 47558a04be8d
    "characters.rook.secrets.rook_the_blade.visibility": "NPC_PRIVATE",
    // B · f17c681df98f
    "characters.rook.secrets.rook_the_blade.revealHint": "Il te le dira avant que tu ne le découvres, si tu l’as mérité.",
    // B · 7e220874e93e
    "characters.rook.secrets.rook_did_not_do_it.fact": "Il n’a pas tué Ferro Vane. Il sait quel officier l’a fait, et il a fui au lieu de le dénoncer.",
    // B · 47558a04be8d
    "characters.rook.secrets.rook_did_not_do_it.visibility": "NPC_PRIVATE",
    // B · de820486a5bc
    "characters.rook.secrets.rook_did_not_do_it.revealHint": "Seulement à haute confiance, ou quand il est coincé avec les preuves.",
    // A · 0339900dba4f
    "characters.rook.speechStyle": "Parle vite, chaleureux, esquive par une blague un peu trop tôt.",
    // A · ea1b2a4c2d3c
    "characters.rook.topics": ["la Neuvième Flotte","sa lame","les longues neufs","pourquoi il est parti"],
    // A · 06b55361154d
    "characters.rook.voiceSamples": ["Deux canons. Deux bons canons valent mieux que six mauvais, et je suis prêt à en mourir.","Demande-moi demain. Je suis sérieux. Demain je te dirai.","J’étais sur ce navire. C’est la seule vérité."],
    // B · a2a8d9e64925
    "characters.rook.appearance": "Trentenaire, large, cicatrices de brûlure de poudre sur l’avant-bras droit, un bon manteau abîmé.",
    // B · f4a88fc338a1
    "characters.rook.visualHook": "Des brûlures de poudre en éventail sur l’avant-bras droit, comme si quelque chose avait explosé à côté de lui.",
    // B · ff8582d1658a
    "characters.rook.silhouette": "Épaules larges, un bras toujours à moitié levé, en plein geste.",
    // B · ac0c456c4f7a
    "characters.rook.artSeed": "blackwake-rook-01",
    // B · 4042275a142c
    "characters.rook.portrait": "story_blackwake/rook",
    // B · 596d612a2597
    "characters.rook.expressions": ["neutre","souriant","coincé"],
    // B · 9fb62f426968
    "characters.rook.knowledgeScope": ["neuvième_flotte","artillerie","ferro_vane"],
    // B · 84c8e06c7887
    "characters.rook.gates.rook_tells_you.label": "Il te parle de la lame",
    // B · 55a54e80451a
    "characters.rook.gates.rook_tells_you.kind": "CONFIANCE",
    // B · 10146018e2e8
    "characters.rook.gates.rook_tells_you.requires.flagsSet": ["équipe :rook"],
    // B · e4f2f534b5cd
    "characters.rook.companion.station": "Canonnier",
    // B · 65e53736d57e
    "characters.rook.companion.summary": "Personne d’autre sur cette côte ne peut tirer un neuf long à cette distance. C’est aussi pour ça que la Flotte te regarde deux fois.",
    // B · 2fc69b319ea7
    "characters.rook.companion.joinsWhen.flagsSet": ["parlé :rook","sait :rook_a_quitté_la_flotte"],
    // B · e6442f55e471
    "characters.rook.companion.refusalCopy": "« Tu ne veux pas de moi. Je dis ça comme une info, pas par modestie. Renseigne-toi sur moi d’abord, puis reviens me voir. »",
    // B · 18a5cff8134d
    "characters.rook.companion.acceptCopy": "« D’accord. Je vais être honnête une fois, maintenant, et après tu décideras. J’étais dans la Neuvième Flotte jusqu’à il y a neuf jours. Tu me veux toujours ? »",
    // B · cc83695a9978
    "characters.rook.companion.leavesWhen.rook_fleet_commission.when.flagsSet": ["a_accepté_commission_flotte"],
    // B · 483feb6d11dc
    "characters.rook.companion.leavesWhen.rook_fleet_commission.warningCopy": "Rook est devenu très silencieux à propos de la commission, ce qui pour lui est un signal d’alarme.",
    // B · 8f6eb1353513
    "characters.rook.companion.leavesWhen.rook_fleet_commission.departureCopy": "Rook Arden laisse son équipement et ne prend que la lame. « Je ne retourne pas chez eux. Ni pour toi, ni pour l’argent, ni pour la mer. »",
    // B · efc629c33e2e
    "characters.rook.companion.leavesWhen.rook_fleet_commission.setsFlags": ["rook_parti"],
    // B · d6624be7d33c
    "characters.rook.companion.leavesWhen.rook_never_asked.when.flagsUnset": ["rook_a_avoué"],
    // B · c9724e402be3
    "characters.rook.companion.leavesWhen.rook_never_asked.warningCopy": "Rook commence une phrase sur la lame puis s’arrête. Il l’a fait trois fois aujourd’hui.",
    // B · f2f127810eb5
    "characters.rook.companion.leavesWhen.rook_never_asked.departureCopy": "Rook Arden n’est plus à bord le matin, et il manque une semaine de tes provisions. Il a laissé les armes, ce qu’il n’était pas obligé de faire.",
    // B · 63b7d7e1cc69
    "characters.rook.companion.leavesWhen.rook_never_asked.setsFlags": ["rook_parti","rook_a_pris_provisions"],
    // B · 5e6a8301c098
    "characters.rook.combatant.tags": ["allié"],
    // B · 08a522502688
    "characters.mako.name": "Mako Renn",
    // A · cb935c53d083
    "characters.mako.role": "Plongeuse, seize ans, absolument sûre d’elle",
    // A · 526ef1676e03
    "characters.mako.cardBlurb": "Seize ans, elle plonge plus profond que n’importe qui à Saltmarket, et elle a décidé de venir que tu sois d’accord ou pas. Elle sait où a coulé une relique.",
    // B · aee35f364a88
    "characters.mako.pronouns": "elle",
    // A · c854813adbce
    "characters.mako.publicTraits": ["Intrépide d’une façon pas toujours courageuse","Franche","Drôle exprès"],
    // B · b4943a8da677
    "characters.mako.hiddenDrives": ["Elle veut être celle dont on raconte les histoires, même si elle sait que c’est idiot"],
    // B · 492a51170108
    "characters.mako.values": ["Dire le vrai chiffre","Ne pas être renvoyée"],
    // B · 3d3da5e3e0ec
    "characters.mako.fears": ["Être laissée à terre","Être traitée comme la gamine"],
    // A · a7f9780fe702
    "characters.mako.socialStyle": "Se dispute tout de suite, oublie ça tout aussi vite.",
    // B · 371fd549bdbf
    "characters.mako.boundaries": ["Ne lui dis pas de rester sur le bateau"],
    // B · 0dc8c140600a
    "characters.mako.goals": ["Trouver l’épave où son frère a coulé","Être vraiment dans l’équipage"],
    // B · 4259a82a4c26
    "characters.mako.secrets.mako_the_wreck.fact": "Son frère est mort sur l’épave où se trouve le Stillpoint. Elle sait exactement où c’est et n’y est jamais retournée.",
    // B · 47558a04be8d
    "characters.mako.secrets.mako_the_wreck.visibility": "NPC_PRIVÉ",
    // B · b91955d29a17
    "characters.mako.secrets.mako_the_wreck.revealHint": "Elle te le dira quand le navire prendra enfin cette direction.",
    // A · ac772f8bbc5c
    "characters.mako.speechStyle": "Enchaîne les phrases. Dit l’essentiel en dernier, à voix basse.",
    // A · 94251ce7f3ab
    "characters.mako.topics": ["l’épave","son frère","la plongée","le Point Mort"],
    // A · 387331d7bf3f
    "characters.mako.voiceSamples": ["Neuf brasses c’est rien. Quatorze, c’est quelque chose. J’en ai fait seize.","Tu vas dire que je suis trop jeune, et je vais le faire quand même.","Je sais où c’est. J’ai toujours su où c’est."],
    // B · 0261ea367ae2
    "characters.mako.appearance": "Seize ans, petite, cheveux décolorés par le sel, oreilles marquées par la pression.",
    // B · dda2836c898e
    "characters.mako.visualHook": "Les deux oreilles sont très marquées par des blessures répétées dues à la pression — elle remarque que tu le remarques.",
    // B · e557296a5e50
    "characters.mako.silhouette": "Compacte, toujours à moitié accroupie sur quelque chose où elle ne devrait pas être debout.",
    // B · 25e125294258
    "characters.mako.artSeed": "blackwake-mako-01",
    // B · 7eed96e4b485
    "characters.mako.portrait": "story_blackwake/mako",
    // B · 3c6c529eb632
    "characters.mako.expressions": ["neutre","ravie","têtue"],
    // B · d0d8e959d001
    "characters.mako.knowledgeScope": ["plongée","épave","stillpoint"],
    // B · 851b1a6c0000
    "characters.mako.gates.mako_tells_you.label": "Elle te parle de son frère",
    // B · 55a54e80451a
    "characters.mako.gates.mako_tells_you.kind": "CONFIANCE",
    // B · ce2237092baa
    "characters.mako.gates.mako_tells_you.requires.flagsSet": ["équipe :mako"],
    // B · f6439d81edb9
    "characters.mako.companion.station": "Plongeuse",
    // B · 12aa3126caf1
    "characters.mako.companion.summary": "Quoi qu’il y ait sous l’eau, c’est elle la seule raison pour que tu l’aies un jour.",
    // B · 32d5f69049ac
    "characters.mako.companion.joinsWhen.flagsSet": ["parlé :mako"],
    // B · 877b17b4cd0f
    "characters.mako.companion.refusalCopy": "« Tu n’as pas encore de bateau. Je vais pas rester sur un quai à dire que je fais partie d’un équipage qui ne peut pas partir. Répare ça et reviens me voir. »",
    // B · 010102042ac7
    "characters.mako.companion.acceptCopy": "« Évidemment. Ça fait deux jours que je te le dis. Ne me mets pas à la barre, j’veux être par-dessus bord. »",
    // B · 59a4921b62c3
    "characters.mako.companion.leavesWhen.mako_left_ashore.when.flagsSet": ["left_mako_ashore"],
    // B · 3ba139322215
    "characters.mako.companion.leavesWhen.mako_left_ashore.warningCopy": "Mako n’a pas demandé à sauter par-dessus bord une seule fois aujourd’hui. Elle a demandé deux fois à quelle distance est le Dériveur.",
    // B · 29ec23e41489
    "characters.mako.companion.leavesWhen.mako_left_ashore.departureCopy": "Mako Renn prend sa ligne et ses plombs et s’en va. « Tu m’as laissée sur une plage. Je le referai pas, j’te l’ai dit. »",
    // B · 3811084eeaea
    "characters.mako.companion.leavesWhen.mako_left_ashore.setsFlags": ["mako_gone"],
    // B · 5867c2bcf57b
    "characters.mako.companion.leavesWhen.mako_starved.warningCopy": "Mako est maigre et a arrêté de te contredire, ce qui n’est pas dans son habitude.",
    // B · 423a8d19f111
    "characters.mako.companion.leavesWhen.mako_starved.departureCopy": "Mako Renn saute par-dessus bord au Dériveur et nage jusqu’à la rive plutôt que d’avoir cette conversation.",
    // B · 3811084eeaea
    "characters.mako.companion.leavesWhen.mako_starved.setsFlags": ["mako_gone"],
    // B · 5e6a8301c098
    "characters.mako.combatant.tags": ["alliée"],
    // B · 5af7d24f14d5
    "characters.veyra.name": "Capitaine Veyra Sol",
    // A · 6d24663c2b11
    "characters.veyra.role": "Neuvième Flotte, escadron côtier",
    // A · ba9eed4c3f0b
    "characters.veyra.cardBlurb": "Le capitaine de la Flotte qui te cherche, poli en plus, et qui était dans l’atelier la nuit où ton protecteur est mort.",
    // B · aee35f364a88
    "characters.veyra.pronouns": "elle",
    // A · d84c6b86fb54
    "characters.veyra.publicTraits": ["Polie","Patiente","Ne s’énerve jamais"],
    // B · a7fdbc3a84d4
    "characters.veyra.hiddenDrives": ["Elle croit que la Mer sans Couronne doit rester hors des cartes et ferait n’importe quoi pour ça"],
    // B · e1beaab043ff
    "characters.veyra.values": ["Ordre","Les neuf cents personnes qu’elle garde en vie en gardant le secret"],
    // B · 7bdb0b17cef5
    "characters.veyra.fears": ["Qu’elle ait tort sur la nécessité de tout ça"],
    // A · 4233067b29f0
    "characters.veyra.socialStyle": "Aborde chaque conversation comme si elle l’avait déjà eue.",
    // B · da7bb20e996d
    "characters.veyra.boundaries": ["Ne tirera pas la première dans un port"],
    // B · 453edfb8c9d9
    "characters.veyra.goals": ["Récupérer le tiers est","Mettre fin à la recherche sans te perdre, si elle peut"],
    // B · 21cf6ddff373
    "characters.veyra.secrets.veyra_ordered_it.fact": "C’est elle qui a donné l’ordre qui a tué Ferro Vane. Elle ne s’attendait pas à ce que ce soit fait de cette façon.",
    // B · 97d1bcd768a7
    "characters.veyra.secrets.veyra_ordered_it.visibility": "CREATOR_ONLY",
    // B · b9cd0f8b85a4
    "characters.veyra.secrets.veyra_ordered_it.revealHint": "Elle le dit elle-même, à la fin, sans qu’on lui demande.",
    // B · bb84018e4257
    "characters.veyra.secrets.veyra_has_been.fact": "Elle est allée dans la Mer sans Couronne. Onze de ses hommes n’en sont pas revenus et elle n’est pas sûre qu’ils soient morts.",
    // B · 97d1bcd768a7
    "characters.veyra.secrets.veyra_has_been.visibility": "CREATOR_ONLY",
    // B · c812f2af1c14
    "characters.veyra.secrets.veyra_has_been.revealHint": "Uniquement dans la Mer sans Couronne elle-même.",
    // A · bbe75acbb968
    "characters.veyra.speechStyle": "Phrases complètes, pas de contractions, jamais pressée.",
    // A · b8e69a472552
    "characters.veyra.topics": ["la carte","Ferro Vane","la Mer Sans Couronne","ta prime"],
    // A · d03fb608fbf9
    "characters.veyra.voiceSamples": ["Tu peux poser la carte sur la table et on rentre tous les deux chez nous.","Je vais pas faire semblant d’être désolée d’une façon qui te convaincrait.","Il y a une raison pour que ça ne soit pas sur les cartes. Ça va pas te plaire, et tu vas pas l’accepter."],
    // B · 01d8c535ef36
    "characters.veyra.appearance": "Cinquante ans, cheveux argentés coupés court, manteau impeccable, un gant toujours porté.",
    // B · b387b6974fe2
    "characters.veyra.visualHook": "Un gant jamais enlevé, à la main gauche, même à table.",
    // B · 87095f6b21ba
    "characters.veyra.silhouette": "Droit, mains croisées dans le dos, manteau qui touche le pont.",
    // B · 2b21950b55f4
    "characters.veyra.artSeed": "blackwake-veyra-01",
    // B · 17413a98890d
    "characters.veyra.portrait": "story_blackwake/veyra",
    // B · afe40d01167d
    "characters.veyra.expressions": ["neutre","regrettant","impitoyable"],
    // B · 155ba2176548
    "characters.veyra.knowledgeScope": ["ninth_fleet","crownless_sea","ferro_vane","the_chart"],
    // B · f095c2c5802a
    "characters.veyra.combatant.tags": ["flotte","officier"],
    // B · 311a95322dc9
    "characters.tolla.name": "Tolla Corrow",
    // A · 82389471bd31
    "characters.tolla.role": "Charpentier de marine, propriétaire du chantier",
    // A · 82322220aa96
    "characters.tolla.cardBlurb": "La charpentière qui peut rendre le Marrow navigable et qui, gratis, vous expliquera en détail tout ce qui ne va pas avec lui.",
    // B · aee35f364a88
    "characters.tolla.pronouns": "elle",
    // A · 2cc1df733976
    "characters.tolla.publicTraits": ["Franche","Juste","Ne peut pas s’empêcher de diagnostiquer les problèmes"],
    // B · f01464405b15
    "characters.tolla.hiddenDrives": ["Elle appréciait Ferro et est en colère de ne pas pouvoir le dire utilement"],
    // B · 3ea6a0e9593a
    "characters.tolla.values": ["Bon travail","Être payée pour un bon travail"],
    // B · 592e03d9ddad
    "characters.tolla.fears": ["Voir un autre des hommes de Ferro se noyer"],
    // A · 8456f26c2d97
    "characters.tolla.socialStyle": "Annonce le prix et détaille pourquoi.",
    // B · 01a58760d492
    "characters.tolla.boundaries": ["Ne travaillera pas à crédit deux fois"],
    // B · bb3112f31423
    "characters.tolla.goals": ["Garder le chantier ouvert","Ne pas assister à un autre enterrement pour ça"],
    // B · ff7e6faddad3
    "characters.tolla.secrets.tolla_the_survey.fact": "Ferro lui a payé une quille il y a neuf ans puis a dépensé cet argent pour le tiers est de la carte à la place.",
    // B · 47558a04be8d
    "characters.tolla.secrets.tolla_the_survey.visibility": "NPC_PRIVATE",
    // B · 34a9563fe31e
    "characters.tolla.secrets.tolla_the_survey.revealHint": "Elle en parle dès que tu demandes pour le relevé.",
    // A · 3333665f4019
    "characters.tolla.speechStyle": "Liste. Chiffres. Une blague à chaque conversation, dite sans enthousiasme.",
    // A · a9b198439ebf
    "characters.tolla.topics": ["la quille","l’expertise de la coque","Ferro Vane","les voiles d’avant","le coût d’une remise en état"],
    // A · a87ee9082b08
    "characters.tolla.voiceSamples": ["Fendue, pas cassée. C’est une vraie différence, et ça va vous coûter onze jours.","Il m’a payé ça il y a neuf ans. J’ai toujours l’argent. Ne m’en parle pas.","Tu peux avoir ça vite ou tu peux avoir ça qui flotte."],
    // B · 14d719462037
    "characters.tolla.appearance": "Dans la soixantaine, avant-bras comme des câbles, de la sciure coincée en permanence dans un sourcil.",
    // B · 3db4ffea4fea
    "characters.tolla.visualHook": "Une règle de charpentier toujours coincée derrière une oreille, l’argent usé aux plis.",
    // B · 07eefefa315a
    "characters.tolla.silhouette": "Trapue et campée, toujours un truc lourd dans une main.",
    // B · 1a34c807c843
    "characters.tolla.artSeed": "blackwake-tolla-01",
    // B · 8ce87cbf9d9a
    "characters.tolla.portrait": "story_blackwake/tolla",
    // B · 3856505b1829
    "characters.tolla.expressions": ["neutre","exaspérée","adoucie"],
    // B · 77ba1966a670
    "characters.tolla.knowledgeScope": ["ferro_vane","the_marrow","shipbuilding"],
    // B · 2a51d9c16d4b
    "characters.harrow_bell.name": "Harrow Bell",
    // A · a9fdd9eb2138
    "characters.harrow_bell.role": "Courtier au Drift",
    // A · 28625fcd00e7
    "characters.harrow_bell.cardBlurb": "Le courtier qui vous vendra les deux tiers ouest de votre propre carte, et qui veut savoir qui d’autre la réclame.",
    // B · 9bdf0106d724
    "characters.harrow_bell.pronouns": "iel",
    // A · 139da4a45b75
    "characters.harrow_bell.publicTraits": ["Émerveillé par tout","Se rappelle tous les prix payés"],
    // B · ca43111156a8
    "characters.harrow_bell.hiddenDrives": ["Iel finance discrètement trois recherches différentes pour la mer sans couronne"],
    // B · 4395a3f1d851
    "characters.harrow_bell.values": ["Un commerce propre","Savoir en premier"],
    // B · 20468d5c0d4a
    "characters.harrow_bell.fears": ["Un monde où le Dérive a un drapeau dessus"],
    // A · 2a15a4536e1a
    "characters.harrow_bell.socialStyle": "Répond à une question par une meilleure question et un prix.",
    // B · b8d0b8d361c5
    "characters.harrow_bell.boundaries": ["Ne vend pas les gens"],
    // B · d2fe8e4d15f0
    "characters.harrow_bell.goals": ["Posséder le dernier tiers de la carte","Tenir la Flotte hors du Dérive"],
    // B · be616021b97d
    "characters.harrow_bell.secrets.harrow_has_the_west.fact": "Iel a le tiers ouest de la carte de Ferro depuis six ans et n’a jamais trouvé l’est.",
    // B · 47558a04be8d
    "characters.harrow_bell.secrets.harrow_has_the_west.visibility": "NPC_PRIVATE",
    // B · 1a6df79cc906
    "characters.harrow_bell.secrets.harrow_has_the_west.revealHint": "Dès qu’iel voit ce que tu portes.",
    // A · b5a9c5c31f2d
    "characters.harrow_bell.speechStyle": "Sympathique, vif, toujours dans le vrai.",
    // A · 428eaaf8ecc0
    "characters.harrow_bell.topics": ["la carte de l’ouest","la Mer sans Couronne","le Silence","ce que paie la Flotte"],
    // A · 6197e2cef8a0
    "characters.harrow_bell.voiceSamples": ["Oh, c’est l’est. Le vrai est. Assieds-toi.","Je commencerai pas par t’insulter. Je le ferai au deuxième tour.","Quatre cents couronnes, c’est ce qu’ils paient. Pour toi. En propre. Félicitations."],
    // B · d15b518572bc
    "characters.harrow_bell.appearance": "Quarantaine, habillé avec neuf trucs dépareillés mais super classes.",
    // B · d2dbcc631b56
    "characters.harrow_bell.visualHook": "Neuf bagues, une à chaque doigt sauf l’index gauche, qui est nu et cicatrisé.",
    // B · ba5be08cc2ee
    "characters.harrow_bell.silhouette": "Manteaux superposés et chaînes pendantes ; une forme aux trop nombreux angles.",
    // B · fa9aeb37dd88
    "characters.harrow_bell.artSeed": "blackwake-harrow-01",
    // B · 7dae512bc2f5
    "characters.harrow_bell.portrait": "story_blackwake/harrow_bell",
    // B · 657eae15a6c6
    "characters.harrow_bell.expressions": ["neutre","ravie","prudente"],
    // B · c4ab2fabb78c
    "characters.harrow_bell.knowledgeScope": ["the_chart","crownless_sea","the_drift","relics"],
    // B · 0c6d039de3a2
    "factions.faction_fleet.name": "La Neuvième Flotte",
    // B · b83ff972357c
    "factions.faction_fleet.description": "La marine des royaumes côtiers. Ils fixent les primes, possèdent les cartes, et l’un de leurs lames a tué Ferro Vane.",
    // B · 2546c44e32c1
    "factions.faction_free_captains.name": "Les Capitaines Libres",
    // B · 70b3bd459d0a
    "factions.faction_free_captains.description": "Tous ceux qui naviguent sans pavillon. Pas une organisation — un accord sur quelques trucs, respecté à moitié.",
    // B · 85dab1eeb2ee
    "factions.faction_houses.name": "Les Maisons Marchandes",
    // B · 113f035521bb
    "factions.faction_houses.description": "Quatre familles qui possèdent la plupart des flottants. Ils ne se battent pas ; ils achètent ceux qui le font.",
    // B · 3f263e45a77b
    "quests.q_make_her_float.title": "La faire flotter",
    // B · d4e2eed45e36
    "quests.q_make_her_float.summary": "Le Marrow a une quille fêlée. Rien d’autre dans cette histoire ne se passe tant que ce n’est pas réglé.",
    // B · 7fcc0be2ad9c
    "quests.q_make_her_float.kind": "PRINCIPALE",
    // B · df955cc5e86c
    "quests.q_make_her_float.steps.see_the_damage.playerCopy": "Trouve quelqu’un qui connaît les coques pour regarder le Marrow.",
    // B · 0882ec99ba5c
    "quests.q_make_her_float.steps.see_the_damage.directorNotes": "Tolla Corrow est au chantier et ne cherchera rien d’autre. La mauvaise nouvelle est précise : quille fêlée, onze jours, et un prix.",
    // B · 1841f43ddbca
    "quests.q_make_her_float.steps.pay_for_the_keel.playerCopy": "Fais remplacer la quille. Tolla ne le fera pas deux fois gratuitement.",
    // B · a366ec342969
    "quests.q_make_her_float.steps.pay_for_the_keel.directorNotes": "Quatre façons, toutes vraiment différentes : bosser pour une maison marchande, bosser pour la Flotte, vendre quelque chose de Ferro, ou faire le boulot toi-même en onze jours.",
    // B · 26357a1a4937
    "quests.q_make_her_float.steps.pay_for_the_keel.enterWhen.flagsSet": ["sait :la_quille"],
    // B · 15cfd85a24f7
    "quests.q_make_her_float.steps.pay_for_the_keel.rewards.flags": ["elle_flotte"],
    // B · 1ce391216ce9
    "quests.q_make_her_float.steps.find_four_hands.playerCopy": "Un navire a besoin de quatre personnes. Trouve-en trois qui accepteront de venir.",
    // B · 8eb4f15a2b41
    "quests.q_make_her_float.steps.find_four_hands.directorNotes": "Nessa, Rook et Mako veulent chacun quelque chose de différent en premier. Cette étape, c’est le système d’équipe qui se présente : aucun d’eux n’est automatique.",
    // B · 15cfd85a24f7
    "quests.q_make_her_float.steps.find_four_hands.enterWhen.flagsSet": ["she_floats"],
    // B · 9656da15c08b
    "quests.q_make_her_float.steps.find_four_hands.rewards.flags": ["can_sail"],
    // B · 39afff37ae35
    "quests.q_make_her_float.steps.find_four_hands.rewards.abilities": ["set_the_terms"],
    // B · 14982e95b6a1
    "quests.q_make_her_float.involvedCharacterIds": ["tolla","nessa","mako"],
    // B · 041665726f16
    "quests.q_make_her_float.involvedLocationIds": ["saltmarket","the_marrow","the_yard"],
    // B · 0e82da7bcf24
    "quests.q_make_her_float.knownRewardCopy": "Un navire capable de quitter le port.",
    // B · 82b37bb4a786
    "quests.q_on_the_books.title": "Dans les Registres",
    // B · 46fb4fc22dac
    "quests.q_on_the_books.summary": "Le Marrow n’a pas été enregistré depuis neuf ans. Régler ça la rend légale et te rend traçable.",
    // B · eff80c847ff6
    "quests.q_on_the_books.kind": "PRINCIPALE",
    // B · 26357a1a4937
    "quests.q_on_the_books.discoverWhen.flagsSet": ["knows :the_keel"],
    // B · 08d3a80b11ba
    "quests.q_on_the_books.steps.register_her.playerCopy": "Fais inscrire le Marrow au registre du port.",
    // B · 1ccb22f68bc1
    "quests.q_on_the_books.steps.register_her.directorNotes": "C’est le seul moment dans l’histoire où la Neuvième Flotte n’est qu’un employé derrière un bureau. Nessa ne viendra pas avec toi et ne dira pas pourquoi.",
    // B · 49ac300ed2c8
    "quests.q_on_the_books.involvedCharacterIds": ["tolla","nessa"],
    // B · 57bfc6b90fb2
    "quests.q_on_the_books.involvedLocationIds": ["saltmarket","the_yard"],
    // B · d269a2395e5a
    "quests.q_on_the_books.knownRewardCopy": "Un navire que la Neuvième Flotte n’a aucune raison d’arrêter. Et un nom dans leur registre.",
    // B · c13922645437
    "quests.q_the_western_thirds.title": "Les Tiers de l’Ouest",
    // B · d1ae1dec9bc8
    "quests.q_the_western_thirds.summary": "Tu as l’est. Quelqu’un d’autre a le reste, et il t’attend depuis six ans.",
    // B · 7fcc0be2ad9c
    "quests.q_the_western_thirds.kind": "PRINCIPALE",
    // B · 9656da15c08b
    "quests.q_the_western_thirds.discoverWhen.flagsSet": ["can_sail"],
    // B · 57e862748181
    "quests.q_the_western_thirds.steps.reach_the_drift.playerCopy": "Navigue vers l’est jusqu’au Drift.",
    // B · 126e6b32dbcd
    "quests.q_the_western_thirds.steps.reach_the_drift.directorNotes": "Dix heures en pleine mer. La première fois que toute l’équipe est réunie sans rien à faire, c’est là qu’ils commencent à parler entre eux.",
    // B · 5a89b9440053
    "quests.q_the_western_thirds.steps.reach_the_drift.succeedWhen.flagsSet": ["visited :the_drift"],
    // B · 80f9ff807335
    "quests.q_the_western_thirds.steps.reach_the_drift.rewards.flags": ["knows :the_drift"],
    // B · cc03bf42276c
    "quests.q_the_western_thirds.steps.harrows_price.playerCopy": "Obtiens les deux tiers ouest auprès de Harrow Bell.",
    // B · 06f7ebc0abe0
    "quests.q_the_western_thirds.steps.harrows_price.directorNotes": "Harrow ne veut pas d’argent. Il veut savoir qui d’autre demande, ou une relique, ou une part de ce que tu trouves.",
    // B · 80f9ff807335
    "quests.q_the_western_thirds.steps.harrows_price.enterWhen.flagsSet": ["knows :the_drift"],
    // B · fee822a3ffd3
    "quests.q_the_western_thirds.steps.harrows_price.rewards.flags": ["chart_complete"],
    // B · dda459ec3ac5
    "quests.q_the_western_thirds.steps.harrows_price.rewards.abilities": ["ghost_the_hold"],
    // B · f191d57752d8
    "quests.q_the_western_thirds.involvedCharacterIds": ["harrow_bell","nessa","veyra"],
    // B · 6499e957185a
    "quests.q_the_western_thirds.involvedLocationIds": ["the_drift","saltmarket"],
    // B · 5f4c43cd3229
    "quests.q_the_western_thirds.knownRewardCopy": "Une carte complète, et un cap que personne d’autre n’a.",
    // B · 5affaf976155
    "quests.q_fit_her_out.title": "L’Equipement",
    // B · 57ed9a65e296
    "quests.q_fit_her_out.summary": "Une coque solide te mène jusqu’au Drift. Mais pas à travers la ceinture de tempêtes.",
    // B · 7fcc0be2ad9c
    "quests.q_fit_her_out.kind": "PRINCIPALE",
    // B · 9656da15c08b
    "quests.q_fit_her_out.discoverWhen.flagsSet": ["can_sail"],
    // B · 8f837bd65810
    "quests.q_fit_her_out.steps.choose_her_shape.playerCopy": "Décide à quoi sert le Marrow, et équipe-la en conséquence.",
    // B · 3b4a4a5d7457
    "quests.q_fit_her_out.steps.choose_her_shape.directorNotes": "Trois formes, et un joueur peut finir par avoir les trois, mais pas avant Stormlee. Vitesse, portée, ou capacité à garder les gens en vie.",
    // B · 888a7e7b28a2
    "quests.q_fit_her_out.steps.choose_her_shape.rewards.abilities": ["rake_her"],
    // B · aabb443c5951
    "quests.q_fit_her_out.steps.storm_ready.playerCopy": "Fais passer le Marrow à travers la ceinture de tempêtes jusqu’à Stormlee.",
    // B · 8531d88cc32e
    "quests.q_fit_her_out.steps.storm_ready.directorNotes": "La ressource coque est le jet principal ici. Un navire avec peu de coque la perd et le monde le signale avant que ça arrive.",
    // B · d633abd2e6e5
    "quests.q_fit_her_out.steps.storm_ready.enterWhen.flagsSet": ["ship_upgraded"],
    // B · 7f090504fb40
    "quests.q_fit_her_out.steps.storm_ready.succeedWhen.flagsSet": ["visited :stormlee"],
    // B · 0b1688b7a43f
    "quests.q_fit_her_out.steps.storm_ready.rewards.flags": ["knows :stormlee"],
    // B · be95e08a9745
    "quests.q_fit_her_out.steps.storm_ready.rewards.abilities": ["boarding_rush"],
    // B · a59882bd5fff
    "quests.q_fit_her_out.involvedCharacterIds": ["tolla","rook","harrow_bell"],
    // B · bba362cd3eb9
    "quests.q_fit_her_out.involvedLocationIds": ["the_yard","the_drift"],
    // B · 19096c1ae133
    "quests.q_fit_her_out.knownRewardCopy": "Un navire capable de fuir, dépasser ou tenir face à ce qui arrive.",
    // B · 2fe61257b4f3
    "quests.q_what_nessa_owes.title": "Ce que doit Nessa",
    // B · f76df7befd58
    "quests.q_what_nessa_owes.summary": "Elle a navigué avec Ferro pendant deux ans et est partie de son navire à Stormlee. Elle n’a jamais dit pourquoi.",
    // B · 552c0b7f83c2
    "quests.q_what_nessa_owes.kind": "SIDE",
    // B · a9ac2e427fa3
    "quests.q_what_nessa_owes.discoverWhen.flagsSet": ["crew :nessa"],
    // B · c673271506c7
    "quests.q_what_nessa_owes.steps.she_tells_you.playerCopy": "Fais dire à Nessa comment elle reconnaît l’écriture de Ferro.",
    // B · 1f3f8ac88395
    "quests.q_what_nessa_owes.steps.she_tells_you.directorNotes": "Elle ne se laissera pas faire. La Confiance, ou être à Stormlee quand c’est arrivé, ou avoir traversé la Flotte comme elle l’a fait.",
    // B · 94f32c59897e
    "quests.q_what_nessa_owes.steps.she_tells_you.rewards.flags": ["knows :ferro_was_close"],
    // B · 4e9a39e98c1d
    "quests.q_what_nessa_owes.steps.she_tells_you.rewards.abilities": ["read_the_water"],
    // B · bb48684c2b85
    "quests.q_what_nessa_owes.involvedCharacterIds": ["nessa"],
    // B · e3d650644655
    "quests.q_what_nessa_owes.involvedLocationIds": ["stormlee","the_marrow"],
    // B · 42fc31088125
    "quests.q_what_nessa_owes.knownRewardCopy": "La moitié de l’histoire que ton gardien ne t’a jamais racontée.",
    // B · 64e407819a11
    "quests.q_what_rook_knows.title": "Ce que sait Rook",
    // B · 77b493005d61
    "quests.q_what_rook_knows.summary": "Il porte la même lame qui a tué ton gardien, et il n’arrête pas de commencer la phrase.",
    // B · 552c0b7f83c2
    "quests.q_what_rook_knows.kind": "SIDE",
    // B · 1b77ff7c0c19
    "quests.q_what_rook_knows.discoverWhen.flagsSet": ["spoke :rook"],
    // B · 66e7bbffe273
    "quests.q_what_rook_knows.steps.why_he_left.playerCopy": "Découvre pourquoi Rook Arden est parti d’un navire de la Neuvième Flotte.",
    // B · 2b072a706e51
    "quests.q_what_rook_knows.steps.why_he_left.directorNotes": "Tout Saltmarket le sait à moitié. Rook te le dira lui-même si tu lui demandes franchement ; Harrow le vendra ; le journal de la Flotte le dit.",
    // B · d216cc099b54
    "quests.q_what_rook_knows.steps.the_blade.playerCopy": "Découvre où était la lame de Rook il y a onze jours.",
    // B · 0d5500c8acc4
    "quests.q_what_rook_knows.steps.the_blade.directorNotes": "La voie honnête lui coûte tout à dire et vaut le plus. Les autres voies donnent le fait mais coûtent la relation.",
    // B · f7b1cb4fe804
    "quests.q_what_rook_knows.steps.the_blade.enterWhen.flagsSet": ["knows :rook_left_the_fleet","crew :rook"],
    // B · 80a0cefd3d69
    "quests.q_what_rook_knows.steps.the_blade.rewards.flags": ["knows :veyra_hunts_you"],
    // B · 6c7aadf7ae8c
    "quests.q_what_rook_knows.involvedCharacterIds": ["rook","veyra"],
    // B · 36c91a34dc55
    "quests.q_what_rook_knows.involvedLocationIds": ["saltmarket","the_marrow"],
    // B · 51fe37b5e1e9
    "quests.q_what_rook_knows.knownRewardCopy": "Un nom. L’officier qui a donné l’ordre.",
    // B · ab3df291e9fb
    "quests.q_what_mako_lost.title": "Ce que Mako a perdu",
    // B · fabe5f71f9e7
    "quests.q_what_mako_lost.summary": "Elle sait où est une relique parce qu’elle a vu son frère se noyer pour l’atteindre.",
    // B · 552c0b7f83c2
    "quests.q_what_mako_lost.kind": "SIDE",
    // B · ce2237092baa
    "quests.q_what_mako_lost.discoverWhen.flagsSet": ["crew :mako"],
    // B · 05d8e3d1df8e
    "quests.q_what_mako_lost.steps.go_back.playerCopy": "Ramène Mako à l’épave près de Stormlee.",
    // B · 17d7562c44f8
    "quests.q_what_mako_lost.steps.go_back.directorNotes": "Elle n’y est jamais retournée. Y arriver est toute l’étape ; si elle descend, c’est une scène, pas un jet.",
    // B · a15233c4cc8c
    "quests.q_what_mako_lost.steps.go_back.succeedWhen.flagsSet": ["visited :stormlee","crew :mako"],
    // B · e7bec7aaa16d
    "quests.q_what_mako_lost.steps.go_back.rewards.flags": ["sait :l_epave"],
    // B · a6a42d1365cd
    "quests.q_what_mako_lost.steps.bring_it_up.playerCopy": "Sors le Stillpoint de l’épave.",
    // B · a7160e643c2e
    "quests.q_what_mako_lost.steps.bring_it_up.directorNotes": "Quatorze brasses. Mako peut le faire, ou le joueur peut plonger avec le Hush qui sonne, ou personne ne descend et elle doit vivre avec ça.",
    // B · e7bec7aaa16d
    "quests.q_what_mako_lost.steps.bring_it_up.enterWhen.flagsSet": ["sait :l_epave"],
    // B · ef7c1ce57c55
    "quests.q_what_mako_lost.steps.bring_it_up.rewards.abilities": ["utiliser_stillpoint"],
    // B · 344d71cc86bb
    "quests.q_what_mako_lost.involvedCharacterIds": ["mako"],
    // B · 4f7876fc8529
    "quests.q_what_mako_lost.involvedLocationIds": ["stormlee"],
    // B · 9580ed0ba243
    "quests.q_what_mako_lost.knownRewardCopy": "Le Stillpoint, et Mako de retour sur le bateau après.",
    // B · 706bd2c44fb6
    "quests.q_the_cracked_bell.title": "La Cloche Fêlée",
    // B · 81606d8f2aa5
    "quests.q_the_cracked_bell.summary": "Une cloche sans battant, posée sur une table au Drift, que personne n’explique et dont tout le monde s’écarte.",
    // B · eff80c847ff6
    "quests.q_the_cracked_bell.kind": "PRINCIPALE",
    // B · 5a89b9440053
    "quests.q_the_cracked_bell.discoverWhen.flagsSet": ["visité :le_drift"],
    // B · 068b7ce59696
    "quests.q_the_cracked_bell.steps.work_out_what_it_does.playerCopy": "Choppe la cloche fêlée et découvre ce qu’elle fait vraiment.",
    // B · 71b0c250de30
    "quests.q_the_cracked_bell.steps.work_out_what_it_does.directorNotes": "Un reliquat enfreint exactement une règle et rien d’autre. Le Hush tue les sons dans un rayon de quarante pieds pendant onze secondes. Ça ne te rend pas invisible, ça n’arrête pas une lame, et ça ne fait jamais deux choses à la fois.",
    // B · 93ac3de1cfd3
    "quests.q_the_cracked_bell.steps.work_out_what_it_does.rewards.flags": ["accordé_au_hush"],
    // B · 8d16ecb4e4cd
    "quests.q_the_cracked_bell.steps.work_out_what_it_does.rewards.abilities": ["sonner_le_hush"],
    // B · f3a2b29b0421
    "quests.q_the_cracked_bell.involvedCharacterIds": ["harrow_bell","nessa"],
    // B · 663b03f5ee77
    "quests.q_the_cracked_bell.involvedLocationIds": ["le_drift"],
    // B · a75b82f1759a
    "quests.q_the_cracked_bell.knownRewardCopy": "Onze secondes de silence absolu, quand tu veux.",
    // B · 25b467c6d089
    "quests.q_the_pressed_men.title": "Les Pressés",
    // B · f27882515627
    "quests.q_the_pressed_men.summary": "La Neuvième Flotte prend des équipages comme elle l’a toujours fait. Ce que tu fais de ça, c’est ce qui fait ta prime.",
    // B · 552c0b7f83c2
    "quests.q_the_pressed_men.kind": "SECONDAIRE",
    // B · 9656da15c08b
    "quests.q_the_pressed_men.discoverWhen.flagsSet": ["peut_naviguer"],
    // B · 4bd223cc063b
    "quests.q_the_pressed_men.steps.the_press_gang.playerCopy": "Neuf hommes sont embarqués sur le quai de Saltmarket. Décide ce que ça représente pour toi.",
    // B · a8db445c44d3
    "quests.q_the_pressed_men.steps.the_press_gang.directorNotes": "C’est le système de prime exposé clairement : un même acte est un héroïsme pour une faction et un acte de piraterie pour une autre, et ça ne dépend pas de la force du joueur.",
    // B · 923a3180dc43
    "quests.q_the_pressed_men.involvedCharacterIds": ["veyra","nessa","rook"],
    // B · d21b99e5f0b1
    "quests.q_the_pressed_men.involvedLocationIds": ["saltmarket","le_drift"],
    // B · 9aa560a09eae
    "quests.q_the_pressed_men.knownRewardCopy": "Une réputation. Celle que tu choisis.",
    // B · 19ac976e441a
    "quests.q_the_crownless.title": "La Mer Sans Couronne",
    // B · cf4a6cd60e00
    "quests.q_the_crownless.summary": "Quarante ans de la vie d’un homme, et la raison pour laquelle un capitaine de la Neuvième Flotte l’a fait tuer pour ça.",
    // B · 7fcc0be2ad9c
    "quests.q_the_crownless.kind": "PRINCIPALE",
    // B · fee822a3ffd3
    "quests.q_the_crownless.discoverWhen.flagsSet": ["carte_complete"],
    // B · a24ee870074d
    "quests.q_the_crownless.steps.the_heading.playerCopy": "Emmène la carte complète à Stormlee et trouve un cap.",
    // B · c12bd073ee10
    "quests.q_the_crownless.steps.the_heading.directorNotes": "La boussole et la carte complète pointent vers un point d’océan à neuf cents milles de partout. C’est la dernière scène calme.",
    // B · 07474074d558
    "quests.q_the_crownless.steps.the_heading.succeedWhen.flagsSet": ["visité :stormlee","carte_complete"],
    // B · 71964b9b8b38
    "quests.q_the_crownless.steps.the_heading.rewards.flags": ["sait :le_cap"],
    // B · 77af595f155f
    "quests.q_the_crownless.steps.veyra_asks.playerCopy": "Le capitaine Veyra Sol t’attend au bord de la ceinture d’orage. Elle veut parler d’abord.",
    // B · b7bb5a7babd4
    "quests.q_the_crownless.steps.veyra_asks.directorNotes": "Elle propose de rendre la carte et tout le monde rentre chez soi. Elle est sérieuse. Le joueur peut la prendre, la refuser, ou découvrir ce qu’elle protège.",
    // B · 71964b9b8b38
    "quests.q_the_crownless.steps.veyra_asks.enterWhen.flagsSet": ["sait :le_cap"],
    // B · 3909e3b2d07b
    "quests.q_the_crownless.steps.veyra_asks.rewards.flags": ["sait :pourquoi_ce_n_est_pas_carte"],
    // B · fa695f811c25
    "quests.q_the_crownless.involvedCharacterIds": ["veyra","nessa","harrow_bell"],
    // B · 2e065f762b65
    "quests.q_the_crownless.involvedLocationIds": ["stormlee","the_crownless"],
    // B · a8dce902e4e3
    "quests.q_the_crownless.knownRewardCopy": "Ce qui n’est sur aucune carte, et la raison pour laquelle ce n’est pas le cas.",
    // B · fdf0a9bcac5d
    "worldEvents.we_the_fleet_asks.publicCopy": "Un cutter de la Neuvième Flotte arrive à marée haute et un lieutenant parcourt le quai en demandant, poliment, si quelqu’un a vu une boussole en laiton.",
    // B · 87f45a27c7b9
    "worldEvents.we_the_fleet_asks.directorNotes": "La Flotte cherche la boussole, pas le joueur. Pas encore. Personne n’est arrêté. Le but est que le joueur sache qu’on le cherche avant qu’on ne le trouve.",
    // B · 14754ab1e4b6
    "worldEvents.we_the_fleet_asks.setsFlags": ["sait :la_flotte_cherche"],
    // B · fd3cdad63e12
    "worldEvents.we_the_press_gang.publicCopy": "La presse descend sur le quai à la première lumière et embarque neuf hommes du quai aux poissons. L’un d’eux crie un nom encore et encore, auquel personne ne répond.",
    // B · d42335aed628
    "worldEvents.we_the_press_gang.directorNotes": "C’est q_les_hommes_pressés qui devient une scène à une heure précise plutôt qu’une option dans un menu. Si le joueur est ailleurs, il l’apprend après.",
    // B · a2b2504ce141
    "worldEvents.we_the_press_gang.setsFlags": ["sait :la_presse"],
    // B · 5da5f68d0aa6
    "worldEvents.we_the_press_gang.cancelledByFlags": ["a_libere_les_hommes_pressés"],
    // B · 9eb4185e1d22
    "worldEvents.we_tolla_gives_up.publicCopy": "Tolla Corrow a dégagé le berceau du Marrow et a cloué une note avec ton nom sur la porte de la cabane. Elle a besoin de la cale.",
    // B · 7e28332e60b4
    "worldEvents.we_tolla_gives_up.directorNotes": "Le chantier n’est pas infini. Si la quille n’est pas payée au troisième jour, le navire est retiré de la cale et le joueur doit trouver une autre solution.",
    // B · 2cfcf426b2dc
    "worldEvents.we_tolla_gives_up.setsFlags": ["le_chantier_veut_la_cale"],
    // B · 15cfd85a24f7
    "worldEvents.we_tolla_gives_up.cancelledByFlags": ["il_flotte"],
    // B · 26357a1a4937
    "worldEvents.we_tolla_gives_up.requiresFlags": ["sait :la_quille"],
    // B · dd9fe54b0ed2
    "worldEvents.we_harrow_hears.publicCopy": "La rumeur a atteint le Drift avant toi. Harrow Bell a dégagé la table sous la lanterne et s’y assied, sans rien dessus, comme pour attendre quelqu’un.",
    // B · 88838abecae1
    "worldEvents.we_harrow_hears.directorNotes": "La notoriété n’est pas la force. Ça se déclenche parce que le joueur a fait quelque chose dont on parle, et ça change ce que Harrow dira en premier.",
    // B · 8d940526ee20
    "worldEvents.we_harrow_hears.setsFlags": ["harrow_t’attend"],
    // B · 80f9ff807335
    "worldEvents.we_harrow_hears.requiresFlags": ["sait :le_drift"],
    // B · f01dbcac8990
    "worldEvents.we_the_bounty_posted.publicCopy": "La prime est affichée en même temps dans quatre ports, ce qui veut dire que la Flotte a payé pour que ça aille vite. Ce n’est pas une grosse somme. C’est une prime imprimée, avec ton nom dessus.",
    // B · 327e84ec117b
    "worldEvents.we_the_bounty_posted.directorNotes": "Ça se déclenche à cause de ce que le joueur a fait contre la Flotte, pas à cause de sa force. Un joueur qui n’a jamais croisé la Flotte ne la verra jamais.",
    // B · 21a1030ab2a5
    "worldEvents.we_the_bounty_posted.setsFlags": ["prime_affichée"],
    // B · cc83695a9978
    "worldEvents.we_the_bounty_posted.cancelledByFlags": ["a_pris_la_commission_de_la_flotte"],
    // B · 5da5f68d0aa6
    "worldEvents.we_the_bounty_posted.requiresFlags": ["a_libere_les_hommes_pressés"],
    // B · 776b448a2c0c
    "worldEvents.we_veyra_at_the_belt.publicCopy": "Une frégate de la Neuvième Flotte est à l’ancre côté calme de Stormlee, avec ses canons rentrés, et une chaloupe est déjà à l’eau qui vient vers toi.",
    // B · 4cd3d83980aa
    "worldEvents.we_veyra_at_the_belt.directorNotes": "Veyra n’ouvre pas le feu. Elle est venue offrir au joueur une sortie qu’elle pense sincère. Ses canons sont rentrés et le texte ne doit pas les décrire autrement.",
    // B · 572e64b7a866
    "worldEvents.we_veyra_at_the_belt.setsFlags": ["veyra_attend"],
    // B · 9cd5ba7aeeae
    "worldEvents.we_veyra_at_the_belt.cancelledByFlags": ["a_abandonne_la_carte"],
    // B · 0b1688b7a43f
    "worldEvents.we_veyra_at_the_belt.requiresFlags": ["sait :stormlee"],
    // B · e82d9dc4b3fa
    "promises.p_who_killed_ferro.kind": "MYSTÈRE",
    // B · a7ca087e82f2
    "promises.p_who_killed_ferro.label": "Qui a planté une lame navale dans Ferro Vane",
    // B · 75f573f7a623
    "promises.p_who_killed_ferro.seedHint": "La blessure, la marque, et le fait que rien n’a été volé. Rook a la même lame et commence souvent une phrase à ce sujet.",
    // B · e760a7a95d4e
    "promises.p_who_killed_ferro.payoffHint": "Veyra Sol a donné l’ordre et ne s’attendait pas à ce que ce soit fait ainsi. Elle le dit elle-même, sans qu’on lui demande.",
    // B · d77ebfcebe44
    "promises.p_the_crownless.kind": "FINALE",
    // B · af30fefbb200
    "promises.p_the_crownless.label": "Pourquoi neuf cents milles carrés d’océan ne sont sur aucune carte",
    // B · 989cacd2c89d
    "promises.p_the_crownless.seedHint": "La boussole pointe quelque part où aucune boussole ne pointe, et ce qu’elle pointe bouge.",
    // B · 97d8c5b0bf20
    "promises.p_the_crownless.payoffHint": "Ce qui est là a pris onze membres d’équipage de Veyra et elle n’est pas sûre qu’ils soient morts. Le joueur le voit lui-même.",
    // B · 63a719ec7f2d
    "promises.p_veyra.kind": "RIVALITÉ",
    // B · a46d2bb92690
    "promises.p_veyra.label": "Le capitaine qui te chasse poliment",
    // B · 843a49239ee3
    "promises.p_veyra.seedHint": "Elle est décrite avant d’apparaître, toujours par quelqu’un qui l’aimait.",
    // B · e7a1da5595d9
    "promises.p_veyra.payoffHint": "Elle propose au joueur de rendre la carte et de rentrer chez lui, et elle le pense vraiment, et accepter ça est une vraie fin.",
    // B · 445cd8deebc2
    "promises.p_the_crew.kind": "RELATION",
    // B · 6ee2ecc0d396
    "promises.p_the_crew.label": "Si ces quatre peuvent être une équipe",
    // B · 26d29a4a0c4f
    "promises.p_the_crew.seedHint": "Nessa ne regarde pas Rook. Mako a seize ans et personne ne l’a encore dit à voix haute.",
    // B · 6b1cffad40dc
    "promises.p_the_crew.payoffHint": "Soit ils tiennent ensemble dans la ceinture de tempête, soit le joueur découvre lequel d’entre eux n’était là que de passage.",
    // B · f8b4a6708d82
    "promises.p_relics.kind": "THÈME",
    // B · 1c403e4d4fb4
    "promises.p_relics.label": "Une relique enfreint une règle et rien d’autre",
    // B · 12793c5a36b2
    "promises.p_relics.seedHint": "Une cloche sans battant sur une table que tout le monde évite.",
    // B · eabe136f0e42
    "promises.p_relics.payoffHint": "Le joueur apprend à construire autour de la seule règle qu’une relique enfreint, ou gagne sans jamais en tenir une.",
    // B · 19ac976e441a
    "endings.end_crownless.name": "La Mer Sans Couronne",
    // B · f8b8333fe7bc
    "endings.end_crownless.rarity": "RARE",
    // B · fee822a3ffd3
    "endings.end_crownless.requires.flagsSet": ["chart_complete"],
    // B · 6c1e0ba4c44a
    "endings.end_crownless.requires.atLocation": "the_crownless",
    // B · 02bedbc66082
    "endings.end_crownless.condition": "Le joueur a terminé la carte sur laquelle son père a passé sa vie et a navigué jusqu’à l’endroit qu’elle indique. Ce qui s’y trouve réellement appartient à l’histoire elle-même et ce n’est pas un trésor — écris ce que quarante ans de certitude de quelqu’un d’autre ressemblent quand tu y es.",
    // A · 7729af4dbf74
    "endings.end_crownless.epilogue": "La boussole cesse d’être utile dès qu’elle pointe juste. Peu importe ce que la côte raconte, la carte est complète et elle est entre tes mains — c’est ce que Ferro n’a pas eu.",
    // B · 1fe06642976d
    "endings.end_crownless.hint": "La boussole pointe quelque part où aucune carte imprimée n’admet.",
    // B · 341f36fb599c
    "endings.end_feared.name": "Le Nom Qu’on Utilise Pour Faire Peur",
    // B · 734e45c160cf
    "endings.end_feared.rarity": "PEU COMMUN",
    // B · 21a1030ab2a5
    "endings.end_feared.requires.flagsSet": ["bounty_posted"],
    // B · c164ab3a4465
    "endings.end_feared.condition": "La prime est élevée, les Capitaines Libres considèrent le joueur comme un sérieux, et la Mer Sans Couronne est devenue quelque chose dont le joueur parle plutôt qu’il ne navigue vers elle. Ce n’est pas un échec — c’est la vie que la plupart des gens dans ce monde choisiraient vraiment.",
    // A · 7de671973d07
    "endings.end_feared.epilogue": "Le chiffre sur le papier n’est plus une insulte autour de la troisième révision. La boussole de Ferro reste dans un tiroir, et il y a toujours une autre saison.",
    // B · b45aa450c1b0
    "endings.end_privateer.name": "Un Pavillon, À La Fin",
    // B · 734e45c160cf
    "endings.end_privateer.rarity": "PEU COMMUN",
    // B · cc83695a9978
    "endings.end_privateer.requires.flagsSet": ["took_fleet_commission"],
    // B · d6e84979a4ee
    "endings.end_privateer.condition": "Le joueur a pris la commission de la Neuvième Flotte et l’a gardée — la marine dont la lame a tué Ferro Vane. Écris ce qu’elle a acheté et ce qu’elle a coûté, sans que personne ne rende de verdict.",
    // A · 9a12c0aeb7a6
    "endings.end_privateer.epilogue": "Les papiers rendent légaux les mêmes actes que la prime rendait pendables. Nessa ne remonte plus à bord. La Mer sans Couronne reste hors carte, c’est ce que quelqu’un voulait depuis le début.",
    // B · fe600119427c
    "endings.end_charts_open.name": "Plus Hors Carte",
    // B · f7fc172f729a
    "endings.end_charts_open.rarity": "UNIQUE",
    // B · b73487d378a2
    "endings.end_charts_open.requires.flagsSet": ["chart_complete","knows :the_order_came_from_above"],
    // B · 6c43059753b0
    "endings.end_charts_open.condition": "Le joueur a découvert qui a retiré la Mer Sans Couronne des cartes et a rendu la carte publique au lieu de la garder. Cela met fin à ce que Veyra a passé sa vie à protéger, et elle a raison sur ce que ça coûte. Accessible que le joueur ait navigué là-bas ou pas.",
    // A · 5cde510c5901
    "endings.end_charts_open.epilogue": "D’ici un an, elle est sur une carte imprimée, mal faite, en quatre versions rivales. Tout ce que Veyra disait commence à arriver. Ferro n’apparaît sur aucune d’elles.",
    // B · 2fce39c22056
    "endings.end_charts_open.hint": "Quelqu’un l’a délibérément retirée des cartes, il y a quatre-vingt-dix ans.",
    // B · 42a2306101e0
    "endings.end_crew_gone.name": "À Effectif Réduit",
    // B · 734e45c160cf
    "endings.end_crew_gone.rarity": "PEU COMMUN",
    // B · 2266f644090a
    "endings.end_crew_gone.requires.flagsSet": ["nessa_gone","rook_gone"],
    // B · b3973c6f3f93
    "endings.end_crew_gone.condition": "Les personnes qui s’étaient engagées sont parties, une à une, pour leurs propres raisons. Le joueur peut encore avoir un navire et une carte. Ne fais pas de ça une leçon — écris le silence particulier d’un pont tenu par des étrangers.",
    // A · daf541feaa01
    "endings.end_crew_gone.epilogue": "Le navire continue de voguer. Quelqu’un d’autre tient la boussole, il est pleinement compétent, et il n’a jamais rencontré Ferro Vane.",
    // B · 175aed37b1e7
    "endings.end_ashore.name": "Le Chantier À Ton Nom",
    // B · c9d08ae5d876
    "endings.end_ashore.rarity": "COMMUN",
    // B · b0eff3470103
    "endings.end_ashore.requires.flagsSet": ["left_the_map"],
    // B · 21a1030ab2a5
    "endings.end_ashore.requires.flagsUnset": ["bounty_posted"],
    // B · 7d3de63f8fde
    "endings.end_ashore.condition": "Le joueur a quitté la chasse sans rien sur la tête. Une fin calme, réelle — celle que Ferro n’a jamais prise — et l’histoire ne doit pas la traiter comme un abandon.",
    // A · 03deadf0f688
    "endings.end_ashore.epilogue": "La boussole décore une étagère où les visiteurs demandent son histoire. Tu racontes honnêtement, ils pensent que c’est un conte. Personne sur la côte ne te cherche.",
    // B · b94021579eb0
    "endings.end_drift.name": "L’Équipage T’Enterre À Terre",
    // B · f8b8333fe7bc
    "endings.end_drift.rarity": "RARE",
    // B · d46524b8ff44
    "endings.end_drift.requires.flagsSet": ["attuned_stillpoint"],
    // B · b5982a3c966a
    "endings.end_drift.requires.hasItems": ["the_hush"],
    // B · c67ca23482d1
    "endings.end_drift.condition": "Le joueur a continué à s’enfoncer dans le Dérive avec des reliques à bord jusqu’à ce que ça prenne ce qu’il faut. Accessible sans aucune erreur — ce monde dit que les reliques enfreignent chacune une règle et le pense vraiment.",
    // A · 5b0931402c61
    "endings.end_drift.epilogue": "L’équipage fait ça bien, au-dessus de la ligne de marée, comme Ferro ne l’a jamais fait. Le Stillpoint reste avec toi parce que personne à bord ne veut le toucher.",
    // B · f17daccc0c72
    "endings.end_drift.hint": "Chaque relique enfreint exactement une règle, jamais celle que tu regardes.",
    // A · d39b793fe4fe
    "archetypes.arch_apprentice.name": "L’Apprenti de Ferro",
    // B · 44a315ea133e
    "archetypes.arch_apprentice.role": "Navigation et vieux cartes",
    // A · 98b9c57fdb25
    "archetypes.arch_apprentice.summary": "Tu as grandi dans l’atelier. Tu lis l’eau et les cartes mieux que personne de ton âge, et tu te bats à peu près comme on s’y attend.",
    // A · a980b87b003c
    "archetypes.arch_apprentice.playstyle": ["Navigation","Connaissances","Nul au combat"],
    // A · c44f0d802c3d
    "archetypes.arch_apprentice.blurb": "Quarante ans de notes d’un homme, et tu es la seule personne vivante à pouvoir toutes les lire. Il ne t’a jamais appris à tenir correctement le sabre, ce qui en dit long sur ce qu’il pensait important.",
    // B · 4e9a39e98c1d
    "archetypes.arch_apprentice.startingAbilities": ["read_the_water"],
    // A · cd4e1be0ebb3
    "archetypes.arch_quayside.name": "Le Quais",
    // B · e64178ff4e9f
    "archetypes.arch_quayside.role": "Lames et abordage",
    // A · 8b6451621c83
    "archetypes.arch_quayside.summary": "Tu te bats sur la pierre mouillée depuis tes onze ans. Tu fonces en premier, tu arrives, et personne ne t’a jamais demandé de tracer une route.",
    // A · e07726d1ac1a
    "archetypes.arch_quayside.playstyle": ["Agressif","Corps à corps","Nul en cartes"],
    // A · a1c5a4bc8183
    "archetypes.arch_quayside.blurb": "Ferro t’a nourri pendant neuf ans et n’a jamais demandé ce que tu faisais entre la fermeture de l’atelier et le matin. Il savait. Tout le monde sur le quai savait.",
    // B · be95e08a9745
    "archetypes.arch_quayside.startingAbilities": ["boarding_rush"],
    // A · f7a28016bf68
    "archetypes.arch_powder.name": "Poudre",
    // B · 3f7ae8ca6e1d
    "archetypes.arch_powder.role": "Canons et tir à distance",
    // A · f14665771934
    "archetypes.arch_powder.summary": "Tu as passé deux ans dans l’équipe de canonniers d’un navire marchand. Tu peux toucher la coque à une distance à laquelle personne ne s’attend, si quelqu’un d’autre tient la barre.",
    // A · 664b7f950ba6
    "archetypes.arch_powder.playstyle": ["À distance","Technique","A besoin d’une équipe"],
    // A · 9a887d262690
    "archetypes.arch_powder.blurb": "Tu comptes encore à voix basse quand ça fait du bruit. Deux ans, et personne t’a jamais dit d’arrêter.",
    // B · 888a7e7b28a2
    "archetypes.arch_powder.startingAbilities": ["rake_her"],
    // A · a922f83a0b58
    "archetypes.arch_ledger.name": "Coureur de registres",
    // B · e1349f6a2bb7
    "archetypes.arch_ledger.role": "Négociation et cales",
    // A · 0b2c8438565f
    "archetypes.arch_ledger.summary": "Tu gérais les manifestes pour une maison marchande et tu sais exactement combien tout vaut sur cette côte, y compris les gens.",
    // A · 27c6841136e2
    "archetypes.arch_ledger.playstyle": ["Social","Discret","Fragile"],
    // A · bbd7bca0a448
    "archetypes.arch_ledger.blurb": "La maison t’a rayé de ses listes il y a onze mois pour quatre cents couronnes que tu n’as pas prises. Tu sais qui les a prises, et tu gardes ça pour toi depuis.",
    // B · 71689e269e95
    "archetypes.arch_ledger.startingAbilities": ["set_the_terms","ghost_the_hold"],
    // B · 01a0812f8b2c
    "setupFields.displayName.label": "Comment ils t’appellent sur le quai ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · bf7143b855a2
    "setupFields.displayName.placeholder": "ex. Sable Vane",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 5965ecf877b1
    "setupFields.pronouns.placeholder": "ex. elle",
    // B · 99bed5e83ba9
    "setupFields.archetype.label": "Qu’est-ce que Ferro t’a appris ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHETYPE",
    // B · 2850de242584
    "setupFields.archetype.helpText": "Ce que tu étais avant l’atelier. Ça fixe tes attributs, ta formation et ta première technique, et ça décide quelles voies s’ouvrent tôt dans un problème. C’est fixé pour cette partie. Ça ne décide pas de ta force finale : reliques, un navire et une équipe se trouvent en jeu, et une partie sans relique peut quand même finir.",
    // B · 0d34de47c138
    "setupFields.worldKnowsAboutYou.label": "Quelqu’un à Saltmarket connaît-il ton nom ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · 8d4cecd74834
    "setupFields.worldKnowsAboutYou.helpText": "La notoriété commence à zéro pour tout le monde. C’est juste ce que les gens pensent déjà, ce qui est différent — et c’est ce qu’ils évoquent en premier.",
    // B · e7eef34d55f9
    "setupFields.worldKnowsAboutYou.placeholder": "ex. Je suis celle qui courait des messages pour le vieux avec la boussole, et personne n’a encore décidé si c’est triste ou louche.",
    // B · 4040bd84f558
    "setupFields.what_ferro_was.label": "Qu’était Ferro Vane pour toi ?",
    // B · b6a31c665c0b
    "setupFields.what_ferro_was.kind": "CHOIX",
    // B · 38026e9ae436
    "setupFields.what_ferro_was.helpText": "Définit la perte sur laquelle toute l’histoire repose, avec tes mots plutôt que ceux du monde.",
    // B · 9a022ce706d6
    "setupFields.what_ferro_was.options.the_only_one.label": "La seule famille que tu aies jamais eue",
    // B · eba7332b1702
    "setupFields.what_ferro_was.options.took_you_in.label": "Un homme qui t’a recueilli sans jamais expliquer pourquoi",
    // B · 332c3185460d
    "setupFields.what_ferro_was.options.an_employer.label": "Un employeur que tu as fini par aimer",
    // B · 125f4f3a7370
    "setupFields.what_ferro_was.options.a_disappointment.label": "Quelqu’un à qui tu avais cessé de parler",
    // B · f6093d6587c4
    "setupFields.appearance.label": "Qu’est-ce que les gens remarquent en premier ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · e34ad16cde3a
    "setupFields.appearance.placeholder": "ex. Un coup de soleil en forme de chapeau que je n’ai pas porté depuis un mois, et un manteau trois tailles trop grand qui était à lui.",
    // B · 3aa4328667d6
    "protagonist.kind": "BLANK",
    // A · 9ce25709839c
    "opening": "L’atelier sent encore le lin, et ça fait onze jours.\n\nTu es sur le quai à Saltmarket à sept heures du matin avec tout ce que t’a laissé Ferro Vane : un cutter de quarante pieds avec une quille fendue, un tiers de carte dont un côté est net, et une boussole en laiton qui ne pointe vers rien à l’est depuis que tu la connais.\n\nLa Marrow est appuyée contre le mur. Elle n’a pas pris la mer depuis neuf ans.\n\nNessa Vale est là, à une table sur le port à six mètres, elle copie une autre carte pour de l’argent et elle t’a déjà regardé deux fois. Elle était aux funérailles. Personne ne l’a invitée.\n\nTu peux pas naviguer seul sur ce bateau, et personne dans cette ville n’a de raison de t’aider.",
    // A · 6308c8496b1f
    "openingSuggestions": ["Je traverse jusqu’à la table sur le port et je reste debout jusqu’à ce qu’elle lève les yeux. « Tu étais aux funérailles. Personne t’a invitée. Comment tu connaissais Ferro ? »","Je descends la boussole jusqu’à la Marrow et je me glisse dessous pour voir à quel point la quille est foutue avant que quelqu’un me le dise.","Je vais voir Tolla Corrow au chantier. « Pas de détours, pas de politesse. Donne-moi le vrai chiffre pour la remettre à l’eau. »"],
  },
});
