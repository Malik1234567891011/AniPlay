# NARRATIVE_STYLE — French narration that reads as prose

The layer this governs: **the beat.** Everything the writer stage produces —
narration blocks, dialogue blocks, the words the player is actually reading.

Not this layer: buttons, errors, onboarding, settings. That is
[`PRODUCT_VOICE.md`](PRODUCT_VOICE.md), and the failure mode is bleeding one
into the other. A first-run screen that reads like the opening of a novel is an
obstacle between the player and the story they came for; a beat that reads like
a settings screen is not a story.

---

## 1. Person and tense — decided, not defaulted

### Person: `tu`

Narration addresses the player as **tu**. Always. Same pronoun as the product
voice, deliberately, because in French the narrative "you" and the UI "you" are
the *same word* and a `vous` narrator over a `tu` interface audibly fights.

This is a separate question from what characters call the player. A character
may `vouvoyer` the player for nine turns; the narrator never does.

```
✅ Tu poses les jumelles. La fenêtre d'en face est toujours allumée.
❌ Vous posez les jumelles. …          ← narrator switched register
❌ Robin pose les jumelles. …          ← the player typed "je pose les jumelles"
                                         and got answered in the third person
```

The third-person failure already has an English scar (`"I hit her"` coming back
as `"Robin lunges toward Mira Senn"`). French makes it worse, because French
narration in the third person also has to pick a gender for the player on every
past participle. Second person is the only sane surface. See
[`PLAYER_GRAMMAR.md`](PLAYER_GRAMMAR.md).

### Tense: **présent de narration**

The documented French tool for immersion — *« donne l'impression que l'action se
déroule sous les yeux du lecteur »* — and it sidesteps the `passé simple` trap
entirely.

| Tense | Where it belongs |
| --- | --- |
| **Présent** | **The beat. The default. Everything the player is living through.** |
| Passé composé | A character recounting something that already happened, in speech |
| Imparfait | Background, habit, the state a scene starts in — sparingly |
| **Passé simple** | **In-world artefacts only** — a chronicle, a legend, a grimoire, an inscription, a letter from three centuries ago. There it is diegetic register. Anywhere else it is translator affectation |
| Futur simple | A promise or a threat in dialogue. Not narration |

`Le passé simple` in real-time narration is the fastest way to make a mobile
interactive story read like a school anthology. It produces *« un récit plus
classique et distancié »* — the exact opposite of what this product sells.

---

## 2. The shape of a French beat

The English rules hold and are not restated: short paragraphs, hard sentence
variation, name the cost, nobody says the player's name three times. See
[`../authoring-principles.md`](../../authoring-principles.md).

What changes in French:

### 2.1 Budget

Beat budgets are 140/260/360/430 **words** as the middle of a range. French
carries the same content in **1.11× the words** and **1.26× the output tokens**.

**Do not cut the French to fit the English number.** Raise the number. A French
beat written to an English word budget is a French beat with a room, a reaction
or a piece of dialogue missing from it, and the thing that gets dropped is
always the last one — leaving the player somewhere to go.

The instruction to the French writer is **`le français doit valoir la peine
d'être lu`**, never `le français doit être concis`.

### 2.2 Paragraphs

Same rule, more important: four hundred French words in three paragraphs is a
worse wall than four hundred English ones, because French sentences are longer
before you do anything. Break on a change of subject, a change of speaker, a
beat of movement.

### 2.3 Sentence variation — with the French names for it

French stylistics has its own vocabulary for exactly what this product wants, so
nobody can argue that fragments are an anglicism:

- **le style coupé** — short independent propositions, *« un rythme rapide et
  vif »*.
- **la phrase affective** — *« désorganisée par l'émotion. Rapide, hachée. »*
- **la phrase nominale** — verbless. `Personne sur le quai. Rien.`

And one rule worth adopting wholesale: ***« ce qu'il y a de plus important à
dire doit être placé en dernier »***. Payload last. For a reveal or a scare,
that is the entire technique.

```
❌ Il claqua la porte derrière lui, terrifié par ce qu'il venait de voir dans
   la pièce, et se mit à courir.

✅ Il ferme la porte. Il tient la poignée une seconde de trop.
   Puis il court.
```

### 2.4 The connector ban

The traditional French translator's instinct is to smooth, subordinate and
connect. It is now criticised in French as a fault, and it is the single most
reliable way to destroy a beat's rhythm.

**Flag every one of these that lands where the beat wanted a full stop:**

`car` · `en effet` · `tandis que` · `alors que` · `puisque` · `de sorte que` ·
`cela dit` · `du coup` · `effectivement` · `manifestement`

`du coup` is worth its own line: French editors classify it as **une faute de
langue**, not merely a tic. It is an automatic QA fail in narration. In
*dialogue*, from a character it suits, it is fine and current — that distinction
is the whole point of [`DIALOGUE_AND_REGISTER.md`](DIALOGUE_AND_REGISTER.md).

### 2.5 Adverbs and adjectives

`-ment` adverbs are French machine translation's fingerprint. `étrangement`,
`bizarrement`, `soudainement`, `lentement`, `nerveusement`. Cap them: **at most
one per beat**, and prefer none.

`soudain` / `tout à coup` as a beat-opener is banned outright. The suddenness is
in the verb. `La porte claque.` is sudden. `Soudain, la porte claque.` is a
narrator telling you it was sudden.

Adjective stacking is the other one. French prefers **noun + prepositional
phrase** where English piles modifiers: `une odeur de bois mouillé`, not
`une odeur boisée humide`.

### 2.6 Sound

**Do not spell the sound.** French acknowledges that *« la verbalisation est plus
problématique que dans d'autres langues »*, and its inventory (`Crac`, `Paf`,
`Boum`) is comic-book-coded. Name it with a precise noun:

`un craquement` · `un grincement` · `un raclement` · `un froissement` ·
`un chuintement` · `un claquement` · `un cliquetis` · `un souffle` ·
`un déclic` · `un bruit de chaîne`

`Le plancher craque.` beats `CRAC !` every time.

### 2.7 Senses

`La forêt était sombre` is the failure. Non-visual senses are where French
atmosphere actually lives: `l'air sent la mousse et le bois pourri`,
`le sol colle sous les semelles`, `la rampe est froide plus bas qu'elle ne
devrait l'être`.

### 2.8 Empty consequences, in French

The English side detects and strips *"something shifts between you"*, *"the air
changes"*, *"you feel the weight of it"*. The French set is its own list and a
translated blocklist will not catch it:

```
quelque chose change entre vous
l'air change
tu sens le poids de ce qui vient de se passer
quelque chose s'est brisé
un froid s'installe
rien ne sera plus jamais pareil
tu sens que quelque chose t'échappe
l'atmosphère devient pesante
tu comprends que tout a basculé
```

Each describes a consequence without containing one. The player cannot act on
them or even say what happened. The repair is always the same: **name the thing
that changed.** `Rook ne te regarde plus quand tu parles.`

---

## 3. Punctuation convention for prose — the decision

Full typographic detail is in [`TYPOGRAPHY.md`](TYPOGRAPHY.md). The narrative
decisions are here.

### 3.1 Speaker-labelled dialogue: **no quotation marks**

The wire format is already `Speaker: text`, with quotes stripped by
`fast-writer.ts` and drawn by the client
(`packages/ui/src/components.tsx:316` — hardcoded `` `“${text}”` ``).

**Recommendation: for a labelled dialogue block, the French renders with no
quotation marks at all.** The UI already names the speaker and draws the block;
guillemets on top of that are redundant furniture, and French typography has no
tradition of quoting a line that is already attributed by a dramatis-personae
label. This makes `components.tsx:316` a **deletion** for French rather than a
translation, which is also the cheapest possible change.

```
MARA        Tu savais qu'elle nous regardait, pas vrai ?
```

not

```
MARA        « Tu savais qu'elle nous regardait, pas vrai ? »
MARA        “Tu savais qu'elle nous regardait, pas vrai ?”     ← today's output
```

If the design insists on marks, the fallback is `« … »` with U+00A0 inside —
**never** `“ ”` and never `"`.

### 3.2 Dialogue inside a narration block: `« … »`

When a line of speech appears inside prose rather than as its own attributed
block, French uses guillemets, level 1, with a non-breaking space inside each:

```
Tu reposes les jumelles. « Sept nuits », dit Mara, sans se retourner.
```

Nested speech inside that takes `“ ”` — the only place English-style curly
quotes are legitimate in French.

### 3.3 The dash

**Incises are spaced in French and closed up in English.** A straight port of an
English em dash reads wrong.

```
EN   the wards — every one of them — turned red
FR   les scellés — tous, un par un — sont devenus rouges
     └ U+0020 U+2014 U+00A0 … U+00A0 U+2014 U+0020
```

Ranges use the demi-cadratin `–` (`1914–1918`), never the cadratin.

### 3.4 Points de suspension — U+2026, and they are load-bearing

`…` is not a stylistic tic in French fiction; it is **the workhorse tension
punctuation of French interactive prose**, where English reaches for the hard
fragment. Maupassant's `serre… serre…` is the model. Interruption, hesitation,
a sentence that stops because the character stopped.

Use the single character U+2026, never three periods: it has line-break class
*Inseparable*, so it cannot be split across a line, and three ASCII periods can.

No space before, one space after — except before `,` `?` `!` or a closing
guillemet, where the space is dropped. `etc…` is an error; `etc.` and `…` never
combine.

### 3.5 The one about exclamation marks

**Adding an exclamation mark the source did not have is a documented
translation failure**, not a stylistic choice — one added `!` in *Le Trône de
fer* turned a coldly measured character into an unnervingly cheerful one.

In French prose, `!` is also more marked than in English. Narration should
almost never carry one. Dialogue may. `!!!` reads as older-generation or
kikoolol; `??` is current, `!!!` is not.

---

## 4. What the French narrator sounds like — worked examples

Same beat, three registers. The middle column is what a competent translator
produces from the English. The right column is what a French author writes.

**A door, in a horror world.**

| | |
| --- | --- |
| ❌ | `Soudain, un frisson parcourut ton échine. Les ténèbres du couloir semblaient s'épaissir autour de toi, et un silence pesant s'installa, car quelque chose avait changé.` |
| ✅ | `L'ampoule du couloir ne s'allume plus. Tu comptes les portes en avançant. À la quatrième, tu t'arrêtes. La cinquième n'était pas là hier.` |

Six additions in the first: `soudain`, a stock collocation, `semblaient`, an
abstract noun for the dark, a `car`, and a consequence with nothing in it.

**A refusal, in a spy world.**

| | |
| --- | --- |
| ❌ | `Mara te regarda avec intensité, puis elle secoua lentement la tête, manifestement contrariée par ta demande.` |
| ✅ | `Mara ne lève pas les yeux. « Vous n'avez pas le besoin d'en connaître. »` |

The bad one has two `-ment`-shaped hedges, an authored emotion (`contrariée`)
the resolution did not contain, and no jargon. The good one is shorter, colder,
and does its characterisation with a doctrinal phrase used flatly and unglossed.

**A basket, in a sports world.**

| | |
| --- | --- |
| ❌ | `Tu te diriges vers le panier et tu marques un point spectaculaire tandis que la foule explose de joie.` |
| ✅ | `Tu pars en un-contre-un. Jun te suit d'un demi-pas. Tu montes. Le ballon touche la planche et rentre.` |

The bad one announces the outcome as spectacular, invents a crowd, and fuses
with `tandis que`. The good one is four sentences of physical fact and the
player can say exactly what happened.

---

## 5. The checklist a French beat has to pass

Machine-checkable items are marked ⚙ and are implemented in
[`QA_PLAN.md`](QA_PLAN.md) §2.

- ⚙ Présent de narration, except inside an in-world artefact.
- ⚙ Narration addresses the player as `tu`, never `vous`, never by name.
- ⚙ No `soudain` / `tout à coup` opening a beat.
- ⚙ At most one `-ment` adverb.
- ⚙ No `car` / `en effet` / `tandis que` / `du coup` in narration.
- ⚙ No exclamation mark in narration.
- ⚙ No item from the cliché blocklist.
- ⚙ No item from the empty-consequence list.
- ⚙ No spelled onomatopoeia.
- ⚙ No English Title Case in an invented proper noun.
- ⚙ Sentence-count parity with the beat plan's own rhythm.
- Read it aloud. Every French source on cliché detection names this as the test,
  and it is the only one on this list a machine cannot do.
