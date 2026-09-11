import { registerWorldText } from '@aniplay/contracts';

/**
 * Seven Days to Midnight, in French.
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
  storyId: "story_seven_days",
  text: {
    // A · 6460ef79cc0b
    "title": "Sept jours jusqu’à minuit",
    // A · 9b65bc3c8f97
    "fantasyLabel": "La ville s’arrête dimanche. Toi seul t’en souviens.",
    // A · ccccdcad81be
    "hook": "Tu es arrivé un lundi, pour repartir à zéro. Dimanche à minuit la ville est détruite et tu meurs. Puis c’est de nouveau lundi.",
    // A · 4827a5130389
    "premise": "Halcyon Bay est une petite ville côtière bâtie à flanc de colline, avec un port en bas et un clocher en haut. Tu es arrivé lundi matin, avec deux sacs et une chambre réservée pour la saison.\n\nLa semaine était bonne. Sur le quai, tu as rencontré une femme nommée Mina, qui a décidé sur-le-champ de te faire visiter. Tu as trouvé un bar qui te plaisait. Tu as commencé à penser que tu avais fait le bon choix.\n\nDimanche à minuit, la ville a été détruite. Tu n’as pas d’autre mot, puisque tu n’as pas vu ce qui l’a fait — juste la lumière, le bruit, et l’eau qui montait la colline.\n\nPuis tu t’es retrouvé de nouveau sur le quai, lundi matin, avec deux sacs, et Mina qui venait vers toi, disant la même chose qu’au premier jour.\n\nPersonne ne se souvient. Tu as sept jours, et tu les as déjà eus.\n\nLa seule chose que tu conserves, c’est ce que tu as compris.",
    // A · bf5dd8d19652
    "mechanicsChips": ["Un vrai planning hebdomadaire","Tes connaissances persistent","Change ce qui arrive","Les échos","Plusieurs fins"],
    // A · f972e21a7e8f
    "creatorNote": "Rien ne persiste, sauf ce que tu sais. Tout le reste — où sont les gens, ce qu’ils pensent de toi, ce que tu tiens — revient à lundi matin. Apprends la semaine, et tu pourras commencer à la démonter.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · a98605396251
    "rules.hardCanon": ["Personne à Halcyon Bay ne se souvient d’une semaine précédente. Pas une seule personne, jamais, sauf si l’histoire a enregistré un Écho.","Le joueur n’explique jamais la boucle au lecteur. Il la connaît déjà.","La semaine est fixe. Les événements se produisent aux heures où ils doivent se produire, sauf si le joueur les change.","La ville disparaît à minuit le dimanche. Rien de ce que le joueur a fait n’a jamais empêché ça.","La tour de l’horloge est arrêtée à 11 h 59 depuis soixante ans et le mécanisme est intact."],
    // A · 58f8c4d58e44
    "rules.toneGuide": "Chaleureux, précis, côtier. Le soleil sur le bitume mouillé, le vin pas cher, une ville où il fait vraiment bon vivre — c’est ça qui rend le dimanche insupportable. Des gens ordinaires, bien dessinés. L’horreur est structurelle, pas sanglante : la même conversation qui se répète, avec un seul qui s’en rend compte. Le rythme est à l’anime — une boucle peut être tranquille.",
    // B · 60a71a433970
    "rules.loop.persistentFlagPrefixes": ["sait :","écho :","boucle :"],
    // B · 7dd004ac5957
    "rules.loop.resetCopy": "Le train arrive. Tes sacs sont à tes pieds, les deux, rangés comme tu les as rangés. Il est huit heures douze du matin un lundi, et Mina Arclight marche sur le quai vers toi.",
    // B · c4a6f6ba9024
    "skills.observation.name": "Observation",
    // B · a8c1fa8269c3
    "skills.observation.attribute": "esprit",
    // B · 7db64e190a11
    "skills.observation.description": "Remarquer ce qui est différent cette fois.",
    // B · 04890a36609e
    "skills.persuasion.name": "Persuasion",
    // B · cfb7a15645c3
    "skills.persuasion.attribute": "présence",
    // B · 257825689d60
    "skills.persuasion.description": "Faire faire quelque chose à quelqu’un rien qu’avec ta parole.",
    // B · 4f64eb4d5f30
    "skills.deception.name": "Tromperie",
    // B · cfb7a15645c3
    "skills.deception.attribute": "présence",
    // B · 8366cc35e405
    "skills.deception.description": "Savoir quelque chose qu’il ne faudrait pas, de façon convaincante.",
    // B · 837d9279e002
    "skills.nerve.name": "Courage",
    // B · 4c84c2c842d0
    "skills.nerve.attribute": "détermination",
    // B · ddfbc6d2fe79
    "skills.nerve.description": "Le faire quand même à la quatrième tentative.",
    // B · 5166271ee25d
    "skills.research.name": "Recherche",
    // B · a8c1fa8269c3
    "skills.research.attribute": "esprit",
    // B · da71c6f20f58
    "skills.research.description": "Les archives, les dossiers, et ce qu’une ville écrit sur elle-même.",
    // B · 97067108775b
    "skills.legwork.name": "Terrain",
    // B · 7ce3b6387340
    "skills.legwork.attribute": "agilité",
    // B · 4e9b55839fea
    "skills.legwork.description": "Suivre quelqu’un, et traverser la ville à temps.",
    // B · baf8aa7ab5b5
    "skills.rapport.name": "Contact",
    // B · cfb7a15645c3
    "skills.rapport.attribute": "présence",
    // B · 2259fd8a044b
    "skills.rapport.description": "Être facile à aborder, ce qui est une clé en soi.",
    // B · c70e39f55444
    "skills.mechanism.name": "Mécanisme",
    // B · a8c1fa8269c3
    "skills.mechanism.attribute": "esprit",
    // B · 14b7d8f40305
    "skills.mechanism.description": "Les horloges, les serrures, et tout ce qui a été construit pour mesurer le temps.",
    // B · 971c0299c4c9
    "resources.energy.name": "Énergie",
    // B · 34e8ec1ac388
    "resources.energy.polarity": "BON_HAUT",
    // B · 58b8b0e69ba7
    "resources.energy.zeroStateConsequence": "Tu es à bout de forces. La semaine est longue.",
    // B · 62951ab4e079
    "resources.energy.color": "#4AB0E8",
    // B · f0924a6aaad6
    "resources.strain.name": "Tension",
    // B · a34adbda2422
    "resources.strain.polarity": "BON_BAS",
    // B · 00ff23f72beb
    "resources.strain.zeroStateConsequence": "Calme. C’est la première semaine, autant que ton corps le sache.",
    // B · c589f52fa224
    "resources.strain.color": "#B14A6C",
    // A · 7355cd98afff
    "items.two_bags.name": "Deux sacs",
    // B · 21bbab704ce0
    "items.two_bags.tags": ["quête"],
    // B · 2f223395c59d
    "items.two_bags.description": "Tout ce que tu as apporté. Tu les as déballés onze fois et ça prend quarante minutes.",
    // B · 45b642a0f610
    "items.two_bags.loreText": "Le bleu a une fermeture cassée. Il l’a toujours eue.",
    // B · 2088f328aea7
    "items.two_bags.icon": "sac",
    // A · 587f685b3f7a
    "items.room_key.name": "Clé de chambre n° 4",
    // B · f9ba5f51eeb2
    "items.room_key.tags": ["clé"],
    // B · 98e2c0effe65
    "items.room_key.description": "Laiton, usée et lisse, sur un porte-clé en bois avec le numéro gravé.",
    // B · c0c1baf2fa65
    "items.room_key.icon": "clé",
    // A · 83d33a1ddca3
    "items.notebook.name": "Un carnet",
    // B · f3a60c587a13
    "items.notebook.tags": ["outil"],
    // B · 57ad8fd31458
    "items.notebook.description": "Tu l’achètes chez le marchand de journaux le lundi. Il est à nouveau vierge chaque lundi et tu l’achètes quand même.",
    // B · 0769221ac5d9
    "items.notebook.loreText": "Le noter ne sert à rien. Le faire te donne l’impression de travailler sur quelque chose.",
    // B · f10eb448275d
    "items.notebook.icon": "livre",
    // A · 82542cc2d7ed
    "items.marina_ledger.name": "Le Registre de la Marina",
    // B · 061625d9bd60
    "items.marina_ledger.tags": ["quête","document"],
    // B · 40cda65b2ff3
    "items.marina_ledger.description": "Registres des places au port sur soixante ans. La page de la semaine où la tour s’est arrêtée a été découpée au couteau.",
    // B · bccca52309b0
    "items.marina_ledger.icon": "registre",
    // A · 4db62a83984d
    "items.tower_key.name": "La Clé de la Tour",
    // B · 6186d5acb076
    "items.tower_key.tags": ["clé","quête"],
    // B · a4061d8654af
    "items.tower_key.description": "Fer, vingt centimètres, bien trop lourd pour la porte qu’elle ouvre.",
    // B · ba91551da5ea
    "items.tower_key.loreText": "Elias la garde attachée à un cordon autour du cou et ne l’a jamais utilisée.",
    // B · c0c1baf2fa65
    "items.tower_key.icon": "clé",
    // A · 33f40b3445c0
    "items.good_bottle.name": "Une Bonne Bouteille",
    // B · 3567c528cfac
    "items.good_bottle.tags": ["cadeau"],
    // B · 17f1d3494e04
    "items.good_bottle.description": "Celle du magasin sur l’esplanade que tout le monde dit trop chère et que tout le monde achète.",
    // B · bf394d5be6ac
    "items.good_bottle.icon": "bouteille",
    // A · 56b52494f46d
    "items.ivys_coat.name": "Un Manteau Oublié sur un Banc",
    // B · 21bbab704ce0
    "items.ivys_coat.tags": ["quête"],
    // B · 4758c5123936
    "items.ivys_coat.description": "Vert, de bonne qualité, plié. Il est sur le banc au Point chaque jeudi matin et personne ne vient le chercher.",
    // B · 2c3f9da60ba7
    "items.ivys_coat.icon": "manteau",
    // A · 5af53be3bee4
    "abilities.take_it_in.name": "Prendre Tout",
    // B · a3a95fc80a85
    "abilities.take_it_in.tags": ["utilitaire","observation"],
    // B · e00417ffefb5
    "abilities.take_it_in.description": "Arrête-toi, et regarde vraiment ce qui est devant toi. Des choses que tu as dépassées six fois deviennent visibles.",
    // B · c44e6dd70059
    "abilities.take_it_in.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.take_it_in.check.attribute": "esprit",
    // A · bb07543ecfe0
    "abilities.say_the_impossible.name": "Dire l’Impossible",
    // B · 09b907576d49
    "abilities.say_the_impossible.tags": ["social"],
    // B · 4d355bd0595a
    "abilities.say_the_impossible.description": "Dis à quelqu’un quelque chose que tu ne peux pas savoir. Ça t’achète tout ou ça te coûte cette personne.",
    // B · 39d896e20aec
    "abilities.say_the_impossible.targetRule": "UNIQUE",
    // B · cfb7a15645c3
    "abilities.say_the_impossible.check.attribute": "présence",
    // A · 059245dde01e
    "abilities.be_somewhere_first.name": "Être Là le Premier",
    // B · 5251d369d3b6
    "abilities.be_somewhere_first.tags": ["utilitaire"],
    // B · bf056cdc388a
    "abilities.be_somewhere_first.description": "Tu sais quand ça arrive. Sois là avant, et bloque-le.",
    // B · c44e6dd70059
    "abilities.be_somewhere_first.targetRule": "AUCUN",
    // B · 7ce3b6387340
    "abilities.be_somewhere_first.check.attribute": "agilité",
    // A · c1690cfacde1
    "abilities.read_the_mechanism.name": "Décrypter le Mécanisme",
    // B · 1425485b7efd
    "abilities.read_the_mechanism.tags": ["utilitaire","mécanisme"],
    // B · ab1ebed8732d
    "abilities.read_the_mechanism.description": "Échappement, rouage, poids. Ce pour quoi c’était fait, et ce qu’on lui a fait depuis.",
    // B · 39d896e20aec
    "abilities.read_the_mechanism.targetRule": "UNIQUE",
    // B · a8c1fa8269c3
    "abilities.read_the_mechanism.check.attribute": "esprit",
    // B · 6e8f3c9fa8dd
    "abilities.read_the_mechanism.requires.flagsSet": ["sait :affaires_tour"],
    // B · 43ab443e7ce6
    "abilities.read_the_mechanism.requires.lockedCopy": "C’est une très grande horloge et tu n’as aucune idée de ce que tu regardes.",
    // A · 14d597620d03
    "abilities.the_long_way_round.name": "Par le Chemin Long",
    // B · 09b907576d49
    "abilities.the_long_way_round.tags": ["social"],
    // B · f1e3cc912f65
    "abilities.the_long_way_round.description": "Ne leur dis rien. Fais en sorte qu’ils l’apprennent par quelqu’un en qui ils ont déjà confiance.",
    // B · 39d896e20aec
    "abilities.the_long_way_round.targetRule": "SINGLE",
    // B · a8c1fa8269c3
    "abilities.the_long_way_round.check.attribute": "esprit",
    // B · 1e99d13675bd
    "abilities.the_long_way_round.requires.flagsSet": ["sait :la_semaine"],
    // B · c71734edaa76
    "abilities.the_long_way_round.requires.lockedCopy": "Tu ne sais pas encore assez de choses sur cette semaine pour organiser quoi que ce soit.",
    // A · 40d1f3c44427
    "locations.the_platform.name": "Gare de Halcyon Bay",
    // A · 44c11f4ab0bb
    "locations.the_platform.shortName": "La Gare",
    // B · 3e16902f2669
    "locations.the_platform.description": "Une seule plateforme, un auvent avec un trou, et une vue directe en bas de la colline jusqu’à l’eau. Le train de 8 h 12 arrive et environ neuf personnes en descendent.",
    // B · 4afcd6a3e556
    "locations.the_platform.stageImage": "story_seven_days/stage_the_platform",
    // A · 3498430e6a2a
    "locations.the_esplanade.name": "L’Esplanade",
    // A · e548275db785
    "locations.the_esplanade.shortName": "Le Front",
    // B · 46c83d3bb8aa
    "locations.the_esplanade.description": "Une courbe de devantures face à l’eau. Un marchand de journaux, une cave à vin dont tout le monde se plaint, trois cafés, et des bancs toujours pleins dès dix heures.",
    // B · 046562cee7ad
    "locations.the_esplanade.stageImage": "story_seven_days/stage_the_esplanade",
    // A · 89145832bca8
    "locations.boarding_house.name": "La Pension",
    // A · dece7d087374
    "locations.boarding_house.shortName": "La Maison",
    // B · c8af0c6191f7
    "locations.boarding_house.description": "Quatre chambres, une logeuse qui ne pose pas de questions, et une cuisine que tu peux utiliser jusqu’à neuf heures. Ta chambre est la numéro quatre et donne sur la cour.",
    // B · 92a86c4774ce
    "locations.boarding_house.stageImage": "story_seven_days/stage_boarding_house",
    // A · cab86ae9a426
    "locations.the_marina.name": "La Marina",
    // A · cab86ae9a426
    "locations.the_marina.shortName": "La Marina",
    // B · 98bffda44c13
    "locations.the_marina.description": "Quatre-vingts places, peut-être trente occupées. Le bureau est une cabine de chantier avec soixante ans de paperasse et une serrure qu’un enfant pourrait ouvrir.",
    // B · 6dee1807607b
    "locations.the_marina.stageImage": "story_seven_days/stage_the_marina",
    // A · cecd9bdd9971
    "locations.the_library.name": "La Bibliothèque Municipale",
    // A · 0c38d35f2518
    "locations.the_library.shortName": "La Bibliothèque",
    // B · 8bd8a43b4ffe
    "locations.the_library.description": "Une pièce à l’étage au-dessus de l’ancienne salle des fêtes. L’histoire locale au fond, trois tables, et un garçon toujours assis à la table du milieu.",
    // B · 4c9d897b9856
    "locations.the_library.stageImage": "story_seven_days/stage_the_library",
    // A · 706e84509243
    "locations.the_clock_tower.name": "La Tour de l’Horloge",
    // A · d3e7744f1648
    "locations.the_clock_tower.shortName": "La Tour",
    // B · b938b1db0ad0
    "locations.the_clock_tower.description": "Sommet de la colline, vingt-sept mètres, arrêtée à 23 h 59 depuis avant la naissance de quiconque encore en vie. Le mécanisme est huilé, tourne, mais ne mène à rien.",
    // B · 623991f44a5d
    "locations.the_clock_tower.stageImage": "story_seven_days/stage_the_clock_tower",
    // A · 90772b557ab4
    "locations.the_old_town.name": "La Vieille Ville",
    // A · 9a26d7a2a61f
    "locations.the_old_town.shortName": "Vieille Ville",
    // B · 8f882efa83ab
    "locations.the_old_town.description": "Six rues de cottages en pierre au-dessus du front de mer, la plupart en location saisonnière. Ceux qui ne le sont pas ont le même nom de famille que ceux du cimetière.",
    // B · 9cf048170d6a
    "locations.the_old_town.stageImage": "story_seven_days/stage_the_old_town",
    // A · 68b9dc8cf805
    "locations.council_hall.name": "La Salle du Conseil",
    // A · 9babb982fe2c
    "locations.council_hall.shortName": "La Salle",
    // B · 340fc599d706
    "locations.council_hall.description": "Bâtiment municipal des années 1890, beaucoup trop grand pour une ville de cette taille. Quelqu’un l’a construit en espérant que Halcyon Bay deviendrait autre chose.",
    // B · 9e843f1b5355
    "locations.council_hall.stageImage": "story_seven_days/stage_council_hall",
    // A · c7cbc00f2a29
    "locations.the_point.name": "Le Cap",
    // A · c7cbc00f2a29
    "locations.the_point.shortName": "Le Cap",
    // B · 5029a43dc251
    "locations.the_point.description": "La pointe au-delà de la marina. Un banc, un chemin, et une vue sur toute la ville depuis le côté de l’eau. Les gens viennent ici pour être ailleurs.",
    // B · 559c4bad5919
    "locations.the_point.stageImage": "story_seven_days/stage_the_point",
    // B · 2af27b5e21f2
    "characters.mina.name": "Mina Arclight",
    // A · 7ed0c4237ec0
    "characters.mina.role": "La première personne que tu rencontres, chaque lundi",
    // A · ef01a9eb1456
    "characters.mina.cardBlurb": "Elle vient te voir sur le quai et décide de te faire visiter, semaine après semaine, et le dimanche soir c’est la seule personne qu’on ne peut jamais trouver.",
    // B · aee35f364a88
    "characters.mina.pronouns": "elle",
    // A · c44c59f67ba3
    "characters.mina.publicTraits": ["Chaleureuse","Franche","Vraiment contente de te voir"],
    // B · 4f7e3c32fa7b
    "characters.mina.hiddenDrives": ["Elle essaie de quitter Halcyon Bay depuis quatre ans et quelque chose l’en empêche toujours"],
    // B · 9e3c6d93aff0
    "characters.mina.values": ["Être gentille avant tout","Les gens qui sont restés","Ne pas faire de vague"],
    // B · 275cb967587e
    "characters.mina.fears": ["Être la raison pour laquelle quelqu’un reste","La tour"],
    // A · 82f34b60326a
    "characters.mina.socialStyle": "Elle te pose trois questions avant que tu aies eu le temps d’en poser une.",
    // B · 844d465a22db
    "characters.mina.boundaries": ["Ne parle pas de son père","Ne monte pas à la tour après la tombée de la nuit"],
    // B · e5eb281f248a
    "characters.mina.goals": ["Passer la saison","Prendre vraiment un train cette fois"],
    // B · 714452ddd986
    "characters.mina.secrets.mina_goes_to_the_tower.fact": "À neuf heures trente le dimanche, Mina monte seule à la tour de l’horloge. Elle le fait chaque semaine sans savoir pourquoi.",
    // B · 47558a04be8d
    "characters.mina.secrets.mina_goes_to_the_tower.visibility": "NPC_PRIVATE",
    // B · 69ce1b6caf31
    "characters.mina.secrets.mina_goes_to_the_tower.revealHint": "Confiance 45+, ou si le joueur la suit un dimanche et lui demande après un reset.",
    // B · eb6d6188c3e9
    "characters.mina.secrets.mina_father_wound_it.fact": "Le père de Mina était le dernier gardien de la tour. Il l’a arrêtée exprès, soixante ans, c’est faux — c’était il y a onze ans et la ville s’en souvient comme si c’était soixante.",
    // B · 47558a04be8d
    "characters.mina.secrets.mina_father_wound_it.visibility": "NPC_PRIVATE",
    // B · b1acd5ea3344
    "characters.mina.secrets.mina_father_wound_it.revealHint": "Tard. Seulement après que le joueur a le registre ou a lu le mécanisme.",
    // A · 5b2111a3aefe
    "characters.mina.speechStyle": "Rapide, chaleureux, rempli de petits détails sur la ville. Elle dédramatise avec une blague, une seule fois.",
    // A · 0192a3ec462b
    "characters.mina.topics": ["la ville","la tour","son père","le dimanche","le départ"],
    // A · fc0d131371b3
    "characters.mina.voiceSamples": ["On dirait quelqu’un qui n’a pas mangé depuis le train. Allez, viens.","Tout le monde dit que la cave à vin arnaque. Tout le monde achète le vin.","Je ne monte pas là-haut. Pas ce soir. Pose-moi autre chose."],
    // B · 1a0cc2df7ee7
    "characters.mina.appearance": "Fin de vingtaine, boucles sombres mal attachées, un manteau trop chaud pour le temps.",
    // B · ab6ab0672fb3
    "characters.mina.visualHook": "Une montre à gousset en laiton sur une chaîne, portée à l’extérieur de son manteau, qui ne marche pas.",
    // B · 054f49ce1c4e
    "characters.mina.silhouette": "Mains dans les poches, marche un peu trop vite, toujours un demi-pas devant toi.",
    // B · e28266b6fa9a
    "characters.mina.artSeed": "seven_days_mina_v1",
    // B · 676e4ccd6c2b
    "characters.mina.portrait": "story_seven_days/mina",
    // B · 1d949ff79672
    "characters.mina.expressions": ["neutre","ravie","évasive","effrayée"],
    // B · bc4ea453d375
    "characters.mina.knowledgeScope": ["la ville","la tour","son père"],
    // B · 44abed3772f4
    "characters.mina.gates.mina_tells_you.label": "Elle te parle de la nuit de dimanche",
    // B · 55a54e80451a
    "characters.mina.gates.mina_tells_you.kind": "CONFIANCE",
    // B · ca5c20530c91
    "characters.mina.gates.mina_tells_you.requires.flagsSet": ["parlé :mina"],
    // B · a2a284e8bd55
    "characters.mina.gates.mina_romance.label": "Quelque chose dont aucun de vous ne se souviendra",
    // B · 0b75bc536447
    "characters.mina.gates.mina_romance.kind": "ROMANCE",
    // B · 8d234559d531
    "characters.mina.combatant.tags": ["civil"],
    // B · b41a2bd3b1a7
    "characters.theo.name": "Theo Marr",
    // A · cf6d457a31b0
    "characters.theo.role": "Le garçon à la table du milieu",
    // A · a1f4a39046ff
    "characters.theo.cardBlurb": "Il est à la bibliothèque tous les jours et remarque tout, y compris que tu sais déjà où sont les choses.",
    // B · fcca6b746d0b
    "characters.theo.pronouns": "il/lui",
    // A · d6cdb3c10814
    "characters.theo.publicTraits": ["Sarcastique","Observateur","Un peu seul"],
    // B · 64b32cca300b
    "characters.theo.hiddenDrives": ["Il veut être pris au sérieux par un seul adulte"],
    // B · 64bdb87c90d4
    "characters.theo.values": ["Avoir raison","Dire ce qui dérange","Les gens qui ne le prennent pas de haut"],
    // B · ff91a1b51782
    "characters.theo.fears": ["Être pris pour un enfant","Avoir tort à voix haute"],
    // A · 0394bc7c2bbe
    "characters.theo.socialStyle": "Il commence par quelque chose de rude pour voir si tu pars.",
    // B · ba5064d6b37b
    "characters.theo.boundaries": ["Ne se laisse pas prendre de haut","Ne se laisse pas manipuler"],
    // B · 78b5014866ea
    "characters.theo.goals": ["Comprendre ce qui cloche dans cette ville","S’enfuir"],
    // B · 2217095743c6
    "characters.theo.secrets.theo_has_a_list.fact": "Theo tient une liste des choses qui ne collent pas à Halcyon Bay. Il y a dix-neuf points, dont quatre sont justes.",
    // B · 47558a04be8d
    "characters.theo.secrets.theo_has_a_list.visibility": "NPC_PRIVÉ",
    // B · 5bd109b48391
    "characters.theo.secrets.theo_has_a_list.revealHint": "Confiance 30+, ou si le joueur lui dit quelque chose qu’il a déjà noté.",
    // A · 580bb2267d22
    "characters.theo.speechStyle": "Sec, rapide, douze mots là où trois suffiraient, et parfois pile dans le mille.",
    // A · 4c6cbbf8f39c
    "characters.theo.topics": ["la ville","la tour","sa liste","les archives du journal","toi"],
    // A · a44a09e8b354
    "characters.theo.voiceSamples": ["Tu es venu ici quatre fois sans jamais jeter un œil à une étagère.","Je ne dis pas que c’est impossible. Je dis juste que tu en parlais comme quelqu’un qui lit un truc.","Allez, alors. Raconte-moi ce qui se passe jeudi."],
    // B · e905d7203584
    "characters.theo.appearance": "Dix-sept ans, mince, un manteau d’école qu’il a clairement dépassé.",
    // B · 550a7ea0bc29
    "characters.theo.visualHook": "Un carnet rouge en spirale dont il ne laisse jamais personne voir l’intérieur.",
    // B · b261a074d973
    "characters.theo.silhouette": "Penché sur une table avec tout étalé trop loin.",
    // B · 00a6c7fbfb9b
    "characters.theo.artSeed": "seven_days_theo_v1",
    // B · d2d156f2ce6f
    "characters.theo.portrait": "story_seven_days/theo",
    // B · d6b36886afcb
    "characters.theo.expressions": ["neutre","sceptique","ravi","secoué"],
    // B · d750b4365c9a
    "characters.theo.knowledgeScope": ["la ville","les archives","sa liste"],
    // B · b3ced94c9e0e
    "characters.theo.gates.theo_believes.label": "Il décide que tu ne mens pas",
    // B · 55a54e80451a
    "characters.theo.gates.theo_believes.kind": "CONFIANCE",
    // B · 25f1fa774bff
    "characters.theo.gates.theo_believes.requires.flagsSet": ["parlé :theo"],
    // B · 8d234559d531
    "characters.theo.combatant.tags": ["civil"],
    // B · a4b3965c45ee
    "characters.wynn.name": "Détective Sera Wynn",
    // A · 2d40e45e776f
    "characters.wynn.role": "Elle enquête sur un truc qui n’est pas encore arrivé",
    // A · f32dae1cd7c6
    "characters.wynn.cardBlurb": "Elle arrive mercredi pour enquêter sur une disparition que tu as déjà vue arriver, et elle voudra savoir comment tu le sais.",
    // B · aee35f364a88
    "characters.wynn.pronouns": "elle/la",
    // A · 111638457b63
    "characters.wynn.publicTraits": ["Méthodique","Fatiguée","Pas méchante"],
    // B · 05960ff30d76
    "characters.wynn.hiddenDrives": ["Elle a reçu ce dossier précisément parce qu’il n’ira nulle part"],
    // B · 7b5108c206e4
    "characters.wynn.values": ["Que le dossier soit juste","Ne pas deviner","Les gens qui répondent à la question posée"],
    // B · 0317e713c7f2
    "characters.wynn.fears": ["Passer pour une idiote","Un autre dossier classé sans suite"],
    // A · 230f8e9c0484
    "characters.wynn.socialStyle": "Elle note ce que tu dis au fur et à mesure que tu parles.",
    // B · 9ad6511b904b
    "characters.wynn.boundaries": ["Ne discute pas d’un dossier ouvert","Ne se fait pas mentir deux fois"],
    // B · a7fc7dcc13dc
    "characters.wynn.goals": ["Retrouver Ivy Sable","Retourner sur le continent"],
    // B · 19786ee2c1bd
    "characters.wynn.secrets.wynn_has_four_files.fact": "Wynn a quatre dossiers. Quatre personnes ont disparu à Halcyon Bay un mercredi, sur quatre années différentes, et quatre manteaux ont été retrouvés pliés sur le même banc.",
    // B · 47558a04be8d
    "characters.wynn.secrets.wynn_has_four_files.visibility": "NPC_PRIVÉ",
    // B · 1bb84b1bb620
    "characters.wynn.secrets.wynn_has_four_files.revealHint": "Confiance 40+, ou si le joueur montre le manteau avant jeudi.",
    // A · cd2bdbe5d77b
    "characters.wynn.speechStyle": "Posée, procédurale, et de temps en temps d’une humanité déconcertante.",
    // A · d02c3322c85e
    "characters.wynn.topics": ["la disparition","Ivy Sable","le manteau","ses quatre dossiers","la ville"],
    // A · 5a23387f93df
    "characters.wynn.voiceSamples": ["Tu es arrivé quand ? Sois précis.","Tu m’as dit un truc que je n’ai pas encore lâché. J’aimerais que tu m’expliques ça.","J’en ai quatre comme ça. J’aimerais vraiment qu’il n’y en ait que trois."],
    // B · 6c71066565dc
    "characters.wynn.appearance": "Quarantaine, manteau sensible, cheveux attachés de la même façon chaque jour.",
    // B · 06eac3e15ed2
    "characters.wynn.visualHook": "Une pochette en carton pour documents qu’elle porte partout, attachée avec une ficelle.",
    // B · 0ad6105cb78c
    "characters.wynn.silhouette": "Droit, les mains pleines, toujours un peu dans le chemin.",
    // B · 07c5c47eb4ee
    "characters.wynn.artSeed": "seven_days_wynn_v1",
    // B · fa787f2ae8a9
    "characters.wynn.portrait": "story_seven_days/wynn",
    // B · 9204a9b8aefd
    "characters.wynn.expressions": ["neutre","aiguisée","fatiguée"],
    // B · a4bb705e6a75
    "characters.wynn.knowledgeScope": ["la disparition","quatre dossiers","procédure policière"],
    // B · 4154b4187523
    "characters.wynn.gates.wynn_shares.label": "Elle te montre les trois autres dossiers",
    // B · 55a54e80451a
    "characters.wynn.gates.wynn_shares.kind": "CONFIANCE",
    // B · f395489c9156
    "characters.wynn.gates.wynn_shares.requires.flagsSet": ["parlé :wynn"],
    // B · 7cccc0e984fb
    "characters.wynn.combatant.tags": ["police"],
    // B · 4e835d8bbaa6
    "characters.elias.name": "Elias Crowe",
    // A · b949b384b9bc
    "characters.elias.role": "L’homme que tout le monde dit malade",
    // A · a4253637de6c
    "characters.elias.cardBlurb": "Tout le monde te dit qu’il est malade. Il a mesuré cette horloge pendant neuf ans et c’est la seule personne ici qui ait raison sur quoi que ce soit.",
    // B · fcca6b746d0b
    "characters.elias.pronouns": "il/lui",
    // A · 5742af655f38
    "characters.elias.publicTraits": ["Intense","Épuisé","Précis"],
    // B · f09b9bcf7c52
    "characters.elias.hiddenDrives": ["Il a besoin qu’une autre personne voie les chiffres"],
    // B · 6ad0acb5ad27
    "characters.elias.values": ["La mesure","Ne pas mentir sur les données","Être cru au moins une fois"],
    // B · fce5be3dbe11
    "characters.elias.fears": ["Être interné","Avoir raison"],
    // A · 75f9c58f77ad
    "characters.elias.socialStyle": "Parle vite, au cœur du sujet, sans revenir au début.",
    // B · 656b8cfd8a50
    "characters.elias.boundaries": ["Ne laissera personne toucher au mouvement","Ne montera pas un dimanche"],
    // B · 8c8bd36bf960
    "characters.elias.goals": ["Terminer la mesure","Faire regarder le registre à quelqu’un"],
    // B · cfb05bd61813
    "characters.elias.secrets.elias_the_tower_runs.fact": "Le mouvement de la tour tourne. Elias le mesure depuis neuf ans. Il donne l’heure pour quelque chose et les aiguilles ne sont pas reliées à ça.",
    // B · 47558a04be8d
    "characters.elias.secrets.elias_the_tower_runs.visibility": "NPC_PRIVATE",
    // B · d6a63a9498a8
    "characters.elias.secrets.elias_the_tower_runs.revealHint": "Il le dira à n’importe qui. Personne n’a jamais écouté assez longtemps.",
    // B · d95c7e70cf06
    "characters.elias.secrets.elias_seven_days.fact": "Le mouvement fait un cycle complet toutes les sept jours, qui s’achève à minuit le dimanche. Elias n’a jamais compris ce que ça compte.",
    // B · 47558a04be8d
    "characters.elias.secrets.elias_seven_days.visibility": "NPC_PRIVATE",
    // B · 584ab08c7024
    "characters.elias.secrets.elias_seven_days.revealHint": "Confiance 35+, et seulement de quelqu’un qui a posé une deuxième question.",
    // A · 0939ed692b1c
    "characters.elias.speechStyle": "Rapide, technique, un peu formel, et complètement indifférent à ce que tu comprends.",
    // A · 1200aa7e8855
    "characters.elias.topics": ["le mouvement","le cycle","le registre","le père de Mina","le dimanche"],
    // A · ac1107e30be0
    "characters.elias.voiceSamples": ["Ça tourne. Ce n’est pas une théorie, c’est une mesure, et j’en ai neuf ans.","Tout le monde décroche à la troisième phrase. Ne fais pas ça, s’il te plaît.","Sept jours. Ça repart à zéro. Je sais pas ce que ça compte, et toi non plus."],
    // B · 339ca34f5abb
    "characters.elias.appearance": "Trentenaire, non rasé, un manteau avec un carnet dans chaque poche.",
    // B · 40915c4a84c2
    "characters.elias.visualHook": "Les bouts des doigts toujours tachés d’huile d’horloge, et une ficelle autour du cou avec une clé en fer.",
    // B · 0d6858f93e05
    "characters.elias.silhouette": "Trop immobile, puis soudain tout d’un coup.",
    // B · b3874ec235d4
    "characters.elias.artSeed": "seven_days_elias_v1",
    // B · 6d0d993056ea
    "characters.elias.portrait": "story_seven_days/elias",
    // B · 5493fbce419b
    "characters.elias.expressions": ["neutre","urgent","justifié","vide"],
    // B · 2e5ed832bccb
    "characters.elias.knowledgeScope": ["le mouvement","le cycle","la tour"],
    // B · 26ab99676efe
    "characters.elias.gates.elias_shows_you.label": "Il t’emmène voir le mouvement",
    // B · 55a54e80451a
    "characters.elias.gates.elias_shows_you.kind": "CONFIANCE",
    // B · df27171ba762
    "characters.elias.gates.elias_shows_you.requires.flagsSet": ["parlé :elias"],
    // B · 8d234559d531
    "characters.elias.combatant.tags": ["civil"],
    // B · 1dc39a1fe6c9
    "characters.ivy.name": "Ivy Sable",
    // A · 16a3b3f5c85e
    "characters.ivy.role": "Celle qui disparaît le mercredi",
    // A · fe2af4a8fd6f
    "characters.ivy.cardBlurb": "Tu la croiseras trois fois avant de comprendre que c’est la femme dont le manteau est plié sur le banc tous les jeudis matin.",
    // B · aee35f364a88
    "characters.ivy.pronouns": "elle",
    // A · 52d074b625aa
    "characters.ivy.publicTraits": ["Discrète","Drôle quand elle se lance","Toujours sur le départ"],
    // B · ee010092737e
    "characters.ivy.hiddenDrives": ["Elle a décidé de partir et ne l’a dit à personne"],
    // B · 013e5f3e754a
    "characters.ivy.values": ["Ne pas être un poids","Les gens de la marina","Faire ça à ses conditions"],
    // B · a9c4f66850fa
    "characters.ivy.fears": ["Se faire dissuader","Se faire retrouver"],
    // A · 1b5eb04a5efc
    "characters.ivy.socialStyle": "Répond à la question que tu as posée, pas à celle que tu voulais.",
    // B · 648a92567419
    "characters.ivy.boundaries": ["Ne sera pas suivie","Ne s’explique pas deux fois"],
    // B · 1989dbe42d12
    "characters.ivy.goals": ["Tenir jusqu’à mercredi"],
    // B · dcfc789b41eb
    "characters.ivy.secrets.ivy_is_not_taken.fact": "Personne ne retient Ivy Sable. Mercredi à onze heures et demie, elle marche jusqu’au Point, plie son manteau, et entre dans l’eau.",
    // B · 47558a04be8d
    "characters.ivy.secrets.ivy_is_not_taken.visibility": "NPC_PRIVATE",
    // B · 13a4485d3a9d
    "characters.ivy.secrets.ivy_is_not_taken.revealHint": "Le joueur doit être là, ou comprendre le schéma à partir des quatre dossiers de Wynn.",
    // A · 58ac2ae9256a
    "characters.ivy.speechStyle": "Économe, sèche, plus chaleureuse qu’elle ne le voudrait.",
    // A · d8435964d19b
    "characters.ivy.topics": ["la marina","les bateaux","partir","la Pointe"],
    // A · 9c132b92a642
    "characters.ivy.voiceSamples": ["T’es nouveau. Ça s’estompera.","J’aime bien la Pointe. Personne te parle là-bas.","Faut pas faire ça. Faut pas décider que tu vas être celui ou celle qui répare quelque chose."],
    // B · c9e0e2198d01
    "characters.ivy.appearance": "Cinquante ans, marquée par le temps, un manteau vert bien plus soigné que le reste de ses vêtements.",
    // B · 1cc319e13517
    "characters.ivy.visualHook": "Le manteau vert lui-même — cher, entretenu, et plié sur un banc chaque jeudi.",
    // B · 2c5900bdd3db
    "characters.ivy.silhouette": "Petite, mains dans les poches, debout là où le vent est le plus fort.",
    // B · cdf914c5a466
    "characters.ivy.artSeed": "seven_days_ivy_v1",
    // B · 76e3f24156a8
    "characters.ivy.portrait": "story_seven_days/ivy",
    // B · 81e79bf39ae6
    "characters.ivy.expressions": ["neutre","sec","distante"],
    // B · 95ba23e9e180
    "characters.ivy.knowledgeScope": ["la marina","les bateaux"],
    // B · 33308073cb4d
    "characters.ivy.gates.ivy_talks.label": "Elle te dit ce qu’elle a décidé",
    // B · 55a54e80451a
    "characters.ivy.gates.ivy_talks.kind": "CONFIANCE",
    // B · 6cbf9ed5fa15
    "characters.ivy.gates.ivy_talks.requires.flagsSet": ["parlé :ivy"],
    // B · 8d234559d531
    "characters.ivy.combatant.tags": ["civil"],
    // B · d82cda562bdc
    "characters.harrow.name": "Conseillère Ada Harrow",
    // A · 1179921f3bd8
    "characters.harrow.role": "Arrive jeudi, repart vendredi",
    // A · 4e85a309c0c3
    "characters.harrow.cardBlurb": "Elle descend jeudi pour signer un papier à propos de la tour, et elle est partie vendredi — la seule personne que tu n’as jamais trouvée en ville un dimanche.",
    // B · aee35f364a88
    "characters.harrow.pronouns": "elle",
    // A · 12e6140e9230
    "characters.harrow.publicTraits": ["Soignée","Impatiente","Vraiment compétente"],
    // B · 60d409077861
    "characters.harrow.hiddenDrives": ["Elle sait exactement ce qu’est la tour et sa famille la gère depuis quatre générations"],
    // B · 7de98f3d5033
    "characters.harrow.values": ["Confinement","Le continent","Que personne ne découvre"],
    // B · 61a6425d29c2
    "characters.harrow.fears": ["Une enquête publique","Être la génération sous laquelle ça échoue"],
    // A · 50b5c246b2a9
    "characters.harrow.socialStyle": "Elle te donne quatre-vingt-dix secondes et elle s’en sert.",
    // B · 89806f112e94
    "characters.harrow.boundaries": ["Ne parlera pas de la tour","Ne restera pas après vendredi"],
    // B · a0902c3fbad6
    "characters.harrow.goals": ["Signer l’ordre de maintenance","Prendre le train du vendredi"],
    // B · 9b02c0faff1a
    "characters.harrow.secrets.harrow_knows.fact": "La famille Harrow paie l’entretien de la tour depuis quatre générations. Ada sait ce qu’elle fait. Elle ne sait pas comment l’arrêter et a arrêté d’essayer.",
    // B · 47558a04be8d
    "characters.harrow.secrets.harrow_knows.visibility": "NPC_PRIVATE",
    // B · ef988aeb1b60
    "characters.harrow.secrets.harrow_knows.revealHint": "Très tard. Seulement à un joueur qui peut lui dire quelque chose sur dimanche qu’elle n’a dit à personne.",
    // A · 78e2d44b3335
    "characters.harrow.speechStyle": "Courte, polie, complètement faite pour partir.",
    // A · 87c0cbe0bf32
    "characters.harrow.topics": ["l’ordre de maintenance","la tour","le continent","sa famille"],
    // A · 4381a9f5079c
    "characters.harrow.voiceSamples": ["J’ai jusqu’à quatre heures. C’est à propos de quoi.","La tour est un monument classé et une ligne au budget. C’est tout.","Qui t’a raconté ça s’est trompé. Plusieurs fois, à ce qu’on entend."],
    // B · a738a85e0018
    "characters.harrow.appearance": "Cinquante ans, impeccable, totalement déplacée dans une ville côtière.",
    // B · 35fce55d67f0
    "characters.harrow.visualHook": "Une chevalière avec un cadran d’horloge, portée à la main droite.",
    // B · 5f9b6e9ecd35
    "characters.harrow.silhouette": "Lignes droites et un bon manteau, toujours prête à partir.",
    // B · 600e9199026f
    "characters.harrow.artSeed": "seven_days_harrow_v1",
    // B · 9b510d80c6d1
    "characters.harrow.portrait": "story_seven_days/harrow",
    // B · 2da4a54a1c59
    "characters.harrow.expressions": ["neutre","impatiente","sur ses gardes"],
    // B · 7dca97a3c6ff
    "characters.harrow.knowledgeScope": ["la tour","l’ordre de maintenance","sa famille"],
    // B · bc8765e550f2
    "characters.harrow.gates.harrow_admits.label": "Elle arrête de faire semblant que c’est une ligne budgétaire",
    // B · 55a54e80451a
    "characters.harrow.gates.harrow_admits.kind": "CONFIANCE",
    // B · 6e8f3c9fa8dd
    "characters.harrow.gates.harrow_admits.requires.flagsSet": ["sait :affaires_tour"],
    // B · 8d234559d531
    "characters.harrow.combatant.tags": ["civil"],
    // B · cdba30713387
    "factions.faction_town.name": "Halcyon Bay",
    // B · 6df169ddb61e
    "factions.faction_town.description": "La ville elle-même : qui connaît ton nom, qui te fait un signe dans la boutique, et qui commence à te trouver étrange.",
    // B · ca84054e4725
    "factions.faction_believers.name": "Ceux qui te croient",
    // B · 9c555b9f0570
    "factions.faction_believers.description": "Tous ceux qui ont été convaincus, cette boucle, que la semaine s’est déjà produite. Il y en a presque jamais plus d’un.",
    // B · 81054afa89c2
    "quests.q_the_office.title": "Dix heures, mardi",
    // B · f9044d11ab75
    "quests.q_the_office.summary": "Le bureau de la marina est cambriolé à dix heures mardi soir. Tu le sais maintenant.",
    // B · 552c0b7f83c2
    "quests.q_the_office.kind": "SECONDAIRE",
    // B · a716bb2253f6
    "quests.q_the_office.discoverWhen.flagsSet": ["sait :le_vol_est_arrivé"],
    // B · a3f13161eb9f
    "quests.q_the_office.steps.step_be_in_the_office.playerCopy": "Sois dans le bureau de la marina avant dix heures mardi soir.",
    // B · 747914e4a8e0
    "quests.q_the_office.steps.step_be_in_the_office.directorNotes": "La première chose qu’un joueur peut retenir de cette semaine. Être dans la cabine du port entre huit et dix heures mardi empêche Elias d’entrer, et la page pour la semaine où la tour s’est arrêtée reste dans le livre. Ce n’est pas un voleur et il ne faut pas le décrire comme tel — c’est un homme qui demande poliment depuis neuf ans et qui a perdu patience.",
    // B · 9ee9c62df002
    "quests.q_the_office.steps.step_be_in_the_office.succeedWhen.atLocation": "la_marina",
    // B · ffd5d0d2b7bc
    "quests.q_the_office.steps.step_be_in_the_office.rewards.flags": ["a_arrete_le_vol","sait :elias_prend_la_page"],
    // B · 724a2e73df3a
    "quests.q_the_office.involvedCharacterIds": ["elias","ivy"],
    // B · b6263e4e21c8
    "quests.q_the_office.involvedLocationIds": ["la_marina"],
    // B · f09075e42ed2
    "quests.q_the_office.knownRewardCopy": "Un registre qui a encore toutes ses pages.",
    // B · d5039a79e514
    "quests.q_the_bench.title": "Onze heures trente, mercredi",
    // B · f286005a3236
    "quests.q_the_bench.summary": "Un manteau vert est plié sur le banc au Point chaque jeudi matin. Tu sais pourquoi maintenant.",
    // B · 552c0b7f83c2
    "quests.q_the_bench.kind": "SECONDAIRE",
    // B · 434d8324f740
    "quests.q_the_bench.discoverWhen.flagsSet": ["sait :ivy_va"],
    // B · 0822a1b1b234
    "quests.q_the_bench.steps.step_be_on_the_bench.playerCopy": "Sois sur le banc au Point avant onze heures trente mercredi.",
    // B · 4d42f95b02ec
    "quests.q_the_bench.steps.step_be_on_the_bench.directorNotes": "Personne ne touche à Ivy Sable. Être là signifie qu’elle doit passer devant quelqu’un, et elle ne le fait pas. Ce n’est pas une énigme ni un sauvetage — c’est une personne qui a pris une décision, et le joueur est un inconnu sur son banc. Elle sera furieuse. Elle sera aussi encore vivante jeudi.",
    // B · fe66296cf38e
    "quests.q_the_bench.steps.step_be_on_the_bench.succeedWhen.atLocation": "le_point",
    // B · 97a99107d5b8
    "quests.q_the_bench.steps.step_be_on_the_bench.rewards.flags": ["ivy_arretee","sait :pourquoi_ivy_va"],
    // B · 0320cf66224f
    "quests.q_the_bench.involvedCharacterIds": ["ivy","wynn"],
    // B · 7e4376ceb932
    "quests.q_the_bench.involvedLocationIds": ["le_point"],
    // B · e97630580400
    "quests.q_the_bench.knownRewardCopy": "Ivy Sable, jeudi.",
    // B · 8a153c9ac8ce
    "quests.q_the_week.title": "Comprendre la semaine",
    // B · fa1854cec717
    "quests.q_the_week.summary": "Sept jours se répètent toujours de la même façon. Découvre ce qu’ils sont.",
    // B · 7fcc0be2ad9c
    "quests.q_the_week.kind": "PRINCIPALE",
    // B · 0fca703eaeeb
    "quests.q_the_week.steps.step_see_it_happen.playerCopy": "Découvre ce que cette semaine fait quand tu ne la touches pas.",
    // B · 10b567fff28e
    "quests.q_the_week.steps.step_see_it_happen.directorNotes": "La première boucle est faite pour être vécue, pas gagnée. Tout ce que fait le joueur qui le place devant un des événements fixes compte. Ne le pousse pas vers la tour ; laisse-le trouver le fil qu’il trouve. Un joueur qui passe toute la semaine dans un café avec Mina a quand même appris quelque chose.",
    // B · e102b4bbe4fd
    "quests.q_the_week.steps.step_see_it_happen.rewards.abilities": ["le_long_chemin"],
    // B · 21b8db74bed1
    "quests.q_the_week.steps.step_change_one.playerCopy": "Change quelque chose qui arrive toujours.",
    // B · 7f5ea3eb8b67
    "quests.q_the_week.steps.step_change_one.directorNotes": "Le moment où ça devient un jeu et pas une histoire. Le joueur doit être quelque part avant un événement et l’empêcher. Deux sont accessibles tôt — être dans le bureau de la marina avant dix heures mardi, et être sur le banc au Point avant onze heures trente mercredi. Les deux doivent donner l’impression que le joueur a battu le monde plutôt que le monde l’ait laissé faire.",
    // B · 1e99d13675bd
    "quests.q_the_week.steps.step_change_one.enterWhen.flagsSet": ["sait :la_semaine"],
    // B · 0da1b5e1f3c4
    "quests.q_the_week.involvedCharacterIds": ["mina","theo","elias","wynn"],
    // B · e80c7cda148e
    "quests.q_the_week.involvedLocationIds": ["le_quai","la_promenade","la_bibliotheque","la_marina"],
    // B · 16c033f063b0
    "quests.q_the_week.knownRewardCopy": "Une semaine que tu peux prévoir, donc une semaine que tu peux démonter.",
    // B · 88dc5015a6fb
    "quests.q_the_tower.title": "L’Horloge Déconnectée",
    // B · 8871bad8bbc0
    "quests.q_the_tower.summary": "La tour est arrêtée depuis soixante ans et le mécanisme à l’intérieur n’a jamais cessé de tourner.",
    // B · 7fcc0be2ad9c
    "quests.q_the_tower.kind": "PRINCIPALE",
    // B · df27171ba762
    "quests.q_the_tower.discoverWhen.flagsSet": ["parle :elias"],
    // B · 6428ece729f6
    "quests.q_the_tower.steps.step_listen_to_elias.playerCopy": "Laisse finir la phrase à l’homme que tout le monde évite.",
    // B · 56c1197f4e48
    "quests.q_the_tower.steps.step_listen_to_elias.directorNotes": "Tout le monde à Halcyon Bay arrête d’écouter Elias à la troisième phrase. Le pas entier, c’est : ne pas le faire. Il a raison, il a neuf ans de mesures, et personne ne lui a jamais posé une deuxième question.",
    // B · e3d6b6b619d5
    "quests.q_the_tower.steps.step_listen_to_elias.rewards.abilities": ["lire_le_mecanisme"],
    // B · b167ba8e9e2e
    "quests.q_the_tower.steps.step_what_it_counts.playerCopy": "Comprends ce que le mouvement compte.",
    // B · f1e2715f873c
    "quests.q_the_tower.steps.step_what_it_counts.directorNotes": "Sept jours, qui finissent à minuit le dimanche. La révélation n’est pas que la tour cause la boucle — c’est que la tour gère la boucle, et qu’elle retient quelque chose depuis soixante ans en la faisant tourner. Ne laisse personne dire ça à voix haute avant que le joueur ne l’ait mérité.",
    // B · 6e8f3c9fa8dd
    "quests.q_the_tower.steps.step_what_it_counts.enterWhen.flagsSet": ["sait :tower_matters"],
    // B · 3dc3699b8767
    "quests.q_the_tower.involvedCharacterIds": ["elias","mina","harrow"],
    // B · e0b5bdf02494
    "quests.q_the_tower.involvedLocationIds": ["the_clock_tower","the_library","council_hall"],
    // B · 1814825b8705
    "quests.q_the_tower.knownRewardCopy": "Ce que la tour compte.",
    // B · bb07543ecfe0
    "quests.q_make_someone_believe.title": "Dire l’Impossible",
    // B · 8866fcc8f7e0
    "quests.q_make_someone_believe.summary": "Tu sais ce qui se passe jeudi. Dire ça à quelqu’un, c’est facile. Être cru, c’est pas pareil.",
    // B · 552c0b7f83c2
    "quests.q_make_someone_believe.kind": "SIDE",
    // B · 1e99d13675bd
    "quests.q_make_someone_believe.discoverWhen.flagsSet": ["sait :the_week"],
    // B · 357502328345
    "quests.q_make_someone_believe.steps.step_convince.playerCopy": "Fais croire une personne.",
    // B · 42e1c7c641a8
    "quests.q_make_someone_believe.steps.step_convince.directorNotes": "Trois personnes peuvent être convaincues, et chacune demande quelque chose de différent. Theo veut une prédiction qu’il peut vérifier. Wynn veut un fait qu’elle n’a pas encore révélé. Mina ne veut aucune preuve — elle veut qu’on lui dise ça quelqu’un en qui elle a confiance, elle le croira et ça la détruira. Celui ou celle qui croit oublie lundi, sauf si un Écho intervient.",
    // B · 9a92bc6663ca
    "quests.q_make_someone_believe.involvedCharacterIds": ["theo","wynn","mina"],
    // B · 3e085409cddb
    "quests.q_make_someone_believe.involvedLocationIds": ["the_library","council_hall","the_esplanade"],
    // B · c29e06a2fbe1
    "quests.q_make_someone_believe.knownRewardCopy": "Une autre personne à Halcyon Bay qui sait.",
    // B · bf0c3fc797c1
    "quests.q_the_last_hour.title": "Demi-dix le dimanche",
    // B · d3240445714d
    "quests.q_the_last_hour.summary": "Mina met son manteau et monte la colline au lieu de la descendre. Elle n’a jamais su dire pourquoi.",
    // B · 7fcc0be2ad9c
    "quests.q_the_last_hour.kind": "MAIN",
    // B · f3a1e4ebbf70
    "quests.q_the_last_hour.discoverWhen.flagsSet": ["sait :the_ending"],
    // B · d859789f1be0
    "quests.q_the_last_hour.steps.step_follow_her.playerCopy": "Découvre où Mina va le dimanche soir.",
    // B · be0d346d48b0
    "quests.q_the_last_hour.steps.step_follow_her.directorNotes": "Rien dans le monde ne dit au joueur de faire ça. C’est la chose la plus importante qu’il peut faire, et il doit le remarquer tout seul. Elle va à la tour sans savoir pourquoi.",
    // B · 6f1a4087c2b4
    "quests.q_the_last_hour.steps.step_the_choice.playerCopy": "Décide quoi faire d’une boucle qui pourrait retenir quelque chose.",
    // B · bb541afd8b92
    "quests.q_the_last_hour.steps.step_the_choice.directorNotes": "La dernière question n’est pas comment s’échapper. C’est s’il faut le faire. Mettre fin à la boucle détruit la ville avec ; la garder signifie que tout le monde vit cette semaine pour toujours, et seul le joueur le sait. Il y a une troisième réponse — la confier à quelqu’un qui se porte volontaire — et c’est la pire chose que le joueur peut faire à un ami.",
    // B · 45a044c0c1ab
    "quests.q_the_last_hour.steps.step_the_choice.enterWhen.flagsSet": ["sait :where_mina_goes","sait :the_cycle"],
    // B · 9962cd20f572
    "quests.q_the_last_hour.involvedCharacterIds": ["mina","elias"],
    // B · c3b1234b4da0
    "quests.q_the_last_hour.involvedLocationIds": ["the_old_town","the_clock_tower"],
    // B · 9bf828bcd334
    "quests.q_the_last_hour.knownRewardCopy": "Où va Mina, et ce qu’est vraiment le choix.",
    // B · 7751282d443a
    "worldEvents.arrival.publicCopy": "Le 8:12 part derrière toi et Mina Arclight descend le quai, la main déjà levée à moitié.",
    // B · 2328db8efedf
    "worldEvents.arrival.directorNotes": "Lundi matin. Elle fait ça toutes les semaines sans s’en rendre compte. Quoi que dise le joueur, elle est contente de le voir.",
    // B · 272bb82156c7
    "worldEvents.arrival.setsFlags": ["semaine_commencee"],
    // B · a4d77f004ec0
    "worldEvents.theo_in_the_library.publicCopy": "La bibliothèque est vide sauf un garçon à la table du milieu avec tout étalé trop loin.",
    // B · fd61328c1af9
    "worldEvents.theo_in_the_library.directorNotes": "Theo, là où il est toujours. Il remarque deux fois chaque personne qui entre.",
    // B · d250654cfb5b
    "worldEvents.theo_in_the_library.setsFlags": ["theo_a_la_table"],
    // B · d063e0c40c46
    "worldEvents.elias_at_the_tower.publicCopy": "Quelqu’un est à la tour avec un carnet, il prend une mesure et l’écrit sans regarder la page.",
    // B · a471578b2231
    "worldEvents.elias_at_the_tower.directorNotes": "Elias, qui fait ce qu’il fait tous les mardis depuis neuf ans.",
    // B · 41f6cdc5b7a9
    "worldEvents.elias_at_the_tower.setsFlags": ["elias_mesure"],
    // B · b51ae11a4a64
    "worldEvents.the_marina_theft.publicCopy": "La porte de la cabane est ouverte, quelqu’un fouille soixante ans de registres de places avec une lampe entre les dents.",
    // B · 3856933fe535
    "worldEvents.the_marina_theft.directorNotes": "Le vol. C’est Elias, et ce qu’il prend, c’est la page de la semaine où la tour s’est arrêtée. Si le joueur est dans le bureau à dix heures, il ne le fait pas, et le registre reste intact — c’est la première chose qu’ils peuvent changer.",
    // B · f9c0f85c0576
    "worldEvents.the_marina_theft.setsFlags": ["sait :le_vol_a_eu_lieu","page_du_registre_disparue"],
    // B · 4f6e02f11de8
    "worldEvents.the_marina_theft.cancelledByFlags": ["vol_arrêté"],
    // B · 640bf4fdb474
    "worldEvents.wynn_arrives.publicCopy": "Une femme en manteau sobre est conduite dans la petite pièce au fond de la salle du conseil, portant un porte-documents attaché avec une ficelle.",
    // B · 32607f43804b
    "worldEvents.wynn_arrives.directorNotes": "La détective Wynn, qui arrive pour enquêter sur une disparition qui n’a pas encore eu lieu. Elle ne trouve pas ça étrange parce qu’à sa connaissance, elle a eu lieu.",
    // B · 86cb386211f5
    "worldEvents.wynn_arrives.setsFlags": ["wynn_en_ville"],
    // B · f514f2f11e2a
    "worldEvents.ivy_at_the_point.publicCopy": "Un manteau vert est plié sur le banc au Point, et personne n’est à côté.",
    // B · c336af6742db
    "worldEvents.ivy_at_the_point.directorNotes": "Ivy Sable. Personne ne la prend — elle vient ici, plie son manteau, et entre dans l’eau. Si le joueur est sur le banc avant onze heures et demie, elle ne le fait pas, et tout change pour le jeudi.",
    // B · 558618c20eab
    "worldEvents.ivy_at_the_point.setsFlags": ["sait :ivy_part","ivy_partie"],
    // B · ac7c109080a5
    "worldEvents.ivy_at_the_point.cancelledByFlags": ["ivy_arrêtée"],
    // B · dc7c3b80971d
    "worldEvents.harrow_arrives.publicCopy": "Une voiture que personne à Halcyon Bay ne possède s’arrête devant la salle du conseil, et une femme en descend, complètement déplacée ici.",
    // B · c4026e82ad1c
    "worldEvents.harrow_arrives.directorNotes": "La conseillère Harrow, venue du continent pour signer l’ordre de maintenance de la tour. C’est la seule personne jamais absente le dimanche.",
    // B · 9e43a5c114e0
    "worldEvents.harrow_arrives.setsFlags": ["sait :harrow_arrive","harrow_en_ville"],
    // B · dfaca876ab6b
    "worldEvents.mina_and_elias.publicCopy": "Mina est sur les marches devant sa maison, en train de parler avec l’homme de la tour, et tous deux s’arrêtent en te voyant.",
    // B · a812d090998b
    "worldEvents.mina_and_elias.directorNotes": "Ils se retrouvent chaque jeudi soir. Il lui demande des nouvelles de son père. Elle ne veut pas en parler mais vient quand même.",
    // B · d65c7304a68e
    "worldEvents.mina_and_elias.setsFlags": ["sait :mina_rencontre_elias"],
    // B · 23ae69e9750c
    "worldEvents.the_harbour_row.publicCopy": "Il y a des cris près des quais — la détective et l’homme de la tour, et la détective tient un carnet qui n’est pas à elle.",
    // B · 3f973bc52d17
    "worldEvents.the_harbour_row.directorNotes": "Wynn a compris que la page du registre manque et est allée voir Elias. Ça tourne mal et ça devient public. Si le vol n’a jamais eu lieu, ça ne se produit pas non plus.",
    // B · 13ce830dc629
    "worldEvents.the_harbour_row.setsFlags": ["sait :la_rixe"],
    // B · 4f6e02f11de8
    "worldEvents.the_harbour_row.cancelledByFlags": ["vol_arrêté"],
    // B · 689b9d02b40d
    "worldEvents.the_harbour_row.requiresFlags": ["page_du_registre_disparue"],
    // B · 6a48c16003e8
    "worldEvents.the_tower_at_three.publicCopy": "Toutes les horloges de Halcyon Bay ont une minute de retard, et la tienne est la seule qui était juste quand tu l’as vérifiée à minuit.",
    // B · 112af84536e9
    "worldEvents.the_tower_at_three.directorNotes": "Le mouvement complète quelque chose à trois heures du matin samedi. Toute la ville le ressent comme une légère gêne. C’est l’indice le plus fort au monde et personne ne le remarque.",
    // B · 9032a8d45926
    "worldEvents.the_tower_at_three.setsFlags": ["sait :les_horloges_dérapent"],
    // B · b1325f526d2f
    "worldEvents.the_festival.publicCopy": "La façade est décorée de guirlandes lumineuses et la moitié de la ville est dehors. Quelqu’un a monté un groupe pas terrible et personne ne s’en plaint.",
    // B · f8a0fb0e87a7
    "worldEvents.the_festival.directorNotes": "Le festival du samedi. Chaleureux, ordinaire, charmant. C’est la scène qui rend le dimanche insupportable, et elle doit être jouée très sérieusement.",
    // B · d7624d376121
    "worldEvents.the_festival.setsFlags": ["sait :festival"],
    // B · 9ff18cdcd377
    "worldEvents.mina_goes_up.publicCopy": "Mina dit qu’elle a besoin d’air, met son manteau et monte la colline au lieu de la descendre.",
    // B · c7a0ddfc7cf5
    "worldEvents.mina_goes_up.directorNotes": "Onze heures moins la demi le dimanche. Elle va à la tour. Elle n’a jamais su dire pourquoi. La suivre est la chose la plus importante qu’un joueur puisse faire, sans qu’on le lui dise.",
    // B · 8a35dc98ed77
    "worldEvents.mina_goes_up.setsFlags": ["sait :mina_monte"],
    // B · 22ccc41ea0bd
    "worldEvents.the_end.publicCopy": "Toutes les horloges de la ville sonnent en même temps, y compris celle arrêtée depuis soixante ans.",
    // B · eacea452553d
    "worldEvents.the_end.directorNotes": "Une minute avant minuit. La fin du monde, où que soit le joueur. Ne pas expliquer. Lumière, son, eau qui monte la colline. Le tour suivant est lundi matin.",
    // B · f3a1e4ebbf70
    "worldEvents.the_end.setsFlags": ["sait :la_fin"],
    // B · e82d9dc4b3fa
    "promises.promise_what_ends_it.kind": "MYSTÈRE",
    // B · dc149c7893aa
    "promises.promise_what_ends_it.label": "Ce qui détruit vraiment Halcyon Bay",
    // B · 4d2f7d603489
    "promises.promise_what_ends_it.seedHint": "Lumière, son, et l’eau qui monte la colline. On ne voit jamais ce qui cause ça.",
    // B · 321c21ae6b37
    "promises.promise_what_ends_it.payoffHint": "La tour le retient depuis soixante ans, une semaine à la fois.",
    // B · 445cd8deebc2
    "promises.promise_mina.kind": "RELATIONNEL",
    // B · b8d34e2b4fcd
    "promises.promise_mina.label": "Mina Arclight, qui te rencontre chaque lundi pour la première fois",
    // B · a3376512e3a5
    "promises.promise_mina.seedHint": "C’est la première personne que tu rencontres et la seule que tu ne retrouves pas à la fin.",
    // B · b56e624cd4ce
    "promises.promise_mina.payoffHint": "Elle monte à la tour à onze heures moins la demi le dimanche et ne sait pas pourquoi.",
    // B · 445cd8deebc2
    "promises.promise_believer.kind": "RELATION",
    // B · 30ee1082ab77
    "promises.promise_believer.label": "Convaincre une personne",
    // B · 21bf2fcd5935
    "promises.promise_believer.seedHint": "Tu sais ce qui se passe jeudi. Le dire à voix haute, c’est facile.",
    // B · bc4f9d4a04c1
    "promises.promise_believer.payoffHint": "Elle te croit, et c’est lundi.",
    // B · e82d9dc4b3fa
    "promises.promise_elias.kind": "MYSTÈRE",
    // B · 90594ec0f901
    "promises.promise_elias.label": "Elias Crowe, qui a raison",
    // B · 9b92ea5b14d7
    "promises.promise_elias.seedHint": "Tout le monde arrête de l’écouter à la troisième phrase.",
    // B · 630e8d3f0694
    "promises.promise_elias.payoffHint": "Neuf ans de mesures, et un mouvement qui boucle un cycle toutes les sept jours.",
    // B · d77ebfcebe44
    "promises.promise_the_choice.kind": "FINALE",
    // B · 90749ae2bb79
    "promises.promise_the_choice.label": "Si la boucle est le désastre ou ce qui l’empêche",
    // B · 79f4e9e715a5
    "promises.promise_the_choice.seedHint": "Chaque semaine se termine pareil, et chaque semaine recommence.",
    // B · 68c7855c4715
    "promises.promise_the_choice.payoffHint": "La finir détruit la ville. La garder, c’est empêcher quelqu’un d’avoir un lundi à lui.",
    // A · 97b6467e2bca
    "archetypes.arch_watcher.name": "La Guetteuse",
    // B · c4a6f6ba9024
    "archetypes.arch_watcher.role": "Observation",
    // A · b0b891a86bc8
    "archetypes.arch_watcher.summary": "Tu remarques ce qui a changé. Être le meilleur pour repérer ce détail qui diffère cette fois-ci, alors que tu as déjà vécu toute la semaine, c’est presque tout le jeu.",
    // A · 3ee321cc9428
    "archetypes.arch_watcher.playstyle": ["Remarque tout","Repère tôt les événements","N’est pas doué pour convaincre"],
    // A · fb825106d000
    "archetypes.arch_watcher.blurb": "Tu as toujours été celui qui dit « c’était là avant ? » et qui a souvent raison.",
    // A · 936b98124ef2
    "archetypes.arch_talker.name": "Le Bavard",
    // B · 56a6861707da
    "archetypes.arch_talker.role": "Social",
    // A · 775aeadd403b
    "archetypes.arch_talker.summary": "Les gens te racontent des choses. C’est le chemin le plus rapide vers la confiance — celle qui fait qu’un inconnu qui t’oublie chaque lundi finit par te croire le jeudi.",
    // A · 96c49541e3bf
    "archetypes.arch_talker.playstyle": ["Gagne vite la confiance","Convainc les gens","Ne remarque pas les détails physiques"],
    // A · b713bf515330
    "archetypes.arch_talker.blurb": "Au bout de trois jours, tu connais tout le monde sur la promenade. Encore une fois.",
    // A · 62b7a7308175
    "archetypes.arch_runner.name": "Le Sprinteur",
    // B · a8981cc45f9b
    "archetypes.arch_runner.role": "Vitesse et portée",
    // A · 1e8fa6de5aec
    "archetypes.arch_runner.summary": "Tu traverses la ville à temps. Savoir quand quelque chose se passe ne sert qu’à pouvoir y être, et tu peux être à deux endroits en une soirée.",
    // A · 8b65edfccdfc
    "archetypes.arch_runner.playstyle": ["Rapide","Suit les gens","Physiquement capable"],
    // A · 0104e461fe18
    "archetypes.arch_runner.blurb": "Halcyon Bay est une colline. La plupart prennent le chemin le plus long. Toi, tu as arrêté de t’en soucier.",
    // A · b3132ec1779b
    "archetypes.arch_stubborn.name": "L’Obstiné",
    // B · 837d9279e002
    "archetypes.arch_stubborn.role": "Courage",
    // A · 46144b64be33
    "archetypes.arch_stubborn.summary": "Tu peux revivre la même soirée pourrie cinq fois sans broncher. La plus grande volonté, et la seule capable de rester au Point à onze heures et demie un mercredi, plus d’une fois.",
    // A · 5e3e709b99fc
    "archetypes.arch_stubborn.playstyle": ["Difficile à déloger","Supporte les mauvais boucles","Long à apprécier"],
    // A · e17771c9bc2d
    "archetypes.arch_stubborn.blurb": "Les autres auraient abandonné au bout de la quatrième semaine. C’est ce qui vous distingue.",
    // B · 6bf44a5e3f9f
    "setupFields.displayName.label": "Quel nom as-tu donné à la logeuse ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · 748ef8aa24b3
    "setupFields.displayName.placeholder": "ex. Noa Fenwick",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 3a6240a26696
    "setupFields.pronouns.placeholder": "ex. iel/iel",
    // B · d5c4f2ff6193
    "setupFields.archetype.label": "Comment es-tu ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHÉTYPE",
    // B · afc7f3b74256
    "setupFields.archetype.helpText": "Comment tu t’y prends. Ça fixe tes attributs et ta formation, donc ça décide des moments de la semaine qui te réussissent — remarquer un détail, inspirer confiance vite, traverser la ville à temps, ou réussir une mauvaise soirée cinq fois. Fixé pour cette partie. Ce que tu apprends ne l’est pas : le savoir est la seule chose qui survit à une réinitialisation.",
    // B · c7845eb0bda4
    "setupFields.worldKnowsAboutYou.label": "Pourquoi es-tu venu à Halcyon Bay ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · 3a19fe4ac3a0
    "setupFields.worldKnowsAboutYou.placeholder": "ex. J’ai pris le job parce que les photos montraient un endroit où il ne se passe rien.",
    // B · fed4f521639f
    "setupFields.origin.label": "Que faisais-tu avant ?",
    // B · b6a31c665c0b
    "setupFields.origin.kind": "CHOIX",
    // B · 878fd3883f2b
    "setupFields.origin.helpText": "Ce que tu as apporté avec toi, ce que les gens demandent le premier lundi et chaque lundi après.",
    // B · dbe70bb91bf1
    "setupFields.origin.options.left_a_job.label": "Tu as quitté un travail",
    // B · 6b5ba2f6b8eb
    "setupFields.origin.options.left_a_person.label": "Tu as laissé quelqu’un",
    // B · e7b68e94caf6
    "setupFields.origin.options.came_back.label": "Tu es né ici et tu as juré de ne pas revenir",
    // B · 1e1445c58da5
    "setupFields.origin.options.no_reason.label": "Tu l’as choisi sur une carte",
    // B · f6093d6587c4
    "setupFields.appearance.label": "Qu’est-ce que les gens remarquent en premier ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · 7a73dd4ae9a9
    "setupFields.appearance.placeholder": "ex. Deux sacs, un avec une fermeture cassée, et l’air de quelqu’un qui n’a pas dormi dans un train.",
    // B · 3aa4328667d6
    "protagonist.kind": "VIDE",
    // A · b3fb6c46d7b2
    "opening": "Le 8h12 s’éloigne derrière toi, son bruit qui descend la colline et va se perdre sur l’eau.\n\nHalcyon Bay le matin : un quai, un abri avec un trou dans sa toile, et toute la ville étalée en contrebas jusqu’à la marina. C’est aussi charmant que sur les photos.\n\nUne femme descend vers toi sur le quai, la main déjà levée à moitié, comme font les gens quand ils ont décidé d’être sympas avant même de savoir si tu le veux.\n\n« Toi, tu prends la chambre quatre, » dit-elle. « Je m’appelle Mina. T’as l’air de quelqu’un qui n’a pas mangé depuis le train. »\n\nTes sacs sont à tes pieds. Les deux. Le bleu a une fermeture éclair cassée.\n\nIl est douze minutes après huit, un lundi matin.",
    // A · d66640dbc21c
    "openingSuggestions": ["Je prends le sac le plus léger et lui souris. « Allez, viens. Montre-moi la ville — et sois honnête sur les mauvais côtés. »","Je regarde la colline vers la marina, puis elle. « On peut faire quoi ici un dimanche ? Je demande pour organiser. »","Je ne bouge pas de mes sacs. « Je préfère voir la chambre d’abord, si ça ne dérange pas. Je suis dans le train depuis six heures. »"],
  },
});
