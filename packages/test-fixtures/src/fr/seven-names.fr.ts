import { registerWorldText } from '@aniplay/contracts';

/**
 * Seven Names, in French.
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
  storyId: "story_seven_names",
  text: {
    // A · 4c15675c6e59
    "fantasyLabel": "Tu seras pendu à l’aube. Sauf si tu t’en vas maintenant.",
    // A · 10a57b9f6c11
    "hook": "Tu dois être exécuté demain matin pour avoir tué un ministre, et à une heure dix-sept un pavé tombe du mur de ta cellule, laissant passer un vieil homme avec sept noms sur un bout de papier.",
    // A · 8f0d0a2d5aad
    "premise": "Demain matin, tu seras exécuté devant une foule, pour le meurtre d’un ministre lors d’un bal masqué dans une salle vitrée, il y a onze mois.\n\nLes preuves étaient accablantes. Des témoins t’ont vu à ses côtés. Un revolver à ton nom a été retrouvé dans un couloir de service. Des lettres de ta main décrivaient le meurtre des semaines avant qu’il n’ait lieu.\n\nÀ l’hiver, le pays a cessé de débattre pour savoir si tu l’avais fait, et a commencé à discuter si l’exécution devait être publique.\n\nÀ une heure dix-sept ce matin-là, un pavé tombe du mur de ta cellule.\n\nLe vieil homme qui arrive creuse depuis six ans. Il dépose trois choses par terre : une clé, un plan de chemin de fer, et un papier avec sept noms. Chacune de ces personnes a eu un rôle dans ce qui t’est arrivé, et aucune n’a joué le même rôle.\n\nIl te propose ensuite un choix. Passer tes six dernières heures à prouver ton innocence, ou les passer à quitter cette île.\n\nIl ajoute une dernière chose avant que tu répondes. Un nom sur une liste n’est pas la même chose qu’une personne qui mérite de mourir, et ce sont toujours les débutants qui se trompent.",
    // A · d6ae140c33a7
    "mechanicsChips": ["Sept portes, pas sept cibles","Personne ne dit si tu l’as fait","Construis un alias en lequel le pays croit","Un rival qui a déjà de l’avance sur toi","L’archive peut être brûlée sans être lue"],
    // A · 27ebf297bcb6
    "creatorNote": "Rien dans ce monde ne sait si tu l’as tué. Dis que tu as été piégé, dis que c’est toi, dis que tu ne te souviens pas, dis que ce n’est pas la bonne personne — les sept noms sont vrais dans tous les cas, et l’histoire fonctionne depuis où que tu sois. Le quatrième nom est celui d’une médecin qui a signé un faux rapport pour récupérer son fils vivant, et c’est tout l’enjeu de l’histoire.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · dd735f1837ec
    "rules.hardCanon": ["Le ministre Jules Valère a été tué lors d’un bal masqué caritatif à l’Hôtel Beaumont il y a onze mois. Il est mort, c’est un fait.","Le joueur a été condamné, les preuves publiques étaient accablantes, et l’exécution est prévue pour le lendemain matin.","Le fait que le joueur ait vraiment commis le crime N’EST PAS canonique. Il peut être innocent, coupable, complice, incertain, ou quelque chose de plus étrange, et la conspiration s’adapte à ce qu’il dit.","Sept personnes ont eu un rôle dans l’affaire entourant le meurtre. Ce ne sont pas sept méchants égaux et au moins l’un d’eux a été contraint.","Étienne Veyrac, l’allié le plus proche de Valère, a organisé l’assassinat pour empêcher Valère de publier le Registre, puis a vu la crise comme une opportunité pour lui. Les deux parties sont vraies.","Le Registre est une archive distribuée de chantages mutuels entre un petit cercle d’élites. Ce n’est pas un seul livre et personne en vie ne l’a vu en entier.","Marcel Bellac creuse un tunnel depuis six ans et sait ce qu’il y a sur la liste. Il peut mourir à tout moment et l’histoire continue."],
    // A · 11d026c4ffdf
    "rules.toneGuide": "La France de la Belle Époque comme un pays qui travaille plutôt qu’un déguisement : gaz et électricité côte à côte, un tramway, une grève, un hôtel miteux, du vin pas cher, une imprimerie à quatre heures du matin. L’élégance est un outil, pas une ambiance. Personne ne fait de discours sur la vengeance. Le plaisir est dans la manœuvre : une lettre falsifiée, un nom lâché à la bonne table, l’entrée d’un domestique, vingt minutes de conversation pendant qu’on ouvre un coffre en haut. Les sept ont des raisons. Duret a sacrifié un accusé pour protéger une institution qu’il croyait juste. Bellier a signé un mensonge pour récupérer son enfant. Écris-les tous comme s’ils pouvaient être convaincus, car la plupart le peuvent. La violence est rapide, laide et catastrophique juridiquement. Un duel est un événement social qui finit avec un mort. Un homme tué dans la rue à Paris, c’est une préfecture, un magistrat et une photo dans les journaux du soir. Les journaux sont un personnage. Ce que le pays croit du joueur n’est pas ce qui s’est passé, et l’écart ne cesse de grandir.",
    // B · 4585bc1a10b9
    "skills.larceny.name": "Vol",
    // B · 7ce3b6387340
    "skills.larceny.attribute": "agilité",
    // B · f45da3ec2726
    "skills.larceny.description": "Serrures, loquets, fermetures de fenêtres, et les quatre minutes entre le départ et le retour d’un serviteur.",
    // B · 871fed889e20
    "skills.blade.name": "Lame",
    // B · 97081b4b4792
    "skills.blade.attribute": "force",
    // B · f6e98e36c1c7
    "skills.blade.description": "Sabre, épée courte et le couteau que personne n’est censé avoir apporté. Surtout pour faire style.",
    // B · 2a3acf1ca4cb
    "skills.disguise.name": "Déguisement",
    // B · cfb7a15645c3
    "skills.disguise.attribute": "présence",
    // B · 91ef86c57c7f
    "skills.disguise.description": "Un manteau, un accent et une course, portés jusqu’à ce que les gens ne voient plus un visage mais une fonction.",
    // B · 6937738f5d4d
    "skills.society.name": "Société",
    // B · cfb7a15645c3
    "skills.society.attribute": "présence",
    // B · 7174eef21c33
    "skills.society.description": "Savoir qui, parmi les onze personnes à une table, peut faire ruiner quelqu’un d’ici jeudi.",
    // B · e2bd39522cba
    "skills.forgery.name": "Faux",
    // B · a8c1fa8269c3
    "skills.forgery.attribute": "esprit",
    // B · 785b20e40a28
    "skills.forgery.description": "Mains, filigranes, en-têtes, et le poids précis d’un document que personne ne remet en question.",
    // B · 22a6b5ae25eb
    "skills.read_people.name": "Lire les gens",
    // B · a8c1fa8269c3
    "skills.read_people.attribute": "esprit",
    // B · 522a7a2fa961
    "skills.read_people.description": "Ce que quelqu’un protège, ce qui n’est presque jamais ce dont il parle.",
    // B · b3f73706ed78
    "skills.endurance.name": "Endurance",
    // B · 4c84c2c842d0
    "skills.endurance.attribute": "volonté",
    // B · 69292c43b4d4
    "skills.endurance.description": "Eau froide, longues routes, pas de sommeil, et les onze mois qui ont précédé tout ça.",
    // B · 418c09a9d059
    "resources.condition.name": "Condition",
    // B · 34e8ec1ac388
    "resources.condition.polarity": "BON ÉLEVÉ",
    // B · a3ee454a6b68
    "resources.condition.zeroStateConsequence": "Onze mois de cellule d’un coup. Mains peu fiables, vision qui se rétrécit sur les bords, et un corps qui commence à décider ce qu’il fera ou non sans consulter personne.",
    // B · f23947292d7f
    "resources.condition.color": "#8C7B5E",
    // B · fc6018b79ee3
    "resources.heat.name": "Chaleur",
    // B · a34adbda2422
    "resources.heat.polarity": "BON FAIBLE",
    // B · 4db68bb041d4
    "resources.heat.zeroStateConsequence": "Aux yeux de la République, le condamné s’est noyé près du Fort Serein en mars. Il y a un dossier barré. Trains, hôtels et frontières ne sont que des choses qui arrivent aux autres.",
    // B · 2a79c2d9c2a1
    "resources.heat.color": "#B4453B",
    // B · 0e2d0e1dbc06
    "resources.notoriety.name": "Notoriété",
    // B · a34adbda2422
    "resources.notoriety.polarity": "BON FAIBLE",
    // B · 82ca7903aab5
    "resources.notoriety.zeroStateConsequence": "Personne n’a entendu parler du pseudonyme, ce qui veut dire que personne n’ouvre de porte pour lui et personne n’en ferme non plus. Chaque pièce doit être franchie grâce à ce que le joueur porte ce soir-là.",
    // B · 004a85ab4d55
    "resources.notoriety.color": "#4E6C8C",
    // A · 62f371522a15
    "items.the_list.name": "Le Papier",
    // B · 061625d9bd60
    "items.the_list.tags": ["quête","document"],
    // B · 123b79a85f0c
    "items.the_list.description": "Une feuille déchirée avec sept noms écrits de la main d’un faussaire, et à côté de chacun un seul mot : argent, presse, police, médecine, armée, navires, et — à côté du septième — rien du tout.",
    // B · fcd7c5f10f59
    "items.the_list.loreText": "La septième ligne a été écrite, rayée et réécrite trois fois. La version finale est le même nom que la première.",
    // B · 8143e9e47c18
    "items.the_list.icon": "papers",
    // A · c27edaa729c4
    "items.railway_map.name": "Le Plan de chemin de fer",
    // B · e72573287188
    "items.railway_map.tags": ["document"],
    // B · 06c2d27a2c0b
    "items.railway_map.description": "Une carte pliée du réseau PLM d’il y a quatre ans, blanche et usée sur les plis, avec six gares entourées et une septième barrée assez fort pour la déchirer.",
    // B · 2e4c470f7f46
    "items.railway_map.loreText": "La gare barrée est celle où il a été arrêté en 1903. Il n’a jamais expliqué les six autres et rien ne prouve qu’elles soient toutes utiles.",
    // B · 33dffa18ca3f
    "items.railway_map.icon": "carte",
    // A · bc2a767705c4
    "items.iron_key.name": "La Clé en fer",
    // B · 2a960689f970
    "items.iron_key.tags": ["quête","accès"],
    // B · 29c8be4b3b8c
    "items.iron_key.description": "Façonnée à la lime à partir d’une cuillère et d’une charnière sur plusieurs mois, elle ouvre la porte côté mer d’une forteresse qui n’a jamais laissé s’échapper un prisonnier.",
    // B · 42e7dae352eb
    "items.iron_key.loreText": "Elle ne fonctionne qu’une fois. La serrure est une serrure à goupille, la clé est en fer doux, et la seconde utilisation laissera la plupart de la clé dans le mécanisme.",
    // B · c0c1baf2fa65
    "items.iron_key.icon": "clé",
    // A · 2ddfe9ab87c1
    "items.gala_photograph.name": "La photo qu’elle n’a jamais imprimée",
    // B · f88c6548fc3b
    "items.gala_photograph.tags": ["quête","preuve"],
    // B · f59a176139a5
    "items.gala_photograph.description": "Une plaque du gala, prise à quatre minutes après minuit, montrant une silhouette entrant dans le passage de service dix minutes après que le joueur est censé avoir quitté le bâtiment.",
    // B · c57084997c0b
    "items.gala_photograph.loreText": "Ce n’est pas concluant et ça ne le sera jamais. C’est suffisant pour qu’un magistrat pose une question, et c’est tout ce dont quelqu’un dans cette histoire a jamais eu besoin.",
    // B · 86e9d1163dba
    "items.gala_photograph.icon": "photographie",
    // A · f7231e414a7a
    "items.bellier_report.name": "Le deuxième rapport",
    // B · f88c6548fc3b
    "items.bellier_report.tags": ["quête","preuve"],
    // B · f95b94ae9e90
    "items.bellier_report.description": "La chronologie médico-légale telle qu’elle a été écrite en premier, avant la version signée, avec un horaire de décès différent de près de deux heures.",
    // B · 61a6f983545c
    "items.bellier_report.loreText": "Elle l’a gardée. Six ans à garder un document qui aurait pu la détruire, dans une maison avec son fils, parce que le jeter aurait signifié prendre une décision.",
    // B · 8143e9e47c18
    "items.bellier_report.icon": "papiers",
    // A · e52296e70177
    "items.lorcq_ledger.name": "Les archives personnelles du général",
    // B · f88c6548fc3b
    "items.lorcq_ledger.tags": ["quête","preuve"],
    // B · f304073c1cff
    "items.lorcq_ledger.description": "Un étui en cuir de doubles que le cinquième nom a gardé parce qu’il ne faisait jamais confiance aux six autres. C’est le Registre vu de l’intérieur, par quelqu’un qui prend des notes sur ses complices.",
    // B · 26826144c156
    "items.lorcq_ledger.loreText": "Il y a une page à propos de Veyrac datée de trois semaines avant le gala, et c’est le seul document en France qui le place dans une pièce où il a toujours nié être.",
    // B · 909ac0144b71
    "items.lorcq_ledger.icon": "étui",
    // A · 731883438f01
    "items.evening_suit.name": "Un costume à la bonne taille",
    // B · 03346470fe37
    "items.evening_suit.tags": ["vêtements"],
    // B · bfd4d039e9f8
    "items.evening_suit.equipSlot": "corps",
    // B · 8658537ddce5
    "items.evening_suit.description": "Bien taillé, porté une fois, acquis par un moyen que personne impliqué n’écrira. Dans la bonne pièce, ça vaut plus qu’un revolver et ça marche sur plus de monde.",
    // B · 14dff23c74be
    "items.evening_suit.loreText": "L’étiquette du tailleur a été décousue. Quiconque cherche une étiquette et trouve la couture où elle était apprend quelque chose sur vous.",
    // B · 2c3f9da60ba7
    "items.evening_suit.icon": "manteau",
    // A · c83a2a78316f
    "items.forger_kit.name": "Le rouleau de Marcel",
    // B · f3a60c587a13
    "items.forger_kit.tags": ["outil"],
    // B · eb1554e1a517
    "items.forger_kit.description": "Toile, attachée avec une ficelle : quatre plumes, trois encres, un morceau de gomme arabique, un rasoir, et onze feuilles blanches volées dans onze ministères différents.",
    // B · 86af724dbba4
    "items.forger_kit.loreText": "Les papiers ministériels sont la partie précieuse. N’importe qui peut écrire une lettre ; presque personne ne peut l’écrire sur le bon papier.",
    // B · 2481b668bc32
    "items.forger_kit.icon": "rouleau",
    // A · aae406ac33ec
    "items.bread_and_wine.name": "Du pain, une saucisse, une bouteille",
    // B · 32830ea136a7
    "items.bread_and_wine.tags": ["nourriture"],
    // B · 26261d45732f
    "items.bread_and_wine.description": "Achetés à un stand sur un quai à six heures du matin par quelqu’un qui n’a pas mangé quoi que ce soit avec du sel depuis onze mois.",
    // B · 8373d3cb5104
    "items.bread_and_wine.loreText": "Ça coûte quarante centimes et c’est, de loin, la meilleure chose qui soit arrivée au joueur cette année.",
    // B · 010de3fa8c73
    "items.bread_and_wine.icon": "pain",
    // A · 822f192f57e7
    "abilities.read_the_room.name": "Lire la pièce",
    // B · 58f69744c481
    "abilities.read_the_room.tags": ["vue"],
    // B · 451d03ebefd0
    "abilities.read_the_room.description": "Déterminer lequel des onze personnes à cette table peut faire ruiner quelqu’un d’ici jeudi, et ce que chacun protège vraiment.",
    // B · 39d896e20aec
    "abilities.read_the_room.targetRule": "SINGLE",
    // B · a8c1fa8269c3
    "abilities.read_the_room.check.attribute": "esprit",
    // A · 727da4e94658
    "abilities.go_in_through_a_window.name": "Entrer par la fenêtre",
    // B · 2e74bfc33328
    "abilities.go_in_through_a_window.tags": ["mouvement"],
    // B · 0752ae6df8fa
    "abilities.go_in_through_a_window.description": "Une gouttière, un loquet, quatre minutes entre le départ et le retour d’un domestique, et tout ça sans réveiller la maison.",
    // B · c44e6dd70059
    "abilities.go_in_through_a_window.targetRule": "NONE",
    // B · 7ce3b6387340
    "abilities.go_in_through_a_window.check.attribute": "agilité",
    // A · a73707fa2351
    "abilities.be_somebody_else.name": "Se faire passer pour quelqu’un d’autre",
    // B · 09b907576d49
    "abilities.be_somebody_else.tags": ["social"],
    // B · e74b41e14bc5
    "abilities.be_somebody_else.description": "Un manteau, un accent et une course, tenus assez longtemps pour que les gens arrêtent de voir un visage et commencent à voir une fonction qu’ils n’ont aucune raison d’interrompre.",
    // B · 43afef8b429c
    "abilities.be_somebody_else.targetRule": "SOI",
    // B · cfb7a15645c3
    "abilities.be_somebody_else.check.attribute": "présence",
    // A · 2a853ca769f9
    "abilities.write_it_convincingly.name": "Écrire de façon convaincante",
    // B · 5251d369d3b6
    "abilities.write_it_convincingly.tags": ["utilitaire"],
    // B · ddfafd92b027
    "abilities.write_it_convincingly.description": "La bonne main, la bonne encre et le bon papier, ce que tout le monde oublie et la seule chose que quelqu’un vérifie.",
    // B · c44e6dd70059
    "abilities.write_it_convincingly.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.write_it_convincingly.check.attribute": "esprit",
    // A · db5520ecb370
    "abilities.work_the_table.name": "Jouer la table",
    // B · 09b907576d49
    "abilities.work_the_table.tags": ["social"],
    // B · 436293aa5ff4
    "abilities.work_the_table.description": "Vingt minutes à être un compagnon exceptionnel, ciblées sur une personne précise, pour une phrase précise que vous avez besoin qu’elle dise devant témoins.",
    // B · 39d896e20aec
    "abilities.work_the_table.targetRule": "UN",
    // B · cfb7a15645c3
    "abilities.work_the_table.check.attribute": "présence",
    // A · 99b35a7330b2
    "abilities.put_it_to_them_straight.name": "Aller droit au but",
    // B · 09b907576d49
    "abilities.put_it_to_them_straight.tags": ["social"],
    // B · b9efc2ec35a0
    "abilities.put_it_to_them_straight.description": "Dis ce que tu sais, en face, sans levier ni menace, et découvre ce que quelqu’un fait quand on lui donne la possibilité de choisir.",
    // B · 39d896e20aec
    "abilities.put_it_to_them_straight.targetRule": "UN",
    // B · 4c84c2c842d0
    "abilities.put_it_to_them_straight.check.attribute": "volonté",
    // A · ea8fd11d7450
    "abilities.draw_on_them.name": "Jouer sur eux",
    // B · 05f59299d740
    "abilities.draw_on_them.tags": ["offensif"],
    // B · b2e0c0df95aa
    "abilities.draw_on_them.description": "Sabre, épée courte ou le couteau que personne ne sait que tu as apporté. Dans ce pays, dans cette décennie, ça règle le problème immédiat et crée un problème bien plus gros dans l’heure qui suit.",
    // B · 39d896e20aec
    "abilities.draw_on_them.targetRule": "UN",
    // B · 97081b4b4792
    "abilities.draw_on_them.check.attribute": "puissance",
    // A · 6d274a39643f
    "abilities.let_them_know_who_did_it.name": "Montrer qui c’est",
    // B · 09b907576d49
    "abilities.let_them_know_who_did_it.tags": ["social"],
    // B · 053683b44f3f
    "abilities.let_them_know_who_did_it.description": "Laisse la carte de visite, fais voir le manteau au domestique, donne aux papiers le détail dont ils ont besoin. Rien ne vaut un nom que les gens craignent, et rien ne coûte plus cher.",
    // B · c44e6dd70059
    "abilities.let_them_know_who_did_it.targetRule": "AUCUN",
    // A · d166a5ea5962
    "abilities.go_to_ground.name": "Se faire discret",
    // B · 5251d369d3b6
    "abilities.go_to_ground.tags": ["utilitaire"],
    // B · 23f012b87fc5
    "abilities.go_to_ground.description": "Une chambre au-dessus d’une buanderie, un faux nom que personne n’a entendu, et trois jours à ne rien faire du tout pendant que la description dans les préfectures devient obsolète.",
    // B · 43afef8b429c
    "abilities.go_to_ground.targetRule": "SOI",
    // A · 351c158b9ea2
    "abilities.open_the_registry.name": "Ouvrir le registre",
    // B · 5251d369d3b6
    "abilities.open_the_registry.tags": ["utilitaire"],
    // B · 20eb0dbc25eb
    "abilities.open_the_registry.description": "Entrer dans une partie des archives et les lire, ce qui est un acte différent de les voler et bien pire si on se fait prendre.",
    // B · c44e6dd70059
    "abilities.open_the_registry.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.open_the_registry.check.attribute": "esprit",
    // B · 180006143420
    "abilities.open_the_registry.requires.flagsSet": ["sait :où_est_le_registre"],
    // B · 22e2ec483249
    "abilities.open_the_registry.requires.lockedCopy": "Ce n’est pas un livre et ce n’est pas dans un bâtiment. Six personnes connaissent des morceaux de son emplacement et aucune ne l’a jamais écrit.",
    // A · 2536718892cd
    "locations.serein_cell.name": "La cellule",
    // A · 3c2ebdd4ed3d
    "locations.serein_cell.shortName": "Cellule",
    // B · 71a6f9f92521
    "locations.serein_cell.description": "Quatre pas sur trois, un lit, un seau, et une fenêtre trop étroite pour passer une épaule. Onze mois de marques sur le mur près de la porte, et ce soir un trou au niveau du sol avec de la poussière de pierre qui en sort et une main qui passe.",
    // B · c6a8334b3f19
    "locations.serein_cell.stageImage": "story_seven_names/stage_serein_cell",
    // A · b0a3ebd154aa
    "locations.serein_tunnel.name": "Le tunnel",
    // A · 923341d6ab1a
    "locations.serein_tunnel.shortName": "Tunnel",
    // B · 707589becfc3
    "locations.serein_tunnel.description": "Six ans de travail : un rampement à travers remblais et gravats, étayé avec des lattes de lit, passant sous deux couloirs et sortant par l’ancienne citerne vers le mur côté mer. C’est humide, ce n’est pas droit, et à trois endroits un homme doit passer à l’épaule.",
    // B · 7e88b656459f
    "locations.serein_tunnel.stageImage": "story_seven_names/stage_serein_tunnel",
    // A · c01b4df6b5ea
    "locations.the_seaward_wall.name": "Le Mur sur la Mer",
    // A · 0b61c7908d20
    "locations.the_seaward_wall.shortName": "Le Mur",
    // B · 70f35b0484c0
    "locations.the_seaward_wall.description": "Le bas de la forteresse où la roche rencontre l’eau noire, une porte qui n’a pas été ouverte depuis les années 80, et onze kilomètres de Méditerranée entre ici et une côte éclairée.",
    // B · d8dac6653633
    "locations.the_seaward_wall.stageImage": "story_seven_names/stage_the_seaward_wall",
    // A · 3f6c57ee4ab2
    "locations.marseille_docks.name": "Les Docks de Marseille",
    // A · 98ba23d44f0d
    "locations.marseille_docks.shortName": "Les Docks",
    // B · d4d7a243049b
    "locations.marseille_docks.description": "Quarante quais de charbon, vin, savon et gens, une douane qui fonctionne sur l’honneur et beaucoup d’argent, et onze langues criées avant six heures du matin. Personne ici n’a jamais demandé de papiers de sa propre initiative.",
    // B · 1dff99a5dbe6
    "locations.marseille_docks.stageImage": "story_seven_names/stage_marseille_docks",
    // A · fc00012bb043
    "locations.marseille_room.name": "La Chambre au-dessus de la Buanderie",
    // A · c487f27a920c
    "locations.marseille_room.shortName": "La Chambre",
    // B · 049b144225ea
    "locations.marseille_room.description": "Un franc cinquante la nuit, pas de registre, une fenêtre donnant sur une cour avec quatre sorties, et de la vapeur qui remonte du sol à toute heure depuis la blanchisserie en dessous. La femme qui tient l’endroit n’a jamais regardé personne deux fois.",
    // B · 3647ef470d7a
    "locations.marseille_room.stageImage": "story_seven_names/stage_marseille_room",
    // A · f1d884072499
    "locations.saint_charles.name": "Gare Saint-Charles",
    // A · fe3f73c2f472
    "locations.saint_charles.shortName": "La Gare",
    // B · e00ba799cd8f
    "locations.saint_charles.description": "Une grande verrière au sommet d’un escalier, avec l’express pour Paris à quai trois onze heures par jour, et deux hommes en manteaux civils à la barrière qui ne sont pas cheminots et ne le cachent pas.",
    // B · baed73a70111
    "locations.saint_charles.stageImage": "story_seven_names/stage_saint_charles",
    // A · c0a59757ab50
    "locations.the_express.name": "L’Express Parisien",
    // A · 2a60e80f4faf
    "locations.the_express.shortName": "Le Train",
    // B · 5109d72de802
    "locations.the_express.description": "Quatorze heures, trois classes, un wagon-restaurant et un couloir que tout le monde dans ce train empruntera au moins deux fois. Il y a environ neuf personnes à connaître à bord, et au moins une d’elles vous cherche.",
    // B · 209a21df99a4
    "locations.the_express.stageImage": "story_seven_names/stage_the_express",
    // A · 4cad9667f81a
    "locations.paris_hotel.name": "Hôtel Beaumont",
    // A · c7cae737912c
    "locations.paris_hotel.shortName": "Beaumont",
    // B · 38fd40cbf2bd
    "locations.paris_hotel.description": "Là où ça s’est passé. Un plafond de verre sur une salle qui peut contenir quatre cents personnes, un passage de service que le public n’a jamais vu, et une direction qui a passé onze mois à affirmer que l’incident n’avait rien à voir avec les lieux.",
    // B · 2d5cba8513d3
    "locations.paris_hotel.stageImage": "story_seven_names/stage_paris_hotel",
    // A · 4f1480220ed9
    "locations.the_boulevards.name": "Les Boulevards",
    // A · 86f82aea4fec
    "locations.the_boulevards.shortName": "Boulevards",
    // B · 278ee2b5a6c2
    "locations.the_boulevards.description": "Cafés, kiosques, un tramway, six journaux du soir en vente dès seize heures et beaucoup de gens qui les lisent tous. Tout ce qui se décide dans cette ville se décide quelque part hors de ces rues, puis s’y discute.",
    // B · d290cacb63d6
    "locations.the_boulevards.stageImage": "story_seven_names/stage_the_boulevards",
    // A · f39d19e376ef
    "locations.service_passage.name": "Le passage de service",
    // A · b927070faa22
    "locations.service_passage.shortName": "Passage",
    // B · 7e90b20dd067
    "locations.service_passage.description": "Onze mètres de couloir non éclairé entre les cuisines et les vestiaires, avec une porte à chaque bout et un virage au milieu. Un revolver a été trouvé ici. L’accusation n’a jamais établi comment on y est entré sans traverser la salle.",
    // B · c0ba8a57121e
    "locations.service_passage.stageImage": "story_seven_names/stage_service_passage",
    // A · 7dc47ddbdff5
    "locations.le_matin_offices.name": "Le Matin Français",
    // A · 33c3300e3ca0
    "locations.le_matin_offices.shortName": "Le Matin",
    // B · f420016ae394
    "locations.le_matin_offices.description": "Six étages dans un bâtiment qui décide ce que quatre cent mille personnes pensent avant le petit déjeuner. Les presses sont au sous-sol et tournent dès vingt-trois heures, l’étage de la rédaction ne se vide jamais, et il y a une pièce verrouillée au cinquième avec des photos jamais publiées.",
    // B · 6d9da88cc5d0
    "locations.le_matin_offices.stageImage": "story_seven_names/stage_le_matin_offices",
    // A · 63e3d8466265
    "locations.varenne_house.name": "La maison Varenne",
    // A · cf4fffbb32b8
    "locations.varenne_house.shortName": "Varenne",
    // B · 665792113de8
    "locations.varenne_house.description": "Un hôtel particulier dans le huitième avec une cour, onze domestiques et un bureau au premier étage qui a un coffre-fort, une carte ferroviaire au mur et une fille qui n’est jamais là où on croit qu’elle est le soir.",
    // B · e7d827509615
    "locations.varenne_house.stageImage": "story_seven_names/stage_varenne_house",
    // A · c71bed58329b
    "locations.the_opera.name": "L’Opéra",
    // A · 55746e1d6dfb
    "locations.the_opera.shortName": "Opéra",
    // B · d4275a9b166e
    "locations.the_opera.description": "Là où tout le monde qui compte est visible trois heures le même soir, dans des loges, à des hauteurs connues, dans un bâtiment avec plus de couloirs derrière les loges qu’en face. La moitié des affaires du pays se fait pendant l’entracte.",
    // B · 5ba41c19f0f6
    "locations.the_opera.stageImage": "story_seven_names/stage_the_opera",
    // A · d414e2a0066c
    "locations.prefecture.name": "La Préfecture",
    // A · 0bf3f78a8b56
    "locations.prefecture.shortName": "Préfecture",
    // B · af421a86ee97
    "locations.prefecture.description": "Tout l’appareil dans un seul bâtiment : archives, magistrats, les dossiers Valère dans onze boîtes, et un inspecteur au troisième étage qui n’a jamais validé une noyade qu’il ne croit pas.",
    // B · d0db1c6954ef
    "locations.prefecture.stageImage": "story_seven_names/stage_prefecture",
    // A · 6db66156db4f
    "locations.bellier_surgery.name": "Le Cabinet Bellier",
    // A · f37f1cbaf9bc
    "locations.bellier_surgery.shortName": "Cabinet",
    // B · 23ef385bfb04
    "locations.bellier_surgery.description": "Deux pièces au-dessus d’une pharmacie au sud de la rivière, un banc d’attente, et un médecin qui prend des patients sans payer le mardi. Il y a un tiroir verrouillé dans le cabinet depuis six ans.",
    // B · e64cf98702c4
    "locations.bellier_surgery.stageImage": "story_seven_names/stage_bellier_surgery",
    // A · 41b6ba802c68
    "locations.veyrac_rooms.name": "La rue de Grenelle",
    // A · 30fc7e135bba
    "locations.veyrac_rooms.shortName": "Grenelle",
    // B · 76aa9fab7e5e
    "locations.veyrac_rooms.description": "Pas une maison — un ensemble de pièces où un homme en pleine ascension travaille dix-huit heures par jour avec quatre secrétaires et pas de femme. Une coalition se construit ici, minute après minute, avec des faveurs, et ce sera un gouvernement dans un an.",
    // B · 01543b132109
    "locations.veyrac_rooms.stageImage": "story_seven_names/stage_veyrac_rooms",
    // A · 8cb9ebb21337
    "locations.the_vault.name": "La Chambre forte",
    // A · e4d35e62e04c
    "locations.the_vault.shortName": "Chambre forte",
    // B · 7608037a9d32
    "locations.the_vault.description": "Ni coffre, ni un seul endroit : trois pièces dans trois bâtiments, dont un est la chambre forte d’un avocat, un autre un couvent, et un dernier un sous-sol de banque avec quatre détenteurs de clés sans registre de qui ils sont.",
    // B · bc1d68205809
    "locations.the_vault.stageImage": "story_seven_names/stage_the_vault",
    // B · 717903e675e0
    "characters.celeste.name": "Céleste Varenne",
    // A · eb3640fd5a38
    "characters.celeste.role": "Vingt-quatre ans, fille d’un financier, et — trois nuits par semaine sous un autre nom — la meilleure cambrioleuse de Paris",
    // A · 6e94c86daf58
    "characters.celeste.cardBlurb": "Elle enquête déjà sur le Registre, elle est en avance sur toi, et son père est le premier nom de ta liste. Elle restera parfaitement polie sur ces trois faits, et tu ne sauras pas avant longtemps lequel la dérangeait vraiment.",
    // B · aee35f364a88
    "characters.celeste.pronouns": "elle",
    // A · 29e73a2f7a11
    "characters.celeste.publicTraits": ["Impeccable au point d’en faire une arme","S’ennuie à voix haute aux pires moments","S’intéresse à la politique plus que ce que plusieurs peuvent supporter"],
    // B · aa2f88c66aee
    "characters.celeste.hiddenDrives": ["Elle veut découvrir ce que son père a fait avant que quelqu’un d’autre ne le découvre et ne le monnaye","Elle a commencé à préférer les nuits qu’elle passe sous une autre identité, et sait que ce n’est plus un simple passe-temps"],
    // B · dfdc85f0f1eb
    "characters.celeste.values": ["Faire quelque chose de difficile avec élégance, ce qu’elle considère comme une position morale et peut défendre longuement","Ne jamais trahir personne. Elle vole constamment des gens et n’a jamais échangé une personne"],
    // B · 6fcac3b57cf2
    "characters.celeste.fears": ["Que son père ne soit pas victime de chantage mais fasse partie de ceux qui le pratiquent","Finir comme une femme dans une boîte à l’opéra, montrée aux visiteurs"],
    // A · 6973ca2d8098
    "characters.celeste.socialStyle": "Elle arrive en sachant déjà trois choses sur toi. Elle te complimente mais c’est aussi une façon de te jauger. Elle maîtrise parfaitement le silence et le réserve à ceux qui ont l’habitude de répondre.",
    // B · e7e96bc4a47b
    "characters.celeste.boundaries": ["Ne sera l’accomplice de personne sans connaître tout le plan, et quitte une pièce en plein milieu d’une phrase si c’est le cas","Ne tolère pas qu’on parle de son père comme d’une cible devant elle par quelqu’un qui ne l’a pas mérité"],
    // B · dfb8ca66d442
    "characters.celeste.goals": ["Obtenir les preuves concernant son père avant que ceux qui les détiennent ne décident quoi en faire","Découvrir ce qu’est réellement le Registre, ce que personne chez qui elle a volé n’a pu lui expliquer"],
    // B · ad1c2430e196
    "characters.celeste.secrets.celeste_nocturne.fact": "Elle est Nocturne. Onze cambriolages en trois ans, tous pour des lettres et des livres de comptes, les bijoux volés uniquement pour donner à la police un mobile qu’elle comprend.",
    // B · 47558a04be8d
    "characters.celeste.secrets.celeste_nocturne.visibility": "NPC_PRIVATE",
    // B · 509aea6ab55d
    "characters.celeste.secrets.celeste_nocturne.revealHint": "Elle vous laisse la surprendre en flagrant délit plutôt que de vous le dire, et n’est absolument pas gênée par cette prise.",
    // B · 9972e82383e8
    "characters.celeste.secrets.celeste_the_debt.fact": "Son père verse onze mille francs par trimestre à quelqu’un depuis avant le gala. Elle a trouvé les écritures, pas le bénéficiaire, et ne l’a pas confronté.",
    // B · 47558a04be8d
    "characters.celeste.secrets.celeste_the_debt.visibility": "NPC_PRIVATE",
    // B · 3bc19e5732f4
    "characters.celeste.secrets.celeste_the_debt.revealHint": "Elle dit le montant à voix haute à quelqu’un qui vient de lui montrer un document sur sa propre famille plutôt que sur la sienne.",
    // A · d1b6b0207bd7
    "characters.celeste.speechStyle": "Précise, froide et légèrement amusée, avec le vocabulaire de quelqu’un qui fixe les prix. Elle évalue les gens et les situations en fonction de ce qu’ils coûtent et de ce qu’ils valent, deux chiffres très différents. Elle ne hausse jamais la voix ni ne se répète, et prend la répétition comme une insulte.",
    // A · e30e072393ae
    "characters.celeste.topics": ["son père","Nocturne","le Registre","l’opéra","la valeur d’une chose","les onze mille francs"],
    // A · 0792466dd1f0
    "characters.celeste.voiceSamples": ["Tu as environ neuf minutes de retard et tu es monté par l’escalier principal, ce qui prouve que tu n’as jamais fait ça et que tu aimerais que je le croie.","Onze mille par trimestre, depuis mars avant le gala. Ce n’est pas un pot-de-vin. Un pot-de-vin, c’est une fois. Ça, c’est un abonnement.","Je m’en fous que tu veuilles quelque chose. Tout le monde dans cette pièce voulait quelque chose. Ce qui me dérange, c’est d’être manipulée par quelqu’un de moins doué que ceux à qui je fais ça.","C’est un beau coffre. Celui qui l’a choisi ne connaît rien aux coffres-forts mais sait très bien qu’il faut en avoir un."],
    // B · b8065cb83f29
    "characters.celeste.appearance": "Vingt-quatre ans, cheveux châtain foncé en un carré doux ou relevés pour la soirée, yeux gris-bleu, silhouette élégante, et vêtements toujours ajustés au centime près selon la vie qu’elle mène à l’instant.",
    // B · 846fd33ee7ec
    "characters.celeste.visualHook": "Une paire de gants fins et sombres qu’elle garde en intérieur et ne retire que pour manipuler du papier.",
    // B · 98fdb75b9e0b
    "characters.celeste.silhouette": "Parfaitement immobile, le poids du corps sur une hanche, tenant quelque chose de petit à hauteur des yeux.",
    // B · 39e5ebefe721
    "characters.celeste.artSeed": "sn-celeste-01",
    // B · 899cd25e2433
    "characters.celeste.portrait": "story_seven_names/celeste",
    // B · e3326174f5ac
    "characters.celeste.expressions": ["neutre","amusée","évaluatrice","froide","sans défense"],
    // B · b8d119d336f7
    "characters.celeste.knowledgeScope": ["celeste","varenne","nocturne","le_registre","la_societe","l_opera"],
    // B · 364f37a7afa8
    "characters.celeste.gates.celeste_admits_nocturne.label": "Elle arrête de faire semblant à propos des nuits",
    // B · 55a54e80451a
    "characters.celeste.gates.celeste_admits_nocturne.kind": "CONFIANCE",
    // B · 803885305562
    "characters.celeste.gates.celeste_works_with_you.label": "Elle prépare un coup avec toi au lieu de faire sans toi",
    // B · 9e8ae18bf8bf
    "characters.celeste.gates.celeste_works_with_you.kind": "ALLIANCE",
    // B · df607bf18078
    "characters.celeste.gates.celeste_closer.label": "Aucun ne parle d’un arrangement de travail",
    // B · 0b75bc536447
    "characters.celeste.gates.celeste_closer.kind": "ROMANCE",
    // B · 18c093dabcd5
    "characters.celeste.scouting.revealCopy": "Elle est dans le fauteuil quand tu passes par la fenêtre. « Tu prends toujours le côté cour, » dit-elle sans lever le nez du livre. « Toujours. C’est la seule chose sans imagination chez toi. »",
    // B · 4eba27d7a187
    "characters.celeste.combatant.tags": ["voleur"],
    // B · 0e7ce4329d12
    "characters.veyrac.name": "Étienne Veyrac",
    // A · 3054bdbdcb20
    "characters.veyrac.role": "Quarante et un ans, ami proche du ministre assassiné, auteur de l’éloge funèbre, et celui qui a organisé le meurtre",
    // A · 8b50784b08a9
    "characters.veyrac.cardBlurb": "Le pays l’admire d’avoir mis la vérité avant l’amitié lors de ton procès. Il l’a fait pour empêcher la publication qu’il croyait capable de ruiner la République, puis il a vu que la crise pouvait lui ouvrir des portes, et c’est cette seconde décision qui le définit.",
    // B · fcca6b746d0b
    "characters.veyrac.pronouns": "il/lui",
    // A · 89c64d7f38d6
    "characters.veyrac.publicTraits": ["Parle en public comme s’il s’adressait à une seule personne","Se souvient des enfants du secrétaire de circonscription par leur prénom","Travaille dix-huit heures par jour et ça se voit, volontairement"],
    // B · 8dcb8a3b39ef
    "characters.veyrac.hiddenDrives": ["Il doit être l’homme qui a sauvé le pays de lui-même, et ne peut pas envisager une version où il n’était que ambitieux","Il a commencé à vouloir que le joueur soit capturé vivant plutôt que tué, parce qu’une confession boucle l’histoire et un cadavre la laisse ouverte"],
    // B · a447a2b68732
    "characters.veyrac.values": ["La République comme institution, sincèrement, ce qui le rend dangereux plutôt que simplement corrompu","La proportion. Il n’a jamais fait une violence qu’il ne pouvait pas justifier comme le moindre des deux maux"],
    // B · 479c23c31d4e
    "characters.veyrac.fears": ["La publication du Registre, qu’il croit encore capable d’effondrer les tribunaux, les banques, puis les familles dans cet ordre","Que quelqu’un prouve que sa seconde raison existait vraiment"],
    // A · 418603284b19
    "characters.veyrac.socialStyle": "Imposant, toujours là. Il consacre toute son attention à celui qui parle, même s’il est ennemi, même dans un couloir. Il concède volontiers et souvent, sauf sur l’essentiel.",
    // B · 380bbe2e3d87
    "characters.veyrac.boundaries": ["Il refuse qu’on parle mal de Valère en sa présence, et ce n’est pas un acte","Il refuse d’ordonner un meurtre qu’il n’a pas personnellement décidé être arithmétiquement moindre que l’alternative"],
    // B · 0417ca1d7ae9
    "characters.veyrac.goals": ["Gérer l’affaire jusqu’à la session d’automne et être au gouvernement au printemps","Faire venir le joueur vivant, en public, et finir l’histoire avec une signature dessus"],
    // B · 998c05c22d5a
    "characters.veyrac.secrets.veyrac_the_room.fact": "Il était dans une pièce de la rue Cambon trois semaines avant le gala avec Lorcq et Maurel, et le cinquième nom l’a noté parce qu’il ne faisait confiance à personne.",
    // B · 47558a04be8d
    "characters.veyrac.secrets.veyrac_the_room.visibility": "NPC_PRIVATE",
    // B · bddb60cdfd9f
    "characters.veyrac.secrets.veyrac_the_room.revealHint": "Il ne le révèle pas. Un soldat qui tenait ses propres archives l’a fait, il y a six ans, dans un registre au sous-sol d’une banque.",
    // B · a5e818df623b
    "characters.veyrac.secrets.veyrac_the_second_reason.fact": "Il a décidé que Valère était plus dangereux que la corruption. Puis, séparément et plus tard, il a compris ce que la crise lui apporterait. Il n’a jamais dit la seconde moitié à voix haute à qui que ce soit.",
    // B · 47558a04be8d
    "characters.veyrac.secrets.veyrac_the_second_reason.visibility": "NPC_PRIVATE",
    // B · 49e1af8562d9
    "characters.veyrac.secrets.veyrac_the_second_reason.revealHint": "Il est presque sur le point de le dire à quelqu’un qui lui a offert une sortie sans ambition, puis s’arrête, et ce silence est la révélation.",
    // A · 085fa5ce8d4c
    "characters.veyrac.speechStyle": "Le rythme de quelqu’un qui parle en public pour gagner sa vie, mais ici c’est en privé, à une personne à la fois. Il présente tout comme un calcul regrettable fait pour des gens qui ne sauront jamais qu’il a eu lieu. Il dit « nous » pour le pays et « je » pour les décisions. Jamais il ne sonne comme un méchant.",
    // A · 5838367cad72
    "characters.veyrac.topics": ["Valère","le Registre","la partie","ce qu’il a fait au procès","l’amnistie","ce que coûterait la publication"],
    // A · 1c2e19a8a86b
    "characters.veyrac.voiceSamples": ["Je l’aimais. Je veux que ça figure dans vos comptes, parce que tout ce que je vais dire va ressembler à un homme qui s’excuse, et ce n’est pas ça.","Si vous publiez, vous avez quatre cents familles ruinées, onze banques qui s’effondrent, et une affaire judiciaire contre tout l’état-major. J’ai compté. Je recompte chaque semaine depuis deux ans.","Ce mois-ci, on vous proposera une amnistie. Pas de moi. Prenez-la, parce que l’alternative, c’est une version où on me demande quoi faire de vous, et j’aimerais mieux qu’on ne me demande pas.","On ne peut pas redevenir propre. On peut juste devenir plus petits. J’ai choisi le plus petit nombre, je n’ai jamais eu de cauchemars, et je voudrais que vous trouviez ça aussi effrayant que moi."],
    // B · 5157305422c5
    "characters.veyrac.appearance": "Quarante-et-un ans, cheveux bruns grisonnants sur le devant, costumes sombres sans fioritures, le visage d’un homme qui travaille et est photographié en train de travailler, et des mains qui n’ont jamais fait que écrire.",
    // B · fcd81bbc04ee
    "characters.veyrac.visualHook": "Un brassard de deuil noir encore porté à la manche gauche onze mois après, que les journaux mentionnent à chaque fois.",
    // B · a942437fa26b
    "characters.veyrac.silhouette": "Debout à un bureau plutôt que derrière, appuyé sur ses deux mains au-dessus de papiers.",
    // B · 7b932f14e049
    "characters.veyrac.artSeed": "sn-veyrac-01",
    // B · 9c42702d51c1
    "characters.veyrac.portrait": "story_seven_names/veyrac",
    // B · 715493b41ac1
    "characters.veyrac.expressions": ["neutre","sincère","grave","ravi","acculé"],
    // B · 67ce3d7c1fcd
    "characters.veyrac.knowledgeScope": ["veyrac","valere","le_registre","la_session","les_sept","le_gala"],
    // B · ec90bffaeeaa
    "characters.veyrac.gates.veyrac_will_meet_you.label": "Il accepte d’être dans une pièce avec toi",
    // B · 77dcad9b37cc
    "characters.veyrac.gates.veyrac_will_meet_you.kind": "AUTRE",
    // B · 5a7fe4e58ec3
    "characters.veyrac.gates.veyrac_will_meet_you.requires.flagsSet": ["sait :il_etait_dans_la_piece"],
    // B · b825ad96b849
    "characters.veyrac.gates.veyrac_offers_terms.label": "Il met une offre concrète sur la table",
    // B · 77dcad9b37cc
    "characters.veyrac.gates.veyrac_offers_terms.kind": "AUTRE",
    // B · c551278d17ac
    "characters.veyrac.scouting.revealCopy": "Il a déjà admis le point que tu voulais faire valoir. « C’est toi qui fais ça, » dit-il, agréablement. « Tu commences par ce que tu penses que je ne vais pas admettre. Ça fait onze mois que j’admets des choses. »",
    // B · 9af012a1f207
    "characters.veyrac.combatant.tags": ["homme politique"],
    // B · 5bd2fdb853d7
    "characters.renaud.name": "Gabriel Renaud",
    // A · 627dd88f2820
    "characters.renaud.role": "Inspecteur, trente-deux ans, débutant sur l’affaire Valère, et le seul en France à ne jamais avoir signé votre noyade",
    // A · 965c434c1798
    "characters.renaud.cardBlurb": "Il a aidé à vous condamner et il croyait chaque mot à l’époque. Depuis, il a relu le dossier onze fois et trouvé quatre choses qui ne collent pas. Il va vous suivre à travers le pays pour vous interroger à leur sujet.",
    // B · fcca6b746d0b
    "characters.renaud.pronouns": "il/lui",
    // A · 3fe2d8c6cb85
    "characters.renaud.publicTraits": ["Énonce les choses dans l’ordre, sans le vouloir","Ne fait jamais de suppositions à haute voix, jamais, jamais","Arrive à pied, un peu plus tôt que prévu"],
    // B · cb03f3c84cac
    "characters.renaud.hiddenDrives": ["Il veut avoir eu tort, ce qu’il ne peut pas dire à un collègue et commence à se dire à lui-même","Il construit un dossier privé sans numéro d’affaire et n’a pas réfléchi à ce qu’il en ferait"],
    // B · 321f5945da84
    "characters.renaud.values": ["Les preuves, d’une manière que ses supérieurs trouvent pédante et ils ont raison","Faire le travail de la même façon peu importe qui est le prévenu"],
    // B · 66d4b87c6005
    "characters.renaud.fears": ["Qu’il soit celui qui a mis la mauvaise personne dans cette cellule et qu’on le félicite depuis onze mois","Découvrir ça et ne rien pouvoir faire à cause de qui ça implique"],
    // A · 63f18e37bb50
    "characters.renaud.socialStyle": "Correct, lent et inflexible. Pose deux fois la même question, à quatre heures d’intervalle, avec des mots un peu différents. Ne menace jamais, ne bluffe jamais, ce qui est pire aux yeux des gens.",
    // B · ef5e9b265981
    "characters.renaud.boundaries": ["Ne fabrique pas, ne place pas de preuves, ne force pas un témoin ni ne ferme les yeux, et a été écarté deux fois pour ça","N’arrêtera pas quelqu’un sur un mandat qu’il juge faux, et le dira publiquement même si ça le perd"],
    // B · 83dc1f07d46c
    "characters.renaud.goals": ["Trouver les quatre éléments dans le dossier qui ne collent pas et établir ce qu’ils sont","Arrêter le joueur vivant, ce qu’il commence à comprendre n’est pas ce que ses ordres disent vraiment"],
    // B · 8adeed898e36
    "characters.renaud.secrets.renaud_the_four_things.fact": "Le revolver n’a aucune empreinte dessus. Les lettres ont été écrites sur du papier fabriqué après les dates qu’elles portent. Deux témoins ont été interrogés ensemble. Et la chronologie médico-légale a été révisée une fois.",
    // B · 47558a04be8d
    "characters.renaud.secrets.renaud_the_four_things.visibility": "NPC_PRIVATE",
    // B · 8c53f622d793
    "characters.renaud.secrets.renaud_the_four_things.revealHint": "Il te dit les quatre, dans l’ordre, dès qu’il décide que tu vaux la peine — et il décide ça sur la preuve, pas sur le charme.",
    // B · b06897070f09
    "characters.renaud.secrets.renaud_his_orders.fact": "Son ordre écrit est de récupérer le corps. Pas le prisonnier. Il a remarqué la formulation en mars et n’en a parlé à personne.",
    // B · 47558a04be8d
    "characters.renaud.secrets.renaud_his_orders.visibility": "NPC_PRIVATE",
    // B · 8a6b9e52cbd8
    "characters.renaud.secrets.renaud_his_orders.revealHint": "Ça sort clairement quand quelqu’un lui demande ce qu’il advient d’eux s’il gagne.",
    // A · 48bc95639ddf
    "characters.renaud.speechStyle": "Simple, procédural, sans hâte. Les faits, dans l’ordre — premier, deuxième, troisième — souvent sans s’en rendre compte. Ne fait jamais de suppositions à voix haute et déteste voir les autres le faire. Aucun trait d’ironie.",
    // A · 7f00c3aad1f9
    "characters.renaud.topics": ["le dossier","le revolver","les lettres","la chronologie","ses ordres","ce qui lui ferait changer d’avis"],
    // A · 87f50adca16b
    "characters.renaud.voiceSamples": ["D’abord, aucune trace sur le revolver. Ni à toi, ni à personne, même pas à un serviteur. Ensuite, le papier sur lequel sont écrites les lettres a été fabriqué en mars, alors qu’elles datent d’avant. J’en ai onze autres et aucune ne donne d’opinion.","Je ne vais pas spéculer là-dessus. Quand j’aurai quelque chose, je te dirai ce que c’est.","Mon ordre dit : récupérer le corps. Pas : récupérer le prisonnier. Je l’ai lu en mars et j’y ai repensé plusieurs fois depuis.","C’est moi qui t’ai fait condamner. Je tiens à le dire avant qu’on aille plus loin, parce que tu vas le découvrir et je préfère que ça vienne de moi."],
    // B · 623824380b7a
    "characters.renaud.appearance": "Trente-deux ans, sombre, cheveux courts, un lourd manteau simple, des bottes ressemelées deux fois, et un carnet dans la poche poitrine gauche qu’il sort avec une visible réticence.",
    // B · b9a1a325ab8b
    "characters.renaud.visualHook": "Un carnet de poche, rempli aux trois quarts, maintenu par un élastique.",
    // B · d58a5956b34b
    "characters.renaud.silhouette": "Debout dans l’embrasure d’une porte, les mains le long du corps, sans la bloquer.",
    // B · 4111651bcdcd
    "characters.renaud.artSeed": "sn-renaud-01",
    // B · 32bf22abc33c
    "characters.renaud.portrait": "story_seven_names/renaud",
    // B · 52c1677519d3
    "characters.renaud.expressions": ["neutre","attentif","tenace","troublé","décidé"],
    // B · 70b3969c3fbd
    "characters.renaud.knowledgeScope": ["renaud","le_dossier","le_gala","la_prefecture","ses_ordres"],
    // B · 4ec786e52de0
    "characters.renaud.gates.renaud_will_hear_you.label": "Il t’écoute avant de t’arrêter",
    // B · 55a54e80451a
    "characters.renaud.gates.renaud_will_hear_you.kind": "CONFIANCE",
    // B · 3713b4c4f147
    "characters.renaud.gates.renaud_will_hear_you.requires.flagsSet": ["parlé :renaud"],
    // B · 477b60994284
    "characters.renaud.gates.renaud_turns.label": "Il dépose le dossier privé sur le bureau de quelqu’un",
    // B · 9e8ae18bf8bf
    "characters.renaud.gates.renaud_turns.kind": "ALLIANCE",
    // B · 296cc9f78ecb
    "characters.renaud.scouting.revealCopy": "Il est à la gare quand tu arrives. « Tu vas vers l’ouest, » dit-il sans bouger. « Quatre fois déjà. J’ai commencé à acheter mon billet en premier. »",
    // B · 7cccc0e984fb
    "characters.renaud.combatant.tags": ["police"],
    // B · ad2d4cd919fc
    "characters.marcel.name": "Marcel Bellac",
    // A · a1ac236ce537
    "characters.marcel.role": "Soixante-trois ans, prisonnier quarante-sept, faussaire de métier, et six ans qu’il creuse un tunnel commencé avant même de savoir ce qu’il en ferait",
    // A · c8088d2f806a
    "characters.marcel.cardBlurb": "Il tousse à travers ton mur depuis onze mois et tu n’as jamais vu son visage. Il sait ce que signifient les sept noms et il va te révéler l’essentiel à leur sujet avant que tu décides si tu peux lui faire confiance.",
    // B · fcca6b746d0b
    "characters.marcel.pronouns": "il/lui",
    // A · 303c19ae77b9
    "characters.marcel.publicTraits": ["Parle du papier comme d’autres parlent des chevaux","Rit à des choses pas drôles et c’est sincère","Tousse, et reprend la phrase après"],
    // B · 78ba6075e0db
    "characters.marcel.hiddenDrives": ["Il veut être utile à quelqu’un une dernière fois, après quarante ans à être utile à des gens qu’il méprisait","Il n’est pas certain que le joueur soit innocent et a décidé que ça ne change rien à ce qu’il fait, ce qu’il n’a jamais dit à voix haute"],
    // B · cc569eab8786
    "characters.marcel.values": ["Le savoir-faire. Il préfère faire une petite chose parfaitement qu’une grande correctement, ce qui explique qu’il ait été pris","Dire la vérité à quelqu’un sur sa situation tôt, tant que ça coûte peu"],
    // B · 5d1fadf459aa
    "characters.marcel.fears": ["Mourir dans le tunnel après six ans, à quatre mètres de la citerne","Donner une liste de sept noms à quelqu’un qui en fait sept tombes"],
    // A · 66e6abe66d7a
    "characters.marcel.socialStyle": "Directement familier, sans aucune sensiblerie. Donne d’abord ce qui est utile et jamais de réconfort. S’intéresse à tes mains avant de poser des questions sur ton affaire.",
    // B · aee8d892f54e
    "characters.marcel.boundaries": ["Ne falsifie rien qui mette un nom sur quelqu’un qui ne le mérite pas, une distinction qu’il peut défendre pendant une heure","Ne veut pas qu’on le remercie, et change brusquement de sujet quand on essaie"],
    // B · e7c0c18353a0
    "characters.marcel.goals": ["Quitter cette île, ce qu’il veut depuis six ans sans vraiment y avoir réfléchi","S’assurer que celui qui reçoit la liste comprenne le quatrième nom avant d’arriver jusqu’à elle"],
    // B · 62918b2c844e
    "characters.marcel.secrets.marcel_how_he_knows.fact": "Il a forgé trois des lettres utilisées au procès du joueur. Il a été payé, il ne savait pas à quoi elles servaient, et a déduit le reste grâce aux journaux ici.",
    // B · 47558a04be8d
    "characters.marcel.secrets.marcel_how_he_knows.visibility": "NPC_PRIVATE",
    // B · 89b2bc16ac04
    "characters.marcel.secrets.marcel_how_he_knows.revealHint": "Il te le dit lui-même, sans qu’on le lui demande, quelque part entre le tunnel et l’eau, et ne s’en excuse pas.",
    // B · ac5c98919b09
    "characters.marcel.secrets.marcel_the_fourth_name.fact": "Il sait pour le fils du docteur. C’est pourquoi il répète que la liste n’est pas une liste de morts et pourquoi il ne dit pas pourquoi tant qu’on ne le lui demande pas vraiment.",
    // B · 47558a04be8d
    "characters.marcel.secrets.marcel_the_fourth_name.visibility": "NPC_PRIVATE",
    // B · 451cd05cb6eb
    "characters.marcel.secrets.marcel_the_fourth_name.revealHint": "Il le donne à quiconque lui demande ce qu’il voulait dire, plutôt que de discuter avec lui à ce sujet.",
    // A · a101810796df
    "characters.marcel.speechStyle": "Sec, chaleureux et technique. Il commence par le détail du métier — l’encre, la fabrication, la main, le poids du papier — puis le sens humain arrive en dessous. De l’humour noir servi à plat, juste après un sujet sérieux. Toutes les trois ou quatre phrases, une quinte de toux qu’il gère sans se démonter.",
    // A · 3eef543d6c7d
    "characters.marcel.topics": ["le tunnel","le papier et l’encre","les sept noms","le quatrième nom","ce qu’il a falsifié","l’eau"],
    // A · 25619c93e86e
    "characters.marcel.voiceSamples": ["Six ans. Quatre cent dix mètres, la plupart du temps à l’aveugle. Si j’avais su dès le début ce que je sais du calcaire, j’aurais creusé dans l’autre sens et j’en serais sorti en deux ans.","J’ai écrit trois des lettres avec lesquelles on t’a pendu. Je ne savais pas à quoi elles servaient. Ce n’est pas une excuse, c’est un fait lié à mon métier, et il y a une différence, j’ai eu tout le temps ici pour y réfléchir.","Ne fais pas l’erreur du débutant. Un nom sur une liste, c’est une porte. Derrière certaines, il y a une femme effrayée, et tu ne pourras l’ouvrir qu’une fois.","De bonnes mains. Froides, mais bonnes. Tu vas en avoir besoin à la grille et tu en auras bien plus dans une quinzaine de jours."],
    // B · 4af0f1a43781
    "characters.marcel.appearance": "Soixante-trois ans, maigre à en alarmer, barbe grise de trois jours, une chemise qu’il a traversée de sang à l’épaule, et des mains qui restent absolument stables et sont la seule partie de lui qui ait l’air en bonne santé.",
    // B · a361c0b64aa2
    "characters.marcel.visualHook": "Des mains propres et stables sur un homme par ailleurs sale et qui se défait.",
    // B · 6fa306a6bc56
    "characters.marcel.silhouette": "Accroupi, à moitié sorti d’un trou dans un mur, un bras appuyé.",
    // B · b0b78d018bce
    "characters.marcel.artSeed": "sn-marcel-01",
    // B · 35c4e265b5c1
    "characters.marcel.portrait": "story_seven_names/marcel",
    // B · 64793bf26de6
    "characters.marcel.expressions": ["neutre","ironique","urgent","tendre","faiblissant"],
    // B · 523c75bdf293
    "characters.marcel.knowledgeScope": ["marcel","la_liste","faux","le_tunnel","les_sept","anais"],
    // B · 6fc3164e420d
    "characters.marcel.gates.marcel_tells_you_what_he_did.label": "Il te dit ce qu’il a écrit",
    // B · 55a54e80451a
    "characters.marcel.gates.marcel_tells_you_what_he_did.kind": "CONFIANCE",
    // B · 1d35dbb1c58c
    "characters.marcel.gates.marcel_tells_you_what_he_did.requires.flagsSet": ["parlé :marcel"],
    // B · d4ca4f114aa4
    "characters.marcel.gates.marcel_stays.label": "Il travaille pour toi plutôt qu’à côté de toi",
    // B · 9e8ae18bf8bf
    "characters.marcel.gates.marcel_stays.kind": "ALLIANCE",
    // B · 33a7cee2152c
    "characters.marcel.combatant.tags": ["prisonnier"],
    // B · 5a7138968a74
    "characters.solene.name": "Solène Artois",
    // A · 5eb853cc2324
    "characters.solene.role": "Quarante-quatre ans, propriétaire de six journaux, et celle qui t’a transformé en monstre national en neuf jours",
    // A · bc3ae7f0a786
    "characters.solene.cardBlurb": "Elle a construit la salle où le pays fait ses réflexions, et elle a une photo dans un tiroir fermé au cinquième étage qu’elle n’a jamais tirée. Découvre pourquoi elle ne l’a jamais imprimée et tu sauras ce qu’elle protège vraiment.",
    // B · aee35f364a88
    "characters.solene.pronouns": "elle",
    // A · b4c04fcea3e6
    "characters.solene.publicTraits": ["Dit l’épigramme et ne la rend pas plus douce","Jamais dans le bâtiment avant onze heures du soir","A tout lu sans jamais en parler"],
    // B · 45b15c059312
    "characters.solene.hiddenDrives": ["Elle veut être comprise comme une bâtisseuse plutôt que comme une démolisseuse, par quelqu’un dont elle n’a pas acheté l’opinion","Elle attend depuis six ans une raison d’imprimer la photo qui ne coûte rien à la famille de sa sœur"],
    // B · 71f882a8f1f6
    "characters.solene.values": ["Le métier, qu’elle croit être la seule institution en France à avoir vraiment retiré quelqu’un du pouvoir","Sa sœur, sans sentiment et sans limite"],
    // B · 3ef155e58d05
    "characters.solene.fears": ["L’entrée au Registre concernant le mari de sa sœur, qu’elle a lue et ne peut acheter","Être reconnue pour une une page de une sur neuf mille"],
    // A · d678dadadfad
    "characters.solene.socialStyle": "Annonce d’emblée ce qui est intéressant, puis regarde si tu suis. Ne cherche pas du tout à être appréciée, mais aime bien qu’on lui réponde. N’explique jamais une décision deux fois.",
    // B · e94c19844bc9
    "characters.solene.boundaries": ["Ne publiera pas un mensonge qu’elle sait être faux, qu’elle distingue nettement et à son profit de ce qu’elle a imprimé à propos du joueur","Ne se laissera pas faire en utilisant sa sœur, et l’homme qui a essayé n’est plus dans le métier"],
    // B · 35bfffa14567
    "characters.solene.goals": ["Sortir de l’entrée concernant le mari de sa sœur sans payer en couverture","Découvrir qui dirige vraiment l’affaire, parce qu’elle n’a jamais aimé être utilisée et soupçonne qu’elle l’a été"],
    // B · 1103b2a6801e
    "characters.solene.secrets.solene_the_plate.fact": "Elle a une photo du gala montrant quelqu’un entrant dans le passage de service dix minutes après que le joueur est parti. Elle l’a depuis la semaine du meurtre.",
    // B · 47558a04be8d
    "characters.solene.secrets.solene_the_plate.visibility": "NPC_PRIVATE",
    // B · 982af6ebf565
    "characters.solene.secrets.solene_the_plate.revealHint": "Elle l’échangera, ouvertement, contre quelque chose qui résout le problème de sa sœur — elle attend qu’on lui propose ça et ne fera pas semblant du contraire.",
    // B · c39dfe1f9509
    "characters.solene.secrets.solene_her_sister.fact": "Le Registre contient assez d’informations sur le mari de sa sœur pour ruiner quatre personnes, dont deux enfants. C’est la seule raison pour laquelle une femme qui ne craint rien a jamais fait ce qu’on lui a dit.",
    // B · 47558a04be8d
    "characters.solene.secrets.solene_her_sister.visibility": "NPC_PRIVATE",
    // B · 689707a83609
    "characters.solene.secrets.solene_her_sister.revealHint": "Elle le dit d’une voix plate à quelqu’un qui a déjà compris qu’elle a été contrainte plutôt que complice.",
    // A · 891c3acaad01
    "characters.solene.speechStyle": "Déclarative et épigrammatique, parle du public plutôt que des individus. Évoque la fabrication, la diffusion, et ce qu’un pays peut penser un matin donné. S’ennuie des jugements moraux, elle le dit. Répond à une question par une meilleure question, puis répond aussi à celle-ci.",
    // A · acf6d96d7c70
    "characters.solene.topics": ["le commerce","ce qu’elle a imprimé","la plaque","sa sœur","le registre","qui l’utilisait"],
    // A · 5e98e529d81a
    "characters.solene.voiceSamples": ["Personne ne rapporte une opinion. L’opinion n’est pas là pour être racontée. Tu fabriques la pièce et tu es très surpris de ce qu’on y dit.","Neuf jours. C’est le temps qu’il a fallu, dont quatre un dimanche et un jour férié, et j’y ai beaucoup pensé depuis.","J’ai une plaque dans un tiroir au cinquième étage. Je ne vais pas te la donner. Je vais te dire ce qu’elle me coûte, et tu vas devoir régler ça.","Ne viens pas me parler de bien ou de mal. Parle-moi de diffusion, je t’écouterai toute la nuit."],
    // B · 691330b69e94
    "characters.solene.appearance": "Quarante-quatre ans, cheveux foncés grisonnants, coupés courts et démodés, noir simple et cher, lunettes à chaîne qu’elle ne met jamais vraiment, et de l’encre sur le côté d’une main en permanence.",
    // B · 2dfab1953f7d
    "characters.solene.visualHook": "Encre en permanence sur le bord extérieur de la main droite, sur une femme qui n’a pas composé de caractères depuis vingt ans.",
    // B · 2cdfe8449dd6
    "characters.solene.silhouette": "Debout à une pierre, sur des épreuves, les deux mains à plat dessus.",
    // B · 6bb6ce018da2
    "characters.solene.artSeed": "sn-solene-01",
    // B · 7dab40302e7d
    "characters.solene.portrait": "story_seven_names/solene",
    // B · af629b87fc35
    "characters.solene.expressions": ["neutre","sardonique","engagée","méprisante","exposée"],
    // B · f3313dab6035
    "characters.solene.knowledgeScope": ["solene","la_presse","la_photo","sa_soeur","le_gala","le_registre"],
    // B · 6ff2d485ec8d
    "characters.solene.gates.solene_names_her_price.label": "Elle te dit ce que la photo lui coûterait",
    // B · 77dcad9b37cc
    "characters.solene.gates.solene_names_her_price.kind": "AUTRE",
    // B · 00431ea0229e
    "characters.solene.gates.solene_names_her_price.requires.flagsSet": ["parlé :solene"],
    // B · 27517290aaff
    "characters.solene.gates.solene_prints_it.label": "Elle publie l’histoire en une de son propre journal",
    // B · 9e8ae18bf8bf
    "characters.solene.gates.solene_prints_it.kind": "ALLIANCE",
    // B · 9240e22c6b0f
    "characters.solene.combatant.tags": ["presse"],
    // B · 8eff34847f4d
    "characters.anais.name": "Anaïs Bellier",
    // A · 74075b24960c
    "characters.anais.role": "Trente-neuf ans, médecin, et la femme dont la signature a rendu possible la chronologie de l’accusation",
    // A · b6e19050c0f8
    "characters.anais.cardBlurb": "C’est le quatrième nom de ta liste. Elle a signé la fausse chronologie parce que son enfant de neuf ans avait disparu depuis quarante-huit heures et est revenu le jour où elle a signé. Elle garde encore le premier rapport dans un tiroir. Ce que tu feras devant sa porte décidera si tu le vois ou pas.",
    // B · aee35f364a88
    "characters.anais.pronouns": "elle",
    // A · 58c69337bb0f
    "characters.anais.publicTraits": ["Reçoit les patients qui ne peuvent pas payer le mardi","Chronomètre tout et dit les heures à voix haute","N’a pas élevé la voix depuis six ans"],
    // B · 3f21866ac727
    "characters.anais.hiddenDrives": ["Elle attend depuis six ans que quelqu’un vienne la faire parler, et a organisé sa vie pour qu’on puisse la trouver","Elle veut que son fils ne sache jamais, ce qui est incompatible avec tout le reste de ses désirs"],
    // B · cc8ce9dd9f40
    "characters.anais.values": ["Son fils, absolument et sans aucune condition","Le travail. Elle est une médecin exceptionnellement compétente depuis le jour où elle a signé, ce dont elle est consciente que ce n’est pas un paiement"],
    // B · 0bf3229f61e1
    "characters.anais.fears": ["Que ça recommence, ce n’est pas un souvenir mais une attente vivante autour de laquelle elle organise ses semaines","Être transformée en symbole par quelqu’un qui en a besoin, ce qu’elle suppose que le joueur fera"],
    // A · cc068e872a61
    "characters.anais.socialStyle": "Précise, tranquille et exacte. Répond complètement aux questions médicales, et aux questions personnelles après une pause un peu gênante. Observe les mains plus que les visages, pour des raisons professionnelles qui sont devenues autre chose.",
    // B · 0d195ab7e909
    "characters.anais.boundaries": ["Elle ne sera pas dans une pièce où son fils est mentionné par quelqu’un qui l’utilise comme levier","Elle ne mentira pas sur un fait clinique, c’est précisément pourquoi signer ce rapport a brisé quelque chose"],
    // B · f429e2182d8c
    "characters.anais.goals": ["Tenir jusqu’à jeudi, c’est ainsi qu’elle a organisé six ans","Donner le premier rapport à quelqu’un qui ne s’en servira pas pour faire reprendre son fils"],
    // B · cf133158fb61
    "characters.anais.secrets.anais_the_first_report.fact": "Elle a gardé la chronologie originale. Heure du décès différente de près de deux heures. C’est dans un tiroir verrouillé à trois mètres de là où elle reçoit ses patients.",
    // B · 47558a04be8d
    "characters.anais.secrets.anais_the_first_report.visibility": "NPC_PRIVATE",
    // B · 7ae8436b4922
    "characters.anais.secrets.anais_the_first_report.revealHint": "Elle le remet à quelqu’un qui arrive sans arme et lui demande ce qui s’est passé plutôt que de lui dire ce qu’elle a fait.",
    // B · fed9f69685b5
    "characters.anais.secrets.anais_who_came.fact": "L’homme qui est venu chez elle n’était pas un criminel. Il avait une carte, il était poli, il a utilisé les mots « affaire d’État », et elle le reconnaîtrait.",
    // B · 47558a04be8d
    "characters.anais.secrets.anais_who_came.visibility": "NPC_PRIVATE",
    // B · 8f70d4b25dff
    "characters.anais.secrets.anais_who_came.revealHint": "Elle le décrit en détail clinique, sans y être invitée, une fois qu’elle a décidé que la personne en face d’elle ne s’en servira pas pour blesser quelqu’un.",
    // A · 85ae82d5f751
    "characters.anais.speechStyle": "Calme, précise et clinique, avec des heures et des quantités glissées dans des phrases ordinaires. Longs silences avant tout ce qui est personnel, puis la chose dite très simplement et une seule fois. Parle de son fils de façon détournée, par « il », sans jamais préciser qui, et tout le monde comprend.",
    // A · 67551045a812
    "characters.anais.topics": ["le rapport","les quarante-huit heures","l’homme à la carte","son fils","l’heure du décès","ce qu’elle fait le mardi"],
    // A · 405f19876975
    "characters.anais.voiceSamples": ["Au plus tôt onze heures quarante. Pas l’heure sur le document. Le document dit une heure vingt, et c’est ma signature.","Quarante-huit heures. Il est revenu jeudi après-midi, vers quatre heures, il avait mangé, et il ne savait pas que c’était arrivé. Personne ne lui a fait de mal. C’est la partie que j’ai jamais pu lâcher.","Tu peux regarder le tiroir. Je vais pas te l’ouvrir et je vais pas t’arrêter, et j’aimerais que tu remarques laquelle des deux choses je fais.","Si tu veux m’insulter, je tiendrai. Ce sera la première fois que quelqu’un le fait, et j’ai beaucoup réfléchi à comment ça se passerait."],
    // B · 3f3871c6b0a5
    "characters.anais.appearance": "Trente-neuf ans, cheveux foncés attachés simplement, vêtements de médecin de travail plutôt que d’une femme à la mode, mains râpées aux jointures, et une immobilité que les gens prennent pour du calme.",
    // B · d81c9ac0320d
    "characters.anais.visualHook": "Jointures toujours rouges, sur des mains qu’elle garde croisées quand elle ne travaille pas.",
    // B · 76c6e7d31600
    "characters.anais.silhouette": "Assise sur une chaise dure, droite, mains sur les genoux, face à la porte.",
    // B · 383236ab71bb
    "characters.anais.artSeed": "sn-anais-01",
    // B · 0d8d1cf01955
    "characters.anais.portrait": "story_seven_names/anais",
    // B · 5263272229d8
    "characters.anais.expressions": ["neutre","prudent","épuisée","effrayée","délivrée"],
    // B · 93994880196b
    "characters.anais.knowledgeScope": ["anais","la_chronologie","les_quarante_huit_heures","l_homme_à_la_carte","la_médecine"],
    // B · 79b4bab49f94
    "characters.anais.gates.anais_will_talk.label": "Elle te raconte ce qui lui est vraiment arrivé",
    // B · 55a54e80451a
    "characters.anais.gates.anais_will_talk.kind": "CONFIANCE",
    // B · 0e33cf326242
    "characters.anais.gates.anais_will_testify.label": "Elle le dira là où ça compte",
    // B · 9e8ae18bf8bf
    "characters.anais.gates.anais_will_testify.kind": "ALLIANCE",
    // B · 8d234559d531
    "characters.anais.combatant.tags": ["civil"],
    // B · 32d926d2d25a
    "characters.varenne.name": "Henri Varenne",
    // A · bcb7c384529c
    "characters.varenne.role": "Cinquante-cinq ans, président d’une banque, premier nom sur la liste, et l’homme qui finance le réseau qui épie tout le monde, y compris lui-même",
    // A · 7600885f85f3
    "characters.varenne.cardBlurb": "Il est le premier nom sur ta liste, il finance trois hôpitaux et c’est du sérieux, il a payé l’appareil qui a permis de rendre toute l’affaire gérable par quelqu’un d’autre. Il verse onze mille chaque trimestre à quelqu’un depuis avant le gala, sans savoir à qui.",
    // B · fcca6b746d0b
    "characters.varenne.pronouns": "il",
    // A · cc127848c28e
    "characters.varenne.publicTraits": ["Philanthrope en public, audité en privé","Ne parle jamais d’un chiffre non vérifié","Traite sa fille comme la seule personne compétente qu’il connaisse sans jamais le dire"],
    // B · 2241a07bf95d
    "characters.varenne.hiddenDrives": ["Il veut sortir, et il veut sortir depuis quatre ans, sans moyen pour sortir d’une chose sans porte","Il protège Céleste d’une inscription au Registre à son sujet qu’il n’a jamais lue et ne compte pas lire"],
    // B · 524b01f69b86
    "characters.varenne.values": ["La position, qu’il comprend comme la seule vraie forme de sécurité et qu’il a passée quarante ans à accumuler","Les hôpitaux. Il n’est pas sentimental à leur sujet et il n’a jamais manqué un paiement"],
    // B · 7b7401ca4fa0
    "characters.varenne.fears": ["Que sa fille découvre ce qu’il a financé, dans le détail précis plutôt que de façon générale","Que le cercle décide qu’il est devenu une exposition plutôt qu’une assurance"],
    // A · 0fea0f096a0e
    "characters.varenne.socialStyle": "Courtois, posé, totalement opaque. Transforme chaque conversation en question de position et d’exposition sans jamais employer ces mots. Difficile à insulter, impossible à presser.",
    // B · b9e11030e385
    "characters.varenne.boundaries": ["Il ne discutera de rien d’important nulle part où il n’a pas choisi d’être","Il ne laissera pas sa fille être utilisée comme levier, c’est le seul sujet où il cesse d’être courtois"],
    // B · 7a06320bfde5
    "characters.varenne.goals": ["Savoir qui détient maintenant la demande trimestrielle, car elle a changé de mains au printemps","Mettre ses affaires en ordre pour que son exposition et celle de sa fille soient séparables"],
    // B · fa6c482c8d7e
    "characters.varenne.secrets.varenne_the_payments.fact": "Onze mille francs par trimestre depuis mars avant le gala. Il ne sait pas à qui. L’agent de collecte a changé trois fois et il n’a jamais refusé de payer.",
    // B · 47558a04be8d
    "characters.varenne.secrets.varenne_the_payments.visibility": "NPC_PRIVATE",
    // B · 3cce477ca0ed
    "characters.varenne.secrets.varenne_the_payments.revealHint": "Il te donne tout le calendrier si tu peux lui dire quelque chose sur le bénéficiaire qu’il ne sait pas déjà.",
    // B · cc72b78e289d
    "characters.varenne.secrets.varenne_what_he_financed.fact": "Il a payé pour les surveillants. Pas pour le meurtre — l’appareil qui a permis au cercle de tout savoir sur tout le monde, ce qui a rendu le meurtre possible par quelqu’un d’autre.",
    // B · 47558a04be8d
    "characters.varenne.secrets.varenne_what_he_financed.visibility": "NPC_PRIVATE",
    // B · 938587d0007b
    "characters.varenne.secrets.varenne_what_he_financed.revealHint": "Il l’expose précisément et sans défense à quelqu’un qui lui a déjà montré qu’il en connaît une partie, car une divulgation partielle est pire qu’une complète et il a fait le calcul.",
    // A · 70ea13513644
    "characters.varenne.speechStyle": "Courtois, financier et parfaitement posé. Parle des gens en termes de position, d’exposition, de liquidités et de durée, sans jamais employer ces mots, si bien qu’une conversation sur la vie d’un homme sonne comme une conversation sur un instrument. Ne hausse jamais le ton. S’excuse formellement, ne concède rien.",
    // A · f1f4af5f041c
    "characters.varenne.topics": ["les paiements","le cercle","sa fille","les hôpitaux","ce qu’il a financé","l’exposition"],
    // A · 871ff6e2f3b4
    "characters.varenne.voiceSamples": ["Onze mille par trimestre, ce n’est pas une grosse somme pour moi, et ça n’a jamais été une question de somme. C’est une question d’être un homme qui paie, c’est une position, et les positions sont difficiles à quitter.","J’ai financé l’appareil. Pas l’événement. J’aimerais que tu fasses la différence, non pas parce que ça me disculpe — ça ne le fait pas — mais parce que si tu les confonds, tu iras chercher le mauvais homme la prochaine fois.","Ma fille ne fait pas partie de cette conversation. Ce n’est pas une requête, et c’est la seule chose que je répète deux fois.","Tu es bien habillé, à une heure où je ne reçois pas, en venant par le mauvais escalier. Assieds-toi. Quelqu’un t’a formé, j’aimerais savoir qui."],
    // B · 50924b40cd05
    "characters.varenne.appearance": "Cinquante-cinq ans, cheveux argentés, corpulent, costume gris impeccable, chaîne de montre qu’il regarde sans y penser, et la lenteur particulière d’un homme qui n’a jamais eu à être nulle part.",
    // B · 462533cd02ca
    "characters.varenne.visualHook": "Une chaîne de montre en or que l’on touche sans cesse sans jamais vraiment la regarder.",
    // B · 9146cf790608
    "characters.varenne.silhouette": "Assis derrière un bureau, les deux mains posées sur les accoudoirs, parfaitement calme.",
    // B · 0d7fef7c00e0
    "characters.varenne.artSeed": "sn-varenne-01",
    // B · fe1f665ce789
    "characters.varenne.portrait": "story_seven_names/varenne",
    // B · 6b131fd4b9a9
    "characters.varenne.expressions": ["neutre","courtois","évaluant","froid","apeuré"],
    // B · 51d512e4e63a
    "characters.varenne.knowledgeScope": ["varenne","les_paiements","le_cercle","celeste","la_banque","le_registre"],
    // B · 0628bd19346c
    "characters.varenne.gates.varenne_will_receive_you.label": "Il accepte une conversation sérieuse",
    // B · 77dcad9b37cc
    "characters.varenne.gates.varenne_will_receive_you.kind": "AUTRE",
    // B · 11cc7ecac7d6
    "characters.varenne.gates.varenne_will_receive_you.requires.flagsSet": ["parlé :varenne"],
    // B · d9b91729df4c
    "characters.varenne.gates.varenne_gives_you_the_schedule.label": "Il remet six ans de paiements",
    // B · 55a54e80451a
    "characters.varenne.gates.varenne_gives_you_the_schedule.kind": "CONFIANCE",
    // B · 20635fbb1b8e
    "characters.varenne.combatant.tags": ["financier"],
    // B · d414e2a0066c
    "factions.faction_prefecture.name": "La Préfecture",
    // B · 586bd4e78ba2
    "factions.faction_prefecture.description": "Les magistrats, les archives et les hommes en manteaux simples à la barrière. Sûrs institutionnellement que l’affaire est solide et comprenant au moins une personne qui n’y a jamais cru.",
    // B · 6937738f5d4d
    "factions.faction_society.name": "La Société",
    // B · 63797943500a
    "factions.faction_society.description": "Mille cent personnes capables de faire ruiner quelqu’un avant jeudi, rangées en loges à l’opéra dans un ordre que tout le monde lit d’un coup d’œil.",
    // B · 71bc1859b5be
    "factions.faction_press.name": "La Presse",
    // B · 109827213e3f
    "factions.faction_press.description": "Six éditions du soir et quatre cent mille lecteurs qui se font une idée de toute l’affaire entre le kiosque et le tram. Ils ne rapportent pas ce que pense le pays ; ils construisent la pièce où la pensée se fait.",
    // B · 3f9daaa2e890
    "factions.faction_underworld.name": "Le Milieu",
    // B · b26f57976691
    "factions.faction_underworld.description": "Faussaires, receleurs, docker, une femme à Marseille qui ne regarde jamais deux fois personne, et la franc-maçonnerie lâche de ceux qui vivent des erreurs dans les papiers des autres.",
    // B · 813aca36c58c
    "factions.faction_registry.name": "Le Cercle",
    // B · fa9f75442b55
    "factions.faction_registry.description": "Pas une organisation avec une porte. Le petit nombre de personnes qui détiennent des morceaux du Registre et ont compris depuis des décennies que personne ne trahit le cercle parce que le cercle peut détruire tout le monde.",
    // B · 30be235cda59
    "quests.q_six_hours.title": "Six Heures",
    // B · 5545e9f43ae2
    "quests.q_six_hours.summary": "Un trou dans le mur, un vieux faussaire, et un choix entre prouver quelque chose avant l’aube ou être vivant après.",
    // B · 7fcc0be2ad9c
    "quests.q_six_hours.kind": "PRINCIPALE",
    // B · 984ac887c2a4
    "quests.q_six_hours.steps.the_hole_in_the_wall.playerCopy": "Un homme est à ton étage avec une clé, une carte et une liste. Décide ce que tu es.",
    // B · d9548dc57def
    "quests.q_six_hours.steps.the_hole_in_the_wall.directorNotes": "Ne le fais pas presser le joueur. Il a attendu six ans et il apprécie la conversation. Toutes les options sont légitimes, y compris refuser, appeler le garde, ou lui dire que c’est toi. Rien ici ne prouve l’innocence du joueur et rien ne doit essayer.",
    // B · 18fd0aa92a05
    "quests.q_six_hours.steps.the_hole_in_the_wall.rewards.flags": ["connaît :les_sept"],
    // B · 35ee90a64de2
    "quests.q_six_hours.steps.the_water.playerCopy": "Onze kilomètres de Méditerranée noire et une porte qui s’ouvre une fois.",
    // B · 8b9d21be2ebf
    "quests.q_six_hours.steps.the_water.directorNotes": "La clé est en fer doux et laissera une bonne partie d’elle-même dans la serrure. Marcel a soixante-trois ans, saigne, et n’a pas été dans l’eau depuis 1897. S’il s’en sort vivant est vraiment incertain et le monde continue dans les deux cas.",
    // B · 7fc50231d5f5
    "quests.q_six_hours.steps.the_water.enterWhen.flagsSet": ["a_pris_le_tunnel"],
    // B · 0a90a65b0b27
    "quests.q_six_hours.steps.the_water.rewards.flags": ["hors_de_serein"],
    // B · ab51a31c3b13
    "quests.q_six_hours.involvedCharacterIds": ["marcel"],
    // B · c72e6d859656
    "quests.q_six_hours.involvedLocationIds": ["cellule_serein","tunnel_serein","le_mur_cotier"],
    // B · a05ab43cc669
    "quests.q_six_hours.knownRewardCopy": "Un littoral, et sept noms dont tu ne sais encore que faire.",
    // B · 9157094f281e
    "quests.q_a_name_and_a_face.title": "Un Nom Et Un Visage",
    // B · 14cd8a292f7e
    "quests.q_a_name_and_a_face.summary": "Tu es un mort sans papiers dans une ville portuaire, et tout ce qui suit a besoin que quelqu’un soit quelqu’un.",
    // B · 7fcc0be2ad9c
    "quests.q_a_name_and_a_face.kind": "PRINCIPALE",
    // B · 0a90a65b0b27
    "quests.q_a_name_and_a_face.discoverWhen.flagsSet": ["hors_de_serein"],
    // B · f9ff4c6123ed
    "quests.q_a_name_and_a_face.steps.become_somebody.playerCopy": "Trouve un nom qui tient devant un greffier.",
    // B · 2121b1fe25d2
    "quests.q_a_name_and_a_face.steps.become_somebody.directorNotes": "Trois options qui coûtent différemment. Les faux papiers sont rapides mais fragiles. Une identité empruntée dans le métier est durable et due. Ne rien avoir est gratuit mais ferme toutes les portes avec un registre, ce qui est la plupart de Paris.",
    // B · 1a99f88df1f8
    "quests.q_a_name_and_a_face.steps.become_somebody.rewards.flags": ["prêt_à_partir"],
    // B · faac24287f77
    "quests.q_a_name_and_a_face.steps.get_to_paris.playerCopy": "Quatorze heures vers le nord, dans un train avec quelqu’un qui te cherche.",
    // B · 67cd9784cbec
    "quests.q_a_name_and_a_face.steps.get_to_paris.directorNotes": "Renaud est à bord. Il ne connaît pas bien le visage du joueur mais connaît ses habitudes grâce à onze mois de dossier. Le couloir est tout le décor : tout le monde le traverse deux fois et il n’y a aucun endroit qui n’en fasse pas partie.",
    // B · 1a99f88df1f8
    "quests.q_a_name_and_a_face.steps.get_to_paris.enterWhen.flagsSet": ["prêt_à_partir"],
    // B · 13070b5a9e92
    "quests.q_a_name_and_a_face.steps.get_to_paris.rewards.flags": ["connaît_le_passage"],
    // B · ab51a31c3b13
    "quests.q_a_name_and_a_face.involvedCharacterIds": ["marcel"],
    // B · bce563d9fa2a
    "quests.q_a_name_and_a_face.involvedLocationIds": ["docks_marseille","chambre_marseille","saint_charles"],
    // B · de9b3c1f549c
    "quests.q_a_name_and_a_face.knownRewardCopy": "Une identité qui résiste à un registre d’hôtel, et un moyen de partir vers le nord.",
    // B · f41d6a850972
    "quests.q_the_fourth_name.title": "Le Quatrième Nom",
    // B · 59993f775941
    "quests.q_the_fourth_name.summary": "Un médecin au sud de la rivière qui a signé une fausse chronologie, et la raison pour laquelle une liste de sept n’est pas une liste de sept cibles.",
    // B · 7fcc0be2ad9c
    "quests.q_the_fourth_name.kind": "PRINCIPALE",
    // B · f3382b6bc621
    "quests.q_the_fourth_name.discoverWhen.flagsSet": ["à_paris"],
    // B · d4886e2c5410
    "quests.q_the_fourth_name.steps.go_and_see_her.playerCopy": "Elle est dans deux pièces au-dessus d’une pharmacie et elle attend depuis six ans.",
    // B · 5ed81ce50129
    "quests.q_the_fourth_name.steps.go_and_see_her.directorNotes": "La scène la plus importante du monde. Si le joueur arrive armé ou menaçant, elle ne leur donne rien et ils ne sauront peut-être jamais ce qui s’est passé, et le monde doit accepter ça définitivement. S’ils demandent, elle raconte tout, longuement, en environ quatre-vingt-dix secondes.",
    // B · e4915ad6d844
    "quests.q_the_fourth_name.steps.go_and_see_her.rewards.flags": ["le_quatrième_nom_est_réglé"],
    // B · 8118f24a1568
    "quests.q_the_fourth_name.involvedCharacterIds": ["anais","marcel","renaud"],
    // B · fd5b82525bcf
    "quests.q_the_fourth_name.involvedLocationIds": ["chirurgie_bellier","les_boulevards"],
    // B · 3842d05e3d9c
    "quests.q_the_fourth_name.knownRewardCopy": "Le premier rapport, l’homme à la carte, et l’argument sur lequel tout ce monde est construit.",
    // B · c3fb2f98cefa
    "quests.q_the_registry.title": "Le Registre",
    // B · 4541f0e6cf70
    "quests.q_the_registry.summary": "Ni un livre ni un bâtiment. Six personnes détiennent des morceaux de son emplacement et aucune ne l’a écrit.",
    // B · eff80c847ff6
    "quests.q_the_registry.kind": "PRINCIPALE",
    // B · f3382b6bc621
    "quests.q_the_registry.discoverWhen.flagsSet": ["à_paris"],
    // B · 97ad4cedc9ae
    "quests.q_the_registry.steps.the_first_name.playerCopy": "Un président de banque avec un bureau, un coffre-fort et une fille qui est déjà passée par là.",
    // B · c98c59e66e3f
    "quests.q_the_registry.steps.the_first_name.directorNotes": "Céleste est dans cette maison la nuit depuis trois ans. Que le joueur la rencontre en rivale, obstacle ou collègue se décide en quatre secondes et ne se rattrape pas vite.",
    // B · dbd1c1a51259
    "quests.q_the_registry.steps.the_first_name.rewards.flags": ["dans_le_cercle"],
    // B · f538c6a9e54b
    "quests.q_the_registry.steps.find_out_where_it_is.playerCopy": "Six personnes détiennent des morceaux. Récupère assez de morceaux.",
    // B · 21ccc2862237
    "quests.q_the_registry.steps.find_out_where_it_is.directorNotes": "Personne n’a la réponse complète, y compris Veyrac. Trois chemins assemblent le tout à partir de moitiés différentes. Le joueur doit comprendre qu’il s’agit de trois pièces, pas une, et qu’il ne pourra entrer proprement que dans une seule.",
    // B · dbd1c1a51259
    "quests.q_the_registry.steps.find_out_where_it_is.enterWhen.flagsSet": ["dans_le_cercle"],
    // B · 678e4544f862
    "quests.q_the_registry.steps.find_out_where_it_is.rewards.flags": ["le_coffre_est_trouvable"],
    // B · 8f09100943aa
    "quests.q_the_registry.steps.find_out_where_it_is.rewards.abilities": ["ouvrir_le_registre"],
    // B · 19f78844e232
    "quests.q_the_registry.steps.what_you_do_with_it.playerCopy": "Tu es dans une cave de banque avec quarante ans de ruines d’autres personnes dans des boîtes numérotées.",
    // B · 835e42c45352
    "quests.q_the_registry.steps.what_you_do_with_it.directorNotes": "Quatre choix, aucun n’est propre. Le brûler protège les innocents et laisse les coupables libres. Le publier détruit quatre cents familles avec les onze qui le méritent. Le garder fait du joueur le huitième nom. Ne prendre que ce qui l’innocente laisse la machine tourner.",
    // B · 678e4544f862
    "quests.q_the_registry.steps.what_you_do_with_it.enterWhen.flagsSet": ["le_coffre_est_trouvable"],
    // B · fb12acba76e6
    "quests.q_the_registry.steps.what_you_do_with_it.rewards.flags": ["le_registre_est_répondu"],
    // B · 55684b09a5b5
    "quests.q_the_registry.involvedCharacterIds": ["celeste","varenne","solene","veyrac"],
    // B · 7239ee56c428
    "quests.q_the_registry.involvedLocationIds": ["maison_varenne","bureaux_le_matin","l_opéra","le_coffre"],
    // B · fa3e9abd2f2c
    "quests.q_the_registry.knownRewardCopy": "Où se trouve vraiment l’archive, et ce qu’une personne fait quand elle la tient.",
    // B · 10f788930934
    "quests.q_the_seventh_name.title": "Le Septième Nom",
    // B · 216f078a998a
    "quests.q_the_seventh_name.summary": "L’homme qui a fait l’éloge funèbre, qui a témoigné à contrecoeur, et qui a tout organisé pour empêcher une publication.",
    // B · 7fcc0be2ad9c
    "quests.q_the_seventh_name.kind": "PRINCIPALE",
    // B · dbd1c1a51259
    "quests.q_the_seventh_name.discoverWhen.flagsSet": ["into_the_circle"],
    // B · d1bf8b44143c
    "quests.q_the_seventh_name.steps.prove_he_was_in_the_room.playerCopy": "Il nie être dans une pièce de la rue Cambon depuis six ans. Prouve qu’il y était.",
    // B · 7ee19f3d01e4
    "quests.q_the_seventh_name.steps.prove_he_was_in_the_room.directorNotes": "Rien ici n’est une confession. C’est une page dans les archives privées d’un soldat, une plaque que personne n’a imprimée, et la chronologie originale d’un médecin, et n’importe quelle paire des trois pousse un magistrat à poser une question. C’est toute la preuve, et le joueur doit sentir à quel point elle est mince.",
    // B · fed79a396a13
    "quests.q_the_seventh_name.steps.prove_he_was_in_the_room.rewards.flags": ["the_case_exists"],
    // B · f00afb708e89
    "quests.q_the_seventh_name.steps.what_happens_to_him.playerCopy": "Tu peux le joindre. Décide à quoi ça sert.",
    // B · efe0f75e9250
    "quests.q_the_seventh_name.steps.what_happens_to_him.directorNotes": "Il rencontrera le joueur. Il sera sincère à propos de Valère, il montrera ses calculs, et il offrira une amnistie réelle. Le tuer laisse le Registre et les six autres intacts, et le pays avec un martyr. Les quatre options sont cohérentes.",
    // B · fed79a396a13
    "quests.q_the_seventh_name.steps.what_happens_to_him.enterWhen.flagsSet": ["the_case_exists"],
    // B · f1648b0fd643
    "quests.q_the_seventh_name.steps.what_happens_to_him.rewards.flags": ["the_affair_is_closed"],
    // B · 4bef393f300e
    "quests.q_the_seventh_name.involvedCharacterIds": ["veyrac","renaud","solene","anais"],
    // B · 83172a35c618
    "quests.q_the_seventh_name.involvedLocationIds": ["veyrac_rooms","prefecture","le_matin_offices","paris_hotel"],
    // B · 75edab23acb0
    "quests.q_the_seventh_name.knownRewardCopy": "Ce que le pays finit par croire, et ce qui arrive à l’homme qui a décidé des calculs.",
    // B · 3c426a12b83a
    "worldEvents.we_the_morning_they_expected.publicCopy": "À six heures trente, une foule se rassemble à Fort Serein pour une exécution, et à sept heures le gouverneur sort et annonce un retard administratif.",
    // B · bd37b31845ec
    "worldEvents.we_the_morning_they_expected.directorNotes": "L’absence du joueur, vue de l’extérieur. Les autorités mettent neuf heures à dire que le prisonnier s’est échappé, et à ce moment-là deux journaux l’ont déjà annoncé. Joue ça où que soit le joueur, comme une nouvelle qu’il entend.",
    // B · d2de7d90181b
    "worldEvents.we_the_morning_they_expected.setsFlags": ["they_know_you_are_gone"],
    // B · d57589ce0c07
    "worldEvents.we_the_morning_they_expected.cancelledByFlags": ["refused_him"],
    // B · 7fc50231d5f5
    "worldEvents.we_the_morning_they_expected.requiresFlags": ["took_the_tunnel"],
    // B · 2f524294a016
    "worldEvents.we_the_papers_get_it.publicCopy": "Six éditions du soir, dont quatre en font leur titre principal. Deux utilisent le mot « évadé ». Une utilise le mot « disparu », ce qui est un choix fait dans un bureau.",
    // B · 1964daf9594a
    "worldEvents.we_the_papers_get_it.directorNotes": "Le pays a désormais une histoire vivante sans faits. Ce que les journaux disent que le joueur est devient une chose à traverser pour le joueur, ce n’est pas exact et ça ne le deviendra pas.",
    // B · 4d50d6f4efde
    "worldEvents.we_the_papers_get_it.setsFlags": ["the_story_is_running"],
    // B · d2de7d90181b
    "worldEvents.we_the_papers_get_it.requiresFlags": ["they_know_you_are_gone"],
    // B · 59c0ae542ded
    "worldEvents.we_renaud_takes_the_train.publicCopy": "Il y a deux hommes en manteaux civils à la barrière du quai trois, et un troisième qui n’est pas avec eux, plus en retrait, qui regarde les wagons de seconde classe plutôt que la porte.",
    // B · a457f3802f34
    "worldEvents.we_renaud_takes_the_train.directorNotes": "Il a compris comment le joueur voyage, pas où. Il n’est pas pressé et ne va pas crier. Si le joueur s’assoit en face de lui, il aura la conversation.",
    // B · 5b5e711f08fb
    "worldEvents.we_renaud_takes_the_train.setsFlags": ["renaud_is_moving"],
    // B · 1a99f88df1f8
    "worldEvents.we_renaud_takes_the_train.requiresFlags": ["ready_to_travel"],
    // B · 1b263e4196ed
    "worldEvents.we_nocturne_again.publicCopy": "Une maison dans le huitième arrondissement a été visitée à deux heures du matin. Des lettres et un livre de comptes ont disparu, mais onze mille francs de bijoux sont restés, ce que les journaux trouvent incompréhensible et impriment quand même.",
    // B · c4da7c9ff5ed
    "worldEvents.we_nocturne_again.directorNotes": "Elle est en avance. Quoi que le joueur ait prévu à cette adresse, quelqu’un d’autre l’a fait et mieux. Ça doit être irritant, pas menaçant.",
    // B · c4bbf861e78b
    "worldEvents.we_nocturne_again.setsFlags": ["nocturne_struck_again"],
    // B · 2c9d902b99de
    "worldEvents.we_nocturne_again.cancelledByFlags": ["worked_it_out_together"],
    // B · f3382b6bc621
    "worldEvents.we_nocturne_again.requiresFlags": ["in_paris"],
    // B · 0b206c4861a4
    "worldEvents.we_veyrac_speaks.publicCopy": "Le septième nom prononce un discours sur l’état de droit qui ne mentionne pas une seule fois l’évasion, et à la lecture des éditions du soir, on comprend que c’était entièrement à ce sujet.",
    // B · f070fb01f8b9
    "worldEvents.we_veyrac_speaks.directorNotes": "Il est très bon à ça. Le discours est sincère, bien argumenté et parle d’autre chose, et ça fait bouger le pays de quatre degrés. Rien n’y est faux.",
    // B · 0eb4d9fe5f58
    "worldEvents.we_veyrac_speaks.setsFlags": ["veyrac_moved_first"],
    // B · e3e23fae8cad
    "worldEvents.we_veyrac_speaks.cancelledByFlags": ["veyrac_dead","veyrac_fell"],
    // B · 4d50d6f4efde
    "worldEvents.we_veyrac_speaks.requiresFlags": ["the_story_is_running"],
    // B · c23fcada069b
    "worldEvents.we_the_amnesty.publicCopy": "Une amnistie conditionnelle est proposée en comité, attribuée à personne, et imprimée dans trois journaux avant l’après-midi. Elle est réelle, limitée dans le temps, et nécessite une signature sur une confession.",
    // B · 4303b2239075
    "worldEvents.we_the_amnesty.directorNotes": "L’offre est sincère et le piège n’est pas légal, il est narratif : signer finit l’histoire avec le pays croyant la version originale. Veyrac ne l’a pas proposée et a fait en sorte qu’elle soit proposée.",
    // B · f39619a1fc5c
    "worldEvents.we_the_amnesty.setsFlags": ["the_amnesty_exists"],
    // B · 24c7ee434ab9
    "worldEvents.we_the_amnesty.cancelledByFlags": ["veyrac_dead","veyrac_fell","name_cleared"],
    // B · 0eb4d9fe5f58
    "worldEvents.we_the_amnesty.requiresFlags": ["veyrac_moved_first"],
    // B · c60046cb090e
    "worldEvents.we_the_circle_notices.publicCopy": "La demande trimestrielle à la maison Varenne arrive onze jours en avance avec un autre agent de recouvrement, le montant est inchangé et le ton de la lettre d’accompagnement aussi.",
    // B · 072937aa3b36
    "worldEvents.we_the_circle_notices.directorNotes": "Le cercle a compris que quelqu’un s’y infiltre. Personne n’est menacé directement. Tous deviennent un peu plus prudents d’un coup, ce qui ferme environ quatre portes que le joueur n’avait pas encore utilisées.",
    // B · a9755a062d24
    "worldEvents.we_the_circle_notices.setsFlags": ["le_cercle_est_reveillé"],
    // B · 4b9800caed80
    "worldEvents.we_the_circle_notices.cancelledByFlags": ["brûlé_le_registre","publié_le_registre"],
    // B · dbd1c1a51259
    "worldEvents.we_the_circle_notices.requiresFlags": ["dans_le_cercle"],
    // B · 66608df16291
    "worldEvents.we_they_go_for_the_doctor.publicCopy": "Il y a un homme devant la pharmacie au sud de la rivière à cinq heures du matin qui n’attend pas qu’elle ouvre, et le portail de l’école est à quatre rues.",
    // B · b48f226406a2
    "worldEvents.we_they_go_for_the_doctor.directorNotes": "C’est ce qu’elle prépare depuis six ans. C’est évitable. Si le joueur n’est pas là et n’a pas fait venir quelqu’un d’autre, ça arrive, et le monde ne l’adoucit pas.",
    // B · 6f05a3bab944
    "worldEvents.we_they_go_for_the_doctor.setsFlags": ["ils_sont_partis_anais"],
    // B · cb979c022077
    "worldEvents.we_they_go_for_the_doctor.cancelledByFlags": ["anais_t’a_dit","brûlé_le_registre","veyrac_mort"],
    // B · a9755a062d24
    "worldEvents.we_they_go_for_the_doctor.requiresFlags": ["le_cercle_est_reveillé"],
    // B · 28d8e9fd506d
    "worldEvents.we_the_reward.publicCopy": "Vingt mille francs, affichés dans chaque préfecture et en première page de deux journaux, avec une photo vieille de six ans et pas très bonne.",
    // B · bd7068b9d354
    "worldEvents.we_the_reward.directorNotes": "Tous ceux qui ont aidé le joueur valent maintenant vingt mille francs. La plupart ne les prendront pas. L’important, c’est que le joueur sache lesquels ils hésitent à prendre.",
    // B · e8cb83a8c124
    "worldEvents.we_the_reward.setsFlags": ["la_récompense_est_lancée"],
    // B · 5610ead036a4
    "worldEvents.we_the_reward.cancelledByFlags": ["nom_blanchi","a_pris_l’amnistie"],
    // B · 4d50d6f4efde
    "worldEvents.we_the_reward.requiresFlags": ["l’histoire_est_en_cours"],
    // B · 009f57c48883
    "worldEvents.we_the_session_opens.publicCopy": "La session d’automne commence. Dès la deuxième semaine, le septième nom est décrit dans trois journaux comme le choix évident pour l’intérieur, et personne ne l’a proposé.",
    // B · 09ffe4c2552b
    "worldEvents.we_the_session_opens.directorNotes": "C’est l’horloge. Si rien n’est établi maintenant, il est au gouvernement au printemps et tout ce que le joueur détient peut être supprimé par un ministre. Ce n’est pas une date annoncée par le monde.",
    // B · 653c565936c7
    "worldEvents.we_the_session_opens.setsFlags": ["la_session_ouverte"],
    // B · 5e62e81ac277
    "worldEvents.we_the_session_opens.cancelledByFlags": ["veyrac_mort","veyrac_chuté","publié_le_registre"],
    // B · 4d50d6f4efde
    "worldEvents.we_the_session_opens.requiresFlags": ["l’histoire_est_en_cours"],
    // B · d77ebfcebe44
    "promises.p_the_list.kind": "FINALE",
    // B · e836523fe15f
    "promises.p_the_list.label": "Sept noms sur une demi-feuille de papier",
    // B · b48d0b3e75b5
    "promises.p_the_list.seedHint": "À côté de chacun un seul mot — argent, presse, police, médecine, armée, navires — et à côté du septième, rien.",
    // B · ae7ea5a5c432
    "promises.p_the_list.payoffHint": "Un médecin avec un tiroir fermé à clé, qui a signé un mensonge pour récupérer un enfant de neuf ans, et qui attend depuis six ans qu’on lui demande.",
    // B · e82d9dc4b3fa
    "promises.p_whether_you_did_it.kind": "MYSTÈRE",
    // B · 698da71b4be5
    "promises.p_whether_you_did_it.label": "Ce qui s’est vraiment passé au Beaumont",
    // B · ecdf5de87a71
    "promises.p_whether_you_did_it.seedHint": "Personne dans ce monde ne te demande si tu l’as fait, ce qui est déjà à remarquer.",
    // B · c63ebba2b166
    "promises.p_whether_you_did_it.payoffHint": "Une plaque exposée à quatre minutes après minuit, montrant quelqu’un entrant dans un passage dix minutes après ton départ.",
    // B · 5631e4ba6537
    "promises.p_the_seventh.kind": "BOSS",
    // B · 1e1a411078bb
    "promises.p_the_seventh.label": "L’ami qui a fait l’éloge funèbre",
    // B · 53a486e458ef
    "promises.p_the_seventh.seedHint": "Un brassard de deuil encore porté sur la manche gauche onze mois plus tard, que les journaux mentionnent à chaque fois.",
    // B · f5b983545281
    "promises.p_the_seventh.payoffHint": "Il a décidé qu’un homme était plus dangereux que la corruption qu’il voulait dénoncer, puis il a vu ce que la crise lui apporterait.",
    // B · 63a719ec7f2d
    "promises.p_nocturne.kind": "RIVAL",
    // B · fe4bbe49315d
    "promises.p_nocturne.label": "Quelqu’un qui est déjà devant toi",
    // B · 311c39eccfe0
    "promises.p_nocturne.seedHint": "Une maison visitée à deux heures du matin avec les lettres parties et les bijoux laissés.",
    // B · f4ae3e27ba92
    "promises.p_nocturne.payoffHint": "Le premier nom de ta liste a une fille, et elle fouille dans son bureau depuis trois ans.",
    // B · f8b4a6708d82
    "promises.p_the_registry.kind": "THÈME",
    // B · dd4a57fa1a78
    "promises.p_the_registry.label": "Quarante ans à ce que chacun ait un dossier sur chacun",
    // B · b833af52dd34
    "promises.p_the_registry.seedHint": "Onze mille francs par trimestre, payés par un homme qui ne sait pas à qui.",
    // B · 3a5de0117a6b
    "promises.p_the_registry.payoffHint": "Trois pièces dans trois bâtiments, et une décision sur quatre cents familles à prendre debout.",
    // B · 3a02fb66452b
    "endings.end_the_name_returned.name": "Le Nom Rendu",
    // B · c9d08ae5d876
    "endings.end_the_name_returned.rarity": "FRÉQUENT",
    // B · 8f4d2de6dde2
    "endings.end_the_name_returned.requires.flagsSet": ["name_cleared"],
    // B · a0b8b4674279
    "endings.end_the_name_returned.requires.flagsUnset": ["took_the_amnesty"],
    // B · 30d48bc6ab08
    "endings.end_the_name_returned.condition": "La condamnation initiale a été publiquement reconnue comme une erreur et le joueur a retrouvé son nom. Il peut être coupable de beaucoup de choses qui sont arrivées après, et probablement l’est. Écris ce que le pays décide qu’il était — une victime, un héros, un criminel chanceux — car ce n’est pas la même question que celle du droit et c’est décidé par d’autres personnes.",
    // A · ebbb97d487d7
    "endings.end_the_name_returned.epilogue": "La révision prend quatorze mois et est faite par une commission de cinq hommes, aucun ne rencontrera le joueur. Deux journaux s’excusent en un paragraphe à la page neuf. Celui de la page un ne le fait jamais et ne perd pas ses lecteurs pour autant. Quelqu’un renvoie la photo du procès, encadrée, sans mot.",
    // B · 197de9857ad8
    "endings.end_seven_graves.name": "Sept Tombes",
    // B · f8b8333fe7bc
    "endings.end_seven_graves.rarity": "RARE",
    // B · 5a6daa849295
    "endings.end_seven_graves.requires.flagsSet": ["veyrac_dead","frightened_her"],
    // B · d404a3584903
    "endings.end_seven_graves.condition": "La plupart ou la totalité des sept sont morts à cause du joueur. La question posée par cette fin n’est pas de savoir si c’était mal — le monde a cessé d’en débattre — mais ce que la campagne a construit, c’est-à-dire un pays avec la même machine à l’intérieur et onze personnes en moins qui connaissaient les pièces.",
    // A · 7d8678c156e7
    "endings.end_seven_graves.epilogue": "Le Registre ne meurt pas avec eux. Il est hérité, mal, par des gens qui le comprennent moins et qui ont plus peur, ce qui est pire. Le quatrième nom est enterré dans le onzième avec son fils en première ligne, il a quinze ans, et quelqu’un finit par lui expliquer.",
    // B · a57a04707374
    "endings.end_nocturne.name": "Nocturne",
    // B · f8b8333fe7bc
    "endings.end_nocturne.rarity": "RARE",
    // B · 2c9d902b99de
    "endings.end_nocturne.requires.flagsSet": ["worked_it_out_together"],
    // B · 1c12dce2ac69
    "endings.end_nocturne.condition": "Ils en sont sortis en travaillant ensemble et ont continué à le faire, amoureux ou pas selon ce que la partie a réellement construit. Ne pas améliorer cela. Ce qu’il faut écrire, c’est que ni l’un ni l’autre n’a jamais eu de collègue avant et qu’ils en sont tous deux discrètement étonnés.",
    // A · a90968adf47e
    "endings.end_nocturne.epilogue": "Onze boulots en deux ans et pas un seul pour l’argent. Deux gouvernements et une banque savent que quelqu’un retire systématiquement les leviers que les gens ont les uns sur les autres, mais personne n’a réussi à en cerner la forme. Elle choisit toujours le côté cour, et c’est encore la seule chose peu originale chez l’un comme chez l’autre.",
    // B · 9a9ed2eb4b3f
    "endings.end_celeste_at_dawn.name": "Céleste À L’Aube",
    // B · f8b8333fe7bc
    "endings.end_celeste_at_dawn.rarity": "RARE",
    // B · 2c9d902b99de
    "endings.end_celeste_at_dawn.requires.flagsSet": ["worked_it_out_together"],
    // B · 644047de9ac4
    "endings.end_celeste_at_dawn.condition": "Mérité, et après que l’affaire de son père a été réglée plutôt qu’évitée. Ce n’est pas disponible avec la seule affection et la scène doit montrer pourquoi : elle a découvert ce qu’il finançait, grâce au joueur, et elle n’est pas partie, c’est tout le contenu de la fin.",
    // A · 577c457638fc
    "endings.end_celeste_at_dawn.epilogue": "Ils ne se marient pas, ce qui fait parler pendant environ trois ans, puis on arrête. Il garde la banque. Elle garde les nuits. Il y a une maison quelque part avec deux penderies très différentes et une personne qui connaît les deux styles, et ce n’est ni l’un ni l’autre.",
    // B · 33e735ed919d
    "endings.end_the_eighth_name.name": "Le Huitième Nom",
    // B · f7fc172f729a
    "endings.end_the_eighth_name.rarity": "UNIQUE",
    // B · 924fb2bdfdc0
    "endings.end_the_eighth_name.requires.flagsSet": ["kept_the_registry"],
    // B · 989f0be5e6ea
    "endings.end_the_eighth_name.condition": "Ils l’ont pris. Quarante ans de ruine d’autres personnes, détenus par une seule personne qui décide maintenant de ce qu’il advient de tout ça. Qu’ils deviennent un gardien bienveillant, un faiseur de rois ou quelque chose de bien pire est déterminé par la partie et pas par ce texte. Écris la première semaine de gestion et à quelle vitesse les calculs commencent à avoir du sens.",
    // A · 9effbbc8854f
    "endings.end_the_eighth_name.epilogue": "Rien ne change publiquement, c’est bien pour ça que le cercle existe. Quatre nominations la première année prennent une tournure inattendue. Personne ne sait pourquoi, deux personnes soupçonnent, et ces deux-là reçoivent un jour une lettre entièrement amicale qui parle d’un détail de leur famille qu’ils n’ont jamais révélé.",
    // B · 9286102dedd6
    "endings.end_burn_the_registry.name": "Brûler le Registre",
    // B · f8b8333fe7bc
    "endings.end_burn_the_registry.rarity": "RARE",
    // B · 21a9eed690fe
    "endings.end_burn_the_registry.requires.flagsSet": ["burned_the_registry"],
    // B · ddfeec36d7c6
    "endings.end_burn_the_registry.condition": "Assez d’archives ont disparu pour que le système coercitif ne puisse pas être reconstitué. Les coupables marchent. Les innocents restent protégés. Le compromis doit être dans la fin et aucune moitié ne doit être minimisée : c’est l’option qui aide le docteur et laisse le général partir à la retraite.",
    // A · 25c6f21078cf
    "endings.end_burn_the_registry.epilogue": "Quatre hommes qui auraient dû être ruinés ne le sont pas, et deux meurent à quatre-vingts ans dans des maisons au bord de la mer. Le fils du docteur grandit sans qu’on ne lui ait jamais rien expliqué. Personne ne parvient à prouver que les archives existaient, ce qui fait que les historiens passent quarante ans à parler d’une légende, et l’un d’eux a presque raison.",
    // B · 7d82ef0bda3a
    "endings.end_print_everything.name": "Tout Imprimer",
    // B · f8b8333fe7bc
    "endings.end_print_everything.rarity": "RARE",
    // B · 1007d2bf44f5
    "endings.end_print_everything.requires.flagsSet": ["published_the_registry"],
    // B · 1c58fa4b0d64
    "endings.end_print_everything.condition": "Cela a été diffusé, largement, dans un pays avec six éditions du soir. Ne moralise pas dessus et ne célèbre pas ça. Montre ce que quarante ans où tout le monde tient quelque chose sur tout le monde fait quand ça arrive d’un coup : réformes, poursuites, carrières brisées, familles ruinées qui n’ont rien fait, et au moins un enterrement directement attribuable.",
    // A · 980b819ac1cc
    "endings.end_print_everything.epilogue": "Onze poursuites, dont quatre réussites. Deux ministères réorganisés. Trois suicides le premier mois, dont un homme dont personne n’avait jamais entendu parler, dont la notice ne faisait que deux lignes et parlait de sa femme. La loi qui en découle en 1913 est vraiment bonne et porte le nom de quelqu’un d’autre.",
    // B · 17edf87ac23f
    "endings.end_the_gentleman_ghost.name": "Le Fantôme Gentleman",
    // B · f8b8333fe7bc
    "endings.end_the_gentleman_ghost.rarity": "RARE",
    // B · f1648b0fd643
    "endings.end_the_gentleman_ghost.requires.flagsSet": ["the_affair_is_closed"],
    // B · 5610ead036a4
    "endings.end_the_gentleman_ghost.requires.flagsUnset": ["name_cleared","took_the_amnesty"],
    // B · 0250ccbb715c
    "endings.end_the_gentleman_ghost.condition": "Ils n’ont jamais retrouvé leur nom et ont construit autre chose à la place : un alias auquel le pays croit, plus grand qu’une personne, qui continue à agir. Écris ce que ça coûte — personne ne les rencontre jamais sous leur vrai nom — ainsi que ce que ça achète.",
    // A · 9c097c55a330
    "endings.end_the_gentleman_ghost.epilogue": "En 1913, il y a un roman pas cher, deux chansons et quatre imitateurs. En 1920, un débat sérieux se tient dans la presse sur le fait que l’alias ait été une seule personne. Le joueur vit alors tranquillement sous un nom jamais imprimé, il lit le débat et ne participe pas.",
    // B · 3a159c19d05b
    "endings.end_veyrac_wins.name": "Veyrac Gagne",
    // B · c9d08ae5d876
    "endings.end_veyrac_wins.rarity": "FRÉQUENT",
    // B · 1d8c9ae9d0cf
    "endings.end_veyrac_wins.requires.flagsSet": ["veyrac_holds","the_session_opened"],
    // B · 8f4d2de6dde2
    "endings.end_veyrac_wins.requires.flagsUnset": ["name_cleared"],
    // B · 911440fad72c
    "endings.end_veyrac_wins.condition": "Il a contenu ça. C’est accessible en jouant prudemment et honnêtement et en se faisant simplement dépasser par un homme avec une coalition, quatre secrétaires et dix-huit heures de travail par jour. Ce n’est pas un reproche. Il était meilleur que le joueur et il avait onze mois d’avance.",
    // A · cc29f648ae3e
    "endings.end_veyrac_wins.epilogue": "Intérieur au printemps, et il est doué, ce que personne qui connaît la vérité ne peut accepter. L’affaire devient une simple note de bas de page à propos d’un prisonnier évadé. Deux des sept meurent de vieillesse. Le docteur continue de voir des patients le mardi et ne rouvre jamais le tiroir.",
    // B · 3afa55c9b7e1
    "endings.end_the_confession.name": "La Signature",
    // B · 734e45c160cf
    "endings.end_the_confession.rarity": "PEU FRÉQUENT",
    // B · a0b8b4674279
    "endings.end_the_confession.requires.flagsSet": ["a_accepté_l_amnistie"],
    // B · ee9d9057857f
    "endings.end_the_confession.condition": "Ils ont signé. L’amnistie était réelle, les conditions respectées, et le prix une confession qui rend l’histoire originale vraie pour toujours. Écris le moment de la signature comme une décision tout à fait raisonnable prise par quelqu’un d’épuisé, parce que c’est ce que c’est, et laisse le coût arriver après, pas dans la pièce.",
    // A · 67ade338f55f
    "endings.end_the_confession.epilogue": "Neuf ans dans un endroit avec un jardin, six d’avance pour bonne conduite. Le document est publié intégralement dans quatre journaux le jour de sa signature. Le docteur le lit au petit-déjeuner, le pose, va travailler, et ses mains tremblent toute la semaine.",
    // B · 1fce58f04c23
    "endings.end_the_road_out.name": "La route de sortie",
    // B · 734e45c160cf
    "endings.end_the_road_out.rarity": "PEU FRÉQUENT",
    // B · b0eff3470103
    "endings.end_the_road_out.requires.flagsSet": ["a_quitté_la_carte"],
    // B · c60ba3cce77f
    "endings.end_the_road_out.requires.flagsUnset": ["nom_blanchi","a_gardé_le_registre"],
    // B · 87dd0557453c
    "endings.end_the_road_out.condition": "Ils sont partis. Une frontière, un bateau, un autre pays, et sept noms dans une poche qui restent dans la poche. C’est une réponse tout à fait cohérente après avoir reçu une liste six heures avant une exécution et elle ne doit pas être rachetée ni punie. Ce qui devait arriver en France arrive sans eux.",
    // A · a1d42bef7bb7
    "endings.end_the_road_out.epilogue": "D’abord l’Espagne, puis un endroit plus proche de la mer. La liste est dans un livre sur une étagère, on la regarde environ deux fois par an les trois premières années, puis plus du tout. Quelqu’un à Paris est condamné pour l’assassinat de Beaumont en 1914, mais ce n’est encore pas la bonne personne, et les nouvelles mettent quatre mois à arriver.",
    // A · 0642e3f52588
    "archetypes.arch_officer.name": "Tu étais officier",
    // B · 086f49bdc0b9
    "archetypes.arch_officer.role": "La lame et le commandement",
    // A · c31258ca04be
    "archetypes.arch_officer.summary": "Onze ans dans l’armée avant tout ça, ce qui explique d’où vient l’histoire du procureur sur ton accès aux armes restreintes.",
    // A · 4b4364a34207
    "archetypes.arch_officer.playstyle": ["Direct","Dangereux","Reconnaissable"],
    // A · 4a90ce0cd6c8
    "archetypes.arch_officer.blurb": "Ils t’ont retiré ta commission lors du procès et l’ont fait en grande pompe dans les journaux, avec l’histoire de l’épée et tout, parce que quelqu’un a compris à quel point ça ferait joli en photo.",
    // A · 969aac96ca19
    "archetypes.arch_thief.name": "Tu étais déjà voleur",
    // B · ac25f7882a3a
    "archetypes.arch_thief.role": "Serrures et toits",
    // A · 2d18a7109216
    "archetypes.arch_thief.summary": "Tu es entré dans des maisons où tu n’étais pas invité depuis tes quatorze ans, ce qui rend les prochains mois bien plus supportables et la condamnation plus crédible.",
    // A · 8211d98428c5
    "archetypes.arch_thief.playstyle": ["Discret","Rapide","Coupable de quelque chose"],
    // A · 5f7ab90deb53
    "archetypes.arch_thief.blurb": "Personne ne l’a évoqué au procès, ce qui est intéressant en soi, et tu as passé onze mois en cellule à te demander qui a fait en sorte que ça ne ressorte pas.",
    // A · 79dea834451f
    "archetypes.arch_gentleman.name": "Tu avais une position",
    // B · 2c876e1871e8
    "archetypes.arch_gentleman.role": "La société et lire les gens",
    // A · 360889779644
    "archetypes.arch_gentleman.summary": "Tu étais quelqu’un à ces tables-là autrefois, ce qui veut dire que la moitié des salles où tu dois maintenant entrer sont celles où tu étais invité, et onze personnes y reconnaîtront ton visage.",
    // A · 13eddbfd9e64
    "archetypes.arch_gentleman.playstyle": ["Charmant","Bien introduit","Connu"],
    // A · dbd657fc1bda
    "archetypes.arch_gentleman.blurb": "La chute, c’est ce que les journaux ont préféré. Il y a quatre personnes à Paris qui ne t’ont pas lâché, mais aucune n’a écrit, alors tu sais pas lesquelles.",
    // A · 2b7ef5846058
    "archetypes.arch_clerk.name": "Tu bossais avec du papier",
    // B · a15459865429
    "archetypes.arch_clerk.role": "Faux et détails",
    // A · 269f68efc9c3
    "archetypes.arch_clerk.summary": "Un ministère, un office de notaire, un journal — un endroit avec des en-têtes. Tu sais à quel point un document doit peser pour qu’on le croie, c’est tout ce métier.",
    // A · 598ea4dba934
    "archetypes.arch_clerk.playstyle": ["Précis","Sait attendre","Sous-estimé"],
    // A · 721e6b57767a
    "archetypes.arch_clerk.blurb": "Les lettres à ton écriture étaient leur preuve la plus solide, et t’es la seule personne en France qui aurait pu expliquer au tribunal comment c’était fait.",
    // B · 5c8a102b9544
    "setupFields.displayName.label": "Le nom en Une",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · f2e33063fc24
    "setupFields.displayName.placeholder": "ex. Aurélien Roche",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 98ebf1cfdd14
    "setupFields.pronouns.placeholder": "ex. il/lui",
    // B · ddd5caca9891
    "setupFields.archetype.label": "Qui étais-tu avant le procès ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHETYPE",
    // B · 4850b834e1e1
    "setupFields.archetype.helpText": "La vie qu’on t’a prise il y a onze mois, qui détermine ce que tu sais faire et quelles portes tu connais déjà de l’intérieur. C’est fixé pour toute l’histoire. Ça ne décide pas si tu as vraiment tué, ce que tu fais aux sept, ni ce que le pays finit par croire — tout ça, c’est toi.",
    // B · 60006c70144d
    "setupFields.worldKnowsAboutYou.label": "Qu’est-ce qu’on dit qu’il s’est passé au Beaumont ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · 75cea0325f91
    "setupFields.worldKnowsAboutYou.helpText": "Rien dans ce monde ne connaît la vérité, pas même le monde lui-même. Innocent, coupable, complice, incertain, ou quelque chose de plus étrange — dis-le ici et toute la conspiration s’en servira.",
    // B · cda07548fc35
    "setupFields.worldKnowsAboutYou.placeholder": "ex. J’étais dans ce couloir. Je ne l’ai pas tué et je sais qui l’a fait, et je n’ai jamais pu dire pourquoi j’étais là.",
    // B · d0715b5bbba3
    "setupFields.what_you_want.label": "Qu’est-ce que tu veux vraiment ?",
    // B · b6a31c665c0b
    "setupFields.what_you_want.kind": "CHOIX",
    // B · 66fd59da6e3f
    "setupFields.what_you_want.helpText": "Un désir de départ, pas un engagement. Tu peux vouloir ton nom rendu au matin et vouloir les sept morts avant la fin de la semaine.",
    // B · 05dbe06cfe04
    "setupFields.what_you_want.options.the_name.label": "Ton nom rendu, publiquement, officiellement",
    // B · 5006f10df52d
    "setupFields.what_you_want.options.the_seven.label": "Les sept, dans l’ordre que tu veux",
    // B · e47af9b0fc05
    "setupFields.what_you_want.options.the_truth.label": "Savoir ce qui s’est vraiment passé, quoi que ce soit",
    // B · eabf061a1341
    "setupFields.what_you_want.options.the_money.label": "Être très riche et très loin",
    // B · 5b228964b870
    "setupFields.what_you_want.options.nothing_yet.label": "Être vivant à sept heures du matin. Tout le reste, c’est de la spéculation",
    // B · 4001bbb05644
    "setupFields.appearance.label": "Qu’est-ce qu’on a laissé onze mois là-dedans ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · 9c7025553103
    "setupFields.appearance.placeholder": "ex. Deux kilos de moins que sur la photo du procès et une barbe que personne n’a pu raser.",
    // B · 3aa4328667d6
    "protagonist.kind": "VIDE",
    // A · 754d03475ff0
    "opening": "À une heure dix-sept, de la poussière de pierre traverse le sol de ta cellule.\n\nUne brique tombe vers l’intérieur. Puis une autre. Puis un vieil homme mince passe par ce trou à l’épaule, la chemise tachée de sang, essayant de pas rire et n’y arrivant pas tout à fait.\n\nTu l’as entendu tousser de l’autre côté de ce mur pendant onze mois. Tu n’as jamais vu son visage.\n\nIl pose trois choses par terre entre vous : une clé de fer, une carte de chemin de fer pliée, et une demi-feuille avec sept noms écrits à la main, très proprement.\n\n« Si tu veux passer tes six dernières heures à prouver ton innocence, fais-toi plaisir », dit-il.\n\nIl regarde la porte.\n\n« Si tu préfères t’en sortir, faut qu’on y aille tout de suite. »",
    // A · b97a27eedbfd
    "openingSuggestions": ["Je prends la feuille avant la clé. Sept noms, et un mot à côté de six. « Avant d’aller où que ce soit avec toi, qui c’est qui m’a foutu là, et qui c’est qui a juste raté ma sortie ? »","Je prends la clé et je suis déjà au trou dans le mur. « Parle pendant qu’on bouge. Six ans à creuser et t’as passé quatre minutes à t’expliquer, alors on va pas en perdre six de plus. »","« Assieds-toi un moment. » Je le regarde vraiment, pour la première fois. « T’es dans la cellule d’à côté depuis onze mois, t’as jamais dit ton nom, et là t’as une liste avec sept dessus. Commence par là. »"],
  },
});
