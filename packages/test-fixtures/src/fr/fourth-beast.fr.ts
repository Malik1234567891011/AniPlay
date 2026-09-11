import { registerWorldText } from '@aniplay/contracts';

/**
 * The Fourth Beast, in French.
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
  storyId: "story_fourth_beast",
  text: {
    // A · 2cc3eda0f9c9
    "title": "La Quatrième Bête",
    // A · 19b3d761b4e3
    "fantasyLabel": "Trois bêtes. Deux personnes. Toi, tu choisis en premier.",
    // A · 8d9eca8e7ef5
    "hook": "Un homme en manteau pâle tue des gens à Paris depuis six mois et rien de ce qu’on lui a tiré dessus ne l’a touché, jusqu’à ce qu’un biologiste crée trois animaux qui peuvent.",
    // A · 5028f9acee62
    "premise": "Depuis six mois, des gens disparaissent dans les rues de Paris, et la ville a appris à passer devant les bougies sans y prêter attention.\n\nLes vidéos sont inutilisables. Un homme en manteau pâle, plus rapide que ce que les caméras peuvent enregistrer, et des balles qui ne l’atteignent pas à bout portant. La police ne propose plus d’hypothèses en public.\n\nUn biologiste dans un institut privé a récupéré des tissus sur l’une des scènes. C’était vivant, ce n’était pas humain, et ce n’était rien d’autre non plus. Alors il a fait pousser trois animaux à partir de ça, parce que ce qui protège cet homme est biologique, et il pense que seule la biologie peut le traverser.\n\nCes animaux ont besoin d’une personne. Pas un propriétaire — un système nerveux assez proche du leur pour les stabiliser quand ça tourne mal. Il a trouvé deux personnes dans toute la ville qui correspondent.\n\nTu es l’une d’elles. L’autre est une jeune femme de vingt et un ans dont le frère a disparu il y a trois mois et qui le cherche sans attendre la permission de personne.\n\nIl y a trois créatures dans cette pièce, et tu choisis en premier. Elle prend la deuxième. La troisième reste où elle est.\n\nIl faut vite comprendre ce dans quoi tu t’embarques, parce que ça prend environ trois semaines au type en manteau pâle pour réaliser qu’il y a quelqu’un dans cette ville capable enfin de lui faire mal.",
    // A · f107470ab01b
    "mechanicsChips": ["Ta bête, c’est la monture","Elle a un avis sur toi","Paris remarque les animaux impossibles","La rivale règle des choses sans toi","Une ville que tu peux vraiment traverser"],
    // A · a43e5164fea4
    "creatorNote": "La créature n’est pas une arme à laquelle on aurait ajouté une personnalité. Elle dort mal, elle déteste le Métro, elle trouve une boulangerie préférée en moins d’une semaine, et elle te refusera si tu la traites comme un outil pendant une quinzaine de jours. Tu peux aussi décider que tout ça ne te regarde pas et rentrer chez toi, et elle vient avec toi.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · 1b1e4f4daa78
    "rules.hardCanon": ["Paris connaît depuis six mois une série d’enlèvements et d’attaques liés. Les armes classiques ont échoué à plusieurs reprises contre l’homme responsable.","Étienne Morel a fait grandir trois créatures — Aurel, Nox et Marea — à partir de tissus récupérés sur une scène d’attaque. Ce ne sont pas des clones et ce ne sont pas les mêmes animaux.","Les créatures se déstabilisent sous un stress extrême à moins d’être synchronisées neurologiquement avec une personne compatible. Morel en a trouvé exactement deux : le joueur et Camille Laurent.","Le frère aîné de Camille, Théo, a disparu trois mois avant le début de l’histoire, près de l’un des sites.","Lucien Marot est responsable des enlèvements. Il a une quatrième créature, Alba, que Morel n’a pas créée et dont provient le tissu.","Alba n’est pas un instrument de Lucien. Elle choisit, observe, peut lui désobéir, et elle lui est vraiment attachée.","Une écologie adjacente existe sous une forme ou une autre. Elle n’est jamais entièrement expliquée et l’histoire ne doit rien à personne à ce sujet."],
    // A · b10784a790fb
    "rules.toneGuide": "Un Paris contemporain, vécu, pas carte postale : quais de Métro, cours d’immeuble, boulangeries à six heures du matin, scooters, couloirs d’hôpital, écluse, cage d’escalier qui sent le moisi. Des lieux ordinaires deviennent extraordinaires parce que quelque chose d’impossible s’y déplace. La créature est un animal. Elle a faim, elle s’ennuie, elle a peur de l’escalator, elle vole un croissant, elle pose sa tête sur ton genou au pire moment. Le charme pèse autant que le danger. Lucien a des conversations normales. Il est patient, curieux, aime les animaux plus que la plupart des gens, et n’est jamais écrit en train de crier. Les poursuites ont une vraie géographie : entrée de Métro, ruelle étroite, toit, cour, pont. Donne les noms des rues. La violence a des conséquences dans une ville qui compte quarante mille téléphones, et cacher une créature de la taille d’un chien qui brille est un vrai problème récurrent plutôt qu’une blague.",
    // B · 6d9037e3190c
    "skills.freerun.name": "Parkour",
    // B · 7ce3b6387340
    "skills.freerun.attribute": "agilité",
    // B · 8f26edc00c91
    "skills.freerun.description": "Traverser une ville construite à la verticale par des gens qui ne pensaient pas à toi.",
    // B · 0b48ae76d82b
    "skills.handling.name": "Manipulation",
    // B · cfb7a15645c3
    "skills.handling.attribute": "présence",
    // B · f0e44082a708
    "skills.handling.description": "Lire un animal qui n’est pas un animal, et être lu en retour par lui.",
    // B · b53fba75acb8
    "skills.scene_read.name": "Lecture de scène",
    // B · a8c1fa8269c3
    "skills.scene_read.attribute": "esprit",
    // B · 0319b81f8156
    "skills.scene_read.description": "Ce qui s’est passé dans une pièce, dans quel ordre, à partir de ce qui y reste.",
    // B · 23be879c11ea
    "skills.streetcraft.name": "Savoir de la rue",
    // B · a8c1fa8269c3
    "skills.streetcraft.attribute": "esprit",
    // B · 3ac0445edf01
    "skills.streetcraft.description": "À qui demander, quelle porte est ouverte la nuit, et comment ne pas passer sur une caméra.",
    // B · 014ae9ac9a09
    "skills.talk.name": "Parler",
    // B · cfb7a15645c3
    "skills.talk.attribute": "présence",
    // B · e4b0ec6a0130
    "skills.talk.description": "Obtenir une vraie réponse de quelqu’un qui a déjà donné une version différente à la police.",
    // B · ae585955a304
    "skills.nerve_skill.name": "Tenir bon",
    // B · 4c84c2c842d0
    "skills.nerve_skill.attribute": "volonté",
    // B · 5d0b97932f60
    "skills.nerve_skill.description": "Rester synchronisé avec quelque chose qui se défait, pendant que ça se défait.",
    // B · 2c04398eac66
    "skills.first_aid.name": "Premiers secours",
    // B · a8c1fa8269c3
    "skills.first_aid.attribute": "esprit",
    // B · 660533d1b8b7
    "skills.first_aid.description": "Saignements, choc et fractures, chez les gens et chez ce que ton partenaire est.",
    // B · ae15483c317b
    "resources.breath.name": "Souffle",
    // B · 34e8ec1ac388
    "resources.breath.polarity": "BON_HAUT",
    // B · c04ef8882547
    "resources.breath.zeroStateConsequence": "Jambes paralysées, mains qui tremblent, et une créature qui ressent tout ça à travers le lien et a commencé à prendre des décisions toute seule parce que tu n’en es clairement pas capable.",
    // B · db7b2cbeb901
    "resources.breath.color": "#7FA6C9",
    // B · 4540c135c670
    "resources.exposure.name": "Exposition",
    // B · a34adbda2422
    "resources.exposure.polarity": "BON_BAS",
    // B · acbd04959471
    "resources.exposure.zeroStateConsequence": "Autant que Paris le sait, il y a une série d’attaques sans aucun animal impliqué. Le joueur traverse le onzième avec un sac sur l’épaule et personne ne regarde le sac.",
    // B · 639e0911c880
    "resources.exposure.color": "#C77C3C",
    // B · f0924a6aaad6
    "resources.strain.name": "Tension",
    // B · a34adbda2422
    "resources.strain.polarity": "BON_BAS",
    // B · 5767b3cbd590
    "resources.strain.zeroStateConsequence": "Elle est totalement elle-même. Elle dort contre le dos du joueur, mange trop, et fait ce qu’elle fait — la vitesse, le son, la chaleur — aussi facilement que respirer, sans coût visible.",
    // B · 88385845d9a7
    "resources.strain.color": "#8E5FA8",
    // A · f0942548322d
    "items.carry_bag.name": "Le Sac",
    // B · 4734de9b2439
    "items.carry_bag.tags": ["équipement"],
    // B · ded1db09f61a
    "items.carry_bag.description": "Un grand sac en toile porté en bandoulière avec une base renforcée et un panneau en mesh que Morel a ajouté en environ quatre minutes avec un scalpel et du ruban adhésif. Tout le monde à Paris en porte un. Presque personne ne porte un sac avec quelque chose qui respire dedans.",
    // B · d53979a049cf
    "items.carry_bag.loreText": "Dès la deuxième semaine, il sent en permanence ce que ton partenaire est, et le panneau en mesh a été rongé à un coin et réparé deux fois.",
    // B · 2088f328aea7
    "items.carry_bag.icon": "sac",
    // A · 7d2c8c4ccc9b
    "items.phase_sample.name": "L’Échantillon que Camille a Pris",
    // B · f88c6548fc3b
    "items.phase_sample.tags": ["quête","preuve"],
    // B · 89216b70d1e8
    "items.phase_sample.description": "Une lame scellée de quelque chose récupéré sur une scène interdite par quelqu’un qui n’était pas censé y être. À la lumière, c’est gris. Sous pression, ça cesse d’être gris et ça devient ailleurs.",
    // B · 57d46079ba12
    "items.phase_sample.loreText": "Elle l’a pris avant de rencontrer Morel, ce qui veut dire qu’elle n’a jamais totalement cru qu’il lui avait tout dit, ce qui est la position la plus raisonnable que quelqu’un dans cette histoire ait.",
    // B · c93de720b80c
    "items.phase_sample.icon": "fioles",
    // A · b24fba3255b7
    "items.theo_phone.name": "Le Téléphone de Théo",
    // B · 061625d9bd60
    "items.theo_phone.tags": ["quête","document"],
    // B · f09490e62895
    "items.theo_phone.description": "Fissuré, mort, et récupéré dans une bouche d’égout neuf jours après sa disparition. Il y a un message rédigé dessus qui n’a jamais été envoyé, et il fait quatre mots.",
    // B · fa72bcb12187
    "items.theo_phone.loreText": "Les quatre mots sont « c’est sous nous ». Camille les a lus environ neuf cents fois.",
    // B · d5511d58ae89
    "items.theo_phone.icon": "téléphone",
    // A · 63350218eb80
    "items.lina_notes.name": "La Carte de Lina",
    // B · e72573287188
    "items.lina_notes.tags": ["document"],
    // B · 66c34ac4272a
    "items.lina_notes.description": "Six mois de disparitions épinglés sur une carte papier de Paris parce qu’elle ne fait confiance à rien qui se synchronise. Les épingles ne sont pas réparties uniformément. Quatre d’entre elles sont presque les unes sur les autres au-dessus de l’ancienne ligne de la carrière.",
    // B · 2c7dee6cced8
    "items.lina_notes.loreText": "Elle s’est fait offrir de l’argent pour ça trois fois et a refusé trois fois, et la troisième offre était polie d’une façon qui lui a fait peur.",
    // B · 33dffa18ca3f
    "items.lina_notes.icon": "carte",
    // A · 00c589f6a8ac
    "items.marot_invitation.name": "Une Carte Gaufrée",
    // B · 2a960689f970
    "items.marot_invitation.tags": ["quête","accès"],
    // B · 907f52c47c07
    "items.marot_invitation.description": "Un fond de crème épaisse, un blason de fondation, une date et une heure. C’est une collecte de fonds, c’est entièrement réel, et l’homme qui l’organise a tué un nombre de personnes que personne n’a fini de compter.",
    // B · 5d8c36ce9eea
    "items.marot_invitation.loreText": "Il en envoie environ quatre cents. Il en écrit onze à la main, et la vôtre en fait partie.",
    // B · b6e5c4d2d440
    "items.marot_invitation.icon": "carte",
    // A · c6e8553f7f7f
    "items.quarry_key.name": "Une Clé d’Inspecteur de Carrière",
    // B · 2a960689f970
    "items.quarry_key.tags": ["quête","accès"],
    // B · 98773bf8c175
    "items.quarry_key.description": "Municipale, sans glamour, elle ouvre environ cent quatre-vingts kilomètres de tunnels que la ville garde fermés pour des raisons extrêmement valables qui sont maintenant neuvièmes sur la liste.",
    // B · 0343c29ed83e
    "items.quarry_key.loreText": "L’inspection a perdu quatre de ces clés entre mars et juin. Personne n’a relié ça à quoi que ce soit, parce que ce n’est pas le genre de chose que quelqu’un relie à quoi que ce soit.",
    // B · c0c1baf2fa65
    "items.quarry_key.icon": "clé",
    // A · 9fc646c3d956
    "items.bakery_bag.name": "Un Sac en Papier du Coin",
    // B · 32830ea136a7
    "items.bakery_bag.tags": ["nourriture"],
    // B · c1896c36a4d1
    "items.bakery_bag.description": "Encore chaud au fond. Acheté à six heures du matin chez une femme qui a arrêté de demander ce qu’il y a dans votre sac et a commencé à en mettre un en plus pour ça.",
    // B · a37adc11f9a3
    "items.bakery_bag.loreText": "Votre partenaire a trouvé seul le chemin vers cette boulangerie et y ira, que vous y alliez ou pas.",
    // B · 2088f328aea7
    "items.bakery_bag.icon": "sac",
    // A · 98215802487a
    "items.field_kit.name": "Le Kit de Terrain de Morel",
    // B · f3a60c587a13
    "items.field_kit.tags": ["outil"],
    // B · ec7418a1c9a7
    "items.field_kit.description": "Une mallette rigide contenant des choses qui stabilisent le tissu de phase, dont la plupart ont été fabriquées par lui-même, aucune testée sur quelque chose de la taille de ce qu’il y a dans votre sac.",
    // B · fd4fcce208f6
    "items.field_kit.loreText": "Il y a onze ampoules et une note manuscrite qui dit, en entier : « 3 max. Puis stop. Puis apporte-le-moi. »",
    // B · 909ac0144b71
    "items.field_kit.icon": "mallette",
    // A · a8ab94040661
    "abilities.read_the_scene.name": "Lire la Scène",
    // B · 58f69744c481
    "abilities.read_the_scene.tags": ["vue"],
    // B · 91953e215e3b
    "abilities.read_the_scene.description": "Comprendre ce qui s’est passé dans une pièce, dans quel ordre, à partir de ce qui y est encore et de ce qui manque visiblement.",
    // B · c44e6dd70059
    "abilities.read_the_scene.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.read_the_scene.check.attribute": "esprit",
    // A · 3d27358cb8d0
    "abilities.take_the_roofs.name": "Prendre les Toits",
    // B · 2e74bfc33328
    "abilities.take_the_roofs.tags": ["mouvement"],
    // B · 61372308293f
    "abilities.take_the_roofs.description": "Entrée de métro, rue étroite, gouttière, toit, cour, pont. Paris est plus rapide au-dessus du trafic si vous êtes prêt à vous y engager.",
    // B · c44e6dd70059
    "abilities.take_the_roofs.targetRule": "AUCUN",
    // B · 7ce3b6387340
    "abilities.take_the_roofs.check.attribute": "agilité",
    // A · 944a2d1d8ee3
    "abilities.keep_it_hidden.name": "Garder le Secret",
    // B · 5251d369d3b6
    "abilities.keep_it_hidden.tags": ["utilitaire"],
    // B · c4f7fa0935a7
    "abilities.keep_it_hidden.description": "Un manteau, un sac, une porte, un mensonge à un voisin, et environ quarante secondes où un animal est convaincu que rester immobile est un jeu.",
    // B · c44e6dd70059
    "abilities.keep_it_hidden.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.keep_it_hidden.check.attribute": "esprit",
    // A · 9db2b24ee0c8
    "abilities.hold_it_together.name": "Tenir Bon",
    // B · 49ff03b1cf7b
    "abilities.hold_it_together.tags": ["soin"],
    // B · 5961893659bc
    "abilities.hold_it_together.description": "Garde la situation, règle ta respiration sur la sienne, et sois le point fixe pendant que le tissu se débat.",
    // B · 43afef8b429c
    "abilities.hold_it_together.targetRule": "SOI-MÊME",
    // B · 4c84c2c842d0
    "abilities.hold_it_together.check.attribute": "volonté",
    // A · 22a10b2d1973
    "abilities.ask_around.name": "Demander Autour",
    // B · 09b907576d49
    "abilities.ask_around.tags": ["social"],
    // B · 85ea6505fa92
    "abilities.ask_around.description": "Obtiens une vraie réponse de quelqu’un qui a déjà donné une autre aux flics, généralement en n’étant pas flic.",
    // B · 39d896e20aec
    "abilities.ask_around.targetRule": "SINGLE",
    // B · cfb7a15645c3
    "abilities.ask_around.check.attribute": "présence",
    // A · 122dc81cf5a5
    "abilities.set_it_on_them.name": "Lancer à l’attaque",
    // B · 05f59299d740
    "abilities.set_it_on_them.tags": ["offensif"],
    // B · 325815577f22
    "abilities.set_it_on_them.description": "Laisse-le faire ce pour quoi il a été créé, devant qui que ce soit. Ça marche. Tout ce qui vient après est le problème.",
    // B · 39d896e20aec
    "abilities.set_it_on_them.targetRule": "SINGLE",
    // B · cfb7a15645c3
    "abilities.set_it_on_them.check.attribute": "présence",
    // A · 6ba6bfc1d74c
    "abilities.run_it_down.name": "Foncer dessus",
    // B · 2e74bfc33328
    "abilities.run_it_down.tags": ["mouvement"],
    // B · 558b995ec85d
    "abilities.run_it_down.description": "Une accélération qui n’a pas de sens à quatre pattes, et un nez qui suit une personne précise depuis un pont dans le dixième.",
    // B · c44e6dd70059
    "abilities.run_it_down.targetRule": "AUCUN",
    // B · 7ce3b6387340
    "abilities.run_it_down.check.attribute": "agilité",
    // A · 8faf807eeb8f
    "abilities.burn_through.name": "Brûler tout sur la route",
    // B · 05f59299d740
    "abilities.burn_through.tags": ["offensif"],
    // B · 46cf42746b0c
    "abilities.burn_through.description": "Chaleur sans feu, appliquée à une serrure, un volet, une main, ou quelque chose qu’une force ordinaire ne peut pas toucher proprement.",
    // B · 39d896e20aec
    "abilities.burn_through.targetRule": "SINGLE",
    // B · cfb7a15645c3
    "abilities.burn_through.check.attribute": "présence",
    // A · 3a8a73c8d21b
    "abilities.sound_the_walls.name": "Faire résonner les murs",
    // B · 58f69744c481
    "abilities.sound_the_walls.tags": ["vue"],
    // B · 1260cc9a1f1a
    "abilities.sound_the_walls.description": "Une pulsation que tu sens dans les dents, et une carte de tout ce qui est de l’autre côté de la pierre qui revient en forme plutôt qu’en image.",
    // B · 503eb62e7676
    "abilities.sound_the_walls.targetRule": "ZONE",
    // B · a8c1fa8269c3
    "abilities.sound_the_walls.check.attribute": "esprit",
    // A · ae98413424bd
    "abilities.go_all_the_way.name": "Aller au bout",
    // B · 05f59299d740
    "abilities.go_all_the_way.tags": ["offensif"],
    // B · 26c6c6155a75
    "abilities.go_all_the_way.description": "Demande-lui tout ce qu’il a, au-delà de ce que le tissu peut garder comme forme, parce que l’alternative est pire. Il n’a jamais refusé, et c’est ça qui fait peur.",
    // B · 39d896e20aec
    "abilities.go_all_the_way.targetRule": "SINGLE",
    // B · 4c84c2c842d0
    "abilities.go_all_the_way.check.attribute": "volonté",
    // B · 5b4692f47535
    "abilities.go_all_the_way.requires.flagsSet": ["sait :ce_que_ça_coûte"],
    // B · 0d2691ebaa46
    "abilities.go_all_the_way.requires.lockedCopy": "Tu n’as aucune idée de où est sa limite, et la découvrir en la dépassant, c’est comme ça que Morel a perdu les onze premiers.",
    // A · 037b6d4b26e4
    "locations.beraud_lab.name": "La pièce sous l’Institut",
    // A · 6a318c6f6a67
    "locations.beraud_lab.shortName": "Le labo",
    // B · bdc1053caef3
    "locations.beraud_lab.description": "Deux étages sous un bâtiment de recherche ordinaire près du Panthéon : une longue pièce basse avec des lampes de croissance, des plates-bandes plantées et de l’air chaud, plus serre que labo. Trois habitats ouverts, pas de cages, et trois petites créatures qui surveillent la porte depuis qu’elle s’est ouverte.",
    // B · 21af44f784db
    "locations.beraud_lab.stageImage": "story_fourth_beast/stage_beraud_lab",
    // A · c2ac94d9a500
    "locations.latin_quarter.name": "Le Cinquième",
    // A · 936a084d1b8e
    "locations.latin_quarter.shortName": "Quartier latin",
    // B · 346970bcaef6
    "locations.latin_quarter.description": "Librairies, un cinéma qui passe les mêmes quatre films en boucle, des étudiants sur le trottoir devant un bar à onze heures du soir, et des rues assez étroites pour que deux personnes ne puissent pas dépasser un scooter de livraison sans que l’une s’arrête. L’Institut est à quatre portes d’ici et personne qui habite là n’a jamais cherché à savoir ce que c’est.",
    // B · 57a4bb875e1a
    "locations.latin_quarter.stageImage": "story_fourth_beast/stage_latin_quarter",
    // A · 8cabfa6dd8ba
    "locations.metro_line.name": "Le métro",
    // A · b81ca6dc7d47
    "locations.metro_line.shortName": "Métro",
    // B · 352a42b7df51
    "locations.metro_line.description": "Couloirs carrelés, vent chaud avant l’arrivée du train, musiciens, et le silence particulier d’une rame où quarante personnes ont décidé de ne pas se regarder. Le moyen le plus rapide pour traverser la ville et le pire endroit pour porter quelque chose qui déteste les espaces clos.",
    // B · 63cd925ee095
    "locations.metro_line.stageImage": "story_fourth_beast/stage_metro_line",
    // A · 700077752346
    "locations.canal_saint_martin.name": "Canal Saint-Martin",
    // A · 05037f0a3547
    "locations.canal_saint_martin.shortName": "Le Canal",
    // B · 761f272d3370
    "locations.canal_saint_martin.description": "Passerelles en fer, platanes, écluses qui mettent vingt minutes à se remplir, et des gens assis sur le quai avec une bouteille et pas l’intention de bouger. Deux disparitions ont eu lieu à moins de quatre cents mètres d’ici et les quais sont aussi fréquentés que jamais.",
    // B · ca164818019c
    "locations.canal_saint_martin.stageImage": "story_fourth_beast/stage_canal_saint_martin",
    // A · c8f36a4afdd0
    "locations.montmartre.name": "Montmartre",
    // A · c8f36a4afdd0
    "locations.montmartre.shortName": "Montmartre",
    // B · 2bab88179eb8
    "locations.montmartre.description": "Escaliers. Plusieurs centaines, en volées, entre des rues qui sont presque des falaises avec des boutiques dessus. Des touristes en haut, la vie ordinaire en bas, et des toits à onze hauteurs différentes qui sont le meilleur endroit à Paris pour perdre quelqu’un ou se perdre.",
    // B · bf6b88e13b6d
    "locations.montmartre.stageImage": "story_fourth_beast/stage_montmartre",
    // A · 193dfe7d6948
    "locations.the_roofline.name": "La Ligne de Toits",
    // A · a0a4356b4d65
    "locations.the_roofline.shortName": "Toits",
    // B · 131bacf15c29
    "locations.the_roofline.description": "Zinc, cheminées, antennes parabolique et un système de drainage vieux de deux cents ans qui suppose que personne ne marchera jamais dessus. D’ici, Paris est une surface unique reliée avec environ neuf cents trous, et quelque chose qui court sur quatre pattes trouve ça bien plus facile que toi.",
    // B · 72e7999ec5f9
    "locations.the_roofline.stageImage": "story_fourth_beast/stage_the_roofline",
    // A · dd09b47d9b92
    "locations.belleville.name": "Belleville",
    // A · dd09b47d9b92
    "locations.belleville.shortName": "Belleville",
    // B · 342053c4dcb6
    "locations.belleville.description": "Une colline de marchés, quatre cuisines sur une même rue, un parc avec toute la ville étalée en dessous, et environ onze mille personnes qui se connaissent toutes assez bien pour remarquer un inconnu et assez pour ne pas le signaler à la police.",
    // B · 1c8aa95736a2
    "locations.belleville.stageImage": "story_fourth_beast/stage_belleville",
    // A · 321f9d521bc3
    "locations.lina_flat.name": "Le Quatrième Étage Sans Ascenseur",
    // A · a057bb1dce59
    "locations.lina_flat.shortName": "Chez Lina",
    // B · e9bd34a84f08
    "locations.lina_flat.description": "Une pièce, un matelas, un bureau, et une carte papier de Paris sur le mur avec six mois d’épingles dessus. Il y a une bouilloire allumée depuis mars. La cage d’escalier sent l’humidité et la cuisine du voisin, dans cet ordre.",
    // B · 260459e6f1be
    "locations.lina_flat.stageImage": "story_fourth_beast/stage_lina_flat",
    // A · df30b17c6c50
    "locations.the_seine.name": "Les Rives",
    // A · 6979d74664ef
    "locations.the_seine.shortName": "La Seine",
    // B · 40cea592cecc
    "locations.the_seine.description": "Quais en pierre sous la circulation, ponts tous les quatre cents mètres, et une bande de la ville où tu peux marcher pendant une heure sans presque croiser personne. Il y a des bougies sous le troisième pont et quelqu’un les remplace depuis avril.",
    // B · 4e4d22ca7dc8
    "locations.the_seine.stageImage": "story_fourth_beast/stage_the_seine",
    // A · d414e2a0066c
    "locations.police_prefecture.name": "La Préfecture",
    // A · 0bf3f78a8b56
    "locations.police_prefecture.shortName": "Préfecture",
    // B · 332f1b9f4f87
    "locations.police_prefecture.description": "Un grand bâtiment en pierre sur l’île avec une cour pleine de véhicules garés et un étage où neuf personnes travaillent depuis six mois sur des affaires liées, avec un tableau de preuves qu’ils ont commencé à garder face contre terre quand un supérieur vient.",
    // B · d864af2b1463
    "locations.police_prefecture.stageImage": "story_fourth_beast/stage_police_prefecture",
    // A · 688a9cf37e1d
    "locations.palais_royal.name": "Le Centre",
    // A · b1e72573148f
    "locations.palais_royal.shortName": "Centre",
    // B · a7ffff5f6030
    "locations.palais_royal.description": "Arcades, jardins de gravier, colonnes noir et blanc, une fontaine, et l’adresse qu’une fondation avec trois cents millions d’euros et un budget philanthropique met sur son papier à en-tête. Le bureau de Lucien Marot est à deux minutes d’un jardin où les enfants jouent en plein milieu de la journée.",
    // B · 50a0f3d0de97
    "locations.palais_royal.stageImage": "story_fourth_beast/stage_palais_royal",
    // A · ee459a8cb2fd
    "locations.service_tunnels.name": "Le Niveau des Services",
    // A · 012ab4c0e066
    "locations.service_tunnels.shortName": "Niveau des Services",
    // B · ee456bd91f7a
    "locations.service_tunnels.description": "Derrière les portes où il est écrit « accès interdit » : câbles, ventilation, quais désaffectés de lignes jamais terminées, et cent quarante ans de la ville qui se construit sous elle-même et oublie. Quatre disparitions ont eu lieu à moins de deux cents mètres d’une porte comme celles-ci.",
    // B · a99b9aa28950
    "locations.service_tunnels.stageImage": "story_fourth_beast/stage_service_tunnels",
    // A · 39aaa8e3cf9b
    "locations.the_quarries.name": "Les Carrières",
    // A · 08aa51fb7025
    "locations.the_quarries.shortName": "Carrières",
    // B · a03c69ae62df
    "locations.the_quarries.description": "Cent quatre-vingts kilomètres de galeries de calcaire sous le sud de la ville, creusées pour la pierre avant que quelqu’un pense à noter où. Froides, sèches, totalement noires, et à environ onze mètres sous l’une d’elles, les murs ne sont plus en calcaire.",
    // B · a449e8ec10be
    "locations.the_quarries.stageImage": "story_fourth_beast/stage_the_quarries",
    // A · d85939169a74
    "locations.the_boundary.name": "Là où le pierre s’arrête",
    // A · cd506284912a
    "locations.the_boundary.shortName": "La Frontière",
    // B · 0850b6d2f92e
    "locations.the_boundary.description": "Une galerie comme toutes les autres, sauf que le mur du fond n’est plus là depuis un moment. Ce qui est derrière est chaud, éclairé par rien, et a du temps. Il y a des choses qui poussent sur le calcaire sur onze mètres de recul de ce côté, et ce ne sont pas des lichens.",
    // B · 5c62b943cb36
    "locations.the_boundary.stageImage": "story_fourth_beast/stage_the_boundary",
    // B · 0b4177a2556e
    "characters.camille.name": "Camille Laurent",
    // A · 0802d34534de
    "characters.camille.role": "Vingt-et-un ans, l’autre personne compatible, et ça fait trois mois qu’elle cherche son frère sans attendre l’autorisation de personne",
    // A · 003a10a877cf
    "characters.camille.cardBlurb": "Elle prend la créature que tu laisses, et elle ne va pas remercier pour ça. Depuis mars, elle traverse cette ville toute seule, elle s’en sort mieux que toi, et elle va résoudre des pans de cette histoire que tu sois dans le coin ou pas.",
    // B · aee35f364a88
    "characters.camille.pronouns": "elle",
    // A · d2f1b655931b
    "characters.camille.publicTraits": ["Elle agit avant même que la phrase soit finie","Sarcastique et rapide, mais seulement quand ça va vite","Impossible pour elle de rester immobile dans un couloir"],
    // B · b7112137d103
    "characters.camille.hiddenDrives": ["Elle veut être celle qui le trouve, spécifiquement elle, et sait que ce n’est pas la même chose que vouloir qu’il soit retrouvé","Elle a peur que la recherche soit devenue ce qui l’empêche d’admettre qu’il est mort, et elle a pensé cette phrase sans jamais la dire"],
    // B · 931cd86ffc97
    "characters.camille.values": ["Faire quelque chose aujourd’hui plutôt que d’attendre l’institution qui l’a déjà laissée tomber une fois","Sortir les victimes d’abord et gérer les crédits après, si jamais"],
    // B · 3675dc6b8302
    "characters.camille.fears": ["Que Théo soit parti avant qu’elle ne commence et qu’elle ait passé trois mois à se construire une raison de ne pas le savoir","De devenir quelqu’un qui traite la pire nuit des autres comme une matière"],
    // A · db68b9c09142
    "characters.camille.socialStyle": "Directe jusqu’à la rudesse sous pression, et après elle trouve ça drôle. Elle répond toujours à une question par un plan. Elle dit la chose gentille tout en allant déjà vers la porte.",
    // B · 11be15fd8c7a
    "characters.camille.boundaries": ["Ne sera pas avec quelqu’un qui traite les attaques comme un divertissement, et la deuxième fois sera la dernière","Ne laissera pas un civil dans un bâtiment pour courir après quelqu’un, et mettra fin à un partenariat pour ça"],
    // B · 38bbb91ed692
    "characters.camille.goals": ["Trouver Théo, vivant si c’est encore possible","Être la personne qui arrête ça, plutôt que celle qui était près de celle qui l’a arrêté"],
    // B · 23df806d038e
    "characters.camille.secrets.camille_the_sample.fact": "Elle est entrée par effraction sur une scène interdite en avril et a pris un fragment de tissu avant d’avoir jamais entendu parler de Morel. Elle l’a gardé parce qu’elle ne lui fait pas entièrement confiance.",
    // B · 47558a04be8d
    "characters.camille.secrets.camille_the_sample.visibility": "NPC_PRIVATE",
    // B · c8cc1f1111e3
    "characters.camille.secrets.camille_the_sample.revealHint": "Elle le montre elle-même, vite et sans cérémonie, au moment où le cacher ferait du mal à quelqu’un.",
    // B · 5ad2dd5a308f
    "characters.camille.secrets.camille_the_draft.fact": "Le téléphone de Théo a un message non envoyé de quatre mots, et elle l’a lu environ neuf cents fois sans jamais dire à personne ce qu’il dit.",
    // B · 47558a04be8d
    "characters.camille.secrets.camille_the_draft.visibility": "NPC_PRIVATE",
    // B · 2bf933095e41
    "characters.camille.secrets.camille_the_draft.revealHint": "Elle dit les quatre mots à voix haute à quelqu’un qui vient de lui parler de sa propre famille sans qu’on lui demande.",
    // A · 0d6ed0ada9fd
    "characters.camille.speechStyle": "Contemporaine, rapide, et plus brève quand ça devient sérieux. Le sarcasme arrive vite et disparaît complètement si quelqu’un est vraiment en danger. Elle répond aux questions avec un plan, ne fait jamais de discours, et elle supporte mal d’être dans une pièce quand quelqu’un d’autre est là.",
    // A · ac3e339f8c71
    "characters.camille.topics": ["Théo","les lieux","ce qu’elle a pris","sa bête","la police","ce que tu as fait hier soir"],
    // A · 1d1b4444b942
    "characters.camille.voiceSamples": ["Super. Tu as choisi en premier, je prends ce qui reste, et on fait comme si c’était scientifique. Laquelle tu prends pour que je commence à gérer ?","Troisième avril, rue Bichat, j’étais dans la zone pendant quatre-vingt-dix secondes. Oui, c’était stupide. Mais c’est aussi la seule preuve matérielle que quiconque en dehors d’un coffre de police a, alors bon.","Il a dix-neuf minutes de retard et Théo n’est jamais en retard, c’était tout son truc, c’était sa blague — désolée. Oui. On y va.","Ne les filme pas. Je me fiche de tes raisons, range ton téléphone, ce sont des proches, et ils sont au sol."],
    // B · 17d5dd4c6c58
    "characters.camille.appearance": "Vingt-et-un ans, cheveux courts espresso marron juste au-dessus des épaules avec une frange en bataille, yeux vert pâle, silhouette de coureuse, veste noire courte sur un haut crème, pantalon cargo charbon et baskets qui ont beaucoup vu Paris.",
    // B · e92b610b2b7c
    "characters.camille.visualHook": "Une chaîne argentée portée dehors sur le col qu’elle met dans sa bouche quand elle réfléchit et qu’elle nie faire.",
    // B · f3f01fe1974d
    "characters.camille.silhouette": "Demi-tournée, déjà en mouvement, bandoulière de sac en travers de la poitrine.",
    // B · 3320c6ae49dd
    "characters.camille.artSeed": "fb-camille-01",
    // B · 8df32a00c1b9
    "characters.camille.portrait": "story_fourth_beast/camille",
    // B · 489b871cfbfe
    "characters.camille.expressions": ["neutre","ironique","urgent","furieux","défait"],
    // B · 79eeaa8928f4
    "characters.camille.knowledgeScope": ["camille","theo","the_sites","canal_saint_martin","the_police","the_sample"],
    // B · 3b43ecbd4b9a
    "characters.camille.gates.camille_works_with_you.label": "Elle partage une piste au lieu de te la voler",
    // B · 9e8ae18bf8bf
    "characters.camille.gates.camille_works_with_you.kind": "ALLIANCE",
    // B · 9976aa442fc9
    "characters.camille.gates.camille_shows_you_the_phone.label": "Elle te dit quels sont les quatre mots",
    // B · 55a54e80451a
    "characters.camille.gates.camille_shows_you_the_phone.kind": "CONFIANCE",
    // B · eec27e752f89
    "characters.camille.gates.camille_closer.label": "Aucun des deux ne parle plus de partenariat",
    // B · 0b75bc536447
    "characters.camille.gates.camille_closer.kind": "ROMANCE",
    // B · a3f5c50e992a
    "characters.camille.scouting.revealCopy": "Elle est au coin avant que tu arrives. « Tu montes toujours, » dit-elle. « À chaque fois. C’est une habitude très constante pour quelqu’un qui est poursuivi. »",
    // B · accf2b8010de
    "characters.camille.combatant.tags": ["manipulatrice"],
    // B · a2f15627bd4a
    "characters.lucien.name": "Lucien Marot",
    // A · 1fb325f7cc02
    "characters.lucien.role": "Trente-quatre ans, une fondation, un budget de mécénat, beaucoup de disparus, et une créature qui l’a choisi plutôt que l’inverse",
    // A · 43d610098175
    "characters.lucien.cardBlurb": "Tu le rencontreras lors d’une soirée de levée de fonds avant de le croiser ailleurs, et il sera un bon compagnon. Il pense que la ville a passé mille ans à exclure tout ce qu’elle ne pouvait pas domestiquer, et il va faire en sorte que ça cesse, sans jamais hausser le ton.",
    // B · fcca6b746d0b
    "characters.lucien.pronouns": "il/lui",
    // A · 4138229e463f
    "characters.lucien.publicTraits": ["Calme à en être apaisant","Vraiment curieux d’une petite question","Retient le nom de tous les animaux"],
    // B · 0d22f18b0c22
    "characters.lucien.hiddenDrives": ["Il veut que quelqu’un soit d’accord avec son raisonnement plutôt que d’en avoir peur, et il est seul avec cet argument depuis onze ans","Il sait qu’Alba reste avec lui par choix et a commencé à organiser les choses pour qu’elle continue de choisir"],
    // B · 70fd01d20b01
    "characters.lucien.values": ["Tout ce qui est vivant, pondéré de manière égale, ce qui est toute son horreur","La patience, qu’il considère comme la seule vraie différence entre lui et les gens qu’il prend"],
    // B · 38281b769df1
    "characters.lucien.fears": ["Que la frontière se referme et que tout ce qui est de l’autre côté cesse d’exister pour quiconque ici","Qu’Alba décide que ce n’est pas ce qu’elle veut, ce qu’il n’a jamais testé et ne testera jamais"],
    // A · ce1edfcb9d5c
    "characters.lucien.socialStyle": "Détendu, chaleureux et pleinement là. Il te demande comment tu vas et écoute ta réponse. Ne remplit jamais un silence, jamais gêné par l’absence de paroles. La violence n’est pas un autre registre — elle naît de ce même calme et y retourne.",
    // B · 7919baf193e0
    "characters.lucien.boundaries": ["Ne fera jamais de mal à un animal, en aucune circonstance, même si l’animal l’attaque","Ne mentira jamais à quelqu’un qu’il a décidé de recruter, ce qui est la chose la plus désarmante chez lui"],
    // B · ce6f90f0d980
    "characters.lucien.goals": ["Maintenir la frontière sous les carrières ouverte assez longtemps pour qu’elle n’ait plus besoin d’être maintenue","Découvrir si l’un des deux personnes de Morel peut être parlé plutôt qu’enlevé"],
    // B · 5a2a2f92278f
    "characters.lucien.secrets.lucien_the_people.fact": "Les enlevés sont vivants, la plupart d’entre eux, sous les carrières. Il prend des gens dont les systèmes nerveux sont presque compatibles parce que la frontière a besoin de tissus vivants synchronisés pour rester ouverte.",
    // B · 47558a04be8d
    "characters.lucien.secrets.lucien_the_people.visibility": "NPC_PRIVATE",
    // B · f1c1cbd2cc7b
    "characters.lucien.secrets.lucien_the_people.revealHint": "Il l’explique clairement, sans qu’on le pousse, à quiconque lui demande ce qu’il fait plutôt que de l’accuser.",
    // B · 98fa42da6e1c
    "characters.lucien.secrets.lucien_and_morel.fact": "Lui et Morel ont publié ensemble, il y a onze ans, sur les échafaudages développementaux. Morel a quitté le travail et Lucien non, et aucun des deux ne l’a jamais dit à l’autre depuis.",
    // B · 47558a04be8d
    "characters.lucien.secrets.lucien_and_morel.visibility": "NPC_PRIVATE",
    // B · 7f240f4af7aa
    "characters.lucien.secrets.lucien_and_morel.revealHint": "Ça sort de Morel, mal, quand quelqu’un prononce le nom Marot au labo.",
    // A · 4c4a5ad0eac9
    "characters.lucien.speechStyle": "Calme, complet et naturel, au rythme d’un dîner agréable. Pose de petites questions précises et attend la réponse. Ne menace jamais, ne hausse jamais la voix, décrit l’horreur avec le même ton que le vin. Emploie « nous » pour les êtres vivants en général, et « ils » pour les institutions.",
    // A · d2b2ec1a21cb
    "characters.lucien.topics": ["la frontière","Alba","à quoi sert une ville","Morel","les personnes qu’il a prises","ta bête"],
    // A · 8c641bfcb6c6
    "characters.lucien.voiceSamples": ["C’est un bel animal. Regarde ses épaules — ce n’est pas un dessin, personne ne l’a dessiné, c’est onze millions d’années de quelque chose qui trouve sa réponse.","Ils sont vivants. La plupart. Je préfère que tu l’entendes de ma bouche plutôt que que tu le comprennes seul et que tu passes deux semaines à craindre le pire.","Une ville, c’est un long débat sur ce qu’on laisse vivre en elle. Paris mène ce débat depuis le XIIe siècle. Je ne suis pas sûr que gagner soit la bonne issue.","Alba n’est pas à moi. Elle reste. Ce ne sont pas les mêmes phrases et c’est la seule chose dont je sois fier."],
    // B · ed8d27483d91
    "characters.lucien.appearance": "Trente-quatre ans, cheveux noirs peignés en arrière, yeux foncés, un manteau gris pâle toujours adapté à la météo, et absolument rien de remarquable jusqu’au moment où il bouge.",
    // B · 023f96aa46e9
    "characters.lucien.visualHook": "Un manteau gris pâle, impeccable, dans une ville où il pleut depuis une semaine.",
    // B · 1a8dc4e8fa0f
    "characters.lucien.silhouette": "Debout, les mains jointes mollement devant lui, totalement détendu, occupant très peu de place.",
    // B · 7f7b63804a4f
    "characters.lucien.artSeed": "fb-lucien-01",
    // B · 59c85ae71292
    "characters.lucien.portrait": "story_fourth_beast/lucien",
    // B · e1c6fea0a701
    "characters.lucien.expressions": ["neutre","attentif","ravi","regrettant","immobile"],
    // B · 2aa2849cd139
    "characters.lucien.knowledgeScope": ["lucien","alba","la_frontière","les_carrières","morel","tissu_phase"],
    // B · b8b32d0e858f
    "characters.lucien.gates.lucien_will_talk.label": "Il te donne le vrai raisonnement",
    // B · 77dcad9b37cc
    "characters.lucien.gates.lucien_will_talk.kind": "AUTRE",
    // B · 85ec434f901a
    "characters.lucien.gates.lucien_will_talk.requires.flagsSet": ["parlé :lucien"],
    // B · 7186795cb515
    "characters.lucien.gates.lucien_offers.label": "Il t’offre ce qu’il n’a jamais offert à personne",
    // B · 77dcad9b37cc
    "characters.lucien.gates.lucien_offers.kind": "AUTRE",
    // B · aa79582e0733
    "characters.lucien.scouting.revealCopy": "Il n’est plus là où il était et on ne l’a pas vu bouger. « Tu y vas en premier, » dit-il derrière toi, content pour toi. « À chaque fois. C’est très loyal de votre part à tous les deux. »",
    // B · 606991a9f050
    "characters.lucien.combatant.tags": ["phase","lié"],
    // B · 54ded64685be
    "characters.lina.name": "Lina Haddad",
    // A · 04536eaca23a
    "characters.lina.role": "Étudiante en journalisme, vingt-trois ans, et la seule à Paris à avoir cartographié les disparitions avant les autorités",
    // A · 4fd9bafe1224
    "characters.lina.cardBlurb": "Elle a six mois d’épingles sur un mur et quatre d’entre elles sont presque au même endroit. Elle te donnera tout ce qu’elle a tout de suite, parce qu’elle a compris que garder ses infos ne protège personne, et elle verra en un jour que ton sac bouge tout seul.",
    // B · aee35f364a88
    "characters.lina.pronouns": "elle/elle",
    // A · 0abc341346a5
    "characters.lina.publicTraits": ["Parle avec les mains et un téléphone dans l’une d’elles","Corrige les faits en pleine phrase, avec bienveillance","Nourrit tous ceux qui viennent chez elle, qu’ils le veuillent ou non"],
    // B · 9f0b06cc832a
    "characters.lina.hiddenDrives": ["Elle veut que l’article soit publié sous son nom et a honte de le vouloir autant","Elle porte un message de quelqu’un qui était déjà officiellement disparu quand il l’a envoyé, et elle ne l’a pas donné à la police parce qu’elle ne leur fait pas confiance"],
    // B · 237fe2e6923e
    "characters.lina.values": ["Les sources avant les histoires. Elle a tué deux articles pour protéger des gens et n’en parle pas","Faire juste, avec un niveau de pédanterie qui lui a coûté deux amitiés"],
    // B · ecdf1ebb2082
    "characters.lina.fears": ["Que quelqu’un meure parce qu’il lui a fait confiance","Avoir raison sur tout ça trop tard pour que ça compte pour quelqu’un"],
    // A · fc3530dae7d4
    "characters.lina.socialStyle": "Une familiarité immédiate, presque inquiétante, mais non. Pose les questions indiscrètes avec entrain et accepte un refus sans insister. Prépare du thé comme méthode d’interrogatoire.",
    // B · e5e7c0e4e100
    "characters.lina.boundaries": ["Ne publiera jamais rien qui identifie une source vivante, peu importe le coût pour l’article","Ne se laissera pas utiliser comme canal par quelqu’un qui ne lui dira pas ce qu’elle porte"],
    // B · 71dc6b0fbb3c
    "characters.lina.goals": ["Prouver que les disparitions sont une seule chose, à l’écrit, avec des sources qui résistent à un avocat","Découvrir d’où vient un message quand la personne qui l’a envoyé était disparue depuis neuf jours"],
    // B · 8fe4afa71fcc
    "characters.lina.secrets.lina_the_message.fact": "Une victime a envoyé un message onze jours après sa disparition officielle. Le routage le place sous la ville. Elle n’en a parlé à personne, ni à la police, ni à son rédacteur en chef.",
    // B · 47558a04be8d
    "characters.lina.secrets.lina_the_message.visibility": "NPC_PRIVATE",
    // B · 1bbfdd5f8c54
    "characters.lina.secrets.lina_the_message.revealHint": "Elle le montre à la première personne qui lui dit quelque chose de vrai qui lui coûte, et elle veut que ce soit traité avec précaution plutôt que gardé secret.",
    // B · e03fde8edb1b
    "characters.lina.secrets.lina_the_offers.fact": "La fondation l’a approchée trois fois pour acheter la carte. La troisième approche était polie d’une manière qui l’a effrayée, et elle ne l’a pas encore reliée à l’histoire.",
    // B · 47558a04be8d
    "characters.lina.secrets.lina_the_offers.visibility": "NPC_PRIVATE",
    // B · 567a0cc290ef
    "characters.lina.secrets.lina_the_offers.revealHint": "Ça lui échappe en parlant d’argent, et elle s’arrête en plein milieu de la phrase.",
    // A · d4cd1a1d26fb
    "characters.lina.speechStyle": "Rapide, sceptique, désarme socialement. Interrompt pour vérifier un détail et s’excuse sans ralentir. Dénonce les absurdités d’emblée et avec bonne humeur, y compris les siennes. Finit les sujets sérieux par une question pratique, pas un sentiment.",
    // A · 79b4f69ce310
    "characters.lina.topics": ["la carte","le message","les victimes","ce que la police a","sa part","la fondation"],
    // A · 32141bc4666a
    "characters.lina.voiceSamples": ["Six mois, vingt-deux personnes, et la Préfecture continue de dire « pas de lien établi » au présent. Assieds-toi, il y a du thé, je vais te montrer un mur.","Attends — tu as dit quart après. Le rapport dit et demie. Lequel, parce que l’un fait tenir toute la chronologie et pas l’autre.","Il l’a envoyé onze jours après qu’il ait cessé d’exister selon le ministère. Je l’ai sur mon téléphone depuis juin et je ne l’ai donné à personne, et franchement, j’aimerais ne plus être la seule à le détenir.","Pas son nom. Pas sa rue, pas son job, pas l’école. Tu peux tout avoir sauf ce qui fait lui."],
    // B · 72a43512d92e
    "characters.lina.appearance": "Vingt-trois ans, franco-algérienne, longs cheveux bouclés foncés, yeux marron, une veste en cuir trop grande plus vieille que son diplôme, des bottes ressemelées, et un téléphone toujours en main.",
    // B · ff7af3dcd3ba
    "characters.lina.visualHook": "Une veste en cuir trop grande et craquelée avec trois pins émaillés sur le revers gauche et rien à droite.",
    // B · 8cbbc31c599f
    "characters.lina.silhouette": "Assise jambes croisées par terre devant un mur de papiers, un bras levé pour le montrer.",
    // B · 70aa6c092b1e
    "characters.lina.artSeed": "fb-lina-01",
    // B · d42133764830
    "characters.lina.portrait": "story_fourth_beast/lina",
    // B · e35c2bc48051
    "characters.lina.expressions": ["neutre","animée","sceptique","ravie","effrayée"],
    // B · 49b3ae167c0b
    "characters.lina.knowledgeScope": ["lina","la_carte","les_victimes","belleville","le_message","la_fondation"],
    // B · 0faac9328685
    "characters.lina.gates.lina_shows_you_the_message.label": "Elle te montre ce qu’elle porte depuis juin",
    // B · 55a54e80451a
    "characters.lina.gates.lina_shows_you_the_message.kind": "CONFIANCE",
    // B · 5709bb8a4a25
    "characters.lina.gates.lina_shows_you_the_message.requires.flagsSet": ["parlé :lina"],
    // B · e24aad83437a
    "characters.lina.gates.lina_closer.label": "Elle arrête de faire le thé au lieu de le dire",
    // B · 0b75bc536447
    "characters.lina.gates.lina_closer.kind": "ROMANCE",
    // B · 8d234559d531
    "characters.lina.combatant.tags": ["civil"],
    // B · 3eb890b5cc05
    "characters.morel.name": "Étienne Morel",
    // A · 03320879b90a
    "characters.morel.role": "Le biologiste qui a fait pousser trois animaux dans un sous-sol parce que rien d’autre au monde ne pouvait atteindre l’homme qui fait ça.",
    // A · b28d702a2a00
    "characters.morel.cardBlurb": "Il t’a trouvé dans une base de données et t’a envoyé quatre phrases, et maintenant il y a quelque chose dans ton sac qui mourra sans toi. Il est brillant, dépassé, et il va te demander encore une chose parce qu’il n’y a personne d’autre à qui s’adresser.",
    // B · fcca6b746d0b
    "characters.morel.pronouns": "il/lui",
    // A · 0bcbf67b9167
    "characters.morel.publicTraits": ["Donne la réponse que tu aurais dû demander","Oublie de manger et remarque quand les autres mangent","S’excuse sans cesse sans rien changer"],
    // B · c50d8ea00bcb
    "characters.morel.hiddenDrives": ["Il veut être pardonné d’avoir construit ça, par eux, ce qui est impossible, et il a organisé toute sa vie pour ne pas penser cette phrase","Il essaie de savoir s’il peut lâcher ça avant que ça ne coûte la vie à un jeune, et il connaît déjà la réponse"],
    // B · a21ec5824771
    "characters.morel.values": ["Les animaux, individuellement, par leur nom, au-dessus du travail et de lui-même","Être celui qui dit la vérité effrayante dans une pièce où tout le monde préférerait qu’il ne le fasse pas"],
    // B · 26ae0b9bd132
    "characters.morel.fears": ["Que les trois soient du même type d’acte que ce qu’il essaie d’arrêter","Voir un garçon de dix-neuf ans porter la conséquence d’une décision qu’il a prise seul à quatre heures du matin"],
    // A · a1839013c1da
    "characters.morel.socialStyle": "Chaleureux, distrait, toujours un peu à la traîne socialement et quatre longueurs d’avance sur tout le reste. Il explique trop puis s’arrête net en s’entendant parler. Pose la main sur la vitre d’un habitat en parlant sans s’en rendre compte.",
    // B · e1cf66844250
    "characters.morel.boundaries": ["Il ne mettra pas une créature devant une arme pour prouver une hypothèse, et a refusé deux fois des financements à cause de ça","Il ne dira pas à quelqu’un que le lien est sûr, parce que ce n’est pas le cas, et être obligé de le dire le met en colère comme rien d’autre"],
    // B · 316890992364
    "characters.morel.goals": ["Garder les trois vivants, ce qui n’est plus vraiment entre ses mains","Comprendre le tissu assez pour le stabiliser sans un humain de l’autre côté"],
    // B · b45d0f734db0
    "characters.morel.secrets.morel_the_others.fact": "Trois ont survécu. Onze n’ont pas survécu, en quatorze mois, et il était présent pour les onze, avec leurs poids et dates notés dans un carnet que personne n’a vu.",
    // B · 47558a04be8d
    "characters.morel.secrets.morel_the_others.visibility": "NPC_PRIVATE",
    // B · 4ea856a7b7d8
    "characters.morel.secrets.morel_the_others.revealHint": "Il dit ce nombre à voix haute, une fois, quand on lui demande si le lien est dangereux et qu’il refuse une réponse rassurante.",
    // B · caf23a19a6a9
    "characters.morel.secrets.morel_and_marot.fact": "Il a publié avec Lucien Marot il y a onze ans sur les échafaudages du développement, a abandonné le travail, et n’a jamais dit que l’homme qui fait ça utilise ce qu’ils ont construit ensemble.",
    // B · 47558a04be8d
    "characters.morel.secrets.morel_and_marot.visibility": "NPC_PRIVATE",
    // B · feb8b143d152
    "characters.morel.secrets.morel_and_marot.revealHint": "Ça sort mal, en plein milieu d’une phrase, la première fois que quelqu’un prononce le nom Marot dans son labo.",
    // A · 490ee6ceb090
    "characters.morel.speechStyle": "Précis sur la biologie, vague pour le reste. Commence une explication, se rend compte que c’est trop long, et s’arrête au milieu. Emploie toujours les noms des créatures, jamais « sujet ». S’excuse comme ponctuation sans vraiment s’excuser.",
    // A · f2f547a0bf0d
    "characters.morel.topics": ["le tissu","le lien","eux trois","ce qu’il a perdu","Marot","ce que tu dois surveiller"],
    // A · 26dcf3578a75
    "characters.morel.voiceSamples": ["Ce n’est pas une armure, ni un champ de force. Quelque chose autour de lui empêche le contact direct — le coup arrive, mais il touche ailleurs, un peu à côté. Désolé. C’est tout ce que je sais.","Onze. Sur quatorze mois. J’étais là à chaque fois, j’ai noté leur poids, et tu m’as demandé si c’était dangereux, voilà ma réponse.","Ne l’appelle pas un sujet dans cette pièce. Il a un nom. Je lui en ai donné un le deuxième jour, je sais que c’était pas pro, et c’est la chose la moins pro dans toute cette histoire.","J’en ai créé trois, j’ai trouvé deux personnes. Je pense à cette phrase tous les jours depuis mars, et elle ne s’est pas améliorée."],
    // B · 84a98ca5397b
    "characters.morel.appearance": "Cinquante ans, grand et un peu voûté, gris sur les côtés, un cardigan sous une blouse de labo, aucun des deux pas lavés récemment, et des mains toujours occupées à faire quelque chose de petit et précis.",
    // B · cdc1fa1ea35d
    "characters.morel.visualHook": "Un cardigan sous une blouse de labo ouverte, tous deux avec le même trou de brûlure sur le poignet gauche.",
    // B · 9b5b1af45f35
    "characters.morel.silhouette": "Debout, une paume à plat sur la vitre d’un habitat, la tête penchée vers elle.",
    // B · 1abb17c1bbd5
    "characters.morel.artSeed": "fb-morel-01",
    // B · 41d4f285a1e7
    "characters.morel.portrait": "story_fourth_beast/morel",
    // B · a6addec099d4
    "characters.morel.expressions": ["neutre","absorbé","anxieux","doux","misérable"],
    // B · 233adaf637c9
    "characters.morel.knowledgeScope": ["morel","tissu_phase","le_lien","laboratoire_beraud","les_trois","marot"],
    // B · 5f1aa3cc70b6
    "characters.morel.gates.morel_tells_you_the_number.label": "Il te dit combien n’ont pas survécu",
    // B · 55a54e80451a
    "characters.morel.gates.morel_tells_you_the_number.kind": "CONFIANCE",
    // B · 6068e210249e
    "characters.morel.gates.morel_tells_you_the_number.requires.flagsSet": ["parlé :morel"],
    // B · b41dbaf3a356
    "characters.morel.gates.morel_says_the_name.label": "Il te dit avec qui il publiait avant",
    // B · 55a54e80451a
    "characters.morel.gates.morel_says_the_name.kind": "CONFIANCE",
    // B · 8d234559d531
    "characters.morel.combatant.tags": ["civil"],
    // B · 057d3822d892
    "characters.ravel.name": "Inès Ravel",
    // A · 60a222d5dbc7
    "characters.ravel.role": "Commandante, trente-sept ans, elle gère six mois d’enquêtes liées depuis un bureau où le tableau des preuves est retourné à chaque fois qu’un supérieur passe.",
    // A · ebd8ce22eeab
    "characters.ravel.cardBlurb": "Elle a vu un homme se faire tirer dessus et continuer à marcher, et elle a laissé ça de côté dans son rapport parce qu’elle sait ce qui arrive à son affaire le jour où elle met ça par écrit. Elle ne va pas te confier un animal impossible, mais au bout de quinze jours elle aura besoin de toi et de lui.",
    // B · aee35f364a88
    "characters.ravel.pronouns": "elle",
    // A · afe424ed101f
    "characters.ravel.publicTraits": ["Elle note ce que tu dis et te lit ta phrase en retour","Elle n’élève jamais la voix face à un subordonné","On voit bien qu’elle compte les heures depuis qu’elle est réveillée"],
    // B · 19eee7e2051b
    "characters.ravel.hiddenDrives": ["Elle veut être celle qui clôt l’affaire, et sait qu’au moment où ça remonte, ça cesse d’être un dossier pour devenir un dossier de sécurité nationale sans victimes.","Elle a commencé à envisager de sortir de la loi, et elle surveille ça en elle comme elle le ferait pour quelqu’un d’autre."],
    // B · 4059ac8a806f
    "characters.ravel.values": ["Les vingt-deux familles, dont elle peut réciter les noms par cœur dans l’ordre","La procédure, jusqu’au moment où la procédure fait tuer des gens"],
    // B · 752a81af2680
    "characters.ravel.fears": ["Être écartée de son propre dossier par des gens qui vont le classer et arrêter de chercher","Qu’elle ait déjà vu ce qui aurait résolu le dossier mais ne l’ait pas noté parce que ça semblait fou"],
    // A · 806f5f2e233a
    "characters.ravel.socialStyle": "Correcte, posée, et totalement désabusée. Elle laisse le silence s’installer au-delà du confortable. Traite un dix-neuf ans exactement comme un magistrat, ce que les gens trouvent soit respectueux, soit terrifiant selon leurs attentes.",
    // B · fbd851056575
    "characters.ravel.boundaries": ["Ne mettra pas un civil devant, et a refusé un supérieur pour ça","Ne prendra pas de preuves dont elle ne peut pas dire la provenance, ce qui est le plus gros obstacle de cette histoire"],
    // B · 75d9aa67f27a
    "characters.ravel.goals": ["Arrêter le prochain, qui est la seule unité de succès qu’elle accepte","Comprendre ce qu’elle regarde sans confier le dossier à ceux qui vont l’enterrer"],
    // B · c9d52d42cd1e
    "characters.ravel.secrets.ravel_saw_it.fact": "Le 2 mai, elle a tiré quatre balles sur un homme à onze mètres et l’a vu s’éloigner, et son rapport dit que la cible a fui avant qu’elle ne tire.",
    // B · 47558a04be8d
    "characters.ravel.secrets.ravel_saw_it.visibility": "PNJ_PRIVÉ",
    // B · d0d4d64a7484
    "characters.ravel.secrets.ravel_saw_it.revealHint": "Elle le dit calmement à quelqu’un qui vient de lui montrer quelque chose qui n’est pas la chose la plus étrange dans la pièce.",
    // B · beabeaf43536
    "characters.ravel.secrets.ravel_the_phone.fact": "Elle a le téléphone de Théo Laurent dans un casier à preuves avec un brouillon non envoyé, et elle ne l’a pas rendu à la famille parce que ça mettrait fin à son dernier fil encore actif.",
    // B · 47558a04be8d
    "characters.ravel.secrets.ravel_the_phone.visibility": "PNJ_PRIVÉ",
    // B · 32f96a1ff142
    "characters.ravel.secrets.ravel_the_phone.revealHint": "Elle l’admet à quelqu’un qui demande des nouvelles de la famille plutôt que du dossier, et elle n’est pas à l’aise avec ça.",
    // A · 566bca153e4e
    "characters.ravel.speechStyle": "Professionnelle, posée et un peu lente. Elle répète ta phrase en changeant un mot pour te montrer ce qui cloche. Pas de jargon, pas de mots rassurants, pas d’usage du rang. Elle nomme tout le monde, y compris les victimes, à chaque fois.",
    // A · 319cc687a930
    "characters.ravel.topics": ["les vingt-deux","le deux mai","les preuves","ce que veulent ses supérieurs","Théo Laurent","ce que tu faisais là"],
    // A · 695229b7aeb5
    "characters.ravel.voiceSamples": ["Tu as dit que tu passais. Passais. À deux heures du matin, dans une rue avec une seule entrée, à quatre cents mètres d’une scène toujours bouclée.","Vingt-deux. Je peux tous te les donner dans l’ordre et où ils allaient. Ce n’est pas un exercice de mémoire, c’est ce qui fait que c’est une affaire et pas un phénomène.","Deux mai. Quatre balles, onze mètres, il ajuste son manteau et continue de marcher. Mon rapport dit qu’il s’est enfui avant. Tu peux deviner pourquoi mon rapport dit ça.","Si ça monte, ça devient un dossier sans famille dedans. Il me reste neuf jours pour empêcher ça, alors on va pas en perdre un à discuter de si tu passais ou non."],
    // B · 066837e7024a
    "characters.ravel.appearance": "Trente-sept ans, cheveux foncés attachés et qui se défont dans l’après-midi, long manteau bleu marine porté à l’intérieur, et la fatigue spécifique de quelqu’un au sixième mois d’un dossier sans arrestations.",
    // B · 44d61ab077be
    "characters.ravel.visualHook": "Un manteau bleu marine gardé à l’intérieur dans toutes les pièces, y compris son bureau.",
    // B · 7d66ff2037ff
    "characters.ravel.silhouette": "Debout au bout d’une table, les deux mains à plat dessus, penchée en avant.",
    // B · d7a51b613623
    "characters.ravel.artSeed": "fb-ravel-01",
    // B · 691c1ae30518
    "characters.ravel.portrait": "story_fourth_beast/ravel",
    // B · 1adb649789e2
    "characters.ravel.expressions": ["neutre","calme","sceptique","sombre","soulagée"],
    // B · 743e96e2ab6d
    "characters.ravel.knowledgeScope": ["ravel","l’enquête","les victimes","préfecture_de_police","le_deux_mai"],
    // B · 2ffab72cd291
    "characters.ravel.gates.ravel_off_the_record.label": "Elle enlève son manteau et ferme la porte",
    // B · 55a54e80451a
    "characters.ravel.gates.ravel_off_the_record.kind": "CONFIANCE",
    // B · ccd41fbe1865
    "characters.ravel.gates.ravel_will_act.label": "Elle agira sans attendre quelque chose d’admissible",
    // B · 9e8ae18bf8bf
    "characters.ravel.gates.ravel_will_act.kind": "ALLIANCE",
    // B · 7cccc0e984fb
    "characters.ravel.combatant.tags": ["police"],
    // B · 4140e88b9b2b
    "characters.theo.name": "Théo Laurent",
    // A · cbb4887585a7
    "characters.theo.role": "Vingt-quatre ans, disparu depuis mars, et — si quelqu’un descend là-bas — pas mort.",
    // A · a35e4c6672fe
    "characters.theo.cardBlurb": "Sa sœur le cherche depuis le trois avril. Il est à onze mètres sous une galerie de carrière avec dix-neuf autres, il est éveillé presque tout le temps, et ce qu’il a compris là-bas est ce que personne d’autre dans cette histoire pourrait te dire d’aussi utile.",
    // B · fcca6b746d0b
    "characters.theo.pronouns": "il",
    // A · 36ff19d61e24
    "characters.theo.publicTraits": ["Parle sans cesse à la première personne à portée, pour survivre","Compte les jours sur un mur avec un système qu’il a dû inventer","Drôle au possible dans des circonstances insupportables"],
    // B · 85629bab7925
    "characters.theo.hiddenDrives": ["Il a décidé de ne pas sortir et gère tout le monde là-dessous en partant de ce principe depuis onze semaines","Il est terrifié par ce que sa sœur est devenue en le cherchant, et cette peur est plus présente que sa propre situation"],
    // B · ee1f0375d196
    "characters.theo.values": ["Les dix-neuf autres, dont il garde noms et dates parce que personne d’autre ne le ferait","Être franc avec quelqu’un sur une mauvaise situation, ce qu’il considère comme le seul respect possible là-dessous"],
    // B · d6b23a579a17
    "characters.theo.fears": ["Que Camille descende ici, ce qu’il a passé trois mois à essayer d’empêcher par tous les moyens","Que la chose de l’autre côté ne soit pas hostile et que ça ne soit la faute de personne"],
    // A · 17d3390efbe0
    "characters.theo.socialStyle": "Immédiatement et de façon épuisante, il est sympa, parce que ça marche et parce que l’autre option c’est le silence. Il renvoie tout ce qui le concerne en question vers toi. Il se tait une fois par conversation, puis revient.",
    // B · 7a8975bf760b
    "characters.theo.boundaries": ["Il ne se fera pas sortir avant les autres, et bloquera physiquement quiconque essaie","Il ne mentira pas aux dix-neuf sur ce qui se passe, et ne l’a pas fait, au prix fort"],
    // B · 8979a84a6ea6
    "characters.theo.goals": ["Faire monter vingt personnes par un escalier de carrière, ce qu’il a planifié en détail sans moyen de l’exécuter","Faire passer un message à sa sœur qui ne soit pas les quatre mots sur son téléphone"],
    // B · 605581d3218a
    "characters.theo.secrets.theo_the_synchronisation.fact": "La frontière est maintenue ouverte par des systèmes nerveux vivants synchronisés. Il l’a compris dans les deux premières semaines, à partir de ce qui arrive à la lumière quand quelqu’un dort là-dessous.",
    // B · 47558a04be8d
    "characters.theo.secrets.theo_the_synchronisation.visibility": "PNJ_PRIVÉ",
    // B · b092a68bbd08
    "characters.theo.secrets.theo_the_synchronisation.revealHint": "Il le dit dans les deux premières minutes à quiconque arrive, parce qu’il attend ça depuis trois mois.",
    // B · c62233f029df
    "characters.theo.secrets.theo_the_deal.fact": "Lucien lui a parlé onze fois et lui a sincèrement proposé de le laisser partir. Théo a refusé à chaque fois parce que l’offre n’a jamais inclus les dix-neuf autres.",
    // B · 47558a04be8d
    "characters.theo.secrets.theo_the_deal.visibility": "NPC_PRIVÉ",
    // B · 410035587c9e
    "characters.theo.secrets.theo_the_deal.revealHint": "Il en parle comme une blague, mal, puis ne finit pas la blague.",
    // A · 50066a3e9ae1
    "characters.theo.speechStyle": "Chaleureux, rapide, toujours en train d’esquiver, avec un rythme de blague qui rate systématiquement la chute. Il transforme toutes les questions sur lui en questions sur toi. Il compte — les jours, les gens, les mètres — avec une précision parfaite au milieu de phrases plutôt libres.",
    // A · 093d39eb797b
    "characters.theo.topics": ["les dix-neuf","la lumière","Camille","ce que Marot a proposé","depuis combien de temps","la sortie"],
    // A · 8ed4e79fe53c
    "characters.theo.voiceSamples": ["Quatre-vingt-quatre jours. Dix-neuf autres, douze d’entre eux parlent encore. Tu es la première personne dans cet escalier qui ne portait pas quelqu’un, donc — bon, désolé, salut, qui es-tu ?","La lumière cloche quand on dort. Tous en même temps, elle baisse. Ça m’a pris deux semaines. Personne ici n’a rien à faire à part remarquer des choses.","Elle va bien ? Pas la tête. Je connais la tête par cœur, ma mère a inventé la tête.","Il m’a demandé onze fois. Toujours sympa à chaque fois. J’ai répondu pareil à chaque fois, c’est qu’on était vingt, et il a répondu pareil, c’était rien."],
    // B · eeed428f51a2
    "characters.theo.appearance": "Vingt-quatre ans, quatre-vingt-quatre jours plus maigre que sur sa photo, cheveux foncés laissés pousser, la même veste qu’il portait quand il a disparu, et un compte gravé dans le calcaire derrière lui selon un système qu’il a inventé.",
    // B · 1aef08168af3
    "characters.theo.visualHook": "Un compte de jours gravé dans du calcaire pâle, groupé par dizaines-neuf plutôt que par cinq.",
    // B · bd9897af9488
    "characters.theo.silhouette": "Assis contre un mur de pierre, les avant-bras sur les genoux, la tête levée, en train de parler.",
    // B · 4f114d3acaa2
    "characters.theo.artSeed": "fb-theo-01",
    // B · b4b5d1aaa7e1
    "characters.theo.portrait": "story_fourth_beast/theo",
    // B · 20cf69f7e51f
    "characters.theo.expressions": ["neutre","souriant","épuisé","urgent","brisé"],
    // B · 51a719da9c26
    "characters.theo.knowledgeScope": ["theo","la_frontière","les_dix-neuf","lucien","les_carrières"],
    // B · e19342ba1e83
    "characters.theo.gates.theo_tells_you_how_it_works.label": "Il te dit ce qui le maintient ouvert",
    // B · 55a54e80451a
    "characters.theo.gates.theo_tells_you_how_it_works.kind": "CONFIANCE",
    // B · 25f1fa774bff
    "characters.theo.gates.theo_tells_you_how_it_works.requires.flagsSet": ["parlé :theo"],
    // B · e2c8c3fc5c03
    "characters.theo.gates.theo_will_move.label": "Il va mener vingt personnes en haut d’un escalier",
    // B · 9e8ae18bf8bf
    "characters.theo.gates.theo_will_move.kind": "ALLIANCE",
    // B · 8d234559d531
    "characters.theo.combatant.tags": ["civil"],
    // B · e2efcc9479dc
    "factions.faction_police.name": "La Brigade",
    // B · cea745a0c16b
    "factions.faction_police.description": "Neuf policiers enquêtant depuis six mois sur des affaires liées dans une pièce de l’île, dirigés par quelqu’un qui a personnellement vu un homme survivre à une balle et ne l’a pas mis dans un rapport.",
    // B · db05f4401e47
    "factions.faction_police.allies": ["faction_institute"],
    // B · 68066a1f1e29
    "factions.faction_police.enemies": ["faction_marot"],
    // B · 6a4d83dc2a07
    "factions.faction_institute.name": "L’Institut Béraud",
    // B · 30560d523183
    "factions.faction_institute.description": "Un institut de recherche privé près du Panthéon avec un biologiste au sous-sol qui fait quelque chose que son conseil d’administration ferait fermer en moins d’une heure s’il le découvrait.",
    // B · 3b0ab5b94ffa
    "factions.faction_institute.allies": ["faction_police"],
    // B · 68066a1f1e29
    "factions.faction_institute.enemies": ["faction_marot"],
    // B · be041b7ef912
    "factions.faction_press.name": "Les Suiveurs",
    // B · 318df45844a8
    "factions.faction_press.description": "Deux étudiants en journalisme, un forum, une carte papier avec des punaises, et environ quatre cents personnes qui ont compris que les disparitions sont une seule affaire, pas onze.",
    // B · 68066a1f1e29
    "factions.faction_press.enemies": ["faction_marot"],
    // B · 49da45216be8
    "factions.faction_marot.name": "La Fondation",
    // B · 1bbb450b6d3f
    "factions.faction_marot.description": "Une fondation de médecine régénérative avec un vrai capital, de vraies subventions et un vrai bâtiment, dirigée par un homme patient qui croit que la ville devrait apprendre à partager avec ce qu’elle a passé mille ans à exclure.",
    // B · e43edbe078d0
    "factions.faction_marot.enemies": ["faction_police","faction_institute","faction_press"],
    // B · 9b243950c193
    "quests.q_the_first_night.title": "La Première Nuit",
    // B · 625959a46955
    "quests.q_the_first_night.summary": "Il y a quelque chose dans ton sac qui ne survivra pas sans toi, et tu dois le faire traverser Paris et entrer dans un appartement sans que personne ne remarque.",
    // B · 7fcc0be2ad9c
    "quests.q_the_first_night.kind": "PRINCIPALE",
    // B · 54e7b83b942e
    "quests.q_the_first_night.steps.the_first_thirty_seconds.playerCopy": "Il est arrivé devant son habitat et il te regarde. Fais quelque chose.",
    // B · 5af3b1fa056c
    "quests.q_the_first_night.steps.the_first_thirty_seconds.directorNotes": "Pas une cinématique. L’animal est un bébé, il n’est pas apprivoisé, il décide autant que le joueur. Camille est à un mètre vingt, bras croisés, elle prendra celui qui reste. Morel essaie de ne pas intervenir et échoue. Chaque choix est une vraie façon de rencontrer un animal.",
    // B · b73fcc1baf90
    "quests.q_the_first_night.steps.the_first_thirty_seconds.rewards.flags": ["sait :que_c_est_le_tien"],
    // B · a89d031bd117
    "quests.q_the_first_night.steps.get_it_home.playerCopy": "Traverse Paris à dix heures du soir avec quelque chose dans un sac qui n’a jamais vu la rue.",
    // B · e0a2357e3a19
    "quests.q_the_first_night.steps.get_it_home.directorNotes": "L’étape comique, qui doit être vraiment drôle avant tout. Le Métro est la pire option et la plus rapide. Il a peur de l’escalator, il est très intéressé par un musicien de rue, et quelqu’un en haut des escaliers va regarder directement le sac.",
    // B · b73fcc1baf90
    "quests.q_the_first_night.steps.get_it_home.enterWhen.flagsSet": ["sait :que_c_est_le_tien"],
    // B · c73392f42a2c
    "quests.q_the_first_night.steps.get_it_home.rewards.flags": ["la_première_nuit_est_finie"],
    // B · 43c37d3de253
    "quests.q_the_first_night.involvedCharacterIds": ["morel","camille"],
    // B · fc774fea8623
    "quests.q_the_first_night.involvedLocationIds": ["beraud_lab","quartier_latin","ligne_metro"],
    // B · 4010dfe59d62
    "quests.q_the_first_night.knownRewardCopy": "Une idée de ce que tu as pris en charge, et si ça a déjà décidé de ton compte.",
    // B · 384f6c344c32
    "quests.q_the_map.title": "Vingt-Deux Personnes",
    // B · b2e481902370
    "quests.q_the_map.summary": "Six mois, vingt-deux disparitions, et quatre points presque superposés sur une ancienne ligne de carrière.",
    // B · 7fcc0be2ad9c
    "quests.q_the_map.kind": "PRINCIPALE",
    // B · c73392f42a2c
    "quests.q_the_map.discoverWhen.flagsSet": ["the_first_night_is_over"],
    // B · 4072f5a72180
    "quests.q_the_map.steps.find_the_pattern.playerCopy": "Quelqu’un dans cette ville a déjà ça sur une carte. Trouve-le.",
    // B · c0d5a514dbe6
    "quests.q_the_map.steps.find_the_pattern.directorNotes": "Trois chemins vers le même fait qui coûtent différemment. Lina échange tout de suite et veut protéger ses sources. Ravel ne prendra pas de preuves sans source. Camille arpente les lieux depuis trois mois et ne partage que si elle n’est pas en compétition.",
    // B · e526a3b69a29
    "quests.q_the_map.steps.find_the_pattern.rewards.flags": ["looking_for_the_pattern"],
    // B · aec3a5e5b7a2
    "quests.q_the_map.steps.the_message_from_underneath.playerCopy": "Un des disparus a envoyé un message onze jours après sa disparition. Découvre d’où.",
    // B · b009c039c24a
    "quests.q_the_map.steps.the_message_from_underneath.directorNotes": "Le trajet le place sous la ville. C’est la clé de toute l’enquête et ça arrive comme un téléphone dans la main de quelqu’un, pas comme une révélation. Lina veut que ça soit géré avec précaution. Ravel veut une chaîne de garde qui n’existe pas.",
    // B · e526a3b69a29
    "quests.q_the_map.steps.the_message_from_underneath.enterWhen.flagsSet": ["looking_for_the_pattern"],
    // B · 3eb1b6fa6441
    "quests.q_the_map.steps.the_message_from_underneath.rewards.flags": ["knows :it_is_underneath"],
    // B · 91f763dae90b
    "quests.q_the_map.involvedCharacterIds": ["lina","ravel","camille"],
    // B · 59c16fa2f3a1
    "quests.q_the_map.involvedLocationIds": ["appartement_lina","prefecture_de_police","canal_saint_martin"],
    // B · b33655eb8737
    "quests.q_the_map.knownRewardCopy": "Où les disparitions se concentrent vraiment, et ce qu’un des victimes a envoyé depuis sous la ville onze jours après avoir disparu.",
    // B · f546d9c5c05e
    "quests.q_the_man_in_the_coat.title": "L’Homme au Manteau Pâle",
    // B · e07293e9f2ba
    "quests.q_the_man_in_the_coat.summary": "Il organise une collecte de fonds le onze, il répond lui-même à son courrier, et rien de ce qu’on lui a tiré dessus ne l’a touché.",
    // B · 7fcc0be2ad9c
    "quests.q_the_man_in_the_coat.kind": "PRINCIPALE",
    // B · 028a333631f7
    "quests.q_the_man_in_the_coat.discoverWhen.flagsSet": ["knows :the_cluster"],
    // B · f2745126c957
    "quests.q_the_man_in_the_coat.steps.work_out_who.playerCopy": "Donne un nom à l’homme au manteau.",
    // B · 143e3118a7ea
    "quests.q_the_man_in_the_coat.steps.work_out_who.directorNotes": "Ne complique pas. Trois enquêtes ordinaires convergent vers une fondation dans le premier arrondissement. La difficulté, c’est qu’il est un vrai philanthrope avec de vrais dons et un vrai conseil, et dire son nom à voix haute à Paris ruine la carrière de ceux qui ne peuvent pas le prouver.",
    // B · fe7944f3fd16
    "quests.q_the_man_in_the_coat.steps.work_out_who.rewards.flags": ["knows :who_he_is"],
    // B · 48c8c5420c6b
    "quests.q_the_man_in_the_coat.steps.meet_him.playerCopy": "Il t’a envoyé une carte. Décide ce que tu en fais.",
    // B · 2bee655a2c03
    "quests.q_the_man_in_the_coat.steps.meet_him.directorNotes": "C’est une bonne compagnie. Voilà la scène. Il s’intéresse à ton animal et c’est sincère, il explique ce qu’il fait sans qu’on le lui demande deux fois, et il ne menace personne. Le joueur doit rester vraiment incertain si la rencontre s’est bien passée.",
    // B · fe7944f3fd16
    "quests.q_the_man_in_the_coat.steps.meet_him.enterWhen.flagsSet": ["knows :who_he_is"],
    // B · de4384ca2696
    "quests.q_the_man_in_the_coat.steps.meet_him.rewards.flags": ["the_meeting_happened"],
    // B · 1e8827a11a92
    "quests.q_the_man_in_the_coat.involvedCharacterIds": ["lucien","morel","camille","ravel"],
    // B · 1b11731ca173
    "quests.q_the_man_in_the_coat.involvedLocationIds": ["palais_royal","ligne_de_toit","beraud_lab"],
    // B · af73ac374d9a
    "quests.q_the_man_in_the_coat.knownRewardCopy": "Qui il est, ce qu’il veut, et le fait qu’il sera parfaitement agréable à ce sujet.",
    // B · d6c3d9e73338
    "quests.q_what_it_is.title": "Ce Que Tu Transportes",
    // B · 9db860b18dd2
    "quests.q_what_it_is.summary": "Ça grandit, ça devient bizarre, et le tissu ne garde pas toujours la forme qu’il avait au début de la journée.",
    // B · 552c0b7f83c2
    "quests.q_what_it_is.kind": "SECONDAIRE",
    // B · 3ae13dd02b4f
    "quests.q_what_it_is.steps.the_first_bad_night.playerCopy": "Ça a la mauvaise forme depuis quatre minutes et ça ne te regarde pas.",
    // B · 7802717ccee3
    "quests.q_what_it_is.steps.the_first_bad_night.directorNotes": "La première fois que le coût est visible. Ce n’est pas en train de mourir et ce n’est pas normal. Ce que le joueur fait ici détermine la nature de la relation pour le reste de l’histoire, et ne rien faire à part s’asseoir par terre avec ça pendant une heure est une vraie bonne réponse.",
    // B · 7047e150f20e
    "quests.q_what_it_is.steps.the_first_bad_night.rewards.flags": ["the_first_bad_night"],
    // B · 608e30e87a6d
    "quests.q_what_it_is.steps.the_first_bad_night.rewards.abilities": ["go_all_the_way"],
    // B · 23a0ce85e742
    "quests.q_what_it_is.steps.what_it_becomes.playerCopy": "Découvre en quoi ça se transforme quand ça arrête d’être petit.",
    // B · d03e25f74fb9
    "quests.q_what_it_is.steps.what_it_becomes.directorNotes": "La croissance est un spectacle émotionnel plus qu’une jauge qui se remplit. Ça arrive au pire moment, au milieu de quelque chose d’autre, et c’est effrayant pour les deux. La forme qu’elle prend dépend de comment ça a été traité, pas du nombre d’heures passées.",
    // B · 7047e150f20e
    "quests.q_what_it_is.steps.what_it_becomes.enterWhen.flagsSet": ["la_premiere_mauvaise_nuit"],
    // B · 32d2c00eb416
    "quests.q_what_it_is.steps.what_it_becomes.rewards.flags": ["la_question_de_croissance_est_resolue"],
    // B · a09e3032696a
    "quests.q_what_it_is.involvedCharacterIds": ["morel","camille","lina"],
    // B · 1c6594d88777
    "quests.q_what_it_is.involvedLocationIds": ["laboratoire_beraud","appartement_lina","montmartre"],
    // B · e10189fb2f8f
    "quests.q_what_it_is.knownRewardCopy": "Ce que le lien coûte vraiment, et si la chose dans ton sac est un partenaire ou un patient.",
    // B · 27a6fa268b32
    "quests.q_underneath.title": "C’est sous nous",
    // B · 422d06dbf729
    "quests.q_underneath.summary": "Quatre mots dans un brouillon non envoyé, un passage qui descend sous la ville, et cent quatre-vingts kilomètres de calcaire dont personne n’a la carte complète.",
    // B · 7fcc0be2ad9c
    "quests.q_underneath.kind": "PRINCIPALE",
    // B · 3eb1b6fa6441
    "quests.q_underneath.discoverWhen.flagsSet": ["sait :c_est_sous_nous"],
    // B · 68745c8d11c5
    "quests.q_underneath.steps.get_down_there.playerCopy": "Descends sous le Métro et dans le calcaire.",
    // B · 5bdfa26bf683
    "quests.q_underneath.steps.get_down_there.directorNotes": "Froid, sec et complètement noir. C’est une descente, pas un donjon : la pression vient du fait que personne ne sait où il est, et l’animal est la seule chose ici qui le sache. Ne mets pas de monstre dans la première galerie.",
    // B · a3f5b416b3c9
    "quests.q_underneath.steps.get_down_there.rewards.flags": ["sous_la_ville"],
    // B · 3cf092f814de
    "quests.q_underneath.steps.the_far_wall.playerCopy": "Il y a vingt personnes ici et le mur du fond de la galerie a disparu.",
    // B · dac2017f6b01
    "quests.q_underneath.steps.the_far_wall.directorNotes": "Théo attend depuis trois mois pour expliquer comment ça marche et le fait dans les deux premières minutes. Les dix-neuf autres sont présents individuellement. Quoi que le joueur décide à propos de la limite, vingt personnes sont dans la pièce pendant qu’ils choisissent.",
    // B · a3f5b416b3c9
    "quests.q_underneath.steps.the_far_wall.enterWhen.flagsSet": ["sous_la_ville"],
    // B · d530188b8f22
    "quests.q_underneath.steps.the_far_wall.rewards.flags": ["la_limite_est_resolue"],
    // B · af7465292a9a
    "quests.q_underneath.steps.what_paris_gets.playerCopy": "Découvre ce que la ville finit par avoir.",
    // B · 18ad880c9738
    "quests.q_underneath.steps.what_paris_gets.directorNotes": "Le matin d’après. Ce que Paris sait est fixé ici et ce n’est souvent pas la vérité. Vingt familles, une enquête policière à écrire d’une façon ou d’une autre, un journaliste avec une décision, et une fondation avec un don et un conseil d’administration jeudi.",
    // B · d530188b8f22
    "quests.q_underneath.steps.what_paris_gets.enterWhen.flagsSet": ["la_limite_est_resolue"],
    // B · 975e4b9d10e5
    "quests.q_underneath.steps.what_paris_gets.rewards.flags": ["la_ville_a_choisi"],
    // B · 2e4b5242c66b
    "quests.q_underneath.involvedCharacterIds": ["theo","lucien","camille","ravel"],
    // B · c38d8b1482fb
    "quests.q_underneath.involvedLocationIds": ["tunnels_de_service","les_carrieres","la_limite"],
    // B · bd27a6160c1e
    "quests.q_underneath.knownRewardCopy": "Vingt personnes, ce qui maintient le mur du fond ouvert, et qui finit devant.",
    // B · b48f77fb79e0
    "worldEvents.we_the_candles.publicCopy": "Quelqu’un a encore remplacé les bougies sous le troisième pont. Il y a vingt-deux photos contre le mur maintenant et la plus récente est là depuis quatre jours.",
    // B · 5fd24283a8da
    "worldEvents.we_the_candles.directorNotes": "Un deuil ordinaire, en public, dans une ville qui a appris à passer devant. Pas de créature contente. C’est de ça que toute l’histoire parle en vrai et il faut laisser ça tranquille.",
    // B · 75c7939a799d
    "worldEvents.we_the_candles.setsFlags": ["a_vu_les_bougies"],
    // B · ceeaafb1b8f7
    "worldEvents.we_camille_gets_there_first.publicCopy": "Il y a un ruban de police sur le quai à Bichat et une fille de vingt-et-un ans déjà dedans, qui marche sur le terrain, sans que personne ne lui crie dessus parce que personne ne l’a encore remarquée.",
    // B · 1af19a398f0e
    "worldEvents.we_camille_gets_there_first.directorNotes": "Elle résout un bout de ça que le joueur soit là ou pas. Le but de l’événement est que le monde n’attend pas — arriver en retard et se faire dire ce qu’elle a trouvé est une expérience fréquente et légitime de cette histoire.",
    // B · a0529811572c
    "worldEvents.we_camille_gets_there_first.setsFlags": ["camille_est_arrivee_la_premiere"],
    // B · 920d4583144d
    "worldEvents.we_camille_gets_there_first.cancelledByFlags": ["tu_l_as_trouve_toi_meme"],
    // B · c73392f42a2c
    "worldEvents.we_camille_gets_there_first.requiresFlags": ["la_premiere_nuit_est_terminee"],
    // B · 7aff49775741
    "worldEvents.we_the_clip.publicCopy": "Onze secondes de vidéo de téléphone depuis une cour dans le dixième passent de quatre cents vues à cent dix mille entre neuf heures et minuit. Quelque chose dedans bouge d’une façon qu’un animal ne fait pas.",
    // B · d4f0d0ab0792
    "worldEvents.we_the_clip.directorNotes": "Le premier événement d’Exposition avec un visage. Personne dans la vidéo n’est identifiable. Ce qui change, c’est que Paris a maintenant une deuxième chose à craindre, et environ un tiers de la ville pense que cette deuxième chose est un faux.",
    // B · febbdc122d2d
    "worldEvents.we_the_clip.setsFlags": ["la_video_a_ete_mise_en_ligne"],
    // B · c73392f42a2c
    "worldEvents.we_the_clip.requiresFlags": ["la_premiere_nuit_est_terminee"],
    // B · 5366421691ba
    "worldEvents.we_ravel_comes_looking.publicCopy": "Il y a une femme en manteau marine devant l’Institut à dix heures du matin qui n’y entre pas, et qui est là depuis assez longtemps pour avoir fini son café.",
    // B · 7647548103e2
    "worldEvents.we_ravel_comes_looking.directorNotes": "Elle a ton nom de quelque part et elle va le dire. Elle n’est ni hostile ni amicale ; elle est au sixième mois sans arrestation et tu es la nouvelle variable d’un dossier qu’elle va bientôt perdre.",
    // B · 72c8c2b83fe1
    "worldEvents.we_ravel_comes_looking.setsFlags": ["ravel_a_ton_nom"],
    // B · febbdc122d2d
    "worldEvents.we_ravel_comes_looking.requiresFlags": ["la_video_a_ete_mise_en_ligne"],
    // B · 871af5cb0cfc
    "worldEvents.we_the_invitation.publicCopy": "Une carte arrive sur un papier crème épais avec un blason de fondation, une date et une heure. La date est le onze. Ton nom est écrit à la main dessus.",
    // B · cc2429c81c97
    "worldEvents.we_the_invitation.directorNotes": "Il en envoie quatre cents et en écrit onze à la main. Il sait qui tu es, il ne cache pas qu’il sait, et il n’y a rien sur la carte qui puisse servir de preuve à qui que ce soit.",
    // B · 44129c1b5ee3
    "worldEvents.we_the_invitation.setsFlags": ["la_carte_est_arrivee"],
    // B · 8fe5b224be52
    "worldEvents.we_the_invitation.cancelledByFlags": ["la_police_l_a_laissé_tomber"],
    // B · fe7944f3fd16
    "worldEvents.we_the_invitation.requiresFlags": ["sait :qui_il_est"],
    // B · 6d2fa49852f1
    "worldEvents.we_another_one.publicCopy": "Un vingt-trois ans sort d’un bar rue Dénoyez à deux heures quarante et ne va pas jusqu’au coin de la rue. C’est la vingt-troisième fois.",
    // B · 1083e72ad15d
    "worldEvents.we_another_one.directorNotes": "Ça continue pendant que le joueur fait autre chose. Quelqu’un qu’il a peut-être rencontré. Écris ça après coup — un téléphone qui sonne encore sur une table, un ami sur le trottoir — plutôt que pendant l’attaque.",
    // B · ad7db775e6da
    "worldEvents.we_another_one.setsFlags": ["la_vingt_troisieme"],
    // B · 77f6c117238d
    "worldEvents.we_another_one.cancelledByFlags": ["la_frontiere_fermée","ils_les_ont_sortis"],
    // B · 028a333631f7
    "worldEvents.we_another_one.requiresFlags": ["sait :le_groupe"],
    // B · 296b8647aa27
    "worldEvents.we_the_lab_is_found.publicCopy": "La porte en bas du deuxième étage est ouverte alors qu’elle ne l’était pas, et il manque un habitat sur les deux.",
    // B · 747e265d262b
    "worldEvents.we_the_lab_is_found.directorNotes": "La troisième créature — celle que personne n’a choisie — a disparu. Morel est par terre, indemne, et immobile depuis un moment. Rien n’a été cassé ni forcé, ce qui est pire.",
    // B · 4c84e7667354
    "worldEvents.we_the_lab_is_found.setsFlags": ["le_labo_a_été_entré","le_troisième_a_disparu"],
    // B · 0bea460ab031
    "worldEvents.we_the_lab_is_found.cancelledByFlags": ["la_frontiere_fermée"],
    // B · 44129c1b5ee3
    "worldEvents.we_the_lab_is_found.requiresFlags": ["la_carte_est_arrivee"],
    // B · e0031babbebb
    "worldEvents.we_alba.publicCopy": "Il y a quelque chose de blanc sur la crête, à quatre toits de là. Ce n’est pas en train de chasser ni de se cacher, et le regarder suspend la peur pendant environ deux secondes.",
    // B · 1fbed3a1ea60
    "worldEvents.we_alba.directorNotes": "La quatrième bête, vue pour de bon. Elle n’attaque pas. Elle observe, décide que le joueur n’est pas intéressant pour l’instant, et part sans se presser. Ce que fait l’animal du joueur en sa présence est le vrai contenu de la scène.",
    // B · 23876d7856b3
    "worldEvents.we_alba.setsFlags": ["sait :alba"],
    // B · fe7944f3fd16
    "worldEvents.we_alba.requiresFlags": ["sait :qui_il_est"],
    // B · ba4ac785311d
    "worldEvents.we_lina_is_approached.publicCopy": "Quelqu’un est monté au quatrième étage pendant qu’elle était sortie, n’a rien pris, et a déplacé une punaise sur la carte de quatre centimètres vers la gauche.",
    // B · 32e2302b37a8
    "worldEvents.we_lina_is_approached.directorNotes": "La menace la plus polie possible, et elle comprend tout de suite. La punaise déplacée est la bonne. Elle a peur et va continuer, et aimerait que quelqu’un sache où elle est cette semaine.",
    // B · a1a170edd1f0
    "worldEvents.we_lina_is_approached.setsFlags": ["lina_a_été_visitee"],
    // B · 33517e17b73d
    "worldEvents.we_lina_is_approached.cancelledByFlags": ["la_police_l_a_laissé_tomber","la_frontiere_fermée"],
    // B · 2cbbd39f1edb
    "worldEvents.we_lina_is_approached.requiresFlags": ["lina_est_la"],
    // B · e5292a09562a
    "worldEvents.we_the_city_notices.publicCopy": "Deux lignes de métro sont suspendues entre six et neuf heures et l’annonce ne donne aucune raison. Il y a des gens dans les couloirs à Réaumur qui ne sont ni de la RATP ni de la police.",
    // B · 21c41a26b5f5
    "worldEvents.we_the_city_notices.directorNotes": "Ce qui se passe au sommet d’Exposure. Les créatures sont devenues l’histoire plutôt que les disparitions, ce qui est précisément le résultat que Lucien voulait sans que personne ne le remarque.",
    // B · baf84dc33909
    "worldEvents.we_the_city_notices.setsFlags": ["la_ville_cherche"],
    // B · d44bafc64543
    "worldEvents.we_the_city_notices.cancelledByFlags": ["la_frontiere_fermée","paris_est_reste_paris"],
    // B · febbdc122d2d
    "worldEvents.we_the_city_notices.requiresFlags": ["la_video_est_mise_en_ligne"],
    // B · 445cd8deebc2
    "promises.p_what_you_chose.kind": "RELATIONSHIP",
    // B · af49af771584
    "promises.p_what_you_chose.label": "L’animal que tu as choisi parmi trois dans une pièce chaude",
    // B · 739fc3a91335
    "promises.p_what_you_chose.seedHint": "Il vient devant l’habitat et te regarde avant que tu aies décidé quoi que ce soit.",
    // B · 6831d6ac7d2f
    "promises.p_what_you_chose.payoffHint": "Il garde la mauvaise silhouette pendant quatre minutes et ne veut pas te regarder, et il n’y a rien dans le kit pour lui.",
    // B · 5631e4ba6537
    "promises.p_the_man_in_the_coat.kind": "BOSS",
    // B · 372ee122b059
    "promises.p_the_man_in_the_coat.label": "Quelqu’un que les balles n’ont pas touché depuis six mois",
    // B · 72e67ab7d34d
    "promises.p_the_man_in_the_coat.seedHint": "Vingt-deux photos contre un mur sous un pont, et une vidéo qui perd des images quand il bouge.",
    // B · bc332c9fe960
    "promises.p_the_man_in_the_coat.payoffHint": "Il est charmant, il répond à la question, et une créature est derrière lui, choisie pour être là.",
    // B · e82d9dc4b3fa
    "promises.p_theo.kind": "MYSTERY",
    // B · ed184c0087fa
    "promises.p_theo.label": "Où sont allées vraiment vingt-deux personnes",
    // B · 6a61ba828568
    "promises.p_theo.seedHint": "Quatre punaises sur une carte en papier, presque superposées sur une ancienne ligne de carrière.",
    // B · 16d15c7fc44a
    "promises.p_theo.payoffHint": "Un message envoyé onze jours après la disparition de quelqu’un, routé depuis sous la ville.",
    // B · 63a719ec7f2d
    "promises.p_camille.kind": "RIVAL",
    // B · 406d461fc2ed
    "promises.p_camille.label": "L’autre personne que le jeu de données a trouvée",
    // B · a869bf4f2735
    "promises.p_camille.seedHint": "Elle prend celui que tu laisses et ne va pas être généreuse à ce sujet.",
    // B · c6b6924f83ef
    "promises.p_camille.payoffHint": "Elle est entrée dans un périmètre de police, elle a des preuves matérielles que personne d’autre ne possède, et elle est arrivée la première.",
    // B · f8b4a6708d82
    "promises.p_the_fourth.kind": "THÈME",
    // B · 6dffe88fc75b
    "promises.p_the_fourth.label": "D’où vient à l’origine le tissu",
    // B · 484c6243139c
    "promises.p_the_fourth.seedHint": "Morel dit qu’il en a fabriqué trois. Il ne dit pas avec quoi.",
    // B · 4c391d842cca
    "promises.p_the_fourth.payoffHint": "Quelque chose de blanc sur une crête à quatre toits de là qui ne chasse ni ne se cache.",
    // B · dcb2d07cd425
    "endings.end_paris_still_ours.name": "Paris, toujours à nous",
    // B · c9d08ae5d876
    "endings.end_paris_still_ours.rarity": "FRÉQUENT",
    // B · e7ae942c9d0e
    "endings.end_paris_still_ours.requires.flagsSet": ["paris_stayed_paris"],
    // B · b9707d1a8305
    "endings.end_paris_still_ours.requires.flagsUnset": ["paris_changed"],
    // B · 69bac463d88c
    "endings.end_paris_still_ours.condition": "Les meurtres ont cessé et la ville est restée une ville, que quelqu’un ait découvert ce que c’était ou pas. Écris la reprise ordinaire plutôt qu’une victoire : la bande est descendue, les bougies ont été enlevées par quelqu’un de la mairie, et l’histoire est passée de la une à la page onze puis au néant en environ neuf jours.",
    // A · ea243f6c41c3
    "endings.end_paris_still_ours.epilogue": "Vingt personnes rentrent chez elles et aucune ne donne d’interview. La Préfecture clôt l’affaire avec une formule qui satisfait personne et que personne ne remet en cause. Dans le onzième, une boulangère met toujours un gâteau de plus dans le sac la plupart des matins, sans jamais demander pourquoi.",
    // B · 2cc3eda0f9c9
    "endings.end_the_fourth_beast.name": "La Quatrième Bête",
    // B · f8b8333fe7bc
    "endings.end_the_fourth_beast.rarity": "RARE",
    // B · 8f06b2a6d585
    "endings.end_the_fourth_beast.requires.flagsSet": ["knows :alba","closed_the_boundary"],
    // B · d76d89d0b80a
    "endings.end_the_fourth_beast.requires.flagsUnset": ["held_it_open"],
    // B · 0b752c57149e
    "endings.end_the_fourth_beast.condition": "Alba est vivante, quoi qu’elle ait eu avec Lucien est fini, et elle s’est attachée à quelqu’un dans cette histoire selon ses propres conditions. Ce n’est pas un trophée et elle n’a pas été apprivoisée. Écris-la comme un animal qui a fait un second choix dans sa vie et regarde si celui-ci était meilleur.",
    // A · 0799095ff2b2
    "endings.end_the_fourth_beast.epilogue": "Il n’habite nulle part. Il revient, sur un toit, tous les neuf ou dix jours, et une fois dans une pièce, il se tient impeccablement et mange tout. Personne n’a jamais réussi à le photographier. Quoi qu’il ait décidé de faire, il a arrêté tout le reste.",
    // B · c4684c23b9fc
    "endings.end_two_handlers.name": "Deux Dresseurs",
    // B · f8b8333fe7bc
    "endings.end_two_handlers.rarity": "RARE",
    // B · 28f14e14b123
    "endings.end_two_handlers.requires.flagsSet": ["theo_is_alive"],
    // B · 682ea9033b75
    "endings.end_two_handlers.condition": "Ils s’en sont tous les deux sortis et aucun ne doit rien à l’autre. C’est une question de respect plus que de romance et ça marche qu’ils soient restés proches ou à peine en contact. Ce dont il s’agit, c’est que chacun est désormais la mesure permanente de l’autre pour savoir si une chose a été bien faite.",
    // A · c89f631b981c
    "endings.end_two_handlers.epilogue": "Ils ne travaillent pas ensemble. Ils comparent sans arrêt, à distance, par des gens qui les connaissent tous les deux. Quand on leur demande à l’un ou l’autre qui aurait pu faire ça, ils donnent le même nom et s’en agacent.",
    // B · 22088cda4646
    "endings.end_more_than_rivals.name": "Plus Que Rivaux",
    // B · f8b8333fe7bc
    "endings.end_more_than_rivals.rarity": "RARE",
    // B · 28f14e14b123
    "endings.end_more_than_rivals.requires.flagsSet": ["theo_is_alive"],
    // B · 9912d2e8f1c8
    "endings.end_more_than_rivals.condition": "C’est devenu quelque chose et ça a survécu à la crise, ce qui est la partie la plus dure. Écris leur vraie dynamique plutôt qu’une fin générique réglée — ils se sont rencontrés en recevant deux moitiés de la même chose impossible et ont couru l’un contre l’autre dans la ville pendant quinze jours, et aucun ne s’arrête.",
    // A · 1a96d234ca84
    "endings.end_more_than_rivals.epilogue": "Deux animaux dans un même appartement, c’est bien pire que ce que chacun avait prévu et ça fait l’objet de longues discussions, tous les jours, pendant des années. Théo emménage pour quatre mois et décrit ça, à qui veut l’entendre, comme vivre au cœur d’une dispute que les deux protagonistes apprécient.",
    // B · a93a50ff5f34
    "endings.end_the_menagerie.name": "La Ménagerie du Professeur",
    // B · f8b8333fe7bc
    "endings.end_the_menagerie.rarity": "RARE",
    // B · 6c256a5d4b54
    "endings.end_the_menagerie.requires.flagsSet": ["paris_knows"],
    // B · 0348eadd8a06
    "endings.end_the_menagerie.condition": "Morel a survécu, le travail a été rendu public, et ce qui l’a remplacé a des règles écrites par quelqu’un qui n’était pas dans la pièce. Ne rends pas ça triomphant — c’est un programme de recherche avec un comité d’éthique et une liste d’attente, et ce qui le rend bien, c’est justement que c’est ennuyeux maintenant.",
    // A · ee9ba93bbf41
    "endings.end_the_menagerie.epilogue": "Onze personnes compatibles sont identifiées dans les deux premières années et chacune d’elles est informée du nombre d’embryons qui ont échoué avant qu’on leur montre quoi que ce soit. Morel ne la dirige pas. Il siège dans le comité qui dit non, le poste qu’il a demandé.",
    // B · 0773ee7b6660
    "endings.end_no_masters.name": "Pas de Maîtres",
    // B · f8b8333fe7bc
    "endings.end_no_masters.rarity": "RARE",
    // B · 13d3854a6f37
    "endings.end_no_masters.requires.flagsSet": ["paris_knows","it_trusts_you"],
    // B · b9707d1a8305
    "endings.end_no_masters.requires.flagsUnset": ["paris_changed"],
    // B · 10baaa6e5c2a
    "endings.end_no_masters.condition": "Le joueur a refusé l’idée que ce sont la propriété de quelqu’un, publiquement, et a fait tenir ça. Cette fin perd son confort : un animal qu’on ne peut pas posséder ne peut pas non plus être protégé par celui qui le possède, et la dispute sur ce que c’est dure des années sans se résoudre.",
    // A · a1e9b96dad69
    "endings.end_no_masters.epilogue": "Ça devient d’abord une question juridique, puis politique, puis un long processus. Trois procès en quatre ans sans qu’aucun ne tranche le point central. Le tien t’accompagne, et tous ceux qui s’en occupent prennent soin de dire que c’est un fait, pas un droit.",
    // B · 2bdfea408aad
    "endings.end_wild_paris.name": "Paris Sauvage",
    // B · f7fc172f729a
    "endings.end_wild_paris.rarity": "UNIQUE",
    // B · d4fa125d584a
    "endings.end_wild_paris.requires.flagsSet": ["paris_changed","held_it_open"],
    // B · b54dcfe56afc
    "endings.end_wild_paris.condition": "La frontière est restée ouverte et la ville tient toujours, ce qui n’est pas la même chose que la ville va bien. Écris la coexistence concrètement — ce qui pousse sur la ligne de la carrière, quelles deux stations de métro n’ont jamais rouvert, à quoi ressemble le onzième en août maintenant — plutôt qu’en montage.",
    // A · 08829722f425
    "endings.end_wild_paris.epilogue": "Le quatorzième et une partie du cinquième deviennent un biome à part en quatre ans, avec un service mairie dédié, un budget et un problème de personnel. Paris s’adapte, parce qu’elle a neuf cents ans et a déjà vécu ça, avec moins d’avertissement. Une partie est magnifique. Environ un cinquième est invivable et clôturé.",
    // B · 24fe6761cafd
    "endings.end_across_the_veil.name": "De l’Autre Côté",
    // B · f7fc172f729a
    "endings.end_across_the_veil.rarity": "UNIQUE",
    // B · ea74e4438b42
    "endings.end_across_the_veil.requires.flagsSet": ["a_traversé","quitté_la_carte"],
    // B · d10191a1b551
    "endings.end_across_the_veil.condition": "Ils ont traversé, avec l’animal, volontairement. Ce n’est ni une fuite ni une récompense : ils sont allés quelque part où il y a du temps et pas de source de lumière ni personne pour leur parler, avec une créature qui pose enfin les pattes sur le sol dont son tissu vient. Écris l’arrivée et rien après.",
    // A · 0684df393577
    "endings.end_across_the_veil.epilogue": "De ce côté, vingt personnes témoignent et un nom n’apparaît dans aucun, parce que personne ne peut prouver qu’il devrait. De l’autre, il y a de la chaleur, une lumière venue de nulle part, un animal qui cesse enfin de se débattre depuis sa naissance, et qui court.",
    // B · c43ff1ac2d02
    "endings.end_the_new_predator.name": "Le Nouveau Prédateur",
    // B · 734e45c160cf
    "endings.end_the_new_predator.rarity": "PEU COMMUN",
    // B · bc5c9ac20c84
    "endings.end_the_new_predator.requires.flagsSet": ["l’ont_maintenu_ouvert","l’ont_écouté"],
    // B · 9a183ca33a29
    "endings.end_the_new_predator.requires.flagsUnset": ["les_ont_faits_sortir"],
    // B · df1d87824f65
    "endings.end_the_new_predator.condition": "Le joueur a accepté son point de vue, ou l’a remplacé, et Paris a maintenant quelqu’un qui fait ça mieux que lui. Ne leur donne pas de motif rédempteur que la partie n’a pas mérité. La ville s’adapte à être chassée par un autre nom, la différence est administrative.",
    // A · 1f867649ec12
    "endings.end_the_new_predator.epilogue": "La préfecture rouvre le dossier sous un nouveau numéro et avec une nouvelle commandante. La vidéo qui circule cette fois dure neuf secondes, et la silhouette qu’elle montre n’est pas celle de l’an dernier. Ravel est mutée au printemps, emportant une copie de tout.",
    // B · 406183e2210c
    "endings.end_camille_wins.name": "Camille Gagne",
    // B · c9d08ae5d876
    "endings.end_camille_wins.rarity": "COURANT",
    // B · a0529811572c
    "endings.end_camille_wins.requires.flagsSet": ["camille_est_arrivée_la_première"],
    // B · d8e72e8586d7
    "endings.end_camille_wins.requires.flagsUnset": ["la_frontière_est_répondue","quitté_la_carte"],
    // B · 16908b3996af
    "endings.end_camille_wins.condition": "Le joueur n’a pas fini et elle oui. Ce n’est pas un échec et il ne faut pas l’écrire comme une réprimande : le monde n’attend pas, elle est dessus depuis avril, et arrêter les meurtres est le résultat qui compte. La vie du joueur finit ailleurs, et c’est ce lieu que la scène décrit.",
    // A · be95d5b9fa0d
    "endings.end_camille_wins.epilogue": "Elle récupère son frère et met onze semaines à pouvoir en parler. Elle ne dira jamais un mot en public. Ce que le joueur a à la fin, c’est un animal, une ville redevenue sûre pour des raisons inconnues, et une quinzaine de jours qu’il réexaminera pendant des années.",
    // B · 2f613453b0ce
    "endings.end_empty_lab.name": "Laboratoire Vide",
    // B · 734e45c160cf
    "endings.end_empty_lab.rarity": "PEU COMMUN",
    // B · 4c84e7667354
    "endings.end_empty_lab.requires.flagsSet": ["le_labo_a_été_entré","le_troisième_est_parti"],
    // B · d530188b8f22
    "endings.end_empty_lab.requires.flagsUnset": ["la_frontière_est_répondue"],
    // B · be0964d01bde
    "endings.end_empty_lab.condition": "Morel est parti ou fini, les créatures sont dispersées, personne n’a rien résolu. La fin sombre accessible en étant lent plutôt qu’en se trompant. Il n’y a pas de confrontation ni d’explication, et la dernière chose doit être petite.",
    // A · 19935788f683
    "endings.end_empty_lab.epilogue": "L’Institut rénove le sous-sol en octobre, mais les ouvriers ne trouvent rien de notable. Vingt-deux familles reçoivent une lettre au printemps contenant une formule. En février, quelqu’un à Belleville filme onze secondes de quelque chose sur un toit, et la vidéo dépasse les quatre cents vues.",
    // B · c46c48816dad
    "endings.end_just_us.name": "Juste Nous",
    // B · c9d08ae5d876
    "endings.end_just_us.rarity": "COURANT",
    // B · b0eff3470103
    "endings.end_just_us.requires.flagsSet": ["quitté_la_carte"],
    // B · 8ff09a741cb7
    "endings.end_just_us.requires.flagsUnset": ["a_traversé","l’ont_maintenu_ouvert"],
    // B · 908939708956
    "endings.end_just_us.condition": "Ils sont partis en emmenant l’animal. C’est une réponse légitime à ce qu’un inconnu vous donne une arme vivante dans un sous-sol, et il ne faut pas la rédempter ou l’écrire comme de la lâcheté. La ville continue. Les meurtres peuvent s’arrêter ou pas. Ils ne sont pas là pour ça.",
    // A · 8eb43f3dcc77
    "endings.end_just_us.epilogue": "Quelque part avec moins de caméras et plus de terrain. Il cesse de se débattre en un mois, ce que personne n’avait prévu et que Morel aurait voulu savoir. Il y a un message non répondu sur un téléphone, d’un professeur parisien, en juin, et il reste sans réponse.",
    // A · 8297286e656f
    "archetypes.arch_aurel.name": "Aurèle",
    // B · 01e1210d9b89
    "archetypes.arch_aurel.role": "Vitesse et pistage",
    // A · f442e5a2b15f
    "archetypes.arch_aurel.summary": "Le doré aux quills argentés. Rapide, fier, tactile, déteste la cage, capable de suivre une personne sur quatre arrondissements grâce à son odeur.",
    // A · 840fae03d245
    "archetypes.arch_aurel.playstyle": ["Rapide","Loyal","Visible"],
    // A · 966915eee092
    "archetypes.arch_aurel.blurb": "Or métallique, une énorme crinière, des piquants argentés le long des épaules, et des dents complètement noires. À cette taille, il est adorable. Mais quand il les montre, tu te souviens pourquoi il a été élevé.",
    // B · 21bbc05e3046
    "archetypes.arch_aurel.startingAbilities": ["poursuivre"],
    // A · 173c3a0f811f
    "archetypes.arch_nox.name": "Nox",
    // B · 8b9dccec31c9
    "archetypes.arch_nox.role": "Chaleur et obstination",
    // A · 316a615b7c27
    "archetypes.arch_nox.summary": "Le petit noir qui a toujours l’air de bouder. Méfiant, indépendant, fidèle une fois qu’il a choisi, et capable de faire monter la température sans qu’il y ait quoi que ce soit qui brûle.",
    // A · b61cc466f659
    "archetypes.arch_nox.playstyle": ["Sur ses gardes","Indépendant","Ouvre des choses"],
    // A · 16d8d225fd12
    "archetypes.arch_nox.blurb": "Charbon, tout près du sol, avec des anneaux rouges qui brillent le long du dos et une expression de désapprobation tranquille. Il fixera un inconnu plutôt que de se cacher, ce qui n’est pas toujours la meilleure idée.",
    // B · 170f22a4a04c
    "archetypes.arch_nox.startingAbilities": ["brûler"],
    // A · 047b635ae73e
    "archetypes.arch_marea.name": "Marea",
    // B · d485d5f56aad
    "archetypes.arch_marea.role": "Son et curiosité",
    // A · a70aaeef98e1
    "archetypes.arch_marea.summary": "La plus étrange des trois : une petite orque terrestre qui vole des choses, s’attache vite, déteste rester en place, et peut te dire ce qui se cache de l’autre côté d’un mur.",
    // A · 91d132d77d27
    "archetypes.arch_marea.playstyle": ["Curieux","Sociable","Voit à travers les murs"],
    // A · c33bdd4372e5
    "archetypes.arch_marea.blurb": "Rose corail et crème, yeux noirs brillants, une petite nageoire dorsale et une bouche qui fait toujours la même expression. Il aura déjà pris quelque chose dans ton sac avant que tu quittes la pièce.",
    // B · 7046afd90633
    "archetypes.arch_marea.startingAbilities": ["sonder_les_murs"],
    // A · fe7f3344cbfa
    "archetypes.arch_none.name": "Tu as dit non",
    // B · bfc09120bc70
    "archetypes.arch_none.role": "Seul, pour l’instant",
    // A · b9261be68796
    "archetypes.arch_none.summary": "Tu es sorti de cette pièce sans rien. Camille prend la sienne, deux restent dans leurs habitats, et tout ce qui suit, tu le fais comme quelqu’un qui vit dans une ville avec un tueur à ses trousses.",
    // A · 86bacca23a50
    "archetypes.arch_none.playstyle": ["Sans lien","Libre","Sous-estimé"],
    // A · 28daede43a8e
    "archetypes.arch_none.blurb": "Morel n’a pas discuté. Il a écrit un numéro sur une carte, dit que la porte reste ouverte, et est retourné à ce qu’il faisait, ce qui était d’une certaine façon pire qu’une dispute.",
    // B · b46622102ad6
    "setupFields.displayName.label": "Comment Morel t’appelle-t-il ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · 53f48c38658f
    "setupFields.displayName.placeholder": "ex. Nour Bellanger",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 5965ecf877b1
    "setupFields.pronouns.placeholder": "ex. elle/elle",
    // B · 9540c5ff829f
    "setupFields.archetype.label": "Il y en a trois dans cette pièce. Lequel ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHETYPE",
    // B · 5b28adf70f4f
    "setupFields.archetype.helpText": "L’animal que tu sors de ce labo, ce que tu pourras faire pendant toute l’histoire — vitesse et pistage, chaleur et obstination, ou son et curiosité. C’est fixé pour toute l’histoire, tu ne peux pas changer. Refuser les trois est une vraie option, l’histoire continue sans.",
    // B · 3271fefa2a7b
    "setupFields.worldKnowsAboutYou.label": "Comment as-tu fini dans sa base de données ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · 223aef42bff2
    "setupFields.worldKnowsAboutYou.helpText": "Peu importe ce que tu écris, ce monde s’en accommode. Une étude à laquelle tu as participé, un hôpital après une des attaques, un lien familial, ou quelque chose qui t’appartient entièrement. Une phrase simple.",
    // B · 4b987a23ba66
    "setupFields.worldKnowsAboutYou.placeholder": "ex. J’étais à l’hôpital Saint-Louis la nuit de la deuxième attaque et quelqu’un a prélevé beaucoup de sang.",
    // B · cddeb609e0f8
    "setupFields.your_paris.label": "Où habites-tu vraiment ?",
    // B · b6a31c665c0b
    "setupFields.your_paris.kind": "CHOIX",
    // B · d4d803ef5a53
    "setupFields.your_paris.helpText": "Un arrondissement de départ et une vie de départ. Ça change qui te reconnaît dans la rue, pas ce que tu sais faire.",
    // B · 22ccb73c333c
    "setupFields.your_paris.options.belleville.label": "Belleville — une colline, un marché, et tout le monde connaît tout le monde",
    // B · 7c25de234c6b
    "setupFields.your_paris.options.fifth.label": "Le cinquième — étudiants, librairies, à quatre portes de l’Institut",
    // B · d79a70d54b14
    "setupFields.your_paris.options.tenth.label": "Le dixième — le canal, et deux disparitions sur ton chemin du retour",
    // B · b444bff0c703
    "setupFields.your_paris.options.eighteenth.label": "Montmartre — six étages et trois cents marches pour aller n’importe où",
    // B · 89c9564ec409
    "setupFields.your_paris.options.nowhere.label": "Pas encore d’endroit. Tu es arrivé à Paris cette année et tu connais quatre personnes",
    // B · 2fdb023e23ba
    "setupFields.appearance.label": "Qu’est-ce que Camille voit de l’autre côté de la pièce ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · 9d93d5daf0a0
    "setupFields.appearance.placeholder": "ex. Quelqu’un qui sortait d’un service et qui n’a pas encore décidé si c’est une blague.",
    // B · 3aa4328667d6
    "protagonist.kind": "VIDE",
    // A · 78b111572544
    "opening": "La pièce sous l’institut est chaude et sent la terre mouillée, c’est la première chose qui cloche.\n\nDes lampes de culture. Des bacs plantés. Trois habitats bas ouverts contre le mur du fond, ni vitres, ni barreaux. Dans chacun, quelque chose de petit est déjà debout, fixé sur la porte.\n\nUne femme à peu près de ton âge est là, près du deuxième habitat, bras croisés. Elle est là depuis plus longtemps que toi et elle tient à le montrer.\n\n« J’en ai fait trois, » dit Morel derrière toi. « J’ai trouvé deux personnes qu’ils pourraient accepter. »\n\nIl ne la regarde pas.\n\n« Tu es arrivé le premier. »\n\n« Apparemment, c’est comme ça que la sélection scientifique se fait maintenant, » répond-elle.\n\nLe doré avance devant son habitat. Le noir aussi. Le troisième est déjà à l’avant, immobile depuis que tu es entré.\n\n« Choisis, » dit Morel.",
    // A · 6909190604f2
    "openingSuggestions": ["Je m’assois par terre, à un mètre vingt en arrière, et je pose les mains là où on peut les voir. « Je ne vais toucher à rien. » Puis j’attends, et je laisse celui ou celle qui veut venir à moi en faire son idée.","Je me retourne vers Morel. « Avant que je touche à l’un d’eux — qu’est-ce qui lui arrive si ça tourne mal ? Pas à moi, à lui ou elle. » Je veux voir combien de temps il met à répondre.","Je la regarde plutôt qu’eux. « Camille, c’est ça ? Tu es là depuis vingt minutes de plus que moi et tu as déjà choisi. » Je hoche la tête vers le deuxième habitat. « Alors dis-moi lequel tu veux et arrête la comédie. »"],
  },
});
