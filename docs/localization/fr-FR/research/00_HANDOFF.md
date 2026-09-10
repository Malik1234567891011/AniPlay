# fr-FR research — handoff

Five deep research passes completed before a session limit. Their findings are
captured in this directory **verbatim from the researchers**. Do not re-run this
research — it cost a great deal and it is done. Read these, then continue with
the documents still outstanding.

## Completed and captured here
- `nautical-pirate.md` — Blackwake register. Includes the canonical Varlet
  *Île au trésor* vocabulary, the `brick`/brig false friend, the
  `quartier-maître` rank-inversion trap, and the Tintin problem with
  `mille sabords`.
- `typography.md` — measured, not guessed. CLDR/ICU/Apple/JSC output compared on
  this machine. Includes the U+202F vs U+00A0 split, the Hermes iOS `Intl` gaps,
  and the font-coverage problem with U+202F in Georgia and Avenir Next.
- `texting.md` — current French chat conventions 2024–26, with a dated/cringe
  blacklist and the crucial structural finding that new French abbreviation has
  moved into English loans.
- `horror-fantasy.md` — the Sola/Marcel *Trône de fer* and Ledoux/Lauzon
  *Seigneur des anneaux* controversies, which between them settle the question
  of how archaic French fantasy prose should be. Answer: not.
- `espionage.md` — Window Seven register. Built on the DGSE's own published
  *Dico d'espions*. Includes the finding that `un agent` means the recruited
  source, not the officer.

## Written since, from this research — all of it in `../`
LANGUAGE_BIBLE, NARRATIVE_STYLE, DIALOGUE_AND_REGISTER, GENRE_GUIDES,
TERMINOLOGY, ENGLISH_CALQUE_BLACKLIST, PLAYER_GRAMMAR, TYPOGRAPHY,
LOCALIZATION_ARCHITECTURE, STORY_AUDIT, APP_STORE_FRANCE, QA_PLAN.

Plus three reporting tools that change nothing: `npm run i18n:extract`,
`npm run fr:lint`, `npm run fr:probe`.

## Still outstanding
Nothing in the document set. The next work is Phase 2 and it starts at
`ENGLISH_FREEZE_COMMIT` — the sequence is in
[`../LOCALIZATION_ARCHITECTURE.md`](../LOCALIZATION_ARCHITECTURE.md#phase-2-implementation-sequence).

Two research areas came up thin and are worth a fresh pass **only if budget
allows**: French horror *game* localization (Amnesia, Resident Evil, Silent
Hill, Alan Wake), and the Stephen King French-translation debate. Neither
blocks anything — the horror register question is already settled by the
Lovecraft/Camus and Sola/Lauzon evidence.

Two decisions are **pending approval** and nothing has been applied to code:
world titles (`TERMINOLOGY.md` §1.3) and quality-tier labels (§3.6).

One brand blocker sits outside this project: `app.json` says `AniPlay`,
`server.ts:330` says `Plotbreak`. The France store listing cannot be prepared
around an ambiguous name.

## The three findings that matter most across all five
1. **Do not add.** Every documented failure in French genre translation is an
   addition — an adjective, an exclamation mark, a conjunction, a religious
   concept the source did not have. Make "add nothing that is not there" an
   explicit, testable rule.
2. **Rhythm is content.** Three short sentences in the source must be three
   short sentences in the target. The most-mocked line in French fantasy
   translation is Sola fusing "The right eye was open. The pupil burned blue.
   It saw." into two baroque sentences.
3. **tu/vous is authored state, not a setting.** Lauzon has Gandalf vouvoyer
   Frodo and Galadriel tutoyer him, to mark her immediate understanding of him.
   In branching fiction a switch is a free story beat. Track it per character
   pair; never let it drift.
