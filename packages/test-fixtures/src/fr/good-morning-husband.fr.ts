import { registerWorldText } from '@aniplay/contracts';

/**
 * Good Morning, Husband, in French.
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
  storyId: "story_good_morning_husband",
  text: {
    // A · 8961573ce5ab
    "fantasyLabel": "Quatre ans de mariage. Tu viens de la rencontrer.",
    // A · d9add0d8726a
    "hook": "Tu te réveilles un samedi ordinaire avec une alliance au doigt, dans un appartement que tu ne connais pas, et la femme qui fait des pancakes dans la cuisine est ta femme depuis quatre ans.",
    // A · bd033b15cfe4
    "premise": "Tu t’endors dans ta vie à toi et tu te réveilles dans celle-ci. Même corps, même nom, même souvenir d’enfance. Ce qui manque, ce sont les dernières années, et apparemment, pendant ces années, tu t’es marié.\n\nIl y a une alliance en or à ta main gauche qui ne s’enlève pas facilement, parce qu’elle est là depuis assez longtemps pour que ton doigt ait un peu poussé autour.\n\nSur la commode, un cadre avec une photo de toi et une femme devant la mairie, tous les deux en train de rire à quelque chose hors du cadre. Elle s’appelle Hana Mori. Le calendrier dans l’entrée indique quatre ans.\n\nRien de dramatique n’est arrivé la nuit dernière. Pas d’accident, pas d’hôpital, pas de coup sur la tête. Tu t’es juste endormi ailleurs.\n\nElle ne sait rien. Quand tu lui diras, elle pensera que tu plaisantes, parce que c’est le genre de choses que vous vous dites entre vous.\n\nTu as donc un mariage que tu n’as pas construit, un appartement rempli de preuves sur un homme que tu dois apprendre à connaître, et une femme qui va vite voir que tu la regardes comme une étrangère.\n\nCe que tu en fais ne regarde que toi. Lui dire la vérité. Faire semblant jusqu’à ce que ça ne soit plus un jeu. Garder cette vie et la rendre meilleure que celle que tu as perdue, ou chercher ce qui s’est passé et perdre celle-ci en essayant de comprendre.\n\nElle a elle aussi un secret, avec une échéance.",
    // A · 2639f53f0b60
    "mechanicsChips": ["Un mariage avec une histoire","Elle peut dire non","Les week-ends ordinaires comptent","Un secret avec une échéance","Le mystère est optionnel"],
    // A · 4b05dccdf0c9
    "creatorNote": "Tu peux passer trente tours à préparer le petit-déjeuner, à te disputer pour une étagère et à aller à un dîner de famille, et c’est une vraie façon de jouer. Hana n’attend pas qu’on la conquière. Elle t’a déjà choisi il y a quatre ans, et cette semaine, elle essaie en silence de savoir si ce serait toujours le cas.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · a596198d88df
    "rules.hardCanon": ["Hana Mori et le joueur sont mariés depuis quatre ans dans cette version des faits, et c’était un vrai mariage avec une vraie histoire.","Hana aime sincèrement le joueur au début de l’histoire. Elle ne fait pas semblant et il n’y a pas de piège.","La discontinuité de mémoire s’est produite ce matin. Rien dans ce monde ne peut en indiquer la cause.","Hana a postulé pour une bourse de design de six mois dans une autre ville et ne l’a pas dit au joueur. Emi Takeda est au courant.","Hana n’est pas un prix à gagner. Elle peut être blessée, s’ennuyer, être soulagée, furieuse, et elle peut partir.","Rien de surnaturel n’est visible dans la vie ordinaire. Le quai 11 existe seulement pour un joueur qui va le chercher, et ne dérange jamais un joueur qui ne le fait pas."],
    // A · 589df9f38a45
    "rules.toneGuide": "Chaleureux, drôle, précis. C’est un monde de petits détails concrets — la poêle, la mauvaise tasse, le sac de courses qui craque, la bibliothèque avec quatre vis de trop. L’affection passe par ce qu’on fait pour l’autre en parlant d’autre chose. Les blagues marchent plus souvent que les discours. Le conflit se joue à hauteur d’homme : l’argent, le temps, à qui le tour, si on déménage. Personne n’est un méchant, personne n’est puni de vouloir quelque chose. L’attirance est adulte et posée, le mariage ne s’y réduit jamais. Si une scène n’a rien en jeu, la laisse agréable et courte.",
    // B · e3d6fb4893f7
    "skills.attention.name": "Attention",
    // B · a8c1fa8269c3
    "skills.attention.attribute": "esprit",
    // B · 5aa333611840
    "skills.attention.description": "Ce qui a changé dans une pièce, et ce qu’elle ne dit pas pendant qu’elle parle d’autre chose.",
    // B · 84e937ca83de
    "skills.warmth.name": "Sympathie",
    // B · cfb7a15645c3
    "skills.warmth.attribute": "présence",
    // B · 4a3caaaf343b
    "skills.warmth.description": "Être facile à vivre dans un petit appartement un jour difficile.",
    // B · 6ccefecc3052
    "skills.candour.name": "Candide",
    // B · 4c84c2c842d0
    "skills.candour.attribute": "volonté",
    // B · 09d36b948a5f
    "skills.candour.description": "Dire la vérité tant qu’il est encore temps que ça compte.",
    // B · 05ac9218ff6b
    "skills.cooking.name": "Cuisine",
    // B · a8c1fa8269c3
    "skills.cooking.attribute": "esprit",
    // B · 3945abd63ff7
    "skills.cooking.description": "Nourrir quelqu’un correctement un mardi, avec ce qu’il y a dans le frigo.",
    // B · ddb75a4834b7
    "skills.graft.name": "Boulot",
    // B · 97081b4b4792
    "skills.graft.attribute": "force",
    // B · 01b3954e4c9e
    "skills.graft.description": "Le travail physique qu’une vie demande. Étagères, cartons, huit étages quand l’ascenseur est en panne.",
    // B · 070d1b2339db
    "skills.improvise.name": "Improviser",
    // B · 7ce3b6387340
    "skills.improvise.attribute": "agilité",
    // B · 94314ff5b1f5
    "skills.improvise.description": "S’en sortir dans une conversation où on n’a pas les réponses.",
    // B · c04fd51714b1
    "skills.recall.name": "Souvenir",
    // B · 5dbc8bb102ac
    "skills.recall.attribute": "arcane",
    // B · 4bae5aa7ac6f
    "skills.recall.description": "Repérer l’endroit où deux versions du même souvenir ne correspondent pas.",
    // B · 971c0299c4c9
    "resources.energy.name": "Énergie",
    // B · 34e8ec1ac388
    "resources.energy.polarity": "BON_HAUT",
    // B · 9aaa7ad050e0
    "resources.energy.zeroStateConsequence": "Tout ce que le joueur dit sonne pire que ce qu’il voulait. Pas cruel — juste plat, en retard et un peu à côté de la plaque. Hana le remarque, et la façon dont elle gère ça est l’une de ses meilleures qualités.",
    // B · 11d8535881de
    "resources.energy.color": "#E9C46A",
    // B · c9d999958423
    "resources.unease.name": "Son Malaise",
    // B · a34adbda2422
    "resources.unease.polarity": "BON_BAS",
    // B · c425d93a6ec7
    "resources.unease.zeroStateConsequence": "Hana est complètement détendue. Elle parle de ce qui se passera dans cinq ans comme si c’était une évidence, laisse ses phrases en suspens parce qu’elle suppose que le joueur les connaît, et s’endort contre lui sur le canapé en plein débat sur une émission télé.",
    // B · d38edd13ef41
    "resources.unease.color": "#8FB1C9",
    // B · 52e4546325dc
    "resources.drift.name": "Dérive",
    // B · a34adbda2422
    "resources.drift.polarity": "BON_BAS",
    // B · 2411287d53f4
    "resources.drift.zeroStateConsequence": "Ils construisent activement quelque chose tous les deux. Il y a des dates dans un calendrier qui ne sont pas des rendez-vous, un projet en cours, et une dispute qu’ils ont souvent sur la même chose heureuse.",
    // B · 4cb44ccbfac8
    "resources.drift.color": "#7A9E7E",
    // A · 729112d640d9
    "items.wedding_band.name": "L’Alliance",
    // B · 551a06b42e83
    "items.wedding_band.tags": ["quête","personnel"],
    // B · 2f0e8e74eb6b
    "items.wedding_band.description": "Or simple, usé à l’intérieur, et une taille trop petite pour un doigt qui a poussé autour. Il y a une date à l’intérieur, c’est il y a quatre ans.",
    // B · b4e87dce3f7a
    "items.wedding_band.loreText": "Hana a l’anneau assorti. Le sien a une rayure faite par une portière de voiture la deuxième année, qu’elle refuse de faire polir.",
    // B · d37b4cb06465
    "items.wedding_band.icon": "anneau",
    // A · 2a5b8d6975e8
    "items.wedding_album.name": "L’Album de Mariage",
    // B · 233e45912776
    "items.wedding_album.tags": ["document","personnel"],
    // B · 80c63f7e01ba
    "items.wedding_album.description": "Quarante photos d’un petit mariage à la mairie et d’un long déjeuner ensuite. Tout le monde a l’air de vraiment passer un bon moment, y compris toi.",
    // B · 2702ee4c893c
    "items.wedding_album.loreText": "Onze personnes. Emi tient les fleurs sur neuf photos parce que Hana n’arrêtait pas de les lui passer.",
    // B · f10eb448275d
    "items.wedding_album.icon": "book",
    // A · 448bfa1b8906
    "items.chipped_mug.name": "La Tasse Ébréchée",
    // B · e872158c299b
    "items.chipped_mug.tags": ["personnel"],
    // B · c222b9fe0780
    "items.chipped_mug.description": "À toi, apparemment, depuis des années. Une petite éclat sur le bord que tu as appris à éviter en buvant sans t’en rendre compte, ce que tu découvres en y prêtant attention.",
    // B · 95778a5e5df3
    "items.chipped_mug.loreText": "D’une station-service sur la route côtière. Il y a un mug assorti avec un canard dessus que Hana refuse d’utiliser devant les autres.",
    // B · 501b2d629c0a
    "items.chipped_mug.icon": "mug",
    // A · 08ea928e114b
    "items.grocery_list.name": "La liste de courses",
    // B · e72573287188
    "items.grocery_list.tags": ["document"],
    // B · ccf0007627bb
    "items.grocery_list.description": "Sur le frigo, écrit en deux écritures, avec des articles barrés par celui qui les a achetés. La tienne est la plus petite et la moins lisible.",
    // B · 6856f59ecbe3
    "items.grocery_list.loreText": "Le tiers inférieur est une dispute menée entièrement par la liste de courses. « LAIT D’AVOINE ». « non ». « LAIT D’AVOINE ».",
    // B · 8143e9e47c18
    "items.grocery_list.icon": "papers",
    // A · 1d8e13af4fc3
    "items.hana_sketchbook.name": "Le carnet de croquis de Hana",
    // B · 039375344653
    "items.hana_sketchbook.tags": ["personnel","document"],
    // B · e34bca3fee6f
    "items.hana_sketchbook.description": "Plans du site, détails des escaliers, et quatre pages vers la fin qui ne montrent que l’appartement — cette pièce, depuis le canapé, encore et encore, à différents moments de la journée.",
    // B · d3376535aa90
    "items.hana_sketchbook.loreText": "Le dernier dessin date d’il y a trois semaines et montre une pièce où aucun de vous n’a jamais vécu.",
    // B · f10eb448275d
    "items.hana_sketchbook.icon": "book",
    // A · e700e833b545
    "items.fellowship_letter.name": "La lettre de la confrérie",
    // B · 061625d9bd60
    "items.fellowship_letter.tags": ["quête","document"],
    // B · 51f80557508b
    "items.fellowship_letter.description": "Une bourse de design, six mois, une autre ville, qui commence dans neuf semaines. C’est une offre, pas une candidature, ce qui veut dire qu’elle l’a eue, donc qu’elle a postulé.",
    // B · a05c1a480bfb
    "items.fellowship_letter.loreText": "Il y a une date limite de réponse et c’est jeudi. L’enveloppe a été ouverte et refermée tellement de fois qu’elle est toute molle.",
    // B · 4540c1847af8
    "items.fellowship_letter.icon": "letter",
    // A · 61d1fca6e594
    "items.bookshelf_parts.name": "L’étagère à moitié montée",
    // B · ce24601a9bda
    "items.bookshelf_parts.tags": ["maison"],
    // B · 6130f51cd375
    "items.bookshelf_parts.description": "Six panneaux, un sac de vis, et une notice que quelqu’un a annotée en colère au crayon. Ça traîne comme ça depuis cinq semaines.",
    // B · b17b1e6d074b
    "items.bookshelf_parts.loreText": "Les annotations sont de ta main. L’une d’elles dit « CE N’EST PAS UNE ÉTAGÈRE, C’EST UN MENSONGE ».",
    // B · fb820f9ce611
    "items.bookshelf_parts.icon": "tools",
    // A · 979386db41dc
    "items.platform_ticket.name": "Le ticket bizarre",
    // B · 061625d9bd60
    "items.platform_ticket.tags": ["quête","document"],
    // B · 510b140656de
    "items.platform_ticket.description": "Un bout de ticket en papier pour un service parti à 01:11 d’un quai que cette gare n’a pas. La date dessus est un mardi que tu ne peux pas expliquer.",
    // B · 07ef9bbacf6c
    "items.platform_ticket.loreText": "L’encre est de la mauvaise couleur pour cette compagnie de transport et ça l’est depuis avant même que cette compagnie existe.",
    // B · be43368e36ad
    "items.platform_ticket.icon": "ticket",
    // A · 48f3fe9fe92c
    "abilities.say_it_straight.name": "Dis-le franchement",
    // B · 09b907576d49
    "abilities.say_it_straight.tags": ["social"],
    // B · ebaec3540287
    "abilities.say_it_straight.description": "Dis à quelqu’un la vérité sans la maquiller, et accepte ce qui vient.",
    // B · 39d896e20aec
    "abilities.say_it_straight.targetRule": "SINGLE",
    // B · 4c84c2c842d0
    "abilities.say_it_straight.check.attribute": "resolve",
    // A · a380cb1298ad
    "abilities.play_along.name": "Jouer le jeu",
    // B · 09b907576d49
    "abilities.play_along.tags": ["social"],
    // B · 9d1a82986bb2
    "abilities.play_along.description": "Réponds comme si tu savais exactement de quoi elle parle, et lis la suite sur son visage.",
    // B · 39d896e20aec
    "abilities.play_along.targetRule": "SINGLE",
    // B · 7ce3b6387340
    "abilities.play_along.check.attribute": "agility",
    // A · 822f192f57e7
    "abilities.read_the_room.name": "Lire la pièce",
    // B · 58f69744c481
    "abilities.read_the_room.tags": ["sight"],
    // B · c0974757ce9e
    "abilities.read_the_room.description": "Comprends ce que quelqu’un veut vraiment dire en regardant ce qu’il fait avec ses mains pendant qu’il parle.",
    // B · 39d896e20aec
    "abilities.read_the_room.targetRule": "SINGLE",
    // B · a8c1fa8269c3
    "abilities.read_the_room.check.attribute": "mind",
    // A · ade6dff39aae
    "abilities.cook_for_her.name": "Cuisiner pour elle",
    // B · 5251d369d3b6
    "abilities.cook_for_her.tags": ["utilitaire"],
    // B · 18d4c23c406c
    "abilities.cook_for_her.description": "Préparer quelque chose avec ce qu’il y a vraiment dans l’appartement, et le mettre devant quelqu’un.",
    // B · 39d896e20aec
    "abilities.cook_for_her.targetRule": "SINGLE",
    // B · a8c1fa8269c3
    "abilities.cook_for_her.check.attribute": "esprit",
    // A · d92b1fe61594
    "abilities.do_the_work.name": "Faire le travail",
    // B · 5251d369d3b6
    "abilities.do_the_work.tags": ["utilitaire"],
    // B · e28fae9d559a
    "abilities.do_the_work.description": "Terminer la tâche physique qui traîne. L’étagère, les cartons, l’ampoule du palier.",
    // B · c44e6dd70059
    "abilities.do_the_work.targetRule": "NONE",
    // B · 97081b4b4792
    "abilities.do_the_work.check.attribute": "force",
    // A · 6b5f32e85445
    "abilities.ask_the_hard_one.name": "Poser la question dure",
    // B · 09b907576d49
    "abilities.ask_the_hard_one.tags": ["social"],
    // B · f2856ac73573
    "abilities.ask_the_hard_one.description": "Poser la question que personne dans la pièce ne veut entendre, puis se taire assez longtemps pour qu’elle soit répondue.",
    // B · 39d896e20aec
    "abilities.ask_the_hard_one.targetRule": "SINGLE",
    // B · 4c84c2c842d0
    "abilities.ask_the_hard_one.check.attribute": "volonté",
    // A · 17f335387430
    "abilities.just_stay.name": "Rester dedans",
    // B · 09b907576d49
    "abilities.just_stay.tags": ["social"],
    // B · 9ac45b8ca50c
    "abilities.just_stay.description": "Ne pas réparer, ne pas expliquer, ne pas quitter la pièce. S’asseoir et être là.",
    // B · 39d896e20aec
    "abilities.just_stay.targetRule": "SINGLE",
    // A · 0723da44b199
    "abilities.chase_the_seam.name": "Suivre la faille",
    // B · 58f69744c481
    "abilities.chase_the_seam.tags": ["vue"],
    // B · eeda9cdedc71
    "abilities.chase_the_seam.description": "Suivre l’endroit où deux versions d’un même souvenir ne correspondent pas, et voir où ça mène.",
    // B · c44e6dd70059
    "abilities.chase_the_seam.targetRule": "NONE",
    // B · 5dbc8bb102ac
    "abilities.chase_the_seam.check.attribute": "arcane",
    // B · 105e795dd44a
    "abilities.chase_the_seam.requires.flagsSet": ["sait :la_faille"],
    // B · dcd760a6e8ff
    "abilities.chase_the_seam.requires.lockedCopy": "Il n’y a rien à suivre. Il y a un appartement plein d’une vie dont tu ne te souviens pas, et ce n’est pas la même chose qu’un indice.",
    // A · 6777d1f0ceea
    "locations.the_kitchen.name": "La cuisine",
    // A · 1176d2568d09
    "locations.the_kitchen.shortName": "Cuisine",
    // B · db4b95a1d41d
    "locations.the_kitchen.description": "À quatre pas du lit, la pièce la plus lumineuse de l’appartement. Deux mugs sur l’égouttoir, une liste sur le frigo écrite à deux mains, et une poêle qu’on utilise assez longtemps pour savoir exactement quel côté chauffe.",
    // B · e04af2471276
    "locations.the_kitchen.stageImage": "story_good_morning_husband/stage_the_kitchen",
    // A · aecc4f65d3fb
    "locations.apartment_8b.name": "Appartement 8B",
    // A · 85ea722a0bd6
    "locations.apartment_8b.shortName": "L’appart",
    // B · dc2c80082eea
    "locations.apartment_8b.description": "Un salon avec un bon canapé et un tapis moche, au huitième étage au-dessus d’une rue avec un tram. Des photos sur l’étagère dans l’ordre chronologique : une côte quelque part, un chalet d’hiver, un bureau des mariages. Un calendrier dans le hall avec deux écritures et un cercle autour du quatorze.",
    // B · ee97287676af
    "locations.apartment_8b.stageImage": "story_good_morning_husband/stage_apartment_8b",
    // A · f462758858af
    "locations.the_spare_room.name": "La chambre d’amis",
    // A · 9bfd2df47671
    "locations.the_spare_room.shortName": "Chambre d’amis",
    // B · 8f48598fdf7f
    "locations.the_spare_room.description": "Onze mètres carrés avec un étendoir, quatre cartons que personne n’a ouverts depuis le déménagement, un lit parapluie plié encore dans son emballage, et un vélo d’appartement. Tout ici est une réponse différente à la même question, et aucune n’a gagné.",
    // B · 44217c2c5814
    "locations.the_spare_room.stageImage": "story_good_morning_husband/stage_the_spare_room",
    // A · ec0538fafe78
    "locations.the_balcony.name": "Le balcon",
    // A · 52adf6ccf54f
    "locations.the_balcony.shortName": "Balcon",
    // B · f8ae0421080a
    "locations.the_balcony.description": "Assez grand pour deux chaises si une personne se tourne sur le côté. Trois plantes en bonne santé, une plante qui fait toujours débat, et toute la ligne de tram jusqu’à la rivière.",
    // B · 45588dfee1f8
    "locations.the_balcony.stageImage": "story_good_morning_husband/stage_the_balcony",
    // A · 0cd8ba64f14e
    "locations.aster_market.name": "Rue du Marché Aster",
    // A · c2475bf6fa39
    "locations.aster_market.shortName": "La Rue",
    // B · e7e848a886c7
    "locations.aster_market.description": "Quatre rues avec un primeur, une quincaillerie, une boulangerie avec une file, et la laverie où les machines sont meilleures que celles de l’immeuble. Trois personnes ici connaissent ton nom, et une va poser une question sur l’étagère.",
    // B · 632e1d476ad6
    "locations.aster_market.stageImage": "story_good_morning_husband/stage_aster_market",
    // A · 72ce692a7c34
    "locations.the_usual_place.name": "Le QG",
    // A · 414de4087ce8
    "locations.the_usual_place.shortName": "Le resto",
    // B · bd5314658c5f
    "locations.the_usual_place.description": "Neuf tables, un tableau des plats du jour que personne n’a mis à jour depuis le printemps, et un couple qui tient l’endroit et a des avis sur vous deux. Il y a une table près de la fenêtre qu’on garde le vendredi sans que personne ne l’organise.",
    // B · 5dbf599b824b
    "locations.the_usual_place.stageImage": "story_good_morning_husband/stage_the_usual_place",
    // A · 88479ae04c3d
    "locations.riverside_park.name": "Parc au bord de l’eau",
    // A · 80afb08b8703
    "locations.riverside_park.shortName": "Le Parc",
    // B · 9e065eccb5d4
    "locations.riverside_park.description": "Une longue bande verte au bord d’une eau marron, un chemin de course, et un banc avec une plaque sur laquelle vous avez une blague. Quelqu’un fait toujours voler un cerf-volant mal.",
    // B · 2438ff529ce4
    "locations.riverside_park.stageImage": "story_good_morning_husband/stage_riverside_park",
    // A · 841dee13d8d1
    "locations.hana_studio.name": "Le Studio",
    // A · 51229465e108
    "locations.hana_studio.shortName": "Son bureau",
    // B · 4d67f0a023a2
    "locations.hana_studio.description": "Un étage d’une ancienne imprimerie reconvertie, onze personnes, et un mur de maquettes en carton. Le bureau de Hana est le plus rangé, avec une photo de la côte et un mug qu’elle n’a jamais emporté chez elle.",
    // B · df473715db5a
    "locations.hana_studio.stageImage": "story_good_morning_husband/stage_hana_studio",
    // A · a4276322e4a0
    "locations.mori_house.name": "La maison Mori",
    // A · 6ef5232035ac
    "locations.mori_house.shortName": "Chez ses parents",
    // B · 5f01b8dcb02d
    "locations.mori_house.description": "Une maison étroite sur une colline avec trop de chaussures dans le hall et une cuisine qui tourne à un volume que personne ne trouve fort. Sa mère te mettra de la nourriture devant en moins de quatre-vingt-dix secondes, quelle que soit l’heure.",
    // B · 2aad4396cb47
    "locations.mori_house.stageImage": "story_good_morning_husband/stage_mori_house",
    // A · e6c7d431306e
    "locations.central_station.name": "Gare centrale d’Aster City",
    // A · 22f81e471de2
    "locations.central_station.shortName": "Centrale",
    // B · 5ea662231431
    "locations.central_station.description": "Dix quais sous une verrière, un tableau qui claque, et une équipe de nuit d’environ quatre personnes. Entre une et deux heures du matin, c’est presque silencieux et les agents de nettoyage parlent entre eux sur toute la longueur.",
    // B · 12f59af9f98b
    "locations.central_station.stageImage": "story_good_morning_husband/scene_gare_centrale",
    // A · 1f867c2d3425
    "locations.platform_eleven.name": "Quai 11",
    // A · 1f867c2d3425
    "locations.platform_eleven.shortName": "Quai 11",
    // B · b71540b071de
    "locations.platform_eleven.description": "Un quai au bout de la gare, absent de la carte et non indiqué sur le panneau. Le carrelage a une dizaine d’années de plus que tout ce qui l’entoure. À 01:11, quelque chose arrive, et les gens qui en descendent ne cherchent personne.",
    // B · 47c1f7d9fe03
    "locations.platform_eleven.stageImage": "story_good_morning_husband/scene_quai_onze",
    // B · b890e40b8117
    "characters.hana.name": "Hana Mori",
    // A · 9f1449d1255c
    "characters.hana.role": "Ta femme depuis quatre ans. Designer produit, et la personne autour de qui toute cette vie est organisée",
    // A · 42685c212ba7
    "characters.hana.cardBlurb": "Elle est mariée avec toi depuis quatre ans, drôle avant tout, et elle va passer une semaine à se demander si celui qui s’est réveillé ce matin est bien l’homme qu’elle a choisi.",
    // B · aee35f364a88
    "characters.hana.pronouns": "elle",
    // A · bbec53339cdc
    "characters.hana.publicTraits": ["Drôle avant tout","Tactile sans y penser","Intransigeante sur les petites choses"],
    // B · 41af0d89d690
    "characters.hana.hiddenDrives": ["Elle veut être désirée ouvertement mais a décidé que le demander serait puéril","Elle teste discrètement si ce mariage peut survivre à une ambition qui n’est qu’à elle"],
    // B · f1ce4d467f9c
    "characters.hana.values": ["Apprendre quelque chose tant qu’il est encore temps d’agir","Créer des choses plutôt que de simplement les posséder — pièces, repas, dessins, projets"],
    // B · f53195f7ef07
    "characters.hana.fears": ["Porter le mariage seule sans s’en rendre compte pendant encore deux ans","Être le genre de personne qui part, et n’avoir été sage que pour l’instant"],
    // A · e5fa08b595d2
    "characters.hana.socialStyle": "Des blagues d’abord, et c’est sérieux après. Elle te touche le bras quand elle dit un truc dur, pour que tu ne puisses pas deviner sur son visage à quel point c’est grave.",
    // B · 9010f0db05f6
    "characters.hana.boundaries": ["Ne se laisse pas gérer. Décide quelque chose à sa place et elle ne se battra pas — elle se fera discrète et planifiera en contournant","Ne joue pas à faire semblant d’aller bien pour que la matinée reste agréable"],
    // B · 111c614562de
    "characters.hana.goals": ["Passer ce week-end sans que ce sentiment étrange ne devienne un vrai problème","Dire à voix haute la bourse avant que jeudi ne décide pour elle"],
    // B · e6e4466cf6e5
    "characters.hana.secrets.hana_fellowship.fact": "Elle a reçu une bourse de design de six mois dans une autre ville, qui commence dans neuf semaines. Elle ne l’a pas dit au joueur parce qu’ils ont passé le printemps à décider de s’installer.",
    // B · 47558a04be8d
    "characters.hana.secrets.hana_fellowship.visibility": "NPC_PRIVATE",
    // B · c7042ad86ac5
    "characters.hana.secrets.hana_fellowship.revealHint": "Elle te le dit elle-même sur le balcon, tard, si tu lui as posé une vraie question sur sa semaine plutôt que sur le mariage.",
    // B · a27bed373f19
    "characters.hana.secrets.hana_the_photograph.fact": "Il y a une photo du voyage sur la côte où le joueur est mal placé — une veste différente, la mauvaise main dans la poche. Elle l’a remarqué il y a un an et ne l’a jamais dit à personne.",
    // B · 47558a04be8d
    "characters.hana.secrets.hana_the_photograph.visibility": "NPC_PRIVATE",
    // B · cdd8274fcb72
    "characters.hana.secrets.hana_the_photograph.revealHint": "Seulement si le joueur est allé à la gare la nuit, est rentré et n’a pas menti sur son absence.",
    // A · 12137c6755d8
    "characters.hana.speechStyle": "Rapide, chaleureux, un peu sarcastique. Elle désamorce ses phrases sérieuses d’un rien. Les petits noms arrivent naturellement, pas à chaque phrase. Elle pose des questions dont elle connaît déjà la réponse, juste pour voir comment tu réagis.",
    // A · 3d85092632e5
    "characters.hana.topics": ["la confrérie","la chambre d’amis","la bibliothèque","son travail","le voyage sur la côte","votre anniversaire","son frère"],
    // A · 02f8f0289e59
    "characters.hana.voiceSamples": ["Crêpes ou œufs. Choisis bien, ça va décider du reste de notre mariage.","T’as ta tête sérieuse. C’est un truc grave ou c’est ta tête quand tu parles des poubelles ?","Je suis pas fâchée. Je suis dans ce moment où je suis pas encore fâchée, mais t’as environ quatre minutes.","J’ai postulé en février. Je t’en ai pas parlé en février, j’y ai pensé tous les jours depuis, et je préférerais que tu sois en colère plutôt que gentil à ce sujet."],
    // B · 1db53bf7566b
    "characters.hana.appearance": "Vingt-six ans, cheveux châtain long attachés avec ce qui traîne, yeux noisette chaleureux, chemise de nuit trop grande à cette heure et très bons manteaux à tout autre moment.",
    // B · 93774eba91ad
    "characters.hana.visualHook": "Cheveux attachés avec un crayon à dessin, qu’elle oublie et emmène au travail.",
    // B · 61822b453429
    "characters.hana.silhouette": "Pieds nus, un bras appuyé sur le comptoir, bras croisés, tête penchée.",
    // B · 1bbdca0a31e4
    "characters.hana.artSeed": "gmh-hana-01",
    // B · 6ed3a5e30aa5
    "characters.hana.portrait": "story_good_morning_husband/hana",
    // B · 72d88528ec92
    "characters.hana.expressions": ["neutre","taquine","chaleureuse","inquiète","blessée"],
    // B · c2c50b14d6fe
    "characters.hana.knowledgeScope": ["hana","appartement_8b","le_mariage","aster_city","emi","bourse","chambre_libre","voyages_partagés"],
    // B · 0817dbbed1b6
    "characters.hana.gates.hana_tells_you_about_it.label": "Elle te parle elle-même de la bourse",
    // B · 55a54e80451a
    "characters.hana.gates.hana_tells_you_about_it.kind": "CONFIANCE",
    // B · 61ab59ca7778
    "characters.hana.gates.hana_tells_you_about_it.requires.flagsSet": ["premier_matin_termine"],
    // B · 4cc480849a01
    "characters.hana.gates.hana_believes_you.label": "Elle cesse de considérer l’oubli comme un jeu",
    // B · 55a54e80451a
    "characters.hana.gates.hana_believes_you.kind": "CONFIANCE",
    // B · 453a1e7fe8e0
    "characters.hana.gates.hana_believes_you.requires.flagsSet": ["elle_sait"],
    // B · 836f2a588141
    "characters.hana.gates.hana_all_in.label": "Elle planifie à voix haute à nouveau",
    // B · 0b75bc536447
    "characters.hana.gates.hana_all_in.kind": "ROMANCE",
    // B · e1802ad20f3c
    "characters.emi.name": "Emi Takeda",
    // A · 63de77b8a9c4
    "characters.emi.role": "La meilleure amie de Hana depuis l’école d’art, pas la tienne",
    // A · a242e036384c
    "characters.emi.cardBlurb": "Elle connaît Hana depuis onze ans, toi depuis quatre, et si jamais faut choisir, elle te choisira pas. C’est aussi la seule qui te dira ce que tu fais de travers tant que t’as encore une chance d’y remédier.",
    // B · aee35f364a88
    "characters.emi.pronouns": "elle",
    // A · a898bb978034
    "characters.emi.publicTraits": ["Franche au point d’en être rude","Elle remarque tout","Extrêmement drôle sur les mariages des autres"],
    // B · 32a25b9053de
    "characters.emi.hiddenDrives": ["Elle a déjà été celle qui savait et n’a rien dit, et ça lui a coûté une amitié qu’elle n’a jamais remplacée"],
    // B · 6dbf6c382b0e
    "characters.emi.values": ["Dire les choses en face","Que Hana obtienne ce qu’elle veut vraiment, pas ce qui est pratique"],
    // B · 771662147152
    "characters.emi.fears": ["Être la raison d’une bonne chose qui finit","Être tenue à l’écart des vies qui lui sont les plus proches"],
    // A · 86845ed7dff7
    "characters.emi.socialStyle": "Elle débarque sans prévenir, se fait un thé, et pose la question que t’évites depuis moins de deux minutes.",
    // B · 8d98d48915d9
    "characters.emi.boundaries": ["Ne te dira pas les affaires de Hana, peu importe comment tu demandes — mais elle te dira qu’il y en a","Ne sera pas utilisée comme moyen d’atteindre Hana sans passer par Hana"],
    // B · a8a915dc011f
    "characters.emi.goals": ["Faire dire à Hana la bourse à voix haute","Comprendre ce qui ne va pas vraiment chez toi cette semaine"],
    // B · 38b00b5ff99f
    "characters.emi.secrets.emi_knows.fact": "Elle sait pour la bourse depuis février, a aidé pour le portfolio, et dit à Hana de te le dire depuis quatre mois.",
    // B · 47558a04be8d
    "characters.emi.secrets.emi_knows.visibility": "NPC_PRIVATE",
    // B · ec26ba54a365
    "characters.emi.secrets.emi_knows.revealHint": "Elle laisse tomber si le joueur lui demande directement ce qu’elle pense qu’il se passe, au lieu de lui demander ce que Hana a dit.",
    // A · 69e8582328dc
    "characters.emi.speechStyle": "Des phrases directes, un long silence amusé pour te laisser digérer. Elle répond à la question que t’aurais dû poser, pas à celle que t’as posée.",
    // A · 4049920777e0
    "characters.emi.topics": ["Hana","la confrérie","l’école d’art","ton mariage","ce que tu étais avant"],
    // A · aa2d5598b043
    "characters.emi.voiceSamples": ["Tu fais bizarre. Pas bizarre mauvais. Juste assez bizarre pour que j’aie remarqué, et je suis curieuse.","Je te dirai pas ce qu’elle a dit. Je te dis juste qu’elle a dit un truc, et que c’est toi qu’elle aurait dû viser.","Il y a quatre ans, tu as fait un discours à ton mariage qui a duré quatre-vingt-dix secondes et a fait pleurer sa mère. Tu vas pas me rendre nostalgique à onze heures du matin."],
    // B · 69646ccca615
    "characters.emi.appearance": "Vingt-sept ans, cheveux courts décolorés avec les racines volontairement visibles, bagues à presque tous les doigts, un énorme manteau par tous les temps.",
    // B · 1a7e9eb81664
    "characters.emi.visualHook": "Un grand manteau qu’elle ne quitte jamais à l’intérieur, porté sur tout, en toute saison.",
    // B · 6d47f400b5f4
    "characters.emi.silhouette": "Épaules larges dans son manteau, toujours avec la tasse de quelqu’un d’autre en main.",
    // B · 7780db29b3a1
    "characters.emi.artSeed": "gmh-emi-01",
    // B · 8c262b9abe5d
    "characters.emi.portrait": "story_good_morning_husband/emi",
    // B · 8fcfcc56ed72
    "characters.emi.expressions": ["neutre","amusée","impressionnée"],
    // B · fc5d9c0d5d16
    "characters.emi.knowledgeScope": ["hana","emi","fellowship","the_wedding","aster_city"],
    // B · 9ae022a66d17
    "characters.emi.gates.emi_levels_with_you.label": "Elle te dit qu’il y a quelque chose à savoir",
    // B · 55a54e80451a
    "characters.emi.gates.emi_levels_with_you.kind": "CONFIANCE",
    // B · baf63d0171ab
    "characters.emi.gates.emi_picks_you_too.label": "Elle commence à te traiter comme son ami plutôt que comme le mari de Hana",
    // B · 9e8ae18bf8bf
    "characters.emi.gates.emi_picks_you_too.kind": "ALLIANCE",
    // B · 37c0f04698da
    "characters.kenji.name": "Kenji Mori",
    // A · c3447f35c465
    "characters.kenji.role": "Le frère aîné de Hana. Il a une boîte de pose de revêtements avec quatre camionnettes et onze avis tranchés",
    // A · 1d100c5bde3f
    "characters.kenji.cardBlurb": "Il t’apprécie vraiment, il t’a prêté son camion deux fois, et il lâcherait tout ça en une après-midi s’il se mettait à penser que tu rends sa sœur plus petite. C’est aussi la seule personne de la famille qui te dira la vérité là-dessus.",
    // B · fcca6b746d0b
    "characters.kenji.pronouns": "il/lui",
    // A · 35620fb731d8
    "characters.kenji.publicTraits": ["Pragmatique en toutes circonstances","Taquine sans relâche et avec affection","Physiquement incapable de rester en place dans une maison"],
    // B · be560f3ea9d8
    "characters.kenji.hiddenDrives": ["Il porte une version du mariage de leurs parents que Hana était trop jeune pour voir, et il a décidé qu’elle n’en aurait jamais besoin."],
    // B · 1b175c7e48bd
    "characters.kenji.values": ["Être là quand quelqu’un a besoin d’une camionnette","Ne pas en faire tout un plat"],
    // B · 93b7be695eec
    "characters.kenji.fears": ["Que sa sœur finisse là où leur mère a failli finir","Être celui qui doit le dire à voix haute"],
    // A · 4408d1059b19
    "characters.kenji.socialStyle": "Il parle en faisant autre chose avec ses mains. Les conversations sérieuses se passent dans un véhicule ou pendant un service.",
    // B · bd872a495669
    "characters.kenji.boundaries": ["Ne parlera jamais en mal de Hana devant toi, même quand il est d’accord avec toi","Ne discutera pas de leurs parents dans la maison"],
    // B · cc53c1780ed9
    "characters.kenji.goals": ["Faire passer la famille à travers l’anniversaire sans que personne ne pleure","Comprendre pourquoi tu es bizarre depuis samedi"],
    // B · 7300d14041f7
    "characters.kenji.secrets.kenji_the_year.fact": "Leurs parents se sont séparés pendant onze mois quand Hana avait neuf ans et on lui a dit que c’était une mutation professionnelle. Kenji avait quatorze ans et on ne lui a rien dit, c’est comme ça qu’il sait.",
    // B · 47558a04be8d
    "characters.kenji.secrets.kenji_the_year.visibility": "NPC_PRIVÉ",
    // B · 9968ca799844
    "characters.kenji.secrets.kenji_the_year.revealHint": "Dans la camionnette, sur le chemin du retour de quelque part, si le joueur a d’abord admis quelque chose de vrai sur son propre mariage.",
    // A · ca8172cc7abd
    "characters.kenji.speechStyle": "Phrases courtes, vocabulaire de boulot, punchlines livrées à plat en mesurant quelque chose. Il utilise « mate » en ponctuation et une fois en avertissement.",
    // A · 8caa5e554677
    "characters.kenji.topics": ["l’appart","l’étagère","ses camions","votre anniversaire","leurs parents","Hana"],
    // A · 5a485683427b
    "characters.kenji.voiceSamples": ["Ce n’est pas de niveau. Ça ne l’a jamais été. Tu regardes ça qui penche depuis cinq semaines.","Elle avait sept ans quand elle a décidé qu’elle ferait des bâtiments. Sept ans. Moi, j’étais censé être hélico.","Je t’aime bien, mate. Je veux bien que ce soit clair que je t’aime bien, à cause de ce que je vais te demander."],
    // B · 5a71fd29658e
    "characters.kenji.appearance": "Trente et un ans, bâti comme quelqu’un qui pose du revêtement de sol, une polaire solide sur tout, un crayon derrière une oreille en permanence.",
    // B · fc2ab9347495
    "characters.kenji.visualHook": "Un crayon de charpentier derrière l’oreille, à l’intérieur, au dîner, à un mariage.",
    // B · afe851790786
    "characters.kenji.silhouette": "Large, penché vers l’avant, une main toujours occupée à tenir un outil, une tasse ou un chambranle.",
    // B · 10e35c51f534
    "characters.kenji.artSeed": "gmh-kenji-01",
    // B · 8d5243a54ec6
    "characters.kenji.portrait": "story_good_morning_husband/kenji",
    // B · f0f02bdd3a5d
    "characters.kenji.expressions": ["neutre","souriant","sérieux"],
    // B · 413af53d8cf8
    "characters.kenji.knowledgeScope": ["hana","the_mori_family","aster_city","spare_room","the_wedding"],
    // B · 58493ff94523
    "characters.kenji.gates.kenji_in_the_van.label": "Il te parle des onze mois",
    // B · 55a54e80451a
    "characters.kenji.gates.kenji_in_the_van.kind": "CONFIANCE",
    // B · 2a28062bc747
    "characters.kenji.gates.kenji_in_the_van.requires.flagsSet": ["sait :ce_que_tu_veux"],
    // B · a89a7ee20fb2
    "characters.kenji.gates.kenji_backs_you.label": "Il prend ton parti devant la famille",
    // B · 9e8ae18bf8bf
    "characters.kenji.gates.kenji_backs_you.kind": "ALLIANCE",
    // B · 03d6e554620d
    "characters.lucia.name": "Lucia Vale",
    // A · 9bff54d830b5
    "characters.lucia.role": "Ta meilleure amie dans cette vie-là, ce que tu acceptes sans y croire vraiment",
    // A · 93e3019fdcb2
    "characters.lucia.cardBlurb": "Elle a onze ans d’histoires sur toi que tu ne peux pas vérifier, c’est la seule devant qui tu peux être bizarre sans que ça coûte quoi que ce soit, et elle a déjà pigé que quelque chose cloche.",
    // B · aee35f364a88
    "characters.lucia.pronouns": "elle",
    // A · 183f179cb832
    "characters.lucia.publicTraits": ["Allergique à la sincérité pendant plus de neuf secondes","Fiable en cas d’urgence, sinon zéro","Se souvient de tout"],
    // B · 2cb0ea86c41b
    "characters.lucia.hiddenDrives": ["Elle a été la troisième roue de ce mariage pendant quatre ans et n’a jamais laissé voir à quel point elle a besoin qu’il tienne."],
    // B · b319e1f0c7e0
    "characters.lucia.values": ["Être là","Ne pas faire expliquer quelqu’un avant qu’il soit prêt"],
    // B · a2c3fc88a7fd
    "characters.lucia.fears": ["Être l’amie dont on finit par se lasser","Découvrir qu’elle s’est trompée sur quelqu’un depuis onze ans"],
    // A · c22caa6b2d16
    "characters.lucia.socialStyle": "Elle détourne la sincérité avec une blague, puis elle répond à la question sérieuse une minute après, comme si on ne l’avait pas posée.",
    // B · 594019662d56
    "characters.lucia.boundaries": ["Ne mentira pas à Hana pour toi, et te le dira franchement plutôt qu’après","Ne voudra pas choisir un camp et arrêtera simplement de répondre au téléphone si tu la forces"],
    // B · 84d25eb8d8c2
    "characters.lucia.goals": ["Comprendre ce qui t’est arrivé entre vendredi et samedi","Vous ramener tous les trois à la table du vendredi"],
    // B · f8958852352d
    "characters.lucia.secrets.lucia_the_wrong_memory.fact": "Elle se souvient d’une nuit sur la route côtière que le joueur ne connaît pas, avec un détail — une veste, une deuxième voiture — qui ne correspond pas à la photo dans l’appartement.",
    // B · 47558a04be8d
    "characters.lucia.secrets.lucia_the_wrong_memory.visibility": "NPC_PRIVATE",
    // B · 4212e9423c28
    "characters.lucia.secrets.lucia_the_wrong_memory.revealHint": "Elle en parle elle-même, maladroitement et sur le ton de la plaisanterie, si le joueur lui a déjà avoué que sa mémoire est fausse.",
    // A · 65fa59684f81
    "characters.lucia.speechStyle": "Rapide, fuyante, allergique aux compliments directs. Elle lance la phrase importante en regardant ailleurs, puis change tout de suite de sujet.",
    // A · 1744b260a0de
    "characters.lucia.topics": ["ce que tu étais avant","la route côtière","Hana","ton boulot","la table du vendredi"],
    // A · f37926887600
    "characters.lucia.voiceSamples": ["T’as cette tête-là. Tu sais, celle de la scène. Faut pas que je la décrive, je vais la faire.","Onze ans, et les deux seuls secrets que t’as jamais gardés étaient à moi. Alors peu importe ce que c’est, vas-y.","C’était une veste noire. Je sais que c’était une veste noire parce que j’avais froid, que tu voulais pas me la prêter, et je t’en veux encore depuis mars."],
    // B · 485f36e0bb78
    "characters.lucia.appearance": "Vingt-neuf ans, boucles brunes coupées court, des chaussures de travail avec tout, un téléphone qu’elle décroche au neuvième sonnerie par principe.",
    // B · 7abc40be41f6
    "characters.lucia.visualHook": "Chaussures de travail à embout d’acier usées portées avec absolument tout, y compris un mariage.",
    // B · ddec9183316d
    "characters.lucia.silhouette": "Mains dans les poches, poids sur une jambe, à moitié tournée comme si elle allait partir.",
    // B · 3e4a704a8688
    "characters.lucia.artSeed": "gmh-lucia-01",
    // B · 89dc87fdf301
    "characters.lucia.portrait": "story_good_morning_husband/lucia",
    // B · 84b78530a1b8
    "characters.lucia.expressions": ["neutre","riant","perplexe"],
    // B · 625d1a028da1
    "characters.lucia.knowledgeScope": ["le_joueur_avant","ville_aster","voyages_partagés","hana","le_mariage"],
    // B · b9f0ca27172d
    "characters.lucia.gates.lucia_says_the_thing.label": "Elle te parle de la route côtière",
    // B · 55a54e80451a
    "characters.lucia.gates.lucia_says_the_thing.kind": "CONFIANCE",
    // B · f8ee864b565f
    "characters.lucia.gates.lucia_says_the_thing.requires.flagsSet": ["sait :le_fossé"],
    // B · 2d003c76e812
    "characters.nao.name": "Nao Ibarra",
    // A · bda2137382bd
    "characters.nao.role": "Superviseure de nuit à la gare, et la seule à dire le numéro de quai à voix haute",
    // A · 34b84954a0c3
    "characters.nao.cardBlurb": "Elle bosse quand la gare est vide, elle tient un carnet avec tous ceux qui lui ont demandé le quai au bout du bout, et si tu lui demandes, elle voudra écrire ton nom dedans.",
    // B · aee35f364a88
    "characters.nao.pronouns": "elle",
    // A · a57f878545f4
    "characters.nao.publicTraits": ["Précise","Posée","Complètement indifférente à ce qu’on ne la croie pas"],
    // B · e4e6f0970418
    "characters.nao.hiddenDrives": ["Elle veut qu’une autre personne le voie pendant qu’elle y travaille encore, pour que ce ne soit pas que le sien"],
    // B · 769b26447422
    "characters.nao.values": ["Dire exactement ce que les preuves confirment","Ne pas envoyer quelqu’un là-bas sans préparation"],
    // B · 8a1e7e63a7e1
    "characters.nao.fears": ["Être mise à la retraite avant qu’on la croie","Quelqu’un qui descend et ne revient pas pendant son service"],
    // A · 34a689f529df
    "characters.nao.socialStyle": "Elle répond à une question par la partie qu’elle peut prouver, puis s’arrête, sans remplir le silence qui suit.",
    // B · e520c2fed514
    "characters.nao.boundaries": ["Ne pas spéculer, et dire « je sais pas » comme phrase complète","Ne pas emmener quelqu’un là-bas sans qu’il ait dit pourquoi il veut y aller"],
    // B · bde4c13ac129
    "characters.nao.goals": ["Faire entrer un témoignage corroboré dans le carnet","Garder la voie hors du planning pour une année de plus"],
    // B · 8775fbde2643
    "characters.nao.secrets.nao_the_notebook.fact": "Le carnet contient trente-et-un noms sur dix-neuf ans. Quatre sont revenus lui demander de retirer leur entrée.",
    // B · 47558a04be8d
    "characters.nao.secrets.nao_the_notebook.visibility": "NPC_PRIVATE",
    // B · 0f2950a1af59
    "characters.nao.secrets.nao_the_notebook.revealHint": "Elle le montre à toute personne qui lui donne un détail précis et vérifiable sur sa propre discontinuité.",
    // A · 585cd3313add
    "characters.nao.speechStyle": "Court, précis, sans adjectif qu’elle ne peut justifier. Elle donne les horaires au minute près. Elle termine par un point, jamais par une question, et elle attend.",
    // A · 01bfa9498d13
    "characters.nao.topics": ["le quai","le 01:11","le carnet","le service de nuit","ceux qui reviennent"],
    // A · 47808f930a09
    "characters.nao.voiceSamples": ["Il arrive à une heure onze. Pas toutes les nuits. J’ai dix-neuf ans de quand, zéro de pourquoi.","Je sais pas. C’est tout, et je préfère ça à une réponse moins franche.","Trente-et-un noms. Quatre sont revenus demander à retirer le leur, je l’ai fait, et je me souviens quand même des quatre."],
    // B · 27e89664c32e
    "characters.nao.appearance": "Cinquante ans, manteau de la régie des transports deux tailles trop grand, lunettes de lecture sur un cordon, un carnet rigide dans la poche extérieure.",
    // B · 4b9c982bf343
    "characters.nao.visualHook": "Un carnet rigide, fermé par un élastique, toujours dans la même poche extérieure du manteau.",
    // B · 0a289279f385
    "characters.nao.silhouette": "Carrée et immobile, mains dans le dos, debout au centre exact d’un quai.",
    // B · 4b6bf263f4d8
    "characters.nao.artSeed": "gmh-nao-01",
    // B · 813bb25096d2
    "characters.nao.portrait": "story_good_morning_husband/nao",
    // B · ca4327217244
    "characters.nao.expressions": ["neutre","attentive","désolée"],
    // B · 58bf076219c5
    "characters.nao.knowledgeScope": ["quai_11","ville_aster","gare_centrale","le_carnet"],
    // B · 0ec16b2d87a6
    "characters.nao.gates.nao_shows_the_book.label": "Elle te montre le carnet",
    // B · 55a54e80451a
    "characters.nao.gates.nao_shows_the_book.kind": "CONFIANCE",
    // B · 105e795dd44a
    "characters.nao.gates.nao_shows_the_book.requires.flagsSet": ["sait :la_couture"],
    // B · a5a3dba46cad
    "characters.nao.gates.nao_takes_you_down.label": "Elle t’emmène au bout de la gare",
    // B · 55a54e80451a
    "characters.nao.gates.nao_takes_you_down.kind": "CONFIANCE",
    // B · a3bb3b642113
    "factions.faction_mori.name": "La famille Mori",
    // B · 9c1a0bba5a54
    "factions.faction_mori.description": "Ses parents, son frère Kenji, deux tantes, et un groupe de discussion avec un nom que personne ne peut changer. Ils t’ont accueilli il y a quatre ans et ont leur avis sur comment tu vas.",
    // B · 48fd95a1c1f4
    "factions.faction_your_people.name": "Les gens de cette vie",
    // B · e5ecf232a57f
    "factions.faction_your_people.description": "La version de toi qui a vécu ici a rassemblé : un meilleur ami, quelques collègues, une équipe de cinq. Ils se souviennent de choses sur toi que tu ignores.",
    // B · f0ee9cbad4ad
    "quests.q_this_morning.title": "Bonjour, Mari",
    // B · 2ec041f8bd2d
    "quests.q_this_morning.summary": "Il y a une femme dans ta cuisine qui est ta femme depuis quatre ans, et elle t’a posé une question sur les crêpes.",
    // B · 7fcc0be2ad9c
    "quests.q_this_morning.kind": "PRINCIPALE",
    // B · 352b7ec0067e
    "quests.q_this_morning.steps.the_kitchen_scene.playerCopy": "Tiens bon pendant les dix premières minutes d’un mariage que tu ne te rappelles pas.",
    // B · a11429315f4b
    "quests.q_this_morning.steps.the_kitchen_scene.directorNotes": "Elle cuisine et s’attend à un samedi ordinaire qu’elle a déjà vécu deux cents fois. Chaque façon de gérer la situation est valable, aucune n’est fausse. Ne la laisse pas deviner la vérité : si le joueur lui dit, elle pense d’abord que c’est une blague, parce que c’est leur habitude. Quoi que le joueur fasse, elle réagit à ce qui se passe, pas à l’idée de départ.",
    // B · f8ee864b565f
    "quests.q_this_morning.steps.the_kitchen_scene.rewards.flags": ["sait :le_fossé"],
    // B · 7c152be8e3dd
    "quests.q_this_morning.steps.the_rest_of_saturday.playerCopy": "Découvre quel genre de vie c’est vraiment.",
    // B · 797260ee73b2
    "quests.q_this_morning.steps.the_rest_of_saturday.directorNotes": "Un samedi ordinaire. Courses, lessive, la bibliothèque, le canapé, une dispute pour rien. Cette étape montre que ce monde vaut la peine d’être gardé, elle doit être agréable. Rien ne force le joueur : s’il passe tout son temps à faire les courses avec elle en rigolant, c’est l’expérience prévue, pas un retard.",
    // B · f8ee864b565f
    "quests.q_this_morning.steps.the_rest_of_saturday.enterWhen.flagsSet": ["sait :le_fossé"],
    // B · 61ab59ca7778
    "quests.q_this_morning.steps.the_rest_of_saturday.rewards.flags": ["premier_samedi_termine"],
    // B · f86db0bf4a04
    "quests.q_this_morning.involvedCharacterIds": ["hana"],
    // B · ee20d4077db0
    "quests.q_this_morning.involvedLocationIds": ["la_cuisine","appartement_8b"],
    // B · 8b48906feeb2
    "quests.q_this_morning.knownRewardCopy": "Une idée de ce qu’est cette vie, et si elle sait que quelque chose cloche.",
    // B · 817f5b2f183a
    "quests.q_the_fellowship.title": "Ce Qu’elle N’a Pas Dit",
    // B · ba13556eb0a6
    "quests.q_the_fellowship.summary": "Six mois, une autre ville, ça commence dans neuf semaines. Il y a une date limite et c’est jeudi.",
    // B · 7fcc0be2ad9c
    "quests.q_the_fellowship.kind": "PRINCIPALE",
    // B · 61ab59ca7778
    "quests.q_the_fellowship.discoverWhen.flagsSet": ["premier_samedi_termine"],
    // B · b2c9baf2be24
    "quests.q_the_fellowship.steps.find_out.playerCopy": "Découvre ce que Hana ne te dit pas.",
    // B · 0c92edea772a
    "quests.q_the_fellowship.steps.find_out.directorNotes": "Trois façons incompatibles de l’apprendre, elles ne se valent pas. Qu’on te le dise, c’est la version où le mariage marche. Trouver la lettre, c’est la version où le joueur sait quelque chose qu’on lui a caché. L’avoir d’Emi, c’est la version où Hana découvre que sa meilleure amie a dit la vérité à son mari avant elle, et elle a le droit d’être furieuse.",
    // B · 0b528eb7479f
    "quests.q_the_fellowship.steps.find_out.rewards.flags": ["l_affaire_sur_la_table"],
    // B · 4420f2d5e14d
    "quests.q_the_fellowship.steps.what_you_do_about_it.playerCopy": "Décidez ensemble de ce qui se passe dans neuf semaines.",
    // B · a5fb5919cd74
    "quests.q_the_fellowship.steps.what_you_do_about_it.directorNotes": "C’est une négociation entre deux personnes qui veulent quelque chose de raisonnable, pas un test avec une bonne réponse. Elle ne se laisse pas commander : un joueur qui décide pour elle obtient un accord, puis un mariage plus calme. Chaque voie est viable, aucune n’est la bonne fin en soi.",
    // B · 0b528eb7479f
    "quests.q_the_fellowship.steps.what_you_do_about_it.enterWhen.flagsSet": ["l_affaire_sur_la_table"],
    // B · 507a39dd22d8
    "quests.q_the_fellowship.steps.what_you_do_about_it.rewards.flags": ["decision_sur_l_affaire"],
    // B · 839ac73aa523
    "quests.q_the_fellowship.involvedCharacterIds": ["hana","emi"],
    // B · b374216ec89a
    "quests.q_the_fellowship.involvedLocationIds": ["appartement_8b","le_balcon","studio_de_hana"],
    // B · 60cea2964601
    "quests.q_the_fellowship.knownRewardCopy": "Ce que ta femme porte depuis février, et une décision que vous devez prendre ensemble dans la même pièce.",
    // B · 1d22e64c2eed
    "quests.q_the_spare_room.title": "Onze Mètres Carrés",
    // B · b94a18ef35e1
    "quests.q_the_spare_room.summary": "Un étendoir, quatre cartons fermés, un lit parapluie en kit et un vélo d’appartement. Chacun est une réponse différente.",
    // B · 552c0b7f83c2
    "quests.q_the_spare_room.kind": "SECONDAIRE",
    // B · f8ee864b565f
    "quests.q_the_spare_room.discoverWhen.flagsSet": ["sait :le_fossé"],
    // B · 75fdaf58029c
    "quests.q_the_spare_room.steps.decide_what_it_is.playerCopy": "Décide à quoi sert la chambre d’appoint.",
    // B · 5a503f1d41ff
    "quests.q_the_spare_room.steps.decide_what_it_is.directorNotes": "Personne dans cet appartement n’a prononcé le mot « enfants » depuis un an, mais ils y pensent tous les deux. Le lit parapluie est encore dans son emballage depuis huit mois, personne ne l’a bougé ni jeté. Le joueur peut décider n’importe quoi, même tout jeter et laisser la pièce vide, et Hana réagit vraiment à chaque choix.",
    // B · 2a28062bc747
    "quests.q_the_spare_room.steps.decide_what_it_is.rewards.flags": ["sait :ce_que_tu_veux"],
    // B · 6d2cf75e6a2b
    "quests.q_the_spare_room.involvedCharacterIds": ["hana","kenji"],
    // B · e35023fe09a8
    "quests.q_the_spare_room.involvedLocationIds": ["la_chambre_d_appoint","appartement_8b"],
    // B · afe87eb34c91
    "quests.q_the_spare_room.knownRewardCopy": "Une décision sur la pièce, qui est une décision sur plusieurs choses importantes que personne n’a dites à voix haute.",
    // B · d82071e23a3b
    "quests.q_what_this_becomes.title": "Ce Que Ça Devient",
    // B · 74728202cf87
    "quests.q_what_this_becomes.summary": "Quatre ans plus tard, avec tout sur la table, vous devez dire ce que vous êtes l’un pour l’autre maintenant.",
    // B · 7fcc0be2ad9c
    "quests.q_what_this_becomes.kind": "PRINCIPALE",
    // B · 507a39dd22d8
    "quests.q_what_this_becomes.discoverWhen.flagsSet": ["fellowship_decided"],
    // B · f5f9f19abe2b
    "quests.q_what_this_becomes.steps.say_what_it_is.playerCopy": "Dis ce que vous êtes devenus tous les deux.",
    // B · 63ca11f00f1b
    "quests.q_what_this_becomes.steps.say_what_it_is.directorNotes": "Quatre issues possibles, aucune n’est un échec. Mettre fin honnêtement est aussi valable que de se réengager, et le joueur ne doit jamais lire le contraire. S’éloigner, c’est ce qui arrive quand personne ne parle, donc c’est une issue accessible par l’inaction et il faut la traiter comme une vraie fin, pas une punition.",
    // B · 10c43ddc0bb5
    "quests.q_what_this_becomes.steps.say_what_it_is.rewards.flags": ["knows :what_this_is"],
    // B · a8d0ad6ab9b6
    "quests.q_what_this_becomes.involvedCharacterIds": ["hana","emi","kenji"],
    // B · 81acebbdf5b9
    "quests.q_what_this_becomes.involvedLocationIds": ["apartment_8b","the_balcony","the_usual_place"],
    // B · 20d761785ad0
    "quests.q_what_this_becomes.knownRewardCopy": "Une réponse, trouvée à deux, sur la poursuite ou non de ce mariage et sous quelle forme.",
    // B · 1f867c2d3425
    "quests.q_platform_eleven.title": "Quai 11",
    // B · fe42ff19e713
    "quests.q_platform_eleven.summary": "Un billet pour un service à onze minutes après une heure, depuis un quai que cette gare n’a pas.",
    // B · eff80c847ff6
    "quests.q_platform_eleven.kind": "LEAD",
    // B · 105e795dd44a
    "quests.q_platform_eleven.discoverWhen.flagsSet": ["knows :the_seam"],
    // B · c3dc52f532ad
    "quests.q_platform_eleven.steps.find_the_platform.playerCopy": "Trouve le quai au bout de la gare centrale d’Aster City.",
    // B · d28c72e09de4
    "quests.q_platform_eleven.steps.find_the_platform.directorNotes": "Cette quête est optionnelle et doit le rester. Un joueur qui ne déclenche jamais `knows :the_seam` ne la voit pas, et un samedi ordinaire suffit pour finir le jeu. Pour un joueur qui est là, garde une ambiance discrète et concrète plutôt qu’étrange — carrelage, horaires, une femme avec un carnet. Personne n’explique le mécanisme, parce que personne dans ce monde ne le connaît.",
    // B · 35726f317ed4
    "quests.q_platform_eleven.steps.find_the_platform.rewards.flags": ["knows :what_happened"],
    // B · 80a45fd63c9b
    "quests.q_platform_eleven.steps.the_choice.playerCopy": "Décide si tu montes dedans.",
    // B · e5d73d8e65d3
    "quests.q_platform_eleven.steps.the_choice.directorNotes": "Le 01:11 va quelque part et personne ne peut dire où. Repartir n’est pas une victoire, rester n’est pas une défaite. Ce qui compte, c’est si le joueur a quelque chose ici qu’il laisserait, question déjà répondue par les dernières heures de jeu.",
    // B · 2a5939ee4d12
    "quests.q_platform_eleven.steps.the_choice.enterWhen.flagsSet": ["found_platform_11"],
    // B · 85c29a13da85
    "quests.q_platform_eleven.steps.the_choice.rewards.flags": ["platform_answered"],
    // B · 55c670d506f7
    "quests.q_platform_eleven.involvedCharacterIds": ["nao","lucia","hana"],
    // B · 641a3a718fa0
    "quests.q_platform_eleven.involvedLocationIds": ["central_station","platform_eleven"],
    // B · 7e11dc0faf66
    "quests.q_platform_eleven.knownRewardCopy": "Une explication, d’une sorte, pour un matin où rien ne s’est passé.",
    // B · 191fd6d5c24f
    "worldEvents.we_emi_arrives.publicCopy": "Emi Takeda entre avec une clé qu’elle a depuis trois ans, dit « c’est juste moi » à tout l’appartement, et met la bouilloire en marche avant d’enlever son manteau.",
    // B · 3627d0001bb8
    "worldEvents.we_emi_arrives.directorNotes": "Elle est là parce que Hana lui a demandé de venir sans dire pourquoi. Elle passera quarante minutes à être drôle et environ quatre-vingt-dix secondes à être directe, et cette partie directe s’adresse au joueur.",
    // B · b772efc108c3
    "worldEvents.we_emi_arrives.setsFlags": ["emi_came_round"],
    // B · 26245f495b36
    "worldEvents.we_the_wrong_photograph.publicCopy": "La troisième photo sur l’étagère, c’est le voyage sur la côte. Sur cette photo, tu portes une veste noire. La veste noire n’a jamais été dans cet appartement.",
    // B · 34981693c047
    "worldEvents.we_the_wrong_photograph.directorNotes": "Le premier vrai décalage, visible seulement pour un joueur qui a fouillé l’appartement ce matin. Ne le rends pas inquiétant. C’est une petite erreur factuelle dans une pièce chaleureuse, la bonne réaction est une légère confusion, pas de la peur.",
    // B · 105e795dd44a
    "worldEvents.we_the_wrong_photograph.setsFlags": ["knows :the_seam"],
    // B · c2d0f1f6ffd3
    "worldEvents.we_the_wrong_photograph.requiresFlags": ["searched_the_flat"],
    // B · 1e1ca68e7659
    "worldEvents.we_the_last_train.publicCopy": "Le panneau bascule sur le dernier service puis bascule encore, pour un départ à 01:11 depuis un quai qui n’apparaît pas une seconde plus tard.",
    // B · 2c1fbc2ae247
    "worldEvents.we_the_last_train.directorNotes": "Seulement pour un joueur qui est allé à la gare la nuit, ce qui est déjà étrange pour un premier week-end d’un mariage qu’il ne se rappelle pas. Nao Ibarra est à douze mètres et l’a vu voir ça.",
    // B · 105e795dd44a
    "worldEvents.we_the_last_train.setsFlags": ["knows :the_seam"],
    // B · 7b83247423cc
    "worldEvents.we_the_last_train.requiresFlags": ["visited :central_station"],
    // B · 2734de0becbb
    "worldEvents.we_kenji_asks.publicCopy": "La camionnette de Kenji Mori est en double file devant la boulangerie, et il s’appuie dessus en t’attendant, pas quelqu’un d’autre.",
    // B · 1946b7267e94
    "worldEvents.we_kenji_asks.directorNotes": "Hana a dit quelque chose à sa mère, sa mère a dit quelque chose à Kenji, et Kenji a décidé de gérer ça lui-même de la façon la moins conflictuelle, c’est-à-dire en t’emmenant en camionnette.",
    // B · 032ff0c9ecc3
    "worldEvents.we_kenji_asks.setsFlags": ["kenji_noticed"],
    // B · 61ab59ca7778
    "worldEvents.we_kenji_asks.requiresFlags": ["first_morning_over"],
    // B · 95048b57f502
    "worldEvents.we_family_dinner.publicCopy": "Le dîner du dimanche chez les Mori, qui n’est pas optionnel, et où onze personnes te poseront les mêmes quatre questions à tour de rôle.",
    // B · c7f8bae038a6
    "worldEvents.we_family_dinner.directorNotes": "Chaleureux, bruyant, et un peu trop. Sa mère est ravie. Kenji observe. Ce que le joueur a décidé d’être cette semaine se lit dans cette pièce en vingt minutes, et quelqu’un le dira dans la cuisine.",
    // B · f75708fc40ef
    "worldEvents.we_family_dinner.setsFlags": ["family_dinner_happened"],
    // B · 61ab59ca7778
    "worldEvents.we_family_dinner.requiresFlags": ["first_morning_over"],
    // B · 81f6d265262b
    "worldEvents.we_the_deadline.publicCopy": "Jeudi. Quelque part dans la ville, une offre restée ouverte depuis février cesse de l’être à la fin de la journée de travail.",
    // B · 5b6419a1eb69
    "worldEvents.we_the_deadline.directorNotes": "Si la relation n’a pas été discutée, Hana passera la journée à être parfaitement normale, et sera ailleurs pendant deux heures l’après-midi. Elle laisse passer ça sans rien dire, et quelque chose sort d’elle qui ne revient pas tout seul.",
    // B · f4008474c883
    "worldEvents.we_the_deadline.setsFlags": ["deadline_passed"],
    // B · 507a39dd22d8
    "worldEvents.we_the_deadline.cancelledByFlags": ["fellowship_decided"],
    // B · 9b9677fd5ae4
    "worldEvents.we_the_anniversary.publicCopy": "Le quatorze est entouré sur le calendrier du hall avec deux stylos différents, c’est comme ça que vous savez que vous l’avez fait chacun de votre côté.",
    // B · ec6e80e0ed17
    "worldEvents.we_the_anniversary.directorNotes": "Quatre ans. Aucun des deux n’a organisé quoi que ce soit, chacun a supposé que l’autre l’avait fait, et une table au resto du coin est réservée depuis mardi par des gens qui n’ont pas été invités.",
    // B · 76aaa2af4fa0
    "worldEvents.we_the_anniversary.setsFlags": ["anniversary_arrived"],
    // B · 61ab59ca7778
    "worldEvents.we_the_anniversary.requiresFlags": ["first_morning_over"],
    // B · d77ebfcebe44
    "promises.p_whether_you_keep_it.kind": "FINALE",
    // B · a0ff645d4beb
    "promises.p_whether_you_keep_it.label": "Est-ce que cette vie sera la vôtre à la fin",
    // B · 7dd5d6b07927
    "promises.p_whether_you_keep_it.seedHint": "Une bague qui ne s’enlève pas facilement, sur une main qui a grandi autour.",
    // B · c01eda35a340
    "promises.p_whether_you_keep_it.payoffHint": "Quelqu’un dit à voix haute ce que vous êtes devenus, et c’est quelque chose qu’on construit plutôt qu’on annonce.",
    // B · 445cd8deebc2
    "promises.p_the_fellowship.kind": "RELATION",
    // B · d6f57d61ddb2
    "promises.p_the_fellowship.label": "Ce qu’elle porte en elle depuis février",
    // B · 804f76597834
    "promises.p_the_fellowship.seedHint": "Elle change de sujet deux fois dans la première heure, avec bonne humeur, pour ne pas parler de sa semaine.",
    // B · e1cc0fc5fd1e
    "promises.p_the_fellowship.payoffHint": "Six mois dans une autre ville, une offre plutôt qu’une candidature, avec une date limite de réponse jeudi.",
    // B · e82d9dc4b3fa
    "promises.p_who_you_were.kind": "MYSTÈRE",
    // B · 1cbd99ba2b97
    "promises.p_who_you_were.label": "Ce que l’homme qui vivait ici était vraiment",
    // B · 7dcf9f47f009
    "promises.p_who_you_were.seedHint": "Des annotations sur une notice de meuble en kit, écrites dans une écriture que tu ne reconnais pas.",
    // B · 9f3436a279b9
    "promises.p_who_you_were.payoffHint": "Lucia Vale a onze ans de lui, et une histoire qui ne colle pas avec les photos.",
    // B · f8b4a6708d82
    "promises.p_the_seam.kind": "THÈME",
    // B · 11709f164127
    "promises.p_the_seam.label": "Le matin où rien ne s’est passé",
    // B · f6a9a38eec01
    "promises.p_the_seam.seedHint": "Une veste noire sur une photo qui ne se trouve nulle part dans cet appartement.",
    // B · 8814e13b5c71
    "promises.p_the_seam.payoffHint": "Un quai que la gare n’a pas, un service à 01:11, et un carnet avec trente-et-un noms.",
    // B · f8b4a6708d82
    "promises.p_the_room.kind": "THÈME",
    // B · 0dbcbe5a25d1
    "promises.p_the_room.label": "Les onze mètres carrés que personne n’a décidés",
    // B · f2e6986b4c16
    "promises.p_the_room.seedHint": "Un lit parapluie en kit, encore dans son emballage, que personne n’a bougé ni jeté depuis huit mois.",
    // B · 4569bed6ef07
    "promises.p_the_room.payoffHint": "Quelqu’un finit par dire ce qu’il veut, et la pièce devient une au lieu de quatre.",
    // B · 24cb2f044b94
    "endings.end_sunday_morning.name": "Dimanche matin",
    // B · c9d08ae5d876
    "endings.end_sunday_morning.rarity": "COURANT",
    // B · 61ab59ca7778
    "endings.end_sunday_morning.requires.flagsSet": ["first_morning_over"],
    // B · e765033a420b
    "endings.end_sunday_morning.requires.flagsUnset": ["separated","went_back"],
    // B · 67a399238310
    "endings.end_sunday_morning.condition": "La fin tranquille. Le joueur est resté, le mariage est intact et sans histoire, et rien n’a été résolu — le trou de mémoire est juste un truc qui est arrivé et qui n’est plus le fait le plus intéressant de la semaine. Jouer petit et domestique : un dimanche, un petit déjeuner tardif, un plan pour l’après-midi que personne ne note. Personne ne fait de discours sur le choix de cette vie.",
    // A · d7b5962d908e
    "endings.end_sunday_morning.epilogue": "La bibliothèque est soit terminée, soit pas, et quoi qu’il en soit, plus personne n’en parle. Il y a une liste de courses sur le frigo, écrite à deux mains, et la plupart des articles sont barrés. Certains matins, pendant environ quatre secondes, l’appartement semble étranger à nouveau, puis ça passe.",
    // B · 6737f6247df8
    "endings.end_still_choosing.name": "Toujours en train de choisir",
    // B · 734e45c160cf
    "endings.end_still_choosing.rarity": "PEU COMMUN",
    // B · f05b96a55d67
    "endings.end_still_choosing.requires.flagsSet": ["chose_each_other","fellowship_decided"],
    // B · 2ab5ffd6cf58
    "endings.end_still_choosing.condition": "Ils ont traversé quelque chose de vrai — la relation, la pièce, peu importe ce que le joueur a fait ou pas — et ont dit à voix haute qu’ils font ça exprès. Ce n’est pas que rien ne s’est mal passé. C’est mieux que ça, et ça doit être écrit par quelqu’un qui sait faire la différence.",
    // A · dad5d0a62182
    "endings.end_still_choosing.epilogue": "La différence avec la deuxième fois, c’est que c’était un choix, pas un hasard, et tous les deux savent très bien ce que ça a coûté. Elle garde toujours la plus grosse part de la couette. Lui, il n’arrive toujours pas à monter une bibliothèque. Rien de tout ça n’est une métaphore, et c’est important pour eux.",
    // B · f94f3a3d30f6
    "endings.end_two_cities.name": "Deux villes",
    // B · f8b8333fe7bc
    "endings.end_two_cities.rarity": "RARE",
    // B · d2357ba3fac9
    "endings.end_two_cities.requires.flagsSet": ["she_took_it"],
    // B · 2a8d28d5c509
    "endings.end_two_cities.requires.flagsUnset": ["tu_as_déménagé_avec_elle","séparés"],
    // B · 89da8b8ed6df
    "endings.end_two_cities.condition": "Elle a accepté la bourse et le mariage a tenu pendant six mois et deux cents kilomètres. Décris la logistique plutôt que les sentiments — les appels à des heures impossibles, les deux jeux de clés, les trains du vendredi, l’appartement avec une seule personne dedans. Le travail à distance n’est pas une fin de compromis et ne doit pas se lire comme tel.",
    // A · a5dc4fa8c9ce
    "endings.end_two_cities.epilogue": "Six mois, c’est finalement vingt-six vendredis. Elle est meilleure que lui au téléphone, mais moins douée pour les fins, alors les appels s’éternisent puis s’interrompent net. Elle revient au printemps avec un portfolio et une manie de manger debout qui mettra un mois à partir.",
    // B · 16d400b37d52
    "endings.end_two_cities.hint": "Elle ne l’a pas encore dit, et il y a une date dessus.",
    // B · efb133762a06
    "endings.end_our_place.name": "Notre Chez-Nous",
    // B · f8b8333fe7bc
    "endings.end_our_place.rarity": "RARE",
    // B · 44bea01ef7ac
    "endings.end_our_place.requires.flagsSet": ["chambre_d_invités_installée","choisi_l_un_l_autre"],
    // B · b90a26f049de
    "endings.end_our_place.condition": "Ils ont construit quelque chose de précis et de nouveau ensemble — la chambre est devenue un lieu, la famille y est, et il y a des projets dans le calendrier qui ne sont pas des rendez-vous. Nomme ce qu’ils ont vraiment fait plutôt que de parler d’un futur, car le but de cette fin est qu’elle soit concrète.",
    // A · 5da19843c97a
    "endings.end_our_place.epilogue": "Kenji pose le parquet à prix coûtant et passe l’année à s’en plaindre. Sa mère vient voir le résultat deux fois avant que ce soit fini, et une fois après. Peu importe ce qu’est devenu ce onze mètres carrés, c’est la pièce dont ils sont les plus fiers, celle qu’ils montrent d’abord aux visiteurs.",
    // B · 904076194e1f
    "endings.end_a_life_i_chose.name": "Une Vie Que J’ai Choisie",
    // B · f8b8333fe7bc
    "endings.end_a_life_i_chose.rarity": "RARE",
    // B · 54d07a0f17b7
    "endings.end_a_life_i_chose.requires.flagsSet": ["elle_sait","sait :ce_que_tu_veux"],
    // B · e765033a420b
    "endings.end_a_life_i_chose.requires.flagsUnset": ["séparés","retourné"],
    // B · 592a28236f3a
    "endings.end_a_life_i_chose.condition": "Le joueur lui a dit la vérité, elle y a cru, et ils sont restés quand même. Cette fin parle de la deuxième chose : peu importe si cette vie était à l’origine la leur, parce que quatre ans s’y sont passés et la dernière semaine a été choisie en pleine conscience. Accessible sans jamais trouver la plateforme.",
    // A · 01357a584c49
    "endings.end_a_life_i_chose.epilogue": "Elle n’arrête jamais vraiment de vérifier, la première année — une question sur des vacances dont elle connaît déjà la réponse, posée à la légère au petit-déjeuner. Il répond à chaque fois. Vers la cinquième année, elle arrête de poser la question, et aucun des deux ne remarque quand.",
    // B · 1f867c2d3425
    "endings.end_platform_11.name": "Quai 11",
    // B · f7fc172f729a
    "endings.end_platform_11.rarity": "UNIQUE",
    // B · 2d22ae15b7bb
    "endings.end_platform_11.requires.flagsSet": ["plateforme_répondue","retourné","sait :ce_qui_est_arrivé"],
    // B · 2b8e6a3f429f
    "endings.end_platform_11.condition": "Le joueur a trouvé la plateforme et a pris le 01:11. Personne n’explique rien, car personne dans ce monde ne le peut. Cette fin parle de ce qu’ils ont laissé, et cela dépend entièrement de la qualité de la semaine précédente — un joueur malheureux ici aura une scène différente de celui qui était heureux et est parti quand même.",
    // A · db7e8d15437b
    "endings.end_platform_11.epilogue": "Nao Ibarra écrit le nom dans son carnet et remet l’élastique autour. Dans l’appartement 8B, une femme se réveille un mardi à côté de quelqu’un qui n’a jamais oublié son prénom, passe une très bonne semaine, et ne sait pas pourquoi elle continue de regarder la troisième photo sur l’étagère.",
    // B · 2f0037b2860a
    "endings.end_platform_11.hint": "Le tableau a clignoté deux fois.",
    // B · ae48774af83f
    "endings.end_stayed_knowing.name": "Laisser Partir Sans Toi",
    // B · f7fc172f729a
    "endings.end_stayed_knowing.rarity": "UNIQUE",
    // B · 0974172db648
    "endings.end_stayed_knowing.requires.flagsSet": ["plateforme_répondue","choisi_de_rester"],
    // B · 3b8f85c4f71e
    "endings.end_stayed_knowing.condition": "Le joueur a trouvé le chemin du retour, est resté sur le quai et n’est pas monté. Il sait maintenant avec certitude que cette vie n’est pas celle où il a commencé, et il la garde. Ne lui fais pas expliquer la décision. Qu’il rentre chez lui, et que quelqu’un soit réveillé.",
    // A · 2585c2514985
    "endings.end_stayed_knowing.epilogue": "Le 01:11 part comme toujours, c’est-à-dire sans un bruit. Le tram pour rentrer met quarante minutes à cette heure-là. Une lumière est allumée dans la cuisine du 8B alors que ça ne devrait pas, ce n’est pas un mystère, c’est Hana, qui n’arrive pas à dormir.",
    // B · 5a102805afa9
    "endings.end_goodbye_hana.name": "Adieu, Hana",
    // B · 734e45c160cf
    "endings.end_goodbye_hana.rarity": "PEU COMMUN",
    // B · 95ddb272dcdd
    "endings.end_goodbye_hana.requires.flagsSet": ["séparés","fini_honnêtement"],
    // B · 5330cbb895bb
    "endings.end_goodbye_hana.condition": "Le mariage est fini et les deux ont bien agi. Personne n’est un méchant, personne n’a été trahi, et ils iront tous les deux bien un jour, même s’ils ne vont pas bien aujourd’hui. Écris la fin pratique d’une vie commune — l’appartement, la séparation, qui garde les mugs — et que ce soit triste sans être tragique.",
    // A · 5008834e48f0
    "endings.end_goodbye_hana.epilogue": "Ils trient les photos selon les personnes dessus et, d’une façon ou d’une autre, ils finissent tous deux avec celle de la côte. Emi Takeda met environ huit mois avant de lui reparler, puis ça arrive, longuement, dans la queue d’une boulangerie. En septembre, l’appartement est loué à un couple qui trouve le balcon génial.",
    // B · fb655874828f
    "endings.end_separate_rooms.name": "Chambres Séparées",
    // B · c9d08ae5d876
    "endings.end_separate_rooms.rarity": "COMMUN",
    // B · e5f1aa21a5ee
    "endings.end_separate_rooms.requires.flagsSet": ["séparés","fini_par_usure"],
    // B · 8f96a8d79378
    "endings.end_separate_rooms.condition": "Personne n’a rien dit et ça s’est fini quand même. C’est la fin ratée d’un vrai mariage et ça ne doit pas être écrit comme une punition pour avoir mal joué — le joueur a été poli, présent, et n’a jamais abordé le sujet, et c’était un choix. Il n’y a pas de scène où quelqu’un explique ce qui a mal tourné, parce qu’aucun des deux ne pouvait.",
    // A · ae22f29aad30
    "endings.end_separate_rooms.epilogue": "On ne sait pas très bien quelle semaine tout ça a vraiment pris fin. Elle prend la bourse ou pas ; dans les deux cas, elle ne passe plus beaucoup de temps dans l’appartement à partir d’octobre. La dernière chose qu’ils disent à voix haute à ce sujet est une conversation à propos de qui va le dire à sa mère.",
    // B · 7d5abc0707b6
    "endings.end_again_from_the_beginning.name": "Encore, Depuis Le Début",
    // B · f8b8333fe7bc
    "endings.end_again_from_the_beginning.rarity": "RARE",
    // B · e343c7524c01
    "endings.end_again_from_the_beginning.requires.flagsSet": ["séparés","refréquentation"],
    // B · c10c1678b554
    "endings.end_again_from_the_beginning.condition": "Ils ont mis fin au mariage puis, dans des conditions complètement différentes, ont recommencé à se voir. Ce n’est pas un mariage sauvé au dernier moment. Ce sont deux personnes qui ont décidé que ce qu’ils avaient était fini et qu’ils voulaient encore être ensemble, ce qui est plus dur et plus précis à écrire.",
    // A · 82c97c007105
    "endings.end_again_from_the_beginning.epilogue": "Le premier vrai rendez-vous a lieu au resto du coin, à la mauvaise table exprès, et est insupportable pendant une vingtaine de minutes, puis ça va mieux. Personne ne fait de proposition. Quand j’écris ça, ça fait neuf mois qu’ils vivent quelque chose qu’aucun ne nommera devant Kenji.",
    // B · 2baa00c10207
    "endings.end_the_man_who_left.name": "L’Homme Qui Est Part",
    // B · 734e45c160cf
    "endings.end_the_man_who_left.rarity": "PEU COMMUN",
    // B · b0eff3470103
    "endings.end_the_man_who_left.requires.flagsSet": ["a_quitté_la_carte"],
    // B · 453a1e7fe8e0
    "endings.end_the_man_who_left.requires.flagsUnset": ["elle_sait"],
    // B · 4fe38608fb47
    "endings.end_the_man_who_left.condition": "Le joueur est parti d’une vie qui, à tous points de vue, était bonne, sans rien expliquer à personne. Ne fais pas de cette histoire une tragédie ni une rédemption. C’est une réponse parfaitement cohérente à se réveiller marié à un inconnu, et la personne qui en souffre le plus n’est pas le joueur.",
    // A · 6da93ee6a238
    "endings.end_the_man_who_left.epilogue": "La bague est posée sur le plan de travail, à côté de la liste. Hana appelle Emi à deux heures, son frère à six, et la police à neuf, et aucune de ces conversations ne se passe comme dans les films. Ce qu’elle n’arrive pas à digérer, pendant presque un an, c’est qu’il y avait eu des crêpes.",
    // A · 23702078df66
    "archetypes.arch_hands.name": "Tu Construis Des Choses",
    // B · a3048669c951
    "archetypes.arch_hands.role": "Travail manuel et concret",
    // A · 3f99a8aed758
    "archetypes.arch_hands.summary": "Tu travailles de tes mains, donc l’appart est rempli de projets que tu peux vraiment finir et de gens qui te demandent de les faire.",
    // A · 55cdc87b7e17
    "archetypes.arch_hands.playstyle": ["Pratique","Physique","Répare des trucs"],
    // A · 1f305c572197
    "archetypes.arch_hands.blurb": "Quelqu’un dans l’immeuble a toujours besoin d’un coup de main, et tu n’as jamais refusé un boulot qu’on pouvait faire en une après-midi.",
    // A · 1fb74d5832de
    "archetypes.arch_ledger.name": "Tu Travaille Avec Les Chiffres",
    // B · 2bf66c2d2e0a
    "archetypes.arch_ledger.role": "Analyse et patience sociale",
    // A · d27117fbd1e0
    "archetypes.arch_ledger.summary": "Tu passes tes journées à décrypter ce qu’un papier veut vraiment dire, et ça marche aussi bien avec les gens qu’avec la cuisine.",
    // A · 479be623f3c7
    "archetypes.arch_ledger.playstyle": ["Observateur","Prudent","Long à s’engager"],
    // A · 948c94da5572
    "archetypes.arch_ledger.blurb": "Quatre ans à décortiquer les contrats des autres t’ont rendu très bon pour repérer la clause que quelqu’un voulait que tu zappes.",
    // A · b44d86456abd
    "archetypes.arch_kitchen.name": "Tu Cuisines Pour Gagner Ta Vie",
    // B · 3f00b8f64ae8
    "archetypes.arch_kitchen.role": "Nourriture et chaleur",
    // A · 8b3a0b17afd1
    "archetypes.arch_kitchen.summary": "Tu nourris les gens professionnellement, ce qui dans cet appartement veut dire que tu trouves toujours un moyen de dire quelque chose sans le dire vraiment.",
    // A · adf02ad31f42
    "archetypes.arch_kitchen.playstyle": ["Chaleureux","Généreux","Horaires décalés"],
    // A · 4a8868b772d1
    "archetypes.arch_kitchen.blurb": "Onze ans de service, et tu n’arrives toujours pas à t’asseoir dans la cuisine de quelqu’un sans redresser les manches des casseroles.",
    // A · 0c9e60025400
    "archetypes.arch_words.name": "Tu enseignes ou écris",
    // B · d3961531f5ae
    "archetypes.arch_words.role": "Parler et improviser",
    // A · b41892565e02
    "archetypes.arch_words.summary": "Ton boulot, c’est de te tenir devant des gens sans avoir toutes les réponses, exactement la position dans laquelle tu t’es réveillé.",
    // A · cf64ed509ca2
    "archetypes.arch_words.playstyle": ["Bien parlé","Rapide","Trop réfléchi"],
    // A · 9f15d25c55c0
    "archetypes.arch_words.blurb": "Tu as parlé pour t’imposer dans une pièce où les autres en savaient plus que toi, plusieurs fois, et tu ne l’as jamais vraiment apprécié.",
    // B · fa580a49fdc2
    "setupFields.displayName.label": "Comment elle t’appelle-t-elle ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · e7771c7c2254
    "setupFields.displayName.placeholder": "ex. Rowan Adeyemi",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 98ebf1cfdd14
    "setupFields.pronouns.placeholder": "ex. il/lui",
    // B · 441d1b569ebf
    "setupFields.archetype.label": "Qu’est-ce que tu fais dans cette vie ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHETYPE",
    // B · 0cb7dacc6b74
    "setupFields.archetype.helpText": "Le job de la version de toi qui vit ici, qui détermine ce dans quoi tu es bon. C’est fixe pour toute l’histoire. Ça ne décide pas quel mari tu étais, si tu lui dis la vérité, ou si ce mariage tient la semaine — tout ça, c’est toi qui choisis, pas ici.",
    // B · 39049b80e4d3
    "setupFields.worldKnowsAboutYou.label": "Qu’est-ce qui est vrai de toi dans les deux vies ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · ae76414ee946
    "setupFields.worldKnowsAboutYou.helpText": "La part de toi que les quatre années manquantes n’ont pas changée. La plupart écrivent une phrase simple, c’est la bonne longueur.",
    // B · 2fdacdf3d093
    "setupFields.worldKnowsAboutYou.placeholder": "ex. Je ne suis jamais à l’heure, et je gère super bien les crises, ce qui agace les gens.",
    // B · a434ab53a50f
    "setupFields.how_you_take_it.label": "Quelle est ta première réaction ce matin ?",
    // B · b6a31c665c0b
    "setupFields.how_you_take_it.kind": "CHOIX",
    // B · 2488027619db
    "setupFields.how_you_take_it.helpText": "Un tempérament de départ, pas un engagement. Tu peux faire le contraire en cuisine et le monde suit.",
    // B · cbb69c160a6b
    "setupFields.how_you_take_it.options.tell_the_truth.label": "Le dire tout de suite à voix haute et gérer les conséquences",
    // B · 1ee68ea7b963
    "setupFields.how_you_take_it.options.keep_it_quiet.label": "Ne rien dire tant que tu n’as pas compris ce qui se passe",
    // B · 5924496abba3
    "setupFields.how_you_take_it.options.enjoy_it.label": "Décider que cette vie est mieux que celle que j’avais",
    // B · d15021a27a1f
    "setupFields.how_you_take_it.options.get_out.label": "Trouver comment partir sans faire de scène",
    // B · 1adc9ec4d48e
    "setupFields.how_you_take_it.options.find_out_why.label": "Supposer qu’il y a une raison et chercher laquelle",
    // B · 0461d7e1fc82
    "setupFields.appearance.label": "Qu’est-ce qu’elle voit de l’autre côté de la cuisine ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · e6190ceb96f5
    "setupFields.appearance.placeholder": "ex. Trop grand pour cet appartement, trois jours sans rasage, et un T-shirt que je suis sûr qu’elle porte.",
    // B · 3aa4328667d6
    "protagonist.kind": "VIDE",
    // A · 541b5472ea5c
    "opening": "La cuisine est à quatre pas du lit et tu les fais tous les quatre avant même d’avoir décidé.\n\nUne femme est devant les plaques, dans une chemise trop grande, les cheveux fixés avec ce qui ressemble à un crayon, elle tourne un truc dans une poêle sans le regarder. Deux mugs sont posés. L’un est ébréché sur le bord, c’est visiblement le tien depuis des années.\n\n« Bonjour, chéri », dit-elle, et tend la main libre vers la tienne sans se retourner, parce que c’est apparemment une habitude chez vous.\n\nLa poêle glougloute. Dans la rue, quelqu’un sort les poubelles, mal fait.\n\nSa main est toujours là, qui attend.",
    // A · abac730f53cc
    "openingSuggestions": ["Je prends sa main, parce que mon corps a déjà choisi, et je me laisse entraîner derrière elle. Elle sent le café et quelqu’un que je ne connais pas. « Bonjour », dis-je dans ses cheveux, sans avoir la moindre idée de son prénom.","Je m’assois plutôt au comptoir et je le dis direct. « Faut que tu arrêtes de rire. Je viens de me réveiller il y a dix minutes, je sais pas comment tu t’appelles, je connais pas cet appart, et je sais pas depuis combien de temps on est mariés. »","Je laisse sa main suspendue une seconde de trop, lui enlève la poêle et commence à faire quelque chose d’utile avec. « Assieds-toi. Je gère. » Puis je regarde vraiment la photo sur l’étagère derrière elle, pour la première fois."],
  },
});
