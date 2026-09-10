# Plotbreak — localisation fr-FR

**Statut : PHASE 1 (recherche). Aucune traduction de masse n'a été faite.**

Branche `localization/fr-fr`, worktree `/Users/malik/AniPlay-fr-fr`, basée sur `main` @ `77aeeb7`.

---

## What this folder is

The France-French language and localization bible for Plotbreak. Target locale
is **fr-FR — metropolitan French**. Not fr-CA, not Belgian, not Swiss, not
"international French". Quebec is out of scope entirely and its usage is cited
here only where it is a useful catalogue of a problem, never as a model.

The goal these documents serve is not "Plotbreak, translated". It is:

> **Plotbreak, as if it had been designed, written and authored in French, for a
> young French audience that already lives inside anime, manga, manhwa, romance
> and mobile games.**

The test is not "does it support French". It is two twenty-year-olds in France
playing for thirty minutes and never once thinking *c'est traduit de l'anglais*.

## Read in this order

| # | Document | What it settles |
| --- | --- | --- |
| 1 | [`LANGUAGE_BIBLE.md`](LANGUAGE_BIBLE.md) | The master document. BAD LITERAL vs NATIVE FR-FR across every surface. Start here. |
| 2 | [`PRODUCT_VOICE.md`](PRODUCT_VOICE.md) | tu/vous for the product, capitalization, button grammar, error voice. The rule that must never wobble between screens. |
| 3 | [`NARRATIVE_STYLE.md`](NARRATIVE_STYLE.md) | Second-person French narration that reads as literature, not as instructions. |
| 4 | [`DIALOGUE_AND_REGISTER.md`](DIALOGUE_AND_REGISTER.md) | Spoken French, the `addressMode` character state, slang policy, the profanity ladder. |
| 5 | [`PLAYER_GRAMMAR.md`](PLAYER_GRAMMAR.md) | `Tu es arrivé` vs `Tu es arrivée`. The player identity model and the agreement policy. |
| 6 | [`GENRE_GUIDES.md`](GENRE_GUIDES.md) | Twelve genre voices. Basketball, espionage, horror, fantasy, romance and the rest do not share a narrator. |
| 7 | [`TERMINOLOGY.md`](TERMINOLOGY.md) | Anime/manga vocabulary, Plotbreak product terms, proper nouns, grammatical gender glossary. |
| 8 | [`ENGLISH_CALQUE_BLACKLIST.md`](ENGLISH_CALQUE_BLACKLIST.md) | The living list of what makes French sound translated. |
| 9 | [`TYPOGRAPHY.md`](TYPOGRAPHY.md) | Guillemets, spacing, apostrophes, the one Plotbreak quotation convention, and what is actually safe on an iPhone. |
| 10 | [`LOCALIZATION_ARCHITECTURE.md`](LOCALIZATION_ARCHITECTURE.md) | Where locale lives. The i18n migration plan. The language-drift defences. |
| 11 | [`UI_AUDIT.md`](UI_AUDIT.md) | Every user-facing string, where it lives, and what breaks in French. |
| 12 | [`STORY_AUDIT.md`](STORY_AUDIT.md) | Per-world: titles, proper nouns, gender, what to translate and what to leave. |
| 13 | [`APP_STORE_FRANCE.md`](APP_STORE_FRANCE.md) | Name, subtitle candidates, keywords, description, screenshots. Prepared, not submitted. |
| 14 | [`QA_PLAN.md`](QA_PLAN.md) | The tests, the linter, the red team, the playstyle matrix. |

## The seven rules everything else derives from

1. **Write French. Do not translate English.** The runtime must not be
   English prose → translation model → French prose. French story bible +
   French character voices + French player context + language-neutral world
   state → the model writes directly in French, from the first token.
2. **Product/UI voice is TU.** Always. Never mixed with vous between screens.
3. **tu/vous inside stories is character state**, not a setting — an
   `addressMode` per character pair, with transitions that are story beats.
4. **Player grammatical gender is declared, never inferred** from name or
   artwork, and never rendered as `arrivé·e` inside immersive prose.
5. **Length is not the enemy.** The instruction to the French writer is
   *"le français doit valoir la peine d'être lu"*, never *"le français doit
   être concis"*. Measured: French needs ~11% more words and ~26% more output
   tokens to carry the same beat. That is a budget change, not a cut.
6. **Never keep a joke because it survives translation.** Preserve function,
   character intent and comedic rhythm. The French version may have a
   different joke.
7. **Proper nouns hold still.** Kaia Thorn, Blackwake, Last Five and Mara
   Ellison do not become French. Titles, ranks, organisations and puns may.

## Phase boundary

The English/core agent is still changing the writer context, the generated
choice architecture and world content. A third agent is authoring four new
worlds. Until an `ENGLISH_FREEZE_COMMIT` is given:

**Doing now** — research, this bible, terminology, architecture audit, string
inventory, parser audit, QA plan, App Store research, isolated tooling that
cannot conflict.

**Not doing yet** — translating official worlds, mass-translating runtime
prompts, rewriting UI strings, merging into the English branch, uploading any
store metadata.

See [`LOCALIZATION_ARCHITECTURE.md` § Phase 2 sequence](LOCALIZATION_ARCHITECTURE.md#phase-2-implementation-sequence).
