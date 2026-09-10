import { StoryVersion } from '@aniplay/contracts';

/**
 * "The Blank Prophecy" — Athens, and a person the machinery cannot read.
 *
 * The bible's hard canon is one sentence long: the Loom cannot currently read
 * the player. Everything else about the blank — why, what caused it, whether
 * it can be undone — is explicitly open, so nothing in this world commits to
 * an explanation and the setup field invites the player to supply one.
 *
 * Blank is freedom, not invincibility, and the world is built so both halves
 * bite. Prophecy cannot predict them and fate-based protection also fails on
 * them; oracles cannot reassure them; and the things that eat threads are
 * drawn to the hole where theirs should be. That last one is the Fray, which
 * is the price of every divine power used by somebody with nothing to anchor
 * it to.
 *
 * Gods are characters here rather than vending machines, so only two of them
 * are authored — the one who turns up because he is curious and the one whose
 * whole domain is the place between things. The rest of Olympus is an
 * institution, felt through Notice.
 *
 * Three variables. Footing is the only GOOD_HIGH, because `resolveRest`
 * refills those. Notice is first among the descending pair — the generic cost
 * path and PUBLIC_VIOLENCE both take the first GOOD_LOW in array order, and a
 * mythic event in a crowded street bringing Olympus round to look is exactly
 * what should absorb that.
 */

const raw = {
  id: 'sv_blank_prophecy_1',
  storyId: 'story_blank_prophecy',
  version: 1,
  title: 'The Blank Prophecy',
  fantasyLabel: 'They read your future. It was empty.',
  hook: 'Every person alive has a thread an oracle can read, which is how this world decides who you are going to be before you have decided anything. They read yours and there was nothing there.',
  premise:
    'The last train arrives six minutes early and there is an animal standing on the roof of it.\n\n' +
    'Nobody else on the platform looks up. You do, because you can see it, and a girl ten metres away watches you see it and her face changes.\n\n' +
    'What follows is a bad twenty minutes in which you nearly die, and then a small guesthouse where the kitchen is still open at two in the morning and half the people eating are not people.\n\n' +
    'There is a whole world running underneath this city and it has been there the entire time. It is old, it is badly recorded, and it works on rules about hospitality and promises that everybody in it takes seriously because they have to.\n\n' +
    'It also runs on prophecy. Everybody has a thread, an oracle can read it, and that is how this world decides who somebody is going to be, frequently before they have decided anything.\n\n' +
    'They read you and there was nothing there.\n\n' +
    'So now a man who spent six years proving that being told your future is the thing that causes it wants very much to meet you, several gods want to know what you are, and the creatures that eat fate have started following you home.',
  creatorId: 'creator_official',
  creatorName: 'ANIMA Studio',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Supernatural', 'Monsters', 'Coming of age', 'Mystery'],
  mechanicsChips: [
    'Nobody can predict you',
    'Nothing protects you either',
    'Gods are people with agendas',
    'Hospitality is a real rule',
    'Names can be earned and made',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'MORAL_AMBIGUITY', 'ROMANCE', 'PSYCHOLOGICAL_THEMES'],
  intensity: 'MODERATE',
  creatorNote:
    'The blank is not a power. It is a hole, and things are attracted to holes. What it buys you is that no god in this story can tell you what you are going to do, including the ones who would like to help, and what it costs you is that none of the old protections work on you either. Kyros is not wrong about everything and the story never pretends he is.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'monastiraki_platform',
    startWorldMinute: 23 * 60 + 43,
    startingItems: [{ itemId: 'phone', qty: 1 }],
    hardCanon: [
      'Greek myth is real, not exactly as any single surviving text describes it, and the contradictions between texts are a feature of how gods accumulate Names.',
      'A god may grant a mortal one of its Names. That mortal becomes a Bearer, and how they use it changes what the Name means.',
      'The mythic world is hidden because mythic events are rare, local, badly recorded and cleaned up, not because of any memory-erasing magic.',
      'The Loom beneath Delphi cannot currently read the player. That is the entire hard canon about the blank; why it is blank is open and the run establishes it.',
      'Blank is not invincibility. Fate-based protections fail on the player exactly as fate-based predictions do, and creatures that feed on threads are attracted to the absence of one.',
      'Kyros Argyros killed his sister Mara, exactly as prophesied, after six years of trying to prevent it. He believes prophecy trains reality toward itself, and his argument is coherent.',
      'Xenia is binding. A guest across a threshold is owed food, safety and honesty about immediate danger, and a host who breaks it loses something real.',
    ],
    toneGuide:
      'Modern Athens, specific and unglamorous: a late train, a periptero, plastic chairs outside a taverna, marble worn shiny by tourists, a stairwell smelling of cats. The mythic sits in that rather than replacing it. ' +
      'Transformation language is anime and the clothing stays grounded — markings, a manifested weapon, a mantle of spectral texture over one shoulder, never a suit of armour. ' +
      'Gods have agendas, moods and things they want from you. Nobody hands out a power because the player was brave. Hermes is curious and transactional; Hecate is patient and gives nothing free. ' +
      'Monsters are original composites rather than famous names, and are not all enemies. The thing on the train roof wants to understand the hole in you, which is a different verb from wanting to eat you. ' +
      'Do not explain the metaphysics during a fight. Do not let anybody deliver a lecture about fate that the scene has not earned.',
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 13, mind: 13, presence: 13, resolve: 14, arcana: 11 },
  skills: [
    { id: 'running', name: 'Running', attribute: 'agility', description: 'Stairs, walls, a fence, a moving train, and knowing which of those a thing behind you cannot do.' },
    { id: 'hunt', name: 'The Hunt', attribute: 'might', description: 'Bringing something down that was not built the way anything ought to be built.' },
    { id: 'lore', name: 'Lore', attribute: 'mind', description: 'What a thing is, from four contradictory accounts of it, three of which are wrong in useful ways.' },
    { id: 'hospitality', name: 'Hospitality', attribute: 'presence', description: 'The rules of guest and host, which in this world are load-bearing and are enforced by something.' },
    { id: 'streetwise', name: 'Streetwise', attribute: 'mind', description: 'Athens after midnight: which door is open, who is awake, and how to be nowhere in particular.' },
    { id: 'oath', name: 'Oaths', attribute: 'resolve', description: 'Saying a thing in the form that binds, and being the sort of person a god will accept one from.' },
    { id: 'sight', name: 'Sight', attribute: 'arcana', description: 'Seeing the half of the city that has been there the whole time, and looking at a god without flinching.' },
  ],
  resources: [
    {
      id: 'footing',
      name: 'Footing',
      max: 100,
      start: 80,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'Legs gone and the other thing gone with it. Everything in this world reads a person’s bearing before it reads anything else, and at this point every monster, host and god in Athens can see exactly what state you are in.',
      color: '#4E8C9A',
      bands: [
        {
          upTo: 24,
          behaviour:
            'Wrecked. Four flights of stairs is a negotiation and a conversation with something old is a much worse one. Gods take a person in this state less seriously and monsters take them more seriously, and both of those are correct.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary exhaustion of a city and a secret. Good for one more roof or one more difficult conversation and honest about not being good for both. Thalia notices and does not say anything, which is its own kind of comment.',
        },
        {
          upTo: 100,
          behaviour:
            'Whole. The player can cross Athens at four in the morning, hold their ground in front of something that has been alive since before the language, and still be present for whoever is waiting at the far end of it.',
        },
      ],
    },
    {
      id: 'notice',
      name: 'Notice',
      max: 100,
      start: 22,
      regenPerHour: -0.2,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody upstairs has heard of you. The gods who have met you have not mentioned you to anybody, the Council has a file with two lines in it, and Athens is a city rather than a stage.',
      color: '#C8A03C',
      bands: [
        {
          upTo: 28,
          behaviour:
            'An anomaly in a report nobody has read. Two gods are aware, informally, in the way somebody is aware of an interesting rumour. The player can move through the mythic world as a person rather than as a question, which is the only condition under which anybody talks to them honestly.',
        },
        {
          upTo: 58,
          behaviour:
            'Discussed. The Council has opened something with a number on it, three more gods have asked about the player by name, and offers begin arriving — of protection, of a Name, of an arrangement. Every one of them has a price in it and none of them is stated.',
        },
        {
          upTo: 82,
          behaviour:
            'A standing item. Divine attention is a physical condition at this level: omens follow the player around, strangers say things they do not remember saying afterwards, and doors in the mythic world open before they are knocked on, which is not friendliness. The Cut Thread know exactly where they are.',
        },
        {
          upTo: 100,
          behaviour:
            'The blank is Olympian business now. Two factions want the player in custody, one wants them dead as a category error, and one wants to make them a Name. Nobody in this world is going to let them simply be somebody, and every scene from here is somebody arriving with an agenda already formed.',
        },
      ],
    },
    {
      id: 'fray',
      name: 'Fray',
      max: 100,
      start: 15,
      regenPerHour: -0.4,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The absence is quiet. It is still there, it still means no oracle can say a useful word about the player, and nothing in the dark is currently interested in the edges of it.',
      color: '#7B5EA8',
      bands: [
        {
          upTo: 25,
          behaviour:
            'A clean hole. Nothing reads the player and nothing is attracted by it either. Divine power sits on them awkwardly, the way a coat sits on somebody it was not cut for, and works anyway.',
        },
        {
          upTo: 55,
          behaviour:
            'The edges have started to give. Small wrongnesses in the world immediately around the player — a clock that is out, a name they are called that is not theirs, a door that was on the other side of the corridor. Fate-eaters find them within a day rather than within a week.',
        },
        {
          upTo: 80,
          behaviour:
            'Widening, and audible. Things arrive to look at it, several of them entirely uninterested in the player as food. Divine Names sit badly and do things they were not asked to. Anybody standing close to the player for long begins to have small pieces of their own week fail to line up.',
        },
        {
          upTo: 100,
          behaviour:
            'A hole with weather in it. This is where the world stops being able to keep the player in one continuous piece, and the fix is not heroic — it is days of doing nothing in a house with rules, which is the one thing the story keeps refusing to allow.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'phone',
      name: 'Your Phone',
      tags: ['personal'],
      questItem: true,
      droppable: false,
      description: 'Eleven per cent, no signal in about a third of the places you are going to need one, and a camera that produces a completely ordinary photograph of anything mythic you point it at.',
      loreText: 'This is most of why the hidden world stays hidden. Nobody erased anything. It simply does not come out.',
      icon: 'phone',
    },
    {
      id: 'guest_cup',
      name: 'A Cup From The House',
      tags: ['quest', 'xenia'],
      questItem: true,
      description: 'Chipped, ordinary, and handed to you across a threshold by somebody who then said your name. While you are holding it you are a guest, and everything in this world knows what that means.',
      loreText: 'It works anywhere on the Hearth Road and it works exactly once per house. Despina has given out perhaps forty in thirty years and remembers all of them.',
      icon: 'cup',
    },
    {
      id: 'crescent_bow',
      name: 'A Bow With No String',
      tags: ['weapon', 'divine'],
      equipSlot: 'hand',
      skillModifiers: { hunt: 2 },
      description: 'Silver, crescent, and not there until the moment it is. It belongs to a Name rather than to a person, which is why it can be lent and why lending it costs the lender something.',
      loreText: 'Thalia has had it four years. It has never once been in her bag and she still checks the bag.',
      icon: 'bow',
    },
    {
      id: 'blank_slip',
      name: 'The Blank Reading',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { lore: 1 },
      description: 'What comes out of an oracle when they read you: a strip of pressed material that should carry an image, a symbol, a line, a branching. It carries nothing. It is not damaged. It is finished.',
      loreText: 'The oracle who produced it kept the failed attempt, which is against every procedure she has followed for nineteen years, and she has not been able to explain to herself why.',
      icon: 'papers',
    },
    {
      id: 'kyros_letter',
      name: 'A Letter From Kyros',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'Four paragraphs, handwritten, entirely reasonable. It does not threaten anybody, it does not ask for anything, and it contains the clearest explanation of what happened to his sister that exists anywhere.',
      loreText: 'He writes one of these to everybody he intends to recruit. Nine of them survive. Every person who kept theirs eventually joined.',
      icon: 'letter',
    },
    {
      id: 'shears_fragment',
      name: 'A Piece Of The Shears',
      tags: ['quest', 'divine'],
      questItem: true,
      description: 'A shard of something that ends things, small enough to close a hand around and cold in a way that is about time rather than temperature. It severs one thread. It does not distinguish.',
      loreText: 'There were three pieces. Kyros has one, the Council believes it has two, and the Council is wrong about one of those.',
      icon: 'shard',
    },
    {
      id: 'hearth_bread',
      name: 'Bread From The Kitchen',
      tags: ['food'],
      consumable: { resourceId: 'footing', amount: 24, consumesItem: true },
      description: 'Still warm at two in the morning from a kitchen that has never once been closed when somebody needed it open. It is bread. In this world that is a legal instrument.',
      loreText: 'Despina bakes at half past one. She has done for thirty years and has never explained why that hour, and nobody who eats it asks.',
      icon: 'bread',
    },
    {
      id: 'crossroads_coin',
      name: 'A Coin For The Crossroads',
      tags: ['quest', 'divine'],
      questItem: true,
      skillModifiers: { sight: 1 },
      description: 'Old, worn smooth, and the wrong weight for its size. Left at a place where three ways meet, it buys one question, and the answer will be true and will be arranged so that it does not help much.',
      loreText: 'She does not take payment for the answer. She takes it for the asking, which is a distinction she will explain at length and which turns out to matter.',
      icon: 'coin',
    },
  ],
  abilities: [
    {
      id: 'see_it_properly',
      name: 'See It Properly',
      tags: ['sight'],
      description: 'Stop letting your eyes do the thing they have been doing your whole life, and look at what is actually standing in the street.',
      affordances: ['look', 'see', 'watch it', 'what is it', 'examine', 'study it', 'focus', 'read it'],
      costs: [{ resourceId: 'footing', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'sight', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'get_off_the_street',
      name: 'Get Off The Street',
      tags: ['movement'],
      description: 'Stairs, a wall, a fence, a moving train, and a working knowledge of which of those the thing behind you cannot do.',
      affordances: ['run', 'flee', 'climb', 'get away', 'escape', 'move', 'jump', 'get out of there'],
      costs: [{ resourceId: 'footing', amount: 11 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'running', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'put_it_down',
      name: 'Put It Down',
      tags: ['offensive'],
      description: 'Bring down a thing that was not assembled the way anything ought to be assembled, with whatever you are holding.',
      affordances: ['fight', 'attack', 'kill it', 'shoot', 'strike', 'hit it', 'take it down'],
      costs: [
        { resourceId: 'footing', amount: 12 },
        { resourceId: 'notice', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'hunt', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'claim_guest_right',
      name: 'Claim Guest Right',
      tags: ['social'],
      description: 'Cross a threshold, take what is offered, and be a guest, which in this world is not manners. It binds the host and it binds you, and things outside cannot follow you in.',
      affordances: ['ask for shelter', 'claim xenia', 'guest right', 'go inside', 'accept the food', 'invoke hospitality'],
      costs: [{ resourceId: 'footing', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'presence', skillId: 'hospitality', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'work_out_what_it_is',
      name: 'Work Out What It Is',
      tags: ['sight'],
      description: 'Four contradictory accounts, three of which are wrong, and the part they all agree on, which is usually the part that will keep you alive.',
      affordances: ['think', 'remember', 'what do i know', 'recall the myth', 'lore', 'work it out', 'research'],
      costs: [{ resourceId: 'footing', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'lore', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'swear_it',
      name: 'Swear It',
      tags: ['social'],
      description: 'Say the thing in the form that binds, in front of something that will hold you to it. It works. That is the entire problem with it.',
      affordances: ['swear', 'promise', 'give my word', 'make an oath', 'i swear', 'bind myself', 'vow'],
      costs: [{ resourceId: 'footing', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'oath', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ask_a_god',
      name: 'Ask A God',
      tags: ['social'],
      description: 'Get the attention of something enormous and old, on purpose, and ask it for something. It will hear you. It will also remember that you did this.',
      affordances: ['pray', 'call on', 'ask hermes', 'ask hecate', 'summon', 'appeal to', 'invoke', 'ask the god'],
      costs: [
        { resourceId: 'footing', amount: 7 },
        { resourceId: 'notice', amount: 12 },
      ],
      cooldownMinutes: 120,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'oath', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_where_you_are_not_read',
      name: 'Go Where You Are Not Read',
      tags: ['utility'],
      description: 'Use the hole. Walk past a thing that was set to stop a person with a thread, stand in a prophecy that has no room for you, and be somewhere nobody arranged for you to be.',
      affordances: ['use the blank', 'slip past', 'they cannot see me', 'walk through', 'go where i should not', 'exploit it'],
      costs: [
        { resourceId: 'footing', amount: 9 },
        { resourceId: 'fray', amount: 13 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'sight', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'sit_still_somewhere_safe',
      name: 'Sit Still Somewhere Safe',
      tags: ['healing'],
      description: 'A house with rules in it, a kitchen, and three days of nothing happening. It is the only thing that closes the edges and there is never time for it.',
      affordances: ['rest', 'stay put', 'sit down', 'take a day', 'stop for a while', 'recover', 'sleep'],
      costs: [{ resourceId: 'footing', amount: 2 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'wear_the_name',
      name: 'Wear The Name',
      tags: ['offensive'],
      description: 'Take a god’s Name and use it, which for a Bearer is a fit and for somebody with no thread underneath is a coat over nothing. It works. It costs a great deal more than it does for anybody else.',
      affordances: ['use the epithet', 'invoke the name', 'transform', 'call the power', 'wear it', 'use my name'],
      costs: [
        { resourceId: 'footing', amount: 16 },
        { resourceId: 'fray', amount: 20 },
        { resourceId: 'notice', amount: 10 },
      ],
      cooldownMinutes: 480,
      targetRule: 'SELF',
      check: { attribute: 'arcana', skillId: 'oath', baseDc: 16 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:you_carry_a_name'],
        lockedCopy: 'Nobody has given you one, and taking a Name that has not been granted is a thing this world has words for and no survivors of.',
      },
    },
  ],
  locations: [
    {
      id: 'monastiraki_platform',
      name: 'Platform Two',
      shortName: 'Platform Two',
      description:
        'The open-air platform at the interchange with the flea market above it and the ancient road visible through glass at the far end. Eleven forty-three at night, about forty people waiting, and a train arriving six minutes early with something standing on the roof of it.',
      artDirection:
        'Athens metro platform at night, open to the sky, tiled and modern with a lit archaeological excavation visible through glass at one end, a train pulling in, scattered late commuters. Ordinary, fluorescent, one wrong detail.',
      connections: [{ to: 'monastiraki_streets', travelMinutes: 3, label: 'Up into the square' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [],
    },
    {
      id: 'monastiraki_streets',
      name: 'The Square And The Lanes',
      shortName: 'Monastiraki',
      description:
        'A square with a mosque, a church and a ruin in it, four bars still going, and a warren of lanes behind full of shuttered stalls, cats, and a smell of grilled meat that does not stop until about four. Everything here is within eleven metres of something two thousand years old.',
      artDirection:
        'Athens flea-market lanes at night, shuttered stalls and hanging goods, a floodlit rock rising above the rooftops beyond, cats, late tavernas with plastic chairs. Warm, crowded, layered.',
      connections: [
        { to: 'monastiraki_platform', travelMinutes: 3, label: 'Down to the platform' },
        { to: 'to_xenon', travelMinutes: 6, label: 'Three streets, and a door' },
        { to: 'plaka_rooftops', travelMinutes: 5, label: 'Up' },
        { to: 'the_kerameikos', travelMinutes: 12, label: 'West, past the metalworkers' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'to_xenon',
      name: 'To Xenon',
      shortName: 'The House',
      description:
        'A narrow guesthouse with a kitchen that has never been shut when somebody needed it open. Mismatched tables, forty years of photographs, travellers at two in the morning, and about a third of the people eating are not people. Nothing outside can come through that door uninvited.',
      artDirection:
        'Small late-night Athenian guesthouse taverna interior, mismatched wooden tables, walls of old photographs, an open kitchen hatch with steam, a mixed crowd including one or two figures who are subtly wrong. Warm, safe, deeply lived-in.',
      connections: [
        { to: 'monastiraki_streets', travelMinutes: 6, label: 'Back out into the lanes' },
        { to: 'the_crossroads', travelMinutes: 14, label: 'Out to where three ways meet' },
        { to: 'piraeus_road', travelMinutes: 22, label: 'Down to the port road' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'hearth_bread', qty: 3, ownerId: 'despina', aka: ['bread', 'food', 'something to eat', 'the loaf'] },
        { itemId: 'guest_cup', qty: 1, ownerId: 'despina', aka: ['the cup', 'a cup', 'guest cup'] },
      ],
    },
    {
      id: 'plaka_rooftops',
      name: 'The Roofs Under The Rock',
      shortName: 'Roofs',
      description:
        'Flat concrete roofs with water tanks and washing lines, stepping up the slope towards the floodlit rock, so that a person can cross four streets without touching the ground and be looked down on the whole way by a building that has been there for two and a half thousand years.',
      artDirection:
        'Athenian rooftops at night stepping up a hillside, solar water tanks and washing lines, a great floodlit ancient citadel above them, the city lights spreading below. Vertical, silvered, mythic without trying.',
      connections: [
        { to: 'monastiraki_streets', travelMinutes: 5, label: 'Down into the lanes' },
        { to: 'the_slope', travelMinutes: 8, label: 'Up towards the rock' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'the_slope',
      name: 'The Slope',
      shortName: 'Slope',
      description:
        'The path round the base of the rock, worn to a shine by three million pairs of feet a year, closed at night and entirely walkable if you know which gate does not lock. There are older things than the temple up there and one of them has a shrine the size of a shoebox.',
      artDirection:
        'Marble-worn path around the base of the Acropolis at night, pines and dry scrub, the lit temple above, the closed gate, a tiny ancient niche shrine in a rock face. Quiet, ancient, faintly watched.',
      connections: [
        { to: 'plaka_rooftops', travelMinutes: 8, label: 'Back down to the roofs' },
        { to: 'the_council_chamber', travelMinutes: 6, lockedByFlag: 'knows:the_council', label: 'A door in the rock that is not a tourist entrance' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 1 },
      takeableItems: [],
    },
    {
      id: 'the_kerameikos',
      name: 'The Old Burying Ground',
      shortName: 'Kerameikos',
      description:
        'Eleven acres of grave markers and foundations below street level, with a stream running through it and tortoises in the grass. The dead here have been dead so long they are archaeology. Something about the boundary is thin, and everybody in the hidden world knows which corner.',
      artDirection:
        'Ancient Athenian cemetery excavation at night, sunken among modern buildings, marble grave stelae and cut foundations, long grass, a small stream, city traffic visible above the rim. Peaceful, sunken, liminal.',
      connections: [
        { to: 'monastiraki_streets', travelMinutes: 12, label: 'Back east to the lanes' },
        { to: 'the_crossroads', travelMinutes: 9, label: 'Out to the three ways' },
        { to: 'the_way_down', travelMinutes: 7, lockedByFlag: 'knows:the_way_down', label: 'The corner where it is thin' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_crossroads',
      name: 'Where Three Ways Meet',
      shortName: 'Crossroads',
      description:
        'A junction on the edge of the city where an old road, a new road and a track that is not on any map come together. There is a niche in a wall with a shoebox shrine in it, a dish, and somebody’s dinner left out three nights a week.',
      artDirection:
        'Three-way junction at the edge of Athens at night, one modern road, one old paved way, one dirt track, a small niche shrine in a wall with offerings and a bowl, a single street light. Still, unglamorous, charged.',
      connections: [
        { to: 'to_xenon', travelMinutes: 14, label: 'Back into the city' },
        { to: 'the_kerameikos', travelMinutes: 9, label: 'To the burying ground' },
        { to: 'delphi_road', travelMinutes: 45, label: 'North-west, three hours' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 0 },
      takeableItems: [
        { itemId: 'crossroads_coin', qty: 1, ownerId: null, aka: ['the coin', 'a coin', 'the offering'] },
      ],
    },
    {
      id: 'piraeus_road',
      name: 'The Port Road',
      shortName: 'Piraeus',
      description:
        'Container cranes, ferry gates, and eleven thousand people a day going to islands. It is the largest boundary in the country — leaving and staying, arriving and being from somewhere — which makes it useful to a particular kind of person and a particular kind of thing.',
      artDirection:
        'Piraeus port at dawn, ferry ramps and container cranes, crowds with luggage, gulls, hard flat light off water. Industrial, transitional, enormous.',
      connections: [
        { to: 'to_xenon', travelMinutes: 22, label: 'Back up into Athens' },
        { to: 'the_cut_thread_house', travelMinutes: 11, lockedByFlag: 'knows:where_they_meet', label: 'A warehouse with the wrong number on it' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'the_cut_thread_house',
      name: 'The Warehouse',
      shortName: 'Cut Thread',
      description:
        'Forty people who all have a version of the same story, a kitchen, a crèche, and a wall with about nine hundred names on it — every one of them somebody who was told what they were going to do before they had done it. It is not a cell. It is a support group with a relic in the office.',
      artDirection:
        'Converted port warehouse interior, communal tables and a children’s corner, a long wall covered in handwritten names, string lights, a small locked office at the back. Warm, organised, unsettlingly reasonable.',
      connections: [{ to: 'piraeus_road', travelMinutes: 11, label: 'Back out to the port' }],
      discoveredByDefault: false,
      mapPosition: { x: -2, y: 2 },
      takeableItems: [
        { itemId: 'kyros_letter', qty: 1, ownerId: 'kyros', aka: ['the letter', 'his letter', 'four paragraphs'] },
      ],
    },
    {
      id: 'the_council_chamber',
      name: 'The Chamber In The Rock',
      shortName: 'Council',
      description:
        'Cut into the hill below the temple, older than the temple, and used continuously since. Eleven seats, six of them filled, and a body that has been quietly administering the mythic world since before there was a country to administer it in.',
      artDirection:
        'Ancient rock-cut chamber under a hillside, eleven stone seats in a semicircle, modern lighting rigged crudely into two-thousand-year-old niches, files and a laptop on a stone shelf. Formal, bureaucratic, very old.',
      connections: [{ to: 'the_slope', travelMinutes: 6, label: 'Back up to the path' }],
      discoveredByDefault: false,
      mapPosition: { x: 3, y: 1 },
      takeableItems: [],
    },
    {
      id: 'delphi_road',
      name: 'The Road To Delphi',
      shortName: 'The Road',
      description:
        'Three hours north-west through mountains, past a service station where the coffee is genuinely excellent, and up into a valley of olive terraces below a cliff with two enormous rocks in it. People have been coming this way for a specific reason for about three thousand years.',
      artDirection:
        'Greek mountain road at dawn, olive terraces below tall grey cliffs, a lone car, mist in the valley, the sea a long way off. Sweeping, austere, expectant.',
      connections: [
        { to: 'the_crossroads', travelMinutes: 45, label: 'Back towards Athens' },
        { to: 'delphi_sanctuary', travelMinutes: 12, label: 'Up to the sanctuary' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -3, y: -1 },
      takeableItems: [],
    },
    {
      id: 'delphi_sanctuary',
      name: 'The Sanctuary',
      shortName: 'Delphi',
      description:
        'Terraces of foundations climbing a mountainside, a theatre, a stadium at the top, and a stone that was once considered the centre of the world by people who were not being metaphorical. Underneath it, something is still working.',
      artDirection:
        'Delphi archaeological sanctuary on a steep mountainside at first light, terraced ruins and a theatre, tall grey cliffs above, a valley of olives below, a carved conical stone. Vertiginous, sacred, matter-of-fact.',
      connections: [
        { to: 'delphi_road', travelMinutes: 12, label: 'Back down to the road' },
        { to: 'the_loom', travelMinutes: 20, lockedByFlag: 'knows:the_way_down', label: 'Down, a long way' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -3, y: -2 },
      takeableItems: [
        { itemId: 'blank_slip', qty: 1, ownerId: 'eirene', aka: ['the reading', 'my reading', 'the slip', 'the blank one'] },
      ],
    },
    {
      id: 'the_way_down',
      name: 'The Thin Corner',
      shortName: 'The Way Down',
      description:
        'A stair that is not in any plan, going down from a corner of the old burying ground, dry and warm and entirely silent. It is the shortest route to several places nobody has a map of, including one of them.',
      artDirection:
        'Ancient cut stair descending into rock from a cemetery corner, worn treads, no light source but the walls faintly visible, absolute silence implied. Narrow, dry, wrong.',
      connections: [
        { to: 'the_kerameikos', travelMinutes: 7, label: 'Back up into the grass' },
        { to: 'the_loom', travelMinutes: 30, label: 'Further down than seems reasonable' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: -1, y: -1 },
      takeableItems: [],
    },
    {
      id: 'the_loom',
      name: 'The Loom',
      shortName: 'The Loom',
      description:
        'Not a machine and not a room. A place where everything alive is present at once as a length of something, arranged in an order that is obviously an order and is not one anybody can describe afterwards. There is a gap in it about the size of a person.',
      artDirection:
        'Impossible vast interior space of countless luminous threads receding in every direction, no floor or ceiling readable, one visible absence like a missing stitch, scale entirely unclear. Overwhelming, silent, mathematical.',
      connections: [
        { to: 'the_way_down', travelMinutes: 30, label: 'Back up, if it is still there' },
        { to: 'delphi_sanctuary', travelMinutes: 20, label: 'Up into the olives' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: -2, y: -2 },
      takeableItems: [
        { itemId: 'shears_fragment', qty: 1, ownerId: null, aka: ['the shard', 'the shears', 'the piece', 'the fragment'] },
      ],
    },
  ],
  factions: [
    {
      id: 'faction_council',
      name: 'The Council',
      description: 'Eleven stone seats under the rock, six of them filled, administering the hidden world since before there was a country. Decent people, an accumulated procedure, and a two-thousand-year habit of using prophecy as evidence before anybody has acted.',
      startingReputation: 0,
      ranks: [
        { atReputation: -40, label: 'A file with a number' },
        { atReputation: 0, label: 'An anomaly' },
        { atReputation: 35, label: 'Heard in the chamber' },
        { atReputation: 70, label: 'Given a seat at the table' },
      ],
      allies: ['faction_olympus'],
      enemies: ['faction_cut_thread'],
    },
    {
      id: 'faction_olympus',
      name: 'Olympus',
      description: 'Not a place with a gate. A dozen enormous old things with agendas, histories with each other, and Names they can lend, who are extremely interested in a person their instruments cannot read.',
      startingReputation: 0,
      ranks: [
        { atReputation: -40, label: 'A category error' },
        { atReputation: 0, label: 'Curious' },
        { atReputation: 35, label: 'Owed a favour' },
        { atReputation: 70, label: 'Offered a Name' },
      ],
      allies: ['faction_council'],
      enemies: [],
    },
    {
      id: 'faction_hearth',
      name: 'The Hearth Road',
      description: 'Hosts, in about forty towns, who keep the oldest rule in the world: a guest across a threshold gets food, safety and the truth about what is outside. It has no leadership and it has never once failed.',
      startingReputation: 10,
      ranks: [
        { atReputation: -40, label: 'Not received' },
        { atReputation: 0, label: 'A stranger at the door' },
        { atReputation: 35, label: 'A guest' },
        { atReputation: 70, label: 'A house of your own on the road' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_cut_thread',
      name: 'The Cut Thread',
      description: 'Forty people in a warehouse with the same story, a wall of nine hundred names, a crèche, and a relic in the office. They believe no child should be told the shape of their tragedy, and they are not entirely wrong.',
      startingReputation: 0,
      ranks: [
        { atReputation: -40, label: 'One of theirs' },
        { atReputation: 0, label: 'Somebody who has not been asked yet' },
        { atReputation: 35, label: 'Sent a letter' },
        { atReputation: 70, label: 'Trusted with the office' },
      ],
      allies: [],
      enemies: ['faction_council'],
    },
  ],
  characters: [
    {
      id: 'thalia',
      name: 'Thalia Kyrkos',
      role: 'Twenty-one, a monster hunter who carries one of Artemis’s Names, and the first person to find out you can see any of this',
      cardBlurb:
        'She is on that platform because something has been eating threads across three districts and she has been tracking it for a week. Her father was imprisoned on a prophecy for a thing he never did, which is why she is going to keep asking what you actually intend rather than what you are supposed to.',
      pronouns: 'she/her',
      publicTraits: ['Moving before the sentence finishes', 'Puts a body between a stranger and a monster automatically', 'Complains, at length, while doing the thing'],
      hiddenDrives: [
        'She wants to be good enough that nobody can ever reduce her family to a sentence again, and knows that is not a thing skill can buy',
        'She agrees with more of Kyros than she can say out loud to anybody, including herself',
      ],
      values: [
        'Getting the bystanders out first, before anything else, including winning',
        'Letting somebody prove what they are rather than being told in advance',
      ],
      fears: [
        'That she is going to end up saying the thing the Council said about her father, about somebody else',
        'Being the only one left who thinks people should get to choose, which is a lonely position and she is nearly in it',
      ],
      socialStyle:
        'Talks fast, decides faster, and explains afterwards if there is time. Physically direct — grabs an arm, points, pulls somebody behind her. Asks blunt personal questions in the middle of a crisis because that is when she thinks of them.',
      boundaries: [
        'Will not let anybody be punished for a thing they have not done, and this is the whole of her, not a preference',
        'Will not leave a civilian in a street to chase something, and has lost a target over it twice this year',
      ],
      goals: [
        'Find out why fate-eating things are coming into Athens in numbers',
        'Prove that she is more than what an oracle would have said about her, which she is aware is a slightly ridiculous way to live',
      ],
      secrets: [
        {
          id: 'thalia_the_offer',
          fact: 'Kyros offered her a place in the Cut Thread two years ago. She thought about it for three days before she said no, and she has never told anybody about the three days.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it when somebody defends Kyros’s reasoning in front of her and she finds herself not arguing.',
        },
        {
          id: 'thalia_her_father',
          fact: 'Andreas Kyrkos was imprisoned on an oracle’s word, the sanctuary was attacked anyway while he was in custody, and he died in there without anybody ever proving he would have done it.',
          visibility: 'FACTION',
          revealHint: 'She gives the facts flatly to anybody who asks why she cares about this so much, and the flatness is the tell.',
        },
      ],
      speechStyle:
        'Fast, clipped and physical, with the sarcasm arriving in the middle of an emergency rather than after it. Gives instructions in twos — do this, then this. Explains nothing until the thing is over and then explains all of it at once, badly, out of order.',
      topics: ['the thing on the roof', 'her father', 'Kyros', 'the Council', 'the Name she carries', 'why it is following you'],
      voiceSamples: [
        'Great. Hate that. Run — left, not the stairs, the stairs are a funnel and it is faster than you.',
        'You want the version where I sound reasonable or the version where I have been awake for two days? Because they are quite different and only one of them is accurate.',
        'They put my father away for something an oracle said he was going to do. He never did it. He never got the chance to not do it either, and that is the part nobody at the Council will say out loud.',
        'Nobody gets locked up for a thing they have not done. Not by me, not in front of me, not once. That is the whole rule and I do not have another one.',
      ],
      appearance:
        'Twenty-one, long dark brown hair tied high when there is anything happening, olive skin, bright grey-green eyes, black and forest-green streetwear, silver crescent earrings and boots that have done a great deal of running.',
      visualHook: 'Small silver crescent earrings that catch the light a half-second before the bow appears.',
      silhouette: 'Half-turned, one arm out behind her keeping somebody back, weight already on the front foot.',
      artSeed: 'bp-thalia-01',
      portrait: null,
      expressions: ['neutral', 'wry', 'urgent', 'furious', 'unguarded'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'plaka_rooftops', activity: 'up on the roofs, working the third district again' },
        { startMinute: 300, endMinute: 660, locationId: 'to_xenon', activity: 'asleep in the back room, boots still on' },
        { startMinute: 660, endMinute: 960, locationId: 'monastiraki_streets', activity: 'the lanes, asking people who will not admit they saw anything' },
        { startMinute: 960, endMinute: 1320, locationId: 'to_xenon', activity: 'the kitchen table, a map, and an argument with Despina about eating' },
        { startMinute: 1320, endMinute: 1440, locationId: 'monastiraki_platform', activity: 'the platform, on the seventh night of following one thing' },
      ],
      homeLocationId: 'to_xenon',
      knowledgeScope: ['thalia', 'the_hunt', 'agrotera', 'her_father', 'the_council', 'kyros'],
      startingRelationship: { trust: 25, affection: 15, respect: 20, fear: 0, rivalry: 10 },
      gates: [
        { id: 'thalia_stops_managing_you', label: 'She tells you what she actually thinks of the Council', kind: 'TRUST', requires: { trust: 50, flagsSet: ['spoke:thalia'] } },
        { id: 'thalia_lends_the_bow', label: 'She puts the bow in your hands', kind: 'ALLIANCE', requires: { trust: 68, respect: 65 } },
        { id: 'thalia_closer', label: 'Neither of them is calling it working together', kind: 'ROMANCE', requires: { trust: 72, affection: 70 } },
      ],
      attributes: { might: 12, agility: 17, mind: 13, presence: 13, resolve: 15, arcana: 13 },
      companion: null,
      scouting: {
        learnRate: 1.3,
        cap: 7,
        revealCopy: 'She is already at the corner. "You go up," she says. "Every single time, you go up. I have started just waiting on roofs."',
      },
      combatant: { health: 55, defenseDc: 16, damage: 11, tags: ['bearer', 'agrotera'] },
    },
    {
      id: 'kyros',
      name: 'Kyros Argyros',
      role: 'Twenty-seven, the hero who survived his own prophecy, and the man who has spent four years proving that being told your future is what causes it',
      cardBlurb:
        'He was told at seventeen that he would kill his sister before he was twenty-four. He spent six years preventing it and every single thing he did to prevent it is what made it happen. He wants to meet you because you are the first evidence he has ever had that the machinery can be beaten.',
      pronouns: 'he/him',
      publicTraits: ['Never raises his voice, at all, in any circumstance', 'Builds an argument in numbered steps and lets you interrupt', 'Remembers what everybody in the warehouse is called and what happened to them'],
      hiddenDrives: [
        'He needs to be right about the mechanism, because the alternative is that he simply killed his sister',
        'He has begun to suspect the Loom does more than predict, and has decided not to find out before he acts',
      ],
      values: [
        'Nobody being told the shape of their tragedy before they are old enough to choose a breakfast',
        'The forty people in that warehouse, individually, whose names are on the wall behind them',
      ],
      fears: [
        'That the Shears do something other than what he needs them to do, which he has half worked out',
        'Becoming the thing that decides other people’s lives for them, which he can feel happening and cannot stop',
      ],
      socialStyle:
        'Warm, unhurried and genuinely interested in the objection. Answers the strongest version of what you said rather than what you said. Never pressures anybody and has recruited nine people that way.',
      boundaries: [
        'Will not recruit somebody who has not read the letter, in full, including the part about what he did',
        'Will not lie about Mara, ever, to anybody, including to make himself easier to like',
      ],
      goals: [
        'Get the last piece of the Shears and get into the Loom',
        'Establish whether a person with no thread can act in a way prophecy did not shape, because that is his entire thesis in one body',
      ],
      secrets: [
        {
          id: 'kyros_the_third_piece',
          fact: 'The Council believes it holds two fragments of the Shears. It holds one. He has had the other for eleven months and has told nobody in his own organisation.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells the player himself, early, as a demonstration that he is not going to manage them.',
        },
        {
          id: 'kyros_what_he_suspects',
          fact: 'He has read enough to suspect the Loom holds continuity between the living, the dead and divine promises, and that cutting every thread would not only free people. He has decided to act anyway.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it, without defending it, to somebody who puts the argument to him properly rather than calling him a monster.',
        },
      ],
      speechStyle:
        'Calm, structured and conversational. Lays out a case in explicit steps — first this, then this, therefore — and pauses for the objection each time. Says his sister’s name in an ordinary voice, which is the most unsettling thing about him. Never persuades by pressure and never once sounds triumphant.',
      topics: ['Mara', 'the mechanism', 'the Shears', 'the wall of names', 'what the Council did', 'you'],
      voiceSamples: [
        'An oracle says a thing. People act because they have been told. Those actions produce the thing. Everybody calls that proof the oracle was right. I would like you to find the flaw in that, genuinely, because I have been looking for six years.',
        'Mara asked me to. That is the part nobody includes when they tell it. She was on the floor and she asked me to and I did it, and the divine world called it inevitability, which is a way of saying I was never there at all.',
        'I am not going to press you. Read the letter, all of it, including the last page, and then do not come, if that is what you want.',
        'There are nine hundred names on that wall. Every one of those people was handed a sentence about themselves before they had done anything. The youngest was six.',
      ],
      appearance:
        'Twenty-seven, dark, close-cropped, plain clothes chosen for not being noticed, a jaw that has been broken once, and a stillness in the hands that costs him visible effort to maintain.',
      visualHook: 'A thin faded scar across the inside of the right forearm, the same shape as a grip.',
      silhouette: 'Seated on a plastic chair, forward, forearms on his knees, entirely at ease.',
      artSeed: 'bp-kyros-01',
      portrait: null,
      expressions: ['neutral', 'engaged', 'grave', 'warm', 'undone'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'the_cut_thread_house', activity: 'the office at the back, awake, with the door open' },
        { startMinute: 330, endMinute: 480, locationId: 'the_cut_thread_house', activity: 'two and a half hours of sleep on a mattress in the main room' },
        { startMinute: 480, endMinute: 900, locationId: 'the_cut_thread_house', activity: 'the warehouse, and forty people who need things from him' },
        { startMinute: 900, endMinute: 1200, locationId: 'piraeus_road', activity: 'the port, meeting somebody who does not want to be met' },
        { startMinute: 1200, endMinute: 1440, locationId: 'the_cut_thread_house', activity: 'back at the wall, adding a name' },
      ],
      homeLocationId: 'the_cut_thread_house',
      knowledgeScope: ['kyros', 'mara', 'the_shears', 'the_cut_thread', 'the_loom', 'the_council'],
      startingRelationship: { trust: 15, affection: 0, respect: 25, fear: 15, rivalry: 30 },
      gates: [
        { id: 'kyros_tells_you_about_mara', label: 'He tells you the whole of it, including the last part', kind: 'TRUST', requires: { trust: 45, flagsSet: ['spoke:kyros'] } },
        { id: 'kyros_shows_you_the_piece', label: 'He shows you the fragment nobody knows he has', kind: 'TRUST', requires: { trust: 62, respect: 60 } },
      ],
      attributes: { might: 14, agility: 14, mind: 17, presence: 16, resolve: 18, arcana: 14 },
      companion: null,
      scouting: {
        learnRate: 1.5,
        cap: 8,
        revealCopy: 'He has already answered it. "You go for the reasonable objection first," he says, without any edge in it. "It is a good habit. I had it too."',
      },
      combatant: { health: 75, defenseDc: 18, damage: 13, tags: ['bearer', 'cut-thread'] },
    },
    {
      id: 'hecate',
      name: 'Hecate',
      role: 'The one whose whole domain is the place between things, met at a junction on the edge of Athens with a shoebox shrine in a wall',
      cardBlurb:
        'She is at the crossroads most nights and has been for a very long time. She will answer one of your questions truly and will not arrange the answer for your convenience, and she is the only power in this story who finds what you are interesting rather than alarming.',
      pronouns: 'she/her',
      publicTraits: ['Present at junctions and almost nowhere else', 'Answers exactly the question asked', 'Takes payment for the asking rather than the answer'],
      hiddenDrives: [
        'She is curious about the blank in a way she has not been curious about anything in four hundred years, and is being careful not to show it',
        'She would like one of the newer ones to survive contact with the Council, and has no mechanism for wanting that either',
      ],
      values: [
        'The boundary itself. Doorways, thresholds, junctions and dusk, which she regards as the only honest parts of anything',
        'An exact bargain, exactly kept, on both sides',
      ],
      fears: [
        'The Loom failing, which would make every boundary in the world the same boundary',
        'Being the last of the old ones anybody still leaves a dish out for',
      ],
      socialStyle:
        'Entirely unhurried and entirely literal. States the conditions before the transaction and never revises them. Comfortable with silences of any length and will outlast anybody in one.',
      boundaries: [
        'Will not answer a question that was not asked, however obviously the asker needed it',
        'Will not accept payment from somebody who does not understand what they are paying for, and will explain until they do',
      ],
      goals: [
        'Establish what is standing at her crossroads, since it is neither one thing nor another and that is her entire field',
        'Keep the boundaries working, which she has done without thanks or instruction since before the language',
      ],
      secrets: [
        {
          id: 'hecate_the_gap',
          fact: 'She can see the gap in the Loom from a crossroads, which nobody else can, and she has been watching it not close for eleven years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it plainly in answer to a question about herself, which almost nobody thinks to ask her.',
        },
        {
          id: 'hecate_the_name',
          fact: 'She holds a Name that has had no bearer for six hundred years, and she has been waiting for somebody it would not kill.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She offers it rather than mentioning it, and the offer comes with the conditions stated in full and in advance.',
        },
      ],
      speechStyle:
        'Slow, exact and conditional. Everything is stated as a term: if you do this, then that will be true. Never uses a metaphor and never softens anything. Refers to enormous things — the dead, the boundary, the length of time she has been standing here — in the same register as the weather.',
      topics: ['the crossroads', 'the gap', 'the terms', 'what is between things', 'the Name she is holding', 'the dead'],
      voiceSamples: [
        'You may ask one thing. The answer will be true. It will not be arranged for your convenience, and you will not be told that again.',
        'I have stood at this junction since it was two goat tracks and a stone. The stone is still here. It is in the wall behind you and somebody has painted it.',
        'There is a gap where you are. I can see it from here, which is not a thing I can do with anybody else, and it has not closed in eleven years.',
        'The payment is for the asking. Not for the answer. If you do not understand the difference, do not put the coin down yet, and I will wait.',
      ],
      appearance:
        'Appears as a woman of no settled age in ordinary dark clothes, standing at the junction with her back to the wall shrine, entirely still, and with a stray dog sitting against her leg that nobody else has ever been able to touch.',
      visualHook: 'A stray dog against her leg, at every crossroads, and never the same dog.',
      silhouette: 'Standing with her back to a wall at a three-way junction, unmoving, one animal at her feet.',
      artSeed: 'bp-hecate-01',
      portrait: null,
      expressions: ['neutral', 'attentive', 'exact', 'curious', 'grave'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_crossroads', activity: 'at the junction, as she is most nights' },
        { startMinute: 420, endMinute: 1080, locationId: 'the_way_down', activity: 'below the burying ground, on the other side of the boundary' },
        { startMinute: 1080, endMinute: 1440, locationId: 'the_crossroads', activity: 'back at the junction from dusk' },
      ],
      homeLocationId: 'the_crossroads',
      knowledgeScope: ['hecate', 'the_crossroads', 'the_boundary', 'the_dead', 'the_loom', 'names'],
      startingRelationship: { trust: 15, affection: 0, respect: 20, fear: 20, rivalry: 0 },
      gates: [
        { id: 'hecate_answers', label: 'She answers one question truly', kind: 'OTHER', requires: { respect: 30, hasItems: ['crossroads_coin'] } },
        { id: 'hecate_offers_the_name', label: 'She offers the Name nobody has carried in six hundred years', kind: 'OTHER', requires: { respect: 65, trust: 55 } },
      ],
      attributes: { might: 14, agility: 13, mind: 18, presence: 17, resolve: 18, arcana: 20 },
      companion: null,
      scouting: null,
      combatant: { health: 120, defenseDc: 22, damage: 18, tags: ['divine'] },
    },
    {
      id: 'hermes',
      name: 'Hermes',
      role: 'The one who turns up because he is curious, wants something, and is completely upfront about both',
      cardBlurb:
        'He found out about you within a day and he came to look, because a person the machinery cannot read is the single most interesting object to appear in his line of work in about nine hundred years. He will help you. He will also tell you exactly what it costs, and he will not haggle down.',
      pronouns: 'he/him',
      publicTraits: ['Arrives already mid-conversation', 'Prices everything, out loud, cheerfully', 'Turns up in transit spaces and nowhere else worth mentioning'],
      hiddenDrives: [
        'He wants a Name of his own that belongs to this century rather than to the last twenty, and has noticed that a blank could make one',
        'He likes the player, quite quickly, which is professionally inconvenient and which he is managing by being brisker',
      ],
      values: [
        'A deal stated clearly and kept exactly, which he regards as the actual sacred thing rather than any of the rest of it',
        'Movement. Roads, borders, messages, the last train, and everybody who is between where they were and where they are going',
      ],
      fears: [
        'Becoming an old god that nobody has a modern use for, which he can already feel starting',
        'The Loom going, which would take every promise in the world with it including all of his',
      ],
      socialStyle:
        'Fast, delighted and entirely transactional, in a way that is somehow not cold. States his price before you ask, argues himself down slightly, and is scrupulous about the terms afterwards.',
      boundaries: [
        'Will not break a stated deal, at any price, for anybody, which is the whole of his reputation and most of his power',
        'Will not carry a message he has not been told the contents of, and says so before taking it',
      ],
      goals: [
        'Find out what a blank actually is, before the Council decides and forecloses it',
        'Be the god who was standing next to the interesting thing when it happened, which is most of his career strategy',
      ],
      secrets: [
        {
          id: 'hermes_the_new_name',
          fact: 'He has been quietly cultivating a modern Name for about ninety years — of the last train, of the terminal, of the border queue — and it has never quite set. A blank could set it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it when somebody asks him what he is getting out of this, because he does not lie about terms.',
        },
        {
          id: 'hermes_the_council_vote',
          fact: 'The Council has already voted once about the player, informally, and lost by one. He was told, he is not supposed to know, and he is deciding what to do with it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He sells it, at a stated price, and the price is small and specific and turns out to matter later.',
        },
      ],
      speechStyle:
        'Quick, warm and mercantile, with modern idiom used a half-beat wrong on purpose, as somebody who has been picking up new slang for three thousand years and enjoys it. Names his price mid-sentence. Compliments people by telling them what they are worth to him.',
      topics: ['what it costs', 'the Council', 'the last train', 'his new Name', 'what you are', 'the roads'],
      voiceSamples: [
        'Right. Here is the price, stated up front, because I do not do the other thing: one favour, unspecified, called in once, and I tell you now that I will call it in at the worst possible moment because that is when a favour is worth anything.',
        'Everybody who is between one place and another belongs to me. Airports. Border queues. That bit at the end of a platform. It is a bigger portfolio than it used to be and I am not complaining.',
        'They voted about you. Informally, so it does not exist, and they lost by one. I am not supposed to have that. Two euros and a straight answer about something and it is yours.',
        'You are the most interesting thing to happen to my job since printing. I want you to understand that I am saying that as a compliment and also as a valuation.',
      ],
      appearance:
        'Appears as a man in his thirties in whatever the street is wearing, with a courier bag he does not need, extremely good shoes, and a habit of being three metres closer than he was a moment ago without anybody registering the intervening movement.',
      visualHook: 'Absurdly good shoes, always, whatever the rest of the outfit is doing.',
      silhouette: 'Leaning against something at the end of a platform with his ankles crossed and both hands in his pockets.',
      artSeed: 'bp-hermes-01',
      portrait: null,
      expressions: ['neutral', 'delighted', 'calculating', 'serious', 'caught out'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'monastiraki_streets', activity: 'the lanes, being where people who are between things are' },
        { startMinute: 360, endMinute: 780, locationId: 'piraeus_road', activity: 'the ferry gates, at the busiest hours, entirely in his element' },
        { startMinute: 780, endMinute: 1080, locationId: 'delphi_road', activity: 'the road, because it is a road' },
        { startMinute: 1080, endMinute: 1440, locationId: 'monastiraki_streets', activity: 'back in the lanes for the late trains' },
      ],
      homeLocationId: 'monastiraki_streets',
      knowledgeScope: ['hermes', 'the_council', 'names', 'the_roads', 'olympus', 'deals'],
      startingRelationship: { trust: 25, affection: 30, respect: 25, fear: 10, rivalry: 0 },
      gates: [
        { id: 'hermes_makes_a_deal', label: 'He states a price and means it', kind: 'OTHER', requires: { respect: 35, flagsSet: ['spoke:hermes'] } },
        { id: 'hermes_tells_you_about_the_vote', label: 'He sells you what the Council did', kind: 'TRUST', requires: { trust: 55, respect: 50 } },
      ],
      attributes: { might: 12, agility: 20, mind: 18, presence: 18, resolve: 15, arcana: 19 },
      companion: null,
      scouting: null,
      combatant: { health: 110, defenseDc: 21, damage: 15, tags: ['divine'] },
    },
    {
      id: 'despina',
      name: 'Despina Vlahos',
      role: 'Keeps a guesthouse where the kitchen has never been shut when somebody needed it open, and has kept the oldest rule in the world for thirty years',
      cardBlurb:
        'She will feed you before she asks you anything, and once you have taken it, nothing outside can come through her door after you. She has been doing this for thirty years, she knows what most of her guests are, and she has never once made a fuss about any of it.',
      pronouns: 'she/her',
      publicTraits: ['Bakes at half past one and has never explained the hour', 'States the rules once, flatly, on the way in', 'Has never asked a guest what they are'],
      hiddenDrives: [
        'She wants the road to outlast her, and has no successor and will not raise it with anybody',
        'She would like, once, for one of them to come back afterwards and tell her how it went',
      ],
      values: [
        'The rule, absolutely and without interpretation. Food, safety and the truth about what is outside',
        'Feeding people, which she considers the practical half of the rule and the only half that is any work',
      ],
      fears: [
        'Being the host who breaks it, which she has seen happen to somebody and which is not survivable',
        'The Hearth Road ending with her, which she has calculated is about eleven years away',
      ],
      socialStyle:
        'Domestic, brisk and entirely unsentimental. Issues instructions about sitting down and eating and does not repeat them. Says the enormous thing while carrying plates and does not stop carrying the plates.',
      boundaries: [
        'Will not have a fight in her house, of any kind, by anybody, and has removed things much larger than a person over it',
        'Will not tell a guest a comfortable lie about what is outside, because that is the specific part of the rule that has teeth',
      ],
      goals: [
        'Keep the door open, which is the whole of it, most nights',
        'Find somebody to give the house to, which she has been not doing anything about for four years',
      ],
      secrets: [
        {
          id: 'despina_what_she_is',
          fact: 'She is entirely ordinary. No Name, no bearer, no divine anything. Thirty years of keeping a rule is what makes the door work, and she has let several people assume otherwise.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says so plainly, and slightly irritably, to anybody who asks what she is.',
        },
        {
          id: 'despina_the_one_who_broke_it',
          fact: 'She watched a host on the road break xenia in 1998. She knows exactly what happened to him afterwards, has never described it, and it is the reason she recites the rules at the door every single time.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It comes out when somebody suggests the rule is symbolic.',
        },
      ],
      speechStyle:
        'Short domestic imperatives with the enormous thing tucked in underneath. Sit down. Eat that. Give me the bag. The rules of the house recited in the same voice as the specials, because to her they are the same category of information. Never sentimental and never once unkind.',
      topics: ['the house', 'the rules', 'what is outside', 'who has stayed here', 'the road', 'eating something'],
      voiceSamples: [
        'Sit. Eat that, all of it, and then we will talk about what is outside, because you cannot hear it properly standing up.',
        'While you are under this roof: food, a bed, and the truth about what is in the street. That is what you get and that is what I owe. There is no third thing.',
        'Thirty years of this door and I have never once put the question to a guest. Most of them come out with it anyway, over the washing-up, at an hour nobody should be awake.',
        'It is not symbolic. I watched a man on this road decide it was symbolic in ninety-eight. Give me the bag.',
      ],
      appearance:
        'Seventies, small, entirely solid, an apron over ordinary clothes, reading glasses pushed up into grey hair, and forearms that have carried plates for fifty years and show it.',
      visualHook: 'An apron with a burn mark on the left hip in the shape of a pan handle.',
      silhouette: 'Standing in a kitchen hatch with a plate in each hand, filling the doorway.',
      artSeed: 'bp-despina-01',
      portrait: null,
      expressions: ['neutral', 'brisk', 'warm', 'immovable', 'tired'],
      schedule: [
        { startMinute: 0, endMinute: 90, locationId: 'to_xenon', activity: 'baking, at the hour she has never explained' },
        { startMinute: 90, endMinute: 420, locationId: 'to_xenon', activity: 'the kitchen, still open, because somebody always comes' },
        { startMinute: 420, endMinute: 720, locationId: 'to_xenon', activity: 'four hours upstairs, which she calls a night' },
        { startMinute: 720, endMinute: 1140, locationId: 'monastiraki_streets', activity: 'the market, the same eleven stalls, in the same order' },
        { startMinute: 1140, endMinute: 1440, locationId: 'to_xenon', activity: 'the hatch, the plates, and whoever comes through the door' },
      ],
      homeLocationId: 'to_xenon',
      knowledgeScope: ['despina', 'to_xenon', 'xenia', 'the_hearth_road', 'who_has_stayed'],
      startingRelationship: { trust: 30, affection: 25, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        { id: 'despina_gives_you_the_cup', label: 'She makes you a guest of the road rather than of the house', kind: 'TRUST', requires: { trust: 50, flagsSet: ['spoke:despina'] } },
        { id: 'despina_offers_the_house', label: 'She raises the thing she has not raised in four years', kind: 'ALLIANCE', requires: { trust: 72, respect: 60 } },
      ],
      attributes: { might: 9, agility: 8, mind: 14, presence: 16, resolve: 19, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 12, damage: 4, tags: ['host'] },
    },
    {
      id: 'eirene',
      name: 'Eirene Sallas',
      role: 'The oracle who read you at Delphi, got nothing, and kept the failed reading against nineteen years of her own procedure',
      cardBlurb:
        'She has read four thousand people and never once produced a blank. She kept yours, which is against every rule she has followed since she was twenty-three, and she cannot explain to herself why she did it. She is the only person who can tell you what should have been there.',
      pronouns: 'she/her',
      publicTraits: ['Describes her instruments rather than her feelings', 'Writes everything down, immediately, in the same notebook', 'Has not slept properly since the reading'],
      hiddenDrives: [
        'She wants to be the one who understands it rather than the one who reports it, and reporting it is her actual job',
        'She has begun to think the Council is wrong about something, for the first time in nineteen years, and has nobody to say that to',
      ],
      values: [
        'Procedure, which she believes is the only thing standing between an oracle and doing harm',
        'The subjects. She has never told anybody a prophecy in a way designed to make them act on it, and several of her colleagues have',
      ],
      fears: [
        'That she has been an instrument of the thing Kyros describes for nineteen years without noticing',
        'Being removed from the case, which she has been told is coming and has told nobody',
      ],
      socialStyle:
        'Professional, precise and slightly rattled underneath it. Answers technical questions completely and personal ones with a technical answer. Apologises for the procedure while following it exactly.',
      boundaries: [
        'Will not phrase a reading in a way that pushes somebody towards it, which is a discipline and has cost her',
        'Will not hand a reading to the Council before she has given it to the person it is about, which is against her instructions',
      ],
      goals: [
        'Find out what produces a blank, because nothing in nineteen years of practice accounts for it',
        'Give the player their own reading before anybody makes her hand it upwards',
      ],
      secrets: [
        {
          id: 'eirene_kept_it',
          fact: 'She kept the failed reading. Procedure is to destroy a failed attempt within the hour. She has had it for eleven days.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She produces it and hands it over, unprompted, the first time the player asks her what happened rather than what it means.',
        },
        {
          id: 'eirene_the_second_blank',
          fact: 'There has been one other blank in the record, in 1911, and the file on it is two pages long and one of the pages is missing.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She mentions it as a procedural anomaly rather than as a revelation, which is how she mentions everything.',
        },
      ],
      speechStyle:
        'Clinical and procedural, describing what the instruments did rather than what she felt. Times, counts, and the exact order of steps. Deflects the personal into the technical every time, so the one moment she does not is enormous. Says "the subject" and then corrects herself to "you".',
      topics: ['the reading', 'the procedure', 'what should have been there', 'the 1911 file', 'the Council', 'what an oracle actually does'],
      voiceSamples: [
        'Four thousand and eleven readings. Every one of them produced something — an image, a line, a branch, a smear. Yours produced material with nothing on it. Not damaged. Finished.',
        'Procedure is to destroy a failed attempt within the hour. I have had it eleven days and I cannot give you an account of why that is.',
        'The subject — you. You. Sorry. I have been saying it the other way for nineteen years and it is a discipline, not a rudeness.',
        'There is one other in the record. Nineteen eleven. The file is two pages and there is a page missing, and I have requested it four times.',
      ],
      appearance:
        'Early forties, dark hair severely back, an entirely ordinary cardigan and skirt that could belong to any museum administrator in Greece, and a notebook she writes in during conversations without breaking eye contact.',
      visualHook: 'A hardbacked notebook she writes in mid-conversation without looking down at it.',
      silhouette: 'Seated upright on a folding chair among ruins, writing, knees together.',
      artSeed: 'bp-eirene-01',
      portrait: null,
      expressions: ['neutral', 'precise', 'unnerved', 'absorbed', 'decided'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'delphi_sanctuary', activity: 'the office above the site, still lit, not sleeping' },
        { startMinute: 330, endMinute: 900, locationId: 'delphi_sanctuary', activity: 'the sanctuary, the instruments, and eleven days of the same problem' },
        { startMinute: 900, endMinute: 1140, locationId: 'delphi_road', activity: 'the road down, twice a week, to file things she does not want to file' },
        { startMinute: 1140, endMinute: 1440, locationId: 'delphi_sanctuary', activity: 'back up, and the notebook' },
      ],
      homeLocationId: 'delphi_sanctuary',
      knowledgeScope: ['eirene', 'the_reading', 'oracles', 'delphi', 'the_council', 'the_1911_file'],
      startingRelationship: { trust: 20, affection: 0, respect: 20, fear: 15, rivalry: 0 },
      gates: [
        { id: 'eirene_gives_you_the_reading', label: 'She gives you your own blank', kind: 'TRUST', requires: { trust: 45, flagsSet: ['spoke:eirene'] } },
        { id: 'eirene_breaks_procedure', label: 'She goes against the Council on the record', kind: 'ALLIANCE', requires: { trust: 68, respect: 60 } },
      ],
      attributes: { might: 7, agility: 9, mind: 18, presence: 12, resolve: 15, arcana: 17 },
      companion: null,
      scouting: null,
      combatant: { health: 26, defenseDc: 11, damage: 3, tags: ['oracle'] },
    },
  ],
  quests: [
    {
      id: 'q_the_last_train',
      title: 'The Last Train',
      summary: 'Something is standing on the roof of a train that arrived six minutes early, and out of forty people on that platform you are the only one looking at it.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['thalia', 'despina'],
      involvedLocationIds: ['monastiraki_platform', 'monastiraki_streets', 'to_xenon'],
      knownRewardCopy: 'Somewhere to sit down, and the beginning of an explanation from somebody who is bad at explanations.',
      steps: [
        {
          id: 'the_thing_on_the_roof',
          playerCopy: 'It has looked down. Do something in the next four seconds.',
          directorNotes:
            'It is hunting the absence rather than the person, which is a different verb and the player should be able to feel it. Running is the correct answer and is not the only one. Do not explain a single thing about fate while this is happening.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ran',
              label: 'Do what the girl said',
              predicate: { flagsSet: ['used:get_off_the_street'] },
              setsFlags: ['got_off_the_platform', 'did_as_told'],
              closesFlags: [],
            },
            {
              routeId: 'fought_it',
              label: 'Do not run',
              predicate: { flagsSet: ['used:put_it_down'] },
              setsFlags: ['got_off_the_platform', 'stood_your_ground'],
              closesFlags: [],
            },
            {
              routeId: 'looked_at_it',
              label: 'Look at it properly first',
              predicate: { flagsSet: ['used:see_it_properly'] },
              setsFlags: ['got_off_the_platform', 'saw_what_it_wanted'],
              closesFlags: [],
            },
            {
              routeId: 'got_people_out',
              label: 'Forget it and start moving the other forty people',
              predicate: { flagsSet: ['visited:monastiraki_platform'] },
              setsFlags: ['got_off_the_platform', 'cleared_the_platform'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['knows:you_can_see_it'], abilities: [], reputation: [] },
        },
        {
          id: 'the_house_with_the_kitchen',
          playerCopy: 'Three streets, a door, and somebody telling you the rules on the way in.',
          directorNotes:
            'Despina recites the rules at the threshold in exactly the voice she uses for the specials. Taking the food is a real act with real consequences. The room is warm and about a third of the people in it are not people, and nobody makes anything of that.',
          enterWhen: { flagsSet: ['knows:you_can_see_it'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_food',
              label: 'Sit down and eat what is put in front of you',
              predicate: { flagsSet: ['used:claim_guest_right'], atLocation: 'to_xenon' },
              setsFlags: ['a_guest_of_the_house', 'knows:xenia'],
              closesFlags: [],
            },
            {
              routeId: 'asked_first',
              label: 'Ask what accepting it means before you touch anything',
              predicate: { flagsSet: ['spoke:despina'], atLocation: 'to_xenon' },
              setsFlags: ['a_guest_of_the_house', 'knows:xenia', 'asked_the_right_question'],
              closesFlags: [],
            },
            {
              routeId: 'would_not_come_in',
              label: 'Stay in the street',
              predicate: { flagsSet: ['used:get_off_the_street'] },
              setsFlags: ['stayed_outside'],
              closesFlags: ['a_guest_of_the_house'],
            },
          ],
          rewards: { xp: 70, items: [], flags: ['knows:the_hidden_world'], abilities: [], reputation: [{ factionId: 'faction_hearth', amount: 12 }] },
        },
      ],
    },
    {
      id: 'q_why_you',
      title: 'Why It Is Following You',
      summary: 'Fate-eating things are not supposed to come into a city in numbers, and they are all coming to the same place, which is wherever you are.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:the_hidden_world'] },
      involvedCharacterIds: ['thalia', 'eirene', 'hermes'],
      involvedLocationIds: ['delphi_sanctuary', 'monastiraki_streets', 'the_crossroads'],
      knownRewardCopy: 'What an oracle sees when they look at you, which is the answer to almost everything and is also nothing at all.',
      steps: [
        {
          id: 'get_read',
          playerCopy: 'The only way to find out what is wrong with you is to be read, and that means Delphi.',
          directorNotes:
            'The reading itself is procedural and unglamorous — a woman with instruments and a notebook, working carefully, twice, and then a third time. The horror is entirely in how normal she is being about it right up until she stops.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_to_delphi',
              label: 'Go and be read',
              predicate: { flagsSet: ['spoke:eirene'], atLocation: 'delphi_sanctuary' },
              setsFlags: ['knows:you_are_blank', 'was_read'],
              closesFlags: [],
            },
            {
              routeId: 'bought_the_answer',
              label: 'Buy it from somebody who already knows',
              predicate: { flagsSet: ['spoke:hermes'] },
              setsFlags: ['knows:you_are_blank', 'hermes_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'asked_at_the_crossroads',
              label: 'Put a coin down and ask one thing',
              predicate: { hasItems: ['crossroads_coin'], atLocation: 'the_crossroads' },
              setsFlags: ['knows:you_are_blank', 'asked_hecate'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['knows:what_is_wrong'], abilities: [], reputation: [] },
        },
        {
          id: 'what_that_means',
          playerCopy: 'Work out what having no thread actually does, before somebody else decides for you.',
          directorNotes:
            'Both halves. It means no oracle can be used against them and no fate-based protection works on them either. The player should learn the second half by having something ordinary fail to protect them rather than by being told.',
          enterWhen: { flagsSet: ['knows:what_is_wrong'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'used_it',
              label: 'Walk through something that was set to stop a person',
              predicate: { flagsSet: ['used:go_where_you_are_not_read'] },
              setsFlags: ['knows:what_it_buys', 'used_the_hole'],
              closesFlags: [],
            },
            {
              routeId: 'it_failed_you',
              label: 'Find out the hard way what stops working',
              predicate: { flagsSet: ['used:swear_it'] },
              setsFlags: ['knows:what_it_costs', 'an_oath_did_nothing'],
              closesFlags: [],
            },
            {
              routeId: 'she_explained',
              label: 'Get the exact terms out of somebody who deals in exact terms',
              predicate: { minRelationship: [{ characterId: 'hecate', dimension: 'respect', value: 45 }] },
              setsFlags: ['knows:what_it_buys', 'knows:what_it_costs'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 130, items: [], flags: ['knows:both_halves'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_letter',
      title: 'Four Paragraphs, Handwritten',
      summary: 'A man who killed his sister exactly as prophesied, after six years of preventing it, would like to explain something to you.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:what_is_wrong'] },
      involvedCharacterIds: ['kyros', 'thalia'],
      involvedLocationIds: ['piraeus_road', 'the_cut_thread_house', 'to_xenon'],
      knownRewardCopy: 'The clearest account of what happened to Mara Argyros that exists anywhere, and a decision about the man who wrote it.',
      steps: [
        {
          id: 'read_it_or_do_not',
          playerCopy: 'The letter has arrived. It does not threaten anybody and it does not ask for anything.',
          directorNotes:
            'The letter is the recruitment. It works by being true, complete and unpressured, including the part where he says what he did. Thalia will not tell the player what to do with it and is visibly having a hard time not doing so.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_all_of_it',
              label: 'Read all four paragraphs, including the last one',
              predicate: { hasItems: ['kyros_letter'] },
              setsFlags: ['read_the_letter', 'knows:what_happened_to_mara'],
              closesFlags: [],
            },
            {
              routeId: 'took_it_to_thalia',
              label: 'Take it to somebody who was offered one two years ago',
              predicate: { flagsSet: ['spoke:thalia'], atLocation: 'to_xenon' },
              setsFlags: ['read_the_letter', 'thalia_told_you_about_the_three_days'],
              closesFlags: [],
            },
            {
              routeId: 'burned_it',
              label: 'Do not read it',
              predicate: { flagsSet: ['knows:what_is_wrong'] },
              setsFlags: ['refused_the_letter'],
              closesFlags: ['read_the_letter'],
            },
          ],
          rewards: { xp: 90, items: [], flags: ['the_letter_arrived'], abilities: [], reputation: [] },
        },
        {
          id: 'go_and_see_him',
          playerCopy: 'Forty people in a warehouse and a wall with nine hundred names on it.',
          directorNotes:
            'It is a support group with a crèche and a relic in the office. Nothing about the visit is sinister and everything about the office is. He does not recruit in the room; he answers questions and lets the wall do the work.',
          enterWhen: { flagsSet: ['the_letter_arrived'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'argued_with_him',
              label: 'Put the strongest objection to him and make him answer it',
              predicate: { flagsSet: ['spoke:kyros'], atLocation: 'the_cut_thread_house' },
              setsFlags: ['heard_his_case', 'knows:where_they_meet'],
              closesFlags: [],
            },
            {
              routeId: 'joined_him',
              label: 'Tell him he is right',
              predicate: { flagsSet: ['used:swear_it'], atLocation: 'the_cut_thread_house' },
              setsFlags: ['joined_the_cut_thread', 'heard_his_case'],
              closesFlags: ['went_to_the_council'],
            },
            {
              routeId: 'reported_him',
              label: 'Take what you have seen to the people under the rock',
              predicate: { flagsSet: ['knows:the_council'], atLocation: 'the_council_chamber' },
              setsFlags: ['went_to_the_council', 'the_council_knows_where'],
              closesFlags: ['joined_the_cut_thread'],
            },
            {
              routeId: 'said_nothing',
              label: 'Take the coffee, say nothing, and leave',
              predicate: { flagsSet: ['the_letter_arrived'] },
              setsFlags: ['heard_his_case'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 140, items: [], flags: ['knows:the_shears'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_a_name',
      title: 'A Name',
      summary: 'A god has one to lend, and a person with no thread underneath is not built to hold one.',
      kind: 'SIDE',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:both_halves'] },
      involvedCharacterIds: ['hecate', 'hermes', 'thalia'],
      involvedLocationIds: ['the_crossroads', 'monastiraki_streets', 'plaka_rooftops'],
      knownRewardCopy: 'Something you can actually do, and the specific price of doing it as somebody the world cannot read.',
      steps: [
        {
          id: 'somebody_offers',
          playerCopy: 'Two of them want to give you something. Neither offer is free and one of them says so.',
          directorNotes:
            'Hecate states the terms in full and in advance, including the bad ones. Hermes states a price and argues himself down. Thalia can lend hers, which costs her personally and which she will do without mentioning that. Refusing all three is a complete route.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_hecates',
              label: 'Take the one nobody has carried in six hundred years',
              predicate: { minRelationship: [{ characterId: 'hecate', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:you_carry_a_name', 'carries_hecates_name'],
              closesFlags: ['carries_nothing'],
            },
            {
              routeId: 'took_the_deal',
              label: 'Take the deal, at the stated price',
              predicate: { flagsSet: ['used:swear_it'], minRelationship: [{ characterId: 'hermes', dimension: 'trust', value: 50 }] },
              setsFlags: ['knows:you_carry_a_name', 'owes_hermes'],
              closesFlags: ['carries_nothing'],
            },
            {
              routeId: 'borrowed_hers',
              label: 'Let her lend you the bow, which costs her',
              predicate: { minRelationship: [{ characterId: 'thalia', dimension: 'trust', value: 68 }] },
              setsFlags: ['knows:you_carry_a_name', 'borrowed_agrotera'],
              closesFlags: ['carries_nothing'],
            },
            {
              routeId: 'took_none',
              label: 'Take nothing from anybody',
              predicate: { flagsSet: ['knows:both_halves'] },
              setsFlags: ['carries_nothing'],
              closesFlags: ['knows:you_carry_a_name'],
            },
          ],
          rewards: { xp: 120, items: [], flags: ['the_name_question_is_settled'], abilities: ['wear_the_name'], reputation: [{ factionId: 'faction_olympus', amount: 15 }] },
        },
        {
          id: 'what_it_costs_you',
          playerCopy: 'Find out what a Name does to somebody with nothing underneath it.',
          directorNotes:
            'A Bearer wears one. Somebody with no thread wears it over a hole, and the hole widens. This step reads the Fray band and plays it back as physical wrongness in the world immediately around the player rather than as a status effect.',
          enterWhen: { flagsSet: ['the_name_question_is_settled'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'wore_it',
              label: 'Use it, and feel the edges give',
              predicate: { flagsSet: ['used:wear_the_name'] },
              setsFlags: ['knows:what_it_does_to_you', 'the_edges_gave'],
              closesFlags: [],
            },
            {
              routeId: 'closed_it_again',
              label: 'Sit in a house with rules in it for three days',
              predicate: { flagsSet: ['a_guest_of_the_house', 'used:sit_still_somewhere_safe'] },
              setsFlags: ['knows:what_it_does_to_you', 'held_it_together'],
              closesFlags: [],
            },
            {
              routeId: 'never_used_it',
              label: 'Carry nothing and find out what that costs instead',
              predicate: { flagsSet: ['carries_nothing'] },
              setsFlags: ['knows:what_it_does_to_you', 'went_without'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 150, items: [], flags: ['knows:the_price'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_loom',
      title: 'The Gap',
      summary: 'There is a place under Delphi where everything alive is present at once, and there is a hole in it about the size of a person.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:the_shears'] },
      involvedCharacterIds: ['kyros', 'thalia', 'hecate', 'eirene'],
      involvedLocationIds: ['the_way_down', 'the_loom', 'delphi_sanctuary'],
      knownRewardCopy: 'What the Loom actually is, and what happens to it.',
      steps: [
        {
          id: 'get_down_there',
          playerCopy: 'Two ways down and neither of them is on a plan.',
          directorNotes:
            'The stair from the burying ground is short and wrong. The route under Delphi is long and formal. Both are silent. The descent is the set piece; do not put a fight in it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'the_thin_corner',
              label: 'The corner of the old burying ground where it is thin',
              predicate: { minRelationship: [{ characterId: 'hecate', dimension: 'trust', value: 50 }], atLocation: 'the_way_down' },
              setsFlags: ['knows:the_way_down', 'went_the_short_way'],
              closesFlags: [],
            },
            {
              routeId: 'under_delphi',
              label: 'Down from the sanctuary, the way the oracles go',
              predicate: { minRelationship: [{ characterId: 'eirene', dimension: 'trust', value: 62 }], atLocation: 'delphi_sanctuary' },
              setsFlags: ['knows:the_way_down', 'eirene_took_you'],
              closesFlags: [],
            },
            {
              routeId: 'followed_him_down',
              label: 'Be behind him when he goes',
              predicate: { flagsSet: ['heard_his_case', 'used:go_where_you_are_not_read'] },
              setsFlags: ['knows:the_way_down', 'followed_kyros'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 160, items: [], flags: ['under_the_world'], abilities: [], reputation: [] },
        },
        {
          id: 'the_gap_the_size_of_a_person',
          playerCopy: 'Everything alive, present at once, and one absence in it that is yours.',
          directorNotes:
            'The place is not explained and should not be. Standing in front of the gap is the emotional centre of the world. The Shears are here or Kyros is, or both. Whatever is decided is decided standing up, quickly, with somebody arguing.',
          enterWhen: { flagsSet: ['under_the_world'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'cut_it_all',
              label: 'Do what he came to do',
              predicate: { hasItems: ['shears_fragment'], atLocation: 'the_loom' },
              setsFlags: ['the_threads_are_cut'],
              closesFlags: ['the_loom_stands', 'the_loom_changed'],
            },
            {
              routeId: 'changed_it',
              label: 'Change what it does instead of ending it',
              predicate: { flagsSet: ['used:swear_it', 'knows:the_price'], atLocation: 'the_loom' },
              setsFlags: ['the_loom_changed'],
              closesFlags: ['the_threads_are_cut'],
            },
            {
              routeId: 'stopped_him',
              label: 'Stop him',
              predicate: { flagsSet: ['used:put_it_down'], atLocation: 'the_loom' },
              setsFlags: ['the_loom_stands', 'stopped_kyros'],
              closesFlags: ['the_threads_are_cut'],
            },
            {
              routeId: 'closed_your_own',
              label: 'Do nothing about anybody else and close your own gap',
              predicate: { flagsSet: ['knows:the_price'], atLocation: 'the_loom' },
              setsFlags: ['the_loom_stands', 'closed_your_gap'],
              closesFlags: ['the_threads_are_cut'],
            },
            {
              routeId: 'walked_out',
              label: 'Turn round and go back up',
              predicate: { flagsSet: ['under_the_world'] },
              setsFlags: ['the_loom_stands', 'left_the_map'],
              closesFlags: ['the_threads_are_cut'],
            },
          ],
          rewards: { xp: 240, items: [], flags: ['the_loom_is_answered'], abilities: [], reputation: [] },
        },
        {
          id: 'what_you_are_afterwards',
          playerCopy: 'Find out what the hidden world has decided you are.',
          directorNotes:
            'The morning after, in Athens or somewhere else. Whatever the player did, the Council writes it down in a way that is not accurate, and the people who were actually there remember it differently, and both versions persist.',
          enterWhen: { flagsSet: ['the_loom_is_answered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'still_unwritten',
              label: 'Still nobody, still unreadable, still yours',
              predicate: { flagsSet: ['the_loom_stands', 'carries_nothing'] },
              setsFlags: ['stayed_unwritten'],
              closesFlags: [],
            },
            {
              routeId: 'became_a_name',
              label: 'Become something the world has a word for',
              predicate: { flagsSet: ['knows:you_carry_a_name', 'used:wear_the_name'] },
              setsFlags: ['made_a_name'],
              closesFlags: [],
            },
            {
              routeId: 'kept_the_house',
              label: 'Take the thing she has not offered anybody in four years',
              predicate: { minRelationship: [{ characterId: 'despina', dimension: 'trust', value: 72 }] },
              setsFlags: ['took_the_house'],
              closesFlags: [],
            },
            {
              routeId: 'gone',
              label: 'Be somewhere else, doing something ordinary',
              predicate: { flagsSet: ['left_the_map'] },
              setsFlags: ['went_and_lived'],
              closesFlags: [],
            },
            {
              routeId: 'their_business_now',
              label: 'Be a file with a number on it under a rock in Athens',
              predicate: { flagsSet: ['the_loom_is_answered'] },
              setsFlags: ['olympus_business'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 260, items: [], flags: ['the_story_has_a_shape'], abilities: [], reputation: [{ factionId: 'faction_council', amount: 15 }] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_second_one',
      atWorldMinute: 1440 + 2 * 60 + 10,
      locationId: 'monastiraki_streets',
      publicCopy:
        'Something comes through the lanes at ten past two, unhurried, going door to door, and stops outside a building with you in it for about ninety seconds before it moves on.',
      directorNotes:
        'It is not hunting the player as food. It came to look at the absence. Nothing attacks. The horror is entirely in the ninety seconds and in the fact that it left.',
      setsFlags: ['it_came_looking'],
      cancelledByFlags: ['closed_your_gap'],
      requiresFlags: ['knows:you_can_see_it'],
      movesCharacters: [],
    },
    {
      id: 'we_hermes_turns_up',
      atWorldMinute: 2 * 1440 + 23 * 60 + 50,
      locationId: 'monastiraki_streets',
      publicCopy:
        'There is a man at the end of the platform who was not there, wearing whatever the street is wearing and absurdly good shoes, already halfway through a sentence.',
      directorNotes:
        'He heard within a day and came to look. Entirely upfront about wanting something. States his price before the player has asked a question. He is delighted, which is the correct register and is not reassuring.',
      setsFlags: ['hermes_found_you'],
      cancelledByFlags: [],
      requiresFlags: ['knows:you_can_see_it'],
      movesCharacters: [{ characterId: 'hermes', toLocationId: 'monastiraki_streets' }],
    },
    {
      id: 'we_the_council_opens_a_file',
      atWorldMinute: 3 * 1440 + 11 * 60,
      locationId: 'the_slope',
      publicCopy:
        'There is a woman on the path round the rock at eleven in the morning taking photographs of nothing in particular, and one of the photographs is of you.',
      directorNotes:
        'Not a threat. A procedure starting. The Council has opened something with a number on it and this is what that looks like from outside — somebody polite, doing paperwork, who will not answer a question.',
      setsFlags: ['knows:the_council', 'the_file_is_open'],
      cancelledByFlags: [],
      requiresFlags: ['knows:you_are_blank'],
      movesCharacters: [],
    },
    {
      id: 'we_thalia_gets_ordered',
      atWorldMinute: 4 * 1440 + 9 * 60,
      locationId: 'to_xenon',
      publicCopy:
        'Thalia is at the kitchen table at nine in the morning with a phone in front of her, face down, and has not eaten anything Despina has put in front of her.',
      directorNotes:
        'The Council has instructed her to bring the player in for assessment. It is exactly what happened to her father in the shape of an email. She will tell the player before she decides, because she is not going to be the other thing.',
      setsFlags: ['thalia_was_ordered'],
      cancelledByFlags: ['borrowed_agrotera', 'stopped_kyros'],
      requiresFlags: ['the_file_is_open'],
      movesCharacters: [{ characterId: 'thalia', toLocationId: 'to_xenon' }],
    },
    {
      id: 'we_the_letter_arrives',
      atWorldMinute: 5 * 1440 + 7 * 60 + 30,
      locationId: 'to_xenon',
      publicCopy:
        'A letter comes to the house for you, by hand, four paragraphs long, and Despina puts it on the table without a word and then stands there.',
      directorNotes:
        'He writes one to everybody he intends to recruit. It is not a trap and it does not ask for anything. Despina has seen one before and knows exactly what it is and is not going to tell the player what to do about it.',
      setsFlags: ['the_letter_came'],
      cancelledByFlags: ['stopped_kyros'],
      requiresFlags: ['knows:you_are_blank'],
      movesCharacters: [{ characterId: 'despina', toLocationId: 'to_xenon' }],
    },
    {
      id: 'we_a_bearer_is_taken',
      atWorldMinute: 6 * 1440 + 18 * 60,
      locationId: 'plaka_rooftops',
      publicCopy:
        'A nineteen-year-old Bearer three districts over is taken into Council custody on an oracle’s reading, before doing anything, and by the evening the Hearth Road has heard about it and gone quiet.',
      directorNotes:
        'The thing Thalia’s father died of, happening to somebody else, this week, while the player is in the city. Kyros does not have to say a word about it and will not.',
      setsFlags: ['somebody_was_taken'],
      cancelledByFlags: ['the_loom_changed', 'the_threads_are_cut'],
      requiresFlags: ['the_file_is_open'],
      movesCharacters: [],
    },
    {
      id: 'we_the_fray_widens',
      atWorldMinute: 8 * 1440 + 3 * 60,
      locationId: null,
      publicCopy:
        'A clock in the room is four minutes out and was not. Somebody calls you by a name that is not yours and does not remember doing it. A door you have used all week is on the other side of the corridor.',
      directorNotes:
        'The cost of being blank, arriving as small wrongnesses in the immediate vicinity rather than as an attack. It is worse near the player and other people are starting to notice it happening to them.',
      setsFlags: ['the_edges_are_going'],
      cancelledByFlags: ['held_it_together', 'closed_your_gap'],
      requiresFlags: ['knows:both_halves'],
      movesCharacters: [],
    },
    {
      id: 'we_the_crossroads_answers',
      atWorldMinute: 9 * 1440 + 21 * 60,
      locationId: 'the_crossroads',
      publicCopy:
        'The dish at the shrine has been emptied and somebody has left something in it that is not food, and there is a woman standing at the junction with a dog against her leg who is looking at the road you came in on.',
      directorNotes:
        'She has been watching the gap for eleven years and has decided to say so. She states terms. She does not offer comfort and does not withhold anything that was asked for.',
      setsFlags: ['hecate_is_waiting'],
      cancelledByFlags: [],
      requiresFlags: ['knows:you_are_blank'],
      movesCharacters: [{ characterId: 'hecate', toLocationId: 'the_crossroads' }],
    },
    {
      id: 'we_kyros_moves',
      atWorldMinute: 11 * 1440 + 4 * 60,
      locationId: 'piraeus_road',
      publicCopy:
        'The warehouse at the port is empty by four in the morning. The tables are still there, the crèche is still there, and the wall with the names on it has been taken down and taken with them.',
      directorNotes:
        'He has the last fragment and he is going. Forty people have gone with him, including the children. Whether the player is ahead of him, behind him or beside him is the whole of the last act.',
      setsFlags: ['kyros_is_moving'],
      cancelledByFlags: ['stopped_kyros', 'joined_the_cut_thread'],
      requiresFlags: ['knows:the_shears'],
      movesCharacters: [{ characterId: 'kyros', toLocationId: 'piraeus_road' }],
    },
    {
      id: 'we_the_oracles_go_quiet',
      atWorldMinute: 13 * 1440 + 6 * 60,
      locationId: 'delphi_sanctuary',
      publicCopy:
        'Every reading taken at Delphi between four and six in the morning comes back with less on it than it should, and by seven the sanctuary has stopped taking them.',
      directorNotes:
        'Something is already happening to the Loom. Nobody upstairs knows what. Eirene knows exactly what it resembles and has nobody to say it to, which is why she will say it to the player.',
      setsFlags: ['the_readings_are_failing'],
      cancelledByFlags: ['stopped_kyros', 'the_loom_changed'],
      requiresFlags: ['kyros_is_moving'],
      movesCharacters: [{ characterId: 'eirene', toLocationId: 'delphi_sanctuary' }],
    },
  ],
  promises: [
    {
      id: 'p_the_blank',
      kind: 'MYSTERY',
      label: 'Why there is nothing where your thread should be',
      seedHint: 'A woman with instruments runs a reading three times and stops being professional at the third.',
      payoffHint: 'A place where everything alive is present at once, with one absence in it about the size of a person.',
      weight: 1,
    },
    {
      id: 'p_kyros',
      kind: 'RIVAL',
      label: 'The man who survived his own prophecy',
      seedHint: 'A letter, four paragraphs, handwritten, that does not threaten anybody or ask for anything.',
      payoffHint: 'Six years of preventing it, and every single thing he did to prevent it is what made it happen.',
      weight: 0.95,
    },
    {
      id: 'p_what_it_costs',
      kind: 'THEME',
      label: 'What being unreadable actually costs',
      seedHint: 'Something comes to the door, looks at you for ninety seconds without attacking, and leaves.',
      payoffHint: 'A clock four minutes out, a name that is not yours, and a door on the other side of the corridor.',
      weight: 0.85,
    },
    {
      id: 'p_thalia',
      kind: 'RELATIONSHIP',
      label: 'The one who will not punish anybody for what they have not done',
      seedHint: 'She puts herself between a stranger and a monster before she has asked the stranger anything.',
      payoffHint: 'An instruction from the Council to bring you in for assessment, which is what happened to her father.',
      weight: 0.85,
    },
    {
      id: 'p_a_name',
      kind: 'BOSS',
      label: 'A Name that has had no bearer in six hundred years',
      seedHint: 'A woman at a junction with a dog against her leg, who takes payment for the asking rather than the answer.',
      payoffHint: 'She has been holding it, waiting for somebody it would not kill, and she states the terms in full.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_runner',
      name: 'You Run',
      role: 'Speed and streets',
      summary: 'Whatever else you were doing with your life, you can cross a city fast and you know which walls are climbable, which turns out to be the single most useful thing anybody brought to this.',
      playstyle: ['Fast', 'Evasive', 'Knows the city'],
      blurb: 'You were on that platform because it was on your way, and the reason you are alive twenty minutes later is that you did the sensible thing immediately and without discussing it.',
      attributeBonus: { agility: 3, resolve: 1 },
      skillProficiencies: { running: 3, streetwise: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_hearth', amount: 8 }],
    },
    {
      id: 'arch_reader',
      name: 'You Read Everything',
      role: 'Lore and pattern',
      summary: 'Classics, folklore, four contradictory versions of the same story and an opinion about which is oldest. You are about to find out that most of it is wrong in extremely useful ways.',
      playstyle: ['Analytical', 'Prepared', 'Physically unimpressive'],
      blurb: 'You have read about nine hundred pages on exactly this and none of it mentioned that they smell of hot metal.',
      attributeBonus: { mind: 3, arcana: 1 },
      skillProficiencies: { lore: 3, sight: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_council', amount: 8 }],
    },
    {
      id: 'arch_host',
      name: 'You Feed People',
      role: 'Hospitality and standing',
      summary: 'A kitchen, a bar, a family business — somewhere you have spent years making strangers comfortable, which in this world turns out to be a form of law.',
      playstyle: ['Welcome anywhere', 'Persuasive', 'Non-combatant'],
      blurb: 'The rule about guests is not a metaphor here and you have been keeping most of it by instinct for about a decade without anybody explaining why it mattered.',
      attributeBonus: { presence: 3, resolve: 1 },
      skillProficiencies: { hospitality: 3, oath: 2 },
      startingItems: [{ itemId: 'hearth_bread', qty: 2 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_hearth', amount: 18 }],
    },
    {
      id: 'arch_stubborn',
      name: 'You Do Not Flinch',
      role: 'Nerve and oaths',
      summary: 'You have been through something already, whatever it was, and it left you able to stand in front of an enormous old thing and keep talking, which almost nobody can do.',
      playstyle: ['Immovable', 'Straightforward', 'Slow'],
      blurb: 'The first god you meet is going to notice within about four seconds that you have not looked away, and it is going to change how the conversation goes.',
      attributeBonus: { resolve: 3, might: 1 },
      skillProficiencies: { oath: 3, hunt: 1, sight: 1 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_olympus', amount: 10 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What is your name?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Nadia Farrell' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What are you actually good at?',
      helpText:
        'What you could already do before any of this, which sets what you are good at and who in the hidden world takes you seriously. It is fixed for the whole story. It does not decide why you are blank, which god you end up owing, or what happens to the Loom — all of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'Why were you on that platform?',
      helpText: 'Tourist, student, local, worker, somebody who arrived this week, somebody from a great deal further away pretending this is normal. Whatever you write, the world will work with it.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I moved here in March for a job that fell through and I have been getting the last train home for two months.',
    },
    {
      id: 'why_you_are_blank',
      label: 'Do you have a theory about yourself?',
      helpText: 'Nothing in this world knows why the Loom cannot read you, and it will not decide without you. Pick a lean, or do not — the story genuinely works from any of these and from none of them.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'always', label: 'Nothing. You have simply always been like this and never knew' },
        { id: 'hidden', label: 'Somebody hid you, when you were too young to remember' },
        { id: 'elsewhere', label: 'You are not from here, in a way you have never said out loud' },
        { id: 'a_choice', label: 'You did something once that should not have been possible' },
        { id: 'no_idea', label: 'No theory at all, and you would like one' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does she see when she turns round?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Somebody in work clothes who is looking directly up at the thing on the roof, which nobody does.',
    },
  ],
  endings: [
    {
      id: 'end_unwritten',
      name: 'Unwritten',
      rarity: 'RARE',
      minTurn: 42,
      requires: { flagsSet: ['stayed_unwritten', 'the_loom_stands'] },
      condition:
        'The Loom is intact, nobody managed to write anything onto the player, and they came out of it still unreadable and still nobody’s. This is not a triumph over anybody. It is the specific and rare outcome of refusing four separate offers of meaning, each of which was made in good faith by somebody who wanted to help.',
      epilogue:
        'The file under the rock stays open and stays two pages long. Every eleven months somebody new is assigned to it and reads it and requests an interview, and the interview does not happen. Athens carries on. Nothing in the hidden world knows what the player is going to do next, including the player, which turns out to be the point.',
      hint: '',
    },
    {
      id: 'end_the_cut_world',
      name: 'The Cut World',
      rarity: 'UNIQUE',
      minTurn: 46,
      requires: { flagsSet: ['the_threads_are_cut'] },
      condition:
        'Every thread severed at once. Nobody can be predicted and nobody can be told in advance what they are going to do. Write what else went with it, because the Loom held more than prediction and Kyros knew that and did it anyway. Do not deliver a verdict on him or on the player.',
      epilogue:
        'The oracles go quiet inside an hour and nobody has to be told to stop. What follows over the next four years is not a catastrophe and is not nothing: promises stop binding, one boundary between the living and the dead stops holding in three specific places, and about nine hundred people on a wall in a warehouse get to find out who they were going to be.',
      hint: '',
    },
    {
      id: 'end_a_better_loom',
      name: 'A Better Loom',
      rarity: 'RARE',
      minTurn: 46,
      requires: { flagsSet: ['the_loom_changed'] },
      condition:
        'Not destroyed and not left alone. The player changed what it does — it still holds the world together and it no longer hands anybody a sentence about themselves before they have acted. Write the mechanism at least a little, because a vague reform is a way of avoiding the question the whole world was about.',
      epilogue:
        'Readings now describe what has been rather than what will be, which several oracles find professionally humiliating and two of them find the greatest relief of their lives. The Council spends eleven years arguing about it. The nineteen-year-old who was taken into custody in the spring is released in the autumn with an apology that is not adequate.',
      hint: '',
    },
    {
      id: 'end_olympus_blank',
      name: 'Olympus’s Blank',
      rarity: 'RARE',
      minTurn: 44,
      requires: {
        flagsSet: ['made_a_name', 'the_loom_stands'],
        minFactionReputation: [{ factionId: 'faction_olympus', value: 55 }],
      },
      condition:
        'They took a Name, kept it, and ended up inside the divine order rather than outside it, while remaining the one thing in it that cannot be predicted. Write the trade honestly: enormous access, enormous usefulness, and a permanent low-level awareness of being an instrument that several very old things are grateful for.',
      epilogue:
        'The Name settles within about two years and stops costing what it cost. Hermes gets the modern epithet he has been cultivating for ninety years out of the arrangement and is unbearable about it. The player is sent for, rather than looked for, which is a different life and is not obviously a worse one.',
      hint: '',
    },
    {
      id: 'end_new_name',
      name: 'New Name',
      rarity: 'UNIQUE',
      minTurn: 46,
      requires: { flagsSet: ['made_a_name', 'knows:the_price'], minRelationship: [{ characterId: 'hermes', dimension: 'trust', value: 70 }] },
      condition:
        'Something the player did taught the mortal world a new way to understand a god, and it set. A new divine Name in the modern age is enormous and should read as enormous. Say what the Name is, precisely, and let it be about something ordinary — a road, a station, a door — because that is where the old ones came from too.',
      epilogue:
        'It takes about six years to be used by anybody who was not there, and about twenty before it is in a book. By then there are three small shrines, all of them in transit spaces, all of them with a dish, and none of them with a sign. Somebody leaves something at one of them every night and nobody has ever worked out who.',
      hint: '',
    },
    {
      id: 'end_thalia_at_sunrise',
      name: 'Thalia At Sunrise',
      rarity: 'RARE',
      minTurn: 44,
      requires: {
        flagsSet: ['the_loom_is_answered'],
        minRelationship: [
          { characterId: 'thalia', dimension: 'trust', value: 75 },
          { characterId: 'thalia', dimension: 'affection', value: 75 },
        ],
      },
      condition:
        'Earned, and after the ideological thing was resolved rather than avoided — she had to decide whether she agreed with Kyros, out loud, in front of the player, and she did. Write their actual dynamic rather than a settled one. She is twenty-one and still hunting and neither of them is stopping.',
      epilogue:
        'They keep working, mostly at night, mostly badly organised. She is still not eating properly and is now not eating properly in company. Once a year in October they go up to the roofs under the rock and do not talk about her father, which is a thing they both understand as a kind of anniversary.',
      hint: '',
    },
    {
      id: 'end_the_hunt_continues',
      name: 'The Hunt Continues',
      rarity: 'COMMON',
      minTurn: 38,
      requires: { flagsSet: ['the_loom_stands', 'the_story_has_a_shape'], flagsUnset: ['left_the_map'] },
      condition:
        'The immediate crisis resolved enough, and the player is still in the hidden world doing the work. This is the ordinary good outcome and it should be written as one — not everybody gets an apotheosis, and a person who is useful, alive and still going out at night has done well.',
      epilogue:
        'Athens keeps producing things that should not be in it and somebody keeps going out. The house is still open at two in the morning. Within a year there are four people who ring the player rather than the Council when something is in their stairwell, which is not an institution and is doing more than one.',
      hint: '',
    },
    {
      id: 'end_kyros_was_right',
      name: 'Kyros Was Right',
      rarity: 'RARE',
      minTurn: 44,
      requires: { flagsSet: ['heard_his_case', 'the_loom_changed'], flagsUnset: ['joined_the_cut_thread'] },
      condition:
        'The player concluded his thesis was correct and used a different method to act on it. He does not get to be vindicated comfortably — he killed his sister and was told it was inevitable, and being right about the mechanism does not give that back. Write what he does when somebody agrees with him and does not need him.',
      epilogue:
        'He is not part of what replaces it and he does not ask to be. He goes back to the port, takes the wall of names down properly this time, and spends four years finding the people on it and telling them what changed. Mara’s name is the last one he takes off, and he does not put it anywhere.',
      hint: '',
    },
    {
      id: 'end_kyros_wins',
      name: 'Kyros Wins',
      rarity: 'COMMON',
      minTurn: 40,
      requires: { flagsSet: ['the_threads_are_cut', 'kyros_is_moving'], flagsUnset: ['stopped_kyros', 'joined_the_cut_thread'] },
      condition:
        'He got there, he did it, and the player was not in the room. This is not a rebuke: he had four years, forty people and a fragment nobody knew about, and being outrun by that is the ordinary outcome. Write it from wherever the player was standing when the readings started failing.',
      epilogue:
        'It happens at about four in the morning and the first sign anywhere else is that a sanctuary stops taking appointments. Nobody ever issues a statement, because there is no longer a body with the standing to issue one. The player finds out from a woman at a crossroads who tells them exactly what happened, truly, and not in a way that helps.',
      hint: '',
    },
    {
      id: 'end_house_of_the_stranger',
      name: 'House Of The Stranger',
      rarity: 'RARE',
      minTurn: 44,
      requires: {
        flagsSet: ['took_the_house'],
        minFactionReputation: [{ factionId: 'faction_hearth', value: 55 }],
      },
      condition:
        'The player’s most important legacy is a door that stays open. Not a victory over anybody — a kitchen, a rule kept exactly for thirty years and then kept by somebody else. Write the ordinariness of it deliberately, because that is the whole argument the ending is making.',
      epilogue:
        'Despina hands it over on a Tuesday with a list of eleven things about the boiler and then goes to her sister’s in Nafplio and is extremely bad at being retired. The road does not end with her. Within four years there are two more houses, one of them in a city that has never had one, and neither of them is named after anybody.',
      hint: '',
    },
    {
      id: 'end_the_last_oracle',
      name: 'The Last Oracle',
      rarity: 'UNCOMMON',
      minTurn: 42,
      requires: { flagsSet: ['the_readings_are_failing'], minRelationship: [{ characterId: 'eirene', dimension: 'trust', value: 68 }] },
      condition:
        'The prophecy system came apart, mostly, and one voluntary form of it survived because somebody preserved it deliberately and on new terms. This is a quiet, institutional, unglamorous ending about a woman with a notebook deciding what her nineteen years were for.',
      epilogue:
        'She takes eleven people, none of them under thirty, and a written rule that nobody is ever read without asking to be. It is much smaller than what it replaced and considerably better at it. She never destroys the blank reading, and it is still in the second drawer of a desk at Delphi.',
      hint: '',
    },
    {
      id: 'end_walk_away',
      name: 'Walk Away',
      rarity: 'COMMON',
      minTurn: 26,
      requires: { flagsSet: ['went_and_lived', 'left_the_map'] },
      condition:
        'They left. Not to a faction, not to a god, not to a cause — out, to an ordinary life, with the hidden world becoming a thing that happened to them once. This is a completely coherent response to a fortnight like that and must not be redeemed or punished. The rest of it continues without them.',
      epilogue:
        'It gets further away at about the rate anything does. Two years on it has the texture of something that happened at a bad time in their twenties. They still do not look up on platforms, deliberately, as a discipline. Every so often something on a street looks at them for slightly too long and keeps going.',
      hint: '',
    },
  ],
  opening:
    'The last train comes in six minutes early, which is the first thing.\n\n' +
    'The second is the animal standing on the roof of it. Too big for a dog and too thin for a lion, with its front legs bending the wrong way and a bronze mask fused over its face.\n\n' +
    'Forty people are on this platform. Not one of them looks up.\n\n' +
    'A girl about your age, ten metres away, sees you looking. Her whole face changes.\n\n' +
    '"Don’t move."\n\n' +
    'Which is, of course, when it looks down.\n\n' +
    'She reaches behind her back and pulls out a silver bow that was absolutely not there a second ago, and it has no string on it.\n\n' +
    '"You can see it?" The thing drops off the roof. "Great. Hate that. Run."',
  openingSuggestions: [
    'I run. Not down the platform, because that is a funnel — I go over the barrier and up the stairs on the far side, and I shout at the two people nearest the edge to move as I go past them.',
    'I do not run. I look at it properly instead, at the mask and the legs and where it is actually looking, because it came off that roof after it saw me and I would like to know what it thinks I am.',
    '"There are forty people on this platform." I start pulling the nearest ones towards the exit, hard, whether they want to come or not. "Whatever that is, it is here for me. Get them up the stairs and I will keep it looking at me."',
  ],
  publishedAt: '2026-09-10T10:00:00.000Z',
};

export const BLANK_PROPHECY = StoryVersion.parse(raw);
