import { StoryVersion } from '@aniplay/contracts';

/**
 * "Last Service" — thirty seats, thirty days, and a hood that is making a noise.
 *
 * The bible's structural rule is the one that keeps this from becoming a
 * tournament: **not every important cooking scene is a competition.** Feeding a
 * sick friend, staff meal, teaching somebody to chop an onion, the dish you
 * make after a bad loss. If every plate gets scored, food stops being food. So
 * the City Table is the strongest default pressure and is explicitly not the
 * only route, and several of the best steps in this world have no winner in
 * them at all.
 *
 * The second thing it is careful about: the central question changes underneath
 * the player. It starts as "save Akari" and becomes "what does save actually
 * mean", and Keiko — who has run it for nineteen years and equates closing with
 * betraying her family — is the reason. Closing it deliberately, after a good
 * last night, is an authored ending with as much weight as keeping it open.
 *
 * Three variables. Hands is the only GOOD_HIGH, because a cook's hands are
 * genuinely what runs out and sleep is genuinely what returns them. Talk is
 * first among the descending pair: the generic cost path and PUBLIC_VIOLENCE
 * both take the first GOOD_LOW in array order, and a scene in a dining room
 * becoming something the city discusses is exactly the right consequence — and
 * attention is dangerous rather than good for a thirty-seat room that cannot
 * physically serve the covers it would bring.
 */

const raw = {
  id: 'sv_last_service_1',
  storyId: 'story_last_service',
  version: 1,
  title: 'Last Service',
  fantasyLabel: 'Thirty seats. Thirty days. One kitchen.',
  hook: 'Your family’s thirty-seat restaurant has thirty days before the lender calls the loan, and on Friday evening the best young chef in the city walks in out of the rain with an invitation.',
  premise:
    'It is Friday, it is raining, and the extractor hood over your family’s kitchen is making a noise it should not make.\n\n' +
    'Thirty seats and about half of them full. One burner will not light properly. The supplier has rung twice today and nobody has rung back. A table has just sent a dish back, politely, because the fish was overcooked, and they were right about that.\n\n' +
    'Your aunt has run this place for nineteen years and has not taken a full day since March. There was a renovation, there was a loan, there were four bad months, and the lender has given thirty days.\n\n' +
    'Nobody in this building has said the word closing out loud yet.\n\n' +
    'Then the door opens and a woman comes in out of the rain with a knife roll over one shoulder, and every cook on the line clocks her before she has taken two steps, because this city knows her face.\n\n' +
    'She has not come to eat. She has come with an invitation, and you need to decide within about a minute what you are going to say to it.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Team', 'Rivalry', 'Slice of life', 'Drama'],
  mechanicsChips: [
    'Cook anything you can describe',
    'Front of house decides services',
    'Not every dish is scored',
    'Attention is dangerous',
    'Closing well is an ending',
  ],
  contentDescriptors: ['PSYCHOLOGICAL_THEMES', 'ROMANCE', 'ALCOHOL_REFERENCES', 'MORAL_AMBIGUITY'],
  intensity: 'LIGHT',
  creatorNote:
    'You can win the whole circuit and still lose the restaurant, and you can lose every service and keep it. The best scenes in this are not competitions — a staff meal, a friend who cannot eat, somebody being taught to chop an onion properly at eleven at night. Whether Akari should be saved at all is a real question and the story does not know the answer.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: false,
    allowsRomance: true,
    startingLocationId: 'akari_kitchen',
    startWorldMinute: 19 * 60 + 40,
    startingItems: [{ itemId: 'knife_roll', qty: 1 }],
    hardCanon: [
      'Akari is a thirty-seat neighbourhood restaurant run by the player’s family. Its cuisine is whatever the player says it is, and nothing in this world locks it.',
      'Akari has renovation debt, a loan, four bad months and a broken hood, and the lender has given thirty days.',
      'The City Table is a month-long circuit of Services across the city. It is not one elimination bracket: some Services are head-to-head, some are ranked, some are collaborative and some have no winner.',
      'Mina Saegusa is sous-chef at VANTA and came to Akari to deliver an invitation, not to mock anybody.',
      'Keiko has run Akari for nineteen years and equates closing it with betraying the family. She is not wrong to love it and she is preserving it past the point of her own health.',
      'Saving Akari financially is not automatically the right outcome, and the story never asserts that it is.',
      'Nobody in this world is a villain. The critic owes the eater the truth, the lender is applying ordinary terms, and the celebrated chef genuinely respects small restaurants.',
    ],
    toneGuide:
      'A modern Japanese coastal city that is hungry: a fish market at five, a night market with one stall doing four hundred covers off a single burner, an arcade with three shutters down, a hotel banquet kitchen, a culinary school with a smell you never lose. ' +
      'Cooking is heightened the way anime heightens sport — sound, heat, timing, the specific noise a pan makes when it is right — and never by making anybody glow. The technique is real and the physics are real. ' +
      'Front of house is half the story. Brilliant food and an unexplained forty-minute wait is a failed service, and Emi is the reason it is not. ' +
      'Not every plate is scored. Staff meal, a friend who cannot eat, funeral food, leftovers at one in the morning. If everything is a competition the food stops meaning anything. ' +
      'Money is specific and boring and constant: a supplier who wants paying, a hood quote, a covers count, a Tuesday that did forty.',
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 11, agility: 13, mind: 13, presence: 12, resolve: 14, arcana: 4 },
  skills: [
    { id: 'knife', name: 'Knife Work', attribute: 'agility', description: 'Speed, consistency and the eleven minutes of prep that decide whether a service is survivable.' },
    { id: 'heat', name: 'Heat', attribute: 'mind', description: 'Protein, pan, timing, and the difference between a fish that is right and one that is thirty seconds past it.' },
    { id: 'palate', name: 'Palate', attribute: 'mind', description: 'Tasting a thing and knowing what it is missing rather than that something is.' },
    { id: 'the_pass', name: 'The Pass', attribute: 'presence', description: 'Running a line: calling, timing four stations to one plate, and being obeyed at volume.' },
    { id: 'front', name: 'Front Of House', attribute: 'presence', description: 'Reading a room, saving a table, and explaining a forty-minute wait so that it stops being one.' },
    { id: 'sourcing', name: 'Sourcing', attribute: 'mind', description: 'Suppliers, the market at five, what is actually good this week and what it costs.' },
    { id: 'graft', name: 'Graft', attribute: 'resolve', description: 'A double, then the clean-down, then the prep for tomorrow, then doing it again.' },
  ],
  resources: [
    {
      id: 'hands',
      name: 'Hands',
      max: 100,
      start: 72,
      regenPerHour: 2.5,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'Gone. Not tired — gone. The cuts get slower and then uneven, the timing goes, and the plate that leaves the pass is one somebody else would have sent back. Everybody on that line can see it and nobody is going to say anything.',
      color: '#D08A3E',
      bands: [
        {
          upTo: 24,
          behaviour:
            'Finished. Everything takes two attempts, the palate has gone flat, and decisions at the pass arrive after the window rather than in it. This is the band where a service quietly falls apart with nobody making a single dramatic mistake, and where going home is the correct call.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary state of anybody who does this. Good for a service or a difficult conversation and honest about not being good for both. The food is fine and the creativity is gone, which is a distinction only about four people in this city would notice.',
        },
        {
          upTo: 100,
          behaviour:
            'Sharp. The prep is ahead, the palate is working, and there is enough left over to try something. This is the only band in which anybody invents anything, and it is why the ones who get anywhere are obsessive about sleep.',
        },
      ],
    },
    {
      id: 'talk',
      name: 'Talk',
      max: 100,
      start: 14,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody outside four streets has heard of Akari. Forty covers on a good Friday, all of them people who live here, and a kitchen that can comfortably serve every single one of them.',
      color: '#4E7FA0',
      bands: [
        {
          upTo: 28,
          behaviour:
            'A neighbourhood restaurant. The regulars know the menu, the covers are predictable, and the kitchen can handle everything that walks in. This is the condition under which the food can actually be good, and it is also the condition under which the loan does not get paid.',
        },
        {
          upTo: 58,
          behaviour:
            'People are coming across town. Two write-ups, a queue on a Saturday, and covers that are up forty per cent on a kitchen that has not grown. Every service now has a point in it where the pass is behind and everybody knows it.',
        },
        {
          upTo: 82,
          behaviour:
            'A thing the city is discussing. Bookings three weeks out, people who have come for the story rather than the food, and a thirty-seat room being asked to be something it physically is not. The regulars have started going elsewhere on Fridays, which nobody has mentioned to Keiko.',
        },
        {
          upTo: 100,
          behaviour:
            'Famous, at the scale that eats small restaurants. Two hundred covers of demand against thirty seats, a supplier who has raised prices because he can, and a kitchen turning out food that is technically correct and has nothing in it. Everybody who works here is exhausted and none of them can say why it feels worse.',
        },
      ],
    },
    {
      id: 'debt',
      name: 'The Debt',
      max: 100,
      start: 68,
      regenPerHour: 0.12,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Clear. Everything Akari takes on a Tuesday is Akari’s. Keiko does the accounts on Sunday in about twenty minutes and then does not think about them again, which she has not been able to do since the year of the renovation.',
      color: '#8C5A4A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Manageable. A thing to be dealt with rather than a thing that decides the week. The menu can be built around what is good rather than around what is cheap, and somebody can be sent home early on a dead Tuesday without it costing anything.',
        },
        {
          upTo: 55,
          behaviour:
            'Present in every decision. Cheaper cuts, a supplier being paid late, the hood quote sitting on the office desk with nothing written on it. Nobody is panicking and every single choice in this building now has a second reason behind it.',
        },
        {
          upTo: 80,
          behaviour:
            'Load-bearing. The order goes in short, the good fish does not come, and the food gets worse in exactly the way that makes the takings worse. Keiko has started doing shifts she should not be doing. This is the band the whole trap lives in and it tightens on its own.',
        },
        {
          upTo: 100,
          behaviour:
            'Called. There is a date, a solicitor’s letter and a lease with the restaurant’s fittings named on it. Whatever is going to be done has to be done this week, and every option on the table is bad in a different way, and one of them is closing well.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'knife_roll',
      name: 'Your Knife Roll',
      tags: ['gear'],
      questItem: true,
      droppable: false,
      skillModifiers: { knife: 2 },
      description: 'Canvas, four knives, a steel, a peeler and a spoon that is bent slightly wrong and which you have never replaced because it is the one you reach for.',
      loreText: 'The gyuto was a present. Somebody in this building bought it for you and has never once mentioned it, and you both know which one it was.',
      icon: 'knife',
    },
    {
      id: 'the_hood_quote',
      name: 'The Quote For The Hood',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'One page from a ventilation firm with a figure on it and a note about the extraction rate being below the current code. It has been on the office desk for five weeks with nothing written on it.',
      loreText: 'The figure is not enormous. It is exactly the sort of number that a restaurant with four bad months behind it cannot find and cannot explain to anybody why it cannot find.',
      icon: 'papers',
    },
    {
      id: 'keikos_book',
      name: 'The Book Keiko Keeps',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { sourcing: 2 },
      description: 'Nineteen years of covers, in pencil, one line a night. Weather, day, number, and occasionally a name. It is the only complete record of what this restaurant actually is.',
      loreText: 'The last four months are in it in the same handwriting as all the rest, which is the part that is hard to look at.',
      icon: 'book',
    },
    {
      id: 'city_table_card',
      name: 'The Invitation',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'Heavy card, a list of dates, and eleven Services described in one line each. Half of them are not competitions and the card does not say which half.',
      loreText: 'They send about ninety of these. They are hand-addressed, which nobody outside the organising office knows and which is why Mina brought yours herself.',
      icon: 'card',
    },
    {
      id: 'grandmothers_pot',
      name: 'The Pot That Does Not Come Off The Shelf',
      tags: ['personal'],
      description: 'Enamelled iron, chipped to the metal in three places, and the only thing in this kitchen that predates the restaurant. It goes on the heat about twice a year and everybody who works here knows what for.',
      loreText: 'It is not a good pot. It is heavy, it is slow and the lid does not seat properly, and it makes one specific braise better than anything else in the building.',
      icon: 'pot',
    },
    {
      id: 'market_notebook',
      name: 'A Market Notebook',
      tags: ['document'],
      skillModifiers: { sourcing: 1, palate: 1 },
      description: 'Small, salt-damaged, and full of eleven years of who is good, who is cheap in October, whose scallops are the ones everybody else is buying, and which two stalls will hold something back for you.',
      loreText: 'Half the value of it is not the notes. It is that being seen with it at five in the morning means the people at those stalls talk to you differently.',
      icon: 'notebook',
    },
    {
      id: 'reinas_piece',
      name: 'A Review Nobody Has Published',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'Nine hundred words about Akari, written four years ago, spiked before it ran. It is not a bad review. It is a very good one about a restaurant the writer decided not to send anybody to yet.',
      loreText: 'She has spiked eleven pieces in her career and this is the only one she has kept a copy of, which she has never examined.',
      icon: 'papers',
    },
    {
      id: 'staff_meal',
      name: 'Staff Meal',
      tags: ['food'],
      consumable: { resourceId: 'hands', amount: 26, consumesItem: true },
      description: 'Whatever did not sell and whatever was going over, cooked properly by somebody at four in the afternoon and eaten standing up by six people in eleven minutes.',
      loreText: 'It is the best thing this kitchen makes and it has never been on a menu anywhere, and every cook in this city would tell you the same about their own.',
      icon: 'bowl',
    },
  ],
  abilities: [
    {
      id: 'taste_it',
      name: 'Taste It',
      tags: ['sight'],
      description: 'Put a spoon in and know what it is missing, which is a completely different skill from knowing that something is.',
      affordances: ['taste', 'try it', 'what is missing', 'check the seasoning', 'taste the sauce', 'sample'],
      costs: [{ resourceId: 'hands', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'palate', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'get_the_prep_done',
      name: 'Get The Prep Done',
      tags: ['utility'],
      description: 'Four hours before anybody sits down. Nothing about it is interesting and it is the entire difference between a service that works and one that does not.',
      affordances: ['prep', 'chop', 'get ready', 'set up', 'mise', 'do the prep', 'break down the fish'],
      costs: [{ resourceId: 'hands', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'knife', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cook_it_properly',
      name: 'Cook It Properly',
      tags: ['utility'],
      description: 'Heat, pan, timing, rest. The thirty seconds either side of right, on a protein you only get one of.',
      affordances: ['cook', 'sear', 'grill', 'fire it', 'make the dish', 'plate it', 'braise', 'fry'],
      costs: [{ resourceId: 'hands', amount: 9 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'heat', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'run_the_pass',
      name: 'Run The Pass',
      tags: ['social'],
      description: 'Call it, time four stations onto one plate, and be obeyed at volume by people who are all individually behind.',
      affordances: ['call it', 'run the pass', 'expedite', 'take the pass', 'organise', 'direct the line', 'lead service'],
      costs: [{ resourceId: 'hands', amount: 11 }],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'presence', skillId: 'the_pass', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'save_the_table',
      name: 'Save The Table',
      tags: ['social'],
      description: 'Forty minutes late, a wrong order and somebody’s anniversary. Front of house, done properly, is the reason the kitchen gets away with anything.',
      affordances: ['talk to the table', 'apologise', 'explain', 'handle it', 'go out front', 'sort them out', 'comp it'],
      costs: [{ resourceId: 'hands', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'front', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_to_the_market',
      name: 'Go To The Market',
      tags: ['survival'],
      description: 'Five in the morning, wet concrete, and eleven stalls where being known changes what you are shown.',
      affordances: ['market', 'buy', 'source', 'go shopping', 'find ingredients', 'talk to the supplier', 'order'],
      costs: [{ resourceId: 'hands', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'sourcing', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cook_for_one_person',
      name: 'Cook For One Person',
      tags: ['healing'],
      description: 'Not a dish. A meal, for somebody specific, about something specific. Nobody scores it and it is most of what this job is actually for.',
      affordances: ['cook for them', 'feed them', 'make them something', 'staff meal', 'cook for one', 'make dinner'],
      costs: [{ resourceId: 'hands', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'palate', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'say_the_number',
      name: 'Say The Number',
      tags: ['social'],
      description: 'Put the actual figure on the table, out loud, to somebody who has been carrying it alone. Nothing about this is dramatic and it is the hardest thing in the building.',
      affordances: ['tell them the truth', 'say it', 'talk about money', 'be honest', 'show them the books', 'have the conversation'],
      costs: [{ resourceId: 'hands', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'front', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'do_something_nobody_asked_for',
      name: 'Do Something Nobody Asked For',
      tags: ['offensive'],
      description: 'Put a dish in front of people that is not on the menu, is not safe, and is the thing you actually think. Everybody will have an opinion and one of them writes for a living.',
      affordances: ['put it on', 'try something', 'my own dish', 'go off menu', 'make something new', 'take a risk'],
      costs: [
        { resourceId: 'hands', amount: 14 },
        { resourceId: 'talk', amount: 12 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'mind', skillId: 'palate', baseDc: 15 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'spend_money_you_do_not_have',
      name: 'Spend Money You Do Not Have',
      tags: ['utility'],
      description: 'The good fish, the hood repair, a fourth pair of hands on a Saturday. All of it is the correct decision and all of it goes on the number.',
      affordances: ['buy it anyway', 'pay for it', 'spend', 'get the good one', 'hire somebody', 'fix the hood'],
      costs: [
        { resourceId: 'hands', amount: 4 },
        { resourceId: 'debt', amount: 11 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cook_the_thing_you_have_never_shown_anybody',
      name: 'The One You Have Never Shown Anybody',
      tags: ['offensive'],
      description: 'The dish that is actually about something. It is not clever and it will not photograph, and putting it in front of a stranger is the most exposed anybody in this trade ever gets.',
      affordances: ['cook the real one', 'the dish that means something', 'show them', 'the personal one', 'my dish'],
      costs: [
        { resourceId: 'hands', amount: 18 },
        { resourceId: 'talk', amount: 9 },
      ],
      cooldownMinutes: 1440,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'heat', baseDc: 16 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:what_it_is_about'],
        lockedCopy: 'You have not worked out what it would be. Everybody says a chef should have one and nobody has ever been able to explain how you are supposed to find it.',
      },
    },
  ],
  locations: [
    {
      id: 'akari_kitchen',
      name: 'The Akari Kitchen',
      shortName: 'The Kitchen',
      description:
        'Six metres by three. Four burners of which three are reliable, a grill, a pass with a heat lamp that buzzes, a walk-in that has to be shut with a hip, and an extractor hood that has been making a noise since Tuesday. Everything in here has been arranged over nineteen years by people who use it.',
      artDirection:
        'Small cramped Japanese restaurant kitchen at service, four-burner range with a grill, a pass with a heat lamp and ticket rail, stainless everywhere, steam, two cooks working close together. Hot, tight, entirely functional.',
      connections: [
        { to: 'akari_dining', travelMinutes: 1, label: 'Out through the pass' },
        { to: 'akari_office', travelMinutes: 1, label: 'The office' },
        { to: 'the_back_alley', travelMinutes: 1, label: 'Out the back door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'grandmothers_pot', qty: 1, ownerId: 'keiko', aka: ['the pot', 'the iron pot', 'the old one', 'the enamel pot'] },
        { itemId: 'staff_meal', qty: 2, ownerId: null, aka: ['staff meal', 'food', 'something to eat', 'dinner'] },
      ],
    },
    {
      id: 'akari_dining',
      name: 'The Akari Dining Room',
      shortName: 'The Room',
      description:
        'Thirty seats: eleven at the counter, five tables of two, three of four. Warm light, a menu board Emi rewrites every morning, and a rain-wet window onto a street with a tram on it. About a third of the people in here have been coming since before the renovation.',
      artDirection:
        'Warm thirty-seat Japanese neighbourhood restaurant interior on a rainy evening, counter seating and small tables, a hand-written menu board, condensation on the window, a mixed local crowd. Cosy, worn, well loved.',
      connections: [
        { to: 'akari_kitchen', travelMinutes: 1, label: 'Behind the pass' },
        { to: 'the_arcade_street', travelMinutes: 2, label: 'Out onto the street' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'akari_office',
      name: 'The Office',
      shortName: 'Office',
      description:
        'A cupboard with a desk in it, a chair that came from the dining room in 2011, a filing box, a wall calendar with a date circled in it, and one page from a ventilation firm that has been sitting on the desk for five weeks.',
      artDirection:
        'Tiny cramped restaurant back office, a desk buried in paperwork and invoices, a wall calendar with a circled date, a mismatched dining chair, one hanging bulb. Claustrophobic, honest, quietly frightening.',
      connections: [{ to: 'akari_kitchen', travelMinutes: 1, label: 'Back into the kitchen' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'the_hood_quote', qty: 1, ownerId: 'keiko', aka: ['the quote', 'the hood quote', 'the page on the desk'] },
        { itemId: 'keikos_book', qty: 1, ownerId: 'keiko', aka: ['the book', 'the covers book', 'her book', 'the ledger'] },
      ],
    },
    {
      id: 'the_back_alley',
      name: 'The Back Alley',
      shortName: 'The Alley',
      description:
        'Two metres of wet concrete between the back door and the bins, with a crate everybody sits on, an extractor outlet above it and a view of exactly one strip of sky. Every difficult conversation this restaurant has ever had has happened out here.',
      artDirection:
        'Narrow wet service alley behind a Japanese restaurant at night, bins and stacked crates, an extractor outlet venting steam, one figure sitting on a crate, neon reflected in puddles. Intimate, grimy, oddly beautiful.',
      connections: [
        { to: 'akari_kitchen', travelMinutes: 1, label: 'Back inside' },
        { to: 'the_arcade_street', travelMinutes: 3, label: 'Round to the front' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_arcade_street',
      name: 'The Street',
      shortName: 'The Street',
      description:
        'A tram line, a covered arcade, a laundry, a bar with eleven seats and three other places that serve food. Everybody on this street knows how Akari is doing, roughly, from how many people are in the window at eight.',
      artDirection:
        'Japanese neighbourhood shopping street in the rain at night, tram tracks, covered arcade entrance, lit shopfronts, umbrellas, a small restaurant window with warm light. Ordinary, atmospheric, alive.',
      connections: [
        { to: 'akari_dining', travelMinutes: 2, label: 'Back into Akari' },
        { to: 'the_back_alley', travelMinutes: 3, label: 'Round the back' },
        { to: 'fish_market', travelMinutes: 14, label: 'Down to the market' },
        { to: 'night_market', travelMinutes: 9, label: 'Over to the night market' },
        { to: 'keiko_flat', travelMinutes: 6, label: 'Up to Keiko’s' },
        { to: 'vanta', travelMinutes: 16, label: 'Across town to VANTA' },
        { to: 'city_table_hall', travelMinutes: 11, label: 'The circuit hall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [],
    },
    {
      id: 'fish_market',
      name: 'The Fish Market',
      shortName: 'Market',
      description:
        'Five in the morning, wet concrete, forty stalls and an auction floor. Everything worth cooking in this city comes through here first, and being known at four of these stalls is worth more than any amount of money at the other thirty-six.',
      artDirection:
        'Japanese fish market before dawn, wet concrete floor, ice and crates, whole fish laid out, buyers with hooks and notebooks, harsh overhead lighting, breath visible. Cold, loud, purposeful.',
      connections: [
        { to: 'the_arcade_street', travelMinutes: 14, label: 'Back up to the street' },
        { to: 'supplier_yard', travelMinutes: 5, label: 'Round to the yard' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [
        { itemId: 'market_notebook', qty: 1, ownerId: null, aka: ['the notebook', 'a notebook', 'the little book'] },
      ],
    },
    {
      id: 'supplier_yard',
      name: 'The Supplier’s Yard',
      shortName: 'The Yard',
      description:
        'A loading bay, a cold store and a small office with a man in it who has known this family for eleven years, likes them, and has an accounts department that does not care about that at all.',
      artDirection:
        'Small food wholesale yard, a loading bay with crates and a cold store door, a cramped office with a ledger and a telephone, a delivery van. Businesslike, unglamorous, faintly awkward.',
      connections: [{ to: 'fish_market', travelMinutes: 5, label: 'Back to the market' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 3 },
      takeableItems: [],
    },
    {
      id: 'night_market',
      name: 'The Night Market',
      shortName: 'Night Market',
      description:
        'Forty stalls, one street, and a queue outside one of them that has not been under twenty people since March. Somebody there is doing four hundred covers a night off a single burner and a griddle, and doing it better than most restaurants in this city.',
      artDirection:
        'Packed Japanese night market street, stall lanterns and steam, a long queue at one stall, a cook working a single burner and griddle at speed, crowd eating standing up. Loud, hot, exhilarating.',
      connections: [
        { to: 'the_arcade_street', travelMinutes: 9, label: 'Back to the street' },
        { to: 'culinary_school', travelMinutes: 12, label: 'Over to the school' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [],
    },
    {
      id: 'vanta',
      name: 'VANTA',
      shortName: 'VANTA',
      description:
        'Eighteen covers a sitting, two sittings, a kitchen with eleven people in it and a pass that never raises its voice. It is the best restaurant in this city and the thing that is most surprising about it from the inside is how quiet it is.',
      artDirection:
        'High-end restaurant kitchen, immaculate stainless and low lighting, eleven chefs working in near silence at separate stations, a spotless pass, tweezers and small bowls. Calm, precise, intimidating.',
      connections: [
        { to: 'the_arcade_street', travelMinutes: 16, label: 'Back across town' },
        { to: 'city_table_hall', travelMinutes: 7, label: 'To the circuit hall' },
        { to: 'reina_office', travelMinutes: 9, label: 'Over to the paper' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [],
    },
    {
      id: 'city_table_hall',
      name: 'The Circuit Hall',
      shortName: 'The Hall',
      description:
        'A converted market building the city uses for eleven Services over four weeks: benches, gas rings, a scoring table for the ones that have scoring, and about two hundred people standing round the edges eating things off paper.',
      artDirection:
        'Converted market hall set up for a cooking event, rows of temporary cooking benches with gas rings, a judging table, crowds standing at the edges with paper trays, high industrial windows. Busy, improvised, festive.',
      connections: [
        { to: 'the_arcade_street', travelMinutes: 11, label: 'Back to the street' },
        { to: 'vanta', travelMinutes: 7, label: 'Across to VANTA' },
        { to: 'the_hotel', travelMinutes: 8, label: 'Over to the hotel' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'city_table_card', qty: 1, ownerId: null, aka: ['the card', 'the invitation', 'the dates'] },
      ],
    },
    {
      id: 'culinary_school',
      name: 'The Culinary School',
      shortName: 'The School',
      description:
        'Four teaching kitchens, a demonstration theatre and a hundred and forty students who mostly will not still be cooking in six years. It smells of stock and floor cleaner and everybody who has ever been through it can identify that smell instantly at forty.',
      artDirection:
        'Culinary school teaching kitchen, rows of identical stainless stations, students in whites at a demonstration counter, a wall of hanging pans, bright even lighting. Institutional, hopeful, slightly sterile.',
      connections: [
        { to: 'night_market', travelMinutes: 12, label: 'Down to the night market' },
        { to: 'the_hotel', travelMinutes: 10, label: 'Across to the hotel' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 3 },
      takeableItems: [],
    },
    {
      id: 'the_hotel',
      name: 'The Hotel Kitchen',
      shortName: 'The Hotel',
      description:
        'A banquet operation doing four hundred covers of one menu, with a brigade of twenty and a system that works whether or not anybody in it is inspired. It is the least romantic kitchen in the city and it is also the only one that has never once failed to serve.',
      artDirection:
        'Large hotel banquet kitchen, long stainless runs and plating lines, twenty chefs in whites working a single menu at scale, hot cupboards and trolleys. Industrial, enormous, relentlessly organised.',
      connections: [
        { to: 'city_table_hall', travelMinutes: 8, label: 'Back to the hall' },
        { to: 'culinary_school', travelMinutes: 10, label: 'Over to the school' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 3, y: 2 },
      takeableItems: [],
    },
    {
      id: 'reina_office',
      name: 'The Paper',
      shortName: 'The Paper',
      description:
        'A food desk of three people on the fourth floor of a building with two hundred in it. There is a drawer with eleven spiked pieces in it and one of them is about a thirty-seat restaurant that the writer decided not to send anybody to yet.',
      artDirection:
        'Modern newspaper food desk, three cluttered workstations, shelves of cookbooks and press releases, a window onto a city, one filing drawer half open. Ordinary, professional, unremarkable.',
      connections: [{ to: 'vanta', travelMinutes: 9, label: 'Back across to VANTA' }],
      discoveredByDefault: true,
      mapPosition: { x: 3, y: 1 },
      takeableItems: [
        { itemId: 'reinas_piece', qty: 1, ownerId: 'reina', aka: ['the piece', 'the review', 'the spiked one', 'the drawer'] },
      ],
    },
    {
      id: 'keiko_flat',
      name: 'Keiko’s Flat',
      shortName: 'Keiko’s',
      description:
        'Two rooms above a laundry six minutes from the restaurant, chosen nineteen years ago because it was six minutes from the restaurant. There is almost nothing in it, because everything she owns that matters is in a kitchen down the road.',
      artDirection:
        'Small sparse Japanese apartment above a shop, minimal furniture, one framed photograph of a restaurant opening, a futon, a kitchen with almost nothing in it. Tidy, temporary-feeling after nineteen years.',
      connections: [{ to: 'the_arcade_street', travelMinutes: 6, label: 'Back down to the street' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_neighbourhood',
      name: 'The Neighbourhood',
      description: 'The tram street, the arcade, the laundry, the bar with eleven seats, and about four hundred people who know exactly how Akari is doing from how full the window is at eight.',
      startingReputation: 35,
      ranks: [
        { atReputation: -40, label: 'Somewhere people used to go' },
        { atReputation: 0, label: 'A place on the street' },
        { atReputation: 40, label: 'Ours' },
        { atReputation: 70, label: 'The reason people stay on this street' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_trade',
      name: 'The Trade',
      description: 'Every kitchen in Mizuhama, the market at five, the suppliers, and a professional community that is small enough that a reputation crosses it in about nine days.',
      startingReputation: 10,
      ranks: [
        { atReputation: -40, label: 'Nobody will stage for you' },
        { atReputation: 0, label: 'Somebody at a small place' },
        { atReputation: 40, label: 'Worth putting on a Service with' },
        { atReputation: 70, label: 'Somebody chefs come in on a Monday to eat' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_media',
      name: 'The Food Press',
      description: 'Three critics, four bloggers with real reach, a television slot and a city that reads all of it. It can fill a thirty-seat room for a year and it can also fill it with the wrong people in a fortnight.',
      startingReputation: 0,
      ranks: [
        { atReputation: -40, label: 'Written about badly, once' },
        { atReputation: 0, label: 'Not on anybody’s list' },
        { atReputation: 40, label: 'Mentioned' },
        { atReputation: 70, label: 'A piece with your name in the headline' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_money',
      name: 'The Money',
      description: 'The lender, the landlord, the supplier’s accounts department and two restaurant groups who buy small rooms in trouble. None of them is a villain and all of them have a date in a diary.',
      startingReputation: -10,
      ranks: [
        { atReputation: -40, label: 'Called' },
        { atReputation: 0, label: 'On terms' },
        { atReputation: 40, label: 'Given room' },
        { atReputation: 70, label: 'Somebody they would lend to again' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'mina',
      name: 'Mina Saegusa',
      role: 'Twenty-four, sous-chef at the best restaurant in the city, and the one they call the knife that never hesitates',
      cardBlurb:
        'She came out of the rain to hand you an invitation, not to mock anybody, and she will tell you your sauce is broken in the same voice she uses to order a drink. Her food is technically perfect and she is quietly terrified that this is because she has nothing to say.',
      pronouns: 'she/her',
      publicTraits: ['Notices everything on a plate within about a second', 'Rolls her sleeves before she has decided to help', 'Says the accurate thing rather than the kind one'],
      hiddenDrives: [
        'She wants to make one dish that is about something and has not been able to find one in six years of looking',
        'She would like a kitchen that does not fall apart when she stops controlling it, and has never once tested whether one exists',
      ],
      values: [
        'A dish being a promise, in which every single choice on the plate is intentional',
        'Consistency, which she regards as the only honest form of respect for the person eating',
      ],
      fears: [
        'Being technically excellent and creatively empty, which is a sentence she has thought and never said',
        'A service going wrong around her, which is the thing that turns her into somebody she does not like',
      ],
      socialStyle:
        'Direct, dry and faintly amused, with no small talk at all. Assesses before she speaks and then says the whole assessment. Warmer in a kitchen than anywhere else, which she is aware of and does not examine.',
      boundaries: [
        'Will not praise something she does not rate, at all, for any social reason, which has cost her two friendships',
        'Will not have a plate go out with a mistake on it hidden under garnish, and will stop a service over it',
      ],
      goals: [
        'Executive chef at VANTA before she is thirty, which is a real timetable rather than an ambition',
        'Find out whether she can cook something personal, which she has never told anybody is an open question',
      ],
      secrets: [
        {
          id: 'mina_the_home',
          fact: 'She grew up in a house where nothing was predictable, and cooking was the one place where doing everything correctly produced a result that made sense. The control is not discipline; it is the defence.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it in about eleven words, at the end of a bad service, to somebody who has just seen her stop trusting a line.',
        },
        {
          id: 'mina_the_dish',
          fact: 'She has tried nine times over two years to put a dish on the VANTA menu that is about her own life. All nine were technically excellent and she pulled every one of them before service.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it after somebody has put a genuinely personal dish in front of her and she has had to sit with what it did to her.',
        },
      ],
      speechStyle:
        'Precise, dry and short, with the assessment delivered whole and without softening. Cutting when it is deserved and never for effect. Fewer words rather than more when she is exposed, which is the tell. Never does the flustered-rival thing and would find the suggestion baffling.',
      topics: ['the circuit', 'your food', 'VANTA', 'Haruto', 'consistency', 'what a dish is for'],
      voiceSamples: [
        'Your sauce is broken. — I know. — Good. I hate wasting an insult.',
        'It is a promise. If you are putting it in front of somebody then every single thing on it should be there because you decided it should be. The parsley is not a decision, it is a habit.',
        'I have taken nine dishes off a menu before service in two years. All of them were correct. That is the whole problem with them and I have not said that out loud before.',
        'I am not being encouraging. If you want encouraging there are forty people in this city who will do that for free and none of them will tell you why the fish was wrong.',
      ],
      appearance:
        'Twenty-four, long dark hair in a low practical ponytail, sharp amber-brown eyes, lean and strong through the forearms, a white jacket with the sleeves rolled, a small burn scar near the left wrist, and a slim silver tasting spoon clipped at the chest.',
      visualHook: 'A slim silver tasting spoon clipped at the chest, in and out of the kitchen, at all hours.',
      silhouette: 'Standing square at a bench with both hands working and her head down.',
      artSeed: 'ls-mina-01',
      portrait: null,
      expressions: ['neutral', 'assessing', 'dry', 'sharp', 'exposed'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'vanta', activity: 'the clean-down, the prep list, and four hours of sleep somewhere' },
        { startMinute: 360, endMinute: 660, locationId: 'fish_market', activity: 'the market at five, for VANTA, with a list' },
        { startMinute: 660, endMinute: 1140, locationId: 'vanta', activity: 'the prep, the first sitting, the pass' },
        { startMinute: 1140, endMinute: 1260, locationId: 'akari_dining', activity: 'out of the rain with a knife roll and an invitation' },
        { startMinute: 1260, endMinute: 1440, locationId: 'vanta', activity: 'back for second sitting and the clean-down' },
      ],
      homeLocationId: 'vanta',
      knowledgeScope: ['mina', 'vanta', 'the_city_table', 'haruto', 'technique', 'mizuhama_kitchens'],
      startingRelationship: { trust: 20, affection: 10, respect: 25, fear: 0, rivalry: 35 },
      gates: [
        { id: 'mina_stops_assessing', label: 'She talks to you rather than about your food', kind: 'TRUST', requires: { trust: 55, respect: 60 } },
        { id: 'mina_shows_you_one', label: 'She cooks you one of the nine', kind: 'TRUST', requires: { trust: 70, respect: 68 } },
        { id: 'mina_closer', label: 'Neither of them is calling it professional interest', kind: 'ROMANCE', requires: { trust: 72, affection: 70 } },
      ],
      attributes: { might: 11, agility: 17, mind: 17, presence: 13, resolve: 16, arcana: 4 },
      companion: null,
      scouting: {
        learnRate: 1.6,
        cap: 8,
        revealCopy: 'She has already tasted it. "You go acid when you are unsure," she says, putting the spoon down. "Every time. It is a good instinct and it is now a tell."',
      },
      combatant: null,
    },
    {
      id: 'takumi',
      name: 'Takumi Arashi',
      role: 'Twenty-three, one burner and a griddle at the night market, four hundred covers a night, and a queue that has not been under twenty since March',
      cardBlurb:
        'He cooks better food on a single ring than most of this city manages with a brigade, he will teach you anything you ask, and he is bored within about four days of being good at something. He will make the circuit far more fun and considerably more dangerous.',
      pronouns: 'he/him',
      publicTraits: ['Talks to the queue while cooking for the queue', 'Cannot repeat a dish four nights running without changing it', 'Genuinely delighted by somebody else’s good idea'],
      hiddenDrives: [
        'He wants to find out whether he could do the disciplined thing, and is frightened enough of the answer to keep not trying',
        'He would like one person in this trade to rate him as a cook rather than as an act',
      ],
      values: [
        'People stopping talking when they eat it, which is his entire measure and is not a stupid one',
        'The stall staying open on a Tuesday in February for eleven people, which he has never missed',
      ],
      fears: [
        'Refinement, which he calls boring and which he has privately decided he would be bad at',
        'Being the man who was very exciting at twenty-three',
      ],
      socialStyle:
        'Loud, warm, immediately familiar and constantly moving. Compliments other cooks specifically and often. Deflects anything serious into a bit and comes back to it forty minutes later when nobody is expecting it.',
      boundaries: [
        'Will not cook something he has cooked the same way five times, and will change it rather than serve it',
        'Will not take a stall on the good pitch that somebody older has been on for eleven years, and has turned it down twice',
      ],
      goals: [
        'Do a Service that nobody can improvise their way through, and find out what happens',
        'Keep the stall open, which costs him about a third of what the offers on the table would pay',
      ],
      secrets: [
        {
          id: 'takumi_the_offers',
          fact: 'Two restaurant groups have offered him a room of his own. He has turned both down and told nobody, and he cannot fully explain the reason to himself.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It falls out mid-bit, and the bit does not land, and he does not try a second one.',
        },
        {
          id: 'takumi_the_training',
          fact: 'He did two years at the culinary school and left in the third, and has let everybody believe he never went, because self-taught is a better story and he knows it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Anybody who has been to that school recognises how he holds a knife, and he will not deny it if it is said out loud.',
        },
      ],
      speechStyle:
        'Fast, loud and enormously generous with other people, delivered while doing four things. Sentences arrive out of order and land anyway. Turns anything serious into a bit and then answers it properly a long time later when nobody is braced.',
      topics: ['the stall', 'one burner', 'the offers', 'what you cooked', 'the queue', 'improvising'],
      voiceSamples: [
        'One ring. One. That is all of it, that is the whole kitchen, and there are two hundred people out there and eleven of them have been here since seven. Do you want to see something stupid?',
        'That is good. No, listen, I am not being nice, the acid on that is doing an actual job and I am going to steal it on Thursday and tell everybody where I got it.',
        'Refinement is four people in a quiet room agreeing that something is correct. I would rather two hundred people in a wet street stop talking for eleven seconds.',
        'They offered me a room. Twice. Proper room, proper money. I said no both times and I have not been able to give anybody a reason including me, so — anyway, taste this.',
      ],
      appearance:
        'Twenty-three, wiry, hair tied up under a cloth, forearms scarred to the elbow from a griddle he stands too close to, a T-shirt and a canvas apron, and permanently damp from steam and rain in equal measure.',
      visualHook: 'Griddle burns up both forearms in overlapping bands, worn short-sleeved in any weather.',
      silhouette: 'Half-turned away from a burner with one arm out to a queue, talking over his shoulder.',
      artSeed: 'ls-takumi-01',
      portrait: null,
      expressions: ['neutral', 'delighted', 'focused', 'bored', 'stung'],
      schedule: [
        { startMinute: 0, endMinute: 180, locationId: 'night_market', activity: 'the last of the queue, the clean-down, and one burner going cold' },
        { startMinute: 180, endMinute: 600, locationId: 'night_market', activity: 'asleep in a room four streets away, badly' },
        { startMinute: 600, endMinute: 900, locationId: 'fish_market', activity: 'the market late, buying what nobody else wanted, cheap and good' },
        { startMinute: 900, endMinute: 1080, locationId: 'the_arcade_street', activity: 'anywhere. Eating somebody else’s food and being extremely loud about it' },
        { startMinute: 1080, endMinute: 1440, locationId: 'night_market', activity: 'the stall, four hundred covers, one ring' },
      ],
      homeLocationId: 'night_market',
      knowledgeScope: ['takumi', 'the_night_market', 'improvising', 'the_school', 'street_food', 'mizuhama_kitchens'],
      startingRelationship: { trust: 30, affection: 35, respect: 20, fear: 0, rivalry: 30 },
      gates: [
        { id: 'takumi_teaches_you', label: 'He shows you how he actually does it', kind: 'TRUST', requires: { trust: 50, respect: 45 } },
        { id: 'takumi_says_it', label: 'He tells you about the offers and does not make it a bit', kind: 'TRUST', requires: { trust: 68, affection: 55 } },
      ],
      attributes: { might: 13, agility: 17, mind: 14, presence: 16, resolve: 14, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'haruto',
      name: 'Haruto Gin',
      role: 'Forty-eight, executive chef at VANTA, and the most formidable person in this story because he is not trying to be',
      cardBlurb:
        'He will tell you, once, that a chef’s job is not the best plate but a kitchen capable of a hundred and twenty good ones. He was a wild creative cook once and his first restaurant collapsed under praise, turnover and unpaid vendors, and he has never once told that story as a warning.',
      pronouns: 'he/him',
      publicTraits: ['Has not raised his voice in a kitchen in fifteen years', 'Knows the name and the notice period of everybody in his building', 'Says one sentence per problem'],
      hiddenDrives: [
        'He wants somebody to take VANTA from him properly rather than inherit it, and has not said that to Mina in six years',
        'He misses the cooking, in a way he has decided is a young man’s complaint and refuses to indulge',
      ],
      values: [
        'A system that works when he is not in the building, which he regards as the only real achievement in this trade',
        'Paying people, on time, which is not a boast where he is standing and is the thing that ended his first restaurant',
      ],
      fears: [
        'Building an excellent kitchen full of people he has reduced to stations',
        'Watching somebody talented do exactly what he did at twenty-nine while he explains the finances at them',
      ],
      socialStyle:
        'Calm to the point of being restful, which people find unnerving in a kitchen. Asks one question, listens to all of it, and answers in a sentence. Never flatters and never diminishes.',
      boundaries: [
        'Will not let a service be rescued by one person being brilliant, and will stop it and reset instead',
        'Will not poach from a small restaurant that would fold without the person, which has cost him two hires he wanted',
      ],
      goals: [
        'Get VANTA to a point where it survives him, which is now about eighteen months of work',
        'Find out whether the sous-chef can lead rather than only execute, which the circuit is quite deliberately going to test',
      ],
      secrets: [
        {
          id: 'haruto_the_first_place',
          fact: 'His first restaurant had the best reviews of that year and closed in fourteen months owing four suppliers. He has the final accounts in a drawer and has never shown them to anybody, including Mina.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He produces them, flatly, for anybody who tells him that talent should be enough.',
        },
        {
          id: 'haruto_ate_at_akari',
          fact: 'He ate at Akari eleven years ago, on his own, on a Tuesday, and has remembered one specific dish from it ever since and never mentioned it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He names the dish, correctly, in a way that makes it obvious he has not needed to look it up.',
        },
      ],
      speechStyle:
        'Calm, brief and structural. Talks about kitchens as systems and people as people, and is aware those are different and holds both. One sentence per problem, delivered after a pause long enough that everybody has stopped talking. Never uses a superlative about food, including his own.',
      topics: ['systems', 'his first restaurant', 'Mina', 'small restaurants', 'paying people', 'what a chef is for'],
      voiceSamples: [
        'A hundred and twenty covers, every night, good. That is the job. The best plate you will ever cook is not the job and it is what everybody comes into this trade wanting.',
        'My first place had the reviews of the year. It closed in fourteen months owing four suppliers, and two of those men are still working, and I still see them.',
        'She can execute anything. I have not yet seen her run a room that was going wrong, which is the only part of this I cannot teach her, so I have entered her in something that will go wrong.',
        'Thirty seats, and a hood that is out of code. Forgive me for being blunt about it. Fix the hood, then worry about menus.',
      ],
      appearance:
        'Forty-eight, compact and completely still, short greying hair, a plain white jacket with no name on it, forearms scarred the way everybody’s are, and reading glasses he uses only for a rota.',
      visualHook: 'A chef’s jacket with no name embroidered on it, in a restaurant where everybody else’s has one.',
      silhouette: 'Standing at the end of a pass with his hands behind his back, not touching anything.',
      artSeed: 'ls-haruto-01',
      portrait: null,
      expressions: ['neutral', 'considering', 'approving', 'grave', 'tired'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'vanta', activity: 'the office after service, doing the rota and the orders' },
        { startMinute: 300, endMinute: 600, locationId: 'vanta', activity: 'five hours of sleep in a flat upstairs he barely uses' },
        { startMinute: 600, endMinute: 1080, locationId: 'vanta', activity: 'the building, eleven people, one sentence per problem' },
        { startMinute: 1080, endMinute: 1260, locationId: 'city_table_hall', activity: 'the circuit, on the organising side, saying almost nothing' },
        { startMinute: 1260, endMinute: 1440, locationId: 'vanta', activity: 'second sitting, at the end of the pass, not touching anything' },
      ],
      homeLocationId: 'vanta',
      knowledgeScope: ['haruto', 'vanta', 'systems', 'his_first_restaurant', 'the_city_table', 'akari'],
      startingRelationship: { trust: 15, affection: 5, respect: 30, fear: 15, rivalry: 10 },
      gates: [
        { id: 'haruto_takes_you_seriously', label: 'He gives you a sentence about your own kitchen', kind: 'OTHER', requires: { respect: 50, flagsSet: ['spoke:haruto'] } },
        { id: 'haruto_shows_you_the_accounts', label: 'He shows you what happened to his first place', kind: 'TRUST', requires: { trust: 60, respect: 65 } },
      ],
      attributes: { might: 12, agility: 12, mind: 18, presence: 17, resolve: 18, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'keiko',
      name: 'Keiko',
      role: 'Forty-six, your aunt, and the person who has kept this restaurant open for nineteen years',
      cardBlurb:
        'She is your aunt, she has not taken a full day since March, and closing Akari would be a betrayal of your family and she will say so. She is right that a restaurant is a place people expect to still be there, and she is preserving this one past the point of her own health, and both of those are the same sentence.',
      pronouns: 'she/her',
      publicTraits: ['Knows every regular’s order and none of their surnames', 'Does the accounts on a Sunday and tells nobody the total', 'First in and last out, every day, for nineteen years'],
      hiddenDrives: [
        'She wants to be told it is all right to stop, by somebody in the family, and will argue with anybody who says it',
        'She has been quietly working out what she would even do with a Tuesday, and cannot get past about eleven in the morning',
      ],
      values: [
        'A restaurant being a place people expect to still be there, which is the whole of her and is genuinely beautiful',
        'The regulars, individually, by their order and their usual table and how their knees are',
      ],
      fears: [
        'Being the one who let it go, which she has framed as a betrayal of people who are dead',
        'Finding out that everybody has been carrying her for two years',
      ],
      socialStyle:
        'Brisk, warm and entirely unwilling to be the subject of a conversation. Redirects onto food or onto somebody else within a sentence. Says the important thing while wiping something down and does not stop wiping.',
      boundaries: [
        'Will not discuss the numbers in the kitchen, at all, in front of anybody who works here',
        'Will not have the family spoken about as a reason she should stop, which is the one thing that makes her genuinely angry',
      ],
      goals: [
        'Get through the next thirty days, which is the longest horizon she has used in two years',
        'Not be the one who closed it',
      ],
      secrets: [
        {
          id: 'keiko_the_book',
          fact: 'Nineteen years of covers in pencil, one line a night. The last four months are in the same handwriting as all of it, which is the part that is difficult to look at.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She hands it over rather than explaining it, to somebody who has asked her a real question about the money without pretending to already know the answer.',
        },
        {
          id: 'keiko_the_offer',
          fact: 'A restaurant group offered for the lease six weeks ago. She did not tell anybody, she did not reply, and she has kept the letter.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It comes out when somebody proposes something that would work, and she does not immediately say yes, and cannot say why.',
        },
      ],
      speechStyle:
        'Brisk domestic sentences delivered while doing something with her hands, and she does not stop doing it. Redirects any question about herself onto the food or onto whoever asked. Names regulars by their order rather than by their name. Goes very quiet instead of raising her voice.',
      topics: ['the regulars', 'nineteen years', 'the numbers', 'your grandmother', 'the hood', 'whether you have eaten'],
      voiceSamples: [
        'Table four is the mackerel and no ginger, and she has been in every Thursday since the year we opened, and she is going to ask about your hands.',
        'Nineteen years. There has not been a week in nineteen years where somebody could not come here and find it open, and you are asking me to be the one who changes that.',
        'Eat that standing up if you like, but eat it. You have had one thing today and it was at half past six this morning and it was a rice ball.',
        'I do the numbers on Sunday. That is Sunday’s business. It is Friday and there are eleven covers coming at eight.',
      ],
      appearance:
        'Forty-six, small, hair up and held with whatever was to hand, forearms and hands that are nineteen years into this work, a chef’s jacket she stopped buttoning properly in about 2015, and reading glasses pushed up.',
      visualHook: 'A cloth over one shoulder at all times, including outside the building.',
      silhouette: 'Standing at a sink with her back to the room, talking over her shoulder.',
      artSeed: 'ls-keiko-01',
      portrait: null,
      expressions: ['neutral', 'brisk', 'fond', 'immovable', 'undefended'],
      schedule: [
        { startMinute: 0, endMinute: 90, locationId: 'akari_kitchen', activity: 'the clean-down, alone, at midnight, again' },
        { startMinute: 90, endMinute: 330, locationId: 'keiko_flat', activity: 'four hours, six minutes from the restaurant' },
        { startMinute: 330, endMinute: 660, locationId: 'fish_market', activity: 'the market at five, every day, in the same order' },
        { startMinute: 660, endMinute: 1080, locationId: 'akari_kitchen', activity: 'prep, the lunch covers, and paperwork she does standing up' },
        { startMinute: 1080, endMinute: 1440, locationId: 'akari_kitchen', activity: 'service, at the stove, where she has been since 2006' },
      ],
      homeLocationId: 'akari_kitchen',
      knowledgeScope: ['keiko', 'akari', 'the_regulars', 'the_numbers', 'the_family', 'the_neighbourhood'],
      startingRelationship: { trust: 65, affection: 70, respect: 40, fear: 0, rivalry: 0 },
      gates: [
        { id: 'keiko_shows_you_the_book', label: 'She gives you nineteen years of covers', kind: 'TRUST', requires: { trust: 72, respect: 55 } },
        { id: 'keiko_says_the_number', label: 'She says the actual figure out loud', kind: 'TRUST', requires: { trust: 78, affection: 70 } },
      ],
      attributes: { might: 11, agility: 12, mind: 15, presence: 14, resolve: 18, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'emi',
      name: 'Emi Nakahara',
      role: 'Twenty-one, the entire front of house, and the reason this kitchen gets away with anything',
      cardBlurb:
        'She knows the regulars, the allergies, who is having an anniversary and who is about to walk out. You can cook brilliantly and if she cannot explain a forty-minute wait the service has still failed, and she has been explaining them for two years.',
      pronouns: 'she/her',
      publicTraits: ['Rewrites the board every morning in her own handwriting', 'Knows which table is about to be a problem before it is one', 'Remembers what somebody said about their mother last November'],
      hiddenDrives: [
        'She wants somebody in that kitchen to understand that the room is a job rather than a courtesy',
        'She has been offered better money twice and has not gone, and would like that to have been noticed',
      ],
      values: [
        'The meal starting before the plate arrives, which she means literally and has thought about a great deal',
        'Being told what is happening in the kitchen, because she is the one who has to say it to forty people',
      ],
      fears: [
        'Being the one who was only ever the friendly one at the door',
        'Akari closing and finding out that what she is good at does not transfer',
      ],
      socialStyle:
        'Warm, quick and enormously observant, with the observation kept back until it is useful. Manages people without any of them noticing they are being managed. Extremely funny in the back alley and never in the room.',
      boundaries: [
        'Will not lie to a table about how long something is going to be, and will come and find out rather than guess',
        'Will not be described as a waitress by anybody in that kitchen twice',
      ],
      goals: [
        'Run a room of her own eventually, which she has told two people and neither of them was in this building',
        'Get through thirty days without anybody asking her to pretend everything is fine to a regular',
      ],
      secrets: [
        {
          id: 'emi_the_offers',
          fact: 'Two better-paid front-of-house jobs in the last year, both turned down, neither mentioned to anybody at Akari.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it in the alley, once, when somebody thanks her for something small and specific.',
        },
        {
          id: 'emi_the_regulars',
          fact: 'Eleven of the regulars have stopped coming on Fridays since the covers went up, and she has not told Keiko, because she does not know how to say it without it sounding like a criticism of the food.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells whoever asks her a direct question about the room rather than about the plates.',
        },
      ],
      speechStyle:
        'Warm and fast in the room, dry and considerably funnier out of it, and the switch between those is instant and total. Talks about tables as people with histories. Delivers bad news about the room as a fact plus a plan, never as a complaint.',
      topics: ['the room', 'the regulars', 'the wait times', 'the board', 'what the tables are saying', 'her own room one day'],
      voiceSamples: [
        'Six is going to walk in about four minutes. Not because of the wait. Because nobody has been back to them since the drinks and they have started looking at the door.',
        'You can send out the best thing you have ever cooked. If I cannot tell them why it took forty minutes, they will remember the forty minutes.',
        'Eleven of the Friday regulars have stopped coming. I have not said anything because it sounds like I am saying the food got worse, and I am not, and I do not know how to say the actual thing.',
        'Do not call me the waitress in front of the pass again. Once was a slip.',
      ],
      appearance:
        'Twenty-one, small, dark hair in a knot with a pen through it, a plain black apron over her own clothes, permanently carrying two things, and handwriting on the board that everybody in the neighbourhood would recognise.',
      visualHook: 'A pen through the knot of her hair, and a second one behind her ear that she has forgotten.',
      silhouette: 'Half-turned between two tables with a plate in each hand, already looking at a third.',
      artSeed: 'ls-emi-01',
      portrait: null,
      expressions: ['neutral', 'bright', 'dry', 'sharp', 'flat'],
      schedule: [
        { startMinute: 0, endMinute: 90, locationId: 'akari_dining', activity: 'the last table, the till, and the board wiped down' },
        { startMinute: 90, endMinute: 480, locationId: 'the_arcade_street', activity: 'home, four streets, and about six hours' },
        { startMinute: 480, endMinute: 660, locationId: 'akari_dining', activity: 'the board, the bookings, and the lunch covers' },
        { startMinute: 660, endMinute: 1020, locationId: 'the_arcade_street', activity: 'the afternoon off, mostly spent on this street anyway' },
        { startMinute: 1020, endMinute: 1440, locationId: 'akari_dining', activity: 'the room, thirty seats, and everybody in it' },
      ],
      homeLocationId: 'akari_dining',
      knowledgeScope: ['emi', 'akari', 'the_room', 'the_regulars', 'front_of_house', 'the_neighbourhood'],
      startingRelationship: { trust: 60, affection: 55, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        { id: 'emi_tells_you_about_the_room', label: 'She tells you what the tables are actually doing', kind: 'TRUST', requires: { trust: 60, respect: 50 } },
        { id: 'emi_closer', label: 'The alley conversations stop being about the restaurant', kind: 'ROMANCE', requires: { trust: 72, affection: 70 } },
      ],
      attributes: { might: 9, agility: 13, mind: 16, presence: 17, resolve: 15, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'daichi',
      name: 'Daichi Ren',
      role: 'Twenty-two, on the Akari line for four years, and reliable in a way nobody has ever thanked him for',
      cardBlurb:
        'He has been here longer than you have and he can hold a service together on his own, which he has done more often than anybody has counted. If you come back and start acting like the boss he will not say anything about it, which is worse.',
      pronouns: 'he/him',
      publicTraits: ['Never behind, never flashy, never late', 'Answers a question with the thing he has already done about it', 'Goes completely silent when he is annoyed'],
      hiddenDrives: [
        'He wants to put one dish of his own on that menu and has not asked in four years',
        'He is frightened that reliable is the whole of it, and has arranged his working life so that nobody can test that',
      ],
      values: [
        'A kitchen being trust, which is his whole definition and which he has never said out loud',
        'Doing the unglamorous half properly, on the grounds that somebody has to and it is usually him',
      ],
      fears: [
        'Being the one who was always there and never actually did anything',
        'Cooking something of his own in front of people and it being fine',
      ],
      socialStyle:
        'Quiet, dry and completely present. Does not initiate. Answers a question with the thing he has already handled. Goes silent rather than argue and stays silent for exactly as long as it takes.',
      boundaries: [
        'Will not have somebody come back after two years and reorganise his station without asking',
        'Will not cover for a mistake with a customer, and will say so quietly at the pass rather than in the room',
      ],
      goals: [
        'Get one thing of his onto that board, which is a four-year-old ambition he has never voiced',
        'Keep this kitchen running for thirty days, which he has already worked out how to do and told nobody',
      ],
      secrets: [
        {
          id: 'daichi_the_dish',
          fact: 'He has been developing one dish, at home, for four years. Eleven versions. He has never cooked it for anybody, including his own family.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He mentions the eleventh version in passing as though it were nothing, and then does not follow it up, and waits.',
        },
        {
          id: 'daichi_the_covers',
          fact: 'He has been quietly running the last two months of Fridays on his own while Keiko does paperwork standing up in the corner, and has arranged it so she has not noticed.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Anybody who works one Friday properly can see it. He will not deny it and will not want it mentioned to her.',
        },
      ],
      speechStyle:
        'Short, flat and practical, with everything already done by the time he mentions it. Answers a question with a status rather than an opinion. Silence is his whole emotional register and its length is the content. Never once uses a word about food that is not technical.',
      topics: ['the station', 'the Friday covers', 'his dish', 'four years here', 'the prep list', 'what you moved'],
      voiceSamples: [
        'Fish is portioned, stock is on, the grill is up and the second burner still is not. I did the ginger because you were going to ask.',
        'You moved my mise. I am not going to make a thing of it. I am telling you because you will do it again.',
        'Eleventh version. It is close. Anyway, four is waiting.',
        'A kitchen is trust. That is all it is. Somebody does the thing they said and the next person can start.',
      ],
      appearance:
        'Twenty-two, solid, cropped hair, a jacket that fits properly because he has three of them, forearms scarred low from the grill, and a station that is the tidiest thing in the building at every hour.',
      visualHook: 'A station laid out identically every single day, to the centimetre, which everybody has stopped noticing.',
      silhouette: 'Head down at a board, working, not looking up.',
      artSeed: 'ls-daichi-01',
      portrait: null,
      expressions: ['neutral', 'focused', 'flat', 'quietly pleased', 'shut down'],
      schedule: [
        { startMinute: 0, endMinute: 90, locationId: 'akari_kitchen', activity: 'the clean-down, and the prep list for tomorrow' },
        { startMinute: 90, endMinute: 480, locationId: 'the_arcade_street', activity: 'home, and the eleventh version of something, alone' },
        { startMinute: 480, endMinute: 1020, locationId: 'akari_kitchen', activity: 'prep, lunch, and the station laid out to the centimetre' },
        { startMinute: 1020, endMinute: 1440, locationId: 'akari_kitchen', activity: 'service, on the line, holding it together' },
      ],
      homeLocationId: 'akari_kitchen',
      knowledgeScope: ['daichi', 'akari', 'the_line', 'the_prep', 'his_dish'],
      startingRelationship: { trust: 45, affection: 30, respect: 40, fear: 0, rivalry: 25 },
      gates: [
        { id: 'daichi_stops_being_quiet', label: 'He tells you what he actually thinks of how you came back', kind: 'TRUST', requires: { trust: 58, respect: 55 } },
        { id: 'daichi_cooks_it', label: 'He cooks the eleventh version for somebody', kind: 'TRUST', requires: { trust: 70, respect: 65 } },
      ],
      attributes: { might: 14, agility: 15, mind: 13, presence: 10, resolve: 17, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'reina',
      name: 'Reina Kado',
      role: 'Thirty-five, food critic, and the person in this city whose four hundred words can fill a thirty-seat room for a year',
      cardBlurb:
        'She owes the eater the truth rather than the chef a kindness, she has been treated as a villain for eleven years for saying so, and she hates it. There is a piece about your family’s restaurant in a drawer at her office that she wrote four years ago and decided not to publish.',
      pronouns: 'she/her',
      publicTraits: ['Books under other names and pays for everything', 'Will not be photographed', 'Answers a chef’s question honestly and once'],
      hiddenDrives: [
        'She wants one restaurant she has praised to still be open in ten years, which has happened twice in eleven years',
        'She is aware that what she writes can destroy a small room and has never worked out what to do with that awareness',
      ],
      values: [
        'The reader, who paid for the paper and is going to pay for the dinner',
        'Going back three times before writing anything, which almost nobody else on her desk still does',
      ],
      fears: [
        'Being the reason a family restaurant filled up with the wrong people and folded inside a year',
        'Her own blind spots, which she can list and has never been able to correct for',
      ],
      socialStyle:
        'Direct, unglamorous and slightly braced, because most conversations with chefs are an ambush. Will talk about food for hours with anybody who is not asking her for anything. Extremely uncomfortable being thanked.',
      boundaries: [
        'Will not tell a chef what she is going to write, at all, ever, however much it would cost her not to',
        'Will not review a restaurant she has any relationship with, and has withdrawn from two she wanted',
      ],
      goals: [
        'Write the thing that is true about this circuit rather than the thing that is fun about it',
        'Work out whether to run a four-year-old piece about a thirty-seat restaurant',
      ],
      secrets: [
        {
          id: 'reina_the_spiked_piece',
          fact: 'She wrote nine hundred words about Akari four years ago and spiked it. It is a very good review of a restaurant she decided not to send anybody to yet, and she has kept the only copy.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it exists when somebody asks her, straight, whether she has ever been to Akari.',
        },
        {
          id: 'reina_the_one_that_folded',
          fact: 'A twenty-two seat place she praised in her second year filled with people who wanted the story, lost its regulars and closed in eleven months. She has never written about a small restaurant the same way since.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She gives the name and the dates to anybody who accuses her of not understanding what a review does.',
        },
      ],
      speechStyle:
        'Precise, unsentimental and slightly wary, with the professional line stated up front so nobody wastes time on it. Talks about food in enormous specific detail and about her own influence as little as she can manage. Refuses flattery flatly and refuses thanks worse.',
      topics: ['the circuit', 'what a review does', 'the piece she spiked', 'her blind spots', 'small restaurants', 'the reader'],
      voiceSamples: [
        'I am not going to tell you what I am writing. Not tonight, not after, not ever, and if you ask again I will have to stop coming, which neither of us wants.',
        'A critic owes the eater the truth. Not the chef a kindness. Those get confused constantly and almost always by people who have not paid for their own dinner in a decade.',
        'A piece of mine puts a queue outside a twenty-two-seat dining room for about six weeks. That queue is not made of its customers. When it moves on, the customers have moved on with it, and I have watched precisely that happen twice.',
        'Three visits. Always three, always paid, always under a name that is not mine. It is the only part of this job I have never once cut a corner on.',
      ],
      appearance:
        'Thirty-five, deliberately unmemorable in a way that has clearly taken effort, dark hair to the shoulder, plain coat, no jewellery, a small notebook she writes in afterwards in the street rather than at the table.',
      visualHook: 'A small notebook written in outside, in the street, never at the table.',
      silhouette: 'Sitting alone at a two-top with her coat still on, facing the room.',
      artSeed: 'ls-reina-01',
      portrait: null,
      expressions: ['neutral', 'attentive', 'guarded', 'engaged', 'uncomfortable'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'reina_office', activity: 'writing at two in the morning because that is when it is quiet' },
        { startMinute: 420, endMinute: 720, locationId: 'reina_office', activity: 'asleep, properly, like somebody who does not work in a kitchen' },
        { startMinute: 720, endMinute: 1080, locationId: 'reina_office', activity: 'the desk, the pitches, and eleven emails from publicists' },
        { startMinute: 1080, endMinute: 1320, locationId: 'city_table_hall', activity: 'the circuit, eating standing up, writing nothing down' },
        { startMinute: 1320, endMinute: 1440, locationId: 'reina_office', activity: 'back at the desk, writing it while it is still accurate' },
      ],
      homeLocationId: 'reina_office',
      knowledgeScope: ['reina', 'the_press', 'the_city_table', 'mizuhama_restaurants', 'the_spiked_piece'],
      startingRelationship: { trust: 10, affection: 0, respect: 20, fear: 20, rivalry: 0 },
      gates: [
        { id: 'reina_talks_about_food', label: 'She stops being braced and talks for two hours', kind: 'TRUST', requires: { trust: 50, respect: 50 } },
        { id: 'reina_mentions_the_drawer', label: 'She tells you the piece exists', kind: 'TRUST', requires: { trust: 65, respect: 60 } },
      ],
      attributes: { might: 8, agility: 10, mind: 18, presence: 14, resolve: 16, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_friday',
      title: 'Friday',
      summary: 'Half a room, a hood making a noise, a dish sent back, and a woman coming in out of the rain with a knife roll.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['keiko', 'daichi', 'emi', 'mina'],
      involvedLocationIds: ['akari_kitchen', 'akari_dining', 'the_back_alley'],
      knownRewardCopy: 'The state of this restaurant, said out loud by somebody for the first time.',
      steps: [
        {
          id: 'the_dish_that_came_back',
          playerCopy: 'Table six sent the fish back and they were right about it.',
          directorNotes:
            'Not a disaster. An ordinary Friday going slightly wrong in the specific way that a strained kitchen goes wrong. Whatever the player does here is the first thing everybody in this building learns about who came back.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'cooked_it_again',
              label: 'Cook it again, properly, and eat the cost',
              predicate: { flagsSet: ['used:cook_it_properly'] },
              setsFlags: ['recooked_it', 'the_line_saw_you'],
              closesFlags: [],
            },
            {
              routeId: 'went_out_front',
              label: 'Go out into the room yourself',
              predicate: { flagsSet: ['used:save_the_table'], atLocation: 'akari_dining' },
              setsFlags: ['went_out_front', 'the_room_saw_you'],
              closesFlags: [],
            },
            {
              routeId: 'tasted_the_line',
              label: 'Taste down the whole line before anything else',
              predicate: { flagsSet: ['used:taste_it'] },
              setsFlags: ['tasted_the_line', 'the_line_saw_you'],
              closesFlags: [],
            },
            {
              routeId: 'let_daichi_handle_it',
              label: 'Let the person who has been here four years deal with it',
              predicate: { flagsSet: ['spoke:daichi'] },
              setsFlags: ['let_daichi_handle_it'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['knows:friday'], abilities: [], reputation: [] },
        },
        {
          id: 'the_invitation',
          playerCopy: 'She has not come to eat.',
          directorNotes:
            'She is not here to mock anybody and does not. She hands over a card, says one accurate thing about what she has just watched, and waits. Refusing is a full route: Akari still has thirty days and there are other ways to find money.',
          enterWhen: { flagsSet: ['knows:friday'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_it',
              label: 'Take the card',
              predicate: { hasItems: ['city_table_card'] },
              setsFlags: ['in_the_circuit', 'knows:the_city_table'],
              closesFlags: ['refused_the_circuit'],
            },
            {
              routeId: 'cooked_for_her',
              label: 'Put something in front of her before you answer',
              predicate: { flagsSet: ['used:cook_for_one_person'], atLocation: 'akari_kitchen' },
              setsFlags: ['in_the_circuit', 'cooked_for_mina', 'knows:the_city_table'],
              closesFlags: ['refused_the_circuit'],
            },
            {
              routeId: 'refused',
              label: 'Say no in front of everybody',
              predicate: { flagsSet: ['spoke:mina'] },
              setsFlags: ['refused_the_circuit'],
              closesFlags: ['in_the_circuit'],
            },
          ],
          rewards: { xp: 70, items: [], flags: ['the_first_night_is_over'], abilities: [], reputation: [{ factionId: 'faction_trade', amount: 8 }] },
        },
      ],
    },
    {
      id: 'q_the_number',
      title: 'The Number',
      summary: 'Somebody in this building knows the exact figure and has not said it out loud to anybody in two years.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['the_first_night_is_over'] },
      involvedCharacterIds: ['keiko', 'emi', 'daichi'],
      involvedLocationIds: ['akari_office', 'the_back_alley', 'keiko_flat'],
      knownRewardCopy: 'What Akari actually owes, what it actually takes, and what the last two years have cost the person running it.',
      steps: [
        {
          id: 'find_out_what_it_is',
          playerCopy: 'Nobody has told you the figure. Find out what it is.',
          directorNotes:
            'She will not discuss it in the kitchen and will redirect anything that goes near it. The book is nineteen years of covers in pencil. The last four months are in the same handwriting as all of it, which is the thing that is hard to look at.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_her',
              label: 'Ask her, in the alley, with nobody else there',
              predicate: { flagsSet: ['used:say_the_number'], atLocation: 'the_back_alley' },
              setsFlags: ['knows:the_number', 'she_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_book',
              label: 'Read nineteen years of covers',
              predicate: { hasItems: ['keikos_book'] },
              setsFlags: ['knows:the_number', 'read_the_book'],
              closesFlags: [],
            },
            {
              routeId: 'asked_the_others',
              label: 'Ask the two people who have been watching it happen',
              predicate: { flagsSet: ['spoke:emi', 'spoke:daichi'] },
              setsFlags: ['knows:the_number', 'the_staff_told_you'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['the_number_is_out'], abilities: [], reputation: [] },
        },
        {
          id: 'what_the_two_years_cost',
          playerCopy: 'Work out what running this alone has actually done to her.',
          directorNotes:
            'Nineteen years, no full day since March, a flat six minutes away chosen because it was six minutes away. Emi and Daichi have both been quietly covering for her. This step is not a crisis and it should be the quietest scene in the world.',
          enterWhen: { flagsSet: ['the_number_is_out'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_a_service_off_her',
              label: 'Take a service off her without making it a conversation',
              predicate: { flagsSet: ['used:run_the_pass'], atLocation: 'akari_kitchen' },
              setsFlags: ['she_had_an_evening', 'knows:what_it_cost_her'],
              closesFlags: [],
            },
            {
              routeId: 'cooked_for_her',
              label: 'Cook for her, once, properly, for no reason',
              predicate: { flagsSet: ['used:cook_for_one_person'], minRelationship: [{ characterId: 'keiko', dimension: 'trust', value: 70 }] },
              setsFlags: ['cooked_for_keiko', 'knows:what_it_cost_her', 'knows:what_it_is_about'],
              closesFlags: [],
            },
            {
              routeId: 'said_it',
              label: 'Say out loud that closing is not a betrayal',
              predicate: { flagsSet: ['used:say_the_number'], atLocation: 'keiko_flat' },
              setsFlags: ['said_the_unsayable_thing', 'knows:what_it_cost_her'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 130, items: [], flags: ['knows:what_save_means'], abilities: [], reputation: [{ factionId: 'faction_neighbourhood', amount: 10 }] },
        },
      ],
    },
    {
      id: 'q_the_circuit',
      title: 'Eleven Services',
      summary: 'Four weeks of Services across the city. Some are head-to-head, some are ranked, some are collaborative, and some have no winner at all.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:the_city_table'] },
      involvedCharacterIds: ['mina', 'takumi', 'haruto', 'reina'],
      involvedLocationIds: ['city_table_hall', 'the_hotel', 'night_market', 'culinary_school'],
      knownRewardCopy: 'What you are actually good at, decided by eleven different tests of eleven different things.',
      steps: [
        {
          id: 'one_ingredient_three_ways',
          playerCopy: 'One ingredient, three ways, four hours, and everybody working from the same crate.',
          directorNotes:
            'The technical Service. Mina will win it on execution unless somebody does something she has not considered. Takumi will do something absurd that works. This is the one that establishes what the player is with their hands.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'out_teched_her',
              label: 'Beat the best technician in the city at technique',
              predicate: { flagsSet: ['used:cook_it_properly', 'used:taste_it'], atLocation: 'city_table_hall' },
              setsFlags: ['took_a_service', 'known_for_technique'],
              closesFlags: [],
            },
            {
              routeId: 'did_something_odd',
              label: 'Do the thing nobody in that hall has considered',
              predicate: { flagsSet: ['used:do_something_nobody_asked_for'], atLocation: 'city_table_hall' },
              setsFlags: ['took_a_service', 'known_for_ideas'],
              closesFlags: [],
            },
            {
              routeId: 'sourced_it_better',
              label: 'Win it at five in the morning before anybody has cooked anything',
              predicate: { flagsSet: ['used:go_to_the_market'] },
              setsFlags: ['took_a_service', 'known_for_sourcing'],
              closesFlags: [],
            },
            {
              routeId: 'came_nowhere',
              label: 'Cook honestly and come fourth',
              predicate: { atLocation: 'city_table_hall' },
              setsFlags: ['came_nowhere'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 110, items: [], flags: ['the_circuit_started'], abilities: [], reputation: [{ factionId: 'faction_trade', amount: 12 }, { factionId: 'faction_media', amount: 10 }] },
        },
        {
          id: 'feed_fifty',
          playerCopy: 'Feed fifty people from a budget that will not do it, in a hall with one working oven.',
          directorNotes:
            'The Service with no winner. It is ranked by whether the fifty people were fed well, and everybody who takes it seriously does better than everybody who treats it as a competition. Takumi is astonishing at this and knows it.',
          enterWhen: { flagsSet: ['the_circuit_started'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'fed_them_properly',
              label: 'Feed fifty people properly and forget about the ranking',
              predicate: { flagsSet: ['used:cook_for_one_person'], atLocation: 'city_table_hall' },
              setsFlags: ['fed_fifty', 'knows:what_it_is_about'],
              closesFlags: [],
            },
            {
              routeId: 'with_takumi',
              label: 'Do it beside the man who does four hundred off one burner',
              predicate: { minRelationship: [{ characterId: 'takumi', dimension: 'trust', value: 50 }] },
              setsFlags: ['fed_fifty', 'takumi_taught_you'],
              closesFlags: [],
            },
            {
              routeId: 'tried_to_win_it',
              label: 'Try to win a Service that does not have a winner',
              predicate: { flagsSet: ['used:do_something_nobody_asked_for'] },
              setsFlags: ['missed_the_point'],
              closesFlags: ['fed_fifty'],
            },
          ],
          rewards: { xp: 140, items: [], flags: ['the_middle_of_the_circuit'], abilities: ['cook_the_thing_you_have_never_shown_anybody'], reputation: [{ factionId: 'faction_neighbourhood', amount: 12 }] },
        },
        {
          id: 'the_service_that_goes_wrong',
          playerCopy: 'Somebody else’s dinner service is failing and the Service is to go in and rescue it.',
          directorNotes:
            'Haruto designed this one specifically to find out whether Mina can run a room that is going wrong rather than execute in one that is not. If the player is on her team, the interesting content is what she does when she stops trusting people.',
          enterWhen: { flagsSet: ['the_middle_of_the_circuit'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ran_the_room',
              label: 'Take the pass in somebody else’s kitchen',
              predicate: { flagsSet: ['used:run_the_pass'], atLocation: 'the_hotel' },
              setsFlags: ['rescued_the_service', 'known_for_leading'],
              closesFlags: [],
            },
            {
              routeId: 'let_her_lead',
              label: 'Give it to her and hold a station',
              predicate: { minRelationship: [{ characterId: 'mina', dimension: 'trust', value: 60 }], atLocation: 'the_hotel' },
              setsFlags: ['rescued_the_service', 'mina_led_it'],
              closesFlags: [],
            },
            {
              routeId: 'fixed_the_front',
              label: 'Fix the room rather than the kitchen',
              predicate: { flagsSet: ['used:save_the_table'], atLocation: 'the_hotel' },
              setsFlags: ['rescued_the_service', 'fixed_the_front'],
              closesFlags: [],
            },
            {
              routeId: 'it_went_down',
              label: 'Watch it go down and get the covers out anyway',
              predicate: { flagsSet: ['used:run_the_pass', 'used:save_the_table'] },
              setsFlags: ['the_service_failed'],
              closesFlags: ['rescued_the_service'],
            },
          ],
          rewards: { xp: 180, items: [], flags: ['the_circuit_is_decided'], abilities: [], reputation: [{ factionId: 'faction_trade', amount: 15 }] },
        },
      ],
    },
    {
      id: 'q_the_room',
      title: 'The Room Itself',
      summary: 'Thirty seats, four hundred people who know how it is doing from the window at eight, and a critic with a four-year-old piece in a drawer.',
      kind: 'SIDE',
      startsActive: false,
      discoverWhen: { flagsSet: ['the_first_night_is_over'] },
      involvedCharacterIds: ['emi', 'reina', 'keiko'],
      involvedLocationIds: ['akari_dining', 'reina_office', 'the_arcade_street'],
      knownRewardCopy: 'What this restaurant is to the people who live near it, which is not the same thing as what it takes on a Friday.',
      steps: [
        {
          id: 'what_the_tables_are_doing',
          playerCopy: 'Eleven of the Friday regulars have stopped coming and nobody has said so.',
          directorNotes:
            'The room is half the story. Emi has the information and has not raised it because it sounds like a criticism of the food. It is not — it is what happens when covers go up in a thirty-seat room and the waits get long.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'worked_the_room',
              label: 'Work a service out front instead of in the kitchen',
              predicate: { flagsSet: ['used:save_the_table'], atLocation: 'akari_dining' },
              setsFlags: ['knows:the_room', 'worked_the_room'],
              closesFlags: [],
            },
            {
              routeId: 'asked_emi',
              label: 'Ask the person who has been running it for two years',
              predicate: { minRelationship: [{ characterId: 'emi', dimension: 'trust', value: 60 }] },
              setsFlags: ['knows:the_room', 'emi_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'went_to_the_regulars',
              label: 'Go up the street and ask them yourself',
              predicate: { flagsSet: ['used:go_to_the_market'], atLocation: 'the_arcade_street' },
              setsFlags: ['knows:the_room', 'asked_the_street'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 90, items: [], flags: ['the_room_question_is_open'], abilities: [], reputation: [{ factionId: 'faction_neighbourhood', amount: 12 }] },
        },
        {
          id: 'the_piece_in_the_drawer',
          playerCopy: 'Somebody wrote nine hundred words about this restaurant four years ago and decided not to run them.',
          directorNotes:
            'She will not say what she is going to write and she will tell you honestly why she spiked it: a twenty-two seat place she praised in her second year filled with the wrong people and closed in eleven months. Running it now is a real risk to Akari and she knows it better than anybody.',
          enterWhen: { flagsSet: ['the_room_question_is_open'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_her_straight',
              label: 'Ask her whether she has ever been to Akari',
              predicate: { flagsSet: ['spoke:reina'], atLocation: 'reina_office' },
              setsFlags: ['knows:the_spiked_piece'],
              closesFlags: [],
            },
            {
              routeId: 'she_came_back',
              label: 'Cook a service well enough that she comes back a third time',
              predicate: { flagsSet: ['known_for_technique'], atLocation: 'akari_dining' },
              setsFlags: ['knows:the_spiked_piece', 'she_came_back'],
              closesFlags: [],
            },
            {
              routeId: 'asked_her_not_to',
              label: 'Ask her not to run anything at all',
              predicate: { flagsSet: ['knows:the_room', 'used:say_the_number'] },
              setsFlags: ['asked_her_not_to'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 140, items: [], flags: ['the_press_question_is_settled'], abilities: [], reputation: [{ factionId: 'faction_media', amount: 15 }] },
        },
      ],
    },
    {
      id: 'q_the_last_service',
      title: 'The Last Service',
      summary: 'Thirty days are up. Everything that could be done has been done, and now somebody has to say what happens to this room.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:what_save_means'] },
      involvedCharacterIds: ['keiko', 'emi', 'daichi', 'mina', 'haruto'],
      involvedLocationIds: ['akari_kitchen', 'akari_dining', 'akari_office', 'the_back_alley'],
      knownRewardCopy: 'What happens to Akari, and what save turned out to mean.',
      steps: [
        {
          id: 'what_is_on_the_table',
          playerCopy: 'Everything that could be done has been done. Find out what the actual options are.',
          directorNotes:
            'Four real ones and each is bad in a different way. A restaurant group has offered for the lease and Keiko never replied. The circuit money is real and is not enough on its own. Handing it to Daichi and Emi is genuinely viable and means Keiko stops. Closing well is an option that nobody in the building will raise.',
          enterWhen: { flagsSet: ['knows:what_save_means'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'the_money_worked',
              label: 'Make the numbers work',
              predicate: { flagsSet: ['took_a_service', 'knows:the_number'] },
              setsFlags: ['the_money_is_there'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_letter',
              label: 'Find the letter she never answered',
              predicate: { flagsSet: ['read_the_book'], atLocation: 'akari_office' },
              setsFlags: ['knows:the_offer'],
              closesFlags: [],
            },
            {
              routeId: 'they_would_run_it',
              label: 'Find out that two people here would take it on',
              predicate: { minRelationship: [{ characterId: 'daichi', dimension: 'trust', value: 65 }, { characterId: 'emi', dimension: 'trust', value: 65 }] },
              setsFlags: ['they_would_take_it'],
              closesFlags: [],
            },
            {
              routeId: 'nobody_said_it',
              label: 'Be the one who says the restaurant could close',
              predicate: { flagsSet: ['used:say_the_number'], atLocation: 'akari_kitchen' },
              setsFlags: ['somebody_said_it'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 200, items: [], flags: ['the_options_are_on_the_table'], abilities: [], reputation: [] },
        },
        {
          id: 'the_night_itself',
          playerCopy: 'Thirty seats. Cook.',
          directorNotes:
            'Whatever the decision is, there is a service that night and it is full. Write it as a service rather than as a climax — tickets, timing, one thing going wrong, Emi holding the room, Daichi never behind. Whatever is going to be said gets said in the alley afterwards.',
          enterWhen: { flagsSet: ['the_options_are_on_the_table'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'it_stays_open',
              label: 'It opens again on Tuesday',
              predicate: { flagsSet: ['the_money_is_there'], atLocation: 'akari_kitchen' },
              setsFlags: ['akari_stays', 'the_night_happened'],
              closesFlags: ['akari_closes'],
            },
            {
              routeId: 'they_take_it',
              label: 'Hand it to the two people who have been running it anyway',
              predicate: { flagsSet: ['they_would_take_it'], atLocation: 'akari_kitchen' },
              setsFlags: ['akari_stays', 'they_took_it', 'keiko_stopped', 'the_night_happened'],
              closesFlags: ['akari_closes'],
            },
            {
              routeId: 'closed_it_well',
              label: 'Close it, deliberately, with a full room and everybody in it',
              predicate: { flagsSet: ['somebody_said_it'], atLocation: 'akari_dining' },
              setsFlags: ['akari_closes', 'closed_it_well', 'keiko_stopped', 'the_night_happened'],
              closesFlags: ['akari_stays'],
            },
            {
              routeId: 'it_went_anyway',
              label: 'Cook the service and let the date arrive',
              predicate: { flagsSet: ['the_options_are_on_the_table'] },
              setsFlags: ['akari_closes', 'the_night_happened'],
              closesFlags: ['akari_stays'],
            },
          ],
          rewards: { xp: 240, items: [], flags: ['akari_is_answered'], abilities: [], reputation: [{ factionId: 'faction_neighbourhood', amount: 20 }] },
        },
        {
          id: 'what_you_do_next',
          playerCopy: 'Find out what you are, now that the thirty days are over.',
          directorNotes:
            'The morning after. Nobody makes a speech. Whatever the player has become is visible in what they are doing at six the following morning and in who rings them about it.',
          enterWhen: { flagsSet: ['akari_is_answered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'stayed_in_it',
              label: 'Be behind that pass on Tuesday',
              predicate: { flagsSet: ['akari_stays'] },
              setsFlags: ['stayed_at_akari'],
              closesFlags: [],
            },
            {
              routeId: 'went_to_vanta',
              label: 'Take the job at the best kitchen in the city',
              predicate: { flagsSet: ['known_for_technique'], minRelationship: [{ characterId: 'haruto', dimension: 'respect', value: 65 }] },
              setsFlags: ['went_to_vanta'],
              closesFlags: ['stayed_at_akari'],
            },
            {
              routeId: 'with_her',
              label: 'Start something with the person who came in out of the rain',
              predicate: { minRelationship: [{ characterId: 'mina', dimension: 'trust', value: 70 }] },
              setsFlags: ['started_something_with_mina'],
              closesFlags: [],
            },
            {
              routeId: 'one_burner',
              label: 'One burner, a griddle and a street',
              predicate: { flagsSet: ['takumi_taught_you'], atLocation: 'night_market' },
              setsFlags: ['went_to_the_street'],
              closesFlags: ['went_to_vanta'],
            },
            {
              routeId: 'stopped',
              label: 'Stop cooking professionally',
              predicate: { flagsSet: ['akari_is_answered'] },
              setsFlags: ['stopped_cooking', 'left_the_map'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 260, items: [], flags: ['the_story_has_a_shape'], abilities: [], reputation: [] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_supplier_rings',
      atWorldMinute: 1440 + 9 * 60,
      locationId: 'akari_office',
      publicCopy:
        'The supplier rings for the third time in two days. He is entirely pleasant about it, he asks after Keiko by name, and he has an accounts department that does not care about any of that.',
      directorNotes:
        'Nobody is a villain. He has known this family eleven years and he cannot carry them past the end of the month because somebody upstairs has a spreadsheet. Play the awkwardness rather than the threat.',
      setsFlags: ['the_supplier_rang'],
      cancelledByFlags: ['the_money_is_there'],
      requiresFlags: ['knows:friday'],
      movesCharacters: [],
    },
    {
      id: 'we_the_hood_fails',
      atWorldMinute: 3 * 1440 + 20 * 60,
      locationId: 'akari_kitchen',
      publicCopy:
        'The extractor stops mid-service with twenty-two covers on and the kitchen fills in about ninety seconds. Nothing burns. Everybody carries on and it is unbearable in there for the next two hours.',
      directorNotes:
        'The quote has been on the desk for five weeks. This is not a disaster and it is exactly the kind of thing that quietly ends restaurants: a service that gets through, a room that smells wrong, and eleven people who will not book again.',
      setsFlags: ['the_hood_went'],
      cancelledByFlags: ['fixed_the_hood'],
      requiresFlags: ['knows:friday'],
      movesCharacters: [],
    },
    {
      id: 'we_a_good_week',
      atWorldMinute: 5 * 1440 + 21 * 60,
      locationId: 'akari_dining',
      publicCopy:
        'Two write-ups in a week and a Saturday with a queue outside for the first time in four years. Sixty-one covers through a room built for thirty, and the last table gets its food at ten past ten.',
      directorNotes:
        'This is the good thing arriving and being a problem. Everybody is delighted and the room cannot do it. Keiko is thrilled. Emi is watching eleven regulars decide not to wait, and has not said anything.',
      setsFlags: ['the_good_week'],
      cancelledByFlags: [],
      requiresFlags: ['the_circuit_started'],
      movesCharacters: [{ characterId: 'emi', toLocationId: 'akari_dining' }],
    },
    {
      id: 'we_keiko_does_a_double',
      atWorldMinute: 7 * 1440 + 23 * 60,
      locationId: 'akari_kitchen',
      publicCopy:
        'She has done the market at five, the lunch, the paperwork standing up in the corner and the whole of service, and she is on the clean-down at eleven at night doing the thing where she holds the counter for a second.',
      directorNotes:
        'Nobody says anything, which is the content. Daichi has been quietly covering the last two months of Fridays and has arranged it so she has not noticed. This is preventable and preventing it requires somebody to be blunt with her.',
      setsFlags: ['saw_keiko_at_the_counter'],
      cancelledByFlags: ['she_had_an_evening', 'keiko_stopped'],
      requiresFlags: ['the_first_night_is_over'],
      movesCharacters: [{ characterId: 'keiko', toLocationId: 'akari_kitchen' }],
    },
    {
      id: 'we_reina_comes_in',
      atWorldMinute: 9 * 1440 + 20 * 60,
      locationId: 'akari_dining',
      publicCopy:
        'A woman on her own at the two-top by the window, coat still on, facing the room, who booked under a name that is not hers and is going to pay for everything.',
      directorNotes:
        'It is her second visit and nobody in the building knows there was a first. She will not say what she is writing and will tell anybody who asks exactly why she will not. Emi clocks her within about a minute and says nothing.',
      setsFlags: ['reina_came_in'],
      cancelledByFlags: ['asked_her_not_to'],
      requiresFlags: ['the_circuit_started'],
      movesCharacters: [{ characterId: 'reina', toLocationId: 'akari_dining' }],
    },
    {
      id: 'we_takumi_turns_up',
      atWorldMinute: 11 * 1440 + 15 * 60,
      locationId: 'akari_dining',
      publicCopy:
        'The man from the night market is in the room at three in the afternoon with a crate of something nobody ordered, talking to Emi about the board and getting in everybody’s way.',
      directorNotes:
        'He is not doing a favour and would be offended by the suggestion. He liked something and has come to say so at length and steal an idea, and he will end up on the line for the evening if anybody asks him.',
      setsFlags: ['takumi_came_by'],
      cancelledByFlags: ['missed_the_point'],
      requiresFlags: ['the_circuit_started'],
      movesCharacters: [{ characterId: 'takumi', toLocationId: 'akari_dining' }],
    },
    {
      id: 'we_the_group_offer',
      atWorldMinute: 13 * 1440 + 11 * 60,
      locationId: 'akari_office',
      publicCopy:
        'A second letter from the restaurant group arrives, more specific than the first, with a figure in it and a date by which the figure stops applying.',
      directorNotes:
        'It is a genuinely reasonable offer. They would keep the room open, change the name, and everybody who works here would be re-interviewed. Keiko never answered the first one and has kept it.',
      setsFlags: ['the_second_letter', 'knows:the_offer'],
      cancelledByFlags: ['the_money_is_there', 'they_took_it'],
      requiresFlags: ['the_number_is_out'],
      movesCharacters: [],
    },
    {
      id: 'we_mina_has_a_bad_one',
      atWorldMinute: 15 * 1440 + 22 * 60,
      locationId: 'city_table_hall',
      publicCopy:
        'Something goes wrong on her section during a Service and she takes both stations off the two people working them and does all of it herself, correctly, and the plates go out eleven minutes late.',
      directorNotes:
        'This is the flaw arriving. Nothing she did was wrong technically and the service was worse for it, and the two cooks she took over from will remember. She knows exactly what she did within about a minute of finishing.',
      setsFlags: ['saw_mina_do_it'],
      cancelledByFlags: ['mina_led_it'],
      requiresFlags: ['the_middle_of_the_circuit'],
      movesCharacters: [{ characterId: 'mina', toLocationId: 'city_table_hall' }],
    },
    {
      id: 'we_the_date',
      atWorldMinute: 25 * 1440 + 10 * 60,
      locationId: 'akari_office',
      publicCopy:
        'A letter from the lender, formal, with the date on it and the lease fittings listed by name. The list includes the range, the walk-in and the counter.',
      directorNotes:
        'The date is five days out. Nothing about the letter is aggressive and it is the most frightening object in the story. Keiko puts it in the drawer with the other one and goes back to the market list.',
      setsFlags: ['the_letter_came'],
      cancelledByFlags: ['the_money_is_there'],
      requiresFlags: ['the_number_is_out'],
      movesCharacters: [{ characterId: 'keiko', toLocationId: 'akari_office' }],
    },
    {
      id: 'we_a_regular_asks',
      atWorldMinute: 27 * 1440 + 20 * 60,
      locationId: 'akari_dining',
      publicCopy:
        'The woman who has had the mackerel with no ginger every Thursday since the year Akari opened asks Emi, in a completely ordinary voice, whether they are all right.',
      directorNotes:
        'The street has worked it out. Nobody is being dramatic. She has been coming for nineteen years and she would like to know whether to start telling people, and Emi has to answer her.',
      setsFlags: ['the_street_knows'],
      cancelledByFlags: ['akari_stays'],
      requiresFlags: ['the_letter_came'],
      movesCharacters: [{ characterId: 'emi', toLocationId: 'akari_dining' }],
    },
  ],
  promises: [
    {
      id: 'p_what_save_means',
      kind: 'FINALE',
      label: 'What saving this restaurant would actually mean',
      seedHint: 'A quote for a hood that has been on the office desk for five weeks with nothing written on it.',
      payoffHint: 'Nineteen years of covers in pencil, and the person who wrote them not having taken a full day since March.',
      weight: 1,
    },
    {
      id: 'p_mina',
      kind: 'RIVAL',
      label: 'The best young cook in the city and the thing she cannot make',
      seedHint: 'She tells you your sauce is broken in the same voice she would use to order a drink.',
      payoffHint: 'Nine dishes about her own life, all of them technically perfect, all of them pulled before service.',
      weight: 0.9,
    },
    {
      id: 'p_keiko',
      kind: 'RELATIONSHIP',
      label: 'The person who has not taken a full day since March',
      seedHint: 'A flat six minutes from the restaurant, chosen nineteen years ago because it was six minutes away.',
      payoffHint: 'She equates closing with betraying the family, and she is waiting for somebody to tell her it is all right to stop.',
      weight: 0.9,
    },
    {
      id: 'p_the_room',
      kind: 'THEME',
      label: 'Thirty seats, and what happens when four hundred people want one',
      seedHint: 'The window at eight, and how full it is, and everybody on that street knowing what that means.',
      payoffHint: 'Sixty-one covers through a room built for thirty, and eleven regulars deciding not to wait.',
      weight: 0.8,
    },
    {
      id: 'p_the_drawer',
      kind: 'MYSTERY',
      label: 'Nine hundred words somebody decided not to publish',
      seedHint: 'A woman on her own at the two-top by the window, coat on, paying for everything, under a name that is not hers.',
      payoffHint: 'A twenty-two seat place she praised in her second year, which filled with the wrong people and closed in eleven months.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_trained',
      name: 'You Were Trained',
      role: 'Technique and the pass',
      summary: 'School, then somebody else’s kitchen, then a few years of doing it properly. You can execute anything you have been shown and you have not made anything up in a while.',
      playstyle: ['Precise', 'Fast hands', 'Cautious'],
      blurb: 'You have stood on somebody else’s line and been very good at it, which is a completely different job from the one waiting for you behind that pass.',
      attributeBonus: { agility: 3, mind: 1 },
      skillProficiencies: { knife: 3, heat: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_trade', amount: 12 }],
    },
    {
      id: 'arch_home',
      name: 'You Cook At Home',
      role: 'Palate and instinct',
      summary: 'Never professionally, not once, and you can taste a thing and know what it needs, which is the half of this that cannot be taught.',
      playstyle: ['Intuitive', 'Slow', 'Underestimated'],
      blurb: 'Everybody in that kitchen is going to assume they know how this goes, and the first time you fix something by tasting it they are going to have to revise.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { palate: 3, sourcing: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_neighbourhood', amount: 12 }],
    },
    {
      id: 'arch_front',
      name: 'You Ran Rooms',
      role: 'Front of house and people',
      summary: 'Years of the other side of the pass. You can read a room in four seconds and rescue a table nobody else has noticed is going, and you are not a cook and everybody knows it.',
      playstyle: ['Reads people', 'Runs services', 'Weak on the line'],
      blurb: 'The meal starts before the plate arrives, and you are the only person coming back to this building who has ever properly understood that.',
      attributeBonus: { presence: 3, mind: 1 },
      skillProficiencies: { front: 3, the_pass: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_neighbourhood', amount: 15 }],
    },
    {
      id: 'arch_away',
      name: 'You Left',
      role: 'Graft and hard hands',
      summary: 'You went and did something else entirely for a few years and came back with hands that work and an eye nobody in here has, and a very complicated feeling about this room.',
      playstyle: ['Durable', 'Outside eyes', 'Rusty'],
      blurb: 'The last time you stood in this kitchen you were nineteen and it was somebody else’s problem, and everybody here remembers which of those two things you were better at.',
      attributeBonus: { resolve: 3, might: 1 },
      skillProficiencies: { graft: 3, front: 1, knife: 1 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What does Keiko call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Sora' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'What can you actually do in a kitchen?',
      helpText:
        'What you were doing before you walked back in, which sets what you are good at and what everybody on that line assumes about you. It is fixed for the whole story. It does not decide whether Akari survives, what you cook, or whether saving it turns out to be the right thing.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does Akari cook?',
      helpText: 'Entirely yours and nothing in this story locks it. Japanese home cooking, French-Japanese, Moroccan, Korean, seafood, something nobody has a word for. One line.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. Grilled fish, rice dishes, braises and whatever was good at the market, and one Moroccan thing my grandmother learned somewhere.',
    },
    {
      id: 'why_you_are_back',
      label: 'Why are you standing in this kitchen tonight?',
      helpText: 'A starting reason, not a commitment. You are allowed to discover halfway through that it was a different one.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'never_left', label: 'You never left. You have been here the whole time' },
        { id: 'came_back', label: 'You came back for a few weeks and it has been fourteen months' },
        { id: 'she_asked', label: 'She asked, once, badly, and you got on a train' },
        { id: 'nowhere_else', label: 'There was nowhere else and you have not admitted that to anybody' },
        { id: 'to_close_it', label: 'You came back to help close it and have not said so' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does the line see when you come through the door?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Somebody in a coat that is far too good for this kitchen, already rolling their sleeves.',
    },
  ],
  endings: [
    {
      id: 'end_akari_stays_lit',
      name: 'Akari Stays Lit',
      rarity: 'COMMON',
      minTurn: 38,
      requires: { flagsSet: ['akari_stays', 'stayed_at_akari'], flagsUnset: ['akari_closes'] },
      condition:
        'It opens again on Tuesday. Write the ordinariness of that deliberately — the market at five, the board rewritten, forty covers and a Thursday regular who has the mackerel with no ginger. This is what everything in the story was for and it should look like nothing at all.',
      epilogue:
        'The hood gets done in November and the kitchen smells like a kitchen again. The covers settle at about forty-five, which is more than before and less than the good week, and is the number this room can actually do well. Keiko takes a Monday off in the spring and comes in on it anyway, and is sent home, and goes.',
      hint: '',
    },
    {
      id: 'end_the_last_service',
      name: 'The Last Service',
      rarity: 'RARE',
      minTurn: 40,
      requires: { flagsSet: ['akari_closes', 'closed_it_well'] },
      condition:
        'They closed it on purpose, with a full room, everybody in it, and a menu decided by the people who worked there. This is not a defeat and the writing must not treat it as one. Nineteen years ended properly is a considerably better outcome than nineteen years ending on a solicitor’s date.',
      epilogue:
        'Thirty seats and about eighty people, which the fire officer would not have liked. The mackerel is on. Somebody brings a photograph from the opening and it goes up behind the pass for the night. At about one in the morning Keiko does the clean-down with everybody still in the room and nobody offers to help, because they all know what she is doing.',
      hint: '',
    },
    {
      id: 'end_city_table',
      name: 'City Table',
      rarity: 'RARE',
      minTurn: 42,
      requires: {
        flagsSet: ['the_circuit_is_decided', 'took_a_service'],
        minFactionReputation: [{ factionId: 'faction_trade', value: 55 }],
      },
      condition:
        'They won the circuit. Eleven Services, half of which had no winner, and the aggregate came out with their name on it. Write what it is actually worth — a fortnight of attention, some money, and a trade that has now decided something about them — rather than as a trophy.',
      epilogue:
        'The money covers about two thirds of what Akari owes, which everybody says is enormous and everybody in the office knows is two thirds. Four kitchens ring in the following month. What lasts is not the win: it is that eleven chefs in this city now answer the phone.',
      hint: '',
    },
    {
      id: 'end_vanta',
      name: 'VANTA',
      rarity: 'RARE',
      minTurn: 42,
      requires: {
        flagsSet: ['went_to_vanta'],
        minRelationship: [{ characterId: 'haruto', dimension: 'respect', value: 68 }],
      },
      condition:
        'The best kitchen in the city, at the level where nobody raises their voice and everything is checked twice. Write what it costs as clearly as what it buys: eleven-hour days at somebody else’s standard, no room of your own, and getting extremely good at a thing you did not invent.',
      epilogue:
        'Two years on a section, then the sous job when Mina steps up. It is the best cooking of anybody’s life and it belongs to somebody else, which is a trade almost everybody in this trade makes and about half of them never stop resenting. Haruto pays on time, every time, and has never once mentioned that this is remarkable.',
      hint: '',
    },
    {
      id: 'end_our_kitchen',
      name: 'Our Kitchen',
      rarity: 'RARE',
      minTurn: 44,
      requires: {
        flagsSet: ['started_something_with_mina'],
        minRelationship: [{ characterId: 'mina', dimension: 'respect', value: 72 }],
      },
      condition:
        'The two of them build something together — a room, a project, a partnership — romantic or not depending on what the run actually made. What it is about is that she has found somebody she does not have to take the station off, and that took her longer to trust than anything else in this story.',
      epilogue:
        'Twenty-two seats, a lease neither of them can quite afford and one menu they argue about weekly and in public. She still pulls dishes before service. He still lets her, and about one time in four he puts it back on, and she has stopped taking that as an insult.',
      hint: '',
    },
    {
      id: 'end_mina_after_close',
      name: 'Mina After Close',
      rarity: 'RARE',
      minTurn: 44,
      requires: {
        flagsSet: ['saw_mina_do_it'],
        minRelationship: [
          { characterId: 'mina', dimension: 'trust', value: 75 },
          { characterId: 'mina', dimension: 'affection', value: 75 },
        ],
      },
      condition:
        'Earned, and after she took two stations off two people during a Service and had to sit with what that was. Write their actual dynamic: two people who talk to each other in assessments and have gradually learned to hear the other thing underneath.',
      epilogue:
        'They eat at one in the morning, standing up, most nights, which is the only time either of them is free. She still says the accurate thing rather than the kind one and it stopped being a problem in about the fourth month. Neither of them has described this to anybody at either kitchen and both kitchens worked it out immediately.',
      hint: '',
    },
    {
      id: 'end_street_fire',
      name: 'Street Fire',
      rarity: 'UNCOMMON',
      minTurn: 40,
      requires: { flagsSet: ['went_to_the_street', 'takumi_taught_you'] },
      condition:
        'One burner, a griddle and a street. No lease, no brigade, no critic, and four hundred people a night who stop talking when they eat it. Write it as a real career with real economics rather than as a romantic alternative to a proper job.',
      epilogue:
        'The first winter is very bad and the second is fine. Takumi is furious and delighted in roughly equal measure and turns up about once a fortnight to steal something. There is no lease to lose, which after thirty days of watching a restaurant nearly go under turns out to be the entire point.',
      hint: '',
    },
    {
      id: 'end_feed_fifty',
      name: 'Feed Fifty',
      rarity: 'UNCOMMON',
      minTurn: 40,
      requires: { flagsSet: ['fed_fifty', 'knows:what_it_is_about'], flagsUnset: ['went_to_vanta'] },
      condition:
        'They came out of this pointed at affordable food for a lot of people rather than at prestige. Not a renunciation — a different and harder discipline, and one that most of the people in this story privately rate higher than anything on the circuit.',
      epilogue:
        'A canteen, or a school contract, or three hundred covers of one very good thing at a price people can pay on a Tuesday. Reina writes about it once, briefly, and gets more letters than she has had about anything in four years, and about half of them are angry.',
      hint: '',
    },
    {
      id: 'end_daichis_akari',
      name: 'Daichi’s Akari',
      rarity: 'RARE',
      minTurn: 42,
      requires: { flagsSet: ['they_took_it', 'akari_stays'] },
      condition:
        'It stays open and it is not the player’s and it is not Keiko’s. The two people who have quietly been running it anyway take it on. Write the handover as a real thing with paperwork and an argument in it, and write the eleventh version of a dish finally going on a board.',
      epilogue:
        'The board is in Emi’s handwriting still and there is one thing on it that is Daichi’s, and it has been on it since the first week. The covers are down and the Fridays are back. Keiko comes in on Thursdays as a customer and sits at the counter and is extremely annoying about the seasoning.',
      hint: '',
    },
    {
      id: 'end_keiko_rests',
      name: 'Keiko Rests',
      rarity: 'UNCOMMON',
      minTurn: 42,
      requires: {
        flagsSet: ['keiko_stopped'],
        minRelationship: [{ characterId: 'keiko', dimension: 'trust', value: 75 }],
      },
      condition:
        'Whatever happened to the restaurant, she genuinely stopped carrying it — which required somebody to say out loud that closing it or handing it on was not a betrayal, and required her to believe them. This is the quietest ending in the world and one of the two best.',
      epilogue:
        'She gets to about eleven in the morning on the first Tuesday and does not know what to do, and then it is April and she has a garden and a chair and three people who ring her. She never fully stops going to the market. Nobody expects her to and nobody mentions it.',
      hint: '',
    },
    {
      id: 'end_the_dish_with_no_name',
      name: 'The Dish With No Name',
      rarity: 'UNIQUE',
      minTurn: 44,
      requires: {
        flagsSet: ['knows:what_it_is_about'],
        minFactionReputation: [{ factionId: 'faction_media', value: 55 }],
      },
      condition:
        'One thing the player made became a thing this city cooks. It has no proper name, it is on eleven menus written four different ways, and none of them credits anybody. Write it as the most ordinary immortality available and let that be enough.',
      epilogue:
        'It turns up at the night market within a year and in a hotel banquet menu within three, both times slightly wrong. Reina writes four hundred words about where it came from and about two hundred people read them. Somebody’s grandchild will cook it in forty years having no idea it was anybody’s.',
      hint: '',
    },
    {
      id: 'end_stopped',
      name: 'Stopped',
      rarity: 'COMMON',
      minTurn: 26,
      requires: { flagsSet: ['stopped_cooking', 'left_the_map'] },
      condition:
        'They stopped cooking professionally. Not a failure and not a tragedy: thirty days of a family restaurant going under is a completely reasonable thing to be finished by, and a great many people in this trade leave it and are fine. Write the last shift, not the decision.',
      epilogue:
        'They still cook. For four people, on a Sunday, well, without a ticket rail anywhere near them. About twice a year they walk past a kitchen door at eleven at night and hear the clean-down going and stand there for a minute, and then go home, and it is not sad exactly.',
      hint: '',
    },
  ],
  opening:
    'The hood has been making a noise since Tuesday and tonight it is worse.\n\n' +
    'Half a room. Thirteen covers, three of them on the counter. Rain going sideways past the window and a tram at the end of the street. Keiko is at the stove where she has been since 2006, Daichi is on the grill and has not been behind all night, and the second burner still will not light without being sworn at.\n\n' +
    'Table six has sent the fish back. Not angrily. It is overcooked and they are right.\n\n' +
    'The supplier has rung twice today. A quote for the hood has been on the office desk five weeks.\n\n' +
    'Then the door goes, and somebody comes in out of the rain with a knife roll over one shoulder and does not look at a menu.\n\n' +
    'Daichi sees her first and stops moving, which he never does.',
  openingSuggestions: [
    'I take the plate off the pass and look at it properly. It is thirty seconds past and I can see exactly where it went. "Give me four minutes and a new one, and Emi — tell them it is coming and tell them why."',
    'I put my hands on the counter and say it to the room. "Who is that?" Because Daichi has stopped moving and Keiko has not turned round, and both of those are answers on their own.',
    'I go out front myself, past Emi, still wearing the apron, and get to table six before anybody else does. "That was my fault. It is coming again in four minutes. Have you eaten here before?"',
  ],
  publishedAt: '2026-09-10T13:00:00.000Z',
};

export const LAST_SERVICE = StoryVersion.parse(raw);
