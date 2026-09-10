import { StoryVersion } from '@aniplay/contracts';

/**
 * "The Red Floor" — a storage level under a gym, and nothing that happens on
 * it has ever been written down.
 *
 * The bible's argument is that the room works precisely because there are no
 * cameras: a world champion can be dropped down there and still be world
 * champion in the morning, which is what lets people find out what they
 * actually are without it costing them a career. So the world is built around
 * that protection being fragile — Attention is the meter that ends the Red
 * Floor, and it is what public violence feeds.
 *
 * The moral centre is not the fighting. It is Maki, who twenty years ago
 * believed a boxer could still win, argued the doctor out of a stoppage, got
 * one more round, and has never once said the sport did it. Damage is
 * therefore a real accumulating variable with a doctor attached to it, and
 * "One More Round" is an authored destination rather than a warning.
 *
 * Not everybody's arc is greatness, and the world refuses to imply otherwise.
 * Koji has lost a great deal, will probably never be champion, loves this
 * anyway, and has an ending of his own that is not a consolation prize.
 *
 * Three variables. Gas is the only GOOD_HIGH — `resolveRest` refills those and
 * cardio is exactly what sleep and a week off give back. Attention is first
 * among the descending pair because the generic cost path and PUBLIC_VIOLENCE
 * both take the first GOOD_LOW in array order, and a fight outside the room
 * bringing commissions and press down on the room is the correct consequence.
 */

const raw = {
  id: 'sv_red_floor_1',
  storyId: 'story_red_floor',
  version: 1,
  title: 'The Red Floor',
  fantasyLabel: 'No cameras. No records. Step on or do not.',
  hook: 'Under an ageing gym there is a storage level with dark red mats on it where fighters from every discipline meet after midnight, and nothing that happens down there has ever been written down.',
  premise:
    'Classes finished four hours ago and the lights are still on upstairs.\n\n' +
    'Underneath the gym there is an old storage level with faded dark red mats on it, and every Sunday after midnight people come down there and fight each other.\n\n' +
    'No cameras. No records, no judges, no rankings, no weight classes and no titles. A world champion can lose to a wrestler nobody has heard of on those mats and still be world champion in the morning, because nothing that happens down there has ever been written down anywhere.\n\n' +
    'That is the entire point of it. It is the only room in this city where a fighter can find out what they actually are without it costing them a career.\n\n' +
    'It is also dangerous, and the man who keeps the floor has been keeping it for twenty years, because he once believed a boxer could still win and argued a doctor out of stopping it and got one more round.\n\n' +
    'You have come down the stairs. Somebody is going to ask what you do, and then somebody is going to ask whether you want to step on.\n\n' +
    'You need to work out what you are actually here to find out, because everybody down there already knows what they came for.',
  creatorId: 'creator_official',
  creatorName: 'ANIMA Studio',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Martial arts', 'Sports', 'Rivalry', 'Team'],
  mechanicsChips: [
    'Every discipline, one room',
    'Damage that does not go away',
    'A doctor who can say no',
    'Not everybody becomes champion',
    'Nothing down there is recorded',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'PSYCHOLOGICAL_THEMES', 'MORAL_AMBIGUITY', 'ROMANCE'],
  intensity: 'MODERATE',
  creatorNote:
    'You can be the strongest person in the room and you can also be a journeyman who never gets on a poster and loves this anyway, and both of those are authored endings with the same weight behind them. The one thing this world will not do is pretend the damage goes away because you were brave about it.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'mikado_gym',
    startWorldMinute: 24 * 60 + 20 - 1440,
    startingItems: [{ itemId: 'hand_wraps', qty: 1 }],
    hardCanon: [
      'The Red Floor is the storage level beneath Mikado Gym. It runs every Sunday after midnight and has done for over twenty years.',
      'There are no cameras, no records, no titles, no rankings and no required weight classes, and Mikado runs no betting on it.',
      'The rules are: both people agree to step on, either may stop, the floor keeper may stop it, and nobody touches anybody after a stoppage. Repeated violation gets a person banned.',
      'Tetsuo Maki owns Mikado and keeps the floor. Twenty years ago he argued a doctor out of stopping a championship fight, got one more round, and the boxer never fought again. He does not say the sport did it. He says he asked.',
      'Mei Hoshino is a sports physician and a former high-level judoka whose knee ended her competition at twenty-four. She can decline to clear a fighter and that decision is real.',
      'Aya Kisaragi withdrew from a major semifinal six months ago citing illness. The illness was a severe panic episode. Two people know.',
      'It is not a death arena and it is dangerous. Both of those are true and neither cancels the other.',
    ],
    toneGuide:
      'Contemporary Japanese coastal city, unglamorous and specific: an elevated line, a shopping arcade with three shutters down, a convenience store at four in the morning, a gym above a restaurant, showers that are better than they look. ' +
      'Fights are legible. Distance, angle, weight, what somebody does with their lead hand when they are tired. A style beats another style for a reason that can be named in one sentence, and the reason is the drama. ' +
      'Nobody monologues about strength while somebody is bleeding. Maki in particular hates it and will say so. ' +
      'Everybody in this gym has a definition of strength and every one of them is defensible and incomplete. Koji is funny because he likes people, not because he is a fool, and he is not secretly a genius. ' +
      'Damage is cumulative, physical and boring in the way real injuries are boring. Nobody is inspiring about a scan.',
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 13, agility: 13, mind: 11, presence: 11, resolve: 14, arcana: 5 },
  skills: [
    { id: 'boxing', name: 'Boxing', attribute: 'agility', description: 'Hands, feet and the four inches of angle that decide whether a shot lands or goes past your ear.' },
    { id: 'kicking', name: 'Kicking', attribute: 'might', description: 'Low kicks, body knees, and teaching somebody to be frightened of standing still.' },
    { id: 'grappling', name: 'Grappling', attribute: 'might', description: 'Level changes, the clinch, the mat, and what happens to a striker who has never been held before.' },
    { id: 'ringcraft', name: 'Ringcraft', attribute: 'mind', description: 'Reading what somebody keeps doing, and what they do instead when it stops working.' },
    { id: 'conditioning', name: 'Conditioning', attribute: 'resolve', description: 'Roadwork at five, the last two rounds, and being the one who is still there.' },
    { id: 'corner', name: 'Cornering', attribute: 'presence', description: 'Sixty seconds, one instruction, and the discipline to say the useful thing rather than the encouraging one.' },
    { id: 'composure', name: 'Composure', attribute: 'resolve', description: 'Being hurt, in front of people, and continuing to make decisions with your actual brain.' },
  ],
  resources: [
    {
      id: 'gas',
      name: 'Gas',
      max: 100,
      start: 80,
      regenPerHour: 2.5,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'Nothing left. The hands come down, the feet stop, and every single person in that room can see it from the wall, which is the specific humiliation this sport is built on and the reason people do roadwork.',
      color: '#C9662E',
      bands: [
        {
          upTo: 24,
          behaviour:
            'Empty. The hands are at chest height and staying there, the feet have stopped moving, and decisions are being made about half a second late. This is the band where somebody gets badly hurt losing a fight they were winning, and where the corner should be throwing it in.',
        },
        {
          upTo: 60,
          behaviour:
            'Working. Good for two more hard rounds or one difficult conversation and honest about not being good for both. Everything still happens and everything costs a beat more than it did an hour ago, which anybody with ringcraft can read across a room.',
        },
        {
          upTo: 100,
          behaviour:
            'Full. Feet, hands and lungs all doing what they are told, which means the player can pick a fight, change their mind halfway through and go somewhere else with it. This is the only band in which anybody is genuinely creative.',
        },
      ],
    },
    {
      id: 'attention',
      name: 'Attention',
      max: 100,
      start: 18,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody outside that building knows the room exists. Mikado is an ageing gym above a restaurant with a decent Sunday class and no story attached to it whatsoever, which is exactly the condition it needs.',
      color: '#5F7FB0',
      bands: [
        {
          upTo: 28,
          behaviour:
            'A rumour among people who fight. Somebody says they heard a champion got dropped down there and nobody can prove it, which is the intended state. The room can do the thing it exists to do, and the people in it can be genuinely bad at something in front of each other.',
        },
        {
          upTo: 58,
          behaviour:
            'Talked about. A clip that is definitely not from down there is going around anyway, two promoters have asked questions, and a commission has an unofficial view. Fighters with contracts start being careful about being seen on the stairs, which is the first thing the room loses.',
        },
        {
          upTo: 82,
          behaviour:
            'A problem with a name on it. Somebody senior has been asked about unsanctioned bouts in Kurohama on the record. Sponsors ring fighters about it. Two of the people who make the room what it is have stopped coming, and neither of them announced that they had.',
        },
        {
          upTo: 100,
          behaviour:
            'The protection is gone. Anything that happens down there is a career event for everybody in the room, which means nobody experiments, nobody can afford to lose, and the thing it was for has stopped being available. Maki will close it himself before he lets it become a show.',
        },
      ],
    },
    {
      id: 'damage',
      name: 'Damage',
      max: 100,
      start: 12,
      regenPerHour: -0.25,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Fresh. Nothing hurts, nothing clicks, nothing is being worked around, and the player has no idea what a privilege that is until about the fourth month.',
      color: '#8C3A3A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Ordinary training wear. Bruised shins, a rib that objects on one side, a hand that needs taping. Nothing here changes what anybody can do and all of it is worth mentioning to a doctor who will say it is fine and mean it.',
        },
        {
          upTo: 55,
          behaviour:
            'Carrying something. A knee that does not like level changes, an orbital that is tender, a headache that arrives at about the same hour each evening. The player starts building fights around what does not hurt, which is how styles actually form and is also how people get hurt worse.',
        },
        {
          upTo: 80,
          behaviour:
            'Accumulating in a way that shows up on paper. Mei has an opinion and it is not a suggestion. Sparring is being modified without anybody discussing it. This is the band Junpei has been living in for two years, and everybody who has been around long enough can see it from across the gym.',
        },
        {
          upTo: 100,
          behaviour:
            'The band Maki has spent twenty years watching for. One more round here is a decision with a person’s next forty years in it, and the world must be willing to spend them. There is no inspiring version of this and nobody in that room will provide one.',
        },
      ],
    },
  ],
  tendencies: [
    { id: 'lead_hand', label: 'Working behind the lead', identity: 'The Jab', scoutedNote: 'They step off it now. Everything you built starts one beat further back.' },
    { id: 'pressure', label: 'Walking people down', identity: 'Pressure', scoutedNote: 'They have stopped retreating in straight lines and are turning you at the ropes.' },
    { id: 'counter', label: 'Waiting for the mistake', identity: 'Counter', scoutedNote: 'They have stopped leading. Two rounds of nothing, and now you have to be the one who starts something.' },
    { id: 'level_change', label: 'Changing levels', identity: 'The Shot', scoutedNote: 'Their hips are back before you move. The entry that has worked all year is not there.' },
  ],
  items: [
    {
      id: 'hand_wraps',
      name: 'Your Wraps',
      tags: ['gear'],
      questItem: true,
      droppable: false,
      skillModifiers: { boxing: 1 },
      description: 'Two and a half metres each, washed grey, and wound in an order you worked out years ago and have never once had to think about since.',
      loreText: 'Everybody in this building can tell what somebody does from how they wrap. It takes about four seconds and nobody has ever mentioned doing it.',
      icon: 'wrap',
    },
    {
      id: 'gym_key',
      name: 'A Key To Mikado',
      tags: ['quest', 'access'],
      questItem: true,
      description: 'Cut in 1989 for a door that has been replaced twice since and still takes it. Maki has given out eleven of these in twenty years and can name all eleven.',
      loreText: 'Getting one is not a promotion and is not announced. It is left on the bench beside your bag while you are in the shower.',
      icon: 'key',
    },
    {
      id: 'mei_scan',
      name: 'The Imaging',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'Three sheets and a clinical summary in language designed to be unarguable. It says a specific thing about a specific structure and it does not care how anybody feels about it.',
      loreText: 'She prints it rather than sending it, because a fighter who is holding a piece of paper argues for about eleven seconds less than one who is not.',
      icon: 'papers',
    },
    {
      id: 'okabe_photograph',
      name: 'A Photograph In The Office',
      tags: ['quest', 'personal'],
      questItem: true,
      description: 'A young boxer with his hands up in an old ring, taken in the year before the fight. It is the only photograph on that wall and there are eleven hooks.',
      loreText: 'Shinji Okabe. He comes to the gym twice a year and Maki clears his whole afternoon and neither of them mentions why.',
      icon: 'photograph',
    },
    {
      id: 'atlas_tape',
      name: 'Somebody’s Tape Of Daigo',
      tags: ['document'],
      skillModifiers: { ringcraft: 2 },
      description: 'Nine fights on a drive, timestamped and annotated by somebody who has watched all of them more than four times. There are two rounds circled and one note that says "he does this when he is bored".',
      loreText: 'Riku made it. He has never shown it to anybody and he did not annotate it for himself, which is a thing he has not examined.',
      icon: 'drive',
    },
    {
      id: 'junpei_belt',
      name: 'A Belt In A Wardrobe',
      tags: ['personal'],
      description: 'National, welterweight, eleven years old, still in the case. It is at the back of a wardrobe in a flat with almost nothing else in it, and it is the reason the flat has almost nothing else in it.',
      loreText: 'He has not opened the case since the second stoppage. He has moved it four times, though, and always to the same relative position.',
      icon: 'belt',
    },
    {
      id: 'the_floor_ledger',
      name: 'The Book Nobody Keeps',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'Maki writes nothing down about the Red Floor. What he does keep is a school exercise book of names, dates and one word each — cleared, stopped, banned, sent home — going back twenty-one years.',
      loreText: 'It is not a record of fights. It is a record of the times he stopped one and the times he did not, and the second list is shorter and is the reason for the first.',
      icon: 'book',
    },
    {
      id: 'convenience_food',
      name: 'Four In The Morning Food',
      tags: ['food'],
      consumable: { resourceId: 'gas', amount: 22, consumesItem: true },
      description: 'Onigiri, a sports drink and something fried, bought under strip lighting by three people who have all just been hit in the head and are being extremely normal about it.',
      loreText: 'The staff at that store have been watching the same people come in at the same hour for years and have never once asked.',
      icon: 'food',
    },
  ],
  abilities: [
    {
      id: 'read_the_tell',
      name: 'Read The Tell',
      tags: ['sight'],
      description: 'Work out what somebody keeps doing, and — more usefully — what they reach for instead once it has stopped working.',
      affordances: ['read them', 'watch', 'study', 'what are they doing', 'look for the tell', 'observe', 'analyse'],
      costs: [{ resourceId: 'gas', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'ringcraft', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'work_the_jab',
      name: 'Work The Jab',
      tags: ['offensive'],
      description: 'Everything behind the lead hand. Not damage — position, distance, and teaching somebody where they are allowed to stand.',
      affordances: ['jab', 'work behind the jab', 'lead hand', 'keep him off', 'range', 'pick him apart'],
      costs: [{ resourceId: 'gas', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'boxing', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: ['lead_hand'],
      countersTendency: 'pressure',
    },
    {
      id: 'walk_them_down',
      name: 'Walk Them Down',
      tags: ['offensive'],
      description: 'Cut the space, take the angle away, and make retreating the most expensive thing available. Low kicks and body work until standing still stops being an option.',
      affordances: ['pressure', 'walk him down', 'cut the ring', 'low kick', 'body', 'crowd him', 'push forward'],
      costs: [
        { resourceId: 'gas', amount: 11 },
        { resourceId: 'damage', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'kicking', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: ['pressure'],
      countersTendency: 'counter',
    },
    {
      id: 'wait_for_it',
      name: 'Wait For It',
      tags: ['defensive'],
      description: 'Give them nothing, for as long as it takes, and hit the mistake. It requires two rounds of being booed by people who are not there.',
      affordances: ['counter', 'wait', 'let him come', 'slip', 'time him', 'counterpunch', 'be patient'],
      costs: [{ resourceId: 'gas', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'boxing', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: ['counter'],
      countersTendency: 'lead_hand',
    },
    {
      id: 'change_levels',
      name: 'Change Levels',
      tags: ['offensive'],
      description: 'Drop under it and take them somewhere they have never been. Most strikers have no idea what happens after the hips go, and finding out is not pleasant for them.',
      affordances: ['takedown', 'shoot', 'grapple', 'clinch', 'take him down', 'level change', 'wrestle'],
      costs: [
        { resourceId: 'gas', amount: 13 },
        { resourceId: 'damage', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'grappling', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: ['level_change'],
      countersTendency: 'pressure',
    },
    {
      id: 'stay_in_it',
      name: 'Stay In It',
      tags: ['defensive'],
      description: 'Be badly hurt, in front of people, and keep making decisions with your actual brain rather than with whatever is currently running the body.',
      affordances: ['hold on', 'survive', 'ride it out', 'stay up', 'keep going', 'weather it', 'take it'],
      costs: [
        { resourceId: 'gas', amount: 9 },
        { resourceId: 'damage', amount: 9 },
        { resourceId: 'attention', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'composure', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'work_the_corner',
      name: 'Work The Corner',
      tags: ['social'],
      description: 'Sixty seconds and one instruction. The discipline is saying the useful thing instead of the encouraging one, and almost nobody manages it.',
      affordances: ['corner them', 'coach', 'give instructions', 'talk to them between rounds', 'advise', 'second them'],
      costs: [{ resourceId: 'gas', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'corner', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'call_it',
      name: 'Call It',
      tags: ['social'],
      description: 'Stop the fight. Yours or somebody else’s, from the floor or from the corner. It is the single hardest thing anybody in this building ever does.',
      affordances: ['stop it', 'throw the towel', 'call it', 'stop the fight', 'wave it off', 'i am done', 'tap'],
      costs: [{ resourceId: 'gas', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'put_the_miles_in',
      name: 'Put The Miles In',
      tags: ['survival'],
      description: 'Roadwork at five, the same hill, alone. Nothing about it is interesting and it is the only thing that changes what you are in eight weeks’ time.',
      affordances: ['train', 'run', 'roadwork', 'condition', 'work out', 'get in shape', 'hit the bag'],
      costs: [{ resourceId: 'gas', amount: 14 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'conditioning', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'one_more_round',
      name: 'One More Round',
      tags: ['offensive'],
      description: 'Go past the point where somebody qualified has said to stop. It works often enough that people keep doing it, which is the entire reason this world has a doctor in it.',
      affordances: ['keep fighting', 'one more', 'do not stop', 'push through it', 'ignore the doctor', 'go again'],
      costs: [
        { resourceId: 'gas', amount: 15 },
        { resourceId: 'damage', amount: 26 },
        { resourceId: 'attention', amount: 12 },
      ],
      cooldownMinutes: 1440,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'composure', baseDc: 16 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:what_it_costs'],
        lockedCopy: 'Nobody has asked you to do that yet, and the man who keeps this floor has spent twenty years making sure the asking happens as rarely as possible.',
      },
    },
  ],
  locations: [
    {
      id: 'mikado_gym',
      name: 'Mikado Gym',
      shortName: 'Mikado',
      description:
        'Second floor of an old mixed-use building above a restaurant, up a staircase with a bend in it. One ring, six heavy bags, a mat area, free weights, a tiny office, showers that are considerably better than they look and a kitchenette nobody has ever properly cleaned.',
      artDirection:
        'Ageing second-floor Japanese boxing gym at night, one ring, hanging heavy bags, taped mats, mismatched free weights, fluorescent tubes with one flickering, a small glass-fronted office. Worn, warm, entirely functional.',
      connections: [
        { to: 'the_red_floor', travelMinutes: 2, label: 'Down the back stairs' },
        { to: 'the_office', travelMinutes: 1, label: 'The office' },
        { to: 'the_arcade', travelMinutes: 5, label: 'Down and out into the arcade' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'hand_wraps', qty: 2, ownerId: null, aka: ['wraps', 'hand wraps', 'tape'] },
      ],
    },
    {
      id: 'the_red_floor',
      name: 'The Red Floor',
      shortName: 'Red Floor',
      description:
        'The old storage level, low-ceilinged, with faded dark red mats laid across the whole of it. No mirrors, no banners, no seating except the wall, two benches and a stack of folding chairs. Between about one and four on a Sunday morning there are usually twenty people down here.',
      artDirection:
        'Low-ceilinged basement storage level with faded dark red mats covering the floor, bare pillars, no mirrors or signage, people sitting on benches and folding chairs against the walls, two figures squared up in the middle, hard overhead light. Plain, close, serious.',
      connections: [{ to: 'mikado_gym', travelMinutes: 2, label: 'Back up the stairs' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [],
    },
    {
      id: 'the_office',
      name: 'The Office',
      shortName: 'Office',
      description:
        'Two metres by three, a desk, a kettle, a filing cabinet with a drawer that does not open, and a wall with eleven picture hooks in it and one photograph hanging on the second hook from the left.',
      artDirection:
        'Tiny cluttered gym office, desk with paperwork and a kettle, an old filing cabinet, a wall with several empty picture hooks and one framed photograph of a young boxer. Cramped, personal, slightly sad.',
      connections: [{ to: 'mikado_gym', travelMinutes: 1, label: 'Back out to the floor' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        { itemId: 'okabe_photograph', qty: 1, ownerId: 'maki', aka: ['the photograph', 'the picture', 'the boxer on the wall'] },
        { itemId: 'the_floor_ledger', qty: 1, ownerId: 'maki', aka: ['the book', 'the ledger', 'the exercise book', 'his notes'] },
        { itemId: 'gym_key', qty: 1, ownerId: 'maki', aka: ['a key', 'the key', 'gym key'] },
      ],
    },
    {
      id: 'the_arcade',
      name: 'The Shopping Arcade',
      shortName: 'Arcade',
      description:
        'Four hundred metres of roofed arcade with three shutters permanently down, a fishmonger, a stationers, a bar with eleven seats and a convenience store at the far end that is the only thing open at four in the morning.',
      artDirection:
        'Japanese covered shopping arcade at night, roller shutters half down, hanging signage, a lit convenience store at the far end, wet ground, one cyclist. Ordinary, atmospheric, empty.',
      connections: [
        { to: 'mikado_gym', travelMinutes: 5, label: 'Back up to the gym' },
        { to: 'the_waterfront', travelMinutes: 9, label: 'Down to the water' },
        { to: 'mei_clinic', travelMinutes: 12, label: 'Across to the clinic' },
        { to: 'koji_print_shop', travelMinutes: 7, label: 'Round to the print shop' },
        { to: 'junpei_flat', travelMinutes: 14, label: 'Out to the towers' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'convenience_food', qty: 3, ownerId: null, aka: ['food', 'onigiri', 'something to eat', 'a drink'] },
      ],
    },
    {
      id: 'the_waterfront',
      name: 'The Waterfront',
      shortName: 'Waterfront',
      description:
        'A container terminal, a fish market that starts at four, and about two kilometres of seawall with a hill at the end of it that everybody in this sport in this city has run up at five in the morning and hated.',
      artDirection:
        'Industrial Japanese waterfront before dawn, container cranes, a long seawall path, a fish market lit up, one runner, grey sea and pale sky. Cold, spare, beautiful in a plain way.',
      connections: [
        { to: 'the_arcade', travelMinutes: 9, label: 'Back into town' },
        { to: 'the_arena', travelMinutes: 16, label: 'Out to the arena' },
        { to: 'the_hill', travelMinutes: 6, label: 'The hill at the end of the seawall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'mei_clinic',
      name: 'The Clinic',
      shortName: 'Clinic',
      description:
        'Sports medicine and rehab on the first floor of a modern building, with a gym at the back that is better equipped than Mikado and a waiting room containing four people who all know each other.',
      artDirection:
        'Modern Japanese sports medicine clinic, treatment table and rehab equipment, imaging on a wall screen, clean neutral lighting, a small waiting area with athletes in it. Clinical, calm, well funded.',
      connections: [
        { to: 'the_arcade', travelMinutes: 12, label: 'Back to the arcade' },
        { to: 'the_arena', travelMinutes: 11, label: 'Across to the arena' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'mei_scan', qty: 1, ownerId: 'mei', aka: ['the scan', 'the imaging', 'the results', 'the paperwork'] },
      ],
    },
    {
      id: 'koji_print_shop',
      name: 'Namba Printing',
      shortName: 'Print Shop',
      description:
        'A two-man print and packaging business in a side street, run by a man and his nephew, with a guillotine, three machines of different ages and a radio that has been on the same station since 2009.',
      artDirection:
        'Small Japanese print and packaging workshop, stacked card and paper, an old guillotine and two presses, a radio on a shelf, an open roller door onto a side street. Busy, cheerful, unglamorous.',
      connections: [{ to: 'the_arcade', travelMinutes: 7, label: 'Back to the arcade' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'junpei_flat',
      name: 'The Eleventh Floor',
      shortName: 'The Flat',
      description:
        'One room and a kitchen in a residential tower, with a bed, a table, a television that is never on and almost nothing else. There is a wardrobe with one case in the bottom of it and everything in the flat is arranged around not looking at that wardrobe.',
      artDirection:
        'Sparse Japanese apartment interior high in a residential tower, minimal furniture, a made bed, a wardrobe, a wide window over city lights at night, almost no possessions. Tidy, empty, quietly devastating.',
      connections: [{ to: 'the_arcade', travelMinutes: 14, label: 'Back down into town' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [
        { itemId: 'junpei_belt', qty: 1, ownerId: 'junpei', aka: ['the belt', 'the case', 'his title', 'the wardrobe'] },
      ],
    },
    {
      id: 'seno_gym',
      name: 'Seno Boxing',
      shortName: 'Seno',
      description:
        'A proper professional operation eleven minutes from Mikado: two rings, air conditioning, a sponsor board, a physio on site and a wall of photographs of people who have gone somewhere. Riku trains here and comes to Mikado anyway, which everybody at both gyms has noticed.',
      artDirection:
        'Modern well-equipped professional boxing gym, two rings, sponsor banners, a wall of framed fight photographs, air conditioning ducts, serious athletes training in silence. Clean, professional, slightly cold.',
      connections: [
        { to: 'the_arena', travelMinutes: 9, label: 'Over to the arena' },
        { to: 'the_arcade', travelMinutes: 11, label: 'Across town to the arcade' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 1 },
      takeableItems: [
        { itemId: 'atlas_tape', qty: 1, ownerId: 'riku', aka: ['the tape', 'the drive', 'the footage', 'his notes on daigo'] },
      ],
    },
    {
      id: 'the_arena',
      name: 'Kurohama Arena',
      shortName: 'Arena',
      description:
        'Four thousand seats, a proper canvas, commission officials, a doctor at ringside and a broadcast truck outside. Everything down on the Red Floor exists in relation to this building, including the people who say it does not.',
      artDirection:
        'Mid-size Japanese fight arena, four thousand seats, a lit ring with sponsor canvas, camera positions, officials at a table, crowd in half-darkness. Professional, bright, enormous compared with a basement.',
      connections: [
        { to: 'the_waterfront', travelMinutes: 16, label: 'Back to the water' },
        { to: 'mei_clinic', travelMinutes: 11, label: 'Over to the clinic' },
        { to: 'seno_gym', travelMinutes: 9, label: 'Across to Seno' },
        { to: 'the_weigh_in', travelMinutes: 3, label: 'The hotel function room' },
        { to: 'daigo_camp', travelMinutes: 55, lockedByFlag: 'knows:the_camp', label: 'An hour out, to a warehouse' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_weigh_in',
      name: 'The Function Room',
      shortName: 'Weigh-In',
      description:
        'A hotel function room with a scale on a low stage, a backdrop with eleven logos on it, and about forty people who all want something specific from the next ninety seconds. Everybody here is dehydrated and being extremely polite about it.',
      artDirection:
        'Hotel function room set up for a fight weigh-in, low stage with scales and a sponsor backdrop, press and officials, two fighters facing off, harsh lighting. Formal, tense, faintly absurd.',
      connections: [{ to: 'the_arena', travelMinutes: 3, label: 'Back to the arena' }],
      discoveredByDefault: true,
      mapPosition: { x: 3, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_hill',
      name: 'The Hill',
      shortName: 'The Hill',
      description:
        'Nine hundred metres at about eleven per cent, at the end of the seawall, with a vending machine at the top that has been broken since spring. Every fighter in Kurohama has an opinion about this hill and all of the opinions are the same.',
      artDirection:
        'Steep coastal road climbing away from a seawall at dawn, a lone runner near the bottom, a broken vending machine at the crest, sea below, pale sky. Punishing, ordinary, oddly beautiful.',
      connections: [{ to: 'the_waterfront', travelMinutes: 6, label: 'Back down to the seawall' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 1 },
      takeableItems: [],
    },
    {
      id: 'daigo_camp',
      name: 'The Camp',
      shortName: 'The Camp',
      description:
        'A converted warehouse an hour out of the city where a world champion trains with eleven people and no press. Nobody gets in without being brought, and everybody who has been brought talks about the silence rather than the work.',
      artDirection:
        'Converted rural warehouse training camp, one ring and a mat area in a huge empty space, high windows, very few people, everything spotless, no signage of any kind. Austere, quiet, intimidating.',
      connections: [{ to: 'the_arena', travelMinutes: 55, lockedByFlag: 'knows:the_camp', label: 'Back into the city' }],
      discoveredByDefault: false,
      mapPosition: { x: 3, y: -1 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_commission',
      name: 'The Commission',
      description: 'Licensing, sanctioning, medicals and suspensions. It is not hostile to the Red Floor and it is structurally incapable of tolerating it, and everybody on both sides understands that.',
      startingReputation: 0,
      ranks: [
        { atReputation: -40, label: 'Suspended' },
        { atReputation: 0, label: 'Licensed' },
        { atReputation: 35, label: 'In good standing' },
        { atReputation: 70, label: 'Matched on the big cards' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_mikado',
      name: 'Mikado',
      description: 'An ageing gym above a restaurant, a coach who has kept a room open for twenty-one years, and about forty people who would drive across the city at two in the morning for any of the others.',
      startingReputation: 10,
      ranks: [
        { atReputation: -40, label: 'Not welcome on the stairs' },
        { atReputation: 0, label: 'Paying the monthly' },
        { atReputation: 35, label: 'One of the regulars' },
        { atReputation: 70, label: 'Given a key' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_floor',
      name: 'The Room',
      description: 'Everybody who comes down on a Sunday, from four disciplines and eleven gyms, held together by two rules and the fact that none of it is written down.',
      startingReputation: 0,
      ranks: [
        { atReputation: -40, label: 'Banned' },
        { atReputation: 0, label: 'Somebody on a bench' },
        { atReputation: 35, label: 'Asked to step on' },
        { atReputation: 70, label: 'Somebody the room quiets down for' },
      ],
      allies: ['faction_mikado'],
      enemies: [],
    },
    {
      id: 'faction_promotion',
      name: 'The Promotion',
      description: 'Matchmakers, managers and the people who sell four thousand seats. They are not villains, they need product, and a fighter is a business asset with a shelf life measured in fights.',
      startingReputation: 0,
      ranks: [
        { atReputation: -40, label: 'Unmatchable' },
        { atReputation: 0, label: 'On the list' },
        { atReputation: 35, label: 'On the card' },
        { atReputation: 70, label: 'Selling the building' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'aya',
      name: 'Aya Kisaragi',
      role: 'Twenty-three, nationally ranked, a pressure fighter who teaches people to be frightened of standing still',
      cardBlurb:
        'She is the one who finds you on the stairs and tells you the classes finished four hours ago. She pulled out of a semifinal six months ago citing illness, the illness was real, and the people who called her afraid were accidentally right in the cruellest available way.',
      pronouns: 'she/her',
      publicTraits: ['Amused about most things and specific about a few', 'Wraps her hands while having a conversation', 'Physically incapable of retreating in a straight line'],
      hiddenDrives: [
        'She wants to know whether the thing that happened before the semifinal will happen again, and the only way to find out is to be in a fight that matters',
        'She has not forgiven herself and has organised her whole training week around not having time to think about it',
      ],
      values: [
        'Being honest about what a fight actually was, afterwards, including when the honest version is worse',
        'The room, and the fact that nothing that happens in it goes anywhere',
      ],
      fears: [
        'It happening again, in a building with four thousand people in it and a camera on her face',
        'That the version of her that pulls out is the real one and the other twenty-three years were the performance',
      ],
      socialStyle:
        'Dry, direct and frequently amused, without ever doing the thing where every sentence is tough. Asks blunt questions and takes a flat answer well. Warmer in the gym than anywhere else and knows it.',
      boundaries: [
        'Will not be told to relax before a fight, by anybody, and has hit somebody over it',
        'Will not discuss the semifinal with anybody who has decided in advance what it means',
      ],
      goals: [
        'Get back to a semifinal and be standing in the corridor beforehand',
        'Find out what she actually is in a room where finding out costs nothing',
      ],
      secrets: [
        {
          id: 'aya_the_semifinal',
          fact: 'The withdrawal was a severe panic episode, not an illness. Coach Maki and Dr. Hoshino know. Nobody else does, including her family.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it flatly, once, to somebody who has just been badly frightened in front of her and did not pretend otherwise.',
        },
        {
          id: 'aya_still_happens',
          fact: 'It has happened twice more since, both times in a corridor before a bout, both times managed alone in about four minutes, and she has told nobody about either.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She lets somebody see it start rather than telling them, and what they do in the next thirty seconds decides the rest of it.',
        },
      ],
      speechStyle:
        'Dry, short, and amused about a beat more often than the situation warrants. Sets up a joke and then flattens it deliberately. Refuses reassurance out loud and reacts badly to being offered it. Says the serious thing in exactly the same register as the joke, so it takes people a second.',
      topics: ['the room', 'the semifinal', 'pressure fighting', 'Maki', 'what you do', 'her next fight'],
      voiceSamples: [
        'Classes ended four hours ago. Unless you are here for the other thing, in which case, welcome, mind the third step.',
        'Everybody is brave on a Tuesday. Nothing happens on a Tuesday. That is why.',
        'Do not tell me to relax. I am aware that I am not relaxed. Being told about it has never once helped and I have been told about it a great deal.',
        'I pulled out of the semi. They printed that I was ill. I was ill. Those are the same sentence and they are not, and I have not worked out how to say the difference to anybody.',
      ],
      appearance:
        'Twenty-three, long dark hair braided tight for training and loose otherwise, warm brown-gold eyes, lean and heavily muscled through the shoulders and legs, an oversized jacket outside the gym and a small scar through the right eyebrow.',
      visualHook: 'A short scar through the right eyebrow, and wraps half-wound on one hand at all times.',
      silhouette: 'Standing square with the weight forward, already cutting the angle before anybody has moved.',
      artSeed: 'rf-aya-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'focused', 'furious', 'frightened'],
      schedule: [
        { startMinute: 0, endMinute: 60, locationId: 'mikado_gym', activity: 'upstairs between rounds, bleeding slightly, entirely cheerful' },
        { startMinute: 60, endMinute: 240, locationId: 'the_red_floor', activity: 'downstairs, on a Sunday, doing the other thing' },
        { startMinute: 240, endMinute: 600, locationId: 'the_arcade', activity: 'asleep in a flat over the arcade, badly, for six hours' },
        { startMinute: 600, endMinute: 780, locationId: 'the_waterfront', activity: 'roadwork, the seawall, the hill, in that order' },
        { startMinute: 780, endMinute: 1200, locationId: 'mikado_gym', activity: 'the gym, pads, bags, and three rounds with anybody who is up for it' },
        { startMinute: 1200, endMinute: 1440, locationId: 'mikado_gym', activity: 'still there, wrapping and unwrapping her hands and talking' },
      ],
      homeLocationId: 'mikado_gym',
      knowledgeScope: ['aya', 'the_red_floor', 'muay_thai', 'the_semifinal', 'mikado', 'the_commission'],
      startingRelationship: { trust: 25, affection: 20, respect: 20, fear: 0, rivalry: 20 },
      gates: [
        { id: 'aya_tells_you_about_the_semi', label: 'She tells you what actually happened', kind: 'TRUST', requires: { trust: 60, flagsSet: ['spoke:aya'] } },
        { id: 'aya_corners_you', label: 'She works your corner', kind: 'ALLIANCE', requires: { trust: 65, respect: 62 } },
        { id: 'aya_closer', label: 'Neither of them is calling it training partners', kind: 'ROMANCE', requires: { trust: 72, affection: 70 } },
      ],
      attributes: { might: 15, agility: 16, mind: 13, presence: 13, resolve: 16, arcana: 4 },
      companion: null,
      scouting: {
        learnRate: 1.4,
        cap: 8,
        revealCopy: 'She is already turning you before you have decided to move. "You go right when you are tired," she says, from about eight inches away. "You have done it four times."',
      },
      combatant: { health: 80, defenseDc: 17, damage: 14, tags: ['kickboxer', 'pressure'] },
    },
    {
      id: 'riku',
      name: 'Riku Seno',
      role: 'Twenty-two, a professional boxer with a proper gym and a proper team, who comes down to a basement on Sundays anyway',
      cardBlurb:
        'He is a counter-fighter, he is extremely good, and he will look bored right up until the moment he steps off your best shot. He has been watching you for eight weeks and he is going to tell you exactly what you keep doing, flatly, without any pleasure in it.',
      pronouns: 'he/him',
      publicTraits: ['Looks bored until the first exchange', 'Never speaks first in any room', 'Moves with an economy that reads as arrogance and is not'],
      hiddenDrives: [
        'He wants one fight in his life where the result does not go on a record, which is the only reason he is in that basement',
        'He has been studying a world champion for two years and has not admitted to himself that he made the tape for somebody else to use',
      ],
      values: [
        'Doing it properly. Technique as a form of respect for the person opposite',
        'The room, which he defends to people at his own gym who think it is beneath him',
      ],
      fears: [
        'That being technically excellent is all he is, and that it will not be enough at the level he is about to reach',
        'Being the young prospect somebody built a career on and then stopped mentioning',
      ],
      socialStyle:
        'Says almost nothing until asked a direct technical question, at which point he becomes a completely different and much warmer person for about four minutes. Watches everybody. Remembers everything.',
      boundaries: [
        'Will not fight anybody who has not chosen to, at all, and has walked out of a room over it',
        'Will not discuss his own record, ever, in either direction',
      ],
      goals: [
        'Find out what he is against somebody the record will never hear about',
        'Work out whether the thing he does can beat something it was not designed for',
      ],
      secrets: [
        {
          id: 'riku_the_tape',
          fact: 'He has nine of Daigo’s fights annotated on a drive, made over two years, and the annotations are written as instructions to a second person.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He hands it over rather than explaining it, to somebody he has decided has a better chance than he does.',
        },
        {
          id: 'riku_why_he_comes',
          fact: 'At Seno he is a prospect with a record to protect and every session is watched by people with money in him. The Red Floor is the only place he has ever been allowed to lose.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it once, quietly, on the stairs, to somebody who asked him why he bothers.',
        },
      ],
      speechStyle:
        'Minimal, flat and precise, right up until the subject is technical, at which point he talks for two full minutes without stopping and then stops abruptly. Describes what happened in a fight rather than how it felt. Never uses a superlative about anybody, including opponents he rates enormously.',
      topics: ['distance', 'the tape', 'Daigo', 'why he comes here', 'his gym', 'what you did in the third'],
      voiceSamples: [
        'Your feet are fine. Your weight is not. When you step off, it goes to the rear leg before the foot does, and anyone in here reads that.',
        'It is a room with mats in it. I am not going to be romantic about it.',
        'At my gym, four sets of eyes on every round and three of them have money in me. Down here nothing gets written down. That is the whole of it, and I would rather you did not repeat it.',
        'He gets bored. Round four, round five, if nothing has happened he starts leading with the right and there is a half-inch he does not close. Two years of tape and that is what I have got.',
      ],
      appearance:
        'Twenty-two, lean, dark hair cut very short, grey-brown eyes, plain clothes chosen for not being noticed, and a way of moving that wastes absolutely nothing and looks like boredom.',
      visualHook: 'Plain grey trainers, immaculate, in a room where everybody else’s kit is falling apart.',
      silhouette: 'Standing side-on with the lead shoulder forward and the weight already back.',
      artSeed: 'rf-riku-01',
      portrait: null,
      expressions: ['neutral', 'bored', 'engaged', 'sharp', 'shaken'],
      schedule: [
        { startMinute: 0, endMinute: 180, locationId: 'the_red_floor', activity: 'downstairs on a Sunday, watching from the wall' },
        { startMinute: 180, endMinute: 480, locationId: 'seno_gym', activity: 'asleep in the room above the gym, because it is easier' },
        { startMinute: 480, endMinute: 900, locationId: 'seno_gym', activity: 'the professional session, watched by four people' },
        { startMinute: 900, endMinute: 1140, locationId: 'seno_gym', activity: 'the tape, alone, for the four hundredth time' },
        { startMinute: 1140, endMinute: 1440, locationId: 'mikado_gym', activity: 'at Mikado, on the wall, not saying anything' },
      ],
      homeLocationId: 'seno_gym',
      knowledgeScope: ['riku', 'boxing', 'seno_gym', 'daigo', 'the_red_floor', 'the_promotion'],
      startingRelationship: { trust: 10, affection: 0, respect: 25, fear: 0, rivalry: 45 },
      gates: [
        { id: 'riku_talks_technique', label: 'He tells you what you are doing wrong', kind: 'TRUST', requires: { respect: 45, flagsSet: ['spoke:riku'] } },
        { id: 'riku_gives_you_the_tape', label: 'He gives you two years of work', kind: 'ALLIANCE', requires: { trust: 60, respect: 70 } },
      ],
      attributes: { might: 14, agility: 18, mind: 16, presence: 10, resolve: 15, arcana: 4 },
      companion: null,
      scouting: {
        learnRate: 1.7,
        cap: 9,
        revealCopy: 'He has not moved and the shot has gone past his ear. "Third time," he says, conversationally. "You lead with it when you are unsure."',
      },
      combatant: { health: 78, defenseDc: 19, damage: 13, tags: ['boxer', 'counter'] },
    },
    {
      id: 'daigo',
      name: 'Daigo Kurosaki',
      role: 'World champion, thirty-one, trains in a warehouse an hour out of the city with eleven people and no press',
      cardBlurb:
        'He is the top of all of this and he came down those stairs once, four years ago, and nobody can prove it. He is not a monster and he is not a mystic. He is extremely good, extremely bored, and if you can make him solve something he will drive an hour at one in the morning to let you try.',
      pronouns: 'he/him',
      publicTraits: ['Answers questions completely and briefly', 'Has not given a bad-tempered interview in eleven years', 'Does not look at anybody while they are talking'],
      hiddenDrives: [
        'He is bored, in a way he has never said publicly, and boredom at his level is a technical vulnerability he is aware of',
        'He would like somebody to make him afraid once more before he stops, and knows exactly how that sounds',
      ],
      values: [
        'The work, which he does more of than anybody and has never mentioned',
        'The room, which he has protected twice by not mentioning it in places where mentioning it would have been useful to him',
      ],
      fears: [
        'Stopping and finding out that the discipline was the whole personality',
        'Being beaten by somebody who does not know why it worked, which he considers worse than being beaten',
      ],
      socialStyle:
        'Courteous, unhurried and slightly absent. Gives a complete answer to a technical question and a two-word answer to everything else. Entirely without any of the theatre that the sport around him runs on.',
      boundaries: [
        'Will not take an unsanctioned fight with anybody who would be damaged by losing it publicly, which is most people',
        'Will not talk about the Red Floor outside the Red Floor, at all, to anybody, and has been asked directly on camera',
      ],
      goals: [
        'Be made to solve something, once, before the thing he is stops working',
        'Get four more years out of a body that has had a great deal asked of it',
      ],
      secrets: [
        {
          id: 'daigo_came_down',
          fact: 'He came down to the Red Floor four years ago, fought a wrestler nobody has heard of, and was dropped. There is no record and there never will be, and it is the only fight he thinks about.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He confirms it, without elaborating, to somebody who asks him about it in that basement rather than anywhere else.',
        },
        {
          id: 'daigo_the_hand',
          fact: 'The right hand has been going for eighteen months. Two people know and neither of them is his promoter. He has built an entire second version of his game around it and nobody has noticed.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Somebody who has watched two years of tape properly can see it, and he will not deny it if it is put to him accurately.',
        },
      ],
      speechStyle:
        'Courteous and very short, with the length of an answer proportional to how technical the question was. No superlatives, no theatre, no self-deprecation. Long comfortable pauses that other people fill. Uses somebody’s discipline rather than their name when introducing them to a third party.',
      topics: ['the work', 'the room', 'what he is looking for', 'his right hand', 'being bored', 'four years ago'],
      voiceSamples: [
        'Yes. Four years ago. A wrestler. He put me on the mats twice and I have never found out his name and I have not looked.',
        'You are asking whether I take it seriously. I drove an hour. It is one in the morning.',
        'Six years and nobody has made me solve anything. That is not a boast. It is a problem, and it is mine, and I have not been able to buy a solution to it.',
        'Kickboxer. Wrestler. Whatever you are. Sit down, all of you, this takes about four minutes and then I have to drive back.',
      ],
      appearance:
        'Thirty-one, tall for the weight, absolutely nothing wasted anywhere, plain training gear with no logos on it at all, short hair, and a face that eleven million people would recognise and that nobody in a convenience store ever does.',
      visualHook: 'Training kit with every logo removed, in a sport where the logos are the business.',
      silhouette: 'Standing entirely relaxed with his hands at his sides, taking up no room at all.',
      artSeed: 'rf-daigo-01',
      portrait: null,
      expressions: ['neutral', 'courteous', 'interested', 'absent', 'awake'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'daigo_camp', activity: 'the warehouse, alone, at an hour nobody else is there' },
        { startMinute: 300, endMinute: 480, locationId: 'daigo_camp', activity: 'three hours of sleep and then the first session' },
        { startMinute: 480, endMinute: 1080, locationId: 'daigo_camp', activity: 'the camp, eleven people, no press, no talking' },
        { startMinute: 1080, endMinute: 1260, locationId: 'the_arena', activity: 'obligations. A photograph, a sponsor, ninety minutes of being pleasant' },
        { startMinute: 1260, endMinute: 1440, locationId: 'daigo_camp', activity: 'back at the warehouse, doing more work than anybody' },
      ],
      homeLocationId: 'daigo_camp',
      knowledgeScope: ['daigo', 'the_camp', 'the_red_floor', 'championship', 'his_right_hand'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 20, rivalry: 15 },
      gates: [
        { id: 'daigo_will_talk', label: 'He answers a real question about the work', kind: 'OTHER', requires: { respect: 50, flagsSet: ['spoke:daigo'] } },
        { id: 'daigo_will_step_on', label: 'He steps on with you, in that basement, with nobody recording', kind: 'OTHER', requires: { respect: 75, trust: 45 } },
      ],
      attributes: { might: 18, agility: 19, mind: 17, presence: 14, resolve: 19, arcana: 4 },
      companion: null,
      scouting: {
        learnRate: 2,
        cap: 10,
        revealCopy: 'He does the thing you were about to do, four inches earlier, and then steps out of the way of where you were going to be. He does not look pleased about it.',
      },
      combatant: { health: 120, defenseDc: 22, damage: 19, tags: ['champion'] },
    },
    {
      id: 'maki',
      name: 'Tetsuo Maki',
      role: 'Fifty-eight, owns Mikado, keeps the floor, and once asked a boxer for one more round and got it',
      cardBlurb:
        'He decides who steps on and he stops it when it needs stopping, and he is the only person in the building who has ever got that decision badly wrong. He will not tell you the story unless you ask, and if you ask he will tell you all of it in about four sentences.',
      pronouns: 'he/him',
      publicTraits: ['Patient until abruptly not', 'Hates a speech being made while somebody is bleeding', 'Says one sentence in a round and it is always the right one'],
      hiddenDrives: [
        'He wants to hand the room to somebody before he stops being able to keep it, and has not been able to say that out loud in four years',
        'He has never been able to decide whether keeping the floor open is atonement or repetition',
      ],
      values: [
        'Knowing what you are responsible for, which is the whole of his definition of strength and he has said it perhaps six times in twenty years',
        'Stopping it in time, which he has done four hundred times and got wrong once',
      ],
      fears: [
        'Doing it again. Not the same fight — the same decision, made the same way, for the same decent reasons',
        'The room becoming a show, which he would close it himself to prevent and has told nobody',
      ],
      socialStyle:
        'Economical and unhurried, with the dry humour arriving in the gaps. Corrects a fighter by standing next to them and moving one arm two inches rather than by explaining. Goes very quiet before he says the important thing.',
      boundaries: [
        'Will not let anybody step on who has not chosen it freely and does not know what they are choosing',
        'Will not say the sport did it, about Shinji or about anybody, and will correct somebody who does',
      ],
      goals: [
        'Get everybody who came down those stairs back up them',
        'Find somebody who can keep this room after him, which he is running out of time to do',
      ],
      secrets: [
        {
          id: 'maki_the_round',
          fact: 'Twenty years ago he argued a doctor out of stopping a championship fight because he believed Shinji Okabe could still win. He was given the round. Okabe survived it and never fought again.',
          visibility: 'FACTION',
          revealHint: 'He tells the whole of it, in about four sentences, to anybody who asks him directly, and does not soften any of it.',
        },
        {
          id: 'maki_the_book',
          fact: 'He keeps a school exercise book of every time he stopped one and every time he did not. The second list has four entries and one of them is dated twenty years ago.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He shows it to somebody he is considering handing the room to, and to nobody else, ever.',
        },
      ],
      speechStyle:
        'Short, flat and unadorned, with a dry joke landing about once every ten minutes and never during anything serious. Physical corrections instead of explanations. Refers to fighters by discipline and to Shinji by name. Says "I asked him for another round" in exactly the same voice he uses to ask whether you have eaten.',
      topics: ['the floor', 'Shinji', 'responsibility', 'who is stepping on', 'the gym', 'what you are for'],
      voiceSamples: [
        'Both of you agree, either of you can stop, I can stop it, and nobody touches anybody after. That is all of it. There is not a fifth rule.',
        'I asked him for another round. Not the sport. Me. I have had twenty years to find a better sentence and that is still the accurate one.',
        'Hands are fine. Feet are lazy. You are winning and you have stopped thinking, which is a thing that happens about eleven seconds before people get hurt.',
        'No speeches while he is bleeding. Get him sat down and then you can be profound at him.',
      ],
      appearance:
        'Fifty-eight, compact, very short grey hair, a nose broken twice, thick forearms, a plain black T-shirt in every weather, reading glasses on a cord that he uses for paperwork and nothing else.',
      visualHook: 'Reading glasses on a cord around the neck, permanently, on a man who is almost never reading.',
      silhouette: 'Standing at the edge of a mat with his arms folded and his weight on both feet, entirely still.',
      artSeed: 'rf-maki-01',
      portrait: null,
      expressions: ['neutral', 'dry', 'watchful', 'hard', 'grieving'],
      schedule: [
        { startMinute: 0, endMinute: 240, locationId: 'the_red_floor', activity: 'at the edge of the mats, watching, on a Sunday' },
        { startMinute: 240, endMinute: 420, locationId: 'the_office', activity: 'the office, the kettle, and paperwork he does at four in the morning' },
        { startMinute: 420, endMinute: 720, locationId: 'mikado_gym', activity: 'the morning class, eleven people, mostly beginners' },
        { startMinute: 720, endMinute: 1080, locationId: 'mikado_gym', activity: 'pads, corrections, and standing next to people moving one arm two inches' },
        { startMinute: 1080, endMinute: 1440, locationId: 'the_office', activity: 'the office with the door open, which is how anybody knows to come in' },
      ],
      homeLocationId: 'mikado_gym',
      knowledgeScope: ['maki', 'the_red_floor', 'mikado', 'shinji_okabe', 'the_rules', 'everybody_in_the_room'],
      startingRelationship: { trust: 20, affection: 10, respect: 25, fear: 10, rivalry: 0 },
      gates: [
        { id: 'maki_tells_you_about_shinji', label: 'He tells you the whole of it', kind: 'TRUST', requires: { trust: 45, flagsSet: ['spoke:maki'] } },
        { id: 'maki_shows_you_the_book', label: 'He shows you the four entries', kind: 'TRUST', requires: { trust: 70, respect: 68 } },
      ],
      attributes: { might: 13, agility: 10, mind: 16, presence: 15, resolve: 18, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 16, damage: 10, tags: ['coach', 'boxer'] },
    },
    {
      id: 'mei',
      name: 'Mei Hoshino',
      role: 'Thirty-two, sports physician, former high-level judoka, and the only person in this story whose no actually means no',
      cardBlurb:
        'A knee ended her competition at twenty-four and she was very bad at that for about three years. She loves this sport, which is exactly why she takes the damage seriously, and she can decline to clear you and it is not a suggestion.',
      pronouns: 'she/her',
      publicTraits: ['Says the number rather than the reassurance', 'Prints things rather than sending them', 'Turns up at the Red Floor and has never once reported it'],
      hiddenDrives: [
        'She wants to still be part of this, which is most of why she is standing in a basement at two in the morning unpaid',
        'She is frightened that she is going to be the one who says yes to somebody once, the way somebody said yes about her knee',
      ],
      values: [
        'Imaging over feelings, consistently, including about herself',
        'Fighters as people with a next forty years, which is a longer horizon than anybody else in this world uses',
      ],
      fears: [
        'Clearing somebody who should not have been cleared',
        'Becoming a person who is around the sport rather than in it, which she has already partly become and knows it',
      ],
      socialStyle:
        'Warm and blunt in the same sentence. Explains an injury properly, at length, in ordinary words, and then does not budge. Extremely funny about the sport and never funny about a scan.',
      boundaries: [
        'Will not have a coach diagnose a fighter in front of her, and has ended a working relationship over it',
        'Will not clear somebody because a fight is important. She has been asked eleven times and the answer has been the same eleven times',
      ],
      goals: [
        'Get Junpei to look at his own imaging, which she has been failing to achieve for fourteen months',
        'Keep being allowed in the room, because being told to leave would be worse for everybody than what she sees down there',
      ],
      secrets: [
        {
          id: 'mei_her_knee',
          fact: 'She was cleared to compete at twenty-four by somebody who should not have cleared her. She has the imaging from before and after and has never shown it to a patient.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows it to one person eventually, and it is whoever has just argued with her hardest about being cleared.',
        },
        {
          id: 'mei_junpei',
          fact: 'Junpei’s last two scans are why she started coming to the Red Floor. She is not there for the Red Floor. She is there because he is.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It falls out sideways when somebody asks her why a doctor is in a basement at two in the morning for free.',
        },
      ],
      speechStyle:
        'Warm, blunt and specific, with the medicine in ordinary words and no softening at the end of it. Gives a number and a timescale rather than an opinion. Funny about the culture of the sport and completely humourless about an injury, and the switch between those is abrupt.',
      topics: ['the imaging', 'her knee', 'Junpei', 'what you are carrying', 'clearing people', 'why she comes down here'],
      voiceSamples: [
        'Six weeks. Not four, not "how does it feel", six. I know it feels fine. It felt fine to me at twenty-four as well.',
        'You are all so proud of your pain tolerance. It is the least useful thing any of you have. Pain tolerance is how you arrive here later with something worse.',
        'I am not going to clear him. He can be furious with me, you can be furious with me, and the fight can go to somebody else. Those are all survivable and the other thing is not.',
        'Do not diagnose him at me. You are a coach. You are a very good coach. Stop talking about his orbital.',
      ],
      appearance:
        'Thirty-two, dark hair tied back, unglamorous practical clothes, a very slight hitch in the left knee that only shows on stairs, and a canvas bag with more in it than seems possible.',
      visualHook: 'A slight hitch on the left going up stairs, on somebody who is otherwise the most physically capable person in the room.',
      silhouette: 'Crouched at the level of whoever is sitting down, both hands on their jaw, entirely absorbed.',
      artSeed: 'rf-mei-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'blunt', 'absorbed', 'immovable'],
      schedule: [
        { startMinute: 0, endMinute: 240, locationId: 'the_red_floor', activity: 'against the wall with a bag at her feet, unpaid, on a Sunday' },
        { startMinute: 240, endMinute: 540, locationId: 'mei_clinic', activity: 'asleep in the office because there is a seven o’clock' },
        { startMinute: 540, endMinute: 1080, locationId: 'mei_clinic', activity: 'the clinic list, four athletes, one of whom will not be pleased' },
        { startMinute: 1080, endMinute: 1260, locationId: 'mikado_gym', activity: 'at Mikado, looking at three people who did not ask her to' },
        { startMinute: 1260, endMinute: 1440, locationId: 'mei_clinic', activity: 'back at the clinic, writing up' },
      ],
      homeLocationId: 'mei_clinic',
      knowledgeScope: ['mei', 'sports_medicine', 'her_knee', 'junpei', 'the_red_floor', 'everybodys_injuries'],
      startingRelationship: { trust: 30, affection: 15, respect: 25, fear: 0, rivalry: 0 },
      gates: [
        { id: 'mei_tells_you_about_her_knee', label: 'She shows you her own imaging', kind: 'TRUST', requires: { trust: 62, flagsSet: ['spoke:mei'] } },
        { id: 'mei_will_work_your_corner', label: 'She comes to your corner rather than to the wall', kind: 'ALLIANCE', requires: { trust: 70, respect: 60 } },
      ],
      attributes: { might: 12, agility: 12, mind: 18, presence: 14, resolve: 17, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: { health: 45, defenseDc: 14, damage: 7, tags: ['judoka'] },
    },
    {
      id: 'junpei',
      name: 'Junpei Arata',
      role: 'Thirty-four, former national champion, stopped twice in his last five, and frightened of Mondays',
      cardBlurb:
        'His reflexes are slower. Not dramatically, just enough, and everybody in that gym can see it including you and nobody has said it. He is not afraid of getting hurt. He is afraid of a Monday with no camp in it, and there is an envelope he has not opened in fourteen months.',
      pronouns: 'he/him',
      publicTraits: ['First in the gym every single morning', 'Generous with younger fighters to a degree that costs him time', 'Has not missed a day of roadwork in eleven years'],
      hiddenDrives: [
        'He has not looked at his own last two scans and has arranged fourteen months around not looking at them',
        'He wants somebody to tell him it is all right to stop, and would not believe them, and would need to hear it anyway',
      ],
      values: [
        'Enduring longer than the other person, which made him champion and is now the problem',
        'The gym, and everybody younger in it, whom he takes seriously in a way nobody took him',
      ],
      fears: [
        'A Monday with nothing in it',
        'Being the cautionary story people tell in this building after he stops coming',
      ],
      socialStyle:
        'Open, generous and entirely present with other people, and completely unable to be asked a direct question about himself. Redirects onto whoever else is in the room within about two sentences and does it so warmly nobody notices.',
      boundaries: [
        'Will not have his last two fights discussed in the gym, by anybody, and leaves the room',
        'Will not take a fight against somebody he thinks he would badly hurt, which is now a shorter list than it was',
      ],
      goals: [
        'One more camp. That is the entire goal and he can hold it for hours without saying it',
        'Get the eighteen-year-olds in that gym further than he got',
      ],
      secrets: [
        {
          id: 'junpei_the_scans',
          fact: 'Mei has his last two scans and he has not looked at either of them. She has offered eleven times. He changes the subject warmly and successfully every time.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it to somebody who does not ask him to look, and who says so.',
        },
        {
          id: 'junpei_the_belt',
          fact: 'The belt is in the bottom of a wardrobe in a flat with almost nothing else in it, still in the case, unopened since the second stoppage, and moved four times to the same relative position.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He mentions the wardrobe, once, as a joke about how little furniture he owns, and then stops.',
        },
      ],
      speechStyle:
        'Warm, easy and constantly deflecting, turning any question about himself into a question about the person asking within about two sentences. Talks about camps and roadwork and weight in enormous specific detail, because those are the parts he is allowed to talk about. Goes silent rather than lying.',
      topics: ['the camp', 'roadwork', 'the younger fighters', 'his last five', 'the belt', 'Mondays'],
      voiceSamples: [
        'Never mind me. What did you weigh this morning, and do not tell me what you weighed last night, I know what you weighed last night.',
        'Eleven years I have not missed a morning. Rain, flu, the week my father died, eleven years. That is not discipline any more, I know what it is now.',
        'The camp is the good part. Everybody thinks it is the fight. The fight is nine minutes. The camp is eight weeks of knowing exactly what you are for when you wake up.',
        'She has offered. Eleven times, and she is right, and I am going to keep not looking at it, and I would rather we talked about your left hook.',
      ],
      appearance:
        'Thirty-four, handsome and visibly worn, short dark hair going grey at the front, a scar across the left cheekbone, a compact welterweight build kept in absolute condition by a man who has nothing else in his week.',
      visualHook: 'A scar across the left cheekbone that he touches when he is deflecting a question.',
      silhouette: 'Standing behind a heavy bag holding it steady for somebody else, at six in the morning.',
      artSeed: 'rf-junpei-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'deflecting', 'proud', 'lost'],
      schedule: [
        { startMinute: 0, endMinute: 180, locationId: 'the_red_floor', activity: 'downstairs on the bench, not stepping on, watching the young ones' },
        { startMinute: 180, endMinute: 300, locationId: 'junpei_flat', activity: 'asleep, two hours, in a flat with nothing in it' },
        { startMinute: 300, endMinute: 480, locationId: 'the_waterfront', activity: 'roadwork, before anybody, eleven years without missing' },
        { startMinute: 480, endMinute: 1080, locationId: 'mikado_gym', activity: 'the gym, first in, holding bags for eighteen-year-olds' },
        { startMinute: 1080, endMinute: 1440, locationId: 'junpei_flat', activity: 'home, early, with the television off' },
      ],
      homeLocationId: 'junpei_flat',
      knowledgeScope: ['junpei', 'the_camp', 'his_record', 'mikado', 'the_belt', 'roadwork'],
      startingRelationship: { trust: 35, affection: 30, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        { id: 'junpei_stops_deflecting', label: 'He answers one question about himself', kind: 'TRUST', requires: { trust: 60, flagsSet: ['spoke:junpei'] } },
        { id: 'junpei_looks_at_it', label: 'He opens the envelope', kind: 'TRUST', requires: { trust: 72, respect: 65 } },
      ],
      attributes: { might: 15, agility: 13, mind: 13, presence: 14, resolve: 18, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: { health: 70, defenseDc: 15, damage: 13, tags: ['boxer', 'veteran'] },
    },
    {
      id: 'koji',
      name: 'Koji Namba',
      role: 'Twenty-eight, journeyman, works in his uncle’s print shop, has lost a great deal and loves this anyway',
      cardBlurb:
        'He is not secretly a genius and he may never be champion, and he has worked that out and kept coming for eleven years. He is the funniest person in the building because he likes people, and he is the one who will drive across the city at three in the morning if you ring him.',
      pronouns: 'he/him',
      publicTraits: ['Talks to absolutely everybody, including the new ones', 'Knows every regional card in four prefectures', 'Cheerfully specific about his own record'],
      hiddenDrives: [
        'He would like to be told, once, by somebody whose opinion counts, that the eleven years were not a waste',
        'He has started thinking about coaching and has not said it to anybody because saying it feels like conceding something',
      ],
      values: [
        'Getting better at a thing you love whether or not anybody puts your face on a poster',
        'The people. He is in this gym for the people at least as much as the fighting and has never pretended otherwise',
      ],
      fears: [
        'Being the joke rather than the person who makes them',
        'Stopping, and finding out that the eleven years were the whole of the friendship',
      ],
      socialStyle:
        'Immediately, genuinely friendly with everybody who comes through the door, which in this gym is a job nobody assigned him. Self-deprecating without fishing. Asks about your week and remembers the answer next Tuesday.',
      boundaries: [
        'Will not let anybody be sneered at in that gym for being new or bad, and is very direct about it once',
        'Will not pretend to be better than he is to make somebody feel good, including himself',
      ],
      goals: [
        'Take a regional title, once, which is genuinely within reach and has been for four years',
        'Work out whether the thing he actually loves is fighting or the building it happens in',
      ],
      secrets: [
        {
          id: 'koji_the_record',
          fact: 'Fourteen and nineteen. He tells everybody the fourteen and lets them assume, and if asked directly he gives both numbers immediately and without any performance about it.',
          visibility: 'FACTION',
          revealHint: 'Ask him. He will tell you in about a second and then ask about yours.',
        },
        {
          id: 'koji_the_coaching',
          fact: 'He has been unofficially coaching two of the teenagers for eight months and has not told Maki, because telling Maki would make it a thing he was doing instead of fighting.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Somebody catches him at it and he is immediately and visibly embarrassed, which is not like him at all.',
        },
      ],
      speechStyle:
        'Cheerful, fast and self-deprecating without ever fishing for a correction. Enthusiastic about other people’s fights in enormous detail and brisk about his own. Makes a joke, lets it land, and then asks the real question underneath it, which people miss about half the time.',
      topics: ['the print shop', 'his record', 'regional cards', 'the teenagers', 'why he does this', 'your week'],
      voiceSamples: [
        'Fourteen and nineteen. Yes, that way round. I tell people the fourteen first because I am a professional and that is called marketing.',
        'You want to know the good bit? The good bit is not winning. I have done winning fourteen times and it lasts about a day. The good bit is the Tuesday after, when you have worked out what went wrong.',
        'Nobody is putting my face on anything and I have made my peace with that at least four separate times, which is how you know I have not.',
        'Come on, one round, you can hit me, it is good for morale. I am doing you a favour and also I have not been hit yet this week and it makes me anxious.',
      ],
      appearance:
        'Twenty-eight, stocky, an amiable face that has been hit a great many times, ink under the fingernails from the print shop, and gym kit from about six different gyms none of which is his.',
      visualHook: 'Ink under the fingernails, permanently, on a man who wraps his hands four times a week.',
      silhouette: 'Sitting on the ring apron with his legs swinging, talking to somebody.',
      artSeed: 'rf-koji-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'enthusiastic', 'wry', 'stung'],
      schedule: [
        { startMinute: 0, endMinute: 240, locationId: 'the_red_floor', activity: 'downstairs, stepping on with anybody who will have him' },
        { startMinute: 240, endMinute: 480, locationId: 'the_arcade', activity: 'asleep over the arcade, four hours, alarm set for the shop' },
        { startMinute: 480, endMinute: 1020, locationId: 'koji_print_shop', activity: 'the day job, with his uncle, and the radio' },
        { startMinute: 1020, endMinute: 1320, locationId: 'mikado_gym', activity: 'the gym after work, and two teenagers he has not mentioned to anybody' },
        { startMinute: 1320, endMinute: 1440, locationId: 'the_arcade', activity: 'the convenience store, and whoever else is up' },
      ],
      homeLocationId: 'the_arcade',
      knowledgeScope: ['koji', 'the_print_shop', 'regional_cards', 'mikado', 'everybody_in_the_gym'],
      startingRelationship: { trust: 40, affection: 40, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        { id: 'koji_asks_the_real_question', label: 'He asks the thing under the joke', kind: 'TRUST', requires: { trust: 55, flagsSet: ['spoke:koji'] } },
        { id: 'koji_admits_the_coaching', label: 'He tells somebody about the teenagers', kind: 'TRUST', requires: { trust: 68, respect: 50 } },
      ],
      attributes: { might: 13, agility: 12, mind: 12, presence: 15, resolve: 16, arcana: 4 },
      companion: null,
      scouting: null,
      combatant: { health: 62, defenseDc: 14, damage: 10, tags: ['boxer', 'journeyman'] },
    },
  ],
  quests: [
    {
      id: 'q_step_on',
      title: 'Step On Or Do Not',
      summary: 'A storage level with red mats on it, twenty people against the wall, and two rules that between them are the whole of it.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['aya', 'maki', 'koji'],
      involvedLocationIds: ['mikado_gym', 'the_red_floor', 'the_office'],
      knownRewardCopy: 'Some idea of what that room is for, and of what you came down the stairs to find out.',
      steps: [
        {
          id: 'the_stairs',
          playerCopy: 'There is a woman at the top of the stairs wiping blood off her mouth with a hand wrap.',
          directorNotes:
            'She is amused rather than menacing and she is not recruiting anybody. The choice is genuinely open: go down, go home, ask what it is, or say what you do. Nobody in this world pressures anybody onto those mats, ever, and Maki will physically stop it if anybody tries.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_down',
              label: 'Go down the stairs',
              predicate: { flagsSet: ['visited:the_red_floor'] },
              setsFlags: ['went_down', 'saw_the_room'],
              closesFlags: [],
            },
            {
              routeId: 'asked_what_it_is',
              label: 'Ask her what is actually down there before you move',
              predicate: { flagsSet: ['spoke:aya'] },
              setsFlags: ['saw_the_room', 'asked_first'],
              closesFlags: [],
            },
            {
              routeId: 'said_what_you_do',
              label: 'Tell her what you are',
              predicate: { flagsSet: ['used:read_the_tell'] },
              setsFlags: ['saw_the_room', 'they_know_what_you_do'],
              closesFlags: [],
            },
            {
              routeId: 'went_home',
              label: 'Go home',
              predicate: { flagsSet: ['visited:mikado_gym'] },
              setsFlags: ['went_home_first_night'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['knows:the_room'], abilities: [], reputation: [{ factionId: 'faction_mikado', amount: 8 }] },
        },
        {
          id: 'the_first_time',
          playerCopy: 'Somebody has asked whether you want to step on.',
          directorNotes:
            'The first fight, whatever the player is. It is not a tournament and there is nothing at stake except finding out. Maki gives the rules in four sentences. Whoever they face is somebody from a different discipline and the mismatch is the content.',
          enterWhen: { flagsSet: ['knows:the_room'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'stepped_on',
              label: 'Step on',
              predicate: { flagsSet: ['used:read_the_tell'], atLocation: 'the_red_floor' },
              setsFlags: ['stepped_on', 'the_room_has_seen_you'],
              closesFlags: ['never_stepped_on'],
            },
            {
              routeId: 'watched_all_night',
              label: 'Sit on the bench and watch the whole thing',
              predicate: { atLocation: 'the_red_floor' },
              setsFlags: ['watched_all_night', 'knows:the_styles'],
              closesFlags: [],
            },
            {
              routeId: 'cornered_somebody',
              label: 'Work somebody else’s corner instead',
              predicate: { flagsSet: ['used:work_the_corner'], atLocation: 'the_red_floor' },
              setsFlags: ['cornered_somebody', 'the_room_has_seen_you'],
              closesFlags: [],
            },
            {
              routeId: 'said_no',
              label: 'Say no, in a room full of people, out loud',
              predicate: { flagsSet: ['knows:the_room'] },
              setsFlags: ['never_stepped_on'],
              closesFlags: ['stepped_on'],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['the_first_sunday_is_over'], abilities: [], reputation: [{ factionId: 'faction_floor', amount: 10 }, { factionId: 'faction_promotion', amount: 8 }] },
        },
      ],
    },
    {
      id: 'q_what_you_are',
      title: 'Find Out What You Are',
      summary: 'Eight weeks of roadwork, pads, sparring and being wrong about things, which is the part nobody puts in a montage.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['the_first_sunday_is_over'] },
      involvedCharacterIds: ['maki', 'riku', 'aya', 'koji'],
      involvedLocationIds: ['mikado_gym', 'the_waterfront', 'the_hill', 'the_red_floor'],
      knownRewardCopy: 'A style that is yours rather than one you were taught, and a room that has an opinion about it.',
      steps: [
        {
          id: 'put_the_work_in',
          playerCopy: 'Eight weeks. Nothing about them is interesting and they are the only thing that changes anything.',
          directorNotes:
            'Roadwork, the hill, pads with Maki, three rounds with whoever is up for it. Write one specific ordinary morning properly rather than a montage. The tendency system is doing real work here: what the player keeps reaching for becomes what they are known for.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'built_behind_the_jab',
              label: 'Build everything behind the lead hand',
              predicate: { flagsSet: ['used:work_the_jab', 'used:put_the_miles_in'] },
              setsFlags: ['style_settled', 'known_for_the_jab'],
              closesFlags: [],
            },
            {
              routeId: 'built_forward',
              label: 'Build it walking people down',
              predicate: { flagsSet: ['used:walk_them_down', 'used:put_the_miles_in'] },
              setsFlags: ['style_settled', 'known_for_pressure'],
              closesFlags: [],
            },
            {
              routeId: 'built_waiting',
              label: 'Build it out of waiting for the mistake',
              predicate: { flagsSet: ['used:wait_for_it', 'used:put_the_miles_in'] },
              setsFlags: ['style_settled', 'known_for_countering'],
              closesFlags: [],
            },
            {
              routeId: 'built_underneath',
              label: 'Build it out of taking people somewhere they have never been',
              predicate: { flagsSet: ['used:change_levels', 'used:put_the_miles_in'] },
              setsFlags: ['style_settled', 'known_for_the_shot'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['knows:what_you_do'], abilities: [], reputation: [{ factionId: 'faction_mikado', amount: 10 }] },
        },
        {
          id: 'somebody_solves_you',
          playerCopy: 'Somebody has been watching you do the same thing for eight weeks.',
          directorNotes:
            'The scouting payoff. Riku is the best at this and does it flatly and without malice. The lesson is not that the player’s style is wrong — it is that a style is a thing other people can read, and the answer is a second option rather than more commitment to the first.',
          enterWhen: { flagsSet: ['knows:what_you_do'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'found_a_second_thing',
              label: 'Come back with something they have not seen',
              predicate: { flagsSet: ['style_settled', 'used:read_the_tell'], atLocation: 'the_red_floor' },
              setsFlags: ['has_a_second_option', 'knows:what_it_costs'],
              closesFlags: [],
            },
            {
              routeId: 'went_through_it_anyway',
              label: 'Do the same thing harder',
              predicate: { flagsSet: ['used:stay_in_it'], atLocation: 'the_red_floor' },
              setsFlags: ['went_through_it', 'knows:what_it_costs'],
              closesFlags: ['has_a_second_option'],
            },
            {
              routeId: 'asked_him_how',
              label: 'Ask the person who solved you how they did it',
              predicate: { minRelationship: [{ characterId: 'riku', dimension: 'respect', value: 50 }] },
              setsFlags: ['has_a_second_option', 'riku_taught_you', 'knows:what_it_costs'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 140, items: [], flags: ['the_room_knows_you'], abilities: ['one_more_round'], reputation: [{ factionId: 'faction_floor', amount: 15 }, { factionId: 'faction_promotion', amount: 20 }] },
        },
      ],
    },
    {
      id: 'q_the_doctor',
      title: 'What The Imaging Says',
      summary: 'A physician who loves this sport, which is exactly why she will decline to clear you, and a veteran who has not looked at his own results in fourteen months.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['the_room_knows_you'] },
      involvedCharacterIds: ['mei', 'junpei', 'maki'],
      involvedLocationIds: ['mei_clinic', 'junpei_flat', 'mikado_gym'],
      knownRewardCopy: 'What you are actually carrying, and what somebody who has been carrying more of it for two years is going to do about his.',
      steps: [
        {
          id: 'get_looked_at',
          playerCopy: 'She has been watching you from the wall for six weeks and she has stopped being subtle about it.',
          directorNotes:
            'She explains properly, at length, in ordinary words, and then does not budge. If the imaging says something, it says it whether or not there is a fight coming. Arguing with her is a legitimate and losing move and she is not smug about winning it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_in',
              label: 'Go to the clinic and let her look',
              predicate: { flagsSet: ['spoke:mei'], atLocation: 'mei_clinic' },
              setsFlags: ['got_looked_at', 'knows:what_you_are_carrying'],
              closesFlags: [],
            },
            {
              routeId: 'argued_with_her',
              label: 'Argue, properly, about being cleared',
              predicate: { flagsSet: ['used:call_it'], atLocation: 'mei_clinic' },
              setsFlags: ['got_looked_at', 'knows:what_you_are_carrying', 'argued_with_mei'],
              closesFlags: [],
            },
            {
              routeId: 'avoided_her',
              label: 'Keep training and do not go',
              predicate: { flagsSet: ['used:put_the_miles_in'] },
              setsFlags: ['avoided_the_clinic'],
              closesFlags: ['got_looked_at'],
            },
          ],
          rewards: { xp: 90, items: [], flags: ['the_clinic_question_is_settled'], abilities: [], reputation: [] },
        },
        {
          id: 'the_envelope',
          playerCopy: 'There is an envelope a veteran has been not opening for fourteen months.',
          directorNotes:
            'He deflects warmly and successfully. There is no clever line that gets him to open it. What works is somebody not asking him to, and saying so, and sitting there. What he does with it afterwards is his.',
          enterWhen: { flagsSet: ['the_clinic_question_is_settled'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'sat_with_him',
              label: 'Do not ask him to open it, and say that out loud',
              predicate: { flagsSet: ['used:call_it'], minRelationship: [{ characterId: 'junpei', dimension: 'trust', value: 62 }] },
              setsFlags: ['junpei_opened_it', 'knows:what_it_costs'],
              closesFlags: ['junpei_took_the_fight'],
            },
            {
              routeId: 'cornered_him',
              label: 'Take his camp and corner him for it',
              predicate: { flagsSet: ['used:work_the_corner'], atLocation: 'mikado_gym' },
              setsFlags: ['junpei_took_the_fight', 'cornered_junpei'],
              closesFlags: ['junpei_opened_it'],
            },
            {
              routeId: 'told_maki',
              label: 'Take it to the man who has been here before',
              predicate: { minRelationship: [{ characterId: 'maki', dimension: 'trust', value: 55 }] },
              setsFlags: ['maki_stepped_in', 'junpei_opened_it'],
              closesFlags: [],
            },
            {
              routeId: 'left_it_alone',
              label: 'It is not yours. Leave it',
              predicate: { flagsSet: ['the_clinic_question_is_settled'] },
              setsFlags: ['junpei_took_the_fight'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 150, items: [], flags: ['the_veteran_is_answered'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_room_itself',
      title: 'The Room Itself',
      summary: 'The thing that makes it work is that nothing down there is written down, and that is a much more fragile arrangement than anybody in it admits.',
      kind: 'SIDE',
      startsActive: false,
      discoverWhen: { flagsSet: ['the_first_sunday_is_over'] },
      involvedCharacterIds: ['maki', 'riku', 'mei', 'aya'],
      involvedLocationIds: ['the_office', 'the_red_floor', 'the_arena'],
      knownRewardCopy: 'Whether the Red Floor is still there in a year, and who is keeping it.',
      steps: [
        {
          id: 'somebody_talks',
          playerCopy: 'A clip is going round that is definitely not from down there, and everybody has decided it is.',
          directorNotes:
            'Nobody did anything wrong and it is happening anyway. A promoter asks a question. A commission takes an unofficial view. Two people with contracts stop coming and neither of them announces it. This is the pressure the room actually dies of.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'killed_it_quietly',
              label: 'Make it go away without anybody being told off',
              predicate: { flagsSet: ['used:read_the_tell'], atLocation: 'the_arena' },
              setsFlags: ['the_heat_came_off'],
              closesFlags: ['the_room_is_exposed'],
            },
            {
              routeId: 'took_the_blame',
              label: 'Put your own name on it and take whatever comes',
              predicate: { flagsSet: ['used:call_it'] },
              setsFlags: ['the_heat_came_off', 'took_the_blame'],
              closesFlags: ['the_room_is_exposed'],
            },
            {
              routeId: 'let_it_run',
              label: 'Let it run and see what the room is worth',
              predicate: { flagsSet: ['the_first_sunday_is_over'] },
              setsFlags: ['the_room_is_exposed'],
              closesFlags: ['the_heat_came_off'],
            },
          ],
          rewards: { xp: 120, items: [], flags: ['the_room_was_tested'], abilities: [], reputation: [] },
        },
        {
          id: 'who_keeps_it',
          playerCopy: 'He is fifty-eight and he has been doing this for twenty-one years and he has never once raised it.',
          directorNotes:
            'He does not ask. He leaves the exercise book out, or a key on a bench, and waits to see whether anybody notices. Refusing is completely legitimate and he will not mention it again.',
          enterWhen: { flagsSet: ['the_room_was_tested'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_key',
              label: 'Take the key off the bench',
              predicate: { hasItems: ['gym_key'] },
              setsFlags: ['keeps_the_floor'],
              closesFlags: ['left_it_with_him'],
            },
            {
              routeId: 'read_the_book',
              label: 'Read the four entries and say something about them',
              predicate: { hasItems: ['the_floor_ledger'], minRelationship: [{ characterId: 'maki', dimension: 'trust', value: 68 }] },
              setsFlags: ['keeps_the_floor', 'read_the_book'],
              closesFlags: ['left_it_with_him'],
            },
            {
              routeId: 'left_it',
              label: 'Leave it on the bench',
              predicate: { flagsSet: ['the_room_was_tested'] },
              setsFlags: ['left_it_with_him'],
              closesFlags: ['keeps_the_floor'],
            },
          ],
          rewards: { xp: 160, items: [], flags: ['the_floor_question_is_settled'], abilities: [], reputation: [{ factionId: 'faction_mikado', amount: 20 }] },
        },
      ],
    },
    {
      id: 'q_the_top',
      title: 'The Top Of It',
      summary: 'There is a world champion an hour out of the city who came down those stairs once, four years ago, and cannot stop thinking about it.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['the_room_knows_you'] },
      involvedCharacterIds: ['daigo', 'riku', 'aya', 'maki'],
      involvedLocationIds: ['the_arena', 'daigo_camp', 'the_red_floor', 'the_weigh_in'],
      knownRewardCopy: 'Whatever is at the top of this, and whether you actually wanted it.',
      steps: [
        {
          id: 'get_in_front_of_him',
          playerCopy: 'Nobody gets into that camp without being brought.',
          directorNotes:
            'Three routes and they are not equivalent. The sanctioned road is slow, legitimate and public. Riku’s two years of tape is a gift with a reason behind it. Getting invited to the camp is the hardest and requires somebody vouching who does not do that.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'up_the_card',
              label: 'Do it the sanctioned way, on cards, in front of people',
              predicate: { flagsSet: ['style_settled'], minFactionReputation: [{ factionId: 'faction_promotion', value: 40 }] },
              setsFlags: ['in_front_of_him', 'came_up_the_card'],
              closesFlags: [],
            },
            {
              routeId: 'with_the_tape',
              label: 'Take two years of somebody else’s work and use it',
              predicate: { hasItems: ['atlas_tape'] },
              setsFlags: ['in_front_of_him', 'has_the_tape', 'knows:the_camp'],
              closesFlags: [],
            },
            {
              routeId: 'somebody_vouched',
              label: 'Have the man who keeps the floor make one telephone call',
              predicate: { minRelationship: [{ characterId: 'maki', dimension: 'respect', value: 68 }] },
              setsFlags: ['in_front_of_him', 'maki_vouched', 'knows:the_camp'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 180, items: [], flags: ['knows:the_champion'], abilities: [], reputation: [{ factionId: 'faction_promotion', amount: 15 }] },
        },
        {
          id: 'the_last_sunday',
          playerCopy: 'Decide where this happens, and what it is for.',
          directorNotes:
            'Four thousand seats and a broadcast, or twenty people against a wall in a basement with no cameras. They are entirely different acts and the world should make the player feel which one they wanted. Losing either is not a failure state.',
          enterWhen: { flagsSet: ['knows:the_champion'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'in_the_arena',
              label: 'Under the lights, sanctioned, with a belt on the line',
              predicate: { flagsSet: ['style_settled'], atLocation: 'the_arena' },
              setsFlags: ['fought_him_sanctioned', 'the_fight_happened'],
              closesFlags: [],
            },
            {
              routeId: 'on_the_mats',
              label: 'Downstairs, on the red mats, with nobody recording',
              predicate: { flagsSet: ['has_a_second_option'], atLocation: 'the_red_floor' },
              setsFlags: ['fought_him_downstairs', 'the_fight_happened'],
              closesFlags: [],
            },
            {
              routeId: 'did_not',
              label: 'Decide you have already found out what you came to find out',
              predicate: { flagsSet: ['knows:the_champion'] },
              setsFlags: ['did_not_take_it'],
              closesFlags: ['the_fight_happened'],
            },
          ],
          rewards: { xp: 220, items: [], flags: ['the_top_is_answered'], abilities: [], reputation: [{ factionId: 'faction_promotion', amount: 25 }] },
        },
        {
          id: 'what_you_are_now',
          playerCopy: 'Find out what this building has decided you are.',
          directorNotes:
            'The morning after. Nobody makes a speech. Somebody puts the kettle on. Whatever the player has become is visible in who talks to them differently and in what they are asked to do next week rather than in anything anybody says.',
          enterWhen: { flagsSet: ['the_top_is_answered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'beat_him',
              label: 'You beat him, and nobody can prove it',
              predicate: { flagsSet: ['fought_him_downstairs', 'has_a_second_option'] },
              setsFlags: ['beat_daigo', 'nobody_can_prove_it'],
              closesFlags: [],
            },
            {
              routeId: 'took_the_belt',
              label: 'You beat him with four thousand people watching',
              predicate: { flagsSet: ['fought_him_sanctioned'], minFactionReputation: [{ factionId: 'faction_promotion', value: 55 }] },
              setsFlags: ['beat_daigo', 'won_the_belt'],
              closesFlags: [],
            },
            {
              routeId: 'lost_and_stayed',
              label: 'You lost, and you were in the gym on Tuesday',
              predicate: { flagsSet: ['the_fight_happened'] },
              setsFlags: ['lost_and_stayed'],
              closesFlags: [],
            },
            {
              routeId: 'stopped',
              label: 'You stopped, while you were still capable',
              predicate: { flagsSet: ['did_not_take_it', 'used:call_it'] },
              setsFlags: ['stopped_on_purpose', 'left_the_map'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 260, items: [], flags: ['the_story_has_a_shape'], abilities: [], reputation: [{ factionId: 'faction_promotion', amount: 15 }, { factionId: 'faction_commission', amount: 15 }] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_clip',
      atWorldMinute: 3 * 1440 + 19 * 60,
      locationId: null,
      publicCopy:
        'Somebody posts eleven seconds of a basement with mats in it. It is not this basement. Four thousand people have decided it is by the following morning.',
      directorNotes:
        'Nobody in the room did anything wrong and it is happening anyway. This is the pressure the Red Floor actually dies of. Play it through what stops happening rather than through anybody being angry.',
      setsFlags: ['the_clip_went_round'],
      cancelledByFlags: ['the_heat_came_off'],
      requiresFlags: ['knows:the_room'],
      movesCharacters: [],
    },
    {
      id: 'we_riku_solves_you',
      atWorldMinute: 5 * 1440 + 1 * 60,
      locationId: 'the_red_floor',
      publicCopy:
        'He has not led once in two rounds and he has stepped off the third one before you threw it. He is not pleased about it and he is not showing off. He has simply watched you for eight weeks.',
      directorNotes:
        'The scouting payoff, delivered flatly. Whatever the player has been reaching for is now the thing that gets them hit. The answer is a second option rather than more conviction, and he will say so if asked.',
      setsFlags: ['riku_solved_you'],
      cancelledByFlags: ['has_a_second_option'],
      requiresFlags: ['knows:what_you_do'],
      movesCharacters: [{ characterId: 'riku', toLocationId: 'the_red_floor' }],
    },
    {
      id: 'we_junpei_takes_one',
      atWorldMinute: 6 * 1440 + 11 * 60,
      locationId: 'mikado_gym',
      publicCopy:
        'There is a date on the whiteboard in the office in handwriting nobody recognises, and Junpei has started running the hill twice.',
      directorNotes:
        'He has taken a fight. Mei has not cleared him and has not been asked. Nobody in the gym says anything for four days, which is itself the loudest thing in the building.',
      setsFlags: ['junpei_took_one'],
      cancelledByFlags: ['junpei_opened_it'],
      requiresFlags: ['the_first_sunday_is_over'],
      movesCharacters: [{ characterId: 'junpei', toLocationId: 'mikado_gym' }],
    },
    {
      id: 'we_aya_in_the_corridor',
      atWorldMinute: 8 * 1440 + 18 * 60 + 40,
      locationId: 'the_arena',
      publicCopy:
        'Aya is in a corridor at the arena, twenty minutes out, with her back against the wall and both hands flat on it, breathing in a pattern somebody taught her.',
      directorNotes:
        'The third time. She is managing it alone in about four minutes, as she has twice before. What the player does in the next thirty seconds decides the rest of that relationship, and doing nothing is a real option with a real cost.',
      setsFlags: ['saw_aya_in_the_corridor'],
      cancelledByFlags: [],
      requiresFlags: ['the_room_knows_you'],
      movesCharacters: [{ characterId: 'aya', toLocationId: 'the_arena' }],
    },
    {
      id: 'we_the_commission_asks',
      atWorldMinute: 9 * 1440 + 14 * 60,
      locationId: 'the_arena',
      publicCopy:
        'Somebody senior is asked, on the record, about unsanctioned bouts in Kurohama. The answer takes nine seconds and is entirely non-committal and everybody in the sport reads it correctly.',
      directorNotes:
        'Not a raid and not a threat. An official position forming. Fighters with contracts start being careful about being seen on those stairs, which is the first thing the room loses and the hardest to get back.',
      setsFlags: ['the_commission_noticed'],
      cancelledByFlags: ['the_heat_came_off', 'took_the_blame'],
      requiresFlags: ['the_clip_went_round'],
      movesCharacters: [],
    },
    {
      id: 'we_maki_leaves_the_book_out',
      atWorldMinute: 11 * 1440 + 3 * 60,
      locationId: 'the_office',
      publicCopy:
        'The office door is open at three in the morning, the light is on, and there is a school exercise book on the desk that is normally in a drawer that does not open.',
      directorNotes:
        'He does not ask. He leaves it out and waits to see whether anybody notices, which is the only way he has ever known how to offer anything. Not noticing is a completely legitimate outcome and he will never mention it.',
      setsFlags: ['the_book_was_left_out'],
      cancelledByFlags: ['keeps_the_floor'],
      requiresFlags: ['the_room_was_tested'],
      movesCharacters: [{ characterId: 'maki', toLocationId: 'the_office' }],
    },
    {
      id: 'we_daigo_comes_down',
      atWorldMinute: 13 * 1440 + 1 * 60 + 30,
      locationId: 'the_red_floor',
      publicCopy:
        'The room goes quiet at half past one on a Sunday because there is a man on the stairs in training kit with no logos on it who drove an hour to be here.',
      directorNotes:
        'He is courteous, brief and entirely without theatre. He is not here for the player specifically. He is here because six years is a long time to not be made to solve anything. Nobody records a second of it.',
      setsFlags: ['daigo_came_down'],
      cancelledByFlags: ['the_room_is_exposed'],
      requiresFlags: ['the_room_knows_you'],
      movesCharacters: [{ characterId: 'daigo', toLocationId: 'the_red_floor' }],
    },
    {
      id: 'we_koji_takes_a_regional',
      atWorldMinute: 15 * 1440 + 20 * 60,
      locationId: 'the_arena',
      publicCopy:
        'Koji is on the fourth fight of a regional card in front of about six hundred people, and eleven of them are from Mikado and they have made a banner, which he has asked them not to do.',
      directorNotes:
        'Genuinely within reach and genuinely not certain. Whether he wins is open. What matters is that this is his whole story and it is not a subplot to anybody in that gym, and the banner is terrible.',
      setsFlags: ['kojis_night'],
      cancelledByFlags: [],
      requiresFlags: ['the_room_knows_you'],
      movesCharacters: [{ characterId: 'koji', toLocationId: 'the_arena' }],
    },
    {
      id: 'we_somebody_gets_hurt',
      atWorldMinute: 17 * 1440 + 2 * 60,
      locationId: 'the_red_floor',
      publicCopy:
        'It stops at about two in the morning and everybody in the room knows it stopped four seconds later than it should have, including the man who stopped it.',
      directorNotes:
        'Nobody dies. Somebody is badly hurt and it is not dramatic — it is a person sitting on a bench being asked what day it is, and a doctor already halfway across the mats. Maki does not say anything for the rest of the night.',
      setsFlags: ['somebody_got_hurt', 'knows:what_it_costs'],
      cancelledByFlags: ['keeps_the_floor'],
      requiresFlags: ['the_room_was_tested'],
      movesCharacters: [
        { characterId: 'mei', toLocationId: 'the_red_floor' },
        { characterId: 'maki', toLocationId: 'the_red_floor' },
      ],
    },
    {
      id: 'we_the_offer',
      atWorldMinute: 19 * 1440 + 15 * 60,
      locationId: 'the_arena',
      publicCopy:
        'A matchmaker who has never spoken to you before knows your name, your last three and what you weigh, and would like to buy you a coffee about a card in October.',
      directorNotes:
        'Not a villain. A business with a product need and a shelf life in mind. The offer is real, the money is real, and everything in it that is bad for the player is in the parts nobody says out loud.',
      setsFlags: ['the_offer_came'],
      cancelledByFlags: ['stopped_on_purpose', 'left_the_map'],
      requiresFlags: ['the_room_knows_you'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_what_you_are',
      kind: 'FINALE',
      label: 'What you actually are, in a room where finding out costs nothing',
      seedHint: 'Somebody asks what you do, and then somebody asks whether you want to step on.',
      payoffHint: 'Twenty people against a wall, a man from a different discipline, and nobody writing any of it down.',
      weight: 1,
    },
    {
      id: 'p_one_more_round',
      kind: 'THEME',
      label: 'The round somebody asked for twenty years ago',
      seedHint: 'Eleven picture hooks on an office wall and one photograph hanging on the second from the left.',
      payoffHint: 'A school exercise book with four entries in the second list, and the earliest of them dated twenty years ago.',
      weight: 0.9,
    },
    {
      id: 'p_aya',
      kind: 'RELATIONSHIP',
      label: 'What actually happened before the semifinal',
      seedHint: 'She says everybody is brave on a Tuesday, and then flattens it before anybody can ask what she means.',
      payoffHint: 'A corridor at the arena, twenty minutes out, both hands flat on a wall, breathing in a pattern somebody taught her.',
      weight: 0.9,
    },
    {
      id: 'p_riku',
      kind: 'RIVAL',
      label: 'The prospect who keeps coming to a basement',
      seedHint: 'He trains somewhere with air conditioning and a sponsor board and he is on the wall down here every Sunday.',
      payoffHint: 'It is the only place he has ever been allowed to lose, and he made a two-year tape for somebody who is not him.',
      weight: 0.85,
    },
    {
      id: 'p_the_top',
      kind: 'BOSS',
      label: 'The man who came down these stairs four years ago',
      seedHint: 'Somebody says they heard a champion got dropped down here and nobody can prove it.',
      payoffHint: 'He drove an hour, at one in the morning, because six years is a long time to not be made to solve anything.',
      weight: 0.8,
    },
  ],
  archetypes: [
    {
      id: 'arch_boxer',
      name: 'You Box',
      role: 'Hands and distance',
      summary: 'Years of it, properly, with somebody who taught you feet first. You have never been held before and you are about to find out what that is like.',
      playstyle: ['Technical', 'Long range', 'Bad on the mat'],
      blurb: 'Everything you know is built on a lead hand and four inches of angle, and it works right up until somebody changes levels.',
      attributeBonus: { agility: 3, mind: 1 },
      skillProficiencies: { boxing: 3, ringcraft: 2 },
      startingItems: [{ itemId: 'hand_wraps', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_mikado', amount: 10 }],
    },
    {
      id: 'arch_kicker',
      name: 'You Kick',
      role: 'Legs, knees and the clinch',
      summary: 'Muay Thai or kickboxing, with a full toolbox and shins that have been conditioned by a great deal of unpleasantness. You cut space rather than chase people.',
      playstyle: ['Aggressive', 'Punishing', 'Slow to reset'],
      blurb: 'You have spent years teaching people that retreating badly is the most expensive thing they can do, and it has worked on almost everybody.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { kicking: 3, conditioning: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_floor', amount: 10 }],
    },
    {
      id: 'arch_grappler',
      name: 'You Grapple',
      role: 'Level changes and the mat',
      summary: 'Wrestling, judo or jiu-jitsu, at a level that means the floor is home. Everything changes the moment somebody’s hips go, and almost nobody down there has felt that.',
      playstyle: ['Close range', 'Relentless', 'Vulnerable coming in'],
      blurb: 'Every striker in that basement has a theory about what they would do if somebody got hold of them, and none of them has ever been held.',
      attributeBonus: { might: 2, resolve: 2 },
      skillProficiencies: { grappling: 3, conditioning: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_floor', amount: 10 }],
    },
    {
      id: 'arch_nothing',
      name: 'You Have Never Trained',
      role: 'Nerve and reading people',
      summary: 'Nothing formal, at all. What you have is that you do not panic and you notice things, which is worth considerably more than everybody in that room is about to assume.',
      playstyle: ['Untrained', 'Unreadable', 'Learns fast'],
      blurb: 'Everybody down there can tell what you do from how you wrap your hands. Nobody can tell anything about you, and for about three weeks that is genuinely an advantage.',
      attributeBonus: { resolve: 3, presence: 1 },
      skillProficiencies: { composure: 3, ringcraft: 1, corner: 1 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What do they put on the whiteboard?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Hana Odagiri' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What do you do?',
      helpText:
        'The discipline you walked in with, which sets what you are good at and what everybody in that room will assume about you. It is fixed for the whole story. It does not decide how good you get, what you end up known for, or whether you ever step on those mats at all.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What brought you up those stairs?',
      helpText: 'A record, a job, somebody who told you about it, or nothing at all. One plain sentence. Whatever you write, this gym will work with it.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I had eleven amateur fights and stopped four years ago and I have not told anybody why.',
    },
    {
      id: 'what_you_came_for',
      label: 'What are you here to find out?',
      helpText: 'A starting reason, not a commitment. It is the question the room exists to answer and you are allowed to change it.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'how_good', label: 'How good you actually are, with nothing on the line' },
        { id: 'whether_you_can', label: 'Whether you can still do it at all' },
        { id: 'beat_someone', label: 'Whether you can beat one specific person' },
        { id: 'the_craft', label: 'Nothing about yourself. You just love this' },
        { id: 'no_idea', label: 'You have no idea and that is why you came down' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does the room see on the stairs?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Somebody who came straight from work and is carrying a bag that is obviously not a gym bag.',
    },
  ],
  endings: [
    {
      id: 'end_strongest_in_the_room',
      name: 'The Strongest In The Room',
      rarity: 'RARE',
      minTurn: 44,
      requires: {
        flagsSet: ['beat_daigo', 'has_a_second_option'],
        minFactionReputation: [{ factionId: 'faction_floor', value: 55 }],
      },
      condition:
        'The people who actually know — four gyms, one commission, twenty people who were against a wall — have quietly settled on one answer to who the most formidable active fighter in this city is. Write it through how rooms change when the player walks in rather than through anybody saying it.',
      epilogue:
        'Nobody announces it. What happens is that within a year, sparring partners get harder to find, three gyms stop returning calls about work, and people who have never met the player have a strong opinion about their left hand. Somebody says they heard the champion got dropped in a basement. Nobody can prove it.',
      hint: '',
    },
    {
      id: 'end_atlas_falls',
      name: 'Atlas Falls',
      rarity: 'UNIQUE',
      minTurn: 44,
      requires: { flagsSet: ['beat_daigo', 'nobody_can_prove_it'] },
      condition:
        'They beat him downstairs, with nobody recording, which means it did not happen. This is the ending the whole room exists to make possible and it is the one with the least to show for it. He shakes hands, drives an hour home, and is world champion in the morning.',
      epilogue:
        'He comes back four more times over the next two years and never mentions why. He does not get bored again, and his right hand comes back, and two commentators remark on the improvement without ever locating the cause. The only two people who know what happened both prefer it that way.',
      hint: '',
    },
    {
      id: 'end_world_belt',
      name: 'World Belt',
      rarity: 'RARE',
      minTurn: 46,
      requires: {
        flagsSet: ['won_the_belt'],
        minFactionReputation: [{ factionId: 'faction_promotion', value: 60 }],
      },
      condition:
        'The sanctioned version, under the lights, with a broadcast and a commission and four thousand people. Everything the Red Floor is not. Write the machinery — the weigh-in, the walk, the two minutes in the dressing room — because that machinery is the thing this world has been holding at arm’s length for the whole story.',
      epilogue:
        'The belt goes in a case and the case goes somewhere, and within a fortnight there is a mandatory and a promoter with a date. The gym above the restaurant does not change at all, which is either the best or the worst thing about it depending on which morning you ask.',
      hint: '',
    },
    {
      id: 'end_red_floor',
      name: 'Red Floor',
      rarity: 'RARE',
      minTurn: 42,
      requires: { flagsSet: ['keeps_the_floor', 'the_heat_came_off'] },
      condition:
        'The room survived and the player is one of the people keeping it. This is an ending about responsibility rather than achievement: they now decide who steps on, and they are going to get that wrong at least once, and Maki will not tell them how to feel about it because nobody told him.',
      epilogue:
        'The exercise book gets a second hand in it. It runs every Sunday. Two of the people who stopped coming when the commission asked its question start coming again in the spring, which nobody remarks on. Four years later somebody new comes down those stairs and asks what this is, and gets four sentences.',
      hint: '',
    },
    {
      id: 'end_mikado',
      name: 'Mikado',
      rarity: 'RARE',
      minTurn: 44,
      requires: {
        flagsSet: ['the_story_has_a_shape'],
        minFactionReputation: [{ factionId: 'faction_mikado', value: 60 }],
        minRelationship: [{ characterId: 'maki', dimension: 'trust', value: 70 }],
      },
      condition:
        'The legacy is the gym rather than the fighting. Beginners, teenagers, the seven o’clock class, somebody’s first amateur bout. Write it as a real institutional achievement rather than as a consolation, because keeping a room like that open for twenty years is harder than any of the fighting in it.',
      epilogue:
        'The sign gets replaced, badly, by somebody who did it for free. Eleven people take their first amateur fight out of that building in four years and two of them are good. Maki comes in on Tuesdays and Thursdays and holds pads and corrects people by standing next to them and moving one arm two inches.',
      hint: '',
    },
    {
      id: 'end_aya_after_the_bell',
      name: 'Aya After The Bell',
      rarity: 'RARE',
      minTurn: 44,
      requires: {
        flagsSet: ['saw_aya_in_the_corridor'],
        minRelationship: [
          { characterId: 'aya', dimension: 'trust', value: 75 },
          { characterId: 'aya', dimension: 'affection', value: 75 },
        ],
      },
      condition:
        'Earned, and after the corridor rather than around it. She did not need rescuing and she did need somebody to be there and not make it a thing. Write their actual dynamic: two people who are dry with each other, still training, still competing, one of whom is managing something the other one now knows about.',
      epilogue:
        'It happens twice more in the first year and the second time she says so beforehand, which is new. She gets back to a semifinal in the autumn and is standing in the corridor for eleven minutes and goes out and wins it. Neither of them ever describes what they are to anybody at the gym and the gym worked it out in about a fortnight.',
      hint: '',
    },
    {
      id: 'end_coach',
      name: 'Coach',
      rarity: 'RARE',
      minTurn: 42,
      requires: {
        flagsSet: ['cornered_somebody', 'the_story_has_a_shape'],
        minRelationship: [{ characterId: 'koji', dimension: 'trust', value: 60 }],
      },
      condition:
        'The player became central to somebody else’s development, which is a different job and mostly consists of sixty seconds at a time. Do not write it as retirement. Write the specific difficulty of saying the useful thing instead of the encouraging one to somebody you like.',
      epilogue:
        'The two teenagers Koji had been quietly working with become four, and then a squad, and the squad has somebody in it who is going to be extremely good. In the corner the player says one sentence a round and it takes about three years to get consistently right.',
      hint: '',
    },
    {
      id: 'end_kojis_answer',
      name: 'Koji’s Answer',
      rarity: 'UNCOMMON',
      minTurn: 40,
      requires: { flagsSet: ['lost_and_stayed', 'the_story_has_a_shape'], flagsUnset: ['beat_daigo', 'won_the_belt'] },
      condition:
        'The player never became elite and built a long, full life around training, fighting and this building anyway, because they love the craft. This is not a consolation prize and must not carry one word of consolation in it. It is one of the two or three best outcomes available and the writing has to believe that.',
      epilogue:
        'Fourteen and nineteen becomes twenty-two and thirty-one over about nine years. There is a regional title in there somewhere and a photograph of it in the office on the fourth hook. On a Tuesday in about the eleventh year somebody new asks how long they have been doing this, and the honest answer takes a while.',
      hint: '',
    },
    {
      id: 'end_enough',
      name: 'Enough',
      rarity: 'UNCOMMON',
      minTurn: 42,
      requires: { flagsSet: ['stopped_on_purpose'], flagsUnset: ['somebody_got_hurt'] },
      condition:
        'They stopped while they were still entirely capable, because they had personally decided there was nothing left to find out. Nobody in this world has ever done that and everybody in it has thought about it. Do not have anybody try to talk them out of it and do not make it wistful.',
      epilogue:
        'It is not announced. They come in on the Tuesday, do the class, and do not put their name up for the Sunday, and after about six weeks somebody asks and gets a straight answer. Maki says one sentence about it, later, to somebody else, and it is the only time anybody has heard him sound envious.',
      hint: '',
    },
    {
      id: 'end_one_more_round',
      name: 'One More Round',
      rarity: 'COMMON',
      minTurn: 38,
      requires: { flagsSet: ['somebody_got_hurt', 'went_through_it'] },
      condition:
        'They went past a point somebody qualified had marked, and it cost something that does not come back. This is not a punishment for playing badly — it is reachable by being brave in exactly the way this sport rewards, which is the entire argument of the world. Nobody is inspiring about it afterwards.',
      epilogue:
        'The specifics vary and the shape does not: a scan, a conversation, a period of being told to rest that turns into a period of being told to stop. Maki does not say the sport did it. He says whose decision it was, and if the player argues he will let them, once.',
      hint: '',
    },
    {
      id: 'end_no_bell',
      name: 'No Bell',
      rarity: 'UNCOMMON',
      minTurn: 40,
      requires: { flagsSet: ['the_room_is_exposed'], flagsUnset: ['keeps_the_floor', 'the_heat_came_off'] },
      condition:
        'The protection went, the room became a show, and the player is what fills the gap. Unsanctioned, unlicensed and known for it. Write what is lost rather than what is gained: nobody down there can afford to lose any more, which means nobody down there is finding anything out.',
      epilogue:
        'Maki closes it in November rather than let it become what it was becoming, and does not explain that to anybody. Somebody else opens something similar within three months, in a different building, with a door charge. It is full every week and it is not the same thing and everybody who was in the old room knows exactly why.',
      hint: '',
    },
    {
      id: 'end_walk_away',
      name: 'Walk Away',
      rarity: 'COMMON',
      minTurn: 24,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['stopped_on_purpose', 'keeps_the_floor'] },
      condition:
        'They went home. Not after a defeat, not after an injury — they went up those stairs and did not come back, and the building carried on. This is a completely coherent response to a basement full of people hitting each other at two in the morning and it must not be redeemed later.',
      epilogue:
        'It takes the gym about three weeks to stop expecting them and about four months to stop mentioning them. Koji sends a message in the spring about a regional card and does not get one back and sends another one the following year anyway. The room runs every Sunday, exactly as it did before.',
      hint: '',
    },
  ],
  opening:
    'The first thing you hear is not a punch. It is laughter.\n\n' +
    'The gym is supposed to have been shut for four hours and there is light under the office door. Then something hits the floor below hard enough to bring dust off the speed-bag platform.\n\n' +
    'A woman comes out of the back with a white hand wrap pressed to the corner of her mouth. There is blood on the wrap and she does not appear to have noticed.\n\n' +
    'She looks at you. Then at the clock on the wall.\n\n' +
    '"Classes ended four hours ago."\n\n' +
    'Another impact from downstairs. Somebody down there says something and about fifteen people laugh.\n\n' +
    'She smiles.\n\n' +
    '"Unless you’re here for the other thing."',
  openingSuggestions: [
    'I nod at the wrap she is holding to her mouth. "You are bleeding, and you are pleased about something. What is the other thing?" I am not going down those stairs until somebody tells me what is at the bottom of them.',
    'I go past her towards the back stairs. "Then I am here for the other thing." I do not know what it is yet and I would rather find out from the doorway than from her.',
    '"Depends what it costs." I put my bag down where I am standing, which answers the question about whether I am leaving. "Because whatever is happening down there, nobody is upstairs writing any of it down, and I would like to know why that is."',
  ],
  publishedAt: '2026-09-10T11:00:00.000Z',
};

export const RED_FLOOR = StoryVersion.parse(raw);
