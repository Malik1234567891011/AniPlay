/**
 * WS-01 to WS-08 — the World Sheet. Seven tabs and the canon inspector.
 *
 * Values are the exact strings the app shipped. Three of these are rendered
 * through `.toUpperCase()` by the screen (the quest group headers) and are
 * stored in sentence case, the way they are written in the source.
 */
export const worldsheet = {
  'worldsheet.title': 'World Sheet',
  'worldsheet.close': 'Close',

  /* -- The tab strip (WS-01…WS-07). Seven labels across one row: UI_AUDIT §2.6
        measured French inflation on exactly these. -- */
  'worldsheet.tab_overview': 'Overview',
  /** The player's own character sheet. `Personnage`. */
  'worldsheet.tab_character': 'Character',
  'worldsheet.tab_inventory': 'Inventory',
  'worldsheet.tab_quests': 'Quests',
  /** The relationships tab — the people you know. Not a population count. */
  'worldsheet.tab_people': 'People',
  'worldsheet.tab_map': 'Map',
  /** The ordered record of what happened. `Chronologie`. */
  'worldsheet.tab_timeline': 'Timeline',

  /* -- WS-01 Overview. The four headers are written upper-case in the source
        and are rendered exactly as stored. -- */
  'worldsheet.current_objective': 'CURRENT OBJECTIVE',
  /** Status effects currently on the player — buffs and debuffs. */
  'worldsheet.active_effects': 'ACTIVE EFFECTS',
  /** Header over the characters the player has been dealing with lately. */
  'worldsheet.relationship_highlights': "WHO'S ON YOUR MIND",
  /** Header over the last few things that happened. Adverb, not a noun. */
  'worldsheet.recently': 'RECENTLY',
  /** One recent event, bulleted. `{event}` is prose the engine wrote. */
  'worldsheet.recent_event': '· {event}',
  /** A character chip: their name, then how they currently regard the player. */
  'worldsheet.highlight': '{name} · {label}',

  /* -- WS-02 Character -- */
  'worldsheet.level': 'Level {level}',
  /**
   * Progress markers in a milestone-progression world — the alternative to
   * levels. `étape`, not a distance marker. Zero is singular in French.
   */
  'worldsheet.milestones': '{count, plural, one {# milestone} other {# milestones}}',
  /** Strength, Wits and the rest. `Caractéristiques`. */
  'worldsheet.attributes': 'Attributes',
  /** Read aloud: the attribute's name, its value, then its plain-language gloss. */
  'worldsheet.attribute_a11y': '{name}, {value}. {plain}',
  'worldsheet.skills': 'Skills',
  /** Special abilities — magic, techniques. `Pouvoirs`, not `Puissances`. */
  'worldsheet.powers': 'Powers',
  /**
   * An ability on cooldown and how long is left. Not "recovering" as in healing.
   * `min` is the invariant abbreviation for minutes in both languages.
   */
  'worldsheet.cooldown': 'Recovering — {minutes} min',
  /** Rank and reputation inside a faction. `Réputation`, not a physical stance. */
  'worldsheet.standing': 'Standing',
  /** The player's rank in this faction is not known. Not "an unknown faction". */
  'worldsheet.rank_unknown': 'Unknown',

  /* -- WS-03 Inventory -- */
  /** You are carrying nothing. Not "there is nothing wrong with you". */
  'worldsheet.inventory_empty_title': 'Nothing on you',
  'worldsheet.inventory_empty_body': 'Anything you pick up in the story shows up here.',
  /** Item state: worn or wielded right now. `Équipé`. */
  'worldsheet.equipped': 'Equipped',

  /* -- WS-04 Quests. The four group headers are upper-cased by the screen. -- */
  'worldsheet.quests_active': 'Active',
  /** Investigative leads — `pistes`. Not leadership, and not a lead actor. */
  'worldsheet.quests_leads': 'Leads',
  'worldsheet.quests_completed': 'Completed',
  /** A quest route closed off — `fermée`. Not "closed" as in shut for the night. */
  'worldsheet.quests_closed': 'Closed',
  'worldsheet.quests_empty_title': 'No objectives yet',
  'worldsheet.quests_empty_body': 'Objectives appear as the story gives you something to chase.',
  /** The quest's current step. `❯` is the step marker and stays in the message. */
  'worldsheet.quest_step': '❯ {step}',
  /** Shown where a quest has no next step yet — the way forward is not known. */
  'worldsheet.quest_step_unclear': '❯ Not yet clear.',

  /* -- WS-05 Relationships. The five dimension labels are written lower-case in
        the source and are rendered exactly as stored. -- */
  /** Whether this character believes what the player says. `confiance`. */
  'worldsheet.dimension_trust': 'trust',
  'worldsheet.dimension_affection': 'affection',
  'worldsheet.dimension_respect': 'respect',
  /** How much this character fears the player. `peur`. */
  'worldsheet.dimension_fear': 'fear',
  /** Competitive antagonism, not open hostility. `rivalité`. */
  'worldsheet.dimension_rivalry': 'rivalry',
  /**
   * "Turn on" is the verb — switch the setting on. NOT a game turn (`tour`).
   * "Settings" is the settings section of the Profile screen.
   */
  'worldsheet.relationship_numbers_hint':
    'Turn on advanced relationship stats in Settings to see the underlying numbers.',

  /* -- WS-06 Map -- */
  /**
   * Read aloud for the whole map region: where the player is, then how many
   * places they have found. `{place}` is a location name from the engine.
   */
  'worldsheet.map_a11y':
    'Map. You are at {place}. {count, plural, one {# place discovered} other {# places discovered}}.',
  /** Substituted into `map_a11y` when the current location has no name yet. */
  'worldsheet.map_unknown_place': 'an unknown place',
  /** Map legend: the dot that marks the player's current location. */
  'worldsheet.map_you_are_here': 'You are here',
  /** Map legend: this place has a quest waiting at it. */
  'worldsheet.map_has_objective': 'Has an objective',
  'worldsheet.map_travel_hint':
    'Travel is an action. Type where you want to go, and the story resolves the journey.',

  /* -- WS-07 / WS-08 Timeline: the canon memory inspector -- */
  'worldsheet.timeline_empty_title': 'Nothing recorded yet',
  'worldsheet.timeline_empty_body': 'Everything that becomes canon will be listed here.',
  /**
   * Pin this moment to canon so the story keeps returning to it — `Épingler`.
   * Not "keep" as in hold on to, and not "keep" as in a castle keep.
   */
  'worldsheet.pin_action': '☆ Keep this',
  /** The same control once the moment is pinned. `★` is the filled star. */
  'worldsheet.pinned_canon_star': '★ Pinned canon',
  /** Badge on a moment that is pinned but cannot be unpinned from here. */
  'worldsheet.pinned_canon': 'Pinned canon',
  /** Read aloud on the pin control: pin this moment to canon. `Épingler`. */
  'worldsheet.pin_a11y': 'Keep this moment: {text}',
  /** Read aloud: remove the pin from this moment. `Désépingler`. */
  'worldsheet.unpin_a11y': 'Unpin: {text}',
  'worldsheet.pinned_notice': 'Pinned. The story will keep coming back to this.',
  /** Confirmation that the pin was removed. */
  'worldsheet.unpinned_notice': 'Unpinned.',
  'worldsheet.pin_failed': 'That could not be pinned just now.',
  /** Opens the correction box: this recorded fact is not what happened. */
  'worldsheet.this_is_wrong': 'This is wrong',
  /** Read aloud on the same control, with the moment it applies to. */
  'worldsheet.correct_a11y': 'This is wrong: {text}',
  /** Abandons the correction box without submitting. `Annuler`. */
  'worldsheet.cancel': 'Cancel',
  /** Placeholder in the correction box. A question put to the player. */
  'worldsheet.correction_placeholder': 'What actually happened?',
  /** Read aloud for the correction box. Deliberately without the question mark. */
  'worldsheet.correction_a11y': 'What actually happened',
  /** Submits the correction. "Fix" the record, not repair an object. */
  'worldsheet.fix_it': 'Fix it',
  /** Shown on the submit button while the engine checks the correction. */
  'worldsheet.checking': 'Checking…',
  'worldsheet.correction_accepted': 'Fixed. That is what the story remembers now.',
  'worldsheet.correction_conflict': 'That contradicts something the engine already decided.',
  'worldsheet.correction_failed': 'That did not go through. Nothing was changed.',
  'worldsheet.correction_explainer':
    'Correcting is free. It changes what the story remembers, never what the engine decided — a correction that contradicts the record is refused with the reason.',
  /** Share this moment out of the app. `Partager`. */
  'worldsheet.share': 'Share',
  'worldsheet.share_a11y': 'Share: {text}',
  /**
   * Branch a new run from this moment — the `library.fork` verb. `· 120` is the
   * credit price and is not a translatable word.
   */
  'worldsheet.fork_from_here': 'Fork from here · 120',
  'worldsheet.fork_a11y': 'Fork the timeline from this moment',
  /** `{count}` is how many credits short the player is. Zero is singular in French. */
  'worldsheet.fork_insufficient_credits':
    '{count, plural, one {You need # more credit to fork this timeline.} other {You need # more credits to fork this timeline.}}',
  'worldsheet.fork_offline': "You're offline. The fork will work once you reconnect.",
  'worldsheet.fork_not_found': 'This run is no longer on the server. Nothing was charged.',
  'worldsheet.fork_failed':
    'The fork did not go through, and you were not charged. Try again in a moment.',
  /** "Branch" here is the branch of the timeline, not a tree branch or an office. */
  'worldsheet.fork_explainer':
    'Forking copies this world at the chosen moment. The original branch is never destroyed.',
} as const;
