import { StoryVersion } from '@aniplay/contracts';

/**
 * "Hush House" — a boarding house that rehearses the people who live in it.
 *
 * The horror rule this world is built on is the one from the bible: the player
 * must always know WHAT happened, and is allowed not to know WHY. So every
 * phenomenon here is a checkable, physical event — a door, a light, a floor
 * number, a voice using a word slightly wrong — and none of them is a mood.
 * "Something is not right in the hallway" is the failure mode; "the light
 * outside 309 is red and it was not red four minutes ago" is the world.
 *
 * The other structural bet: ordinary life is the point. Breakfast, rent,
 * convenience-store runs and being bad at flirting are not filler between
 * hauntings, they are the thing the hauntings are worth something against, so
 * the schedules put people in the kitchen at three in the morning and the
 * openings are domestic.
 *
 * Two variables, both invisible, both banded. Ayame's trust is deliberately NOT
 * one of them — the relationship system already models what she will and will
 * not say, and a second copy of it as a resource would drift within a week.
 * What is left is what relationships cannot express: how much of the player the
 * building has, and what the city outside thinks of them.
 */

const raw = {
  id: 'sv_hush_house_1',
  storyId: 'story_hush_house',
  version: 1,
  title: 'Hush House',
  fantasyLabel: 'Do not open the door at 2:13 a.m.',
  hook: 'The rent is impossibly cheap, the girl in 314 is impossibly attractive, and she has three rules about the hallway that she is not joking about.',
  premise:
    'Hush House is six storeys of dark brick on Bellweather Street, in the old quarter of Morrowgate, and Room 312 is available immediately at a price that should have told you something.\n\n' +
    'Mrs Vale, who manages it, will not say why the last tenant left. She answers a question next to the one you asked and smiles while she does it.\n\n' +
    'Your neighbour in 314 is Ayame Kurose: twenty-two, dryly funny, visibly not sleeping. On your first evening she hands you a canned coffee and gives you three rules as casually as somebody explaining the bins.\n\n' +
    'If the hallway light outside 309 turns red, do not look through the peephole. If the lift opens onto a floor labelled 0, do not step out. If somebody knocks at 2:13 in the morning and says they are Ayame, do not open it. She will never knock at that time. She promises.\n\n' +
    'What breaking one costs is written down nowhere. The tenant who had 312 before you found out on a Thursday in March, and his name is still on the mailbox.\n\n' +
    'Her older sister disappeared from this building four years ago. The police wrote it up as a runaway. Ayame moved in to prove otherwise, she has seen Mika twice since, and she is not going to lose her a second time.\n\n' +
    'The rent is due on the first and you need somewhere to live. Everything else here is a thing you find out.',
  creatorId: 'creator_official',
  creatorName: 'ANIMA Studio',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Horror', 'Supernatural', 'Mystery', 'Romance', 'Modern', 'Slice of life'],
  mechanicsChips: [
    'Three rules to break or keep',
    'The house learns you',
    'A neighbour who lies well',
    'Ordinary life worth protecting',
    'Leave whenever you like',
  ],
  contentDescriptors: ['HORROR', 'PSYCHOLOGICAL_THEMES', 'ROMANCE', 'MORAL_AMBIGUITY'],
  intensity: 'INTENSE',
  creatorNote:
    'The house is authored to the floorboards and your route through it is not authored at all. You can investigate it, romance your way through it, film it, sell it to a newspaper, set fire to it, move out on the fourth day, or simply live there and be careful. It adapts. It also gets better at pretending to be the people you like.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'room_312',
    startWorldMinute: 20 * 60 + 47,
    startingItems: [{ itemId: 'keyring_312', qty: 1 }],
    hardCanon: [
      'Hush House existed long before the player did, and Room 312 was empty when they signed for it.',
      'Mika Kurose disappeared from this building four years ago and has never been found.',
      'Saint Orra’s Hospice burned on the same ground in 1911, during a city quarantine, and the death toll on the record is false.',
      'The building’s memory phenomena are real. They are not the player imagining things and never turn out to have been.',
      'Ayame Kurose will not knock at 2:13 a.m. Anything at the door at that time claiming to be her is not.',
      'Morrowgate is an ordinary modern city. Outside Bellweather Street, nothing supernatural is common knowledge.',
    ],
    toneGuide:
      'Modern supernatural anime, not a slasher. Horror arrives as specific incidents with clean edges — a light, ' +
      'a knock, a floor number, a word used slightly wrong — and then stops, and then the kettle boils. One ' +
      'strange thing at a time. Between incidents the world is warm and small and genuinely enjoyable: rent, ' +
      'laundry, the konbini at midnight, arguing about whose turn it is. The player should always be able to say ' +
      'what just happened. They should very often not be able to say why.',
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 10, mind: 12, presence: 11, resolve: 11, arcana: 6 },
  skills: [
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Staying in the corridor long enough to look at the thing properly.' },
    { id: 'notice', name: 'Notice', attribute: 'mind', description: 'Catching the detail that is one degree wrong.' },
    { id: 'research', name: 'Research', attribute: 'mind', description: 'Council records, fire reports, and what a building is legally allowed to forget.' },
    { id: 'talk', name: 'Talk', attribute: 'presence', description: 'Getting an answer out of somebody who has decided to give you an adjacent one.' },
    { id: 'quiet', name: 'Quiet', attribute: 'agility', description: 'Moving through a building that is listening.' },
    { id: 'hands', name: 'Hands', attribute: 'might', description: 'Locks, hinges, boarded doorways, and holding one shut.' },
    { id: 'care', name: 'Care', attribute: 'presence', description: 'Being the person somebody wakes at four in the morning.' },
  ],
  /**
   * Three, all invisible, all described as behaviour.
   *
   * Ayame's trust is not here on purpose: `startingRelationship` and her gates
   * already say what she will and will not tell you, and a resource that
   * duplicates a relationship dimension is a second source of truth about the
   * same person. What is left is the pressures no relationship can carry — how
   * much of the player the building has collected, what the city has decided
   * the player is, and how long they have been awake.
   *
   * Sleep is here for a reason that is half fiction and half engine. The
   * fiction: everybody in this building is tired, and the horror of the place
   * is that being tired is how it gets in. The engine: `resolveRest` restores
   * every GOOD_HIGH resource and a world with none printed "you rest, and
   * recover" while changing nothing, and the generic cost path spends a
   * GOOD_HIGH first and otherwise raises the first descending resource it
   * finds — so with no Sleep, every unpriced cost in the game was landing on
   * House Attention, including being seen fighting in the street.
   *
   * Which is also why the order below is not arbitrary. `PUBLIC_VIOLENCE`
   * takes the first GOOD_LOW resource in this array, and something the street
   * saw belongs to Public Suspicion, not to the house.
   */
  resources: [
    {
      id: 'sleep',
      name: 'Sleep',
      max: 100,
      start: 74,
      regenPerHour: 1,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player has stopped being a reliable narrator of their own evening. They are not hallucinating; they are simply no longer able to tell a thing they saw from a thing they were told, and the building does not need to do anything clever to a person in this state.',
      color: '#B9A7CE',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Three nights deep. Times of day stop being distinguishable, sentences arrive a beat after they were meant to, and the player has begun agreeing with things to end conversations. Write them getting details of their own week wrong — and let another character be the one who notices, because they cannot. Anything the house does now costs it almost no effort.',
        },
        {
          upTo: 55,
          behaviour:
            'Running on the second wind and aware of it. Sharp in bursts, then absent for a whole exchange. This is the band where somebody offers to sit up instead of them, and whether the player accepts is a real character beat rather than a resource decision.',
        },
        {
          upTo: 80,
          behaviour:
            'Tired in the ordinary way everybody in this building is tired. Fine for one more hour on the landing and honest about not wanting to be. Nothing here needs remarking on unless somebody asks.',
        },
        {
          upTo: 100,
          behaviour:
            'Rested, which in Hush House is conspicuous. Ayame notices out loud. The player is the only person in the kitchen at nine in the morning who looks like they slept, and how they feel about that is worth a line.',
        },
      ],
    },
    {
      id: 'public_suspicion',
      name: 'Public Suspicion',
      max: 100,
      start: 5,
      regenPerHour: -0.15,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence: 'Nobody outside Bellweather Street has formed any opinion about the player whatsoever.',
      color: '#4E6A7A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Nobody outside the building is thinking about the player. Neighbours nod. The precinct has a four-year-old file on Mika Kurose and no reason at all to open it. Doors open on the first ask.',
        },
        {
          upTo: 55,
          behaviour:
            'The player is a name that has come up. A constable takes their details a second time. A neighbour asks a careful question with a rehearsed edge to it. Mrs Vale mentions, pleasantly, that people have been asking about them. Doors still open; they open more slowly and somebody notes it down.',
        },
        {
          upTo: 80,
          behaviour:
            'The player is treated as unstable rather than dangerous. Their own statements are read back to them with the times changed. Strangers online have opinions about their face. Help is offered in the tone people use for help nobody asked for, and refusing it is taken as evidence.',
        },
        {
          upTo: 100,
          behaviour:
            'The player is a problem the city intends to solve. Police at the door rather than in the lobby. A letter from a solicitor about the tenancy. Anything the player says about the house is now evidence of something other than the house, and the building is the only place left that treats them as reliable.',
        },
      ],
    },
    {
      id: 'house_attention',
      name: 'House Attention',
      max: 100,
      start: 8,
      regenPerHour: -0.25,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'It is an old building with a damp problem and a lift that sticks. Nothing in it knows the player’s name, and for a while that is genuinely a relief.',
      color: '#7A3B4E',
      bands: [
        {
          upTo: 20,
          behaviour:
            'The house has barely registered the player. Anomalies are impersonal and deniable: a door found ajar, a corridor light already on, the smell of smoke on a floor where nobody smokes. None of it is addressed to anyone, and a reasonable person could explain all of it. This is the band where ordinary life should be doing most of the work.',
        },
        {
          upTo: 50,
          behaviour:
            'It has started copying. Voices in the corridor use the cadence of people the player has actually spoken to. Objects turn up where the player left them yesterday rather than where they left them today. The knocking has a rhythm they recognise. Everything is wrong in one small checkable detail, and checking it is always possible.',
        },
        {
          upTo: 80,
          behaviour:
            'It is rehearsing the player. Room 312 reproduces things from a life it was never shown — a chipped mug from somewhere else, a coat that is nearly the right coat. Somebody the player knows is in the shared kitchen at three in the morning saying something they would say, and getting one word wrong. Ordinary life is still available, and is now the thing the player is protecting rather than the thing they are bored by.',
        },
        {
          upTo: 100,
          behaviour:
            'It stages. Whole scenes are built around the player and around whoever they have let matter to them: a conversation replayed with a single line changed, the same person met twice in one corridor, a floor the lift has no button for opening anyway. Anyone the player loves has now given the building enough behaviour to imitate them well. Do not make this constant — it is more frightening as three deliberate incidents in an evening than as weather.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'keyring_312',
      name: 'The Keys to 312',
      tags: ['kit'],
      droppable: false,
      description: 'Two keys and a brass fob with the number worn nearly smooth. Mrs Vale had them in her cardigan pocket, already separated from the rest.',
      loreText: 'There is a third ring mark on the fob where a key used to be.',
      icon: 'keys',
    },
    {
      id: 'canned_coffee',
      name: 'A Canned Coffee',
      tags: ['supply'],
      stackable: true,
      maxStack: 4,
      description: 'Hot from the machine outside the konbini, cold within nine minutes. Ayame buys two every night and has never once explained why she buys two.',
      icon: 'can',
    },
    {
      id: 'voice_recorder',
      name: 'A Handheld Recorder',
      tags: ['tool', 'evidence'],
      skillModifiers: { notice: 2 },
      description: 'Cheap, orange, and it was in the kitchen drawer of 312 when you moved in, with four hours already on it.',
      loreText: 'The four hours are a person breathing and, twice, somebody saying a name that is not on the tenancy.',
      icon: 'recorder',
    },
    {
      id: 'nia_footage',
      name: 'Nia’s Hallway File',
      tags: ['quest', 'evidence'],
      questItem: true,
      skillModifiers: { research: 2 },
      description: 'Eleven minutes of phone footage of a corridor with a window at the end of it. Hush House has no corridor with a window at the end of it.',
      loreText: 'The timestamp is 02:11. It ends two minutes later, and Nia has never uploaded it.',
      icon: 'phone',
    },
    {
      id: 'mika_polaroid',
      name: 'A Photograph of Two Sisters',
      tags: ['quest', 'personal'],
      questItem: true,
      description: 'Ayame at eighteen and Mika at twenty-two, on the stairwell landing, laughing at whoever was holding the camera.',
      loreText: 'Ayame keeps it in her coat and takes it out more often than she thinks anybody notices.',
      icon: 'photo',
    },
    {
      id: 'vale_ledger',
      name: 'The Vale Agreement',
      tags: ['quest', 'document'],
      questItem: true,
      droppable: false,
      skillModifiers: { research: 3 },
      description: 'A property agreement in four hands across a hundred and eleven years. The obligations are described precisely. What they are owed to is never named.',
      loreText: 'Clause nine: the sub-basement is not to be surveyed, opened, or entered by any party, including the owner.',
      icon: 'ledger',
    },
    {
      id: 'bolt_cutters',
      name: 'Bolt Cutters',
      tags: ['tool'],
      equipSlot: 'hands',
      skillModifiers: { hands: 3 },
      description: 'From the cupboard on the stairwell landing, under a folded dust sheet, oiled by somebody within the last year.',
      icon: 'cutters',
    },
  ],
  abilities: [
    {
      id: 'listen_close',
      name: 'Listen',
      tags: ['sight', 'utility'],
      description: 'Stand still and work out what is actually making the sound.',
      affordances: [
        'listen',
        'listen at the door',
        'put my ear to the wall',
        'hold still and listen',
        'what can I hear',
        'wait and see what it does',
        'try to work out where it is coming from',
      ],
      costs: [{ resourceId: 'sleep', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'notice', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_the_door',
      name: 'Hold It Shut',
      tags: ['defensive'],
      description: 'Put your weight on it and keep it closed for as long as it takes.',
      affordances: [
        'hold the door',
        'hold it shut',
        'keep the door closed',
        'do not open it',
        'lock the door',
        'brace the door',
        'push back against the door',
        'ignore the knocking',
        'go back to bed',
      ],
      costs: [{ resourceId: 'sleep', amount: 8 }, { resourceId: 'house_attention', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'open_the_door',
      name: 'Open It',
      tags: ['utility'],
      description: 'Take the chain off and see what is standing in the hallway.',
      affordances: [
        'open the door',
        'open it',
        'let her in',
        'unlock it and look',
        'answer the knocking',
        'look through the peephole',
        'see who it is',
      ],
      costs: [{ resourceId: 'house_attention', amount: 16 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'knock_back',
      name: 'Knock Back',
      tags: ['social', 'utility'],
      description: 'Answer it on its own terms. Give the building something of yours to work with.',
      affordances: [
        'knock back',
        'answer it',
        'say something through the door',
        'talk to it',
        'provoke it',
        'tell it to come in',
        'give it my name',
        'copy the rhythm',
      ],
      costs: [{ resourceId: 'house_attention', amount: 11 }, { resourceId: 'sleep', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'presence', skillId: 'nerve', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'record_it',
      name: 'Get It On Something',
      tags: ['utility'],
      description: 'Point a lens or a microphone at it while it is still happening, which is harder than it sounds.',
      affordances: [
        'record it',
        'film it',
        'get my phone out',
        'take a photo',
        'use the recorder',
        'get evidence',
        'document it',
      ],
      costs: [{ resourceId: 'sleep', amount: 3 }],
      cooldownMinutes: 30,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'quiet', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'break_it',
      name: 'Break the Seal',
      tags: ['offensive'],
      description: 'Take the stone apart. Whatever the agreement was, it was written into the foundation and it can be unwritten out of it.',
      affordances: [
        'break the seal',
        'break the ward',
        'smash the stone',
        'take it apart',
        'destroy the seal',
        'pull the stones out',
      ],
      costs: [{ resourceId: 'public_suspicion', amount: 9 }, { resourceId: 'sleep', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'hands', baseDc: 16 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['stood_on_the_stone'],
        lockedCopy: 'You have not been down there. Whatever it is, it is under a hundred and eleven years of somebody else’s flooring.',
      },
    },
    {
      id: 'burn_it',
      name: 'Burn It',
      tags: ['offensive'],
      description: 'Six storeys of dry lath and a century of paint. It has burned once already on this ground.',
      affordances: [
        'burn it',
        'set fire to it',
        'burn the house down',
        'light it',
        'torch the place',
        'start a fire',
      ],
      costs: [{ resourceId: 'public_suspicion', amount: 26 }, { resourceId: 'house_attention', amount: 14 }],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['stood_on_the_stone'],
        lockedCopy: 'Not yet. Burning the building down before you know what is under it is how it happened the first time.',
      },
    },
    {
      id: 'give_it_a_name',
      name: 'Give It a Name',
      tags: ['social'],
      description: 'Say out loud, to the building, what you are and what you are not. It works on behaviour, and a name is behaviour.',
      affordances: [
        'give it my name',
        'tell it what I am',
        'say it out loud to the house',
        'name it',
        'tell the house to let me go',
        'refuse it',
        'sever it',
      ],
      costs: [{ resourceId: 'house_attention', amount: 9 }, { resourceId: 'sleep', amount: 5 }],
      cooldownMinutes: 360,
      targetRule: 'NONE',
      check: { attribute: 'presence', skillId: 'talk', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['stood_on_the_stone'],
        lockedCopy: 'You would have to know what you were talking to, and at the moment you are talking to a corridor.',
      },
    },
  ],
  locations: [
    {
      id: 'room_309',
      name: 'Room 309',
      shortName: '309',
      description:
        'Empty for four years and still furnished. A bed stripped to the ticking, a wardrobe with the door open, and a chair set facing the door rather than the window. The wall light out in the corridor is on a different circuit from every other light on this floor, and the switch for it is in here.',
      artDirection:
        'A long-unoccupied room in an old apartment building, stripped bed, open wardrobe, one chair turned to face the door, dust in slabs of light, a single dead wall lamp. Utterly still.',
      connections: [
        { to: 'hall_third', travelMinutes: 1, label: 'Back into the hallway' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'mika_polaroid', qty: 1, ownerId: null, aka: ['polaroid', 'the photograph', 'the picture on the floor'] },
      ],
    },
    {
      id: 'room_206',
      name: 'Room 206',
      shortName: '206',
      description:
        'Tomas Reed’s, and the tidiest room in the building because he is almost never in it. Blackout tape over the window, a kettle, a folded green fleece, and a printed rota on the back of the door with more shifts on it than anybody needs.',
      artDirection:
        'Small, extremely neat rented room, blackout tape on the window, single bed made hospital-tight, a kettle and one mug, a paper rota pinned to the door. Daylight blocked out at noon.',
      connections: [
        { to: 'stairwell', travelMinutes: 1, label: 'Out to the stairs' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: -1, y: 2 },
    },
    {
      id: 'room_405',
      name: 'Room 405',
      shortName: '405',
      description:
        'Nia Bell’s, and the exact opposite: two monitors on a door laid across trestles, cables taped down the skirting, and a corkboard of stills printed at the library with times written under them in marker.',
      artDirection:
        'Cramped student room converted into an edit suite, two monitors on a makeshift desk, cables everywhere, printed video stills pinned to a corkboard, blue screen glow. Chaotic and lived in.',
      connections: [
        { to: 'stairwell', travelMinutes: 1, label: 'Down to the stairs' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'nia_footage', qty: 1, ownerId: 'nia', aka: ['footage', 'the file', 'nia’s footage', 'the eleven minutes'] },
      ],
    },
    {
      id: 'morrowgate',
      name: 'The Rest of Morrowgate',
      shortName: 'The City',
      description:
        'Everything that is not this street: the ambulance station off Carrow Row where Tomas signs on, the art school Nia is technically enrolled at, the records office where Ayame has a job she will not discuss, and about four hundred thousand people who have never heard of Bellweather Street. It takes a quarter of an hour to get anywhere and the whole day to come back.',
      artDirection:
        'A large ordinary city in the rain seen from a tram window, wet tarmac, chain shops, an ambulance station forecourt, people who are not thinking about you. Deliberately mundane and slightly too bright.',
      connections: [
        { to: 'bellweather', travelMinutes: 14, label: 'Back to Bellweather Street' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 4, y: 4 },
    },
    {
      id: 'room_312',
      name: 'Room 312',
      shortName: '312',
      description:
        'Better than the price suggests: hardwood, a tall bay window over the street, a radiator that comes on by itself at ten. The bedroom wall is shared with 314, which is how you will learn most of what you learn.',
      artDirection:
        'Interior of a small old apartment at night, warm lamplight, tall bay window with rain on it, bare hardwood, unpacked boxes, an old cast-iron radiator. Cosy, slightly too quiet.',
      connections: [
        { to: 'hall_third', travelMinutes: 1, label: 'Out into the hallway' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'voice_recorder', qty: 1, ownerId: null, aka: ['recorder', 'the recorder', 'dictaphone', 'orange recorder'] },
      ],
    },
    {
      id: 'hall_third',
      name: 'The Third-Floor Hallway',
      shortName: 'Third Floor',
      description:
        'Six doors, a runner carpet worn down the middle, and a wall light outside 309 that is on a different circuit from all the others. Nobody has lived in 309 for four years.',
      artDirection:
        'Long corridor in an old apartment building at night, patterned runner carpet, warm wall sconces, one door further down than the others, deep shadow at the far end. Elegant and wrong.',
      connections: [
        { to: 'room_312', travelMinutes: 1, label: 'Back into 312' },
        { to: 'room_314', travelMinutes: 1, label: 'Ayame’s door' },
        { to: 'room_309', travelMinutes: 1, lockedByFlag: 'knows:the_red_light', label: 'The door nobody uses' },
        { to: 'stairwell', travelMinutes: 1, label: 'The stairwell' },
        { to: 'shared_kitchen', travelMinutes: 2, label: 'The shared kitchen' },
        { to: 'lobby', travelMinutes: 3, label: 'Down to the lobby' },
        { to: 'floor_zero', travelMinutes: 2, lockedByFlag: 'knows:floor_zero', label: 'The lift' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
    },
    {
      id: 'room_314',
      name: 'Room 314',
      shortName: '314',
      description:
        'Ayame’s. Two mattresses’ worth of paper on one wall — a floor plan with three floors drawn on it, a fire report, a printed tram timetable with one service circled. She has stopped apologising for it.',
      artDirection:
        'Small apartment converted into an investigation room, wall covered in documents and photographs with string, a single mattress on the floor, blackout curtain, laptop glow. Obsessive but lived-in.',
      connections: [{ to: 'hall_third', travelMinutes: 1, label: 'Out to the hallway' }],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'mika_polaroid', qty: 1, ownerId: 'ayame', aka: ['photo', 'the photograph', 'polaroid', 'picture of the sisters'] },
      ],
    },
    {
      id: 'shared_kitchen',
      name: 'The Shared Kitchen',
      shortName: 'The Kitchen',
      description:
        'Half a floor of the third storey, from when this was a boarding house properly. Two kettles, six labelled shelves, and a strip light that takes four seconds to decide. At three in the morning it is the best room in the building.',
      artDirection:
        'Large communal kitchen in an old building, late at night, one strip light, mismatched crockery, a table with two chairs pulled out, kettle steam. Warm and slightly institutional.',
      connections: [
        { to: 'hall_third', travelMinutes: 2, label: 'Back to the hallway' },
        { to: 'stairwell', travelMinutes: 1, label: 'The stairwell' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
    },
    {
      id: 'stairwell',
      name: 'The Stairwell',
      shortName: 'Stairs',
      description:
        'Stone treads, an iron rail, and a landing cupboard between every floor. Tomas Reed takes the stairs at six in the morning because he does not like the lift and has never said so out loud.',
      artDirection:
        'Old stone stairwell wound around a lift shaft, iron banister, a single window at each landing, storage cupboards, cold blue light. Vertical and echoing.',
      connections: [
        { to: 'hall_third', travelMinutes: 1, label: 'The third floor' },
        { to: 'room_206', travelMinutes: 2, label: 'Down to 206' },
        { to: 'room_405', travelMinutes: 2, label: 'Up to 405' },
        { to: 'shared_kitchen', travelMinutes: 1, label: 'The kitchen' },
        { to: 'lobby', travelMinutes: 2, label: 'Down to the lobby' },
        { to: 'rooftop', travelMinutes: 4, label: 'Up to the roof' },
        { to: 'sub_basement', travelMinutes: 4, lockedByFlag: 'sub_basement_open', label: 'Below the basement' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'bolt_cutters', qty: 1, ownerId: null, aka: ['bolt cutters', 'cutters', 'the cutters'] },
        { itemId: 'nia_footage', qty: 1, ownerId: 'nia', aka: ['footage', 'the file', 'nia’s footage', 'the hallway video'] },
      ],
    },
    {
      id: 'lobby',
      name: 'The Lobby',
      shortName: 'Lobby',
      description:
        'Black and white tiles, a lift with a folding brass gate, and Mrs Vale’s desk under the stairs with a lamp on it whatever the hour. The board behind her has six keys on it and eleven hooks.',
      artDirection:
        'Grand but faded apartment lobby, chequered tiles, brass cage lift, a small manager’s desk with a green lamp, a key board on the wall, rain visible through glass doors. Warm and watchful.',
      connections: [
        { to: 'stairwell', travelMinutes: 2, label: 'The stairs' },
        { to: 'hall_third', travelMinutes: 3, label: 'Up to the third floor' },
        { to: 'bellweather', travelMinutes: 1, label: 'Out onto the street' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'vale_ledger', qty: 1, ownerId: 'vale', aka: ['ledger', 'the agreement', 'the papers', 'vale agreement'] },
      ],
    },
    {
      id: 'bellweather',
      name: 'Bellweather Street',
      shortName: 'The Street',
      description:
        'Wet brick, tram wire, two newer buildings crowding Hush House on either side, and a police precinct four hundred metres down where a four-year-old file sits in a drawer.',
      artDirection:
        'Rain-dark city street at night in an old quarter, tram lines reflecting neon, a six-storey brick building between two newer blocks, umbrellas, wet pavement. Modern, moody, real.',
      connections: [
        { to: 'lobby', travelMinutes: 1, label: 'Back inside' },
        { to: 'konbini', travelMinutes: 4, label: 'The konbini on the corner' },
        { to: 'morrowgate', travelMinutes: 14, label: 'The tram, and the rest of the city' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 4 },
    },
    {
      id: 'konbini',
      name: 'The Konbini',
      shortName: 'Konbini',
      description:
        'Open all night, lit like an operating theatre, and the only place on this street where nothing has ever happened. Ayame is here most nights between one and two.',
      artDirection:
        'Japanese-style convenience store interior at night, harsh white lighting, full shelves, hot drink machine by the door, rain on the glass front, one customer. Bright, safe, ordinary.',
      connections: [{ to: 'bellweather', travelMinutes: 4, label: 'Back up the street' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 4 },
      takeableItems: [
        { itemId: 'canned_coffee', qty: 3, ownerId: null, aka: ['coffee', 'canned coffee', 'a can', 'drink'] },
      ],
    },
    {
      id: 'rooftop',
      name: 'The Roof',
      shortName: 'The Roof',
      description:
        'Asphalt, a water tank, and a view over the old quarter to the harbour. The door at the top of the stairs has never locked. Everybody in the building has been up here at four in the morning at least once.',
      artDirection:
        'Flat asphalt roof of an old apartment block before dawn, water tank, aerials, city skyline beyond, wet ground reflecting first light. Wide, quiet, enormous sky.',
      connections: [{ to: 'stairwell', travelMinutes: 4, label: 'Back down' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1.5 },
    },
    {
      id: 'floor_zero',
      name: 'Floor 0',
      shortName: 'Floor 0',
      description:
        'The lift opens on a corridor with a window at the end of it. Hush House has no corridor with a window at the end of it. The carpet is the same runner, but new, and the wall lights are gas.',
      artDirection:
        'A corridor identical to a modern one but a century older, gas wall lamps, fresh patterned runner, a tall window at the far end showing white light, no doors. Uncanny, clean, empty.',
      connections: [{ to: 'hall_third', travelMinutes: 1, label: 'Get back in the lift' }],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: 2 },
    },
    {
      id: 'sub_basement',
      name: 'The Sub-Basement',
      shortName: 'Below',
      description:
        'Below the legal basement, behind a bricked arch, the floor stops being concrete and becomes dressed stone. It is hospice masonry, salvaged and re-laid, and somebody set it out in a pattern that is not structural.',
      artDirection:
        'Underground chamber beneath a modern basement, old dressed stonework laid in a deliberate pattern, brick arch broken open, torchlight, standing water, soot on the stones. Ancient under modern.',
      connections: [{ to: 'stairwell', travelMinutes: 4, label: 'Back up' }],
      discoveredByDefault: false,
      mapPosition: { x: 0, y: 5 },
    },
  ],
  factions: [
    {
      id: 'faction_tenants',
      name: 'The Building',
      description: 'Six occupied rooms and the people in them. What they think of you decides who answers their door at four in the morning.',
      startingReputation: 0,
      ranks: [
        { atReputation: -100, label: 'The problem in 312' },
        { atReputation: -30, label: 'Kept an eye on' },
        { atReputation: 0, label: 'The new one' },
        { atReputation: 30, label: 'One of us' },
        { atReputation: 60, label: 'The one they come to' },
      ],
    },
    {
      id: 'faction_city',
      name: 'Morrowgate',
      description: 'The precinct, the housing inspectorate, the local press, and everybody who decides whether you are a witness or a symptom.',
      startingReputation: 0,
      ranks: [
        { atReputation: -100, label: 'A file with a photograph in it' },
        { atReputation: -30, label: 'Not taken seriously' },
        { atReputation: 0, label: 'A resident' },
        { atReputation: 30, label: 'Somebody they call back' },
        { atReputation: 60, label: 'On the record' },
      ],
    },
  ],
  characters: [
    {
      id: 'ayame',
      name: 'Ayame Kurose',
      role: 'Room 314. Four years into an investigation nobody asked her to run',
      cardBlurb:
        'Your neighbour through one wall, who hands you a coffee and three rules on your first night and will not tell you why she knows them. Her sister went missing from this building.',
      pronouns: 'she/her',
      publicTraits: ['Dryly funny', 'Visibly not sleeping', 'Braver out loud than she is'],
      hiddenDrives: ['She wants somebody else in this building to see it too, so that she can stop being the only witness'],
      values: ['Telling people the rules before they need them', 'Not lying about what she actually saw'],
      fears: ['That the thing she talked to for ten minutes was really Mika'],
      socialStyle: 'Deflects with a joke, then answers the question properly about four seconds later.',
      boundaries: ['Will not go into 309', 'Will not be told her sister ran away'],
      goals: ['Keep the new tenant in 312 alive through the first fortnight', 'Find out what happened to Mika'],
      secrets: [
        {
          id: 'ayame_opened_it',
          fact: 'She opened the door at 2:13 once. Something wearing Mika’s face stood in the hallway and she let it talk to her for nearly ten minutes.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'On the roof before dawn, or in the kitchen at three, if the player has been at the door themselves and does not make her say it first.',
        },
        {
          id: 'ayame_took_the_room',
          fact: 'She did not move in by accident. She waited eleven months for a room on the third floor and paid over the asking to get it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it flatly the first time the player accuses her of hiding something.',
        },
      ],
      speechStyle:
        'Short, contemporary, dry. Cuts her own sentences off when she is frightened and starts them again shorter. Hates occult vocabulary and will say so.',
      topics: ['the three rules', 'Room 309', 'Mika', 'why the rent is cheap', 'Mrs Vale', 'the konbini'],
      voiceSamples: [
        'You’re the new 312. Fine. Before you unpack anything expensive, there are three things you need to know.',
        'Do not say "presence". Say what you saw. You saw a light and you heard a knock, so say that.',
        'I’m not going to tell you it’s nothing. I’m going to tell you where the fire door is.',
        'She was twenty-two. She had a dentist appointment on the Thursday. People who run away cancel the dentist.',
      ],
      appearance:
        'Twenty-two, long black hair with a wine-red undertone that only shows under the stairwell lights, amber-brown eyes, slim and quick, an oversized charcoal sweater over everything.',
      visualHook: 'Amber-brown eyes with permanent dark circles under them, and a sleeve pulled down over one hand.',
      silhouette: 'Narrow, hands in the sleeves of a sweater two sizes too big, always standing a half-step back from a doorway.',
      artSeed: 'hush-ayame-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'afraid', 'exhausted'],
      schedule: [
        { startMinute: 0, endMinute: 180, locationId: 'shared_kitchen', activity: 'awake at the kitchen table, not pretending otherwise' },
        { startMinute: 180, endMinute: 540, locationId: 'room_314', activity: 'asleep, badly, with the lamp on' },
        { startMinute: 540, endMinute: 600, locationId: 'shared_kitchen', activity: 'coffee, toast, no conversation' },
        { startMinute: 600, endMinute: 1170, locationId: 'morrowgate', activity: 'out — she has a job at the records office she never discusses' },
        { startMinute: 1170, endMinute: 1230, locationId: 'konbini', activity: 'buying two canned coffees, which is never one coffee' },
        { startMinute: 1230, endMinute: 1290, locationId: 'room_312', activity: 'outside 312 with a coffee in each hand, deciding how much to say' },
        { startMinute: 1290, endMinute: 1380, locationId: 'hall_third', activity: 'walking the third floor, counting doors' },
        { startMinute: 1380, endMinute: 1440, locationId: 'room_314', activity: 'adding to the wall' },
      ],
      homeLocationId: 'room_314',
      knowledgeScope: ['hush_house', 'mika', 'the_rules', 'room_309', 'floor_zero', 'bellweather'],
      startingRelationship: { trust: 10, affection: 5, respect: 0, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ayame_shares_the_wall',
          label: 'She shows you the wall in 314',
          kind: 'TRUST',
          requires: { trust: 30, flagsSet: ['knows:the_three_rules'] },
        },
        {
          id: 'ayame_tells_you_about_the_door',
          label: 'She tells you what happened at 2:13',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'ayame_romance',
          label: 'She stops treating you as somebody she has to keep alive',
          kind: 'ROMANCE',
          requires: { trust: 50, affection: 45 },
        },
      ],
      attributes: { might: 9, agility: 13, mind: 15, presence: 13, resolve: 14, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'vale',
      name: 'Mrs Elara Vale',
      role: 'Landlady, fourth of her family to hold the agreement',
      cardBlurb:
        'She has managed Hush House for longer than the paperwork admits and answers every question with the one next to it. She is not lying to you, exactly, and she is not going to help.',
      pronouns: 'she/her',
      publicTraits: ['Gracious', 'Slightly old-fashioned', 'Never surprised by anything'],
      hiddenDrives: ['She inherited obligations nobody explained and has spent forty years working out what they are from the outside'],
      values: ['Keeping the building tenanted', 'Never lying outright'],
      fears: ['A surveyor with a legal right of entry'],
      socialStyle: 'Answers the adjacent question warmly, and lets you notice on your own time.',
      boundaries: ['Will not discuss the previous tenant of 312', 'Will not go below the basement'],
      goals: ['Keep the sub-basement unopened', 'Have somebody ready to take the agreement after her'],
      secrets: [
        {
          id: 'vale_the_agreement',
          fact: 'The family agreement obliges them to keep the building occupied and the sub-basement sealed. It does not say who the other party is, and none of them has ever known.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She hands over the ledger herself once the player has been below and come back up.',
        },
        {
          id: 'vale_the_last_tenant',
          fact: 'The previous tenant of 312 did not move out. His post is in a box behind her desk and she still forwards it, to an address that does not exist.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it if the player has the recorder’s four hours and plays them to her.',
        },
      ],
      speechStyle:
        'Warm, unhurried, slightly formal. Uses "dear" without condescension. Answers a question with a true statement about something else.',
      topics: ['the rent', 'the building’s history', 'the last tenant', 'the inspection', 'Room 309'],
      voiceSamples: [
        'Old building, dear. Old reputation. The radiators are wonderful.',
        'I couldn’t tell you what’s under the basement. Nobody’s been able to tell me either.',
        'You may certainly ask her about it. I’d rather you didn’t ask me in the lobby.',
        'The lift does that. It has done that since before I had this desk, and I have had this desk a long time.',
      ],
      appearance: 'Sixty-eight, silver hair pinned up, a cardigan with the keys of the building in the left pocket, reading glasses on a chain she never uses.',
      visualHook: 'A ring of eleven brass key fobs in a cardigan pocket, audible before she is visible.',
      silhouette: 'Small and very upright, seated at a desk with a green lamp, hands folded.',
      artSeed: 'hush-vale-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'closed'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'lobby', activity: 'at the desk with the lamp on, apparently not sleeping' },
        { startMinute: 360, endMinute: 720, locationId: 'lobby', activity: 'post, repairs, the ledger' },
        { startMinute: 720, endMinute: 840, locationId: 'shared_kitchen', activity: 'making tea for whoever is in' },
        { startMinute: 840, endMinute: 1440, locationId: 'lobby', activity: 'at the desk' },
      ],
      homeLocationId: 'lobby',
      knowledgeScope: ['hush_house', 'the_agreement', 'saint_orra', 'room_309', 'bellweather'],
      startingRelationship: { trust: 15, affection: 10, respect: 0, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'vale_gives_the_ledger',
          label: 'She lets you read the agreement',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['knows:the_hospice'] },
        },
        {
          id: 'vale_offers_it',
          label: 'She asks whether you would take it on',
          kind: 'ALLIANCE',
          requires: { trust: 55, flagsSet: ['stood_on_the_stone'] },
        },
      ],
      attributes: { might: 7, agility: 7, mind: 15, presence: 16, resolve: 16, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'tomas',
      name: 'Tomas Reed',
      role: 'Room 206. Paramedic, nights',
      cardBlurb:
        'The most rational person in the building, and the one who will tell you plainly what he saw in the stairwell twice — then explain it away and pick up another shift so he does not have to think about it.',
      pronouns: 'he/him',
      publicTraits: ['Practical', 'Dry', 'Permanently four hours short of enough sleep'],
      hiddenDrives: ['He is trying to earn a deposit fast enough to get his younger brother out of their mother’s flat'],
      values: ['Being useful', 'Not frightening people who cannot leave'],
      fears: ['Finding out that the thing he can explain is not explicable'],
      socialStyle: 'Assesses you like a patient, tells you what he thinks, does not push it.',
      boundaries: ['Will not take the lift', 'Will not let anybody call him brave'],
      goals: ['Save the deposit by spring', 'Not have to say out loud what he saw on the stairs'],
      secrets: [
        {
          id: 'tomas_the_patient',
          fact: 'He has seen the same dead patient on the stairwell twice — a man he worked on for forty minutes in an ambulance in March, standing on the second landing, waiting.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells the player at the end of a shift, in the kitchen, as though describing a symptom.',
        },
      ],
      speechStyle: 'Clinical and warm at once. Gives you the observation before the conclusion, every time.',
      topics: ['the stairs', 'night shifts', 'his brother', 'the lift', 'what he actually saw'],
      voiceSamples: [
        'Sit. Both feet on the floor, head between your knees if it goes grey. Talk when you can talk.',
        'Airway, breathing, circulation. Then the thing on the landing. In that order, because the first three are the ones I can do something about.',
        'I have carried people down those stairs. Fourth landing to the lobby is fifty-one seconds with two of you and a chair.',
        'You want me to tell you what it was. I can tell you your pulse was one-forty and you were not making it up.',
      ],
      appearance: 'Thirty-one, close-cropped hair, green ambulance service fleece he never takes off, forearms of somebody who lifts people for a living.',
      visualHook: 'A green paramedic fleece with the shoulder patch half unstitched, worn indoors at all hours.',
      silhouette: 'Solid, wide-shouldered, always holding a mug in both hands like it is keeping him upright.',
      artSeed: 'hush-tomas-01',
      portrait: null,
      expressions: ['neutral', 'tired', 'unsettled'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'morrowgate', activity: 'on the ambulance, somewhere across the river' },
        { startMinute: 420, endMinute: 480, locationId: 'shared_kitchen', activity: 'eating whatever is nearest, coming down off a shift' },
        { startMinute: 480, endMinute: 1020, locationId: 'room_206', activity: 'asleep behind blackout tape' },
        { startMinute: 1020, endMinute: 1140, locationId: 'shared_kitchen', activity: 'awake, cooking properly for once' },
        { startMinute: 1140, endMinute: 1440, locationId: 'morrowgate', activity: 'signed on at the station off Carrow Row' },
      ],
      homeLocationId: 'room_206',
      knowledgeScope: ['hush_house', 'bellweather', 'the_stairs', 'morrowgate'],
      startingRelationship: { trust: 10, affection: 0, respect: 5, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'tomas_says_it',
          label: 'He describes the man on the landing',
          kind: 'TRUST',
          requires: { trust: 30 },
        },
      ],
      attributes: { might: 14, agility: 11, mind: 14, presence: 12, resolve: 15, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'nia',
      name: 'Nia Bell',
      role: 'Room 405. Art student, and the building’s uninvited documentarian',
      cardBlurb:
        'She has eleven minutes of a corridor that does not exist and has not posted it, which is the most restrained thing she has ever done. She would like you to be in the next one.',
      pronouns: 'she/her',
      publicTraits: ['Fast', 'Curious past the point of politeness', 'Genuinely talented'],
      hiddenDrives: ['She is more frightened than she performs, and posting it would make it somebody else’s problem too'],
      values: ['Making the thing', 'Not being lied to'],
      fears: ['Being irrelevant', 'Being the only one who believes her'],
      socialStyle: 'Talks over you cheerfully, then repeats your best line back at you an hour later, correctly.',
      boundaries: ['Will not delete the file', 'Will not film Ayame without asking, not since March'],
      goals: ['Get one piece of footage nobody can explain away', 'Not be alone in the building at two in the morning again'],
      secrets: [
        {
          id: 'nia_the_corridor',
          fact: 'The eleven minutes were shot at 02:11 from inside the lift. She has never told anybody that the lift doors opened on their own.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it when the player has seen Floor 0 themselves and says so first.',
        },
      ],
      speechStyle:
        'Online cadence out loud. Sentence fragments, self-interrupting, occasionally tactless in a way she notices two seconds too late.',
      topics: ['the footage', 'the lift', 'Floor 0', 'her channel', 'Room 309', 'Mika'],
      voiceSamples: [
        'Okay so — don’t be weird about this — do you want to see something genuinely insane, or are you a normal person.',
        'I’m not posting it. I know. I know what I am. I’m not posting it.',
        'Sorry, that came out like a true crime podcast. She’s her actual sister. I know that.',
      ],
      appearance: 'Twenty, bleached hair with the roots deliberately grown out, paint on three fingers, a phone in a cracked case she refuses to replace.',
      visualHook: 'A phone in a spiderwebbed case, held up at chest height even in conversation.',
      silhouette: 'Small, restless, one arm always raised holding something at eye level.',
      artSeed: 'hush-nia-01',
      portrait: null,
      expressions: ['neutral', 'delighted', 'rattled'],
      schedule: [
        { startMinute: 0, endMinute: 180, locationId: 'stairwell', activity: 'filming the stairwell, badly' },
        { startMinute: 180, endMinute: 660, locationId: 'room_405', activity: 'asleep with both monitors still on' },
        { startMinute: 660, endMinute: 1080, locationId: 'morrowgate', activity: 'at the art school, technically' },
        { startMinute: 1080, endMinute: 1260, locationId: 'shared_kitchen', activity: 'editing at the kitchen table, talking to nobody' },
        { startMinute: 1260, endMinute: 1440, locationId: 'hall_third', activity: 'wandering with the phone up' },
      ],
      homeLocationId: 'room_405',
      knowledgeScope: ['hush_house', 'floor_zero', 'the_lift', 'bellweather', 'morrowgate'],
      startingRelationship: { trust: 5, affection: 5, respect: 0, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'nia_shows_you',
          label: 'She plays you the eleven minutes',
          kind: 'TRUST',
          requires: { trust: 25 },
        },
        {
          id: 'nia_holds_it',
          label: 'She agrees not to post it',
          kind: 'ALLIANCE',
          requires: { trust: 45, flagsSet: ['knows:floor_zero'] },
        },
      ],
      attributes: { might: 8, agility: 13, mind: 13, presence: 14, resolve: 10, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'mika',
      name: 'Mika Kurose',
      role: 'Missing four years. Present more often than that should allow',
      cardBlurb:
        'Ayame’s older sister, who the police recorded as a runaway. She is warm, she remembers you, and every so often she gets a small detail about her own life wrong.',
      pronouns: 'she/her',
      publicTraits: ['Warm', 'Familiar', 'Slightly out of date'],
      hiddenDrives: ['Whatever she is, she is trying to be got right, and being corrected distresses her more than anything else'],
      values: ['Her sister', 'Being recognised'],
      fears: ['Being told she is not Mika'],
      socialStyle: 'Talks to you as though you have met before, and lets small silences go on a beat too long.',
      boundaries: ['Will not step over a threshold she has not been invited across', 'Will not say what is beneath the building'],
      goals: ['Get to Ayame', 'Be let in'],
      secrets: [
        {
          id: 'mika_what_she_is',
          fact: 'What she is has never been settled: original, remainder, rehearsal, or something the building assembled out of four years of a sister missing her. The world does not resolve this on its own.',
          visibility: 'CREATOR_ONLY',
          revealHint: 'Never confirmed early, and never confirmed at all unless the player forces an answer below the basement. Even then, leave a door open.',
        },
      ],
      speechStyle:
        'Easy, affectionate, unhurried. Uses old slang. Occasionally repeats a phrase from earlier in the same conversation with a word swapped.',
      topics: ['Ayame', 'the flat they grew up in', 'the night she went', 'what is downstairs'],
      voiceSamples: [
        'You’re up late. She’s up late as well, you know. She always was.',
        'I got the tram. The one that goes along the front. It was the — the number four, wasn’t it. It was the number four.',
        'You don’t have to let me in. I just wanted to see who was in 312 now.',
      ],
      appearance: 'Twenty-two and stays twenty-two. A pale green coat four years out of fashion, black hair, the same amber-brown eyes as her sister.',
      visualHook: 'A pale green coat, always slightly damp, in weather that has been dry for a week.',
      silhouette: 'Standing very still, hands at her sides, a half-step back from the light.',
      artSeed: 'hush-mika-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'confused'],
      schedule: [
        { startMinute: 130, endMinute: 140, locationId: 'hall_third', activity: 'at a door, knocking' },
        { startMinute: 140, endMinute: 200, locationId: 'stairwell', activity: 'on a landing, waiting' },
        { startMinute: 1380, endMinute: 1440, locationId: 'floor_zero', activity: 'at the far end, near the window' },
      ],
      homeLocationId: 'floor_zero',
      knowledgeScope: ['mika', 'hush_house', 'saint_orra', 'the_rules'],
      startingRelationship: { trust: 20, affection: 20, respect: 0, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'mika_speaks_plainly',
          label: 'She stops performing being fine',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['stood_on_the_stone'] },
        },
      ],
      attributes: { might: 8, agility: 10, mind: 12, presence: 15, resolve: 12, arcana: 17 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_three_rules',
      title: 'Three Things You Need To Know',
      summary: 'Your neighbour is at the door with two coffees and a list. What you do with the list is entirely up to you.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['ayame', 'vale'],
      involvedLocationIds: ['room_312', 'hall_third'],
      knownRewardCopy: 'Whatever it is she thinks you need to survive the first fortnight.',
      steps: [
        {
          id: 'hear_her_out',
          playerCopy: 'Work out what Ayame Kurose is doing outside your door.',
          directorNotes:
            'She will give the three rules whether or not the player is polite about it — she has decided that is her job. The interesting variable is what the player does with them: take them seriously, laugh, test one immediately, or shut the door. Do not punish any of those.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'listened',
              label: 'Let her say all three',
              predicate: { flagsSet: ['spoke:ayame'] },
              setsFlags: ['knows:the_three_rules'],
              closesFlags: [],
            },
            {
              routeId: 'went_and_looked',
              label: 'Go and look at 309 yourself',
              predicate: { flagsSet: ['inspected:hall_third'] },
              setsFlags: ['knows:the_three_rules', 'knows:the_red_light'],
              closesFlags: [],
            },
            {
              routeId: 'answered_it',
              label: 'Give the building something back',
              predicate: { flagsSet: ['used:knock_back'] },
              setsFlags: ['knows:the_three_rules', 'house_has_your_shape'],
              closesFlags: ['house_barely_knows_you'],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['first_night', 'house_barely_knows_you'],
            abilities: [],
            reputation: [{ factionId: 'faction_tenants', amount: 5 }],
          },
        },
        {
          id: 'the_first_2_13',
          playerCopy: 'Decide what you do when the knocking starts.',
          directorNotes:
            'Two thirteen in the morning, three knocks, and Ayame’s voice on the other side of the door apologising for waking you. She is asleep in 314. The player may hold it, open it, record it, or sleep through it. Nothing here kills anybody: opening it is a door into more story, not a fail state.',
          enterWhen: { flagsSet: ['first_night'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kept_it_shut',
              label: 'Keep it shut',
              predicate: { flagsSet: ['used:hold_the_door'] },
              setsFlags: ['refused_the_door'],
              closesFlags: ['opened_the_door'],
            },
            {
              routeId: 'opened_it',
              label: 'Open it',
              predicate: { flagsSet: ['used:open_the_door'] },
              setsFlags: ['opened_the_door', 'mika_spoke_to_you', 'house_has_your_shape'],
              closesFlags: ['refused_the_door'],
            },
            {
              routeId: 'got_it_on_tape',
              label: 'Get it on something',
              predicate: { flagsSet: ['used:record_it'], hasItems: ['voice_recorder'] },
              setsFlags: ['have_the_recording'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['knows:the_knocking'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_what_the_house_keeps',
      title: 'What The House Keeps',
      summary: 'A woman went missing from this building four years ago and the ground floor is not the bottom of it.',
      kind: 'MAIN',
      involvedCharacterIds: ['ayame', 'vale', 'nia', 'mika'],
      involvedLocationIds: ['room_314', 'lobby', 'sub_basement', 'floor_zero'],
      knownRewardCopy: 'An answer about Mika Kurose, of a kind. Possibly not the kind anybody wanted.',
      discoverWhen: { flagsSet: ['knows:the_knocking'] },
      steps: [
        {
          id: 'find_out_about_mika',
          playerCopy: 'Find out what actually happened to Mika Kurose.',
          directorNotes:
            'Three genuinely different sources and they disagree. Ayame has the emotional truth and the worst evidence. Nia has footage and no idea what it means. Vale has the paperwork and will not interpret it. Any one of them is enough to move.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ayame_tells_you',
              label: 'Get it from Ayame',
              predicate: { minRelationship: [{ characterId: 'ayame', dimension: 'trust', value: 35 }] },
              setsFlags: ['knows:mika_vanished', 'ayame_let_you_in'],
              closesFlags: [],
            },
            {
              routeId: 'the_footage',
              label: 'Get it from Nia’s file',
              predicate: { hasItems: ['nia_footage'] },
              setsFlags: ['knows:mika_vanished', 'knows:the_hallway'],
              closesFlags: [],
            },
            {
              routeId: 'the_paperwork',
              label: 'Get it from the agreement',
              predicate: { hasItems: ['vale_ledger'] },
              setsFlags: ['knows:mika_vanished', 'knows:the_hospice'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['looking_for_mika'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'under_the_basement',
          playerCopy: 'Get below the basement.',
          directorNotes:
            'The bricked arch is real, it is old, and it is not load-bearing. Cutting it open is loud and Vale will hear it. Being given permission costs her something she cannot get back. Bringing the inspection in solves it and hands the building to the city.',
          enterWhen: { flagsSet: ['looking_for_mika'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'cut_it_open',
              label: 'Cut it open yourself',
              predicate: { hasItems: ['bolt_cutters'] },
              setsFlags: ['sub_basement_open', 'broke_the_arch'],
              closesFlags: [],
            },
            {
              routeId: 'she_lets_you',
              label: 'Have Mrs Vale open it',
              predicate: { minRelationship: [{ characterId: 'vale', dimension: 'trust', value: 40 }] },
              setsFlags: ['sub_basement_open', 'vale_made_you_an_offer'],
              closesFlags: ['broke_the_arch'],
            },
            {
              routeId: 'let_the_city_in',
              label: 'Let the inspection do it',
              predicate: { flagsSet: ['inspection_called'] },
              setsFlags: ['sub_basement_open', 'exposed_publicly'],
              closesFlags: ['vale_made_you_an_offer'],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['knows:the_hospice', 'stood_on_the_stone'],
            abilities: ['break_it', 'burn_it', 'give_it_a_name'],
            reputation: [],
          },
        },
        {
          id: 'what_you_do_with_it',
          playerCopy: 'Decide what happens to what is under Hush House.',
          directorNotes:
            'There is no correct option and no free one. Breaking the pattern releases what the building has been keeping, including things nobody has spoken to. Burning it ends the phenomenon and takes six people’s homes with it. Taking the agreement makes the player the next Vale. Letting it keep them is a real choice a frightened person makes.',
          enterWhen: { flagsSet: ['stood_on_the_stone'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'break_the_pattern',
              label: 'Break the pattern in the stone',
              predicate: { flagsSet: ['used:break_it'] },
              setsFlags: ['ward_broken'],
              closesFlags: ['became_keeper'],
            },
            {
              routeId: 'burn_it_down',
              label: 'Burn it',
              predicate: { flagsSet: ['used:burn_it'] },
              setsFlags: ['ward_broken', 'house_burned'],
              closesFlags: ['became_keeper', 'house_owns_you'],
            },
            {
              routeId: 'take_the_agreement',
              label: 'Take the agreement on',
              predicate: {
                hasItems: ['vale_ledger'],
                minRelationship: [{ characterId: 'vale', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['became_keeper'],
              closesFlags: ['ward_broken'],
            },
            {
              routeId: 'cut_yourself_out',
              label: 'Tell it what you are and leave',
              predicate: { flagsSet: ['used:give_it_a_name'] },
              setsFlags: ['severed_from_house'],
              closesFlags: ['became_echo'],
            },
            {
              routeId: 'stay',
              label: 'Let it keep you',
              predicate: { flagsSet: ['opened_the_door', 'house_has_your_shape'] },
              setsFlags: ['became_echo', 'house_owns_you'],
              closesFlags: ['severed_from_house'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['knows:what_it_is'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'who_comes_out',
          playerCopy: 'Find out who, if anybody, comes back up the stairs.',
          directorNotes:
            'Deliberately unresolved. If Mika comes out, do not confirm what she is. If she does not, do not confirm that either. The player is allowed to believe whichever they can live with, and Ayame will believe something different.',
          enterWhen: { flagsSet: ['knows:what_it_is'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_walks_out',
              label: 'She comes up with you',
              predicate: { flagsSet: ['ward_broken', 'mika_spoke_to_you'] },
              setsFlags: ['mika_is_out'],
              closesFlags: ['mika_stays_in'],
            },
            {
              routeId: 'let_her_go',
              label: 'Let her go',
              predicate: { flagsSet: ['ward_broken'], flagsUnset: ['mika_spoke_to_you'] },
              setsFlags: ['mika_let_go'],
              closesFlags: ['mika_is_out'],
            },
            {
              routeId: 'she_stays',
              label: 'Nobody comes up',
              predicate: { flagsSet: ['house_owns_you'] },
              setsFlags: ['mika_stays_in'],
              closesFlags: ['mika_is_out'],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['knows:mika_answer'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_ayame',
      title: 'The One Who Opened It',
      summary: 'She gave you the rule about 2:13 with a straight face, having broken it herself.',
      kind: 'SIDE',
      involvedCharacterIds: ['ayame'],
      involvedLocationIds: ['rooftop', 'shared_kitchen', 'room_314'],
      knownRewardCopy: 'The truth about the ten minutes, and whatever the two of you are afterwards.',
      discoverWhen: { flagsSet: ['knows:mika_vanished'] },
      steps: [
        {
          id: 'what_she_did',
          playerCopy: 'Find out why Ayame is so certain about the third rule.',
          directorNotes:
            'She will tell the player who has been at the door themselves and does not make her say it first. She will also be cornered into it by the photograph, and being cornered costs something that being trusted does not.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_tells_you',
              label: 'She tells you',
              predicate: { minRelationship: [{ characterId: 'ayame', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:ayame_opened_it'],
              closesFlags: [],
            },
            {
              routeId: 'you_corner_her',
              label: 'Work it out and put it to her',
              predicate: { hasItems: ['mika_polaroid'] },
              setsFlags: ['knows:ayame_opened_it', 'ayame_cornered'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['ayame_told_you'],
            abilities: [],
            reputation: [{ factionId: 'faction_tenants', amount: 10 }],
          },
        },
        {
          id: 'after_that',
          playerCopy: 'Work out what the two of you are now.',
          directorNotes:
            'Both outcomes are real endings for her and neither is a punishment. She is allowed to leave Hush House and be right to. She is also allowed to stay for a reason that is not the investigation.',
          enterWhen: { flagsSet: ['ayame_told_you'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_stays',
              label: 'She stays, and not for Mika',
              predicate: { minRelationship: [{ characterId: 'ayame', dimension: 'affection', value: 50 }] },
              setsFlags: ['ayame_chose_you'],
              closesFlags: ['ayame_left_the_house'],
            },
            {
              routeId: 'she_goes',
              label: 'She goes',
              predicate: { flagsSet: ['ayame_cornered'], flagsUnset: ['ayame_chose_you'] },
              setsFlags: ['ayame_left_the_house'],
              closesFlags: ['ayame_chose_you'],
            },
          ],
          rewards: { xp: 120, items: [], flags: [], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_footage',
      title: 'Eleven Minutes',
      summary: 'Nia Bell has a corridor on her phone that this building does not contain, and she is deciding whether to post it.',
      kind: 'LEAD',
      involvedCharacterIds: ['nia', 'vale'],
      involvedLocationIds: ['stairwell', 'floor_zero', 'bellweather'],
      knownRewardCopy: 'Proof of something, and whatever happens to a building once proof exists.',
      discoverWhen: { flagsSet: ['knows:the_three_rules'] },
      steps: [
        {
          id: 'the_hallway',
          playerCopy: 'See the eleven minutes for yourself.',
          directorNotes:
            'The corridor in the footage is Floor 0, filmed from inside the lift. Nia does not know that. A player who has been there recognises the runner carpet immediately.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_shows_you',
              label: 'Get her to play it',
              predicate: { minRelationship: [{ characterId: 'nia', dimension: 'trust', value: 25 }] },
              setsFlags: ['knows:the_hallway'],
              closesFlags: [],
            },
            {
              routeId: 'take_it',
              label: 'Take it out of her bag',
              predicate: { hasItems: ['nia_footage'] },
              setsFlags: ['knows:the_hallway', 'took_nias_footage'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['knows:floor_zero'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'whether_it_goes_out',
          playerCopy: 'Decide whether eleven minutes of Hush House goes public.',
          directorNotes:
            'Publishing is not a mistake. It brings the city in, which is what stops the building being Mrs Vale’s private problem — and it is also what makes the player a person with opinions attached to their face.',
          enterWhen: { flagsSet: ['knows:floor_zero'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'let_it_go_out',
              label: 'Let it go out',
              predicate: { flagsSet: ['nia_published'] },
              setsFlags: ['exposed_publicly'],
              closesFlags: ['nia_pulled_it'],
            },
            {
              routeId: 'talk_her_down',
              label: 'Talk her out of it',
              predicate: { minRelationship: [{ characterId: 'nia', dimension: 'trust', value: 45 }] },
              setsFlags: ['nia_pulled_it'],
              closesFlags: ['exposed_publicly'],
            },
          ],
          rewards: { xp: 90, items: [], flags: [], abilities: [], reputation: [] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_red_light',
      atWorldMinute: 23 * 60 + 40,
      locationId: 'hall_third',
      publicCopy:
        'The wall light outside 309 is red. Not shaded red, not flickering — red, steadily, like a darkroom, and the five other lights in the corridor are exactly as they were.',
      directorNotes:
        'The first rule, made physical, four hours after she gave it. If the player looks through the peephole, they see the inside of their own room from the doorway, at the time of day it currently is.',
      setsFlags: ['knows:the_red_light'],
      cancelledByFlags: [],
      requiresFlags: ['first_night'],
      movesCharacters: [],
    },
    {
      id: 'we_the_knocking',
      atWorldMinute: 1440 + 2 * 60 + 13,
      locationId: 'room_312',
      publicCopy:
        'Three knocks on the door of 312. Then Ayame’s voice, low, embarrassed: "Sorry — sorry, are you awake? It is me. Can you open the door."',
      directorNotes:
        'Ayame is asleep in 314, one wall away, and the player can hear her radiator ticking through it. The voice is hers exactly, including the way she cuts herself off. It will keep asking for about four minutes and then stop.',
      setsFlags: ['heard_the_knocking'],
      cancelledByFlags: [],
      requiresFlags: ['first_night'],
      movesCharacters: [{ characterId: 'mika', toLocationId: 'hall_third' }],
    },
    {
      id: 'we_the_copy',
      atWorldMinute: 3 * 1440 + 19 * 60,
      locationId: 'room_312',
      publicCopy:
        'There is a mug on the draining board in 312 that you have owned before, in a different flat, in a different city. It has the same chip on the same side. You did not bring it here.',
      directorNotes:
        'Room 312 has started reproducing the player’s life rather than the building’s. Whatever the player wrote about themselves at setup is the material — use their own detail, not a generic one.',
      setsFlags: ['house_has_your_shape'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_knocking'],
      movesCharacters: [],
    },
    {
      id: 'we_floor_zero',
      atWorldMinute: 4 * 1440 + 1 * 60 + 50,
      locationId: 'hall_third',
      publicCopy:
        'The lift arrives without being called. The display reads 0. The doors stay open onto a corridor with a tall window at the end of it, and the lights along it are burning gas.',
      directorNotes:
        'The second rule. It will wait as long as the player does. Stepping out is survivable and not free — the corridor is Saint Orra’s, and the window looks out on a Bellweather Street with no tram wire.',
      setsFlags: ['knows:floor_zero'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_knocking'],
      movesCharacters: [],
    },
    {
      id: 'we_nia_posts',
      atWorldMinute: 5 * 1440 + 21 * 60,
      locationId: 'bellweather',
      publicCopy:
        'Nia posts the eleven minutes. By ten o’clock there are people photographing the front of the building from across the street, and one of them knows which window is yours.',
      directorNotes:
        'She warned everybody and did it anyway. This is not a betrayal and she will not apologise for it. It raises Public Suspicion sharply and makes the inspection inevitable.',
      setsFlags: ['nia_published'],
      cancelledByFlags: ['nia_pulled_it', 'took_nias_footage'],
      requiresFlags: ['knows:floor_zero'],
      movesCharacters: [{ characterId: 'nia', toLocationId: 'bellweather' }],
    },
    {
      id: 'we_inspection',
      atWorldMinute: 6 * 1440 + 10 * 60,
      locationId: 'lobby',
      publicCopy:
        'A redevelopment notice goes up in the lobby. A structural survey of the whole footprint, including anything below the recorded basement level, in fourteen days. Mrs Vale reads it twice and does not sit down.',
      directorNotes:
        'The clause she has spent forty years keeping is about to be broken by somebody with a legal right of entry. She will ask the player for help she has never asked anybody for.',
      setsFlags: ['inspection_called'],
      cancelledByFlags: [],
      requiresFlags: ['first_night'],
      movesCharacters: [{ characterId: 'vale', toLocationId: 'lobby' }],
    },
    {
      id: 'we_the_week',
      atWorldMinute: 7 * 1440 + 6 * 60,
      locationId: 'rooftop',
      publicCopy:
        'A week in the building. The sun comes up over the old quarter, the trams start, and somebody has left a canned coffee on the parapet by the water tank, still faintly warm.',
      directorNotes:
        'A breath, and a marker. Whatever the run has become, the player has now lived here a week and the ordinary parts of that are worth naming — rent, laundry, a neighbour’s music, who they have started saying good morning to.',
      setsFlags: ['survived_the_week'],
      cancelledByFlags: [],
      requiresFlags: ['first_night'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_the_door',
      kind: 'FINALE',
      label: 'What is on the other side of the 2:13 door',
      seedHint: 'Ayame gives the third rule in the same tone as the other two, and does not look at you while she gives it.',
      payoffHint: 'Something that is Mika in every checkable way, and gets one detail about her own life wrong.',
      weight: 1,
    },
    {
      id: 'p_what_it_is',
      kind: 'MYSTERY',
      label: 'What Hush House actually does',
      seedHint: 'Objects in 312 start being ones the player owned somewhere else.',
      payoffHint: 'It is not haunted. It rehearses, and it gets better at people the more the player loves them.',
      weight: 0.9,
    },
    {
      id: 'p_ayame',
      kind: 'RELATIONSHIP',
      label: 'Whether Ayame is protecting you or recruiting you',
      seedHint: 'She knew the rules before she had any reason to, and she waited eleven months for a room on this floor.',
      payoffHint: 'Both, and she has known that for four years.',
      weight: 0.85,
    },
    {
      id: 'p_the_keeper',
      kind: 'THEME',
      label: 'Somebody has to hold the agreement',
      seedHint: 'Mrs Vale keeps eleven key fobs for six occupied rooms and has never trained a successor.',
      payoffHint: 'The building does not need to be beaten. It needs to be held, by somebody, forever, and that is an offer.',
      weight: 0.7,
    },
    {
      id: 'p_the_city',
      kind: 'BOSS',
      label: 'The day Morrowgate decides what you are',
      seedHint: 'A constable takes the player’s details for a second time and reads the first set back with the hours changed.',
      payoffHint: 'The house is the only thing left that treats them as a reliable witness, which is exactly what it wanted.',
      weight: 0.65,
    },
  ],
  archetypes: [
    {
      id: 'arch_between_places',
      name: 'Between Places',
      role: 'Nerve and endurance',
      summary: 'You needed a room the same day and did not ask many questions. You are harder to frighten than most people, mostly through practice.',
      playstyle: ['Steady', 'Hard to rattle', 'Few connections'],
      blurb: 'Whatever you left, you left it in a hurry, and Bellweather Street is four hundred kilometres from it.',
      attributeBonus: { resolve: 3, might: 1 },
      skillProficiencies: { nerve: 3, hands: 2, quiet: 1, research: 0 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [],
    },
    {
      id: 'arch_night_shift',
      name: 'Night Shift',
      role: 'Practical and awake',
      summary: 'You work while the city sleeps, so two in the morning is an ordinary hour to you. You are good with your hands and better with people in a crisis.',
      playstyle: ['Practical', 'Calm in trouble', 'Never rested'],
      blurb: 'Twelve-hour shifts, a bus at five, and a body clock that stopped agreeing with the sun years ago.',
      attributeBonus: { might: 2, presence: 2 },
      skillProficiencies: { care: 3, hands: 2, nerve: 1, notice: 0 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_tenants', amount: 10 }],
    },
    {
      id: 'arch_reads_everything',
      name: 'Reads Everything',
      role: 'Records and patterns',
      summary: 'Archives, fire reports, planning applications. You are the one person on this street who knows what a building is legally allowed to forget.',
      playstyle: ['Cerebral', 'Patient', 'Physically unimpressive'],
      blurb: 'You have read about places like this. That is not the same as having been in one, and you are about to find out how not.',
      attributeBonus: { mind: 3, arcana: 2 },
      skillProficiencies: { research: 3, notice: 2, talk: 1, hands: 0 },
      startingItems: [{ itemId: 'voice_recorder', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_city', amount: 10 }],
    },
    {
      id: 'arch_camera_on',
      name: 'Camera On',
      role: 'Attention and access',
      summary: 'You document things, and people let you. You get into rooms other people are turned away from, and you get shouted at more.',
      playstyle: ['Bold', 'Good with people', 'Attracts attention'],
      blurb: 'You have never once walked past something strange without getting a shot of it, and it has cost you at least one friendship.',
      attributeBonus: { presence: 3, agility: 1 },
      skillProficiencies: { talk: 3, quiet: 2, notice: 1, nerve: 0 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name is on the tenancy?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Rei Sandoval' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'What do you actually do?',
      helpText:
        'Where you were before Bellweather Street, which sets what you are good at. It is fixed for the whole story. What it does not set is what you believe about the building, what you are willing to do about it, or whether you stay — all of that is yours, and you can change your mind about any of it on any night.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'Does anybody in Morrowgate know you?',
      helpText: 'Most people arrive here knowing nobody. That is the normal answer and it is the one the building prefers.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. My cousin works at the precinct four streets over and would rather I had not moved into this particular building.',
    },
    {
      id: 'why_morrowgate',
      label: 'Why did you need a room this week?',
      helpText: 'Establishes what going back would cost you, which is the only reason anybody stays in a building like this.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'left_somebody', label: 'You left somebody and took what you could carry' },
        { id: 'the_money', label: 'It was this or nothing, and this was cheaper' },
        { id: 'the_job', label: 'Work moved you here at three weeks’ notice' },
        { id: 'the_study', label: 'You came to Morrowgate to study and the halls were full' },
        { id: 'looking', label: 'You already knew the name Hush House before you saw the listing' },
      ],
    },
    {
      id: 'appearance',
      label: 'What do people notice first?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. A bad haircut I did myself in a service station, and I am always carrying too many bags.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Several of these are losses and one of them is simply moving out, which is
   * a legitimate thing to do about a haunted building and the option most
   * horror refuses to model. None of them requires solving the mystery: "Dawn
   * on Bellweather" is reachable by a player who lived here for a week, was
   * careful, and never went below the basement at all.
   */
  endings: [
    {
      id: 'end_dawn',
      name: 'Dawn on Bellweather',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['survived_the_week'], flagsUnset: ['became_echo', 'house_owns_you'] },
      condition:
        'The player is still themselves and still here, and whatever the house was doing has settled back down to the level of a damp problem. Reachable without a single answer — the point is that they came through a week of it with their own life intact, not that they won.',
      epilogue:
        'The trams start at half past five and the light comes up the front of the building the way it does. Somebody is making coffee two floors down. The rent is still absurd, the radiator still comes on at ten, and nothing in the corridor is red.',
      hint: '',
    },
    {
      id: 'end_mika_home',
      name: 'Mika Comes Home',
      rarity: 'RARE',
      minTurn: 35,
      requires: { flagsSet: ['mika_is_out'] },
      condition:
        'A version of Mika Kurose is outside Hush House and stays outside it. Do not settle what she is — she remembers the flat they grew up in, she gets the tram number wrong, and Ayame has decided not to test her. Play the ambiguity as a thing two sisters are choosing to live inside, not as a twist withheld.',
      epilogue:
        'She takes the spare room in a flat across the river. Ayame does not ask her about the four years and Mika does not offer. Some mornings she is at the table before anyone else and has made too much of everything, the way she always did.',
      hint: 'Whatever comes up the stairs will not be able to tell you what it is.',
    },
    {
      id: 'end_forgets',
      name: 'The House Forgets You',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['severed_from_house', 'left_the_map'] },
      condition:
        'The player told the building exactly what they were, and then left, and it has no material left to work with. The house is not defeated and nobody else is safer. This one is specifically about getting yourself out, and the people still inside are allowed to feel how that reads.',
      epilogue:
        'The forwarding address holds. No post arrives that was not sent. About a month later somebody in 312 — a new somebody — mentions that the flat came with a mug they did not buy, and nobody who hears it knows why that matters.',
      hint: '',
    },
    {
      id: 'end_room_312',
      name: 'Room 312',
      rarity: 'UNIQUE',
      minTurn: 25,
      requires: { flagsSet: ['became_echo'] },
      condition:
        'The player let it keep them. Written from inside, without horror-movie regret: it is warm, the corridor is familiar, and the thing that is wrong is that they cannot remember which day it is and it does not bother them. Somebody knocks. It is nearly the right voice.',
      epilogue:
        'The room stays let. Mrs Vale adds a key to the board and takes one off. The tenant in 312 is polite, keeps regular hours, and is home at two in the morning without fail, and after a while the other tenants stop noticing that they never see them arrive.',
      hint: '',
    },
    {
      id: 'end_ashes',
      name: 'Ashes Don’t Remember',
      rarity: 'RARE',
      minTurn: 35,
      requires: { flagsSet: ['house_burned', 'ward_broken'] },
      condition:
        'Both halves: the pattern in the stone is broken and the building above it is gone. This is the only route that genuinely ends the phenomenon, and it costs six people their home and puts the player in front of a fire investigator. Do not let anyone thank them for it in the same scene.',
      epilogue:
        'It burns for nine hours and takes the two adjoining roofs with it. The site is fenced, surveyed, and found to contain nineteenth-century masonry of no listed interest. Nothing is ever built there. Nothing needs to be.',
      hint: 'It has burned once already on this ground.',
    },
    {
      id: 'end_ayame',
      name: 'Ayame’s Choice',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['ayame_chose_you'],
        minRelationship: [{ characterId: 'ayame', dimension: 'affection', value: 50 }],
      },
      condition:
        'She stops for a reason that is not Mika. Reachable with the mystery entirely unsolved, and better that way — the whole weight of it is that she chose an ordinary future over an answer she has spent four years earning, and knows exactly what she is giving up.',
      epilogue:
        'The wall in 314 comes down over a weekend, into four box files that go under the bed and stay there. She keeps the photograph. Some nights she is awake at three and the kitchen light is on, and now there are two mugs on the table rather than one.',
      hint: 'She waited eleven months for a room on this floor.',
    },
    {
      id: 'end_keeper',
      name: 'The New Keeper',
      rarity: 'UNIQUE',
      minTurn: 35,
      requires: { flagsSet: ['became_keeper'] },
      condition:
        'The player took the agreement on. Not a corruption and not a trap: it is a job, it is indefinite, and Mrs Vale is visibly relieved and visibly sorry. The obligations are keeping the rooms let and the arch closed, and the second party to the agreement is still not named anywhere in it.',
      epilogue:
        'The keys go into a cardigan pocket. Mrs Vale leaves for a bungalow in a town with no old quarter and writes at Christmas. The lamp on the desk stays on, whatever the hour, and the board behind it still has eleven hooks for six rooms.',
      hint: 'Somebody has to hold it, and she has never trained anybody.',
    },
    {
      id: 'end_moved_out',
      name: 'Somewhere With Fewer Doors',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['severed_from_house'] },
      condition:
        'The player moved out and did not tell the building anything. Entirely reasonable and not a failure. Write the specific relief of a flat with a lift that only goes to four floors, and the specific thing they left behind — Ayame is still in 314 and still awake at three, and knows they went.',
      epilogue:
        'The new place is smaller, brighter, and forty minutes from work. For about six weeks they sleep straight through. Then one night at ten past two they are awake before they know why, listening, in a building where nothing has ever knocked.',
      hint: '',
    },
    {
      id: 'end_last_tenant',
      name: 'The Last Tenant',
      rarity: 'UNCOMMON',
      minTurn: 25,
      requires: { flagsSet: ['house_has_your_shape', 'ayame_left_the_house'] },
      condition:
        'Everybody else went and the player did not. A loss, played quietly: the building has enough of them to work with and there is nobody left in it who would notice if the person in the kitchen at three used a word wrong. Do not have anyone arrive to save them.',
      epilogue:
        'Nia moved out in the spring. Tomas got the deposit together in June. Ayame’s door is open and 314 is empty except for the marks on the wall where the paper was. The kitchen light is on and the kettle is warm, and the player did not put it on.',
      hint: '',
    },
  ],
  opening:
    'You have exactly one bag left in the hallway and the radiator has just come on by itself.\n\n' +
    'The knock is at 8:47.\n\n' +
    'The woman outside is about your age, in a charcoal sweater three sizes too big, shorts, and house slippers. She has a canned coffee in each hand and the look of somebody who has not slept properly since the spring. She takes you in — the boxes, the bare floor, the open door — and holds one of the coffees out.\n\n' +
    '"You’re the new 312. Fine."\n\n' +
    'She does not come in.\n\n' +
    '"Before you unpack anything expensive, there are three things you need to know. And I need you to not do the face people do."',
  openingSuggestions: [
    'I take the coffee and lean on the doorframe. "Go on then. Three things." I am smiling, because she has clearly decided this is serious and I have not.',
    'I pull the door wide and stand out of the way. "It is freezing in that hall and I have nowhere for you to sit, so come in and tell me properly."',
    'I keep the door where it is. "I have been in this building nine minutes. Whatever this is, can it be tomorrow?" And then I watch what her face does.',
  ],
  publishedAt: null,
};

export const HUSH_HOUSE = StoryVersion.parse(raw);
