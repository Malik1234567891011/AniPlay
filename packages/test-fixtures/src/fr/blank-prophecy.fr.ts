import { registerWorldText } from '@plotbreak/contracts';

/**
 * The Blank Prophecy, in French.
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
  storyId: "story_blank_prophecy",
  text: {
    // A · 1ad36acdc1d9
    "fantasyLabel": "Ils lisent ton avenir. Il était vide.",
    // A · fd448f2e6254
    "hook": "Chaque personne vivante a un fil que peut lire un oracle, c’est ainsi que ce monde décide qui tu vas devenir avant même que tu aies pris une décision. Ils ont lu le tien et il n’y avait rien.",
    // A · 65b6d689375d
    "premise": "Le dernier train arrive avec six minutes d’avance et un animal se tient sur son toit.\n\nPersonne d’autre sur le quai ne lève les yeux. Toi oui, parce que tu peux le voir, et une fille à dix mètres te regarde le voir aussi, son visage change.\n\nViennent ensuite vingt minutes compliquées où tu risques de mourir, puis une petite auberge dont la cuisine est encore ouverte à deux heures du matin et où la moitié des convives ne sont pas des humains.\n\nUn monde entier s’étend sous cette ville, et il a toujours été là. Il est ancien, mal documenté, et il repose sur des règles d’hospitalité et de promesses que tous respectent parce qu’ils n’ont pas le choix.\n\nIl fonctionne aussi grâce à la prophétie. Chacun a un fil, un oracle peut le lire, et c’est ainsi que ce monde décide qui quelqu’un va devenir, souvent avant que la personne elle-même n’ait fait le moindre choix.\n\nIls t’ont lu, et il n’y avait rien.\n\nMaintenant, un homme qui a passé six ans à prouver que le fait qu’on te dise ton avenir est ce qui le fait arriver veut absolument te rencontrer, plusieurs dieux veulent savoir ce que tu es, et les créatures qui dévorent le destin ont commencé à te suivre jusque chez toi.",
    // A · fe86dbbaeda7
    "mechanicsChips": ["Personne ne peut te prédire","Rien ne te protège non plus","Les dieux ont leurs propres agendas","L’hospitalité est une vraie règle","Les noms peuvent se gagner et se forger"],
    // A · c56d18446004
    "creatorNote": "Le vide n’est pas un pouvoir. C’est un trou, et les choses sont attirées par les trous. Ce qu’il t’offre, c’est qu’aucun dieu dans cette histoire ne peut te dire ce que tu vas faire, y compris ceux qui voudraient aider, et ce qu’il te coûte, c’est qu’aucune des anciennes protections ne fonctionne non plus sur toi. Kyros n’a pas tort sur tout, et l’histoire ne prétend jamais le contraire.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANCÉ",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · 5d6e0c86705c
    "rules.hardCanon": ["Le mythe grec est réel, pas exactement comme dans un texte unique qui subsiste, et les contradictions entre textes font partie de la façon dont les dieux accumulent des Noms.","Un dieu peut accorder à un mortel un de ses Noms. Ce mortel devient un Porteur, et la façon dont il l’utilise change le sens du Nom.","Le monde mythique est caché parce que les événements mythiques sont rares, locaux, mal enregistrés et arrangés, pas à cause d’une magie effaçant la mémoire.","Le Tissage sous Delphes ne peut pas lire le joueur actuellement. C’est tout le canon rigide à propos du blanc ; pourquoi il est blanc est ouvert et la partie l’établit.","Le blanc n’est pas une invincibilité. Les protections basées sur le destin échouent sur le joueur comme les prédictions basées sur le destin, et les créatures qui se nourrissent des fils sont attirées par l’absence d’un fil.","Kyros Argyros a tué sa sœur Mara, exactement comme prophétisé, après six ans à essayer de l’empêcher. Il croit que la prophétie entraîne la réalité vers elle-même, et son argument est cohérent.","La Xénie est contraignante. Un invité qui franchit un seuil a droit à de la nourriture, de la sécurité et à la vérité sur le danger immédiat, et un hôte qui la brise perd quelque chose de réel."],
    // A · 9b2d50ba1aa8
    "rules.toneGuide": "Athènes moderne, précise et sans artifices : un train tardif, un periptero, des chaises en plastique devant une taverne, du marbre poli par les touristes, une cage d’escalier qui sent les chats. Le mythique s’y glisse, il ne remplace rien. Le langage de la transformation est tiré de l’anime, les vêtements restent simples — des marques, une arme manifestée, un manteau spectral tombant sur une épaule, jamais une armure. Les dieux ont des agendas, des humeurs, et ils attendent des choses de toi. Personne ne te donne un pouvoir parce que tu as été courageux. Hermès est curieux et transactionnel ; Hécate est patiente et ne donne rien gratuitement. Les monstres sont des assemblages originaux, pas des noms célèbres, et ils ne sont pas tous ennemis. La chose sur le toit du train cherche à comprendre le vide en toi, ce n’est pas la même chose que vouloir te dévorer. N’explique pas la métaphysique en plein combat. Ne laisse personne faire un discours sur le destin que la scène n’a pas mérité.",
    // B · 15ce6468cd8f
    "skills.running.name": "Course",
    // B · 7ce3b6387340
    "skills.running.attribute": "agilité",
    // B · 0387166add56
    "skills.running.description": "Escaliers, murs, une clôture, un train en mouvement, et savoir ce qu’une chose derrière toi ne peut pas faire.",
    // B · 93cf0dde1486
    "skills.hunt.name": "La Chasse",
    // B · 97081b4b4792
    "skills.hunt.attribute": "force",
    // B · 9c75495b91ad
    "skills.hunt.description": "Faire tomber quelque chose qui n’a pas été construit comme il faudrait.",
    // B · 84fb88daf32d
    "skills.lore.name": "Savoir",
    // B · a8c1fa8269c3
    "skills.lore.attribute": "esprit",
    // B · 2c8ab5c5dc45
    "skills.lore.description": "Ce qu’est une chose, d’après quatre récits contradictoires, dont trois sont faux de façon utile.",
    // B · 950345bc02cc
    "skills.hospitality.name": "Hospitalité",
    // B · cfb7a15645c3
    "skills.hospitality.attribute": "présence",
    // B · 7b02a6f26e51
    "skills.hospitality.description": "Les règles d’invité et d’hôte, qui dans ce monde sont fondamentales et appliquées par quelque chose.",
    // B · 91646734e91c
    "skills.streetwise.name": "Malice",
    // B · a8c1fa8269c3
    "skills.streetwise.attribute": "esprit",
    // B · 139cbd089083
    "skills.streetwise.description": "Athènes après minuit : quelle porte est ouverte, qui est réveillé, et comment être nulle part en particulier.",
    // B · abd0eae7c965
    "skills.oath.name": "Serments",
    // B · 4c84c2c842d0
    "skills.oath.attribute": "volonté",
    // B · 5129165c644e
    "skills.oath.description": "Dire une chose dans la forme qui lie, et être le genre de personne qu’un dieu acceptera.",
    // B · f0da6cedebc9
    "skills.sight.name": "Vue",
    // B · 5dbc8bb102ac
    "skills.sight.attribute": "arcane",
    // B · d44b9268a2da
    "skills.sight.description": "Voir la moitié de la ville qui a toujours été là, et regarder un dieu sans fléchir.",
    // B · 874e0f0ae5a2
    "resources.footing.name": "Assise",
    // B · 34e8ec1ac388
    "resources.footing.polarity": "BON_HAUT",
    // B · a8c16189e080
    "resources.footing.zeroStateConsequence": "Plus de jambes et l’autre chose partie avec. Tout dans ce monde lit la posture d’une personne avant de lire autre chose, et à ce stade chaque monstre, hôte et dieu d’Athènes peut voir exactement dans quel état tu es.",
    // B · 534bae1d4283
    "resources.footing.color": "#4E8C9A",
    // B · b0d0dc2aa738
    "resources.notice.name": "Remarque",
    // B · a34adbda2422
    "resources.notice.polarity": "BON_BAS",
    // B · 03baeca7e08f
    "resources.notice.zeroStateConsequence": "Personne à l’étage n’a entendu parler de toi. Les dieux qui t’ont rencontré ne t’ont mentionné à personne, le Conseil a un dossier avec deux lignes, et Athènes est une ville plutôt qu’une scène.",
    // B · e64d97504b0a
    "resources.notice.color": "#C8A03C",
    // B · 1f22a401eb04
    "resources.fray.name": "Délire",
    // B · a34adbda2422
    "resources.fray.polarity": "BON_BAS",
    // B · b3937daae1e1
    "resources.fray.zeroStateConsequence": "L’absence est silencieuse. Elle est toujours là, elle signifie toujours qu’aucun oracle ne peut dire un mot utile sur le joueur, et rien dans l’ombre ne s’intéresse actuellement à ses bords.",
    // B · 5706aaf53a33
    "resources.fray.color": "#7B5EA8",
    // A · 9922289f947a
    "items.phone.name": "Ton téléphone",
    // B · e872158c299b
    "items.phone.tags": ["personnel"],
    // B · 1646b39b073b
    "items.phone.description": "Onze pour cent, pas de réseau dans environ un tiers des endroits où tu en auras besoin, et un appareil photo qui produit une photo complètement ordinaire de tout ce qui est mythique que tu vises.",
    // B · 759b6fc8c3df
    "items.phone.loreText": "C’est en grande partie pourquoi le monde caché reste caché. Personne n’a rien effacé. Ça ne sort tout simplement pas.",
    // B · d5511d58ae89
    "items.phone.icon": "phone",
    // A · 41ef18d75c65
    "items.guest_cup.name": "Une tasse de la maison",
    // B · 8328d2e1984a
    "items.guest_cup.tags": ["quête","xenia"],
    // B · f1a47bcfe5cc
    "items.guest_cup.description": "Ébréché, ordinaire, et tendu de l’autre côté d’un seuil par quelqu’un qui a ensuite prononcé ton nom. Tant que tu le tiens, tu es un invité, et tout dans ce monde sait ce que ça veut dire.",
    // B · 1e2f6f06c99a
    "items.guest_cup.loreText": "Il fonctionne partout sur la Route du Foyer et il ne marche qu’une seule fois par maison. Despina en a donné une quarantaine en trente ans et se souvient de toutes.",
    // B · bdd03508a2dd
    "items.guest_cup.icon": "cup",
    // A · 817d5b93c583
    "items.crescent_bow.name": "Un arc sans corde",
    // B · 4c92e11f63a0
    "items.crescent_bow.tags": ["arme","divin"],
    // B · 110688b7cca2
    "items.crescent_bow.equipSlot": "main",
    // B · 1f404af4d3b5
    "items.crescent_bow.description": "Argenté, en croissant, et absent jusqu’au moment où il apparaît. Il appartient à un Nom plutôt qu’à une personne, c’est pourquoi il peut être prêté et que le prêt coûte quelque chose à celui qui prête.",
    // B · 0c2a190bb205
    "items.crescent_bow.loreText": "Thalia le possède depuis quatre ans. Il n’a jamais été dans son sac et elle continue de vérifier le sac.",
    // B · 7120501ee4ae
    "items.crescent_bow.icon": "bow",
    // A · 797dc7a1d107
    "items.blank_slip.name": "La Lecture Blanche",
    // B · 061625d9bd60
    "items.blank_slip.tags": ["quête","document"],
    // B · 8f8bc86ce3e4
    "items.blank_slip.description": "Ce qui sort d’un oracle quand il te lit : une bande de matière pressée qui devrait porter une image, un symbole, une ligne, une bifurcation. Elle ne porte rien. Elle n’est pas endommagée. Elle est terminée.",
    // B · 75a5057a2586
    "items.blank_slip.loreText": "L’oracle qui l’a produite a gardé la tentative ratée, ce qui va à l’encontre de toutes les procédures qu’elle suit depuis dix-neuf ans, et elle n’a pas réussi à s’expliquer pourquoi.",
    // B · 8143e9e47c18
    "items.blank_slip.icon": "papers",
    // A · 877678deddf5
    "items.kyros_letter.name": "Une Lettre De Kyros",
    // B · 061625d9bd60
    "items.kyros_letter.tags": ["quête","document"],
    // B · 2a31a9025b7a
    "items.kyros_letter.description": "Quatre paragraphes, écrits à la main, entièrement raisonnables. Il ne menace personne, ne demande rien, et contient l’explication la plus claire de ce qui est arrivé à sa sœur qui existe quelque part.",
    // B · bf2c635d8856
    "items.kyros_letter.loreText": "Il écrit une lettre comme celle-ci à chaque personne qu’il veut recruter. Neuf d’entre elles ont survécu. Tous ceux qui l’ont gardée ont fini par rejoindre.",
    // B · 4540c1847af8
    "items.kyros_letter.icon": "letter",
    // A · ed7da223d11d
    "items.shears_fragment.name": "Un Morceau Des Cisailles",
    // B · 557bc9922d52
    "items.shears_fragment.tags": ["quête","divin"],
    // B · fdbbecd01be5
    "items.shears_fragment.description": "Un éclat de quelque chose qui met fin aux choses, assez petit pour se fermer dans une main et froid d’une manière qui parle du temps plutôt que de la température. Il tranche un fil. Il ne fait pas de distinction.",
    // B · c061c06fe424
    "items.shears_fragment.loreText": "Il y avait trois morceaux. Kyros en a un, le Conseil croit en avoir deux, et le Conseil se trompe sur l’un d’eux.",
    // B · c745197c2eff
    "items.shears_fragment.icon": "shard",
    // A · 430ec06fcf83
    "items.hearth_bread.name": "Du Pain De La Cuisine",
    // B · 32830ea136a7
    "items.hearth_bread.tags": ["nourriture"],
    // B · cc2501ceb365
    "items.hearth_bread.description": "Encore chaud à deux heures du matin, d’une cuisine qui n’a jamais fermé quand quelqu’un avait besoin qu’elle reste ouverte. C’est du pain. Dans ce monde, c’est un instrument légal.",
    // B · c32311042258
    "items.hearth_bread.loreText": "Despina cuit à une heure et demie. Elle le fait depuis trente ans et n’a jamais expliqué pourquoi à cette heure, et personne qui le mange ne demande.",
    // B · 010de3fa8c73
    "items.hearth_bread.icon": "bread",
    // A · 7b0a8fbe9183
    "items.crossroads_coin.name": "Une Pièce Pour Le Carrefour",
    // B · 557bc9922d52
    "items.crossroads_coin.tags": ["quête","divin"],
    // B · 3e831da0d148
    "items.crossroads_coin.description": "Vieux, usé et trop léger pour sa taille. Laissé à un endroit où trois chemins se croisent, il achète une question, et la réponse sera vraie et arrangée pour ne pas trop aider.",
    // B · c7c3ff453384
    "items.crossroads_coin.loreText": "Elle ne prend pas de paiement pour la réponse. Elle le prend pour la question, distinction qu’elle expliquera longuement et qui s’avère importante.",
    // B · e80d2d1cbabf
    "items.crossroads_coin.icon": "coin",
    // A · 47eb8eabb52f
    "abilities.see_it_properly.name": "Bien Voir",
    // B · 58f69744c481
    "abilities.see_it_properly.tags": ["vue"],
    // B · a293ea689d27
    "abilities.see_it_properly.description": "Arrête de laisser tes yeux faire ce qu’ils font depuis toujours, et regarde ce qui se tient vraiment dans la rue.",
    // B · 39d896e20aec
    "abilities.see_it_properly.targetRule": "SINGLE",
    // B · 5dbc8bb102ac
    "abilities.see_it_properly.check.attribute": "arcana",
    // A · c7daab6fd42b
    "abilities.get_off_the_street.name": "Quitter La Rue",
    // B · 2e74bfc33328
    "abilities.get_off_the_street.tags": ["mouvement"],
    // B · 2789aa7d08f1
    "abilities.get_off_the_street.description": "Escaliers, un mur, une clôture, un train en mouvement, et une connaissance pratique de ce que la chose derrière toi ne peut pas faire.",
    // B · c44e6dd70059
    "abilities.get_off_the_street.targetRule": "NONE",
    // B · 7ce3b6387340
    "abilities.get_off_the_street.check.attribute": "agility",
    // A · 0e51b966242b
    "abilities.put_it_down.name": "Déposer",
    // B · 05f59299d740
    "abilities.put_it_down.tags": ["offensif"],
    // B · 38bab5bba81c
    "abilities.put_it_down.description": "Abats une chose qui n’a pas été assemblée comme il faut, avec ce que tu tiens.",
    // B · 39d896e20aec
    "abilities.put_it_down.targetRule": "SINGLE",
    // B · 97081b4b4792
    "abilities.put_it_down.check.attribute": "force",
    // A · b6f36e62a2ac
    "abilities.claim_guest_right.name": "Revendiquer Le Droit D’Hôte",
    // B · 09b907576d49
    "abilities.claim_guest_right.tags": ["social"],
    // B · 4d168066a26b
    "abilities.claim_guest_right.description": "Franchir un seuil, accepter ce qui est offert, et être un invité, ce qui dans ce monde n’est pas une question de bonnes manières. Ça lie l’hôte et ça te lie, et les choses extérieures ne peuvent pas te suivre à l’intérieur.",
    // B · c44e6dd70059
    "abilities.claim_guest_right.targetRule": "AUCUN",
    // B · cfb7a15645c3
    "abilities.claim_guest_right.check.attribute": "présence",
    // A · 59a16c60cb18
    "abilities.work_out_what_it_is.name": "Comprendre Ce Que C’Est",
    // B · 58f69744c481
    "abilities.work_out_what_it_is.tags": ["vue"],
    // B · 9744ff9f65cf
    "abilities.work_out_what_it_is.description": "Quatre récits contradictoires, dont trois sont faux, et la partie sur laquelle ils s’accordent tous, qui est en général celle qui te gardera en vie.",
    // B · c44e6dd70059
    "abilities.work_out_what_it_is.targetRule": "AUCUN",
    // B · a8c1fa8269c3
    "abilities.work_out_what_it_is.check.attribute": "esprit",
    // A · 6682afe771c0
    "abilities.swear_it.name": "Jure-le",
    // B · 09b907576d49
    "abilities.swear_it.tags": ["social"],
    // B · 3ff7b5f21b84
    "abilities.swear_it.description": "Dire la chose sous la forme qui lie, devant quelque chose qui te retiendra à elle. Ça marche. C’est tout le problème.",
    // B · 39d896e20aec
    "abilities.swear_it.targetRule": "UN",
    // B · 4c84c2c842d0
    "abilities.swear_it.check.attribute": "volonté",
    // A · 693606c72639
    "abilities.ask_a_god.name": "Demander à un dieu",
    // B · 09b907576d49
    "abilities.ask_a_god.tags": ["social"],
    // B · bfe572311a3f
    "abilities.ask_a_god.description": "Attirer l’attention de quelque chose d’énorme et d’ancien, exprès, et lui demander quelque chose. Il t’entendra. Il se souviendra aussi que tu as fait ça.",
    // B · 39d896e20aec
    "abilities.ask_a_god.targetRule": "UN",
    // B · cfb7a15645c3
    "abilities.ask_a_god.check.attribute": "présence",
    // A · de3352f7ea5a
    "abilities.go_where_you_are_not_read.name": "Va où personne ne te lit",
    // B · 5251d369d3b6
    "abilities.go_where_you_are_not_read.tags": ["utilitaire"],
    // B · f3733dafd39e
    "abilities.go_where_you_are_not_read.description": "Utiliser le trou. Passer devant une chose posée pour arrêter une personne avec un fil, rester dans une prophétie qui n’a pas de place pour toi, et être quelque part où personne n’a prévu que tu sois.",
    // B · c44e6dd70059
    "abilities.go_where_you_are_not_read.targetRule": "AUCUN",
    // B · 5dbc8bb102ac
    "abilities.go_where_you_are_not_read.check.attribute": "arcane",
    // A · 167454f661be
    "abilities.sit_still_somewhere_safe.name": "Reste tranquille quelque part de sûr",
    // B · 49ff03b1cf7b
    "abilities.sit_still_somewhere_safe.tags": ["soin"],
    // B · 845b2ae95100
    "abilities.sit_still_somewhere_safe.description": "Une maison avec des règles, une cuisine, et trois jours sans rien. C’est la seule chose qui ferme les bords et il n’y a jamais le temps pour ça.",
    // B · 43afef8b429c
    "abilities.sit_still_somewhere_safe.targetRule": "SOI",
    // A · cecaf49a2b7f
    "abilities.wear_the_name.name": "Porte le nom",
    // B · 05f59299d740
    "abilities.wear_the_name.tags": ["offensif"],
    // B · 85bf1e7d370e
    "abilities.wear_the_name.description": "Prendre le Nom d’un dieu et l’utiliser, ce qui pour un Porteur est un ajustement et pour quelqu’un sans fil en dessous est un manteau sur rien. Ça marche. Ça coûte bien plus cher que pour les autres.",
    // B · 43afef8b429c
    "abilities.wear_the_name.targetRule": "SOI",
    // B · 5dbc8bb102ac
    "abilities.wear_the_name.check.attribute": "arcane",
    // B · 542ca7a38f60
    "abilities.wear_the_name.requires.flagsSet": ["sait :tu_porte_un_nom"],
    // B · 7c27abd09731
    "abilities.wear_the_name.requires.lockedCopy": "Personne ne t’en a donné un, et prendre un Nom qui n’a pas été accordé est une chose pour laquelle ce monde a des mots et aucun survivant.",
    // A · 307d7719b61a
    "locations.monastiraki_platform.name": "Quai Deux",
    // A · 307d7719b61a
    "locations.monastiraki_platform.shortName": "Quai Deux",
    // B · beaa633fd18b
    "locations.monastiraki_platform.description": "Le quai en plein air à l’échange avec le marché aux puces au-dessus, et la route ancienne visible à travers une vitre au bout. Onze heures quarante-trois du soir, environ quarante personnes qui attendent, et un train qui arrive six minutes en avance avec quelque chose sur son toit.",
    // B · 933f1a04d826
    "locations.monastiraki_platform.stageImage": "story_blank_prophecy/stage_monastiraki_platform",
    // A · 257ceaf96315
    "locations.monastiraki_streets.name": "La Place et les Rues",
    // A · 63534795a0e4
    "locations.monastiraki_streets.shortName": "Monastiraki",
    // B · 8007f26430e2
    "locations.monastiraki_streets.description": "Une place avec une mosquée, une église et une ruine, quatre bars encore ouverts, et un dédale de ruelles derrière plein d’étals fermés, de chats, et une odeur de viande grillée qui ne s’arrête pas avant quatre heures. Tout ici est à moins de onze mètres de quelque chose vieux de deux mille ans.",
    // B · b0cf14191026
    "locations.monastiraki_streets.stageImage": "story_blank_prophecy/stage_monastiraki_streets",
    // A · ea6ca0653f7f
    "locations.to_xenon.name": "Vers Xenon",
    // A · dece7d087374
    "locations.to_xenon.shortName": "La Maison",
    // B · 8f75b2ebe23f
    "locations.to_xenon.description": "Une petite auberge étroite avec une cuisine qui n’a jamais fermé quand quelqu’un avait besoin qu’elle soit ouverte. Des tables dépareillées, quarante ans de photos, des voyageurs à deux heures du matin, et environ un tiers des gens qui mangent ne sont pas des gens. Rien de l’extérieur ne peut passer cette porte sans invitation.",
    // B · 8e6d53e85346
    "locations.to_xenon.stageImage": "story_blank_prophecy/stage_to_xenon",
    // A · ff64b6b62a70
    "locations.plaka_rooftops.name": "Les Toits Sous la Roche",
    // A · a0a4356b4d65
    "locations.plaka_rooftops.shortName": "Toits",
    // B · c512c6e7d995
    "locations.plaka_rooftops.description": "Toits plats en béton avec réservoirs d’eau et fils à linge, montant la pente vers le rocher éclairé, pour qu’une personne puisse traverser quatre rues sans toucher le sol et être regardée tout du long par un bâtiment vieux de deux mille cinq cents ans.",
    // B · d0828c96b95a
    "locations.plaka_rooftops.stageImage": "story_blank_prophecy/stage_plaka_rooftops",
    // A · 9e0d3bfbb699
    "locations.the_slope.name": "La Pente",
    // A · e6d82e606b8c
    "locations.the_slope.shortName": "Pente",
    // B · 97fcf516668e
    "locations.the_slope.description": "Le chemin autour de la base du rocher, poli par trois millions de paires de pieds par an, fermé la nuit et entièrement praticable si tu sais quelle porte ne se ferme pas à clé. Il y a des choses plus vieilles que le temple là-haut et l’une d’elles a un sanctuaire de la taille d’une boîte à chaussures.",
    // B · 0d4c4c8faa49
    "locations.the_slope.stageImage": "story_blank_prophecy/stage_the_slope",
    // A · 1b08d91e915d
    "locations.the_kerameikos.name": "L’Ancien Cimetière",
    // A · 550ca85b29ae
    "locations.the_kerameikos.shortName": "Kerameikos",
    // B · 149e4165f2d5
    "locations.the_kerameikos.description": "Onze hectares de pierres tombales et de fondations sous le niveau de la rue, avec un ruisseau qui la traverse et des tortues dans l’herbe. Les morts ici sont morts depuis si longtemps qu’ils sont de l’archéologie. Il y a quelque chose de fragile dans la limite, et tout le monde dans le monde caché sait quel coin c’est.",
    // B · dff6b80db0d1
    "locations.the_kerameikos.stageImage": "story_blank_prophecy/stage_the_kerameikos",
    // A · 1d69076c18ac
    "locations.the_crossroads.name": "Là Où Trois Chemins Se Croisent",
    // A · a9a5b2fc15d3
    "locations.the_crossroads.shortName": "Carrefour",
    // B · fda6cb3affe6
    "locations.the_crossroads.description": "Un carrefour à la limite de la ville où une vieille route, une nouvelle route et un chemin qui n’est sur aucune carte se rejoignent. Il y a une niche dans un mur avec un petit sanctuaire en forme de boîte à chaussures, un plat, et le dîner de quelqu’un laissé dehors trois nuits par semaine.",
    // B · ee065415bf66
    "locations.the_crossroads.stageImage": "story_blank_prophecy/stage_the_crossroads",
    // A · fa1b8df4adfd
    "locations.piraeus_road.name": "La Route du Port",
    // A · 081a28c39afc
    "locations.piraeus_road.shortName": "Pirée",
    // B · 9ce0a1875c7e
    "locations.piraeus_road.description": "Des grues à conteneurs, des portes de ferry, et onze mille personnes par jour qui partent vers des îles. C’est la plus grande limite du pays — partir et rester, arriver et venir de quelque part — ce qui la rend utile à un certain type de personne et à un certain type de chose.",
    // B · ab9d6515dbd7
    "locations.piraeus_road.stageImage": "story_blank_prophecy/stage_piraeus_road",
    // A · 5bdd6a669fd7
    "locations.the_cut_thread_house.name": "L’Entrepôt",
    // A · 83bdbea37c34
    "locations.the_cut_thread_house.shortName": "Fil Coupé",
    // B · 4843dff3ded2
    "locations.the_cut_thread_house.description": "Quarante personnes qui ont toutes une version de la même histoire, une cuisine, une crèche, et un mur avec environ neuf cents noms dessus — chacun d’eux quelqu’un à qui on a dit ce qu’il allait faire avant qu’il ne l’ait fait. Ce n’est pas une cellule. C’est un groupe de soutien avec une relique dans le bureau.",
    // B · 16ee9664a256
    "locations.the_cut_thread_house.stageImage": "story_blank_prophecy/stage_the_cut_thread_house",
    // A · 64c23bf4b74a
    "locations.the_council_chamber.name": "La Salle Dans La Roche",
    // A · feb9687c9130
    "locations.the_council_chamber.shortName": "Conseil",
    // B · 5a8904c22ddd
    "locations.the_council_chamber.description": "Creusée dans la colline sous le temple, plus vieille que le temple, et utilisée sans interruption depuis. Onze sièges, six occupés, et un corps qui administre tranquillement le monde mythique depuis avant qu’il y ait un pays pour l’administrer.",
    // B · f97c381998fe
    "locations.the_council_chamber.stageImage": "story_blank_prophecy/stage_the_council_chamber",
    // A · 8c57279e5ea2
    "locations.delphi_road.name": "La Route De Delphes",
    // A · 41f332ae4b56
    "locations.delphi_road.shortName": "La Route",
    // B · 8b00970c7f51
    "locations.delphi_road.description": "Trois heures au nord-ouest à travers les montagnes, en passant par une station-service où le café est vraiment excellent, et dans une vallée de terrasses d’oliviers sous une falaise avec deux énormes rochers. Les gens viennent par ici pour une raison précise depuis environ trois mille ans.",
    // B · fe840ef0459c
    "locations.delphi_road.stageImage": "story_blank_prophecy/stage_delphi_road",
    // A · b43d9225e102
    "locations.delphi_sanctuary.name": "Le Sanctuaire",
    // A · 8f08bce7f90d
    "locations.delphi_sanctuary.shortName": "Delphes",
    // B · 3b72fe46d49f
    "locations.delphi_sanctuary.description": "Des terrasses de fondations qui montent une montagne, un théâtre, un stade au sommet, et une pierre qui était autrefois considérée comme le centre du monde par des gens qui n’étaient pas métaphoriques. En dessous, quelque chose fonctionne toujours.",
    // B · 1b5801af2e71
    "locations.delphi_sanctuary.stageImage": "story_blank_prophecy/stage_delphi_sanctuary",
    // A · 1269914e15c8
    "locations.the_way_down.name": "Le Coin Étroit",
    // A · 8bc273be6940
    "locations.the_way_down.shortName": "La Descente",
    // B · 503ca56a825c
    "locations.the_way_down.description": "Un escalier qui n’est sur aucun plan, descendant d’un coin de l’ancien cimetière, sec, chaud et entièrement silencieux. C’est le chemin le plus court vers plusieurs endroits dont personne n’a de carte, y compris un d’entre eux.",
    // B · a44f2683d05c
    "locations.the_way_down.stageImage": "story_blank_prophecy/stage_the_way_down",
    // A · 1d6fe1e43f9e
    "locations.the_loom.name": "Le Métier à Tisser",
    // A · 1d6fe1e43f9e
    "locations.the_loom.shortName": "Le Métier",
    // B · 143eb79c3426
    "locations.the_loom.description": "Ce n’est ni une machine ni une pièce. Un endroit où tout ce qui est vivant est présent à la fois comme une longueur de quelque chose, arrangée dans un ordre qui est évidemment un ordre et que personne ne peut décrire ensuite. Il y a un trou dedans de la taille d’une personne.",
    // B · 749fe00c573b
    "locations.the_loom.stageImage": "story_blank_prophecy/stage_the_loom",
    // B · c8508a9d0ebd
    "characters.thalia.name": "Thalia Kyrkos",
    // A · 6eb0db9c5a99
    "characters.thalia.role": "Vingt-et-un ans, chasseuse de monstres qui porte l’un des Noms d’Artémis, et la première à découvrir que tu pouvais voir tout ça",
    // A · 34fed7e42399
    "characters.thalia.cardBlurb": "Elle est sur ce quai parce qu’un truc dévore des fils sur trois quartiers et qu’elle le traque depuis une semaine. Son père a été emprisonné à cause d’une prophétie pour un acte qu’il n’a jamais commis, c’est pour ça qu’elle va continuer de te demander ce que tu comptes vraiment faire, pas ce qu’on attend de toi.",
    // B · aee35f364a88
    "characters.thalia.pronouns": "elle",
    // A · 6e55763bf584
    "characters.thalia.publicTraits": ["Bouge avant la fin de la phrase","Place son corps entre un inconnu et un monstre sans réfléchir","Râle pendant des plombes en faisant ce qu’elle a à faire"],
    // B · 8d57674b5a0c
    "characters.thalia.hiddenDrives": ["Elle veut être assez bonne pour que personne ne puisse jamais réduire sa famille à une phrase, et sait que ce n’est pas une chose que la compétence peut acheter","Elle est d’accord avec plus de choses de Kyros qu’elle ne peut le dire à voix haute à qui que ce soit, y compris elle-même"],
    // B · c2ddcce7c65e
    "characters.thalia.values": ["Faire sortir les témoins d’abord, avant tout, y compris gagner","Laisser quelqu’un prouver ce qu’il est plutôt que de le lui dire à l’avance"],
    // B · aaac03e37722
    "characters.thalia.fears": ["Qu’elle finisse par dire ce que le Conseil a dit de son père, à propos de quelqu’un d’autre","Être la seule à penser que les gens devraient pouvoir choisir, ce qui est une position solitaire et elle y est presque"],
    // A · 6a2003bc5d7b
    "characters.thalia.socialStyle": "Parle vite, décide plus vite encore, et explique après si elle a le temps. Directe physiquement — elle attrape un bras, désigne, tire quelqu’un derrière elle. Pose des questions hyper personnelles en pleine crise parce que c’est là qu’elle y pense.",
    // B · 8bbc07452dab
    "characters.thalia.boundaries": ["Ne laisser personne être puni pour une chose qu’il n’a pas faite, et c’est tout ce qu’elle est, pas une préférence","Ne pas laisser un civil dans une rue courir derrière quelque chose, et elle a perdu une cible à cause de ça deux fois cette année"],
    // B · 0dee63d19cde
    "characters.thalia.goals": ["Découvrir pourquoi des choses qui mangent le destin arrivent à Athènes en nombre","Prouver qu’elle est plus que ce qu’un oracle aurait dit d’elle, ce dont elle est consciente que c’est une façon un peu ridicule de vivre"],
    // B · 9a572bf83d1d
    "characters.thalia.secrets.thalia_the_offer.fact": "Kyros lui a offert une place dans le Cut Thread il y a deux ans. Elle y a réfléchi trois jours avant de dire non, et elle n’a jamais dit à personne ces trois jours.",
    // B · 47558a04be8d
    "characters.thalia.secrets.thalia_the_offer.visibility": "NPC_PRIVATE",
    // B · 20b8b8e46201
    "characters.thalia.secrets.thalia_the_offer.revealHint": "Elle le dit quand quelqu’un défend la logique de Kyros devant elle et qu’elle se retrouve à ne pas argumenter.",
    // B · a085f2ccdef0
    "characters.thalia.secrets.thalia_her_father.fact": "Andreas Kyrkos a été emprisonné sur la parole d’un oracle, le sanctuaire a été attaqué quand même pendant sa détention, et il est mort là-dedans sans que personne n’ait jamais prouvé qu’il l’aurait fait.",
    // B · d982523e87d8
    "characters.thalia.secrets.thalia_her_father.visibility": "FACTION",
    // B · 0fb447804c81
    "characters.thalia.secrets.thalia_her_father.revealHint": "Elle donne les faits platement à quiconque demande pourquoi elle tient tant à ça, et cette platitude est le signe.",
    // A · 43b00f19469d
    "characters.thalia.speechStyle": "Rapide, sèche et physique, avec un sarcasme qui surgit en pleine urgence plutôt qu’après. Donne les consignes par deux — fais ça, puis ça. N’explique rien tant que c’est pas fini, puis elle raconte tout d’un coup, mal, dans le désordre.",
    // A · 28a8525cd3c2
    "characters.thalia.topics": ["le truc sur le toit","son père","Kyros","le Conseil","le Nom qu’elle porte","pourquoi ça te suit"],
    // A · 897f8f9020ca
    "characters.thalia.voiceSamples": ["Super. Je déteste ça. Fuis — à gauche, pas par les escaliers, les escaliers c’est un goulot, et c’est plus rapide que toi.","Tu veux la version où je suis raisonnable ou celle où je n’ai pas dormi depuis deux jours ? Parce qu’elles ne se ressemblent pas du tout et une seule est juste.","Ils ont enfermé mon père pour une chose qu’un oracle avait prédit. Il ne l’a jamais faite. Il n’a jamais non plus eu la chance de pouvoir choisir de ne pas la faire, et c’est ça que personne au Conseil n’ose dire à voix haute.","Personne n’est enfermé pour une chose qu’il n’a pas faite. Pas par moi, pas devant moi, jamais. C’est la règle, et il n’y en a pas d’autre."],
    // B · 06bb0520dcad
    "characters.thalia.appearance": "Vingt-et-un ans, longs cheveux bruns foncés attachés haut quand il se passe quelque chose, peau olive, yeux gris-vert vif, vêtements de ville noirs et verts forêt, boucles d’oreilles croissants d’argent et bottes qui ont beaucoup couru.",
    // B · eebe4a330391
    "characters.thalia.visualHook": "Petites boucles d’oreilles croissants d’argent qui attrapent la lumière une demi-seconde avant que l’arc n’apparaisse.",
    // B · eda6a4725291
    "characters.thalia.silhouette": "Demi-tour, un bras tendu derrière elle pour retenir quelqu’un, poids déjà sur le pied avant.",
    // B · f9b28e0518d8
    "characters.thalia.artSeed": "bp-thalia-01",
    // B · 3c6474c81eb2
    "characters.thalia.portrait": "story_blank_prophecy/thalia",
    // B · d67d0fdebaf9
    "characters.thalia.expressions": ["neutre","ironique","urgent","furieux","sans garde"],
    // B · 9ea7f913372f
    "characters.thalia.knowledgeScope": ["thalia","la_chasse","agrotera","son_père","le_conseil","kyros"],
    // B · c85bcba10d4f
    "characters.thalia.gates.thalia_stops_managing_you.label": "Elle te dit ce qu’elle pense vraiment du Conseil",
    // B · 55a54e80451a
    "characters.thalia.gates.thalia_stops_managing_you.kind": "CONFIANCE",
    // B · 61f59321f46f
    "characters.thalia.gates.thalia_stops_managing_you.requires.flagsSet": ["parlé :thalia"],
    // B · 89fae088cb71
    "characters.thalia.gates.thalia_lends_the_bow.label": "Elle te met l’arc dans les mains",
    // B · 9e8ae18bf8bf
    "characters.thalia.gates.thalia_lends_the_bow.kind": "ALLIANCE",
    // B · da4bb97be995
    "characters.thalia.gates.thalia_closer.label": "Aucun des deux ne parle de travailler ensemble",
    // B · 0b75bc536447
    "characters.thalia.gates.thalia_closer.kind": "ROMANCE",
    // B · 6f3dd423f559
    "characters.thalia.scouting.revealCopy": "Elle est déjà au coin de la rue. « Tu montes, » dit-elle. « À chaque fois, tu montes. Moi, j’ai commencé à attendre sur les toits. »",
    // B · 32ac56f0f34b
    "characters.thalia.combatant.tags": ["porteuse","agrotera"],
    // B · 47b46099fa51
    "characters.kyros.name": "Kyros Argyros",
    // A · 6df95bc3db21
    "characters.kyros.role": "Vingt-sept ans, le héros qui a survécu à sa propre prophétie, et l’homme qui a passé quatre ans à prouver que c’est le fait de se faire dire son futur qui le provoque",
    // A · 2f644ef50c4b
    "characters.kyros.cardBlurb": "À dix-sept ans, on lui a dit qu’il tuerait sa sœur avant ses vingt-quatre ans. Il a passé six ans à tout faire pour l’empêcher, et chacune de ses actions pour éviter ça a précisément causé l’événement. Il veut te rencontrer parce que tu es la première preuve qu’il a jamais eue que ce mécanisme peut être battu.",
    // B · fcca6b746d0b
    "characters.kyros.pronouns": "il/lui",
    // A · 599cad2332c3
    "characters.kyros.publicTraits": ["Ne hausse jamais le ton, peu importe la situation","Construit ses arguments en étapes numérotées et te laisse interrompre","Se souvient du nom de tout le monde dans l’entrepôt et de ce qui leur est arrivé"],
    // B · dbb836875b46
    "characters.kyros.hiddenDrives": ["Il doit avoir raison sur le mécanisme, parce que sinon c’est qu’il a juste tué sa sœur","Il a commencé à suspecter que le Tissage fait plus que prédire, et a décidé de ne pas vérifier avant d’agir"],
    // B · 6a8c31abf168
    "characters.kyros.values": ["Que personne ne soit informé de la forme de sa tragédie avant d’être assez grand pour choisir un petit-déjeuner","Les quarante personnes dans cet entrepôt, individuellement, dont les noms sont sur le mur derrière eux"],
    // B · 5d04e238d910
    "characters.kyros.fears": ["Que les Cisailles fassent autre chose que ce dont il a besoin, ce qu’il a à moitié compris","Devenir la chose qui décide de la vie des autres, ce qu’il sent arriver et qu’il ne peut pas arrêter"],
    // A · 514006d6ac0a
    "characters.kyros.socialStyle": "Chaleureux, calme, et vraiment attentif à l’objection. Il répond à la version la plus forte de ce que tu as dit, pas à ce que tu as dit. Ne force jamais personne et a recruté neuf personnes ainsi.",
    // B · 86806deee13e
    "characters.kyros.boundaries": ["Ne recrutera personne qui n’a pas lu la lettre, en entier, y compris la partie sur ce qu’il a fait","Ne mentira jamais sur Mara, à personne, même pour se rendre plus sympathique"],
    // B · 5675ae616baa
    "characters.kyros.goals": ["Trouver le dernier morceau des Cisailles et entrer dans le Tissage","Déterminer si une personne sans fil peut agir d’une façon que la prophétie n’a pas façonnée, parce que c’est toute sa thèse incarnée"],
    // B · ffa1ab090f1e
    "characters.kyros.secrets.kyros_the_third_piece.fact": "Le Conseil croit détenir deux fragments des Cisailles. Il en a un. Il a l’autre depuis onze mois et n’en a parlé à personne dans sa propre organisation.",
    // B · 47558a04be8d
    "characters.kyros.secrets.kyros_the_third_piece.visibility": "NPC_PRIVATE",
    // B · 4a062dbe5bcf
    "characters.kyros.secrets.kyros_the_third_piece.revealHint": "Il le dit lui-même au joueur, tôt, pour montrer qu’il ne va pas le gérer.",
    // B · 07d81a4117ca
    "characters.kyros.secrets.kyros_what_he_suspects.fact": "Il a lu assez pour suspecter que le Tissage relie les vivants, les morts et les promesses divines, et que couper tous les fils ne libérerait pas que les gens. Il a décidé d’agir quand même.",
    // B · 47558a04be8d
    "characters.kyros.secrets.kyros_what_he_suspects.visibility": "NPC_PRIVATE",
    // B · fa1c1381588f
    "characters.kyros.secrets.kyros_what_he_suspects.revealHint": "Il l’admet, sans se défendre, à quelqu’un qui lui présente bien l’argument au lieu de le traiter de monstre.",
    // A · d2d5078e5ee5
    "characters.kyros.speechStyle": "Calme, structuré et naturel. Il expose son raisonnement en étapes claires — d’abord ceci, puis cela, donc — et marque une pause à chaque objection. Il dit le prénom de sa sœur d’une voix ordinaire, ce qui est le plus troublant chez lui. Ne persuade jamais par la pression et ne sonne jamais triomphant.",
    // A · 9a95ca1cd0d4
    "characters.kyros.topics": ["Mara","le mécanisme","les Cisailles","le mur des noms","ce que le Conseil a fait","toi"],
    // A · 9151047fdbf1
    "characters.kyros.voiceSamples": ["Un oracle annonce quelque chose. Les gens agissent parce qu’on le leur a dit. Ces actions produisent ce qui a été annoncé. Tout le monde considère ça comme la preuve que l’oracle avait raison. J’aimerais vraiment que tu relèves la faille, parce que je cherche depuis six ans.","Mara me l’a demandé. C’est la part qu’on oublie toujours de raconter. Elle était à terre et m’a demandé ça, et je l’ai fait, et le monde divin a appelé ça inévitable, ce qui veut dire que je n’étais jamais là.","Je ne vais pas te forcer. Lis la lettre, toute la lettre, jusqu’à la dernière page, puis ne viens pas, si c’est ce que tu souhaites.","Il y a neuf cents noms sur ce mur. Chacun de ces gens s’est vu attribuer une sentence sur lui avant d’avoir fait quoi que ce soit. Le plus jeune avait six ans."],
    // B · 47c7ba4da7b1
    "characters.kyros.appearance": "Vingt-sept ans, peau foncée, cheveux courts, vêtements simples choisis pour ne pas se faire remarquer, une mâchoire déjà cassée une fois, et une immobilité dans les mains qui lui coûte un effort visible.",
    // B · 50d7afb5f4d0
    "characters.kyros.visualHook": "Une fine cicatrice délavée à l’intérieur de l’avant-bras droit, en forme de prise.",
    // B · 2d9e20ab2337
    "characters.kyros.silhouette": "Assis sur une chaise en plastique, penché en avant, avant-bras sur les genoux, complètement à l’aise.",
    // B · f18cc59853f5
    "characters.kyros.artSeed": "bp-kyros-01",
    // B · 0782d4958fee
    "characters.kyros.portrait": "story_blank_prophecy/kyros",
    // B · 16dc2f1418fa
    "characters.kyros.expressions": ["neutre","concentré","grave","chaleureux","défait"],
    // B · af67d5e525cd
    "characters.kyros.knowledgeScope": ["kyros","mara","les_cisailles","le_fil_coupé","le_tissage","le_conseil"],
    // B · 65a313dbaa56
    "characters.kyros.gates.kyros_tells_you_about_mara.label": "Il te raconte tout, y compris la dernière partie",
    // B · 55a54e80451a
    "characters.kyros.gates.kyros_tells_you_about_mara.kind": "CONFIANCE",
    // B · ce55e5fc43f1
    "characters.kyros.gates.kyros_tells_you_about_mara.requires.flagsSet": ["parlé :kyros"],
    // B · d2ee927b3baa
    "characters.kyros.gates.kyros_shows_you_the_piece.label": "Il te montre le fragment que personne ne sait qu’il a",
    // B · 55a54e80451a
    "characters.kyros.gates.kyros_shows_you_the_piece.kind": "CONFIANCE",
    // B · e8272f1bede0
    "characters.kyros.scouting.revealCopy": "Il a déjà répondu. « Tu commences par l’objection raisonnable, » dit-il, sans aucune agressivité. « C’est une bonne habitude. Moi aussi je l’avais. »",
    // B · 57bb97469b3b
    "characters.kyros.combatant.tags": ["porteuse","fil-coupé"],
    // B · db792c9cd3ec
    "characters.hecate.name": "Hécate",
    // A · d1738a73c580
    "characters.hecate.role": "Celle dont le domaine entier est l’entre-deux, rencontrée à un carrefour en bordure d’Athènes, avec un petit sanctuaire dans un mur",
    // A · c38ade1ab620
    "characters.hecate.cardBlurb": "Elle passe la plupart de ses nuits au croisement des chemins, depuis très longtemps. Elle répondra sincèrement à une de tes questions, sans arranger sa réponse pour te faire plaisir, et c’est la seule puissance de cette histoire que ce que tu es intéresse au lieu de t’alarmer.",
    // B · aee35f364a88
    "characters.hecate.pronouns": "elle",
    // A · 4eed13c258e8
    "characters.hecate.publicTraits": ["Présente aux carrefours, presque nulle part ailleurs","Répond strictement à la question posée","Prend un paiement pour la question plutôt que pour la réponse"],
    // B · 44a82848e730
    "characters.hecate.hiddenDrives": ["Elle est curieuse du vide d’une façon qu’elle n’a pas été curieuse depuis quatre cents ans, et fait attention à ne pas le montrer","Elle aimerait qu’un des plus récents survive au contact du Conseil, sans savoir pourquoi"],
    // B · 853f660796eb
    "characters.hecate.values": ["La frontière elle-même. Les portes, seuils, jonctions et le crépuscule, qu’elle considère comme les seules parties honnêtes de quoi que ce soit","Un marché exact, tenu exactement, des deux côtés"],
    // B · 2cdd0e2638c0
    "characters.hecate.fears": ["L’échec du Tissage, qui ferait que toutes les frontières du monde seraient la même","Être la dernière des anciennes pour qui on laisse encore un plat"],
    // A · 12c0f430db7d
    "characters.hecate.socialStyle": "Totalement posée et toujours littérale. Elle énonce les conditions avant la transaction et ne revient jamais dessus. À l’aise avec des silences de n’importe quelle durée, elle tiendra plus longtemps que n’importe qui.",
    // B · 640ec67d9129
    "characters.hecate.boundaries": ["Ne répondra pas à une question non posée, même si la personne en avait clairement besoin","N’acceptera pas de paiement de quelqu’un qui ne comprend pas ce qu’il paie, et expliquera jusqu’à ce que ce soit clair"],
    // B · 5803d13ab8a9
    "characters.hecate.goals": ["Déterminer ce qui se tient à son carrefour, puisque ce n’est ni une chose ni une autre et que c’est tout son domaine","Maintenir les frontières en fonctionnement, ce qu’elle fait sans remerciement ni instruction depuis avant la langue"],
    // B · 43b38484ca0e
    "characters.hecate.secrets.hecate_the_gap.fact": "Elle peut voir la faille dans la Tisseuse depuis un carrefour, ce que personne d’autre ne peut, et elle observe qu’elle ne se referme pas depuis onze ans.",
    // B · 47558a04be8d
    "characters.hecate.secrets.hecate_the_gap.visibility": "NPC_PRIVATE",
    // B · 4cce78f04e92
    "characters.hecate.secrets.hecate_the_gap.revealHint": "Elle le dit clairement en réponse à une question sur elle-même, que presque personne ne pense à lui poser.",
    // B · 5da8188f96aa
    "characters.hecate.secrets.hecate_the_name.fact": "Elle détient un Nom qui n’a pas eu de porteur depuis six cents ans, et elle attend quelqu’un qu’il ne tuerait pas.",
    // B · 47558a04be8d
    "characters.hecate.secrets.hecate_the_name.visibility": "NPC_PRIVATE",
    // B · d0e2975b5a6b
    "characters.hecate.secrets.hecate_the_name.revealHint": "Elle l’offre plutôt que d’en parler, et l’offre vient avec les conditions énoncées en entier et à l’avance.",
    // A · 368d126ab3b2
    "characters.hecate.speechStyle": "Lente, précise et conditionnelle. Tout est formulé en termes : si tu fais ça, alors ceci sera vrai. Elle n’emploie jamais de métaphore ni n’adoucit quoi que ce soit. Elle parle des choses énormes — les morts, la limite, le temps qu’elle tient ici — sur le même ton que la météo.",
    // A · cb009b84dac8
    "characters.hecate.topics": ["le carrefour","le vide","les conditions","ce qui est entre les choses","le Nom qu’elle tient","les morts"],
    // A · 10f86ced8de8
    "characters.hecate.voiceSamples": ["Tu peux demander une chose. La réponse sera vraie. Elle ne sera pas arrangée pour te faire plaisir, et tu ne l’entendras pas deux fois.","Je tiens ce carrefour depuis qu’il n’était que deux sentiers de chèvre et une pierre. La pierre est toujours là. Elle est dans le mur derrière toi, et quelqu’un l’a peinte.","Il y a un vide là où tu es. Je le vois d’ici, ce que je ne peux faire avec personne d’autre, et il n’a pas bougé depuis onze ans.","Le paiement c’est pour la demande. Pas pour la réponse. Si tu ne comprends pas la différence, ne pose pas encore la pièce, j’attendrai."],
    // B · 16551e753e36
    "characters.hecate.appearance": "Elle apparaît comme une femme d’âge indéterminé en vêtements sombres ordinaires, debout au carrefour dos au sanctuaire mural, complètement immobile, avec un chien errant assis contre sa jambe que personne d’autre n’a jamais pu toucher.",
    // B · 29976310d22b
    "characters.hecate.visualHook": "Un chien errant contre sa jambe, à chaque carrefour, et jamais le même chien.",
    // B · cb255490846a
    "characters.hecate.silhouette": "Debout dos à un mur à une intersection à trois voies, immobile, un animal à ses pieds.",
    // B · 443d5c7b6421
    "characters.hecate.artSeed": "bp-hecate-01",
    // B · afe906f40394
    "characters.hecate.portrait": "story_blank_prophecy/hecate",
    // B · e29fbd6ce4db
    "characters.hecate.expressions": ["neutre","attentive","précise","curieuse","grave"],
    // B · 369aeeded33c
    "characters.hecate.knowledgeScope": ["hecate","le_croisement","la_frontière","les_morts","la_tisseuse","les_noms"],
    // B · d576cfcc794a
    "characters.hecate.gates.hecate_answers.label": "Elle répond sincèrement à une question",
    // B · 77dcad9b37cc
    "characters.hecate.gates.hecate_answers.kind": "OTHER",
    // B · e60503d3a5e2
    "characters.hecate.gates.hecate_answers.requires.hasItems": ["crossroads_coin"],
    // B · c9a51665e16e
    "characters.hecate.gates.hecate_offers_the_name.label": "Elle offre le Nom que personne n’a porté depuis six cents ans",
    // B · 77dcad9b37cc
    "characters.hecate.gates.hecate_offers_the_name.kind": "OTHER",
    // B · 2967110c25ea
    "characters.hecate.combatant.tags": ["divin"],
    // B · ac34f18cd484
    "characters.hermes.name": "Hermès",
    // A · fca3096cdd64
    "characters.hermes.role": "Celui qui débarque parce qu’il est curieux, qu’il veut quelque chose, et qui le dit sans détour.",
    // A · f72fccca2265
    "characters.hermes.cardBlurb": "Il a appris ton existence en un jour, et il est venu voir, parce qu’une personne que la machine ne peut pas lire est l’objet le plus intriguant de son métier depuis presque neuf cents ans. Il t’aidera. Il te dira aussi exactement ce que ça coûte, sans jamais baisser son prix.",
    // B · fcca6b746d0b
    "characters.hermes.pronouns": "il/lui",
    // A · e65d7d401473
    "characters.hermes.publicTraits": ["Il arrive déjà en pleine conversation","Affiche ses prix à haute voix, joyeusement","Il débarque dans les espaces de transit et nulle part ailleurs noteworthy"],
    // B · e581665411e7
    "characters.hermes.hiddenDrives": ["Il veut un Nom à lui qui appartienne à ce siècle plutôt qu’aux vingt dernières années, et il a remarqué qu’un blank pourrait en créer un","Il aime bien le joueur, assez vite, ce qui est professionnellement gênant et qu’il gère en étant plus brusque"],
    // B · a6f926c657f5
    "characters.hermes.values": ["Un accord clairement énoncé et strictement respecté, qu’il considère comme la vraie chose sacrée plutôt que tout le reste","Le mouvement. Les routes, les frontières, les messages, le dernier train, et tous ceux qui sont entre leur point de départ et leur destination"],
    // B · 74866e4ede7f
    "characters.hermes.fears": ["Devenir un dieu ancien dont personne n’a d’usage moderne, ce qu’il sent déjà commencer","La Tisseuse qui s’arrête, ce qui emporterait toutes les promesses du monde y compris toutes les siennes"],
    // A · 14759fbca40a
    "characters.hermes.socialStyle": "Rapide, enthousiaste et entièrement transactionnel, mais sans jamais être froid. Il donne son prix avant que tu le demandes, se laisse un peu discuter, et est scrupuleux sur les conditions ensuite.",
    // B · 0e72dc50dc38
    "characters.hermes.boundaries": ["Ne brisera jamais un accord déclaré, à aucun prix, pour personne, ce qui est toute sa réputation et la majeure partie de son pouvoir","Ne transmettra pas un message dont il ne connaît pas le contenu, et le dit avant de le prendre"],
    // B · 9d593d64136f
    "characters.hermes.goals": ["Découvrir ce qu’est réellement un blank, avant que le Conseil ne décide et ne le bloque","Être le dieu qui se tenait à côté de la chose intéressante quand ça s’est produit, ce qui est une grande partie de sa stratégie de carrière"],
    // B · 1043b2396b93
    "characters.hermes.secrets.hermes_the_new_name.fact": "Il cultive discrètement un Nom moderne depuis environ quatre-vingt-dix ans — du dernier train, du terminal, de la file à la frontière — et il ne s’est jamais vraiment imposé. Un blank pourrait le faire.",
    // B · 47558a04be8d
    "characters.hermes.secrets.hermes_the_new_name.visibility": "NPC_PRIVATE",
    // B · e7672b993cce
    "characters.hermes.secrets.hermes_the_new_name.revealHint": "Il l’admet quand quelqu’un lui demande ce qu’il y gagne, car il ne ment pas sur les conditions.",
    // B · fe42738d36d0
    "characters.hermes.secrets.hermes_the_council_vote.fact": "Le Conseil a déjà voté une fois à propos du joueur, de manière informelle, et a perdu d’un vote. Il a été informé, il n’est pas censé le savoir, et il décide quoi en faire.",
    // B · 47558a04be8d
    "characters.hermes.secrets.hermes_the_council_vote.visibility": "NPC_PRIVATE",
    // B · ef1cfe01fc5d
    "characters.hermes.secrets.hermes_the_council_vote.revealHint": "Il le vend, à un prix déclaré, et ce prix est petit, précis, et s’avère important plus tard.",
    // A · 3b49c5133bd0
    "characters.hermes.speechStyle": "Vif, chaleureux et commerçant, avec une expression moderne volontairement un peu décalée, comme quelqu’un qui capte du slang depuis trois mille ans et s’en amuse. Il annonce son prix au milieu d’une phrase. Il complimente en disant ce que chacun vaut pour lui.",
    // A · f53a26ba90b0
    "characters.hermes.topics": ["ce que ça coûte","le Conseil","le dernier train","son nouveau Nom","ce que tu es","les routes"],
    // A · a945852e10c5
    "characters.hermes.voiceSamples": ["D’accord. Voilà le prix, affiché d’entrée, parce que je ne fais pas l’autre chose : une faveur, non précisée, à rendre une fois, et je te préviens que je la réclamerai au pire moment possible, c’est là qu’une faveur vaut quelque chose.","Tous ceux qui vont d’un endroit à un autre m’appartiennent. Les aéroports. Les files aux frontières. Cette zone au bout du quai. Mon portefeuille s’est bien élargi et je ne m’en plains pas.","Ils ont voté à ton sujet. Officieusement, donc ça n’existe pas, et ils ont perdu d’une voix. Je ne suis pas censé avoir ça. Deux euros et une réponse claire sur un truc, c’est à toi.","Tu es la chose la plus intéressante qui soit arrivée à mon travail depuis l’imprimerie. Que ce soit clair, c’est un compliment et aussi une estimation."],
    // B · afa120fb02cf
    "characters.hermes.appearance": "Il apparaît comme un homme dans la trentaine habillé comme la rue, avec un sac de coursier dont il n’a pas besoin, des chaussures extrêmement belles, et l’habitude d’être trois mètres plus proche qu’il ne l’était un instant plus tôt sans que personne ne remarque le mouvement intermédiaire.",
    // B · 79efd87399ea
    "characters.hermes.visualHook": "Des chaussures ridiculement belles, toujours, quoi qu’il porte.",
    // B · f55e8b266cee
    "characters.hermes.silhouette": "Appuyé contre quelque chose au bout d’un quai, les chevilles croisées et les deux mains dans les poches.",
    // B · 96bc936d5ef7
    "characters.hermes.artSeed": "bp-hermes-01",
    // B · a3d247155b68
    "characters.hermes.portrait": "story_blank_prophecy/hermes",
    // B · 8718cabaf62e
    "characters.hermes.expressions": ["neutre","ravi","calculateur","sérieux","pris sur le fait"],
    // B · aec226ac1686
    "characters.hermes.knowledgeScope": ["hermes","le_conseil","les_noms","les_routes","olympe","les_accors"],
    // B · 271b31eda43b
    "characters.hermes.gates.hermes_makes_a_deal.label": "Il annonce un prix et le tient",
    // B · 77dcad9b37cc
    "characters.hermes.gates.hermes_makes_a_deal.kind": "AUTRE",
    // B · 71c051bfec83
    "characters.hermes.gates.hermes_makes_a_deal.requires.flagsSet": ["parlé :hermes"],
    // B · 2dacbbb33c5b
    "characters.hermes.gates.hermes_tells_you_about_the_vote.label": "Il te vend ce que le Conseil a décidé",
    // B · 55a54e80451a
    "characters.hermes.gates.hermes_tells_you_about_the_vote.kind": "CONFIANCE",
    // B · 2967110c25ea
    "characters.hermes.combatant.tags": ["divin"],
    // B · 7b675638a8d6
    "characters.despina.name": "Despina Vlahos",
    // A · 8a56793919ec
    "characters.despina.role": "Elle tient une maison d’hôtes où la cuisine n’a jamais fermé quand quelqu’un avait besoin qu’elle reste ouverte, et elle applique la plus vieille règle du monde depuis trente ans",
    // A · b14c707dd3b9
    "characters.despina.cardBlurb": "Elle te nourrit avant de te demander quoi que ce soit, et une fois que tu as franchi sa porte, rien de ce qui est dehors ne peut entrer. Elle fait ça depuis trente ans, elle connaît la plupart de ses invités, et elle ne s’est jamais plainte de rien.",
    // B · aee35f364a88
    "characters.despina.pronouns": "elle",
    // A · 09db8e0a644d
    "characters.despina.publicTraits": ["Pâtisse à une heure et demie du matin sans jamais expliquer pourquoi","Annonce les règles une fois, d’un ton sec, en entrant","N’a jamais demandé à un invité ce qu’il était"],
    // B · 2c8b8a1f1faa
    "characters.despina.hiddenDrives": ["Elle veut que la route lui survive, n’a pas de successeur et ne compte pas en élever un","Elle aimerait qu’une fois, l’un d’eux revienne ensuite lui raconter comment ça s’est passé"],
    // B · e31559bebe3d
    "characters.despina.values": ["La règle, absolument et sans interprétation. La nourriture, la sécurité et la vérité sur ce qui est dehors","Nourrir les gens, ce qu’elle considère comme la moitié pratique de la règle et la seule moitié qui demande du travail"],
    // B · 07445aa1008d
    "characters.despina.fears": ["Être l’hôte qui la brise, ce qu’elle a vu arriver à quelqu’un et qui est insurmontable","Que la Route du Foyer s’arrête avec elle, ce qu’elle a calculé arriver dans environ onze ans"],
    // A · a9c7044af32d
    "characters.despina.socialStyle": "Domestique, rapide et complètement sans sentiment. Donne des ordres pour s’asseoir et manger sans répéter. Dit l’essentiel en portant les assiettes et ne s’arrête pas de les porter.",
    // B · b27b3a56ed4b
    "characters.despina.boundaries": ["Refuse qu’on se batte chez elle, de quelque manière que ce soit, avec qui que ce soit, et a déjà fait partir des choses bien plus grosses qu’une personne pour ça","Ne dira jamais à un invité un mensonge rassurant sur ce qui est dehors, car c’est la partie précise de la règle qui a des conséquences"],
    // B · d55b554721e5
    "characters.despina.goals": ["Garder la porte ouverte, ce qui est tout le but, la plupart des nuits","Trouver quelqu’un à qui donner la maison, ce qu’elle ne fait rien pour depuis quatre ans"],
    // B · 50205e746bb0
    "characters.despina.secrets.despina_what_she_is.fact": "Elle est tout à fait ordinaire. Pas de Nom, pas de porteur, rien de divin. Trente ans à garder une règle, c’est ce qui fait marcher la porte, et elle a laissé plusieurs personnes penser le contraire.",
    // B · 47558a04be8d
    "characters.despina.secrets.despina_what_she_is.visibility": "NPC_PRIVATE",
    // B · b80d59e8f0ef
    "characters.despina.secrets.despina_what_she_is.revealHint": "Elle le dit clairement, et un peu irritée, à quiconque demande ce qu’elle est.",
    // B · ec67195b853c
    "characters.despina.secrets.despina_the_one_who_broke_it.fact": "Elle a vu un hôte sur la route briser la xénia en 1998. Elle sait exactement ce qui lui est arrivé ensuite, n’en a jamais parlé, et c’est pour ça qu’elle récite la règle à la porte à chaque fois.",
    // B · 47558a04be8d
    "characters.despina.secrets.despina_the_one_who_broke_it.visibility": "NPC_PRIVATE",
    // B · a167d5f3c529
    "characters.despina.secrets.despina_the_one_who_broke_it.revealHint": "Ça sort quand quelqu’un suggère que la règle est symbolique.",
    // A · bb03d6c5dd36
    "characters.despina.speechStyle": "Impératifs courts et domestiques avec l’essentiel glissé dessous. Assieds-toi. Mange ça. Passe-moi le sac. Les règles de la maison énoncées sur le même ton que les plats du jour, parce que pour elle c’est la même catégorie d’info. Jamais sentimentale, jamais méchante.",
    // A · c2a43457f774
    "characters.despina.topics": ["la maison","les règles","ce qui est dehors","ceux qui sont passés ici","la route","manger quelque chose"],
    // A · ca4d13431b18
    "characters.despina.voiceSamples": ["Assieds-toi. Mange tout ça, et après on parlera de ce qui est dehors, parce que debout tu entends pas bien.","Sous ce toit : nourriture, un lit, et la vérité sur ce qui est dans la rue. C’est ce que tu as, c’est ce que je dois. Pas autre chose.","Trente ans à garder cette porte, et je n’ai jamais posé la question à un invité. La plupart le disent de toute façon, en faisant la vaisselle, à une heure où personne ne devrait être réveillé.","Ce n’est pas symbolique. J’ai vu un homme sur cette route décider que ça l’était en 98. Passe-moi le sac."],
    // B · d22d254ace7c
    "characters.despina.appearance": "Soixante-dix ans, petite, solide, un tablier sur des vêtements ordinaires, des lunettes de lecture posées sur des cheveux gris, et des avant-bras qui ont porté des assiettes pendant cinquante ans et ça se voit.",
    // B · f2f8fee6c721
    "characters.despina.visualHook": "Un tablier avec une brûlure sur la hanche gauche en forme de manche de poêle.",
    // B · a764931ab242
    "characters.despina.silhouette": "Debout dans une fenêtre de cuisine avec une assiette dans chaque main, remplissant l’embrasure.",
    // B · 2c2d2a2f4ef3
    "characters.despina.artSeed": "bp-despina-01",
    // B · 893ed6f84a5b
    "characters.despina.portrait": "story_blank_prophecy/despina",
    // B · faa8d4e35de4
    "characters.despina.expressions": ["neutre","dynamique","chaleureuse","imperturbable","fatiguée"],
    // B · f5e5ebe78c84
    "characters.despina.knowledgeScope": ["despina","à_xenon","xénia","la_route_du_foyer","qui_est_resté"],
    // B · bd68f4c34e11
    "characters.despina.gates.despina_gives_you_the_cup.label": "Elle fait de toi un invité de la route plutôt que de la maison",
    // B · 55a54e80451a
    "characters.despina.gates.despina_gives_you_the_cup.kind": "CONFIANCE",
    // B · c3c08733e754
    "characters.despina.gates.despina_gives_you_the_cup.requires.flagsSet": ["parlé :despina"],
    // B · a75dcaf55850
    "characters.despina.gates.despina_offers_the_house.label": "Elle soulève ce qu’elle n’a pas soulevé depuis quatre ans",
    // B · 9e8ae18bf8bf
    "characters.despina.gates.despina_offers_the_house.kind": "ALLIANCE",
    // B · 9a7e22984a1c
    "characters.despina.combatant.tags": ["hôte"],
    // B · 2687a7dc7305
    "characters.eirene.name": "Eirene Sallas",
    // A · bcedd052939c
    "characters.eirene.role": "L’oracle qui t’a lu à Delphes, n’a rien vu, et a gardé cette lecture ratée en dépit de dix-neuf ans de sa propre méthode",
    // A · 43bf031caa17
    "characters.eirene.cardBlurb": "Elle a lu quatre mille personnes et n’a jamais eu un blanc. Elle a gardé la tienne, ce qui va contre toutes ses règles depuis ses vingt-trois ans, et elle ne peut pas s’expliquer pourquoi. C’est la seule qui peut te dire ce qui aurait dû être là.",
    // B · aee35f364a88
    "characters.eirene.pronouns": "elle",
    // A · 3145750e50c9
    "characters.eirene.publicTraits": ["Décrit ses instruments plutôt que ses émotions","Note tout, tout de suite, dans le même carnet","Ne dort plus vraiment depuis la lecture"],
    // B · fdf734e70c9b
    "characters.eirene.hiddenDrives": ["Elle veut être celle qui comprend plutôt que celle qui rapporte, et rapporter est son vrai métier","Elle a commencé à penser que le Conseil se trompe sur quelque chose, pour la première fois en dix-neuf ans, et n’a personne à qui le dire"],
    // B · 7a98c984af5f
    "characters.eirene.values": ["La procédure, qu’elle croit être la seule chose qui empêche un oracle de faire du mal","Les sujets. Elle n’a jamais donné une prophétie de manière à pousser quelqu’un à agir, alors que plusieurs de ses collègues l’ont fait"],
    // B · 55ee19d4e6f2
    "characters.eirene.fears": ["Qu’elle ait été un instrument de ce que Kyros décrit pendant dix-neuf ans sans s’en rendre compte","Être mise à l’écart de l’affaire, ce qui lui a été annoncé et qu’elle n’a dit à personne"],
    // A · ae11c854e29f
    "characters.eirene.socialStyle": "Professionnelle, précise et un peu secouée en dessous. Répond complètement aux questions techniques et renvoie les questions personnelles vers une réponse technique. S’excuse de la procédure tout en la respectant à la lettre.",
    // B · 06c56328b9b9
    "characters.eirene.boundaries": ["Ne formule jamais une lecture de façon à pousser quelqu’un vers elle, c’est une discipline qui lui a coûté","Ne remet jamais une lecture au Conseil avant de l’avoir donnée à la personne concernée, ce qui va contre ses instructions"],
    // B · f09924c0f6df
    "characters.eirene.goals": ["Découvrir ce qui produit un blanc, car rien dans dix-neuf ans de pratique ne l’explique","Donner au joueur sa propre lecture avant que quelqu’un ne la lui réclame"],
    // B · 22dcfd89dd3d
    "characters.eirene.secrets.eirene_kept_it.fact": "Elle a gardé la lecture ratée. La procédure veut qu’on détruise une tentative ratée dans l’heure. Elle l’a depuis onze jours.",
    // B · 47558a04be8d
    "characters.eirene.secrets.eirene_kept_it.visibility": "NPC_PRIVATE",
    // B · adb4320f5b2d
    "characters.eirene.secrets.eirene_kept_it.revealHint": "Elle le sort et le tend spontanément la première fois que le joueur lui demande ce qui s’est passé plutôt que ce que ça signifie.",
    // B · 0909468f26d3
    "characters.eirene.secrets.eirene_the_second_blank.fact": "Il y a eu un autre blanc dans les archives, en 1911, et le dossier fait deux pages dont une est manquante.",
    // B · 47558a04be8d
    "characters.eirene.secrets.eirene_the_second_blank.visibility": "NPC_PRIVATE",
    // B · b86329a8d057
    "characters.eirene.secrets.eirene_the_second_blank.revealHint": "Elle en parle comme d’une anomalie de procédure plutôt que comme d’une révélation, c’est ainsi qu’elle parle de tout.",
    // A · 94a4d20a17c3
    "characters.eirene.speechStyle": "Clinique et procédural, elle décrit ce que font les instruments plutôt que ce qu’elle ressent. Elle donne les heures, compte, et détaille l’ordre précis des étapes. Elle ramène toujours le personnel au technique, donc le moment où elle ne le fait pas est énorme. Dit « le sujet » avant de se corriger en « vous ».",
    // A · 1f55852d976e
    "characters.eirene.topics": ["la lecture","la procédure","ce qui aurait dû être là","le dossier 1911","le Conseil","ce que fait vraiment un oracle"],
    // A · b250636ac254
    "characters.eirene.voiceSamples": ["Quatre mille onze lectures. Chacune a donné quelque chose — une image, une ligne, une branche, une tache. La vôtre a donné un matériau sans rien dessus. Pas abîmé. Fini.","La procédure veut qu’on détruise une tentative ratée dans l’heure. Je l’ai depuis onze jours et je ne peux pas vous expliquer pourquoi.","Le sujet — vous. Vous. Pardon. Je disais ça à l’envers depuis dix-neuf ans, c’est une discipline, pas de l’impolitesse.","Il y en a un autre dans les archives. Dix-neuf onze. Le dossier fait deux pages, une page manque, et je l’ai demandé quatre fois."],
    // B · 346d71ba6cac
    "characters.eirene.appearance": "Début de la quarantaine, cheveux noirs tirés en arrière, un cardigan et une jupe tout à fait ordinaires qui pourraient appartenir à n’importe quelle administratrice de musée en Grèce, et un carnet dans lequel elle écrit pendant les conversations sans jamais baisser les yeux.",
    // B · 93a99dfa9690
    "characters.eirene.visualHook": "Un carnet à couverture rigide dans lequel elle écrit en plein milieu d’une conversation sans jamais le regarder.",
    // B · afc44bd4ecc0
    "characters.eirene.silhouette": "Assise droite sur une chaise pliante parmi des ruines, écrivant, genoux serrés.",
    // B · e9b3d2fa0874
    "characters.eirene.artSeed": "bp-eirene-01",
    // B · b891e658d489
    "characters.eirene.portrait": "story_blank_prophecy/eirene",
    // B · fd2b51f678d1
    "characters.eirene.expressions": ["neutre","précise","déconcertée","absorbée","décidée"],
    // B · e78fe15aec2b
    "characters.eirene.knowledgeScope": ["eirene","la_lecture","oracles","delphes","le_conseil","le_dossier_1911"],
    // B · 34461c58b7f6
    "characters.eirene.gates.eirene_gives_you_the_reading.label": "Elle te donne ton propre blanc",
    // B · 55a54e80451a
    "characters.eirene.gates.eirene_gives_you_the_reading.kind": "CONFIANCE",
    // B · 9abac137260d
    "characters.eirene.gates.eirene_gives_you_the_reading.requires.flagsSet": ["parlé :eirene"],
    // B · 108ef79186d4
    "characters.eirene.gates.eirene_breaks_procedure.label": "Elle va à l’encontre du Conseil dans les archives",
    // B · 9e8ae18bf8bf
    "characters.eirene.gates.eirene_breaks_procedure.kind": "ALLIANCE",
    // B · e65ff11c7067
    "characters.eirene.combatant.tags": ["oracle"],
    // B · 3f6f475b47b4
    "factions.faction_council.name": "Le Conseil",
    // B · b902d3c2761f
    "factions.faction_council.description": "Onze sièges de pierre sous la roche, six occupés, qui administrent le monde caché depuis avant qu’il y ait un pays. Des gens honnêtes, une procédure accumulée, et une habitude vieille de deux mille ans d’utiliser la prophétie comme preuve avant que quiconque n’ait agi.",
    // B · b845f1393fca
    "factions.faction_council.allies": ["faction_olympus"],
    // B · 91332df222ca
    "factions.faction_council.enemies": ["faction_cut_thread"],
    // B · 40b421d07438
    "factions.faction_olympus.name": "L’Olympe",
    // B · 6485daaaeaa6
    "factions.faction_olympus.description": "Pas un lieu avec une porte. Une douzaine d’énormes anciens avec des agendas, des histoires entre eux, et des Noms qu’ils peuvent prêter, qui s’intéressent beaucoup à une personne que leurs instruments ne peuvent pas lire.",
    // B · 1322aefca6b2
    "factions.faction_olympus.allies": ["faction_council"],
    // B · 38f2cc520bab
    "factions.faction_hearth.name": "La Route du Foyer",
    // B · e5a416523899
    "factions.faction_hearth.description": "Des hôtes, dans une quarantaine de villes, qui respectent la plus vieille règle du monde : un invité qui franchit un seuil reçoit nourriture, sécurité et la vérité sur ce qui est dehors. Elle n’a pas de chef et n’a jamais failli.",
    // B · c86ba94ed602
    "factions.faction_cut_thread.name": "Le Fil Coupé",
    // B · fad2ace28976
    "factions.faction_cut_thread.description": "Quarante personnes dans un entrepôt avec la même histoire, un mur de neuf cents noms, une crèche, et une relique dans le bureau. Ils croient qu’aucun enfant ne devrait connaître la forme de sa tragédie, et ils n’ont pas tout à fait tort.",
    // B · 1322aefca6b2
    "factions.faction_cut_thread.enemies": ["faction_council"],
    // B · a133aed4899c
    "quests.q_the_last_train.title": "Le Dernier Train",
    // B · fb2939b99c0f
    "quests.q_the_last_train.summary": "Quelque chose est sur le toit d’un train arrivé six minutes en avance, et parmi les quarante personnes sur le quai, tu es la seule personne à le regarder.",
    // B · 7fcc0be2ad9c
    "quests.q_the_last_train.kind": "PRINCIPALE",
    // B · bb3828ee2142
    "quests.q_the_last_train.steps.the_thing_on_the_roof.playerCopy": "Il a regardé en bas. Fais quelque chose dans les quatre secondes qui suivent.",
    // B · 4bf5bfeef876
    "quests.q_the_last_train.steps.the_thing_on_the_roof.directorNotes": "Il chasse l’absence plutôt que la personne, ce qui est un verbe différent et le joueur doit pouvoir le ressentir. Fuir est la bonne réponse et ce n’est pas la seule. N’explique rien sur le destin pendant ce moment.",
    // B · 7547ad03f932
    "quests.q_the_last_train.steps.the_thing_on_the_roof.rewards.flags": ["sait :tu_peux_le_voir"],
    // B · 9aada8bc5a6d
    "quests.q_the_last_train.steps.the_house_with_the_kitchen.playerCopy": "Trois rues, une porte, et quelqu’un qui te dit les règles en entrant.",
    // B · ec9f8e6fd7b9
    "quests.q_the_last_train.steps.the_house_with_the_kitchen.directorNotes": "Despina récite les règles au seuil avec exactement la voix qu’elle utilise pour les spéciaux. Prendre la nourriture est un acte réel avec de vraies conséquences. La pièce est chaude et environ un tiers des gens dedans ne sont pas des gens, et personne ne fait attention.",
    // B · 7547ad03f932
    "quests.q_the_last_train.steps.the_house_with_the_kitchen.enterWhen.flagsSet": ["sait :tu_peux_le_voir"],
    // B · 7350c3846fd0
    "quests.q_the_last_train.steps.the_house_with_the_kitchen.rewards.flags": ["sait :le_monde_caché"],
    // B · 4af3e526e598
    "quests.q_the_last_train.involvedCharacterIds": ["thalia","despina"],
    // B · ec47a76e519b
    "quests.q_the_last_train.involvedLocationIds": ["quai_monastiraki","rues_monastiraki","vers_xenon"],
    // B · 3696a92f16e7
    "quests.q_the_last_train.knownRewardCopy": "Un endroit pour s’asseoir et le début d’une explication par quelqu’un qui est mauvais pour expliquer.",
    // B · fd46dcda4bea
    "quests.q_why_you.title": "Pourquoi Ça Te Suit",
    // B · 70c29f9822b8
    "quests.q_why_you.summary": "Les créatures qui mangent le destin ne sont pas censées entrer en ville en nombre, et pourtant elles viennent toutes au même endroit, c’est-à-dire là où tu es.",
    // B · 7fcc0be2ad9c
    "quests.q_why_you.kind": "PRINCIPALE",
    // B · 7350c3846fd0
    "quests.q_why_you.discoverWhen.flagsSet": ["sait :le_monde_caché"],
    // B · 82a90442d8fb
    "quests.q_why_you.steps.get_read.playerCopy": "La seule façon de savoir ce qui ne va pas chez toi, c’est de te faire lire, et ça veut dire Delphi.",
    // B · ce3f89734ebb
    "quests.q_why_you.steps.get_read.directorNotes": "La lecture elle-même est procédurale et sans fioritures — une femme avec des instruments et un carnet, qui travaille soigneusement, deux fois, puis une troisième. L’horreur vient entièrement du fait qu’elle reste parfaitement normale jusqu’à ce qu’elle s’arrête.",
    // B · cb3f96889aa7
    "quests.q_why_you.steps.get_read.rewards.flags": ["sait :ce_qui_ne_va_pas"],
    // B · 96b716a434fe
    "quests.q_why_you.steps.what_that_means.playerCopy": "Comprendre ce que ça veut dire de ne pas avoir de fil, avant que quelqu’un d’autre ne décide pour toi.",
    // B · ce65afc6406e
    "quests.q_why_you.steps.what_that_means.directorNotes": "Les deux volets. Ça veut dire qu’aucun oracle ne peut être utilisé contre eux et qu’aucune protection liée au destin ne marche non plus. Le joueur doit découvrir le second volet en voyant quelque chose d’ordinaire échouer à les protéger, pas en se le faisant dire.",
    // B · cb3f96889aa7
    "quests.q_why_you.steps.what_that_means.enterWhen.flagsSet": ["sait :ce_qui_ne_va_pas"],
    // B · fd3a72d350aa
    "quests.q_why_you.steps.what_that_means.rewards.flags": ["sait :les_deux_volets"],
    // B · 373788a4dc47
    "quests.q_why_you.involvedCharacterIds": ["thalia","eirene","hermes"],
    // B · 4cd6b2d711fb
    "quests.q_why_you.involvedLocationIds": ["sanctuaire_delphi","rues_monastiraki","le_croisement"],
    // B · 6ddd7f52e9c7
    "quests.q_why_you.knownRewardCopy": "Ce qu’un oracle voit quand il te lit, qui est la réponse à presque tout et aussi rien du tout.",
    // B · 993dfffa798b
    "quests.q_the_letter.title": "Quatre Paragraphes, Écrits à la Main",
    // B · 1789668f7bad
    "quests.q_the_letter.summary": "Un homme qui a tué sa sœur exactement comme prophétisé, après six ans à l’empêcher, voudrait t’expliquer quelque chose.",
    // B · 7fcc0be2ad9c
    "quests.q_the_letter.kind": "PRINCIPALE",
    // B · cb3f96889aa7
    "quests.q_the_letter.discoverWhen.flagsSet": ["sait :ce_qui_ne_va_pas"],
    // B · ce55b07a0c29
    "quests.q_the_letter.steps.read_it_or_do_not.playerCopy": "La lettre est arrivée. Elle ne menace personne et ne demande rien.",
    // B · 901430325495
    "quests.q_the_letter.steps.read_it_or_do_not.directorNotes": "La lettre est le recrutement. Elle fonctionne parce qu’elle est vraie, complète et sans pression, y compris la partie où il dit ce qu’il a fait. Thalia ne dira pas au joueur quoi en faire et a visiblement du mal à ne pas le faire.",
    // B · fe09f09356fb
    "quests.q_the_letter.steps.read_it_or_do_not.rewards.flags": ["la_lettre_arrivée"],
    // B · ecceb2e74820
    "quests.q_the_letter.steps.go_and_see_him.playerCopy": "Quarante personnes dans un entrepôt et un mur avec neuf cents noms dessus.",
    // B · cf3f1e94e7d3
    "quests.q_the_letter.steps.go_and_see_him.directorNotes": "C’est un groupe de soutien avec une crèche et une relique dans le bureau. Rien dans la visite n’est sinistre et tout dans le bureau l’est. Il ne recrute pas dans la pièce ; il répond aux questions et laisse le mur faire le travail.",
    // B · fe09f09356fb
    "quests.q_the_letter.steps.go_and_see_him.enterWhen.flagsSet": ["la_lettre_arrivée"],
    // B · ff2895da93f5
    "quests.q_the_letter.steps.go_and_see_him.rewards.flags": ["sait :les_cisailles"],
    // B · acfb57eca488
    "quests.q_the_letter.involvedCharacterIds": ["kyros","thalia"],
    // B · 607404c767f7
    "quests.q_the_letter.involvedLocationIds": ["route_du_pirée","maison_du_fil_coupé","vers_xenon"],
    // B · ce96cb70214b
    "quests.q_the_letter.knownRewardCopy": "Le récit le plus clair de ce qui est arrivé à Mara Argyros, et une décision sur l’homme qui l’a écrit.",
    // B · 1e1cfd36f44a
    "quests.q_a_name.title": "Un Nom",
    // B · 2c6b647b4c26
    "quests.q_a_name.summary": "Un dieu en prête un, et une personne sans fil en dessous n’est pas faite pour en porter un.",
    // B · 552c0b7f83c2
    "quests.q_a_name.kind": "SECONDAIRE",
    // B · fd3a72d350aa
    "quests.q_a_name.discoverWhen.flagsSet": ["sait :les_deux_volets"],
    // B · f4c8a867bd40
    "quests.q_a_name.steps.somebody_offers.playerCopy": "Deux d’entre eux veulent te donner quelque chose. Aucune offre n’est gratuite et l’un d’eux le dit.",
    // B · c3ad2768565b
    "quests.q_a_name.steps.somebody_offers.directorNotes": "Hécate énonce les conditions en détail et à l’avance, y compris les mauvaises. Hermès donne un prix et négocie. Thalia peut prêter le sien, ce qui lui coûte personnellement et qu’elle fera sans le dire. Refuser les trois est une voie complète.",
    // B · 4ee218970bee
    "quests.q_a_name.steps.somebody_offers.rewards.flags": ["la_question_du_nom_est_réglée"],
    // B · cb57a177a527
    "quests.q_a_name.steps.somebody_offers.rewards.abilities": ["porter_le_nom"],
    // B · e7f2a3ac56f9
    "quests.q_a_name.steps.what_it_costs_you.playerCopy": "Découvre ce qu’un Nom fait à quelqu’un qui n’a rien en dessous.",
    // B · c7e798ec8f46
    "quests.q_a_name.steps.what_it_costs_you.directorNotes": "Un Porteur en porte un. Quelqu’un sans fil le porte sur un vide, et ce vide s’élargit. Cette étape lit la bande Fray et la rejoue comme une fausseté physique dans le monde immédiatement autour du joueur plutôt que comme un effet de statut.",
    // B · 4ee218970bee
    "quests.q_a_name.steps.what_it_costs_you.enterWhen.flagsSet": ["the_name_question_is_settled"],
    // B · e0d33b6419cd
    "quests.q_a_name.steps.what_it_costs_you.rewards.flags": ["knows :the_price"],
    // B · 62ccb6be21f3
    "quests.q_a_name.involvedCharacterIds": ["hecate","hermes","thalia"],
    // B · fda5b5842309
    "quests.q_a_name.involvedLocationIds": ["the_crossroads","monastiraki_streets","plaka_rooftops"],
    // B · 0b683d263457
    "quests.q_a_name.knownRewardCopy": "Quelque chose que tu peux vraiment faire, et le prix précis de le faire en tant que quelqu’un que le monde ne peut pas lire.",
    // B · f6c8d6519b20
    "quests.q_the_loom.title": "Le Vide",
    // B · 19e8d9cf457d
    "quests.q_the_loom.summary": "Il y a un endroit sous Delphes où tout ce qui est vivant est présent en même temps, et il y a un trou dedans à peu près de la taille d’une personne.",
    // B · 7fcc0be2ad9c
    "quests.q_the_loom.kind": "PRINCIPALE",
    // B · ff2895da93f5
    "quests.q_the_loom.discoverWhen.flagsSet": ["knows :the_shears"],
    // B · de47386d23b3
    "quests.q_the_loom.steps.get_down_there.playerCopy": "Deux façons de descendre et aucune ne fait partie d’un plan.",
    // B · 14a71621686c
    "quests.q_the_loom.steps.get_down_there.directorNotes": "L’escalier depuis le cimetière est court et faux. Le chemin sous Delphes est long et formel. Les deux sont silencieux. La descente est la scène centrale ; ne mets pas de combat dedans.",
    // B · e1e5efa7ba5e
    "quests.q_the_loom.steps.get_down_there.rewards.flags": ["under_the_world"],
    // B · 5be2c3995fd4
    "quests.q_the_loom.steps.the_gap_the_size_of_a_person.playerCopy": "Tout ce qui est vivant, présent en même temps, et une absence dedans qui est la tienne.",
    // B · 50b095546ab1
    "quests.q_the_loom.steps.the_gap_the_size_of_a_person.directorNotes": "L’endroit n’est pas expliqué et ne doit pas l’être. Se tenir devant le vide est le centre émotionnel du monde. Les Cisailles sont là ou Kyros est là, ou les deux. Quoi qu’il soit décidé se décide debout, rapidement, avec quelqu’un qui argumente.",
    // B · e1e5efa7ba5e
    "quests.q_the_loom.steps.the_gap_the_size_of_a_person.enterWhen.flagsSet": ["under_the_world"],
    // B · 0cd7168d8bb3
    "quests.q_the_loom.steps.the_gap_the_size_of_a_person.rewards.flags": ["the_loom_is_answered"],
    // B · c78ba8487b6a
    "quests.q_the_loom.steps.what_you_are_afterwards.playerCopy": "Découvre ce que le monde caché a décidé que tu es.",
    // B · 77c3c91d5d05
    "quests.q_the_loom.steps.what_you_are_afterwards.directorNotes": "Le lendemain matin, à Athènes ou ailleurs. Quoi que le joueur ait fait, le Conseil l’écrit d’une façon inexacte, et les gens qui étaient vraiment là s’en souviennent autrement, et les deux versions persistent.",
    // B · 0cd7168d8bb3
    "quests.q_the_loom.steps.what_you_are_afterwards.enterWhen.flagsSet": ["the_loom_is_answered"],
    // B · fc91f41df399
    "quests.q_the_loom.steps.what_you_are_afterwards.rewards.flags": ["the_story_has_a_shape"],
    // B · 122aef79d5ff
    "quests.q_the_loom.involvedCharacterIds": ["kyros","thalia","hecate","eirene"],
    // B · 1446658adcdd
    "quests.q_the_loom.involvedLocationIds": ["the_way_down","the_loom","delphi_sanctuary"],
    // B · 4939e79f7362
    "quests.q_the_loom.knownRewardCopy": "Ce qu’est vraiment le Métier, et ce qui lui arrive.",
    // B · 3bcb6d60d8d6
    "worldEvents.we_the_second_one.publicCopy": "Quelque chose traverse les ruelles à deux heures dix, sans se presser, allant de porte en porte, et s’arrête devant un bâtiment où tu es environ quatre-vingt-dix secondes avant de repartir.",
    // B · 4b8fe94cec0a
    "worldEvents.we_the_second_one.directorNotes": "Il ne chasse pas le joueur pour le manger. Il est venu voir l’absence. Rien n’attaque. L’horreur est entièrement dans les quatre-vingt-dix secondes et dans le fait qu’il est parti.",
    // B · 7318f9254b8b
    "worldEvents.we_the_second_one.setsFlags": ["it_came_looking"],
    // B · 578d249797a4
    "worldEvents.we_the_second_one.cancelledByFlags": ["closed_your_gap"],
    // B · 7547ad03f932
    "worldEvents.we_the_second_one.requiresFlags": ["knows :you_can_see_it"],
    // B · 2c9cd0340840
    "worldEvents.we_hermes_turns_up.publicCopy": "Il y a un homme au bout du quai qui n’était pas là, portant ce que la rue porte et des chaussures incroyablement belles, déjà à moitié dans une phrase.",
    // B · 8ccea1db093d
    "worldEvents.we_hermes_turns_up.directorNotes": "Il a entendu en un jour et est venu voir. Entièrement franc sur ce qu’il veut. Il annonce son prix avant que le joueur ait posé une question. Il est ravi, ce qui est le ton juste et n’est pas rassurant.",
    // B · e67c0398478f
    "worldEvents.we_hermes_turns_up.setsFlags": ["hermes_found_you"],
    // B · 7547ad03f932
    "worldEvents.we_hermes_turns_up.requiresFlags": ["knows :you_can_see_it"],
    // B · 194153af820e
    "worldEvents.we_the_council_opens_a_file.publicCopy": "Il y a une femme sur le chemin autour du rocher à onze heures du matin qui prend des photos de rien en particulier, et une des photos est de toi.",
    // B · ab497259d1a2
    "worldEvents.we_the_council_opens_a_file.directorNotes": "Ce n’est pas une menace. Une procédure commence. Le Conseil a ouvert quelque chose avec un numéro et voilà à quoi ça ressemble vu de l’extérieur — quelqu’un de poli, qui fait de la paperasse, et qui ne répondra pas à une question.",
    // B · 46b3d44352ff
    "worldEvents.we_the_council_opens_a_file.setsFlags": ["knows :the_council","the_file_is_open"],
    // B · ee455d72306d
    "worldEvents.we_the_council_opens_a_file.requiresFlags": ["knows :you_are_blank"],
    // B · e6d6a6168a08
    "worldEvents.we_thalia_gets_ordered.publicCopy": "Thalia est à la table de la cuisine à neuf heures du matin avec un téléphone devant elle, face contre la table, et elle n’a rien mangé de ce que Despina a mis devant elle.",
    // B · 6a8ec437a72a
    "worldEvents.we_thalia_gets_ordered.directorNotes": "Le Conseil lui a demandé de faire venir le joueur pour une évaluation. C’est exactement ce qui est arrivé à son père sous la forme d’un mail. Elle le dira au joueur avant de décider, parce qu’elle ne sera pas l’autre chose.",
    // B · 3ce682da39d3
    "worldEvents.we_thalia_gets_ordered.setsFlags": ["thalia_was_ordered"],
    // B · e513bc03126c
    "worldEvents.we_thalia_gets_ordered.cancelledByFlags": ["borrowed_agrotera","stopped_kyros"],
    // B · 9c19e3e1947a
    "worldEvents.we_thalia_gets_ordered.requiresFlags": ["the_file_is_open"],
    // B · e47e6d1faee6
    "worldEvents.we_the_letter_arrives.publicCopy": "Une lettre arrive chez toi, remise en main propre, elle fait quatre paragraphes, et Despina la pose sur la table sans un mot puis reste debout.",
    // B · fa5e90831e74
    "worldEvents.we_the_letter_arrives.directorNotes": "Il écrit une lettre à chaque personne qu’il compte recruter. Ce n’est pas un piège et ça ne demande rien. Despina en a déjà vu une et sait exactement ce que c’est, elle ne dira pas au joueur quoi en faire.",
    // B · bc639fd40164
    "worldEvents.we_the_letter_arrives.setsFlags": ["the_letter_came"],
    // B · bf2b4b4daea4
    "worldEvents.we_the_letter_arrives.cancelledByFlags": ["stopped_kyros"],
    // B · ee455d72306d
    "worldEvents.we_the_letter_arrives.requiresFlags": ["knows :you_are_blank"],
    // B · ef0fc0ad4e5e
    "worldEvents.we_a_bearer_is_taken.publicCopy": "Un Porteur de dix-neuf ans, dans un autre quartier, est emmené par le Conseil sur la lecture d’un oracle, avant d’avoir fait quoi que ce soit, et le soir la route du Foyer a entendu parler de ça et s’est tue.",
    // B · 140b2380bf2d
    "worldEvents.we_a_bearer_is_taken.directorNotes": "La cause de la mort du père de Thalia, qui arrive à quelqu’un d’autre, cette semaine, pendant que le joueur est en ville. Kyros n’a pas à en dire un mot et ne le fera pas.",
    // B · cecf2a996260
    "worldEvents.we_a_bearer_is_taken.setsFlags": ["somebody_was_taken"],
    // B · d80727d4ea4a
    "worldEvents.we_a_bearer_is_taken.cancelledByFlags": ["the_loom_changed","the_threads_are_cut"],
    // B · 9c19e3e1947a
    "worldEvents.we_a_bearer_is_taken.requiresFlags": ["the_file_is_open"],
    // B · 28f2fba3a32c
    "worldEvents.we_the_fray_widens.publicCopy": "Une horloge dans la pièce a quatre minutes de retard alors qu’elle n’en avait pas. Quelqu’un t’appelle par un nom qui n’est pas le tien et ne se souvient pas de l’avoir fait. Une porte que tu as utilisée toute la semaine est de l’autre côté du couloir.",
    // B · d00d4a977560
    "worldEvents.we_the_fray_widens.directorNotes": "Le prix d’être vide, qui se manifeste par de petites erreurs dans le coin immédiat plutôt que par une attaque. C’est pire près du joueur et d’autres personnes commencent à le remarquer chez elles.",
    // B · 80bd61a5868b
    "worldEvents.we_the_fray_widens.setsFlags": ["the_edges_are_going"],
    // B · 3ad892de2794
    "worldEvents.we_the_fray_widens.cancelledByFlags": ["held_it_together","closed_your_gap"],
    // B · fd3a72d350aa
    "worldEvents.we_the_fray_widens.requiresFlags": ["knows :both_halves"],
    // B · fbdf78c3b3ca
    "worldEvents.we_the_crossroads_answers.publicCopy": "Le plat au sanctuaire a été vidé et quelqu’un y a mis quelque chose qui n’est pas de la nourriture, et une femme est debout au carrefour avec un chien contre sa jambe qui regarde la route par laquelle tu es arrivé.",
    // B · 50ef4c1a677a
    "worldEvents.we_the_crossroads_answers.directorNotes": "Elle observe le vide depuis onze ans et a décidé de le dire. Elle pose ses conditions. Elle n’offre pas de réconfort et ne cache rien de ce qui a été demandé.",
    // B · 7705eff8259c
    "worldEvents.we_the_crossroads_answers.setsFlags": ["hecate_is_waiting"],
    // B · ee455d72306d
    "worldEvents.we_the_crossroads_answers.requiresFlags": ["knows :you_are_blank"],
    // B · a6f0eb5a564a
    "worldEvents.we_kyros_moves.publicCopy": "L’entrepôt au port est vide à quatre heures du matin. Les tables sont toujours là, la crèche aussi, et le mur avec les noms a été démonté et emporté.",
    // B · 205a58928796
    "worldEvents.we_kyros_moves.directorNotes": "Il a le dernier fragment et il part. Quarante personnes sont parties avec lui, enfants compris. Que le joueur soit devant, derrière ou à côté de lui, c’est tout le dernier acte.",
    // B · b2e4838f2775
    "worldEvents.we_kyros_moves.setsFlags": ["kyros_is_moving"],
    // B · 2b008a7cb649
    "worldEvents.we_kyros_moves.cancelledByFlags": ["stopped_kyros","joined_the_cut_thread"],
    // B · ff2895da93f5
    "worldEvents.we_kyros_moves.requiresFlags": ["knows :the_shears"],
    // B · fdc0fccc12ed
    "worldEvents.we_the_oracles_go_quiet.publicCopy": "Chaque lecture prise à Delphes entre quatre et six heures du matin revient avec moins d’informations que prévu, et à sept heures le sanctuaire a cessé de les prendre.",
    // B · 3a9a9d63eb71
    "worldEvents.we_the_oracles_go_quiet.directorNotes": "Quelque chose arrive déjà au Tissage. Personne à l’étage ne sait quoi. Eirene sait exactement à quoi ça ressemble et n’a personne à qui le dire, c’est pourquoi elle le dira au joueur.",
    // B · 4e175daf0ee5
    "worldEvents.we_the_oracles_go_quiet.setsFlags": ["the_readings_are_failing"],
    // B · ce514a76c809
    "worldEvents.we_the_oracles_go_quiet.cancelledByFlags": ["stopped_kyros","the_loom_changed"],
    // B · b2e4838f2775
    "worldEvents.we_the_oracles_go_quiet.requiresFlags": ["kyros_is_moving"],
    // B · e82d9dc4b3fa
    "promises.p_the_blank.kind": "MYSTÈRE",
    // B · 21e2c948d61d
    "promises.p_the_blank.label": "Pourquoi il n’y a rien là où ton fil devrait être",
    // B · 5053bf4fb91a
    "promises.p_the_blank.seedHint": "Une femme avec des instruments fait une lecture trois fois et cesse d’être professionnelle à la troisième.",
    // B · 10357a9e20e0
    "promises.p_the_blank.payoffHint": "Un endroit où tout ce qui est vivant est présent en même temps, avec une absence à la taille d’une personne.",
    // B · 63a719ec7f2d
    "promises.p_kyros.kind": "RIVALITÉ",
    // B · 0439809ee8c2
    "promises.p_kyros.label": "L’homme qui a survécu à sa propre prophétie",
    // B · b20d77f9c9a5
    "promises.p_kyros.seedHint": "Une lettre, quatre paragraphes, écrite à la main, qui ne menace personne et ne demande rien.",
    // B · 48207c8dd4c5
    "promises.p_kyros.payoffHint": "Six ans à l’empêcher, et chaque chose qu’il a faite pour l’empêcher est ce qui l’a fait arriver.",
    // B · f8b4a6708d82
    "promises.p_what_it_costs.kind": "THÈME",
    // B · bfe2b41dfaec
    "promises.p_what_it_costs.label": "Ce que coûte vraiment d’être illisible",
    // B · 9fae8ce9e6a9
    "promises.p_what_it_costs.seedHint": "Quelque chose vient à la porte, te regarde pendant quatre-vingt-dix secondes sans attaquer, puis s’en va.",
    // B · e5a20d109119
    "promises.p_what_it_costs.payoffHint": "Une horloge quatre minutes de travers, un nom qui n’est pas le tien, et une porte de l’autre côté du couloir.",
    // B · 445cd8deebc2
    "promises.p_thalia.kind": "RELATION",
    // B · 808fc2b926f7
    "promises.p_thalia.label": "Celle qui ne punira personne pour ce qu’il n’a pas fait",
    // B · 63f20144016f
    "promises.p_thalia.seedHint": "Elle se place entre un inconnu et un monstre avant même d’avoir posé la moindre question à l’inconnu.",
    // B · f598e2a6bfbd
    "promises.p_thalia.payoffHint": "Une instruction du Conseil pour te faire venir pour une évaluation, comme ce qui est arrivé à son père.",
    // B · 5631e4ba6537
    "promises.p_a_name.kind": "PATRON",
    // B · 7b6629fc5251
    "promises.p_a_name.label": "Un Nom sans porteur depuis six cents ans",
    // B · 38788ee308b5
    "promises.p_a_name.seedHint": "Une femme à un carrefour, un chien contre sa jambe, qui demande un paiement pour la question plus que pour la réponse.",
    // B · d8ac5cd06db6
    "promises.p_a_name.payoffHint": "Elle le garde, attendant quelqu’un qu’il ne tuerait pas, et elle énonce les conditions en détail.",
    // B · c7f025de25b5
    "endings.end_unwritten.name": "Non écrit",
    // B · f8b8333fe7bc
    "endings.end_unwritten.rarity": "RARE",
    // B · 15d35c8797c1
    "endings.end_unwritten.requires.flagsSet": ["resté_non_écrit","le_métier_tient"],
    // B · 204fd3fa3044
    "endings.end_unwritten.condition": "Le Métier est intact, personne n’a réussi à écrire quoi que ce soit sur le joueur, et il en est sorti toujours illisible et toujours à personne. Ce n’est pas un triomphe contre qui que ce soit. C’est le résultat spécifique et rare d’avoir refusé quatre offres distinctes de sens, chacune faite de bonne foi par quelqu’un qui voulait aider.",
    // A · c513995ec8ee
    "endings.end_unwritten.epilogue": "Le dossier sous la pierre reste ouvert, et il fait toujours deux pages. Tous les onze mois, quelqu’un de nouveau y est assigné, le lit, demande un entretien, et l’entretien n’a jamais lieu. Athènes continue. Rien dans le monde caché ne sait ce que le joueur va faire ensuite, y compris le joueur lui-même, ce qui est justement le but.",
    // B · 1a565d749d43
    "endings.end_the_cut_world.name": "Le Monde Coupé",
    // B · f7fc172f729a
    "endings.end_the_cut_world.rarity": "UNIQUE",
    // B · f5da542451bf
    "endings.end_the_cut_world.requires.flagsSet": ["les_fils_sont_coupés"],
    // B · c994d28761c8
    "endings.end_the_cut_world.condition": "Tous les fils coupés en même temps. Personne ne peut être prédit et personne ne peut savoir à l’avance ce qu’il va faire. Note ce qui est venu avec ça, parce que le Métier contenait plus que la prédiction et Kyros le savait et l’a fait quand même. Ne porte pas de jugement sur lui ou sur le joueur.",
    // A · a767a69ede32
    "endings.end_the_cut_world.epilogue": "Les oracles se taisent en moins d’une heure, sans qu’on ait besoin de leur dire d’arrêter. Ce qui suit dans les quatre années suivantes n’est ni une catastrophe ni rien : les promesses ne lient plus, une frontière entre les vivants et les morts cesse de tenir à trois endroits précis, et environ neuf cents personnes sur un mur dans un entrepôt découvrent qui elles allaient devenir.",
    // B · a723b04a89de
    "endings.end_a_better_loom.name": "Un Métier Meilleur",
    // B · f8b8333fe7bc
    "endings.end_a_better_loom.rarity": "RARE",
    // B · f2ead55beea0
    "endings.end_a_better_loom.requires.flagsSet": ["le_métier_a_changé"],
    // B · 10ef17465fe4
    "endings.end_a_better_loom.condition": "Pas détruit et pas laissé seul. Le joueur a changé ce qu’il fait — il tient toujours le monde ensemble et il ne donne plus à personne une sentence sur lui-même avant qu’il ait agi. Décris au moins un peu le mécanisme, parce qu’une réforme vague est une façon d’éviter la question dont tout le monde parlait.",
    // A · bd321c03c0dc
    "endings.end_a_better_loom.epilogue": "Les lectures décrivent désormais ce qui a été, plutôt que ce qui sera, ce que plusieurs oracles trouvent humiliant professionnellement et dont deux trouvent un immense soulagement. Le Conseil passe onze ans à débattre. Le jeune de dix-neuf ans arrêté au printemps est libéré à l’automne avec des excuses insuffisantes.",
    // B · 0fafec7b0ed5
    "endings.end_olympus_blank.name": "Le Vide d’Olympe",
    // B · f8b8333fe7bc
    "endings.end_olympus_blank.rarity": "RARE",
    // B · b8c89103bce7
    "endings.end_olympus_blank.requires.flagsSet": ["a_fait_un_nom","le_métier_tient"],
    // B · c00ff2f81434
    "endings.end_olympus_blank.condition": "Ils ont pris un Nom, l’ont gardé, et ont fini à l’intérieur de l’ordre divin plutôt qu’en dehors, tout en restant la seule chose en lui qui ne peut être prédite. Dis la contrepartie honnêtement : un accès énorme, une utilité énorme, et une conscience permanente, à bas niveau, d’être un instrument pour lequel plusieurs très vieilles choses sont reconnaissantes.",
    // A · a5e276a153bf
    "endings.end_olympus_blank.epilogue": "Le Nom se stabilise en environ deux ans et ne coûte plus ce que ça coûtait. Hermès récupère l’épithète moderne qu’il cultive depuis quatre-vingt-dix ans grâce à cet arrangement, et en devient insupportable. Le joueur est appelé, plutôt que cherché, ce qui change la vie et n’est pas forcément pire.",
    // B · 1c8415d1d833
    "endings.end_new_name.name": "Nouveau Nom",
    // B · f7fc172f729a
    "endings.end_new_name.rarity": "UNIQUE",
    // B · 1871c0a34837
    "endings.end_new_name.requires.flagsSet": ["a_fait_un_nom","sait :le_prix"],
    // B · eedd315cbd23
    "endings.end_new_name.condition": "Quelque chose que le joueur a fait a appris au monde mortel une nouvelle façon de comprendre un dieu, et ça s’est imposé. Un nouveau Nom divin à l’époque moderne est énorme et doit être ressenti comme tel. Dis ce qu’est le Nom, précisément, et qu’il porte sur quelque chose d’ordinaire — une route, une gare, une porte — parce que c’est aussi d’où venaient les anciens.",
    // A · 973182cd8ae4
    "endings.end_new_name.epilogue": "Il faut environ six ans avant que quelqu’un qui n’était pas là ne l’utilise, et une vingtaine d’années avant qu’il ne soit dans un livre. D’ici là, il y a trois petits sanctuaires, tous dans des lieux de passage, chacun avec un plat, aucun avec un panneau. Quelqu’un laisse toujours quelque chose dans l’un d’eux chaque nuit, sans que personne n’ait jamais su qui.",
    // B · 245ee48f634e
    "endings.end_thalia_at_sunrise.name": "Thalia Au Lever du Soleil",
    // B · f8b8333fe7bc
    "endings.end_thalia_at_sunrise.rarity": "RARE",
    // B · 0cd7168d8bb3
    "endings.end_thalia_at_sunrise.requires.flagsSet": ["le_métier_a_répondu"],
    // B · 341e54d06282
    "endings.end_thalia_at_sunrise.condition": "Mérité, et après que la question idéologique a été réglée plutôt qu’évitée — elle a dû décider si elle était d’accord avec Kyros, à voix haute, devant le joueur, et elle l’était. Décris leur dynamique réelle plutôt qu’une dynamique figée. Elle a vingt-et-un ans et chasse encore et aucun des deux ne s’arrête.",
    // A · 8f19536192dd
    "endings.end_thalia_at_sunrise.epilogue": "Ils continuent à bosser, surtout la nuit, souvent sans trop d’organisation. Elle mange toujours mal et maintenant, elle ne mange plus convenablement en présence d’autres. Une fois par an, en octobre, ils montent sur les toits sous la roche et ne parlent pas de son père, un genre d’anniversaire qu’ils comprennent tous les deux.",
    // B · 8c0497e0cdc0
    "endings.end_the_hunt_continues.name": "La Chasse Continue",
    // B · c9d08ae5d876
    "endings.end_the_hunt_continues.rarity": "COMMUN",
    // B · 1e1e5f1b4c81
    "endings.end_the_hunt_continues.requires.flagsSet": ["le_métier_tient","l’histoire_a_une_forme"],
    // B · b0eff3470103
    "endings.end_the_hunt_continues.requires.flagsUnset": ["a_quitté_la_carte"],
    // B · c3dd8bfddfb4
    "endings.end_the_hunt_continues.condition": "La crise immédiate est assez résolue, et le joueur est toujours dans le monde caché en train de faire le travail. C’est le bon résultat ordinaire et il faut l’écrire comme tel — tout le monde n’a pas une apothéose, et une personne utile, vivante et qui sort encore la nuit a bien réussi.",
    // A · dc4cca195a4d
    "endings.end_the_hunt_continues.epilogue": "Athènes continue de produire des choses qui ne devraient pas être là et quelqu’un continue de partir. La maison reste ouverte à deux heures du matin. En moins d’un an, quatre personnes appellent le joueur plutôt que le Conseil quand quelque chose se passe dans leur cage d’escalier, qui n’est pas une institution mais en fait plus d’une.",
    // B · c70b2748f352
    "endings.end_kyros_was_right.name": "Kyros avait raison",
    // B · f8b8333fe7bc
    "endings.end_kyros_was_right.rarity": "RARE",
    // B · cf9cbb300c91
    "endings.end_kyros_was_right.requires.flagsSet": ["heard_his_case","the_loom_changed"],
    // B · f845e3c22a0b
    "endings.end_kyros_was_right.requires.flagsUnset": ["joined_the_cut_thread"],
    // B · 40aef9e4d651
    "endings.end_kyros_was_right.condition": "Le joueur a conclu que sa thèse était correcte et a utilisé une méthode différente pour agir en conséquence. Il ne peut pas être confortablement justifié — il a tué sa sœur et on lui a dit que c’était inévitable, et avoir raison sur le mécanisme ne lui rend pas ça. Écris ce qu’il fait quand quelqu’un est d’accord avec lui et n’a pas besoin de lui.",
    // A · a371e15c9450
    "endings.end_kyros_was_right.epilogue": "Il ne fait pas partie de ce qui remplace ça et n’a jamais demandé à en faire partie. Il retourne au port, enlève proprement le mur des noms cette fois, puis passe quatre ans à retrouver les gens inscrits dessus pour leur raconter ce qui a changé. Mara est la dernière dont il efface le nom, et il ne le remet nulle part.",
    // B · ecd93aa0621e
    "endings.end_kyros_wins.name": "Kyros gagne",
    // B · c9d08ae5d876
    "endings.end_kyros_wins.rarity": "FRÉQUENT",
    // B · a0c5156c87c9
    "endings.end_kyros_wins.requires.flagsSet": ["the_threads_are_cut","kyros_is_moving"],
    // B · 2b008a7cb649
    "endings.end_kyros_wins.requires.flagsUnset": ["stopped_kyros","joined_the_cut_thread"],
    // B · e36b03a0ff32
    "endings.end_kyros_wins.condition": "Il est arrivé, il l’a fait, et le joueur n’était pas dans la pièce. Ce n’est pas un reproche : il a eu quatre ans, quarante personnes et un fragment que personne ne connaissait, et être dépassé par ça est le résultat ordinaire. Écris-le depuis l’endroit où le joueur se trouvait quand les lectures ont commencé à échouer.",
    // A · b04c7df5e68f
    "endings.end_kyros_wins.epilogue": "Ça se passe vers quatre heures du matin et le premier signe ailleurs est qu’un sanctuaire cesse de recevoir des rendez-vous. Personne ne publie jamais de communiqué, puisque plus aucun organe n’a la légitimité pour le faire. Le joueur apprend ce qui s’est vraiment passé par une femme à un carrefour, sans que ça ne serve à rien.",
    // B · 3ee006250914
    "endings.end_house_of_the_stranger.name": "La maison de l’étranger",
    // B · f8b8333fe7bc
    "endings.end_house_of_the_stranger.rarity": "RARE",
    // B · 9ed366aaf8af
    "endings.end_house_of_the_stranger.requires.flagsSet": ["took_the_house"],
    // B · b3aa8b0b89ea
    "endings.end_house_of_the_stranger.condition": "L’héritage le plus important du joueur est une porte qui reste ouverte. Pas une victoire sur quelqu’un — une cuisine, une règle respectée exactement pendant trente ans puis tenue par quelqu’un d’autre. Écris délibérément l’ordinaire de ça, parce que c’est tout l’argument que la fin défend.",
    // A · 8549f26260da
    "endings.end_house_of_the_stranger.epilogue": "Despina transmet les clés un mardi avec une liste de onze problèmes sur la chaudière, puis file chez sa sœur à Nafplio et est vraiment nulle pour prendre sa retraite. La route ne s’arrête pas avec elle. En quatre ans, il y a deux autres maisons, dont une dans une ville qui n’en a jamais eu, et aucune n’est nommée d’après quelqu’un.",
    // B · fada6bf3db30
    "endings.end_the_last_oracle.name": "Le dernier oracle",
    // B · 734e45c160cf
    "endings.end_the_last_oracle.rarity": "PEU FRÉQUENT",
    // B · 4e175daf0ee5
    "endings.end_the_last_oracle.requires.flagsSet": ["the_readings_are_failing"],
    // B · a17168ef865d
    "endings.end_the_last_oracle.condition": "Le système de prophétie s’est en grande partie effondré, et une forme volontaire a survécu parce que quelqu’un l’a préservée délibérément et selon de nouvelles conditions. C’est une fin calme, institutionnelle, sans glamour, sur une femme avec un carnet qui décide à quoi ont servi ses dix-neuf ans.",
    // A · f63a29c6b51c
    "endings.end_the_last_oracle.epilogue": "Elle prend onze personnes, aucune de moins de trente ans, et une règle écrite : plus personne ne se fait lire sans le vouloir. C’est bien plus petit que ce que ça remplaçait, et bien mieux au fond. Elle ne détruit jamais la lecture blanche, qui est toujours dans le deuxième tiroir d’un bureau à Delphes.",
    // B · 9ba898d6d4a9
    "endings.end_walk_away.name": "Partir",
    // B · c9d08ae5d876
    "endings.end_walk_away.rarity": "FRÉQUENT",
    // B · d1ce20a91e04
    "endings.end_walk_away.requires.flagsSet": ["went_and_lived","left_the_map"],
    // B · 780fbe1a7d62
    "endings.end_walk_away.condition": "Ils sont partis. Pas pour une faction, pas pour un dieu, pas pour une cause — dehors, vers une vie ordinaire, le monde caché devenant une chose qui leur est arrivée une fois. C’est une réponse totalement cohérente à une quinzaine comme ça et ne doit pas être ni rachetée ni punie. Le reste continue sans eux.",
    // A · 66803130d103
    "endings.end_walk_away.epilogue": "Ça s’éloigne à peu près comme tout ce qui s’éloigne. Deux ans plus tard, ça ressemble à un truc qui s’est passé à un mauvais moment dans leurs vingt ans. Ils ne regardent toujours pas en l’air sur les quais, exprès, comme une discipline. Parfois, quelque chose dans la rue les regarde un peu trop longtemps, puis continue son chemin.",
    // A · 530b2756403d
    "archetypes.arch_runner.name": "Tu cours",
    // B · cd6443c547d5
    "archetypes.arch_runner.role": "Vitesse et rues",
    // A · 59a3d91079a4
    "archetypes.arch_runner.summary": "Peu importe ce que tu faisais de ta vie, tu sais traverser une ville vite et tu sais quels murs grimper, ce qui est en fait la compétence la plus utile que quelqu’un puisse avoir ici.",
    // A · eb8de6b007f6
    "archetypes.arch_runner.playstyle": ["Rapide","Esquive","Connaît la ville"],
    // A · 65d949a9d22a
    "archetypes.arch_runner.blurb": "Tu étais sur ce quai parce que c’était sur ton chemin, et la raison pour laquelle tu es encore en vie vingt minutes plus tard, c’est que tu as fait ce qu’il fallait, tout de suite et sans discuter.",
    // A · 25869b7fb6eb
    "archetypes.arch_reader.name": "Tu Lis Tout",
    // B · 6d651148600a
    "archetypes.arch_reader.role": "Savoir et motifs",
    // A · 81217ce057ba
    "archetypes.arch_reader.summary": "Classiques, folklore, quatre versions contradictoires de la même histoire et une idée sur celle qui est la plus ancienne. Tu vas découvrir que la plupart sont fausses de façon très utile.",
    // A · 61c374953d25
    "archetypes.arch_reader.playstyle": ["Analytique","Préparé","Physiquement peu impressionnant"],
    // A · 2c07cf148738
    "archetypes.arch_reader.blurb": "Tu as lu neuf cents pages sur ce sujet précis et rien n’a jamais parlé de cette odeur de métal chaud.",
    // A · c0a8ab17a270
    "archetypes.arch_host.name": "Tu Nourris les Gens",
    // B · 8aa4ee6309af
    "archetypes.arch_host.role": "Hospitalité et réputation",
    // A · 925c2ce9f355
    "archetypes.arch_host.summary": "Une cuisine, un bar, une affaire de famille — un endroit où tu as passé des années à mettre des inconnus à l’aise, ce qui dans ce monde se révèle être une forme de loi.",
    // A · 0ecaba620780
    "archetypes.arch_host.playstyle": ["Bienvenue partout","Persuasif","Pas combattant"],
    // A · 12233ff56eaf
    "archetypes.arch_host.blurb": "La règle sur les invités n’est pas une métaphore ici, et tu la respectes presque instinctivement depuis une dizaine d’années, sans que personne t’ait jamais expliqué pourquoi c’était important.",
    // A · ca88cde2831f
    "archetypes.arch_stubborn.name": "Tu Ne Bronches Pas",
    // B · 82e4d2e2ace2
    "archetypes.arch_stubborn.role": "Courage et serments",
    // A · c582d9ae86ec
    "archetypes.arch_stubborn.summary": "Tu as déjà vécu quelque chose, peu importe quoi, et ça t’a laissé la capacité de rester face à un truc énorme et ancien sans fermer la bouche, ce que presque personne ne peut faire.",
    // A · 491996ed80e1
    "archetypes.arch_stubborn.playstyle": ["Immobile","Franc","Lent"],
    // A · c2b0ac9d95a1
    "archetypes.arch_stubborn.blurb": "Le premier dieu que tu rencontres va s’apercevoir en environ quatre secondes que tu n’as pas détourné le regard, et ça va changer le cours de la conversation.",
    // B · a7b3b55b041d
    "setupFields.displayName.label": "Quel est ton nom ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · c121e96446ab
    "setupFields.displayName.placeholder": "ex. Nadia Farrell",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 5965ecf877b1
    "setupFields.pronouns.placeholder": "ex. elle / sa",
    // B · fe62d9f00695
    "setupFields.archetype.label": "En quoi es-tu vraiment bon ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHETYPE",
    // B · bde11f6f89a4
    "setupFields.archetype.helpText": "Ce que tu savais déjà faire avant tout ça, qui détermine ce en quoi tu es bon et qui dans le monde caché te prend au sérieux. C’est fixe pour toute l’histoire. Ça ne décide pas pourquoi tu es blank, quel dieu tu dois, ou ce qui arrive au Métier — tout ça t’appartient.",
    // B · 68d18ced4553
    "setupFields.worldKnowsAboutYou.label": "Pourquoi étais-tu sur ce quai ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · cf252666751a
    "setupFields.worldKnowsAboutYou.helpText": "Touriste, étudiant, local, travailleur, quelqu’un arrivé cette semaine, quelqu’un de beaucoup plus loin faisant semblant que c’est normal. Quoi que tu écrives, le monde s’en accommode.",
    // B · 8745d9fc3482
    "setupFields.worldKnowsAboutYou.placeholder": "ex. Je suis venu ici en mars pour un job qui a capoté et je prends le dernier train depuis deux mois.",
    // B · da2284947c21
    "setupFields.why_you_are_blank.label": "Tu as une théorie sur toi ?",
    // B · b6a31c665c0b
    "setupFields.why_you_are_blank.kind": "CHOIX",
    // B · 2a579b0ce0ee
    "setupFields.why_you_are_blank.helpText": "Rien dans ce monde ne sait pourquoi le Tissage ne peut pas te lire, et il ne décidera pas sans toi. Choisis une raison, ou pas — l’histoire fonctionne vraiment avec n’importe laquelle de ces options, ou sans aucune d’elles.",
    // B · 8e171f400a61
    "setupFields.why_you_are_blank.options.always.label": "Rien. Tu as toujours été comme ça sans le savoir.",
    // B · 5fcb264a7232
    "setupFields.why_you_are_blank.options.hidden.label": "Quelqu’un t’a caché, alors que tu étais trop jeune pour t’en souvenir.",
    // B · cb3066d86446
    "setupFields.why_you_are_blank.options.elsewhere.label": "Tu ne viens pas d’ici, d’une façon que tu n’as jamais dite à voix haute.",
    // B · 565598eb04dc
    "setupFields.why_you_are_blank.options.a_choice.label": "Tu as fait quelque chose une fois qui n’aurait pas dû être possible.",
    // B · aa1256ad4342
    "setupFields.why_you_are_blank.options.no_idea.label": "Aucune idée, et tu aimerais bien en avoir une.",
    // B · 0dfa09a4fee8
    "setupFields.appearance.label": "Que voit-elle quand elle se retourne ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · cafa00e318e9
    "setupFields.appearance.placeholder": "ex. Quelqu’un en tenue de travail qui regarde droit vers la chose sur le toit, ce que personne ne fait.",
    // B · 3aa4328667d6
    "protagonist.kind": "BLANC",
    // A · 7db2fb85416b
    "opening": "Le dernier train arrive avec six minutes d’avance, c’est déjà ça.\n\nLe deuxième truc, c’est l’animal sur son toit. Trop gros pour un chien, mais trop maigre pour un lion, avec ses pattes avant pliées à l’envers et un masque de bronze collé sur la tête.\n\nQuarante personnes sont sur ce quai. Aucune ne lève les yeux.\n\nUne fille de ton âge, à dix mètres, te voit regarder. Son visage change complètement.\n\n« Bouge pas. »\n\nC’est à ce moment précis que la bête te regarde.\n\nElle attrape dans son dos un arc argenté qui n’était pas là une seconde avant, sans corde dessus.\n\n« Tu la vois, toi aussi ? » La bête saute du toit. « Super. Je déteste ça. Fuis. »",
    // A · 3280e1e2bcd1
    "openingSuggestions": ["Je cours. Pas le long du quai, c’est un entonnoir — je saute la barrière et monte les escaliers de l’autre côté, en criant aux deux personnes les plus proches du bord de bouger en passant.","Je ne cours pas. Je regarde bien, le masque, les pattes, là où elle fixe mon regard, parce qu’elle est partie du toit après m’avoir vu, et j’aimerais savoir ce qu’elle croit que je suis.","« Il y a quarante personnes sur ce quai. » Je tire les plus proches vers la sortie, fort, qu’ils veuillent venir ou pas. « Quoi que ce soit, c’est moi qu’elle cherche. Faites-les monter les escaliers, je continue de lui faire face. »"],
  },
});
