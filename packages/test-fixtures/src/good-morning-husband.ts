import { StoryVersion } from '@aniplay/contracts';

/**
 * "Good Morning, Husband" — a marriage that already happened.
 *
 * The structural bet is the opposite of every romance world we have: there is
 * no courtship, no cast to choose between, and no meter to fill. The
 * relationship starts at four years deep, with history, routines, in-jokes and
 * a shared grocery list in two handwritings. What the player is doing is not
 * winning somebody over. It is deciding whether to keep a life somebody else
 * built, and finding out what that person is actually like while they decide.
 *
 * Which means the whole thing rests on Hana being a person rather than a
 * reward. She has a job she likes, a fellowship she has not mentioned, a
 * brother, a best friend who is on her side rather than the player's, and a
 * limit: she will not be managed. Every one of those is authored so the writer
 * can motivate her rather than only voice her. "Avoid relentless perfect-wife
 * sycophancy" is a note in the bible, and a note is not a mechanism — what
 * stops it is that she wants a specific thing this week and it costs the player
 * something to give it to her.
 *
 * The memory gap is a device and not a plot. If the player never pulls on it,
 * Platform 11 does not exist: the lead is gated behind a flag only somebody who
 * went looking can set, and the ordinary Saturday is the whole game. Thirty
 * turns of breakfast, laundry and one argument about a spare room is a
 * legitimate way to play this and should be good.
 *
 * Three variables. Energy exists because `resolveRest` restores GOOD_HIGH
 * resources and a world with none prints "you rest, and recover" and changes
 * nothing — and because a Saturday genuinely runs out. The other two are
 * descending on purpose: a marriage is not a bar you fill, it is a pair of
 * things that get worse if nobody attends to them.
 */

const raw = {
  id: 'sv_good_morning_husband_1',
  storyId: 'story_good_morning_husband',
  version: 1,
  title: 'Good Morning, Husband',
  fantasyLabel: 'Four years married. You just met her.',
  hook: 'You wake up on an ordinary Saturday wearing a wedding ring, in a flat you have never seen, and the woman making pancakes in the kitchen has been your wife for four years.',
  premise:
    'You go to sleep in your own life and wake up in this one. Same body, same name, same memory of being a child. What is missing is the last several years, and in those years you apparently got married.\n\n' +
    'There is a gold band on your left hand that does not come off easily, because it has been there long enough for your finger to have grown around it.\n\n' +
    'There is a framed photograph on the dresser of you and a woman outside a registry office, both laughing at something outside the frame. Her name is Hana Mori. The calendar in the hall says four years.\n\n' +
    'Nothing dramatic happened last night. No accident, no hospital, no bang on the head. You simply went to sleep somewhere else.\n\n' +
    'She does not know anything is wrong. When you tell her she will assume you are joking, because that is the kind of thing the two of you do to each other.\n\n' +
    'So you have a marriage you did not build, a flat full of evidence about a man you have to take on trust, and a wife who will notice within a day that you are reading her like a stranger.\n\n' +
    'What you do about that is yours. Tell her. Play along until it stops being playing. Keep this life and make it better than the one you lost, or go and find out what happened and lose this one working it out.\n\n' +
    'She has a secret of her own, and hers has a deadline.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Slice of life', 'Modern', 'Comedy', 'Drama'],
  mechanicsChips: [
    'A marriage with history',
    'She can say no',
    'Ordinary weekends count',
    'A secret with a deadline',
    'The mystery is optional',
  ],
  contentDescriptors: ['ROMANCE', 'SUGGESTIVE_THEMES', 'PSYCHOLOGICAL_THEMES'],
  intensity: 'LIGHT',
  creatorNote:
    'You can spend thirty turns making breakfast, arguing about a bookshelf and going to a family dinner, and that is a real way to play this. Hana is not waiting to be won. She already chose you, four years ago, and this week she is quietly working out whether she still would.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: false,
    allowsRomance: true,
    startingLocationId: 'the_kitchen',
    startWorldMinute: 8 * 60 + 40,
    startingItems: [{ itemId: 'wedding_band', qty: 1 }],
    hardCanon: [
      'Hana Mori and the player have been married four years, in this version of things, and it was a real marriage with a real history.',
      'Hana genuinely loves the player at story start. She is not pretending and there is no trick.',
      'The memory discontinuity happened this morning. Nothing caused it that anybody in this world can point to.',
      'Hana has applied for a six-month design fellowship in another city and has not told the player. Emi Takeda knows.',
      'Hana is not a prize and cannot be won. She can be hurt, bored, relieved, furious, and she can leave.',
      'Nothing supernatural is visible in ordinary life. Platform 11 exists only for a player who goes looking for it, and never intrudes on a player who does not.',
    ],
    toneGuide:
      'Warm, funny, and specific. This is a world of small physical detail — the pan, the wrong mug, the bag of shopping that splits, the bookshelf with four screws left over. ' +
      'Affection is shown by what people do for each other while talking about something else. Jokes land more often than speeches. ' +
      'Conflict is human-scale: money, time, whose turn it is, whether we are moving. Nobody is a villain and nobody is punished for wanting something. ' +
      'Attraction is adult and unhurried, and the marriage is never reduced to it. If a scene has nothing at stake, let it be pleasant and let it be short.',
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 10, mind: 12, presence: 12, resolve: 11, arcana: 6 },
  skills: [
    { id: 'attention', name: 'Attention', attribute: 'mind', description: 'What changed in a room, and what she is not saying while she says something else.' },
    { id: 'warmth', name: 'Warmth', attribute: 'presence', description: 'Being easy to share a small flat with on a bad day.' },
    { id: 'candour', name: 'Candour', attribute: 'resolve', description: 'Saying the true thing while it is still early enough to matter.' },
    { id: 'cooking', name: 'Cooking', attribute: 'mind', description: 'Feeding somebody properly on a Tuesday, with what is in the fridge.' },
    { id: 'graft', name: 'Graft', attribute: 'might', description: 'The physical work a life needs. Shelves, boxes, eight flights when the lift is out.' },
    { id: 'improvise', name: 'Improvising', attribute: 'agility', description: 'Getting through a conversation you do not have the answers for.' },
    { id: 'recall', name: 'Recall', attribute: 'arcana', description: 'Catching the place where two versions of the same memory do not line up.' },
  ],
  /**
   * Three, all invisible.
   *
   * Energy is GOOD_HIGH because `resolveRest` restores those and a world with
   * none tells the player they rested and changes nothing — and because a
   * Saturday genuinely runs out. It is also what the generic cost path spends,
   * which is right: the price of a bad exchange in this world is that you have
   * less of the day left.
   *
   * The other two are descending because a marriage is not a bar you fill. It
   * is two things that get worse if nobody attends to them, and the interesting
   * play is noticing which one is moving.
   */
  resources: [
    {
      id: 'energy',
      name: 'Energy',
      max: 100,
      start: 80,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'Everything the player says comes out worse than they meant it. Not cruel — just flat, and late, and slightly beside the point. Hana can tell, and how she handles it is one of the better things about her.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing. The player is monosyllabic, misses jokes by a beat, and agrees to things to end conversations. This is the band where an ordinary domestic negotiation turns into a row over nothing, and where going to bed is genuinely the correct move.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a full day. Fine for one more errand and honest about not wanting to do two. Good for the sofa, bad for the family dinner. Nobody needs to remark on it unless somebody asks.',
        },
        {
          upTo: 100,
          behaviour:
            'The day is still in front of them. The player has the room to be curious, to cook something that takes an hour, to say the difficult thing well rather than bluntly. Scenes can be long and can go somewhere.',
        },
      ],
    },
    {
      id: 'unease',
      name: 'Her Unease',
      max: 100,
      start: 18,
      regenPerHour: -0.4,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Hana is entirely relaxed. She talks about five years from now as a thing that is obviously happening, leaves her sentences unfinished because she assumes the player has them, and falls asleep against them on the sofa mid-argument about a television programme.',
      color: '#8FB1C9',
      bands: [
        {
          upTo: 20,
          behaviour:
            'She is not watching for anything. Affectionate without deciding to be, physically easy, and willing to plan out loud — houses, holidays, whether they want children, what the spare room is for. This is the band where she volunteers things instead of being asked.',
        },
        {
          upTo: 50,
          behaviour:
            'She has noticed something and has decided to be reasonable about it. Warm, still funny, and checking. She asks the same question twice in a day in two different ways. She says "you would tell me, wouldn’t you" as a joke, and then does not laugh at the end of it.',
        },
        {
          upTo: 78,
          behaviour:
            'She has stopped assuming. She hears the player out and then rings Emi. She starts making arrangements that do not need anybody else — a bag at her brother’s, a viewing she does not mention. She is not cold and it would be easier if she were.',
        },
        {
          upTo: 100,
          behaviour:
            'She is being kind to somebody she is no longer counting on. Every warm thing she does is a decision rather than a reflex, and the player can feel the difference. She will answer any question honestly and will not ask any of her own.',
        },
      ],
    },
    {
      id: 'drift',
      name: 'Drift',
      max: 100,
      start: 34,
      regenPerHour: 0.15,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The two of them are actively building something. There are dates in a calendar that are not appointments, a project on the go, and an argument they keep having about the same happy thing.',
      color: '#7A9E7E',
      bands: [
        {
          upTo: 25,
          behaviour:
            'A life with momentum in it. Shared plans exist and get made in front of the player rather than announced to them. The bookshelf gets finished. The spare room becomes a thing rather than a storage problem. Scenes can be about doing something together and be satisfying on that alone.',
        },
        {
          upTo: 55,
          behaviour:
            'Companionable and slightly parallel. They are pleasant to each other in the kitchen and neither has suggested anything in a fortnight. The domestic detail is still warm; nothing in it is new. This is the ordinary, unalarming version, and it is where most of the story should live.',
        },
        {
          upTo: 100,
          behaviour:
            'Two people running separate weeks in one flat. Meals happen at different times. Plans are made individually and reported afterwards. Nobody has done anything wrong and there is nothing to point at, which is exactly what makes it hard to raise, and the fellowship starts to look to her like the only decision anybody is making.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'wedding_band',
      name: 'The Wedding Band',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description: 'Plain gold, worn thin on the inside, and a size too small for a finger that has grown around it. There is a date inside it and it is four years ago.',
      loreText: 'Hana has the matching one. Hers has a scratch across it from a car door in the second year, which she refuses to have polished out.',
      icon: 'ring',
    },
    {
      id: 'wedding_album',
      name: 'The Wedding Album',
      tags: ['document', 'personal'],
      description: 'Forty photographs of a small registry wedding and a long lunch afterwards. Everybody in it looks like they are having a genuinely good time, including you.',
      loreText: 'Eleven people. Emi is holding the flowers in nine of the pictures because Hana kept handing them to her.',
      icon: 'book',
    },
    {
      id: 'chipped_mug',
      name: 'The Chipped Mug',
      tags: ['personal'],
      description: 'Yours, apparently, for years. A hairline chip on the rim that you have learned to drink around without noticing, which you discover by noticing.',
      loreText: 'From a service station on the coast road. There is a matching one with a duck on it that Hana will not use in front of other people.',
      icon: 'mug',
    },
    {
      id: 'grocery_list',
      name: 'The Grocery List',
      tags: ['document'],
      skillModifiers: { attention: 1 },
      description: 'On the fridge, in two handwritings, with items crossed out by whoever bought them. Yours is the smaller, worse one.',
      loreText: 'The bottom third is an argument conducted entirely in shopping. "OAT MILK". "no". "OAT MILK".',
      icon: 'papers',
    },
    {
      id: 'hana_sketchbook',
      name: 'Hana’s Sketchbook',
      tags: ['personal', 'document'],
      skillModifiers: { attention: 2 },
      description: 'Site sections, stair details, and four pages near the back that are just the flat — this room, from the sofa, over and over, at different times of day.',
      loreText: 'The last drawing in it is dated three weeks ago and is a room neither of you has ever lived in.',
      icon: 'book',
    },
    {
      id: 'fellowship_letter',
      name: 'The Fellowship Letter',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A design fellowship, six months, another city, starting in nine weeks. It is an offer rather than an application, which means she got it, which means she applied.',
      loreText: 'There is a reply-by date on it and it is Thursday. The envelope has been opened and refolded enough times to be soft.',
      icon: 'letter',
    },
    {
      id: 'bookshelf_parts',
      name: 'The Half-Built Bookshelf',
      tags: ['home'],
      description: 'Six panels, a bag of screws, and an instruction sheet that somebody has annotated angrily in pencil. It has been in this state for five weeks.',
      loreText: 'The annotations are in your handwriting. One of them says "THIS IS NOT A SHELF, IT IS A LIE".',
      icon: 'tools',
    },
    {
      id: 'platform_ticket',
      name: 'The Odd Ticket',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { recall: 2 },
      description: 'A paper ticket stub for a service that ran at 01:11 from a platform this station does not have. The date on it is a Tuesday you cannot account for.',
      loreText: 'The ink is the wrong colour for this transit authority and has been since before this transit authority existed.',
      icon: 'ticket',
    },
  ],
  abilities: [
    {
      id: 'say_it_straight',
      name: 'Say It Straight',
      tags: ['social'],
      description: 'Tell somebody the true thing without dressing it up, and take whatever comes back.',
      affordances: ['tell her the truth', 'say it', 'confess', 'be honest', 'tell her i do not remember', 'come clean', 'admit it'],
      costs: [{ resourceId: 'energy', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'play_along',
      name: 'Play Along',
      tags: ['social'],
      description: 'Answer as though you know exactly what she is talking about, and read the rest off her face.',
      affordances: ['play along', 'pretend', 'bluff', 'go along with it', 'act normal', 'wing it'],
      costs: [{ resourceId: 'energy', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'improvise', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_room',
      name: 'Read the Room',
      tags: ['sight'],
      description: 'Work out what somebody actually means from what they are doing with their hands while they say it.',
      affordances: ['read her', 'watch her', 'look around', 'take it in', 'notice', 'study the room', 'look at the photos'],
      costs: [{ resourceId: 'energy', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'attention', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cook_for_her',
      name: 'Cook For Her',
      tags: ['utility'],
      description: 'Make something out of what is actually in the flat, and put it in front of somebody.',
      affordances: ['cook', 'make breakfast', 'make dinner', 'feed her', 'make something', 'take over the pan'],
      costs: [{ resourceId: 'energy', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'cooking', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'do_the_work',
      name: 'Do the Work',
      tags: ['utility'],
      description: 'Finish the physical thing that has been sitting there. The shelf, the boxes, the bulb on the landing.',
      affordances: ['build it', 'fix it', 'finish the bookshelf', 'do the washing', 'clear it out', 'carry it', 'sort the spare room'],
      costs: [{ resourceId: 'energy', amount: 14 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'graft', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ask_the_hard_one',
      name: 'Ask the Hard One',
      tags: ['social'],
      description: 'Put the question nobody in the room wants asked, and then be quiet long enough for it to get answered.',
      affordances: ['ask her directly', 'push', 'ask the question', 'press her', 'ask what is wrong', 'ask about the fellowship'],
      costs: [{ resourceId: 'energy', amount: 9 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 15 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'just_stay',
      name: 'Stay In It',
      tags: ['social'],
      description: 'Do not fix it, do not explain it, and do not leave the room. Sit down and be there.',
      affordances: ['stay', 'sit with her', 'hold her', 'say nothing', 'wait', 'just be there', 'let it be quiet'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'chase_the_seam',
      name: 'Chase the Seam',
      tags: ['sight'],
      description: 'Follow the place where two versions of the same memory do not line up, and see where it goes.',
      affordances: ['check the dates', 'compare it', 'follow it up', 'look into it', 'go to the station', 'chase it', 'find platform 11'],
      costs: [{ resourceId: 'energy', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'recall', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_seam'],
        lockedCopy: 'There is nothing to chase. There is a flat full of a life you cannot remember living, and that is not the same as a clue.',
      },
    },
  ],
  locations: [
    {
      id: 'the_kitchen',
      name: 'The Kitchen',
      shortName: 'Kitchen',
      description:
        'Four steps from the bed and the brightest room in the flat. Two mugs on the drainer, a list on the fridge in two handwritings, and a pan that somebody has been using long enough to know exactly which side of it runs hot.',
      artDirection:
        'Small bright modern apartment kitchen on a Saturday morning, sun across a counter, a pan on the hob, two mismatched mugs, a paper list stuck to the fridge, plants on the sill. Warm, lived-in, cream and amber.',
      connections: [
        { to: 'apartment_8b', travelMinutes: 1, label: 'Through to the living room' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'chipped_mug', qty: 1, ownerId: null, aka: ['mug', 'my mug', 'the chipped one', 'the cup'] },
        { itemId: 'grocery_list', qty: 1, ownerId: null, aka: ['list', 'the shopping list', 'the fridge list'] },
      ],
    },
    {
      id: 'apartment_8b',
      name: 'Apartment 8B',
      shortName: 'The Flat',
      description:
        'A living room with a good sofa and a bad rug, eight floors up over a street with a tram on it. Photographs on the shelf in the order they happened: a coast somewhere, a winter cabin, a registry office. A calendar in the hall with two people’s handwriting on it and a circle round the fourteenth.',
      artDirection:
        'Warm modern one-bedroom apartment living room, late morning light, a worn sofa with a folded blanket, framed photographs on a low shelf, a wall calendar, a half-built flatpack against the wall. Cosy and specific.',
      connections: [
        { to: 'the_kitchen', travelMinutes: 1, label: 'Back to the kitchen' },
        { to: 'the_spare_room', travelMinutes: 1, label: 'The other door' },
        { to: 'the_balcony', travelMinutes: 1, label: 'Out onto the balcony' },
        { to: 'aster_market', travelMinutes: 8, label: 'Down and out to the street' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'wedding_album', qty: 1, ownerId: null, aka: ['album', 'the wedding album', 'the photos', 'photo book'] },
        { itemId: 'bookshelf_parts', qty: 1, ownerId: null, aka: ['bookshelf', 'the flatpack', 'the shelf', 'the panels'] },
      ],
    },
    {
      id: 'the_spare_room',
      name: 'The Spare Room',
      shortName: 'Spare Room',
      description:
        'Eleven square metres containing a drying rack, four boxes nobody has opened since the move, a folded cot still in its packaging, and an exercise bike. Everything in here is a different answer to the same question, and none of them has won.',
      artDirection:
        'Small cluttered spare bedroom used as storage, unopened cardboard boxes, a drying rack, a flat-packed cot leaning against a wall, one window with the blind half down. Ordinary, slightly sad, full of possibility.',
      connections: [{ to: 'apartment_8b', travelMinutes: 1, label: 'Back through' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'hana_sketchbook', qty: 1, ownerId: 'hana', aka: ['sketchbook', 'her sketchbook', 'the drawings', 'her book'] },
      ],
    },
    {
      id: 'the_balcony',
      name: 'The Balcony',
      shortName: 'Balcony',
      description:
        'Big enough for two chairs if one person turns sideways. Three plants doing well, one plant that is a matter of ongoing dispute, and the whole of the tram line down to the river.',
      artDirection:
        'Narrow apartment balcony above a city street at dusk, two mismatched chairs, potted plants, string lights not switched on, tram wires and rooftops beyond. Intimate and slightly cramped.',
      connections: [{ to: 'apartment_8b', travelMinutes: 1, label: 'Back inside' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
    },
    {
      id: 'aster_market',
      name: 'Aster Market Street',
      shortName: 'The Street',
      description:
        'Four blocks of greengrocer, hardware shop, a bakery with a queue, and the launderette where the machines are better than the one in the building. Three separate people here know your name and one of them is going to ask about the bookshelf.',
      artDirection:
        'Busy neighbourhood shopping street on a Saturday, awnings, fruit crates, a bakery queue, tram tracks, people with bags. Bright, ordinary, densely detailed.',
      connections: [
        { to: 'apartment_8b', travelMinutes: 8, label: 'Back up to the flat' },
        { to: 'the_usual_place', travelMinutes: 4, label: 'The restaurant on the corner' },
        { to: 'riverside_park', travelMinutes: 9, label: 'Down to the park' },
        { to: 'central_station', travelMinutes: 12, label: 'The tram to Central' },
        { to: 'hana_studio', travelMinutes: 16, label: 'Out to her office' },
        { to: 'mori_house', travelMinutes: 24, label: 'Across town to her parents’' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [],
    },
    {
      id: 'the_usual_place',
      name: 'The Usual Place',
      shortName: 'Restaurant',
      description:
        'Nine tables, a specials board nobody has updated since spring, and a couple who run it and have opinions about the two of you. There is a table by the window that gets held back on a Friday without anybody arranging it.',
      artDirection:
        'Small warm neighbourhood restaurant at night, nine tables, paper cloths, a chalk specials board, one window table with the street beyond. Golden light, unfussy, familiar.',
      connections: [{ to: 'aster_market', travelMinutes: 4, label: 'Back onto the street' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
    },
    {
      id: 'riverside_park',
      name: 'Riverside Park',
      shortName: 'The Park',
      description:
        'A long green strip beside brown water, a running path, and a bench with a plaque on it that the two of you have a joke about. Somebody is always flying a kite badly.',
      artDirection:
        'City riverside park in the afternoon, plane trees, a running path, a bench, brown river, distant bridges, a kite. Green, breezy, unremarkable in a pleasant way.',
      connections: [{ to: 'aster_market', travelMinutes: 9, label: 'Back to the shops' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
    },
    {
      id: 'hana_studio',
      name: 'The Studio',
      shortName: 'Her Office',
      description:
        'One floor of a converted print works, eleven people, and a wall of models made out of card. Hana’s desk is the tidy one with a photograph of the coast on it and a mug she has never once taken home.',
      artDirection:
        'Small architecture studio in a converted industrial floor, north light, card models on a long shelf, drawing boards, eleven desks. Clean, creative, a bit cold.',
      connections: [{ to: 'aster_market', travelMinutes: 16, label: 'Back towards home' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [
        { itemId: 'fellowship_letter', qty: 1, ownerId: 'hana', aka: ['letter', 'the envelope', 'the fellowship letter', 'the offer'] },
      ],
    },
    {
      id: 'mori_house',
      name: 'The Mori House',
      shortName: 'Her Parents’',
      description:
        'A narrow house on a hill with too many shoes in the hall and a kitchen that runs at a volume nobody in it considers loud. Her mother will put food in front of you within ninety seconds of arrival whatever the hour.',
      artDirection:
        'Warm cluttered family house interior, crowded hallway of shoes, a busy kitchen doorway, framed school photographs up a staircase. Loud, generous, slightly overwhelming.',
      connections: [{ to: 'aster_market', travelMinutes: 24, label: 'The long way home' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 3 },
    },
    {
      id: 'central_station',
      name: 'Aster City Central',
      shortName: 'Central',
      description:
        'Ten platforms under a glass roof, a board that flicks, and a night staff of about four. Between one and two in the morning it is nearly silent and the cleaners talk to each other across the whole length of it.',
      artDirection:
        'Large old city railway station at night, glass roof, empty platforms, a mechanical departure board, one lit kiosk, a cleaner with a machine. Cavernous and calm.',
      connections: [
        { to: 'aster_market', travelMinutes: 12, label: 'The tram home' },
        { to: 'platform_eleven', travelMinutes: 3, lockedByFlag: 'found_platform_11', label: 'The stairs at the far end' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'platform_ticket', qty: 1, ownerId: null, aka: ['ticket', 'the stub', 'the odd ticket', 'the old ticket'] },
      ],
    },
    {
      id: 'platform_eleven',
      name: 'Platform 11',
      shortName: 'Platform 11',
      description:
        'A platform at the end of the station that the map does not have and the board does not list. The tiling is a decade older than everything either side of it. At 01:11 something arrives, and the people who get off it are not looking for anybody.',
      artDirection:
        'A disused railway platform lit by two working lamps, older tiling than the station around it, no signage, a train arriving out of complete darkness. Quiet, wrong, not frightening.',
      connections: [{ to: 'central_station', travelMinutes: 3, label: 'Back up the stairs' }],
      discoveredByDefault: false,
      mapPosition: { x: 0, y: 4 },
    },
  ],
  factions: [
    {
      id: 'faction_mori',
      name: 'The Mori Family',
      description: 'Her parents, her brother Kenji, two aunts, and a group chat with a name nobody can change. They took you in four years ago and have opinions about how you are doing.',
      startingReputation: 30,
      ranks: [
        { atReputation: 0, label: 'Married in' },
        { atReputation: 35, label: 'One of theirs' },
        { atReputation: 65, label: 'Asked first' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_your_people',
      name: 'The People From This Life',
      description: 'Whoever the version of you that lived here collected: a best friend, some colleagues, a five-a-side team. They remember things about you that you do not.',
      startingReputation: 25,
      ranks: [
        { atReputation: 0, label: 'Around' },
        { atReputation: 40, label: 'Counted on' },
        { atReputation: 70, label: 'Rung first' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'hana',
      name: 'Hana Mori',
      role: 'Your wife of four years. Product designer, and the person this whole life is arranged around',
      cardBlurb:
        'She has been married to you for four years, she is funny before she is anything else, and she is about to spend a week working out whether the person who woke up this morning is still the man she chose.',
      pronouns: 'she/her',
      publicTraits: ['Funny before she is anything else', 'Physically affectionate without deciding to be', 'Immovable about small things'],
      hiddenDrives: [
        'She wants to be wanted out loud and has decided that asking for it would be childish',
        'She is quietly testing whether this marriage can survive her having an ambition that is only hers',
      ],
      values: [
        'Being told a thing while there is still time to do something about it',
        'Making things rather than only owning them — rooms, meals, drawings, plans',
      ],
      fears: [
        'Being the only one carrying the marriage and not noticing for another two years',
        'That she is the sort of person who leaves, and has simply been well behaved so far',
      ],
      socialStyle:
        'Jokes first and means it second. Touches your arm while saying the hard thing, so you cannot tell from her face how serious it is.',
      boundaries: [
        'Will not be managed. Decide something about her life for her and she will not fight you — she will go quiet and start planning around you',
        'Will not perform being fine to keep a nice morning going',
      ],
      goals: [
        'Get through this weekend without the strange feeling turning into a real problem',
        'Say the fellowship out loud before Thursday decides it for her',
      ],
      secrets: [
        {
          id: 'hana_fellowship',
          fact: 'She has been offered a six-month design fellowship in another city, starting in nine weeks. She has not told the player because they spent the spring agreeing to settle down.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you herself on the balcony, late, if you have asked her one real question about her own week rather than about the marriage.',
        },
        {
          id: 'hana_the_photograph',
          fact: 'There is a photograph from the coast trip in which the player is standing slightly wrong — a different jacket, the wrong hand in the wrong pocket. She noticed a year ago and has never said so to anybody.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if the player has been to the station at night and comes home and does not lie about where they were.',
        },
      ],
      speechStyle:
        'Quick, warm, lightly sarcastic. Undercuts her own serious lines by half a step. Pet names arrive naturally and not in every sentence. Asks questions she already has the answer to, to see what you do with them.',
      topics: ['the fellowship', 'the spare room', 'the bookshelf', 'her work', 'the coast trip', 'your anniversary', 'her brother'],
      voiceSamples: [
        'Pancakes or eggs. Choose carefully, this determines the rest of our marriage.',
        'You have got your serious face on. Is it a serious thing or is it the face you do about bins.',
        'I am not upset. I am doing the thing where I am not upset yet and you have about four minutes.',
        'I applied in February. I did not tell you in February, and I have thought about that every day since, and I would rather you were angry than kind about it.',
      ],
      appearance:
        'Twenty-six, long chestnut hair usually up and held with whatever was nearest, warm hazel eyes, an oversized sleep shirt at this hour and very good coats at every other.',
      visualHook: 'Hair pinned up with a drawing pencil, which she forgets about and takes to work.',
      silhouette: 'Barefoot, one hip against a counter, arms folded, head tipped.',
      artSeed: 'gmh-hana-01',
      portrait: null,
      expressions: ['neutral', 'teasing', 'warm', 'worried', 'hurt'],
      schedule: [
        { startMinute: 0, endMinute: 450, locationId: 'apartment_8b', activity: 'asleep, taking most of the duvet' },
        { startMinute: 450, endMinute: 620, locationId: 'the_kitchen', activity: 'making breakfast badly and on purpose' },
        { startMinute: 620, endMinute: 780, locationId: 'apartment_8b', activity: 'on the sofa with a drawing on her knees' },
        { startMinute: 780, endMinute: 1020, locationId: 'aster_market', activity: 'the shops, the launderette, the bakery queue' },
        { startMinute: 1020, endMinute: 1200, locationId: 'the_kitchen', activity: 'cooking properly, with the radio on' },
        { startMinute: 1200, endMinute: 1320, locationId: 'the_balcony', activity: 'out on the balcony with a glass of something' },
        { startMinute: 1320, endMinute: 1440, locationId: 'apartment_8b', activity: 'watching something she has seen before' },
      ],
      homeLocationId: 'apartment_8b',
      knowledgeScope: ['hana', 'apartment_8b', 'the_wedding', 'aster_city', 'emi', 'fellowship', 'spare_room', 'shared_trips'],
      startingRelationship: { trust: 60, affection: 70, respect: 45, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'hana_tells_you_about_it',
          label: 'She tells you about the fellowship herself',
          kind: 'TRUST',
          requires: { trust: 65, flagsSet: ['first_morning_over'] },
        },
        {
          id: 'hana_believes_you',
          label: 'She stops treating the memory thing as a bit',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['she_knows'] },
        },
        {
          id: 'hana_all_in',
          label: 'She plans out loud again',
          kind: 'ROMANCE',
          requires: { trust: 70, affection: 75 },
        },
      ],
      attributes: { might: 9, agility: 11, mind: 15, presence: 15, resolve: 13, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'emi',
      name: 'Emi Takeda',
      role: 'Hana’s closest friend since art school, and not yours',
      cardBlurb:
        'She has known Hana eleven years and you four, and if it ever comes to picking she is not going to pick you. She is also the only person who will tell you what you are doing wrong while you are still able to stop.',
      pronouns: 'she/her',
      publicTraits: ['Direct to the point of rudeness', 'Notices everything', 'Extremely funny about other people’s marriages'],
      hiddenDrives: ['She has been the person who knew and said nothing once before, and it cost her a friendship she has not replaced'],
      values: ['Saying it to your face', 'Hana getting what she actually wants rather than what is convenient'],
      fears: ['Being the reason a good thing ended', 'Being kept at the edge of the lives she is closest to'],
      socialStyle: 'Arrives without warning, makes herself tea, and asks the question you have been avoiding within ninety seconds.',
      boundaries: [
        'Will not tell you Hana’s business, however you ask — but she will tell you that there is some',
        'Will not be used as a way to reach Hana without going through Hana',
      ],
      goals: ['Get Hana to say the fellowship out loud', 'Work out what is actually wrong with you this week'],
      secrets: [
        {
          id: 'emi_knows',
          fact: 'She has known about the fellowship since February, helped with the portfolio, and has been telling Hana to tell you for four months.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She lets it go if the player asks her straight what she thinks is going on, instead of asking her what Hana said.',
        },
      ],
      speechStyle:
        'Blunt declaratives, then a long amused pause to let you sit in it. Answers the question you should have asked instead of the one you did.',
      topics: ['Hana', 'the fellowship', 'art school', 'your wedding', 'what you were like before'],
      voiceSamples: [
        'You are being weird. Not bad weird. Just weird enough that I have noticed and I am nosy.',
        'I am not telling you what she said. I am telling you that she said something, and that you should have been the one she said it to.',
        'Four years ago you gave a speech at your own wedding that was ninety seconds long and made her mother cry. You are not going to make me nostalgic about you at eleven in the morning.',
      ],
      appearance: 'Twenty-seven, short bleached hair with the roots grown out on purpose, rings on most fingers, an enormous coat in all weathers.',
      visualHook: 'A vast overcoat she never takes off indoors, worn over everything, in every season.',
      silhouette: 'Wide-shouldered in the coat, always holding somebody else’s mug.',
      artSeed: 'gmh-emi-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'unimpressed'],
      schedule: [
        { startMinute: 0, endMinute: 540, locationId: 'riverside_park', activity: 'asleep at her own flat across the park' },
        { startMinute: 540, endMinute: 900, locationId: 'hana_studio', activity: 'freelancing off a corner of somebody else’s desk' },
        { startMinute: 900, endMinute: 1140, locationId: 'aster_market', activity: 'buying one thing and staying an hour' },
        { startMinute: 1140, endMinute: 1320, locationId: 'apartment_8b', activity: 'on your sofa, uninvited, with your tea' },
        { startMinute: 1320, endMinute: 1440, locationId: 'the_usual_place', activity: 'at the bar end of the restaurant' },
      ],
      homeLocationId: 'riverside_park',
      knowledgeScope: ['hana', 'emi', 'fellowship', 'the_wedding', 'aster_city'],
      startingRelationship: { trust: 35, affection: 30, respect: 25, fear: 0, rivalry: 5 },
      gates: [
        {
          id: 'emi_levels_with_you',
          label: 'She tells you there is something to know',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'emi_picks_you_too',
          label: 'She starts treating you as her friend rather than Hana’s husband',
          kind: 'ALLIANCE',
          requires: { trust: 60, affection: 45 },
        },
      ],
      attributes: { might: 10, agility: 12, mind: 15, presence: 14, resolve: 14, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'kenji',
      name: 'Kenji Mori',
      role: 'Hana’s older brother. Runs a flooring firm with four vans and eleven opinions',
      cardBlurb:
        'He genuinely likes you, has lent you a van twice, and would drop all of that in an afternoon if he decided you were making his sister smaller. He is also the only person in this family who will tell you the truth about it.',
      pronouns: 'he/him',
      publicTraits: ['Practical about everything', 'Teases relentlessly and affectionately', 'Physically incapable of sitting still in a house'],
      hiddenDrives: ['He is holding a version of their parents’ marriage that Hana was too young to see, and he has decided she never needs to'],
      values: ['Turning up when somebody needs a van', 'Not making a thing of it'],
      fears: ['His sister ending up where their mother nearly did', 'Being the one who has to say it out loud'],
      socialStyle: 'Talks while doing something else with his hands. Serious conversations happen in a vehicle or over a job.',
      boundaries: [
        'Will not badmouth Hana to you, ever, including when he agrees with you',
        'Will not discuss their parents in the house',
      ],
      goals: ['Get the family through the anniversary without anybody crying', 'Work out why you have been odd since Saturday'],
      secrets: [
        {
          id: 'kenji_the_year',
          fact: 'Their parents separated for eleven months when Hana was nine and she was told it was a work posting. Kenji was fourteen and was told nothing at all, which is how he knows.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'In the van, on the way back from somewhere, if the player has admitted something true about their own marriage first.',
        },
      ],
      speechStyle:
        'Short sentences, trade vocabulary, punchlines delivered flat while measuring something. Uses "mate" as punctuation and once as a warning.',
      topics: ['the flat', 'the bookshelf', 'his vans', 'your anniversary', 'their parents', 'Hana'],
      voiceSamples: [
        'That is not level. It has never been level. You have been looking at that not being level for five weeks.',
        'She was seven when she decided she was going to design buildings. Seven. I was going to be a helicopter.',
        'I like you, mate. I want to be clear I like you, because of what I am about to ask.',
      ],
      appearance: 'Thirty-one, built like somebody who lifts flooring for a living, a firm fleece over everything, a pencil behind one ear at all times.',
      visualHook: 'A carpenter’s pencil behind his ear, indoors, at dinner, at a wedding.',
      silhouette: 'Broad, forward-leaning, one hand always holding a tool or a mug or a doorframe.',
      artSeed: 'gmh-kenji-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'serious'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'mori_house', activity: 'asleep at his own place two streets from his parents' },
        { startMinute: 330, endMinute: 1020, locationId: 'aster_market', activity: 'on a job, van double-parked, arguing with a supplier' },
        { startMinute: 1020, endMinute: 1140, locationId: 'the_usual_place', activity: 'eating too fast at the corner table' },
        { startMinute: 1140, endMinute: 1320, locationId: 'mori_house', activity: 'at his parents’, fixing something nobody asked him to' },
        { startMinute: 1320, endMinute: 1440, locationId: 'mori_house', activity: 'not going home yet' },
      ],
      homeLocationId: 'mori_house',
      knowledgeScope: ['hana', 'the_mori_family', 'aster_city', 'spare_room', 'the_wedding'],
      startingRelationship: { trust: 45, affection: 35, respect: 40, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'kenji_in_the_van',
          label: 'He tells you about the eleven months',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:what_you_want'] },
        },
        {
          id: 'kenji_backs_you',
          label: 'He takes your side in front of the family',
          kind: 'ALLIANCE',
          requires: { trust: 60, respect: 55 },
        },
      ],
      attributes: { might: 15, agility: 11, mind: 12, presence: 13, resolve: 14, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'lucia',
      name: 'Lucia Vale',
      role: 'Your best friend in this life, which is a fact you are taking on trust',
      cardBlurb:
        'She has eleven years of stories about you that you cannot confirm, she is the only person you can be strange in front of without it costing anything, and she has already worked out that something is wrong.',
      pronouns: 'she/her',
      publicTraits: ['Allergic to sincerity for longer than nine seconds', 'Reliable in an emergency and nowhere else', 'Remembers everything'],
      hiddenDrives: ['She has been the third wheel to this marriage for four years and has never once let on how much she needs it to hold'],
      values: ['Turning up', 'Not making somebody explain themselves before they are ready'],
      fears: ['Being the friend people grow out of', 'Finding out she has been wrong about somebody for eleven years'],
      socialStyle: 'Deflects sincerity with a joke, then answers the serious question about a minute later, as if it had not been asked.',
      boundaries: [
        'Will not lie to Hana for you, and will tell you that up front rather than after',
        'Will not be asked to pick a side and will simply stop answering the phone if you make her',
      ],
      goals: ['Find out what happened to you between Friday and Saturday', 'Get the three of you back to the Friday table'],
      secrets: [
        {
          id: 'lucia_the_wrong_memory',
          fact: 'She remembers a night on the coast road that the player has no version of, and a detail in it — a jacket, a second car — that does not match the photograph in the flat.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She brings it up herself, badly and as a joke, if the player has already admitted to her that their memory is wrong.',
        },
      ],
      speechStyle:
        'Fast, glancing, allergic to a straight compliment. Delivers the important sentence while looking at something else and then changes the subject immediately.',
      topics: ['who you used to be', 'the coast road', 'Hana', 'your job', 'the Friday table'],
      voiceSamples: [
        'You have got the face on. The one from the thing. You know the one. Do not make me describe it, I will do the face.',
        'Eleven years, and the only two secrets you have ever kept were mine. So whatever this is, get on with it.',
        'It was a black jacket. I know it was a black jacket, because I was cold and you would not give it to me, and I have been holding that against you since March.',
      ],
      appearance: 'Twenty-nine, dark curls kept short, work boots with everything, a phone she answers on the ninth ring on principle.',
      visualHook: 'Battered steel-toed work boots worn with absolutely everything, including a wedding.',
      silhouette: 'Hands in pockets, weight on one leg, half turned away as if about to go.',
      artSeed: 'gmh-lucia-01',
      portrait: null,
      expressions: ['neutral', 'laughing', 'thrown'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'aster_market', activity: 'asleep above the hardware shop' },
        { startMinute: 480, endMinute: 1080, locationId: 'aster_market', activity: 'behind the counter at the hardware shop' },
        { startMinute: 1080, endMinute: 1260, locationId: 'riverside_park', activity: 'running the river path badly' },
        { startMinute: 1260, endMinute: 1380, locationId: 'the_usual_place', activity: 'at the Friday table whether or not it is Friday' },
        { startMinute: 1380, endMinute: 1440, locationId: 'central_station', activity: 'walking home the long way through the station' },
      ],
      homeLocationId: 'aster_market',
      knowledgeScope: ['the_player_before', 'aster_city', 'shared_trips', 'hana', 'the_wedding'],
      startingRelationship: { trust: 55, affection: 50, respect: 40, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'lucia_says_the_thing',
          label: 'She tells you about the coast road',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['knows:the_gap'] },
        },
      ],
      attributes: { might: 12, agility: 13, mind: 13, presence: 13, resolve: 12, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'nao',
      name: 'Nao Ibarra',
      role: 'Night supervisor at the station, and the only person who will say the platform number out loud',
      cardBlurb:
        'She works the hours when the station is empty, she keeps a notebook of everybody who has ever asked her about the platform at the far end, and if you ask her she will want to write your name in it.',
      pronouns: 'she/her',
      publicTraits: ['Precise', 'Unhurried', 'Entirely unbothered by being disbelieved'],
      hiddenDrives: ['She wants one other person to see it while she is still working there, so that it is not only hers'],
      values: ['Saying exactly as much as the evidence supports', 'Not sending anybody down there unprepared'],
      fears: ['Being retired before anybody believes her', 'Somebody going down and not coming back on her shift'],
      socialStyle: 'Answers a question with the part she can prove, then stops, and does not fill the silence afterwards.',
      boundaries: [
        'Will not speculate, and will say "I do not know" as a complete sentence',
        'Will not take anybody down there who has not told her why they want to go',
      ],
      goals: ['Get one corroborated account into the notebook', 'Keep the platform out of the timetable for another year'],
      secrets: [
        {
          id: 'nao_the_notebook',
          fact: 'The notebook has thirty-one names in it over nineteen years. Four of them came back and asked her to take their entry out.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows it to anybody who tells her something specific and checkable about their own discontinuity.',
        },
      ],
      speechStyle:
        'Short, exact, no adjectives she cannot defend. Gives times to the minute. Ends on a full stop rather than a question, and waits.',
      topics: ['the platform', 'the 01:11', 'the notebook', 'the night shift', 'people who come back'],
      voiceSamples: [
        'It arrives at eleven minutes past one. Not every night. I have nineteen years of when, and no years of why.',
        'I do not know. That is the whole answer, and I would rather give you that than a better one.',
        'Thirty-one names. Four of them came back and asked me to take theirs out, and I did, and I remember all four anyway.',
      ],
      appearance: 'Fifties, transit authority coat two sizes up, reading glasses on a cord, a hardbacked notebook in the outside pocket.',
      visualHook: 'A hardbacked notebook, rubber-banded shut, always in the same outside coat pocket.',
      silhouette: 'Square and still, hands behind her back, standing at the exact centre of a platform.',
      artSeed: 'gmh-nao-01',
      portrait: null,
      expressions: ['neutral', 'attentive', 'sorry'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'central_station', activity: 'the quiet half of the night shift' },
        { startMinute: 360, endMinute: 480, locationId: 'central_station', activity: 'handing over to the morning staff' },
        { startMinute: 480, endMinute: 1140, locationId: 'riverside_park', activity: 'asleep in a flat that faces the wrong way for it' },
        { startMinute: 1140, endMinute: 1320, locationId: 'aster_market', activity: 'shopping for the night, at the end of everybody else’s day' },
        { startMinute: 1320, endMinute: 1440, locationId: 'central_station', activity: 'signing on' },
      ],
      homeLocationId: 'central_station',
      knowledgeScope: ['platform_11', 'aster_city', 'central_station', 'the_notebook'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'nao_shows_the_book',
          label: 'She shows you the notebook',
          kind: 'TRUST',
          requires: { trust: 25, flagsSet: ['knows:the_seam'] },
        },
        {
          id: 'nao_takes_you_down',
          label: 'She takes you to the far end of the station',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
      ],
      attributes: { might: 10, agility: 9, mind: 15, presence: 12, resolve: 16, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_this_morning',
      title: 'Good Morning, Husband',
      summary: 'There is a woman in your kitchen who has been your wife for four years, and she has asked you a question about pancakes.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['hana'],
      involvedLocationIds: ['the_kitchen', 'apartment_8b'],
      knownRewardCopy: 'Some idea of what this life is, and whether she knows anything is wrong with it.',
      steps: [
        {
          id: 'the_kitchen_scene',
          playerCopy: 'Get through the first ten minutes of a marriage you do not remember.',
          directorNotes:
            'She is cooking and expects the ordinary Saturday she has had two hundred times. Every route here is a real way to handle it and none of them is wrong. Do not have her guess the truth: if the player tells her, she assumes it is a joke first, because that is what the two of them do. Whatever the player does, she reacts to the specific thing rather than to the premise.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_her',
              label: 'Tell her you have no idea who she is',
              predicate: { flagsSet: ['used:say_it_straight'] },
              setsFlags: ['she_knows', 'told_her_first_thing'],
              closesFlags: ['playing_along'],
            },
            {
              routeId: 'went_looking',
              label: 'Say nothing and go through the flat',
              predicate: { flagsSet: ['used:read_the_room'] },
              setsFlags: ['searched_the_flat'],
              closesFlags: [],
            },
            {
              routeId: 'made_breakfast',
              label: 'Take the pan off her and cook',
              predicate: { flagsSet: ['used:cook_for_her'] },
              setsFlags: ['playing_along', 'started_well'],
              closesFlags: [],
            },
            {
              routeId: 'played_along',
              label: 'Answer as though you know exactly what she means',
              predicate: { flagsSet: ['used:play_along'] },
              setsFlags: ['playing_along'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['knows:the_gap'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_rest_of_saturday',
          playerCopy: 'Find out what kind of life this actually is.',
          directorNotes:
            'The ordinary Saturday. Shops, laundry, the bookshelf, the sofa, an argument about nothing. This step is where the world proves it is worth keeping, and it should be pleasant. Nothing forces itself on the player here — if they spend the whole of it doing errands with her and being funny, that is the intended experience and not a delay.',
          enterWhen: { flagsSet: ['knows:the_gap'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'spent_it_with_her',
              label: 'Spend the day with her',
              predicate: { flagsSet: ['spoke:hana'], minRelationship: [{ characterId: 'hana', dimension: 'affection', value: 72 }] },
              setsFlags: ['good_saturday', 'she_relaxed'],
              closesFlags: [],
            },
            {
              routeId: 'went_and_asked_around',
              label: 'Go and find somebody who knew you',
              predicate: { flagsSet: ['spoke:lucia'] },
              setsFlags: ['good_saturday', 'asked_lucia'],
              closesFlags: [],
            },
            {
              routeId: 'did_something_about_the_flat',
              label: 'Fix something in the flat that has been waiting',
              predicate: { flagsSet: ['used:do_the_work'] },
              setsFlags: ['good_saturday', 'bookshelf_done'],
              closesFlags: [],
            },
            {
              routeId: 'kept_to_yourself',
              label: 'Keep your head down and watch',
              predicate: { flagsSet: ['used:read_the_room'] },
              setsFlags: ['quiet_saturday'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['first_morning_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_your_people', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_the_fellowship',
      title: 'The Thing She Has Not Said',
      summary: 'Six months, another city, starting in nine weeks. There is a reply-by date on it and it is Thursday.',
      kind: 'MAIN',
      involvedCharacterIds: ['hana', 'emi'],
      involvedLocationIds: ['apartment_8b', 'the_balcony', 'hana_studio'],
      knownRewardCopy: 'The thing your wife has been carrying since February, and a decision the two of you have to make in the same room.',
      discoverWhen: { flagsSet: ['first_morning_over'] },
      steps: [
        {
          id: 'find_out',
          playerCopy: 'Find out what Hana is not telling you.',
          directorNotes:
            'Three incompatible ways to learn it, and they are not equivalent. Being told is the version where the marriage works. Finding the letter is the version where the player knows something they were not given. Getting it out of Emi is the version where Hana finds out that her best friend told her husband before she did, and she is entitled to be furious about that.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_tells_you',
              label: 'She tells you herself, on the balcony',
              predicate: {
                flagsSet: ['used:ask_the_hard_one'],
                minRelationship: [{ characterId: 'hana', dimension: 'trust', value: 65 }],
              },
              setsFlags: ['knows:the_fellowship', 'hana_told_you'],
              closesFlags: ['found_the_letter', 'emi_told_you'],
            },
            {
              routeId: 'emi_tells_you',
              label: 'Get it out of Emi Takeda',
              predicate: { minRelationship: [{ characterId: 'emi', dimension: 'trust', value: 45 }] },
              setsFlags: ['knows:the_fellowship', 'emi_told_you'],
              closesFlags: ['hana_told_you'],
            },
            {
              routeId: 'found_the_letter',
              label: 'Find the letter at her studio',
              predicate: { hasItems: ['fellowship_letter'] },
              setsFlags: ['knows:the_fellowship', 'found_the_letter'],
              closesFlags: ['hana_told_you'],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['fellowship_on_the_table'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_you_do_about_it',
          playerCopy: 'Decide, together, what happens in nine weeks.',
          directorNotes:
            'This is a negotiation between two people who both want something reasonable, not a test with a correct answer. She will not be managed: a player who decides for her gets agreement and then a quieter marriage. Every route is survivable and none of them is the good ending on its own.',
          enterWhen: { flagsSet: ['fellowship_on_the_table'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'you_moved_with_her',
              label: 'Go with her',
              predicate: {
                flagsSet: ['knows:what_you_want'],
                minRelationship: [{ characterId: 'hana', dimension: 'affection', value: 78 }],
              },
              setsFlags: ['she_took_it', 'you_moved_with_her'],
              closesFlags: ['she_turned_it_down'],
            },
            {
              routeId: 'she_goes',
              label: 'She takes it and you hold the flat',
              predicate: { minRelationship: [{ characterId: 'hana', dimension: 'trust', value: 60 }] },
              setsFlags: ['she_took_it'],
              closesFlags: ['she_turned_it_down'],
            },
            {
              routeId: 'she_stays',
              label: 'She turns it down',
              predicate: { flagsSet: ['knows:the_fellowship'] },
              setsFlags: ['she_turned_it_down'],
              closesFlags: ['she_took_it'],
            },
          ],
          rewards: {
            xp: 170,
            items: [],
            flags: ['fellowship_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_mori', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_spare_room',
      title: 'Eleven Square Metres',
      summary: 'A drying rack, four unopened boxes, a flat-packed cot and an exercise bike. Every one of them is a different answer.',
      kind: 'SIDE',
      involvedCharacterIds: ['hana', 'kenji'],
      involvedLocationIds: ['the_spare_room', 'apartment_8b'],
      knownRewardCopy: 'A decision about the room, which is a decision about several larger things nobody has said out loud.',
      discoverWhen: { flagsSet: ['knows:the_gap'] },
      steps: [
        {
          id: 'decide_what_it_is',
          playerCopy: 'Work out what the spare room is for.',
          directorNotes:
            'Nobody in this flat has said the word "children" in about a year and both of them have been thinking about it. The cot has been in its packaging for eight months and neither of them has moved it or thrown it out. The player can settle this any way at all, including by throwing everything out and leaving it empty, and Hana has a real reaction to each.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'made_it_hers',
              label: 'Give the room to her drawing',
              predicate: { flagsSet: ['used:do_the_work'], hasItems: ['hana_sketchbook'] },
              setsFlags: ['spare_room_settled', 'room_is_a_studio'],
              closesFlags: ['room_is_a_nursery'],
            },
            {
              routeId: 'talked_about_children',
              label: 'Say the thing about the cot',
              predicate: {
                flagsSet: ['used:ask_the_hard_one'],
                minRelationship: [{ characterId: 'hana', dimension: 'trust', value: 68 }],
              },
              setsFlags: ['spare_room_settled', 'room_is_a_nursery'],
              closesFlags: ['room_is_a_studio'],
            },
            {
              routeId: 'cleared_it_out',
              label: 'Empty it and leave it empty',
              predicate: { flagsSet: ['used:do_the_work'] },
              setsFlags: ['spare_room_settled', 'room_is_empty'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['knows:what_you_want'],
            abilities: [],
            reputation: [{ factionId: 'faction_mori', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_what_this_becomes',
      title: 'What This Becomes',
      summary: 'Four years in, with everything on the table, the two of you have to say what you are to each other now.',
      kind: 'MAIN',
      involvedCharacterIds: ['hana', 'emi', 'kenji'],
      involvedLocationIds: ['apartment_8b', 'the_balcony', 'the_usual_place'],
      knownRewardCopy: 'An answer, arrived at by both of you, about whether this marriage continues and in what shape.',
      discoverWhen: { flagsSet: ['fellowship_decided'] },
      steps: [
        {
          id: 'say_what_it_is',
          playerCopy: 'Say what the two of you are now.',
          directorNotes:
            'Four ways this can land and not one of them is a failure. Ending it honestly is as valid as recommitting, and the player should never be told otherwise by the prose. Drifting apart is what happens when nobody says anything, which means it is reachable by inaction and must be written as a real outcome rather than a punishment.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'recommitted',
              label: 'Choose each other again, out loud',
              predicate: {
                flagsSet: ['knows:what_you_want'],
                minRelationship: [{ characterId: 'hana', dimension: 'affection', value: 80 }],
              },
              setsFlags: ['chose_each_other'],
              closesFlags: ['separated'],
            },
            {
              routeId: 'started_over',
              label: 'End the marriage and start again from the beginning',
              predicate: {
                flagsSet: ['she_knows'],
                minRelationship: [{ characterId: 'hana', dimension: 'affection', value: 62 }],
              },
              setsFlags: ['separated', 'dating_again'],
              closesFlags: ['chose_each_other'],
            },
            {
              routeId: 'separated_kindly',
              label: 'End it honestly, while you still like each other',
              predicate: { flagsSet: ['used:say_it_straight'] },
              setsFlags: ['separated', 'ended_honestly'],
              closesFlags: ['chose_each_other'],
            },
            {
              routeId: 'drifted',
              label: 'Let it end without anybody saying so',
              predicate: { flagsSet: ['fellowship_decided'] },
              setsFlags: ['separated', 'ended_by_attrition'],
              closesFlags: ['chose_each_other'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['knows:what_this_is'],
            abilities: [],
            reputation: [{ factionId: 'faction_mori', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_platform_eleven',
      title: 'Platform 11',
      summary: 'A ticket for a service at eleven minutes past one, from a platform this station does not have.',
      kind: 'LEAD',
      involvedCharacterIds: ['nao', 'lucia', 'hana'],
      involvedLocationIds: ['central_station', 'platform_eleven'],
      knownRewardCopy: 'An explanation, of a kind, for a morning nothing caused.',
      discoverWhen: { flagsSet: ['knows:the_seam'] },
      steps: [
        {
          id: 'find_the_platform',
          playerCopy: 'Find the platform at the far end of Aster City Central.',
          directorNotes:
            'This entire quest is optional and must feel like it. A player who never sets `knows:the_seam` never sees a single beat of it, and the ordinary Saturday is the complete game. For a player who is here, keep it quiet and physical rather than eerie — tiling, timetables, a woman with a notebook. Nobody explains a mechanism, because nobody in this world knows one.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'nao_takes_you',
              label: 'Get Nao Ibarra to take you down',
              predicate: {
                flagsSet: ['used:chase_the_seam'],
                minRelationship: [{ characterId: 'nao', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['found_platform_11', 'nao_vouched'],
              closesFlags: [],
            },
            {
              routeId: 'went_alone',
              label: 'Go down there on your own with the ticket',
              predicate: { hasItems: ['platform_ticket'], flagsSet: ['visited:central_station'] },
              setsFlags: ['found_platform_11', 'went_alone'],
              closesFlags: ['nao_vouched'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['knows:what_happened'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_choice',
          playerCopy: 'Decide whether you are getting on it.',
          directorNotes:
            'The 01:11 goes somewhere and nobody can tell the player where. Going back is not a win and staying is not a surrender. What matters is whether the player has anything here they would be leaving, which is a question the last several hours of play have already answered.',
          enterWhen: { flagsSet: ['found_platform_11'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_back',
              label: 'Get on it',
              predicate: { atLocation: 'platform_eleven', flagsSet: ['used:chase_the_seam'] },
              setsFlags: ['went_back'],
              closesFlags: ['chose_to_stay'],
            },
            {
              routeId: 'stayed',
              label: 'Let it go without you',
              predicate: { atLocation: 'platform_eleven' },
              setsFlags: ['chose_to_stay'],
              closesFlags: ['went_back'],
            },
          ],
          rewards: {
            xp: 180,
            items: [],
            flags: ['platform_answered'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_emi_arrives',
      atWorldMinute: 15 * 60 + 20,
      locationId: 'apartment_8b',
      publicCopy:
        'Emi Takeda lets herself in with a key she has had for three years, says "it is only me" to the whole flat, and puts the kettle on before taking her coat off.',
      directorNotes:
        'She is here because Hana asked her to come and did not say why. She will spend forty minutes being funny and about ninety seconds being direct, and the direct part is aimed at the player.',
      setsFlags: ['emi_came_round'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'emi', toLocationId: 'apartment_8b' }],
    },
    {
      id: 'we_the_wrong_photograph',
      atWorldMinute: 21 * 60 + 10,
      locationId: 'apartment_8b',
      publicCopy:
        'The third photograph on the shelf is the coast trip. In it you are wearing a black jacket. The black jacket is not in this flat and never has been.',
      directorNotes:
        'The first genuine seam, and it only exists for a player who went through the flat this morning. Do not make it ominous. It is a small factual wrongness in a warm room, and the correct reaction is mild confusion rather than dread.',
      setsFlags: ['knows:the_seam'],
      cancelledByFlags: [],
      requiresFlags: ['searched_the_flat'],
      movesCharacters: [],
    },
    {
      id: 'we_the_last_train',
      atWorldMinute: 1440 + 60 + 6,
      locationId: 'central_station',
      publicCopy:
        'The board flicks over to the last service and then flicks once more, to a departure at 01:11 from a platform that is not on the board a second later.',
      directorNotes:
        'Only for a player who has gone to the station at night, which is already a strange thing to do on the first weekend of a marriage you cannot remember. Nao Ibarra is forty feet away and has seen the player see it.',
      setsFlags: ['knows:the_seam'],
      cancelledByFlags: [],
      requiresFlags: ['visited:central_station'],
      movesCharacters: [{ characterId: 'nao', toLocationId: 'central_station' }],
    },
    {
      id: 'we_kenji_asks',
      atWorldMinute: 1440 + 12 * 60,
      locationId: 'aster_market',
      publicCopy:
        'Kenji Mori’s van is double-parked outside the bakery, and he is leaning on it waiting for you rather than for anybody else.',
      directorNotes:
        'Hana has said something to her mother, her mother has said something to Kenji, and Kenji has decided to handle it himself in the least confrontational way available, which is a lift somewhere in a van.',
      setsFlags: ['kenji_noticed'],
      cancelledByFlags: [],
      requiresFlags: ['first_morning_over'],
      movesCharacters: [{ characterId: 'kenji', toLocationId: 'aster_market' }],
    },
    {
      id: 'we_family_dinner',
      atWorldMinute: 2 * 1440 + 18 * 60 + 30,
      locationId: 'mori_house',
      publicCopy:
        'Sunday dinner at the Mori house, which is not optional, and at which eleven people will ask you the same four questions in rotation.',
      directorNotes:
        'Warm, loud, and slightly too much. Her mother is delighted. Kenji watches. Whatever the player has decided to be this week is legible to this room within about twenty minutes, and somebody will say so in the kitchen.',
      setsFlags: ['family_dinner_happened'],
      cancelledByFlags: [],
      requiresFlags: ['first_morning_over'],
      movesCharacters: [
        { characterId: 'kenji', toLocationId: 'mori_house' },
        { characterId: 'hana', toLocationId: 'mori_house' },
      ],
    },
    {
      id: 'we_the_deadline',
      atWorldMinute: 5 * 1440 + 9 * 60,
      locationId: null,
      publicCopy:
        'Thursday. Somewhere across the city an offer that has been sitting open since February stops being open at the end of the working day.',
      directorNotes:
        'If the fellowship has not been discussed, Hana will spend today being extremely normal, and will be somewhere else for two hours in the afternoon. She lets it lapse without saying so, and something goes out of her that does not come back on its own.',
      setsFlags: ['deadline_passed'],
      cancelledByFlags: ['fellowship_decided'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_anniversary',
      atWorldMinute: 7 * 1440 + 8 * 60,
      locationId: 'apartment_8b',
      publicCopy:
        'The fourteenth is circled on the hall calendar in two different pens, which is how you know both of you did it separately.',
      directorNotes:
        'Four years. Neither of them has organised anything, both of them assumed the other had, and there is a table at the corner restaurant that has been held back since Tuesday by people who were not asked to.',
      setsFlags: ['anniversary_arrived'],
      cancelledByFlags: [],
      requiresFlags: ['first_morning_over'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_whether_you_keep_it',
      kind: 'FINALE',
      label: 'Whether this is your life by the end of it',
      seedHint: 'A ring that does not come off easily, on a hand that grew around it.',
      payoffHint: 'Somebody says out loud what the two of you are now, and it is arrived at rather than announced.',
      weight: 1,
    },
    {
      id: 'p_the_fellowship',
      kind: 'RELATIONSHIP',
      label: 'The thing she has been carrying since February',
      seedHint: 'She changes the subject away from her own week twice in the first hour, cheerfully.',
      payoffHint: 'Six months in another city, an offer rather than an application, with a reply-by date of Thursday.',
      weight: 0.9,
    },
    {
      id: 'p_who_you_were',
      kind: 'MYSTERY',
      label: 'What the man who lived here was actually like',
      seedHint: 'Annotations on a flatpack instruction sheet in handwriting you do not recognise as your own.',
      payoffHint: 'Lucia Vale has eleven years of him, and one story in it that does not match the photographs.',
      weight: 0.75,
    },
    {
      id: 'p_the_seam',
      kind: 'THEME',
      label: 'The morning that nothing caused',
      seedHint: 'A black jacket in a photograph that is not anywhere in this flat.',
      payoffHint: 'A platform the station does not have, a service at 01:11, and a notebook with thirty-one names in it.',
      weight: 0.5,
    },
    {
      id: 'p_the_room',
      kind: 'THEME',
      label: 'The eleven square metres nobody has decided about',
      seedHint: 'A flat-packed cot, still in its packaging, that neither of them has moved or thrown out in eight months.',
      payoffHint: 'Somebody finally says what they want, and the room becomes one thing instead of four.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_hands',
      name: 'You Build Things',
      role: 'Practical craft and hard work',
      summary: 'You work with your hands for a living, so the flat is full of jobs you can actually finish and people who will ask you to.',
      playstyle: ['Practical', 'Physical', 'Fixes things'],
      blurb: 'Somebody in this building always needs a hand with something, and you have never once said no to a job you could do in an afternoon.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { graft: 3, cooking: 1, attention: 1 },
      startingItems: [{ itemId: 'bookshelf_parts', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_your_people', amount: 10 }],
    },
    {
      id: 'arch_ledger',
      name: 'You Work With Numbers',
      role: 'Analysis and social patience',
      summary: 'You spend your days reading what a document is really saying, which turns out to work on people and on kitchens.',
      playstyle: ['Observant', 'Careful', 'Slow to commit'],
      blurb: 'Four years of other people’s contracts have made you very good at spotting the clause somebody hoped you would skim.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { attention: 3, candour: 1, recall: 1 },
      startingItems: [{ itemId: 'grocery_list', qty: 1 }],
      startingAbilities: [],
      startingReputation: [],
    },
    {
      id: 'arch_kitchen',
      name: 'You Cook For A Living',
      role: 'Food and warmth',
      summary: 'You feed people professionally, which in this flat means you are never short of a way to say something without saying it.',
      playstyle: ['Warm', 'Generous', 'Bad hours'],
      blurb: 'Eleven years of service, and you still cannot sit down in somebody else’s kitchen without straightening the pan handles.',
      attributeBonus: { presence: 3, agility: 1 },
      skillProficiencies: { cooking: 3, warmth: 2 },
      startingItems: [{ itemId: 'chipped_mug', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_mori', amount: 10 }],
    },
    {
      id: 'arch_words',
      name: 'You Teach Or Write',
      role: 'Talk and improvising',
      summary: 'Your job is standing in front of people without all the answers, which is exactly the position you woke up in.',
      playstyle: ['Talks well', 'Quick', 'Overthinks'],
      blurb: 'You have talked your way through a room that knew more than you did, many times, and you have never once enjoyed it.',
      attributeBonus: { presence: 2, mind: 2 },
      skillProficiencies: { improvise: 3, candour: 2 },
      startingItems: [{ itemId: 'wedding_album', qty: 1 }],
      startingAbilities: [],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What does she call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Rowan Adeyemi' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. he/him' },
    {
      id: 'archetype',
      label: 'What do you do for a living in this life?',
      helpText:
        'The job the version of you who lives here has, which sets what you are good at. It is fixed for the whole story. It does not set what kind of husband you were, whether you tell her the truth, or whether this marriage survives the week — all of that is yours, and none of it is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What is true about you in both lives?',
      helpText: 'The part of you the four missing years did not change. Most people write one plain sentence, and that is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I have never once been on time for anything, and I am extremely good in a crisis, which people find annoying.',
    },
    {
      id: 'how_you_take_it',
      label: 'What is your first instinct this morning?',
      helpText: 'A starting temperament, not a commitment. You can do the exact opposite in the kitchen and the world will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'tell_the_truth', label: 'Say it out loud immediately and deal with the consequences' },
        { id: 'keep_it_quiet', label: 'Say nothing until you understand the shape of it' },
        { id: 'enjoy_it', label: 'Decide this looks better than the life you had' },
        { id: 'get_out', label: 'Work out how to leave without a scene' },
        { id: 'find_out_why', label: 'Assume there is a reason and go looking for it' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does she see across the kitchen?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Too tall for this flat, three days of not shaving, and a T-shirt I am fairly sure is hers.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Four of these are the marriage not surviving, and none of those is written
   * as a punishment. "Separate Rooms" is what happens when nobody says
   * anything, which means it is reachable by playing carefully and quietly for
   * long enough — that is the honest failure mode of a real marriage and the
   * world should be willing to deliver it. "The Man Who Left" is walking away,
   * and it is available from about a third of the way in.
   *
   * The two Platform 11 endings are the only ones that need the optional
   * mystery, and every other destination here is reachable by a player who
   * never once wondered why they woke up.
   */
  endings: [
    {
      id: 'end_sunday_morning',
      name: 'Sunday Morning',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['first_morning_over'],
        flagsUnset: ['separated', 'went_back'],
        minRelationship: [
          { characterId: 'hana', dimension: 'trust', value: 62 },
          { characterId: 'hana', dimension: 'affection', value: 70 },
        ],
      },
      condition:
        'The quiet one. The player has stayed, the marriage is intact and unremarkable, and nothing has been solved — the memory gap is simply a thing that happened and has stopped being the most interesting fact about the week. Play it small and domestic: a Sunday, a late breakfast, a plan for the afternoon that nobody writes down. Do not have anybody make a speech about choosing this life.',
      epilogue:
        'The bookshelf either got finished or it did not, and either way nobody mentions it any more. There is a shopping list on the fridge in two handwritings and most of the items are crossed out. Some mornings, for about four seconds, the flat is unfamiliar again, and then it is not.',
      hint: '',
    },
    {
      id: 'end_still_choosing',
      name: 'Still Choosing You',
      rarity: 'UNCOMMON',
      minTurn: 35,
      requires: {
        flagsSet: ['chose_each_other', 'fellowship_decided'],
        minRelationship: [{ characterId: 'hana', dimension: 'affection', value: 80 }],
      },
      condition:
        'The two of them have been through something real — the fellowship, the room, whatever the player did or failed to do — and have said out loud that they are doing this on purpose. This is not the same as nothing having gone wrong. It is better than that, and it should be written by somebody who knows the difference.',
      epilogue:
        'The thing about the second time is that it was decided rather than fallen into, and both of them know exactly what it cost. She still takes most of the duvet. He still cannot build a bookshelf. Neither of those is a metaphor for anything and both of them are load-bearing.',
      hint: '',
    },
    {
      id: 'end_two_cities',
      name: 'Two Cities',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['she_took_it'],
        flagsUnset: ['you_moved_with_her', 'separated'],
        minRelationship: [{ characterId: 'hana', dimension: 'trust', value: 70 }],
      },
      condition:
        'She took the fellowship and the marriage held across six months and two hundred miles. Write the logistics rather than the sentiment — the calls at bad hours, the two sets of keys, the Friday trains, the flat with one person in it. Long distance working is not a compromise ending and should not read as one.',
      epilogue:
        'Six months turns out to be twenty-six Fridays. She is better at the phone than he is and worse at endings, so the calls run long and stop abruptly. She comes back in the spring with a portfolio and a habit of eating standing up that takes about a month to shift.',
      hint: 'She has not said it yet, and there is a date on it.',
    },
    {
      id: 'end_our_place',
      name: 'Our Place',
      rarity: 'RARE',
      minTurn: 40,
      requires: {
        flagsSet: ['spare_room_settled', 'chose_each_other'],
        minFactionReputation: [{ factionId: 'faction_mori', value: 55 }],
        minRelationship: [{ characterId: 'hana', dimension: 'affection', value: 82 }],
      },
      condition:
        'They have built something specific and new together — the room became a thing, the family is in it, and there are plans in the calendar that are not appointments. Name what they actually made rather than gesturing at a future, because the whole point of this ending is that it is concrete.',
      epilogue:
        'Kenji does the floor at cost and complains about it for a year. Her mother comes to look at it twice before it is finished and once after. Whatever the eleven square metres became, it is the room the two of them are proudest of and the one they show people first.',
      hint: '',
    },
    {
      id: 'end_a_life_i_chose',
      name: 'A Life I Chose',
      rarity: 'RARE',
      minTurn: 38,
      requires: {
        flagsSet: ['she_knows', 'knows:what_you_want'],
        flagsUnset: ['separated', 'went_back'],
        minRelationship: [{ characterId: 'hana', dimension: 'trust', value: 78 }],
      },
      condition:
        'The player told her the truth, she believed it, and they stayed anyway. This ending is about the second thing: it does not matter whether this life was originally theirs, because four years of it happened and the last week of it was chosen with both eyes open. Reachable without ever finding the platform.',
      epilogue:
        'She never entirely stops checking, in the first year — a question about a holiday she already knows the answer to, asked lightly, at breakfast. He answers it every time. Somewhere around the fifth year she stops asking, and neither of them notices when.',
      hint: '',
    },
    {
      id: 'end_platform_11',
      name: 'Platform 11',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['platform_answered', 'went_back', 'knows:what_happened'] },
      condition:
        'The player found the platform and got on the 01:11. Nobody explains anything, because nobody in this world can. What this ending is about is what they left, and that is entirely determined by how good the preceding week was — a player who was miserable here should get a different scene from one who was happy and went anyway.',
      epilogue:
        'Nao Ibarra writes the name in the notebook and puts the elastic band back round it. In Apartment 8B a woman wakes up on a Tuesday next to somebody who has never once forgotten her name, and has a very good week, and cannot say why she keeps checking the third photograph on the shelf.',
      hint: 'The board flicked twice.',
    },
    {
      id: 'end_stayed_knowing',
      name: 'Let It Go Without You',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['platform_answered', 'chose_to_stay'] },
      condition:
        'The player found the way back and stood on the platform and did not get on. They now know for certain that this life is not the one they started in, and they are keeping it. Do not have them explain the decision. Have them go home, and have somebody be awake.',
      epilogue:
        'The 01:11 leaves the way it always does, which is to say without any noise at all. The tram home takes forty minutes at that hour. There is a light on in the kitchen at 8B and it should not be, and it is not a mystery, it is Hana, who could not sleep.',
      hint: '',
    },
    {
      id: 'end_goodbye_hana',
      name: 'Goodbye, Hana',
      rarity: 'UNCOMMON',
      minTurn: 32,
      requires: { flagsSet: ['separated', 'ended_honestly'] },
      condition:
        'The marriage ended and both people behaved well. Nobody is a villain, nobody was betrayed, and both of them are going to be all right eventually and are not all right today. Write the practical end of a life together — the flat, the split, who gets the mugs — and let it be sad without being tragic.',
      epilogue:
        'They divide the photographs by who is in them and both of them end up with the coast one somehow. Emi Takeda takes about eight months to speak to him again and then does, at length, in a bakery queue. The flat is let to a couple in September who think the balcony is the best bit.',
      hint: '',
    },
    {
      id: 'end_separate_rooms',
      name: 'Separate Rooms',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['separated', 'ended_by_attrition'] },
      condition:
        'Nobody said anything and it ended anyway. This is the failure mode of a real marriage and it must not be written as a punishment for playing badly — the player was polite, present, and never once raised any of it, and that turned out to be a decision. There is no scene where somebody explains what went wrong, because neither of them could.',
      epilogue:
        'It is not clear afterwards which week it actually ended in. She takes the fellowship or she does not; either way she is not in the flat much by October. The last thing either of them says about it out loud is a conversation about who is telling her mother.',
      hint: '',
    },
    {
      id: 'end_again_from_the_beginning',
      name: 'Again, From The Beginning',
      rarity: 'RARE',
      minTurn: 40,
      requires: {
        flagsSet: ['separated', 'dating_again'],
        minRelationship: [{ characterId: 'hana', dimension: 'affection', value: 68 }],
      },
      condition:
        'They ended the marriage and then, on completely different terms, started seeing each other. This is not the marriage rescued at the last moment. It is two people who decided the thing they had was over and that they still wanted each other, which is a harder and more specific thing to write.',
      epilogue:
        'The first proper date is at the corner restaurant, at the wrong table on purpose, and is unbearable for about twenty minutes and then is not. Nobody proposes anything. They are, at the time of writing, nine months into something neither of them will name in front of Kenji.',
      hint: '',
    },
    {
      id: 'end_the_man_who_left',
      name: 'The Man Who Left',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['she_knows'] },
      condition:
        'The player walked out of a life that was, by every available measure, good, and did not explain it to anybody. Do not make this a tragedy and do not redeem it. It is a completely coherent response to waking up married to a stranger, and the person it costs most is not the player.',
      epilogue:
        'The ring is on the kitchen counter next to the list. Hana rings Emi at two, and her brother at six, and the police at nine, and none of those calls goes the way it does in anybody’s imagination. What she cannot get past, for about a year, is that there had been pancakes.',
      hint: '',
    },
  ],
  opening:
    'The kitchen is four steps from the bed and you take all four before you have decided to.\n\n' +
    'A woman is at the hob in an oversized shirt with her hair pinned up with what looks like a pencil, turning something in a pan without looking at it. There are two mugs out. One of them has a chip in the rim and has obviously been yours for years.\n\n' +
    '"Morning, husband," she says, and reaches back with her free hand for yours without turning round, because that is apparently a thing the two of you do.\n\n' +
    'The pan spits. Down in the street somebody is putting the bins out, badly.\n\n' +
    'Her hand is still there, waiting.',
  openingSuggestions: [
    'I take her hand, because my body has already decided, and I let her pull me in behind her. She smells like coffee and someone I have never met. "Morning," I say, into her hair, and I have absolutely no idea what her name is.',
    'I sit down at the counter instead and say it straight. "I need you not to laugh. I woke up ten minutes ago and I do not know your name, I do not know this flat, and I do not know how long we have been married."',
    'I let her hand hang there a second too long, take the pan off her, and start doing something useful with it. "Sit down. I have got this." Then I look at the photograph on the shelf behind her properly, for the first time.',
  ],
  publishedAt: '2026-09-10T04:00:00.000Z',
};

export const GOOD_MORNING_HUSBAND = StoryVersion.parse(raw);
