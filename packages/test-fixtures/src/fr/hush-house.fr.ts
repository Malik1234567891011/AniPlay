import { registerWorldText } from '@aniplay/contracts';

/**
 * Hush House, in French.
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
  storyId: "story_hush_house",
  text: {
    // A · 5704f9c71488
    "title": "Hush House",
    // A · e82b4d74f541
    "fantasyLabel": "N’ouvre pas la porte à 2 h 13 du matin",
    // A · e6c3d6723a61
    "hook": "Le loyer est ridiculement bas, la fille du 314 est incroyablement attirante, et elle a trois règles au sujet du couloir dont elle ne rigole pas.",
    // A · 78b76e92c65a
    "premise": "Hush House, c’est six étages en briques sombres dans Bellweather Street, au vieux quartier de Morrowgate. La chambre 312 est libre tout de suite, à un prix qui aurait dû te mettre la puce à l’oreille.\n\nMme Vale, qui s’en occupe, ne dit pas pourquoi le dernier locataire est parti. Elle répond à une question voisine de celle que tu as posée et sourit en le faisant.\n\nTa voisine au 314, c’est Ayame Kurose : vingt-deux ans, drôle et pince-sans-rire, on voit qu’elle ne dort pas. Le premier soir, elle t’offre un café en canette et te donne trois règles, comme si elle expliquait comment fonctionne la poubelle.\n\nSi la lumière dans le couloir devant le 309 devient rouge, ne regarde pas dans le judas. Si l’ascenseur s’ouvre sur un étage marqué 0, ne mets pas un pied dehors. Si quelqu’un frappe à 2 h 13 du matin et dit qu’il est Ayame, n’ouvre pas. Elle ne frappera jamais à cette heure-là, c’est une promesse.\n\nLe prix à payer quand on brise une règle n’est écrit nulle part. Le locataire qui avait 312 avant toi l’a découvert un jeudi de mars, et son nom est encore sur la boîte aux lettres.\n\nSa sœur aînée a disparu de cet immeuble il y a quatre ans. La police a conclu à une fugue. Ayame a emménagé pour prouver le contraire. Elle a vu Mika deux fois depuis, et elle ne compte pas la perdre une deuxième fois.\n\nLe loyer est à payer le premier, et il te faut un endroit où vivre. Tout le reste, tu le découvriras en chemin.",
    // A · 1e26c76c4e13
    "mechanicsChips": ["Trois règles à respecter ou enfreindre","La maison t’apprend à te connaître","Une voisine qui ment bien","Une vie ordinaire à protéger","Tu peux partir quand tu veux"],
    // A · 8f550f049bed
    "creatorNote": "La maison est écrite jusque dans les planches du sol, mais ton chemin, lui, ne l’est pas du tout. Tu peux l’explorer, y nouer une histoire d’amour, la filmer, vendre ça à un journal, mettre le feu, partir le quatrième jour, ou juste y vivre en faisant attention. Elle s’adapte. Et elle devient meilleure pour imiter les gens que tu apprécies.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "JALON",
    // B · 3d2237b09cea
    "rules.hardCanon": ["Hush House existait bien avant le joueur, et la chambre 312 était vide quand il a signé pour.","Mika Kurose a disparu de ce bâtiment il y a quatre ans et n’a jamais été retrouvée.","L’hospice Saint Orra a brûlé sur ce même terrain en 1911, pendant une quarantaine de la ville, et le nombre de morts officiel est faux.","Les phénomènes de mémoire du bâtiment sont réels. Ce n’est pas le joueur qui imagine des choses, et ils ne se révèlent jamais faux.","Ayame Kurose ne frappera pas à 2 h 13 du matin. Toute personne qui se présente à cette heure-là en disant être elle ne l’est pas.","Morrowgate est une ville moderne ordinaire. En dehors de Bellweather Street, rien de surnaturel n’est connu du grand public."],
    // A · f6a975636a38
    "rules.toneGuide": "Un anime surnaturel moderne, pas un slasher. L’horreur arrive par incidents précis, nets — une lumière, un coup à la porte, un étage, un mot mal employé — puis s’interrompt, puis la bouilloire se remet à chauffer. Un truc étrange à la fois. Entre les incidents, le monde est doux, réduit et vraiment agréable : le loyer, la lessive, le konbini à minuit, les chamailleries pour savoir à qui c’est le tour. Le joueur doit toujours pouvoir dire ce qui vient de se passer. Il doit très souvent ne pas pouvoir dire pourquoi.",
    // B · 837d9279e002
    "skills.nerve.name": "Courage",
    // B · 4c84c2c842d0
    "skills.nerve.attribute": "volonté",
    // B · 4675a706dbe7
    "skills.nerve.description": "Rester assez longtemps dans le couloir pour bien voir ce truc.",
    // B · b0d0dc2aa738
    "skills.notice.name": "Observation",
    // B · a8c1fa8269c3
    "skills.notice.attribute": "esprit",
    // B · 694a01d80ce0
    "skills.notice.description": "Repérer le détail qui cloche d’un degré.",
    // B · 5166271ee25d
    "skills.research.name": "Recherche",
    // B · a8c1fa8269c3
    "skills.research.attribute": "esprit",
    // B · 729784bd1acf
    "skills.research.description": "Les archives du conseil, les rapports d’incendie, et ce qu’un bâtiment peut légalement oublier.",
    // B · af17d0c9a93b
    "skills.talk.name": "Parler",
    // B · cfb7a15645c3
    "skills.talk.attribute": "présence",
    // B · 5f14f81a6368
    "skills.talk.description": "Obtenir une réponse de quelqu’un qui a décidé de t’en donner une voisine.",
    // B · ff8539cd765a
    "skills.quiet.name": "Discrétion",
    // B · 7ce3b6387340
    "skills.quiet.attribute": "agilité",
    // B · df5fd904a7aa
    "skills.quiet.description": "Se déplacer dans un bâtiment qui écoute.",
    // B · 2730217b5965
    "skills.hands.name": "Mains",
    // B · 97081b4b4792
    "skills.hands.attribute": "force",
    // B · e735028f3151
    "skills.hands.description": "Serrures, charnières, portes barricadées, et en tenir une fermée.",
    // B · 30ad18c555fc
    "skills.care.name": "Soin",
    // B · cfb7a15645c3
    "skills.care.attribute": "présence",
    // B · 628d0c307bde
    "skills.care.description": "Être la personne que quelqu’un réveille à quatre heures du matin.",
    // B · 641af1ad7d81
    "resources.sleep.name": "Sommeil",
    // B · 34e8ec1ac388
    "resources.sleep.polarity": "BON ÉLEVÉ",
    // B · 46d03f82d290
    "resources.sleep.zeroStateConsequence": "Le joueur n’est plus un narrateur fiable de sa propre soirée. Il ne fait pas d’hallucinations ; il ne peut plus distinguer ce qu’il a vu de ce qu’on lui a raconté, et le bâtiment n’a pas besoin de faire quoi que ce soit de spécial à une personne dans cet état.",
    // B · 0e94dcc4f909
    "resources.sleep.color": "#B9A7CE",
    // B · e26bf4fca017
    "resources.public_suspicion.name": "Suspicion Publique",
    // B · a34adbda2422
    "resources.public_suspicion.polarity": "BON FAIBLE",
    // B · 043563926580
    "resources.public_suspicion.zeroStateConsequence": "Personne en dehors de Bellweather Street ne s’est fait la moindre opinion sur le joueur.",
    // B · 0f552585cea0
    "resources.public_suspicion.color": "#4E6A7A",
    // B · 9c778b8dce4a
    "resources.house_attention.name": "Attention du Bâtiment",
    // B · a34adbda2422
    "resources.house_attention.polarity": "BON FAIBLE",
    // B · 0859ad18b3a6
    "resources.house_attention.zeroStateConsequence": "C’est un vieux bâtiment avec un problème d’humidité et un ascenseur qui coince. Rien ne connaît le nom du joueur, et ça soulage vraiment un moment.",
    // B · d734d5199e0a
    "resources.house_attention.color": "#7A3B4E",
    // A · 7ef9a06b4668
    "items.keyring_312.name": "Les clés de la 312",
    // B · 4bff0469c29c
    "items.keyring_312.tags": ["kit"],
    // B · 776fb7056431
    "items.keyring_312.description": "Deux clés et un porte-clés en laiton avec le numéro presque effacé. Mme Vale les avait dans la poche de son gilet, déjà séparés du reste.",
    // B · 1d061ba8847a
    "items.keyring_312.loreText": "Il y a une troisième trace d’anneau sur le porte-clés où une clé se trouvait autrefois.",
    // B · b69087a9b6c9
    "items.keyring_312.icon": "clés",
    // A · ed57c609d82f
    "items.canned_coffee.name": "Un café en canette",
    // B · 56e08362805f
    "items.canned_coffee.tags": ["consommable"],
    // B · 8621e9d9766a
    "items.canned_coffee.description": "Chaud sorti de la machine devant le konbini, froid au bout de neuf minutes. Ayame en achète deux chaque soir et n’a jamais expliqué pourquoi elle en prend deux.",
    // B · bd80b3bd91ef
    "items.canned_coffee.icon": "canette",
    // A · 32951103b983
    "items.voice_recorder.name": "Un enregistreur portable",
    // B · 9dd929ec72f0
    "items.voice_recorder.tags": ["outil","preuve"],
    // B · 5c78a658cae5
    "items.voice_recorder.description": "Pas cher, orange, il était dans le tiroir de la cuisine du 312 quand tu as emménagé, avec déjà quatre heures d’enregistrement.",
    // B · 13a0515c97fd
    "items.voice_recorder.loreText": "Les quatre heures, c’est une personne qui respire et, deux fois, quelqu’un qui dit un nom qui n’est pas sur le bail.",
    // B · 08694fc24f75
    "items.voice_recorder.icon": "enregistreur",
    // A · 06578cf41d00
    "items.nia_footage.name": "Le Dossier du Couloir de Nia",
    // B · f88c6548fc3b
    "items.nia_footage.tags": ["quête","preuve"],
    // B · 6e11695827da
    "items.nia_footage.description": "Onze minutes de vidéo prise au téléphone d’un couloir avec une fenêtre au bout. Hush House n’a pas de couloir avec une fenêtre au bout.",
    // B · c9c8bfd2c964
    "items.nia_footage.loreText": "L’horodatage est 02:11. Ça s’arrête deux minutes plus tard, et Nia ne l’a jamais mise en ligne.",
    // B · d5511d58ae89
    "items.nia_footage.icon": "téléphone",
    // A · 62db25713412
    "items.mika_polaroid.name": "Une Photo de Deux Sœurs",
    // B · 551a06b42e83
    "items.mika_polaroid.tags": ["quête","personnel"],
    // B · bae061984f1d
    "items.mika_polaroid.description": "Ayame à dix-huit ans et Mika à vingt-deux, sur le palier de l’escalier, riant de celui qui tenait l’appareil photo.",
    // B · d9a771a03615
    "items.mika_polaroid.loreText": "Ayame le garde dans son manteau et le sort plus souvent qu’elle ne pense que quelqu’un le remarque.",
    // B · 90a92258a67f
    "items.mika_polaroid.icon": "photo",
    // A · f92849a2c65b
    "items.vale_ledger.name": "L’Accord Vale",
    // B · 061625d9bd60
    "items.vale_ledger.tags": ["quête","document"],
    // B · 17e4a5efd837
    "items.vale_ledger.description": "Un accord de propriété signé par quatre mains sur cent onze ans. Les obligations sont décrites précisément. Ce à quoi elles s’appliquent n’est jamais nommé.",
    // B · 0686c5071526
    "items.vale_ledger.loreText": "Clause neuf : le sous-sous-sol ne doit être ni inspecté, ni ouvert, ni visité par aucune équipe, y compris le propriétaire.",
    // B · bccca52309b0
    "items.vale_ledger.icon": "registre",
    // A · 25c8ac3a8da4
    "items.bolt_cutters.name": "Coupe-boulons",
    // B · f3a60c587a13
    "items.bolt_cutters.tags": ["outil"],
    // B · 3b4423a31292
    "items.bolt_cutters.equipSlot": "mains",
    // B · 8214485fc03e
    "items.bolt_cutters.description": "Du placard sur le palier de l’escalier, sous une bâche pliée, huilé par quelqu’un dans l’année.",
    // B · 21f4c57901c4
    "items.bolt_cutters.icon": "coupe-boulons",
    // A · 1fdac13cef1e
    "abilities.listen_close.name": "Écouter",
    // B · c2bd69575dc2
    "abilities.listen_close.tags": ["vue","utilitaire"],
    // B · ab9335701998
    "abilities.listen_close.description": "Reste immobile et essaie de comprendre ce qui fait vraiment le bruit.",
    // B · c44e6dd70059
    "abilities.listen_close.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.listen_close.check.attribute": "esprit",
    // A · e87c14fe4f14
    "abilities.hold_the_door.name": "Tenir Fermé",
    // B · 053e9da3e4b8
    "abilities.hold_the_door.tags": ["défensif"],
    // B · 75e532124a74
    "abilities.hold_the_door.description": "Appuie-toi dessus et garde-la fermée aussi longtemps que nécessaire.",
    // B · c44e6dd70059
    "abilities.hold_the_door.targetRule": "AUCUN",
    // B · 4c84c2c842d0
    "abilities.hold_the_door.check.attribute": "volonté",
    // A · 90f43e8faaed
    "abilities.open_the_door.name": "Ouvrir",
    // B · 5251d369d3b6
    "abilities.open_the_door.tags": ["utilitaire"],
    // B · d2bdb9dcc58f
    "abilities.open_the_door.description": "Enlève la chaîne et regarde ce qui se tient dans le couloir.",
    // B · c44e6dd70059
    "abilities.open_the_door.targetRule": "AUCUN",
    // A · 879349acd096
    "abilities.knock_back.name": "Repousser",
    // B · f0af660f46a4
    "abilities.knock_back.tags": ["social","utilitaire"],
    // B · 853d07de60d7
    "abilities.knock_back.description": "Réponds-lui à sa manière. Donne quelque chose de toi au bâtiment pour qu’il réagisse.",
    // B · c44e6dd70059
    "abilities.knock_back.targetRule": "AUCUN",
    // B · cfb7a15645c3
    "abilities.knock_back.check.attribute": "présence",
    // A · 428af5211221
    "abilities.record_it.name": "Enregistrer Quelque Chose",
    // B · 5251d369d3b6
    "abilities.record_it.tags": ["utilitaire"],
    // B · 8150dceeeae6
    "abilities.record_it.description": "Pointe un objectif ou un micro dessus pendant que ça se passe encore, ce qui est plus dur que ça en a l’air.",
    // B · c44e6dd70059
    "abilities.record_it.targetRule": "AUCUN",
    // B · 7ce3b6387340
    "abilities.record_it.check.attribute": "agilité",
    // A · 6439321722fa
    "abilities.break_it.name": "Briser le Sceau",
    // B · 05f59299d740
    "abilities.break_it.tags": ["offensif"],
    // B · eddb1a35e03d
    "abilities.break_it.description": "Démonte la pierre. Quel que soit l’accord, il est gravé dans les fondations et tu peux l’effacer.",
    // B · 39d896e20aec
    "abilities.break_it.targetRule": "SINGLE",
    // B · 97081b4b4792
    "abilities.break_it.check.attribute": "puissance",
    // B · 1de3d350589b
    "abilities.break_it.requires.flagsSet": ["stood_on_the_stone"],
    // B · 40db2913a1d9
    "abilities.break_it.requires.lockedCopy": "Tu n’es pas encore descendu là-dessous. Quoi que ce soit, ça repose sur plus de cent onze ans de plancher d’un autre.",
    // A · 59ab99e0cbb3
    "abilities.burn_it.name": "Brûler Ça",
    // B · 05f59299d740
    "abilities.burn_it.tags": ["offensif"],
    // B · 6bf1ae3bc2eb
    "abilities.burn_it.description": "Six étages de lattis sec et un siècle de peinture. Ce lieu a déjà brûlé une fois sur ce sol.",
    // B · 503eb62e7676
    "abilities.burn_it.targetRule": "ZONE",
    // B · 4c84c2c842d0
    "abilities.burn_it.check.attribute": "détermination",
    // B · 1de3d350589b
    "abilities.burn_it.requires.flagsSet": ["stood_on_the_stone"],
    // B · 748685606c73
    "abilities.burn_it.requires.lockedCopy": "Pas encore. Brûler l’immeuble avant de savoir ce qu’il y a dessous, c’est comme ça que ça s’est passé la première fois.",
    // A · d2e5cb38da06
    "abilities.give_it_a_name.name": "Donner un Nom",
    // B · 09b907576d49
    "abilities.give_it_a_name.tags": ["social"],
    // B · 1594fe2327d8
    "abilities.give_it_a_name.description": "Dis à voix haute, à l’immeuble, ce que tu es et ce que tu n’es pas. Ça agit sur le comportement, et un nom, c’est un comportement.",
    // B · c44e6dd70059
    "abilities.give_it_a_name.targetRule": "AUCUN",
    // B · cfb7a15645c3
    "abilities.give_it_a_name.check.attribute": "présence",
    // B · 1de3d350589b
    "abilities.give_it_a_name.requires.flagsSet": ["stood_on_the_stone"],
    // B · 2b9c131234f6
    "abilities.give_it_a_name.requires.lockedCopy": "Il faudrait savoir à qui tu parles, et pour l’instant tu parles à un couloir.",
    // A · 3b0ac39c3370
    "locations.room_309.name": "Chambre 309",
    // A · 84015f1a4d41
    "locations.room_309.shortName": "309",
    // B · f954287ff1ca
    "locations.room_309.description": "Vide depuis quatre ans et toujours meublée. Un lit dépouillé jusqu’au matelas, une armoire ouverte, et une chaise tournée vers la porte plutôt que vers la fenêtre. La lumière du couloir devant la 309 est sur un circuit différent des autres lumières du même étage, et son interrupteur est ici.",
    // B · d24d5a94cf5a
    "locations.room_309.stageImage": "story_hush_house/stage_room_309",
    // A · ecc23e939a95
    "locations.room_206.name": "Chambre 206",
    // A · 8f2a980ecd7d
    "locations.room_206.shortName": "206",
    // B · 8ee5c19aa708
    "locations.room_206.description": "La chambre de Tomas Reed, la plus rangée de l’immeuble parce qu’il y est presque jamais. Du ruban opaque sur la fenêtre, une bouilloire, un polaire vert plié, et un planning imprimé sur la porte avec plus de services que nécessaire.",
    // B · 158e73880389
    "locations.room_206.stageImage": "story_hush_house/stage_room_206",
    // A · c5435f8758b5
    "locations.room_405.name": "Chambre 405",
    // A · 9967de6d4d76
    "locations.room_405.shortName": "405",
    // B · 488c857fdbeb
    "locations.room_405.description": "Celle de Nia Bell, tout l’inverse : deux écrans posés sur une porte entre des tréteaux, des câbles scotchés le long des plinthes, et un tableau de photos imprimées à la bibliothèque avec des heures notées au marqueur.",
    // B · 006691de19f5
    "locations.room_405.stageImage": "story_hush_house/stage_room_405",
    // A · 8cb306e0084c
    "locations.morrowgate.name": "Le reste de Morrowgate",
    // A · 6c102355cf20
    "locations.morrowgate.shortName": "La Ville",
    // B · 7806b73410ef
    "locations.morrowgate.description": "Tout ce qui n’est pas cette rue : la caserne des ambulanciers près de Carrow Row où Tomas travaille, l’école d’art où Nia est officiellement inscrite, le bureau des archives où Ayame a un job dont elle ne parle pas, et environ quatre cent mille personnes qui n’ont jamais entendu parler de Bellweather Street. Il faut un quart d’heure pour aller quelque part et toute la journée pour revenir.",
    // B · 23e97afb7b06
    "locations.morrowgate.stageImage": "story_hush_house/stage_morrowgate",
    // A · 74b4052a61dd
    "locations.room_312.name": "Chambre 312",
    // A · be8744f16b18
    "locations.room_312.shortName": "312",
    // B · 6da79f6f37e0
    "locations.room_312.description": "Mieux que le prix ne le laisse penser : parquet massif, une grande baie vitrée sur la rue, un radiateur qui se met en marche tout seul à dix heures. Le mur de la chambre est mitoyen avec le 314, c’est comme ça que tu apprendras la plupart de ce que tu sais.",
    // B · e952dd2a1e83
    "locations.room_312.stageImage": "story_hush_house/stage_room_312",
    // A · a34b2c1a02ef
    "locations.hall_third.name": "Le couloir du troisième étage",
    // A · f22086efbf44
    "locations.hall_third.shortName": "3ᵉ étage",
    // B · ffbc820ac134
    "locations.hall_third.description": "Six portes, un tapis d’usure au milieu, et une lumière murale devant la 309 sur un circuit différent des autres. Personne n’a habité la 309 depuis quatre ans.",
    // B · c9fcc2305dce
    "locations.hall_third.stageImage": "story_hush_house/stage_hall_third",
    // A · 4bd6d334ba0e
    "locations.room_314.name": "Chambre 314",
    // A · aed3575bd120
    "locations.room_314.shortName": "314",
    // B · 86939135b7e8
    "locations.room_314.description": "La chambre d’Ayame. Deux matelas de feuilles accrochés au mur : un plan avec trois étages dessinés, un rapport d’incendie, un horaire de tram imprimé avec un service entouré. Elle a arrêté de s’excuser pour ça.",
    // B · 0225be6970a7
    "locations.room_314.stageImage": "story_hush_house/stage_room_314",
    // A · 1aad920fc298
    "locations.shared_kitchen.name": "La cuisine partagée",
    // A · 6777d1f0ceea
    "locations.shared_kitchen.shortName": "Cuisine",
    // B · fa1ae2109f07
    "locations.shared_kitchen.description": "Une moitié de l’étage trois, de l’époque où c’était une pension. Deux bouilloires, six étagères étiquetées, et un néon qui met quatre secondes à s’allumer. À trois heures du matin, c’est la meilleure pièce de l’immeuble.",
    // B · 319100ccd689
    "locations.shared_kitchen.stageImage": "story_hush_house/stage_shared_kitchen",
    // A · c194af3e6ded
    "locations.stairwell.name": "La cage d’escalier",
    // A · f05bc67c57e4
    "locations.stairwell.shortName": "Escalier",
    // B · 83dc847f6cb0
    "locations.stairwell.description": "Des marches en pierre, une rampe en fer, et un placard à chaque palier. Tomas Reed prend l’escalier à six heures du matin parce qu’il n’aime pas l’ascenseur et ne l’a jamais dit.",
    // B · ec6c55e772e5
    "locations.stairwell.stageImage": "story_hush_house/stage_stairwell",
    // A · 57b3c17eaeee
    "locations.lobby.name": "Le Hall",
    // A · 7a38753b5ce3
    "locations.lobby.shortName": "Hall",
    // B · 79247673dcce
    "locations.lobby.description": "Carrelage noir et blanc, un ascenseur avec une grille pliante en laiton, et le bureau de Mme Vale sous l’escalier avec une lampe allumée à toute heure. Le tableau derrière elle a six clés et onze crochets.",
    // B · 69bd99d2d5df
    "locations.lobby.stageImage": "story_hush_house/stage_lobby",
    // A · 956aa7520f44
    "locations.bellweather.name": "rue Bellweather",
    // A · c2475bf6fa39
    "locations.bellweather.shortName": "la rue",
    // B · dc14db3dcaa6
    "locations.bellweather.description": "Briques humides, câble de tram, deux immeubles plus récents qui encadrent Hush House, et un commissariat à quatre cents mètres avec un dossier vieux de quatre ans dans un tiroir.",
    // B · b915ec73d7c6
    "locations.bellweather.stageImage": "story_hush_house/stage_bellweather",
    // A · 57588251734e
    "locations.konbini.name": "le konbini",
    // A · a2915cf26262
    "locations.konbini.shortName": "Konbini",
    // B · 3bdff8466250
    "locations.konbini.description": "Ouvert toute la nuit, éclairé comme une salle d’opération, et le seul endroit de cette rue où il ne s’est jamais rien passé. Ayame y est la plupart des nuits entre une et deux heures.",
    // B · 691c11dfa53a
    "locations.konbini.stageImage": "story_hush_house/stage_konbini",
    // A · 7c6759bd7ffc
    "locations.rooftop.name": "le toit",
    // A · 7c6759bd7ffc
    "locations.rooftop.shortName": "le toit",
    // B · 9ecf1b933ae4
    "locations.rooftop.description": "Asphalte, une citerne d’eau, et une vue sur le vieux quartier jusqu’au port. La porte en haut des escaliers n’a jamais été verrouillée. Tout le monde dans l’immeuble est monté ici au moins une fois à quatre heures du matin.",
    // B · 98a556db9903
    "locations.rooftop.stageImage": "story_hush_house/stage_rooftop",
    // A · 05e16350a588
    "locations.floor_zero.name": "le rez-de-chaussée 0",
    // A · 05e16350a588
    "locations.floor_zero.shortName": "le rez-de-chaussée 0",
    // B · a73432de7379
    "locations.floor_zero.description": "L’ascenseur s’ouvre sur un couloir avec une fenêtre au bout. Hush House n’a pas de couloir avec une fenêtre au bout. Le tapis est la même bande, mais neuve, et les appliques murales sont à gaz.",
    // B · b225d3e2c19a
    "locations.floor_zero.stageImage": "story_hush_house/stage_floor_zero",
    // A · e956307d1878
    "locations.sub_basement.name": "Le Sous-Sol",
    // A · 1794e014a604
    "locations.sub_basement.shortName": "En Bas",
    // B · 4e51a39c72e4
    "locations.sub_basement.description": "Sous le sous-sol légal, derrière une arche maçonnée, le sol cesse d’être en béton pour devenir en pierre taillée. C’est de la maçonnerie d’hospice, récupérée et refaite, et quelqu’un l’a disposée en un motif qui n’est pas structurel.",
    // B · 632c2d5d2d82
    "locations.sub_basement.stageImage": "story_hush_house/stage_sub_basement",
    // B · 26105760a7ce
    "characters.ayame.name": "Ayame Kurose",
    // A · 5c804a7835eb
    "characters.ayame.role": "Chambre 314. Quatre ans d’enquête dont personne ne lui a demandé de s’occuper",
    // A · 76b4f130f6c8
    "characters.ayame.cardBlurb": "Ta voisine de l’autre côté du mur, qui t’offre un café et trois règles dès ta première nuit, sans jamais dire comment elle les connaît. Sa sœur a disparu de cet immeuble.",
    // B · aee35f364a88
    "characters.ayame.pronouns": "elle",
    // A · a84c35bbc8df
    "characters.ayame.publicTraits": ["Humour sec","On voit bien qu’elle ne dort pas","Plus courageuse à voix haute qu’elle ne l’est vraiment"],
    // B · 171211510c00
    "characters.ayame.hiddenDrives": ["Elle veut que quelqu’un d’autre dans cet immeuble voie ça aussi, pour ne plus être la seule témoin"],
    // B · ce4ad8295715
    "characters.ayame.values": ["Prévenir les gens des règles avant qu’ils en aient besoin","Ne pas mentir sur ce qu’elle a vraiment vu"],
    // B · d3b8c4668228
    "characters.ayame.fears": ["Que la chose à qui elle a parlé dix minutes soit vraiment Mika"],
    // A · f9c042b2e4e4
    "characters.ayame.socialStyle": "Elle évite la réponse avec une blague, puis elle finit par répondre vraiment environ quatre secondes plus tard.",
    // B · ad245e13ca5e
    "characters.ayame.boundaries": ["Ne rentrera pas dans le 309","Ne veut pas qu’on lui dise que sa sœur s’est enfuie"],
    // B · 2672e7d8eec0
    "characters.ayame.goals": ["Garder le nouveau locataire du 312 en vie pendant les quinze premiers jours","Découvrir ce qui est arrivé à Mika"],
    // B · 6f22729c0e7d
    "characters.ayame.secrets.ayame_opened_it.fact": "Elle a ouvert la porte à 2:13 une fois. Quelque chose portant le visage de Mika se tenait dans le couloir et elle l’a laissé lui parler pendant presque dix minutes.",
    // B · 47558a04be8d
    "characters.ayame.secrets.ayame_opened_it.visibility": "NPC_PRIVATE",
    // B · 5b77a662b2e6
    "characters.ayame.secrets.ayame_opened_it.revealHint": "Sur le toit avant l’aube, ou dans la cuisine à trois heures, si le joueur a été lui-même à la porte et ne la fait pas le dire en premier.",
    // B · 256c0d824354
    "characters.ayame.secrets.ayame_took_the_room.fact": "Elle n’a pas emménagé par hasard. Elle a attendu onze mois pour une chambre au troisième étage et a payé plus que le prix demandé pour l’obtenir.",
    // B · 47558a04be8d
    "characters.ayame.secrets.ayame_took_the_room.visibility": "NPC_PRIVATE",
    // B · aaff27ff2aec
    "characters.ayame.secrets.ayame_took_the_room.revealHint": "Elle le dit calmement la première fois que le joueur l’accuse de cacher quelque chose.",
    // A · a89855b61c45
    "characters.ayame.speechStyle": "Courte, moderne, sèche. Elle s’interrompt quand elle a peur et recommence ses phrases plus courtes. Elle déteste le vocabulaire occulte et le fait savoir.",
    // A · fdb9b64764d5
    "characters.ayame.topics": ["les trois règles","la chambre 309","Mika","pourquoi le loyer est bas","Mme Vale","le konbini"],
    // A · 4a271cc72147
    "characters.ayame.voiceSamples": ["Tu es le nouveau 312. Très bien. Avant de déballer quoi que ce soit de cher, il y a trois trucs que tu dois savoir.","Ne dis pas « présence ». Dis ce que tu as vu. Tu as vu une lumière et entendu frapper, alors dis ça.","Je vais pas te dire que c’est rien. Je vais te dire où est la porte coupe-feu.","Elle avait vingt-deux ans. Elle avait un rendez-vous chez le dentiste un jeudi. Ceux qui fuient, ils annulent pas le dentiste."],
    // B · e4392e8358eb
    "characters.ayame.appearance": "Vingt-deux ans, longs cheveux noirs avec un reflet rouge vin qui n’apparaît qu’à la lumière de la cage d’escalier, yeux ambre-brun, mince et rapide, un gros pull charbon par-dessus tout.",
    // B · 85747f2161e6
    "characters.ayame.visualHook": "Yeux ambre-brun avec des cernes permanentes, et une manche tirée sur une main.",
    // B · ffad7301116b
    "characters.ayame.silhouette": "Fine, mains dans les manches d’un pull deux tailles trop grand, toujours à un demi-pas en retrait d’une porte.",
    // B · 1ecbeaf403f7
    "characters.ayame.artSeed": "hush-ayame-01",
    // B · 7eaaed77331e
    "characters.ayame.portrait": "story_hush_house/ayame",
    // B · 5447edd99c3d
    "characters.ayame.expressions": ["neutre","amusée","effrayée","épuisée"],
    // B · aff0ce0dc975
    "characters.ayame.knowledgeScope": ["hush_house","mika","the_rules","room_309","floor_zero","bellweather"],
    // B · 472952a0b816
    "characters.ayame.gates.ayame_shares_the_wall.label": "Elle te montre le mur dans le 314",
    // B · 55a54e80451a
    "characters.ayame.gates.ayame_shares_the_wall.kind": "CONFIANCE",
    // B · 02e8e8bad81e
    "characters.ayame.gates.ayame_shares_the_wall.requires.flagsSet": ["knows :the_three_rules"],
    // B · 11d025d41b17
    "characters.ayame.gates.ayame_tells_you_about_the_door.label": "Elle te raconte ce qui s’est passé à 2:13",
    // B · 55a54e80451a
    "characters.ayame.gates.ayame_tells_you_about_the_door.kind": "CONFIANCE",
    // B · f9e0ee190dce
    "characters.ayame.gates.ayame_romance.label": "Elle arrête de te voir comme quelqu’un qu’elle doit garder en vie",
    // B · 0b75bc536447
    "characters.ayame.gates.ayame_romance.kind": "ROMANCE",
    // B · 3eddd087aa82
    "characters.vale.name": "Mme Elara Vale",
    // A · 9fbd87d2554c
    "characters.vale.role": "Propriétaire, quatrième de sa famille à gérer la location",
    // A · 84fbe02ce6cf
    "characters.vale.cardBlurb": "Elle gère Hush House depuis plus longtemps que les papiers ne le disent et répond systématiquement à côté. Elle ne vous ment pas, pas vraiment, et elle ne compte pas vous aider.",
    // B · aee35f364a88
    "characters.vale.pronouns": "elle",
    // A · 08541f8b3a0e
    "characters.vale.publicTraits": ["Aimable","Un brin vieille école","Jamais surprise par rien"],
    // B · bf968fc51b5a
    "characters.vale.hiddenDrives": ["Elle a hérité d’obligations que personne n’a expliquées et a passé quarante ans à essayer de comprendre ça de l’extérieur"],
    // B · c67f246afa19
    "characters.vale.values": ["Garder l’immeuble occupé","Ne jamais mentir franchement"],
    // B · 39fc83d599f3
    "characters.vale.fears": ["Un expert avec un droit légal d’entrée"],
    // A · de2578985c74
    "characters.vale.socialStyle": "Répond à côté avec chaleur, et vous laisse comprendre à votre rythme.",
    // B · 36e53b4c06de
    "characters.vale.boundaries": ["Ne parle pas de l’ancien locataire du 312","Ne descend pas sous le sous-sol"],
    // B · 2544bf82f7cc
    "characters.vale.goals": ["Garder le sous-sol fermé","Avoir quelqu’un prêt à reprendre le bail après elle"],
    // B · cd736859ae6c
    "characters.vale.secrets.vale_the_agreement.fact": "L’accord familial les oblige à garder l’immeuble occupé et le sous-sol scellé. Il ne dit pas qui est l’autre partie, et aucun d’eux ne l’a jamais su.",
    // B · 47558a04be8d
    "characters.vale.secrets.vale_the_agreement.visibility": "NPC_PRIVATE",
    // B · bd7e11f78651
    "characters.vale.secrets.vale_the_agreement.revealHint": "Elle remet elle-même le registre une fois que le joueur est descendu et remonté.",
    // B · 7fd7812f0a3f
    "characters.vale.secrets.vale_the_last_tenant.fact": "L’ancien locataire du 312 n’est pas parti. Son courrier est dans une boîte derrière son bureau et elle continue de le faire suivre, à une adresse qui n’existe pas.",
    // B · 47558a04be8d
    "characters.vale.secrets.vale_the_last_tenant.visibility": "NPC_PRIVATE",
    // B · 52686720ec7b
    "characters.vale.secrets.vale_the_last_tenant.revealHint": "Elle l’admet si le joueur a les quatre heures d’enregistrement et les lui fait écouter.",
    // A · 20b50cc1d661
    "characters.vale.speechStyle": "Chaleureuse, posée, un peu formelle. Dit « cher » sans condescendance. Répond à une question par une vérité sur un autre sujet.",
    // A · 807e452a384c
    "characters.vale.topics": ["le loyer","l’histoire de l’immeuble","le dernier locataire","l’inspection","la chambre 309"],
    // A · b23b10d344d0
    "characters.vale.voiceSamples": ["Un vieil immeuble, cher. Une vieille réputation. Les radiateurs sont formidables.","Je ne saurais vous dire ce qui se cache sous le sous-sol. Personne n’a réussi à me le dire non plus.","Vous pouvez bien sûr lui poser la question. Je préfère que vous ne me la posiez pas dans le hall.","L’ascenseur fait ça. Ça lui arrive depuis avant que j’aie ce bureau, et j’ai ce bureau depuis longtemps."],
    // B · 29cc1ff51aa6
    "characters.vale.appearance": "Soixante-huit ans, cheveux argentés relevés, un cardigan avec les clés de l’immeuble dans la poche gauche, des lunettes de lecture sur une chaîne qu’elle n’utilise jamais.",
    // B · 5a4bd8ad7133
    "characters.vale.visualHook": "Un anneau de onze porte-clés en laiton dans la poche du cardigan, audible avant qu’elle soit visible.",
    // B · 7caff46ab0ab
    "characters.vale.silhouette": "Petite et très droite, assise à un bureau avec une lampe verte, mains croisées.",
    // B · 12c2e1f95b7e
    "characters.vale.artSeed": "hush-vale-01",
    // B · 6fa7bdaaa498
    "characters.vale.portrait": "story_hush_house/vale",
    // B · 668b9a11b0e0
    "characters.vale.expressions": ["neutre","chaleureuse","fermée"],
    // B · f3ce2c955e02
    "characters.vale.knowledgeScope": ["hush_house","the_agreement","saint_orra","room_309","bellweather"],
    // B · a27e92224136
    "characters.vale.gates.vale_gives_the_ledger.label": "Elle te laisse lire l’accord",
    // B · 55a54e80451a
    "characters.vale.gates.vale_gives_the_ledger.kind": "CONFIANCE",
    // B · 480046818f61
    "characters.vale.gates.vale_gives_the_ledger.requires.flagsSet": ["knows :the_hospice"],
    // B · 4891f3b38eb5
    "characters.vale.gates.vale_offers_it.label": "Elle demande si tu veux le reprendre",
    // B · 9e8ae18bf8bf
    "characters.vale.gates.vale_offers_it.kind": "ALLIANCE",
    // B · 1de3d350589b
    "characters.vale.gates.vale_offers_it.requires.flagsSet": ["stood_on_the_stone"],
    // B · f1e228eb0ba5
    "characters.tomas.name": "Tomas Reed",
    // A · 8a6be26fdb0e
    "characters.tomas.role": "Chambre 206. Ambulancier, de nuit",
    // A · c75eb464a6a4
    "characters.tomas.cardBlurb": "La personne la plus rationnelle de l’immeuble, celle qui vous dira clairement ce qu’il a vu deux fois dans la cage d’escalier — puis expliquera ça autrement en reprenant un service pour ne pas avoir à y penser.",
    // B · fcca6b746d0b
    "characters.tomas.pronouns": "il/lui",
    // A · 14fd41ccfa7d
    "characters.tomas.publicTraits": ["Pragmatique","Sèche","Toujours en déficit de quatre heures de sommeil"],
    // B · 3cb460c0841f
    "characters.tomas.hiddenDrives": ["Il essaie de réunir la caution assez vite pour sortir son petit frère de l’appartement de leur mère"],
    // B · 0349cdfb9a77
    "characters.tomas.values": ["Être utile","Ne pas effrayer ceux qui ne peuvent pas partir"],
    // B · 7a7a77bfa2f5
    "characters.tomas.fears": ["Découvrir que ce qu’il peut expliquer n’a pas d’explication"],
    // A · 0d34ef9cbff1
    "characters.tomas.socialStyle": "Vous évalue comme un patient, vous dit ce qu’il pense, sans insister.",
    // B · 58b04871edc8
    "characters.tomas.boundaries": ["Ne prend pas l’ascenseur","Ne laisse personne l’appeler courageux"],
    // B · de3a5d660107
    "characters.tomas.goals": ["Réunir la caution avant le printemps","Ne pas avoir à dire à voix haute ce qu’il a vu dans l’escalier"],
    // B · 5e7363a2a847
    "characters.tomas.secrets.tomas_the_patient.fact": "Il a vu deux fois le même patient mort dans la cage d’escalier — un homme qu’il a soigné quarante minutes dans une ambulance en mars, debout sur le palier du deuxième étage, qui attend.",
    // B · 47558a04be8d
    "characters.tomas.secrets.tomas_the_patient.visibility": "NPC_PRIVATE",
    // B · ca1b5b895b98
    "characters.tomas.secrets.tomas_the_patient.revealHint": "Il le raconte au joueur à la fin d’un service, dans la cuisine, comme s’il décrivait un symptôme.",
    // A · b027cfd692f0
    "characters.tomas.speechStyle": "À la fois clinique et chaleureux. Donne son constat avant la conclusion, à chaque fois.",
    // A · e1f78286c1d6
    "characters.tomas.topics": ["les escaliers","les services de nuit","son frère","l’ascenseur","ce qu’il a vraiment vu"],
    // A · 03acd15cc606
    "characters.tomas.voiceSamples": ["Assieds-toi. Pieds bien à plat, tête entre les genoux si ça devient flou. Parle quand tu peux parler.","Voies aériennes, respiration, circulation. Puis ce truc sur le palier. Dans cet ordre, parce que les trois premiers, c’est ce que je peux gérer.","J’ai déjà descendu des gens par ces escaliers. Du quatrième palier au hall, ça prend cinquante-et-une secondes avec deux personnes et une chaise.","Tu veux que je te dise ce que c’était. Je peux te dire que ton pouls était à cent quarante et que tu n’inventais rien."],
    // B · 4449efadbe7e
    "characters.tomas.appearance": "Trente et un ans, cheveux très courts, polaire verte du service ambulancier qu’il ne quitte jamais, avant-bras d’un gars qui soulève des gens pour vivre.",
    // B · babf12b4a5ee
    "characters.tomas.visualHook": "Une polaire verte avec l’écusson de l’épaule à moitié décousu, portée à l’intérieur à toute heure.",
    // B · ae60e38c53bc
    "characters.tomas.silhouette": "Solide, large d’épaules, toujours une tasse tenue à deux mains comme si ça le maintenait droit.",
    // B · 683f8c72116c
    "characters.tomas.artSeed": "hush-tomas-01",
    // B · bfac3bf70c6d
    "characters.tomas.portrait": "story_hush_house/tomas",
    // B · 7f85838f8595
    "characters.tomas.expressions": ["neutre","fatigué","inquiet"],
    // B · a455b9407d9b
    "characters.tomas.knowledgeScope": ["hush_house","bellweather","the_stairs","morrowgate"],
    // B · c47765a6ebe3
    "characters.tomas.gates.tomas_says_it.label": "Il décrit l’homme sur le palier",
    // B · 55a54e80451a
    "characters.tomas.gates.tomas_says_it.kind": "CONFIANCE",
    // B · db2ede276841
    "characters.nia.name": "Nia Bell",
    // A · aa34baf332ce
    "characters.nia.role": "Chambre 405. Étudiante en art, et la documentariste non invitée de l’immeuble",
    // A · 77eebfafe099
    "characters.nia.cardBlurb": "Elle a onze minutes d’une caméra dans un couloir qui n’existe pas et ne l’a pas posté, c’est la chose la plus calme qu’elle ait jamais faite. Elle aimerait que tu sois dans la prochaine.",
    // B · aee35f364a88
    "characters.nia.pronouns": "elle",
    // A · 616453b61c3f
    "characters.nia.publicTraits": ["Rapide","Curieuse au point d’en être impolie","Vraiment douée"],
    // B · 1183c4d5efe3
    "characters.nia.hiddenDrives": ["Elle est plus effrayée qu’elle ne le montre, et publier ça ferait du problème de quelqu’un d’autre"],
    // B · 0f666b94a400
    "characters.nia.values": ["Créer la chose","Ne pas se faire mentir"],
    // B · d1d205406afb
    "characters.nia.fears": ["Être ignorée","Être la seule à la croire"],
    // A · 40dc2de1212c
    "characters.nia.socialStyle": "Elle te coupe joyeusement la parole, puis répète ta meilleure phrase une heure plus tard, parfaitement.",
    // B · dfced31e8671
    "characters.nia.boundaries": ["Ne supprimera pas le fichier","Ne filmera pas Ayame sans demander, pas depuis mars"],
    // B · 57685ff4a249
    "characters.nia.goals": ["Obtenir une séquence que personne ne peut expliquer","Ne plus être seule dans l’immeuble à deux heures du matin"],
    // B · ece57c14a767
    "characters.nia.secrets.nia_the_corridor.fact": "Les onze minutes ont été filmées à 02:11 depuis l’intérieur de l’ascenseur. Elle n’a jamais dit à personne que les portes se sont ouvertes toutes seules.",
    // B · 47558a04be8d
    "characters.nia.secrets.nia_the_corridor.visibility": "NPC_PRIVÉ",
    // B · 40d6d9d2a63b
    "characters.nia.secrets.nia_the_corridor.revealHint": "Elle l’admet quand le joueur a vu le niveau 0 lui-même et le dit en premier.",
    // A · 751b767006aa
    "characters.nia.speechStyle": "Son rythme en ligne, à voix haute. Des phrases hachées, elle s’interrompt parfois, un peu brutalement, toujours un peu trop tard.",
    // A · d4282d09e059
    "characters.nia.topics": ["les images","l’ascenseur","l’étage 0","sa chaîne","chambre 309","Mika"],
    // A · 8e0e936e663c
    "characters.nia.voiceSamples": ["Ok alors — ne sois pas bizarre — tu veux voir un truc vraiment fou, ou tu es une personne normale.","Je ne vais pas la publier. Je sais. Je sais ce que je suis. Je ne la publierai pas.","Désolée, ça sonnait comme un podcast de true crime. C’est sa vraie sœur. Je le sais."],
    // B · d0c9c101d388
    "characters.nia.appearance": "Vingt ans, cheveux décolorés avec les racines volontairement repoussées, peinture sur trois doigts, un téléphone dans une coque fissurée qu’elle refuse de changer.",
    // B · e9c178277362
    "characters.nia.visualHook": "Un téléphone dans une coque en toile d’araignée, tenu à hauteur de poitrine même en conversation.",
    // B · 9ff10870e164
    "characters.nia.silhouette": "Petite, agitée, un bras toujours levé tenant quelque chose au niveau des yeux.",
    // B · cd239f1c5d4a
    "characters.nia.artSeed": "hush-nia-01",
    // B · 08499afd3bcb
    "characters.nia.portrait": "story_hush_house/nia",
    // B · c1f7c9f8fb24
    "characters.nia.expressions": ["neutre","ravie","secouée"],
    // B · 8fd0a94e535d
    "characters.nia.knowledgeScope": ["hush_house","floor_zero","the_lift","bellweather","morrowgate"],
    // B · 9284a2dfa74b
    "characters.nia.gates.nia_shows_you.label": "Elle te montre les onze minutes",
    // B · 55a54e80451a
    "characters.nia.gates.nia_shows_you.kind": "CONFIANCE",
    // B · b858b03a088b
    "characters.nia.gates.nia_holds_it.label": "Elle accepte de ne pas les publier",
    // B · 9e8ae18bf8bf
    "characters.nia.gates.nia_holds_it.kind": "ALLIANCE",
    // B · f3fd07671a26
    "characters.nia.gates.nia_holds_it.requires.flagsSet": ["sait :floor_zero"],
    // B · 0b197bcb1c9d
    "characters.mika.name": "Mika Kurose",
    // A · c760bee555f8
    "characters.mika.role": "Disparue depuis quatre ans. Pourtant, elle apparaît plus souvent que ça ne devrait être possible",
    // A · 32d78785a45f
    "characters.mika.cardBlurb": "La sœur aînée d’Ayame, que la police a classée en fugue. Elle est chaleureuse, elle se rappelle de toi, et de temps en temps elle se trompe sur un petit détail de sa propre vie.",
    // B · aee35f364a88
    "characters.mika.pronouns": "elle",
    // A · 831dc89e535b
    "characters.mika.publicTraits": ["Chaleureuse","Familiarité","Un peu dépassée"],
    // B · baf1f84237fe
    "characters.mika.hiddenDrives": ["Quoi qu’elle soit, elle cherche à être reconnue, et être corrigée la bouleverse plus que tout"],
    // B · 90e807d271df
    "characters.mika.values": ["Sa sœur","Être reconnue"],
    // B · 114e76d14077
    "characters.mika.fears": ["Qu’on lui dise qu’elle n’est pas Mika"],
    // A · 38b87975eccc
    "characters.mika.socialStyle": "Elle te parle comme si on s’était déjà vus, et laisse les petits silences durer une seconde de trop.",
    // B · debcc66ac51f
    "characters.mika.boundaries": ["Ne franchira pas un seuil sans y être invitée","Ne dira pas ce qu’il y a sous l’immeuble"],
    // B · 1a5a0a454a75
    "characters.mika.goals": ["Atteindre Ayame","Être laissée entrer"],
    // B · a40c1aee503e
    "characters.mika.secrets.mika_what_she_is.fact": "Ce qu’elle est n’a jamais été tranché : originale, reste, répétition, ou quelque chose que l’immeuble a assemblé en quatre ans d’une sœur qui lui manque. Le monde ne le résout pas tout seul.",
    // B · 97d1bcd768a7
    "characters.mika.secrets.mika_what_she_is.visibility": "CRÉATEUR_SEUL",
    // B · 8417d1961652
    "characters.mika.secrets.mika_what_she_is.revealHint": "Jamais confirmé tôt, et jamais confirmé du tout sauf si le joueur force une réponse sous le sous-sol. Même là, laisse une porte ouverte.",
    // A · 2486cfbb4daa
    "characters.mika.speechStyle": "Simple, affectueuse, tranquille. Elle utilise un argot ancien. Parfois, elle répète une phrase déjà dite en changeant un mot.",
    // A · acc1c61c7287
    "characters.mika.topics": ["Ayame","l’appart où elles ont grandi","la nuit où elle est partie","ce qu’il y a en bas"],
    // A · bafa3ab7db8c
    "characters.mika.voiceSamples": ["Tu es encore debout tard. Elle aussi, tu sais. Elle a toujours fait ça.","J’ai pris le tram. Celui qui passe devant. C’était le — le numéro quatre, non ? C’était le numéro quatre.","Tu n’es pas obligé de me laisser entrer. Je voulais juste voir qui habite maintenant au 312."],
    // B · d0aba4101606
    "characters.mika.appearance": "Vingt-deux ans et reste vingt-deux. Un manteau vert pâle démodé de quatre ans, cheveux noirs, les mêmes yeux ambrés que sa sœur.",
    // B · 945b9d01f8a0
    "characters.mika.visualHook": "Un manteau vert pâle, toujours un peu humide, alors qu’il fait sec depuis une semaine.",
    // B · dbf75a08264d
    "characters.mika.silhouette": "Très immobile, mains le long du corps, un demi-pas en retrait de la lumière.",
    // B · 335bd87e3a05
    "characters.mika.artSeed": "hush-mika-01",
    // B · 0c08a852afca
    "characters.mika.portrait": "story_hush_house/mika",
    // B · 2e82859d8508
    "characters.mika.expressions": ["neutre","chaleureuse","perplexe"],
    // B · ac08a0cf8ffa
    "characters.mika.knowledgeScope": ["mika","hush_house","saint_orra","les_règles"],
    // B · 6c1e43d75054
    "characters.mika.gates.mika_speaks_plainly.label": "Elle arrête de faire semblant d’aller bien",
    // B · 55a54e80451a
    "characters.mika.gates.mika_speaks_plainly.kind": "CONFIANCE",
    // B · 1de3d350589b
    "characters.mika.gates.mika_speaks_plainly.requires.flagsSet": ["stood_on_the_stone"],
    // B · b2772dc92700
    "factions.faction_tenants.name": "L’Immeuble",
    // B · 94ab95e77218
    "factions.faction_tenants.description": "Six chambres occupées et les gens qui y vivent. Ce qu’ils pensent de toi décide qui te répond à la porte à quatre heures du matin.",
    // B · 6ec5397b1fc6
    "factions.faction_city.name": "Morrowgate",
    // B · f3267d122e55
    "factions.faction_city.description": "Le commissariat, l’inspection du logement, la presse locale, et tous ceux qui décident si tu es un témoin ou un symptôme.",
    // B · 2fdd84126c46
    "quests.q_three_rules.title": "Trois choses à savoir",
    // B · 9c9f5dff23dd
    "quests.q_three_rules.summary": "Ta voisine est là, à la porte, avec deux cafés et une liste. Ce que tu fais de cette liste, c’est toi qui vois.",
    // B · 7fcc0be2ad9c
    "quests.q_three_rules.kind": "PRINCIPALE",
    // B · 0e1136ab221b
    "quests.q_three_rules.steps.hear_her_out.playerCopy": "Comprends ce qu’Ayame Kurose fait devant ta porte.",
    // B · 90d517780637
    "quests.q_three_rules.steps.hear_her_out.directorNotes": "Elle donnera les trois règles que le joueur soit poli ou pas — elle a décidé que c’est son rôle. La variable intéressante, c’est ce que le joueur en fait : les prendre au sérieux, rire, tester une tout de suite, ou fermer la porte. Aucune de ces options ne doit être punie.",
    // B · 72bbd26cd0f5
    "quests.q_three_rules.steps.hear_her_out.rewards.flags": ["first_night","house_barely_knows_you"],
    // B · 05a8d8ca9b9e
    "quests.q_three_rules.steps.the_first_2_13.playerCopy": "Décide ce que tu fais quand les coups commencent.",
    // B · a11794ce878a
    "quests.q_three_rules.steps.the_first_2_13.directorNotes": "Deux heures treize du matin, trois coups, et la voix d’Ayame de l’autre côté de la porte qui s’excuse de te réveiller. Elle dort dans la chambre 314. Le joueur peut attendre, ouvrir, enregistrer, ou dormir. Rien ici ne tue personne : ouvrir, c’est une porte vers plus d’histoire, pas un échec.",
    // B · 31ef5b207950
    "quests.q_three_rules.steps.the_first_2_13.enterWhen.flagsSet": ["first_night"],
    // B · 49319e10d484
    "quests.q_three_rules.steps.the_first_2_13.rewards.flags": ["knows :the_knocking"],
    // B · 9cc41d54e76e
    "quests.q_three_rules.involvedCharacterIds": ["ayame","vale"],
    // B · 439bbbcd8c60
    "quests.q_three_rules.involvedLocationIds": ["room_312","hall_third"],
    // B · 895deb09296c
    "quests.q_three_rules.knownRewardCopy": "Quoi qu’il en soit, elle pense que c’est ce qu’il te faut pour survivre les quinze premiers jours.",
    // B · 5d639aa14fb0
    "quests.q_what_the_house_keeps.title": "Ce que l’Immeuble garde",
    // B · 7a46bf4d1403
    "quests.q_what_the_house_keeps.summary": "Une femme a disparu de cet immeuble il y a quatre ans et le rez-de-chaussée n’est pas la fin de l’histoire.",
    // B · 7fcc0be2ad9c
    "quests.q_what_the_house_keeps.kind": "PRINCIPALE",
    // B · 49319e10d484
    "quests.q_what_the_house_keeps.discoverWhen.flagsSet": ["knows :the_knocking"],
    // B · 3e9f2e58b1a9
    "quests.q_what_the_house_keeps.steps.find_out_about_mika.playerCopy": "Découvre ce qui est vraiment arrivé à Mika Kurose.",
    // B · c266403fed8c
    "quests.q_what_the_house_keeps.steps.find_out_about_mika.directorNotes": "Trois sources vraiment différentes et elles ne sont pas d’accord. Ayame a la vérité émotionnelle et les pires preuves. Nia a des images sans savoir ce qu’elles signifient. Vale a les papiers et refuse de les interpréter. Chacune suffit à avancer.",
    // B · 7a091e365388
    "quests.q_what_the_house_keeps.steps.find_out_about_mika.rewards.flags": ["looking_for_mika"],
    // B · 946a30d46f0c
    "quests.q_what_the_house_keeps.steps.under_the_basement.playerCopy": "Descends sous le sous-sol.",
    // B · 6e369da57738
    "quests.q_what_the_house_keeps.steps.under_the_basement.directorNotes": "L’arche murée est réelle, elle est ancienne, et elle ne soutient rien. La découper fait du bruit et Vale l’entendra. Obtenir la permission lui coûte quelque chose qu’elle ne récupérera pas. Faire venir l’inspection règle le problème et livre l’immeuble à la ville.",
    // B · 7a091e365388
    "quests.q_what_the_house_keeps.steps.under_the_basement.enterWhen.flagsSet": ["looking_for_mika"],
    // B · c1014e12bd16
    "quests.q_what_the_house_keeps.steps.under_the_basement.rewards.flags": ["knows :the_hospice","stood_on_the_stone"],
    // B · 1fec80c188b0
    "quests.q_what_the_house_keeps.steps.under_the_basement.rewards.abilities": ["break_it","burn_it","give_it_a_name"],
    // B · 0b5176af432a
    "quests.q_what_the_house_keeps.steps.what_you_do_with_it.playerCopy": "Décide ce que tu fais de ce qui est sous l’Immeuble.",
    // B · 0805d915bcf8
    "quests.q_what_the_house_keeps.steps.what_you_do_with_it.directorNotes": "Il n’y a pas de bonne option ni d’option gratuite. Briser le schéma libère ce que l’immeuble gardait, y compris des choses que personne n’a jamais vues. Le brûler met fin au phénomène et fait perdre leur maison à six personnes. Prendre l’accord fait du joueur le prochain Vale. Le laisser garder les choses est un vrai choix de personne effrayée.",
    // B · 1de3d350589b
    "quests.q_what_the_house_keeps.steps.what_you_do_with_it.enterWhen.flagsSet": ["stood_on_the_stone"],
    // B · f924f414d941
    "quests.q_what_the_house_keeps.steps.what_you_do_with_it.rewards.flags": ["knows :what_it_is"],
    // B · e4e9f73aff80
    "quests.q_what_the_house_keeps.steps.who_comes_out.playerCopy": "Découvre qui, si quelqu’un, remonte les escaliers.",
    // B · f2f1bede0756
    "quests.q_what_the_house_keeps.steps.who_comes_out.directorNotes": "Délibérément sans réponse claire. Si Mika sort, ne confirme pas ce qu’elle est. Si elle ne sort pas, ne confirme pas non plus. Le joueur peut croire ce qu’il veut, et Ayame croira autre chose.",
    // B · f924f414d941
    "quests.q_what_the_house_keeps.steps.who_comes_out.enterWhen.flagsSet": ["knows :what_it_is"],
    // B · 47b03e81041d
    "quests.q_what_the_house_keeps.steps.who_comes_out.rewards.flags": ["sait :mika_reponse"],
    // B · 34f893c9ed96
    "quests.q_what_the_house_keeps.involvedCharacterIds": ["ayame","vale","nia","mika"],
    // B · 7248d0616b62
    "quests.q_what_the_house_keeps.involvedLocationIds": ["chambre_314","hall","sous_sol","etage_zero"],
    // B · f8dd31457d4f
    "quests.q_what_the_house_keeps.knownRewardCopy": "Une réponse à propos de Mika Kurose, d’une certaine sorte. Peut-être pas celle que tout le monde voulait.",
    // B · 2b1647d298e3
    "quests.q_ayame.title": "Celle qui a ouvert",
    // B · 05136f58f20d
    "quests.q_ayame.summary": "Elle t’a donné la règle du 2:13 sans sourciller, alors qu’elle l’avait elle-même enfreinte.",
    // B · 552c0b7f83c2
    "quests.q_ayame.kind": "SECONDAIRE",
    // B · 9942349da7aa
    "quests.q_ayame.discoverWhen.flagsSet": ["sait :mika_disparue"],
    // B · ac96803a6346
    "quests.q_ayame.steps.what_she_did.playerCopy": "Découvre pourquoi Ayame est si sûre de la troisième règle.",
    // B · 5f7b794c3965
    "quests.q_ayame.steps.what_she_did.directorNotes": "Elle dira au joueur qui a été à la porte lui-même, sans qu’il ait à la faire parler en premier. Elle sera aussi acculée par la photo, et être acculée coûte quelque chose que la confiance ne coûte pas.",
    // B · 2bbd966b114d
    "quests.q_ayame.steps.what_she_did.rewards.flags": ["ayame_ta_dit"],
    // B · 29a46f5a1cf2
    "quests.q_ayame.steps.after_that.playerCopy": "Comprends ce que vous êtes devenues, toutes les deux.",
    // B · bc8fdfcf9aaf
    "quests.q_ayame.steps.after_that.directorNotes": "Les deux fins sont réelles pour elle et aucune n’est une punition. Elle peut quitter Hush House et avoir raison. Elle peut aussi rester pour une raison qui n’est pas l’enquête.",
    // B · 2bbd966b114d
    "quests.q_ayame.steps.after_that.enterWhen.flagsSet": ["ayame_ta_dit"],
    // B · f08323660893
    "quests.q_ayame.involvedCharacterIds": ["ayame"],
    // B · 25ecd7c334bd
    "quests.q_ayame.involvedLocationIds": ["toit","cuisine_partagee","chambre_314"],
    // B · 1f7797b56280
    "quests.q_ayame.knownRewardCopy": "La vérité sur ces dix minutes, et ce que vous êtes devenues, toutes les deux, ensuite.",
    // B · 814be7cbbc46
    "quests.q_the_footage.title": "Onze minutes",
    // B · 8d268d44595e
    "quests.q_the_footage.summary": "Nia Bell a une vidéo d’un couloir qui n’existe pas dans cet immeuble, et elle hésite à la publier.",
    // B · eff80c847ff6
    "quests.q_the_footage.kind": "PRINCIPALE",
    // B · 02e8e8bad81e
    "quests.q_the_footage.discoverWhen.flagsSet": ["sait :les_trois_regles"],
    // B · 701f8f75fc51
    "quests.q_the_footage.steps.the_hallway.playerCopy": "Regarde ces onze minutes par toi-même.",
    // B · 4f1e2e4bd518
    "quests.q_the_footage.steps.the_hallway.directorNotes": "Le couloir dans la vidéo, c’est l’étage 0, filmé de l’intérieur de l’ascenseur. Nia ne le sait pas. Un joueur qui y est allé reconnaît tout de suite le tapis coureur.",
    // B · f3fd07671a26
    "quests.q_the_footage.steps.the_hallway.rewards.flags": ["sait :etage_zero"],
    // B · 51718eb3055c
    "quests.q_the_footage.steps.whether_it_goes_out.playerCopy": "Décide si ces onze minutes de Hush House doivent être rendues publiques.",
    // B · 8c4793626305
    "quests.q_the_footage.steps.whether_it_goes_out.directorNotes": "Publier n’est pas une erreur. Ça fait entrer la ville, ce qui empêche que l’immeuble reste un problème privé de Mme Vale — et ça fait aussi du joueur quelqu’un avec des opinions affichées sur le visage.",
    // B · f3fd07671a26
    "quests.q_the_footage.steps.whether_it_goes_out.enterWhen.flagsSet": ["sait :etage_zero"],
    // B · 5f7e3e51fad6
    "quests.q_the_footage.involvedCharacterIds": ["nia","vale"],
    // B · 6228315e34ee
    "quests.q_the_footage.involvedLocationIds": ["escalier","etage_zero","bellweather"],
    // B · e2d32c53cbf4
    "quests.q_the_footage.knownRewardCopy": "La preuve de quelque chose, et ce qui arrive à un immeuble quand une preuve existe.",
    // B · 49cbd1a87134
    "worldEvents.we_red_light.publicCopy": "La lumière murale devant la porte 309 est rouge. Pas rouge tamisée, pas clignotante — rouge, fixe, comme une chambre noire, et les cinq autres lumières du couloir sont exactement comme avant.",
    // B · 217a165273fa
    "worldEvents.we_red_light.directorNotes": "La première règle, rendue physique, quatre heures après qu’elle l’a donnée. Si le joueur regarde dans le judas, il voit l’intérieur de sa propre chambre depuis la porte, à l’heure qu’il est.",
    // B · b501ae673c01
    "worldEvents.we_red_light.setsFlags": ["sait :la_lumiere_rouge"],
    // B · 31ef5b207950
    "worldEvents.we_red_light.requiresFlags": ["premiere_nuit"],
    // B · 139772a25f62
    "worldEvents.we_the_knocking.publicCopy": "Trois coups à la porte du 312. Puis la voix d’Ayame, basse, gênée : « Désolée — désolée, tu es réveillé ? C’est moi. Tu peux ouvrir ? »",
    // B · 43ac25c7ae6c
    "worldEvents.we_the_knocking.directorNotes": "Ayame dort dans le 314, un mur à côté, et le joueur peut entendre son radiateur qui claque à travers. La voix est exactement la sienne, y compris quand elle s’interrompt. Elle va continuer à demander pendant environ quatre minutes, puis s’arrêter.",
    // B · b6cd616a81f4
    "worldEvents.we_the_knocking.setsFlags": ["entendu_les_coups"],
    // B · 31ef5b207950
    "worldEvents.we_the_knocking.requiresFlags": ["premiere_nuit"],
    // B · 7ecbbc861f2f
    "worldEvents.we_the_copy.publicCopy": "Il y a une tasse sur l’égouttoir dans le 312 que tu possédais déjà, dans un autre appartement, dans une autre ville. Elle a le même éclat au même endroit. Tu ne l’as pas apportée ici.",
    // B · 96f2aa65ccd5
    "worldEvents.we_the_copy.directorNotes": "La chambre 312 a commencé à reproduire la vie du joueur plutôt que celle de l’immeuble. Ce que le joueur a écrit à son sujet au départ sert de matière — utilise ses propres détails, pas un générique.",
    // B · 51e40563efa7
    "worldEvents.we_the_copy.setsFlags": ["la_maison_a_ta_forme"],
    // B · 49319e10d484
    "worldEvents.we_the_copy.requiresFlags": ["sait :le_toc"],
    // B · 8e6fda9ef0d6
    "worldEvents.we_floor_zero.publicCopy": "L’ascenseur arrive sans qu’on l’ait appelé. L’affichage indique 0. Les portes restent ouvertes sur un couloir avec une grande fenêtre au bout, et les lumières qui l’éclairent sont des lampes à gaz.",
    // B · 8688174153aa
    "worldEvents.we_floor_zero.directorNotes": "La deuxième règle. Il attend aussi longtemps que le joueur. Sortir est survivable et pas gratuit — le couloir est celui de Saint Orra, et la fenêtre donne sur Bellweather Street sans câble de tram.",
    // B · f3fd07671a26
    "worldEvents.we_floor_zero.setsFlags": ["sait :étage_zéro"],
    // B · 49319e10d484
    "worldEvents.we_floor_zero.requiresFlags": ["sait :le_toc"],
    // B · 2529276bc9c0
    "worldEvents.we_nia_posts.publicCopy": "Nia poste les onze minutes. À dix heures, des gens photographient la façade de l’immeuble depuis l’autre côté de la rue, et l’un d’eux sait quelle fenêtre est la tienne.",
    // B · 66667518b960
    "worldEvents.we_nia_posts.directorNotes": "Elle a prévenu tout le monde et l’a fait quand même. Ce n’est pas une trahison et elle ne s’en excusera pas. Ça augmente fortement la suspicion publique et rend l’inspection inévitable.",
    // B · e36199e4e365
    "worldEvents.we_nia_posts.setsFlags": ["nia_publié"],
    // B · 48163c568520
    "worldEvents.we_nia_posts.cancelledByFlags": ["nia_a_retiré","a_pris_la_vidéo_de_nia"],
    // B · f3fd07671a26
    "worldEvents.we_nia_posts.requiresFlags": ["sait :étage_zéro"],
    // B · 267692cd3c28
    "worldEvents.we_inspection.publicCopy": "Un avis de rénovation est affiché dans le hall. Une étude structurelle de toute la surface, y compris sous le sous-sol enregistré, dans quatorze jours. Mme Vale le lit deux fois et ne s’assoit pas.",
    // B · 0716c193fad0
    "worldEvents.we_inspection.directorNotes": "La clause qu’elle a défendue pendant quarante ans est sur le point d’être brisée par quelqu’un ayant un droit légal d’entrée. Elle demandera au joueur une aide qu’elle n’a jamais demandée à personne.",
    // B · a7d603c58453
    "worldEvents.we_inspection.setsFlags": ["inspection_demandée"],
    // B · 31ef5b207950
    "worldEvents.we_inspection.requiresFlags": ["première_nuit"],
    // B · 9b98a9e2fab0
    "worldEvents.we_the_week.publicCopy": "Une semaine dans l’immeuble. Le soleil se lève sur le vieux quartier, les trams démarrent, et quelqu’un a laissé un café en canette sur le parapet près du réservoir d’eau, encore un peu chaud.",
    // B · 49d36351e7ec
    "worldEvents.we_the_week.directorNotes": "Une pause, un repère. Quoi que soit devenue la partie, le joueur a maintenant vécu ici une semaine et les parties ordinaires valent d’être nommées — loyer, lessive, la musique d’un voisin, à qui il commence à dire bonjour.",
    // B · 57c0eaf1b80b
    "worldEvents.we_the_week.setsFlags": ["a_survécu_à_la_semaine"],
    // B · 31ef5b207950
    "worldEvents.we_the_week.requiresFlags": ["première_nuit"],
    // B · d77ebfcebe44
    "promises.p_the_door.kind": "FINALE",
    // B · e610cb59ce17
    "promises.p_the_door.label": "Ce qu’il y a de l’autre côté de la porte à 2:13",
    // B · ab91accec5df
    "promises.p_the_door.seedHint": "Ayame donne la troisième règle sur le même ton que les deux autres, sans te regarder.",
    // B · 92f5749ab35d
    "promises.p_the_door.payoffHint": "Quelque chose qui est Mika à tous points vérifiables, mais qui se trompe sur un détail de sa propre vie.",
    // B · e82d9dc4b3fa
    "promises.p_what_it_is.kind": "MYSTÈRE",
    // B · 2ae48dc28549
    "promises.p_what_it_is.label": "Ce que fait vraiment Hush House",
    // B · 0ba6ff766029
    "promises.p_what_it_is.seedHint": "Les objets dans le 312 commencent à être ceux que le joueur possédait ailleurs.",
    // B · 33a017d57065
    "promises.p_what_it_is.payoffHint": "Ce n’est pas hanté. Ça répète, et ça devient meilleur avec les gens plus le joueur les aime.",
    // B · 445cd8deebc2
    "promises.p_ayame.kind": "RELATION",
    // B · 3406fb2febe9
    "promises.p_ayame.label": "Si Ayame te protège ou te recrute",
    // B · bdfb2ec0c02e
    "promises.p_ayame.seedHint": "Elle connaissait les règles avant d’en avoir une raison, et elle a attendu onze mois pour une chambre à cet étage.",
    // B · cbd7267b4841
    "promises.p_ayame.payoffHint": "Les deux, et elle le sait depuis quatre ans.",
    // B · f8b4a6708d82
    "promises.p_the_keeper.kind": "THÈME",
    // B · 4e353381b6f3
    "promises.p_the_keeper.label": "Quelqu’un doit tenir l’accord",
    // B · 80c58a7c9228
    "promises.p_the_keeper.seedHint": "Mme Vale garde onze porte-clés pour six chambres occupées et n’a jamais formé de successeur.",
    // B · 5ec9ad25dcdf
    "promises.p_the_keeper.payoffHint": "L’immeuble n’a pas besoin d’être battu. Il doit être tenu, par quelqu’un, pour toujours, et c’est une offre.",
    // B · 5631e4ba6537
    "promises.p_the_city.kind": "PATRON",
    // B · 61d974b8888c
    "promises.p_the_city.label": "Le jour où Morrowgate décide ce que tu es",
    // B · bbbe7f9755e8
    "promises.p_the_city.seedHint": "Un agent prend les détails du joueur une deuxième fois et lit le premier dossier avec les heures modifiées.",
    // B · a6e66e8699da
    "promises.p_the_city.payoffHint": "La maison est la seule chose qui les traite comme un témoin fiable, ce que c’est exactement ce qu’elle voulait.",
    // B · c3276281cefd
    "endings.end_dawn.name": "Aube sur Bellweather",
    // B · c9d08ae5d876
    "endings.end_dawn.rarity": "COMMUN",
    // B · 57c0eaf1b80b
    "endings.end_dawn.requires.flagsSet": ["a_survecu_a_la_semaine"],
    // B · daf9ee0c7371
    "endings.end_dawn.requires.flagsUnset": ["est_devenu_echo","la_maison_te_possede"],
    // B · 4f4d914c460c
    "endings.end_dawn.condition": "Le joueur est toujours lui-même et toujours là, et quoi que la maison ait fait, ça s’est calmé au niveau d’un problème d’humidité. Accessible sans aucune réponse — l’important c’est qu’il ait traversé une semaine avec sa vie intacte, pas qu’il ait gagné.",
    // A · a4eead3a4556
    "endings.end_dawn.epilogue": "Les trams commencent à cinq heures trente et la lumière éclaire la façade comme d’habitude. Quelqu’un fait du café deux étages plus bas. Le loyer reste absurde, le radiateur se déclenche à dix heures, et rien dans le couloir n’est rouge.",
    // B · 48fc4fbc9496
    "endings.end_mika_home.name": "Mika Rentre Chez Elle",
    // B · f8b8333fe7bc
    "endings.end_mika_home.rarity": "RARE",
    // B · bb167f14bd8d
    "endings.end_mika_home.requires.flagsSet": ["mika_est_dehors"],
    // B · 65bb4c423a12
    "endings.end_mika_home.condition": "Une version de Mika Kurose est dehors, devant Hush House, et y reste. Ne détermine pas ce qu’elle est — elle se souvient de l’appart où elles ont grandi, elle se trompe de numéro de tram, et Ayame a décidé de ne pas la tester. Joue l’ambiguïté comme un choix que deux sœurs vivent, pas comme un twist caché.",
    // A · e1b352298c8c
    "endings.end_mika_home.epilogue": "Elle prend la chambre d’amis dans un appart de l’autre côté de la rivière. Ayame ne lui parle pas des quatre ans passés, et Mika ne s’en ouvre pas. Certains matins, elle est déjà à table avant les autres, avec trop de nourriture, comme toujours.",
    // B · d2a715b73301
    "endings.end_mika_home.hint": "Quoi que ce soit qui monte les escaliers ne pourra pas te dire ce que c’est.",
    // B · 07064fb8f601
    "endings.end_forgets.name": "La Maison T’Oublie",
    // B · f8b8333fe7bc
    "endings.end_forgets.rarity": "RARE",
    // B · 5ac27f3d08ad
    "endings.end_forgets.requires.flagsSet": ["coupe_de_la_maison","a_quitte_la_carte"],
    // B · 0ea49ac8cbe7
    "endings.end_forgets.condition": "Le joueur a dit à l’immeuble exactement ce qu’il était, puis est parti, et la maison n’a plus rien à exploiter. La maison n’est pas vaincue et personne d’autre n’est plus en sécurité. Cette fin parle spécifiquement de s’en sortir, et ceux qui restent peuvent ressentir ce que ça signifie.",
    // A · ee71acab654e
    "endings.end_forgets.epilogue": "L’adresse de réexpédition tient. Aucune lettre non envoyée n’arrive. Un mois plus tard, quelqu’un au 312 — un nouveau — remarque que l’appart avait une tasse qu’ils n’ont pas achetée, et personne ne comprend pourquoi ça compte.",
    // B · 74b4052a61dd
    "endings.end_room_312.name": "Chambre 312",
    // B · f7fc172f729a
    "endings.end_room_312.rarity": "UNIQUE",
    // B · cedaddb908ab
    "endings.end_room_312.requires.flagsSet": ["est_devenu_echo"],
    // B · ffd0d7b6b632
    "endings.end_room_312.condition": "Le joueur s’est laissé garder. Écrit de l’intérieur, sans regret de film d’horreur : c’est chaleureux, le couloir est familier, et le problème est qu’il ne se souvient plus quel jour on est et ça ne le dérange pas. Quelqu’un frappe. C’est presque la bonne voix.",
    // A · 9e911dc40af2
    "endings.end_room_312.epilogue": "La chambre reste occupée. Mme Vale ajoute une clé au tableau et en retire une autre. Le locataire du 312 est poli, respecte des horaires réguliers, et est toujours chez lui à deux heures du matin. Au bout d’un moment, les autres locataires arrêtent de remarquer qu’ils ne le voient jamais arriver.",
    // B · f4b418086381
    "endings.end_ashes.name": "Les Cendres N’Oublient Pas",
    // B · f8b8333fe7bc
    "endings.end_ashes.rarity": "RARE",
    // B · f12a21be184c
    "endings.end_ashes.requires.flagsSet": ["maison_brulee","protection_cassee"],
    // B · 533b4f1fba3f
    "endings.end_ashes.condition": "Les deux moitiés : le motif dans la pierre est brisé et l’immeuble au-dessus a disparu. C’est la seule fin qui met vraiment fin au phénomène, et ça coûte leur maison à six personnes et met le joueur face à un enquêteur incendie. Personne ne doit le remercier dans la même scène.",
    // A · 6feece57650d
    "endings.end_ashes.epilogue": "Ça brûle pendant neuf heures et emporte les deux toits mitoyens. Le terrain est grillagé, inspecté, et on y trouve des maçonneries du dix-neuvième siècle sans intérêt particulier. Rien n’est jamais reconstruit là-dessus. Il n’y a pas besoin.",
    // B · 3613219f7c42
    "endings.end_ashes.hint": "Ça a déjà brûlé une fois ici.",
    // B · 607daa5273a8
    "endings.end_ayame.name": "Le Choix D’Ayame",
    // B · f8b8333fe7bc
    "endings.end_ayame.rarity": "RARE",
    // B · 79750b11c1dd
    "endings.end_ayame.requires.flagsSet": ["ayame_ta_choisi"],
    // B · b95965dd0647
    "endings.end_ayame.condition": "Elle s’arrête pour une raison qui n’est pas Mika. Accessible sans avoir résolu le mystère, et c’est mieux comme ça — tout le poids est qu’elle a choisi un futur ordinaire plutôt qu’une réponse qu’elle a cherché quatre ans, et elle sait exactement ce qu’elle abandonne.",
    // A · 78241d0c54ba
    "endings.end_ayame.epilogue": "Le mur du 314 tombe en un week-end, en quatre boîtes à archives qu’elle range sous le lit et ne touche plus. Elle garde la photo. Certaines nuits, à trois heures, elle est éveillée et la lumière de la cuisine est allumée. Maintenant, il y a deux mugs sur la table au lieu d’un.",
    // B · 87d89767e246
    "endings.end_ayame.hint": "Elle a attendu onze mois pour une chambre à cet étage.",
    // B · 3fb774d38f33
    "endings.end_keeper.name": "Le Nouveau Gardien",
    // B · f7fc172f729a
    "endings.end_keeper.rarity": "UNIQUE",
    // B · 06b9affeb16b
    "endings.end_keeper.requires.flagsSet": ["est_devenu_gardien"],
    // B · 6d77155b8e4f
    "endings.end_keeper.condition": "Le joueur a accepté l’accord. Ce n’est pas une corruption ni un piège : c’est un boulot, c’est indéfini, et Mme Vale est visiblement soulagée et désolée. Les obligations sont de garder les chambres louées et l’arche fermée, et la deuxième partie de l’accord n’est toujours nommée nulle part.",
    // A · d7a014168c87
    "endings.end_keeper.epilogue": "Les clés filent dans la poche d’un gilet. Mme Vale part pour un bungalow dans une ville sans quartier ancien et écrit à Noël. La lampe sur le bureau reste allumée, quelle que soit l’heure, et le tableau derrière a toujours onze crochets pour six chambres.",
    // B · c643831040df
    "endings.end_keeper.hint": "Il faut bien que quelqu’un le tienne, et elle n’a jamais formé personne.",
    // B · 2f3a8fa6a174
    "endings.end_moved_out.name": "Quelque Part Avec Moins De Portes",
    // B · 734e45c160cf
    "endings.end_moved_out.rarity": "PEU COMMUN",
    // B · b0eff3470103
    "endings.end_moved_out.requires.flagsSet": ["a_quitte_la_carte"],
    // B · 2e2301f85356
    "endings.end_moved_out.requires.flagsUnset": ["coupe_de_la_maison"],
    // B · 018b33416685
    "endings.end_moved_out.condition": "Le joueur a déménagé sans rien dire à la maison. Entièrement raisonnable et pas un échec. Écris le soulagement spécifique d’un appart avec un ascenseur qui ne va qu’à quatre étages, et ce qu’il a laissé derrière — Ayame est toujours en 314, toujours réveillée à trois heures, et sait qu’il est parti.",
    // A · 4838d7501a02
    "endings.end_moved_out.epilogue": "Le nouveau logement est plus petit, plus clair, et à quarante minutes du boulot. Pendant six semaines environ, ils dorment sans interruption. Puis, une nuit, à deux heures dix, ils se réveillent sans savoir pourquoi, à l’écoute, dans un immeuble où jamais personne n’a frappé.",
    // B · 7f8d6f75811c
    "endings.end_last_tenant.name": "Le Dernier Locataire",
    // B · 734e45c160cf
    "endings.end_last_tenant.rarity": "PEU COMMUN",
    // B · 1c7685cc2f88
    "endings.end_last_tenant.requires.flagsSet": ["la_maison_a_ta_forme","ayame_a_quitte_la_maison"],
    // B · fff7768a4d20
    "endings.end_last_tenant.condition": "Tout le monde est parti sauf le joueur. Une défaite silencieuse : l’immeuble en a assez pour s’en remettre et personne ne remarquera si la personne dans la cuisine à trois heures utilise un mot de travers. Ne fais venir personne pour les sauver.",
    // A · 650a473bba37
    "endings.end_last_tenant.epilogue": "Nia est partie au printemps. Tomas a réuni la caution en juin. La porte du 314 est ouverte et la chambre vide, sauf les traces de tapisserie sur le mur. La lumière de la cuisine est allumée, la bouilloire chaude, et le joueur n’est pour rien là-dedans.",
    // A · 084ac496336e
    "archetypes.arch_between_places.name": "Entre deux lieux",
    // B · 1a01e4ee3247
    "archetypes.arch_between_places.role": "Courage et endurance",
    // A · 183acd044cfe
    "archetypes.arch_between_places.summary": "Il te fallait une chambre au plus vite, tu n’as pas trop posé de questions. Tu as moins peur que la plupart, surtout à force d’habitude.",
    // A · 5f8ad0414eed
    "archetypes.arch_between_places.playstyle": ["Calme","Difficile à déstabiliser","Peu de attaches"],
    // A · de9969526f9e
    "archetypes.arch_between_places.blurb": "Quoi que tu aies laissé derrière, c’est parti en vitesse, et Bellweather Street est à quatre cents kilomètres de ça.",
    // A · 74c59de726a0
    "archetypes.arch_night_shift.name": "Travail de nuit",
    // B · df1ccfb29133
    "archetypes.arch_night_shift.role": "Pragmatique et éveillé",
    // A · 0239b9547294
    "archetypes.arch_night_shift.summary": "Tu bosses pendant que la ville dort, alors deux heures du matin, c’est une heure comme une autre pour toi. T’es habile de tes mains et tu gères encore mieux les crises.",
    // A · a0a72ca503c0
    "archetypes.arch_night_shift.playstyle": ["Pragmatique","Imperturbable en crise","Jamais reposé"],
    // A · d37efab65ecb
    "archetypes.arch_night_shift.blurb": "Douze heures de service, un bus à cinq heures du matin, et une horloge interne qui ne suit plus le soleil depuis longtemps.",
    // A · 2935ea43ac8f
    "archetypes.arch_reads_everything.name": "Lit tout",
    // B · 4cd3f3cabf73
    "archetypes.arch_reads_everything.role": "Archives et motifs",
    // A · b638074a5882
    "archetypes.arch_reads_everything.summary": "Les archives, les rapports d’incendie, les permis de construire. T’es la seule personne dans cette rue qui sait ce qu’un bâtiment a le droit d’oublier.",
    // A · 53215b50f2c7
    "archetypes.arch_reads_everything.playstyle": ["Cérébral","Sait attendre","Ne paie pas de mine"],
    // A · a23185344ff8
    "archetypes.arch_reads_everything.blurb": "Tu as lu sur des endroits comme celui-ci. Ce n’est pas pareil que d’y avoir été, et tu vas vite t’en rendre compte.",
    // A · b2cd0bfe4d28
    "archetypes.arch_camera_on.name": "Caméra allumée",
    // B · 052b831ea1d1
    "archetypes.arch_camera_on.role": "Attention et accès",
    // A · 3a20aec34e8d
    "archetypes.arch_camera_on.summary": "Tu filmes ce qu’il se passe, et les gens te laissent faire. Tu peux entrer là où d’autres se font refouler, et tu te fais engueuler plus souvent.",
    // A · cd741675f61b
    "archetypes.arch_camera_on.playstyle": ["Audacieux","A l’aise avec les gens","Attire l’attention"],
    // A · b824a85737ea
    "archetypes.arch_camera_on.blurb": "Tu n’as jamais laissé passer quelque chose d’étrange sans le prendre en photo, et ça t’a au moins coûté une amitié.",
    // B · 668473eac28d
    "setupFields.displayName.label": "Quel nom figure sur le bail ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · cd4845b1b502
    "setupFields.displayName.placeholder": "ex. Rei Sandoval",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 3a6240a26696
    "setupFields.pronouns.placeholder": "ex. iel",
    // B · 5a8f1d2b6555
    "setupFields.archetype.label": "Que fais-tu vraiment ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHETYPE",
    // B · f8b70ab0b489
    "setupFields.archetype.helpText": "D’où tu venais avant Bellweather Street, ça détermine ce dans quoi tu es bon. C’est fixé pour toute l’histoire. Ça ne fixe pas ce que tu crois sur l’immeuble, ce que tu es prêt à faire, ni si tu restes — tout ça t’appartient, tu peux changer d’avis n’importe quelle nuit.",
    // B · a29dab43da13
    "setupFields.worldKnowsAboutYou.label": "Quelqu’un à Morrowgate te connaît-il ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · 2b1d6df5e115
    "setupFields.worldKnowsAboutYou.helpText": "La plupart des gens arrivent ici sans connaître personne. C’est la réponse normale et celle que l’immeuble préfère.",
    // B · af8febce581b
    "setupFields.worldKnowsAboutYou.placeholder": "ex. Mon cousin bosse au commissariat à quatre rues d’ici et il aurait préféré que je ne vienne pas dans cet immeuble.",
    // B · 17bc5c18f7af
    "setupFields.why_morrowgate.label": "Pourquoi avais-tu besoin d’une chambre cette semaine ?",
    // B · b6a31c665c0b
    "setupFields.why_morrowgate.kind": "CHOIX",
    // B · e5a9b13b672e
    "setupFields.why_morrowgate.helpText": "Ça montre ce que ça te coûterait de revenir en arrière, la seule raison pour laquelle quelqu’un reste dans un immeuble pareil.",
    // B · e6e4d612ee97
    "setupFields.why_morrowgate.options.left_somebody.label": "Tu as laissé quelqu’un derrière et pris ce que tu pouvais",
    // B · b99c6e0072de
    "setupFields.why_morrowgate.options.the_money.label": "C’était ça ou rien, et c’était moins cher",
    // B · b279ae2e86d3
    "setupFields.why_morrowgate.options.the_job.label": "Le boulot t’a déplacé ici avec trois semaines de préavis",
    // B · 4a1228e05acf
    "setupFields.why_morrowgate.options.the_study.label": "Tu es venu à Morrowgate pour étudier et les dortoirs étaient pleins",
    // B · 2ed5dc35a513
    "setupFields.why_morrowgate.options.looking.label": "Tu connaissais déjà le nom Hush House avant de voir l’annonce",
    // B · f6093d6587c4
    "setupFields.appearance.label": "Qu’est-ce que les gens remarquent en premier ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · 3ac889207f3c
    "setupFields.appearance.placeholder": "ex. Une coupe ratée que je me suis faite dans une station-service, et je porte toujours trop de sacs.",
    // B · 3aa4328667d6
    "protagonist.kind": "VIDE",
    // A · fca855ad492a
    "opening": "Tu as exactement un sac dans le couloir et le radiateur vient de se mettre en marche tout seul.\n\nOn frappe à 8 h 47.\n\nLa femme qui est là a à peu près ton âge, un pull charbon trois tailles trop grand, un short, et des chaussons. Elle tient un café en canette dans chaque main et a le regard de quelqu’un qui n’a pas vraiment dormi depuis le printemps. Elle te regarde — les cartons, le sol nu, la porte ouverte — et te tend un des cafés.\n\n« T’es la nouvelle du 312. Ça marche. »\n\nElle n’entre pas.\n\n« Avant que tu sortes un truc cher de tes cartons, faut que tu saches trois choses. Et je veux pas que tu fasses la tête que les gens font. »",
    // A · b9aa81481803
    "openingSuggestions": ["Je prends le café et je m’appuie sur l’huisserie. « Vas-y, alors. Trois choses. » Je souris, parce qu’elle a clairement pris ça au sérieux, pas moi.","J’écarte la porte en grand et me pousse. « Il fait un froid de canard dans ce hall et t’as rien pour t’asseoir, alors entre et explique bien. »","Je laisse la porte comme elle est. « Ça fait neuf minutes que je suis dans cet immeuble. Quoi que ce soit, ce sera pour demain, non ? » Puis je regarde sa tête."],
  },
});
