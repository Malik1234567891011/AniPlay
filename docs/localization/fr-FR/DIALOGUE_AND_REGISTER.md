# DIALOGUE_AND_REGISTER — spoken French, and who says `tu`

The layer this governs: **what comes out of a character's mouth.** Narration is
[`NARRATIVE_STYLE.md`](NARRATIVE_STYLE.md); buttons are
[`PRODUCT_VOICE.md`](PRODUCT_VOICE.md).

The single most useful fact in this document: **French dialogue and French
narration are not the same language.** A line that is correct in a beat is wrong
in a mouth, and the gap is much wider than it is in English. Ignoring it is how
every character ends up sounding like a subtitle.

---

## 1. Spoken French is a different grammar

| Feature | Written / narration | Spoken / dialogue | Note |
| --- | --- | --- | --- |
| Negation | `je ne sais pas` | **`je sais pas`** | Dropping `ne` is the **default**, not an error. Keeping it marks a character |
| `tu es` | `tu es` | **`t'es`** | |
| `tu as` | `tu as` | **`t'as`** | |
| 1st person plural | `nous allons` | **`on y va`** | `nous` as a subject is formal, institutional, or a speech |
| Questions | `Que fais-tu ?` | **`Tu fais quoi ?`** · `Qu'est-ce que tu fais ?` | **Inversion in a young character's mouth is a textbook, not a person** |
| `il y a` | `il y a` | **`y a`** | |
| `ceci` / `cela` | rare even in writing | **`ça`** | `ceci`/`cela` in speech is an instant tell |
| `il faut que` | `il faut que` | **`faut qu'on`** | |
| Fillers | none | `en vrai`, `genre`, `bref`, `du coup`, `enfin`, `quoi` (final) | Dose them. What sounds natural spoken *« pique les yeux à l'écrit »* |

`du coup` is banned in narration and **fine in dialogue** — that split is the
clearest illustration of why this document exists.

### The reverse is a characterisation device

A character who keeps `ne`, says `nous`, uses inversion and never contracts is
not neutral. They are **the formal one, the old one, the institutional one, or
someone who is furious.** Director Elias Halden speaks like that. A
nineteen-year-old does not, unless they are performing, terrified, or in front
of a teacher.

---

## 2. `addressMode` — tu/vous as authored state

### 2.1 Why it cannot be a setting

English localisation files have no slot for this, which is exactly why French
built from an English source always feels flat. Lauzon's *Seigneur des anneaux*
is the model text: Gandalf **vouvoie** Frodo, Galadriel **tutoie** him — to mark
*« cette compréhension immédiate qu'elle a de lui »*. He refused to flatten
Hobbit speech to universal `tu` because that would be *« s'arroger des
prérogatives d'auteur »*.

In branching interactive fiction this is strictly better than in a novel: **the
switch is a free story beat that the English version cannot have.**

### 2.2 The proposed state

Per **ordered pair**, not per character — Mara may `vouvoyer` you while you
`tutoies` her, and that asymmetry is itself characterisation.

```ts
/** fr-FR only. Absent in locales that do not have T/V. */
type AddressMode = 'TU' | 'VOUS';

interface AddressState {
  /** How this character addresses the player. */
  readonly toPlayer: AddressMode;
  /** How the player is written as addressing them, in generated responses. */
  readonly fromPlayer: AddressMode;
  /** Pairs between NPCs, keyed by the other character's id. */
  readonly toCharacter: Readonly<Record<string, AddressMode>>;
  /**
   * Set when a transition has been *earned* but not yet played. The next beat
   * in which this character speaks to the player plays the switch, once, and
   * clears it. A transition is a scene, not a silent flag change.
   */
  readonly pendingShift: { to: AddressMode; because: string } | null;
}
```

Authored on `CharacterDef` as the starting value; carried in `GameState` as it
moves; projected into `speaker-brief.ts` so **both** model stages see it and
cannot drift apart. See
[`LOCALIZATION_ARCHITECTURE.md` §6](LOCALIZATION_ARCHITECTURE.md).

### 2.3 Which way a character starts

| Character type | Starts | Because |
| --- | --- | --- |
| Peer, same school/team/crew, under ~25 | **TU** | Instant and unremarkable among French young people. Kai Sumire, Jun Hasabe, Bec Tarrow, Nia Bell |
| A peer who dislikes you | **TU** | Hostility does not restore formality. `Tu` plus contempt is more aggressive than `vous` |
| Teacher, coach, officer, employer | **VOUS to the player, TU to nobody** | Ena Torakawa, Drillmaster Odalys Verne, Warden Ysolde Farrow |
| …addressing a student/recruit | **often TU** | Asymmetric, and the asymmetry is the power. A drillmaster who *vouvoie* a recruit is being sarcastic or is about to say something serious |
| A superior officer in a service | **VOUS both ways** | Professional distance is doctrine in French intelligence. Director Elias Halden, Commander Sabel Ansett |
| **`officier traitant` → `source`** | **VOUS, and it stays** | Handlers and sources stay on `vous` for years. **A handler switching to `tu` is a manipulation move.** A source switching to `tu` is intimacy or a threat |
| A romantic lead, before | **VOUS or TU by world** | Nine Weeks is a summer job: `tu` from day one. Window Seven is a professional pairing: `vous`, and the switch is the arc |
| A stranger, adult | **VOUS** | |
| A child, an animal, a god, the dead | **TU** | French tutoies all four |
| Someone in danger, mid-emergency | **TU** | Urgency collapses register. `Bouge !` never `Bougez !` — even from someone who was on `vous` a second earlier, and it is not a transition, it is adrenaline |

### 2.4 Transitions — the catalogue

Each of these is **a beat**, played once, and then it holds.

| Transition | What it means | Example |
| --- | --- | --- |
| `VOUS → TU`, offered | Intimacy proposed, and it can be refused | « On peut se tutoyer, non ? » |
| `VOUS → TU`, taken without asking | Presumption, dominance, or genuine closeness depending on who | |
| `VOUS → TU`, under pressure | Adrenaline. Reverts afterwards, and the reversion is awkward | |
| `TU → VOUS` | **The wound.** A friend who starts vouvoying you is the coldest thing French can do, and there is no English equivalent at all | after the argument in week seven |
| `TU → VOUS`, professional | The relationship has been reclassified. A colleague became a suspect | |
| Refused | The player offers, the character declines. Fully playable, and it should be | « Je préfère qu'on en reste là. » |

The `TU → VOUS` move is worth building a scene around in every world that can
carry it. It is the clearest available demonstration that the French version is
not a translation, because the English version physically cannot contain it.

### 2.5 The rules that keep it from drifting

1. **The model never chooses.** `addressMode` is in the prompt as a fact about
   each speaker, phrased as an instruction, not a suggestion.
2. **A shift only happens through `pendingShift`.** The engine sets it; the
   writer plays it; the state records it.
3. ⚙ **Lint it.** A beat in which a character uses both `tu` and `vous` forms to
   the same person, or uses a form that contradicts state, is a hard fail. This
   is mechanically checkable: second-person verb morphology and the clitics
   `tu/te/toi/ton/ta/tes` vs `vous/votre/vos` are unambiguous.
4. **`vous` is ambiguous with the plural.** A lint must not flag `vous` when the
   character is addressing more than one person. Check `presentCharacterIds`.

---

## 3. Slang — what is safe, what is ephemeral

The rule that decides everything: **it is not abbreviation or slang that dates a
character, it is density.** One or two markers per line is invisible. Four is a
caricature of a teenager written by someone who is not one.

### 3.1 Safe for characterisation — stable enough to ship

Long-lived, broadly understood, not tied to a single year:

`ouais` · `bref` · `en vrai` · `grave` · `chelou` · `relou` · `trop` (as
intensifier) · `un truc` · `un mec` / `une meuf` · `bosser` · `flemme` ·
`galère` / `c'est la galère` · `nickel` · `ça marche` · `t'inquiète` ·
`n'importe quoi` (as "rubbish", its real meaning) · `laisse tomber` ·
`ça craint` · `je gère` · `se prendre la tête` · `avoir la dalle` ·
`c'est chaud` · `franchement` · `carrément`

**`en vrai` deserves special mention.** Extremely high-frequency discourse
opener, the French equivalent of "ngl / honestly", and almost never present in
translated French because English has nothing that triggers it.

### 3.2 Use for a specific character, not as house voice

`wesh` · `frère` / `frr` / `reuf` · `wallah` · `ptn` · `tmtc` · `bg` · `sah` ·
`cheh` · `aled` · `ez` (gamer) · `askip` · verlan generally (`ouf`, `relou`,
`chelou` are lexicalised and safe; freshly-coined verlan is not)

These are real and current. They are also **socially marked** — for region, for
milieu, sometimes for ethnicity. A character may absolutely speak this way and
several should. The house voice may not, and using Arabic-origin markers to code
a stereotype is out of bounds entirely.

### 3.3 Too ephemeral — do not ship

`lol` (became a politeness filler and then a boomer tell) · `xd` · `oklm`
(reads hard 2015–18) · `mdr` alone without lengthening (prefer `mdrr`) ·
`qqn` · `ct` · `@+` · `g` for `j'ai` · rebus digits (`2m1`, `koi29`, `a12c4`,
`bi1`) · sincere `jtm` · `dtc` · systematic accent-stripping

And **never** `mgl` — an ableist slur that is genuinely used and genuinely
offensive — or `tg` outside an affectionate context.

There is a French word for the whole failure mode: **kikoolol**. Late-2000s
pre-teen internet writing. A character written in it reads as a child, an
over-40 doing an impression, or a joke.

### 3.4 The structural finding

**New French abbreviation is happening in English.** A 2025 Gen Z lexicon of
current French youth abbreviations contains `GOAT`, `POV`, `IMO`, `IYKYK`,
`NGL`, `GRWM`, `FOMO` — every entry English-origin, none French. So a
French twenty-year-old dropping an English acronym is *more* authentic than one
inventing a French one, and this is the opposite of what a careful translator
would guess.

---

## 4. Teenage vs adult dialogue

The worlds run from Last Five (a high-school team) to Window Seven (a
directorate). These must not sound alike, and in French the differences are
grammatical, not just lexical.

| | Teenage / peer | Adult / professional |
| --- | --- | --- |
| `ne` | dropped | dropped in speech, kept when being deliberate |
| `nous` | never | in a briefing, a rebuke, a speech |
| Questions | `Tu fais quoi ?` | `Qu'est-ce que vous comptez faire ?` |
| Address | `tu` immediately | `vous` until earned |
| Fillers | `en vrai`, `genre`, `grave`, `quoi` | `écoutez`, `disons`, `voilà`, `bon` |
| Intensifier | `trop`, `grave` | `très`, `assez`, understatement |
| Approval | `c'est chaud`, `nickel`, `ça passe` | `c'est correct`, `ça tient` |
| Refusal | `nan`, `jamais de la vie`, `laisse tomber` | `ce n'est pas envisageable`, `je ne peux pas vous suivre` |
| Insult | direct and short | oblique, and worse for it |
| Sentence length | short, interrupted, overlapping | complete, and the completeness is the threat |

**The most French adult move available is understatement.** *Le Bureau des
Légendes* was built on *« les valeurs de la DGSE — sérieux et rigueur »* and
deliberately avoids a *« lexique rocambolesque à la Q dans James Bond »*.
Gadget-porn and wisecracks read as American. « Si ça tourne mal, on ne vous
connaît pas. » does more than any speech.

---

## 5. Profanity ladder

Restated from [`LANGUAGE_BIBLE.md`](LANGUAGE_BIBLE.md) §1.4 because this is the
document a writer has open.

`putain` is **not** `fuck`. It is a discourse marker — roughly `damn` in force,
roughly `like` in frequency. A one-for-one map from an English swear budget
produces a French character with a tic.

| Tier | 13+ | Words |
| --- | --- | --- |
| 0 | ✅ reads childish | `zut`, `mince`, `flûte` |
| 1 | ✅ **working range** | `merde`, `putain`, `bordel`, `chiant`, `dégage`, `casse-toi` |
| 2 | ✅ sparingly, aimed | `con`, `conne`, `abruti`, `crétin`, `enfoiré`, `ta gueule` |
| 3 | ❌ | `enculé`, `salope`, `nique`, `pute` |
| — | ❌ **never** | `Sacrebleu`, `Morbleu`, `Parbleu`, `Nom d'une pipe`, `Saperlipopette`, `Sapristi` |

The banned row is not squeamishness. Those words are dead in living French and
survive only as **the anglophone stereotype of a Frenchman**, which makes them
the single most damaging items available: a French player seeing `Sacrebleu`
knows immediately that no French person read this.

---

## 6. Voice fingerprints

The English rule — *strip the speaker names off the dialogue and the player
should still know who is talking* — is harder in French and pays better, because
French has more axes to differentiate on.

Give every major character a fixed position on each of these, author it into
`speechStyle`, and hold it:

1. **`tu` or `vous`, to whom** — the axis English does not have.
2. **`ne` retention** — 0 %, occasional, always.
3. **`nous` or `on`.**
4. **Question shape** — `Tu fais quoi ?` / `Qu'est-ce que tu fais ?` /
   `Que fais-tu ?`
5. **Filler set** — two or three words, and only those.
6. **Register of the domain noun** — `flic` or `policier`; `indic` or `source`;
   `planque` or `dispositif`; `opé` or `opération`; `grillé` or `brûlé`;
   `bateau` or `navire` or `bâtiment`.
7. **Swear tier** — and whether they swear at people or at situations.
8. **Sentence length under stress** — some shorten, some lengthen.
9. **Texting fingerprint**, if they text — bubble count, emoji set,
   capitalisation, whether they use a final period. French readers in this band
   read the fingerprint before they read the words.

**A DGSE officer and a BAC cop must not sound alike.** Two characters who would
answer a question the same way means one of them is not written yet — and in
French, "the same way" includes the pronoun they use for you.

---

## 7. What the dialogue lint checks

⚙ machine-checkable, specified in [`QA_PLAN.md`](QA_PLAN.md) §2.

- ⚙ No `tu`/`vous` mixing to the same singular addressee within a beat.
- ⚙ No form contradicting `addressMode` state.
- ⚙ No `ceci` / `cela` in a dialogue block.
- ⚙ No subject-verb inversion questions (`Que fais-tu`, `Où vas-tu`,
  `Pensez-vous`) from a character whose `speechStyle` is not marked formal.
- ⚙ No banned-tier profanity; no `Sacrebleu` family, ever.
- ⚙ No `Oh mon Dieu`.
- ⚙ Red-list slang (`lol`, `xd`, `2m1`, `jtm`, `oklm`, `mgl`, `dtc`) absent.
- ⚙ Abbreviation density ≤ 2 markers per message in a texting block.
- Read it aloud. Still the only test that catches a line which is legal and
  lifeless.
