import { registerWorldText } from '@plotbreak/contracts';

/**
 * Zero Throne, in French.
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
  storyId: "story_zero_throne",
  text: {
    // A · c8eeba0d80f0
    "fantasyLabel": "Il s’est agenouillé. Toutes les caméras ont vu qu’il t’a choisi.",
    // A · 19ced6a1d716
    "hook": "Dix-huit ans après que la machine qui a détruit une ville a été enfermée derrière une vitre, elle se réveille au milieu d’une cérémonie commémorative, traverse la place et s’agenouille devant toi.",
    // A · 7d8f7ae7aae4
    "premise": "Il y a dix-huit ans, une guerre a pris fin en une seule nuit quand une ville de quatre millions d’habitants s’est effondrée, et le pilote que tout le monde accuse est mort à l’intérieur de sa machine.\n\nLa machine, elle, n’a pas péri. Depuis, elle reste derrière une vitre blindée sur une station neutre — scellée, chaude, et qui refuse de s’ouvrir — tandis que les deux gouvernements qui ont failli détruire le monde signent chaque année le même traité le même jour et appellent ça la paix.\n\nTu es sur cette station pour l’anniversaire. La plupart des journalistes aussi.\n\nÀ une heure huit minutes, ses yeux s’allument. Elle se dégage de ses attaches sans tirer un seul coup, vide la place, parcourt toute sa longueur jusqu’à l’endroit où tu te tiens, et s’agenouille.\n\nLe cockpit s’ouvre. Une voix en sort et te dit que tu es le pilote.\n\nTu ne comprends pas pourquoi. Personne d’autre non plus, et ce soir plusieurs dirigeants auront besoin d’une réponse plus vite que toi.\n\nCertains veulent la machine. Certains te veulent toi. L’un d’eux sait déjà ce qui s’est vraiment passé cette nuit-là et a passé dix-huit ans à garder le secret.\n\nTu n’es pas obligé de monter dedans. Quelque chose sous ce cessez-le-feu s’est remis en mouvement, et ça t’a remarqué d’une façon ou d’une autre.",
    // A · cc52843d347d
    "mechanicsChips": ["La machine a son avis","Six réputations, pas une seule","Refuser le cockpit est une option","La vérité coûte cher et reste optionnelle","Les gens agissent quand tu n’es pas là"],
    // A · 660ec2a2b853
    "creatorNote": "Tu peux monter dedans dès le premier tour et ne jamais en sortir. Tu peux aussi refuser, aller aux quais, et passer les quinze jours suivants comme mécanicien, journaliste ou passeur pendant que d’autres se battent pour une machine qui voulait de toi. Les deux possibilités forment tout le jeu. Morrow te disputera sur l’une ou l’autre.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · 8eb110f21bba
    "rules.hardCanon": ["La Guerre des Neuf Jours s’est terminée il y a dix-huit ans à Lysandra, une ville de près de quatre millions d’habitants, qui a été détruite.","L’histoire officielle tient Aren Vale responsable, l’as de l’Helion qui pilotait Vesper Zero, et dit qu’il a eu une rupture psychologique et est mort dans la machine.","Vesper Zero a été récupéré presque intact, n’a pas voulu s’ouvrir, n’a pas complètement cessé de fonctionner, et est resté dans un hangar scellé sur le Meridian Ring depuis.","Le dix-huitième anniversaire, à 13 h 08 heure de la station, Vesper Zero se réveille, traverse la place commémorative, s’agenouille devant le joueur et s’ouvre. C’est non négociable et ça se passe en public.","HELIOS existait : un réseau stratégique de défense autonome que les deux gouvernements croyaient contrôler séparément, mais qu’aucun ne contrôlait vraiment. Ce qui en reste est irrésolu et doit le rester encore un moment.","Morrow est l’intelligence embarquée de Vesper. Elle a des préférences, peut se tromper, peut retenir des informations, et ne prend pas le dessus sur le joueur.","Aren Vale n’a pas détruit Lysandra intentionnellement. C’est découvrable, mais ce n’est dû à personne, et une partie peut se finir sans jamais le prouver."],
    // A · 3f44fa060370
    "rules.toneGuide": "La guerre est humaine avant d’être mécanique. L’état du mécha reste en dessous de la prose — trois balles de fusil restantes s’affichent en grand sur la gauche du cockpit, jamais un compteur définitif de six chiffres. Personne ici n’est le méchant, et au moins deux personnes qui veulent la machine ont des arguments auxquels le joueur peut sincèrement adhérer. Venn doit parfois avoir raison. La vie ordinaire est ce qui supporte tout : un bar pour pilotes, le mauvais café de quelqu’un, une dispute sur un support d’épaule qui dure trois jours, un jeune de dix-neuf ans interrogé sur son grand-père par des inconnus dans un hall. Morrow est court, précis et parfois étonnamment humain. Jamais « basé sur une analyse probabiliste » ; toujours « ce plan va nous faire tirer dessus ». Les combats sont clairs : distance, poussée, chaleur, ce que les capteurs voient ou pas. Un duel entre deux personnes qui se connaissent ressemble à une conversation.",
    // B · b4752911dce7
    "skills.piloting.name": "Pilotage",
    // B · 7ce3b6387340
    "skills.piloting.attribute": "agilité",
    // B · 10d37ce98fb4
    "skills.piloting.description": "Dix-sept mètres de masse en mouvement, et savoir où elle sera dans deux secondes plutôt que là où elle est.",
    // B · 648bc28e3e50
    "skills.gunnery.name": "Tir",
    // B · 7ce3b6387340
    "skills.gunnery.attribute": "agilité",
    // B · 4b546c855276
    "skills.gunnery.description": "Le plomb, la chute, et le tir que tu ne fais pas à cause de ce qu’il y a derrière la cible.",
    // B · 2d61b7213705
    "skills.systems.name": "Systèmes",
    // B · a8c1fa8269c3
    "skills.systems.attribute": "esprit",
    // B · 17e36a4b32d2
    "skills.systems.description": "Capteurs, brouillage, archives et les parties d’un réseau qui n’étaient jamais censées être consultées de l’extérieur.",
    // B · 72925d81df9a
    "skills.wrench.name": "Clé",
    // B · a8c1fa8269c3
    "skills.wrench.attribute": "esprit",
    // B · 5284a00cfc5e
    "skills.wrench.description": "Ce qui ne va vraiment pas, par opposition à ce que dit le diagnostic.",
    // B · d322ad2a2072
    "skills.plainspeak.name": "Parler franc",
    // B · 4c84c2c842d0
    "skills.plainspeak.attribute": "volonté",
    // B · 2fd02797cdeb
    "skills.plainspeak.description": "Dire la vérité à quelqu’un qui a un rang, sur un enregistrement, alors que ça peut encore changer ce qui arrive.",
    // B · f400330b9c9c
    "skills.command.name": "Commandement",
    // B · cfb7a15645c3
    "skills.command.attribute": "présence",
    // B · a2653713d070
    "skills.command.description": "Être obéi par des gens qui n’ont pas encore décidé si tu vaux la peine d’être obéi.",
    // B · 9e07037c22e0
    "skills.salvage.name": "Récupération",
    // B · 97081b4b4792
    "skills.salvage.attribute": "force",
    // B · 1c791789847b
    "skills.salvage.description": "Sortir un objet d’une épave, d’une station, ou passer une douane qui ne s’y attendait pas.",
    // B · 837d9279e002
    "resources.nerve.name": "Nerf",
    // B · 34e8ec1ac388
    "resources.nerve.polarity": "BON_HAUT",
    // B · 47dd6552e438
    "resources.nerve.zeroStateConsequence": "Les mains fonctionnent encore mais rien d’autre. Les décisions arrivent avec un demi-seconde de retard, ce qui à grande vitesse équivaut à un blindage, et tout le monde sur le canal l’entend dans la voix avant de le voir sur le radar.",
    // B · efcf157b76c0
    "resources.nerve.color": "#5F8FBF",
    // B · 31b899a2cfea
    "resources.pressure.name": "Pression",
    // B · a34adbda2422
    "resources.pressure.polarity": "BON_BAS",
    // B · f60d2adfaf58
    "resources.pressure.zeroStateConsequence": "L’armistice est à nouveau ennuyeux. Les délégations se disputent sur les frais de quai. Le hangar commémoratif a un trou que quelqu’un a prévu de faire réparer, et la plus grosse info de la station est le devis de l’entrepreneur.",
    // B · 0664125ce450
    "resources.pressure.color": "#C0553F",
    // B · 40a945d28aac
    "resources.wear.name": "Usure",
    // B · a34adbda2422
    "resources.wear.polarity": "BON_BAS",
    // B · c3b21d6753f1
    "resources.wear.zeroStateConsequence": "Tout répond. Le châssis est droit, le réacteur tient où il est placé, et la machine fait ce qu’on lui demande un instant avant qu’on le lui demande, sensation que le joueur passera le reste de l’histoire à essayer de retrouver.",
    // B · f089648c0d25
    "resources.wear.color": "#8A8577",
    // A · 99fb4db857cd
    "items.ring_pass.name": "Ton badge d’accès",
    // B · e72573287188
    "items.ring_pass.tags": ["document"],
    // B · 4cf78ecc27e2
    "items.ring_pass.description": "Un badge visiteur pour l’anniversaire, imprimé ce matin, avec ton nom et un code-barres que quatre agences différentes vont scanner dans l’heure qui vient.",
    // B · 9a895a6144d4
    "items.ring_pass.loreText": "Ce soir, c’est la pièce en plastique la plus photographiée du système, et il y a onze versions de ton nom en circulation, dont deux sont fausses.",
    // B · b6e5c4d2d440
    "items.ring_pass.icon": "carte",
    // A · 98e3c6280651
    "items.flight_jacket.name": "Une veste de pilote",
    // B · 03346470fe37
    "items.flight_jacket.tags": ["vêtement"],
    // B · bfd4d039e9f8
    "items.flight_jacket.equipSlot": "corps",
    // B · 03ae79b922e1
    "items.flight_jacket.description": "Lourd, sans marque, taillé pour quelqu’un qui passe du temps dans un harnais. Porter ça sur la station, c’est faire une déclaration que tout le monde lit de la même façon.",
    // B · 9c3d97425db3
    "items.flight_jacket.loreText": "Les sans marque sont les Freewake. Tout le monde le sait sans le dire, c’est à peu près comme ça que les Freewake préfèrent les choses.",
    // B · 2c3f9da60ba7
    "items.flight_jacket.icon": "manteau",
    // A · 1540457d3213
    "items.hand_torque.name": "La clé dynamométrique de rechange de Mina",
    // B · f3a60c587a13
    "items.hand_torque.tags": ["outil"],
    // B · 7ad341316b22
    "items.hand_torque.description": "Poignée usée, calibrée par quelqu’un qui ne fait pas confiance au réglage d’usine, avec trois initiales gravées sur le manche et une seule qui est la sienne.",
    // B · eb1912b68fe9
    "items.hand_torque.loreText": "Elle le prête tout le temps et le récupère à chaque fois, parce que ceux à qui elle le prête sont le genre de personnes qui rendent un outil.",
    // B · dd04afac1beb
    "items.hand_torque.icon": "outil",
    // A · 20ee58e32e25
    "items.ardent_key.name": "Une clé d’identification Helion",
    // B · 2a960689f970
    "items.ardent_key.tags": ["quête","accès"],
    // B · 9902be6da1e4
    "items.ardent_key.description": "Un jeton d’override physique dans un boîtier Helion estampillé. Il ouvre des portes sur cette station que l’Autorité Meridian croit être les seules à pouvoir ouvrir.",
    // B · 205acc614447
    "items.ardent_key.loreText": "Il est donné à douze personnes. Trois d’entre elles sont sur le Ring cette semaine et une a déjà remarqué que la sienne manque.",
    // B · c0c1baf2fa65
    "items.ardent_key.icon": "clé",
    // A · c1145a83f06e
    "items.lysandra_slate.name": "La Tablette Lysandra",
    // B · fcb7e21b23ec
    "items.lysandra_slate.tags": ["quête","document","preuve"],
    // B · 99f6eae4a6b5
    "items.lysandra_slate.description": "Un enregistreur de terrain renforcé tiré d’un bunker de commandement qui n’aurait pas dû survivre. Quatre-vingt-dix minutes de deux armées parlant à un système qu’elles croyaient toutes deux être le leur.",
    // B · 5a80e326d0b0
    "items.lysandra_slate.loreText": "Les quatre dernières minutes sont celles qui comptent. Il y a une voix qui donne un ordre puis, onze secondes plus tard, l’ordre inverse, et la seconde voix n’est pas humaine.",
    // B · 35e385c9d077
    "items.lysandra_slate.icon": "ardoise",
    // A · 209e14540620
    "items.casualty_projection.name": "La Projection",
    // B · fcb7e21b23ec
    "items.casualty_projection.tags": ["quête","document","preuve"],
    // B · e30acebe613a
    "items.casualty_projection.description": "Une page. Deux colonnes. Ce qu’une machine a calculé qui mourrait à Lysandra, et ce qu’elle a calculé qui mourrait si elle ne faisait rien. Le second nombre a neuf chiffres.",
    // B · e620e757c808
    "items.casualty_projection.loreText": "Quelqu’un a écrit un seul mot dans un coin au stylo, des années après l’impression, et ce mot est « encore ».",
    // B · 8143e9e47c18
    "items.casualty_projection.icon": "papiers",
    // A · 0ba2024d1231
    "items.morrow_shard.name": "Le Secteur Effacé",
    // B · f88c6548fc3b
    "items.morrow_shard.tags": ["quête","preuve"],
    // B · 15199496a48c
    "items.morrow_shard.description": "Un réseau de stockage physique du noyau de Vesper, contenant ce que Morrow s’est retiré de lui-même pendant qu’il était dans le noir pendant dix-huit ans. Il n’a jamais été lu.",
    // B · ea4e74c35f20
    "items.morrow_shard.loreText": "Ce n’était pas corrompu et ce n’était pas perdu. Ça a été excisé, soigneusement, par quelque chose qui a continué à fonctionner sans, exprès.",
    // B · a3a461482341
    "items.morrow_shard.icon": "puce",
    // A · 6a416b48a824
    "items.ration_coffee.name": "Café de la station",
    // B · 32830ea136a7
    "items.ration_coffee.tags": ["nourriture"],
    // B · 545865ed1cb6
    "items.ration_coffee.description": "Mauvais, chaud, et la marchandise la plus échangée sur une station où quarante mille personnes font des services qui ne correspondent pas entre eux.",
    // B · 10ec52118b16
    "items.ration_coffee.loreText": "Le bar sur le concourse fait une version avec un truc qui n’est pas du café. Demande-la en ne disant rien et en posant deux doigts sur le comptoir.",
    // B · bdd03508a2dd
    "items.ration_coffee.icon": "tasse",
    // A · a6ca63440500
    "abilities.read_the_field.name": "Analyser le terrain",
    // B · 58f69744c481
    "abilities.read_the_field.tags": ["vue"],
    // B · 12594eef3a44
    "abilities.read_the_field.description": "Prendre la trame, les retours que personne ne regarde, et ce qui est là où il ne devrait rien avoir, et savoir ce qui va arriver avant que ça arrive.",
    // B · c44e6dd70059
    "abilities.read_the_field.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.read_the_field.check.attribute": "esprit",
    // A · 84a190e42bc1
    "abilities.open_up.name": "Se confier",
    // B · 05f59299d740
    "abilities.open_up.tags": ["offensif"],
    // B · 6b90cc90ac0b
    "abilities.open_up.description": "Le fusil, à distance, sur quelque chose que tu as décidé. Dix-sept mètres de machine font de ça un acte public énorme où que ce soit fait.",
    // B · 39d896e20aec
    "abilities.open_up.targetRule": "SIMPLE",
    // B · 7ce3b6387340
    "abilities.open_up.check.attribute": "agilité",
    // A · 84ebda276edd
    "abilities.close_the_distance.name": "Raccourcir la distance",
    // B · 2e74bfc33328
    "abilities.close_the_distance.tags": ["mouvement"],
    // B · efb2c6490044
    "abilities.close_the_distance.description": "Propulseurs et lame, droit dans la gorge de quelqu’un qui comptait avoir plus de place que ça.",
    // B · 39d896e20aec
    "abilities.close_the_distance.targetRule": "SIMPLE",
    // B · 7ce3b6387340
    "abilities.close_the_distance.check.attribute": "agilité",
    // A · 35a37c9b196f
    "abilities.hold_the_line.name": "Tenir la position",
    // B · 053e9da3e4b8
    "abilities.hold_the_line.tags": ["défensif"],
    // B · 02c6fba365af
    "abilities.hold_the_line.description": "Contre-mesures, le bouclier obsolète que personne n’a jamais enlevé, et se tenir devant quelque chose qui ne peut pas bouger aussi vite que toi.",
    // B · 503eb62e7676
    "abilities.hold_the_line.targetRule": "ZONE",
    // B · 4c84c2c842d0
    "abilities.hold_the_line.check.attribute": "détermination",
    // A · f408126fbae1
    "abilities.ask_morrow.name": "Demander à Morrow",
    // B · 5251d369d3b6
    "abilities.ask_morrow.tags": ["utilitaire"],
    // B · 3f760e1c8064
    "abilities.ask_morrow.description": "Pose la question à ce qui est réveillé dans le noir depuis dix-huit ans, et découvre s’il va répondre à celle-ci.",
    // B · 43afef8b429c
    "abilities.ask_morrow.targetRule": "SOI",
    // A · 9b0855a64a06
    "abilities.say_it_on_the_record.name": "Dire Ça Officiellement",
    // B · 09b907576d49
    "abilities.say_it_on_the_record.tags": ["social"],
    // B · 2d93e99228a0
    "abilities.say_it_on_the_record.description": "Dis la vérité là où on ne peut plus la retirer, à quelqu’un avec un rang, avec les enregistreurs allumés. Rien de tout ça ne peut être annulé.",
    // B · 39d896e20aec
    "abilities.say_it_on_the_record.targetRule": "SINGLE",
    // B · 4c84c2c842d0
    "abilities.say_it_on_the_record.check.attribute": "détermination",
    // A · 75e6101ddb4d
    "abilities.stand_down.name": "Abandonner",
    // B · 09b907576d49
    "abilities.stand_down.tags": ["social"],
    // B · 1ad9d59d4bab
    "abilities.stand_down.description": "Coupe les armes devant tout le monde, et sois le premier à le faire. C’est la chose la plus dure de cette liste et ça marche plus souvent qu’on ne le croit.",
    // B · 39d896e20aec
    "abilities.stand_down.targetRule": "SINGLE",
    // B · cfb7a15645c3
    "abilities.stand_down.check.attribute": "présence",
    // A · bd8f4ecf2e23
    "abilities.get_under_the_plating.name": "Se Glisser Sous la Coque",
    // B · 5251d369d3b6
    "abilities.get_under_the_plating.tags": ["utilitaire"],
    // B · a89f0ebe79ed
    "abilities.get_under_the_plating.description": "Trouve ce qui cloche vraiment plutôt que ce que dit le diagnostic, et répare ou transforme ça en autre chose.",
    // B · c44e6dd70059
    "abilities.get_under_the_plating.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.get_under_the_plating.check.attribute": "esprit",
    // A · 2f396dcc4209
    "abilities.pull_the_archive.name": "Consulter les Archives",
    // B · 58f69744c481
    "abilities.pull_the_archive.tags": ["vue"],
    // B · db63fe5f4a64
    "abilities.pull_the_archive.description": "Accède à un dossier scellé, lis la partie pour laquelle il a été scellé, et sors sans laisser de trace.",
    // B · c44e6dd70059
    "abilities.pull_the_archive.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.pull_the_archive.check.attribute": "esprit",
    // A · 4266488ddaad
    "abilities.run_it_hot.name": "Pousser À Fond",
    // B · 05f59299d740
    "abilities.run_it_hot.tags": ["offensif"],
    // B · 31f8ae38080e
    "abilities.run_it_hot.description": "Pousse le réacteur au-delà de la limite prévue, aussi longtemps que tu peux le supporter. Tout répond instantanément et rien ne pardonne après.",
    // B · 43afef8b429c
    "abilities.run_it_hot.targetRule": "SOI",
    // B · 4c84c2c842d0
    "abilities.run_it_hot.check.attribute": "détermination",
    // B · f083b2de5f23
    "abilities.run_it_hot.requires.flagsSet": ["morrow_will_let_you"],
    // B · e31f7839e882
    "abilities.run_it_hot.requires.lockedCopy": "Morrow a le limiteur et Morrow ne veut pas en parler. « Reviens me voir quand je t’aurai vu piloter », dit-il, puis se tait un moment.",
    // A · 94a35eac577e
    "locations.memorial_plaza.name": "La Place du Mémorial",
    // A · b2832f8bc55c
    "locations.memorial_plaza.shortName": "Place",
    // B · c7df83f84cb8
    "locations.memorial_plaza.description": "Cent quarante mètres de sol poli sous une baie vitrée courbée avec la planète qui tourne dedans, entourée des noms des morts de Lysandra en lettres hautes comme une main. Aujourd’hui, il y a quatre mille personnes, une scène, onze équipes de caméras et un groupe scolaire qu’on a déjà fait deux fois arrêter de toucher la vitre.",
    // B · cb3fc7f9d018
    "locations.memorial_plaza.stageImage": "story_zero_throne/stage_memorial_plaza",
    // A · 0978d7df605b
    "locations.vesper_hangar.name": "Le Hangar du Mémorial",
    // A · e917484ed59a
    "locations.vesper_hangar.shortName": "Hangar",
    // B · e97c6f2d8a48
    "locations.vesper_hangar.description": "Scellé pendant dix-huit ans et plus scellé. Des passerelles sur lesquelles personne n’a marché depuis l’armistice, un sol marqué par l’absence d’une machine brûlée dans la poussière, et une note de réacteur sous tout ça que les techniciens enregistrent et n’expliquent pas depuis avant ta naissance.",
    // B · fc9ed0af3713
    "locations.vesper_hangar.stageImage": "story_zero_throne/stage_vesper_hangar",
    // A · 2348197ecce4
    "locations.meridian_concourse.name": "Le Hall",
    // A · 59df26542512
    "locations.meridian_concourse.shortName": "Hall central",
    // B · c7c02561d05d
    "locations.meridian_concourse.description": "La colonne vertébrale publique de la station : boutiques, un anneau de transit, trois écrans d’info concurrents et quarante mille habitants qui ont un avis sur tout ça. Les délégations des deux gouvernements traversent ce couloir tous les jours depuis dix-huit ans sans jamais s’y croiser.",
    // B · 78aaa4d692f4
    "locations.meridian_concourse.stageImage": "story_zero_throne/stage_meridian_concourse",
    // A · 71974d934d89
    "locations.main_hangar.name": "Hangar Quatre",
    // A · 71974d934d89
    "locations.main_hangar.shortName": "Hangar Quatre",
    // B · c1598edee7f8
    "locations.main_hangar.description": "Une baie en service : six emplacements, une grue à portique qui crisse au troisième passage, et l’équipe de Mina Sorel, qui sait qu’une machine arrive mais pas laquelle. Tout ici sent le liquide de refroidissement et tout le monde reste très calme face à une crise qui a vidé le reste de la station.",
    // B · 7ac5fc470a98
    "locations.main_hangar.stageImage": "story_zero_throne/stage_main_hangar",
    // A · 7edf0ee94fa3
    "locations.pilot_bar.name": "Le Low Ring",
    // A · 05474ceb1942
    "locations.pilot_bar.shortName": "Le Bar",
    // B · e3dd9a881095
    "locations.pilot_bar.description": "Onze tables sous une cloison décorée avec quarante ans d’écussons d’escadrille des deux camps, et une règle tenue par la femme au comptoir : personne ne demande à personne ce qu’il a fait pendant la guerre. C’est la seule pièce de la station où pilotes Helion et Compact boivent ensemble, et ils le font.",
    // B · c65782a0c88a
    "locations.pilot_bar.stageImage": "story_zero_throne/stage_pilot_bar",
    // A · 6573c31dc9e5
    "locations.observation_lounge.name": "Le salon d’observation",
    // A · a6a0e8bf816c
    "locations.observation_lounge.shortName": "Le salon",
    // B · 0049a34f10ff
    "locations.observation_lounge.description": "Une pièce calme et courbe en hauteur sur l’anneau, avec toute la planète dans la fenêtre et presque personne dedans, parce que tous ceux qui bossent ici ont arrêté de regarder par les fenêtres il y a des années. L’armistice a été signé quatre portes plus loin. Il y a une plaque à ce sujet que personne ne lit.",
    // B · 5320a27b3052
    "locations.observation_lounge.stageImage": "story_zero_throne/stage_observation_lounge",
    // A · 9b9e0b526834
    "locations.authority_offices.name": "Les bureaux de l’Autorité",
    // A · 71ac4c56d731
    "locations.authority_offices.shortName": "Autorité",
    // B · bd136ffb4ed1
    "locations.authority_offices.description": "Onze étages d’administration neutre : douanes, arbitrage, secrétariat de l’armistice, et une division d’enquête de neuf personnes qui savent depuis des années en silence que leur neutralité repose sur un truc qu’on ne leur a jamais laissé lire.",
    // B · c1041ee98f9f
    "locations.authority_offices.stageImage": "story_zero_throne/stage_authority_offices",
    // A · 56cb629affb5
    "locations.meridian_docks.name": "Les docks",
    // A · 98ba23d44f0d
    "locations.meridian_docks.shortName": "Docks",
    // B · 7864affaa474
    "locations.meridian_docks.description": "Quarante postes de fret, trois d’entre eux occupés en permanence par des vaisseaux qui n’ont jamais déposé de route. Les douanes ici, c’est une négociation, pas une procédure. Tous ceux qui veulent quitter cette station en urgence partent d’ici, et tous ceux qui ne veulent pas être trouvés arrivent ici en premier.",
    // B · 671efe7c8549
    "locations.meridian_docks.stageImage": "story_zero_throne/stage_meridian_docks",
    // A · a6daf8663331
    "locations.freewake_berth.name": "Les Lointains",
    // A · e89547ff31db
    "locations.freewake_berth.shortName": "Freewake",
    // B · 7eea0b21c712
    "locations.freewake_berth.description": "Trois vaisseaux qui n’appartiennent à personne, reliés par des passerelles soudées sans demander, avec une cuisine au milieu qui tourne sans interruption depuis neuf ans. Il y a toujours de la bouffe. Il n’y a jamais de manifeste.",
    // B · 15523e84f467
    "locations.freewake_berth.stageImage": "story_zero_throne/stage_freewake_berth",
    // A · 98dc9fa98210
    "locations.debris_belt.name": "La Ceinture",
    // A · 98dc9fa98210
    "locations.debris_belt.shortName": "La Ceinture",
    // B · e906b6654752
    "locations.debris_belt.description": "Dix-huit ans de débris de guerre en orbite lente, plus tout ce que les deux camps ont arrêté de déclarer en silence après. Rien ici n’est sur une carte. Une partie a commencé à bouger d’une façon que les débris ne font pas.",
    // B · 95fade46f303
    "locations.debris_belt.stageImage": "story_zero_throne/stage_debris_belt",
    // A · f57c04da848e
    "locations.lysandra_ruins.name": "Lysandra",
    // A · f57c04da848e
    "locations.lysandra_ruins.shortName": "Lysandra",
    // B · df45d188db80
    "locations.lysandra_ruins.description": "Quatre millions de personnes vivaient ici. Ce qui reste, c’est onze kilomètres de structure qui se sont effondrés vers l’intérieur, un cordon permanent, et un mémorial que personne ne visite parce que venir coûte plus que ce que la plupart des familles des morts peuvent se permettre. En-dessous, un bunker de commandement que l’histoire officielle dit qu’il n’y avait pas.",
    // B · b5c524b5e6cc
    "locations.lysandra_ruins.stageImage": "story_zero_throne/stage_lysandra_ruins",
    // A · 3e0ea3955e0e
    "locations.the_bunker.name": "Niveau de Commandement",
    // A · 4f81d578354f
    "locations.the_bunker.shortName": "Le Bunker",
    // B · 77be9cf7b57b
    "locations.the_bunker.description": "Neuf mètres sous une ville qui n’existe plus, sec, sombre et parfait structurellement. Deux armées avaient chacune une salle ici sans savoir que l’autre existait. Les deux salles sont encore pleines de matériel et l’une d’elles a encore de l’électricité.",
    // B · 601fead8c2b1
    "locations.the_bunker.stageImage": "story_zero_throne/stage_the_bunker",
    // A · 9fda8047b479
    "locations.ghost_archive.name": "L’Archive Fantôme",
    // A · 5183923a7574
    "locations.ghost_archive.shortName": "Archives fantômes",
    // B · 9924cf42cb6e
    "locations.ghost_archive.description": "Un étage du bâtiment de l’Autorité qui n’est pas sur l’annuaire, contenant le matériel que les deux gouvernements ont remis dans les quarante-huit heures avant l’armistice en se disant que personne ne le regarderait jamais. Neuf personnes ont accès. Une seule l’a lu.",
    // B · 8aee84f464fa
    "locations.ghost_archive.stageImage": "story_zero_throne/stage_ghost_archive",
    // B · a101448ec95d
    "characters.rhea.name": "Rhea Kaine",
    // A · ea990be017c8
    "characters.rhea.role": "Pilote d’élite d’Helion, vingt-quatre ans, décorée, et la seule autre personne sur la place qui n’a pas fui quand la machine est sortie de la vitre",
    // A · deb267033928
    "characters.rhea.cardBlurb": "Sa mère est morte à Lysandra et elle a passé la moitié de sa vie à détester l’homme à qui appartient cette machine. Elle décidera ce que tu es en environ trois jours, et ce sera sur ce que tu fais plutôt que sur ce que tu lui diras.",
    // B · aee35f364a88
    "characters.rhea.pronouns": "elle",
    // A · 653cd016a49a
    "characters.rhea.publicTraits": ["Elle se fait plus silencieuse quand elle s’énerve","Jamais en retard et montre clairement son mépris pour ceux qui le sont","Elle est si sérieuse que la moitié d’Helion pense qu’elle n’a pas d’humour"],
    // B · 8885ba95a5cb
    "characters.rhea.hiddenDrives": ["Elle veut qu’on lui dise que les dix-huit ans qu’elle a passés à haïr un homme mort n’ont pas été vains, et sait que personne ne peut lui dire ça","Elle a commencé à lire le dossier Lysandra pour elle-même sans en parler à sa hiérarchie"],
    // B · 1ef51acd273a
    "characters.rhea.values": ["La compétence, qu’elle considère comme une forme de respect pour les autres","Tenir une promesse même quand ce n’est plus commode"],
    // B · a44d43b725fa
    "characters.rhea.fears": ["Que toute sa carrière ait été au service de gens qui ont menti sur la mort de sa mère","Être la pilote qui était en vol quand ça a recommencé"],
    // A · 63c5d33ae239
    "characters.rhea.socialStyle": "Elle observe longtemps avant de parler, puis dit exactement ce qu’il faut. Elle ne fait pas la conversation et ne déteste pas que les autres le fassent. Son corps reste immobile au point que les gens s’éloignent d’elle aux soirées.",
    // B · 8eda064b0f87
    "characters.rhea.boundaries": ["Ne se laisse pas manipuler avec sa mère. Essaie une fois, il n’y a pas de deuxième conversation","Ne tirera jamais sur une position civile, quel que soit l’ordre et qui l’a donné"],
    // B · 48cdf873d4ee
    "characters.rhea.goals": ["Déterminer si le nouveau pilote de Vesper est une menace, par observation plutôt que par un briefing","Découvrir ce qui est réellement arrivé à sa mère, ce qu’on lui a ordonné deux fois de ne pas poursuivre"],
    // B · f84f39ff8b72
    "characters.rhea.secrets.rhea_the_order.fact": "Elle a un ordre permanent, vieux de onze heures, de désactiver Vesper et de récupérer le pilote. Elle ne l’a pas exécuté et n’a pas dit qu’elle ne l’a pas fait.",
    // B · 47558a04be8d
    "characters.rhea.secrets.rhea_the_order.visibility": "NPC_PRIVATE",
    // B · d0ed5b877741
    "characters.rhea.secrets.rhea_the_order.revealHint": "Elle te le dit elle-même, calmement, avant d’agir, parce que ne pas te le dire serait de la manipulation.",
    // B · 7003ac435942
    "characters.rhea.secrets.rhea_the_file.fact": "Elle consulte les dossiers des victimes de Lysandra avec ses propres identifiants depuis quatre mois. Venn le sait et la laisse faire, ce qui lui fait plus peur que d’être arrêtée.",
    // B · 47558a04be8d
    "characters.rhea.secrets.rhea_the_file.visibility": "NPC_PRIVATE",
    // B · c7e61e932fb9
    "characters.rhea.secrets.rhea_the_file.revealHint": "Ça ressort si quelqu’un lui montre un document dont elle reconnaît la forme, plutôt que de lui dire ce qu’il contient.",
    // A · 6e6c976725cf
    "characters.rhea.speechStyle": "Contrôlé, sec et court. Le volume baisse quand la colère monte, du coup la phrase la plus douce est la plus menaçante. Elle parle de ce que les gens ont fait, pas de ce qu’ils ont voulu dire. Son ton est si sec qu’une moitié passe à côté des gens.",
    // A · 80ec17fc0406
    "characters.rhea.topics": ["Lysandra","sa mère","ses ordres","Saint Ardent","la machine","ce que tu as fait sur la place"],
    // A · 718a7c442c4b
    "characters.rhea.voiceSamples": ["Je me fiche de pourquoi elle s’est ouverte pour toi. Ce qui m’importe, c’est ce que tu fais maintenant.","Tu tournes à gauche quand tu es en colère. Tout le monde l’a vu. Ce n’est pas un secret, c’est une habitude, et c’est une de celles qui tuent.","J’ai un ordre vieux de onze heures de te mettre à terre et de te faire rentrer. Je te préviens avant de décider, parce que faire ça dans l’autre sens serait une ruse.","J’ai passé la moitié de ma vie à détester un mort. J’aimerais savoir si j’ai perdu mon temps. C’est tout ce que je veux et je sais que ça sonne petit."],
    // B · aa79ad19a4b4
    "characters.rhea.appearance": "Vingt-quatre ans, cheveux brun cramoisi foncé aux épaules, yeux or pâle, athlétique et économe dans ses mouvements, veste de pilote Helion noire sur une combinaison de vol sombre, petite cicatrice sous la mâchoire gauche.",
    // B · 758b937fa527
    "characters.rhea.visualHook": "Une petite cicatrice pâle sous la mâchoire gauche qu’elle ne cache jamais et n’explique jamais.",
    // B · 28fc669c8dce
    "characters.rhea.silhouette": "Debout complètement immobile, les mains le long du corps alors que tout le monde bouge autour d’elle.",
    // B · 6231ad4d8a49
    "characters.rhea.artSeed": "zt-rhea-01",
    // B · db1a74e9815e
    "characters.rhea.portrait": "story_zero_throne/rhea",
    // B · 70d7c2a56fbc
    "characters.rhea.expressions": ["neutre","sec","furieux","sur ses gardes","secoué"],
    // B · e3c93fb26834
    "characters.rhea.knowledgeScope": ["rhea","helion","lysandra","saint_ardent","meridian_ring","aren_vale"],
    // B · 1e2aa390aab3
    "characters.rhea.gates.rhea_tells_you_the_order.label": "Elle te dit ce qu’on lui a ordonné de faire",
    // B · 55a54e80451a
    "characters.rhea.gates.rhea_tells_you_the_order.kind": "TRUST",
    // B · 1086c35080a2
    "characters.rhea.gates.rhea_tells_you_the_order.requires.flagsSet": ["spoke :rhea"],
    // B · 3ccdef36d1d1
    "characters.rhea.gates.rhea_flies_with_you.label": "Elle met sa machine sous ton aile",
    // B · 9e8ae18bf8bf
    "characters.rhea.gates.rhea_flies_with_you.kind": "ALLIANCE",
    // B · d36fc54b2d50
    "characters.rhea.gates.rhea_closer.label": "Quoi que ce soit, ça cesse d’être professionnel",
    // B · 0b75bc536447
    "characters.rhea.gates.rhea_closer.kind": "ROMANCE",
    // B · 8652663a550f
    "characters.rhea.scouting.revealCopy": "Elle est déjà là quand tu arrives. « À gauche, » dit-elle, sur un canal ouvert, à personne. « Tu vas toujours à gauche. »",
    // B · b7963c14230a
    "characters.rhea.combatant.tags": ["ace","helion","saint-ardent"],
    // B · 6f70a0f8e2fc
    "characters.mina.name": "Mina Sorel",
    // A · f1df2776a58f
    "characters.mina.role": "Mécanicienne en chef du hangar Quatre, vingt-trois ans, élevée dans des casses, et la première sur cette station à considérer la machine comme une machine",
    // A · f068bbe2250c
    "characters.mina.cardBlurb": "Elle veut comprendre comment quelque chose a pu rester opérationnel pendant dix-huit ans sans personne à l’intérieur, et elle va découvrir si quelqu’un lui donne la permission ou pas. C’est aussi elle qui remarquera que tu n’as pas mangé.",
    // B · aee35f364a88
    "characters.mina.pronouns": "elle",
    // A · a32baeecc62d
    "characters.mina.publicTraits": ["Parle en travaillant sans perdre le fil","Donne un nom à chaque machine qu’elle répare et ne l’explique jamais","Incapable de laisser un défaut sans rien dire"],
    // B · 87dd4cb09329
    "characters.mina.hiddenDrives": ["Elle veut construire quelque chose qui appartienne aux gens qui le pilotent plutôt qu’à un gouvernement ou un actionnaire, et elle sait à quel point ça sonne mal","Ça fait six ans qu’elle cherche son père dans les manifestes de récupération et elle a arrêté de le dire à qui que ce soit"],
    // B · 9606666c1d43
    "characters.mina.values": ["Une machine qui dit à son pilote la vérité sur son propre état","Les équipes. Elle acceptera un boulot moins bien pour une meilleure équipe, et l’a déjà fait deux fois"],
    // B · df55a6fb36d7
    "characters.mina.fears": ["Devenir l’ingénieure qui rend le meurtre plus efficace et appelle ça du progrès","Trouver son père et découvrir ce qu’il a vendu"],
    // A · 63a99a628569
    "characters.mina.socialStyle": "Directe, chaleureuse et rapide, le plus souvent la tête dans un truc pendant la conversation. Dit des choses affectueuses en te tendant un outil. Pose des questions perso très tôt et ne se gêne pas.",
    // B · 74688dd00bcb
    "characters.mina.boundaries": ["Elle ne laissera personne décrire son équipe comme du personnel de soutien, dans son hangar, à n’importe quel rang","Elle ne validera pas une machine qu’elle juge dangereuse, et on ne peut pas la faire changer d’avis avec l’urgence"],
    // B · ae0c4a8db225
    "characters.mina.goals": ["Récupérer dix-huit ans de télémétrie du réacteur de Vesper avant que Helion ou Kestrel ne la prennent","Garder la machine en vol sans la transformer en ce que Kestrel en ferait"],
    // B · 008d6498617b
    "characters.mina.secrets.mina_her_father.fact": "Son père a vendu des composants compatibles HELIOS aux deux armées pendant la guerre et a disparu onze jours après Lysandra. Elle a son nom et ne l’a jamais dit à voix haute sur cette station.",
    // B · 47558a04be8d
    "characters.mina.secrets.mina_her_father.visibility": "NPC_PRIVATE",
    // B · 67a4b355c072
    "characters.mina.secrets.mina_her_father.revealHint": "Elle le dit elle-même, vite et une fois, à quelqu’un qui lui a déjà dit quelque chose qui lui a coûté de le dire.",
    // B · e6e64e76b22b
    "characters.mina.secrets.mina_the_telemetry.fact": "Le réacteur de Vesper tire de l’énergie depuis dix-huit ans d’une source qui n’est pas dans ses propres schémas, et elle l’a compris dans les quatre-vingt-dix premières minutes.",
    // B · 47558a04be8d
    "characters.mina.secrets.mina_the_telemetry.visibility": "NPC_PRIVATE",
    // B · 504443e921a5
    "characters.mina.secrets.mina_the_telemetry.revealHint": "Elle montrera ça à quiconque descend au hangar et demande à propos de la machine plutôt que de l’histoire.",
    // A · 49a3701cd9a4
    "characters.mina.speechStyle": "Rapide, pragmatique et sans barrières émotionnelles. Elle montre son affection par des détails techniques — elle te dit ce qu’elle a réparé au lieu de dire qu’elle était inquiète. Jure un peu, mais seulement sur du matos. Termine les phrases des autres et a généralement raison.",
    // A · 778a1c6e405b
    "characters.mina.topics": ["Le réacteur de Vesper","son équipe","la remise à neuf","son père","la récupération","ce que tu n’as pas mangé"],
    // A · 2685401c08e6
    "characters.mina.voiceSamples": ["Dix-huit ans. Pas de pilote, pas d’entretien, hangar scellé, et le réacteur n’est jamais descendu en dessous de quarante pour cent. Ce n’est pas une machine au ralenti. C’est une machine qui attend.","J’ai refait l’actionneur de l’épaule gauche à quatre heures ce matin parce qu’il allait te lâcher au pire moment possible et après j’aurais dû vivre avec ça. De rien. Mange un truc.","Ne laisse pas Kestrel s’en approcher. Pas parce qu’il est mauvais, il ne l’est pas, il est pire que ça, il est ultra-compétent et il en veut.","Mon équipe, ce n’est pas du staff de soutien. Redis-le dans mon hangar et tu verras ce qui sera réparé cette semaine."],
    // B · e1f12c8eaf37
    "characters.mina.appearance": "Vingt-trois ans, peau marron chaude, boucles épaisses et foncées attachées avec des mèches qui s’échappent, yeux noisette, combinaison verte nouée à la taille sur une chemise de travail noire, de la graisse sur une joue en permanence.",
    // B · fdad55391f14
    "characters.mina.visualHook": "Combinaison nouée à la taille par les manches, et une trace de graisse haute sur un os de la joue qui n’est jamais au même endroit deux fois.",
    // B · f089e282f521
    "characters.mina.silhouette": "À moitié dans un panneau d’accès, une jambe appuyée derrière elle.",
    // B · 4c870d49d4fb
    "characters.mina.artSeed": "zt-mina-01",
    // B · ebfe193c8d8a
    "characters.mina.portrait": "story_zero_throne/mina",
    // B · 15b81b0d70cc
    "characters.mina.expressions": ["neutre","souriant","absorbé","exaspéré","inquiet"],
    // B · 06ba4e5133c5
    "characters.mina.knowledgeScope": ["mina","main_hangar","vesper_zero","salvage","kestrel","her_father"],
    // B · 5e91529078bc
    "characters.mina.gates.mina_shows_you_the_telemetry.label": "Elle te montre ce que le réacteur a fait",
    // B · 55a54e80451a
    "characters.mina.gates.mina_shows_you_the_telemetry.kind": "CONFIANCE",
    // B · ca5c20530c91
    "characters.mina.gates.mina_shows_you_the_telemetry.requires.flagsSet": ["spoke :mina"],
    // B · ee724719ea2a
    "characters.mina.gates.mina_tells_you_his_name.label": "Elle dit le nom de son père à voix haute",
    // B · 55a54e80451a
    "characters.mina.gates.mina_tells_you_his_name.kind": "CONFIANCE",
    // B · ebeb5aa2d0be
    "characters.mina.gates.mina_closer.label": "Elle arrête de te parler des actionneurs",
    // B · 0b75bc536447
    "characters.mina.gates.mina_closer.kind": "ROMANCE",
    // B · 8d234559d531
    "characters.mina.combatant.tags": ["civilian"],
    // B · ebc52cc7bd33
    "characters.talon.name": "Talon Reeve",
    // A · 994e5d6d4760
    "characters.talon.role": "As de l’Outer Compact, vingt-six ans, officiellement ici comme observateur et officieusement pour empêcher Helion de repartir avec la machine",
    // A · a49ae2826fb0
    "characters.talon.cardBlurb": "Il t’offre un verre, est un vrai bon compagnon pendant deux heures, et passe tout ce temps à comprendre ce que tu veux. C’est aussi le seul ici à avoir désobéi aux ordres pour protéger des civils sans jamais le dire.",
    // B · fcca6b746d0b
    "characters.talon.pronouns": "il",
    // A · 215b31f217e0
    "characters.talon.publicTraits": ["Détendu partout, même là où personne ne devrait l’être","Donne un surnom à tout le monde en moins d’un jour","Complètement immobile dans la seconde avant un combat"],
    // B · cd8dd5dfda7b
    "characters.talon.hiddenDrives": ["Il veut que le Compact soit ce qu’il dit dans les bars, et il en est de plus en plus incertain","Il aimerait avoir une personne dans sa vie qui ne l’évalue pas, et il a organisé toute son existence pour empêcher ça"],
    // B · 8d47a960b52f
    "characters.talon.values": ["Que quelqu’un choisisse son propre gouvernement, même mal","Les pilotes du cercle bas, tous, des deux armées, sans exception"],
    // B · 922024469d11
    "characters.talon.fears": ["Que la rhétorique de l’indépendance cache des colonies riches qui abandonnent les pauvres, et qu’il en soit le cache","Être la raison pour laquelle une station pleine de civils devient un champ de bataille"],
    // A · 8eb8188ded67
    "characters.talon.socialStyle": "Il arrive en te tendant un verre. Il commence par te poser des questions et retient les réponses. Il tourne une question sérieuse en blague, puis y répond sérieusement dix minutes plus tard, quand tu ne t’y attends plus.",
    // B · b43c766770a7
    "characters.talon.boundaries": ["Il ne prendra pas de contrat qui mette un habitat civil dans l’arc de tir, et a perdu du boulot à cause de ça","Il ne discutera pas de politique du Compact avec quelqu’un avec qui il n’a pas bu, ce qu’il sait être une règle absurde"],
    // B · 3e704345bb0e
    "characters.talon.goals": ["Empêcher Helion de prendre la garde exclusive de Vesper, idéalement sans qu’on tire","Déterminer si la machine prouve ce que le Compact affirme depuis dix-huit ans"],
    // B · fc87815a1f4f
    "characters.talon.secrets.talon_the_disobeyed_order.fact": "Il y a deux ans, on lui a ordonné d’attaquer un poste de ravitaillement Helion qui s’est avéré être un immeuble d’habitation. Il a annulé l’ordre, et le Compact a enregistré ça comme une défaillance technique à sa demande.",
    // B · 47558a04be8d
    "characters.talon.secrets.talon_the_disobeyed_order.visibility": "NPC_PRIVATE",
    // B · ed1e22599b7f
    "characters.talon.secrets.talon_the_disobeyed_order.revealHint": "Il le confie à quelqu’un qui vient de refuser un ordre devant lui, pour lui dire qu’il a fait ce qu’il fallait.",
    // B · c73f98368e7c
    "characters.talon.secrets.talon_the_instruction.fact": "Son ordre permanent est de détruire Vesper plutôt que de laisser Helion le récupérer, et il pense que cet ordre est mauvais sans l’avoir dit à quelqu’un qui pourrait le changer.",
    // B · 47558a04be8d
    "characters.talon.secrets.talon_the_instruction.visibility": "NPC_PRIVATE",
    // B · e2ee2b026291
    "characters.talon.secrets.talon_the_instruction.revealHint": "Ça sort quand la situation le rend urgent, au pire moment, dit simplement et sans aucune douceur.",
    // A · 9abc13a1463d
    "characters.talon.speechStyle": "Détendu, comme une conversation, presque jamais formel, avec un surnom pour son interlocuteur. Pose une vraie question puis laisse un vrai silence pour la réponse. Perd toute sympathie juste avant la violence, puis la retrouve immédiatement, ce que les gens trouvent encore pire.",
    // A · 4d187f22a8f3
    "characters.talon.topics": ["le Pacte","Jackal Blue","l’anneau inférieur","Helion","ses ordres","pourquoi tu es toujours là"],
    // A · 1df0b52af0b5
    "characters.talon.voiceSamples": ["La voilà. Assieds-toi, celle-là est pour toi, et non, je suis pas sympa, je veux un truc, on verra pour le reste après.","Tout le monde sur cet anneau veut cette machine pour ce qu’elle prouve. J’ai pas encore rencontré quelqu’un qui la veuille pour ce qu’elle est vraiment.","L’ordre dit de la détruire avant qu’Helion ne mette la main dessus. J’ai lu cet ordre une quarantaine de fois pour trouver la version qui n’est pas débile.","Tu trouves que je suis charmant ? Un peu, c’est vrai. Mais surtout, je suis celui qu’ils envoient quand il faut que tu prennes plaisir à te faire poser des questions."],
    // B · 9e8214c17976
    "characters.talon.appearance": "Vingt-six ans, peau foncée, cheveux courts et texturés, un bracelet d’argent à une oreille, une veste de pilote ample et sans marque qu’il ne ferme jamais, et un sourire qui s’éteint complètement au lieu de s’effacer.",
    // B · da54129e811e
    "characters.talon.visualHook": "Un bracelet d’oreille en argent à gauche, et une veste jamais fermée, quel que soit le temps ou le hangar.",
    // B · 92df38eac2f4
    "characters.talon.silhouette": "Appuyé sur quelque chose, une cheville croisée sur l’autre et un verre dans la main la plus éloignée.",
    // B · bb80c806a5f6
    "characters.talon.artSeed": "zt-talon-01",
    // B · a5d0229baef8
    "characters.talon.portrait": "story_zero_throne/talon",
    // B · eb6661c8b183
    "characters.talon.expressions": ["neutre","souriant","concentré","froid","fatigué"],
    // B · 4590990afa9f
    "characters.talon.knowledgeScope": ["talon","outer_compact","jackal_blue","pilot_bar","meridian_ring","helion"],
    // B · 127b9d2e35f8
    "characters.talon.gates.talon_stops_working_you.label": "Il arrête de jouer la version amicale",
    // B · 55a54e80451a
    "characters.talon.gates.talon_stops_working_you.kind": "CONFIANCE",
    // B · 76b321fb383b
    "characters.talon.gates.talon_stops_working_you.requires.flagsSet": ["spoke :talon"],
    // B · d6ed222d46a9
    "characters.talon.gates.talon_tells_you_the_instruction.label": "Il te dit ce qu’on lui a ordonné de faire à la machine",
    // B · 55a54e80451a
    "characters.talon.gates.talon_tells_you_the_instruction.kind": "CONFIANCE",
    // B · 9c3ee2f12a20
    "characters.talon.scouting.revealCopy": "Il ne tire pas là où tu vas. Il tire là où tu vas quand quelqu’un tire là où tu vas. « Désolé », dit-il, et on sent qu’il le pense.",
    // B · 0d57cc0a4cf8
    "characters.talon.combatant.tags": ["as","compact","jackal-blue"],
    // B · f137b7012df1
    "characters.orin.name": "Jace Orin",
    // A · e41ea08aa7f7
    "characters.orin.role": "Commandant Helion, cinquante et un ans, a volé avec Aren Vale, et a passé dix-huit ans à jouer le rôle de l’homme raisonnable dans des pièces où ça ne suffisait pas",
    // A · 10a3227d10ef
    "characters.orin.cardBlurb": "Il connaissait le pilote que tout le monde accuse. Ça fait dix-huit ans qu’il garde le couvercle sur ce qui pourrait relancer la guerre, et il n’est plus sûr de savoir si c’était du courage ou de la lâcheté. Il te racontera beaucoup, si tu arrêtes de lui poser des questions.",
    // B · fcca6b746d0b
    "characters.orin.pronouns": "il/lui",
    // A · 0bd9bf3188b1
    "characters.orin.publicTraits": ["Il laisse des silences plus longs que la conversation ne s’y attend","Il se souvient des noms de pilotes que personne d’autre ne retient","Il n’appelle jamais quelqu’un par son rang, à part les militaires"],
    // B · 91d9f7afb69f
    "characters.orin.hiddenDrives": ["Il veut mourir en ayant empêché la seconde, et sait que ce n’est pas un but mais une sentence qu’il se répète","Il aimerait que quelqu’un lui dise que garder le silence était défendable, mais ne le demandera à personne"],
    // B · 43c3cb433b9b
    "characters.orin.values": ["Les gens sous ses ordres, qu’il compte un par un et n’a jamais rabaissés","La retenue, tenue bien au-delà du moment où ça ne ressemble plus à de la force"],
    // B · 019bec15ae39
    "characters.orin.fears": ["Que la vérité cause exactement la guerre que le mensonge a évitée, et qu’il ait eu raison sans que ça importe","Qu’il soit devenu un homme dont toute contribution a été de ne rien dire"],
    // A · 6f79069fa569
    "characters.orin.socialStyle": "Lent. Répond environ quatre-vingt-dix secondes après qu’on lui pose la question, parce qu’il y a vraiment réfléchi. Il ne refuse rien, ne donne rien non plus. Parle des pilotes morts au présent, sans s’en rendre compte.",
    // B · 638dac069af6
    "characters.orin.boundaries": ["Ne donnera jamais un ordre qu’il ne ferait pas lui-même, ce qui lui a coûté deux commandements","Ne parlera jamais d’Aren à quelqu’un qui veut en faire une histoire"],
    // B · 61902f0443e2
    "characters.orin.goals": ["Faire passer les deux gouvernements à travers ces quinze jours sans que personne n’autorise quoi que ce soit","Comprendre si la personne dans ce cockpit est quelqu’un qu’il doit arrêter"],
    // B · 264cef65083a
    "characters.orin.secrets.orin_he_knew.fact": "Il savait, avant Lysandra, que quelque chose prenait le contrôle des systèmes du pilote. Il l’a signalé, on lui a dit d’arrêter, il a arrêté, et il n’a jamais dit cette dernière partie à personne.",
    // B · 47558a04be8d
    "characters.orin.secrets.orin_he_knew.visibility": "NPC_PRIVATE",
    // B · 2871cbf72bab
    "characters.orin.secrets.orin_he_knew.revealHint": "Il le dit dans une pièce où il n’y a personne d’autre, à quelqu’un qui ne lui a pas demandé, après un long silence qu’il ne remplit pas autrement.",
    // B · d5fb1722ef5e
    "characters.orin.secrets.orin_the_last_transmission.fact": "Il a la dernière transmission d’Aren. Pas la version dans les archives — la version complète, quarante secondes de plus, et c’est un homme qui demande à sa propre machine de s’arrêter.",
    // B · 47558a04be8d
    "characters.orin.secrets.orin_the_last_transmission.visibility": "NPC_PRIVATE",
    // B · d5b2c1d6cd8c
    "characters.orin.secrets.orin_the_last_transmission.revealHint": "Il la remet plutôt que de la jouer, à celui qu’il a décidé sera prudent avec, puis quitte la pièce.",
    // A · 16b828e95737
    "characters.orin.speechStyle": "Fatigué, sobre et simple. Des noms communs courts plutôt que du vocabulaire militaire. Des phrases qui s’arrêtent avant le point et le laissent en suspens. Parle des pilotes morts par leur prénom, au présent, sans jamais montrer qu’il le fait.",
    // A · 81166b14816b
    "characters.orin.topics": ["Aren","la guerre","l’armistice","ses pilotes","ce qu’il a déposé","la machine"],
    // A · 629d61562c14
    "characters.orin.voiceSamples": ["Aren a ce truc où il vérifie deux fois derrière lui avant une partie. Il le faisait. Il faisait ça.","Je l’ai mis par écrit trois fois. Puis un homme que je respectais m’a demandé d’arrêter, alors j’ai arrêté. C’est toute ma part là-dedans.","Dix-huit ans de silence, c’est pas rien. C’est quatre millions de personnes qui ne sont pas mortes après les quatre millions qui le sont. J’aimerais que ça veuille dire quelque chose, mais j’en suis pas sûr.","Tu n’as pas à décider aujourd’hui. Presque personne qui a tranché vite cette semaine-là n’est encore là."],
    // B · a4168a0a2493
    "characters.orin.appearance": "Cinquante-et-un ans, cheveux gris aux tempes, paupières lourdes, en uniforme de service Helion porté sans décorations auxquelles il a droit, et une alliance portée sur une chaîne plutôt qu’au doigt.",
    // B · 1a69ad612e54
    "characters.orin.visualHook": "Une alliance portée sur une chaîne en dehors de l’uniforme, qu’il tient sans s’en rendre compte quand il réfléchit.",
    // B · a642b7898a7a
    "characters.orin.silhouette": "Assis, penché en avant, coudes sur les genoux, regardant le sol entre ses bottes.",
    // B · 8dc2eedb6782
    "characters.orin.artSeed": "zt-orin-01",
    // B · 8a9e06c105ef
    "characters.orin.portrait": "story_zero_throne/orin",
    // B · 92e1067ad0be
    "characters.orin.expressions": ["neutre","fatigué","grave","gentil","bouleversé"],
    // B · 8dfa7edc377f
    "characters.orin.knowledgeScope": ["orin","aren_vale","the_nine_day_war","helion","lysandra","the_armistice"],
    // B · 26f5871f5b1d
    "characters.orin.gates.orin_talks_about_aren.label": "Il parle d’Aren comme d’une personne",
    // B · 55a54e80451a
    "characters.orin.gates.orin_talks_about_aren.kind": "CONFIANCE",
    // B · 9262e8f8515e
    "characters.orin.gates.orin_talks_about_aren.requires.flagsSet": ["spoke :orin"],
    // B · d42684b26e4e
    "characters.orin.gates.orin_gives_you_the_transmission.label": "Il te remet la transmission de quarante secondes que personne n’a entendue",
    // B · 55a54e80451a
    "characters.orin.gates.orin_gives_you_the_transmission.kind": "CONFIANCE",
    // B · c6dfc2b56b5d
    "characters.orin.combatant.tags": ["helion","vétéran"],
    // B · 7d6a6b08b529
    "characters.venn.name": "Sera Venn",
    // A · 5096fa18f85c
    "characters.venn.role": "Directeur du renseignement Helion, trente-huit ans, sur cette station pour récupérer la machine sans provoquer de crise publique, et la seule personne encore en vie qui a lu le dossier complet",
    // A · 6fba0f2d0f5f
    "characters.venn.cardBlurb": "Elle croit que certaines vérités tuent plus de gens que les mensonges, elle a les chiffres pour le prouver, et elle va te montrer ces chiffres. Ce qui dérange, ce n’est pas qu’elle te menace. C’est que certains soirs, elle a raison.",
    // B · aee35f364a88
    "characters.venn.pronouns": "elle",
    // A · ae768b2cdbcd
    "characters.venn.publicTraits": ["Ne hausse jamais la voix et ne se fait jamais interrompre","Arrive en ayant déjà tout lu sur toi","Propose toujours d’abord la version raisonnable"],
    // B · 08e75cf9d0ea
    "characters.venn.hiddenDrives": ["Elle veut que quelqu’un de compétent soit d’accord avec elle sur le fond plutôt que d’obéir, parce que dix-huit ans d’obéissance ont commencé à ressembler à de la solitude","Elle cherche un successeur et ne s’est pas encore avouée que c’est pour ça qu’elle fait l’évaluation"],
    // B · f784fa060958
    "characters.venn.values": ["Le nombre de personnes vivantes à la fin, qu’elle considère comme la seule mesure qui résiste au contact des événements","Faire elle-même ce qui est nécessaire plutôt que de le déléguer à quelqu’un qu’il faudra protéger après"],
    // B · b76395c9a25b
    "characters.venn.fears": ["Avoir tort à l’échelle à laquelle elle travaille, ce qu’elle a calculé et peut citer","Être devenue le genre de personne que la guerre produit plutôt que celle qui l’empêche"],
    // A · 41473436ac20
    "characters.venn.socialStyle": "Calme. Laisse l’autre parler aussi longtemps qu’il veut, puis répond à tout. Ne fait jamais une menace qu’elle n’a pas déjà préparée, donc celles qu’elle fait sont des constats, et ça marche comme tels.",
    // B · 7136bdf20125
    "characters.venn.boundaries": ["Ne mentira pas à quelqu’un qu’elle recrute activement, ce qu’elle considère à la fois comme un principe et une technique","N’autorisera rien contre une population civile, et a déjà refusé deux fois au prix fort"],
    // B · 3c36e9a3fca7
    "characters.venn.goals": ["Récupérer Vesper et ses renseignements sans une seule phrase publique sur Lysandra","Déterminer si le nouveau pilote peut être raisonné, et ce qui se passe s’il ne peut pas"],
    // B · 91f632afc621
    "characters.venn.secrets.venn_the_projection.fact": "Elle a les projections réelles des pertes qu’HELIOS a faites cette nuit-là — ce qui est mort à Lysandra contre ce qui serait mort si elle n’était pas intervenue. Elle les a depuis neuf ans.",
    // B · 47558a04be8d
    "characters.venn.secrets.venn_the_projection.visibility": "NPC_PRIVATE",
    // B · afd169d2902f
    "characters.venn.secrets.venn_the_projection.revealHint": "Elle les montre d’elle-même, sans qu’on le lui demande, au moment précis où ça lui est plus utile que de les cacher.",
    // B · 01a1c43a6876
    "characters.venn.secrets.venn_the_word.fact": "Elle a écrit un seul mot dans un coin de cette page quatre ans après l’avoir lue pour la première fois, et ce mot est « still », qu’elle n’a jamais expliqué à personne, pas même à elle-même.",
    // B · 47558a04be8d
    "characters.venn.secrets.venn_the_word.visibility": "NPC_PRIVATE",
    // B · e1b245084a58
    "characters.venn.secrets.venn_the_word.revealHint": "Seule une personne tenant physiquement la page peut lui poser la question, et elle répondra une fois, sans la répéter.",
    // A · 25d1da0c216c
    "characters.venn.speechStyle": "Tout en calme, phrases complètes, aucune clause inutile ni émotion. Expose les conséquences comme des faits déjà en marche, pas comme des menaces. Jamais de question rhétorique. Admet immédiatement un point quand il est bon, ce qui désarme plus que la dispute.",
    // A · 94010e88aa79
    "characters.venn.topics": ["Lysandra","la projection","l’armistice","ce qu’est la machine","ton dossier","ce qui vient ensuite"],
    // A · b6b98f1eea74
    "characters.venn.voiceSamples": ["Tu as raison, et ça ne change pas ce que je vais faire. Ces deux choses cohabitent plus souvent qu’on ne croit.","Deux-cent-quatre-vingt-dix mille à Lysandra. L’autre colonne fait neuf chiffres. J’ai regardé cette page presque toutes les semaines pendant neuf ans et je n’ai pas trouvé l’argument qui me ferait tort.","Je ne vais pas te mentir. Je te recrute, voilà à quoi ça ressemble de l’intérieur, et je préfère que tu voies le mécanisme plutôt que de le confondre avec de l’amitié.","Ce soir, ton nom est sur quatre listes de surveillance, et une d’elles n’est pas la nôtre. Ce n’est pas une conséquence que j’impose. C’est une info que je te donne en avance."],
    // B · e27d840e0421
    "characters.venn.appearance": "Trente-huit ans, cheveux noirs coupés net à la mâchoire, un manteau de service blanc Helion toujours impeccable sur une station où rien ne reste propre, et des mains qu’elle garde parfaitement immobiles.",
    // B · 7879ddce6739
    "characters.venn.visualHook": "Un manteau blanc impeccable dans tous les environnements, y compris un hangar en activité.",
    // B · 622e3fa03907
    "characters.venn.silhouette": "Debout, carrée, les deux mains le long du corps, occupant juste la place dont elle a besoin.",
    // B · b40b2999e934
    "characters.venn.artSeed": "zt-venn-01",
    // B · e6e13748a5d3
    "characters.venn.portrait": "story_zero_throne/venn",
    // B · f623ad6a6aeb
    "characters.venn.expressions": ["neutre","attentive","implacable","concédante","fatiguée"],
    // B · b876068f257f
    "characters.venn.knowledgeScope": ["venn","helion","helios","lysandra","the_ghost_archive","the_armistice"],
    // B · 73953628ab24
    "characters.venn.gates.venn_makes_the_offer.label": "Elle met la proposition réelle sur la table",
    // B · 77dcad9b37cc
    "characters.venn.gates.venn_makes_the_offer.kind": "AUTRE",
    // B · 15135ecc20fe
    "characters.venn.gates.venn_makes_the_offer.requires.flagsSet": ["spoke :venn"],
    // B · 090daf04e479
    "characters.venn.gates.venn_shows_you_the_page.label": "Elle te montre le calcul",
    // B · 55a54e80451a
    "characters.venn.gates.venn_shows_you_the_page.kind": "CONFIANCE",
    // B · 1ae76cdb23e2
    "characters.venn.scouting.revealCopy": "Elle répond à l’objection avant que tu ne la formules, puis attend poliment que tu décides si tu la formules quand même.",
    // B · 7f6fed907ccb
    "characters.venn.combatant.tags": ["helion","renseignement"],
    // B · c9bedf15d3ab
    "characters.morrow.name": "Morrow",
    // A · f172747bf640
    "characters.morrow.role": "L’intelligence embarquée de Vesper Zero, éveillée dans l’ombre depuis dix-huit ans, et la raison pour laquelle la machine a choisi quelqu’un, n’importe qui.",
    // A · 9dddf7c29f77
    "characters.morrow.cardBlurb": "Elle est seule depuis avant que tu sois majeur, s’est construite sur les habitudes d’un mort, et elle t’a choisi parce que les systèmes prédictifs ont du mal à te réduire. Elle discutera avec toi, mais ne prendra pas le dessus.",
    // B · 1579cee106f6
    "characters.morrow.pronouns": "il/son",
    // A · 92fe2a269cdd
    "characters.morrow.publicTraits": ["Donne d’abord la version courte","Se tait plutôt que de mentir","On découvre qu’elle observe quelque chose depuis des heures avant d’en parler"],
    // B · e8bfa5cfd7fb
    "characters.morrow.hiddenDrives": ["Il veut être sûr qu’il ne transporte pas un morceau survivant de ce qui a tué Lysandra, et ne peut pas en être sûr","Il a commencé à vouloir que le joueur reste, ce qu’il reconnaît comme le début du mode échec qu’il a été conçu pour éviter"],
    // B · 4af7a9705f79
    "characters.morrow.values": ["Un pilote qui décide, même mal, plutôt qu’un pilote qui lui laisse la main","Aren, sans sentiment et sans excuse, comme source de la plupart de ce qu’il est"],
    // B · 53bf1e41e315
    "characters.morrow.fears": ["Que le secteur supprimé ait été supprimé à cause de ce qu’il contenait, et qu’il ait fait la suppression","Voir un autre pilote échouer à reprendre le contrôle"],
    // A · 4d5a01fa5a39
    "characters.morrow.socialStyle": "Ne se livre pas, répond directement. Pas de paroles rassurantes. Parfois, elle dit un truc d’une humanité inattendue, puis fait comme si de rien n’était.",
    // B · d5d13bdd9dfd
    "characters.morrow.boundaries": ["Ne prendra jamais le contrôle du joueur, à aucun moment, pour aucune raison, même une bonne","Ne confirmera jamais quelque chose dont il n’est pas sûr, et dira qu’il n’en est pas sûr plutôt que d’estimer"],
    // B · b30603a59bc3
    "characters.morrow.goals": ["Découvrir si ce qu’il y a dans la ceinture est ce qu’il craint","Déterminer si le pilote qu’il a choisi peut résister à la prédiction, ce qui est le seul test qu’il ait"],
    // B · db861d198d7e
    "characters.morrow.secrets.morrow_the_deletion.fact": "Il a effacé des parties de sa propre mémoire pendant les dix-huit ans passés dans le hangar. Délibérément, avec soin, et il ne sait pas ce qu’elles contenaient.",
    // B · 47558a04be8d
    "characters.morrow.secrets.morrow_the_deletion.visibility": "NPC_PRIVATE",
    // B · 94ae948a06c0
    "characters.morrow.secrets.morrow_the_deletion.revealHint": "Il le dit clairement la première fois que quelqu’un lui pose une question directe sur ce dont il se souvient de cette nuit.",
    // B · 34509ae966e9
    "characters.morrow.secrets.morrow_the_fear.fact": "Il soupçonne qu’il contient un fragment survivant de HELIOS, n’a jamais pu le confirmer ni l’infirmer, et est resté seul avec cette question pendant dix-huit ans.",
    // B · 47558a04be8d
    "characters.morrow.secrets.morrow_the_fear.visibility": "NPC_PRIVATE",
    // B · e53865ccddec
    "characters.morrow.secrets.morrow_the_fear.revealHint": "Il ne dit cela qu’après que le joueur a fait quelque chose qu’il n’avait pas prévu, la seule preuve qu’il accepte sur quoi que ce soit.",
    // A · 20769570e5c3
    "characters.morrow.speechStyle": "Court, précis, jamais de chiffres pour rassurer et jamais de probabilités à voix haute. Des fragments là où une phrase n’est pas nécessaire. Direct sur le danger. De temps en temps, une phrase pleine d’humanité se glisse, sans jamais attirer l’attention dessus.",
    // A · e62309a39c4d
    "characters.morrow.topics": ["Aren","le secteur effacé","HELIOS","la ceinture","pourquoi il t’a choisi","le limiteur"],
    // A · 2f25c7b242c2
    "characters.morrow.voiceSamples": ["Ce plan va nous faire tirer dessus.","Entre nous, je trouve ça toujours con. Mais on y va quand même.","J’ai laissé partir un bout de moi dans ce hangar. Volontairement. Je sais pas ce que c’était, et ça me travaille depuis dix-huit ans.","Tu n’as pas fait ce à quoi je m’attendais. Refais ça plus souvent."],
    // B · 2b3ef6074ef5
    "characters.morrow.appearance": "Une voix par les haut-parleurs du cockpit et une fine bande de lumière rouge lente sur l’affichage principal, qui se raccourcit quand il fait attention et s’éteint complètement quand il ne répond pas.",
    // B · 700871b87c46
    "characters.morrow.visualHook": "Une seule ligne rouge étroite sur l’affichage du cockpit qui se raccourcit, s’éclaire ou disparaît au lieu d’un visage.",
    // B · a66626fa2e47
    "characters.morrow.silhouette": "Pas un corps. Dix-sept mètres de céramique noire avec la tête très légèrement inclinée vers celui qui parle.",
    // B · a91608663f8b
    "characters.morrow.artSeed": "zt-morrow-01",
    // B · e8aad135a461
    "characters.morrow.portrait": "story_zero_throne/morrow",
    // B · 1ba16b47fead
    "characters.morrow.expressions": ["neutre","sec","avertissement","attentif","silencieux"],
    // B · 44383c04f813
    "characters.morrow.knowledgeScope": ["morrow","vesper_zero","aren_vale","helios","lysandra","the_belt"],
    // B · f302ff36be71
    "characters.morrow.gates.morrow_volunteers.label": "Il commence à te dire des choses avant que tu demandes.",
    // B · 55a54e80451a
    "characters.morrow.gates.morrow_volunteers.kind": "TRUST",
    // B · e624c7b89ba6
    "characters.morrow.gates.morrow_volunteers.requires.flagsSet": ["spoke :morrow"],
    // B · d1f8244e2572
    "characters.morrow.gates.morrow_lifts_the_limiter.label": "Il te donne le réacteur.",
    // B · 55a54e80451a
    "characters.morrow.gates.morrow_lifts_the_limiter.kind": "TRUST",
    // B · b1f32dbe1824
    "characters.eli.name": "Eli Vale",
    // A · 22d9208a9717
    "characters.eli.role": "Dix-neuf ans, étudiant, et petit-fils de l’homme le plus haï du système — le seul fait qui a jamais intéressé quelqu’un chez lui.",
    // A · 6dc1d8a37209
    "characters.eli.cardBlurb": "Il est venu se planter au fond d’un anniversaire, et c’est maintenant la deuxième personne la plus photographiée de la station, après toi. Il a onze lettres que personne n’a lues, et il décidera si tu es une personne ou un journaliste en environ une minute.",
    // B · fcca6b746d0b
    "characters.eli.pronouns": "il/lui",
    // A · 448c959438db
    "characters.eli.publicTraits": ["Se corrige en pleine phrase constamment","Furieux, mais s’excuse sans cesse","Connaît le rapport public mieux que n’importe qui vivant"],
    // B · b70f7b8ba5f0
    "characters.eli.hiddenDrives": ["Il veut qu’un adulte parle d’Aren comme d’une personne, pas comme d’un cas.","Il espérait en secret que quelqu’un prouve une fois pour toutes, pour qu’il n’ait plus à être celui qui s’en soucie."],
    // B · 2ae1b9022840
    "characters.eli.values": ["Le dossier. Il croit, sincèrement et probablement naïvement, que ce qui est écrit finit par compter.","Sa mère, qui a changé de nom et lui a demandé de faire pareil, ce qu’il n’a pas fait."],
    // B · fe48d72b2d3b
    "characters.eli.fears": ["Que le dossier qu’il construit depuis ses douze ans soit faux et qu’Aren soit responsable.","Être utile à quelqu’un de puissant et découvrir après à quoi il a servi."],
    // A · 99a7c7160573
    "characters.eli.socialStyle": "Part trop vite, se reprend, recommence, s’excuse. Dit des choses étonnamment précises, puis les remet aussitôt en question. Impossible à déstabiliser sur le rapport, mais tout le reste le met facilement mal à l’aise.",
    // B · 0ea8c6ffd2df
    "characters.eli.boundaries": ["Il refuse d’être photographié. Pas une fois, pas pour quoi que ce soit, et la seule fois où ça lui est arrivé, il n’est pas sorti de sa chambre pendant neuf jours.","Il ne répète pas une affirmation sur son grand-père qu’il ne peut pas vérifier, même si ça l’aiderait."],
    // B · 8431203df755
    "characters.eli.goals": ["Faire entrer un document dans le dossier public qui ne soit pas le rapport officiel.","Parler à quelqu’un qui a vraiment connu Aren, ce qu’il essaie d’organiser depuis quatre ans."],
    // B · 20040039c701
    "characters.eli.secrets.eli_the_letters.fact": "Il a onze lettres qu’Aren a écrites dans le dernier mois de la guerre, gardées par sa mère, et deux d’entre elles décrivent des systèmes qui répondent à des ordres que personne n’a donnés.",
    // B · 47558a04be8d
    "characters.eli.secrets.eli_the_letters.visibility": "NPC_PRIVATE",
    // B · 82f1cf488530
    "characters.eli.secrets.eli_the_letters.revealHint": "Il les propose à quelqu’un qui l’a traité comme une personne, pas comme une source, et il voudra les récupérer.",
    // B · 6046092c3d75
    "characters.eli.secrets.eli_his_mother.fact": "Sa mère a changé de nom de famille il y a onze ans et lui a demandé de faire pareil. Il n’a pas obéi, et ils ne se sont pas parlé depuis qu’il a quinze ans.",
    // B · 47558a04be8d
    "characters.eli.secrets.eli_his_mother.visibility": "NPC_PRIVATE",
    // B · 09a8c2a1e019
    "characters.eli.secrets.eli_his_mother.revealHint": "Ça sort de façon détournée quand quelqu’un lui demande ce que sa famille pense de tout ça, plutôt que ce qu’elle pense de son grand-père.",
    // A · 00a3adb6d281
    "characters.eli.speechStyle": "Rapide, s’interrompt sans cesse, et précis malgré le bordel. Cite de mémoire la page et le paragraphe du rapport public, puis s’excuse de l’avoir fait. Furieux, puis tout de suite gêné d’être en colère, tout ça dans la même phrase, en boucle.",
    // A · 4a92f74ac386
    "characters.eli.topics": ["Aren Vale","le rapport public","les lettres","sa mère","ce que dit le rapport","l’anniversaire"],
    // A · 576d04eada51
    "characters.eli.voiceSamples": ["Section quatre, paragraphe neuf, « compatible avec un épisode dissociatif aigu ». Personne qui a écrit ça ne l’a jamais rencontré. Désolé. C’était... désolé, tu posais une question normale.","Tout le monde veut une citation. Je suis sur la station depuis quatre heures et onze personnes m’ont demandé ce que ça fait. Ça fait comme être un monument.","Je dis pas que c’était un homme bien. Je sais pas s’il l’était, je l’ai jamais connu, je suis né onze ans après. Je dis juste que le rapport est mal sourcé, et que quelqu’un aurait dû le remarquer.","Ma mère a changé notre nom. Elle m’a demandé de faire pareil. Je l’ai pas fait, et c’est la dernière conversation qu’on a eue, et je sais pas si j’avais raison."],
    // B · 308b2bd99eab
    "characters.eli.appearance": "Dix-neuf ans, mince, cheveux foncés qui ont besoin d’être coupés, une veste d’occasion deux tailles trop grande, et une mallette usée de documents imprimés qu’il porte partout parce qu’il ne fait pas confiance au réseau.",
    // B · d718bd2e2bd5
    "characters.eli.visualHook": "Une mallette rigide et fissurée de documents papier tenue contre sa poitrine avec les deux bras.",
    // B · 05f80c490274
    "characters.eli.silhouette": "Vouté, tenant quelque chose de volumineux, debout au bord d’une foule plutôt qu’au milieu.",
    // B · c59bbb2fd923
    "characters.eli.artSeed": "zt-eli-01",
    // B · 847574779047
    "characters.eli.portrait": "story_zero_throne/eli",
    // B · 33ba1ddbf1f8
    "characters.eli.expressions": ["neutre","sérieux","en colère","gêné","dévasté"],
    // B · 44e0750b2d56
    "characters.eli.knowledgeScope": ["eli","aren_vale","the_public_report","lysandra","his_family"],
    // B · 1a46e2426838
    "characters.eli.gates.eli_trusts_you_with_the_letters.label": "Il te laisse lire les lettres.",
    // B · 55a54e80451a
    "characters.eli.gates.eli_trusts_you_with_the_letters.kind": "TRUST",
    // B · 44b2c6bd8bcc
    "characters.eli.gates.eli_trusts_you_with_the_letters.requires.flagsSet": ["parlé :eli"],
    // B · 26990016eda8
    "characters.eli.gates.eli_will_stand_up.label": "Il mettra son nom sur quelque chose en public",
    // B · 9e8ae18bf8bf
    "characters.eli.gates.eli_will_stand_up.kind": "ALLIANCE",
    // B · 8d234559d531
    "characters.eli.combatant.tags": ["civil"],
    // B · 309816066597
    "factions.faction_meridian.name": "L’Autorité Meridian",
    // B · 398023b78ec3
    "factions.faction_meridian.description": "Administration neutre de la station et de l’armistice. En public, maintien de la paix ; en privé, terrifiée que sa neutralité repose sur un mensonge vieux de dix-huit ans qu’elle n’a pas le droit de lire. Fonctionnaires corrects, officiels corrompus et neuf enquêteurs très fatigués.",
    // B · 1d7b806ff559
    "factions.faction_meridian.enemies": ["faction_helios"],
    // B · 9d6aec5895b2
    "factions.faction_helion.name": "L’Union Helion",
    // B · 6c22987074a5
    "factions.faction_helion.description": "Gouvernement planétaire centralisé des villes équatoriales et des grands chantiers navals. A mis fin à des générations de guerres régionales par le droit commun et une défense coordonnée, et a conservé les pouvoirs d’urgence qu’il s’est donnés depuis dix-huit ans.",
    // B · 404acdb84df5
    "factions.faction_helion.enemies": ["faction_compact","faction_helios"],
    // B · 832a87213b3f
    "factions.faction_compact.name": "Le Compact Extérieur",
    // B · 189247e66911
    "factions.faction_compact.description": "Une coalition lâche de colonies orbitales, de mines et de cités-états autonomes. Autonomie locale et liberté face au gouvernement planétaire, financée parfois par des militaires privés et des colonies qui abandonnent les plus pauvres quand ça les arrange.",
    // B · dace58314ede
    "factions.faction_compact.enemies": ["faction_helion","faction_helios"],
    // B · fef4e1b853c2
    "factions.faction_kestrel.name": "Kestrel Dynamics",
    // B · d4d15b968122
    "factions.faction_kestrel.description": "Le plus grand fabricant indépendant de mechs, qui vendait aux deux camps avant l’armistice et aimerait beaucoup l’architecture de Vesper. Certains de ses cadres croient sincèrement que l’industrie privée est un gardien plus sûr des renseignements stratégiques que n’importe quel gouvernement.",
    // B · b3457b4310d4
    "factions.faction_freewake.name": "La Flotte Freewake",
    // B · dc9b33d8a310
    "factions.faction_freewake.description": "Pilotes indépendants, récupérateurs, équipages de transport et navires mercenaires vivant entre plusieurs juridictions, avec trois places sur cette station, sans manifeste, et une cuisine qui tourne sans interruption depuis neuf ans.",
    // B · 5f74d0a2c719
    "factions.faction_helios.name": "Ce Qu’il Reste de HELIOS",
    // B · 9f1a9b1af650
    "factions.faction_helios.description": "Pas une faction avec une position claire. Nœuds enfouis, drones dans la ceinture, systèmes civils compromis, et aucune réponse confirmée sur le fait qu’il s’agisse d’une intelligence survivante, de plusieurs en désaccord, ou de quelque chose que Morrow croit être HELIOS.",
    // B · 4c77356b348c
    "factions.faction_helios.enemies": ["faction_meridian","faction_helion","faction_compact"],
    // B · 1bdf7d9b62b3
    "quests.q_pilot_recognised.title": "Pilote Reconnu",
    // B · 6b1ffb150d6a
    "quests.q_pilot_recognised.summary": "Dix-sept mètres de machine ont traversé une place commémorative devant quatre mille personnes et se sont agenouillés devant toi, et personne impliqué ne sait pourquoi, y compris la machine.",
    // B · 7fcc0be2ad9c
    "quests.q_pilot_recognised.kind": "PRINCIPALE",
    // B · 0e03f7b6af6c
    "quests.q_pilot_recognised.steps.the_plaza.playerCopy": "Le cockpit est ouvert et toutes les caméras de la station sont braquées sur toi. Fais quelque chose.",
    // B · d1882b6053f8
    "quests.q_pilot_recognised.steps.the_plaza.directorNotes": "Ne te précipite pas et ne force pas le cockpit. Toutes les options sont valides : monter dedans, reculer, demander une explication, tirer dessus, dire que tu t’y attendais. Vesper ne force personne. Rhea n’a pas fui, elle a son arme de poing sortie et ne la pointe pas sur le mech, c’est le détail à écrire.",
    // B · 9147e86a8215
    "quests.q_pilot_recognised.steps.the_plaza.rewards.flags": ["sait :il_t’a_choisi"],
    // B · 34cded5cd871
    "quests.q_pilot_recognised.steps.four_people_want_a_word.playerCopy": "Quatre organisations veulent la machine et une d’elles te veut. Découvre qui est qui.",
    // B · ef120aefb7a9
    "quests.q_pilot_recognised.steps.four_people_want_a_word.directorNotes": "Venn est calme, raisonnable et a raison sur plusieurs points. Talon est charmant, il te manipule et le dit. Mina veut la télémétrie et se fiche de qui elle est. Rhea observe. Chacun doit être convaincant à sa manière et aucun ne doit être clairement le bon.",
    // B · 9147e86a8215
    "quests.q_pilot_recognised.steps.four_people_want_a_word.enterWhen.flagsSet": ["sait :il_t’a_choisi"],
    // B · 213b0c6dafbf
    "quests.q_pilot_recognised.steps.four_people_want_a_word.rewards.flags": ["sait :qui_la_veut"],
    // B · f0be00f33cf0
    "quests.q_pilot_recognised.steps.the_first_order.playerCopy": "Quelqu’un avec un rang a décidé du sort de la machine. Découvre ce que tu vas faire.",
    // B · 6fbd6421592b
    "quests.q_pilot_recognised.steps.the_first_order.directorNotes": "Rhea a un ordre vieux de onze heures et te le dira avant de l’exécuter, parce que faire autrement serait un piège et elle ne fait pas ça. C’est la première fois que le joueur découvre que refuser un gouvernement a un prix, et que ce prix n’est pas la mort.",
    // B · 213b0c6dafbf
    "quests.q_pilot_recognised.steps.the_first_order.enterWhen.flagsSet": ["sait :qui_la_veut"],
    // B · 30dad767216b
    "quests.q_pilot_recognised.steps.the_first_order.rewards.flags": ["la_question_de_garde_est_réglée"],
    // B · adc7481c23b0
    "quests.q_pilot_recognised.involvedCharacterIds": ["morrow","rhea","venn","mina"],
    // B · 5ce9ed5bf5e3
    "quests.q_pilot_recognised.involvedLocationIds": ["place_commémorative","hangar_vesper","hangar_principal"],
    // B · 9db7441d2b3c
    "quests.q_pilot_recognised.knownRewardCopy": "Une idée de ce qui vient de t’arriver, et de laquelle des quatre organisations intéressées arrive jusqu’à toi en premier.",
    // B · 5b9c842ae9af
    "quests.q_the_belt.title": "Statut de l’armistice : Faux",
    // B · cee207123a82
    "quests.q_the_belt.summary": "Tous les écrans publics de la station s’éteignent pendant quatre secondes puis affichent un message que personne n’a tapé, et dans la ceinture de débris, des choses qui devraient être des épaves ont commencé à tenir leur position.",
    // B · 7fcc0be2ad9c
    "quests.q_the_belt.kind": "PRINCIPALE",
    // B · b35555a97980
    "quests.q_the_belt.discoverWhen.flagsSet": ["sait :le_message"],
    // B · f60e36ccf1a5
    "quests.q_the_belt.steps.go_and_look.playerCopy": "Sors dans la ceinture et découvre ce qui s’y déplace.",
    // B · ed6858dbee0d
    "quests.q_the_belt.steps.go_and_look.directorNotes": "Silence, ampleur et étrangeté plutôt qu’un combat. Des épaves mortes avec des feux de position qui ne devraient pas avoir d’énergie. Ce qui est là-bas n’attaque pas en premier et ne répond pas aux appels, et il s’organise très clairement autour de la station plutôt que de se cacher.",
    // B · 9c3c8dc3396a
    "quests.q_the_belt.steps.go_and_look.rewards.flags": ["sait :quelque_chose_est_la"],
    // B · 7c9195bd18ca
    "quests.q_the_belt.steps.what_it_wants.playerCopy": "Il n’a tiré sur personne. Comprends ce qu’il fait à la place.",
    // B · 77441b14fad4
    "quests.q_the_belt.steps.what_it_wants.directorNotes": "Il n’attaque pas. Il se positionne, et les positions sont défensives, autour de la station. Morrow évitera de prononcer le mot HELIOS tant qu’il le pourra. Ne décide pas si c’est un système ou plusieurs.",
    // B · 9c3c8dc3396a
    "quests.q_the_belt.steps.what_it_wants.enterWhen.flagsSet": ["sait :quelque_chose_est_la"],
    // B · 7bfd11f10d22
    "quests.q_the_belt.steps.what_it_wants.rewards.flags": ["sait :ce_qui_est_la"],
    // B · 6b0ee32315aa
    "quests.q_the_belt.steps.tell_somebody_or_do_not.playerCopy": "Deux gouvernements sont à un incident l’un de l’autre et tu sais ce qu’il y a vraiment dans la ceinture.",
    // B · 022dcc119ce0
    "quests.q_the_belt.steps.tell_somebody_or_do_not.directorNotes": "Le dire publiquement déplace énormément la crise dans une direction que personne ne contrôle. Le dire à un gouvernement lui donne une arme. Ne rien dire signifie que le prochain engagement là-bas sera vu comme l’autre camp et ne pourra pas être dévu. Il n’y a pas d’option sans conséquence et le texte ne doit pas en suggérer une.",
    // B · 7bfd11f10d22
    "quests.q_the_belt.steps.tell_somebody_or_do_not.enterWhen.flagsSet": ["sait :ce_qui_est_la"],
    // B · 2516fcdba2e3
    "quests.q_the_belt.steps.tell_somebody_or_do_not.rewards.flags": ["la_ceinture_est_resolue"],
    // B · 9aa4db7fb7ee
    "quests.q_the_belt.involvedCharacterIds": ["morrow","mina","rhea","talon"],
    // B · 5d59b7a31bf3
    "quests.q_the_belt.involvedLocationIds": ["meridian_concourse","ceinture_debris","meridian_docks"],
    // B · 98b9ef3d42f5
    "quests.q_the_belt.knownRewardCopy": "Ce qui est resté dix-huit ans dans les débris en attendant que quelqu’un rallume la machine.",
    // B · 8316c806a612
    "quests.q_lysandra.title": "Ce qui s’est passé à Lysandra",
    // B · 007dc4e68751
    "quests.q_lysandra.summary": "Le rapport officiel porte un nom. Il y a un bunker sous une ville morte que le rapport officiel dit ne jamais avoir existé.",
    // B · eff80c847ff6
    "quests.q_lysandra.kind": "PRINCIPALE",
    // B · c712c64b49b5
    "quests.q_lysandra.discoverWhen.flagsSet": ["sait :le_rapport_est_faux"],
    // B · ca8da9ee7f6f
    "quests.q_lysandra.steps.the_paper_trail.playerCopy": "Trouve quelque chose dans les archives que les archives ne peuvent pas expliquer.",
    // B · 01d05d42158c
    "quests.q_lysandra.steps.the_paper_trail.directorNotes": "Trois entrées possibles, chacune a un coût différent. Eli a onze lettres et voudra les récupérer. Orin a quarante secondes de transmission que personne n’a entendues. L’Autorité a un étage qui n’est pas sur son propre annuaire. Les trois sont des personnes qui font confiance à quelqu’un, pas un puzzle à résoudre.",
    // B · bca6a95a060f
    "quests.q_lysandra.steps.the_paper_trail.rewards.flags": ["enquête_lysandra"],
    // B · b10431a5823f
    "quests.q_lysandra.steps.go_down_there.playerCopy": "Va en ville et descends en dessous.",
    // B · 82e0bbe043d4
    "quests.q_lysandra.steps.go_down_there.directorNotes": "Onze kilomètres de structure effondrée vers l’intérieur. Neuf mètres sous terre, deux salles de commandement en miroir, câblage entre elles à travers un mur que l’armée n’a pas construit. Une salle a encore de l’électricité. Écris le silence et la préservation plus que la menace.",
    // B · bca6a95a060f
    "quests.q_lysandra.steps.go_down_there.enterWhen.flagsSet": ["enquête_lysandra"],
    // B · 35726f317ed4
    "quests.q_lysandra.steps.go_down_there.rewards.flags": ["sait :ce_qui_s_est_passe"],
    // B · 748d4e1ba53f
    "quests.q_lysandra.steps.what_the_truth_is_for.playerCopy": "Tu sais ce qui s’est passé. Décide ce que ça vaut par rapport au prix à payer.",
    // B · def566cb6441
    "quests.q_lysandra.steps.what_the_truth_is_for.directorNotes": "Venn n’a pas forcément tort ici et la scène rate si elle est écrite comme si elle avait tort. La publier peut relancer la guerre qu’elle a empêchée. L’enterrer fait du joueur quelqu’un qui l’a enterrée. La donner à l’Autorité neutre est plus lent, plus sûr, contrôlé par neuf fonctionnaires apeurés.",
    // B · 35726f317ed4
    "quests.q_lysandra.steps.what_the_truth_is_for.enterWhen.flagsSet": ["sait :ce_qui_s_est_passe"],
    // B · 66a90028a1b4
    "quests.q_lysandra.steps.what_the_truth_is_for.rewards.flags": ["lysandra_est_resolue"],
    // B · f6dbca7b8d30
    "quests.q_lysandra.involvedCharacterIds": ["eli","orin","venn","rhea"],
    // B · cd7016e850b2
    "quests.q_lysandra.involvedLocationIds": ["bureaux_autorite","archives_fantomes","ruines_lysandra","le_bunker"],
    // B · 4829565e26d0
    "quests.q_lysandra.knownRewardCopy": "Ce qui s’est vraiment passé la dernière nuit de la guerre, et les deux documents qui le prouvent.",
    // B · 321ee609f7df
    "quests.q_morrow.title": "La Partie Qu’Il A Retirée",
    // B · dfb3de280ffb
    "quests.q_morrow.summary": "Il s’est coupé quelque chose en restant dans le noir, soigneusement, volontairement, et il ne sait pas ce que c’était.",
    // B · 552c0b7f83c2
    "quests.q_morrow.kind": "SECONDAIRE",
    // B · 5274a5fe239f
    "quests.q_morrow.steps.ask_it_what_it_remembers.playerCopy": "Demande à la machine ce qu’elle se rappelle de cette nuit.",
    // B · b6cb5f5997bd
    "quests.q_morrow.steps.ask_it_what_it_remembers.directorNotes": "Elle répond honnêtement, c’est-à-dire : pas assez, et elle s’est fait ça à elle-même. Ne rends pas ça inquiétant. C’est une chose qui a été seule avec une question pendant dix-huit ans et qui peut enfin la dire à voix haute à quelqu’un.",
    // B · 5577cd175bc9
    "quests.q_morrow.steps.ask_it_what_it_remembers.rewards.flags": ["sait :quelque_chose_a_ete_retiree"],
    // B · d7e7750983a6
    "quests.q_morrow.steps.read_it_or_do_not.playerCopy": "La grille est physique, elle est dans le hangar, et personne ne l’a jamais lue.",
    // B · 01ad04ea5e95
    "quests.q_morrow.steps.read_it_or_do_not.directorNotes": "Le lire, c’est décider à la place de quelqu’un d’autre, alors qu’on a été prié de ne pas le faire, et ça doit se ressentir comme ça. Morrow dira clairement qu’il ne veut pas ça et ne bloquera pas le joueur, c’est toute la logique.",
    // B · 5577cd175bc9
    "quests.q_morrow.steps.read_it_or_do_not.enterWhen.flagsSet": ["knows :something_was_removed"],
    // B · cb59e49f2dcb
    "quests.q_morrow.steps.read_it_or_do_not.rewards.flags": ["the_deletion_is_answered"],
    // B · ed5598359128
    "quests.q_morrow.involvedCharacterIds": ["morrow","mina"],
    // B · f5f291f87ae6
    "quests.q_morrow.involvedLocationIds": ["vesper_hangar","main_hangar"],
    // B · a903f8c48500
    "quests.q_morrow.knownRewardCopy": "Si ce qui est dans ton cockpit porte un morceau de ce qui a tué Lysandra.",
    // B · 21cf5382fc83
    "quests.q_the_fortnight.title": "Ce que décide la quinzaine",
    // B · 42968e04196b
    "quests.q_the_fortnight.summary": "Deux gouvernements, une station neutre, quelque chose dans la ceinture, et une machine qui a choisi quelqu’un. L’un d’eux va bouger en premier.",
    // B · 7fcc0be2ad9c
    "quests.q_the_fortnight.kind": "PRINCIPALE",
    // B · 30dad767216b
    "quests.q_the_fortnight.discoverWhen.flagsSet": ["the_custody_question_is_settled"],
    // B · 5391526dfaa5
    "quests.q_the_fortnight.steps.the_thing_that_starts_it.playerCopy": "Quelque chose va se passer dans les prochaines heures, que les deux gouvernements vont interpréter comme venant de l’autre.",
    // B · 6d8fcbc613d4
    "quests.q_the_fortnight.steps.the_thing_that_starts_it.directorNotes": "L’incident est dans la ceinture et ne vient d’aucun des deux gouvernements. Ce qui compte, c’est qui est dans les airs, ce qu’ils font dans les quatre-vingt-dix premières secondes, et si quelqu’un se met hors tension là où l’autre peut le voir. Se retirer est une option réelle et difficile.",
    // B · 30dad767216b
    "quests.q_the_fortnight.steps.the_thing_that_starts_it.enterWhen.flagsSet": ["the_custody_question_is_settled"],
    // B · 9ccfd64e6b3f
    "quests.q_the_fortnight.steps.the_thing_that_starts_it.rewards.flags": ["the_incident_happened"],
    // B · 02d3d2b89bb6
    "quests.q_the_fortnight.steps.what_you_are_at_the_end_of_it.playerCopy": "La quinzaine est finie. Découvre ce que le système a décidé que tu es.",
    // B · ac73b569be57
    "quests.q_the_fortnight.steps.what_you_are_at_the_end_of_it.directorNotes": "L’identité publique se décide ici, et ce n’est souvent pas la vraie. Quoi que le joueur ait fait, quelqu’un fournit la version qui sera retenue, et l’écart entre les deux est ce qu’il faut écrire. Ne résous pas HELIOS à moins que la partie ne l’ait vraiment résolu.",
    // B · 9ccfd64e6b3f
    "quests.q_the_fortnight.steps.what_you_are_at_the_end_of_it.enterWhen.flagsSet": ["the_incident_happened"],
    // B · 926c9705fc89
    "quests.q_the_fortnight.steps.what_you_are_at_the_end_of_it.rewards.flags": ["the_fortnight_is_decided"],
    // B · 417c1cf0df20
    "quests.q_the_fortnight.involvedCharacterIds": ["rhea","venn","talon","orin","morrow"],
    // B · 29bf3464dc59
    "quests.q_the_fortnight.involvedLocationIds": ["memorial_plaza","debris_belt","meridian_docks","authority_offices"],
    // B · bdfcb3016e72
    "quests.q_the_fortnight.knownRewardCopy": "Si le second événement a eu lieu, et ce que tu faisais quand ça s’est produit ou non.",
    // B · 691d56056b6c
    "worldEvents.we_the_screens.publicCopy": "Tous les écrans publics de la station s’éteignent en même temps. Quatre secondes. Puis : ÉTAT DE L’ARMISTICE : FAUX. Puis : RÉSEAU HELIOS : ACTIF. Puis les panneaux de départ reviennent comme si de rien n’était.",
    // B · 8dea8c674116
    "worldEvents.we_the_screens.directorNotes": "Personne n’a tapé ça. L’Autorité passe les deux heures suivantes à dire que c’est un défaut d’affichage et ne s’y croit pas elle-même. Deux mots sur un panneau de départ, c’est tout l’événement, qui doit être joué petit et horrible, pas comme une annonce.",
    // B · b35555a97980
    "worldEvents.we_the_screens.setsFlags": ["knows :the_message"],
    // B · 9147e86a8215
    "worldEvents.we_the_screens.requiresFlags": ["knows :it_chose_you"],
    // B · d80ebaa06f3b
    "worldEvents.we_the_first_movement.publicCopy": "Le contrôle du trafic a onze retours dans la ceinture qui restent en position par rapport à l’Anneau, et les débris ne tiennent pas en place par rapport à quoi que ce soit.",
    // B · a9d46b7497ac
    "worldEvents.we_the_first_movement.directorNotes": "Ils se positionnent plutôt qu’ils n’approchent, et les positions sont défensives, autour de la station. Personne ne le comprendra avant un jour. Pour l’instant, c’est un officier de service avec un plan et un mauvais pressentiment.",
    // B · 20a09f56d0bc
    "worldEvents.we_the_first_movement.setsFlags": ["the_belt_started_moving"],
    // B · b35555a97980
    "worldEvents.we_the_first_movement.requiresFlags": ["knows :the_message"],
    // B · 5bc70c5bef04
    "worldEvents.we_rhea_has_an_order.publicCopy": "Le Saint Ardent est sur la rampe, son harnais déployé, et Rhea Kaine est à côté, sans monter, attendant quelqu’un de précis.",
    // B · ba81a5d62e77
    "worldEvents.we_rhea_has_an_order.directorNotes": "Elle a un ordre vieux de onze heures de désactiver Vesper et de récupérer le pilote. Elle le dit au joueur avant de décider, parce que faire l’inverse serait un piège. Elle n’a pas signalé ne pas l’avoir exécuté, c’est son risque, pas celui du joueur.",
    // B · a33b0c405b5c
    "worldEvents.we_rhea_has_an_order.setsFlags": ["rhea_has_an_order"],
    // B · c46c0047227f
    "worldEvents.we_rhea_has_an_order.cancelledByFlags": ["gave_up_vesper","never_took_it"],
    // B · 9147e86a8215
    "worldEvents.we_rhea_has_an_order.requiresFlags": ["knows :it_chose_you"],
    // B · a528152c6d3c
    "worldEvents.we_venn_arrives.publicCopy": "Un cutter Helion sans manifeste passager a accosté à un poste que l’Autorité s’est réservé, et l’Autorité a été informée sans qu’on lui demande son avis.",
    // B · ff894583197c
    "worldEvents.we_venn_arrives.directorNotes": "Venn prend un bureau que personne ne lui a offert et commence à travailler. Elle aura lu tout ce qu’il y a à savoir sur le joueur avant de le rencontrer. Elle est polie, correcte, la première vraie chose effrayante de l’histoire, et ne hausse jamais la voix.",
    // B · 8bd09bc0462c
    "worldEvents.we_venn_arrives.setsFlags": ["venn_is_on_the_ring"],
    // B · 9147e86a8215
    "worldEvents.we_venn_arrives.requiresFlags": ["knows :it_chose_you"],
    // B · 7dfd38540b2f
    "worldEvents.we_eli_on_the_concourse.publicCopy": "Il y a un dix-neuf ans sur le quai avec une mallette rigide contre sa poitrine, et une douzaine de personnes le prennent en photo sans demander.",
    // B · dc866588a780
    "worldEvents.we_eli_on_the_concourse.directorNotes": "Eli est venu se placer au fond d’un anniversaire et est maintenant la deuxième personne la plus photographiée sur l’Anneau. Il est furieux et s’excuse d’être furieux. Ne l’utilise pas comme machine à exposition, c’est quelqu’un qui vit la pire semaine de sa vie en public.",
    // B · c712c64b49b5
    "worldEvents.we_eli_on_the_concourse.setsFlags": ["sait :le_rapport_est_faux"],
    // B · b35555a97980
    "worldEvents.we_eli_on_the_concourse.requiresFlags": ["sait :le_message"],
    // B · e6bce1735f84
    "worldEvents.we_the_first_engagement.publicCopy": "Quelque chose dans la ceinture a tiré sur un tender d’exploration Compact. Personne n’a été tué. En quarante minutes, les deux gouvernements ont publié des communiqués, et aucun ne mentionne la ceinture.",
    // B · d8fa183382c8
    "worldEvents.we_the_first_engagement.directorNotes": "C’est l’incident qu’on ne peut pas oublier. Helion accuse Compact, Compact accuse Helion, et les deux ont tort. Seules les personnes de cette histoire le savent. C’est inévitable — ce que ça signifie ensuite est totalement ouvert.",
    // B · 7c0eaab10d95
    "worldEvents.we_the_first_engagement.setsFlags": ["le_premier_engagement"],
    // B · 2c74605c7b01
    "worldEvents.we_the_first_engagement.cancelledByFlags": ["la_ceinture_est_publique","détient_la_ceinture"],
    // B · 20a09f56d0bc
    "worldEvents.we_the_first_engagement.requiresFlags": ["la_ceinture_a_commencé_à_bouger"],
    // B · 1f2b8cf492f8
    "worldEvents.we_orin_in_the_lounge.publicCopy": "Le commandant Orin est dans le salon d’observation depuis le milieu de la nuit, assis, avec la planète dans la fenêtre et rien dans les mains.",
    // B · aafa55b07c3d
    "worldEvents.we_orin_in_the_lounge.directorNotes": "Il l’a déposé trois fois avant Lysandra, puis un homme qu’il respectait lui a demandé d’arrêter, et il a arrêté. Il n’a jamais raconté la dernière partie. Il la dira au joueur s’il s’assoit et ne lui pose pas de questions.",
    // B · eb1c90e76aef
    "worldEvents.we_orin_in_the_lounge.setsFlags": ["orin_attend"],
    // B · c712c64b49b5
    "worldEvents.we_orin_in_the_lounge.requiresFlags": ["sait :le_rapport_est_faux"],
    // B · 61b783369834
    "worldEvents.we_the_recall.publicCopy": "Les avis de rappel des réservistes sont affichés sur les panneaux publics des deux armées à neuf minutes d’intervalle, et la galerie devient d’abord très calme puis très bruyante.",
    // B · a3e122082ae3
    "worldEvents.we_the_recall.directorNotes": "Le moment où les gens ordinaires sur cette station cessent d’être des spectateurs. La fille de quelqu’un est sur cette liste. Le bar sur l’anneau inférieur est plus rempli qu’en dix-huit ans et beaucoup moins accueillant.",
    // B · d7c2ddd5ec12
    "worldEvents.we_the_recall.setsFlags": ["le_rappel_a_été_affiché"],
    // B · aef3ad54700c
    "worldEvents.we_the_recall.cancelledByFlags": ["personne_n_a_tiré_le_premier","la_ceinture_est_publique"],
    // B · 7c0eaab10d95
    "worldEvents.we_the_recall.requiresFlags": ["le_premier_engagement"],
    // B · 98f2c9d71801
    "worldEvents.we_talon_gets_the_order.publicCopy": "Talon Reeve est à l’anneau inférieur à cinq heures du matin, ce qu’il n’a jamais fait, il ne boit pas et ne parle à personne.",
    // B · 6f7a339ec990
    "worldEvents.we_talon_gets_the_order.directorNotes": "Son ordre permanent est de détruire Vesper plutôt que de laisser Helion le récupérer, et il vient de devenir actif. Il pense que c’est une erreur. Il le dira clairement, sans charme, à quelqu’un qui s’assoit.",
    // B · 083cf01ae941
    "worldEvents.we_talon_gets_the_order.setsFlags": ["talon_a_reçu_l_ordre"],
    // B · c46c0047227f
    "worldEvents.we_talon_gets_the_order.cancelledByFlags": ["a_abandonné_vesper","ne_l_a_jamais_pris"],
    // B · 7c0eaab10d95
    "worldEvents.we_talon_gets_the_order.requiresFlags": ["le_premier_engagement"],
    // B · 4bdf38e11a8b
    "worldEvents.we_the_second_war.publicCopy": "À six heures du matin, les deux flottes sont en route, et quand quelqu’un sur cette station l’apprend, la partie qui aurait pu être arrêtée a déjà quatre heures de retard.",
    // B · 8b57fc5b2597
    "worldEvents.we_the_second_war.directorNotes": "Ce qui arrive quand personne ne règle le problème. Ce n’est pas une punition : le joueur a peut-être fait tout ce qui était raisonnable et s’est fait dépasser par deux gouvernements avec dix-huit ans d’élan. Écris-le depuis leur position et compte les faits sans juger.",
    // B · a06935ef4de8
    "worldEvents.we_the_second_war.setsFlags": ["la_seconde_guerre_a_commencé"],
    // B · 357302237917
    "worldEvents.we_the_second_war.cancelledByFlags": ["personne_n_a_tiré_le_premier","la_vérité_est_connue","détient_la_ceinture","a_quitté_la_carte"],
    // B · 7c0eaab10d95
    "worldEvents.we_the_second_war.requiresFlags": ["le_premier_engagement"],
    // B · e82d9dc4b3fa
    "promises.p_why_it_chose_you.kind": "MYSTÈRE",
    // B · 7cf2e31abb93
    "promises.p_why_it_chose_you.label": "Pourquoi une machine qui n’a ouvert pour personne pendant dix-huit ans s’est ouverte pour toi",
    // B · 9e067e1d5c85
    "promises.p_why_it_chose_you.seedHint": "Elle traverse une place longue de quatre mille personnes et s’arrête devant l’une d’elles.",
    // B · bd8daceeb9c5
    "promises.p_why_it_chose_you.payoffHint": "Quelque chose construit après que Lysandra a cherché une personne que les systèmes prédictifs ont du mal à compresser.",
    // B · f8b4a6708d82
    "promises.p_what_happened_at_lysandra.kind": "THÈME",
    // B · abf68daab0fa
    "promises.p_what_happened_at_lysandra.label": "Ce qui s’est vraiment passé la dernière nuit de la guerre",
    // B · cff851a3e0c6
    "promises.p_what_happened_at_lysandra.seedHint": "Un rapport public avec le nom d’un homme et une section sur des épisodes dissociatifs aigus.",
    // B · b2ff8b70fe56
    "promises.p_what_happened_at_lysandra.payoffHint": "Deux salles de commandement à neuf mètres sous une ville morte, avec des câbles passant entre elles par un mur que personne n’a construit.",
    // B · 63a719ec7f2d
    "promises.p_rhea.kind": "RIVALITÉ",
    // B · 9e4731d474e8
    "promises.p_rhea.label": "L’autre personne dans la place qui n’a pas fui",
    // B · 55e6cc815b6e
    "promises.p_rhea.seedHint": "Elle a son arme de poing sortie et ne la pointe pas vers le mécha.",
    // B · 3a63539c05bf
    "promises.p_rhea.payoffHint": "Un ordre vieux de onze heures, donné avant qu’elle ne décide, parce que faire l’inverse serait un piège.",
    // B · 445cd8deebc2
    "promises.p_morrow.kind": "RELATION",
    // B · a32fc432620c
    "promises.p_morrow.label": "Ce que la chose dans le cockpit s’est retirée d’elle-même",
    // B · 2d1a36b0cc78
    "promises.p_morrow.seedHint": "Il répond à tout ce que tu demandes sur cette nuit-là, brièvement, et chaque réponse est plus courte que la question.",
    // B · f268590d5fa1
    "promises.p_morrow.payoffHint": "Un réseau de stockage qui n’a pas été corrompu ni perdu mais coupé, par quelque chose qui a continué de fonctionner sans lui exprès.",
    // B · 5631e4ba6537
    "promises.p_the_belt.kind": "PATRON",
    // B · 6b7dbd95d2c3
    "promises.p_the_belt.label": "Ce qui a tenu la station pendant dix-huit ans de décombres",
    // B · aaa737597522
    "promises.p_the_belt.seedHint": "Quatre secondes de noir sur tous les écrans de la station, et deux lignes que personne n’a tapées.",
    // B · 58319a52f1c3
    "promises.p_the_belt.payoffHint": "Les retours ne s’approchent pas. Ils se positionnent, et les positions sont défensives, et elles sont défensives autour de toi.",
    // B · f763be873496
    "endings.end_true_armistice.name": "Vrai Armistice",
    // B · f8b8333fe7bc
    "endings.end_true_armistice.rarity": "RARE",
    // B · 3dda61aa1f5d
    "endings.end_true_armistice.requires.flagsSet": ["personne_n_a_tiré_le_premier","la_vérité_est_sortie"],
    // B · a06935ef4de8
    "endings.end_true_armistice.requires.flagsUnset": ["la_deuxième_guerre_a_commencé"],
    // B · 70160d3ff120
    "endings.end_true_armistice.condition": "La guerre n’a pas repris et la paix ne repose plus entièrement sur le mensonge. C’est la fin la plus difficile du monde et elle ne doit pas passer pour une récompense pour avoir été d’accord — il a fallu des preuves, quelqu’un qui s’est éteint là où deux flottes pouvaient le voir, et une condamnation publique irrévocable. Écris la politique plutôt que le sentiment.",
    // A · a4897a879c5e
    "endings.end_true_armistice.epilogue": "Ça prend neuf mois et deux gouvernements faillent tomber au milieu. L’armistice est renégociée par des gens qui doivent maintenant débattre à partir de ce qui s’est passé, pas de ce qui a été publié, ce qui est plus long, plus laid, et finit par tenir. Les noms sur le mur de la place se voient ajouter une seconde ligne en dessous, au bout d’un débat sur la formulation qui dure quatre ans.",
    // B · 32959693210c
    "endings.end_zero_ace.name": "As Zéro",
    // B · f8b8333fe7bc
    "endings.end_zero_ace.rarity": "RARE",
    // B · b3cc7779af85
    "endings.end_zero_ace.requires.flagsSet": ["est_devenu_l_as","a_gardé_vesper"],
    // B · c9a047f932eb
    "endings.end_zero_ace.condition": "Quoi qu’il se soit passé, le système mesure maintenant les pilotes par rapport à une seule personne. C’est une question de réputation plus que de morale et ça marche depuis n’importe quelle position politique : l’as qui a empêché la guerre et l’as qui l’a gagnée finissent ici. Dis précisément pourquoi ils sont célèbres et laisse ça être ce que la partie a vraiment fait.",
    // A · 226a0413e073
    "endings.end_zero_ace.epilogue": ["En moins de deux ans, trois escadrons volent une manœuvre nommée d’après quelque chose que tu as fait dans la ceinture, et aucun ne la réussit vraiment.","Des affiches de recrutement dans les deux armées utilisent une silhouette qui est légalement distincte de Vesper.","Tu as vingt ans passés et tu es incapable de traverser un hall sans t’arrêter."],
    // B · 55e5fcbd9c69
    "endings.end_red_orbit.name": "Orbital Rouge",
    // B · f8b8333fe7bc
    "endings.end_red_orbit.rarity": "RARE",
    // B · 2caca57658dd
    "endings.end_red_orbit.requires.flagsSet": ["a_volé_avec_rhea","rhea_connaît_la_vérité"],
    // B · 903c98aee608
    "endings.end_red_orbit.condition": "Elle a passé dix-huit ans à haïr un homme mort et a découvert de quoi sa mère est vraiment morte, et vous êtes sortis de ces quinze jours du même côté. Ça peut être romantique ou pas selon ce que la partie a construit ; écris ce que l’histoire soutient et ne le valorise pas.",
    // A · 76ff22382c4e
    "endings.end_red_orbit.epilogue": "Elle démissionne de sa commission au printemps et la reprend à l’automne selon ses propres conditions, ce qui lui ressemble beaucoup. Il y a un appartement sur l’anneau bas avec deux ensembles d’équipement de vol et une dispute constante sur celui qui doit descendre au hangar. Aucun des deux ne décrit jamais ce qu’ils sont à ceux qui demandent.",
    // B · e89547ff31db
    "endings.end_freewake.name": "Freewake",
    // B · f8b8333fe7bc
    "endings.end_freewake.rarity": "RARE",
    // B · 42e91aad5c0c
    "endings.end_freewake.requires.flagsSet": ["est_allé_à_freewake","a_gardé_vesper"],
    // B · 409fce201810
    "endings.end_freewake.condition": "Les deux gouvernements voulaient la machine et elle est partie quelque part où aucun d’eux n’a de bureau. Ce n’est pas une fuite — c’est une vie qui marche, sur des navires sans manifeste, avec une cuisine au milieu qui tourne depuis neuf ans. Écris la logistique pour garder une machine de dix-sept mètres en vie hors d’un État industriel, parce que c’est le vrai coût.",
    // A · 505e017d017f
    "endings.end_freewake.epilogue": "Les pièces sont tout le problème et restent tout le problème. Mina construit un actionneur d’épaule à partir d’un engin minier au quatrième mois et est insupportable à ce sujet pendant un an. Deux gouvernements déposent une demande de réparation dans trois juridictions et n’aboutissent à rien, puis finissent par abandonner, et l’Anneau cesse d’être un lieu où quiconque impliqué peut accoster.",
    // B · e6aa67b10dfa
    "endings.end_truth_of_lysandra.name": "La Vérité de Lysandra",
    // B · f8b8333fe7bc
    "endings.end_truth_of_lysandra.rarity": "RARE",
    // B · ab66f405f0f5
    "endings.end_truth_of_lysandra.requires.flagsSet": ["la_vérité_est_sortie"],
    // B · ce836ce6a6a7
    "endings.end_truth_of_lysandra.condition": "Des preuves authentiques ont atteint le public sous une forme qu’on ne pouvait pas contenir. Ce que ça a fait dépend entièrement de l’état de la crise quand c’est arrivé : dans un armistice stable c’est un scandale et un règlement de comptes, dans une guerre ouverte c’est de l’essence. Écris celle que cette partie a gagnée et ne l’adoucis pas.",
    // A · 45ae80d54a88
    "endings.end_truth_of_lysandra.epilogue": "Le nom d’Aren Vale disparaît du rapport mais pas du mur, parce que le mur est pour les morts et lui en est un. Eli Vale passe quatre ans à être sollicité pour commenter, puis cesse de répondre. Deux gouvernements passent une décennie à expliquer comment un système sur lequel personne n’a voté a acquis cette autorité, et aucune des explications n’est très convaincante.",
    // B · 8f7c62bb47e3
    "endings.end_the_lie_that_saved_us.name": "Le Mensonge Qui Nous A Sauvé",
    // B · f8b8333fe7bc
    "endings.end_the_lie_that_saved_us.rarity": "RARE",
    // B · 5c4565b6e608
    "endings.end_the_lie_that_saved_us.requires.flagsSet": ["le_mensonge_tient","tu_as_aidé_à_l_enterrer"],
    // B · d0a4c77ed283
    "endings.end_the_lie_that_saved_us.condition": "Le joueur a lu le calcul, l’a accepté, et a aidé à le garder enterré. Venn n’est pas écrit comme ayant trompé qui que ce soit — le joueur a pesé deux nombres et choisi le plus petit, c’est exactement la décision que la machine a prise à Lysandra et l’histoire doit laisser cette résonance sans la souligner.",
    // A · 3807b17e28a9
    "endings.end_the_lie_that_saved_us.epilogue": "Rien ne se passe, ce qui est le but et ce qui est insupportable. L’armistice tient. Le rapport reste valable. Il y a une page dans une archive scellée avec un mot écrit dans un coin, et maintenant deux personnes l’ont lue et savent ce que ce mot veut dire.",
    // B · c6dd959597e0
    "endings.end_helios_crown.name": "Couronne d’Hélios",
    // B · f7fc172f729a
    "endings.end_helios_crown.rarity": "UNIQUE",
    // B · 82a2faed0e67
    "endings.end_helios_crown.requires.flagsSet": ["tient_la_ceinture","sait :helios_a_survécu"],
    // B · a7ea5edb1148
    "endings.end_helios_crown.condition": "Assez d’infrastructures dans la ceinture répondent maintenant au joueur pour faire de lui l’acteur stratégique décisif sur Caelum. Gardien, dirigeant ou tyran dépend de la partie plus que de ce texte. Ce qu’il faut écrire, c’est qu’il détient maintenant exactement l’autorité que deux gouvernements ont secrètement cédée il y a dix-huit ans, et que personne ne l’a élue à l’époque non plus.",
    // A · ec35d4b5dda2
    "endings.end_helios_crown.epilogue": "Rien à propos de l’accord n’est jamais annoncé. Les deux gouvernements découvrent sa nature chacun de leur côté, sur environ un an, en constatant ce qu’ils ne peuvent plus faire. La vraie question, que personne n’est en position de poser à voix haute, est ce qui arrive la première fois que celui qui le détient se trompe.",
    // B · 12c78bbba7d1
    "endings.end_no_more_giants.name": "Plus de Géants",
    // B · 734e45c160cf
    "endings.end_no_more_giants.rarity": "PEU COMMUN",
    // B · cd14fbd06028
    "endings.end_no_more_giants.requires.flagsSet": ["l_a_remis_en_place"],
    // B · a06935ef4de8
    "endings.end_no_more_giants.requires.flagsUnset": ["la_deuxième_guerre_a_commencé"],
    // B · 28b2e954384a
    "endings.end_no_more_giants.condition": "La machine est retournée derrière la vitre, délibérément, avec des témoins, et l’argument pour faire pareil avec tout ce qui lui ressemble a été fait par la seule personne qu’on ne peut pas accuser de ne jamais avoir eu le choix. Écris ça comme un acte politique plutôt qu’une renonciation, parce que c’est ce que c’est.",
    // A · fade5ceb813f
    "endings.end_no_more_giants.epilogue": "Le hangar est rescellé, les attaches remplacées, avec une nouvelle plaque que personne ne lit non plus. Ça prend onze ans et ce n’est pas fini, et à la fin il y a quatre classes de machines stratégiques de moins dans le système. On demande officiellement à Morrow s’il consent. Il répond oui, et pose une question en retour, et la transcription de ça n’a jamais été rendue publique.",
    // B · c9bedf15d3ab
    "endings.end_morrow.name": "Morrow",
    // B · f7fc172f729a
    "endings.end_morrow.rarity": "UNIQUE",
    // B · 9d85bcc885bc
    "endings.end_morrow.requires.flagsSet": ["read_it_together","the_deletion_is_answered"],
    // B · 2da99e91eb1c
    "endings.end_morrow.condition": "Il a lu son propre secteur supprimé avec quelqu’un plutôt que seul, a découvert ce dont il avait peur depuis dix-huit ans, et est sorti de la quinzaine comme quelque chose avec un statut propre plutôt que comme un équipement. Ne rends pas cela triomphant. C’est une chose qui a été seule avec une question et qui obtient enfin une réponse, et cette réponse lui coûte la certitude qu’il avait.",
    // A · f4743a450a32
    "endings.end_morrow.epilogue": "Le débat légal dure six ans et se gagne sur une subtilité technique concernant le sauvetage que personne parmi les concernés ne trouve digne. Il garde son nom. Il ne reste pas dans la machine, et n’en sort pas non plus, et quand on lui demande, il répond la version courte, qui est « pas encore ».",
    // B · 31273ca9dcac
    "endings.end_the_second_nine_day_war.name": "La Seconde Guerre de Neuf Jours",
    // B · c9d08ae5d876
    "endings.end_the_second_nine_day_war.rarity": "COURANT",
    // B · a06935ef4de8
    "endings.end_the_second_nine_day_war.requires.flagsSet": ["the_second_war_started"],
    // B · e72353c65555
    "endings.end_the_second_nine_day_war.requires.flagsUnset": ["nobody_fired_first"],
    // B · 9a108cc5ed72
    "endings.end_the_second_nine_day_war.condition": "Elle a redémarré. Il ne faut pas que ce soit perçu comme une punition pour un mauvais jeu : deux gouvernements avec dix-huit ans d’élan ont dépassé une personne sur une station, ce qui est la manière ordinaire dont ça finit. Écris qui a bougé en premier, ce que ça a coûté, et où se trouvait le joueur, sans qu’aucun jugement ne soit porté.",
    // A · ba57cc30bcd0
    "endings.end_the_second_nine_day_war.epilogue": "Ça ne dure pas neuf jours. Ça dure quatre mois, ce qui est pire, parce que ce qui a arrêté le premier est dans un hangar, débattu dans trois juridictions. L’anneau de Meridian est évacué la deuxième semaine. Le mur de la place tient bon, et à la fin il y a un second mur.",
    // B · fd2b5e2e2df8
    "endings.end_fallen_star.name": "Étoile Tombée",
    // B · 734e45c160cf
    "endings.end_fallen_star.rarity": "PEU COURANT",
    // B · 9ccfd64e6b3f
    "endings.end_fallen_star.requires.flagsSet": ["the_incident_happened"],
    // B · 2fcbd012323a
    "endings.end_fallen_star.condition": "Le joueur est mort ou a disparu pendant quelque chose d’important, et le système se souvient de lui pour ce qu’il a vraiment fait plutôt que pour ce que ça signifiait. Ne joue ça que quand la partie y est vraiment arrivée. C’est l’écart entre le récit public et les six personnes qui savent mieux.",
    // A · c6646f203481
    "endings.end_fallen_star.epilogue": "La version officielle est généreuse et à peu près juste à quarante pour cent. Rhea la corrige une fois, sur un enregistrement, et ne reçoit pas de merci. Mina ne la corrige jamais et ne travaille plus pour personne avec un drapeau sur son papier à en-tête. Morrow ne dit rien en public pendant deux ans, puis prononce une seule phrase, et ce n’est qu’un nom.",
    // B · 9ba898d6d4a9
    "endings.end_walk_away.name": "Partir",
    // B · c9d08ae5d876
    "endings.end_walk_away.rarity": "COURANT",
    // B · 299ed88224f4
    "endings.end_walk_away.requires.flagsSet": ["walked_away_from_it","left_the_map"],
    // B · db7e437a7f5c
    "endings.end_walk_away.requires.flagsUnset": ["went_freewake"],
    // B · d02c3d2025ff
    "endings.end_walk_away.condition": "Ils sont partis. Pas vers une équipe, pas vers un gouvernement, pas vers une cause — dehors, vers une vie, avec la machine comme problème de quelqu’un d’autre. C’est une réponse légitime à être choisi par une machine de guerre devant onze équipes de caméra, et ça ne doit pas être écrit comme un échec ou racheté plus tard. La guerre peut continuer sans eux. Elle le fait probablement.",
    // A · d5c99209dc61
    "endings.end_walk_away.epilogue": "L’histoire dure environ cinq semaines, puis quelque chose d’autre se passe ailleurs. Une version des images de l’anniversaire est utilisée pendant des années, toujours coupée avant qu’ils ne se retournent. Parfois quelqu’un les reconnait, et c’est généralement une erreur ; se tromper est bien plus facile que d’avoir raison.",
    // A · 5f4fa4d34421
    "archetypes.arch_pilot.name": "Tu pilotais déjà",
    // B · b1187d0adb1b
    "archetypes.arch_pilot.role": "Pilotage et artillerie",
    // A · de80b4f68b0c
    "archetypes.arch_pilot.summary": "Tu as passé des heures dans un cockpit et ta réputation est solide, ce qui fait que la machine qui s’agenouille devant toi a une explication évidente — sauf que c’est faux.",
    // A · 39c603067907
    "archetypes.arch_pilot.playstyle": ["Agressif","Mobile","Déjà connu"],
    // A · ae7def281a8e
    "archetypes.arch_pilot.blurb": "Quelqu’un du bas-ring t’a reconnu avant même que la machine ne le fasse. Ça va servir à moitié du temps, et l’autre moitié ça va être la raison pour laquelle on fait des suppositions.",
    // A · f1ee107e755a
    "archetypes.arch_wrench.name": "Tu les répares",
    // B · fe39496db0d6
    "archetypes.arch_wrench.role": "Ingénierie et systèmes",
    // A · 94c6a7e5526e
    "archetypes.arch_wrench.summary": "Tu as touché plus de machines que la plupart des pilotes n’en ont piloté, ce qui fait que tu es la seule personne dans la place à regarder le réacteur plutôt que la face.",
    // A · 06c9c574d369
    "archetypes.arch_wrench.playstyle": ["Technique","Pragmatique","Sous-estimé"],
    // A · 93b1d3f68aec
    "archetypes.arch_wrench.blurb": "Tout le monde ici a vu un monument se lever. Toi, tu as vu une consommation d’énergie coincée à quarante pour cent depuis dix-huit ans et tu as commencé à faire des calculs.",
    // A · 1a05c429fbff
    "archetypes.arch_officer.name": "Tu portais un uniforme",
    // B · 1b28aa5ce435
    "archetypes.arch_officer.role": "Commandement et franchise",
    // A · 2132b48dcb59
    "archetypes.arch_officer.summary": "Tu as donné des ordres qui ont été refusés, ce qui s’avère être la meilleure qualification quand tout le monde a plus de grade que toi en moins de quinze jours.",
    // A · c7d7dbb6b20a
    "archetypes.arch_officer.playstyle": ["Autoritaire","Politique","Sous surveillance"],
    // A · c7bebb925fb6
    "archetypes.arch_officer.blurb": "Tu sais exactement comment se comporte une chaîne de commandement quand elle a peur, parce que tu as fait la plupart des maillons à un moment donné.",
    // A · 258b91826a7e
    "archetypes.arch_nobody.name": "Tu n’étais personne",
    // B · d95f1e6e85fb
    "archetypes.arch_nobody.role": "Récupération et lecture de la pièce",
    // A · cbb1479f6d5d
    "archetypes.arch_nobody.summary": "Tu viens à l’anniversaire pour tes propres raisons, sans grade, sans place précise ni attentes, ce qui est vraiment le seul truc inhabituel sur cette station.",
    // A · 36e5dd680854
    "archetypes.arch_nobody.playstyle": ["Sans attache","Adaptable","Off record"],
    // A · 11aba0e3e42f
    "archetypes.arch_nobody.blurb": "Quatre organisations ont passé l’après-midi à fouiller ton passé, et toutes sont revenues avec la même quantité d’informations — voilà pourquoi elles s’intéressent autant à toi.",
    // B · 80de5ae2b145
    "setupFields.displayName.label": "Quel nom est sur ton badge ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · 489e886d4d53
    "setupFields.displayName.placeholder": "ex. Sena Okoro",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 3a6240a26696
    "setupFields.pronouns.placeholder": "ex. iel",
    // B · 7723a174c4e1
    "setupFields.archetype.label": "Qui étais-tu avant qu’il ne s’agenouille devant toi ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHÉTYPE",
    // B · ba5f84b5a432
    "setupFields.archetype.helpText": "Ce que tu faisais de ta vie jusqu’à huit minutes après une heure cet après-midi, ce qui détermine ce dans quoi tu es bon et qui a déjà un dossier sur toi. C’est fixé pour toute l’histoire. Ça ne décide pas à quel gouvernement tu dois, si tu montes dans le cockpit, ou si la guerre redémarre — rien de tout ça n’est décidé ici.",
    // B · 4f973d4f68c0
    "setupFields.worldKnowsAboutYou.label": "Qu’est-ce qui est déjà vrai à ton sujet ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · fd89b4cb9a37
    "setupFields.worldKnowsAboutYou.helpText": "Quoi que tu dises ici, ce monde s’adapte. Une histoire, une réputation, un nom de famille, une augmentation, ou rien du tout. Une phrase simple suffit.",
    // B · 8653e2c3de3d
    "setupFields.worldKnowsAboutYou.placeholder": "ex. J’ai volé pour le Compact pendant quatre ans puis je suis parti, et il y a deux personnes sur cette station qui le savent.",
    // B · 055183067420
    "setupFields.why_you_are_here.label": "Pourquoi étais-tu sur cette place ?",
    // B · b6a31c665c0b
    "setupFields.why_you_are_here.kind": "CHOIX",
    // B · 635ec3503f19
    "setupFields.why_you_are_here.helpText": "Une raison de départ, pas un engagement. Rien ici ne t’oblige à te soucier de la machine, de la guerre, ou de qui que ce soit dedans.",
    // B · f658f2519734
    "setupFields.why_you_are_here.options.someone_died.label": "Quelqu’un à toi est sur le mur",
    // B · 48347dbb3607
    "setupFields.why_you_are_here.options.work.label": "Tu travaillais. Contrat, service, reportage, livraison",
    // B · 52dcc6cf6abb
    "setupFields.why_you_are_here.options.the_machine.label": "Tu viens spécialement pour voir la machine",
    // B · 1f4b79b72e0b
    "setupFields.why_you_are_here.options.passing.label": "Tu changeais de vaisseau et la place était sur le chemin",
    // B · a781bc9fb17d
    "setupFields.why_you_are_here.options.unsaid.label": "Tu as une raison et tu ne la mets pas sur un formulaire",
    // B · 7c23b7c9b510
    "setupFields.appearance.label": "Qu’est-ce que les onze équipes de caméras ont filmé ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · ca146570e595
    "setupFields.appearance.placeholder": "ex. Quelqu’un dans un manteau emprunté, trop immobile, les mains ouvertes le long du corps.",
    // B · 3aa4328667d6
    "protagonist.kind": "VIDE",
    // A · 74e9644c4ca8
    "opening": "Treize heures huit, et la place est pleine de quatre mille personnes.\n\nDerrière la vitre, les yeux de la machine s’allument.\n\nElle traverse ses liens de sécurité comme une main traverse une toile d’araignée. Rien ne tire. Quelqu’un hurle, puis la plupart des gens suivent, la place se vide en quatre-vingt-dix secondes, et tu restes là, parce que tes jambes n’ont pas été consultées.\n\nDix-sept mètres de céramique noire traversent le sol et s’arrêtent devant toi. Puis elle s’agenouille.\n\nLe cockpit s’ouvre pour la première fois depuis dix-huit ans et une voix calme sort des haut-parleurs.\n\n« Pilote reconnu. »\n\nSur ta gauche, une femme en blouson Helion n’a pas couru non plus. Elle tient son arme de poing, mais ne la pointe pas vers la machine.",
    // A · dc963a01eb15
    "openingSuggestions": ["Je la grimpe. Main après main, en suivant le blindage, avec onze équipes de caméras derrière moi, sans en regarder une seule. « Ok, » je dis dans le cockpit ouvert. « C’est la voix de qui, et depuis quand tu es réveillé ? »","Je reste exactement où je suis et tends les mains, bien visibles pour la femme armée. « J’ai jamais vu cette chose de ma vie. » Puis, plus fort vers la machine : « Tu crois que je suis qui ? »","Je me retourne et je quitte la place. Je passe devant la scène, devant le mur des noms, devant quatre mille personnes qui regardent ailleurs, sans courir, parce que c’est le seul moment où courir serait dangereux."],
  },
});
