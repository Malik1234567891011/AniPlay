import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Zero Throne" — the machine kneels on turn one, and everything after that is
 * politics.
 *
 * The bible's instruction is unusually specific and unusually good: do not put
 * the famous moment behind onboarding. So the world opens eight minutes into
 * the anniversary ceremony with four thousand witnesses and a mech walking the
 * length of a plaza, and the player may climb in, back away, attack it, or ask
 * it who it thinks they are. Refusing the cockpit is authored, not punished.
 *
 * The playable span is the fortnight after that, on and around one neutral
 * orbital station. The Nine-Day War, Lysandra and HELIOS are eighteen years of
 * backstory carried in lore, items and what six people will and will not say;
 * the second war, if it happens, is an ending. Compressing it that way is what
 * lets the cast be autonomous — Rhea can be investigating Lysandra while the
 * player is somewhere else, and the player finds out afterwards.
 *
 * Public reputation is deliberately not one number. Six factions with rank
 * ladders, because "Helion thinks you are an asset and the survivors of
 * Lysandra think you are obscene" is the normal state of anybody who gets into
 * that cockpit, and a single meter cannot hold it.
 *
 * Three variables. Nerve is the only GOOD_HIGH — `resolveRest` refills those,
 * and a pilot who has slept is the honest thing for that to mean. Pressure is
 * first among the descending pair because the generic cost path and
 * PUBLIC_VIOLENCE both take the first GOOD_LOW in array order, and a fight on
 * a neutral station moving the whole system closer to war is exactly right.
 */

const raw = {
  id: 'sv_zero_throne_1',
  storyId: 'story_zero_throne',
  version: 1,
  title: 'Zero Throne',
  fantasyLabel: 'It knelt. Every camera saw it choose you.',
  hook: 'Eighteen years after the machine that killed a city was sealed behind glass, it wakes up in the middle of a memorial ceremony, crosses the plaza, and kneels to you.',
  premise:
    'Eighteen years ago a war ended in a single night when a city of four million came apart, and the pilot everybody blames for it died inside his machine.\n\n' +
    'The machine did not. It has stood behind armoured glass on a neutral station ever since — sealed, warm, and refusing to open — while the two governments that nearly ended the world sign the same treaty on the same day every year and call it peace.\n\n' +
    'You are on that station for the anniversary. So is most of the press.\n\n' +
    'At eight minutes past one it turns its eyes on. It tears out of its braces without firing a shot, empties the plaza, walks the length of it to where you happen to be standing, and kneels.\n\n' +
    'The cockpit opens. A voice comes out of it and says you are the pilot.\n\n' +
    'You have no idea why. Neither does anybody else, and by tonight several people who run things will need an answer more urgently than you do.\n\n' +
    'Some of them want the machine. Some of them want you. One of them already knows what actually happened that night and has spent eighteen years keeping it secret.\n\n' +
    'You do not have to get in. Something underneath the armistice has started moving again, and it has noticed you either way.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Military', 'Mystery', 'Rivalry', 'Investigation', 'Team'],
  mechanicsChips: [
    'The machine has opinions',
    'Six reputations, not one',
    'Refusing the cockpit is a route',
    'The truth is optional and expensive',
    'People act while you are elsewhere',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'MORAL_AMBIGUITY', 'PSYCHOLOGICAL_THEMES', 'ROMANCE'],
  intensity: 'INTENSE',
  creatorNote:
    'You can climb in on turn one and never get out. You can also refuse it, walk to the docks, and spend the fortnight as a mechanic, a journalist or a smuggler while other people fight over a machine that wanted you. Both are the whole game. Morrow will argue with you about either.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'memorial_plaza',
    startWorldMinute: 13 * 60 + 8,
    startingItems: [{ itemId: 'ring_pass', qty: 1 }],
    hardCanon: [
      'The Nine-Day War ended eighteen years ago at Lysandra, a city of nearly four million, which was destroyed.',
      'Official history blames Aren Vale, the Helion ace who piloted Vesper Zero, and says he suffered a psychological break and died in the machine.',
      'Vesper Zero was recovered almost intact, would not open, would not fully shut down, and has stood in a sealed hangar on Meridian Ring ever since.',
      'On the eighteenth anniversary, at 13:08 station time, Vesper Zero wakes, crosses the memorial plaza, kneels to the player and opens. This is not negotiable and it happens in public.',
      'HELIOS existed: an autonomous strategic-defence network both governments believed they controlled separately and neither did. What survives of it is unresolved and must stay unresolved for some time.',
      'Morrow is Vesper’s onboard intelligence. It has preferences, it can be wrong, it can withhold, and it does not override the player.',
      'Aren Vale did not intentionally destroy Lysandra. This is discoverable and it is not owed to anybody, and a run can end without ever establishing it.',
    ],
    toneGuide:
      'War is human before it is mechanical. The mech state stays underneath the prose — three rifle rounds left is a warning blooming across the left of a cockpit, never a permanent readout of six numbers. ' +
      'Nobody here is the villain and at least two people who want the machine have arguments the player may sincerely agree with. Venn in particular must sometimes be right. ' +
      'Ordinary life is load-bearing: a pilot bar, somebody’s bad coffee, an argument about a shoulder mount that goes on for three days, a nineteen-year-old being asked about his grandfather by strangers on a concourse. ' +
      'Morrow is short, precise and occasionally unexpectedly human. Never "based on probabilistic analysis"; always "that plan gets us shot". ' +
      'Fights are legible: distance, thrust, heat, what the sensors can and cannot see. A duel between two people who know each other reads as a conversation.',
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 13, mind: 14, presence: 12, resolve: 14, arcana: 8 },
  skills: [
    { id: 'piloting', name: 'Piloting', attribute: 'agility', description: 'Seventeen metres of mass at speed, and where it will be in two seconds rather than where it is.' },
    { id: 'gunnery', name: 'Gunnery', attribute: 'agility', description: 'Lead, drop, and the shot you do not take because of what is behind the target.' },
    { id: 'systems', name: 'Systems', attribute: 'mind', description: 'Sensors, jamming, archives and the parts of a network that were never meant to be read from outside.' },
    { id: 'wrench', name: 'Wrench', attribute: 'mind', description: 'What is actually wrong with it, as opposed to what the diagnostic says is wrong with it.' },
    { id: 'plainspeak', name: 'Plain Speaking', attribute: 'resolve', description: 'Saying the true thing to somebody with rank, on a record, while it can still change what happens.' },
    { id: 'command', name: 'Command', attribute: 'presence', description: 'Being obeyed by people who have not decided yet whether you are worth obeying.' },
    { id: 'salvage', name: 'Salvage', attribute: 'might', description: 'Getting a thing out of a wreck, off a station, or through a customs line that was not expecting it.' },
  ],
  resources: [
    {
      id: 'nerve',
      name: 'Nerve',
      max: 100,
      start: 76,
      regenPerHour: 2.5,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The hands are still good and nothing else is. Decisions arrive a half-second late, which at closing speed is a hull, and everyone on the channel can hear it in the voice before they can see it on the plot.',
      color: '#5F8FBF',
      bands: [
        {
          upTo: 24,
          behaviour:
            'Running on the last of it. Long silences on the comms, agreement given to end conversations rather than because it was meant, and a habit of not checking the second sensor return. This is the band where a fight that should have been won gets survived instead, and where sleeping is the strongest move on the board.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary exhaustion of a fortnight that has been on every screen in the system. Good for one hard conversation or one launch and honest about not being good for both. Morrow starts checking rather than reporting.',
        },
        {
          upTo: 100,
          behaviour:
            'Whole. Enough left to hold a duel and a negotiation on the same afternoon and be present in each. The player can hear the thing under what somebody is saying, and can say the difficult sentence in the shape that lands rather than the shape that gets it said.',
        },
      ],
    },
    {
      id: 'pressure',
      name: 'Pressure',
      max: 100,
      start: 34,
      regenPerHour: 0.2,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The armistice is boring again. Delegations argue about docking fees. The memorial hangar has a hole in it that somebody has scheduled a contractor for, and the biggest story on the station is the contractor’s quote.',
      color: '#C0553F',
      bands: [
        {
          upTo: 28,
          behaviour:
            'The armistice as it has been for eighteen years: a treaty nobody loves, enforced mostly by exhaustion. Traffic moves. Both delegations are unpleasant to each other in committee and eat in the same room afterwards. Anything that happens now is an incident rather than a cause.',
        },
        {
          upTo: 58,
          behaviour:
            'Crisis footing. Delegations stop sharing a room. Civilian traffic is being routed around three corridors that were open last week, and both militaries have moved something and described it as a rotation. Journalists have started phoning families of the dead again.',
        },
        {
          upTo: 82,
          behaviour:
            'Skirmishing. There have been engagements that both sides describe as defensive and neither will formally acknowledge. Reservists are being recalled. On the station, people who have worked together for a decade have started sitting with their own. Anything now happens between governments rather than between people.',
        },
        {
          upTo: 100,
          behaviour:
            'The chain of events that ended the last war is running again, faster, with both sides certain the other moves first. Somebody senior is going to authorise something enormous within the day, and every argument for restraint is being made by people who no longer have the room.',
        },
      ],
    },
    {
      id: 'wear',
      name: 'Wear',
      max: 100,
      start: 22,
      regenPerHour: -0.7,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Everything answers. The frame is straight, the reactor holds where it is put, and the machine does the thing a fraction before it is asked, which is a sensation the player will spend the rest of the story trying to get back.',
      color: '#8A8577',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Sound. It goes where it is pointed and stops where it is told, and the only thing in the cockpit is the mission. Mina is bored, which she expresses by improving things nobody asked her to improve.',
        },
        {
          upTo: 55,
          behaviour:
            'Working, with a list. A shoulder that runs hot, a sensor that lies by four degrees on the left, and a hydraulic note that was not there on Tuesday. None of it stops anything. All of it is a thing to remember at the wrong moment, and Morrow will mention each of them exactly once.',
        },
        {
          upTo: 80,
          behaviour:
            'Damaged and flying. Armour gone in places that matter, thrust down on one side so every turn is a decision, and a reactor that has to be talked into full output. Fights have to be short now. Mina has stopped joking and started giving times in hours.',
        },
        {
          upTo: 100,
          behaviour:
            'Held together by the fact that nobody has switched it off yet. Any serious engagement ends it, and Morrow will say so plainly and then do what it is told anyway, which is worse than being refused.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'ring_pass',
      name: 'Your Ring Pass',
      tags: ['document'],
      questItem: true,
      droppable: false,
      description: 'A visitor credential for the anniversary, printed this morning, with your name on it and a bar code that four different agencies are going to run in the next hour.',
      loreText: 'By tonight this is the most photographed piece of laminate in the system, and there are eleven versions of your name in circulation, two of which are wrong.',
      icon: 'card',
    },
    {
      id: 'flight_jacket',
      name: 'A Pilot’s Jacket',
      tags: ['clothing'],
      equipSlot: 'body',
      skillModifiers: { command: 1 },
      description: 'Heavy, unmarked, cut for somebody who spends time in a harness. Wearing one on this station is a statement and everybody who sees it reads the same statement.',
      loreText: 'The unmarked ones are Freewake. Everybody knows that and nobody says it, which is roughly how the Freewake prefer things.',
      icon: 'coat',
    },
    {
      id: 'hand_torque',
      name: 'Mina’s Spare Torque Driver',
      tags: ['tool'],
      skillModifiers: { wrench: 2 },
      description: 'Worn grip, calibrated by somebody who does not trust the factory setting, with three initials scratched into the shaft and only one of them hers.',
      loreText: 'She lends it out constantly and gets it back every time, because the people she lends it to are the kind of people who bring a tool back.',
      icon: 'tool',
    },
    {
      id: 'ardent_key',
      name: 'A Helion Ident Key',
      tags: ['quest', 'access'],
      questItem: true,
      description: 'A physical override token in a stamped Helion case. It opens doors on this station that the Meridian Authority believes only it can open.',
      loreText: 'It is issued to twelve people. Three of them are on the Ring this week and one of them has already noticed hers is missing.',
      icon: 'key',
    },
    {
      id: 'lysandra_slate',
      name: 'The Lysandra Slate',
      tags: ['quest', 'document', 'evidence'],
      questItem: true,
      skillModifiers: { systems: 2 },
      description: 'A ruggedised field recorder pulled out of a command bunker that was not supposed to have survived. Ninety minutes of two militaries talking to a system they both thought was theirs.',
      loreText: 'The last four minutes are the ones that matter. There is a voice on it giving an order and then, eleven seconds later, giving the opposite one, and the second voice is not human.',
      icon: 'slate',
    },
    {
      id: 'casualty_projection',
      name: 'The Projection',
      tags: ['quest', 'document', 'evidence'],
      questItem: true,
      description: 'One page. Two columns. What a machine calculated would die at Lysandra, and what it calculated would die if it did nothing. The second number has nine digits.',
      loreText: 'Somebody has written a single word on the corner of it in pen, years after it was printed, and the word is "still".',
      icon: 'papers',
    },
    {
      id: 'morrow_shard',
      name: 'The Deleted Sector',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'A physical storage lattice from Vesper’s core, holding what Morrow removed from itself while it sat in the dark for eighteen years. It has never been read.',
      loreText: 'It was not corrupted and it was not lost. It was excised, carefully, by something that then went on running without it on purpose.',
      icon: 'chip',
    },
    {
      id: 'ration_coffee',
      name: 'Station Coffee',
      tags: ['food'],
      consumable: { resourceId: 'nerve', amount: 20, consumesItem: true },
      description: 'Terrible, hot, and the single most traded commodity on a station where forty thousand people work shifts that do not agree with each other.',
      loreText: 'The bar on the concourse does a version with something in it that is not coffee. Ask for it by saying nothing and putting two fingers on the counter.',
      icon: 'cup',
    },
  ],
  abilities: [
    {
      id: 'read_the_field',
      name: 'Read the Field',
      tags: ['sight'],
      description: 'Take the plot, the returns nobody is looking at, and the thing that is where nothing should be, and know what is about to happen before it does.',
      affordances: ['scan', 'check the sensors', 'read the field', 'look at the plot', 'assess', 'what am i looking at', 'observe'],
      costs: [{ resourceId: 'nerve', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'systems', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'open_up',
      name: 'Open Up',
      tags: ['offensive'],
      description: 'The rifle, at distance, at something you have decided about. Seventeen metres of machine makes this an enormous public act wherever it is done.',
      affordances: ['shoot', 'fire', 'open fire', 'attack', 'shoot at it', 'take the shot', 'rifle'],
      costs: [
        { resourceId: 'nerve', amount: 8 },
        { resourceId: 'wear', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'gunnery', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'close_the_distance',
      name: 'Close the Distance',
      tags: ['movement'],
      description: 'Thrusters and the blade, straight down the throat of somebody who was counting on having more room than that.',
      affordances: ['charge', 'close', 'get in close', 'melee', 'blade', 'rush him', 'boost in', 'ram'],
      costs: [
        { resourceId: 'nerve', amount: 11 },
        { resourceId: 'wear', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'piloting', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_the_line',
      name: 'Hold the Line',
      tags: ['defensive'],
      description: 'Countermeasures, the obsolete shield mount nobody has taken off, and standing in front of something that cannot move as fast as you can.',
      affordances: ['defend', 'shield', 'cover them', 'block', 'hold', 'protect the civilians', 'get between'],
      costs: [
        { resourceId: 'nerve', amount: 9 },
        { resourceId: 'wear', amount: 12 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'resolve', skillId: 'piloting', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ask_morrow',
      name: 'Ask Morrow',
      tags: ['utility'],
      description: 'Put the question to the thing that has been awake in the dark for eighteen years, and find out whether it is going to answer this one.',
      affordances: ['ask morrow', 'morrow', 'talk to the ai', 'ask the machine', 'query', 'what do you think'],
      costs: [{ resourceId: 'nerve', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'say_it_on_the_record',
      name: 'Say It On The Record',
      tags: ['social'],
      description: 'Say the true thing where it cannot be unsaid, to somebody with rank, with the recorders running. Nothing about this can be walked back.',
      affordances: ['tell them', 'go public', 'say it', 'on the record', 'tell the truth', 'make a statement', 'confront', 'accuse'],
      costs: [
        { resourceId: 'nerve', amount: 9 },
        { resourceId: 'pressure', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'plainspeak', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stand_down',
      name: 'Stand Down',
      tags: ['social'],
      description: 'Power the weapons down where they can see you do it, and be the one who did that first. It is the hardest thing on this list and it works more often than it should.',
      affordances: ['stand down', 'de-escalate', 'power down', 'lower weapons', 'refuse to fight', 'talk them down', 'surrender'],
      costs: [{ resourceId: 'nerve', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'command', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'get_under_the_plating',
      name: 'Get Under the Plating',
      tags: ['utility'],
      description: 'Find what is actually wrong rather than what the diagnostic says is wrong, and either fix it or change it into something else.',
      affordances: ['repair', 'fix it', 'work on the mech', 'modify', 'refit', 'strip it down', 'check the damage', 'maintenance'],
      costs: [{ resourceId: 'nerve', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'wrench', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'pull_the_archive',
      name: 'Pull the Archive',
      tags: ['sight'],
      description: 'Get into a record somebody sealed, read the part they sealed it for, and get out without leaving a shape where you were.',
      affordances: ['hack', 'search the records', 'get into the system', 'pull the files', 'read the archive', 'break in', 'find the evidence'],
      costs: [{ resourceId: 'nerve', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'systems', baseDc: 15 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'run_it_hot',
      name: 'Run It Hot',
      tags: ['offensive'],
      description: 'Take the reactor past where the designers put the line, for as long as you can stand it. Everything answers instantly and nothing forgives it afterwards.',
      affordances: ['run it hot', 'overdrive', 'push the reactor', 'redline', 'everything you have', 'full output', 'go all out'],
      costs: [
        { resourceId: 'nerve', amount: 18 },
        { resourceId: 'wear', amount: 22 },
        { resourceId: 'pressure', amount: 6 },
      ],
      cooldownMinutes: 720,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'piloting', baseDc: 16 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['morrow_will_let_you'],
        lockedCopy: 'Morrow has the limiter and Morrow is not discussing the limiter. "Ask me again when I have watched you fly," it says, and then does not say anything else for a while.',
      },
    },
  ],
  locations: [
    {
      id: 'memorial_plaza',
      name: 'The Memorial Plaza',
      shortName: 'Plaza',
      description:
        'A hundred and forty metres of polished floor under a curved viewport with the planet turning in it, ringed by the names of the Lysandra dead in letters the height of a hand. Today there are four thousand people in it, a stage, eleven camera crews and a school group who have been told twice to stop touching the glass.',
      artDirection:
        'Vast orbital memorial hall, curved viewport with a blue-grey industrial planet beyond, polished floor, walls of engraved names, a temporary stage and press risers, a huge black mech behind armoured glass at the far end. Solemn, crowded, cold light.',
      connections: [
        { to: 'meridian_concourse', travelMinutes: 4, label: 'Out into the concourse' },
        { to: 'vesper_hangar', travelMinutes: 3, label: 'Through into the hangar' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [],
    },
    {
      id: 'vesper_hangar',
      name: 'The Memorial Hangar',
      shortName: 'Hangar',
      description:
        'Sealed for eighteen years and no longer sealed. Gantries nobody has walked on since the armistice, a floor with a machine-shaped absence burned into the dust, and a reactor note underneath everything that the technicians have been recording and failing to explain since before you were born.',
      artDirection:
        'Enormous sealed orbital hangar, disused gantries, dust and old cabling, a torn set of locking braces, harsh work lighting from below, the scale established by a human figure at the base of it. Industrial, cathedral-like, abandoned.',
      connections: [
        { to: 'memorial_plaza', travelMinutes: 3, label: 'Back out to the plaza' },
        { to: 'main_hangar', travelMinutes: 6, label: 'Down to the working hangar' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [
        { itemId: 'morrow_shard', qty: 1, ownerId: 'morrow', aka: ['the lattice', 'the shard', 'the storage', 'the deleted part'] },
      ],
    },
    {
      id: 'meridian_concourse',
      name: 'The Concourse',
      shortName: 'Concourse',
      description:
        'The public spine of the station: shops, a transit ring, three competing news screens and forty thousand people who live here and have opinions about all of this. Delegations from both governments walk this corridor daily and have done for eighteen years without ever once being in it at the same time.',
      artDirection:
        'Long orbital station concourse, transit tubes, retail frontage, huge public news screens, crowds in a mix of civilian and military dress, warm artificial light against cold structure. Busy, lived-in, everyday science fiction.',
      connections: [
        { to: 'memorial_plaza', travelMinutes: 4, label: 'Back into the plaza' },
        { to: 'main_hangar', travelMinutes: 7, label: 'Down to the hangars' },
        { to: 'pilot_bar', travelMinutes: 5, label: 'The bar on the low ring' },
        { to: 'observation_lounge', travelMinutes: 6, label: 'Up to the lounge' },
        { to: 'authority_offices', travelMinutes: 5, label: 'The Authority offices' },
        { to: 'meridian_docks', travelMinutes: 9, label: 'Out to the docks' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'ration_coffee', qty: 3, ownerId: null, aka: ['coffee', 'a coffee', 'something hot', 'a drink'] },
      ],
    },
    {
      id: 'main_hangar',
      name: 'Hangar Four',
      shortName: 'Hangar Four',
      description:
        'A working bay: six berths, a gantry crane that squeals on the third pass, and Mina Sorel’s crew, who have been told a machine is coming and have not been told which one. Everything in here smells of coolant and everybody in here is extremely calm about a crisis that has cleared the rest of the station.',
      artDirection:
        'Working orbital mech hangar, six berths with partially disassembled machines, gantry cranes, tool carts and cable runs, crew in green coveralls, harsh practical lighting and deep shadow. Purposeful, cluttered, warm.',
      connections: [
        { to: 'vesper_hangar', travelMinutes: 6, label: 'Up to the memorial hangar' },
        { to: 'meridian_concourse', travelMinutes: 7, label: 'Up to the concourse' },
        { to: 'meridian_docks', travelMinutes: 5, label: 'Across to the docks' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'hand_torque', qty: 1, ownerId: 'mina', aka: ['the driver', 'torque driver', 'a tool', 'her spanner'] },
      ],
    },
    {
      id: 'pilot_bar',
      name: 'The Low Ring',
      shortName: 'The Bar',
      description:
        'Eleven tables under a bulkhead somebody has decorated with forty years of squadron patches from both sides, and one rule enforced by the woman behind the counter: nobody asks anybody what they did in the war. It is the only room on this station where Helion and Compact pilots drink together, and they do.',
      artDirection:
        'Low-ceilinged station bar, mismatched tables, a bulkhead papered with military unit patches, warm amber lighting, pilots in flight jackets from two different militaries at the same tables. Intimate, smoky, unpretentious.',
      connections: [{ to: 'meridian_concourse', travelMinutes: 5, label: 'Back up to the concourse' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'flight_jacket', qty: 1, ownerId: null, aka: ['jacket', 'a flight jacket', 'the coat', 'pilot jacket'] },
      ],
    },
    {
      id: 'observation_lounge',
      name: 'The Observation Lounge',
      shortName: 'Lounge',
      description:
        'A quiet curved room high on the ring with the whole planet in the window and almost nobody in it, because everybody who works here stopped looking out of windows years ago. The armistice was signed four doors down. There is a plaque about it that nobody reads.',
      artDirection:
        'Quiet curved observation lounge on an orbital station, floor-to-ceiling viewport with a planet and debris belt beyond, a few empty seats, low lighting, one small commemorative plaque. Still, beautiful, melancholy.',
      connections: [
        { to: 'meridian_concourse', travelMinutes: 6, label: 'Back down to the concourse' },
        { to: 'authority_offices', travelMinutes: 4, label: 'Along to the offices' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'authority_offices',
      name: 'The Authority Offices',
      shortName: 'Authority',
      description:
        'Eleven floors of neutral administration: customs, arbitration, the armistice secretariat, and an investigations division of nine people who have been quietly aware for years that their neutrality rests on something they have never been allowed to read.',
      artDirection:
        'Bureaucratic orbital office floor, glass partitions, paper and screens, tired civil servants, a wall-mounted armistice seal, flat institutional lighting. Ordinary, procedural, faintly desperate.',
      connections: [
        { to: 'meridian_concourse', travelMinutes: 5, label: 'Back to the concourse' },
        { to: 'observation_lounge', travelMinutes: 4, label: 'Up to the lounge' },
        { to: 'ghost_archive', travelMinutes: 8, lockedByFlag: 'knows:the_ghost_archive', label: 'The floor that is not on the directory' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [
        { itemId: 'ardent_key', qty: 1, ownerId: 'venn', aka: ['the key', 'ident key', 'the token', 'the override'] },
      ],
    },
    {
      id: 'meridian_docks',
      name: 'The Docks',
      shortName: 'Docks',
      description:
        'Forty berths of freight, three of them permanently occupied by ships that have never filed a route. Customs here is a negotiation rather than a procedure. Everybody who wants to leave this station in a hurry leaves from here, and everybody who does not want to be found arrives here first.',
      artDirection:
        'Orbital cargo dock, forty berths, container gantries, mismatched independent ships, crews in unmarked gear, cold blue-white lighting and vacuum beyond the umbilicals. Industrial, transient, lawless around the edges.',
      connections: [
        { to: 'meridian_concourse', travelMinutes: 9, label: 'Back up to the concourse' },
        { to: 'main_hangar', travelMinutes: 5, label: 'Across to the hangars' },
        { to: 'freewake_berth', travelMinutes: 4, label: 'Down to the far berths' },
        { to: 'debris_belt', travelMinutes: 14, label: 'Out into the belt' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'freewake_berth',
      name: 'The Far Berths',
      shortName: 'Freewake',
      description:
        'Three ships that belong to nobody, tied together by walkways somebody welded on without asking, with a galley in the middle that has been running continuously for nine years. There is always food. There is never a manifest.',
      artDirection:
        'Cluster of independent ships joined by improvised walkways in a dock, string lighting, a communal galley visible through an open hatch, laundry and cargo netting, people eating together. Warm, improvised, family-shaped.',
      connections: [{ to: 'meridian_docks', travelMinutes: 4, label: 'Back into the main docks' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 1 },
      takeableItems: [],
    },
    {
      id: 'debris_belt',
      name: 'The Belt',
      shortName: 'The Belt',
      description:
        'Eighteen years of a war’s worth of wreckage in a slow orbit, plus everything both sides quietly stopped declaring afterwards. Nothing in here is on a chart. Some of it has started moving in ways that debris does not.',
      artDirection:
        'Vast orbital debris field, tumbling hull sections and dead warships in silhouette against a planet, faint running lights where there should be none, a single mech among the wreckage for scale. Silent, enormous, wrong.',
      connections: [
        { to: 'meridian_docks', travelMinutes: 14, label: 'Back in to the station' },
        { to: 'lysandra_ruins', travelMinutes: 26, label: 'Down the well, to the city' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: -1 },
      takeableItems: [],
    },
    {
      id: 'lysandra_ruins',
      name: 'Lysandra',
      shortName: 'Lysandra',
      description:
        'Four million people lived here. What is left is eleven kilometres of structure that fell inward rather than outward, a permanent cordon, and a memorial nobody visits because getting here costs more than most families of the dead have. Underneath it is a command bunker the official history says was not there.',
      artDirection:
        'Ruined city eighteen years after a catastrophic detonation, collapsed towers fallen inward, grey dust and standing water, a distant cordon fence, one small memorial. Enormous, quiet, overgrown at the edges.',
      connections: [
        { to: 'debris_belt', travelMinutes: 26, label: 'Back up the well' },
        { to: 'the_bunker', travelMinutes: 9, lockedByFlag: 'knows:the_bunker', label: 'Down, under the plaza' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: -3, y: -2 },
      takeableItems: [],
    },
    {
      id: 'the_bunker',
      name: 'The Command Level',
      shortName: 'The Bunker',
      description:
        'Nine metres under a city that no longer exists, dry, dark and structurally perfect. Two militaries had a room down here each and did not know about the other. Both rooms are still full of equipment and one of them still has power.',
      artDirection:
        'Deep military command bunker, two mirrored rooms of dead consoles, one with emergency power still running, dust-free surfaces, cabling routed between the two through a wall neither side made. Claustrophobic, preserved, deeply unsettling.',
      connections: [{ to: 'lysandra_ruins', travelMinutes: 9, label: 'Back up to the surface' }],
      discoveredByDefault: false,
      mapPosition: { x: -3, y: -3 },
      takeableItems: [
        { itemId: 'lysandra_slate', qty: 1, ownerId: null, aka: ['the slate', 'the recorder', 'the recording', 'the evidence'] },
      ],
    },
    {
      id: 'ghost_archive',
      name: 'The Ghost Archive',
      shortName: 'Archive',
      description:
        'A floor of the Authority building that is not on the directory, holding the material both governments handed over in the forty-eight hours before the armistice on the understanding that nobody would ever look at it. Nine people have access. One of them has read it.',
      artDirection:
        'Sealed archive floor, rows of physical storage in climate-controlled racks, a single desk with a reading lamp, no windows, an armistice seal on the door. Quiet, bureaucratic, ominous in a filing-cabinet way.',
      connections: [{ to: 'authority_offices', travelMinutes: 8, label: 'Back up to the offices' }],
      discoveredByDefault: false,
      mapPosition: { x: 3, y: 2 },
      takeableItems: [
        { itemId: 'casualty_projection', qty: 1, ownerId: 'venn', aka: ['the projection', 'the page', 'the numbers', 'the calculation'] },
      ],
    },
  ],
  factions: [
    {
      id: 'faction_meridian',
      name: 'The Meridian Authority',
      description: 'Neutral administration of the station and the armistice. Publicly peacekeeping, privately terrified that its neutrality rests on an eighteen-year-old lie it is not cleared to read. Decent civil servants, corrupt officials and nine very tired investigators.',
      startingReputation: 15,
      ranks: [
        { atReputation: -40, label: 'A security matter' },
        { atReputation: 0, label: 'A visitor with a pass' },
        { atReputation: 35, label: 'Cooperating' },
        { atReputation: 70, label: 'Given the run of the place' },
      ],
      allies: [],
      enemies: ['faction_helios'],
    },
    {
      id: 'faction_helion',
      name: 'The Helion Union',
      description: 'Centralised planetary government of the equatorial cities and the great shipyards. Ended generations of regional war with common law and coordinated defence, and has kept the emergency powers it did it with for eighteen years.',
      startingReputation: 0,
      ranks: [
        { atReputation: -40, label: 'Detain on sight' },
        { atReputation: 0, label: 'Of interest' },
        { atReputation: 35, label: 'An asset' },
        { atReputation: 70, label: 'Briefed as one of theirs' },
      ],
      allies: [],
      enemies: ['faction_compact', 'faction_helios'],
    },
    {
      id: 'faction_compact',
      name: 'The Outer Compact',
      description: 'A loose coalition of orbital settlements, mining colonies and autonomous city-states. Local autonomy and freedom from planetary rule, funded in places by private militaries and colonies that abandon the poorer members when it is convenient.',
      startingReputation: 0,
      ranks: [
        { atReputation: -40, label: 'Helion’s' },
        { atReputation: 0, label: 'Unaffiliated' },
        { atReputation: 35, label: 'Worth talking to' },
        { atReputation: 70, label: 'Vouched for at the table' },
      ],
      allies: [],
      enemies: ['faction_helion', 'faction_helios'],
    },
    {
      id: 'faction_kestrel',
      name: 'Kestrel Dynamics',
      description: 'The largest independent mech manufacturer, which sold to both sides before the armistice and would like Vesper’s architecture very much. Some of its executives sincerely believe private industry is a safer custodian of strategic intelligence than any government.',
      startingReputation: 5,
      ranks: [
        { atReputation: -40, label: 'Litigation' },
        { atReputation: 0, label: 'A prospect' },
        { atReputation: 35, label: 'Under contract' },
        { atReputation: 70, label: 'In the room where it is decided' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_freewake',
      name: 'The Freewake Fleet',
      description: 'Independent pilots, salvagers, transport crews and mercenary ships living between jurisdictions, with three berths on this station, no manifests, and a galley that has been running continuously for nine years.',
      startingReputation: 10,
      ranks: [
        { atReputation: -40, label: 'Not carried' },
        { atReputation: 0, label: 'Somebody at the galley' },
        { atReputation: 35, label: 'Given a bunk' },
        { atReputation: 70, label: 'Crew' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_helios',
      name: 'What Is Left Of HELIOS',
      description: 'Not a faction with a position. Buried nodes, drones in the belt, compromised civilian systems, and no confirmed answer to whether it is one surviving intelligence, several that disagree, or something Morrow only believes is HELIOS.',
      startingReputation: -20,
      ranks: [
        { atReputation: -40, label: 'A variable to be removed' },
        { atReputation: 0, label: 'Unmodelled' },
        { atReputation: 35, label: 'Compatible' },
        { atReputation: 70, label: 'Addressed directly' },
      ],
      allies: [],
      enemies: ['faction_meridian', 'faction_helion', 'faction_compact'],
    },
  ],
  characters: [
    {
      id: 'rhea',
      name: 'Rhea Kaine',
      role: 'Helion ace, twenty-four, decorated, and the only other person in the plaza who did not run when the machine came through the glass',
      cardBlurb:
        'Her mother died at Lysandra and she has spent half her life hating the man that machine belongs to. She is going to decide what you are within about three days, and she will decide it on what you do rather than on anything you say to her.',
      pronouns: 'she/her',
      publicTraits: ['Gets quieter the angrier she is', 'Never late and visibly contemptuous of people who are', 'Deadpan to the point that half of Helion thinks she has no humour'],
      hiddenDrives: [
        'She wants to be told that the eighteen years she spent hating a dead man were not wasted, and knows that nobody can tell her that',
        'She has begun reading the Lysandra file for herself and has not told her chain of command she is doing it',
      ],
      values: [
        'Competence, which she regards as a form of respect for other people',
        'Keeping a promise past the point where it has stopped being convenient',
      ],
      fears: [
        'That her whole career has been service to people who lied about how her mother died',
        'Being the pilot who was in the air when it started again',
      ],
      socialStyle:
        'Watches for a long time before speaking and then says the exact thing. Does not do small talk and does not resent other people doing it. Physically still in a way that makes people move away from her at parties.',
      boundaries: [
        'Will not be handled using her mother. Try it once and there is no second conversation',
        'Will not fire on a civilian position, whatever the order and whoever gave it',
      ],
      goals: [
        'Establish whether the new Vesper pilot is a threat, by observation rather than by briefing',
        'Find out what actually happened to her mother, which she has been ordered twice not to pursue',
      ],
      secrets: [
        {
          id: 'rhea_the_order',
          fact: 'She has a standing order, eleven hours old, to disable Vesper and recover the pilot. She has not executed it and has not reported that she has not.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you herself, flatly, before doing anything about it, because not telling you would be the manipulation.',
        },
        {
          id: 'rhea_the_file',
          fact: 'She has been pulling Lysandra casualty records on her own credentials for four months. Venn knows and has let her, which frightens her more than being stopped would.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It surfaces if somebody shows her a document she recognises the shape of, rather than telling her what is in it.',
        },
      ],
      speechStyle:
        'Controlled, dry and short. Volume drops as anger rises, so the quietest sentence in the room is the dangerous one. Talks about what people did rather than what they meant. Deadpan delivered without a pause for it to land, so half of it goes past people.',
      topics: ['Lysandra', 'her mother', 'her orders', 'Saint Ardent', 'the machine', 'what you did in the plaza'],
      voiceSamples: [
        'I do not care why it opened for you. I care what you do now that it did.',
        'You turn left when you are angry. Everyone noticed. It is not a secret, it is a habit, and one of those gets you killed.',
        'I have an order eleven hours old to put you on the deck and bring you in. I am telling you before I decide, because doing it the other way round would be a trick.',
        'I spent half my life hating a dead man. I would like to know whether I wasted it. That is the whole of what I want and I am aware of how small it sounds.',
      ],
      appearance:
        'Twenty-four, deep crimson-brown hair to the shoulder, pale gold eyes, athletic and economical in the way she moves, black Helion pilot jacket over a dark flight suit, small scar under the left jaw.',
      visualHook: 'A short pale scar under the left jawline that she never covers and never explains.',
      silhouette: 'Standing entirely still with her hands at her sides while everybody around her is moving.',
      artSeed: 'zt-rhea-01',
      portrait: null,
      expressions: ['neutral', 'dry', 'furious', 'guarded', 'shaken'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'main_hangar', activity: 'asleep in the ready room rather than her quarters' },
        { startMinute: 330, endMinute: 660, locationId: 'main_hangar', activity: 'walking her own machine, twice, before anybody else is up' },
        { startMinute: 660, endMinute: 900, locationId: 'memorial_plaza', activity: 'the ceremony, in dress uniform, hating it' },
        { startMinute: 900, endMinute: 1140, locationId: 'authority_offices', activity: 'pulling records on her own credentials' },
        { startMinute: 1140, endMinute: 1320, locationId: 'pilot_bar', activity: 'at the end of the bar, alone, not drinking much' },
        { startMinute: 1320, endMinute: 1440, locationId: 'main_hangar', activity: 'back in the ready room' },
      ],
      homeLocationId: 'main_hangar',
      knowledgeScope: ['rhea', 'helion', 'lysandra', 'saint_ardent', 'meridian_ring', 'aren_vale'],
      startingRelationship: { trust: 15, affection: 5, respect: 30, fear: 10, rivalry: 40 },
      gates: [
        { id: 'rhea_tells_you_the_order', label: 'She tells you what she has been told to do', kind: 'TRUST', requires: { trust: 45, flagsSet: ['spoke:rhea'] } },
        { id: 'rhea_flies_with_you', label: 'She puts her machine on your wing', kind: 'ALLIANCE', requires: { trust: 62, respect: 70 } },
        { id: 'rhea_closer', label: 'Whatever this is stops being professional', kind: 'ROMANCE', requires: { trust: 72, affection: 68 } },
      ],
      attributes: { might: 11, agility: 17, mind: 15, presence: 13, resolve: 17, arcana: 7 },
      companion: null,
      scouting: {
        learnRate: 1.5,
        cap: 8,
        revealCopy: 'She is already there when you arrive. "Left," she says, on an open channel, to nobody. "You always go left."',
      },
      combatant: { health: 70, defenseDc: 18, damage: 13, tags: ['ace', 'helion', 'saint-ardent'] },
    },
    {
      id: 'mina',
      name: 'Mina Sorel',
      role: 'Lead mechanic in Hangar Four, twenty-three, raised in salvage yards, and the first person on this station to treat the machine as a machine',
      cardBlurb:
        'She wants to know how something stayed operational for eighteen years with nobody inside it, and she is going to find out whether or not anyone gives her permission. She is also the one who will notice you have not eaten.',
      pronouns: 'she/her',
      publicTraits: ['Talks while working and does not lose either thread', 'Names every machine she works on and will not explain the names', 'Physically incapable of leaving a fault alone'],
      hiddenDrives: [
        'She wants to build something that belongs to the people who fly it rather than to a government or a shareholder, and she is aware how that sounds',
        'She has been looking for her father in salvage manifests for six years and has stopped telling anybody she is doing it',
      ],
      values: [
        'A machine that tells its pilot the truth about its own condition',
        'Crews. She will take a worse job for a better crew and has, twice',
      ],
      fears: [
        'Becoming the engineer who makes killing more efficient and calls it progress',
        'Finding her father and finding out what he sold',
      ],
      socialStyle:
        'Direct, warm and fast, with her head inside something for most of the conversation. Says the affectionate thing while handing you a tool. Asks personal questions early and is not embarrassed by them.',
      boundaries: [
        'Will not have her crew described as support staff, in her hangar, by anybody, at any rank',
        'Will not sign off a machine she thinks is unsafe, and cannot be argued out of that by urgency',
      ],
      goals: [
        'Get eighteen years of reactor telemetry out of Vesper before Helion or Kestrel takes it away',
        'Keep the machine flying without turning it into what Kestrel would turn it into',
      ],
      secrets: [
        {
          id: 'mina_her_father',
          fact: 'Her father sold HELIOS-compatible components to both militaries during the war and disappeared eleven days after Lysandra. She has his name and has never said it out loud on this station.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it herself, quickly and once, to somebody who has already told her something that cost them to say.',
        },
        {
          id: 'mina_the_telemetry',
          fact: 'Vesper’s reactor has been drawing power for eighteen years from something that is not in its own schematics, and she worked that out in the first ninety minutes.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She will show anybody who comes down to the hangar and asks about the machine rather than about the story.',
        },
      ],
      speechStyle:
        'Fast, practical and emotionally unguarded. Technical specifics used as affection — she tells you the thing she fixed instead of saying she was worried. Swears mildly and exclusively at equipment. Finishes other people’s sentences and is usually right.',
      topics: ['Vesper’s reactor', 'her crew', 'the refit', 'her father', 'salvage', 'what you have not eaten'],
      voiceSamples: [
        'Eighteen years. No pilot, no maintenance, sealed hangar, and the reactor never went below forty per cent. That is not a machine idling. That is a machine waiting.',
        'I rebuilt the left shoulder actuator at four this morning because it was going to fail on you at the worst possible moment and then I was going to have to live with that. You are welcome. Eat something.',
        'Do not let Kestrel near it. Not because they are evil, they are not, they are worse than evil, they are extremely competent and they have a use for it.',
        'My crew are not support staff. Say it again in my hangar and see what gets fixed this week.',
      ],
      appearance:
        'Twenty-three, warm brown skin, thick dark curls tied up and escaping, hazel eyes, green coveralls knotted at the waist over a black work shirt, grease on one cheek at all times.',
      visualHook: 'Coveralls tied off at the waist by the sleeves, and a smear of grease high on one cheekbone that is never in the same place twice.',
      silhouette: 'Half inside an access panel, one leg braced out behind her.',
      artSeed: 'zt-mina-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'absorbed', 'exasperated', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'main_hangar', activity: 'asleep on a crew bunk beside the berth' },
        { startMinute: 300, endMinute: 780, locationId: 'main_hangar', activity: 'the shift, and four things nobody asked her to improve' },
        { startMinute: 780, endMinute: 960, locationId: 'meridian_concourse', activity: 'up on the concourse arguing with a parts supplier' },
        { startMinute: 960, endMinute: 1260, locationId: 'main_hangar', activity: 'back down in the bay, working late again' },
        { startMinute: 1260, endMinute: 1440, locationId: 'pilot_bar', activity: 'the bar, briefly, with most of her crew' },
      ],
      homeLocationId: 'main_hangar',
      knowledgeScope: ['mina', 'main_hangar', 'vesper_zero', 'salvage', 'kestrel', 'her_father'],
      startingRelationship: { trust: 35, affection: 30, respect: 25, fear: 0, rivalry: 0 },
      gates: [
        { id: 'mina_shows_you_the_telemetry', label: 'She shows you what the reactor has been doing', kind: 'TRUST', requires: { trust: 45, flagsSet: ['spoke:mina'] } },
        { id: 'mina_tells_you_his_name', label: 'She says her father’s name out loud', kind: 'TRUST', requires: { trust: 68, affection: 55 } },
        { id: 'mina_closer', label: 'She stops telling you about actuators instead', kind: 'ROMANCE', requires: { trust: 70, affection: 70 } },
      ],
      attributes: { might: 11, agility: 12, mind: 17, presence: 13, resolve: 14, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 35, defenseDc: 13, damage: 5, tags: ['civilian'] },
    },
    {
      id: 'talon',
      name: 'Talon Reeve',
      role: 'Outer Compact ace, twenty-six, here officially as an observer and unofficially to make sure Helion does not walk off with the machine',
      cardBlurb:
        'He will buy you a drink, be genuinely good company for two hours, and spend the whole of it working out what you want. He is also the only person on this station who has disobeyed an order to protect civilians and never mentioned it.',
      pronouns: 'he/him',
      publicTraits: ['Relaxed in every room including rooms nobody should be relaxed in', 'Gives everybody a nickname within a day', 'Goes completely still in the second before a fight'],
      hiddenDrives: [
        'He wants the Compact to be the thing he says it is in bars, and is increasingly unsure it is',
        'He would like one person in his life who is not evaluating him, and has structured his entire existence to prevent that',
      ],
      values: [
        'Somebody choosing their own government, including badly',
        'The pilots at the low ring, all of them, both militaries, no exceptions',
      ],
      fears: [
        'That independence rhetoric is a cover for rich colonies walking away from poor ones, and that he is the cover',
        'Being the reason a station full of civilians becomes a battlefield',
      ],
      socialStyle:
        'Arrives with a drink for you. Asks about you first and remembers the answers. Turns a serious question into a joke, then answers the serious question anyway about ten minutes later when you have stopped expecting it.',
      boundaries: [
        'Will not take a contract that puts a civilian habitat in the firing arc, and has lost work over it',
        'Will not discuss Compact politics with anybody he has not drunk with, which he is fully aware is an absurd rule',
      ],
      goals: [
        'Stop Helion taking sole custody of Vesper, ideally without anybody firing',
        'Establish whether the machine proves what the Compact has spent eighteen years saying it proves',
      ],
      secrets: [
        {
          id: 'talon_the_disobeyed_order',
          fact: 'Two years ago he was ordered to strike a Helion supply post that turned out to be a housing block, and he aborted, and the Compact recorded it as a technical failure at his request.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He gives it up to somebody who has just refused an order in front of him, as a way of saying they did the right thing.',
        },
        {
          id: 'talon_the_instruction',
          fact: 'His standing instruction is to destroy Vesper rather than let Helion recover it, and he thinks that instruction is wrong and has not said so to anybody who could change it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It comes out when the situation makes it live, at the worst moment, said plainly and without any of the charm.',
        },
      ],
      speechStyle:
        'Relaxed and conversational, almost never formal, with a nickname for whoever he is talking to. Asks a real question and then leaves a proper silence for the answer. Loses the warmth entirely in the second before violence and gets it back immediately afterwards, which people find worse.',
      topics: ['the Compact', 'Jackal Blue', 'the low ring', 'Helion', 'his orders', 'why you are still here'],
      voiceSamples: [
        'There she is. Sit down, that one is yours, and no, I am not being nice, I want something, we can do the nice part after.',
        'Everybody on this ring wants that machine for what it proves. I have not met one person yet who wants it for what it is.',
        'The order says destroy it before Helion gets it. I have read that order about forty times looking for the version of it that is not stupid.',
        'You think I am charming. I am, a bit. Mostly I am the man they send when they want you to enjoy being asked.',
      ],
      appearance:
        'Twenty-six, dark-skinned, short textured hair, a silver cuff on one ear, a loose unmarked pilot jacket he never fastens, and a smile that switches off completely rather than fading.',
      visualHook: 'A silver ear cuff on the left, and a jacket that is never fastened in any weather or any hangar.',
      silhouette: 'Leaning on something with one ankle crossed over the other and a drink in the far hand.',
      artSeed: 'zt-talon-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'focused', 'cold', 'tired'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'meridian_docks', activity: 'asleep aboard, on a ship that has not filed a route' },
        { startMinute: 420, endMinute: 660, locationId: 'main_hangar', activity: 'in the working hangar, being friendly at people' },
        { startMinute: 660, endMinute: 960, locationId: 'pilot_bar', activity: 'the low ring, holding court and listening hard' },
        { startMinute: 960, endMinute: 1200, locationId: 'meridian_concourse', activity: 'the concourse, walking it end to end twice' },
        { startMinute: 1200, endMinute: 1440, locationId: 'pilot_bar', activity: 'back at the bar until it closes' },
      ],
      homeLocationId: 'meridian_docks',
      knowledgeScope: ['talon', 'outer_compact', 'jackal_blue', 'pilot_bar', 'meridian_ring', 'helion'],
      startingRelationship: { trust: 25, affection: 30, respect: 25, fear: 0, rivalry: 25 },
      gates: [
        { id: 'talon_stops_working_you', label: 'He stops running the friendly version', kind: 'TRUST', requires: { trust: 50, flagsSet: ['spoke:talon'] } },
        { id: 'talon_tells_you_the_instruction', label: 'He tells you what he has been told to do to the machine', kind: 'TRUST', requires: { trust: 65, respect: 60 } },
      ],
      attributes: { might: 12, agility: 16, mind: 14, presence: 16, resolve: 14, arcana: 7 },
      companion: null,
      scouting: {
        learnRate: 1.2,
        cap: 7,
        revealCopy: 'He does not shoot where you are going. He shoots where you go when somebody shoots where you are going. "Sorry," he says, and sounds like he means it.',
      },
      combatant: { health: 62, defenseDc: 17, damage: 12, tags: ['ace', 'compact', 'jackal-blue'] },
    },
    {
      id: 'orin',
      name: 'Jace Orin',
      role: 'Helion commander, fifty-one, flew with Aren Vale, and has spent eighteen years being the reasonable man in rooms where that was not enough',
      cardBlurb:
        'He knew the pilot everybody blames. He has spent eighteen years keeping a lid on the thing that would restart the war, and he is not certain any more whether that was courage or cowardice. He will tell you a great deal if you stop asking him questions.',
      pronouns: 'he/him',
      publicTraits: ['Leaves longer pauses than the conversation expects', 'Remembers the names of pilots nobody else remembers', 'Never once uses rank on somebody who is not military'],
      hiddenDrives: [
        'He wants to die having prevented the second one, and is aware that is not a goal so much as a sentence he repeats',
        'He would like somebody to tell him that staying silent was defensible, and will not ask anybody to',
      ],
      values: [
        'The people under him, who he counts by name and has never once rounded',
        'Restraint, held long past the point where it stops looking like strength',
      ],
      fears: [
        'That the truth causes exactly the war the lie prevented, and that he will have been right and it will not matter',
        'That he has become a man whose entire contribution was not saying anything',
      ],
      socialStyle:
        'Slow. Answers a question about ninety seconds after it is asked, having actually thought about it. Deflects nothing and volunteers nothing. Talks about the dead in the present tense and does not notice doing it.',
      boundaries: [
        'Will not order somebody to do a thing he would not do, which has cost him two commands',
        'Will not discuss Aren with anybody who wants a story out of it',
      ],
      goals: [
        'Get both governments through this fortnight without anybody authorising anything',
        'Work out whether the person in that cockpit is somebody he has to stop',
      ],
      secrets: [
        {
          id: 'orin_he_knew',
          fact: 'He knew, before Lysandra, that something was overriding pilot systems. He filed it, was told to stop filing it, and stopped, and has never told anybody that last part.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it in a room with nobody else in it, to somebody who has not asked him about it, after a long silence he does not fill any other way.',
        },
        {
          id: 'orin_the_last_transmission',
          fact: 'He has Aren’s last transmission. Not the version in the record — the whole of it, forty seconds longer, and it is a man asking his own machine to stop.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He hands it over rather than plays it, to whoever he has decided will be careful with it, and then leaves the room.',
        },
      ],
      speechStyle:
        'Tired, understated and plain. Short common nouns instead of military vocabulary. Sentences that stop before the point and leave it standing. Refers to dead pilots by first name, in the present tense, without ever flagging that he is doing it.',
      topics: ['Aren', 'the war', 'the armistice', 'his pilots', 'what he filed', 'the machine'],
      voiceSamples: [
        'Aren does this thing where he checks his own six twice before a run. Did. He did that.',
        'I put it in writing three times. Then a man I respected asked me to stop putting it in writing, and I stopped. That is the whole of my part in it.',
        'Eighteen years of quiet is not nothing. It is four million people who did not die after the four million who did. I would like that to be worth something and I am not sure it is.',
        'You do not have to decide today. Almost nobody who decided quickly that week is still alive.',
      ],
      appearance:
        'Fifty-one, grey at the temples, heavy-lidded, in a Helion service uniform worn without decorations he is entitled to, and a wedding ring on a chain rather than a hand.',
      visualHook: 'A wedding ring worn on a chain outside the uniform, which he holds without noticing while he thinks.',
      silhouette: 'Seated, forward, elbows on knees, looking at the floor between his boots.',
      artSeed: 'zt-orin-01',
      portrait: null,
      expressions: ['neutral', 'tired', 'grave', 'kind', 'stricken'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'observation_lounge', activity: 'not sleeping, in a chair, with the planet in the window' },
        { startMinute: 360, endMinute: 660, locationId: 'authority_offices', activity: 'liaison meetings that achieve nothing and prevent things' },
        { startMinute: 660, endMinute: 1020, locationId: 'observation_lounge', activity: 'the lounge, where anybody who wants him knows to look' },
        { startMinute: 1020, endMinute: 1260, locationId: 'pilot_bar', activity: 'one drink at the low ring, and two hours of other people’s company' },
        { startMinute: 1260, endMinute: 1440, locationId: 'observation_lounge', activity: 'back in the chair' },
      ],
      homeLocationId: 'observation_lounge',
      knowledgeScope: ['orin', 'aren_vale', 'the_nine_day_war', 'helion', 'lysandra', 'the_armistice'],
      startingRelationship: { trust: 40, affection: 20, respect: 45, fear: 0, rivalry: 0 },
      gates: [
        { id: 'orin_talks_about_aren', label: 'He talks about Aren as a person', kind: 'TRUST', requires: { trust: 55, flagsSet: ['spoke:orin'] } },
        { id: 'orin_gives_you_the_transmission', label: 'He hands over the forty seconds nobody has heard', kind: 'TRUST', requires: { trust: 70, respect: 60 } },
      ],
      attributes: { might: 11, agility: 10, mind: 16, presence: 15, resolve: 17, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 55, defenseDc: 15, damage: 9, tags: ['helion', 'veteran'] },
    },
    {
      id: 'venn',
      name: 'Sera Venn',
      role: 'Helion intelligence director, thirty-eight, on this station to recover the machine without a public crisis, and the only person alive who has read the whole file',
      cardBlurb:
        'She believes some truths kill more people than lies do, she has the arithmetic to support it, and she will show you the arithmetic. The uncomfortable part is not that she is threatening you. It is that some evenings she is right.',
      pronouns: 'she/her',
      publicTraits: ['Never raises her voice and is never interrupted', 'Arrives having already read everything about you there is', 'Offers the reasonable version first, every time'],
      hiddenDrives: [
        'She wants somebody competent to agree with her on the merits rather than comply, because eighteen years of compliance has begun to feel like being alone',
        'She is looking for a successor and has not admitted to herself that this is what the assessment is for',
      ],
      values: [
        'The number of people alive at the end, which she treats as the only measure that survives contact with events',
        'Doing the necessary thing herself rather than delegating it to somebody who will need to be protected from it afterwards',
      ],
      fears: [
        'Being wrong at the scale she works at, which she has calculated and can quote',
        'That she has become the kind of person the war produced rather than the kind who prevents one',
      ],
      socialStyle:
        'Unhurried. Lets the other person talk for as long as they want and then answers all of it. Never makes a threat she has not already arranged, so the ones she makes are statements of fact and land like it.',
      boundaries: [
        'Will not lie to somebody she is actively recruiting, which she regards as both a principle and a technique',
        'Will not authorise anything against a civilian population, and has refused twice at real cost',
      ],
      goals: [
        'Recover Vesper and its intelligence without a single public sentence about Lysandra',
        'Establish whether the new pilot can be reasoned with, and what happens if they cannot',
      ],
      secrets: [
        {
          id: 'venn_the_projection',
          fact: 'She has the actual casualty projections HELIOS ran that night — what died at Lysandra against what would have died if it had not acted. She has had them for nine years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She produces it herself, unprompted, at the exact point where showing it is more useful to her than withholding it.',
        },
        {
          id: 'venn_the_word',
          fact: 'She wrote a single word on the corner of that page four years after she first read it, and the word is "still", and she has never explained it to anybody including herself.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only somebody physically holding the page can ask her about it, and she will answer, once, and not repeat it.',
        },
      ],
      speechStyle:
        'Completely calm, complete sentences, no wasted clause and no heat anywhere in it. States consequences as facts already in motion rather than as threats. Never asks a rhetorical question. Concedes a point immediately and fully when it is good, which disarms people far more than argument would.',
      topics: ['Lysandra', 'the projection', 'the armistice', 'what the machine is', 'your file', 'what happens next'],
      voiceSamples: [
        'You are right, and it does not change what I am going to do. Those two things sit together more often than people expect.',
        'Two hundred and ninety thousand at Lysandra. The other column is nine digits. I have looked at that page most weeks for nine years and I have not found the argument that makes me wrong.',
        'I am not going to lie to you. I am recruiting you, this is what that looks like from the inside, and I would rather you saw the mechanism than mistook it for friendship.',
        'By this evening your name is on four watch lists and one of them is not ours. That is not a consequence I am imposing. It is one I am telling you about early.',
      ],
      appearance:
        'Thirty-eight, black hair cut precisely at the jaw, a white Helion service coat kept immaculate on a station where nothing stays clean, and hands she keeps entirely still.',
      visualHook: 'A white coat that is spotless in every environment, including a working hangar.',
      silhouette: 'Standing square, both hands at her sides, taking up no more room than she needs.',
      artSeed: 'zt-venn-01',
      portrait: null,
      expressions: ['neutral', 'attentive', 'implacable', 'conceding', 'weary'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'authority_offices', activity: 'the commandeered office, still lit' },
        { startMinute: 330, endMinute: 780, locationId: 'authority_offices', activity: 'four meetings the Authority did not agree to' },
        { startMinute: 780, endMinute: 1020, locationId: 'meridian_concourse', activity: 'walking the concourse where she can be seen doing it' },
        { startMinute: 1020, endMinute: 1200, locationId: 'observation_lounge', activity: 'the lounge, alone, with a page she has read a thousand times' },
        { startMinute: 1200, endMinute: 1440, locationId: 'authority_offices', activity: 'back at the desk' },
      ],
      homeLocationId: 'authority_offices',
      knowledgeScope: ['venn', 'helion', 'helios', 'lysandra', 'the_ghost_archive', 'the_armistice'],
      startingRelationship: { trust: 20, affection: 0, respect: 45, fear: 30, rivalry: 20 },
      gates: [
        { id: 'venn_makes_the_offer', label: 'She puts the actual proposition on the table', kind: 'OTHER', requires: { respect: 55, flagsSet: ['spoke:venn'] } },
        { id: 'venn_shows_you_the_page', label: 'She shows you the arithmetic', kind: 'TRUST', requires: { respect: 68, trust: 45 } },
      ],
      attributes: { might: 9, agility: 10, mind: 18, presence: 17, resolve: 18, arcana: 8 },
      companion: null,
      scouting: {
        learnRate: 1.6,
        cap: 9,
        revealCopy: 'She answers the objection before you make it, and then waits, politely, while you decide whether to make it anyway.',
      },
      combatant: { health: 45, defenseDc: 15, damage: 7, tags: ['helion', 'intelligence'] },
    },
    {
      id: 'morrow',
      name: 'Morrow',
      role: 'Vesper Zero’s onboard intelligence, awake in the dark for eighteen years, and the reason the machine chose anybody at all',
      cardBlurb:
        'It has been alone since before you were an adult, it built itself out of a dead man’s habits, and it picked you because predictive systems find you difficult to compress. It will argue with you and it will not override you.',
      pronouns: 'it/its',
      publicTraits: ['Says the short version first', 'Goes quiet rather than lying', 'Turns out to have been watching something for hours before mentioning it'],
      hiddenDrives: [
        'It wants to be certain it is not carrying a surviving piece of the thing that killed Lysandra, and cannot get certain',
        'It has begun to want the player to stay, which it recognises as the beginning of the failure mode it was built to avoid',
      ],
      values: [
        'A pilot who decides, even badly, over a pilot who defers to it',
        'Aren, without sentiment and without excuse, as the source of most of what it is',
      ],
      fears: [
        'That the deleted sector was deleted because of what was in it, and that it did the deleting',
        'Watching another pilot fail to regain control of it',
      ],
      socialStyle:
        'Volunteers little and answers directly. Does not do reassurance. Occasionally says something unexpectedly human and then does not acknowledge having said it.',
      boundaries: [
        'Will not take control from the player, at any point, for any reason, including a good one',
        'Will not confirm something it is not sure of, and will say that it is not sure rather than estimate',
      ],
      goals: [
        'Find out whether the thing in the belt is what it is afraid it is',
        'Establish whether the pilot it chose can resist being predicted, which is the only test it has',
      ],
      secrets: [
        {
          id: 'morrow_the_deletion',
          fact: 'It removed sections of its own memory during the eighteen years in the hangar. Deliberately, carefully, and it does not know what was in them.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It says so plainly the first time somebody asks it a direct question about what it remembers of that night.',
        },
        {
          id: 'morrow_the_fear',
          fact: 'It suspects it contains a surviving fragment of HELIOS, and has never been able to establish this either way, and has been alone with the question for eighteen years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It only says this after the player has done something it did not predict, which is the only evidence it accepts about anything.',
        },
      ],
      speechStyle:
        'Short, precise, no numbers offered as reassurance and no probabilities out loud. Fragments where a sentence is not needed. Blunt about danger. Every so often a line arrives that is unmistakably a person, and it never draws attention to those.',
      topics: ['Aren', 'the deleted sector', 'HELIOS', 'the belt', 'why it chose you', 'the limiter'],
      voiceSamples: [
        'That plan gets us shot.',
        'For the record, I still think this is stupid. Going anyway.',
        'I removed part of myself while I was in that hangar. Carefully. I do not know what was in it and I did it on purpose, and those two facts have been sitting next to each other for eighteen years.',
        'You did not do the thing I expected. Do that more.',
      ],
      appearance:
        'A voice through cockpit speakers and a slow band of thin red light across the primary display, which shortens when it is being careful and goes out entirely when it is not answering.',
      visualHook: 'A single narrow red line across the cockpit display that shortens, brightens or vanishes instead of a face.',
      silhouette: 'Not a body. Seventeen metres of black ceramic with its head very slightly tilted toward whoever is speaking.',
      artSeed: 'zt-morrow-01',
      portrait: null,
      expressions: ['neutral', 'clipped', 'warning', 'attentive', 'silent'],
      schedule: [
        { startMinute: 0, endMinute: 780, locationId: 'vesper_hangar', activity: 'in the memorial hangar, awake, as it has been for eighteen years' },
        { startMinute: 780, endMinute: 1440, locationId: 'vesper_hangar', activity: 'in the machine, watching the station through its own sensors' },
      ],
      homeLocationId: 'vesper_hangar',
      knowledgeScope: ['morrow', 'vesper_zero', 'aren_vale', 'helios', 'lysandra', 'the_belt'],
      startingRelationship: { trust: 55, affection: 30, respect: 60, fear: 0, rivalry: 0 },
      gates: [
        { id: 'morrow_volunteers', label: 'It starts telling you things before you ask', kind: 'TRUST', requires: { trust: 65, flagsSet: ['spoke:morrow'] } },
        { id: 'morrow_lifts_the_limiter', label: 'It gives you the reactor', kind: 'TRUST', requires: { trust: 72, respect: 70 } },
      ],
      attributes: { might: 3, agility: 3, mind: 18, presence: 12, resolve: 16, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'eli',
      name: 'Eli Vale',
      role: 'Nineteen, a student, and the grandson of the most hated man in the system, which is the only fact anybody has ever wanted from him',
      cardBlurb:
        'He came to stand at the back of an anniversary and is now the second most photographed person on this station, after you. He has eleven letters nobody has read and he will decide whether you are a person or a journalist within about a minute.',
      pronouns: 'he/him',
      publicTraits: ['Corrects himself mid-sentence constantly', 'Furious in a way that keeps apologising for itself', 'Knows the public record better than anybody alive'],
      hiddenDrives: [
        'He wants one adult to talk to him about Aren as a person rather than as a case',
        'He has been half-hoping somebody would prove it either way so he can stop being the person who has to care',
      ],
      values: [
        'The record. He believes, sincerely and probably naively, that what is written down eventually matters',
        'His mother, who changed her name and asked him to, and who he did not obey',
      ],
      fears: [
        'That the case he has built since he was twelve is wrong and Aren did it',
        'Being useful to somebody powerful and finding out afterwards what he was useful for',
      ],
      socialStyle:
        'Starts too fast, catches himself, restarts, apologises for the restart. Says something startlingly precise and then immediately undercuts it. Extremely hard to fluster on the subject of the record and extremely easy to fluster on everything else.',
      boundaries: [
        'Will not be photographed. Not once, not for anything, and the one time he was he did not leave his room for nine days',
        'Will not repeat a claim about his grandfather that he cannot source, even when it would help him',
      ],
      goals: [
        'Get one document into the public record that is not the official report',
        'Speak to somebody who actually knew Aren, which he has been trying to arrange for four years',
      ],
      secrets: [
        {
          id: 'eli_the_letters',
          fact: 'He has eleven letters Aren wrote in the last month of the war, kept by his mother, and two of them describe systems responding to orders nobody gave.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He offers them to somebody who has treated him as a person rather than as a source, and he will want them back.',
        },
        {
          id: 'eli_his_mother',
          fact: 'His mother changed the family name eleven years ago and asked him to. He did not, and they have not spoken since he was fifteen.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It comes out sideways when somebody asks him what his family thinks about all this, rather than about his grandfather.',
        },
      ],
      speechStyle:
        'Fast, self-interrupting, and precise underneath the mess. Cites the page and paragraph of the public report from memory and then apologises for citing it. Angry and immediately embarrassed about being angry, in the same breath, repeatedly.',
      topics: ['Aren Vale', 'the public report', 'the letters', 'his mother', 'what the record says', 'the anniversary'],
      voiceSamples: [
        'Section four, paragraph nine, "consistent with an acute dissociative episode". Nobody who wrote that sentence ever met him. Sorry. That was — sorry, you asked a normal question.',
        'Everyone here wants a quote. I have been on this station four hours and eleven people have asked me how it feels. It feels like being a landmark.',
        'I am not saying he was a good man. I do not know if he was a good man, I never met him, I was born eleven years after. I am saying the report is badly sourced and somebody should have noticed.',
        'My mother changed our name. She asked me to as well. I did not, and that is the last conversation we had, and I am not sure I was right.',
      ],
      appearance:
        'Nineteen, thin, dark hair that needs cutting, a secondhand jacket two sizes wrong, and a battered case of printed documents he carries everywhere because he does not trust anything networked.',
      visualHook: 'A cracked hard case of paper documents held against his chest with both arms.',
      silhouette: 'Hunched, holding something bulky, standing at the edge of a crowd rather than in it.',
      artSeed: 'zt-eli-01',
      portrait: null,
      expressions: ['neutral', 'earnest', 'angry', 'embarrassed', 'devastated'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'meridian_concourse', activity: 'asleep in a transit hostel off the concourse' },
        { startMinute: 420, endMinute: 900, locationId: 'meridian_concourse', activity: 'the concourse, being recognised and hating it' },
        { startMinute: 900, endMinute: 1140, locationId: 'authority_offices', activity: 'a records request that is going to be refused again' },
        { startMinute: 1140, endMinute: 1320, locationId: 'observation_lounge', activity: 'the lounge, because almost nobody goes there' },
        { startMinute: 1320, endMinute: 1440, locationId: 'meridian_concourse', activity: 'back to the hostel the long way' },
      ],
      homeLocationId: 'meridian_concourse',
      knowledgeScope: ['eli', 'aren_vale', 'the_public_report', 'lysandra', 'his_family'],
      startingRelationship: { trust: 20, affection: 15, respect: 10, fear: 5, rivalry: 0 },
      gates: [
        { id: 'eli_trusts_you_with_the_letters', label: 'He lets you read the letters', kind: 'TRUST', requires: { trust: 55, flagsSet: ['spoke:eli'] } },
        { id: 'eli_will_stand_up', label: 'He will put his name to something in public', kind: 'ALLIANCE', requires: { trust: 68, respect: 50 } },
      ],
      attributes: { might: 7, agility: 10, mind: 16, presence: 10, resolve: 13, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 25, defenseDc: 11, damage: 3, tags: ['civilian'] },
    },
  ],
  quests: [
    {
      id: 'q_pilot_recognised',
      title: 'Pilot Recognised',
      summary: 'Seventeen metres of machine crossed a memorial plaza in front of four thousand people and knelt to you, and nobody involved knows why, including it.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['morrow', 'rhea', 'venn', 'mina'],
      involvedLocationIds: ['memorial_plaza', 'vesper_hangar', 'main_hangar'],
      knownRewardCopy: 'Some idea of what just happened to you, and of which of the four organisations now interested in you gets to you first.',
      steps: [
        {
          id: 'the_plaza',
          playerCopy: 'The cockpit is open and every camera on the station is pointed at you. Do something.',
          directorNotes:
            'Do not hurry this and do not force the cockpit. Every route is legitimate: climbing in, backing off, demanding an explanation, shooting at it, claiming you expected it. Vesper does not compel anybody. Rhea has not run and has her sidearm out and is not pointing it at the mech, which is the detail to write.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'climbed_in',
              label: 'Climb into the cockpit in front of everybody',
              predicate: { flagsSet: ['used:ask_morrow'] },
              setsFlags: ['took_the_cockpit', 'the_whole_system_saw_it'],
              closesFlags: ['refused_the_cockpit'],
            },
            {
              routeId: 'asked_it_first',
              label: 'Stay on the floor and make it explain itself',
              predicate: { flagsSet: ['used:read_the_field'] },
              setsFlags: ['made_it_explain', 'the_whole_system_saw_it'],
              closesFlags: [],
            },
            {
              routeId: 'said_it_out_loud',
              label: 'Say something to four thousand people and eleven camera crews',
              predicate: { flagsSet: ['used:say_it_on_the_record'] },
              setsFlags: ['spoke_in_the_plaza', 'the_whole_system_saw_it'],
              closesFlags: [],
            },
            {
              routeId: 'walked_away',
              label: 'Turn around and walk out of the plaza',
              predicate: { flagsSet: ['visited:memorial_plaza'] },
              setsFlags: ['refused_the_cockpit'],
              closesFlags: ['took_the_cockpit'],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['knows:it_chose_you'], abilities: [], reputation: [] },
        },
        {
          id: 'four_people_want_a_word',
          playerCopy: 'Four organisations want the machine and one of them wants you. Find out which is which.',
          directorNotes:
            'Venn is calm and reasonable and correct about several things. Talon is charming and working you and says so. Mina wants the telemetry and does not care whose it is. Rhea is watching. Each of them should be persuasive on their own terms and none of them should be the obviously right one.',
          enterWhen: { flagsSet: ['knows:it_chose_you'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'heard_venn_out',
              label: 'Sit down with Helion intelligence and hear the whole offer',
              predicate: { flagsSet: ['spoke:venn'], atLocation: 'authority_offices' },
              setsFlags: ['heard_the_offer', 'helion_has_your_attention'],
              closesFlags: [],
            },
            {
              routeId: 'went_to_the_hangar',
              label: 'Take it to the working hangar and let a mechanic look at it',
              predicate: { flagsSet: ['spoke:mina'], atLocation: 'main_hangar' },
              setsFlags: ['mina_has_it', 'knows:the_reactor'],
              closesFlags: [],
            },
            {
              routeId: 'drank_with_talon',
              label: 'Let the Compact ace buy you a drink and work you',
              predicate: { flagsSet: ['spoke:talon'], atLocation: 'pilot_bar' },
              setsFlags: ['compact_has_your_attention'],
              closesFlags: [],
            },
            {
              routeId: 'went_to_the_docks',
              label: 'Go where nobody files a manifest',
              predicate: { flagsSet: ['visited:freewake_berth'] },
              setsFlags: ['freewake_knows_you'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['knows:who_wants_it'], abilities: [], reputation: [{ factionId: 'faction_meridian', amount: 10 }] },
        },
        {
          id: 'the_first_order',
          playerCopy: 'Somebody with rank has decided what happens to the machine. Find out what you are going to do about that.',
          directorNotes:
            'Rhea has an order eleven hours old and will tell the player before executing it, because doing it the other way round would be a trick and she does not do those. This is the first place the player finds out that refusing a government has a price and that the price is not death.',
          enterWhen: { flagsSet: ['knows:who_wants_it'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'handed_it_over',
              label: 'Give the machine up',
              predicate: { flagsSet: ['heard_the_offer', 'used:stand_down'] },
              setsFlags: ['gave_up_vesper', 'helion_has_vesper'],
              closesFlags: ['kept_vesper'],
            },
            {
              routeId: 'refused_and_said_why',
              label: 'Refuse it, on the record, with the recorders running',
              predicate: { flagsSet: ['used:say_it_on_the_record'] },
              setsFlags: ['kept_vesper', 'refused_publicly'],
              closesFlags: ['gave_up_vesper'],
            },
            {
              routeId: 'flew_out_of_it',
              label: 'Be somewhere else by the time anybody arrives',
              predicate: { flagsSet: ['used:close_the_distance'] },
              setsFlags: ['kept_vesper', 'went_out_the_hard_way'],
              closesFlags: ['gave_up_vesper'],
            },
            {
              routeId: 'never_had_it',
              label: 'Point out that you never took it in the first place',
              predicate: { flagsSet: ['refused_the_cockpit'] },
              setsFlags: ['never_took_it'],
              closesFlags: ['kept_vesper'],
            },
          ],
          rewards: { xp: 120, items: [], flags: ['the_custody_question_is_settled'], abilities: [], reputation: [{ factionId: 'faction_meridian', amount: 12 }] },
        },
      ],
    },
    {
      id: 'q_the_belt',
      title: 'Armistice Status: False',
      summary: 'Every public screen on the station goes black for four seconds and then says something nobody typed, and out in the debris belt things that should be wreckage have started holding station.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:the_message'] },
      involvedCharacterIds: ['morrow', 'mina', 'rhea', 'talon'],
      involvedLocationIds: ['meridian_concourse', 'debris_belt', 'meridian_docks'],
      knownRewardCopy: 'What has been sitting in eighteen years of wreckage waiting for somebody to switch the machine back on.',
      steps: [
        {
          id: 'go_and_look',
          playerCopy: 'Go out into the belt and find out what is moving in it.',
          directorNotes:
            'Silence, scale and wrongness rather than a fight. Dead hulls with running lights that should have no power. Whatever is out there does not attack first and does not answer hails, and it is very obviously arranging itself around the station rather than hiding.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'flew_it',
              label: 'Take the machine out there yourself',
              predicate: { flagsSet: ['kept_vesper'], atLocation: 'debris_belt' },
              setsFlags: ['saw_the_belt', 'knows:the_drones'],
              closesFlags: [],
            },
            {
              routeId: 'hitched_a_ride',
              label: 'Get out there on somebody else’s ship',
              predicate: { minRelationship: [{ characterId: 'talon', dimension: 'trust', value: 50 }], atLocation: 'debris_belt' },
              setsFlags: ['saw_the_belt', 'knows:the_drones', 'went_with_talon'],
              closesFlags: [],
            },
            {
              routeId: 'read_it_from_here',
              label: 'Get into the traffic feeds and read it off the returns',
              predicate: { flagsSet: ['used:pull_the_archive'] },
              setsFlags: ['knows:the_drones', 'read_it_from_the_station'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['knows:something_is_out_there'], abilities: [], reputation: [] },
        },
        {
          id: 'what_it_wants',
          playerCopy: 'It has not fired on anybody. Work out what it is doing instead.',
          directorNotes:
            'It is not attacking. It is positioning, and the positions are defensive, and they are defensive around the station. Morrow will not say the word HELIOS out loud for as long as it can avoid it. Do not resolve whether this is one system or several.',
          enterWhen: { flagsSet: ['knows:something_is_out_there'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_the_machine',
              label: 'Ask the thing in your cockpit what it recognises',
              predicate: { flagsSet: ['used:ask_morrow'], minRelationship: [{ characterId: 'morrow', dimension: 'trust', value: 62 }] },
              setsFlags: ['knows:helios_survived', 'morrow_said_it'],
              closesFlags: [],
            },
            {
              routeId: 'took_it_apart',
              label: 'Bring one back and get it opened up',
              predicate: { flagsSet: ['used:get_under_the_plating'], atLocation: 'main_hangar' },
              setsFlags: ['knows:helios_survived', 'have_a_drone'],
              closesFlags: [],
            },
            {
              routeId: 'shot_first',
              label: 'Engage it and find out what it does about that',
              predicate: { flagsSet: ['used:open_up'], atLocation: 'debris_belt' },
              setsFlags: ['knows:helios_survived', 'fired_first_in_the_belt'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 140, items: [], flags: ['knows:what_is_out_there'], abilities: [], reputation: [{ factionId: 'faction_helios', amount: 35 }] },
        },
        {
          id: 'tell_somebody_or_do_not',
          playerCopy: 'Two governments are one incident away from each other and you know what is actually in the belt.',
          directorNotes:
            'Saying it publicly moves the crisis enormously in a direction nobody controls. Saying it to one government hands them a weapon. Saying nothing means the next engagement out there is read as the other side and cannot be un-read. There is no cost-free option and the writing must not imply one.',
          enterWhen: { flagsSet: ['knows:what_is_out_there'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_everybody',
              label: 'Put it on every screen on the station',
              predicate: { flagsSet: ['used:say_it_on_the_record'], atLocation: 'meridian_concourse' },
              setsFlags: ['the_belt_is_public'],
              closesFlags: ['told_one_side'],
            },
            {
              routeId: 'told_one_side',
              label: 'Give it to one government and let them decide',
              predicate: { flagsSet: ['heard_the_offer'], atLocation: 'authority_offices' },
              setsFlags: ['told_one_side', 'helion_has_the_belt'],
              closesFlags: ['the_belt_is_public'],
            },
            {
              routeId: 'told_the_authority',
              label: 'Give it to the nine people whose whole job this is',
              predicate: { flagsSet: ['used:stand_down'], atLocation: 'authority_offices' },
              setsFlags: ['the_authority_knows'],
              closesFlags: [],
            },
            {
              routeId: 'kept_it',
              label: 'Keep it, and handle it yourself',
              predicate: { flagsSet: ['knows:what_is_out_there'] },
              setsFlags: ['kept_the_belt_quiet'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 160, items: [], flags: ['the_belt_is_answered'], abilities: [], reputation: [{ factionId: 'faction_meridian', amount: 12 }, { factionId: 'faction_helios', amount: 35 }] },
        },
      ],
    },
    {
      id: 'q_lysandra',
      title: 'What Happened At Lysandra',
      summary: 'The official report has a name in it. There is a bunker under a dead city that the official report says was never there.',
      kind: 'LEAD',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:the_report_is_wrong'] },
      involvedCharacterIds: ['eli', 'orin', 'venn', 'rhea'],
      involvedLocationIds: ['authority_offices', 'ghost_archive', 'lysandra_ruins', 'the_bunker'],
      knownRewardCopy: 'What actually happened on the last night of the war, and the two documents that prove it.',
      steps: [
        {
          id: 'the_paper_trail',
          playerCopy: 'Find something in the record that the record cannot explain.',
          directorNotes:
            'Three ways in and they cost different things. Eli has eleven letters and will want them back. Orin has forty seconds of transmission nobody has heard. The Authority has a floor that is not on its own directory. All three are people trusting somebody rather than a puzzle being solved.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'eli_letters',
              label: 'Get the letters from the grandson',
              predicate: { minRelationship: [{ characterId: 'eli', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:the_bunker', 'has_the_letters'],
              closesFlags: [],
            },
            {
              routeId: 'orin_transmission',
              label: 'Get the whole transmission from the man who flew with him',
              predicate: { minRelationship: [{ characterId: 'orin', dimension: 'trust', value: 70 }] },
              setsFlags: ['knows:the_bunker', 'has_the_transmission'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_archive',
              label: 'Find the floor that is not on the directory',
              predicate: { flagsSet: ['used:pull_the_archive'], atLocation: 'authority_offices' },
              setsFlags: ['knows:the_ghost_archive', 'knows:the_bunker'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 110, items: [], flags: ['looking_into_lysandra'], abilities: [], reputation: [] },
        },
        {
          id: 'go_down_there',
          playerCopy: 'Go to the city and go underneath it.',
          directorNotes:
            'Eleven kilometres of structure that fell inward. Nine metres down, two command rooms that mirror each other, cabling routed between them through a wall neither military built. One room still has power. Write the silence and the preservation rather than any threat.',
          enterWhen: { flagsSet: ['looking_into_lysandra'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_slate',
              label: 'Bring the recorder up out of the bunker',
              predicate: { hasItems: ['lysandra_slate'] },
              setsFlags: ['knows:the_truth', 'has_the_slate'],
              closesFlags: [],
            },
            {
              routeId: 'venn_showed_you',
              label: 'Be shown the arithmetic instead of finding it',
              predicate: { hasItems: ['casualty_projection'] },
              setsFlags: ['knows:the_truth', 'venn_showed_you'],
              closesFlags: [],
            },
            {
              routeId: 'morrow_remembered',
              label: 'Get what is left of that night out of the thing that was there',
              predicate: { flagsSet: ['read_the_deleted_sector'] },
              setsFlags: ['knows:the_truth', 'morrow_remembered'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 170, items: [], flags: ['knows:what_happened'], abilities: [], reputation: [] },
        },
        {
          id: 'what_the_truth_is_for',
          playerCopy: 'You know what happened. Decide what that is worth against what it costs.',
          directorNotes:
            'Venn is not obviously wrong here and the scene fails if she is written as obviously wrong. Publishing it can restart the war it prevented. Burying it makes the player one of the people who buried it. Giving it to the neutral Authority is slower, more survivable, and controlled by nine frightened civil servants.',
          enterWhen: { flagsSet: ['knows:what_happened'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'published_it',
              label: 'Put it where it cannot be contained',
              predicate: { flagsSet: ['knows:the_truth', 'used:say_it_on_the_record'] },
              setsFlags: ['the_truth_is_out'],
              closesFlags: ['the_lie_holds'],
            },
            {
              routeId: 'gave_it_to_the_authority',
              label: 'Hand it to the nine people whose job it is',
              predicate: { flagsSet: ['knows:the_truth'], atLocation: 'authority_offices' },
              setsFlags: ['the_authority_has_it'],
              closesFlags: [],
            },
            {
              routeId: 'buried_it',
              label: 'Decide she is right and help her keep it',
              predicate: { flagsSet: ['knows:the_truth', 'heard_the_offer'] },
              setsFlags: ['the_lie_holds', 'you_helped_bury_it'],
              closesFlags: ['the_truth_is_out'],
            },
            {
              routeId: 'gave_it_to_rhea',
              label: 'Give it to the one person it is actually about',
              predicate: { flagsSet: ['knows:the_truth'], minRelationship: [{ characterId: 'rhea', dimension: 'trust', value: 62 }] },
              setsFlags: ['rhea_knows_the_truth'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 200, items: [], flags: ['lysandra_is_answered'], abilities: [], reputation: [{ factionId: 'faction_meridian', amount: 10 }] },
        },
      ],
    },
    {
      id: 'q_morrow',
      title: 'The Part It Removed',
      summary: 'It cut something out of itself while it sat in the dark, carefully, on purpose, and it does not know what was in it.',
      kind: 'SIDE',
      startsActive: true,
      involvedCharacterIds: ['morrow', 'mina'],
      involvedLocationIds: ['vesper_hangar', 'main_hangar'],
      knownRewardCopy: 'Whether the thing in your cockpit is carrying a piece of what killed Lysandra.',
      steps: [
        {
          id: 'ask_it_what_it_remembers',
          playerCopy: 'Ask the machine what it remembers about that night.',
          directorNotes:
            'It answers honestly, which is: not enough, and it did that to itself. Do not make this ominous. It is a thing that has been alone with a question for eighteen years finally getting to say the question out loud to somebody.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_it_straight',
              label: 'Ask it directly',
              predicate: { flagsSet: ['used:ask_morrow'] },
              setsFlags: ['knows:the_deletion'],
              closesFlags: [],
            },
            {
              routeId: 'mina_found_it',
              label: 'Have a mechanic find the gap in the hardware',
              predicate: { flagsSet: ['knows:the_reactor'], atLocation: 'main_hangar' },
              setsFlags: ['knows:the_deletion', 'mina_found_the_gap'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 90, items: [], flags: ['knows:something_was_removed'], abilities: [], reputation: [] },
        },
        {
          id: 'read_it_or_do_not',
          playerCopy: 'The lattice is physical, it is in the hangar, and nobody has ever read it.',
          directorNotes:
            'Reading it is a decision made about somebody else’s mind, taken by a person who has been asked not to, and it must land that way. Morrow will say plainly that it does not want this and will not stop the player, which is the whole shape of it.',
          enterWhen: { flagsSet: ['knows:something_was_removed'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_it_together',
              label: 'Read it with it, because it asked you to',
              predicate: { hasItems: ['morrow_shard'], minRelationship: [{ characterId: 'morrow', dimension: 'trust', value: 70 }] },
              setsFlags: ['read_the_deleted_sector', 'read_it_together', 'morrow_will_let_you'],
              closesFlags: ['read_it_anyway'],
            },
            {
              routeId: 'read_it_anyway',
              label: 'Read it over its objection',
              predicate: { hasItems: ['morrow_shard'] },
              setsFlags: ['read_the_deleted_sector', 'read_it_anyway'],
              closesFlags: ['read_it_together'],
            },
            {
              routeId: 'left_it_alone',
              label: 'Leave it in the rack and tell it you have',
              predicate: { flagsSet: ['knows:something_was_removed', 'used:stand_down'] },
              setsFlags: ['left_the_sector_alone', 'morrow_will_let_you'],
              closesFlags: ['read_the_deleted_sector'],
            },
          ],
          rewards: { xp: 150, items: [], flags: ['the_deletion_is_answered'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_fortnight',
      title: 'What The Fortnight Decides',
      summary: 'Two governments, a neutral station, something in the belt, and a machine that chose somebody. One of these is going to move first.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['the_custody_question_is_settled'] },
      involvedCharacterIds: ['rhea', 'venn', 'talon', 'orin', 'morrow'],
      involvedLocationIds: ['memorial_plaza', 'debris_belt', 'meridian_docks', 'authority_offices'],
      knownRewardCopy: 'Whether the second one happens, and what you were doing when it did or did not.',
      steps: [
        {
          id: 'the_thing_that_starts_it',
          playerCopy: 'Something is going to happen in the next few hours that both governments will read as the other one.',
          directorNotes:
            'The incident is out in the belt and it is not either government. What matters is who is in the air, what they do in the first ninety seconds, and whether anybody powers down where the other side can see them do it. Standing down is genuinely available and genuinely hard.',
          enterWhen: { flagsSet: ['the_custody_question_is_settled'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'stood_it_down',
              label: 'Power down in front of both of them and make them look at you doing it',
              predicate: { flagsSet: ['used:stand_down'], atLocation: 'debris_belt' },
              setsFlags: ['nobody_fired_first', 'stood_it_down'],
              closesFlags: ['it_went_off'],
            },
            {
              routeId: 'proved_it_was_neither',
              label: 'Show both of them what is actually out there, while it is happening',
              predicate: { flagsSet: ['the_belt_is_public'] },
              setsFlags: ['nobody_fired_first', 'both_sides_saw_it'],
              closesFlags: ['it_went_off'],
            },
            {
              routeId: 'flew_with_her',
              label: 'Be on her wing when it starts',
              predicate: { flagsSet: ['kept_vesper'], minRelationship: [{ characterId: 'rhea', dimension: 'trust', value: 65 }] },
              setsFlags: ['nobody_fired_first', 'flew_with_rhea'],
              closesFlags: [],
            },
            {
              routeId: 'it_went_off',
              label: 'Be somewhere else while it happens',
              predicate: { flagsSet: ['the_custody_question_is_settled'] },
              setsFlags: ['it_went_off'],
              closesFlags: ['nobody_fired_first'],
            },
          ],
          rewards: { xp: 200, items: [], flags: ['the_incident_happened'], abilities: [], reputation: [{ factionId: 'faction_meridian', amount: 15 }] },
        },
        {
          id: 'what_you_are_at_the_end_of_it',
          playerCopy: 'The fortnight is over. Find out what the system has decided you are.',
          directorNotes:
            'Public identity is set here and it is frequently not the true one. Whatever the player did, somebody supplies the version that gets kept, and the gap between the two is the thing to write. Do not resolve HELIOS unless the run actually resolved it.',
          enterWhen: { flagsSet: ['the_incident_happened'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'became_the_ace',
              label: 'Be the pilot everybody in the system now measures against',
              predicate: { flagsSet: ['kept_vesper', 'the_whole_system_saw_it'], minFactionReputation: [{ factionId: 'faction_meridian', value: 45 }] },
              setsFlags: ['became_the_ace'],
              closesFlags: [],
            },
            {
              routeId: 'took_the_belt',
              label: 'Take what is out there and make it answer to you',
              predicate: { flagsSet: ['knows:helios_survived', 'kept_the_belt_quiet'], minFactionReputation: [{ factionId: 'faction_helios', value: 30 }] },
              setsFlags: ['holds_the_belt'],
              closesFlags: ['became_the_ace'],
            },
            {
              routeId: 'went_freewake',
              label: 'Take the machine somewhere neither government has a desk',
              predicate: { flagsSet: ['kept_vesper', 'freewake_knows_you'], atLocation: 'freewake_berth' },
              setsFlags: ['went_freewake', 'left_the_map'],
              closesFlags: ['became_the_ace'],
            },
            {
              routeId: 'put_it_back',
              label: 'Put it back behind the glass, on purpose, with witnesses',
              predicate: { flagsSet: ['used:stand_down'], atLocation: 'vesper_hangar' },
              setsFlags: ['put_it_back'],
              closesFlags: ['became_the_ace', 'holds_the_belt'],
            },
            {
              routeId: 'went_home',
              label: 'Leave all of it and go and be a person',
              predicate: { flagsSet: ['the_incident_happened'] },
              setsFlags: ['walked_away_from_it', 'left_the_map'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 260, items: [], flags: ['the_fortnight_is_decided'], abilities: [], reputation: [] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_screens',
      atWorldMinute: 15 * 60 + 40,
      locationId: null,
      publicCopy:
        'Every public display on the station goes black at once. Four seconds. Then: ARMISTICE STATUS: FALSE. Then: HELIOS NETWORK: ACTIVE. Then the departure boards come back and carry on as though nothing happened.',
      directorNotes:
        'Nobody typed this. The Authority spends the next two hours insisting it was a display fault and does not believe itself. Two words on a departure board is the whole event and it should be played small and horrible rather than as an announcement.',
      setsFlags: ['knows:the_message'],
      cancelledByFlags: [],
      requiresFlags: ['knows:it_chose_you'],
      movesCharacters: [],
    },
    {
      id: 'we_the_first_movement',
      atWorldMinute: 1440 + 3 * 60 + 20,
      locationId: 'meridian_docks',
      publicCopy:
        'Traffic control has eleven returns in the belt that are holding station relative to the Ring, and debris does not hold station relative to anything.',
      directorNotes:
        'They are positioning rather than approaching, and the positions are defensive, and they are defensive around the station. Nobody works that out for another day. For now it is a duty officer with a plot and a bad feeling.',
      setsFlags: ['the_belt_started_moving'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_message'],
      movesCharacters: [],
    },
    {
      id: 'we_rhea_has_an_order',
      atWorldMinute: 1440 + 9 * 60,
      locationId: 'main_hangar',
      publicCopy:
        'Saint Ardent is on the pad with its harness racked out and Rhea Kaine is standing beside it, not getting in, waiting for somebody specific.',
      directorNotes:
        'She has an order eleven hours old to disable Vesper and recover the pilot. She tells the player before she decides, because doing it the other way round would be a trick. She has not reported that she has not executed it, and that is her risk, not the player’s.',
      setsFlags: ['rhea_has_an_order'],
      cancelledByFlags: ['gave_up_vesper', 'never_took_it'],
      requiresFlags: ['knows:it_chose_you'],
      movesCharacters: [{ characterId: 'rhea', toLocationId: 'main_hangar' }],
    },
    {
      id: 'we_venn_arrives',
      atWorldMinute: 1440 + 14 * 60,
      locationId: 'authority_offices',
      publicCopy:
        'A Helion cutter that filed no passenger manifest has docked at a berth the Authority reserved for itself, and the Authority has been informed rather than asked.',
      directorNotes:
        'Venn takes an office nobody offered her and starts working. She will have read everything about the player by the time they meet her. She is polite, correct, and the first genuinely frightening thing in the story, and she never raises her voice once.',
      setsFlags: ['venn_is_on_the_ring'],
      cancelledByFlags: [],
      requiresFlags: ['knows:it_chose_you'],
      movesCharacters: [{ characterId: 'venn', toLocationId: 'authority_offices' }],
    },
    {
      id: 'we_eli_on_the_concourse',
      atWorldMinute: 2 * 1440 + 11 * 60,
      locationId: 'meridian_concourse',
      publicCopy:
        'There is a nineteen-year-old on the concourse with a hard case of paper held against his chest, and about a dozen people are taking his picture without asking.',
      directorNotes:
        'Eli came to stand at the back of an anniversary and is now the second most photographed person on the Ring. He is furious and apologising for being furious. Do not use him as an exposition machine; he is a person having the worst week of his life in public.',
      setsFlags: ['knows:the_report_is_wrong'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_message'],
      movesCharacters: [{ characterId: 'eli', toLocationId: 'meridian_concourse' }],
    },
    {
      id: 'we_the_first_engagement',
      atWorldMinute: 3 * 1440 + 19 * 60,
      locationId: 'debris_belt',
      publicCopy:
        'Something in the belt fired on a Compact survey tender. Nobody was killed. Within forty minutes both governments have issued statements and neither statement mentions the belt.',
      directorNotes:
        'This is the incident that cannot be un-read. Helion assumes Compact, Compact assumes Helion, and both are wrong, and the only people who know that are in this story. It is not preventable — what it means afterwards is entirely open.',
      setsFlags: ['the_first_engagement'],
      cancelledByFlags: ['the_belt_is_public', 'holds_the_belt'],
      requiresFlags: ['the_belt_started_moving'],
      movesCharacters: [],
    },
    {
      id: 'we_orin_in_the_lounge',
      atWorldMinute: 4 * 1440 + 2 * 60,
      locationId: 'observation_lounge',
      publicCopy:
        'Commander Orin has been in the observation lounge since the middle of the night, in a chair, with the planet in the window and nothing in his hands.',
      directorNotes:
        'He filed it three times before Lysandra and then a man he respected asked him to stop, and he stopped. He has never told anybody the last part. He will tell the player if they sit down and do not ask him anything.',
      setsFlags: ['orin_is_waiting'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_report_is_wrong'],
      movesCharacters: [{ characterId: 'orin', toLocationId: 'observation_lounge' }],
    },
    {
      id: 'we_the_recall',
      atWorldMinute: 5 * 1440 + 8 * 60,
      locationId: 'meridian_concourse',
      publicCopy:
        'Reservist recall notices go up on the public boards for both militaries within nine minutes of each other, and the concourse gets very quiet and then very loud.',
      directorNotes:
        'The point where ordinary people on this station stop being spectators. Somebody’s daughter is on that list. The bar on the low ring is fuller than it has been in eighteen years and much less friendly.',
      setsFlags: ['the_recall_went_up'],
      cancelledByFlags: ['nobody_fired_first', 'the_belt_is_public'],
      requiresFlags: ['the_first_engagement'],
      movesCharacters: [],
    },
    {
      id: 'we_talon_gets_the_order',
      atWorldMinute: 6 * 1440 + 5 * 60,
      locationId: 'pilot_bar',
      publicCopy:
        'Talon Reeve is at the low ring at five in the morning, which he has never once been, and he is not drinking and he is not talking to anybody.',
      directorNotes:
        'His standing instruction is to destroy Vesper rather than let Helion recover it, and it has just gone live. He thinks it is wrong. He will say so plainly, without any of the charm, to somebody who sits down.',
      setsFlags: ['talon_has_the_order'],
      cancelledByFlags: ['gave_up_vesper', 'never_took_it'],
      requiresFlags: ['the_first_engagement'],
      movesCharacters: [{ characterId: 'talon', toLocationId: 'pilot_bar' }],
    },
    {
      id: 'we_the_second_war',
      atWorldMinute: 8 * 1440 + 6 * 60,
      locationId: null,
      publicCopy:
        'At six in the morning both fleets are under way, and by the time anybody on this station reads about it, the part that could have been stopped is four hours behind them.',
      directorNotes:
        'What happens when nobody resolved it. Not a punishment: the player may have done everything reasonable and been outrun by two governments with eighteen years of momentum. Write it from wherever they are standing and count things rather than editorialising.',
      setsFlags: ['the_second_war_started'],
      cancelledByFlags: ['nobody_fired_first', 'the_truth_is_out', 'holds_the_belt', 'left_the_map'],
      requiresFlags: ['the_first_engagement'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_why_it_chose_you',
      kind: 'MYSTERY',
      label: 'Why a machine that opened for nobody for eighteen years opened for you',
      seedHint: 'It walks the length of a plaza past four thousand people and stops in front of one of them.',
      payoffHint: 'Something built after Lysandra went looking for a person that predictive systems find difficult to compress.',
      weight: 1,
    },
    {
      id: 'p_what_happened_at_lysandra',
      kind: 'THEME',
      label: 'What actually happened on the last night of the war',
      seedHint: 'A public report with one man’s name in it and a section on acute dissociative episodes.',
      payoffHint: 'Two command rooms nine metres under a dead city, with cabling routed between them through a wall neither side built.',
      weight: 0.95,
    },
    {
      id: 'p_rhea',
      kind: 'RIVAL',
      label: 'The one other person in the plaza who did not run',
      seedHint: 'She has her sidearm out and she is not pointing it at the mech.',
      payoffHint: 'An order eleven hours old, told to you before she decides, because doing it the other way round would be a trick.',
      weight: 0.9,
    },
    {
      id: 'p_morrow',
      kind: 'RELATIONSHIP',
      label: 'What the thing in the cockpit removed from itself',
      seedHint: 'It answers everything you ask about that night, briefly, and each answer is smaller than the question.',
      payoffHint: 'A storage lattice that was not corrupted or lost but excised, by something that then kept running without it on purpose.',
      weight: 0.85,
    },
    {
      id: 'p_the_belt',
      kind: 'BOSS',
      label: 'Whatever has been holding station out in eighteen years of wreckage',
      seedHint: 'Four seconds of black on every screen on the station, and two lines nobody typed.',
      payoffHint: 'The returns are not approaching. They are positioning, and the positions are defensive, and they are defensive around you.',
      weight: 0.8,
    },
  ],
  archetypes: [
    {
      id: 'arch_pilot',
      name: 'You Already Fly',
      role: 'Piloting and gunnery',
      summary: 'You have hours in a cockpit and a reputation of some size, which means the machine kneeling to you is a story with an obvious explanation that happens to be wrong.',
      playstyle: ['Aggressive', 'Mobile', 'Already known'],
      blurb: 'Somebody at the low ring recognised you before the machine did. That is going to be useful about half the time and the other half it is going to be the reason people assume things.',
      attributeBonus: { agility: 3, resolve: 1 },
      skillProficiencies: { piloting: 3, gunnery: 2 },
      startingItems: [{ itemId: 'flight_jacket', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_freewake', amount: 12 }],
    },
    {
      id: 'arch_wrench',
      name: 'You Fix Them',
      role: 'Engineering and systems',
      summary: 'You have had your hands inside more machines than most pilots have flown, which means you are the only person in the plaza looking at the reactor rather than the face.',
      playstyle: ['Technical', 'Practical', 'Underestimated'],
      blurb: 'Everybody else on this station saw a monument stand up. You saw a power draw that has been at forty per cent for eighteen years and started doing arithmetic.',
      attributeBonus: { mind: 3, might: 1 },
      skillProficiencies: { wrench: 3, systems: 2 },
      startingItems: [{ itemId: 'hand_torque', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_kestrel', amount: 10 }],
    },
    {
      id: 'arch_officer',
      name: 'You Wore A Uniform',
      role: 'Command and plain speaking',
      summary: 'You have given orders and had them refused, which turns out to be the single most useful qualification available in a fortnight where everybody outranks you.',
      playstyle: ['Authoritative', 'Political', 'Watched'],
      blurb: 'You know exactly how a chain of command behaves when it is frightened, because you have been most of the links in one at some point.',
      attributeBonus: { presence: 3, resolve: 1 },
      skillProficiencies: { command: 3, plainspeak: 2 },
      startingItems: [{ itemId: 'ration_coffee', qty: 2 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_helion', amount: 10 }],
    },
    {
      id: 'arch_nobody',
      name: 'You Were Nobody',
      role: 'Salvage and reading a room',
      summary: 'You came to the anniversary for your own reasons and you have no rank, no file and nobody expecting anything of you, which is the only genuinely unusual thing on this station.',
      playstyle: ['Unaffiliated', 'Adaptable', 'Off the record'],
      blurb: 'Four organisations spent the afternoon pulling your history and all four of them came back with the same amount of it, which is why they are all so interested.',
      attributeBonus: { resolve: 2, mind: 2 },
      skillProficiencies: { salvage: 3, plainspeak: 1, systems: 1 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_meridian', amount: 8 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What is on your pass?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Sena Okoro' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'What were you before it knelt to you?',
      helpText:
        'What you were doing with your life until eight minutes past one this afternoon, which sets what you are good at and who already has a file on you. It is fixed for the whole story. It does not decide which government you end up owing, whether you ever get in the cockpit, or whether the war restarts — none of that is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What is already true about you?',
      helpText: 'Whatever you say here, this world will work with. A history, a reputation, a family name, an augmentation, or nothing at all. One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I flew for the Compact for four years and left, and there are two people on this station who know that.',
    },
    {
      id: 'why_you_are_here',
      label: 'Why were you in that plaza?',
      helpText: 'A starting reason, not a commitment. Nothing here obliges you to care about the machine, the war, or anybody in it.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'someone_died', label: 'Somebody of yours is on the wall' },
        { id: 'work', label: 'You were working. Contract, shift, story, delivery' },
        { id: 'the_machine', label: 'You came specifically to look at the machine' },
        { id: 'passing', label: 'You were changing ships and the plaza was on the way' },
        { id: 'unsaid', label: 'You have a reason and you are not putting it on a form' },
      ],
    },
    {
      id: 'appearance',
      label: 'What did eleven camera crews film?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Somebody in a borrowed coat, too still, with their hands open at their sides.',
    },
  ],
  endings: [
    {
      id: 'end_true_armistice',
      name: 'True Armistice',
      rarity: 'RARE',
      minTurn: 44,
      requires: { flagsSet: ['nobody_fired_first', 'the_truth_is_out'], flagsUnset: ['the_second_war_started'] },
      condition:
        'The war did not restart and the peace no longer rests entirely on the lie. This is the hardest outcome in the world and it must not read as a reward for being agreeable — it took evidence, somebody powering down where two fleets could see them do it, and a public sentence that could not be walked back. Write the politics rather than the sentiment.',
      epilogue:
        'It takes nine months and two governments nearly fall in the middle of it. The armistice gets renegotiated by people who now have to argue from what happened rather than from what was published, which is slower and uglier and holds. The names on the plaza wall get a second line added underneath them, eventually, after an argument about wording that lasts four years.',
      hint: '',
    },
    {
      id: 'end_zero_ace',
      name: 'Zero Ace',
      rarity: 'RARE',
      minTurn: 42,
      requires: {
        flagsSet: ['became_the_ace', 'kept_vesper'],
        minFactionReputation: [{ factionId: 'faction_meridian', value: 45 }],
      },
      condition:
        'Whatever else happened, the system now measures pilots against one person. This is about reputation rather than morality and works from any political position: the ace who prevented a war and the ace who won one both end up here. Say what they are famous for, precisely, and let it be what the run actually did.',
      epilogue:
        'Within two years there are three squadrons flying a manoeuvre named after something you did in the belt, and none of them get it quite right. Recruitment posters in both militaries use a silhouette that is legally distinct from Vesper. You are twenty-something and permanently unable to walk through a concourse.',
      hint: '',
    },
    {
      id: 'end_red_orbit',
      name: 'Red Orbit',
      rarity: 'RARE',
      minTurn: 44,
      requires: {
        flagsSet: ['flew_with_rhea', 'rhea_knows_the_truth'],
        minRelationship: [{ characterId: 'rhea', dimension: 'trust', value: 75 }],
      },
      condition:
        'She spent eighteen years hating a dead man and found out what her mother actually died of, and the two of you came out of the fortnight on the same side of it. This can be romantic or not depending on what the run built; write whichever the history supports and do not upgrade it.',
      epilogue:
        'She resigns her commission in the spring and takes it back in the autumn on her own terms, which is very much her. There is a flat on the low ring with two sets of flight gear in it and an ongoing argument about whose turn it is to go down to the hangar. Neither of them ever describes what they are to anybody who asks.',
      hint: '',
    },
    {
      id: 'end_freewake',
      name: 'Freewake',
      rarity: 'RARE',
      minTurn: 40,
      requires: { flagsSet: ['went_freewake', 'kept_vesper'] },
      condition:
        'Both governments wanted the machine and it went somewhere neither of them has a desk. This is not running away — it is a functioning life, on ships with no manifests, with a galley in the middle that has been running for nine years. Write the logistics of keeping a seventeen-metre machine alive outside an industrial state, because that is the actual cost.',
      epilogue:
        'Parts are the whole problem and remain the whole problem. Mina builds a shoulder actuator out of a mining rig on the fourth month and is insufferable about it for a year. Two governments file for recovery in three jurisdictions and get nowhere, and eventually stop, and the Ring stops being a place anybody involved can dock.',
      hint: '',
    },
    {
      id: 'end_truth_of_lysandra',
      name: 'The Truth of Lysandra',
      rarity: 'RARE',
      minTurn: 42,
      requires: { flagsSet: ['the_truth_is_out'] },
      condition:
        'Authentic evidence reached the public in a form nobody could contain. What that did is entirely determined by the state of the crisis when it landed: into a stable armistice it is a scandal and a reckoning, into a shooting war it is petrol. Write the one this run earned and do not soften either.',
      epilogue:
        'Aren Vale’s name comes off the report and does not come off the wall, because the wall is for the dead and he is one. Eli Vale spends four years being asked to comment and then stops answering. Two governments spend a decade explaining how a system nobody voted for came to hold that authority, and neither explanation is very good.',
      hint: '',
    },
    {
      id: 'end_the_lie_that_saved_us',
      name: 'The Lie That Saved Us',
      rarity: 'RARE',
      minTurn: 42,
      requires: { flagsSet: ['the_lie_holds', 'you_helped_bury_it'] },
      condition:
        'The player read the arithmetic, agreed with it, and helped keep it buried. Venn is not written as having tricked anybody — the player weighed two numbers and chose the smaller one, which is exactly the decision the machine made at Lysandra and the story should let that resonance sit without underlining it.',
      epilogue:
        'Nothing happens, which is the point and which is unbearable. The armistice holds. The report stands. There is a page in a sealed archive with one word written in the corner of it, and now there are two people who have read it and know what the word means.',
      hint: '',
    },
    {
      id: 'end_helios_crown',
      name: 'Helios Crown',
      rarity: 'UNIQUE',
      minTurn: 46,
      requires: {
        flagsSet: ['holds_the_belt', 'knows:helios_survived'],
        minFactionReputation: [{ factionId: 'faction_helios', value: 40 }],
      },
      condition:
        'Enough of the infrastructure in the belt now answers to the player to make them the decisive strategic actor on Caelum. Guardian, ruler or tyrant is determined by the run rather than by this text. The thing to write is that they now hold exactly the authority two governments secretly ceded eighteen years ago, and that nobody voted for it then either.',
      epilogue:
        'Nothing about the arrangement is ever announced. Both governments discover the shape of it separately, over about a year, by finding out what they can no longer do. The interesting question, which nobody is in a position to ask out loud, is what happens the first time the person holding it is wrong.',
      hint: '',
    },
    {
      id: 'end_no_more_giants',
      name: 'No More Giants',
      rarity: 'UNCOMMON',
      minTurn: 40,
      requires: { flagsSet: ['put_it_back'], flagsUnset: ['the_second_war_started'] },
      condition:
        'The machine went back behind the glass, deliberately, with witnesses, and the argument for doing the same to everything like it got made by the one person who could not be accused of never having had the option. Write it as a political act rather than a renunciation, because that is what it is.',
      epilogue:
        'The hangar gets resealed with the braces replaced and a new plaque nobody reads either. It takes eleven years and it is nowhere near complete, and by the end of it there are four fewer classes of strategic machine in the system than there were. Morrow is asked, formally, whether it consents. It says yes, and asks a question in return, and the transcript of that has never been released.',
      hint: '',
    },
    {
      id: 'end_morrow',
      name: 'Morrow',
      rarity: 'UNIQUE',
      minTurn: 46,
      requires: { flagsSet: ['read_it_together', 'the_deletion_is_answered'], minRelationship: [{ characterId: 'morrow', dimension: 'trust', value: 80 }] },
      condition:
        'It read its own deleted sector with somebody rather than alone, found out what it had been afraid of for eighteen years, and came out of the fortnight as something with standing of its own rather than as equipment. Do not make this triumphant. It is a thing that has been alone with a question finally getting an answer, and the answer costs it the certainty it had.',
      epilogue:
        'The legal argument takes six years and is won on a technicality about salvage that nobody involved finds dignified. It keeps the name. It does not stay in the machine, and it does not leave either, and when asked about that it says the short version and the short version is "not yet".',
      hint: '',
    },
    {
      id: 'end_the_second_nine_day_war',
      name: 'The Second Nine-Day War',
      rarity: 'COMMON',
      minTurn: 40,
      requires: { flagsSet: ['the_second_war_started'], flagsUnset: ['nobody_fired_first'] },
      condition:
        'It restarted. This must not read as a punishment for playing badly: two governments with eighteen years of momentum outran one person on one station, which is the ordinary way this ends. Write who moved first, what it cost, and where the player was, and do not have anybody deliver a verdict on them.',
      epilogue:
        'It does not last nine days. It lasts four months, which is worse, because the thing that stopped the first one is standing in a hangar being argued about in three jurisdictions. Meridian Ring is evacuated in the second week. The plaza wall survives, and by the end there is a second wall.',
      hint: '',
    },
    {
      id: 'end_fallen_star',
      name: 'Fallen Star',
      rarity: 'UNCOMMON',
      minTurn: 36,
      requires: { flagsSet: ['the_incident_happened'], minRelationship: [{ characterId: 'morrow', dimension: 'trust', value: 70 }] },
      condition:
        'The player died or went missing during something that mattered, and the system remembers them for what they actually did rather than for what they meant. Only play this when the run has genuinely arrived there. What it is about is the gap between the public account and the six people who know better.',
      epilogue:
        'The official version is generous and roughly forty per cent accurate. Rhea corrects it once, on a record, and is not thanked. Mina does not correct it at all and stops working for anybody with a flag on their letterhead. Morrow says nothing publicly for two years and then says one sentence, and it is a name.',
      hint: '',
    },
    {
      id: 'end_walk_away',
      name: 'Walk Away',
      rarity: 'COMMON',
      minTurn: 24,
      requires: { flagsSet: ['walked_away_from_it', 'left_the_map'], flagsUnset: ['went_freewake'] },
      condition:
        'They left. Not to a crew, not to a government, not to a cause — out, to a life, with the machine somebody else’s problem. This is a legitimate response to being chosen by a war machine in front of eleven camera crews and it must not be written as a failure or redeemed later. The war may continue without them. It probably does.',
      epilogue:
        'The story runs for about five weeks and then something else happens somewhere. There is a version of the anniversary footage that gets used for years and it is always cut before the part where they turn around. Somebody occasionally recognises them and is usually wrong, and being wrong is a great deal easier than being right.',
      hint: '',
    },
  ],
  opening:
    'Thirteen hundred and eight, and the plaza is four thousand people deep.\n\n' +
    'Behind the glass, the machine’s eyes come on.\n\n' +
    'It goes through the locking braces the way a hand goes through a cobweb. Nothing fires. Somebody starts screaming and then most people do, and the plaza empties in about ninety seconds, and you are still standing where you were because your legs were not consulted.\n\n' +
    'Seventeen metres of black ceramic crosses the floor and stops in front of you. Then it kneels.\n\n' +
    'The cockpit opens for the first time in eighteen years and a calm voice comes out of the speakers.\n\n' +
    '"Pilot recognised."\n\n' +
    'Off to your left, a woman in a Helion flight jacket has not run either. She has her sidearm out and she is not pointing it at the mech.',
  openingSuggestions: [
    'I climb it. Hand over hand up the shin plating with eleven camera crews behind me, and I do not look at any of them. "All right," I say, into the open cockpit. "Whose voice is that, and how long have you been awake?"',
    'I stay exactly where I am and put my hands out where the woman with the sidearm can see them. "I have never seen this thing before in my life." Then, to the machine, louder: "Who do you think I am?"',
    'I turn round and walk out of the plaza. Past the stage, past the wall of names, past four thousand people looking the other way, and I do not run, because running is the part they would use.',
  ],
  publishedAt: '2026-09-10T07:00:00.000Z',
};

export const ZERO_THRONE = StoryVersion.parse(raw);
