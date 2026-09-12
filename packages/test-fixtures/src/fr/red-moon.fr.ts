import { registerWorldText } from '@plotbreak/contracts';

/**
 * Red Moon Brigade, in French.
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
  storyId: "story_red_moon",
  text: {
    // A · f2ac598f5cbe
    "fantasyLabel": "Tu chasses les monstres. Tu deviens l’un d’eux.",
    // A · fc51a2e91df4
    "hook": "Ta première vraie chasse a tué ton équipe et aurait dû te tuer aussi. Mais quelque chose dans le Behemoth en a décidé autrement.",
    // A · 96a914a10e05
    "premise": "Les gens vivent derrière des murs à cause des Behemoths — des animaux gros comme des bâtiments qui sortent des terres sauvages et ne s’arrêtent devant rien, même pas un mur. Fort Ember est une des onze villes encore debout. La Brigade fait le lien entre elle et eux.\n\nTu avais huit ans quand l’un est passé près de ta ville. Depuis, tu en rêves.\n\nIl y a quatre jours, tu es parti à ta première vraie chasse avec six autres et tu es revenu seul. Le rapport officiel dit que le Behemoth a été tué et que tu as survécu par chance.\n\nCe qui s’est vraiment passé, c’est qu’il t’a eu dans sa gueule, et qu’une chose dans sa poitrine s’est glissée en toi à la place. Tu t’es réveillé dessous, avec les côtes intactes et les mains qui font quelque chose que les mains ne font pas.\n\nDepuis, tu peux tenir une plaque de carapace de Behemoth sur ton avant-bras environ neuf secondes. Ça devient plus facile, et c’est ça qui te fait peur.\n\nLa Brigade a un ordre permanent sur ceux qui reviennent changés. Personne ne te dira ce que c’est. Le docteur Voss a demandé à t’examiner deux fois. Le capitaine Venn n’a rien demandé, et c’est pire.\n\nTu reprends le service demain.",
    // A · 6ca35a24f571
    "mechanicsChips": ["Six styles d’armes","Traits de monstre","Instabilité","Cacher ce que tu es","Missions d’équipe"],
    // A · 9fc5136e708f
    "creatorNote": "Chaque trait a deux formes. La forme forte ne s’exprime qu’une fois que tu as lâché prise — et ce qui te retient cesse de marcher si tu vas trop loin. Ces deux extrêmes sont un vrai caractère.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · 086c77454b1d
    "rules.hardCanon": ["Les Behemoths ne parlent pas. Ils font du bruit, mais ce n’est pas un langage. La seule exception n’a pas été prouvée.","Un cœur de Behemoth cesse d’être utilisable dans l’heure qui suit la mort de l’animal. Personne n’en a gardé plus longtemps.","La Brigade a un ordre permanent concernant les chasseurs qui reviennent changés. Son contenu n’est pas public.","L’ancrage est une procédure imposée par la Brigade. Ça fait mal, ça marche, et personne de haut placé n’explique pourquoi ça existe.","Il reste onze villes. Ce nombre n’a pas augmenté depuis soixante ans.","Personne à Fort Ember n’a vu le joueur utiliser un trait de Behemoth sauf si l’histoire l’a enregistré."],
    // A · b8313ef58a9f
    "rules.toneGuide": "Militaire, physique, proche. Les gens sont fatigués, compétents, et plaisantent sur des trucs pas drôles. Les Behemoths sont des animaux, pas des démons — énormes, indifférents, et effrayants par leur taille plus que par leur malveillance. L’horreur corporelle est précise et brève : ce qu’une main fait, pas un paragraphe sur la chair. Un rythme d’anime — une scène calme à l’armurerie prépare celle suivante sur le mur.",
    // B · aef0340e48b9
    "skills.blades.name": "Lames",
    // B · 7ce3b6387340
    "skills.blades.attribute": "agilité",
    // B · fc775e80806b
    "skills.blades.description": "Épée, sabre, tout ce qui a un tranchant et une garde.",
    // B · 53a56712665d
    "skills.heavy_arms.name": "Armes lourdes",
    // B · 97081b4b4792
    "skills.heavy_arms.attribute": "force",
    // B · 3b667bc4cf71
    "skills.heavy_arms.description": "Briseurs, masses, et tout ce qui gagne par la masse.",
    // B · 1bb27d881a35
    "skills.polearms.name": "Armes d’hast",
    // B · 97081b4b4792
    "skills.polearms.attribute": "force",
    // B · 79312ab0b62f
    "skills.polearms.description": "Armes à portée, et le jeu de jambes qui les rend efficaces.",
    // B · e4e0a52a4555
    "skills.marksmanship.name": "Tir",
    // B · a8c1fa8269c3
    "skills.marksmanship.attribute": "esprit",
    // B · 6f289fea8a8e
    "skills.marksmanship.description": "Fusils, arbalètes, et savoir quand ne pas tirer.",
    // B · 8f59b41c7cc1
    "skills.hand_forms.name": "Formes de main",
    // B · 97081b4b4792
    "skills.hand_forms.attribute": "force",
    // B · 3f8d9bcae382
    "skills.hand_forms.description": "Se battre à mains nues, c’est surtout gérer la distance.",
    // B · 5e1671d443a4
    "skills.anchoring.name": "Ancrage",
    // B · 4c84c2c842d0
    "skills.anchoring.attribute": "volonté",
    // B · f689a749e0fa
    "skills.anchoring.description": "Garder sa forme pendant qu’autre chose tire.",
    // B · 2970fd3f5db7
    "skills.tracking.name": "Pistage",
    // B · a8c1fa8269c3
    "skills.tracking.attribute": "esprit",
    // B · 8679d71b9267
    "skills.tracking.description": "Lire le sol, les traces, et ce qu’un animal a fait ici.",
    // B · a76c7b167724
    "skills.field_medicine.name": "Médecine de terrain",
    // B · a8c1fa8269c3
    "skills.field_medicine.attribute": "esprit",
    // B · 8cc2fa7c6ed2
    "skills.field_medicine.description": "Maintenir quelqu’un en vie jusqu’au mur.",
    // B · f400330b9c9c
    "skills.command.name": "Commandement",
    // B · cfb7a15645c3
    "skills.command.attribute": "présence",
    // B · be1dccdbb5a1
    "skills.command.description": "Se faire obéir par des gens effrayés.",
    // B · cf929c9acc8a
    "skills.composure.name": "Calme",
    // B · 4c84c2c842d0
    "skills.composure.attribute": "volonté",
    // B · 59d084686d06
    "skills.composure.description": "Ne pas montrer ce que ta main vient de faire.",
    // B · da8810e7579d
    "resources.vigor.name": "Vigueur",
    // B · 34e8ec1ac388
    "resources.vigor.polarity": "BON_HAUT",
    // B · 402feb3b51da
    "resources.vigor.zeroStateConsequence": "Plus rien. On te porte ou on t’abandonne.",
    // B · d492a7650052
    "resources.vigor.color": "#E8B44A",
    // B · a2893c73d6db
    "resources.instability.name": "Instabilité",
    // B · a34adbda2422
    "resources.instability.polarity": "BON_BAS",
    // B · 68e95f6d8948
    "resources.instability.zeroStateConsequence": "Entièrement toi-même. Rien ne répond quand tu tends la main.",
    // B · c589f52fa224
    "resources.instability.color": "#B14A6C",
    // B · be21ca8ec2a1
    "resources.suspicion.name": "Soupçon",
    // B · a34adbda2422
    "resources.suspicion.polarity": "GOOD_LOW",
    // B · 42216c313342
    "resources.suspicion.zeroStateConsequence": "Personne ne te regarde deux fois.",
    // B · 57188c8fb1d4
    "resources.suspicion.color": "#6C7BB1",
    // A · 48ce9b67ec09
    "items.brigade_coat.name": "Manteau de la Brigade",
    // B · 4734de9b2439
    "items.brigade_coat.tags": ["équipement"],
    // B · bfd4d039e9f8
    "items.brigade_coat.equipSlot": "corps",
    // B · 24fca0aa28c0
    "items.brigade_coat.description": "Toile cirée, renforcée aux avant-bras, six poches. Tout le monde en a une et chacun l’a personnalisée.",
    // B · cbfe30d78b42
    "items.brigade_coat.loreText": "La tienne a encore ton numéro d’entrée pochoiré à l’intérieur du col.",
    // B · 2c3f9da60ba7
    "items.brigade_coat.icon": "manteau",
    // A · 9a89b828870e
    "items.anchor_kit.name": "Kit d’ancrage",
    // B · afa7767f9ac7
    "items.anchor_kit.tags": ["équipement","médical"],
    // B · 83f228c29c44
    "items.anchor_kit.description": "Une sangle, un mors-bloqueur, et trois ampoules en verre d’un truc que l’infirmerie refuse de nommer.",
    // B · 4a8df94b17ce
    "items.anchor_kit.loreText": "Distribué à tous les chasseurs. Personne ne sait à quoi ça sert avant d’en avoir besoin.",
    // B · 83bb11f3036d
    "items.anchor_kit.icon": "trousse",
    // A · 270165775671
    "items.heart_shard.name": "Éclat de cœur de Behemoth",
    // B · 21bbab704ce0
    "items.heart_shard.tags": ["quête"],
    // B · 3d44c6fd9715
    "items.heart_shard.description": "Un morceau de tissu sombre qui est encore à peine chaud quatre jours plus tard. Ça ne devrait pas.",
    // B · 046710379ef9
    "items.heart_shard.loreText": "Tu n’as dit à personne que tu l’avais gardé.",
    // B · c745197c2eff
    "items.heart_shard.icon": "éclat",
    // A · 1c576658fa9f
    "items.voss_serum.name": "Sérum de Voss",
    // B · 05bbcdf0162b
    "items.voss_serum.tags": ["médical"],
    // B · 8a9222140042
    "items.voss_serum.description": "Débouche la tête et remet les mains à leur place. Ça te coûte ce qui répondait.",
    // B · 96acd4688959
    "items.voss_serum.loreText": "Il t’en a donné trois et n’a rien noté.",
    // B · c93de720b80c
    "items.voss_serum.icon": "flacon",
    // A · ddeb77504dfb
    "items.field_rations.name": "Rations de campagne",
    // B · 56e08362805f
    "items.field_rations.tags": ["ravitaillement"],
    // B · ef50c27f69c0
    "items.field_rations.description": "Sel, graisse, et assez de sucre pour grimper une échelle.",
    // B · 50c811de410b
    "items.field_rations.icon": "ration",
    // A · 3cbefb17659d
    "items.signal_flare.name": "Fusée de détresse",
    // B · 56e08362805f
    "items.signal_flare.tags": ["ravitaillement"],
    // B · 62f729dc0183
    "items.signal_flare.description": "Rouge pour contact, vert pour clair. Il n’y a pas de couleur pour ce qui est arrivé à ton équipe.",
    // B · 17673bcad73f
    "items.signal_flare.icon": "fusée",
    // A · e0d608f07b24
    "items.squad_tags.name": "Six plaques d’identification",
    // B · 21bbab704ce0
    "items.squad_tags.tags": ["quête"],
    // B · 4e83963ed648
    "items.squad_tags.description": "Tu les as ramenés toi-même. Personne ne te l’a demandé.",
    // B · 7395468b31ee
    "items.squad_tags.loreText": "Kesta, Aldo, Ferrin, Mure, Onn, et Dael. Tu peux encore les dire dans l’ordre.",
    // B · a142d7f23535
    "items.squad_tags.icon": "plaques",
    // A · eb21b4dc59c7
    "items.longblade.name": "Longue lame de la Brigade",
    // B · b5e8d28b4848
    "items.longblade.tags": ["arme"],
    // B · 110688b7cca2
    "items.longblade.equipSlot": "main",
    // B · fb922d680f5b
    "items.longblade.description": "Standard, lourde sur le tranchant, conçue pour passer entre les plaques.",
    // B · ab0622962944
    "items.longblade.icon": "épée",
    // A · 9d436ddcee68
    "items.breaker.name": "Briseur",
    // B · b5e8d28b4848
    "items.breaker.tags": ["arme"],
    // B · 110688b7cca2
    "items.breaker.equipSlot": "main",
    // B · 00f2358f0a0a
    "items.breaker.description": "Une tête lourde au bout d’un long manche. Ça ne coupe pas. Ce n’est pas fait pour.",
    // B · 3b8bfccb9bbb
    "items.breaker.icon": "masse",
    // A · ea3922754f11
    "items.reach_spear.name": "Lance du Mur",
    // B · b5e8d28b4848
    "items.reach_spear.tags": ["arme"],
    // B · 110688b7cca2
    "items.reach_spear.equipSlot": "main",
    // B · 336a8a82f8de
    "items.reach_spear.description": "Deux mètres quatre-vingt de frêne et une lame en forme de feuille. La seule arme qui te laisse garder la distance que tu veux.",
    // B · fb8d6e760c4d
    "items.reach_spear.icon": "lance",
    // A · 35d08a47c99b
    "items.long_rifle.name": "Fusil à canon ancré",
    // B · b5e8d28b4848
    "items.long_rifle.tags": ["arme"],
    // B · 110688b7cca2
    "items.long_rifle.equipSlot": "main",
    // B · e74023f19cdb
    "items.long_rifle.description": "Un tir unique, un recul terrible, et la seule chose dans l’armurerie qui atteint la crête.",
    // B · 4933daa991dd
    "items.long_rifle.icon": "fusil",
    // A · 7eafbf29fa36
    "items.paired_blades.name": "Coutelas jumelés",
    // B · b5e8d28b4848
    "items.paired_blades.tags": ["arme"],
    // B · 110688b7cca2
    "items.paired_blades.equipSlot": "main",
    // B · fb5abe00d37f
    "items.paired_blades.description": "Rapides, courtes, et entièrement dépendantes du fait que tu sois là où le Behemoth n’est pas.",
    // B · 42fb7c3a878e
    "items.paired_blades.icon": "dagues",
    // A · a055d2283ff1
    "abilities.field_read.name": "Lire le terrain",
    // B · 264775f5d576
    "abilities.field_read.tags": ["utilitaire","pistage"],
    // B · d4ccd91c1818
    "abilities.field_read.description": "Traces, traînées, cassures. Ce qui est passé ici, sa taille, et depuis combien de temps.",
    // B · c44e6dd70059
    "abilities.field_read.targetRule": "AUCUNE",
    // B · a8c1fa8269c3
    "abilities.field_read.check.attribute": "esprit",
    // A · d58944c62797
    "abilities.anchor.name": "Ancre",
    // B · 31ec2d40fa6d
    "abilities.anchor.tags": ["défensif","ancrage"],
    // B · 6aab375dc2ef
    "abilities.anchor.description": "Sangle, morsure, ampoule. Ça fait mal, ça prend un quart d’heure, et après tes mains sont à toi.",
    // B · 43afef8b429c
    "abilities.anchor.targetRule": "SOI",
    // B · 4c84c2c842d0
    "abilities.anchor.check.attribute": "volonté",
    // B · 6be4b3780ad3
    "abilities.anchor.requires.lockedCopy": "Tu mets la sangle et il n’y a rien à l’autre bout pour tirer dessus.",
    // A · 78720de55e45
    "abilities.long_guard.name": "Garde longue",
    // B · 26109b4e1399
    "abilities.long_guard.tags": ["offensif","lames"],
    // B · b5a821e27795
    "abilities.long_guard.description": "Tiens la ligne de la lame entre toi et lui, et mets tout dans la seule ouverture qu’il te donne.",
    // B · 39d896e20aec
    "abilities.long_guard.targetRule": "SINGULIER",
    // B · 7ce3b6387340
    "abilities.long_guard.check.attribute": "agilité",
    // A · 98b60cf2acdd
    "abilities.overhead.name": "Frappé plongeant",
    // B · b4f1cca78026
    "abilities.overhead.tags": ["offensif","armes_lourdes"],
    // B · f24e0cd20ea6
    "abilities.overhead.description": "Tout ce que tu as, droit vers le bas, une fois. Là où ça tombe ne fait plus qu’un.",
    // B · 39d896e20aec
    "abilities.overhead.targetRule": "SINGULIER",
    // B · 97081b4b4792
    "abilities.overhead.check.attribute": "force",
    // A · 1b355fbb6bdc
    "abilities.brace_and_thrust.name": "Blocage et Estoc",
    // B · dfd0e4ff9b7f
    "abilities.brace_and_thrust.tags": ["offensif","armes_d’hast"],
    // B · 5d2884f25566
    "abilities.brace_and_thrust.description": "Le pommeau de la lance dans la terre, et laisse la chose qui arrive faire le travail.",
    // B · 39d896e20aec
    "abilities.brace_and_thrust.targetRule": "SINGULIER",
    // B · 97081b4b4792
    "abilities.brace_and_thrust.check.attribute": "force",
    // A · 68f1f6de7a22
    "abilities.crown_shot.name": "Tir en pleine tête",
    // B · ee428828b1c8
    "abilities.crown_shot.tags": ["offensif","tir"],
    // B · 9c0c59e3ddb6
    "abilities.crown_shot.description": "Une balle dans la plaque molle derrière le crâne. Tu peux le faire une fois avant qu’il sache où tu es.",
    // B · 39d896e20aec
    "abilities.crown_shot.targetRule": "SINGULIER",
    // B · a8c1fa8269c3
    "abilities.crown_shot.check.attribute": "esprit",
    // A · 3049d39de1c1
    "abilities.two_line.name": "Double ligne",
    // B · 26109b4e1399
    "abilities.two_line.tags": ["offensif","lames"],
    // B · 569c3f88037c
    "abilities.two_line.description": "Deux entailles sur le même tendon, de deux côtés, et sois ailleurs avant qu’il se retourne.",
    // B · 39d896e20aec
    "abilities.two_line.targetRule": "SINGULIER",
    // B · 7ce3b6387340
    "abilities.two_line.check.attribute": "agilité",
    // A · b92bff6d0e1d
    "abilities.close_work.name": "Travail au corps",
    // B · a95e4cb3323b
    "abilities.close_work.tags": ["offensif","formes de mains"],
    // B · a3d46b5edbc3
    "abilities.close_work.description": "À portée, là où sa taille ne l’aide plus. Articulations, yeux, la couture sous la mâchoire.",
    // B · 39d896e20aec
    "abilities.close_work.targetRule": "SINGLE",
    // B · 97081b4b4792
    "abilities.close_work.check.attribute": "puissance",
    // A · 6f58bfab4b18
    "abilities.plating_held.name": "Armure maintenue",
    // B · 8c9aa57a7c67
    "abilities.plating_held.tags": ["défensif","trait"],
    // B · 90158b8d1e5d
    "abilities.plating_held.description": "La carapace sort de la peau de ton avant-bras et tient environ neuf secondes.",
    // B · 43afef8b429c
    "abilities.plating_held.targetRule": "SELF",
    // A · e0a36e043883
    "abilities.plating_loosed.name": "Platine complet",
    // B · ba88a5e650c9
    "abilities.plating_loosed.tags": ["défensif","trait","relâché"],
    // B · d2313e82fd8e
    "abilities.plating_loosed.description": "Pas l’avant-bras. Tout, de la mâchoire jusqu’en bas, et tu ne sens rien à travers.",
    // B · 43afef8b429c
    "abilities.plating_loosed.targetRule": "SELF",
    // B · 7a58435391c8
    "abilities.plating_loosed.requires.lockedCopy": "Tes mains sont stables, mais ça n’obéit pas aux mains stables.",
    // A · d2b5e2ce28fe
    "abilities.live_wire_held.name": "Fil électrique",
    // B · cad82ff2669c
    "abilities.live_wire_held.tags": ["offensif","trait"],
    // B · 535758380c75
    "abilities.live_wire_held.description": "Une charge descend ton bras et passe dans ce que tu touches. Il faut que ce soit un contact.",
    // B · 39d896e20aec
    "abilities.live_wire_held.targetRule": "SINGLE",
    // B · 97081b4b4792
    "abilities.live_wire_held.check.attribute": "puissance",
    // A · eb8f344a3c13
    "abilities.live_wire_loosed.name": "Arc",
    // B · 407c89370f37
    "abilities.live_wire_loosed.tags": ["offensif","trait","relâché"],
    // B · 5c4b818d78ec
    "abilities.live_wire_loosed.description": "Le contact n’est plus nécessaire. Tout métal dans un rayon de six mètres fait partie du circuit, y compris les gens.",
    // B · 503eb62e7676
    "abilities.live_wire_loosed.targetRule": "AREA",
    // B · 97081b4b4792
    "abilities.live_wire_loosed.check.attribute": "puissance",
    // B · feeaf8bc23d5
    "abilities.live_wire_loosed.requires.lockedCopy": "Elle reste dans ton bras. Elle ne quitte pas un corps qui sait encore où sont ses limites.",
    // A · f0509de38127
    "abilities.shear_cry_held.name": "Cri Déchirant",
    // B · cad82ff2669c
    "abilities.shear_cry_held.tags": ["offensif","trait"],
    // B · 4ab85fb0112b
    "abilities.shear_cry_held.description": "Une note sort de ta poitrine, sous l’audition, qui fait perdre l’équilibre à tout ce qui est proche.",
    // B · e9383e6237fe
    "abilities.shear_cry_held.targetRule": "MULTI",
    // B · 4c84c2c842d0
    "abilities.shear_cry_held.check.attribute": "volonté",
    // A · 25e2fa082845
    "abilities.shear_cry_loosed.name": "Note Brisée",
    // B · 407c89370f37
    "abilities.shear_cry_loosed.tags": ["offensif","trait","relâché"],
    // B · 648442e944da
    "abilities.shear_cry_loosed.description": "La même note, tenue. Le verre se brise, les oreilles lâchent, et tous ceux qui l’ont entendue savent que c’est toi.",
    // B · 503eb62e7676
    "abilities.shear_cry_loosed.targetRule": "AREA",
    // B · 4c84c2c842d0
    "abilities.shear_cry_loosed.check.attribute": "volonté",
    // B · bd7f542e8d50
    "abilities.shear_cry_loosed.requires.lockedCopy": "La note est là et ta gorge se ferme dessus. Tu es encore trop toi.",
    // A · 5fdc52625964
    "abilities.knitting_held.name": "Tricot",
    // B · 0d1232906739
    "abilities.knitting_held.tags": ["soin","trait"],
    // B · a1be7b95c3cd
    "abilities.knitting_held.description": "Une blessure se referme sous tes yeux. Ce n’est pas sans douleur, ni sans prix.",
    // B · 43afef8b429c
    "abilities.knitting_held.targetRule": "SELF",
    // A · 545fb3e25c60
    "abilities.knitting_loosed.name": "Recomposition",
    // B · 1af849a84a60
    "abilities.knitting_loosed.tags": ["soin","trait","relâché"],
    // B · 2eb25e08aef9
    "abilities.knitting_loosed.description": "Tout se referme. Même ce qui aurait dû finir ça. Tu ne reviens pas de la même forme.",
    // B · 43afef8b429c
    "abilities.knitting_loosed.targetRule": "SELF",
    // B · 1ae911c621dd
    "abilities.knitting_loosed.requires.lockedCopy": "Tu tiens trop bien pour ça. Ça ne marche que sur quelqu’un qui est déjà en train de se défaire.",
    // A · e61462b294b0
    "abilities.kite_step_held.name": "Pas d’Asticote",
    // B · 82d73de2fe92
    "abilities.kite_step_held.tags": ["mouvement","trait"],
    // B · 4d4708271724
    "abilities.kite_step_held.description": "Une membrane s’ouvre entre le bras et les côtes pendant quatre secondes. Pas un vol. Une chute très longue, très contrôlée.",
    // B · 43afef8b429c
    "abilities.kite_step_held.targetRule": "SELF",
    // B · 7ce3b6387340
    "abilities.kite_step_held.check.attribute": "agilité",
    // A · 42867e492642
    "abilities.kite_step_loosed.name": "Aile Ouverte",
    // B · f9b520e6530e
    "abilities.kite_step_loosed.tags": ["mouvement","trait","libérée"],
    // B · b658612e1947
    "abilities.kite_step_loosed.description": "Ça continue de s’ouvrir. Tu prends de la hauteur, et tout le monde sur le rempart te regarde y arriver.",
    // B · 43afef8b429c
    "abilities.kite_step_loosed.targetRule": "SOI",
    // B · 7ce3b6387340
    "abilities.kite_step_loosed.check.attribute": "agilité",
    // B · a156c4ebba88
    "abilities.kite_step_loosed.requires.lockedCopy": "Tes épaules restent des épaules. Il n’y en a pas encore assez en toi.",
    // A · 3b7a9465a638
    "abilities.unseen_held.name": "Invisible",
    // B · 17207bd5d675
    "abilities.unseen_held.tags": ["utilitaire","trait"],
    // B · 7b256fa8cde3
    "abilities.unseen_held.description": "Tu cesses d’être intéressant à regarder. Les yeux des gens passent à travers toi et reviennent ailleurs.",
    // B · 43afef8b429c
    "abilities.unseen_held.targetRule": "SOI",
    // B · cfb7a15645c3
    "abilities.unseen_held.check.attribute": "présence",
    // A · 6a9117a97556
    "abilities.unseen_loosed.name": "Jamais Vu",
    // B · dafb286c59c4
    "abilities.unseen_loosed.tags": ["utilitaire","trait","libérée"],
    // B · d285dc06d871
    "abilities.unseen_loosed.description": "Pas seulement les yeux. Pendant environ une minute, les gens ne peuvent pas s’accrocher au fait que tu es là.",
    // B · 43afef8b429c
    "abilities.unseen_loosed.targetRule": "SOI",
    // B · cfb7a15645c3
    "abilities.unseen_loosed.check.attribute": "présence",
    // B · 47dcc863aba7
    "abilities.unseen_loosed.requires.lockedCopy": "Tu es trop solidement une personne pour ça. Il faut quelqu’un avec des bords qui ont commencé à lâcher.",
    // A · f74530cc541f
    "locations.fort_ember.name": "Fort Ember",
    // A · 637a0ca7a0a1
    "locations.fort_ember.shortName": "Le Fort",
    // B · 46eb0be2a333
    "locations.fort_ember.description": "Caserne, armurerie, cour de rassemblement et réfectoire, tout construit contre la face intérieure du mur de la ville. Ça sent l’huile, la pierre humide et la cuisine. Quelqu’un crie toujours un nom.",
    // B · 89a91ec2ae44
    "locations.fort_ember.stageImage": "story_red_moon/stage_fort_ember",
    // A · bfe9835bcc7e
    "locations.the_ramparts.name": "Les Remparts",
    // A · 0b61c7908d20
    "locations.the_ramparts.shortName": "Le Mur",
    // B · bd4cd69a9554
    "locations.the_ramparts.description": "À douze mètres de haut, assez large pour quatre de front, et ouvert à tout ce que le vent apporte. D’ici, la campagne sauvage continue jusqu’à ce qu’elle cesse d’être une couleur.",
    // B · 07346c386f31
    "locations.the_ramparts.stageImage": "story_red_moon/stage_the_ramparts",
    // A · 6ad94f2df564
    "locations.infirmary.name": "L’Infirmerie",
    // A · c8deb293e442
    "locations.infirmary.shortName": "Infirmerie",
    // B · 6a6278925767
    "locations.infirmary.description": "Trente lits, onze occupés, et une odeur d’iode qui s’infiltre dans ton manteau. La salle d’ancrage est derrière le rideau au fond et personne ne la regarde.",
    // B · a616e11839bd
    "locations.infirmary.stageImage": "story_red_moon/stage_infirmary",
    // A · 7d07ff653fa0
    "locations.voss_lab.name": "La Salle des Spécimens",
    // A · 9babb982fe2c
    "locations.voss_lab.shortName": "La Salle",
    // B · 3f5422cb853c
    "locations.voss_lab.description": "Deux étages sous terre, et plus froid que le reste du fort par conception. Du matériel de Béhémoth dans du verre, en saumure, en morceaux, catalogué par une main qui s’excite de plus en plus en descendant l’étagère.",
    // B · 58c306175a92
    "locations.voss_lab.stageImage": "story_red_moon/stage_voss_lab",
    // A · 8292193f7a83
    "locations.vale_office.name": "Le bureau du commandant Vale",
    // A · f400330b9c9c
    "locations.vale_office.shortName": "Le Commandement",
    // B · 8d97e827fbf9
    "locations.vale_office.description": "Un bureau, une carte, une chaise pour les visiteurs, et soixante ans de la Brigade dans les objets accrochés aux murs. Elle garde la fenêtre ouverte par tous les temps.",
    // B · f0c8eeac8b4d
    "locations.vale_office.stageImage": "story_red_moon/stage_vale_office",
    // A · cba63b200bae
    "locations.outer_gate.name": "La Porte Extérieure",
    // A · 98e3b52e7d6e
    "locations.outer_gate.shortName": "La Porte",
    // B · eeb41a13f2f0
    "locations.outer_gate.description": "Deux portes en fer cerclé, douze mètres de haut, et une cour d’exécution derrière. Rien ne sort sans manifeste et rien ne rentre sans être contrôlé.",
    // B · 930f0630e6dd
    "locations.outer_gate.stageImage": "story_red_moon/stage_outer_gate",
    // A · 9a3ce4eda38a
    "locations.ash_flats.name": "Les Cendres",
    // A · 3ca4cbca3127
    "locations.ash_flats.shortName": "Les Cendres",
    // B · 2df32323eacd
    "locations.ash_flats.description": "Vingt kilomètres de sable pâle là où il y avait une forêt. On voit loin, c’est la seule bonne chose, et tout le monde aussi.",
    // B · 5bd9b865f94e
    "locations.ash_flats.stageImage": "story_red_moon/stage_ash_flats",
    // A · c1f0cc5a6454
    "locations.sunken_town.name": "L’Étendue de Kelder",
    // A · 014b0e35ee49
    "locations.sunken_town.shortName": "La Ville",
    // B · 4bef5e73ea91
    "locations.sunken_town.description": "Une ville qu’un Béhémoth a traversée il y a onze ans. La moitié a coulé avec la nappe phréatique. Les gens viennent encore ici pour ce qui reste dans les maisons.",
    // B · e79d66e65436
    "locations.sunken_town.stageImage": "story_red_moon/stage_sunken_town",
    // A · 51d4210139c2
    "locations.the_undercroft.name": "La Crypte",
    // A · 3675a6f52fa5
    "locations.the_undercroft.shortName": "Crypte",
    // B · 0bef1134f5d8
    "locations.the_undercroft.description": "Sous la salle des spécimens, derrière une porte avec une serrure vieille de soixante ans. Des cellules. Onze d’entre elles. Quelqu’un les nettoie.",
    // B · 613842da1ed5
    "locations.the_undercroft.stageImage": "story_red_moon/stage_the_undercroft",
    // B · 3a5896469d2d
    "characters.lyra.name": "Capitaine Lyra Venn",
    // A · 14177f4afb50
    "characters.lyra.role": "Capitaine de ton équipe",
    // A · 9f0391628d08
    "characters.lyra.cardBlurb": "C’est elle qui t’a tiré des Cendres et elle ne t’a jamais posé une seule question — c’est pire que si elle l’avait fait.",
    // B · aee35f364a88
    "characters.lyra.pronouns": "elle",
    // A · 54248cbb2dcf
    "characters.lyra.publicTraits": ["Précise","Calme","Ne monte pas le ton"],
    // B · 959f4b84d686
    "characters.lyra.hiddenDrives": ["Elle a déjà vu ça, et ça s’est fini avec quelqu’un qu’elle aimait dans la crypte"],
    // B · e211f9b609fc
    "characters.lyra.values": ["L’équipe revient","Personne n’est mis de côté sur une suspicion","L’ordre existe pour une raison"],
    // B · 0441aa4e92ba
    "characters.lyra.fears": ["Avoir raison à ton sujet","Devoir être celle qui le rapporte"],
    // A · 499474217f98
    "characters.lyra.socialStyle": "Pose une question, puis attend plus longtemps que ça ne devrait.",
    // B · f334f0f8773c
    "characters.lyra.boundaries": ["Ne mentira pas au Commandement sur une chasse","Ne laissera pas un chasseur partir en mauvais état"],
    // B · c1d3d618c79d
    "characters.lyra.goals": ["Faire passer sa troupe à travers la saison","Découvrir ce qui s’est passé aux flats avant quelqu’un d’autre"],
    // B · f9759e9ce4d4
    "characters.lyra.secrets.lyra_saw_before.fact": "Il y a douze ans, Lyra a signalé un chasseur revenu changé. Il s’appelait Dell Arran et on ne lui a jamais dit ce qui lui était arrivé.",
    // B · 47558a04be8d
    "characters.lyra.secrets.lyra_saw_before.visibility": "NPC_PRIVATE",
    // B · 4e1b27f9658b
    "characters.lyra.secrets.lyra_saw_before.revealHint": "Confiance 45+, en privé, et seulement après qu’elle ait décidé que le joueur ne va plus lui mentir.",
    // B · 7a259cc855fe
    "characters.lyra.secrets.lyra_kept_the_report.fact": "Son rapport écrit sur les plaines omet l’état des côtes du joueur. Elle n’a pas déposé l’addendum.",
    // B · 47558a04be8d
    "characters.lyra.secrets.lyra_kept_the_report.visibility": "NPC_PRIVATE",
    // B · 372d82aec80c
    "characters.lyra.secrets.lyra_kept_the_report.revealHint": "Se révèle si le joueur admet ce qu’il est, ou si la suspicion devient assez forte pour qu’elle doive choisir.",
    // A · 526868bab3b5
    "characters.lyra.speechStyle": "Des phrases courtes. Elle dit les noms. Le silence, c’est une question.",
    // A · 0f4241a9cfc2
    "characters.lyra.topics": ["les quartiers","les six","l’ordre permanent","tes côtes","le roster"],
    // A · 94bacfa82315
    "characters.lyra.voiceSamples": ["T’étais dessous pendant deux heures. Raconte-moi la deuxième.","J’écris rien que j’ai pas vu.","Assieds-toi avant de tomber. C’est pas une demande."],
    // B · 87a3ed2eb0ad
    "characters.lyra.appearance": "Fin de la trentaine, cheveux gris-noir très courts, manteau de la Brigade usé aux coudes.",
    // B · 74042faacc7f
    "characters.lyra.visualHook": "Une vieille brûlure cicatrisée sur le côté gauche du cou et de la mâchoire qu’elle n’a jamais expliquée.",
    // B · 05c1615e9105
    "characters.lyra.silhouette": "Carrée, mains dans le dos, manteau toujours ouvert par tous les temps.",
    // B · 15546ecc3ef3
    "characters.lyra.artSeed": "red_moon_lyra_v1",
    // B · 3686815d6c6b
    "characters.lyra.portrait": "story_red_moon/lyra",
    // B · 3bbc66fc627b
    "characters.lyra.expressions": ["neutre","vigilante","fatiguée","dure"],
    // B · f2dc7cad9400
    "characters.lyra.knowledgeScope": ["les plaines","l’ordre permanent","procédure de la brigade"],
    // B · 0083325c0ee7
    "characters.lyra.gates.lyra_confides.label": "Elle te parle de Dell Arran",
    // B · 55a54e80451a
    "characters.lyra.gates.lyra_confides.kind": "CONFIANCE",
    // B · 66774037be49
    "characters.lyra.gates.lyra_confides.requires.flagsSet": ["spoke :lyra"],
    // B · 9b2daabe0028
    "characters.lyra.gates.lyra_covers.label": "Elle dépose un rapport qui n’est pas tout à fait vrai",
    // B · 9e8ae18bf8bf
    "characters.lyra.gates.lyra_covers.kind": "ALLIANCE",
    // B · b9b8c44d7b2b
    "characters.lyra.gates.lyra_covers.requires.flagsSet": ["lyra_knows"],
    // B · 26ba6ce816d6
    "characters.lyra.combatant.tags": ["vétéran","lames"],
    // B · db840207675c
    "characters.ren.name": "Ren Calder",
    // A · fdcf5b567f00
    "characters.ren.role": "L’autre recrue qui devait être premier.",
    // A · dcfb772e00f0
    "characters.ren.cardBlurb": "Ton ami le plus proche dans la Brigade, arrivé premier à l’intégration, et qui cherche discrètement pourquoi tu ne perds plus contre lui.",
    // B · fcca6b746d0b
    "characters.ren.pronouns": "il/lui",
    // A · 94f47e2c6721
    "characters.ren.publicTraits": ["Sympathie","Compétiteur","Parle de tout"],
    // B · 78aadb0c7d6e
    "characters.ren.hiddenDrives": ["Être le meilleur est le seul plan qu’il ait jamais eu"],
    // B · b71009c9d27b
    "characters.ren.values": ["Le mériter","Dire les choses à voix haute","Les gens avec qui il est arrivé"],
    // B · e0babedd0220
    "characters.ren.fears": ["Être ordinaire","Que tu lui caches quelque chose spécialement"],
    // A · 1a14a479add0
    "characters.ren.socialStyle": "Il commence par une blague, puis fait sérieux, puis parle sans s’arrêter.",
    // B · 834cd5b51116
    "characters.ren.boundaries": ["Ne fera pas semblant d’aller bien quand ce n’est pas le cas","Ne couvrira pas quelque chose qui fait tuer des gens"],
    // B · 3b4d9ed711c2
    "characters.ren.goals": ["Devenir Lance avant la fin de la saison","Découvrir ce qui a changé chez toi"],
    // B · a30ee9054c98
    "characters.ren.secrets.ren_asked_voss.fact": "Ren a déjà demandé deux fois au Dr Voss ce qu’il arrive aux chasseurs qui reviennent différents. Il n’a pas dit pour qui il posait la question.",
    // B · 47558a04be8d
    "characters.ren.secrets.ren_asked_voss.visibility": "NPC_PRIVATE",
    // B · d9b7c4d424e6
    "characters.ren.secrets.ren_asked_voss.revealHint": "Se révèle quand il est ivre, coincé, ou après que le joueur lui ait menti sur un détail.",
    // A · aacc87ce2150
    "characters.ren.speechStyle": "Rapide, chaleureux, auto-dérisoire, et de moins en moins drôle quand ça compte.",
    // A · b8c08c65f618
    "characters.ren.topics": ["le jury d’intégration","les six","ce qui s’est passé là-bas","comment on fait Lance","le Dr Voss"],
    // A · 6bfdb3d5e581
    "characters.ren.voiceSamples": ["Tu as eu dix-neuf ans le mois dernier. J’ai vérifié.","Je te demande pas ça en rivale. Je te le demande parce que j’aurais dû être à cette porte avec toi.","Dis ce que tu as à dire. N’importe quoi. Dis-le juste."],
    // B · a439503eff62
    "characters.ren.appearance": "Vingt-deux ans, large, cheveux sable qu’il se coupe mal lui-même.",
    // B · b36eecca8ceb
    "characters.ren.visualHook": "Un manteau de la brigade deux tailles trop grand qui appartenait à son frère, manches retournées deux fois.",
    // B · b239b366133f
    "characters.ren.silhouette": "Décontracté et ouvert, toujours à moitié tourné vers la personne à qui il parle.",
    // B · 89832b7614f2
    "characters.ren.artSeed": "red_moon_ren_v1",
    // B · 7c8c2e8770cd
    "characters.ren.portrait": "story_red_moon/ren",
    // B · 1b1167257716
    "characters.ren.expressions": ["neutre","souriant","blessé","méfiant"],
    // B · 7ceb55a6b6bb
    "characters.ren.knowledgeScope": ["l’arrivée","ragots de la brigade","les six"],
    // B · 78a9b4dc56fa
    "characters.ren.gates.ren_loyal.label": "Il décide qu’il est avec toi quoi que tu sois",
    // B · 9e8ae18bf8bf
    "characters.ren.gates.ren_loyal.kind": "ALLIANCE",
    // B · 79d018953ffe
    "characters.ren.gates.ren_loyal.requires.flagsSet": ["ren_knows"],
    // B · 44fc2db9d5cc
    "characters.ren.gates.ren_breaks.label": "Il ne peut plus le tenir",
    // B · 77dcad9b37cc
    "characters.ren.gates.ren_breaks.kind": "AUTRE",
    // B · ce513b3e26f6
    "characters.ren.gates.ren_breaks.requires.flagsSet": ["a_parlé :ren"],
    // B · 302a0005618a
    "characters.ren.combatant.tags": ["recrue","lames"],
    // B · 7184ba8d6fc5
    "characters.elian.name": "Dr Elian Voss",
    // A · 340b164e23e5
    "characters.elian.role": "Chercheur sur les Behemoths",
    // A · 7058ba79bb00
    "characters.elian.cardBlurb": "Il a voulu t’examiner deux fois. Il n’est pas sinistre — juste content, ce qui est encore plus dur à refuser.",
    // B · fcca6b746d0b
    "characters.elian.pronouns": "il/lui",
    // A · 7819ea0119be
    "characters.elian.publicTraits": ["Content","Brut de décoffrage","Vraiment brillant"],
    // B · 7a8ba7165844
    "characters.elian.hiddenDrives": ["Il veut être celui qui prouve ce que sont vraiment les Behemoths"],
    // B · 61202bbe1e4a
    "characters.elian.values": ["Savoir","Dire la vérité sur les données","Ne pas gaspiller un spécimen"],
    // B · 4aa83fc3e9e4
    "characters.elian.fears": ["Qu’on l’arrête avant qu’il ait fini","Avoir raison sur l’origine des Behemoths"],
    // A · 9418de0f3075
    "characters.elian.socialStyle": "Il te parle comme si tu avais déjà dit oui. Oublie d’avoir peur.",
    // B · 0e2b8b0017c0
    "characters.elian.boundaries": ["Ne falsifiera pas un résultat","Ne livrera pas un sujet vivant au Conseil"],
    // B · 3d5685f1dae8
    "characters.elian.goals": ["Obtenir un spécimen de cœur encore chaud","Publier avant que le Commandement l’arrête"],
    // B · 3ccd241174ec
    "characters.elian.secrets.voss_undercroft.fact": "Voss a la clé de la crypte et nourrit ce qu’il y a dans la quatrième cellule depuis deux ans.",
    // B · 47558a04be8d
    "characters.elian.secrets.voss_undercroft.visibility": "NPC_PRIVÉ",
    // B · 48aa745b9fae
    "characters.elian.secrets.voss_undercroft.revealHint": "Confiance 40+, ou le joueur trouve la porte et lui demande directement.",
    // B · bb254d3d517e
    "characters.elian.secrets.voss_human_tissue.fact": "Le tissu de Behemoth et le tissu humain sont plus proches qu’ils ne devraient. Voss l’a testé onze fois et a arrêté de noter.",
    // B · 47558a04be8d
    "characters.elian.secrets.voss_human_tissue.visibility": "NPC_PRIVÉ",
    // B · 9d42542eb4e4
    "characters.elian.secrets.voss_human_tissue.revealHint": "En milieu d’histoire. Il le dit à celui qui semble le moins susceptible de l’arrêter.",
    // A · 23804508a888
    "characters.elian.speechStyle": "Enthousiaste, trop précis, il part en vrille en plein milieu pour aller au plus intéressant.",
    // A · 7325c703e044
    "characters.elian.topics": ["le cœur","anatomie des Behemoths","l’ordre permanent","la crypte","tes mains"],
    // A · c3951ca86b19
    "characters.elian.voiceSamples": ["Neuf secondes. Neuf. Tu te rends compte à quel point c’est fou, ou faut que t’explique ?","Je vais rien dire à personne. Pas pour toi. Pour l’échantillon.","Tout le monde me demande ce que c’est. Personne ne me demande ce que c’était."],
    // B · 875eb1bb3e2d
    "characters.elian.appearance": "Cinquante ans, petit, encre jusqu’aux coudes, lunettes repoussées dans des cheveux gris en bataille.",
    // B · 95f419e4a3e0
    "characters.elian.visualHook": "Deux doigts manquent à sa main gauche, remplacés par une attelle en laiton qu’il a fabriquée lui-même.",
    // B · d2028a2fd19e
    "characters.elian.silhouette": "Courbé et rapide, toujours chargé de plus qu’il ne peut porter.",
    // B · 85742c388c1b
    "characters.elian.artSeed": "red_moon_elian_v1",
    // B · 064c711552c5
    "characters.elian.portrait": "story_red_moon/elian",
    // B · bd4abcc3de7f
    "characters.elian.expressions": ["neutre","ravi","urgent","grave"],
    // B · 6b0d355f6cdb
    "characters.elian.knowledgeScope": ["anatomie des Behemoths","la crypte","l’ordre permanent"],
    // B · 4b0f53595ebe
    "characters.elian.gates.voss_partnership.label": "Il commence à te dire ce qu’il a vraiment trouvé",
    // B · 55a54e80451a
    "characters.elian.gates.voss_partnership.kind": "CONFIANCE",
    // B · 325bc7d6be89
    "characters.elian.gates.voss_partnership.requires.flagsSet": ["voss_sait"],
    // B · e454a3149c1d
    "characters.serah.name": "Commandante Serah Vale",
    // A · 9035a258b4c2
    "characters.serah.role": "Commandante de la Brigade",
    // A · 30135be6ba11
    "characters.serah.cardBlurb": "Elle a tué plus de Behemoths que n’importe qui, elle ne t’a jamais demandé ce qu’il s’est passé aux plaines, et elle connaît mieux les gens comme toi que personne n’a eu le temps d’apprendre.",
    // B · aee35f364a88
    "characters.serah.pronouns": "elle/la",
    // A · c70fd5efaf9b
    "characters.serah.publicTraits": ["Légendaire","Impassible","Gentille d’une manière qui ne rassure pas"],
    // B · ba458c132f42
    "characters.serah.hiddenDrives": ["Elle gère ça depuis quarante ans et en a marre"],
    // B · d812364e302c
    "characters.serah.values": ["Les onze cités","Ne pas mentir en face à un soldat","Finir ça correctement"],
    // B · 26de17b3ae2b
    "characters.serah.fears": ["Qu’il n’existe aucune version où la Brigade est du bon côté"],
    // A · d6d5388a10ef
    "characters.serah.socialStyle": "Sympathique, directe, et répond souvent à une autre question que celle qu’on lui a posée.",
    // B · 3dfd01495c91
    "characters.serah.boundaries": ["Ne donnera pas un ordre d’exécution qu’elle ne pourrait pas exécuter elle-même","Ne fera pas semblant que l’ordre n’existe pas"],
    // B · d454a7b4553d
    "characters.serah.goals": ["Tenir le mur une saison de plus","Décider de ton sort avant que le Conseil ne le fasse"],
    // B · 893022f554b3
    "characters.serah.secrets.serah_is_one.fact": "Serah Vale est revenue changée il y a quarante et un ans. Elle ancre tous les huit jours depuis, et ça commence à ne plus marcher.",
    // B · 47558a04be8d
    "characters.serah.secrets.serah_is_one.visibility": "NPC_PRIVÉ",
    // B · 074e038d7d4b
    "characters.serah.secrets.serah_is_one.revealHint": "Très tard. Seulement à un joueur qui lui a dit la vérité d’abord, ou qui la surprend en train d’ancrer.",
    // B · bf7196f07705
    "characters.serah.secrets.serah_wrote_the_order.fact": "L’ordre permanent est entre ses mains. Elle l’a écrit à propos d’elle-même, pour que celui qui viendrait après ait quelque chose à suivre.",
    // B · 47558a04be8d
    "characters.serah.secrets.serah_wrote_the_order.visibility": "NPC_PRIVÉ",
    // B · c50fad57bca3
    "characters.serah.secrets.serah_wrote_the_order.revealHint": "Se révèle avec ce qui précède, ou dans les archives de la crypte.",
    // A · a06f0133d114
    "characters.serah.speechStyle": "Calme, simple, et parfois très drôle. Ne dit jamais plus que ce qu’elle veut vraiment.",
    // A · 43fb3d82859b
    "characters.serah.topics": ["l’ordre permanent","les onze cités","les souterrains","Dell Arran","les baraquements"],
    // A · e7b05c91486f
    "characters.serah.voiceSamples": ["Assieds-toi. Tu es debout depuis les baraquements, ça se voit.","J’ai lu ce rapport quatre fois. C’est un bon rapport. Ce n’est pas un rapport complet.","Je ne vais pas te demander ce que tu es. Je vais te demander ce que tu comptes faire, avec ça."],
    // B · f5b947b90181
    "characters.serah.appearance": "Soixante ans, droite, cheveux blancs coupés comme une recrue, mains scarifiées jusqu’aux articulations.",
    // B · a762912459c1
    "characters.serah.visualHook": "Elle ne porte aucun rang — juste un manteau simple — et tout le monde la connaît de toute façon.",
    // B · 5349ce590430
    "characters.serah.silhouette": "Dos droit, immobile, la seule personne dans le fort qui n’est jamais pressée.",
    // B · 372d419340d5
    "characters.serah.artSeed": "red_moon_serah_v1",
    // B · c95fd106b2a7
    "characters.serah.portrait": "story_red_moon/serah",
    // B · 2bbaf35b590e
    "characters.serah.expressions": ["neutre","amusée","grave","fatiguée"],
    // B · b58397ac865e
    "characters.serah.knowledgeScope": ["l’ordre permanent","la crypte","quarante ans d’hybrides"],
    // B · 19fec014fce0
    "characters.serah.gates.serah_levels.label": "Elle arrête de te gérer et commence à te parler",
    // B · 55a54e80451a
    "characters.serah.gates.serah_levels.kind": "CONFIANCE",
    // B · 626caaf1c86f
    "characters.serah.gates.serah_levels.requires.flagsSet": ["serah_sait"],
    // B · e0a5a7438252
    "characters.serah.combatant.tags": ["légende","lames"],
    // B · f7b2c675cbe5
    "characters.ossa.name": "Ossa Kerrin",
    // A · 3c0341a38b51
    "characters.ossa.role": "Intendant",
    // A · be6d6ea84d09
    "characters.ossa.cardBlurb": "Gère l’armurerie, connaît l’équipement de chaque chasseur et quand il le prend, et a remarqué que tu ne signes plus la sortie d’un bouclier.",
    // B · 9bdf0106d724
    "characters.ossa.pronouns": "iel/iel",
    // A · 62b77a35347b
    "characters.ossa.publicTraits": ["Sèche","Observateur","Incorruptible"],
    // B · 69a72bf0ee41
    "characters.ossa.hiddenDrives": ["Iel tient une liste privée de tous ceux qui sont revenus changés, sur neuf ans"],
    // B · 274cf3ca3ea2
    "characters.ossa.values": ["Que le livre ait raison","Que les gens reviennent","Ne pas se faire mentir sur le matériel"],
    // B · f593473eb392
    "characters.ossa.fears": ["Signer du matériel pour quelqu’un qui va mourir avec"],
    // A · df3d6abb158d
    "characters.ossa.socialStyle": "Répond d’abord avec un chiffre, puis une vanne.",
    // B · 548bb0d96cac
    "characters.ossa.boundaries": ["Ne délivre pas hors règlement","Ne rapporte pas un pressentiment"],
    // B · 328735565256
    "characters.ossa.goals": ["Garder l’armurerie honnête","Comprendre ce que signifie la liste"],
    // B · dbdec7798173
    "characters.ossa.secrets.ossa_list.fact": "Ossa a neuf noms. Quatre sont allés à l’infirmerie et n’en sont jamais sortis. Trois ont été mutés à des postes qui n’existent pas. Deux sont encore sur le registre.",
    // B · 47558a04be8d
    "characters.ossa.secrets.ossa_list.visibility": "NPC_PRIVATE",
    // B · 9e2a6821b97f
    "characters.ossa.secrets.ossa_list.revealHint": "Confiance 35+, et seulement quelque part où le livre n’est pas ouvert.",
    // A · 16b6447a6851
    "characters.ossa.speechStyle": "Sec, drôle, tout en détails précis.",
    // A · 4078182eac65
    "characters.ossa.topics": ["le livre de l’armurerie","ton équipement","les neuf","ce que les gens dessinent"],
    // A · 6021f86e6f68
    "characters.ossa.voiceSamples": ["Épée longue, une. Bouclier, zéro, troisième semaine de suite. Signe ici.","Je ne demande pas. Je dis que j’ai remarqué, c’est pas pareil.","Tout ce qui rentre ici ressort ou se note. Souvent les deux."],
    // B · 974da0a7974c
    "characters.ossa.appearance": "Quarantaine, épaules larges, manches toujours retroussées.",
    // B · 205462d53aa7
    "characters.ossa.visualHook": "Un compteur en laiton sur une chaîne autour du cou, qu’iel clique sans y penser.",
    // B · cbb27b77bbcf
    "characters.ossa.silhouette": "Planté derrière un comptoir, registre ouvert, une main dessus.",
    // B · de7add2a0451
    "characters.ossa.artSeed": "red_moon_ossa_v1",
    // B · 1650a4dc0641
    "characters.ossa.portrait": "story_red_moon/ossa",
    // B · 801a0ee51de8
    "characters.ossa.expressions": ["neutre","sec","inquiet"],
    // B · b9d28cff8d33
    "characters.ossa.knowledgeScope": ["l’armurerie","qui prend quoi","les neuf"],
    // B · df01c294e6aa
    "characters.ossa.gates.ossa_shows_list.label": "Iel te montre la liste",
    // B · 55a54e80451a
    "characters.ossa.gates.ossa_shows_list.kind": "CONFIANCE",
    // B · 473fc21fa716
    "characters.ossa.gates.ossa_shows_list.requires.flagsSet": ["parlé :ossa"],
    // B · 491aaf10f90e
    "characters.wick.name": "Wick",
    // A · bd37834df025
    "characters.wick.role": "Quelqu’un d’autre que les Behemoths n’ont pas fini",
    // A · c30eacf18bf1
    "characters.wick.cardBlurb": "Revenu changé neuf ans avant toi, il habite depuis dans une ville en ruines. Il sait exactement ce qui t’arrive.",
    // B · aee35f364a88
    "characters.wick.pronouns": "elle",
    // A · afdac90d72c0
    "characters.wick.publicTraits": ["Calme","Physiquement pas normal, en petits détails","Terriblement drôle"],
    // B · 3d92387a171c
    "characters.wick.hiddenDrives": ["Elle veut qu’une autre personne ait choisi ça exprès"],
    // B · 696a9721d091
    "characters.wick.values": ["Ne pas retourner","Dire la vérité sur le prix à payer","Les autres dans la ville"],
    // B · 9ac8f6fbf7a3
    "characters.wick.fears": ["Que la Brigade ait raison","Oublier un visage qu’elle connaissait"],
    // A · 012d7bd0f97b
    "characters.wick.socialStyle": "Franc sur les horreurs, doux sur les petits trucs.",
    // B · 4f43da36bb76
    "characters.wick.boundaries": ["Ne rentre pas dans un mur","Ne recrute personne qui n’a pas vu le prix à payer"],
    // B · 774e5b8a979a
    "characters.wick.goals": ["Garder la ville cachée","Te montrer ce que c’est que quarante, et ce que c’est que quatre-vingts"],
    // B · e0113ff70647
    "characters.wick.secrets.wick_knows_serah.fact": "Wick a rencontré le commandant Vale. Vale l’a laissée partir, et lui a dit de ne pas revenir.",
    // B · 47558a04be8d
    "characters.wick.secrets.wick_knows_serah.visibility": "NPC_PRIVATE",
    // B · 6816caf0ae48
    "characters.wick.secrets.wick_knows_serah.revealHint": "Confiance 40+, ou si le joueur mentionne Vale nommément.",
    // A · 127450b52f5a
    "characters.wick.speechStyle": "Sympa, ironique, et trop habitué pour que quoi que ce soit d’un gars derrière un mur le choque.",
    // A · 5b0f69852f67
    "characters.wick.topics": ["la ville","l’ancrage","ce qui arrive à quatre-vingts","la Brigade","le commandant Vale"],
    // A · f1703f6cd4e3
    "characters.wick.voiceSamples": ["Neuf secondes. C’est cool. Reviens voir dans un an.","L’équipement marche. C’est ça le problème.","Je vais pas te dire où aller. Je vais te dire ce qu’il y a des deux côtés."],
    // B · e59692d12bc7
    "characters.wick.appearance": "Trentenaire, marqué par la vie, cheveux coupés au couteau.",
    // B · 682c720d0e5f
    "characters.wick.visualHook": "Une bande pâle de plaques de carapace sur les clavicules qui ne disparaît jamais, comme une cicatrice qui a poussé.",
    // B · d3974c8c6380
    "characters.wick.silhouette": "Lâche, épaules basses, se tient un peu trop immobile.",
    // B · c2c537d92158
    "characters.wick.artSeed": "red_moon_wick_v1",
    // B · bb0a8e1e6876
    "characters.wick.portrait": "story_red_moon/wick",
    // B · 0854a8dc4646
    "characters.wick.expressions": ["neutre","ironique","sérieuse"],
    // B · 4109faf89939
    "characters.wick.knowledgeScope": ["hybrides","ancrage","la ville","le commandant Vale"],
    // B · 1b0cf3b86572
    "characters.wick.gates.wick_teaches.label": "Elle te montre ce qu’elle sait faire",
    // B · 55a54e80451a
    "characters.wick.gates.wick_teaches.kind": "CONFIANCE",
    // B · b53386ba96b8
    "characters.wick.gates.wick_teaches.requires.flagsSet": ["rencontré :wick"],
    // B · c91b882984b4
    "characters.wick.combatant.tags": ["hybride"],
    // B · b239592047e0
    "characters.vaultback.name": "Le Vaultback",
    // A · cdf699f16011
    "characters.vaultback.role": "Behemoth — blindé, fouisseur",
    // A · bcb89df8cbc8
    "characters.vaultback.cardBlurb": "Celui qui a tué ton équipe. Douze mètres de dos blindé et une gueule en-dessous. Il est mort. La part de lui qui est en toi, non.",
    // B · 1579cee106f6
    "characters.vaultback.pronouns": "il/son",
    // A · 8e0cf75f641d
    "characters.vaultback.publicTraits": ["Énorme","Blindé","Indifférent"],
    // A · 8d6f55afcb0f
    "characters.vaultback.socialStyle": "Il ne parle pas. Il émet des sons, mais ce n’est pas du langage.",
    // B · 8d79332dd5f8
    "characters.vaultback.goals": ["Se déplacer sous terre vers la chaleur"],
    // A · c32a88ecaf43
    "characters.vaultback.speechStyle": "Il ne parle pas. Chaque phrase est un son, pas des mots — un grincement sous la terre, un glissement de plaques.",
    // B · ed9f82258aa6
    "characters.vaultback.appearance": "Douze mètres de long, un dos de plaques grises imbriquées, pas d’yeux visibles.",
    // B · c459e5cd10d2
    "characters.vaultback.visualHook": "Une plaque continue sur la colonne vertébrale, fendue par une vieille blessure jamais refermée.",
    // B · e3b4ee8ed983
    "characters.vaultback.silhouette": "Une crête mouvante dans le sol.",
    // B · c1e3d50d3b4f
    "characters.vaultback.artSeed": "red_moon_vaultback_v1",
    // B · 1c0000925db7
    "characters.vaultback.portrait": "story_red_moon/vaultback",
    // B · e7b3f032f0b6
    "characters.vaultback.expressions": ["neutre"],
    // B · 04579650a680
    "characters.vaultback.combatant.tags": ["béhémoth","blindé"],
    // B · 21755a904184
    "characters.nettlejaw.name": "Le Nettlejaw",
    // A · fe0bcd555cd7
    "characters.nettlejaw.role": "Béhémoth — électrique",
    // A · 89e41452252b
    "characters.nettlejaw.cardBlurb": "Long, bas et humide, il se cache dans les égouts sous le quartier extérieur. Tes poils se dresseront à dix mètres avant que tu le voies.",
    // B · 1579cee106f6
    "characters.nettlejaw.pronouns": "il/son",
    // A · 995627b847c8
    "characters.nettlejaw.publicTraits": ["Rapide","Chargé","Attiré par le métal"],
    // A · 8d6f55afcb0f
    "characters.nettlejaw.socialStyle": "Il ne parle pas. Il émet des sons, mais ce n’est pas du langage.",
    // B · f045d9d32899
    "characters.nettlejaw.goals": ["Suivre le courant"],
    // A · 00aad14af430
    "characters.nettlejaw.speechStyle": "Il ne parle pas. Un bourdonnement qui monte, un craquement, l’odeur avant l’orage.",
    // B · 24edf4c34938
    "characters.nettlejaw.appearance": "Six mètres de peau sombre et humide, une mâchoire comme un piège à ours, une lumière bleue sous la peau.",
    // B · b31ae10e495a
    "characters.nettlejaw.visualHook": "Veines de lumière bleue qui s’illuminent sur ses flancs une demi-seconde avant qu’il bouge.",
    // B · 630257006bd7
    "characters.nettlejaw.silhouette": "Bas et long, la tête plus basse que les épaules.",
    // B · ff358365659b
    "characters.nettlejaw.artSeed": "red_moon_nettlejaw_v1",
    // B · 5ea2963e1b56
    "characters.nettlejaw.portrait": "story_red_moon/nettlejaw",
    // B · e7b3f032f0b6
    "characters.nettlejaw.expressions": ["neutre"],
    // B · 37b02484a08d
    "characters.nettlejaw.combatant.tags": ["béhémoth","électrique"],
    // B · cea5acec800d
    "characters.quiet_one.name": "Le Silencieux",
    // A · 9bcf625df904
    "characters.quiet_one.role": "Béhémoth — ou peut-être pas",
    // A · a92e4fb2999f
    "characters.quiet_one.cardBlurb": "Personne ne sait comment le décrire. Onze personnes ont déjà ressenti deux fois ce que tu as ressenti — cette impression d’être observé là où tu as déjà regardé.",
    // B · 1579cee106f6
    "characters.quiet_one.pronouns": "il/son",
    // A · 5527af654577
    "characters.quiet_one.publicTraits": ["Invisible","Sait attendre","À côté de la plaque"],
    // B · 2e4cd0bf7c7c
    "characters.quiet_one.hiddenDrives": ["Il cherche la même chose que le joueur"],
    // A · b80ea6edbc2e
    "characters.quiet_one.socialStyle": "Il n’a jamais parlé. Aucun compte rendu ne signale une tentative. Ce n’est pas la même chose que de dire qu’il en est incapable.",
    // B · 86aa122fc1d2
    "characters.quiet_one.goals": ["Être près de ceux qui sont revenus"],
    // B · b60c6e944246
    "characters.quiet_one.secrets.quiet_one_was_a_person.fact": "Le Silencieux était Dell Arran. Il reste assez de lui pour avoir suivi le joueur jusqu’à la maison.",
    // B · 47558a04be8d
    "characters.quiet_one.secrets.quiet_one_was_a_person.visibility": "NPC_PRIVATE",
    // B · adcd4a9074bc
    "characters.quiet_one.secrets.quiet_one_was_a_person.revealHint": "La dernière chose que ce monde dit à quelqu’un. Jamais avant la crypte.",
    // A · 2f6d1e418dd9
    "characters.quiet_one.speechStyle": "Le silence. S’il devait un jour parler, ça serait une phrase courte qui ferait l’effet d’un choc.",
    // B · a3c59dd7de55
    "characters.quiet_one.appearance": "Non enregistré. Chaque témoignage contredit le précédent.",
    // B · 9b4238834608
    "characters.quiet_one.visualHook": "L’endroit où il se tenait, un instant après qu’il a cessé de s’y tenir.",
    // B · 30ce0e06fb4f
    "characters.quiet_one.silhouette": "Presque humain et trop grand.",
    // B · 09e499e0150e
    "characters.quiet_one.artSeed": "red_moon_quiet_v1",
    // B · 13dd2de1076f
    "characters.quiet_one.portrait": "story_red_moon/quiet_one",
    // B · e7b3f032f0b6
    "characters.quiet_one.expressions": ["neutre"],
    // B · bbdae20c7e4b
    "characters.quiet_one.knowledgeScope": ["hybrides","le soubassement"],
    // B · 7b5b6daca422
    "characters.quiet_one.combatant.tags": ["béhémoth","intelligent"],
    // B · e2efcc9479dc
    "factions.faction_brigade.name": "La Brigade",
    // B · 6ac9c63e4318
    "factions.faction_brigade.description": "L’ordre militaire qui chasse les Béhémoths et tient le mur. Ton employeur, ta famille, et celui qui a un ordre permanent sur les gens comme toi.",
    // B · 0054f42036a0
    "factions.faction_council.name": "Le Conseil de la Ville",
    // B · 10af1b2e8691
    "factions.faction_council.description": "L’autorité civile de Fort Ember. Paye la Brigade, la méprise, et voudrait beaucoup savoir ce qu’il y a dans le soubassement.",
    // B · f2dbb7c8ee84
    "factions.faction_hybrids.name": "Ceux Qui Sont Revenus",
    // B · d0455866a3e5
    "factions.faction_hybrids.description": "D’autres personnes que les Béhémoths n’ont pas achevées. Ils sont plus nombreux que la Brigade ne l’admet et moins qu’elle ne craint.",
    // B · fb7fa6c0abc3
    "quests.q_back_on_the_roster.title": "De Retour au Roster",
    // B · b8aa3400f937
    "quests.q_back_on_the_roster.summary": "Ton premier jour de retour après les flats. Tout le monde veut une version de ce qui s’est passé, et tu dois décider qui a la sienne.",
    // B · 7fcc0be2ad9c
    "quests.q_back_on_the_roster.kind": "PRINCIPALE",
    // B · b1fbf3b9a85e
    "quests.q_back_on_the_roster.steps.step_report_in.playerCopy": "Tiens toute la matinée sans que tes mains te trahissent.",
    // B · a717597f0a2e
    "quests.q_back_on_the_roster.steps.step_report_in.directorNotes": "Ce matin, tout le monde veut quelque chose du joueur, et aucun n’est hostile. Venn veut la deuxième heure de la chasse. Calder veut savoir pourquoi son ami s’est tu. Voss veut neuf secondes d’avant-bras. Kerrin veut savoir pourquoi le bouclier n’a pas été signé depuis trois semaines. Quatre pressions différentes, un matin, et pas d’ordre correct pour les gérer.",
    // B · ade23e8fc03e
    "quests.q_back_on_the_roster.steps.step_who_knows.playerCopy": "Décide qui, si quelqu’un, découvre ce que tu es.",
    // B · 1e735331d23f
    "quests.q_back_on_the_roster.steps.step_who_knows.directorNotes": "Le choix lourd du premier acte, qui ne doit jamais être forcé. Un joueur peut traverser toute l’histoire sans rien dire à personne — c’est une vraie voie et la plus dure. Chacun réagit différemment : Venn a la procédure, Calder a les sentiments, Voss a son labo. Personne ne réagit comme le joueur s’y attend, et personne n’est un piège.",
    // B · 9f91d6462b24
    "quests.q_back_on_the_roster.steps.step_who_knows.enterWhen.flagsSet": ["reported_in"],
    // B · 5e01cb20c31e
    "quests.q_back_on_the_roster.involvedCharacterIds": ["lyra","ren","elian","ossa"],
    // B · b2a9d5c3ac13
    "quests.q_back_on_the_roster.involvedLocationIds": ["fort_ember","infirmerie","labo_voss","bureau_vale"],
    // B · 7be32b8a67b3
    "quests.q_back_on_the_roster.knownRewardCopy": "Un jour de survie, et une personne de moins à qui mentir.",
    // B · b6af0c42a8c3
    "quests.q_the_nettlejaw.title": "Quelque chose dans les Égouts",
    // B · a2e2ea6b2db1
    "quests.q_the_nettlejaw.summary": "Quelque chose d’électrique est dans le réseau d’eau sous le quartier extérieur. Il a pris deux personnes et ne les a pas lâchées.",
    // B · 7fcc0be2ad9c
    "quests.q_the_nettlejaw.kind": "PRINCIPALE",
    // B · 9f91d6462b24
    "quests.q_the_nettlejaw.discoverWhen.flagsSet": ["reported_in"],
    // B · ee9e5ba4192c
    "quests.q_the_nettlejaw.steps.step_find_it.playerCopy": "Découvre ce qui est vraiment là-dessous avant d’y aller.",
    // B · 8d0faa43805c
    "quests.q_the_nettlejaw.steps.step_find_it.directorNotes": "Toutes les missions ne sont pas tuer-le-monstre, et celle-ci commence par une enquête. Lire le terrain, interroger les proches des disparus, ou simplement aller voir sont valides. Un joueur qui fonce sans ça devrait avoir plus de mal, pas être bloqué.",
    // B · 0d9a494f4301
    "quests.q_the_nettlejaw.steps.step_deal_with_it.playerCopy": "Gère ça.",
    // B · 72c06491da8c
    "quests.q_the_nettlejaw.steps.step_deal_with_it.directorNotes": "Neuf façons. Six sont l’arme en main du joueur, chacune tue différemment — la lance l’empêche de s’approcher, le briseur lui arrache la mâchoire, la voie mains nues empêche l’enquête de savoir ce qui l’a tué. Le repousser vers les flats est plus dur et le laisse vivant. Utiliser un trait devant Calder est la plus rapide et la plus chère. Un joueur qui évacue les égouts et ouvre l’écluse le règle sans le toucher. Quelle que soit la méthode, le cœur est une minute de tissu chaud après, et il faudra décider de ça aussi.",
    // B · 8f095d9a4d42
    "quests.q_the_nettlejaw.steps.step_deal_with_it.enterWhen.flagsSet": ["nettlejaw_identified"],
    // B · 647e96738560
    "quests.q_the_nettlejaw.steps.step_deal_with_it.rewards.abilities": ["live_wire_held","live_wire_loosed"],
    // B · ae3156055ee1
    "quests.q_the_nettlejaw.involvedCharacterIds": ["lyra","ren","nettlejaw"],
    // B · ff57c1e6d875
    "quests.q_the_nettlejaw.involvedLocationIds": ["porte_extérieure","flats_de_cendre","les_remparts"],
    // B · 30ac9183e592
    "quests.q_the_nettlejaw.knownRewardCopy": "Quoi que ce soit là-dessous, réglé. Et ce qu’il laisse en toi.",
    // B · 45a5583e3c85
    "quests.q_the_nine.title": "Neuf Noms",
    // B · f0e0cf9c86de
    "quests.q_the_nine.summary": "Le quartier-maître garde une liste privée de tous ceux qui sont revenus changés. Quatre sont allés à l’infirmerie et n’en sont pas sortis.",
    // B · 552c0b7f83c2
    "quests.q_the_nine.kind": "SECONDAIRE",
    // B · 473fc21fa716
    "quests.q_the_nine.discoverWhen.flagsSet": ["parlé :ossa"],
    // B · 16a2cf4fafbf
    "quests.q_the_nine.steps.step_get_the_list.playerCopy": "Fais Kerrin te montrer les neuf noms.",
    // B · 56b2aab35424
    "quests.q_the_nine.steps.step_get_the_list.directorNotes": "Kerrin ne donne pas la liste à un recrue curieux. Il la donne à quelqu’un qu’il juge concerné. Être honnête, utile, ou clairement effrayé marche ; insister ne marche pas.",
    // B · be3fba2ab51a
    "quests.q_the_nine.steps.step_the_door.playerCopy": "Découvre où sont allés quatre d’entre eux.",
    // B · 4957e2ec73cc
    "quests.q_the_nine.steps.step_the_door.directorNotes": "La réponse est derrière la porte au fond de la salle des spécimens, et il y a trois façons d’y passer : Voss l’ouvre, le Commandant l’ouvre, ou le joueur l’ouvre lui-même et vit avec ça. Le sous-sol n’est pas un décor d’horreur. Ce sont onze cellules propres et quelqu’un les nourrit.",
    // B · 8b6cb985c98b
    "quests.q_the_nine.steps.step_the_door.enterWhen.flagsSet": ["a_les_neuf"],
    // B · b73e0c8db889
    "quests.q_the_nine.involvedCharacterIds": ["ossa","elian","serah"],
    // B · ad20c58f7f31
    "quests.q_the_nine.involvedLocationIds": ["fort_ember","infirmerie","laboratoire_voss","le_sous_sol"],
    // B · b7b5aaefe8f6
    "quests.q_the_nine.knownRewardCopy": "Ce que la Brigade fait des gens comme toi.",
    // B · c1f0cc5a6454
    "quests.q_the_town.title": "L’étendue de Kelder",
    // B · 9bdea15771e5
    "quests.q_the_town.summary": "Il y a des gens qui vivent dans la ville qu’un Behemoth a traversée. Les cartes de la Brigade disent que non.",
    // B · 552c0b7f83c2
    "quests.q_the_town.kind": "SECONDAIRE",
    // B · 2c746d9d5e03
    "quests.q_the_town.discoverWhen.flagsSet": ["visité :les_cendres"],
    // B · 297cac0aef19
    "quests.q_the_town.steps.step_reach_the_town.playerCopy": "Va à la ville engloutie et trouve qui y vit.",
    // B · e599014c1dbd
    "quests.q_the_town.steps.step_reach_the_town.directorNotes": "Soixante-dix minutes au nord des cendres, hors de toutes les cartes actuelles. Wick ne se cache pas du joueur ; elle se cache du mur. Elle ne sera pas impressionnée par le rang, la sympathie ou une arme dégainée.",
    // B · b53386ba96b8
    "quests.q_the_town.steps.step_reach_the_town.succeedWhen.flagsSet": ["rencontré :wick"],
    // B · 7ceee56ac5f1
    "quests.q_the_town.steps.step_reach_the_town.succeedWhen.atLocation": "ville_engloutie",
    // B · e77b506ea153
    "quests.q_the_town.steps.step_reach_the_town.rewards.flags": ["trouvé_la_ville"],
    // B · 0ad6f229f310
    "quests.q_the_town.steps.step_what_she_offers.playerCopy": "Découvre ce qu’elle sait de ce qui se passe ensuite.",
    // B · d40b003b33ea
    "quests.q_the_town.steps.step_what_she_offers.directorNotes": "C’est le monde qui explique son propre système, en personnage, sans tutoriel. Elle montrera au joueur ce que quarante veut dire et ce que quatre-vingts veut dire, sans recommander l’un ou l’autre. Un joueur qui s’ancre devant elle aura une conversation différente d’un autre.",
    // B · e77b506ea153
    "quests.q_the_town.steps.step_what_she_offers.enterWhen.flagsSet": ["trouvé_la_ville"],
    // B · a14bc5292c95
    "quests.q_the_town.steps.step_what_she_offers.rewards.abilities": ["tricot_tenu","tricot_détaché"],
    // B · 8e40ee479f35
    "quests.q_the_town.involvedCharacterIds": ["wick","lyra"],
    // B · f128651683c3
    "quests.q_the_town.involvedLocationIds": ["les_cendres","ville_engloutie"],
    // B · 6b2545034aec
    "quests.q_the_town.knownRewardCopy": "Quelqu’un qui a été ce que tu es depuis neuf ans.",
    // B · 7572ac89e866
    "quests.q_what_vale_knows.title": "L’ordre permanent",
    // B · 78d181164d71
    "quests.q_what_vale_knows.summary": "Le Commandant Vale n’a pas demandé ce que tu es. Elle attend de voir ce que tu vas en faire.",
    // B · 7fcc0be2ad9c
    "quests.q_what_vale_knows.kind": "PRINCIPALE",
    // B · fd680af2a484
    "quests.q_what_vale_knows.discoverWhen.flagsSet": ["vu_les_cellules"],
    // B · c18ea3e02f39
    "quests.q_what_vale_knows.steps.step_face_her.playerCopy": "Va voir le Commandant.",
    // B · b2a7097e1408
    "quests.q_what_vale_knows.steps.step_face_her.directorNotes": "Elle ne menace personne. Elle est gentille, demande ce que le joueur compte faire, et le pense. Les trois réponses honnêtes sont : je continue à chasser, je pars, ou je te fais dire ce que tu es d’abord. Elle a une réponse prête pour chacune, aucune n’est un piège.",
    // B · 6e8c46ab777b
    "quests.q_what_vale_knows.steps.step_the_fourth_cell.playerCopy": "Découvre ce qu’il y a dans la quatrième cellule.",
    // B · 68b85a9f5aaa
    "quests.q_what_vale_knows.steps.step_the_fourth_cell.directorNotes": "La dernière chose que ce monde dit. Ce qu’il y a dedans, c’est ce qu’il reste de Dell Arran, et il écoute le joueur à travers le sol depuis les cendres. Il n’attaque pas sauf si on l’attaque. S’il parle, c’est une fois, et ça doit être la phrase la plus effrayante du monde.",
    // B · 3a55fe4f5321
    "quests.q_what_vale_knows.steps.step_the_fourth_cell.enterWhen.flagsSet": ["fait_face_à_vale"],
    // B · 7f5f9f4a9391
    "quests.q_what_vale_knows.steps.step_the_fourth_cell.rewards.abilities": ["invisible_tenu","invisible_détaché"],
    // B · 4a6f55252ac2
    "quests.q_what_vale_knows.involvedCharacterIds": ["serah","lyra","le_silencieux"],
    // B · 1a074a811f81
    "quests.q_what_vale_knows.involvedLocationIds": ["bureau_vale","le_sous_sol","les_remparts"],
    // B · cdb852e76b10
    "quests.q_what_vale_knows.knownRewardCopy": "Qui a écrit l’ordre, et à propos de qui.",
    // B · 4a9971d6a921
    "worldEvents.morning_muster.publicCopy": "La cloche sonne et la cour se remplit. Quelqu’un lit les postes du jour sur un tableau que personne ne peut voir par-dessus.",
    // B · 21fea6efbbef
    "worldEvents.morning_muster.directorNotes": "Rassemblement du matin. Le joueur est sur la liste, de retour au roster pour la première fois depuis les cendres.",
    // B · 82200995334f
    "worldEvents.morning_muster.setsFlags": ["rassemblement_appelé"],
    // B · 350118eab32f
    "worldEvents.kit_inspection.publicCopy": "Kerrin passe en revue la ligne avec le carnet ouvert, vérifiant ce que chacun a noté contre ce que chacun porte.",
    // B · ff01b776b004
    "worldEvents.kit_inspection.directorNotes": "Inspection du matériel. Kerrin remarque que le joueur n’a pas signé pour un bouclier depuis trois semaines. Ils ne disent pas pourquoi c’est intéressant, et ils ne l’écrivent pas non plus.",
    // B · a56b15f0d880
    "worldEvents.kit_inspection.setsFlags": ["inspection_réalisée","ossa_a_remarqué_le_bouclier"],
    // B · 30acb8f8dd83
    "worldEvents.kit_inspection.cancelledByFlags": ["quelqu_un_prévenu"],
    // B · ec602e3a2521
    "worldEvents.culvert_report.publicCopy": "Un coursier arrive du quartier extérieur. Deux personnes disparues en deux jours, et tout ce qui est métal là-bas est chaud au toucher.",
    // B · ae70835baf8e
    "worldEvents.culvert_report.directorNotes": "Le rapport sur le conduit arrive où que soit le joueur. C’est ce qui lance la mission Mâchoire-de-Nette ; ça doit ressembler à une info qui atteint le fort, pas à une quête donnée.",
    // B · 68522497c898
    "worldEvents.culvert_report.setsFlags": ["rapport_conduit_fait"],
    // B · aabe1fb0d327
    "worldEvents.the_eleven_ward.publicCopy": "Un des onze commence à hurler dans le lit du fond et ne s’arrête pas avant qu’on tire le rideau.",
    // B · 59b902118410
    "worldEvents.the_eleven_ward.directorNotes": "Un des survivants de la onzième porte. Le monde montre ce qui arrive à quelqu’un dont l’instabilité n’a jamais été gérée. Personne n’explique, personne n’a besoin.",
    // B · 0cd5ab39f56d
    "worldEvents.the_eleven_ward.setsFlags": ["vu_les_onze"],
    // B · bd46304e1f96
    "worldEvents.voss_comes_looking.publicCopy": "Le docteur Voss te trouve. Il cherche depuis la deuxième sonnerie et n’est pas du tout gêné.",
    // B · f176be3244b9
    "worldEvents.voss_comes_looking.directorNotes": "Voss demande neuf secondes de l’avant-bras, pour la troisième fois. Il est ravi, pas sinistre, et il acceptera un refus — cette fois.",
    // B · 9b9427cbd96c
    "worldEvents.voss_comes_looking.setsFlags": ["voss_a_redemandé"],
    // B · c59bd9c28ba2
    "worldEvents.voss_comes_looking.cancelledByFlags": ["voss_sait","quelqu_un_prévenu"],
    // B · 3c4cefa4a64e
    "worldEvents.red_moon_rises.publicCopy": "La lune se lève couleur d’un bleu noir, et toutes les conversations dans le fort baissent d’un ton.",
    // B · 99929513df1a
    "worldEvents.red_moon_rises.directorNotes": "Une lune rouge signifie du mouvement dans le pays sauvage. Historiquement, le fort n’a jamais eu de nuit calme après. C’est une ambiance avec des crocs : quelque chose arrive et tout le monde le sait.",
    // B · 362ba3798d73
    "worldEvents.red_moon_rises.setsFlags": ["lune_rouge"],
    // B · e82d9dc4b3fa
    "promises.promise_what_you_are_becoming.kind": "MYSTÈRE",
    // B · 777eb491b4bd
    "promises.promise_what_you_are_becoming.label": "Ce que le cœur a vraiment mis en toi",
    // B · df4dcdd98384
    "promises.promise_what_you_are_becoming.seedHint": "Neuf secondes de carapace, et ça devient plus facile.",
    // B · fb00158813c2
    "promises.promise_what_you_are_becoming.payoffHint": "Le tissu de bête-gens et le tissu humain sont le même, et la Brigade le sait depuis soixante ans.",
    // B · 63a719ec7f2d
    "promises.promise_ren.kind": "RIVALITÉ",
    // B · 0b98cd5b4979
    "promises.promise_ren.label": "Ren Calder, qui devait être le premier",
    // B · 71127de1847b
    "promises.promise_ren.seedHint": "Il a arrêté de te battre et n’a rien dit.",
    // B · ac1578c68b77
    "promises.promise_ren.payoffHint": "Il va découvrir. Ce qu’il fera ensuite, c’est l’affaire du joueur, pas la sienne.",
    // B · 445cd8deebc2
    "promises.promise_lyra.kind": "RELATION",
    // B · 8b378cc86723
    "promises.promise_lyra.label": "Capitaine Venn, qui n’a rien demandé",
    // B · da09282addb1
    "promises.promise_lyra.seedHint": "Elle t’a sorti elle-même et n’a jamais parlé de tes côtes.",
    // B · 3a759e293f02
    "promises.promise_lyra.payoffHint": "Elle a dénoncé quelqu’un il y a douze ans et n’a jamais su ce qu’il est devenu.",
    // B · 5631e4ba6537
    "promises.promise_the_order.kind": "PATRON",
    // B · 191e4baefd7f
    "promises.promise_the_order.label": "L’ordre permanent sur ceux qui reviennent changés",
    // B · cb3ba1562dce
    "promises.promise_the_order.seedHint": "Tout le monde en a entendu parler. Personne ne dit ce qu’il contient.",
    // B · 454456db3515
    "promises.promise_the_order.payoffHint": "Vale l’a écrit. Sur elle-même.",
    // B · e82d9dc4b3fa
    "promises.promise_fourth_cell.kind": "MYSTÈRE",
    // B · fdee57fc5264
    "promises.promise_fourth_cell.label": "Ce qu’on nourrit dans la crypte",
    // B · 06173eab49d8
    "promises.promise_fourth_cell.seedHint": "Onze cellules, impeccables, et quelqu’un y descend deux fois par jour.",
    // B · c9e3687f61bd
    "promises.promise_fourth_cell.payoffHint": "Dell Arran, surtout. Assez de lui pour t’avoir suivi chez toi.",
    // A · 7431678efdef
    "archetypes.arch_longblade.name": "Longue lame",
    // B · dce426b26bec
    "archetypes.arch_longblade.role": "Épée — équilibrée",
    // A · e2021e0c0d90
    "archetypes.arch_longblade.summary": "La technique standard de la Brigade. Garde, allonge, et un bon coup juste dans la faille entre deux plaques. Rien de spectaculaire, mais tout est fait.",
    // A · ddcb0c556fd4
    "archetypes.arch_longblade.playstyle": ["Équilibré","Fiable","Bonne garde"],
    // A · 3594528d6796
    "archetypes.arch_longblade.blurb": "Tout le monde commence ici. La plupart restent. Ce n’est pas par paresse.",
    // B · b3a7e059a8d9
    "archetypes.arch_longblade.startingAbilities": ["garde_longue","plaques_tenues","plaques_relâchées"],
    // A · 9d436ddcee68
    "archetypes.arch_breaker.name": "Briseur",
    // B · fa09dbbe7f04
    "archetypes.arch_breaker.role": "Arme lourde — dégâts maximum",
    // A · e895d8a65f28
    "archetypes.arch_breaker.summary": "Une tête lourde au bout d’un long manche. Tu frappes une fois, en partant de tes talons, et quelque chose lâche dans la structure. Lent, il faut être très sûr.",
    // A · 17209dd565df
    "archetypes.arch_breaker.playstyle": ["Dégâts maximaux","Lent","Brise les armures"],
    // A · 204a2d42ebe2
    "archetypes.arch_breaker.blurb": "Ça ne tranche pas. Trancher c’est pour les trucs avec de la peau à couper.",
    // B · fe25c3b3dfe8
    "archetypes.arch_breaker.startingAbilities": ["frappe verticale","plaquage maintenu","plaquage relâché"],
    // A · ea3922754f11
    "archetypes.arch_reach.name": "Lance Murailles",
    // B · 7ac6c9d30051
    "archetypes.arch_reach.role": "Arme d’hast — défensive",
    // A · 6908397e4a59
    "archetypes.arch_reach.summary": "Neuf pieds entre toi et la bête. Tu te tiens prêt, et ce qui arrive fait le plus gros du travail. La façon la plus sûre de combattre un monstre énorme.",
    // A · 21ad92a97ddc
    "archetypes.arch_reach.playstyle": ["Garde ses distances","Défensif","Punit les charges"],
    // A · 0de4a60cddee
    "archetypes.arch_reach.blurb": "L’arme de la muraille elle-même. Pose-la, attends, et laisse la physique faire le boulot.",
    // B · 169d85707765
    "archetypes.arch_reach.startingAbilities": ["brace et poussée","plaquage maintenu","plaquage relâché"],
    // A · 683623be41e6
    "archetypes.arch_longshot.name": "Forage d’Ancre",
    // B · ec7b1c62fed7
    "archetypes.arch_longshot.role": "À distance — tir éloigné",
    // A · 90d130cc0ab4
    "archetypes.arch_longshot.summary": "Un coup, un recul terrible, et la seule arme de l’armurerie qui atteint la crête. Tu n’as qu’une chance avant qu’il sache où tu es.",
    // A · bf8333a4c7d3
    "archetypes.arch_longshot.playstyle": ["Combat à distance","Un seul tir","Faible de près"],
    // A · 98a63aa37fef
    "archetypes.arch_longshot.blurb": "Ceux qui portent ça ont choisi de voir le monstre venir plutôt que de le croiser face à face.",
    // B · f3528aeb5e53
    "archetypes.arch_longshot.startingAbilities": ["tir en couronne","plaquage maintenu","plaquage relâché"],
    // A · d771eb4d3b64
    "archetypes.arch_paired.name": "Lames jumelles",
    // B · 89f18bbe7219
    "archetypes.arch_paired.role": "Agile — rapide et mobile",
    // A · 1f74c9f701e3
    "archetypes.arch_paired.summary": "Deux petites lames, en partant du principe que tu ne seras jamais là où la bête regarde. C’est le style le plus rapide de la Brigade et aussi le moins indulgent en cas d’erreur.",
    // A · cf236319625d
    "archetypes.arch_paired.playstyle": ["Le plus rapide","Mobile","Fragile"],
    // A · 561831196a66
    "archetypes.arch_paired.blurb": "Ça marche jusqu’au moment où ça ne marche plus, et là, ça ne marche plus du tout.",
    // B · bac36ef20fca
    "archetypes.arch_paired.startingAbilities": ["double ligne","plaquage maintenu","plaquage relâché"],
    // A · 35c832652b15
    "archetypes.arch_bare.name": "À mains nues",
    // B · be767b5acab1
    "archetypes.arch_bare.role": "Corps à corps — la capacité de base",
    // A · 18da1e74e281
    "archetypes.arch_bare.summary": "Sans arme. À portée, là où être énorme ne sert plus à rien. Le style auquel les traits répondent le mieux, et qui en a le plus besoin.",
    // A · 37ba292244b6
    "archetypes.arch_bare.playstyle": ["Les traits d’abord","Très courte portée","Démarrage le plus dur"],
    // A · 7f491d7b00e5
    "archetypes.arch_bare.blurb": "Personne ne reçoit ça. C’est ce que tu finis par faire quand ce que tu as amené ne sert plus.",
    // B · 02f9b50a56ec
    "archetypes.arch_bare.startingAbilities": ["travail rapproché","plaquage maintenu","plaquage relâché"],
    // B · a69a2557bf30
    "setupFields.displayName.label": "Qu’y a-t-il sur tes plaques ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · 8a6c07fea5b6
    "setupFields.displayName.placeholder": "ex. Sena Ardry",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 5965ecf877b1
    "setupFields.pronouns.placeholder": "ex. elle/la",
    // B · 5579979e15cc
    "setupFields.archetype.label": "Avec quoi tu combats ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHETYPE",
    // B · 416c72b848c4
    "setupFields.archetype.helpText": "Ton style d’arme. Il détermine tes attributs, ta formation et ta première technique, et il décide des quatre façons d’aborder une mission qui s’ouvrent à toi. Tout le monde commence aussi avec Plaquage — la capacité que le Behemoth t’a laissée — parce que c’est déjà arrivé. Ton arme est fixe pour cette partie ; les capacités ne le sont pas.",
    // B · 9e734e9e6928
    "setupFields.worldKnowsAboutYou.label": "Que pense déjà la Brigade de toi ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · 79f314cac957
    "setupFields.worldKnowsAboutYou.placeholder": "ex. Je suis revenu seul des plaines et personne n’a encore décidé si c’est de la chance ou du mensonge.",
    // B · 21a2d08d4acd
    "setupFields.origin.label": "Pourquoi t’es-tu engagé ?",
    // B · b6a31c665c0b
    "setupFields.origin.kind": "CHOIX",
    // B · 895ab1b2d2e1
    "setupFields.origin.helpText": "Définit ce que tu étais avant la Brigade, ce que les gens évoquent quand ils essaient de te cerner.",
    // B · 1a1021a4e155
    "setupFields.origin.options.the_town.label": "Un est passé dans ta ville quand tu avais huit ans",
    // B · 7741f6778e15
    "setupFields.origin.options.brigade_family.label": "Ta famille est dans la Brigade depuis quatre générations",
    // B · f8d04e4270de
    "setupFields.origin.options.the_wage.label": "Ça paie, et l’autre option, c’était la tannerie",
    // B · 4f5203a2eeaa
    "setupFields.origin.options.wanted_to_see.label": "Tu voulais en voir un de près",
    // B · f6093d6587c4
    "setupFields.appearance.label": "Qu’est-ce que les gens remarquent en premier ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · 7a1da7ca1b07
    "setupFields.appearance.placeholder": "ex. Quatre jours sans dormir, et un manteau qui a encore le sang de quelqu’un d’autre sur le poignet.",
    // B · 3aa4328667d6
    "protagonist.kind": "VIDE",
    // A · 7f85c93b8d85
    "opening": "Il y a quatre jours, tu es parti avec six autres et tu es revenu avec six plaques d’identification.\n\nL’infirmerie t’a libéré ce matin avec un mot disant que tes côtes sont intactes, ce qui est vrai, et sans explication, parce qu’il n’y en a pas.\n\nTu es dans la salle d’appel à six heures moins dix, ton manteau replié sur l’avant-bras, et sous la manche ton avant-bras droit fait ce truc encore — une plaque de carapace grise qui pousse à travers la peau, comme un joint de doigt à travers un gant. Neuf secondes. Puis ça rentre.\n\nLe capitaine Venn est de l’autre côté de la salle avec les rapports de nuit, et elle t’a déjà vu entrer.\n\nLa cloche sonne dans dix minutes.",
    // A · f526015e66c2
    "openingSuggestions": ["Je mets le manteau et ferme les boutons avant que personne ne tourne le coin et voie ce qu’il y a dessous.","Je vais directement vers le capitaine Venn et me place là où elle doit me regarder. « Je préfère que tu l’entendes de moi plutôt que par quelqu’un d’autre. »","Je trouve Ren avant l’appel et garde ça pour moi. « Dis-moi comment elle est avant que je me fasse une idée à la dure. »"],
  },
});
