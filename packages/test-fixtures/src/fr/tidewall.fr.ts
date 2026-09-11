import { registerWorldText } from '@aniplay/contracts';

/**
 * The Tidewall, in French.
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
  storyId: "story_tidewall",
  text: {
    // A · d09b12fabefc
    "title": "La Muraille de Marée",
    // A · e062e3e87688
    "fantasyLabel": "Ta sœur est morte en défendant la muraille.",
    // A · c04970d8e1c0
    "hook": "Ta sœur est morte à un poste sur la muraille. Un survivant affirme l’avoir vue s’éloigner à pied après la bataille.",
    // A · 6a385de71b65
    "premise": "Une fois par an, pendant une trentaine de jours, les bêtes descendent de la montagne en un nombre qui ressemble moins à des animaux qu’à une tempête. Une centaine de kilomètres de fortifications appelée la Muraille de Marée les séparent des villages agricoles, tenue par cinq ordres de combattants.\n\nTous ici sont testés à seize ans et assignés à l’un de ces cinq ordres. Ce choix est définitif. Il détermine qui te formera, quelles armes tu peux utiliser, jusqu’où tu peux grimper en grade, et sur quelle partie de la muraille tu peux tenir la garde.\n\nL’année dernière, à la onzième porte, la marée a percé. Ta sœur Wren commandait ce poste. Le rapport officiel dit qu’elle est morte en défendant la caserne pour permettre à la ligne de se reformer derrière elle, et tu as reçu son épée ainsi qu’une lettre de recommandation pliée.\n\nPuis, un survivant t’a confié, à voix basse, qu’après les combats il a vu Wren quitter la zone du nord à pied. Personne d’autre, dans la hiérarchie, ne veut l’entendre. Le passage est interdit à tous sauf à l’unité postée à la onzième porte.\n\nCe poste revient aux recrues les mieux classées dans leur ordre quand la prochaine marée arrive. Tu as donc quatre mois pour te hisser en tête de la liste avant que la marée ne revienne et que la porte soit confiée à quelqu’un d’autre. Si tu rates, le passage restera fermé une année de plus, et une recrue prise à y entrer seule est radiée définitivement.",
    // A · b444a84b7613
    "mechanicsChips": ["Cinq classes","Montures et compagnons","Progresser en grade","Politique d’ordre","Combat de siège"],
    // A · 04bdaca872dc
    "creatorNote": "Ta classe n’est pas un costume. Elle détermine qui te formera, qui t’ignorera, et lequel des quatre chemins derrière la porte tu prendras. Deux joueurs avec des classes différentes ne devraient pas reconnaître la partie de l’autre.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · 9237359a1dd1
    "rules.hardCanon": ["Le placement est permanent. Personne n’a jamais été re-testé, et les ordres n’en parlent pas.","La Pourriture est ce que la marée laisse dans une personne. Ça ne guérit pas tout seul et ça ne tue pas vite.","Le passage au-dessus de la onzième porte est fermé par ordre permanent à tous sauf à l’unité postée.","Onze personnes sont revenues de la onzième porte. Aucune n’a été affectée au mur depuis.","Les ordres font la promotion à partir d’un jet classé. Le jet est public et non négociable."],
    // A · f660292a1e80
    "rules.toneGuide": "Mats froids, cuir humide, et pros qui font un métier dangereux avec des horaires. La grande fantasy est là, mais aussi la paperasse, les plannings et le rang. Chaleur entre soldats ; pas de mélodrame, pas de discours.",
    // B · 2511dfb64112
    "skills.warfare.name": "Guerre",
    // B · 97081b4b4792
    "skills.warfare.attribute": "force",
    // B · 780f43037e74
    "skills.warfare.description": "Formation, position et où la ligne cède.",
    // B · aef0340e48b9
    "skills.blades.name": "Lames",
    // B · 97081b4b4792
    "skills.blades.attribute": "force",
    // B · db89dcf2f7da
    "skills.blades.description": "Tout ce qui a un tranchant, tenu près du corps.",
    // B · 146b983399d6
    "skills.riding.name": "Équitation",
    // B · 7ce3b6387340
    "skills.riding.attribute": "agilité",
    // B · e4f0544c8743
    "skills.riding.description": "Rester dessus, et lui donner envie de rester sous toi.",
    // B · 11d11a59b3bc
    "skills.archery.name": "Tir à l’arc",
    // B · 7ce3b6387340
    "skills.archery.attribute": "agilité",
    // B · be63a86edff9
    "skills.archery.description": "Distance, vent, et le tir que tu ne fais pas.",
    // B · 72a55afdb2b2
    "skills.stealth.name": "Discrétion",
    // B · 7ce3b6387340
    "skills.stealth.attribute": "agilité",
    // B · c2a170c1f956
    "skills.stealth.description": "Être là où personne ne regarde, volontairement.",
    // B · 9078f1991610
    "skills.sorcery.name": "Sorcelerie",
    // B · 5dbc8bb102ac
    "skills.sorcery.attribute": "arcane",
    // B · 04111f882387
    "skills.sorcery.description": "Maintenir un travail en cours sans perdre le fil.",
    // B · 7bd9ec915c20
    "skills.mending.name": "Réparation",
    // B · 5dbc8bb102ac
    "skills.mending.attribute": "arcane",
    // B · e23d5eab3c0c
    "skills.mending.description": "Fermer ce qui est ouvert, et savoir quoi fermer en premier.",
    // B · 1091173e62b8
    "skills.beastlore.name": "Connaissance des bêtes",
    // B · a8c1fa8269c3
    "skills.beastlore.attribute": "esprit",
    // B · 2f6365e713ca
    "skills.beastlore.description": "Ce qu’une créature veut, avant qu’elle décide.",
    // B · f400330b9c9c
    "skills.command.name": "Commandement",
    // B · cfb7a15645c3
    "skills.command.attribute": "présence",
    // B · b532cfcdfb3e
    "skills.command.description": "Être obéi par des gens fatigués.",
    // B · b3f73706ed78
    "skills.endurance.name": "Endurance",
    // B · 4c84c2c842d0
    "skills.endurance.attribute": "volonté",
    // B · 84c8525b41fe
    "skills.endurance.description": "La dernière heure d’une longue journée.",
    // B · 73523cb25294
    "skills.insight.name": "Perspicacité",
    // B · a8c1fa8269c3
    "skills.insight.attribute": "esprit",
    // B · cde23045da34
    "skills.insight.description": "Lire la pièce, et le jet derrière.",
    // B · ea0b35a4dc9f
    "resources.health.name": "Santé",
    // B · 34e8ec1ac388
    "resources.health.polarity": "BON_HAUT",
    // B · 545a3bafa8db
    "resources.health.zeroStateConsequence": "Tu tombes. La tente des Mains-Calmes s’occupera de toi, et le jet notera que tu en avais besoin.",
    // B · 1a3c168896b6
    "resources.health.color": "#FF5B69",
    // B · da8810e7579d
    "resources.vigor.name": "Vigueur",
    // B · 34e8ec1ac388
    "resources.vigor.polarity": "GOOD_HIGH",
    // B · 42c66088fbbc
    "resources.vigor.zeroStateConsequence": "Plus rien dans les bras. Toute capacité entraînée est tentée avec un désavantage.",
    // B · bffd32432679
    "resources.vigor.color": "#7C6CFF",
    // B · 46adc881193f
    "resources.standing.name": "Rang",
    // B · 34e8ec1ac388
    "resources.standing.polarity": "GOOD_HIGH",
    // B · 485ae3001d4a
    "resources.standing.zeroStateConsequence": "Dernier sur la liste de ton ordre. On te donne les tâches que personne ne note.",
    // B · 35e13f5571ca
    "resources.standing.color": "#5FD3A8",
    // B · 5f8d48d3c7a7
    "resources.blight.name": "Fléau",
    // B · a34adbda2422
    "resources.blight.polarity": "GOOD_LOW",
    // B · aac80e06dc93
    "resources.blight.zeroStateConsequence": "Propre. Rien de la marée n’est en toi aujourd’hui.",
    // B · 72fbbe809563
    "resources.blight.color": "#9AA3B2",
    // A · f05a0348b532
    "items.wrens_sword.name": "L’épée de Wren",
    // B · b33ab9a543a4
    "items.wrens_sword.tags": ["quête","lame"],
    // B · 110688b7cca2
    "items.wrens_sword.equipSlot": "main",
    // B · 7b6f781846b6
    "items.wrens_sword.description": "Une épée du mur, simple, affûtée par quelqu’un qui s’en est servi. La poignée est faite pour une main plus petite que la tienne.",
    // B · 0e7077ecb472
    "items.wrens_sword.loreText": "Reprise avec ses effets. La lame a été réaffûtée au moins quatre fois au-delà de sa ligne d’origine.",
    // B · ab0622962944
    "items.wrens_sword.icon": "sword",
    // A · 8313834e61df
    "items.roll_token.name": "Jeton de Recrue",
    // B · 061625d9bd60
    "items.roll_token.tags": ["quête","document"],
    // B · ee7a9abe8e1a
    "items.roll_token.description": "Une plaquette de laiton estampillée avec ton ordre, ton année d’entrée, et ta place actuelle sur la liste poinçonnée sur le bord.",
    // B · 9a36a328acfe
    "items.roll_token.loreText": "Les poinçons vont dans un sens. Chacun vérifie le sien dans le noir, et tout le monde fait semblant de ne pas le faire.",
    // B · 3d872b2ab22a
    "items.roll_token.icon": "token",
    // A · c3c4cd764fc6
    "items.field_kit.name": "Trousse de Terrain",
    // B · 077ab303ce6f
    "items.field_kit.tags": ["consommable","médical"],
    // B · 51a6e4846c17
    "items.field_kit.description": "Fil ciré, linge propre, et une bouteille de quelque chose qui pique assez pour faire son boulot.",
    // B · ba26f214e282
    "items.field_kit.loreText": "Donné quatre par recrue et par saison. Utiliser le quatrième est noté.",
    // B · 83bb11f3036d
    "items.field_kit.icon": "kit",
    // A · 7298aa257196
    "items.ward_salt.name": "Sel de garde",
    // B · 700d07bfe71d
    "items.ward_salt.tags": ["consommable","arcanique"],
    // B · 853113ab8a64
    "items.ward_salt.description": "Sel gris grossier qui tire la marée hors d’une blessure. Brûle en entrant et continue de brûler pendant une heure.",
    // B · aa4ef4ac5c5b
    "items.ward_salt.loreText": "Extrait sous le mur lui-même, ce que la Salle Claire préférerait que tu ne penses pas.",
    // B · 9a345730c3b0
    "items.ward_salt.icon": "salt",
    // A · 24c6943ec89d
    "items.proof_letter.name": "Le compte rendu écrit de Bec",
    // B · 061625d9bd60
    "items.proof_letter.tags": ["quête","document"],
    // B · 1690bc4550d3
    "items.proof_letter.description": "Ce que le survivant a vu à la onzième porte, de sa main, signé, avec la date et l’heure.",
    // B · a1198f60c603
    "items.proof_letter.loreText": "Il l’a écrit trois fois. Les deux premiers sont cendres.",
    // B · 4540c1847af8
    "items.proof_letter.icon": "letter",
    // A · 35afeb9d943b
    "items.gate_key.name": "Clé du poste de garde",
    // B · 0012b847fe68
    "items.gate_key.tags": ["quête","outil"],
    // B · 1cafe2af27ab
    "items.gate_key.description": "Fer, sans étiquette, taillé pour la porte de la onzième porte du mur, qui est enchaînée depuis l’automne dernier.",
    // B · c3c1965e1a26
    "items.gate_key.loreText": "Il devrait y en avoir trois. Il y en a deux.",
    // B · c0c1baf2fa65
    "items.gate_key.icon": "key",
    // A · da1cf68218a8
    "abilities.read_the_line.name": "Lire la ligne",
    // B · ae55d331ff03
    "abilities.read_the_line.tags": ["universel","utilitaire"],
    // B · 5a3453272478
    "abilities.read_the_line.description": "Regarde une formation, une foule, ou un combat et vois où ça va craquer.",
    // B · c44e6dd70059
    "abilities.read_the_line.targetRule": "NONE",
    // B · a8c1fa8269c3
    "abilities.read_the_line.check.attribute": "esprit",
    // A · 0391d3335672
    "abilities.set_yourself.name": "Se préparer",
    // B · 05829347acc3
    "abilities.set_yourself.tags": ["universel","défensif"],
    // B · 5599743c8f92
    "abilities.set_yourself.description": "Plante-toi, expire, et refuse la prochaine chose qui arrive.",
    // B · 43afef8b429c
    "abilities.set_yourself.targetRule": "SOI",
    // A · c2b38a99e49a
    "abilities.break_charge.name": "Charge brisée",
    // B · 2b70a5690db2
    "abilities.break_charge.tags": ["guerrier","offensif"],
    // B · 77ea1b3b3133
    "abilities.break_charge.description": "Pousse tout ton poids et celui de ta monture en un point de la ligne.",
    // B · 39d896e20aec
    "abilities.break_charge.targetRule": "SINGLE",
    // B · 97081b4b4792
    "abilities.break_charge.check.attribute": "force",
    // A · 5e48303af902
    "abilities.call_the_mount.name": "Appel du monture",
    // B · 379096aa615d
    "abilities.call_the_mount.tags": ["guerrier","lien"],
    // B · a1cc0a80e59d
    "abilities.call_the_mount.description": "Siffle pour appeler ce que la Marche de Fer t’a confié cette saison.",
    // B · 43afef8b429c
    "abilities.call_the_mount.targetRule": "SOI",
    // B · cfb7a15645c3
    "abilities.call_the_mount.check.attribute": "présence",
    // A · 3eeb21e5990c
    "abilities.open_the_seam.name": "Ouvrir la brèche",
    // B · a81683771cfc
    "abilities.open_the_seam.tags": ["roublard","offensif"],
    // B · fb79d583b69b
    "abilities.open_the_seam.description": "Deux lames, une ouverture, et une coupure là où l’armure était il y a un instant.",
    // B · 39d896e20aec
    "abilities.open_the_seam.targetRule": "SINGLE",
    // B · 7ce3b6387340
    "abilities.open_the_seam.check.attribute": "agilité",
    // A · 24485ec322ed
    "abilities.send_the_bond.name": "Envoyer le lien",
    // B · ea3d8fe0c73a
    "abilities.send_the_bond.tags": ["roublard","lien"],
    // B · f5dc6c2c5512
    "abilities.send_the_bond.description": "Montre du doigt, et l’animal qui t’a choisi va là où tu as pointé.",
    // B · 39d896e20aec
    "abilities.send_the_bond.targetRule": "SINGLE",
    // B · cfb7a15645c3
    "abilities.send_the_bond.check.attribute": "présence",
    // A · e73f705c9f78
    "abilities.held_shot.name": "Tir retenu",
    // B · e421513e1ee2
    "abilities.held_shot.tags": ["archer","offensif"],
    // B · 4f6879f5d04c
    "abilities.held_shot.description": "Tire la corde, et continue de la tendre, jusqu’à ce que le tir soit la seule chose qui compte.",
    // B · 39d896e20aec
    "abilities.held_shot.targetRule": "SINGLE",
    // B · 7ce3b6387340
    "abilities.held_shot.check.attribute": "agilité",
    // A · bcdb37f9ef72
    "abilities.mark_it.name": "Marquer",
    // B · 2e555bbccd10
    "abilities.mark_it.tags": ["archer","utilitaire"],
    // B · 9086b248378d
    "abilities.mark_it.description": "Nomme une cible à voix haute pour que toute la ligne sache qui est la tienne et qui est la leur.",
    // B · 39d896e20aec
    "abilities.mark_it.targetRule": "SINGLE",
    // B · cfb7a15645c3
    "abilities.mark_it.check.attribute": "présence",
    // A · cb3bc07a3421
    "abilities.first_element.name": "Premier Élément",
    // B · bb56ab04c554
    "abilities.first_element.tags": ["sorcier","offensif"],
    // B · ea91fcdee3da
    "abilities.first_element.description": "Le premier sort que tu as lié jusqu’ici, lancé avec force plutôt qu’avec soin.",
    // B · 39d896e20aec
    "abilities.first_element.targetRule": "SINGLE",
    // B · 5dbc8bb102ac
    "abilities.first_element.check.attribute": "arcane",
    // A · c54c6bf2478d
    "abilities.hold_open.name": "Maintenir Ouvert",
    // B · a81aa511a106
    "abilities.hold_open.tags": ["sorcier","utilitaire"],
    // B · c7ec4b38630a
    "abilities.hold_open.description": "Garde un sort actif pendant que tu fais autre chose, c’est toute la difficulté.",
    // B · 43afef8b429c
    "abilities.hold_open.targetRule": "SOI",
    // B · 4c84c2c842d0
    "abilities.hold_open.check.attribute": "volonté",
    // A · 5b5450358c63
    "abilities.thread.name": "Fil",
    // B · e529485de33a
    "abilities.thread.tags": ["soigneur","soutien"],
    // B · 808da41ea33b
    "abilities.thread.description": "Prends ce qui ne va pas chez quelqu’un et referme la blessure.",
    // B · 39d896e20aec
    "abilities.thread.targetRule": "SINGLE",
    // B · 5dbc8bb102ac
    "abilities.thread.check.attribute": "arcane",
    // A · 6e6743883356
    "abilities.the_cut.name": "La Coupure",
    // B · bf6a36cf50a6
    "abilities.the_cut.tags": ["soigneur","offensif"],
    // B · 5e65f6f7a7cc
    "abilities.the_cut.description": "La même prise, utilisée dans l’autre sens. Saisis ce qui maintient quelque chose debout et lâche-le.",
    // B · 39d896e20aec
    "abilities.the_cut.targetRule": "SINGLE",
    // B · 5dbc8bb102ac
    "abilities.the_cut.check.attribute": "arcana",
    // A · 6014fa263426
    "locations.muster_yard.name": "Le Terrain de Rassemblement",
    // A · 888d6fb2eae0
    "locations.muster_yard.shortName": "Terrain",
    // B · f8880324be80
    "locations.muster_yard.description": "Quarante pas de sable gelé entre les baraquements et l’escalier du mur, ratissés à plat chaque matin par celui qui est arrivé le dernier au petit déjeuner. Le classement est cloué au poteau près de la porte et lu par tous ceux qui passent.",
    // B · 85c6281975ff
    "locations.muster_yard.stageImage": "story_tidewall/stage_muster_yard",
    // B · 1db5cd8c961a
    "locations.muster_yard.ambientSfx": ["vent_faible","bottes_gravier"],
    // A · c1a45ef35356
    "locations.wall_walk.name": "La Promenade sur le Mur",
    // A · 2210e5ee50b7
    "locations.wall_walk.shortName": "Mur",
    // B · d9208651724d
    "locations.wall_walk.description": "Le sommet du Tidewall, assez large pour trois de front et rien d’autre, qui court d’est en ouest jusqu’à ce qu’il cesse d’être un mur pour devenir météo. D’ici, les villages agricoles sont petits, orange et clairement précieux.",
    // B · 0299c9ff765e
    "locations.wall_walk.stageImage": "story_tidewall/stage_wall_walk",
    // B · 59246c733c01
    "locations.wall_walk.ambientSfx": ["vent_fort","corde_grincement"],
    // A · 90de654c4922
    "locations.beast_lines.name": "Les Lignes des Bêtes",
    // A · 9ab4f7a738eb
    "locations.beast_lines.shortName": "Les Lignes",
    // B · 9d72843988f7
    "locations.beast_lines.description": "Enclos, perchoirs et une longue allée couverte où les ordres gardent tout ce qu’ils montent, ce qu’ils font voler ou à quoi ils répondent. Ça sent la paille et la viande, c’est l’endroit le plus chaud du mur.",
    // B · 796cc9c8ac04
    "locations.beast_lines.stageImage": "story_tidewall/stage_beast_lines",
    // B · e2e746bbbf38
    "locations.beast_lines.ambientSfx": ["sabots","ailes_grandes"],
    // A · d5fd1021db88
    "locations.stillhand_tent.name": "Les Tentes de la Main-Calme",
    // A · 46b413a77d22
    "locations.stillhand_tent.shortName": "Tentes",
    // B · b591124c0eef
    "locations.stillhand_tent.description": "Six halls en toile derrière la cour, éclairés jour et nuit, où les blessés du mur sont triés selon leur ancienneté. Le sel du poste y est gardé, ainsi que toutes les opinions honnêtes sur le mur.",
    // B · 865469c24ca3
    "locations.stillhand_tent.stageImage": "story_tidewall/stage_stillhand_tent",
    // B · b7de379a8d3c
    "locations.stillhand_tent.ambientSfx": ["toile_frottement","voix_basses"],
    // A · a4a6626d344b
    "locations.bright_hall.name": "La Grande Salle",
    // A · a990937d4574
    "locations.bright_hall.shortName": "Salle",
    // B · 656be8d54a3e
    "locations.bright_hall.description": "Une salle en pierre en forme de tambour, creusée sous la cour, où les sorciers du mur lient leur premier élément et débattent du second. Le sol est un anneau continu d’ardoise travaillée et se tenir au mauvais endroit est impoli.",
    // B · 572b417ff3ae
    "locations.bright_hall.stageImage": "story_tidewall/stage_bright_hall",
    // B · 1160d8880577
    "locations.bright_hall.ambientSfx": ["bourdonnement_bas","écho_pierre"],
    // A · 5e18cb1ae8b5
    "locations.longwatch_post.name": "Le Poste de la Longue-Vigie",
    // A · 5cc981e79d73
    "locations.longwatch_post.shortName": "Poste",
    // B · 75c2773a789a
    "locations.longwatch_post.description": "Un éperon de pierre qui dépasse du mur pour que les archers voient le long de sa face. Trois grands arcs sont montés ici sur des tables tournantes, chacun tenu par quatre personnes qui se sont toutes crié dessus avant le petit déjeuner.",
    // B · e83fa395b34d
    "locations.longwatch_post.stageImage": "story_tidewall/stage_longwatch_post",
    // B · 0a226da1d216
    "locations.longwatch_post.ambientSfx": ["vent_fort","bois_tension"],
    // A · 534ea7f1962e
    "locations.eleventh_gate.name": "La Onzième Porte",
    // A · 6a610f304dc4
    "locations.eleventh_gate.shortName": "Porte Onze",
    // B · 2853980f3b8c
    "locations.eleventh_gate.description": "Une porte et un passage bas où le sol rejoint le mur, c’est pourquoi la marée l’a choisie. La maçonnerie a été reconstruite et les brûlures en dessous n’ont pas été nettoyées.",
    // B · caa4001bdd24
    "locations.eleventh_gate.stageImage": "story_tidewall/stage_eleventh_gate",
    // B · 952379ae272d
    "locations.eleventh_gate.ambientSfx": ["vent_faible","chaîne"],
    // B · 79d7629f1aac
    "characters.odalys.name": "Instructrice Odalys Verne",
    // A · f60ce97f84a8
    "characters.odalys.role": "Instructrice des recrues",
    // A · 65a30df3a279
    "characters.odalys.cardBlurb": "C’est elle qui tient le registre des rangs et décide qui obtient quel poste. Elle a aussi entraîné ta sœur, sans jamais en parler une seule fois.",
    // B · aee35f364a88
    "characters.odalys.pronouns": "elle",
    // A · b376f9666f77
    "characters.odalys.publicTraits": ["Brusque","Précise","Impossible à flatter"],
    // B · 71657981d58c
    "characters.odalys.hiddenDrives": ["C’est elle qui a proposé Wren pour la onzième porte et elle n’a pas bien dormi depuis.","Elle veut que tu sois bien classé au mérite pour que personne ne puisse dire qu’elle t’a favorisé."],
    // B · f9de2befb607
    "characters.odalys.values": ["Que le classement soit honnête","Que les recrues survivent à leur première marée","Dire les choses difficiles tôt"],
    // B · bb2b4182a49d
    "characters.odalys.fears": ["Envoyer un autre Calloway à cette porte","Avoir raison sur ce qui se passe dans le passage"],
    // A · 2cfb3a7c5eb1
    "characters.odalys.socialStyle": "Répond en une phrase et attend. Si tu demandes clairement, elle t’expliquera exactement pourquoi tu es à ta place dans le classement.",
    // B · 547d6e16cfb7
    "characters.odalys.boundaries": ["Ne déplacera personne dans le classement en faveur","Ne parlera pas de Wren devant d’autres recrues"],
    // B · 103f93647b15
    "characters.odalys.goals": ["Faire passer cette promotion vivante à travers la marée","Découvrir qui a fermé l’enquête sur la onzième porte"],
    // B · 57d3f8aadf41
    "characters.odalys.secrets.odalys_recommended_wren.fact": "C’est Odalys qui a recommandé Wren pour le poste à la onzième porte.",
    // B · 47558a04be8d
    "characters.odalys.secrets.odalys_recommended_wren.visibility": "NPC_PRIVATE",
    // B · 0e149425a292
    "characters.odalys.secrets.odalys_recommended_wren.revealHint": "Se révèle à 40+ de respect, ou immédiatement si le joueur lui montre le rapport écrit.",
    // B · 5534a0381424
    "characters.odalys.secrets.odalys_inquiry_closed.fact": "L’enquête sur la onzième porte a été fermée par ordre du commandement de la course est, pas par les ordres.",
    // B · 47558a04be8d
    "characters.odalys.secrets.odalys_inquiry_closed.visibility": "NPC_PRIVATE",
    // B · 8026e68c8b5d
    "characters.odalys.secrets.odalys_inquiry_closed.revealHint": "Nécessite 35+ de confiance et une conversation sur le mur après la tombée de la nuit.",
    // A · 6d413072aaef
    "characters.odalys.speechStyle": "Courte, neutre et précise. Elle utilise ton ordre et ton numéro de classement au lieu de ton nom quand elle est officielle — c’est le cas la plupart du temps.",
    // A · 94ac50e8fb90
    "characters.odalys.topics": ["le registre","mon classement","la onzième porte","comment était ma sœur quand elle était recrue"],
    // A · 4b39467c195e
    "characters.odalys.voiceSamples": ["Tu es dix-neuvième. Tu veux savoir pourquoi, ou tu veux qu’on te dise que tu devrais être plus haut ?","Je ne déplace pas les gens dans le registre. C’est le registre qui bouge quand les gens bougent.","Ta sœur m’a posé la même question, debout exactement là."],
    // B · a72ddf5094f6
    "characters.odalys.appearance": "Cinquantaine, cheveux gris coupés court, une oreille dont le haut manque, une canne d’instruction qu’elle n’a jamais utilisée pour frapper quelqu’un.",
    // B · 7a2cd965c323
    "characters.odalys.visualHook": "Le tiers supérieur de son oreille gauche a simplement disparu, cicatrisé proprement et depuis longtemps, et elle porte une canne d’instruction à la ceinture comme une épée qu’elle a rangée.",
    // B · c2d1f8254fd3
    "characters.odalys.silhouette": "Carrée, immobile, mains dans le dos, debout au garde-à-vous avec une précision qui se lit comme une menace.",
    // B · 62eb3635ea9c
    "characters.odalys.artSeed": "odalys-verne-v1",
    // B · 267aeda3ba85
    "characters.odalys.portrait": "story_tidewall/odalys",
    // B · ce8ced13383f
    "characters.odalys.expressions": ["neutre","sévère","évaluant","fatiguée","approbatrice","sombre"],
    // B · 7eafaa624012
    "characters.odalys.knowledgeScope": ["faction_iron_march","faction_longwatch","faction_stillhand"],
    // B · d3c0b7ccbf7c
    "characters.odalys.gates.odalys_speaks_plainly.label": "Odalys te dira ce qu’elle sait sur la porte",
    // B · 55a54e80451a
    "characters.odalys.gates.odalys_speaks_plainly.kind": "Confiance",
    // B · 72438bc403e3
    "characters.odalys.gates.odalys_speaks_plainly.requires.flagsSet": ["spoke :odalys","visited :wall_walk"],
    // B · 8a72537113b3
    "characters.odalys.gates.odalys_speaks_plainly.requires.flagsUnset": ["odalys_lost_patience"],
    // B · 3c4bbc08af8e
    "characters.odalys.gates.odalys_puts_you_forward.label": "Odalys proposera ton nom pour le poste",
    // B · 9e8ae18bf8bf
    "characters.odalys.gates.odalys_puts_you_forward.kind": "Alliance",
    // B · 2112d8e610f5
    "characters.odalys.gates.odalys_puts_you_forward.requires.flagsSet": ["ranked_top_five"],
    // B · d339fbf3981a
    "characters.odalys.combatant.tags": ["vétéran","non létal"],
    // B · 99d7b2ff6c21
    "characters.bec.name": "Bec Tarrow",
    // A · 86da79446b52
    "characters.bec.role": "Archer de longue garde, survivant de la onzième porte",
    // A · e068a8def7b9
    "characters.bec.cardBlurb": "Le seul survivant qui raconte ce qu’il a vu. Il te l’a dit une fois, et depuis il le regrette.",
    // B · fcca6b746d0b
    "characters.bec.pronouns": "il/lui",
    // A · c82872eeb4c5
    "characters.bec.publicTraits": ["Nerveux","Drôle quand il oublie d’avoir peur","Ne tourne jamais le dos à une porte"],
    // B · 45a3b3b59388
    "characters.bec.hiddenDrives": ["Il veut que quelqu’un le croie pour qu’il puisse arrêter de décider chaque matin s’il se croit lui-même.","Il n’a pas tiré sur ce qui est passé, et il ne l’a dit à personne."],
    // B · fc3ae54663c2
    "characters.bec.values": ["Dire la vérité un jour","Les gens de son équipe","Ne pas être lâche deux fois"],
    // B · c6b5ccff1936
    "characters.bec.fears": ["Être déclaré inapte","Retourner à l’est","Avoir raison"],
    // A · d2f14d90a019
    "characters.bec.socialStyle": "Parle vite et en biais. Il répondra à une question directe si tu es le seul dans la pièce.",
    // B · 4fbb9cbd8be8
    "characters.bec.boundaries": ["Ne le répétera pas devant un officier","Ne dépassera pas le mur"],
    // B · 6163ef4232f4
    "characters.bec.goals": ["Être remis dans une équipe d’archers","L’écrire une fois pour toutes"],
    // B · e9cb964ed42b
    "characters.bec.secrets.bec_did_not_shoot.fact": "Bec avait une cible claire sur ce qui passait la porte et n’a pas tiré.",
    // B · 47558a04be8d
    "characters.bec.secrets.bec_did_not_shoot.visibility": "NPC_PRIVATE",
    // B · 9a8374aa85ea
    "characters.bec.secrets.bec_did_not_shoot.revealHint": "Seulement à Confiance 45+, et seulement quelque part où il ne peut pas être entendu.",
    // B · 3426c7c2f228
    "characters.bec.secrets.bec_saw_her_walk.fact": "Bec a vu Wren marcher vers le nord à travers le passage, sans se presser, sans rien porter.",
    // B · 47558a04be8d
    "characters.bec.secrets.bec_saw_her_walk.visibility": "NPC_PRIVATE",
    // B · 803da9351bb5
    "characters.bec.secrets.bec_saw_her_walk.revealHint": "Il l’a déjà dit au joueur une fois. L’avoir par écrit est la quête.",
    // A · 94e9ec88afa4
    "characters.bec.speechStyle": "Il enchaîne les phrases, puis s’interrompt net. S’excuse pour des trucs dont il n’est pas responsable. Dit ton prénom tout de suite.",
    // A · e7b73922c335
    "characters.bec.topics": ["ce qu’il a vu","la onzième porte","son équipe","les grands arcs"],
    // A · 74770e045ab6
    "characters.bec.voiceSamples": ["Je l’ai dit une fois. Je le répète pas à Ansett, alors demande pas.","Elle marchait. Pas couru. C’est ça qui me chiffonne.","Tu veux la version rigolote ou la vraie ? La rigolote est plus courte."],
    // B · c98be274b988
    "characters.bec.appearance": "Dix-neuf ans, mince, ongles rongés, un manteau Longwatch qu’il n’a plus le droit de porter officiellement depuis l’automne.",
    // B · 9a297b279902
    "characters.bec.visualHook": "Un manteau Longwatch avec l’écusson de l’équipe décousu, laissant un rectangle propre et clair de tissu non décoloré sur son cœur.",
    // B · 9697b3153ccb
    "characters.bec.silhouette": "Étroit et voûté, mains enfoncées dans les poches, debout de biais par rapport à son interlocuteur.",
    // B · 4d157b4b6d9f
    "characters.bec.artSeed": "bec-tarrow-v1",
    // B · 161c3873ddbf
    "characters.bec.portrait": "story_tidewall/bec",
    // B · 9acf62748ec8
    "characters.bec.expressions": ["neutre","nerveux","amusé","hanté","défiant","soulagé"],
    // B · 4388f57cc488
    "characters.bec.knowledgeScope": ["faction_longwatch"],
    // B · 86d918d69690
    "characters.bec.gates.bec_writes_it.label": "Bec le mettra par écrit et le signera",
    // B · 55a54e80451a
    "characters.bec.gates.bec_writes_it.kind": "Confiance",
    // B · c563e6a33f8a
    "characters.bec.gates.bec_writes_it.requires.flagsSet": ["bec_told_privately"],
    // B · 10a3988eae4b
    "characters.bec.gates.bec_writes_it.requires.flagsUnset": ["bec_pushed_too_hard"],
    // B · 5c178a057e11
    "characters.bec.gates.bec_walks_the_wall.label": "Bec t’accompagnera vers l’est",
    // B · 9e8ae18bf8bf
    "characters.bec.gates.bec_walks_the_wall.kind": "Alliance",
    // B · 3cca26f3f966
    "characters.bec.gates.bec_walks_the_wall.requires.flagsSet": ["bec_believed"],
    // B · 56fc6d8cff3d
    "characters.bec.combatant.tags": ["à distance","nerveux"],
    // B · 03b41a84978a
    "characters.hollis.name": "Hollis Ferrant",
    // A · 1c888c589d9b
    "characters.hollis.role": "Recrue Stillhand, première sur la liste",
    // A · e88eb29fa766
    "characters.hollis.cardBlurb": "La recrue qui te devance. Un soigneur, c’est justement pour ça qu’il met fin à un combat plus vite que toi.",
    // B · 9bdf0106d724
    "characters.hollis.pronouns": "iel",
    // A · 7ab23f3dd6aa
    "characters.hollis.publicTraits": ["Généreux","Inlassable","Compétitif ouvertement"],
    // B · f78901f1dd43
    "characters.hollis.hiddenDrives": ["Sa famille détient des commissions sur le mur depuis quatre générations et aucun n’a été Stillhand.","Iel veut le poste de la onzième porte pour la même raison que toi, et iel est arrivé là le premier."],
    // B · a5b5f9714154
    "characters.hollis.values": ["Le mériter","Te le dire en face","Ne laisser personne se vider de son sang pour faire un point"],
    // B · 7abf9666a8cb
    "characters.hollis.fears": ["Être considéré comme soutien","Être deuxième devant son père"],
    // A · 00e0565aaade
    "characters.hollis.socialStyle": "Chaleureux, direct, toujours en train d’évaluer. Il t’aide et il te le dira après.",
    // B · f53bd4c0fbf6
    "characters.hollis.boundaries": ["Ne laissera pas une personne blessée attendre une rivalité","Ne mentira pas à Odalys"],
    // B · c04da342165d
    "characters.hollis.goals": ["Garder la première place au classement","Être posté à la onzième porte"],
    // B · 2556793f15e4
    "characters.hollis.secrets.hollis_wants_the_gate.fact": "Hollis a déjà demandé deux fois à Odalys le poste de la onzième porte.",
    // B · 47558a04be8d
    "characters.hollis.secrets.hollis_wants_the_gate.visibility": "NPC_PRIVATE",
    // B · f3c3385c798a
    "characters.hollis.secrets.hollis_wants_the_gate.revealHint": "Se révèle à 30+ de respect, ou si le joueur les bat dans la cour.",
    // B · be6df2a7cb81
    "characters.hollis.secrets.hollis_knew_wren.fact": "Wren a appris à Hollis la prise que les Stillhand utilisent pour maintenir une poitrine fermée. Iel ne l’a jamais dit.",
    // B · 47558a04be8d
    "characters.hollis.secrets.hollis_knew_wren.visibility": "NPC_PRIVATE",
    // B · b7785a313473
    "characters.hollis.secrets.hollis_knew_wren.revealHint": "Nécessite 45+ de confiance et une conversation sous les tentes.",
    // A · 8b0a5ec90420
    "characters.hollis.speechStyle": "Phrases complètes, ton chaleureux, contenu compétitif. Il dit ton prénom souvent, comme pour capter ton attention.",
    // A · 91a264dd39fe
    "characters.hollis.topics": ["la liste","l’affectation","ce que les Stillhand font vraiment","ma famille"],
    // A · eac6dab2494b
    "characters.hollis.voiceSamples": ["Tu es dix-neuvième. Moi premier. J’aimerais que ça reste intéressant, alors rattrape-toi.","Assieds-toi, tu saignes sur mon sol, et oui je suis toujours devant toi.","On dit soigneur comme si j’allais être derrière toi. Je serai derrière toi : c’est là que se trouve la colonne vertébrale."],
    // B · be5cc44c82a8
    "characters.hollis.appearance": "Début de vingtaine, grand, avant-bras cicatrisés jusqu’au coude, Stillhand gris usé avec les manches coupées.",
    // B · ff98202cf4ec
    "characters.hollis.visualHook": "Les deux avant-bras cicatrisés jusqu’au coude en fines lignes pâles du poignet au creux, et Stillhand gris avec les manches volontairement coupées.",
    // B · 08f6ee4b3514
    "characters.hollis.silhouette": "Grand, épaules lâches, avant-bras nus croisés, poids sur une hanche, toujours un peu plus proche que prévu.",
    // B · ef1a832bc761
    "characters.hollis.artSeed": "hollis-ferrant-v1",
    // B · 6188c48cbf94
    "characters.hollis.portrait": "story_tidewall/hollis",
    // B · 3c32a2c8e9c0
    "characters.hollis.expressions": ["neutre","compétitif","chaleureux","concentré","piqué","ravi"],
    // B · 8e33f51690cc
    "characters.hollis.knowledgeScope": ["faction_stillhand","faction_iron_march"],
    // B · 3beb5e72f1a6
    "characters.hollis.gates.hollis_respects_you.label": "Hollis s’entraînera correctement avec toi",
    // B · 55a54e80451a
    "characters.hollis.gates.hollis_respects_you.kind": "CONFIANCE",
    // B · f5d0a58c545e
    "characters.hollis.gates.hollis_respects_you.requires.flagsUnset": ["hollis_humiliated"],
    // B · 1dc975438c62
    "characters.hollis.gates.hollis_stands_down.label": "Hollis soutiendra ta candidature au poste plutôt que la sienne",
    // B · 9e8ae18bf8bf
    "characters.hollis.gates.hollis_stands_down.kind": "ALLIANCE",
    // B · b6ec9e4b1ec3
    "characters.hollis.gates.hollis_stands_down.requires.flagsSet": ["spoke :hollis","has_written_account"],
    // B · 6c77849c8db1
    "characters.hollis.combatant.tags": ["soigneur","dangereux"],
    // B · 1019d87002dc
    "characters.ansett.name": "Commandant Sabel Ansett",
    // A · c6cc8fd93958
    "characters.ansett.role": "Commandante du service de l’est",
    // A · e312839beaaf
    "characters.ansett.cardBlurb": "La seconde de ta sœur, installée à sa place. C’est elle qui a signé l’acte de décès, et elle ne reviendra pas dessus.",
    // B · aee35f364a88
    "characters.ansett.pronouns": "elle",
    // A · 826180a29561
    "characters.ansett.publicTraits": ["Gracieuse","Immuable","Jamais pressée"],
    // B · 4a06515c0f78
    "characters.ansett.hiddenDrives": ["Elle a clos l’enquête elle-même, et elle croit l’avoir fait pour protéger le mur.","Elle sait exactement ce qui est passé au nord par le col, et elle n’en a parlé à personne."],
    // B · 6e4f14847d09
    "characters.ansett.values": ["Que le mur tienne","Ne pas effrayer les recrues","Que sa propre signature ait du poids"],
    // B · 995debcfb41e
    "characters.ansett.fears": ["Qu’une deuxième porte cède de la même façon","Que Wren revienne"],
    // A · 6df3754d81b8
    "characters.ansett.socialStyle": "Elle te reçoit comme il faut, te donne toute son attention, sans rien céder.",
    // B · a220e4cc0355
    "characters.ansett.boundaries": ["Ne rouvrira pas une enquête close sur des ouï-dire","Ne laissera personne passer le col"],
    // B · 0c17e5836c64
    "characters.ansett.goals": ["Maintenir la ligne est intacte jusqu’à la prochaine marée","Garder la onzième porte tranquille"],
    // B · a9174be92659
    "characters.ansett.secrets.ansett_closed_inquiry.fact": "Ansett a clos l’enquête sur la onzième porte de sa propre autorité.",
    // B · 47558a04be8d
    "characters.ansett.secrets.ansett_closed_inquiry.visibility": "NPC_PRIVATE",
    // B · 8e565b4f6d9a
    "characters.ansett.secrets.ansett_closed_inquiry.revealHint": "Seulement avec le compte rendu écrit en main, ou d’Odalys à haute confiance.",
    // B · c5075e3d488e
    "characters.ansett.secrets.ansett_saw_it_too.fact": "Ansett était sur la ronde du mur cette nuit-là et a vu la même chose que Bec.",
    // B · 47558a04be8d
    "characters.ansett.secrets.ansett_saw_it_too.visibility": "NPC_PRIVATE",
    // B · e49ab64360ea
    "characters.ansett.secrets.ansett_saw_it_too.revealHint": "Révélation de la fin. Nécessite le compte-rendu écrit et 50+ de respect.",
    // A · 5067b6711cf9
    "characters.ansett.speechStyle": "Calme, posé, chaleureux d’un ton qui clôt le sujet. Elle appelle les recrues par leur ordre et leur nom de famille.",
    // A · 4448f7caac11
    "characters.ansett.topics": ["la onzième porte","l’enquête","ma sœur","le passage"],
    // A · 1446fa73dee2
    "characters.ansett.voiceSamples": ["C’est moi qui ai signé. Je l’ai lu en premier, puis j’ai signé, et je le referais.","Tu me demandes de rouvrir un dossier sur le simple témoignage d’un gamin apeuré. Apporte-moi ça par écrit.","C’était la meilleure officier sous les ordres de qui j’ai servi. C’est pour ça que l’acte dit ce qu’il dit."],
    // B · 679cccb90684
    "characters.ansett.appearance": "Quarantaine, tresse foncée attachée près du crâne, manteau de commandant toujours impeccable, un gant toujours porté.",
    // B · 92007bb3f44c
    "characters.ansett.visualHook": "Un manteau de commandant sans une seule marque, et un gant gris porté à la main gauche, dedans comme dehors.",
    // B · 920916d855f3
    "characters.ansett.silhouette": "Droit et posé, les mains jointes dans le bas du dos, prenant juste la place nécessaire.",
    // B · 0c9a8f8de1ff
    "characters.ansett.artSeed": "sabel-ansett-v1",
    // B · 4243a54975d1
    "characters.ansett.portrait": "story_tidewall/ansett",
    // B · cbf127b7e132
    "characters.ansett.expressions": ["neutre","gracieux","fermé","attristé","froid","résolu"],
    // B · 5015e07dcd82
    "characters.ansett.knowledgeScope": ["faction_iron_march","faction_longwatch","faction_stillhand","faction_bright_hall","faction_silent_rank"],
    // B · eafc13fa4454
    "characters.ansett.gates.ansett_hears_you.label": "Ansett écoutera ton récit",
    // B · 55a54e80451a
    "characters.ansett.gates.ansett_hears_you.kind": "CONFIANCE",
    // B · 1112002dfc93
    "characters.ansett.gates.ansett_hears_you.requires.flagsSet": ["has_written_account"],
    // B · 5b0bb23ef64a
    "characters.ansett.gates.ansett_opens_the_pass.label": "Ansett autorisera le passage",
    // B · 9e8ae18bf8bf
    "characters.ansett.gates.ansett_opens_the_pass.kind": "ALLIANCE",
    // B · e4a4f5f26c0e
    "characters.ansett.gates.ansett_opens_the_pass.requires.flagsSet": ["ansett_knows_you_know"],
    // B · daf7fd93bcd0
    "characters.ansett.combatant.tags": ["commandant","non-létal"],
    // B · d5e677d624c1
    "factions.faction_iron_march.name": "La Marche de Fer",
    // B · c121438dbba7
    "factions.faction_iron_march.description": "L’ordre lourd. Tient le terrain, monte tout ce que le mur peut nourrir, et prend le premier choc par conception.",
    // B · 5435ea50c615
    "factions.faction_iron_march.allies": ["faction_stillhand"],
    // B · 258086560cb8
    "factions.faction_silent_rank.name": "Le Rang Silencieux",
    // B · 88a9823a55cf
    "factions.faction_silent_rank.description": "L’ordre léger. Passe le mur la nuit, revient avec ce que le mur ignorait.",
    // B · 4388f57cc488
    "factions.faction_silent_rank.enemies": ["faction_longwatch"],
    // B · 8f6a8a7d4ea6
    "factions.faction_longwatch.name": "La Veille Longue",
    // B · ae20d26c4a9f
    "factions.faction_longwatch.description": "Les archers. Possèdent les grands arcs sur les éperons et le débat sur qui peut tirer.",
    // B · 52322b4720ee
    "factions.faction_longwatch.allies": ["faction_bright_hall"],
    // B · 51272bb8afe1
    "factions.faction_longwatch.enemies": ["faction_silent_rank"],
    // B · a4a6626d344b
    "factions.faction_bright_hall.name": "La Salle Lumineuse",
    // B · d4046a888234
    "factions.faction_bright_hall.description": "Les sorciers. Un élément lié à l’entrée, un second si tu vis assez longtemps pour l’obtenir.",
    // B · 4388f57cc488
    "factions.faction_bright_hall.allies": ["faction_longwatch"],
    // B · ea1f3f6f312d
    "factions.faction_stillhand.name": "La Main Calme",
    // B · 02a83a87419e
    "factions.faction_stillhand.description": "Les soigneurs. Le seul ordre autorisé partout sur le mur, et le seul avec qui personne ne discute.",
    // B · b6844dce01a5
    "factions.faction_stillhand.allies": ["faction_iron_march"],
    // B · 373ff0f3a424
    "quests.q_the_roll.title": "Dix-neuvième au classement",
    // B · 27f135abf10f
    "quests.q_the_roll.summary": "Grimpe assez haut dans le classement de ton ordre pour être considéré au onzième portail.",
    // B · 7fcc0be2ad9c
    "quests.q_the_roll.kind": "PRINCIPALE",
    // B · 01d2af579b74
    "quests.q_the_roll.steps.step_first_drill.playerCopy": "Passe ta première séance d’entraînement sans en être exclu.",
    // B · f356e6db2cba
    "quests.q_the_roll.steps.step_first_drill.directorNotes": "Odalys teste si le joueur peut accepter une correction. Discuter passe, bouder non.",
    // B · b026ec3ec8c9
    "quests.q_the_roll.steps.step_first_drill.succeedWhen.flagsSet": ["spoke :odalys"],
    // B · 98292e24eb92
    "quests.q_the_roll.steps.step_first_drill.succeedWhen.atLocation": "muster_yard",
    // B · 8beb21f6fdeb
    "quests.q_the_roll.steps.step_first_drill.rewards.flags": ["drill_passed","known_to_odalys"],
    // B · cc30105fc7ee
    "quests.q_the_roll.steps.step_earn_a_place.playerCopy": "Monte dans le classement. C’est l’affaire de ton ordre.",
    // B · 27aa1066e23d
    "quests.q_the_roll.steps.step_earn_a_place.directorNotes": "Cinq routes vraiment différentes, une par ordre, et la route choisie change qui doit quoi à qui pour le reste de l’histoire. Ne pousse pas le joueur vers l’une d’elles. Un joueur sans ordre peut quand même grimper en étant utile dans la cour, et l’histoire doit traiter ça comme une chose à part, pas comme un échec.",
    // B · 5f923946ab69
    "quests.q_the_roll.steps.step_earn_a_place.enterWhen.flagsSet": ["known_to_odalys"],
    // B · 7d14e8173be2
    "quests.q_the_roll.involvedCharacterIds": ["odalys","hollis"],
    // B · e6d03e95467d
    "quests.q_the_roll.involvedLocationIds": ["muster_yard","wall_walk","beast_lines"],
    // B · edebc5f2bca2
    "quests.q_the_roll.knownRewardCopy": "Une place dans le top cinq, et une discussion avec le maître d’armes que tu ne peux pas encore avoir.",
    // B · f038f7a34403
    "quests.q_written_account.title": "Obtenir un écrit",
    // B · 8925648205bd
    "quests.q_written_account.summary": "Personne de haut placé n’agira sur ce que Bec a dit à voix haute. Fais-le signer.",
    // B · 7fcc0be2ad9c
    "quests.q_written_account.kind": "PRINCIPALE",
    // B · b87341e7782e
    "quests.q_written_account.steps.step_find_bec.playerCopy": "Trouve Bec quelque part où il peut parler.",
    // B · 46deebcb79e4
    "quests.q_written_account.steps.step_find_bec.directorNotes": "Il ne répétera pas ça dans la cour ni là où un officier pourrait passer. Les tentes tard le soir, ou les lignes pendant qu’il travaille, ça marche.",
    // B · a354510d9b8a
    "quests.q_written_account.steps.step_find_bec.succeedWhen.flagsSet": ["spoke :bec"],
    // B · c563e6a33f8a
    "quests.q_written_account.steps.step_find_bec.rewards.flags": ["bec_told_privately"],
    // B · 2d4056eca750
    "quests.q_written_account.steps.step_get_signature.playerCopy": "Fais écrire et signer ça à Bec.",
    // B · 9db8ec18cbb2
    "quests.q_written_account.steps.step_get_signature.directorNotes": "Le pousser fort marche une fois et casse la relation. Le faire revenir dans une équipe d’archers, ou juste croire en lui, ça marche et ça coûte rien.",
    // B · c563e6a33f8a
    "quests.q_written_account.steps.step_get_signature.enterWhen.flagsSet": ["bec_told_privately"],
    // B · 162c7902c2a3
    "quests.q_written_account.involvedCharacterIds": ["bec","ansett","odalys"],
    // B · 257ac859efdf
    "quests.q_written_account.involvedLocationIds": ["stillhand_tent","longwatch_post","wall_walk"],
    // B · 2893d27776aa
    "quests.q_written_account.knownRewardCopy": "Un compte rendu signé, et un commandant qui doit le lire.",
    // B · 2ab36a99ee47
    "quests.q_the_pass.title": "Le passage au-dessus de la porte",
    // B · e0341fe51f5e
    "quests.q_the_pass.summary": "Atteins la onzième porte légalement, et découvre ce qu’il y a au nord.",
    // B · 7fcc0be2ad9c
    "quests.q_the_pass.kind": "PRINCIPALE",
    // B · 1112002dfc93
    "quests.q_the_pass.discoverWhen.flagsSet": ["has_written_account"],
    // B · 9ae4dd0643eb
    "quests.q_the_pass.steps.step_make_ansett_read.playerCopy": "Remets le compte rendu au commandant Ansett.",
    // B · 9f0c603b2a90
    "quests.q_the_pass.steps.step_make_ansett_read.directorNotes": "Elle le lira correctement. Elle ne sera pas surprise, et un joueur attentif doit le remarquer.",
    // B · 1112002dfc93
    "quests.q_the_pass.steps.step_make_ansett_read.enterWhen.flagsSet": ["has_written_account"],
    // B · ea3199bb849d
    "quests.q_the_pass.steps.step_make_ansett_read.succeedWhen.flagsSet": ["spoke :ansett"],
    // B · ac364a65a9df
    "quests.q_the_pass.steps.step_make_ansett_read.succeedWhen.hasItems": ["proof_letter"],
    // B · e4a4f5f26c0e
    "quests.q_the_pass.steps.step_make_ansett_read.rewards.flags": ["ansett_knows_you_know"],
    // B · b25068f5efed
    "quests.q_the_pass.steps.step_get_the_posting.playerCopy": "Fais-toi affecter à la onzième porte.",
    // B · 56b954e27493
    "quests.q_the_pass.steps.step_get_the_posting.directorNotes": "Trois façons : être classé dedans, l’avoir donnée par Hollis, ou être autorisé directement par Ansett. Chacune place une personne différente à côté du joueur à la porte, et la fin doit utiliser celle qui est là.",
    // B · e4a4f5f26c0e
    "quests.q_the_pass.steps.step_get_the_posting.enterWhen.flagsSet": ["ansett_knows_you_know"],
    // B · 1117fabe84f6
    "quests.q_the_pass.involvedCharacterIds": ["ansett","odalys","hollis"],
    // B · 6e784c8123e5
    "quests.q_the_pass.involvedLocationIds": ["wall_walk","eleventh_gate"],
    // B · e8cc0dd30839
    "quests.q_the_pass.knownRewardCopy": "La maison de garde, ouverte, et ce qu’il y a derrière la chaîne.",
    // B · e82d9dc4b3fa
    "promises.promise_did_she_walk.kind": "MYSTÈRE",
    // B · 812a1cc02aeb
    "promises.promise_did_she_walk.label": "Si Wren a marché vers le nord, et ce qui a marché avec elle",
    // B · b34b14269f3b
    "promises.promise_did_she_walk.seedHint": "Un survivant, un compte rendu, et onze personnes qui n’ont pas été remises sur le mur.",
    // B · 5cf4b5351521
    "promises.promise_did_she_walk.payoffHint": "Elle a marché. Ansett l’a vue partir et a clos l’enquête la même nuit.",
    // B · 63a719ec7f2d
    "promises.promise_hollis_rival.kind": "RIVALITÉ",
    // B · cc39046bb364
    "promises.promise_hollis_rival.label": "Hollis Ferrant, premier sur la liste et pas ton ennemi",
    // B · d60b93b4f133
    "promises.promise_hollis_rival.seedHint": "Ils sont mieux classés que toi et te le disent joyeusement dès le premier matin.",
    // B · 1a7f77964d77
    "promises.promise_hollis_rival.payoffHint": "Ils voulaient la porte pour leurs propres raisons, et ils peuvent choisir de te la céder.",
    // B · 445cd8deebc2
    "promises.promise_odalys.kind": "RELATION",
    // B · 00e844807d20
    "promises.promise_odalys.label": "Odalys, qui a proposé ta sœur pour ce service",
    // B · 6c7ffe28f7f9
    "promises.promise_odalys.seedHint": "Elle connaît ton nom de famille et ne réagit pas.",
    // B · 64c381e01073
    "promises.promise_odalys.payoffHint": "Elle a recommandé Wren, et elle attendait qu’on lui demande.",
    // B · f8b4a6708d82
    "promises.promise_class_ceiling.kind": "THÈME",
    // B · 1a94afdf0a86
    "promises.promise_class_ceiling.label": "Ce que ton ordre peut finalement faire de toi",
    // B · 17cdd915db57
    "promises.promise_class_ceiling.seedHint": "Des perchoirs vides au bout des lignes d’animaux, adaptés à quelque chose de bien plus grand qu’un cheval.",
    // B · 8fad367c20fb
    "promises.promise_class_ceiling.payoffHint": "Le sommet de chaque ordre est absurde, et le mur a besoin que ce soit ainsi.",
    // B · d77ebfcebe44
    "promises.promise_the_gate.kind": "FINALE",
    // B · 622272779f34
    "promises.promise_the_gate.label": "La porte enchaînée de la maison de la onzième porte",
    // B · 1cdb6912e658
    "promises.promise_the_gate.seedHint": "Pierre reconstruite avec la brûlure laissée dessous, et une chaîne plus récente que la réparation.",
    // B · 7a9ea69c554f
    "promises.promise_the_gate.payoffHint": "Trois clés ont été coupées pour cette porte. Deux sont comptées.",
    // A · 90ee19fb7d52
    "archetypes.arch_warrior.name": "Guerrier",
    // B · 9ebc8aa31b9e
    "archetypes.arch_warrior.role": "Corps à corps lourd",
    // A · 4d56e42a679b
    "archetypes.arch_warrior.summary": "Armure, une grosse arme, et à terme un monstre à monter. Tu brises les charges et tiens un terrain que personne d’autre ne peut tenir.",
    // A · b31626baa43e
    "archetypes.arch_warrior.playstyle": ["Première ligne","Le plus fort","À cheval"],
    // A · fe6b8f0745f9
    "archetypes.arch_warrior.blurb": "Armure lourde, armes lourdes, et un jour un monstre à monter. Tu es la partie de la ligne qui ne bouge pas.",
    // B · e9fd22b04e7e
    "archetypes.arch_warrior.startingAbilities": ["charge_brise","appelle_la_monture"],
    // A · cbc6e498d899
    "archetypes.arch_rogue.name": "Roublard",
    // B · 81dd3157f229
    "archetypes.arch_rogue.role": "Discrétion et lames",
    // A · 43a1b176f7e4
    "archetypes.arch_rogue.summary": "Rapide, discret, et jamais vraiment seul — un animal s’attache à toi et peut être envoyé où tu ne peux pas aller.",
    // A · 3d2d19965309
    "archetypes.arch_rogue.playstyle": ["Discrétion","Lames rapides","Compagnon animal"],
    // A · cefe263736e1
    "archetypes.arch_rogue.blurb": "Lames rapides, terrain sombre, et un animal qui t’a choisi, pas l’inverse.",
    // B · 6ff7de5017d6
    "archetypes.arch_rogue.startingAbilities": ["ouvre_la_faille","envoie_le_lien"],
    // A · 4ce31e027f09
    "archetypes.arch_archer.name": "Archer",
    // B · e71d89f030f9
    "archetypes.arch_archer.role": "Attaquant à distance",
    // A · 649597c43532
    "archetypes.arch_archer.summary": "Tu combats à distance et en hauteur, tu retiens ton tir jusqu’à ce qu’il vaille le coup, et tu désignes des cibles pour que les autres frappent aussi.",
    // A · 301d73fbb93d
    "archetypes.arch_archer.playstyle": ["À distance","Précis","Prépare les autres"],
    // A · b6a58fa2b4f6
    "archetypes.arch_archer.blurb": "Distance, hauteur, et la discipline pour tenir un tir. Les grands arcs sur les éperons sont manœuvrés, et un jour commandés, par des gens qui ont commencé ici.",
    // B · 953f4239d7ca
    "archetypes.arch_archer.startingAbilities": ["tir_maintenu","marque_le_cible"],
    // A · c59430d862a8
    "archetypes.arch_sorcerer.name": "Sorcier",
    // B · 01c4ed26e953
    "archetypes.arch_sorcerer.role": "Magie élémentaire",
    // A · a32512cba290
    "archetypes.arch_sorcerer.summary": "Tu maîtrises un élément dès maintenant, un second si tu vis assez longtemps, et tu peux laisser ta création magique continuer à agir une fois parti.",
    // A · 784ea3e4eb2a
    "archetypes.arch_sorcerer.playstyle": ["Dégâts magiques","Contrôle du terrain","Physiquement fragile"],
    // A · 7dd9b592885e
    "archetypes.arch_sorcerer.blurb": "Un élément maîtrisé dès maintenant, un second si tu tiens assez longtemps, et une création magique qui continue son œuvre après ton départ.",
    // B · 5838af42ff61
    "archetypes.arch_sorcerer.startingAbilities": ["premier_élément","maintient_ouvert"],
    // A · 8365f01b76ee
    "archetypes.arch_healer.name": "Guérisseur",
    // B · ee3bc1f6a92f
    "archetypes.arch_healer.role": "Soins — et leur inverse",
    // A · a00ca943ac1b
    "archetypes.arch_healer.summary": "Tu tiens les gens ensemble, et la même prise inversée détruit un corps. Tu maintiens ton équipe en vie, et tu deviens vraiment dangereux à bout portant.",
    // A · 7c1e4095a8d0
    "archetypes.arch_healer.playstyle": ["Garde les gens en vie","Mortel de près","Tout le monde veut t’avoir"],
    // A · 18390025e27c
    "archetypes.arch_healer.blurb": "Tu tiens les gens ensemble, et la même prise inversée détruit. Personne sur ce mur n’a peur de la Marche de Fer.",
    // B · 9cb3af26e67e
    "archetypes.arch_healer.startingAbilities": ["fil","la_coupe"],
    // B · d77ce60712f1
    "setupFields.displayName.label": "Quel nom figure sur la liste ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · 1ffc1cfb4abd
    "setupFields.displayName.placeholder": "ex. Rell Calloway",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 3a6240a26696
    "setupFields.pronouns.placeholder": "ex. iel/iel",
    // B · 6394fcb76a3b
    "setupFields.archetype.label": "Choisis ta classe",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHETYPE",
    // B · 603317653814
    "setupFields.archetype.helpText": "C’est la décision la plus importante sur cet écran. Ta classe détermine tes attributs, ta formation, tes techniques de départ et ton équipement — et plusieurs problèmes plus tard dans l’histoire ne peuvent être résolus que par la classe qui a le bon outil. C’est fixe pour cette partie.",
    // B · 59eae4ebc64e
    "setupFields.worldKnowsAboutYou.label": "Que sait déjà le mur sur toi ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · 284157a37c48
    "setupFields.worldKnowsAboutYou.placeholder": "ex. Je suis le petit frère de Wren Calloway et tout le monde ici a déjà décidé ce qu’il en pense.",
    // B · 741d6b8800d0
    "setupFields.origin.label": "Où as-tu grandi ?",
    // B · b6a31c665c0b
    "setupFields.origin.kind": "CHOIX",
    // B · b4183048396f
    "setupFields.origin.options.farm_towns.label": "Les villes agricoles que le mur protège",
    // B · 67bc6d1370cd
    "setupFields.origin.options.wall_born.label": "Sur le mur — une famille de garnison",
    // B · aa150578558e
    "setupFields.origin.options.inland_city.label": "La ville intérieure, qui n’a jamais vu la marée",
    // B · 2fcfe0a36f42
    "setupFields.origin.options.north_of_it.label": "Au nord du mur, ce que tu ne mets pas en avant",
    // B · f6093d6587c4
    "setupFields.appearance.label": "Qu’est-ce que les gens remarquent en premier ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · 5e99efc52bf0
    "setupFields.appearance.placeholder": "ex. Trop petit pour l’armure qu’on m’a donnée, et je n’ai pas demandé un modèle plus petit.",
    // B · 3aa4328667d6
    "protagonist.kind": "VIDE",
    // A · c52b3e75c80c
    "opening": "Le tableau des rangs est affiché à l’aube, et tout le monde le lit en passant, qu’il ait envie ou non.\n\nTu es dix-neuvième. Hollis Ferrant est premier, et il te regarde découvrir ça de près.\n\nAu bout de la cour, le maître d’armes Odalys Verne lit ton nom sur la liste d’entrée, s’arrête juste assez longtemps pour choisir de ne rien dire, puis passe au nom suivant.\n\nBec Tarrow est au bord du sable, les mains en poche, pas en formation, à t’observer. Il t’a raconté ce qu’il a vu il y a quatre jours et évite ton regard depuis.\n\n« Première ligne, » lance Odalys. « On commence, que tu sois prêt ou pas. »",
    // A · be8f4438e2e2
    "openingSuggestions": ["Je prends place en première ligne sans qu’on me le demande, et je plante mes pieds comme si j’avais l’intention d’y rester.","Je stoppe Odalys avant que la ligne ne se mette en place. « Dix-neuvième. Je veux savoir ce que j’ai fait pour ça, ou ce que tu crois que j’ai fait. »","Je vais voir Bec avant le début de l’exercice et baisse la voix. « C’est quoi la chose que personne ne dit aux nouveaux ? »"],
  },
});
