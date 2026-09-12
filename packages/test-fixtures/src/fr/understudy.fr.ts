import { registerWorldText } from '@plotbreak/contracts';

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
    // A · 42d8c6bfa8f8
    "fantasyLabel": "Tu connais le rôle. Tu es le second choix.",
    // A · b603856ad6ca
    "hook": "Tu es le remplaçant pour le rôle principal. La première est dans six semaines, et le metteur en scène ne change pas la distribution.",
    // A · c51d053298d3
    "premise": "Tu es étudiant en théâtre à la Verrine Company, et tu es le remplaçant pour le rôle principal de la production de cette année. Être remplaçant, ça veut dire que tu apprends tout le rôle sans jamais jouer. Tu prends la place seulement si la première ne peut pas.\n\nLa première, c’est Talia Renn. Elle est meilleure que toi dans un domaine, et moins bonne dans quatre, et tout le monde dans la boîte le sait, elle y compris. La première est dans six semaines et la date ne bouge pas.\n\nTu ne peux pas juste répéter plus qu’elle, parce que le metteur en scène ne change pas la distribution après la troisième semaine et il n’a jamais enfreint cette règle. La seule manière d’entrer, c’est de devenir la personne vers qui tout le monde se tourne quand ça coince.\n\nÇa veut dire des faveurs. La compagnie tient un carnet des dettes, écrit de la main du metteur en scène, et on le lit à voix haute à la fin de la session. Demander de l’aide y inscrit ton nom. De même que rendre service.\n\nTu as donc six semaines pour devenir indispensable. Ça signifie être celui qui remet les choses en ordre quand ça déraille, et aussi collecter des faveurs que tu devras rendre plus tard. Personne dans cette boîte ne t’élèvera jamais la voix. C’est encore l’endroit le plus dangereux où tu aies travaillé.",
    // A · e481062e5df9
    "mechanicsChips": ["Persuasion","Réputation","Relations","Délais"],
    // A · d987af336199
    "creatorNote": "Pas de bagarre, pas de magie. Ta vraie gestion, c’est ce que les gens racontent de toi quand tu n’es pas là.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · 5a7f73d37e0c
    "rules.hardCanon": ["La première est dans six semaines et la date ne bouge pas.","Le livre de la Compagnie enregistre chaque faveur. Il est lu à voix haute à la fin du trimestre.","Personne n’a jamais été recasté après la troisième semaine.","Ysra est un rôle, pas une personne. Tout le monde finit par l’oublier."],
    // A · a20a7fb53f6a
    "rules.toneGuide": "Pièces chauffées, calculs froids. Les gens sont généreux en public et précis en privé. Ici, l’ambition n’est pas un défaut ; faire semblant de ne pas en avoir, si.",
    // B · fb8bc434078d
    "skills.performance.name": "Interprétation",
    // B · cfb7a15645c3
    "skills.performance.attribute": "présence",
    // B · 4fa6bf3b3835
    "skills.performance.description": "Être regardé volontairement.",
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
    "skills.insight.description": "Lire la pièce avant qu’elle ne te lise.",
    // B · cf929c9acc8a
    "skills.composure.name": "Calme",
    // B · 4c84c2c842d0
    "skills.composure.attribute": "détermination",
    // B · 6ef0cac27c0f
    "skills.composure.description": "Prendre une note sans fléchir.",
    // B · 06fd90a69021
    "skills.stagecraft.name": "Art du théâtre",
    // B · a8c1fa8269c3
    "skills.stagecraft.attribute": "esprit",
    // B · eb7b6c0baa78
    "skills.stagecraft.description": "Cordes, signaux, et ce qui casse quand.",
    // B · b7507f05e27b
    "skills.movement.name": "Mouvement",
    // B · 7ce3b6387340
    "skills.movement.attribute": "agilité",
    // B · c3a3c77bb701
    "skills.movement.description": "Chorégraphies, chutes, et l’illusion de facilité.",
    // B · c3b9ba0f70aa
    "resources.stamina.name": "Endurance",
    // B · 34e8ec1ac388
    "resources.stamina.polarity": "BON_HAUT",
    // B · 222c25a77bf4
    "resources.stamina.zeroStateConsequence": "Ton épuisement se voit. Tout ce qui est social devient plus dur.",
    // B · 22fa7a5c5a5a
    "resources.stamina.color": "#43D6A4",
    // B · 46adc881193f
    "resources.standing.name": "Réputation",
    // B · 34e8ec1ac388
    "resources.standing.polarity": "BON_HAUT",
    // B · 99446bbc108a
    "resources.standing.zeroStateConsequence": "La pièce ne se tourne plus vers toi. Tu fais partie du mobilier.",
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
    "items.annotated_sides.name": "Les Feuillets annotés",
    // B · 21bbab704ce0
    "items.annotated_sides.tags": ["quête"],
    // B · 496888eb45e7
    "items.annotated_sides.description": "Ton exemplaire du script. Quatre mois de notes en marge que personne ne t’a demandées.",
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
    "items.throat_tincture.icon": "flacon",
    // A · cbd9bbea6496
    "items.company_book.name": "Le Carnet de la compagnie",
    // B · f88c6548fc3b
    "items.company_book.tags": ["quête","preuve"],
    // B · d1b706ab12f2
    "items.company_book.description": "Qui doit quoi, écrit de la main du metteur en scène. T’es cité deux fois à la page quatre.",
    // B · 38fac596ade5
    "items.company_book.loreText": "La deuxième entrée n’est pas de ta main et ne te concerne pas.",
    // B · bccca52309b0
    "items.company_book.icon": "registre",
    // A · 6ef614cf3197
    "abilities.run_it_again.name": "Refaire la scène",
    // B · fb180298ef37
    "abilities.run_it_again.tags": ["technique_scène","technicien"],
    // B · 6dcd036949cd
    "abilities.run_it_again.description": "Remets la pièce à zéro et reprends à une réplique précise, pour que tout le monde ait la deuxième chance que tu prépares.",
    // B · c44e6dd70059
    "abilities.run_it_again.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.run_it_again.check.attribute": "esprit",
    // A · 305ecc7d3345
    "abilities.take_the_stage.name": "Prendre la scène",
    // B · 66bc9217f686
    "abilities.take_the_stage.tags": ["performance","naturel"],
    // B · 6ef88dc492e5
    "abilities.take_the_stage.description": "Entre dans la lumière et la garde. Tout ce qui se passait dans la pièce s’arrête.",
    // B · c44e6dd70059
    "abilities.take_the_stage.targetRule": "AUCUN",
    // B · cfb7a15645c3
    "abilities.take_the_stage.check.attribute": "présence",
    // A · 29e0487d5924
    "abilities.have_a_word.name": "Avoir un mot",
    // B · 19ed1267d763
    "abilities.have_a_word.tags": ["social","diplomate"],
    // B · a899c42cbc8f
    "abilities.have_a_word.description": "Isoler quelqu’un pendant quatre-vingt-dix secondes et changer ce qu’il s’apprêtait à faire.",
    // B · 39d896e20aec
    "abilities.have_a_word.targetRule": "UN",
    // B · cfb7a15645c3
    "abilities.have_a_word.check.attribute": "présence",
    // A · 822f192f57e7
    "abilities.read_the_room.name": "Lire la pièce",
    // B · 09b907576d49
    "abilities.read_the_room.tags": ["social"],
    // B · 2b685a71f4f6
    "abilities.read_the_room.description": "Arrêter de jouer un instant et comprendre ce que tout le monde veut vraiment.",
    // B · c44e6dd70059
    "abilities.read_the_room.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.read_the_room.check.attribute": "esprit",
    // A · 6dc75c702dc8
    "abilities.take_the_note.name": "Prendre la note",
    // B · 162b675b4797
    "abilities.take_the_note.tags": ["social","défensif"],
    // B · 6c415fa931d5
    "abilities.take_the_note.description": "Intégrer une correction à tel point que la personne qui la donne finit par te soutenir.",
    // B · 39d896e20aec
    "abilities.take_the_note.targetRule": "UN",
    // B · 4c84c2c842d0
    "abilities.take_the_note.check.attribute": "volonté",
    // A · f8b9c5783fb8
    "locations.rehearsal_room.name": "Salle de répétition 2",
    // A · 720b85d25c2a
    "locations.rehearsal_room.shortName": "Répétition",
    // B · 5ff3f4daa7ab
    "locations.rehearsal_room.description": "Parquet à ressorts, un mur de miroirs, et un piano que personne a le droit de bouger. Du ruban sur le sol dessine un décor qui n’existe pas encore.",
    // B · 4a0ba82382f7
    "locations.rehearsal_room.stageImage": "story_understudy/stage_rehearsal_room",
    // B · cfad9db7b7d7
    "locations.rehearsal_room.ambientSfx": ["piano","pas"],
    // A · 89c96a6c69b2
    "locations.green_room.name": "Le salon vert",
    // A · 24663dccc9c2
    "locations.green_room.shortName": "Salon vert",
    // B · 52cd78c9709a
    "locations.green_room.description": "Deux canapés qui ont survécu à quatre principaux, une bouilloire, et un tableau d’affichage où la liste des rôles est affichée. Tout le monde fait semblant de pas la regarder.",
    // B · 42196781c2f9
    "locations.green_room.stageImage": "story_understudy/stage_green_room",
    // B · 8f4684d36da7
    "locations.green_room.ambientSfx": ["bouilloire","murmure"],
    // A · 96ce1683a7d6
    "locations.stage.name": "La scène principale",
    // A · 9ae22a94ad08
    "locations.stage.shortName": "Scène",
    // B · 1a43819bc16c
    "locations.stage.description": "Neuf cents sièges vides et une lumière fantôme qui brûle au centre. D’ici, la salle est un souffle retenu.",
    // B · ee8d34def77b
    "locations.stage.stageImage": "story_understudy/stage_stage",
    // B · a8f2965f844e
    "locations.stage.ambientSfx": ["ambiance_salle","grincement"],
    // A · 627c408fcb5f
    "locations.wardrobe.name": "Vestiaire",
    // A · 627c408fcb5f
    "locations.wardrobe.shortName": "Vestiaire",
    // B · 694f597889ff
    "locations.wardrobe.description": "Penderies jusqu’au plafond et odeur de vapeur. Marta travaille ici et entend tout, parce que personne pense à arrêter de parler devant elle.",
    // B · a7dbd2eb65e3
    "locations.wardrobe.stageImage": "story_understudy/stage_wardrobe",
    // B · 44da6ceb121d
    "locations.wardrobe.ambientSfx": ["vapeur","cintres"],
    // A · 8fe919918810
    "locations.directors_office.name": "Le bureau du metteur en scène",
    // A · c1f1fcd9cb41
    "locations.directors_office.shortName": "Bureau",
    // B · cda2bf619380
    "locations.directors_office.description": "Une chaise pour lui et une pour celui qui a un problème. Le Livre de la Compagnie est fermé sur le bureau, ce qui est pire que s’il était ouvert.",
    // B · 949f94faaa08
    "locations.directors_office.stageImage": "story_understudy/stage_directors_office",
    // B · cdadbd79d623
    "locations.directors_office.ambientSfx": ["horloge"],
    // B · 3f6cc6f45c21
    "characters.talia.name": "Talia Renn",
    // A · 80f96e6c0e54
    "characters.talia.role": "Distribution principale, Ysra",
    // A · 9154a75f2fb7
    "characters.talia.cardBlurb": "La première rôle que tu dois remplacer. Elle n’est pas ton ennemie et elle ne va pas te céder la part.",
    // B · aee35f364a88
    "characters.talia.pronouns": "elle",
    // A · 50eb1049db41
    "characters.talia.publicTraits": ["Généreuse","Impeccable","Jamais en retard"],
    // B · 0ef82935cf1d
    "characters.talia.hiddenDrives": ["Elle sait que tu es meilleure au deuxième acte et elle le sait depuis la lecture.","Elle est soutenue par un mécène dont le nom est dans le Livre de la Compagnie."],
    // B · bdac7a6a4ae6
    "characters.talia.values": ["Savoir-faire","Ne pas être prise en pitié"],
    // B · 3c500d01f8dd
    "characters.talia.fears": ["Être découverte comme juste correcte","Devoir de l’argent à quelqu’un en public"],
    // A · 5939aa767db4
    "characters.talia.socialStyle": "Généreuse en public, rigoureuse en privé. Elle te fait des compliments très justes, ce qui est pire.",
    // B · 23f8a180a567
    "characters.talia.boundaries": ["Ne sabote personne","N’admet jamais sa peur à voix haute"],
    // B · ccf21bb6bf1c
    "characters.talia.goals": ["Ouvrir le spectacle","Effacer son nom du livre"],
    // B · 93d14d6d2041
    "characters.talia.secrets.talia_patron.fact": "La place de Talia dans la compagnie a été payée par un mécène, et la dette est enregistrée.",
    // B · 47558a04be8d
    "characters.talia.secrets.talia_patron.visibility": "NPC_PRIVATE",
    // B · 13f07eaa0d72
    "characters.talia.secrets.talia_patron.revealHint": "Nécessite le Livre de la Compagnie ou une confiance supérieure à 45.",
    // A · 161d3139fdf0
    "characters.talia.speechStyle": "Précise, posée, ne hausse jamais le ton. Pose des questions plutôt que de discuter.",
    // A · 0fafaee6dbea
    "characters.talia.topics": ["acte deux","la distribution","ce qu’elle doit","soir d’ouverture"],
    // A · b916a95684b1
    "characters.talia.voiceSamples": ["Tu m’as dépassée dans le deuxième acte. Je préfère te le dire plutôt que tu penses que je n’ai rien vu.","Je vais pas me battre avec toi pour ça. Je compte juste pas le perdre.","Prends la note. Il a raison, et ça ne te coûte rien de dire oui."],
    // B · ac1546ebc951
    "characters.talia.appearance": "Grande, cheveux foncés attachés sévèrement, tenue noire de répétition bien ajustée.",
    // B · cf4488d9c485
    "characters.talia.visualHook": "La moitié de son visage en plein maquillage de scène et l’autre moitié nue, prise entre la loge et la scène, la ligne au centre parfaitement nette.",
    // B · 4e41a1fbabd8
    "characters.talia.silhouette": "Grande et verticale, cheveux foncés attachés sévèrement, tenue noire de répétition parfaitement ajustée, mains croisées et immobiles.",
    // B · 57aa96689b2c
    "characters.talia.artSeed": "talia-renn-v1",
    // B · b129e16792bb
    "characters.talia.portrait": "story_understudy/talia",
    // B · dcaeb58f0962
    "characters.talia.expressions": ["neutre","gracieuse","sur ses gardes","piquée","résolue"],
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
    "characters.oswin.role": "Réalisateur",
    // A · d4d48804b73b
    "characters.oswin.cardBlurb": "Le réalisateur. C’est lui qui décide si tu prends le relais, et il n’a jamais changé la distribution après la troisième semaine.",
    // B · fcca6b746d0b
    "characters.oswin.pronouns": "il",
    // A · 2f6cae7656af
    "characters.oswin.publicTraits": ["Franc","Juste à sa façon","Le talent l’ennuie"],
    // B · 8977e5e18e57
    "characters.oswin.hiddenDrives": ["Il a déjà remplacé ce rôle une fois, il y a vingt ans, et ça a détruit une carrière.","Il cherche une raison de ne pas recommencer."],
    // B · 71a3567f54bb
    "characters.oswin.values": ["Le travail","Tenir sa parole"],
    // B · a399872f767c
    "characters.oswin.fears": ["Se répéter","Un spectacle juste correct"],
    // A · 4156a1b27d0f
    "characters.oswin.socialStyle": "Il dit d’entrée ce qui est dur à entendre, puis il regarde ce que tu en fais.",
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
    "characters.oswin.speechStyle": "Impératifs brefs. Pas d’éloge sauf s’il pèse lourd. Il appelle tout le monde par son nom de famille.",
    // A · ebeab3f7d095
    "characters.oswin.topics": ["la note qu’il t’a donnée","la distribution","ce qu’il attend du deuxième acte"],
    // A · cbde24559aef
    "characters.oswin.voiceSamples": ["Encore. Et cette fois, marque bien la deuxième moitié de la phrase.","J’ai pas besoin que tu sois meilleure qu’elle. J’ai besoin que tu sois indispensable.","Tu me demandes de faire preuve de justice. Moi je te demande d’être intéressant."],
    // B · c2e27b20f1e7
    "characters.oswin.appearance": "Soixante ans, velours côtelé, lunettes de lecture remontées, un crayon derrière l’oreille en permanence.",
    // B · 8a725cb8ed4b
    "characters.oswin.visualHook": "Un crayon de charpentier derrière l’oreille et des lunettes de lecture remontées dans ses cheveux gris, avec une baguette de chef d’orchestre usée et pâle là où son pouce repose.",
    // B · 1a300f686c9e
    "characters.oswin.silhouette": "Large et posé, velours côtelé, bras croisés, la seule personne dans le bâtiment qui n’est jamais pressée.",
    // B · 9149dec7292a
    "characters.oswin.artSeed": "oswin-deare-v1",
    // B · 192a77bab8dc
    "characters.oswin.portrait": "story_understudy/oswin",
    // B · d89d99124a04
    "characters.oswin.expressions": ["neutre","aiguisé","réfléchi","impatient","content"],
    // B · df9e058f8274
    "characters.oswin.knowledgeScope": ["faction_company"],
    // B · 8b6bc1de22e9
    "characters.oswin.gates.oswin_considers.label": "Oswin te prendra vraiment en considération",
    // B · 77dcad9b37cc
    "characters.oswin.gates.oswin_considers.kind": "AUTRE",
    // B · 5ebd0a5e14a0
    "characters.oswin.gates.oswin_considers.requires.flagsSet": ["proved_act_two"],
    // B · daf4a8028996
    "characters.marta.name": "Marta Voss",
    // A · dd85e7593aa7
    "characters.marta.role": "Maîtresse d’habits",
    // A · 153bfa7a7c08
    "characters.marta.cardBlurb": "Responsable des costumes. Elle surprend toutes les conversations dans ce bâtiment, y compris celles qui parlent de toi, mais elle ne répète presque jamais rien.",
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
    "characters.marta.socialStyle": "Elle parle en travaillant et arrête de travailler quand ça compte.",
    // B · b75bdfd34edc
    "characters.marta.boundaries": ["Ne fera pas de commérages sur quelqu’un dans la pièce","Ne mentira pas au metteur en scène"],
    // B · 25ca25995b1b
    "characters.marta.goals": ["Préparer la pièce","Garder sa copie du livre secrète"],
    // B · 25ff4ea87679
    "characters.marta.secrets.marta_copy.fact": "Marta garde sa propre copie du Livre de la Compagnie dans la loge.",
    // B · 47558a04be8d
    "characters.marta.secrets.marta_copy.visibility": "NPC_PRIVATE",
    // B · 4d9d057241c2
    "characters.marta.secrets.marta_copy.revealHint": "Confiance 40+, et seulement après qu’elle ait décidé que tu n’es pas une ambitieuse.",
    // A · 9afa8526547d
    "characters.marta.speechStyle": "Sèche, rapide, pleine de remarques en passant. Elle emploie « love » comme ponctuation et pense à moitié ce qu’elle dit.",
    // A · 0a275a2c547c
    "characters.marta.topics": ["qui doit quoi","la dernière doublure","le deuxième acte","ce qu’elle a entendu"],
    // A · 66b72b145510
    "characters.marta.voiceSamples": ["Les bras en l’air, love. T’es pas la première à rester plantée là comme ça.","J’entends tout ce qui se passe ici, mais je répète presque rien. Presque.","La dernière qui m’a posé cette question a eu le rôle, et elle était insupportable après."],
    // B · 14843fcef91b
    "characters.marta.appearance": "Cinquante ans, épingles à la manche, lunettes sur une chaîne, mains qui ne s’arrêtent jamais.",
    // B · f2c71941ec5a
    "characters.marta.visualHook": "Une rangée d’épingles à couturière plantées dans la manche comme une bandoulière, et un mètre ruban porté autour du cou comme une écharpe.",
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
    "factions.faction_company.description": "Onze élèves, un livre, et une mémoire très longue.",
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
    "quests.q_six_weeks.steps.step_first_note.succeedWhen.flagsSet": ["spoke :oswin"],
    // B · 3d022918613c
    "quests.q_six_weeks.steps.step_first_note.succeedWhen.atLocation": "rehearsal_room",
    // B · 34a089240ed5
    "quests.q_six_weeks.steps.step_first_note.rewards.flags": ["took_first_note"],
    // B · c1ac0a8e102e
    "quests.q_six_weeks.steps.step_act_two.playerCopy": "Prouve que tu maîtrises le deuxième acte.",
    // B · d49968317cf4
    "quests.q_six_weeks.steps.step_act_two.directorNotes": "La promesse sur laquelle tout repose, et il y a plus d’une façon d’être indéniable. Un comédien le fait devant les autres. Un technicien fait marcher la scène et laisse la salle voir qui a réparé. Un diplomate fait dire ce qu’il faut à la bonne personne. Tout le monde peut simplement mieux se préparer que les autres, mais ça coûte plus cher. Quoi qu’il en soit, ça se fait devant témoins.",
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
    "quests.q_the_book.summary": "Découvre qui y est inscrit, et pour combien.",
    // B · 7fcc0be2ad9c
    "quests.q_the_book.kind": "PRINCIPALE",
    // B · 0aa58a346787
    "quests.q_the_book.discoverWhen.flagsSet": ["parlé :marta"],
    // B · 628f6f8ba873
    "quests.q_the_book.steps.step_find_copy.playerCopy": "Fais-toi montrer le livre.",
    // B · d3e30e5d1285
    "quests.q_the_book.steps.step_find_copy.directorNotes": "Marta a une copie et ne la donnera pas à un ambitieux. Elle la confiera à quelqu’un en qui elle a confiance, Oswin garde la sienne au bureau, et on peut aussi la prendre — ce qui n’est pas la même chose, et le bâtiment l’apprend.",
    // B · e7320dcdb4e3
    "quests.q_the_book.involvedCharacterIds": ["marta","talia"],
    // B · 42ef4db8c73a
    "quests.q_the_book.involvedLocationIds": ["coulisses","bureau_du_directeur"],
    // B · 3cc6817ed43c
    "quests.q_the_book.knownRewardCopy": "La vérité sur comment on est choisi ici.",
    // B · ad55e5dd6d08
    "quests.lead_ghost_light.title": "La Lumière Fantôme",
    // B · 84ec2589cd52
    "quests.lead_ghost_light.summary": "Quelqu’un est sur scène après la fermeture, et ce n’est pas l’équipe.",
    // B · eff80c847ff6
    "quests.lead_ghost_light.kind": "PRINCIPALE",
    // B · d66e8d896d94
    "quests.lead_ghost_light.discoverWhen.flagsSet": ["visité :scène"],
    // B · 9862dbac05c7
    "quests.lead_ghost_light.steps.step_ghost_light.playerCopy": "Sois sur scène tard, et attends.",
    // B · ac35237e5974
    "quests.lead_ghost_light.steps.step_ghost_light.directorNotes": "La récompense de la relation §16.4. Talia répète seule la nuit parce qu’elle n’est pas sûre non plus. Être trouvée là n’est pas pareil qu’être invitée, et qu’on te demande franchement, c’est encore différent. Ce n’est pas un trophée ; c’est elle qui décide.",
    // B · 29f969e2ca93
    "quests.lead_ghost_light.involvedCharacterIds": ["talia"],
    // B · 5632f44713d2
    "quests.lead_ghost_light.involvedLocationIds": ["scène"],
    // B · a2b7d4d5428d
    "quests.lead_ghost_light.knownRewardCopy": "Talia, sans la performance.",
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
    "promises.promise_talia.label": "Talia, qui n’est pas ton ennemie et ne sera pas ton amie",
    // B · 281d816cb433
    "promises.promise_talia.seedHint": "Elle te fait un compliment juste, devant du monde.",
    // B · 3ba3f9124a6a
    "promises.promise_talia.payoffHint": "Elle répète seule la nuit parce qu’elle n’est pas sûre non plus.",
    // B · e82d9dc4b3fa
    "promises.promise_book.kind": "MYSTÈRE",
    // B · f836a90c2ba1
    "promises.promise_book.label": "Le livre, et dont le nom y est écrit deux fois",
    // B · 903fe1e3c561
    "promises.promise_book.seedHint": "Le livre est fermé sur le bureau, ce qui est pire que s’il était ouvert.",
    // B · 07cb920b3637
    "promises.promise_book.payoffHint": "Talia y est. Et toi aussi, à la page quatre.",
    // A · 0f1d81bf0f75
    "archetypes.arch_technician.name": "Le Technicien",
    // B · 8765e9687c6c
    "archetypes.arch_technician.role": "Artisanat en coulisses",
    // A · 3def9bd3e45d
    "archetypes.arch_technician.summary": "Tu sais vraiment comment est construit le spectacle. Le meilleur sous pression et avec tout ce qui est technique ; le pire quand il faut se montrer.",
    // A · 36da1de73979
    "archetypes.arch_technician.playstyle": ["Pratique","Nerveux stable","Pas un artiste"],
    // A · 553206984639
    "archetypes.arch_technician.blurb": "Tu n’es pas la personne la plus captivante ici. Tu es la plus fiable.",
    // B · aa4528deae79
    "archetypes.arch_technician.startingAbilities": ["refaire_la_scene"],
    // A · cb776e2dad4c
    "archetypes.arch_natural.name": "Le Naturel",
    // B · c55d4239af38
    "archetypes.arch_natural.role": "Présence sur scène",
    // A · c2e2179af175
    "archetypes.arch_natural.summary": "C’est celui que tout le monde regarde. La présence la plus forte de la compagnie, et pourtant aucun plan B quand le charme ne suffit pas.",
    // A · 88e20dde9e09
    "archetypes.arch_natural.playstyle": ["Impose la pièce","Interprète physique","Une seule corde à son arc"],
    // A · bdd7f09ccb3f
    "archetypes.arch_natural.blurb": "Tout a toujours été facile, ce qui est un problème en soi.",
    // B · 2903785211d5
    "archetypes.arch_natural.startingAbilities": ["prendre_la_scene"],
    // A · 11ced9be6a7b
    "archetypes.arch_diplomat.name": "Le Diplomate",
    // B · 56a6861707da
    "archetypes.arch_diplomat.role": "Social",
    // A · cd6ffccd168b
    "archetypes.arch_diplomat.summary": "Tu lis la pièce et tu la répares en silence. Meilleur avec les gens, ce qui ici cause la plupart des problèmes.",
    // A · b4ba57242614
    "archetypes.arch_diplomat.playstyle": ["Persuasion","Lecture des gens","Polyvalent"],
    // A · f0da2de765e5
    "archetypes.arch_diplomat.blurb": "Tu n’as jamais été le meilleur dans la salle. Souvent, tu es celui qui la fait marcher.",
    // B · 28e1562d416e
    "archetypes.arch_diplomat.startingAbilities": ["avoir_un_mot"],
    // B · 62664c6d85af
    "setupFields.displayName.label": "Quel nom figure sur la liste des rôles ?",
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
    "setupFields.archetype.label": "Quel type de personne de théâtre es-tu ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHÉTYPE",
    // B · 47342b947413
    "setupFields.archetype.helpText": "Ce que tu savais déjà faire quand la compagnie t’a pris. Ça fixe tes attributs et ta formation, donc ça décide des scènes que tu gères et de celles où tu galères. Défini pour cette partie.",
    // B · c9d3f7ebe066
    "setupFields.worldKnowsAboutYou.label": "Qu’est-ce que la compagnie dit déjà de toi ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · 99a58f206d5a
    "setupFields.worldKnowsAboutYou.placeholder": "ex. A appris tout le rôle en une semaine et en parle tout le temps.",
    // B · 3aa4328667d6
    "protagonist.kind": "VIDE",
    // A · 1711da29beae
    "opening": "Le metteur en scène stoppe la répétition à onze minutes. Hier, il avait tenu vingt.\n\n« Depuis le début de la scène. » Il ne lève pas les yeux de ses notes. « Renn, assieds-toi. L’understudy, prends la place. »\n\nC’est toi. Neuf personnes se tournent vers toi alors que tu vas à ta marque, c’est la première fois ce mois-ci que quelqu’un ici te regarde vraiment.\n\nTalia s’assoit sans un mot, les mains jointes sur les genoux. Impossible de dire si elle est généreuse ou si c’est un premier coup dans un jeu plus grand.\n\nTu connais ta réplique. Tu la connais depuis février.",
    // A · 59c4892c42e5
    "openingSuggestions": ["Je prends ma marque et je joue exactement comme je le fais seul à deux heures du matin. Pas d’ajustement, pas d’excuse.","Je m’arrête avant la première réplique et je regarde droit le metteur en scène. « Dis-moi ce que tu veux vraiment de ce moment. Je te le donne. »","Je cherche les yeux de Talia dans l’obscurité au-delà des lumières et les retiens une seconde trop longtemps. Puis je commence."],
  },
});
