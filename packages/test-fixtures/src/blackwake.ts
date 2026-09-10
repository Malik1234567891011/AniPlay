import { StoryVersion } from '@aniplay/contracts';

/**
 * "Blackwake" — a broken ship, a torn map, and nobody knowing your name.
 *
 * The design problem with a pirate fantasy is that the crew is usually
 * equipment. Here every crew member is a persistent character with their own
 * goals, their own opinions about each other, and a real ability to refuse,
 * leave, or hand you to the navy. Recruiting somebody is a relationship gate,
 * not a purchase, and keeping them is an ongoing cost.
 *
 * Two things are deliberately separate. Notoriety is how known your name is —
 * it opens doors, recruits people and gets you into rooms. The navy's opinion
 * of you is a different number entirely, and it goes down for things that have
 * nothing to do with how strong you are. A famous explorer with a huge bounty
 * and a nobody with none are both coherent characters.
 *
 * Relics each break exactly one rule of the world and nothing else, and a
 * player who never touches one can still become the most dangerous person in
 * the Blackwake through weapons, tactics and a very good crew.
 *
 * Parsed at import so a malformed world fails the build, not a player's session.
 */

const raw = {
  id: 'sv_blackwake_1',
  storyId: 'story_blackwake',
  version: 1,
  title: 'Blackwake',
  fantasyLabel: 'A broken ship. Nobody knows your name.',
  hook: 'Your guardian spent forty years looking for a sea that is not on any map. Somebody killed him for it and left you the compass.',
  premise:
    'The Blackwake is nine hundred miles of open water and about four hundred islands, and every one of them belongs to somebody: the Ninth Fleet, a merchant house, a king, or whoever last held it long enough to say so.\n\n' +
    'Ferro Vane raised you. He spent his life looking for a region of ocean called the Crownless Sea that most people are quite sure does not exist, and he was laughed out of every port on the coast for it.\n\n' +
    'Eleven days ago somebody came into the workshop and cut his throat, and did not take his money.\n\n' +
    'He left you three things: a forty-year-old cutter with a cracked keel and no crew, the eastern third of a chart with the rest torn away, and a brass compass that points somewhere no compass points.\n\n' +
    'You are in Saltmarket harbour with a ship you cannot sail alone, and the only person who has offered to help is a navigator with a warrant out on her who will not say why she can read your guardian’s handwriting.\n\n' +
    'Nobody knows your name yet.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: 'blackwake/cover',
  keyArt: 'blackwake/key',
  tags: ['Pirates', 'Adventure', 'Exploration', 'Crew', 'Mystery'],
  mechanicsChips: ['Recruit a real crew', 'Upgrade your ship', 'Bounty & notoriety', 'Island arcs', 'Relics'],
  contentDescriptors: ['FANTASY_VIOLENCE', 'MORAL_AMBIGUITY', 'ALCOHOL_REFERENCES', 'ROMANCE', 'LANGUAGE'],
  intensity: 'MODERATE',
  creatorNote:
    'Your crew are people, not equipment. They argue with you, they argue with each other, and any of them can walk. A relic breaks exactly one rule of the world — and you can become the most dangerous thing on this ocean without ever holding one.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'saltmarket',
    startWorldMinute: 7 * 60,
    startingItems: [
      { itemId: 'vanes_compass', qty: 1 },
      { itemId: 'torn_chart', qty: 1 },
      { itemId: 'workshop_cutlass', qty: 1 },
    ],
    hardCanon: [
      'The Crownless Sea is not on any chart printed in the last ninety years. That is deliberate and somebody did it.',
      'A relic breaks exactly one rule of the world and does nothing else. There are no general-purpose relics.',
      'The Ninth Fleet does not negotiate with anyone carrying a bounty over four hundred crowns.',
      'A ship needs four people to sail and eleven to fight. The Marrow has one.',
      'Ferro Vane was killed with a naval-pattern blade and nothing was taken.',
    ],
    toneGuide:
      'Salt, rope, weather and money. Adventure first: this is a world people go to sea in because it is enormous ' +
      'and full of things nobody has seen. Crew banter is the backbone — they talk to each other, not only to the ' +
      'player. Violence is fast and consequential rather than gritty. Anime pacing: a quiet night on deck earns ' +
      'the next island.',
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 11, mind: 11, presence: 11, resolve: 11, arcana: 8 },
  skills: [
    { id: 'blades', name: 'Blades', attribute: 'agility', description: 'Cutlass, boarding axe, and the footwork of a moving deck.' },
    { id: 'gunnery', name: 'Gunnery', attribute: 'mind', description: 'Ranging, laying and firing something that weighs a ton.' },
    { id: 'seamanship', name: 'Seamanship', attribute: 'might', description: 'Sail, rope, weather, and what a hull will take.' },
    { id: 'navigation', name: 'Navigation', attribute: 'mind', description: 'Charts, stars, and knowing when the chart is wrong.' },
    { id: 'command', name: 'Command', attribute: 'presence', description: 'Being followed by people who could leave.' },
    { id: 'bargaining', name: 'Bargaining', attribute: 'presence', description: 'Cargo, contracts, and what a thing is worth here.' },
    { id: 'larceny', name: 'Larceny', attribute: 'agility', description: 'Locks, holds, and being somewhere you are not.' },
    { id: 'lore', name: 'Deep Lore', attribute: 'mind', description: 'Relics, old charts, and what the sea used to be called.' },
    { id: 'medicine', name: 'Medicine', attribute: 'mind', description: 'Splinters, fever, and the hour after a fight.' },
  ],
  resources: [
    {
      id: 'stamina',
      name: 'Stamina',
      max: 100,
      start: 100,
      regenPerHour: 7,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: true,
      zeroStateConsequence: 'Done in. Somebody else is taking the wheel.',
      color: '#E8B44A',
    },
    {
      id: 'hull',
      name: 'Hull',
      max: 100,
      start: 45,
      regenPerHour: 0,
      polarity: 'GOOD_HIGH',
      displayPriority: 2,
      visible: true,
      zeroStateConsequence: 'She is going down and everyone knows it.',
      color: '#7A9E7E',
    },
    {
      id: 'notoriety',
      name: 'Notoriety',
      max: 100,
      start: 0,
      regenPerHour: 0,
      polarity: 'GOOD_HIGH',
      displayPriority: 3,
      visible: true,
      zeroStateConsequence: 'Nobody has heard of you. Which has its uses.',
      color: '#B14A6C',
    },
    {
      id: 'supplies',
      name: 'Supplies',
      max: 100,
      start: 60,
      regenPerHour: -0.4,
      polarity: 'GOOD_HIGH',
      displayPriority: 4,
      visible: true,
      zeroStateConsequence: 'Empty barrels and a crew that has noticed.',
      color: '#8A7A5E',
    },
  ],
  items: [
    {
      id: 'vanes_compass',
      name: 'Vane’s Compass',
      tags: ['quest', 'relic'],
      questItem: true,
      droppable: false,
      skillModifiers: { navigation: 2 },
      description: 'Brass, heavy, and it has never once pointed north. It points at something, steadily, and the something moves.',
      loreText: 'He wore it for forty years and never let anyone else hold it.',
      icon: 'compass',
    },
    {
      id: 'torn_chart',
      name: 'The Eastern Third',
      tags: ['quest', 'document'],
      questItem: true,
      droppable: false,
      description: 'A third of a chart in Ferro’s hand. The tear is old and clean — it was cut, not ripped.',
      icon: 'chart',
    },
    {
      id: 'workshop_cutlass',
      name: 'Workshop Cutlass',
      tags: ['weapon'],
      equipSlot: 'hand',
      skillModifiers: { blades: 1 },
      description: 'Ferro’s, and not a good one. He used it to open crates.',
      icon: 'cutlass',
    },
    {
      id: 'ships_papers',
      name: 'The Marrow’s Papers',
      tags: ['document'],
      description: 'Registration, tonnage, and a hull survey from nine years ago that somebody has been ignoring.',
      icon: 'papers',
    },
    {
      id: 'new_keel',
      name: 'A Sound Keel',
      tags: ['ship'],
      equipSlot: 'ship_hull',
      description: 'Forty feet of laminated oak and eleven days of a yard’s time. She will take weather again.',
      icon: 'keel',
    },
    {
      id: 'topsails',
      name: 'Cut Topsails',
      tags: ['ship'],
      equipSlot: 'ship_rig',
      skillModifiers: { seamanship: 2 },
      description: 'Three knots you did not have, and the ability to outrun something that wants to talk to you.',
      icon: 'sail',
    },
    {
      id: 'long_nines',
      name: 'A Pair of Long Nines',
      tags: ['ship', 'weapon'],
      equipSlot: 'ship_guns',
      skillModifiers: { gunnery: 2 },
      description: 'Two long-barrelled nine-pounders. Not many, but they reach further than anything a cutter should carry.',
      icon: 'cannon',
    },
    {
      id: 'surgeons_chest',
      name: 'A Surgeon’s Chest',
      tags: ['ship', 'medical'],
      equipSlot: 'ship_hold',
      skillModifiers: { medicine: 2 },
      description: 'Saw, needle, spirit, and forty pages of somebody else’s notes on fever.',
      icon: 'chest',
    },
    {
      id: 'stillpoint',
      name: 'The Stillpoint',
      tags: ['relic'],
      questItem: true,
      description: 'A palm-sized iron weight. Anything you hold it against stops moving — not stopped by force. Stopped.',
      loreText: 'It does exactly one thing and it has never done anything else.',
      icon: 'weight',
    },
    {
      id: 'the_hush',
      name: 'The Hush',
      tags: ['relic'],
      questItem: true,
      description: 'A cracked bell with no clapper. Ring it and for eleven seconds there is no sound anywhere inside forty feet.',
      icon: 'bell',
    },
    {
      id: 'salt_rations',
      name: 'Salt Rations',
      tags: ['supply'],
      stackable: true,
      maxStack: 8,
      consumable: { resourceId: 'supplies', amount: 15, consumesItem: true },
      description: 'Pork, biscuit, and whatever the last port had too much of.',
      icon: 'barrel',
    },
    {
      id: 'naval_blade',
      name: 'A Naval-Pattern Blade',
      tags: ['quest', 'weapon'],
      questItem: true,
      equipSlot: 'hand',
      skillModifiers: { blades: 2 },
      description: 'Fleet issue, service-worn, and the same pattern as the one that killed Ferro Vane.',
      icon: 'sword',
    },
  ],
  abilities: [
    {
      id: 'read_the_water',
      name: 'Read the Water',
      tags: ['utility', 'navigation'],
      description: 'Set, swell, colour and birds. Where the ground is, where the wind will be in an hour, and what is under you.',
      affordances: ['read the water', 'check the swell', 'look at the sea', 'work out the set'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 60,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'navigation', baseDc: 12 },
      unlockedByDefault: true,
    },
    {
      id: 'take_the_deck',
      name: 'Take the Deck',
      tags: ['social', 'command'],
      description: 'Stop the argument, give three orders, and have them followed before anybody decides not to.',
      affordances: ['take the deck', 'give the order', 'take command', 'settle it'],
      costs: [{ resourceId: 'stamina', amount: 8 }],
      cooldownMinutes: 90,
      targetRule: 'MULTI',
      check: { attribute: 'presence', skillId: 'command', baseDc: 13 },
      unlockedByDefault: true,
    },
    {
      id: 'boarding_rush',
      name: 'Boarding Rush',
      tags: ['offensive', 'blades'],
      description: 'Across the gap and onto their deck before the second volley. Everything after that is close work.',
      affordances: ['board them', 'rush the deck', 'go across', 'take the ship'],
      costs: [{ resourceId: 'stamina', amount: 14 }],
      cooldownMinutes: 30,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'blades', baseDc: 14 },
      unlockedByDefault: false,
    },
    {
      id: 'rake_her',
      name: 'Rake Her',
      tags: ['offensive', 'gunnery'],
      description: 'One pass across her stern with everything you have. It is the whole reason to own long guns.',
      affordances: ['rake her', 'cross her stern', 'give her the guns', 'fire everything'],
      costs: [{ resourceId: 'stamina', amount: 10 }],
      cooldownMinutes: 45,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'gunnery', baseDc: 14 },
      unlockedByDefault: false,
    },
    {
      id: 'ghost_the_hold',
      name: 'Ghost the Hold',
      tags: ['utility', 'larceny'],
      description: 'Down through the aft hatch while the watch is forward, and back up with whatever is worth carrying.',
      affordances: ['ghost the hold', 'get below', 'go through her hold', 'lift the cargo'],
      costs: [{ resourceId: 'stamina', amount: 9 }],
      cooldownMinutes: 40,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'larceny', baseDc: 14 },
      unlockedByDefault: false,
    },
    {
      id: 'set_the_terms',
      name: 'Set the Terms',
      tags: ['social', 'bargaining'],
      description: 'Decide what this is a negotiation about before the other person does.',
      affordances: ['set the terms', 'name my price', 'make the offer', 'negotiate'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 30,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bargaining', baseDc: 13 },
      unlockedByDefault: false,
    },
    {
      id: 'offer_a_berth',
      name: 'Offer a Berth',
      tags: ['social', 'recruit'],
      description:
        'Ask somebody to sail with you. Rolling well is how you get taken seriously; whether they come is theirs to decide.',
      affordances: [
        'offer them a berth',
        'ask them to join',
        'ask them to sail with me',
        'recruit them',
        'sign them on',
        'ask them to come with me',
        'offer them a place on the crew',
      ],
      costs: [{ resourceId: 'stamina', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'command', baseDc: 11 },
      unlockedByDefault: true,
    },
    {
      id: 'work_the_hull',
      name: 'Work the Hull',
      tags: ['utility', 'ship'],
      description: 'Caulk, patch and pump. Slow, unglamorous, and the difference between a storm and a wreck.',
      affordances: ['work the hull', 'patch her up', 'repair the ship', 'caulk the seams', 'fix the hull'],
      costs: [{ resourceId: 'stamina', amount: 16 }],
      cooldownMinutes: 240,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'seamanship', baseDc: 12 },
      unlockedByDefault: true,
    },
    {
      id: 'use_stillpoint',
      name: 'The Stillpoint',
      tags: ['relic'],
      description: 'Hold it against something moving and the movement stops. A blade, a wave, a falling spar, a man.',
      affordances: ['use the stillpoint', 'stop it', 'press the weight to it', 'hold the stillpoint against it'],
      costs: [{ resourceId: 'stamina', amount: 12 }],
      cooldownMinutes: 120,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: false,
      requires: {
        flagsSet: ['attuned_stillpoint'],
        lockedCopy: 'It is a lump of iron in your hand and it stays one.',
      },
    },
    {
      id: 'ring_the_hush',
      name: 'The Hush',
      tags: ['relic', 'utility'],
      description: 'Eleven seconds in which nothing within forty feet makes any sound at all, including you.',
      affordances: ['ring the hush', 'use the bell', 'silence it', 'ring the bell'],
      costs: [{ resourceId: 'stamina', amount: 10 }],
      cooldownMinutes: 180,
      targetRule: 'AREA',
      check: null,
      unlockedByDefault: false,
      requires: {
        flagsSet: ['attuned_hush'],
        lockedCopy: 'You swing it and it does what a bell with no clapper does.',
      },
    },
  ],
  locations: [
    {
      id: 'saltmarket',
      name: 'Saltmarket',
      shortName: 'Saltmarket',
      description:
        'Four hundred years of harbour built on top of itself. Fish, rope, customs men, and eleven taverns between the quay and the chandlery.',
      artDirection:
        'Crowded historical port town at dawn. Stone quay, masts, market stalls, laundry over narrow streets, gulls. Warm, busy, salt-stained.',
      connections: [
        { to: 'the_marrow', travelMinutes: 10, label: 'Down to the ship' },
        { to: 'the_yard', travelMinutes: 15, label: 'The shipyard' },
        { to: 'the_drift', travelMinutes: 600, label: 'East, to the Drift' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'salt_rations', qty: 2, ownerId: null, aka: ['rations', 'supplies', 'barrels'] },
        { itemId: 'ships_papers', qty: 1, ownerId: null, aka: ['papers', 'the papers', 'registration'] },
      ],
    },
    {
      id: 'the_marrow',
      name: 'The Marrow',
      shortName: 'Your Ship',
      description:
        'Forty feet of forty-year-old cutter with a cracked keel, one suit of tired sails, and nobody aboard her but you.',
      artDirection:
        'Small weathered single-masted sailing cutter at a quay, patched sails furled, worn but characterful. Interior below: cramped, wooden, lamplit.',
      connections: [
        { to: 'saltmarket', travelMinutes: 10, label: 'Up onto the quay' },
        { to: 'the_yard', travelMinutes: 20, label: 'Warp her round to the yard' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'naval_blade', qty: 1, ownerId: 'rook', aka: ['his blade', 'the blade', 'naval blade', 'rook’s sword'] },
        { itemId: 'salt_rations', qty: 3, ownerId: null, aka: ['rations', 'stores', 'food'] },
      ],
    },
    {
      id: 'the_yard',
      name: 'Corrow’s Yard',
      shortName: 'The Yard',
      description:
        'A slipway, three sheds, and a woman who can tell you what is wrong with your ship from sixty feet away and will, at length.',
      artDirection:
        'Working shipyard: slipway, timber stacks, a hull propped in a cradle, smoke from a steam box. Industrious, muddy, purposeful.',
      connections: [
        { to: 'saltmarket', travelMinutes: 15, label: 'Back into town' },
        { to: 'the_marrow', travelMinutes: 20, label: 'To the ship' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'topsails', qty: 1, ownerId: 'tolla', aka: ['topsails', 'sails', 'the new sails'] },
      ],
    },
    {
      id: 'the_drift',
      name: 'The Drift',
      shortName: 'The Drift',
      description:
        'A lawless port built across nine hulks lashed together and grown into each other. No flag, no customs, and a market that will sell you anything twice.',
      artDirection:
        'Enormous floating shantytown built from dozens of derelict ships lashed together, rope bridges, lanterns, hanging washing, permanent haze. Wondrous and squalid at once.',
      connections: [
        { to: 'saltmarket', travelMinutes: 600, label: 'West, to Saltmarket' },
        { to: 'stormlee', travelMinutes: 780, label: 'South, into the storm belt' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 0 },
      takeableItems: [
        { itemId: 'the_hush', qty: 1, ownerId: null, aka: ['bell', 'the bell', 'cracked bell', 'the hush'] },
        { itemId: 'long_nines', qty: 1, ownerId: 'harrow_bell', aka: ['long nines', 'the guns', 'cannon', 'nine-pounders'] },
        { itemId: 'surgeons_chest', qty: 1, ownerId: 'harrow_bell', aka: ['surgeon’s chest', 'medical chest', 'the chest'] },
        { itemId: 'salt_rations', qty: 4, ownerId: null, aka: ['rations', 'supplies', 'stores'] },
      ],
    },
    {
      id: 'stormlee',
      name: 'Stormlee',
      shortName: 'Stormlee',
      description:
        'An island inside a storm that has not stopped in living memory. The lee side is calm, green, and has one village on it that nobody leaves.',
      artDirection:
        'Island seen from the sea, ringed by a permanent towering storm wall, its lee side impossibly calm and green under a hole of blue sky. Awe and dread.',
      connections: [
        { to: 'the_drift', travelMinutes: 780, label: 'North, to the Drift' },
        { to: 'the_crownless', travelMinutes: 900, lockedByFlag: 'chart_complete', label: 'Where the compass points' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 3 },
      takeableItems: [
        { itemId: 'stillpoint', qty: 1, ownerId: null, aka: ['stillpoint', 'the weight', 'iron weight'] },
      ],
    },
    {
      id: 'the_crownless',
      name: 'The Crownless Sea',
      shortName: 'Crownless',
      description:
        'Nine hundred square miles of water that is on no chart printed in ninety years, and everything in it that is the reason for that.',
      artDirection:
        'An impossible seascape: still black water, no horizon line, structures rising from the sea that are not ships. Enormous, silent, wrong. Restrained palette.',
      connections: [{ to: 'stormlee', travelMinutes: 900, label: 'Back the way you came' }],
      discoveredByDefault: false,
      mapPosition: { x: 3, y: 5 },
    },
  ],
  factions: [
    {
      id: 'faction_fleet',
      name: 'The Ninth Fleet',
      description: 'The navy of the coastal kingdoms. They set the bounties, they own the charts, and one of their blades killed Ferro Vane.',
      startingReputation: 0,
      ranks: [
        { atReputation: -100, label: 'Four hundred crowns' },
        { atReputation: -40, label: 'Wanted' },
        { atReputation: 0, label: 'Unknown to them' },
        { atReputation: 30, label: 'Licensed' },
        { atReputation: 60, label: 'Under commission' },
      ],
    },
    {
      id: 'faction_free_captains',
      name: 'The Free Captains',
      description: 'Everyone sailing without a flag. Not an organisation — an agreement about a few things, honoured about half the time.',
      startingReputation: 0,
      ranks: [
        { atReputation: -100, label: 'Sold out your own' },
        { atReputation: 0, label: 'Nobody' },
        { atReputation: 25, label: 'Known at the Drift' },
        { atReputation: 55, label: 'A name' },
      ],
    },
    {
      id: 'faction_houses',
      name: 'The Merchant Houses',
      description: 'Four families who own most of what floats. They do not fight; they buy the people who do.',
      startingReputation: 0,
      ranks: [
        { atReputation: -100, label: 'A loss to be written off' },
        { atReputation: 0, label: 'Unregistered' },
        { atReputation: 25, label: 'Contracted' },
        { atReputation: 50, label: 'Preferred' },
      ],
    },
  ],
  characters: [
    {
      id: 'nessa',
      name: 'Nessa Vale',
      role: 'Navigator, wanted in three ports',
      cardBlurb:
        'The navigator who can read your guardian’s handwriting and will not tell you how she learned to. She offered to help you before you asked.',
      pronouns: 'she/her',
      publicTraits: ['Precise', 'Unbothered', 'Reads a room and says nothing'],
      hiddenDrives: ['She sailed with Ferro Vane for two years and never told you'],
      values: ['Getting it right', 'Paying what she owes'],
      fears: ['Being the reason somebody else dies for the Crownless Sea'],
      socialStyle: 'Answers the question you asked, not the one you meant.',
      boundaries: ['Will not sail for a merchant house', 'Will not talk about the warrant'],
      goals: ['Finish the chart Ferro started', 'Stay out of the Ninth Fleet’s hands'],
      secrets: [
        {
          id: 'nessa_sailed_with_ferro',
          fact: 'She was Ferro Vane’s navigator for two years and walked off his ship in Stormlee.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She will say it herself once she believes you are going all the way.',
        },
        {
          id: 'nessa_warrant',
          fact: 'Her warrant is for sinking a Ninth Fleet cutter that was firing on a fishing fleet.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only after you have crossed the Fleet yourself.',
        },
      ],
      speechStyle: 'Short declaratives. Gives you a number when a number will do.',
      topics: ['the torn chart', 'Ferro Vane', 'the Crownless Sea', 'her warrant', 'the Drift'],
      voiceSamples: [
        'Eleven days out, if the weather holds, which it will not.',
        'I knew him. That is all you get today.',
        'You are asking me to guess. I do not guess, I estimate, and it costs you an hour.',
      ],
      appearance:
        'Late thirties, weathered, cropped grey-black hair, a navy coat with the insignia cut off it.',
      visualHook: 'A navy coat with the rank patches deliberately cut away, threads still showing.',
      silhouette: 'Straight-backed, hands behind her, a long coat that does not move much.',
      artSeed: 'blackwake-nessa-01',
      portrait: 'blackwake/nessa',
      expressions: ['neutral', 'wry', 'grim'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'saltmarket', activity: 'asleep above the chandlery' },
        { startMinute: 360, endMinute: 780, locationId: 'saltmarket', activity: 'copying charts at the harbour table' },
        { startMinute: 780, endMinute: 1200, locationId: 'the_marrow', activity: 'looking over your ship without being asked' },
        { startMinute: 1200, endMinute: 1440, locationId: 'saltmarket', activity: 'the quiet end of the quay' },
      ],
      homeLocationId: 'saltmarket',
      knowledgeScope: ['ferro_vane', 'the_chart', 'crownless_sea', 'ninth_fleet'],
      startingRelationship: { trust: 10, affection: 0, respect: 5, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'nessa_tells_you',
          label: 'She tells you how she knows the handwriting',
          kind: 'TRUST',
          requires: { trust: 35, flagsSet: ['crew:nessa'] },
        },
      ],
      attributes: { might: 10, agility: 11, mind: 16, presence: 12, resolve: 14, arcana: 8 },
      companion: {
        station: 'Navigator',
        summary: 'She can find a coast in weather that hides it. Nothing east of Saltmarket happens without her.',
        joinsWhen: { flagsSet: ['spoke:nessa'] },
        refusalCopy:
          '"Not yet. You have a ship that will not take open water and no one to sail it. Come back when the Marrow floats properly."',
        acceptCopy:
          '"All right. I want the eastern third in my hands and I want to be the one who says when we turn back. Those are my terms."',
        grantsSkills: { navigation: 3, seamanship: 1 },
        wantsQuestId: 'q_what_nessa_owes',
        startingMorale: 60,
        moraleDriftPerDay: 0,
        reactions: [
          { flag: 'took_house_contract', morale: -25, note: 'She said she would not sail for a house and you did it anyway.' },
          { flag: 'chart_complete', morale: 20, note: 'Forty years of somebody else’s work, finished. She has not said anything for an hour.' },
          { flag: 'fired_on_fishing_boat', morale: -40, note: 'This is the exact thing she lost everything over.' },
          { flag: 'freed_the_pressed_men', morale: 15, note: 'She did not expect that from you.' },
        ],
        bonds: [
          { characterId: 'rook', value: -2, note: 'He was Fleet. She does not care that he left; she cares that he joined.' },
          { characterId: 'mako', value: 2, note: 'She likes people who say the number out loud.' },
        ],
        leavesWhen: [
          {
            id: 'nessa_house_flag',
            when: { flagsSet: ['took_house_contract'], moraleAtMost: null, trustAtMost: null, flagsUnset: [], afterWorldMinute: null },
            warningCopy: 'Nessa has not spoken to you since the contract was signed. She is packing charts, slowly, which is how she does things she has decided on.',
            departureCopy:
              'Nessa Vale puts her charts in the case, closes it, and steps off onto the quay. "I told you the one thing. Good luck with the rest of it."',
            toLocationId: 'saltmarket',
            setsFlags: ['nessa_gone'],
            betrayal: false,
          },
          {
            id: 'nessa_broken',
            when: { moraleAtMost: 12, trustAtMost: null, flagsSet: [], flagsUnset: [], afterWorldMinute: null },
            warningCopy: 'Nessa gives you the heading and nothing else. She has stopped correcting you when you are wrong, which is worse.',
            departureCopy:
              'Nessa Vale leaves the chart case on the table, which is the most generous thing she could have done, and goes ashore without waiting for you to argue.',
            toLocationId: 'the_drift',
            setsFlags: ['nessa_gone'],
            betrayal: false,
          },
        ],
        upkeepPerDay: 1,
      },
      combatant: { health: 26, defenseDc: 13, damage: 5, tags: ['ally'] },
    },
    {
      id: 'rook',
      name: 'Rook Arden',
      role: 'Ex-Ninth Fleet gunner',
      cardBlurb:
        'The gunner who walked off a Fleet ship and will not say what happened on it. He carries a naval-pattern blade — the same pattern that killed your guardian.',
      pronouns: 'he/him',
      publicTraits: ['Loud', 'Competent', 'Laughs before anybody else does'],
      hiddenDrives: ['He wants somebody to ask him about the blade and does not want to answer'],
      values: ['Doing the job properly', 'Not lying about what you did'],
      fears: ['Being the man everyone assumes he is'],
      socialStyle: 'Fills silence. Uses it to avoid the question.',
      boundaries: ['Will not fire on a boat that cannot fire back'],
      goals: ['Get far enough west that the Fleet stops mattering'],
      secrets: [
        {
          id: 'rook_the_blade',
          fact: 'His blade is the standard issue of the Ninth Fleet’s inshore squadron. He was in that squadron eleven days ago.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you before you find out, if you have earned it.',
        },
        {
          id: 'rook_did_not_do_it',
          fact: 'He did not kill Ferro Vane. He knows which officer did, and he ran rather than report it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only at high trust, or when he is cornered with the evidence.',
        },
      ],
      speechStyle: 'Fast, warm, deflects with a joke exactly one beat too early.',
      topics: ['the Ninth Fleet', 'his blade', 'the long nines', 'why he left'],
      voiceSamples: [
        'Two guns. Two good guns beats six bad ones and I will die on that.',
        'Ask me tomorrow. I am serious. Tomorrow I will tell you.',
        'I was on that ship. That is the true part.',
      ],
      appearance: 'Thirty, broad, powder-burn scarring up the right forearm, a good coat gone bad.',
      visualHook: 'Powder burns up the right forearm in a fan, like something exploded beside him.',
      silhouette: 'Wide shoulders, one arm always half-raised, mid-gesture.',
      artSeed: 'blackwake-rook-01',
      portrait: 'blackwake/rook',
      expressions: ['neutral', 'grinning', 'cornered'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'saltmarket', activity: 'asleep, badly' },
        { startMinute: 420, endMinute: 1020, locationId: 'the_yard', activity: 'making himself useful at the yard for nothing' },
        { startMinute: 1020, endMinute: 1440, locationId: 'saltmarket', activity: 'the loud end of the quay' },
      ],
      homeLocationId: 'saltmarket',
      knowledgeScope: ['ninth_fleet', 'gunnery', 'ferro_vane'],
      startingRelationship: { trust: 0, affection: 0, respect: 0, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'rook_tells_you',
          label: 'He tells you about the blade',
          kind: 'TRUST',
          requires: { trust: 30, flagsSet: ['crew:rook'] },
        },
      ],
      attributes: { might: 14, agility: 12, mind: 13, presence: 13, resolve: 10, arcana: 8 },
      companion: {
        station: 'Gunner',
        summary: 'Nobody else on this coast will lay a long nine at that range. He is also the reason the Fleet looks twice at you.',
        joinsWhen: { flagsSet: ['spoke:rook', 'knows:rook_left_the_fleet'] },
        refusalCopy:
          '"You do not want me. I mean that as information, not modesty. Ask around about me first and then ask again."',
        acceptCopy:
          '"Right. I am going to be honest with you once, now, and then you can decide. I was Ninth Fleet until nine days ago. Still want me?"',
        grantsSkills: { gunnery: 3, blades: 1 },
        wantsQuestId: 'q_what_rook_knows',
        startingMorale: 50,
        moraleDriftPerDay: 0,
        reactions: [
          { flag: 'fired_on_fishing_boat', morale: -35, note: 'This is the thing he left the Fleet over.' },
          { flag: 'rook_confessed', morale: 25, note: 'He said it out loud and the ship did not end.' },
          { flag: 'took_fleet_commission', morale: -30, note: 'You signed the paper he tore up.' },
          { flag: 'long_nines_mounted', morale: 15, note: 'He has been talking about the guns for two days.' },
        ],
        bonds: [
          { characterId: 'nessa', value: -1, note: 'He knows exactly why she looks at him like that and thinks she is right.' },
          { characterId: 'veyra', value: -3, note: 'He will not be on the same deck as her. That is not a preference.' },
        ],
        leavesWhen: [
          {
            id: 'rook_fleet_commission',
            when: { flagsSet: ['took_fleet_commission'], moraleAtMost: null, trustAtMost: null, flagsUnset: [], afterWorldMinute: null },
            warningCopy: 'Rook has gone very quiet about the commission, which for Rook is an alarm.',
            departureCopy:
              'Rook Arden leaves his kit and takes only the blade. "I am not going back under them. Not for you, not for the money, not for the sea."',
            toLocationId: 'the_drift',
            setsFlags: ['rook_gone'],
            betrayal: false,
          },
          {
            id: 'rook_never_asked',
            when: { moraleAtMost: 15, trustAtMost: 5, flagsSet: [], flagsUnset: ['rook_confessed'], afterWorldMinute: null },
            warningCopy: 'Rook keeps starting a sentence about the blade and stopping. He has done it three times today.',
            departureCopy:
              'Rook Arden is not aboard in the morning, and neither is a week of your supplies. He left the guns, which he did not have to do.',
            toLocationId: null,
            setsFlags: ['rook_gone', 'rook_took_supplies'],
            betrayal: true,
          },
        ],
        upkeepPerDay: 2,
      },
      combatant: { health: 34, defenseDc: 14, damage: 8, tags: ['ally'] },
    },
    {
      id: 'mako',
      name: 'Mako Renn',
      role: 'Diver, sixteen, absolutely certain',
      cardBlurb:
        'Sixteen, dives deeper than anyone in Saltmarket, and has decided she is coming whether you agree or not. She knows where a relic sank.',
      pronouns: 'she/her',
      publicTraits: ['Fearless in a way that is not always brave', 'Blunt', 'Funny on purpose'],
      hiddenDrives: ['She wants to be the one they tell stories about, and knows that is stupid'],
      values: ['Saying the true number', 'Not being sent home'],
      fears: ['Being left ashore', 'Being treated as the kid'],
      socialStyle: 'Argues immediately, forgets about it immediately.',
      boundaries: ['Do not tell her to stay on the ship'],
      goals: ['Find the wreck her brother went down on', 'Be crew, properly'],
      secrets: [
        {
          id: 'mako_the_wreck',
          fact: 'Her brother died on the wreck where the Stillpoint is. She knows exactly where it is and has never gone back.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you when the ship is finally going that way.',
        },
      ],
      speechStyle: 'Runs sentences together. Says the important thing last and quietly.',
      topics: ['the wreck', 'her brother', 'diving', 'the Stillpoint'],
      voiceSamples: [
        'Nine fathoms is nothing. Fourteen is something. I have done sixteen.',
        'You are going to say I am too young and then I am going to do it anyway.',
        'I know where it is. I have always known where it is.',
      ],
      appearance: 'Sixteen, small, salt-bleached hair, ears scarred from pressure.',
      visualHook: 'Both ears heavily scarred from repeated pressure damage — she notices you noticing.',
      silhouette: 'Compact, always half-crouched on something she should not be standing on.',
      artSeed: 'blackwake-mako-01',
      portrait: 'blackwake/mako',
      expressions: ['neutral', 'delighted', 'stubborn'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'saltmarket', activity: 'asleep under an upturned boat' },
        { startMinute: 300, endMinute: 900, locationId: 'saltmarket', activity: 'diving the harbour for dropped cargo' },
        { startMinute: 900, endMinute: 1440, locationId: 'the_yard', activity: 'getting in the way at the yard' },
      ],
      homeLocationId: 'saltmarket',
      knowledgeScope: ['diving', 'the_wreck', 'stillpoint'],
      startingRelationship: { trust: 5, affection: 5, respect: 0, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'mako_tells_you',
          label: 'She tells you about her brother',
          kind: 'TRUST',
          requires: { trust: 25, flagsSet: ['crew:mako'] },
        },
      ],
      attributes: { might: 9, agility: 16, mind: 12, presence: 11, resolve: 13, arcana: 9 },
      companion: {
        station: 'Diver',
        summary: 'Whatever is under the water, she is the only reason you will ever hold it.',
        joinsWhen: { flagsSet: ['spoke:mako'] },
        refusalCopy:
          '"You have not got a ship yet. I am not standing on a quay saying I am crew of a boat that cannot leave. Fix it and ask me again."',
        acceptCopy:
          '"Obviously. I have been telling you that for two days. Do not put me on the tiller, put me over the side."',
        grantsSkills: { larceny: 2, seamanship: 1 },
        wantsQuestId: 'q_what_mako_lost',
        startingMorale: 70,
        moraleDriftPerDay: -1,
        reactions: [
          { flag: 'left_mako_ashore', morale: -30, note: 'The one thing. You did the one thing.' },
          { flag: 'stillpoint_recovered', morale: 25, note: 'She went back down to the place her brother did not come up from.' },
          { flag: 'crew_fed', morale: 10, note: 'She eats like somebody who has been hungry.' },
        ],
        bonds: [
          { characterId: 'nessa', value: 2, note: 'She wants Nessa to say she did well and will not admit it.' },
          { characterId: 'rook', value: 1, note: 'He is the only one who talks to her like crew.' },
        ],
        leavesWhen: [
          {
            id: 'mako_left_ashore',
            when: { flagsSet: ['left_mako_ashore'], moraleAtMost: 30, trustAtMost: null, flagsUnset: [], afterWorldMinute: null },
            warningCopy: 'Mako has not asked to go over the side once today. She has asked how far it is to the Drift twice.',
            departureCopy:
              'Mako Renn takes her line and her weights and goes. "You left me on a beach. I am not doing that twice, I am not, I told you."',
            toLocationId: 'saltmarket',
            setsFlags: ['mako_gone'],
            betrayal: false,
          },
          {
            id: 'mako_starved',
            when: { moraleAtMost: 8, trustAtMost: null, flagsSet: [], flagsUnset: [], afterWorldMinute: null },
            warningCopy: 'Mako is thin and has stopped arguing with you, which is not her.',
            departureCopy:
              'Mako Renn goes over the side at the Drift and swims for it rather than have the conversation.',
            toLocationId: 'the_drift',
            setsFlags: ['mako_gone'],
            betrayal: false,
          },
        ],
        upkeepPerDay: 1,
      },
      combatant: { health: 20, defenseDc: 15, damage: 4, tags: ['ally'] },
    },
    {
      id: 'veyra',
      name: 'Captain Veyra Sol',
      role: 'Ninth Fleet, inshore squadron',
      cardBlurb:
        'The Fleet captain hunting you, who is polite about it, and who was standing in the workshop doorway the night your guardian died.',
      pronouns: 'she/her',
      publicTraits: ['Courteous', 'Patient', 'Never raises her voice'],
      hiddenDrives: ['She believes the Crownless Sea has to stay off the charts and will do anything for that'],
      values: ['Order', 'The nine hundred people she keeps alive by keeping it quiet'],
      fears: ['That she is wrong about the necessity of it'],
      socialStyle: 'Treats every conversation as one she has already had.',
      boundaries: ['Will not fire first in a harbour'],
      goals: ['Recover the eastern third', 'End the search without ending you, if she can'],
      secrets: [
        {
          id: 'veyra_ordered_it',
          fact: 'She gave the order that killed Ferro Vane. She did not expect it to be carried out that way.',
          visibility: 'CREATOR_ONLY',
          revealHint: 'She says it herself, at the end, without being asked.',
        },
        {
          id: 'veyra_has_been',
          fact: 'She has been to the Crownless Sea. Eleven of her crew did not come back and she is not certain they died.',
          visibility: 'CREATOR_ONLY',
          revealHint: 'Only in the Crownless Sea itself.',
        },
      ],
      speechStyle: 'Complete sentences, no contractions, never hurried.',
      topics: ['the chart', 'Ferro Vane', 'the Crownless Sea', 'your bounty'],
      voiceSamples: [
        'You may put the chart on the table and we will both go home.',
        'I am not going to pretend I am sorry in a way you would believe.',
        'There is a reason it is not on the charts. You will not like it, and you will not accept it.',
      ],
      appearance: 'Fifty, silver-cropped, immaculate coat, one glove always on.',
      visualHook: 'One glove never removed, on the left hand, even at table.',
      silhouette: 'Upright, hands clasped behind, a coat that reaches the deck.',
      artSeed: 'blackwake-veyra-01',
      portrait: 'blackwake/veyra',
      expressions: ['neutral', 'regretful', 'implacable'],
      schedule: [],
      homeLocationId: null,
      knowledgeScope: ['ninth_fleet', 'crownless_sea', 'ferro_vane', 'the_chart'],
      startingRelationship: { trust: 0, affection: 0, respect: 0, fear: 0, rivalry: 10 },
      gates: [],
      attributes: { might: 12, agility: 12, mind: 16, presence: 16, resolve: 16, arcana: 10 },
      companion: null,
      combatant: { health: 60, defenseDc: 17, damage: 12, tags: ['fleet', 'officer'] },
    },
    {
      id: 'tolla',
      name: 'Tolla Corrow',
      role: 'Shipwright, owns the yard',
      cardBlurb:
        'The shipwright who can make the Marrow seaworthy and who will tell you, at length and for free, everything else that is wrong with her.',
      pronouns: 'she/her',
      publicTraits: ['Blunt', 'Fair', 'Cannot stop diagnosing things'],
      hiddenDrives: ['She liked Ferro and is angry that she cannot say so usefully'],
      values: ['Good work', 'Being paid for good work'],
      fears: ['Watching another of Ferro’s people drown'],
      socialStyle: 'Tells you the price and the reason for the price.',
      boundaries: ['Will not work on credit twice'],
      goals: ['Keep the yard open', 'Not attend another funeral for this'],
      secrets: [
        {
          id: 'tolla_the_survey',
          fact: 'Ferro paid her for a keel nine years ago and then spent the money on the eastern third of the chart instead.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She mentions it the moment you ask about the survey.',
        },
      ],
      speechStyle: 'Lists. Numbers. One joke per conversation, delivered flat.',
      topics: ['the keel', 'the hull survey', 'Ferro Vane', 'the topsails', 'what a refit costs'],
      voiceSamples: [
        'Cracked, not broken. That is a real distinction and it costs you eleven days.',
        'He paid me for this nine years ago. I still have the money. Do not make it a thing.',
        'You can have it fast or you can have it float.',
      ],
      appearance: 'Sixties, forearms like cable, sawdust permanently in one eyebrow.',
      visualHook: 'A carpenter’s rule tucked behind one ear at all times, worn silver at the folds.',
      silhouette: 'Squat and planted, always holding something heavy in one hand.',
      artSeed: 'blackwake-tolla-01',
      portrait: 'blackwake/tolla',
      expressions: ['neutral', 'exasperated', 'softened'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'the_yard', activity: 'asleep in the office' },
        { startMinute: 360, endMinute: 1140, locationId: 'the_yard', activity: 'working' },
        { startMinute: 1140, endMinute: 1440, locationId: 'saltmarket', activity: 'the same table every night' },
      ],
      homeLocationId: 'the_yard',
      knowledgeScope: ['ferro_vane', 'the_marrow', 'shipbuilding'],
      startingRelationship: { trust: 15, affection: 5, respect: 0, fear: 0, rivalry: 0 },
      gates: [],
      attributes: { might: 14, agility: 10, mind: 14, presence: 11, resolve: 13, arcana: 8 },
      companion: null,
      combatant: null,
    },
    {
      id: 'harrow_bell',
      name: 'Harrow Bell',
      role: 'Broker at the Drift',
      cardBlurb:
        'The broker who will sell you the western two-thirds of your own chart, and who wants to know who else is asking for it.',
      pronouns: 'they/them',
      publicTraits: ['Delighted by everything', 'Remembers every price ever paid'],
      hiddenDrives: ['They are quietly funding three separate searches for the Crownless Sea'],
      values: ['A clean trade', 'Knowing first'],
      fears: ['A world where the Drift has a flag over it'],
      socialStyle: 'Answers a question with a better question and a price.',
      boundaries: ['Does not sell people'],
      goals: ['Own the last third of the chart', 'Keep the Fleet out of the Drift'],
      secrets: [
        {
          id: 'harrow_has_the_west',
          fact: 'They have had the western two-thirds of Ferro’s chart for six years and never found the east.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The moment they see what you are carrying.',
        },
      ],
      speechStyle: 'Warm, quick, always closing.',
      topics: ['the western chart', 'the Crownless Sea', 'the Hush', 'what the Fleet is paying'],
      voiceSamples: [
        'Oh, that is the east. That is the actual east. Sit down.',
        'I will not insult you with a first offer. I will insult you with a second.',
        'Four hundred crowns is what they are paying. For you. Personally. Congratulations.',
      ],
      appearance: 'Forties, enormously well dressed in nine different mismatched things.',
      visualHook: 'Nine rings, one on every finger but the left index, which is bare and scarred.',
      silhouette: 'Layered coats and hanging chains; a shape with too many edges.',
      artSeed: 'blackwake-harrow-01',
      portrait: 'blackwake/harrow',
      expressions: ['neutral', 'delighted', 'careful'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'the_drift', activity: 'asleep among the ledgers' },
        { startMinute: 480, endMinute: 1440, locationId: 'the_drift', activity: 'at the table under the lantern' },
      ],
      homeLocationId: 'the_drift',
      knowledgeScope: ['the_chart', 'crownless_sea', 'the_drift', 'relics'],
      startingRelationship: { trust: 0, affection: 0, respect: 0, fear: 0, rivalry: 0 },
      gates: [],
      attributes: { might: 9, agility: 11, mind: 16, presence: 15, resolve: 12, arcana: 11 },
      companion: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_make_her_float',
      title: 'Make Her Float',
      summary: 'The Marrow has a cracked keel. Nothing else in this story happens until that is not true.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['tolla', 'nessa', 'mako'],
      involvedLocationIds: ['saltmarket', 'the_marrow', 'the_yard'],
      knownRewardCopy: 'A ship that can leave the harbour.',
      steps: [
        {
          id: 'see_the_damage',
          playerCopy: 'Get someone who knows hulls to look at the Marrow.',
          directorNotes:
            'Tolla Corrow is at the yard and will look for nothing. The bad news is specific: cracked keel, eleven days, and a price.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ask_tolla',
              label: 'Ask Tolla Corrow at the yard',
              predicate: { flagsSet: ['spoke:tolla'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['knows:the_keel'],
              closesFlags: [],
            },
            {
              routeId: 'find_the_papers',
              label: 'Read the hull survey yourself',
              predicate: { flagsSet: [], flagsUnset: [], hasItems: ['ships_papers'], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['knows:the_keel'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 30, items: [], flags: [], abilities: [], reputation: [] },
        },
        {
          id: 'pay_for_the_keel',
          playerCopy: 'Get the keel replaced. Tolla will not do it for nothing twice.',
          directorNotes:
            'Four ways, and they are genuinely different: work for a merchant house, work for the Fleet, sell something of Ferro’s, or do the labour yourself over eleven days.',
          enterWhen: { flagsSet: ['knows:the_keel'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'house_money',
              label: 'Run a cargo for a merchant house',
              predicate: { flagsSet: [], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [{ factionId: 'faction_houses', value: 15 }], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['took_house_contract'],
              closesFlags: [],
            },
            {
              routeId: 'fleet_money',
              label: 'Take a Ninth Fleet commission',
              predicate: { flagsSet: [], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [{ factionId: 'faction_fleet', value: 25 }], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['took_fleet_commission'],
              closesFlags: [],
            },
            {
              routeId: 'your_own_hands',
              label: 'Do the work yourself, and take the time it takes',
              predicate: { flagsSet: ['used:work_the_hull'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['built_her_yourself'],
              closesFlags: [],
            },
            {
              routeId: 'tolla_relents',
              label: 'Get Tolla to tell you about the money Ferro left with her',
              predicate: { flagsSet: [], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [{ characterId: 'tolla', dimension: 'trust', value: 30 }], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['ferros_money'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [{ itemId: 'new_keel', qty: 1 }],
            flags: ['she_floats'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'find_four_hands',
          playerCopy: 'A ship needs four people. Find three who will come.',
          directorNotes:
            'Nessa, Rook and Mako each want something different first. This step is the crew system announcing itself: none of them are automatic.',
          enterWhen: { flagsSet: ['she_floats'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'full_crew',
              label: 'All three aboard',
              predicate: { flagsSet: ['crew:nessa', 'crew:rook', 'crew:mako'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['crew_of_four', 'crew_fed'],
              closesFlags: [],
            },
            {
              routeId: 'short_handed',
              label: 'Sail short-handed with Nessa and whoever else you got',
              predicate: { flagsSet: ['crew:nessa'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['short_handed'],
              closesFlags: [],
            },
            {
              routeId: 'press_them',
              label: 'Take a crew the way the Fleet does',
              predicate: { flagsSet: ['pressed_a_crew'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['crew_of_four'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['can_sail'],
            abilities: ['set_the_terms'],
            reputation: [{ factionId: 'faction_free_captains', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_on_the_books',
      title: 'On the Books',
      summary: 'The Marrow has not been registered in nine years. Fixing that makes her legal, and makes you findable.',
      kind: 'LEAD',
      involvedCharacterIds: ['tolla', 'nessa'],
      involvedLocationIds: ['saltmarket', 'the_yard'],
      knownRewardCopy: 'A ship the Ninth Fleet has no reason to stop. And a name in their ledger.',
      discoverWhen: { flagsSet: ['knows:the_keel'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
      steps: [
        {
          id: 'register_her',
          playerCopy: 'Get the Marrow onto the harbour register.',
          directorNotes:
            'This is the one place in the story where the Ninth Fleet is just a clerk at a desk. Nessa will not come with you and will not say why.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'file_the_papers',
              label: 'File Ferro’s papers at the harbour office',
              predicate: { flagsSet: [], flagsUnset: [], hasItems: ['ships_papers'], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['marrow_registered'],
              closesFlags: [],
            },
            {
              routeId: 'pay_the_fee',
              label: 'Pay the nine-year arrears with a house’s credit',
              predicate: { flagsSet: [], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [{ factionId: 'faction_houses', value: 10 }], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['marrow_registered', 'house_holds_your_paper'],
              closesFlags: [],
            },
            {
              routeId: 'never_register',
              label: 'Do not. Sail her unregistered and stay off the ledger.',
              predicate: { flagsSet: ['visited:the_marrow'], flagsUnset: ['marrow_registered'], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['sailing_unregistered'],
              closesFlags: ['marrow_registered'],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: [],
            abilities: [],
            reputation: [{ factionId: 'faction_fleet', amount: 30 }],
          },
        },
      ],
    },
    {
      id: 'q_the_western_thirds',
      title: 'The Western Thirds',
      summary: 'You have the east. Somebody has the rest, and they have been waiting six years for you to walk in.',
      kind: 'MAIN',
      involvedCharacterIds: ['harrow_bell', 'nessa', 'veyra'],
      involvedLocationIds: ['the_drift', 'saltmarket'],
      knownRewardCopy: 'A whole chart, and a heading nobody else has.',
      discoverWhen: { flagsSet: ['can_sail'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
      steps: [
        {
          id: 'reach_the_drift',
          playerCopy: 'Sail east to the Drift.',
          directorNotes:
            'Ten hours of open water. The first time the crew are all in one place with nothing to do, which is when they start talking to each other.',
          succeedWhen: { flagsSet: ['visited:the_drift'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
          succeedWhenAny: [],
          rewards: { xp: 60, items: [], flags: ['knows:the_drift'], abilities: [], reputation: [{ factionId: 'faction_free_captains', amount: 10 }] },
        },
        {
          id: 'harrows_price',
          playerCopy: 'Get the western two-thirds out of Harrow Bell.',
          directorNotes:
            'Harrow does not want money. They want to know who else is asking, or a relic, or a share of what you find.',
          enterWhen: { flagsSet: ['knows:the_drift'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'trade_the_hush',
              label: 'Trade them something nobody else has',
              predicate: { flagsSet: [], flagsUnset: [], hasItems: ['the_hush'], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['paid_harrow_in_kind'],
              closesFlags: [],
            },
            {
              routeId: 'tell_them_about_veyra',
              label: 'Tell them who else is hunting the chart',
              predicate: { flagsSet: ['knows:veyra_hunts_you'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['harrow_owes_you'],
              closesFlags: [],
            },
            {
              routeId: 'a_name_at_the_drift',
              label: 'Be somebody the Drift will not let be robbed',
              predicate: { flagsSet: [], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [{ factionId: 'faction_free_captains', value: 40 }], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['harrow_respects_you'],
              closesFlags: [],
            },
            {
              routeId: 'take_it',
              label: 'Go into the ledger room and take it',
              predicate: { flagsSet: ['used:ghost_the_hold'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['robbed_harrow'],
              closesFlags: ['harrow_owes_you'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['chart_complete'],
            abilities: ['ghost_the_hold'],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_fit_her_out',
      title: 'Fit Her Out',
      summary: 'A sound hull gets you to the Drift. It does not get you through the storm belt.',
      kind: 'MAIN',
      involvedCharacterIds: ['tolla', 'rook', 'harrow_bell'],
      involvedLocationIds: ['the_yard', 'the_drift'],
      knownRewardCopy: 'A ship that can outrun, outreach or outlast what is coming.',
      discoverWhen: { flagsSet: ['can_sail'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
      steps: [
        {
          id: 'choose_her_shape',
          playerCopy: 'Decide what the Marrow is for, and fit her for it.',
          directorNotes:
            'Three shapes, and a player can eventually have all three, but not before Stormlee. Speed, reach, or the ability to keep people alive.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'fit_topsails',
              label: 'Cut topsails: three knots you did not have',
              predicate: { flagsSet: [], flagsUnset: [], hasItems: ['topsails'], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['topsails_bent', 'ship_upgraded'],
              closesFlags: [],
            },
            {
              routeId: 'fit_guns',
              label: 'A pair of long nines: reach nothing this size should have',
              predicate: { flagsSet: [], flagsUnset: [], hasItems: ['long_nines'], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['long_nines_mounted', 'ship_upgraded'],
              closesFlags: [],
            },
            {
              routeId: 'fit_surgeon',
              label: 'A surgeon’s chest: the hour after the fight',
              predicate: { flagsSet: [], flagsUnset: [], hasItems: ['surgeons_chest'], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['chest_aboard', 'ship_upgraded'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: [],
            abilities: ['rake_her'],
            reputation: [],
          },
        },
        {
          id: 'storm_ready',
          playerCopy: 'Get the Marrow through the storm belt to Stormlee.',
          directorNotes:
            'The hull resource is the whole check here. A ship at low hull loses this and the world says so before it happens.',
          enterWhen: { flagsSet: ['ship_upgraded'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
          succeedWhen: { flagsSet: ['visited:stormlee'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
          succeedWhenAny: [],
          rewards: {
            xp: 160,
            items: [],
            flags: ['knows:stormlee'],
            abilities: ['boarding_rush'],
            reputation: [{ factionId: 'faction_free_captains', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_what_nessa_owes',
      title: 'What Nessa Owes',
      summary: 'She sailed with Ferro for two years and walked off his ship in Stormlee. She has never said why.',
      kind: 'SIDE',
      involvedCharacterIds: ['nessa'],
      involvedLocationIds: ['stormlee', 'the_marrow'],
      knownRewardCopy: 'The half of the story your guardian never told you.',
      discoverWhen: { flagsSet: ['crew:nessa'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
      steps: [
        {
          id: 'she_tells_you',
          playerCopy: 'Get Nessa to say how she knows Ferro’s handwriting.',
          directorNotes:
            'She will not be pushed. Trust, or being in Stormlee where it happened, or having crossed the Fleet the way she did.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'earned_it',
              label: 'She decides you have earned it',
              predicate: { flagsSet: [], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [{ characterId: 'nessa', dimension: 'trust', value: 35 }], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['knows:nessa_and_ferro'],
              closesFlags: [],
            },
            {
              routeId: 'standing_there',
              label: 'Ask her in Stormlee, where she left him',
              predicate: { flagsSet: [], flagsUnset: [], hasItems: [], atLocation: 'stormlee', completedEvents: [], minRelationship: [{ characterId: 'nessa', dimension: 'trust', value: 20 }], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['knows:nessa_and_ferro'],
              closesFlags: [],
            },
            {
              routeId: 'same_enemy',
              label: 'Cross the Ninth Fleet the way she did',
              predicate: { flagsSet: ['freed_the_pressed_men'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['knows:nessa_and_ferro', 'knows:nessa_warrant'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['knows:ferro_was_close'],
            abilities: ['read_the_water'],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_what_rook_knows',
      title: 'What Rook Knows',
      summary: 'He carries the same blade that killed your guardian, and he keeps starting the sentence.',
      kind: 'SIDE',
      involvedCharacterIds: ['rook', 'veyra'],
      involvedLocationIds: ['saltmarket', 'the_marrow'],
      knownRewardCopy: 'A name. The officer who gave the order.',
      discoverWhen: { flagsSet: ['spoke:rook'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
      steps: [
        {
          id: 'why_he_left',
          playerCopy: 'Find out why Rook Arden walked off a Ninth Fleet ship.',
          directorNotes:
            'Everyone in Saltmarket half knows. Rook will tell you himself if asked plainly; Harrow will sell it; the Fleet’s own paper says it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ask_him',
              label: 'Ask him straight',
              predicate: { flagsSet: ['spoke:rook'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [{ characterId: 'rook', dimension: 'trust', value: 10 }], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['knows:rook_left_the_fleet'],
              closesFlags: [],
            },
            {
              routeId: 'ask_the_quay',
              label: 'Ask anyone else on the quay',
              predicate: { flagsSet: ['spoke:tolla'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['knows:rook_left_the_fleet'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 50, items: [], flags: [], abilities: [], reputation: [] },
        },
        {
          id: 'the_blade',
          playerCopy: 'Find out where Rook’s blade was eleven days ago.',
          directorNotes:
            'The honest route costs him everything to say and is worth the most. The other routes get the fact and cost the relationship.',
          enterWhen: { flagsSet: ['knows:rook_left_the_fleet', 'crew:rook'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_says_it',
              label: 'He tells you himself',
              predicate: { flagsSet: [], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [{ characterId: 'rook', dimension: 'trust', value: 30 }], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['rook_confessed', 'knows:the_order_came_from_above'],
              closesFlags: [],
            },
            {
              routeId: 'take_the_blade',
              label: 'Take the blade and match it yourself',
              predicate: { flagsSet: [], flagsUnset: [], hasItems: ['naval_blade'], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['knows:the_order_came_from_above'],
              closesFlags: ['rook_confessed'],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['knows:veyra_hunts_you'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_what_mako_lost',
      title: 'What Mako Lost',
      summary: 'She knows where a relic is because she watched her brother drown getting to it.',
      kind: 'SIDE',
      involvedCharacterIds: ['mako'],
      involvedLocationIds: ['stormlee'],
      knownRewardCopy: 'The Stillpoint, and Mako back on the boat afterwards.',
      discoverWhen: { flagsSet: ['crew:mako'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
      steps: [
        {
          id: 'go_back',
          playerCopy: 'Take Mako to the wreck off Stormlee.',
          directorNotes:
            'She has never gone back. Getting there is the whole step; whether she goes down is a scene, not a check.',
          succeedWhen: { flagsSet: ['visited:stormlee', 'crew:mako'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
          succeedWhenAny: [],
          rewards: { xp: 70, items: [], flags: ['knows:the_wreck'], abilities: [], reputation: [] },
        },
        {
          id: 'bring_it_up',
          playerCopy: 'Get the Stillpoint out of the wreck.',
          directorNotes:
            'Fourteen fathoms. Mako can do it, or the player can go down with the Hush ringing, or nobody goes and she has to live with that.',
          enterWhen: { flagsSet: ['knows:the_wreck'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_dives',
              label: 'Let Mako go down',
              predicate: { flagsSet: [], flagsUnset: [], hasItems: ['stillpoint'], atLocation: null, completedEvents: [], minRelationship: [{ characterId: 'mako', dimension: 'trust', value: 20 }], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['stillpoint_recovered', 'attuned_stillpoint', 'mako_went_back'],
              closesFlags: [],
            },
            {
              routeId: 'you_dive',
              label: 'Go down yourself with the Hush ringing and leave her on deck',
              predicate: { flagsSet: [], flagsUnset: [], hasItems: ['stillpoint', 'the_hush'], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['stillpoint_recovered', 'attuned_stillpoint', 'left_mako_ashore'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 180,
            items: [],
            flags: [],
            abilities: ['use_stillpoint'],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_cracked_bell',
      title: 'The Cracked Bell',
      summary: 'A bell with no clapper, on a table at the Drift, that nobody will explain and everybody moves away from.',
      kind: 'LEAD',
      involvedCharacterIds: ['harrow_bell', 'nessa'],
      involvedLocationIds: ['the_drift'],
      knownRewardCopy: 'Eleven seconds of absolute silence, whenever you want them.',
      discoverWhen: { flagsSet: ['visited:the_drift'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
      steps: [
        {
          id: 'work_out_what_it_does',
          playerCopy: 'Get hold of the cracked bell and find out what it actually does.',
          directorNotes:
            'A relic breaks exactly one rule and nothing else. The Hush kills sound inside forty feet for eleven seconds. It does not make you invisible, it does not stop a blade, and it never does two things.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'harrow_explains',
              label: 'Get Harrow Bell to say what they know about it',
              predicate: { flagsSet: ['spoke:harrow_bell'], flagsUnset: [], hasItems: ['the_hush'], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['knows:relics_break_one_rule'],
              closesFlags: [],
            },
            {
              routeId: 'ring_it_and_see',
              label: 'Ring it and find out',
              predicate: { flagsSet: ['inspected:the_hush'], flagsUnset: [], hasItems: ['the_hush'], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['knows:relics_break_one_rule'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['attuned_hush'],
            abilities: ['ring_the_hush'],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_pressed_men',
      title: 'The Pressed Men',
      summary: 'The Ninth Fleet takes crews the way it always has. What you do about that is what your bounty is made of.',
      kind: 'SIDE',
      involvedCharacterIds: ['veyra', 'nessa', 'rook'],
      involvedLocationIds: ['saltmarket', 'the_drift'],
      knownRewardCopy: 'A reputation. Whichever one you chose.',
      discoverWhen: { flagsSet: ['can_sail'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
      steps: [
        {
          id: 'the_press_gang',
          playerCopy: 'Nine men are being taken off the quay at Saltmarket. Decide what that is to you.',
          directorNotes:
            'This is the bounty system stated plainly: the same act reads as heroism to one faction and piracy to another, and none of it is about how strong the player is.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'free_them',
              label: 'Take them back off the Fleet',
              predicate: { flagsSet: ['attacked:veyra'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['freed_the_pressed_men'],
              closesFlags: ['took_fleet_commission'],
            },
            {
              routeId: 'buy_them',
              label: 'Buy them out with a merchant house’s money',
              predicate: { flagsSet: ['took_house_contract'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['bought_them_out'],
              closesFlags: [],
            },
            {
              routeId: 'fire_on_the_boat',
              label: 'Fire on the boat carrying them away',
              predicate: { flagsSet: ['used:rake_her'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['fired_on_fishing_boat'],
              closesFlags: ['freed_the_pressed_men'],
            },
            {
              routeId: 'take_them_yourself',
              label: 'Take the ones the Fleet did not want',
              predicate: { flagsSet: ['visited:saltmarket'], flagsUnset: ['freed_the_pressed_men'], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['pressed_a_crew'],
              closesFlags: ['freed_the_pressed_men'],
            },
          ],
          rewards: { xp: 90, items: [], flags: [], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_crownless',
      title: 'The Crownless Sea',
      summary: 'Forty years of one man’s life, and the reason a captain of the Ninth Fleet had him killed for it.',
      kind: 'MAIN',
      involvedCharacterIds: ['veyra', 'nessa', 'harrow_bell'],
      involvedLocationIds: ['stormlee', 'the_crownless'],
      knownRewardCopy: 'The thing that is not on any chart, and the reason it is not.',
      discoverWhen: { flagsSet: ['chart_complete'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
      steps: [
        {
          id: 'the_heading',
          playerCopy: 'Take the whole chart to Stormlee and get a heading out of it.',
          directorNotes:
            'The compass and the completed chart agree on a point of ocean that is nine hundred miles from anywhere. This is the last quiet scene.',
          succeedWhen: { flagsSet: ['visited:stormlee', 'chart_complete'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
          succeedWhenAny: [],
          rewards: { xp: 120, items: [], flags: ['knows:the_heading'], abilities: [], reputation: [] },
        },
        {
          id: 'veyra_asks',
          playerCopy: 'Captain Veyra Sol is waiting at the edge of the storm belt. She wants to talk first.',
          directorNotes:
            'She offers the chart back and everyone goes home. She means it. The player can take it, refuse it, or find out what she is protecting.',
          enterWhen: { flagsSet: ['knows:the_heading'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'run_the_blockade',
              label: 'Go past her',
              predicate: { flagsSet: ['visited:the_crownless'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['ran_the_blockade'],
              closesFlags: [],
            },
            {
              routeId: 'hear_her_out',
              label: 'Let her tell you what happened to her eleven',
              predicate: { flagsSet: ['spoke:veyra'], flagsUnset: [], hasItems: [], atLocation: null, completedEvents: [], minRelationship: [{ characterId: 'veyra', dimension: 'respect', value: 20 }], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['knows:what_she_lost'],
              closesFlags: [],
            },
            {
              routeId: 'give_it_back',
              label: 'Put the chart on the table',
              predicate: { flagsSet: ['spoke:veyra'], flagsUnset: ['ran_the_blockade'], hasItems: ['torn_chart'], atLocation: null, completedEvents: [], minRelationship: [{ characterId: 'veyra', dimension: 'trust', value: 15 }], minFactionReputation: [], beforeWorldMinute: null, afterWorldMinute: null },
              setsFlags: ['gave_up_the_chart'],
              closesFlags: ['ran_the_blockade'],
            },
          ],
          rewards: {
            xp: 240,
            items: [],
            flags: ['knows:why_it_is_not_charted'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_fleet_asks',
      atWorldMinute: 26 * 60,
      locationId: 'saltmarket',
      publicCopy:
        'A Ninth Fleet cutter warps in at the top of the tide and a lieutenant walks the quay asking, politely, whether anybody has seen a brass compass.',
      directorNotes:
        'The Fleet is looking for the compass, not for the player. Yet. Nobody is arrested. The point is that the player learns they are being looked for before they are found.',
      setsFlags: ['knows:the_fleet_is_looking'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_press_gang',
      atWorldMinute: 34 * 60,
      locationId: 'saltmarket',
      publicCopy:
        'The press gang comes down the quay at first light and takes nine men off the fish dock. One of them is shouting a name over and over that nobody answers to.',
      directorNotes:
        'This is q_the_pressed_men becoming a scene at a specific hour rather than an option on a menu. If the player is elsewhere they hear about it after.',
      setsFlags: ['knows:the_press_gang'],
      cancelledByFlags: ['freed_the_pressed_men'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'veyra', toLocationId: 'saltmarket' }],
    },
    {
      id: 'we_tolla_gives_up',
      atWorldMinute: 60 * 60,
      locationId: 'the_yard',
      publicCopy:
        'Tolla Corrow has the Marrow’s cradle cleared and a note nailed to the shed door with your name on it. She needs the slipway back.',
      directorNotes:
        'The yard is not infinite. If the keel is not paid for by the third day, the ship comes off the slip and the player has to find another way.',
      setsFlags: ['yard_wants_the_slip'],
      cancelledByFlags: ['she_floats'],
      requiresFlags: ['knows:the_keel'],
      movesCharacters: [],
    },
    {
      id: 'we_harrow_hears',
      atWorldMinute: 78 * 60,
      locationId: 'the_drift',
      publicCopy:
        'Word has got to the Drift ahead of you. Harrow Bell has cleared the table under the lantern and is sitting at it with nothing on it at all, which is how they wait for somebody.',
      directorNotes:
        'Notoriety is not strength. This fires because the player has done something people talk about, and it changes what Harrow will open with.',
      setsFlags: ['harrow_expects_you'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_drift'],
      movesCharacters: [{ characterId: 'harrow_bell', toLocationId: 'the_drift' }],
    },
    {
      id: 'we_the_bounty_posted',
      atWorldMinute: 96 * 60,
      locationId: null,
      publicCopy:
        'The bounty goes up in four ports at once, which means the Fleet paid to have it done fast. It is not a large number. It is a printed one, with your name on it.',
      directorNotes:
        'This fires off what the player did to the Fleet, not off how strong they are. A player who never crossed the Fleet never sees it.',
      setsFlags: ['bounty_posted'],
      cancelledByFlags: ['took_fleet_commission'],
      requiresFlags: ['freed_the_pressed_men'],
      movesCharacters: [],
    },
    {
      id: 'we_veyra_at_the_belt',
      atWorldMinute: 150 * 60,
      locationId: 'stormlee',
      publicCopy:
        'There is a Ninth Fleet frigate hove to on the calm side of Stormlee with her guns run in, and a boat already in the water coming across.',
      directorNotes:
        'Veyra does not open fire. She has come to offer the player a way out that she genuinely means. Her guns are run in and the writer must not describe them otherwise.',
      setsFlags: ['veyra_waiting'],
      cancelledByFlags: ['gave_up_the_chart'],
      requiresFlags: ['knows:stormlee'],
      movesCharacters: [{ characterId: 'veyra', toLocationId: 'stormlee' }],
    },
  ],
  promises: [
    {
      id: 'p_who_killed_ferro',
      kind: 'MYSTERY',
      label: 'Who put a naval blade through Ferro Vane',
      seedHint:
        'The wound, the pattern, and the fact that nothing was taken. Rook carries the same blade and keeps starting a sentence about it.',
      payoffHint:
        'Veyra Sol gave the order and did not expect it to be carried out that way. She says so herself, without being asked.',
      weight: 0.9,
    },
    {
      id: 'p_the_crownless',
      kind: 'FINALE',
      label: 'Why nine hundred square miles of ocean is on no chart',
      seedHint:
        'The compass points somewhere no compass points, and the something it points at moves.',
      payoffHint:
        'Whatever is there took eleven of Veyra’s crew and she is not certain they died. The player sees it themselves.',
      weight: 1,
    },
    {
      id: 'p_veyra',
      kind: 'RIVAL',
      label: 'The captain who is polite about hunting you',
      seedHint: 'She is described before she appears, always by somebody who liked her.',
      payoffHint:
        'She offers the player the chart back and a way home, and she means it, and taking it is a real ending.',
      weight: 0.8,
    },
    {
      id: 'p_the_crew',
      kind: 'RELATIONSHIP',
      label: 'Whether these four can be a crew',
      seedHint:
        'Nessa will not look at Rook. Mako is sixteen and nobody has said so out loud yet.',
      payoffHint:
        'Either they hold together in the storm belt, or the player finds out which of them was only ever passing through.',
      weight: 0.85,
    },
    {
      id: 'p_relics',
      kind: 'THEME',
      label: 'A relic breaks one rule and nothing else',
      seedHint: 'A bell with no clapper on a table that everybody stands away from.',
      payoffHint:
        'The player learns to build around the one rule a relic breaks, or wins without ever holding one.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_apprentice',
      name: 'Ferro’s Apprentice',
      role: 'Navigation and old charts',
      summary:
        'You grew up in the workshop. You read water and paper better than anyone your age, and you can fight about as well as you would expect.',
      playstyle: ['Navigation', 'Knowledge', 'Poor in a fight'],
      blurb:
        'Forty years of a man’s notes and you are the only person alive who can read all of them. He never taught you to hold the cutlass properly, which tells you what he thought was going to matter.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { navigation: 3, lore: 2, seamanship: 1, blades: 0 },
      startingItems: [],
      startingAbilities: ['read_the_water'],
      startingReputation: [],
    },
    {
      id: 'arch_quayside',
      name: 'Quayside',
      role: 'Blades and boarding',
      summary:
        'You have been fighting on wet stone since you were eleven. You go across first, you get there, and nobody has ever asked you to plot a course.',
      playstyle: ['Aggressive', 'Close range', 'Bad at charts'],
      blurb:
        'Ferro fed you for nine years and never once asked what you did between the workshop closing and morning. He knew. Everyone on the quay knew.',
      attributeBonus: { might: 2, agility: 2 },
      skillProficiencies: { blades: 3, seamanship: 2, navigation: 0, command: 1 },
      startingItems: [],
      startingAbilities: ['boarding_rush'],
      startingReputation: [{ factionId: 'faction_free_captains', amount: 10 }],
    },
    {
      id: 'arch_powder',
      name: 'Powder',
      role: 'Guns and ranging',
      summary:
        'You served two years on a merchantman’s gun crew. You can hit a hull at a distance nobody expects, if somebody else sails the ship.',
      playstyle: ['Ranged', 'Technical', 'Needs a crew'],
      blurb:
        'You still count under your breath when something loud happens. Two years and nobody ever told you to stop.',
      attributeBonus: { mind: 2, might: 1, resolve: 1 },
      skillProficiencies: { gunnery: 3, seamanship: 2, medicine: 1, bargaining: 0 },
      startingItems: [],
      startingAbilities: ['rake_her'],
      startingReputation: [{ factionId: 'faction_houses', amount: 10 }],
    },
    {
      id: 'arch_ledger',
      name: 'Ledger Runner',
      role: 'Bargaining and holds',
      summary:
        'You ran cargo manifests for a merchant house and you know exactly what everything on this coast is worth, including people.',
      playstyle: ['Social', 'Sneaky', 'Fragile'],
      blurb:
        'The house wrote you off eleven months ago over four hundred crowns you did not take. You know who did, and you have been sitting on it since.',
      attributeBonus: { presence: 2, agility: 1, mind: 1 },
      skillProficiencies: { bargaining: 3, larceny: 2, lore: 1, blades: 0 },
      startingItems: [],
      startingAbilities: ['set_the_terms', 'ghost_the_hold'],
      startingReputation: [{ factionId: 'faction_houses', amount: 15 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What do they call you on the quay?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Sable Vane' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What did Ferro teach you?',
      helpText:
        'What you were before the workshop. It sets your attributes, your training and your first technique, and it decides which ways through a problem are open to you early. It is fixed for this run. It does not decide how strong you end up: relics, a ship and a crew are all found in play, and a run that never touches a relic can still finish this.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'Does anyone in Saltmarket know your name?',
      helpText:
        'Notoriety starts at zero for everyone. This is only what people already think, which is different — and it is what they bring up first.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I am the one who used to run messages for the old man with the compass, and nobody has decided yet whether that is sad or suspicious.',
    },
    {
      id: 'what_ferro_was',
      label: 'What was Ferro Vane to you?',
      helpText: 'Establishes the loss the whole story is built on, in your words rather than the world’s.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'the_only_one', label: 'The only family you ever had' },
        { id: 'took_you_in', label: 'A man who took you in and never explained why' },
        { id: 'an_employer', label: 'An employer you happened to love' },
        { id: 'a_disappointment', label: 'Someone you had stopped speaking to' },
      ],
    },
    {
      id: 'appearance',
      label: 'What do people notice first?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Sunburn in the shape of a hat I have not owned for a month, and a coat three sizes too big that used to be his.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Ferro Vane died looking for the Crownless Sea, so reaching it is the
   * obvious destination and deliberately not the only good one. A crew that
   * holds together for four years under a commission is a life; so is a yard
   * with your name on it. "The Crew Buries You Ashore" is what the Drift does
   * to people who keep sailing into it, and it is reachable without the player
   * ever having made a mistake.
   */
  endings: [
    {
      id: 'end_crownless',
      name: 'The Crownless Sea',
      rarity: 'RARE',
      minTurn: 45,
      requires: { flagsSet: ['chart_complete'], atLocation: 'the_crownless' },
      condition:
        'The player finished the chart their father spent his life on and sailed to where it points. ' +
        'What is actually there is the story\'s own and it is not a treasure — write what forty years ' +
        'of somebody else\'s certainty looks like when you are standing in it.',
      epilogue:
        'The compass stops being useful the moment it is right. Whatever the coast is told about this, ' +
        'the chart is finished and it is finished in your hand, which is the part Ferro did not get.',
      hint: 'The compass points somewhere no printed chart admits to.',
    },
    {
      id: 'end_feared',
      name: 'The Name They Use To Frighten People',
      rarity: 'UNCOMMON',
      minTurn: 35,
      requires: {
        flagsSet: ['bounty_posted'],
        minFactionReputation: [{ factionId: 'faction_free_captains', value: 50 }],
      },
      condition:
        'The bounty is large, the Free Captains treat the player as one of the serious ones, and the ' +
        'Crownless Sea has become something the player talks about rather than sails toward. Not a ' +
        'failure — it is the life most people in this world would actually choose.',
      epilogue:
        'The number on the paper stops being an insult somewhere around the third revision. Ferro\'s ' +
        'compass stays in a drawer, and there is always another season.',
      hint: '',
    },
    {
      id: 'end_privateer',
      name: 'A Flag, In The End',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['took_fleet_commission'],
        minFactionReputation: [{ factionId: 'faction_fleet', value: 40 }],
      },
      condition:
        'The player took the Ninth Fleet\'s commission and kept it — the navy whose blade killed Ferro ' +
        'Vane. Write what it bought and what it cost, and do not have anybody deliver the verdict on it.',
      epilogue:
        'The paperwork makes the same acts legal that the bounty made hanging offences. Nessa does not ' +
        'come aboard again. The Crownless Sea stays off the charts, which was always what somebody wanted.',
      hint: '',
    },
    {
      id: 'end_charts_open',
      name: 'Off The Charts No Longer',
      rarity: 'UNIQUE',
      minTurn: 45,
      requires: {
        flagsSet: ['chart_complete', 'knows:the_order_came_from_above'],
        minFactionReputation: [{ factionId: 'faction_houses', value: -20 }],
      },
      condition:
        'The player learned who took the Crownless Sea off the charts and made the chart public rather ' +
        'than keeping it. This ends the thing Veyra has spent her life protecting, and she is right ' +
        'about what it costs. Reachable whether or not the player ever sailed there.',
      epilogue:
        'It is on a printed chart within the year, badly, in four competing versions. Everything Veyra ' +
        'said would happen begins happening. Ferro is named on none of them.',
      hint: 'Somebody took it off the charts on purpose, ninety years ago.',
    },
    {
      id: 'end_crew_gone',
      name: 'Short-Handed',
      rarity: 'UNCOMMON',
      minTurn: 25,
      requires: { flagsSet: ['nessa_gone', 'rook_gone'] },
      condition:
        'The people who signed on have left, one at a time, for their own reasons. The player may still ' +
        'have a ship and a chart. Do not make this a lesson — write the specific silence of a deck ' +
        'crewed by strangers.',
      epilogue:
        'The ship still sails. Somebody else is at the compass, and they are perfectly competent, and ' +
        'they never met Ferro Vane.',
      hint: '',
    },
    {
      id: 'end_ashore',
      name: 'The Yard With Your Name On It',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['bounty_posted'] },
      condition:
        'The player walked out of the hunt with nothing on their head. A quiet, real ending — the one ' +
        'Ferro never took — and the story should not treat it as giving up.',
      epilogue:
        'The compass goes on a shelf where visitors ask about it. You answer honestly and they think it ' +
        'is a story. Nothing on the coast is looking for you at all.',
      hint: '',
    },
    {
      id: 'end_drift',
      name: 'The Crew Buries You Ashore',
      rarity: 'RARE',
      minTurn: 25,
      requires: { flagsSet: ['attuned_stillpoint'], hasItems: ['the_hush'] },
      condition:
        'The player kept going into the Drift with relics aboard until it took what it takes. Reachable ' +
        'without a single mistake having been made — this world says the relics break one rule each and ' +
        'means it.',
      epilogue:
        'The crew do it properly, above the tide line, the way Ferro was not. The Stillpoint goes in ' +
        'with you because nobody aboard will touch it now.',
      hint: 'Every relic breaks exactly one rule, and never the one you are watching.',
    },
  ],
  opening:
    'The workshop still smells of linseed and it has been eleven days.\n\n' +
    'You are on the quay at Saltmarket at seven in the morning with everything Ferro Vane left you: forty feet of cutter with a cracked keel, a third of a chart with a clean cut down one edge, and a brass compass that is currently pointing at nothing in the east and has been for as long as you have known it.\n\n' +
    'The Marrow sits low against the wall. She has not been to sea in nine years.\n\n' +
    'Nessa Vale is standing at the harbour table twenty feet away, copying somebody else’s chart for money, and she has looked up at you twice. She was at the funeral. Nobody invited her.\n\n' +
    'You cannot sail this ship alone, and nobody in this town has any reason to help you.',
  openingSuggestions: [
    'I cross to the harbour table and stand until she looks up. “You were at the funeral. Nobody invited you. How did you know Ferro?”',
    'I take the compass down to the Marrow and get under her properly, to see exactly how bad that keel is before anyone tells me.',
    'I go and find Tolla Corrow at the yard. “No courtesy, no rounding. Give me the real number to put her back in the water.”',
  ],
  publishedAt: '2026-09-09T09:00:00.000Z',
};

export const BLACKWAKE = StoryVersion.parse(raw);
