# LANGUAGE_BIBLE — the master fr-FR document

Read this first. Everything else in this folder is a specialisation of it.

The instruction this document exists to enforce is not *"translate Plotbreak into
French."* It is:

> **Écris en français.** Plotbreak, as if it had been conceived, written and
> authored in French, for a French audience that already lives inside anime,
> manga, manhwa, romance and mobile games.

The bar is two twenty-year-olds in France with zero patience for machine
translation, playing for thirty minutes, and never once thinking
*« c'est traduit de l'anglais »*.

---

## PART 0 — The three rules that govern everything

These came out of five independent research passes into different genres and
arrived at the same place each time. They are ordered by how much damage they
prevent.

### RULE A — **N'ajoute rien.** Add nothing that is not there.

Every documented failure in French genre translation is an **addition**. Not a
mistranslation — an addition.

| Who | What they added | Source had |
| --- | --- | --- |
| Jacques Papy (Lovecraft) | `le Ciel` — a religious agent | no religion at all |
| Jean Sola (Martin) | `Car` — a causal connector | a full stop |
| Jean Sola (Martin) | `lui` — an emphatic pronoun | nothing |
| Jean Sola (Martin) | one `!` | a `.` |
| Jean Sola (Martin) | `farauds` | **no adjective whatsoever** |
| Jean Sola (Martin) | `diaprures et bigarrures` | `colorful as a rainbow` |

The instinct behind all six is the same and it is a *French literary* instinct:
that a translation should be a little more written than the thing it came from.
Berman has a name for it — **l'ennoblissement** — and modern French readers now
name it as a fault, out loud, in reviews.

**Make it testable.** A French beat is wrong if, against its English sibling, it
has more sentences fused, more exclamation marks, more coordinating connectors,
more adjectives, or a concept the source did not contain. See
[`QA_PLAN.md`](QA_PLAN.md) §2 for the lints that catch each of these.

The corollary is not "write less". French legitimately needs **~11 % more words
and ~26 % more output tokens** to carry the same beat. Adding *words* to say the
same thing is French working normally. Adding *content* — a metaphysics, a
causality, an emotion, an emphasis — is the failure.

### RULE B — **Le rythme est du contenu.** Rhythm is content.

Three short sentences in the source are three short sentences in the target.

```
EN   The right eye was open. The pupil burned blue. It saw.

BAD  L'œil droit, grand ouvert, voyait, lui. Car la pupille en flamboyait
     d'une flamme bleue.
     └ 3 → 2. An added Car. An added lui. A tautology (flamboyait d'une
       flamme). This is the single most-mocked line in French fantasy
       translation and every element of it is an addition.

FR   L'œil droit était ouvert. La pupille brûlait, bleue. Il voyait.
     └ 3 → 3. Nothing added. The hammer-blows survive.
```

French has native names for this prose — **le style coupé**, **la phrase
affective**, **la phrase nominale** — so nobody can claim fragments are an
anglicism. French stylistics explicitly sanctions verbless, emotion-driven,
hacked-up prose. What French must *not* do is import a whole paragraph of
English hard fragments; French carries tension on **points de suspension**
(`serre… serre…`) where English carries it on the full stop.

**The connector reflex is the enemy.** `car`, `alors que`, `tandis que`,
`en effet`, `puisque` inserted where the English had a period is the single most
common way a French beat stops sounding like Plotbreak.

### RULE C — **tu/vous is authored state, not a setting.**

There is no global answer, because there is no global relationship.

| Layer | Register | Why |
| --- | --- | --- |
| **Product / UI** | **tu**, always | [`PRODUCT_VOICE.md`](PRODUCT_VOICE.md) RULE 1 |
| **Narration to the player** | **tu**, always | it is the same second person the UI uses; a `vous` narrator over a `tu` UI audibly fights |
| **Character → player** | **authored per pair, and it moves** | this document, §4 |
| **Character → character** | **authored per pair** | idem |
| **System seam (Apple chrome, destructive confirms, legal)** | **infinitive, no person** | PRODUCT_VOICE RULE 1 |

Lauzon's *Seigneur des anneaux* is the model: Gandalf **vouvoie** Frodo
(respectful distance), Galadriel **tutoie** him — to mark *"cette compréhension
immédiate qu'elle a de lui."* He refused to flatten it, on the grounds that
flattening would be *"s'arroger des prérogatives d'auteur."*

In branching interactive fiction this is better than it is in a novel: **a
switch is a free story beat that English cannot have.** The turn where Mara
Ellison stops saying `vous` to you is a scene. Nine Weeks can spend an entire
week getting to it. See [`DIALOGUE_AND_REGISTER.md`](DIALOGUE_AND_REGISTER.md)
for the `addressMode` state model and the transition catalogue.

**What must never happen is drift** — a character on `vous` in one beat and `tu`
in the next because the model felt like it. That is not a nuance a French player
misses. It is the loudest possible signal that nobody is home.

---

## PART 1 — BAD LITERAL vs NATIVE FR-FR

The left column is what a competent translator produces. The right column is what
a French writer produces. Almost none of the left column is *wrong*. That is the
point: **correct French and native French are different products.**

### 1.1 UI and product surface

| English | ❌ BAD LITERAL | ✅ NATIVE FR-FR | Why |
| --- | --- | --- | --- |
| Save story | `Sauver l'histoire` | `Enregistrer l'histoire` | `sauver` = rescue. In a game with characters in danger this is an active ambiguity |
| Read more | `Lire plus` | `Lire la suite` | `lire plus` is not a French phrase |
| Learn more | `Apprendre plus` | `En savoir plus` | ditto |
| Not interested | `Pas intéressé` | `Ça ne m'intéresse pas` | the calque is also gendered, and a UI must not guess the player's gender |
| Coming soon | `Venant bientôt` | `Bientôt` / `Bientôt disponible` | |
| Trending now | `Tendance maintenant` | `Tendances` | French does not need the deixis |
| Best value | `Meilleure valeur` | `Le meilleur rapport` | `valeur` is moral or financial worth |
| Featured | `Présenté` / `En vedette` | `À la une` / `Sélection` | `en vedette` is showbiz |
| Get started | `Obtenir commencé` | `C'est parti` / `Commencer` | |
| Sign out | `Signer dehors` | `Se déconnecter` | |
| Turn quality | `Qualité de tour` | `Qualité de la scène` | a `tour` has no quality; the scene does |
| Draw (an image) | `Tirer` | `Dessiner` | `tirer` = pull/shoot. Also collides with the parser's `draw` = unsheathe |
| Leads (investigative) | `Pistes` ✅ | `Pistes` | correct — but never `Leaders`, `Meneurs` |
| Resolve (attribute) | `Résolution` | `Volonté` / `Sang-froid` | `résolution` is a screen setting or a New Year's promise |
| Might (attribute) | `Puissance` | `Force` | |
| Presence (attribute) | `Présence` ✅ | `Présence` / `Prestance` | fine either way; freeze one |
| Arcana | `Arcane` | `Arcanes` (m. pl.) | the French noun is plural-normal |
| Stop (generation) | `Stop` | `Arrêter` | |
| Keep this (pin) | `Garder ceci` | `Épingler` | |
| Fork this run | `Forker cette partie` | `Repartir d'ici` | `bifurquer` is the noun-side word; the button is about the player's intent |
| `Day 3 · 4:15 PM` | `Jour 3 · 4:15 PM` | `Jour 3 · 16:15` | France is on the 24-hour clock, always |
| Late night (day part) | `Tard dans la nuit` | `Fin de nuit` | the calque is a phrase; the day part is a noun |
| `0 runs` | `0 parties` | `0 partie` | **zero is singular in French.** `Intl.PluralRules('fr').select(0)` → `one` |
| Wallet & purchases | `Portefeuille & achats` | `Portefeuille et achats` | `&` is not a French word |
| Something went wrong | `Oups ! Quelque chose s'est mal passé.` | `Ça n'a pas marché. Réessaie.` | the calque plus apology theatre. See PRODUCT_VOICE RULE 4 |

### 1.2 Narration (second person, `tu`)

| ❌ BAD LITERAL | ✅ NATIVE FR-FR |
| --- | --- |
| `Soudain, la porte claqua derrière toi.` | `La porte claque derrière toi.` |
| ↑ `soudain` + `passé simple`. The suddenness is *in the verb*; French narration in an app is **présent de narration**. | |
| `Un frisson parcourut ton échine.` | `Tu as froid aux mains, d'un coup.` |
| ↑ a documented 19th-century commonplace. It is not wrong French, it is stock French that came from nowhere. | |
| `Tu ressens le poids de ce qui vient de se passer.` | `Personne ne bouge. Rook regarde le pont. Toi aussi.` |
| ↑ an empty consequence — it describes a consequence without containing one. Same rule as the English side. | |
| `La forêt était sombre et sinistre.` | `L'air sent la mousse et le bois pourri.` |
| ↑ two adjectives doing nothing. Non-visual senses, always. | |
| `Étrangement, elle ne dit rien.` | `Elle ne dit rien.` |
| ↑ `-ment` adverbs are French MT's fingerprint. Cap them. | |
| `Il ouvrit la porte, puis il entra dans la pièce, où il trouva le coffre.` | `Il ouvre. Il entre. Le coffre est là.` |
| ↑ subordination and relative clauses are the reflex. Resist. | |
| `Le bois craqua. CRAC !` | `Le plancher craque.` |
| ↑ spelled-out onomatopoeia is comic-book-coded in French. Name the sound with a precise noun: `un craquement`, `un grincement`, `un cliquetis`. | |

### 1.3 Dialogue — the dubbing tells

These are the ones a twenty-year-old spots in under a second, because they have
heard them in badly dubbed anime their whole life.

| English | ❌ BAD (dubbing French) | ✅ NATIVE FR-FR |
| --- | --- | --- |
| Oh my God | `Oh mon Dieu !` | `Oh putain.` · `La vache.` · `Sérieux ?` · `Oh la vache.` |
| Jesus / Christ | `Jésus !` | `Putain.` · `Bon sang.` |
| What the hell? | `Quoi l'enfer ?` | `C'est quoi ce bordel ?` · `Mais qu'est-ce que…` |
| Are you kidding me? | `Tu me plaisantes ?` | `Tu te fous de moi ?` · `Sérieux ?` |
| Get lost. | `Sois perdu.` | `Dégage.` · `Casse-toi.` |
| Shut up. | `Ferme-toi.` | `Ta gueule.` (harsh) · `Tais-toi.` (neutral) · `Arrête.` (affectionate) |
| Screw you. | `Vis-toi.` | `Va te faire.` |
| Damn it. | `Damne-le.` | `Merde.` · `Putain.` |
| You're pathetic. | `Tu es pathétique.` | `T'es pathétique.` |
| I'm fine. | `Je suis bien.` | `Ça va.` |
| You okay? | `Tu es d'accord ?` | `Ça va ?` |
| Whatever. | `Quoi que ce soit.` | `Ouais, bref.` · `Osef.` (marked) |
| Let's go. | `Laissons aller.` | `On y va.` · `Allez.` |
| I can't believe you. | `Je ne peux pas te croire.` | `J'y crois pas.` |
| We need to talk. | `Nous devons parler.` | `Faut qu'on parle.` |
| Trust me. | `Fais-moi confiance.` ✅ | `Fais-moi confiance.` — correct. Keep it. |
| I've got a bad feeling. | `J'ai un mauvais sentiment.` | `Je le sens pas.` |
| It's not what it looks like. | `Ce n'est pas ce que ça ressemble.` | `C'est pas ce que tu crois.` |
| Are you serious right now? | `Es-tu sérieux en ce moment ?` | `T'es sérieux, là ?` |
| Suit yourself. | `Habille-toi toi-même.` | `Comme tu veux.` |
| Take care. | `Prends soin.` | `Fais attention à toi.` |

**The structural point.** Spoken French drops `ne` (`je sais pas`, `c'est pas`,
`t'inquiète`), contracts `tu es` → `t'es`, and prefers `on` to `nous`
(`on y va`, never `nous y allons`, outside a formal character). A dialogue line
that keeps `ne`, keeps `nous`, and keeps full `tu es` **is not neutral French —
it is a character**: the formal one, the old one, the institutional one, or the
one who is furious. Use it deliberately; never by default.

### 1.4 Insults and the profanity ladder

The English swear ladder does not map. `putain` is **not** `fuck` — it is a
high-frequency discourse marker of surprise and emphasis, roughly `damn` in
force and roughly `like` in frequency. Translating `fuck` → `putain` one-for-one
makes a French character sound like they have Tourette's, and translating
`damn` → `zut` makes them sound eight years old.

| Tier | Words | Ships in a 13+ product? |
| --- | --- | --- |
| 0 — flat | `zut`, `mince`, `flûte` | Yes, and reads childish. Use for a character it suits |
| 1 — everyday | `merde`, `putain`, `bordel`, `chiant`, `dégage` | **Yes.** This is the working range |
| 2 — characterful | `con`, `conne`, `abruti`, `crétin`, `enfoiré`, `t'es grillé` | Yes, sparingly, aimed at a person |
| 3 — heavy | `enculé`, `salope`, `nique` | **No.** Out of bounds at 13+ |
| BANNED | `Sacrebleu`, `Morbleu`, `Nom d'une pipe`, `Saperlipopette`, `Sapristi` | **Never.** Dead French that survives only as the anglophone stereotype of a Frenchman. The single most damaging item available |

| English | ❌ BAD | ✅ NATIVE |
| --- | --- | --- |
| You're useless. | `Tu es inutile.` | `Tu sers à rien.` |
| Coward. | `Couard.` | `Lâche.` |
| You're a fraud. | `Tu es une fraude.` | `T'es un imposteur.` · `T'es qu'un baratineur.` |
| Idiot. | `Idiot.` | `Abruti.` · `Crétin.` · `T'es con ou quoi ?` |
| Nobody asked you. | `Personne ne t'a demandé.` | `On t'a rien demandé.` |
| You always do this. | `Tu fais toujours ceci.` | `Tu fais toujours ça.` — never `ceci`/`cela` in speech |

### 1.5 Romance

The French romance register's problem is the opposite of horror's: not
grandiloquence but **flatness from over-correctness**. French romance lives on
implication, physical specificity and what is not said.

| ❌ BAD LITERAL | ✅ NATIVE FR-FR |
| --- | --- |
| `Son cœur sauta un battement.` | `Elle oublie de respirer.` |
| `Je tombe pour toi.` | `Je crois que je suis en train de tomber amoureuse.` |
| `Elle rougit profondément.` | `Elle regarde ailleurs. Trop vite.` |
| `Il y avait une tension palpable entre eux.` | `Aucun des deux ne recule.` |
| `Tu me complètes.` | `Je suis mieux quand t'es là.` |
| `Je t'aime tellement.` | `Je t'aime.` — French does not intensify this. Adding `tellement` weakens it |
| `Veux-tu sortir avec moi ?` | `On se voit ce soir ?` |
| `Elle lui lança un regard significatif.` | `Elle le regarde. Il comprend.` |

**The tu/vous beat is the romance mechanic French has and English does not.**
Nine Weeks can run an entire arc on it: `vous` at the staff cabins in week one,
a slip into `tu` in week four that one of them notices, and a deliberate return
to `vous` after the argument in week seven, which is a *wound*. Write it in the
character state, never leave it to the model. See
[`GENRE_GUIDES.md` § Romance](GENRE_GUIDES.md).

### 1.6 Horror

Governed by **le fantastique**, not "horror": doubt, not display. French has a
native pejorative for over-the-top horror — **grand-guignolesque** — so
overwritten French horror does not merely fall flat, it lands in a named
category of ridicule.

| ❌ BAD LITERAL | ✅ NATIVE FR-FR |
| --- | --- |
| `Une horreur indicible t'envahit.` | `Tu montes te coucher vers dix heures. Tu donnes deux tours de clef.` |
| `Les ténèbres t'enveloppent.` | `L'ampoule du couloir ne s'allume plus.` |
| `Son cœur battait la chamade.` | `Tu comptes. Un. Deux.` |
| `Un silence pesant régnait dans la pièce.` | `Plus personne ne parle.` |
| `Elle serrait, serrait de toutes ses forces !` | `serre… serre…` |
| `Il eut soudain très peur.` | `Il a peur… de quoi ?` |

The Maupassant model — *Le Horla* — is directly portable: présent de narration,
first person, concrete verb chains, self-interrogation, **points de suspension as
the tension unit**, and banal precision anchoring the dread (`vers dix heures`,
`deux tours de clef`). The best single principle available comes from David
Camus on Lovecraft: *« comment Lovecraft aurait écrit cela en français »* —
**fidèle sans artifice, précis sans excès de sophistication.**

### 1.7 Fantasy

Two French controversies, two decades apart, reached the same verdict: **plain,
fluid, rhythmically faithful French wins; grandiloquent archaic French loses.**
Sola was punished for archaising *Le Trône de fer*; Lauzon was rewarded for
de-archaising *Le Seigneur des anneaux*.

| ❌ BAD LITERAL | ✅ NATIVE FR-FR |
| --- | --- |
| `Une couronne d'acier il portait.` | `Il portait une couronne d'acier.` — archaic inversion reads as pastiche, not literature |
| `Il dégaina sa flamberge.` | `Il tire son épée.` — `flamberge` imports a 16th-century German aesthetic onto a `long sword` |
| `Derechef, le jouvenceau s'en fut.` | `Le gamin repart.` |
| `Le Mur De Glace` | `le mur de Glace` — **English Title Case is the most instantly recognisable MT tell there is** |
| `Les elfes` / `un artisan Elfe` | `les Elfes` / `un artisan elfe` — peoples capitalise as nouns, lowercase as adjectives |
| `un froid polaire` (in a secondary world) | `un froid à fendre la pierre` — no Earth poles inside an invented world |
| `Lacville` | `Le Bourg-du-Lac` — hyphenated compounds are French toponymy operating normally, and the strongest single signal of natively-conceived French |

Flavour goes in **nouns and names, never in syntax**. Passé simple is permitted
**only** inside in-world artefacts — a chronicle, a legend, a grimoire — where it
reads as diegetic register rather than translator affectation.

### 1.8 Sport (Last Five)

Basketball French is a real, settled register and getting it wrong is instantly
audible to anyone who has watched a game in French.

| English | ❌ BAD | ✅ NATIVE |
| --- | --- | --- |
| the paint | `la peinture` | `la raquette` |
| free throw | `un jet libre` | `un lancer franc` |
| assist | `une assistance` | `une passe décisive` (`une passe déc'`) |
| turnover | `un renversement` | `une perte de balle` |
| block | `un blocage` | `un contre` |
| screen | `un écran` ✅ | `un écran` — correct |
| fast break | `une pause rapide` | `une contre-attaque` |
| overtime | `temps supplémentaire` | `la prolongation` |
| point guard | `garde de point` | `le meneur` |
| center | `le centre` | `le pivot` |
| he dropped 30 | `il a laissé tomber 30` | `il en a planté 30` |
| he dunked on him | `il l'a plongé` | `il lui a mis un dunk dessus` |
| coach | `entraîneur` ✅ | `le coach` in speech, `l'entraîneur` in narration |

**And a trap specific to this world.** Last Five is set at Kosei High, a
Japanese school. French must not domesticate it into the French school system:
no `UNSS`, no `seconde/première/terminale`, no `le bac`. Use `le lycée`,
`le club`, `le tournoi national`. Localising the *setting* along with the
language is the second-most-common way a translated product announces itself.

### 1.9 Response cards

The cards are first-person things the player could have typed. French
constructions run longer, which makes this the layout stress test — but the
answer is never to shorten them into menu commands.

```
❌ MENU        Interroger Mara sur la fenêtre.
❌ MENU        Demander à Mara ce qu'elle a vu.
❌ TRANSLATED  Je demande à Mara au sujet de la fenêtre.

✅ NATIVE      Je repose les jumelles et je me tourne vers Mara.
               « Tu savais qu'elle nous regardait, pas vrai ? »

✅ NATIVE      Je laisse l'objectif où il est. « Sept nuits qu'on est là.
               Tu vas me dire ce qu'on cherche vraiment, ou je le trouve
               tout seul ? »

✅ NATIVE      Je ne dis rien. Je remonte la fenêtre de deux centimètres
               et j'attends de voir si elle recommence.
```

Three attitudes, not three errands. Never announce the outcome. Never steer.
`max(320)` is an **English** budget: measured French inflation on real cards is
**1.13×**, so a 300-character English card is ~339 in French and fails zod
validation, and `generateResponses` returns `null` — the player silently gets no
cards at all. See [`UI_AUDIT.md` §2.7](UI_AUDIT.md) and
[`LOCALIZATION_ARCHITECTURE.md`](LOCALIZATION_ARCHITECTURE.md).

### 1.10 In-fiction texting

Rendered as bubbles, never as prose. All lowercase, no final period, apostrophes
dropped in clitics, one or two abbreviations per message from the green list,
lengthening for affect.

```
❌ 2009 CARICATURE
Slt cv ? kestufé 2m1 ? jtm bcp bi1 sur a+ XD

❌ ROBOT / TEACHER
Salut ! Est-ce que tu as vu ce qu'il a publié ? Je trouve ça incroyable.

✅ NATIVE (close friend, 20)
attends
tas vu ce quil a posté

jsuis morte 💀

nan mais srx
il assume meme pas
```

**The calibration rule that matters most: it is not abbreviation that is cringe,
it is density.** One or two per message is invisible; four is caricature.
Productive abbreviation is dead — a 2026 twenty-year-old writes `demain`, not
`2m1`. The replacement is lowercase, clitic contraction without apostrophes
(`chui`, `cest`, `tas`, `ya`), expressive lengthening (`mdrrrr`, `ouiii`), and
**new abbreviation happening in English rather than French** (`ngl`, `pov`,
`iykyk`). Full detail and the emoji semantics — 💀 is the default laughter
marker, 😂 is a boomer tell, 🙂 is ironic contempt, a bare 👍 is cold — are in
[`research/texting.md`](research/texting.md).

### 1.11 Errors and system copy

Governed by [`PRODUCT_VOICE.md`](PRODUCT_VOICE.md) RULE 4, not repeated here.
The one-line summary: **what happened, then what to do, no apology theatre.**
`Impossible de charger les mondes.` — not `Oups ! Quelque chose s'est mal
passé.`, which is a calque *and* reads to French users as either insincere or as
an admission the product is broken.

---

## PART 2 — The twenty tells

What would make a French anime fan say *« c'est traduit de l'anglais »*, ranked
by how fast they notice.

1. **`Oh mon Dieu`** in dialogue. Instant. This is the dubbing tell.
2. **English Title Case** — `Le Mur De Glace`, `Nouvelle Partie`. Visible before
   the sentence is read.
3. **`Sacrebleu`, `Mille sabords`, `Nom d'une pipe`.** Either dead French or
   Capitaine Haddock. In a pirate world, `mille sabords` means Tintin, not
   danger.
4. **A `vous` on one screen and `tu` on every other.** The failure French
   reviewers name by name.
5. **`courriel`** instead of `e-mail` — a fr-CA translation-memory leak,
   provably not a French decision.
6. **`arrivé·e`** in immersive prose. Midpoint dots are an administrative
   register; they do not belong inside a story.
7. **`n'importe quoi`** for "anything". Dictionary-correct, semantically wrong:
   it means *nonsense/rubbish*.
8. **Missing space before `? ! : ;`** — or a normal space that wraps and leaves
   the `?` alone on the next line.
9. **`10,000` and `$2.99`.** France writes `10 000` and `2,99 €`.
10. **`4:15 PM`.** France is 24-hour.
11. **`0 parties`.** Zero is singular in French.
12. **A straight apostrophe `'` in body text** where iOS smart punctuation gives
    everyone else `’`.
13. **`du coup` in narration.** French editors class it as an outright faute,
    not a tic.
14. **`un frisson parcourut son échine`** and the rest of the cliché list. Reads
    as stock, generic, from nowhere.
15. **Sentence fusion** — three source beats becoming one baroque one.
16. **Added `!`**, especially on a line the English ended with a period.
17. **`-ment` adverb pile-up.** French MT's fingerprint.
18. **`nous allons`, `ne… pas` complete, `Que fais-tu ?` inversion** in the
    mouth of a nineteen-year-old.
19. **Mixed naming policy** — half the proper nouns francised, half not. Sola's
    actual crime; the #1 structural complaint against *Le Trône de fer*.
20. **Anime culture explained.** France is one of the world's largest manga
    markets. A gloss on what a `senpai` is reads as an American product talking
    to Americans.

## PART 3 — The twenty proofs

What would make them believe it was **built** in French.

1. **Hyphenated French compounds** for invented places — `Le Bourg-du-Lac`,
   `Port-Réal`, `Vif-Argent`. French toponymy operating normally.
2. **A tu/vous transition that is a scene.** Nothing translated does this.
3. **Guillemets with the correct inner spacing**, or the speaker-labelled block
   with no quotation marks at all — one convention, held everywhere.
4. **`1er janvier`, not `1 janvier`.** No formatter on earth does this for you;
   it can only be a decision somebody made.
5. **`2,99 €`** with the symbol trailing and a non-breaking space.
6. **Points de suspension used as a tension unit**, not as trailing-off.
7. **Jargon used flatly, unglossed.** `la BLM`, `l'OT`, `sous légende`,
   `le cloisonnement`. A former DGSE analyst's praise for *Le Bureau des
   Légendes* was exactly this; his one complaint was **invented** slang.
   French audiences forgive obscure jargon and notice fake slang instantly.
8. **`le second`, `la barre`, `le gaillard d'arrière`, `les fers`** — not
   `le lieutenant`, `le gouvernail`, `la dunette`, `le brick`.
9. **`flibustiers`** for a Golden-Age crew — Varlet's own word.
10. **A character who says `corde` on a ship and gets corrected.**
11. **Lowercase months** — `10 septembre`, never `10 Septembre`.
12. **A per-character texting fingerprint** — bubble count, emoji set,
    capitalisation — held consistently. French readers in this band read the
    fingerprint before the words.
13. **`en vrai` as a discourse opener**, at the frequency a real twenty-year-old
    uses it.
14. **💀 as a complete turn.**
15. **Register split by character type** — `flic` vs `policier`, `indic` vs
    `source`, `planque` vs `dispositif`, `opé` vs `opération`. A DGSE officer
    and a BAC cop must not sound alike.
16. **`le pavillon`, never `le drapeau`, at sea.**
17. **`Impossible de charger les mondes.`** — the French error shape French
    users have read for twenty years.
18. **Sentence-count parity with a beat's own rhythm**, so the prose moves like
    prose and not like a paragraph being unpacked.
19. **French jokes that are not the English joke.** Preserve function, character
    intent and comedic rhythm; never preserve a joke because it survived.
20. **An invented noun whose gender never wobbles**, across every branch, every
    article, every adjective and every past participle.

---

## PART 4 — The instruction to give the French writer

This is the paragraph that goes into the French system prompt, and it is not a
translation of the English one. See
[`LOCALIZATION_ARCHITECTURE.md` §4](LOCALIZATION_ARCHITECTURE.md).

```
Tu écris en français de France, pour des joueurs français de 16 à 25 ans.

Tu n'es pas en train de traduire. Il n'existe aucune version anglaise de cette
scène. Écris-la comme un auteur français l'aurait écrite.

N'ajoute rien. Pas d'adjectif de plus, pas de point d'exclamation de plus, pas
de « car », pas de « en effet », pas de « tandis que » là où il y a un point.
Trois phrases courtes restent trois phrases courtes.

Présent de narration. Le joueur est « tu ». Les personnages se vouvoient ou se
tutoient selon ce qui est indiqué pour chacun — ne change jamais de toi-même.

Français parlé dans les dialogues : « je sais pas », « c'est pas », « on y va ».
Français écrit dans la narration, mais court, concret, sans effet.

Pas de « Oh mon Dieu ». Pas de « Sacrebleu ». Pas de majuscules à l'anglaise.
Pas d'onomatopée écrite : nomme le bruit.

Le français doit valoir la peine d'être lu. Il ne doit pas être concis.
```

That last line is deliberate and it is a budget decision, not a style one:
French needs ~11 % more words and ~26 % more output tokens to carry the same
beat, and the instruction `sois concis` is the fastest way to get thin French.

---

## Where to go next

| Question | Document |
| --- | --- |
| tu/vous for the product, buttons, errors | [`PRODUCT_VOICE.md`](PRODUCT_VOICE.md) |
| How French narration should actually move | [`NARRATIVE_STYLE.md`](NARRATIVE_STYLE.md) |
| `addressMode`, slang policy, per-character voice | [`DIALOGUE_AND_REGISTER.md`](DIALOGUE_AND_REGISTER.md) |
| `Tu es arrivé` vs `Tu es arrivée`, and the parser | [`PLAYER_GRAMMAR.md`](PLAYER_GRAMMAR.md) |
| Twelve genre voices | [`GENRE_GUIDES.md`](GENRE_GUIDES.md) |
| Every fixed term, and every invented noun's gender | [`TERMINOLOGY.md`](TERMINOLOGY.md) |
| The living list of calques | [`ENGLISH_CALQUE_BLACKLIST.md`](ENGLISH_CALQUE_BLACKLIST.md) |
| Spaces, guillemets, apostrophes, what iOS can render | [`TYPOGRAPHY.md`](TYPOGRAPHY.md) |
| Where locale lives, and how French reaches the model | [`LOCALIZATION_ARCHITECTURE.md`](LOCALIZATION_ARCHITECTURE.md) |
