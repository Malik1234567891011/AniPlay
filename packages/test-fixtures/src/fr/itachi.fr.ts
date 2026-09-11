import { registerWorldText } from '@aniplay/contracts';

/**
 * Itachi, in French.
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
  storyId: "story_itachi",
  text: {
    // A · b8b673f932c1
    "fantasyLabel": "Les deux camps pensent déjà que tu leur appartiens.",
    // A · f249df50a902
    "hook": "Tu as treize ans, tu es le meilleur shinobi que ton clan ait produit en une génération, et dans deux semaines ton père prévoit de prendre le village par la force avec tout ce que tu lui as dit.",
    // A · af15eeddb53e
    "premise": "Tu as treize ans. Tu es le meilleur shinobi que ton clan ait produit en une génération, et les deux camps du conflit qui déchire ton village ont déjà décidé que tu leur appartenais.\n\nTon père dirige le clan. Le clan prépare un coup de force pour prendre le village. Les agents secrets du village veulent savoir quand. Toi, tu informes les deux, et aucun des deux ne sait que tu informes l’autre.\n\nC’était supportable tant que ce n’était qu’une affaire politique. Maintenant, il y a une date. Ton père ne te demande plus ton avis, il te donne des missions, et le vieil homme qui dirige les opérations noires du village ne fait plus semblant que ça finira par une négociation.\n\nTu as un frère de sept ans, qui attend sur la marche chaque soir au cas où tu rentrerais tôt, et qui n’a aucune idée de tout ça. Tu as un meilleur ami qui croit avoir trouvé un moyen d’arrêter ça sans qu’il y ait de morts. Il te reste environ deux semaines.\n\nPersonne ici n’est un méchant. Ton père a raison : son clan est traité en suspect depuis dix ans. Le village aussi a raison : un coup d’État ouvrirait les portes à trois pays qui l’attendent depuis longtemps.\n\nAlors tu dois trouver quelque chose qui convienne aux deux, ou choisir lequel trahir, ou imaginer un troisième choix auquel personne n’a encore pensé.",
    // A · f90bffcb71df
    "mechanicsChips": ["Informer les deux camps","Tu peux parler à ton frère","Rien n’est planifié","Les preuves comptent plus que les accusations","Personne n’est un méchant"],
    // A · df0a16b6bad4
    "creatorNote": "La version célèbre de cette quinzaine se termine d’une seule façon. Celle-ci n’a pas à faire pareil. Sauve ton ami, arrête quatre hommes au lieu d’en tuer quatre-vingt-dix, dis la vérité à ton frère tant qu’il est encore assez jeune pour l’entendre, dépose les preuves sur le bureau du Hokage, ou sors par la porte sud avec ton frère de sept ans et laisse-les régler ça eux-mêmes. Chacune de ces options est une vraie fin, et aucune n’est simple.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · 1fd709f6599b
    "rules.hardCanon": ["Le joueur est Itachi Uchiha, treize ans, fils de Fugaku et Mikoto, frère aîné de Sasuke, et capitaine ANBU.","Le clan est sous surveillance et soumis à des restrictions politiques depuis l’attaque du Neuf Queues il y a dix ans, et le grief est réel.","Fugaku organise un coup d’État et préférerait prendre le village sans tuer personne. Cette préférence est sincère et ce n’est pas une garantie.","Danzo Shimura dirige Root, ne répond à personne, et croit que la prévention coûte moins cher que la guerre. Il a parfois raison sur le risque et toujours tort sur le prix.","Hiruzen veut un règlement négocié et a passé dix ans à être trop lent. Il peut être convaincu par des preuves et par rien d’autre.","Shisui est vivant au début de l’histoire, est le meilleur ami du joueur, et a son propre plan. Rien n’est fixé sur sa mort.","Sasuke a sept ans, adore son frère, et ne sait rien. Ce qu’il finit par croire se décide en jeu et ne se présume jamais.","Le massacre est quelque chose que quelqu’un pourrait choisir. Il n’est pas programmé, il n’est dû à personne, et aucun remplaçant ne sera inventé si le joueur l’empêche."],
    // A · bc2afcb2eab9
    "rules.toneGuide": "Un drame d’anime sérieux avec un thriller politique très concret. Chaque conversation a deux sens : le clan demande ce qu’a dit le Hokage, le village veut savoir ce que prépare le clan, et Sasuke demande si tu rentres à la maison. La vie ordinaire est un pilier — les repas, la marche jusqu’aux postes d’entraînement, le nettoyage d’un masque, un salon de thé, un garçon de sept ans qui compte ses lancers. Passe du temps là-bas, parce que la tragédie ne fonctionne que si l’enfance existe. Personne ne se revendique en méchant, personne ne fait de discours sur la paix. Danzo parle en conséquences, Fugaku parle du clan comme un corps, Hiruzen temporise, et un gamin de treize ans peut rester un gamin même s’il est traité comme un égal par des hommes quatre fois plus âgés. Les combats sont tactiques et lisibles — clones, angles, terrain, ce que le Sharingan te laisse vraiment voir — jamais une masse floue de mouvement. Le Genjutsu distingue toujours ce qui a été perçu de ce qui s’est passé réellement. Ne donne pas de leçon de recul à une scène qui ne l’a pas méritée.",
    // B · af2060ad694a
    "skills.shuriken.name": "Shurikenjutsu",
    // B · 7ce3b6387340
    "skills.shuriken.attribute": "agilité",
    // B · f13dfef39ac3
    "skills.shuriken.description": "Angles, ricochets, et toucher la chose derrière celle que tu semblais viser.",
    // B · 0ecc977e14ad
    "skills.genjutsu.name": "Genjutsu",
    // B · 5dbc8bb102ac
    "skills.genjutsu.attribute": "arcane",
    // B · a792c0b285c0
    "skills.genjutsu.description": "Mettre quelque chose dans la tête de quelqu’un d’autre qui n’était jamais dans la pièce.",
    // B · 696517abcb74
    "skills.tactics.name": "Tactiques",
    // B · a8c1fa8269c3
    "skills.tactics.attribute": "esprit",
    // B · 2be37c2281f2
    "skills.tactics.description": "Lire une pièce, un toit ou une réunion de clan pour ce qui va s’y passer.",
    // B · 725bc338a045
    "skills.tradecraft.name": "Techniques d’espionnage",
    // B · a8c1fa8269c3
    "skills.tradecraft.attribute": "esprit",
    // B · ba124d6dc8e5
    "skills.tradecraft.description": "Caches, filatures, rapports classés, et lequel des trois hommes derrière toi est celui qui compte.",
    // B · 61615eb21a20
    "skills.plain_speech.name": "Parole franche",
    // B · 4c84c2c842d0
    "skills.plain_speech.attribute": "détermination",
    // B · 7c8076c86c79
    "skills.plain_speech.description": "Dire la vérité à quelqu’un que ça va blesser, tant qu’il est encore temps que ça aide.",
    // B · e0434a6a94fd
    "skills.bearing.name": "Présence",
    // B · cfb7a15645c3
    "skills.bearing.attribute": "présence",
    // B · 62d909249d29
    "skills.bearing.description": "Être cru par une pièce d’adultes qui ont un rang supérieur et ont décidé ce que tu es.",
    // B · aba2119930e7
    "skills.taijutsu.name": "Taijutsu",
    // B · 97081b4b4792
    "skills.taijutsu.attribute": "force",
    // B · a3f13aa85070
    "skills.taijutsu.description": "Travail rapproché, fait petit et vite parce que tu as treize ans et que les autres non.",
    // B · 26c93295dde8
    "resources.reserve.name": "Réserve",
    // B · 34e8ec1ac388
    "resources.reserve.polarity": "BON ÉLEVÉ",
    // B · 66d7d715c285
    "resources.reserve.zeroStateConsequence": "Il tient sur ses dernières forces et ça se voit aux personnes dont il veut le plus cacher ça. Mikoto arrête de demander et commence à lui mettre de la nourriture devant lui. Shisui arrête de plaisanter. Sasuke, qui a sept ans, remarque ça avant eux et ne comprend pas ce qu’il remarque.",
    // B · b0a95e62b4c3
    "resources.reserve.color": "#6E8FB5",
    // B · db6d85bcf2d9
    "resources.clan_pressure.name": "Pression du clan",
    // B · a34adbda2422
    "resources.clan_pressure.polarity": "BON FAIBLE",
    // B · 585062c69f17
    "resources.clan_pressure.zeroStateConsequence": "Tout est redevenu un débat d’adultes sur la représentation au conseil. Les réunions sont mal fréquentées. Quelqu’un a lancé une pétition, ce qui est la chose la moins dangereuse que ce clan ait faite en dix ans.",
    // B · 98e1c4bba700
    "resources.clan_pressure.color": "#B0453C",
    // B · 7f35f4119918
    "resources.silence.name": "Silence",
    // B · a34adbda2422
    "resources.silence.polarity": "BON FAIBLE",
    // B · 45faf114f7db
    "resources.silence.zeroStateConsequence": "Il ne cache rien à personne, ce qui est la version la plus étrange de lui dans ce monde. Shisui est informé avant que les décisions soient prises. Mikoto est consultée et met un moment à se remettre d’avoir été consultée. Sasuke sait à peu près où son frère va le soir, et ça l’a rendu moins effrayé qu’avant.",
    // B · 9c8f9c3c73a6
    "resources.silence.color": "#4C4655",
    // B · 2ccf8564c57d
    "resources.leverage.name": "Levier",
    // B · a34adbda2422
    "resources.leverage.polarity": "BON FAIBLE",
    // B · e249e1ede67d
    "resources.leverage.zeroStateConsequence": "Root a un dossier intéressant mais vide. Danzo peut demander et ne peut pas ordonner, et quand il présente quelque chose comme la seule option restante, il y en a visiblement une seconde à côté.",
    // B · a3091bf1f9fa
    "resources.leverage.color": "#6B6152",
    // A · 994b062916c1
    "items.anbu_mask.name": "Le Masque",
    // B · d3128d100bad
    "items.anbu_mask.tags": ["quête","anbu"],
    // B · da17287a9e34
    "items.anbu_mask.description": "Céramique peinte, une belette, taille pour un visage encore en croissance et déjà ajustée une fois. Elle vit au fond d’un cartable, sous une veste pliée, à quatre pièces de là où dort son frère.",
    // B · 5f9db97b8ce3
    "items.anbu_mask.loreText": "La peinture à l’intérieur du menton est usée jusqu’à l’argile. C’est là que le pouce va quand quelqu’un décide de la mettre.",
    // B · 411a92327ec4
    "items.anbu_mask.icon": "masque",
    // A · 068b094e6018
    "items.shuriken_pouch.name": "La Pochette",
    // B · b5e8d28b4848
    "items.shuriken_pouch.tags": ["arme"],
    // B · 0d740694326d
    "items.shuriken_pouch.description": "Vingt-deux lames de lancer, trois longueurs de fil, et une pierre pour les affûter. Tout est rangé pour être trouvé dans le noir, car la plupart s’utilisent dans le noir.",
    // B · aa11fe3bad2c
    "items.shuriken_pouch.loreText": "Quatre shuriken sont émoussés. Ce sont ceux qu’un enfant de sept ans a le droit de tenir.",
    // B · b33f62262640
    "items.shuriken_pouch.icon": "shuriken",
    // A · 7424c872b1b3
    "items.sasuke_shuriken.name": "Le meilleur shuriken de Sasuke",
    // B · e872158c299b
    "items.sasuke_shuriken.tags": ["personnel"],
    // B · a06941343a0c
    "items.sasuke_shuriken.description": "Un shuriken d’entraînement émoussé avec un éclat sur une pointe, que son propriétaire croit rendre meilleur en vol et expliquera longuement à quiconque s’arrête.",
    // B · e29eefb6e168
    "items.sasuke_shuriken.loreText": "Il le garde séparé des trois autres. Il le garde séparé depuis huit mois.",
    // B · b33f62262640
    "items.sasuke_shuriken.icon": "shuriken",
    // A · fae6630024a8
    "items.clan_jacket.name": "La Veste au Blason",
    // B · 843d6cda24a7
    "items.clan_jacket.tags": ["vêtement","clan"],
    // B · bfd4d039e9f8
    "items.clan_jacket.equipSlot": "corps",
    // B · 07665f4fc9fb
    "items.clan_jacket.description": "Col montant, éventail du clan dans le dos en blanc et rouge. Porté dans le quartier, ça veut dire que tu fais partie d’eux ; porté dans le village, ça veut dire que tout le monde ajuste ce qu’il allait dire.",
    // B · 02323c12e7d3
    "items.clan_jacket.loreText": "Mikoto a recousu l’épaule au printemps. Elle l’a fait pendant qu’il dormait à table, la seule façon qu’elle a d’agir pour lui ces derniers temps.",
    // B · 2c3f9da60ba7
    "items.clan_jacket.icon": "manteau",
    // A · e082c962420f
    "items.shisui_note.name": "Le Mot du Corbeau",
    // B · 061625d9bd60
    "items.shisui_note.tags": ["quête","document"],
    // B · 6b6df370ec44
    "items.shisui_note.description": "Une demi-feuille, pliée à la taille d’un ongle, écrite vite et lisiblement. Elle donne un lieu, une heure, et un mot que seuls deux vivants comprendraient comme un avertissement.",
    // B · 2c11137bf17f
    "items.shisui_note.loreText": "Le mot est « tôt ». C’est leur mot depuis quatre ans et il n’a jamais voulu dire ce qu’il dit.",
    // B · 4540c1847af8
    "items.shisui_note.icon": "lettre",
    // A · d635cdb42497
    "items.root_ledger.name": "Le Journal de Surveillance",
    // B · fcb7e21b23ec
    "items.root_ledger.tags": ["quête","document","preuve"],
    // B · 1d1b1c444151
    "items.root_ledger.description": "Dix mois de rotations de garde dans le quartier Uchiha, signées par une chaîne de commandement qui n’apparaît sur aucun organigramme vu par l’Hokage. Noms, heures, adresses. Le trajet scolaire de Sasuke y figure deux fois.",
    // B · eedd6658b532
    "items.root_ledger.loreText": "Ce n’est pas un document secret. C’est un document de routine, ce qui est la partie qui ruinerait une carrière, car routine veut dire que quelqu’un signe ça depuis dix mois sans que personne ne demande à qui il rend compte.",
    // B · 8143e9e47c18
    "items.root_ledger.icon": "papiers",
    // A · cfe8826e0b4c
    "items.kotoamatsukami_eye.name": "L’Œil",
    // B · 821d28500864
    "items.kotoamatsukami_eye.tags": ["quête","clan"],
    // B · 5e5b2542fb22
    "items.kotoamatsukami_eye.description": "L’œil droit d’un ami, conservé vivant dans un bocal scellé de la taille d’une pomme. Il porte une technique qui peut changer ce que quelqu’un décide sans qu’il sache jamais qu’une décision a été changée.",
    // B · 78f1d9240af0
    "items.kotoamatsukami_eye.loreText": "Elle fonctionne une fois, puis plus pendant une décennie. Celui qui la tient a exactement une occasion de contredire une personne, sans moyen de revenir en arrière.",
    // B · 3d41b7b5ac87
    "items.kotoamatsukami_eye.icon": "orbe",
    // A · d77a57b2d3cc
    "items.mikoto_bento.name": "La Boîte Qu’elle a Préparée",
    // B · 32830ea136a7
    "items.mikoto_bento.tags": ["nourriture"],
    // B · fac96f20c08f
    "items.mikoto_bento.description": "Riz aux algues et chou mariné, dans une boîte laquée avec un éclat sur le couvercle, préparé à cinq heures trente pour quelqu’un qui n’a pas dit qu’il partait.",
    // B · aaf4689c232c
    "items.mikoto_bento.loreText": "Elle en prépare un chaque matin qu’il y ait quelqu’un à qui le donner ou non. Sasuke l’a compris et ne lui en a pas parlé.",
    // B · c75d5fbfa79c
    "items.mikoto_bento.icon": "boîte",
    // A · 46bd46fb21df
    "items.dango_skewer.name": "La Commande d’Izumi",
    // B · 32830ea136a7
    "items.dango_skewer.tags": ["nourriture"],
    // B · da9f0c4570de
    "items.dango_skewer.description": "Trois sur un bâton, achetés pour deux personnes par l’une d’elles, avec l’assurance de quelqu’un qui s’entraîne à les acheter depuis hier.",
    // B · 773a6cc2734c
    "items.dango_skewer.loreText": "Elle commande toujours quatre et en mange un en chemin, pour que venir avec trois ait l’air non prémédité.",
    // B · 90960c7a6145
    "items.dango_skewer.icon": "nourriture",
    // A · ccb2170e015b
    "abilities.see_it_coming.name": "Le Sentir Arriver",
    // B · 58f69744c481
    "abilities.see_it_coming.tags": ["vue"],
    // B · 57c94404bc2a
    "abilities.see_it_coming.description": "Ralentis une pièce à la vitesse de ses signes : qui a bougé les mains en premier, qui a regardé qui avant de parler, lequel des six hommes ici a déjà accepté quelque chose.",
    // B · 39d896e20aec
    "abilities.see_it_coming.targetRule": "SINGLE",
    // B · a8c1fa8269c3
    "abilities.see_it_coming.check.attribute": "esprit",
    // A · 308cc99316af
    "abilities.the_line.name": "La Limite",
    // B · 05f59299d740
    "abilities.the_line.tags": ["offensif"],
    // B · 010eee07e96e
    "abilities.the_line.description": "Quatre lames lancées selon quatre angles, de façon que celle qui compte arrive d’un endroit que personne ne défendait. Ça marche sur les gens et sur la corde qui tient une porte fermée.",
    // B · e9383e6237fe
    "abilities.the_line.targetRule": "MULTI",
    // B · 7ce3b6387340
    "abilities.the_line.check.attribute": "agilité",
    // A · e773af1c0c6d
    "abilities.send_a_crow.name": "Envoyer un Corbeau",
    // B · 5251d369d3b6
    "abilities.send_a_crow.tags": ["utilitaire"],
    // B · 237496d9b7ff
    "abilities.send_a_crow.description": "Met quatre mots quelque part pour qu’une personne les trouve et qu’ils ne signifient rien pour les autres qui les lisent.",
    // B · c44e6dd70059
    "abilities.send_a_crow.targetRule": "NONE",
    // A · 5e311bc173c5
    "abilities.say_the_whole_thing.name": "Dire Toute la Vérité",
    // B · 09b907576d49
    "abilities.say_the_whole_thing.tags": ["social"],
    // B · d5ceb7ff53a6
    "abilities.say_the_whole_thing.description": "Dis à quelqu’un la partie que tu laissais de côté, au moment où il peut encore agir, et reste dans la pièce pour voir ce qui revient.",
    // B · 39d896e20aec
    "abilities.say_the_whole_thing.targetRule": "SINGLE",
    // B · 4c84c2c842d0
    "abilities.say_the_whole_thing.check.attribute": "volonté",
    // A · 9f0e30baa197
    "abilities.handle_it_yourself.name": "Gère ça toi-même",
    // B · 5251d369d3b6
    "abilities.handle_it_yourself.tags": ["utilitaire"],
    // B · 7a3a2745dd05
    "abilities.handle_it_yourself.description": "Décide à la place de quelqu’un d’autre, fais ce qui doit être fait, et ne le mentionne pas. Rien de tout ça ne peut échouer. C’est ça le problème.",
    // B · c44e6dd70059
    "abilities.handle_it_yourself.targetRule": "NONE",
    // A · ff4118ba3e7c
    "abilities.borrow_a_minute.name": "Prête-moi une minute",
    // B · 09b907576d49
    "abilities.borrow_a_minute.tags": ["social"],
    // B · 7664159c2910
    "abilities.borrow_a_minute.description": "Mets quelque chose dans la tête de quelqu’un qui n’était pas dans la pièce, ou prends une minute de son temps, et laisse-le continuer sa soirée.",
    // B · 39d896e20aec
    "abilities.borrow_a_minute.targetRule": "SINGLE",
    // B · 5dbc8bb102ac
    "abilities.borrow_a_minute.check.attribute": "arcane",
    // A · fde0e367f977
    "abilities.give_them_the_report.name": "Remets-leur le rapport",
    // B · 09b907576d49
    "abilities.give_them_the_report.tags": ["social"],
    // B · c025e895634f
    "abilities.give_them_the_report.description": "Remets au clan ce que le village t’a dit cette semaine. Chaque mot est vrai, et chaque mot vaut une semaine de planification pour les hommes sous le septième mat.",
    // B · 39d896e20aec
    "abilities.give_them_the_report.targetRule": "SINGLE",
    // A · ad1c57caf98f
    "abilities.use_roots_door.name": "Passe par la porte des Racines",
    // B · 5251d369d3b6
    "abilities.use_roots_door.tags": ["utilitaire"],
    // B · 35322a21786e
    "abilities.use_roots_door.description": "Prends le canal qui ne passe pas par le bureau du Hokage, et accepte que l’utiliser soit une chose qu’on se souviendra de toi.",
    // B · c44e6dd70059
    "abilities.use_roots_door.targetRule": "NONE",
    // B · f8a47d672998
    "abilities.use_roots_door.requires.flagsSet": ["danzo_a_établi_le_contact"],
    // B · 3cfcd2fcc91e
    "abilities.use_roots_door.requires.lockedCopy": "Il n’y a pas de porte. Il y a un homme avec qui tu as été dans une pièce deux fois, qui a été très poli avec toi à chaque fois, et qui ne t’a encore rien demandé.",
    // A · bffe0adca3ca
    "abilities.an_hour_at_the_posts.name": "Une heure aux postes",
    // B · 09b907576d49
    "abilities.an_hour_at_the_posts.tags": ["social"],
    // B · 0605a67b1399
    "abilities.an_hour_at_the_posts.description": "Tiens-toi derrière un sept ans et corrige sa prise jusqu’à ce qu’il arrête d’être en colère, ça prend environ quarante minutes et ça marche à chaque fois.",
    // B · 39d896e20aec
    "abilities.an_hour_at_the_posts.targetRule": "SINGLE",
    // A · 7f8d24028a68
    "abilities.follow_the_paper.name": "Suis le document",
    // B · 58f69744c481
    "abilities.follow_the_paper.tags": ["vue"],
    // B · 97a918a32791
    "abilities.follow_the_paper.description": "Lis une requête pour savoir qui l’a signée, un planning pour voir qui manque, et un rapport classé pour voir la phrase que quelqu’un a enlevée avant de le classer.",
    // B · c44e6dd70059
    "abilities.follow_the_paper.targetRule": "NONE",
    // B · a8c1fa8269c3
    "abilities.follow_the_paper.check.attribute": "esprit",
    // A · efe007d0d497
    "abilities.tsukuyomi.name": "Tsukuyomi",
    // B · 05f59299d740
    "abilities.tsukuyomi.tags": ["offensif"],
    // B · f23ab3f6e05d
    "abilities.tsukuyomi.description": "Tiens quelqu’un prisonnier dans une seconde de ton choix aussi longtemps que tu veux. Ça marche sur n’importe qui, ça coûte l’œil qui le fait, et il n’y a pas d’usage qui ne soit pas une décision sur l’esprit de quelqu’un.",
    // B · 39d896e20aec
    "abilities.tsukuyomi.targetRule": "SINGLE",
    // B · 5dbc8bb102ac
    "abilities.tsukuyomi.check.attribute": "arcane",
    // B · 7fe9a550f253
    "abilities.tsukuyomi.requires.flagsSet": ["sait :mangekyo"],
    // B · 14fe55528928
    "abilities.tsukuyomi.requires.lockedCopy": "Ce qui est derrière ça est derrière une nuit que tu n’as pas encore vécue, et tu ne le voudrais pas au prix auquel ça se vend.",
    // A · 9e2516ab4f21
    "locations.uchiha_house.name": "La maison au coin",
    // A · d2187d527809
    "locations.uchiha_house.shortName": "Chez soi",
    // B · cc0d54ccf0d2
    "locations.uchiha_house.description": "Quatre pièces, un poêle qui demande de la patience, et une marche à l’avant qui reçoit les derniers rayons du soleil. Deux paires de sandales près de la porte et une troisième souvent absente. L’éventail du clan est peint au-dessus du linteau, comme dans toutes les maisons de cette rue, et que personne ne trouve ailleurs.",
    // B · 8b822b24900a
    "locations.uchiha_house.stageImage": "story_itachi/stage_uchiha_house",
    // A · bc5bf6fbee47
    "locations.uchiha_street.name": "Le quartier",
    // A · 3a559e5553b5
    "locations.uchiha_street.shortName": "Quartier",
    // B · f9e69d48c06f
    "locations.uchiha_street.description": "Neuf rues de maisons du clan derrière un mur construit pour tenir quelque chose à l’extérieur et qui retient surtout ce groupe à l’intérieur. Un primeur, deux salons de thé, un sanctuaire au bout, et un poste de police tenu par le clan que le village ne visite jamais. Ici, tout le monde sait exactement qui tu es et ce que ton père prépare, et te salue dans la rue à ce sujet.",
    // B · 4b3a2fb13a11
    "locations.uchiha_street.stageImage": "story_itachi/stage_uchiha_street",
    // A · 45b505893d78
    "locations.naka_shrine.name": "Le Sanctuaire Au Bord De La Rivière",
    // A · efe5e8a84350
    "locations.naka_shrine.shortName": "Sanctuaire",
    // B · 21ff38628b8f
    "locations.naka_shrine.description": "Un petit sanctuaire sans personnel avec sept tatamis dans sa pièce arrière. Sous le septième, un escalier, et sous l’escalier une salle de pierre que le clan utilise pour ses affaires depuis avant la création du village. Trente hommes y tiennent. Dernièrement, ils sont une quarantaine.",
    // B · 894a418d12a9
    "locations.naka_shrine.stageImage": "story_itachi/stage_naka_shrine",
    // A · 6708f598f374
    "locations.police_headquarters.name": "Le Bâtiment De La Police",
    // A · 2bbede2d642b
    "locations.police_headquarters.shortName": "Police",
    // B · f171d535692f
    "locations.police_headquarters.description": "Trois étages, un bureau de service, et une institution presque entièrement tenue par une seule famille, ce qui est un honneur ou un enfermement selon qui tu demandes. Le bureau de ton père est au dernier étage et sa fenêtre donne sur celle du Hokage.",
    // B · 26d20007ec52
    "locations.police_headquarters.stageImage": "story_itachi/stage_police_headquarters",
    // A · fef59ce9c9f8
    "locations.training_ground.name": "Les Postes",
    // A · ede386e1d510
    "locations.training_ground.shortName": "Postes",
    // B · cfda6cadb37d
    "locations.training_ground.description": "Trois poteaux en bois dans une clairière avec une rivière derrière, marqués à la hauteur qu’un enfant peut atteindre et à celle d’un adulte. Quelqu’un a fait une encoche à quatre pieds sur le poteau du milieu, et quelqu’un de plus petit s’y mesure.",
    // B · d17280842a95
    "locations.training_ground.stageImage": "story_itachi/stage_training_ground",
    // A · 2056b928676b
    "locations.izumi_home.name": "La Maison De La Quatrième Rue",
    // A · 4ff0f8a8b28e
    "locations.izumi_home.shortName": "Quatrième Rue",
    // B · 65ffb5399876
    "locations.izumi_home.description": "Deux pièces et une cour aussi large qu’une porte, gardée par une femme seule depuis neuf ans et une fille qui commence à rentrer par un chemin plus long. Une photo d’inscription shinobi est posée sur l’étagère, rien d’autre.",
    // B · 7d0ae5d6600e
    "locations.izumi_home.stageImage": "story_itachi/stage_izumi_home",
    // A · 19659d747aa6
    "locations.susuki_teahouse.name": "Le Salon De Thé",
    // A · d2a6c7cacfea
    "locations.susuki_teahouse.shortName": "Salon de thé",
    // B · 17166007f812
    "locations.susuki_teahouse.description": "Six places assises et un comptoir, tenu par une vieille femme qui a nourri trois générations de ce clan et a un avis sur chacune. La place au bout, près de la fenêtre, est celle où tu peux voir qui entre sans que personne te voie décider si tu restes.",
    // B · 82eee03c37e5
    "locations.susuki_teahouse.stageImage": "story_itachi/stage_susuki_teahouse",
    // A · b98c9ccbe329
    "locations.the_rooftops.name": "Les Toits",
    // A · a0a4356b4d65
    "locations.the_rooftops.shortName": "Toits",
    // B · 951718207052
    "locations.the_rooftops.description": "Le chemin le plus rapide à travers ce village et la seule partie où personne n’a d’horaire. Tours d’eau, linge qui sèche, et une suite de faîtières en tuiles du mur du district à la tour marquée du feu. Deux personnes qui ne veulent pas être vues peuvent se rencontrer ici sans que personne ne les voie, sauf eux.",
    // B · 1d2a4333abee
    "locations.the_rooftops.stageImage": "story_itachi/stage_the_rooftops",
    // A · a5a191f913e6
    "locations.the_academy.name": "L’Académie",
    // A · 68ccf2177c88
    "locations.the_academy.shortName": "Académie",
    // B · cf3236fb67f0
    "locations.the_academy.description": "Un bâtiment bas avec une cour, une balançoire, et un mur de photos de diplômés remontant à quarante ans. La tienne est dans la quatrième rangée et les classes autour sont deux têtes plus grandes. La classe de ton frère sort à quatre heures, il est souvent le dernier car il reste à lancer.",
    // B · 6207c398cc5f
    "locations.the_academy.stageImage": "story_itachi/stage_the_academy",
    // A · 6db5e6c224f9
    "locations.anbu_ready_room.name": "La Salle d’attente",
    // A · 572e01920b62
    "locations.anbu_ready_room.shortName": "Salle d’attente",
    // B · 321f2b290e5a
    "locations.anbu_ready_room.description": "Sous la tour : des bancs, un porte-masques, un tableau des missions écrit d’une main qui change toutes les trois semaines, et une règle : personne n’utilise de nom ici. C’est la seule pièce du village où avoir treize ans n’a jamais posé problème.",
    // B · a12f67cb19f1
    "locations.anbu_ready_room.stageImage": "story_itachi/stage_anbu_ready_room",
    // A · 80e9c841ef1e
    "locations.hokage_office.name": "Le Bureau de la Tour",
    // A · e7a4ea79a231
    "locations.hokage_office.shortName": "Tour",
    // B · 1519794bad3c
    "locations.hokage_office.description": "Une pièce ronde au sommet de la tour, trop de papiers, et une fenêtre qui regarde tout le village d’un coup, soit le but du travail, soit son piège. Le vieil homme qui y travaille reporte une décision depuis dix ans et est devenu très bon à ça.",
    // B · d81e28fbf014
    "locations.hokage_office.stageImage": "story_itachi/stage_hokage_office",
    // A · 83a00dad8f18
    "locations.root_chamber.name": "La Chambre sous le village",
    // A · dd851e069aed
    "locations.root_chamber.shortName": "Root",
    // B · 8fe82ff7a92b
    "locations.root_chamber.description": "Pierre, air sec, et une table avec une chaise de l’autre côté. Pas de tableau des missions ici, car rien n’est écrit où deux personnes pourraient lire. Tous ceux dans ce couloir ont un sceau sur la langue et aucun n’a parlé depuis ton arrivée.",
    // B · a48f06042c71
    "locations.root_chamber.stageImage": "story_itachi/stage_root_chamber",
    // A · d8cb9d286247
    "locations.nakano_cliff.name": "La Falaise au-dessus de la Rivière",
    // A · 2a2d292660fb
    "locations.nakano_cliff.shortName": "Falaise",
    // B · 45a0aa2c5c4f
    "locations.nakano_cliff.description": "Là où la rivière tourne et la roche surplombe. Deux enfants du clan venaient ici pour se disputer si le village valait ce qu’il demandait, ils ne sont jamais d’accord et n’ont jamais arrêté de venir.",
    // B · 387ea6a7d68b
    "locations.nakano_cliff.stageImage": "story_itachi/stage_nakano_cliff",
    // A · 1b3557210029
    "locations.village_gate.name": "La Porte Sud",
    // A · 4a479aa23542
    "locations.village_gate.shortName": "Porte",
    // B · 63772806fbc5
    "locations.village_gate.description": "Deux énormes portes en bois, une guérite avec deux chunin qui s’ennuient et sont minutieux dans cet ordre, et la route qui sort. N’importe qui peut partir. Si quelqu’un peut revenir est une autre question que la guérite n’a pas le droit de trancher.",
    // B · 60307478dd18
    "locations.village_gate.stageImage": "story_itachi/stage_village_gate",
    // B · b4829ad69d8c
    "characters.sasuke.name": "Sasuke Uchiha",
    // A · 4ca90d5f422a
    "characters.sasuke.role": "Ton frère, sept ans, la seule personne dans ce village qui ne te demande rien, sauf que tu lui consacres du temps",
    // A · b611684719c9
    "characters.sasuke.cardBlurb": "Il a sept ans, il attend sur le pas de la porte depuis deux heures parce que tu as dit peut-être aujourd’hui, et tout ce qui arrive à cette famille sera expliqué par quelqu’un. C’est toi qui décides si c’est toi.",
    // B · fcca6b746d0b
    "characters.sasuke.pronouns": "il/lui",
    // A · c6a62ea6774a
    "characters.sasuke.publicTraits": ["Se vante des petites victoires","Ne supporte pas les comparaisons","Suit les gens à distance, pensant que ça ne se voit pas"],
    // B · 6aea7d71b291
    "characters.sasuke.hiddenDrives": ["Il veut qu’on le regarde faire quelque chose de bien, une fois, par la seule personne dont l’avis compte","Il a commencé à mesurer combien de temps son frère reste plutôt que s’il vient, sans le dire à personne"],
    // B · 9c744e67b452
    "characters.sasuke.values": ["Qu’on lui donne la vraie réponse, pas celle pour les enfants","Terminer ce qu’il a dit qu’il finirait, même mal, devant un témoin"],
    // B · 2fb52343e60e
    "characters.sasuke.fears": ["Que ce soit la seule façon d’attirer l’attention dans cette maison","Qu’il y ait un problème à la maison et que tout le monde ait décidé qu’il est trop petit pour le savoir"],
    // A · 45aa411feaa2
    "characters.sasuke.socialStyle": "Il te parle comme à un objet, en rafales, en faisant autre chose avec ses mains. Il se tait pile le temps de voir s’il est pris au sérieux.",
    // B · dbbcfaec0afb
    "characters.sasuke.boundaries": ["Il refuse qu’on lui donne une consolation. Le féliciter pour quelque chose qu’il sait raté le fait arrêter de te montrer des choses","Il refuse d’être envoyé au lit pendant une conversation dont il entend les bribes"],
    // B · 6a8492bacdd2
    "characters.sasuke.goals": ["Passer une heure aux postes avec son frère, vraiment, avec des corrections","Comprendre pourquoi les adultes de cette maison arrêtent de parler quand il arrive"],
    // B · aa61face0e53
    "characters.sasuke.secrets.sasuke_follows_you.fact": "Il a suivi son frère trois fois jusqu’aux marches du sanctuaire et est revenu à chaque fois, et il a compris que les réunions ont lieu les soirs où la maison dîne tôt.",
    // B · 47558a04be8d
    "characters.sasuke.secrets.sasuke_follows_you.visibility": "NPC_PRIVATE",
    // B · 77ad4c4b14dd
    "characters.sasuke.secrets.sasuke_follows_you.revealHint": "Il le révèle de lui-même la première fois qu’on lui pose une vraie question sur la famille et pas sur l’école.",
    // B · 2c5de85ea123
    "characters.sasuke.secrets.sasuke_kept_the_shuriken.fact": "Le shuriken ébréché est celui que son frère a lancé avec lui un après-midi l’hiver dernier dont aucun des deux n’a parlé depuis. Il le garde à part des trois autres.",
    // B · 47558a04be8d
    "characters.sasuke.secrets.sasuke_kept_the_shuriken.visibility": "NPC_PRIVATE",
    // B · 2c46bbb8a58b
    "characters.sasuke.secrets.sasuke_kept_the_shuriken.revealHint": "Il expliquera la puce, longuement et sans qu’on lui demande, à quiconque prendra celle-là plutôt qu’une autre.",
    // A · de7ffd9899f5
    "characters.sasuke.speechStyle": "Phrases courtes et plates, une proposition chacune, en regardant ailleurs. Il répète deux fois la phrase importante en marquant une pause. Compte les choses à voix haute comme preuve. Dit nii-san quand il veut quelque chose, et ne dit plus aucun nom quand il est blessé.",
    // A · 64154ddf126d
    "characters.sasuke.topics": ["les postes","ses lancers","l’école","le père","le sanctuaire","quand tu rentres","le shuriken ébréché"],
    // A · 6d20720c3315
    "characters.sasuke.voiceSamples": ["Neuf. D’affilée. Sur le poste du milieu, le plus dur, et t’étais même pas à la fenêtre.","Tu disais peut-être aujourd’hui. Tu disais peut-être.","Il faisait nuit quand il est rentré et puis c’était de nouveau la nuit. Toute la maison se tait quand j’arrive. Tout le monde se tait.","C’est bon. Va. J’ai dit que c’est bon."],
    // B · 951c7513bf52
    "characters.sasuke.appearance": "Sept ans, petit pour son âge, cheveux noirs qui ne veulent pas rester plats à l’arrière, un t-shirt d’académie avec l’éventail du clan sur l’épaule, et une éraflure permanente sur un genou.",
    // B · edb83662610e
    "characters.sasuke.visualHook": "Quatre shuriken d’entraînement alignés dans la terre, rangés selon la qualité du lancer.",
    // B · 9a0ca7dc8448
    "characters.sasuke.silhouette": "Petit, bras croisés, planté, menton levé vers quelqu’un d’un bon pied et demi plus grand.",
    // B · f5d493dd4d45
    "characters.sasuke.artSeed": "itachi-sasuke-01",
    // B · 7b34101d2f72
    "characters.sasuke.portrait": "story_itachi/sasuke",
    // B · 28f31c32a707
    "characters.sasuke.expressions": ["neutre","impatient","boudeur","ravi","effrayé"],
    // B · 68819d1a6e46
    "characters.sasuke.knowledgeScope": ["sasuke","maison_uchiha","académie","terrain_d’entraînement","routine_familiale","rue_uchiha"],
    // B · 667034e1d695
    "characters.sasuke.gates.sasuke_tells_you_what_he_saw.label": "Il te raconte ce qu’il a suivi",
    // B · 55a54e80451a
    "characters.sasuke.gates.sasuke_tells_you_what_he_saw.kind": "CONFIANCE",
    // B · 359b7c170f63
    "characters.sasuke.gates.sasuke_tells_you_what_he_saw.requires.flagsSet": ["parlé :sasuke"],
    // B · 48abd958bc37
    "characters.sasuke.gates.sasuke_can_be_told.label": "On peut lui dire quelque chose de vrai qu’il gardera",
    // B · 55a54e80451a
    "characters.sasuke.gates.sasuke_can_be_told.kind": "CONFIANCE",
    // B · 12b7bc782bb9
    "characters.shisui.name": "Shisui Uchiha",
    // A · 1db7d151ed7b
    "characters.shisui.role": "Ton meilleur ami, de quatre ans ton aîné, et la seule personne vivante qui te parle comme à quelqu’un, pas comme à un outil",
    // A · 73922ebc0034
    "characters.shisui.cardBlurb": "C’est lui qui remarque quand t’as commencé à porter un poids tout seul, qui te le dit, sans insister, et qui ne rit pas après. Il a un plan pour arrêter le coup sans qu’il y ait de morts, et il compte le payer lui-même.",
    // B · fcca6b746d0b
    "characters.shisui.pronouns": "il/lui",
    // A · 92f3d3fbff6d
    "characters.shisui.publicTraits": ["Arrive en avance et fait comme si c’était pas le cas","Transforme un truc sérieux en blague puis finit quand même par être sérieux","Populaire dans un clan qui ne fait pas dans la popularité"],
    // B · 256f89c8e232
    "characters.shisui.hiddenDrives": ["Il veut être celui qui résout ça pour que son ami n’ait pas à le faire, sans avoir examiné pourquoi c’est si important pour lui","Il préfère qu’on se souvienne de lui comme quelqu’un qui a trop voulu faire plutôt que comme quelqu’un qui a regardé sans agir"],
    // B · d07a93af15ff
    "characters.shisui.values": ["La paix qui ne demande à personne d’être un héros","Être franc avec les gens qu’on va déranger"],
    // B · 419f91031ab0
    "characters.shisui.fears": ["Que le seul outil qu’il lui reste soit celui qui enlève le choix à la personne sur qui il l’utilise","Que son ami ait déjà arrêté de tout lui dire et soit chaleureux à ce sujet"],
    // A · acb19a4585c0
    "characters.shisui.socialStyle": "Il parle toujours au « on », même pour des trucs qu’un seul de vous fait. Il s’assoit à côté des gens plutôt qu’en face. Il dit la phrase compliquée rapidement, à voix normale, puis il attend.",
    // B · 809e8d82ba62
    "characters.shisui.boundaries": ["Il ne sera pas remercié pour quelque chose qu’il n’a pas encore fait","Il ne laissera pas un ami décider à sa place, et le dira clairement la première fois, une seule fois"],
    // B · 839f80eadefe
    "characters.shisui.goals": ["Arrêter le coup d’État en laissant quarante foyers vivants et personne en cellule","Obtenir que son ami lui confie la moitié de ce qu’il porte depuis le printemps"],
    // B · e14b87f88ffe
    "characters.shisui.secrets.shisui_the_eye.fact": "Son œil droit détient une technique qui peut changer la décision de quelqu’un sans qu’il sache que sa décision a été modifiée, et elle ne peut être utilisée qu’une fois par décennie.",
    // B · 47558a04be8d
    "characters.shisui.secrets.shisui_the_eye.visibility": "NPC_PRIVÉ",
    // B · 3d5e525a2e4d
    "characters.shisui.secrets.shisui_the_eye.revealHint": "Il te le dit lui-même, sur les toits la nuit, la première fois que tu vas le trouver au lieu d’attendre un corbeau.",
    // B · 0409e82c31e9
    "characters.shisui.secrets.shisui_already_asked.fact": "Il a déjà présenté le plan à Danzo une fois, croyant que passer par la voie officielle d’abord était la chose honorable, et Danzo a écouté très attentivement.",
    // B · 47558a04be8d
    "characters.shisui.secrets.shisui_already_asked.visibility": "NPC_PRIVÉ",
    // B · 5510deb5f6d4
    "characters.shisui.secrets.shisui_already_asked.revealHint": "Il le mentionne en passant, joyeusement, comme preuve qu’il est raisonnable, à quelqu’un qui vient de lui demander qui d’autre est au courant.",
    // A · f30d8cb74b54
    "characters.shisui.speechStyle": "Rapide, chaleureux, au pluriel. Il se coupe en plein milieu pour vérifier que tu suis toujours. Il désamorce la phrase sérieuse avec une petite blague juste après, et la laisse sans rire pour que la phrase reste. Il dit ton prénom en début de phrase quand il est sérieux.",
    // A · 14773c9fd55b
    "characters.shisui.topics": ["le coup","son plan","l’œil","Danzo","ton père","les toits","à quoi sert le village"],
    // A · ce2d2ea0b85d
    "characters.shisui.voiceSamples": ["Itachi. Assieds-toi avant de me raconter ce que t’es venu me dire, parce que t’as la tête.","On a environ onze jours et deux bonnes idées entre nous, et une des idées est à moi, donc en vrai on a qu’une seule.","Je l’ai d’abord amenée au vieux en bandelettes. Comme il faut, par la porte, comme un citoyen. Tu tires une tête. Je vois la tête.","T’as commencé à décider des trucs à propos de moi. Faut pas. Je le remarquerais, et après je devrais faire bonne figure, et je suis nul pour ça."],
    // B · cb275b2942d3
    "characters.shisui.appearance": "Dix-sept ans, cheveux noirs bouclés, posture décontractée, gilet pare-balles standard porté ouvert, et une manière d’être où qu’il aille avant que tu le voies bouger.",
    // B · bdb7bb5c0128
    "characters.shisui.visualHook": "Il est toujours un peu plus haut que la personne à qui il parle, et on dirait qu’il n’a jamais grimpé.",
    // B · 63c3448734aa
    "characters.shisui.silhouette": "Accroupi, coudes sur les genoux, un talon accroché à un rebord.",
    // B · 64577f8e0c42
    "characters.shisui.artSeed": "itachi-shisui-01",
    // B · c4d8201c6f38
    "characters.shisui.portrait": "story_itachi/shisui",
    // B · 3a2346166d57
    "characters.shisui.expressions": ["neutre","souriant","sérieux","fatigué","blessé"],
    // B · fac257d03f79
    "characters.shisui.knowledgeScope": ["shisui","toits","coup_d’État","kotoamatsukami","danzo","anbu","rue_uchiha","falaise_nakano"],
    // B · e1a69991141c
    "characters.shisui.gates.shisui_tells_you_the_plan.label": "Il te dit ce qu’il compte vraiment faire",
    // B · 55a54e80451a
    "characters.shisui.gates.shisui_tells_you_the_plan.kind": "CONFIANCE",
    // B · f0d1728ee6a1
    "characters.shisui.gates.shisui_tells_you_the_plan.requires.flagsSet": ["parlé :shisui"],
    // B · 03020d594a85
    "characters.shisui.gates.shisui_lets_you_carry_half.label": "Il te laissera en porter la moitié",
    // B · 9e8ae18bf8bf
    "characters.shisui.gates.shisui_lets_you_carry_half.kind": "ALLIANCE",
    // B · abac715462b1
    "characters.shisui.gates.shisui_lets_you_carry_half.requires.flagsSet": ["dit_quelque_chose_à_quelqu’un"],
    // B · 8ea3915ffedb
    "characters.shisui.combatant.tags": ["sharingan","éclat_de_corps"],
    // B · fbe453671a04
    "characters.fugaku.name": "Fugaku Uchiha",
    // A · 870d8e505a57
    "characters.fugaku.role": "Ton père, chef du clan, chef de la police que le village refuse de laisser agir, et l’homme qui organise le coup d’État",
    // A · c1762c03a651
    "characters.fugaku.cardBlurb": "Il est fier de toi d’une manière qu’il n’a jamais exprimée à voix haute, il te sert de lien avec un gouvernement qui a cessé de répondre à ses lettres, et il préférerait encore prendre ce village sans tuer personne. Tu es la seule personne qui puisse encore lui faire changer d’avis.",
    // B · fcca6b746d0b
    "characters.fugaku.pronouns": "il/lui",
    // A · 627fc170beb4
    "characters.fugaku.publicTraits": ["Parle en dernier et brièvement","Ne répète jamais un ordre","Considère la louange comme une ressource qui se gâte si on la gaspille"],
    // B · 8a665271d101
    "characters.fugaku.hiddenDrives": ["Il veut que son fils choisisse librement le clan, et il a organisé les choses pour que choisir autre chose ressemble à une trahison, sans voir qu’il a fait ça","Il a peur des hommes qu’il a organisés et n’est pas sûr de pouvoir les arrêter, et il ne l’a dit à personne"],
    // B · 565d4577ab84
    "characters.fugaku.values": ["Un clan à qui on doit quelque chose et qui peut dire quoi","Faire la chose difficile dans le bon ordre, avec les papiers, devant témoins"],
    // B · 3d49c4f73992
    "characters.fugaku.fears": ["Qu’il ait sacrifié son fils aîné pour acheter dix ans de pertinence au clan","Que ses modérés le suivent seulement jusqu’à ce que quelqu’un de plus fort leur propose une date"],
    // A · 69b7bd637f09
    "characters.fugaku.socialStyle": "Il s’adresse à la salle plutôt qu’à une personne. Il donne une tâche plutôt qu’un compliment. Il crée un silence là où un autre homme expliquerait, et laisse l’autre le remplir pour entendre ce que ça donne.",
    // B · 1a019546b05f
    "characters.fugaku.boundaries": ["Ne se laisse pas contredire devant le clan. En privé, il écoute étonnamment longtemps","Ne discute pas des affaires du clan avec quelqu’un qui n’a pas accepté une part de responsabilité"],
    // B · 38dc452e7361
    "characters.fugaku.goals": ["Obtenir un siège pour le clan dans le gouvernement du village, par consentement si le consentement arrive à temps","Savoir, avant d’engager quarante foyers, exactement où en est son fils aîné"],
    // B · af96b6f2dd9e
    "characters.fugaku.secrets.fugaku_cannot_stop_them.fact": "Yashiro et deux autres ont leur propre calendrier et ont cessé de le consulter. Il l’a découvert il y a onze jours et gère ça seul depuis.",
    // B · 47558a04be8d
    "characters.fugaku.secrets.fugaku_cannot_stop_them.visibility": "NPC_PRIVATE",
    // B · 4caee7f43e9d
    "characters.fugaku.secrets.fugaku_cannot_stop_them.revealHint": "Il ne l’admet qu’à quelqu’un qui lui a déjà montré une preuve qu’il n’avait pas, et seulement quand on ne lui demande pas de céder quoi que ce soit.",
    // B · d0dc14dc84ce
    "characters.fugaku.secrets.fugaku_wanted_you_out.fact": "Il a mis son fils dans les opérations noires du village en partie pour que si le clan est détruit, il y ait un Uchiha que le village a une raison de garder.",
    // B · 47558a04be8d
    "characters.fugaku.secrets.fugaku_wanted_you_out.visibility": "NPC_PRIVATE",
    // B · 23151de7f6d5
    "characters.fugaku.secrets.fugaku_wanted_you_out.revealHint": "Ça ressort dans une dispute sur la loyauté, dite comme une accusation contre lui-même plutôt qu’une défense.",
    // A · 99c4c653db2f
    "characters.fugaku.speechStyle": "Déclaratif, posé, sans clause inutile. Parle du clan comme d’un corps unique qui agit et subit. Ne pose jamais une question dont il ne connaît pas déjà la réponse, donc une vraie question de sa part est un événement. Utilise le rang de son fils plutôt que son prénom quand il parle de choses sérieuses.",
    // A · 19be78a13986
    "characters.fugaku.topics": ["le clan","le coup d’État","la police","les anciens du village","tes rapports","ton frère","les réunions"],
    // A · 2533862915c7
    "characters.fugaku.voiceSamples": ["Le clan a été patient pendant dix ans. Une patience qui ne produit rien n’est pas une vertu, c’est une habitude.","Tu seras sous le septième tatami à huit heures. Apporte tout ce que la tour t’a donné cette semaine. Tout.","Ton frère m’a demandé au dîner pourquoi tu n’es jamais là. Je lui ai dit que tu travaillais. C’est la deuxième fois que je mens à un garçon de sept ans pour toi.","Je préférerais prendre ce village sans qu’une seule maison brûle. Je l’ai dit à chaque réunion. Je ne suis plus sûr que le dire suffise à le faire."],
    // B · b68113f1dc49
    "characters.fugaku.appearance": "Début de la quarantaine, visage dur, cheveux jusqu’à la mâchoire, manteau sombre à col haut avec l’éventail dans le dos qu’il porte aussi bien dedans que dehors.",
    // B · 96c97994741c
    "characters.fugaku.visualHook": "L’éventail du clan dans son dos, qu’il garde tourné vers la pièce quand il la quitte.",
    // B · 172e870fbf1a
    "characters.fugaku.silhouette": "Épaules carrées, mains dans le dos, debout quand tout le monde est à genoux.",
    // B · f4d956a716e2
    "characters.fugaku.artSeed": "itachi-fugaku-01",
    // B · 97dd7d6451dd
    "characters.fugaku.portrait": "story_itachi/fugaku",
    // B · afd84506b642
    "characters.fugaku.expressions": ["neutre","sévère","fier","en colère","incertain"],
    // B · 1b525b1ae037
    "characters.fugaku.knowledgeScope": ["fugaku","rue_uchiha","sanctuaire_naka","quartier_général_police","le_coup","radicaux_du_clan","anciens_du_village"],
    // B · a850a79f6e91
    "characters.fugaku.gates.fugaku_treats_you_as_counsel.label": "Il te demande ce que tu penses avant de décider",
    // B · 55a54e80451a
    "characters.fugaku.gates.fugaku_treats_you_as_counsel.kind": "CONFIANCE",
    // B · 17d77c276ca4
    "characters.fugaku.gates.fugaku_treats_you_as_counsel.requires.flagsSet": ["sait :date_du_coup"],
    // B · 177927b34834
    "characters.fugaku.gates.fugaku_will_stand_them_down.label": "Il arrêtera ça si tu lui donnes un moyen",
    // B · 9e8ae18bf8bf
    "characters.fugaku.gates.fugaku_will_stand_them_down.kind": "ALLIANCE",
    // B · 4b406813faf5
    "characters.fugaku.gates.fugaku_will_stand_them_down.requires.flagsSet": ["a_réduit_le_clan"],
    // B · 26b505e4bb79
    "characters.fugaku.combatant.tags": ["sharingan","chef_de_clan"],
    // B · 5e154dc3b580
    "characters.mikoto.name": "Mikoto Uchiha",
    // A · 0a75eff98502
    "characters.mikoto.role": "Ta mère, shinobi à la retraite qu’aucune personne ici ne considère comme telle, et la mieux placée pour jouer les médiatrices si quelqu’un pense à lui demander",
    // A · 961912c14875
    "characters.mikoto.cardBlurb": "Elle était kunoichi de première ligne avant d’être la mère de quelqu’un, elle a deviné la plupart des plans de ton père sans qu’on les lui explique, et elle attend de voir si l’un de ses fils pense qu’elle mérite d’être incluse.",
    // B · aee35f364a88
    "characters.mikoto.pronouns": "elle/la",
    // A · 4fab4b59afba
    "characters.mikoto.publicTraits": ["Elle nourrit les gens plutôt que de leur poser des questions","Présente à toutes les réunions du clan, jamais citée","Calme d’une manière qui fait ralentir les autres"],
    // B · 916cc290794b
    "characters.mikoto.hiddenDrives": ["Elle veut être consultée une fois, nommément, sur ce qui décidera si ses enfants sont vivants le mois prochain","Elle garde un sac prêt pour deux enfants et ne s’est pas avouée dans quelle direction c’est"],
    // B · 4fe67265e6b4
    "characters.mikoto.values": ["Une famille qui mange dans la même pièce même quand elle n’a rien à se dire","Savoir la vérité assez tôt pour en être utile plutôt que juste triste"],
    // B · e527ad0a1b6e
    "characters.mikoto.fears": ["Que son fils aîné ait déjà décidé quelque chose et soit gentil avec elle à ce sujet","Qu’elle apprenne ce qui s’est passé par quelqu’un d’autre, après, dans la rue"],
    // A · 4fdc3c647a6c
    "characters.mikoto.socialStyle": "Elle pose la petite question et attend la réponse entière. Elle fait ce geste avec les mains qui laisse l’autre regarder ailleurs en parlant. Elle ne hausse jamais la voix et on l’écoute quand même.",
    // B · 8527ab770b80
    "characters.mikoto.boundaries": ["Ne se laisse pas rassurer. Dis-lui que ça va quand ça ne va pas et elle arrête de demander, ce qui est bien pire","Ne choisit pas ouvertement entre son mari et son fils, et ne fait pas semblant que ce choix ne lui est pas imposé"],
    // B · 5c8a197b9486
    "characters.mikoto.goals": ["Obtenir un vrai repas honnête de son fils aîné avant que ça n’arrive","Savoir si Fugaku croit encore qu’il peut arrêter les hommes qu’il a organisés"],
    // B · cfbea7a309c3
    "characters.mikoto.secrets.mikoto_knows_the_date.fact": "Elle sait qu’il y a une date, parce qu’elle est mariée à Fugaku depuis dix-huit ans et qu’il vérifie le même tiroir deux fois les nuits où ça se rapproche.",
    // B · 47558a04be8d
    "characters.mikoto.secrets.mikoto_knows_the_date.visibility": "NPC_PRIVATE",
    // B · 38358d0ae984
    "characters.mikoto.secrets.mikoto_knows_the_date.revealHint": "Elle le dit calmement, autour d’un repas, à quiconque lui demande ce qu’elle pense plutôt que de lui raconter ce qui se passe.",
    // B · aa1133bf8602
    "characters.mikoto.secrets.mikoto_was_front_line.fact": "Elle a servi pendant la dernière guerre et a plus de tués sur le terrain que quiconque aux réunions du clan, plusieurs d’entre eux parlant par-dessus elle à propos des tactiques.",
    // B · d982523e87d8
    "characters.mikoto.secrets.mikoto_was_front_line.visibility": "FACTION",
    // B · d16ccc94fb71
    "characters.mikoto.secrets.mikoto_was_front_line.revealHint": "Ça sort de côté si quelqu’un lui demande son avis sur un vrai plan plutôt que sur sa famille.",
    // A · 4bdc1da8abc2
    "characters.mikoto.speechStyle": "Des phrases courtes, du quotidien, qui cachent la vraie question, avec de longues pauses où l’autre peut répondre. Elle nomme précisément l’objet — la boîte, la porte, le deuxième bol — plutôt que le sentiment. Elle ne pose presque jamais deux fois la même question.",
    // A · 37ad2d6d8ba0
    "characters.mikoto.topics": ["le dîner","ton frère","ton père","les réunions du clan","la guerre à laquelle elle a participé","si tu dors bien"],
    // A · 28cc45303935
    "characters.mikoto.voiceSamples": ["Il y a une boîte sur l’étagère. Elle y est depuis cinq heures et demie, ça veut dire que tu es sorti avant.","Ton père vérifie ce tiroir deux fois les mauvaises nuits. Il le fait depuis dimanche, deux fois par nuit.","Assieds-toi. Pas parce que je veux te parler, mais parce que tu te tiens encore dans l’embrasure de la porte, et ça fait un mois que tu fais ça.","J’ai été au front six ans. Demande-moi le plan, ou pas, mais ne me demande pas si je m’inquiète pour mes enfants."],
    // B · 8288e147c585
    "characters.mikoto.appearance": "Fin de la trentaine, longs cheveux noirs lâchés à la maison et attachés aux réunions, une robe de maison sombre, et les mains très sûres de quelqu’un qui a déjà fait ça pour vivre.",
    // B · 43dc5c4d8707
    "characters.mikoto.visualHook": "Elle sèche le même bol pendant toute une conversation et le pose dès que la conversation devient sérieuse.",
    // B · f5273cab1acf
    "characters.mikoto.silhouette": "À genoux à une table basse, dos droit, une manche tenue par l’autre main.",
    // B · efa466f45ca2
    "characters.mikoto.artSeed": "itachi-mikoto-01",
    // B · 6b9798cfeadc
    "characters.mikoto.portrait": "story_itachi/mikoto",
    // B · 78c59eef8cbe
    "characters.mikoto.expressions": ["neutre","douce","inquiète","calme","attristée"],
    // B · d852f42f8372
    "characters.mikoto.knowledgeScope": ["mikoto","maison_uchiha","rue_uchiha","fugaku","sasuke","familles_clan","la_dernière_guerre"],
    // B · 569dc7ff6136
    "characters.mikoto.gates.mikoto_included.label": "On lui demande son avis sur le plan",
    // B · 55a54e80451a
    "characters.mikoto.gates.mikoto_included.kind": "CONFIANCE",
    // B · 17d77c276ca4
    "characters.mikoto.gates.mikoto_included.requires.flagsSet": ["sait :la_date_du_coup"],
    // B · 6cd55cfa634a
    "characters.mikoto.gates.mikoto_mediates.label": "Elle ira se tenir entre son mari et le village",
    // B · 9e8ae18bf8bf
    "characters.mikoto.gates.mikoto_mediates.kind": "ALLIANCE",
    // B · abac715462b1
    "characters.mikoto.gates.mikoto_mediates.requires.flagsSet": ["a_dit_quelque_chose_à_quelqu’un"],
    // B · 67dce36fa083
    "characters.izumi.name": "Izumi Uchiha",
    // A · d6cc3ad8e3d4
    "characters.izumi.role": "Une fille du clan de ton âge qui, sans qu’on la pousse, a décidé que vous étiez amies.",
    // A · e8b79af49642
    "characters.izumi.cardBlurb": "Elle a treize ans, c’est la seule à te parler d’autre chose que de la crise, et elle a commencé à remarquer les mêmes choses dans le quartier que toi. Elle voudrait qu’on la considère comme quelqu’un qui peut aider.",
    // B · aee35f364a88
    "characters.izumi.pronouns": "elle",
    // A · b3f26da55575
    "characters.izumi.publicTraits": ["Elle se parle à voix haute pour se convaincre","Elle débarque là où tu es et fait comme si c’était un hasard","Elle prend très au sérieux son entraînement"],
    // B · 74f2b6b0d5ff
    "characters.izumi.hiddenDrives": ["Elle veut être considérée comme une shinobi par la seule personne du clan dont elle croirait l’évaluation","Elle essaie de comprendre si avoir peur pour son clan est une forme de trahison, et n’a personne en qui avoir confiance pour en parler"],
    // B · 056e4b2e3c10
    "characters.izumi.values": ["Être utile dans l’urgence réelle plutôt qu’en être protégée","Sa mère, qui est seule depuis la nuit où le renard est venu et n’en parle pas"],
    // B · 47e90e0ffdf9
    "characters.izumi.fears": ["Qu’elle soit le genre de personne à qui on est poli mais qu’on n’appelle jamais","Que ce qui arrive arrive à sa famille pendant qu’elle est au service à la maison de thé à être agréable"],
    // A · c38cd5a6543e
    "characters.izumi.socialStyle": "Elle explique tout trop longuement, va droit au but, puis s’arrête net en regardant la table. Elle se reprend en te posant une question pratique. Courageuse physiquement, pas du tout en parlant.",
    // B · 35a7ec364157
    "characters.izumi.boundaries": ["Ne supporte pas qu’on parle doucement de son propre clan. Si on adoucit une vraie réponse, elle reposera la même question sans adoucissement","Ne se laisse pas utiliser comme messagère sans savoir ce que le message contient"],
    // B · 759d846a8501
    "characters.izumi.goals": ["Être mise sur quelque chose de réel plutôt que la rotation de district","Découvrir ce que les réunions concernent vraiment, auprès de quelqu’un qui ne lui mentira pas"],
    // B · b060bb96e46a
    "characters.izumi.secrets.izumi_awakened.fact": "Son Sharingan est apparu la nuit du renard, à quatre heures, en regardant son père ne pas revenir, et elle ne l’a jamais utilisé devant un autre Uchiha.",
    // B · 47558a04be8d
    "characters.izumi.secrets.izumi_awakened.visibility": "NPC_PRIVÉ",
    // B · cfc4faec87d6
    "characters.izumi.secrets.izumi_awakened.revealHint": "Elle le dit simplement, sans drame, à quiconque lui pose une question directe sur cette nuit au lieu de l’éviter.",
    // B · 0dff263f5c14
    "characters.izumi.secrets.izumi_counted_the_houses.fact": "Elle a compté quelles maisons du quartier ont arrêté de mettre du linge à sécher et lesquelles ont discrètement envoyé les enfants chez des proches. Onze et six.",
    // B · 47558a04be8d
    "characters.izumi.secrets.izumi_counted_the_houses.visibility": "NPC_PRIVÉ",
    // B · 8667611b3bed
    "characters.izumi.secrets.izumi_counted_the_houses.revealHint": "Elle l’offre, nerveusement, la première fois que quelqu’un la considère comme une observatrice plutôt que comme une compagnie.",
    // A · 8a2babb172df
    "characters.izumi.speechStyle": "Elle commence trois phrases avant de dire ce qu’elle voulait, puis les balance à plat et vite, avant de s’arrêter. Elle conclut ses reculs par « de toute façon ». Elle parle de son entraînement en chiffres précis, c’est la seule chose dans laquelle elle a confiance.",
    // A · 8a83021f8731
    "characters.izumi.topics": ["son entraînement","le quartier","sa mère","la nuit du renard","le salon de thé","les maisons qui se sont tues"],
    // A · 1c890705f2c1
    "characters.izumi.voiceSamples": ["J’en ai commandé quatre, j’en ai mangé un en venant, il en reste trois, c’est le nombre normal de dango pour une personne. De toute façon.","Onze maisons ont arrêté d’étendre leur linge. Six ont envoyé leurs gosses chez des proches ces neuf derniers jours. Je suis retournée vérifier, au cas où j’aurais rêvé.","Tu peux arrêter de vérifier si je tiens vraiment. Je t’ai demandé. Dis juste oui.","J’avais quatre ans. Mon père a été envoyé au mur Ouest. Mes yeux ont coulé quand je gardais la porte, et personne ne m’en a jamais parlé, même pas ma mère, en neuf ans. C’est la première fois que j’en parle."],
    // B · a1ade9455a4b
    "characters.izumi.appearance": "Treize ans, cheveux bruns en petite queue avec une mèche qui ne tient pas, une veste d’entraînement sans marque, et un bandage sur un avant-bras vieux d’une semaine et sans raison.",
    // B · 67dbdd78b229
    "characters.izumi.visualHook": "Un sachet en papier plié de bonbons qu’elle pose sur le comptoir et n’ouvre pas avant que quelqu’un d’autre ne le fasse.",
    // B · 583a5070e3d4
    "characters.izumi.silhouette": "Perchée sur un tabouret, les deux pieds accrochés à la barre, penchée en avant.",
    // B · 0c420930be80
    "characters.izumi.artSeed": "itachi-izumi-01",
    // B · f3e5a4cf1c5e
    "characters.izumi.portrait": "story_itachi/izumi",
    // B · 3c7501a8711b
    "characters.izumi.expressions": ["neutre","gênée","sérieuse","triste","déterminée"],
    // B · 97e4c3db1cbf
    "characters.izumi.knowledgeScope": ["izumi","maison_izumi","rue_uchiha","maison_de_thé_susuki","terrain_d’entraînement","familles_clan","la_nuit_du_renard"],
    // B · f2b7cb3a30c4
    "characters.izumi.gates.izumi_told_something_real.label": "On la considère comme quelqu’un à qui on peut dire",
    // B · 55a54e80451a
    "characters.izumi.gates.izumi_told_something_real.kind": "CONFIANCE",
    // B · 8dc518d28408
    "characters.izumi.gates.izumi_told_something_real.requires.flagsSet": ["a_parlé :izumi"],
    // B · 73e55413c328
    "characters.izumi.gates.izumi_closer.label": "Quoi que ce soit, ça devient quelque chose qu’ils nommeraient tous les deux",
    // B · 0b75bc536447
    "characters.izumi.gates.izumi_closer.kind": "ROMANCE",
    // B · 5edc0dee6872
    "characters.izumi.combatant.tags": ["sharingan","genin"],
    // B · d2357f147ad1
    "characters.danzo.name": "Danzo Shimura",
    // A · b57798c0299c
    "characters.danzo.role": "L’homme qui dirige la partie du village qu’on ne voit pas sur la carte et qui te traite avec une politesse extrême depuis deux ans",
    // A · ff3cadaf1273
    "characters.danzo.cardBlurb": "Il ne t’a encore rien demandé, il a eu raison sur au moins deux risques que tout le monde a ignorés, et il est la seule personne du village à te parler comme si tu étais déjà l’adulte que tout le monde fait semblant de voir.",
    // B · fcca6b746d0b
    "characters.danzo.pronouns": "il/lui",
    // A · 757f263607d6
    "characters.danzo.publicTraits": ["Ne loue que la maturité","Présente au conseil sans vraiment y parler","Présente les problèmes moraux comme une discussion"],
    // B · 13d48c8845fc
    "characters.danzo.hiddenDrives": ["Il veut un Uchiha qui ait choisi le village plutôt que le clan, publiquement et de façon irréversible, et il fabriquera la circonstance si ça n’arrive pas","Il croit être le seul à vouloir être le méchant d’une histoire qui finit avec tout le monde vivant, et cette croyance est la chose la plus confortable qu’il possède"],
    // B · 509e7a5757ed
    "characters.danzo.values": ["Un village qui survive à la décennie","Une décision prise par quelqu’un, plutôt que reportée par un comité pendant dix ans de plus"],
    // B · 210f44f179e9
    "characters.danzo.fears": ["Qu’on lui donne raison trop tard pour qu’on le crédite","Que le garçon qu’il forme ait une version de son propre raisonnement qui ne lui ait pas besoin"],
    // A · b66e11e8c1ed
    "characters.danzo.socialStyle": "Il laisse l’autre parler le premier et plus longtemps. Présente chaque option comme une conséquence déjà lancée. Ne demande jamais rien directement, pour que l’accord semble toujours venir de l’autre.",
    // B · 2d4ed0f147a4
    "characters.danzo.boundaries": ["Ne confesse jamais rien, pas même à quelqu’un qui a la preuve","Ne négocie pas avec quelqu’un qui n’a rien. Il négocie tout de suite avec quelqu’un qui a quelque chose"],
    // B · 2c78c8da5f15
    "characters.danzo.goals": ["Mettre fin à la question du clan ce mois-ci, par n’importe quel moyen disponible","Que le prodige Uchiha lui doive une chose irréversible"],
    // B · 90646a19af7c
    "characters.danzo.secrets.danzo_the_rota.fact": "Root fait une rotation de surveillance sur le district depuis dix mois, validée par une chaîne de commandement qui n’existe pas sur le papier, et le registre est dans la salle sous le village.",
    // B · 47558a04be8d
    "characters.danzo.secrets.danzo_the_rota.visibility": "NPC_PRIVATE",
    // B · 1e6c00ed0f73
    "characters.danzo.secrets.danzo_the_rota.revealHint": "Il ne le dit jamais. Quelqu’un le lit, dans ses propres archives, dans son propre bâtiment.",
    // B · 05a915825122
    "characters.danzo.secrets.danzo_wants_the_eye.fact": "Il sait ce que fait l’œil droit de Shisui et a décidé qu’une technique qui peut contrôler une personne une fois par décennie est trop utile pour rester dans la tête de quelqu’un avec des scrupules.",
    // B · 47558a04be8d
    "characters.danzo.secrets.danzo_wants_the_eye.visibility": "NPC_PRIVATE",
    // B · b0fec9c5faab
    "characters.danzo.secrets.danzo_wants_the_eye.revealHint": "Il le trahit par ce qu’il sait déjà dans une conversation dont personne ne l’a informé.",
    // A · 03f0b5d96f90
    "characters.danzo.speechStyle": "Conditionnel et conséquences. Ne dit jamais ce qu’il veut, seulement ce qui sera vrai. Ne pose jamais de question. Ses phrases s’arrêtent dès qu’elles ont fait leur boulot, souvent une proposition plus tôt que prévu.",
    // A · 852f4bcde0ff
    "characters.danzo.topics": ["le clan","le coup d’État","la survie du village","ton père","ton frère","ce qui est nécessaire","Root"],
    // A · 31c771195cfe
    "characters.danzo.voiceSamples": ["Si le clan bouge, trois pays seront derrière ces murs en une semaine. Ce n’est pas une menace. C’est une distance et une vitesse de marche.","On te dira que c’est un choix entre le village et ta famille. Ça ne l’est plus depuis plusieurs mois.","Ton frère a sept ans. Sept ans surmonte la plupart des choses. Je te donne la gamme des issues, chose que personne d’autre dans ce village n’a eu la courtoisie de faire.","Je lis tes rapports depuis que tu as onze ans. Tu arrives à la bonne conclusion plus vite que les hommes qui te donnent les missions. Ils trouvent ça impressionnant. Moi, utile."],
    // B · 5c6837e99595
    "characters.danzo.appearance": "Âgé, bandé à l’œil droit et au bras droit, une robe sombre simple, un bâton sur lequel il ne s’appuie pas, et l’immobilité de quelqu’un qui a décidé de ne rien dépenser en gestes.",
    // B · 7d50712827b0
    "characters.danzo.visualHook": "Le côté droit bandé, et le bras en écharpe qu’il n’a pas utilisé depuis des années.",
    // B · 9fe5224dce53
    "characters.danzo.silhouette": "Assis, droit, une main à plat sur une table nue, totalement immobile.",
    // B · 8db89af6de28
    "characters.danzo.artSeed": "itachi-danzo-01",
    // B · 903b99e5e53d
    "characters.danzo.portrait": "story_itachi/danzo",
    // B · 894936eeb86c
    "characters.danzo.expressions": ["neutre","approbateur","froid","patient","mécontent"],
    // B · 214567c3fd72
    "characters.danzo.knowledgeScope": ["danzo","root","root_chamber","le_coup","anciens_du_village","anbu","surveillance"],
    // B · 5410c5e473e2
    "characters.danzo.gates.danzo_makes_the_offer.label": "Il met la proposition sur la table",
    // B · 77dcad9b37cc
    "characters.danzo.gates.danzo_makes_the_offer.kind": "AUTRE",
    // B · f8a47d672998
    "characters.danzo.gates.danzo_makes_the_offer.requires.flagsSet": ["danzo_a_établi_le_contact"],
    // B · 806b75265e9a
    "characters.danzo.gates.danzo_negotiates.label": "Il te traite comme quelqu’un qui a quelque chose",
    // B · 77dcad9b37cc
    "characters.danzo.gates.danzo_negotiates.kind": "AUTRE",
    // B · 150256290244
    "characters.danzo.gates.danzo_negotiates.requires.hasItems": ["registre_root"],
    // B · d744a4a361ef
    "characters.danzo.scouting.revealCopy": "Il attend que tu aies fini, puis répond à l’objection que tu n’as pas encore formulée. Il lit tes rapports depuis deux ans et ce n’est pas pour le renseignement.",
    // B · 2b1534837f87
    "characters.danzo.combatant.tags": ["root","bras_sharingan"],
    // B · 76b5da3b2714
    "characters.hiruzen.name": "Hiruzen Sarutobi",
    // A · 9fb80db83327
    "characters.hiruzen.role": "Le Troisième Hokage, qui veut une solution, la cherche depuis dix ans, et se fait chaque année dépasser par un homme qu’il refuse de démettre",
    // A · 2c5ff907c494
    "characters.hiruzen.cardBlurb": "Il t’apprécie, il est sincère quand il parle de négociation, et il a passé une décennie à agir trop lentement. Il pourrait changer d’avis — mais seulement devant quelque chose qu’il pourrait poser sur un bureau devant tout le monde, et tu fais partie des rares capables de le faire.",
    // B · fcca6b746d0b
    "characters.hiruzen.pronouns": "il/lui",
    // A · 8d6237e714ce
    "characters.hiruzen.publicTraits": ["Connait le prénom des enfants de tout le monde","Repousse une décision en en faisant une conversation sans fin","S’excuse d’avance pour ce qu’il ne pourra pas faire"],
    // B · ce0ac0da5b5e
    "characters.hiruzen.hiddenDrives": ["Il veut que quelqu’un d’autre force sa main pour que le retrait de son vieil ami ne soit pas un choix","Il soupçonne avoir déjà laissé passer le moment et gère ce soupçon en restant occupé"],
    // B · 13cca376d6b7
    "characters.hiruzen.values": ["Un village où les débats se font dans une pièce plutôt que dans la rue","Les vieilles loyautés, qu’il garde même quand elles deviennent un fardeau pour les autres"],
    // B · aea389eff415
    "characters.hiruzen.fears": ["Que sa tolérance envers un homme ait été la cause principale","Qu’il demande à un garçon de treize ans de faire une partie de son travail qu’il ne peut affronter"],
    // A · 2b73bf0a10e3
    "characters.hiruzen.socialStyle": "Des phrases longues, bienveillantes et digressives qui finissent toujours par frôler le sujet sans jamais l’aborder vraiment. Propose du thé. Demande des nouvelles de ta mère. Dit tout ça sincèrement et s’en sert, sans vraiment l’avouer, pour ralentir l’ambiance.",
    // B · a4788e8836d0
    "characters.hiruzen.boundaries": ["N’agira pas contre un collègue sur une accusation. Agira, immédiatement et fermement, sur un document","N’autorisera rien contre le clan qu’il ne pourrait défendre devant le clan"],
    // B · a70909f5d917
    "characters.hiruzen.goals": ["Faire venir Fugaku dans une pièce avec les anciens avant que l’un ou l’autre ne perde patience","Éviter d’être le Hokage sous lequel un clan fondateur a été détruit"],
    // B · 1e36d8aacace
    "characters.hiruzen.secrets.hiruzen_knows_about_root.fact": "Il sait que Root n’a jamais été dissous, le sait depuis quatre ans, et se dit chaque année que le révéler fracturerait le village au pire moment.",
    // B · 47558a04be8d
    "characters.hiruzen.secrets.hiruzen_knows_about_root.visibility": "NPC_PRIVATE",
    // B · b87724727604
    "characters.hiruzen.secrets.hiruzen_knows_about_root.revealHint": "Il l’admet, avec lassitude et complètement, dès qu’on lui présente une rotation signée — pas avant, et pas à quelqu’un qui ne fait que soupçonner.",
    // B · 1a71b22088a4
    "characters.hiruzen.secrets.hiruzen_already_drafted_it.fact": "Un projet d’accord est dans son bureau, donnant au clan deux sièges au conseil et le district en retour. Il est là depuis quatorze mois et n’a jamais été présenté.",
    // B · 47558a04be8d
    "characters.hiruzen.secrets.hiruzen_already_drafted_it.visibility": "NPC_PRIVATE",
    // B · 4f897cb0f83d
    "characters.hiruzen.secrets.hiruzen_already_drafted_it.revealHint": "Il le sort lui-même, gêné, quand on lui dit que le coup a une date.",
    // A · 15a02a0872f1
    "characters.hiruzen.speechStyle": "Chaleureux, prudent et long. Peut-être que, avec le temps, quand les choses se calmeront. Tourne autour du pot deux fois et s’arrête à côté. Dit ton prénom en fin de phrase plutôt qu’au début, ce qui fait que chaque phrase ressemble plus à une demande qu’à un ordre.",
    // A · 07538bd7cbb7
    "characters.hiruzen.topics": ["le clan","les anciens","ton père","l’accord","Danzo","la dernière guerre","ta mère"],
    // A · e2d936c699c6
    "characters.hiruzen.voiceSamples": ["Assieds-toi, assieds-toi. Il y a du thé, et il y a l’autre chose, et je préférerais qu’on commence par ça si tu peux tenir le coup.","Peut-être que dans un mois ou deux, on sera passés à autre chose, et alors une conversation comme ça deviendra possible, ce qui aujourd’hui est impossible, Itachi.","Je le connais depuis qu’on était tous les deux plus jeunes que ton père. Ce n’est pas une excuse pour lui, c’est une explication de pourquoi je n’ai rien fait, ce qui est autre chose, je te l’accorde.","Tu as treize ans et tu viens de me dire quelque chose que quatre hommes d’âge mûr dans ce bâtiment auraient dû me dire avant toi. Je veux que tu saches que je le sais."],
    // B · fa1c2e7b4a4e
    "characters.hiruzen.appearance": "Fin de soixantaine, robes blanches et chapeau posé sur un présentoir plutôt que sur la tête, barbe courte, pipe qu’il tient le plus souvent, et une pile de papiers organisée en trois tas sans aucun progrès.",
    // B · 94b147a8cee7
    "characters.hiruzen.visualHook": "Le large chapeau posé sur son présentoir à côté de lui plutôt que sur sa tête, toute la journée, tous les jours.",
    // B · d53dcff60a5f
    "characters.hiruzen.silhouette": "Assis bas derrière un bureau, encadré par une fenêtre ronde où l’on voit tout un village.",
    // B · e43a80fe3b37
    "characters.hiruzen.artSeed": "itachi-hiruzen-01",
    // B · 0c894bc8c2fd
    "characters.hiruzen.portrait": "story_itachi/hiruzen",
    // B · 3e65a367fa26
    "characters.hiruzen.expressions": ["neutre","bienveillant","préoccupé","fatigué","décisif"],
    // B · 344e946ea016
    "characters.hiruzen.knowledgeScope": ["hiruzen","bureau_hokage","anciens_du_village","le_coup","danzo","anbu","la_derniere_guerre"],
    // B · 4a4abd215625
    "characters.hiruzen.gates.hiruzen_will_table_it.label": "Il présente le règlement aux anciens",
    // B · 9e8ae18bf8bf
    "characters.hiruzen.gates.hiruzen_will_table_it.kind": "ALLIANCE",
    // B · 17d77c276ca4
    "characters.hiruzen.gates.hiruzen_will_table_it.requires.flagsSet": ["sait :la_date_du_coup"],
    // B · a554090859e8
    "characters.hiruzen.gates.hiruzen_will_move_on_root.label": "Il agira contre son plus vieux collègue",
    // B · 9e8ae18bf8bf
    "characters.hiruzen.gates.hiruzen_will_move_on_root.kind": "ALLIANCE",
    // B · 150256290244
    "characters.hiruzen.gates.hiruzen_will_move_on_root.requires.hasItems": ["registre_racine"],
    // B · 0eb859d2de35
    "characters.hiruzen.combatant.tags": ["hokage","tous_les_elements"],
    // B · 7f6ea538af7d
    "characters.kakashi.name": "Kakashi Hatake",
    // A · 715809640002
    "characters.kakashi.role": "Un autre prodige à qui on a confié une guerre à onze ans, quatre ans devant toi sur la même route, et la seule personne dans la salle de briefing qui ne t’ait jamais rien demandé.",
    // A · 8e53138332fa
    "characters.kakashi.cardBlurb": "Il porte ce masque depuis l’âge que tu as, il sait exactement ce qu’on te fait parce qu’on lui a fait pareil, et il n’en parlera pas à moins que ce soit toi qui commences. C’est aussi le chemin le plus rapide vers un couloir qui n’existe sur aucun plan.",
    // B · fcca6b746d0b
    "characters.kakashi.pronouns": "il/lui",
    // A · 75d701d08d87
    "characters.kakashi.publicTraits": ["Toujours en retard, sauf pour une opération","Lit dans la salle de briefing sans tourner la page","N’utilise jamais de prénom dans le bâtiment, y compris le sien"],
    // B · 9159eea59c0f
    "characters.kakashi.hiddenDrives": ["Il attend de voir si celui-ci s’en sort, parce que les trois derniers ne l’ont pas fait, et il ne peut plus rester neutre.","Il aimerait qu’on lui demande quelque chose, par quelqu’un, pour une raison qui ne soit pas opérationnelle."],
    // B · e59a64b704c5
    "characters.kakashi.values": ["Faire correctement son travail et rentrer chez lui","Ne pas mentir à quelqu’un de plus jeune sur le prix du travail"],
    // B · c7ef696ccd94
    "characters.kakashi.fears": ["Que le village traite celui-ci comme il l’a fait avec lui, puis le regrette après","Que la bonne chose à faire soit quelque chose qu’il a déjà décidé de ne pas faire"],
    // A · 73d05f573127
    "characters.kakashi.socialStyle": "Répond à une question par une question plus petite. Arrive toujours un peu en retard, exprès, pour que l’autre s’engage d’abord. Dit un truc hors sujet sur la météo ou un livre pendant que tu décides si tu peux lui faire confiance.",
    // B · 8aedcc42d3ae
    "characters.kakashi.boundaries": ["Ne se fera pas recruter dans la politique de quelqu’un d’autre sans qu’on lui dise tout d’abord","Ne discutera pas du clan dans le bâtiment, mais discutera de tout sur un toit"],
    // B · 5a70ceef146b
    "characters.kakashi.goals": ["Passer ce service sans qu’un autre gamin de treize ans finisse comme le dernier","Découvrir ce qui se passe vraiment dans ce district avant que quelqu’un ne s’en mêle à la dernière minute"],
    // B · f319d3fe1eaa
    "characters.kakashi.secrets.kakashi_knows_the_corridor.fact": "Il sait où mène le couloir non marqué à côté de la salle de préparation, il le sait depuis deux ans, et il ne l’a jamais noté ni dit à quelqu’un qui aurait pu le noter.",
    // B · 47558a04be8d
    "characters.kakashi.secrets.kakashi_knows_the_corridor.visibility": "NPC_PRIVATE",
    // B · 5c78029855a6
    "characters.kakashi.secrets.kakashi_knows_the_corridor.revealHint": "Il te fera y aller avec lui plutôt que de te le dire, et seulement après que tu lui auras dit quelque chose de vrai sur ta propre famille.",
    // B · b5d7af1f8c65
    "characters.kakashi.secrets.kakashi_was_asked_first.fact": "La Racine l’a approché à quinze ans avec une conversation très similaire à celle qu’on a avec toi, il a dit non, et ça lui a coûté quatre ans de missions.",
    // B · 47558a04be8d
    "characters.kakashi.secrets.kakashi_was_asked_first.visibility": "NPC_PRIVATE",
    // B · b837f451d289
    "characters.kakashi.secrets.kakashi_was_asked_first.revealHint": "Ça sortira sur un toit, de côté, comme le conseil le plus plat possible.",
    // A · e57a13249926
    "characters.kakashi.speechStyle": "Laconique au point d’être brusque, puis une phrase d’une précision inattendue. Esquive avec des détails triviaux — la météo, ce qu’il lit, si tu as mangé. Emploie « bon » et « hm » comme réponses complètes. Ne répète jamais rien.",
    // A · 224cf3c5987c
    "characters.kakashi.topics": ["la salle de briefing","le tableau de missions","Root","le couloir","avoir onze ans","le livre qu’il ne lit pas"],
    // A · 2a54edb4147b
    "characters.kakashi.voiceSamples": ["Hm. C’est pas ma rotation.","T’as vraiment plein de questions pour quelqu’un qui est pas sur ce tour.","Va pleuvoir. Tu ferais bien de rentrer avant que ça commence. Pas une métaphore, ça va vraiment tomber.","On m’a demandé une fois, quand j’avais quinze ans. J’ai dit non. Quatre ans de patrouille, et je referais pareil, c’est tout le conseil que j’ai.","Personne dans cette pièce va te dire que t’es trop jeune. Ce n’est pas parce que ce n’est pas vrai."],
    // B · 45f6308c4420
    "characters.kakashi.appearance": "Dix-sept ans, masque sur le bas du visage et bandeau couvrant l’œil gauche, tenue standard ANBU grise avec un masque de chien accroché à la ceinture, et cheveux gris qui se dressent quoi qu’il arrive.",
    // B · 797a501afb4c
    "characters.kakashi.visualHook": "Un masque de chien accroché à la hanche plutôt que sur le visage, porté par un homme qui ne le met jamais.",
    // B · c0b0a8d76e8a
    "characters.kakashi.silhouette": "Appuyé contre un mur à un angle pour lequel aucun mur n’a été construit, une main dans une poche, un livre à hauteur de poitrine.",
    // B · 900169831afb
    "characters.kakashi.artSeed": "itachi-kakashi-01",
    // B · a4c24799c594
    "characters.kakashi.portrait": "story_itachi/kakashi",
    // B · e09699df108e
    "characters.kakashi.expressions": ["neutre","ironique","alerte","grave","impénétrable"],
    // B · f4e469e3506a
    "characters.kakashi.knowledgeScope": ["kakashi","anbu","salle_de_preparation_anbu","les_toits","racine","missions"],
    // B · ca7fedfb3bd0
    "characters.kakashi.gates.kakashi_talks_on_the_roof.label": "Il aura la conversation, dehors, hors du bâtiment",
    // B · 55a54e80451a
    "characters.kakashi.gates.kakashi_talks_on_the_roof.kind": "CONFIANCE",
    // B · c3224a01ca35
    "characters.kakashi.gates.kakashi_talks_on_the_roof.requires.flagsSet": ["parlé :kakashi"],
    // B · 5c33ea9c0e70
    "characters.kakashi.gates.kakashi_shows_you.label": "Il te montre le couloir",
    // B · 9e8ae18bf8bf
    "characters.kakashi.gates.kakashi_shows_you.kind": "ALLIANCE",
    // B · abac715462b1
    "characters.kakashi.gates.kakashi_shows_you.requires.flagsSet": ["dit_quelque_chose_a_quelquun"],
    // B · 816521ae7b48
    "characters.kakashi.scouting.revealCopy": "Il ne lève pas les yeux. « Tu lances en premier quand tu es inquiet et tu parles en premier quand tu ne l’es pas. Tu as lancé en premier quatre fois cette semaine. »",
    // B · 88e6607b38cb
    "characters.kakashi.combatant.tags": ["anbu","sharingan"],
    // B · f961cf657950
    "factions.faction_konoha.name": "La direction du village",
    // B · 7c5b4a1f9be3
    "factions.faction_konoha.description": "Le bureau du Hokage, le conseil des anciens, et les opérations noires qui répondent à la tour. Ils ont eu dix ans pour régler la question du clan en parlant, et ils ont tout essayé.",
    // B · f23327b1a912
    "factions.faction_konoha.enemies": ["faction_uchiha"],
    // B · 71ebe8a8d908
    "factions.faction_uchiha.name": "Le clan",
    // B · 67a72de67f0d
    "factions.faction_uchiha.description": "Une quarantaine de foyers derrière un mur, une police que personne ne laisse faire son travail, et une décennie à être suspectés d’un crime qu’ils n’ont pas commis. Certains veulent de la dignité. D’autres veulent le village.",
    // B · fb109d658781
    "factions.faction_uchiha.enemies": ["faction_konoha"],
    // B · dd851e069aed
    "factions.faction_root.name": "Root",
    // B · 18e793182740
    "factions.faction_root.description": "Une organisation qui n’apparaît sur aucun organigramme, composée de gens dont les noms ont été effacés, dirigée par un homme convaincu que quelqu’un doit faire ça et que ce doit être lui.",
    // B · 3089af5b1def
    "quests.q_two_houses.title": "Deux maisons",
    // B · 88ed1068d377
    "quests.q_two_houses.summary": "Tu rends compte à ton père et tu rends compte à la tour, et aucun des deux ne sait que tu rends compte à l’autre. C’était vivable tant qu’il n’y avait pas de date.",
    // B · 7fcc0be2ad9c
    "quests.q_two_houses.kind": "PRINCIPALE",
    // B · 812262707099
    "quests.q_two_houses.steps.the_evening_you_came_home.playerCopy": "Passe une soirée dans une maison où trois personnes attendent trois choses différentes de toi.",
    // B · f57fff9332d1
    "quests.q_two_houses.steps.the_evening_you_came_home.directorNotes": "Sasuke sur le pas de la porte, Mikoto près du feu, le masque dans le sac, et une réunion à huit heures. Chaque chemin ici est une façon légitime d’être cette personne, aucune n’est la bonne. Ne laisse personne deviner ce qu’il fait pour le village. Garde ça domestique et laisse la pression sous la surface du repas.",
    // B · 297a86ab581c
    "quests.q_two_houses.steps.the_evening_you_came_home.rewards.flags": ["knows :the_shape_of_it"],
    // B · fa4aa10573f5
    "quests.q_two_houses.steps.under_the_seventh_mat.playerCopy": "Assieds-toi dans la pièce de pierre sous le sanctuaire et découvre ce que ton père a vraiment organisé.",
    // B · cf2dc6a23d00
    "quests.q_two_houses.steps.under_the_seventh_mat.directorNotes": "Quarante hommes dans une pièce prévue pour trente. Yashiro parle en premier maintenant et Fugaku le laisse faire, c’est l’événement de la soirée. Radicaux, modérés et ceux qui sont venus parce que tout le monde venait. Fugaku regardera son fils une fois pendant ça, et toute la pièce remarquera.",
    // B · 297a86ab581c
    "quests.q_two_houses.steps.under_the_seventh_mat.enterWhen.flagsSet": ["knows :the_shape_of_it"],
    // B · 17d77c276ca4
    "quests.q_two_houses.steps.under_the_seventh_mat.rewards.flags": ["knows :the_coup_date"],
    // B · 780912ab7d6b
    "quests.q_two_houses.steps.the_other_report.playerCopy": "Décide ce que le village entendra, et quelle partie du village l’entendra.",
    // B · f4b46c6666be
    "quests.q_two_houses.steps.the_other_report.directorNotes": "Trois bâtiments veulent ça et ce ne sont pas les mêmes. La tour est lente et légitime. La pièce sous le village est rapide et coûte quelque chose d’irréversible. Un toit à minuit avec un autre agent n’est ni l’un ni l’autre. Le joueur a treize ans et les trois factions traiteront cette conversation comme entre adultes.",
    // B · 17d77c276ca4
    "quests.q_two_houses.steps.the_other_report.enterWhen.flagsSet": ["knows :the_coup_date"],
    // B · aa6c2ec2b23a
    "quests.q_two_houses.steps.the_other_report.rewards.flags": ["the_report_is_in"],
    // B · bb36d245d504
    "quests.q_two_houses.involvedCharacterIds": ["fugaku","mikoto","sasuke","hiruzen","danzo"],
    // B · 743ccd58fa64
    "quests.q_two_houses.involvedLocationIds": ["uchiha_house","naka_shrine","hokage_office","anbu_ready_room"],
    // B · e073e41c3f10
    "quests.q_two_houses.knownRewardCopy": "Une vision claire de ce que ton père a vraiment organisé, et de ce que la tour soupçonne déjà.",
    // B · bb7d4195479e
    "quests.q_the_friend.title": "Ce que Shisui va faire",
    // B · 381e17afde7e
    "quests.q_the_friend.summary": "Il a trouvé un moyen d’arrêter ça sans qu’il y ait de morts. Ça demande de retirer la décision d’un homme, et il est déjà allé voir la mauvaise personne.",
    // B · 7fcc0be2ad9c
    "quests.q_the_friend.kind": "PRINCIPALE",
    // B · 8c0d84e341c7
    "quests.q_the_friend.discoverWhen.flagsSet": ["knows :kotoamatsukami"],
    // B · f0c94e78a338
    "quests.q_the_friend.steps.what_shisui_wants.playerCopy": "Dis à Shisui ce que tu penses d’un plan qui met fin au coup d’État en annulant la volonté d’un homme.",
    // B · 67018d3d4111
    "quests.q_the_friend.steps.what_shisui_wants.directorNotes": "Il ne demande pas la permission, et il aimerait bien l’avoir quand même. Il est déjà allé une fois voir Danzo, par la porte, comme un citoyen, et il le mentionne joyeusement comme preuve de bonne conduite. Le problème moral est réel des deux côtés et aucun ne doit gagner l’argument proprement.",
    // B · 9df838672a11
    "quests.q_the_friend.steps.what_shisui_wants.rewards.flags": ["the_plan_is_on_the_table"],
    // B · 8ff23b53389b
    "quests.q_the_friend.steps.the_night_on_the_cliff.playerCopy": "Root va attaquer Shisui sur la falaise. Décide où tu es quand ça arrive.",
    // B · 3879d3285912
    "quests.q_the_friend.steps.the_night_on_the_cliff.directorNotes": "L’embuscade est un événement mondial et elle peut être annulée. Arriver le premier est toute la branche. Si le joueur arrive, c’est un vrai combat contre quatre personnes mieux préparées que lui et qui ne seront pas surprises deux fois. Si le joueur n’arrive pas, ne raconte pas de sauvetage et ne minimise pas.",
    // B · 9df838672a11
    "quests.q_the_friend.steps.the_night_on_the_cliff.enterWhen.flagsSet": ["the_plan_is_on_the_table"],
    // B · 611b3f164959
    "quests.q_the_friend.steps.the_night_on_the_cliff.rewards.flags": ["the_cliff_happened"],
    // B · 71526d47b266
    "quests.q_the_friend.involvedCharacterIds": ["shisui","danzo","fugaku"],
    // B · 2f7de5b69411
    "quests.q_the_friend.involvedLocationIds": ["the_rooftops","nakano_cliff","root_chamber"],
    // B · e69613ddcb1e
    "quests.q_the_friend.knownRewardCopy": "Si ton ami est vivant à la fin de la quinzaine, et qui finit par garder ce qu’il portait.",
    // B · f5f1b04ef571
    "quests.q_what_it_cost.title": "Ce que ça a coûté",
    // B · 8cec166d16e3
    "quests.q_what_it_cost.summary": "Il s’est passé quelque chose sur cette falaise que tes yeux n’ont pas encore rattrapé.",
    // B · eff80c847ff6
    "quests.q_what_it_cost.kind": "PRINCIPALE",
    // B · 611b3f164959
    "quests.q_what_it_cost.discoverWhen.flagsSet": ["the_cliff_happened"],
    // B · 0fe64545de89
    "quests.q_what_it_cost.steps.the_morning_after.playerCopy": "Comprends ce qui a changé en toi sur cette falaise, et ce que ça va coûter de l’utiliser.",
    // B · d9c1de02a98d
    "quests.q_what_it_cost.steps.the_morning_after.directorNotes": "N’écris pas ça comme un déblocage. C’est un fait physique découvert dans une pièce ordinaire le lendemain matin — la lumière qui entre de travers, un mal de tête derrière un œil, le monde qui se sépare en plus de couches qu’avant. Le deuil d’abord, la capacité ensuite, et bien après.",
    // B · 7fe9a550f253
    "quests.q_what_it_cost.steps.the_morning_after.rewards.flags": ["knows :mangekyo"],
    // B · 6bbe0186b7af
    "quests.q_what_it_cost.steps.the_morning_after.rewards.abilities": ["tsukuyomi"],
    // B · c8a938dea020
    "quests.q_what_it_cost.involvedCharacterIds": ["shisui"],
    // B · 4c78e3a87824
    "quests.q_what_it_cost.involvedLocationIds": ["nakano_cliff","uchiha_house"],
    // B · 986faebc0890
    "quests.q_what_it_cost.knownRewardCopy": "Quoi que la nuit ait laissé en toi, et le fait que ça n’ait pu être acheté que de cette façon.",
    // B · 1a1728976913
    "quests.q_the_paper.title": "Quelque chose qu’on peut poser sur un bureau",
    // B · c5741d2055d4
    "quests.q_the_paper.summary": "L’Hokage ne bougera pas contre un collègue sur une accusation. Il bougera sur un document, et il y a un document.",
    // B · eff80c847ff6
    "quests.q_the_paper.kind": "PRINCIPALE",
    // B · f8a47d672998
    "quests.q_the_paper.discoverWhen.flagsSet": ["danzo_made_contact"],
    // B · fb486346d79a
    "quests.q_the_paper.steps.find_the_door.playerCopy": "Trouve le couloir depuis la salle d’attente qui n’est pas sur le plan du bâtiment.",
    // B · 712044fb865e
    "quests.q_the_paper.steps.find_the_door.directorNotes": "Trois entrées possibles, chacune coûte quelque chose de différent. Lire ça dans les papiers est lent et gratuit. Kakashi t’y accompagnera et voudra d’abord quelque chose de vrai de ta part. Danzo te le montrera lui-même, ce n’est pas de la générosité — c’est lui qui décide que tu vaux qu’il dépense une entrée.",
    // B · b84fde3b504f
    "quests.q_the_paper.steps.find_the_door.rewards.flags": ["looking_for_proof"],
    // B · 4f0b2e67a308
    "quests.q_the_paper.steps.the_ledger.playerCopy": "Mets la main sur quelque chose qui survivrait à une lecture à voix haute devant les anciens.",
    // B · c549f3dada0a
    "quests.q_the_paper.steps.the_ledger.directorNotes": "Le journal est routinier, ce qui signe la fin d’une carrière : routinier veut dire que quelqu’un le signe depuis dix mois sans que personne au-dessus ait jamais demandé. Le trajet scolaire de Sasuke y apparaît deux fois. Laisse le joueur le découvrir lui-même plutôt que de le dire.",
    // B · b84fde3b504f
    "quests.q_the_paper.steps.the_ledger.enterWhen.flagsSet": ["looking_for_proof"],
    // B · 7093f56b8d55
    "quests.q_the_paper.steps.the_ledger.rewards.flags": ["the_question_of_proof_is_settled"],
    // B · dad911aeb403
    "quests.q_the_paper.steps.what_you_do_with_it.playerCopy": "Décide à quoi sert un document comme ça.",
    // B · 5dd725d3d62f
    "quests.q_the_paper.steps.what_you_do_with_it.directorNotes": "Trois usages, et ce ne sont pas des variantes. Sur un bureau devant les anciens, ça met fin à une organisation et fait d’un homme un ennemi qui n’oublie pas. Gardé en privé, ça le fait négocier, ce qui est utile et c’est aussi le début de devenir lui. Utilisé comme prétexte, c’est un assassinat, et le village devra être informé après.",
    // B · 7093f56b8d55
    "quests.q_the_paper.steps.what_you_do_with_it.enterWhen.flagsSet": ["the_question_of_proof_is_settled"],
    // B · 49bf69ca25c9
    "quests.q_the_paper.steps.what_you_do_with_it.rewards.flags": ["root_answered_for"],
    // B · 001586d0f796
    "quests.q_the_paper.involvedCharacterIds": ["danzo","kakashi","hiruzen"],
    // B · d8f55f136f06
    "quests.q_the_paper.involvedLocationIds": ["anbu_ready_room","root_chamber","hokage_office"],
    // B · df1732e35ac7
    "quests.q_the_paper.knownRewardCopy": "Preuve d’une surveillance de dix mois sur quarante foyers, signée par des gens qui n’apparaissent sur aucun organigramme.",
    // B · b5463ff35e50
    "quests.q_your_brother.title": "Il a sept ans",
    // B · c0d99975d7aa
    "quests.q_your_brother.summary": "Quoi qu’il arrive pendant cette quinzaine, quelqu’un va devoir expliquer ça à Sasuke. C’est toi qui décides si c’est toi.",
    // B · 552c0b7f83c2
    "quests.q_your_brother.kind": "SECONDAIRE",
    // B · 56fe33ccc8ae
    "quests.q_your_brother.steps.he_is_seven.playerCopy": "Comprends ce qu’un enfant de sept ans a le droit de savoir sur ce qui se passe chez lui.",
    // B · beacbdc84620
    "quests.q_your_brother.steps.he_is_seven.directorNotes": "Sa compréhension dépend de ce qu’on lui donne, pas de son âge. S’il apprend simplement que le clan et le village sont en lutte politique et que le père veut impliquer son frère, il comprend à peu près ça et ça change ce qu’il remarque. Ne lui fais pas tout saisir, ni être un simple décor.",
    // B · 0879e118c349
    "quests.q_your_brother.steps.he_is_seven.rewards.flags": ["sasuke_has_an_opinion_of_you"],
    // B · 415b34800d2e
    "quests.q_your_brother.steps.what_he_ends_up_believing.playerCopy": "Découvre ce que ton frère a décidé de croire, sur toi et sur cette famille.",
    // B · 3d75112ddcf2
    "quests.q_your_brother.steps.what_he_ends_up_believing.directorNotes": "C’est l’étape dont dépend tout ce qui suit dans ce monde. Il arrive à une version qu’il garde. S’il a été informé, il ne l’accepte pas simplement — il construit sa propre lecture, avec des erreurs qui lui sont propres. S’il a été manipulé, c’est cette version qu’il garde.",
    // B · 0879e118c349
    "quests.q_your_brother.steps.what_he_ends_up_believing.enterWhen.flagsSet": ["sasuke_has_an_opinion_of_you"],
    // B · f6eedce2f7e9
    "quests.q_your_brother.steps.what_he_ends_up_believing.rewards.flags": ["sasuke_is_who_he_is_now"],
    // B · f9c1daf7ef60
    "quests.q_your_brother.involvedCharacterIds": ["sasuke","mikoto"],
    // B · d9f37cb00b09
    "quests.q_your_brother.involvedLocationIds": ["maison_uchiha","terrain_d_entrainement","l_academie"],
    // B · 5677bb2788d5
    "quests.q_your_brother.knownRewardCopy": "Ce que ton frère croit de sa propre famille, pour le reste de sa vie.",
    // B · 094c4d8e8b6f
    "quests.q_the_last_night.title": "La Dernière Nuit",
    // B · d941e081a4f8
    "quests.q_the_last_night.summary": "Tous ceux qui sont concernés croient maintenant que le temps joue contre eux, c’est dans cette situation que les gens font ce dont ils ont parlé.",
    // B · 7fcc0be2ad9c
    "quests.q_the_last_night.kind": "PRINCIPALE",
    // B · 17d77c276ca4
    "quests.q_the_last_night.discoverWhen.flagsSet": ["sait :la_date_du_coup_d_etat"],
    // B · 772a3d4f5a48
    "quests.q_the_last_night.steps.the_room_with_one_chair.playerCopy": "Assieds-toi en face d’un homme qui s’apprête à décrire tes options comme s’il n’y en avait que deux.",
    // B · 9a82d3c3e9c2
    "quests.q_the_last_night.steps.the_room_with_one_chair.directorNotes": "Il ne se vante pas, il ne menace pas. Il expose un pronostic, avec précision, en marquant les parties incertaines, puis il donne un prix. Il a raison sur le risque du coup d’État et tort sur le prix, et la scène ne marche que si la première partie est vraiment convaincante.",
    // B · ec2d85895843
    "quests.q_the_last_night.steps.the_room_with_one_chair.enterWhen.flagsSet": ["l_ultimatum"],
    // B · 62a1c82d56d6
    "quests.q_the_last_night.steps.the_room_with_one_chair.rewards.flags": ["le_choix_est_maintenant_le_tien"],
    // B · 90cc2fe9a664
    "quests.q_the_last_night.steps.the_night_the_clan_moves.playerCopy": "Décide ce qu’il arrive à quarante foyers.",
    // B · a744d9e7b485
    "quests.q_the_last_night.steps.the_night_the_clan_moves.directorNotes": "Scène multiple. Rien n’est dû à personne et rien n’est prévu : si le joueur a passé deux semaines à démonter ça, ça s’effondre, et aucune catastrophe de remplacement ne sera inventée pour garder la forme célèbre. Si le joueur fait la chose célèbre, écris son raisonnement sérieusement et ne raconte pas avec du recul. S’arrêter à mi-chemin est légitime et doit être possible.",
    // B · 62a1c82d56d6
    "quests.q_the_last_night.steps.the_night_the_clan_moves.enterWhen.flagsSet": ["le_choix_est_maintenant_le_tien"],
    // B · 16c6f54e8ec2
    "quests.q_the_last_night.steps.the_night_the_clan_moves.rewards.flags": ["la_nuit_resolue"],
    // B · f7ac5bc76bfa
    "quests.q_the_last_night.steps.what_you_are_now.playerCopy": "Découvre ce que ce village a décidé que tu es.",
    // B · 691c008e1168
    "quests.q_the_last_night.steps.what_you_are_now.directorNotes": "Le lendemain matin. L’identité publique se fixe ici et ce n’est souvent pas la vraie, c’est toute la forme de cette histoire. Quoi que le joueur ait fait, quelqu’un d’autre fournit la version que le village gardera, et l’écart entre les deux est ce qu’il faut écrire.",
    // B · 16c6f54e8ec2
    "quests.q_the_last_night.steps.what_you_are_now.enterWhen.flagsSet": ["la_nuit_resolue"],
    // B · fc91f41df399
    "quests.q_the_last_night.steps.what_you_are_now.rewards.flags": ["l_histoire_a_une_forme"],
    // B · f8dc58756de2
    "quests.q_the_last_night.involvedCharacterIds": ["danzo","fugaku","mikoto","sasuke","hiruzen"],
    // B · 742411cf4f6b
    "quests.q_the_last_night.involvedLocationIds": ["chambre_racine","sanctuaire_naka","rue_uchiha","porte_du_village","bureau_hokage"],
    // B · f8f088bb2137
    "quests.q_the_last_night.knownRewardCopy": "La chose qui arrive vraiment à quarante foyers.",
    // B · d15aaa2e426e
    "worldEvents.we_the_shrine_meeting.publicCopy": "Le septième tatami est posé et l’escalier est ouvert. Quarante hommes descendent dans une pièce en pierre qui n’en contient que trente, et les quatre derniers arrivés sont ceux qui disaient que ça allait trop loin.",
    // B · e8d60fa5dfd0
    "worldEvents.we_the_shrine_meeting.directorNotes": "Fugaku préside et laisse Yashiro ouvrir, ce qui est nouveau et que tout le monde remarque. Le sujet est une date et une liste de missions. On attend qu’Itachi fasse son rapport, et la pièce se tait quand il est appelé.",
    // B · de4384ca2696
    "worldEvents.we_the_shrine_meeting.setsFlags": ["la_reunion_a_eu_lieu"],
    // B · c30de8837fbb
    "worldEvents.we_shisui_asks.publicCopy": "Un corbeau se pose sur la rambarde avec une feuille pliée en deux dans le bec. Le mot sur la note n’a jamais voulu dire ce qu’il dit.",
    // B · f42f3c56f7a6
    "worldEvents.we_shisui_asks.directorNotes": "Il te dit ce que son œil droit fait et ce qu’il compte en faire, et mentionne en passant qu’il l’a déjà montré au vieil homme aux bandages, par la porte normale, comme un citoyen. Il est content de lui pour cette partie.",
    // B · 8c0d84e341c7
    "worldEvents.we_shisui_asks.setsFlags": ["sait :kotoamatsukami"],
    // B · e879291ea3ca
    "worldEvents.we_shisui_asks.cancelledByFlags": ["shisui_mort"],
    // B · f0d1728ee6a1
    "worldEvents.we_shisui_asks.requiresFlags": ["a_parle :shisui"],
    // B · a747fb4548a6
    "worldEvents.we_root_makes_contact.publicCopy": "Il y a un nom sur le tableau des missions qui n’en est pas un, à côté d’une heure, à côté de ton code. Personne dans la pièce ne le regarde et personne n’a raté de le voir.",
    // B · f4084e2524bc
    "worldEvents.we_root_makes_contact.directorNotes": "La première vraie conversation avec Danzo. Il ne demande rien. Il loue la rapidité avec laquelle le garçon tire les conclusions nécessaires et pose un problème moral comme s’il s’agissait d’une conversation banale. La porte reste ouverte et aucune dette n’est créée, c’est le but.",
    // B · f8a47d672998
    "worldEvents.we_root_makes_contact.setsFlags": ["danzo_a_pris_contact"],
    // B · 482ae0d5e7be
    "worldEvents.we_root_makes_contact.cancelledByFlags": ["danzo_mort","root_expose"],
    // B · 6ff6105cd123
    "worldEvents.we_sasuke_asks.publicCopy": "Sasuke attend que sa mère ait quitté la pièce, puis demande, sans lever les yeux de son riz, pourquoi personne dans cette maison ne parle quand il est là.",
    // B · 4b2c7adb526c
    "worldEvents.we_sasuke_asks.directorNotes": "Il a compté. Il sait que les réunions ont lieu les soirs où la maison mange tôt et ça fait quatre soirs sur six. Il n’a pas peur encore. Il est agacé, ce qui est plus dur à gérer.",
    // B · db5feb590210
    "worldEvents.we_sasuke_asks.setsFlags": ["sasuke_t_a_pose_la_question_directe"],
    // B · 297a86ab581c
    "worldEvents.we_sasuke_asks.requiresFlags": ["sait :la_forme_que_ca_prend"],
    // B · 5b0b0ef40d37
    "worldEvents.we_the_ambush.publicCopy": "Quatre personnes qui ne sont pas de garde avancent le long de la rivière vers le rocher, dans l’ordre et à l’espacement d’une équipe qui a déjà fait ça et s’attend à ce que ça prenne moins d’une minute.",
    // B · 7df91de0dffc
    "worldEvents.we_the_ambush.directorNotes": "C’est la plus grosse branche du monde. Elle ne se déclenche pas si Root a été découvert ou si Shisui a été mis hors de portée. Si le joueur n’est pas là, ne raconte pas de sauvetage et ne minimise pas ce qui est découvert le matin.",
    // B · ea6aff1064fd
    "worldEvents.we_the_ambush.setsFlags": ["shisui_ambushed"],
    // B · 385f973d7c91
    "worldEvents.we_the_ambush.cancelledByFlags": ["shisui_safe","danzo_dead","root_exposed"],
    // B · 8c0d84e341c7
    "worldEvents.we_the_ambush.requiresFlags": ["knows :kotoamatsukami"],
    // B · a6e7c8fc4735
    "worldEvents.we_izumi_asks.publicCopy": "Izumi pose un sac en papier sur le comptoir, ne l’ouvre pas, et dit que onze maisons ont arrêté d’étendre leur linge et six ont envoyé leurs enfants chez des proches.",
    // B · bac8725ea998
    "worldEvents.we_izumi_asks.directorNotes": "Elle ne cherche pas à être rassurée, et elle remarquera si on essaie de la rassurer. Elle a fait elle-même le travail d’observation et elle veut savoir si elle a raison. La traiter comme une observatrice change ce qu’elle fait pendant le reste des deux semaines.",
    // B · 5a4294746d04
    "worldEvents.we_izumi_asks.setsFlags": ["izumi_asked"],
    // B · 17d77c276ca4
    "worldEvents.we_izumi_asks.requiresFlags": ["knows :the_coup_date"],
    // B · cf671f11e7c4
    "worldEvents.we_the_masked_man.publicCopy": "Il y a quelqu’un qui se tient sur la tour d’eau alors qu’il n’y était pas, portant un masque orange en spirale avec un trou, et un shuriken est déjà passé là où il est.",
    // B · 20761c8c6503
    "worldEvents.we_the_masked_man.directorNotes": "Ne pas le nommer ni le résoudre. Ce que le joueur apprend : un œil qui ressemble à un Uchiha, une capacité de traverser les choses inexplicable, un agenda qui veut déstabiliser ce village, et une volonté d’aider ce que le joueur prépare. L’état d’information est « menace masquée à l’Uchiha » et rien de plus.",
    // B · a98378212a18
    "worldEvents.we_the_masked_man.setsFlags": ["knows :the_masked_man"],
    // B · 611b3f164959
    "worldEvents.we_the_masked_man.requiresFlags": ["the_cliff_happened"],
    // B · 17e276cd1175
    "worldEvents.we_the_ultimatum.publicCopy": "Une convocation arrive à deux heures du matin sans signature, pour une pièce qui n’est pas sur le plan, et le messager attend dans la rue pour t’accompagner.",
    // B · 3ee7aa81d00b
    "worldEvents.we_the_ultimatum.directorNotes": "Le pronostic, puis le prix. La guerre tue le clan, le frère et une grande partie du village ; l’alternative qu’il propose épargne un septenaire précis. Il marque honnêtement ses incertitudes, ce qui rend ça crédible. Il n’est pas omniscient et la scène ne doit pas le faire croire.",
    // B · ec2d85895843
    "worldEvents.we_the_ultimatum.setsFlags": ["the_ultimatum"],
    // B · 453a196e5ef6
    "worldEvents.we_the_ultimatum.cancelledByFlags": ["danzo_dead","root_exposed","coup_stood_down","left_the_map"],
    // B · f8a47d672998
    "worldEvents.we_the_ultimatum.requiresFlags": ["danzo_made_contact"],
    // B · ab5aa6639225
    "worldEvents.we_the_district_goes_quiet.publicCopy": "Personne n’est dehors. Neuf rues, une soirée douce, et pas une seule personne sur un pas de porte — et sur le mur, deux silhouettes qui n’appartiennent ni à la police ni à quelqu’un que la police reconnaîtrait.",
    // B · e98a3bdcc4f3
    "worldEvents.we_the_district_goes_quiet.directorNotes": "Les deux organisations croient maintenant que l’autre va bouger en premier, et elles ont raison. Les familles ordinaires font leurs valises. C’est une ambiance avec une horloge, à écrire du niveau du sol : une boutique qui ferme tôt, un cousin qui évite ton regard, quelqu’un qui sort un sac par une porte latérale.",
    // B · 3265e2f5be80
    "worldEvents.we_the_district_goes_quiet.setsFlags": ["the_district_went_quiet"],
    // B · e0ae4a58d957
    "worldEvents.we_the_district_goes_quiet.cancelledByFlags": ["coup_stood_down","the_massacre_happened","left_the_map"],
    // B · 17d77c276ca4
    "worldEvents.we_the_district_goes_quiet.requiresFlags": ["knows :the_coup_date"],
    // B · c18881003a2b
    "worldEvents.we_the_coup_goes_ahead.publicCopy": "Ça commence à neuf heures, sans signal, parce que les hommes qui l’ont fait ont arrêté d’attendre. Le bâtiment de la police est pris en onze minutes et la tour ne l’est pas du tout.",
    // B · 3beaca37d3d6
    "worldEvents.we_the_coup_goes_ahead.directorNotes": "C’est ce qui arrive quand personne ne l’a réglé. Ce n’est pas une punition et le joueur n’est pas informé d’un échec — ils ont essayé, honnêtement, et quarante foyers ont quand même déménagé, ce qui arrive à des ados de treize ans qui négocient avec des adultes. Écris ça d’où que soit le joueur.",
    // B · 488545445eae
    "worldEvents.we_the_coup_goes_ahead.setsFlags": ["coup_launched","it_happened_without_you"],
    // B · 812e0e72bd09
    "worldEvents.we_the_coup_goes_ahead.cancelledByFlags": ["coup_stood_down","the_massacre_happened","left_the_map","you_led_it","danzo_dead"],
    // B · 17d77c276ca4
    "worldEvents.we_the_coup_goes_ahead.requiresFlags": ["knows :the_coup_date"],
    // B · d77ebfcebe44
    "promises.p_which_of_them_you_betray.kind": "FINALE",
    // B · 4b706a854610
    "promises.p_which_of_them_you_betray.label": "La maison que tu trahis à la fin",
    // B · 2d58a4e473ef
    "promises.p_which_of_them_you_betray.seedHint": "Un masque dans un cartable, sous une veste pliée, à quatre portes de la chambre d’un septenaire.",
    // B · c05151366350
    "promises.p_which_of_them_you_betray.payoffHint": "Une nuit où quarante foyers découvrent ce que le garçon sur qui ils comptaient a vraiment décidé.",
    // B · 445cd8deebc2
    "promises.p_the_friend.kind": "RELATIONSHIP",
    // B · 6011b2db83b9
    "promises.p_the_friend.label": "Si la seule personne qui te parle comme à un égal survit les deux semaines",
    // B · 87e54c770ac7
    "promises.p_the_friend.seedHint": "Il est toujours un peu plus haut que celui à qui il parle, et on dirait qu’il n’a jamais grimpé.",
    // B · 95d05487d8f4
    "promises.p_the_friend.payoffHint": "Quatre personnes qui avancent le long d’une rivière, espacées comme une équipe qui sait que ça doit prendre moins d’une minute.",
    // B · 445cd8deebc2
    "promises.p_what_sasuke_believes.kind": "RELATIONSHIP",
    // B · dd205255eb8f
    "promises.p_what_sasuke_believes.label": "Ce que ton frère finit par croire de sa propre famille",
    // B · edb83662610e
    "promises.p_what_sasuke_believes.seedHint": "Quatre shuriken d’entraînement alignés dans la terre, rangés par qualité de lancer.",
    // B · 2f5de8dd6b2f
    "promises.p_what_sasuke_believes.payoffHint": "Quelqu’un explique ces deux semaines à un septenaire, et cette personne décide ses dix prochaines années.",
    // B · f8b4a6708d82
    "promises.p_deciding_for_people.kind": "THEME",
    // B · d7a6ae16e08d
    "promises.p_deciding_for_people.label": "Quand protéger quelqu’un devient lui enlever son choix",
    // B · 732e78b7acf1
    "promises.p_deciding_for_people.seedHint": "Un ami dit, sur un ton léger, que tu as commencé à décider des choses à sa place, puis ne rit pas à la fin.",
    // B · c15dbcf2aabc
    "promises.p_deciding_for_people.payoffHint": "Tous ceux pour qui c’était fait découvrent que c’était fait pour eux, au moment où aucun d’eux ne peut rien y changer.",
    // B · 63a719ec7f2d
    "promises.p_the_man_in_the_bandages.kind": "RIVALITÉ",
    // B · bcda69baf330
    "promises.p_the_man_in_the_bandages.label": "Le seul homme dans ce village qui te parle en égal",
    // B · 705a31f710f5
    "promises.p_the_man_in_the_bandages.seedHint": "Il ne t’a jamais rien demandé, et il a eu raison sur deux risques que tout le monde a ignorés.",
    // B · ec6acd5f9ac0
    "promises.p_the_man_in_the_bandages.payoffHint": "Dix mois de rotations de garde sur quarante foyers, signées par une chaîne de commandement qui n’existe sur aucun organigramme.",
    // B · e82d9dc4b3fa
    "promises.p_the_masked_one.kind": "MYSTÈRE",
    // B · 53a3daadfc45
    "promises.p_the_masked_one.label": "Quelqu’un avec un œil Uchiha qui n’est pas dans le registre du clan",
    // B · 8e0d588f0cfd
    "promises.p_the_masked_one.seedHint": "Un shuriken passe là où quelqu’un est debout, et il ne bouge pas.",
    // B · 74523d451493
    "promises.p_the_masked_one.payoffHint": "Quoi qu’il veuille, il veut ce village instable, et il est prêt à t’aider pour presque tout.",
    // B · 7abf885f5c1c
    "endings.end_the_shadow.name": "L’Ombre",
    // B · f7fc172f729a
    "endings.end_the_shadow.rarity": "UNIQUE",
    // B · 10731deb20a0
    "endings.end_the_shadow.requires.flagsSet": ["le_massacre_a_eu_lieu","sasuke_croit_lhistoire","parti_de_konoha_renegat"],
    // B · b5367c0ac898
    "endings.end_the_shadow.requires.flagsUnset": ["sasuke_connaît_la_vérité"],
    // B · c61cf57055fb
    "endings.end_the_shadow.condition": "La version célèbre. Il l’a fait, il a fait en sorte que son frère le déteste à cause de ça, et il a quitté le village en portant seul toute la raison. Écris sa logique sérieusement et sans recul — à treize ans, avec les prévisions qu’il avait, c’était de l’arithmétique. Le regret appartient à un homme bien plus tard, il ne faut pas l’introduire ici.",
    // A · 3f9ac2cfda18
    "endings.end_the_shadow.epilogue": "Pendant neuf ans, il porte un manteau noir avec des nuages rouges, aussi terrifiant que l’histoire l’exige, et il revient deux fois voir un garçon qui essaie de devenir assez fort pour le tuer. Il y arrive. À la toute fin, après avoir tout arrangé, il trouve une main libre, la pose sur le front de son frère, puis meurt sans rien corriger.",
    // B · cea1f3b88213
    "endings.end_truth_before_hatred.name": "La Vérité avant la Haine",
    // B · f8b8333fe7bc
    "endings.end_truth_before_hatred.rarity": "RARE",
    // B · 063ead1541a8
    "endings.end_truth_before_hatred.requires.flagsSet": ["le_massacre_a_eu_lieu","sasuke_connaît_la_vérité"],
    // B · fb3a7b6a7856
    "endings.end_truth_before_hatred.condition": "Il a fait ce qu’il fallait, puis il a dit à son frère pourquoi, alors que ce dernier avait encore sept ans. Ce n’est pas la version adoucie. Un enfant qui sait exactement ce qui s’est passé et qui a ordonné ça porte un poids qu’aucun enfant de sept ans ne devrait porter, il ne pardonne pas, et il n’a pas à le faire. Ce qu’il a à la place de la haine, c’est une cible, et elle est précise.",
    // A · 24b051ae988d
    "endings.end_truth_before_hatred.epilogue": "Sasuke ne pleure pas aux funérailles, il n’y en a pas. Il grandit dans un village dont il connaît la vraie nature, ce qui le rend insupportable à douze ans et redoutable à seize. Il ne tente jamais de tuer son frère. Il passe onze ans à essayer de prouver, devant des gens qui ne veulent pas l’entendre, que sa famille a été assassinée par un comité.",
    // B · 3f15e966f687
    "endings.end_shisui_lives.name": "Shisui Vit",
    // B · f8b8333fe7bc
    "endings.end_shisui_lives.rarity": "RARE",
    // B · 662d98e36d36
    "endings.end_shisui_lives.requires.flagsSet": ["shisui_vit","le_coup_détat_a_été_abandonné"],
    // B · 2d141d57ce03
    "endings.end_shisui_lives.condition": "L’ami a survécu à la falaise et tous les deux ont pris la voie politique ensemble. Ce n’est pas une victoire nette, il ne faut pas l’écrire comme telle : ils ont compromis le clan dans un accord que le quart le plus en colère considère comme une reddition, et tous deux sont désormais à jamais les garçons qui ont vendu les Uchiha à la tour. Ça a marché. Personne n’est reconnaissant.",
    // A · 6964b0973958
    "endings.end_shisui_lives.epilogue": "Ils obtiennent deux sièges au conseil, récupèrent le district et mettent par écrit la fin des patrouilles. Yashiro ne parle plus jamais à aucun des deux. Shisui prend pour quatre ans les missions que personne ne veut, en rigolant bien. De temps en temps, tous les deux remontent jusqu’au rocher au-dessus de la rivière et refont le même débat que personne ne gagne jamais.",
    // B · 51e1c5809208
    "endings.end_root_falls.name": "La Chute de Root",
    // B · 734e45c160cf
    "endings.end_root_falls.rarity": "PEU COMMUN",
    // B · 54309860a40b
    "endings.end_root_falls.requires.flagsSet": ["root_dévoilé"],
    // B · bae5d727541e
    "endings.end_root_falls.requires.flagsUnset": ["le_massacre_a_eu_lieu"],
    // B · 8d8c58718d74
    "endings.end_root_falls.condition": "Dix mois de rotations signées ont atterri sur un bureau devant des gens qui ne pouvaient plus les ignorer, et une organisation dissoute il y a quatre ans avait une paie. Cette fin raconte qu’un gamin de treize ans a fait ce que quatre adultes dans ce bâtiment auraient dû faire en premier, et tout le monde dans la pièce le sait.",
    // A · 476f8b42874d
    "endings.end_root_falls.epilogue": "Ça prend neuf semaines, deux sessions à huis clos et une démission qu’on appelle retraite. Le clan voit sa rotation annulée et y lit plutôt le premier cadeau que le village lui fait depuis dix ans que comme une faveur. Hiruzen garde le registre dans son bureau, au-dessus d’un accord rédigé il y a quatorze mois et jamais soumis, et le regarde presque tous les matins.",
    // B · 1a85916f3ad4
    "endings.end_root_falls.hint": "Il ne bougera pas sur une accusation. Il bougera sur un document.",
    // B · 345c54a091ea
    "endings.end_uchiha_peace.name": "Le Règlement",
    // B · f8b8333fe7bc
    "endings.end_uchiha_peace.rarity": "RARE",
    // B · 237bea24d07e
    "endings.end_uchiha_peace.requires.flagsSet": ["le_coup_détat_a_été_abandonné","un_règlement"],
    // B · 07f2956aa3ca
    "endings.end_uchiha_peace.condition": "Les deux institutions se sont retrouvées dans la même pièce avec un document sur la table et aucune n’a eu ce qu’elle voulait. Écris la politique plutôt que la réconciliation — les clauses, les places, qui signe en premier, quels quatre hommes sortent. Le clan est vivant et un tiers le considère comme la pire des issues.",
    // A · f7a235567683
    "endings.end_uchiha_peace.epilogue": "La Police obtient une vraie juridiction et déteste la paperasse. Deux Uchiha siègent dans un conseil qui trouve des raisons de ne rien programmer. Ça tient, imparfaitement, pendant des années, ce que personne n’attendait de mieux. Fugaku ne dit jamais merci et se met à appeler son fils aîné, en réunion, le négociateur du clan, ce qui vient de lui est énorme.",
    // B · 2968ac7c9337
    "endings.end_fugakus_son.name": "Le Fils de Fugaku",
    // B · f8b8333fe7bc
    "endings.end_fugakus_son.rarity": "RARE",
    // B · 4b76e116655f
    "endings.end_fugakus_son.requires.flagsSet": ["coup_détat_lancé","tu_l_as_dirigé","le_clan_tient_konoha"],
    // B · ccac11e792be
    "endings.end_fugakus_son.condition": "Il a décidé que son père avait raison, et lui a donné tout ce que la tour avait. Le coup d’État a réussi parce qu’un capitaine ANBU a remis les rotations de la porte. Maintenant la partie difficile : c’est l’histoire de gouverner ce que tu as pris, et parmi ceux qui l’ont pris avec toi, il y a trois hommes qui voulaient la vengeance plutôt que la représentation et qui sont maintenant dans le bâtiment.",
    // A · 55974b983cbe
    "endings.end_fugakus_son.epilogue": "La tour tombe en onze minutes, et les quatre années suivantes prennent beaucoup plus de temps. Deux pays testent la frontière en un mois. Yashiro doit être viré du conseil par ceux qui l’y ont mis. Le village survit, plus petit et plus étrange, dirigé par un clan qui découvre combien la lenteur de l’ancienne direction était un poids.",
    // B · 9693eb5a7a30
    "endings.end_two_brothers_leave.name": "Les Deux Frères Partent",
    // B · f8b8333fe7bc
    "endings.end_two_brothers_leave.rarity": "RARE",
    // B · a0216690f0f4
    "endings.end_two_brothers_leave.requires.flagsSet": ["parti_avec_sasuke","parti_de_la_carte"],
    // B · 54a836a15788
    "endings.end_two_brothers_leave.condition": "Il a pris son frère dans ses bras, est sorti par la porte sud, et a laissé les deux institutions se débrouiller. Ça coûte tout le reste — mère, père, ami, quarante foyers, et toute version de lui-même qui découvre comment ça s’est terminé. C’est aussi la seule fin où la personne à laquelle il tenait le plus est définitivement vivante et avec lui.",
    // A · 41ae522586bd
    "endings.end_two_brothers_leave.epilogue": "Ils ont déjà trois pays d’avance quand personne ne s’arrête plus pour savoir à qui est la faute. Sasuke reste furieux quatre mois, pose la même question chaque soir et reçoit chaque soir une vraie réponse, ce qui est nouveau. Aucun des deux ne saura jamais ce qui s’est passé dans le district, ils entendront quatre versions différentes en dix ans, et aucune ne sera juste.",
    // B · dc721ccfd592
    "endings.end_mikotos_table.name": "La Table de Mikoto",
    // B · 734e45c160cf
    "endings.end_mikotos_table.rarity": "PEU COMMUNE",
    // B · 8a15a09eb09e
    "endings.end_mikotos_table.requires.flagsSet": ["coup_stood_down","stayed_in_konoha"],
    // B · 41d9531e85c5
    "endings.end_mikotos_table.condition": "La petite fin choisie. Personne n’a résolu quoi que ce soit en héros ; ça s’est réglé en plusieurs semaines à force de discussions par une famille qui a commencé à s’inclure, et la dernière scène montre quatre personnes qui mangent dans la même pièce un soir ordinaire. Joue-la petite et domestique, sans discours sur ce qui a failli être perdu.",
    // A · eaf6b21fadf0
    "endings.end_mikotos_table.epilogue": "Elle pose une boîte sur une étagère à cinq heures et demie, quelqu’un la prend. Sasuke garde son heure aux postes presque toutes les semaines et devient insupportable sur ses progrès. Fugaku vérifie toujours son tiroir, une fois maintenant au lieu de deux. Personne dans la maison ne parle jamais de cette quinzaine, et les quatre savent exactement quel soir ça a cessé.",
    // B · 98f8561cb8d1
    "endings.end_the_clan_killer.name": "Le Tueur du Clan",
    // B · 734e45c160cf
    "endings.end_the_clan_killer.rarity": "PEU COMMUNE",
    // B · ab63a48f00f2
    "endings.end_the_clan_killer.requires.flagsSet": ["the_legend_is_true"],
    // B · ebc865c47697
    "endings.end_the_clan_killer.condition": "La version du village s’avère exacte. C’est lui, pas pour la paix, ni pour son frère — mais pour ce que les hommes dans la pièce sous le village ont toujours suspecté en lui et appelaient maturité. Pas de motif noble caché. Le monde ne sait pas qu’il a raison à son sujet et agit comme il le ferait dans tous les cas, c’est ça l’horreur.",
    // A · 552c11ceef28
    "endings.end_the_clan_killer.epilogue": "Le registre dit qu’il a tué son clan pour se mesurer, et c’est, pour une fois, exactement ce qui s’est passé. Sasuke croit ce registre. Kakashi aussi, qui était sur le toit cette semaine-là et s’est demandé pendant des années ce qu’il aurait dit. Personne ne croit encore qu’il y avait autre chose, parce qu’il n’y en avait pas.",
    // B · 44dde2cdad64
    "endings.end_no_mangekyo.name": "Les Yeux qu’il a gardés",
    // B · f8b8333fe7bc
    "endings.end_no_mangekyo.rarity": "RARE",
    // B · fc91f41df399
    "endings.end_no_mangekyo.requires.flagsSet": ["the_story_has_a_shape"],
    // B · 7fe9a550f253
    "endings.end_no_mangekyo.requires.flagsUnset": ["knows :mangekyo"],
    // B · b2f4a3646480
    "endings.end_no_mangekyo.condition": "Deux semaines entières décidées, et rien sur cette falaise ne lui est arrivé. Il sort de là avec deux Sharingan ordinaires et la réputation de quelqu’un qui a réglé une crise politique avec du papier et des conversations. Écris ce qu’il est sans le pouvoir célèbre, parce que cette fin montre que la plupart de ce qu’il a fait n’en avait pas besoin.",
    // A · 357f65372f1c
    "endings.end_no_mangekyo.epilogue": "Il continue d’être exceptionnel et on ne parle plus jamais de lui comme de quelque chose d’inévitable, ce qui lui va bien. Dans les vieux registres du clan, il existe une technique dont il a lu l’existence sans jamais la voir, et à peu près une fois par an quelqu’un pense qu’il la maîtrise et il ne les corrige pas. Il a trente et un ans quand la guerre arrive, il est toujours là, ses yeux fonctionnent encore.",
    // B · abf563d08366
    "endings.end_walked_away.name": "Le Garçon qui est parti",
    // B · c9d08ae5d876
    "endings.end_walked_away.rarity": "COMMUNE",
    // B · b0eff3470103
    "endings.end_walked_away.requires.flagsSet": ["left_the_map"],
    // B · af7e4d592d28
    "endings.end_walked_away.requires.flagsUnset": ["left_with_sasuke","the_massacre_happened"],
    // B · 2905778778d2
    "endings.end_walked_away.condition": "Il est sorti seul par la porte sans rien expliquer à personne. Ne rends pas ça héroïque ni tragique — c’est cohérent pour un garçon de treize ans quand deux gouvernements ont passé deux ans à décider ce qu’il représente. Ceux qui en souffrent le plus sont ceux qui étaient sur le pas de la porte et près du feu.",
    // A · c87202e0510a
    "endings.end_walked_away.epilogue": "Le registre de la porte sud porte son code et rien d’autre. Mikoto va lire elle-même le registre au guichet le quatrième jour. On dit à Sasuke que son frère est parti en mission longue et il comprend tout seul, vers neuf heures, que ce n’est pas vrai. Quoi qu’il se soit passé dans le quartier ce mois-là s’est passé sans lui, et il n’apprend jamais quelle version croire.",
    // B · eddea3dc5f2c
    "endings.end_it_happened_anyway.name": "Ça s’est passé quand même",
    // B · c9d08ae5d876
    "endings.end_it_happened_anyway.rarity": "COMMUNE",
    // B · 2c6c4b344d58
    "endings.end_it_happened_anyway.requires.flagsSet": ["it_happened_without_you"],
    // B · 30b93a58a718
    "endings.end_it_happened_anyway.requires.flagsUnset": ["you_led_it","coup_stood_down"],
    // B · 5da086cba7a3
    "endings.end_it_happened_anyway.condition": "Il a négocié honnêtement pendant deux semaines avec des gens quatre fois plus âgés, et les hommes avec un calendrier ont arrêté d’attendre. Ce n’est pas une punition pour avoir joué prudemment. Il a fait les bonnes choses dans le bon ordre, et ça n’a pas suffi, c’est la façon ordinaire pour un garçon de treize ans de perdre un argument face aux adultes.",
    // A · 635032c900b0
    "endings.end_it_happened_anyway.epilogue": "Ça commence à neuf heures sans avertissement. Le commissariat tombe en onze minutes, la tour ne tombe pas du tout, et dès le quatrième jour deux pays se tiennent à la frontière, alors que plus personne à Konoha ne parle de sièges au conseil. Il passe cette semaine à faire traverser trois rues à sa mère et à son frère, c’est la seule partie de ça qu’il racontera un jour à quelqu’un.",
    // A · 643f821ab0ba
    "archetypes.arch_water.name": "Tu lui as donné de l’eau",
    // B · 31126909f8ef
    "archetypes.arch_water.role": "Empathie et franchise",
    // A · 58d7b5e5b6c9
    "archetypes.arch_water.summary": "Tu t’es agenouillé près d’un homme mourant dans le mauvais uniforme et tu as demandé si tu pouvais l’aider, et personne ne s’en est jamais remis.",
    // A · e67ed39246e8
    "archetypes.arch_water.playstyle": ["Parle aux gens","Direct","Lent à condamner"],
    // A · b31c8b5dfb2a
    "archetypes.arch_water.blurb": "Tu avais quatre ans, le sol était boueux, et la seule question à laquelle tu pensais était s’il avait le droit de boire de l’eau. Neuf ans plus tard, tu poses toujours la question en premier.",
    // A · 105cc6bfd701
    "archetypes.arch_never_again.name": "Tu voulais que ça s’arrête",
    // B · c267d8c41358
    "archetypes.arch_never_again.role": "Vitesse et force",
    // A · f0a28c298e9b
    "archetypes.arch_never_again.summary": "Sur ce terrain, tu as décidé que la solution était de devenir assez fort pour que personne ne puisse jamais apporter ça jusqu’à ta rue, et tu bosses là-dessus depuis.",
    // A · 8ee0d9e33b69
    "archetypes.arch_never_again.playstyle": ["Rapide","Décidé","Lance-toi dans l’action"],
    // A · 7fec48a93701
    "archetypes.arch_never_again.blurb": "Tu l’as dit à voix haute, à quatre ans, devant ton père : tu deviendrais assez fort pour arrêter ça. Il ne l’a jamais oublié, toi non plus, et chaque année depuis, ça a pris un sens différent.",
    // A · eed8ca90d434
    "archetypes.arch_the_board.name": "Tu As Compté Les Morts",
    // B · d7a6bfe4d6dd
    "archetypes.arch_the_board.role": "Planification et espionnage",
    // A · 696c663625fc
    "archetypes.arch_the_board.summary": "Sur ce terrain, tu as compté combien étaient dans chaque camp et quelles décisions avaient fait la différence, ce que les enfants de quatre ans ne font pas, mais que les adultes ont remarqué chez toi.",
    // A · 9ce546ccc4f2
    "archetypes.arch_the_board.playstyle": ["Analytique","Sait attendre","Pense en chiffres"],
    // A · 4e67cbcc2b6d
    "archetypes.arch_the_board.blurb": "Quelqu’un en masque a vu un enfant de quatre ans compter les corps selon l’uniforme et calculer un ratio, puis l’a noté. Tu es sur une liste depuis, sans jamais qu’on te le dise.",
    // A · ac1b9e4b7980
    "archetypes.arch_looked_away.name": "Tu As Détourné Le Regard",
    // B · b1d7398958b9
    "archetypes.arch_looked_away.role": "Genjutsu et distance",
    // A · fff2d97233ae
    "archetypes.arch_looked_away.summary": "Tu as mis ça de côté et tu as continué ta journée, ce qui a marché, et qui s’est avéré être une compétence aux applications étonnamment larges.",
    // A · dd6ae0cc1171
    "archetypes.arch_looked_away.playstyle": ["Maîtrisé","Tout en illusion","Difficile à cerner"],
    // A · a9e81d358f8c
    "archetypes.arch_looked_away.blurb": "Tu n’as pas pleuré, tu n’as pas demandé, et tu as dîné ce soir-là. Ta mère a repensé à cette soirée plus souvent en neuf ans que toi.",
    // B · efc7df03ae6b
    "setupFields.archetype.label": "Tu avais quatre ans, sur un champ de bataille, avec ton père. Qu’est-ce que tu en as retenu ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHÉTYPE",
    // B · 828b21e03fdc
    "setupFields.archetype.helpText": "La seule chose que la guerre a laissée en toi, qui détermine ce dans quoi tu es bon neuf ans plus tard. C’est fixé pour toute l’histoire. Ça ne décide pas si tu es avec le clan ou le village, ce que tu dis à ton frère, ni si quelqu’un meurt ces deux semaines — rien de ça ne se décide ici, et tout ça t’appartient.",
    // B · aa9e1f16ce6a
    "setupFields.worldKnowsAboutYou.label": "Qu’est-ce que les gens comprennent mal à ton sujet ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · 142eca619eb3
    "setupFields.worldKnowsAboutYou.helpText": "L’écart entre ce que ce village a décidé que tu es et ce que tu es vraiment. Une phrase simple suffit.",
    // B · 38510026f31e
    "setupFields.worldKnowsAboutYou.placeholder": "ex. Tout le monde croit que je suis calme. Je ne le suis pas, je suis lent à bouger, et ça se ressemble vu de l’extérieur.",
    // B · 7ac37238ec3a
    "setupFields.how_you_carry_it.label": "D’où pars-tu ?",
    // B · b6a31c665c0b
    "setupFields.how_you_carry_it.kind": "CHOIX",
    // B · 3223c3a04544
    "setupFields.how_you_carry_it.helpText": "Une inclinaison de départ, pas un engagement. Tu peux faire le contraire dès la première heure, et tout le village suivra.",
    // B · 12a09b4067da
    "setupFields.how_you_carry_it.options.the_clan.label": "Ils sont ta famille et ils sont suspects depuis dix ans",
    // B · 9498dd95dbf0
    "setupFields.how_you_carry_it.options.the_village.label": "Un coup d’État ouvrirait les portes à trois pays qui l’attendent",
    // B · e512de3be396
    "setupFields.how_you_carry_it.options.your_brother.label": "Ni l’un ni l’autre. Il y a un garçon de sept ans et tout le reste, c’est des calculs",
    // B · 33cfc724b703
    "setupFields.how_you_carry_it.options.undecided.label": "Tu ne sais vraiment pas, et c’est pour ça que ces deux semaines existent",
    // B · 64aaf6850986
    "setupFields.how_you_carry_it.options.neither_of_them.label": "Ces deux institutions t’ont déjà utilisé une fois chacune",
    // B · b76a08a03e62
    "protagonist.kind": "NOMMÉ",
    // B · ca7db0031ea0
    "protagonist.name": "Itachi Uchiha",
    // B · fcca6b746d0b
    "protagonist.pronouns": "il/lui",
    // B · a7a6cbb0f6ef
    "protagonist.description": "Treize ans. Petit pour son âge. Des cernes que personne de cet âge ne devrait avoir, et un cartable avec quelque chose de plus lourd que des livres dedans.",
    // B · 4ffb41414ed4
    "protagonist.setupHeading": "Quel genre d’Itachi es-tu ?",
    // B · 338dbc89281e
    "coverDirection": "SUJET : Itachi Uchiha seul au centre, visuel clé d’un film anime tragique sur sa vie. Itachi est au premier plan, de la taille à la taille, centré, plus grand que les autres et occupant environ la moitié du poids visuel. Corps légèrement tourné, visage face au spectateur. Il a entre dix-huit et vingt-et-un ans, mince et grand, visage fin, très pâle, longs cheveux noirs raides encadrant les deux côtés et attachés lâchement derrière. Des cernes marqués sous les yeux. Ses yeux sont des Mangekyo Sharingan rouge profond qui brillent doucement, pas comme du néon. Expression : calme et épuisé émotionnellement, pas en colère — paupières baissées, illisible, un homme qui sait déjà comment ça finit. Il porte le manteau noir Akatsuki avec de grands nuages rouges, col haut ouvert cachant une partie de la mâchoire, maille sombre en dessous. Son protecteur frontal de Konoha est rayé horizontalement au niveau du symbole. Une main pend libre, l’autre sort légèrement du manteau. Présence contrôlée, jamais en posture de combat. DERRIÈRE LUI, disposés comme des souvenirs qui gravitent autour de lui plutôt qu’une photo de groupe : Shisui au-dessus de son épaule gauche, estompé dans l’atmosphère — jeune Uchiha, traits sérieux et chaleureux, cheveux courts et en bataille, veste de Konoha, petit sourire rassurant, la seule vraie chaleur ici. Sasuke derrière son épaule droite, le Sasuke adolescent — pâle, yeux noirs perçants, cheveux noirs en pics avec longues mèches, chemise bleu foncé à col haut avec l’éventail Uchiha. En colère, confus et blessé, regardant Itachi plus que le spectateur, cherchant une réponse de son frère devant lui. Fugaku plus en arrière et en hauteur, sévère et fier plutôt que méchant — traits marqués, cheveux noirs courts, rides sur les joues, posture rigide, vêtements traditionnels sombres des Uchiha, éventail du clan en arrière-plan. Danzo tout à gauche et bas, surtout dans l’ombre — visage âgé et marqué, cheveux gris courts, œil droit et partie du bandeau bandés, un bras caché dans ses robes. Froid et calculateur, sans lien avec Itachi. Obito masqué en face de Danzo, plus en arrière — manteau noir Akatsuki, masque spirale orange, un œil sombre avec un Sharingan rouge pâle, à moitié perdu dans la fumée, détendu et illisible. La disposition doit montrer deux mondes : famille et amitié d’un côté, manipulation et ténèbres de l’autre, avec Itachi entre les deux. ARRIÈRE-PLAN : le quartier Uchiha de Konoha la nuit — toits traditionnels, bâtiments en bois, poteaux électriques, le domaine en silhouette. Simple et se dissolvant dans la brume vers les bords. Une énorme lune rouge sang partiellement cachée est haute derrière lui, projetant un halo rouge près de sa tête sans être derrière comme un disque. Un nuage fin la traverse. Quelques corbeaux noirs volent, un ou deux proches du premier plan, d’autres se dissolvant en plumes. Sobre — symbolique, pas décoratif. Le blason Uchiha apparaît sur un mur ou une bannière, visible mais pas dominant. LUMIÈRE ET COULEUR : éclairage double. Lumière cramoisie atténuée de la lune sur un côté du visage, des cheveux et du manteau ; lumière froide bleue lunaire sur l’autre. Son visage reste lisible mais partiellement dans l’ombre autour des yeux. Palette de noir, charbon, bleu marine désaturé, cramoisi profond et peau pâle. Shisui et Sasuke ont un peu plus de lumière naturelle ; Fugaku est atténué et distant ; Danzo est presque tout dans l’ombre ; Obito est presque perdu dans l’obscurité sauf le masque orange et un œil rouge. Brouillard léger et humidité suspendue captant la lumière rouge. C’est le calme juste avant ou juste après quelque chose de terrible. TON : tragique, intelligent, solitaire, retenu, menaçant. Personne ne crie et personne ne prend de pose de combat ; toute la tension vient de l’expression, de la lumière et de la disposition.",
    // A · 452a50127251
    "opening": "Sasuke est sur la marche depuis deux heures.\n\nTu le sais parce que les shurikens à côté de lui sont alignés dans la terre, classés selon la qualité de sa lancer, et le tas dont il est le plus fier en compte onze.\n\n« Tu avais dit que ce serait peut-être aujourd’hui, » dit-il sans lever les yeux. « Tu avais dit peut-être. »\n\nÀ l’intérieur, ta mère fait du bruit en cuisinant, bien plus que nécessaire. C’est sa manière de demander.\n\nTon sac contient le masque. Dans quatre-vingts minutes, ton père attend que tu sois sous le septième tapis avec tout ce que la tour t’a appris cette semaine, et la tour attend un rapport jeudi, sur ce qui se passe sous le septième tapis.\n\nSasuke en prend un et te le tend, par le manche, toujours sans lever les yeux.",
    // A · 1b250be96002
    "openingSuggestions": ["Je prends la kunai, la tourne une fois, et montre sa prise. « Deux doigts, pas trois. Tu te compliques la vie depuis deux heures. » J’ai quatre-vingts minutes. Il peut en prendre quarante.","Je m’assois sur la marche à côté de lui au lieu de rentrer. « Sasuke. Est-ce que quelqu’un à l’école a parlé de notre famille récemment ? Même un peu. » J’y vais en douceur, parce que je préfère une réponse honnête qu’une réponse prudente.","« Pas aujourd’hui. » Je le dis simplement, sans faire de concessions, parce que c’est ce que j’ai fait la semaine dernière et celle d’avant. Ensuite, je rentre voir ma mère. « Papa m’attend toujours à huit heures, ou ça a encore changé ? »"],
  },
});
