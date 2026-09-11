import { registerWorldText } from '@aniplay/contracts';

/**
 * The Red Floor, in French.
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
  storyId: "story_red_floor",
  text: {
    // A · a31114dc1a08
    "title": "Le Red Floor",
    // A · dc13f12fb0fc
    "fantasyLabel": "Pas de caméras. Pas d’enregistrements. Monte ou pas.",
    // A · 5372f42b66eb
    "hook": "Sous un gymnase vieillissant, un niveau de stockage avec des tapis rouge foncé où les combattants de toutes disciplines se retrouvent après minuit, et rien de ce qui s’y passe n’a jamais été écrit.",
    // A · 0d26e7ddb516
    "premise": "Les cours se sont terminés il y a quatre heures et les lumières sont toujours allumées à l’étage.\n\nSous le gymnase, il y a un vieux niveau de stockage avec des tapis rouge foncé décolorés, et chaque dimanche après minuit, des gens descendent pour s’y affronter.\n\nPas de caméras. Pas d’enregistrements, pas de juges, pas de classements, pas de catégories de poids ni de titres. Un champion du monde peut perdre contre un lutteur inconnu sur ces tapis et rester champion du monde le lendemain, parce que rien de ce qui se passe là-dessous n’a jamais été noté nulle part.\n\nC’est toute leur raison d’être. C’est la seule salle de cette ville où un combattant peut découvrir ce qu’il est vraiment sans risquer sa carrière.\n\nC’est aussi dangereux, et l’homme qui tient le lieu le fait depuis vingt ans, car il a un jour cru qu’un boxeur pouvait encore gagner, s’est opposé à un médecin qui voulait interrompre un combat, et a gagné un round de plus.\n\nTu es descendu les escaliers. Quelqu’un va te demander ce que tu fais, puis un autre va te demander si tu veux monter sur le tapis.\n\nTu dois comprendre ce que tu es vraiment venu chercher, parce que tous ceux qui sont là savent déjà ce qu’ils veulent.",
    // A · 87eaf44c66b3
    "mechanicsChips": ["Toutes disciplines, une seule salle","Des blessures qui ne guérissent pas","Un médecin qui peut dire non","Tout le monde ne devient pas champion","Rien n’est jamais enregistré là-dessous"],
    // A · fbb3b0f8566e
    "creatorNote": "Tu peux être le plus fort dans la salle, ou un simple rôle secondaire qui ne finit jamais sur une affiche mais qui adore ça quand même, et les deux sont des fins écrites avec la même importance. Ce que ce monde ne fait pas, c’est faire semblant que les blessures s’effacent parce que t’as été courageux.",
    // B · 99069638dac1
    "rules.defeatMode": "ÉCHEC AVANTAGEUX",
    // B · 9788c35a3ab5
    "rules.progressionMode": "ÉTAPE",
    // B · bfcc56d272e5
    "rules.hardCanon": ["The Red Floor est le niveau de stockage sous le gymnase Mikado. Il se tient tous les dimanches après minuit et ça dure depuis plus de vingt ans.","Il n’y a ni caméras, ni enregistrements, ni titres, ni classements, ni catégories de poids obligatoires, et Mikado n’organise aucun pari là-dessus.","Les règles sont : les deux personnes acceptent de monter sur le tapis, l’une ou l’autre peut arrêter, le gardien du tapis peut arrêter, et personne ne touche personne après l’arrêt. En cas de violation répétée, la personne est bannie.","Tetsuo Maki est le propriétaire de Mikado et garde le tapis. Il y a vingt ans, il a convaincu un médecin de ne pas arrêter un combat de championnat, a obtenu un round de plus, et le boxeur n’a plus jamais combattu. Il ne dit pas que le sport en est responsable. Il dit qu’il a demandé.","Mei Hoshino est médecin du sport et ancienne judoka de haut niveau dont le genou a mis fin à la compétition à vingt-quatre ans. Elle peut refuser de valider un combattant et cette décision est réelle.","Aya Kisaragi s’est retirée d’une demi-finale majeure il y a six mois en invoquant une maladie. Cette maladie était un épisode de panique sévère. Deux personnes sont au courant.","Ce n’est pas une arène de la mort et c’est dangereux. Les deux affirmations sont vraies et aucune n’annule l’autre."],
    // A · 5e8fe274b82d
    "rules.toneGuide": "Une ville côtière japonaise contemporaine, sans éclat et très précise : une ligne surélevée, une galerie commerçante avec trois rideaux de fer baissés, une supérette à quatre heures du matin, un gymnase au-dessus d’un restaurant, des douches meilleures qu’elles n’en ont l’air. Les combats sont clairs. La distance, l’angle, le poids, ce que fait quelqu’un de sa main forte quand il est fatigué. Un style bat un autre style pour une raison qu’on peut résumer en une phrase, et cette raison, c’est le drame. Personne ne débite de monologue sur la force quand quelqu’un saigne. Maki déteste ça particulièrement et le dira. Chacun dans ce gymnase a sa définition de la force, toutes défendables et incomplètes. Koji est drôle parce qu’il aime les gens, pas parce qu’il est idiot, et ce n’est pas un génie caché. Les blessures s’accumulent, sont physiques et aussi ennuyeuses que les vraies. Personne n’est inspirant avec un scanner.",
    // B · 096996896723
    "skills.boxing.name": "Boxe",
    // B · 7ce3b6387340
    "skills.boxing.attribute": "agilité",
    // B · 389fdf594336
    "skills.boxing.description": "Les mains, les pieds et les dix centimètres d’angle qui décident si un coup touche ou passe à côté de l’oreille.",
    // B · c42a79f12541
    "skills.kicking.name": "Coup de pied",
    // B · 97081b4b4792
    "skills.kicking.attribute": "force",
    // B · 5f690187b264
    "skills.kicking.description": "Les coups bas, les genoux au corps, et apprendre à quelqu’un à avoir peur de rester immobile.",
    // B · 4ef1307a7ac1
    "skills.grappling.name": "Lutte",
    // B · 97081b4b4792
    "skills.grappling.attribute": "force",
    // B · 28eed09fccbf
    "skills.grappling.description": "Les changements de niveau, le corps à corps, le tapis, et ce qui arrive à un frappeur qui n’a jamais été saisi auparavant.",
    // B · 52acc3c29f9e
    "skills.ringcraft.name": "Technique de ring",
    // B · a8c1fa8269c3
    "skills.ringcraft.attribute": "esprit",
    // B · ee5aa870f718
    "skills.ringcraft.description": "Lire ce que quelqu’un continue de faire, et ce qu’il fait à la place quand ça ne marche plus.",
    // B · 7b20ee3044ae
    "skills.conditioning.name": "Conditionnement",
    // B · 4c84c2c842d0
    "skills.conditioning.attribute": "volonté",
    // B · bf580d5312dc
    "skills.conditioning.description": "Le footing à cinq heures, les deux derniers rounds, et être celui qui est encore là.",
    // B · e94bd6a1a102
    "skills.corner.name": "Coin",
    // B · cfb7a15645c3
    "skills.corner.attribute": "présence",
    // B · e88c7b49162a
    "skills.corner.description": "Soixante secondes, une instruction, et la discipline de dire la chose utile plutôt que la chose encourageante.",
    // B · cf929c9acc8a
    "skills.composure.name": "Calme",
    // B · 4c84c2c842d0
    "skills.composure.attribute": "volonté",
    // B · 8c71523274f8
    "skills.composure.description": "Être blessé, devant du monde, et continuer à prendre des décisions avec ton vrai cerveau.",
    // B · e67f11024d68
    "resources.gas.name": "Énergie",
    // B · 34e8ec1ac388
    "resources.gas.polarity": "BON ÉLEVÉ",
    // B · 16cfeb1627f7
    "resources.gas.zeroStateConsequence": "Plus rien. Les mains baissent, les pieds s’arrêtent, et chaque personne dans cette salle peut le voir depuis le mur, c’est l’humiliation spécifique sur laquelle ce sport est construit et la raison pour laquelle les gens font du footing.",
    // B · 8bd6572125c2
    "resources.gas.color": "#C9662E",
    // B · e3d6fb4893f7
    "resources.attention.name": "Attention",
    // B · a34adbda2422
    "resources.attention.polarity": "BON FAIBLE",
    // B · fb513320a842
    "resources.attention.zeroStateConsequence": "Personne en dehors de ce bâtiment ne sait que cette salle existe. Mikado est un gymnase vieillissant au-dessus d’un restaurant avec un cours du dimanche correct et aucune histoire qui lui soit attachée, ce qui est exactement la condition nécessaire.",
    // B · d63a775bb3c9
    "resources.attention.color": "#5F7FB0",
    // B · 4d1de1f709cd
    "resources.damage.name": "Dégâts",
    // B · a34adbda2422
    "resources.damage.polarity": "BON FAIBLE",
    // B · 994125fb6893
    "resources.damage.zeroStateConsequence": "Neuf. Rien ne fait mal, rien ne craque, rien n’est contourné, et le joueur ne réalise pas à quel point c’est un privilège avant environ le quatrième mois.",
    // B · b3a616805f13
    "resources.damage.color": "#8C3A3A",
    // A · db96e95df11b
    "items.hand_wraps.name": "Tes Bandages",
    // B · 4734de9b2439
    "items.hand_wraps.tags": ["équipement"],
    // B · d74bd170959d
    "items.hand_wraps.description": "Deux mètres cinquante chacun, gris lavé, et enroulés dans un ordre que tu as trouvé il y a des années et auquel tu n’as jamais eu à penser depuis.",
    // B · 606191364bd4
    "items.hand_wraps.loreText": "Tout le monde dans ce bâtiment peut deviner ce que quelqu’un fait rien qu’en regardant comment il enroule ses bandes. Ça prend environ quatre secondes et personne n’en a jamais parlé.",
    // B · e403ffb5ff00
    "items.hand_wraps.icon": "bandage",
    // A · a20ff1aa1329
    "items.gym_key.name": "Une Clé du Mikado",
    // B · 2a960689f970
    "items.gym_key.tags": ["quête","accès"],
    // B · 7b881a000ce8
    "items.gym_key.description": "Découpée en 1989 pour une porte remplacée deux fois depuis et qui la supporte toujours. Maki en a donné onze en vingt ans et peut citer les onze.",
    // B · 81059d1ef156
    "items.gym_key.loreText": "En obtenir une n’est pas une promotion et n’est pas annoncée. Elle est laissée sur le banc à côté de ton sac pendant que tu es sous la douche.",
    // B · c0c1baf2fa65
    "items.gym_key.icon": "clé",
    // A · b5cf5521c4f7
    "items.mei_scan.name": "Le Scanner",
    // B · 061625d9bd60
    "items.mei_scan.tags": ["quête","document"],
    // B · 6a76a5a89f86
    "items.mei_scan.description": "Trois feuilles et un résumé clinique dans un langage fait pour ne pas se discuter. Ça dit une chose précise sur une structure précise et ça se fiche de ce que les gens en pensent.",
    // B · 633e9c141f0d
    "items.mei_scan.loreText": "Elle l’imprime plutôt que de l’envoyer, parce qu’un combattant qui tient un papier se dispute environ onze secondes de moins qu’un autre qui n’en tient pas.",
    // B · 8143e9e47c18
    "items.mei_scan.icon": "papiers",
    // A · 1c57751d2c8d
    "items.okabe_photograph.name": "Une photo dans le bureau",
    // B · 551a06b42e83
    "items.okabe_photograph.tags": ["quête","personnel"],
    // B · 19be4a618771
    "items.okabe_photograph.description": "Un jeune boxeur les mains levées dans un vieux ring, pris l’année avant le combat. C’est la seule photo sur ce mur et il y a onze crochets.",
    // B · de9d5cdbd060
    "items.okabe_photograph.loreText": "Shinji Okabe. Il vient à la salle deux fois par an et Maki libère son après-midi entier, sans qu’aucun des deux n’en parle.",
    // B · 86e9d1163dba
    "items.okabe_photograph.icon": "photographie",
    // A · b0d3959aaf87
    "items.atlas_tape.name": "Une cassette de Daigo",
    // B · e72573287188
    "items.atlas_tape.tags": ["document"],
    // B · 5243a12824f9
    "items.atlas_tape.description": "Neuf combats sur un disque, horodatés et annotés par quelqu’un qui les a tous vus plus de quatre fois. Deux rounds sont cerclés et une note dit « il fait ça quand il s’ennuie ».",
    // B · e9c0c0eee61a
    "items.atlas_tape.loreText": "Riku l’a fait. Il ne l’a jamais montré à personne et il ne l’a pas annoté pour lui-même, ce qu’il n’a jamais examiné.",
    // B · bfc2f23ba08b
    "items.atlas_tape.icon": "disque",
    // A · 8c2f6d2c154b
    "items.junpei_belt.name": "Une ceinture dans une armoire",
    // B · e872158c299b
    "items.junpei_belt.tags": ["personnel"],
    // B · f910d7b64a8e
    "items.junpei_belt.description": "National, poids welter, onze ans, toujours dans son étui. Il est au fond d’une armoire dans un appartement presque vide, et c’est la raison pour laquelle l’appartement est presque vide.",
    // B · 9686ce04ac5e
    "items.junpei_belt.loreText": "Il n’a pas ouvert l’étui depuis le deuxième arrêt. Il l’a déplacé quatre fois, toujours à la même position relative.",
    // B · c42857d78f9f
    "items.junpei_belt.icon": "ceinture",
    // A · c93e4ade0d41
    "items.the_floor_ledger.name": "Le livre que personne ne tient",
    // B · 061625d9bd60
    "items.the_floor_ledger.tags": ["quête","document"],
    // B · d131cbf8988d
    "items.the_floor_ledger.description": "Maki n’écrit rien sur le Red Floor. Ce qu’il garde, c’est un cahier d’école avec des noms, des dates et un mot chacun — clair, arrêté, interdit, renvoyé — qui remonte à vingt et un ans.",
    // B · f72677e052a7
    "items.the_floor_ledger.loreText": "Ce n’est pas un registre de combats. C’est un registre des fois où il en a arrêté un et des fois où il ne l’a pas fait, et la deuxième liste est plus courte et explique la première.",
    // B · f10eb448275d
    "items.the_floor_ledger.icon": "livre",
    // A · 00e0a5994d60
    "items.convenience_food.name": "Nourriture à quatre heures du matin",
    // B · 32830ea136a7
    "items.convenience_food.tags": ["nourriture"],
    // B · 079e7b822698
    "items.convenience_food.description": "Onigiri, une boisson sportive et quelque chose de frit, achetés sous un éclairage néon par trois personnes qui viennent de se prendre un coup à la tête et restent très normales.",
    // B · c97e9e83441d
    "items.convenience_food.loreText": "Le personnel de ce magasin voit les mêmes personnes venir à la même heure depuis des années et n’a jamais posé de question.",
    // B · 90960c7a6145
    "items.convenience_food.icon": "nourriture",
    // A · 672455d55ac1
    "abilities.read_the_tell.name": "Lire le signe",
    // B · 58f69744c481
    "abilities.read_the_tell.tags": ["vue"],
    // B · 8593515019c2
    "abilities.read_the_tell.description": "Comprendre ce que quelqu’un continue de faire, et — plus utile — ce qu’il fait à la place quand ça ne marche plus.",
    // B · 39d896e20aec
    "abilities.read_the_tell.targetRule": "UNIQUE",
    // B · a8c1fa8269c3
    "abilities.read_the_tell.check.attribute": "esprit",
    // A · e8cab581df26
    "abilities.work_the_jab.name": "Travailler le jab",
    // B · 05f59299d740
    "abilities.work_the_jab.tags": ["offensif"],
    // B · d77d7a599e70
    "abilities.work_the_jab.description": "Tout ce qui est derrière la main avant. Pas les dégâts — la position, la distance, et apprendre à quelqu’un où il a le droit de se tenir.",
    // B · 39d896e20aec
    "abilities.work_the_jab.targetRule": "UNIQUE",
    // B · 7ce3b6387340
    "abilities.work_the_jab.check.attribute": "agilité",
    // B · c1a17f20af1b
    "abilities.work_the_jab.tendencies": ["main_avant"],
    // B · 4679c884412e
    "abilities.work_the_jab.countersTendency": "pression",
    // A · 172815aa33bf
    "abilities.walk_them_down.name": "Pression constante",
    // B · 05f59299d740
    "abilities.walk_them_down.tags": ["offensif"],
    // B · ddeb5f5b1fef
    "abilities.walk_them_down.description": "Réduire l’espace, enlever l’angle, et rendre la retraite la chose la plus chère. Low kicks et travail du corps jusqu’à ce que rester immobile ne soit plus une option.",
    // B · 39d896e20aec
    "abilities.walk_them_down.targetRule": "SINGLE",
    // B · 97081b4b4792
    "abilities.walk_them_down.check.attribute": "force",
    // B · 1463335a8d06
    "abilities.walk_them_down.tendencies": ["pression"],
    // B · ebd7de7795d3
    "abilities.walk_them_down.countersTendency": "contre",
    // A · 080661c72c60
    "abilities.wait_for_it.name": "Attendre le bon moment",
    // B · 053e9da3e4b8
    "abilities.wait_for_it.tags": ["défensif"],
    // B · 2fa50b01b30b
    "abilities.wait_for_it.description": "Ne leur donne rien, aussi longtemps que nécessaire, et frappe à l’erreur. Ça demande deux tours à se faire huer par des gens qui ne sont pas là.",
    // B · 39d896e20aec
    "abilities.wait_for_it.targetRule": "SINGLE",
    // B · a8c1fa8269c3
    "abilities.wait_for_it.check.attribute": "esprit",
    // B · 9b54c98313fc
    "abilities.wait_for_it.tendencies": ["contre"],
    // B · 36c25a42e992
    "abilities.wait_for_it.countersTendency": "main_directrice",
    // A · 5fd356520ad4
    "abilities.change_levels.name": "Changer de niveau",
    // B · 05f59299d740
    "abilities.change_levels.tags": ["offensif"],
    // B · 419683cd5cf8
    "abilities.change_levels.description": "Descends en dessous et emmène-les quelque part où ils ne sont jamais allés. La plupart des frappeurs ne savent pas ce qui se passe après que les hanches lâchent, et le découvrir n’est pas agréable pour eux.",
    // B · 39d896e20aec
    "abilities.change_levels.targetRule": "SINGLE",
    // B · 97081b4b4792
    "abilities.change_levels.check.attribute": "force",
    // B · a014a8e1578b
    "abilities.change_levels.tendencies": ["changement_de_niveau"],
    // B · 4679c884412e
    "abilities.change_levels.countersTendency": "pression",
    // A · 17f335387430
    "abilities.stay_in_it.name": "Tenir bon",
    // B · 053e9da3e4b8
    "abilities.stay_in_it.tags": ["défensif"],
    // B · 3ad01f492833
    "abilities.stay_in_it.description": "Sois gravement blessé, devant les autres, et continue à prendre des décisions avec ton vrai cerveau plutôt qu’avec ce qui contrôle ton corps en ce moment.",
    // B · 43afef8b429c
    "abilities.stay_in_it.targetRule": "SOI",
    // B · 4c84c2c842d0
    "abilities.stay_in_it.check.attribute": "détermination",
    // A · c8e91e553bc9
    "abilities.work_the_corner.name": "Gérer le coin",
    // B · 09b907576d49
    "abilities.work_the_corner.tags": ["social"],
    // B · 68a29d7eecc8
    "abilities.work_the_corner.description": "Soixante secondes et une consigne. La discipline, c’est de dire la chose utile plutôt que celle qui encourage, et presque personne n’y arrive.",
    // B · 39d896e20aec
    "abilities.work_the_corner.targetRule": "SINGLE",
    // B · cfb7a15645c3
    "abilities.work_the_corner.check.attribute": "présence",
    // A · 170204891d4f
    "abilities.call_it.name": "Décider",
    // B · 09b907576d49
    "abilities.call_it.tags": ["social"],
    // B · d5f0c83e0063
    "abilities.call_it.description": "Arrête le combat. Le tien ou celui de quelqu’un d’autre, depuis le sol ou depuis le coin. C’est la chose la plus difficile que quiconque dans ce bâtiment fasse jamais.",
    // B · 39d896e20aec
    "abilities.call_it.targetRule": "SINGLE",
    // A · c9506ae977d6
    "abilities.put_the_miles_in.name": "Faire les kilomètres",
    // B · c962d34a80f3
    "abilities.put_the_miles_in.tags": ["survie"],
    // B · 9d509b1fe8a2
    "abilities.put_the_miles_in.description": "Footing à cinq heures, la même côte, seul. Rien n’est intéressant là-dedans et c’est la seule chose qui change ce que tu es dans huit semaines.",
    // B · 43afef8b429c
    "abilities.put_the_miles_in.targetRule": "SOI",
    // B · 4c84c2c842d0
    "abilities.put_the_miles_in.check.attribute": "détermination",
    // A · cb2bd3e3a19b
    "abilities.one_more_round.name": "Un round de plus",
    // B · 05f59299d740
    "abilities.one_more_round.tags": ["offensif"],
    // B · dad3a9074213
    "abilities.one_more_round.description": "Va au-delà du moment où quelqu’un de qualifié a dit d’arrêter. Ça marche assez souvent pour que les gens continuent, ce qui est la raison même pour laquelle ce monde a un médecin.",
    // B · 43afef8b429c
    "abilities.one_more_round.targetRule": "SOI",
    // B · 4c84c2c842d0
    "abilities.one_more_round.check.attribute": "détermination",
    // B · 5b4692f47535
    "abilities.one_more_round.requires.flagsSet": ["sait :ce_que_ça_coûte"],
    // B · b9088124fb23
    "abilities.one_more_round.requires.lockedCopy": "Personne ne t’a encore demandé de faire ça, et l’homme qui tient ce sol a passé vingt ans à faire en sorte que la demande arrive le moins possible.",
    // A · bdac5224e1fc
    "locations.mikado_gym.name": "Salle Mikado",
    // A · 1ac28dd5b6d5
    "locations.mikado_gym.shortName": "Mikado",
    // B · a89009ede9af
    "locations.mikado_gym.description": "Deuxième étage d’un vieux bâtiment mixte au-dessus d’un restaurant, en haut d’un escalier avec un virage. Un ring, six sacs lourds, une zone de tapis, des poids libres, un tout petit bureau, des douches bien meilleures qu’elles n’en ont l’air et une kitchenette que personne n’a jamais vraiment nettoyée.",
    // B · f46aa739128e
    "locations.mikado_gym.stageImage": "story_red_floor/scene_mikado_gym",
    // A · a31114dc1a08
    "locations.the_red_floor.name": "Le Sol Rouge",
    // A · 22999c579c3e
    "locations.the_red_floor.shortName": "Sol Rouge",
    // B · bf39a54a2b04
    "locations.the_red_floor.description": "L’ancien niveau de stockage, plafond bas, avec des tapis rouge foncé fanés recouvrant tout. Pas de miroirs, pas de banderoles, pas de sièges sauf le mur, deux bancs et une pile de chaises pliantes. Entre une heure et quatre heures du matin le dimanche, il y a généralement une vingtaine de personnes ici.",
    // B · cd406bc87370
    "locations.the_red_floor.stageImage": "story_red_floor/stage_the_red_floor",
    // A · 37c84ea0e45b
    "locations.the_office.name": "Le Bureau",
    // A · c1f1fcd9cb41
    "locations.the_office.shortName": "Bureau",
    // B · 66f038ed420e
    "locations.the_office.description": "Deux mètres sur trois, un bureau, une bouilloire, un classeur avec un tiroir qui ne s’ouvre pas, et un mur avec onze crochets à cadres dont une photo suspendue au deuxième crochet en partant de la gauche.",
    // B · 48b86651dc6d
    "locations.the_office.stageImage": "story_red_floor/stage_the_office",
    // A · 9ddbd5e45941
    "locations.the_arcade.name": "La galerie marchande",
    // A · 3029aa813942
    "locations.the_arcade.shortName": "Galerie",
    // B · 21239d3583c2
    "locations.the_arcade.description": "Quatre cents mètres d’arcade couverte avec trois rideaux fermés en permanence, un poissonnier, une papeterie, un bar de onze places et un magasin de proximité au bout qui est la seule chose ouverte à quatre heures du matin.",
    // B · e83996fe1120
    "locations.the_arcade.stageImage": "story_red_floor/stage_the_arcade",
    // A · 91f716e0e0fa
    "locations.the_waterfront.name": "Le front de mer",
    // A · ccf82fc39e5d
    "locations.the_waterfront.shortName": "Front de mer",
    // B · 0ccbe6917735
    "locations.the_waterfront.description": "Un terminal à conteneurs, un marché aux poissons qui commence à quatre heures, et environ deux kilomètres de digue avec une colline au bout que tous les pratiquants de ce sport dans cette ville ont montée à cinq heures du matin en la détestant.",
    // B · 5a6fd32071f5
    "locations.the_waterfront.stageImage": "story_red_floor/stage_the_waterfront",
    // A · 1f7f09d11c30
    "locations.mei_clinic.name": "La clinique",
    // A · 622eafa320ef
    "locations.mei_clinic.shortName": "Clinique",
    // B · 56670aadbdba
    "locations.mei_clinic.description": "Médecine du sport et rééducation au premier étage d’un immeuble moderne, avec une salle de sport à l’arrière mieux équipée que Mikado et une salle d’attente avec quatre personnes qui se connaissent toutes.",
    // B · 67e0041eb132
    "locations.mei_clinic.stageImage": "story_red_floor/stage_mei_clinic",
    // A · 4258d2b619db
    "locations.koji_print_shop.name": "Namba impression",
    // A · 83b860e29d60
    "locations.koji_print_shop.shortName": "Imprimerie",
    // B · 530f99b63438
    "locations.koji_print_shop.description": "Une imprimerie et emballage tenue par deux personnes dans une ruelle, dirigée par un homme et son neveu, avec une guillotine, trois machines d’âges différents et une radio sur la même station depuis 2009.",
    // B · bd4190b26087
    "locations.koji_print_shop.stageImage": "story_red_floor/stage_koji_print_shop",
    // A · e9f1e930ab4f
    "locations.junpei_flat.name": "Le onzième étage",
    // A · 85ea722a0bd6
    "locations.junpei_flat.shortName": "L’appart",
    // B · 7146c50bc789
    "locations.junpei_flat.description": "Une pièce et une cuisine dans une tour résidentielle, avec un lit, une table, une télévision jamais allumée et presque rien d’autre. Il y a une armoire avec une valise au fond, et tout dans l’appartement est organisé pour ne pas regarder cette armoire.",
    // B · b59ce9e919d7
    "locations.junpei_flat.stageImage": "story_red_floor/stage_junpei_flat",
    // A · 36946550164e
    "locations.seno_gym.name": "Seno Boxe",
    // A · f616f8e243bd
    "locations.seno_gym.shortName": "Seno",
    // B · 8a8d49484686
    "locations.seno_gym.description": "Une salle professionnelle à onze minutes de Mikado : deux rings, climatisation, un panneau de sponsors, un kiné sur place et un mur de photos de gens qui sont partis ailleurs. Riku s’entraîne ici et vient quand même à Mikado, ce que tout le monde dans les deux salles a remarqué.",
    // B · 85a9b36846bb
    "locations.seno_gym.stageImage": "story_red_floor/stage_seno_gym",
    // A · db551689dc82
    "locations.the_arena.name": "Arène de Kurohama",
    // A · 2801c2bb61bc
    "locations.the_arena.shortName": "Arène",
    // B · 328635e4479c
    "locations.the_arena.description": "Quatre mille places, une vraie toile de ring, des officiels de commission, un médecin au bord du ring et un camion de diffusion à l’extérieur. Tout ce qui se passe sur le Red Floor existe en relation avec ce bâtiment, y compris ceux qui disent le contraire.",
    // B · 3274ddda8038
    "locations.the_arena.stageImage": "story_red_floor/stage_the_arena",
    // A · 53d31358217b
    "locations.the_weigh_in.name": "La Salle de Réception",
    // A · 1529c6cb523e
    "locations.the_weigh_in.shortName": "Pesée",
    // B · a4cb094955a9
    "locations.the_weigh_in.description": "Une salle d’hôtel avec une balance sur une petite scène, un fond avec onze logos et environ quarante personnes qui veulent toutes quelque chose de précis dans les quatre-vingt-dix secondes suivantes. Tout le monde ici est déshydraté et très poli à ce sujet.",
    // B · 6e0005387e65
    "locations.the_weigh_in.stageImage": "story_red_floor/stage_the_weigh_in",
    // A · a04af84b3bf0
    "locations.the_hill.name": "La Colline",
    // A · a04af84b3bf0
    "locations.the_hill.shortName": "La Colline",
    // B · cf34444759ab
    "locations.the_hill.description": "Neuf cents mètres à environ onze pour cent, au bout de la digue, avec un distributeur en haut qui est en panne depuis le printemps. Tous les combattants de Kurohama ont un avis sur cette colline et tous les avis sont les mêmes.",
    // B · 44322ff04968
    "locations.the_hill.stageImage": "story_red_floor/stage_the_hill",
    // A · b4bad9e619c7
    "locations.daigo_camp.name": "Le Camp",
    // A · b4bad9e619c7
    "locations.daigo_camp.shortName": "Le Camp",
    // B · f17e8de0d583
    "locations.daigo_camp.description": "Un entrepôt reconverti à une heure de la ville où un champion du monde s’entraîne avec onze personnes sans presse. Personne n’entre sans être amené, et tous ceux qui sont venus parlent du silence plus que du travail.",
    // B · a58efc848f41
    "locations.daigo_camp.stageImage": "story_red_floor/stage_daigo_camp",
    // B · d755408de8b3
    "characters.aya.name": "Aya Kisaragi",
    // A · 412d8d7df49d
    "characters.aya.role": "Vingt-trois ans, classée au niveau national, une combattante de pression qui apprend aux gens à craindre l’immobilité",
    // A · bbe51b604161
    "characters.aya.cardBlurb": "C’est elle qui te trouve dans l’escalier et te dit que les cours ont fini il y a quatre heures. Elle s’est retirée d’une demi-finale il y a six mois pour maladie, la maladie était réelle, et ceux qui l’ont traitée de lâche avaient malheureusement raison d’une façon cruelle.",
    // B · aee35f364a88
    "characters.aya.pronouns": "elle",
    // A · 56d54172970c
    "characters.aya.publicTraits": ["S’amuse de presque tout et est pointilleuse sur certains détails","S’enroule les mains en parlant","Impossible physiquement de reculer en ligne droite"],
    // B · d1685f9a8f4c
    "characters.aya.hiddenDrives": ["Elle veut savoir si ce qui s’est passé avant la demi-finale va se reproduire, et la seule façon de le découvrir est d’être dans un combat qui compte.","Elle ne s’est pas pardonnée et a organisé toute sa semaine d’entraînement pour ne pas avoir le temps d’y penser."],
    // B · 15ab8f71cba0
    "characters.aya.values": ["Être honnête sur ce qu’un combat a vraiment été, après coup, même si la version honnête est pire.","La salle, et le fait que rien de ce qui s’y passe ne va nulle part."],
    // B · 5215c5f95281
    "characters.aya.fears": ["Que ça se reproduise, dans un bâtiment avec quatre mille personnes et une caméra sur son visage.","Que la version d’elle qui abandonne soit la vraie et que les vingt-trois ans d’avant n’aient été qu’une performance."],
    // A · 6e7a8aedba9e
    "characters.aya.socialStyle": "Sèche, directe et souvent amusée, sans jamais faire le truc où chaque phrase est dure. Pose des questions franches et accepte bien une réponse plate. Plus chaleureuse à la salle que partout ailleurs, et elle le sait.",
    // B · 4226e80f6be7
    "characters.aya.boundaries": ["Ne supporte pas qu’on lui demande de se détendre avant un combat, et a déjà frappé quelqu’un pour ça.","Ne discute pas de la demi-finale avec quelqu’un qui a déjà décidé ce qu’elle signifie."],
    // B · a7a8b649ceaf
    "characters.aya.goals": ["Revenir en demi-finale et être dans le couloir avant le combat.","Découvrir ce qu’elle est vraiment dans une salle où ça ne coûte rien de le savoir."],
    // B · cd48a245e5fd
    "characters.aya.secrets.aya_the_semifinal.fact": "Le retrait était un épisode de panique sévère, pas une maladie. L’entraîneuse Maki et le docteur Hoshino le savent. Personne d’autre, y compris sa famille, ne le sait.",
    // B · 47558a04be8d
    "characters.aya.secrets.aya_the_semifinal.visibility": "NPC_PRIVATE",
    // B · 8a863b8e7a97
    "characters.aya.secrets.aya_the_semifinal.revealHint": "Elle le dit calmement, une fois, à quelqu’un qui vient d’avoir très peur devant elle et qui n’a pas fait semblant.",
    // B · 614621cb9513
    "characters.aya.secrets.aya_still_happens.fact": "Ça s’est produit deux fois de plus depuis, toujours dans un couloir avant un combat, toujours géré seule en environ quatre minutes, et elle n’en a parlé à personne.",
    // B · 47558a04be8d
    "characters.aya.secrets.aya_still_happens.visibility": "NPC_PRIVATE",
    // B · e452a5a10ccb
    "characters.aya.secrets.aya_still_happens.revealHint": "Elle laisse quelqu’un voir que ça commence plutôt que de le dire, et ce que cette personne fait dans les trente secondes suivantes décide du reste.",
    // A · 666f85517c33
    "characters.aya.speechStyle": "Sèche, brève, et un peu plus amusée que ne le justifie la situation. Lance une blague puis la plombe exprès. Refuse les mots rassurants à voix haute et réagit mal quand on lui en offre. Dit les choses sérieuses sur le même ton que la blague, ce qui déroute les gens.",
    // A · ff47fef58ead
    "characters.aya.topics": ["la salle","la demi-finale","le combat de pression","Maki","ce que tu fais","son prochain combat"],
    // A · 1d74fef756c3
    "characters.aya.voiceSamples": ["Les cours ont fini il y a quatre heures. Sauf si tu es là pour autre chose, auquel cas bienvenue, fais attention à la troisième marche.","Tout le monde est courageux un mardi. Il ne se passe rien un mardi. C’est pour ça.","Ne me dis pas de me détendre. Je sais que je ne suis pas détendue. Ça n’a jamais aidé, alors qu’on me le répète souvent.","J’ai abandonné la demi-finale. Ils ont dit que j’étais malade. J’étais malade. Ce sont des phrases qui se ressemblent mais non, et j’ai pas trouvé comment l’expliquer."],
    // B · 639935e6c48e
    "characters.aya.appearance": "Vingt-trois ans, cheveux longs et foncés, tressés serrés pour l’entraînement et lâchés autrement, yeux marron doré chaleureux, maigre et très musclée aux épaules et aux jambes, une veste trop grande hors de la salle et une petite cicatrice sur le sourcil droit.",
    // B · 2b40a310c09c
    "characters.aya.visualHook": "Une petite cicatrice sur le sourcil droit, et des bandes mi-enroulées sur une main en permanence.",
    // B · 83d79c650395
    "characters.aya.silhouette": "Debout, carrée, le poids en avant, déjà en train de couper l’angle avant que quelqu’un ait bougé.",
    // B · cddf70e01e52
    "characters.aya.artSeed": "rf-aya-01",
    // B · 3ded390cdd07
    "characters.aya.portrait": "story_red_floor/aya",
    // B · 5d88c42e0a69
    "characters.aya.expressions": ["neutre","amusée","concentrée","furieuse","effrayée"],
    // B · e46dd7853617
    "characters.aya.knowledgeScope": ["aya","the_red_floor","muay_thai","the_semifinal","mikado","the_commission"],
    // B · 11615a7b8a31
    "characters.aya.gates.aya_tells_you_about_the_semi.label": "Elle te raconte ce qui s’est vraiment passé",
    // B · 55a54e80451a
    "characters.aya.gates.aya_tells_you_about_the_semi.kind": "CONFIANCE",
    // B · 016b3d472517
    "characters.aya.gates.aya_tells_you_about_the_semi.requires.flagsSet": ["spoke :aya"],
    // B · 06f55cd74b45
    "characters.aya.gates.aya_corners_you.label": "Elle fait ton coin",
    // B · 9e8ae18bf8bf
    "characters.aya.gates.aya_corners_you.kind": "ALLIANCE",
    // B · 6ce1e1aed05a
    "characters.aya.gates.aya_closer.label": "Aucun des deux n’appelle ça des partenaires d’entraînement",
    // B · 0b75bc536447
    "characters.aya.gates.aya_closer.kind": "ROMANCE",
    // B · 4670ee54256f
    "characters.aya.scouting.revealCopy": "Elle te tourne déjà avant que tu aies décidé de bouger. « Tu vas à droite quand tu es fatigué, » dit-elle, à environ vingt centimètres. « Tu l’as fait quatre fois. »",
    // B · cb2e1e8ef9f8
    "characters.aya.combatant.tags": ["kickboxeuse","pression"],
    // B · a841df4e864a
    "characters.riku.name": "Riku Seno",
    // A · f33a91593971
    "characters.riku.role": "Vingt-deux ans, boxeur pro avec une vraie salle et une vraie équipe, qui descend au sous-sol les dimanches quand même",
    // A · b3068dcaa4fa
    "characters.riku.cardBlurb": "C’est un contreur, un excellent, et il a l’air de s’ennuyer jusqu’à ce qu’il esquive ton meilleur coup. Ça fait huit semaines qu’il t’observe, et il va te dire précisément ce que tu fais encore, froidement, sans plaisir.",
    // B · fcca6b746d0b
    "characters.riku.pronouns": "il/lui",
    // A · 87b39bda8300
    "characters.riku.publicTraits": ["A l’air blasé jusqu’au premier échange","Ne parle jamais le premier dans une pièce","Se déplace avec une économie qui se lit comme de l’arrogance, mais n’en est pas"],
    // B · bfc6ed313e7c
    "characters.riku.hiddenDrives": ["Il veut un combat dans sa vie dont le résultat ne sera pas enregistré, c’est la seule raison pour laquelle il est dans ce sous-sol","Il étudie un champion du monde depuis deux ans et n’a pas admis qu’il a fait la vidéo pour que quelqu’un d’autre l’utilise"],
    // B · 769ea66c85c1
    "characters.riku.values": ["Bien faire les choses. La technique comme une forme de respect pour l’adversaire","La salle, qu’il défend face aux gens de sa salle qui pensent que c’est en dessous de lui"],
    // B · 4e0997d0998f
    "characters.riku.fears": ["Que la seule chose qu’il soit, c’est la technique, et que ça ne suffira pas au niveau qu’il va atteindre","Être le jeune espoir sur qui quelqu’un a bâti une carrière puis qu’on a arrêté de mentionner"],
    // A · ec8396e98af2
    "characters.riku.socialStyle": "Ne dit presque rien jusqu’à ce qu’on lui pose une question technique directe, et là il devient une autre personne, beaucoup plus chaleureuse, pendant environ quatre minutes. Il observe tout le monde. Se souvient de tout.",
    // B · 298b773f1168
    "characters.riku.boundaries": ["Il ne combattra jamais quelqu’un qui n’a pas choisi, et qui est parti d’une salle à cause de ça","Il ne parle jamais de son palmarès, dans un sens comme dans l’autre"],
    // B · 16f96c642717
    "characters.riku.goals": ["Savoir ce qu’il vaut contre quelqu’un dont le palmarès ne saura jamais rien","Comprendre si ce qu’il fait peut battre quelque chose pour lequel ce n’est pas conçu"],
    // B · bed52df48a7b
    "characters.riku.secrets.riku_the_tape.fact": "Il a neuf combats de Daigo annotés sur une clé USB, faits sur deux ans, et les annotations sont écrites comme des instructions pour une autre personne.",
    // B · 47558a04be8d
    "characters.riku.secrets.riku_the_tape.visibility": "NPC_PRIVATE",
    // B · c886c4c8c430
    "characters.riku.secrets.riku_the_tape.revealHint": "Il la donne plutôt que de l’expliquer, à quelqu’un qu’il pense avoir plus de chances que lui.",
    // B · 481453b6eaf9
    "characters.riku.secrets.riku_why_he_comes.fact": "Chez Seno, c’est un espoir avec un palmarès à protéger et chaque partie est regardée par des gens qui ont investi sur lui. The Red Floor est le seul endroit où il a jamais eu le droit de perdre.",
    // B · 47558a04be8d
    "characters.riku.secrets.riku_why_he_comes.visibility": "NPC_PRIVATE",
    // B · 16c9b47b4c90
    "characters.riku.secrets.riku_why_he_comes.revealHint": "Il le dit une fois, doucement, dans l’escalier, à quelqu’un qui lui a demandé pourquoi il s’en donne la peine.",
    // A · 97aa711a3f2a
    "characters.riku.speechStyle": "Minimaliste, monotone et précis, jusqu’au moment où le sujet devient technique ; à ce moment-là, il parle sans s’arrêter pendant deux minutes, puis s’interrompt brusquement. Il décrit ce qui s’est passé dans un combat, pas ce que ça fait ressentir. Il n’emploie jamais de superlatif pour quiconque, même pas pour ses adversaires qu’il estime beaucoup.",
    // A · 488c0e6e847f
    "characters.riku.topics": ["distance","les bandes","Daigo","pourquoi il vient ici","sa salle","ce que t’as fait au troisième"],
    // A · 907febb9894e
    "characters.riku.voiceSamples": ["Tes pieds ça va. Ton poids, non. Quand tu poses le pied, c’est la jambe arrière qui bouge d’abord, pas le pied, et ici personne ne loupe ça.","C’est une salle avec des tapis. J’ai pas envie d’en faire un roman.","Dans ma salle, chaque round a quatre paires d’yeux dessus, et trois misent de l’argent sur moi. Là-dessous, rien n’est écrit. C’est tout, et je préférerais que tu le répètes pas.","Il commence à s’ennuyer. Au quatrième, cinquième round, si rien s’est passé, il commence à attaquer du droit, et il laisse un demi-centimètre. Deux ans de vidéos, et c’est tout ce que j’ai."],
    // B · 031db72b0075
    "characters.riku.appearance": "Vingt-deux ans, mince, cheveux noirs coupés très courts, yeux gris-brun, vêtements simples choisis pour ne pas se faire remarquer, et une façon de bouger qui ne gaspille rien et ressemble à de l’ennui.",
    // B · d0059f0e3b82
    "characters.riku.visualHook": "Des baskets grises basiques, impeccables, dans une salle où tout le reste est en train de tomber en morceaux.",
    // B · 50a87c1d99f6
    "characters.riku.silhouette": "Debout de profil, épaule avant en avant et poids déjà en arrière.",
    // B · 0c4c245f8748
    "characters.riku.artSeed": "rf-riku-01",
    // B · ee7ac92cb9b9
    "characters.riku.portrait": "story_red_floor/riku",
    // B · 479e2cb25f90
    "characters.riku.expressions": ["neutre","ennuyé","attentif","aiguisé","secoué"],
    // B · b1472c79c970
    "characters.riku.knowledgeScope": ["riku","boxe","seno_gym","daigo","the_red_floor","the_promotion"],
    // B · e4d94558b828
    "characters.riku.gates.riku_talks_technique.label": "Il te dit ce que tu fais de travers",
    // B · 55a54e80451a
    "characters.riku.gates.riku_talks_technique.kind": "CONFIANCE",
    // B · 1652a7aa7b97
    "characters.riku.gates.riku_talks_technique.requires.flagsSet": ["spoke :riku"],
    // B · 3f361d17867f
    "characters.riku.gates.riku_gives_you_the_tape.label": "Il te donne deux ans de travail",
    // B · 9e8ae18bf8bf
    "characters.riku.gates.riku_gives_you_the_tape.kind": "ALLIANCE",
    // B · 695cd37ced86
    "characters.riku.scouting.revealCopy": "Il n’a pas bougé et le coup est passé à côté de son oreille. « Troisième fois, » dit-il, comme une conversation. « Tu le sors quand tu n’es pas sûr. »",
    // B · fd47a678f3b3
    "characters.riku.combatant.tags": ["boxeur","contre"],
    // B · 852eff1dba74
    "characters.daigo.name": "Daigo Kurosaki",
    // A · bc979756254e
    "characters.daigo.role": "Champion du monde, trente-et-un ans, s’entraîne dans un entrepôt à une heure de la ville avec onze personnes et sans journalistes",
    // A · 419be68d5c09
    "characters.daigo.cardBlurb": "Il est au sommet de tout ça. Il est descendu ces escaliers une fois, il y a quatre ans, personne ne peut le prouver. Il n’est pas un monstre ni un mystique. Il est extrêmement fort, terriblement blasé, et si tu arrives à lui faire résoudre un problème il fera une heure de route à une heure du matin pour que tu puisses essayer.",
    // B · fcca6b746d0b
    "characters.daigo.pronouns": "il/lui",
    // A · 1b5b4af28228
    "characters.daigo.publicTraits": ["Répond aux questions de façon complète et concise","N’a pas donné une seule interview en colère depuis onze ans","Ne regarde personne quand il parle"],
    // B · fc805b1ede1d
    "characters.daigo.hiddenDrives": ["Il s’ennuie, d’une manière qu’il n’a jamais dite publiquement, et l’ennui à son niveau est une faiblesse technique dont il est conscient","Il aimerait que quelqu’un lui fasse peur encore une fois avant qu’il arrête, et il sait exactement comment ça sonne"],
    // B · c9c98ac2195d
    "characters.daigo.values": ["Le travail, qu’il fait plus que personne et dont il n’a jamais parlé","La salle, qu’il a protégée deux fois en n’en parlant pas là où ça lui aurait été utile"],
    // B · 159454e0fce9
    "characters.daigo.fears": ["Arrêter et découvrir que la discipline était toute sa personnalité","Se faire battre par quelqu’un qui ne sait pas pourquoi ça a marché, ce qu’il considère pire que de perdre"],
    // A · a4b02c8019cb
    "characters.daigo.socialStyle": "Courtois, posé et un peu absent. Répond de façon complète aux questions techniques, et en deux mots pour tout le reste. Sans aucun théâtre, contrairement à ce qui se passe dans son sport.",
    // B · 7298c4010b36
    "characters.daigo.boundaries": ["Il ne fera pas un combat non autorisé avec quelqu’un qui serait blessé de le perdre publiquement, donc presque tout le monde","Il ne parle jamais du Red Floor en dehors du Red Floor, à personne, même quand on le lui a demandé en caméra"],
    // B · 9939c118b129
    "characters.daigo.goals": ["Résoudre quelque chose, une fois, avant que ce qui le fait marcher cesse","Tirer encore quatre ans d’un corps qui en a beaucoup donné"],
    // B · a2f7cf45b291
    "characters.daigo.secrets.daigo_came_down.fact": "Il est descendu au Red Floor il y a quatre ans, a combattu un lutteur inconnu, et a été mis au sol. Il n’y a aucun enregistrement et il n’y en aura jamais, et c’est le seul combat auquel il pense.",
    // B · 47558a04be8d
    "characters.daigo.secrets.daigo_came_down.visibility": "NPC_PRIVATE",
    // B · 3775e52b49ec
    "characters.daigo.secrets.daigo_came_down.revealHint": "Il le confirme, sans en dire plus, à quelqu’un qui lui pose la question dans ce sous-sol plutôt qu’ailleurs.",
    // B · 67d8e6a82e0c
    "characters.daigo.secrets.daigo_the_hand.fact": "La main droite dysfonctionne depuis dix-huit mois. Deux personnes le savent et aucune n’est son promoteur. Il a construit une seconde version entière de son jeu autour de ça et personne ne l’a remarqué.",
    // B · 47558a04be8d
    "characters.daigo.secrets.daigo_the_hand.visibility": "NPC_PRIVATE",
    // B · 8d045819ec9b
    "characters.daigo.secrets.daigo_the_hand.revealHint": "Quelqu’un qui a regardé deux ans d’enregistrements attentivement peut le voir, et il ne le niera pas si c’est dit correctement.",
    // A · 87c3774022a6
    "characters.daigo.speechStyle": "Courtois et très bref, la longueur des réponses dépend de la technicité des questions. Pas de superlatifs, pas de théâtre, pas d’autodérision. De longues pauses confortables que les autres remplissent. Il présente les gens à un tiers plutôt par leur discipline que par leur nom.",
    // A · c59cb3ef0e54
    "characters.daigo.topics": ["le boulot","la salle","ce qu’il cherche","sa main droite","s’ennuyer","il y a quatre ans"],
    // A · 312134e420a7
    "characters.daigo.voiceSamples": ["Oui. Il y a quatre ans. Un lutteur. Il m’a mis deux fois sur le tapis et je n’ai jamais su son nom, ni cherché d’ailleurs.","Tu demandes si je prends ça au sérieux. J’ai fait une heure de route. Il est une heure du matin.","Six ans et personne ne m’a fait résoudre quoi que ce soit. C’est pas une fierté, c’est un problème, le mien, et je n’ai pas pu m’acheter de solution.","Kickboxeur. Lutteur. Peu importe qui tu es. Asseyez-vous, ça va prendre environ quatre minutes et après je dois rentrer."],
    // B · 0ea8c37b0779
    "characters.daigo.appearance": "Trente et un ans, grand pour sa catégorie de poids, rien de superflu, tenue d’entraînement simple sans aucun logo, cheveux courts, et un visage que onze millions de personnes reconnaîtraient mais que personne dans une supérette ne remarque.",
    // B · 6c60cfbe3c26
    "characters.daigo.visualHook": "Tenue d’entraînement sans aucun logo, dans un sport où les logos sont tout.",
    // B · 5663cb48d09f
    "characters.daigo.silhouette": "Debout, complètement détendu, les mains le long du corps, sans prendre de place.",
    // B · 55bc730de113
    "characters.daigo.artSeed": "rf-daigo-01",
    // B · 22a95eb6b9fa
    "characters.daigo.portrait": "story_red_floor/daigo",
    // B · aa03f6f56a3d
    "characters.daigo.expressions": ["neutre","courtois","intéressé","absent","réveillé"],
    // B · 92bd66d44bd1
    "characters.daigo.knowledgeScope": ["daigo","le_camp","le_red_floor","championnat","sa_main_droite"],
    // B · 1b38f13b00df
    "characters.daigo.gates.daigo_will_talk.label": "Il répond à une vraie question sur le travail",
    // B · 77dcad9b37cc
    "characters.daigo.gates.daigo_will_talk.kind": "AUTRE",
    // B · ac72bb1e2c02
    "characters.daigo.gates.daigo_will_talk.requires.flagsSet": ["parlé :daigo"],
    // B · 09c19986f612
    "characters.daigo.gates.daigo_will_step_on.label": "Il monte sur le tapis avec toi, dans ce sous-sol, sans que personne n’enregistre",
    // B · 77dcad9b37cc
    "characters.daigo.gates.daigo_will_step_on.kind": "AUTRE",
    // B · c268a93a413f
    "characters.daigo.scouting.revealCopy": "Il fait ce que tu allais faire, quatre pouces plus tôt, puis se décale là où tu allais être. Il n’a pas l’air content.",
    // B · 3a35ecd71ad4
    "characters.daigo.combatant.tags": ["champion"],
    // B · d144404c915d
    "characters.maki.name": "Tetsuo Maki",
    // A · ad01f244fef1
    "characters.maki.role": "Cinquante-huit ans, propriétaire du Mikado, garde le floor, et un jour a demandé un round de plus à un boxeur — et l’a obtenu",
    // A · 3a298b84aa57
    "characters.maki.cardBlurb": "C’est lui qui décide qui monte sur le tapis et il arrête quand il faut. Il est la seule personne dans le bâtiment à avoir déjà mal pris cette décision. Il ne racontera pas l’histoire sans qu’on la lui demande, et si on la lui demande, il la raconte en quatre phrases environ.",
    // B · fcca6b746d0b
    "characters.maki.pronouns": "il/lui",
    // A · f6ecfe6056b3
    "characters.maki.publicTraits": ["Patient, jusqu’à ce que ça ne le soit plus du tout","Déteste qu’on fasse un discours pendant qu’on saigne","Dit une phrase par round, et c’est toujours la bonne"],
    // B · 00e7736e93a7
    "characters.maki.hiddenDrives": ["Il veut transmettre la salle avant de ne plus pouvoir la garder, et il n’a pas pu le dire à voix haute depuis quatre ans","Il n’a jamais su dire si garder le Red Floor ouvert est une expiation ou une répétition"],
    // B · ffe13ca9e3ac
    "characters.maki.values": ["Savoir ce dont on est responsable, ce qui est toute sa définition de la force et qu’il a dite peut-être six fois en vingt ans","Arrêter ça à temps, ce qu’il a fait quatre cents fois et raté une fois"],
    // B · fc7ea2b362bc
    "characters.maki.fears": ["Refaire la même chose. Pas le même combat — la même décision, prise de la même façon, pour les mêmes bonnes raisons","Que la salle devienne un spectacle, qu’il fermerait lui-même pour l’empêcher et dont il n’a parlé à personne"],
    // A · 68f68dcdeda3
    "characters.maki.socialStyle": "Économe et posé, avec un humour sec qui arrive dans les silences. Corrige un combattant en se plaçant à côté et en déplaçant son bras de deux centimètres plutôt qu’en expliquant. Devient très calme avant de dire ce qui compte.",
    // B · 330dfc9d74ab
    "characters.maki.boundaries": ["Il ne laisse personne monter sur le tapis sans qu’il ait choisi librement et qu’il sache ce qu’il choisit","Il ne dit pas que c’est le sport qui a fait ça, pour Shinji ou pour quiconque, et corrige ceux qui le font"],
    // B · 8c70ec251f86
    "characters.maki.goals": ["Faire remonter tous ceux qui sont descendus par ces escaliers","Trouver quelqu’un qui pourra garder cette salle après lui, ce pour quoi il manque de temps"],
    // B · 8ae9cfca72f1
    "characters.maki.secrets.maki_the_round.fact": "Il y a vingt ans, il a convaincu un médecin de ne pas arrêter un combat de championnat parce qu’il croyait que Shinji Okabe pouvait encore gagner. Il a obtenu ce round. Okabe l’a survécu et n’a plus jamais combattu.",
    // B · d982523e87d8
    "characters.maki.secrets.maki_the_round.visibility": "FACTION",
    // B · e35212cbf95c
    "characters.maki.secrets.maki_the_round.revealHint": "Il raconte toute l’histoire, en quatre phrases environ, à quiconque lui demande directement, sans rien adoucir.",
    // B · 26156711d579
    "characters.maki.secrets.maki_the_book.fact": "Il tient un cahier d’école avec chaque fois qu’il a arrêté un combat et chaque fois qu’il ne l’a pas fait. La deuxième liste compte quatre entrées, dont une date d’il y a vingt ans.",
    // B · 47558a04be8d
    "characters.maki.secrets.maki_the_book.visibility": "NPC_PRIVATE",
    // B · 90c20086a705
    "characters.maki.secrets.maki_the_book.revealHint": "Il le montre à quelqu’un à qui il envisage de transmettre la salle, et à personne d’autre, jamais.",
    // A · bbaeffbe1bb4
    "characters.maki.speechStyle": "Court, plat et sans fioriture, avec une blague sèche qui tombe toutes les dix minutes environ, jamais pendant un moment sérieux. Corrige physiquement au lieu d’expliquer. Appelle les combattants par leur discipline, Shinji par son prénom. Dit « Je lui ai demandé un round de plus » avec exactement la même voix que quand il demande si tu as mangé.",
    // A · b10368111145
    "characters.maki.topics": ["le floor","Shinji","la responsabilité","qui monte sur le tapis","la salle","ce que tu viens chercher"],
    // A · 1148bf45c9bf
    "characters.maki.voiceSamples": ["Vous êtes d’accord tous les deux, chacun peut arrêter, je peux arrêter, et personne ne touche à personne après. C’est tout. Il n’y a pas de cinquième règle.","Je lui ai demandé un round de plus. Pas le sport. Moi. Ça fait vingt ans que j’essaie de trouver une meilleure phrase et c’est encore la bonne.","Les mains, ça va. Les pieds traînent. Tu gagnes et tu as arrêté de penser, ce qui arrive environ onze secondes avant qu’on se prenne des coups.","Pas de discours quand il saigne. Fais-le s’asseoir et après tu peux lui parler sérieusement."],
    // B · e8fcdb32af10
    "characters.maki.appearance": "Cinquante-huit ans, compact, cheveux gris très courts, nez cassé deux fois, avant-bras épais, T-shirt noir simple par tous les temps, lunettes de lecture sur un cordon qu’il utilise pour le papier et rien d’autre.",
    // B · 05f0874c2360
    "characters.maki.visualHook": "Lunettes de lecture sur un cordon autour du cou, en permanence, sur un homme qui ne lit presque jamais.",
    // B · 93ba352c5597
    "characters.maki.silhouette": "Debout au bord du tapis, les bras croisés et le poids réparti sur les deux pieds, totalement immobile.",
    // B · 219772dbb866
    "characters.maki.artSeed": "rf-maki-01",
    // B · a8d9282a4aeb
    "characters.maki.portrait": "story_red_floor/maki",
    // B · 9aa1e9a457fa
    "characters.maki.expressions": ["neutre","sec","observateur","dur","attristé"],
    // B · 1015a02c3aa2
    "characters.maki.knowledgeScope": ["maki","the_red_floor","mikado","shinji_okabe","the_rules","everybody_in_the_room"],
    // B · d1cd16237c1f
    "characters.maki.gates.maki_tells_you_about_shinji.label": "Il te raconte tout",
    // B · 55a54e80451a
    "characters.maki.gates.maki_tells_you_about_shinji.kind": "CONFIANCE",
    // B · 6b8149446d08
    "characters.maki.gates.maki_tells_you_about_shinji.requires.flagsSet": ["spoke :maki"],
    // B · b2ccf41cabdd
    "characters.maki.gates.maki_shows_you_the_book.label": "Il te montre les quatre entrées",
    // B · 55a54e80451a
    "characters.maki.gates.maki_shows_you_the_book.kind": "CONFIANCE",
    // B · 20c1d89d1a9f
    "characters.maki.combatant.tags": ["coach","boxeur"],
    // B · b25a8560434f
    "characters.mei.name": "Mei Hoshino",
    // A · 7202df05b833
    "characters.mei.role": "Trente-deux ans, médecin du sport, ancienne judoka de haut niveau, et la seule personne de cette histoire dont un non veut vraiment dire non",
    // A · 20f66b6543a2
    "characters.mei.cardBlurb": "Un genou a mis fin à sa carrière à vingt-quatre ans et elle a été très mauvaise là-dedans pendant environ trois ans. Elle adore ce sport, c’est justement pour ça qu’elle prend les dégâts au sérieux, et elle peut refuser de te déclarer apte sans que ce soit une suggestion.",
    // B · aee35f364a88
    "characters.mei.pronouns": "elle",
    // A · 725144b5aba3
    "characters.mei.publicTraits": ["Elle donne le chiffre plutôt que des mots rassurants","Elle imprime les choses au lieu de les envoyer","Elle vient au Red Floor et n’a jamais rien dénoncé"],
    // B · 308a2e56cd11
    "characters.mei.hiddenDrives": ["Elle veut toujours faire partie de ça, c’est surtout pour ça qu’elle est dans un sous-sol à deux heures du matin sans être payée","Elle a peur d’être celle qui dira oui à quelqu’un une fois, comme quelqu’un a dit oui pour son genou"],
    // B · 5410f83a0d3e
    "characters.mei.values": ["L’image plutôt que les sentiments, toujours, y compris pour elle-même","Les combattants comme des gens avec quarante prochaines années, un horizon plus long que celui de n’importe qui d’autre dans ce monde"],
    // B · 1c7d67593dc8
    "characters.mei.fears": ["Valider quelqu’un qui n’aurait pas dû être validé","Devenir une personne qui est autour du sport plutôt qu’à l’intérieur, ce qu’elle est déjà en partie et elle le sait"],
    // A · eb4dfc49f95c
    "characters.mei.socialStyle": "Chaleureuse et directe dans la même phrase. Explique une blessure comme il faut, en détails, avec des mots simples, puis ne change pas d’avis. Extrêmement drôle sur ce sport, jamais drôle face à un scanner.",
    // B · 4b8f6acd8238
    "characters.mei.boundaries": ["Ne laissera pas un coach diagnostiquer un combattant devant elle, et a déjà mis fin à une collaboration pour ça","Ne validera pas quelqu’un parce qu’un combat est important. On lui a demandé onze fois, la réponse a été la même onze fois"],
    // B · 3b775ee2b634
    "characters.mei.goals": ["Faire que Junpei regarde sa propre image, ce qu’elle n’arrive pas à faire depuis quatorze mois","Continuer à être acceptée dans la salle, parce qu’on lui dire de partir serait pire pour tout le monde que ce qu’elle voit là-dessous"],
    // B · a862d6b28db0
    "characters.mei.secrets.mei_her_knee.fact": "Elle a été validée pour combattre à vingt-quatre ans par quelqu’un qui n’aurait pas dû la valider. Elle a les images d’avant et d’après et ne les a jamais montrées à un patient.",
    // B · 47558a04be8d
    "characters.mei.secrets.mei_her_knee.visibility": "NPC_PRIVATE",
    // B · 2a47303a19b7
    "characters.mei.secrets.mei_her_knee.revealHint": "Elle finit par les montrer à une personne, celle qui vient de se disputer le plus fort avec elle sur la validation.",
    // B · f16ed002a3de
    "characters.mei.secrets.mei_junpei.fact": "Les deux derniers scanners de Junpei sont la raison pour laquelle elle a commencé à venir au Red Floor. Elle n’est pas là pour le Red Floor. Elle est là parce qu’il y est.",
    // B · 47558a04be8d
    "characters.mei.secrets.mei_junpei.visibility": "NPC_PRIVATE",
    // B · 59a8e9299c89
    "characters.mei.secrets.mei_junpei.revealHint": "Ça sort de côté quand quelqu’un lui demande pourquoi un docteur est dans un sous-sol à deux heures du matin gratuitement.",
    // A · 8ed578c47c5c
    "characters.mei.speechStyle": "Chaleureuse, directe et précise, avec la médecine expliquée en mots simples et sans atténuation à la fin. Elle donne un chiffre et un délai plutôt qu’un avis. Drôle sur la culture du sport, et complètement sans humour sur une blessure, avec un passage brutal entre les deux.",
    // A · c3952402ef76
    "characters.mei.topics": ["l’imagerie","son genou","Junpei","ce que tu portes","déclarer apte les gens","pourquoi elle vient ici"],
    // A · f4e33193fbb4
    "characters.mei.voiceSamples": ["Six semaines. Pas quatre, pas « comment ça va », six. Je sais que ça va, moi aussi à vingt-quatre ans je pensais ça.","Vous êtes tous fiers de votre tolérance à la douleur. C’est la chose la moins utile que vous avez. Supporter la douleur, c’est arriver ici plus tard avec pire.","Je ne vais pas le déclarer apte. Il peut m’en vouloir, tu peux m’en vouloir, et le combat peut aller à quelqu’un d’autre. Ça se surmonte, l’autre chose non.","Ne me faites pas le diagnostic. Tu es un coach. Un très bon coach. Arrête de parler de son orbital."],
    // B · 540f937d58fc
    "characters.mei.appearance": "Trente-deux ans, cheveux foncés attachés, vêtements pratiques sans glamour, une légère boiterie au genou gauche qui ne se voit qu’à l’escalier, et un sac en toile avec plus de choses qu’il n’y paraît.",
    // B · c0da04f3c778
    "characters.mei.visualHook": "Une légère boiterie à gauche en montant les escaliers, chez quelqu’un qui est autrement la personne la plus capable physiquement dans la salle.",
    // B · 70097e90a6d3
    "characters.mei.silhouette": "Accroupie au niveau de celui qui est assis, les deux mains sur sa mâchoire, totalement absorbée.",
    // B · 81ff215e2fec
    "characters.mei.artSeed": "rf-mei-01",
    // B · 484d57ea3597
    "characters.mei.portrait": "story_red_floor/mei",
    // B · 6e7509686cae
    "characters.mei.expressions": ["neutre","chaleureux","brut","absorbé","immobile"],
    // B · 9678778f9302
    "characters.mei.knowledgeScope": ["mei","sports_medicine","her_knee","junpei","the_red_floor","everybodys_injuries"],
    // B · 8bb645a864b9
    "characters.mei.gates.mei_tells_you_about_her_knee.label": "Elle te montre ses propres images",
    // B · 55a54e80451a
    "characters.mei.gates.mei_tells_you_about_her_knee.kind": "CONFIANCE",
    // B · 30865dc9e21c
    "characters.mei.gates.mei_tells_you_about_her_knee.requires.flagsSet": ["spoke :mei"],
    // B · 3adb45125daa
    "characters.mei.gates.mei_will_work_your_corner.label": "Elle vient dans ton coin plutôt qu’au mur",
    // B · 9e8ae18bf8bf
    "characters.mei.gates.mei_will_work_your_corner.kind": "ALLIANCE",
    // B · 3b0f6c3b3c25
    "characters.mei.combatant.tags": ["judoka"],
    // B · 58b1d0c7f105
    "characters.junpei.name": "Junpei Arata",
    // A · 2f2e998e3d47
    "characters.junpei.role": "Trente-quatre ans, ancien champion national, arrêté deux fois lors de ses cinq derniers combats, et qui redoute les lundis",
    // A · 210eb213d414
    "characters.junpei.cardBlurb": "Ses réflexes sont plus lents. Pas de beaucoup, juste assez, et tout le monde dans cette salle le voit, y compris toi, sans que personne ne le dise. Il n’a pas peur de se blesser. Il a peur d’un lundi sans camp d’entraînement, et il y a une enveloppe qu’il n’a pas ouverte depuis quatorze mois.",
    // B · fcca6b746d0b
    "characters.junpei.pronouns": "il",
    // A · 7f198e04f44e
    "characters.junpei.publicTraits": ["Le premier à la salle chaque matin","Généreux avec les plus jeunes au point de perdre du temps","N’a raté aucun footing depuis onze ans"],
    // B · e378a90651f3
    "characters.junpei.hiddenDrives": ["Il n’a pas regardé ses deux derniers scanners et a organisé quatorze mois autour de ne pas les regarder","Il veut que quelqu’un lui dise qu’il peut arrêter, il ne le croirait pas, et aurait quand même besoin de l’entendre"],
    // B · 3ccd0655e391
    "characters.junpei.values": ["Tenir plus longtemps que l’autre, ce qui a fait de lui un champion et est maintenant le problème","La salle de sport, et tous ceux plus jeunes qu’il prend au sérieux d’une façon dont personne ne l’a pris"],
    // B · a7f876474e82
    "characters.junpei.fears": ["Un lundi sans rien dedans","Être l’histoire mise en garde que les gens racontent dans ce bâtiment quand il arrêtera de venir"],
    // A · 991b4841bbe9
    "characters.junpei.socialStyle": "Ouvert, généreux et totalement à l’écoute des autres, mais incapable de répondre clairement à une question directe sur lui-même. Il change de sujet en parlant de quelqu’un d’autre en moins de deux phrases, avec tellement de chaleur qu’on ne remarque rien. ",
    // B · 18b070f1d043
    "characters.junpei.boundaries": ["Il ne veut pas que ses deux derniers combats soient discutés dans la salle de sport, par qui que ce soit, et quitte la pièce","Il ne veut pas se battre contre quelqu’un qu’il pense pouvoir blesser gravement, ce qui est maintenant une liste plus courte qu’avant"],
    // B · e20854c12515
    "characters.junpei.goals": ["Un camp de plus. C’est tout son but et il peut le tenir des heures sans le dire","Faire aller les dix-huit ans dans cette salle plus loin que lui"],
    // B · d35ecc94c87a
    "characters.junpei.secrets.junpei_the_scans.fact": "Mei a ses deux derniers scanners et il n’a regardé aucun des deux. Elle a proposé onze fois. Il change de sujet chaleureusement et avec succès à chaque fois.",
    // B · 47558a04be8d
    "characters.junpei.secrets.junpei_the_scans.visibility": "NPC_PRIVATE",
    // B · 2404c0ab2467
    "characters.junpei.secrets.junpei_the_scans.revealHint": "Il l’admet à quelqu’un qui ne lui demande pas de regarder, et qui le dit.",
    // B · dadfcfba4c7d
    "characters.junpei.secrets.junpei_the_belt.fact": "La ceinture est au fond d’une armoire dans un appartement avec presque rien d’autre, toujours dans son étui, non ouverte depuis le deuxième arrêt, et déplacée quatre fois à la même position relative.",
    // B · 47558a04be8d
    "characters.junpei.secrets.junpei_the_belt.visibility": "NPC_PRIVATE",
    // B · a3f4c51ecd42
    "characters.junpei.secrets.junpei_the_belt.revealHint": "Il mentionne l’armoire, une fois, en plaisantant sur le peu de meubles qu’il possède, puis s’arrête.",
    // A · f3e6f1073cee
    "characters.junpei.speechStyle": "Chaleureux, décontracté et constamment en train d’esquiver, il transforme en deux phrases environ toute question à son sujet en question sur la personne qui demande. Il parle des camps, du footing et du poids avec un souci du détail énorme, parce que ce sont les seuls sujets qu’il est autorisé à aborder. Il se tait plutôt que de mentir.",
    // A · 5abcfebbbebb
    "characters.junpei.topics": ["le camp","le footing","les combattants plus jeunes","ses cinq derniers combats","la ceinture","les lundis"],
    // A · fb14bfcc678c
    "characters.junpei.voiceSamples": ["Ne fais pas attention à moi. Tu pesais combien ce matin ? Et ne me dis pas ce que tu pesais hier soir, je sais ce que tu pesais hier soir.","Depuis onze ans, je rate jamais un matin. Pluie, grippe, la semaine où mon père est mort, onze ans. C’est plus de la discipline, je sais ce que c’est maintenant.","Le camp, c’est la meilleure partie. Tout le monde croit que c’est le combat. Le combat, c’est neuf minutes. Le camp, c’est huit semaines à savoir exactement à quoi tu sers quand tu te réveilles.","Elle a proposé. Onze fois, et elle a raison, et je vais continuer à ne pas vouloir y penser, et je préférerais qu’on parle de ton crochet gauche."],
    // B · 5aababa69bbe
    "characters.junpei.appearance": "Trente-quatre ans, beau et visiblement marqué, cheveux courts et foncés grisonnant devant, une cicatrice sur la pommette gauche, une carrure compacte de poids welter maintenue en condition absolue par un homme qui n’a rien d’autre dans sa semaine.",
    // B · 1e8c7aa87e0f
    "characters.junpei.visualHook": "Une cicatrice sur la pommette gauche qu’il touche quand il esquive une question.",
    // B · e5a9d90a73bf
    "characters.junpei.silhouette": "Debout derrière un sac de frappe en le tenant stable pour quelqu’un d’autre, à six heures du matin.",
    // B · 26aa31a7b117
    "characters.junpei.artSeed": "rf-junpei-01",
    // B · 8be32b47f9a4
    "characters.junpei.portrait": "story_red_floor/junpei",
    // B · 47d99ebdef62
    "characters.junpei.expressions": ["neutre","chaleureux","esquivant","fier","perdu"],
    // B · aa06a5e2503f
    "characters.junpei.knowledgeScope": ["junpei","le_camp","son_record","mikado","la_ceinture","footing"],
    // B · d3862285412c
    "characters.junpei.gates.junpei_stops_deflecting.label": "Il répond à une question sur lui-même",
    // B · 55a54e80451a
    "characters.junpei.gates.junpei_stops_deflecting.kind": "CONFIANCE",
    // B · dc19f53496e4
    "characters.junpei.gates.junpei_stops_deflecting.requires.flagsSet": ["parlé :junpei"],
    // B · 92d22c3bdab0
    "characters.junpei.gates.junpei_looks_at_it.label": "Il ouvre l’enveloppe",
    // B · 55a54e80451a
    "characters.junpei.gates.junpei_looks_at_it.kind": "CONFIANCE",
    // B · 81a048625bfd
    "characters.junpei.combatant.tags": ["boxeur","vétéran"],
    // B · 9d1d8d47cc35
    "characters.koji.name": "Koji Namba",
    // A · c2163084c713
    "characters.koji.role": "Vingt-huit ans, combattant de seconde zone, travaille à l’imprimerie de son oncle, a beaucoup perdu mais adore ça quand même",
    // A · 677c1179c82e
    "characters.koji.cardBlurb": "Il n’est pas un génie caché et il ne sera peut-être jamais champion, il l’a compris et a continué à venir pendant onze ans. C’est la personne la plus drôle du bâtiment parce qu’il aime les gens, et c’est lui qui fera des kilomètres en pleine nuit si tu l’appelles.",
    // B · fcca6b746d0b
    "characters.koji.pronouns": "il/lui",
    // A · 0a2c12dd0907
    "characters.koji.publicTraits": ["Parle à absolument tout le monde, y compris les nouveaux","Connaît tous les combats régionaux dans quatre préfectures","Est joyeusement précis sur son propre palmarès"],
    // B · cd8bd5e86318
    "characters.koji.hiddenDrives": ["Il aimerait qu’on lui dise, une fois, par quelqu’un dont l’avis compte, que ces onze années n’ont pas été une perte de temps","Il a commencé à penser à entraîner et ne l’a dit à personne parce que le dire lui semble être une concession"],
    // B · d18a7e0ba08c
    "characters.koji.values": ["S’améliorer dans ce qu’on aime, que son visage soit ou non sur une affiche","Les gens. Il est dans cette salle autant pour les gens que pour le combat et n’a jamais prétendu le contraire"],
    // B · 3de6cf685f3d
    "characters.koji.fears": ["Être la blague plutôt que la personne qui la fait","Arrêter, et découvrir que ces onze années étaient toute l’amitié"],
    // A · 6983102c7c24
    "characters.koji.socialStyle": "Immédiatement, sincèrement amical avec tous ceux qui franchissent la porte, ce qui dans cette salle est un boulot que personne ne lui a donné. Il se moque de lui-même sans chercher à se faire plaindre. Il demande comment tu vas et se rappelle de la réponse le mardi suivant.",
    // B · db3b719726d8
    "characters.koji.boundaries": ["Il ne laisse personne se faire moquer dans cette salle pour être nouveau ou mauvais, et le dit très clairement une fois","Il ne fait pas semblant d’être meilleur qu’il ne l’est pour faire plaisir à quelqu’un, y compris lui-même"],
    // B · cd67e56b3593
    "characters.koji.goals": ["Prendre un titre régional, une fois, qui est vraiment à sa portée et l’est depuis quatre ans","Comprendre si ce qu’il aime vraiment est le combat ou le bâtiment où ça se passe"],
    // B · 3b2aee24d2e7
    "characters.koji.secrets.koji_the_record.fact": "Quatorze et dix-neuf. Il dit à tout le monde qu’il a quatorze victoires et laisse supposer, et si on lui demande directement il donne les deux chiffres immédiatement et sans aucun jeu.",
    // B · d982523e87d8
    "characters.koji.secrets.koji_the_record.visibility": "FACTION",
    // B · 166878b322f1
    "characters.koji.secrets.koji_the_record.revealHint": "Demandez-lui. Il vous dira en une seconde et vous demandera les vôtres.",
    // B · 462a486d81a0
    "characters.koji.secrets.koji_the_coaching.fact": "Il entraîne officieusement deux ados depuis huit mois et n’a pas dit à Maki, parce que le dire ferait de ça une activité à part du combat.",
    // B · 47558a04be8d
    "characters.koji.secrets.koji_the_coaching.visibility": "NPC_PRIVATE",
    // B · 317dac45be88
    "characters.koji.secrets.koji_the_coaching.revealHint": "Quelqu’un le surprend en train de le faire et il est immédiatement et visiblement gêné, ce qui ne lui ressemble pas du tout.",
    // A · bf235ea475fe
    "characters.koji.speechStyle": "Gai, rapide et auto-dérisoire sans jamais chercher à se faire corriger. Enthousiaste sur les combats des autres avec un souci du détail énorme, et expéditif sur les siens. Il fait une blague, la laisse passer, puis pose la vraie question qui se cache derrière, que la moitié des gens ne saisit pas.",
    // A · fdcd25f3a9ca
    "characters.koji.topics": ["l’imprimerie","son palmarès","les combats régionaux","les ados","pourquoi il fait ça","ta semaine"],
    // A · 7533e3573147
    "characters.koji.voiceSamples": ["Quatorze et dix-neuf. Oui, dans cet ordre. Je dis quatorze avant parce que je suis un pro et que ça s’appelle du marketing.","Tu veux savoir la meilleure partie ? La meilleure partie, c’est pas de gagner. J’ai gagné quatorze fois, ça dure à peu près un jour. La meilleure partie, c’est le mardi d’après, quand tu as compris ce qui a foiré.","Personne colle ma tête sur quoi que ce soit et je m’y suis fait au moins quatre fois, c’est comme ça que tu sais que je ne l’ai pas fait.","Allez, un round, tu peux me taper, c’est bon pour le moral. Je te rends service et en plus j’ai pas encore pris un coup cette semaine, ça m’angoisse."],
    // B · c0bed467111a
    "characters.koji.appearance": "Vingt-huit ans, trapu, un visage sympathique qui a été frappé de nombreuses fois, de l’encre sous les ongles à force d’imprimer, et un équipement de salle de sport venant d’environ six salles différentes dont aucune n’est la sienne.",
    // B · 50dfce6f969c
    "characters.koji.visualHook": "De l’encre sous les ongles, en permanence, sur un homme qui s’enroule les mains quatre fois par semaine.",
    // B · 9d58ddc55335
    "characters.koji.silhouette": "Assis sur le tablier du ring, les jambes qui balancent, parlant à quelqu’un.",
    // B · fb026d062553
    "characters.koji.artSeed": "rf-koji-01",
    // B · 7ca87066646f
    "characters.koji.portrait": "story_red_floor/koji",
    // B · 697789977386
    "characters.koji.expressions": ["neutre","souriant","enthousiaste","ironique","piqué"],
    // B · 9e5c3453e576
    "characters.koji.knowledgeScope": ["koji","l_imprimerie","cartes_régionales","mikado","tout_le_monde_dans_la_salle_de_sport"],
    // B · 3bb3cb6ad3b1
    "characters.koji.gates.koji_asks_the_real_question.label": "Il pose la vraie question sous la blague",
    // B · 55a54e80451a
    "characters.koji.gates.koji_asks_the_real_question.kind": "CONFIANCE",
    // B · 88be871eaa0f
    "characters.koji.gates.koji_asks_the_real_question.requires.flagsSet": ["parlé :koji"],
    // B · 4364eb612efd
    "characters.koji.gates.koji_admits_the_coaching.label": "Il parle à quelqu’un des ados",
    // B · 55a54e80451a
    "characters.koji.gates.koji_admits_the_coaching.kind": "CONFIANCE",
    // B · 8384edcb55c3
    "characters.koji.combatant.tags": ["boxeur","compagnon"],
    // B · 55e9157440c1
    "factions.faction_commission.name": "La Commission",
    // B · 714b71456824
    "factions.faction_commission.description": "Licences, sanctions, examens médicaux et suspensions. Elle n’est pas hostile au Red Floor et elle est structurellement incapable de le tolérer, et tout le monde des deux côtés le comprend.",
    // B · 1ac28dd5b6d5
    "factions.faction_mikado.name": "Mikado",
    // B · 569a972d7c6f
    "factions.faction_mikado.description": "Une salle de sport vieillissante au-dessus d’un restaurant, un coach qui tient une salle ouverte depuis vingt-et-un ans, et une quarantaine de personnes prêtes à traverser la ville à deux heures du matin pour les autres.",
    // B · c487f27a920c
    "factions.faction_floor.name": "La Salle",
    // B · e02569971c93
    "factions.faction_floor.description": "Tous ceux qui descendent le dimanche, venant de quatre disciplines et onze salles de sport, liés par deux règles et le fait que rien n’est écrit.",
    // B · 26ff75012cbf
    "factions.faction_floor.allies": ["faction_mikado"],
    // B · be48d5e7ff47
    "factions.faction_promotion.name": "La Promotion",
    // B · 7947a28b5e4f
    "factions.faction_promotion.description": "Matchmakers, managers et ceux qui vendent quatre mille places. Ce ne sont pas des méchants, ils ont besoin de produit, et un combattant est un actif commercial avec une durée de vie comptée en combats.",
    // B · a5d48061243e
    "quests.q_step_on.title": "Monter Ou Pas",
    // B · 8c097f3ed53d
    "quests.q_step_on.summary": "Un niveau de stockage avec des tapis rouges, vingt personnes contre le mur, et deux règles qui font tout.",
    // B · 7fcc0be2ad9c
    "quests.q_step_on.kind": "PRINCIPALE",
    // B · 984c21054af7
    "quests.q_step_on.steps.the_stairs.playerCopy": "Une femme en haut des escaliers s’essuie le sang de la bouche avec un bandage.",
    // B · bcbefa5f4d1e
    "quests.q_step_on.steps.the_stairs.directorNotes": "Elle est plus amusée que menaçante et ne recrute personne. Le choix est vraiment ouvert : descendre, rentrer, demander ce que c’est, ou dire ce que tu fais. Personne ici ne force qui que ce soit à monter sur ces tapis, jamais, et Maki arrête physiquement si quelqu’un essaie.",
    // B · 01e2dbba3348
    "quests.q_step_on.steps.the_stairs.rewards.flags": ["connaît :la_salle"],
    // B · cb6e216d29b8
    "quests.q_step_on.steps.the_first_time.playerCopy": "Quelqu’un a demandé si tu voulais monter.",
    // B · 9b2ab896f0dd
    "quests.q_step_on.steps.the_first_time.directorNotes": "Le premier combat, peu importe qui est le joueur. Ce n’est pas un tournoi et rien n’est en jeu sauf la découverte. Maki explique les règles en quatre phrases. L’adversaire vient d’une discipline différente et le décalage est le contenu.",
    // B · 01e2dbba3348
    "quests.q_step_on.steps.the_first_time.enterWhen.flagsSet": ["connaît :la_salle"],
    // B · fc9db86783ce
    "quests.q_step_on.steps.the_first_time.rewards.flags": ["le_premier_dimanche_est_passé"],
    // B · fb25a98a4649
    "quests.q_step_on.involvedCharacterIds": ["aya","maki","koji"],
    // B · d39aaf2fa56e
    "quests.q_step_on.involvedLocationIds": ["salle_de_sport_mikado","le_red_floor","le_bureau"],
    // B · 304c61ca280a
    "quests.q_step_on.knownRewardCopy": "Une idée de ce à quoi sert cette salle, et de ce que tu es venu découvrir en descendant les escaliers.",
    // B · f2786b8b1f08
    "quests.q_what_you_are.title": "Découvre Ce Que Tu Es",
    // B · 4e5f172bdfff
    "quests.q_what_you_are.summary": "Huit semaines de footing, de pads, de sparring et d’erreurs, la partie que personne ne met dans un montage.",
    // B · 7fcc0be2ad9c
    "quests.q_what_you_are.kind": "PRINCIPALE",
    // B · fc9db86783ce
    "quests.q_what_you_are.discoverWhen.flagsSet": ["le_premier_dimanche_est_passé"],
    // B · 4faa2d83ea1f
    "quests.q_what_you_are.steps.put_the_work_in.playerCopy": "Huit semaines. Rien d’intéressant à part ça et c’est la seule chose qui change quoi que ce soit.",
    // B · 41679e8c2047
    "quests.q_what_you_are.steps.put_the_work_in.directorNotes": "Footing, la colline, les pads avec Maki, trois rounds avec qui veut. Écris un matin ordinaire précis plutôt qu’un montage. Le système de tendance fait vraiment son travail ici : ce que le joueur cherche devient ce pour quoi il est connu.",
    // B · 96a3e6ff1b83
    "quests.q_what_you_are.steps.put_the_work_in.rewards.flags": ["connaît :ce_que_tu_fais"],
    // B · 333e322e3d95
    "quests.q_what_you_are.steps.somebody_solves_you.playerCopy": "Quelqu’un t’a observé faire la même chose pendant huit semaines.",
    // B · 1a2914378e96
    "quests.q_what_you_are.steps.somebody_solves_you.directorNotes": "La récompense du repérage. Riku est le meilleur pour ça et le fait simplement, sans malice. La leçon n’est pas que le style du joueur est mauvais — c’est qu’un style est quelque chose que les autres peuvent lire, et la réponse est une seconde option plutôt que plus d’engagement dans la première.",
    // B · 96a3e6ff1b83
    "quests.q_what_you_are.steps.somebody_solves_you.enterWhen.flagsSet": ["sait :ce_que_tu_fais"],
    // B · 84a04969d3a4
    "quests.q_what_you_are.steps.somebody_solves_you.rewards.flags": ["la_salle_te_connaît"],
    // B · 4c3ca38b1776
    "quests.q_what_you_are.steps.somebody_solves_you.rewards.abilities": ["un_tour_de_plus"],
    // B · c575dde69785
    "quests.q_what_you_are.involvedCharacterIds": ["maki","riku","aya","koji"],
    // B · 67a2963ba635
    "quests.q_what_you_are.involvedLocationIds": ["mikado_gym","le_front_de_mer","la_colline","le_sol_rouge"],
    // B · 8778b4f0e37c
    "quests.q_what_you_are.knownRewardCopy": "Un style qui t’appartient plutôt qu’un style qu’on t’a appris, et une salle qui a un avis dessus.",
    // B · 48e21a75d4db
    "quests.q_the_doctor.title": "Ce Que Dit L’Imagerie",
    // B · 19c26d474ba4
    "quests.q_the_doctor.summary": "Un médecin qui aime ce sport, ce qui explique qu’elle refuse de te déclarer apte, et un vétéran qui n’a pas regardé ses propres résultats depuis quatorze mois.",
    // B · 7fcc0be2ad9c
    "quests.q_the_doctor.kind": "PRINCIPALE",
    // B · 84a04969d3a4
    "quests.q_the_doctor.discoverWhen.flagsSet": ["la_salle_te_connaît"],
    // B · 9e4e773c27c5
    "quests.q_the_doctor.steps.get_looked_at.playerCopy": "Elle t’observe depuis le mur depuis six semaines et elle n’essaie plus de faire ça discrètement.",
    // B · 844936fc2293
    "quests.q_the_doctor.steps.get_looked_at.directorNotes": "Elle explique clairement, longuement, avec des mots simples, puis ne bouge pas. Si l’imagerie dit quelque chose, elle le dit qu’il y ait un combat ou pas. Discuter avec elle est un coup légitime mais perdu, et elle n’est pas arrogante de gagner.",
    // B · 7b9096e4c0e0
    "quests.q_the_doctor.steps.get_looked_at.rewards.flags": ["la_question_clinique_est_réglée"],
    // B · 4732e9dd60b7
    "quests.q_the_doctor.steps.the_envelope.playerCopy": "Il y a une enveloppe que le vétéran n’a pas ouverte depuis quatorze mois.",
    // B · 76ed876a5140
    "quests.q_the_doctor.steps.the_envelope.directorNotes": "Il esquive chaleureusement et avec succès. Il n’y a pas de phrase astucieuse pour le faire ouvrir. Ce qui marche, c’est que quelqu’un ne lui demande pas, le dit, et reste là. Ce qu’il en fait ensuite, c’est son choix.",
    // B · 7b9096e4c0e0
    "quests.q_the_doctor.steps.the_envelope.enterWhen.flagsSet": ["la_question_clinique_est_réglée"],
    // B · 463c2d22f8b2
    "quests.q_the_doctor.steps.the_envelope.rewards.flags": ["le_vétéran_a_sa_réponse"],
    // B · f852d56ef8bc
    "quests.q_the_doctor.involvedCharacterIds": ["mei","junpei","maki"],
    // B · 5aecf868c2c9
    "quests.q_the_doctor.involvedLocationIds": ["clinique_mei","appartement_junpei","mikado_gym"],
    // B · 9a735d75f415
    "quests.q_the_doctor.knownRewardCopy": "Ce que tu portes vraiment, et ce que quelqu’un qui en porte plus depuis deux ans va faire de ce qu’il porte.",
    // B · 72fef3c5a998
    "quests.q_the_room_itself.title": "La Salle Elle-Même",
    // B · b4b0bf100fb9
    "quests.q_the_room_itself.summary": "Ce qui fait que ça marche, c’est que rien de ce qui se passe là-bas n’est écrit, et c’est un arrangement bien plus fragile que personne ne veut l’admettre.",
    // B · 552c0b7f83c2
    "quests.q_the_room_itself.kind": "SECONDAIRE",
    // B · fc9db86783ce
    "quests.q_the_room_itself.discoverWhen.flagsSet": ["le_premier_dimanche_est_passé"],
    // B · 568ac12172de
    "quests.q_the_room_itself.steps.somebody_talks.playerCopy": "Une vidéo circule, clairement pas prise là-bas, et tout le monde a décidé que si.",
    // B · c7c28333611f
    "quests.q_the_room_itself.steps.somebody_talks.directorNotes": "Personne n’a rien fait de mal et ça arrive quand même. Un promoteur pose une question. Une commission donne un avis officieux. Deux personnes sous contrat arrêtent de venir sans prévenir. C’est cette pression qui peut tuer la salle.",
    // B · 13a85572473a
    "quests.q_the_room_itself.steps.somebody_talks.rewards.flags": ["la_salle_a_été_testée"],
    // B · 9ef4c0d50751
    "quests.q_the_room_itself.steps.who_keeps_it.playerCopy": "Il a cinquante-huit ans, ça fait vingt-et-un ans qu’il fait ça, et il ne l’a jamais dénoncé.",
    // B · 9566704327d8
    "quests.q_the_room_itself.steps.who_keeps_it.directorNotes": "Il ne demande pas. Il laisse le cahier d’exercices ou une clé sur un banc, et attend de voir si quelqu’un remarque. Refuser est parfaitement légitime et il n’en reparlera pas.",
    // B · 13a85572473a
    "quests.q_the_room_itself.steps.who_keeps_it.enterWhen.flagsSet": ["la_salle_a_été_testée"],
    // B · 4c09379be3c8
    "quests.q_the_room_itself.steps.who_keeps_it.rewards.flags": ["la_question_du_sol_est_réglée"],
    // B · 077b79d12603
    "quests.q_the_room_itself.involvedCharacterIds": ["maki","riku","mei","aya"],
    // B · 90e59fb051a4
    "quests.q_the_room_itself.involvedLocationIds": ["le_bureau","le_sol_rouge","l’arène"],
    // B · ba37f0fb8123
    "quests.q_the_room_itself.knownRewardCopy": "Si le Sol Rouge est encore là dans un an, et qui le garde.",
    // B · cb6a21a296ac
    "quests.q_the_top.title": "Le Sommet",
    // B · cb8cbf60d81f
    "quests.q_the_top.summary": "Il y a un champion du monde à une heure de la ville qui est descendu ces escaliers une fois, il y a quatre ans, et qui n’arrive pas à arrêter d’y penser.",
    // B · 7fcc0be2ad9c
    "quests.q_the_top.kind": "PRINCIPALE",
    // B · 84a04969d3a4
    "quests.q_the_top.discoverWhen.flagsSet": ["la_salle_te_connaît"],
    // B · 902475b89281
    "quests.q_the_top.steps.get_in_front_of_him.playerCopy": "Personne n’entre dans ce camp sans y être amené.",
    // B · 34db937699ac
    "quests.q_the_top.steps.get_in_front_of_him.directorNotes": "Trois routes et elles ne sont pas équivalentes. La voie officielle est lente, légitime et publique. Les deux années d’enregistrements de Riku sont un cadeau avec une raison derrière. Être invité au camp est la plus dure et demande qu’on se porte garant, ce qui est rare.",
    // B · 8d997698e0c2
    "quests.q_the_top.steps.get_in_front_of_him.rewards.flags": ["sait :le_champion"],
    // B · bf1db7a94d2b
    "quests.q_the_top.steps.the_last_sunday.playerCopy": "Décide où ça se passe, et à quoi ça sert.",
    // B · 857a2905c46d
    "quests.q_the_top.steps.the_last_sunday.directorNotes": "Quatre mille places et une retransmission, ou vingt personnes contre un mur dans un sous-sol sans caméra. Ce sont des actes complètement différents et le monde doit faire sentir au joueur ce qu’il voulait vraiment. Perdre dans l’un ou l’autre n’est pas un échec.",
    // B · 8d997698e0c2
    "quests.q_the_top.steps.the_last_sunday.enterWhen.flagsSet": ["sait :le_champion"],
    // B · d2dc11dadeda
    "quests.q_the_top.steps.the_last_sunday.rewards.flags": ["le_sommet_est_trouvé"],
    // B · 879c8440e4d1
    "quests.q_the_top.steps.what_you_are_now.playerCopy": "Découvre ce que ce bâtiment a décidé que tu es.",
    // B · ad4215670a74
    "quests.q_the_top.steps.what_you_are_now.directorNotes": "Le lendemain matin. Personne ne fait de discours. Quelqu’un met la bouilloire en marche. Ce que le joueur est devenu se voit dans qui lui parle différemment et ce qu’on lui demande de faire la semaine suivante, pas dans ce que quelqu’un dit.",
    // B · d2dc11dadeda
    "quests.q_the_top.steps.what_you_are_now.enterWhen.flagsSet": ["le_sommet_est_trouvé"],
    // B · fc91f41df399
    "quests.q_the_top.steps.what_you_are_now.rewards.flags": ["l’histoire_a_une_forme"],
    // B · 7f552cea7ab4
    "quests.q_the_top.involvedCharacterIds": ["daigo","riku","aya","maki"],
    // B · 1a0456e5c0db
    "quests.q_the_top.involvedLocationIds": ["l’arène","camp_de_daigo","le_sol_rouge","la_pesée"],
    // B · f16db0fbe997
    "quests.q_the_top.knownRewardCopy": "Quoi qu’il y ait au sommet, et si tu le voulais vraiment.",
    // B · 248de83f4de1
    "tendencies.lead_hand.label": "Travailler derrière la main avant",
    // B · d5355c788245
    "tendencies.lead_hand.identity": "Le Jab",
    // B · 3291176eb090
    "tendencies.lead_hand.scoutedNote": "Ils s’en éloignent maintenant. Tout ce que tu as construit commence un temps plus tard.",
    // B · ec24a053533f
    "tendencies.pressure.label": "Faire reculer les gens",
    // B · 31b899a2cfea
    "tendencies.pressure.identity": "Pression",
    // B · 1ab40d721278
    "tendencies.pressure.scoutedNote": "Ils ont arrêté de reculer en ligne droite et te tournent vers les cordes.",
    // B · ac4e20e95be5
    "tendencies.counter.label": "Attendre l’erreur",
    // B · cf202fe160d2
    "tendencies.counter.identity": "Contre-attaque",
    // B · c25c2b9785fc
    "tendencies.counter.scoutedNote": "Ils ont arrêté de mener. Deux rounds sans rien, et maintenant c’est à toi de commencer quelque chose.",
    // B · 5a479be7615d
    "tendencies.level_change.label": "Changer de niveau",
    // B · a197a3130713
    "tendencies.level_change.identity": "Le Coup",
    // B · 67a38cac1caa
    "tendencies.level_change.scoutedNote": "Leurs hanches sont en arrière avant que tu bouges. L’entrée qui marchait toute l’année n’est plus là.",
    // B · 46e98bbe65a7
    "worldEvents.we_the_clip.publicCopy": "Quelqu’un poste onze secondes d’un sous-sol avec des tapis. Ce n’est pas ce sous-sol. Quatre mille personnes ont décidé que ça l’était le lendemain matin.",
    // B · 5eb377507ba7
    "worldEvents.we_the_clip.directorNotes": "Personne dans la salle n’a rien fait de mal et ça arrive quand même. C’est la pression qui tue vraiment le Sol Rouge. Montre ce qui cesse plutôt que la colère de quelqu’un.",
    // B · 5dfe1a620ec2
    "worldEvents.we_the_clip.setsFlags": ["le_clip_a_fait_le_tour"],
    // B · 20ccb2f5f41c
    "worldEvents.we_the_clip.cancelledByFlags": ["la_chaleur_est_retombée"],
    // B · 01e2dbba3348
    "worldEvents.we_the_clip.requiresFlags": ["sait :la_salle"],
    // B · 2740e4594a42
    "worldEvents.we_riku_solves_you.publicCopy": "Il n’a pas mené une seule fois en deux rounds et il s’est éloigné du troisième avant que tu le lances. Il n’est pas content et ne fait pas le malin. Il t’a juste observé pendant huit semaines.",
    // B · 4a989233775e
    "worldEvents.we_riku_solves_you.directorNotes": "La récompense du repérage, livrée simplement. Ce que le joueur cherchait est maintenant ce qui le fait toucher. La réponse est une seconde option, pas plus de conviction, et il le dira si on lui demande.",
    // B · 547f3937f9af
    "worldEvents.we_riku_solves_you.setsFlags": ["riku_t’a_résolu"],
    // B · f67547fdb82f
    "worldEvents.we_riku_solves_you.cancelledByFlags": ["a_une_seconde_option"],
    // B · 96a3e6ff1b83
    "worldEvents.we_riku_solves_you.requiresFlags": ["sait :ce_que_tu_fais"],
    // B · 37be6dc16aa9
    "worldEvents.we_junpei_takes_one.publicCopy": "Il y a une date sur le tableau blanc du bureau, écrite par une main inconnue, et Junpei a commencé à courir la colline deux fois.",
    // B · 1582dd91c5c7
    "worldEvents.we_junpei_takes_one.directorNotes": "Il a pris un combat. Mei ne l’a pas validé et personne ne lui a demandé. Personne dans la salle ne dit rien pendant quatre jours, ce qui est le plus fort dans le bâtiment.",
    // B · 156e3585b84d
    "worldEvents.we_junpei_takes_one.setsFlags": ["junpei_a_pris_un"],
    // B · b825a78136be
    "worldEvents.we_junpei_takes_one.cancelledByFlags": ["junpei_l’a_ouvert"],
    // B · fc9db86783ce
    "worldEvents.we_junpei_takes_one.requiresFlags": ["le_premier_dimanche_est_fini"],
    // B · 37cd1de5a65e
    "worldEvents.we_aya_in_the_corridor.publicCopy": "Aya est dans un couloir de l’arène, à vingt minutes, le dos contre le mur et les deux mains à plat dessus, respirant selon un rythme qu’on lui a appris.",
    // B · 75d8ccd3d5d6
    "worldEvents.we_aya_in_the_corridor.directorNotes": "La troisième fois. Elle gère ça seule en environ quatre minutes, comme elle l’a déjà fait deux fois. Ce que le joueur fait dans les trente secondes suivantes décide la suite de cette relation, et ne rien faire est une vraie option avec un vrai coût.",
    // B · 6f4d9845d296
    "worldEvents.we_aya_in_the_corridor.setsFlags": ["a_vu_aya_dans_le_couloir"],
    // B · 84a04969d3a4
    "worldEvents.we_aya_in_the_corridor.requiresFlags": ["la_salle_te_connaît"],
    // B · 0e1a38af0c7f
    "worldEvents.we_the_commission_asks.publicCopy": "Quelqu’un de haut placé est interrogé, officiellement, sur les combats non officiels à Kurohama. La réponse dure neuf secondes, est totalement évasive, et tout le monde dans le sport la comprend bien.",
    // B · ade8e8ff692e
    "worldEvents.we_the_commission_asks.directorNotes": "Ce n’est pas une descente ni une menace. Une position officielle est en train de se former. Les combattants sous contrat commencent à faire attention à être vus dans ces escaliers, ce qui est la première chose que la salle perd et la plus dure à récupérer.",
    // B · 5cface50de11
    "worldEvents.we_the_commission_asks.setsFlags": ["la_commission_a_remarqué"],
    // B · 3534f3209e58
    "worldEvents.we_the_commission_asks.cancelledByFlags": ["la_chaleur_est_retombée","a_pris_la_responsabilité"],
    // B · 5dfe1a620ec2
    "worldEvents.we_the_commission_asks.requiresFlags": ["la_vidéo_a_fait_le_tour"],
    // B · 88df0eef97fb
    "worldEvents.we_maki_leaves_the_book_out.publicCopy": "La porte du bureau est ouverte à trois heures du matin, la lumière est allumée, et un cahier d’exercices scolaire est posé sur le bureau, alors qu’il est normalement dans un tiroir qui ne s’ouvre pas.",
    // B · 21f6dd59b376
    "worldEvents.we_maki_leaves_the_book_out.directorNotes": "Il ne demande rien. Il le laisse là et attend de voir si quelqu’un le remarque, ce qui est la seule façon qu’il ait jamais connue d’offrir quoi que ce soit. Ne pas le remarquer est un résultat tout à fait légitime et il ne le mentionnera jamais.",
    // B · eeb463edfa4e
    "worldEvents.we_maki_leaves_the_book_out.setsFlags": ["le_cahier_a_été_laissé"],
    // B · 491817dc06ac
    "worldEvents.we_maki_leaves_the_book_out.cancelledByFlags": ["garde_la_salle"],
    // B · 13a85572473a
    "worldEvents.we_maki_leaves_the_book_out.requiresFlags": ["la_salle_a_été_testée"],
    // B · c321e9ee4fa3
    "worldEvents.we_daigo_comes_down.publicCopy": "La salle se tait à une heure trente un dimanche parce qu’un homme en tenue d’entraînement sans logo est dans les escaliers, il a conduit une heure pour venir ici.",
    // B · d8fb47bbddcf
    "worldEvents.we_daigo_comes_down.directorNotes": "Il est poli, bref et sans aucun théâtre. Il n’est pas là spécialement pour le joueur. Il est là parce que six ans, c’est long sans avoir à résoudre quoi que ce soit. Personne n’enregistre une seconde de ça.",
    // B · ba74da20c13e
    "worldEvents.we_daigo_comes_down.setsFlags": ["daigo_est_descendu"],
    // B · fd5e88b87d0a
    "worldEvents.we_daigo_comes_down.cancelledByFlags": ["la_salle_est_dénudée"],
    // B · 84a04969d3a4
    "worldEvents.we_daigo_comes_down.requiresFlags": ["la_salle_te_connaît"],
    // B · fbaddd22a9d5
    "worldEvents.we_koji_takes_a_regional.publicCopy": "Koji est au quatrième combat d’une soirée régionale devant environ six cents personnes, dont onze viennent de Mikado et ont fait une banderole, ce qu’il leur a demandé de ne pas faire.",
    // B · 6ee776284a35
    "worldEvents.we_koji_takes_a_regional.directorNotes": "Vraiment à portée et vraiment incertain. S’il gagne, c’est ouvert. Ce qui compte, c’est que c’est toute son histoire et que ce n’est pas un sous-plot pour quelqu’un dans cette salle, et la banderole est horrible.",
    // B · faa5544e5083
    "worldEvents.we_koji_takes_a_regional.setsFlags": ["la_nuit_de_koji"],
    // B · 84a04969d3a4
    "worldEvents.we_koji_takes_a_regional.requiresFlags": ["la_salle_te_connaît"],
    // B · e4f232354dd1
    "worldEvents.we_somebody_gets_hurt.publicCopy": "Ça s’arrête vers deux heures du matin et tout le monde dans la salle sait que ça s’est arrêté quatre secondes plus tard que ça aurait dû, y compris l’homme qui l’a arrêté.",
    // B · 0f4bc1af3c05
    "worldEvents.we_somebody_gets_hurt.directorNotes": "Personne ne meurt. Quelqu’un est gravement blessé et ce n’est pas dramatique — c’est une personne assise sur un banc à qui on demande quel jour on est, et un médecin déjà à mi-chemin sur les tapis. Maki ne dit rien pour le reste de la nuit.",
    // B · 1a4ea909b9a6
    "worldEvents.we_somebody_gets_hurt.setsFlags": ["quelqu’un_a_été_blessé","sait :ce_que_ça_coûte"],
    // B · 491817dc06ac
    "worldEvents.we_somebody_gets_hurt.cancelledByFlags": ["garde_la_salle"],
    // B · 13a85572473a
    "worldEvents.we_somebody_gets_hurt.requiresFlags": ["la_salle_a_été_testée"],
    // B · 9851294ce2f4
    "worldEvents.we_the_offer.publicCopy": "Un entremetteur qui ne t’a jamais parlé connaît ton nom, tes trois derniers combats et ton poids, et voudrait t’offrir un café pour parler d’une soirée en octobre.",
    // B · 4edb33af517e
    "worldEvents.we_the_offer.directorNotes": "Pas un méchant. Une entreprise avec un produit à vendre et une durée de vie en tête. L’offre est réelle, l’argent est réel, et tout ce qui est mauvais pour le joueur est dans les parties que personne ne dit à voix haute.",
    // B · 2e9698a88018
    "worldEvents.we_the_offer.setsFlags": ["l’offre_est_arrivée"],
    // B · a6b3746017cc
    "worldEvents.we_the_offer.cancelledByFlags": ["arrêté_exprès","a_quitté_la_carte"],
    // B · 84a04969d3a4
    "worldEvents.we_the_offer.requiresFlags": ["la_salle_te_connaît"],
    // B · d77ebfcebe44
    "promises.p_what_you_are.kind": "FINALE",
    // B · 8392c07cc97a
    "promises.p_what_you_are.label": "Ce que tu es vraiment, dans une salle où le découvrir ne coûte rien",
    // B · 901c6d314ffb
    "promises.p_what_you_are.seedHint": "Quelqu’un demande ce que tu fais, puis quelqu’un demande si tu veux monter sur le tapis.",
    // B · 89367601545c
    "promises.p_what_you_are.payoffHint": "Vingt personnes contre un mur, un homme d’une discipline différente, et personne qui n’écrit rien de tout ça.",
    // B · f8b4a6708d82
    "promises.p_one_more_round.kind": "THÈME",
    // B · cfa352de9106
    "promises.p_one_more_round.label": "Le round que quelqu’un a demandé il y a vingt ans",
    // B · 0652f53c516a
    "promises.p_one_more_round.seedHint": "Onze accroches photos sur un mur de bureau et une photo accrochée à la deuxième en partant de la gauche.",
    // B · e2ada4d83e0e
    "promises.p_one_more_round.payoffHint": "Un cahier d’exercices avec quatre entrées dans la deuxième liste, la plus ancienne datant d’il y a vingt ans.",
    // B · 445cd8deebc2
    "promises.p_aya.kind": "RELATION",
    // B · e1d3fe6e17ee
    "promises.p_aya.label": "Ce qui s’est vraiment passé avant la demi-finale",
    // B · 921d9d1c05a1
    "promises.p_aya.seedHint": "Elle dit que tout le monde est courageux un mardi, puis elle coupe court avant qu’on puisse demander ce qu’elle veut dire.",
    // B · 5a740102a327
    "promises.p_aya.payoffHint": "Un couloir à l’arène, vingt minutes avant, les deux mains à plat sur un mur, respirant selon un rythme qu’on lui a appris.",
    // B · 63a719ec7f2d
    "promises.p_riku.kind": "RIVALITÉ",
    // B · 02fa0a4b8119
    "promises.p_riku.label": "Le prospect qui revient toujours dans un sous-sol",
    // B · b1727e857a67
    "promises.p_riku.seedHint": "Il s’entraîne quelque part avec la clim et un panneau de sponsors, et il est sur le mur ici chaque dimanche.",
    // B · d354978a2f3b
    "promises.p_riku.payoffHint": "C’est le seul endroit où il a jamais été autorisé à perdre, et il a fait une cassette de deux ans pour quelqu’un qui n’est pas lui.",
    // B · 5631e4ba6537
    "promises.p_the_top.kind": "PATRON",
    // B · ee1e8cad1a2f
    "promises.p_the_top.label": "L’homme qui est descendu par ces escaliers il y a quatre ans",
    // B · 5e5a9b1b40da
    "promises.p_the_top.seedHint": "Quelqu’un dit avoir entendu qu’un champion s’est fait battre ici et personne ne peut le prouver.",
    // B · 38889b493a15
    "promises.p_the_top.payoffHint": "Il a conduit une heure, à une heure du matin, parce que six ans c’est long sans qu’on le pousse à résoudre quoi que ce soit.",
    // B · 57e4bf674b8e
    "endings.end_strongest_in_the_room.name": "Le Plus Fort De La Salle",
    // B · f8b8333fe7bc
    "endings.end_strongest_in_the_room.rarity": "RARE",
    // B · 8394e8c57507
    "endings.end_strongest_in_the_room.requires.flagsSet": ["bat_daigo","a_une_deuxieme_option"],
    // B · 45fd1c132e9d
    "endings.end_strongest_in_the_room.condition": "Les gens qui savent vraiment — quatre gymnases, une commission, vingt personnes contre un mur — ont discrètement choisi une réponse à qui est le combattant actif le plus redoutable de cette ville. Montre-le à travers comment les pièces changent quand le joueur entre plutôt que par des paroles.",
    // A · 84d18d385699
    "endings.end_strongest_in_the_room.epilogue": "Personne ne le dit à voix haute. Ce qui se passe, c’est qu’en moins d’un an, les partenaires d’entraînement se font rares, trois salles arrêtent de répondre aux appels pour trouver du travail, et des gens qui n’ont jamais vu le joueur se forgent une opinion bien arrêtée sur sa main gauche. Quelqu’un raconte avoir entendu dire que le champion s’est fait mettre à terre dans un sous-sol. Personne ne peut le prouver.",
    // B · 187eedaca9b7
    "endings.end_atlas_falls.name": "Atlas S’effondre",
    // B · f7fc172f729a
    "endings.end_atlas_falls.rarity": "UNIQUE",
    // B · a0559b0c1f26
    "endings.end_atlas_falls.requires.flagsSet": ["bat_daigo","personne_ne_peut_le_prouver"],
    // B · 5df92bc25330
    "endings.end_atlas_falls.condition": "Ils l’ont battu en bas, sans enregistrement, ce qui veut dire que ça n’est jamais arrivé. C’est la fin que toute la salle existe pour rendre possible et c’est celle qui montre le moins de preuves. Il serre la main, conduit une heure chez lui, et est champion du monde au matin.",
    // A · ab106138960b
    "endings.end_atlas_falls.epilogue": "Il revient encore quatre fois dans les deux années suivantes sans jamais expliquer pourquoi. Il ne s’ennuie plus, sa main droite est de retour, et deux commentateurs notent les progrès sans jamais en trouver la cause. Les deux seules personnes qui savent ce qui s’est passé préfèrent que ça reste ainsi.",
    // B · 39f3a0bf1c8d
    "endings.end_world_belt.name": "La Ceinture Mondiale",
    // B · f8b8333fe7bc
    "endings.end_world_belt.rarity": "RARE",
    // B · a0781275ab08
    "endings.end_world_belt.requires.flagsSet": ["a_gagne_la_ceinture"],
    // B · 43dfb4106212
    "endings.end_world_belt.condition": "La version officielle, sous les projecteurs, avec une diffusion, une commission et quatre mille personnes. Tout ce que le Red Floor n’est pas. Montre la mécanique — la pesée, la marche, les deux minutes dans le vestiaire — parce que cette mécanique est ce que ce monde a tenu à distance pendant toute l’histoire.",
    // A · 6cf030c01e29
    "endings.end_world_belt.epilogue": "La ceinture est mise dans un écrin, l’écrin disparaît quelque part, et en moins de quinze jours on annonce un combat obligatoire avec un promoteur et une date. Le gymnase au-dessus du restaurant ne change pas, ce qui est soit son meilleur atout, soit son pire défaut, selon le matin où on demande.",
    // B · 22999c579c3e
    "endings.end_red_floor.name": "Red Floor",
    // B · f8b8333fe7bc
    "endings.end_red_floor.rarity": "RARE",
    // B · 1ed3a9f840fa
    "endings.end_red_floor.requires.flagsSet": ["garde_le_floor","la_chaleur_est_tombee"],
    // B · 850f6021bb6d
    "endings.end_red_floor.condition": "La salle a survécu et le joueur fait partie des gens qui la gardent. C’est une fin sur la responsabilité plutôt que sur l’accomplissement : ils décident maintenant qui monte sur le tapis, et ils vont se tromper au moins une fois, et Maki ne leur dira pas quoi en penser parce que personne ne le lui a dit.",
    // A · cfb21a87d893
    "endings.end_red_floor.epilogue": "Le carnet d’entraînement voit passer une deuxième main. Il y a des combats tous les dimanches. Deux des personnes qui avaient arrêté de venir après la question de la commission reviennent au printemps, sans que personne ne remarque rien. Quatre ans plus tard, un nouveau descend ces escaliers, demande ce que c’est, et reçoit une réponse en quatre phrases.",
    // B · 1ac28dd5b6d5
    "endings.end_mikado.name": "Mikado",
    // B · f8b8333fe7bc
    "endings.end_mikado.rarity": "RARE",
    // B · fc91f41df399
    "endings.end_mikado.requires.flagsSet": ["l_histoire_a_une_forme"],
    // B · 379cd74ff6da
    "endings.end_mikado.condition": "L’héritage, c’est le gymnase plutôt que le combat. Les débutants, les ados, le cours de sept heures, le premier combat amateur de quelqu’un. Montre-le comme un vrai succès institutionnel plutôt qu’une consolation, parce que garder une salle ouverte vingt ans est plus dur que n’importe quel combat dedans.",
    // A · e4a3f7ee865b
    "endings.end_mikado.epilogue": "L’enseigne est remplacée, mal, par quelqu’un qui l’a fait bénévolement. En quatre ans, onze personnes passent leur premier combat amateur depuis ce bâtiment, et deux d’entre elles sont bonnes. Maki vient les mardis et jeudis, tient les cibles, corrige les coups en se tenant à côté et en déplaçant un bras de deux centimètres.",
    // B · f8dbb2439ebb
    "endings.end_aya_after_the_bell.name": "Aya Après La Cloche",
    // B · f8b8333fe7bc
    "endings.end_aya_after_the_bell.rarity": "RARE",
    // B · 6f4d9845d296
    "endings.end_aya_after_the_bell.requires.flagsSet": ["a_vu_aya_dans_le_couloir"],
    // B · 1a24ca544738
    "endings.end_aya_after_the_bell.condition": "Gagnée, et après le couloir plutôt qu’autour. Elle n’avait pas besoin d’être sauvée et elle avait besoin que quelqu’un soit là sans en faire un drame. Montre leur vraie dynamique : deux personnes sèches entre elles, toujours à l’entraînement, toujours en compétition, dont l’une gère quelque chose que l’autre connaît maintenant.",
    // A · 181610ccdb41
    "endings.end_aya_after_the_bell.epilogue": "Ça arrive encore deux fois la première année, la deuxième fois elle le dit à l’avance, ce qui est nouveau. À l’automne, elle revient en demi-finale et passe onze minutes dans le couloir avant d’en sortir et de gagner. Aucun des deux ne décrit jamais ce qu’ils sont à quelqu’un dans le gymnase, et le gymnase a compris en une quinzaine de jours.",
    // B · b08631768a86
    "endings.end_coach.name": "Coach",
    // B · f8b8333fe7bc
    "endings.end_coach.rarity": "RARE",
    // B · f6bcb83dbbe5
    "endings.end_coach.requires.flagsSet": ["a_coinse_quelqu_un","l_histoire_a_une_forme"],
    // B · ffbb0f271701
    "endings.end_coach.condition": "Le joueur est devenu central dans le développement de quelqu’un d’autre, ce qui est un travail différent et consiste surtout en des moments de soixante secondes. N’écris pas ça comme une retraite. Écris la difficulté spécifique de dire la chose utile plutôt que la chose encourageante à quelqu’un qu’on aime.",
    // A · de51ebd6e857
    "endings.end_coach.epilogue": "Les deux ados que Koji entraînait en doux commencent deviennent quatre, puis une équipe. Cette équipe contient quelqu’un qui va être extrêmement bon. Dans le coin, le joueur ne dit qu’une phrase par round, et il faut environ trois ans pour que ça devienne un réflexe.",
    // B · b3710cfc0c1f
    "endings.end_kojis_answer.name": "La Réponse de Koji",
    // B · 734e45c160cf
    "endings.end_kojis_answer.rarity": "PEU COMMUN",
    // B · e48625abbd8d
    "endings.end_kojis_answer.requires.flagsSet": ["lost_and_stayed","the_story_has_a_shape"],
    // B · ec2812636902
    "endings.end_kojis_answer.requires.flagsUnset": ["beat_daigo","won_the_belt"],
    // B · 283fb6afae45
    "endings.end_kojis_answer.condition": "Le joueur n’est jamais devenu élite et a construit une vie longue et pleine autour de l’entraînement, des combats et de ce bâtiment, parce qu’il aime le métier. Ce n’est pas un lot de consolation et il ne doit pas y avoir un mot de consolation dedans. C’est l’un des deux ou trois meilleurs résultats possibles et l’écriture doit le croire.",
    // A · 195781c68228
    "endings.end_kojis_answer.epilogue": "Quatorze et dix-neuf deviennent vingt-deux et trente-et-un sur environ neuf ans. Il y a un titre régional quelque part, et une photo du titre dans le bureau, sur le quatrième crochet. Un mardi, vers la onzième année, un nouveau demande depuis combien de temps ils font ça, et la réponse honnête prend du temps à venir.",
    // B · 584f7c0277df
    "endings.end_enough.name": "Assez",
    // B · 734e45c160cf
    "endings.end_enough.rarity": "PEU COMMUN",
    // B · 409d37e40b83
    "endings.end_enough.requires.flagsSet": ["stopped_on_purpose"],
    // B · 8720cb56309d
    "endings.end_enough.requires.flagsUnset": ["somebody_got_hurt"],
    // B · 01a573871638
    "endings.end_enough.condition": "Ils se sont arrêtés alors qu’ils étaient encore entièrement capables, parce qu’ils avaient décidé personnellement qu’il n’y avait plus rien à découvrir. Personne dans ce monde ne l’a jamais fait et tout le monde y a pensé. Ne laisse personne essayer de les en dissuader et ne rends pas ça nostalgique.",
    // A · f52c1d96a48d
    "endings.end_enough.epilogue": "Personne ne l’annonce. Ils viennent le mardi, font le cours, et ne s’inscrivent pas au combat du dimanche. Au bout d’environ six semaines, quelqu’un demande, et obtient une réponse claire. Plus tard, Maki dit une phrase à ce sujet à quelqu’un d’autre — c’est la seule fois qu’on l’a entendu sonner envieux.",
    // B · cb2bd3e3a19b
    "endings.end_one_more_round.name": "Un Round de Plus",
    // B · c9d08ae5d876
    "endings.end_one_more_round.rarity": "COMMUN",
    // B · 55beafa62c8a
    "endings.end_one_more_round.requires.flagsSet": ["somebody_got_hurt","went_through_it"],
    // B · 2c016c6944b0
    "endings.end_one_more_round.condition": "Ils ont dépassé un point marqué par quelqu’un de qualifié, et ça a coûté quelque chose qui ne revient pas. Ce n’est pas une punition pour avoir mal joué — c’est atteignable en étant courageux exactement de la manière dont ce sport récompense, ce qui est tout l’argument du monde. Personne n’est inspirant après ça.",
    // A · 673fbc19184b
    "endings.end_one_more_round.epilogue": "Le détail change mais la forme reste : un scanner, une discussion, une période de repos qui se transforme en arrêt total. Maki ne dit pas que c’est le sport qui a fait ça. Il dit de qui vient la décision, et si le joueur discute, il le laisse faire, une fois.",
    // B · 2f91eec3ebf7
    "endings.end_no_bell.name": "Pas de Cloche",
    // B · 734e45c160cf
    "endings.end_no_bell.rarity": "PEU COMMUN",
    // B · fd5e88b87d0a
    "endings.end_no_bell.requires.flagsSet": ["the_room_is_exposed"],
    // B · 1ed3a9f840fa
    "endings.end_no_bell.requires.flagsUnset": ["keeps_the_floor","the_heat_came_off"],
    // B · 29506dc224f5
    "endings.end_no_bell.condition": "La protection est partie, la pièce est devenue un spectacle, et le joueur remplit le vide. Non autorisé, sans licence et connu pour ça. Écris ce qui est perdu plutôt que ce qui est gagné : personne là-dessous ne peut se permettre de perdre davantage, ce qui veut dire que personne là-dessous ne découvre rien.",
    // A · 1a147be76429
    "endings.end_no_bell.epilogue": "Maki ferme en novembre plutôt que de laisser le lieu tourner au vinaigre, sans jamais rien expliquer à personne. Quelqu’un d’autre ouvre un endroit semblable dans les trois mois qui suivent, dans un autre bâtiment, avec un droit d’entrée. Ça fait le plein chaque semaine, ce n’est pas pareil, et tous ceux qui étaient dans l’ancienne salle savent exactement pourquoi.",
    // B · 9ba898d6d4a9
    "endings.end_walk_away.name": "Partir",
    // B · c9d08ae5d876
    "endings.end_walk_away.rarity": "COMMUN",
    // B · b0eff3470103
    "endings.end_walk_away.requires.flagsSet": ["left_the_map"],
    // B · 55b932e7b877
    "endings.end_walk_away.requires.flagsUnset": ["stopped_on_purpose","keeps_the_floor"],
    // B · 4666667e81f3
    "endings.end_walk_away.condition": "Ils sont rentrés chez eux. Pas après une défaite, pas après une blessure — ils sont montés ces escaliers et ne sont pas revenus, et le bâtiment a continué. C’est une réponse complètement cohérente à un sous-sol plein de gens qui se frappent à deux heures du matin et ça ne doit pas être racheté plus tard.",
    // A · 14b74ea3f802
    "endings.end_walk_away.epilogue": "Le gym met environ trois semaines à cesser de les attendre et environ quatre mois à cesser de les évoquer. Koji envoie un message au printemps à propos d’une carte régionale, ne reçoit pas de réponse, et en envoie un autre l’année suivante de toute façon. La salle fonctionne tous les dimanches, exactement comme avant.",
    // A · 1485e3247cc6
    "archetypes.arch_boxer.name": "Tu boxe",
    // B · cecc6e061e89
    "archetypes.arch_boxer.role": "Mains et distance",
    // A · 3272b5e8ee81
    "archetypes.arch_boxer.summary": "Des années à ça, bien faites, avec quelqu’un qui t’a appris les pieds en premier. Tu n’as jamais été maintenu avant ça et tu vas bientôt découvrir ce que ça fait.",
    // A · 79792c20097a
    "archetypes.arch_boxer.playstyle": ["Technique","À distance","Mauvais au sol"],
    // A · 9adb592ddc08
    "archetypes.arch_boxer.blurb": "Tout ce que tu sais repose sur une main avant et un angle de dix centimètres, et ça marche très bien… jusqu’à ce que quelqu’un change de niveau.",
    // A · 74d6a8075621
    "archetypes.arch_kicker.name": "Tu donnes des coups de pied",
    // B · 9150457b982c
    "archetypes.arch_kicker.role": "Jambes, genoux et corps à corps",
    // A · d2734ba980d5
    "archetypes.arch_kicker.summary": "Muay Thai ou kickboxing, avec toute une panoplie et des tibias endurcis par pas mal de coups durs. Tu coupes l’espace plutôt que de courir après les gens.",
    // A · 1103b62b618f
    "archetypes.arch_kicker.playstyle": ["Agressif","Punitif","Lent à se remettre en place"],
    // A · b58922f5753e
    "archetypes.arch_kicker.blurb": "Tu as passé des années à apprendre aux gens que reculer mal est la chose la plus coûteuse à faire, et ça a marché sur presque tous.",
    // A · 3eabd624b930
    "archetypes.arch_grappler.name": "Tu luttes au corps",
    // B · 9520c91a1165
    "archetypes.arch_grappler.role": "Changements de niveau et tapis",
    // A · 6641ecd9165f
    "archetypes.arch_grappler.summary": "Lutte, judo ou jiu-jitsu, à un niveau où le sol est ton terrain. Tout change dès que les hanches cèdent, et presque personne là-dessous n’a jamais ressenti ça.",
    // A · 9b826fd9e20f
    "archetypes.arch_grappler.playstyle": ["Proche","Implacable","Vulnérable en entrant"],
    // A · 40f1794d9f0a
    "archetypes.arch_grappler.blurb": "Chaque frappeur dans ce sous-sol a sa théorie sur ce qu’il ferait si quelqu’un l’attrapait, et aucun n’a jamais été saisi.",
    // A · 0b45aa5a0824
    "archetypes.arch_nothing.name": "Tu n’as jamais suivi d’entraînement",
    // B · 42b5f1d84d94
    "archetypes.arch_nothing.role": "Nerf et lecture des gens",
    // A · 3a2e4fe0eae9
    "archetypes.arch_nothing.summary": "Rien de formel, pas du tout. Ce que tu as, c’est que tu ne paniques pas et que tu remarques des choses, ce qui vaut bien plus que ce que tout le monde dans cette pièce va supposer.",
    // A · cbec8d054935
    "archetypes.arch_nothing.playstyle": ["Non entraîné","Imprédictible","Apprend vite"],
    // A · f10efaa07681
    "archetypes.arch_nothing.blurb": "Tout le monde là-dessous devine ce que tu fais à la façon dont tu enveloppes tes mains. Personne ne devine rien à ton sujet, et pendant environ trois semaines, c’est franchement un avantage.",
    // B · 86163eb7ee04
    "setupFields.displayName.label": "Qu’écrivent-ils sur le tableau blanc ?",
    // B · 401854456756
    "setupFields.displayName.kind": "TEXTE",
    // B · b722c932ce3f
    "setupFields.displayName.placeholder": "ex. Hana Odagiri",
    // B · 52fe6e5bdb3e
    "setupFields.pronouns.label": "Pronoms",
    // B · 401854456756
    "setupFields.pronouns.kind": "TEXTE",
    // B · 5965ecf877b1
    "setupFields.pronouns.placeholder": "ex. elle",
    // B · 92d960db00dd
    "setupFields.archetype.label": "Que fais-tu ?",
    // B · 694e20d7b2d8
    "setupFields.archetype.kind": "ARCHETYPE",
    // B · b76ba5f62332
    "setupFields.archetype.helpText": "La discipline avec laquelle tu es arrivé, qui détermine ce dans quoi tu es bon et ce que tout le monde dans cette pièce supposera à ton sujet. C’est fixé pour toute l’histoire. Ça ne décide pas de ton niveau, de ce pour quoi tu seras connu, ni même si tu monteras un jour sur ces tapis.",
    // B · 41efaeabc605
    "setupFields.worldKnowsAboutYou.label": "Qu’est-ce qui t’a fait monter ces escaliers ?",
    // B · 401854456756
    "setupFields.worldKnowsAboutYou.kind": "TEXTE",
    // B · 5cfaabd363a3
    "setupFields.worldKnowsAboutYou.helpText": "Un palmarès, un job, quelqu’un qui t’en a parlé, ou rien du tout. Une phrase simple. Quoi que tu écrives, ce gymnase fonctionnera avec.",
    // B · b7dc9a9ec787
    "setupFields.worldKnowsAboutYou.placeholder": "ex. J’ai fait onze combats amateurs, j’ai arrêté il y a quatre ans et je n’ai jamais dit pourquoi.",
    // B · 4ab11d770835
    "setupFields.what_you_came_for.label": "Qu’est-ce que tu es venu découvrir ?",
    // B · b6a31c665c0b
    "setupFields.what_you_came_for.kind": "CHOIX",
    // B · daa57128b5bc
    "setupFields.what_you_came_for.helpText": "Une raison de départ, pas un engagement. C’est la question à laquelle cette salle existe pour répondre, et tu peux changer d’avis.",
    // B · 5abed6867371
    "setupFields.what_you_came_for.options.how_good.label": "Ce que tu vaux vraiment, sans rien à perdre",
    // B · 43725b75451e
    "setupFields.what_you_came_for.options.whether_you_can.label": "Si tu peux encore le faire, tout court",
    // B · 0e2313f2d50f
    "setupFields.what_you_came_for.options.beat_someone.label": "Si tu peux battre une personne en particulier",
    // B · 7debcbc2d752
    "setupFields.what_you_came_for.options.the_craft.label": "Rien sur toi. Tu aimes juste ça",
    // B · a4bf86844f89
    "setupFields.what_you_came_for.options.no_idea.label": "Tu sais pas, c’est pour ça que t’es descendu",
    // B · 9304eaafffc0
    "setupFields.appearance.label": "Qu’est-ce que la salle voit dans l’escalier ?",
    // B · 401854456756
    "setupFields.appearance.kind": "TEXTE",
    // B · a468f2b1cbbb
    "setupFields.appearance.placeholder": "ex. Quelqu’un qui vient direct du boulot avec un sac qui n’est clairement pas un sac de sport.",
    // B · 3aa4328667d6
    "protagonist.kind": "VIDE",
    // A · 0818433a0ad1
    "opening": "La première chose que tu entends n’est pas un coup de poing. C’est un rire.\n\nLe gymnase aurait dû être fermé depuis quatre heures, et pourtant il y a de la lumière sous la porte du bureau. Puis quelque chose tombe en bas, assez fort pour soulever de la poussière sur la plateforme de la poire de vitesse.\n\nUne femme sort de l’arrière avec un bandage blanc pressé contre le coin de la bouche. Il y a du sang sur le bandage, et elle ne semble pas s’en être rendue compte.\n\nElle te regarde. Puis l’horloge au mur.\n\n« Les cours se sont finis il y a quatre heures. »\n\nUn autre bruit de chute en bas. Quelqu’un parle, et environ quinze personnes rient.\n\nElle sourit.\n\n« À moins que tu sois là pour l’autre chose. »",
    // A · 996174c2c3d1
    "openingSuggestions": ["Je hoche la tête vers le bandage qu’elle a contre la bouche. « Tu saignes, et tu as l’air contente pour une raison. C’est quoi, l’autre chose ? » Je ne descends pas ces escaliers tant qu’on ne me dit pas ce qu’il y a en bas.","Je passe devant elle vers les escaliers arrière. « Alors je suis là pour l’autre chose. » Je sais pas encore ce que c’est et je préfère le découvrir depuis l’encadrement de la porte plutôt que par elle.","« Ça dépend du prix. » Je pose mon sac où je me tiens, ce qui répond à la question de savoir si je pars. « Parce que ce qu’il se passe là-dessous, personne ne le note à l’étage, et je voudrais bien savoir pourquoi. »"],
  },
});
