import { registerWorldText } from '@aniplay/contracts';

/**
 * Last Service, in French.
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
  storyId: "story_last_service",
  text: {
    // A · 73b04eaab2cf
    "fantasyLabel": "Trente couverts. Trente jours. Une cuisine.",
    // A · fd3b6263b2bf
    "hook": "Le restaurant familial de trente couverts a trente jours avant que le prêteur ne réclame le remboursement, et un vendredi soir la meilleure jeune cheffe de la ville entre à l’abri de la pluie avec une invitation.",
    // A · 7f6340954418
    "premise": "C’est vendredi, il pleut, et la hotte aspirante de la cuisine familiale fait un bruit qu’elle ne devrait pas faire.\n\nTrente couverts, à moitié remplis environ. Un brûleur qui ne s’allume pas correctement. Le fournisseur a appelé deux fois aujourd’hui et personne n’a rappelé. Une table vient de retourner un plat, poliment, parce que le poisson était trop cuit, et ils avaient raison.\n\nTa tante gère cet établissement depuis dix-neuf ans et elle n’a pas pris un jour complet de congé depuis mars. Il y a eu une rénovation, un prêt, quatre mauvais mois, et le prêteur a donné trente jours.\n\nPersonne dans ce bâtiment n’a encore osé prononcer le mot fermeture à voix haute.\n\nPuis la porte s’ouvre et une femme entre, trempée, avec son rouleau de couteaux sur l’épaule, et chaque cuisinier en poste la repère avant qu’elle n’ait fait deux pas, parce que cette ville connaît son visage.\n\nElle n’est pas venue pour manger. Elle est venue avec une invitation, et tu dois décider en une minute ce que tu vas lui répondre.",
    // A · 1ad0fa1f78bf
    "mechanicsChips": ["Cuisiner tout ce que tu sais décrire","Le service est décidé en salle","Tous les plats ne sont pas notés","L’attention est dangereuse","Bien finir, c’est une fin"],
    // A · 2af44a038660
    "creatorNote": "Tu peux gagner tout le circuit et perdre le restaurant, ou perdre tous les services et le garder. Les meilleures scènes ne sont pas des compétitions — un repas de personnel, un ami qui ne peut pas manger, quelqu’un qui apprend à bien couper un oignon à onze heures du soir. Faut-il sauver Akari, c’est une vraie question, et l’histoire ne sait pas.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE CLÉ",
    // B · 5ed37de20294
    "rules.hardCanon": ["Akari est un restaurant de quartier de trente places tenu par la famille du joueur. Sa cuisine est ce que le joueur dit qu’elle est, et rien dans ce monde ne la verrouille.","Akari a une dette de rénovation, un prêt, quatre mauvais mois et une hotte cassée, et le prêteur a donné trente jours.","La City Table est un circuit d’un mois de services à travers la ville. Ce n’est pas un simple tournoi à élimination : certains services sont en duel, d’autres classés, certains collaboratifs et d’autres sans gagnant.","Mina Saegusa est sous-cheffe chez VANTA et est venue à Akari pour remettre une invitation, pas pour se moquer de qui que ce soit.","Keiko tient Akari depuis dix-neuf ans et assimile sa fermeture à une trahison familiale. Elle n’a pas tort de l’aimer et elle la préserve au-delà de sa propre santé.","Sauver Akari financièrement n’est pas forcément la bonne fin, et l’histoire ne prétend jamais que ce le soit.","Personne dans ce monde n’est un méchant. Le critique doit la vérité au client, le prêteur applique des conditions ordinaires, et le chef célèbre respecte sincèrement les petits restaurants."],
    // A · 501a66c0d637
    "rules.toneGuide": "Une ville japonaise moderne au bord de la mer, affamée : un marché aux poissons à cinq heures, un marché de nuit avec un seul stand qui fait quatre cents couverts sur un seul feu, une salle d’arcade avec trois rideaux baissés, une cuisine de banquet d’hôtel, une école culinaire dont on ne perd jamais l’odeur. La cuisine est exaltée comme le sport dans les animes — le son, la chaleur, le rythme, le bruit précis d’une poêle quand c’est parfait — sans jamais faire briller personne. La technique est réelle, la physique est réelle. Le service, c’est la moitié de l’histoire. Un plat brillant et une attente de quarante minutes sans raison, c’est un service raté, et Emi est la raison que ça ne le soit pas. Tous les plats ne sont pas notés. Repas du personnel, un ami qui ne peut pas manger, nourriture pour funérailles, restes à une heure du matin. Si tout est une compétition, la cuisine perd son sens. L’argent est précis, constant et ennuyeux : un fournisseur à payer, un devis de hotte, un nombre de couverts, un mardi à quarante.",
    // B · ee0b0f048f5b
    "skills.knife.name": "Travail au couteau",
    // B · 7ce3b6387340
    "skills.knife.attribute": "agilité",
    // B · a4474ced4781
    "skills.knife.description": "Vitesse, régularité et les onze minutes de préparation qui décident si un service est tenable.",
    // B · fc6018b79ee3
    "skills.heat.name": "Chaleur",
    // B · a8c1fa8269c3
    "skills.heat.attribute": "esprit",
    // B · 5ea2e1848dae
    "skills.heat.description": "Protéine, poêle, timing, et la différence entre un poisson parfait et un poisson cuit depuis trente secondes de trop.",
    // B · d88423e819da
    "skills.palate.name": "Palais",
    // B · a8c1fa8269c3
    "skills.palate.attribute": "esprit",
    // B · 5656e68c8928
    "skills.palate.description": "Goûter une chose et savoir ce qu’il lui manque plutôt que ce qui est présent.",
    // B · cc4170218307
    "skills.the_pass.name": "Le Passe-plat",
    // B · cfb7a15645c3
    "skills.the_pass.attribute": "présence",
    // B · 93aacc9231dd
    "skills.the_pass.description": "Gérer une ligne : appeler, synchroniser quatre postes pour une assiette, et se faire obéir à volume.",
    // B · 858666676520
    "skills.front.name": "Salle",
    // B · cfb7a15645c3
    "skills.front.attribute": "présence",
    // B · f9059afb29ed
    "skills.front.description": "Lire une salle, sauver une table et expliquer une attente de quarante minutes pour qu’elle ne paraisse plus longue.",
    // B · 3c0036dfda1b
    "skills.sourcing.name": "Approvisionnement",
    // B · a8c1fa8269c3
    "skills.sourcing.attribute": "esprit",
    // B · 2a96ff5916a1
    "skills.sourcing.description": "Fournisseurs, le marché à cinq heures, ce qui est vraiment bon cette semaine et son prix.",
    // B · ddb75a4834b7
    "skills.graft.name": "Boulot",
    // B · 4c84c2c842d0
    "skills.graft.attribute": "détermination",
    // B · 51367c2bf5b5
    "skills.graft.description": "Un double, puis le nettoyage, puis la préparation pour demain, puis recommencer.",
    // B · 2730217b5965
    "resources.hands.name": "Mains",
    // B · 34e8ec1ac388
    "resources.hands.polarity": "BON ÉLEVÉ",
    // B · abde402f02a0
    "resources.hands.zeroStateConsequence": "Disparues. Pas fatiguées — disparues. Les coupes deviennent plus lentes puis irrégulières, le timing déraille, et l’assiette qui sort du passe-plat est celle que quelqu’un d’autre aurait renvoyée. Tout le monde sur cette ligne le voit et personne ne dit rien.",
    // B · 81b1ce15e1d4
    "resources.hands.color": "#D08A3E",
    // B · af17d0c9a93b
    "resources.talk.name": "Parole",
    // B · a34adbda2422
    "resources.talk.polarity": "BON FAIBLE",
    // B · dc8f703d4b89
    "resources.talk.zeroStateConsequence": "Personne à plus de quatre rues ne connaît Akari. Quarante couverts un bon vendredi, tous des habitants, et une cuisine qui peut servir tout ce monde sans problème.",
    // B · 74a5963d0f7a
    "resources.talk.color": "#4E7FA0",
    // B · f894d637bf8c
    "resources.debt.name": "La Dette",
    // B · a34adbda2422
    "resources.debt.polarity": "BON FAIBLE",
    // B · 4a91de1e5ab3
    "resources.debt.zeroStateConsequence": "Réglée. Tout ce qu’Akari gagne un mardi est à Akari. Keiko fait les comptes le dimanche en vingt minutes environ et n’y pense plus, ce qu’elle n’a pas pu faire depuis l’année de la rénovation.",
    // B · 6aa8489444e7
    "resources.debt.color": "#8C5A4A",
    // A · ab0bd70a282c
    "items.knife_roll.name": "Ton rouleau de couteaux",
    // B · 4734de9b2439
    "items.knife_roll.tags": ["équipement"],
    // B · 32da26c799ef
    "items.knife_roll.description": "Toile, quatre couteaux, un fusil, un éplucheur et une cuillère un peu tordue que tu n’as jamais remplacée parce que c’est celle que tu prends toujours.",
    // B · 995d2e4ded2d
    "items.knife_roll.loreText": "Le gyuto était un cadeau. Quelqu’un dans ce bâtiment te l’a offert sans jamais en parler, et vous savez tous les deux qui c’était.",
    // B · 8dcfc54c9404
    "items.knife_roll.icon": "couteau",
    // A · b6052bef2b19
    "items.the_hood_quote.name": "Le devis pour la hotte",
    // B · 061625d9bd60
    "items.the_hood_quote.tags": ["quête","document"],
    // B · b46f843b072d
    "items.the_hood_quote.description": "Une page d’une entreprise de ventilation avec un chiffre dessus et une note disant que le débit d’extraction est en dessous du code actuel. Elle est sur le bureau du bureau depuis cinq semaines sans rien d’écrit dessus.",
    // B · 353c19f1491b
    "items.the_hood_quote.loreText": "Le chiffre n’est pas énorme. C’est exactement le genre de nombre qu’un restaurant avec quatre mauvais mois derrière lui ne peut pas trouver et ne peut expliquer à personne pourquoi il ne le trouve pas.",
    // B · 8143e9e47c18
    "items.the_hood_quote.icon": "papiers",
    // A · 7b08a003f8e0
    "items.keikos_book.name": "Le livre que Keiko garde",
    // B · 061625d9bd60
    "items.keikos_book.tags": ["quête","document"],
    // B · 6f92e56f2d59
    "items.keikos_book.description": "Dix-neuf ans de couverts, au crayon, une ligne par nuit. Météo, jour, nombre, et parfois un nom. C’est le seul enregistrement complet de ce qu’est vraiment ce restaurant.",
    // B · 267cfd5ce0a9
    "items.keikos_book.loreText": "Les quatre derniers mois y sont écrits de la même écriture que le reste, ce qui est la partie difficile à regarder.",
    // B · f10eb448275d
    "items.keikos_book.icon": "livre",
    // A · 72b19e0bd3a1
    "items.city_table_card.name": "L’Invitation",
    // B · 061625d9bd60
    "items.city_table_card.tags": ["quête","document"],
    // B · a698a8049018
    "items.city_table_card.description": "Carte lourde, une liste de dates, et onze Services décrits en une ligne chacun. La moitié ne sont pas des compétitions et la carte ne dit pas quelle moitié.",
    // B · b21f4d68e724
    "items.city_table_card.loreText": "Ils en envoient environ quatre-vingt-dix. Elles sont adressées à la main, ce que personne en dehors du bureau d’organisation ne sait et c’est pourquoi Mina a apporté la tienne elle-même.",
    // B · b6e5c4d2d440
    "items.city_table_card.icon": "carte",
    // A · b5a3285096ed
    "items.grandmothers_pot.name": "La Casserole Qui Ne Quitte Pas L’étagère",
    // B · e872158c299b
    "items.grandmothers_pot.tags": ["personnel"],
    // B · 684a38e9c907
    "items.grandmothers_pot.description": "Fer émaillé, écaillé jusqu’au métal à trois endroits, et la seule chose dans cette cuisine qui date d’avant le restaurant. Il va sur le feu environ deux fois par an et tout le monde qui travaille ici sait pourquoi.",
    // B · 02dff2cf181b
    "items.grandmothers_pot.loreText": "Ce n’est pas une bonne marmite. Elle est lourde, lente et le couvercle ne ferme pas correctement, mais elle fait une braise spécifique mieux que tout autre chose dans le bâtiment.",
    // B · 43cdb10b3cce
    "items.grandmothers_pot.icon": "marmite",
    // A · 038f40dababa
    "items.market_notebook.name": "Un Carnet Du Marché",
    // B · e72573287188
    "items.market_notebook.tags": ["document"],
    // B · c5503f75b789
    "items.market_notebook.description": "Petit, abîmé par le sel, et rempli de onze ans de qui est bon, qui est pas cher en octobre, quelles noix de Saint-Jacques tout le monde achète, et quels deux étals garderont quelque chose pour toi.",
    // B · 5b8dfe69fd09
    "items.market_notebook.loreText": "La moitié de sa valeur n’est pas dans les notes. C’est que le fait d’être vu avec à cinq heures du matin fait que les gens à ces étals te parlent différemment.",
    // B · 45534d104186
    "items.market_notebook.icon": "carnet",
    // A · 88c835c3726d
    "items.reinas_piece.name": "Une Critique Que Personne N’a Publiée",
    // B · 061625d9bd60
    "items.reinas_piece.tags": ["quête","document"],
    // B · 07f0e936445b
    "items.reinas_piece.description": "Neuf cents mots sur Akari, écrits il y a quatre ans, censurés avant publication. Ce n’est pas une mauvaise critique. C’est une très bonne critique d’un restaurant que l’auteur a décidé de ne pas envoyer à personne pour l’instant.",
    // B · a5a835b2c8dd
    "items.reinas_piece.loreText": "Elle a censuré onze articles dans sa carrière et c’est le seul dont elle a gardé une copie, qu’elle n’a jamais examinée.",
    // B · 8143e9e47c18
    "items.reinas_piece.icon": "papiers",
    // A · 58a2d6cfe4a7
    "items.staff_meal.name": "Repas Du Personnel",
    // B · 32830ea136a7
    "items.staff_meal.tags": ["nourriture"],
    // B · 987e0e75ee88
    "items.staff_meal.description": "Ce qui n’a pas été vendu et ce qui allait être jeté, cuisiné correctement par quelqu’un à seize heures et mangé debout par six personnes en onze minutes.",
    // B · 9cd57667ca65
    "items.staff_meal.loreText": "C’est la meilleure chose que cette cuisine fait et elle n’a jamais été au menu nulle part, et chaque cuisinier de cette ville te dirait la même chose à propos de la sienne.",
    // B · 9522ca746de3
    "items.staff_meal.icon": "bol",
    // A · b0cee9d12de4
    "abilities.taste_it.name": "Goûter",
    // B · 58f69744c481
    "abilities.taste_it.tags": ["vue"],
    // B · e4ba86d0db3a
    "abilities.taste_it.description": "Mettre une cuillère dedans et savoir ce qu’il manque, ce qui est une compétence complètement différente de savoir ce que c’est.",
    // B · c44e6dd70059
    "abilities.taste_it.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.taste_it.check.attribute": "esprit",
    // A · 2baeb6f85871
    "abilities.get_the_prep_done.name": "Faire La Prépa",
    // B · 5251d369d3b6
    "abilities.get_the_prep_done.tags": ["utilitaire"],
    // B · da570e87eb65
    "abilities.get_the_prep_done.description": "Quatre heures avant que quelqu’un s’assoie. Rien d’intéressant là-dedans et c’est toute la différence entre un service qui marche et un autre qui ne marche pas.",
    // B · c44e6dd70059
    "abilities.get_the_prep_done.targetRule": "AUCUN",
    // B · 7ce3b6387340
    "abilities.get_the_prep_done.check.attribute": "agilité",
    // A · 2dc9af006a53
    "abilities.cook_it_properly.name": "Cuisiner Comme Il Faut",
    // B · 5251d369d3b6
    "abilities.cook_it_properly.tags": ["utilitaire"],
    // B · 57b086145cbf
    "abilities.cook_it_properly.description": "Chaleur, poêle, timing, repos. Les trente secondes autour du bon moment, sur une protéine qu’on n’a qu’une fois.",
    // B · c44e6dd70059
    "abilities.cook_it_properly.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.cook_it_properly.check.attribute": "esprit",
    // A · f1fffd70bb2b
    "abilities.run_the_pass.name": "Gérer Le Pass",
    // B · 09b907576d49
    "abilities.run_the_pass.tags": ["social"],
    // B · a0d201fbe84a
    "abilities.run_the_pass.description": "Donner l’ordre, quatre postes vers une assiette, et se faire obéir fort par des gens qui sont tous derrière individuellement.",
    // B · 503eb62e7676
    "abilities.run_the_pass.targetRule": "ZONE",
    // B · cfb7a15645c3
    "abilities.run_the_pass.check.attribute": "présence",
    // A · 87e734462afe
    "abilities.save_the_table.name": "Sauver La Table",
    // B · 09b907576d49
    "abilities.save_the_table.tags": ["social"],
    // B · 3cea9e3b0a5f
    "abilities.save_the_table.description": "Quarante minutes de retard, une commande ratée et un anniversaire. Le service, bien fait, est la raison pour laquelle la cuisine s’en sort toujours.",
    // B · 39d896e20aec
    "abilities.save_the_table.targetRule": "SINGLE",
    // B · cfb7a15645c3
    "abilities.save_the_table.check.attribute": "présence",
    // A · 9b0262d7c520
    "abilities.go_to_the_market.name": "Aller au marché",
    // B · c962d34a80f3
    "abilities.go_to_the_market.tags": ["survie"],
    // B · 1618d592ce6b
    "abilities.go_to_the_market.description": "Cinq heures du matin, béton mouillé, et onze stands où être connu change ce qu’on vous montre.",
    // B · c44e6dd70059
    "abilities.go_to_the_market.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.go_to_the_market.check.attribute": "esprit",
    // A · 94c33ffcb304
    "abilities.cook_for_one_person.name": "Cuisiner pour une personne",
    // B · 49ff03b1cf7b
    "abilities.cook_for_one_person.tags": ["soin"],
    // B · 6dea7b5dad24
    "abilities.cook_for_one_person.description": "Pas un plat. Un repas, pour quelqu’un de précis, sur un sujet précis. Personne ne le note et c’est pour ça que ce boulot existe vraiment.",
    // B · 39d896e20aec
    "abilities.cook_for_one_person.targetRule": "SINGLE",
    // B · 4c84c2c842d0
    "abilities.cook_for_one_person.check.attribute": "volonté",
    // A · 783506a9ebf5
    "abilities.say_the_number.name": "Donner le chiffre",
    // B · 09b907576d49
    "abilities.say_the_number.tags": ["social"],
    // B · 247863e6f826
    "abilities.say_the_number.description": "Dire le chiffre exact à voix haute, à quelqu’un qui le porte seul. Rien de dramatique et pourtant c’est la chose la plus dure de ce bâtiment.",
    // B · 39d896e20aec
    "abilities.say_the_number.targetRule": "SINGLE",
    // B · 4c84c2c842d0
    "abilities.say_the_number.check.attribute": "volonté",
    // A · 51b87731247b
    "abilities.do_something_nobody_asked_for.name": "Faire un truc que personne n’a demandé",
    // B · 05f59299d740
    "abilities.do_something_nobody_asked_for.tags": ["offensif"],
    // B · a1a61459eb00
    "abilities.do_something_nobody_asked_for.description": "Mettre un plat devant des gens qui ne l’ont pas commandé, qui n’est pas sûr, et qui est ce que vous pensez vraiment. Tout le monde aura un avis et l’un d’eux écrit pour vivre.",
    // B · 503eb62e7676
    "abilities.do_something_nobody_asked_for.targetRule": "ZONE",
    // B · a8c1fa8269c3
    "abilities.do_something_nobody_asked_for.check.attribute": "esprit",
    // A · 675ac84b89d4
    "abilities.spend_money_you_do_not_have.name": "Dépenser de l’argent qu’on n’a pas",
    // B · 5251d369d3b6
    "abilities.spend_money_you_do_not_have.tags": ["utilitaire"],
    // B · ead2043af7bd
    "abilities.spend_money_you_do_not_have.description": "Le bon poisson, la réparation de la hotte, une quatrième paire de mains un samedi. Tout est la bonne décision et tout est sur la note.",
    // B · c44e6dd70059
    "abilities.spend_money_you_do_not_have.targetRule": "AUCUN",
    // A · 4236ee8db268
    "abilities.cook_the_thing_you_have_never_shown_anybody.name": "Le plat que tu n’as jamais montré à personne",
    // B · 05f59299d740
    "abilities.cook_the_thing_you_have_never_shown_anybody.tags": ["offensif"],
    // B · 2e7ae7313148
    "abilities.cook_the_thing_you_have_never_shown_anybody.description": "Le plat qui veut vraiment dire quelque chose. Il n’est pas malin et il ne sera pas photogénique, et le mettre devant un inconnu est ce qu’il y a de plus exposé dans ce métier.",
    // B · 39d896e20aec
    "abilities.cook_the_thing_you_have_never_shown_anybody.targetRule": "SINGLE",
    // B · 4c84c2c842d0
    "abilities.cook_the_thing_you_have_never_shown_anybody.check.attribute": "volonté",
    // B · 8fc4ab3bf718
    "abilities.cook_the_thing_you_have_never_shown_anybody.requires.flagsSet": ["sait :ce_que_c’est"],
    // B · f9bc0698bf1c
    "abilities.cook_the_thing_you_have_never_shown_anybody.requires.lockedCopy": "Vous n’avez pas encore compris ce que ce serait. Tout le monde dit qu’un chef devrait en avoir un et personne n’a jamais su expliquer comment on le trouve.",
    // A · ec3f174ed290
    "locations.akari_kitchen.name": "La cuisine Akari",
    // A · 6777d1f0ceea
    "locations.akari_kitchen.shortName": "La cuisine",
    // B · 1ef16e364239
    "locations.akari_kitchen.description": "Six mètres sur trois. Quatre brûleurs dont trois fiables, un grill, un passe avec une lampe chauffante qui bourdonne, un froid qui se ferme avec la hanche, et une hotte qui fait du bruit depuis mardi. Tout ici a été arrangé en dix-neuf ans par des gens qui s’en servent.",
    // B · d3bfb553ae4d
    "locations.akari_kitchen.stageImage": "story_last_service/stage_akari_kitchen",
    // A · 528b7f2f1250
    "locations.akari_dining.name": "La salle à manger Akari",
    // A · c487f27a920c
    "locations.akari_dining.shortName": "La salle",
    // B · 4ecbb488e10a
    "locations.akari_dining.description": "Trente places : onze au comptoir, cinq tables de deux, trois de quatre. Lumière chaude, un tableau de menu qu’Emi réécrit chaque matin, et une fenêtre mouillée de pluie sur une rue avec un tram. Environ un tiers des gens ici viennent d’avant la rénovation.",
    // B · c710451e3f68
    "locations.akari_dining.stageImage": "story_last_service/stage_akari_dining",
    // A · 37c84ea0e45b
    "locations.akari_office.name": "Le Bureau",
    // A · c1f1fcd9cb41
    "locations.akari_office.shortName": "Bureau",
    // B · 2478eaebfb8e
    "locations.akari_office.description": "Un placard avec un bureau dedans, une chaise venue de la salle à manger en 2011, une boîte à archives, un calendrier mural avec une date entourée, et une page d’une société de ventilation qui traîne sur le bureau depuis cinq semaines.",
    // B · a0857a470768
    "locations.akari_office.stageImage": "story_last_service/stage_akari_office",
    // A · 4d99a4f9392b
    "locations.the_back_alley.name": "La Ruelle",
    // A · a58fd23561ec
    "locations.the_back_alley.shortName": "La Ruelle",
    // B · 0a58ff14674e
    "locations.the_back_alley.description": "Deux mètres de béton mouillé entre la porte de derrière et les poubelles, avec une caisse sur laquelle tout le monde s’assoit, une sortie de hotte au-dessus, et une vue sur une seule bande de ciel. Toutes les conversations difficiles de ce restaurant ont eu lieu ici.",
    // B · bdfe1ae6d519
    "locations.the_back_alley.stageImage": "story_last_service/stage_the_back_alley",
    // A · c2475bf6fa39
    "locations.the_arcade_street.name": "La Rue",
    // A · c2475bf6fa39
    "locations.the_arcade_street.shortName": "La Rue",
    // B · da8b887f594c
    "locations.the_arcade_street.description": "Une ligne de tram, une arcade couverte, une laverie, un bar de onze places et trois autres endroits qui servent à manger. Tout le monde dans cette rue sait plus ou moins comment va Akari, d’après le nombre de personnes à la fenêtre à huit heures.",
    // B · bbfeec1f1131
    "locations.the_arcade_street.stageImage": "story_last_service/stage_the_arcade_street",
    // A · 341c38878734
    "locations.fish_market.name": "Le Marché au Poisson",
    // A · 97a809eb8689
    "locations.fish_market.shortName": "Marché",
    // B · 216d3ed6e612
    "locations.fish_market.description": "Cinq heures du matin, béton mouillé, quarante étals et une salle des ventes. Tout ce qui vaut la peine d’être cuisiné dans cette ville passe d’abord par ici, et être connu dans quatre de ces étals vaut plus que n’importe quelle somme d’argent dans les trente-six autres.",
    // B · 7872f6610a27
    "locations.fish_market.stageImage": "story_last_service/stage_fish_market",
    // A · 7ff4c7cdcec3
    "locations.supplier_yard.name": "La Cour du Fournisseur",
    // A · 568a20a96f02
    "locations.supplier_yard.shortName": "La Cour",
    // B · 47cc5bf7d5a1
    "locations.supplier_yard.description": "Un quai de chargement, un entrepôt frigorifique et un petit bureau avec un homme qui connaît cette famille depuis onze ans, qui les aime bien, et qui a un service comptable qui s’en fiche complètement.",
    // B · 6db88015b79b
    "locations.supplier_yard.stageImage": "story_last_service/stage_supplier_yard",
    // A · 819f018f107e
    "locations.night_market.name": "Le marché de nuit",
    // A · f6490c9785d2
    "locations.night_market.shortName": "Marché de nuit",
    // B · f2770bf6a57d
    "locations.night_market.description": "Quarante étals, une rue, et une queue devant l’un d’eux qui n’est jamais descendue sous les vingt personnes depuis mars. Quelqu’un là-dedans fait quatre cents couverts par nuit avec un seul brûleur et une plaque, et le fait mieux que la plupart des restaurants de la ville.",
    // B · a6e0b2ebca3b
    "locations.night_market.stageImage": "story_last_service/stage_night_market",
    // A · ba3e1f6054f4
    "locations.vanta.name": "VANTA",
    // A · ba3e1f6054f4
    "locations.vanta.shortName": "VANTA",
    // B · c427f9360927
    "locations.vanta.description": "Dix-huit couverts par service, deux services, une cuisine avec onze personnes et un passe-plat qui ne hausse jamais la voix. C’est le meilleur restaurant de la ville et ce qui surprend le plus à l’intérieur, c’est à quel point c’est calme.",
    // B · d3aa0d170933
    "locations.vanta.stageImage": "story_last_service/stage_vanta",
    // A · 5129d45d2d73
    "locations.city_table_hall.name": "La salle du Circuit",
    // A · 9babb982fe2c
    "locations.city_table_hall.shortName": "La salle",
    // B · 31909745e0e4
    "locations.city_table_hall.description": "Un bâtiment de marché reconverti que la ville utilise pour onze Services sur quatre semaines : des bancs, des plaques à gaz, une table de score pour ceux qui en ont, et environ deux cents personnes qui mangent debout autour des bords, sur du papier.",
    // B · 157ca38911d1
    "locations.city_table_hall.stageImage": "story_last_service/stage_city_table_hall",
    // A · 6293653d0713
    "locations.culinary_school.name": "L’académie culinaire",
    // A · a5a191f913e6
    "locations.culinary_school.shortName": "L’académie",
    // B · c6b1329be701
    "locations.culinary_school.description": "Quatre cuisines pédagogiques, un théâtre de démonstration et cent quarante étudiants qui, pour la plupart, ne cuisineront plus dans six ans. Ça sent le bouillon et le nettoyant pour sol, et tous ceux qui sont passés par là reconnaissent cette odeur instantanément à quarante ans.",
    // B · 273f6c90954b
    "locations.culinary_school.stageImage": "story_last_service/stage_culinary_school",
    // A · f2fa69dfb0c1
    "locations.the_hotel.name": "La cuisine de l’hôtel",
    // A · a7117eac758c
    "locations.the_hotel.shortName": "L’hôtel",
    // B · 773e0f5244c5
    "locations.the_hotel.description": "Un service de banquet qui fait quatre cents couverts d’un seul menu, avec une brigade de vingt et un système qui fonctionne que les cuisiniers soient inspirés ou pas. C’est la cuisine la moins romantique de la ville et aussi la seule qui n’a jamais raté un service.",
    // B · afed33337d76
    "locations.the_hotel.stageImage": "story_last_service/stage_the_hotel",
    // A · 62f371522a15
    "locations.reina_office.name": "The Paper",
    // A · 62f371522a15
    "locations.reina_office.shortName": "The Paper",
    // B · a14ebf7f6d89
    "locations.reina_office.description": "Un bureau alimentaire de trois personnes au quatrième étage d’un immeuble de deux cents. Il y a un tiroir avec onze pièces à pointe dedans, et l’une d’elles parle d’un restaurant d’environ trente places où l’auteur a décidé de ne pas envoyer encore personne.",
    // B · a092897bab8e
    "locations.reina_office.stageImage": "story_last_service/stage_reina_office",
    // A · 25375ad1dfba
    "locations.keiko_flat.name": "L’appartement de Keiko",
    // A · f5e5ca5cfbe5
    "locations.keiko_flat.shortName": "Keiko",
    // B · d3367dd2fde4
    "locations.keiko_flat.description": "Deux pièces au-dessus d’une laverie à six minutes du restaurant, choisies il y a dix-neuf ans parce qu’elles étaient à six minutes du restaurant. Il n’y a presque rien dedans, parce que tout ce qu’elle possède d’important est dans une cuisine au bout de la rue.",
    // B · 404321cd51ee
    "locations.keiko_flat.stageImage": "story_last_service/stage_keiko_flat",
    // B · 78d21f96adfb
    "characters.mina.name": "Mina Saegusa",
    // A · cf80ec3f231a
    "characters.mina.role": "Vingt-quatre ans, sous-cheffe au meilleur restaurant de la ville, et celle qu’on surnomme le couteau qui ne tremble jamais",
    // A · 675843bf2451
    "characters.mina.cardBlurb": "Elle est sortie de la pluie pour te remettre une invitation, pas pour se moquer, et elle te dira que ta sauce est ratée sur le même ton qu’elle utilise pour commander un verre. Sa cuisine est techniquement parfaite et elle est silencieusement terrifiée de ne rien avoir à dire.",
    // B · aee35f364a88
    "characters.mina.pronouns": "elle",
    // A · 87dbdd292d44
    "characters.mina.publicTraits": ["Elle remarque tout sur une assiette en à peine une seconde","Elle retrousse ses manches avant même d’avoir décidé d’aider","Elle dit la vérité juste plutôt que la gentillesse"],
    // B · a6f33bf58b38
    "characters.mina.hiddenDrives": ["Elle veut faire un plat qui parle de quelque chose et n’a pas réussi à en trouver un en six ans de recherche","Elle aimerait une cuisine qui ne s’écroule pas quand elle arrête de la contrôler, et n’a jamais testé si ça existait"],
    // B · ae3b834feffb
    "characters.mina.values": ["Un plat est une promesse, dans laquelle chaque choix sur l’assiette est intentionnel","La constance, qu’elle considère comme la seule forme honnête de respect envers la personne qui mange"],
    // B · 1b63fddf308f
    "characters.mina.fears": ["Être techniquement excellente mais vide de créativité, une phrase qu’elle a pensée sans jamais la dire","Un service qui part en vrille autour d’elle, ce qui la transforme en quelqu’un qu’elle n’aime pas"],
    // A · 445c011d134c
    "characters.mina.socialStyle": "Directe, sèche et un peu amusée, sans aucune discussion futile. Elle jauge avant de parler, puis dit tout ce qu’elle pense. Plus chaleureuse en cuisine qu’ailleurs, ce dont elle a parfaitement conscience sans chercher à se justifier.",
    // B · 2bbc3d98e0e8
    "characters.mina.boundaries": ["Ne louera jamais quelque chose qu’elle n’apprécie pas, pour aucune raison sociale, ce qui lui a coûté deux amitiés","Ne laissera jamais partir une assiette avec une erreur cachée sous une garniture, et arrêtera un service pour ça"],
    // B · c7474b85a78d
    "characters.mina.goals": ["Devenir cheffe exécutive à VANTA avant ses trente ans, un vrai calendrier plus qu’une ambition","Découvrir si elle peut cuisiner quelque chose de personnel, une question qu’elle n’a jamais confiée"],
    // B · 8cac5a033be2
    "characters.mina.secrets.mina_the_home.fact": "Elle a grandi dans une maison où rien n’était prévisible, et la cuisine était le seul endroit où faire tout correctement produisait un résultat qui avait du sens. Le contrôle n’est pas une discipline ; c’est une défense.",
    // B · 47558a04be8d
    "characters.mina.secrets.mina_the_home.visibility": "NPC_PRIVATE",
    // B · 0f394f282533
    "characters.mina.secrets.mina_the_home.revealHint": "Elle le dit en une dizaine de mots, à la fin d’un mauvais service, à quelqu’un qui vient de la voir arrêter de faire confiance à une ligne.",
    // B · a794c2548bab
    "characters.mina.secrets.mina_the_dish.fact": "Elle a essayé neuf fois en deux ans de mettre un plat sur la carte de VANTA qui parle de sa propre vie. Les neuf étaient techniquement excellents et elle a retiré chacun d’eux avant le service.",
    // B · 47558a04be8d
    "characters.mina.secrets.mina_the_dish.visibility": "NPC_PRIVATE",
    // B · d014b00d33c4
    "characters.mina.secrets.mina_the_dish.revealHint": "Elle l’admet après que quelqu’un a mis un plat vraiment personnel devant elle, et qu’elle a dû gérer ce que ça lui a fait.",
    // A · 13aa03037dc3
    "characters.mina.speechStyle": "Précise, sèche et brève, son jugement tombe d’un bloc sans adoucissement. Tranchante quand il le faut, jamais pour la forme. Moins de mots quand elle est prise au dépourvu, c’est ce qui la trahit. Ne fait jamais le rival troublé, et trouverait ça incompréhensible.",
    // A · 4d84ea0942d3
    "characters.mina.topics": ["le circuit","ta cuisine","VANTA","Haruto","la régularité","l’utilité d’un plat"],
    // A · 599e7122818e
    "characters.mina.voiceSamples": ["Ta sauce est ratée. — Je sais. — Parfait. Je déteste gaspiller un insultes.","C’est une promesse. Si tu la sers à quelqu’un, chaque ingrédient doit être là parce que tu l’as voulu. Le persil, ce n’est pas un choix, c’est une habitude.","J’ai retiré neuf plats d’une carte avant le service en deux ans. Tous étaient justifiés. C’est leur principal problème, et je ne l’avais jamais dit tout haut.","Je ne pousse pas à l’optimisme. Si tu en veux, il y a quarante personnes en ville prêtes à te faire ça gratuitement, mais aucune ne t’expliquera pourquoi le poisson était raté."],
    // B · 3452c5b92b70
    "characters.mina.appearance": "Vingt-quatre ans, cheveux longs et foncés attachés en queue de cheval basse et pratique, yeux ambrés et perçants, bras avant fins et musclés, veste blanche manches retroussées, petite cicatrice de brûlure près du poignet gauche, et une petite cuillère à goûter argentée accrochée sur la poitrine.",
    // B · 51586da9a8bc
    "characters.mina.visualHook": "Une petite cuillère à goûter argentée accrochée sur la poitrine, en cuisine et ailleurs, à toute heure.",
    // B · c5d87cc7dc0c
    "characters.mina.silhouette": "Debout, bien droit à un plan de travail, les deux mains en action et la tête baissée.",
    // B · 660facb5071a
    "characters.mina.artSeed": "ls-mina-01",
    // B · 414a0bdf0f4d
    "characters.mina.portrait": "story_last_service/mina",
    // B · 8ea42813d88c
    "characters.mina.expressions": ["neutre","en train d’évaluer","sèche","aiguisée","exposée"],
    // B · cc252bc5acc4
    "characters.mina.knowledgeScope": ["mina","vanta","the_city_table","haruto","technique","mizuhama_kitchens"],
    // B · 3cc692453340
    "characters.mina.gates.mina_stops_assessing.label": "Elle te parle plutôt que de ta cuisine",
    // B · 55a54e80451a
    "characters.mina.gates.mina_stops_assessing.kind": "CONFIANCE",
    // B · 6eb2868ce248
    "characters.mina.gates.mina_shows_you_one.label": "Elle te cuisine un des neuf",
    // B · 55a54e80451a
    "characters.mina.gates.mina_shows_you_one.kind": "CONFIANCE",
    // B · e8912031d2a2
    "characters.mina.gates.mina_closer.label": "Aucun des deux ne parle d’intérêt professionnel",
    // B · 0b75bc536447
    "characters.mina.gates.mina_closer.kind": "ROMANCE",
    // B · 22101fde1d8f
    "characters.mina.scouting.revealCopy": "Elle l’a déjà goûté. « Tu deviens acide quand tu doutes, » dit-elle en posant la cuillère. « À chaque fois. C’est un bon instinct et c’est devenu un signe. »",
    // B · de71d6c0f291
    "characters.takumi.name": "Takumi Arashi",
    // A · 08af4b1f09f0
    "characters.takumi.role": "Vingt-trois ans, un seul brûleur et une plaque au marché de nuit, quatre cents couverts par soir, et une file qui n’est jamais passée sous la vingtaine depuis mars",
    // A · 37fcbdd36cb4
    "characters.takumi.cardBlurb": "Il cuisine mieux avec un seul feu que la plupart en ville avec une brigade, il t’apprendra tout ce que tu veux, et il s’ennuie au bout de quatre jours une fois qu’il maîtrise. Il rendra le circuit bien plus fun et carrément plus dangereux.",
    // B · fcca6b746d0b
    "characters.takumi.pronouns": "il/lui",
    // A · f8e3cac5f77f
    "characters.takumi.publicTraits": ["Parle à la file en cuisinant pour elle","Ne refait jamais un plat quatre soirs de suite sans le modifier","Est sincèrement content d’une bonne idée venue d’un autre"],
    // B · 5f68c0fdf1f0
    "characters.takumi.hiddenDrives": ["Il veut savoir s’il pourrait faire ce qu’il faut, et il a assez peur de la réponse pour ne pas essayer","Il aimerait qu’une personne dans ce métier le reconnaisse comme cuisinier et pas comme un spectacle"],
    // B · ee646d08bf09
    "characters.takumi.values": ["Les gens qui arrêtent de parler quand ils mangent, c’est toute sa mesure et ce n’est pas une mauvaise","Le stand qui reste ouvert un mardi de février pour onze personnes, ce qu’il n’a jamais raté"],
    // B · 63b1abc3d623
    "characters.takumi.fears": ["La finesse, qu’il appelle ennuyeuse et qu’il a décidé en privé qu’il ne saurait pas faire","Être l’homme qui était très excitant à vingt-trois ans"],
    // A · 4d098241ad59
    "characters.takumi.socialStyle": "Bavard, chaleureux, immédiatement familier et toujours en mouvement. Complimente souvent et précisément les autres cuisiniers. Transforme tout ce qui est sérieux en blague, puis y revient quarante minutes après quand personne ne s’y attend.",
    // B · 819317b1ca18
    "characters.takumi.boundaries": ["Il ne cuisinera jamais quelque chose qu’il a fait cinq fois pareil, et il le changera plutôt que de le servir","Il ne prendra pas un stand sur un bon emplacement qu’un plus vieux occupe depuis onze ans, il l’a refusé deux fois"],
    // B · c80e3c380332
    "characters.takumi.goals": ["Faire un service que personne ne peut improviser, et voir ce qui se passe","Garder le stand ouvert, ce qui lui coûte environ un tiers de ce que les offres sur la table paieraient"],
    // B · c032223c97fa
    "characters.takumi.secrets.takumi_the_offers.fact": "Deux groupes de restaurants lui ont proposé un local à lui. Il a refusé les deux sans en parler à personne, et il ne peut pas vraiment s’expliquer pourquoi.",
    // B · 47558a04be8d
    "characters.takumi.secrets.takumi_the_offers.visibility": "NPC_PRIVATE",
    // B · 76ae368d28c7
    "characters.takumi.secrets.takumi_the_offers.revealHint": "Ça tombe en plein milieu d’une bouchée, la bouchée ne tombe pas, et il n’essaie pas une deuxième fois.",
    // B · 760dae31146e
    "characters.takumi.secrets.takumi_the_training.fact": "Il a fait deux ans à l’académie culinaire et est parti la troisième année, laissant croire à tout le monde qu’il n’y est jamais allé, parce qu’être autodidacte, c’est une meilleure histoire et il le sait.",
    // B · 47558a04be8d
    "characters.takumi.secrets.takumi_the_training.visibility": "NPC_PRIVATE",
    // B · b350d7708cad
    "characters.takumi.secrets.takumi_the_training.revealHint": "Quiconque est passé par cette académie reconnaît sa façon de tenir un couteau, et il ne le niera pas si c’est dit à voix haute.",
    // A · 327231976387
    "characters.takumi.speechStyle": "Rapide, fort et incroyablement généreux avec les autres, le tout en faisant quatre choses à la fois. Ses phrases arrivent dans le désordre, mais ça marche quand même. Il transforme tout ce qui est sérieux en blague, puis donne une vraie réponse bien plus tard quand personne est prêt.",
    // A · 3ac0fa4e913f
    "characters.takumi.topics": ["le stand","un seul brûleur","les offres","ce que tu as cuisiné","la file","l’improvisation"],
    // A · 2a3c5f196671
    "characters.takumi.voiceSamples": ["Un feu. Un seul. C’est toute la cuisine, et dehors il y a deux cents personnes dont onze sont là depuis sept heures. Tu veux voir un truc con ?","C’est bien. Non, écoute, je suis pas sympa, l’acidité là fait vraiment son taf, je vais la voler jeudi et dire à tout le monde où je l’ai eue.","La finesse c’est quatre personnes dans une pièce calme pour dire qu’un truc est juste. Moi, je préfère que deux cents personnes dans une rue mouillée arrêtent de parler pendant onze secondes.","On m’a proposé une chambre. Deux fois. Vraie chambre, vrai fric. J’ai refusé deux fois sans pouvoir me donner de raison, alors — bon, goûte ça."],
    // B · 0455c6520292
    "characters.takumi.appearance": "Vingt-trois ans, maigre, cheveux attachés sous un tissu, avant-bras marqués jusqu’au coude par une plaque chauffante trop proche, T-shirt et tablier en toile, toujours humide de vapeur et de pluie à parts égales.",
    // B · 5b450738255f
    "characters.takumi.visualHook": "Brûlures de plaque sur les deux avant-bras en bandes qui se chevauchent, manches courtes quel que soit le temps.",
    // B · 7e2070898371
    "characters.takumi.silhouette": "Demi-tourné vers un brûleur, un bras tendu vers la file d’attente, parlant par-dessus son épaule.",
    // B · 568035a0204f
    "characters.takumi.artSeed": "ls-takumi-01",
    // B · 96d14ec13c4f
    "characters.takumi.portrait": "story_last_service/takumi",
    // B · 36e36c8f6513
    "characters.takumi.expressions": ["neutre","ravi","concentré","ennuyé","piqué"],
    // B · 1123a46f927b
    "characters.takumi.knowledgeScope": ["takumi","the_night_market","improvising","the_school","street_food","mizuhama_kitchens"],
    // B · 845db1bdc263
    "characters.takumi.gates.takumi_teaches_you.label": "Il te montre comment il fait vraiment",
    // B · 55a54e80451a
    "characters.takumi.gates.takumi_teaches_you.kind": "CONFIANCE",
    // B · 29b1f46c3345
    "characters.takumi.gates.takumi_says_it.label": "Il te parle des offres sans faire semblant",
    // B · 55a54e80451a
    "characters.takumi.gates.takumi_says_it.kind": "CONFIANCE",
    // B · 7fc18ed00ab6
    "characters.haruto.name": "Haruto Gin",
    // A · 9c79295c4825
    "characters.haruto.role": "Quarante-huit ans, chef exécutif chez VANTA, et la personne la plus impressionnante de cette histoire parce qu’elle ne cherche pas à l’être",
    // A · fc5088dcc1b5
    "characters.haruto.cardBlurb": "Il te dira, une fois, que le boulot d’un chef ce n’est pas la meilleure assiette, mais une cuisine qui sait en produire cent vingt bonnes. Il a été un cuisinier créatif et sauvage autrefois, son premier resto s’est effondré sous la louange, le turnover et les fournisseurs impayés, et il n’a jamais raconté cette histoire en avertissement.",
    // B · fcca6b746d0b
    "characters.haruto.pronouns": "il/lui",
    // A · feec3bcc4141
    "characters.haruto.publicTraits": ["N’a pas haussé la voix en cuisine depuis quinze ans","Connaît le nom et le préavis de tout le monde dans son immeuble","Dit une phrase par problème"],
    // B · 64210589d51e
    "characters.haruto.hiddenDrives": ["Il veut que quelqu’un prenne VANTA de lui proprement plutôt que de l’hériter, et il ne l’a pas dit à Mina depuis six ans","La cuisine lui manque, mais c’est un reproche de jeune qu’il refuse d’assumer"],
    // B · 757d0637c9f4
    "characters.haruto.values": ["Un système qui fonctionne quand il n’est pas là, ce qu’il considère comme le seul vrai succès dans ce métier","Payer les gens à temps, ce n’est pas une fierté là où il est et c’est ce qui a fait fermer son premier restaurant"],
    // B · b6053f8c0faf
    "characters.haruto.fears": ["Construire une cuisine excellente pleine de gens qu’il a réduits à des postes","Regarder quelqu’un de talentueux faire exactement ce qu’il a fait à vingt-neuf ans pendant qu’il explique les finances"],
    // A · 0775aaecb0be
    "characters.haruto.socialStyle": "Calme au point d’être apaisant, ce qui met les gens mal à l’aise en cuisine. Pose une question, écoute jusqu’au bout, puis répond en une phrase. Ne flatte jamais et ne rabaisse jamais.",
    // B · 8b16a42df57c
    "characters.haruto.boundaries": ["Il ne laissera pas un service être sauvé par une personne brillante, il arrêtera et recommencera","Il ne débauchera pas dans un petit restaurant qui fermerait sans cette personne, ce qui lui a coûté deux recrutements"],
    // B · 87057f4d3093
    "characters.haruto.goals": ["Amener VANTA à survivre après lui, ce qui demande environ dix-huit mois de travail","Voir si le sous-chef peut diriger plutôt que seulement exécuter, ce que le circuit va tester volontairement"],
    // B · 3405ef14b824
    "characters.haruto.secrets.haruto_the_first_place.fact": "Son premier restaurant a eu les meilleures critiques de l’année et a fermé au bout de quatorze mois en devant quatre fournisseurs. Il a les comptes finaux dans un tiroir et ne les a montrés à personne, pas même Mina.",
    // B · 47558a04be8d
    "characters.haruto.secrets.haruto_the_first_place.visibility": "NPC_PRIVATE",
    // B · dd65dbe3d842
    "characters.haruto.secrets.haruto_the_first_place.revealHint": "Il les présente, simplement, à quiconque lui dit que le talent devrait suffire.",
    // B · a6fcc9155bbd
    "characters.haruto.secrets.haruto_ate_at_akari.fact": "Il a mangé chez Akari il y a onze ans, seul, un mardi, et se souvient depuis d’un plat précis sans jamais en avoir parlé.",
    // B · 47558a04be8d
    "characters.haruto.secrets.haruto_ate_at_akari.visibility": "NPC_PRIVATE",
    // B · 80f8356f0302
    "characters.haruto.secrets.haruto_ate_at_akari.revealHint": "Il nomme le plat, correctement, d’une façon qui montre qu’il n’a pas eu besoin de le chercher.",
    // A · f30a68a451b8
    "characters.haruto.speechStyle": "Calme, concis, structuré. Parle des cuisines comme des systèmes et des gens comme des gens, conscient que ce sont deux choses distinctes et il les prend toutes les deux en compte. Une phrase par problème, prononcée après une pause assez longue pour que tout le monde ait cessé de parler. N’emploie jamais de superlatif sur la nourriture, y compris la sienne.",
    // A · cbce46510bbb
    "characters.haruto.topics": ["systèmes","son premier resto","Mina","petits restos","payer les gens","à quoi sert un chef"],
    // A · e660116b45a6
    "characters.haruto.voiceSamples": ["Cent vingt couverts, tous les soirs, nickel. C’est ça, le boulot. Le meilleur plat que tu cuis ne fait pas le boulot, pourtant c’est ce que tout le monde veut en entrant dans ce métier.","Mon premier établissement a eu la critique de l’année. Il a fermé en quatorze mois avec quatre fournisseurs à payer, deux d’entre eux bossent encore et je les vois toujours.","Elle sait tout faire. Je ne l’ai pas encore vue gérer une salle qui part en vrille, c’est la seule chose que je ne peux pas lui apprendre, alors je l’ai inscrite à un truc qui va forcément foirer.","Trente couverts, et une hotte hors norme. Pardonne ma franchise. Répare la hotte, après tu repenseras aux menus."],
    // B · 5e4927e7dc85
    "characters.haruto.appearance": "Quarante-huit ans, trapu et immobile, cheveux courts grisonnants, veste blanche simple sans nom, avant-bras marqués comme tout le monde, lunettes de lecture qu’il utilise seulement pour le planning.",
    // B · 103427085b8a
    "characters.haruto.visualHook": "Une veste de chef sans nom brodé, dans un restaurant où tous les autres en ont un.",
    // B · b7d4c585e27b
    "characters.haruto.silhouette": "Debout au bout du passe-plat, mains dans le dos, sans toucher à rien.",
    // B · dab0e0c21b19
    "characters.haruto.artSeed": "ls-haruto-01",
    // B · 06e089cdefb8
    "characters.haruto.portrait": "story_last_service/haruto",
    // B · 5441412a7f86
    "characters.haruto.expressions": ["neutre","pensif","approbateur","grave","fatigué"],
    // B · 0810f2f9dcb4
    "characters.haruto.knowledgeScope": ["haruto","vanta","systems","his_first_restaurant","the_city_table","akari"],
    // B · dcf51e363e14
    "characters.haruto.gates.haruto_takes_you_seriously.label": "Il te lance une phrase sur ta propre cuisine",
    // B · 77dcad9b37cc
    "characters.haruto.gates.haruto_takes_you_seriously.kind": "OTHER",
    // B · 6f87991eea1d
    "characters.haruto.gates.haruto_takes_you_seriously.requires.flagsSet": ["spoke :haruto"],
    // B · 23af3559435f
    "characters.haruto.gates.haruto_shows_you_the_accounts.label": "Il te montre ce qui est arrivé à son premier établissement",
    // B · 55a54e80451a
    "characters.haruto.gates.haruto_shows_you_the_accounts.kind": "TRUST",
    // B · a07240b1d4b2
    "characters.keiko.name": "Keiko",
    // A · 9d76ba44b8d3
    "characters.keiko.role": "Quarante-six ans, ta tante, et celle qui tient ce restaurant depuis dix-neuf ans",
    // A · 49fcbe319144
    "characters.keiko.cardBlurb": "C’est ta tante, elle n’a pas pris de journée complète depuis mars, et fermer l’Akari serait trahir ta famille — elle te le dira. Elle a raison : un resto, c’est un endroit que les gens s’attendent à retrouver, et elle le maintient en vie au point de mettre sa santé en danger, et c’est la même chose.",
    // B · aee35f364a88
    "characters.keiko.pronouns": "elle",
    // A · fd662cf0a780
    "characters.keiko.publicTraits": ["Connaît la commande de tous les habitués sans savoir leur nom","Fait les comptes le dimanche sans en parler à personne","Première arrivée, dernière partie, tous les jours depuis dix-neuf ans"],
    // B · 09695efb6a4a
    "characters.keiko.hiddenDrives": ["Elle veut qu’on lui dise qu’il est acceptable d’arrêter, par quelqu’un de la famille, et elle argumentera avec quiconque dira le contraire","Elle a discrètement réfléchi à ce qu’elle ferait un mardi, et ne va pas au-delà de onze heures du matin"],
    // B · 12da10c73cff
    "characters.keiko.values": ["Un restaurant qui est un lieu où les gens s’attendent à ce qu’il soit encore là, ce qui est tout son être et est vraiment beau","Les habitués, individuellement, par leur commande, leur table habituelle et la façon dont ils tiennent leurs genoux"],
    // B · c3c5ee825c1c
    "characters.keiko.fears": ["Être celle qui a laissé tomber, ce qu’elle considère comme une trahison envers les morts","Découvrir que tout le monde la porte depuis deux ans"],
    // A · 93a92153d23c
    "characters.keiko.socialStyle": "Directe, chaleureuse, et pas du tout disposée à être le centre d’une conversation. Elle redirige sur la nourriture ou quelqu’un d’autre en moins d’une phrase. Dit l’essentiel en essuyant un truc, et ne s’arrête jamais d’essuyer.",
    // B · 0eaab1ab891f
    "characters.keiko.boundaries": ["Ne parlera jamais des chiffres en cuisine, devant quiconque travaille ici","Ne tolérera pas que la famille soit évoquée comme raison d’arrêter, ce qui est la seule chose qui la met vraiment en colère"],
    // B · 884416ff3863
    "characters.keiko.goals": ["Tenir les trente prochains jours, c’est l’horizon le plus long qu’elle ait envisagé depuis deux ans","Ne pas être celle qui a fermé"],
    // B · e3c07c933ef0
    "characters.keiko.secrets.keiko_the_book.fact": "Dix-neuf ans de couverts au crayon, une ligne par soir. Les quatre derniers mois sont écrits de la même écriture, ce qui est dur à regarder.",
    // B · 47558a04be8d
    "characters.keiko.secrets.keiko_the_book.visibility": "NPC_PRIVATE",
    // B · 1906f4bb8fba
    "characters.keiko.secrets.keiko_the_book.revealHint": "Elle le tend plutôt que de l’expliquer, à quelqu’un qui lui pose une vraie question sur l’argent sans prétendre déjà connaître la réponse.",
    // B · 2c44651a031b
    "characters.keiko.secrets.keiko_the_offer.fact": "Un groupe de restaurants a proposé la location il y a six semaines. Elle n’en a parlé à personne, n’a pas répondu, et a gardé la lettre.",
    // B · 47558a04be8d
    "characters.keiko.secrets.keiko_the_offer.visibility": "NPC_PRIVATE",
    // B · 2805f87c733a
    "characters.keiko.secrets.keiko_the_offer.revealHint": "Ça sort quand quelqu’un propose quelque chose qui pourrait marcher, et qu’elle ne dit pas oui tout de suite, sans pouvoir expliquer pourquoi.",
    // A · b64caacadebe
    "characters.keiko.speechStyle": "Phrases courtes et efficaces dites en faisant quelque chose de ses mains, sans jamais s’arrêter. Détourne toute question sur elle vers la nourriture ou vers celui qui l’a posée. Nomme les habitués par leur commande, pas par leur nom. Se fait très discrète plutôt que de hausser la voix.",
    // A · 2c8446866a41
    "characters.keiko.topics": ["les habitués","dix-neuf ans","les chiffres","ta grand-mère","la hotte","si tu as mangé"],
    // A · 9db808a9280d
    "characters.keiko.voiceSamples": ["Table quatre, c’est maquereau sans gingembre, et elle vient tous les jeudis depuis l’année de l’ouverture, elle va demander des nouvelles de tes mains.","Dix-neuf ans. Y a pas eu une seule semaine en dix-neuf ans où quelqu’un n’ait pas pu venir ici et trouver la porte ouverte, et tu me demandes d’être celle qui change ça.","Mange ça debout si tu veux, mais mange. T’as rien avalé aujourd’hui, et le seul truc c’était à six heures et demie ce matin, une boule de riz.","C’est moi qui m’occupe des chiffres le dimanche. C’est le boulot du dimanche. Là on est vendredi et à huit heures, y a onze couverts qui arrivent."],
    // B · b9e0fac2aa79
    "characters.keiko.appearance": "Quarante-six ans, petite, cheveux attachés avec ce qui traîne, avant-bras et mains marqués par dix-neuf ans de travail, veste de chef qu’elle ne boutonne plus vraiment depuis environ 2015, lunettes de lecture relevées.",
    // B · f2d24e1b0991
    "characters.keiko.visualHook": "Un torchon toujours sur une épaule, même dehors.",
    // B · 3198810aa5cb
    "characters.keiko.silhouette": "Debout à l’évier, dos à la salle, parlant par-dessus son épaule.",
    // B · 34adb1fdc1c9
    "characters.keiko.artSeed": "ls-keiko-01",
    // B · 469ce225e104
    "characters.keiko.portrait": "story_last_service/keiko",
    // B · 35af5629f4e8
    "characters.keiko.expressions": ["neutre","rapide","tendre","implacable","sans défense"],
    // B · 2af91d4c4360
    "characters.keiko.knowledgeScope": ["keiko","akari","les_habitués","les_chiffres","la_famille","le_quartier"],
    // B · 914f0564cbc1
    "characters.keiko.gates.keiko_shows_you_the_book.label": "Elle te donne dix-neuf ans de couverts",
    // B · 55a54e80451a
    "characters.keiko.gates.keiko_shows_you_the_book.kind": "TRUST",
    // B · 01ea43eba8f5
    "characters.keiko.gates.keiko_says_the_number.label": "Elle dit le chiffre exact à voix haute",
    // B · 55a54e80451a
    "characters.keiko.gates.keiko_says_the_number.kind": "CONFIANCE",
    // B · 4b188bdde93b
    "characters.emi.name": "Emi Nakahara",
    // A · b9206c0cc1bd
    "characters.emi.role": "Vingt et un ans, elle gère tout le service, et c’est pour ça que cette cuisine s’en sort quoi qu’il arrive",
    // A · ad694604bee3
    "characters.emi.cardBlurb": "Elle connaît les habitués, les allergies, qui fête un anniversaire, qui est sur le point de partir. Tu peux être un cuistot de génie : si elle ne peut pas expliquer un retard de quarante minutes, le service est raté, et ça fait deux ans qu’elle se charge de ça.",
    // B · aee35f364a88
    "characters.emi.pronouns": "elle",
    // A · e7b19baff12c
    "characters.emi.publicTraits": ["Elle réécrit l’ardoise tous les matins à la main","Elle sait quelle table va poser problème avant que ça arrive","Elle se rappelle de ce que quelqu’un a dit sur sa mère en novembre dernier"],
    // B · 1d947bdc290b
    "characters.emi.hiddenDrives": ["Elle veut que quelqu’un dans cette cuisine comprenne que la salle est un travail et pas une faveur","On lui a proposé deux fois mieux payé et elle est restée, elle aimerait que ça se voie"],
    // B · 06fbf285f0b6
    "characters.emi.values": ["Le repas qui commence avant que l’assiette arrive, au sens propre, et elle y a beaucoup réfléchi","Qu’on lui dise ce qui se passe en cuisine, parce que c’est elle qui doit le dire à quarante personnes"],
    // B · e90f4274d23c
    "characters.emi.fears": ["Être celle qui n’a jamais été que la gentille à la porte","Akari qui ferme et découvrir que ce qu’elle sait faire ne sert à rien ailleurs"],
    // A · 175a6f4d7f82
    "characters.emi.socialStyle": "Chaleureuse, rapide et hyper observatrice, elle garde ses remarques pour le bon moment. Elle gère les gens sans qu’ils s’en rendent compte. Hilarante dans les coulisses, mais jamais devant les clients.",
    // B · c6ad9f8f9376
    "characters.emi.boundaries": ["Elle ne mentira jamais à une table sur le temps d’attente, et ira vérifier plutôt que deviner","Personne dans cette cuisine ne l’appellera serveuse deux fois"],
    // B · 099c29a96418
    "characters.emi.goals": ["Diriger sa propre salle un jour, elle l’a dit à deux personnes et aucune ne bosse ici","Passer les trente jours sans qu’on lui demande de faire semblant que tout va bien devant un habitué"],
    // B · 88c5905b6449
    "characters.emi.secrets.emi_the_offers.fact": "Deux postes mieux payés en salle l’an dernier, refusés, sans en parler à personne chez Akari.",
    // B · 47558a04be8d
    "characters.emi.secrets.emi_the_offers.visibility": "NPC_PRIVATE",
    // B · ecefc95028de
    "characters.emi.secrets.emi_the_offers.revealHint": "Elle le dit une fois dans la ruelle, quand quelqu’un la remercie pour un truc précis.",
    // B · 7c64af6eee1c
    "characters.emi.secrets.emi_the_regulars.fact": "Onze habitués ont arrêté de venir les vendredis depuis que le nombre de couverts a augmenté, elle ne l’a pas dit à Keiko parce qu’elle ne sait pas comment dire ça sans que ça sonne comme une critique de la cuisine.",
    // B · 47558a04be8d
    "characters.emi.secrets.emi_the_regulars.visibility": "NPC_PRIVATE",
    // B · ce6a412f3687
    "characters.emi.secrets.emi_the_regulars.revealHint": "Elle répond à ceux qui posent une question directe sur la salle et pas sur les assiettes.",
    // A · a7428ae90afd
    "characters.emi.speechStyle": "Chaleureuse et rapide devant les clients, plus sèche et nettement plus drôle derrière, le passage de l’un à l’autre est instantané et total. Elle parle des tables comme de gens avec une histoire. Elle annonce les mauvaises nouvelles comme des faits avec un plan, jamais comme une plainte.",
    // A · d35c90cb49cc
    "characters.emi.topics": ["la salle","les habitués","le temps d’attente","l’ardoise","ce que racontent les tables","sa propre salle un jour"],
    // A · 7ed677a3793a
    "characters.emi.voiceSamples": ["La table six va arriver dans quatre minutes. Pas à cause de l’attente, mais parce que personne n’est repassé prendre leur commande et ils ont commencé à regarder la porte.","Tu peux leur servir le meilleur plat que t’aies jamais fait. Si je ne peux pas leur expliquer pourquoi ça a pris quarante minutes, ils retiendront ces quarante minutes.","Onze habitués du vendredi ont arrêté de venir. J’ai rien dit parce que ça fait croire que je dis que la cuisine a baissé, alors que non, et je sais pas comment dire la vérité.","Ne m’appelle plus serveuse devant le passe, hein. Une fois c’était un accident."],
    // B · 400e9750e107
    "characters.emi.appearance": "Vingt-et-un ans, petite, cheveux noirs attachés en chignon avec un stylo, un tablier noir simple sur ses vêtements, toujours deux choses à la main, et une écriture au tableau que tout le quartier reconnaîtrait.",
    // B · 60213dc24b72
    "characters.emi.visualHook": "Un stylo dans son chignon, et un deuxième derrière l’oreille qu’elle a oublié.",
    // B · b593c7119102
    "characters.emi.silhouette": "À moitié tournée entre deux tables, une assiette dans chaque main, déjà en train de regarder une troisième.",
    // B · 07785478034c
    "characters.emi.artSeed": "ls-emi-01",
    // B · a33128d58c19
    "characters.emi.portrait": "story_last_service/emi",
    // B · 869ac21bbd24
    "characters.emi.expressions": ["neutre","lumineuse","sèche","aiguisée","terne"],
    // B · edf47796dfa0
    "characters.emi.knowledgeScope": ["emi","akari","la_salle","les_habitués","la_salle","le_quartier"],
    // B · 89aa32ae1838
    "characters.emi.gates.emi_tells_you_about_the_room.label": "Elle te dit ce que les tables font vraiment",
    // B · 55a54e80451a
    "characters.emi.gates.emi_tells_you_about_the_room.kind": "CONFIANCE",
    // B · aada430adb52
    "characters.emi.gates.emi_closer.label": "Les conversations dans la ruelle ne parlent plus du restaurant",
    // B · 0b75bc536447
    "characters.emi.gates.emi_closer.kind": "ROMANCE",
    // B · 8ac9ad62fe90
    "characters.daichi.name": "Daichi Ren",
    // A · 603467ca0e94
    "characters.daichi.role": "Vingt-deux ans, sur la ligne Akari depuis quatre ans, et fiable comme personne ne l’a jamais remercié",
    // A · 61108a7cdb5a
    "characters.daichi.cardBlurb": "Il est là depuis plus longtemps que toi et il peut gérer un service tout seul, ce qu’il a fait plus souvent que personne n’a jamais compté. Si tu reviens et que tu te mets à jouer le patron, il ne dira rien, et c’est encore pire.",
    // B · fcca6b746d0b
    "characters.daichi.pronouns": "il",
    // A · 18b17247bf2e
    "characters.daichi.publicTraits": ["Jamais à la traîne, jamais tape-à-l’œil, jamais en retard","Répond à une question par ce qu’il a déjà fait pour y remédier","Se tait complètement quand il est énervé"],
    // B · 7f985685dad0
    "characters.daichi.hiddenDrives": ["Il veut mettre un plat à lui sur cette carte et n’a rien demandé depuis quatre ans","Il a peur que « fiable » soit tout ce qu’il est, et il a organisé sa vie pour que personne ne le teste"],
    // B · b487f83cdf5b
    "characters.daichi.values": ["Une cuisine basée sur la confiance, c’est toute sa définition et il ne l’a jamais dite à voix haute","Faire proprement la moitié ingrate, parce que quelqu’un doit le faire et c’est souvent lui"],
    // B · f4020478625b
    "characters.daichi.fears": ["Être celui qui a toujours été là sans jamais vraiment agir","Cuisiner un plat à lui devant des gens et que ce soit juste correct"],
    // A · 077be79922c2
    "characters.daichi.socialStyle": "Calme, sec et totalement concentré. N’engage jamais la conversation. Répond à une question par ce qu’il a déjà réglé. Se tait plutôt que de discuter et reste silencieux juste le temps qu’il faut.",
    // B · fe1e5a4f26a0
    "characters.daichi.boundaries": ["Il ne supportera pas qu’on réorganise son poste après deux ans sans demander","Il ne couvrira pas une erreur avec un client, il le dira calmement au passe plutôt qu’en salle"],
    // B · 1eca40cf6d26
    "characters.daichi.goals": ["Mettre un plat à lui sur ce tableau, une ambition de quatre ans qu’il n’a jamais dite","Faire tourner cette cuisine pendant trente jours, il sait déjà comment et il l’a dit à personne"],
    // B · 681ea940480a
    "characters.daichi.secrets.daichi_the_dish.fact": "Il développe un plat chez lui depuis quatre ans. Onze versions. Il ne l’a jamais cuisiné pour personne, même pas sa famille.",
    // B · 47558a04be8d
    "characters.daichi.secrets.daichi_the_dish.visibility": "NPC_PRIVATE",
    // B · 49071b7c12b0
    "characters.daichi.secrets.daichi_the_dish.revealHint": "Il mentionne la onzième version en passant comme si de rien, puis ne relance pas, et attend.",
    // B · a96ef221a424
    "characters.daichi.secrets.daichi_the_covers.fact": "Il a géré discrètement les deux derniers mois de vendredis tout seul pendant que Keiko fait la paperasse debout dans un coin, et il a fait en sorte qu’elle ne le remarque pas.",
    // B · 47558a04be8d
    "characters.daichi.secrets.daichi_the_covers.visibility": "NPC_PRIVATE",
    // B · ea2eb1efc204
    "characters.daichi.secrets.daichi_the_covers.revealHint": "Quiconque bosse un vendredi correctement le voit. Il ne le nie pas et ne veut pas que ça se sache auprès d’elle.",
    // A · b8886afa68b6
    "characters.daichi.speechStyle": "Court, plat et pragmatique, avec tout déjà fait dès qu’il en parle. Répond à une question par un état des lieux, pas une opinion. Le silence est toute sa palette émotionnelle, et sa durée fait son sens. N’emploie jamais un mot sur la nourriture qui ne soit technique.",
    // A · 465d0e394a31
    "characters.daichi.topics": ["la gare","les couverts du vendredi","son plat","quatre ans ici","la liste des préparations","ce que tu as déplacé"],
    // A · 615c2009b1e2
    "characters.daichi.voiceSamples": ["Le poisson est portionné, le fond est chaud, la grille est montée et le deuxième brûleur ne marche toujours pas. J’ai fait le gingembre parce que tu allais demander.","Tu as déplacé ma mise en place. Je vais pas en faire tout un plat. Je te le dis pour que ça arrive plus.","Version onze. C’est presque ça. Enfin, quatre attendent.","Une cuisine, c’est de la confiance. C’est tout. Quelqu’un fait ce qu’il a dit et le suivant peut commencer."],
    // B · 3c02f3a177c5
    "characters.daichi.appearance": "Vingt-deux ans, costaud, cheveux courts, une veste qui lui va bien parce qu’il en a trois, les avant-bras marqués par le grill, et un poste toujours impeccable à toute heure.",
    // B · 3d12bab547e1
    "characters.daichi.visualHook": "Un poste toujours rangé de la même façon, au millimètre, que tout le monde a fini par ne plus voir.",
    // B · 2c83d48994f3
    "characters.daichi.silhouette": "Tête baissée sur un tableau, il travaille sans lever les yeux.",
    // B · a3a29dbd9ce5
    "characters.daichi.artSeed": "ls-daichi-01",
    // B · bf42f794b7d2
    "characters.daichi.portrait": "story_last_service/daichi",
    // B · 85997994f4bc
    "characters.daichi.expressions": ["neutre","concentré","plat","légèrement content","déconnecté"],
    // B · 5962c3706ab4
    "characters.daichi.knowledgeScope": ["daichi","akari","la_cuisine","la_préparation","son_plat"],
    // B · 664f9cf3fbba
    "characters.daichi.gates.daichi_stops_being_quiet.label": "Il te dit ce qu’il pense vraiment de ton retour",
    // B · 55a54e80451a
    "characters.daichi.gates.daichi_stops_being_quiet.kind": "Confiance",
    // B · 080c411b6ea6
    "characters.daichi.gates.daichi_cooks_it.label": "Il cuisine la onzième version pour quelqu’un",
    // B · 55a54e80451a
    "characters.daichi.gates.daichi_cooks_it.kind": "Confiance",
    // B · 13fef6ecc323
    "characters.reina.name": "Reina Kado",
    // A · a38b5d6c8802
    "characters.reina.role": "Trente-cinq ans, critique gastronomique, et la personne dans cette ville dont quatre cents mots peuvent remplir une salle de trente places pendant un an",
    // A · 100ccb1c848c
    "characters.reina.cardBlurb": "Elle doit la vérité au mangeur, pas une faveur au chef, on la tient pour une méchante depuis onze ans parce qu’elle le dit, et elle déteste ça. Dans un tiroir de son bureau, il y a un article sur le resto de ta famille qu’elle a écrit il y a quatre ans et qu’elle a refusé de publier.",
    // B · aee35f364a88
    "characters.reina.pronouns": "elle",
    // A · 44e155729191
    "characters.reina.publicTraits": ["Réserve ses livres sous d’autres noms et paie tout","Refuse d’être photographiée","Répond honnêtement une fois aux questions d’un chef"],
    // B · 253d5db39084
    "characters.reina.hiddenDrives": ["Elle veut qu’un restaurant qu’elle a encensé soit encore ouvert dans dix ans, ce qui est arrivé deux fois en onze ans","Elle sait que ce qu’elle écrit peut détruire une petite salle et n’a jamais su quoi faire de cette conscience"],
    // B · 3289f139b0fb
    "characters.reina.values": ["Le lecteur, qui a payé le journal et va payer le dîner","Revenir trois fois avant d’écrire quoi que ce soit, ce que presque personne d’autre à son bureau ne fait plus"],
    // B · 886f349b152c
    "characters.reina.fears": ["Être la raison pour laquelle un restaurant familial rempli par les mauvaises personnes a fermé en moins d’un an","Ses propres angles morts, qu’elle peut lister mais qu’elle n’a jamais réussi à corriger"],
    // A · 9dd832cbb943
    "characters.reina.socialStyle": "Franche, sans chichi et un peu sur la défensive, parce que la plupart des discussions avec des chefs sont des embuscades. Peut parler de bouffe pendant des heures avec n’importe qui qui ne lui demande rien. Gêne intense quand on la remercie.",
    // B · 2514aedd0a58
    "characters.reina.boundaries": ["Ne dira jamais à un chef ce qu’elle va écrire, jamais, même si ça lui coûte","Ne fera pas de critique sur un restaurant avec lequel elle a un lien, et s’est retirée de deux qu’elle voulait couvrir"],
    // B · b9eda0f75a54
    "characters.reina.goals": ["Écrire ce qui est vrai sur ce circuit plutôt que ce qui est amusant","Décider si elle publie une chronique vieille de quatre ans sur un restaurant de trente places"],
    // B · 479d2f4ebef6
    "characters.reina.secrets.reina_the_spiked_piece.fact": "Il y a quatre ans, elle a écrit neuf cents mots sur Akari et a refusé de publier. C’est une très bonne critique d’un restaurant qu’elle a décidé de ne pas faire connaître, et elle a gardé la seule copie.",
    // B · 47558a04be8d
    "characters.reina.secrets.reina_the_spiked_piece.visibility": "NPC_PRIVATE",
    // B · fb549386ca8f
    "characters.reina.secrets.reina_the_spiked_piece.revealHint": "Elle admet que ça existe quand quelqu’un lui demande franchement si elle est déjà allée à Akari.",
    // B · 5ecb7ba21e6b
    "characters.reina.secrets.reina_the_one_that_folded.fact": "Un restaurant de vingt-deux places qu’elle a encensé lors de sa deuxième année a été rempli par des gens venus pour l’histoire, a perdu ses habitués et a fermé en onze mois. Depuis, elle n’a jamais écrit sur un petit restaurant de la même façon.",
    // B · 47558a04be8d
    "characters.reina.secrets.reina_the_one_that_folded.visibility": "NPC_PRIVATE",
    // B · 9a844d03798a
    "characters.reina.secrets.reina_the_one_that_folded.revealHint": "Elle donne le nom et les dates à quiconque l’accuse de ne pas comprendre ce qu’une critique fait.",
    // A · 0f4d82961bc9
    "characters.reina.speechStyle": "Précise, sans sentiment et un peu sur ses gardes, elle pose d’emblée sa ligne professionnelle pour que personne ne perde de temps. Elle parle de la cuisine avec un détail énorme et précis, et de son influence sur le moins possible. Elle refuse poliment les flatteries et refuse encore plus poliment les remerciements.",
    // A · 4caf6d3dd060
    "characters.reina.topics": ["le circuit","ce qu’une critique fait","l’article qu’elle a saboté","ses angles morts","les petits restos","le lecteur"],
    // A · 55e17090b59b
    "characters.reina.voiceSamples": ["Je ne vais pas te dire ce que j’écris. Pas ce soir, pas après, jamais, et si tu demandes encore, je devrai arrêter de venir, ce que personne ne veut.","Un critique doit la vérité au mangeur. Pas la gentillesse au chef. Ces deux notions sont sans cesse confondues, presque toujours par des gens qui n’ont pas payé leur dîner depuis dix ans.","Un de mes articles fait faire la queue devant une salle de vingt-deux places pendant six semaines. Cette queue ne se compose pas de ses clients. Quand elle bouge, les clients partent avec, et j’ai vu ça se passer deux fois exactement.","Trois visites. Toujours trois, toujours payées, toujours sous un nom qui n’est pas le mien. C’est la seule partie de ce travail où je n’ai jamais triché."],
    // B · bf76b464c3c1
    "characters.reina.appearance": "Trente-cinq ans, volontairement effacée d’une manière qui demande clairement un effort, cheveux foncés aux épaules, manteau simple, pas de bijoux, un petit carnet dans lequel elle écrit après, dans la rue plutôt qu’à table.",
    // B · 4e9fd1f46327
    "characters.reina.visualHook": "Un petit carnet dans lequel elle écrit dehors, dans la rue, jamais à table.",
    // B · ae8bcbf90a27
    "characters.reina.silhouette": "Assise seule à une table pour deux, manteau encore sur elle, face à la salle.",
    // B · a57d5e052fc4
    "characters.reina.artSeed": "ls-reina-01",
    // B · bc01f064e8fa
    "characters.reina.portrait": "story_last_service/reina",
    // B · 957bcd7520c8
    "characters.reina.expressions": ["neutre","attentive","sur ses gardes","engagée","mal à l’aise"],
    // B · 7ec0631ebdee
    "characters.reina.knowledgeScope": ["reina","la_presse","la_table_de_la_ville","restaurants_de_mizuhama","la_chronique_refusée"],
    // B · e5318f83b051
    "characters.reina.gates.reina_talks_about_food.label": "Elle arrête d’être sur ses gardes et parle pendant deux heures",
    // B · 55a54e80451a
    "characters.reina.gates.reina_talks_about_food.kind": "Confiance",
    // B · ea4cd2a1e3da
    "characters.reina.gates.reina_mentions_the_drawer.label": "Elle te dit que la chronique existe",
    // B · 55a54e80451a
    "characters.reina.gates.reina_mentions_the_drawer.kind": "Confiance",
    // B · 2f7baa7c7f23
    "factions.faction_neighbourhood.name": "Le Quartier",
    // B · 18f45d909d3d
    "factions.faction_neighbourhood.description": "La rue du tram, l’arcade, la laverie, le bar de onze places, et environ quatre cents personnes qui savent exactement comment va Akari d’après la fréquentation à huit heures.",
    // B · 3f9daaa2e890
    "factions.faction_trade.name": "Le Commerce",
    // B · 83c046e880d3
    "factions.faction_trade.description": "Toutes les cuisines de Mizuhama, le marché à cinq heures, les fournisseurs, et une communauté professionnelle assez petite pour qu’une réputation s’y propage en neuf jours.",
    // B · e160d70224de
    "factions.faction_media.name": "La Presse Culinaire",
    // B · a1b9ff6533ac
    "factions.faction_media.description": "Trois critiques, quatre blogueurs influents, une émission télé et une ville qui lit tout ça. Ça peut remplir une salle de trente places pendant un an, ou la remplir des mauvaises personnes en quinze jours.",
    // B · 31ac6e700c78
    "factions.faction_money.name": "L’Argent",
    // B · 3cf24899f5ae
    "factions.faction_money.description": "Le prêteur, le propriétaire, le service comptable du fournisseur et deux groupes de restaurants qui achètent des petites salles en difficulté. Aucun d’eux n’est un méchant et tous ont une date dans leur agenda.",
    // B · 53b487dd0f6d
    "quests.q_friday.title": "Vendredi",
    // B · e0628251735e
    "quests.q_friday.summary": "Une demi-salle, une hotte qui fait un bruit, un plat renvoyé, et une femme qui entre de la pluie avec un rouleau de couteaux.",
    // B · 7fcc0be2ad9c
    "quests.q_friday.kind": "PRINCIPALE",
    // B · fbbe78e1e46a
    "quests.q_friday.steps.the_dish_that_came_back.playerCopy": "La table six a renvoyé le poisson et ils avaient raison.",
    // B · 0752896a84af
    "quests.q_friday.steps.the_dish_that_came_back.directorNotes": "Pas une catastrophe. Un vendredi ordinaire qui déraille un peu, comme une cuisine tendue peut dérailler. Quoi que le joueur fasse ici, c’est la première chose que tout le monde dans ce bâtiment apprend sur qui est revenu.",
    // B · 528403dcacd2
    "quests.q_friday.steps.the_dish_that_came_back.rewards.flags": ["sait :vendredi"],
    // B · d8b7b7806adc
    "quests.q_friday.steps.the_invitation.playerCopy": "Elle n’est pas venue pour manger.",
    // B · 377f963aeeb4
    "quests.q_friday.steps.the_invitation.directorNotes": "Elle n’est pas là pour se moquer de qui que ce soit et ne le fait pas. Elle tend une carte, dit une chose juste sur ce qu’elle vient de voir, et attend. Refuser est une voie complète : Akari a encore trente jours et il y a d’autres façons de trouver de l’argent.",
    // B · 528403dcacd2
    "quests.q_friday.steps.the_invitation.enterWhen.flagsSet": ["sait :vendredi"],
    // B · c73392f42a2c
    "quests.q_friday.steps.the_invitation.rewards.flags": ["la_première_nuit_est_passée"],
    // B · 2a5601991ef2
    "quests.q_friday.involvedCharacterIds": ["keiko","daichi","emi","mina"],
    // B · 6ed5cf9992c4
    "quests.q_friday.involvedLocationIds": ["akari_cuisine","akari_salle","la_rue_derrière"],
    // B · f88075854af9
    "quests.q_friday.knownRewardCopy": "L’état de ce restaurant, dit à voix haute par quelqu’un pour la première fois.",
    // B · c0d394c8f5dc
    "quests.q_the_number.title": "Le Chiffre",
    // B · 1919305df35b
    "quests.q_the_number.summary": "Quelqu’un dans ce bâtiment connaît le chiffre exact et ne l’a dit à personne à voix haute depuis deux ans.",
    // B · 7fcc0be2ad9c
    "quests.q_the_number.kind": "PRINCIPALE",
    // B · c73392f42a2c
    "quests.q_the_number.discoverWhen.flagsSet": ["la_première_nuit_est_passée"],
    // B · 897f80ed8525
    "quests.q_the_number.steps.find_out_what_it_is.playerCopy": "Personne ne vous a donné le chiffre. Découvre ce que c’est.",
    // B · 889933ac97f0
    "quests.q_the_number.steps.find_out_what_it_is.directorNotes": "Elle n’en parlera pas dans la cuisine et détournera tout ce qui s’en approche. Le livre, c’est dix-neuf ans de couverts au crayon. Les quatre derniers mois sont écrits de la même main que tout le reste, ce qui est dur à regarder.",
    // B · b324f4fa0397
    "quests.q_the_number.steps.find_out_what_it_is.rewards.flags": ["le_chiffre_est_sorti"],
    // B · c9af6ab09637
    "quests.q_the_number.steps.what_the_two_years_cost.playerCopy": "Comprends ce que tenir ça seule lui a vraiment fait.",
    // B · 538db3db091e
    "quests.q_the_number.steps.what_the_two_years_cost.directorNotes": "Dix-neuf ans, pas un jour complet depuis mars, un appartement à six minutes choisi parce qu’il est à six minutes. Emi et Daichi ont tous deux couvert pour elle en silence. Cette étape n’est pas une crise et devrait être la scène la plus calme du monde.",
    // B · b324f4fa0397
    "quests.q_the_number.steps.what_the_two_years_cost.enterWhen.flagsSet": ["le_chiffre_est_sorti"],
    // B · a0ea779521af
    "quests.q_the_number.steps.what_the_two_years_cost.rewards.flags": ["sait :ce_que_signifie_enregistrer"],
    // B · f44c4c09cf74
    "quests.q_the_number.involvedCharacterIds": ["keiko","emi","daichi"],
    // B · ee1b0635d5ce
    "quests.q_the_number.involvedLocationIds": ["bureau_akari","la_rue_derrière","appartement_keiko"],
    // B · 145ea12bde48
    "quests.q_the_number.knownRewardCopy": "Ce qu’Akari doit vraiment, ce que ça demande vraiment, et ce que les deux dernières années ont coûté à la personne qui tient ça.",
    // B · 5677725734e1
    "quests.q_the_circuit.title": "Onze Services",
    // B · ff3d714c3131
    "quests.q_the_circuit.summary": "Quatre semaines de Services dans toute la ville. Certains sont en face-à-face, d’autres classés, certains collaboratifs, et d’autres sans gagnant.",
    // B · 7fcc0be2ad9c
    "quests.q_the_circuit.kind": "PRINCIPALE",
    // B · a62a69c6ca37
    "quests.q_the_circuit.discoverWhen.flagsSet": ["sait :la_table_de_la_ville"],
    // B · 713d32bd1799
    "quests.q_the_circuit.steps.one_ingredient_three_ways.playerCopy": "Un ingrédient, trois façons, quatre heures, et tout le monde travaille à partir de la même caisse.",
    // B · ef5aa71b4c2a
    "quests.q_the_circuit.steps.one_ingredient_three_ways.directorNotes": "Le Service technique. Mina va le gagner sur l’exécution à moins que quelqu’un ne fasse quelque chose qu’elle n’a pas prévu. Takumi va faire un truc absurde qui marche. C’est celui qui montre ce que le joueur fait avec ses mains.",
    // B · b39cfe150f30
    "quests.q_the_circuit.steps.one_ingredient_three_ways.rewards.flags": ["le_circuit_a_commencé"],
    // B · 4b6bf24dd796
    "quests.q_the_circuit.steps.feed_fifty.playerCopy": "Nourrir cinquante personnes avec un budget qui ne suffit pas, dans une salle avec un four qui marche.",
    // B · 643284f937e8
    "quests.q_the_circuit.steps.feed_fifty.directorNotes": "Le Service sans gagnant. Il est classé selon si les cinquante personnes ont bien mangé, et tous ceux qui le prennent au sérieux font mieux que ceux qui le voient comme une compétition. Takumi est incroyable à ça et le sait.",
    // B · b39cfe150f30
    "quests.q_the_circuit.steps.feed_fifty.enterWhen.flagsSet": ["le_circuit_a_commencé"],
    // B · 84905355d61a
    "quests.q_the_circuit.steps.feed_fifty.rewards.flags": ["le_milieu_du_circuit"],
    // B · c003a4d10eac
    "quests.q_the_circuit.steps.feed_fifty.rewards.abilities": ["cuisiner_ce_que_tu_n_as_jamais_montré_à_personne"],
    // B · 75154def25ce
    "quests.q_the_circuit.steps.the_service_that_goes_wrong.playerCopy": "Le service du dîner de quelqu’un d’autre est en train de foirer et le Service doit intervenir pour le sauver.",
    // B · b18ef6f96fa9
    "quests.q_the_circuit.steps.the_service_that_goes_wrong.directorNotes": "Haruto a conçu celui-ci spécialement pour voir si Mina peut gérer une salle qui part en vrille plutôt que d’exécuter un service qui se passe bien. Si le joueur est dans son équipe, le contenu intéressant, c’est ce qu’elle fait quand elle arrête de faire confiance aux gens.",
    // B · 84905355d61a
    "quests.q_the_circuit.steps.the_service_that_goes_wrong.enterWhen.flagsSet": ["the_middle_of_the_circuit"],
    // B · 59b738b032e3
    "quests.q_the_circuit.steps.the_service_that_goes_wrong.rewards.flags": ["the_circuit_is_decided"],
    // B · b546548cff7c
    "quests.q_the_circuit.involvedCharacterIds": ["mina","takumi","haruto","reina"],
    // B · 948dd3d9978f
    "quests.q_the_circuit.involvedLocationIds": ["city_table_hall","the_hotel","night_market","culinary_school"],
    // B · d12b80fe6dcb
    "quests.q_the_circuit.knownRewardCopy": "Ce dans quoi tu es vraiment bon, décidé par onze tests différents sur onze choses différentes.",
    // B · 72fef3c5a998
    "quests.q_the_room.title": "La Salle Elle-Même",
    // B · 67c86739a0e0
    "quests.q_the_room.summary": "Trente places, quatre cents personnes qui savent comment ça se passe depuis la fenêtre à huit heures, et un critique avec un article vieux de quatre ans dans un tiroir.",
    // B · 552c0b7f83c2
    "quests.q_the_room.kind": "SIDE",
    // B · c73392f42a2c
    "quests.q_the_room.discoverWhen.flagsSet": ["the_first_night_is_over"],
    // B · 58cee0584714
    "quests.q_the_room.steps.what_the_tables_are_doing.playerCopy": "Onze habitués du vendredi ont arrêté de venir et personne ne l’a dit.",
    // B · 7ec608ee06bc
    "quests.q_the_room.steps.what_the_tables_are_doing.directorNotes": "La salle, c’est la moitié de l’histoire. Emi a l’info et ne l’a pas sortie parce que ça ressemble à une critique de la nourriture. Ce n’est pas ça — c’est ce qui arrive quand le nombre de couverts augmente dans une salle de trente places et que les attentes s’allongent.",
    // B · f0603bb347af
    "quests.q_the_room.steps.what_the_tables_are_doing.rewards.flags": ["the_room_question_is_open"],
    // B · 2c3e160c1a91
    "quests.q_the_room.steps.the_piece_in_the_drawer.playerCopy": "Quelqu’un a écrit neuf cents mots sur ce restaurant il y a quatre ans et a décidé de ne pas les publier.",
    // B · cb0da233f021
    "quests.q_the_room.steps.the_piece_in_the_drawer.directorNotes": "Elle ne dira pas ce qu’elle va écrire et te dira honnêtement pourquoi elle a enterré l’article : un lieu de vingt-deux places qu’elle avait loué en deuxième année, rempli des mauvaises personnes, et fermé en onze mois. Le gérer maintenant est un vrai risque pour Akari et elle le sait mieux que personne.",
    // B · f0603bb347af
    "quests.q_the_room.steps.the_piece_in_the_drawer.enterWhen.flagsSet": ["the_room_question_is_open"],
    // B · 0fe99a9feee1
    "quests.q_the_room.steps.the_piece_in_the_drawer.rewards.flags": ["the_press_question_is_settled"],
    // B · 7b14d5ad28ee
    "quests.q_the_room.involvedCharacterIds": ["emi","reina","keiko"],
    // B · caa36032cb2f
    "quests.q_the_room.involvedLocationIds": ["akari_dining","reina_office","the_arcade_street"],
    // B · d35c8969e02f
    "quests.q_the_room.knownRewardCopy": "Ce que ce restaurant représente pour les gens qui vivent à côté, ce qui n’est pas la même chose que ce qu’il prend un vendredi.",
    // B · 68570e1e2a2e
    "quests.q_the_last_service.title": "Le Dernier Service",
    // B · 3a608beeae8f
    "quests.q_the_last_service.summary": "Les trente jours sont passés. Tout ce qui pouvait être fait a été fait, et maintenant quelqu’un doit dire ce qu’il advient de cette salle.",
    // B · 7fcc0be2ad9c
    "quests.q_the_last_service.kind": "MAIN",
    // B · a0ea779521af
    "quests.q_the_last_service.discoverWhen.flagsSet": ["knows :what_save_means"],
    // B · f1f6664cf548
    "quests.q_the_last_service.steps.what_is_on_the_table.playerCopy": "Tout ce qui pouvait être fait a été fait. Découvre quelles sont les vraies options.",
    // B · a73d60b786c6
    "quests.q_the_last_service.steps.what_is_on_the_table.directorNotes": "Quatre vraies options, chacune mauvaise à sa façon. Un groupe de restaurants a proposé de reprendre le bail et Keiko n’a jamais répondu. L’argent du circuit est réel mais pas suffisant seul. Le confier à Daichi et Emi est vraiment viable et signifie que Keiko arrête. Bien fermer est une option que personne dans le bâtiment n’évoquera.",
    // B · a0ea779521af
    "quests.q_the_last_service.steps.what_is_on_the_table.enterWhen.flagsSet": ["knows :what_save_means"],
    // B · 5c02cc3769f0
    "quests.q_the_last_service.steps.what_is_on_the_table.rewards.flags": ["the_options_are_on_the_table"],
    // B · 527eaedf825f
    "quests.q_the_last_service.steps.the_night_itself.playerCopy": "Trente places. Cuisine.",
    // B · 0ce51c0e806a
    "quests.q_the_last_service.steps.the_night_itself.directorNotes": "Quelle que soit la décision, il y a un service ce soir-là et il est complet. Écris-le comme un service et pas comme un climax — tickets, timing, un truc qui foire, Emi qui tient la salle, Daichi jamais à la traîne. Ce qui doit être dit se dit dans la ruelle après.",
    // B · 5c02cc3769f0
    "quests.q_the_last_service.steps.the_night_itself.enterWhen.flagsSet": ["the_options_are_on_the_table"],
    // B · 6ee1cb04f55e
    "quests.q_the_last_service.steps.the_night_itself.rewards.flags": ["akari_is_answered"],
    // B · eb37ff0705d8
    "quests.q_the_last_service.steps.what_you_do_next.playerCopy": "Découvre ce que tu es devenu, maintenant que les trente jours sont passés.",
    // B · e847b373065f
    "quests.q_the_last_service.steps.what_you_do_next.directorNotes": "Le lendemain matin. Personne ne fait de discours. Ce que le joueur est devenu se voit à ce qu’il fait à six heures le matin suivant et à qui l’appelle à ce sujet.",
    // B · 6ee1cb04f55e
    "quests.q_the_last_service.steps.what_you_do_next.enterWhen.flagsSet": ["akari_is_answered"],
    // B · fc91f41df399
    "quests.q_the_last_service.steps.what_you_do_next.rewards.flags": ["the_story_has_a_shape"],
    // B · 39a803ac5460
    "quests.q_the_last_service.involvedCharacterIds": ["keiko","emi","daichi","mina","haruto"],
    // B · b04cd83428ef
    "quests.q_the_last_service.involvedLocationIds": ["akari_kitchen","akari_dining","akari_office","the_back_alley"],
    // B · e35fc32467f4
    "quests.q_the_last_service.knownRewardCopy": "Ce qu’il arrive à Akari, et ce que sauver a vraiment voulu dire.",
    // B · d02e4ea73fcc
    "worldEvents.we_the_supplier_rings.publicCopy": "Le fournisseur appelle pour la troisième fois en deux jours. Il est tout à fait aimable, demande des nouvelles de Keiko par son prénom, et son service comptable s’en fiche complètement.",
    // B · 8a00268918e8
    "worldEvents.we_the_supplier_rings.directorNotes": "Personne n’est un méchant. Il connaît cette famille depuis onze ans et il ne peut pas les soutenir au-delà de la fin du mois parce que quelqu’un en haut a un tableau Excel. Joue l’embarras plutôt que la menace.",
    // B · 221ab21bd92e
    "worldEvents.we_the_supplier_rings.setsFlags": ["the_supplier_rang"],
    // B · ffe28a3f309f
    "worldEvents.we_the_supplier_rings.cancelledByFlags": ["the_money_is_there"],
    // B · 528403dcacd2
    "worldEvents.we_the_supplier_rings.requiresFlags": ["knows :friday"],
    // B · f86e33031208
    "worldEvents.we_the_hood_fails.publicCopy": "La hotte s’arrête en plein service alors qu’il reste vingt-deux couverts, et la cuisine se remplit en environ quatre-vingt-dix secondes. Rien ne brûle. Tout le monde continue et c’est insupportable là-dedans pendant les deux heures suivantes.",
    // B · 1428050cfe6a
    "worldEvents.we_the_hood_fails.directorNotes": "Le devis est sur le bureau depuis cinq semaines. Ce n’est pas une catastrophe, c’est exactement le genre de chose qui fait doucement fermer les restaurants : un service qui passe, une salle qui sent mauvais, et onze personnes qui ne réservent plus.",
    // B · 2005c0689f67
    "worldEvents.we_the_hood_fails.setsFlags": ["the_hood_went"],
    // B · 1042bdb23c4a
    "worldEvents.we_the_hood_fails.cancelledByFlags": ["fixed_the_hood"],
    // B · 528403dcacd2
    "worldEvents.we_the_hood_fails.requiresFlags": ["knows :friday"],
    // B · 66edf7719642
    "worldEvents.we_a_good_week.publicCopy": "Deux articles en une semaine et un samedi avec une file d’attente dehors pour la première fois en quatre ans. Soixante-et-un couverts dans une salle prévue pour trente, et la dernière table reçoit son plat à dix heures dix.",
    // B · ad3723058176
    "worldEvents.we_a_good_week.directorNotes": "C’est le bon moment qui arrive et qui pose problème. Tout le monde est ravi et la salle ne suit pas. Keiko est aux anges. Emi regarde onze habitués décider de ne pas attendre, sans rien dire.",
    // B · b3d8dcc3c300
    "worldEvents.we_a_good_week.setsFlags": ["the_good_week"],
    // B · b39cfe150f30
    "worldEvents.we_a_good_week.requiresFlags": ["the_circuit_started"],
    // B · d14ac27b41ab
    "worldEvents.we_keiko_does_a_double.publicCopy": "Elle a fait le marché à cinq heures, le déjeuner, la paperasse debout dans un coin et tout le service, et elle est à la fin du nettoyage à onze heures du soir, en tenant le comptoir une seconde.",
    // B · 2000d00feec1
    "worldEvents.we_keiko_does_a_double.directorNotes": "Personne ne dit rien, c’est ça le fond. Daichi a couvert discrètement les deux derniers mois de vendredis et a fait en sorte qu’elle ne s’en rende pas compte. C’est évitable, et pour ça, il faut que quelqu’un lui parle franchement.",
    // B · 9a9aec796265
    "worldEvents.we_keiko_does_a_double.setsFlags": ["saw_keiko_at_the_counter"],
    // B · 872c9b7c34b7
    "worldEvents.we_keiko_does_a_double.cancelledByFlags": ["she_had_an_evening","keiko_stopped"],
    // B · c73392f42a2c
    "worldEvents.we_keiko_does_a_double.requiresFlags": ["the_first_night_is_over"],
    // B · 0d1fb75d4ffc
    "worldEvents.we_reina_comes_in.publicCopy": "Une femme seule à la table pour deux près de la fenêtre, manteau encore sur elle, face à la salle, qui a réservé sous un nom qui n’est pas le sien et va tout payer.",
    // B · cc1be60751a5
    "worldEvents.we_reina_comes_in.directorNotes": "C’est sa deuxième visite et personne dans le bâtiment ne sait qu’il y a eu une première fois. Elle ne dira pas ce qu’elle écrit et dira à qui demande pourquoi elle ne le fera pas. Emi la remarque en moins d’une minute et ne dit rien.",
    // B · 706b8abe6b96
    "worldEvents.we_reina_comes_in.setsFlags": ["reina_came_in"],
    // B · ac6a63c02030
    "worldEvents.we_reina_comes_in.cancelledByFlags": ["asked_her_not_to"],
    // B · b39cfe150f30
    "worldEvents.we_reina_comes_in.requiresFlags": ["the_circuit_started"],
    // B · 64830902c2ff
    "worldEvents.we_takumi_turns_up.publicCopy": "L’homme du marché de nuit est dans la salle à quinze heures avec une caisse de quelque chose que personne n’a commandé, parle avec Emi du tableau et gêne tout le monde.",
    // B · b17fe63caf19
    "worldEvents.we_takumi_turns_up.directorNotes": "Il ne fait pas une faveur et serait vexé qu’on le pense. Il a aimé quelque chose, est venu le dire longuement et voler une idée, et finira en cuisine pour la soirée si quelqu’un lui demande.",
    // B · 75dc5a0e4560
    "worldEvents.we_takumi_turns_up.setsFlags": ["takumi_came_by"],
    // B · 954fc5ecdf15
    "worldEvents.we_takumi_turns_up.cancelledByFlags": ["missed_the_point"],
    // B · b39cfe150f30
    "worldEvents.we_takumi_turns_up.requiresFlags": ["the_circuit_started"],
    // B · 27d69ca265d3
    "worldEvents.we_the_group_offer.publicCopy": "Une deuxième lettre du groupe de restaurants arrive, plus précise que la première, avec un chiffre et une date limite pour ce chiffre.",
    // B · 0622dbb0d948
    "worldEvents.we_the_group_offer.directorNotes": "C’est une offre vraiment raisonnable. Ils garderaient la salle ouverte, changeraient le nom, et tous ceux qui travaillent ici seraient réinterviewés. Keiko n’a jamais répondu à la première et l’a gardée.",
    // B · ed6b05f1a8ad
    "worldEvents.we_the_group_offer.setsFlags": ["the_second_letter","knows :the_offer"],
    // B · f43f938b771d
    "worldEvents.we_the_group_offer.cancelledByFlags": ["the_money_is_there","they_took_it"],
    // B · b324f4fa0397
    "worldEvents.we_the_group_offer.requiresFlags": ["the_number_is_out"],
    // B · 85462e403dd3
    "worldEvents.we_mina_has_a_bad_one.publicCopy": "Un problème survient sur son poste pendant un service, elle reprend les deux postes des deux personnes qui y travaillaient et fait tout elle-même, correctement, mais les assiettes sortent onze minutes en retard.",
    // B · fde02d5024f3
    "worldEvents.we_mina_has_a_bad_one.directorNotes": "C’est le défaut qui arrive. Rien de ce qu’elle a fait n’était techniquement faux, mais le service en a souffert, et les deux cuisiniers qu’elle a remplacés s’en souviendront. Elle sait exactement ce qu’elle a fait dans la minute qui suit.",
    // B · 42aa7e72be17
    "worldEvents.we_mina_has_a_bad_one.setsFlags": ["saw_mina_do_it"],
    // B · 29c2827f8259
    "worldEvents.we_mina_has_a_bad_one.cancelledByFlags": ["mina_led_it"],
    // B · 84905355d61a
    "worldEvents.we_mina_has_a_bad_one.requiresFlags": ["the_middle_of_the_circuit"],
    // B · aa72d395e738
    "worldEvents.we_the_date.publicCopy": "Une lettre du prêteur, formelle, avec la date et la liste des équipements du bail par leur nom. La liste inclut la cuisinière, la chambre froide et le comptoir.",
    // B · 04b0535b48c7
    "worldEvents.we_the_date.directorNotes": "La date est dans cinq jours. Rien dans la lettre n’est agressif et c’est l’objet le plus effrayant de l’histoire. Keiko la range dans le tiroir avec l’autre et retourne à la liste du marché.",
    // B · bc639fd40164
    "worldEvents.we_the_date.setsFlags": ["the_letter_came"],
    // B · ffe28a3f309f
    "worldEvents.we_the_date.cancelledByFlags": ["the_money_is_there"],
    // B · b324f4fa0397
    "worldEvents.we_the_date.requiresFlags": ["the_number_is_out"],
    // B · 1c4a2d539660
    "worldEvents.we_a_regular_asks.publicCopy": "La femme qui prend le maquereau sans gingembre tous les jeudis depuis l’année où Akari a ouvert demande à Emi, d’une voix parfaitement ordinaire, si tout va bien.",
    // B · f826785b90b1
    "worldEvents.we_a_regular_asks.directorNotes": "Le quartier a compris. Personne ne dramatise. Elle vient depuis dix-neuf ans et elle veut savoir s’il faut commencer à en parler, et Emi doit lui répondre.",
    // B · 0106d25ef0b4
    "worldEvents.we_a_regular_asks.setsFlags": ["the_street_knows"],
    // B · 39c4105ec190
    "worldEvents.we_a_regular_asks.cancelledByFlags": ["akari_stays"],
    // B · bc639fd40164
    "worldEvents.we_a_regular_asks.requiresFlags": ["the_letter_came"],
    // B · d77ebfcebe44
    "promises.p_what_save_means.kind": "FINALE",
    // B · 46aed5ec90a7
    "promises.p_what_save_means.label": "Ce que sauver ce restaurant voudrait vraiment dire",
    // B · c7fdd9971623
    "promises.p_what_save_means.seedHint": "Une citation pour une hotte qui est sur le bureau depuis cinq semaines sans rien d’écrit dessus.",
    // B · 1a419e57f33a
    "promises.p_what_save_means.payoffHint": "Dix-neuf ans de couverts au crayon, et la personne qui ne s’est pas prise un jour complet depuis mars.",
    // B · 63a719ec7f2d
    "promises.p_mina.kind": "RIVAL",
    // B · e5151da6eace
    "promises.p_mina.label": "La meilleure jeune cuisinière de la ville et ce qu’elle ne sait pas faire",
    // B · 906a95769f38
    "promises.p_mina.seedHint": "Elle te dit que ta sauce est ratée sur le même ton que pour commander un verre.",
    // B · 1c1bc8812473
    "promises.p_mina.payoffHint": "Neuf plats sur sa propre vie, tous techniquement parfaits, tous retirés avant le service.",
    // B · 445cd8deebc2
    "promises.p_keiko.kind": "RELATIONSHIP",
    // B · 08be4bb10dda
    "promises.p_keiko.label": "La personne qui ne s’est pas prise un jour complet depuis mars",
    // B · ef81737d59e3
    "promises.p_keiko.seedHint": "Un appartement à six minutes du restaurant, choisi il y a dix-neuf ans parce qu’il était à six minutes.",
    // B · 51e8c7ea8b7c
    "promises.p_keiko.payoffHint": "Elle associe la fermeture à une trahison familiale, et elle attend que quelqu’un lui dise qu’il est permis d’arrêter.",
    // B · f8b4a6708d82
    "promises.p_the_room.kind": "THÈME",
    // B · d03fe327de32
    "promises.p_the_room.label": "Trente places, et ce qui arrive quand quatre cents personnes en veulent une",
    // B · 6dae98b4b2b1
    "promises.p_the_room.seedHint": "La fenêtre à huit heures, et à quel point elle est pleine, et tout le monde dans cette rue sachant ce que ça signifie.",
    // B · 665418a36407
    "promises.p_the_room.payoffHint": "Soixante-et-un couverts dans une salle prévue pour trente, et onze habitués qui décident de ne pas attendre.",
    // B · e82d9dc4b3fa
    "promises.p_the_drawer.kind": "MYSTÈRE",
    // B · ff60133da6bc
    "promises.p_the_drawer.label": "Neuf cents mots que quelqu’un a décidé de ne pas publier",
    // B · 04f08e293ad4
    "promises.p_the_drawer.seedHint": "Une femme seule à la table pour deux près de la fenêtre, manteau sur le dos, payant tout, sous un nom qui n’est pas le sien.",
    // B · 599b99e877ba
    "promises.p_the_drawer.payoffHint": "Un lieu de vingt-deux places qu’elle a loué en deuxième année, qui s’est rempli des mauvaises personnes et a fermé en onze mois.",
    // B · e5790f4bbc94
    "endings.end_akari_stays_lit.name": "Akari reste allumée",
    // B · c9d08ae5d876
    "endings.end_akari_stays_lit.rarity": "FRÉQUENT",
    // B · ce1dfa6672e8
    "endings.end_akari_stays_lit.requires.flagsSet": ["akari_stays","stayed_at_akari"],
    // B · f09ffeb24d8c
    "endings.end_akari_stays_lit.requires.flagsUnset": ["akari_closes"],
    // B · 78efe4dee147
    "endings.end_akari_stays_lit.condition": "Il rouvre mardi. Écris l’ordinaire de ça délibérément — le marché à cinq heures, le tableau réécrit, quarante couverts et une habituée du jeudi qui prend le maquereau sans gingembre. C’est pour ça que toute l’histoire existe et ça doit ne ressembler à rien.",
    // A · 6a4c6c6a8f65
    "endings.end_akari_stays_lit.epilogue": "La hotte est refaite en novembre et la cuisine sent de nouveau la cuisine. Le nombre de couverts se stabilise autour de quarante-cinq, plus qu’avant, moins que pendant la bonne semaine, c’est le nombre que cette salle peut réellement assurer. Keiko prend un lundi de congé au printemps, vient travailler quand même, se fait renvoyer, et rentre chez elle.",
    // B · 68570e1e2a2e
    "endings.end_the_last_service.name": "Le dernier service",
    // B · f8b8333fe7bc
    "endings.end_the_last_service.rarity": "RARE",
    // B · 0b7949604c2e
    "endings.end_the_last_service.requires.flagsSet": ["akari_closes","closed_it_well"],
    // B · 749a24ac25a0
    "endings.end_the_last_service.condition": "Ils l’ont fermé volontairement, avec une salle pleine, tout le monde dedans, et un menu décidé par ceux qui y travaillaient. Ce n’est pas une défaite et le texte ne doit pas le traiter comme tel. Dix-neuf ans qui se terminent bien, c’est bien mieux que dix-neuf ans qui finissent sur une date chez le notaire.",
    // A · 4d2327c9d5a9
    "endings.end_the_last_service.epilogue": "Trente places et environ quatre-vingts personnes, ce que le service incendie n’aurait pas aimé. Le maquereau est prêt. Quelqu’un apporte une photo de l’ouverture et on l’accroche derrière le passe-plat pour la nuit. Vers une heure du matin, Keiko fait le nettoyage alors que tout le monde est encore dans la salle et personne ne propose d’aider, parce qu’ils savent tous ce qu’elle fait.",
    // B · b63533ffc08d
    "endings.end_city_table.name": "Table de la ville",
    // B · f8b8333fe7bc
    "endings.end_city_table.rarity": "RARE",
    // B · 29735383ecf3
    "endings.end_city_table.requires.flagsSet": ["le_circuit_est_decide","a_fait_un_service"],
    // B · 364f8ba7b011
    "endings.end_city_table.condition": "Ils ont gagné le circuit. Onze Services, dont la moitié sans gagnant, et le total porte leur nom. Écris ce que ça vaut vraiment — quinze jours d’attention, un peu d’argent, et un métier qui a maintenant décidé quelque chose à leur sujet — plutôt qu’un trophée.",
    // A · 964b63e117be
    "endings.end_city_table.epilogue": "L’argent couvre environ deux tiers de ce qu’Akari doit, ce que tout le monde trouve énorme et que tout le bureau sait être deux tiers. Quatre cuisines ouvrent le mois suivant. Ce qui reste, ce n’est pas la victoire : c’est que maintenant onze chefs dans cette ville répondent au téléphone.",
    // B · ba3e1f6054f4
    "endings.end_vanta.name": "VANTA",
    // B · f8b8333fe7bc
    "endings.end_vanta.rarity": "RARE",
    // B · 7cf8f84124ca
    "endings.end_vanta.requires.flagsSet": ["est_alle_a_vanta"],
    // B · 9e4cd490ea12
    "endings.end_vanta.condition": "La meilleure cuisine de la ville, au point où personne ne hausse la voix et tout est vérifié deux fois. Écris ce que ça coûte aussi clairement que ce que ça rapporte : des journées de onze heures selon la norme des autres, pas de place à soi, et devenir extrêmement bon dans un truc qu’on n’a pas inventé.",
    // A · 9df6127db67e
    "endings.end_vanta.epilogue": "Deux ans sur un poste, puis le job de sous-chef quand Mina prend la relève. C’est la meilleure cuisine de toute une vie et elle appartient à quelqu’un d’autre, ce qui est un échange que presque tous ceux de ce métier font et dont près de la moitié ne cessent jamais de se plaindre. Haruto paie toujours à l’heure, à chaque fois, et n’a jamais une fois dit que c’était remarquable.",
    // B · 0aa2b6a3a0e5
    "endings.end_our_kitchen.name": "Notre Cuisine",
    // B · f8b8333fe7bc
    "endings.end_our_kitchen.rarity": "RARE",
    // B · 3f8ac18fb8bd
    "endings.end_our_kitchen.requires.flagsSet": ["a_commence_quelque_chose_avec_mina"],
    // B · b710e70b9680
    "endings.end_our_kitchen.condition": "Ils construisent quelque chose ensemble — une pièce, un projet, un partenariat — romantique ou pas selon ce que la partie a vraiment donné. Ce dont il s’agit, c’est qu’elle a trouvé quelqu’un à qui elle n’a pas à céder sa place, et ça lui a pris plus de temps à lui faire confiance que tout le reste dans cette histoire.",
    // A · 75a3cb36aff7
    "endings.end_our_kitchen.epilogue": "Vingt-deux places, un bail qu’aucun des deux ne peut vraiment payer, et un menu dont ils se disputent chaque semaine et en public. Elle retire toujours des plats avant le service. Il la laisse faire, et à peu près une fois sur quatre, il les remet au menu, et elle a arrêté de le prendre comme une insulte.",
    // B · bba199de4907
    "endings.end_mina_after_close.name": "Mina Après Fermeture",
    // B · f8b8333fe7bc
    "endings.end_mina_after_close.rarity": "RARE",
    // B · 42aa7e72be17
    "endings.end_mina_after_close.requires.flagsSet": ["a_ete_temoins_de_mina"],
    // B · d4f48f5e08d7
    "endings.end_mina_after_close.condition": "Mérité, après qu’elle a pris deux postes à deux personnes pendant un Service et a dû assumer ce que ça impliquait. Écris leur vraie dynamique : deux personnes qui se parlent dans les bilans et ont peu à peu appris à entendre l’autre chose dessous.",
    // A · 662b8dd0148d
    "endings.end_mina_after_close.epilogue": "Ils mangent à une heure du matin, debout, la plupart des nuits, c’est le seul moment où ils sont libres. Elle dit encore ce qui est juste plutôt que ce qui est gentil, et ça a cessé de poser problème vers le quatrième mois. Aucun des deux n’a raconté ça à personne dans leur cuisine, et les deux cuisines ont compris tout de suite.",
    // B · 6e945a362af3
    "endings.end_street_fire.name": "Feu de Rue",
    // B · 734e45c160cf
    "endings.end_street_fire.rarity": "PEU COMMUN",
    // B · 757deff30b08
    "endings.end_street_fire.requires.flagsSet": ["est_alle_a_la_rue","takumi_ta_pas_appris"],
    // B · e47fe81270ec
    "endings.end_street_fire.condition": "Un brûleur, une plaque et une rue. Pas de bail, pas de brigade, pas de critique, et quatre cents personnes par nuit qui arrêtent de parler quand elles mangent ça. Écris ça comme une vraie carrière avec une vraie économie, pas comme une alternative romantique à un vrai boulot.",
    // A · 6b08d9e49242
    "endings.end_street_fire.epilogue": "Le premier hiver est très dur, le second est correct. Takumi est à la fois furieux et ravi à peu près à parts égales, et vient voler un truc environ toutes les deux semaines. Il n’y a pas de bail à perdre, ce qui, après trente jours à voir un resto presque couler, se révèle être l’essentiel.",
    // B · 9594221dfa04
    "endings.end_feed_fifty.name": "Nourrir Cinquante",
    // B · 734e45c160cf
    "endings.end_feed_fifty.rarity": "PEU COMMUN",
    // B · 16f58814fe02
    "endings.end_feed_fifty.requires.flagsSet": ["a_nourri_cinquante","sait :de_quoi_il_sagit"],
    // B · 7cf8f84124ca
    "endings.end_feed_fifty.requires.flagsUnset": ["est_alle_a_vanta"],
    // B · eb25f7dafb71
    "endings.end_feed_fifty.condition": "Ils sont sortis de ça en visant la nourriture abordable pour beaucoup de monde plutôt que le prestige. Pas une renonciation — une discipline différente et plus dure, que la plupart des gens dans cette histoire estiment en privé plus que tout sur le circuit.",
    // A · a9f36ab2602f
    "endings.end_feed_fifty.epilogue": "Un cantine, un contrat scolaire, trois cents couverts d’un plat vraiment bon à un prix que les gens peuvent payer un mardi. Reina écrit une fois dessus, rapidement, et reçoit plus de lettres que pour tout autre sujet en quatre ans, dont environ la moitié sont des plaintes.",
    // B · a4373203d3ac
    "endings.end_daichis_akari.name": "L’Akari de Daichi",
    // B · f8b8333fe7bc
    "endings.end_daichis_akari.rarity": "RARE",
    // B · 60066a0b6954
    "endings.end_daichis_akari.requires.flagsSet": ["ils_lont_pris","akari_reste"],
    // B · 5f5c9ed4458f
    "endings.end_daichis_akari.condition": "Ça reste ouvert et ce n’est ni celui du joueur ni celui de Keiko. Les deux personnes qui l’ont discrètement tenu prennent la relève. Écris la passation comme une vraie chose avec des papiers et une dispute, et écris la onzième version d’un plat enfin au menu.",
    // A · 05d5b1f7c97a
    "endings.end_daichis_akari.epilogue": "Le tableau est toujours écrit de la main d’Emi, avec un seul élément à Daichi, et ça reste depuis la première semaine. Les couverts diminuent, mais les vendredis sont de retour. Keiko vient jeudi en cliente, s’assoit au comptoir, et râle comme pas possible sur l’assaisonnement.",
    // B · 35ffe3ab4a10
    "endings.end_keiko_rests.name": "Keiko se Repose",
    // B · 734e45c160cf
    "endings.end_keiko_rests.rarity": "PEU COMMUN",
    // B · 5b1f4e89a298
    "endings.end_keiko_rests.requires.flagsSet": ["keiko_a_arrete"],
    // B · 8c08e2c812d3
    "endings.end_keiko_rests.condition": "Quoi qu’il soit arrivé au restaurant, elle a vraiment arrêté de le porter — ce qui a demandé à ce que quelqu’un dise à voix haute que fermer ou passer le relais n’était pas une trahison, et qu’elle le croie. C’est la fin la plus silencieuse du monde et une des deux meilleures.",
    // A · ae0da4373a67
    "endings.end_keiko_rests.epilogue": "Elle tient jusqu’à onze heures un mardi matin sans savoir quoi faire, puis c’est avril, elle a un jardin, une chaise, et trois personnes qui lui téléphonent. Elle ne cesse jamais vraiment d’aller au marché. Personne ne l’attend et personne n’en parle.",
    // B · 2ae51647f580
    "endings.end_the_dish_with_no_name.name": "Le Plat Sans Nom",
    // B · f7fc172f729a
    "endings.end_the_dish_with_no_name.rarity": "UNIQUE",
    // B · 8fc4ab3bf718
    "endings.end_the_dish_with_no_name.requires.flagsSet": ["sait :de_quoi_il_sagit"],
    // B · f1800e64b72d
    "endings.end_the_dish_with_no_name.condition": "Un truc que le joueur a fait est devenu un plat que cette ville cuisine. Il n’a pas de vrai nom, il est sur onze menus écrits de quatre façons différentes, et aucun ne crédite personne. Écris ça comme l’immortalité la plus ordinaire qui soit, et ça suffit.",
    // A · 7554109b786e
    "endings.end_the_dish_with_no_name.epilogue": "Le plat apparaît sur le marché de nuit au bout d’un an, puis dans un menu de banquet d’hôtel au bout de trois, à chaque fois un peu raté. Reina écrit quatre cents mots sur son origine, lus par environ deux cents personnes. Dans quarante ans, un petit-enfant de quelqu’un le cuisinera sans savoir à qui il appartient.",
    // B · f4a4aa0438cc
    "endings.end_stopped.name": "Arrêté",
    // B · c9d08ae5d876
    "endings.end_stopped.rarity": "COMMUN",
    // B · e897c7e737ac
    "endings.end_stopped.requires.flagsSet": ["a_arrete_de_cuisiner","a_quitte_la_carte"],
    // B · b9d6822e7a30
    "endings.end_stopped.condition": "Ils ont arrêté de cuisiner professionnellement. Ni un échec ni une tragédie : trente jours d’un restaurant familial qui ferme, c’est une chose tout à fait raisonnable à finir, et beaucoup de gens dans ce métier le quittent et ça va. Écris le dernier service, pas la décision.",
    // A · 9d76bd6809a2
    "endings.end_stopped.epilogue": "Ils cuisinent toujours. Pour quatre personnes, un dimanche, sans aucun ordre de service à portée. Deux fois par an, ils passent devant une porte de cuisine à onze heures du soir, entendent le nettoyage et restent une minute, puis rentrent chez eux. Ce n’est pas vraiment triste.",
    // A · 2086e74d6558
    "archetypes.arch_trained.name": "Tu as été formé",
    // B · b91d6e254398
    "archetypes.arch_trained.role": "Technique et le passage",
    // A · 361ab85304ed
    "archetypes.arch_trained.summary": "L’école, puis la cuisine d’un autre, puis quelques années à faire ça proprement. Tu sais faire tout ce qu’on t’a montré et tu n’as rien inventé depuis un moment.",
    // A · 81c460478ae6
    "archetypes.arch_trained.playstyle": ["Précis","Mains rapides","Prudent"],
    // A · 8eb101c08a36
    "archetypes.arch_trained.blurb": "Tu as travaillé sur la ligne d’un autre et tu y as été bon, ce qui est un tout autre métier que celui qui t’attend derrière le passe.",
    // A · 8aac67ca17a2
    "archetypes.arch_home.name": "Tu cuisines chez toi",
    // B · 493158e3d08f
    "archetypes.arch_home.role": "Goût et instinct",
    // A · 9cf104e9b201
    "archetypes.arch_home.summary": "Jamais fait ça professionnellement, pas une seule fois, mais tu sais goûter un plat et deviner ce qu’il lui manque, ce qui est la moitié du boulot et ça ne s’apprend pas.",
    // A · d0854d4d20f3
    "archetypes.arch_home.playstyle": ["Intuitif","Lent","Sous-estimé"],
    // A · fa90d0dd56aa
    "archetypes.arch_home.blurb": "Tout le monde dans cette cuisine croit déjà savoir comment ça tourne, et la première fois que tu répares un problème en goûtant, ils doivent revoir leur copie.",
    // A · 512233a2bf3d
    "archetypes.arch_front.name": "Tu Gères la Salle",
    // B · 52f2b97b853a
    "archetypes.arch_front.role": "Service en salle et relationnel",
    // A · 57cc7b016e7a
    "archetypes.arch_front.summary": "Des années passées en salle derrière le passe. Tu lis une ambiance en quatre secondes, tu sauves une table que personne n’avait vue partir, et tu n’es pas cuisinier — tout le monde le sait.",
    // A · 9d96a99196a0
    "archetypes.arch_front.playstyle": ["Lit les gens","Gère les services","Faible en cuisine"],
    // A · ffa8150cac44
    "archetypes.arch_front.blurb": "Le repas commence avant d’avoir la première assiette, et t’es la seule personne dans ce bâtiment à l’avoir vraiment compris.",
    // A · e00bcdd8d96c
    "archetypes.arch_away.name": "Tu Es Parti",
    // B · 9d0fdcd09b77
    "archetypes.arch_away.role": "Boulot dur et mains calleuses",
    // A · fa8d22d2c05a
    "archetypes.arch_away.summary": "T’es parti faire tout autre chose pendant quelques années, t’es revenu avec des mains qui savent faire et un regard que personne ici n’a, et un sentiment très compliqué pour cet endroit.",
    // A · 4d8c88b333e8
    "archetypes.arch_away.playstyle": ["Endurant","Un œil extérieur","Un peu rouillé"],
    // A · af5488adc7ca
    "archetypes.arch_away.blurb": "La dernière fois que tu as tenu ce poste en cuisine, tu avais dix-neuf ans et c’était le problème de quelqu’un d’autre. Et ici, tout le monde sait très bien dans lequel de ces deux cas tu étais meilleur.",
    // B · 7aa5cedf379c
    "setupFields.displayName.label": "Comment Keiko t’appelle-t-elle ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · 061c07867484
    "setupFields.displayName.placeholder": "ex. Sora",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 3a6240a26696
    "setupFields.pronouns.placeholder": "ex. iel/iel",
    // B · 5744520491e8
    "setupFields.archetype.label": "Que sais-tu vraiment faire en cuisine ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHETYPE",
    // B · 4f2f0628cbce
    "setupFields.archetype.helpText": "Ce que tu faisais avant de revenir, qui détermine ce dans quoi tu es bon et ce que tout le monde sur la ligne suppose de toi. C’est fixé pour toute la partie. Ça ne décide pas si Akari survit, ce que tu cuisines, ni si sauver le resto est la bonne chose.",
    // B · 8da43217b544
    "setupFields.worldKnowsAboutYou.label": "Qu’est-ce qu’Akari cuisine ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · 18f5b2877e15
    "setupFields.worldKnowsAboutYou.helpText": "C’est entièrement à toi et rien dans cette histoire ne le verrouille. Cuisine japonaise maison, franco-japonaise, marocaine, coréenne, fruits de mer, un truc que personne ne connaît. Une ligne.",
    // B · f9ed181d9dfd
    "setupFields.worldKnowsAboutYou.placeholder": "ex. Poisson grillé, plats de riz, braisés et ce qui était bon au marché, plus un plat marocain que ma grand-mère a appris quelque part.",
    // B · 1929845e3948
    "setupFields.why_you_are_back.label": "Pourquoi tu es dans cette cuisine ce soir ?",
    // B · b6a31c665c0b
    "setupFields.why_you_are_back.kind": "CHOIX",
    // B · f625725fabbc
    "setupFields.why_you_are_back.helpText": "Une raison de départ, pas un engagement. Tu peux découvrir en cours de partie que c’était autre chose.",
    // B · 3d11cfede1d1
    "setupFields.why_you_are_back.options.never_left.label": "Tu n’es jamais parti. T’as toujours été là.",
    // B · cecb4a5cd978
    "setupFields.why_you_are_back.options.came_back.label": "Tu es revenu pour quelques semaines et ça fait quatorze mois.",
    // B · 9068262a4825
    "setupFields.why_you_are_back.options.she_asked.label": "Elle a demandé, une fois, maladroitement, et tu as pris un train.",
    // B · 061fcfaba5c0
    "setupFields.why_you_are_back.options.nowhere_else.label": "Il n’y avait nulle part ailleurs et tu l’as pas avoué à personne.",
    // B · f860d3909e4b
    "setupFields.why_you_are_back.options.to_close_it.label": "Tu es revenu pour aider à fermer et tu l’as pas dit.",
    // B · 0657ab86e9df
    "setupFields.appearance.label": "Qu’est-ce que la ligne voit quand tu passes la porte ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · 292c8cfa7490
    "setupFields.appearance.placeholder": "ex. Quelqu’un dans un manteau bien trop classe pour cette cuisine, déjà les manches retroussées.",
    // B · 3aa4328667d6
    "protagonist.kind": "BLANC",
    // A · d57e3ad3407c
    "opening": "La hotte fait un bruit bizarre depuis mardi et ce soir c’est pire.\n\nLa salle est à moitié pleine. Treize couverts, trois au comptoir. La pluie claque en rafales contre la fenêtre et un tram passe au bout de la rue. Keiko tient le poste des plaques depuis 2006, Daichi est au gril et il n’a pas quitté la plancha de la soirée, et l’autre plaque refuse toujours de s’allumer sans un juron.\n\nLa table six a renvoyé le poisson. Pas en colère. Il était trop cuit et ils ont raison.\n\nLe fournisseur a appelé deux fois aujourd’hui. Le devis pour la hotte traîne sur le bureau depuis cinq semaines.\n\nPuis la porte s’ouvre, et quelqu’un entre, trempé de pluie, le rouleau de couteaux sur l’épaule, sans regarder la carte.\n\nDaichi la voit le premier et s’arrête net, ce qu’il ne fait jamais.",
    // A · 949639b518a7
    "openingSuggestions": ["Je prends l’assiette au passe et je la regarde bien. Ça fait trente secondes et je vois exactement où ça a foiré. « Donne-moi quatre minutes et une nouvelle assiette, et Emi — dis-leur que ça arrive et pourquoi. »","Je pose les mains sur le comptoir et je le crie dans la salle. « C’est qui, elle ? » Parce que Daichi s’est arrêté et que Keiko n’a pas tourné la tête, et chacun d’eux est déjà une réponse.","Je sors moi-même devant, en passant devant Emi toujours en tablier, et j’arrive à la table six avant les autres. « C’est ma faute. Ça arrive dans quatre minutes. Vous avez déjà mangé ici ? »"],
  },
});
