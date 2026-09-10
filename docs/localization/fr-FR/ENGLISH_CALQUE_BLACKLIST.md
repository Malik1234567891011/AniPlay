# ENGLISH_CALQUE_BLACKLIST — what makes French sound translated

A living list. Add to it every time a French reviewer, a playtest or a lint
catches something. Entries marked ⚙ are enforced by `npm run fr:lint`
(`infra/scripts/fr-lint.ts`); the rest need a human.

**How to use it.** This is not a list of mistakes. Almost everything below is
*correct French*. It is a list of French that could only have been produced by
someone looking at English.

---

## 1. Tier 1 — instant, unforgivable

Any single one of these ends the illusion.

| ⚙ | Banned | Write instead | Why |
| --- | --- | --- | --- |
| ⚙ | `Oh mon Dieu` | `Oh putain` · `La vache` · `Sérieux ?` | The dubbing tell. Nothing else on this list is recognised faster |
| ⚙ | `Sacrebleu`, `Morbleu`, `Parbleu`, `Palsambleu`, `Ventrebleu` | anything | Dead French. Survives only as the **anglophone stereotype of a Frenchman** |
| ⚙ | `Nom d'une pipe`, `Saperlipopette`, `Sapristi`, `Fichtre` | anything | Same family, one register down |
| ⚙ | English Title Case (`Le Mur De Glace`) | `le mur de Glace` | Visible before the sentence is read. **The most instantly recognisable MT tell there is** |
| ⚙ | `courriel` | `e-mail` | fr-CA. A translation-memory leak, and provably not a French decision |
| ⚙ | `arrivé·e`, `arrivé.e`, `arrivéE` in prose | rewrite the sentence | Administrative register inside a story. Breaks read-aloud |
| ⚙ | `n'importe quoi` for "anything" | `ce que tu veux` | It means **nonsense / rubbish**. Dictionary-correct, semantically wrong |
| ⚙ | `du coup` in narration | delete it | French editors class it as **une faute de langue**, not a tic. Fine in dialogue |
| ⚙ | `$2.99`, `10,000`, `4:15 PM` | `2,99 €`, `10 000`, `16:15` | |
| ⚙ | `0 parties` | `0 partie` | **Zero is singular in French** |

## 2. Tier 2 — dialogue calques

| Banned | Write instead |
| --- | --- |
| `Es-tu sérieux ?` | `T'es sérieux, là ?` |
| `Que fais-tu ?` (from a young character) | `Tu fais quoi ?` |
| `Je ne peux pas te croire.` | `J'y crois pas.` |
| `Ce n'est pas ce que ça ressemble.` | `C'est pas ce que tu crois.` |
| `Nous devons parler.` | `Faut qu'on parle.` |
| `Prends soin.` | `Fais attention à toi.` |
| `Je suis bien.` (for "I'm fine") | `Ça va.` |
| `Tu es d'accord ?` (for "you okay?") | `Ça va ?` |
| `Quoi l'enfer ?` | `C'est quoi ce bordel ?` |
| `Tu me plaisantes ?` | `Tu te fous de moi ?` |
| `Laissons aller.` | `On y va.` · `Allez.` |
| `Comme tu le souhaites.` | `Comme tu veux.` |
| `Sois prudent.` | `Fais gaffe.` |
| `Je suppose.` | `Mouais.` · `Si tu veux.` |
| `Bien joué !` (as a reflex) | `Pas mal.` · `Bien vu.` — French praises less |
| `Tu as ceci.` / `Tu peux le faire !` | `T'inquiète.` · `Vas-y.` |
| `Je suis désolé de l'entendre.` | `Merde. Je savais pas.` |
| `Ce n'est pas ta faute.` | `T'y es pour rien.` |
| `Fais attention à toi là-bas.` | `Fais gaffe.` |
| `Nous allons` / `nous avons` in peer speech | `on va` / `on a` |
| `ceci` / `cela` in speech | `ça` |

## 3. Tier 3 — narration calques

| Banned | Write instead |
| --- | --- |
| `Soudain,` / `Tout à coup,` opening a beat | delete — the verb carries it |
| `Un frisson parcourut ton échine.` | something concrete and physical |
| `Son cœur battait la chamade.` | `Tu comptes. Un. Deux.` |
| `Un silence pesant s'installa.` | `Plus personne ne parle.` |
| `Les ténèbres t'enveloppent.` | `L'ampoule du couloir ne s'allume plus.` |
| `une horreur indicible` / `innommable` / `insoutenable` | name the thing |
| `Tu sens le poids de ce qui vient de se passer.` | name what changed |
| `Quelque chose change entre vous.` | idem |
| `L'air change.` | idem |
| `Rien ne sera plus jamais pareil.` | idem |
| `Il/elle laissa échapper un soupir.` | `Il souffle.` |
| `Elle lui lança un regard significatif.` | `Elle le regarde. Il comprend.` |
| `Il hocha la tête en signe d'approbation.` | `Il hoche la tête.` |
| `Ses yeux s'écarquillèrent.` | usually delete |
| `un sourire en coin` | fine once per world, not once per beat |
| `CRAC !` / `BOUM !` / `PAF !` | `un craquement` · `une détonation` · `un claquement` |
| `étrangement`, `bizarrement`, `soudainement`, `nerveusement` | delete |
| Passé simple in a real-time beat | présent de narration |

## 4. Tier 4 — the connector reflex

⚙ Flagged wherever the beat plan had a full stop.

`car` · `en effet` · `tandis que` · `alors que` · `puisque` · `de sorte que` ·
`cela dit` · `effectivement` · `manifestement` · `par ailleurs` · `néanmoins` ·
`toutefois` · `ainsi` (sentence-initial) · `dès lors`

The instinct behind them is French and literary — smooth, subordinate, connect —
and it is now criticised **in French** as a fault. Three short sentences stay
three short sentences.

## 5. Tier 5 — UI calques

| Banned | Write instead |
| --- | --- |
| `Lire plus` | `Lire la suite` |
| `Apprendre plus` | `En savoir plus` |
| `Pas intéressé` | `Ça ne m'intéresse pas` |
| `Sauver` (for save-to-library) | `Enregistrer` |
| `Venant bientôt` | `Bientôt` |
| `Meilleure valeur` | `Le meilleur rapport` |
| `Tendance maintenant` | `Tendances` |
| `En vedette` | `À la une` · `Sélection` |
| `Qualité de tour` | `Qualité de la scène` |
| `Cinématique` (for the quality tier) | `Cinéma` — `cinématique` means a **cutscene** in French games |
| `Résolution` (for the attribute) | `Volonté` |
| `Tirer` (for "draw an image") | `Dessiner` |
| `Détective` (for a police rank) | `Inspecteur` / `Inspectrice` — in France a `détective` is private |
| `Oups ! Quelque chose s'est mal passé.` | `Ça n'a pas marché. Réessaie.` |
| `Désolé, une erreur s'est produite.` | `Impossible de continuer l'histoire. Réessaie.` |
| `&` | `et` |
| `Supporter` (for "to support") | `Prendre en charge` · `Gérer` — `supporter` means **to endure** |
| `Actuellement` (for "actually") | `En fait` — `actuellement` means *currently* |
| `Éventuellement` (for "eventually") | `Finalement` — `éventuellement` means *possibly* |
| `Compléter` (for "to complete a task") | `Terminer` — `compléter` means *to add to* |
| `Réaliser` (for "to realise something") | `Se rendre compte` |
| `Assumer` (for "to assume") | `Supposer` — `assumer` means *to take responsibility for* |
| `Contrôler` (for "to check") | `Vérifier` |
| `Délivrer` (for "to deliver") | `Livrer` |
| `Opportunité` (for "opportunity" generally) | `Occasion` |
| `Digital` | `Numérique` |
| `Basé sur` | `Fondé sur` · `à partir de` |
| `En charge de` | `Responsable de` |
| `Adresser un problème` | `Traiter un problème` |
| `Initier` | `Lancer` · `Commencer` |
| `Supporter la langue française` | `Être disponible en français` |

## 6. Tier 6 — texting calques

| Banned | Write instead |
| --- | --- |
| `jk` | `jrigole` |
| `lol`, `xd`, `mdr` bare | `mdrr`, `mdrrr`, `ptdr`, or 💀 |
| `omg` | `oh putain`, `jsuis morte`, 💀 |
| `2m1`, `koi29`, `a12c4`, `bi1`, `@+`, `g` (=j'ai) | write the word |
| sincere `jtm` | `je t'aime` |
| `oklm`, `dtc`, `qqn`, `ct` | — |
| 😂 as the default laugh | 💀 |
| `!!!` | `??` |
| Systematic accent-stripping | keep accents; autocorrect does |
| Capitalised sentences with final periods, in peer chat | lowercase, no final period |

**And the reverse calque:** perfectly punctuated French in a text bubble is
*also* a tell. See [`research/texting.md`](research/texting.md).

## 7. Tier 7 — Québécismes to keep out

The target is **fr-FR metropolitan**. Quebec is out of scope; these are listed
because translation memories leak.

| Québécisme | fr-FR |
| --- | --- |
| `courriel` | `e-mail` |
| `divulgâcher` | `spoiler` / `un spoil` |
| `baladodiffusion` | `podcast` |
| `clavardage` | `chat` |
| `magasiner` | `faire les magasins` |
| `débreffage` | `débriefing` |
| `contrôleur d'agents` | `officier traitant` |
| `traversier` | `ferry` |
| `embarquer` / `débarquer` (a car) | `monter` / `descendre` |
| `virer de bord` (figuratively) | nautical only in fr-FR |
| `manquer le bateau` | `rater le coche` |
| `couler un examen` | `rater un examen` |
| `bordée de neige` | `chute de neige` |
| `char` (a car) | `voiture` |
| `présentement` | `actuellement` |
| `bienvenue` (for "you're welcome") | `de rien` · `je t'en prie` |

⚙ **QA grep:** every hit on `embarquer`, `débarquer`, `virer de bord`,
`bordée`, `couler` in fr-FR strings must be **literally nautical**.

## 8. Tier 8 — genre-specific calques

**Nautical** — full list in
[`research/nautical-pirate.md`](research/nautical-pirate.md).

| Banned | Write instead |
| --- | --- |
| `le brick` (for the ship's prison) | `les fers` · `à fond de cale` |
| `mettre les voiles` (for "set sail") | `appareiller` — the calque means *to do a runner* |
| `prendre le gouvernail` | `prendre la barre` |
| `la dunette` (for quarterdeck) | `le gaillard d'arrière` |
| `le nid-de-pie` | `la hune` |
| `marcher sur la planche` | « À la planche ! » |
| `le drapeau` (at sea) | `le pavillon` |
| `la corde` (from a sailor) | `le cordage` · `un bout` |
| `le voilier` (for sailmaker) | `le maître voilier` |
| `marronnage` (for marooning) | `abandonner sur une île déserte` |
| « Mille sabords ! » | « Mille tonnerres ! » — the first is Capitaine Haddock |

**Espionage** — full list in [`research/espionage.md`](research/espionage.md).

| Banned | Write instead |
| --- | --- |
| `de l'intel` | `du renseignement` · `une note` |
| `un actif` / `un atout` (for asset) | `une source` · `un relais` · `des moyens` |
| `le tradecraft` | `le métier` · `les savoir-faire` |
| `une maison sûre` | `une planque` |
| `le manipulateur` (for handler) | `l'officier traitant` · `l'OT` |
| `le contrôleur` (for handler) | idem — `contrôleur` is Canadian usage |
| `une notice de brûlure` (burn notice) | « il est brûlé, le service ne le reconnaît plus » |
| `les bavardages` (chatter) | « ça parle beaucoup » · `des remontées` |
| `un agent endormi` | `un agent dormant` · `mettre en sommeil` |
| `boîte morte` | `une boîte aux lettres morte` · `une BLM` |
| `une couverture soufflée` | `une couverture grillée` — French **burns**, it does not blow |
| `un site noir` in narration | `une prison secrète` |
| `le déni plausible` in dialogue | « Si ça tourne mal, on ne vous connaît pas. » |

**Sport**

| Banned | Write instead |
| --- | --- |
| `la peinture` | `la raquette` |
| `un jet libre` | `un lancer franc` |
| `une assistance` | `une passe décisive` |
| `un renversement` | `une perte de balle` |
| `un blocage` | `un contre` |
| `une pause rapide` | `une contre-attaque` |
| `temps supplémentaire` | `la prolongation` |
| `garde de point` | `le meneur` |
| `le centre` (position) | `le pivot` |
| `il a laissé tomber 30 points` | `il en a planté 30` |

**Fantasy**

| Banned | Write instead |
| --- | --- |
| Archaic inversion (`une couronne d'acier il portait`) | normal order |
| `flamberge`, `estramaçon`, `braquemart`, `pertuisane` for a plain sword | `une épée` |
| `derechef`, `jouvenceau`, `moult`, `céans` | modern French |
| `froid polaire` inside a secondary world | no Earth references |
| `loup-garou` for a large wolf | `loup géant` — **Martin publicly objected** to this one |
| `Les Elfes` as an adjective | `un artisan elfe` |

---

## 9. The meta-rule

Everything above is downstream of one thing:

> **A French sentence that could only have been written by someone who was
> looking at an English sentence is wrong, even when it is correct.**

The repair is never "find a better French word for this English word". It is
**close the English and write the beat.** David Camus's method on Lovecraft is
the whole discipline in one question: *« comment l'auteur aurait-il écrit cela
en français ? »* — and the praise it earned is the target:
***« fidèle sans artifice, précis sans excès de sophistication »***.
