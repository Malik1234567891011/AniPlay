import { StoryVersion } from '@aniplay/contracts';

/**
 * "Second Skin" — sixteen, one choice, and a woman who has made it twice.
 *
 * The bible's most important design rule is that the first Affinity has to feel
 * enormous *before* the story admits it may not be final. So it is the
 * archetype: six shapes, chosen at the Heartstone, and every one of them
 * changes what the player can do, how the city reads them and what their
 * clothes are cut for. Nothing in the opening hours undercuts that.
 *
 * The second thing the bible is careful about is that the institution is not an
 * evil church. The Concord has prevented an enormous number of deaths, the
 * Seal was genuine emergency medicine after a genuine catastrophe, and most of
 * its people are helping. Its secret is that extracted secondary Echo energy
 * has quietly become load-bearing for ageing Heartstones, which means the
 * people it calls sick are keeping the cities standing. That is a material
 * incentive rather than a villain, and it is much harder to fight.
 *
 * The playable span is the Choosing and the weeks after it, in one city. The
 * capital, the ward under it and Kaia's brother are the far end of the map and
 * a run that never leaves Larkspire is a complete run.
 *
 * Three variables. Stamina is the only GOOD_HIGH. Suspicion is first among the
 * descending pair, because the generic cost path and PUBLIC_VIOLENCE both take
 * the first GOOD_LOW in array order and a sixteen-year-old doing something
 * impossible in a market street bringing the Wardens closer is exactly right.
 * Pull is the one the world is about: what the sealed shapes do when they are
 * asked to come back.
 */

const raw = {
  id: 'sv_second_skin_1',
  storyId: 'story_second_skin',
  version: 1,
  title: 'Second Skin',
  fantasyLabel: 'One body. One shape. Choose at sixteen.',
  hook: 'Everybody in this world chooses which animal they become at sixteen and keeps it for life, and at your ceremony a woman drops through the roof with two.',
  premise:
    'On your sixteenth birthday you put your hand on a living stone under the city and it shows you the shapes your body could settle into.\n\n' +
    'You pick one. Everybody does. It is the largest decision anybody here makes and it is made at sixteen, in front of your family, in about ninety seconds.\n\n' +
    'Then your ears change, or your eyes, or the bones in your hands, over the weeks that follow, and that is who you are for the rest of your life.\n\n' +
    'Everybody knows one body holds one shape. Everybody knows a second one is an illness that takes your mind or kills you, and there is a whole institution that treats the people it happens to, and it has been doing that for seven hundred years.\n\n' +
    'At the ceremony that evening a window comes in and a woman drops into the hall with wardens behind her. She has snow-leopard ears and a long spotted tail, and black feathers come up her left forearm while four hundred people are watching.\n\n' +
    'She is not here for you. She is here for something underneath this building, so by the end of the night you need to decide what you are going to say you saw.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Coming of age', 'High fantasy', 'Supernatural', 'Rivalry'],
  mechanicsChips: [
    'Six shapes, or one of your own',
    'Traits change ordinary life',
    'The institution is not evil',
    'A second one is possible',
    'Your first choice always counts',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'MORAL_AMBIGUITY', 'PSYCHOLOGICAL_THEMES', 'ROMANCE'],
  intensity: 'MODERATE',
  creatorNote:
    'Your first shape is not a starter you outgrow. It is your ears, your hands, your sleep, what doorways are built for and how the whole city reads you before you speak, and it stays yours unless you deliberately give it up. Everything else in this story argues with itself about what that should mean.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'heartstone_hall',
    startWorldMinute: 19 * 60 + 30,
    startingItems: [{ itemId: 'choosing_cord', qty: 1 }],
    hardCanon: [
      'Every Kin child is born Unsettled and chooses one Affinity at a Heartstone at about sixteen. Adult traits settle over the following weeks.',
      'The Choosing does not only strengthen one Affinity. It also seals the others, which is why adult traits stay stable, and most people do not know that is what it is.',
      'The Seal was invented seven centuries ago as emergency medicine during the Manyskin Fever, and it saved millions. This is genuine history and not propaganda.',
      'A second Affinity is possible, it is genuinely dangerous, and it is survivable. All three of those are true at once.',
      'Kaia Voss is Twiceborn — Snow Leopard and Raven — a former Roadwarden, and wanted. She is an adult and the player is sixteen, and the story never frames that as romantic.',
      'The Concord is not an evil church. Most of its people help. Its secret is that extracted secondary Echo energy stabilises ageing Heartstones, which gives it a material reason to keep calling Twiceborn sick.',
      'The player is not secretly the most important record in the Ledger. Whatever is special about them is what they do.',
    ],
    toneGuide:
      'Late-medieval fantasy city that has been built for a dozen different bodies: doorways with tail clearance, landing rails on the rooftops, warm rooms for Serpents, chairs in four back designs. Show it rather than explaining it. ' +
      'Beastfolk in the anime sense — mostly human, with ears, tail, eyes, fangs, patches of fur or feathers — and the intensity varies enormously between individuals and is the player’s to set. ' +
      'The traits matter most in ordinary life. Hearing an argument three floors down. Not being able to sleep in the heat. A tail knocking a cup off a table for the eleventh time. Somebody’s ears going flat before they have decided to be upset. ' +
      'Instinct creates conflict rather than excusing anything. Nobody in this world gets to say "it is my Affinity" and be let off. ' +
      'The Concord is staffed by people who are trying. Ilyra is a good officer doing a lawful job. Edran is persuasive and sincere. If either reads as a villain, the world has failed.',
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 11, agility: 13, mind: 12, presence: 12, resolve: 13, arcana: 12 },
  skills: [
    { id: 'affinity', name: 'Affinity', attribute: 'arcana', description: 'Using what your body has become, deliberately, rather than letting it happen to you.' },
    { id: 'climb', name: 'Climbing', attribute: 'agility', description: 'Walls, rails, rooftops and the vertical half of a city built for people who can do this.' },
    { id: 'track', name: 'Tracking', attribute: 'mind', description: 'Scent, sound, the trace somebody left an hour ago and the thing three streets away that nobody else has heard.' },
    { id: 'talk', name: 'Talking', attribute: 'presence', description: 'Getting a real answer out of an adult who has decided you are sixteen and therefore not in the conversation.' },
    { id: 'lore', name: 'Kin Lore', attribute: 'mind', description: 'Echoes, Seals, Heartstones and seven hundred years of medicine that is mostly right.' },
    { id: 'blade', name: 'The Blade', attribute: 'might', description: 'What everybody on a road carries, used badly at sixteen and better at nineteen.' },
    { id: 'steady', name: 'Holding Steady', attribute: 'resolve', description: 'Staying yourself while something underneath is asking, insistently, to come up.' },
  ],
  resources: [
    {
      id: 'stamina',
      name: 'Stamina',
      max: 100,
      start: 82,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'Nothing left, and in a body this new that shows in the traits before it shows anywhere else. Ears down, tail low, pupils wrong, and every Kin within twenty feet reading all of it without meaning to.',
      color: '#7EA36B',
      bands: [
        {
          upTo: 24,
          behaviour:
            'Empty. The senses go first — hearing narrows, scent turns to noise, and the new body starts doing things without being asked. This is the band where an adult mistakes exhaustion for the beginning of something much worse, and where sleeping in a warm room is genuinely the correct move.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a body four weeks old. Good for one climb or one difficult conversation and honest about not being good for both. Everything works and everything is a beat late, and the traits are slightly louder than the player intends.',
        },
        {
          upTo: 100,
          behaviour:
            'Whole. The new senses are an advantage rather than a distraction, the climbing city is genuinely a city, and the player can be in a room full of adults and hold their own in it. Scenes can be long and can go somewhere.',
        },
      ],
    },
    {
      id: 'suspicion',
      name: 'Suspicion',
      max: 100,
      start: 16,
      regenPerHour: -0.35,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'You are a sixteen-year-old who settled last month. Wardens nod at you in the street. Nobody at the Concord house knows your name and there is no reason at all that they should.',
      color: '#4F6FA8',
      bands: [
        {
          upTo: 28,
          behaviour:
            'Nobody is looking. A newly settled sixteen-year-old is the least interesting thing in Larkspire and that is an enormous practical advantage. Doors open, people talk in front of them, and a Warden who sees them on a roof assumes they are showing off.',
        },
        {
          upTo: 58,
          behaviour:
            'A name in a report. Somebody at the Concord house has asked a question and somebody at the Warden post has answered it. Nothing has happened. The player is now the sort of person who gets stopped, politely, and asked where they are going.',
        },
        {
          upTo: 82,
          behaviour:
            'A live interest. Ilyra Morn knows the name and has read the file, the family has been visited once, and there is a standing instruction about the player’s movements that nobody has told them about. Friends start being careful about being seen with them.',
        },
        {
          upTo: 100,
          behaviour:
            'A subject rather than a citizen. There is a warrant, or a medical order, or both, and the difference between those two is smaller than anybody admits. Everything from here happens at night, on roofs, and to people who are taking a risk by knowing them.',
        },
      ],
    },
    {
      id: 'pull',
      name: 'Pull',
      max: 100,
      start: 10,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'One shape, settled, quiet. The Seal is doing what it was built to do and the player has no idea it is there, which is the ordinary experience of every adult in this world.',
      color: '#9A5FA8',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Settled. Whatever else is under there is asleep and stays asleep. The player is exactly what they chose, all the way down, and the only cost of that is one they will never notice.',
        },
        {
          upTo: 55,
          behaviour:
            'Something is awake and polite about it. A preference that is not theirs — a height, a temperature, a sound they keep turning towards. A dream about a body that is not the one they picked. Nothing visible, and other Kin start standing slightly differently around them without knowing why.',
        },
        {
          upTo: 80,
          behaviour:
            'It is coming up. Traits that were not chosen appearing for seconds at a time under stress and going again, which is the exact thing every child in this world is taught to be frightened of. Sai’s protocol works in this band. The Concord’s does not, and the Concord’s is the one that is legal.',
        },
        {
          upTo: 100,
          behaviour:
            'Two shapes arguing over one body, without a protocol, in a person who is sixteen. This is the band the Seal exists because of, and the world must be willing to let it go badly. It is survivable and it is not survivable alone, and the only people who know how are wanted or employed by the institution.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'choosing_cord',
      name: 'Your Choosing Cord',
      tags: ['personal'],
      questItem: true,
      droppable: false,
      description: 'Braided by somebody in your family over the eleven days before your birthday, in whatever colours they thought you were going to pick, and worn on the wrist for a year afterwards.',
      loreText: 'Everybody notices what colour somebody else’s cord is and nobody ever mentions it. About a third of them are the wrong colour and those are the ones people are careful about.',
      icon: 'cord',
    },
    {
      id: 'warden_coat',
      name: 'A Roadwarden Coat',
      tags: ['clothing'],
      equipSlot: 'body',
      skillModifiers: { climb: 1, talk: 1 },
      description: 'Charcoal-red, cut short at the back for movement and for a tail, with four inside pockets and a collar that has been turned up so often it stays there.',
      loreText: 'It is not a uniform any more. Roadwardens keep the coat when they leave and everybody on a road in Avara knows what it means, which is occasionally useful and occasionally the opposite.',
      icon: 'coat',
    },
    {
      id: 'crystal_leaf',
      name: 'A Leaf From The Ledger',
      tags: ['quest', 'evidence'],
      questItem: true,
      skillModifiers: { lore: 2 },
      description: 'A palm-sized wafer of Heartstone crystal holding one Choosing record: the shape somebody picked, and — underneath it, in the same impression — the four they did not.',
      loreText: 'Every leaf has the sealed shapes on it. That is the whole thing. It is not a list of the sick; it is a list of everybody, and it has been kept in a locked room under a hall for seven centuries.',
      icon: 'crystal',
    },
    {
      id: 'sai_protocol',
      name: 'The Unpublished Protocol',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'Nineteen pages of dosing, timing and observation for bringing a second Echo up slowly instead of pushing it down. Survival figures at the back, in a column, next to the official ones.',
      loreText: 'He has run it eleven times unofficially. Nine of those people are alive and settled with two shapes and living somewhere under a different name.',
      icon: 'papers',
    },
    {
      id: 'lio_manifest',
      name: 'A Supply Manifest',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'A routine requisition for a ward under the capital, signed off against a patient number belonging to somebody the Concord told a family had died fourteen months ago.',
      loreText: 'It is not evidence of cruelty. It is evidence of paperwork, which is worse, because paperwork means it is normal and somebody does it every week.',
      icon: 'papers',
    },
    {
      id: 'black_feather',
      name: 'A Black Feather Charm',
      tags: ['personal'],
      skillModifiers: { steady: 1 },
      description: 'A single primary feather on a cord, worn at the neck by somebody who has two shapes and has stopped pretending otherwise. Given rather than bought.',
      loreText: 'She started wearing it about a month after the avalanche, before she had told anybody, which is how her brother worked it out first.',
      icon: 'feather',
    },
    {
      id: 'settling_draught',
      name: 'A Settling Draught',
      tags: ['medicine'],
      consumable: { resourceId: 'stamina', amount: 26, consumesItem: true },
      description: 'Bitter, warm, and handed out free at every Concord house in Avara to anybody in their first year after a Choosing. It genuinely helps and it is genuinely not only doing that.',
      loreText: 'It eases the settling and it also firms the Seal, and the second thing is on no label anywhere and is known to about four hundred people.',
      icon: 'bottle',
    },
    {
      id: 'road_bread',
      name: 'Bread And Hard Cheese',
      tags: ['food'],
      consumable: { resourceId: 'stamina', amount: 18, consumesItem: true },
      description: 'What everybody on a road in this country eats, in a cloth, bought at a market stall from somebody who assessed your Affinity and adjusted the portion without asking.',
      loreText: 'Bear portions are enormous and cost the same, which is a Larkspire market convention that nobody has ever written down.',
      icon: 'bread',
    },
  ],
  abilities: [
    {
      id: 'use_what_you_are',
      name: 'Use What You Are',
      tags: ['sight'],
      description: 'Deliberately reach for what your body has become — the hearing, the nose, the balance, the eyes — instead of letting it happen at you.',
      affordances: ['listen', 'smell', 'look', 'use my senses', 'sense', 'focus', 'what can i hear', 'track it'],
      costs: [{ resourceId: 'stamina', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'affinity', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'take_the_high_way',
      name: 'Take The High Way',
      tags: ['movement'],
      description: 'Rails, gutters, bridge arches and the vertical half of a city that was built on the assumption that some of its people can do this.',
      affordances: ['climb', 'run', 'jump', 'take the roofs', 'get up there', 'chase', 'go over'],
      costs: [{ resourceId: 'stamina', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'climb', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'get_them_talking',
      name: 'Get Them Talking',
      tags: ['social'],
      description: 'Get a real answer out of an adult who has already decided you are sixteen and therefore not part of the conversation.',
      affordances: ['ask', 'talk to them', 'question', 'persuade', 'find out', 'get them talking', 'convince'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'talk', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'work_it_out',
      name: 'Work It Out',
      tags: ['sight'],
      description: 'Echoes, Seals, dosages and seven hundred years of medicine that is mostly right, applied to the specific thing in front of you.',
      affordances: ['think', 'remember', 'what do i know', 'study it', 'read', 'research', 'work it out'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'lore', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'put_yourself_in_the_way',
      name: 'Put Yourself In The Way',
      tags: ['defensive'],
      description: 'Get between somebody and the thing coming at them, with a body four weeks old that you have not finished learning.',
      affordances: ['protect', 'defend', 'block', 'get between', 'shield them', 'stand in front', 'cover'],
      costs: [{ resourceId: 'stamina', amount: 9 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'blade', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_at_them',
      name: 'Go At Them',
      tags: ['offensive'],
      description: 'Claws, weight, teeth or a blade, in a city that has a word for a Kin who uses their Affinity on somebody in the street.',
      affordances: ['attack', 'fight', 'hit them', 'claws', 'strike', 'go for them', 'draw'],
      costs: [
        { resourceId: 'stamina', amount: 11 },
        { resourceId: 'suspicion', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'blade', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_it_down',
      name: 'Hold It Down',
      tags: ['healing'],
      description: 'Something underneath is asking to come up. Sit with it, breathe the way you were taught at the ceremony, and stay the shape you chose.',
      affordances: ['hold on', 'stay steady', 'push it down', 'control it', 'breathe', 'keep it together', 'resist it'],
      costs: [{ resourceId: 'stamina', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'steady', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'let_it_up',
      name: 'Let It Up',
      tags: ['offensive'],
      description: 'Stop holding, and let the shape you did not choose have four seconds. Everything about it works and everything about it costs, and everybody watching will remember.',
      affordances: ['let it out', 'let it up', 'stop holding it', 'give in to it', 'use the other one', 'change'],
      costs: [
        { resourceId: 'stamina', amount: 14 },
        { resourceId: 'pull', amount: 22 },
        { resourceId: 'suspicion', amount: 12 },
      ],
      cooldownMinutes: 360,
      targetRule: 'SELF',
      check: { attribute: 'arcana', skillId: 'steady', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:there_is_something_under_it'],
        lockedCopy: 'There is nothing under it. You chose a shape at a stone under a hall and that is what you are, and everybody you have ever met would tell you the same thing.',
      },
    },
    {
      id: 'walk_it_off',
      name: 'Walk It Off',
      tags: ['survival'],
      description: 'A warm room, a settling draught, somebody to sit with, and about three days of nothing happening. It is the only thing that quiets what is underneath and there is never time.',
      affordances: ['rest', 'sleep', 'take a day', 'sit down', 'recover', 'stay put', 'lie low'],
      costs: [{ resourceId: 'stamina', amount: 2 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'run_the_protocol',
      name: 'Run The Protocol',
      tags: ['healing'],
      description: 'Nineteen pages of dosing and timing that bring a second Echo up slowly instead of pushing it down. It is unpublished, it is illegal, and it works.',
      affordances: ['use the protocol', 'integrate', 'follow the pages', 'treat it', 'do it properly', 'the slow way'],
      costs: [{ resourceId: 'stamina', amount: 12 }],
      cooldownMinutes: 720,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'lore', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['has_the_protocol'],
        lockedCopy: 'The only method you have heard of is the Concord’s, which works by pushing it back down, and which is the reason there is a ward under the capital.',
      },
    },
  ],
  locations: [
    {
      id: 'heartstone_hall',
      name: 'The Heartstone Hall',
      shortName: 'The Hall',
      description:
        'Pale stone, four hundred people and a gallery running round three sides at the height a Hawk would use. In the floor at the centre, under a grating, is the top of something the size of a house that is faintly warm and is not, quite, a mineral.',
      artDirection:
        'Vast pale-stone ceremonial hall, upper galleries with landing rails, four hundred beastfolk in formal dress of many builds, a grated opening in the floor glowing faintly warm at the centre, high windows. Grand, communal, a little too warm.',
      connections: [
        { to: 'larkspire_market', travelMinutes: 5, label: 'Out into the market streets' },
        { to: 'the_undercroft', travelMinutes: 4, lockedByFlag: 'knows:the_undercroft', label: 'The stair behind the grating' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [],
    },
    {
      id: 'larkspire_market',
      name: 'The Market Streets',
      shortName: 'Market',
      description:
        'Pale stone and red tile, canals, hanging gardens and a crowd built out of about forty different body plans. The doorways have tail clearance, the stall counters come at three heights, and nobody has remarked on any of that in six hundred years.',
      artDirection:
        'Crowded fantasy market city street, pale stone and red tile, canals and arched bridges, hanging gardens, diverse beastfolk crowd of many builds, stalls at multiple heights, vertical walkways above. Bright, busy, thoughtfully built.',
      connections: [
        { to: 'heartstone_hall', travelMinutes: 5, label: 'Back to the hall' },
        { to: 'player_home', travelMinutes: 7, label: 'Home' },
        { to: 'the_rails', travelMinutes: 4, label: 'Up onto the rails' },
        { to: 'warden_post', travelMinutes: 8, label: 'The Warden post' },
        { to: 'concord_house', travelMinutes: 9, label: 'The Concord house' },
        { to: 'the_canal_quarter', travelMinutes: 6, label: 'Down to the water' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'road_bread', qty: 3, ownerId: null, aka: ['bread', 'food', 'cheese', 'something to eat'] },
      ],
    },
    {
      id: 'player_home',
      name: 'Home',
      shortName: 'Home',
      description:
        'Three rooms up a stair with a bend in it, chairs in two different back designs, a doorway that somebody widened eleven years ago for a relative, and a cord in your family’s colours that took eleven days to braid.',
      artDirection:
        'Modest fantasy family home interior, warm lamplight, furniture in several different designs for different bodies, a braided cord hanging by a door, cooking things, a window onto a tiled roofscape. Warm, ordinary, specific.',
      connections: [{ to: 'larkspire_market', travelMinutes: 7, label: 'Down into the streets' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'settling_draught', qty: 2, ownerId: null, aka: ['the draught', 'medicine', 'the bottle'] },
      ],
    },
    {
      id: 'the_rails',
      name: 'The Rails',
      shortName: 'Rails',
      description:
        'The upper city: landing rails on every third roof, rope walks, gutters wide enough to run, and an entire second set of streets that about a third of the population uses daily and the rest have never been on.',
      artDirection:
        'Fantasy city rooftops with purpose-built landing rails and rope walkways, red tile and pale stone, winged and climbing beastfolk moving above the street level, evening light. Vertical, communal, exhilarating.',
      connections: [
        { to: 'larkspire_market', travelMinutes: 4, label: 'Down into the streets' },
        { to: 'the_canal_quarter', travelMinutes: 5, label: 'Along and down to the water' },
        { to: 'concord_house', travelMinutes: 7, label: 'Over to the Concord roof' },
        { to: 'the_far_road', travelMinutes: 14, label: 'Out over the wall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'the_canal_quarter',
      name: 'The Canal Quarter',
      shortName: 'Canals',
      description:
        'Where the water and the trade meet: barges, warm rooms let by the week to Serpents and anybody else who wants one, an eel market, and about eleven inns whose keepers have all agreed not to ask anybody anything.',
      artDirection:
        'Fantasy canal district at night, barges and stone quays, warm lamplit inn windows, steam from a bathhouse, mixed crowd, laundry over the water. Close, damp, discreet.',
      connections: [
        { to: 'larkspire_market', travelMinutes: 6, label: 'Up into the market' },
        { to: 'the_rails', travelMinutes: 5, label: 'Up onto the rails' },
        { to: 'sai_infirmary', travelMinutes: 6, label: 'Round to the infirmary' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'warden_post',
      name: 'The Warden Post',
      shortName: 'Wardens',
      description:
        'Navy and gold, a duty desk, a board of notices and eleven people whose actual job is stopping civilians being hurt and who are extremely good at it. There is one notice on that board with a snow leopard on it.',
      artDirection:
        'Fantasy city guard post interior, navy and gold livery, a duty desk and a notice board with hand-drawn wanted bills, racked weapons, tired competent officers. Institutional, orderly, not sinister.',
      connections: [
        { to: 'larkspire_market', travelMinutes: 8, label: 'Back into the market' },
        { to: 'concord_house', travelMinutes: 5, label: 'Across to the Concord house' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'concord_house',
      name: 'The Concord House',
      shortName: 'Concord',
      description:
        'Green and cream, a waiting hall with forty people in it on any given morning, free draughts for anybody in their first year, and a records floor above that is the only part of the building with a lock on the door.',
      artDirection:
        'Fantasy institutional infirmary and records house, green and cream, a busy waiting hall with a mixed crowd, shelves of crystal wafers behind a grille upstairs, clean and calm. Benign, official, quietly enormous.',
      connections: [
        { to: 'larkspire_market', travelMinutes: 9, label: 'Back to the market' },
        { to: 'warden_post', travelMinutes: 5, label: 'Over to the Warden post' },
        { to: 'the_rails', travelMinutes: 7, label: 'Up onto the roof' },
        { to: 'the_undercroft', travelMinutes: 11, lockedByFlag: 'knows:the_undercroft', label: 'Down, a long way, under the hall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 2 },
      takeableItems: [
        { itemId: 'settling_draught', qty: 3, ownerId: null, aka: ['a draught', 'medicine', 'the free ones'] },
      ],
    },
    {
      id: 'sai_infirmary',
      name: 'The Infirmary On The Water',
      shortName: 'Infirmary',
      description:
        'Two rooms over a boat-builder, run by a Concord physician who is officially doing outreach and unofficially doing something else. Warm, lamplit, smelling of the things Serpents keep their rooms smelling of, and open at hours the Concord house is not.',
      artDirection:
        'Small warm fantasy infirmary above a workshop, herb bundles and glass instruments, a treatment couch, notes in a careful hand pinned everywhere, canal light through a low window. Cramped, competent, secretive.',
      connections: [{ to: 'the_canal_quarter', travelMinutes: 6, label: 'Back down to the canals' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [
        { itemId: 'sai_protocol', qty: 1, ownerId: 'sai', aka: ['the protocol', 'the pages', 'the papers', 'the nineteen pages'] },
      ],
    },
    {
      id: 'the_undercroft',
      name: 'The Undercroft',
      shortName: 'Undercroft',
      description:
        'Under the hall, around the top of the thing itself, which is warm and enormous and moves about eleven times an hour. Racked around it in the dark are seven centuries of Choosing records on crystal wafers, and every one of them has the shapes somebody did not pick on it.',
      artDirection:
        'Cavernous warm chamber beneath a hall, the vast organic-mineral surface of a Heartstone filling one side, racks of glowing crystal wafers in ordered rows, no natural light, faint slow movement. Awed, secret, alive.',
      connections: [
        { to: 'heartstone_hall', travelMinutes: 4, label: 'Up into the hall' },
        { to: 'concord_house', travelMinutes: 11, label: 'The long way, up to the Concord house' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [
        { itemId: 'crystal_leaf', qty: 1, ownerId: null, aka: ['a leaf', 'the record', 'a wafer', 'the crystal'] },
      ],
    },
    {
      id: 'the_far_road',
      name: 'The Far Road',
      shortName: 'The Road',
      description:
        'North out of the city gate and up: eleven days of trade road with messenger towers on the high points, inns with warm rooms, and Roadwardens who will walk with you for a stretch if the weather turns.',
      artDirection:
        'Fantasy trade road climbing through hills at dawn, a stone messenger tower on a ridge, waggons and mixed travellers, mountains ahead. Wide, hopeful, cold.',
      connections: [
        { to: 'the_rails', travelMinutes: 14, label: 'Back over the wall into the city' },
        { to: 'veyr_pass', travelMinutes: 40, label: 'North, into the mountains' },
        { to: 'aurelion_gate', travelMinutes: 55, label: 'South, to the capital' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 0 },
      takeableItems: [],
    },
    {
      id: 'veyr_pass',
      name: 'Veyr Pass',
      shortName: 'Veyr',
      description:
        'A high northern town on a shelf of rock with a Roadwarden station, four hundred people and a great deal of snow. Somebody was born here, was extremely good at mountain rescue here, and has a name here that is not the one on the notice board.',
      artDirection:
        'High mountain fantasy town on a rock shelf, snow, stone buildings with steep roofs, a Roadwarden station with a signal beacon, peaks beyond. Cold, small, hard-wearing.',
      connections: [{ to: 'the_far_road', travelMinutes: 40, label: 'Back down the road' }],
      discoveredByDefault: false,
      mapPosition: { x: 3, y: -1 },
      takeableItems: [
        { itemId: 'black_feather', qty: 1, ownerId: 'kaia', aka: ['the feather', 'the charm', 'her feather'] },
      ],
    },
    {
      id: 'aurelion_gate',
      name: 'The Capital Gate',
      shortName: 'Aurelion',
      description:
        'Eleven days south: white walls, a river, a Concord seat with a dome on it, and somewhere under all of that a ward with a number rather than a name. The gate guards are courteous and they write down who comes in.',
      artDirection:
        'Great white-walled fantasy capital seen from its river gate, a domed institutional building above the rooftops, barges, formal guards, morning haze. Imposing, orderly, faintly cold.',
      connections: [
        { to: 'the_far_road', travelMinutes: 55, label: 'North, back towards Larkspire' },
        { to: 'ward_seven', travelMinutes: 9, lockedByFlag: 'knows:ward_seven', label: 'Down, under the dome' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 3 },
      takeableItems: [],
    },
    {
      id: 'ward_seven',
      name: 'Secondary Echo Ward Seven',
      shortName: 'Ward Seven',
      description:
        'Clean, warm, well-lit and underground. Thirty-one rooms, a garden with a glass roof and no door to the outside, and staff who are mostly kind. The people here have two shapes and most of them arrived voluntarily, and none of them can leave.',
      artDirection:
        'Underground institutional ward, clean pale corridors, a glass-roofed indoor garden with no exterior door, comfortable rooms with observation panels, kind staff in green and cream. Humane, spotless, unmistakably a cage.',
      connections: [{ to: 'aurelion_gate', travelMinutes: 9, label: 'Up, and out' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 4 },
      takeableItems: [
        { itemId: 'lio_manifest', qty: 1, ownerId: null, aka: ['the manifest', 'the requisition', 'the paperwork', 'the patient number'] },
      ],
    },
  ],
  factions: [
    {
      id: 'faction_wardens',
      name: 'The Crown Wardens',
      description: 'Navy and gold, eleven to a post, and a job that is mostly stopping civilians from being hurt. They are good at it, they are lawful, and one of their standing duties is bringing in people whose bodies have done something the law calls an illness.',
      startingReputation: 5,
      ranks: [
        { atReputation: -40, label: 'A name on the board' },
        { atReputation: 0, label: 'A citizen' },
        { atReputation: 35, label: 'Spoken to off the record' },
        { atReputation: 70, label: 'Walked with on a road' },
      ],
      allies: ['faction_concord'],
      enemies: [],
    },
    {
      id: 'faction_concord',
      name: 'The Concord Of Settled Kin',
      description: 'Heartstones, Choosing safety, free draughts, travelling healers and seven centuries of medicine that has saved an enormous number of lives. It also runs a ward under the capital and depends on what is extracted there.',
      startingReputation: 15,
      ranks: [
        { atReputation: -40, label: 'A case' },
        { atReputation: 0, label: 'Settled last month' },
        { atReputation: 35, label: 'Trusted with the records floor' },
        { atReputation: 70, label: 'Spoken for by a Keeper' },
      ],
      allies: ['faction_wardens'],
      enemies: ['faction_twiceborn'],
    },
    {
      id: 'faction_larkspire',
      name: 'Larkspire',
      description: 'The city itself: the market, the canal keepers, the rail-walkers and about eleven thousand people who mostly want the ceremony to go well and the eel price to come down.',
      startingReputation: 20,
      ranks: [
        { atReputation: -40, label: 'Talked about badly' },
        { atReputation: 0, label: 'Somebody’s child' },
        { atReputation: 35, label: 'Known on the street' },
        { atReputation: 70, label: 'Somebody the quarter looks after' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_twiceborn',
      name: 'The Ones With Two',
      description: 'No organisation, no leadership, no name they agreed on. Perhaps four hundred people across Avara living under other names, plus everybody in a ward under the capital, plus one wanted Roadwarden who has started making a nuisance of herself.',
      startingReputation: 0,
      ranks: [
        { atReputation: -40, label: 'Would turn you in' },
        { atReputation: 0, label: 'Has not met you' },
        { atReputation: 35, label: 'Would open a door at night' },
        { atReputation: 70, label: 'Counted as one of them' },
      ],
      allies: [],
      enemies: ['faction_concord'],
    },
  ],
  characters: [
    {
      id: 'kaia',
      name: 'Kaia Voss',
      role: 'Twenty-two, former Roadwarden, wanted, and the only person you have ever seen with two shapes',
      cardBlurb:
        'She came through the gallery window with wardens behind her and she is not here for you — she wants something in the rooms under this hall. She will treat you as somebody capable rather than as a sixteen-year-old, which nobody has done all day, and that is going to work on you.',
      pronouns: 'she/her',
      publicTraits: ['Assesses a room by its exits within about two seconds', 'Talks to everybody as though they are competent', 'Absolutely no ceremony about anything'],
      hiddenDrives: [
        'She needs the Ledger to prove that almost everybody has sealed shapes, because if it is only the sick then her brother is sick',
        'She is aware she is standing in a room full of sixteen-year-olds using their worst night for her own purposes and she has decided to do it anyway',
      ],
      values: [
        'Getting people off a mountain, which is what she was trained for and has never stopped doing in some form',
        'Telling somebody the truth about their own body, which is the one thing nobody in this world does',
      ],
      fears: [
        'That the sixth person she could not reach was the beginning rather than the exception',
        'Lio being alive in there for another fourteen months while she gets the evidence right',
      ],
      socialStyle:
        'Direct, quick and faintly amused, with no allowance made for anybody’s age or rank. Gives instructions rather than explanations while things are happening and answers everything afterwards, at length, if asked.',
      boundaries: [
        'Will not let a minor come with her, and says so once, flatly, and means it until the situation makes it absurd',
        'Will not lie about what a second Affinity costs. She has watched it kill somebody and she leads with that',
      ],
      goals: [
        'Get a copy of the Ledger out of the undercroft and put it somewhere it cannot be taken back',
        'Get her brother out of a ward under the capital',
      ],
      secrets: [
        {
          id: 'kaia_the_sixth',
          fact: 'Five people came out of that avalanche because of the Raven. The sixth did not, and she reached him and could not move the beam, and she has never told anybody that she reached him.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it, once, to somebody who has just failed at something in front of her and is taking it badly.',
        },
        {
          id: 'kaia_lio',
          fact: 'Her brother Lio was reported dead during treatment fourteen months ago. She found a supply manifest signed against his patient number. He is in Ward Seven.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She gives you the whole of it the first time you ask her why any of this is worth what she is doing to get it.',
        },
      ],
      speechStyle:
        'Fast, dry and stripped down, with the Roadwarden habit of giving the instruction first and the reason afterwards. Treats everybody as capable, including sixteen-year-olds, including in a crisis. Says the frightening thing plainly and then carries on, and the carrying on is what makes it frightening.',
      topics: ['the Ledger', 'her brother', 'the avalanche', 'the Seal', 'what a second one costs', 'the undercroft'],
      voiceSamples: [
        'Left gallery, behind the pillar, and do not look at the wardens. Reasons afterwards. Go.',
        'It hurts. It can kill you. Roughly four hundred are living with it right now under other names. This hall has been given the first two facts and not the third.',
        'Five came out. The account says five, and the account stops there. There was a sixth, and I reached him, and I could not move the beam.',
        'You are sixteen. That is not me being kind, it is me being accurate, and it is the reason you are going home and I am going down there.',
      ],
      appearance:
        'Twenty-two, tall and lean, warm light-brown skin, long silver-white hair with a dark charcoal underside, rounded snow-leopard ears edged in black, a heavy white-grey tail with dark rosettes, gold eyes, and black feathers along the left forearm when the other one is awake.',
      visualHook: 'A single black feather on a cord at the neck, worn since about a month before she told anybody.',
      silhouette: 'Landed in a half-crouch on one knee with the tail counterweighting behind her.',
      artSeed: 'ss-kaia-01',
      portrait: null,
      expressions: ['neutral', 'wry', 'urgent', 'hard', 'undefended'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'the_rails', activity: 'up on the rails, learning which roofs the wardens use' },
        { startMinute: 300, endMinute: 720, locationId: 'the_canal_quarter', activity: 'a warm room let by the week under a name that is not hers' },
        { startMinute: 720, endMinute: 1140, locationId: 'the_rails', activity: 'watching the hall from four roofs away, all afternoon' },
        { startMinute: 1140, endMinute: 1260, locationId: 'heartstone_hall', activity: 'through the gallery window, with three wardens behind her' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_canal_quarter', activity: 'gone to ground, bleeding, entirely unbothered' },
      ],
      homeLocationId: 'the_canal_quarter',
      knowledgeScope: ['kaia', 'twiceborn', 'the_ledger', 'lio', 'the_seal', 'veyr_pass'],
      startingRelationship: { trust: 15, affection: 10, respect: 20, fear: 15, rivalry: 0 },
      gates: [
        { id: 'kaia_stops_sending_you_home', label: 'She stops telling you to go home', kind: 'TRUST', requires: { trust: 55, respect: 55 } },
        { id: 'kaia_tells_you_about_lio', label: 'She tells you what this is actually for', kind: 'TRUST', requires: { trust: 68, flagsSet: ['spoke:kaia'] } },
      ],
      attributes: { might: 14, agility: 18, mind: 15, presence: 14, resolve: 17, arcana: 16 },
      companion: null,
      scouting: {
        learnRate: 1.4,
        cap: 8,
        revealCopy: 'She is on the rail before you get there. "You always go up," she says. "It is the right instinct and it is the first thing anybody hunting you will learn."',
      },
      combatant: { health: 85, defenseDc: 19, damage: 14, tags: ['twiceborn', 'roadwarden'] },
    },
    {
      id: 'ilyra',
      name: 'Ilyra Morn',
      role: 'Thirty-four, Captain of the Crown Wardens in Larkspire, and the officer whose lawful duty is bringing Kaia Voss in',
      cardBlurb:
        'She is not a villain and she is very good at her job, which is mostly keeping civilians from being hurt. She will treat you fairly, she will not lie to you, and one of her standing duties is taking people whose bodies have done something the law calls an illness.',
      pronouns: 'she/her',
      publicTraits: ['Says exactly what she is required to say and then stops', 'Puts herself between a crowd and a danger without appearing to decide', 'Learns the names of everybody she has questioned'],
      hiddenDrives: [
        'She has read the Voss file eleven times looking for the part that makes it simple and has not found it',
        'She would like the law to be worth enforcing on this specific point, and is beginning to suspect it is not',
      ],
      values: [
        'Civilians, first, over the arrest, over the case, over her own record',
        'Doing it lawfully, which she believes is the only thing separating her from the people she takes in',
      ],
      fears: [
        'Delivering somebody to a ward and finding out what happens there',
        'Being the officer who was correct all the way through something monstrous',
      ],
      socialStyle:
        'Measured, courteous and immovable. States the position, the duty and the consequence in that order. Not humourless — dry in a way that comes out about once a conversation and always at her own expense.',
      boundaries: [
        'Will not take somebody in front of a crowd if there is any other way, and there usually is',
        'Will not misrepresent what happens next to anybody she is detaining, at all, ever, including when the truth is worse',
      ],
      goals: [
        'Bring Kaia Voss in alive, which is a materially different instruction from the one she was given',
        'Find out what actually happened at the avalanche, because the file does not account for the sixth name',
      ],
      secrets: [
        {
          id: 'ilyra_the_file',
          fact: 'The Voss file has a sixth casualty in it with no cause of death entered, and she has requested the medical annexe four times and been refused four times.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She mentions the refusals, flatly, to somebody who has told her something true about Kaia rather than something useful.',
        },
        {
          id: 'ilyra_the_transfer',
          fact: 'Eleven months ago she escorted a nineteen-year-old to a Concord transfer and was told they would be back in the city within the season. She has since checked, twice, unofficially.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It comes out when somebody asks her, without accusation, what happens to the people she hands over.',
        },
      ],
      speechStyle:
        'Precise, courteous and structured — position, duty, consequence, in that order, every time. Uses full names including the player’s. No threats, because she does not need any and regards them as unprofessional. One dry remark per conversation, always at her own expense.',
      topics: ['the warrant', 'what happens next', 'the sixth name', 'her duty', 'civilians', 'Kaia Voss'],
      voiceSamples: [
        'I am going to tell you what happens next, in order, and none of it is going to be a surprise, because I have never once found a surprise to be useful in this work.',
        'My instruction says apprehend. It does not say alive. I have taken the view that it is implied, and if I am wrong I would rather be corrected by a magistrate than by a body.',
        'There is a sixth name in that file with nothing written next to it. I have asked for the annexe four times. I have stopped expecting it and I have not stopped asking.',
        'You are sixteen and you were seated at a public ceremony during an unlawful entry. Your position is not difficult. I would like it to remain undifficult and that is very largely up to you.',
      ],
      appearance:
        'Thirty-four, tall, dark auburn hair pinned back, black-brown wolf ears and a heavy tail, green-grey eyes, a navy and gold Warden coat kept correct, and an old scar down one side of the face that she has never explained to anybody.',
      visualHook: 'An old scar from cheekbone to jaw on the left, and a coat that is correct in every weather.',
      silhouette: 'Standing squarely in a doorway with both hands visible and empty.',
      artSeed: 'ss-ilyra-01',
      portrait: null,
      expressions: ['neutral', 'courteous', 'dry', 'implacable', 'troubled'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'warden_post', activity: 'asleep in the room behind the duty desk, as usual' },
        { startMinute: 330, endMinute: 780, locationId: 'warden_post', activity: 'the post, the board, and the Voss file for the eleventh time' },
        { startMinute: 780, endMinute: 1140, locationId: 'larkspire_market', activity: 'walking the quarter on foot, learning names' },
        { startMinute: 1140, endMinute: 1320, locationId: 'warden_post', activity: 'back at the post, writing what she can defend' },
        { startMinute: 1320, endMinute: 1440, locationId: 'the_rails', activity: 'up on the rails at night, alone, looking at roofs' },
      ],
      homeLocationId: 'warden_post',
      knowledgeScope: ['ilyra', 'the_wardens', 'the_voss_file', 'larkspire', 'the_law'],
      startingRelationship: { trust: 20, affection: 5, respect: 20, fear: 20, rivalry: 15 },
      gates: [
        { id: 'ilyra_talks_off_the_record', label: 'She takes the coat off and closes the door', kind: 'TRUST', requires: { trust: 50, respect: 50 } },
        { id: 'ilyra_asks_the_question', label: 'She asks you what happens to the people she hands over', kind: 'ALLIANCE', requires: { trust: 68, respect: 65 } },
      ],
      attributes: { might: 16, agility: 15, mind: 15, presence: 16, resolve: 18, arcana: 12 },
      companion: null,
      scouting: {
        learnRate: 1.3,
        cap: 7,
        revealCopy: 'She is at the bottom of the stair before you reach it. "Third time," she says, without any satisfaction at all. "You take the canal side. It is a good route and it is a habit."',
      },
      combatant: { health: 90, defenseDc: 19, damage: 15, tags: ['warden', 'wolf'] },
    },
    {
      id: 'ren',
      name: 'Maren Tovi',
      role: 'Sixteen, chose Wolf in front of four generations of Wolf Wardens, and wanted Hawk',
      cardBlurb:
        'Ren has been beside you all day and chose about ninety seconds before you did. Everybody in that family has been a Wolf and a Warden for four generations, and Ren stood at the stone with the Hawk echo right there and did not take it, and has told nobody.',
      pronouns: 'they/them',
      publicTraits: ['Talks a great deal more when nervous and knows it', 'Competitive about absolutely everything including breakfast', 'First to say the encouraging thing to somebody having a bad day'],
      hiddenDrives: [
        'They want somebody to ask what the stone actually offered them, and have arranged the last three weeks so nobody has',
        'They are frightened that Wolf is going to fit, eventually, and that this will prove the regret was childish',
      ],
      values: [
        'Their family, genuinely and without resentment, which is the whole difficulty',
        'Not being somebody who makes a fuss, which they would describe as a virtue and is at least half a problem',
      ],
      fears: [
        'Being the first Tovi in four generations to be a disappointment about it',
        'Finding out at thirty that the whole life was somebody else’s and being unable to say when it stopped being fixable',
      ],
      socialStyle:
        'Warm, loud and relentlessly present, with the volume going up when anything is difficult. Deflects into competition. Extremely good at noticing somebody else is struggling and completely unable to be noticed themselves.',
      boundaries: [
        'Will not have their family spoken about badly, by anybody, including sympathetically',
        'Will not be told what they should have chosen, and reacts to that worse than to almost anything',
      ],
      goals: [
        'Get through the Warden Academy entrance in the spring and be pleased about it',
        'Stop thinking about the shape that was on the stone next to the one they took',
      ],
      secrets: [
        {
          id: 'ren_wanted_hawk',
          fact: 'The stone offered Hawk and they took Wolf because four generations of the family were standing at the front. They have not said this out loud once.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'They tell you at about two in the morning, quickly, having built up to it for four days, and then immediately make a joke.',
        },
        {
          id: 'ren_the_rails',
          fact: 'They have been going up on the rails at night since the Choosing and standing on the landing rails, which are for Hawks, doing nothing.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Somebody catches them at it, and there is no good explanation available, and they do not attempt one.',
        },
      ],
      speechStyle:
        'Fast, warm and over-talkative, with the sentences getting longer the more difficult the subject is. Turns anything into a competition to change the subject. Self-corrects mid-sentence constantly. Says the genuinely kind thing without any build-up at all, which is when they are being most serious.',
      topics: ['the Academy', 'their family', 'the Choosing', 'what you picked', 'the rails at night', 'racing you'],
      voiceSamples: [
        'Right, so — no, do not do the calm thing at me, I have been talking since the fourth bell and I am not stopping. Your hands. How do your hands feel? Mine feel like a borrowed pair of gloves.',
        'Four generations. There is a portrait. There is more than one portrait. You have seen the hall, you know exactly how many portraits there are.',
        'Race you to the third bridge and if I win you have to tell me what it showed you.',
        'I am pleased for you. I am. That is not me — look, put the portraits out of your head for one minute. Eleven paintings of dead Wolves in a corridor and not one of them is my problem tonight.',
      ],
      appearance:
        'Sixteen, wiry, four weeks into a body that is broader than it was, black-brown wolf ears that are always doing something, a tail they have not learned to keep out of the way, and a Choosing cord in Tovi grey and blue.',
      visualHook: 'A tail that knocks something off a table about once an hour, and a running apology for it.',
      silhouette: 'Half-turned back over one shoulder, talking, already three steps ahead of whoever they are with.',
      artSeed: 'ss-ren-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'nervous', 'stung', 'quiet'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'the_rails', activity: 'up on a landing rail at night, doing nothing, telling nobody' },
        { startMinute: 360, endMinute: 720, locationId: 'player_home', activity: 'round at yours before anybody is awake, talking' },
        { startMinute: 720, endMinute: 1140, locationId: 'larkspire_market', activity: 'the market, an errand, four conversations' },
        { startMinute: 1140, endMinute: 1290, locationId: 'heartstone_hall', activity: 'the ceremony, in the fourth row, with the whole family' },
        { startMinute: 1290, endMinute: 1440, locationId: 'larkspire_market', activity: 'the long way home, still talking' },
      ],
      homeLocationId: 'larkspire_market',
      knowledgeScope: ['ren', 'the_tovi_family', 'the_academy', 'larkspire', 'the_choosing'],
      startingRelationship: { trust: 60, affection: 55, respect: 30, fear: 0, rivalry: 25 },
      gates: [
        { id: 'ren_says_it', label: 'They tell you what the stone offered them', kind: 'TRUST', requires: { trust: 70, affection: 60 } },
        { id: 'ren_closer', label: 'Neither of them is calling it being childhood friends', kind: 'ROMANCE', requires: { trust: 75, affection: 72 } },
      ],
      attributes: { might: 13, agility: 13, mind: 11, presence: 14, resolve: 12, arcana: 11 },
      companion: null,
      scouting: null,
      combatant: { health: 45, defenseDc: 13, damage: 8, tags: ['wolf', 'unsettled'] },
    },
    {
      id: 'tessa',
      name: 'Tessa Vale',
      role: 'Sixteen, chose Hawk, and has wanted the far-road courier network since she was nine',
      cardBlurb:
        'She got exactly what she wanted and is already halfway out of the city with it. She is the one who will tell you flatly that this is all much stranger than the adults are admitting, and she is going to be up on the rails at four in the morning whether you come or not.',
      pronouns: 'she/her',
      publicTraits: ['Cannot sit through anything', 'Says the sceptical thing out loud in rooms where nobody else will', 'Already knows four of the couriers by name'],
      hiddenDrives: [
        'She wants to be interesting for a reason that is not her eyes, and has no idea how to arrange that',
        'She is frightened that the courier network is the whole of her and she is going to find that out at about twenty-four',
      ],
      values: [
        'Being told the actual thing rather than the version for sixteen-year-olds',
        'Going. Distance, roads, the far end of a map, and not being anywhere for very long',
      ],
      fears: [
        'Being a pair of eyes that somebody employs, and nothing else about her mattering to anybody',
        'Larkspire. Specifically: still being in it at thirty',
      ],
      socialStyle:
        'Restless, funny and impatient, especially with being managed. Asks the awkward question in the middle of the ceremony. Physically incapable of staying in a chair and does not pretend otherwise.',
      boundaries: [
        'Will not be complimented on her sight, which she has heard four hundred times and which stopped meaning anything at eleven',
        'Will not be told to stay somewhere safe while somebody else does the interesting part',
      ],
      goals: [
        'Get taken on by the far-road network before the winter routes close',
        'Find out what actually happened in that hall, because the official account is four sentences long and wrong',
      ],
      secrets: [
        {
          id: 'tessa_saw_it',
          fact: 'From the gallery she saw the feathers start before anybody else did, and she saw that Kaia looked at the floor grating rather than at the exits.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells the first person who asks her what she saw rather than telling her what happened.',
        },
        {
          id: 'tessa_the_letter',
          fact: 'She has been rejected by the courier network twice on age and has both letters, and has not told Ren or her family about either.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It comes out sideways when somebody assumes she is already in, and she does not correct it for a beat too long first.',
        },
      ],
      speechStyle:
        'Quick, clipped and funny, in short bursts with long gaps of moving about. Asks the direct sceptical question that everybody else in the room has decided not to. Impatient with explanation and will finish somebody else’s sentence to hurry it along. Never sentimental and occasionally, briefly, extremely so.',
      topics: ['the couriers', 'what she saw from the gallery', 'the far road', 'her eyes', 'the official account', 'getting out'],
      voiceSamples: [
        'Four sentences. That is the whole account. A window came in, a wanted woman was pursued, no one was hurt, the ceremony concluded. I was up there. That is not what happened.',
        'She did not look at the doors. Everybody looks at the doors. She looked at the floor.',
        'Say something about my good eyes and I am walking into the canal. I have had that since I was eleven and it has not one single time been about me.',
        'Third bridge, four in the morning, up on the rails. Come or do not, but do not tell me about it afterwards.',
      ],
      appearance:
        'Sixteen, small and restless, brown skin, sharp gold-brown hawk eyes with a visible nictitating flicker, brown-barred feathers through cropped hair and along the forearms, a courier’s satchel she has no official reason to own yet.',
      visualHook: 'A courier satchel with no route badge on it, carried everywhere, including to her own ceremony.',
      silhouette: 'Perched on a rail with her heels hooked under it, leaning out over a drop.',
      artSeed: 'ss-tessa-01',
      portrait: null,
      expressions: ['neutral', 'sharp', 'delighted', 'impatient', 'caught'],
      schedule: [
        { startMinute: 0, endMinute: 240, locationId: 'the_rails', activity: 'on the rails at four in the morning, alone, watching the road' },
        { startMinute: 240, endMinute: 660, locationId: 'larkspire_market', activity: 'asleep above her family’s stall, badly, for seven hours' },
        { startMinute: 660, endMinute: 1140, locationId: 'the_rails', activity: 'the rails, the towers, and four couriers who tolerate her' },
        { startMinute: 1140, endMinute: 1290, locationId: 'heartstone_hall', activity: 'the ceremony, in the gallery rather than the seats' },
        { startMinute: 1290, endMinute: 1440, locationId: 'the_rails', activity: 'straight back up, before the hall has emptied' },
      ],
      homeLocationId: 'larkspire_market',
      knowledgeScope: ['tessa', 'the_couriers', 'the_rails', 'what_she_saw', 'larkspire'],
      startingRelationship: { trust: 45, affection: 35, respect: 30, fear: 0, rivalry: 15 },
      gates: [
        { id: 'tessa_tells_you_what_she_saw', label: 'She tells you what she actually saw from up there', kind: 'TRUST', requires: { trust: 55, flagsSet: ['spoke:tessa'] } },
        { id: 'tessa_closer', label: 'She stops leaving before the end of conversations', kind: 'ROMANCE', requires: { trust: 72, affection: 70 } },
      ],
      attributes: { might: 9, agility: 17, mind: 14, presence: 13, resolve: 13, arcana: 13 },
      companion: null,
      scouting: null,
      combatant: { health: 38, defenseDc: 14, damage: 7, tags: ['hawk'] },
    },
    {
      id: 'sai',
      name: 'Sai Velo',
      role: 'Twenty-nine, Concord physician, and the author of a protocol his own institution has declined to publish',
      cardBlurb:
        'He works for the people who run the ward, and he has nineteen pages that would let you keep both shapes and no permission to use them on you. He gives you the failure figures before the reassurance, every time, which is how you will know he is the one telling you the truth.',
      pronouns: 'he/him',
      publicTraits: ['Gives the survival figure before the reassurance', 'Works out of two rooms over a boat-builder at hours the Concord house is closed', 'Corrects his own overstatements immediately'],
      hiddenDrives: [
        'He wants somebody outside the institution to make the decision for him about whether staying is help or complicity',
        'He would like to publish and be right and be thanked, in that order, and is ashamed of the third one',
      ],
      values: [
        'The eleven people he has run this on, individually, by name, all of whom are alive',
        'Getting the figures right, including the ones that are bad for his own argument',
      ],
      fears: [
        'Publishing and being wrong about somebody, at scale, in print',
        'Being the man who spent thirty years being decent inside something and changing none of it',
      ],
      socialStyle:
        'Careful, courteous and slightly exhausted. Answers a medical question completely and a moral one by giving you more medicine. Watches somebody’s hands rather than their face, which is a Serpent thing and also a physician thing.',
      boundaries: [
        'Will not run the protocol on somebody who has not been told the failure figures, in full, twice',
        'Will not discuss a patient, at all, under any circumstance, including when it would obviously help',
      ],
      goals: [
        'Get the protocol in front of somebody who can make it legal, without it being buried and him with it',
        'Keep the eleven alive, which currently means keeping them hidden',
      ],
      secrets: [
        {
          id: 'sai_the_eleven',
          fact: 'He has run the protocol unofficially eleven times. Nine of those people are alive and settled with two shapes, under other names. Two are not, and he can give you both dates.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He gives the second number unprompted, always, before he gives the first, because he has decided that is the only honest order.',
        },
        {
          id: 'sai_what_the_ward_is_for',
          fact: 'He knows extracted secondary Echo energy is being used to stabilise ageing Heartstones, and that this is why the policy will not change, and he has known for two years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it once, quietly, to somebody who has already worked out most of it and is not going to shout about it in a corridor.',
        },
      ],
      speechStyle:
        'Clinical, careful and self-correcting, with the bad number given first as a matter of policy. Answers moral questions with clinical ones because he does not have the other kind. Hedges about himself constantly and about the medicine not at all, and the contrast is the whole man.',
      topics: ['the protocol', 'the failure figures', 'the ward', 'why he stays', 'the Heartstones', 'what is happening to you'],
      voiceSamples: [
        'Two of them died. I want that first, before anything else, because everybody who tells you this leads with the nine and I am not going to be somebody who does that.',
        'Suppression works. That is the difficulty. It works about seventy per cent of the time and the failures are catastrophic and the successes are quiet, so the figures look excellent and the people look terrible.',
        'I have stayed because there are thirty-one people down there who need somebody in the room who believes them. I have been saying that sentence for two years and I have stopped being able to hear whether it is true.',
        'Do not tell me what they said to you. I mean that as an instruction. If you tell me I have to write it down, and I would rather not have to.',
      ],
      appearance:
        'Twenty-nine, slight, black hair, amber eyes with a vertical pupil, dark green scaling across the temples and down the sides of the neck, Concord green worn under an ordinary coat, and hands that are always cold and always steady.',
      visualHook: 'Dark green scaling at the temples that he keeps half-covered by his hair without appearing to.',
      silhouette: 'Seated on a stool, forward, forearms on knees, at the eye level of whoever he is treating.',
      artSeed: 'ss-sai-01',
      portrait: null,
      expressions: ['neutral', 'clinical', 'careful', 'exhausted', 'decided'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'sai_infirmary', activity: 'the two rooms over the boat-builder, still lit' },
        { startMinute: 300, endMinute: 480, locationId: 'sai_infirmary', activity: 'three hours on the treatment couch, which is not a bed' },
        { startMinute: 480, endMinute: 1020, locationId: 'concord_house', activity: 'the official list, the waiting hall, forty people' },
        { startMinute: 1020, endMinute: 1260, locationId: 'the_canal_quarter', activity: 'the canals, on foot, to four addresses he does not write down' },
        { startMinute: 1260, endMinute: 1440, locationId: 'sai_infirmary', activity: 'back over the water, writing up' },
      ],
      homeLocationId: 'sai_infirmary',
      knowledgeScope: ['sai', 'the_protocol', 'echo_medicine', 'the_concord', 'ward_seven', 'the_heartstones'],
      startingRelationship: { trust: 25, affection: 5, respect: 25, fear: 10, rivalry: 0 },
      gates: [
        { id: 'sai_gives_you_the_figures', label: 'He gives you both numbers, in his order', kind: 'TRUST', requires: { trust: 50, flagsSet: ['spoke:sai'] } },
        { id: 'sai_hands_over_the_pages', label: 'He gives you nineteen pages he could be ruined for', kind: 'ALLIANCE', requires: { trust: 70, respect: 62 } },
      ],
      attributes: { might: 8, agility: 11, mind: 18, presence: 13, resolve: 14, arcana: 16 },
      companion: null,
      scouting: null,
      combatant: { health: 34, defenseDc: 12, damage: 5, tags: ['serpent', 'physician'] },
    },
    {
      id: 'edran',
      name: 'Edran Sol',
      role: 'Fifty-six, High Keeper of the Concord, and the most persuasive person in this story',
      cardBlurb:
        'He runs the institution and he is not defensive about any of it. He believes identity requires limits, that a self you can discard the moment it is uncomfortable is not a self, and he will make that case to you calmly and well, and some evenings you are going to find it hard to answer.',
      pronouns: 'he/him',
      publicTraits: ['Never once defensive about the Concord', 'Asks about your Choosing before he says anything else', 'Concedes the strongest point against him immediately and in full'],
      hiddenDrives: [
        'He needs the Seal to be about identity rather than about infrastructure, because he has read the same figures Sai has',
        'He has begun structuring his succession around somebody who does not know what the ward is for',
      ],
      values: [
        'A person being finished — having become somebody rather than remaining a set of options forever',
        'The seven hundred years of it, which he genuinely regards as the great achievement of Kin civilisation and which it partly is',
      ],
      fears: [
        'Being the Keeper who discovered the thing was load-bearing and kept going anyway, which he already is',
        'A generation that never settles, and what he believes that would do to them, which is not nothing',
      ],
      socialStyle:
        'Enormously present and entirely unhurried. Gives your objection back to you stronger than you made it and then answers that version. Never raises anything, never bristles, and has not been visibly angry in eleven years.',
      boundaries: [
        'Will not authorise a taking without a medical finding, and has refused the Wardens over it twice',
        'Will not permit a Choosing to be pressured by a family, which he enforces personally and unpopularly',
      ],
      goals: [
        'Keep the Settling system intact through a decade in which the Heartstones are visibly ageing',
        'Find somebody to hand it to who will hold the line without needing to know why the line is there',
      ],
      secrets: [
        {
          id: 'edran_knows',
          fact: 'He has known for six years that extracted Echo energy is stabilising the ageing Heartstones, and that this makes the policy unchangeable regardless of what the medicine says.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He does not deny it if it is put to him accurately. He explains what he thinks the alternative costs, and it is the best argument in the story.',
        },
        {
          id: 'edran_his_own_choosing',
          fact: 'The stone offered him four shapes at sixteen and he has thought about one of the other three, specifically and by name, most weeks for forty years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He volunteers it, of all things, as a way of demonstrating that he understands exactly what he is asking of everybody.',
        },
      ],
      speechStyle:
        'Calm, expansive and structured, in the cadence of somebody who has explained this well several thousand times and still means it. Restates the objection better than the objector did and then answers it. Uses "we" about seven centuries of people. Never defensive, never sharp, and completely immovable.',
      topics: ['limits', 'the Manyskin Fever', 'his own Choosing', 'the ward', 'what an unfinished person is', 'the Heartstones'],
      voiceSamples: [
        'Say it properly and I will answer it properly. You think we are calling people ill in order to use them. That is the strongest version and it is not entirely wrong, and I would rather we started there.',
        'Identity requires limits. A self you can put down the moment it becomes uncomfortable is not a self, it is a preference, and a life made of preferences is a very long corridor with no rooms off it.',
        'Mine offered four. I have thought about the second one most weeks for forty years and I have never once regretted the first, and those two things sit together perfectly comfortably.',
        'We saved millions. I am aware that is what everybody says at this point in the conversation. It also happens to be documented, and I would ask you to hold both.',
      ],
      appearance:
        'Fifty-six, tall and imposing without effort, silver-brown hair, a broad rack of stag antlers capped in gold at the tips, dark green and cream robes, and a stillness that makes rooms arrange themselves around him.',
      visualHook: 'Gold ritual caps on the antler tips, worn every day rather than ceremonially.',
      silhouette: 'Seated, upright, with the antlers filling the top third of the frame.',
      artSeed: 'ss-edran-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'considering', 'grave', 'immovable'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'aurelion_gate', activity: 'the Concord seat in the capital, asleep, properly, like a man with a clear conscience' },
        { startMinute: 360, endMinute: 780, locationId: 'aurelion_gate', activity: 'the seat, the council, forty decisions before noon' },
        { startMinute: 780, endMinute: 1020, locationId: 'ward_seven', activity: 'the ward, in person, weekly, speaking to people by name' },
        { startMinute: 1020, endMinute: 1440, locationId: 'aurelion_gate', activity: 'back up, correspondence, and one letter he writes by hand' },
      ],
      homeLocationId: 'aurelion_gate',
      knowledgeScope: ['edran', 'the_concord', 'the_seal', 'the_manyskin_fever', 'ward_seven', 'the_heartstones'],
      startingRelationship: { trust: 10, affection: 0, respect: 25, fear: 25, rivalry: 20 },
      gates: [
        { id: 'edran_makes_the_case', label: 'He puts the whole argument to you properly', kind: 'OTHER', requires: { respect: 50, flagsSet: ['spoke:edran'] } },
        { id: 'edran_concedes_the_ward', label: 'He tells you what the ward is actually for', kind: 'TRUST', requires: { respect: 70, trust: 45 } },
      ],
      attributes: { might: 14, agility: 9, mind: 18, presence: 19, resolve: 18, arcana: 17 },
      companion: null,
      scouting: null,
      combatant: { health: 80, defenseDc: 18, damage: 12, tags: ['stag', 'keeper'] },
    },
    {
      id: 'lio',
      name: 'Lio Voss',
      role: 'Eighteen, officially dead for fourteen months, and living in a clean warm room under the capital',
      cardBlurb:
        'The Concord told his family he died during treatment fourteen months ago. He has worked the routine out to the hour, he knows all thirty of the others by name, and if you get down there he will tell you what the sessions are actually for in about ninety seconds.',
      pronouns: 'he/him',
      publicTraits: ['Knows the ward routine to the minute and shares it unprompted', 'Names everybody on the corridor including the staff', 'Extremely funny about a situation nobody should be funny about'],
      hiddenDrives: [
        'He has decided he is not leaving without the other thirty and has not told his sister that',
        'He is frightened that fourteen months in has made him somebody who could stay, and he watches himself for it',
      ],
      values: [
        'The thirty. He knows all their names, their intake dates and which of them is having a bad week',
        'Not being lied to, which is the one thing he asks of the staff and mostly gets',
      ],
      fears: [
        'Kaia coming in after him, which is the specific outcome he has spent fourteen months trying to prevent by no available means',
        'The extraction sessions, which he does not describe, and about which he changes the subject with enormous skill',
      ],
      socialStyle:
        'Immediately friendly and relentlessly informative about the ward, because information is the only thing he has been able to accumulate. Deflects anything about himself into a fact about somebody else on the corridor.',
      boundaries: [
        'Will not be got out ahead of the others, and will physically obstruct it',
        'Will not have the staff described as monsters in front of him, because most of them are not and he has to live here',
      ],
      goals: [
        'Get thirty-one people up a stair, which he has planned in enormous detail and has no means to execute',
        'Get a message to his sister that is not the one she has been chasing',
      ],
      secrets: [
        {
          id: 'lio_what_they_take',
          fact: 'He worked out in the fourth month what the sessions are for, from which days the lights are steadier afterwards. He has told the other thirty and none of the staff.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He explains it in about ninety seconds to the first person who arrives from outside, because he has been waiting fourteen months to tell somebody.',
        },
        {
          id: 'lio_the_second_shape',
          fact: 'His second Affinity never fully came up and the Concord has been suppressing something that was never there. He has never told them, because being a case is what keeps him on the corridor with the others.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it flatly, as the least important thing he has to tell you, which is when it lands.',
        },
      ],
      speechStyle:
        'Warm, quick and information-dense, delivered as though it were all quite interesting, which is a fourteen-month-old survival strategy. Counts things — days, doors, people, sessions. Turns any question about himself into a fact about somebody down the corridor, smoothly, every single time.',
      topics: ['the routine', 'the thirty', 'the sessions', 'his sister', 'the lights', 'the way out'],
      voiceSamples: [
        'Four hundred and twenty-six days. Thirty-one of us, thirty-one rooms, two staff on the night corridor and one of them is called Peris and she is all right. Sorry — who are you?',
        'The lights on the corridor go steadier the day after a session. Took me four months. There is nothing to do in here except notice things, which is a thing I say a lot and which everybody finds depressing.',
        'Do not tell me how she is. If you tell me how she is I am going to be no use to you for about an hour.',
        'Mine never came up. Not properly. They have been suppressing something that is not in there and I have let them, because a case gets a room on this corridor and a mistake gets sent home.',
      ],
      appearance:
        'Eighteen, thin, white-blond hair, arctic fox ears and a heavy white brush of a tail that has stayed winter-white for fourteen months indoors, pale institutional clothes that fit properly, and a tally in pencil behind a door.',
      visualHook: 'A pencil tally behind the door of his room, in groups of thirty-one rather than five.',
      silhouette: 'Sitting on the end of a bed with his back to a wall and his tail curled round his feet.',
      artSeed: 'ss-lio-01',
      portrait: null,
      expressions: ['neutral', 'bright', 'informative', 'careful', 'breaking'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'ward_seven', activity: 'the corridor, the garden with no door, and thirty other people' },
      ],
      homeLocationId: 'ward_seven',
      knowledgeScope: ['lio', 'ward_seven', 'the_sessions', 'the_thirty', 'kaia'],
      startingRelationship: { trust: 35, affection: 15, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        { id: 'lio_tells_you_what_it_is_for', label: 'He tells you what the sessions are actually doing', kind: 'TRUST', requires: { trust: 40, flagsSet: ['spoke:lio'] } },
        { id: 'lio_will_move', label: 'He will lead thirty-one people up a stair', kind: 'ALLIANCE', requires: { trust: 65, respect: 55 } },
      ],
      attributes: { might: 8, agility: 13, mind: 16, presence: 14, resolve: 17, arcana: 13 },
      companion: null,
      scouting: null,
      combatant: { health: 26, defenseDc: 11, damage: 4, tags: ['fox', 'twiceborn'] },
    },
  ],
  quests: [
    {
      id: 'q_the_choosing',
      title: 'The Choosing',
      summary: 'You put a hand on a living stone at sixteen, it shows you what you could become, and you have about ninety seconds.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['ren', 'tessa', 'kaia'],
      involvedLocationIds: ['heartstone_hall', 'player_home', 'larkspire_market'],
      knownRewardCopy: 'A body that is going to keep changing for a month, and some idea of what happened in that hall.',
      steps: [
        {
          id: 'the_window',
          playerCopy: 'Glass comes in above the eastern gallery and a woman lands on one knee with feathers coming up her arm.',
          directorNotes:
            'Four hundred people, most of them families. She is not here for the player and does not look at them. What the player does in the next few seconds is entirely open, including nothing, and the room going silent is the whole beat.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'watched_properly',
              label: 'Look at what she is actually doing rather than at the feathers',
              predicate: { flagsSet: ['used:use_what_you_are'] },
              setsFlags: ['saw_the_grating', 'knows:the_undercroft'],
              closesFlags: [],
            },
            {
              routeId: 'got_between',
              label: 'Put yourself between her and the nearest family',
              predicate: { flagsSet: ['used:put_yourself_in_the_way'] },
              setsFlags: ['stood_up_in_the_hall', 'the_wardens_have_your_name'],
              closesFlags: [],
            },
            {
              routeId: 'went_after_her',
              label: 'Follow her when she goes',
              predicate: { flagsSet: ['used:take_the_high_way'] },
              setsFlags: ['followed_her', 'saw_the_grating'],
              closesFlags: [],
            },
            {
              routeId: 'stayed_put',
              label: 'Stay exactly where you are with everybody else',
              predicate: { flagsSet: ['visited:heartstone_hall'] },
              setsFlags: ['stayed_in_your_seat'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['knows:twiceborn_exist'], abilities: [], reputation: [] },
        },
        {
          id: 'the_month_after',
          playerCopy: 'Your body is going to spend four weeks becoming what you picked. Find out what that is actually like.',
          directorNotes:
            'The best material in the world is here and it is entirely domestic: sleeping wrong, hearing an argument three floors down, a tail in a doorway, food tasting different, somebody in the market adjusting a portion without asking. Write one specific ordinary week properly.',
          enterWhen: { flagsSet: ['knows:twiceborn_exist'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'learned_it',
              label: 'Get good at the new body on purpose',
              predicate: { flagsSet: ['used:use_what_you_are', 'used:take_the_high_way'] },
              setsFlags: ['settled_well', 'knows:your_own_body'],
              closesFlags: [],
            },
            {
              routeId: 'with_ren',
              label: 'Spend the month with the person who chose ninety seconds before you',
              predicate: { flagsSet: ['spoke:ren'], minRelationship: [{ characterId: 'ren', dimension: 'trust', value: 65 }] },
              setsFlags: ['settled_well', 'knows:ren_regrets_it'],
              closesFlags: [],
            },
            {
              routeId: 'up_on_the_rails',
              label: 'Spend it on the rails at four in the morning with somebody who cannot sit still',
              predicate: { flagsSet: ['spoke:tessa'], atLocation: 'the_rails' },
              setsFlags: ['settled_well', 'knows:what_tessa_saw'],
              closesFlags: [],
            },
            {
              routeId: 'badly',
              label: 'Spend it not sleeping and not telling anybody',
              predicate: { flagsSet: ['used:hold_it_down'] },
              setsFlags: ['settled_badly', 'knows:there_is_something_under_it'],
              closesFlags: ['settled_well'],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['the_month_is_over'], abilities: [], reputation: [{ factionId: 'faction_larkspire', amount: 10 }] },
        },
      ],
    },
    {
      id: 'q_the_ledger',
      title: 'What Is Under The Hall',
      summary: 'She did not look at the doors. She looked at the floor, and under the floor is seven hundred years of records nobody has ever been shown.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['the_month_is_over'] },
      involvedCharacterIds: ['kaia', 'tessa', 'ilyra'],
      involvedLocationIds: ['heartstone_hall', 'the_undercroft', 'the_rails'],
      knownRewardCopy: 'What a Choosing record actually says, which is not what anybody has been told it says.',
      steps: [
        {
          id: 'find_the_way_down',
          playerCopy: 'There is a stair behind the grating and about four hundred people walked over it this month.',
          directorNotes:
            'Three ways in. The Concord route is legitimate, slow and leaves a trail. Kaia knows the way and will not take a sixteen-year-old. Tessa saw where she looked from the gallery and is going with or without the player.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'with_tessa',
              label: 'Go down with the one who saw where she looked',
              predicate: { flagsSet: ['knows:what_tessa_saw'], atLocation: 'heartstone_hall' },
              setsFlags: ['knows:the_undercroft', 'went_with_tessa'],
              closesFlags: [],
            },
            {
              routeId: 'through_the_concord',
              label: 'Ask the Concord for your own record, in writing, like a citizen',
              predicate: { flagsSet: ['used:get_them_talking'], atLocation: 'concord_house' },
              setsFlags: ['knows:the_undercroft', 'asked_officially'],
              closesFlags: [],
            },
            {
              routeId: 'made_her_take_you',
              label: 'Give her something she needs and make it a trade',
              predicate: { minRelationship: [{ characterId: 'kaia', dimension: 'respect', value: 55 }] },
              setsFlags: ['knows:the_undercroft', 'kaia_took_you'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['looking_for_the_ledger'], abilities: [], reputation: [] },
        },
        {
          id: 'read_your_own',
          playerCopy: 'The racks go back seven centuries and one of the wafers is yours.',
          directorNotes:
            'The reveal is not that the player is special. It is that every single leaf has four other shapes on it. Theirs, Ren’s, the High Keeper’s. The horror is entirely in how ordinary it is.',
          enterWhen: { flagsSet: ['looking_for_the_ledger'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_it',
              label: 'Find your own leaf and read what is underneath',
              predicate: { hasItems: ['crystal_leaf'], atLocation: 'the_undercroft' },
              setsFlags: ['knows:everybody_has_them', 'knows:there_is_something_under_it'],
              closesFlags: [],
            },
            {
              routeId: 'took_a_copy',
              label: 'Take a copy out of there for somebody who can use it',
              predicate: { flagsSet: ['knows:the_undercroft', 'used:take_the_high_way'] },
              setsFlags: ['knows:everybody_has_them', 'has_a_copy'],
              closesFlags: [],
            },
            {
              routeId: 'left_it',
              label: 'Do not read yours',
              predicate: { flagsSet: ['knows:the_undercroft'] },
              setsFlags: ['knows:everybody_has_them', 'did_not_read_yours'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 140, items: [], flags: ['the_ledger_is_answered'], abilities: [], reputation: [{ factionId: 'faction_twiceborn', amount: 15 }] },
        },
      ],
    },
    {
      id: 'q_something_under_it',
      title: 'Something Under It',
      summary: 'A preference that is not yours. A height you keep turning towards. A dream about a body you did not pick.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:there_is_something_under_it'] },
      involvedCharacterIds: ['sai', 'kaia', 'ilyra'],
      involvedLocationIds: ['sai_infirmary', 'concord_house', 'the_canal_quarter'],
      knownRewardCopy: 'What is actually happening to you, from the only two people in this city who would tell you the truth about it.',
      steps: [
        {
          id: 'tell_somebody',
          playerCopy: 'It is coming up under stress and going again, which is the exact thing everybody was warned about as a child.',
          directorNotes:
            'Four options and each has a real cost. The Concord will treat it, legally, and treatment is suppression. Sai will treat it properly and illegally. Kaia has done this and will be honest about how badly it can go. Telling nobody works for a while.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_to_the_concord',
              label: 'Do the thing everybody is told to do',
              predicate: { flagsSet: ['used:get_them_talking'], atLocation: 'concord_house' },
              setsFlags: ['the_concord_knows', 'on_the_official_treatment'],
              closesFlags: ['told_nobody'],
            },
            {
              routeId: 'went_to_sai',
              label: 'Find the physician who keeps hours the Concord house does not',
              predicate: { flagsSet: ['spoke:sai'], atLocation: 'sai_infirmary' },
              setsFlags: ['sai_knows', 'has_the_protocol'],
              closesFlags: ['told_nobody'],
            },
            {
              routeId: 'asked_kaia',
              label: 'Ask the only person you have seen do this',
              predicate: { minRelationship: [{ characterId: 'kaia', dimension: 'trust', value: 55 }] },
              setsFlags: ['kaia_knows', 'knows:what_it_costs'],
              closesFlags: ['told_nobody'],
            },
            {
              routeId: 'told_nobody',
              label: 'Tell nobody at all',
              predicate: { flagsSet: ['used:hold_it_down'] },
              setsFlags: ['told_nobody'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 120, items: [], flags: ['somebody_knows_or_nobody_does'], abilities: ['let_it_up', 'run_the_protocol'], reputation: [] },
        },
        {
          id: 'what_you_do_about_it',
          playerCopy: 'There are three ways this goes and one of them is legal.',
          directorNotes:
            'Suppression works about seventy per cent of the time and the failures are catastrophic. The protocol works better and is illegal and unpublished. Refusing both and holding it down by will is possible and is the worst of the three, and the world should let somebody do it anyway.',
          enterWhen: { flagsSet: ['somebody_knows_or_nobody_does'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'integrated',
              label: 'Bring it up slowly, properly, on nineteen pages nobody is allowed to have',
              predicate: { flagsSet: ['used:run_the_protocol'] },
              setsFlags: ['integrated_it', 'has_two'],
              closesFlags: ['suppressed_it', 'severed_it'],
            },
            {
              routeId: 'suppressed',
              label: 'Let them push it back down, legally, with a seventy per cent figure',
              predicate: { flagsSet: ['on_the_official_treatment'] },
              setsFlags: ['suppressed_it'],
              closesFlags: ['integrated_it', 'has_two'],
            },
            {
              routeId: 'severed',
              label: 'Give up the shape you chose rather than carry two',
              predicate: { flagsSet: ['used:let_it_up', 'sai_knows'] },
              setsFlags: ['severed_it'],
              closesFlags: ['integrated_it', 'suppressed_it'],
            },
            {
              routeId: 'held_it',
              label: 'Hold it down yourself, with nothing, for as long as that lasts',
              predicate: { flagsSet: ['told_nobody', 'used:hold_it_down'] },
              setsFlags: ['holding_it_alone'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 170, items: [], flags: ['the_second_shape_is_answered'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_ward',
      title: 'Ward Seven',
      summary: 'Thirty-one people in clean warm rooms under the capital, one of whom his family was told died fourteen months ago.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:everybody_has_them'] },
      involvedCharacterIds: ['kaia', 'lio', 'edran', 'sai'],
      involvedLocationIds: ['aurelion_gate', 'ward_seven', 'the_far_road'],
      knownRewardCopy: 'What is under the capital, what it is for, and what any of that is worth doing something about.',
      steps: [
        {
          id: 'get_down_there',
          playerCopy: 'Eleven days south, white walls, and a ward with a number rather than a name.',
          directorNotes:
            'It is clean, warm, well-lit and humane. A garden with a glass roof and no door outside. Kind staff. The horror is that everything about it is defensible except the one fact that nobody can leave.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'with_kaia',
              label: 'Go with the one who has been trying to get in for fourteen months',
              predicate: { minRelationship: [{ characterId: 'kaia', dimension: 'trust', value: 68 }], atLocation: 'aurelion_gate' },
              setsFlags: ['knows:ward_seven', 'went_with_kaia'],
              closesFlags: [],
            },
            {
              routeId: 'as_a_patient',
              label: 'Go in the way everybody else goes in',
              predicate: { flagsSet: ['on_the_official_treatment'], atLocation: 'aurelion_gate' },
              setsFlags: ['knows:ward_seven', 'went_in_as_a_patient'],
              closesFlags: [],
            },
            {
              routeId: 'sai_walked_you_in',
              label: 'Be walked in by somebody with a Concord green coat',
              predicate: { minRelationship: [{ characterId: 'sai', dimension: 'trust', value: 65 }] },
              setsFlags: ['knows:ward_seven', 'sai_walked_you_in'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 160, items: [], flags: ['inside_the_ward'], abilities: [], reputation: [] },
        },
        {
          id: 'what_the_sessions_are_for',
          playerCopy: 'There is an eighteen-year-old on the corridor who worked out what the sessions do in his fourth month.',
          directorNotes:
            'Lio tells you in ninety seconds because he has been waiting fourteen months to tell somebody. The lights go steadier the day after a session. What is being taken from thirty-one people is keeping cities standing, and that is why the policy cannot change.',
          enterWhen: { flagsSet: ['inside_the_ward'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'lio_told_you',
              label: 'Let him tell you the whole thing',
              predicate: { flagsSet: ['spoke:lio'], atLocation: 'ward_seven' },
              setsFlags: ['knows:what_it_is_for', 'lio_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'took_the_manifest',
              label: 'Take the paperwork out with you',
              predicate: { hasItems: ['lio_manifest'] },
              setsFlags: ['knows:what_it_is_for', 'has_the_manifest'],
              closesFlags: [],
            },
            {
              routeId: 'edran_told_you',
              label: 'Put it to the High Keeper and let him answer it properly',
              predicate: { minRelationship: [{ characterId: 'edran', dimension: 'respect', value: 70 }] },
              setsFlags: ['knows:what_it_is_for', 'edran_told_you'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 200, items: [], flags: ['knows:the_worst_of_it'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_what_you_do_with_it',
      title: 'What You Do With It',
      summary: 'You know what is under the hall, what is under the capital and what it is for. Nobody in this world is going to tell you what to do about that.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:the_worst_of_it'] },
      involvedCharacterIds: ['edran', 'kaia', 'ilyra', 'sai', 'lio'],
      involvedLocationIds: ['aurelion_gate', 'ward_seven', 'heartstone_hall', 'larkspire_market'],
      knownRewardCopy: 'What Avara does about the thing it has been doing for seven hundred years.',
      steps: [
        {
          id: 'the_argument',
          playerCopy: 'He will make the case to you calmly and well, and some of it is going to be difficult to answer.',
          directorNotes:
            'Edran is not defensive and does not bluster. He gives the strongest version of the objection back and then answers it, and the answer about what happens to the cities if the extraction stops is genuinely hard. The scene fails if he is written as a hypocrite.',
          enterWhen: { flagsSet: ['knows:the_worst_of_it'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'answered_him',
              label: 'Answer the argument on its own terms',
              predicate: { flagsSet: ['used:work_it_out'], minRelationship: [{ characterId: 'edran', dimension: 'respect', value: 60 }] },
              setsFlags: ['out_argued_him', 'has_a_better_answer'],
              closesFlags: [],
            },
            {
              routeId: 'agreed_with_him',
              label: 'Conclude he is right about the arithmetic',
              predicate: { flagsSet: ['used:get_them_talking'], atLocation: 'aurelion_gate' },
              setsFlags: ['agreed_with_edran'],
              closesFlags: ['out_argued_him'],
            },
            {
              routeId: 'went_round_him',
              label: 'Stop arguing and go and do something',
              predicate: { flagsSet: ['knows:the_worst_of_it'] },
              setsFlags: ['stopped_arguing'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 180, items: [], flags: ['the_case_was_made'], abilities: [], reputation: [] },
        },
        {
          id: 'the_thing_you_do',
          playerCopy: 'Decide.',
          directorNotes:
            'Every route here costs somebody something real. Emptying the ward destabilises Heartstones under cities with people in them. Publishing the Ledger tells four hundred thousand adults they were sealed without being asked. Protecting the system leaves thirty-one people where they are. There is no clean one and the world must not imply otherwise.',
          enterWhen: { flagsSet: ['the_case_was_made'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'emptied_it',
              label: 'Get thirty-one people up that stair',
              predicate: { flagsSet: ['knows:what_it_is_for'], minRelationship: [{ characterId: 'lio', dimension: 'trust', value: 62 }] },
              setsFlags: ['the_ward_is_empty'],
              closesFlags: ['the_concord_holds'],
            },
            {
              routeId: 'published_it',
              label: 'Put the Ledger where it cannot be taken back',
              predicate: { flagsSet: ['has_a_copy'] },
              setsFlags: ['the_ledger_is_out'],
              closesFlags: ['the_concord_holds'],
            },
            {
              routeId: 'built_something',
              label: 'Build the voluntary version, slowly, with the people who run this',
              predicate: { flagsSet: ['has_a_better_answer', 'has_the_protocol'] },
              setsFlags: ['the_accord', 'the_ward_is_empty'],
              closesFlags: [],
            },
            {
              routeId: 'held_the_line',
              label: 'Decide seven hundred years of it is worth thirty-one people',
              predicate: { flagsSet: ['agreed_with_edran'] },
              setsFlags: ['the_concord_holds'],
              closesFlags: ['the_ward_is_empty', 'the_ledger_is_out'],
            },
            {
              routeId: 'went_home',
              label: 'Go back to Larkspire and be sixteen',
              predicate: { flagsSet: ['the_case_was_made'] },
              setsFlags: ['went_home', 'left_the_map'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 260, items: [], flags: ['the_story_has_a_shape'], abilities: [], reputation: [{ factionId: 'faction_larkspire', amount: 15 }] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_official_account',
      atWorldMinute: 1440 + 9 * 60,
      locationId: 'larkspire_market',
      publicCopy:
        'The Concord posts an account of the ceremony. It is four sentences long. A window was broken, a wanted individual was pursued, nobody was harmed, the ceremony concluded.',
      directorNotes:
        'Nobody is lying, exactly. Everything in those four sentences is true and the account is not what happened. Four hundred people were in that hall and within a week most of them are telling the four-sentence version.',
      setsFlags: ['the_account_went_up'],
      cancelledByFlags: [],
      requiresFlags: ['knows:twiceborn_exist'],
      movesCharacters: [],
    },
    {
      id: 'we_the_wardens_come_round',
      atWorldMinute: 2 * 1440 + 14 * 60,
      locationId: 'player_home',
      publicCopy:
        'There is a Warden captain at your family’s door in the middle of the afternoon, with her coat correct and her hands where everybody can see them, asking whether now is convenient.',
      directorNotes:
        'Ilyra is courteous, thorough, and tells the player exactly what happens next in order. Nothing bad occurs. The scene is about a sixteen-year-old discovering they are now the sort of person a captain calls on.',
      setsFlags: ['ilyra_has_your_name'],
      cancelledByFlags: ['stayed_in_your_seat'],
      requiresFlags: ['the_account_went_up'],
      movesCharacters: [{ characterId: 'ilyra', toLocationId: 'player_home' }],
    },
    {
      id: 'we_the_first_pull',
      atWorldMinute: 4 * 1440 + 3 * 60,
      locationId: null,
      publicCopy:
        'You wake at three because the room is the wrong temperature, and it is not the wrong temperature, and you lie there for an hour wanting a height you have never been to.',
      directorNotes:
        'The first Pull, and it is not dramatic. A preference that is not theirs. Write it as the specific loneliness of noticing something about yourself that you have been taught since childhood is the beginning of an illness.',
      setsFlags: ['knows:there_is_something_under_it'],
      cancelledByFlags: ['settled_well'],
      requiresFlags: ['the_month_is_over'],
      movesCharacters: [],
    },
    {
      id: 'we_ren_on_the_rails',
      atWorldMinute: 5 * 1440 + 2 * 60,
      locationId: 'the_rails',
      publicCopy:
        'There is somebody standing on a Hawk landing rail at two in the morning, in Tovi grey and blue, with a wolf tail and no reason at all to be up there.',
      directorNotes:
        'Ren has been doing this since the Choosing and has no explanation available and will not attempt one. Whatever the player does here is the whole of that friendship for the rest of the story.',
      setsFlags: ['found_ren_on_the_rails'],
      cancelledByFlags: ['knows:ren_regrets_it'],
      requiresFlags: ['the_month_is_over'],
      movesCharacters: [{ characterId: 'ren', toLocationId: 'the_rails' }],
    },
    {
      id: 'we_somebody_is_taken',
      atWorldMinute: 7 * 1440 + 11 * 60,
      locationId: 'larkspire_market',
      publicCopy:
        'A nineteen-year-old from the fourth quarter is taken to the Concord house on a medical finding, courteously, in daylight, with their mother present and consenting.',
      directorNotes:
        'This is the system working exactly as designed and it is unbearable to watch. Everybody involved is being kind. The mother agrees. The Wardens are gentle. Nobody breaks a single rule.',
      setsFlags: ['saw_somebody_taken'],
      cancelledByFlags: ['the_ward_is_empty', 'the_accord'],
      requiresFlags: ['the_account_went_up'],
      movesCharacters: [],
    },
    {
      id: 'we_sai_finds_you',
      atWorldMinute: 8 * 1440 + 22 * 60,
      locationId: 'the_canal_quarter',
      publicCopy:
        'There is a Concord physician in an ordinary coat waiting at the end of your street at ten at night, who says he has been at the Concord house all week reading intake notes and would like four minutes.',
      directorNotes:
        'He is not recruiting and he is not threatening. He has seen something in a routine note and come, on his own time, to give somebody the failure figures before anybody else gives them the reassuring version.',
      setsFlags: ['sai_found_you'],
      cancelledByFlags: ['sai_knows', 'suppressed_it'],
      requiresFlags: ['knows:there_is_something_under_it'],
      movesCharacters: [{ characterId: 'sai', toLocationId: 'the_canal_quarter' }],
    },
    {
      id: 'we_kaia_comes_back',
      atWorldMinute: 10 * 1440 + 1 * 60,
      locationId: 'the_rails',
      publicCopy:
        'There is somebody sitting on the water tank above your street at one in the morning who has been there for about two hours and has clearly been waiting for you to come up.',
      directorNotes:
        'She got what she came to Larkspire for and she has come back, which she did not plan to. She is going to tell the player to stay out of it and she has come four streets out of her way to do that in person.',
      setsFlags: ['kaia_came_back'],
      cancelledByFlags: [],
      requiresFlags: ['the_ledger_is_answered'],
      movesCharacters: [{ characterId: 'kaia', toLocationId: 'the_rails' }],
    },
    {
      id: 'we_the_keeper_writes',
      atWorldMinute: 12 * 1440 + 10 * 60,
      locationId: 'player_home',
      publicCopy:
        'A letter arrives from the capital, written by hand rather than by a secretary, that asks after your Choosing and your family and does not mention anything else at all.',
      directorNotes:
        'He writes one of these a week and means every one of them. There is no threat in it anywhere. It is an invitation to be argued with by somebody who has never lost that argument and is genuinely looking forward to it.',
      setsFlags: ['the_keeper_wrote'],
      cancelledByFlags: [],
      requiresFlags: ['the_ledger_is_answered'],
      movesCharacters: [],
    },
    {
      id: 'we_the_heartstone_stutters',
      atWorldMinute: 15 * 1440 + 5 * 60,
      locationId: 'larkspire_market',
      publicCopy:
        'The lamps go out across four quarters for eleven seconds and come back, and the Concord house has people at the hall before most of the city has finished getting up.',
      directorNotes:
        'The stone under Larkspire is ageing. This is the thing Edran is actually frightened of and it is why the ward exists. Nobody explains it. Everybody who knows goes very quiet for about a day.',
      setsFlags: ['the_stone_stuttered'],
      cancelledByFlags: ['the_accord'],
      requiresFlags: ['knows:everybody_has_them'],
      movesCharacters: [],
    },
    {
      id: 'we_they_come_for_you',
      atWorldMinute: 18 * 1440 + 6 * 60,
      locationId: 'player_home',
      publicCopy:
        'There is a medical finding with your name on it, and a captain at the door who tells you exactly what happens next, in order, and none of it is a surprise because she said it would not be.',
      directorNotes:
        'The system arriving for the player, lawfully, courteously and correctly. Ilyra hates it and will not pretend otherwise and will do it anyway unless something changes. This is preventable and the ways of preventing it all cost something.',
      setsFlags: ['they_came_for_you'],
      cancelledByFlags: ['integrated_it', 'suppressed_it', 'the_accord', 'left_the_map'],
      requiresFlags: ['knows:there_is_something_under_it'],
      movesCharacters: [{ characterId: 'ilyra', toLocationId: 'player_home' }],
    },
  ],
  promises: [
    {
      id: 'p_your_shape',
      kind: 'FINALE',
      label: 'The shape you picked at sixteen in about ninety seconds',
      seedHint: 'A cord braided over eleven days in whatever colours your family thought you were going to choose.',
      payoffHint: 'A crystal wafer under a hall with your name on it, and four other shapes underneath.',
      weight: 1,
    },
    {
      id: 'p_the_woman_with_two',
      kind: 'RIVAL',
      label: 'The woman who came through the gallery window',
      seedHint: 'Black feathers coming up a left forearm while four hundred people watch, and a room going silent.',
      payoffHint: 'She got five people out of an avalanche and reached the sixth and could not move the beam.',
      weight: 0.9,
    },
    {
      id: 'p_what_is_under_the_hall',
      kind: 'MYSTERY',
      label: 'Why she looked at the floor instead of the doors',
      seedHint: 'A grating at the centre of a ceremonial hall that four hundred people walk over every year.',
      payoffHint: 'Seven centuries of records, and every single one of them lists the shapes somebody did not take.',
      weight: 0.9,
    },
    {
      id: 'p_the_ward',
      kind: 'THEME',
      label: 'What the institution is actually protecting',
      seedHint: 'Free draughts at every Concord house for anybody in their first year, and they genuinely help.',
      payoffHint: 'Thirty-one people in clean warm rooms, and the lights on the corridor going steadier the day after a session.',
      weight: 0.85,
    },
    {
      id: 'p_ren',
      kind: 'RELATIONSHIP',
      label: 'What the stone offered the person standing next to you',
      seedHint: 'Somebody on a Hawk landing rail at two in the morning with a wolf tail and no explanation.',
      payoffHint: 'Four generations of Wolf Wardens were standing at the front and the Hawk echo was right there.',
      weight: 0.8,
    },
  ],
  archetypes: [
    {
      id: 'arch_wolf',
      name: 'Wolf',
      role: 'Endurance and scent',
      summary: 'Pack-shaped, long-winded and impossible to lose. You will hear an argument three floors down and be unable to stop listening to it.',
      playstyle: ['Tenacious', 'Social', 'Loud senses'],
      blurb: 'Your family will be pleased, which may or may not be why you did it. Everything about this body wants company and wants to keep going, in that order.',
      attributeBonus: { resolve: 3, might: 1 },
      skillProficiencies: { track: 3, blade: 1, talk: 1 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_wardens', amount: 10 }],
    },
    {
      id: 'arch_leopard',
      name: 'Snow Leopard',
      role: 'Balance and quiet',
      summary: 'Cold, height and silence. You will find that you are already on top of things before you have decided to climb them, and that nobody hears you coming, including people you would rather did.',
      playstyle: ['Silent', 'Climbs everything', 'Cold-loving'],
      blurb: 'A northern shape in a southern city. The rails were built for Hawks and you will be using them within a week.',
      attributeBonus: { agility: 3, resolve: 1 },
      skillProficiencies: { climb: 3, affinity: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_twiceborn', amount: 5 }],
    },
    {
      id: 'arch_hawk',
      name: 'Hawk',
      role: 'Sight and distance',
      summary: 'Eyes that resolve a face at four hundred paces and a body built to be somewhere else. Everybody is going to compliment you on the first thing and nobody is going to ask about the second.',
      playstyle: ['Far sight', 'Restless', 'Light build'],
      blurb: 'The couriers will look at you differently within a day. So will everybody else, and about a third of them will say the same sentence about your eyes.',
      attributeBonus: { agility: 2, mind: 2 },
      skillProficiencies: { track: 2, climb: 2, affinity: 1 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_larkspire', amount: 8 }],
    },
    {
      id: 'arch_stag',
      name: 'Stag',
      role: 'Presence and footing',
      summary: 'Antlers, weight and a body that rooms rearrange themselves around. It is an enormous social advantage and a serious practical inconvenience in doorways.',
      playstyle: ['Commanding', 'Sure-footed', 'Conspicuous'],
      blurb: 'Nobody is going to fail to notice you again for the rest of your life, which is a considerable thing to have chosen at sixteen.',
      attributeBonus: { presence: 3, might: 1 },
      skillProficiencies: { talk: 3, steady: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_concord', amount: 10 }],
    },
    {
      id: 'arch_serpent',
      name: 'Serpent',
      role: 'Stillness and medicine',
      summary: 'Heat, patience, and senses that work through walls and floors. Half the city keeps rooms specifically warm for you and the other half is faintly uneasy about all of it.',
      playstyle: ['Patient', 'Perceptive', 'Needs warmth'],
      blurb: 'It is the shape most associated with physicians, and it is also the shape people stand slightly further away from, and both of those are going to be true for the rest of your life.',
      attributeBonus: { mind: 3, arcana: 1 },
      skillProficiencies: { lore: 3, affinity: 2 },
      startingItems: [{ itemId: 'settling_draught', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_concord', amount: 12 }],
    },
    {
      id: 'arch_bear',
      name: 'Bear',
      role: 'Weight and reach',
      summary: 'Enormous. Everything about this body is slower to start and impossible to stop, and the market stallholders will adjust your portion without being asked.',
      playstyle: ['Powerful', 'Slow to move', 'Everybody notices'],
      blurb: 'Four weeks from now you will not fit through your own bedroom door and somebody in your family will have already started widening it without mentioning it.',
      attributeBonus: { might: 4 },
      skillProficiencies: { blade: 2, steady: 2, track: 1 },
      startingItems: [{ itemId: 'road_bread', qty: 2 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_larkspire', amount: 12 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What is on the cord?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Aven Sarel' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'The stone is showing you what you could settle into. Choose.',
      helpText:
        'The shape your body spends the next four weeks becoming, which sets your senses, your build, what doorways are for and how this entire city reads you before you speak. It is fixed for the whole story and it stays yours. It does not decide what you do about anything you find out afterwards.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'Who was standing at the front for you?',
      helpText: 'Family, or none, or somebody who is not family. Whatever you write, this world will work with it, including that nobody came.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. My aunt, who is a Bear, and who has been widening doorways in our house for other people for thirty years.',
    },
    {
      id: 'how_far',
      label: 'How much of an animal do you want to look?',
      helpText: 'Kin vary enormously and this is entirely yours. It affects nothing mechanical and it changes how every scene describes you.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'barely', label: 'Barely. Ears, eyes, teeth, and otherwise unchanged' },
        { id: 'clear', label: 'Clearly. Ears, tail, some fur or scaling, different hands' },
        { id: 'far', label: 'A long way. Build, legs, muzzle, the lot' },
        { id: 'uneven', label: 'Unevenly, in a way people find hard to place' },
        { id: 'undecided', label: 'You do not know yet, and it is going to take the full four weeks' },
      ],
    },
    {
      id: 'appearance',
      label: 'What did the hall see walk up to the stone?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Somebody in borrowed formal clothes that were cut for a body I do not have yet.',
    },
  ],
  endings: [
    {
      id: 'end_my_one_skin',
      name: 'My One Skin',
      rarity: 'COMMON',
      minTurn: 38,
      requires: { flagsSet: ['settled_well', 'the_story_has_a_shape'], flagsUnset: ['has_two', 'severed_it'] },
      condition:
        'One shape, chosen at sixteen, and a life that genuinely fits it. This is not the player failing to find the interesting plot — it is the outcome the entire world is built around and it is a good one. Write what the body turned out to be for, specifically, in ordinary things.',
      epilogue:
        'The doorway at home gets widened, or it does not. Somebody at the market has learned the portion without being told. Four years on there is a thing this body does that they cannot imagine having chosen otherwise, and about once a year they think about the shapes on the wafer and then think about something else.',
      hint: '',
    },
    {
      id: 'end_twiceborn',
      name: 'Twiceborn',
      rarity: 'RARE',
      minTurn: 42,
      requires: { flagsSet: ['has_two', 'integrated_it'] },
      condition:
        'Two shapes, integrated slowly, on nineteen pages nobody was allowed to have. Do not write this as a power-up. It took months, it was frightening, and the person who did it is now something the law has a word for and the medicine does not.',
      epilogue:
        'The second one settles about eight months in and stops asking for anything. It is not a costume and it is not a second self; it is a set of things the body can also do, and after the first year it is about as remarkable as being left-handed, to them, and to nobody else in Avara.',
      hint: '',
    },
    {
      id: 'end_the_choice_again',
      name: 'The Choice Again',
      rarity: 'RARE',
      minTurn: 42,
      requires: { flagsSet: ['severed_it'] },
      condition:
        'They gave up the shape they chose at sixteen and settled into another one. This is the option every regretful sixteen-year-old in this world has dreamed about and almost nobody has taken, and it costs a body four weeks of coming apart and a person a great deal more.',
      epilogue:
        'The cord goes in a drawer rather than a fire, which is a thing they decide about four times before it stays there. Nobody at home says the old shape’s name for about a year and then somebody does, at a table, and it is fine.',
      hint: '',
    },
    {
      id: 'end_no_more_menagerie',
      name: 'No More Ward Seven',
      rarity: 'RARE',
      minTurn: 44,
      requires: { flagsSet: ['the_ward_is_empty'], flagsUnset: ['the_concord_holds'] },
      condition:
        'Thirty-one people came up that stair. Write what it costs as well as what it buys, because two Heartstones under two cities were being steadied by what was taken in that ward, and the winter after is not a good one anywhere.',
      epilogue:
        'The lamps go out in four quarters of Aurelion eleven times in the following year and once for most of a day. Nobody dies of it, which is luck rather than planning. Thirty-one people go home, and eleven of them are met at a gate by families who were told fourteen months ago that they were dead.',
      hint: '',
    },
    {
      id: 'end_larkspire_accord',
      name: 'The Larkspire Accord',
      rarity: 'RARE',
      minTurn: 46,
      requires: {
        flagsSet: ['the_accord', 'has_the_protocol'],
        minFactionReputation: [{ factionId: 'faction_concord', value: 55 }],
      },
      condition:
        'The hardest outcome: a voluntary model, built slowly, with the institution rather than against it. Nineteen pages become policy, the ward becomes something people can leave, and the Heartstone problem gets solved out in the open by people who are allowed to work on it. Write the committee work, because that is what it actually is.',
      epilogue:
        'It takes six years and two Keepers. Choosing becomes a thing you are told the whole of beforehand, including what gets sealed, which about a third of families find unbearable and the rest find overdue. Sai publishes in the fourth year, under his own name, with both figures in the abstract.',
      hint: '',
    },
    {
      id: 'end_unsealed',
      name: 'Unsealed',
      rarity: 'UNIQUE',
      minTurn: 46,
      requires: { flagsSet: ['the_ledger_is_out', 'the_ward_is_empty'] },
      condition:
        'The Ledger went public and the ward emptied, and the whole seven-hundred-year arrangement came apart at once rather than carefully. Four hundred thousand adults found out in a week that they were sealed without being asked. Write the decade, not the moment, and do not decide for the reader whether it was worth it.',
      epilogue:
        'The Fever does not come back, which is the thing everybody was frightened of and which took eleven years to stop being frightened of. What does happen is messier and slower: an entire generation growing up without the word settled meaning anything, four cities on rationed Heartstones, and an argument that is still going.',
      hint: '',
    },
    {
      id: 'end_concord_holds',
      name: 'The Concord Holds',
      rarity: 'COMMON',
      minTurn: 40,
      requires: { flagsSet: ['the_concord_holds', 'agreed_with_edran'] },
      condition:
        'They heard the whole argument, including the part about what happens to the cities, and concluded he was right. Do not write this as capitulation or as villainy. It is a sixteen-year-old doing arithmetic about thirty-one people against four hundred thousand and arriving somewhere defensible and terrible.',
      epilogue:
        'Nothing changes, which is the point and is unbearable. The lamps stay on. The free draughts keep being handed out and keep genuinely helping. There is a corridor under the capital with thirty-one people on it, and the player knows exactly how many and exactly what for, and will for the rest of their life.',
      hint: '',
    },
    {
      id: 'end_hollow',
      name: 'Hollow',
      rarity: 'UNCOMMON',
      minTurn: 42,
      requires: { flagsSet: ['severed_it', 'holding_it_alone'] },
      condition:
        'They gave up the second shape and the first one did not come back properly, and they are living Unsettled as an adult, which nobody in this world does. Write the practical reality of it — the medicine, the paperwork, the way strangers cannot place them — rather than making it tragic.',
      epilogue:
        'There is no word for it and the Concord invents one, badly, for the file. The senses never fully arrive and never fully go. Within two years there are four other people in Avara doing the same thing and finding each other, which is not a movement and is not nothing.',
      hint: '',
    },
    {
      id: 'end_kaias_road',
      name: 'Kaia’s Road',
      rarity: 'RARE',
      minTurn: 44,
      requires: {
        flagsSet: ['the_ledger_is_answered'],
        minRelationship: [{ characterId: 'kaia', dimension: 'trust', value: 72 }],
      },
      condition:
        'She survived, she has stopped pretending the Raven is temporary, and the two of them are still doing this — together or separately, as colleagues, with a four-year age gap that the story has never once made anything of. Write it as work rather than as friendship, because that is how she would.',
      epilogue:
        'She goes back to the mountains eventually, which surprises nobody who knows what she was before all this. There are two Roadwardens on the northern routes now who do not carry warrants and who turn up when somebody with two shapes needs to be somewhere else by morning.',
      hint: '',
    },
    {
      id: 'end_lio_home',
      name: 'Lio Home',
      rarity: 'RARE',
      minTurn: 44,
      requires: {
        flagsSet: ['the_ward_is_empty'],
        minRelationship: [{ characterId: 'lio', dimension: 'trust', value: 65 }],
      },
      condition:
        'Four hundred and twenty-six days, thirty-one people, and an eighteen-year-old who would not go first. Write the arrival rather than the escape, and remember that his second shape never actually came up, so he has spent fourteen months being treated for something that was not there.',
      epilogue:
        'He does not stop counting things. He knows every one of the thirty by name and where they went and writes to about eleven of them. It takes him two years to be able to be in a room with the door shut, and his sister is extremely bad at not mentioning that.',
      hint: '',
    },
    {
      id: 'end_ren',
      name: 'What Ren Chose',
      rarity: 'UNCOMMON',
      minTurn: 40,
      requires: {
        flagsSet: ['knows:ren_regrets_it'],
        minRelationship: [{ characterId: 'ren', dimension: 'trust', value: 72 }],
      },
      condition:
        'Not about the player. About the person who stood at that stone with four generations watching and took the shape the family wanted. Whether Wolf turns out to fit is genuinely open and the ending should not decide it for them — regret is not proof the choice was wrong.',
      epilogue:
        'They pass the Academy entrance in the spring and are pleased about it, which they had not expected and find slightly humiliating. They are still up on the landing rails about once a month, and after the fourth year they stop, and they could not tell you when.',
      hint: '',
    },
    {
      id: 'end_went_home',
      name: 'Went Home',
      rarity: 'COMMON',
      minTurn: 26,
      requires: { flagsSet: ['went_home', 'left_the_map'] },
      condition:
        'They went back to Larkspire and were sixteen. Not out of fear and not as a failure — they saw what was under the hall and under the capital, and decided it was not theirs to fix, and went home. Everything else in this world continues without them and mostly does not get better.',
      epilogue:
        'The cord comes off at the end of the year like everybody else’s. There is a stall, or an apprenticeship, or the Academy. About twice a year something in the news is obviously part of it and they read four sentences and put it down, and that gets easier and never becomes easy.',
      hint: '',
    },
  ],
  opening:
    'You chose about four hours ago. Your hands have already started and it is the strangest thing that has ever happened to you.\n\n' +
    'The hall holds four hundred and every one of them is somebody’s family. The High Keeper is most of the way through a speech about one heart, one skin, one chosen road, and Ren has been whispering since the third row and has not stopped.\n\n' +
    'Then glass comes in above the eastern gallery.\n\n' +
    'A woman drops the whole height of it and lands on one knee. Snow-leopard ears. A long spotted tail. Blood on one sleeve and three Crown Wardens coming down the gallery stair behind her.\n\n' +
    'She rolls up, gets a hand under her, and black feathers burst along her left forearm.\n\n' +
    'Four hundred people stop breathing at the same time.',
  openingSuggestions: [
    'I do not look at the feathers. I look at what she is looking at, because she came through a window into a room with six exits and she has not glanced at a single one of them.',
    'There is a family two rows in front of me with a child in it. I am up and moving before I have decided anything, and I get between them and the middle of the floor, and my hands are doing something I have never felt them do.',
    'I turn to Ren. "Do not." I have got a handful of their sleeve, because I know exactly what they are about to do and their whole family is sitting in this row watching them decide.',
  ],
  publishedAt: '2026-09-10T12:00:00.000Z',
};

export const SECOND_SKIN = StoryVersion.parse(raw);
