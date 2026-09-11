import { registerWorldText } from '@aniplay/contracts';

/**
 * The Understudy, in French.
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
  storyId: "story_understudy",
  text: {
    // A · 80e9fee9546d
    "title": "The Understudy",
    // A · 42d8c6bfa8f8
    "fantasyLabel": "Tu connais le rôle. Tu es le second choix.",
    // A · b603856ad6ca
    "hook": "Tu es la doublure du rôle principal. La première est à l’affiche dans six semaines, et le metteur en scène ne change pas de cast.",
    // A · c51d053298d3
    "premise": "Tu es étudiant·e en théâtre à la Verrine Company, et tu es la doublure du rôle principal de la pièce de cette année. Être doublure, ça veut dire que tu connais tout le rôle, mais tu ne joues pas. Tu ne montes sur scène que si la principale ne peut pas.\n\nLa principale, c’est Talia Renn. Elle est meilleure que toi dans un domaine et moins bonne dans quatre, et tout le monde dans la troupe le sait, elle y compris. La première est dans six semaines, et la date ne bouge pas.\n\nTu ne peux pas juste répéter plus qu’elle, parce que le metteur en scène ne change pas de cast après la troisième semaine, et il n’a jamais enfreint cette règle. Alors la seule façon d’y arriver, c’est de devenir la personne vers qui tout le monde se tourne quand il y a un problème.\n\nÇa veut dire des faveurs. La troupe tient un carnet des dettes, écrit de la main du metteur en scène, qui est lu à voix haute à la fin du trimestre. Demander de l’aide met ton nom dedans. Aider quelqu’un aussi.\n\nTu as donc six semaines pour devenir indispensable. Ça veut dire être celui ou celle qui arrange les problèmes quand ils arrivent, et ça veut dire accumuler des faveurs que tu devras payer plus tard. Personne dans cet endroit ne t’élèvera jamais la voix. C’est pourtant l’endroit le plus dangereux où tu aies travaillé.",
    // A · e481062e5df9
    "mechanicsChips": ["Persuasion","Réputation","Relations","Délais"],
    // A · d987af336199
    "creatorNote": "Pas de bagarre, pas de magie. La seule chose que tu gères vraiment, c’est ce que les gens racontent de toi quand tu n’es pas là.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · 5a7f73d37e0c
    "rules.hardCanon": ["La première est dans six semaines et la date ne bouge pas.","Le livre de la Compagnie enregistre chaque faveur. Il est lu à voix haute à la fin du trimestre.","Personne n’a jamais été remplacé après la troisième semaine.","Ysra est un rôle, pas une personne. Tout le monde finit par l’oublier."],
    // A · a20a7fb53f6a
    "rules.toneGuide": "Pièces chaleureuses, calculs froids. Les gens sont généreux en public, précis en privé. L’ambition n’est pas un défaut ici ; faire semblant de ne pas en avoir, c’est autre chose.",
    // B · fb8bc434078d
    "skills.performance.name": "Interprétation",
    // B · cfb7a15645c3
    "skills.performance.attribute": "présence",
    // B · 4fa6bf3b3835
    "skills.performance.description": "Être regardé exprès.",
    // B · 04890a36609e
    "skills.persuasion.name": "Persuasion",
    // B · cfb7a15645c3
    "skills.persuasion.attribute": "présence",
    // B · 63c9eab79c72
    "skills.persuasion.description": "Obtenir un oui auquel on peut tenir quelqu’un.",
    // B · 4f64eb4d5f30
    "skills.deception.name": "Tromperie",
    // B · cfb7a15645c3
    "skills.deception.attribute": "présence",
    // B · a278e15c55b6
    "skills.deception.description": "Une version des faits qui flatte tout le monde.",
    // B · 73523cb25294
    "skills.insight.name": "Perspicacité",
    // B · a8c1fa8269c3
    "skills.insight.attribute": "esprit",
    // B · 10d09b37e7ed
    "skills.insight.description": "Lire la pièce avant qu’elle ne vous lise.",
    // B · cf929c9acc8a
    "skills.composure.name": "Calme",
    // B · 4c84c2c842d0
    "skills.composure.attribute": "détermination",
    // B · 6ef0cac27c0f
    "skills.composure.description": "Prendre une note sans flancher.",
    // B · 06fd90a69021
    "skills.stagecraft.name": "Art du théâtre",
    // B · a8c1fa8269c3
    "skills.stagecraft.attribute": "esprit",
    // B · eb7b6c0baa78
    "skills.stagecraft.description": "Cordages, signaux, et ce qui casse quand.",
    // B · b7507f05e27b
    "skills.movement.name": "Mouvement",
    // B · 7ce3b6387340
    "skills.movement.attribute": "agilité",
    // B · c3a3c77bb701
    "skills.movement.description": "Chorégraphie, chutes, et l’illusion de facilité.",
    // B · c3b9ba0f70aa
    "resources.stamina.name": "Endurance",
    // B · 34e8ec1ac388
    "resources.stamina.polarity": "BON_HAUT",
    // B · 222c25a77bf4
    "resources.stamina.zeroStateConsequence": "Tu es visiblement épuisé. Tout ce qui est social devient plus dur.",
    // B · 22fa7a5c5a5a
    "resources.stamina.color": "#43D6A4",
    // B · 46adc881193f
    "resources.standing.name": "Réputation",
    // B · 34e8ec1ac388
    "resources.standing.polarity": "BON_HAUT",
    // B · 99446bbc108a
    "resources.standing.zeroStateConsequence": "La pièce cesse de se tourner vers toi. Tu deviens du mobilier.",
    // B · bffd32432679
    "resources.standing.color": "#7C6CFF",
    // B · cbd92c957856
    "resources.debt.name": "Dette",
    // B · a34adbda2422
    "resources.debt.polarity": "BON_BAS",
    // B · 289b680f6f6d
    "resources.debt.zeroStateConsequence": "Tu ne dois rien à personne. Rare, et ça vaut le coup de le protéger.",
    // B · ad1dcb42b294
    "resources.debt.color": "#F6BE55",
    // A · e6b657153d93
    "items.annotated_sides.name": "Feuilles annotées",
    // B · 21bbab704ce0
    "items.annotated_sides.tags": ["quête"],
    // B · 496888eb45e7
    "items.annotated_sides.description": "Ta copie du script. Quatre mois de notes en marge que personne ne t’a demandé de faire.",
    // B · 60c4a13912bf
    "items.annotated_sides.loreText": "L’acte deux est écrit en trois couleurs d’encre. Tu as des avis sur l’acte deux.",
    // B · 5bbd8bbb9bc3
    "items.annotated_sides.icon": "script",
    // A · 3ab95955b992
    "items.throat_tincture.name": "Teinture pour la gorge",
    // B · 1467deed44a7
    "items.throat_tincture.tags": ["consommable"],
    // B · f584ab4e0855
    "items.throat_tincture.description": "Goût d’anis et de désespoir. T’achète une heure que t’avais pas.",
    // B · 2ffc01888406
    "items.throat_tincture.loreText": "La costumière la prépare. Elle la vend pas à tout le monde.",
    // B · c93de720b80c
    "items.throat_tincture.icon": "fioles",
    // A · cbd9bbea6496
    "items.company_book.name": "Le carnet de la troupe",
    // B · f88c6548fc3b
    "items.company_book.tags": ["quête","preuve"],
    // B · d1b706ab12f2
    "items.company_book.description": "Qui doit quoi, écrit de la main du metteur en scène. T’es cité deux fois à la page quatre.",
    // B · 38fac596ade5
    "items.company_book.loreText": "La deuxième entrée n’est pas de ta main et ne te concerne pas.",
    // B · bccca52309b0
    "items.company_book.icon": "registre",
    // A · 6ef614cf3197
    "abilities.run_it_again.name": "Recommencer",
    // B · fb180298ef37
    "abilities.run_it_again.tags": ["technique","technicien"],
    // B · 6dcd036949cd
    "abilities.run_it_again.description": "Remets la scène à zéro et reprends à une réplique précise, pour que tout le monde ait la deuxième chance que tu prépares.",
    // B · c44e6dd70059
    "abilities.run_it_again.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.run_it_again.check.attribute": "esprit",
    // A · 305ecc7d3345
    "abilities.take_the_stage.name": "Monter sur scène",
    // B · 66bc9217f686
    "abilities.take_the_stage.tags": ["performance","naturel"],
    // B · 6ef88dc492e5
    "abilities.take_the_stage.description": "Entre dans la lumière et la tiens. Tout ce qui se passait dans la pièce s’arrête.",
    // B · c44e6dd70059
    "abilities.take_the_stage.targetRule": "AUCUN",
    // B · cfb7a15645c3
    "abilities.take_the_stage.check.attribute": "présence",
    // A · 29e0487d5924
    "abilities.have_a_word.name": "Parler en privé",
    // B · 19ed1267d763
    "abilities.have_a_word.tags": ["social","diplomate"],
    // B · a899c42cbc8f
    "abilities.have_a_word.description": "Isoler quelqu’un pendant quatre-vingt-dix secondes et changer ce qu’il allait faire.",
    // B · 39d896e20aec
    "abilities.have_a_word.targetRule": "UNIQUE",
    // B · cfb7a15645c3
    "abilities.have_a_word.check.attribute": "présence",
    // A · 822f192f57e7
    "abilities.read_the_room.name": "Lire la pièce",
    // B · 09b907576d49
    "abilities.read_the_room.tags": ["social"],
    // B · 2b685a71f4f6
    "abilities.read_the_room.description": "Arrêter de jouer une seconde et comprendre ce que tout le monde veut vraiment.",
    // B · c44e6dd70059
    "abilities.read_the_room.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.read_the_room.check.attribute": "esprit",
    // A · 6dc75c702dc8
    "abilities.take_the_note.name": "Prendre note",
    // B · 162b675b4797
    "abilities.take_the_note.tags": ["social","défensif"],
    // B · 6c415fa931d5
    "abilities.take_the_note.description": "Absorber une critique tellement bien que celui qui la donne finit par te soutenir.",
    // B · 39d896e20aec
    "abilities.take_the_note.targetRule": "UNIQUE",
    // B · 4c84c2c842d0
    "abilities.take_the_note.check.attribute": "volonté",
    // A · f8b9c5783fb8
    "locations.rehearsal_room.name": "Salle de répétition 2",
    // A · 720b85d25c2a
    "locations.rehearsal_room.shortName": "Répétition",
    // B · 5ff3f4daa7ab
    "locations.rehearsal_room.description": "Plancher à ressort, un mur de miroirs, et un piano que personne a le droit de déplacer. Du scotch sur le sol marque un décor qui n’existe pas encore.",
    // B · 4a0ba82382f7
    "locations.rehearsal_room.stageImage": "story_understudy/stage_rehearsal_room",
    // B · cfad9db7b7d7
    "locations.rehearsal_room.ambientSfx": ["piano","pas"],
    // A · 89c96a6c69b2
    "locations.green_room.name": "Loge verte",
    // A · 24663dccc9c2
    "locations.green_room.shortName": "Loge verte",
    // B · 52cd78c9709a
    "locations.green_room.description": "Deux canapés qui ont survécu à quatre premiers rôles, une bouilloire, et un tableau d’affichage où la liste des acteurs est affichée. Tout le monde fait semblant de pas la regarder.",
    // B · 42196781c2f9
    "locations.green_room.stageImage": "story_understudy/stage_green_room",
    // B · 8f4684d36da7
    "locations.green_room.ambientSfx": ["bouilloire","murmure"],
    // A · 96ce1683a7d6
    "locations.stage.name": "Scène principale",
    // A · 9ae22a94ad08
    "locations.stage.shortName": "Scène",
    // B · 1a43819bc16c
    "locations.stage.description": "Neuf cents sièges vides et une lumière fantôme au centre. D’ici, la salle est un souffle retenu.",
    // B · ee8d34def77b
    "locations.stage.stageImage": "story_understudy/stage_stage",
    // B · a8f2965f844e
    "locations.stage.ambientSfx": ["ambiance","grincement"],
    // A · 627c408fcb5f
    "locations.wardrobe.name": "Costumes",
    // A · 627c408fcb5f
    "locations.wardrobe.shortName": "Costumes",
    // B · 694f597889ff
    "locations.wardrobe.description": "Des tringles jusqu’au plafond et l’odeur de la vapeur. Marta travaille ici et entend tout, parce que personne pense à arrêter de parler devant elle.",
    // B · a7dbd2eb65e3
    "locations.wardrobe.stageImage": "story_understudy/stage_wardrobe",
    // B · 44da6ceb121d
    "locations.wardrobe.ambientSfx": ["vapeur","cintres"],
    // A · 8fe919918810
    "locations.directors_office.name": "Bureau du metteur en scène",
    // A · c1f1fcd9cb41
    "locations.directors_office.shortName": "Bureau",
    // B · cda2bf619380
    "locations.directors_office.description": "Une chaise pour lui et une pour celui qui a un problème. Le Livre de la Compagnie reste fermé sur le bureau, ce qui est pire que s’il était ouvert.",
    // B · 949f94faaa08
    "locations.directors_office.stageImage": "story_understudy/stage_directors_office",
    // B · cdadbd79d623
    "locations.directors_office.ambientSfx": ["horloge"],
    // B · 3f6cc6f45c21
    "characters.talia.name": "Talia Renn",
    // A · 80f96e6c0e54
    "characters.talia.role": "Première distribution, Ysra",
    // A · 9154a75f2fb7
    "characters.talia.cardBlurb": "La tête d’affiche dont tu es la doublure. Ce n’est pas ton ennemie, et elle ne va pas te laisser sa place.",
    // B · aee35f364a88
    "characters.talia.pronouns": "elle",
    // A · 50eb1049db41
    "characters.talia.publicTraits": ["Généreuse","Impeccable","Jamais en retard"],
    // B · 0ef82935cf1d
    "characters.talia.hiddenDrives": ["Elle sait que tu es meilleure au deuxième acte et elle le sait depuis la lecture.","Elle est soutenue par un mécène dont le nom est dans le Livre de la Compagnie."],
    // B · bdac7a6a4ae6
    "characters.talia.values": ["Artisanat","Ne pas être prise en pitié"],
    // B · 3c500d01f8dd
    "characters.talia.fears": ["Être découverte comme juste correcte","Devoir quelque chose à quelqu’un de façon visible"],
    // A · 5939aa767db4
    "characters.talia.socialStyle": "Généreuse en public, rigoureuse en privé. Te fait des compliments justes, ce qui est pire.",
    // B · 23f8a180a567
    "characters.talia.boundaries": ["Ne sabote personne","N’admet jamais sa peur à voix haute"],
    // B · ccf21bb6bf1c
    "characters.talia.goals": ["Ouvrir le spectacle","Effacer son nom du livre"],
    // B · 93d14d6d2041
    "characters.talia.secrets.talia_patron.fact": "La place de Talia dans la compagnie a été payée par un mécène, et la dette est enregistrée.",
    // B · 47558a04be8d
    "characters.talia.secrets.talia_patron.visibility": "NPC_PRIVATE",
    // B · 13f07eaa0d72
    "characters.talia.secrets.talia_patron.revealHint": "Nécessite le Livre de la Compagnie ou une Confiance supérieure à 45.",
    // A · 161d3139fdf0
    "characters.talia.speechStyle": "Précise, posée, ne hausse jamais le ton. Pose des questions au lieu de discuter.",
    // A · 0fafaee6dbea
    "characters.talia.topics": ["acte deux","la liste des rôles","ce qu'elle doit","la première"],
    // A · b916a95684b1
    "characters.talia.voiceSamples": ["Tu étais meilleure que moi dans le second acte. Je préfère te le dire plutôt que tu penses que je ne l’ai pas remarqué.","Je vais pas me battre avec toi à ce sujet. Je vais juste pas le perdre.","Prends la note. Il a raison, et ça te coûte rien d’être d’accord."],
    // B · ac1546ebc951
    "characters.talia.appearance": "Grande, cheveux noirs attachés sévèrement, tenue d’essai noire qui lui va parfaitement.",
    // B · cf4488d9c485
    "characters.talia.visualHook": "La moitié de son visage en plein maquillage de scène et l’autre moitié nue, prise entre la loge et la scène, la ligne au milieu parfaitement nette.",
    // B · 4e41a1fbabd8
    "characters.talia.silhouette": "Grande et verticale, cheveux noirs attachés sévèrement, tenue d’essai noire parfaitement ajustée, mains croisées et immobiles.",
    // B · 57aa96689b2c
    "characters.talia.artSeed": "talia-renn-v1",
    // B · b129e16792bb
    "characters.talia.portrait": "story_understudy/talia",
    // B · dcaeb58f0962
    "characters.talia.expressions": ["neutre","gracieuse","sur ses gardes","blessée","résolue"],
    // B · df9e058f8274
    "characters.talia.knowledgeScope": ["faction_company"],
    // B · abb6d0be1e85
    "characters.talia.gates.talia_alliance.label": "Talia travaille le problème avec toi",
    // B · 9e8ae18bf8bf
    "characters.talia.gates.talia_alliance.kind": "ALLIANCE",
    // B · 45c4ecbbb775
    "characters.talia.gates.talia_alliance.requires.hasItems": ["company_book"],
    // B · 7c4ec4919988
    "characters.talia.gates.talia_romance.label": "Talia baisse sa garde",
    // B · 0b75bc536447
    "characters.talia.gates.talia_romance.kind": "ROMANCE",
    // B · 1589a5540740
    "characters.talia.gates.talia_romance.requires.flagsSet": ["talia_ghost_light"],
    // B · c1504b65fa72
    "characters.oswin.name": "Oswin Deare",
    // A · 553ea96cebd1
    "characters.oswin.role": "Metteur en scène",
    // A · d4d48804b73b
    "characters.oswin.cardBlurb": "Le metteur en scène. C’est lui qui décide si tu montes sur scène, et il n’a jamais recasté personne après la troisième semaine.",
    // B · fcca6b746d0b
    "characters.oswin.pronouns": "il",
    // A · 2f6cae7656af
    "characters.oswin.publicTraits": ["Franc","Juste selon ses propres règles","Le talent l’ennuie"],
    // B · 8977e5e18e57
    "characters.oswin.hiddenDrives": ["Il a déjà remplacé ce rôle, il y a vingt ans, et ça a détruit une carrière.","Il cherche une raison de ne pas recommencer."],
    // B · 71a3567f54bb
    "characters.oswin.values": ["Le travail","Tenir sa parole"],
    // B · a399872f767c
    "characters.oswin.fears": ["Répéter la même erreur","Un spectacle juste correct"],
    // A · 4156a1b27d0f
    "characters.oswin.socialStyle": "Il dit ce qui est difficile en premier, puis attend de voir comment tu réagis.",
    // B · 312dc48ea704
    "characters.oswin.boundaries": ["Ne remplace jamais après la troisième semaine","N’explique jamais une remarque deux fois"],
    // B · c39dffd1561d
    "characters.oswin.goals": ["Ouvrir un spectacle dont on se souviendra"],
    // B · 83554d55b47c
    "characters.oswin.secrets.oswin_recast.fact": "Oswin a remplacé un rôle principal lors de sa première saison et l’acteur n’a jamais retravaillé.",
    // B · 47558a04be8d
    "characters.oswin.secrets.oswin_recast.visibility": "NPC_PRIVATE",
    // B · 7139278658a3
    "characters.oswin.secrets.oswin_recast.revealHint": "Respect 50+, ou lui demander directement dans son bureau.",
    // A · ff4ba081b0d5
    "characters.oswin.speechStyle": "Impératifs courts. Pas de compliments à moins qu’ils soutiennent vraiment. Appelle tout le monde par son nom de famille.",
    // A · ebeab3f7d095
    "characters.oswin.topics": ["la note qu’il t’a donnée","la liste des rôles","ce qu’il veut du deuxième acte"],
    // A · cbde24559aef
    "characters.oswin.voiceSamples": ["Encore. Et cette fois, insiste bien sur la deuxième moitié de la réplique.","J’ai pas besoin que tu sois meilleure qu’elle. J’ai besoin que tu sois nécessaire.","Tu me demandes d’être juste. Moi, je te demande d’être intéressant."],
    // B · c2e27b20f1e7
    "characters.oswin.appearance": "Sexagénaire, en velours côtelé, lunettes de lecture relevées, un crayon coincé derrière une oreille en permanence.",
    // B · 8a725cb8ed4b
    "characters.oswin.visualHook": "Un crayon de charpentier derrière une oreille et des lunettes de lecture poussées dans ses cheveux gris, avec une baguette de chef d’orchestre usée et pâle là où son pouce repose.",
    // B · 1a300f686c9e
    "characters.oswin.silhouette": "Large et posé, en velours côtelé, bras croisés, la seule personne dans le bâtiment qui ne soit jamais pressée.",
    // B · 9149dec7292a
    "characters.oswin.artSeed": "oswin-deare-v1",
    // B · 192a77bab8dc
    "characters.oswin.portrait": "story_understudy/oswin",
    // B · d89d99124a04
    "characters.oswin.expressions": ["neutre","aiguisé","réfléchi","impatient","content"],
    // B · df9e058f8274
    "characters.oswin.knowledgeScope": ["faction_company"],
    // B · 8b6bc1de22e9
    "characters.oswin.gates.oswin_considers.label": "Oswin te considérera vraiment",
    // B · 77dcad9b37cc
    "characters.oswin.gates.oswin_considers.kind": "AUTRE",
    // B · 5ebd0a5e14a0
    "characters.oswin.gates.oswin_considers.requires.flagsSet": ["proved_act_two"],
    // B · daf4a8028996
    "characters.marta.name": "Marta Voss",
    // A · dd85e7593aa7
    "characters.marta.role": "Régisseuse de costumes",
    // A · 153bfa7a7c08
    "characters.marta.cardBlurb": "Régisseuse. Elle entend toutes les conversations dans ce bâtiment, y compris celles qui parlent de toi, et elle ne répète presque rien.",
    // B · aee35f364a88
    "characters.marta.pronouns": "elle",
    // A · 367a709af117
    "characters.marta.publicTraits": ["Impassible","Gentille mais pressée","Entend tout"],
    // B · 21bcd8757f5b
    "characters.marta.hiddenDrives": ["Elle a vu passer trente ans d’understudies et a un classement secret.","Elle garde une copie du Livre de la Compagnie. Elle ne devrait pas."],
    // B · 16b9bfeac589
    "characters.marta.values": ["Les gens qui disent merci","Ne pas se faire mentir"],
    // B · 49c3021dcc98
    "characters.marta.fears": ["Être forcée de choisir un camp"],
    // A · ae35568b1b59
    "characters.marta.socialStyle": "Elle parle en travaillant et s’arrête quand ça compte.",
    // B · b75bdfd34edc
    "characters.marta.boundaries": ["Ne parlera pas des ragots sur quelqu’un dans la pièce","Ne mentira pas au metteur en scène"],
    // B · 25ca25995b1b
    "characters.marta.goals": ["Préparer le spectacle","Garder sa copie du livre secrète"],
    // B · 25ff4ea87679
    "characters.marta.secrets.marta_copy.fact": "Marta garde sa propre copie du Livre de la Compagnie dans la loge.",
    // B · 47558a04be8d
    "characters.marta.secrets.marta_copy.visibility": "NPC_PRIVATE",
    // B · 4d9d057241c2
    "characters.marta.secrets.marta_copy.revealHint": "Confiance 40+, et seulement après qu’elle ait décidé que tu n’es pas une ambitieuse.",
    // A · 9afa8526547d
    "characters.marta.speechStyle": "Sèche, rapide, pleine de remarques en passant. Elle ponctue souvent par « chérie » et le pense à moitié.",
    // A · 0a275a2c547c
    "characters.marta.topics": ["qui doit quoi","la dernière doublure","l’acte deux","ce qu’elle a entendu"],
    // A · 66b72b145510
    "characters.marta.voiceSamples": ["Bras en l’air, chérie. T’es pas la première à rester là avec cette tête.","J’entends tout dans cette pièce et je répète presque rien. Presque.","La dernière qui m’a posé cette question a eu le rôle et ça lui est monté à la tête."],
    // B · 14843fcef91b
    "characters.marta.appearance": "Cinquante ans, épingles dans le poignet, lunettes sur une chaîne, mains qui ne s’arrêtent jamais.",
    // B · f2c71941ec5a
    "characters.marta.visualHook": "Une rangée d’épingles à couturière plantées dans le poignet de sa manche comme une cartouchière, et un mètre ruban autour du cou comme une écharpe.",
    // B · 6ed49f5467fc
    "characters.marta.silhouette": "Compacte et en mouvement, lunettes sur une chaîne, mains qui n’ont jamais été vides.",
    // B · dff73f464a1a
    "characters.marta.artSeed": "marta-voss-v1",
    // B · 83f70728ccb4
    "characters.marta.portrait": "story_understudy/marta",
    // B · 38972a346a39
    "characters.marta.expressions": ["neutre","sec","chaleureux","sur ses gardes"],
    // B · df9e058f8274
    "characters.marta.knowledgeScope": ["faction_company"],
    // B · ca242a2d4ebb
    "characters.marta.gates.marta_shows_book.label": "Marta te montrera sa copie",
    // B · 55a54e80451a
    "characters.marta.gates.marta_shows_book.kind": "CONFIANCE",
    // B · b70569cec3db
    "factions.faction_company.name": "La Compagnie Verrine",
    // B · f398239dfe2b
    "factions.faction_company.description": "Onze étudiants, un livre, et une mémoire très longue.",
    // B · 97c8db620ebf
    "quests.q_six_weeks.title": "Six semaines",
    // B · 352349315993
    "quests.q_six_weeks.summary": "Rends-toi indispensable avant la première.",
    // B · 7fcc0be2ad9c
    "quests.q_six_weeks.kind": "PRINCIPALE",
    // B · c854bc37b12e
    "quests.q_six_weeks.steps.step_first_note.playerCopy": "Tiens bon face à la première remarque.",
    // B · b2bfbb5e8c60
    "quests.q_six_weeks.steps.step_first_note.directorNotes": "Oswin donne une remarque sévère devant tout le monde. Le calme ou l’honnêteté marchent, les excuses non.",
    // B · 037d9ffe7331
    "quests.q_six_weeks.steps.step_first_note.succeedWhen.flagsSet": ["spoke:oswin"],
    // B · 3d022918613c
    "quests.q_six_weeks.steps.step_first_note.succeedWhen.atLocation": "rehearsal_room",
    // B · 34a089240ed5
    "quests.q_six_weeks.steps.step_first_note.rewards.flags": ["took_first_note"],
    // B · c1ac0a8e102e
    "quests.q_six_weeks.steps.step_act_two.playerCopy": "Montre que tu maîtrises le deuxième acte.",
    // B · d49968317cf4
    "quests.q_six_weeks.steps.step_act_two.directorNotes": "La promesse sur laquelle tout repose, et il y a plus d’une façon d’être indéniable. Un comédien le fait devant les gens. Un technicien fait marcher la scène et laisse la salle voir qui a réparé le problème. Un diplomate fait dire à la bonne personne que c’est vrai. Tout le monde peut simplement mieux se préparer que les autres, mais ça coûte plus cher. Quoi qu’il en soit, ça se fait devant témoins.",
    // B · 34a089240ed5
    "quests.q_six_weeks.steps.step_act_two.enterWhen.flagsSet": ["took_first_note"],
    // B · 6fd4386f1076
    "quests.q_six_weeks.involvedCharacterIds": ["oswin","talia"],
    // B · f805830f1c2a
    "quests.q_six_weeks.involvedLocationIds": ["rehearsal_room","stage"],
    // B · 51d560c1ead8
    "quests.q_six_weeks.knownRewardCopy": "Oswin arrête de t’ignorer.",
    // B · cbd9bbea6496
    "quests.q_the_book.title": "Le Livre de la Compagnie",
    // B · 4a56d85c8f58
    "quests.q_the_book.summary": "Découvre qui y est inscrit, et pour quelle raison.",
    // B · 7fcc0be2ad9c
    "quests.q_the_book.kind": "PRINCIPALE",
    // B · 0aa58a346787
    "quests.q_the_book.discoverWhen.flagsSet": ["parlé:marta"],
    // B · 628f6f8ba873
    "quests.q_the_book.steps.step_find_copy.playerCopy": "Fais-toi montrer le livre.",
    // B · d3e30e5d1285
    "quests.q_the_book.steps.step_find_copy.directorNotes": "Marta a une copie et ne la donnera pas à un ambitieux. Elle la confiera à quelqu’un en qui elle a confiance, Oswin la garde dans son bureau, et on peut aussi la prendre — ce qui est une autre histoire, et le bâtiment l’apprend.",
    // B · e7320dcdb4e3
    "quests.q_the_book.involvedCharacterIds": ["marta","talia"],
    // B · 42ef4db8c73a
    "quests.q_the_book.involvedLocationIds": ["costumes","bureau_du_directeur"],
    // B · 3cc6817ed43c
    "quests.q_the_book.knownRewardCopy": "La vérité sur comment on est choisi ici.",
    // B · ad55e5dd6d08
    "quests.lead_ghost_light.title": "La Lumière Fantôme",
    // B · 84ec2589cd52
    "quests.lead_ghost_light.summary": "Quelqu’un est sur scène après les heures, et ce n’est pas l’équipe.",
    // B · eff80c847ff6
    "quests.lead_ghost_light.kind": "PRINCIPALE",
    // B · d66e8d896d94
    "quests.lead_ghost_light.discoverWhen.flagsSet": ["visité:scène"],
    // B · 9862dbac05c7
    "quests.lead_ghost_light.steps.step_ghost_light.playerCopy": "Sois sur scène tard, et attends.",
    // B · ac35237e5974
    "quests.lead_ghost_light.steps.step_ghost_light.directorNotes": "La récompense de la relation §16.4. Talia répète seule la nuit parce qu’elle n’est pas sûre non plus. Être trouvée là n’est pas pareil qu’être invitée, et être directement demandée est encore différent. Ce n’est pas un prix ; c’est elle qui décide.",
    // B · 29f969e2ca93
    "quests.lead_ghost_light.involvedCharacterIds": ["talia"],
    // B · 5632f44713d2
    "quests.lead_ghost_light.involvedLocationIds": ["scène"],
    // B · a2b7d4d5428d
    "quests.lead_ghost_light.knownRewardCopy": "Talia, sans la représentation.",
    // B · f8b4a6708d82
    "promises.promise_act_two.kind": "THÈME",
    // B · eff2907e52cb
    "promises.promise_act_two.label": "Tu es meilleur dans l’acte deux et tout le monde le sait",
    // B · 9659687583f3
    "promises.promise_act_two.seedHint": "La première répétition s’arrête tôt, sur ta scène.",
    // B · 5ffeec910a1c
    "promises.promise_act_two.payoffHint": "Oswin te demande de la jouer devant toute la compagnie.",
    // B · 63a719ec7f2d
    "promises.promise_talia.kind": "RIVALITÉ",
    // B · f4f25ebfca9f
    "promises.promise_talia.label": "Talia, qui n’est ni ton ennemie ni ton amie",
    // B · 281d816cb433
    "promises.promise_talia.seedHint": "Elle te fait un compliment juste, devant du monde.",
    // B · 3ba3f9124a6a
    "promises.promise_talia.payoffHint": "Elle répète seule la nuit parce qu’elle n’est pas sûre non plus.",
    // B · e82d9dc4b3fa
    "promises.promise_book.kind": "MYSTÈRE",
    // B · f836a90c2ba1
    "promises.promise_book.label": "Le livre, et dont le nom y figure deux fois",
    // B · 903fe1e3c561
    "promises.promise_book.seedHint": "Le livre est fermé sur le bureau, ce qui est pire qu’ouvert.",
    // B · 07cb920b3637
    "promises.promise_book.payoffHint": "Talia y est. Et toi, à la page quatre.",
    // A · 0f1d81bf0f75
    "archetypes.arch_technician.name": "Le Technicien",
    // B · 8765e9687c6c
    "archetypes.arch_technician.role": "Technique en coulisses",
    // A · 3def9bd3e45d
    "archetypes.arch_technician.summary": "Tu sais comment le spectacle est vraiment monté. Le meilleur sous pression, le meilleur avec tout ce qui est technique ; le pire quand il faut être vu.",
    // A · 36da1de73979
    "archetypes.arch_technician.playstyle": ["Pragmatique","Nerveux à l’épreuve","Pas du spectacle"],
    // A · 553206984639
    "archetypes.arch_technician.blurb": "Tu n’es pas la personne la plus captivante ici. Tu es la plus fiable.",
    // B · aa4528deae79
    "archetypes.arch_technician.startingAbilities": ["rejouer"],
    // A · cb776e2dad4c
    "archetypes.arch_natural.name": "La Naturelle",
    // B · c55d4239af38
    "archetypes.arch_natural.role": "Présence scénique",
    // A · c2e2179af175
    "archetypes.arch_natural.summary": "C’est celle que toute la salle regarde. La présence la plus forte de la compagnie, et rien du tout vers quoi se rabattre quand le charme ne suffit pas.",
    // A · 88e20dde9e09
    "archetypes.arch_natural.playstyle": ["Impose sa présence","Interprète physique","Un seul tour dans son sac"],
    // A · bdd7f09ccb3f
    "archetypes.arch_natural.blurb": "Ça a toujours été facile, ce qui est un problème en soi.",
    // B · 2903785211d5
    "archetypes.arch_natural.startingAbilities": ["prendre_la_scène"],
    // A · 11ced9be6a7b
    "archetypes.arch_diplomat.name": "La Diplomate",
    // B · 56a6861707da
    "archetypes.arch_diplomat.role": "Social",
    // A · cd6ffccd168b
    "archetypes.arch_diplomat.summary": "Tu décodes la salle et tu la répares en silence. La meilleure avec les gens, ce qui dans ce bâtiment, c’est la plupart des problèmes.",
    // A · b4ba57242614
    "archetypes.arch_diplomat.playstyle": ["Persuasion","Lit les gens","Polyvalente"],
    // A · f0da2de765e5
    "archetypes.arch_diplomat.blurb": "Tu n’as jamais été la meilleure de la salle. Tu as souvent été la raison pour laquelle ça marchait.",
    // B · 28e1562d416e
    "archetypes.arch_diplomat.startingAbilities": ["avoir_un_mot"],
    // B · 62664c6d85af
    "setupFields.displayName.label": "Quel nom sur la liste des rôles ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · d78f24fc94a7
    "setupFields.displayName.placeholder": "ex. Ines Halloway",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 5965ecf877b1
    "setupFields.pronouns.placeholder": "ex. elle/la",
    // B · 24d00c6f5f82
    "setupFields.archetype.label": "Quel type de personne de théâtre es-tu ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHÉTYPE",
    // B · 47342b947413
    "setupFields.archetype.helpText": "Ce que tu savais déjà faire quand la compagnie t’a pris. Ça détermine tes attributs et ta formation, donc ça décide des scènes où tu brilles et celles où tu galères. Fixé pour cette partie.",
    // B · c9d3f7ebe066
    "setupFields.worldKnowsAboutYou.label": "Que dit déjà la compagnie sur toi ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · 99a58f206d5a
    "setupFields.worldKnowsAboutYou.placeholder": "ex. A appris tout le rôle en une semaine et ne peut pas s’arrêter d’en parler.",
    // B · 3aa4328667d6
    "protagonist.kind": "VIDE",
    // A · 1711da29beae
    "opening": "Le metteur en scène arrête la répétition à onze minutes. Hier, il avait tenu vingt.\n\n« Reprenez au début de la scène. » Il ne lève pas les yeux de ses notes. « Renn, assieds-toi. Understudy, prends sa place. »\n\nC’est toi. Neuf personnes se tournent pour te regarder rejoindre ta marque, c’est la première fois ce mois-ci que quelqu’un dans cette salle te regarde droit dans les yeux.\n\nTalia s’assoit sans un mot et croise les mains sur ses genoux. Tu ne sais pas si elle est généreuse ou si c’est le coup d’envoi de quelque chose.\n\nTu connais ta réplique. Tu la connais depuis février.",
    // A · 59c4892c42e5
    "openingSuggestions": ["Je prends ma marque et je joue exactement comme je l’ai répété seul à deux heures du matin. Pas d’ajustement, pas d’excuse.","Je m’arrête avant la première réplique et je regarde le metteur en scène droit dans les yeux. « Dis-moi ce que tu veux vraiment à ce moment-là. Je te donne ça. »","Je croise le regard de Talia dans l’obscurité au-delà des lumières, et je le retiens un peu plus longtemps que ça ne devrait. Puis je commence."],
  },
});
