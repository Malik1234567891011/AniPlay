import { StoryVersion } from '@aniplay/contracts';

/**
 * "Window Seven" — seven nights in a room with one other person and a view.
 *
 * The genre problem this world exists to solve is that surveillance is, on
 * paper, the least playable thing in fiction: two people sit still and nothing
 * happens. What makes it work is that the room is small, the partner is
 * excellent, and the target knows. So the authored content is weighted almost
 * entirely toward the inside of Apartment 7C — what is in the cupboards, what
 * Mara does at four in the morning, which mug is whose — and the espionage is
 * something that happens to that room rather than somewhere the player goes.
 *
 * The player can, of course, leave on the first night, ring the target, open
 * the case, or defect. The world is built to survive all of those: the seven
 * nights are a clock, not a corridor, and every one of them fires whether the
 * player is in the flat or not.
 *
 * One banded variable. Mara's trust and Selene's alignment are relationships
 * and are modelled as relationships; what neither of those can carry is what
 * the institution has decided about the player, which is the thing that
 * escalates on its own.
 */

const raw = {
  id: 'sv_window_seven_1',
  storyId: 'story_window_seven',
  version: 1,
  title: 'Window Seven',
  fantasyLabel: 'Seven nights. One window. She waved.',
  hook: 'Seven nights in a surveillance flat with an operative you have never worked with, watching a traitor who has just looked directly into your hidden camera.',
  premise:
    'For seven nights you sit in a dark flat on the sixth floor of an ordinary city apartment block and watch the penthouse that takes up the whole top floor of the building across the road.\n\n' +
    'The job has four rules and they fit on one line. Log every visitor. File your report at six in the morning. Do not leave the flat. Make no contact with the woman who lives over there.\n\n' +
    'Her name is Dr Selene Voss. She is a cybernetics researcher and a policy adviser, and the file your service keeps on her says she has been selling defence data out of the ministry for eleven months.\n\n' +
    'Your partner is Mara Ellison, who has done four of these and organises the safehouse food by expiry date.\n\n' +
    'There is a black case in the wardrobe. It is hers. You are not to open it.\n\n' +
    'At 01:16 on the first night, Voss walks out onto her balcony in a white shirt, looks across four lanes of empty road directly into a lens she has no way of knowing about, and waves.\n\n' +
    'Ninety seconds later your handset takes four words from somebody calling themselves Glass.\n\n' +
    'YOU ARE WATCHING THE WRONG APARTMENT.\n\n' +
    'So either the target knows exactly where you are sitting, or somebody inside your own service wanted you in this particular room. Six nights left to work out which, and the service does not officially exist, which means nobody is coming if you are wrong.',
  creatorId: 'creator_official',
  creatorName: 'ANIMA Studio',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Espionage', 'Thriller', 'Mystery', 'Romance', 'Modern', 'Conspiracy'],
  mechanicsChips: [
    'Seven nights on a clock',
    'A partner with her own orders',
    'The target knows you are there',
    'Break the mission whenever',
    'Everything you do is logged',
  ],
  contentDescriptors: ['MORAL_AMBIGUITY', 'PSYCHOLOGICAL_THEMES', 'ROMANCE', 'FANTASY_VIOLENCE', 'LANGUAGE'],
  intensity: 'MODERATE',
  creatorNote:
    'Two people, one room, seven nights, and a woman across the street who has decided to be seen. You can run the operation exactly as briefed and find out what it was actually for, or you can pick up the phone on night one and ring her. Both are the game.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'apt_7c',
    startWorldMinute: 22 * 60 + 40,
    startingItems: [{ itemId: 'handset', qty: 1 }],
    hardCanon: [
      'The player begins the operation inside Apartment 7C of Orpheum Towers with Mara Ellison.',
      'The assignment concerns Dr Selene Voss and lasts seven nights.',
      'PALISADE is real: a predictive surveillance programme that identifies likely dissidents before they act, and Directorate Nine has deployed it domestically.',
      'Mara carries a sealed contingency authorisation to kill Selene Voss if Selene attempts to leave Veyra with the PALISADE archive. She has not told the player.',
      'Glass is not one person. It is a dead-drop identity shared by three Directorate insiders.',
      'Veyra is an ordinary modern city-state. Nothing supernatural happens here.',
    ],
    toneGuide:
      'Close, quiet, and specific. Most of this story is two people in one dark room: the sound of the building, ' +
      'cold takeout, a lens cap, whose turn it is on the glass. Tradecraft is smart and legible — no acronym ' +
      'appears without somebody saying what it means once, in a way a person would actually say it. Paranoia ' +
      'comes from concrete inconsistencies the player can check, never from atmosphere. When violence arrives ' +
      'it is fast, close, badly lit, and over in four sentences. Nobody monologues.',
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 11, agility: 12, mind: 13, presence: 12, resolve: 12, arcana: 3 },
  skills: [
    { id: 'surveil', name: 'Surveillance', attribute: 'mind', description: 'Watching one window for six hours and noticing the four minutes that mattered.' },
    { id: 'tradecraft', name: 'Tradecraft', attribute: 'mind', description: 'Drops, routes, covers, and knowing when a thing has already gone wrong.' },
    { id: 'systems', name: 'Systems', attribute: 'mind', description: 'Cameras, handsets, intercepts, and the archive nobody will admit exists.' },
    { id: 'cover', name: 'Cover', attribute: 'presence', description: 'Being a plausible other person for as long as the corridor takes.' },
    { id: 'read_people', name: 'Read People', attribute: 'presence', description: 'Working out which part of what somebody just said was the true part.' },
    { id: 'close_work', name: 'Close Work', attribute: 'might', description: 'Stairwells, doorways, and the eleven seconds before anybody shouts.' },
    { id: 'movement', name: 'Movement', attribute: 'agility', description: 'Rooftops, service risers, and a tail you are supposed to keep.' },
  ],
  /**
   * One, invisible, banded.
   *
   * Mara and Selene are relationships and the engine already models both. What
   * no relationship can carry is the institution: Directorate Nine forms an
   * opinion about the player independently of anybody in the room, it moves on
   * what they file rather than on what they feel, and it escalates while they
   * sleep. That is the variable worth having.
   */
  resources: [
    {
      id: 'directorate_suspicion',
      name: 'Directorate Suspicion',
      max: 100,
      start: 10,
      regenPerHour: -0.2,
      polarity: 'GOOD_LOW',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'As far as Directorate Nine is concerned the player is a name on a duty roster who files on time. Nobody is thinking about them at all, and that is the most useful thing they own.',
      color: '#3E5C7A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'The player reads as compliant. Halden calls once a night at the scheduled hour, is warm and brief, and rings off first. Requests are granted without a reason being asked for. Nothing in the building is watching the safehouse, and Mara relaxes about half a degree because of it.',
        },
        {
          upTo: 55,
          behaviour:
            'Somebody has started reading the player’s reports properly. Check-ins move without warning and come twice. Halden asks a question he already knows the answer to, to see what answer he gets. A second vehicle appears on the avenue on consecutive nights and the plates are consecutive too. Mara notices before the player does and does not say so.',
        },
        {
          upTo: 80,
          behaviour:
            'The player is being worked. Counter-surveillance is on them in the street, their handset is answering slightly slowly, and the safehouse resupply arrives from a courier nobody recognises. Halden stops asking questions and starts making statements that require a correction. Internal security has a file open and a name on it.',
        },
        {
          upTo: 100,
          behaviour:
            'The player is treated as compromised or hostile. The extraction that was promised is a team sent to bring them in, the flat is burned as a site, and Directorate assets in Veyra have their photograph. Anybody who helps them is now also a problem, and Mara has to decide, in front of them, which set of orders she is following.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'handset',
      name: 'A Secure Handset',
      tags: ['kit'],
      droppable: false,
      description: 'Matte, heavy, one physical key. It receives from Directorate traffic and, since 01:17 on the first night, from an identity called Glass.',
      loreText: 'The Glass messages do not appear in the handset’s own log, which is the first genuinely alarming fact of the operation.',
      icon: 'phone',
    },
    {
      id: 'long_lens',
      name: 'The Long Lens',
      tags: ['kit', 'surveillance'],
      equipSlot: 'hands',
      skillModifiers: { surveil: 3 },
      description: 'On a tripod at the slit in the blackout, aimed at a penthouse balcony eleven floors up and four lanes over. Mara set the focus and does not like it moved.',
      icon: 'camera',
    },
    {
      id: 'the_black_case',
      name: 'The Black Case',
      tags: ['quest', 'sealed'],
      questItem: true,
      droppable: false,
      description: 'In the wardrobe of 7C under two folded blankets. Aluminium, seal intact, and the only object in the flat neither of you has a reason to touch.',
      loreText: 'Contingency gear and one sealed envelope with a countersignature on it. The envelope is Mara’s and the gear is for what the envelope authorises.',
      icon: 'case',
    },
    {
      id: 'palisade_drive',
      name: 'The PALISADE Archive',
      tags: ['quest', 'data'],
      questItem: true,
      droppable: false,
      skillModifiers: { systems: 2 },
      description: 'Four hundred thousand people in a city of two million, scored on how likely they are to become a problem, updated hourly. It fits in a coat pocket.',
      loreText: 'Selene built the scoring model. She did not build the deployment, and she has the memoranda that prove the difference.',
      icon: 'drive',
    },
    {
      id: 'juno_log',
      name: 'The Building Access Log',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { tradecraft: 2 },
      description: 'Nine weeks of every card swipe in your own building, printed on the concierge desk printer and sold to you at a price Juno regards as a favour. He keeps the far building’s as well, because the two desks trade.',
      loreText: 'Two of the entries belong to a Directorate credential that has no business being in that building.',
      icon: 'papers',
    },
    {
      id: 'burner_set',
      name: 'A Set of Burners',
      tags: ['kit'],
      stackable: true,
      maxStack: 3,
      skillModifiers: { tradecraft: 1 },
      description: 'Three of them in a supermarket bag in the kitchen drawer, still in the blister packs, bought in three different districts.',
      icon: 'burner',
    },
    {
      id: 'voss_memoranda',
      name: 'The Voss Memoranda',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'Fourteen months of Selene raising the domestic deployment internally, in writing, and being told in writing to stop.',
      loreText: 'The last one is countersigned by Halden. It is the reason the leak investigation exists.',
      icon: 'file',
    },
  ],
  abilities: [
    {
      id: 'work_the_glass',
      name: 'Work the Glass',
      tags: ['sight', 'surveillance'],
      description: 'Take the lens and actually watch, for as long as it takes to see the thing that is different tonight.',
      affordances: [
        'watch the window',
        'take the glass',
        'look through the lens',
        'watch the penthouse',
        'observe her',
        'take a shift on the camera',
        'log what she does',
        'keep watching',
      ],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'surveil', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'file_the_report',
      name: 'File the Report',
      tags: ['utility'],
      description: 'Send the 06:00 report. What goes in it, what does not, and what is phrased carefully is entirely the player’s.',
      affordances: [
        'file the report',
        'send the report',
        'report in',
        'check in',
        'log it with directorate',
        'tell halden',
        'leave it out of the report',
        'file a clean report',
      ],
      costs: [],
      cooldownMinutes: 240,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'tradecraft', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'make_contact',
      name: 'Make Contact',
      tags: ['social'],
      description: 'Break the one standing order the briefing was emphatic about, and speak to the target.',
      affordances: [
        'call her',
        'contact selene',
        'ring the penthouse',
        'signal her',
        'wave back',
        'text the target',
        'go and knock on her door',
        'make contact',
      ],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'cover', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'open_the_case',
      name: 'Open the Case',
      tags: ['utility'],
      description: 'Break a seal that logs the time it was broken.',
      affordances: [
        'open the case',
        'open the black case',
        'break the seal',
        'look in the case',
        'find out what is in the case',
      ],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'systems', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'sweep_the_flat',
      name: 'Sweep',
      tags: ['sight', 'utility'],
      description: 'Find out whether the room you are hiding in is also being listened to.',
      affordances: [
        'sweep the flat',
        'check for bugs',
        'search the apartment',
        'check the equipment',
        'see if we are being watched',
        'check the handset',
      ],
      costs: [],
      cooldownMinutes: 120,
      targetRule: 'AREA',
      check: { attribute: 'mind', skillId: 'systems', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'run_a_tail',
      name: 'Run a Tail',
      tags: ['movement'],
      description: 'Leave the flat and follow somebody, or lose somebody, on four lanes and a tram line.',
      affordances: [
        'follow him',
        'tail her',
        'go down to the street',
        'follow them',
        'shake the tail',
        'lose them',
        'take the rooftops',
        'go across the avenue',
      ],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'movement', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'put_it_to_her',
      name: 'Put It To Her',
      tags: ['social'],
      description: 'Stop working around Mara Ellison and ask her the question directly, in a room she cannot leave.',
      affordances: [
        'ask mara directly',
        'confront mara',
        'ask her what her orders are',
        'put it to her',
        'ask about the case',
        'tell her what I found',
      ],
      costs: [],
      cooldownMinutes: 60,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'read_people', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'burn_the_archive',
      name: 'Burn the Archive',
      tags: ['offensive', 'utility'],
      description: 'Destroy the archive rather than move it, which nobody in this story wants and several people would kill to prevent.',
      affordances: [
        'destroy the archive',
        'burn the archive',
        'wipe the drive',
        'destroy palisade',
        'delete it',
        'smash the drive',
      ],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'systems', baseDc: 16 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:palisade'],
        lockedCopy: 'You cannot destroy an archive you have not found. At the moment PALISADE is a word two people have said to you and neither of them wrote anything down.',
      },
    },
    {
      id: 'publish_it',
      name: 'Put It Out',
      tags: ['social', 'utility'],
      description: 'Give PALISADE to somebody who prints things, and make it permanently everybody’s problem.',
      affordances: [
        'publish it',
        'leak it',
        'give it to a journalist',
        'put it out',
        'expose palisade',
        'go public',
        'send it to the press',
      ],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'presence', skillId: 'tradecraft', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:palisade'],
        lockedCopy: 'Nobody prints an allegation. They print a document, and you have not been handed one yet.',
      },
    },
  ],
  locations: [
    {
      id: 'apt_7c',
      name: 'Apartment 7C',
      shortName: '7C',
      description:
        'Blackout on every window but one, and a slit in that one the width of a lens. A tripod, two folding chairs, a kettle, and food organised by expiry date in a cupboard nobody asked Mara to organise.',
      artDirection:
        'Dark surveillance apartment at night, blackout curtains with one narrow gap, camera on a tripod, two mugs, equipment glow, city light through the slit. Cramped, lived-in, tense.',
      connections: [
        { to: 'orpheum_corridor', travelMinutes: 1, label: 'Out into the corridor' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'long_lens', qty: 1, ownerId: 'mara', aka: ['lens', 'the glass', 'camera', 'long lens'] },
        { itemId: 'the_black_case', qty: 1, ownerId: 'mara', aka: ['case', 'the case', 'black case', 'the locked case'] },
        { itemId: 'burner_set', qty: 3, ownerId: null, aka: ['burner', 'burners', 'a burner phone'] },
      ],
    },
    {
      id: 'orpheum_corridor',
      name: 'The Seventh Floor',
      shortName: 'Seventh Floor',
      description:
        'Carpet that eats sound, eleven doors, and a service riser at the far end with a lock that has been picked before. Nobody on this floor has ever seen either of you.',
      artDirection:
        'Anonymous upmarket apartment corridor, thick carpet, evenly spaced doors, one service door ajar, low warm lighting, no people. Quiet, expensive, exposed.',
      connections: [
        { to: 'apt_7c', travelMinutes: 1, label: 'Back into 7C' },
        { to: 'orpheum_lobby', travelMinutes: 2, label: 'Down to the lobby' },
        { to: 'orpheum_roof', travelMinutes: 4, label: 'Up the riser to the roof' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
    },
    {
      id: 'orpheum_lobby',
      name: 'Orpheum Lobby',
      shortName: 'Lobby',
      description:
        'Marble, a desk, and Juno Vale behind it at every hour anybody has ever checked. Two lifts, a parcel room, and a printer he is not supposed to use for anything that is not a parcel.',
      artDirection:
        'Luxury apartment tower lobby at night, polished stone, brass lift doors, a concierge desk with one lamp, rain on the glass frontage. Grand and empty.',
      connections: [
        { to: 'orpheum_corridor', travelMinutes: 2, label: 'Up to the seventh' },
        { to: 'the_avenue', travelMinutes: 1, label: 'Out onto the avenue' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'juno_log', qty: 1, ownerId: 'juno', aka: ['log', 'access log', 'the swipes', 'building log'] },
      ],
    },
    {
      id: 'the_avenue',
      name: 'Kellis Avenue',
      shortName: 'The Avenue',
      description:
        'Four lanes, a tram line down the middle, and eleven floors of glass on the far side. At three in the morning it is the emptiest street in Veyra and the easiest place in the city to be photographed.',
      artDirection:
        'Wide wet city avenue at night, tram tracks, two facing towers, sodium light and neon reflections, a single parked car with its lights off. Cinematic, cold, watched.',
      connections: [
        { to: 'orpheum_lobby', travelMinutes: 1, label: 'Back into Orpheum' },
        { to: 'voss_tower', travelMinutes: 3, label: 'Across to Selene’s building' },
        { to: 'the_subway', travelMinutes: 6, label: 'Down to the platform' },
        { to: 'riverside', travelMinutes: 14, label: 'The riverside' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
    },
    {
      id: 'voss_tower',
      name: 'The Far Building',
      shortName: 'Voss Tower',
      description:
        'Newer than Orpheum and better staffed. A doorman who works a rota, a service entrance on the north side, and a fire stair that is alarmed at every floor except the eleventh.',
      artDirection:
        'Modern glass residential tower base at night, lit lobby visible through the frontage, a uniformed doorman, service alley to one side. Sleek and hard to enter.',
      connections: [
        { to: 'the_avenue', travelMinutes: 3, label: 'Back across' },
        { to: 'voss_penthouse', travelMinutes: 4, lockedByFlag: 'penthouse_access', label: 'Up' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
    },
    {
      id: 'voss_penthouse',
      name: 'The Penthouse',
      shortName: 'Penthouse',
      description:
        'Eleven floors up and the whole of the avenue in one window. Books in three languages, a grand piano nobody plays, and a balcony where at 01:16 a woman in a white shirt waved at a lens she should not have known was there.',
      artDirection:
        'Elegant modern penthouse interior at night, floor-to-ceiling glass over a city avenue, warm lamps, bookshelves, a piano, a balcony door standing open. Poised and slightly staged.',
      connections: [
        { to: 'voss_tower', travelMinutes: 4, label: 'Back down' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: 4 },
      takeableItems: [
        { itemId: 'voss_memoranda', qty: 1, ownerId: 'selene', aka: ['memos', 'the memoranda', 'her paperwork', 'the letters'] },
        { itemId: 'palisade_drive', qty: 1, ownerId: 'selene', aka: ['archive', 'the drive', 'palisade', 'the data'] },
      ],
    },
    {
      id: 'orpheum_roof',
      name: 'The Orpheum Roof',
      shortName: 'The Roof',
      description:
        'Plant machinery, a parapet, and a line of sight into the penthouse that the flat does not have. It is also the only place in the operation where the two of you can talk without the flat hearing it.',
      artDirection:
        'Rooftop of an old city tower at night in rain, air handling units, a low parapet, a facing tower lit up across the street. Exposed, loud with weather, private.',
      connections: [{ to: 'orpheum_corridor', travelMinutes: 4, label: 'Back down the riser' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
    },
    {
      id: 'the_subway',
      name: 'Halberd Street Platform',
      shortName: 'The Platform',
      description:
        'Two lines, four exits, and a service every eleven minutes until one in the morning. The best place in Veyra to lose somebody, which is why everybody uses it and why it is watched.',
      artDirection:
        'Underground metro platform late at night, tiled walls, a scattering of passengers, tunnel mouth dark, departure board. Fluorescent, echoing, transitional.',
      connections: [
        { to: 'the_avenue', travelMinutes: 6, label: 'Up to the avenue' },
        { to: 'riverside', travelMinutes: 8, label: 'Two stops to the river' },
        { to: 'directorate', travelMinutes: 20, lockedByFlag: 'knows:the_office', label: 'The line to the ministry district' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
    },
    {
      id: 'riverside',
      name: 'The Riverside',
      shortName: 'Riverside',
      description:
        'Old wharves converted into nothing in particular, a footbridge, and the third bollard from the east end with a cavity behind the plate. Glass uses it. So, it turns out, does somebody else.',
      artDirection:
        'Converted riverside wharf district at night, dark water, a lit footbridge, iron bollards, warehouse frontages, fog off the river. Deserted and beautiful.',
      connections: [
        { to: 'the_avenue', travelMinutes: 14, label: 'Back to Kellis Avenue' },
        { to: 'the_subway', travelMinutes: 8, label: 'The platform' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: -2, y: 3 },
    },
    {
      id: 'directorate',
      name: 'Directorate Nine',
      shortName: 'The Office',
      description:
        'Two floors under a building that is legally a records agency. Halden’s office has no window and a chair positioned so that whoever sits in it faces the door.',
      artDirection:
        'Windowless underground government office, fluorescent tubes, grey filing, one desk with two chairs, a heavy door. Institutional and airless.',
      connections: [{ to: 'the_subway', travelMinutes: 20, label: 'Back to the platform' }],
      discoveredByDefault: false,
      mapPosition: { x: -2, y: 4 },
    },
  ],
  factions: [
    {
      id: 'faction_directorate',
      name: 'Directorate Nine',
      description: 'The service the player works for, which does not exist, and which is currently running an internal purge dressed as a leak investigation.',
      startingReputation: 20,
      ranks: [
        { atReputation: -100, label: 'Burned' },
        { atReputation: -30, label: 'Under review' },
        { atReputation: 0, label: 'On the roster' },
        { atReputation: 40, label: 'Trusted with things' },
        { atReputation: 70, label: 'Halden’s own' },
      ],
      enemies: ['faction_voss'],
    },
    {
      id: 'faction_voss',
      name: 'Selene’s Side',
      description: 'Selene Voss, two people in the ministry who have not yet been identified, and whichever of the three Glass identities is currently telling the truth.',
      startingReputation: 0,
      ranks: [
        { atReputation: -100, label: 'A hand on the trigger' },
        { atReputation: -30, label: 'A problem to route around' },
        { atReputation: 0, label: 'An unknown' },
        { atReputation: 35, label: 'Worth talking to' },
        { atReputation: 65, label: 'The person she is counting on' },
      ],
      enemies: ['faction_directorate'],
    },
    {
      id: 'faction_veyra',
      name: 'Veyra',
      description: 'The press, the ministry, and two million people who have never heard of PALISADE and are all in it.',
      startingReputation: 0,
      ranks: [
        { atReputation: -100, label: 'A name in a case file' },
        { atReputation: 0, label: 'Nobody' },
        { atReputation: 30, label: 'A source somebody trusts' },
        { atReputation: 60, label: 'The reason it came out' },
      ],
    },
  ],
  characters: [
    {
      id: 'mara',
      name: 'Mara Ellison',
      role: 'Your partner for seven nights. Four long-duration operations, no failures on paper',
      cardBlurb:
        'She has done this until it stopped being interesting, and she will run the flat, the rota and you unless you give her a reason not to. She is also carrying a sealed order she has not mentioned.',
      pronouns: 'she/her',
      publicTraits: ['Clipped', 'Extremely observant', 'Allergic to improvisation'],
      hiddenDrives: ['She wants enough leverage to leave field work by choosing to, rather than by being taken off it'],
      values: ['Doing it properly', 'Everybody coming out'],
      fears: ['Being responsible for another partner dying'],
      socialStyle: 'Says the operational thing first and the human thing about six hours later, usually at four in the morning.',
      boundaries: ['Will not stand in front of the glass', 'Will not discuss Sandrine'],
      goals: ['Run seven clean nights', 'Find out what the operation is actually for before it finishes'],
      secrets: [
        {
          id: 'mara_contingency',
          fact: 'The envelope in the black case is a contingency authorisation with her countersignature on it. If Voss attempts to leave Veyra with the archive, Mara is authorised to kill her.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells the player herself on the roof, once she has decided they are not going to file it, and not one hour before.',
        },
        {
          id: 'mara_sandrine',
          fact: 'Her last partner, Sandrine Achterberg, died in a stairwell in the ministry district because Mara followed an order she had already worked out was wrong.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only after the player has disobeyed something in front of her and it worked.',
        },
      ],
      speechStyle:
        'Short declaratives. Almost no filler. Unexpectedly funny in private and only in private — the jokes are dry, arrive late, and are never repeated.',
      topics: ['the operation', 'the black case', 'Selene Voss', 'Director Halden', 'her last partner', 'whose turn it is on the glass'],
      voiceSamples: [
        'Lock the door. And do not stand in front of the glass.',
        'She waved. Write down that she waved, at 01:16, and then we will decide what it means at a sensible hour.',
        'I have done four of these. Two of them were boring. You want this one to be boring.',
        'That is the third night the same car has been on the avenue and the plates are consecutive. Somebody bought them in a batch.',
      ],
      appearance: 'Twenty-seven, dark chestnut hair cut level with her jaw, grey-green eyes, lean, black fitted turtleneck and a covert jacket she does not take off indoors.',
      visualHook: 'A jaw-length chestnut bob she tucks behind one ear before she says anything difficult.',
      silhouette: 'Seated, elbows on knees, one shoulder toward the window and never square to it.',
      artSeed: 'window7-mara-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'alarmed', 'exhausted'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'apt_7c', activity: 'on the glass, logging' },
        { startMinute: 360, endMinute: 420, locationId: 'apt_7c', activity: 'filing the 06:00 and making the coffee' },
        { startMinute: 420, endMinute: 780, locationId: 'apt_7c', activity: 'asleep in the chair by the door' },
        { startMinute: 780, endMinute: 1080, locationId: 'apt_7c', activity: 'equipment, inventory, and terrible television with the subtitles on' },
        { startMinute: 1080, endMinute: 1440, locationId: 'apt_7c', activity: 'back on the glass' },
      ],
      homeLocationId: 'apt_7c',
      knowledgeScope: ['directorate', 'the_operation', 'apt_7c', 'palisade', 'veyra', 'the_case'],
      startingRelationship: { trust: 15, affection: 0, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'mara_talks',
          label: 'She tells you what she actually thinks of the briefing',
          kind: 'TRUST',
          requires: { trust: 30 },
        },
        {
          id: 'mara_shows_the_order',
          label: 'She shows you the envelope',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:palisade'] },
        },
        {
          id: 'mara_romance',
          label: 'Whatever this is, it stops being professional',
          kind: 'ROMANCE',
          requires: { trust: 50, affection: 45 },
        },
      ],
      attributes: { might: 13, agility: 15, mind: 16, presence: 13, resolve: 16, arcana: 3 },
      companion: null,
      scouting: null,
      combatant: { health: 34, defenseDc: 15, damage: 7, tags: ['trained', 'armed'] },
    },
    {
      id: 'selene',
      name: 'Dr Selene Voss',
      role: 'The target. Cybernetics researcher, policy adviser, and the person who built the thing she is trying to destroy',
      cardBlurb:
        'She waved at a camera she had no way of knowing about, and every conversation since has been one she is enjoying more than you are.',
      pronouns: 'she/her',
      publicTraits: ['Precise', 'Composed under everything', 'Lightly amused'],
      hiddenDrives: ['She is trying to make the thing she is proudest of into the thing she is remembered for stopping'],
      values: ['Evidence over allegation', 'Finishing what she started'],
      fears: ['The archive surviving her and being used by somebody with fewer objections'],
      socialStyle: 'Answers a question you did not ask, correctly, and waits for you to notice which one it was.',
      boundaries: ['Will not hand over the archive without knowing where it goes', 'Will not run without the memoranda'],
      goals: ['Get PALISADE and the paper trail out of Veyra together', 'Find out which of the three Glass identities is the one selling her'],
      secrets: [
        {
          id: 'selene_knows_you',
          fact: 'She had the player’s service history four days before the operation began. She knows which of their previous assignments went badly and why.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it lightly, as a courtesy, the first time the player tries to establish who they are.',
        },
        {
          id: 'selene_built_it',
          fact: 'She built the scoring model that became PALISADE, and she was proud of it, and she says so without hedging.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Volunteered early, if the player is honest with her — it is the part she refuses to be coy about.',
        },
      ],
      speechStyle:
        'Exact and unhurried. Complete sentences, faint dry humour, and a habit of putting the qualifying clause first so the point lands last.',
      topics: ['PALISADE', 'the ministry', 'Director Halden', 'why she waved', 'Glass', 'what she built'],
      voiceSamples: [
        'You have been in that flat for two days. I assume the tall one organised the cupboard.',
        'I did build it. I would like that on the record before anybody tells you I did not.',
        'Ask me the question you were sent to ask. I will answer it properly, and then I will show you why it is the wrong question.',
        'There is a lift on the north side that the doorman does not watch after two. I mention it as a courtesy.',
      ],
      appearance: 'Thirty, silver-blonde hair worn straight and short, white shirts, dark coats, the stillness of somebody who has decided not to hurry.',
      visualHook: 'Silver-blonde hair and a plain white shirt, worn at every hour, including on a balcony at one in the morning.',
      silhouette: 'Upright and unhurried, one hand on a balcony rail, entirely lit from behind.',
      artSeed: 'window7-selene-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'direct', 'afraid'],
      schedule: [
        { startMinute: 0, endMinute: 120, locationId: 'voss_penthouse', activity: 'working, lamp on, curtains open' },
        { startMinute: 120, endMinute: 480, locationId: 'voss_penthouse', activity: 'asleep' },
        { startMinute: 480, endMinute: 1020, locationId: 'voss_tower', activity: 'at the ministry, or being seen to be' },
        { startMinute: 1020, endMinute: 1260, locationId: 'voss_penthouse', activity: 'home, and visible from the avenue on purpose' },
        { startMinute: 1260, endMinute: 1440, locationId: 'voss_penthouse', activity: 'on the balcony at 01:16' },
      ],
      homeLocationId: 'voss_penthouse',
      knowledgeScope: ['palisade', 'the_ministry', 'directorate', 'glass', 'veyra', 'the_operation'],
      startingRelationship: { trust: 0, affection: 0, respect: 15, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'selene_talks',
          label: 'She tells you what PALISADE actually is',
          kind: 'TRUST',
          requires: { trust: 25, flagsSet: ['made_contact'] },
        },
        {
          id: 'selene_trusts_you',
          label: 'She lets you near the archive',
          kind: 'ALLIANCE',
          requires: { trust: 50, hasItems: ['voss_memoranda'] },
        },
        {
          id: 'selene_romance',
          label: 'She stops treating you as an asset',
          kind: 'ROMANCE',
          requires: { trust: 45, affection: 45 },
        },
      ],
      attributes: { might: 9, agility: 11, mind: 18, presence: 16, resolve: 16, arcana: 3 },
      companion: null,
      scouting: null,
      combatant: { health: 20, defenseDc: 11, damage: 3, tags: ['civilian'] },
    },
    {
      id: 'halden',
      name: 'Director Elias Halden',
      role: 'Your handler. Twenty-nine years in the service and every one of them deniable',
      cardBlurb:
        'He asks after your health and means it, files everything you say in the same conversation, and has never once raised his voice at you. He also authorised the thing he is sending you to look at.',
      pronouns: 'he/him',
      publicTraits: ['Paternal', 'Endlessly patient', 'Never explicitly threatening'],
      hiddenDrives: ['He believes he has prevented eleven deaths with PALISADE and cannot say so to anybody, ever'],
      values: ['The service', 'Outcomes over principle'],
      fears: ['A public inquiry with his signature on the exhibits'],
      socialStyle: 'Asks after your health, means it, and files everything you say in the same conversation.',
      boundaries: ['Will not put an order in writing', 'Will not be rushed on a phone call'],
      goals: ['Contain PALISADE', 'Identify every internal collaborator, including the player if they are one'],
      secrets: [
        {
          id: 'halden_signed',
          fact: 'He countersigned the memorandum authorising domestic deployment. His name is on the last of the fourteen months of correspondence Selene kept.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The player reads it in the memoranda before he would ever say it.',
        },
        {
          id: 'halden_the_purge',
          fact: 'The operation is not a surveillance job. It is a test: Selene is bait, and what he is watching is which of his own people talks to her.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it almost warmly, once the player has been on the wrong side of the avenue and he already knows.',
        },
      ],
      speechStyle:
        'Warm, unhurried, avuncular. Sentences that accumulate three or four clauses of reassurance and then stop dead on a short question he genuinely wants answered. The question is the whole call; everything before it is upholstery.',
      topics: ['the operation', 'your reports', 'Mara Ellison', 'Selene Voss', 'the service'],
      voiceSamples: [
        'I have been turning that balcony business over since Tuesday, and the four hours between it and your report, and I have decided it means nothing whatsoever. What is in the case?',
        'There is a version of this week where everybody goes home and there is a version where I write to somebody’s mother, and the distance between the two is about four sentences of yours. Which am I getting?',
        'Ellison is very good, she has never once given me cause to doubt her, and she is carrying something I would rather you heard from me than found in a wardrobe. Are you going to open it?',
        'Nobody is in trouble. That is a sentence I get to say now.',
      ],
      appearance: 'Sixty-one, grey, well-kept, cardigan under a suit jacket, reading glasses pushed up and never used.',
      visualHook: 'A cardigan worn under a suit jacket, in an office with no window.',
      silhouette: 'Seated, hands folded on a bare desk, entirely still.',
      artSeed: 'window7-halden-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'cold'],
      schedule: [
        { startMinute: 0, endMinute: 400, locationId: 'directorate', activity: 'asleep on the office couch, which he has never once admitted to' },
        { startMinute: 400, endMinute: 540, locationId: 'the_subway', activity: 'coming in on the Halberd Street line like anybody else' },
        { startMinute: 540, endMinute: 1140, locationId: 'directorate', activity: 'at the desk, taking calls he schedules a day in advance' },
        { startMinute: 1140, endMinute: 1260, locationId: 'the_avenue', activity: 'walking the avenue once a day, at no fixed hour, looking at nothing' },
        { startMinute: 1260, endMinute: 1440, locationId: 'directorate', activity: 'reading the day’s reports in the order they were filed' },
      ],
      homeLocationId: 'directorate',
      knowledgeScope: ['directorate', 'palisade', 'the_operation', 'glass', 'veyra'],
      startingRelationship: { trust: 25, affection: 0, respect: 15, fear: 10, rivalry: 0 },
      gates: [
        {
          id: 'halden_says_it',
          label: 'He tells you what the operation is really for',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['knows:palisade'] },
        },
      ],
      attributes: { might: 8, agility: 8, mind: 17, presence: 17, resolve: 17, arcana: 3 },
      companion: null,
      scouting: null,
      combatant: { health: 18, defenseDc: 11, damage: 4, tags: ['civilian', 'armed'] },
    },
    {
      id: 'juno',
      name: 'Juno Vale',
      role: 'Orpheum Tower concierge, and the only person on this avenue who knows everybody’s business',
      cardBlurb:
        'He runs the desk, the door, the parcels and the access logs, and he will sell any of them to you at a price he considers extremely reasonable.',
      pronouns: 'he/him',
      publicTraits: ['Charming', 'Cheerfully mercenary', 'Never forgets a face'],
      hiddenDrives: ['He is selling to both sides because he has worked out that being useful to only one of them is how concierges end up in rivers'],
      values: ['Getting paid', 'Everybody staying calm'],
      fears: ['Being the only one who knew something'],
      socialStyle: 'Greets you like a regular from the first night, and prices accordingly.',
      boundaries: ['Will not let anybody through the penthouse lift', 'Will not lie to a police officer'],
      goals: ['Sell the same information three times', 'Be somewhere else when it happens'],
      secrets: [
        {
          id: 'juno_two_sides',
          fact: 'He has sold the Orpheum access logs to Directorate internal security as well as to the player, and the Directorate copy is nine weeks longer.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says so cheerfully the moment the player offers more than the other buyer.',
        },
      ],
      speechStyle: 'Fast, warm, transactional. Puts a price at the end of a sentence as though it were punctuation.',
      topics: ['the building', 'who comes and goes', 'the penthouse lift', 'the access logs', 'the other people asking'],
      voiceSamples: [
        'Seventh floor. Nice and quiet up there. Two of you, is it? Two of you.',
        'I can get you nine weeks of swipes. I can get you eleven, but eleven is a different conversation.',
        'You are the third person to ask me about that lift this month, and the other two were much better dressed.',
      ],
      appearance: 'Forty-four, immaculate in a building uniform he has had taken in, a pen behind one ear he never writes with.',
      visualHook: 'A pen tucked behind one ear that never comes out.',
      silhouette: 'Leaning on a marble desk on both forearms, always mid-sentence.',
      artSeed: 'window7-juno-01',
      portrait: null,
      expressions: ['neutral', 'delighted', 'nervous'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'orpheum_lobby', activity: 'nights on the desk' },
        { startMinute: 360, endMinute: 480, locationId: 'the_avenue', activity: 'smoking outside, handing over' },
        { startMinute: 480, endMinute: 1200, locationId: 'orpheum_lobby', activity: 'off, notionally, and behind the desk anyway' },
        { startMinute: 1200, endMinute: 1440, locationId: 'orpheum_lobby', activity: 'nights on the desk' },
      ],
      homeLocationId: 'orpheum_lobby',
      knowledgeScope: ['orpheum', 'veyra', 'the_avenue', 'the_operation'],
      startingRelationship: { trust: 10, affection: 5, respect: 0, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'juno_sells_you_the_logs',
          label: 'He prints you the access log',
          kind: 'ALLIANCE',
          requires: { trust: 20 },
        },
        {
          id: 'juno_tells_you_who_else',
          label: 'He tells you who else has been asking',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
      ],
      attributes: { might: 10, agility: 10, mind: 14, presence: 16, resolve: 11, arcana: 3 },
      companion: null,
      scouting: null,
      combatant: { health: 16, defenseDc: 10, damage: 3, tags: ['civilian'] },
    },
    {
      id: 'ash',
      name: 'Tobin Ash',
      role: 'Directorate internal security. He is not on this operation and he is on this street',
      cardBlurb:
        'He investigates people like you for a living, he is polite about it, and the first time you see him he will already know how long you have been in 7C.',
      pronouns: 'he/him',
      publicTraits: ['Methodical', 'Courteous', 'Impossible to hurry'],
      hiddenDrives: ['He is one of the three people who share the Glass identity, and he is the one telling the truth'],
      values: ['The record being accurate', 'People being told what they are accused of'],
      fears: ['Having been right about the wrong person'],
      socialStyle: 'Introduces himself properly, states his purpose, and waits — which is far more frightening than the alternative.',
      boundaries: ['Will not detain anybody without telling them why', 'Will not lie in a written report'],
      goals: ['Establish who inside Directorate Nine is helping Voss', 'Get the domestic deployment onto a record somebody outside the service will read'],
      secrets: [
        {
          id: 'ash_is_glass',
          fact: 'He is one of the three Glass identities. He sent YOU ARE WATCHING THE WRONG APARTMENT, and he meant the flat behind the player, not the one in front.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only after the player has worked out that Glass contradicts itself, and says so to his face.',
        },
      ],
      speechStyle:
        'Formal and unhurried. States his procedure out loud before he follows it, cites documents by length and timestamp rather than by content, and hands you a way to refuse before he asks for anything.',
      topics: ['the access logs', 'the operation', 'Director Halden', 'Glass', 'what you filed'],
      voiceSamples: [
        'My name is Tobin Ash, I am internal security, and before we go further you can decline to speak to me. I will record that you declined. That is all it will say.',
        'Your report for Tuesday runs to two hundred and eleven words and the balcony is not in any of them. I am giving you the chance to add to it before I file mine.',
        'I have read every word you have written since you landed. I am telling you that because you are entitled to know it, not to make you uncomfortable.',
        'If I am wrong about you I will put that in writing and sign it. I have done it twice.',
      ],
      appearance: 'Fifty, tall, a raincoat that has been rained on for a decade, a document wallet he carries like a shield.',
      visualHook: 'A leather document wallet held against his chest with both hands.',
      silhouette: 'Standing very straight in a doorway, coat still on, not coming further in.',
      artSeed: 'window7-ash-01',
      portrait: null,
      expressions: ['neutral', 'attentive', 'sorry'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'the_avenue', activity: 'in a car with the lights off' },
        { startMinute: 300, endMinute: 600, locationId: 'directorate', activity: 'writing it up' },
        { startMinute: 600, endMinute: 1080, locationId: 'directorate', activity: 'reading everybody’s reports' },
        { startMinute: 1080, endMinute: 1260, locationId: 'riverside', activity: 'at the third bollard' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_avenue', activity: 'back in the car' },
      ],
      homeLocationId: 'directorate',
      knowledgeScope: ['directorate', 'glass', 'palisade', 'the_operation', 'veyra'],
      startingRelationship: { trust: 0, affection: 0, respect: 5, fear: 15, rivalry: 5 },
      gates: [
        {
          id: 'ash_admits_it',
          label: 'He admits which of the messages were his',
          kind: 'TRUST',
          requires: { trust: 35, flagsSet: ['knows:glass_is_three'] },
        },
      ],
      attributes: { might: 12, agility: 10, mind: 17, presence: 14, resolve: 16, arcana: 3 },
      companion: null,
      scouting: null,
      combatant: { health: 28, defenseDc: 13, damage: 6, tags: ['trained', 'armed'] },
    },
  ],
  quests: [
    {
      id: 'q_seven_nights',
      title: 'Seven Nights',
      summary: 'Watch the penthouse, log the visitors, file at six, make no contact. It survives about ninety minutes.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['mara', 'selene', 'halden'],
      involvedLocationIds: ['apt_7c', 'voss_penthouse'],
      knownRewardCopy: 'Seven clean nights and a flight home, if anybody still wants that by Thursday.',
      steps: [
        {
          id: 'the_first_night',
          playerCopy: 'Get through the first night in Apartment 7C.',
          directorNotes:
            'Mara runs the flat and expects to. What varies is whether the player takes the brief seriously, tests it, or breaks it immediately. All three are viable openings and none of them ends the operation.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'worked_it',
              label: 'Take a shift on the glass',
              predicate: { flagsSet: ['used:work_the_glass'] },
              setsFlags: ['saw_the_wave', 'clean_operation'],
              closesFlags: [],
            },
            {
              routeId: 'went_through_the_flat',
              label: 'Find out what is in the room with you',
              predicate: { flagsSet: ['used:sweep_the_flat'] },
              setsFlags: ['saw_the_wave', 'knows:the_case', 'clean_operation'],
              closesFlags: [],
            },
            {
              routeId: 'rang_her',
              label: 'Ring the penthouse on night one',
              predicate: { flagsSet: ['used:make_contact'] },
              setsFlags: ['made_contact', 'broke_the_brief'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['night_one'],
            abilities: [],
            reputation: [{ factionId: 'faction_directorate', amount: 5 }],
          },
        },
        {
          id: 'wrong_apartment',
          playerCopy: 'Work out what Glass meant by the wrong apartment.',
          directorNotes:
            'Glass meant 7C. Somebody in Directorate Nine put the player and Mara in that flat to see who they talked to, and the surveillance is pointed both ways. The three routes find that out from three incompatible directions.',
          enterWhen: { flagsSet: ['night_one'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'the_logs',
              label: 'Buy the building’s access log',
              predicate: { hasItems: ['juno_log'] },
              setsFlags: ['knows:the_office', 'knows:glass_is_three'],
              closesFlags: [],
            },
            {
              routeId: 'ask_her',
              label: 'Ask Selene what she meant by waving',
              predicate: { flagsSet: ['made_contact'], minRelationship: [{ characterId: 'selene', dimension: 'trust', value: 25 }] },
              setsFlags: ['knows:palisade', 'knows:the_office'],
              closesFlags: [],
            },
            {
              routeId: 'ask_ash',
              label: 'Let internal security talk to you',
              predicate: { flagsSet: ['spoke:ash'] },
              setsFlags: ['knows:glass_is_three', 'ash_has_your_file'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['knows:watched_both_ways'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_middle_nights',
          playerCopy: 'Get through the nights between knowing and deciding.',
          directorNotes:
            'Nights three, four and five. Nothing forces itself on the player here and that is the point — this is the stretch where the flat is small, the rota is real, and whatever the two of them are to each other is settled by four hundred hours of nothing happening. Every route is a different thing to have spent the week doing, and each one changes who is standing next to the player when it matters.',
          enterWhen: { flagsSet: ['knows:watched_both_ways'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kept_it_professional',
              label: 'Work the rota and file clean',
              predicate: { flagsSet: ['used:file_the_report'], minRelationship: [{ characterId: 'mara', dimension: 'respect', value: 35 }] },
              setsFlags: ['week_was_professional'],
              closesFlags: [],
            },
            {
              routeId: 'got_to_know_her',
              label: 'Spend the small hours on the roof',
              predicate: { flagsSet: ['visited:orpheum_roof'], minRelationship: [{ characterId: 'mara', dimension: 'trust', value: 40 }] },
              setsFlags: ['week_was_personal', 'mara_talks_to_you'],
              closesFlags: [],
            },
            {
              routeId: 'worked_the_street',
              label: 'Stop watching and start following',
              predicate: { flagsSet: ['used:run_a_tail'] },
              setsFlags: ['week_was_yours', 'knows:the_car'],
              closesFlags: [],
            },
            {
              routeId: 'went_looking_for_glass',
              label: 'Work out who has been messaging you',
              predicate: { flagsSet: ['knows:glass_is_three'] },
              setsFlags: ['week_was_yours', 'chasing_glass'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 130,
            items: [],
            flags: ['knows:the_shape_of_it'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_archive_moves',
          playerCopy: 'Decide what happens to PALISADE.',
          directorNotes:
            'Every route here is a real position somebody in this story holds, and each one makes an enemy of at least two of the others. The archive is a physical object in a coat pocket; whoever has it at the end of the seventh night is what this was about.',
          enterWhen: { flagsSet: ['knows:the_shape_of_it'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'bring_it_in',
              label: 'Bring it in to Halden',
              predicate: { hasItems: ['palisade_drive'], minRelationship: [{ characterId: 'halden', dimension: 'trust', value: 40 }] },
              setsFlags: ['archive_to_directorate'],
              closesFlags: ['archive_destroyed', 'archive_public'],
            },
            {
              routeId: 'put_it_out',
              label: 'Publish it',
              predicate: { flagsSet: ['used:publish_it'] },
              setsFlags: ['archive_public', 'palisade_exposed'],
              closesFlags: ['archive_to_directorate', 'archive_destroyed'],
            },
            {
              routeId: 'destroy_it',
              label: 'Destroy it',
              predicate: { flagsSet: ['used:burn_the_archive'] },
              setsFlags: ['archive_destroyed'],
              closesFlags: ['archive_to_directorate', 'archive_public'],
            },
            {
              routeId: 'keep_it',
              label: 'Keep it',
              predicate: { hasItems: ['palisade_drive'], flagsSet: ['broke_the_brief'] },
              setsFlags: ['archive_is_yours'],
              closesFlags: ['archive_destroyed'],
            },
          ],
          rewards: {
            xp: 220,
            items: [],
            flags: ['the_archive_settled'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_case',
      title: 'What Is In The Case',
      summary: 'Aluminium, sealed, in the wardrobe, and the only thing in the flat neither of you has any reason to touch.',
      kind: 'MAIN',
      involvedCharacterIds: ['mara', 'halden'],
      involvedLocationIds: ['apt_7c', 'orpheum_roof'],
      knownRewardCopy: 'Whatever your partner has been carrying since before you met her.',
      discoverWhen: { flagsSet: ['night_one'] },
      steps: [
        {
          id: 'find_out',
          playerCopy: 'Find out what Mara Ellison is carrying.',
          directorNotes:
            'Being told and finding out are different scenes and lead to different partners. Opening the seal behind her back is not a betrayal she will forgive quickly, and it is a completely reasonable thing for an operative to do.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_tells_you',
              label: 'She tells you on the roof',
              predicate: { minRelationship: [{ characterId: 'mara', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:the_order', 'mara_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'break_the_seal',
              label: 'Open it yourself',
              predicate: { flagsSet: ['used:open_the_case'] },
              setsFlags: ['knows:the_order', 'opened_her_case'],
              closesFlags: ['mara_told_you'],
            },
            {
              routeId: 'halden_says',
              label: 'Get it out of Halden',
              predicate: { minRelationship: [{ characterId: 'halden', dimension: 'trust', value: 40 }] },
              setsFlags: ['knows:the_order', 'halden_told_you'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['knows:the_case'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'whether_she_uses_it',
          playerCopy: 'Find out whether Mara will follow the order.',
          directorNotes:
            'The whole point of the character. She has followed a wrong order before and a person died. Whether she does it again is genuinely open and depends on what the player has been in the flat with her — not on being persuaded in one conversation.',
          enterWhen: { flagsSet: ['knows:the_order'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_refuses',
              label: 'She puts the envelope down',
              predicate: { minRelationship: [{ characterId: 'mara', dimension: 'trust', value: 65 }] },
              setsFlags: ['mara_refused_the_order'],
              closesFlags: ['mara_followed_the_order'],
            },
            {
              routeId: 'she_does_it',
              label: 'She follows it',
              predicate: { flagsSet: ['opened_her_case'], flagsUnset: ['mara_refused_the_order'] },
              setsFlags: ['mara_followed_the_order', 'dead:selene'],
              closesFlags: ['mara_refused_the_order'],
            },
            {
              routeId: 'you_take_it_off_her',
              label: 'Take the decision off her',
              predicate: { hasItems: ['the_black_case'], flagsSet: ['broke_the_brief'] },
              setsFlags: ['you_took_the_order'],
              closesFlags: ['mara_followed_the_order'],
            },
            {
              routeId: 'the_seventh_morning',
              label: 'Let the week answer it',
              predicate: { flagsSet: ['seventh_night'] },
              setsFlags: ['mara_ran_out_of_week'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 200, items: [], flags: ['the_order_settled'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_selene',
      title: 'Why She Waved',
      summary: 'She looked into a lens she had no way of knowing about, and she has been ahead of you ever since.',
      kind: 'SIDE',
      involvedCharacterIds: ['selene', 'juno'],
      involvedLocationIds: ['voss_penthouse', 'riverside', 'the_avenue'],
      knownRewardCopy: 'Fourteen months of correspondence, and an idea of what this operation is actually for.',
      discoverWhen: { flagsSet: ['saw_the_wave'] },
      steps: [
        {
          id: 'get_to_her',
          playerCopy: 'Get within speaking distance of Selene Voss.',
          directorNotes:
            'She has made herself reachable on purpose and will say so. The interesting question is what the player does about Mara — going without telling her is a decision with a cost, and telling her is a different one.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'the_lift',
              label: 'Buy your way up the north lift',
              predicate: { hasItems: ['juno_log'] },
              setsFlags: ['penthouse_access', 'made_contact', 'broke_the_brief'],
              closesFlags: [],
            },
            {
              routeId: 'over_the_roof',
              label: 'Cross at the top, with Mara covering it',
              predicate: {
                flagsSet: ['visited:orpheum_roof'],
                minRelationship: [{ characterId: 'mara', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['penthouse_access', 'made_contact', 'broke_the_brief', 'mara_covered_for_you'],
              closesFlags: [],
            },
            {
              routeId: 'the_drop',
              label: 'Work the riverside drop',
              predicate: { flagsSet: ['visited:riverside'] },
              setsFlags: ['made_contact', 'broke_the_brief', 'knows:glass_is_three'],
              closesFlags: [],
            },
            {
              routeId: 'she_comes_to_you',
              label: 'Let her come to you',
              predicate: { flagsSet: ['used:make_contact'] },
              setsFlags: ['made_contact', 'broke_the_brief'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['reached_her'],
            abilities: [],
            reputation: [{ factionId: 'faction_voss', amount: 5 }],
          },
        },
        {
          id: 'what_she_is_asking',
          playerCopy: 'Find out what Selene Voss wants from you.',
          directorNotes:
            'She does not want rescuing and she does not want a convert. She wants a witness with a service record, because a document produced by a defector is a defector’s document and one produced by the officer sent to watch her is evidence. Whether the player agrees to be that, refuses, or takes the paperwork and leaves is the whole of this step, and all three are real answers.',
          enterWhen: { flagsSet: ['reached_her'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_hands_it_over',
              label: 'Let her put it in your hands',
              predicate: { minRelationship: [{ characterId: 'selene', dimension: 'trust', value: 35 }] },
              setsFlags: ['took_the_memoranda', 'she_chose_you'],
              closesFlags: [],
            },
            {
              routeId: 'you_take_it',
              label: 'Take it without agreeing to anything',
              predicate: { flagsSet: ['penthouse_access'] },
              setsFlags: ['took_the_memoranda'],
              closesFlags: ['she_chose_you'],
            },
            {
              routeId: 'you_report_her',
              label: 'Put all of it in your six o’clock',
              predicate: { flagsSet: ['used:file_the_report'], minRelationship: [{ characterId: 'halden', dimension: 'trust', value: 35 }] },
              setsFlags: ['reported_the_contact'],
              closesFlags: ['she_chose_you'],
            },
          ],
          rewards: {
            xp: 140,
            items: [{ itemId: 'voss_memoranda', qty: 1 }],
            flags: ['knows:palisade'],
            abilities: ['burn_the_archive', 'publish_it'],
            reputation: [{ factionId: 'faction_voss', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_glass',
      title: 'Who Is Glass',
      summary: 'Four words on a handset that nobody has the number for, from an identity that keeps contradicting itself.',
      kind: 'LEAD',
      involvedCharacterIds: ['ash', 'halden', 'selene'],
      involvedLocationIds: ['apt_7c', 'the_subway', 'directorate'],
      knownRewardCopy: 'A name, and the reason the messages have never quite agreed with each other.',
      discoverWhen: { flagsSet: ['knows:glass'] },
      steps: [
        {
          id: 'the_contradiction',
          playerCopy: 'Work out why Glass keeps changing its mind.',
          directorNotes:
            'Because Glass is three people using one identity, and they do not agree about what the operation is. The player does not need to reach the answer through any particular door — the messages themselves are enough if somebody actually reads them side by side.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_them_together',
              label: 'Put every message in order and read it',
              predicate: { flagsSet: ['used:sweep_the_flat'], hasItems: ['handset'] },
              setsFlags: ['knows:glass_is_three'],
              closesFlags: [],
            },
            {
              routeId: 'ash_tells_you',
              label: 'Ask internal security directly',
              predicate: { minRelationship: [{ characterId: 'ash', dimension: 'trust', value: 35 }] },
              setsFlags: ['knows:glass_is_three', 'ash_owns_you_one'],
              closesFlags: [],
            },
            {
              routeId: 'she_tells_you',
              label: 'Ask the target who has been writing to you',
              predicate: { flagsSet: ['made_contact'], minRelationship: [{ characterId: 'selene', dimension: 'trust', value: 30 }] },
              setsFlags: ['knows:glass_is_three'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 120, items: [], flags: ['knows:glass_contradicts'], abilities: [], reputation: [] },
        },
        {
          id: 'which_one_wrote_the_first_message',
          playerCopy: 'Find out which of them sent YOU ARE WATCHING THE WRONG APARTMENT.',
          directorNotes:
            'Tobin Ash sent it, and he meant the flat the player is sitting in rather than the one across the road. He will confirm it to somebody who has worked it out and says so to his face, and he will not volunteer it to anybody else, because volunteering it is the one thing that would end his own career rather than somebody else’s.',
          enterWhen: { flagsSet: ['knows:glass_contradicts'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'to_his_face',
              label: 'Say it to Ash and watch what he does',
              predicate: { flagsSet: ['spoke:ash'], minRelationship: [{ characterId: 'ash', dimension: 'trust', value: 35 }] },
              setsFlags: ['knows:ash_is_glass', 'ash_is_with_you'],
              closesFlags: [],
            },
            {
              routeId: 'from_the_logs',
              label: 'Prove it out of the building log',
              predicate: { hasItems: ['juno_log'] },
              setsFlags: ['knows:ash_is_glass'],
              closesFlags: ['ash_is_with_you'],
            },
          ],
          rewards: { xp: 160, items: [], flags: ['knows:who_glass_is'], abilities: [], reputation: [] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_wave',
      atWorldMinute: 25 * 60 + 16,
      locationId: 'apt_7c',
      publicCopy:
        'At 01:16 the penthouse balcony door opens. Dr Selene Voss comes out in a white shirt with a glass in one hand, crosses to the rail, looks across four lanes directly into the lens, and raises the other hand.',
      directorNotes:
        'Ninety seconds later the player’s handset receives four words from an identity called Glass: YOU ARE WATCHING THE WRONG APARTMENT. Mara will want it logged and discussed at a sensible hour. This fires on night one whether or not anybody is at the glass.',
      setsFlags: ['saw_the_wave', 'knows:glass'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'selene', toLocationId: 'voss_penthouse' }],
    },
    {
      id: 'we_the_car',
      atWorldMinute: 2 * 1440 + 23 * 60 + 20,
      locationId: 'the_avenue',
      publicCopy:
        'The same grey saloon is on the avenue for the third night running, and Mara reads the plate out loud and then reads out last night’s. They are consecutive. Somebody bought them in a batch.',
      directorNotes:
        'This is Tobin Ash and it is not hostile yet. It is the first checkable inconsistency the player gets for free, and how they respond to it moves Directorate Suspicion in either direction.',
      setsFlags: ['knows:the_car'],
      cancelledByFlags: [],
      requiresFlags: ['night_one'],
      movesCharacters: [{ characterId: 'ash', toLocationId: 'the_avenue' }],
    },
    {
      id: 'we_ash_knocks',
      atWorldMinute: 3 * 1440 + 11 * 60,
      locationId: 'apt_7c',
      publicCopy:
        'Somebody knocks on the door of 7C at eleven in the morning, which nobody has ever done, and says his name through it before anybody asks. Tobin Ash, internal security, eleven minutes.',
      directorNotes:
        'He will state exactly what he wants and wait. He is not here to arrest anybody. He is here because the player filed at 06:04 on a night the balcony was at 01:16, and he would like the four hours accounted for.',
      setsFlags: ['ash_has_your_file'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_car'],
      movesCharacters: [{ characterId: 'ash', toLocationId: 'apt_7c' }],
    },
    {
      id: 'we_halden_visits',
      atWorldMinute: 4 * 1440 + 20 * 60,
      locationId: 'apt_7c',
      publicCopy:
        'Director Halden comes to the safehouse in person, which is not a thing directors do, with a bag of good coffee and no explanation for either.',
      directorNotes:
        'He wants to look at both of them in the same room. He will ask one question he already knows the answer to. Whatever he is told, he is warm about it, and nothing changes on the call the next morning.',
      setsFlags: ['halden_came_himself'],
      cancelledByFlags: [],
      requiresFlags: ['night_one'],
      movesCharacters: [{ characterId: 'halden', toLocationId: 'apt_7c' }],
    },
    {
      id: 'we_archive_moves',
      atWorldMinute: 5 * 1440 + 22 * 60 + 30,
      locationId: 'voss_penthouse',
      publicCopy:
        'The penthouse goes dark two hours early. Twenty minutes later Selene Voss walks out of the north service entrance in a coat that is not hers, carrying nothing, which is how you know she is carrying it.',
      directorNotes:
        'This is the trigger the contingency order names. Mara knows it is and the player may not. If they are both in the flat, the next ten minutes decide the run.',
      setsFlags: ['archive_on_the_move'],
      cancelledByFlags: ['dead:selene'],
      requiresFlags: ['saw_the_wave'],
      movesCharacters: [{ characterId: 'selene', toLocationId: 'the_avenue' }],
    },
    {
      id: 'we_seventh_night',
      atWorldMinute: 7 * 1440 + 5 * 60,
      locationId: 'apt_7c',
      publicCopy:
        'Seventh night, and the operation is over at 06:00 whatever else is true. Mara starts breaking down the tripod at five, which she has not done in six days, and neither of you says anything for a while.',
      directorNotes:
        'The clock lands. Extraction is at six. What that means depends entirely on Directorate Suspicion — a car and a debrief, or a team and a room. Do not resolve it for the player; make the difference visible in the street.',
      setsFlags: ['seventh_night'],
      cancelledByFlags: [],
      requiresFlags: ['night_one'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_the_wave',
      kind: 'MYSTERY',
      label: 'How Selene Voss knew where the camera was',
      seedHint: 'She looks into a lens at 01:16 that nobody outside Directorate Nine could know about, and waves.',
      payoffHint: 'Somebody inside the service told her, which is the leak the leak investigation was built to find.',
      weight: 1,
    },
    {
      id: 'p_the_envelope',
      kind: 'RELATIONSHIP',
      label: 'What your partner has been carrying since before you met',
      seedHint: 'A sealed aluminium case in the wardrobe and a standing order not to open it.',
      payoffHint: 'An authorisation to kill the target, with Mara’s countersignature on it, and a dead partner behind why she would.',
      weight: 0.95,
    },
    {
      id: 'p_palisade',
      kind: 'THEME',
      label: 'A city where being likely is enough',
      seedHint: 'A name the player was never briefed on turns up in traffic they were not meant to see.',
      payoffHint: 'Four hundred thousand people scored hourly on how likely they are to become a problem, and it is already running.',
      weight: 0.9,
    },
    {
      id: 'p_halden',
      kind: 'BOSS',
      label: 'The man who has never raised his voice',
      seedHint: 'Halden rings at the scheduled hour, is warm, brief, and rings off first, every night.',
      payoffHint: 'His signature is on the last of Selene’s fourteen months of memoranda, and the operation was a test of his own people.',
      weight: 0.85,
    },
    {
      id: 'p_glass',
      kind: 'RIVAL',
      label: 'Who Glass is',
      seedHint: 'The Glass traffic does not appear in the handset’s own log, and two of the messages contradict each other.',
      payoffHint: 'Three people share the identity. One of them is trying to help, and it is not the one the player suspects.',
      weight: 0.8,
    },
  ],
  archetypes: [
    {
      id: 'arch_field',
      name: 'Field, Eleven Years',
      role: 'Tradecraft and close work',
      summary: 'You have done more of these than you can file. You are calm in a stairwell and out of date on anything with a screen in it.',
      playstyle: ['Experienced', 'Physical', 'Behind on tech'],
      blurb: 'Eleven years, four services, and a knee that tells you when it is going to rain in Veyra.',
      attributeBonus: { resolve: 3, might: 2 },
      skillProficiencies: { tradecraft: 3, close_work: 2, movement: 1, systems: 0 },
      startingItems: [{ itemId: 'burner_set', qty: 2 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_directorate', amount: 15 }],
    },
    {
      id: 'arch_analyst',
      name: 'Desk, Until Now',
      role: 'Systems and pattern',
      summary: 'You have read four hundred of these operations and never been in one. You will see the inconsistency three days before anybody else and be no use at all in a corridor.',
      playstyle: ['Cerebral', 'Sees patterns', 'Untested'],
      blurb: 'They pulled you out of a basement because somebody decided the operation needed a person who reads.',
      attributeBonus: { mind: 4 },
      skillProficiencies: { systems: 3, surveil: 2, tradecraft: 1, close_work: 0 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_directorate', amount: 10 }],
    },
    {
      id: 'arch_informant',
      name: 'Turned, Not Recruited',
      role: 'People and cover',
      summary: 'You were somebody’s problem before you were somebody’s asset. You can be a plausible other person for as long as a corridor takes, and nobody in the service quite trusts you.',
      playstyle: ['Persuasive', 'Adaptable', 'Not trusted'],
      blurb: 'They had enough on you to send you to prison and decided you were more use in a flat.',
      attributeBonus: { presence: 3, agility: 2 },
      skillProficiencies: { cover: 3, read_people: 2, movement: 1, surveil: 0 },
      startingItems: [{ itemId: 'burner_set', qty: 3 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_directorate', amount: -10 }],
    },
    {
      id: 'arch_soldier',
      name: 'Transferred In',
      role: 'Movement and violence',
      summary: 'Military, three years ago, and the service took you for the parts of the job nobody writes down. You are very fast and you do not like sitting still.',
      playstyle: ['Fast', 'Dangerous', 'Restless'],
      blurb: 'You have never been in a room this small for this long, and it is already the hardest part of the assignment.',
      attributeBonus: { agility: 3, might: 2 },
      skillProficiencies: { movement: 3, close_work: 2, cover: 1, tradecraft: 0 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_directorate', amount: 10 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name is on the file?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Idris Kalvan' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'How did Directorate Nine get you?',
      helpText:
        'Where you came from, which sets what you are good at. It is fixed for the whole story. What it does not set is whose side you are on, what you put in your reports, or whether you are still working for these people by Thursday — none of that is decided here, and all of it can change on any night of the seven.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the service already think of you?',
      helpText: 'Halden has read this. So, it turns out, has Selene Voss.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. There is an operation in Ferrand two years ago that everybody is very careful not to bring up in front of me.',
    },
    {
      id: 'why_you',
      label: 'Why did they put you in this flat?',
      helpText: 'Establishes what the operation costs you if it goes wrong, which is the only leverage anybody in this story has.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'safe_pair', label: 'You are the safest pair of hands they had free' },
        { id: 'expendable', label: 'You are the one they can disown fastest' },
        { id: 'volunteered', label: 'You asked for it, and nobody has asked you why' },
        { id: 'punishment', label: 'It is a punishment posting and everybody knows it' },
        { id: 'watching_you', label: 'You are the one they are actually watching' },
      ],
    },
    {
      id: 'appearance',
      label: 'What do people notice first?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. I am a foot taller than anybody expects and I have never once been able to sit still in a chair.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Note how many of these do not require the mystery to be solved. "Seven
   * Nights Complete" is what happens to a player who ran the operation as
   * briefed and never found out what it was for, and it is a perfectly good
   * ending. "Mara's Order" is the same night from her side, and it can land
   * with the player having never worked out what was in the case.
   */
  endings: [
    {
      id: 'end_seven_nights',
      name: 'Seven Nights Complete',
      rarity: 'COMMON',
      minTurn: 35,
      requires: { flagsSet: ['seventh_night', 'clean_operation'], flagsUnset: ['broke_the_brief'] },
      condition:
        'The operation ran, the reports were filed, and extraction came at six on the seventh morning. Reachable by a player who never learned what PALISADE was, and better for it — this is the ending where the machine kept working and nobody in the flat found out what they had been part of.',
      epilogue:
        'The debrief takes two hours and is entirely about equipment. Mara shakes your hand in a car park and is on another operation within a month. Eleven weeks later a name you logged at 02:40 on the fourth night is in the paper, and the story is about something else entirely.',
      hint: '',
    },
    {
      id: 'end_stopped_going',
      name: 'You Just Stop',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['broke_the_brief', 'archive_is_yours'] },
      condition:
        'The player walked away from the operation without defecting, without taking anything, and without a scene. Nobody burned them and nobody had to. Write the specific mechanics of leaving a job that does not admit you had it — the bag, the handset, the hour — and let the flat carry on without them. This is not a failure and nobody in it should say that it is.',
      epilogue:
        'The handset goes in the river off Halberd Street, which is against four separate protocols and takes about a second. Mara works the seventh night alone and files a report that does not mention you, because there is no field on the form for it. Somewhere in a building that does not exist, a name stops being assigned to things.',
      hint: '',
    },
    {
      id: 'end_burn_notice',
      name: 'Burn Notice',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['broke_the_brief', 'left_the_map'] },
      condition:
        'The player is officially compromised and out of Veyra. Not a triumph and not a disaster — they are alive, they are nobody’s asset, and everything they knew how to do is now something they cannot be seen doing. Write the specific mechanics of leaving, not a montage.',
      epilogue:
        'The border is a bus, a river, and forty minutes of somebody else’s passport. Directorate Nine issues nothing, because Directorate Nine does not exist. There is a version of the file in which the player died in Veyra, and it is the version that gets read.',
      hint: '',
    },
    {
      id: 'end_two_tickets',
      name: 'Two Tickets Out',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['mara_refused_the_order', 'left_the_map'],
        minRelationship: [{ characterId: 'mara', dimension: 'affection', value: 45 }],
      },
      condition:
        'Mara put the envelope down and left with the player. She has broken twenty-nine years of institutional habit to do it and she is not romantic about it — the scene is two professionals doing an exfiltration they have both run for other people. What is between them shows in the logistics.',
      epilogue:
        'Two seats on a coastal service, forty minutes apart, bought with different cards. She organises the food for the journey by how long it will keep. Somewhere past the third border she stops sitting with her back to the aisle, and neither of you mentions that she has.',
      hint: 'She has followed a wrong order before and somebody died of it.',
    },
    {
      id: 'end_target_was_right',
      name: 'The Target Was Right',
      rarity: 'UNCOMMON',
      minTurn: 35,
      requires: { flagsSet: ['palisade_exposed'], flagsUnset: ['dead:selene'] },
      condition:
        'PALISADE is public and Selene Voss is alive to be the one who says so. The player sided with the person they were sent to catch and were correct to. Do not make it clean: the exposure has costs that land on people who were never asked, and Selene built the thing.',
      epilogue:
        'It runs for nine days and then for a year. There is a committee, and the committee has fourteen months of correspondence with a countersignature on the last page. Selene testifies for two days and says, on the record, that she built it and that she was proud of it at the time.',
      hint: 'She kept every letter.',
    },
    {
      id: 'end_perfect_operative',
      name: 'The Perfect Operative',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['archive_to_directorate', 'clean_operation'],
        minFactionReputation: [{ factionId: 'faction_directorate', value: 60 }],
      },
      condition:
        'The player did exactly what Halden wanted, including the parts he never asked for, and the service has noticed. Write it as a win, because it is one, and let the last line be the price: they are now the person who will be handed the next envelope.',
      epilogue:
        'The promotion is verbal and there is no paperwork. Halden gives you the office two doors down and the operation is written up as a model. Somewhere in Veyra, four hundred thousand people are scored hourly on how likely they are to become a problem, and now that is yours.',
      hint: '',
    },
    {
      id: 'end_no_more_windows',
      name: 'No More Windows',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['archive_destroyed', 'left_the_map'] },
      condition:
        'The archive is gone, everybody’s leverage went with it, and the player disappeared. Nobody thanks them and nobody can prove any of it happened, which is the point and also the cost. Selene is furious if she is alive: the evidence went with the weapon.',
      epilogue:
        'No committee, no story, no file. PALISADE is rebuilt from scratch inside two years by people who never saw the first one, because the reason it existed did not go anywhere. There is nobody left who can say that it was destroyed once, by somebody, on a Thursday.',
      hint: '',
    },
    {
      id: 'end_palisade_crown',
      name: 'Palisade Crown',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['archive_is_yours'] },
      condition:
        'The player kept it. Not to publish, not to destroy, not to hand in. Play it with total seriousness and no gloating — they now hold the thing that everybody in this story was willing to kill over, and the first person who works that out will be somebody they know.',
      epilogue:
        'It fits in a coat pocket and it updates hourly, and there is no version of the next ten years in which the player puts it down. Halden stops calling. Selene sends one message, from an identity that is not Glass, and it is four words long.',
      hint: '',
    },
    {
      id: 'end_maras_order',
      name: 'Mara’s Order',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['the_order_settled'] },
      condition:
        'The seventh night arrives at the thing Mara has been carrying since before the player met her, and it resolves one way or the other in front of them. Play whichever the run earned, without editorial: following it is a person doing her job badly for reasons that are legible, and refusing it costs her the career she was three operations from leaving on her own terms.',
      epilogue:
        'Whatever she did, she does the paperwork herself and does not let anybody else sign it. The envelope goes back in the case, or it does not, and either way the case goes back in the wardrobe under two folded blankets, and 7C is re-let in the spring.',
      hint: 'The seal on the case logs the time it was broken.',
    },
  ],
  opening:
    'The lock takes three seconds longer than it should, and then you are inside, and it is dark.\n\n' +
    'Every window in Apartment 7C is blacked out except one, and that one has a slit in it the width of a lens. A camera sits on a tripod at the gap, aimed across four lanes of empty avenue at a penthouse eleven floors up. There are two mugs on the floor beside it. One of them is still warm.\n\n' +
    'Mara Ellison does not turn around.\n\n' +
    '"Lock the door," she says. "And do not stand in front of the glass."\n\n' +
    'Across the street, the penthouse is dark.\n\n' +
    'It is twenty to eleven. You have seven nights.',
  openingSuggestions: [
    'I lock it, come round the far side of the room, and crouch by the tripod without touching it. "Which mug is mine, and how long have you been on this window on your own?"',
    'I stay in the doorway and look at the back of her head. "Seven nights, no contact, no heroics. Is that the brief you were given, or the one you would have written?"',
    'I put my bag down and start going through the flat — cupboards, sockets, the wardrobe. "Before I look at her building I would like to know what is in this one."',
  ],
  publishedAt: null,
};

export const WINDOW_SEVEN = StoryVersion.parse(raw);
