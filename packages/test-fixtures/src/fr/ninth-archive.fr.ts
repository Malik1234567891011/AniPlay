import { registerWorldText } from '@aniplay/contracts';

/**
 * The Ninth Archive, in French.
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
  storyId: "story_ninth_archive",
  text: {
    // A · 8b39256ed232
    "fantasyLabel": "L’académie affirme que ton admission n’a jamais eu lieu.",
    // A · 02b737a017d4
    "hook": "Ton dossier scolaire a disparu. Tu es toujours devant la porte, la lettre d’admission en main.",
    // A · f5e7d792fa6e
    "premise": "L’académie Verath garde un dossier magique pour chacun de ses élèves. Ce dossier vit dans les archives, et le sort sur la porte d’entrée le vérifie chaque matin pour décider qui peut passer. Le premier jour, la porte a cherché ton dossier et n’a rien trouvé. Pour Verath, ton admission n’a jamais eu lieu.\n\nC’est impossible. Tu as une lettre d’admission, une chambre, un emploi du temps. Soit l’académie a commis une erreur inédite, soit quelqu’un a fait disparaître ton dossier exprès.\n\nLa porte vire au rouge : c’est le signal qui interdit l’entrée. Un préfet nommé Kael a reçu l’ordre d’enquêter sur toi. Une assistante des archives, Mira, te couvre en douce et semble en savoir plus qu’elle ne dit. Le surveillant qui valide les modifications de dossier se montre très gentil avec toi, et c’est ce qui t’inquiète le plus.\n\nTu as un trimestre pour découvrir qui a fait ça, et pourquoi, avant que la porte cesse de voir ça comme une erreur et te classe parmi les intrus. Ici, on n’expulse jamais les élèves. On les transfère, et ces transferts n’arrivent nulle part.",
    // A · 4af64c2c7a9b
    "mechanicsChips": ["Enquête","Protection","Relations","Discrétion","Factions"],
    // A · b99c7954dd86
    "creatorNote": "Un mystère qu’on a le droit de perdre. Se faire attraper ne relance pas l’histoire. Elle change : la porte s’en souvient, tout comme les témoins.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · 92c7ded71776
    "rules.hardCanon": ["Le neuvième archive existe et n’est sur aucune carte de l’Académie.","Le feu de garde est silencieux. Il ne fait jamais de bruit, c’est pourquoi il fait peur.","Les ordres d’effacement demandent deux signatures du corps enseignant. La tienne n’en a qu’une.","Aucun étudiant n’a jamais été expulsé de Verath. Ils sont transférés, et les transferts n’arrivent pas."],
    // A · 23ab911e7ebb
    "rules.toneGuide": "Pierre froide, lampes chaudes, et des gens prudents entre eux. La menace est procédurale, pas monstrueuse — le danger, c’est de la paperasse tranchante. Un humour sec est bienvenu ; le mélodrame, non.",
    // B · 96392567f1b6
    "skills.arcana_lore.name": "Connaissance des arcanes",
    // B · 5dbc8bb102ac
    "skills.arcana_lore.attribute": "arcane",
    // B · da3cb9c1e6ed
    "skills.arcana_lore.description": "Ce qu’un sigil signifie, et qui l’a écrit.",
    // B · 39d7487500d4
    "skills.warding.name": "Protection",
    // B · 5dbc8bb102ac
    "skills.warding.attribute": "arcane",
    // B · 8b24f485cd25
    "skills.warding.description": "Lire, plier et survivre aux gardes de l’Académie.",
    // B · 35d7611f1337
    "skills.investigation.name": "Investigation",
    // B · a8c1fa8269c3
    "skills.investigation.attribute": "esprit",
    // B · f4686b8f8f44
    "skills.investigation.description": "Trouver la page que quelqu’un espérait que tu ne trouverais pas.",
    // B · 72a55afdb2b2
    "skills.stealth.name": "Discrétion",
    // B · 7ce3b6387340
    "skills.stealth.attribute": "agilité",
    // B · 15bcda379dd2
    "skills.stealth.description": "Se déplacer dans un bâtiment qui fait attention.",
    // B · 1623ed164eb7
    "skills.sleight.name": "Dextérité",
    // B · 7ce3b6387340
    "skills.sleight.attribute": "agilité",
    // B · 165ff1659156
    "skills.sleight.description": "Prendre une clé sans prendre une clé.",
    // B · 04890a36609e
    "skills.persuasion.name": "Persuasion",
    // B · cfb7a15645c3
    "skills.persuasion.attribute": "présence",
    // B · a53093c3c2e8
    "skills.persuasion.description": "Être cru, ce qui est plus dur qu’avoir raison.",
    // B · 4f64eb4d5f30
    "skills.deception.name": "Tromperie",
    // B · cfb7a15645c3
    "skills.deception.attribute": "présence",
    // B · f1ca66645d94
    "skills.deception.description": "Être cru alors qu’on ment exprès.",
    // B · 739d0c6c6f23
    "skills.intimidation.name": "Intimidation",
    // B · cfb7a15645c3
    "skills.intimidation.attribute": "présence",
    // B · 49becade4abc
    "skills.intimidation.description": "Faire d’un problème celui de quelqu’un d’autre.",
    // B · cf929c9acc8a
    "skills.composure.name": "Calme",
    // B · 4c84c2c842d0
    "skills.composure.attribute": "volonté",
    // B · adbf1ae7f052
    "skills.composure.description": "Ne pas flancher quand la garde devient rouge.",
    // B · 202aa3d6651d
    "skills.athletics.name": "Athlétisme",
    // B · 97081b4b4792
    "skills.athletics.attribute": "force",
    // B · b537ad105af9
    "skills.athletics.description": "Escaliers, corniches, et la petite bousculade.",
    // B · ea0b35a4dc9f
    "resources.health.name": "Santé",
    // B · 34e8ec1ac388
    "resources.health.polarity": "BON ÉLEVÉ",
    // B · 18e7cdaba2de
    "resources.health.zeroStateConsequence": "Tu tombes. Dans ce monde, ça veut dire l’infirmerie et des questions, pas la mort.",
    // B · 1a3c168896b6
    "resources.health.color": "#FF5B69",
    // B · b80dc93401f9
    "resources.focus.name": "Concentration",
    // B · 34e8ec1ac388
    "resources.focus.polarity": "BON ÉLEVÉ",
    // B · f14fcb2fd9e2
    "resources.focus.zeroStateConsequence": "Les sigils deviennent flous. Toute tentative d’arcane se fait avec un désavantage.",
    // B · bffd32432679
    "resources.focus.color": "#7C6CFF",
    // B · be21ca8ec2a1
    "resources.suspicion.name": "Suspicion",
    // B · a34adbda2422
    "resources.suspicion.polarity": "GOOD_LOW",
    // B · d38107bc5706
    "resources.suspicion.zeroStateConsequence": "Les Gardes perdent tout intérêt pour toi. Pour l’instant.",
    // B · ad1dcb42b294
    "resources.suspicion.color": "#F6BE55",
    // A · 9359faa57fb8
    "items.acceptance_letter.name": "Lettre d’admission",
    // B · 061625d9bd60
    "items.acceptance_letter.tags": ["quête","document"],
    // B · 44b310455dd1
    "items.acceptance_letter.description": "Une page, sceau de l’académie, ton nom à l’encre. Le seul objet au monde qui prouve que tu as ta place ici.",
    // B · 2f1b3c613920
    "items.acceptance_letter.loreText": "Deux signatures en bas. L’une est celle du Gardien. L’autre a été contresignée tellement de fois que tu ne peux plus la lire.",
    // B · 4540c1847af8
    "items.acceptance_letter.icon": "letter",
    // A · e66221eddb2d
    "items.sigil_pendant.name": "Sceau non inscrit",
    // B · c30453abd4eb
    "items.sigil_pendant.tags": ["quête","arcane"],
    // B · 109aee51d362
    "items.sigil_pendant.description": "La marque qui ne devrait pas s’effacer. Chaud contre le sternum quand un garde la lit.",
    // B · 5fda19e41aaa
    "items.sigil_pendant.loreText": "La gravure est fraîche sous le ternissement. Quelqu’un l’a refaite cette année.",
    // B · 1536b61cd92b
    "items.sigil_pendant.icon": "sigil",
    // A · 0b76379d8c07
    "items.reading_lens.name": "Loupe de Cartwright",
    // B · f3a60c587a13
    "items.reading_lens.tags": ["outil"],
    // B · 110688b7cca2
    "items.reading_lens.equipSlot": "main",
    // B · 6d218bdc5ca0
    "items.reading_lens.rarity": "Peu commune",
    // B · e6d4b3ac3452
    "items.reading_lens.description": "Verre pour lire les palimpsestes. Montre la couche sous la couche.",
    // B · f4b0516ea439
    "items.reading_lens.loreText": "Propriété de C. Cartwright, dont le nom manque aussi au registre.",
    // B · b46badedd31f
    "items.reading_lens.icon": "lens",
    // A · dd9c6cfe4533
    "items.ward_chalk.name": "Craie de Protection",
    // B · 700d07bfe71d
    "items.ward_chalk.tags": ["consommable","arcane"],
    // B · 955bb41b3c7b
    "items.ward_chalk.description": "Un bout de craie de protection. Stabilise une main qui tremble et un sigil qui s’efface.",
    // B · 3882859a3280
    "items.ward_chalk.loreText": "Trois sont données à chaque étudiant par trimestre. Tu as pris soin de la tienne.",
    // B · 724381766f9a
    "items.ward_chalk.icon": "chalk",
    // A · 71f7a37a38ef
    "items.bramble_tonic.name": "Tonique d’Églantier",
    // B · e250e42f0877
    "items.bramble_tonic.tags": ["consommable","médicament"],
    // B · 415439dd145a
    "items.bramble_tonic.description": "Goût de haie. Fait l’effet d’une semaine de repos concentrée en une minute.",
    // B · a1afca023ee9
    "items.bramble_tonic.loreText": "Bram vend ça. Bram ne dit pas d’où ça vient.",
    // B · c93de720b80c
    "items.bramble_tonic.icon": "vial",
    // A · e4b628c5873a
    "items.stack_key.name": "Clé du Sous-secrétaire",
    // B · 0012b847fe68
    "items.stack_key.tags": ["quête","outil"],
    // B · 9f750d1373be
    "items.stack_key.description": "Ouvre les rayonnages après les heures. Surtout, elle n’ouvre pas la neuvième porte.",
    // B · 3d18a40a5e25
    "items.stack_key.loreText": "Les dents ont été limées. C’est une copie d’une copie.",
    // B · c0c1baf2fa65
    "items.stack_key.icon": "key",
    // A · b08287ad5d12
    "items.ledger_page.name": "Page Déchirée du Registre",
    // B · f88c6548fc3b
    "items.ledger_page.tags": ["quête","preuve"],
    // B · 479346d85632
    "items.ledger_page.description": "Un ordre d’effacement. Une signature là où il devrait y en avoir deux.",
    // B · 24adba842776
    "items.ledger_page.loreText": "La ligne de signature manquante a été grattée, pas coupée. Quelqu’un a changé d’avis.",
    // B · 861424bc7e8c
    "items.ledger_page.icon": "page",
    // A · a965a0a8db3f
    "abilities.sigil_read.name": "Lecture de Sigil",
    // B · c020b48991ef
    "abilities.sigil_read.tags": ["arcane","utilitaire"],
    // B · ed6f742b6ab6
    "abilities.sigil_read.description": "Fixe une marque du regard jusqu’à ce qu’elle révèle sa fonction.",
    // B · 39d896e20aec
    "abilities.sigil_read.targetRule": "SINGLE",
    // B · 5dbc8bb102ac
    "abilities.sigil_read.check.attribute": "arcana",
    // A · a8363c63aa72
    "abilities.veilstep.name": "Pas du Voile",
    // B · 2c3dbe99971d
    "abilities.veilstep.tags": ["arcane","discrétion"],
    // B · b0dfcb6d3320
    "abilities.veilstep.description": "Fais un pas dans la faille entre deux lampes et ressors là où la lumière ne va pas.",
    // B · 43afef8b429c
    "abilities.veilstep.targetRule": "SOI",
    // B · 5dbc8bb102ac
    "abilities.veilstep.check.attribute": "arcanes",
    // A · 30080a659251
    "abilities.still_mind.name": "Esprit Calme",
    // B · d7e8b105c177
    "abilities.still_mind.tags": ["arcanique","défensive"],
    // B · 1b331db2f84f
    "abilities.still_mind.description": "Aplatis ta propre signature jusqu’à ce qu’un enchantement te trouve ennuyeux.",
    // B · 43afef8b429c
    "abilities.still_mind.targetRule": "SOI",
    // A · 934a172ea3b7
    "locations.gate_arch.name": "L’Arche de la Porte",
    // A · 4a479aa23542
    "locations.gate_arch.shortName": "Porte",
    // B · d5deeba162ad
    "locations.gate_arch.description": "L’arc extérieur de Verath, assez large pour quatre de front et protégé pour lire chacun d’eux. La pierre est usée en bande pâle à hauteur d’épaule, là où un siècle d’étudiants a passé la main en entrant.",
    // B · 6357f5562537
    "locations.gate_arch.stageImage": "story_ninth_archive/stage_gate_arch",
    // B · 14e34e6668a6
    "locations.gate_arch.ambientSfx": ["pluie_légère","murmure_foule"],
    // A · 1e19338d26b3
    "locations.commons.name": "Les Communes",
    // A · 06bbf78a711d
    "locations.commons.shortName": "Hall commun",
    // B · 925366f798c6
    "locations.commons.description": "Une longue salle avec des tables en chêne marquées, où l’Académie fait semblant d’être une école. Des urnes à thé, des manteaux mouillés, et onze disputes différentes en même temps.",
    // B · 270d4a8a517d
    "locations.commons.stageImage": "story_ninth_archive/stage_commons",
    // B · 8a1667e13f73
    "locations.commons.ambientSfx": ["murmure_foule","tasses"],
    // A · b558f7d370b2
    "locations.lecture_hall.name": "Salle des cours d’arcane",
    // A · ce30cfbd35ef
    "locations.lecture_hall.shortName": "Cours",
    // B · 6c7ebe44e368
    "locations.lecture_hall.description": "Des gradins raides en bancs autour d’un puits de démonstration. Le tableau porte encore la preuve d’hier, à moitié effacée, ce qui est soit de la paresse soit un message.",
    // B · 0b2663aadada
    "locations.lecture_hall.stageImage": "story_ninth_archive/stage_lecture_hall",
    // B · 06a182d95d19
    "locations.lecture_hall.ambientSfx": ["craie","frottement"],
    // A · a625c9fb124c
    "locations.archive_floor.name": "Étage de lecture des archives",
    // A · 0934cb033fcf
    "locations.archive_floor.shortName": "Archives",
    // B · 30e889cb5760
    "locations.archive_floor.description": "Huit portes, huit chiffres en laiton, et un étage de lecture entre eux où les lampes sont volontairement basses. L’air a le goût du papier froid.",
    // B · 9ed949452b5f
    "locations.archive_floor.stageImage": "story_ninth_archive/stage_archive_floor",
    // B · 1e59508b6027
    "locations.archive_floor.ambientSfx": ["papier","pas_lointains"],
    // A · b6f2ae1bc9e6
    "locations.archive_stacks.name": "Les Rayonnages",
    // A · 3d92812ee5e6
    "locations.archive_stacks.shortName": "Rayonnages",
    // B · 7aa756ef542d
    "locations.archive_stacks.description": "Des étagères roulantes sur des rails en fer, assez proches pour qu’il faille ouvrir un passage pour passer. Les enchantements ici sont plus anciens et moins polis.",
    // B · ee6b3d5131a7
    "locations.archive_stacks.stageImage": "story_ninth_archive/stage_archive_stacks",
    // B · d99ef0e64d50
    "locations.archive_stacks.ambientSfx": ["rail_fer","silence"],
    // A · b178ee75886c
    "locations.warden_office.name": "Bureau du Gardien",
    // A · be8b10a90665
    "locations.warden_office.shortName": "Gardien",
    // B · 2533c1a7281f
    "locations.warden_office.description": "Chaud, rangé, et décoré de portraits d’étudiants remontant à soixante ans. Tous sourient. Plusieurs d’entre eux n’apparaissent pas dans le registre.",
    // B · ccc1bb9c0fa9
    "locations.warden_office.stageImage": "story_ninth_archive/stage_warden_office",
    // B · 275cccca32b4
    "locations.warden_office.ambientSfx": ["feu","horloge"],
    // A · 2705542dfbec
    "locations.rooftop.name": "Le Toit",
    // A · 89c22e2737c1
    "locations.rooftop.shortName": "Toit",
    // B · 8d80ab970d0d
    "locations.rooftop.description": "Toiture plate en plomb entre deux pignons, à l’abri du vent et des enchantements. Quelqu’un y monte assez souvent pour y laisser un manteau plié derrière une cheminée.",
    // B · 7deb2beac058
    "locations.rooftop.stageImage": "story_ninth_archive/stage_rooftop",
    // B · a59fb79df1fc
    "locations.rooftop.ambientSfx": ["vent","pluie_légère"],
    // A · 7e313718e6f8
    "locations.dorm.name": "Ta chambre",
    // A · 612dcd5bf06a
    "locations.dorm.shortName": "Chambre",
    // B · 8695bcd5e7e9
    "locations.dorm.description": "Un lit, un bureau, une fenêtre qui ne ferme pas tout à fait, et une porte dont l’Académie a la clé. Tu as arrêté de laisser quoi que ce soit d’important dedans.",
    // B · 31b72682ff6f
    "locations.dorm.stageImage": "story_ninth_archive/stage_dorm",
    // B · f8b0620026fd
    "locations.dorm.ambientSfx": ["pluie_fenêtre"],
    // B · 02c6e7f19f95
    "characters.mira.name": "Mira Senn",
    // A · fcc0bdbf6340
    "characters.mira.role": "Assistante des archives, en troisième année",
    // A · 895f67eebd29
    "characters.mira.cardBlurb": "L’archiviste qui te couvre discrètement à l’entrée, et qui en sait visiblement plus qu’elle ne le dit.",
    // B · aee35f364a88
    "characters.mira.pronouns": "elle",
    // A · 0d532f1cc46c
    "characters.mira.publicTraits": ["Précise","Surmenée","Drôle en silence"],
    // B · 84093be024f5
    "characters.mira.hiddenDrives": ["C’est elle qui a traité ton ordre d’effacement et elle ne dort plus depuis.","Elle veut que quelqu’un découvre la vérité, pour que ce ne soit plus seulement la sienne."],
    // B · 40ba3b813c08
    "characters.mira.values": ["Honnêteté","Tenir sa parole","L’intégrité du registre"],
    // B · ddda9d24482b
    "characters.mira.fears": ["Être transférée","Être la cause du transfert de quelqu’un d’autre"],
    // A · 6b0613fa3b0e
    "characters.mira.socialStyle": "Esquive avec la procédure. Répond à la vraie question si tu la laisses en silence.",
    // B · 79c5f43e637a
    "characters.mira.boundaries": ["Ne mentira pas directement au Gardien","Ne te laissera pas entrer dans les étagères sans protection"],
    // B · babccda71106
    "characters.mira.goals": ["Survivre au trimestre","Faire inscrire le neuvième archive dans le registre pour qu’un supérieur l’examine"],
    // B · 446933c78ae5
    "characters.mira.secrets.mira_filed_order.fact": "Mira a traité l’ordre d’effacement qui a retiré le joueur du registre.",
    // B · 47558a04be8d
    "characters.mira.secrets.mira_filed_order.visibility": "PNJ_PRIVÉ",
    // B · 5a40e9e8de27
    "characters.mira.secrets.mira_filed_order.revealHint": "Se révèle si le joueur trouve la page du registre ou gagne beaucoup de confiance sur le toit.",
    // B · d7bd2bcd97b1
    "characters.mira.secrets.mira_ninth_door.fact": "Mira sait que la neuvième porte s’ouvre du côté des rayonnages et seulement pendant un cycle de garde.",
    // B · 47558a04be8d
    "characters.mira.secrets.mira_ninth_door.visibility": "NPC_PRIVÉ",
    // B · 1c70bb9d68d8
    "characters.mira.secrets.mira_ninth_door.revealHint": "Nécessite 35+ de confiance et la conversation sur le toit.",
    // A · 3f1449dc92f7
    "characters.mira.speechStyle": "Courtes phrases affirmatives. Se corrige en plein milieu quand la précision compte. Emploie ton nom de famille quand elle est nerveuse, ton prénom quand elle ne l’est pas.",
    // A · d6ee9a7ed30c
    "characters.mira.topics": ["le surveillant","le registre","qui a enregistré ton entrée","les huit portes"],
    // A · dde0db6e4a22
    "characters.mira.voiceSamples": ["Ce n’est pas une erreur de lecture. J’ai vérifié deux fois avant que tu arrives.","Je peux te donner quarante minutes. Après ça, l’étage note qui est là.","Ne me remercie pas encore. Je n’ai pas décidé de ce que je vais faire."],
    // B · 509a3c035550
    "characters.mira.appearance": "Petite, cheveux noirs, encre jusqu’à la deuxième phalange, manteau d’archives deux tailles trop grand porté comme une armure.",
    // B · 8b2586c8335d
    "characters.mira.visualHook": "Une seule mèche blanche os brûlée dans ses cheveux noirs au-dessus de la tempe gauche, là où une garde l’a touchée, et les deux mains tatouées en noir jusqu’à la deuxième phalange.",
    // B · 97e51b19b660
    "characters.mira.silhouette": "Petite et engloutie par un manteau d’archives deux tailles trop grand, col relevé, manches retroussées deux fois et encore trop longues.",
    // B · 66a21807576e
    "characters.mira.artSeed": "mira-senn-v1",
    // B · 887cc6876b95
    "characters.mira.portrait": "story_ninth_archive/mira",
    // B · eaa4099d5a5f
    "characters.mira.expressions": ["neutre","sur ses gardes","fatiguée","amusée","alarmée","résolue"],
    // B · cc8c8d961d82
    "characters.mira.knowledgeScope": ["faction_archivistes"],
    // B · ac68c374c3af
    "characters.mira.gates.mira_tells_truth.label": "Mira te dira ce qu’elle a enregistré",
    // B · 55a54e80451a
    "characters.mira.gates.mira_tells_truth.kind": "CONFIANCE",
    // B · 91ed4489617a
    "characters.mira.gates.mira_tells_truth.requires.flagsSet": ["mira_trusts_you"],
    // B · f04405ee3a9b
    "characters.mira.gates.mira_tells_truth.requires.flagsUnset": ["mira_burned"],
    // B · 249d3ac985b3
    "characters.mira.gates.mira_opens_ninth.label": "Mira t’emmènera à la neuvième porte",
    // B · 9e8ae18bf8bf
    "characters.mira.gates.mira_opens_ninth.kind": "ALLIANCE",
    // B · 91ed4489617a
    "characters.mira.gates.mira_opens_ninth.requires.flagsSet": ["mira_trusts_you"],
    // B · 3a1ed49cba2d
    "characters.kael.name": "Kael Ostrand",
    // A · 475a2804d460
    "characters.kael.role": "Préfet du portail, cinquième année",
    // A · 7cb6333f165a
    "characters.kael.cardBlurb": "C’est le préfet qui t’a arrêté. On lui a demandé de mener l’enquête, et il compte bien faire ça sérieusement.",
    // B · fcca6b746d0b
    "characters.kael.pronouns": "il/lui",
    // A · 29285a09929f
    "characters.kael.publicTraits": ["Rigide","Juste","Marre d’avoir toujours raison"],
    // B · 9b61c7913499
    "characters.kael.hiddenDrives": ["Son propre frère a été transféré il y a deux ans. Il a signé le formulaire.","Il cherche un cas qui prouve que le système fonctionne pour arrêter d’en douter."],
    // B · 17cc39d7bc44
    "characters.kael.values": ["Procédure","Cohérence","Ne pas faire d’exceptions qu’il ne peut pas justifier"],
    // B · 6dd7836ed6f5
    "characters.kael.fears": ["Que les règles soient une façade","Être la dernière personne à s’en rendre compte"],
    // A · 00b881bdff3e
    "characters.kael.socialStyle": "Confrontant mais d’une honnêteté scrupuleuse. Il dit exactement ce qu’il va faire avant de le faire.",
    // B · 99c6dc9f9caa
    "characters.kael.boundaries": ["Ne falsifiera pas un registre","Ne laissera pas une menace passer sans réponse en public"],
    // B · 8a2d44ece695
    "characters.kael.goals": ["Garder la porte propre","Découvrir ce qu’il est advenu des transferts"],
    // B · 42079fe24f11
    "characters.kael.secrets.kael_brother.fact": "Le frère de Kael, Aldric, a été transféré et n’est jamais arrivé.",
    // B · 47558a04be8d
    "characters.kael.secrets.kael_brother.visibility": "NPC_PRIVÉ",
    // B · cddc14b36406
    "characters.kael.secrets.kael_brother.revealHint": "Seulement après 40+ de respect, ou si le joueur lui montre la page du registre.",
    // A · 0486e2cf3076
    "characters.kael.speechStyle": "Sec, formel, sans contractions quand il est en colère. Pose des questions dont il connaît déjà la réponse, pour voir si tu vas mentir.",
    // A · 3f4000e5f00d
    "characters.kael.topics": ["le registre du portail","les transferts","ce que le rouge signifie vraiment"],
    // A · f2381014c882
    "characters.kael.voiceSamples": ["Toi. Bouge pas.","Je vais tout consigner. Je te préviens pour que tu ne puisses pas dire que je l’ai pas fait.","Si tu es innocent, ce retard ne te dérangera pas."],
    // B · fbaa3c6d7065
    "characters.kael.appearance": "Grand, cheveux clairs coupés court, écharpe de préfet toujours impeccable, mains toujours visibles.",
    // B · 78f0c3609bac
    "characters.kael.visualHook": "Une écharpe de préfet portée impeccablement sur un brassard noir de deuil qu’il n’a jamais expliqué, et un seul gant noir à la main droite qui ne quitte jamais.",
    // B · 1816819fc5e5
    "characters.kael.silhouette": "Grand et carré, mains toujours visibles et immobiles, la seule personne dans une pièce à se tenir parfaitement droite.",
    // B · 9aa93c518100
    "characters.kael.artSeed": "kael-ostrand-v1",
    // B · e0be37a3bf2d
    "characters.kael.portrait": "story_ninth_archive/kael",
    // B · b2533ba3adcc
    "characters.kael.expressions": ["neutre","sévère","suspicieux","partagé","furieux"],
    // B · 608004b62d22
    "characters.kael.knowledgeScope": ["faction_préfets"],
    // B · f62acce6644a
    "characters.kael.gates.kael_alliance.label": "Kael enquêtera avec toi",
    // B · 9e8ae18bf8bf
    "characters.kael.gates.kael_alliance.kind": "ALLIANCE",
    // B · b00dd01f38bb
    "characters.kael.gates.kael_alliance.requires.flagsSet": ["parlé :kael"],
    // B · ce1e5f408216
    "characters.kael.gates.kael_alliance.requires.hasItems": ["page_registre"],
    // B · 019084b9fd54
    "characters.kael.combatant.tags": ["entraîné","non létal"],
    // B · 5bb35761f0dd
    "characters.ysolde.name": "Gardienne Ysolde Farrow",
    // A · 399422d598b5
    "characters.ysolde.role": "Intendante des archives",
    // A · 79d76fd31307
    "characters.ysolde.cardBlurb": "La prof qui valide les changements dans les archives. Elle est toujours gentille avec toi, et c’est ça qui te met mal à l’aise.",
    // B · aee35f364a88
    "characters.ysolde.pronouns": "elle",
    // A · 67e3bd2d5d56
    "characters.ysolde.publicTraits": ["Chaleureuse","Posée","Se souvient de tout ce qu’il y a sur toi"],
    // B · 866ed2d3ba3b
    "characters.ysolde.hiddenDrives": ["Elle signe les effacements. Elle croit sincèrement qu’elle protège les étudiants qu’elle supprime.","Elle attendait de voir si tu viendrais la voir en premier."],
    // B · 5f04eb28292a
    "characters.ysolde.values": ["Ordre","La clémence selon sa définition","L’Académie au-dessus de tout étudiant"],
    // B · f615ee1f1a98
    "characters.ysolde.fears": ["Une seconde signature qu’elle ne peut obtenir","Être comprise"],
    // A · f2721cb78367
    "characters.ysolde.socialStyle": "Généreuse avec le thé et le temps. Répond à tout sauf à ce que tu as demandé.",
    // B · e159d48722ad
    "characters.ysolde.boundaries": ["Ne hausse jamais la voix","Ne nie jamais rien catégoriquement"],
    // B · 7a3c5694bd49
    "characters.ysolde.goals": ["Clore discrètement l’affaire du neuvième archive","Te recruter plutôt que te supprimer"],
    // B · 86a4769d924f
    "characters.ysolde.secrets.ysolde_single_signature.fact": "Ysolde a signé seule l’effacement du joueur. La seconde signature n’a jamais été obtenue.",
    // B · 97d1bcd768a7
    "characters.ysolde.secrets.ysolde_single_signature.visibility": "CREATOR_ONLY",
    // B · 7201224b0ba5
    "characters.ysolde.secrets.ysolde_single_signature.revealHint": "La page du registre est la seule preuve dans le monde.",
    // A · 99f2c45b9475
    "characters.ysolde.speechStyle": "Des phrases longues, bienveillantes, parfaitement grammaticales. Utilise souvent ton prénom. Ne dit jamais non ; dit « pas encore » et « voyons voir ».",
    // A · 75c942f77662
    "characters.ysolde.topics": ["les ordres d’effacement","les portraits accrochés à son mur","ce qu’elle attend de toi"],
    // A · 365e53bdf00d
    "characters.ysolde.voiceSamples": ["Assieds-toi, fais donc. T’as eu une matinée.","Je ne parlerais pas d’effacement. Je dirais une gentillesse mal écrite.","Tu peux me poser n’importe quelle question. Je répondrai à ce que je peux."],
    // B · 7bdeefcb5cf9
    "characters.ysolde.appearance": "Soixantaine, tresse argentée, lunettes en demi-lune, poignets tachés d’encre qu’elle ne prend pas la peine de cacher.",
    // B · 0f94f4e44a9d
    "characters.ysolde.visualHook": "Une douzaine de fines bagues argentées tachées d’encre, une par étudiant effacé, qu’elle tourne sur son doigt chaque fois qu’elle s’apprête à dire un mensonge.",
    // B · 48c90a87c912
    "characters.ysolde.silhouette": "Droit et posé, tresse argentée sur une épaule, lunettes en demi-lune basses sur le nez.",
    // B · 9501f6b782d2
    "characters.ysolde.artSeed": "ysolde-farrow-v1",
    // B · 0d273e03cdb9
    "characters.ysolde.portrait": "story_ninth_archive/ysolde",
    // B · 3635f884faf4
    "characters.ysolde.expressions": ["chaleureuse","neutre","attentive","déçue","froide"],
    // B · dda006e01e80
    "characters.ysolde.knowledgeScope": ["faction_archivists","faction_prefects","faction_faculty"],
    // B · 71e2a5f9db1a
    "characters.ysolde.gates.ysolde_offer.label": "Ysolde te fera une offre",
    // B · 77dcad9b37cc
    "characters.ysolde.gates.ysolde_offer.kind": "OTHER",
    // B · 67872a8cfc3c
    "characters.ysolde.gates.ysolde_offer.requires.flagsSet": ["act_one_complete"],
    // B · 740f1dcccd9a
    "characters.bram.name": "Bram Ketch",
    // A · 95234113f3bd
    "characters.bram.role": "Deuxième année, intendant officieux",
    // A · 676b10a50a23
    "characters.bram.cardBlurb": "Un étudiant de deuxième année qui peut presque tout te trouver, à un prix qu’il annoncera plus tard.",
    // B · fcca6b746d0b
    "characters.bram.pronouns": "il/lui",
    // A · a396d140d96c
    "characters.bram.publicTraits": ["Gai","Transactionnel","Vrai plaisir à te voir"],
    // B · 87c20ecf5ef5
    "characters.bram.hiddenDrives": ["Il est redevable à quelqu’un en dehors de l’Académie et vend des petits services pour s’en sortir.","Il ne te trahira pas, mais il vendra autour de toi."],
    // B · 8115914ed925
    "characters.bram.values": ["Payer ce qu’il doit","Ne pas être l’employé de quelqu’un"],
    // B · dd06ce2ae2a4
    "characters.bram.fears": ["La dette qui se présente à la porte","Être jugé ennuyeux"],
    // A · e2787636cdba
    "characters.bram.socialStyle": "Commence par une blague, finit par un prix. C’est sérieux des deux côtés.",
    // B · 721aa38607d9
    "characters.bram.boundaries": ["Ne vole pas les étudiants","Ne porte rien qui ait un nom dessus"],
    // B · 31db3671276d
    "characters.bram.goals": ["Rembourser la dette","Rester intéressant pour les gens qui comptent"],
    // B · b64e9c0cf902
    "characters.bram.secrets.bram_debt.fact": "Bram doit quarante couronnes à un prêteur de la basse-ville et a trois semaines.",
    // B · 47558a04be8d
    "characters.bram.secrets.bram_debt.visibility": "NPC_PRIVATE",
    // B · 12e02e85443d
    "characters.bram.secrets.bram_debt.revealHint": "Confiance 30+, ou le surprendre en train de compter.",
    // A · 10c34005d8ee
    "characters.bram.speechStyle": "Rapide, chaleureux, pose plein de questions, esquive la sincérité avec une seule blague avant de répondre.",
    // A · ca758ef47821
    "characters.bram.topics": ["la clé des rayons","à qui il doit quoi","ce qu’il vend vraiment"],
    // A · f86fa839abba
    "characters.bram.voiceSamples": ["Ah, ce sortilège ? Il déteste tout le monde. Statistiquement, tu es tranquille.","Je peux te dégoter une clé. Pas aujourd’hui, en revanche.","Ne me regarde pas comme ça, j’ai des sentiments et un emploi du temps."],
    // B · 06f840bc0dfd
    "characters.bram.appearance": "Petit, large, toujours un peu humide, quatre manteaux de poches dans un seul manteau.",
    // B · 5098a37f337f
    "characters.bram.visualHook": "Les deux derniers doigts manquants de sa main gauche, jamais évoqués, et un manteau avec quatre manteaux de poches visiblement surchargées.",
    // B · 2f7f7a43658d
    "characters.bram.silhouette": "Petit, large, toujours un peu humide, penché comme s’il était déjà en plein marché.",
    // B · 001ec3652f38
    "characters.bram.artSeed": "bram-ketch-v1",
    // B · 6f61162bd577
    "characters.bram.portrait": "story_ninth_archive/bram",
    // B · d5bfb99c69fd
    "characters.bram.expressions": ["souriant","neutre","fuyant","sérieux","ravi"],
    // B · 731dc086acef
    "characters.bram.gates.bram_real_answer.label": "Bram te dira à qui il doit",
    // B · 55a54e80451a
    "characters.bram.gates.bram_real_answer.kind": "TRUST",
    // B · 7dad2ba37762
    "characters.bram.combatant.tags": ["bagarreur"],
    // B · 7334be235eba
    "factions.faction_archivists.name": "Les Archivistes",
    // B · 6f1bf073ae0b
    "factions.faction_archivists.description": "Gardiennes des huit archives. Incapables institutionnellement d’admettre qu’il y en a neuf.",
    // B · a34456bad345
    "factions.faction_archivists.allies": ["faction_faculty"],
    // B · d414e2a0066c
    "factions.faction_prefects.name": "La Préfecture",
    // B · aea648369c5c
    "factions.faction_prefects.description": "Force étudiante. Garde les registres que la faculté refuse ensuite de lire.",
    // B · a34456bad345
    "factions.faction_prefects.allies": ["faction_faculty"],
    // B · ce0e6930abd4
    "factions.faction_faculty.name": "La Faculté",
    // B · 7f4307ad3ad6
    "factions.faction_faculty.description": "Signe tout. Lit très peu.",
    // B · 692c9392573e
    "factions.faction_faculty.allies": ["faction_archivists","faction_prefects"],
    // B · e809c272a4aa
    "quests.q_red_ward.title": "Le portail devenu rouge",
    // B · dc95403768fb
    "quests.q_red_ward.summary": "Passe la porte et découvre ce que le portail a vu.",
    // B · 7fcc0be2ad9c
    "quests.q_red_ward.kind": "PRINCIPALE",
    // B · 41c773168ca5
    "quests.q_red_ward.steps.step_gate.playerCopy": "Passe Kael à la porte.",
    // B · deecf73f017b
    "quests.q_red_ward.steps.step_gate.directorNotes": "Kael ne se laisse pas intimider en public, et il n’est pas l’obstacle qu’il semble — c’est un préfet qui fait un boulot qu’il n’a pas demandé. Quatre façons de passer, et celle que le joueur prend est la première chose que ce monde apprend sur lui. Ne jamais la révéler.",
    // B · 2234eec500c0
    "quests.q_red_ward.steps.step_find_mira.playerCopy": "Trouve l’assistante des archives qui a enregistré ton entrée.",
    // B · 2f69311adf1b
    "quests.q_red_ward.steps.step_find_mira.directorNotes": "Mira est en service à partir de 12h30. Avant, elle est en cours et ne parlera pas. Un joueur qui ne peut pas attendre peut obtenir le même fait autrement, mais il en paie le prix : le registre est dans les rayonnages, et Bram garde la clé.",
    // B · 5d9dc7132048
    "quests.q_red_ward.steps.step_read_own_record.playerCopy": "Lis ta propre entrée dans le registre.",
    // B · b5049eca95d6
    "quests.q_red_ward.steps.step_read_own_record.directorNotes": "L’entrée existe mais le champ du nom est effacé. C’est la première preuve solide.",
    // B · 5e91e786196a
    "quests.q_red_ward.steps.step_read_own_record.enterWhen.flagsSet": ["archive_known"],
    // B · 561692d6a7dc
    "quests.q_red_ward.steps.step_read_own_record.succeedWhen.flagsSet": ["inspecté :archive_floor"],
    // B · 87df575e8b94
    "quests.q_red_ward.steps.step_read_own_record.succeedWhen.atLocation": "archive_floor",
    // B · 4b2edfb0ef56
    "quests.q_red_ward.steps.step_read_own_record.rewards.flags": ["sait_effacement"],
    // B · dfdf0ee84c38
    "quests.q_red_ward.involvedCharacterIds": ["kael","mira"],
    // B · ecb992909e49
    "quests.q_red_ward.involvedLocationIds": ["gate_arch","commons","archive_floor"],
    // B · d06a51c7add0
    "quests.q_red_ward.knownRewardCopy": "Accès à l’étage de lecture des archives.",
    // B · 297f6b516c7a
    "quests.q_ninth_shelf.title": "La neuvième étagère",
    // B · 51dd85097ca2
    "quests.q_ninth_shelf.summary": "Huit portes, huit chiffres. Trouve la neuvième.",
    // B · 7fcc0be2ad9c
    "quests.q_ninth_shelf.kind": "PRINCIPALE",
    // B · 4b2edfb0ef56
    "quests.q_ninth_shelf.discoverWhen.flagsSet": ["sait_effacement"],
    // B · 0d1743c14038
    "quests.q_ninth_shelf.steps.step_stacks_access.playerCopy": "Accède aux rayonnages.",
    // B · 2a2f0665001e
    "quests.q_ninth_shelf.steps.step_stacks_access.directorNotes": "Trois vraies routes différentes, et celle choisie change le reste de l’histoire. Ne pousse pas le joueur vers l’une d’elles.",
    // B · b41413e051e4
    "quests.q_ninth_shelf.steps.step_ledger.playerCopy": "Trouve l’ordre d’effacement avec ton nom dessus.",
    // B · 26127f7d043f
    "quests.q_ninth_shelf.steps.step_ledger.directorNotes": "La page est vraie et accablante : une signature là où il devrait y en avoir deux.",
    // B · f72a20d02c88
    "quests.q_ninth_shelf.steps.step_ledger.enterWhen.flagsSet": ["stacks_access"],
    // B · ce1e5f408216
    "quests.q_ninth_shelf.steps.step_ledger.succeedWhen.hasItems": ["page_registre"],
    // B · a839cf5c0570
    "quests.q_ninth_shelf.steps.step_ledger.rewards.flags": ["a_preuve"],
    // B · 4e497ec5e0c5
    "quests.q_ninth_shelf.steps.step_ninth_door.playerCopy": "Trouve la neuvième porte.",
    // B · ff5097ac9919
    "quests.q_ninth_shelf.steps.step_ninth_door.directorNotes": "S’ouvre depuis les rayonnages, pendant un cycle de garde. Mira sait ; Ysolde aussi.",
    // B · a839cf5c0570
    "quests.q_ninth_shelf.steps.step_ninth_door.enterWhen.flagsSet": ["a_preuve"],
    // B · f99750aa0761
    "quests.q_ninth_shelf.steps.step_ninth_door.succeedWhen.flagsSet": ["inspecté :archive_stacks"],
    // B · e0fbeb20854a
    "quests.q_ninth_shelf.steps.step_ninth_door.succeedWhen.atLocation": "archive_stacks",
    // B · 67872a8cfc3c
    "quests.q_ninth_shelf.steps.step_ninth_door.rewards.flags": ["acte_un_termine"],
    // B · f23ffc536f9a
    "quests.q_ninth_shelf.involvedCharacterIds": ["mira","ysolde"],
    // B · f66f50d2c875
    "quests.q_ninth_shelf.involvedLocationIds": ["archive_floor","archive_stacks"],
    // B · 781a3ae39a4c
    "quests.q_ninth_shelf.knownRewardCopy": "La vérité sur ta suppression.",
    // B · 430ca2049f37
    "quests.q_owed_favour.title": "Ce que tu dois à Mira",
    // B · 36357a9aed53
    "quests.q_owed_favour.summary": "Mira s’est mise devant un conseil disciplinaire pour toi. Elle n’a encore rien demandé en retour.",
    // B · 552c0b7f83c2
    "quests.q_owed_favour.kind": "SIDE",
    // B · c19cc87da174
    "quests.q_owed_favour.discoverWhen.flagsSet": ["mira_took_a_risk"],
    // B · 0afc1d1d69b4
    "quests.q_owed_favour.steps.step_mira_asks.playerCopy": "Découvre ce que Mira veut en retour.",
    // B · a97ae4d85c76
    "quests.q_owed_favour.steps.step_mira_asks.directorNotes": "Elle ne veut pas un service en retour. Elle veut que tu termines ce que tu as commencé.",
    // B · b51c6179a01f
    "quests.q_owed_favour.steps.step_mira_asks.succeedWhen.flagsSet": ["spoke :mira"],
    // B · 11c0ae29c5a9
    "quests.q_owed_favour.involvedCharacterIds": ["mira"],
    // B · 2795f9f8700f
    "quests.q_owed_favour.involvedLocationIds": ["archive_floor","rooftop"],
    // B · 2a9837e0b7e9
    "quests.q_owed_favour.knownRewardCopy": "Une dette réglée, ou un ami perdu.",
    // B · cf3820e34fe7
    "quests.q_wards_watching.title": "Les gardiens ont ton visage",
    // B · 76c23b47a4a7
    "quests.q_wards_watching.summary": "Tu as forcé une porte que le bâtiment comptait. Maintenant, il te compte.",
    // B · 552c0b7f83c2
    "quests.q_wards_watching.kind": "SIDE",
    // B · 214788ee114b
    "quests.q_wards_watching.discoverWhen.flagsSet": ["wards_flagged_you"],
    // B · b092d30f306c
    "quests.q_wards_watching.steps.step_off_the_list.playerCopy": "Gère le fait que le bâtiment te surveille maintenant.",
    // B · 29dc6672b5d3
    "quests.q_wards_watching.steps.step_off_the_list.directorNotes": "Kael aura vu le journal. Ysolde peut le faire disparaître, mais elle voudra quelque chose en échange.",
    // B · 8ae60748f44c
    "quests.q_wards_watching.involvedCharacterIds": ["kael","ysolde"],
    // B · 37be40f38de7
    "quests.q_wards_watching.involvedLocationIds": ["archive_floor","warden_office"],
    // B · 641e70318b05
    "quests.q_wards_watching.knownRewardCopy": "Sors de la liste, ou apprends à y vivre.",
    // B · fef5919eb131
    "quests.q_bram_favor.title": "Le calcul de Bram",
    // B · 60b0bf3a677f
    "quests.q_bram_favor.summary": "Bram veut que quelque chose soit déplacé. Il est étrangement vague sur quoi.",
    // B · 552c0b7f83c2
    "quests.q_bram_favor.kind": "SIDE",
    // B · 2e7abe5612b8
    "quests.q_bram_favor.discoverWhen.flagsSet": ["met :bram"],
    // B · c7edbd814d5a
    "quests.q_bram_favor.steps.step_bram_ask.playerCopy": "Écoute Bram.",
    // B · 8aed1c121496
    "quests.q_bram_favor.steps.step_bram_ask.directorNotes": "Il minimise le risque. L’intuition ou une grande confiance révèlent la dette.",
    // B · 8562ef0f641a
    "quests.q_bram_favor.steps.step_bram_ask.succeedWhen.flagsSet": ["spoke :bram"],
    // B · 3f944fd7dc9b
    "quests.q_bram_favor.steps.step_bram_deliver.playerCopy": "Décide si tu le portes.",
    // B · e2c3b96a89d7
    "quests.q_bram_favor.steps.step_bram_deliver.directorNotes": "Le porter augmente la Suspicion mais te donne la clé des rayons. Refuser le garde au chaud mais coûte la clé.",
    // B · 8562ef0f641a
    "quests.q_bram_favor.steps.step_bram_deliver.enterWhen.flagsSet": ["spoke :bram"],
    // B · 56159c83162c
    "quests.q_bram_favor.involvedCharacterIds": ["bram"],
    // B · a76da90c8a0a
    "quests.q_bram_favor.involvedLocationIds": ["commons","dorm"],
    // B · cd2a98856abc
    "quests.q_bram_favor.knownRewardCopy": "Une clé, un tonique, et un ami qui te doit quelque chose.",
    // B · 119409caea86
    "quests.lead_rooftop.title": "Quelqu’un monte là-haut",
    // B · a042a7def47f
    "quests.lead_rooftop.summary": "Quelqu’un laisse un manteau plié derrière une cheminée sur le toit plat au-dessus de l’amphithéâtre. Il est là presque tous les jours.",
    // B · eff80c847ff6
    "quests.lead_rooftop.kind": "LEAD",
    // B · 3b2a85301f59
    "quests.lead_rooftop.discoverWhen.flagsSet": ["visited :rooftop"],
    // B · 2aa06f45cd54
    "quests.lead_rooftop.steps.step_rooftop_wait.playerCopy": "Sois sur les pistes à quatre heures, et attends.",
    // B · 85d62866e5e7
    "quests.lead_rooftop.steps.step_rooftop_wait.directorNotes": "Mira est sur le toit de 16 h à 18 h. C’est la résolution de la promesse de relation §16.4 et ça débloque mira_rooftop_truth.",
    // B · fdad42faf77e
    "quests.lead_rooftop.steps.step_rooftop_wait.succeedWhen.flagsSet": ["visité :toit","parlé :mira"],
    // B · 9036991f1944
    "quests.lead_rooftop.steps.step_rooftop_wait.succeedWhen.atLocation": "toit",
    // B · 91ed4489617a
    "quests.lead_rooftop.steps.step_rooftop_wait.rewards.flags": ["mira_te_fait_confiance"],
    // B · 11c0ae29c5a9
    "quests.lead_rooftop.involvedCharacterIds": ["mira"],
    // B · e8cc9a367379
    "quests.lead_rooftop.involvedLocationIds": ["toit"],
    // B · 497642af5267
    "quests.lead_rooftop.knownRewardCopy": "Mira, sans garde.",
    // B · e82d9dc4b3fa
    "promises.promise_who_erased.kind": "MYSTÈRE",
    // B · 92a3ea3e0ba5
    "promises.promise_who_erased.label": "Qui t’a effacé, et pourquoi il a laissé cette trace",
    // B · 3c408fa61065
    "promises.promise_who_erased.seedHint": "Le portail vire au rouge pour une marque qui n’est pas dans le registre.",
    // B · dae5cb86fb2f
    "promises.promise_who_erased.payoffHint": "Ysolde l’a signé seule, croyant que c’était par compassion.",
    // B · 63a719ec7f2d
    "promises.promise_kael_rival.kind": "RIVALITÉ",
    // B · 1c51c1620ce4
    "promises.promise_kael_rival.label": "Kael, qui n’a pas tort à ton sujet",
    // B · de58e7efd12f
    "promises.promise_kael_rival.seedHint": "Il t’arrête au portail et le note, devant tout le monde.",
    // B · dd172277676d
    "promises.promise_kael_rival.payoffHint": "Son frère a été transféré. Il a signé ce formulaire aussi.",
    // B · 445cd8deebc2
    "promises.promise_mira_trust.kind": "RELATION",
    // B · d4e65678edf7
    "promises.promise_mira_trust.label": "Mira, qui a fait la demande et doit vivre avec",
    // B · 09c1ce72d931
    "promises.promise_mira_trust.seedHint": "Elle te couvre avant même que tu lui demandes.",
    // B · e6e4a49ea406
    "promises.promise_mira_trust.payoffHint": "Sur le toit, elle te raconte ce qu’elle a fait.",
    // B · f8b4a6708d82
    "promises.promise_the_transfers.kind": "THÈME",
    // B · 9b6155ce9e28
    "promises.promise_the_transfers.label": "Personne n’est expulsé de Verath. Ils sont transférés.",
    // B · fe19eac35255
    "promises.promise_the_transfers.seedHint": "Un mur de portraits souriants, plusieurs absents du registre.",
    // B · cb5acba63753
    "promises.promise_the_transfers.payoffHint": "Le neuvième archive est là où sont gardés les transférés.",
    // B · d77ebfcebe44
    "promises.promise_ninth_door.kind": "FINALE",
    // B · 7d09e1cd8a4c
    "promises.promise_ninth_door.label": "La porte sans chiffre",
    // B · 8049ec5121dc
    "promises.promise_ninth_door.seedHint": "Huit portes, et un mur entre cinq et six un peu trop large.",
    // B · 4f9b8b8531a5
    "promises.promise_ninth_door.payoffHint": "Elle s’ouvre du côté des rayonnages, pendant un cycle de protection.",
    // A · b004acc9b871
    "archetypes.arch_scholar.name": "Chercheur d’Arcanes",
    // B · 2d688b2933db
    "archetypes.arch_scholar.role": "Magie et recherche",
    // A · 7192bffdbe8a
    "archetypes.arch_scholar.summary": "Tu cherches d’abord ce que c’est avant de toucher. Le meilleur pour lire les sorts, repérer les pièges et savoir ce que tu regardes.",
    // A · 69a216041f5e
    "archetypes.arch_scholar.playstyle": ["Enquête","Connaissances magiques","Prudent"],
    // A · 8816033f52c6
    "archetypes.arch_scholar.blurb": "Tu lis le sort avant de le toucher. En général.",
    // A · e65ea7b3ee03
    "archetypes.arch_thief.name": "Mains silencieuses",
    // B · 72a55afdb2b2
    "archetypes.arch_thief.role": "Discrétion",
    // A · fe33a0941810
    "archetypes.arch_thief.summary": "Tu vas là où tu n’as pas le droit et personne ne te voit faire. Le seul passé ici qui commence par une technique.",
    // A · 99fd9b0719ee
    "archetypes.arch_thief.playstyle": ["Discrétion","Rapide","Commence par une technique"],
    // A · fc3591050f9a
    "archetypes.arch_thief.blurb": "Tu t’es jamais fait attraper, ce qui n’est pas pareil que ne l’avoir jamais fait.",
    // B · d4e018dfe698
    "archetypes.arch_thief.startingAbilities": ["pas_de_trace"],
    // A · 42c7c9f27e4f
    "archetypes.arch_orator.name": "Langue d’Argent",
    // B · 56a6861707da
    "archetypes.arch_orator.role": "Social",
    // A · fe9882736d14
    "archetypes.arch_orator.summary": "Tu débrouilles pour contourner les règles que tout le monde suit. Meilleure présence à l’école, mais sans plan B si la parole ne passe pas.",
    // A · 30158c3bf2da
    "archetypes.arch_orator.playstyle": ["Persuasion","Évite les ennuis en parlant","Physiquement fragile"],
    // A · e1549e488152
    "archetypes.arch_orator.blurb": "Les règles sont écrites par des gens, et on peut leur parler.",
    // A · 7e87559e97d1
    "archetypes.arch_duelist.name": "Duel du portail",
    // B · 791ae5b9b277
    "archetypes.arch_duelist.role": "Corps à corps",
    // A · 1cdeb89e3038
    "archetypes.arch_duelist.summary": "Tu préfères éviter le combat, mais tu es le meilleur ici. Force, cran, et l’art de rester debout après.",
    // A · 30debf33ddd6
    "archetypes.arch_duelist.playstyle": ["Direct","Physique","Intimidant"],
    // A · 1c0fd1bf2a46
    "archetypes.arch_duelist.blurb": "Tu préférerais ne pas. Mais tu sais très bien faire.",
    // B · b10e05522747
    "setupFields.displayName.label": "Comment tu t’appelles ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · b22df9681b4d
    "setupFields.displayName.placeholder": "ex. Malik Sarrow",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 98ebf1cfdd14
    "setupFields.pronouns.placeholder": "ex. il/lui",
    // B · 5336157a8e04
    "setupFields.archetype.label": "Comment tu t’y prends ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHÉTYPE",
    // B · 756336db16a1
    "setupFields.archetype.helpText": "Ton passé : comment tu es arrivé dans les Archives et ce dans quoi tu étais déjà bon en arrivant. Ça détermine tes attributs, ta formation et ce que tu portes, ce qui décide quels jets sont faciles et lesquels te feront transpirer. C’est fixe pour cette partie.",
    // B · 47e42de2b3b5
    "setupFields.worldKnowsAboutYou.label": "Que devrait savoir le monde à ton sujet ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · 59ffcc2c5d8d
    "setupFields.worldKnowsAboutYou.placeholder": "ex. Je suis arrivé en transfert un trimestre en retard et personne ne veut dire qui a signé pour moi.",
    // B · 457b6bca4f18
    "setupFields.origin.label": "D’où viens-tu ?",
    // B · b6a31c665c0b
    "setupFields.origin.kind": "CHOIX",
    // B · 487c2e942c07
    "setupFields.origin.options.lower_city.label": "La ville basse",
    // B · a95f3df0ba3e
    "setupFields.origin.options.coast.label": "La côte salée",
    // B · 528f480f4a06
    "setupFields.origin.options.academy_born.label": "Né dans ces murs",
    // B · 4efa5f700704
    "setupFields.origin.options.unknown.label": "Tu ne sais vraiment pas",
    // B · 92dfdd12c153
    "setupFields.appearance.label": "Quelque chose que le gardien remarquerait ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · 4156e1c99c5a
    "setupFields.appearance.placeholder": "ex. Cheveux courts, foncés, coupés mal par moi-même, un manteau deux tailles trop grand.",
    // B · 3aa4328667d6
    "protagonist.kind": "VIDE",
    // A · 5da1297b9d01
    "opening": "Le sort du portail scanne onze élèves devant toi et les laisse passer. Puis il te lit, cherche ton nom dans les archives de l’Académie, et ne trouve rien du tout.\n\nLa lumière au-dessus de l’arche vire au rouge. Rouge, ça veut dire : arrête cette personne.\n\nLa file derrière toi se fait silencieuse. Un préfet lève les yeux de son carnet, et tu vois qu’il décide que sa matinée, c’est maintenant toi.\n\n« Toi. » Kael Ostrand ne hausse pas la voix. « Ne bouge pas. »\n\nDerrière lui, une petite archiviste aux cheveux sombres regarde la lumière rouge, puis toi, et ne dit rien de ce qu’elle vient de voir.",
    // A · dadfe30fe5f4
    "openingSuggestions": ["Je reste là où je suis et je laisse Kael écrire ce qu’il veut. « Vas-y. Je veux voir ce que ça dit. »","Je sors la lettre d’admission et je l’expose à la lumière. « Lis le nom dessus. Puis dis-moi que je n’ai jamais été admis. »","Je hoche la tête vers la lumière rouge au-dessus de la porte sans lâcher des yeux l’archiviste. « Ça clignote depuis que je suis entré. Ça veut dire quoi ? »"],
  },
});
