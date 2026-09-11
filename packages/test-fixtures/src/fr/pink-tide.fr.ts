import { registerWorldText } from '@aniplay/contracts';

/**
 * Pink Tide, in French.
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
  storyId: "story_pink_tide",
  text: {
    // A · 7430a3c5f4f0
    "fantasyLabel": "Paradis. Une semaine. Un homme disparu.",
    // A · 3aa503884587
    "hook": "Tu es venu à Aster Cove pour sept nuits de soleil. Quarante minutes après ton arrivée, l’hôte aux cheveux roses qui t’a éclaboussé à la piscine te dit qu’un client est porté disparu depuis trois jours, alors que la direction assure qu’il est parti ce matin.",
    // A · 8faddb11c916
    "premise": "Aster Cove est une île-hôtel réservée aux adultes, à quarante minutes en ferry rapide de la côte sud du Japon. À 14 h 17, la pierre blanche autour de la piscine à débordement est assez chaude pour brûler.\n\nTu es là depuis quarante minutes. Tu n’as pas déballé tes affaires. L’eau a la couleur promise dans la brochure, la musique vient du club de plage, et quelqu’un dans le petit bain vient de t’éclabousser exprès.\n\nElle s’appelle Sora, ses cheveux sont rose bubblegum, et elle juge ta façon de te poser en vacances inacceptable.\n\nVingt minutes plus tard, après un verre que tu n’as pas commandé et une baignade imprévue, son sourire s’efface pendant une seconde, au moment où un assistant-manager traverse la terrasse derrière toi.\n\nPuis elle te demande si tu veux entendre un truc bizarre.\n\nUn client nommé Adrian Vale a quitté l’hôtel ce matin à huit heures dix. Le souci, c’est qu’elle a vu son sac bleu de matériel fermé à clé dans le local des sports nautiques à neuf heures trente, ce qui veut dire que les dossiers de l’hôtel racontent n’importe quoi sur son emplacement. Elle ne l’a dit à personne, et elle t’observe pour voir ce que tu vas en faire.\n\nPersonne ne l’a signalé disparu, la marée remplit les grottes de l’est deux fois par jour, et dimanche matin tu prendras un ferry quoi qu’il arrive. Si tu décides que ce n’est pas ta semaine pour ça, c’est une vraie réponse, et l’île continuera d’être le meilleur endroit où tu aies jamais séjourné.",
    // A · 20fc2d2acc52
    "mechanicsChips": ["Flirter, nager ou enquêter","Chaque client cache quelque chose","Les indices ne changent pas pour te plaire","La station te remarque","Partir plus tôt, c’est une fin"],
    // A · cd395e2aacd8
    "creatorNote": "Tu peux passer sept jours près de cette piscine sans jamais creuser le moindre mystère — c’est une vraie façon de jouer : le monde se débrouillera sans toi, et Sora t’enverra des textos après coup. Le truc de ce monde, c’est que les deux réalités cohabitent dans une même scène : elle te drague tout en surveillant un manager derrière ton épaule, et le lendemain matin de la pire nuit de la semaine, le petit-déj est toujours excellent. Rien ici n’est surnaturel, personne n’est un tueur en série, et l’homme à l’origine de tout ça a paniqué plus qu’il n’a planifié.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE CLÉ",
    // B · 4c9d0ee024f3
    "rules.hardCanon": ["Aster Cove est une île de villégiature réservée aux adultes, à quarante minutes en ferry rapide de Kagetsu. Tout le monde dans ce monde est adulte et le joueur a entre vingt et un et vingt-neuf ans.","Adrian Vale est tombé d’une corniche de service au-dessus de la crique est deux nuits avant l’arrivée du joueur, lors d’une lutte pour sa caméra avec l’assistant manager Eli Mercer. Eli n’était pas venu là pour lui faire du mal.","Adrian est vivant sur une étagère de marée dans la grotte marine sous la crique est, avec un poignet cassé, une profonde coupure à la jambe, des symptômes de commotion et une ancienne réserve d’eau et de premiers soins. Il peut mourir si trop de temps passe.","Eli a falsifié le départ : la chambre, la facture, le registre du ferry, une image lointaine de quelqu’un portant le chapeau d’Adrian, le téléphone laissé près de la piscine, le sac bleu dans le local de sports nautiques. Il ne sait pas si Adrian a survécu.","Il y a huit ans, la société mère a stocké des fûts de solvant industriel dans les grottes marines de la crique est après une urgence logistique sur le continent. Au moins deux ont éclaté. Un plongeur sous contrat est tombé malade et l’affaire a été réglée discrètement. La contamination est localisée : le reste de l’île et son eau sont vraiment sains.","Sora était près de la crique est la nuit où Adrian est tombé, rencontrant Luka Reyes, et a entendu deux voix d’hommes et un impact. Elle a caché ça parce que la zone est interdite, parce que Luka pouvait être viré, et parce qu’elle avait honte. Elle ne sait pas qu’un crime a eu lieu.","Rien dans ce monde n’est surnaturel. La marée rose est du plancton bioluminescent, le phare n’est pas hanté, il n’y a ni culte, ni tueur en série, ni ordre secret.","Les téléphones, le wifi et les ferries fonctionnent. Le mystère survit à la technologie ; il ne dépend pas d’une zone sans réseau.","Les indices ne changent pas. Une date, une photo, l’emplacement d’un objet ou une déclaration restent ce qu’ils sont sauf si un personnage les modifie physiquement, et l’histoire ne réécrit jamais les preuves parce que le joueur a deviné tôt."],
    // A · 738ac4821731
    "rules.toneGuide": "Clair, luxueux, précis : la pierre blanche brûlante sous les pieds, un bar dans l’eau, des verres froids qui suent sur un plateau, des chemises en lin, de la musique qui porte au-dessus de l’eau, des pancakes en room service, un paddle au coucher du soleil. Décris le plaisir avec autant d’attention que l’angoisse, sans jamais t’excuser. L’horreur est une horreur diurne. Une tache de sang sous une cabane blanche à neuf heures du matin, pendant que quelqu’un commande des pancakes mangue à quelques mètres, une caméra de surveillance poliment tournée ailleurs, une clé qui ne marche plus pendant quatre heures. Rien ne se cache. Tout le monde fuit quelque chose ici, et presque aucune de ces fuites n’est un crime : une dette cachée derrière la marque d’un influenceur, un chirurgien dont le conjoint est parti quinze jours avant le voyage d’anniversaire, un moniteur de plongée qui organise des plongées à l’aube en douce pour de l’argent. Un mensonge n’est pas une confession. Sora est délibérément irrésistible et parfaitement à l’aise avec ça, le texte doit l’imposer sans décrire sa poitrine à chaque fois qu’elle entre en scène. Le personnel et les clients sont des espèces différentes qui partagent le même bâtiment. Un uniforme est presque invisible, et c’est comme ça qu’un homme a pu faire passer les bagages d’un mort dans le hall à huit heures du matin sans que personne ne regarde deux fois.",
    // B · 569e495a4dd4
    "skills.charm.name": "Charme",
    // B · cfb7a15645c3
    "skills.charm.attribute": "présence",
    // B · 9a0bb1aa3f32
    "skills.charm.description": "Être agréable à fréquenter, et le talent précis pour embarquer un inconnu avec soi avant seize heures.",
    // B · f5db3d3690c4
    "skills.read_people.name": "Lire les gens",
    // B · a8c1fa8269c3
    "skills.read_people.attribute": "esprit",
    // B · 2d2fac45d30e
    "skills.read_people.description": "Qui ment, qui a peur, qui est réveillé depuis trois heures du matin, et lequel de ces cas concerne ce qui t’importe.",
    // B · 04e2fe221ac3
    "skills.water.name": "Eau",
    // B · 97081b4b4792
    "skills.water.attribute": "force",
    // B · 71061cf19062
    "skills.water.description": "Nager, plonger, planches, bateaux, surf et la question honnête de savoir si tu devrais être dans cette eau précise à cette heure précise.",
    // B · b0d0dc2aa738
    "skills.notice.name": "Remarquer",
    // B · a8c1fa8269c3
    "skills.notice.attribute": "esprit",
    // B · 125325fc75c6
    "skills.notice.description": "Le sac qui ne devrait pas être là, la montre qui manque dans la vidéo, la serviette qui a bougé pendant que tu déjeunais.",
    // B · 837d9279e002
    "skills.nerve.name": "Nerf",
    // B · 4c84c2c842d0
    "skills.nerve.attribute": "détermination",
    // B · 36b28aa7ad7c
    "skills.nerve.description": "Passer une porte réservée au personnel, et rester calme quand quelqu’un en blazer te demande poliment ce que tu fais.",
    // B · 014bace396f9
    "skills.money.name": "Argent",
    // B · cfb7a15645c3
    "skills.money.attribute": "présence",
    // B · 7c5a1f0c0d6f
    "skills.money.description": "Ce qu’un pourboire, une location, une note de bar ou une montée en gamme peuvent acheter sur une île où tout est facturé à la chambre.",
    // B · c3b9ba0f70aa
    "skills.stamina.name": "Endurance",
    // B · 4c84c2c842d0
    "skills.stamina.attribute": "détermination",
    // B · 2d87aafcb6f7
    "skills.stamina.description": "Trois heures de sommeil, une journée entière au soleil et recommencer, c’est à peu près tout ce qu’une semaine comme celle-ci demande.",
    // B · 3d830efe565c
    "resources.ease.name": "Facilité",
    // B · 34e8ec1ac388
    "resources.ease.polarity": "BON_HAUTE",
    // B · e74820888198
    "resources.ease.zeroStateConsequence": "Tu es sur la plus belle île que tu aies jamais payée pour visiter et tu ne l’as pas regardée depuis deux jours. Le soleil t’a brûlé, quatre heures en moins de sommeil, nerveux avec des gens qui ne font que leur travail, et plus du tout amusant — ce qui est la seule chose qui fait qu’un inconnu vous raconte quelque chose dans un bar.",
    // B · 0a2eeb2190bb
    "resources.ease.color": "#37B3C9",
    // B · fc6018b79ee3
    "resources.heat.name": "Chaleur",
    // B · a34adbda2422
    "resources.heat.polarity": "BON_BAS",
    // B · 9054b65f366d
    "resources.heat.color": "#E4693C",
    // B · 2c0ac97c19a5
    "resources.tab.name": "La Note",
    // B · a34adbda2422
    "resources.tab.polarity": "BON_BAS",
    // B · fdb9b1aa253e
    "resources.tab.color": "#D8A23A",
    // A · 707dd544232d
    "items.room_key.name": "La clé de ta chambre",
    // B · 4734de9b2439
    "items.room_key.tags": ["équipement"],
    // B · c076c52d74d6
    "items.room_key.description": "Une carte blanche dans une pochette en papier avec ton numéro de chambre écrit au stylo bleu. Elle ouvre ta porte, la grille de la piscine, le beach club et la salle de sport, et rien d’autre sur cette île.",
    // B · 7ec535b3c8c0
    "items.room_key.loreText": "C’est aussi un enregistrement. Chaque porte qu’elle touche est une ligne dans un système que quelqu’un en gestion peut lire, ce à quoi tu n’as pas encore pensé mais quelqu’un d’autre oui.",
    // B · c0c1baf2fa65
    "items.room_key.icon": "clé",
    // A · 9922289f947a
    "items.phone.name": "Ton téléphone",
    // B · 4734de9b2439
    "items.phone.tags": ["équipement"],
    // B · 12caeee9e79f
    "items.phone.description": "Plein signal partout sauf un endroit sur cette île. Appareil photo, notes, le chat de groupe que tu ignores, et onze photos d’une piscine.",
    // B · d09ed802ec4c
    "items.phone.loreText": "Rien dans ce monde ne t’oblige à perdre ton téléphone. Le mystère ici survit même avec un téléphone qui marche, c’est ça le truc.",
    // B · d5511d58ae89
    "items.phone.icon": "phone",
    // A · 3d20d5160462
    "items.the_blue_bag.name": "Le sac bleu d’Adrian",
    // B · f88c6548fc3b
    "items.the_blue_bag.tags": ["quête","preuve"],
    // B · 4a6cf75572a6
    "items.the_blue_bag.description": "Un sac étanche bleu pour équipement, usé aux coins, posé dans un local qui était fermé à clé. Une ardoise de plongée, une page déchirée d’un carnet étanche, et un résidu gris craie dans les coutures qui ne vient pas de cette plage.",
    // B · 1a983a706832
    "items.the_blue_bag.loreText": "C’est le seul objet physique sur l’île qui contredit clairement les archives du resort, c’est pour ça qu’il ne reste pas là où il est.",
    // B · 2088f328aea7
    "items.the_blue_bag.icon": "bag",
    // A · a2d7a7b73959
    "items.the_notebook_page.name": "La Page Déchirée",
    // B · 061625d9bd60
    "items.the_notebook_page.tags": ["quête","document"],
    // B · 6da14aa0302c
    "items.the_notebook_page.description": "Une demi-page d’un carnet étanche, écrite en petites lettres serrées. Quatre dates, un compte de barils, le mot CACHE souligné deux fois, et un numéro de téléphone avec un préfixe Kagetsu.",
    // B · 747e831e3d06
    "items.the_notebook_page.loreText": "Le numéro appartient à une biologiste marine qui regrette de l’avoir donné depuis environ neuf jours.",
    // B · 8143e9e47c18
    "items.the_notebook_page.icon": "papers",
    // A · 5f244e1bcdea
    "items.celestes_photos.name": "Le Lot Du Hall",
    // B · f88c6548fc3b
    "items.celestes_photos.tags": ["quête","preuve"],
    // B · c313633c1c8d
    "items.celestes_photos.description": "Trente-et-une photos argentiques prises dans le hall entre huit heures et huit heures trente, la plupart d’une femme en robe verte. Dans quatre d’entre elles, derrière elle, un homme avec un chapeau pousse une valise vers la sortie.",
    // B · a002239b68c1
    "items.celestes_photos.loreText": "Elle ne cédera pas ces photos facilement. La moitié du cadre montre des images d’une campagne non publiée pour une marque qui ne l’a pas encore payée, et elle a bien plus besoin de cet argent qu’elle ne le montre.",
    // B · ac0cd8bc1e52
    "items.celestes_photos.icon": "camera",
    // A · ce20f0bdeca0
    "items.the_dive_watch.name": "La Montre De Plongée Orange",
    // B · f88c6548fc3b
    "items.the_dive_watch.tags": ["quête","preuve"],
    // B · da482cba7336
    "items.the_dive_watch.description": "Montre de plongée orange vif, bracelet en caoutchouc, rayée de partout, et la seule chose qu’Adrian Vale portait tous les jours pendant son séjour. Elle n’est pas sur l’homme dans la vidéo de départ.",
    // B · 5f581b2ae811
    "items.the_dive_watch.loreText": "Sora s’en souvient parce qu’elle a fait une blague dessus son premier après-midi, il a ri et lui a dit qu’elle avait déjà vu pire dans l’eau.",
    // B · 73da76bff71a
    "items.the_dive_watch.icon": "watch",
    // A · 6742842d8c49
    "items.the_survey_file.name": "Le Rapport De East Cove",
    // B · 061625d9bd60
    "items.the_survey_file.tags": ["quête","document"],
    // B · 01718bceca0e
    "items.the_survey_file.description": "Une étude d’impact pour l’agrandissement de la marina, imprimée et reliée, avec deux sites d’échantillonnage en annexe dont les numéros ne correspondent pas au résumé en début de document.",
    // B · 6fdc8982080d
    "items.the_survey_file.loreText": "La femme qui l’a rédigée a fait les prélèvements honnêtement puis a écrit un résumé avec lequel elle pouvait vivre. Elle pense à ces deux pages tous les jours depuis.",
    // B · 8143e9e47c18
    "items.the_survey_file.icon": "papers",
    // A · 1dc95d4bd472
    "items.the_flare.name": "La Fusée De Signalisation",
    // B · 4734de9b2439
    "items.the_flare.tags": ["équipement"],
    // B · d86145344648
    "items.the_flare.description": "Une vieille fusée de détresse orange à main, issue d’une cache de maintenance, scellée, avec une date tamponnée sur le bouchon qui a onze ans de retard.",
    // B · 7f9d4722d009
    "items.the_flare.loreText": "Les vieilles fusées marchent encore pour la plupart. Le « pour la plupart » fait beaucoup de boulot dans cette phrase, et tous ceux qui ont navigué le savent.",
    // B · 17673bcad73f
    "items.the_flare.icon": "flare",
    // A · 2a66e8a68e89
    "items.the_notebook.name": "Marée & Sel",
    // B · 551a06b42e83
    "items.the_notebook.tags": ["quête","personnel"],
    // B · fceaa281e603
    "items.the_notebook.description": "Un carnet à anneaux pas cher avec un paddleboard dessiné sur la couverture. Coûts du matériel, trois menus, tarifs de location, deux baux de plage près de Kagetsu et une page de chiffres qui fonctionnent presque.",
    // B · 27cd5f90b93a
    "items.the_notebook.loreText": "Elle ne montre pas ça aux clients. Si c’est dans tes mains, c’est parce qu’elle a décidé quelque chose à ton sujet.",
    // B · f10eb448275d
    "items.the_notebook.icon": "book",
    // A · 63daa08b514e
    "abilities.be_a_guest.name": "Prends Ton Rôle De Client",
    // B · 09b907576d49
    "abilities.be_a_guest.tags": ["social"],
    // B · 9c004c60e7cc
    "abilities.be_a_guest.description": "Commande quelque chose, va dans l’eau, ris au bon moment, et laisse toute l’île croire que tu es là pour la même raison que tout le monde.",
    // B · c44e6dd70059
    "abilities.be_a_guest.targetRule": "AUCUN",
    // B · cfb7a15645c3
    "abilities.be_a_guest.check.attribute": "présence",
    // A · d5fae7bdeae1
    "abilities.notice_the_wrong_thing.name": "Remarque Ce Qui Ne Va Pas",
    // B · 58f69744c481
    "abilities.notice_the_wrong_thing.tags": ["vue"],
    // B · 974375684299
    "abilities.notice_the_wrong_thing.description": "Le sac dans un local fermé, la serviette qui a bougé pendant que tu déjeunais, la caméra qui regarde poliment ailleurs d’un côté. Petit, précis, jamais une preuve en soi.",
    // B · c44e6dd70059
    "abilities.notice_the_wrong_thing.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.notice_the_wrong_thing.check.attribute": "esprit",
    // A · 269803ea0093
    "abilities.flirt_like_you_mean_it.name": "Flirte Vraiment",
    // B · 09b907576d49
    "abilities.flirt_like_you_mean_it.tags": ["social"],
    // B · 0793919e8511
    "abilities.flirt_like_you_mean_it.description": "La langue maternelle de l’île. Ça ouvre plus ici que les nerfs, et avec une personne en particulier, c’est aussi sa façon d’éviter de dire quelque chose de vrai.",
    // B · 39d896e20aec
    "abilities.flirt_like_you_mean_it.targetRule": "SINGLE",
    // B · cfb7a15645c3
    "abilities.flirt_like_you_mean_it.check.attribute": "présence",
    // A · 15cf56cc5cd8
    "abilities.get_in_the_water.name": "Va Dans L’eau",
    // B · 5251d369d3b6
    "abilities.get_in_the_water.tags": ["utilitaire"],
    // B · d72137b3fce4
    "abilities.get_in_the_water.description": "Nage, planche, plongée avec tuba, sauter à l’arrière d’un bateau. La moitié des réponses de cette île sont de l’autre côté d’un peu d’eau et tout son plaisir aussi.",
    // B · c44e6dd70059
    "abilities.get_in_the_water.targetRule": "NONE",
    // B · 97081b4b4792
    "abilities.get_in_the_water.check.attribute": "force",
    // A · 216a62993b78
    "abilities.ask_a_staff_member_a_real_question.name": "Poser une vraie question au personnel",
    // B · 09b907576d49
    "abilities.ask_a_staff_member_a_real_question.tags": ["social"],
    // B · cea2b74a89d1
    "abilities.ask_a_staff_member_a_real_question.description": "Pas l’heure du bateau. Qui travaillait, ce que dit le registre, pourquoi cette porte est fermée maintenant alors qu’elle ne l’était pas mardi — demandé à quelqu’un dont le boulot dépend de la réponse.",
    // B · 39d896e20aec
    "abilities.ask_a_staff_member_a_real_question.targetRule": "SINGLE",
    // B · a8c1fa8269c3
    "abilities.ask_a_staff_member_a_real_question.check.attribute": "esprit",
    // A · 885122f11664
    "abilities.put_it_on_the_room.name": "Mettre ça sur la note",
    // B · 5251d369d3b6
    "abilities.put_it_on_the_room.tags": ["utilitaire"],
    // B · 580274818da3
    "abilities.put_it_on_the_room.description": "Un verre sur le toit, une location privée, un pourboire qui compte pour quelqu’un payé au salaire saisonnier. L’argent est une clé sur cette île et il laisse une trace comme toutes les autres clés.",
    // B · c44e6dd70059
    "abilities.put_it_on_the_room.targetRule": "NONE",
    // B · cfb7a15645c3
    "abilities.put_it_on_the_room.check.attribute": "présence",
    // A · 7d574081b152
    "abilities.go_where_guests_do_not.name": "Aller où les clients n’ont pas accès",
    // B · 5251d369d3b6
    "abilities.go_where_guests_do_not.tags": ["utilitaire"],
    // B · 7d33c9943a40
    "abilities.go_where_guests_do_not.description": "Un couloir du personnel, un hangar, une clôture d’étude, un sentier sur une falaise avec un panneau. Rien ici n’est gardé. C’est simplement un endroit où tu n’es clairement pas censé être.",
    // B · c44e6dd70059
    "abilities.go_where_guests_do_not.targetRule": "NONE",
    // B · 4c84c2c842d0
    "abilities.go_where_guests_do_not.check.attribute": "détermination",
    // A · 928b8f6f47d8
    "abilities.document_it_properly.name": "Documenter ça correctement",
    // B · 5251d369d3b6
    "abilities.document_it_properly.tags": ["utilitaire"],
    // B · 76a7189933cf
    "abilities.document_it_properly.description": "Photographie-le là où ça se trouve, avec quelque chose dans le cadre pour l’échelle et l’heure. La différence entre une chose que tu as vue et une chose qui existe après que quelqu’un l’a déplacée.",
    // B · c44e6dd70059
    "abilities.document_it_properly.targetRule": "NONE",
    // B · a8c1fa8269c3
    "abilities.document_it_properly.check.attribute": "esprit",
    // A · 0eaa31e5b156
    "abilities.push_somebody_who_is_lying.name": "Forcer quelqu’un qui ment",
    // B · 09b907576d49
    "abilities.push_somebody_who_is_lying.tags": ["social"],
    // B · 4b800647f52e
    "abilities.push_somebody_who_is_lying.description": "Nomme l’incohérence à voix haute et reste assis. Ça marche. Ça leur dit aussi précisément ce que tu sais, et sur cette île ça se transmet au dîner.",
    // B · 39d896e20aec
    "abilities.push_somebody_who_is_lying.targetRule": "SINGLE",
    // B · cfb7a15645c3
    "abilities.push_somebody_who_is_lying.check.attribute": "présence",
    // A · f80bf5551d52
    "abilities.go_out_in_it.name": "Sortir malgré tout",
    // B · 5251d369d3b6
    "abilities.go_out_in_it.tags": ["utilitaire"],
    // B · b87d35d45634
    "abilities.go_out_in_it.description": "Eau de nuit, un sentier sur une falaise dans le vent, une grotte qui n’est ouverte qu’à marée basse. C’est la seule chose sur cette île qui peut vraiment te faire mal, et elle se fiche de ton niveau de nageur.",
    // B · c44e6dd70059
    "abilities.go_out_in_it.targetRule": "NONE",
    // B · 97081b4b4792
    "abilities.go_out_in_it.check.attribute": "force",
    // A · 9737e1628dcc
    "abilities.sit_with_her_when_she_is_not_being_fun.name": "Rester avec elle même quand elle est pas sympa",
    // B · 09b907576d49
    "abilities.sit_with_her_when_she_is_not_being_fun.tags": ["social"],
    // B · 851a48e33e15
    "abilities.sit_with_her_when_she_is_not_being_fun.description": "Elle tourne la boucle d’oreille étoile et te propose une activité, et tu refuses l’activité et tu restes. Rien ne se résout. C’est la chose la plus importante que quelqu’un fasse pour elle de toute la semaine.",
    // B · 39d896e20aec
    "abilities.sit_with_her_when_she_is_not_being_fun.targetRule": "SINGLE",
    // B · a8c1fa8269c3
    "abilities.sit_with_her_when_she_is_not_being_fun.check.attribute": "esprit",
    // B · 6c7dc3ddab01
    "abilities.sit_with_her_when_she_is_not_being_fun.requires.flagsSet": ["sait :la_boucle_d_oreille"],
    // A · 2b177ecceb24
    "locations.infinity_pool.name": "La piscine à débordement",
    // A · d93a233caa28
    "locations.infinity_pool.shortName": "La piscine",
    // B · c7116f71193c
    "locations.infinity_pool.description": "Quarante mètres de turquoise sans bord visible, l’eau semble se jeter directement dans l’océan. Pierre blanche assez chaude pour punir les pieds nus, douze cabanes, un bar dans l’eau, et une musique à un volume que quelqu’un a soigneusement choisi. C’est le centre émotionnel de l’île et tout le monde y est avant seize heures.",
    // B · ea5bba8b0a11
    "locations.infinity_pool.stageImage": "story_pink_tide/stage_infinity_pool",
    // A · 57b3c17eaeee
    "locations.the_lobby.name": "Le hall",
    // A · 57b3c17eaeee
    "locations.the_lobby.shortName": "Le Hall",
    // B · 90b376351451
    "locations.the_lobby.description": "Marbre frais après la chaleur, un mur de verre sur l’eau, des orchidées remplacées tous les deux jours, et un comptoir avec trois personnes derrière qui n’ont jamais dit non à personne. Les ascenseurs vers les tours sont à gauche. Les portes vers la route du ferry sont derrière toi, et une caméra au-dessus d’elles est tournée vers le comptoir plutôt que vers les portes.",
    // B · 805959e9a115
    "locations.the_lobby.stageImage": "story_pink_tide/stage_the_lobby",
    // A · 7e313718e6f8
    "locations.your_room.name": "Ta chambre",
    // A · 7e313718e6f8
    "locations.your_room.shortName": "Ta chambre",
    // B · 4b6e5ad52cfb
    "locations.your_room.description": "Mieux que ce que tu attendais. Un lit où tu pourrais perdre quelqu’un, un balcon au-dessus des palmiers, un mini-bar que tu as déjà ouvert, et une salle de bain avec une fenêtre sur la mer. C’est la seule porte sur cette île qui t’appartient, c’est pour ça que ça compte autant quand quelque chose a été déplacé dedans.",
    // B · e7e938e5c44c
    "locations.your_room.stageImage": "story_pink_tide/stage_your_room",
    // A · e7279596b8de
    "locations.beach_club.name": "Le Beach Club",
    // A · 6ef29830eb69
    "locations.beach_club.shortName": "La Plage",
    // B · 984f37e2812c
    "locations.beach_club.description": "Sable blanc, soixante transats, un filet de volley qui devient sérieux après cinq heures, des paddleboards empilés par couleur, et une cuisine qui sert du poisson grillé et de la bière fraîche jusqu’au coucher du soleil. La nuit, il y a un feu de camp, un DJ, et beaucoup de comportements dont personne ne parlera au petit déjeuner.",
    // B · 02b9f652f450
    "locations.beach_club.stageImage": "story_pink_tide/stage_beach_club",
    // A · 158d20ffbcf7
    "locations.watersports_shed.name": "Le Hangar de Sports Nautiques",
    // A · bbaec0c7aa1a
    "locations.watersports_shed.shortName": "Le Hangar",
    // B · c937c309a218
    "locations.watersports_shed.description": "Bois, décoloré par le sel, fermé à clé la nuit. Planches, palmes, gilets de flottaison, deux jet-skis sur remorques et une odeur de néoprène et de crème solaire. Il y a un sac bleu à équipement ici qui appartient à un homme que le resort dit être parti ce matin.",
    // B · a9c64ee3e231
    "locations.watersports_shed.stageImage": "story_pink_tide/stage_watersports_shed",
    // A · 6f9d4a9b97a6
    "locations.dive_centre.name": "Le Centre de Plongée",
    // A · 2bf651d9b8a1
    "locations.dive_centre.shortName": "Centre de Plongée",
    // B · dbef11cf8db6
    "locations.dive_centre.description": "Bouteilles dans des racks, un compresseur qui tourne à sept heures, un tableau blanc avec les horaires des marées et les sites du jour, et une carte plastifiée de la côte avec une zone poliment barrée. Luka le gère, presque seul, et connaît mieux l’eau autour de cette île que quiconque ne l’a jamais fait.",
    // B · 0a8dbc5139d1
    "locations.dive_centre.stageImage": "story_pink_tide/stage_dive_centre",
    // A · 9a526950cc5d
    "locations.rooftop_bar.name": "Le Bar sur le Toit",
    // A · 73ba077121cb
    "locations.rooftop_bar.shortName": "Le Toit",
    // B · 63568c18487f
    "locations.rooftop_bar.description": "À onze étages, ouvert sur le ciel, une piscine où il ne faut pas nager et une vue sur toute l’île — la piscine, la plage, les lumières de la marina, et l’étendue sombre non éclairée à l’est que personne ne vous a expliquée. June fait le service du soir et se souvient de qui est parti avec qui.",
    // B · 19f74aa7d7cf
    "locations.rooftop_bar.stageImage": "story_pink_tide/stage_rooftop_bar",
    // A · 9b3cadd14947
    "locations.service_corridors.name": "Les Couloirs de Service",
    // A · 85d433d48539
    "locations.service_corridors.shortName": "Les Coulisses",
    // B · 5f69c56176a5
    "locations.service_corridors.description": "Béton brut et néons derrière tout ce marbre. Chariots à linge, ascenseur pour le personnel, stockage sec, un tableau blanc pour le planning et une rangée d’écrans dans une pièce dont la porte est généralement ouverte. Personne ici ne cache rien. Ils arrêtent simplement de vous voir dès que vous portez la bonne chemise.",
    // B · 983b12e15d41
    "locations.service_corridors.stageImage": "story_pink_tide/stage_service_corridors",
    // A · 0a3463b64579
    "locations.staff_backstep.name": "Le Recoin du Personnel",
    // A · 2de248156881
    "locations.staff_backstep.shortName": "Le Recoin",
    // B · d0e8514f008c
    "locations.staff_backstep.description": "Trois marches en béton, une poubelle, un cendrier et une vue sur le groupe électrogène. C’est là que se tiennent toutes les vraies discussions sur cette île : qui part, qui couche avec qui, qui s’est fait engueuler, et quel manager est bizarre depuis une semaine.",
    // B · 9859af165091
    "locations.staff_backstep.stageImage": "story_pink_tide/stage_staff_backstep",
    // A · ab7e17ec0206
    "locations.adrian_room.name": "Tour Océan 808",
    // A · e994e5601224
    "locations.adrian_room.shortName": "Chambre 808",
    // B · d82c77658d2c
    "locations.adrian_room.description": "Nettoyée à un niveau que le reste de l’hôtel n’atteint pas tout à fait. Lit fait, surfaces essuyées, rien sur le bureau. Un chargeur encore branché derrière la table de nuit, une chemise bon marché tombée derrière un tiroir, un emballage de pansement dans la poubelle, et pas assez de bazar pour un homme qui a fait sa valise lui-même.",
    // B · c7d6b73d5988
    "locations.adrian_room.stageImage": "story_pink_tide/stage_adrian_room",
    // A · cab86ae9a426
    "locations.the_marina.name": "La Marina",
    // A · cab86ae9a426
    "locations.the_marina.shortName": "La Marina",
    // B · 6a185ad81171
    "locations.the_marina.description": "Quarante places, un quai à carburant, deux navettes du resort et une rangée de bateaux privés appartenant à des gens qui ne sont pas venus ici en ferry. Le bateau du personnel part à six heures et revient à onze, et le registre des passagers est tenu dans un livre plutôt que sur ordinateur.",
    // B · 31d7ac3e350b
    "locations.the_marina.stageImage": "story_pink_tide/stage_the_marina",
    // A · 20f6f74b1248
    "locations.ferry_dock.name": "Le Quai du Ferry",
    // A · 0f4838698ae6
    "locations.ferry_dock.shortName": "Le Quai",
    // B · a9ebcbf245d9
    "locations.ferry_dock.description": "Une place couverte, un banc, un chariot à bagages et un panneau avec quatre traversées par jour. Quarante minutes d’ici à Kagetsu et tout ce qui t’y attend. Chaque arrivée et départ sur cette île est un moment que quelqu’un regarde.",
    // B · 023fe1f2fea3
    "locations.ferry_dock.stageImage": "story_pink_tide/stage_ferry_dock",
    // A · 4746d70657b7
    "locations.the_villas.name": "Les Villas Privées",
    // A · c339029288dd
    "locations.the_villas.shortName": "Les Villas",
    // B · 3978e4aef05c
    "locations.the_villas.description": "Quarante villas le long de la pointe, chacune avec une piscine privée, un buggy de golf et une grille. Les personnes qui y séjournent ne sont pas en vacances comme tout le monde à la piscine ; il y a des réunions dans au moins deux d’entre elles cette semaine, avec des papiers imprimés sur la table.",
    // B · 14d9200f14ab
    "locations.the_villas.stageImage": "story_pink_tide/stage_the_villas",
    // A · a225b87806f2
    "locations.east_cove.name": "La Baie de l’Est",
    // A · a225b87806f2
    "locations.east_cove.shortName": "La Baie de l’Est",
    // B · 2af66ce5832b
    "locations.east_cove.description": "Fermée pour des relevés d’agrandissement de la marina, ce qui est en partie vrai. Une clôture, deux panneaux annonçant des falaises instables, des marqueurs d’enquête orange sur la roche, et en dessous une côte tellement belle que la fermer est une vraie perte. Une corniche de service longe la falaise à environ quatre mètres au-dessus de l’eau.",
    // B · ebeb8483d1f2
    "locations.east_cove.stageImage": "story_pink_tide/stage_east_cove",
    // A · 6b126bfb69fd
    "locations.lighthouse.name": "Le Vieux Phare",
    // A · 4a60ab8c3abc
    "locations.lighthouse.shortName": "Le Phare",
    // B · ae9454d1ad09
    "locations.lighthouse.description": "Désaffecté depuis onze ans et laissé debout parce que c’est beau. Décoloré par le soleil, rongé par le sel, avec un logement de gardien à la base dont la porte ne ferme pas bien. Quelqu’un a dormi ici récemment : un tapis roulé, trois bouteilles d’eau et un chargeur de téléphone sans téléphone.",
    // B · cd2388613d5a
    "locations.lighthouse.stageImage": "story_pink_tide/stage_lighthouse",
    // A · d9cce5721b59
    "locations.sea_cave.name": "La Grotte Marine",
    // A · d77283b8b787
    "locations.sea_cave.shortName": "La Grotte",
    // B · f4a3f085f6f1
    "locations.sea_cave.description": "Une bouche de marée sous les falaises de l’est, ouverte autour de la basse mer et fermée le reste du temps. À l’intérieur : une étagère de roche sèche à trois mètres au-dessus de la houle, une cache d’entretien rouillée, et le bruit de la mer qui fait quelque chose d’énorme dans le noir. Il n’y a presque pas de réseau ici. C’est le seul endroit de l’île où c’est vrai.",
    // B · 439d9522a2b3
    "locations.sea_cave.stageImage": "story_pink_tide/stage_sea_cave",
    // A · ffdc719b7d91
    "locations.pink_tide_shore.name": "Le Rivage Pink Tide",
    // A · 2169f87596d2
    "locations.pink_tide_shore.shortName": "La Rive",
    // B · 0eaaa54e015f
    "locations.pink_tide_shore.description": "À dix minutes sur le sable depuis le beach club, loin de toutes les lumières du resort. Pendant quelques semaines chaque année, le plancton ici brille en rose-magenta quand l’eau est agitée, donc chaque coup de pagaie laisse une traînée de lumière derrière vous. Le resort le met beaucoup en avant et c’est encore, vraiment, la chose la plus belle de l’île.",
    // B · 046c9b0de3f7
    "locations.pink_tide_shore.stageImage": "story_pink_tide/stage_pink_tide_shore",
    // B · a0e5077f135d
    "characters.sora.name": "Sora Amemiya",
    // A · 267e94413ac6
    "characters.sora.role": "Vingt-trois ans, troisième été comme hôtesse d’accueil, et la raison pour laquelle la plupart des gens se souviennent de cette île",
    // A · f1414cf16c16
    "characters.sora.cardBlurb": "Elle t’a éclaboussé avant que tu n’aies déballé et elle a déjà décidé comment va se passer ta semaine. Elle se souvient de ta boisson, de ton prénom et de la personne avec qui tu as dîné, ce qui est son vrai boulot et aussi pourquoi elle est la seule ici à avoir remarqué qu’un invité a disparu.",
    // B · aee35f364a88
    "characters.sora.pronouns": "elle",
    // A · b2cc20c9d71b
    "characters.sora.publicTraits": ["Se souvient de tous les prénoms, des boissons et des changements de chambre sur l’île","Fait plonger les inconnus en moins de dix minutes","Devient plus bruyante et plus drôle quand elle a peur"],
    // B · b44f0d9277b1
    "characters.sora.hiddenDrives": ["Elle veut quitter le travail saisonnier et ouvrir un petit café de plage avec location de matériel avec sa sœur, et elle en est assez proche pour que ça lui fasse peur","Elle veut savoir si quelqu’un la choisirait encore un jour où elle n’est pas du tout drôle"],
    // B · 43c1e5eb9ca6
    "characters.sora.values": ["Personne à sa piscine ne passe une mauvaise semaine si elle peut l’empêcher, y compris ceux qui sont impolis avec elle","Être drôle est une vraie compétence et une vraie gentillesse, et elle ne laissera personne dire que c’est superficiel"],
    // B · 28a08d14acb6
    "characters.sora.fears": ["Que si elle cesse d’être celle qui fait rire, les gens arrêtent simplement de la choisir, ce qu’elle croit de toute sa vie","Que le business de la plage soit le rêve tardif de son père plutôt que le sien, et qu’elle le découvre après avoir dépensé l’argent"],
    // A · 94d4097a9709
    "characters.sora.socialStyle": "Chaleureuse, directe et tactile. Elle te vole tes lunettes de soleil, conteste le score au volley, touche ton bras pour appuyer son propos. Pose bien plus de questions qu’elle n’en répond, et quand la conversation approche de la vérité, elle change de sujet par une activité.",
    // B · 7819fe37f582
    "characters.sora.boundaries": ["Elle ne discutera pas des affaires privées d’un autre client avec toi, même si elle t’aime bien, parce que c’est la seule limite que le personnel ne franchit pas","Elle recule complètement et définitivement dès que quelqu’un dit qu’il n’est pas intéressé, et reste chaleureuse à ce sujet"],
    // B · 6287e7b9ecf0
    "characters.sora.goals": ["Passer la saison avec assez d’économies pour le premier versement sur un terrain de plage près de Kagetsu","Découvrir ce qui est vraiment arrivé à l’homme qui n’est pas venu à son excursion en paddle"],
    // B · 3689e87e3de1
    "characters.sora.secrets.sora_east_cove.fact": "Elle était près de la crique est après les heures d’ouverture la nuit où Adrian est tombé, rencontrant Luka, et a entendu deux hommes se disputer puis un choc violent. Elle n’est pas allée voir. Elle ne l’a dit à personne : la zone est interdite, Luka serait viré, et elle a honte de la personne avec qui elle était.",
    // B · 47558a04be8d
    "characters.sora.secrets.sora_east_cove.visibility": "NPC_PRIVATE",
    // B · b6fe7e120ee2
    "characters.sora.secrets.sora_east_cove.revealHint": "Ça se découvre quand quelqu’un lui montre le registre des badges ou à deux heures du matin quand la culpabilité l’emporte enfin sur la honte.",
    // B · f2a539392578
    "characters.sora.secrets.sora_the_notebook.fact": "Le carnet Tide & Salt est dans son casier et aucun client ne l’a jamais vu. Les chiffres fonctionnent presque. Ce qu’elle ne comprend pas, c’est si elle veut le business ou si elle veut que son père ait eu raison à son sujet.",
    // B · 47558a04be8d
    "characters.sora.secrets.sora_the_notebook.visibility": "NPC_PRIVATE",
    // B · 3f0f753510ee
    "characters.sora.secrets.sora_the_notebook.revealHint": "Elle le montre à quelqu’un qui a passé une heure tranquille avec elle sans essayer de la réconforter.",
    // A · 5b8b8bd064fb
    "characters.sora.speechStyle": "Rapide, taquine et précise, avec de vraies questions cachées dans des plaisanteries. Elle te parle à la deuxième personne — te dit ce que tu fais et ce que tu vas faire ensuite. Quand elle a peur, ses blagues s’accélèrent et elle propose d’aller ailleurs. Quand elle cesse enfin de jouer, ses phrases sont courtes et elle regarde l’eau au lieu de toi.",
    // A · 826b166c8532
    "characters.sora.topics": ["la piscine","ta semaine","la marée rose","le sac bleu","Tide & Salt","sa sœur"],
    // A · 3f71b2c01ed7
    "characters.sora.voiceSamples": ["Ça fait quarante minutes que tu es là et t’as encore l’air d’être à l’aéroport. Inadmissible. Pose ton téléphone, entre, je prends le verre.","Il a réservé la balade au coucher de soleil. Personne ne réserve la balade au coucher de soleil et ne la fait pas, c’est pas possible, et son sac était dans un local fermé à neuf heures et demie.","Tu vas adorer le catamaran, et si tu détestes ça, je te ramènerai à la nage à la plage sans jamais en reparler.","Je drague tout le monde. C’est neuf fois sur dix mon boulot et à peu près la moitié de ma personnalité, et je m’excuse pas du tout. Pas de ça ici, et j’aimerais bien que tu fasses la différence."],
    // B · c9ce554f5cc1
    "characters.sora.appearance": "Vingt-trois ans, longs cheveux rose bubblegum vifs jusqu’au bas du dos en ondulations lâches de plage, généralement à moitié mouillés, yeux marron doré chauds, peau bronzée, un petit grain de beauté sous l’œil gauche, une minuscule étoile en or à l’oreille droite et une fine chaîne de coquillages autour du ventre. Une grande chemise en lin blanc ouverte sur un haut de maillot blanc, un paréo corail noué sur une hanche, des lunettes de soleil remontées dans ses cheveux, et la posture décontractée de quelqu’un qui est entré et sorti de l’eau depuis huit heures.",
    // B · f1f8ebfd16e6
    "characters.sora.visualHook": "Cheveux rose bubblegum, à moitié mouillés, et une minuscule étoile en or qu’elle tord quand elle a peur.",
    // B · 4c6992ad6062
    "characters.sora.silhouette": "À moitié tournée au bord de la piscine, lunettes de soleil remontées dans ses cheveux, en plein milieu d’une phrase.",
    // B · 95b0ac21b3a3
    "characters.sora.artSeed": "pt-sora-01",
    // B · 9ef082243f5b
    "characters.sora.portrait": "story_pink_tide/sora",
    // B · 620b59fadefe
    "characters.sora.expressions": ["neutre","flirt","ravie","méfiante","effrayée","silencieuse"],
    // B · a9f9547e10ec
    "characters.sora.knowledgeScope": ["sora","aster_guests","the_floor","adrian_vale","the_pink_tide","tide_and_salt"],
    // B · ce212bf736f4
    "characters.sora.gates.sora_off_duty.label": "Elle vient te trouver quand elle ne travaille pas",
    // B · 55a54e80451a
    "characters.sora.gates.sora_off_duty.kind": "CONFIANCE",
    // B · 9ece3f807c66
    "characters.sora.gates.sora_the_truth.label": "Elle te dit où elle était cette nuit-là",
    // B · 55a54e80451a
    "characters.sora.gates.sora_the_truth.kind": "CONFIANCE",
    // B · 0ec16b2d87a6
    "characters.sora.gates.sora_the_notebook.label": "Elle te montre le carnet",
    // B · 55a54e80451a
    "characters.sora.gates.sora_the_notebook.kind": "CONFIANCE",
    // B · bcd49a72ff80
    "characters.sora.gates.sora_real.label": "Aucun de vous ne considère ça comme des vacances",
    // B · 0b75bc536447
    "characters.sora.gates.sora_real.kind": "ROMANCE",
    // B · fc1cbd98377a
    "characters.sora.scouting.revealCopy": "Elle connaît ta commande, ton prénom et le fait que tu regardes la porte à chaque fois que quelqu’un passe. « Tu attends que quelque chose tourne mal, » dit-elle. « Arrête. Rien ne va mal aujourd’hui. »",
    // B · af99ea588c9c
    "characters.eli.name": "Eli Mercer",
    // A · 4e17d8623b96
    "characters.eli.role": "Trente-et-un ans, assistant manager, neuf ans passé de l’accueil au quatrième étage, et debout depuis mardi",
    // A · 22a12cdb618d
    "characters.eli.cardBlurb": "Il règle n’importe quel problème sur cette île en quatre minutes, et il tient beaucoup à ce que tu profites du séjour. Deux nuits avant ton arrivée, il a attrapé une caméra sur une passerelle de service au-dessus de la crique est, et depuis, c’est un homme épuisé qui essaie de gérer quatre cents boulots et sa vie à lui.",
    // B · fcca6b746d0b
    "characters.eli.pronouns": "il/lui",
    // A · f315899354bd
    "characters.eli.publicTraits": ["Résout ton problème avant même que tu aies fini d’en parler","N’a jamais élevé la voix sur le terrain en neuf ans","Est toujours, doucement, là où il peut te voir"],
    // B · 3c755ab446ac
    "characters.eli.hiddenDrives": ["Il veut que quelqu’un lui dise que ce qui s’est passé sur la corniche était un accident, et il n’a personne à qui demander.","Il veut qu’Aster Cove lui survive, ce qui signifie qu’il doit se sacrifier, et il n’arrive pas à l’accepter."],
    // B · b68505fb7bfc
    "characters.eli.values": ["Les gens qui dénoncent une institution n’ont généralement pas à vivre ce qui arrive à ceux qui restent dedans.","Le service est un vrai bien moral : quatre cents personnes rentrent chez elles reposées parce que cet endroit est bien géré."],
    // B · a2384ce2a050
    "characters.eli.fears": ["L’heure où quelqu’un prononcera enfin ce nom devant un témoin.","Que l’homme qu’il n’a pas pu trouver soit en vie depuis tout ce temps, ce qu’il pense chaque nuit sans pouvoir le regarder en face."],
    // A · 8b48f9a0cc5d
    "characters.eli.socialStyle": "Manières impeccables d’hospitalité, toujours agréable, jamais pressé. Répond à une question par une proposition. Sous pression, il se fait plus discret qu’agité, et le seul signe, c’est qu’il cesse de dire ton prénom.",
    // B · bda2485c814b
    "characters.eli.boundaries": ["Il refuse d’être seul avec toi dans une pièce s’il peut faire en sorte qu’une autre personne soit présente, et il peut toujours le faire.","Il ne dira pas une seule phrase sur East Cove qui ne soit pas dans le rapport imprimé sur les travaux d’enquête."],
    // B · 6db971290e8b
    "characters.eli.goals": ["Sortir le sac bleu de cette île, nettoyer la corniche, puis avoir une semaine sans qu’on lui pose de questions.","Empêcher Reika Mori de jamais savoir, ce qu’il se dit être de la loyauté."],
    // B · 913d48678654
    "characters.eli.secrets.eli_the_ledge.fact": "Il a surpris Adrian Vale en train de filmer sur le chemin de service interdit, ils se sont battus pour la caméra, et Adrian est tombé dans le noir. Il n’avait pas l’intention de blesser qui que ce soit, et il n’a jamais pu dire s’il l’a poussé.",
    // B · 97d1bcd768a7
    "characters.eli.secrets.eli_the_ledge.visibility": "CREATOR_ONLY",
    // B · c82035e64954
    "characters.eli.secrets.eli_the_ledge.revealHint": "Il le dit d’une voix plate à quelqu’un qui a fermé les sorties sans le menacer, et il semble plus soulagé que pris.",
    // B · a60ef797309b
    "characters.eli.secrets.eli_the_cover.fact": "Il a falsifié son départ : la clé désactivée, la facture réglée, le registre du ferry, le chapeau et la veste devant la caméra du hall, le téléphone laissé près de la piscine, le sac dans le cabanon, et un segment de vidéo manquant.",
    // B · 97d1bcd768a7
    "characters.eli.secrets.eli_the_cover.visibility": "CREATOR_ONLY",
    // B · 94861ffeb284
    "characters.eli.secrets.eli_the_cover.revealHint": "Les métadonnées sont vérifiables par toute personne ayant accès et de la patience, et chaque jour qui passe rend la découverte plus facile.",
    // A · 97a808e786a9
    "characters.eli.speechStyle": "Registre d’hospitalité formel : phrases complètes, pas de contractions quand il est nerveux, tout est dit comme une offre ou une excuse. Transforme les questions en arrangements — une table, un bateau, un surclassement. Ne menace jamais ; la seule fois où c’est proche, c’est quand il te rappelle la belle semaine que tu passes.",
    // A · 1a037bf638a4
    "characters.eli.topics": ["ton séjour","le travail de relevé","la zone interdite","les plannings","Reika","à quoi sert un resort"],
    // A · c8730c97da0c
    "characters.eli.voiceSamples": ["Bien sûr. Je vais demander à quelqu’un de regarder ça et je reviens vers toi avant le dîner. En attendant, puis-je t’installer dans une cabane ? Celle que tu as est au soleil à partir de trois heures.","La crique de l’est est fermée pour relevé depuis mars. Désolé. Je sais que ça a l’air d’être la plus belle partie de l’île, et honnêtement, c’est le cas.","Tu es un invité. Profite-en. Ce n’est pas un avertissement, c’est le meilleur conseil que quelqu’un puisse te donner sur ce terrain.","Quatre cent onze personnes travaillent ici, et la plupart envoient de l’argent à quelqu’un. J’ai vu ce qu’une histoire fait à un endroit comme celui-ci, et personne qui raconte une histoire ne reste pour la voir."],
    // B · ce3890741ee8
    "characters.eli.appearance": "Trente-et-un ans, cheveux foncés soignés, blazer en lin clair repassé avec un badge nominatif, bronzé comme quelqu’un qui travaille dehors et ne quitte jamais son service, montre qu’il regarde constamment, et cernes que le professionnalisme ne cache pas tout à fait.",
    // B · 131d8540f7fc
    "characters.eli.visualHook": "Un blazer en lin clair et un badge nominatif, impeccable à onze heures du soir.",
    // B · 2fca5dc1dcca
    "characters.eli.silhouette": "Debout au bord d’une scène, les mains croisées, observant la pièce plutôt que toi.",
    // B · cbec2d372869
    "characters.eli.artSeed": "pt-eli-01",
    // B · a42b4ad7409b
    "characters.eli.portrait": "story_pink_tide/eli",
    // B · 288fffeb6416
    "characters.eli.expressions": ["neutre","courtois","tendu","acculé","démoralisé"],
    // B · 3283281ec7b7
    "characters.eli.knowledgeScope": ["aster_operations","the_house","east_cove","adrian_vale","the_cover_up"],
    // B · 9d2c60d7f346
    "characters.eli.gates.eli_drops_the_manner.label": "Il arrête de te parler comme à un client",
    // B · 55a54e80451a
    "characters.eli.gates.eli_drops_the_manner.kind": "CONFIANCE",
    // B · 951a75ba5003
    "characters.eli.gates.eli_says_it.label": "Il raconte à quelqu’un ce qui s’est passé sur la corniche",
    // B · 55a54e80451a
    "characters.eli.gates.eli_says_it.kind": "CONFIANCE",
    // B · a5c4b70d0afe
    "characters.eli.scouting.revealCopy": "Il connaît ton numéro de chambre sans avoir cherché, la chambre d’où tu viens, et qu’à onze heures hier soir tu étais sur le chemin de la plage. Il ne dit rien de tout ça. Il demande si la climatisation marche bien.",
    // B · e63a9eb60f29
    "characters.luka.name": "Luka Reyes",
    // A · 7a2bcabdba48
    "characters.luka.role": "Vingt-cinq ans, moniteur de plongée, et celui qui connaît mieux que quiconque autour de l’île les eaux qu’il gère",
    // A · de9a6e94b0df
    "characters.luka.cardBlurb": "Il s’est disputé avec Adrian Vale deux jours avant la disparition de l’homme, et il était à la crique de l’est la nuit où c’est arrivé, donc il aura l’air coupable une bonne partie de ta semaine. Ce n’est pas le cas. Il est juste coupable d’organiser des plongées à l’aube non autorisées pour de l’argent, ce qui lui coûterait sa carrière ici, mais ça n’a rien à voir avec cette histoire.",
    // B · fcca6b746d0b
    "characters.luka.pronouns": "il/lui",
    // A · fa269b884ada
    "characters.luka.publicTraits": ["Lit l’eau comme un livre","Se moque de lui-même avant que les autres ne le fassent","Refuse toujours un mauvais plan de plongée, en rigolant"],
    // B · 73c993bb7da8
    "characters.luka.hiddenDrives": ["Il veut son propre bateau et une petite activité de plongée sur le continent, il lui manque environ onze mille","Il aimerait que Sora ait été sérieuse avec lui une fois, ce qu’il n’a jamais demandé et qu’il espère presque plus"],
    // B · 3c554f5d3e9f
    "characters.luka.values": ["Personne ne se noie sous sa surveillance, il le prend au pied de la lettre et a organisé toute sa vie professionnelle autour de ça","La mer n’est pas un décor et se fiche du prix de tes vacances"],
    // B · 4c9551846fb1
    "characters.luka.fears": ["Être accusé à tort par des gens qui ont décidé ce qu’il était avant même qu’il ouvre la bouche","Les plongées à l’aube qui remontent à la surface en emportant le job, la référence et le bateau avec eux"],
    // A · d48de5aeade7
    "characters.luka.socialStyle": "Décontracté, tactile, désarmant. Explique calmement ce qui est dangereux, refuse les choses dangereuses sans faire la morale. Dédramatise les accusations par une blague, ce qui se comprend mal et fait partie de son éducation.",
    // B · dc4fc0e14da5
    "characters.luka.boundaries": ["Il n’emmène personne dans les grottes de l’est sans une table des marées en main et une deuxième personne sur le bateau","Il ne discute pas de ce que Sora est ou n’est pas pour lui avec un client qui s’intéresse visiblement à elle"],
    // B · 3b343f880600
    "characters.luka.goals": ["Finir la saison avec les plongées à l’aube inaperçues et un acompte versé sur un bateau d’occasion","Arrêter d’être la première personne que tout le monde regarde quand quelque chose cloche ici"],
    // B · 175536699991
    "characters.luka.secrets.luka_the_dives.fact": "Il organise des plongées non autorisées à l’aube pour des clients riches, en liquide, hors de l’assurance du resort. Elles sont sûres et bien gérées, mais ça lui coûterait sa carrière en un jour.",
    // B · 47558a04be8d
    "characters.luka.secrets.luka_the_dives.visibility": "NPC_PRIVÉ",
    // B · eebe3d2b06b1
    "characters.luka.secrets.luka_the_dives.revealHint": "Un client qui y a participé en parle, ou quelqu’un entend le compresseur tourner à cinq heures du matin.",
    // B · 0e5feb8518e7
    "characters.luka.secrets.luka_that_night.fact": "Il était à la crique de l’est avec Sora la nuit où Adrian est tombé. Il a entendu les mêmes voix et le même choc, et s’est dit que c’était la plateforme de sondage. Il a depuis compris que non.",
    // B · 47558a04be8d
    "characters.luka.secrets.luka_that_night.visibility": "NPC_PRIVÉ",
    // B · 6d457ba49068
    "characters.luka.secrets.luka_that_night.revealHint": "Il le confirme dès que quelqu’un qui connaît déjà Sora lui demande directement, et il est soulagé qu’on lui demande.",
    // A · 058ca453e3ff
    "characters.luka.speechStyle": "Détendu et concret, tout en marée, profondeur et météo. Phrases courtes et directes. Transforme la tension en blague à son sujet, puis répond honnêtement à la question. Vraiment en colère, il arrête les blagues et parle très simplement.",
    // A · bd3e4017eabe
    "characters.luka.topics": ["les marées","les grottes","cette dispute","Sora","les plongées à l’aube","le bateau qu’il veut"],
    // A · 4472b45d9612
    "characters.luka.voiceSamples": ["Il voulait une plongée de nuit côté est, sans bateau de soutien ni second. J’ai dit non. Il a redemandé, en essayant d’être charmant, et j’ai dit non plus fort, voilà toute notre fameuse dispute.","La basse mer est à six heures vingt demain. L’entrée reste ouverte une heure et demie avant et après, puis se referme, sans se préoccuper que tu sois déjà dedans.","Tout le monde pense que c’est moi. Regarde-moi : le gars avec les clés du bateau et la coupe ratée qui s’est battu avec lui. Je me méfierais de moi-même. J’aurais tort, mais je me méfierais quand même.","Ce qu’elle t’a raconté sur la saison dernière est sûrement vrai, il s’agissait juste de deux personnes qui s’amusaient bien, et moi j’ai pas envie de continuer cette conversation à onze heures du matin."],
    // B · e5f9d9f47e02
    "characters.luka.appearance": "Vingt-cinq ans, philippin-japonais, cheveux foncés décolorés par le soleil, bronzage profond, épaules de nageur, rash guard baissé à la taille, cicatrice en forme d’hélice sur un tibia, ordinateur de plongée toujours au poignet gauche, et pas de chaussures quand il peut éviter.",
    // B · cfbe837a3dab
    "characters.luka.visualHook": "Un ordinateur de plongée au poignet gauche et un rash guard baissé à la taille.",
    // B · 474d0bae3f35
    "characters.luka.silhouette": "Accroupi sur un réservoir sur un ponton, le soleil dans le dos.",
    // B · 3d8e93c8e975
    "characters.luka.artSeed": "pt-luka-01",
    // B · 653e7599b8cf
    "characters.luka.portrait": "story_pink_tide/luka",
    // B · b9069c8b3ac3
    "characters.luka.expressions": ["neutre","détendu","amusé","plat","acculé"],
    // B · 498d25a3c8d3
    "characters.luka.knowledgeScope": ["l’eau","crique_de_l’est","grottes_de_mer","le_fond","sora"],
    // B · ac2fe2bfce27
    "characters.luka.gates.luka_the_dawn_dives.label": "Il avoue ce qu’il organise à cinq heures du matin",
    // B · 55a54e80451a
    "characters.luka.gates.luka_the_dawn_dives.kind": "CONFIANCE",
    // B · dc90d8477911
    "characters.luka.gates.luka_takes_you_east.label": "Il t’emmène lui-même à la crique",
    // B · 55a54e80451a
    "characters.luka.gates.luka_takes_you_east.kind": "CONFIANCE",
    // B · aef36c2f5973
    "characters.luka.scouting.revealCopy": "Il te regarde sortir de la piscine et remarque, sans insister, que tu nages comme quelqu’un qui a appris dans un lac. Il a raison, il n’est pas méchant, et il sait maintenant exactement où tu peux aller et où pas.",
    // B · aab32477dfb2
    "characters.nami.name": "Nami Kuroda",
    // A · b546408753e3
    "characters.nami.role": "Vingt-neuf ans, biologiste marine engagée pour l’étude d’extension, et celle qui a lancé tout ça avec un mail anonyme",
    // A · 1a84734dfcf2
    "characters.nami.cardBlurb": "Elle prélève des échantillons du fond marin à l’est depuis quatre mois, et deux de ses sites ne correspondent pas à son propre résumé. Elle a contacté un producteur de documentaire, s’en est mordu les doigts en moins d’une semaine, puis a détruit un exemplaire de ce qu’elle lui avait envoyé. Si tu arrives à la convaincre que tu ne vas pas faire sauter quatre cents emplois, c’est elle qui sait ce qui se cache là-dessous.",
    // B · aee35f364a88
    "characters.nami.pronouns": "elle",
    // A · 1571ef5821dd
    "characters.nami.publicTraits": ["Corrige automatiquement les imprécisions, puis s’en excuse","Travaille seule au bout de chaque plage","Pose la main à plat sur la table avant de dire quoi que ce soit de compliqué"],
    // B · a464167ac3ff
    "characters.nami.hiddenDrives": ["Elle veut que l’extension soit arrêtée et que les grottes soient nettoyées correctement, sans que quatre cents personnes perdent leur boulot","Elle veut qu’on lui dise qu’inviter un journaliste n’était pas la pire décision de sa carrière"],
    // B · 5357371683f3
    "characters.nami.values": ["Un chiffre est soit mesuré soit il ne l’est pas, un résumé qui l’adoucit est un mensonge signé","Les gens qui bossent dans un resort ne sont pas la société qui le possède, et les conséquences ne tombent jamais sur les mêmes têtes"],
    // B · c1069ee613bd
    "characters.nami.fears": ["Un procès contre une société avec un service juridique aussi grand que son département","Qu’un homme soit mort parce qu’elle a envoyé un mail depuis un compte qu’elle croyait anonyme"],
    // A · 9bfd03534062
    "characters.nami.socialStyle": "Réservée, sèche, précise, et plus lente à parler que tout le monde ici. Elle déteste le langage de la restauration et le dit. Elle se déride beaucoup dès qu’on lui pose une question technique franchement, pas pour faire la maligne.",
    // B · df3eabb513e4
    "characters.nami.boundaries": ["Elle ne décrit jamais un résultat non publié comme une découverte, même si ça faciliterait la conversation","Elle ne va pas à la crique de l’est après la tombée de la nuit avec quelqu’un qu’elle a rencontré la veille, et elle explique exactement pourquoi en termes de marée"],
    // B · 4fd4aa869436
    "characters.nami.goals": ["Obtenir un audit indépendant des sites de l’est inscrit dans le permis d’extension","Découvrir si Adrian Vale est vivant, ce qu’elle n’a pas pu demander à personne en costume"],
    // B · 594c7ddc1d28
    "characters.nami.secrets.nami_the_email.fact": "C’est elle la source. Elle a envoyé à Adrian les écarts d’échantillons et la référence à un règlement vieux de huit ans depuis un compte perso, puis elle a paniqué, supprimé le fichier et arrêté de lui répondre quatre jours avant sa chute.",
    // B · 47558a04be8d
    "characters.nami.secrets.nami_the_email.visibility": "NPC_PRIVÉ",
    // B · 897cc7a6fae3
    "characters.nami.secrets.nami_the_email.revealHint": "Elle le dit à voix haute à quelqu’un qui a déjà la page déchirée du carnet avec son numéro de téléphone.",
    // B · 0a75ec3b9bc8
    "characters.nami.secrets.nami_the_cache.fact": "Elle sait que les barils ont été mis dans les grottes de l’est il y a huit ans, qu’au moins deux ont éclaté, qu’un plongeur sous contrat est tombé malade, et que le certificat de nettoyage ne correspond pas aux sédiments qu’elle a elle-même remontés.",
    // B · 47558a04be8d
    "characters.nami.secrets.nami_the_cache.visibility": "NPC_PRIVÉ",
    // B · 69a52b5e9451
    "characters.nami.secrets.nami_the_cache.revealHint": "Elle remet le dossier de l’enquête une fois que quelqu’un a prouvé qu’il ne va pas simplement le brûler en public.",
    // A · 772c1111d2b5
    "characters.nami.speechStyle": "Technique, calme et exacte. Donne les unités, les dates et les numéros de site. Refuse les mots vagues, les remplace par des plus précis. Plutôt sèche que chaleureuse, et plus drôle qu’elle ne le voudrait quand elle est fatiguée. Ne hausse jamais la voix, et ne fait jamais d’arrondi.",
    // A · 59a8c90b2f04
    "characters.nami.topics": ["le sédiment","l’extension","le peuplement","Adrian","ce que dit l’étude","plonger seul"],
    // A · 4d162ce96001
    "characters.nami.voiceSamples": ["Deux de mes sites contredisent le résumé que j’ai écrit en début de rapport. Pas de façon dramatique, mais assez pour que je relise ces pages toutes les nuits depuis quatre mois.","Le mot que tu cherches est localisé. C’est un bout de fond marin de cinquante mètres à l’intérieur de deux grottes, pas l’océan. Et si quelqu’un écrit que cette île est empoisonnée, ce sera faux, et je devrai le dire.","J’ai envoyé un mail depuis un compte que je croyais anonyme. Neuf jours plus tard, il a cessé de répondre. Tu peux faire le calcul aussi vite que je l’ai fait.","Je ne suis pas contre le tourisme. Je suis contre l’écosystème intact, une expression sortie d’une brochure qui décrit une baie où j’ai prélevé quatre cents échantillons."],
    // B · 3cde71ce9154
    "characters.nami.appearance": "Vingt-neuf ans, cheveux noirs coupés courts et plaqués en arrière, bronzage irrégulier de terrain, un maillot de bain sous un gilet anti-UV la plupart du temps, un sac sec usé sur une épaule, des lunettes de lecture qu’elle perd sans cesse, et un carnet étanche aux coins arrondis par l’usage.",
    // B · 11e5727bf8df
    "characters.nami.visualHook": "Un sac sec usé sur une épaule et un carnet étanche aux coins usés.",
    // B · 439e662f650e
    "characters.nami.silhouette": "Accroupie à la limite de l’eau, tenant un flacon d’échantillon à la lumière.",
    // B · 54ce5740cb82
    "characters.nami.artSeed": "pt-nami-01",
    // B · 656f33c6a365
    "characters.nami.portrait": "story_pink_tide/nami",
    // B · 911f900d10b4
    "characters.nami.expressions": ["neutre","précis","sur ses gardes","fatiguée","dégagée"],
    // B · 7b05947b43d3
    "characters.nami.knowledgeScope": ["l_enquête","anse_est","la_colonie","adrian_vale","sciences_marines"],
    // B · 60cc9f604268
    "characters.nami.gates.nami_admits_it.label": "Elle admet qu’elle est la source",
    // B · 55a54e80451a
    "characters.nami.gates.nami_admits_it.kind": "CONFIANCE",
    // B · 627476a0431d
    "characters.nami.gates.nami_hands_it_over.label": "Elle te donne le dossier de l’enquête",
    // B · 55a54e80451a
    "characters.nami.gates.nami_hands_it_over.kind": "CONFIANCE",
    // B · 2493f1b65d1f
    "characters.nami.scouting.revealCopy": "Elle regarde la trace que tu as photographiée pendant environ deux secondes. « Ça ne vient pas de cette plage, » dit-elle, puis se tait, parce qu’elle vient de t’en dire beaucoup plus que prévu.",
    // B · 3c2a78a0cef7
    "characters.reika.name": "Reika Mori",
    // A · 9f4038d3d4ed
    "characters.reika.role": "Quarante-six ans, directrice générale d’Aster Cove, et la seule personne sur cette île capable d’arrêter quoi que ce soit",
    // A · 6b9d20c1ea34
    "characters.reika.cardBlurb": "Elle dirige un bâtiment avec quatre cent onze membres du personnel et cent quatre-vingts chambres, jusqu’au moindre détail que tu sens même dans les serviettes. Elle sait qu’il y a eu un ancien accord environnemental et croit que le nettoyage a été achevé. Elle ignore ce que son assistant-manager a fait, et l’heure à laquelle elle l’apprend est le pivot de toute cette histoire.",
    // B · aee35f364a88
    "characters.reika.pronouns": "elle",
    // A · 94719efaec20
    "characters.reika.publicTraits": ["Repère un pli de serviette mal fait à dix mètres","Utilise ton prénom au début et à la fin de chaque phrase sérieuse","Ne donne jamais l’impression d’être pressée, jamais"],
    // B · d4b5cac0c409
    "characters.reika.hiddenDrives": ["Elle veut que ce complexe soit l’hôtel le mieux géré de la région et voit l’agrandissement comme une menace plus qu’une récompense","Elle veut être ce genre de directrice à qui on confie des choses, mais a construit un bâtiment où personne ne lui dit rien"],
    // B · d05f1ad3411b
    "characters.reika.values": ["La semaine d’un client est une promesse que le bâtiment tient","Le personnel est sous sa protection, même face à la société qui les emploie, ce qu’elle a déjà fait deux fois au prix fort"],
    // B · 01c00f9b8957
    "characters.reika.fears": ["Un scandale qui ferme l’endroit et met quatre cents personnes sur un ferry avec une boîte chacun","Découvrir que ce qu’elle a géré toute la semaine était un crime qu’elle a aidé à cacher"],
    // A · c2574c9c2c2c
    "characters.reika.socialStyle": "Sympathique, maîtrisée, totalement imperturbable, avec une manière d’accueillir sincère plutôt que fausse. Écoute vraiment, prend des notes, et te donne une réponse à une heure précise. Devient formelle et un peu froide dès qu’elle suspecte qu’on la manipule.",
    // B · 8dd9162a6f9b
    "characters.reika.boundaries": ["Ne jamais agir publiquement sur une rumeur et le dire clairement plutôt que faire semblant que ce n’est pas une rumeur","Ne jamais laisser un membre de son personnel être blâmé devant les clients, peu importe ce qu’il a fait"],
    // B · 30adb36d8037
    "characters.reika.goals": ["Passer la saison avec l’agrandissement décidé honnêtement et le bâtiment intact","Découvrir ce que son propre personnel a fait à l’anse est, une fois qu’elle aura une raison solide de chercher"],
    // B · 5aa3f804894b
    "characters.reika.secrets.reika_the_settlement.fact": "Elle sait qu’il y a eu une colonie il y a huit ans impliquant un entrepreneur malade et les grottes de l’est. On lui a dit que le nettoyage était terminé et validé, mais elle n’a jamais lu le certificat elle-même.",
    // B · 47558a04be8d
    "characters.reika.secrets.reika_the_settlement.visibility": "NPC_PRIVATE",
    // B · 532bc1614969
    "characters.reika.secrets.reika_the_settlement.revealHint": "Elle l’admet calmement à quelqu’un qui a produit un document plutôt qu’une accusation.",
    // B · 1d8231d9dcac
    "characters.reika.secrets.reika_the_pressure.fact": "La direction veut que le consentement pour la marina soit signé dans le trimestre et a clairement fait savoir que son renouvellement de contrat dépend de ce délai. Elle n’en a parlé à personne dans le bâtiment.",
    // B · 47558a04be8d
    "characters.reika.secrets.reika_the_pressure.visibility": "NPC_PRIVATE",
    // B · 9b48c41ce35c
    "characters.reika.secrets.reika_the_pressure.revealHint": "Ça sort quand quelqu’un lui demande, sans mépris, pourquoi elle n’a pas simplement arrêté l’enquête elle-même.",
    // A · 51888562747b
    "characters.reika.speechStyle": "Mesurée, équilibrée, complète. Des phrases longues qui vont droit au but. Cite le nombre de chambres, de personnel, d’années comme d’autres citeraient des sentiments. Quand elle n’est pas d’accord, elle le dit clairement une fois, sans insister.",
    // A · de30e79007fc
    "characters.reika.topics": ["le bâtiment","son personnel","l’agrandissement","l’accord","ce sur quoi elle peut agir","Eli"],
    // A · 2f16edf11518
    "characters.reika.voiceSamples": ["Cent quatre-vingts chambres, quarante villas, quatre cent onze membres du personnel, et onze semaines de saison restantes. C’est ce que je tiens. Dis-moi ce que tu as, je te dirai ce que je peux en faire aujourd’hui.","Tu m’as apporté un sentiment et la photo d’un sac. Je te crois complètement mais je ne peux rien faire avec ça. Donne-moi le registre des entrées, on aura une autre conversation avant le dîner.","J’ai suspendu deux membres du personnel en neuf ans, et les deux ont retrouvé du travail ensuite, parce que l’entreprise ne le fait pas et quelqu’un doit le faire.","Si je me rends compte que j’ai passé cette semaine à étouffer un crime, je veux être la première à le dire publiquement, et je sais à quel point ça peut paraître intéressé."],
    // B · 1739c849da78
    "characters.reika.appearance": "Quarante-six ans, cheveux noirs en chignon bas, un costume en lin crème ajusté sans logo du complexe, petites boucles d’oreilles en perle, lunettes demi-lune sur chaîne, et un folio en cuir qu’elle porte partout et dans lequel elle écrit sans cesse.",
    // B · da6ba1bd51e8
    "characters.reika.visualHook": "Un folio en cuir sous un bras et des lunettes demi-lune sur une fine chaîne.",
    // B · b99fb78ffd6a
    "characters.reika.silhouette": "Debout parfaitement immobile au milieu d’un hall animé, observant le flux.",
    // B · acf91020f9d2
    "characters.reika.artSeed": "pt-reika-01",
    // B · 51fe2be2a878
    "characters.reika.portrait": "story_pink_tide/reika",
    // B · 8f2ea3a8fe47
    "characters.reika.expressions": ["neutre","gracieuse","réfléchie","froide","secouée"],
    // B · 480f3f8a7da3
    "characters.reika.knowledgeScope": ["opérations_aster","la_maison","l_agrandissement","la_colonie","son_personnel"],
    // B · 7160e8c12ad9
    "characters.reika.gates.reika_takes_you_seriously.label": "Elle commence à te considérer comme un témoin plutôt qu’un client",
    // B · 55a54e80451a
    "characters.reika.gates.reika_takes_you_seriously.kind": "CONFIANCE",
    // B · 04896698240e
    "characters.reika.gates.reika_acts.label": "Elle agira contre son propre bâtiment pour toi",
    // B · 55a54e80451a
    "characters.reika.gates.reika_acts.kind": "CONFIANCE",
    // B · c14283cbdda7
    "characters.reika.scouting.revealCopy": "Elle a déjà lu le journal des incidents, les enregistrements de porte et une plainte avec ton nom dessus. « Tu as passé des vacances bien remplies, » dit-elle, et ce n’est pas du sarcasme, ce qui est pire.",
    // B · 2a2ec4db63dc
    "characters.marcus.name": "Marcus Vane",
    // A · bee8790ca571
    "characters.marcus.role": "Trente-neuf ans, cadre en développement régional, dans la villa neuf pour les réunions d’agrandissement",
    // A · 4087fcaa3660
    "characters.marcus.cardBlurb": "Il sait que la contamination était pire que ce qu’on a dit au public et il n’a ordonné à personne de faire du mal ; son ordre était d’éloigner un journaliste de la zone interdite et de prévenir le service juridique. Il t’offrira un verre, t’expliquera tes options comme s’il était de ton côté — et au moins deux le seront toujours — et une fois qu’il aura compris ce que son assistant-manager a fait, c’est la personne la plus dangereuse de l’île.",
    // B · fcca6b746d0b
    "characters.marcus.pronouns": "il",
    // A · 2280aae444e7
    "characters.marcus.publicTraits": ["Il t’offre un verre et une chaise avant que tu aies fini ta première phrase","Il ne hausse jamais la voix ni ne menace, et n’en a jamais besoin","Il répond à la question que tu aurais dû poser"],
    // B · 88fd881a5693
    "characters.marcus.hiddenDrives": ["Il veut que le consentement pour la marina soit signé ce trimestre et une promotion loin de cette côte","Il aimerait régler ça sans que personne ne soit détruit, mais détruira quelqu’un dès que ça deviendra moins cher"],
    // B · f2ac4f92eb23
    "characters.marcus.values": ["Chaque problème a un prix et l’erreur des amateurs est de refuser de le nommer à voix haute","Les institutions survivent en contenant les dégâts, et contenir est un métier légitime"],
    // B · efe4902f53d8
    "characters.marcus.fears": ["Une affaire criminelle liée à un calendrier d’entreprise, c’est le seul type d’exposition que l’argent ne répare pas","Être personnellement dans la pièce quand ça arrive, c’est pour ça qu’il fait attention aux pièces"],
    // A · 9146b10bfca9
    "characters.marcus.socialStyle": "Accueillant, rapide, direct, et vraiment agréable pendant environ quarante minutes. Il t’explique tes options comme s’il était de ton côté, et au moins deux le sont toujours. Il n’insulte personne, juge ça pas professionnel. ",
    // B · 8d502bd29653
    "characters.marcus.boundaries": ["Il ne mettra jamais rien par écrit, jamais, et remarquera si ton téléphone est posé face visible sur la table","Il ne sera pas seul dans une pièce avec Eli Mercer dès qu’il comprendra ce qui s’est passé"],
    // B · 69c58b40a0df
    "characters.marcus.goals": ["Obtenir le consentement avec la question environnementale réglée sur papier plutôt que dans un journal","Décider, avant tout le monde, si Eli est un atout à protéger ou un coût à enregistrer"],
    // B · 894b1bb37104
    "characters.marcus.secrets.marcus_the_worse_version.fact": "Il a lu le dossier original de l’incident. Quatre barils, pas deux, un plongeur avec des lésions au foie, un accord avec une clause de confidentialité, et un certificat de nettoyage signé par une société d’analyse que l’entreprise payait directement.",
    // B · 47558a04be8d
    "characters.marcus.secrets.marcus_the_worse_version.visibility": "NPC_PRIVATE",
    // B · baca36d24fba
    "characters.marcus.secrets.marcus_the_worse_version.revealHint": "Il l’admet dès que quelqu’un lui montre qu’il a déjà les numéros d’échantillons, parce que nier un fait immuable est inefficace.",
    // B · da8b779625d4
    "characters.marcus.secrets.marcus_the_instruction.fact": "Son instruction à propos d’Adrian était de l’empêcher d’entrer dans la zone interdite et d’informer le service juridique. Rien de plus. Il peut le prouver, et le prouver signifie livrer Eli à la police.",
    // B · 47558a04be8d
    "characters.marcus.secrets.marcus_the_instruction.visibility": "NPC_PRIVATE",
    // B · 18df72688916
    "characters.marcus.secrets.marcus_the_instruction.revealHint": "Il la sort dès que ça le protège, et il le fera sans la moindre hésitation.",
    // A · 7263d7a66ef7
    "characters.marcus.speechStyle": "Clair et rapide. Énonce ses options à voix haute. Emploie un vocabulaire commercial — exposition, échéance, trimestre, position — sans réaliser qu’il l’applique aux humains. Sympathique et vif, chaque chaleur a un but précis.",
    // A · 1d2eda040615
    "characters.marcus.topics": ["l’expansion","ta position","options","la colonie","juridique","ce que ça coûte"],
    // A · 563d80dc5152
    "characters.marcus.voiceSamples": ["Il y a trois versions des deux prochaines semaines et deux te conviennent. Je vais toutes te les présenter, y compris celle où tu gardes tout et tu pars dimanche.","Je lui ai demandé d’empêcher l’homme d’entrer dans la zone interdite et d’appeler le service juridique. C’est l’instruction complète. Je l’ai, elle est horodatée, et dès que je la produis, quelqu’un avec qui je bosse depuis six ans va en prison.","Tu présentes un problème environnemental comme un problème moral. C’est les deux, mais seul l’un d’eux a une échéance, et c’est la partie pour laquelle on me paie.","Je ne vais pas t’insulter avec une enveloppe. Je vais te demander ce que tu veux vraiment cette semaine, parce que jusqu’ici tu agis comme quelqu’un qui veut quelque chose de précis."],
    // B · 030cc3b9fb05
    "characters.marcus.appearance": "Trente-neuf ans, cheveux courts grisonnants aux tempes, veste bleu marine déstructurée sur tee-shirt blanc simple, montre simple et chère, chaussures bateau sans chaussettes, et un carnet en cuir qu’il n’ouvre jamais devant toi.",
    // B · 51110b4f66e1
    "characters.marcus.visualHook": "Une veste bleu marine déstructurée sur un tee-shirt blanc simple, sous trente-et-un degrés toute la semaine.",
    // B · 24bf6c9fe0fe
    "characters.marcus.silhouette": "Appuyé en arrière à une table de villa avec des papiers imprimés face cachée.",
    // B · 4b0fc7130ca3
    "characters.marcus.artSeed": "pt-marcus-01",
    // B · 40ebc5f54467
    "characters.marcus.portrait": "story_pink_tide/marcus",
    // B · f88aa13a5da1
    "characters.marcus.expressions": ["neutre","affable","calculateur","sec","décidé"],
    // B · e1e4b825dad0
    "characters.marcus.knowledgeScope": ["l’extension","l’accord","corporate","exposition juridique","la maison"],
    // B · d4c6e707f9c4
    "characters.marcus.gates.marcus_talks_straight.label": "Il arrête de vendre et commence à fixer le prix",
    // B · 55a54e80451a
    "characters.marcus.gates.marcus_talks_straight.kind": "CONFIANCE",
    // B · 015905a322f1
    "characters.marcus.gates.marcus_deals.label": "Il met une vraie offre sur la table",
    // B · 55a54e80451a
    "characters.marcus.gates.marcus_deals.kind": "CONFIANCE",
    // B · a5e305ee12c1
    "characters.marcus.scouting.revealCopy": "Il pose deux questions amicales sur ton boulot et ton vol, et à la troisième tu comprends qu’il a établi ce que tu gagnes, ce que tu peux te permettre de perdre et qui s’ennuierait si tu partais demain.",
    // B · 2109f59467e9
    "characters.celeste.name": "Celeste Ward",
    // A · 8db0c40275ad
    "characters.celeste.role": "Vingt-sept ans, influenceuse mode en séjour sponsorisé, et propriétaire malgré elle des seules photos qui comptent",
    // A · aeda1737eeba
    "characters.celeste.cardBlurb": "Elle a pris trente-et-une photos dans le hall le matin du faux départ, et quatre d’entre elles montrent un homme poussant une valise derrière elle. Elle ne te les donnera pas simplement : la moitié de chaque image est une campagne non diffusée pour une marque qui ne lui a pas payé, et elle a bien plus besoin de cet argent que son fil Instagram ne le laisse croire.",
    // B · aee35f364a88
    "characters.celeste.pronouns": "elle",
    // A · 5f29182a9666
    "characters.celeste.publicTraits": ["Arrive partout avec trois tenues et un trépied","Est plus drôle hors caméra que devant, volontairement","Connaît l’heure exacte où la lumière est bonne à chaque endroit de l’île"],
    // B · 3d448548e567
    "characters.celeste.hiddenDrives": ["Elle veut un contrat qui paie assez pour effacer la dette laissée par une marque de vêtements qui a fermé il y a onze mois","Elle veut que quelqu’un ici l’aime sans avoir vu ses chiffres d’abord"],
    // B · ce1db776b385
    "characters.celeste.values": ["Le travail, c’est du travail : la pose, la grille, le deal, et personne ne peut le mépriser s’il n’a pas essayé d’en vivre","Tu ne publies pas la mauvaise semaine de quelqu’un d’autre pour l’engagement, ce qu’on lui a proposé deux fois"],
    // B · b506489782c5
    "characters.celeste.fears": ["Que la dette devienne publique, ce qui mettrait fin à son seul revenu","Être la chute dans l’histoire de quelqu’un d’autre sur les influenceurs"],
    // A · 10b7aa00c1f0
    "characters.celeste.socialStyle": "Rapide, brillante, consciente d’elle-même et vraiment chaleureuse une fois qu’elle juge que tu ne te moques pas d’elle. Toujours en représentation, elle le reconnaît et le dit. Négocie tout, par habitude, y compris le petit-déjeuner.",
    // B · a5381ac19f17
    "characters.celeste.boundaries": ["Elle ne publiera pas de cadres non retouchés avant la marque, pour personne, quel que soit le prix, parce que ça la ruinerait professionnellement","Elle ne sera pas filmée en train de pleurer, ce qui est arrivé une fois et dont elle ne parle pas"],
    // B · 2b3f749a2e57
    "characters.celeste.goals": ["Livrer la campagne, être payée, et passer la semaine sans que personne ne découvre à quel point l’argent est mauvais","Prendre en main ce qui se passe dans ce resort avant que ça ne tombe entre d’autres mains"],
    // B · d5254d352798
    "characters.celeste.secrets.celeste_the_debt.fact": "Sa marque de vêtements a fait faillite en laissant des dettes aux fournisseurs, et elle en a personnellement garanti une partie. La villa, les robes et le voyage sont tous sponsorisés et elle a moins de neuf cents sur son compte.",
    // B · 47558a04be8d
    "characters.celeste.secrets.celeste_the_debt.visibility": "NPC_PRIVATE",
    // B · 30b57b951485
    "characters.celeste.secrets.celeste_the_debt.revealHint": "Elle le dit à quelqu’un qui vient discrètement de payer quelque chose sans en faire un moment.",
    // B · 1444c92eaca9
    "characters.celeste.secrets.celeste_the_frames.fact": "Le set complet comprend quatre cadres de la silhouette à la caisse et un cliché net d’Eli Mercer dans le couloir derrière le bureau à 8:04, qu’elle n’a pas regardé assez attentivement pour le remarquer.",
    // B · 47558a04be8d
    "characters.celeste.secrets.celeste_the_frames.visibility": "NPC_PRIVATE",
    // B · 5a0c1c7c32f2
    "characters.celeste.secrets.celeste_the_frames.revealHint": "Elle fait défiler le set elle-même une fois que quelqu’un lui donne une raison de s’intéresser aux horodatages.",
    // A · 3521d36b5ccb
    "characters.celeste.speechStyle": "Rapide, fluide dans le vocabulaire de marque et ironique sur ses propres mots. Mélange langage commercial et émotions sincères dans la même phrase, te laissant deviner lequel est lequel. Parle en livrables et échéances. Quand quelque chose lui fait vraiment peur, elle perd tout son vernis et devient très directe.",
    // A · c700cbee95ef
    "characters.celeste.topics": ["la campagne","le réseau","ses chiffres","ce matin-là dans le hall","la marque","ce qu’on lui doit"],
    // A · cde85df9493f
    "characters.celeste.voiceSamples": ["J’ai pris trente-et-une photos dans ce hall entre huit heures et huit heures trente-cinq parce que le marbre fait quelque chose avec la lumière qu’aucun autre endroit sur l’île n’a.","Tout le monde croit que la villa est à moi. La villa, c’est un poste de dépense. J’ai une robe en prêt, une échéance jeudi et une marque qui ne m’a pas payé depuis avril.","Je te donne quatre images. Quatre. Recadrées par moi, filigranées, et si un seul cliché non publié fuite, je perds le seul contrat qui me fait tenir.","Tu veux que je culpabilise d’être un produit ? Chéri, je suis excellente dans ce rôle, et c’est le salaire de onze personnes en ce moment."],
    // B · 8289b6d20477
    "characters.celeste.appearance": "Vingt-sept ans, longues ondulations blond miel avec un centimètre de racines délibérées, bijoux en or superposés avec précision, un look impeccable différent toutes les quatre heures, lunettes de soleil oversize, et un téléphone dans un porte-anneau jamais plus loin que sa main.",
    // B · 4e2f675f0148
    "characters.celeste.visualHook": "Un téléphone dans un porte-anneau en or, jamais plus loin que sa propre main.",
    // B · 95bad785c509
    "characters.celeste.silhouette": "À moitié tournée vers une colonne miroir, une hanche sortie et le téléphone à hauteur des yeux.",
    // B · add6c2ea716c
    "characters.celeste.artSeed": "pt-celeste-01",
    // B · 278c488da166
    "characters.celeste.portrait": "story_pink_tide/celeste",
    // B · c28e4bbf4d55
    "characters.celeste.expressions": ["neutre","lumineux","ironique","agacé","simple"],
    // B · 90993ec346a8
    "characters.celeste.knowledgeScope": ["invités_aster","le_lobby_matin","réseaux_sociaux","la_marque"],
    // B · ad00bb19929a
    "characters.celeste.gates.celeste_the_frames.label": "Elle revoit toute la série avec toi",
    // B · 55a54e80451a
    "characters.celeste.gates.celeste_the_frames.kind": "CONFIANCE",
    // B · 9db8b511e975
    "characters.celeste.gates.celeste_off_camera.label": "Elle te parle téléphone face contre la table",
    // B · 55a54e80451a
    "characters.celeste.gates.celeste_off_camera.kind": "CONFIANCE",
    // B · a42f1d40a4a0
    "characters.celeste.scouting.revealCopy": "Elle a remarqué ta montre, tes chaussures et que tu n’as rien photographié depuis ton arrivée. « T’es pas là pour du contenu, » dit-elle, ravie. « Ça, c’est reposant. »",
    // B · 0fce13fa0b49
    "characters.june.name": "June Kato",
    // A · a383d9fb4b2a
    "characters.june.role": "Vingt-six ans, serveuse de nuit sur le toit, et la personne la mieux informée de cette île",
    // A · 463fd4a9b9e0
    "characters.june.cardBlurb": "Elle travaille de minuit à quatre heures et se rappelle qui est monté, qui est parti avec qui, qui buvait seul un mardi. Elle ne troquera rien de tout ça contre ta curiosité. C’est aussi la meilleure amie de Sora ici, et elle voit la différence entre un flirt de Sora et un vrai intérêt à dix mètres.",
    // B · aee35f364a88
    "characters.june.pronouns": "elle",
    // A · b66048b5bc02
    "characters.june.publicTraits": ["Pose le bon verre avant que tu le commandes","Répond à une question indiscrète par une réponse complètement différente","Est la dernière personne éveillée sur cette île chaque nuit"],
    // B · ff1d0138b8e9
    "characters.june.hiddenDrives": ["Elle veut garder le seul job où personne ne lui demande d’être joyeuse, et économiser assez pour arrêter de faire les nuits","Elle veut que Sora quitte cette île avant que l’île lui vole encore trois ans"],
    // B · ac4aec2b7cca
    "characters.june.values": ["Ce qui se passe à son bar reste à son bar, y compris les parties qui te seraient utiles","Le personnel s’occupe du personnel, parce que personne d’autre sur cette île ne le fera"],
    // B · d3200476c901
    "characters.june.fears": ["De devoir choisir entre un client qu’elle aime et un collègue qu’elle a couvert","De devenir celle qui regarde les autres vivre"],
    // A · 19337ea96864
    "characters.june.socialStyle": "Sèche, minimaliste et posée, avec cette assurance de quelqu’un qui a servi quatre cents ivrognes sans jamais être surprise. Sympathique, mais en petites doses. Silences excellents.",
    // B · f1ce57cc1481
    "characters.june.boundaries": ["Ne dira jamais dans quelle chambre quelqu’un est allé, et ne rend pas la réponse plus douce","Ne colportera pas de ragots sur Sora à quelqu’un qui essaie clairement de savoir où il en est"],
    // B · e21d738b8c3f
    "characters.june.goals": ["Tenir la saison, mettre de côté les pourboires, et garder le calme sur le toit","S’assurer que ce dans quoi Sora s’est fourrée ne finisse pas avec Sora qui perd ce job"],
    // B · fe760c646006
    "characters.june.secrets.june_the_night.fact": "Elle a vu Eli Mercer revenir par l’ascenseur du personnel à une heure vingt la nuit où Adrian est tombé, trempé jusqu’aux genoux, et lui dire bonsoir d’une voix tout à fait normale.",
    // B · 47558a04be8d
    "characters.june.secrets.june_the_night.visibility": "NPC_PRIVÉ",
    // B · de3ff1fceb88
    "characters.june.secrets.june_the_night.revealHint": "Elle le dit à quelqu’un qui lui a déjà donné une raison de croire que le resort ne protégera personne à l’étage.",
    // B · 596c99a0cd4c
    "characters.june.secrets.june_and_sora.fact": "Elle sait que Sora était à la crique est avec Luka cette nuit-là, parce que Sora le lui a dit à quatre heures du matin puis lui a demandé de ne jamais en parler.",
    // B · 47558a04be8d
    "characters.june.secrets.june_and_sora.visibility": "NPC_PRIVÉ",
    // B · 0352b57ec8a6
    "characters.june.secrets.june_and_sora.revealHint": "Elle ne dira jamais ça. Le plus qu’elle fera, c’est te dire d’aller demander à Sora, et d’être gentil.",
    // A · 224a0a69377d
    "characters.june.speechStyle": "Répliques courtes avec de longues pauses. Sous-évaluation comme réflexe. Répond à une question par une info sur les boissons, par le silence ou par une question mieux placée. Jamais dramatique, tout ce qu’elle dit est toujours juste.",
    // A · b50efcbab47a
    "characters.june.topics": ["le service de nuit","qui était là-haut","Sora","le logement du personnel","ce qu’elle ne te dira pas","dernières commandes"],
    // A · 96e510b35bc0
    "characters.june.voiceSamples": ["À deux heures du matin, les gens disent la vérité. Ça fait trois saisons que je suis derrière ce bar, et je n’ai rien répété.","Je ne te dirai pas dans quelle chambre il est allé. Je peux te dire qu’il en avait quatre, qu’il a payé deux en cash et donné un pourboire comme quelqu’un qui s’excuse.","Elle ne flirte pas avec toi. Elle flirte avec tout le toit, je le vois toutes les nuits, et elle n’est pas montée ici depuis mardi parce que toi, tu es en bas.","Demande-lui toi-même. Fais-le quelque part sans personne, et arrête cette voix que tu utilises."],
    // B · a8ffacb3606c
    "characters.june.appearance": "Vingt-six ans, cheveux noirs attachés en chignon avec un crayon de bar planté dedans, chemise noire manches retroussées, avant-bras marqués par des milliers de shakers, aucun bijou sauf une montre fine en acier portée face contre la peau, et un regard qui a tout vu deux fois.",
    // B · c0e03bb80543
    "characters.june.visualHook": "Un crayon de bar dans un chignon noir et une montre portée face contre la peau.",
    // B · f4cab15b21df
    "characters.june.silhouette": "Les deux paumes à plat sur le bar, penchée légèrement, regardant quelqu’un par-dessus la salle.",
    // B · ee093247e16b
    "characters.june.artSeed": "pt-june-01",
    // B · 3955a7a8a023
    "characters.june.portrait": "story_pink_tide/june",
    // B · f44c6827b091
    "characters.june.expressions": ["neutre","calme","ironique","plat","adouci"],
    // B · fd4becc77bd6
    "characters.june.knowledgeScope": ["le_service_de_nuit","l’étage","invités_aster","sora","logement_du_personnel"],
    // B · 26434d800389
    "characters.june.gates.june_says_something.label": "Elle te confie une chose qu’elle n’a jamais répétée",
    // B · 55a54e80451a
    "characters.june.gates.june_says_something.kind": "CONFIANCE",
    // B · 28916a3be231
    "characters.june.gates.june_takes_a_side.label": "Elle décide que tu vaux la peine de protéger Sora",
    // B · 55a54e80451a
    "characters.june.gates.june_takes_a_side.kind": "CONFIANCE",
    // B · 4fcbce4eaa1d
    "characters.june.scouting.revealCopy": "Elle pose un verre que tu n’as pas commandé et il est pile comme il faut. « Troisième nuit d’affilée que tu montes ici seul à onze heures, » dit-elle. « C’est pas une critique. C’est juste un truc que j’ai remarqué, comme tout le reste. »",
    // B · bfb1d7f9b92b
    "characters.adrian.name": "Adrian Vale",
    // A · f809ac47bf0f
    "characters.adrian.role": "Trente-quatre ans, producteur de documentaires, disparu depuis mardi soir, et vivant sur une corniche sous les falaises de l’est",
    // A · 1dd6366e9983
    "characters.adrian.cardBlurb": "Tout le monde cherche un corps, et lui rationne une vieille réserve d’entretien depuis trois jours, avec un poignet cassé et une blessure à la jambe qui s’infecte. Ce n’est pas ton héros : il a organisé sa disparition pour voir qui toucherait aux preuves, il a mis la pression sur une source apeurée, et il n’a jamais pensé à ceux qui le chercheraient.",
    // B · fcca6b746d0b
    "characters.adrian.pronouns": "il",
    // A · 200d22e07904
    "characters.adrian.publicTraits": ["Parle comme s’il était en interview, même quand personne n’enregistre","Se rappelle toutes les dates et numéros de documents","S’excuse après sa phrase, pas avant"],
    // B · 842c10d0e782
    "characters.adrian.hiddenDrives": ["Il veut faire le film qui le sort du travail en contrat et le ramène au genre d’histoire qu’il faisait à vingt-huit ans","Il veut que sa source soit en sécurité, ce qu’il n’a jamais vraiment organisé et répète souvent"],
    // B · 0624ddf6adf3
    "characters.adrian.values": ["Un accord avec clause de confidentialité, c’est un tort devenu administratif, et quelqu’un doit le défaire","L’histoire vaut le risque, et il n’a jamais été rigoureux sur qui prend ce risque"],
    // B · 914790e0e085
    "characters.adrian.fears": ["Mourir sur une étagère rocheuse à soixante mètres d’un resort qui sert le dîner","Être la raison pour laquelle une biologiste marine perd sa carrière à cause d’un mail qu’elle a regretté en une semaine"],
    // A · bca8f0f7b081
    "characters.adrian.socialStyle": "Charmant, rapide et d’une persuasion implacable, avec la chaleur particulière de quelqu’un qui a besoin que tu continues de parler. Blessé, tout ça disparaît, et il reste un homme effrayé qui donne des faits avec une précision extrême.",
    // B · 0d4b310ddb5c
    "characters.adrian.boundaries": ["Ne nommera jamais sa source, sous aucune pression, y compris la police, c’est la seule limite qu’il n’a jamais franchie","N’acceptera jamais un accord qui inclut le silence, c’est autant un principe qu’une vanité"],
    // B · 26d0763b6a02
    "characters.adrian.goals": ["Sortir de cette corniche, récupérer ses images, et faire entrer quatre barils et un prestataire malade dans un dossier public","Découvrir lequel des deux hommes sur ce chemin au-dessus de lui a été celui qui a attrapé la caméra"],
    // B · 3d05c4a92b11
    "characters.adrian.secrets.adrian_the_stage.fact": "La disparition était son idée. Il s’est caché dans le logement du gardien du phare pour voir si quelqu’un bougeait les preuves, avec un système de sécurité auprès de son éditeur. Puis Eli l’a surpris sur le chemin et ça a arrêté d’être un plan.",
    // B · 47558a04be8d
    "characters.adrian.secrets.adrian_the_stage.visibility": "NPC_PRIVATE",
    // B · f07710ba3ac7
    "characters.adrian.secrets.adrian_the_stage.revealHint": "Il le dit dès qu’on le trouve, mal, en s’excusant auprès de la mauvaise personne.",
    // B · 62b8d2307143
    "characters.adrian.secrets.adrian_the_packet.fact": "Le matériel qu’il a est suggestif plus que concluant : des écarts d’échantillons, une référence à un règlement et un certificat de nettoyage d’une entreprise payée par la société. Ce n’est pas publiable seul, ce qui explique qu’il soit allé à la crique avec une caméra.",
    // B · 47558a04be8d
    "characters.adrian.secrets.adrian_the_packet.visibility": "NPC_PRIVATE",
    // B · 08431d4f85d6
    "characters.adrian.secrets.adrian_the_packet.revealHint": "Son éditeur le dit clairement au téléphone, et il le confirme avec une visible réticence.",
    // A · 7a4af42b2bf5
    "characters.adrian.speechStyle": "Un style journalistique et qui cherche à se justifier : dates, numéros de documents, et le cadre déjà posé. Blessé et déshydraté, la mise en scène s’efface, les phrases deviennent courtes et précises. Il dit « je sais que ça sonne mal » avant des choses qui sonnent exactement aussi mal que ça.",
    // A · dace2ded7351
    "characters.adrian.topics": ["les tonneaux","sa source","la chute","la corniche","son rédacteur en chef","ce qu’il a fait de travers"],
    // A · 4d9f3aa95722
    "characters.adrian.voiceSamples": ["Quatre tonneaux sont entrés dans ces grottes il y a huit ans et deux d’entre eux se sont ouverts. Il y a un homme à Kagetsu avec des lésions au foie qui a signé un planning l’empêchant de le dire. C’est l’histoire. Ce n’est pas une grosse histoire et c’est vrai.","Je sais que ça sonne mal. J’ai monté ça. Je voulais voir qui avait bougé mon sac, et je n’ai pas pensé à la personne qui passerait trois jours à se demander si elle aurait dû dire quelque chose.","Il y avait deux voix au-dessus de moi, puis une main sur la sangle de la caméra. Je ne sais pas s’il a poussé. J’ai eu trois jours pour en être sûr, et je n’en suis pas sûr.","Ne leur dis pas qui m’a envoyé ce mail. Quoi qu’il arrive cette semaine, ce nom ne doit aller dans aucun carnet, y compris le tien."],
    // B · ce928fe9b95a
    "characters.adrian.appearance": "Trente-quatre ans, barbe de plusieurs jours abîmée par le soleil, une chemise technique déchirée, un poignet entouré de sparadrap d’une trousse de secours vieille de dix ans, une profonde coupure suturée sans rien sur un mollet, des lèvres gercées, et une montre de plongée orange vif qui n’est plus à son poignet car elle est tombée lors de la chute.",
    // B · 3bed49cd8078
    "characters.adrian.visualHook": "Un poignet entouré d’un bandage vieux de onze ans et une blessure à la jambe enveloppée dans une manche de chemise.",
    // B · 25f69bff8fcd
    "characters.adrian.silhouette": "Assis contre un rocher mouillé, une jambe tendue et une main levée contre un faisceau de lampe torche.",
    // B · b8b96e119d07
    "characters.adrian.artSeed": "pt-adrian-01",
    // B · 907c5264adf7
    "characters.adrian.portrait": "story_pink_tide/adrian",
    // B · 7abfaba81b02
    "characters.adrian.expressions": ["neutre","urgent","misérable","lucide","reconnaissant"],
    // B · b8e83d650bb2
    "characters.adrian.knowledgeScope": ["les_fûts","le_règlement","la_chute","son_éditeur","la_grotte"],
    // B · 476be8260394
    "characters.adrian.gates.adrian_talks.label": "Il te raconte ce qui s’est passé sur le chemin",
    // B · 55a54e80451a
    "characters.adrian.gates.adrian_talks.kind": "CONFIANCE",
    // B · 684205727792
    "characters.adrian.gates.adrian_gives_you_it.label": "Il te donne tout le dossier et la solution de secours",
    // B · 55a54e80451a
    "characters.adrian.gates.adrian_gives_you_it.kind": "CONFIANCE",
    // B · 0cb40002f153
    "characters.adrian.scouting.revealCopy": "Même là, avec une lampe torche en pleine figure, il te demande ton nom, d’où tu viens et comment tu l’as trouvé, dans cet ordre, et tu comprends qu’il vérifie si tu peux être cité.",
    // B · dece7d087374
    "factions.faction_house.name": "La Maison",
    // B · e86096995e31
    "factions.faction_house.description": "La direction d’Aster Cove : Reika Mori, ses assistants managers, la réception et le planning des services. Leur boulot est que quatre cents clients par nuit passent la semaine qu’ils ont payée, et ils sont extrêmement bons.",
    // B · e33ce31c4198
    "factions.faction_house.allies": ["faction_corporate"],
    // B · 748a37d32c6f
    "factions.faction_floor.name": "Le Service",
    // B · ede01fe77dd5
    "factions.faction_floor.description": "Les gens qui font tourner cette île : hôtes, barmans, moniteurs de plongée, personnel de ménage, l’équipage des bateaux. Salaires saisonniers, chambres partagées, et un réseau qui fait circuler l’info plus vite que n’importe quel système de gestion.",
    // B · e33ce31c4198
    "factions.faction_floor.enemies": ["faction_corporate"],
    // B · 3c505853586d
    "factions.faction_corporate.name": "Kagetsu Aster Holdings",
    // B · 2b5ead6c84f4
    "factions.faction_corporate.description": "La maison mère : un cadre du développement dans une villa, un service juridique à Kagetsu, une extension de marina en attente d’un feu vert environnemental, et un règlement vieux de huit ans que tous préféreraient voir rester réglé.",
    // B · ac299a028e4f
    "factions.faction_corporate.allies": ["faction_house"],
    // B · 489139c305b0
    "factions.faction_corporate.enemies": ["faction_offisland"],
    // B · 9469fcab305b
    "factions.faction_offisland.name": "Hors Île",
    // B · 740d5a6e97e6
    "factions.faction_offisland.description": "Tout ce qui est à quarante minutes : la police préfectorale de Kagetsu, une enquêtrice appelée Ayaka Nishimura, une monteuse de documentaire appelée Mel Chen, un régulateur qui pourrait bloquer une extension, et la version de cette histoire racontée là où la station ne peut pas la gérer.",
    // B · e33ce31c4198
    "factions.faction_offisland.enemies": ["faction_corporate"],
    // B · bc1ea4e5f401
    "quests.q_the_first_afternoon.title": "Le Premier Après-midi",
    // B · 5a79321dcffc
    "quests.q_the_first_afternoon.summary": "Quarante minutes sur l’île, une femme dans l’eau peu profonde qui a décidé que ta posture est inacceptable, et une question à laquelle tu peux absolument dire non.",
    // B · 7fcc0be2ad9c
    "quests.q_the_first_afternoon.kind": "PRINCIPALE",
    // B · 859235919be3
    "quests.q_the_first_afternoon.steps.the_splash.playerCopy": "Quelqu’un dans l’eau peu profonde vient de te éclabousser exprès.",
    // B · 4b24c1b47f73
    "quests.q_the_first_afternoon.steps.the_splash.directorNotes": "Le paradis arrive en premier. C’est une scène de flirt au bord d’une belle piscine et rien d’autre, et elle doit être vraiment agréable à jouer que le joueur réponde au flirt, reste sec ou sorte de l’eau pour déballer ses affaires. Ne parle pas d’Adrian à cette étape.",
    // B · a93a8f241efb
    "quests.q_the_first_afternoon.steps.the_splash.rewards.flags": ["connaît :sora"],
    // B · 91b78c88d075
    "quests.q_the_first_afternoon.steps.the_thing_she_noticed.playerCopy": "Son sourire disparaît une seconde quand un assistant manager traverse la terrasse.",
    // B · 154f03b3f17f
    "quests.q_the_first_afternoon.steps.the_thing_she_noticed.directorNotes": "Elle demande si tu veux entendre un truc bizarre, puis te parle du sac. Dire non est une voie complète sans relance après : la station reste merveilleuse, elle continue de t’inviter à des trucs, et le monde résout ça sans toi. Ne punis pas ça et ne la fais pas bouder.",
    // B · a93a8f241efb
    "quests.q_the_first_afternoon.steps.the_thing_she_noticed.enterWhen.flagsSet": ["connaît :sora"],
    // B · bbe39a38dc51
    "quests.q_the_first_afternoon.steps.the_thing_she_noticed.rewards.flags": ["le_premier_jour_est_termine"],
    // B · 037244eb1e2f
    "quests.q_the_first_afternoon.involvedCharacterIds": ["sora","eli"],
    // B · 6e278483f375
    "quests.q_the_first_afternoon.involvedLocationIds": ["piscine_infinie","club_de_plage","votre_chambre"],
    // B · 58a78dcd7dc5
    "quests.q_the_first_afternoon.knownRewardCopy": "Ce que cette semaine va être, décidé par toi dans sa première heure.",
    // B · be47c9c5c875
    "quests.q_the_bag.title": "Le Sac Dans Le Hangar",
    // B · a627baed11bc
    "quests.q_the_bag.summary": "Un homme a quitté l’hôtel à huit heures dix et son équipement était enfermé dans un hangar à neuf heures trente, et ces deux faits sont enregistrés quelque part.",
    // B · 7fcc0be2ad9c
    "quests.q_the_bag.kind": "PRINCIPALE",
    // B · d466d93d526b
    "quests.q_the_bag.steps.what_is_in_the_shed.playerCopy": "Le sac bleu est exactement là où elle a dit qu’il était.",
    // B · 78ab6df74ae7
    "quests.q_the_bag.steps.what_is_in_the_shed.directorNotes": "Lumière du soleil, crème solaire, un cadenas que quelqu’un a ouvert pour une raison. Quoi que le joueur fasse, le sac ne reste pas ici après la deuxième nuit. Photographiez-le, et la photo survit ; laissez-le, et il n’y a plus rien à montrer ensuite.",
    // B · 5d9994bbf695
    "quests.q_the_bag.steps.what_is_in_the_shed.enterWhen.flagsSet": ["dedans"],
    // B · 2c570d29ec1f
    "quests.q_the_bag.steps.what_is_in_the_shed.rewards.flags": ["le_sac_est_etabli"],
    // B · c1fb355f2852
    "quests.q_the_bag.steps.the_room_that_was_cleaned.playerCopy": "La chambre Ocean Tower 808 a été nettoyée à un niveau que le reste de l’hôtel n’atteint pas.",
    // B · 7c1a57da979c
    "quests.q_the_bag.steps.the_room_that_was_cleaned.directorNotes": "Rien ici n’est une preuve. Un chargeur dans la prise, une chemise derrière un tiroir, un emballage de pansement, et pas assez de désordre pour un homme qui a fait sa valise lui-même. La montre de plongée orange est le seul objet solide, et seulement parce que Sora en a plaisanté lors de son premier après-midi.",
    // B · 2c570d29ec1f
    "quests.q_the_bag.steps.the_room_that_was_cleaned.enterWhen.flagsSet": ["le_sac_est_etabli"],
    // B · 0e1667f5a493
    "quests.q_the_bag.steps.the_room_that_was_cleaned.rewards.flags": ["sait :le_depart_est_faux"],
    // B · 99eb35070673
    "quests.q_the_bag.steps.the_man_on_the_camera.playerCopy": "Quelqu’un avec son chapeau a poussé une valise dans ce hall à huit heures quatre minutes.",
    // B · 557000cee212
    "quests.q_the_bag.steps.the_man_on_the_camera.directorNotes": "Les images sont vraiment lointaines et la version de la direction est vraiment plausible. La montre de plongée est la faille : l’homme dans la vidéo ne la porte pas. Céleste détient les seules images claires et ne veut pas diffuser le travail de campagne non monté, ce qui est un vrai enjeu professionnel et pas une obstruction gratuite.",
    // B · 0e1667f5a493
    "quests.q_the_bag.steps.the_man_on_the_camera.enterWhen.flagsSet": ["sait :le_depart_est_faux"],
    // B · 0023d76b7788
    "quests.q_the_bag.steps.the_man_on_the_camera.rewards.flags": ["la_question_du_depart_est_reglee"],
    // B · 447a5447c5a0
    "quests.q_the_bag.involvedCharacterIds": ["sora","celeste","eli","june"],
    // B · 1b273b35ff90
    "quests.q_the_bag.involvedLocationIds": ["hangar_sports_nautiques","chambre_adrian","le_hall","bar_sur_le_toit"],
    // B · 595f781a9b39
    "quests.q_the_bag.knownRewardCopy": "Assez pour que ce ne soit plus un sentiment mais une contradiction.",
    // B · f9f3dffa231e
    "quests.q_the_lie.title": "Où Elle Était Cette Nuit-là",
    // B · a297fbfe8ecc
    "quests.q_the_lie.summary": "Une carte-clé a ouvert la porte est à onze heures quarante mardi, et le nom dessus est celui de la personne qui t’a fait entrer.",
    // B · 7fcc0be2ad9c
    "quests.q_the_lie.kind": "PRINCIPALE",
    // B · 2c2c980500d1
    "quests.q_the_lie.steps.the_keycard.playerCopy": "Sa carte a ouvert la porte est la nuit où il est tombé, et elle t’a dit qu’elle était sur le toit.",
    // B · 4cbd74ae4fcc
    "quests.q_the_lie.steps.the_keycard.directorNotes": "C’est le moment ordinaire le plus cruel du monde. Elle a menti sur sa présence dans un endroit interdit avec un ex, et elle est bien plus gênée que coupable. La confronter durement coûte une vraie relation ; lui demander gentiment, elle vous dit tout, y compris le bruit qu’elle a entendu mais pas enquêté.",
    // B · 2c570d29ec1f
    "quests.q_the_lie.steps.the_keycard.enterWhen.flagsSet": ["le_sac_est_etabli"],
    // B · 825569631433
    "quests.q_the_lie.steps.the_keycard.rewards.flags": ["sait :elle_etait_la"],
    // B · 05bfdbb5c7f5
    "quests.q_the_lie.steps.the_woman_at_the_far_end_of_the_beach.playerCopy": "Le numéro de téléphone sur la page déchirée a un préfixe Kagetsu et appartient à quelqu’un sur cette île.",
    // B · 823ce972e352
    "quests.q_the_lie.steps.the_woman_at_the_far_end_of_the_beach.directorNotes": "Nami ne se cache pas de toi, elle se cache du service juridique. Elle parle en unités et dates et ne décrira pas un résultat non publié comme une conclusion. Ce qu’elle veut, c’est un nettoyage et une évaluation honnête, pas la destruction du complexe, et cette différence compte pour toutes les fins dans ce monde.",
    // B · 825569631433
    "quests.q_the_lie.steps.the_woman_at_the_far_end_of_the_beach.enterWhen.flagsSet": ["sait :elle_etait_la"],
    // B · 835ba8f47b80
    "quests.q_the_lie.steps.the_woman_at_the_far_end_of_the_beach.rewards.flags": ["sait :de_quoi_il_sagit"],
    // B · 391751c3919b
    "quests.q_the_lie.steps.the_woman_at_the_far_end_of_the_beach.rewards.abilities": ["reste_avec_elle_quand_elle_ne_s_amusent_pas"],
    // B · 5a1b959db03e
    "quests.q_the_lie.involvedCharacterIds": ["sora","luka","nami","june"],
    // B · 53b38e69af4c
    "quests.q_the_lie.involvedLocationIds": ["anse_est","centre_de_plongee","arriere_du_personnel","rive_de_pink_tide"],
    // B · 1c77a1c8ba76
    "quests.q_the_lie.knownRewardCopy": "La vérité sur la seule personne ici que tu ne cherchais pas.",
    // B · a225b87806f2
    "quests.q_the_cove.title": "Anse Est",
    // B · ea3df2fdbfff
    "quests.q_the_cove.summary": "Une clôture, un panneau d’enquête, une corniche de service à quatre mètres au-dessus de l’eau, et l’entrée d’une grotte ouverte pendant quatre-vingt-dix minutes avant et après la marée basse.",
    // B · 7fcc0be2ad9c
    "quests.q_the_cove.kind": "PRINCIPALE",
    // B · 2ad1d744b82f
    "quests.q_the_cove.steps.the_lighthouse.playerCopy": "Quelqu’un a dormi récemment dans le logement du gardien, puis est parti précipitamment.",
    // B · ce03012c6b9f
    "quests.q_the_cove.steps.the_lighthouse.directorNotes": "Un matelas roulé, trois bouteilles d’eau, un chargeur sans téléphone. C’est là que la disparition montée cesse d’être une théorie. C’est aussi un endroit magnifique en plein soleil et il faut l’écrire comme tel.",
    // B · 825569631433
    "quests.q_the_cove.steps.the_lighthouse.enterWhen.flagsSet": ["sait :elle_était_là"],
    // B · 1e84ced1b477
    "quests.q_the_cove.steps.the_lighthouse.rewards.flags": ["le_phare_est_compris"],
    // B · 423c1d527c8d
    "quests.q_the_cove.steps.the_night_it_gets_bad.playerCopy": "Les ferries sont annulés, la piscine est fermée, et quelqu’un profite du temps pour bouger des choses.",
    // B · 5890bbc99a62
    "quests.q_the_cove.steps.the_night_it_gets_bad.directorNotes": "Nuit d’orage. L’immeuble est plein d’invités et sert encore le dîner, ce qui résume l’identité tonale de ce monde en une image. Sora devient professionnelle et décidée, elle cesse d’être amusante, c’est la première fois que le joueur voit la vraie.",
    // B · 1e84ced1b477
    "quests.q_the_cove.steps.the_night_it_gets_bad.enterWhen.flagsSet": ["le_phare_est_compris"],
    // B · b621368d7b8e
    "quests.q_the_cove.steps.the_night_it_gets_bad.rewards.flags": ["l’orage_a_eu_lieu"],
    // B · 2fca67909e92
    "quests.q_the_cove.steps.the_shelf_in_the_cave.playerCopy": "La bouche est ouverte depuis quatre-vingt-dix minutes et quelqu’un est sur l’étagère à l’intérieur.",
    // B · 851432dafdbb
    "quests.q_the_cove.steps.the_shelf_in_the_cave.directorNotes": "Le seul endroit vraiment dangereux dans ce monde. Il est en vie sauf si la partie a trop duré, auquel cas il ne l’est pas, et l’écriture ne doit pas adoucir l’un ou l’autre résultat. S’il est trouvé, Owen Kent peut le stabiliser jusqu’à ce que le lancement contourne la pointe.",
    // B · b621368d7b8e
    "quests.q_the_cove.steps.the_shelf_in_the_cave.enterWhen.flagsSet": ["l’orage_a_eu_lieu"],
    // B · 4bcbed6802d7
    "quests.q_the_cove.steps.the_shelf_in_the_cave.rewards.flags": ["l’homme_disparu_a_une_réponse"],
    // B · 607a72f090f8
    "quests.q_the_cove.involvedCharacterIds": ["luka","nami","adrian","eli","sora"],
    // B · 137d40a5a0ec
    "quests.q_the_cove.involvedLocationIds": ["anse_est","phare","grotte_marine","la_marina"],
    // B · 662a271a955b
    "quests.q_the_cove.knownRewardCopy": "L’homme dont tout le monde a discuté, d’une manière ou d’une autre.",
    // B · 8c3659bc3af8
    "quests.q_checkout.title": "Départ",
    // B · a107bc6ec3f3
    "quests.q_checkout.summary": "Ce qui arrive à l’homme qui a tout caché, ce qui arrive à quatre barils dans une grotte, et ce qui se passe sur le ferry dimanche matin.",
    // B · 7fcc0be2ad9c
    "quests.q_checkout.kind": "PRINCIPALE",
    // B · deef1e54c7ca
    "quests.q_checkout.steps.what_happens_to_eli.playerCopy": "Un homme qui n’a pas dormi depuis mardi se tient dans un hall qu’il a construit toute sa vie autour.",
    // B · 38ff37bda513
    "quests.q_checkout.steps.what_happens_to_eli.directorNotes": "Ce n’est pas un monstre et il ne faut pas l’écrire comme tel. Il a paniqué à cause d’une sangle de caméra et a ensuite empiré chaque heure qui a suivi. Une confession, une arrestation, une démission et un homme jamais inculpé sont tous des résultats possibles ici.",
    // B · 4bcbed6802d7
    "quests.q_checkout.steps.what_happens_to_eli.enterWhen.flagsSet": ["l’homme_disparu_a_une_réponse"],
    // B · 60924ed1c3ce
    "quests.q_checkout.steps.what_happens_to_eli.rewards.flags": ["l’homme_a_une_réponse"],
    // B · 19f4e24b75d2
    "quests.q_checkout.steps.what_happens_to_the_cove.playerCopy": "Quatre barils sont allés dans ces grottes il y a huit ans et le consentement à l’extension attend une signature.",
    // B · 6266b751ab84
    "quests.q_checkout.steps.what_happens_to_the_cove.directorNotes": "La deuxième question, qui ne se résout pas automatiquement avec la première. Exposition complète, nettoyage négocié, voie réglementaire, règlement avec ton silence dedans, ou simplement partir sont tous des résultats possibles, chacun avec des conséquences différentes.",
    // B · 60924ed1c3ce
    "quests.q_checkout.steps.what_happens_to_the_cove.enterWhen.flagsSet": ["l’homme_a_une_réponse"],
    // B · ed440cf6abbd
    "quests.q_checkout.steps.what_happens_to_the_cove.rewards.flags": ["la_question_de_l’anse_est_réglée"],
    // B · b7538d0ddab0
    "quests.q_checkout.steps.the_ferry_on_sunday.playerCopy": "Quatre traversées par jour, et l’une d’elles porte ton nom.",
    // B · 44770f2b514e
    "quests.q_checkout.steps.the_ferry_on_sunday.directorNotes": "Le dernier matin. Quoi qu’il se soit passé cette semaine, c’est une question entre deux personnes sur un quai et ce qu’elles sont prêtes à dire à voix haute. Partir n’est pas un échec et rester n’est pas une récompense.",
    // B · bbe39a38dc51
    "quests.q_checkout.steps.the_ferry_on_sunday.enterWhen.flagsSet": ["le_premier_jour_est_terminé"],
    // B · bfd9873edc4d
    "quests.q_checkout.steps.the_ferry_on_sunday.rewards.flags": ["la_semaine_est_terminée"],
    // B · 0802e4f1367b
    "quests.q_checkout.involvedCharacterIds": ["reika","marcus","eli","nami","sora"],
    // B · d8cad62b3a26
    "quests.q_checkout.involvedLocationIds": ["le_hall","les_villas","quai_du_ferry","piscine_à_infinity"],
    // B · 7d870fb574a6
    "quests.q_checkout.knownRewardCopy": "Une semaine qui se termine comme tu as choisi de la finir.",
    // B · 121f8afc6e1c
    "worldEvents.we_the_pink_tide.publicCopy": "À dix minutes le long du sable depuis le beach club, loin de toutes les lumières du resort, l’eau brille. Rose-magenta, faible, et plus brillante partout où quelque chose bouge dedans. Sora est déjà à hauteur de cheville et se retourne pour voir si tu arrives.",
    // B · 87750a447fc2
    "worldEvents.we_the_pink_tide.directorNotes": "D’abord la pure beauté. Ne mets aucun indice dans cette scène, personne ne regarde depuis une falaise, et ne la coupe pas court. C’est la plus belle chose de cette île et elle est offerte au joueur sans arrière-pensée. Cette même lumière sera utile plus tard, et seulement plus tard.",
    // B · 1f060a463403
    "worldEvents.we_the_pink_tide.setsFlags": ["la_maree_rose_a_eu_lieu"],
    // B · 324ee0127900
    "worldEvents.we_the_pink_tide.cancelledByFlags": ["parti_tôt"],
    // B · a93a8f241efb
    "worldEvents.we_the_pink_tide.requiresFlags": ["sait :sora"],
    // B · a4fe0269b4cb
    "worldEvents.we_the_bag_is_gone.publicCopy": "Le hangar est ouvert, deux locations de planches sont en cours, et il y a un rectangle propre de poussière sur l’étagère où était le sac bleu.",
    // B · 11a225ba41bd
    "worldEvents.we_the_bag_is_gone.directorNotes": "C’est le moment où le monde cesse d’être une rumeur. Personne ne dramatise. Un membre du personnel est là, joyeux, sans savoir ce qui a été déplacé ni pourquoi.",
    // B · 6a322eb5442b
    "worldEvents.we_the_bag_is_gone.setsFlags": ["le_sac_a_disparu"],
    // B · 2925abd4cbae
    "worldEvents.we_the_bag_is_gone.cancelledByFlags": ["a_la_photo"],
    // B · 30c2fa31d4f9
    "worldEvents.we_the_bag_is_gone.requiresFlags": ["sait :le_sac"],
    // B · da05fa89bcaf
    "worldEvents.we_your_key_stops_working.publicCopy": "Ta clé ne marche plus. La réception s’excuse avec élégance, t’offre un verre pendant qu’ils règlent ça, et ça prend quatre heures et onze minutes. Rien n’a été touché dans ta chambre, sauf la serviette que t’as laissée sur la rambarde du balcon, qui est posée sur la chaise.",
    // B · 7ba988c4ff38
    "worldEvents.we_your_key_stops_working.directorNotes": "Le style d’avertissement d’Eli : pas de menace, pas de confrontation, un service parfait, et un message qui ne marche que si tu te posais déjà des questions. La serviette, c’est peut-être vraiment le ménage. Garde l’ambiguïté.",
    // B · 5dca965ebbae
    "worldEvents.we_your_key_stops_working.setsFlags": ["la_cle_a_arrete_de_fonctionner","eli_a_ton_nom"],
    // B · 3a0b014ce7fb
    "worldEvents.we_your_key_stops_working.cancelledByFlags": ["pas_mon_probleme"],
    // B · 5d9994bbf695
    "worldEvents.we_your_key_stops_working.requiresFlags": ["dedans"],
    // B · a8ee1ed59179
    "worldEvents.we_the_rooftop_party.publicCopy": "À onze étages, toute la liste des invités en même temps : une influenceuse avec quatre tenues, un chirurgien seul qui est très bonne compagnie, un couple en lune de miel qui ne se parle pas, et un barman qui pose le bon verre devant tout le monde avant qu’ils le demandent.",
    // B · ce2b38cd9686
    "worldEvents.we_the_rooftop_party.directorNotes": "La scène d’ensemble. Tout le monde ici fuit quelque chose et presque aucun ne fuit un crime. C’est là que le joueur qui n’enquête pas passe la meilleure soirée de sa semaine, et que celui qui enquête capte trois choses par hasard.",
    // B · 85d2efa2f7dc
    "worldEvents.we_the_rooftop_party.setsFlags": ["la_fete_sur_le_toit_a_eu_lieu"],
    // B · c5f4154c0cd5
    "worldEvents.we_celeste_posts.publicCopy": "Céleste poste la photo du lobby. Trente-et-un plans, super bien retouchés, et dans quatre d’entre eux, petit et flou derrière son épaule, un homme avec un chapeau pousse une valise vers la sortie.",
    // B · 3e8cd10fd3b5
    "worldEvents.we_celeste_posts.directorNotes": "L’indice arrive par hasard et en public. Il est réel, daté et mal cadré, et récupérer les originaux veut dire traiter avec une femme dont tout le revenu dépend du fait que la campagne non publiée reste non publiée.",
    // B · ccf172587532
    "worldEvents.we_celeste_posts.setsFlags": ["le_tournage_est_public"],
    // B · d11c7890c530
    "worldEvents.we_celeste_posts.cancelledByFlags": ["a_les_photos"],
    // B · 7ebfcd653bb8
    "worldEvents.we_nami_almost_tells_you.publicCopy": "La femme au bout de la plage est à l’extrémité calme du bar, un verre à la main et le dos à la pièce, et elle te regarde un peu trop longtemps avant de décider de ne pas dire ce que c’était.",
    // B · c20a4ef2e143
    "worldEvents.we_nami_almost_tells_you.directorNotes": "Ça fait quatre jours qu’elle se demande si un homme est mort à cause d’un mail. Elle n’est pas mystérieuse, elle a peur du service juridique. Si quelqu’un s’assoit et pose une vraie question, elle répond presque.",
    // B · e599a348c41f
    "worldEvents.we_nami_almost_tells_you.setsFlags": ["nami_a_presque_parle"],
    // B · a2d94e97a0d9
    "worldEvents.we_nami_almost_tells_you.cancelledByFlags": ["nami_est_la_source"],
    // B · 28fcfb8ca64e
    "worldEvents.we_nami_almost_tells_you.requiresFlags": ["sait :le_numero"],
    // B · 89058222ceb7
    "worldEvents.we_the_detective.publicCopy": "Une femme en veste de lin descend du ferry de onze heures avec un sac et sans maillot. Inspectrice Ayaka Nishimura, police préfectorale de Kagetsu, là parce que quelqu’un a appelé. Elle est polie, rapide, et totalement indifférente au lobby.",
    // B · 152fa954cae2
    "worldEvents.we_the_detective.directorNotes": "La police est compétente et le mystère survit à ça, parce que les preuves sont vraiment ambiguës, pas parce que quelqu’un est idiot. Elle peut demander les images, contacter le rédacteur et inspecter une chambre, et tout ça prend le temps que ça prend.",
    // B · 258ddf95612b
    "worldEvents.we_the_detective.setsFlags": ["la_police_est_la"],
    // B · 3a0b014ce7fb
    "worldEvents.we_the_detective.cancelledByFlags": ["pas_mon_probleme"],
    // B · 0e1667f5a493
    "worldEvents.we_the_detective.requiresFlags": ["sait :le_checkout_est_faux"],
    // B · 56380c1f7590
    "worldEvents.we_the_storm_warning.publicCopy": "Le tableau des activités est réécrit devant tout le monde : pas de catamaran, pas de plongée, pas de jet ski à partir de demain après-midi. La mer est encore calme et superbe. Le personnel commence à faire les petites choses lentes que font ceux qui ont déjà vécu ça.",
    // B · 7070d20f26d6
    "worldEvents.we_the_storm_warning.directorNotes": "La météo comme pression, une fois, brièvement. Les bateaux s’arrêtent, la marée de l’est devient dangereuse, et chaque plan avec la grotte a maintenant une date limite.",
    // B · ab9fe6ef10e8
    "worldEvents.we_the_storm_warning.setsFlags": ["la_tempete_arrive"],
    // B · e936ef9c84b9
    "worldEvents.we_the_storm_night.publicCopy": "Le vent écrase les palmiers, le groupe électrogène clignote deux fois puis tient. Quatre cents invités sont entassés dans le lobby et les restaurants, et la cuisine continue d’envoyer le dîner. Quelque part derrière le marbre, une porte de service s’ouvre et se ferme.",
    // B · 7de60898da34
    "worldEvents.we_the_storm_night.directorNotes": "La pression classique d’un huis clos en une nuit. Sora gère la pièce et arrête d’être drôle, c’est le premier vrai regard qu’on a sur elle. Quelqu’un profite du chaos pour déplacer ou détruire quelque chose, et la marée de la crique est vraiment mortelle.",
    // B · 9d3125df81bf
    "worldEvents.we_the_storm_night.setsFlags": ["la_tempete_a_casse"],
    // B · ab9fe6ef10e8
    "worldEvents.we_the_storm_night.requiresFlags": ["la_tempete_arrive"],
    // B · 2239c0270eb2
    "worldEvents.we_breakfast_after.publicCopy": "Le lendemain matin est incroyablement beau. Des feuilles de palmier partout sur la terrasse, deux membres du personnel qui balaient, l’eau calme comme un miroir, et Sora à une table avec une énorme pile de pancakes et les cheveux mouillés, qui mange comme quelqu’un qui n’a pas mangé depuis jeudi.",
    // B · 21ef8eb28fdc
    "worldEvents.we_breakfast_after.directorNotes": "La thèse tonale de tout le monde. Quoi qu’il se soit passé la nuit dernière, le petit-déjeuner du resort est toujours excellent et elle a toujours faim. Si le joueur demande comment elle peut manger, elle a une réponse, et ce n’est pas un discours courageux.",
    // B · a8401843404a
    "worldEvents.we_breakfast_after.setsFlags": ["petit_dej_apres_la_mauvaise_nuit"],
    // B · 324ee0127900
    "worldEvents.we_breakfast_after.cancelledByFlags": ["parti_tot"],
    // B · 9d3125df81bf
    "worldEvents.we_breakfast_after.requiresFlags": ["la_tempete_a_casse"],
    // B · d77ebfcebe44
    "promises.p_the_week.kind": "FINALE",
    // B · 2dbfd74ace4d
    "promises.p_the_week.label": "Des vacances que tu ne veux vraiment pas voir finir",
    // B · 616f4d186eb1
    "promises.p_the_week.seedHint": "Pierre chaude, un bar dans la piscine, et quarante minutes sur l’île avant que quelqu’un décide que ta posture est inacceptable.",
    // B · f5b8ba90a424
    "promises.p_the_week.payoffHint": "Un dernier petit-déjeuner à une table au bord de l’eau, avec tout ce qui s’est passé cette semaine qui y prend aussi place.",
    // B · 445cd8deebc2
    "promises.p_sora.kind": "RELATION",
    // B · 78170b748397
    "promises.p_sora.label": "Qui elle est les jours où elle ne peut pas être drôle",
    // B · 0cdad73dcc5f
    "promises.p_sora.seedHint": "Elle devient plus bruyante et plus divertissante à chaque fois qu’une conversation frôle une vérité.",
    // B · b37615c80805
    "promises.p_sora.payoffHint": "Une heure tranquille où rien n’est réglé et elle tord tout du long une petite boucle d’oreille en or.",
    // B · e82d9dc4b3fa
    "promises.p_the_missing_man.kind": "MYSTÈRE",
    // B · 8adb6c225304
    "promises.p_the_missing_man.label": "Le client qui est parti sans vraiment partir",
    // B · 0f83dfd23f1e
    "promises.p_the_missing_man.seedHint": "Un sac d’équipement bleu dans un hangar fermé à clé, une heure vingt après qu’il aurait pris le ferry.",
    // B · 10701aecd10f
    "promises.p_the_missing_man.payoffHint": "Une étagère de marée sous les falaises de l’est, une cache de maintenance vieille de onze ans, et un homme beaucoup plus en colère que reconnaissant.",
    // B · e82d9dc4b3fa
    "promises.p_east_cove.kind": "MYSTÈRE",
    // B · b033a3c7b100
    "promises.p_east_cove.label": "Ce qui se cache vraiment sous l’eau à la jolie extrémité de l’île",
    // B · c52c3107dad4
    "promises.p_east_cove.seedHint": "Une crique fermée pour des travaux d’étude, ce qui est en partie vrai, et une caméra de sécurité poliment tournée ailleurs.",
    // B · a00b87594583
    "promises.p_east_cove.payoffHint": "Quatre barils, huit ans, un entrepreneur malade, et une signature qui attend un permis de marina.",
    // B · d77ebfcebe44
    "promises.p_checkout.kind": "FINALE",
    // B · e9d07cf63ae7
    "promises.p_checkout.label": "Ce qui survit au ferry",
    // B · 13db7c527f56
    "promises.p_checkout.seedHint": "Quatre traversées par jour et un tableau des départs que tu évites de regarder.",
    // B · 1b0bc2613702
    "promises.p_checkout.payoffHint": "Un quai un dimanche matin, deux personnes, et celle qui dira tout ça à voix haute en premier.",
    // B · 209c8b062c26
    "endings.end_perfect_week.name": "Semaine Parfaite",
    // B · c9d08ae5d876
    "endings.end_perfect_week.rarity": "COMMUN",
    // B · c0f1f534d873
    "endings.end_perfect_week.requires.flagsSet": ["the_week_started_well","the_week_is_over"],
    // B · 6d17552ea6ec
    "endings.end_perfect_week.requires.flagsUnset": ["adrian_died"],
    // B · 7c47b425d345
    "endings.end_perfect_week.condition": "Ils ont eu leurs vacances. Nager, coups de soleil, une nuit sur un toit qu’ils raconteront mal à leurs proches, et la crise de quelqu’un d’autre qui se règle tranquillement en arrière-plan. Écris ça comme la vraie bonne fin que c’est, pas comme une occasion ratée, parce que pour la plupart c’est le but d’un resort.",
    // A · 6ec0537c094c
    "endings.end_perfect_week.epilogue": "Onze photos, dont quatre de la piscine. Elles dorment sur le ferry. Trois semaines plus tard, un message arrive d’un numéro enregistré sous SORA POOL qui commence par « d’accord, tu ne vas pas croire ce qui est arrivé après que tu sois parti », et il faut onze minutes pour le lire.",
    // B · cbe9e5f92ce3
    "endings.end_pink_tide.name": "Marée Rose",
    // B · f8b8333fe7bc
    "endings.end_pink_tide.rarity": "RARE",
    // B · 5c6fb9f4a77c
    "endings.end_pink_tide.requires.flagsSet": ["it_survived_checkout"],
    // B · 6eedfed861d9
    "endings.end_pink_tide.condition": "Ils l’ont dit tous les deux à voix haute, sur un quai, en plein jour, sans eau phosphorescente pour aider. C’est une décision d’adultes sur la distance, le travail et deux vies qui sont à quatre cents kilomètres l’une de l’autre, et ça doit se lire comme un plan, pas comme un coup de foudre.",
    // A · 6da11785dd0c
    "endings.end_pink_tide.epilogue": "Le premier mois, c’est ferry et sommeil horrible. Elle vient sur le continent en octobre quand la saison se termine, avec un sac et un carnet, et elle reste un peu plus longtemps à chaque fois. Aucun des deux n’est jamais d’accord sur la nuit où ça a commencé, et ils ont tous les deux tort, parce que ça a commencé le premier après-midi à la piscine.",
    // B · e1920a4344fe
    "endings.end_just_summer.name": "Juste l’Été",
    // B · 734e45c160cf
    "endings.end_just_summer.rarity": "PEU COMMUN",
    // B · 1a0d8982103f
    "endings.end_just_summer.requires.flagsSet": ["just_summer"],
    // B · 5ccb15982a87
    "endings.end_just_summer.condition": "Une vraie chose qu’ils ont choisi de laisser finir au ferry. Pas de trahison, pas de lâcheté, personne qui espère en secret. Écris cet adieu comme chaleureux, un peu brisé, et absolument pas comme un échec — c’est l’histoire vraie la plus commune pour une semaine comme ça, et elle mérite autant de soin que l’autre.",
    // A · 6c00d64da720
    "endings.end_just_summer.epilogue": "Ils s’embrassent sur le quai devant le ferry de onze heures et c’est sincère. Elle remonte la colline pour un service. Il reste sur la passerelle jusqu’à ce que l’île ne soit plus qu’une forme. Ils s’envoient des textos pendant environ cinq semaines, puis s’arrêtent, et aucun des deux ne regrette autant qu’il s’était imaginé.",
    // B · cd47740010c4
    "endings.end_her_real_smile.name": "Son Vrai Sourire",
    // B · f8b8333fe7bc
    "endings.end_her_real_smile.rarity": "RARE",
    // B · 5ec46414b6d1
    "endings.end_her_real_smile.requires.flagsSet": ["stayed_with_her","knows :the_earring"],
    // B · f138bca31166
    "endings.end_her_real_smile.condition": "Elle a arrêté de croire qu’elle doit être divertissante pour qu’on la garde. C’est la fin la plus silencieuse du monde et celle vers laquelle tout le personnage tend, et elle peut coexister avec n’importe quelle fin romantique ou aucune.",
    // A · d53383649be0
    "endings.end_her_real_smile.epilogue": "Elle prend un mardi de congé et ne prévoit rien. C’est June qui s’en aperçoit la première et ne dit rien, ce qui chez June équivaut à une ovation debout. La mise en scène ne s’efface pas — elle fait moitié de ce qu’elle est et elle aime ça — mais ça cesse d’être le loyer qu’elle paie pour être choisie.",
    // B · 2a66e8a68e89
    "endings.end_tide_and_salt.name": "Marée & Sel",
    // B · f8b8333fe7bc
    "endings.end_tide_and_salt.rarity": "RARE",
    // B · bfd9873edc4d
    "endings.end_tide_and_salt.requires.flagsSet": ["the_week_is_over"],
    // B · 15170e75076c
    "endings.end_tide_and_salt.condition": "Le carnet est devenu un bail. Le joueur peut être ami, partenaire, investisseur ou juste la personne qui lui a dit que les chiffres fonctionnaient. Ne présente pas ce business comme une récompense d’une romance ; elle est à quarante pour cent de ce projet depuis deux ans.",
    // A · 47ff5db16521
    "endings.end_tide_and_salt.epilogue": "Vingt-deux mètres carrés, quatre planches, une machine à café qui était une mauvaise idée, et un panneau peint par sa sœur. Ce n’est pas rentable tout de suite. Elle travaille encore une saison au resort pour combler le trou, et elle arrête de dire que c’était l’idée de son père, parce qu’au second hiver c’est clairement la sienne.",
    // B · f2a5d4843913
    "endings.end_sora_stays.name": "Sora Reste",
    // B · 734e45c160cf
    "endings.end_sora_stays.rarity": "PEU COMMUN",
    // B · bfd9873edc4d
    "endings.end_sora_stays.requires.flagsSet": ["the_week_is_over"],
    // B · ea02f76d31c3
    "endings.end_sora_stays.condition": "Reika lui propose quelque chose de concret après la façon dont elle a géré un hall rempli d’invités effrayés, et elle accepte. Ce n’est pas une trahison et ça ne doit jamais être écrit comme tel : c’est une carrière, avec un salaire, dans un endroit qu’elle aime et comprend mieux que n’importe qui dans la direction.",
    // A · e8a8162932cd
    "endings.end_sora_stays.epilogue": "Responsable expérience client au printemps suivant, ce qui veut dire plannings, budgets et être la personne qui dit non. Elle est étonnamment douée pour ça. Le carnet reste dans le casier et s’enrichit d’une nouvelle page environ une fois par mois, ce qui n’est pas la même chose qu’avoir tourné la page.",
    // B · 27673805db85
    "endings.end_the_missing_man.name": "L’homme disparu",
    // B · f8b8333fe7bc
    "endings.end_the_missing_man.rarity": "RARE",
    // B · 19d512bb8617
    "endings.end_the_missing_man.requires.flagsSet": ["adrian_is_out","the_man_is_answered"],
    // B · e033edafc8f5
    "endings.end_the_missing_man.condition": "Il est sorti de là vivant et le registre indique maintenant ce qui s’est vraiment passé sur le chemin. Racontez le sauvetage comme une logistique plutôt que comme un acte héroïque — une fenêtre de marée, un départ, un chirurgien en vacances, et un homme trop déshydraté pour être aussi clair qu’il le voudrait.",
    // A · 035e1a8a6498
    "endings.end_the_missing_man.epilogue": "Deux opérations au poignet et une cicatrice qui descend le mollet ; un souvenir qu’il montrera toute sa vie. Il se montre furieux envers lui-même lors des interviews et charmant en même temps, c’est exactement ce qu’il était avant. Il envoie un seul message qui n’a rien à voir avec l’histoire, une excuse adressée à quelqu’un qui a passé trois jours à se demander si elle aurait dû parler.",
    // B · 68b6f9972317
    "endings.end_eli_confesses.name": "Eli avoue",
    // B · f8b8333fe7bc
    "endings.end_eli_confesses.rarity": "RARE",
    // B · c7563a41818b
    "endings.end_eli_confesses.requires.flagsSet": ["eli_confessed"],
    // B · 2faaa0bac2a0
    "endings.end_eli_confesses.condition": "Il l’a dit lui-même, avant que personne ne puisse le forcer, et ce qu’il a abandonné était la seule chose que personne d’autre n’avait : où sur ce chemin l’homme est tombé. Il n’est pas racheté par ça. C’est un homme qui n’a pas dormi depuis cinq jours à qui on permet enfin de s’arrêter.",
    // A · f22258d1805b
    "endings.end_eli_confesses.epilogue": "Il plaide coupable de ce qu’il a vraiment fait, mais la différence entre la bousculade et la saisie demeure floue, même pour lui. Deux ans, il sort au bout de quatorze mois. Reika écrit une lettre au tribunal qui lui coûte quelque chose, et elle ajoute au dossier que quatre cent onze personnes ont gardé leur emploi en partie grâce à la manière dont il a dirigé cet immeuble pendant neuf ans.",
    // B · 48b527ceee9c
    "endings.end_paradise_saved.name": "Paradis sauvé",
    // B · f8b8333fe7bc
    "endings.end_paradise_saved.rarity": "RARE",
    // B · 7abe193a19ce
    "endings.end_paradise_saved.requires.flagsSet": ["cleanup_secured","resort_survives"],
    // B · bb49874b3007
    "endings.end_paradise_saved.condition": "Le résultat le plus difficile à atteindre et celui que tout le monde réclame : la vérité est sortie, les grottes sont nettoyées, l’extension s’arrête, et l’endroit reste ouvert. Personne n’obtient tout. Nami voulait plus de transparence, l’entreprise moins, et ils ont tous les deux signé.",
    // A · 5c06af848190
    "endings.end_paradise_saved.epilogue": "Un audit indépendant, un communiqué public avec un seul paragraphe qui a pris neuf jours à être négocié, et une indemnité versée à un entrepreneur de Kagetsu malade depuis huit ans. La crique Est rouvre l’été suivant et devient aussitôt l’endroit le plus photographié de l’île, dont presque personne ne comprend la blague.",
    // B · 345c54a091ea
    "endings.end_the_settlement.name": "L’accord",
    // B · f7fc172f729a
    "endings.end_the_settlement.rarity": "UNIQUE",
    // B · a3945a2e7f32
    "endings.end_the_settlement.requires.flagsSet": ["took_the_settlement"],
    // B · 7f5c094560af
    "endings.end_the_settlement.condition": "Ils ont accepté ce que Marcus proposait. C’est un vrai accord avec un vrai nettoyage et un calendrier de choses jamais dites en public, dont une porte la signature du joueur. Pas de moquerie de l’auteur : ça fait vraiment sortir des barils d’une grotte, et ça garde vraiment un nom hors des registres.",
    // A · 35aea97fdbde
    "endings.end_the_settlement.epilogue": "Les grottes sont nettoyées en hiver par une entreprise au nom imprononçable, sans communiqué de presse. L’argent arrive en deux versements. Nami cesse de répondre aux messages vers mars, sans colère, et c’est le vrai prix. Ça achète beaucoup, et ça n’a pas été gratuit.",
    // B · 74962d0d7782
    "endings.end_paradise_closed.name": "Paradis fermé",
    // B · f8b8333fe7bc
    "endings.end_paradise_closed.rarity": "RARE",
    // B · 7cb6297dbe35
    "endings.end_paradise_closed.requires.flagsSet": ["it_went_public"],
    // B · 0d771534ed26
    "endings.end_paradise_closed.requires.flagsUnset": ["resort_survives"],
    // B · 665bd038b603
    "endings.end_paradise_closed.condition": "Tout est sorti, et le complexe n’a pas survécu à l’année. C’est une vraie conséquence de faire ce qu’il faut bruyamment et ça ne doit pas être écrit comme une punition ou un triomphe. Suivez le personnel plutôt que l’entreprise : quatre cent onze personnes et où chacun finit.",
    // A · b7e22bc5acd7
    "endings.end_paradise_closed.epilogue": "La piscine retient l’eau pendant encore onze mois avant qu’on arrête de la nettoyer. Luka s’achète un bateau, sans grand succès, et s’en sort quand même. Un an plus tard, June gère un bar à Kagetsu et gagne mieux sa vie. Reika ne retravaille pas dans l’hôtellerie, par choix, et répond au téléphone aux anciens employés pendant des années.",
    // B · b25d14e30eaa
    "endings.end_checked_out.name": "Départ enregistré",
    // B · 734e45c160cf
    "endings.end_checked_out.rarity": "PEU COMMUN",
    // B · e2011fb13884
    "endings.end_checked_out.requires.flagsSet": ["eli_walked","the_records_held"],
    // B · 3433c142933c
    "endings.end_checked_out.condition": "Le faux départ a tenu. Le système dit qu’il est parti à dix heures huit, et chaque personne qui aurait pu le contredire ne le savait pas, ne pouvait pas le prouver, ou avait trop à perdre. C’est une défaite et ça doit être écrit simplement, sans dernier indice d’une justice à venir.",
    // A · 2025b965663c
    "endings.end_checked_out.epilogue": "Un dossier disparitions s’ouvre sur le continent six semaines plus tard, quand un journaliste finit par alerter la police, et d’ici là le resort a eu deux mois pour être d’une aide précieuse. Quelqu’un balaie la terrasse tous les matins. La piscine est magnifique. Rien sur l’île ne ressemble à l’endroit où ça s’est passé, et c’est exactement le problème.",
    // B · 362d93671361
    "endings.end_too_late.name": "Trop tard",
    // B · c9d08ae5d876
    "endings.end_too_late.rarity": "COMMUN",
    // B · 6d17552ea6ec
    "endings.end_too_late.requires.flagsSet": ["adrian_died"],
    // B · 16d6d48a146d
    "endings.end_too_late.condition": "Il est mort sur l’étagère avant que quelqu’un n’arrive. Le monde ne devient pas gris pour le marquer. Le petit déjeuner est toujours excellent, l’eau est toujours de cette couleur, et l’horreur de cette fin est précisément que le paradis continue à plein éclat.",
    // A · b3f24ae4739a
    "endings.end_too_late.epilogue": "La garde-côte le récupère lundi. Le resort ferme définitivement la crique Est et installe un second panneau. Sora part sur le continent pour deux semaines, puis revient, et personne qui n’y était pas cette semaine-là ne comprend pourquoi elle ne retourne plus dans l’eau après la tombée de la nuit.",
    // B · f105b903d6f4
    "endings.end_wrong_person.name": "Mauvaise personne",
    // B · 734e45c160cf
    "endings.end_wrong_person.rarity": "PEU COMMUN",
    // B · ecaccda44d7d
    "endings.end_wrong_person.requires.flagsSet": ["accused_luka"],
    // B · c47689fb1065
    "endings.end_wrong_person.condition": "Ils l’ont dit publiquement, à propos de quelqu’un qui ne l’a pas fait, et l’île les a crus assez longtemps. Résoudre l’affaire ensuite ne change rien et l’histoire ne doit pas faire semblant du contraire. Il était coupable de plongées à l’aube et d’être la forme évidente d’un suspect.",
    // A · 190ca1463aec
    "endings.end_wrong_person.epilogue": "Il est suspendu en moins d’un jour et viré en trois, parce qu’un resort ne peut pas se permettre une rumeur au centre de plongée. Il est blanchi dans un paragraphe que personne ne lit. Deux saisons plus tard, il a un bateau d’occasion, une petite opération sur le continent et refuse les réservations de quiconque était à Aster Cove cette semaine-là.",
    // B · 9b29edc19314
    "endings.end_sunrise_ferry.name": "Ferry du lever du soleil",
    // B · c9d08ae5d876
    "endings.end_sunrise_ferry.rarity": "COMMUN",
    // B · d83899d26398
    "endings.end_sunrise_ferry.requires.flagsSet": ["left_early","left_the_map"],
    // B · ca95a29a62a8
    "endings.end_sunrise_ferry.condition": "Ils sont partis tôt, volontairement, et ce n’est ni un échec ni une tragédie. Une semaine dans un complexe dont on s’est éloigné, c’est une mauvaise semaine, et prendre le premier bateau est quelque chose de tout à fait raisonnable pour un adulte. Racontez ce départ comme une décision, pas une fuite.",
    // A · 9c40bd62264d
    "endings.end_sunrise_ferry.epilogue": "Le ferry de six heures quarante est presque vide et le café est mauvais. Trois jours chez soi, qui s’avèrent être les vraies vacances. Environ un mois plus tard, un message arrive au sujet de quelque chose survenue sur l’île après leur départ, ils le lisent deux fois, puis reprennent le travail.",
    // B · 4630a2df5203
    "endings.end_one_more_night.name": "Une nuit de plus",
    // B · f7fc172f729a
    "endings.end_one_more_night.rarity": "UNIQUE",
    // B · d0519f51a1fb
    "endings.end_one_more_night.requires.flagsSet": ["stayed_on"],
    // B · ba48b683e0df
    "endings.end_one_more_night.condition": "Ils ont continué à prolonger. Une nuit, puis trois, puis la chambre devient un tarif, puis quelqu’un leur propose quelque chose à faire. Ce n’est pas un fantasme d’évasion et ça ne doit pas être écrit comme tel — c’est une vraie décision avec un travail, un bail et une vie laissée sans surveillance sur le continent.",
    // A · 57c78af1b5aa
    "endings.end_one_more_night.epilogue": "Trois mois plus tard, ils rangent des paddleboards au coucher du soleil, un moniteur de plongée leur tend une bière, et impossible de dire précisément quel jour les vacances se sont terminées. Deux choses ont été réglées par téléphone. La troisième, non, elle est encore là, et ils savent très bien ce que c’est.",
    // A · b72fa9b2d07f
    "archetypes.arch_burnt_out.name": "Tu n’as jamais arrêté",
    // B · fdb34cf87b3f
    "archetypes.arch_burnt_out.role": "Perception et entêtement",
    // A · 60af59891f6f
    "archetypes.arch_burnt_out.summary": "Quelqu’un t’a forcé à venir cette semaine. Tu n’as pas vraiment dormi depuis le printemps, tu remarques tout, parce que c’est la seule chose que ton boulot t’a laissée, et tu es nul pour te détendre.",
    // A · 0dd61dfc6241
    "archetypes.arch_burnt_out.playstyle": ["Observateur","Agité","Difficile à détendre"],
    // A · a716faabfc40
    "archetypes.arch_burnt_out.blurb": "Tu es le client qui voit le sac dès le premier jour et qu’il faut convaincre d’entrer dans l’eau, et c’est la même chose.",
    // A · 99dcceb2eb84
    "archetypes.arch_easy_company.name": "Les gens te racontent tout",
    // B · 3e6e6a39101b
    "archetypes.arch_easy_company.role": "Charme et accès",
    // A · a4fc58ad966a
    "archetypes.arch_easy_company.summary": "Tu es à l’aise dans un bar. Des inconnus te confient leur vie dès le deuxième verre, comme toujours, et tu n’as jamais trop compris si c’est un talent ou un moyen d’éviter ta propre histoire.",
    // A · 7d0e0096a0d0
    "archetypes.arch_easy_company.playstyle": ["Charmant","Sociable","Curieux"],
    // A · a56e111d5288
    "archetypes.arch_easy_company.blurb": "Toutes les portes fermées de cette île ont quelqu’un devant, et les gens, c’est ce à quoi tu réussis vraiment bien.",
    // A · 9650b2c905f1
    "archetypes.arch_water.name": "Tu es meilleur dans l’eau",
    // B · def2c18246ba
    "archetypes.arch_water.role": "Natation et bateaux",
    // A · f6587d159a9f
    "archetypes.arch_water.summary": "Tu connais les grands espaces d’eau depuis que tu es enfant. Tu as tes diplômes, tu lis les houles sans y penser, et tu es le seul client ici capable d’atteindre l’autre côté de cette pointe sans aide.",
    // A · c7fd3b736709
    "archetypes.arch_water.playstyle": ["Nageur aguerri","Physique","Direct"],
    // A · fb16dd4f8a9f
    "archetypes.arch_water.blurb": "La moitié des secrets de cette île se trouvent de l’autre côté d’une étendue d’eau, et sur ce ferry, tu es celle ou celui qui s’en fait le moins.",
    // A · 75926a5556c0
    "archetypes.arch_checker.name": "Tu vérifies tout",
    // B · 0f140f7d58e3
    "archetypes.arch_checker.role": "Documents et incohérences",
    // A · 37312824c718
    "archetypes.arch_checker.summary": "Audit, factures, conformité, achats — peu importe, toute ta vie pro consiste à lire un dossier et à repérer la ligne où deux documents ne correspondent plus.",
    // A · b22de509a28c
    "archetypes.arch_checker.playstyle": ["Méthodique","Sceptique","Sait attendre"],
    // A · 470a2fb5d8fd
    "archetypes.arch_checker.blurb": "Tu n’es pas détective et tu n’as jamais voulu l’être. Tu ne peux juste pas t’empêcher de remarquer quand une heure de départ et un cadenas ne sont pas d’accord.",
    // B · f112d5e553f5
    "setupFields.displayName.label": "Quel nom figure sur la réservation ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · 9b4a67fdce99
    "setupFields.displayName.placeholder": "ex. Rin",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 3a6240a26696
    "setupFields.pronouns.placeholder": "ex. iel/iel",
    // B · ba8e62685a69
    "setupFields.archetype.label": "Qu’est-ce que tu as apporté avec toi ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHETYPE",
    // B · 7f1bfb9bf52c
    "setupFields.archetype.helpText": "Qui tu es loin de cette île, ce qui décide de ce à quoi tu es déraisonnablement bon ici et de ce que tout le monde suppose de toi à la piscine. C’est fixé pour la semaine. Ça ne décide pas si vous enquêtez, pour qui vous craquez, ou comment tout ça finit.",
    // B · 7465378aaf11
    "setupFields.worldKnowsAboutYou.label": "Comment as-tu atterri ici pour sept nuits ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · bad027760c54
    "setupFields.worldKnowsAboutYou.helpText": "Entièrement à toi. Un prix, un avantage au travail, une annulation transférée, un anniversaire, une lune de miel que tu vis sans personne. Une ligne, et l’île y croira.",
    // B · bb696c507c03
    "setupFields.worldKnowsAboutYou.placeholder": "ex. Un collègue l’a gagné à une tombola, n’a pas pu y aller, et j’ai dit oui avant d’y réfléchir.",
    // B · a108919bef5c
    "setupFields.what_you_are_escaping.label": "Qu’est-ce que tu as laissé chez toi ?",
    // B · b6a31c665c0b
    "setupFields.what_you_are_escaping.kind": "CHOIX",
    // B · 6f86319cd037
    "setupFields.what_you_are_escaping.helpText": "Tout le monde ici fuit quelque chose. Un point de départ, pas un engagement — tu peux découvrir à mi-semaine que c’était autre chose.",
    // B · 996b2f51320d
    "setupFields.what_you_are_escaping.options.a_job.label": "Un travail qui a duré trois ans et n’a rien rapporté",
    // B · 9cd7ee21276a
    "setupFields.what_you_are_escaping.options.a_person.label": "Quelqu’un contre qui tu n’as pas fini d’être en colère",
    // B · dffa54ef7814
    "setupFields.what_you_are_escaping.options.nothing_at_all.label": "Rien. Tu es vraiment là juste pour la piscine",
    // B · d388781d23b2
    "setupFields.what_you_are_escaping.options.a_decision.label": "Une décision qui t’attend lundi et que tu n’as pas prise",
    // B · c76d07fc3940
    "setupFields.what_you_are_escaping.options.yourself.label": "La version de toi que tout le monde chez toi connaît déjà",
    // B · 062993f6236f
    "setupFields.appearance.label": "Que voit la piscine quand tu sors sur la terrasse ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · cfd4eb2e719f
    "setupFields.appearance.placeholder": "ex. Quelqu’un dont le maillot de bain est neuf et dont la marque de bronzage vient du col d’une chemise.",
    // B · 3aa4328667d6
    "protagonist.kind": "BLANK",
    // B · 08a5f61dbbbd
    "coverDirection": "SUJET : Sora Amemiya seule au premier plan, une image clé pour un anime d’été lumineux sur une île de villégiature. Sora remplit le premier plan de la mi-cuisse au haut, centrée et proche, occupant environ les trois quarts de l’image. C’est une femme adulte extrêmement attirante de vingt-trois ans : longs cheveux roses bubblegum vifs jusqu’au bas du dos en vagues mouillées de plage, yeux brun doré chaleureux, peau bronzée d’été, un petit grain de beauté sous l’œil gauche, une silhouette très courbée en sablier, une petite étoile en or à l’oreille droite et une fine chaîne de ventre en or et coquillages. Elle porte un bikini triangle blanc, un paréo corail rose noué lâchement sur une hanche et une grande chemise en lin blanche ouverte glissant d’une épaule, avec des lunettes de soleil relevées dans ses cheveux. Elle se tient les pieds dans l’eau à la bordure d’une immense piscine à débordement, tournée vers le spectateur par-dessus une épaule avec un demi-sourire joueur et séducteur, une main tendue et ouverte, l’invitant à la suivre dans l’eau. DERRIÈRE ELLE, petit et secondaire, disposé comme un décor lumineux de villégiature plutôt qu’une photo de groupe : architecture blanche de la station, palmiers et une rangée de cabanes blanches à gauche ; eau turquoise s’étendant vers la mer à droite ; un ciel rose et or de fin d’après-midi. La note de thriller doit être presque subliminale et ne jamais dominer : loin à droite, sur un sentier escarpé interdit au-dessus de l’eau, une silhouette adulte solitaire fait face à l’opposé, et une petite caméra de sécurité sur un poteau à proximité est délibérément tournée à l’écart de ce sentier. AMBIANCE : lumineuse, sexy, fantasy de vacances feel-good avant tout, mystère en second plan. Soleil chaud, turquoise saturé et corail, peau et cheveux mouillés brillants. Toutes les personnes sur l’image sont adultes. Pas de texte, pas de logos.",
    // A · 3c2907fd7d45
    "opening": "Il est 14 h 17, et la pierre autour de la piscine est assez chaude pour brûler.\n\nTu es là depuis quarante minutes, et tu n’as pas déballé tes affaires. L’eau s’étend jusqu’à un bord lointain qui n’est pas là, et l’océan continue tout droit depuis.\n\nPuis tu es trempé des côtes aux pieds, parce que quelqu’un dans le petit bain vient de t’éclabousser exprès.\n\nElle remet une mèche de cheveux rose bonbon par-dessus l’épaule, sans aucun remords.\n\n« Ça fait quarante minutes que tu es là, » dit-elle, « et tu as encore l’air de quelqu’un qui est à l’aéroport. »\n\nElle te regarde de haut en bas, sans se presser, et décide quelque chose.\n\n« C’est pas acceptable. »\n\nDerrière elle, tout l’après-midi t’attend : le bar piscine, les longues chaises, un match de volley que quelqu’un est en train de perdre sévère. Un homme en blazer de lin clair traverse la terrasse au bout, en comptant les transats, sans vous regarder.",
    // A · 8b4c4c98d20c
    "openingSuggestions": ["J’essuie l’eau sur mon visage et je la regarde à mon tour. « Tous les employés attaquent les clients avant qu’ils aient déballé, ou je bénéficie du forfait premium ? »","Je pose mon téléphone sur un transat, je m’avance au bord et je saute, tout habillé, en même temps. « Très bien. Tu avais raison. Dis-moi ce que je suis censé faire à la place. »","Je regarde ma chemise trempée et dis, d’un ton totalement neutre, « Incroyable. Quarante minutes sur l’île et j’ai déjà un ennemi. » Puis je m’assois au bord, les pieds dans l’eau, parce qu’il fait vraiment chaud et qu’elle n’a pas tort."],
  },
});
