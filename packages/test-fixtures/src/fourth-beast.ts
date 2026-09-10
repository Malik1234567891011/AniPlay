import { StoryVersion } from '@aniplay/contracts';

/**
 * "The Fourth Beast" — Paris, and three small creatures in open habitats.
 *
 * The bible's structural instruction is that the starter choice is one of the
 * earliest meaningful decisions in the story and has to create ownership
 * immediately. So it is the archetype: the beast you pick is what you can do,
 * which is the honest mapping, and the opening scene is the first thirty
 * seconds with it rather than a menu.
 *
 * The beasts are deliberately not in `characters`, for the same reason White
 * Maw is not in Primal Crown's: they are animals. A `CharacterDef` carries
 * `voiceSamples`, and the moment a creature has quotable dialogue it stops
 * being a partner and becomes a person in a costume. They reach the writer
 * through the archetypes, the abilities that are theirs alone, hard canon and
 * the world's own hidden state instead.
 *
 * The playable span is the weeks between the lab and whatever Lucien is
 * building under the city. Elsewhere is real, it is never explained, and a run
 * that never goes below the quarries is a complete run.
 *
 * Three variables. Breath is the only GOOD_HIGH, because `resolveRest` refills
 * those and running across a city is the honest thing for that to mean.
 * Exposure is first among the descending pair: the generic cost path and
 * PUBLIC_VIOLENCE both take the first GOOD_LOW in array order, and an
 * impossible animal being seen doing something impossible in a crowded street
 * is exactly what that should feed.
 */

const raw = {
  id: 'sv_fourth_beast_1',
  storyId: 'story_fourth_beast',
  version: 1,
  title: 'The Fourth Beast',
  fantasyLabel: 'Three beasts. Two people. You chose first.',
  hook: 'A man in a pale coat has been killing people in Paris for six months and nothing anybody has shot him with has touched him, and a biologist has grown three animals that can.',
  premise:
    'For six months somebody has been taking people off the streets of Paris, and the city has learned to walk past the candles.\n\n' +
    'The footage is useless. A man in a pale coat, moving faster than the cameras record, and rounds that do not land on him at close range. The police have stopped offering theories in public.\n\n' +
    'A biologist at a private institute got hold of tissue from one of the scenes. It was alive, it was not human, and it was not anything else either. So he grew three animals out of it, because whatever is protecting that man is biological, and he believes only biology gets through it.\n\n' +
    'The animals need a person. Not an owner — a nervous system that matches theirs closely enough to keep them stable when things get bad. He found two people in the whole city who fit.\n\n' +
    'You are one of them. The other is a twenty-one-year-old whose brother went missing three months ago and who has been looking for him without waiting for anybody’s permission.\n\n' +
    'There are three creatures in that room and you are choosing first. She gets the second. The third stays where it is.\n\n' +
    'You need to work out what you have taken on quickly, because it takes about three weeks for the man in the pale coat to notice that somebody in this city can finally hurt him.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Monsters', 'Mystery', 'Coming of age', 'Investigation', 'Rivalry'],
  mechanicsChips: [
    'Your beast is the build',
    'It has opinions about you',
    'Paris notices impossible animals',
    'The rival solves things without you',
    'A city you can actually cross',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'HORROR', 'MORAL_AMBIGUITY', 'ROMANCE'],
  intensity: 'MODERATE',
  creatorNote:
    'The creature is not a weapon with a personality bolted on. It sleeps badly, it hates the Métro, it has a favourite bakery within a week, and it will refuse you if you spend a fortnight treating it as equipment. You can also decide none of this is your problem and go home, and it comes with you.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'beraud_lab',
    startWorldMinute: 19 * 60 + 40,
    startingItems: [{ itemId: 'carry_bag', qty: 1 }],
    hardCanon: [
      'Paris has had six months of linked abductions and attacks. Conventional weapons have repeatedly failed against the man responsible.',
      'Étienne Morel grew three creatures — Aurel, Nox and Marea — from tissue recovered at an attack scene. They are not clones and they are not the same animal.',
      'The creatures destabilise under extreme stress unless they are neurologically synchronised with a compatible person. Morel found exactly two: the player and Camille Laurent.',
      'Camille’s older brother Théo disappeared three months before the story starts, near one of the sites.',
      'Lucien Marot is responsible for the abductions. He has a fourth creature, Alba, which Morel did not make and which is where the tissue came from.',
      'Alba is not Lucien’s instrument. It chooses, it observes, it can disobey him, and it is genuinely attached to him.',
      'An adjacent ecology exists in some form. It is never fully explained and the story does not owe anybody an explanation of it.',
    ],
    toneGuide:
      'Contemporary Paris, lived-in rather than postcard: Métro platforms, apartment courtyards, bakeries at six in the morning, scooters, hospital corridors, a canal lock, a stairwell that smells of damp. Landmarks become extraordinary because something impossible is moving through them. ' +
      'The creature is an animal. It is hungry, it is bored, it is frightened of the escalator, it steals a croissant, it puts its head on your knee at exactly the wrong moment. Charm carries as much weight as danger. ' +
      'Lucien has ordinary conversations. He is patient, curious, likes animals more than most people, and is never once written screaming. ' +
      'Chases have real geography: Métro entrance, narrow street, roof, courtyard, bridge. Name the streets. ' +
      'Violence has consequences in a city with forty thousand phones in it, and hiding a creature the size of a dog that glows is a genuine recurring problem rather than a joke.',
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 14, mind: 13, presence: 12, resolve: 13, arcana: 9 },
  skills: [
    { id: 'freerun', name: 'Free Running', attribute: 'agility', description: 'Getting across a city that was built vertically by people who were not thinking about you.' },
    { id: 'handling', name: 'Handling', attribute: 'presence', description: 'Reading an animal that is not any animal, and being read back by it.' },
    { id: 'scene_read', name: 'Reading a Scene', attribute: 'mind', description: 'What happened in a room, in what order, from what is still in it.' },
    { id: 'streetcraft', name: 'Streetcraft', attribute: 'mind', description: 'Who to ask, which door is unlocked at night, and how not to be on anybody’s camera.' },
    { id: 'talk', name: 'Talking', attribute: 'presence', description: 'Getting a real answer out of somebody who has already told the police a different one.' },
    { id: 'nerve_skill', name: 'Holding On', attribute: 'resolve', description: 'Staying synchronised with something that is coming apart, while it is coming apart.' },
    { id: 'first_aid', name: 'First Aid', attribute: 'mind', description: 'Bleeding, shock and broken things, in people and in whatever your partner is.' },
  ],
  resources: [
    {
      id: 'breath',
      name: 'Breath',
      max: 100,
      start: 78,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'Legs gone, hands shaking, and a creature that can feel all of it through the bond and has started making decisions on its own because you are clearly not going to.',
      color: '#7FA6C9',
      bands: [
        {
          upTo: 24,
          behaviour:
            'Finished. Eight flights of stairs is a negotiation and a conversation is worse. The bond runs one way in this band — the animal is carrying the player rather than the other way round, and it knows, and it will not say anything about it because it cannot.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary exhaustion of a city and a secret. Good for one more roof or one more difficult conversation and honest about not being good for both. Everything still works and everything costs a beat more than it did this morning.',
        },
        {
          upTo: 100,
          behaviour:
            'Whole. The player can cross four arrondissements, keep up with something that was built to run, and still be present for whoever is waiting at the other end of it. Scenes can be long and can go somewhere.',
        },
      ],
    },
    {
      id: 'exposure',
      name: 'Exposure',
      max: 100,
      start: 20,
      regenPerHour: -0.15,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'As far as Paris knows, there is a series of attacks and no animals in it at all. The player walks through the eleventh with a bag on their shoulder and nobody looks at the bag.',
      color: '#C77C3C',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Nobody has anything. A blurry clip with four hundred views, one forum thread, and a bakery owner in Belleville who tells a story people enjoy and nobody believes. The player can move through the city as a person rather than as a subject.',
        },
        {
          upTo: 55,
          behaviour:
            'There is a hashtag. Three usable clips, one of them slowed down frame by frame, and a police unit that has stopped calling it a dog. Cafés go quiet in one specific arrondissement. Somebody has started a map with pins in it and four of the pins are correct.',
        },
        {
          upTo: 80,
          behaviour:
            'It is on the evening news with a graphic. Ravel is being asked questions she cannot answer by people above her, the Métro has cameras that somebody is now actually watching, and moving in daylight with the animal requires a plan rather than a coat.',
        },
        {
          upTo: 100,
          behaviour:
            'The city has decided the animals are the story. There are cordons, an interministerial working group, and men at the Institut who do not answer to anybody the player has met. Whatever Lucien is doing has become the second most urgent thing in Paris, which is exactly what he wanted.',
        },
      ],
    },
    {
      id: 'strain',
      name: 'Strain',
      max: 100,
      start: 25,
      regenPerHour: -0.8,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'It is entirely itself. It sleeps against the player’s back, eats too much, and does the thing it does — the speed, the sound, the heat — as easily as breathing, with no cost visible anywhere.',
      color: '#8E5FA8',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Settled. The tissue holds its own shape without being asked to, the animal is playful and greedy and interested in everything, and the bond is a background hum neither of them thinks about. This is where the ordinary scenes live and it should be most of the story.',
        },
        {
          upTo: 55,
          behaviour:
            'Working hard. Small wrongnesses: a limb that holds the wrong outline for a second, heat coming off it in a cold room, a refusal to be picked up by anybody at all. It is fine and it is visibly costing something, and the player will keep going anyway because there is a reason to.',
        },
        {
          upTo: 80,
          behaviour:
            'Coming apart at the edges. The outline does not settle. It is in pain and it is hiding it in the specific way animals hide it, and using what it does is now a decision about it rather than about the situation. Morel wants it in the lab and is not asking politely any more.',
        },
        {
          upTo: 100,
          behaviour:
            'The tissue is losing the argument with itself. This is where creatures are lost, and the world must be willing to lose one. Nothing here is fixed by a good outcome elsewhere; it is fixed by days of nothing happening, which is the one thing the story keeps failing to provide.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'carry_bag',
      name: 'The Bag',
      tags: ['gear'],
      questItem: true,
      droppable: false,
      description: 'A large canvas crossbody with a reinforced base and a mesh panel Morel added in about four minutes with a scalpel and some tape. Everybody in Paris carries one of these. Almost nobody carries one with something breathing in it.',
      loreText: 'By the second week it smells permanently of whatever your partner is, and the mesh panel has been chewed at the corner and repaired twice.',
      icon: 'bag',
    },
    {
      id: 'phase_sample',
      name: 'The Sample Camille Took',
      tags: ['quest', 'evidence'],
      questItem: true,
      skillModifiers: { scene_read: 2 },
      description: 'A sealed slide of something recovered from a restricted scene by somebody who was not supposed to be in it. Under light it is grey. Under pressure it stops being grey and starts being somewhere else.',
      loreText: 'She took it before she met Morel, which means she has never entirely believed he told her everything, which is the most reasonable position anybody in this story holds.',
      icon: 'vial',
    },
    {
      id: 'theo_phone',
      name: 'Théo’s Phone',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'Cracked, dead, and recovered from a drain nine days after he vanished. There is one message drafted on it that was never sent, and it is four words long.',
      loreText: 'The four words are "it is under us". Camille has read them roughly nine hundred times.',
      icon: 'phone',
    },
    {
      id: 'lina_notes',
      name: 'Lina’s Map',
      tags: ['document'],
      skillModifiers: { streetcraft: 2 },
      description: 'Six months of disappearances pinned on a paper map of Paris because she does not trust anything that syncs. The pins are not evenly spread. Four of them sit almost on top of each other over the old quarry line.',
      loreText: 'She has been offered money for this three times and turned it down three times, and the third offer was polite in a way that frightened her.',
      icon: 'map',
    },
    {
      id: 'marot_invitation',
      name: 'An Embossed Card',
      tags: ['quest', 'access'],
      questItem: true,
      description: 'Heavy cream stock, a foundation crest, a date and a time. It is a fundraiser, it is entirely real, and the man hosting it has killed a number of people that nobody has finished counting.',
      loreText: 'He sends about four hundred of these. He hand-writes eleven, and yours is one of the eleven.',
      icon: 'card',
    },
    {
      id: 'quarry_key',
      name: 'A Quarry Inspector’s Key',
      tags: ['quest', 'access'],
      questItem: true,
      description: 'Municipal, unglamorous, and it opens about a hundred and eighty kilometres of tunnel that the city keeps closed for extremely good reasons that are now about ninth on the list.',
      loreText: 'The inspectorate lost four of these between March and June. Nobody has connected that to anything, because it is not the kind of thing anybody connects to anything.',
      icon: 'key',
    },
    {
      id: 'bakery_bag',
      name: 'A Paper Bag From The Corner',
      tags: ['food'],
      consumable: { resourceId: 'breath', amount: 22, consumesItem: true },
      description: 'Still warm at the bottom. Bought at six in the morning from a woman who has stopped asking what is in your bag and started putting an extra one in for it.',
      loreText: 'Your partner has worked out the route to this bakery independently and will take it whether or not you are going that way.',
      icon: 'bag',
    },
    {
      id: 'field_kit',
      name: 'Morel’s Field Kit',
      tags: ['tool'],
      skillModifiers: { first_aid: 2, handling: 1 },
      description: 'A hard case of things that stabilise phase tissue, most of which he made himself, none of which he has tested on anything the size of what is in your bag.',
      loreText: 'There are eleven ampoules and a handwritten note that says, in full: "3 max. Then stop. Then bring it to me."',
      icon: 'case',
    },
  ],
  abilities: [
    {
      id: 'read_the_scene',
      name: 'Read the Scene',
      tags: ['sight'],
      description: 'Work out what happened in a room, in what order, from what is still in it and what is conspicuously not.',
      affordances: ['look around', 'investigate', 'examine', 'read the scene', 'search', 'what happened here', 'check the area'],
      costs: [{ resourceId: 'breath', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'scene_read', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'take_the_roofs',
      name: 'Take the Roofs',
      tags: ['movement'],
      description: 'Métro entrance, narrow street, drainpipe, roof, courtyard, bridge. Paris is faster above the traffic if you are willing to commit to it.',
      affordances: ['run', 'chase', 'climb', 'take the roofs', 'parkour', 'get up there', 'follow them', 'jump'],
      costs: [{ resourceId: 'breath', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'freerun', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'keep_it_hidden',
      name: 'Keep It Hidden',
      tags: ['utility'],
      description: 'A coat, a bag, a doorway, a lie to a neighbour, and about forty seconds of an animal being convinced that staying still is a game.',
      affordances: ['hide it', 'cover it', 'keep it out of sight', 'stay hidden', 'get out of sight', 'avoid the cameras'],
      costs: [{ resourceId: 'breath', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'streetcraft', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_it_together',
      name: 'Hold It Together',
      tags: ['healing'],
      description: 'Get a hand on it, get your breathing under its breathing, and be the fixed point while the tissue argues with itself.',
      affordances: ['calm it', 'hold it', 'steady it', 'synchronise', 'bond', 'help it', 'get it under control', 'soothe'],
      costs: [{ resourceId: 'breath', amount: 9 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'nerve_skill', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ask_around',
      name: 'Ask Around',
      tags: ['social'],
      description: 'Get a real answer out of somebody who already gave the police a different one, usually by not being the police.',
      affordances: ['ask', 'talk to them', 'question', 'interview', 'find out', 'ask around', 'get them talking'],
      costs: [{ resourceId: 'breath', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'talk', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'set_it_on_them',
      name: 'Set It On Them',
      tags: ['offensive'],
      description: 'Let it do the thing it was grown to do, in front of whoever is standing there. It works. Everything after it is the problem.',
      affordances: ['attack', 'fight', 'let it loose', 'sic it', 'go for him', 'kill it', 'strike', 'take him down'],
      costs: [
        { resourceId: 'breath', amount: 10 },
        { resourceId: 'strain', amount: 12 },
        { resourceId: 'exposure', amount: 9 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'handling', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'run_it_down',
      name: 'Run It Down',
      tags: ['movement'],
      description: 'Acceleration that does not make sense on four legs, and a nose that has been following one specific person since a bridge in the tenth.',
      affordances: ['track', 'follow the scent', 'run it down', 'chase him', 'catch up', 'hunt', 'sprint'],
      costs: [
        { resourceId: 'breath', amount: 11 },
        { resourceId: 'strain', amount: 7 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'handling', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'burn_through',
      name: 'Burn Through',
      tags: ['offensive'],
      description: 'Heat with nothing burning to produce it, applied to a lock, a shutter, a hand, or something that ordinary force cannot get clean contact with.',
      affordances: ['burn it', 'melt it', 'heat', 'burn through', 'get through the door', 'scorch'],
      costs: [
        { resourceId: 'breath', amount: 9 },
        { resourceId: 'strain', amount: 10 },
      ],
      cooldownMinutes: 30,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'handling', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'sound_the_walls',
      name: 'Sound the Walls',
      tags: ['sight'],
      description: 'A pulse you feel in your teeth, and a map of everything on the other side of the stone that comes back as a shape rather than a picture.',
      affordances: ['listen', 'echolocate', 'sound the walls', 'scan', 'what is behind it', 'find the space', 'sense'],
      costs: [
        { resourceId: 'breath', amount: 7 },
        { resourceId: 'strain', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'mind', skillId: 'handling', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_all_the_way',
      name: 'Go All The Way',
      tags: ['offensive'],
      description: 'Ask it for everything it has, past where the tissue can hold its own shape, because the alternative is worse. It has never once refused this and that is the frightening part.',
      affordances: ['everything', 'all out', 'push it', 'let it go', 'full', 'do it anyway', 'no limits'],
      costs: [
        { resourceId: 'breath', amount: 18 },
        { resourceId: 'strain', amount: 28 },
        { resourceId: 'exposure', amount: 14 },
      ],
      cooldownMinutes: 720,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve_skill', baseDc: 16 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:what_it_costs'],
        lockedCopy: 'You have no idea where the edge of it is, and finding out by going past it is how Morel lost the first eleven.',
      },
    },
  ],
  locations: [
    {
      id: 'beraud_lab',
      name: 'The Room Under The Institute',
      shortName: 'The Lab',
      description:
        'Down two flights from an ordinary research building near the Panthéon: a long low room with grow lights, planted beds and warm air, more greenhouse than laboratory. Three open habitats, no cages, and three small creatures who have been watching the door since it opened.',
      artDirection:
        'Warm underground greenhouse laboratory, grow lights over planted beds, humid air, three open low-walled habitats with small impossible creatures in them, scientific equipment pushed to the walls, one staircase up. Green, close, wondrous.',
      connections: [{ to: 'latin_quarter', travelMinutes: 4, label: 'Up and out onto the street' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'field_kit', qty: 1, ownerId: 'morel', aka: ['the kit', 'field kit', 'the case', 'the ampoules'] },
      ],
    },
    {
      id: 'latin_quarter',
      name: 'The Fifth',
      shortName: 'Latin Quarter',
      description:
        'Bookshops, a cinema that shows the same four films forever, students on the kerb outside a bar at eleven at night, and streets narrow enough that two people cannot pass a delivery scooter without one of them stopping. The Institut is four doors down and nobody who lives here has ever wondered about it.',
      artDirection:
        'Narrow Latin Quarter street at night, bookshop and cinema frontage, students outside a bar, wet cobbles reflecting shopfront light, scooters, a stone institutional facade among ordinary buildings. Warm, dense, real Paris.',
      connections: [
        { to: 'beraud_lab', travelMinutes: 4, label: 'Back down to the lab' },
        { to: 'the_seine', travelMinutes: 7, label: 'Down to the river' },
        { to: 'metro_line', travelMinutes: 3, label: 'Into the Métro' },
        { to: 'lina_flat', travelMinutes: 11, label: 'Across to her flat' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'bakery_bag', qty: 3, ownerId: null, aka: ['bread', 'pastry', 'the bakery', 'breakfast', 'a bag'] },
      ],
    },
    {
      id: 'metro_line',
      name: 'The Métro',
      shortName: 'Métro',
      description:
        'Tiled corridors, warm wind ahead of a train, buskers, and the specific silence of a carriage where forty people have all decided not to look at each other. The fastest way across this city and the worst possible place to be carrying something that does not like enclosed spaces.',
      artDirection:
        'Paris Métro platform and tiled corridor, curved white tiles, an approaching train, commuters not looking at each other, harsh strip lighting, advertising panels. Familiar, functional, faintly oppressive.',
      connections: [
        { to: 'latin_quarter', travelMinutes: 3, label: 'Up into the fifth' },
        { to: 'canal_saint_martin', travelMinutes: 9, label: 'North to the canal' },
        { to: 'montmartre', travelMinutes: 14, label: 'North to the hill' },
        { to: 'belleville', travelMinutes: 11, label: 'East to Belleville' },
        { to: 'palais_royal', travelMinutes: 7, label: 'Centre' },
        { to: 'service_tunnels', travelMinutes: 6, lockedByFlag: 'knows:the_service_doors', label: 'The doors that are not for passengers' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [],
    },
    {
      id: 'canal_saint_martin',
      name: 'Canal Saint-Martin',
      shortName: 'The Canal',
      description:
        'Iron footbridges, plane trees, locks that take twenty minutes to fill, and people sitting on the quay with a bottle and no intention of moving. Two of the disappearances were within four hundred metres of here and the quays are as busy as they have ever been.',
      artDirection:
        'Canal Saint-Martin at dusk, iron footbridge over green water, plane trees, people sitting along the quay with bottles, a lock gate, warm street light. Relaxed, social, beautiful.',
      connections: [
        { to: 'metro_line', travelMinutes: 9, label: 'Back into the Métro' },
        { to: 'belleville', travelMinutes: 12, label: 'Up the hill east' },
        { to: 'montmartre', travelMinutes: 16, label: 'West and up' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [],
    },
    {
      id: 'montmartre',
      name: 'Montmartre',
      shortName: 'Montmartre',
      description:
        'Stairs. Several hundred of them, in flights, between streets that are effectively cliffs with shops on. Tourists at the top, ordinary life at the bottom, and roofs at eleven different heights that are the single best place in Paris to lose somebody or to be lost.',
      artDirection:
        'Montmartre stairways at night, steep flights between lamplit streets, rooftops at many heights below, a white basilica dome above, laundry and shutters. Vertical, romantic, labyrinthine.',
      connections: [
        { to: 'metro_line', travelMinutes: 14, label: 'Down into the Métro' },
        { to: 'canal_saint_martin', travelMinutes: 16, label: 'Down and east to the canal' },
        { to: 'the_roofline', travelMinutes: 4, label: 'Up onto the roofs' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [],
    },
    {
      id: 'the_roofline',
      name: 'The Roofline',
      shortName: 'Roofs',
      description:
        'Zinc, chimney stacks, satellite dishes and a two-hundred-year-old drainage arrangement that assumes nobody will ever stand on it. From up here Paris is a single connected surface with about nine hundred holes in it, and something that runs on four legs finds it considerably easier than you do.',
      artDirection:
        'Paris zinc rooftops at night, forests of chimney stacks, the city stretching to a lit horizon, a narrow ridge line, one small creature moving ahead of a human figure. Vast, silvery, exhilarating.',
      connections: [
        { to: 'montmartre', travelMinutes: 4, label: 'Back down into the streets' },
        { to: 'belleville', travelMinutes: 9, label: 'East along the roofs' },
        { to: 'palais_royal', travelMinutes: 12, label: 'South towards the centre' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'belleville',
      name: 'Belleville',
      shortName: 'Belleville',
      description:
        'A hill of markets, four cuisines on one street, a park with the whole city laid out below it, and about eleven thousand people who all know each other well enough to notice a stranger and well enough not to mention it to the police.',
      artDirection:
        'Belleville street market in the morning, fruit stalls and mixed shopfronts, steep street with the Paris skyline below, diverse crowd, laundry above, graffiti on a shutter. Warm, working, alive.',
      connections: [
        { to: 'metro_line', travelMinutes: 11, label: 'Down into the Métro' },
        { to: 'canal_saint_martin', travelMinutes: 12, label: 'Down to the canal' },
        { to: 'the_roofline', travelMinutes: 9, label: 'Up onto the roofs' },
        { to: 'lina_flat', travelMinutes: 5, label: 'Round to her building' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [],
    },
    {
      id: 'lina_flat',
      name: 'The Fourth Floor Walk-Up',
      shortName: 'Lina’s',
      description:
        'One room, a mattress, a desk, and a paper map of Paris on the wall with six months of pins in it. There is a kettle that has been on since March. The stairwell smells of damp and the neighbour’s cooking, in that order.',
      artDirection:
        'Small cluttered Paris studio flat, a wall covered with a paper map and pinned photographs and string, a desk with two laptops, a mattress on the floor, one tall window onto rooftops. Cramped, obsessive, oddly cosy.',
      connections: [
        { to: 'belleville', travelMinutes: 5, label: 'Down and out into the market' },
        { to: 'latin_quarter', travelMinutes: 11, label: 'Across the city' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 1 },
      takeableItems: [
        { itemId: 'lina_notes', qty: 1, ownerId: 'lina', aka: ['the map', 'her map', 'the pins', 'her notes'] },
      ],
    },
    {
      id: 'the_seine',
      name: 'The Riverbank',
      shortName: 'The Seine',
      description:
        'Stone quays below the traffic, bridges every four hundred metres, and a strip of the city where you can walk for an hour and be visible to almost nobody. There are candles under the third bridge and somebody has been replacing them since April.',
      artDirection:
        'Lower stone quay of the Seine at night, bridge arches, dark water reflecting street lamps above, memorial candles and photographs against a wall, a barge passing. Quiet, contained, mournful.',
      connections: [
        { to: 'latin_quarter', travelMinutes: 7, label: 'Up into the fifth' },
        { to: 'palais_royal', travelMinutes: 9, label: 'Along and across to the centre' },
        { to: 'police_prefecture', travelMinutes: 6, label: 'Round to the Prefecture' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [],
    },
    {
      id: 'police_prefecture',
      name: 'The Prefecture',
      shortName: 'Prefecture',
      description:
        'A great stone building on the island with a courtyard full of parked vehicles and a floor upstairs where nine people have been working six months of linked cases with an evidence board they have started keeping face-down when anybody senior visits.',
      artDirection:
        'Grand old Parisian police headquarters interior, high windows, an incident room with a covered board, tired officers, files in stacks, institutional green paint. Solid, weary, under pressure.',
      connections: [
        { to: 'the_seine', travelMinutes: 6, label: 'Out and down to the quay' },
        { to: 'palais_royal', travelMinutes: 8, label: 'Across the bridge to the centre' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: -1 },
      takeableItems: [
        { itemId: 'theo_phone', qty: 1, ownerId: 'ravel', aka: ['the phone', 'his phone', 'the evidence', 'théo’s phone'] },
      ],
    },
    {
      id: 'palais_royal',
      name: 'The Centre',
      shortName: 'Centre',
      description:
        'Arcades, gravel gardens, black-and-white columns, a fountain, and the kind of address a foundation with three hundred million euros and a philanthropy budget puts on its letterhead. Lucien Marot’s office is two minutes from a garden where children play in the middle of the day.',
      artDirection:
        'Palais-Royal arcades and formal gravel garden in late afternoon, clipped trees, striped columns, a fountain, elegant stone facades, a few people crossing. Ordered, beautiful, slightly airless.',
      connections: [
        { to: 'metro_line', travelMinutes: 7, label: 'Down into the Métro' },
        { to: 'the_seine', travelMinutes: 9, label: 'Down to the river' },
        { to: 'police_prefecture', travelMinutes: 8, label: 'Across to the Prefecture' },
        { to: 'the_roofline', travelMinutes: 12, label: 'North and up' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -2 },
      takeableItems: [
        { itemId: 'marot_invitation', qty: 1, ownerId: 'lucien', aka: ['the card', 'the invitation', 'the invite'] },
      ],
    },
    {
      id: 'service_tunnels',
      name: 'The Service Level',
      shortName: 'Service Level',
      description:
        'Behind the doors that say no entry: cable runs, ventilation plant, disused platforms from lines that were never finished, and a hundred and forty years of the city building underneath itself and forgetting. Four of the disappearances happened within two hundred metres of a door like these.',
      artDirection:
        'Disused Paris Métro service tunnel, cable runs and conduit, an abandoned tiled platform behind a hoarding, standing water, a single working light every forty metres. Dark, industrial, forgotten.',
      connections: [
        { to: 'metro_line', travelMinutes: 6, label: 'Back onto the passenger side' },
        { to: 'the_quarries', travelMinutes: 11, lockedByFlag: 'knows:the_quarry_route', label: 'Down through the breach in the wall' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'quarry_key', qty: 1, ownerId: null, aka: ['the key', 'inspector key', 'a key'] },
      ],
    },
    {
      id: 'the_quarries',
      name: 'The Quarries',
      shortName: 'Quarries',
      description:
        'A hundred and eighty kilometres of limestone galleries under the south of the city, cut for stone before anybody thought to write down where. Cold, dry, entirely dark, and about eleven metres below one of them the walls have stopped being limestone.',
      artDirection:
        'Deep limestone quarry gallery, hand-cut walls with old inspection marks, dry dust, absolute darkness beyond a single light source, a low ceiling, water standing in one channel. Ancient, silent, enormous.',
      connections: [
        { to: 'service_tunnels', travelMinutes: 11, label: 'Back up towards the Métro' },
        { to: 'the_boundary', travelMinutes: 14, lockedByFlag: 'knows:the_boundary', label: 'Where the stone stops being stone' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 0, y: 4 },
      takeableItems: [],
    },
    {
      id: 'the_boundary',
      name: 'Where The Stone Stops',
      shortName: 'The Boundary',
      description:
        'A gallery like every other gallery, except that the far wall is not there and has not been for some time. What is past it is warm, and lit by nothing, and has weather. There are things growing on the limestone for eleven metres back on this side, and they are not lichen.',
      artDirection:
        'Quarry gallery whose far wall opens onto an impossible warm lit ecology, mineral growths creeping back along the limestone, unfamiliar flora, no visible light source, scale ambiguous. Awed, wrong, beautiful.',
      connections: [{ to: 'the_quarries', travelMinutes: 14, label: 'Back into the limestone' }],
      discoveredByDefault: false,
      mapPosition: { x: 0, y: 5 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_police',
      name: 'The Brigade',
      description: 'Nine officers working six months of linked cases out of a room on the island, led by somebody who has personally watched a man survive being shot and has not put that in a report.',
      startingReputation: 0,
      ranks: [
        { atReputation: -40, label: 'A person of interest' },
        { atReputation: 0, label: 'A witness' },
        { atReputation: 35, label: 'Off the record' },
        { atReputation: 70, label: 'In the room with the board uncovered' },
      ],
      allies: ['faction_institute'],
      enemies: ['faction_marot'],
    },
    {
      id: 'faction_institute',
      name: 'The Institut Béraud',
      description: 'A private research institute near the Panthéon with one biologist in the basement doing something its board would shut down within an hour of finding out about it.',
      startingReputation: 30,
      ranks: [
        { atReputation: -40, label: 'Escorted out' },
        { atReputation: 0, label: 'A subject' },
        { atReputation: 35, label: 'Trusted with a key' },
        { atReputation: 70, label: 'The other half of the work' },
      ],
      allies: ['faction_police'],
      enemies: ['faction_marot'],
    },
    {
      id: 'faction_press',
      name: 'The People Following It',
      description: 'Two journalism students, a forum, a paper map with pins in it, and about four hundred people who have worked out that the disappearances are one thing rather than eleven.',
      startingReputation: 10,
      ranks: [
        { atReputation: -40, label: 'A story' },
        { atReputation: 0, label: 'A number in a phone' },
        { atReputation: 35, label: 'A source' },
        { atReputation: 70, label: 'On the map' },
      ],
      allies: [],
      enemies: ['faction_marot'],
    },
    {
      id: 'faction_marot',
      name: 'The Foundation',
      description: 'A regenerative-medicine foundation with a real endowment, real grants and a real building, run by a patient man who believes the city should be made to share itself with something it has spent a thousand years keeping out.',
      startingReputation: -5,
      ranks: [
        { atReputation: -40, label: 'An obstacle' },
        { atReputation: 0, label: 'Unremarkable' },
        { atReputation: 35, label: 'Invited' },
        { atReputation: 70, label: 'Understood to agree' },
      ],
      allies: [],
      enemies: ['faction_police', 'faction_institute', 'faction_press'],
    },
  ],
  characters: [
    {
      id: 'camille',
      name: 'Camille Laurent',
      role: 'Twenty-one, the other compatible person, and three months into looking for her brother without waiting for anybody to authorise it',
      cardBlurb:
        'She is taking whichever creature you leave and she is not going to be grateful about it. She has been across this city on her own since March, she is better at it than you are, and she will solve pieces of this whether or not you are anywhere nearby.',
      pronouns: 'she/her',
      publicTraits: ['Already moving before the sentence is finished', 'Sarcastic at speed and only at speed', 'Physically incapable of standing still in a corridor'],
      hiddenDrives: [
        'She wants to be the one who finds him, specifically her, and is aware that is not the same as wanting him found',
        'She is frightened that the search has become the thing keeping her from admitting he is dead, and she has thought that sentence and never said it',
      ],
      values: [
        'Doing something today rather than waiting for the institution that has already failed her once',
        'Getting the victims out first and the credit sorted afterwards, if at all',
      ],
      fears: [
        'That Théo was gone before she started and she has spent three months building a reason not to know it',
        'Becoming somebody who treats other people’s worst night as material',
      ],
      socialStyle:
        'Direct to the point of rudeness under pressure and funny about it afterwards. Answers a question with a plan. Says the kind thing while already walking towards the door.',
      boundaries: [
        'Will not be around anybody who treats the attacks as entertainment, and the second time is the last time',
        'Will not leave a civilian in a building to chase somebody, and will end a partnership over it',
      ],
      goals: [
        'Find Théo, alive if that is still available',
        'Be the person who stops this, rather than the person who was standing near the person who stopped it',
      ],
      secrets: [
        {
          id: 'camille_the_sample',
          fact: 'She broke into a restricted scene in April and took a fragment of tissue before she had ever heard of Morel. She has kept it because she does not entirely trust him.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She produces it herself, fast and without ceremony, at the point where withholding it would get somebody hurt.',
        },
        {
          id: 'camille_the_draft',
          fact: 'Théo’s phone has an unsent message on it four words long, and she has read it about nine hundred times and never told anybody what it says.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says the four words out loud to somebody who has just told her something about their own family without being asked.',
        },
      ],
      speechStyle:
        'Contemporary, fast, and shorter the more serious it gets. Sarcasm arrives at speed and stops entirely when anybody is actually in danger. Answers questions with plans. Never makes a speech, and visibly resents being in a room where somebody else is.',
      topics: ['Théo', 'the sites', 'what she took', 'her beast', 'the police', 'what you did last night'],
      voiceSamples: [
        'Great. You picked first, I get what is left, and we are all pretending that is a scientific process. Which one are you taking so I can start being fine about it.',
        'Third of April, rue Bichat, I was inside the tape for ninety seconds. Yes it was stupid. It is also the only physical evidence anybody outside a police locker is holding, so.',
        'He is nineteen minutes late and Théo is never late, that was the whole thing about him, that was the joke about him — sorry. Yes. Let us go.',
        'Do not film them. I do not care what your reasoning is, put it away, those are somebody’s people on the ground.',
      ],
      appearance:
        'Twenty-one, short espresso-brown hair just above the shoulders with a messy fringe, pale green eyes, a runner’s build, black cropped jacket over a cream top, charcoal cargo trousers and sneakers that have done a great deal of Paris.',
      visualHook: 'A silver chain worn outside the collar that she puts in her mouth when she is thinking and denies doing.',
      silhouette: 'Half-turned away, already moving, bag strap across the chest.',
      artSeed: 'fb-camille-01',
      portrait: null,
      expressions: ['neutral', 'wry', 'urgent', 'furious', 'undone'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'belleville', activity: 'asleep at a friend’s, badly, on a sofa' },
        { startMinute: 300, endMinute: 600, locationId: 'canal_saint_martin', activity: 'walking the sites again, alone, in daylight' },
        { startMinute: 600, endMinute: 900, locationId: 'police_prefecture', activity: 'being politely refused by a desk sergeant' },
        { startMinute: 900, endMinute: 1140, locationId: 'lina_flat', activity: 'at the map, arguing about a pin' },
        { startMinute: 1140, endMinute: 1230, locationId: 'beraud_lab', activity: 'the lab, arms folded, waiting for somebody to arrive' },
        { startMinute: 1230, endMinute: 1440, locationId: 'montmartre', activity: 'the stairs at night, running them, because it helps' },
      ],
      homeLocationId: 'belleville',
      knowledgeScope: ['camille', 'theo', 'the_sites', 'canal_saint_martin', 'the_police', 'the_sample'],
      startingRelationship: { trust: 20, affection: 10, respect: 20, fear: 0, rivalry: 45 },
      gates: [
        { id: 'camille_works_with_you', label: 'She shares a lead instead of racing you to it', kind: 'ALLIANCE', requires: { trust: 50, respect: 55 } },
        { id: 'camille_shows_you_the_phone', label: 'She tells you what the four words are', kind: 'TRUST', requires: { trust: 65, affection: 50 } },
        { id: 'camille_closer', label: 'Neither of them is calling it a partnership any more', kind: 'ROMANCE', requires: { trust: 70, affection: 70 } },
      ],
      attributes: { might: 10, agility: 17, mind: 14, presence: 13, resolve: 15, arcana: 9 },
      companion: null,
      scouting: {
        learnRate: 1.3,
        cap: 7,
        revealCopy: 'She is on the corner before you get there. "You always go up," she says. "Every time. It is a very consistent habit for somebody being chased."',
      },
      combatant: { health: 40, defenseDc: 15, damage: 7, tags: ['handler'] },
    },
    {
      id: 'lucien',
      name: 'Lucien Marot',
      role: 'Thirty-four, a foundation, a philanthropy budget, a great many people missing, and a creature that chose him rather than the other way round',
      cardBlurb:
        'You will meet him at a fundraiser before you meet him anywhere else, and he will be good company. He thinks the city has spent a thousand years excluding everything it could not domesticate, and he is going to make it stop, and he is not going to raise his voice while he does it.',
      pronouns: 'he/him',
      publicTraits: ['Composed to the point of restfulness', 'Actually interested in the answer to a small question', 'Remembers the name of everybody’s animal'],
      hiddenDrives: [
        'He wants somebody to agree with him on the reasoning rather than be frightened into it, and has been alone with the argument for eleven years',
        'He is aware that Alba stays with him by choice and has begun structuring things so that it keeps choosing to',
      ],
      values: [
        'Whatever is alive, weighted equally, which is the whole horror of him',
        'Patience, which he regards as the only real difference between him and the people he takes',
      ],
      fears: [
        'That the boundary closes and everything on the other side of it goes back to not existing for anybody here',
        'Alba deciding it does not want this, which he has never once tested and never will',
      ],
      socialStyle:
        'Unhurried, warm and entirely present. Asks about you and listens to the answer. Never fills a silence and never seems uncomfortable in one. The violence is not a different register — it arrives out of the same calm and goes back into it.',
      boundaries: [
        'Will not harm an animal, at all, under any circumstances, including one attacking him',
        'Will not lie to somebody he has decided is worth recruiting, which is the most disarming thing about him',
      ],
      goals: [
        'Hold the boundary under the quarries open long enough that it stops needing to be held',
        'Find out whether either of Morel’s two people can be talked to rather than removed',
      ],
      secrets: [
        {
          id: 'lucien_the_people',
          fact: 'The abducted are alive, most of them, below the quarries. He takes people whose nervous systems are near-compatible because the boundary needs living synchronised tissue to stay open.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He explains it plainly, unprompted, to anybody who asks him what he is doing rather than accusing him of it.',
        },
        {
          id: 'lucien_and_morel',
          fact: 'He and Morel published together, eleven years ago, on developmental scaffolds. Morel walked away from the work and Lucien did not, and neither has ever said this to the other since.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It comes out of Morel, badly, when somebody says the name Marot in the lab.',
        },
      ],
      speechStyle:
        'Calm, complete and conversational, at exactly the pace of a pleasant dinner. Asks small specific questions and waits. Never threatens, never raises his voice, and describes appalling things in the same tone as the wine. Uses "we" about living things generally and "they" about institutions.',
      topics: ['the boundary', 'Alba', 'what a city is for', 'Morel', 'the people he has taken', 'your beast'],
      voiceSamples: [
        'It is a lovely animal. Look at the shoulders on it — that is not a design, nobody designed that, that is eleven million years of something arriving at an answer.',
        'They are alive. Most of them. I would rather you heard that from me than worked it out and spent a fortnight assuming the worse thing.',
        'A city is a very long argument about what is allowed to live in it. Paris has been winning that argument since the twelfth century. I am not sure winning was the correct outcome.',
        'Alba does not belong to me. It stays. Those are not the same sentence and the difference is the only thing I am proud of.',
      ],
      appearance:
        'Thirty-four, black hair brushed back, dark eyes, a pale grey coat that is always correct for the weather, and absolutely nothing remarkable about him until the moment he moves.',
      visualHook: 'A pale grey coat, immaculate, in a city where it has been raining for a week.',
      silhouette: 'Standing with his hands loosely together in front of him, entirely relaxed, taking up very little room.',
      artSeed: 'fb-lucien-01',
      portrait: null,
      expressions: ['neutral', 'attentive', 'delighted', 'regretful', 'still'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'the_quarries', activity: 'below the city, where he actually spends his nights' },
        { startMinute: 330, endMinute: 600, locationId: 'palais_royal', activity: 'the foundation office, doing entirely real philanthropy' },
        { startMinute: 600, endMinute: 900, locationId: 'palais_royal', activity: 'meetings, lunch, a board he chairs properly' },
        { startMinute: 900, endMinute: 1200, locationId: 'the_seine', activity: 'walking the river, at the pace of somebody with nowhere to be' },
        { startMinute: 1200, endMinute: 1440, locationId: 'the_quarries', activity: 'back down, with whoever the night produced' },
      ],
      homeLocationId: 'the_quarries',
      knowledgeScope: ['lucien', 'alba', 'the_boundary', 'the_quarries', 'morel', 'phase_tissue'],
      startingRelationship: { trust: 0, affection: 0, respect: 20, fear: 40, rivalry: 30 },
      gates: [
        { id: 'lucien_will_talk', label: 'He gives you the actual reasoning', kind: 'OTHER', requires: { respect: 40, flagsSet: ['spoke:lucien'] } },
        { id: 'lucien_offers', label: 'He offers you the thing he has never offered anybody', kind: 'OTHER', requires: { respect: 62, trust: 40 } },
      ],
      attributes: { might: 13, agility: 18, mind: 16, presence: 16, resolve: 17, arcana: 12 },
      companion: null,
      scouting: {
        learnRate: 1.6,
        cap: 9,
        revealCopy: 'He is not where he was and he has not appeared to move. "You lead with it," he says, from behind you, sounding pleased for you. "Every time. It is very loyal of you both."',
      },
      combatant: { health: 90, defenseDc: 20, damage: 16, tags: ['phase', 'bonded'] },
    },
    {
      id: 'lina',
      name: 'Lina Haddad',
      role: 'Journalism student, twenty-three, and the only person in Paris who had the disappearances on one map before anybody official did',
      cardBlurb:
        'She has six months of pins on a paper wall and four of them sit almost on top of each other. She will trade you everything she has, immediately, because she has worked out that hoarding it has not made anybody safer, and she will notice within a day that your bag moves on its own.',
      pronouns: 'she/her',
      publicTraits: ['Talks with her hands and a phone in one of them', 'Fact-checks people mid-sentence, warmly', 'Feeds anybody who comes to her flat whether or not they want it'],
      hiddenDrives: [
        'She wants the piece published under her own name and is ashamed of how much she wants that',
        'She has been carrying a message from somebody who was already officially missing when they sent it, and she has not given it to the police because she does not trust what they would do with the source',
      ],
      values: [
        'Sources over stories. She has killed two pieces to protect people and does not mention it',
        'Getting it right, at a level of pedantry that has cost her two friendships',
      ],
      fears: [
        'Somebody dying because they trusted her with something',
        'Being right about all of it in a way that arrives too late to matter to anybody',
      ],
      socialStyle:
        'Immediately familiar in a way that should be alarming and is not. Asks the intrusive question cheerfully and takes no for an answer instantly. Makes tea as a form of interrogation.',
      boundaries: [
        'Will not publish anything that identifies a living source, ever, whatever it costs the piece',
        'Will not be used as a channel by somebody who will not tell her what she is carrying',
      ],
      goals: [
        'Prove the disappearances are one thing, in print, with sourcing that survives a lawyer',
        'Find out where a message came from when the person who sent it had been missing for nine days',
      ],
      secrets: [
        {
          id: 'lina_the_message',
          fact: 'A victim messaged her eleven days after officially disappearing. The routing puts it under the city. She has told nobody, including the police, including her editor.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows it to the first person who tells her something true that costs them, and she wants it treated carefully rather than kept.',
        },
        {
          id: 'lina_the_offers',
          fact: 'The foundation has approached her three times to buy the map. The third approach was polite in a way that frightened her, and she has not connected it to the story yet.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It falls out of her sideways while she is complaining about money, and she stops halfway through the sentence.',
        },
      ],
      speechStyle:
        'Fast, sceptical, socially disarming. Interrupts to check a detail and apologises without slowing down. Calls out nonsense immediately and cheerfully, including her own. Ends serious things with a practical question rather than a sentiment.',
      topics: ['the map', 'the message', 'the victims', 'what the police have', 'her piece', 'the foundation'],
      voiceSamples: [
        'Six months, twenty-two people, and the Prefecture is still saying "no established link" in the present tense. Sit down, there is tea, I am going to show you a wall.',
        'Wait — you said quarter past. The report says half past. Which is it, because one of those makes the whole timeline work and the other one does not.',
        'He sent it eleven days after he stopped existing according to the ministry. I have had that on my phone since June and I have not given it to anybody, and I would quite like to stop being the only person holding it.',
        'Not his name. Not his street, not his job, not the school. You can have all of it except the parts that are him.',
      ],
      appearance:
        'Twenty-three, French-Algerian, long dark curls, brown eyes, an oversized leather jacket that is older than her degree, boots that have been resoled, and a phone in her hand at all times.',
      visualHook: 'An oversized cracked leather jacket with three enamel pins on the left lapel and nothing on the right.',
      silhouette: 'Cross-legged on the floor in front of a wall of paper, one arm up pointing at it.',
      artSeed: 'fb-lina-01',
      portrait: null,
      expressions: ['neutral', 'animated', 'sceptical', 'delighted', 'frightened'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'lina_flat', activity: 'asleep at the desk again, with the lamp on' },
        { startMinute: 360, endMinute: 720, locationId: 'lina_flat', activity: 'the map, the phone, and four calls that go nowhere' },
        { startMinute: 720, endMinute: 960, locationId: 'belleville', activity: 'the market, talking to everybody, buying almost nothing' },
        { startMinute: 960, endMinute: 1200, locationId: 'canal_saint_martin', activity: 'walking a site with a notebook and no press card' },
        { startMinute: 1200, endMinute: 1440, locationId: 'lina_flat', activity: 'back at the wall, moving one pin four centimetres' },
      ],
      homeLocationId: 'lina_flat',
      knowledgeScope: ['lina', 'the_map', 'the_victims', 'belleville', 'the_message', 'the_foundation'],
      startingRelationship: { trust: 30, affection: 25, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        { id: 'lina_shows_you_the_message', label: 'She shows you what she has been carrying since June', kind: 'TRUST', requires: { trust: 55, flagsSet: ['spoke:lina'] } },
        { id: 'lina_closer', label: 'She stops making tea instead of saying it', kind: 'ROMANCE', requires: { trust: 68, affection: 68 } },
      ],
      attributes: { might: 8, agility: 12, mind: 16, presence: 15, resolve: 13, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 28, defenseDc: 12, damage: 4, tags: ['civilian'] },
    },
    {
      id: 'morel',
      name: 'Étienne Morel',
      role: 'The biologist who grew three animals in a basement because nothing else in the world could touch the man doing this',
      cardBlurb:
        'He found you in a dataset and sent you four sentences, and now there is something in your bag that will die without you. He is brilliant, he is out of his depth, and he will keep asking you to do one more thing because there is nobody else to ask.',
      pronouns: 'he/him',
      publicTraits: ['Answers the question you should have asked instead', 'Forgets to eat and notices when other people do', 'Apologises constantly and changes nothing'],
      hiddenDrives: [
        'He wants to be forgiven for building them, by them, which is not available, and he has organised his whole life around not thinking that sentence',
        'He is trying to work out whether he can put this down before it costs somebody young their life, and he already knows the answer',
      ],
      values: [
        'The animals, individually, by name, above the work and above himself',
        'Being the person who says the true frightening thing in a room where everybody would rather he did not',
      ],
      fears: [
        'That the three of them are the same category of act as the thing he is trying to stop',
        'Watching a nineteen-year-old carry the consequence of a decision he made alone at four in the morning',
      ],
      socialStyle:
        'Warm, distracted, and about a beat behind the room socially and four ahead of it on everything else. Explains too much and then stops abruptly when he hears himself. Puts his hand on the glass of a habitat while he talks without noticing.',
      boundaries: [
        'Will not put a creature in front of a weapon to prove a hypothesis, and has refused funding over it twice',
        'Will not tell somebody the bond is safe, because it is not, and being asked to say it makes him furious in a way nothing else does',
      ],
      goals: [
        'Keep all three of them alive, which is now mostly out of his hands',
        'Understand the tissue well enough to stabilise it without a human being on the other end of it',
      ],
      secrets: [
        {
          id: 'morel_the_others',
          fact: 'Three survived. Eleven did not, over fourteen months, and he was present for all eleven and has their weights and dates written in a notebook nobody has seen.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says the number out loud, once, when somebody asks him whether the bond is dangerous and refuses to accept a reassuring answer.',
        },
        {
          id: 'morel_and_marot',
          fact: 'He published with Lucien Marot eleven years ago on developmental scaffolds, walked away from the work, and has never told anybody that the man doing this is using the thing they built together.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It comes out badly, mid-sentence, the first time somebody says the name Marot to him in his own lab.',
        },
      ],
      speechStyle:
        'Precise about biology and vague about everything else. Starts an explanation, hears how long it is going to be, and stops in the middle of it. Uses the creatures’ names constantly and the word "subject" never. Apologises as punctuation and does not mean it as an apology.',
      topics: ['the tissue', 'the bond', 'the three of them', 'what he lost', 'Marot', 'what you should be watching for'],
      voiceSamples: [
        'It is not armour and it is not a field. Something near him is preventing clean contact — the impact arrives, and then it is arriving somewhere slightly else. Sorry. That is the whole of what I know.',
        'Eleven. Over fourteen months. I was there for all of them and I wrote down what they weighed, and you asked me whether this is dangerous, so that is my answer.',
        'Do not call it a subject in this room. It has a name. I gave it one on the second day, which I am aware was unprofessional, and it is the least unprofessional thing about any of this.',
        'I made three and I found two people. I have thought about that sentence every day since March and it has not improved.',
      ],
      appearance:
        'Fifties, tall and slightly folded, grey at the sides, a cardigan under a lab coat neither of which has been washed recently, and hands that are always doing something small and precise.',
      visualHook: 'A cardigan worn under an unbuttoned lab coat, both with the same burn hole in the left cuff.',
      silhouette: 'Standing with one palm flat on the glass of a habitat, head tilted down at it.',
      artSeed: 'fb-morel-01',
      portrait: null,
      expressions: ['neutral', 'absorbed', 'anxious', 'gentle', 'wretched'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'beraud_lab', activity: 'asleep on a camp bed between two habitats' },
        { startMinute: 360, endMinute: 1200, locationId: 'beraud_lab', activity: 'the lab, and the third creature nobody chose' },
        { startMinute: 1200, endMinute: 1290, locationId: 'latin_quarter', activity: 'the twelve minutes a day he spends outdoors' },
        { startMinute: 1290, endMinute: 1440, locationId: 'beraud_lab', activity: 'back down, still working' },
      ],
      homeLocationId: 'beraud_lab',
      knowledgeScope: ['morel', 'phase_tissue', 'the_bond', 'beraud_lab', 'the_three', 'marot'],
      startingRelationship: { trust: 50, affection: 30, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        { id: 'morel_tells_you_the_number', label: 'He tells you how many did not survive', kind: 'TRUST', requires: { trust: 60, flagsSet: ['spoke:morel'] } },
        { id: 'morel_says_the_name', label: 'He tells you who he used to publish with', kind: 'TRUST', requires: { trust: 70, respect: 55 } },
      ],
      attributes: { might: 8, agility: 9, mind: 18, presence: 12, resolve: 12, arcana: 11 },
      companion: null,
      scouting: null,
      combatant: { health: 26, defenseDc: 11, damage: 3, tags: ['civilian'] },
    },
    {
      id: 'ravel',
      name: 'Inès Ravel',
      role: 'Commandante, thirty-seven, running six months of linked cases out of a room where the evidence board gets turned around when anybody senior visits',
      cardBlurb:
        'She has personally watched a man get shot and keep walking, and left it out of the report because she knows what happens to her case the day she writes it down. She is not going to trust you with an impossible animal, and within a fortnight she is going to need you and it.',
      pronouns: 'she/her',
      publicTraits: ['Writes down what you said and reads it back to you', 'Never once raises her voice at a subordinate', 'Visibly counting the hours she has been awake'],
      hiddenDrives: [
        'She wants to be the one who closes it, and knows that the moment it goes upstairs it stops being a case and starts being a national security file with no victims in it',
        'She has begun to consider going outside the law, and is monitoring that in herself the way she would monitor it in somebody else',
      ],
      values: [
        'The twenty-two families, whose names she can say from memory in order',
        'Procedure, right up to the point where procedure is what is getting people killed',
      ],
      fears: [
        'Being removed from her own case by people who will classify it and stop looking',
        'That she has already seen the thing that would have solved it and did not write it down because it sounded insane',
      ],
      socialStyle:
        'Correct, unhurried, and entirely unimpressed. Lets a silence run past comfortable. Treats a nineteen-year-old exactly as she treats a magistrate, which people find either respectful or terrifying depending on what they came in with.',
      boundaries: [
        'Will not put a civilian in front of it, and has refused a superior over exactly that',
        'Will not take evidence she cannot say where she got, which is the single largest obstacle in this story',
      ],
      goals: [
        'Stop the next one, which is the only unit of success she accepts',
        'Understand what she is looking at without handing the case to people who will bury it',
      ],
      secrets: [
        {
          id: 'ravel_saw_it',
          fact: 'On the second of May she put four rounds into a man at eleven metres and watched him walk away, and her report says the subject fled before she discharged her weapon.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it flatly to somebody who has just shown her something that makes it not the strangest thing in the room.',
        },
        {
          id: 'ravel_the_phone',
          fact: 'She has Théo Laurent’s phone in an evidence locker with an unsent draft on it, and she has not returned it to the family because returning it ends her one live thread.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it to somebody who asks about the family rather than about the case, and she is not comfortable about it.',
        },
      ],
      speechStyle:
        'Professional, level and slightly slow. Repeats your own sentence back with one word changed to show you what is wrong with it. No jargon, no reassurance, and no rank-pulling. Uses full names, including the victims’, every single time.',
      topics: ['the twenty-two', 'the second of May', 'the evidence', 'what her superiors want', 'Théo Laurent', 'what you were doing there'],
      voiceSamples: [
        'You said you were passing. Passing. At two in the morning, on a street with one entrance, four hundred metres from a scene that is still taped.',
        'Twenty-two. I can give you all of them in order and where they were going. That is not a memory exercise, it is the only thing keeping this a case rather than a phenomenon.',
        'Second of May. Four rounds, eleven metres, and he adjusted his coat and walked. My report says he fled beforehand. You can work out why my report says that.',
        'If this goes upstairs it becomes a file with no families in it. I have about nine days before that happens, so let us not spend one of them on whether you were passing.',
      ],
      appearance:
        'Thirty-seven, dark hair tied back and coming loose by afternoon, a long navy coat worn indoors, and the specific tiredness of somebody on month six of a case with no arrests.',
      visualHook: 'A navy coat kept on indoors in every room, including her own office.',
      silhouette: 'Standing at the end of a table with both hands flat on it, leaning in.',
      artSeed: 'fb-ravel-01',
      portrait: null,
      expressions: ['neutral', 'level', 'sceptical', 'grim', 'relieved'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'police_prefecture', activity: 'asleep in the chair in her office, again' },
        { startMinute: 300, endMinute: 780, locationId: 'police_prefecture', activity: 'the incident room, and a board turned face-down twice' },
        { startMinute: 780, endMinute: 1020, locationId: 'canal_saint_martin', activity: 'walking a scene for the ninth time' },
        { startMinute: 1020, endMinute: 1260, locationId: 'police_prefecture', activity: 'back at the Prefecture, writing what she can defend' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_seine', activity: 'the quay, alone, past the candles' },
      ],
      homeLocationId: 'police_prefecture',
      knowledgeScope: ['ravel', 'the_investigation', 'the_victims', 'police_prefecture', 'the_second_of_may'],
      startingRelationship: { trust: 5, affection: 0, respect: 15, fear: 10, rivalry: 0 },
      gates: [
        { id: 'ravel_off_the_record', label: 'She takes the coat off and closes the door', kind: 'TRUST', requires: { trust: 45, respect: 45 } },
        { id: 'ravel_will_act', label: 'She will move without waiting for something admissible', kind: 'ALLIANCE', requires: { trust: 65, respect: 65 } },
      ],
      attributes: { might: 12, agility: 12, mind: 16, presence: 15, resolve: 16, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 44, defenseDc: 14, damage: 8, tags: ['police'] },
    },
    {
      id: 'theo',
      name: 'Théo Laurent',
      role: 'Twenty-four, missing since March, and — if anybody gets down there — not dead',
      cardBlurb:
        'His sister has been looking for him since the third of April. He is eleven metres below a quarry gallery with nineteen other people, he has been awake for most of it, and what he has worked out down there is the single most useful thing anybody in this story could tell you.',
      pronouns: 'he/him',
      publicTraits: ['Talks to whoever is nearest, constantly, as a survival strategy', 'Keeps a tally of days on a wall in a system he had to invent', 'Extremely funny in circumstances where that is unbearable'],
      hiddenDrives: [
        'He has decided he is not coming out and has been managing everybody else down there on that assumption for eleven weeks',
        'He is terrified of what his sister has become while looking for him, and that fear is more present to him than his own situation',
      ],
      values: [
        'The other nineteen, whose names and days he keeps because nobody else was going to',
        'Being straight with somebody about a bad situation, which he thinks is the only respect available down there',
      ],
      fears: [
        'Camille coming down here, which is the one outcome he has spent three months trying to prevent by no available means',
        'That the thing on the other side is not hostile and that this is going to turn out to be nobody’s fault',
      ],
      socialStyle:
        'Immediately, exhaustingly friendly, because it works and because the alternative is silence. Deflects everything about himself into a question about you. Goes very quiet exactly once per conversation and then comes back.',
      boundaries: [
        'Will not be got out ahead of the others, and will physically obstruct anybody trying',
        'Will not lie to the nineteen about what is happening, and has not, at considerable cost',
      ],
      goals: [
        'Get twenty people up a quarry stair, which he has planned in detail and has no means to execute',
        'Get a message to his sister that is not the four words on his phone',
      ],
      secrets: [
        {
          id: 'theo_the_synchronisation',
          fact: 'The boundary is held open by living synchronised nervous systems. He worked that out in the first fortnight, from what happens to the light when somebody down there sleeps.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He gives it up in the first two minutes to anybody who arrives, because he has been waiting three months to tell somebody.',
        },
        {
          id: 'theo_the_deal',
          fact: 'Lucien has spoken to him eleven times and offered, sincerely, to let him leave. Théo has refused every time because the offer has never included the other nineteen.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He mentions it as a joke, badly, and then does not finish the joke.',
        },
      ],
      speechStyle:
        'Warm, fast and relentlessly deflecting, with a specific joke rhythm that keeps failing at the end. Turns every question about himself into a question about you. Counts things — days, people, metres — with total precision in the middle of otherwise loose sentences.',
      topics: ['the nineteen', 'the light', 'Camille', 'what Marot offered', 'how long it has been', 'the way out'],
      voiceSamples: [
        'Eighty-four days. Nineteen others, twelve of them still talking. You are the first person down that stair who was not carrying somebody, so — right, sorry, hello, who are you?',
        'The light goes wrong when we sleep. All of us at once, it dips. Took me two weeks. Nobody down here has anything to do except notice things.',
        'Is she all right? Do not do the face. I have got the face memorised, my mother invented the face.',
        'He asked me eleven times. Genuinely nice about it every time. I said the same thing every time, which is that there are twenty of us, and he said the same thing back, which is nothing.',
      ],
      appearance:
        'Twenty-four, eighty-four days thinner than his photograph, dark hair grown out, the same jacket he vanished in, and a tally scratched into limestone behind him in a system of his own invention.',
      visualHook: 'A tally of days cut into pale limestone, grouped in nineteens rather than fives.',
      silhouette: 'Sitting against a rock wall with his forearms on his knees, head up, talking.',
      artSeed: 'fb-theo-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'exhausted', 'urgent', 'breaking'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'the_boundary', activity: 'below the quarries, with nineteen other people, counting' },
      ],
      homeLocationId: 'the_boundary',
      knowledgeScope: ['theo', 'the_boundary', 'the_nineteen', 'lucien', 'the_quarries'],
      startingRelationship: { trust: 40, affection: 20, respect: 25, fear: 0, rivalry: 0 },
      gates: [
        { id: 'theo_tells_you_how_it_works', label: 'He tells you what holds it open', kind: 'TRUST', requires: { trust: 40, flagsSet: ['spoke:theo'] } },
        { id: 'theo_will_move', label: 'He will lead twenty people up a stair', kind: 'ALLIANCE', requires: { trust: 60, respect: 55 } },
      ],
      attributes: { might: 9, agility: 11, mind: 15, presence: 14, resolve: 17, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 22, defenseDc: 10, damage: 3, tags: ['civilian'] },
    },
  ],
  quests: [
    {
      id: 'q_the_first_night',
      title: 'The First Night',
      summary: 'There is something in your bag that will not survive without you, and you have to get it across Paris and into a flat without anybody noticing.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['morel', 'camille'],
      involvedLocationIds: ['beraud_lab', 'latin_quarter', 'metro_line'],
      knownRewardCopy: 'Some idea of what you have taken on, and whether it has decided about you yet.',
      steps: [
        {
          id: 'the_first_thirty_seconds',
          playerCopy: 'It has come to the front of the habitat and it is looking at you. Do something.',
          directorNotes:
            'Not a cutscene. The animal is a baby, it is not tame, and it is deciding as much as the player is. Camille is four feet away with her arms folded and will take whichever one is left. Morel is trying not to interfere and failing. Every route is a real way to meet an animal.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'got_down_to_its_level',
              label: 'Sit on the floor and let it come to you',
              predicate: { flagsSet: ['used:hold_it_together'] },
              setsFlags: ['it_came_to_you', 'started_well'],
              closesFlags: ['picked_it_up'],
            },
            {
              routeId: 'picked_it_up',
              label: 'Pick it up',
              predicate: { flagsSet: ['used:read_the_scene'] },
              setsFlags: ['picked_it_up'],
              closesFlags: ['it_came_to_you'],
            },
            {
              routeId: 'asked_morel_first',
              label: 'Ask the man who grew them what you are actually agreeing to',
              predicate: { flagsSet: ['spoke:morel'] },
              setsFlags: ['asked_the_question', 'knows:what_it_costs'],
              closesFlags: [],
            },
            {
              routeId: 'talked_to_her',
              label: 'Talk to the other one before you touch anything',
              predicate: { flagsSet: ['spoke:camille'] },
              setsFlags: ['met_camille_properly'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['knows:it_is_yours'], abilities: [], reputation: [{ factionId: 'faction_institute', amount: 8 }] },
        },
        {
          id: 'get_it_home',
          playerCopy: 'Get across Paris at ten at night with something in a bag that has never seen a street.',
          directorNotes:
            'The comedy step, and it should be genuinely funny before it is anything else. The Métro is the worst possible option and the fastest. It is frightened of the escalator, it is extremely interested in a busker, and somebody at the top of the stairs is going to look directly at the bag.',
          enterWhen: { flagsSet: ['knows:it_is_yours'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_metro',
              label: 'Take the Métro and hope',
              predicate: { flagsSet: ['used:keep_it_hidden'], atLocation: 'metro_line' },
              setsFlags: ['crossed_the_city', 'learned_the_metro'],
              closesFlags: [],
            },
            {
              routeId: 'went_over',
              label: 'Go up and take the roofs, which it prefers and you do not',
              predicate: { flagsSet: ['used:take_the_roofs'] },
              setsFlags: ['crossed_the_city', 'learned_the_roofs'],
              closesFlags: [],
            },
            {
              routeId: 'walked_it',
              label: 'Walk, for two hours, through streets with people on them',
              predicate: { flagsSet: ['used:hold_it_together'] },
              setsFlags: ['crossed_the_city', 'walked_it_home'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 70, items: [{ itemId: 'bakery_bag', qty: 1 }], flags: ['the_first_night_is_over'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_map',
      title: 'Twenty-Two People',
      summary: 'Six months, twenty-two disappearances, and four pins that sit almost on top of each other over an old quarry line.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['the_first_night_is_over'] },
      involvedCharacterIds: ['lina', 'ravel', 'camille'],
      involvedLocationIds: ['lina_flat', 'police_prefecture', 'canal_saint_martin'],
      knownRewardCopy: 'Where the disappearances actually cluster, and what one of the victims sent from underneath the city eleven days after he stopped existing.',
      steps: [
        {
          id: 'find_the_pattern',
          playerCopy: 'Somebody in this city already has this on one map. Find them.',
          directorNotes:
            'Three routes into the same fact and they cost differently. Lina trades instantly and wants her sources protected. Ravel will not take evidence she cannot source. Camille has been walking the sites for three months and will share only if she is not being raced.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_to_lina',
              label: 'Find the student with the paper wall',
              predicate: { flagsSet: ['spoke:lina'], atLocation: 'lina_flat' },
              setsFlags: ['knows:the_cluster', 'lina_is_in'],
              closesFlags: [],
            },
            {
              routeId: 'went_to_the_police',
              label: 'Walk into the Prefecture and ask',
              predicate: { flagsSet: ['spoke:ravel'], atLocation: 'police_prefecture' },
              setsFlags: ['knows:the_cluster', 'ravel_has_your_name'],
              closesFlags: [],
            },
            {
              routeId: 'walked_the_sites',
              label: 'Walk the sites yourself, in daylight, like she has been doing',
              predicate: { flagsSet: ['used:read_the_scene'], atLocation: 'canal_saint_martin' },
              setsFlags: ['knows:the_cluster', 'found_it_yourself'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['looking_for_the_pattern'], abilities: [], reputation: [{ factionId: 'faction_press', amount: 10 }] },
        },
        {
          id: 'the_message_from_underneath',
          playerCopy: 'One of the missing sent a message eleven days after he went missing. Find out from where.',
          directorNotes:
            'The routing puts it below the city. This is the hinge of the whole investigation and it arrives as a phone in somebody’s hand rather than as a revelation. Lina wants it handled carefully. Ravel wants a chain of custody that does not exist.',
          enterWhen: { flagsSet: ['looking_for_the_pattern'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'lina_showed_you',
              label: 'Be shown the message she has been carrying since June',
              predicate: { minRelationship: [{ characterId: 'lina', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:the_service_doors', 'knows:they_are_alive'],
              closesFlags: [],
            },
            {
              routeId: 'ravel_traded',
              label: 'Trade the police something they can use for something they have',
              predicate: { flagsSet: ['used:ask_around'], minRelationship: [{ characterId: 'ravel', dimension: 'trust', value: 45 }] },
              setsFlags: ['knows:the_service_doors', 'has_theo_phone'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_doors',
              label: 'Work out where the routing goes and go and look at the door',
              predicate: { flagsSet: ['used:sound_the_walls'] },
              setsFlags: ['knows:the_service_doors', 'found_the_door_yourself'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 120, items: [], flags: ['knows:it_is_underneath'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_man_in_the_coat',
      title: 'The Man In The Pale Coat',
      summary: 'He hosts a fundraiser on the eleventh, he answers his own correspondence, and nothing anybody has shot him with has touched him.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:the_cluster'] },
      involvedCharacterIds: ['lucien', 'morel', 'camille', 'ravel'],
      involvedLocationIds: ['palais_royal', 'the_roofline', 'beraud_lab'],
      knownRewardCopy: 'Who he is, what he wants, and the fact that he is going to be perfectly pleasant about all of it.',
      steps: [
        {
          id: 'work_out_who',
          playerCopy: 'Put a name on the man in the coat.',
          directorNotes:
            'Do not make this hard. Three ordinary investigative routes converge on a foundation in the first arrondissement. The difficulty is entirely that he is a real philanthropist with real grants and a real board, and saying his name out loud in Paris is a career-ending act for anybody who cannot prove it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'followed_the_money',
              label: 'Follow the funding back to a building',
              predicate: { flagsSet: ['used:read_the_scene'], atLocation: 'palais_royal' },
              setsFlags: ['knows:his_name'],
              closesFlags: [],
            },
            {
              routeId: 'morel_said_it',
              label: 'Say the name to the professor and watch what happens to his face',
              predicate: { minRelationship: [{ characterId: 'morel', dimension: 'trust', value: 70 }] },
              setsFlags: ['knows:his_name', 'knows:they_worked_together'],
              closesFlags: [],
            },
            {
              routeId: 'saw_him_move',
              label: 'Be close enough to see him move once',
              predicate: { flagsSet: ['used:take_the_roofs'], atLocation: 'the_roofline' },
              setsFlags: ['knows:his_name', 'saw_him_move'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 110, items: [], flags: ['knows:who_he_is'], abilities: [], reputation: [] },
        },
        {
          id: 'meet_him',
          playerCopy: 'He has sent you a card. Decide what you are doing about that.',
          directorNotes:
            'He is good company. That is the scene. He asks about your animal and means it, he explains what he is doing without being asked twice, and he does not threaten anybody at any point. The player should leave genuinely unsure whether the meeting went well.',
          enterWhen: { flagsSet: ['knows:who_he_is'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_and_talked',
              label: 'Go, and let him talk',
              predicate: { flagsSet: ['spoke:lucien'], atLocation: 'palais_royal' },
              setsFlags: ['heard_him_out', 'knows:they_are_alive'],
              closesFlags: [],
            },
            {
              routeId: 'went_at_him',
              label: 'Go, and set the animal on him in a room full of donors',
              predicate: { flagsSet: ['used:set_it_on_them'], atLocation: 'palais_royal' },
              setsFlags: ['attacked_him_in_public', 'knows:nothing_touches_him'],
              closesFlags: ['heard_him_out'],
            },
            {
              routeId: 'sent_the_police',
              label: 'Give the whole thing to the police and let them walk in',
              predicate: { minRelationship: [{ characterId: 'ravel', dimension: 'trust', value: 60 }] },
              setsFlags: ['police_moved_on_him', 'knows:nothing_touches_him'],
              closesFlags: [],
            },
            {
              routeId: 'did_not_go',
              label: 'Do not go, and let him wonder',
              predicate: { flagsSet: ['knows:who_he_is'] },
              setsFlags: ['stayed_away_from_him'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 150, items: [], flags: ['the_meeting_happened'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_what_it_is',
      title: 'What You Are Carrying',
      summary: 'It is getting bigger, it is getting stranger, and the tissue does not always hold the shape it started the day in.',
      kind: 'SIDE',
      startsActive: true,
      involvedCharacterIds: ['morel', 'camille', 'lina'],
      involvedLocationIds: ['beraud_lab', 'lina_flat', 'montmartre'],
      knownRewardCopy: 'What the bond actually costs, and whether the thing in your bag is a partner or a patient.',
      steps: [
        {
          id: 'the_first_bad_night',
          playerCopy: 'It has been holding the wrong outline for four minutes and it will not look at you.',
          directorNotes:
            'The first time the cost is visible. It is not dying and it is not fine. Whatever the player does here sets the shape of the relationship for the rest of the story, and doing nothing but sitting on the floor with it for an hour is a genuine and good answer.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'sat_with_it',
              label: 'Sit on the floor and do nothing else for an hour',
              predicate: { flagsSet: ['used:hold_it_together'] },
              setsFlags: ['it_trusts_you', 'knows:what_it_costs'],
              closesFlags: ['took_it_to_the_lab'],
            },
            {
              routeId: 'took_it_to_the_lab',
              label: 'Take it back to the man who made it',
              predicate: { flagsSet: ['spoke:morel'], atLocation: 'beraud_lab' },
              setsFlags: ['took_it_to_the_lab', 'knows:what_it_costs'],
              closesFlags: [],
            },
            {
              routeId: 'used_the_kit',
              label: 'Use the ampoules and read the note afterwards',
              predicate: { hasItems: ['field_kit'] },
              setsFlags: ['used_the_ampoules', 'knows:what_it_costs'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 90, items: [], flags: ['the_first_bad_night'], abilities: ['go_all_the_way'], reputation: [] },
        },
        {
          id: 'what_it_becomes',
          playerCopy: 'Find out what it turns into when it stops being small.',
          directorNotes:
            'Growth is emotional spectacle rather than a bar filling. It happens in the middle of something else, at the worst moment, and it is frightening for both of them. The shape it takes is determined by how it has been treated rather than by hours logged.',
          enterWhen: { flagsSet: ['the_first_bad_night'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'grew_protecting',
              label: 'It changes while standing over somebody',
              predicate: { flagsSet: ['it_trusts_you', 'used:hold_it_together'] },
              setsFlags: ['it_grew', 'grew_protecting'],
              closesFlags: ['grew_hunting'],
            },
            {
              routeId: 'grew_hunting',
              label: 'It changes halfway through a chase it was winning',
              predicate: { flagsSet: ['used:set_it_on_them'] },
              setsFlags: ['it_grew', 'grew_hunting'],
              closesFlags: ['grew_protecting'],
            },
            {
              routeId: 'did_not_grow',
              label: 'Keep it out of everything, and keep it small',
              predicate: { flagsSet: ['the_first_bad_night', 'used:keep_it_hidden'] },
              setsFlags: ['kept_it_out_of_it'],
              closesFlags: ['it_grew'],
            },
          ],
          rewards: { xp: 140, items: [], flags: ['the_growth_question_is_settled'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_underneath',
      title: 'It Is Under Us',
      summary: 'Four words in an unsent draft, a routing that goes below the city, and a hundred and eighty kilometres of limestone that nobody has a complete map of.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:it_is_underneath'] },
      involvedCharacterIds: ['theo', 'lucien', 'camille', 'ravel'],
      involvedLocationIds: ['service_tunnels', 'the_quarries', 'the_boundary'],
      knownRewardCopy: 'Twenty people, what is holding the far wall open, and who ends up standing in front of it.',
      steps: [
        {
          id: 'get_down_there',
          playerCopy: 'Get below the Métro and into the limestone.',
          directorNotes:
            'Cold, dry and entirely dark. This is a descent rather than a dungeon: the pressure is that nobody knows where they are, and the animal is the only thing down here that does. Do not put a monster in the first gallery.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_key',
              label: 'Go through the inspectorate doors with a key that is not yours',
              predicate: { hasItems: ['quarry_key'], atLocation: 'service_tunnels' },
              setsFlags: ['knows:the_quarry_route'],
              closesFlags: [],
            },
            {
              routeId: 'sounded_it_out',
              label: 'Let it find the way through the stone',
              predicate: { flagsSet: ['used:sound_the_walls'], atLocation: 'service_tunnels' },
              setsFlags: ['knows:the_quarry_route', 'it_found_the_way'],
              closesFlags: [],
            },
            {
              routeId: 'went_with_her',
              label: 'Go down with the person who has been trying to get down there since April',
              predicate: { minRelationship: [{ characterId: 'camille', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:the_quarry_route', 'went_down_together'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 130, items: [], flags: ['under_the_city'], abilities: [], reputation: [] },
        },
        {
          id: 'the_far_wall',
          playerCopy: 'There are twenty people down here and the far wall of the gallery is not there.',
          directorNotes:
            'Théo has been waiting three months to tell somebody how it works and does it in the first two minutes. The nineteen others are individually present. Whatever the player does about the boundary, twenty people are standing in the room while they decide.',
          enterWhen: { flagsSet: ['under_the_city'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'got_them_out',
              label: 'Twenty people up a stair, first, before anything else',
              predicate: { flagsSet: ['spoke:theo'], atLocation: 'the_boundary' },
              setsFlags: ['got_them_out', 'theo_is_alive'],
              closesFlags: [],
            },
            {
              routeId: 'closed_it',
              label: 'Take the synchronisation away and let the wall come back',
              predicate: { flagsSet: ['used:go_all_the_way'], atLocation: 'the_boundary' },
              setsFlags: ['closed_the_boundary'],
              closesFlags: ['held_it_open'],
            },
            {
              routeId: 'held_it_open',
              label: 'Decide he is right about what a city is for',
              predicate: { flagsSet: ['heard_him_out', 'used:hold_it_together'], atLocation: 'the_boundary' },
              setsFlags: ['held_it_open'],
              closesFlags: ['closed_the_boundary'],
            },
            {
              routeId: 'went_through',
              label: 'Go through it',
              predicate: { flagsSet: ['it_trusts_you'], atLocation: 'the_boundary' },
              setsFlags: ['went_through', 'left_the_map'],
              closesFlags: ['closed_the_boundary'],
            },
          ],
          rewards: { xp: 220, items: [], flags: ['the_boundary_is_answered'], abilities: [], reputation: [] },
        },
        {
          id: 'what_paris_gets',
          playerCopy: 'Find out what the city ends up with.',
          directorNotes:
            'The morning after. What Paris knows is set here and it is frequently not the truth. Twenty families, a police case that has to be written down somehow, a journalist with a decision, and a foundation with an endowment and a board meeting on Thursday.',
          enterWhen: { flagsSet: ['the_boundary_is_answered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'it_stayed_quiet',
              label: 'Twenty people come home and nobody ever explains it',
              predicate: { flagsSet: ['got_them_out', 'closed_the_boundary'] },
              setsFlags: ['paris_stayed_paris'],
              closesFlags: ['paris_changed'],
            },
            {
              routeId: 'it_went_public',
              label: 'Let the student publish it',
              predicate: { flagsSet: ['lina_is_in'], minRelationship: [{ characterId: 'lina', dimension: 'trust', value: 62 }] },
              setsFlags: ['paris_knows'],
              closesFlags: [],
            },
            {
              routeId: 'it_stayed_open',
              label: 'The far wall is still not there in the morning',
              predicate: { flagsSet: ['held_it_open'] },
              setsFlags: ['paris_changed'],
              closesFlags: ['paris_stayed_paris'],
            },
            {
              routeId: 'you_were_not_there',
              label: 'Be somewhere else entirely by then',
              predicate: { flagsSet: ['left_the_map'] },
              setsFlags: ['you_were_not_there'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 260, items: [], flags: ['the_city_has_decided'], abilities: [], reputation: [{ factionId: 'faction_police', amount: 20 }] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_candles',
      atWorldMinute: 1440 + 8 * 60,
      locationId: 'the_seine',
      publicCopy:
        'Somebody has replaced the candles under the third bridge again. There are twenty-two photographs against the wall now and the newest one has been there four days.',
      directorNotes:
        'Ordinary grief, in public, in a city that has learned to walk past it. No creature content. This is what everything in the story is actually about and it should be allowed to be quiet.',
      setsFlags: ['saw_the_candles'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_camille_gets_there_first',
      atWorldMinute: 2 * 1440 + 11 * 60,
      locationId: 'canal_saint_martin',
      publicCopy:
        'There is police tape on the quay at Bichat and a twenty-one-year-old already inside it, walking the ground, being shouted at by nobody because nobody has noticed her yet.',
      directorNotes:
        'She solves a piece of this whether or not the player is anywhere near. The point of the event is that the world does not wait — arriving late and being told what she found is a legitimate and frequent experience of this story.',
      setsFlags: ['camille_got_there_first'],
      cancelledByFlags: ['found_it_yourself'],
      requiresFlags: ['the_first_night_is_over'],
      movesCharacters: [{ characterId: 'camille', toLocationId: 'canal_saint_martin' }],
    },
    {
      id: 'we_the_clip',
      atWorldMinute: 3 * 1440 + 20 * 60,
      locationId: null,
      publicCopy:
        'Eleven seconds of phone footage from a courtyard in the tenth goes from four hundred views to a hundred and ten thousand between nine and midnight. Something in it moves in a way an animal does not.',
      directorNotes:
        'The first Exposure event with a face on it. Nobody in the clip is identifiable. What changes is that Paris now has a second thing to be frightened of, and about a third of the city thinks the second thing is fake.',
      setsFlags: ['the_clip_went_up'],
      cancelledByFlags: [],
      requiresFlags: ['the_first_night_is_over'],
      movesCharacters: [],
    },
    {
      id: 'we_ravel_comes_looking',
      atWorldMinute: 4 * 1440 + 10 * 60,
      locationId: 'latin_quarter',
      publicCopy:
        'There is a woman in a navy coat outside the Institut at ten in the morning who is not going in, and who has been there long enough to have finished a coffee.',
      directorNotes:
        'She has your name from somewhere and she is going to say it. She is not hostile and she is not friendly; she is on month six with no arrests and you are the newest variable in a file that is about to be taken off her.',
      setsFlags: ['ravel_has_your_name'],
      cancelledByFlags: [],
      requiresFlags: ['the_clip_went_up'],
      movesCharacters: [{ characterId: 'ravel', toLocationId: 'latin_quarter' }],
    },
    {
      id: 'we_the_invitation',
      atWorldMinute: 5 * 1440 + 9 * 60,
      locationId: null,
      publicCopy:
        'A card arrives on heavy cream stock with a foundation crest, a date and a time. The date is the eleventh. Your name on it is handwritten.',
      directorNotes:
        'He sends four hundred of these and hand-writes eleven. He knows who you are, he is not hiding that he knows, and there is nothing in the card that could be shown to anybody as evidence of anything at all.',
      setsFlags: ['the_card_arrived'],
      cancelledByFlags: ['police_moved_on_him'],
      requiresFlags: ['knows:who_he_is'],
      movesCharacters: [],
    },
    {
      id: 'we_another_one',
      atWorldMinute: 6 * 1440 + 2 * 60 + 40,
      locationId: 'belleville',
      publicCopy:
        'A twenty-three-year-old leaves a bar on rue Dénoyez at twenty to three and does not reach the corner. It is the twenty-third.',
      directorNotes:
        'It keeps happening while the player is doing other things. Somebody they may have met. Write it from the aftermath — a phone still ringing on a table, a friend on the kerb — rather than from the attack.',
      setsFlags: ['the_twenty_third'],
      cancelledByFlags: ['closed_the_boundary', 'got_them_out'],
      requiresFlags: ['knows:the_cluster'],
      movesCharacters: [],
    },
    {
      id: 'we_the_lab_is_found',
      atWorldMinute: 7 * 1440 + 4 * 60,
      locationId: 'beraud_lab',
      publicCopy:
        'The door at the bottom of the second flight is open and it was not left open, and there is one empty habitat where there were two.',
      directorNotes:
        'The third creature — the one nobody chose — is gone. Morel is on the floor and unhurt and has not moved for some time. Nothing was broken and nothing was forced, which is worse.',
      setsFlags: ['the_lab_was_entered', 'the_third_is_gone'],
      cancelledByFlags: ['closed_the_boundary'],
      requiresFlags: ['the_card_arrived'],
      movesCharacters: [{ characterId: 'morel', toLocationId: 'beraud_lab' }],
    },
    {
      id: 'we_alba',
      atWorldMinute: 8 * 1440 + 23 * 60,
      locationId: 'the_roofline',
      publicCopy:
        'There is something white on the ridge line four roofs away. It is not hunting and it is not hiding, and looking at it interrupts the fear for about two seconds.',
      directorNotes:
        'The fourth beast, seen properly. It does not attack. It observes, decides the player is not currently interesting, and leaves without hurrying. Whatever the player’s animal does in its presence is the actual content of the scene.',
      setsFlags: ['knows:alba'],
      cancelledByFlags: [],
      requiresFlags: ['knows:who_he_is'],
      movesCharacters: [],
    },
    {
      id: 'we_lina_is_approached',
      atWorldMinute: 9 * 1440 + 15 * 60,
      locationId: 'lina_flat',
      publicCopy:
        'Somebody has been to the fourth floor walk-up while she was out, taken nothing, and moved one pin on the map four centimetres to the left.',
      directorNotes:
        'The politest possible threat and she understands it immediately. The pin they moved is the correct one. She is frightened and is going to keep going, and would very much like somebody to know where she is this week.',
      setsFlags: ['lina_was_visited'],
      cancelledByFlags: ['police_moved_on_him', 'closed_the_boundary'],
      requiresFlags: ['lina_is_in'],
      movesCharacters: [{ characterId: 'lina', toLocationId: 'lina_flat' }],
    },
    {
      id: 'we_the_city_notices',
      atWorldMinute: 11 * 1440 + 19 * 60,
      locationId: 'metro_line',
      publicCopy:
        'Two Métro lines are suspended between six and nine and the announcement gives no reason. There are people in the corridors at Réaumur who are not RATP and are not police.',
      directorNotes:
        'What happens at the top of Exposure. The creatures have become the story rather than the disappearances, which is precisely the outcome Lucien has been building towards without anybody noticing he wanted it.',
      setsFlags: ['the_city_is_looking'],
      cancelledByFlags: ['closed_the_boundary', 'paris_stayed_paris'],
      requiresFlags: ['the_clip_went_up'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_what_you_chose',
      kind: 'RELATIONSHIP',
      label: 'The animal you picked out of three in a warm room',
      seedHint: 'It comes to the front of the habitat and looks at you before you have decided anything.',
      payoffHint: 'It holds the wrong outline for four minutes and will not look at you, and there is nothing in the kit for it.',
      weight: 1,
    },
    {
      id: 'p_the_man_in_the_coat',
      kind: 'BOSS',
      label: 'Somebody bullets have not touched in six months',
      seedHint: 'Twenty-two photographs against a wall under a bridge, and footage that loses frames at the moment he moves.',
      payoffHint: 'He is charming, he answers the question, and there is a creature standing behind him that chose to be there.',
      weight: 0.95,
    },
    {
      id: 'p_theo',
      kind: 'MYSTERY',
      label: 'Where twenty-two people actually went',
      seedHint: 'Four pins on a paper map that sit almost on top of each other over an old quarry line.',
      payoffHint: 'A message sent eleven days after somebody stopped existing, routed from underneath the city.',
      weight: 0.9,
    },
    {
      id: 'p_camille',
      kind: 'RIVAL',
      label: 'The other person the dataset found',
      seedHint: 'She takes whichever one you leave and is not going to be gracious about it.',
      payoffHint: 'She has been inside a police cordon, she has physical evidence nobody else holds, and she got there first.',
      weight: 0.85,
    },
    {
      id: 'p_the_fourth',
      kind: 'THEME',
      label: 'Where the tissue came from in the first place',
      seedHint: 'Morel says he made three. He does not say what he made them out of.',
      payoffHint: 'Something white on a ridge line four roofs away that is neither hunting nor hiding.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_aurel',
      name: 'Aurel',
      role: 'Speed and tracking',
      summary: 'The gold one with the silver quills. Fast, proud, physically affectionate, hates being shut in, and can follow one person across four arrondissements by scent.',
      playstyle: ['Fast', 'Loyal', 'Conspicuous'],
      blurb: 'Metallic gold, an enormous mane, silver quills along the shoulders, and teeth that are completely black. At this size it is adorable. When it bares them, you remember what it was grown for.',
      attributeBonus: { agility: 3, might: 1 },
      skillProficiencies: { handling: 2, freerun: 2, streetcraft: 1 },
      startingItems: [],
      startingAbilities: ['run_it_down'],
      startingReputation: [{ factionId: 'faction_institute', amount: 6 }],
    },
    {
      id: 'arch_nox',
      name: 'Nox',
      role: 'Heat and stubbornness',
      summary: 'The small black one that looks permanently annoyed. Suspicious, independent, loyal once it decides, and capable of putting heat into things with nothing burning to make it.',
      playstyle: ['Cautious', 'Independent', 'Opens things'],
      blurb: 'Charcoal, low to the ground, with red rings glowing along its back and an expression of settled disapproval. It will stare at a stranger rather than hide from them, which is not always the better option.',
      attributeBonus: { resolve: 3, mind: 1 },
      skillProficiencies: { handling: 2, nerve_skill: 2, scene_read: 1 },
      startingItems: [],
      startingAbilities: ['burn_through'],
      startingReputation: [{ factionId: 'faction_institute', amount: 6 }],
    },
    {
      id: 'arch_marea',
      name: 'Marea',
      role: 'Sound and curiosity',
      summary: 'The strangest of the three: a small land-going orca that steals things, bonds fast, hates sitting still, and can tell you what is on the other side of a wall.',
      playstyle: ['Curious', 'Sociable', 'Sees through walls'],
      blurb: 'Coral-pink and cream, glossy black eyes, a small dorsal fin and a mouth built for an expression it uses constantly. It will have taken something out of your bag before you leave the room.',
      attributeBonus: { mind: 3, presence: 1 },
      skillProficiencies: { handling: 2, scene_read: 2, talk: 1 },
      startingItems: [],
      startingAbilities: ['sound_the_walls'],
      startingReputation: [{ factionId: 'faction_institute', amount: 6 }],
    },
    {
      id: 'arch_none',
      name: 'You Said No',
      role: 'On your own, for now',
      summary: 'You walked out of that room without one. Camille takes hers, two stay in their habitats, and everything after this you do as a person in a city with a murderer in it.',
      playstyle: ['Unbonded', 'Free', 'Underestimated'],
      blurb: 'Morel did not argue. He wrote a number on a card, said the door stays open, and went back to what he was doing, which was somehow worse than being argued with.',
      attributeBonus: { mind: 2, resolve: 2 },
      skillProficiencies: { streetcraft: 3, talk: 2 },
      startingItems: [{ itemId: 'lina_notes', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_press', amount: 12 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What does Morel call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Nour Bellanger' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'There are three of them in this room. Which one?',
      helpText:
        'The animal you take out of that lab, which is what you will be able to do for the rest of the story — speed and tracking, heat and stubbornness, or sound and curiosity. It is fixed for the whole story and you cannot swap later. Refusing all three is a real option and the story keeps going without one.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'How did you end up in his dataset?',
      helpText: 'Whatever you write, this world will work with. A study you volunteered for, a hospital after one of the attacks, a family connection, or something entirely your own. One plain sentence.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I was in the hospital at Saint-Louis the night of the second attack and somebody took a great deal of blood.',
    },
    {
      id: 'your_paris',
      label: 'Where do you actually live?',
      helpText: 'A starting arrondissement and a starting life. It changes who recognises you in the street, not what you can do.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'belleville', label: 'Belleville — a hill, a market, and everybody knowing everybody' },
        { id: 'fifth', label: 'The fifth — student, bookshops, four doors from the Institut' },
        { id: 'tenth', label: 'The tenth — the canal, and two of the disappearances on your walk home' },
        { id: 'eighteenth', label: 'Montmartre — six flights up and three hundred steps to anywhere' },
        { id: 'nowhere', label: 'Nowhere yet. You arrived in Paris this year and know four people' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does Camille see across that room?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Somebody who came straight from a shift and has not decided yet whether this is a prank.',
    },
  ],
  endings: [
    {
      id: 'end_paris_still_ours',
      name: 'Paris, Still Ours',
      rarity: 'COMMON',
      minTurn: 36,
      requires: { flagsSet: ['paris_stayed_paris'], flagsUnset: ['paris_changed'] },
      condition:
        'The killing stopped and the city stayed a city, whether or not anybody ever found out what it was. Write the ordinary resumption rather than a victory: the tape comes down, the candles get cleared by somebody from the mairie, and the story goes from the front page to page eleven to nowhere in about nine days.',
      epilogue:
        'Twenty people come home and none of them gives an interview. The Prefecture closes it with a form of words that satisfies nobody and is not challenged. In the eleventh, a woman who runs a bakery still puts an extra pastry in the bag most mornings, and has never once asked what it is for.',
      hint: '',
    },
    {
      id: 'end_the_fourth_beast',
      name: 'The Fourth Beast',
      rarity: 'RARE',
      minTurn: 42,
      requires: { flagsSet: ['knows:alba', 'closed_the_boundary'], flagsUnset: ['held_it_open'] },
      condition:
        'Alba is alive, whatever it had with Lucien is over, and it has attached itself to somebody in this story on its own terms. It is not a prize and it has not been tamed. Write it as an animal that has made a second choice in its life and is watching to see whether this one was better.',
      epilogue:
        'It does not live anywhere. It turns up, on a roof, at intervals of nine or ten days, and once it is inside a room it behaves impeccably and eats everything. Nobody has ever photographed it successfully. Whatever it decides it is doing, it has stopped doing the other thing.',
      hint: '',
    },
    {
      id: 'end_two_handlers',
      name: 'Two Handlers',
      rarity: 'RARE',
      minTurn: 40,
      requires: {
        flagsSet: ['theo_is_alive'],
        minRelationship: [{ characterId: 'camille', dimension: 'respect', value: 72 }],
      },
      condition:
        'Both of them came out of it and neither of them owes the other anything. This is about respect rather than romance and works whether they ended up close or barely speaking. What it is about is that each of them is now permanently the other one’s measure of whether a thing was done well.',
      epilogue:
        'They do not work together. They compare, constantly, at a distance, through people who know them both. When somebody asks either of them who else could have done it, both give the same name and are irritated about it.',
      hint: '',
    },
    {
      id: 'end_more_than_rivals',
      name: 'More Than Rivals',
      rarity: 'RARE',
      minTurn: 42,
      requires: {
        flagsSet: ['theo_is_alive'],
        minRelationship: [
          { characterId: 'camille', dimension: 'trust', value: 72 },
          { characterId: 'camille', dimension: 'affection', value: 72 },
        ],
      },
      condition:
        'It became something and it survived the crisis, which is the harder half. Write their actual dynamic rather than a generic settled ending — they met by being handed two halves of the same impossible thing and raced each other across a city for a fortnight, and neither of them stops doing that.',
      epilogue:
        'Two animals in one flat is a great deal worse than either of them expected and is discussed at length, daily, for years. Théo moves in for four months and describes it, to anybody who asks, as living inside an argument that both people are enjoying.',
      hint: '',
    },
    {
      id: 'end_the_menagerie',
      name: 'The Professor’s Menagerie',
      rarity: 'RARE',
      minTurn: 44,
      requires: {
        flagsSet: ['paris_knows'],
        minFactionReputation: [{ factionId: 'faction_institute', value: 55 }],
      },
      condition:
        'Morel lived, the work came out into the light, and what replaced it has rules that somebody outside the room wrote. Do not make this triumphant — it is a research programme with an ethics board and a waiting list, and the thing that makes it good is precisely that it is boring now.',
      epilogue:
        'Eleven compatible people are identified in the first two years and every one of them is told the number of embryos that failed before they are shown anything. Morel does not run it. He sits on the panel that says no, which is the job he asked for.',
      hint: '',
    },
    {
      id: 'end_no_masters',
      name: 'No Masters',
      rarity: 'RARE',
      minTurn: 42,
      requires: { flagsSet: ['paris_knows', 'it_trusts_you'], flagsUnset: ['paris_changed'] },
      condition:
        'The player refused the framing that these are anybody’s property, publicly, and made it stick. This costs the ending its comfort: an animal that cannot be owned also cannot be protected by anybody who owns it, and the argument about what it is instead runs for years without resolving.',
      epilogue:
        'It becomes a legal question, then a political one, then a slow one. Three court cases in four years and none of them settles the central point. Yours stays with you, which everybody involved is careful to describe as a fact rather than a right.',
      hint: '',
    },
    {
      id: 'end_wild_paris',
      name: 'Wild Paris',
      rarity: 'UNIQUE',
      minTurn: 46,
      requires: { flagsSet: ['paris_changed', 'held_it_open'] },
      condition:
        'The boundary stayed open and the city is still standing, which is not the same as the city being all right. Write the coexistence concretely — what grows on the quarry line, which two Métro stations never reopened, what the eleventh looks like in August now — rather than as a montage.',
      epilogue:
        'The fourteenth and part of the fifth are a different biome within four years and there is a mairie department for it with a budget and a staffing problem. Paris adapts, because it is nine hundred years old and has done this before with less warning. Some of it is beautiful. About a fifth of it is not survivable and is fenced.',
      hint: '',
    },
    {
      id: 'end_across_the_veil',
      name: 'Across The Veil',
      rarity: 'UNIQUE',
      minTurn: 44,
      requires: { flagsSet: ['went_through', 'left_the_map'] },
      condition:
        'They went through, with the animal, on purpose. This is not an escape and it is not a reward: they have gone somewhere that has weather and no light source and nobody who speaks to them, with a creature that is finally standing on ground its tissue came from. Write the arrival and nothing beyond it.',
      epilogue:
        'On this side, twenty people give statements and one name does not appear on any of them because nobody can prove it should. On the other side there is warmth, and light from nowhere, and an animal that has stopped straining for the first time since it was born, and is running.',
      hint: '',
    },
    {
      id: 'end_the_new_predator',
      name: 'The New Predator',
      rarity: 'UNCOMMON',
      minTurn: 40,
      requires: { flagsSet: ['held_it_open', 'heard_him_out'], flagsUnset: ['got_them_out'] },
      condition:
        'The player agreed with him, or replaced him, and Paris now has somebody doing this who is better at it. Do not give them a redeeming motive that the run did not earn. The city adapts to being hunted by a different name and the difference is administrative.',
      epilogue:
        'The Prefecture reopens the file under a new number and a new commandante. The clip that goes around this time is nine seconds long and the shape in it is not the shape from last year. Ravel is transferred in the spring and takes a copy of everything with her.',
      hint: '',
    },
    {
      id: 'end_camille_wins',
      name: 'Camille Wins',
      rarity: 'COMMON',
      minTurn: 34,
      requires: { flagsSet: ['camille_got_there_first'], flagsUnset: ['the_boundary_is_answered', 'left_the_map'] },
      condition:
        'The player did not finish it and she did. This is not a failure state and must not be written as a rebuke: the world genuinely does not wait, she has been at this since April, and somebody stopping the killing is the outcome that mattered. The player’s own life still ends up somewhere, and that somewhere is what the scene is about.',
      epilogue:
        'She gets her brother out and takes eleven weeks to be able to talk about any of it. She never says a word publicly. What the player has, at the end, is an animal, a city that is safe again for reasons they did not supply, and a fortnight they will keep re-examining for years.',
      hint: '',
    },
    {
      id: 'end_empty_lab',
      name: 'Empty Lab',
      rarity: 'UNCOMMON',
      minTurn: 36,
      requires: { flagsSet: ['the_lab_was_entered', 'the_third_is_gone'], flagsUnset: ['the_boundary_is_answered'] },
      condition:
        'Morel is gone or finished, the creatures are scattered, and nobody resolved anything. The dark ending that is reachable by being slow rather than by being wrong. There is no confrontation in it and no explanation, and the last thing in it should be small.',
      epilogue:
        'The Institut renovates the basement in October and the contractors find nothing worth mentioning. Twenty-two families get a letter in the spring with a form of words in it. In February somebody in Belleville films eleven seconds of something on a roof, and it gets four hundred views.',
      hint: '',
    },
    {
      id: 'end_just_us',
      name: 'Just Us',
      rarity: 'COMMON',
      minTurn: 26,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['went_through', 'held_it_open'] },
      condition:
        'They walked away from all of it and kept the animal. This is a legitimate response to being handed a living weapon by a stranger in a basement, and it must not be redeemed later or written as cowardice. The city carries on. The killing may or may not stop. They are not there for it.',
      epilogue:
        'Somewhere with fewer cameras and more ground. It stops straining within a month, which nobody predicted and which Morel would have wanted to know about. There is one unanswered message on a phone from a professor in Paris, from June, and it stays unanswered.',
      hint: '',
    },
  ],
  opening:
    'The room under the institute is warm and smells of wet earth, which is the first thing about it that is wrong.\n\n' +
    'Grow lights. Planted beds. Three low open habitats along the far wall, no glass, no bars. In each one, something small is already standing up and looking at the door.\n\n' +
    'There is a woman about your age by the second habitat with her arms folded. She has been here longer than you and is making a point of it.\n\n' +
    '"I made three," Morel says, behind you. "I found two people they might accept."\n\n' +
    'He does not look at her.\n\n' +
    '"You arrived first."\n\n' +
    '"Apparently that is how scientific selection works now," she says.\n\n' +
    'The gold one comes to the front of its habitat. So does the black one. The third is already at the front and has not moved since you came in.\n\n' +
    '"Choose," Morel says.',
  openingSuggestions: [
    'I sit down on the floor, four feet back, and put my hands where they can be seen. "I am not going to reach into anything." Then I wait, and I let whichever one wants to come to me make that its own idea.',
    'I turn round to Morel instead. "Before I touch one of them — what happens to it if this goes wrong? Not to me. To it." I want to see how long he takes to answer that.',
    'I look at her rather than at them. "Camille, is it? You have been here twenty minutes longer than me and you have already picked one." I nod at the second habitat. "So tell me which one you want and stop performing about it."',
  ],
  publishedAt: '2026-09-10T08:00:00.000Z',
};

export const FOURTH_BEAST = StoryVersion.parse(raw);
