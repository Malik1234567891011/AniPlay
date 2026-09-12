import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Primal Crown" — three days at a market, and a decade riding on them.
 *
 * The bible is a continent: five peoples, six ecological zones, a migration,
 * a legendary predator and a hidden network. The authoring problem is that a
 * world that size becomes a map with nothing happening on it, so this is built
 * around the three days the bible actually opens on — the crossing, the early
 * herds, and five delegations who each arrived certain the shift was somebody
 * else's doing. The continent is where the quests go; the crossing is where
 * the story is.
 *
 * Faction standing is per-faction and qualitative, which is what the bible asks
 * for and what `FactionDef.ranks` is. There is deliberately no global
 * reputation number: being trusted by the river people and distrusted by the
 * grassland riders is the normal state of anybody useful here, and one meter
 * cannot say that.
 *
 * White Maw is a `combatant` with a schedule and no dialogue, because it is an
 * animal. It can be killed, driven off, protected, or — under conditions the
 * world makes expensive — ridden. It is not the villain by default and the run
 * that never resolves it is not an incomplete run.
 *
 * Three variables. Wind is the only GOOD_HIGH: `resolveRest` refills those, and
 * a world whose only ascending-good resource is a bond meter repairs a
 * frightened animal's trust with a nap. So the bond is modelled as Wariness —
 * descending, raised by specific things done to an animal, and falling only
 * with time and proximity.
 */

const raw = {
  id: 'sv_primal_crown_1',
  storyId: 'story_primal_crown',
  version: 1,
  title: 'Primal Crown',
  fantasyLabel: 'The herds moved early. Somebody loses.',
  hook: 'The great herds set off six weeks early on a road nobody has used in forty years, and the five peoples who divide that road between them have three days to agree who crosses where.',
  premise:
    'The cups rattle on the trade tables before anybody works out why. Out past the tents a hundred thousand animals lift their heads at the same moment, and then the whole horizon starts moving south.\n\n' +
    'The great herds have set off six weeks early, on a road that is not the road they took last year, because the mountains have been shaking since spring.\n\n' +
    'Five peoples meet at this market every season to settle who crosses where. They now have three days to redraw an arrangement that took forty years to build, and every one of them arrived believing the change was somebody else’s doing.\n\n' +
    'Whoever holds the corridors when the herds arrive holds meat, breeding stock, water and trade for a decade. Whoever does not will spend the winter asking somebody who does.\n\n' +
    'You are here with whatever you brought: a mount or no mount, a people or none, a name that opens tents or one nobody has heard.\n\n' +
    'Something has also been killing bonded animals in the north and leaving them where they fell. Nobody wants to raise that until the corridor question is settled, so nobody is going to.\n\n' +
    'You need to work out, in three days, which of these five you would rather owe.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Adventure', 'Exploration', 'Monsters', 'Rivalry', 'Survival'],
  mechanicsChips: [
    'Five peoples, five standings',
    'Animals are not vehicles',
    'Bond anything, or nothing',
    'The migration does not wait',
    'A predator that is not a villain',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'MORAL_AMBIGUITY', 'ROMANCE'],
  intensity: 'MODERATE',
  creatorNote:
    'You can ride out of here on a raptor, a sabertooth, a river beast, something nobody has a word for, or on your own two feet. What the five peoples decide about the corridors is genuinely undecided, and a run where you spend three days trading, eating at other people’s fires and learning one animal properly is a real way to play this.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'market_lanes',
    startWorldMinute: 7 * 60 + 20,
    startingItems: [{ itemId: 'trade_tally', qty: 1 }],
    hardCanon: [
      'The Great Migration has begun six weeks early and on an altered route. This is real, it is caused by volcanic movement, and nobody at the crossing knows that yet.',
      'Five peoples meet at Sunscar Crossing under oath law: Emberclaw, Stoneback, Frostfang, Skyfire and Mireborn. The crossing is neutral ground and everybody there is armed.',
      'The Ashen Hand exists, works by fire, scent and captured predators, and wants the old alliances broken. The player may finish the story never having learned it exists.',
      'White Maw is a real animal. It has been wounded and driven repeatedly and that is why it kills without feeding. It is not supernatural unless the world is given a reason to make it so.',
      'Bond riding is a craft, not a birthright. Any people can ride any animal badly and every people rides one kind well.',
      'Mounts have temperament and memory. They can refuse, take fright, be injured, prefer somebody else, and die, and none of that is reversible by an apology.',
    ],
    toneGuide:
      'Big, colourful, adventurous. Wonder gets as much room as danger: the first time a mammoth walks past a market stall it should be worth three sentences. ' +
      'Animals behave like animals — they smell things before they see them, they are frightened by the wrong things, they have favourites, and they are never described as machinery. ' +
      'Nobody speaks in invented primitive dialect. These are people with oral law, astronomy, medicine and forty years of treaty history, and they argue like it. ' +
      'No faction is the bad one. Emberclaw daring reads as recklessness from outside and as competence from inside, and both readings have evidence. ' +
      'Quiet scenes carry the attachment: grooming, campfires, somebody’s aunt feeding you, a bad joke about another people’s food. Keep the enormous battles rare enough to stay enormous.',
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 12, agility: 13, mind: 12, presence: 12, resolve: 13, arcana: 8 },
  skills: [
    { id: 'riding', name: 'Riding', attribute: 'agility', description: 'Staying on something that has its own opinion about where the two of you are going.' },
    { id: 'beastlore', name: 'Beast Sense', attribute: 'mind', description: 'Reading an animal’s ears, weight and breathing a few seconds before it does the thing.' },
    { id: 'tracking', name: 'Tracking', attribute: 'mind', description: 'Ground, dung, broken grass, and how long ago the thing that made them went past.' },
    { id: 'bargain', name: 'Bargaining', attribute: 'presence', description: 'Knowing what a sack of salt is worth to somebody who has three and to somebody who has none.' },
    { id: 'oathspeak', name: 'Oath Speaking', attribute: 'presence', description: 'Saying a thing in front of witnesses in the form that makes it binding on five peoples.' },
    { id: 'spear', name: 'Spear', attribute: 'might', description: 'The long weapon everybody carries, used from the ground and from the back of something moving.' },
    { id: 'doctoring', name: 'Doctoring', attribute: 'resolve', description: 'Wounds, fevers and foaling, in people and in animals four times their size.' },
  ],
  resources: [
    {
      id: 'wind',
      name: 'Wind',
      max: 100,
      start: 78,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'Rider and mount are both finished. Reactions come a half-second late, which on the back of something at a gallop is the difference between a turn and a fall, and every animal in the vicinity can tell.',
      color: '#D9A441',
      bands: [
        {
          upTo: 24,
          behaviour:
            'Blown. Arms heavy, judgement slow, and the animal underneath picking up all of it through the reins and the knees. This is the band where a manageable situation becomes an accident and where sitting down by a fire and eating something is the strongest available move.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a long day at a market at altitude. Good for one more errand, one more argument, or one more ride, and honest about not being good for two of them.',
        },
        {
          upTo: 100,
          behaviour:
            'Whole. There is enough left to ride hard, hold a difficult negotiation without losing the thread, and still notice the thing at the edge of the herd that nobody else has noticed.',
        },
      ],
    },
    {
      id: 'unrest',
      name: 'Unrest',
      max: 100,
      start: 40,
      regenPerHour: 0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Five delegations are eating at each other’s fires and complaining about the food. The corridor question is an administrative problem with a committee attached to it, which is the most boring and best thing that has happened here in a generation.',
      color: '#A64B2A',
      bands: [
        {
          upTo: 30,
          behaviour:
            'A hard negotiation between people who expect to do business again. Tents are open, children run between camps, and the arguments are about numbers of head and width of ground. Somebody is already drafting a compromise nobody will love.',
        },
        {
          upTo: 62,
          behaviour:
            'Positions are hardening and the talk has moved from what is fair to what is owed. Delegations eat separately. Escorts get larger. Two peoples have started pricing water to each other and calling it a shortage, which it is not yet.',
        },
        {
          upTo: 85,
          behaviour:
            'Everybody is arranging for the possibility of everybody else. Pickets are doubled, the northern road is being scouted by three peoples at once, and the young riders of at least two of them have started saying out loud what their elders will not. Any incident now becomes an incident between peoples rather than between people.',
        },
        {
          upTo: 100,
          behaviour:
            'Oath law is a form of words that nobody is going to enforce. Somebody will move on a corridor within the day, everybody else will move in response, and the herds will arrive into it. Whatever happens next happens to more people than any of these five intended.',
        },
      ],
    },
    {
      id: 'wariness',
      name: 'Wariness',
      max: 100,
      start: 45,
      regenPerHour: -0.6,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'It comes when called across a crowded lane. It will stand while somebody it does not know puts a hand on it because you are there, sleep with its back to you, and go into water, fire and noise on the strength of your voice alone.',
      color: '#6B8E5A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Settled. It reads the rider rather than the reins, tolerates strangers on the rider’s say-so, and will attempt frightening things — crowds, water, standing still next to a predator — because the rider is calm about them. It also grieves and sulks, which is the other half of this.',
        },
        {
          upTo: 55,
          behaviour:
            'A working relationship. It does what it is asked, a beat late, and checks the rider’s face first. Strangers are a problem and unfamiliar ground is a negotiation. Nothing here fails, but nothing here is free either, and everything takes longer than it looks like it should.',
        },
        {
          upTo: 80,
          behaviour:
            'Braced. Ears back at the approach, a step sideways at the mounting, and a refusal roughly one time in three that will not be argued out of. It remembers a specific thing that was done to it and it is not wrong to. Riding it into anything difficult is now a gamble with an animal’s life in it.',
        },
        {
          upTo: 100,
          behaviour:
            'It has stopped counting the rider as safe. It will not be caught in open ground, it puts other animals between the two of them, and it has begun watching somebody else across the picket line. This is recoverable and it takes days and there is no gesture that shortcuts it.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'trade_tally',
      name: 'The Tally Cord',
      tags: ['document'],
      questItem: true,
      droppable: false,
      skillModifiers: { bargain: 1 },
      description: 'A length of braided cord with knots and coloured threads recording every debt you are owed and every one you owe. At the crossing it is the only document five peoples all agree to read.',
      loreText: 'Three of the knots are somebody else’s and you have been carrying them since spring. Nobody has asked for them back, which is its own kind of message.',
      icon: 'rope',
    },
    {
      id: 'salt_block',
      name: 'A Block of Grey Salt',
      tags: ['trade'],
      stackable: true,
      maxStack: 6,
      description: 'The size of two fists, wrapped in hide. Currency, medicine, preservative and the one thing every one of the five peoples runs short of before winter.',
      loreText: 'Mireborn salt is white and Stoneback salt is grey. Everybody claims to be able to tell the difference and about a third of them actually can.',
      icon: 'stone',
    },
    {
      id: 'bond_harness',
      name: 'A Rider’s Harness',
      tags: ['gear'],
      equipSlot: 'body',
      skillModifiers: { riding: 2 },
      description: 'Cut leather, bone toggles and a chest strap, shaped over years to one animal and one rider. Putting somebody else’s on is like wearing their boots.',
      loreText: 'The stitching says which people made it. An Emberclaw harness has a red thread through the girth and everybody at the crossing can read it from thirty feet.',
      icon: 'harness',
    },
    {
      id: 'long_spear',
      name: 'A Long Spear',
      tags: ['weapon'],
      equipSlot: 'hand',
      attributeModifiers: { might: 1 },
      description: 'Twice your height, weighted for use from the back of something moving, with a crossbar behind the head so it cannot go all the way through what you hit.',
      loreText: 'The crossbar is there because of what happens to a rider whose spear goes all the way through a charging animal.',
      icon: 'spear',
    },
    {
      id: 'scent_pot',
      name: 'A Sealed Scent Pot',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'Fired clay, waxed shut, containing something that smells of blood and burnt fat. Open it upwind of a picket line and every bonded animal within a mile tries to leave.',
      loreText: 'Nobody at this crossing makes these. The wax has a maker’s thumbprint pressed into it and it is a print somebody could be matched to.',
      icon: 'vial',
    },
    {
      id: 'burnt_hide',
      name: 'A Piece of Scorched Hide',
      tags: ['quest', 'evidence'],
      questItem: true,
      skillModifiers: { tracking: 2 },
      description: 'Cut from a dead grazer north of here. The burn is on the flank, it is old, and it is a shape that a grass fire does not make.',
      loreText: 'Held up to the light, the scorch runs in four parallel lines. Somebody drove this animal with a torch, at a walking pace, for a long way.',
      icon: 'hide',
    },
    {
      id: 'corridor_stones',
      name: 'The Corridor Stones',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'Five carved river stones, one per people, that together record forty years of agreements about who crosses where. They are laid out on a hide at the centre of the crossing and moving one is a formal act.',
      loreText: 'The Frostfang stone is the oldest and the most worn, because it has been moved more often than any of the others, always by them, always downward.',
      icon: 'stones',
    },
    {
      id: 'nightmeat',
      name: 'Somebody’s Cooking',
      tags: ['food'],
      consumable: { resourceId: 'wind', amount: 24, consumesItem: true },
      description: 'A bowl handed over at a fire by somebody who did not ask whether you were hungry. Fish, or marrow, or roots, depending on whose fire it was.',
      loreText: 'Refusing food at a Frostfang fire is not rude. Refusing it twice is a statement about the people who offered it.',
      icon: 'bowl',
    },
  ],
  abilities: [
    {
      id: 'read_the_animal',
      name: 'Read the Animal',
      tags: ['sight'],
      description: 'Take the ears, the weight on the front feet and the breathing, and know what it is about to do a few seconds before it does it.',
      affordances: ['read it', 'watch the animal', 'look at it', 'study the beast', 'what is it doing', 'check the herd', 'observe'],
      costs: [{ resourceId: 'wind', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'beastlore', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'steady_it',
      name: 'Steady It',
      tags: ['healing'],
      description: 'Get between a frightened animal and whatever is frightening it, and be the least interesting thing in its field of view until it comes down.',
      affordances: ['calm it', 'steady it', 'soothe', 'settle the animal', 'talk it down', 'get it under control', 'quiet it'],
      costs: [{ resourceId: 'wind', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'beastlore', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ride_it_down',
      name: 'Ride It Down',
      tags: ['movement'],
      description: 'Ask an animal for everything it has and then a little more, and get where you are going before the thing you are racing does.',
      affordances: ['ride', 'gallop', 'chase', 'ride hard', 'run it down', 'get there first', 'race'],
      costs: [
        { resourceId: 'wind', amount: 14 },
        { resourceId: 'wariness', amount: 9 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'riding', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'spear_work',
      name: 'Spear Work',
      tags: ['offensive'],
      description: 'Set the butt, pick the angle, and let something enormous arrive at the point rather than trying to reach it.',
      affordances: ['spear', 'attack', 'fight', 'stab', 'set the spear', 'brace', 'kill it', 'strike'],
      costs: [{ resourceId: 'wind', amount: 11 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'spear', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'speak_in_form',
      name: 'Speak In Form',
      tags: ['social'],
      description: 'Say the thing in front of witnesses in the shape that makes it binding, which is a specific shape and which everybody present can hear you getting right.',
      affordances: ['swear it', 'give my word', 'speak for them', 'make it binding', 'oath', 'say it formally', 'negotiate', 'argue'],
      costs: [{ resourceId: 'wind', amount: 9 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'oathspeak', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'trade_hard',
      name: 'Trade Hard',
      tags: ['social'],
      description: 'Work out what the thing in front of you is worth to the person holding it rather than to you, and then be patient about it.',
      affordances: ['trade', 'barter', 'haggle', 'buy', 'sell', 'make an offer', 'deal'],
      costs: [{ resourceId: 'wind', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bargain', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_ground',
      name: 'Read the Ground',
      tags: ['survival'],
      description: 'Broken grass, dung, the depth of a print in wet ground, and how many hours ago the thing that left them went past.',
      affordances: ['track', 'follow the trail', 'read the ground', 'look for tracks', 'search the area', 'find the trail', 'look for sign'],
      costs: [{ resourceId: 'wind', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'tracking', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'patch_them_up',
      name: 'Patch Them Up',
      tags: ['healing'],
      description: 'Stop bleeding, set a leg, bring a fever down. Works on a person and on something four times their size, with the same hands and a lot more rope.',
      affordances: ['heal', 'treat', 'bandage', 'doctor', 'help the wounded', 'stitch', 'set the bone', 'tend to it'],
      costs: [{ resourceId: 'wind', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'doctoring', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'push_the_herd',
      name: 'Push the Herd',
      tags: ['utility'],
      description: 'Move a great many animals somewhere they were not going, using noise, riders and the ground. It works, it is enormous, and everybody downwind finds out you did it.',
      affordances: ['move the herd', 'drive them', 'turn the herd', 'push them', 'redirect the animals', 'steer the migration'],
      costs: [
        { resourceId: 'wind', amount: 16 },
        { resourceId: 'unrest', amount: 11 },
      ],
      cooldownMinutes: 180,
      targetRule: 'AREA',
      check: { attribute: 'mind', skillId: 'riding', baseDc: 15 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'work_by_fear',
      name: 'Work By Fear',
      tags: ['utility'],
      description: 'Fire, scent and a captured predator upwind. Animals go where you want without your ever touching one, and so do the people who own them.',
      affordances: ['use fire', 'scare them off', 'stampede them', 'use the scent', 'drive them with fire', 'panic the animals', 'frighten them'],
      costs: [
        { resourceId: 'wind', amount: 12 },
        { resourceId: 'unrest', amount: 16 },
        { resourceId: 'wariness', amount: 14 },
      ],
      cooldownMinutes: 240,
      targetRule: 'AREA',
      check: { attribute: 'mind', skillId: 'beastlore', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_ashen_method'],
        lockedCopy: 'You know that animals can be moved by frightening them. You do not know how it is done at the scale somebody has been doing it at, and guessing at that with a torch in a dry season is how a person burns a corridor down.',
      },
    },
  ],
  locations: [
    {
      id: 'market_lanes',
      name: 'The Market Lanes',
      shortName: 'The Lanes',
      description:
        'Six hundred stalls in four crooked rows, roofed with hide against a sun that has not properly arrived yet. Salt, dried fish, antler, obsidian, rope, medicine, and somebody selling very small carved animals to children. The lanes are shoulder to shoulder and everybody in them is armed and nobody thinks that is remarkable.',
      artDirection:
        'Vast prehistoric trade market at dawn, hide-roofed stall rows, crowds in furs and woven cloth, obsidian and salt on tables, enormous horned animals moving between stalls, dust and low golden light. Colourful, bustling, anime key-visual energy.',
      connections: [
        { to: 'the_stone_circle', travelMinutes: 4, label: 'Down to the centre' },
        { to: 'the_picket_lines', travelMinutes: 5, label: 'Out to where the animals are' },
        { to: 'emberclaw_ground', travelMinutes: 7, label: 'The grassland camp' },
        { to: 'mireborn_landing', travelMinutes: 6, label: 'Down to the river' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'salt_block', qty: 3, ownerId: null, aka: ['salt', 'a block of salt', 'the grey salt'] },
        { itemId: 'long_spear', qty: 1, ownerId: null, aka: ['spear', 'a long spear', 'the weapon'] },
      ],
    },
    {
      id: 'the_stone_circle',
      name: 'The Circle',
      shortName: 'The Circle',
      description:
        'A flat hide the size of a room, pegged into the ground, with five carved river stones laid on it in a pattern forty years old. Five delegations sit around it. Anybody may stand at the edge and listen, and roughly two hundred people are doing so.',
      artDirection:
        'Open ceremonial ground at a prehistoric market, a huge pegged hide with five carved stones arranged on it, five seated delegations in distinct regional dress, a standing crowd behind them, banners of hide and bone. Formal, tense, sunlit.',
      connections: [
        { to: 'market_lanes', travelMinutes: 4, label: 'Back up into the lanes' },
        { to: 'stoneback_wharf', travelMinutes: 5, label: 'The trade wharf' },
        { to: 'frostfang_fires', travelMinutes: 6, label: 'The northern fires' },
        { to: 'skyfire_perch', travelMinutes: 8, label: 'Up to the perch' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'corridor_stones', qty: 1, ownerId: null, aka: ['the stones', 'corridor stones', 'the treaty', 'the carved stones'] },
      ],
    },
    {
      id: 'the_picket_lines',
      name: 'The Picket Lines',
      shortName: 'Pickets',
      description:
        'Half a mile of staked ground where four thousand animals are tethered by people who do not entirely trust each other’s animals. Raptors screened from sabertooths, sabertooths screened from everything. It smells enormous. This is where riders actually spend their time and where most of the crossing’s real business gets done.',
      artDirection:
        'Huge open picketing ground at a prehistoric market, rows of tethered raptors, sabertooths, horned herbivores and pterosaurs behind hide screens, riders grooming and arguing, dust, feed sledges, morning haze. Busy, sprawling, full of animal character.',
      connections: [
        { to: 'market_lanes', travelMinutes: 5, label: 'Back into the market' },
        { to: 'emberclaw_ground', travelMinutes: 4, label: 'The grassland camp' },
        { to: 'frostfang_fires', travelMinutes: 5, label: 'The northern fires' },
        { to: 'the_north_road', travelMinutes: 12, label: 'Out onto the north road' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'bond_harness', qty: 1, ownerId: 'kaia', aka: ['harness', 'a harness', 'riding gear', 'the tack'] },
      ],
    },
    {
      id: 'emberclaw_ground',
      name: 'The Emberclaw Ground',
      shortName: 'Emberclaw',
      description:
        'Not a camp so much as a wide flat area with tents around the edge and a great deal of racing in the middle. Four clans are here and three of them are not speaking to each other, which does not stop any of them betting on the fourth.',
      artDirection:
        'Open grassland camp with low tents around a wide dusty racing flat, feathered raptors and light carnivores in bright harness, riders in red-sashed leather, banners, spectators shouting. Fast, colourful, competitive.',
      connections: [
        { to: 'market_lanes', travelMinutes: 7, label: 'Back to the market' },
        { to: 'the_picket_lines', travelMinutes: 4, label: 'Over to the pickets' },
        { to: 'the_north_road', travelMinutes: 10, label: 'North, the fast way' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'stoneback_wharf',
      name: 'The Stoneback Wharf',
      shortName: 'Wharf',
      description:
        'Timber, rope, cranes worked by animals the size of houses, and more written record than the rest of this crossing put together. Everything here is measured, weighed, recorded on cord and stored under a roof. It is by a long way the wealthiest ground at the market and the least fun.',
      artDirection:
        'Massive timber trade wharf on a wide river, cranes and sledges powered by enormous horned herbivores, stacked cargo under hide roofs, clerks with knotted cords, orderly and prosperous. Solid, engineered, impressive.',
      connections: [
        { to: 'the_stone_circle', travelMinutes: 5, label: 'Up to the circle' },
        { to: 'mireborn_landing', travelMinutes: 7, label: 'Downriver to the landing' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'frostfang_fires',
      name: 'The Frostfang Fires',
      shortName: 'The Fires',
      description:
        'Nine fires in a wide ring with sleeping platforms between them, and a quiet you can hear from three hundred feet away. They came furthest, they will leave last, and they have been given the worst ground at this crossing for eleven years running without once mentioning it.',
      artDirection:
        'Ring of nine large campfires on cold open ground at dusk, raised sleeping platforms, sabertooths and dire wolves lying among people, woolly rhinos picketed beyond, furs and bone ornament, breath visible. Warm against cold, quiet, communal.',
      connections: [
        { to: 'the_stone_circle', travelMinutes: 6, label: 'Down to the circle' },
        { to: 'the_picket_lines', travelMinutes: 5, label: 'Over to the pickets' },
        { to: 'the_north_road', travelMinutes: 9, label: 'The road they came in on' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'nightmeat', qty: 2, ownerId: 'suri', aka: ['food', 'a bowl', 'something to eat', 'dinner'] },
      ],
    },
    {
      id: 'skyfire_perch',
      name: 'The Perch',
      shortName: 'Perch',
      description:
        'A finger of rock two hundred feet above the crossing with a rope stair up the back of it and no railing anywhere. Six pterosaurs and their riders live up here for the duration of the market. From the top you can see the whole crossing, the north road, and the dust of the herds.',
      artDirection:
        'Tall narrow rock spire above a vast market plain, rope stairs and hide shelters at the top, great pterosaurs perched and launching, riders in wind-cut leather with goggles of horn, enormous sky and distant dust. Vertiginous, airy, spectacular.',
      connections: [
        { to: 'the_stone_circle', travelMinutes: 8, label: 'Down the rope stair' },
        { to: 'blackglass_ridge', travelMinutes: 14, label: 'Out over the ridge' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'mireborn_landing',
      name: 'The Landing',
      shortName: 'Landing',
      description:
        'Floating walkways, reed matting and a dozen flat boats poled up from the delta, with hadrosaurs standing chest-deep alongside them chewing. It is the only ground at this crossing where somebody will treat your animal for nothing and ask what you fed it.',
      artDirection:
        'River landing of floating reed walkways and flat boats, hadrosaurs standing in shallow water, drying herbs and nets, low green light through overhanging trees, people working unhurriedly. Lush, practical, calm.',
      connections: [
        { to: 'market_lanes', travelMinutes: 6, label: 'Up to the market' },
        { to: 'stoneback_wharf', travelMinutes: 7, label: 'Upriver to the wharf' },
        { to: 'southern_grass', travelMinutes: 20, label: 'Downriver, the long way south' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_north_road',
      name: 'The North Road',
      shortName: 'North Road',
      description:
        'Not a road. A four-mile width of trodden ground the herds have used for longer than anybody has counted, running up between two ridges to the high country. Right now it has three separate peoples scouting it at the same time and all of them are pretending not to notice the others.',
      artDirection:
        'Enormous trodden migration corridor between two ridges, churned earth and grass, distant dust of moving herds, small groups of mounted scouts at great distances from each other, huge sky. Vast, open, tense.',
      connections: [
        { to: 'the_picket_lines', travelMinutes: 12, label: 'Back down to the crossing' },
        { to: 'emberclaw_ground', travelMinutes: 10, label: 'Back to the grassland camp' },
        { to: 'frostfang_fires', travelMinutes: 9, label: 'Back to the fires' },
        { to: 'blackglass_ridge', travelMinutes: 16, label: 'Up onto the black rock' },
        { to: 'the_bone_caves', travelMinutes: 18, label: 'Off the road, west' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [
        { itemId: 'burnt_hide', qty: 1, ownerId: null, aka: ['the hide', 'burnt hide', 'the scorched skin', 'the dead animal'] },
      ],
    },
    {
      id: 'blackglass_ridge',
      name: 'Blackglass Ridge',
      shortName: 'Blackglass',
      description:
        'A spine of volcanic rock that has been warm underfoot since spring, with new cracks in it and a smell of eggs on the wind. Nothing grazes here any more. This is where the ground has been moving, and it is the actual reason the herds turned, and about four people alive have worked that out.',
      artDirection:
        'Ridge of black volcanic glass and broken rock, steam venting from new fissures, sulphurous haze, no vegetation, a dead sky above and a green plain visible far below. Alien, hot, wrong.',
      connections: [
        { to: 'the_north_road', travelMinutes: 16, label: 'Down to the corridor' },
        { to: 'skyfire_perch', travelMinutes: 14, label: 'Back to the perch' },
        { to: 'ashen_camp', travelMinutes: 11, lockedByFlag: 'knows:the_ashen_camp', label: 'Down into the broken ground' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: -2 },
      takeableItems: [],
    },
    {
      id: 'the_bone_caves',
      name: 'The Bone Caves',
      shortName: 'Bone Caves',
      description:
        'Three chambers in a limestone bluff, floored with the bones of animals nobody at this crossing has a name for. Every people here has a different story about the caves and all of the stories agree that a bonded animal will walk into them calmly and will not walk back out on its own.',
      artDirection:
        'Limestone cave chambers floored with enormous ancient bones and skulls of unfamiliar species, shafts of daylight through fissures, ochre handprints on the walls, dust in the air. Awed, still, old.',
      connections: [{ to: 'the_north_road', travelMinutes: 18, label: 'Back east to the corridor' }],
      discoveredByDefault: false,
      mapPosition: { x: -1, y: -2 },
      takeableItems: [],
    },
    {
      id: 'ashen_camp',
      name: 'The Broken Ground',
      shortName: 'Broken Ground',
      description:
        'Four hide shelters in a fold of rock below the ridge, three cages, and a great deal of fired clay. Nobody here wears anybody’s colours. The animals in the cages are predators, they are all injured in the same specific way, and they have all been kept hungry on purpose.',
      artDirection:
        'Concealed camp in a fold of volcanic rock, hide shelters, heavy wooden cages containing injured predators, racks of sealed clay pots, banked fires, people in unmarked clothing. Furtive, methodical, quietly horrible.',
      connections: [{ to: 'blackglass_ridge', travelMinutes: 11, label: 'Back up onto the ridge' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: -2 },
      takeableItems: [
        { itemId: 'scent_pot', qty: 1, ownerId: 'vesh', aka: ['the pot', 'a clay pot', 'the scent', 'the sealed jar'] },
      ],
    },
    {
      id: 'southern_grass',
      name: 'The Southern Grass',
      shortName: 'The South',
      description:
        'What all of this is about. Nine days south of the crossing, a plain of standing grass higher than a rider’s knee, wide enough that a herd of eighty thousand disappears into it. Whoever arrives here first with animals alive has had a good year.',
      artDirection:
        'Endless southern grassland under an immense sky, grass to knee height moving in wind, the first arriving herds as dark masses on the horizon, birds rising. Open, hopeful, enormous.',
      connections: [{ to: 'mireborn_landing', travelMinutes: 20, label: 'Back upriver' }],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_stoneback',
      name: 'The Stoneback Confederacy',
      description: 'River-valley farmers, engineers and traders who move enormous horned animals and enormous quantities of goods, and whose oath law is the reason this crossing is neutral ground at all.',
      startingReputation: 20,
      ranks: [
        { atReputation: -40, label: 'Oathbroken' },
        { atReputation: 0, label: 'A stranger with a tally' },
        { atReputation: 35, label: 'Named in the record' },
        { atReputation: 65, label: 'Witness to an oath' },
      ],
      allies: ['faction_mireborn'],
      enemies: ['faction_ashen'],
    },
    {
      id: 'faction_emberclaw',
      name: 'The Emberclaw Clans',
      description: 'Grassland riders on raptors and light carnivores, fastest people at this crossing and the worst at agreeing with each other. Four clans, four opinions, one very good reason to be scouting the north road right now.',
      startingReputation: 15,
      ranks: [
        { atReputation: -40, label: 'Ridden against' },
        { atReputation: 0, label: 'Somebody at the rail' },
        { atReputation: 35, label: 'Worth racing' },
        { atReputation: 65, label: 'Rides with the clan' },
      ],
      allies: [],
      enemies: ['faction_ashen'],
    },
    {
      id: 'faction_frostfang',
      name: 'The Frostfang Tribes',
      description: 'Northern hunting kin on sabertooths, dire wolves and mammoths. Came the furthest, given the worst ground eleven years running, and have never once raised it at the circle.',
      startingReputation: 10,
      ranks: [
        { atReputation: -40, label: 'Not fed' },
        { atReputation: 0, label: 'Given a place at a fire' },
        { atReputation: 35, label: 'Fed without asking' },
        { atReputation: 65, label: 'Counted as kin' },
      ],
      allies: [],
      enemies: ['faction_ashen'],
    },
    {
      id: 'faction_skyfire',
      name: 'The Skyfire Nomads',
      description: 'Cliff and desert people on pterosaurs, who carry every message that crosses this region and therefore know what is in most of them. Rich in information and poor in ground.',
      startingReputation: 15,
      ranks: [
        { atReputation: -40, label: 'Not carried' },
        { atReputation: 0, label: 'A paying customer' },
        { atReputation: 35, label: 'Told things early' },
        { atReputation: 65, label: 'Flown for nothing' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_mireborn',
      name: 'The Mireborn Federation',
      description: 'Delta and wetland people on hadrosaurs and river beasts, with the best medicine and the best plant knowledge in the region, consistently underestimated by everybody who has ever needed either.',
      startingReputation: 20,
      ranks: [
        { atReputation: -40, label: 'Turned off the water' },
        { atReputation: 0, label: 'Tied up at the landing' },
        { atReputation: 35, label: 'Treated for nothing' },
        { atReputation: 65, label: 'Given a boat' },
      ],
      allies: ['faction_stoneback'],
      enemies: ['faction_ashen'],
    },
    {
      id: 'faction_ashen',
      name: 'The Ashen Hand',
      description: 'Not a people. A network with no colours, no ground and no elders, which moves animals by frightening them and moves peoples the same way, and which wants the corridor agreements to fail.',
      startingReputation: -10,
      ranks: [
        { atReputation: -40, label: 'A problem to be solved' },
        { atReputation: 0, label: 'Not yet relevant' },
        { atReputation: 35, label: 'Useful' },
        { atReputation: 65, label: 'Holding a corridor' },
      ],
      allies: [],
      enemies: ['faction_stoneback', 'faction_emberclaw', 'faction_frostfang', 'faction_mireborn'],
    },
  ],
  characters: [
    {
      id: 'kaia',
      name: 'Kaia Thorn',
      role: 'Emberclaw raptor rider, the fastest at this crossing, and the one who will still be arguing about the corridor when everybody else has gone to bed',
      cardBlurb:
        'She will race you, bet against you and get to the north road before you do, and she is the only person here who has already worked out that the herds turning is not somebody’s fault. Whether she is your rival or your riding partner is up to you.',
      pronouns: 'she/her',
      publicTraits: ['Turns anything into a wager', 'Physically incapable of sitting through a formal speech', 'First to a thing that is on fire'],
      hiddenDrives: [
        'She wants one of the older clans to say out loud, at the circle, that her father was not the man they said he was',
        'She is frightened that the recklessness people accuse her of is real and inherited, and rides harder to find out',
      ],
      values: [
        'A rider who looks after their animal before they look after themselves',
        'Getting there and finding out, rather than sending somebody and waiting',
      ],
      fears: [
        'Becoming the story her father became: a name four clans use as a warning',
        'That Emberclaw will be given a corridor as a favour rather than take one as a right',
      ],
      socialStyle:
        'Interrupts, apologises for interrupting, interrupts again. Stands too close and talks with her hands. Will tell you exactly what she thinks of your riding within ninety seconds of meeting you.',
      boundaries: [
        'Will not have somebody else speak for her clan at the circle, including somebody doing her a favour',
        'Will not race an animal that is not sound, and will end a friendship over somebody who does',
      ],
      goals: [
        'Get Emberclaw onto the north corridor by right rather than by permission',
        'Find out what actually turned the herds before the other four peoples finish blaming each other',
      ],
      secrets: [
        {
          id: 'kaia_the_raid',
          fact: 'Her father was blamed for the raid at Sixwater. He was in fact riding to stop it and got there second, and the two people who could say so are Stoneback and have not.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells it in a rush, once, to somebody who has already defended her in front of other people without being asked to.',
        },
        {
          id: 'kaia_the_ground',
          fact: 'She rode the north road eight days ago, felt the ground warm through her mount’s feet on the black ridge, and has not reported it because it sounds like an excuse.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She mentions it sideways to anybody who says the herds turned for a reason nobody chose.',
        },
      ],
      speechStyle:
        'Fast, clipped, competitive. Sentences arrive half-finished because the next one is more interesting. Frames everything as a bet or a race, including things that are neither. Openly contemptuous of formal phrasing and visibly unable to produce it.',
      topics: ['the north corridor', 'her clan', 'her father', 'the black ridge', 'racing', 'your mount', 'the other four peoples'],
      voiceSamples: [
        'Left side. Left side, take the left, I have got the rope — no, you have got the rope, go.',
        'Fifty says I am on the ridge before your lot have finished standing around that hide arguing about stones.',
        'You want the honest version or the version I say at the circle? Because the circle version has forty extra words in it and none of them mean anything.',
        'I felt it come up through his feet. Warm rock, eight days ago, and I have said nothing, because who is going to believe a Thorn about ground.',
      ],
      appearance:
        'Twenty-three, dark copper hair in a rough braid coming apart at the end, sun-browned, amber eyes, wiry and quick, in cut leather riding harness with a red woven sash at the waist.',
      visualHook: 'The red sash, worn as a belt and permanently half-untied, which she reties mid-sentence about six times an hour.',
      silhouette: 'Perpetually mid-stride or already mounted, one shoulder dropped, braid swinging.',
      artSeed: 'pc-kaia-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'competitive', 'furious', 'stricken'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'emberclaw_ground', activity: 'asleep beside her mount, badly' },
        { startMinute: 360, endMinute: 480, locationId: 'market_lanes', activity: 'the lanes at first light, buying rope and arguing about the price' },
        { startMinute: 480, endMinute: 780, locationId: 'emberclaw_ground', activity: 'racing, and losing money on other people racing' },
        { startMinute: 780, endMinute: 960, locationId: 'the_north_road', activity: 'out on the corridor, scouting it alone again' },
        { startMinute: 960, endMinute: 1200, locationId: 'the_picket_lines', activity: 'grooming, and talking to anybody who stops' },
        { startMinute: 1200, endMinute: 1440, locationId: 'emberclaw_ground', activity: 'at the fire, being the loudest thing at it' },
      ],
      homeLocationId: 'emberclaw_ground',
      knowledgeScope: ['kaia', 'emberclaw', 'the_north_road', 'blackglass_ridge', 'bond_riding', 'sunscar_crossing'],
      startingRelationship: { trust: 30, affection: 25, respect: 35, fear: 0, rivalry: 45 },
      gates: [
        { id: 'kaia_rides_with_you', label: 'She scouts the corridor with you rather than alone', kind: 'ALLIANCE', requires: { trust: 55, respect: 60 } },
        { id: 'kaia_tells_you_about_sixwater', label: 'She tells you about her father', kind: 'TRUST', requires: { trust: 68, flagsSet: ['spoke:kaia'] } },
        { id: 'kaia_closer', label: 'Whatever this has become gets named', kind: 'ROMANCE', requires: { trust: 70, affection: 72 } },
      ],
      attributes: { might: 11, agility: 17, mind: 13, presence: 14, resolve: 14, arcana: 8 },
      companion: null,
      scouting: {
        learnRate: 1.2,
        cap: 6,
        revealCopy: 'She cuts inside before you commit. "You always go right when you are unsure. Every single time. I have been watching you do it for two days."',
      },
      combatant: { health: 45, defenseDc: 15, damage: 9, tags: ['rider', 'raptor'] },
    },
    {
      id: 'suri',
      name: 'Suri Snow',
      role: 'Frostfang sabertooth rider, here to secure the northern herd routes, and the person at this crossing who talks least and notices most',
      cardBlurb:
        'She will feed you before she asks you anything, she has counted the corridor width more accurately than the delegation arguing about it, and she has three younger siblings whose winter depends on how these three days go.',
      pronouns: 'she/her',
      publicTraits: ['Answers in four words or fewer until she likes you', 'Feeds people without discussing it', 'Never once mentions how far they travelled'],
      hiddenDrives: [
        'She wants the other four peoples to notice, without being told, that Frostfang has taken the worst ground eleven years running',
        'She would rather be underestimated than have to explain herself, and knows that preference has cost her people ground',
      ],
      values: [
        'Feeding whoever is in front of you, including somebody you are about to argue with',
        'Competence over talk, and the specific competence of doing a cold job properly the first time',
      ],
      fears: [
        'Going home with a corridor that does not carry enough animals to winter on',
        'That being quiet reads as agreement, and that eleven years of it has been read exactly that way',
      ],
      socialStyle:
        'Long silences that are not awkward to her and are to everybody else. Answers the question asked and not the one implied. Warms up all at once, without warning, usually over food.',
      boundaries: [
        'Will not perform gratitude for something her people were owed',
        'Will not let anybody handle her sabertooth as a demonstration for other people',
      ],
      goals: [
        'Come out of this crossing with a northern route that carries enough head to feed nine hundred people',
        'Get her youngest brother onto a mount before the winter, which is a thing she has not told anybody',
      ],
      secrets: [
        {
          id: 'suri_the_count',
          fact: 'She walked the disputed corridor herself before the market opened and measured it. It is narrower than the Stoneback survey says, which means the numbers the whole circle is arguing over are wrong.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She produces it flatly, with the count, to the first person who asks her for a fact rather than an opinion.',
        },
        {
          id: 'suri_the_carcasses',
          fact: 'Her hunting party found four bonded animals dead and uneaten on the way south, all with old burns on the flank, and she decided not to raise it because Frostfang raising a grievance goes nowhere.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it once she has been fed at somebody else’s fire, which nobody at this crossing has ever done.',
        },
      ],
      speechStyle:
        'Very short. Often one clause. Understatement used as humour and never flagged as humour, so half the crossing thinks she has none. Talks about weather, ground and meat in preference to intentions. Never uses a person’s name to soften something.',
      topics: ['the northern route', 'her siblings', 'the dead animals', 'the corridor width', 'her sabertooth', 'the cold'],
      voiceSamples: [
        'Not narrow. Narrower than they wrote down. Different problem.',
        'Eat that. You have been upright since dark and you are about to do something stupid on an empty stomach.',
        'Four dead. Not eaten. Burns on the flank, old ones. I did not say anything, because we say things and then we go home.',
        'Good cat. Bad temper. We have that in common and it has never once been a problem between us.',
      ],
      appearance:
        'Late twenties, close-cropped pale hair, a broad flat face weathered by wind, heavy layered furs even in this heat, and forearms scarred in parallel lines from a hundred grooming sessions.',
      visualHook: 'A sabertooth’s enormous head resting across her boots wherever she sits down, which she never acknowledges.',
      silhouette: 'Seated, low and square, with something very large asleep against her.',
      artSeed: 'pc-suri-01',
      portrait: null,
      expressions: ['neutral', 'dry', 'watchful', 'warm', 'cold'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'frostfang_fires', activity: 'asleep on a platform, between two fires' },
        { startMinute: 330, endMinute: 660, locationId: 'frostfang_fires', activity: 'the fires, feeding people, saying little' },
        { startMinute: 660, endMinute: 840, locationId: 'the_stone_circle', activity: 'at the edge of the circle, listening and counting' },
        { startMinute: 840, endMinute: 1080, locationId: 'the_picket_lines', activity: 'the pickets, working on a cat who does not like the heat' },
        { startMinute: 1080, endMinute: 1440, locationId: 'frostfang_fires', activity: 'back at the fires, cooking for more people than arrived' },
      ],
      homeLocationId: 'frostfang_fires',
      knowledgeScope: ['suri', 'frostfang', 'the_north_road', 'bond_riding', 'the_dead_herds', 'sunscar_crossing'],
      startingRelationship: { trust: 25, affection: 20, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        { id: 'suri_gives_you_the_count', label: 'She gives you what she actually measured', kind: 'TRUST', requires: { trust: 50, flagsSet: ['spoke:suri'] } },
        { id: 'suri_speaks_at_the_circle', label: 'She will say it out loud in front of five peoples', kind: 'ALLIANCE', requires: { trust: 70, respect: 65 } },
      ],
      attributes: { might: 15, agility: 12, mind: 14, presence: 10, resolve: 16, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 55, defenseDc: 16, damage: 11, tags: ['rider', 'sabertooth'] },
    },
    {
      id: 'ilya',
      name: 'Ilya Crest',
      role: 'Skyfire scout and information broker, who has already sold what he knows about the north to two different peoples and is open to a third',
      cardBlurb:
        'He flew over the black ridge three weeks ago and saw fires where there should not have been fires. He has sold that twice already, he will happily sell it to you, and he is completely unembarrassed about all three transactions.',
      pronouns: 'he/him',
      publicTraits: ['Prices things out loud, mid-sentence', 'Genuinely delighted by other people’s leverage', 'Never pretends a favour was not a transaction'],
      hiddenDrives: [
        'He wants to matter to the settlement rather than merely be paid by everybody in it, and has no idea how to ask for that',
        'He is trying to find out what the fires were without anybody realising he does not already know',
      ],
      values: [
        'An honest price, stated up front, including for things people think should be free',
        'Being the first to know, which he would do for nothing and has never once admitted',
      ],
      fears: [
        'Selling the one piece of information that gets a great many people killed, and finding out afterwards',
        'That Skyfire has no ground worth defending and everybody has noticed',
      ],
      socialStyle:
        'Arrives already talking. Names his price before you have asked a question, then negotiates himself down while you are still deciding. Physically incapable of pretending not to be interested.',
      boundaries: [
        'Will not sell the position of somebody’s family or picket line, which is the one thing he is asked for most',
        'Will not carry a message he has not read, and says so before taking it',
      ],
      goals: [
        'Sell the north ridge sighting a third time, ideally to somebody who will do something with it',
        'Get the Skyfire delegation a seat at the corridor talks rather than a courier’s stool behind them',
      ],
      secrets: [
        {
          id: 'ilya_sold_it_twice',
          fact: 'He sold the ridge fires to Stoneback and to Emberclaw in the same week, and neither of them knows the other has it, which means both are acting on a partial picture on purpose.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it cheerfully, unprompted, to anybody who asks him a second question about the first sale.',
        },
        {
          id: 'ilya_saw_the_cages',
          fact: 'On the last pass he flew low enough to see cages, and he has not sold that part to anybody, because he has not worked out who it would be safe to sell it to.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It comes out when somebody shows him physical proof rather than paying him for the story.',
        },
      ],
      speechStyle:
        'Quick, warm and mercantile. Interrupts himself to name a price and then argues against his own price. Compliments people by telling them what their information is worth. Ends transactions with a small joke at his own expense.',
      topics: ['the ridge fires', 'what things cost', 'the north road', 'his mount', 'who is paying whom', 'the delegations'],
      voiceSamples: [
        'Two blocks of salt. No — one, and you tell me what you find, and I will consider that generous of me later when I am poorer.',
        'I sold it to Stoneback on a Tuesday and to your lot on the Friday. Nobody asked whether I had. That is not lying, that is nobody asking.',
        'Everything above four hundred feet belongs to me, and everything below it belongs to whoever paid me last.',
        'There were cages. I have not sold that one. I have been carrying it around for three weeks trying to work out who it does not get me killed to say it to.',
      ],
      appearance:
        'Thirty, lean and windburned, dark hair cropped to nothing on one side, wind-cut leathers with a dozen small pockets, and horn goggles pushed up on his forehead indoors and out.',
      visualHook: 'Horn-and-hide flying goggles worn on the forehead permanently, including at dinner and while asleep.',
      silhouette: 'Leaning back on a rail with his weight on his heels and both hands occupied.',
      artSeed: 'pc-ilya-01',
      portrait: null,
      expressions: ['neutral', 'delighted', 'calculating', 'evasive', 'rattled'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'skyfire_perch', activity: 'asleep in a hide shelter at the top' },
        { startMinute: 300, endMinute: 540, locationId: 'skyfire_perch', activity: 'the dawn flight, and coming back with things to sell' },
        { startMinute: 540, endMinute: 840, locationId: 'market_lanes', activity: 'working the lanes, talking to absolutely everybody' },
        { startMinute: 840, endMinute: 1020, locationId: 'the_stone_circle', activity: 'behind the Skyfire delegation, on a stool' },
        { startMinute: 1020, endMinute: 1440, locationId: 'skyfire_perch', activity: 'back up top, counting the day’s takings out loud' },
      ],
      homeLocationId: 'skyfire_perch',
      knowledgeScope: ['ilya', 'skyfire', 'blackglass_ridge', 'the_north_road', 'the_delegations', 'sunscar_crossing'],
      startingRelationship: { trust: 20, affection: 25, respect: 25, fear: 0, rivalry: 10 },
      gates: [
        { id: 'ilya_sells_you_the_ridge', label: 'He sells you what he saw over the ridge', kind: 'OTHER', requires: { trust: 35, hasItems: ['salt_block'] } },
        { id: 'ilya_gives_you_the_cages', label: 'He tells you the part he has not sold to anybody', kind: 'TRUST', requires: { trust: 62, hasItems: ['burnt_hide'] } },
      ],
      attributes: { might: 9, agility: 16, mind: 15, presence: 15, resolve: 12, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 35, defenseDc: 14, damage: 7, tags: ['rider', 'pterosaur'] },
    },
    {
      id: 'torren',
      name: 'Torren Vale',
      role: 'Stoneback heir and negotiator, whose family holds the corridor survey everybody is arguing from, and who is a great deal sharper than his manners suggest',
      cardBlurb:
        'He is the reason this crossing has rules and he will restate your position better than you did before he disagrees with it. His family has also been quietly buying captured predators, which he half knows, and which you may end up being the one to tell him.',
      pronouns: 'he/him',
      publicTraits: ['Never raises his voice and is never spoken over', 'Cites a year and a precedent for everything', 'Writes down what other people said and reads it back'],
      hiddenDrives: [
        'He wants to be the one who held the region together, and cannot tell how much of his patience is principle and how much is that',
        'He has begun to suspect what his family has been buying and is choosing the order in which he finds out',
      ],
      values: [
        'A written agreement that outlives the people who made it',
        'The unglamorous work — surveys, tallies, water rights — that keeps four hundred thousand people fed',
      ],
      fears: [
        'A war that takes forty years of trade network with it in a season',
        'Discovering that the stability he has spent his life defending was bought with something he would not have approved',
      ],
      socialStyle:
        'Listens completely, then restates your position better than you did, and only then disagrees. Uses the pause before answering as a tool. Almost impossible to provoke and extremely easy to disappoint.',
      boundaries: [
        'Will not agree to anything at the circle he cannot put on the cord in front of witnesses',
        'Will not be handed evidence in private that he is expected to act on in public without saying where it came from',
      ],
      goals: [
        'Get five signatures on a corridor arrangement before the herds arrive, at almost any cost to Stoneback',
        'Find out what his uncle has been paying for, and decide what to do about it in that order',
      ],
      secrets: [
        {
          id: 'torren_the_purchases',
          fact: 'Vale money has bought eleven captured predators in two years through an intermediary his uncle handles. He knows the number and does not yet know what they were for.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He gives you the number himself, precisely, if you bring him proof of the method rather than an accusation about his family.',
        },
        {
          id: 'torren_the_survey',
          fact: 'The Stoneback corridor survey is eleven years old and was never re-walked. He has known it was probably wrong for a year and has used it anyway because a wrong shared number is holding the talks together.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He concedes it instantly, and with visible relief, to anybody who arrives with a more recent measurement.',
        },
      ],
      speechStyle:
        'Measured, complete sentences with the subordinate clause doing the real work. Dates and precedents used the way other people use adjectives. Never says a flat no; says what would have to be true instead. Formal address, even under pressure, especially under pressure.',
      topics: ['the corridor survey', 'oath law', 'his family', 'the treaty', 'water rights', 'the other delegations'],
      voiceSamples: [
        'In the eleventh year we gave Frostfang the eastern ground on the understanding it was temporary, and I have been quietly aware for some time that nobody ever revisited the word temporary.',
        'That is not impossible. It requires four things to be true first, none of which is in my gift. Go and make them true, and then come back and ask me in front of witnesses.',
        'Eleven animals, over two years, through a man my uncle deals with and I do not. That is the number. You may do what you like with it and I would rather you did it in front of witnesses.',
        'Your measurement is more recent than mine and it is worse for my people. Put it on the hide.',
      ],
      appearance:
        'Late twenties, tall and slightly stooped from a life at low tables, dark neat hair, layered woven cloth in confederacy greens, and a knotted record cord around one wrist that he touches while thinking.',
      visualHook: 'A record cord wound twice around his left wrist, thumbed knot by knot whenever he is working something out.',
      silhouette: 'Standing very still with his hands behind his back while everybody around him gestures.',
      artSeed: 'pc-torren-01',
      portrait: null,
      expressions: ['neutral', 'considering', 'grave', 'pleased', 'appalled'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'stoneback_wharf', activity: 'asleep in the counting house, on purpose' },
        { startMinute: 360, endMinute: 600, locationId: 'stoneback_wharf', activity: 'the wharf, the tallies, and four people wanting decisions' },
        { startMinute: 600, endMinute: 960, locationId: 'the_stone_circle', activity: 'at the circle, doing the actual negotiating' },
        { startMinute: 960, endMinute: 1140, locationId: 'market_lanes', activity: 'walking the lanes deliberately, being seen to' },
        { startMinute: 1140, endMinute: 1440, locationId: 'stoneback_wharf', activity: 'back at the wharf, still working' },
      ],
      homeLocationId: 'stoneback_wharf',
      knowledgeScope: ['torren', 'stoneback', 'the_corridor_survey', 'oath_law', 'sunscar_crossing', 'the_delegations'],
      startingRelationship: { trust: 30, affection: 15, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        { id: 'torren_shows_you_the_survey', label: 'He admits the survey is eleven years old', kind: 'TRUST', requires: { trust: 55, flagsSet: ['spoke:torren'] } },
        { id: 'torren_names_his_uncle', label: 'He gives you the number and the name', kind: 'TRUST', requires: { trust: 68, hasItems: ['scent_pot'] } },
      ],
      attributes: { might: 10, agility: 10, mind: 17, presence: 16, resolve: 15, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 14, damage: 7, tags: ['confederacy'] },
    },
    {
      id: 'mako',
      name: 'Mako Reed',
      role: 'Mireborn healer and river guide, who will treat your animal for nothing and then tell you exactly what you did to it',
      cardBlurb:
        'He will treat your animal for nothing and then tell you exactly what you did to it. If the corridor talks fail the refugees come down his river, he has already worked out how many that is, and he will give you the number if you ask him a real question.',
      pronouns: 'he/him',
      publicTraits: ['Works while talking and does not look up', 'Corrects the romantic version of things immediately', 'Feeds and treats anybody, including people he has just insulted'],
      hiddenDrives: [
        'He wants one of the four larger peoples to acknowledge that the delta is where their failures go to be looked after',
        'He is quietly building a count of how many the wetlands could actually take, and the number frightens him',
      ],
      values: [
        'The animal in front of him, before the politics of who owns it',
        'Saying the physical truth of a thing out loud, especially at a table where people are enjoying themselves',
      ],
      fears: [
        'Sixty thousand people arriving at the delta in one season with nothing',
        'Being thanked warmly by people who have already decided not to change anything',
      ],
      socialStyle:
        'Unhurried to the point of being unnerving. Asks what you actually did rather than what you intended. Delivers the bleak fact in the same tone as the friendly one, which people find hard.',
      boundaries: [
        'Will not treat an animal in front of an audience being invited to admire it',
        'Will not let somebody describe a war as a solution in his hearing without saying what it costs in people',
      ],
      goals: [
        'Get a written water and passage arrangement for the delta before, not after, the corridor fight starts',
        'Work out which of the four larger peoples would actually honour one',
      ],
      secrets: [
        {
          id: 'mako_the_count',
          fact: 'He has calculated what the wetlands can feed through a bad winter. It is under twelve thousand, and four peoples are currently assuming it is limitless.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He states the number plainly to the first person who asks what happens if the talks fail, rather than asking him to be hopeful.',
        },
        {
          id: 'mako_treated_them',
          fact: 'Three injured predators were brought to him a year ago by people with no colours who paid in worked obsidian, and the injuries were identical and deliberate.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He recognises the pattern instantly if he is shown a wound, and he will describe it in medical detail without being asked twice.',
        },
      ],
      speechStyle:
        'Calm, plain and physically specific. Names the tissue, the bone, the number of days. Answers a large question with a small concrete one. Never raises his voice and never softens a number. Uses "you" where other people would use a passive construction.',
      topics: ['the delta', 'what the wetlands can carry', 'wounds', 'the injured predators', 'water rights', 'your animal'],
      voiceSamples: [
        'The tendon is cut and it will not come back. He has nine or ten good years ahead of him and none of them involve carrying you. Sit down.',
        'Twelve thousand. That is what the wetlands feed through a bad winter. Four peoples upriver are working on the assumption that the number is the sky.',
        'People keep telling me what they meant. I am asking what you did. Those are different sentences and only one of them has a treatment.',
        'Somebody brought me three of them last year. Same wound, same place, same side. That is not hunting. That is a method.',
      ],
      appearance:
        'Forties, close-shaved head, heavy forearms, a river guide’s layered reed-cloth over bare shoulders, and hands stained permanently green-brown to the wrist from the plants he works with.',
      visualHook: 'Hands dyed green-brown to the wrist, which he does not clean off because it comes back within a day.',
      silhouette: 'Crouched at the level of whatever he is treating, back to the room.',
      artSeed: 'pc-mako-01',
      portrait: null,
      expressions: ['neutral', 'absorbed', 'blunt', 'kind', 'grim'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'mireborn_landing', activity: 'asleep on a boat, under matting' },
        { startMinute: 300, endMinute: 720, locationId: 'mireborn_landing', activity: 'the landing, treating whatever is brought to him' },
        { startMinute: 720, endMinute: 900, locationId: 'the_picket_lines', activity: 'walking the pickets, looking at other people’s animals uninvited' },
        { startMinute: 900, endMinute: 1140, locationId: 'the_stone_circle', activity: 'at the circle, mostly listening, occasionally ruining the mood' },
        { startMinute: 1140, endMinute: 1440, locationId: 'mireborn_landing', activity: 'back at the landing, still working' },
      ],
      homeLocationId: 'mireborn_landing',
      knowledgeScope: ['mako', 'mireborn', 'the_delta', 'doctoring', 'the_injured_predators', 'sunscar_crossing'],
      startingRelationship: { trust: 35, affection: 20, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        { id: 'mako_gives_you_the_number', label: 'He tells you what the wetlands can actually carry', kind: 'TRUST', requires: { trust: 50, flagsSet: ['spoke:mako'] } },
        { id: 'mako_identifies_the_method', label: 'He names the wound pattern for what it is', kind: 'ALLIANCE', requires: { trust: 60, hasItems: ['burnt_hide'] } },
      ],
      attributes: { might: 13, agility: 11, mind: 16, presence: 12, resolve: 16, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: { health: 45, defenseDc: 14, damage: 8, tags: ['mireborn'] },
    },
    {
      id: 'vesh',
      name: 'Vesh Ardan',
      role: 'A beast-breaker with no colours who sells difficult animals at the pickets and is extremely good at it',
      cardBlurb:
        'She can put a hand on an animal nobody else can get near, she charges very little, and she does not belong to any of the five peoples here. She is the first genuinely useful person you will meet at the crossing, which is the point of her.',
      pronouns: 'she/her',
      publicTraits: ['Handles animals other people have given up on', 'Prices below everybody and never explains why', 'Never talks about where she is from'],
      hiddenDrives: [
        'She wants the corridor talks to fail, and she wants to be standing next to somebody useful when they do',
        'She has begun to like some of the people she is here to ruin, and is managing that as a technical problem',
      ],
      values: [
        'Precision. A method that works every time on every animal, regardless of what anybody feels about it',
        'Not lying, in the narrow sense of never saying a false sentence, which she is rigorous about',
      ],
      fears: [
        'Being identified by her work rather than by anything she has said',
        'That the network she serves regards her as one of the animals in the cages',
      ],
      socialStyle:
        'Direct, low-volume and entirely without small talk. Answers technical questions completely and personal ones with a shorter true sentence. Watches hands rather than faces.',
      boundaries: [
        'Will not discuss where she learned it, and will end the conversation rather than deflect',
        'Will not take on an animal she thinks cannot be brought back, and says so at once',
      ],
      goals: [
        'Keep the north corridor unusable until the arrangement collapses',
        'Recruit somebody at this crossing who is good with animals and short of people who owe them nothing',
      ],
      secrets: [
        {
          id: 'vesh_the_hand',
          fact: 'She is Ashen Hand. The scent pots are hers, the wounds on the predators are her work, and she has been at every one of the last four crossings under a different trade.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She does not deny it when shown a pot with her thumbprint in the wax. She asks what you want, which is itself the answer.',
        },
        {
          id: 'vesh_the_method',
          fact: 'The method is repeatable and teachable: a wound in a fixed place, hunger, fire and scent, and any predator becomes a tool that moves herds across a hundred miles.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She will teach it, straightforwardly and without conditions, to anybody who asks her to after learning what she is.',
        },
      ],
      speechStyle:
        'Flat, technical, and unhurried, with no warmth and no menace in it either. Describes animals in terms of mechanism — pressure, hunger, the angle of a wound — and people almost never. Answers a question about herself with one short true sentence and then stops.',
      topics: ['difficult animals', 'the method', 'the cages', 'what a predator is for', 'the corridor', 'her price'],
      voiceSamples: [
        'It is not vicious. It has been hurt in the shoulder and it has learned that everything approaching from the left is the thing that hurt it. Approach from the right and it is a different animal.',
        'Hunger, a wound in a fixed place, fire behind and scent in front. Four things. It moves eighty thousand head across a hundred miles and it never touches one of them.',
        'You are asking where I learned it. I am not going to tell you that.',
        'You could hold the corridor with six people and a dry season. Nobody here has worked that out yet, which is why they are all sitting around a hide arguing about stones.',
      ],
      appearance:
        'Thirties, wiry, hair scraped back hard, unmarked hide clothing in no people’s colours, and both forearms scarred in overlapping crescents from a lifetime of animals that did not want to be handled.',
      visualHook: 'Overlapping crescent bite-scars up both forearms, uncovered in any weather.',
      silhouette: 'Standing side-on to whatever she is watching, hands loose and empty.',
      artSeed: 'pc-vesh-01',
      portrait: null,
      expressions: ['neutral', 'assessing', 'technical', 'still', 'candid'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'the_picket_lines', activity: 'awake at the far end of the lines, where the difficult ones are' },
        { startMinute: 300, endMinute: 780, locationId: 'the_picket_lines', activity: 'working animals nobody else will touch' },
        { startMinute: 780, endMinute: 960, locationId: 'market_lanes', activity: 'the lanes, buying clay and wax and nothing else' },
        { startMinute: 960, endMinute: 1200, locationId: 'the_picket_lines', activity: 'back at the far end of the lines' },
        { startMinute: 1200, endMinute: 1440, locationId: 'ashen_camp', activity: 'gone, by a route nobody has followed' },
      ],
      homeLocationId: 'ashen_camp',
      knowledgeScope: ['vesh', 'the_ashen_method', 'ashen_camp', 'blackglass_ridge', 'bond_riding', 'the_picket_lines'],
      startingRelationship: { trust: 15, affection: 10, respect: 30, fear: 5, rivalry: 0 },
      gates: [
        { id: 'vesh_works_your_animal', label: 'She will put a hand on something of yours', kind: 'OTHER', requires: { trust: 30, flagsSet: ['spoke:vesh'] } },
        { id: 'vesh_stops_lying_by_omission', label: 'She answers the question you actually asked', kind: 'TRUST', requires: { trust: 55, hasItems: ['scent_pot'] } },
      ],
      attributes: { might: 12, agility: 14, mind: 16, presence: 11, resolve: 16, arcana: 10 },
      companion: null,
      scouting: {
        learnRate: 1.4,
        cap: 7,
        revealCopy: 'She watches your hands rather than your face while you talk. "You go quiet before you decide something. Every time. You have done it three times since you sat down."',
      },
      combatant: { health: 50, defenseDc: 16, damage: 10, tags: ['ashen', 'handler'] },
    },
  ],
  quests: [
    {
      id: 'q_the_crossing',
      title: 'Three Days At Sunscar',
      summary: 'Five peoples, one hide with five stones on it, and an arrangement that took forty years to build and now has to be redrawn before the herds arrive.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['kaia', 'torren', 'suri', 'ilya', 'mako'],
      involvedLocationIds: ['market_lanes', 'the_stone_circle', 'the_picket_lines'],
      knownRewardCopy: 'A place at the edge of the circle, and some idea of which of these five would actually keep a promise.',
      steps: [
        {
          id: 'the_loose_animal',
          playerCopy: 'There is a frightened predator loose in a lane full of people. Do something, or do not.',
          directorNotes:
            'Not a tutorial fight. Every route is legitimate including walking away, and the animal is a juvenile that is terrified rather than hunting. Whatever the player does is watched by about forty people and by Kaia, who is already on the stall roof with a rope and no plan.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'calmed_it',
              label: 'Get between it and the crowd and bring it down',
              predicate: { flagsSet: ['used:steady_it'] },
              setsFlags: ['calmed_the_juvenile', 'the_pickets_noticed_you'],
              closesFlags: ['killed_the_juvenile'],
            },
            {
              routeId: 'killed_it',
              label: 'Put it down before it reaches the children',
              predicate: { flagsSet: ['used:spear_work'] },
              setsFlags: ['killed_the_juvenile'],
              closesFlags: ['calmed_the_juvenile'],
            },
            {
              routeId: 'cleared_the_lane',
              label: 'Forget the animal and move the people',
              predicate: { flagsSet: ['used:read_the_animal'] },
              setsFlags: ['cleared_the_lane', 'the_pickets_noticed_you'],
              closesFlags: [],
            },
            {
              routeId: 'let_it_run',
              label: 'Get out of the way and let it find its own way out',
              predicate: { flagsSet: ['visited:market_lanes'] },
              setsFlags: ['let_it_run'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['knows:the_crossing'], abilities: [], reputation: [] },
        },
        {
          id: 'find_out_what_they_want',
          playerCopy: 'Five delegations, five stories about why the herds turned. Go and collect them.',
          directorNotes:
            'This is the world-building step and it should be pleasant. Fires, food, racing, an argument about somebody’s cooking. Each people gives a different account and every account is honest and partial. Nobody here is lying and all five of them are wrong about the cause.',
          enterWhen: { flagsSet: ['knows:the_crossing'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ate_at_their_fires',
              label: 'Get fed at somebody else’s fire',
              predicate: { flagsSet: ['spoke:suri'], atLocation: 'frostfang_fires' },
              setsFlags: ['ate_at_the_fires', 'knows:the_dead_herds', 'knows:the_real_width'],
              closesFlags: [],
            },
            {
              routeId: 'bought_the_story',
              label: 'Pay for the version somebody has already sold twice',
              predicate: { flagsSet: ['spoke:ilya'], hasItems: ['salt_block'] },
              setsFlags: ['bought_the_ridge_story', 'knows:the_ridge_fires'],
              closesFlags: [],
            },
            {
              routeId: 'sat_at_the_circle',
              label: 'Stand at the edge of the circle for a whole afternoon',
              predicate: { flagsSet: ['spoke:torren'], atLocation: 'the_stone_circle' },
              setsFlags: ['knows:the_survey', 'the_circle_knows_your_face'],
              closesFlags: [],
            },
            {
              routeId: 'raced_them',
              label: 'Take a bet on the flat and lose money to the Emberclaw',
              predicate: { flagsSet: ['spoke:kaia'] },
              setsFlags: ['raced_the_clans', 'the_pickets_noticed_you'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 70, items: [], flags: ['knows:five_accounts'], abilities: [], reputation: [] },
        },
        {
          id: 'the_corridor_question',
          playerCopy: 'The circle is going to settle the north corridor. Decide whether you have anything to put on the hide.',
          directorNotes:
            'Four ways to move this and they are not equivalent. A more recent measurement changes the numbers everybody is arguing from. Physical proof changes the subject entirely. Speaking for a people commits you to them. Doing nothing is a real option and the circle settles it without you, which should not be written as a punishment.',
          enterWhen: { flagsSet: ['knows:five_accounts'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'brought_the_measurement',
              label: 'Put a newer measurement on the hide',
              predicate: { flagsSet: ['knows:the_real_width'], atLocation: 'the_stone_circle' },
              setsFlags: ['the_numbers_changed', 'frostfang_owes_you'],
              closesFlags: ['the_circle_settled_it_without_you'],
            },
            {
              routeId: 'brought_the_proof',
              label: 'Put the evidence on the hide instead of an argument',
              predicate: { hasItems: ['scent_pot'], atLocation: 'the_stone_circle' },
              setsFlags: ['the_hand_is_named', 'the_numbers_changed'],
              closesFlags: ['the_circle_settled_it_without_you'],
            },
            {
              routeId: 'spoke_for_one',
              label: 'Speak for one of the five, in form, in front of the others',
              predicate: { flagsSet: ['used:speak_in_form'], atLocation: 'the_stone_circle' },
              setsFlags: ['spoke_for_a_people'],
              closesFlags: ['stayed_unaligned'],
            },
            {
              routeId: 'stayed_out',
              label: 'Stay at the edge and let five peoples settle their own business',
              predicate: { flagsSet: ['knows:five_accounts'] },
              setsFlags: ['stayed_unaligned', 'the_circle_settled_it_without_you'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 110, items: [], flags: ['the_circle_has_ruled'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_dead_herds',
      title: 'Killed And Left',
      summary: 'Bonded animals are being killed north of the crossing and not eaten. Four peoples have decided that is somebody else’s problem until the corridor is settled.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:the_dead_herds'] },
      involvedCharacterIds: ['suri', 'mako', 'ilya', 'vesh'],
      involvedLocationIds: ['the_north_road', 'blackglass_ridge', 'mireborn_landing', 'ashen_camp'],
      knownRewardCopy: 'What is actually killing them, which is not what any of the five peoples currently believes.',
      steps: [
        {
          id: 'go_and_look',
          playerCopy: 'Go north and look at one of the dead animals yourself.',
          directorNotes:
            'The burn is on the flank, it is old, and it runs in four parallel lines at a walking pace, which is not a grass fire and not a predator. A player who does not know what they are looking at can still bring the hide to somebody who does.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_the_ground_properly',
              label: 'Work out from the ground what happened here',
              predicate: { flagsSet: ['used:read_the_ground'], atLocation: 'the_north_road' },
              setsFlags: ['knows:the_burns', 'read_it_yourself'],
              closesFlags: [],
            },
            {
              routeId: 'took_it_to_the_healer',
              label: 'Cut a piece off and take it to somebody who treats wounds',
              predicate: { hasItems: ['burnt_hide'], atLocation: 'mireborn_landing' },
              setsFlags: ['knows:the_burns', 'mako_named_it'],
              closesFlags: [],
            },
            {
              routeId: 'flew_the_ridge',
              label: 'Pay to be flown over the high ground and look from there',
              predicate: { minRelationship: [{ characterId: 'ilya', dimension: 'trust', value: 62 }] },
              setsFlags: ['knows:the_ridge_fires', 'knows:the_ashen_camp'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 90, items: [], flags: ['following_the_burns'], abilities: [], reputation: [] },
        },
        {
          id: 'the_broken_ground',
          playerCopy: 'Find where the pots and the injured predators come from.',
          directorNotes:
            'Four shelters, three cages and a great deal of fired clay. The animals are injured identically and kept hungry on purpose. There is no confrontation here unless the player starts one, and Vesh will answer technical questions completely if asked technical questions.',
          enterWhen: { flagsSet: ['following_the_burns'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'walked_in',
              label: 'Walk into the camp and ask',
              predicate: { flagsSet: ['knows:the_ashen_camp'], atLocation: 'ashen_camp' },
              setsFlags: ['knows:the_ashen_hand', 'walked_in_openly'],
              closesFlags: [],
            },
            {
              routeId: 'took_a_pot',
              label: 'Take a pot out of there and leave without being seen',
              predicate: { hasItems: ['scent_pot'] },
              setsFlags: ['knows:the_ashen_hand', 'have_the_pot'],
              closesFlags: [],
            },
            {
              routeId: 'asked_the_handler',
              label: 'Ask the beast-breaker at the pickets a technical question',
              predicate: { minRelationship: [{ characterId: 'vesh', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:the_ashen_hand', 'knows:the_ashen_method', 'vesh_told_you'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 130, items: [], flags: ['knows:who_is_doing_it'], abilities: ['work_by_fear'], reputation: [] },
        },
        {
          id: 'what_you_do_about_it',
          playerCopy: 'You know how it is being done and roughly who by. Decide what that is worth.',
          directorNotes:
            'Naming it at the circle ends the corridor argument and starts a different one. Taking it apart yourself is a fight against people who are very good at fighting with animals. Joining is a coherent route and must be written as one — she is offering competence and no colours to somebody who has spent three days watching five peoples fail to agree.',
          enterWhen: { flagsSet: ['knows:who_is_doing_it'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'named_it_at_the_circle',
              label: 'Name it in front of all five',
              predicate: { flagsSet: ['used:speak_in_form'], atLocation: 'the_stone_circle' },
              setsFlags: ['the_hand_is_named', 'five_peoples_know'],
              closesFlags: ['joined_the_hand'],
            },
            {
              routeId: 'burned_the_camp',
              label: 'Take the camp apart and let the cages out',
              predicate: { flagsSet: ['used:spear_work'], atLocation: 'ashen_camp' },
              setsFlags: ['the_camp_is_gone', 'freed_the_predators'],
              closesFlags: ['joined_the_hand'],
            },
            {
              routeId: 'joined_the_hand',
              label: 'Decide six people and a dry season is a better system than five peoples and a hide',
              predicate: { flagsSet: ['knows:the_ashen_method'], minRelationship: [{ characterId: 'vesh', dimension: 'trust', value: 65 }] },
              setsFlags: ['joined_the_hand'],
              closesFlags: ['the_hand_is_named', 'the_camp_is_gone'],
            },
            {
              routeId: 'sold_it',
              label: 'Sell it to whichever of the five will pay most for it',
              predicate: { flagsSet: ['used:trade_hard'] },
              setsFlags: ['sold_what_you_knew'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 160, items: [], flags: ['the_north_is_answered'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_white_one',
      title: 'The White One',
      summary: 'An albino tyrannosaur has been killing bonded animals along the corridor for two years. Three peoples want it dead and one of them thinks it is sacred.',
      kind: 'SIDE',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:the_dead_herds'] },
      involvedCharacterIds: ['suri', 'kaia', 'mako', 'vesh'],
      involvedLocationIds: ['the_north_road', 'the_bone_caves', 'blackglass_ridge'],
      knownRewardCopy: 'Whatever the largest animal any of these people have ever seen turns out to be for.',
      steps: [
        {
          id: 'find_the_white_one',
          playerCopy: 'Find it before one of the hunting parties does.',
          directorNotes:
            'It is enormous, it is old, it is covered in injuries that are all in the same place, and it is not hunting when the player finds it. It is standing in the bone caves, which is where bonded animals go and do not come back from, and it is doing nothing at all.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'tracked_it',
              label: 'Track it to the caves',
              predicate: { flagsSet: ['used:read_the_ground'], atLocation: 'the_bone_caves' },
              setsFlags: ['found_white_maw', 'found_it_first'],
              closesFlags: [],
            },
            {
              routeId: 'followed_the_hunt',
              label: 'Ride out with a hunting party and get there with them',
              predicate: { flagsSet: ['used:ride_it_down'], atLocation: 'the_bone_caves' },
              setsFlags: ['found_white_maw', 'came_with_the_hunt'],
              closesFlags: ['found_it_first'],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['knows:white_maw'], abilities: [], reputation: [] },
        },
        {
          id: 'what_it_is_for',
          playerCopy: 'Decide what an animal that has been driven for two years is.',
          directorNotes:
            'It can be killed, and killing it is a legitimate and celebrated act that solves nothing, because the thing driving it is still in a fold of rock eleven miles away. It can be treated. It can be left. Under conditions that cost a great deal it can be bonded, and that is not a reward for being nice to it.',
          enterWhen: { flagsSet: ['knows:white_maw'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'bonded_it',
              label: 'Approach from the side that has never been the side that hurt it',
              predicate: {
                flagsSet: ['knows:the_ashen_method', 'used:steady_it'],
                atLocation: 'the_bone_caves',
              },
              setsFlags: ['bonded_white_maw'],
              closesFlags: ['killed_white_maw'],
            },
            {
              routeId: 'treated_it',
              label: 'Get close enough to do something about the shoulder',
              predicate: { flagsSet: ['used:patch_them_up'], atLocation: 'the_bone_caves' },
              setsFlags: ['treated_white_maw'],
              closesFlags: ['killed_white_maw'],
            },
            {
              routeId: 'killed_it',
              label: 'Kill it, and be the person who killed it',
              predicate: { flagsSet: ['used:spear_work'], atLocation: 'the_bone_caves' },
              setsFlags: ['killed_white_maw'],
              closesFlags: ['bonded_white_maw', 'treated_white_maw'],
            },
            {
              routeId: 'left_it',
              label: 'Back out of the caves and tell nobody where it is',
              predicate: { flagsSet: ['knows:white_maw'] },
              setsFlags: ['left_white_maw'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 170, items: [], flags: ['white_maw_is_settled'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_your_own_animal',
      title: 'Something Of Your Own',
      summary: 'Everybody at this crossing is somebody because of what they ride. You may or may not be, and either is a whole way to play this.',
      kind: 'SIDE',
      startsActive: true,
      involvedCharacterIds: ['kaia', 'vesh', 'mako', 'suri'],
      involvedLocationIds: ['the_picket_lines', 'market_lanes', 'mireborn_landing'],
      knownRewardCopy: 'An animal that knows your voice, or a very good reason not to have one.',
      steps: [
        {
          id: 'the_picket_lines_at_dusk',
          playerCopy: 'Half a mile of tethered animals and four thousand of them. Work out what you are doing about that.',
          directorNotes:
            'Four routes and none of them is the correct one. A player who ends the story on foot, on good terms with five peoples, has played this properly. Do not have anybody push a mount on somebody who has not asked for one.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_on_a_difficult_one',
              label: 'Take on something nobody else will touch',
              predicate: { flagsSet: ['used:steady_it'], atLocation: 'the_picket_lines' },
              setsFlags: ['have_a_mount', 'took_the_difficult_one'],
              closesFlags: ['on_foot_by_choice'],
            },
            {
              routeId: 'traded_for_one',
              label: 'Buy one properly, from somebody, at a price',
              predicate: { flagsSet: ['used:trade_hard'], hasItems: ['salt_block'] },
              setsFlags: ['have_a_mount', 'bought_it_honestly'],
              closesFlags: ['on_foot_by_choice'],
            },
            {
              routeId: 'given_one',
              label: 'Be given one by somebody who has decided you are worth it',
              predicate: { minRelationship: [{ characterId: 'kaia', dimension: 'trust', value: 60 }] },
              setsFlags: ['have_a_mount', 'was_given_it'],
              closesFlags: ['on_foot_by_choice'],
            },
            {
              routeId: 'stayed_on_foot',
              label: 'Walk out of here the way you walked in',
              predicate: { flagsSet: ['visited:the_picket_lines'] },
              setsFlags: ['on_foot_by_choice'],
              closesFlags: ['have_a_mount'],
            },
          ],
          rewards: { xp: 80, items: [{ itemId: 'bond_harness', qty: 1 }], flags: ['the_mount_question_is_settled'], abilities: [], reputation: [] },
        },
        {
          id: 'what_it_costs_to_keep_one',
          playerCopy: 'Find out what the animal thinks of the last three days.',
          directorNotes:
            'This step reads the Wariness band and plays it back as behaviour, not as a number. An animal that has been ridden hard, frightened and left with strangers is a different animal from one that has been fed and groomed and left alone, and the difference should arrive as a refusal or an act of trust in front of witnesses.',
          enterWhen: { flagsSet: ['the_mount_question_is_settled'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'it_came_when_called',
              label: 'It comes across a crowded lane because you asked',
              predicate: { flagsSet: ['have_a_mount', 'used:steady_it'] },
              setsFlags: ['the_animal_trusts_you'],
              closesFlags: ['the_animal_refused_you'],
            },
            {
              routeId: 'it_refused',
              label: 'It puts three other animals between the two of you',
              predicate: { flagsSet: ['have_a_mount', 'used:work_by_fear'] },
              setsFlags: ['the_animal_refused_you'],
              closesFlags: ['the_animal_trusts_you'],
            },
            {
              routeId: 'nothing_to_settle',
              label: 'Own nothing, owe nothing, walk',
              predicate: { flagsSet: ['on_foot_by_choice'] },
              setsFlags: ['nothing_to_settle'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 110, items: [], flags: ['you_know_where_you_stand'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_south',
      title: 'Nine Days South',
      summary: 'Whatever the circle decided, the herds are still moving, and at the end of it there is a plain of standing grass that somebody arrives at first.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['the_circle_has_ruled'] },
      involvedCharacterIds: ['kaia', 'suri', 'torren', 'mako', 'ilya'],
      involvedLocationIds: ['the_north_road', 'southern_grass', 'mireborn_landing'],
      knownRewardCopy: 'How many animals and how many people come out of the other end of this season.',
      steps: [
        {
          id: 'the_last_night_at_the_crossing',
          playerCopy: 'The market is coming down. Decide who you are travelling with.',
          directorNotes:
            'Tents folding, debts settled on cord, people saying goodbye who will not see each other for a year. This is the warm step and it should be allowed to be warm even in a run that has gone badly.',
          enterWhen: { flagsSet: ['the_circle_has_ruled'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_with_one_of_them',
              label: 'Travel down with one of the five',
              predicate: { flagsSet: ['spoke_for_a_people'] },
              setsFlags: ['riding_with_a_people'],
              closesFlags: ['went_alone'],
            },
            {
              routeId: 'took_the_river',
              label: 'Go down the water instead of the corridor',
              predicate: { atLocation: 'mireborn_landing', minRelationship: [{ characterId: 'mako', dimension: 'trust', value: 55 }] },
              setsFlags: ['riding_with_a_people', 'took_the_river'],
              closesFlags: ['went_alone'],
            },
            {
              routeId: 'went_alone',
              label: 'Go on your own, in your own time, by whatever route you like',
              predicate: { flagsSet: ['the_circle_has_ruled'] },
              setsFlags: ['went_alone', 'left_the_map'],
              closesFlags: ['riding_with_a_people'],
            },
          ],
          rewards: { xp: 120, items: [], flags: ['the_crossing_is_over'], abilities: [], reputation: [] },
        },
        {
          id: 'what_arrives',
          playerCopy: 'Nine days, and then find out what is standing in the grass at the end of it.',
          directorNotes:
            'The payoff step. It reads Unrest and the corridor outcome and plays them back as arithmetic on the ground: how many head, how many peoples, whether anybody is fighting over water at the southern end. Do not editorialise. Count things.',
          enterWhen: { flagsSet: ['the_crossing_is_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'they_all_got_through',
              label: 'Five peoples, one arrangement, most of the animals alive',
              predicate: { flagsSet: ['the_numbers_changed', 'the_hand_is_named'], atLocation: 'southern_grass' },
              setsFlags: ['the_herds_reached_south', 'one_fire_five_peoples'],
              closesFlags: ['the_migration_broke'],
            },
            {
              routeId: 'mostly_got_through',
              label: 'A bad arrangement, kept',
              predicate: { flagsSet: ['the_circle_has_ruled'], atLocation: 'southern_grass' },
              setsFlags: ['the_herds_reached_south'],
              closesFlags: [],
            },
            {
              routeId: 'it_came_apart',
              label: 'Water fights at the southern end and a third of what set out',
              predicate: { flagsSet: ['joined_the_hand'] },
              setsFlags: ['the_migration_broke'],
              closesFlags: ['the_herds_reached_south'],
            },
            {
              routeId: 'never_went',
              label: 'Be somewhere else entirely when it happens',
              predicate: { flagsSet: ['left_the_map'] },
              setsFlags: ['you_were_not_there'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 220, items: [], flags: ['the_season_is_decided'], abilities: [], reputation: [] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_horizon_moves',
      atWorldMinute: 7 * 60 + 50,
      locationId: null,
      publicCopy:
        'The cups go still and then start again, harder. Out past the tents the whole northern horizon has turned a colour it was not, and it is moving.',
      directorNotes:
        'The migration arriving six weeks early, seen from the middle of a market. Everybody stops. Then everybody starts moving at once and in five different directions, and the day the crossing had planned stops existing.',
      setsFlags: ['the_herds_have_started'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_first_dead_herd',
      atWorldMinute: 15 * 60 + 40,
      locationId: 'the_picket_lines',
      publicCopy:
        'A Frostfang hunting party comes in from the north with nothing on their sledges and everybody at the pickets stops to watch them not unload.',
      directorNotes:
        'They found four bonded animals dead and uneaten a day north. Suri is with them. She does not intend to raise it at the circle and will say why to anybody who asks her directly rather than sympathetically.',
      setsFlags: ['knows:the_dead_herds'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'suri', toLocationId: 'the_picket_lines' }],
    },
    {
      id: 'we_the_survey_argument',
      atWorldMinute: 1440 + 10 * 60,
      locationId: 'the_stone_circle',
      publicCopy:
        'Two delegations are arguing about a number and a third has quietly worked out that neither of them has been up the corridor since the year the number was written.',
      directorNotes:
        'The Stoneback survey is eleven years old and was never re-walked. Torren knows. Suri has a fresher measurement in her head and will not volunteer it. Everything on the hide depends on a figure nobody has checked.',
      setsFlags: ['knows:the_survey'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_crossing'],
      movesCharacters: [{ characterId: 'torren', toLocationId: 'the_stone_circle' }],
    },
    {
      id: 'we_the_water_price',
      atWorldMinute: 1440 + 17 * 60,
      locationId: 'market_lanes',
      publicCopy:
        'The price of water in the lanes has doubled since this morning, and the people selling it are apologetic and are not lowering it.',
      directorNotes:
        'The first ordinary person to be hurt by the politics. There is no shortage — there is an expectation of one, which is worse and arrives faster. Somebody at a stall will explain the reasoning and it will be completely reasonable.',
      setsFlags: ['the_water_went_up'],
      cancelledByFlags: ['the_hand_is_named'],
      requiresFlags: ['knows:the_crossing'],
      movesCharacters: [],
    },
    {
      id: 'we_a_picket_line_bolts',
      atWorldMinute: 2 * 1440 + 4 * 60 + 30,
      locationId: 'the_picket_lines',
      publicCopy:
        'Something upwind at four in the morning and a hundred and forty animals come off the lines at once, through two camps, in the dark.',
      directorNotes:
        'This is the method used on the crossing itself. Nobody is killed and a great deal is broken, and by morning three peoples have each decided which of the other two did it. Do not let anybody deduce the truth from the event alone.',
      setsFlags: ['the_pickets_bolted'],
      cancelledByFlags: ['the_hand_is_named', 'the_camp_is_gone'],
      requiresFlags: ['knows:the_crossing'],
      movesCharacters: [],
    },
    {
      id: 'we_the_ridge_smokes',
      atWorldMinute: 2 * 1440 + 12 * 60,
      locationId: null,
      publicCopy:
        'The black ridge north of the corridor has been putting up a thin column since dawn, and by midday there are two of them, and nobody at the crossing has a story for it that fits.',
      directorNotes:
        'The actual cause of the migration shift, visible to everybody and understood by nobody. Skyfire riders have seen it up close. It is not the Ashen Hand and it will be blamed on them, or on a people, by tomorrow.',
      setsFlags: ['knows:the_ground_is_moving'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_white_maw_takes_one',
      atWorldMinute: 2 * 1440 + 20 * 60,
      locationId: 'the_north_road',
      publicCopy:
        'Something took a full-grown bonded rhino off the corridor in the open, in daylight, and left it where it fell, and the riders who saw it will not agree on how big it was.',
      directorNotes:
        'The white one, seen properly for the first time. It kills and does not feed, which everybody reads as malice or as sacred, and which is actually what an animal does when it has been kept in pain for two years.',
      setsFlags: ['knows:white_maw'],
      cancelledByFlags: ['killed_white_maw', 'bonded_white_maw'],
      requiresFlags: ['knows:the_dead_herds'],
      movesCharacters: [],
    },
    {
      id: 'we_the_circle_rules',
      atWorldMinute: 3 * 1440 + 11 * 60,
      locationId: 'the_stone_circle',
      publicCopy:
        'Five stones get moved on the hide, in an order everybody present will describe differently for the rest of their lives, and the north corridor belongs to somebody.',
      directorNotes:
        'The ruling happens whether or not the player has done anything. If they brought a measurement or physical evidence the arrangement is different and better. If they did nothing the five settle it themselves, badly but honestly, and that is not a failure state.',
      setsFlags: ['the_circle_has_ruled'],
      cancelledByFlags: ['joined_the_hand'],
      requiresFlags: ['knows:the_crossing'],
      movesCharacters: [
        { characterId: 'torren', toLocationId: 'the_stone_circle' },
        { characterId: 'kaia', toLocationId: 'the_stone_circle' },
        { characterId: 'suri', toLocationId: 'the_stone_circle' },
      ],
    },
    {
      id: 'we_the_market_comes_down',
      atWorldMinute: 3 * 1440 + 17 * 60,
      locationId: 'market_lanes',
      publicCopy:
        'Six hundred stalls become four hundred and then eighty. Debts get settled on cord in the open, and people who will not see each other for a year take longer over it than they need to.',
      directorNotes:
        'The warm one. Whatever has happened, this happens: tents folding, goodbyes, somebody’s grandmother giving somebody else’s child a carved animal. Let it be pleasant even in a run that has gone badly.',
      setsFlags: ['the_market_came_down'],
      cancelledByFlags: [],
      requiresFlags: ['the_circle_has_ruled'],
      movesCharacters: [],
    },
    {
      id: 'we_the_corridor_fight',
      atWorldMinute: 4 * 1440 + 6 * 60,
      locationId: 'the_north_road',
      publicCopy:
        'Two peoples arrive at the same water on the same morning with the same document and different readings of it, and by the time anybody senior gets there it has already happened.',
      directorNotes:
        'What Unrest at the top of its range produces. Nobody planned it and everybody was arranged for it. Write it small and from ground level — one water, two parties, forty people, and a thing that cannot be taken back.',
      setsFlags: ['the_corridor_fight_happened', 'the_migration_broke'],
      cancelledByFlags: ['the_hand_is_named', 'one_fire_five_peoples', 'the_numbers_changed'],
      requiresFlags: ['the_circle_has_ruled'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_who_holds_the_corridor',
      kind: 'FINALE',
      label: 'Who is standing on the north corridor when the herds arrive',
      seedHint: 'Five carved river stones on a pegged hide, and forty years of agreements about who crosses where.',
      payoffHint: 'The stones get moved, in an order everybody present will describe differently for the rest of their lives.',
      weight: 1,
    },
    {
      id: 'p_why_they_turned',
      kind: 'MYSTERY',
      label: 'Why the herds turned six weeks early',
      seedHint: 'Somebody says the ground on the black ridge has been warm since spring, and is not believed.',
      payoffHint: 'A spine of volcanic rock with new cracks in it, and four people alive who have worked out what that means.',
      weight: 0.85,
    },
    {
      id: 'p_the_white_one',
      kind: 'BOSS',
      label: 'The animal that kills and does not feed',
      seedHint: 'Four bonded animals dead and uneaten, and a hunting party that comes in with nothing on its sledges.',
      payoffHint: 'It is enormous, it is old, every injury on it is in the same place, and it is standing in a cave doing nothing at all.',
      weight: 0.8,
    },
    {
      id: 'p_the_method',
      kind: 'RIVAL',
      label: 'Somebody who moves eighty thousand animals without touching one',
      seedHint: 'A beast-breaker at the far end of the pickets who handles what nobody else will and charges too little.',
      payoffHint: 'Hunger, a wound in a fixed place, fire behind and scent in front. Four things, and a corridor held by six people.',
      weight: 0.75,
    },
    {
      id: 'p_your_own_animal',
      kind: 'RELATIONSHIP',
      label: 'Whether anything at this crossing ends up being yours',
      seedHint: 'Half a mile of tethered animals, and one at the far end that three people have already given up on.',
      payoffHint: 'It comes across a crowded lane because you asked it to, or it puts three other animals between the two of you.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_rider',
      name: 'You Came In Riding',
      role: 'Riding and speed',
      summary: 'You arrived at this crossing on something of your own, which means everybody at the pickets already has an opinion about you and most of them are wrong.',
      playstyle: ['Fast', 'Mounted', 'Conspicuous'],
      blurb: 'Nobody at the pickets asked your name. Three of them asked what you were riding and one of them asked what you paid for it, which at this crossing is the same question.',
      attributeBonus: { agility: 3, might: 1 },
      skillProficiencies: { riding: 3, beastlore: 1, spear: 1 },
      startingItems: [{ itemId: 'bond_harness', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_emberclaw', amount: 12 }],
    },
    {
      id: 'arch_trader',
      name: 'You Came To Trade',
      role: 'Bargaining and standing',
      summary: 'You are here with a cord full of other people’s debts, which at a market where five peoples meet is worth more than a mount and considerably more than a spear.',
      playstyle: ['Persuasive', 'Well connected', 'Unarmed'],
      blurb: 'You have been at four of these. You know what salt goes for in a good year and in this one, and you know which delegation always overpays on the last morning.',
      attributeBonus: { presence: 3, mind: 1 },
      skillProficiencies: { bargain: 3, oathspeak: 2 },
      startingItems: [{ itemId: 'salt_block', qty: 3 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_stoneback', amount: 12 }],
    },
    {
      id: 'arch_hunter',
      name: 'You Came Down Hunting',
      role: 'Tracking and the spear',
      summary: 'You have spent the season on the northern ground reading dung and broken grass, which turns out to be the single most useful skill anybody brought to this market.',
      playstyle: ['Observant', 'Self-sufficient', 'Quiet'],
      blurb: 'You came south behind the herds rather than ahead of them, and you have seen four things on the way that nobody at this crossing has a story for yet.',
      attributeBonus: { mind: 2, might: 2 },
      skillProficiencies: { tracking: 3, spear: 2 },
      startingItems: [{ itemId: 'long_spear', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_frostfang', amount: 12 }],
    },
    {
      id: 'arch_healer',
      name: 'You Came To Work',
      role: 'Doctoring and beast sense',
      summary: 'You mend people and animals, which means every camp at this crossing will let you in and nobody will ever ask which people you belong to.',
      playstyle: ['Trusted', 'Non-combatant', 'Goes everywhere'],
      blurb: 'You have had your hands inside three of the five peoples at this market and none of them has ever asked you for a colour before letting you.',
      attributeBonus: { resolve: 3, mind: 1 },
      skillProficiencies: { doctoring: 3, beastlore: 2 },
      startingItems: [{ itemId: 'nightmeat', qty: 2 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_mireborn', amount: 12 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What do they shout across the pickets?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Ren Ashfall' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What did you come to this market to do?',
      helpText:
        'The trade you arrived with, which sets what you are good at and which camp already has a reason to let you in. It is fixed for the whole story. It does not decide which of the five peoples you end up owing, whether you ride anything, or what you do about the corridor — all of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What do people already know about you here?',
      helpText: 'One plain sentence. A reputation, a debt, a family, or nothing at all, which is also an answer and a useful one.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I have been at three of these crossings and I still owe a Stoneback clerk for a boat.',
    },
    {
      id: 'where_you_are_from',
      label: 'Whose people are you?',
      helpText: 'A starting lean, not a commitment. Every one of the five will take you in or turn you away based on the next three days rather than on this.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'emberclaw', label: 'Emberclaw — grassland, raptors, four clans who agree about nothing' },
        { id: 'stoneback', label: 'Stoneback — river valleys, horned giants, oath law and paperwork' },
        { id: 'frostfang', label: 'Frostfang — the north, sabertooths and mammoths, and the longest road here' },
        { id: 'skyfire', label: 'Skyfire — cliffs and desert, pterosaurs, and everybody else’s messages' },
        { id: 'mireborn', label: 'Mireborn — the delta, river beasts, medicine, and being underestimated' },
        { id: 'none', label: 'None of them. You are from somewhere none of these five has a word for' },
      ],
    },
    {
      id: 'appearance',
      label: 'What do they see coming down the lane?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Too clean for a hunter, too scarred for a trader, and wearing somebody else’s harness.',
    },
  ],
  endings: [
    {
      id: 'end_the_herds_reach_south',
      name: 'The Herds Reach South',
      rarity: 'COMMON',
      minTurn: 34,
      requires: { flagsSet: ['the_herds_reached_south'], flagsUnset: ['the_migration_broke'] },
      condition:
        'The ordinary good outcome. An arrangement nobody loves held long enough for most of the animals to get to the grass, and five peoples will be back at this market next season to argue about it again. Write the arithmetic rather than the triumph: how many head, which corridor, who is quietly furious and coming back for it.',
      epilogue:
        'The southern plain takes them in the way it has every year anybody can remember. There is a bad fortnight in the middle where two peoples share a water they had not agreed to share and nobody makes anything of it. By the second month the calving is better than last year and the arrangement everybody complained about has started being described as the way it has always been done.',
      hint: '',
    },
    {
      id: 'end_one_fire_five_peoples',
      name: 'One Fire, Five Peoples',
      rarity: 'RARE',
      minTurn: 40,
      requires: { flagsSet: ['one_fire_five_peoples', 'the_hand_is_named'] },
      condition:
        'The corridor was settled on real numbers with the sabotage named out loud, and five peoples came out of it holding one arrangement rather than five grievances. This is the hardest thing in the world to do and it must not read as a reward for being agreeable — it took a measurement, physical proof, and somebody willing to be disliked at the circle.',
      epilogue:
        'They keep the hide. It goes south with the Stoneback and comes back every season with a stone added, which nobody planned and which within nine years is the thing the crossing is actually for. Frostfang get the eastern ground back in the second year. Nobody ever formally thanks anybody, and every one of the five knows precisely who it was.',
      hint: '',
    },
    {
      id: 'end_primal_crown',
      name: 'Primal Crown',
      rarity: 'RARE',
      minTurn: 44,
      requires: {
        flagsSet: ['the_herds_reached_south', 'spoke_for_a_people'],
        minFactionReputation: [
          { factionId: 'faction_emberclaw', value: 55 },
          { factionId: 'faction_stoneback', value: 55 },
        ],
      },
      condition:
        'Not a throne and not a title. Somebody who three days ago was one more rider at a market is now the person four of the five peoples send for before they decide anything, and none of them can quite say when that started. Write what it costs: everybody now wants something and nobody asks how you are.',
      epilogue:
        'There is no crown and nobody offers one. What there is, by the third season, is a habit: five delegations arriving early to find out where you are staying. You are twenty-something and running a region by being the only person all five of them are prepared to be in a tent with, and it is exhausting, and you are extremely good at it.',
      hint: '',
    },
    {
      id: 'end_sixth_banner',
      name: 'The Sixth Banner',
      rarity: 'RARE',
      minTurn: 42,
      requires: {
        flagsSet: ['the_herds_reached_south', 'stayed_unaligned', 'have_a_mount'],
        minFactionReputation: [{ factionId: 'faction_skyfire', value: 45 }],
      },
      condition:
        'People who did not fit any of the five ended up standing behind one person who also did not, and by the end of the season it has a name and ground and a stone of its own. This is a slow institutional thing, not a coronation. The interesting part is which of the five recognises it first and what they want for doing so.',
      epilogue:
        'It starts as about forty people who were at the crossing and had nowhere obvious to go afterwards. By the second season it is closer to three hundred and has an opinion about water rights. The Skyfire recognise it first, because they recognise anything that will need messages carried, and the Stoneback recognise it last and most formally.',
      hint: '',
    },
    {
      id: 'end_white_maws_rider',
      name: 'White Maw’s Rider',
      rarity: 'UNIQUE',
      minTurn: 44,
      requires: { flagsSet: ['bonded_white_maw'] },
      condition:
        'The largest predator any of these peoples has a word for, driven for two years by people who needed it frightened, approached from the side that never hurt it by somebody who knew exactly why that would work. Do not write this as taming. Write it as an old animal in pain deciding, slowly, that one specific human is not the thing that has been happening to it.',
      epilogue:
        'It never becomes safe and it never becomes a mount in the way the five peoples mean the word. It follows, at a distance, at its own pace, and it is present at three of the four things that matter for the rest of your life. Children at the crossing are still being told to stop asking about it forty years later.',
      hint: 'Everything approaching from the left has been the thing that hurt it.',
    },
    {
      id: 'end_beyond_the_map',
      name: 'Beyond the Map',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: { flagsSet: ['left_the_map', 'went_alone'], flagsUnset: ['joined_the_hand'] },
      condition:
        'The corridor question was five peoples arguing over one road, and there turned out to be a great deal of world that was not that road. Do not treat this as running away — it is a legitimate reading of three days at a market, and the thing it costs is that you never find out how any of it went.',
      epilogue:
        'West of the ridge the ground stops being anybody’s. There are animals out there that the five peoples have no word for and one river that runs the wrong way for eleven days. Years later somebody at a crossing describes a rider nobody could place, and four people at that fire have heard a different version of the same story.',
      hint: '',
    },
    {
      id: 'end_the_broken_migration',
      name: 'The Broken Migration',
      rarity: 'RARE',
      minTurn: 40,
      requires: { flagsSet: ['the_migration_broke'], flagsUnset: ['joined_the_hand'] },
      condition:
        'The old system failed and something else is going to have to exist. This is not simply a loss — the corridor arrangement was forty years old, it was built for a road the herds no longer take, and its collapse forces five peoples into a shape none of them would have chosen and some of them needed. Write the adaptation as well as the cost.',
      epilogue:
        'The first winter is very bad. Frostfang lose a third of their breeding stock and Mireborn take in four thousand people they cannot feed properly. What comes out of it, by the fourth year, is smaller, more local, and no longer built around one road — which is the arrangement the ground had been asking for since the spring the mountains started moving.',
      hint: '',
    },
    {
      id: 'end_ashen_victory',
      name: 'Ashen Victory',
      rarity: 'UNIQUE',
      minTurn: 42,
      requires: { flagsSet: ['joined_the_hand', 'knows:the_ashen_method'] },
      condition:
        'Six people and a dry season turned out to be a more reliable system than five peoples and a hide, and you are one of the six. The method works and it is not glamorous — it is hunger, a wound in a fixed place, fire and scent, applied patiently to animals that did not choose any of it. Write it without a villain’s relish and without absolution.',
      epilogue:
        'The corridors are held and the five peoples cannot work out by whom. Prices are set at the chokepoints and nobody is ever seen setting them. It is, on any measure of stability, working. There are eleven cages in a fold of rock below the ridge and somebody has to feed them, and increasingly that somebody is you.',
      hint: '',
    },
    {
      id: 'end_the_long_hunger',
      name: 'The Long Hunger',
      rarity: 'COMMON',
      minTurn: 36,
      requires: { flagsSet: ['the_corridor_fight_happened'], flagsUnset: ['the_hand_is_named', 'one_fire_five_peoples'] },
      condition:
        'Two peoples arrived at the same water on the same morning with the same document, and nobody who did that had planned to. This is the loss that is reachable by playing carefully: you can spend three days being useful, honest and liked, never find out about the fires on the ridge, and have this happen anyway. It must not read as a punishment.',
      epilogue:
        'Forty people at one water, and then it is the kind of thing five peoples do not come back from in one season. The herds still go south and about a third of what set out arrives. The market runs the following year with three delegations at it, and the hide with the stones on it is not brought out, because nobody is confident what would happen if it were.',
      hint: '',
    },
    {
      id: 'end_the_one_you_lost',
      name: 'The One You Lost',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['the_animal_refused_you', 'have_a_mount'] },
      condition:
        'The animal remembers what was done to it and it was you who did it. Nothing here is repaired by an apology or by a good outcome elsewhere in the story — it will not be caught in open ground, it has begun watching somebody across the picket line, and that is a fact about the last three days rather than a mood. Whatever else this run achieved, it did that too.',
      epilogue:
        'Somebody at the pickets takes it on, quietly, without making a thing of it, and within a fortnight it will come to them across a crowded lane. You see that happen. Nobody says anything about it, because at a crossing this is an ordinary event and everybody present has been on one side of it or the other.',
      hint: '',
    },
    {
      id: 'end_they_blamed_you',
      name: 'They Blamed You',
      rarity: 'UNCOMMON',
      minTurn: 34,
      requires: { flagsSet: ['sold_what_you_knew', 'the_migration_broke'] },
      condition:
        'You knew what was happening on the ridge and sold it rather than said it, and when it came apart the five peoples needed somebody available to be at fault. They are not entirely wrong and they are nowhere near right, and there is no scene in which you get to explain the difference to anybody who will hear it.',
      epilogue:
        'The version that survives is that a rider at the crossing knew about the fires for two days and traded on it. That is true. What is left out is who else knew and for how much longer, and none of those people is standing where you are standing. You do not go back to Sunscar. Two of the five would still take you in and you never find out which two.',
      hint: '',
    },
  ],
  opening:
    'The cups go first. Then the tables. Then somebody two lanes over starts shouting and does not stop.\n\n' +
    'A juvenile has come off a picket line somewhere behind the salt stalls — chest-high, wrong-eyed with panic, and coming up a lane packed shoulder to shoulder with people who have never had to get out of the way of one.\n\n' +
    'A woman in a red sash vaults a stall to your left, lands badly, and swears about it. She has a coil of rope and no plan whatsoever.\n\n' +
    '"You," Kaia says, without turning round to see who you are. "Left side or right?"\n\n' +
    'And behind all of it, out past the tents, the northern horizon has started moving.',
  openingSuggestions: [
    'I take the left. "Rope to me when it turns, and do not throw early." I put myself between the animal and the stalls where the children are, and I make sure it can see a way out that is not through anybody.',
    'I ignore her and go for the animal. Chest-high, terrified, and it has run itself into a lane with no exit. I get low, get slow, and get boring, and I keep my hands where it can watch them.',
    '"Neither." I start moving people out of the lane instead — the stalls come down, the crowd goes back, and the thing gets the empty run it has been looking for. "Let it go. It is more frightened than the rest of you put together."',
  ],
  publishedAt: '2026-09-10T06:00:00.000Z',
};

export const PRIMAL_CROWN = StoryVersion.parse(raw);
