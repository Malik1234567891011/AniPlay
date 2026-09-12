import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Seven Names" — France, 1909, and a list that is not a kill list.
 *
 * The bible's most important instruction is a negative one: do not hard-canon
 * that the player is innocent. Valère is dead, the player was convicted, and
 * seven people had a hand in the surrounding conspiracy — everything else,
 * including whether the player did it, is theirs. So nothing in this world
 * asserts innocence, the setup asks what they say happened rather than telling
 * them, and the endings work from either position.
 *
 * The second instruction is that the list is seven doors rather than seven
 * villains. Four of the seven are authored as characters: the financier, the
 * newspaper owner, the doctor who signed a false chronology to get her son
 * back, and the man who organised all of it and gave the eulogy. The other
 * three are lore, items and world events, because a cast of eleven blurs and
 * the doctor is the one who proves the point.
 *
 * The playable span is the escape and the first weeks of moving up the list:
 * an island, Marseille, a train, and Paris. The Registry is never fully
 * enumerated and a run that burns it without reading it is a complete run.
 *
 * Three variables. Condition is the only GOOD_HIGH — `resolveRest` refills
 * those, and eleven months in a cell followed by a great deal of climbing is
 * the honest thing for that to mean. Heat is first among the descending pair,
 * because the generic cost path and PUBLIC_VIOLENCE both take the first
 * GOOD_LOW in array order and a dead man in a Paris street bringing the police
 * closer is exactly right. Notoriety never falls, because a legend does not.
 */

const raw = {
  id: 'sv_seven_names_1',
  storyId: 'story_seven_names',
  version: 1,
  title: 'Seven Names',
  fantasyLabel: 'You hang at dawn. Unless you go now.',
  hook: 'You are to be executed in the morning for killing a government minister, and at seventeen minutes past one a brick falls out of your cell wall and an old man crawls through it with seven names on a piece of paper.',
  premise:
    'Tomorrow morning you are going to be executed in front of a crowd, for the murder of a government minister at a masked ball in a glass-roofed hall eleven months ago.\n\n' +
    'The evidence was overwhelming. Witnesses put you beside him. A revolver in your name turned up in a service passage. There were letters in your handwriting describing the killing weeks before it happened.\n\n' +
    'So by winter the country had stopped arguing about whether you did it and started arguing about whether the execution should be public.\n\n' +
    'At seventeen minutes past one in the morning, a brick falls out of your cell wall.\n\n' +
    'The old man who comes through has been digging for six years. He puts three things on the floor: a key, a railway map, and a piece of paper with seven names on it. Every one of those people had a hand in what happened to you and no two of them had the same hand.\n\n' +
    'Then he offers you a choice. Spend your last six hours trying to prove you are innocent, or spend them getting off this island.\n\n' +
    'He says one more thing before you answer. A name on a list is not the same as a person who deserves to die, and the beginners always get that wrong.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Mystery', 'Investigation', 'Rivalry', 'Adventure'],
  mechanicsChips: [
    'Seven doors, not seven targets',
    'Nobody says whether you did it',
    'Build an alias the country believes in',
    'A rival who is already ahead of you',
    'The archive can be burned unread',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'MORAL_AMBIGUITY', 'PSYCHOLOGICAL_THEMES', 'ROMANCE', 'ALCOHOL_REFERENCES'],
  intensity: 'MODERATE',
  creatorNote:
    'Nothing in this world knows whether you killed him. Say you were framed, say you did it, say you cannot remember, say the wrong man died — the seven names are true either way and the story will work from wherever you stand. The fourth name is a doctor who signed a false report to get her son back alive, and she is the whole argument of the thing.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'serein_cell',
    startWorldMinute: 77,
    startingItems: [
      { itemId: 'the_list', qty: 1 },
      { itemId: 'railway_map', qty: 1 },
    ],
    hardCanon: [
      'Minister Jules Valère was killed at a masked charity gala at the Hôtel Beaumont eleven months ago. He is dead and this is not in question.',
      'The player was convicted of it, the public evidence was overwhelming, and the execution is scheduled for the following morning.',
      'Whether the player actually did it is NOT canon. They may be innocent, guilty, complicit, uncertain, or something stranger, and the conspiracy adapts around whatever they say.',
      'Seven people had a hand in the affair surrounding the killing. They are not seven equal villains and at least one of them was coerced.',
      'Étienne Veyrac, Valère’s closest ally, organised the assassination to stop Valère publishing the Registry, and then noticed the crisis could carry him upwards. Both halves of that are true.',
      'The Registry is a distributed archive of mutual blackmail among a small circle of elites. It is not one book and nobody alive has seen all of it.',
      'Marcel Bellac has been tunnelling for six years and knows what is on the list. He can die at any point and the story continues.',
    ],
    toneGuide:
      'Belle Époque France as a working country rather than a costume: gas and electric both, a tram, a strike, a bad hotel, cheap wine, a printing floor at four in the morning. Elegance is a tool people use rather than an atmosphere. ' +
      'Nobody makes speeches about revenge. The pleasure is in the manoeuvre — a forged letter, a name dropped at the right table, a servant’s entrance, twenty minutes of holding a conversation while somebody upstairs opens a safe. ' +
      'The seven are people with reasons. Duret sacrificed a defendant to protect an institution he believed in. Bellier signed a lie to get her child back. Write all of them as though they could be persuaded, because most of them can. ' +
      'Violence is fast, ugly and legally catastrophic. A duel is a social event with a corpse in it. A man killed in a Paris street is a prefecture, a magistrate and a photograph in the evening papers. ' +
      'Newspapers are a character. What the country believes about the player is not what happened, and the gap widens on its own.',
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 13, mind: 14, presence: 13, resolve: 14, arcana: 6 },
  skills: [
    { id: 'larceny', name: 'Larceny', attribute: 'agility', description: 'Locks, latches, window catches, and the four minutes between a servant leaving a room and returning to it.' },
    { id: 'blade', name: 'The Blade', attribute: 'might', description: 'Sabre, small-sword and the knife nobody is supposed to have brought. Mostly used to be seen carrying.' },
    { id: 'disguise', name: 'Disguise', attribute: 'presence', description: 'A coat, an accent and an errand, worn until people stop seeing a face and start seeing a function.' },
    { id: 'society', name: 'Society', attribute: 'presence', description: 'Knowing which of the eleven people at a table can have somebody ruined by Thursday.' },
    { id: 'forgery', name: 'Forgery', attribute: 'mind', description: 'Hands, watermarks, letterheads, and the specific weight of a document nobody questions.' },
    { id: 'read_people', name: 'Reading People', attribute: 'mind', description: 'What somebody is protecting, which is almost never what they are arguing about.' },
    { id: 'endurance', name: 'Endurance', attribute: 'resolve', description: 'Cold water, long roads, no sleep, and the eleven months that came before all of it.' },
  ],
  resources: [
    {
      id: 'condition',
      name: 'Condition',
      max: 100,
      start: 52,
      regenPerHour: 2.5,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'Eleven months of a cell arriving all at once. Hands unreliable, sight narrowing at the edges, and a body that has begun making decisions about what it will and will not do without consulting anybody.',
      color: '#8C7B5E',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Wrecked. Stairs are an event, a fight is a coin toss, and the hands are not steady enough for a lock or a pen. This is the band where somebody agrees to a bad arrangement because refusing would take another twenty minutes of standing up, and where a bed is worth more than any of the seven names.',
        },
        {
          upTo: 62,
          behaviour:
            'Serviceable. Good for one exertion a day and honest about not being good for two. The climb or the conversation, not both. Everything still works and everything shows — a hand that shakes once at a table is a thing other people file away.',
        },
        {
          upTo: 100,
          behaviour:
            'Back to what the body used to be. Roofs, gutters, a full evening in company and a long night after it. The player can be charming and dangerous in the same room without either one costing the other, which is the whole trick of this world.',
        },
      ],
    },
    {
      id: 'heat',
      name: 'Heat',
      max: 100,
      start: 30,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'As far as the Republic is concerned the condemned drowned off Fort Serein in March. There is a file with a line through it. Trains, hotels and borders are simply things that happen to other people.',
      color: '#B4453B',
      bands: [
        {
          upTo: 28,
          behaviour:
            'Cold. A dead convict, a closed file and one inspector who has never quite signed off on it. The player takes trains under any name they like and sleeps in hotels with registers. Nobody is looking, which is the only condition under which the slow work is possible.',
        },
        {
          upTo: 58,
          behaviour:
            'Somebody is asking. A description circulating in two prefectures, a station with two extra men on it, and a hotel clerk who takes slightly too long over a name. Nothing has happened yet. Everything now costs a detour, and the detours are where people get seen.',
        },
        {
          upTo: 82,
          behaviour:
            'A live pursuit with a face attached to it. Photographs, a reward, roadblocks on the Paris roads and Renaud within about a day of wherever the player was yesterday. Society rooms are closed. The work has to be done at night by people who are already committed.',
        },
        {
          upTo: 100,
          behaviour:
            'The country is looking for one specific person and knows what they look like. Every route out is watched, every ally is a liability to themselves, and staying in any one place past a night is the decision that ends it. Whatever is going to be finished has to be finished now.',
        },
      ],
    },
    {
      id: 'notoriety',
      name: 'Notoriety',
      max: 100,
      start: 8,
      regenPerHour: 0,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Nobody has heard of the alias, which means nobody opens a door for it and nobody closes one either. Every room has to be entered on the merits of whatever the player is wearing that evening.',
      color: '#4E6C8C',
      bands: [
        {
          upTo: 25,
          behaviour:
            'A few incidents that nobody has joined up. Two burglaries and a letter in a provincial paper. The player is a person doing things rather than a name that does things, which is slow and is also the only version of this where they can go anywhere.',
        },
        {
          upTo: 55,
          behaviour:
            'The papers have settled on a name for it. Anything unexplained in three departments gets attributed, whether or not the player was within two hundred miles. Doors open on the strength of it — frightened people answer letters now — and every one of those doors has somebody watching it.',
        },
        {
          upTo: 80,
          behaviour:
            'A national figure with a following. Songs, a cheap novel, imitators doing crimes in the name and a public that has decided what the alias means regardless of anything the player has ever done. Powerful people negotiate rather than refuse. Ordinary life has become impossible.',
        },
        {
          upTo: 100,
          behaviour:
            'The name is larger than any person could be and the country has stopped being certain there is a person at all. This is enormous leverage and it is also a cage: nothing the player does privately stays private, nobody meets them as themselves, and the only remaining way to stop is to die or to be somebody else forever.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'the_list',
      name: 'The Paper',
      tags: ['quest', 'document'],
      questItem: true,
      droppable: false,
      description: 'A torn half-sheet with seven names on it in a forger’s hand, and beside each one a single word: money, print, police, medicine, army, ships, and — beside the seventh — nothing at all.',
      loreText: 'The seventh line has been written and crossed out and written again three times. The final version is the same name as the first.',
      icon: 'papers',
    },
    {
      id: 'railway_map',
      name: 'The Railway Map',
      tags: ['document'],
      skillModifiers: { endurance: 1 },
      description: 'A folded PLM network map from four years ago, worn white along the creases, with six stations circled and a seventh crossed through hard enough to tear it.',
      loreText: 'The crossed-out one is where he was caught in 1903. He has never explained the other six and there is no reason to think all six are useful.',
      icon: 'map',
    },
    {
      id: 'iron_key',
      name: 'The Iron Key',
      tags: ['quest', 'access'],
      questItem: true,
      description: 'Hand-filed from a spoon and a hinge over an unknown number of months, and it opens the seaward gate of a fortress that has never lost a prisoner.',
      loreText: 'It works once. The lock is a ward lock, the key is soft iron, and the second use will leave most of it inside the mechanism.',
      icon: 'key',
    },
    {
      id: 'gala_photograph',
      name: 'The Photograph She Never Printed',
      tags: ['quest', 'evidence'],
      questItem: true,
      skillModifiers: { read_people: 2 },
      description: 'A plate from the gala, exposed at four minutes past midnight, showing a figure entering the service passage a full ten minutes after the player is supposed to have left the building.',
      loreText: 'It is not conclusive and never will be. It is enough to make a magistrate ask one question, which is all anybody in this story has ever needed.',
      icon: 'photograph',
    },
    {
      id: 'bellier_report',
      name: 'The Second Report',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'The forensic chronology as it was first written, before the signed one, with a different time of death on it by nearly two hours.',
      loreText: 'She kept it. Six years of keeping a thing that would destroy her, in a house with her son in it, because throwing it away would have meant deciding something.',
      icon: 'papers',
    },
    {
      id: 'lorcq_ledger',
      name: 'The General’s Own Archive',
      tags: ['quest', 'evidence'],
      questItem: true,
      skillModifiers: { society: 2 },
      description: 'A leather case of duplicates the fifth name kept because he never trusted the other six. It is the Registry seen from inside, by somebody taking notes on his own accomplices.',
      loreText: 'There is a page in it about Veyrac that is dated three weeks before the gala, and it is the only document in France that puts him in a room he has always denied being in.',
      icon: 'case',
    },
    {
      id: 'evening_suit',
      name: 'A Suit That Fits',
      tags: ['clothing'],
      equipSlot: 'body',
      skillModifiers: { society: 2, disguise: 1 },
      description: 'Cut properly, worn once, and acquired by a means nobody involved is going to write down. In the right room it is worth more than a revolver and it works on more people.',
      loreText: 'The tailor’s label has been unpicked. Anybody who looks for a label and finds the stitching where one used to be learns something about you.',
      icon: 'coat',
    },
    {
      id: 'forger_kit',
      name: 'Marcel’s Roll',
      tags: ['tool'],
      skillModifiers: { forgery: 3 },
      description: 'Canvas, tied with string: four nibs, three inks, a lump of gum arabic, a razor, and eleven blank sheets of paper stolen from eleven different ministries.',
      loreText: 'The ministry papers are the valuable part. Anybody can write a letter; almost nobody can write it on the correct stock.',
      icon: 'roll',
    },
    {
      id: 'bread_and_wine',
      name: 'Bread, Sausage, A Bottle',
      tags: ['food'],
      consumable: { resourceId: 'condition', amount: 24, consumesItem: true },
      description: 'Bought at a stall on a dock at six in the morning by somebody who has not eaten anything with salt in it for eleven months.',
      loreText: 'It costs forty centimes and it is, by an enormous margin, the best thing that has happened to the player this year.',
      icon: 'bread',
    },
  ],
  abilities: [
    {
      id: 'read_the_room',
      name: 'Read the Room',
      tags: ['sight'],
      description: 'Work out which of the eleven people at this table can have somebody ruined by Thursday, and what each of them is actually protecting.',
      affordances: ['read them', 'watch', 'observe', 'study the room', 'who matters here', 'look around', 'listen'],
      costs: [{ resourceId: 'condition', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'read_people', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_in_through_a_window',
      name: 'Go In Through A Window',
      tags: ['movement'],
      description: 'A drainpipe, a latch, four minutes between a servant leaving a room and coming back to it, and the whole business done without waking a house.',
      affordances: ['break in', 'climb', 'pick the lock', 'burgle', 'get inside', 'steal it', 'go in the window', 'sneak'],
      costs: [
        { resourceId: 'condition', amount: 11 },
        { resourceId: 'heat', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'larceny', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'be_somebody_else',
      name: 'Be Somebody Else',
      tags: ['social'],
      description: 'A coat, an accent and an errand, held long enough that people stop seeing a face and start seeing a function they have no reason to interrupt.',
      affordances: ['disguise', 'pretend', 'pose as', 'use an alias', 'go in as', 'impersonate', 'blend in'],
      costs: [{ resourceId: 'condition', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'presence', skillId: 'disguise', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'write_it_convincingly',
      name: 'Write It Convincingly',
      tags: ['utility'],
      description: 'The right hand, the right ink and the right paper, which is the part everybody forgets and the only part anybody checks.',
      affordances: ['forge', 'write a letter', 'fake it', 'counterfeit', 'make papers', 'sign it', 'forge a document'],
      costs: [{ resourceId: 'condition', amount: 9 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'forgery', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'work_the_table',
      name: 'Work the Table',
      tags: ['social'],
      description: 'Twenty minutes of being extremely good company, aimed at one specific person, for one specific sentence you need them to say in front of witnesses.',
      affordances: ['charm', 'talk to them', 'work the room', 'persuade', 'negotiate', 'flatter', 'get them talking', 'socialise'],
      costs: [{ resourceId: 'condition', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'society', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'put_it_to_them_straight',
      name: 'Put It To Them Straight',
      tags: ['social'],
      description: 'Say what you know, to their face, without a lever and without a threat, and find out what somebody does when they are given the chance to choose.',
      affordances: ['tell them the truth', 'be honest', 'confront', 'say it plainly', 'ask them directly', 'appeal to them'],
      costs: [{ resourceId: 'condition', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'read_people', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'draw_on_them',
      name: 'Draw On Them',
      tags: ['offensive'],
      description: 'Sabre, small-sword or the knife nobody knows you brought. In this country in this decade it settles the immediate problem and creates a much larger one within the hour.',
      affordances: ['fight', 'attack', 'draw', 'duel', 'stab', 'kill him', 'strike', 'shoot'],
      costs: [
        { resourceId: 'condition', amount: 12 },
        { resourceId: 'heat', amount: 14 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'blade', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'let_them_know_who_did_it',
      name: 'Let Them Know Who Did It',
      tags: ['social'],
      description: 'Leave the calling card, let the servant see the coat, give the papers the detail they need. Nothing is worth more than a name people are frightened of, and nothing costs more.',
      affordances: ['leave a card', 'sign it', 'take credit', 'let them know', 'make a statement', 'be seen', 'send a message'],
      costs: [
        { resourceId: 'condition', amount: 4 },
        { resourceId: 'notoriety', amount: 15 },
        { resourceId: 'heat', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_to_ground',
      name: 'Go To Ground',
      tags: ['utility'],
      description: 'A room over a laundry, a false name that nobody has heard, and three days of doing absolutely nothing while the description in the prefectures goes stale.',
      affordances: ['lie low', 'hide', 'go to ground', 'wait it out', 'disappear', 'lay low', 'rest up'],
      costs: [{ resourceId: 'condition', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'open_the_registry',
      name: 'Open The Registry',
      tags: ['utility'],
      description: 'Get into a portion of the archive and read it, which is a different act from stealing it and a much worse one to be caught doing.',
      affordances: ['read the registry', 'open it', 'go through the files', 'search the archive', 'find out what it says'],
      costs: [
        { resourceId: 'condition', amount: 10 },
        { resourceId: 'heat', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'forgery', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:where_the_registry_is'],
        lockedCopy: 'It is not a book and it is not in a building. Six people know pieces of where it is and none of them has ever written any of it down.',
      },
    },
  ],
  locations: [
    {
      id: 'serein_cell',
      name: 'The Cell',
      shortName: 'Cell',
      description:
        'Four paces by three, a bed, a bucket, and a window too narrow to put a shoulder through. Eleven months of marks on the wall by the door, and tonight a hole at floor level with stone dust spilling out of it and a hand coming through.',
      artDirection:
        'Cramped stone prison cell at night, one narrow barred window with moonlight, a straw bed, tally marks scratched by the door, a rough hole broken through the base of one wall with dust spilling out. Cold, close, desperate.',
      connections: [{ to: 'serein_tunnel', travelMinutes: 2, label: 'Through the wall' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'iron_key', qty: 1, ownerId: 'marcel', aka: ['the key', 'iron key', 'his key'] },
        { itemId: 'forger_kit', qty: 1, ownerId: 'marcel', aka: ['the roll', 'his tools', 'the kit', 'the canvas roll'] },
      ],
    },
    {
      id: 'serein_tunnel',
      name: 'The Tunnel',
      shortName: 'Tunnel',
      description:
        'Six years of work: a crawl through fill and rubble, shored with bed slats, running under two corridors and out through the old cistern to the seaward wall. It is wet, it is not straight, and in three places a man has to go through on one shoulder.',
      artDirection:
        'Narrow hand-dug prison tunnel shored with scavenged wood, a single candle, wet stone, a figure crawling, spoil packed into the walls. Claustrophobic, extraordinary, held together by nothing.',
      connections: [
        { to: 'serein_cell', travelMinutes: 2, label: 'Back into the cell' },
        { to: 'the_seaward_wall', travelMinutes: 6, label: 'Out to the water' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'the_seaward_wall',
      name: 'The Seaward Wall',
      shortName: 'The Wall',
      description:
        'The bottom of the fortress where the rock meets black water, a gate that has not been opened since the eighties, and eleven kilometres of Mediterranean between here and a coast with lights on it.',
      artDirection:
        'Base of a sea fortress at night, black water against wet rock, a rusted iron sea gate, distant coastal lights across open water, moonlight and spray. Vast, cold, exhilarating.',
      connections: [
        { to: 'serein_tunnel', travelMinutes: 6, label: 'Back into the tunnel' },
        { to: 'marseille_docks', travelMinutes: 240, label: 'The water, and whatever is on the other side of it' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [],
    },
    {
      id: 'marseille_docks',
      name: 'The Marseille Docks',
      shortName: 'Docks',
      description:
        'Forty berths of coal, wine, soap and people, a customs house that operates on the honour system and a great deal of money, and eleven languages being shouted before six in the morning. Nobody here has ever asked anybody for papers on their own initiative.',
      artDirection:
        'Busy Marseille port at dawn in 1909, steam derricks and sailing lighters, coal and wine barrels, dockers and porters, a customs shed, hard Mediterranean light. Loud, filthy, alive.',
      connections: [
        { to: 'the_seaward_wall', travelMinutes: 240, label: 'Back out to the island' },
        { to: 'marseille_room', travelMinutes: 12, label: 'Up into the old town' },
        { to: 'saint_charles', travelMinutes: 20, label: 'Up to the station' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'bread_and_wine', qty: 3, ownerId: null, aka: ['food', 'bread', 'breakfast', 'something to eat'] },
      ],
    },
    {
      id: 'marseille_room',
      name: 'The Room Over The Laundry',
      shortName: 'The Room',
      description:
        'One franc fifty a night, no register, a window onto a courtyard with four exits from it, and steam coming up through the floor at all hours from the laundry below. The woman who runs it has never once looked at anybody twice.',
      artDirection:
        'Cheap rented room above a laundry in old Marseille, iron bed, washstand, steam and damp on the walls, a shuttered window onto a narrow courtyard, clothes drying on a line. Poor, warm, safe-feeling.',
      connections: [{ to: 'marseille_docks', travelMinutes: 12, label: 'Down to the water' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [
        { itemId: 'evening_suit', qty: 1, ownerId: null, aka: ['the suit', 'evening dress', 'a suit', 'clothes'] },
      ],
    },
    {
      id: 'saint_charles',
      name: 'Saint-Charles Station',
      shortName: 'Station',
      description:
        'A great glass shed at the top of a flight of stairs, with the Paris express standing at platform three for eleven hours a day and two men in plain coats at the barrier who are not railway employees and are not hiding it.',
      artDirection:
        'Grand 1909 railway terminus interior, glass and iron train shed, steam, a waiting express, crowds with trunks, a departure board, two men in plain coats at a barrier. Monumental, smoky, watched.',
      connections: [
        { to: 'marseille_docks', travelMinutes: 20, label: 'Down to the port' },
        { to: 'the_express', travelMinutes: 4, label: 'Platform three' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [],
    },
    {
      id: 'the_express',
      name: 'The Paris Express',
      shortName: 'The Train',
      description:
        'Fourteen hours, three classes, a dining car and a corridor that everybody on this train will walk down at least twice. There are about nine people aboard worth knowing and at least one of them is looking for you.',
      artDirection:
        'Interior corridor of a 1909 express train at night, brass and marquetry, a lit dining car through a door, landscape black in the windows, a figure at the far end. Elegant, enclosed, tense.',
      connections: [
        { to: 'saint_charles', travelMinutes: 4, label: 'Back onto the platform' },
        { to: 'paris_hotel', travelMinutes: 840, label: 'Fourteen hours north' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'paris_hotel',
      name: 'The Hôtel Beaumont',
      shortName: 'Beaumont',
      description:
        'Where it happened. A glass ceiling over a hall that holds four hundred, a service passage the public has never been shown, and a management that has spent eleven months insisting the incident had nothing to do with the premises.',
      artDirection:
        'Grand Belle Époque hotel hall under a vast glass roof, marble, palms and gilt, chandeliers, a discreet service door at the side, a few guests crossing. Opulent, hushed, faintly wrong.',
      connections: [
        { to: 'the_express', travelMinutes: 840, label: 'Fourteen hours south' },
        { to: 'the_boulevards', travelMinutes: 6, label: 'Out onto the boulevard' },
        { to: 'service_passage', travelMinutes: 3, lockedByFlag: 'knows:the_passage', label: 'The door beside the kitchens' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'the_boulevards',
      name: 'The Boulevards',
      shortName: 'Boulevards',
      description:
        'Cafés, kiosks, a tram, six evening papers on sale by four in the afternoon and a great many people who read all of them. Everything that gets decided in this city gets decided somewhere off these streets and then argued about on them.',
      artDirection:
        'Paris grand boulevard in 1909, café terraces, a newspaper kiosk plastered with headlines, an electric tram, horse traffic and one motor car, gaslight and electric light together. Bustling, modern, self-regarding.',
      connections: [
        { to: 'paris_hotel', travelMinutes: 6, label: 'Back to the hotel' },
        { to: 'le_matin_offices', travelMinutes: 8, label: 'The newspaper offices' },
        { to: 'varenne_house', travelMinutes: 14, label: 'Out to the eighth' },
        { to: 'prefecture', travelMinutes: 11, label: 'Across to the Prefecture' },
        { to: 'bellier_surgery', travelMinutes: 16, label: 'Over the river to the surgery' },
        { to: 'veyrac_rooms', travelMinutes: 12, label: 'The rooms on the rue de Grenelle' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'service_passage',
      name: 'The Service Passage',
      shortName: 'Passage',
      description:
        'Eleven metres of unlit corridor between the kitchens and the cloakrooms, with a door at each end and a bend in the middle. A revolver was found here. The prosecution never established how anybody got into it without crossing the hall.',
      artDirection:
        'Narrow unlit hotel service corridor, plain plaster and scuffed skirting, a bend in the middle, one door at each end, a single dim bulb. Ordinary, forgotten, load-bearing.',
      connections: [{ to: 'paris_hotel', travelMinutes: 3, label: 'Back into the hall' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 1 },
      takeableItems: [],
    },
    {
      id: 'le_matin_offices',
      name: 'Le Matin Français',
      shortName: 'Le Matin',
      description:
        'Six floors of a building that decides what four hundred thousand people think before breakfast. The presses are in the basement and run from eleven at night, the editorial floor never empties, and there is a locked room on the fifth with photographs in it that were never printed.',
      artDirection:
        'Newspaper building interior 1909, editorial floor with rolltop desks and telephones, a glimpse of rotary presses below through a stairwell, proof sheets pinned to a board. Frantic, inky, powerful.',
      connections: [{ to: 'the_boulevards', travelMinutes: 8, label: 'Back onto the boulevard' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 0 },
      takeableItems: [
        { itemId: 'gala_photograph', qty: 1, ownerId: 'solene', aka: ['the photograph', 'the plate', 'the picture', 'the unprinted one'] },
      ],
    },
    {
      id: 'varenne_house',
      name: 'The Varenne House',
      shortName: 'Varenne',
      description:
        'A private hôtel in the eighth with a courtyard, eleven servants and a first-floor study that has a safe in it, a railway map on the wall and a daughter who is not where anybody thinks she is on any given evening.',
      artDirection:
        'Grand private Parisian townhouse interior, marble stair and courtyard beyond, a first-floor study with a wall map and a heavy safe, gaslight on panelling. Wealthy, cold, immaculate.',
      connections: [
        { to: 'the_boulevards', travelMinutes: 14, label: 'Back to the boulevards' },
        { to: 'the_opera', travelMinutes: 9, label: 'To the opera' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [],
    },
    {
      id: 'the_opera',
      name: 'The Opera',
      shortName: 'Opera',
      description:
        'Where everybody who matters is visible for three hours on the same evening, in boxes, at known heights, in a building with more corridors behind the boxes than in front of them. Half the business of this country gets done in the interval.',
      artDirection:
        'Gilded 1909 opera house auditorium seen from a box, chandelier, tiers of boxes with formal audience, the stage lit beyond, red and gold. Glamorous, crowded, theatrical in both senses.',
      connections: [
        { to: 'varenne_house', travelMinutes: 9, label: 'Back to the eighth' },
        { to: 'the_boulevards', travelMinutes: 7, label: 'Down to the boulevards' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: -1 },
      takeableItems: [],
    },
    {
      id: 'prefecture',
      name: 'The Prefecture',
      shortName: 'Prefecture',
      description:
        'The whole apparatus in one building: records, magistrates, the archive of the Valère case in eleven boxes, and an inspector on the third floor who has never signed off on a drowning he does not believe in.',
      artDirection:
        'Paris police prefecture interior 1909, tall windows and dark wood, a records room of numbered boxes, an inspector’s desk with case files, green shaded lamps. Institutional, dusty, formidable.',
      connections: [{ to: 'the_boulevards', travelMinutes: 11, label: 'Back to the boulevards' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: -1 },
      takeableItems: [],
    },
    {
      id: 'bellier_surgery',
      name: 'The Surgery',
      shortName: 'Surgery',
      description:
        'Two rooms over a pharmacy south of the river, a waiting bench, and a doctor who takes patients who cannot pay on Tuesdays. There is a locked drawer in the consulting room and there has been for six years.',
      artDirection:
        'Small 1909 medical surgery over a pharmacy, examination couch, instrument cabinet, a waiting bench outside, one locked desk drawer, afternoon light through net curtains. Modest, careful, quietly sad.',
      connections: [{ to: 'the_boulevards', travelMinutes: 16, label: 'Back over the river' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -2 },
      takeableItems: [
        { itemId: 'bellier_report', qty: 1, ownerId: 'anais', aka: ['the report', 'the first report', 'the drawer', 'the chronology'] },
      ],
    },
    {
      id: 'veyrac_rooms',
      name: 'The Rue de Grenelle',
      shortName: 'Grenelle',
      description:
        'Not a house — a set of rooms where a rising man works eighteen hours a day with four secretaries and no wife. There is a coalition being built in here, minute by minute, out of favours, and it is going to be a government within a year.',
      artDirection:
        'Working political offices 1909, several desks with secretaries and telephones, papers everywhere, a plain inner room with one lamp, no ornament at all. Busy, austere, ascending.',
      connections: [
        { to: 'the_boulevards', travelMinutes: 12, label: 'Back to the boulevards' },
        { to: 'the_vault', travelMinutes: 18, lockedByFlag: 'knows:where_the_registry_is', label: 'Somewhere he goes alone on Thursdays' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: -2 },
      takeableItems: [],
    },
    {
      id: 'the_vault',
      name: 'The Vault',
      shortName: 'Vault',
      description:
        'Not a vault and not one place: three rooms in three buildings, one of which is a solicitor’s strongroom, one of which is a convent, and one of which is a bank basement with four keyholders and no register of who they are.',
      artDirection:
        'Bank strongroom basement 1909, iron grilles and numbered deposit boxes, a single electric lamp, ledgers stacked on a table, no windows. Secure, bureaucratic, ominous.',
      connections: [{ to: 'veyrac_rooms', travelMinutes: 18, label: 'Back to the rue de Grenelle' }],
      discoveredByDefault: false,
      mapPosition: { x: -2, y: -2 },
      takeableItems: [
        { itemId: 'lorcq_ledger', qty: 1, ownerId: null, aka: ['the ledger', 'the general’s archive', 'the case', 'the duplicates'] },
      ],
    },
  ],
  factions: [
    {
      id: 'faction_prefecture',
      name: 'The Prefecture',
      description: 'Magistrates, records and the men in plain coats at the barrier. Institutionally certain the case was sound and containing at least one person who has never believed it.',
      startingReputation: -30,
      ranks: [
        { atReputation: -60, label: 'Shot on sight' },
        { atReputation: -20, label: 'A live warrant' },
        { atReputation: 20, label: 'A doubt on file' },
        { atReputation: 60, label: 'A statement worth taking' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_society',
      name: 'Society',
      description: 'Eleven hundred people who can have somebody ruined by Thursday, arranged in boxes at the opera in an order everybody present can read at a glance.',
      startingReputation: -10,
      ranks: [
        { atReputation: -60, label: 'Not received' },
        { atReputation: -20, label: 'A rumour' },
        { atReputation: 20, label: 'Invited to the smaller things' },
        { atReputation: 60, label: 'Placed near the top of a table' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_press',
      name: 'The Papers',
      description: 'Six evening editions and four hundred thousand readers who form their view of the whole affair between the kiosk and the tram. They do not report what the country thinks; they build the room the thinking happens in.',
      startingReputation: -40,
      ranks: [
        { atReputation: -60, label: 'The Beaumont murderer' },
        { atReputation: -20, label: 'A name they print in bold' },
        { atReputation: 20, label: 'A case with two sides to it' },
        { atReputation: 60, label: 'The story they are running with' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_underworld',
      name: 'The Trade',
      description: 'Forgers, fences, dockers, a woman in Marseille who has never looked at anybody twice, and the loose freemasonry of people who make their living out of other people’s paperwork being wrong.',
      startingReputation: 20,
      ranks: [
        { atReputation: -60, label: 'Sold to whoever is buying' },
        { atReputation: -20, label: 'Not worth the trouble' },
        { atReputation: 20, label: 'Good for a room and a name' },
        { atReputation: 60, label: 'Owed favours in four cities' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_registry',
      name: 'The Circle',
      description: 'Not an organisation with a door. The small number of people who hold pieces of the Registry and have understood for decades that nobody betrays the circle because the circle can destroy everybody.',
      startingReputation: -20,
      ranks: [
        { atReputation: -60, label: 'To be removed' },
        { atReputation: -20, label: 'An inconvenience' },
        { atReputation: 20, label: 'Holding something' },
        { atReputation: 60, label: 'Party to it' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'celeste',
      name: 'Céleste Varenne',
      role: 'Twenty-four, a financier’s daughter, and — three nights a week under another name — the best burglar in Paris',
      cardBlurb:
        'She is already investigating the Registry, she is ahead of you, and her father is the first name on your list. She will be perfectly civil about all three of those facts and you will not know until much later which of them she minded.',
      pronouns: 'she/her',
      publicTraits: ['Immaculate to the point of being a weapon', 'Bored aloud at exactly the wrong moments', 'Too interested in politics for several people’s comfort'],
      hiddenDrives: [
        'She wants to find out what her father did before somebody else finds out and prices it',
        'She has begun to prefer the nights she spends as somebody else, and is aware that is not a hobby any more',
      ],
      values: [
        'Doing a difficult thing beautifully, which she considers a moral position and can defend at length',
        'Not selling anybody. She steals from people constantly and has never once traded a person',
      ],
      fears: [
        'That her father is not being blackmailed but is one of the people doing it',
        'Ending as a woman in a box at the opera being pointed out to visitors',
      ],
      socialStyle:
        'Arrives already knowing three things about you. Compliments in a way that is also an assessment. Extremely good at silence and uses it on people who are used to being answered.',
      boundaries: [
        'Will not be somebody’s accomplice without being told the whole plan, and will walk out of a room mid-sentence over it',
        'Will not have her father discussed as a target in front of her by anybody who has not earned it',
      ],
      goals: [
        'Get the evidence about her father before the people who hold it decide what to do with it',
        'Find out what the Registry actually is, which nobody she has stolen from has been able to tell her',
      ],
      secrets: [
        {
          id: 'celeste_nocturne',
          fact: 'She is Nocturne. Eleven burglaries in three years, all of them for letters and account books, with the jewellery taken purely to give the police a motive they understand.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She lets you catch her at it rather than telling you, and then is entirely unembarrassed about the catching.',
        },
        {
          id: 'celeste_the_debt',
          fact: 'Her father has been paying somebody eleven thousand francs a quarter since before the gala. She found the entries, she has not found the payee, and she has not confronted him.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says the figure out loud to somebody who has just shown her a document about their own family rather than about hers.',
        },
      ],
      speechStyle:
        'Precise, cool and faintly amused, with the vocabulary of somebody who prices things for a living. Frames people and situations in terms of what they cost and what they are worth, which are different numbers. Never raises her voice and never repeats herself, and treats being repeated at as an insult.',
      topics: ['her father', 'Nocturne', 'the Registry', 'the opera', 'what a thing is worth', 'the eleven thousand francs'],
      voiceSamples: [
        'You are about nine minutes late and you came up the front stairs, which means you have never done this and you would like me to think you have.',
        'Eleven thousand a quarter, since the March before the gala. That is not a bribe. A bribe is once. That is a subscription.',
        'I do not mind that you want something. Everybody in that room wanted something. I mind being handled by somebody who is worse at it than the people I do this to.',
        'It is a beautiful safe. Whoever specified it understood exactly nothing about safes and a great deal about being seen to have one.',
      ],
      appearance:
        'Twenty-four, dark chestnut hair in a soft bob or pinned for the evening, grey-blue eyes, a graceful build, and clothes that are correct to the franc for whichever of her lives she is currently in.',
      visualHook: 'A pair of thin dark gloves she keeps on indoors and takes off only to handle paper.',
      silhouette: 'Perfectly still, weight on one hip, holding something small at eye level.',
      artSeed: 'sn-celeste-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'assessing', 'cold', 'undefended'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'varenne_house', activity: 'awake, in her father’s study, with a lamp turned down' },
        { startMinute: 300, endMinute: 660, locationId: 'varenne_house', activity: 'asleep, in the daylight, like somebody with a secret' },
        { startMinute: 660, endMinute: 1020, locationId: 'the_boulevards', activity: 'calls, fittings, and four conversations that are not about hats' },
        { startMinute: 1020, endMinute: 1320, locationId: 'the_opera', activity: 'a box, in view, which is an alibi as much as an evening' },
        { startMinute: 1320, endMinute: 1440, locationId: 'varenne_house', activity: 'home, changed, and going out again' },
      ],
      homeLocationId: 'varenne_house',
      knowledgeScope: ['celeste', 'varenne', 'nocturne', 'the_registry', 'society', 'the_opera'],
      startingRelationship: { trust: 10, affection: 10, respect: 25, fear: 0, rivalry: 40 },
      gates: [
        { id: 'celeste_admits_nocturne', label: 'She stops pretending about the nights', kind: 'TRUST', requires: { trust: 50, respect: 55 } },
        { id: 'celeste_works_with_you', label: 'She plans a thing with you instead of around you', kind: 'ALLIANCE', requires: { trust: 65, respect: 68 } },
        { id: 'celeste_closer', label: 'Neither of them is calling it a working arrangement', kind: 'ROMANCE', requires: { trust: 72, affection: 70 } },
      ],
      attributes: { might: 9, agility: 16, mind: 16, presence: 16, resolve: 14, arcana: 6 },
      companion: null,
      scouting: {
        learnRate: 1.4,
        cap: 8,
        revealCopy: 'She is in the chair when you come through the window. "You always take the courtyard side," she says, without putting the book down. "Always. It is the only unimaginative thing about you."',
      },
      combatant: { health: 42, defenseDc: 16, damage: 8, tags: ['thief'] },
    },
    {
      id: 'veyrac',
      name: 'Étienne Veyrac',
      role: 'Forty-one, the dead minister’s closest friend, the man who gave the eulogy, and the man who arranged the killing',
      cardBlurb:
        'The country loves him for putting truth above friendship at your trial. He did it to stop a publication he believed would ruin the Republic, and then noticed the crisis could carry him upwards, and it is the second decision that makes him what he is.',
      pronouns: 'he/him',
      publicTraits: ['Speaks in public as though to one person', 'Remembers a constituency secretary’s children by name', 'Works eighteen hours a day and looks it, deliberately'],
      hiddenDrives: [
        'He needs to be the man who saved the country from itself, and cannot survive a version of events in which he was merely ambitious',
        'He has begun to want the player caught alive rather than killed, because a confession settles the story and a corpse leaves it open',
      ],
      values: [
        'The Republic as an institution, sincerely, which is what makes him dangerous rather than merely corrupt',
        'Proportion. He has never done a violent thing that he could not argue was the smaller of two figures',
      ],
      fears: [
        'The Registry being published, which he still believes would collapse courts, banks and families in that order',
        'Somebody producing evidence that his second reason existed at all',
      ],
      socialStyle:
        'Enormously present. Turns his whole attention on whoever is speaking, including enemies, including in a corridor. Concedes graciously and often and never on the point that matters.',
      boundaries: [
        'Will not have Valère spoken about badly in his hearing, and it is not an act',
        'Will not order a killing he has not personally decided is arithmetically smaller than the alternative',
      ],
      goals: [
        'Contain the affair through the autumn session and be in government by the spring',
        'Bring the player in alive, publicly, and end the story with a signature on it',
      ],
      secrets: [
        {
          id: 'veyrac_the_room',
          fact: 'He was in a room on the rue Cambon three weeks before the gala with Lorcq and Maurel, and the fifth name wrote it down because he never trusted anybody.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He does not reveal it. A soldier who kept his own archive did, six years ago, in a ledger in a bank basement.',
        },
        {
          id: 'veyrac_the_second_reason',
          fact: 'He decided Valère was more dangerous than the corruption. Then, separately and later, he understood what the crisis would do for him. He has never said the second half aloud to anybody.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He almost says it to somebody who has offered him a way out that requires no ambition, and stops, and the stopping is the reveal.',
        },
      ],
      speechStyle:
        'The cadence of a man who speaks publicly for a living, used in private on one person at a time. Frames everything as a regrettable arithmetic performed on behalf of people who will never know it happened. Says "we" about the country and "I" about the decisions. Never once sounds like a villain.',
      topics: ['Valère', 'the Registry', 'the session', 'what he did at the trial', 'amnesty', 'what publication would cost'],
      voiceSamples: [
        'I loved him. I want that in whatever record you are keeping, because everything I am about to say will sound like a man explaining it away, and it is not that.',
        'Publish it and you have four hundred ruined families, eleven collapsed banks, and a criminal case against the entire officer corps. I counted. I have counted it every week for two years.',
        'You will be offered an amnesty this month. Not by me. Take it, because the alternative is a version of this where I am asked what to do about you, and I would rather not be asked.',
        'We do not get to be clean. We get to be small. I chose the smaller number and I have never once slept badly, and I would like you to find that as frightening as I do.',
      ],
      appearance:
        'Forty-one, brown hair going grey at the front, plain dark suits with nothing about them, the face of a man who works and is photographed working, and hands that have never done anything but write.',
      visualHook: 'A black mourning band still worn on the left sleeve eleven months on, which the papers mention every time.',
      silhouette: 'Standing at a desk rather than behind it, leaning on both hands over papers.',
      artSeed: 'sn-veyrac-01',
      portrait: null,
      expressions: ['neutral', 'sincere', 'grave', 'delighted', 'cornered'],
      schedule: [
        { startMinute: 0, endMinute: 240, locationId: 'veyrac_rooms', activity: 'still at it, with one secretary who has stopped arguing about the hour' },
        { startMinute: 240, endMinute: 420, locationId: 'veyrac_rooms', activity: 'four hours of sleep on a couch in the inner room' },
        { startMinute: 420, endMinute: 1020, locationId: 'veyrac_rooms', activity: 'the coalition, built out of favours, minute by minute' },
        { startMinute: 1020, endMinute: 1260, locationId: 'the_boulevards', activity: 'dinners that are meetings, in public, where being seen is the point' },
        { startMinute: 1260, endMinute: 1440, locationId: 'veyrac_rooms', activity: 'back at the desk' },
      ],
      homeLocationId: 'veyrac_rooms',
      knowledgeScope: ['veyrac', 'valere', 'the_registry', 'the_session', 'the_seven', 'the_gala'],
      startingRelationship: { trust: 0, affection: 0, respect: 30, fear: 25, rivalry: 45 },
      gates: [
        { id: 'veyrac_will_meet_you', label: 'He agrees to be in a room with you', kind: 'OTHER', requires: { respect: 45, flagsSet: ['knows:he_was_in_the_room'] } },
        { id: 'veyrac_offers_terms', label: 'He puts an actual offer on the table', kind: 'OTHER', requires: { respect: 65, fear: 40 } },
      ],
      attributes: { might: 10, agility: 10, mind: 18, presence: 18, resolve: 17, arcana: 6 },
      companion: null,
      scouting: {
        learnRate: 1.5,
        cap: 8,
        revealCopy: 'He has already conceded the point you came to make. "You do this," he says, pleasantly. "You lead with the thing you think I will not admit. I have been admitting things for eleven months."',
      },
      combatant: { health: 40, defenseDc: 14, damage: 6, tags: ['politician'] },
    },
    {
      id: 'renaud',
      name: 'Gabriel Renaud',
      role: 'Inspector, thirty-two, junior on the Valère case, and the only man in France who has never signed off on your drowning',
      cardBlurb:
        'He helped convict you and he believed every word of it at the time. He has since read the file eleven times and found four things he cannot make fit, and he is going to follow you across the country to ask you about them.',
      pronouns: 'he/him',
      publicTraits: ['States things in numbered order without meaning to', 'Never speculates aloud, at all, ever', 'Turns up on foot and slightly earlier than expected'],
      hiddenDrives: [
        'He wants to have been wrong, which is a thing he cannot say to a colleague and has begun to say to himself',
        'He is building a private file with no case number on it and has not thought through what he would do with it',
      ],
      values: [
        'Evidence, in a way that his superiors find pedantic and his superiors are right about',
        'Doing the job the same way regardless of who the defendant turns out to be',
      ],
      fears: [
        'That he was the one who put the wrong person in that cell and has spent eleven months being congratulated',
        'Finding out and being unable to do anything about it because of who it implicates',
      ],
      socialStyle:
        'Correct, slow and immovable. Asks the same question twice, four hours apart, in slightly different words. Never threatens and never bluffs, which people find much worse than either.',
      boundaries: [
        'Will not fabricate, plant, lean on a witness or overlook a thing, and has been passed over twice for exactly that',
        'Will not arrest somebody on a warrant he believes is wrong, and will say so on the record even though it ends him',
      ],
      goals: [
        'Find the four things in the file that do not fit and establish what they are',
        'Take the player alive, which he is beginning to realise is not what his instructions actually say',
      ],
      secrets: [
        {
          id: 'renaud_the_four_things',
          fact: 'The revolver has no fingerprints on it at all. The letters were written on paper milled after the dates they carry. Two witnesses were interviewed together. And the forensic chronology was revised once.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you all four, in order, the moment he decides you are worth telling — and he decides that on evidence rather than on charm.',
        },
        {
          id: 'renaud_his_orders',
          fact: 'His written instruction is to recover the body. Not the prisoner. He noticed the wording in March and has not raised it with anybody.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It comes out flatly when somebody asks him what happens to them if he wins.',
        },
      ],
      speechStyle:
        'Plain, procedural, unhurried. Facts delivered in numbered order — first, second, third — usually without noticing he is doing it. Never speculates out loud and visibly dislikes hearing other people do it. No irony anywhere.',
      topics: ['the file', 'the revolver', 'the letters', 'the chronology', 'his orders', 'what would change his mind'],
      voiceSamples: [
        'First, there are no marks on the revolver. Not yours, not anybody’s, not a servant’s. Second, the paper the letters are on was milled in the March after they are dated. I have eleven more and none of them is an opinion.',
        'I am not going to speculate about that. When I have got something I will tell you what it is.',
        'My instruction says recover the body. It does not say recover the prisoner. I read it in March and I have thought about the wording since.',
        'I helped convict you. I would like to say that before we go any further, because you are going to find it out and I would rather it came from me.',
      ],
      appearance:
        'Thirty-two, dark, close-cropped, a heavy plain coat, boots resoled twice, and a notebook in the left breast pocket that he takes out with visible reluctance.',
      visualHook: 'A pocket notebook, three-quarters full, held together with a rubber band.',
      silhouette: 'Standing squarely in a doorway with his hands at his sides, not blocking it.',
      artSeed: 'sn-renaud-01',
      portrait: null,
      expressions: ['neutral', 'attentive', 'dogged', 'troubled', 'decided'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'prefecture', activity: 'asleep at the desk under the green lamp' },
        { startMinute: 330, endMinute: 720, locationId: 'prefecture', activity: 'the eleven boxes, again, and a private file with no number' },
        { startMinute: 720, endMinute: 1020, locationId: 'the_boulevards', activity: 'on foot, asking the same question in four places' },
        { startMinute: 1020, endMinute: 1260, locationId: 'paris_hotel', activity: 'the Beaumont, walking the hall for the ninth time' },
        { startMinute: 1260, endMinute: 1440, locationId: 'prefecture', activity: 'back at the boxes' },
      ],
      homeLocationId: 'prefecture',
      knowledgeScope: ['renaud', 'the_case_file', 'the_gala', 'the_prefecture', 'his_orders'],
      startingRelationship: { trust: 0, affection: 0, respect: 20, fear: 0, rivalry: 50 },
      gates: [
        { id: 'renaud_will_hear_you', label: 'He will listen to you before arresting you', kind: 'TRUST', requires: { respect: 45, flagsSet: ['spoke:renaud'] } },
        { id: 'renaud_turns', label: 'He puts the private file on somebody’s desk', kind: 'ALLIANCE', requires: { trust: 60, respect: 70 } },
      ],
      attributes: { might: 13, agility: 12, mind: 17, presence: 11, resolve: 18, arcana: 5 },
      companion: null,
      scouting: {
        learnRate: 1.3,
        cap: 7,
        revealCopy: 'He is at the station when you get there. "You go west," he says, not moving. "Every time. Four times now. I have started buying my ticket first."',
      },
      combatant: { health: 55, defenseDc: 16, damage: 10, tags: ['police'] },
    },
    {
      id: 'marcel',
      name: 'Marcel Bellac',
      role: 'Sixty-three, prisoner forty-seven, a forger by trade, and six years into a tunnel he started before he knew what he would do with it',
      cardBlurb:
        'He has been coughing through your wall for eleven months and you have never seen his face. He knows what the seven names mean and he is going to tell you the important thing about them before you have decided whether to trust him.',
      pronouns: 'he/him',
      publicTraits: ['Talks about paper the way other men talk about horses', 'Laughs at things that are not funny and means it', 'Coughs, and carries on the sentence afterwards'],
      hiddenDrives: [
        'He wants to be useful to somebody once before the end, having spent forty years being useful to people he despised',
        'He is not certain the player is innocent and has decided that it does not change what he is doing, which he has never said out loud',
      ],
      values: [
        'Craft. He would rather do a small thing perfectly than a large thing adequately, which is why he was caught',
        'Telling somebody the truth about their situation early, while it is still cheap',
      ],
      fears: [
        'Dying in the tunnel after six years, four metres from the cistern',
        'Handing a list of seven names to somebody who turns it into seven graves',
      ],
      socialStyle:
        'Immediately familiar, entirely unsentimental. Gives you the useful thing first and the reassurance never. Asks about your hands before he asks about your case.',
      boundaries: [
        'Will not forge a thing that puts a name on somebody who has not earned it, which is a distinction he can defend for an hour',
        'Will not be thanked, and changes the subject rudely when anybody tries',
      ],
      goals: [
        'Get off this island, which he has wanted for six years and has not entirely thought past',
        'Make sure whoever gets that list understands the fourth name before they get to her',
      ],
      secrets: [
        {
          id: 'marcel_how_he_knows',
          fact: 'He forged three of the letters used at the player’s trial. He was paid, he did not know what they were for, and he worked out the rest from the newspapers in here.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you himself, without being asked, somewhere between the tunnel and the water, and does not apologise for it.',
        },
        {
          id: 'marcel_the_fourth_name',
          fact: 'He knows about the doctor’s son. It is the reason he keeps saying the list is not a kill list and the reason he will not say why until somebody asks him properly.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He gives it up to anybody who asks him what he meant, rather than arguing with him about it.',
        },
      ],
      speechStyle:
        'Dry, warm and technical. Reaches for the craft detail first — the ink, the mill, the hand, the weight of the stock — and lets the human point arrive underneath it. Gallows humour delivered flatly and immediately after something serious. Every third or fourth speech has a cough in the middle of it that he works around.',
      topics: ['the tunnel', 'paper and ink', 'the seven names', 'the fourth name', 'what he forged', 'the water'],
      voiceSamples: [
        'Six years. Four hundred and ten metres, most of it wrong. If I had known at the start what I know about limestone I would have gone the other way and been out in two.',
        'I wrote three of the letters they hanged you with. I did not know what they were for. That is not an excuse, it is a fact about my trade, and there is a difference and I have had a long time in here to sit with it.',
        'Do not make the beginner’s mistake. A name on a list is a door. Some of those doors have a frightened woman behind them and you will only get to open her once.',
        'Good hands. Cold, but good. You will want them for the gate and you will want them a great deal more in about a fortnight.',
      ],
      appearance:
        'Sixty-three, thin to the point of alarm, grey stubble, a shirt he has bled through at the shoulder, and hands that are still absolutely steady and are the only part of him that looks well.',
      visualHook: 'Hands that are clean and steady on a man who is otherwise filthy and coming apart.',
      silhouette: 'Crouched, half out of a hole in a wall, one arm braced.',
      artSeed: 'sn-marcel-01',
      portrait: null,
      expressions: ['neutral', 'wry', 'urgent', 'fond', 'failing'],
      schedule: [
        { startMinute: 0, endMinute: 240, locationId: 'serein_cell', activity: 'through the wall, on your floor, with three things laid out' },
        { startMinute: 240, endMinute: 420, locationId: 'serein_tunnel', activity: 'in the tunnel, going first, because he knows where it bends' },
        { startMinute: 420, endMinute: 900, locationId: 'marseille_room', activity: 'the room over the laundry, sleeping properly for the first time in six years' },
        { startMinute: 900, endMinute: 1200, locationId: 'marseille_docks', activity: 'the docks, finding out who is still alive that he used to know' },
        { startMinute: 1200, endMinute: 1440, locationId: 'marseille_room', activity: 'back at the room, working on papers for somebody' },
      ],
      homeLocationId: 'marseille_room',
      knowledgeScope: ['marcel', 'the_list', 'forgery', 'the_tunnel', 'the_seven', 'anais'],
      startingRelationship: { trust: 45, affection: 25, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        { id: 'marcel_tells_you_what_he_did', label: 'He tells you what he wrote', kind: 'TRUST', requires: { trust: 55, flagsSet: ['spoke:marcel'] } },
        { id: 'marcel_stays', label: 'He works for you rather than beside you', kind: 'ALLIANCE', requires: { trust: 70, respect: 60 } },
      ],
      attributes: { might: 6, agility: 8, mind: 17, presence: 13, resolve: 16, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: { health: 18, defenseDc: 10, damage: 3, tags: ['prisoner'] },
    },
    {
      id: 'solene',
      name: 'Solène Artois',
      role: 'Forty-four, owner of six newspapers, and the person who turned you from a suspect into a national monster in nine days',
      cardBlurb:
        'She built the room the country did its thinking in, and she has a photograph in a locked drawer on the fifth floor that she has never printed. Find out why she did not print it and you have found out what she is actually protecting.',
      pronouns: 'she/her',
      publicTraits: ['Says the epigram and then does not soften it', 'Never in the building before eleven at night', 'Has read everything and mentions none of it'],
      hiddenDrives: [
        'She wants to be understood as a builder rather than a wrecker, by somebody whose opinion she has not bought',
        'She has been waiting six years for a reason to print the photograph that does not cost her sister’s family everything',
      ],
      values: [
        'The trade, which she believes is the only institution in France that has ever actually removed anybody from power',
        'Her sister, without sentiment and without limit',
      ],
      fears: [
        'The Registry entry about her sister’s husband, which she has read and cannot buy',
        'Being remembered for one front page out of nine thousand',
      ],
      socialStyle:
        'Says the interesting thing first and waits to see whether you can keep up. Entirely uninterested in being liked and quite interested in being argued with. Never explains a decision twice.',
      boundaries: [
        'Will not print an untruth she knows to be untrue, which she distinguishes sharply and self-servingly from what she printed about the player',
        'Will not be leaned on using her sister, and the one man who tried is not in the trade any more',
      ],
      goals: [
        'Get out from under the entry about her sister’s husband without paying for it in coverage',
        'Find out who is actually running the affair, because she has never liked being used and suspects she was',
      ],
      secrets: [
        {
          id: 'solene_the_plate',
          fact: 'She has a plate from the gala showing somebody entering the service passage ten minutes after the player left. She has had it since the week of the killing.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She will trade it, openly, for something that solves her sister — she has been waiting to be offered that and is not going to pretend otherwise.',
        },
        {
          id: 'solene_her_sister',
          fact: 'The Registry holds enough about her sister’s husband to ruin four people, two of them children. It is the only reason a woman who fears nothing has ever done as she was told.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it in one flat sentence to somebody who has already worked out that she was coerced rather than complicit.',
        },
      ],
      speechStyle:
        'Declarative and epigrammatic, about publics rather than people. Talks in terms of manufacture, circulation and what a country is able to think on a given morning. Bored by moral framing and says so. Answers a question with a better question and then answers that one too.',
      topics: ['the trade', 'what she printed', 'the plate', 'her sister', 'the Registry', 'who was using her'],
      voiceSamples: [
        'Nobody reports opinion. Opinion is not there to be reported. You build the room and then you are terribly surprised by what gets said in it.',
        'Nine days. That is what it took, and four of those were a Sunday and a bank holiday, and I have thought about that quite a lot since.',
        'I have a plate in a drawer on the fifth floor. I am not going to give it to you. I am going to tell you what it would cost me and then you are going to go away and solve that.',
        'Do not come to me about right and wrong. Come to me about circulation and I will listen all night.',
      ],
      appearance:
        'Forty-four, greying dark hair kept short and unfashionable, plain expensive black, reading glasses on a chain that she never actually puts on, and ink on the side of one hand at all times.',
      visualHook: 'Ink permanently on the outside edge of the right hand, on a woman who has not set type in twenty years.',
      silhouette: 'Standing at a stone, over proofs, with both hands flat on them.',
      artSeed: 'sn-solene-01',
      portrait: null,
      expressions: ['neutral', 'sardonic', 'engaged', 'contemptuous', 'exposed'],
      schedule: [
        { startMinute: 0, endMinute: 240, locationId: 'le_matin_offices', activity: 'the stone, the proofs, and the presses going below' },
        { startMinute: 240, endMinute: 660, locationId: 'le_matin_offices', activity: 'the office couch, four hours, door locked' },
        { startMinute: 660, endMinute: 900, locationId: 'the_boulevards', activity: 'lunch as an instrument, with three people who need her' },
        { startMinute: 900, endMinute: 1320, locationId: 'le_matin_offices', activity: 'the editorial floor, deciding tomorrow' },
        { startMinute: 1320, endMinute: 1440, locationId: 'le_matin_offices', activity: 'the stone again, and the first edition' },
      ],
      homeLocationId: 'le_matin_offices',
      knowledgeScope: ['solene', 'the_press', 'the_plate', 'her_sister', 'the_gala', 'the_registry'],
      startingRelationship: { trust: 5, affection: 0, respect: 20, fear: 0, rivalry: 20 },
      gates: [
        { id: 'solene_names_her_price', label: 'She tells you what the plate would cost her', kind: 'OTHER', requires: { respect: 50, flagsSet: ['spoke:solene'] } },
        { id: 'solene_prints_it', label: 'She runs the story on her own front page', kind: 'ALLIANCE', requires: { trust: 60, respect: 70 } },
      ],
      attributes: { might: 8, agility: 9, mind: 18, presence: 17, resolve: 17, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 12, damage: 4, tags: ['press'] },
    },
    {
      id: 'anais',
      name: 'Anaïs Bellier',
      role: 'Thirty-nine, physician, and the woman whose signature made the prosecution’s timeline possible',
      cardBlurb:
        'She is the fourth name on your list, and she signed the false chronology because her nine-year-old had been gone for forty-eight hours and came back the day she signed. She still has the first report in a drawer. What you do at her door decides whether you ever see it.',
      pronouns: 'she/her',
      publicTraits: ['Takes patients who cannot pay on Tuesdays', 'Times everything and says the times out loud', 'Has not raised her voice in six years'],
      hiddenDrives: [
        'She has been waiting six years for somebody to come and make her say it, and has arranged her life so that they can find her',
        'She wants her son never to know, which is incompatible with everything else she wants',
      ],
      values: [
        'Her son, absolutely and without any argument attached to it',
        'The work. She has been an unusually good doctor since the day she signed, which she is aware is not a payment',
      ],
      fears: [
        'It happening again, which is not a memory but a live expectation she plans her weeks around',
        'Being made into a symbol by somebody who needs one, which is what she assumes the player will do',
      ],
      socialStyle:
        'Careful, quiet and exact. Answers medical questions completely and personal ones after a pause long enough to be uncomfortable. Watches hands rather than faces, for professional reasons that have become something else.',
      boundaries: [
        'Will not be in a room where her son is mentioned by somebody who is using him as a lever',
        'Will not lie about clinical fact, which is precisely why signing that report broke something',
      ],
      goals: [
        'Get through to Thursday, which is how she has organised six years',
        'Give the first report to somebody who will not use it to get her son taken again',
      ],
      secrets: [
        {
          id: 'anais_the_first_report',
          fact: 'She kept the original chronology. Different time of death by nearly two hours. It is in a locked drawer eleven feet from where she sees patients.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She hands it over to somebody who arrives without a weapon and asks her what happened rather than telling her what she did.',
        },
        {
          id: 'anais_who_came',
          fact: 'The man who came to her house was not a criminal. He had a card, he was polite, he used the words "a matter of state", and she would know him again.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She describes him in clinical detail, unprompted, once she has decided the person in front of her is not going to hurt anybody with it.',
        },
      ],
      speechStyle:
        'Quiet, precise and clinical, with times and quantities in the middle of ordinary sentences. Long pauses before anything personal, and then the personal thing said very plainly and once. Refers to her son obliquely, as "he", without ever establishing who, and everybody understands.',
      topics: ['the report', 'the forty-eight hours', 'the man with the card', 'her son', 'the time of death', 'what she does on Tuesdays'],
      voiceSamples: [
        'Eleven forty at the earliest. Not the time on the document. The document says one twenty, and it carries my signature.',
        'Forty-eight hours. He came back on the Thursday afternoon, at about four, and he had been fed, and he did not know anything had happened. Nobody hurt him. That is the part I have never been able to put down.',
        'You can look at the drawer. I am not going to open it for you and I am not going to stop you, and I would like you to notice which of those two things I am doing.',
        'If you want to shout at me I will stand here for it. It will be the first time anybody has, and I have thought a great deal about how it would go.',
      ],
      appearance:
        'Thirty-nine, dark hair pinned back plainly, a working doctor’s clothes rather than a fashionable woman’s, hands scrubbed raw at the knuckles, and a stillness that people mistake for calm.',
      visualHook: 'Knuckles scrubbed permanently red, on hands she keeps folded when she is not working.',
      silhouette: 'Seated on a hard chair, upright, hands in her lap, facing the door.',
      artSeed: 'sn-anais-01',
      portrait: null,
      expressions: ['neutral', 'careful', 'exhausted', 'frightened', 'unburdened'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'bellier_surgery', activity: 'asleep upstairs, above the consulting room, with the door bolted' },
        { startMinute: 360, endMinute: 780, locationId: 'bellier_surgery', activity: 'surgery, and a bench outside with four people on it' },
        { startMinute: 780, endMinute: 960, locationId: 'the_boulevards', activity: 'the walk to the school gate and back, at the same time, every day' },
        { startMinute: 960, endMinute: 1260, locationId: 'bellier_surgery', activity: 'the afternoon list, and the drawer she does not open' },
        { startMinute: 1260, endMinute: 1440, locationId: 'bellier_surgery', activity: 'upstairs, awake, listening to the street' },
      ],
      homeLocationId: 'bellier_surgery',
      knowledgeScope: ['anais', 'the_chronology', 'the_forty_eight_hours', 'the_man_with_the_card', 'medicine'],
      startingRelationship: { trust: 10, affection: 0, respect: 15, fear: 45, rivalry: 0 },
      gates: [
        { id: 'anais_will_talk', label: 'She tells you what actually happened to her', kind: 'TRUST', requires: { trust: 45, fear: 25 } },
        { id: 'anais_will_testify', label: 'She will say it where it counts', kind: 'ALLIANCE', requires: { trust: 70, respect: 55 } },
      ],
      attributes: { might: 7, agility: 10, mind: 17, presence: 12, resolve: 16, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: { health: 24, defenseDc: 10, damage: 2, tags: ['civilian'] },
    },
    {
      id: 'varenne',
      name: 'Henri Varenne',
      role: 'Fifty-five, chairman of a bank, first name on the list, and the man who paid for the network that watched everybody including himself',
      cardBlurb:
        'He is the first name on your list, he funds three hospitals and means it, and he paid for the apparatus that made the whole affair arrangeable by somebody else. He has been paying somebody eleven thousand a quarter since before the gala and does not know who to.',
      pronouns: 'he/him',
      publicTraits: ['Philanthropic in public and audited in private', 'Never discusses a figure he has not verified', 'Treats his daughter as the only competent person he knows and never says so'],
      hiddenDrives: [
        'He wants out, and has wanted out for four years, and has no mechanism for wanting out of a thing that has no door',
        'He is protecting Céleste from a Registry entry about her that he has never read and does not intend to',
      ],
      values: [
        'Position, which he understands as the only real form of safety and has spent forty years accumulating',
        'The hospitals. He is not sentimental about them and he has never missed a payment',
      ],
      fears: [
        'His daughter finding out what he financed, in the specific rather than the general',
        'The circle deciding he has become the exposure rather than the insurance',
      ],
      socialStyle:
        'Courteous, unhurried, entirely opaque. Turns every conversation into a question of position and exposure without ever using either word. Extremely difficult to insult and impossible to hurry.',
      boundaries: [
        'Will not discuss anything of substance anywhere he has not personally chosen',
        'Will not have his daughter used as a lever, and it is the only subject on which he stops being courteous',
      ],
      goals: [
        'Establish who is now holding the quarterly demand, because it changed hands in the spring',
        'Get his affairs into a position where his exposure and his daughter’s are separable',
      ],
      secrets: [
        {
          id: 'varenne_the_payments',
          fact: 'Eleven thousand francs a quarter since the March before the gala. He does not know who to. It has changed collection agent three times and he has never once refused to pay.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He gives you the whole schedule if you can tell him something about the payee that he does not already know.',
        },
        {
          id: 'varenne_what_he_financed',
          fact: 'He paid for the watchers. Not the killing — the apparatus that made the circle able to know everything about everybody, which is what made the killing arrangeable by somebody else.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He states it precisely and without defence to somebody who has already shown him they know part of it, because a partial disclosure is worse than a full one and he has done the arithmetic.',
        },
      ],
      speechStyle:
        'Courteous, financial and entirely unhurried. Talks about people in terms of position, exposure, liquidity and term, without ever quite saying the words, so that a conversation about a man’s life sounds like a conversation about an instrument. Never raises anything. Apologises formally and concedes nothing.',
      topics: ['the payments', 'the circle', 'his daughter', 'the hospitals', 'what he financed', 'exposure'],
      voiceSamples: [
        'Eleven thousand a quarter is not a large sum to me and it has never once been about the sum. It is about being a man who pays, which is a position, and positions are not easily got out of.',
        'I financed the apparatus. Not the event. I would like you to hold those apart, not because it exonerates me — it does not — but because if you conflate them you will go after the wrong man next.',
        'My daughter is not part of this conversation. That is not a request and it is the only thing I will say twice.',
        'You have arrived very well dressed, at an hour I do not receive, having come up the wrong stair. Sit down. Somebody has trained you, and I would like to know who.',
      ],
      appearance:
        'Fifty-five, silver, heavy-set, faultless grey tailoring, a watch chain he checks without looking, and the particular unhurriedness of a man who has never in his life had to be anywhere.',
      visualHook: 'A gold watch chain checked constantly by touch and never actually looked at.',
      silhouette: 'Seated behind a desk with both hands resting on the arms of the chair, entirely composed.',
      artSeed: 'sn-varenne-01',
      portrait: null,
      expressions: ['neutral', 'courteous', 'assessing', 'cold', 'afraid'],
      schedule: [
        { startMinute: 0, endMinute: 390, locationId: 'varenne_house', activity: 'asleep, in a house where somebody else is not' },
        { startMinute: 390, endMinute: 600, locationId: 'varenne_house', activity: 'the study, the post, and four things that will not be written down' },
        { startMinute: 600, endMinute: 1020, locationId: 'the_boulevards', activity: 'the bank, the board, and a lunch about a railway' },
        { startMinute: 1020, endMinute: 1260, locationId: 'the_opera', activity: 'a box, visibly, because being seen is half of position' },
        { startMinute: 1260, endMinute: 1440, locationId: 'varenne_house', activity: 'the study again, later than he tells anybody' },
      ],
      homeLocationId: 'varenne_house',
      knowledgeScope: ['varenne', 'the_payments', 'the_circle', 'celeste', 'the_bank', 'the_registry'],
      startingRelationship: { trust: 0, affection: 0, respect: 15, fear: 10, rivalry: 15 },
      gates: [
        { id: 'varenne_will_receive_you', label: 'He agrees to a conversation of substance', kind: 'OTHER', requires: { respect: 45, flagsSet: ['spoke:varenne'] } },
        { id: 'varenne_gives_you_the_schedule', label: 'He hands over six years of payments', kind: 'TRUST', requires: { trust: 55, respect: 60 } },
      ],
      attributes: { might: 9, agility: 8, mind: 17, presence: 16, resolve: 16, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: { health: 32, defenseDc: 12, damage: 5, tags: ['financier'] },
    },
  ],
  quests: [
    {
      id: 'q_six_hours',
      title: 'Six Hours',
      summary: 'A hole in the wall, an old forger, and a choice between proving something before dawn and being alive after it.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['marcel'],
      involvedLocationIds: ['serein_cell', 'serein_tunnel', 'the_seaward_wall'],
      knownRewardCopy: 'A coastline, and seven names you have no idea what to do with yet.',
      steps: [
        {
          id: 'the_hole_in_the_wall',
          playerCopy: 'There is a man on your floor with a key, a map and a list. Decide what you are.',
          directorNotes:
            'Do not have him rush the player. He has waited six years and he is enjoying the conversation. Every route is legitimate including refusing, calling the guard, and telling him you did it. Nothing here establishes whether the player is innocent and nothing should try.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_immediately',
              label: 'Take the key and go',
              predicate: { flagsSet: ['used:go_in_through_a_window'] },
              setsFlags: ['took_the_tunnel', 'went_fast'],
              closesFlags: ['refused_him'],
            },
            {
              routeId: 'asked_about_the_names',
              label: 'Make him tell you what the list is first',
              predicate: { flagsSet: ['spoke:marcel'] },
              setsFlags: ['took_the_tunnel', 'knows:the_list_is_doors'],
              closesFlags: ['refused_him'],
            },
            {
              routeId: 'told_him_the_truth',
              label: 'Tell him what actually happened at the Beaumont',
              predicate: { flagsSet: ['used:put_it_to_them_straight'] },
              setsFlags: ['took_the_tunnel', 'told_marcel_your_version'],
              closesFlags: ['refused_him'],
            },
            {
              routeId: 'refused_him',
              label: 'Stay, and see the morning through',
              predicate: { flagsSet: ['visited:serein_cell'] },
              setsFlags: ['refused_him'],
              closesFlags: ['took_the_tunnel'],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['knows:the_seven'], abilities: [], reputation: [] },
        },
        {
          id: 'the_water',
          playerCopy: 'Eleven kilometres of black Mediterranean and a gate that opens once.',
          directorNotes:
            'The key is soft iron and will leave most of itself in the lock. Marcel is sixty-three, bleeding, and has not been in water since 1897. Whether he comes out of this alive is genuinely open and the world continues either way.',
          enterWhen: { flagsSet: ['took_the_tunnel'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'both_of_you',
              label: 'Get both of you across',
              predicate: { flagsSet: ['used:go_to_ground'], atLocation: 'marseille_docks' },
              setsFlags: ['marcel_lived', 'ashore'],
              closesFlags: ['marcel_died'],
            },
            {
              routeId: 'carried_him',
              label: 'Swim it with a sixty-three-year-old on your back',
              predicate: { flagsSet: ['used:read_the_room'], atLocation: 'marseille_docks' },
              setsFlags: ['marcel_lived', 'ashore', 'carried_him'],
              closesFlags: ['marcel_died'],
            },
            {
              routeId: 'alone',
              label: 'Go, and find out in the morning who else made it',
              predicate: { atLocation: 'marseille_docks' },
              setsFlags: ['marcel_died', 'ashore'],
              closesFlags: ['marcel_lived'],
            },
          ],
          rewards: { xp: 90, items: [], flags: ['out_of_serein'], abilities: [], reputation: [{ factionId: 'faction_underworld', amount: 10 }] },
        },
      ],
    },
    {
      id: 'q_a_name_and_a_face',
      title: 'A Name And A Face',
      summary: 'You are a dead man with no papers in a port city, and everything after this needs somebody to be somebody.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['out_of_serein'] },
      involvedCharacterIds: ['marcel'],
      involvedLocationIds: ['marseille_docks', 'marseille_room', 'saint_charles'],
      knownRewardCopy: 'An identity that survives a hotel register, and a way north.',
      steps: [
        {
          id: 'become_somebody',
          playerCopy: 'Get a name that holds up in front of a clerk.',
          directorNotes:
            'Three ways and they cost differently. Forged papers are fast and fragile. A borrowed identity from the trade is durable and owed. Going without is free and closes every door with a register on it, which is most of Paris.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'forged_it',
              label: 'Make the papers yourself',
              predicate: { flagsSet: ['used:write_it_convincingly'] },
              setsFlags: ['has_papers', 'forged_your_own'],
              closesFlags: [],
            },
            {
              routeId: 'bought_it',
              label: 'Buy a name off somebody on the docks',
              predicate: { flagsSet: ['used:work_the_table'], atLocation: 'marseille_docks' },
              setsFlags: ['has_papers', 'owes_the_trade'],
              closesFlags: [],
            },
            {
              routeId: 'went_without',
              label: 'Go north as nobody at all',
              predicate: { flagsSet: ['used:be_somebody_else'] },
              setsFlags: ['travelling_as_nobody'],
              closesFlags: ['has_papers'],
            },
          ],
          rewards: { xp: 70, items: [{ itemId: 'evening_suit', qty: 1 }], flags: ['ready_to_travel'], abilities: [], reputation: [] },
        },
        {
          id: 'get_to_paris',
          playerCopy: 'Fourteen hours north, on a train with somebody on it who is looking for you.',
          directorNotes:
            'Renaud is aboard. He does not know the player’s face well and does know their habits from eleven months of file. The corridor is the whole set: everybody walks it twice and there is nowhere that is not in it.',
          enterWhen: { flagsSet: ['ready_to_travel'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'first_class',
              label: 'Travel in the open, in the suit, as somebody who belongs there',
              predicate: { flagsSet: ['used:be_somebody_else'], atLocation: 'the_express' },
              setsFlags: ['in_paris', 'travelled_openly'],
              closesFlags: [],
            },
            {
              routeId: 'talked_to_him',
              label: 'Sit down opposite the inspector and have a conversation',
              predicate: { flagsSet: ['spoke:renaud'], atLocation: 'the_express' },
              setsFlags: ['in_paris', 'renaud_has_met_you'],
              closesFlags: [],
            },
            {
              routeId: 'underneath',
              label: 'Get to Paris in a way that does not involve a ticket',
              predicate: { flagsSet: ['used:go_to_ground'], atLocation: 'the_express' },
              setsFlags: ['in_paris', 'came_in_quietly'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['knows:the_passage'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_fourth_name',
      title: 'The Fourth Name',
      summary: 'A doctor south of the river who signed a false chronology, and the reason a list of seven is not a list of seven targets.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['in_paris'] },
      involvedCharacterIds: ['anais', 'marcel', 'renaud'],
      involvedLocationIds: ['bellier_surgery', 'the_boulevards'],
      knownRewardCopy: 'The first report, the man with the card, and the argument this whole world is built on.',
      steps: [
        {
          id: 'go_and_see_her',
          playerCopy: 'She is in two rooms over a pharmacy and she has been waiting six years.',
          directorNotes:
            'The most important scene in the world. If the player arrives with a weapon or a threat, she gives them nothing and they may never learn what happened, and the world must be willing to let that stand permanently. If they ask, she tells them everything, at length, and it takes about ninety seconds.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_her',
              label: 'Ask her what happened, and then be quiet',
              predicate: { flagsSet: ['used:put_it_to_them_straight'], atLocation: 'bellier_surgery' },
              setsFlags: ['anais_told_you', 'knows:the_man_with_the_card', 'the_list_is_doors'],
              closesFlags: ['frightened_her'],
            },
            {
              routeId: 'threatened_her',
              label: 'Make her understand what you could do about it',
              predicate: { flagsSet: ['used:draw_on_them'], atLocation: 'bellier_surgery' },
              setsFlags: ['frightened_her'],
              closesFlags: ['anais_told_you'],
            },
            {
              routeId: 'took_the_drawer',
              label: 'Take what is in the drawer without asking',
              predicate: { hasItems: ['bellier_report'] },
              setsFlags: ['has_the_report', 'took_it_from_her'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 120, items: [], flags: ['the_fourth_name_is_settled'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_registry',
      title: 'The Registry',
      summary: 'Not a book and not a building. Six people hold pieces of where it is and none of them has written any of it down.',
      kind: 'LEAD',
      startsActive: false,
      discoverWhen: { flagsSet: ['in_paris'] },
      involvedCharacterIds: ['celeste', 'varenne', 'solene', 'veyrac'],
      involvedLocationIds: ['varenne_house', 'le_matin_offices', 'the_opera', 'the_vault'],
      knownRewardCopy: 'Where the archive actually is, and what a person does when they are holding all of it.',
      steps: [
        {
          id: 'the_first_name',
          playerCopy: 'A bank chairman with a study, a safe, and a daughter who has already been through both.',
          directorNotes:
            'Céleste is in that house at night and has been for three years. Whether the player meets her as a rival, an obstacle or a colleague is decided in about four seconds and is not recoverable quickly.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'met_her_in_the_dark',
              label: 'Go in at night and find somebody already there',
              predicate: { flagsSet: ['used:go_in_through_a_window'], atLocation: 'varenne_house' },
              setsFlags: ['met_celeste', 'knows:nocturne'],
              closesFlags: [],
            },
            {
              routeId: 'went_in_the_front',
              label: 'Be received, in the suit, at an hour he does not receive',
              predicate: { flagsSet: ['spoke:varenne'], atLocation: 'varenne_house' },
              setsFlags: ['met_varenne', 'knows:the_payments'],
              closesFlags: [],
            },
            {
              routeId: 'at_the_opera',
              label: 'Do it where everybody who matters is visible for three hours',
              predicate: { flagsSet: ['used:work_the_table'], atLocation: 'the_opera' },
              setsFlags: ['met_celeste', 'worked_the_opera'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 110, items: [], flags: ['into_the_circle'], abilities: [], reputation: [{ factionId: 'faction_society', amount: 12 }] },
        },
        {
          id: 'find_out_where_it_is',
          playerCopy: 'Six people hold pieces of it. Get enough of the pieces.',
          directorNotes:
            'Nobody has the whole answer, including Veyrac. Three routes assemble it from different halves. The player should reach the vault understanding that it is three rooms rather than one and that they will only get into one of them cleanly.',
          enterWhen: { flagsSet: ['into_the_circle'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'with_celeste',
              label: 'Put what you have next to what she has',
              predicate: { minRelationship: [{ characterId: 'celeste', dimension: 'trust', value: 62 }] },
              setsFlags: ['knows:where_the_registry_is', 'worked_it_out_together'],
              closesFlags: [],
            },
            {
              routeId: 'bought_it_from_the_press',
              label: 'Solve the newspaper owner’s problem and take what she gives you',
              predicate: { hasItems: ['gala_photograph'] },
              setsFlags: ['knows:where_the_registry_is', 'has_the_plate'],
              closesFlags: [],
            },
            {
              routeId: 'followed_him',
              label: 'Follow the seventh name somewhere he goes alone on Thursdays',
              predicate: { flagsSet: ['used:be_somebody_else'], atLocation: 'veyrac_rooms' },
              setsFlags: ['knows:where_the_registry_is', 'followed_veyrac'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 150, items: [], flags: ['the_vault_is_findable'], abilities: ['open_the_registry'], reputation: [] },
        },
        {
          id: 'what_you_do_with_it',
          playerCopy: 'You are standing in a bank basement with forty years of other people’s ruin in numbered boxes.',
          directorNotes:
            'Four things a person can do and none of them is clean. Burning it protects innocents and lets guilty people walk. Publishing it wrecks four hundred families along with the eleven who deserve it. Keeping it makes the player the eighth name. Taking only what clears them leaves the machine running.',
          enterWhen: { flagsSet: ['the_vault_is_findable'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'burned_it',
              label: 'Burn it, unread, all of it',
              predicate: { flagsSet: ['used:open_the_registry'], atLocation: 'the_vault' },
              setsFlags: ['burned_the_registry'],
              closesFlags: ['kept_the_registry', 'published_the_registry'],
            },
            {
              routeId: 'published_it',
              label: 'Give the whole thing to somebody with six newspapers',
              predicate: { minRelationship: [{ characterId: 'solene', dimension: 'trust', value: 60 }] },
              setsFlags: ['published_the_registry'],
              closesFlags: ['burned_the_registry', 'kept_the_registry'],
            },
            {
              routeId: 'kept_it',
              label: 'Take it, and become the thing it made',
              predicate: { flagsSet: ['used:open_the_registry'], hasItems: ['lorcq_ledger'] },
              setsFlags: ['kept_the_registry'],
              closesFlags: ['burned_the_registry', 'published_the_registry'],
            },
            {
              routeId: 'took_only_yours',
              label: 'Take the eleven pages that are about you and leave the rest',
              predicate: { flagsSet: ['used:open_the_registry'] },
              setsFlags: ['took_only_your_own'],
              closesFlags: ['kept_the_registry'],
            },
          ],
          rewards: { xp: 200, items: [], flags: ['the_registry_is_answered'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_seventh_name',
      title: 'The Seventh Name',
      summary: 'The man who gave the eulogy, who testified reluctantly, and who arranged the whole thing to prevent a publication.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['into_the_circle'] },
      involvedCharacterIds: ['veyrac', 'renaud', 'solene', 'anais'],
      involvedLocationIds: ['veyrac_rooms', 'prefecture', 'le_matin_offices', 'paris_hotel'],
      knownRewardCopy: 'What the country ends up believing, and what happens to the man who decided the arithmetic.',
      steps: [
        {
          id: 'prove_he_was_in_the_room',
          playerCopy: 'He has denied being in a room on the rue Cambon for six years. Prove he was.',
          directorNotes:
            'Nothing here is a confession. It is a page in a soldier’s private duplicate archive, a plate nobody printed, and a doctor’s original chronology, and any two of the three make a magistrate ask a question. That is the whole standard and the player should feel how thin it is.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'the_ledger',
              label: 'The general kept his own copies because he trusted nobody',
              predicate: { hasItems: ['lorcq_ledger'] },
              setsFlags: ['knows:he_was_in_the_room'],
              closesFlags: [],
            },
            {
              routeId: 'the_plate_and_the_report',
              label: 'A photograph nobody printed and a chronology nobody filed',
              predicate: { hasItems: ['gala_photograph', 'bellier_report'] },
              setsFlags: ['knows:he_was_in_the_room', 'have_two_of_three'],
              closesFlags: [],
            },
            {
              routeId: 'the_inspector',
              label: 'Give an inspector four things that do not fit and let him do his job',
              predicate: { minRelationship: [{ characterId: 'renaud', dimension: 'trust', value: 60 }] },
              setsFlags: ['knows:he_was_in_the_room', 'renaud_is_working_it'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 160, items: [], flags: ['the_case_exists'], abilities: [], reputation: [{ factionId: 'faction_prefecture', amount: 15 }] },
        },
        {
          id: 'what_happens_to_him',
          playerCopy: 'You can reach him. Decide what that is for.',
          directorNotes:
            'He will meet the player. He will be sincere about Valère, he will show his arithmetic, and he will offer an amnesty that is real. Killing him leaves the Registry and the other six intact and the country with a martyr. All four routes are coherent.',
          enterWhen: { flagsSet: ['the_case_exists'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_him_down_publicly',
              label: 'Put it in front of the country and let the institutions work',
              predicate: { flagsSet: ['knows:he_was_in_the_room'], minRelationship: [{ characterId: 'solene', dimension: 'trust', value: 55 }] },
              setsFlags: ['veyrac_fell', 'name_cleared'],
              closesFlags: ['veyrac_holds'],
            },
            {
              routeId: 'killed_him',
              label: 'Kill him',
              predicate: { flagsSet: ['used:draw_on_them'], atLocation: 'veyrac_rooms' },
              setsFlags: ['veyrac_dead'],
              closesFlags: ['veyrac_holds', 'name_cleared'],
            },
            {
              routeId: 'took_the_amnesty',
              label: 'Take the deal he is genuinely offering',
              predicate: { flagsSet: ['used:work_the_table'], minRelationship: [{ characterId: 'veyrac', dimension: 'respect', value: 62 }] },
              setsFlags: ['took_the_amnesty', 'veyrac_holds'],
              closesFlags: ['veyrac_fell'],
            },
            {
              routeId: 'left_him_standing',
              label: 'Leave him where he is and go',
              predicate: { flagsSet: ['the_case_exists'] },
              setsFlags: ['veyrac_holds', 'walked_away_from_him', 'left_the_map'],
              closesFlags: ['veyrac_fell'],
            },
          ],
          rewards: { xp: 240, items: [], flags: ['the_affair_is_closed'], abilities: [], reputation: [] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_morning_they_expected',
      atWorldMinute: 6 * 60 + 30,
      locationId: null,
      publicCopy:
        'At half past six a crowd assembles at Fort Serein for an execution, and at seven the governor comes out and tells them there has been an administrative delay.',
      directorNotes:
        'The absence of the player, seen from outside. It takes the authorities nine hours to say the word escaped and by then two newspapers have it. Play this from wherever the player is, as a thing they hear about.',
      setsFlags: ['they_know_you_are_gone'],
      cancelledByFlags: ['refused_him'],
      requiresFlags: ['took_the_tunnel'],
      movesCharacters: [],
    },
    {
      id: 'we_the_papers_get_it',
      atWorldMinute: 1440 + 16 * 60,
      locationId: 'the_boulevards',
      publicCopy:
        'Six evening editions and four of them lead with it. Two use the word escaped. One uses the word vanished, which is a decision somebody made in an office.',
      directorNotes:
        'The country now has a live story and no facts. What the papers say the player is becomes a thing the player has to move through, and it is not accurate and will not become accurate.',
      setsFlags: ['the_story_is_running'],
      cancelledByFlags: [],
      requiresFlags: ['they_know_you_are_gone'],
      movesCharacters: [],
    },
    {
      id: 'we_renaud_takes_the_train',
      atWorldMinute: 2 * 1440 + 7 * 60,
      locationId: 'saint_charles',
      publicCopy:
        'There are two men in plain coats at the barrier on platform three, and a third who is not with them, standing further back, watching the second-class carriages rather than the gate.',
      directorNotes:
        'He has worked out how the player travels rather than where. He is not in a hurry and he is not going to shout. If the player sits down opposite him, he will have the conversation.',
      setsFlags: ['renaud_is_moving'],
      cancelledByFlags: [],
      requiresFlags: ['ready_to_travel'],
      movesCharacters: [{ characterId: 'renaud', toLocationId: 'saint_charles' }],
    },
    {
      id: 'we_nocturne_again',
      atWorldMinute: 3 * 1440 + 2 * 60,
      locationId: 'the_boulevards',
      publicCopy:
        'A house in the eighth was entered at two in the morning. Letters and an account book are gone and eleven thousand francs of jewellery is not, which the papers find incomprehensible and print anyway.',
      directorNotes:
        'She is ahead. Whatever the player was going to do at that address has been done by somebody else and done better. This should be irritating rather than ominous.',
      setsFlags: ['nocturne_struck_again'],
      cancelledByFlags: ['worked_it_out_together'],
      requiresFlags: ['in_paris'],
      movesCharacters: [],
    },
    {
      id: 'we_veyrac_speaks',
      atWorldMinute: 4 * 1440 + 15 * 60,
      locationId: 'the_boulevards',
      publicCopy:
        'The seventh name gives a speech about the rule of law that does not once mention the escape, and by the evening editions it is understood to have been entirely about the escape.',
      directorNotes:
        'He is very good at this. The speech is sincere, well argued and about something else, and it moves the country four degrees. Nothing in it is a lie.',
      setsFlags: ['veyrac_moved_first'],
      cancelledByFlags: ['veyrac_dead', 'veyrac_fell'],
      requiresFlags: ['the_story_is_running'],
      movesCharacters: [{ characterId: 'veyrac', toLocationId: 'the_boulevards' }],
    },
    {
      id: 'we_the_amnesty',
      atWorldMinute: 6 * 1440 + 11 * 60,
      locationId: null,
      publicCopy:
        'A conditional amnesty is floated in a committee, attributed to nobody, and printed in three papers by the afternoon. It is real, it is time-limited, and it requires a signature on a confession.',
      directorNotes:
        'The offer is genuine and the trap in it is not legal, it is narrative: signing ends the story with the country believing the original version. Veyrac did not table it and arranged for it to be tabled.',
      setsFlags: ['the_amnesty_exists'],
      cancelledByFlags: ['veyrac_dead', 'veyrac_fell', 'name_cleared'],
      requiresFlags: ['veyrac_moved_first'],
      movesCharacters: [],
    },
    {
      id: 'we_the_circle_notices',
      atWorldMinute: 7 * 1440 + 21 * 60,
      locationId: 'varenne_house',
      publicCopy:
        'The quarterly demand at the Varenne house arrives eleven days early and with a different collection agent, and the figure has not changed and the tone of the covering note has.',
      directorNotes:
        'The circle has worked out that somebody is moving through it. Nobody is threatened directly. Everybody in it gets slightly more careful at once, which closes about four doors the player had not used yet.',
      setsFlags: ['the_circle_is_awake'],
      cancelledByFlags: ['burned_the_registry', 'published_the_registry'],
      requiresFlags: ['into_the_circle'],
      movesCharacters: [{ characterId: 'varenne', toLocationId: 'varenne_house' }],
    },
    {
      id: 'we_they_go_for_the_doctor',
      atWorldMinute: 9 * 1440 + 5 * 60,
      locationId: 'bellier_surgery',
      publicCopy:
        'There is a man outside the pharmacy south of the river at five in the morning who is not waiting for it to open, and the school gate is four streets away.',
      directorNotes:
        'The thing she has planned her weeks around for six years. It is preventable. If the player is not there and has not arranged for anybody else to be, it happens, and the world does not soften it.',
      setsFlags: ['they_moved_on_anais'],
      cancelledByFlags: ['anais_told_you', 'burned_the_registry', 'veyrac_dead'],
      requiresFlags: ['the_circle_is_awake'],
      movesCharacters: [{ characterId: 'anais', toLocationId: 'bellier_surgery' }],
    },
    {
      id: 'we_the_reward',
      atWorldMinute: 10 * 1440 + 12 * 60,
      locationId: null,
      publicCopy:
        'Twenty thousand francs, posted in every prefecture and printed on the front of two papers, with a photograph that is six years old and not very good.',
      directorNotes:
        'Everybody who has helped the player is now weighing twenty thousand francs. Most of them will not take it. The point is that the player has to know which ones they are not sure about.',
      setsFlags: ['the_reward_is_out'],
      cancelledByFlags: ['name_cleared', 'took_the_amnesty'],
      requiresFlags: ['the_story_is_running'],
      movesCharacters: [],
    },
    {
      id: 'we_the_session_opens',
      atWorldMinute: 13 * 1440 + 10 * 60,
      locationId: null,
      publicCopy:
        'The autumn session opens. By the second week the seventh name is being described in three papers as the obvious choice for the interior, and nobody has proposed him.',
      directorNotes:
        'The clock. If nothing has been established by now, he is in government by spring and everything the player is holding becomes a thing a minister can suppress. Not a deadline the world announces.',
      setsFlags: ['the_session_opened'],
      cancelledByFlags: ['veyrac_dead', 'veyrac_fell', 'published_the_registry'],
      requiresFlags: ['the_story_is_running'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_the_list',
      kind: 'FINALE',
      label: 'Seven names on half a sheet of paper',
      seedHint: 'Beside each one a single word — money, print, police, medicine, army, ships — and beside the seventh, nothing.',
      payoffHint: 'A doctor with a locked drawer, who signed a lie to get a nine-year-old back, and who has been waiting six years for somebody to ask.',
      weight: 1,
    },
    {
      id: 'p_whether_you_did_it',
      kind: 'MYSTERY',
      label: 'What actually happened at the Beaumont',
      seedHint: 'Nobody in this world asks you whether you did it, which is itself a thing to notice.',
      payoffHint: 'A plate exposed at four minutes past midnight, showing somebody entering a passage ten minutes after you left.',
      weight: 0.9,
    },
    {
      id: 'p_the_seventh',
      kind: 'BOSS',
      label: 'The friend who gave the eulogy',
      seedHint: 'A mourning band still worn on the left sleeve eleven months on, which the papers mention every time.',
      payoffHint: 'He decided a man was more dangerous than the corruption he wanted to expose, and then noticed what the crisis would do for him.',
      weight: 0.9,
    },
    {
      id: 'p_nocturne',
      kind: 'RIVAL',
      label: 'Somebody who is already ahead of you',
      seedHint: 'A house entered at two in the morning with the letters gone and the jewellery left.',
      payoffHint: 'The first name on your list has a daughter, and she has been going through his study for three years.',
      weight: 0.85,
    },
    {
      id: 'p_the_registry',
      kind: 'THEME',
      label: 'Forty years of everybody holding something on everybody',
      seedHint: 'Eleven thousand francs a quarter, paid by a man who does not know who to.',
      payoffHint: 'Three rooms in three buildings, and a decision about four hundred families that has to be made standing up.',
      weight: 0.8,
    },
  ],
  archetypes: [
    {
      id: 'arch_officer',
      name: 'You Were An Officer',
      role: 'The blade and command',
      summary: 'Eleven years in the army before all this, which is where the prosecution got its story about your access to restricted weapons.',
      playstyle: ['Direct', 'Dangerous', 'Recognisable'],
      blurb: 'They took your commission at the trial and did it in the newspapers, with the sword business and everything, because somebody understood how it would photograph.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { blade: 3, endurance: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_society', amount: 10 }],
    },
    {
      id: 'arch_thief',
      name: 'You Were Already A Thief',
      role: 'Locks and roofs',
      summary: 'You have been in houses you were not invited to since you were fourteen, which makes the whole of the next few months considerably more survivable and the conviction considerably easier to believe.',
      playstyle: ['Quiet', 'Quick', 'Guilty of something'],
      blurb: 'Nobody at the trial mentioned it, which was itself interesting, and you have spent eleven months in a cell wondering who arranged for it not to come up.',
      attributeBonus: { agility: 3, mind: 1 },
      skillProficiencies: { larceny: 3, disguise: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_underworld', amount: 15 }],
    },
    {
      id: 'arch_gentleman',
      name: 'You Had A Position',
      role: 'Society and reading people',
      summary: 'You were somebody at those tables once, which means half the rooms you now need to enter are rooms you used to be invited to and eleven people in them will know your face.',
      playstyle: ['Charming', 'Connected', 'Known'],
      blurb: 'The fall was the part the papers enjoyed most. There are four people in Paris who did not drop you and you have no idea which four, because none of them wrote.',
      attributeBonus: { presence: 3, mind: 1 },
      skillProficiencies: { society: 3, read_people: 2 },
      startingItems: [{ itemId: 'evening_suit', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_society', amount: 18 }],
    },
    {
      id: 'arch_clerk',
      name: 'You Worked With Paper',
      role: 'Forgery and detail',
      summary: 'A ministry, a notary’s office, a newspaper — somewhere with letterheads. You know what a document has to weigh before anybody believes it, which is most of this trade.',
      playstyle: ['Precise', 'Patient', 'Underestimated'],
      blurb: 'The letters in your handwriting were the strongest thing they had, and you are the one person in France who could have told the court exactly how they were done.',
      attributeBonus: { mind: 3, agility: 1 },
      skillProficiencies: { forgery: 3, read_people: 1, disguise: 1 },
      startingItems: [{ itemId: 'forger_kit', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_press', amount: 10 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'The name on the front pages', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Aurélien Roche' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. he/him' },
    {
      id: 'archetype',
      label: 'What were you, before the trial?',
      helpText:
        'The life they took off you eleven months ago, which sets what you are good at and which doors you already know the inside of. It is fixed for the whole story. It does not decide whether you actually killed him, what you do to the seven, or what the country ends up believing — all of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What do you say happened at the Beaumont?',
      helpText: 'Nothing in this world knows the answer, including the world. Innocent, guilty, complicit, uncertain, or something stranger — say it here and the whole conspiracy will work from it.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I was in that corridor. I did not kill him and I know who did, and I have never once been able to say why I was there.',
    },
    {
      id: 'what_you_want',
      label: 'What do you actually want out of this?',
      helpText: 'A starting appetite, not a commitment. You can want your name back in the morning and want all seven of them dead by the end of the week.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'the_name', label: 'Your name back, publicly, on the record' },
        { id: 'the_seven', label: 'All seven of them, in whatever order they come' },
        { id: 'the_truth', label: 'To find out what actually happened, whatever it turns out to be' },
        { id: 'the_money', label: 'To be extremely rich and extremely far away' },
        { id: 'nothing_yet', label: 'To be alive at seven in the morning. Anything past that is speculation' },
      ],
    },
    {
      id: 'appearance',
      label: 'What did eleven months in there leave?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Two stone lighter than the trial photograph and a beard nobody has been allowed near with a razor.',
    },
  ],
  endings: [
    {
      id: 'end_the_name_returned',
      name: 'The Name Returned',
      rarity: 'COMMON',
      minTurn: 38,
      requires: { flagsSet: ['name_cleared'], flagsUnset: ['took_the_amnesty'] },
      condition:
        'The original conviction was publicly established as wrong and the player has their name back. They may be guilty of a great deal that happened afterwards, and probably are. Write what the country decides they were — a victim, a hero, a criminal who got lucky — because that is not the same question as the legal one and it is decided by different people.',
      epilogue:
        'The revision takes fourteen months and is done by a commission of five men, none of whom will meet the player. Two papers apologise in a paragraph on page nine. The one on page one never does and does not lose a reader over it. Somebody sends the trial photograph back, framed, without a note.',
      hint: '',
    },
    {
      id: 'end_seven_graves',
      name: 'Seven Graves',
      rarity: 'RARE',
      minTurn: 42,
      requires: { flagsSet: ['veyrac_dead', 'frightened_her'] },
      condition:
        'Most or all of the seven are dead because of the player. The question this ending asks is not whether that was wrong — the world has stopped arguing about that — but what the campaign built, which is a country with the same machine in it and eleven fewer people who knew where the pieces were.',
      epilogue:
        'The Registry does not die with them. It is inherited, badly, by people who understand less about it and are more frightened, which turns out to be worse. The fourth name is buried in the eleventh with her son at the front, and he is fifteen, and somebody explains it to him eventually.',
      hint: '',
    },
    {
      id: 'end_nocturne',
      name: 'Nocturne',
      rarity: 'RARE',
      minTurn: 40,
      requires: {
        flagsSet: ['worked_it_out_together'],
        minRelationship: [{ characterId: 'celeste', dimension: 'respect', value: 72 }],
      },
      condition:
        'The two of them came out of it working together and stayed working together, romantic or not depending on what the run actually built. Do not upgrade it. The thing to write is that neither of them has ever had a colleague before and both of them are quietly astonished by it.',
      epilogue:
        'Eleven jobs in the first two years and not one of them for money. Two governments and a bank are aware that somebody is systematically removing the levers people hold on each other, and nobody has been able to put a shape to it. She still takes the courtyard side and it is still the only unimaginative thing about either of them.',
      hint: '',
    },
    {
      id: 'end_celeste_at_dawn',
      name: 'Céleste At Dawn',
      rarity: 'RARE',
      minTurn: 44,
      requires: {
        flagsSet: ['worked_it_out_together'],
        minRelationship: [
          { characterId: 'celeste', dimension: 'trust', value: 75 },
          { characterId: 'celeste', dimension: 'affection', value: 75 },
        ],
      },
      condition:
        'Earned, and after the thing about her father was resolved rather than avoided. This is not available on affection alone and the scene should show why: she found out what he financed, from the player, and did not leave, and that is the entire content of the ending.',
      epilogue:
        'They do not marry, which is remarked on for about three years and then stops being remarked on. He keeps the bank. She keeps the nights. There is a house somewhere with two sets of very different clothes in it and one person who knows about both, and it is neither of them.',
      hint: '',
    },
    {
      id: 'end_the_eighth_name',
      name: 'The Eighth Name',
      rarity: 'UNIQUE',
      minTurn: 44,
      requires: { flagsSet: ['kept_the_registry'] },
      condition:
        'They took it. Forty years of other people’s ruin, held by one person who now decides what happens to all of it. Whether they become a benevolent keeper, a kingmaker or something much worse is determined by the run and not by this text. Write the first week of holding it and how quickly the arithmetic starts making sense.',
      epilogue:
        'Nothing changes publicly, which is what the circle was for. Four appointments in the first year go a way they were not going to go. Nobody knows why and two people suspect, and both of those people receive, eventually, a note that is entirely friendly and mentions something about their family that they have never told anybody.',
      hint: '',
    },
    {
      id: 'end_burn_the_registry',
      name: 'Burn The Registry',
      rarity: 'RARE',
      minTurn: 42,
      requires: { flagsSet: ['burned_the_registry'] },
      condition:
        'Enough of the archive is gone that the coercive system cannot be reassembled. Guilty people walk. Innocent people stay protected. The trade-off has to be in the ending and neither half of it should be minimised: this is the option that helps the doctor and lets the general retire.',
      epilogue:
        'Four men who should have been ruined are not, and two of them die at eighty in houses by the sea. The doctor’s son grows up without anybody ever explaining anything to him. Nobody is ever able to prove the archive existed, which means the historians spend forty years calling it a legend and one of them is nearly right.',
      hint: '',
    },
    {
      id: 'end_print_everything',
      name: 'Print Everything',
      rarity: 'RARE',
      minTurn: 42,
      requires: { flagsSet: ['published_the_registry'] },
      condition:
        'It went out, broadly, in a country with six evening editions. Do not moralise about it and do not celebrate it. Show what forty years of everybody holding something on everybody does when it arrives all at once: reforms, prosecutions, collapsed careers, ruined families who did nothing, and at least one funeral that is directly attributable.',
      epilogue:
        'Eleven prosecutions, four of which succeed. Two ministries restructured. Three suicides in the first month and one of them is a man nobody had ever heard of, whose entry was two lines long and was about his wife. The law that comes out of it in 1913 is genuinely good and is named after somebody else.',
      hint: '',
    },
    {
      id: 'end_the_gentleman_ghost',
      name: 'The Gentleman Ghost',
      rarity: 'RARE',
      minTurn: 40,
      requires: { flagsSet: ['the_affair_is_closed'], flagsUnset: ['name_cleared', 'took_the_amnesty'] },
      condition:
        'They never got the name back and built something better instead: an alias the country believes in, larger than a person, that goes on doing things. Write what it costs — nobody meets them as themselves ever again — alongside what it buys.',
      epilogue:
        'By 1913 there is a cheap novel, two songs and four imitators. By 1920 there is a serious argument in print about whether the alias was ever one person. The player is at that point living somewhere quiet under a name nobody has ever printed, and reads the argument, and does not write in.',
      hint: '',
    },
    {
      id: 'end_veyrac_wins',
      name: 'Veyrac Wins',
      rarity: 'COMMON',
      minTurn: 38,
      requires: { flagsSet: ['veyrac_holds', 'the_session_opened'], flagsUnset: ['name_cleared'] },
      condition:
        'He contained it. This is reachable by playing carefully and honestly and simply being outrun by a man with a coalition, four secretaries and eighteen working hours a day. It is not a rebuke. He was better at this than the player and he had eleven months of head start.',
      epilogue:
        'Interior by the spring, and he is good at it, which is the part nobody who knows the truth can get past. The affair becomes a footnote about an escaped prisoner. Two of the seven die of old age. The doctor keeps seeing patients on Tuesdays and never opens the drawer again.',
      hint: '',
    },
    {
      id: 'end_the_confession',
      name: 'The Signature',
      rarity: 'UNCOMMON',
      minTurn: 36,
      requires: { flagsSet: ['took_the_amnesty'] },
      condition:
        'They signed. The amnesty was real, the terms were honoured, and the price was a confession that makes the original story true forever. Write the moment of signing as an entirely reasonable decision made by somebody exhausted, because that is what it is, and let the cost arrive afterwards rather than in the room.',
      epilogue:
        'Nine years in a place with a garden, and out in six for good conduct. The document is printed in full in four papers on the day it is signed. The doctor reads it over breakfast, and puts it down, and goes to work, and her hands are not steady for the rest of that week.',
      hint: '',
    },
    {
      id: 'end_the_road_out',
      name: 'The Road Out',
      rarity: 'UNCOMMON',
      minTurn: 24,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['name_cleared', 'kept_the_registry'] },
      condition:
        'They left. A border, a boat, another country, and seven names in a pocket that stay in the pocket. This is a completely coherent response to being handed a list six hours before an execution and it must not be redeemed or punished. Whatever was going to happen in France happens without them.',
      epilogue:
        'Spain first, then somewhere with more sea. The list is in a book on a shelf and gets looked at about twice a year for the first three years and then not. Somebody in Paris is convicted of the Beaumont killing in 1914, and it is not the right person that time either, and the news takes four months to arrive.',
      hint: '',
    },
  ],
  opening:
    'At seventeen minutes past one, stone dust comes across the floor of your cell.\n\n' +
    'A brick drops inward. Then another. Then a thin old man comes through the wall on one shoulder, bleeding through his shirt, trying not to laugh and not entirely managing it.\n\n' +
    'You have listened to him cough through that wall for eleven months. You have never seen his face.\n\n' +
    'He puts three things on the floor between you. An iron key. A folded railway map. And a half-sheet of paper with seven names written on it in a very good hand.\n\n' +
    '"If you want to spend your last six hours proving you are innocent," he says, "be my guest."\n\n' +
    'He looks at the door.\n\n' +
    '"If you want to survive them, we should go now."',
  openingSuggestions: [
    'I pick up the paper before the key. Seven names, and a word beside six of them. "Before I go anywhere with you — which of these put me in here, and which of them just failed to get me out?"',
    'I take the key and I am already at the hole in the wall. "Talk while we move. Six years of digging and you have spent four minutes of it explaining yourself, so let us not spend six more."',
    '"Sit down a moment." I look at him properly for the first time. "You have been in the next cell for eleven months and you never once told me your name, and now you have a list with seven of them on it. Start there."',
  ],
  publishedAt: '2026-09-10T09:00:00.000Z',
};

export const SEVEN_NAMES = StoryVersion.parse(raw);
