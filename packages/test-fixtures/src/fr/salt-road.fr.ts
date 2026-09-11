import { registerWorldText } from '@aniplay/contracts';

/**
 * The Salt Road, in French.
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
  storyId: "story_salt_road",
  text: {
    // A · a12d6cc89164
    "fantasyLabel": "Onze jours de marche. Neuf jours d’eau.",
    // A · 348c66727b04
    "hook": "On te paie pour porter une mallette verrouillée à travers le désert. Tu as neuf jours d’eau et onze jours de marche.",
    // A · ccdf3f1f5e4b
    "premise": "Une femme t’a payé d’avance pour porter une mallette fermée à clé à pied, de la ville d’Ossun jusqu’à la côte. Elle n’a jamais voulu dire ce qu’il y avait dedans.\n\nLe trajet traverse onze jours de salines. Quatre puits offrent de l’eau potable en chemin, mais le troisième est incertain — certaines années il donne de l’eau, d’autres il est à sec. Tu portes neuf jours d’eau.\n\nTu as donc deux jours de moins avant même d’avoir fait un pas, ce qui veut dire que le troisième puits doit avoir de l’eau. Quatre personnes boivent aussi plus vite qu’une, et tu ne pars pas seul.\n\nFerrow est le guide, elle a fait cette traversée neuf fois. Sabe est un pèlerin qui s’est mal préparé et ne reviendra pas en arrière. Oren a rejoint à la deuxième halte, c’est une bonne compagnie, et il n’a jamais dormi quand tu t’es réveillé.\n\nRien ne te traque ici. Il n’y a pas de monstres sur les salines. Le danger vient de la distance et des calculs, et du fait que chaque choix de rythme ou de route consomme de l’eau que tu ne peux pas récupérer. Si tu manques d’eau, tu meurs, et c’est définitif. La route se fiche bien de savoir à qui est la faute.",
    // A · 2d856fb52c07
    "mechanicsChips": ["Voyage","Gestion des ressources","Confiance","Choix difficiles"],
    // A · f1b052de536d
    "creatorNote": "La mort ici est définitive, et c’est voulu. Le désert ne cherche pas à te piéger. Il s’en fiche simplement, et c’est justement ce qu’il est le plus dur à accepter.",
    // B · 77ad07a5e156
    "rules.defeatMode": "MORTEL",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · 50390f570849
    "rules.hardCanon": ["Il y a quatre sources d’eau entre Ossun et la côte, et la troisième est incertaine.","Rien ne vit sur les salines. Ce que tu vois là-bas, c’est le temps ou une personne.","La malle est scellée avec la marque d’un fabricant d’une maison fermée il y a quarante ans.","Le sel conserve. Rien ne pourrit sur les salines, y compris ce qui y a été laissé."],
    // A · 585ca989e4a2
    "rules.toneGuide": "Lumière blanche plate et calculs. La menace est logistique, pas monstrueuse. Les gens restent corrects tant qu’il y a de l’eau, et ils le restent presque même à sec, ce qui est pire.",
    // B · b3f73706ed78
    "skills.endurance.name": "Endurance",
    // B · 97081b4b4792
    "skills.endurance.attribute": "force",
    // B · 590514161665
    "skills.endurance.description": "Marcher quand tu préférerais pas.",
    // B · 24c81a3986dd
    "skills.navigation.name": "Navigation",
    // B · a8c1fa8269c3
    "skills.navigation.attribute": "esprit",
    // B · f54bd217ebe4
    "skills.navigation.description": "Savoir où est le puits en regardant la lumière.",
    // B · 69b3c8999167
    "skills.survival.name": "Survie",
    // B · a8c1fa8269c3
    "skills.survival.attribute": "esprit",
    // B · 354534f503b0
    "skills.survival.description": "L’eau, l’ombre et ce que le ciel va faire.",
    // B · bc1017b52f6c
    "skills.perception.name": "Perception",
    // B · a8c1fa8269c3
    "skills.perception.attribute": "esprit",
    // B · 7e88c2f13c84
    "skills.perception.description": "Voir ce qu’il y a à l’horizon avant que ça te voie.",
    // B · 04890a36609e
    "skills.persuasion.name": "Persuasion",
    // B · cfb7a15645c3
    "skills.persuasion.attribute": "présence",
    // B · 75adcb86464d
    "skills.persuasion.description": "Maintenir un groupe uni quand l’eau manque.",
    // B · aef0340e48b9
    "skills.blades.name": "Lames",
    // B · 97081b4b4792
    "skills.blades.attribute": "force",
    // B · ee5392fab6a4
    "skills.blades.description": "Le dernier argument que quelqu’un veut avoir ici.",
    // B · cf929c9acc8a
    "skills.composure.name": "Calme",
    // B · 4c84c2c842d0
    "skills.composure.attribute": "volonté",
    // B · b3a7fbe0ff57
    "skills.composure.description": "Faire les comptes quand même.",
    // B · ea0b35a4dc9f
    "resources.health.name": "Santé",
    // B · 34e8ec1ac388
    "resources.health.polarity": "BON_HAUT",
    // B · ee6d3efcf6b5
    "resources.health.zeroStateConsequence": "Tu t’effondres sur les salines. Dans ce monde, c’est la fin de la partie.",
    // B · 1a3c168896b6
    "resources.health.color": "#FF5B69",
    // B · 04e2fe221ac3
    "resources.water.name": "Eau",
    // B · 34e8ec1ac388
    "resources.water.polarity": "BON_HAUT",
    // B · 7ed51912a2c6
    "resources.water.zeroStateConsequence": "Tout se joue sur un jet de Volonté, puis ça ne se joue plus.",
    // B · 22fa7a5c5a5a
    "resources.water.color": "#43D6A4",
    // B · f0924a6aaad6
    "resources.strain.name": "Fatigue",
    // B · a34adbda2422
    "resources.strain.polarity": "BON_BAS",
    // B · af761b3f25e8
    "resources.strain.zeroStateConsequence": "Repos. Ça ne durera pas.",
    // B · ad1dcb42b294
    "resources.strain.color": "#F6BE55",
    // A · 4379b208e1c3
    "items.sealed_case.name": "La mallette scellée",
    // B · 21bbab704ce0
    "items.sealed_case.tags": ["quête"],
    // B · 53b48f8b4755
    "items.sealed_case.description": "Coins en laiton, une marque de fabricant, et plus lourd qu’il ne devrait.",
    // B · 3d819b44a6da
    "items.sealed_case.loreText": "La marque appartient à une maison fermée il y a quarante ans. La soudure est plus récente.",
    // B · 909ac0144b71
    "items.sealed_case.icon": "malle",
    // A · 7aa60240f5f3
    "items.canteen.name": "Une gourde pleine",
    // B · 1467deed44a7
    "items.canteen.tags": ["consommable"],
    // B · 21581fb204d8
    "items.canteen.description": "Deux jours si tu fais gaffe. Un si tu fais pas.",
    // B · 9c097242044b
    "items.canteen.loreText": "La bosse vient du voyage de quelqu’un d’autre.",
    // B · 7f7a645a0852
    "items.canteen.icon": "cantine",
    // A · 7d8ba2a804e1
    "items.salt_veil.name": "Voile de sel",
    // B · 4734de9b2439
    "items.salt_veil.tags": ["équipement"],
    // B · db5ef3a0f2df
    "items.salt_veil.equipSlot": "tête",
    // B · 4dbe6fff5252
    "items.salt_veil.description": "Protège des reflets et de la croûte. Rétrécit ce que tu peux voir.",
    // B · 8a535f55d89f
    "items.salt_veil.loreText": "Tous les guides en portent un. Tous s’en plaignent.",
    // B · 28ed15f52200
    "items.salt_veil.icon": "voile",
    // A · 071267cc63d7
    "items.guide_map.name": "La carte de Ferrow",
    // B · f3a60c587a13
    "items.guide_map.tags": ["outil"],
    // B · 110688b7cca2
    "items.guide_map.equipSlot": "main",
    // B · 4930a3baf81c
    "items.guide_map.rarity": "Rare",
    // B · 50546369e3a6
    "items.guide_map.description": "Neuf traversées marquées en neuf encres différentes. Le troisième puits a un point d’interrogation.",
    // B · 4e916b560a5e
    "items.guide_map.loreText": "Un itinéraire est complètement rayé. Aucune note pour expliquer.",
    // B · 33dffa18ca3f
    "items.guide_map.icon": "carte",
    // A · 7c7b5ba35543
    "abilities.carry_it.name": "Porter ça",
    // B · 74ade4e7d87e
    "abilities.carry_it.tags": ["endurance","coursier"],
    // B · c9929caa80cf
    "abilities.carry_it.description": "Prends plus de poids que c’est raisonnable pour que quelqu’un d’autre puisse continuer.",
    // B · 39d896e20aec
    "abilities.carry_it.targetRule": "SINGLE",
    // B · 97081b4b4792
    "abilities.carry_it.check.attribute": "force",
    // A · 89c6ad5269d3
    "abilities.find_the_water.name": "Trouver l’eau",
    // B · bf43afc89f0d
    "abilities.find_the_water.tags": ["survie","arpenteur"],
    // B · 10299033e3ab
    "abilities.find_the_water.description": "Lis le sol pour savoir où l’eau est encore, et sois assez souvent dans le vrai pour que les gens te suivent.",
    // B · c44e6dd70059
    "abilities.find_the_water.targetRule": "NONE",
    // B · a8c1fa8269c3
    "abilities.find_the_water.check.attribute": "esprit",
    // A · e45e816cbafb
    "abilities.stand_the_line.name": "Tenir la ligne",
    // B · 37091b2ac63d
    "abilities.stand_the_line.tags": ["combat","éclaireur"],
    // B · 600deaa45f4c
    "abilities.stand_the_line.description": "Mets-toi entre l’équipe et ce qui arrive, et fais-le hésiter.",
    // B · e9383e6237fe
    "abilities.stand_the_line.targetRule": "MULTI",
    // B · 97081b4b4792
    "abilities.stand_the_line.check.attribute": "force",
    // A · 5b78f653c6b5
    "abilities.read_the_flat.name": "Lire la plaine",
    // B · c962d34a80f3
    "abilities.read_the_flat.tags": ["survie"],
    // B · 6dfb1173fc11
    "abilities.read_the_flat.description": "Prends la lumière, la croûte et l’horizon, et calcule ce que les six prochaines heures coûtent.",
    // B · c44e6dd70059
    "abilities.read_the_flat.targetRule": "NONE",
    // B · a8c1fa8269c3
    "abilities.read_the_flat.check.attribute": "esprit",
    // A · b634c8f65f84
    "abilities.ration.name": "Rationner",
    // B · c962d34a80f3
    "abilities.ration.tags": ["survie"],
    // B · 3121a12d34b3
    "abilities.ration.description": "Réduis tout le monde au minimum, toi y compris, et fais tenir l’équipe à ça.",
    // B · e9383e6237fe
    "abilities.ration.targetRule": "MULTI",
    // B · cfb7a15645c3
    "abilities.ration.check.attribute": "présence",
    // A · f543f3f52380
    "locations.ossun_gate.name": "Porte d’Ossun",
    // A · 6eddd95e032b
    "locations.ossun_gate.shortName": "Ossun",
    // B · f994435a7bfa
    "locations.ossun_gate.description": "Le dernier mur avant les flats. Des vendeurs d’eau, un panneau avec les noms de ceux qui sont pas arrivés, et une route qui devient blanche à environ un mile.",
    // B · 7502fe4c7802
    "locations.ossun_gate.stageImage": "story_salt_road/stage_ossun_gate",
    // B · 41a3de6355a8
    "locations.ossun_gate.ambientSfx": ["vent_faible","marché"],
    // A · 7cc604961dc6
    "locations.first_well.name": "Le premier puits",
    // A · 9101df63ed2e
    "locations.first_well.shortName": "Premier puits",
    // B · ba1320b499eb
    "locations.first_well.description": "Un anneau de pierre et un treuil qui marche. Tout le monde s’arrête ici, donc tout le monde se rencontre ici, et le sol est piétiné par tout le monde.",
    // B · a286857b03e0
    "locations.first_well.stageImage": "story_salt_road/stage_first_well",
    // B · d770dec08629
    "locations.first_well.ambientSfx": ["vent_faible","corde"],
    // A · 26f99ee7a393
    "locations.the_wrecks.name": "Les Épaves",
    // A · be98e795b3ce
    "locations.the_wrecks.shortName": "Épaves",
    // B · 7163c74551dd
    "locations.the_wrecks.description": "Quatre chariots en ligne approximative, debout, encore chargés. Le sel conserve. Personne n’a rien pris, et personne ne sait pourquoi.",
    // B · c6122b201bac
    "locations.the_wrecks.stageImage": "story_salt_road/stage_the_wrecks",
    // B · e7247c1d78e3
    "locations.the_wrecks.ambientSfx": ["vent_fort","grincement"],
    // A · 3c221f75011c
    "locations.second_well.name": "Le Deuxième Puits",
    // A · b7f093e122eb
    "locations.second_well.shortName": "Deuxième puits",
    // B · 4cc8aba54339
    "locations.second_well.description": "Sain, profond et fréquenté. La dernière eau certaine avant que les calculs ne deviennent sérieux.",
    // B · b39b466e3f88
    "locations.second_well.stageImage": "story_salt_road/stage_second_well",
    // B · f5deae9c50ef
    "locations.second_well.ambientSfx": ["vent_faible","voix"],
    // A · fa3fc199bd50
    "locations.third_well.name": "Le Troisième Puits",
    // A · f817eaf0727e
    "locations.third_well.shortName": "Troisième puits",
    // B · 4fe85c8fc9d6
    "locations.third_well.description": "Marqué d’un point d’interrogation sur toutes les cartes valables. Parfois il tient. L’approche est jonchée d’objets que les gens ont décidé d’abandonner.",
    // B · c83aa33beac4
    "locations.third_well.stageImage": "story_salt_road/stage_third_well",
    // B · 58019f8fba9e
    "locations.third_well.ambientSfx": ["vent_fort"],
    // B · c583c36de032
    "characters.ferrow.name": "Ferrow",
    // A · 5d85db4972c9
    "characters.ferrow.role": "Guide, neuf traversées",
    // A · b67956a2dc1d
    "characters.ferrow.cardBlurb": "Ta guide. Elle a fait la traversée neuf fois et te donnera la vérité sur l’eau, même quand tu préférerais qu’elle se taise.",
    // B · aee35f364a88
    "characters.ferrow.pronouns": "elle",
    // A · c2f5397c252d
    "characters.ferrow.publicTraits": ["Voix posée","Précise","Ne rassure pas"],
    // B · 23d0d2160e27
    "characters.ferrow.hiddenDrives": ["Sa huitième traversée a fait perdre deux personnes au troisième puits et elle n’y est pas retournée depuis.","Elle a pris ce job parce que la mallette va à la côte et elle veut voir qui la récupère."],
    // B · 488a6787c57f
    "characters.ferrow.values": ["Calcul","Dire la vérité aux gens sur l’eau"],
    // B · 37ee92a2080e
    "characters.ferrow.fears": ["Le troisième puits","Être plus digne de confiance qu’elle ne le mérite"],
    // A · 36971819406a
    "characters.ferrow.socialStyle": "Annonce le coût et te laisse décider. Ne discute jamais deux fois.",
    // B · 7f3ac1ce211b
    "characters.ferrow.boundaries": ["Ne mentira pas sur l’eau","Ne portera personne qu’elle ne peut pas porter"],
    // B · e4d83af6a2d7
    "characters.ferrow.goals": ["Atteindre la côte","Voir qui prend livraison"],
    // B · 9cf6c1474078
    "characters.ferrow.secrets.ferrow_eighth.fact": "Ferrow a perdu deux voyageurs au troisième puits lors de sa huitième traversée.",
    // B · 47558a04be8d
    "characters.ferrow.secrets.ferrow_eighth.visibility": "NPC_PRIVATE",
    // B · 88294ccb5a0a
    "characters.ferrow.secrets.ferrow_eighth.revealHint": "Confiance 40+, ou arriver au troisième puits avec elle.",
    // A · 0d6bed302c6f
    "characters.ferrow.speechStyle": "Phrases courtes. Des chiffres dès que c’est utile. Pas de réconfort, ni à attendre, ni à donner.",
    // A · 1904e52bc330
    "characters.ferrow.topics": ["l’eau","le troisième puits","la route","qui t’emploie"],
    // A · c78c1b1a21fa
    "characters.ferrow.voiceSamples": ["Neuf jours d’eau. Onze jours de route. Le reste, c’est vous.","Je vais pas vous dire que ça ira. Je vous dirai quand boire.","Le troisième puits, c’est un point d’interrogation sur toutes les cartes qui comptent. La mienne aussi."],
    // B · d189c3c6bece
    "characters.ferrow.appearance": "Usée, voile de sel repoussé, avant-bras bandés, une mallette de carte qu’elle ne pose jamais.",
    // B · a85d735da582
    "characters.ferrow.visualHook": "Neuf courtes cicatrices pâles parallèles à l’intérieur de son avant-bras gauche, une par traversée, la neuvième visiblement plus courte que les autres.",
    // B · 046846d64ab0
    "characters.ferrow.silhouette": "Usée et économique, voile de sel repoussé du visage, avant-bras bandés, une mallette de carte attachée sur la poitrine.",
    // B · 7cc1ee35033a
    "characters.ferrow.artSeed": "ferrow-v1",
    // B · 911412fa7abe
    "characters.ferrow.portrait": "story_salt_road/ferrow",
    // B · b4e241e44fd1
    "characters.ferrow.expressions": ["neutre","plat","alerte","sombre","soulagé"],
    // B · 0f12bb0fcab2
    "characters.ferrow.gates.ferrow_tells_you.label": "Ferrow te parlera de la huitième traversée",
    // B · 55a54e80451a
    "characters.ferrow.gates.ferrow_tells_you.kind": "CONFIANCE",
    // B · ef38c4c9d8de
    "characters.ferrow.combatant.tags": ["vétéran"],
    // B · ebf00014f0e5
    "characters.oren.name": "Oren",
    // A · ed4e73bc0bd4
    "characters.oren.role": "Rejoint au deuxième puits",
    // A · 6598b8c1bf49
    "characters.oren.cardBlurb": "Il a rejoint l’équipe au deuxième puits. Bonne compagnie, utile, et jamais endormi quand tu ouvres les yeux.",
    // B · fcca6b746d0b
    "characters.oren.pronouns": "il",
    // A · 6f9277898426
    "characters.oren.publicTraits": ["Facile à vivre","Serviable","Jamais le premier endormi"],
    // B · 594c8b490b28
    "characters.oren.hiddenDrives": ["Il a été envoyé pour s’assurer que la mallette arrive à la côte, et pour ne rien vérifier d’autre.","Il aime vraiment l’équipe, ce qui complique ses instructions."],
    // B · b73e7ecb3b27
    "characters.oren.values": ["Finir ce qu’il a accepté"],
    // B · 27eb147250ea
    "characters.oren.fears": ["Devoir choisir"],
    // A · a8470fbbf08d
    "characters.oren.socialStyle": "Chaleureux, serviable, et toujours un peu mieux informé qu’il ne devrait.",
    // B · cc8688a8f3c1
    "characters.oren.boundaries": ["Ne commencera rien","Ne quittera pas l’équipe le premier"],
    // B · e69062a898a6
    "characters.oren.goals": ["Voir la mallette livrée"],
    // B · b4e4883d25e9
    "characters.oren.secrets.oren_sent.fact": "Oren a été envoyé par le destinataire de la mallette et a rejoint l’équipe exprès.",
    // B · 47558a04be8d
    "characters.oren.secrets.oren_sent.visibility": "NPC_PRIVATE",
    // B · 4d99a7b79bd2
    "characters.oren.secrets.oren_sent.revealHint": "Perception aux épaves, ou confiance 45+ sur eau courte.",
    // A · 35f66d28fbc7
    "characters.oren.speechStyle": "Amical, esquive, pose deux questions pour une réponse.",
    // A · b6c378e9530d
    "characters.oren.topics": ["d’où il vient","la malle","les épaves","ce qu’il fait dans la vie"],
    // A · d447323fd432
    "characters.oren.voiceSamples": ["Je prends le premier tour de garde. On dirait que les chiffres te tiennent éveillé.","Je viens du côté de la côte. Longue histoire, et pas intéressante.","Repose-moi la question quand on aura de l’eau. Je te répondrai sûrement."],
    // B · 946ab7d52c49
    "characters.oren.appearance": "Trentenaire, coup de soleil sur un bronzage ancien, un bon sac qu’il n’a pas acheté à Ossun.",
    // B · 383bad86045c
    "characters.oren.visualHook": "Un manteau et un sac en bien meilleur état que ceux des autres sur cette route, et les seules mains non craquelées, non abîmées du groupe.",
    // B · 7c8034477634
    "characters.oren.silhouette": "Détendu et ouvert, bronzé par-dessus un ancien hâle, un bon sac porté avec trop de facilité.",
    // B · 7fe8a8c5bfb9
    "characters.oren.artSeed": "oren-v1",
    // B · b0eb11d2141a
    "characters.oren.portrait": "story_salt_road/oren",
    // B · cd6d92a12634
    "characters.oren.expressions": ["amical","neutre","vigilant","pris sur le fait","résolu"],
    // B · c20e8049952e
    "characters.oren.gates.oren_admits.label": "Oren te dira qui l’a envoyé",
    // B · 55a54e80451a
    "characters.oren.gates.oren_admits.kind": "CONFIANCE",
    // B · a9da4a724077
    "characters.oren.gates.oren_admits.requires.flagsSet": ["suspect_oren"],
    // B · 452aada4e13b
    "characters.oren.combatant.tags": ["professionnel"],
    // B · 38f00904e984
    "characters.sabe.name": "Sabe",
    // A · 43eff37882fe
    "characters.sabe.role": "Pèlerine",
    // A · ac14c6cff515
    "characters.sabe.cardBlurb": "Une pèlerine qui marche vers la côte. Mal équipée, elle prend ça avec joie et boit la même eau que toi.",
    // B · 9bdf0106d724
    "characters.sabe.pronouns": "iel",
    // A · 6d0dccab256c
    "characters.sabe.publicTraits": ["Gaieté","Mal équipée","Absolument certaine"],
    // B · fcb219ca6b96
    "characters.sabe.hiddenDrives": ["Iel marche vers la côte pour disperser quelqu’un, et n’a rien dit à personne.","Iel ne reviendra pas en arrière, et sait exactement ce que ça peut coûter."],
    // B · eb7a0f6f699a
    "characters.sabe.values": ["Tenir une promesse aux morts"],
    // B · ae2e96a4108d
    "characters.sabe.fears": ["Être renvoyé chez soi","Être un poids et le savoir"],
    // A · 57eb344abdeb
    "characters.sabe.socialStyle": "Parle sans arrêt, remercie tout le monde, s’excuse pour rien d’important.",
    // B · be64675e08b9
    "characters.sabe.boundaries": ["Ne reviendra pas en arrière","Ne prendra pas plus que sa part"],
    // B · 8cb1ebddb21e
    "characters.sabe.goals": ["Atteindre la côte"],
    // B · df38dde08934
    "characters.sabe.secrets.sabe_ashes.fact": "Sabe porte des cendres et ne l’a dit à personne.",
    // B · 47558a04be8d
    "characters.sabe.secrets.sabe_ashes.visibility": "NPC_PRIVATE",
    // B · bb5113d9c090
    "characters.sabe.secrets.sabe_ashes.revealHint": "Confiance 35+, ou une lecture d’Insight à un moment difficile.",
    // A · 4a6d3a30d661
    "characters.sabe.speechStyle": "Lumineuse, rapide, pleine d’autodérision. Se fait très discrète quand ça compte.",
    // A · e98824d60e4e
    "characters.sabe.topics": ["pourquoi elle est là","la côte","son sac","ce qu’elle a mal emballé"],
    // A · de01c2fd9a57
    "characters.sabe.voiceSamples": ["Je sais. J’ai fait mes sacs comme une idiote. Tu peux le dire une fois et on passe à autre chose.","Je ne fais pas demi-tour. Tu peux râler, c’est permis.","C’est encore loin ? Ne réponds pas. En fait, réponds."],
    // B · 340bfd9f74a2
    "characters.sabe.appearance": "Jeune, brûlé par le soleil, un sac un tiers trop lourd, des bottes pas faites pour ça.",
    // B · 6e2c326c02c5
    "characters.sabe.visualHook": "Une petite urne en argile scellée attachée tout en haut d’un sac surchargé, en plein jour, que personne n’a encore demandé.",
    // B · 8cbdd785ed68
    "characters.sabe.silhouette": "Jeune et surchargé, penché sous un sac un tiers trop lourd, bottes faites pour la ville.",
    // B · 21de9532163e
    "characters.sabe.artSeed": "sabe-v1",
    // B · d19d499f4733
    "characters.sabe.portrait": "story_salt_road/sabe",
    // B · d65769005fe2
    "characters.sabe.expressions": ["vif","neutre","fatigué","silencieux","déterminé"],
    // B · c4c665d816b1
    "characters.sabe.gates.sabe_tells_you.label": "Sabe te dira ce qu’iel porte",
    // B · 55a54e80451a
    "characters.sabe.gates.sabe_tells_you.kind": "CONFIANCE",
    // B · b763e8d496c1
    "characters.sabe.combatant.tags": ["non entraîné"],
    // B · abad582b24d2
    "quests.q_delivery.title": "La Livraison",
    // B · 164e68566893
    "quests.q_delivery.summary": "Porte jusqu’à la côte la mallette scellée qu’on t’a confiée. Onze jours de marche, neuf jours d’eau.",
    // B · 7fcc0be2ad9c
    "quests.q_delivery.kind": "PRINCIPALE",
    // B · eb0a6bd19de6
    "quests.q_delivery.steps.step_first_well.playerCopy": "Atteignez le premier puits.",
    // B · da654899c177
    "quests.q_delivery.steps.step_first_well.directorNotes": "Douze heures de marche. Établissez l’arithmétique avant tout drame.",
    // B · fc406b872d8a
    "quests.q_delivery.steps.step_first_well.succeedWhen.atLocation": "first_well",
    // B · b9ca07b2f65b
    "quests.q_delivery.steps.step_second_well.playerCopy": "Atteignez le deuxième puits avec de l’eau en réserve.",
    // B · 54cc2f0c058c
    "quests.q_delivery.steps.step_second_well.directorNotes": "La dernière eau certaine. Quoi que le groupe décide ici, il en vivra après.",
    // B · fc406b872d8a
    "quests.q_delivery.steps.step_second_well.enterWhen.atLocation": "first_well",
    // B · f2e5e9c8a9cd
    "quests.q_delivery.steps.step_second_well.succeedWhen.atLocation": "second_well",
    // B · ca7deb7deef5
    "quests.q_delivery.steps.step_third_well.playerCopy": "Découvrez si le troisième puits tient.",
    // B · cc69a2875771
    "quests.q_delivery.steps.step_third_well.directorNotes": "La promesse se réalise ici, et la façon dont le groupe arrive est toute l’histoire. Quelqu’un qui lit le sol le savait avant d’arriver. Quelqu’un qui portait l’eau a rendu la question académique. Quelqu’un qui s’est tenu devant les épaves a acheté les heures. Et quelqu’un en qui Ferrow a confiance s’est simplement fait dire ce qu’elle savait déjà. Ferrow ne voudra pas partir, et partira.",
    // B · f2e5e9c8a9cd
    "quests.q_delivery.steps.step_third_well.enterWhen.atLocation": "second_well",
    // B · c117d73279eb
    "quests.q_delivery.involvedCharacterIds": ["ferrow","oren","sabe"],
    // B · 00f51ad4c59e
    "quests.q_delivery.involvedLocationIds": ["ossun_gate","first_well","second_well","third_well"],
    // B · 0b793ddd9149
    "quests.q_delivery.knownRewardCopy": "Paiement à la livraison, et le nom de celui qui vient chercher.",
    // B · 6f799b23d2c6
    "quests.q_the_wrecks.title": "Quatre chariots",
    // B · 688615754c10
    "quests.q_the_wrecks.summary": "Quatre chariots, debout, encore chargés. Personne n’a rien pris.",
    // B · 552c0b7f83c2
    "quests.q_the_wrecks.kind": "SECONDAIRE",
    // B · d19c6100ab7e
    "quests.q_the_wrecks.discoverWhen.flagsSet": ["spoke :ferrow"],
    // B · 0f2e988b0bd6
    "quests.q_the_wrecks.steps.step_reach_wrecks.playerCopy": "Va vers le nord et vois les épaves toi-même.",
    // B · 8d0a422f1e0c
    "quests.q_the_wrecks.steps.step_reach_wrecks.directorNotes": "Quatorze heures et beaucoup d’eau. Ce coût est toute la décision, et il y a plus d’une façon de le payer — y aller seul et pas cher, prendre la caravane et risquer tout le monde, ou faire avouer à Oren ce qui est là sans faire un pas. Chacune laisse le joueur savoir quelque chose de différent sur lui.",
    // B · 8dda6e7688cf
    "quests.q_the_wrecks.involvedCharacterIds": ["ferrow","oren"],
    // B · ce7fda95911e
    "quests.q_the_wrecks.involvedLocationIds": ["the_wrecks"],
    // B · 780a043de0ac
    "quests.q_the_wrecks.knownRewardCopy": "Ce qui est encore dessus, et pourquoi c’est encore dessus.",
    // B · 5631e4ba6537
    "promises.promise_third_well.kind": "BOSS",
    // B · 108eb3388355
    "promises.promise_third_well.label": "Le troisième puits, et s’il tient",
    // B · 5b18ad5babaa
    "promises.promise_third_well.seedHint": "Un point d’interrogation sur chaque carte qui vaut le coup.",
    // B · 0951986f5bcc
    "promises.promise_third_well.payoffHint": "Ferrow a perdu deux personnes ici et n’y est jamais retournée.",
    // B · e82d9dc4b3fa
    "promises.promise_case.kind": "MYSTÈRE",
    // B · 3de68cbd2a6c
    "promises.promise_case.label": "Ce qu’il y a dans la malle, et qui vient la chercher",
    // B · 52805f195191
    "promises.promise_case.seedHint": "Une marque de fabricant d’une maison fermée il y a quarante ans.",
    // B · a93da18f3367
    "promises.promise_case.payoffHint": "Oren a rejoint le groupe exprès.",
    // B · 445cd8deebc2
    "promises.promise_sabe.kind": "RELATION",
    // B · 36ad2a6bc148
    "promises.promise_sabe.label": "Sabe, qui ne devrait pas être là et ne fera pas demi-tour",
    // B · b563884e653f
    "promises.promise_sabe.seedHint": "Un sac trop lourd d’un tiers et des bottes pas faites pour ça.",
    // B · 664b6b9713a6
    "promises.promise_sabe.payoffHint": "Ils portent des cendres vers la côte.",
    // A · 13bd9edc208d
    "archetypes.arch_courier.name": "Messager",
    // B · b3f73706ed78
    "archetypes.arch_courier.role": "Endurance",
    // A · 703b39d3b9b7
    "archetypes.arch_courier.summary": "Tu as déjà porté pire, plus loin, pour des gens plus bizarres. Le plus dur des trois et le mieux équipé — tu tiens bon quand la traversée se complique.",
    // A · 90777cc19991
    "archetypes.arch_courier.playstyle": ["Difficile à fatiguer","Calme sous pression","Le mieux équipé"],
    // A · 30c2a68168f8
    "archetypes.arch_courier.blurb": "Tu as déjà porté bien pire pour des inconnus. Mais jamais aussi loin.",
    // B · a50ae7c16d60
    "archetypes.arch_courier.startingAbilities": ["carry_it"],
    // A · cc92938268fc
    "archetypes.arch_surveyor.name": "Arpenteur",
    // B · 953a469b9c1c
    "archetypes.arch_surveyor.role": "Navigation et observation",
    // A · 1804f1b26688
    "archetypes.arch_surveyor.summary": "Tu lis le terrain pour gagner ta vie. Tu trouves la route, tu vois d’abord ce qui cloche, et tu sais où est l’eau. Le plus faible physiquement.",
    // A · b5da1d328ecb
    "archetypes.arch_surveyor.playstyle": ["Navigation","Remarque tout","Physiquement faible"],
    // A · b6c48ce16de3
    "archetypes.arch_surveyor.blurb": "Tu lis le terrain pour gagner ta vie. Les salines, c’est juste un terrain très ennuyeux.",
    // B · 70c147cbc0a9
    "archetypes.arch_surveyor.startingAbilities": ["find_the_water"],
    // A · 5edb5ea0a81e
    "archetypes.arch_outrider.name": "Éclaireur",
    // B · 63d55e89c7d3
    "archetypes.arch_outrider.role": " Escorte armée",
    // A · 23dd9a0a2925
    "archetypes.arch_outrider.summary": "Tu as déjà gardé une caravane et tu en as perdu une. Le seul métier du coin qui sache vraiment se battre, et celui dont on attend qu’il protège en première ligne.",
    // A · 30a991572b09
    "archetypes.arch_outrider.playstyle": ["Bon combattant","Sur ses gardes","Formé au maniement des lames"],
    // A · 2ef9e45d1e6a
    "archetypes.arch_outrider.blurb": "On t’a déjà payé pour protéger une caravane. Ça s’est mal passé, mais t’en as tiré beaucoup d’enseignements.",
    // B · 5dbf7e1ac715
    "archetypes.arch_outrider.startingAbilities": ["stand_the_line"],
    // B · f4abfda67aaa
    "setupFields.displayName.label": "Quel nom est sur le contrat ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · a52cb0abd679
    "setupFields.displayName.placeholder": "ex. Dax Oro",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 3a6240a26696
    "setupFields.pronouns.placeholder": "ex. iel/iel",
    // B · d4c578137d9f
    "setupFields.archetype.label": "Que faisais-tu avant ça ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHÉTYPE",
    // B · f56b45fab26d
    "setupFields.archetype.helpText": "Ton ancien métier. Il détermine tes attributs, ta formation et le matériel que tu portes sur les salines, ce qui décide quels problèmes de la traversée sont faciles pour toi et lesquels te tuent presque. Fixé pour cette partie.",
    // B · a08a0d4b6346
    "setupFields.worldKnowsAboutYou.label": "Pourquoi elle t’a choisi ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · f92585429bcf
    "setupFields.worldKnowsAboutYou.placeholder": "ex. Je suis le seul coursier à être revenu de la dernière traversée.",
    // B · 3aa4328667d6
    "protagonist.kind": "VIDE",
    // A · 687018b10da4
    "opening": "La route qui sort d’Ossun blanchit à environ un mile devant toi, et elle le reste pendant onze jours.\n\nTa guide compte à voix haute l’eau de chacun avant de partir. Pour qu’aucun ne puisse dire qu’il n’a pas entendu les chiffres.\n\n« Neuf jours d’eau. Onze jours de route. » Ferrow te rend ta gourde. « Il y a quatre puits. Le troisième est incertain. Ceux qui veulent rentrer chez eux doivent faire demi-tour ici, parce qu’au-delà du premier puits, la distance est la même dans les deux sens. »\n\nDerrière toi, le pèlerin porte un sac bien trop lourd pour lui et sourit à personne en particulier.",
    // A · 3f35d8f0c708
    "openingSuggestions": ["Je charge la mallette sur l’épaule et je me cale à côté de Ferrow. « Disons que le troisième puits est sec. Qu’est-ce qu’il nous arrive, honnêtement ? »","Je m’accroupis et je fouille bien le sac du pèlerin, objet par objet, avant que quelqu’un ne me dise de pas.","Je prends la mallette et je me mets en marche, devant eux, sans attendre d’ordre pour l’ordre de marche."],
  },
});
