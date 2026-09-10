/** Keys for the `session` area. Values are the exact strings the app shipped. */
export const session = {
  /* ---------------------------------------------------------------------- */
  /* A. Session header                                                       */
  /* ---------------------------------------------------------------------- */

  /** Screen-reader label on the `‹` button. "Library" is the shelf of saved runs. */
  'session.back_to_library': 'Back to library',
  /**
   * Screen-reader label on the `☰` button. "World Sheet" is the name of a
   * screen — the reference panel for the open run — and is capitalised because
   * it is that screen's name, not a generic sheet of paper.
   */
  'session.open_world_sheet': 'Open World Sheet',

  /* ---------------------------------------------------------------------- */
  /* C. Story beat / transcript                                              */
  /* ---------------------------------------------------------------------- */

  /**
   * Screen-reader label on the generated scene picture. "Tap to view full
   * screen" is the action, not a description of the image.
   */
  'session.scene_image_a11y': 'Scene image. Tap to view full screen.',
  /**
   * Screen-reader label on the reacting character's portrait. `{name}` is a
   * character name and `{emotion}` is an engine-supplied mood word.
   */
  'session.reaction_image_a11y': '{name}, {emotion}. Tap to view full screen.',
  /**
   * Shown beside a spinner while the turn is still being written. Deliberately
   * plain — an honest state, not theatrical loading copy (spec §25.12).
   */
  'session.resolving': 'Resolving…',
  /** Retries the turn that just failed. */
  'session.try_again': 'Try again',

  /* ---------------------------------------------------------------------- */
  /* D. Composer dock                                                        */
  /* ---------------------------------------------------------------------- */

  /**
   * The composer placeholder and its screen-reader label. An open invitation
   * addressed to the player — "you" is singular and informal (`tu`), the way
   * the rest of the game addresses them.
   */
  'session.what_do_you_do': 'What do you do?',
  /**
   * The composer placeholder when other characters are present: the player may
   * speak as well as act. "anything" is the promise of the product — there is
   * no menu of allowed verbs.
   */
  'session.say_or_do_anything': 'Say or do anything…',
  /**
   * Screen-reader label on the send button while a turn is streaming. **Stop
   * generation** — `Arrêter`, never the interjection `Stop` (UI_AUDIT §3). It
   * cancels the rendering; it does not undo the turn.
   */
  'session.stop': 'Stop',
  /** Screen-reader label on the send button. "action" = the player's typed move. */
  'session.send_action': 'Send action',
  /**
   * Warning under the composer when the balance is short of the tier's price.
   * "credits" is the in-app currency.
   */
  'session.more_credits_needed':
    '{count, plural, one {# more credit needed} other {# more credits needed}}',
  /**
   * Screen-reader label on the `··· Last turn` control. `turn` is a game turn
   * (`tour`), so this is "things you can do about the last turn".
   */
  'session.turn_options': 'Turn options',
  /**
   * The visible label of the same control. The leading `··· ` is part of the
   * string and must be kept. `turn` is a game turn (`tour`).
   */
  'session.last_turn': '··· Last turn',

  /* ---------------------------------------------------------------------- */
  /* Full-screen media viewer                                                */
  /* ---------------------------------------------------------------------- */

  /** Screen-reader label on the full-screen image, which dismisses on tap. */
  'session.close_image': 'Close image',
  /** Caption under the full-screen image. "anywhere" — the whole screen dismisses. */
  'session.tap_anywhere_to_close': 'Tap anywhere to close',

  /* ---------------------------------------------------------------------- */
  /* Errors                                                                  */
  /* ---------------------------------------------------------------------- */

  /** The session would not load at all. "story" here is the open run. */
  'session.load_failed': 'Could not load this story.',
  /**
   * The turn failed. The second sentence is a money promise and must stay
   * unambiguous: no credits were taken.
   */
  'session.turn_failed': "That turn didn't complete. You weren't charged.",
  /**
   * The session advanced elsewhere while the player was typing. "moved on" =
   * the world state is newer than the one the action was written against; the
   * typed action is still in the composer and can simply be sent again.
   */
  'session.stale_revision': 'This story moved on. Your action is still here — send it when ready.',
  /** No network. "saved" = kept locally, not lost. */
  'session.offline': "You're offline. Your action is saved.",
  /**
   * The "tell it differently" rewrite failed. As with `session.turn_failed`,
   * the money promise must stay unambiguous.
   */
  'session.rephrase_failed': 'That could not be rewritten just now. Nothing was charged.',

  /* ---------------------------------------------------------------------- */
  /* The stage                                                               */
  /* ---------------------------------------------------------------------- */

  /**
   * Joins a list of names for a screen reader: "Dai, Kai and Coach Torakawa".
   * `{others}` is the already-comma-joined head of the list and `{last}` is the
   * final name. English deliberately has no comma before "and"; French takes
   * `et` with no comma either.
   */
  'session.name_list': '{others} and {last}',
  /**
   * The whole stage read aloud as one group. `{location}` is a place name and
   * `{presence}` is either `session.present` or `session.nobody_else_here`.
   */
  'session.stage_a11y': 'Scene: {location}. {presence}',
  /** "{names} are here" — who the player can see on the stage. */
  'session.present': '{names} present.',
  /** The stage has no other characters on it. "else" = besides the player. */
  'session.nobody_else_here': 'Nobody else here.',
  /**
   * Screen-reader label on the player's own portrait. "redraw" = generate the
   * picture again, not sketch it by hand.
   */
  'session.your_character_a11y': 'Your character. Tap to view or redraw.',
  /**
   * Screen-reader label on the empty portrait slot. `Draw` here is **make a
   * picture** (`Dessiner`), never `Tirer` — and it collides with the parser
   * verb `draw` = unsheathe, which this is not (UI_AUDIT §3).
   */
  'session.draw_your_character_a11y': 'Draw your character.',
  /**
   * The player, in a cast list and as a dialogue speaker. Singular and informal
   * — the same "you" the composer addresses.
   */
  'session.you': 'You',
  /**
   * Visible label inside the empty portrait slot. `Draw` = make a picture (see
   * `session.draw_your_character_a11y`). Renders in a box about 56–76pt wide
   * over two lines, so it has very little room.
   */
  'session.draw_yourself': 'Draw yourself',
  /**
   * A companion and their mood, as a chip: "Mina · restless". `{mood}` is an
   * engine-supplied word and is not translated here.
   */
  'session.crew_member': '{name} · {mood}',
  /**
   * A warning chip when a resource has nearly run out. Deliberately a state of
   * the world rather than a number — "Your legs are going", not "Legs 18".
   * `{name}` is a world-authored resource name.
   */
  'session.resource_nearly_gone': '{name} is nearly gone',

  /* ---------------------------------------------------------------------- */
  /* Narrative blocks                                                        */
  /* ---------------------------------------------------------------------- */

  /**
   * The speaker label when a line of dialogue has no known character behind it
   * — an unidentified voice, not a specific person.
   */
  'session.someone': 'Someone',
  /**
   * The player's own action, read aloud by a screen reader. `{text}` is what
   * the player typed, so it is in whatever language they typed it in.
   */
  'session.player_action_a11y': 'You: {text}',

  /* ---------------------------------------------------------------------- */
  /* GP-04 — the turn menu                                                   */
  /* ---------------------------------------------------------------------- */

  /** Title of the sheet of things you can do about the turn that just happened. */
  'session.this_turn': 'This turn',
  /**
   * The player's typed action, quoted back to them. The curly quotes are the
   * English convention and are part of the string; French takes `« … »` with
   * the spacing that convention requires (see TYPOGRAPHY.md).
   */
  'session.quoted_action': '“{text}”',
  /**
   * Re-sends the same action as a **new** turn — the world does not rewind, so
   * this is "attempt it again", not "undo". `{cost}` is a credit price.
   */
  'session.retry': 'Try the same thing again · {cost}',
  /** Explains what retrying does. "the dice" is the engine's roll for the attempt. */
  'session.retry_explainer':
    'Sends it again as a new turn. The dice are rolled fresh because it is a new attempt — the world does not rewind.',
  /**
   * Rewrites the prose of the turn that already happened, changing nothing that
   * happened. "differently" describes the telling, not the outcome. `{cost}` is
   * a credit price.
   */
  'session.rephrase': 'Tell it differently · {cost}',
  /** Button label while the rewrite is in flight. */
  'session.rewriting': 'Rewriting…',
  /** Explains that rephrasing changes the words and nothing else. */
  'session.rephrase_explainer':
    'The same moment, written again. Nothing that happened changes — the same rolls, the same outcome, the same consequences. Only the words are new.',
  /**
   * Puts the last action back into the composer for editing. "the composer" is
   * the text box at the bottom of the play screen.
   */
  'session.edit_action': 'Put it back in the composer',
  /** Explains that editing is free until the action is actually sent. */
  'session.edit_explainer': 'Change the wording and send when you are ready. Costs nothing until you do.',
  /** Makes a shareable card out of this beat. "moment" = this turn of the story. */
  'session.share_action': 'Share this moment',
  /** Explains that the share card is made locally and the player controls it. */
  'session.share_explainer': 'Makes a card on your phone. You choose what it says and where it goes.',
  /**
   * Reports that the story contradicted itself. Not an abuse report and not a
   * crash report — "wrong" means the world got a fact wrong.
   */
  'session.report_action': 'Something here is wrong',
  /** Explains where the report goes, and that it is free. */
  'session.report_explainer': 'Opens the timeline, where you can correct what the story recorded. Free.',

  /* ---------------------------------------------------------------------- */
  /* The bottom-sheet shell                                                  */
  /* ---------------------------------------------------------------------- */

  /**
   * Screen-reader label on the scrim behind a sheet. `{title}` is the sheet's
   * own title, lower-cased by the caller — "Close turn quality".
   */
  'session.close_sheet': 'Close {title}',

  /* ---------------------------------------------------------------------- */
  /* GP-02 — the quality tier sheet                                          */
  /* ---------------------------------------------------------------------- */

  /**
   * Title of the tier sheet. `Turn` is a game turn (`tour`), so this is the
   * quality of one beat of the story. TERMINOLOGY.md §3.6 recommends
   * `Qualité de la scène`, not `Qualité de tour`.
   */
  'session.turn_quality': 'Turn quality',
  /**
   * Under the sheet title. The last clause is a fairness promise and must not
   * be softened: paying more buys presentation, never a better outcome.
   */
  'session.turn_quality_explainer':
    'Higher tiers buy richer direction and better visuals. Every tier rolls the same dice — paying more never changes an outcome.',
  /**
   * One tier card read aloud: its name, its price in credits, and its promise.
   */
  'session.tier_a11y': '{label}, {cost, plural, one {# credit} other {# credits}}. {promise}',

  /*
   * The four tier names. **Possibly brand names — do not rename without
   * approval.** The decision is pending in TERMINOLOGY.md §3.6, which currently
   * recommends Rapide / Intense / Cinéma / Apex, and warns that `Cinématique`
   * is a false friend (it means "cutscene" in French games).
   */
  /** Quality tier name. Pending approval — see TERMINOLOGY.md §3.6. */
  'session.tier_quick': 'Quick',
  /** Quality tier name. Pending approval — see TERMINOLOGY.md §3.6. */
  'session.tier_vivid': 'Vivid',
  /** Quality tier name. Pending approval — see TERMINOLOGY.md §3.6. */
  'session.tier_cinematic': 'Cinematic',
  /** Quality tier name. Pending approval — see TERMINOLOGY.md §3.6. */
  'session.tier_apex': 'Apex',

  /**
   * The Quick tier's promise. Describes presentation only, never dice (§20.3).
   * `turn` is a game turn (`tour`).
   */
  'session.tier_quick_promise': 'Fast, concise turn',
  /** The Vivid tier's promise. "direction" is a film director's direction. */
  'session.tier_vivid_promise': 'Richer dialogue and direction',
  /** The Cinematic tier's promise. "speed" = how quickly the turn arrives. */
  'session.tier_cinematic_promise': 'Best balance of immersion and speed',
  /** The Apex tier's promise. Presentation depth, never better outcomes. */
  'session.tier_apex_promise': 'Deepest reasoning and premium storytelling',

  /**
   * Shown on tiers that can produce a picture for the beat. "hero frame" is one
   * generated still image for the turn, not a person and not a video frame.
   */
  'session.hero_frame_eligible': 'Can generate a hero frame',
  /**
   * How many more turns the current balance buys at this tier. `turn` is a game
   * turn (`tour`); zero is singular in French, which is why this is an ICU
   * plural rather than a branch on the count.
   */
  'session.turns_left': '{count, plural, one {# turn left} other {# turns left}}',
  /**
   * Shown in place of `session.turns_left` when the balance will not cover one
   * turn at this tier. Lower case as written — it sits under a credit number,
   * not at the start of a sentence.
   */
  'session.not_enough': 'not enough',
} as const;
