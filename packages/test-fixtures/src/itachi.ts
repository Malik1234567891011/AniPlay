import { StoryVersion } from '@aniplay/contracts';

/**
 * "Itachi" — one fortnight out of a life that took seventeen years.
 *
 * The bible spans age four to death and reanimation: 15,554 words, a hundred
 * numbered sections, and the whole of the Third Shinobi World War at one end
 * and the Fourth at the other. A `StoryVersion` has one clock, one set of
 * locations and one cast at one set of ages, so the authoring decision that
 * had to be made first was where the *playable* world starts and what the rest
 * of the life becomes.
 *
 * The playable world is the coup crisis. Thirteen years old, ANBU captain,
 * Shisui still alive, Sasuke seven and knowable, Fugaku and Mikoto both in the
 * house, Danzo active and killable, Hiruzen reachable with evidence, the
 * massacre not yet demanded of anybody. The bible itself says this is the best
 * phase for this product (§55) and that the massacre must not arrive fast
 * (§257), and every one of the ten alternate lifelines it names (§135) is a
 * decision that gets made inside this fortnight. Twelve days, and every famous
 * thing downstream of them is contingent on what happens here.
 *
 * Everything before it is memory. The battlefield at four is the archetype
 * choice — §8 asks for an "early war belief" stored at the start and read back
 * by Shisui, Fugaku, Danzo and Hiruzen later, which is exactly what a build
 * option is. The Academy, the genin team, Tenma, the Sharingan, ANBU entry and
 * Mukai are `knowledgeScope`, item lore and the things people bring up.
 *
 * Everything after it is endings. Akatsuki, the cloak, Kisame, the illness,
 * the hotel corridor, the final fight, Edo Tensei — those are what a
 * destination *means*, not a phase the player grinds through. "The Shadow"
 * carries nine canon years in its epilogue, which is the right amount of room
 * for a route this world exists to let you refuse.
 *
 * Four variables, all invisible. Reserve is the one honest GOOD_HIGH, because
 * `resolveRest` refills those and a world with none tells the player they slept
 * and changes nothing. Clan Pressure is first in the descending order on
 * purpose: the generic cost path and PUBLIC_VIOLENCE both take the first
 * GOOD_LOW in array order, and an Uchiha seen fighting in the street raising
 * the temperature of the Uchiha question is exactly the right thing for that
 * to hit.
 */

const raw = {
  id: 'sv_itachi_1',
  storyId: 'story_itachi',
  version: 1,
  title: 'Itachi',
  fantasyLabel: 'Both sides already think you are theirs.',
  hook: 'You are thirteen, you are the best shinobi your clan has produced in a generation, and in two weeks your father intends to take the village by force using everything you have told him.',
  premise:
    'You are thirteen. You are the best shinobi your clan has produced in a generation, and both sides of the argument tearing your village apart have already decided you belong to them.\n\n' +
    'Your father leads the clan. The clan is planning to take the village by force. Your handlers in the village’s secret service want to know when. You report to both, and neither of them knows you report to the other.\n\n' +
    'That was survivable while it was only politics. Now there is a date on it. Your father has stopped asking your opinion and started giving you assignments, and the old man who runs the village’s black operations has stopped pretending this ends in a negotiation.\n\n' +
    'You have a brother who is seven, who waits on the step every evening in case you come home early, and who does not know any of this is happening. You have a best friend who thinks he has found a way to stop it without anybody dying. You have about two weeks.\n\n' +
    'Nobody here is a villain. Your father is right that his clan has been treated as a suspect for ten years. The village is right that a coup would open the gates to three countries that have been waiting for one.\n\n' +
    'So you need to find something both of them can live with, or choose which one to betray, or find a third thing nobody has thought of yet.',
  creatorId: 'creator_official',
  creatorName: 'ANIMA Studio',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Rivalry', 'Military', 'Mystery', 'Coming of age', 'Tragedy'],
  mechanicsChips: [
    'Report to both sides',
    'Your brother can be told',
    'Nothing here is scheduled',
    'Evidence beats accusation',
    'Nobody is a villain',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'PSYCHOLOGICAL_THEMES', 'MORAL_AMBIGUITY', 'PERMANENT_DEATH'],
  intensity: 'INTENSE',
  creatorNote:
    'The famous version of this fortnight ends one way. This one does not have to. Save your friend, arrest four men instead of killing ninety, tell your brother the truth while he is still young enough to hear it, put the evidence on the Hokage’s desk, or walk out of the south gate with a seven-year-old and let all of them sort it out themselves. Every one of those is a real destination and none of them is easy.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'uchiha_house',
    startWorldMinute: 18 * 60 + 40,
    startingItems: [
      { itemId: 'anbu_mask', qty: 1 },
      { itemId: 'shuriken_pouch', qty: 1 },
    ],
    hardCanon: [
      'The player is Itachi Uchiha, thirteen, son of Fugaku and Mikoto, elder brother of Sasuke, and an ANBU captain.',
      'The clan has been under surveillance and political restriction since the Nine-Tails attack ten years ago, and the grievance is real.',
      'Fugaku is organising a coup and would prefer to take the village without killing anybody. That preference is sincere and it is not a guarantee.',
      'Danzo Shimura runs Root, answers to nobody, and believes preemption is cheaper than war. He is sometimes right about the risk and always wrong about the price.',
      'Hiruzen wants a negotiated settlement and has spent ten years being too slow. He can be moved by evidence and by nothing else.',
      'Shisui is alive at story start, is the player’s closest friend, and has a plan of his own. Nothing about his death is fixed.',
      'Sasuke is seven, adores his brother, and knows nothing. What he ends up believing is decided in play and never assumed.',
      'The massacre is a thing somebody could choose. It is not scheduled, it is not owed to anybody, and no replacement for it will be invented if the player prevents it.',
    ],
    toneGuide:
      'Serious anime drama with the political thriller kept concrete. Two meanings in every conversation: the clan asks what the Hokage said, the village asks what the clan is planning, and Sasuke asks whether you are coming home. ' +
      'Ordinary life is load-bearing — meals, the walk to the training posts, cleaning a mask, a teahouse, a seven-year-old counting his own throws. Spend time there, because the tragedy only works if the childhood exists. ' +
      'Nobody announces their villainy and nobody monologues about peace. Danzo talks in consequences, Fugaku talks about the clan as a body, Hiruzen hedges, and a thirteen-year-old is allowed to be thirteen even while being addressed as an equal by men four times his age. ' +
      'Fights are tactical and readable — clones, angles, terrain, what a Sharingan actually lets you see — never a blur of motion. Genjutsu always distinguishes what was perceived from what physically happened. Do not write hindsight into a scene that has not earned it.',
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 9, agility: 14, mind: 17, presence: 12, resolve: 15, arcana: 15 },
  skills: [
    { id: 'shuriken', name: 'Shurikenjutsu', attribute: 'agility', description: 'Angles, ricochets, and hitting the thing behind the thing you appeared to be aiming at.' },
    { id: 'genjutsu', name: 'Genjutsu', attribute: 'arcana', description: 'Putting something in somebody else’s head that was never in the room.' },
    { id: 'tactics', name: 'Tactics', attribute: 'mind', description: 'Reading a room, a rooftop or a clan meeting for what is about to happen in it.' },
    { id: 'tradecraft', name: 'Tradecraft', attribute: 'mind', description: 'Dead drops, tails, filed reports, and which of the three men behind you is the one who matters.' },
    { id: 'plain_speech', name: 'Plain Speech', attribute: 'resolve', description: 'Saying the true thing to somebody it is going to hurt, while there is still time for it to help.' },
    { id: 'bearing', name: 'Bearing', attribute: 'presence', description: 'Being believed by a room of adults who outrank you and have decided what you are for.' },
    { id: 'taijutsu', name: 'Taijutsu', attribute: 'might', description: 'Close work, done small and fast because you are thirteen and everybody else is not.' },
  ],
  /**
   * Four, all invisible.
   *
   * Reserve is the only GOOD_HIGH and it is deliberate: `resolveRest` refills
   * every ascending-good resource, so a world with none prints "you rest, and
   * recover" and emits nothing, and a world whose only one is a relationship
   * meter repairs a friendship with a nap. Reserve is chakra, sleep, and how
   * much of a thirteen-year-old is left at the end of a day with two jobs in
   * it. It is also what the generic cost path spends, which is right — the
   * price of an unpriced exchange here is that you have less of tonight.
   *
   * Clan Pressure is first among the descending three because the generic
   * fallback and PUBLIC_VIOLENCE both take `resources.find(GOOD_LOW)` in array
   * order. An Uchiha seen fighting in the street raising the temperature of the
   * Uchiha question is exactly what should absorb that.
   *
   * Silence is the one this world is actually about: not how much he hides,
   * but how much he has decided on other people's behalf. It falls on its own
   * as things get said and days go by, and it rises every time he handles
   * something quietly that somebody else had a right to be asked about.
   */
  resources: [
    {
      id: 'reserve',
      name: 'Reserve',
      max: 100,
      start: 74,
      regenPerHour: 2.5,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'He is running on the last of it and it shows to exactly the people he most wants it hidden from. Mikoto stops asking and starts putting food in front of him. Shisui stops joking. Sasuke, who is seven, notices before either of them and does not know what he is noticing.',
      color: '#6E8FB5',
      bands: [
        {
          upTo: 22,
          behaviour:
            'Everything costs twice. He is slow to the second meaning of a sentence, which in this fortnight is the only meaning that matters, and he agrees to things because agreeing ends the conversation. This is the band where a clan meeting goes badly for reasons nobody can point at afterwards, and where sleeping is genuinely the strongest move available.',
        },
        {
          upTo: 58,
          behaviour:
            'The ordinary exhaustion of two jobs and a family. Good for one more errand and honest about not wanting two. He can still read a room; he can no longer read a room and be pleasant in it at the same time, and people who know him well can tell which one he chose.',
        },
        {
          upTo: 100,
          behaviour:
            'There is enough of him left to do this properly. He can hold a conversation on three levels, throw well, and say a hard thing in the shape that will actually land rather than the shape that gets it said. Scenes can be long, and can go somewhere neither person planned.',
        },
      ],
    },
    {
      id: 'clan_pressure',
      name: 'Clan Pressure',
      max: 100,
      start: 46,
      regenPerHour: 0.25,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The whole thing has gone back to being an argument between adults about representation on a council. Meetings are badly attended. Somebody has started a petition, which is the least dangerous thing this clan has done in ten years.',
      color: '#B0453C',
      bands: [
        {
          upTo: 30,
          behaviour:
            'Grievance without a plan. The men under the seventh mat are angry and have been angry for a decade, and the meetings are about dignity and the Police budget rather than about a date. Fugaku still believes he can get what the clan needs by being owed things. Nobody has counted the shinobi in the room lately.',
        },
        {
          upTo: 62,
          behaviour:
            'Organised. There is a plan, there are assignments, and there is a shortlist of who holds which gate. Radicals speak first at meetings now and the moderates have stopped correcting them out loud. The village has noticed the district has gone quiet, which is worse than noticing it was loud.',
        },
        {
          upTo: 85,
          behaviour:
            'Everybody involved believes time is against them, which is the condition under which people do the thing they have been talking about. Fugaku moves operationally unless something interrupts him. The village’s own hard men start arguing that waiting is now the expensive option, and one of them is persuasive.',
        },
        {
          upTo: 100,
          behaviour:
            'Two organisations are each certain the other is about to move first, and both are right. Ordinary people in the district are packing quietly. Whatever happens in the next few days happens fast, badly, and to more people than either side intended, and nobody in it will be able to say afterwards who started.',
        },
      ],
    },
    {
      id: 'silence',
      name: 'Silence',
      max: 100,
      start: 30,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'He is running nothing past nobody, which is the strangest version of him this world has. Shisui gets told things before they are decided. Mikoto is asked her opinion and takes a moment to recover from being asked. Sasuke knows roughly where his brother goes in the evenings, and it has made him less frightened rather than more.',
      color: '#4C4655',
      bands: [
        {
          upTo: 25,
          behaviour:
            'He is still a person who consults people. Decisions arrive at the table half-formed and get changed by what somebody says, and the people who love him can tell what he is thinking within about a day of him thinking it. Scenes can be conversations rather than manoeuvres.',
        },
        {
          upTo: 55,
          behaviour:
            'He has begun editing. Not lying — selecting, which he would say is different and which nobody on the receiving end experiences as different. Shisui notices first and says so once, lightly. Mikoto notices second and does not say so at all, which is how she says it.',
        },
        {
          upTo: 80,
          behaviour:
            'He is deciding for people. Who needs protecting from what, who is better off not knowing, whose choice this actually is — all of it settled privately and none of it shared. The people around him have started managing a version of him rather than talking to him, and they are getting good at it.',
        },
        {
          upTo: 100,
          behaviour:
            'Nobody gets a vote any more, including the people it is being done for. He is kind, present, entirely unreachable, and about to arrange something enormous on the grounds that nobody else could be asked to carry it. Anyone who tries to share the weight is handled rather than heard.',
        },
      ],
    },
    {
      id: 'leverage',
      name: 'Leverage',
      max: 100,
      start: 18,
      regenPerHour: 0,
      polarity: 'GOOD_LOW',
      displayPriority: 4,
      visible: false,
      zeroStateConsequence:
        'Root has an interested file and nothing in it. Danzo can request and cannot instruct, and when he frames something as the only remaining option there is visibly a second one standing next to it.',
      color: '#6B6152',
      bands: [
        {
          upTo: 30,
          behaviour:
            'He is a promising asset who has done nothing compromising. Danzo courts rather than directs: praise for maturity, moral problems posed as conversation, an open door and no debt behind it. Refusing costs an evening and no more than that.',
        },
        {
          upTo: 65,
          behaviour:
            'There is a paper trail now. Requisitions signed, a channel used, at least one report that went to Root before it went to the Hokage. Danzo phrases things as reminders. Refusing is still possible and is no longer free, and both of them know which of those two facts is doing the work.',
        },
        {
          upTo: 100,
          behaviour:
            'He can be told. Not asked — told, with the consequences of refusal laid out flat and accurately, because Danzo does not bluff when he does not have to. Anything the player wants from anybody else in the village now has to route around a man who can end their career in an afternoon.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'anbu_mask',
      name: 'The Mask',
      tags: ['quest', 'anbu'],
      questItem: true,
      droppable: false,
      description: 'Painted ceramic, a weasel, sized for a face that is still growing and already refitted once. It lives in the bottom of a school satchel, under a folded jacket, four rooms from where his brother sleeps.',
      loreText: 'The paint on the inside of the chin is worn through to the clay. That is where a thumb goes when somebody is deciding whether to put it on.',
      icon: 'mask',
    },
    {
      id: 'shuriken_pouch',
      name: 'The Pouch',
      tags: ['weapon'],
      stackable: false,
      skillModifiers: { shuriken: 1 },
      description: 'Twenty-two throwing blades, three lengths of wire, and a stone for the edges. Everything in it is arranged so it can be found in the dark, because most of it is used in the dark.',
      loreText: 'Four of the shuriken are blunt. They are the ones a seven-year-old is allowed to hold.',
      icon: 'shuriken',
    },
    {
      id: 'sasuke_shuriken',
      name: 'Sasuke’s Best One',
      tags: ['personal'],
      description: 'A blunted practice shuriken with a chip out of one point, which its owner believes makes it fly better and will explain why at length to anybody who stops moving.',
      loreText: 'He keeps it separate from the other three. He has been keeping it separate from the other three for eight months.',
      icon: 'shuriken',
    },
    {
      id: 'clan_jacket',
      name: 'The Jacket With The Crest',
      tags: ['clothing', 'clan'],
      equipSlot: 'body',
      attributeModifiers: { presence: 1 },
      description: 'High collar, clan fan across the back in white and red. Worn in the district it means you are one of them; worn in the village it means everybody adjusts what they were about to say.',
      loreText: 'Mikoto restitched the shoulder in spring. She did it while he was asleep at the table, which is the only way she gets to do anything for him lately.',
      icon: 'coat',
    },
    {
      id: 'shisui_note',
      name: 'The Note From The Crow',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'Half a sheet, folded to the size of a thumbnail, in a hand that writes fast and legibly. It gives a place, an hour, and one word that only two people alive would read as a warning.',
      loreText: 'The word is "early". It has been their word for four years and it has never once meant what it says.',
      icon: 'letter',
    },
    {
      id: 'root_ledger',
      name: 'The Surveillance Log',
      tags: ['quest', 'document', 'evidence'],
      questItem: true,
      skillModifiers: { tradecraft: 2 },
      description: 'Ten months of watch rotations on the Uchiha district, signed off by a chain of command that does not appear on any organisational chart the Hokage has seen. Names, hours, addresses. Sasuke’s school route is in it twice.',
      loreText: 'It is not a secret document. It is a routine one, which is the part that would end a career, because routine means somebody has been signing it for ten months without anybody asking who they report to.',
      icon: 'papers',
    },
    {
      id: 'kotoamatsukami_eye',
      name: 'The Eye',
      tags: ['quest', 'clan'],
      questItem: true,
      droppable: false,
      description: 'A friend’s right eye, kept alive in a sealed jar the size of an apple. It carries a technique that can change what somebody decides without their ever knowing a decision was changed.',
      loreText: 'It works once, and then not again for a decade. Whoever holds it has exactly one opportunity to overrule one person, and no way to take it back.',
      icon: 'orb',
    },
    {
      id: 'mikoto_bento',
      name: 'The Box She Packed',
      tags: ['food'],
      consumable: { resourceId: 'reserve', amount: 22, consumesItem: true },
      description: 'Kelp rice and pickled cabbage, in a lacquered box with a chip on the lid, packed at half past five for somebody who did not say he was leaving.',
      loreText: 'She packs one every morning whether or not there is anybody to give it to. Sasuke has worked this out and has not asked her about it.',
      icon: 'box',
    },
    {
      id: 'dango_skewer',
      name: 'Izumi’s Order',
      tags: ['food'],
      consumable: { resourceId: 'reserve', amount: 10, consumesItem: true },
      description: 'Three on a stick, bought for two people by one of them, in the confident manner of somebody who has been rehearsing buying them since yesterday.',
      loreText: 'She always orders four and eats one on the way, so that arriving with three looks like it was not planned.',
      icon: 'food',
    },
  ],
  abilities: [
    {
      id: 'see_it_coming',
      name: 'See It Coming',
      tags: ['sight'],
      description: 'Slow a room down to the speed of its tells: whose hands moved first, who looked at whom before speaking, which of the six men here has already agreed to something.',
      affordances: ['look', 'watch them', 'read the room', 'observe', 'study him', 'see what is happening', 'check the room', 'sharingan'],
      costs: [{ resourceId: 'reserve', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'tactics', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'the_line',
      name: 'The Line',
      tags: ['offensive'],
      description: 'Four blades on four angles, thrown so that the one that matters arrives from a direction nobody was defending. Works on people and on the rope holding a door shut.',
      affordances: ['throw', 'shuriken', 'attack', 'fight', 'strike', 'draw on him', 'take him down', 'cut it'],
      costs: [{ resourceId: 'reserve', amount: 9 }],
      cooldownMinutes: 0,
      targetRule: 'MULTI',
      check: { attribute: 'agility', skillId: 'shuriken', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'send_a_crow',
      name: 'Send a Crow',
      tags: ['utility'],
      description: 'Put four words somewhere they will be found by one person and mean nothing to anybody else who reads them.',
      affordances: ['send a crow', 'send word', 'warn him', 'get a message to', 'write to', 'tell them to meet me', 'signal'],
      costs: [{ resourceId: 'reserve', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'say_the_whole_thing',
      name: 'Say the Whole Thing',
      tags: ['social'],
      description: 'Tell somebody the part you have been leaving out, at the point where they can still do something about it, and stay in the room for what comes back.',
      affordances: ['tell him', 'tell her', 'tell the truth', 'be honest', 'confess', 'say it', 'explain', 'come clean', 'ask him straight'],
      costs: [{ resourceId: 'reserve', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'plain_speech', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'handle_it_yourself',
      name: 'Handle It Yourself',
      tags: ['utility'],
      description: 'Decide it on somebody else’s behalf, do the part that needs doing, and do not mention it. Nothing about this fails. That is the problem with it.',
      affordances: ['handle it', 'deal with it myself', 'say nothing', 'keep it to myself', 'do not tell them', 'sort it out quietly', 'take care of it'],
      costs: [
        { resourceId: 'reserve', amount: 5 },
        { resourceId: 'silence', amount: 14 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'borrow_a_minute',
      name: 'Borrow a Minute',
      tags: ['social'],
      description: 'Put something in somebody’s head that was not in the room, or take a minute out of one, and let them go on with their evening.',
      affordances: ['genjutsu', 'illusion', 'make them forget', 'put him under', 'trick him', 'show him something', 'cloud his mind'],
      costs: [
        { resourceId: 'reserve', amount: 10 },
        { resourceId: 'silence', amount: 8 },
      ],
      cooldownMinutes: 45,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'genjutsu', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'give_them_the_report',
      name: 'Give Them the Report',
      tags: ['social'],
      description: 'Hand the clan what the village told you this week. Every word of it true, and every word of it worth a week of planning to the men under the seventh mat.',
      affordances: ['tell the clan', 'report to father', 'give them the intelligence', 'tell them what i know', 'brief the clan', 'hand it over'],
      costs: [
        { resourceId: 'reserve', amount: 5 },
        { resourceId: 'clan_pressure', amount: 12 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'use_roots_door',
      name: 'Use Root’s Door',
      tags: ['utility'],
      description: 'Take the channel that does not go through the Hokage’s office, and accept that using it is itself a thing that will be remembered about you.',
      affordances: ['go to danzo', 'use the channel', 'file it with root', 'take it to root', 'ask danzo', 'use his people'],
      costs: [
        { resourceId: 'reserve', amount: 6 },
        { resourceId: 'leverage', amount: 15 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['danzo_made_contact'],
        lockedCopy: 'There is no door. There is a man you have been in a room with twice, who has been extremely polite to you both times, and who has not yet asked you for anything.',
      },
    },
    {
      id: 'an_hour_at_the_posts',
      name: 'An Hour at the Posts',
      tags: ['social'],
      description: 'Stand behind a seven-year-old and correct his grip until he stops being angry about it, which takes about forty minutes and works every time.',
      affordances: ['train sasuke', 'teach him', 'train with him', 'go to the posts', 'practise with sasuke', 'help him throw', 'spend time with sasuke'],
      costs: [{ resourceId: 'reserve', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'follow_the_paper',
      name: 'Follow the Paper',
      tags: ['sight'],
      description: 'Read a requisition for who signed it, a rota for who is missing from it, and a filed report for the sentence somebody removed before filing.',
      affordances: ['check the records', 'look at the files', 'follow the paperwork', 'search the office', 'read the reports', 'find the evidence', 'look into it'],
      costs: [{ resourceId: 'reserve', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'tradecraft', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'tsukuyomi',
      name: 'Tsukuyomi',
      tags: ['offensive'],
      description: 'Hold somebody inside a second of your choosing for as long as you want them there. It works on anyone, it costs the eye that does it, and there is no version of using it that is not a decision about somebody’s mind.',
      affordances: ['tsukuyomi', 'use the mangekyo', 'put him in it', 'break him', 'show him', 'hold him there'],
      costs: [
        { resourceId: 'reserve', amount: 22 },
        { resourceId: 'silence', amount: 18 },
      ],
      cooldownMinutes: 2880,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'genjutsu', baseDc: 17 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:mangekyo'],
        lockedCopy: 'Whatever is behind that is behind a night that has not happened to you yet, and you would not want it at the price it is sold at.',
      },
    },
  ],
  locations: [
    {
      id: 'uchiha_house',
      name: 'The House On The Corner',
      shortName: 'Home',
      description:
        'Four rooms, a stove that needs coaxing, and a step at the front that gets the last of the sun. Two pairs of sandals by the door and a third pair that is often not there. The clan fan is painted above the lintel, which every house on this street has, and which nobody on any other street does.',
      artDirection:
        'Traditional Japanese clan house interior at dusk, low table, warm lamp, a stove with steam, sliding doors open onto a stone step and a narrow street, a painted red-and-white fan crest above the door frame. Lived-in, warm, slightly too quiet.',
      connections: [{ to: 'uchiha_street', travelMinutes: 2, label: 'Out to the street' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'clan_jacket', qty: 1, ownerId: null, aka: ['jacket', 'my jacket', 'the crest', 'the coat'] },
        { itemId: 'mikoto_bento', qty: 1, ownerId: 'mikoto', aka: ['box', 'lunch', 'the bento', 'food'] },
        { itemId: 'sasuke_shuriken', qty: 1, ownerId: 'sasuke', aka: ['his shuriken', 'the blunt one', 'sasuke’s shuriken', 'the chipped one'] },
      ],
    },
    {
      id: 'uchiha_street',
      name: 'The District',
      shortName: 'District',
      description:
        'Nine streets of clan houses behind a wall that was built to keep something out and now mostly keeps this lot in. A greengrocer, two tea places, a shrine at the end, and a police post that the clan staffs and the village does not visit. People here know exactly who you are and what your father is planning, and greet you in the street about it.',
      artDirection:
        'Narrow traditional district street in the evening, wooden houses with red-and-white fan crests, lanterns coming on, a low perimeter wall, a few figures talking in a doorway and stopping when someone passes. Insular, handsome, watched.',
      connections: [
        { to: 'uchiha_house', travelMinutes: 2, label: 'Back to the house' },
        { to: 'naka_shrine', travelMinutes: 5, label: 'Down to the shrine' },
        { to: 'police_headquarters', travelMinutes: 4, label: 'The police building' },
        { to: 'susuki_teahouse', travelMinutes: 3, label: 'The tea place on the corner' },
        { to: 'training_ground', travelMinutes: 7, label: 'Out to the posts' },
        { to: 'the_rooftops', travelMinutes: 6, label: 'Up and over the wall' },
        { to: 'izumi_home', travelMinutes: 2, label: 'The fourth street' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'naka_shrine',
      name: 'The Shrine By The River',
      shortName: 'Shrine',
      description:
        'A small unstaffed shrine with seven tatami mats in its back room. Under the seventh is a stair, and under the stair is a stone hall the clan has used for its own business since before the village existed. Thirty men fit in it. Lately about forty come.',
      artDirection:
        'Small dark wooden shrine at night, a back room with tatami, one mat lifted onto a stone stair descending into lamplight, carved stone walls below with a fan motif. Secretive, old, cold.',
      connections: [
        { to: 'uchiha_street', travelMinutes: 5, label: 'Back up into the district' },
        { to: 'nakano_cliff', travelMinutes: 6, label: 'Along the river to the cliff' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'police_headquarters',
      name: 'The Police Building',
      shortName: 'Police',
      description:
        'Three floors, a duty desk, and an entire institution staffed almost exclusively by one family, which is either an honour or a containment depending on which of them you ask. Your father’s office is on the top floor and its window looks at the Hokage’s.',
      artDirection:
        'Institutional wooden building interior, duty desk with a fan-crest emblem, corridors of filing, an upper office with a wide window looking across village rooftops toward a red-roofed tower. Official, proud, slightly under-resourced.',
      connections: [
        { to: 'uchiha_street', travelMinutes: 4, label: 'Back into the district' },
        { to: 'the_rooftops', travelMinutes: 5, label: 'Out the top and across' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'training_ground',
      name: 'The Posts',
      shortName: 'Posts',
      description:
        'Three wooden posts in a clearing with a river behind them, scarred to the height a child can reach and again at the height an adult can. Somebody has cut a notch in the middle post at four feet, and somebody smaller has been measuring himself against it.',
      artDirection:
        'Forest clearing with three weathered training posts, deep target scarring, a river beyond through trees, low afternoon light, scattered practice shuriken in the dirt. Green, ordinary, a place people go to be alone.',
      connections: [
        { to: 'uchiha_street', travelMinutes: 7, label: 'Back to the district' },
        { to: 'the_rooftops', travelMinutes: 6, label: 'In toward the village' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'izumi_home',
      name: 'The House On The Fourth Street',
      shortName: 'Fourth Street',
      description:
        'Two rooms and a yard the width of a door, kept by a woman who has been on her own in it for nine years and a daughter who has started coming home the long way round. There is a shinobi register photograph on the shelf and nothing else on the shelf.',
      artDirection:
        'Small modest clan house interior at night, two rooms, a single framed photograph on an otherwise bare shelf, a narrow yard through an open door, one lamp. Quiet, tidy, under-furnished.',
      connections: [{ to: 'uchiha_street', travelMinutes: 2, label: 'Back onto the fourth street' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [],
    },
    {
      id: 'susuki_teahouse',
      name: 'The Tea Place',
      shortName: 'Teahouse',
      description:
        'Six seats and a counter, run by an old woman who has fed three generations of this clan and has opinions about all of them. The seat at the end by the window is the one where you can see who comes in and nobody can see you deciding whether to stay.',
      artDirection:
        'Tiny traditional teahouse, six stools at a wooden counter, steam, a window onto a narrow street, an elderly proprietor, skewers on a plate. Warm, cramped, safe.',
      connections: [{ to: 'uchiha_street', travelMinutes: 3, label: 'Back onto the street' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'dango_skewer', qty: 1, ownerId: 'izumi', aka: ['dango', 'sweets', 'the skewer', 'the food'] },
      ],
    },
    {
      id: 'the_rooftops',
      name: 'The Roofs',
      shortName: 'Roofs',
      description:
        'The fastest way across this village and the only part of it where nobody is on a schedule. Water towers, drying laundry, and a run of tiled ridges from the district wall to the tower with the fire mark on it. Two people who do not want to be seen meeting can meet up here and be visible to nobody but each other.',
      artDirection:
        'Village rooftops at night, tiled ridges, water towers, laundry lines, lit windows below, a great carved stone mountain face in the distance under a large moon. Open, high, private.',
      connections: [
        { to: 'uchiha_street', travelMinutes: 6, label: 'Down into the district' },
        { to: 'police_headquarters', travelMinutes: 5, label: 'Down into the police building' },
        { to: 'training_ground', travelMinutes: 6, label: 'Out to the posts' },
        { to: 'the_academy', travelMinutes: 5, label: 'Down by the school' },
        { to: 'anbu_ready_room', travelMinutes: 7, label: 'The stair under the tower' },
        { to: 'hokage_office', travelMinutes: 6, label: 'The tower itself' },
        { to: 'nakano_cliff', travelMinutes: 9, label: 'Out along the river' },
        { to: 'village_gate', travelMinutes: 10, label: 'Down to the south gate' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_academy',
      name: 'The School',
      shortName: 'School',
      description:
        'A low building with a yard, a swing, and a wall of graduation photographs going back forty years. Yours is in the fourth row and the class either side of it is two heads taller. Your brother’s class comes out at four and he is usually last, because he stays to throw.',
      artDirection:
        'Village academy building and dirt yard, wooden swing under a tree, a wall of framed class photographs inside a corridor, small children leaving in groups. Ordinary, bright, slightly nostalgic.',
      connections: [{ to: 'the_rooftops', travelMinutes: 5, label: 'Up and away' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 0 },
      takeableItems: [],
    },
    {
      id: 'anbu_ready_room',
      name: 'The Ready Room',
      shortName: 'Ready Room',
      description:
        'Underneath the tower: benches, a rack of masks, a board of assignments written in a hand that changes every three weeks, and a rule that nobody uses a name in here. It is the only room in the village where being thirteen has never once come up.',
      artDirection:
        'Underground stone ready room, benches, a wall rack of painted animal masks, an assignment board, low harsh lighting, cloaked figures not looking at each other. Utilitarian, quiet, cold.',
      connections: [
        { to: 'the_rooftops', travelMinutes: 7, label: 'Up and out' },
        { to: 'hokage_office', travelMinutes: 3, label: 'The internal stair' },
        { to: 'root_chamber', travelMinutes: 4, lockedByFlag: 'knows:root_entrance', label: 'The corridor that is not on the plan' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: -1 },
      takeableItems: [],
    },
    {
      id: 'hokage_office',
      name: 'The Tower Office',
      shortName: 'Tower',
      description:
        'A round room at the top of the tower with too much paper in it and a window that looks at the whole village at once, which is either the point of the job or the trap in it. The old man who works here has been putting off one decision for ten years and has become very good at the postponement.',
      artDirection:
        'Round wooden office at the top of a tower, wide window over a village at dusk, stacked scrolls and paperwork, a low desk, a pipe resting on a tray. Warm, cluttered, tired.',
      connections: [
        { to: 'the_rooftops', travelMinutes: 6, label: 'Out the window and across' },
        { to: 'anbu_ready_room', travelMinutes: 3, label: 'Down the internal stair' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 3, y: -1 },
      takeableItems: [],
    },
    {
      id: 'root_chamber',
      name: 'The Room Under The Village',
      shortName: 'Root',
      description:
        'Stone, dry air, and a table with one chair on the far side of it. There is no board of assignments here because nothing here is written down where two people could read it. Everybody in this corridor has a seal on their tongue and none of them has said a word since you came in.',
      artDirection:
        'Deep stone chamber lit by a single low lamp, a bare table with one chair opposite, masked figures standing motionless along the walls, no windows and no signage. Airless, formal, frightening in an administrative way.',
      connections: [{ to: 'anbu_ready_room', travelMinutes: 4, label: 'Back up the corridor' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: -2 },
      takeableItems: [
        { itemId: 'root_ledger', qty: 1, ownerId: 'danzo', aka: ['the log', 'the ledger', 'the rota', 'the surveillance records', 'the file'] },
      ],
    },
    {
      id: 'nakano_cliff',
      name: 'The Cliff Over The River',
      shortName: 'Cliff',
      description:
        'Where the river turns and the rock stands out over it. Two children from this clan used to come here to argue about whether the village was worth what it asked of them, and they have never once agreed and have never once stopped coming.',
      artDirection:
        'High rock outcrop over a wide river at night, moonlight on water, a single figure standing at the edge, forest behind, village lights very far off. Beautiful, exposed, final-feeling.',
      connections: [
        { to: 'the_rooftops', travelMinutes: 9, label: 'Back in toward the village' },
        { to: 'naka_shrine', travelMinutes: 6, label: 'Along the river to the shrine' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 2 },
      takeableItems: [],
    },
    {
      id: 'village_gate',
      name: 'The South Gate',
      shortName: 'Gate',
      description:
        'Two enormous wooden doors, a booth with two chunin in it who are bored and thorough in that order, and the road out. Anybody may leave. Whether anybody may come back is a separate question that the booth is not authorised to answer.',
      artDirection:
        'Huge wooden village gates from inside at dawn, a small guard booth with a register, a dirt road leading out between trees, mist. Monumental and mundane at the same time.',
      connections: [{ to: 'the_rooftops', travelMinutes: 10, label: 'Back up into the village' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_konoha',
      name: 'The Village’s Leadership',
      description: 'The Hokage’s office, the council of elders, and the Black Ops who answer to the tower. They have had ten years to settle the clan question by talking and have used all of them.',
      startingReputation: 40,
      ranks: [
        { atReputation: 0, label: 'On the roll' },
        { atReputation: 35, label: 'Trusted with the room' },
        { atReputation: 65, label: 'Asked before it is decided' },
      ],
      allies: [],
      enemies: ['faction_uchiha'],
    },
    {
      id: 'faction_uchiha',
      name: 'The Clan',
      description: 'Forty-odd households behind one wall, a police force nobody lets police anything, and a decade of being suspected of something they did not do. Some of them want dignity. Some of them want the village.',
      startingReputation: 55,
      ranks: [
        { atReputation: 0, label: 'Born to it' },
        { atReputation: 40, label: 'The clan’s own' },
        { atReputation: 70, label: 'Spoken of as the next one' },
      ],
      allies: [],
      enemies: ['faction_konoha'],
    },
    {
      id: 'faction_root',
      name: 'Root',
      description: 'An organisation that does not appear on any chart, staffed by people whose names have been taken off things, run by one man who is certain that somebody has to do this and equally certain that it has to be him.',
      startingReputation: 15,
      ranks: [
        { atReputation: 0, label: 'A file' },
        { atReputation: 35, label: 'An asset' },
        { atReputation: 70, label: 'One of his' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'sasuke',
      name: 'Sasuke Uchiha',
      role: 'Your brother, seven years old, and the only person in this village who wants nothing from you except your time',
      cardBlurb:
        'He is seven, he has been on the step for two hours because you said maybe today, and everything that is about to happen to this family will be explained to him by somebody. You get to decide whether that somebody is you.',
      pronouns: 'he/him',
      publicTraits: ['Loud about small victories', 'Cannot let a comparison go', 'Follows people at a distance he thinks is undetectable'],
      hiddenDrives: [
        'He wants to be looked at while he does something well, once, by the one person whose opinion counts',
        'He has started measuring how long his brother stays rather than whether he comes, and has not told anybody he is doing it',
      ],
      values: [
        'Being told the real answer instead of the one for children',
        'Finishing a thing he said he would finish, even badly, in front of a witness',
      ],
      fears: [
        'That being good at this is the only way to get anybody in this house to look up',
        'That there is something wrong at home and everybody has agreed he is too small to be told',
      ],
      socialStyle:
        'Talks at you rather than to you, in bursts, while doing something else with his hands. Goes silent for exactly as long as it takes to work out whether he is being humoured.',
      boundaries: [
        'Will not be handed a consolation. Praise him for something he knows was bad and he stops showing you things',
        'Will not be sent to bed during a conversation he can hear the edges of',
      ],
      goals: [
        'Get an hour at the posts with his brother, properly, with corrections',
        'Find out why the grown-ups in this house stop talking when he comes in',
      ],
      secrets: [
        {
          id: 'sasuke_follows_you',
          fact: 'He has followed his brother three times as far as the shrine steps and turned back each time, and he has worked out that the meetings happen on the nights the house eats early.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He gives it up on his own the first time somebody asks him a real question about the family instead of about school.',
        },
        {
          id: 'sasuke_kept_the_shuriken',
          fact: 'The chipped shuriken is the one his brother threw with him on the single afternoon last winter that neither of them has mentioned since. He keeps it separate from the other three.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He will explain the chip, at length and unprompted, to anybody who picks that one up instead of one of the others.',
        },
      ],
      speechStyle:
        'Short flat sentences, one clause each, delivered while looking somewhere else. Repeats the important one twice with a beat between. Counts things out loud as evidence. Says nii-san when he wants something and uses no name at all when he is hurt.',
      topics: ['the posts', 'his throwing', 'school', 'father', 'the shrine', 'when you are coming home', 'the chipped shuriken'],
      voiceSamples: [
        'Nine. In a row. On the middle post, which is the hard one, and you were not even at the window.',
        'You said maybe today. You said maybe.',
        'It was dark when he got back and then it was dark again. Everyone in this house stops talking when I come in. Everyone stops.',
        'It is fine. Go. It is fine, I said.',
      ],
      appearance:
        'Seven, small for it, dark hair that will not lie flat at the back, an academy shirt with the clan fan on the shoulder, and a permanent graze on one knee.',
      visualHook: 'Four practice shuriken laid out in the dirt in a row, arranged by how good the throw was.',
      silhouette: 'Small, arms crossed, planted, chin up at somebody a foot and a half taller.',
      artSeed: 'itachi-sasuke-01',
      portrait: null,
      expressions: ['neutral', 'eager', 'sulking', 'delighted', 'frightened'],
      schedule: [
        { startMinute: 0, endMinute: 390, locationId: 'uchiha_house', activity: 'asleep, and waking twice' },
        { startMinute: 390, endMinute: 480, locationId: 'uchiha_house', activity: 'breakfast, talking through it' },
        { startMinute: 480, endMinute: 960, locationId: 'the_academy', activity: 'school, and staying after to throw' },
        { startMinute: 960, endMinute: 1080, locationId: 'training_ground', activity: 'at the posts on his own, badly' },
        { startMinute: 1080, endMinute: 1290, locationId: 'uchiha_house', activity: 'on the step, waiting, pretending not to be' },
        { startMinute: 1290, endMinute: 1440, locationId: 'uchiha_house', activity: 'sent to bed, awake' },
      ],
      homeLocationId: 'uchiha_house',
      knowledgeScope: ['sasuke', 'uchiha_house', 'the_academy', 'training_ground', 'family_routine', 'uchiha_street'],
      startingRelationship: { trust: 70, affection: 85, respect: 80, fear: 0, rivalry: 15 },
      gates: [
        {
          id: 'sasuke_tells_you_what_he_saw',
          label: 'He tells you what he has been following',
          kind: 'TRUST',
          requires: { trust: 75, flagsSet: ['spoke:sasuke'] },
        },
        {
          id: 'sasuke_can_be_told',
          label: 'He can be told something real and hold it',
          kind: 'TRUST',
          requires: { trust: 82, affection: 80 },
        },
      ],
      attributes: { might: 6, agility: 9, mind: 11, presence: 9, resolve: 12, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'shisui',
      name: 'Shisui Uchiha',
      role: 'Your closest friend, four years older, and the only person alive who talks to you as though you are a person rather than an instrument',
      cardBlurb:
        'He is the one who notices when you have started carrying something alone, and says so, lightly, and then does not laugh at the end of it. He has a plan to stop the coup without anybody dying, and he intends to pay for it himself.',
      pronouns: 'he/him',
      publicTraits: ['Arrives early and pretends he did not', 'Turns a serious thing into a joke and then finishes the serious thing anyway', 'Popular in a clan that does not do popular'],
      hiddenDrives: [
        'He wants to be the one who solves this so that his friend does not have to, and has not examined why that matters so much to him',
        'He would rather be remembered as somebody who overreached than as somebody who watched carefully and did nothing',
      ],
      values: [
        'Peace that does not require anybody to be a hero about it',
        'Being straight with the people you are about to inconvenience',
      ],
      fears: [
        'That the only tool he has left is one that takes the choice away from the person he uses it on',
        'That his friend has already stopped telling him things and is being warm about it',
      ],
      socialStyle:
        'Talks in "we" by default, even about things only one of you is doing. Sits down next to people rather than opposite them. Says the difficult sentence quickly, at normal volume, and then waits.',
      boundaries: [
        'Will not be thanked for something he has not done yet',
        'Will not let a friend take a decision on his behalf, and will say so the first time, once, clearly',
      ],
      goals: [
        'Stop the coup in a way that leaves forty households alive and nobody in a cell',
        'Get his friend to hand him half of whatever he has been carrying since spring',
      ],
      secrets: [
        {
          id: 'shisui_the_eye',
          fact: 'His right eye holds a technique that can change what somebody decides without their knowing a decision was changed, and it can only be used once a decade.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you himself, on the roofs at night, the first time you go and find him instead of waiting for a crow.',
        },
        {
          id: 'shisui_already_asked',
          fact: 'He has already taken the plan to Danzo once, believing that going through the proper channel first was the honourable thing, and Danzo listened very carefully.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He mentions it as an aside, cheerfully, as evidence that he is being sensible, to somebody who has just asked him who else knows.',
        },
      ],
      speechStyle:
        'Fast, warm, plural. Interrupts himself to check you are still with him. Undercuts the serious line with a small joke placed immediately after it, and then leaves the joke unlaughed-at so that the line stands. Uses your name at the start of a sentence when he means it.',
      topics: ['the coup', 'his plan', 'the eye', 'Danzo', 'your father', 'the roofs', 'what the village is for'],
      voiceSamples: [
        'Itachi. Sit down before you tell me the thing you came here to tell me, because you have got the face.',
        'We have got about eleven days and two good ideas between us, and one of the ideas is mine, so really we have got about one.',
        'I took it to the old man in the bandages first. Properly, through the door, like a citizen. You are pulling a face. I am aware of the face.',
        'You have started deciding things about me. Do not do that. I would notice, and then I would have to be gracious about it, and I am bad at gracious.',
      ],
      appearance:
        'Seventeen, curling black hair, an easy stance, standard flak vest worn open, and a way of being wherever he was going before you saw him move.',
      visualHook: 'He is always somewhere slightly higher than the person he is talking to, and never seems to have climbed.',
      silhouette: 'Perched, elbows on knees, one heel hooked over an edge.',
      artSeed: 'itachi-shisui-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'serious', 'tired', 'hurt'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'the_rooftops', activity: 'up on a water tower, which is what he does instead' },
        { startMinute: 300, endMinute: 420, locationId: 'uchiha_street', activity: 'the district, being greeted by everybody' },
        { startMinute: 420, endMinute: 720, locationId: 'anbu_ready_room', activity: 'duty, and reading the assignment board twice' },
        { startMinute: 720, endMinute: 1020, locationId: 'training_ground', activity: 'at the posts, mostly waiting for somebody' },
        { startMinute: 1020, endMinute: 1440, locationId: 'the_rooftops', activity: 'up on the roofs, where he can be found' },
      ],
      homeLocationId: 'the_rooftops',
      knowledgeScope: ['shisui', 'the_rooftops', 'the_coup', 'kotoamatsukami', 'danzo', 'anbu', 'uchiha_street', 'nakano_cliff'],
      startingRelationship: { trust: 80, affection: 75, respect: 85, fear: 0, rivalry: 5 },
      gates: [
        {
          id: 'shisui_tells_you_the_plan',
          label: 'He tells you what he is actually going to do',
          kind: 'TRUST',
          requires: { trust: 82, flagsSet: ['spoke:shisui'] },
        },
        {
          id: 'shisui_lets_you_carry_half',
          label: 'He will let you take half of it',
          kind: 'ALLIANCE',
          requires: { trust: 88, respect: 85, flagsSet: ['told_somebody_something'] },
        },
      ],
      attributes: { might: 13, agility: 17, mind: 15, presence: 15, resolve: 15, arcana: 17 },
      companion: null,
      scouting: null,
      combatant: { health: 70, defenseDc: 18, damage: 11, tags: ['sharingan', 'body-flicker'] },
    },
    {
      id: 'fugaku',
      name: 'Fugaku Uchiha',
      role: 'Your father, head of the clan, chief of the police the village will not let police anything, and the man organising the coup',
      cardBlurb:
        'He is proud of you in a way he has never once said out loud, he is using you as a channel into a government that stopped returning his letters, and he would still rather take this village without killing anybody. You are the only person who can still change his mind.',
      pronouns: 'he/him',
      publicTraits: ['Speaks last and briefly', 'Never repeats an instruction', 'Treats praise as a resource that spoils if spent'],
      hiddenDrives: [
        'He wants his son to choose the clan freely, and has arranged things so that choosing anything else looks like a betrayal, and does not see that he has done this',
        'He is frightened of the men he organised and is not certain he can call them off, and has told nobody',
      ],
      values: [
        'A clan that is owed something and can name what',
        'Doing the difficult thing in the proper order, with the paperwork, in front of witnesses',
      ],
      fears: [
        'That he has spent his elder son to buy the clan ten years of relevance',
        'That his own moderates are following him only until somebody louder offers them a date',
      ],
      socialStyle:
        'Addresses a room rather than a person. Gives a task instead of a compliment. Leaves a silence where another man would explain, and lets the other person fill it and hear how it sounds.',
      boundaries: [
        'Will not be argued with in front of the clan. In private he will listen for a surprisingly long time',
        'Will not discuss the clan’s business with anybody who has not accepted a share of the responsibility for it',
      ],
      goals: [
        'Get the clan a seat in the government of this village, by consent if the consent arrives in time',
        'Know, before he commits forty households, exactly where his elder son stands',
      ],
      secrets: [
        {
          id: 'fugaku_cannot_stop_them',
          fact: 'Yashiro and two others have their own timetable and have stopped consulting him. He discovered this eleven days ago and has been managing it alone since.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it only to somebody who has already shown him a piece of evidence he did not have, and only when they are not asking him to concede anything.',
        },
        {
          id: 'fugaku_wanted_you_out',
          fact: 'He put his son into the village’s Black Ops partly so that if the clan is destroyed there is one Uchiha the village has a reason to keep.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It surfaces in an argument about loyalty, said as an accusation against himself rather than a defence.',
        },
      ],
      speechStyle:
        'Declarative, unhurried, no wasted clause. Talks about the clan as a single body that acts and is acted on. Never asks a question he does not already have the answer to, so a genuine question from him is an event. Uses his son’s rank rather than his name when the subject is business.',
      topics: ['the clan', 'the coup', 'the police force', 'the village’s elders', 'your reports', 'your brother', 'the meetings'],
      voiceSamples: [
        'The clan has been patient for ten years. Patience that produces nothing is not a virtue, it is a habit.',
        'You will be under the seventh mat at eight. Bring what the tower gave you this week. All of it.',
        'Your brother asked me at dinner why you are never here. I told him you were working. That is the second time I have lied to a seven-year-old on your behalf.',
        'I would rather take this village without a single house burning. I have said so at every meeting. I am no longer confident that saying so is the same as arranging it.',
      ],
      appearance:
        'Early forties, hard-set face, hair to the jaw, a dark high-collared coat with the fan across the back that he wears indoors as well as out.',
      visualHook: 'The clan fan on his back, which he keeps turned toward the room when he leaves it.',
      silhouette: 'Squared shoulders, hands behind his back, standing when everybody else is kneeling.',
      artSeed: 'itachi-fugaku-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'proud', 'angry', 'uncertain'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'uchiha_house', activity: 'asleep, badly, having come in at two' },
        { startMinute: 360, endMinute: 480, locationId: 'uchiha_house', activity: 'the morning, reading, saying four sentences' },
        { startMinute: 480, endMinute: 1200, locationId: 'police_headquarters', activity: 'the office, and the men who come to it' },
        { startMinute: 1200, endMinute: 1330, locationId: 'naka_shrine', activity: 'under the seventh mat, chairing it' },
        { startMinute: 1330, endMinute: 1440, locationId: 'uchiha_house', activity: 'home late, checking a drawer' },
      ],
      homeLocationId: 'uchiha_house',
      knowledgeScope: ['fugaku', 'uchiha_street', 'naka_shrine', 'police_headquarters', 'the_coup', 'clan_radicals', 'village_elders'],
      startingRelationship: { trust: 45, affection: 40, respect: 75, fear: 10, rivalry: 0 },
      gates: [
        {
          id: 'fugaku_treats_you_as_counsel',
          label: 'He asks you what you think before he decides',
          kind: 'TRUST',
          requires: { trust: 62, respect: 78, flagsSet: ['knows:the_coup_date'] },
        },
        {
          id: 'fugaku_will_stand_them_down',
          label: 'He will call it off if you give him a way to',
          kind: 'ALLIANCE',
          requires: { trust: 70, flagsSet: ['argued_the_clan_down'] },
        },
      ],
      attributes: { might: 14, agility: 12, mind: 15, presence: 16, resolve: 16, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 16, damage: 10, tags: ['sharingan', 'clan-head'] },
    },
    {
      id: 'mikoto',
      name: 'Mikoto Uchiha',
      role: 'Your mother, a retired shinobi nobody in this house treats as one, and the person best placed to mediate if anyone thinks to ask her',
      cardBlurb:
        'She was a front-line kunoichi before she was anybody’s mother, she has worked out most of what your father is planning without being told, and she is waiting to find out whether either of her sons thinks she is worth including.',
      pronouns: 'she/her',
      publicTraits: ['Feeds people instead of asking them things', 'Present at every clan gathering and quoted at none', 'Unhurried in a way that makes other people slow down'],
      hiddenDrives: [
        'She wants to be consulted once, by name, about the thing that will decide whether her children are alive next month',
        'She is keeping a bag packed for two children and has not admitted to herself which direction it is for',
      ],
      values: [
        'A family that eats in the same room even when it has nothing to say',
        'Knowing the truth early enough to be useful with it rather than only sad about it',
      ],
      fears: [
        'That her elder son has already decided something and is being kind to her about it',
        'That she will be told what happened by somebody else, afterwards, in the street',
      ],
      socialStyle:
        'Asks the small question and waits through the whole answer. Does the thing with her hands that lets the other person look somewhere else while they talk. Never raises her voice and is obeyed anyway.',
      boundaries: [
        'Will not be reassured. Tell her it is fine when it is not and she stops asking, which is much worse',
        'Will not choose between her husband and her son out loud, and will not pretend the choice is not being put to her',
      ],
      goals: [
        'Get one honest meal out of her elder son before whatever this is arrives',
        'Find out whether Fugaku still believes he can stop the men he has organised',
      ],
      secrets: [
        {
          id: 'mikoto_knows_the_date',
          fact: 'She knows there is a date, because she has been married to Fugaku for eighteen years and he checks the same drawer twice on the nights it moves closer.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it flatly, over food, to anybody who asks her what she thinks rather than telling her what is happening.',
        },
        {
          id: 'mikoto_was_front_line',
          fact: 'She served through the last war and has more field kills than anyone at the clan meetings, several of whom talk over her about tactics.',
          visibility: 'FACTION',
          revealHint: 'It comes out sideways if somebody asks her opinion on an actual plan instead of on her family.',
        },
      ],
      speechStyle:
        'Short domestic sentences carrying the real question underneath, and a long pause left open afterwards for the answer to arrive in. Names the specific object — the box, the door, the second bowl — rather than the feeling. Almost never asks anything twice.',
      topics: ['dinner', 'your brother', 'your father', 'the clan meetings', 'the war she fought in', 'whether you are sleeping'],
      voiceSamples: [
        'There is a box on the shelf. It has been on the shelf since half past five, which means you have been out since before that.',
        'Your father checks that drawer twice on the bad nights. He has checked it twice a night since Sunday.',
        'Sit down. Not because I want to talk to you. Because you are standing in a doorway again and you have been doing that for a month.',
        'I was at the front for six years. Ask me about the plan or do not, but do not ask me whether I am worried about my children.',
      ],
      appearance:
        'Late thirties, long black hair loose at home and tied at meetings, a dark house robe, and the very steady hands of somebody who used to do this for a living.',
      visualHook: 'She dries the same bowl through an entire conversation and puts it down the moment the conversation becomes true.',
      silhouette: 'Kneeling at a low table, back straight, one sleeve held with the other hand.',
      artSeed: 'itachi-mikoto-01',
      portrait: null,
      expressions: ['neutral', 'gentle', 'worried', 'level', 'grieving'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'uchiha_house', activity: 'asleep, waking when the door goes' },
        { startMinute: 330, endMinute: 600, locationId: 'uchiha_house', activity: 'the morning, and a box packed for nobody' },
        { startMinute: 600, endMinute: 780, locationId: 'uchiha_street', activity: 'the district, hearing what is being said in it' },
        { startMinute: 780, endMinute: 1020, locationId: 'uchiha_house', activity: 'the house, and the accounts' },
        { startMinute: 1020, endMinute: 1290, locationId: 'uchiha_house', activity: 'cooking, and listening to the street' },
        { startMinute: 1290, endMinute: 1440, locationId: 'uchiha_house', activity: 'up later than she says she is' },
      ],
      homeLocationId: 'uchiha_house',
      knowledgeScope: ['mikoto', 'uchiha_house', 'uchiha_street', 'fugaku', 'sasuke', 'clan_families', 'the_last_war'],
      startingRelationship: { trust: 65, affection: 80, respect: 70, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'mikoto_included',
          label: 'She is asked her opinion of the plan',
          kind: 'TRUST',
          requires: { trust: 72, flagsSet: ['knows:the_coup_date'] },
        },
        {
          id: 'mikoto_mediates',
          label: 'She will go and stand between her husband and the village',
          kind: 'ALLIANCE',
          requires: { trust: 80, respect: 75, flagsSet: ['told_somebody_something'] },
        },
      ],
      attributes: { might: 11, agility: 12, mind: 14, presence: 14, resolve: 16, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'izumi',
      name: 'Izumi Uchiha',
      role: 'A clan girl your own age who has decided, on no encouragement whatsoever, that the two of you are friends',
      cardBlurb:
        'She is thirteen, she is the only person who talks to you about anything other than the crisis, and she has started noticing the same things about the district that you have. She would like to be treated as someone who can help.',
      pronouns: 'she/her',
      publicTraits: ['Talks herself into things out loud', 'Turns up where you are and pretends it is coincidence', 'Extremely straight-faced about her own training'],
      hiddenDrives: [
        'She wants to be treated as a shinobi by the one person in this clan whose assessment she would believe',
        'She is trying to work out whether being frightened for her clan is disloyal, and has nobody safe to ask',
      ],
      values: [
        'Being useful in the actual emergency rather than protected from it',
        'Her mother, who has been alone since the night the fox came and does not talk about it',
      ],
      fears: [
        'That she is the kind of person people are polite to and never call',
        'That whatever is coming will happen to her family while she is at the teahouse being pleasant',
      ],
      socialStyle:
        'Over-explains the setup, gets to the point, then stops abruptly and looks at the table. Recovers by asking you something practical. Physically brave and conversationally not.',
      boundaries: [
        'Will not be handled gently about her own clan. Soften a real answer and she will ask the same question again with the softening removed',
        'Will not be used as a message-carrier to somebody without being told what the message is',
      ],
      goals: [
        'Get put on something real instead of the district rotation',
        'Find out what the meetings are actually about, from somebody who will not lie to her',
      ],
      secrets: [
        {
          id: 'izumi_awakened',
          fact: 'Her Sharingan came in on the night of the fox, at four, watching her father not come back, and she has never once used it in front of another Uchiha.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it plainly, without drama, to anybody who asks her a direct question about that night instead of avoiding it.',
        },
        {
          id: 'izumi_counted_the_houses',
          fact: 'She has counted which houses in the district have stopped hanging washing out and which have quietly sent children to relatives. Eleven and six.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She offers it, nervously, the first time somebody treats her as an observer rather than as company.',
        },
      ],
      speechStyle:
        'Starts three sentences before the one she meant, then delivers it flat and fast and stops dead. Ends a retreat with "anyway". Talks about her own training in precise numbers because numbers are the part she is confident about.',
      topics: ['her training', 'the district', 'her mother', 'the night of the fox', 'the teahouse', 'the houses that went quiet'],
      voiceSamples: [
        'I ordered four and I ate one on the way here, so there are three, which is a normal number of dango for one person to have. Anyway.',
        'Eleven houses have stopped hanging washing out. Six sent their kids away to relatives in the last nine days. I went round again to check, in case I had invented it.',
        'You do not have to do the thing where you check I can take it first. I asked you. Just say it.',
        'I was four. My father was posted to the west wall. My eyes came in while I was watching the gate, and in nine years not one person has raised it with me, including my mother. So this is the first time it has been out of my mouth.',
      ],
      appearance:
        'Thirteen, brown hair in a short tail with a strand that will not stay, an unmarked training jacket, and a bandage on one forearm that is a week old and about nothing.',
      visualHook: 'A folded paper bag of sweets that she puts on the counter and does not open until somebody else does.',
      silhouette: 'Perched on a stool with both feet hooked on the rung, leaning forward.',
      artSeed: 'itachi-izumi-01',
      portrait: null,
      expressions: ['neutral', 'flustered', 'earnest', 'sad', 'determined'],
      schedule: [
        { startMinute: 0, endMinute: 380, locationId: 'izumi_home', activity: 'asleep, in the back room' },
        { startMinute: 380, endMinute: 720, locationId: 'training_ground', activity: 'at the posts early, alone, keeping count' },
        { startMinute: 720, endMinute: 1020, locationId: 'uchiha_street', activity: 'the district rotation, which is walking about' },
        { startMinute: 1020, endMinute: 1320, locationId: 'susuki_teahouse', activity: 'the end seat by the window' },
        { startMinute: 1320, endMinute: 1440, locationId: 'izumi_home', activity: 'home, having taken the long way round' },
      ],
      homeLocationId: 'izumi_home',
      knowledgeScope: ['izumi', 'izumi_home', 'uchiha_street', 'susuki_teahouse', 'training_ground', 'clan_families', 'the_night_of_the_fox'],
      startingRelationship: { trust: 55, affection: 50, respect: 60, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'izumi_told_something_real',
          label: 'She is treated as somebody who can be told',
          kind: 'TRUST',
          requires: { trust: 68, flagsSet: ['spoke:izumi'] },
        },
        {
          id: 'izumi_closer',
          label: 'Whatever this is becomes something either of them would name',
          kind: 'ROMANCE',
          requires: { trust: 75, affection: 72 },
        },
      ],
      attributes: { might: 9, agility: 13, mind: 13, presence: 11, resolve: 14, arcana: 13 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 13, damage: 6, tags: ['sharingan', 'genin'] },
    },
    {
      id: 'danzo',
      name: 'Danzo Shimura',
      role: 'The man who runs the part of the village that does not appear on the chart, and who has been extremely polite to you for two years',
      cardBlurb:
        'He has never asked you for anything yet, he has been right about at least two risks that everybody else dismissed, and he is the only person in this village who talks to you as though you are already the adult everyone else is pretending you are.',
      pronouns: 'he/him',
      publicTraits: ['Praises maturity and nothing else', 'Poses moral problems as conversation', 'Present at council and rarely speaks in it'],
      hiddenDrives: [
        'He wants an Uchiha who has chosen the village over the clan, publicly and irreversibly, and will manufacture the circumstance if one does not arise',
        'He believes he is the only person willing to be the villain of a story that ends with everybody alive, and this belief is the most comfortable thing he owns',
      ],
      values: [
        'A village that survives the decade',
        'A decision made by somebody, rather than deferred by a committee for another ten years',
      ],
      fears: [
        'That he will be proved right too late for anybody to credit him with it',
        'That the boy he is cultivating will turn out to have a version of his own reasoning that does not need him',
      ],
      socialStyle:
        'Lets the other person speak first and for longer. Frames every option as a consequence that is already in motion. Never asks for anything directly, so that agreeing always feels like the other person’s own idea.',
      boundaries: [
        'Will not confess to anything, ever, including to somebody holding proof of it',
        'Will not negotiate with somebody who has nothing. He will negotiate immediately with somebody who has something',
      ],
      goals: [
        'End the clan question this month, by whichever instrument turns out to be available',
        'Have the Uchiha prodigy owe him one irreversible thing',
      ],
      secrets: [
        {
          id: 'danzo_the_rota',
          fact: 'Root has been running a watch rotation on the district for ten months, signed off by a chain of command that does not exist on paper, and the record of it is in the room under the village.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He never says it. Somebody reads it, in his own filing, in his own building.',
        },
        {
          id: 'danzo_wants_the_eye',
          fact: 'He knows what Shisui’s right eye does and has decided that a technique that can overrule one person once a decade is too useful to be left in the head of somebody with scruples.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He gives it away by what he already knows in a conversation nobody told him about.',
        },
      ],
      speechStyle:
        'Conditionals and consequences. Never says what he wants, only what will be true. Never asks a question. Sentences stop the moment their work is done, which is usually one clause earlier than the listener expected.',
      topics: ['the clan', 'the coup', 'the village’s survival', 'your father', 'your brother', 'what is necessary', 'Root'],
      voiceSamples: [
        'If the clan moves, three countries will be inside these walls within a week. That is not a threat. It is a distance and a marching speed.',
        'You will be told this is a choice between the village and your family. It has not been that for some months.',
        'Your brother is seven. Seven survives most things. I am telling you the range of outcomes, which nobody else in this village has had the courtesy to do.',
        'I have read your reports since you were eleven. You reach the necessary conclusion faster than the men who assign you. They find that impressive. I find it useful.',
      ],
      appearance:
        'Elderly, bandaged over the right eye and down the right arm, a plain dark robe, a stick he does not lean on, and the stillness of somebody who has decided not to spend anything on gesture.',
      visualHook: 'The bandaged right side, and the arm held in a sling he has not needed for years.',
      silhouette: 'Seated, upright, one hand flat on a bare table, entirely motionless.',
      artSeed: 'itachi-danzo-01',
      portrait: null,
      expressions: ['neutral', 'approving', 'cold', 'patient', 'displeased'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'root_chamber', activity: 'awake, reading rotations' },
        { startMinute: 300, endMinute: 600, locationId: 'root_chamber', activity: 'briefings nobody writes down' },
        { startMinute: 600, endMinute: 780, locationId: 'hokage_office', activity: 'council, saying almost nothing' },
        { startMinute: 780, endMinute: 1440, locationId: 'root_chamber', activity: 'the room under the village, and one chair' },
      ],
      homeLocationId: 'root_chamber',
      knowledgeScope: ['danzo', 'root', 'root_chamber', 'the_coup', 'village_elders', 'anbu', 'surveillance'],
      startingRelationship: { trust: 20, affection: 0, respect: 60, fear: 25, rivalry: 30 },
      gates: [
        {
          id: 'danzo_makes_the_offer',
          label: 'He puts the actual proposition on the table',
          kind: 'OTHER',
          requires: { respect: 65, flagsSet: ['danzo_made_contact'] },
        },
        {
          id: 'danzo_negotiates',
          label: 'He treats you as somebody holding something',
          kind: 'OTHER',
          requires: { respect: 70, hasItems: ['root_ledger'] },
        },
      ],
      attributes: { might: 11, agility: 11, mind: 18, presence: 15, resolve: 18, arcana: 16 },
      companion: null,
      scouting: {
        learnRate: 1.5,
        cap: 8,
        revealCopy: 'He waits until you have finished, and then answers the objection you have not made yet. He has been reading your reports for two years and he did not do it for the intelligence.',
      },
      combatant: { health: 75, defenseDc: 17, damage: 12, tags: ['root', 'sharingan-arm'] },
    },
    {
      id: 'hiruzen',
      name: 'Hiruzen Sarutobi',
      role: 'The Third Hokage, who wants a settlement, has wanted one for ten years, and has been outmanoeuvred every year by a man he refuses to remove',
      cardBlurb:
        'He is fond of you, he means every word about negotiation, and he has spent a decade being too slow. He can be moved — but only by something he can put on a desk in front of other people, and you are one of the few who could get it.',
      pronouns: 'he/him',
      publicTraits: ['Remembers everybody’s children by name', 'Defers a decision by making it into a longer conversation', 'Apologises in advance for things he is about to fail to do'],
      hiddenDrives: [
        'He wants somebody else to force his hand so that the removal of his old friend is not something he chose',
        'He suspects he has already left it too late and is managing that suspicion by staying busy',
      ],
      values: [
        'A village where the argument happens in a room rather than in the street',
        'Old loyalties, which he keeps past the point where they have started costing other people',
      ],
      fears: [
        'That his tolerance of one man will turn out to have been the whole cause',
        'That he is asking a thirteen-year-old to do the part of his job he cannot face',
      ],
      socialStyle:
        'Long, kind, discursive sentences that arrive somewhere adjacent to the point and stop there. Offers tea. Asks after your mother. Genuinely means all of it and uses it, without quite admitting so, to make the room slower.',
      boundaries: [
        'Will not act against a colleague on an accusation. Will act, immediately and hard, on a document',
        'Will not authorise anything against the clan that he could not defend in front of the clan',
      ],
      goals: [
        'Get Fugaku into a room with the elders before somebody in either building runs out of patience',
        'Avoid being the Hokage on whose watch a founding clan was destroyed',
      ],
      secrets: [
        {
          id: 'hiruzen_knows_about_root',
          fact: 'He knows Root was never actually disbanded, has known for four years, and has told himself each year that raising it would fracture the village at exactly the wrong moment.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it, wearily and completely, the moment somebody puts a signed rotation in front of him — not before, and not to anybody who only suspects.',
        },
        {
          id: 'hiruzen_already_drafted_it',
          fact: 'There is a drafted settlement in his desk giving the clan two council seats and the district back. It has been drafted for fourteen months and has never been tabled.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He produces it himself, embarrassed, when somebody tells him the coup has a date on it.',
        },
      ],
      speechStyle:
        'Warm, hedged, and long. Perhaps, in time, when things have settled. Circles a subject twice and lands beside it. Says your name at the end of sentences rather than the start, which makes each one sound like a request rather than an instruction.',
      topics: ['the clan', 'the elders', 'your father', 'the settlement', 'Danzo', 'the last war', 'your mother'],
      voiceSamples: [
        'Sit, sit. There is tea, and there is the other thing, and I would rather we did them in that order if you can bear it.',
        'Perhaps in a month or two the mood will have come off the boil, and then a conversation of that kind becomes possible in a way that today it simply is not, Itachi.',
        'I have known him since we were both younger than your father. That is not a defence of him. It is an explanation of why I have not done anything, which I am aware is a different thing.',
        'You are thirteen years old and you have just told me something that four grown men in this building should have told me first. I would like you to know that I know that.',
      ],
      appearance:
        'Late sixties, white robes and the hat on a stand rather than his head, a short beard, a pipe he mostly holds, and a stack of paperwork he has organised into three piles and made no progress on.',
      visualHook: 'The wide-brimmed hat sitting on its stand beside him rather than on him, all day, every day.',
      silhouette: 'Seated low behind a desk, framed by a round window with a whole village in it.',
      artSeed: 'itachi-hiruzen-01',
      portrait: null,
      expressions: ['neutral', 'kindly', 'troubled', 'weary', 'decisive'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'hokage_office', activity: 'asleep upstairs, more or less' },
        { startMinute: 330, endMinute: 600, locationId: 'hokage_office', activity: 'the morning paperwork, three piles' },
        { startMinute: 600, endMinute: 780, locationId: 'hokage_office', activity: 'council, and the elders, and the same argument' },
        { startMinute: 780, endMinute: 1320, locationId: 'hokage_office', activity: 'the desk, and whoever comes up the stairs' },
        { startMinute: 1320, endMinute: 1440, locationId: 'hokage_office', activity: 'still there, still at it' },
      ],
      homeLocationId: 'hokage_office',
      knowledgeScope: ['hiruzen', 'hokage_office', 'village_elders', 'the_coup', 'danzo', 'anbu', 'the_last_war'],
      startingRelationship: { trust: 60, affection: 45, respect: 70, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'hiruzen_will_table_it',
          label: 'He puts the settlement in front of the elders',
          kind: 'ALLIANCE',
          requires: { trust: 70, flagsSet: ['knows:the_coup_date'] },
        },
        {
          id: 'hiruzen_will_move_on_root',
          label: 'He will act against his oldest colleague',
          kind: 'ALLIANCE',
          requires: { trust: 72, hasItems: ['root_ledger'] },
        },
      ],
      attributes: { might: 13, agility: 12, mind: 18, presence: 17, resolve: 15, arcana: 18 },
      companion: null,
      scouting: null,
      combatant: { health: 90, defenseDc: 19, damage: 14, tags: ['hokage', 'all-elements'] },
    },
    {
      id: 'kakashi',
      name: 'Kakashi Hatake',
      role: 'Another prodigy who was handed a war at eleven, four years ahead of you on the same road, and the only person in the ready room who has never asked you anything',
      cardBlurb:
        'He has been in the mask since he was your age, he knows exactly what is being done to you because it was done to him, and he will not mention it unless you do. He is also the fastest route to a corridor that is not on any plan.',
      pronouns: 'he/him',
      publicTraits: ['Late to everything except an operation', 'Reads in the ready room and does not turn the page', 'Never uses a name in the building, including his own'],
      hiddenDrives: [
        'He is waiting to see whether this one gets out, because the last three did not, and he has stopped being able to watch it neutrally',
        'He would like to be asked for something, by somebody, for a reason that is not operational',
      ],
      values: [
        'Doing the job properly and going home',
        'Not lying to somebody younger than you about what the job costs',
      ],
      fears: [
        'That the village will spend this one the way it spent him and then be sad about it afterwards',
        'That the correct thing to do here is something he has already decided he is not going to do',
      ],
      socialStyle:
        'Answers a question with a smaller question. Arrives one beat late on purpose so the other person has to commit first. Says something irrelevant about the weather or a book while you decide whether to trust him.',
      boundaries: [
        'Will not be recruited into somebody else’s politics without being told all of it first',
        'Will not discuss the clan in the building, and will discuss anything at all on a roof',
      ],
      goals: [
        'Get through this rotation without another thirteen-year-old going the way the last one did',
        'Find out what is actually happening in that district before somebody makes it his problem at short notice',
      ],
      secrets: [
        {
          id: 'kakashi_knows_the_corridor',
          fact: 'He knows where the unmarked corridor off the ready room goes, has known for two years, and has never written it down or told anybody who could be made to write it down.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He will walk you there rather than tell you, and only after you have said something true to him about your own family.',
        },
        {
          id: 'kakashi_was_asked_first',
          fact: 'Root approached him at fifteen with a very similar conversation to the one being had with you, and he said no, and it cost him four years of assignments.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It comes out on a roof, sideways, as the flattest possible piece of advice.',
        },
      ],
      speechStyle:
        'Laconic to the point of rudeness, then one sentence of unexpected precision. Deflects with the trivial — the weather, what he is reading, whether you have eaten. Uses "well" and "hm" as complete answers. Never says anything twice.',
      topics: ['the ready room', 'the assignment board', 'Root', 'the corridor', 'being eleven', 'the book he is not reading'],
      voiceSamples: [
        'Hm. Not my rotation.',
        'That is a lot of questions for somebody who is not on this one.',
        'It is going to rain. You should probably go home before it does. Not a euphemism, it is genuinely going to rain.',
        'They asked me once, when I was fifteen. I said no. Four years of gate duty, and I would do it again, and that is the entire amount of advice I have.',
        'Nobody in this room is going to tell you that you are too young for it. That is not because you are not.',
      ],
      appearance:
        'Seventeen, mask over the lower face and a headband down over the left eye, standard ANBU greys with a dog mask hooked at the belt, and grey hair that stands up regardless.',
      visualHook: 'A dog mask hanging at his hip rather than on his face, on a man who never has it on.',
      silhouette: 'Leaning on a wall at an angle no wall was built for, one hand in a pocket, a book at chest height.',
      artSeed: 'itachi-kakashi-01',
      portrait: null,
      expressions: ['neutral', 'wry', 'alert', 'grave', 'unreadable'],
      schedule: [
        { startMinute: 0, endMinute: 240, locationId: 'the_rooftops', activity: 'out, somewhere high, not sleeping' },
        { startMinute: 240, endMinute: 480, locationId: 'anbu_ready_room', activity: 'the bench, the book, the page he is not turning' },
        { startMinute: 480, endMinute: 900, locationId: 'the_rooftops', activity: 'the rotation, which is walking roofs slowly' },
        { startMinute: 900, endMinute: 1260, locationId: 'anbu_ready_room', activity: 'the ready room, and the assignment board' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_rooftops', activity: 'gone up, where the conversations happen' },
      ],
      homeLocationId: 'anbu_ready_room',
      knowledgeScope: ['kakashi', 'anbu', 'anbu_ready_room', 'the_rooftops', 'root', 'assignments'],
      startingRelationship: { trust: 40, affection: 15, respect: 65, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'kakashi_talks_on_the_roof',
          label: 'He will have the conversation, outside the building',
          kind: 'TRUST',
          requires: { trust: 52, flagsSet: ['spoke:kakashi'] },
        },
        {
          id: 'kakashi_shows_you',
          label: 'He walks you to the corridor',
          kind: 'ALLIANCE',
          requires: { trust: 62, respect: 70, flagsSet: ['told_somebody_something'] },
        },
      ],
      attributes: { might: 13, agility: 16, mind: 17, presence: 11, resolve: 15, arcana: 16 },
      companion: null,
      scouting: {
        learnRate: 1,
        cap: 6,
        revealCopy: 'He does not look up. "You throw first when you are worried and you talk first when you are not. You have thrown first four times this week."',
      },
      combatant: { health: 68, defenseDc: 18, damage: 11, tags: ['anbu', 'sharingan'] },
    },
  ],
  quests: [
    {
      id: 'q_two_houses',
      title: 'Two Houses',
      summary: 'You report to your father and you report to the tower, and neither of them knows about the other. That was survivable while nothing had a date on it.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['fugaku', 'mikoto', 'sasuke', 'hiruzen', 'danzo'],
      involvedLocationIds: ['uchiha_house', 'naka_shrine', 'hokage_office', 'anbu_ready_room'],
      knownRewardCopy: 'A clear view of what your father has actually organised, and of what the tower already suspects.',
      steps: [
        {
          id: 'the_evening_you_came_home',
          playerCopy: 'Get through one evening in a house where three people want three different things from you.',
          directorNotes:
            'Sasuke on the step, Mikoto at the stove, the mask in the bag, and a meeting at eight. Every route here is a legitimate way to be this person and none is the correct one. Do not have anybody guess what he does for the village. Keep it domestic and let the pressure sit underneath the food.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'gave_him_the_hour',
              label: 'Take him to the posts and be late for your father',
              predicate: { flagsSet: ['used:an_hour_at_the_posts'] },
              setsFlags: ['trained_sasuke', 'sasuke_trusts_you', 'late_to_the_shrine'],
              closesFlags: ['arrived_first'],
            },
            {
              routeId: 'told_somebody_the_truth',
              label: 'Say a true thing out loud in your own kitchen',
              predicate: { flagsSet: ['used:say_the_whole_thing'] },
              setsFlags: ['told_somebody_something'],
              closesFlags: ['played_the_dutiful_son'],
            },
            {
              routeId: 'handled_the_evening',
              label: 'Sort all three of them out without telling any of them anything',
              predicate: { flagsSet: ['used:handle_it_yourself'] },
              setsFlags: ['played_the_dutiful_son', 'carrying_it'],
              closesFlags: ['told_somebody_something'],
            },
            {
              routeId: 'read_the_house',
              label: 'Watch your own family for a minute before you do anything',
              predicate: { flagsSet: ['used:see_it_coming'] },
              setsFlags: ['played_the_dutiful_son', 'arrived_first'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['knows:the_shape_of_it'], abilities: [], reputation: [] },
        },
        {
          id: 'under_the_seventh_mat',
          playerCopy: 'Sit in the stone room under the shrine and find out what your father has actually organised.',
          directorNotes:
            'Forty men in a room built for thirty. Yashiro speaks first now and Fugaku lets him, which is the fact of the evening. Radicals, moderates and the ones who came because everybody came. Fugaku will look at his son once during it and the whole room will notice him doing it.',
          enterWhen: { flagsSet: ['knows:the_shape_of_it'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'argued_with_the_room',
              label: 'Argue against it in front of forty people',
              predicate: { flagsSet: ['used:say_the_whole_thing'], atLocation: 'naka_shrine' },
              setsFlags: ['argued_the_clan_down', 'fugaku_heard_you'],
              closesFlags: ['gave_the_clan_everything', 'clan_trusts_you'],
            },
            {
              routeId: 'gave_them_everything',
              label: 'Give them what the tower told you this week',
              predicate: { flagsSet: ['used:give_them_the_report'] },
              setsFlags: ['gave_the_clan_everything', 'clan_trusts_you'],
              closesFlags: ['argued_the_clan_down'],
            },
            {
              routeId: 'gave_them_nothing',
              label: 'Attend, and be visibly empty-handed',
              predicate: { flagsSet: ['used:handle_it_yourself'] },
              setsFlags: ['clan_suspects_you', 'carrying_it'],
              closesFlags: ['clan_trusts_you'],
            },
            {
              routeId: 'sat_through_it',
              label: 'Sit through the whole thing and say nothing',
              predicate: { flagsSet: ['visited:naka_shrine'] },
              setsFlags: ['sat_through_it'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['knows:the_coup_date'],
            abilities: [],
            reputation: [{ factionId: 'faction_uchiha', amount: 5 }],
          },
        },
        {
          id: 'the_other_report',
          playerCopy: 'Decide what the village gets told, and which part of the village gets to hear it.',
          directorNotes:
            'Three buildings want this and they are not the same building. The tower is slow and legitimate. The room under the village is fast and costs something permanent. A roof at midnight with one other operative on it is neither. The player is thirteen and all three parties will treat this conversation as being between adults.',
          enterWhen: { flagsSet: ['knows:the_coup_date'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_the_tower_everything',
              label: 'Walk up the stairs and tell the Hokage all of it',
              predicate: { flagsSet: ['used:say_the_whole_thing'], atLocation: 'hokage_office' },
              setsFlags: ['hiruzen_knows_everything', 'chose_the_village', 'told_somebody_something'],
              closesFlags: ['danzo_owns_the_file'],
            },
            {
              routeId: 'told_root',
              label: 'File it through the door that is not on the plan',
              predicate: { flagsSet: ['used:use_roots_door'] },
              setsFlags: ['danzo_owns_the_file', 'root_trusts_you'],
              closesFlags: ['hiruzen_knows_everything'],
            },
            {
              routeId: 'told_the_other_one',
              label: 'Say it to the only other person who has been through this',
              predicate: { minRelationship: [{ characterId: 'kakashi', dimension: 'trust', value: 55 }] },
              setsFlags: ['kakashi_knows', 'told_somebody_something'],
              closesFlags: [],
            },
            {
              routeId: 'filed_it_short',
              label: 'File four lines and leave out the date',
              predicate: { flagsSet: ['used:handle_it_yourself'] },
              setsFlags: ['filed_a_short_report', 'carrying_it'],
              closesFlags: ['hiruzen_knows_everything'],
            },
          ],
          rewards: { xp: 90, items: [], flags: ['the_report_is_in'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_friend',
      title: 'What Shisui Is Going To Do',
      summary: 'He has a way to stop this without anybody dying. It requires taking one man’s decision away from him, and he has already been to the wrong person about it.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:kotoamatsukami'] },
      involvedCharacterIds: ['shisui', 'danzo', 'fugaku'],
      involvedLocationIds: ['the_rooftops', 'nakano_cliff', 'root_chamber'],
      knownRewardCopy: 'Whether your friend is alive at the end of the fortnight, and who ends up holding what he was carrying.',
      steps: [
        {
          id: 'what_shisui_wants',
          playerCopy: 'Tell Shisui what you think of a plan that ends the coup by overruling one man’s mind.',
          directorNotes:
            'He is not asking permission and he would like it anyway. He has already taken it to Danzo once, through the door, like a citizen, and he mentions this cheerfully as evidence of good conduct. The moral problem is real on both sides and neither of them should win the argument cleanly.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'backed_the_plan',
              label: 'Back him, and go with him',
              predicate: {
                flagsSet: ['used:say_the_whole_thing'],
                minRelationship: [{ characterId: 'shisui', dimension: 'trust', value: 82 }],
              },
              setsFlags: ['backed_kotoamatsukami', 'told_somebody_something'],
              closesFlags: ['refused_kotoamatsukami'],
            },
            {
              routeId: 'took_it_upstairs',
              label: 'Take the whole plan to the tower instead',
              predicate: { flagsSet: ['knows:kotoamatsukami'], atLocation: 'hokage_office' },
              setsFlags: ['hiruzen_knows_the_plan', 'told_somebody_something'],
              closesFlags: [],
            },
            {
              routeId: 'refused_it',
              label: 'Decide it is not going to happen, and do not say so',
              predicate: { flagsSet: ['used:handle_it_yourself'] },
              setsFlags: ['refused_kotoamatsukami', 'carrying_it'],
              closesFlags: ['backed_kotoamatsukami'],
            },
            {
              routeId: 'left_it_open',
              label: 'Hear him out and give him nothing back yet',
              predicate: { flagsSet: ['spoke:shisui'] },
              setsFlags: ['shisui_is_waiting'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 100, items: [{ itemId: 'shisui_note', qty: 1 }], flags: ['the_plan_is_on_the_table'], abilities: [], reputation: [] },
        },
        {
          id: 'the_night_on_the_cliff',
          playerCopy: 'Root is going to move on Shisui at the cliff. Decide where you are when they do.',
          directorNotes:
            'The ambush is a world event and it is cancellable. Getting there first is the whole branch. If the player arrives, this is a real fight against four people who are better prepared than he is and who will not be surprised twice. If the player does not arrive, do not narrate a rescue and do not soften it.',
          enterWhen: { flagsSet: ['the_plan_is_on_the_table'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'got_there_first',
              label: 'Be standing there before they are',
              predicate: { flagsSet: ['knows:root_entrance'], atLocation: 'nakano_cliff' },
              setsFlags: ['shisui_lives', 'shisui_safe', 'got_ahead_of_them'],
              closesFlags: ['shisui_died'],
            },
            {
              routeId: 'fought_them_off',
              label: 'Arrive during it and put four people down',
              predicate: { flagsSet: ['used:the_line'], atLocation: 'nakano_cliff' },
              setsFlags: ['shisui_lives', 'shisui_safe', 'root_agents_dead'],
              closesFlags: ['shisui_died'],
            },
            {
              routeId: 'took_what_was_left',
              label: 'Arrive at the end of it and take what he holds out',
              predicate: { flagsSet: ['shisui_ambushed'], atLocation: 'nakano_cliff' },
              setsFlags: ['shisui_died', 'has_the_eye'],
              closesFlags: ['shisui_lives'],
            },
            {
              routeId: 'heard_about_it',
              label: 'Be somewhere else, and be told in the morning',
              predicate: { flagsSet: ['shisui_ambushed'] },
              setsFlags: ['shisui_died', 'heard_it_secondhand'],
              closesFlags: ['shisui_lives'],
            },
          ],
          rewards: { xp: 160, items: [], flags: ['the_cliff_happened'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_what_it_cost',
      title: 'What It Cost',
      summary: 'Something happened on that cliff that your eyes have not caught up with yet.',
      kind: 'LEAD',
      startsActive: false,
      discoverWhen: { flagsSet: ['the_cliff_happened'] },
      involvedCharacterIds: ['shisui'],
      involvedLocationIds: ['nakano_cliff', 'uchiha_house'],
      knownRewardCopy: 'Whatever the night left behind in you, and the fact that it can only ever have been bought this way.',
      steps: [
        {
          id: 'the_morning_after',
          playerCopy: 'Work out what changed in you on that cliff, and what it is going to cost to use.',
          directorNotes:
            'Do not write this as an unlock. It is a physical fact discovered in an ordinary room the next morning — light coming in wrong, a headache behind one eye, the world separating into more layers than it had. Grief first, capability second, and a long way second.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'over_his_body',
              label: 'It came in on the rock, over somebody who had stopped talking',
              predicate: { flagsSet: ['shisui_died'] },
              setsFlags: ['awakened_over_shisui'],
              closesFlags: ['awakened_beside_him'],
            },
            {
              routeId: 'standing_next_to_him',
              label: 'It came in during the worst four seconds of a fight you won',
              predicate: { flagsSet: ['shisui_lives'] },
              setsFlags: ['awakened_beside_him'],
              closesFlags: ['awakened_over_shisui'],
            },
          ],
          rewards: { xp: 140, items: [], flags: ['knows:mangekyo'], abilities: ['tsukuyomi'], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_paper',
      title: 'Something You Can Put On A Desk',
      summary: 'The Hokage will not move against a colleague on an accusation. He will move on a document, and there is a document.',
      kind: 'LEAD',
      startsActive: false,
      discoverWhen: { flagsSet: ['danzo_made_contact'] },
      involvedCharacterIds: ['danzo', 'kakashi', 'hiruzen'],
      involvedLocationIds: ['anbu_ready_room', 'root_chamber', 'hokage_office'],
      knownRewardCopy: 'Proof of a ten-month surveillance operation on forty households, signed by people who do not appear on any chart.',
      steps: [
        {
          id: 'find_the_door',
          playerCopy: 'Find the corridor off the ready room that is not on the building plan.',
          directorNotes:
            'Three ways in and they cost different things. Reading it out of the paperwork is slow and free. Kakashi will walk you there and will want something true from you first. Danzo will show you himself, which is not generosity — it is him deciding you are worth spending an entrance on.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_it_out_of_the_rotas',
              label: 'Read it out of the duty rotas',
              predicate: { flagsSet: ['used:follow_the_paper'] },
              setsFlags: ['knows:root_entrance', 'found_it_yourself'],
              closesFlags: [],
            },
            {
              routeId: 'kakashi_walked_you',
              label: 'Get the man on the bench to walk you down there',
              predicate: {
                atLocation: 'anbu_ready_room',
                minRelationship: [{ characterId: 'kakashi', dimension: 'trust', value: 62 }],
              },
              setsFlags: ['knows:root_entrance', 'kakashi_showed_you'],
              closesFlags: [],
            },
            {
              routeId: 'shown_in',
              label: 'Be invited',
              predicate: { flagsSet: ['used:use_roots_door'] },
              setsFlags: ['knows:root_entrance', 'danzo_showed_you_himself'],
              closesFlags: ['found_it_yourself'],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['looking_for_proof'], abilities: [], reputation: [] },
        },
        {
          id: 'the_ledger',
          playerCopy: 'Get hold of something that would survive being read out loud in front of the elders.',
          directorNotes:
            'The log is routine, which is the part that ends a career: routine means somebody has been signing it for ten months and nobody upstairs was ever asked. Sasuke’s school route appears in it twice. Let the player find that themselves rather than being told.',
          enterWhen: { flagsSet: ['looking_for_proof'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_the_log',
              label: 'Take it out of the building',
              predicate: { hasItems: ['root_ledger'] },
              setsFlags: ['have_the_proof'],
              closesFlags: [],
            },
            {
              routeId: 'took_it_out_of_a_head',
              label: 'Take it out of somebody who has read it',
              predicate: { flagsSet: ['used:borrow_a_minute'], atLocation: 'root_chamber' },
              setsFlags: ['have_the_proof', 'took_it_out_of_a_head'],
              closesFlags: [],
            },
            {
              routeId: 'decided_not_to_look',
              label: 'Decide you already know enough and leave it where it is',
              predicate: { flagsSet: ['used:handle_it_yourself'] },
              setsFlags: ['decided_not_to_look', 'carrying_it'],
              closesFlags: ['have_the_proof'],
            },
          ],
          rewards: { xp: 120, items: [], flags: ['the_question_of_proof_is_settled'], abilities: [], reputation: [] },
        },
        {
          id: 'what_you_do_with_it',
          playerCopy: 'Decide what a document like that is for.',
          directorNotes:
            'Three uses and they are not variations. On a desk in front of the elders it ends an organisation and makes an enemy of a man who does not forget. Held privately it makes him negotiate, which is useful and is also the beginning of becoming him. Used as a reason it is a killing, and the village will have to be told something afterwards.',
          enterWhen: { flagsSet: ['the_question_of_proof_is_settled'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'put_it_on_the_desk',
              label: 'Put it on the Hokage’s desk',
              predicate: { flagsSet: ['have_the_proof'], atLocation: 'hokage_office' },
              setsFlags: ['root_exposed', 'hiruzen_acted', 'told_somebody_something'],
              closesFlags: ['danzo_owes_you'],
            },
            {
              routeId: 'used_it_on_him',
              label: 'Hold it over him and make him deal',
              predicate: { flagsSet: ['have_the_proof', 'used:say_the_whole_thing'] },
              setsFlags: ['danzo_owes_you'],
              closesFlags: ['root_exposed'],
            },
            {
              routeId: 'used_it_as_a_reason',
              label: 'Treat it as sufficient grounds',
              predicate: { flagsSet: ['have_the_proof', 'used:the_line'] },
              setsFlags: ['danzo_dead'],
              closesFlags: ['root_exposed', 'danzo_owes_you'],
            },
          ],
          rewards: { xp: 150, items: [], flags: ['root_answered_for'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_your_brother',
      title: 'He Is Seven',
      summary: 'Whatever happens in this fortnight, somebody is going to explain it to Sasuke. You get to decide whether that somebody is you.',
      kind: 'SIDE',
      startsActive: true,
      involvedCharacterIds: ['sasuke', 'mikoto'],
      involvedLocationIds: ['uchiha_house', 'training_ground', 'the_academy'],
      knownRewardCopy: 'What your brother believes about his own family, for the rest of his life.',
      steps: [
        {
          id: 'he_is_seven',
          playerCopy: 'Work out how much a seven-year-old is owed about the thing happening in his own house.',
          directorNotes:
            'His comprehension scales with what he is given, not with his age. Told plainly that the clan and the village are in a political fight and that father wants his brother involved, he understands roughly that much and it changes what he notices. Do not have him grasp the whole thing and do not have him be a prop.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_him',
              label: 'Tell him what is actually going on, in words he has',
              predicate: { flagsSet: ['used:say_the_whole_thing', 'knows:the_coup_date'] },
              setsFlags: ['sasuke_knows_something', 'sasuke_was_told', 'told_somebody_something'],
              closesFlags: ['sasuke_kept_out'],
            },
            {
              routeId: 'trained_him',
              label: 'Give him the hour instead of the answer',
              predicate: { flagsSet: ['used:an_hour_at_the_posts'] },
              setsFlags: ['sasuke_trusts_you', 'trained_sasuke'],
              closesFlags: [],
            },
            {
              routeId: 'kept_him_out',
              label: 'Decide he is too small for it',
              predicate: { flagsSet: ['used:handle_it_yourself'] },
              setsFlags: ['sasuke_kept_out', 'carrying_it'],
              closesFlags: ['sasuke_was_told'],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['sasuke_has_an_opinion_of_you'], abilities: [], reputation: [] },
        },
        {
          id: 'what_he_ends_up_believing',
          playerCopy: 'Find out what your brother has settled on, about you and about this family.',
          directorNotes:
            'This is the step the whole downstream of this world hangs on. He arrives at a version and holds it. If he was told, he does not simply accept it — he builds his own reading of it and some of that reading is wrong in ways that are his. If he was managed, the managed version is the one he keeps.',
          enterWhen: { flagsSet: ['sasuke_has_an_opinion_of_you'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_him_all_of_it',
              label: 'Finish the sentence you started with him',
              predicate: { flagsSet: ['sasuke_knows_something', 'used:say_the_whole_thing'] },
              setsFlags: ['sasuke_knows_the_truth'],
              closesFlags: ['sasuke_believes_the_story'],
            },
            {
              routeId: 'he_worked_it_out',
              label: 'He gets there himself, because he has been following you',
              predicate: { minRelationship: [{ characterId: 'sasuke', dimension: 'trust', value: 80 }] },
              setsFlags: ['sasuke_knows_the_truth', 'he_worked_it_out'],
              closesFlags: ['sasuke_believes_the_story'],
            },
            {
              routeId: 'gave_him_a_version',
              label: 'Put a version in his head and let him keep it',
              predicate: { flagsSet: ['used:borrow_a_minute'] },
              setsFlags: ['sasuke_believes_the_story', 'gave_him_a_version'],
              closesFlags: ['sasuke_knows_the_truth'],
            },
            {
              routeId: 'it_never_came_up',
              label: 'Let it go unsaid for another fortnight',
              predicate: { flagsSet: ['spoke:sasuke'] },
              setsFlags: ['sasuke_believes_the_story'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 110, items: [], flags: ['sasuke_is_who_he_is_now'], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_last_night',
      title: 'The Last Night',
      summary: 'Everybody involved now believes time is against them, which is the condition under which people do the thing they have been talking about.',
      kind: 'MAIN',
      startsActive: false,
      discoverWhen: { flagsSet: ['knows:the_coup_date'] },
      involvedCharacterIds: ['danzo', 'fugaku', 'mikoto', 'sasuke', 'hiruzen'],
      involvedLocationIds: ['root_chamber', 'naka_shrine', 'uchiha_street', 'village_gate', 'hokage_office'],
      knownRewardCopy: 'Which of the things that could happen to forty households is the one that does.',
      steps: [
        {
          id: 'the_room_with_one_chair',
          playerCopy: 'Sit opposite a man who is about to describe your options as though there are two of them.',
          directorNotes:
            'He does not gloat and he does not threaten. He lays out a forecast, accurately, with the parts he is uncertain about marked as uncertain, and then names a price. He is right about the risk of a coup and wrong about the price, and the scene only works if the first half of that is genuinely persuasive.',
          enterWhen: { flagsSet: ['the_ultimatum'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'answered_the_third_way',
              label: 'Stop answering and watch his right shoulder',
              predicate: { flagsSet: ['used:the_line', 'knows:root_entrance'] },
              setsFlags: ['danzo_dead'],
              closesFlags: ['accepted_the_ultimatum'],
            },
            {
              routeId: 'refused_him',
              label: 'Tell him he helped build both of the outcomes he is describing',
              predicate: { flagsSet: ['used:say_the_whole_thing'] },
              setsFlags: ['refused_the_ultimatum', 'told_somebody_something'],
              closesFlags: ['accepted_the_ultimatum'],
            },
            {
              routeId: 'accepted',
              label: 'Get the guarantee about your brother in writing you cannot have',
              predicate: { flagsSet: ['used:use_roots_door'] },
              setsFlags: ['accepted_the_ultimatum'],
              closesFlags: ['refused_the_ultimatum'],
            },
            {
              routeId: 'asked_for_time',
              label: 'Ask for four more days and take whatever he gives you',
              predicate: { flagsSet: ['spoke:danzo'] },
              setsFlags: ['bought_time'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 140, items: [], flags: ['the_choice_is_yours_now'], abilities: [], reputation: [] },
        },
        {
          id: 'the_night_the_clan_moves',
          playerCopy: 'Decide what happens to forty households.',
          directorNotes:
            'Multi-scene. Nothing here is owed to anybody and nothing is scheduled: if the player has spent a fortnight dismantling this, it comes apart, and no replacement catastrophe will be invented to restore the famous shape. If the player does the famous thing, write his reasoning seriously and do not narrate hindsight into it. Stopping halfway is legitimate and must be allowed.',
          enterWhen: { flagsSet: ['the_choice_is_yours_now'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'did_it',
              label: 'Do the thing history says you did',
              predicate: { flagsSet: ['used:tsukuyomi', 'accepted_the_ultimatum'] },
              setsFlags: ['the_massacre_happened'],
              closesFlags: ['coup_stood_down', 'coup_launched'],
            },
            {
              routeId: 'took_him_and_left',
              label: 'Take your brother and walk out of the south gate',
              predicate: { flagsSet: ['sasuke_trusts_you'], atLocation: 'village_gate' },
              setsFlags: ['left_with_sasuke', 'left_the_map'],
              closesFlags: ['the_massacre_happened', 'coup_stood_down'],
            },
            {
              routeId: 'only_the_leaders',
              label: 'Take four men out of it instead of ninety',
              predicate: { flagsSet: ['have_the_proof', 'used:the_line'] },
              setsFlags: ['the_leaders_arrested', 'coup_stood_down'],
              closesFlags: ['the_massacre_happened'],
            },
            {
              routeId: 'joined_them',
              label: 'Decide your father was right and give him the village',
              predicate: { flagsSet: ['clan_trusts_you', 'used:give_them_the_report'] },
              setsFlags: ['coup_launched', 'you_led_it'],
              closesFlags: ['coup_stood_down', 'the_massacre_happened'],
            },
            {
              routeId: 'a_settlement',
              label: 'Get both of them into the same room with a document',
              predicate: { flagsSet: ['root_exposed'], atLocation: 'hokage_office' },
              setsFlags: ['coup_stood_down', 'a_settlement'],
              closesFlags: ['the_massacre_happened', 'coup_launched'],
            },
            {
              routeId: 'stood_them_down',
              label: 'Talk your father out of it in his own kitchen',
              predicate: {
                flagsSet: ['argued_the_clan_down'],
                minRelationship: [{ characterId: 'fugaku', dimension: 'trust', value: 68 }],
              },
              setsFlags: ['coup_stood_down', 'fugaku_listened'],
              closesFlags: ['the_massacre_happened', 'coup_launched'],
            },
          ],
          rewards: { xp: 220, items: [], flags: ['the_night_resolved'], abilities: [], reputation: [] },
        },
        {
          id: 'what_you_are_now',
          playerCopy: 'Find out what this village has decided you are.',
          directorNotes:
            'The morning after. Public identity is set here and it is frequently not the true one, which is the whole shape of this story. Whatever the player did, somebody else supplies the version the village will keep, and the gap between the two is the thing to write.',
          enterWhen: { flagsSet: ['the_night_resolved'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'became_the_story',
              label: 'Let the legend be exactly true',
              predicate: {
                flagsSet: ['the_massacre_happened'],
                minRelationship: [{ characterId: 'sasuke', dimension: 'fear', value: 55 }],
              },
              setsFlags: ['left_konoha_rogue', 'the_legend_is_true'],
              closesFlags: ['stayed_in_konoha'],
            },
            {
              routeId: 'went_rogue',
              label: 'Leave, and let them say whatever they need to say',
              predicate: { flagsSet: ['the_massacre_happened'] },
              setsFlags: ['left_konoha_rogue'],
              closesFlags: ['stayed_in_konoha'],
            },
            {
              routeId: 'governed_it',
              label: 'Stay, and help run the thing you helped take',
              predicate: { flagsSet: ['you_led_it'] },
              setsFlags: ['the_clan_holds_konoha'],
              closesFlags: ['stayed_in_konoha'],
            },
            {
              routeId: 'gone',
              label: 'Be on a road, at dawn, outside all of it',
              predicate: { flagsSet: ['left_the_map'] },
              setsFlags: ['gone_from_the_village'],
              closesFlags: ['stayed_in_konoha'],
            },
            {
              routeId: 'stayed',
              label: 'Be at the table the next morning like a person who lives here',
              predicate: { flagsSet: ['coup_stood_down'] },
              setsFlags: ['stayed_in_konoha'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 260, items: [], flags: ['the_story_has_a_shape'], abilities: [], reputation: [] },
        },
      ],
    },
  ],
  /**
   * The famous events, as pressures with preconditions rather than chapters.
   *
   * Every one of these can be invalidated. The ambush does not fire if Root has
   * been exposed, its leader is dead, or Shisui was got out of reach; the
   * ultimatum does not arrive from a man who is no longer there to deliver it;
   * and the coup only goes ahead on its own if nobody resolved it. Nothing here
   * will manufacture a replacement for a catastrophe the player prevented.
   */
  worldEvents: [
    {
      id: 'we_the_shrine_meeting',
      atWorldMinute: 20 * 60,
      locationId: 'naka_shrine',
      publicCopy:
        'The seventh mat is up and the stair is open. Forty men are going down into a stone room that holds thirty, and the last four to arrive are the ones who used to say this had gone too far.',
      directorNotes:
        'Fugaku chairs it and lets Yashiro open, which is new and which everyone in the room registers. The business is a date and an assignment list. Itachi is expected to report and the room falls quiet when he is asked to.',
      setsFlags: ['the_meeting_happened'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'fugaku', toLocationId: 'naka_shrine' }],
    },
    {
      id: 'we_shisui_asks',
      atWorldMinute: 1440 + 23 * 60 + 10,
      locationId: 'the_rooftops',
      publicCopy:
        'A crow lands on the rail with half a folded sheet in its beak. The note gives a place, an hour, and one word that has never once meant what it says.',
      directorNotes:
        'He tells you what his right eye does and what he intends to do with it, and mentions in passing that he has already taken it to the old man in the bandages, through the proper door, like a citizen. He is pleased with himself about that part.',
      setsFlags: ['knows:kotoamatsukami'],
      cancelledByFlags: ['shisui_died'],
      requiresFlags: ['spoke:shisui'],
      movesCharacters: [{ characterId: 'shisui', toLocationId: 'the_rooftops' }],
    },
    {
      id: 'we_root_makes_contact',
      atWorldMinute: 2 * 1440 + 6 * 60,
      locationId: 'anbu_ready_room',
      publicCopy:
        'There is a name on the assignment board that is not a name, beside a time, beside your code. Nobody in the room looks at it and nobody in the room has failed to see it.',
      directorNotes:
        'The first proper conversation with Danzo. He asks for nothing. He praises the speed at which the boy reaches necessary conclusions and poses one moral problem as though it were small talk. The door is left open and no debt is created yet, which is the point.',
      setsFlags: ['danzo_made_contact'],
      cancelledByFlags: ['danzo_dead', 'root_exposed'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_sasuke_asks',
      atWorldMinute: 3 * 1440 + 18 * 60,
      locationId: 'uchiha_house',
      publicCopy:
        'Sasuke waits until his mother has left the room, and then asks, without looking up from his rice, why nobody in this house talks when he is in it.',
      directorNotes:
        'He has been counting. He knows the meetings happen on the nights the house eats early and he knows that has been four nights out of six. He is not frightened yet. He is annoyed, which is much harder to answer.',
      setsFlags: ['sasuke_asked_you_directly'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_shape_of_it'],
      movesCharacters: [{ characterId: 'sasuke', toLocationId: 'uchiha_house' }],
    },
    {
      id: 'we_the_ambush',
      atWorldMinute: 4 * 1440 + 22 * 60 + 40,
      locationId: 'nakano_cliff',
      publicCopy:
        'Four people who are not on any rotation are moving along the river toward the rock, in the order and spacing of a team that has done this before and expects it to take under a minute.',
      directorNotes:
        'This is the largest single branch in the world. It does not fire if Root has been answered for or if Shisui was got out of reach. If the player is not there, do not narrate a rescue and do not soften what is found in the morning.',
      setsFlags: ['shisui_ambushed'],
      cancelledByFlags: ['shisui_safe', 'danzo_dead', 'root_exposed'],
      requiresFlags: ['knows:kotoamatsukami'],
      movesCharacters: [{ characterId: 'shisui', toLocationId: 'nakano_cliff' }],
    },
    {
      id: 'we_izumi_asks',
      atWorldMinute: 5 * 1440 + 15 * 60,
      locationId: 'susuki_teahouse',
      publicCopy:
        'Izumi puts a paper bag on the counter, does not open it, and says that eleven houses have stopped hanging washing out and six have sent children to relatives.',
      directorNotes:
        'She is not asking to be reassured, and she will notice being reassured. She has done the observation work herself and she would like to be told whether she is right. Treating her as an observer changes what she does for the rest of the fortnight.',
      setsFlags: ['izumi_asked'],
      cancelledByFlags: [],
      requiresFlags: ['knows:the_coup_date'],
      movesCharacters: [{ characterId: 'izumi', toLocationId: 'susuki_teahouse' }],
    },
    {
      id: 'we_the_masked_man',
      atWorldMinute: 7 * 1440 + 1 * 60 + 30,
      locationId: 'the_rooftops',
      publicCopy:
        'There is somebody standing on the water tower who was not standing on the water tower, wearing an orange spiral mask with one hole in it, and a shuriken has already gone through where he is.',
      directorNotes:
        'Do not name him and do not resolve him. What the player learns is: an Uchiha-like eye, a phasing they cannot account for, an agenda that wants this village destabilised, and a willingness to help with whatever the player is planning. Information state is "masked Uchiha-like threat" and nothing more.',
      setsFlags: ['knows:the_masked_man'],
      cancelledByFlags: [],
      requiresFlags: ['the_cliff_happened'],
      movesCharacters: [],
    },
    {
      id: 'we_the_ultimatum',
      atWorldMinute: 8 * 1440 + 2 * 60,
      locationId: 'root_chamber',
      publicCopy:
        'A summons arrives at two in the morning with no signature on it, for a room that is not on the plan, and the messenger waits in the street to walk you down.',
      directorNotes:
        'The forecast, then the price. War kills the clan, the brother and a large part of the village; the alternative he offers spares one specific seven-year-old. He marks his own uncertainties honestly, which is what makes it work. He is not omniscient and the scene must not pretend he is.',
      setsFlags: ['the_ultimatum'],
      cancelledByFlags: ['danzo_dead', 'root_exposed', 'coup_stood_down', 'left_the_map'],
      requiresFlags: ['danzo_made_contact'],
      movesCharacters: [],
    },
    {
      id: 'we_the_district_goes_quiet',
      atWorldMinute: 10 * 1440 + 19 * 60,
      locationId: 'uchiha_street',
      publicCopy:
        'Nobody is out. Nine streets, a warm evening, and not one person on a doorstep — and up on the wall, two silhouettes that belong to neither the police nor anybody the police would recognise.',
      directorNotes:
        'Both organisations now believe the other is about to move first, and both are right. Ordinary families are packing. This is atmosphere with a clock in it and should be written from ground level: a shop shut early, a cousin who will not meet your eye, somebody carrying a bag out of a side gate.',
      setsFlags: ['the_district_went_quiet'],
      cancelledByFlags: ['coup_stood_down', 'the_massacre_happened', 'left_the_map'],
      requiresFlags: ['knows:the_coup_date'],
      movesCharacters: [],
    },
    {
      id: 'we_the_coup_goes_ahead',
      atWorldMinute: 12 * 1440 + 21 * 60,
      locationId: 'uchiha_street',
      publicCopy:
        'It starts at nine, without a signal, because the men who did it stopped waiting for one. The police building is taken in eleven minutes and the tower is not taken at all.',
      directorNotes:
        'This is what happens when nobody resolved it. It is not a punishment and the player is not told they failed — they tried, honestly, and forty households moved anyway, which is a thing that happens to people who are thirteen and negotiating with adults. Write it from wherever the player is standing.',
      setsFlags: ['coup_launched', 'it_happened_without_you'],
      cancelledByFlags: ['coup_stood_down', 'the_massacre_happened', 'left_the_map', 'you_led_it', 'danzo_dead'],
      requiresFlags: ['knows:the_coup_date'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_which_of_them_you_betray',
      kind: 'FINALE',
      label: 'Which of the two houses you end up betraying',
      seedHint: 'A mask in a school satchel, under a folded jacket, four rooms from where a seven-year-old sleeps.',
      payoffHint: 'One night in which forty households find out what the boy they were all counting on had actually decided.',
      weight: 1,
    },
    {
      id: 'p_the_friend',
      kind: 'RELATIONSHIP',
      label: 'Whether the one person who talks to you like a person survives the fortnight',
      seedHint: 'He is always slightly higher than whoever he is talking to, and never seems to have climbed.',
      payoffHint: 'Four people moving along a river in the spacing of a team that expects it to take under a minute.',
      weight: 0.95,
    },
    {
      id: 'p_what_sasuke_believes',
      kind: 'RELATIONSHIP',
      label: 'What your brother ends up believing about his own family',
      seedHint: 'Four practice shuriken laid out in the dirt in a row, arranged by how good the throw was.',
      payoffHint: 'Somebody explains this fortnight to a seven-year-old, and whoever that is decides the next ten years of him.',
      weight: 0.9,
    },
    {
      id: 'p_deciding_for_people',
      kind: 'THEME',
      label: 'When protecting somebody becomes taking their choice away',
      seedHint: 'A friend says, lightly, that you have started deciding things about him, and then does not laugh at the end of it.',
      payoffHint: 'Everybody it was done for finds out it was done for them, at the point where none of them can do anything about it.',
      weight: 0.85,
    },
    {
      id: 'p_the_man_in_the_bandages',
      kind: 'RIVAL',
      label: 'The one man in this village who talks to you as an equal',
      seedHint: 'He has never asked you for anything, and he has been right about two risks everybody else dismissed.',
      payoffHint: 'Ten months of watch rotations on forty households, signed by a chain of command that is on no chart.',
      weight: 0.8,
    },
    {
      id: 'p_the_masked_one',
      kind: 'MYSTERY',
      label: 'Something with an Uchiha eye that is not in the clan register',
      seedHint: 'A shuriken passes through where somebody is standing, and he does not move.',
      payoffHint: 'Whatever it wants, it wants this village unsteady, and it is prepared to help you with almost anything.',
      weight: 0.55,
    },
  ],
  /**
   * The battlefield at four, which is the whole of the life before this
   * fortnight compressed into the one thing it left behind.
   *
   * The bible asks for an "early war belief" stored at the start and read back
   * later by Shisui, Fugaku, Danzo and Hiruzen. That is a build option: it is
   * decided before the player knows the world, it is fixed, and every one of
   * these four men will recognise which of them he is talking to.
   */
  archetypes: [
    {
      id: 'arch_water',
      name: 'You Gave Him Water',
      role: 'Empathy and plain speaking',
      summary: 'You knelt down beside a dying man in the wrong uniform and asked whether you were allowed to help, and nobody has ever quite got that out of you.',
      playstyle: ['Talks to people', 'Direct', 'Slow to condemn'],
      blurb: 'You were four, the ground was mud, and the only question you could think of was whether he was allowed to have water. Nine years later you still ask the question first.',
      attributeBonus: { presence: 3, resolve: 1 },
      skillProficiencies: { plain_speech: 3, bearing: 2 },
      startingItems: [{ itemId: 'mikoto_bento', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_uchiha', amount: 8 }],
    },
    {
      id: 'arch_never_again',
      name: 'You Wanted It To Stop',
      role: 'Speed and force',
      summary: 'You decided on that field that the answer was to become strong enough that nobody could ever bring this to your street, and you have been building that ever since.',
      playstyle: ['Fast', 'Decisive', 'Reaches for the throw'],
      blurb: 'You said it out loud, at four, in front of your father: that you would get strong enough to stop this. He has never forgotten it and neither have you, and it has meant something different every year since.',
      attributeBonus: { agility: 3, might: 2 },
      skillProficiencies: { shuriken: 3, taijutsu: 2 },
      startingItems: [{ itemId: 'shuriken_pouch', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_konoha', amount: 8 }],
    },
    {
      id: 'arch_the_board',
      name: 'You Counted The Dead',
      role: 'Planning and tradecraft',
      summary: 'You worked out on that field how many were on each side and which choices had produced the difference, which is a thing four-year-olds do not do and adults noticed you doing.',
      playstyle: ['Analytical', 'Patient', 'Thinks in totals'],
      blurb: 'Somebody in a mask watched a four-year-old count bodies by uniform and arrive at a ratio, and made a note. You have been on a list ever since without ever being told there was one.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { tactics: 3, tradecraft: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_root', amount: 12 }],
    },
    {
      id: 'arch_looked_away',
      name: 'You Looked Away',
      role: 'Genjutsu and distance',
      summary: 'You put it somewhere else and went on with the day, which worked, and which turned out to be a skill with an unusually wide range of applications.',
      playstyle: ['Contained', 'Illusion-heavy', 'Hard to read'],
      blurb: 'You did not cry, you did not ask, and you ate dinner that night. Your mother has thought about that evening more often in nine years than you have.',
      attributeBonus: { arcana: 3, mind: 1 },
      skillProficiencies: { genjutsu: 3, tactics: 1, tradecraft: 1 },
      startingItems: [{ itemId: 'clan_jacket', qty: 1 }],
      startingAbilities: [],
      startingReputation: [],
    },
  ],
  /**
   * You are Itachi. The story says so in its own premise, so the setup screen
   * does not ask.
   *
   * What it does still ask is the battlefield question below, which is the one
   * piece of this that is genuinely the player's: not who you are, but what the
   * war left in you. Nothing here narrows what you may *do* — the clan, the
   * village, your brother and the fortnight are all still open.
   */
  protagonist: {
    kind: 'NAMED',
    name: 'Itachi Uchiha',
    pronouns: 'he/him',
    description:
      'Thirteen. Small for it. Lines under the eyes that nobody that age should have, ' +
      'and a school satchel with something heavier than books in it.',
    setupHeading: 'What kind of Itachi are you?',
  },
  setupFields: [
    {
      id: 'archetype',
      label: 'You were four, on a battlefield, with your father. What did you take away from it?',
      helpText:
        'The one thing the war left in you, which sets what you are good at nine years later. It is fixed for the whole story. It does not decide whether you side with the clan or the village, what you tell your brother, or whether anybody dies this fortnight — none of that is decided here, and all of it is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What do people get wrong about you?',
      helpText: 'The gap between what this village has decided you are and what you actually are. One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. Everyone assumes I am calm. I am not calm, I am slow to move, and those look identical from outside.',
    },
    {
      id: 'how_you_carry_it',
      label: 'Where do you start out standing?',
      helpText: 'A starting lean, not a commitment. You can do the exact opposite in the first hour and every person in this village will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'the_clan', label: 'They are your family and they have been treated as suspects for a decade' },
        { id: 'the_village', label: 'A coup opens the gates to three countries that have been waiting for one' },
        { id: 'your_brother', label: 'Neither. There is a seven-year-old and everything else is arithmetic' },
        { id: 'undecided', label: 'You genuinely do not know, and that is what the fortnight is for' },
        { id: 'neither_of_them', label: 'Both of these institutions have already spent you once' },
      ],
    },
  ],
  /**
   * Where this can end up.
   *
   * Twelve destinations and not one of them is owed. Four are plain losses —
   * the legend turning out to be true, walking out alone, the coup going ahead
   * without you after a fortnight of honest negotiation, and the famous one,
   * which is a tragedy whatever else it is. The endings that need the whole
   * apparatus of the famous version need the player to have built it, and the
   * quiet one where a family eats together is reachable by somebody who spent
   * the fortnight talking to people.
   *
   * The years after this fortnight live in the epilogues, because that is what
   * they are: what a destination turned out to mean, rather than a phase
   * anybody has to play through to earn it.
   */
  endings: [
    {
      id: 'end_the_shadow',
      name: 'The Shadow',
      rarity: 'UNIQUE',
      minTurn: 45,
      requires: {
        flagsSet: ['the_massacre_happened', 'sasuke_believes_the_story', 'left_konoha_rogue'],
        flagsUnset: ['sasuke_knows_the_truth'],
      },
      condition:
        'The famous version. He did it, he made his brother hate him for it on purpose, and he walked out of the village carrying the whole of the reason alone. Write his logic seriously and without hindsight — at thirteen, with the forecast he was given, this was arithmetic. The regret belongs to a much later man and must not be smuggled into this scene.',
      epilogue:
        'He spends nine years in a black coat with red clouds on it, being exactly as frightening as the story requires, and returns twice to check on a boy who is trying to become strong enough to kill him. He manages that. At the very end, having arranged everything, he finds he has one hand free and uses it to touch his brother’s forehead, and dies without correcting a single thing.',
      hint: '',
    },
    {
      id: 'end_truth_before_hatred',
      name: 'Truth Before Hatred',
      rarity: 'RARE',
      minTurn: 42,
      requires: { flagsSet: ['the_massacre_happened', 'sasuke_knows_the_truth'] },
      condition:
        'He did the thing, and then he told his brother why, while his brother was still seven. This is not the softer version. A child who knows exactly what happened and exactly who ordered it is carrying something no seven-year-old should carry, and he does not forgive it, and he does not have to. What he has instead of hatred is a target, and it is an accurate one.',
      epilogue:
        'Sasuke does not cry at the funeral because there is not one. He grows up in a village he knows the true shape of, which makes him unbearable at twelve and formidable at sixteen. He never once tries to kill his brother. He spends eleven years trying to prove, in front of people who do not want to hear it, that his family were murdered by a committee.',
      hint: '',
    },
    {
      id: 'end_shisui_lives',
      name: 'Shisui Lives',
      rarity: 'RARE',
      minTurn: 40,
      requires: { flagsSet: ['shisui_lives', 'coup_stood_down'] },
      condition:
        'The friend survived the cliff and the two of them took the political road together. This is not a clean win and must not be written as one: they compromised the clan into a settlement its angriest quarter regards as a surrender, and both of them are now permanently the boys who sold the Uchiha to the tower. It worked. Nobody is grateful.',
      epilogue:
        'They get two council seats, the district back and a written end to the watch rotation. Yashiro does not speak to either of them again. Shisui takes the assignments nobody wants for four years and is very funny about it. Every so often the two of them go back up to the rock over the river and have the same argument, which neither has ever won.',
      hint: '',
    },
    {
      id: 'end_root_falls',
      name: 'Root Falls',
      rarity: 'UNCOMMON',
      minTurn: 35,
      requires: { flagsSet: ['root_exposed'], flagsUnset: ['the_massacre_happened'] },
      condition:
        'Ten months of signed rotations went onto a desk in front of people who could not un-see them, and an organisation that was disbanded four years ago turned out to have a payroll. What this ending is about is that a thirteen-year-old did the thing four grown men in that building should have done first, and everybody in the room knows it.',
      epilogue:
        'It takes nine weeks, two closed sessions and one resignation that is described as retirement. The clan gets its rotation cancelled and reads that as the first thing the village has given them in a decade rather than as a favour. Hiruzen keeps the ledger in his desk on top of a settlement he drafted fourteen months ago and never tabled, and looks at both most mornings.',
      hint: 'He will not move on an accusation. He will move on a document.',
    },
    {
      id: 'end_uchiha_peace',
      name: 'The Settlement',
      rarity: 'RARE',
      minTurn: 45,
      requires: {
        flagsSet: ['coup_stood_down', 'a_settlement'],
        minRelationship: [{ characterId: 'fugaku', dimension: 'trust', value: 62 }],
      },
      condition:
        'Both institutions ended up in the same room with a document on the table and neither of them got what they came for. Write the politics rather than the reconciliation — the clauses, the seats, who signs first, which four men walk out. The clan is alive and about a third of it thinks this was the worst possible outcome.',
      epilogue:
        'The Police Force gets actual jurisdiction and hates the paperwork. Two Uchiha sit on a council that finds reasons not to schedule things. It holds, imperfectly, for years, which is the most anybody involved was realistically owed. Fugaku never says thank you and takes to describing his elder son, at meetings, as the clan’s negotiator, which from him is enormous.',
      hint: '',
    },
    {
      id: 'end_fugakus_son',
      name: 'Fugaku’s Son',
      rarity: 'RARE',
      minTurn: 45,
      requires: { flagsSet: ['coup_launched', 'you_led_it', 'the_clan_holds_konoha'] },
      condition:
        'He decided his father was right, and gave him everything the tower had. The coup succeeded because an ANBU captain handed over the gate rotations. Now the hard part: this is a story about governing something you took, and the people who took it with you include three men who wanted revenge rather than representation and are now in the building.',
      epilogue:
        'The tower falls in eleven minutes and the next four years take considerably longer. Two countries test the border inside a month. Yashiro has to be removed from the council by people who put him there. The village survives, smaller and stranger, run by a clan that is discovering how much of the old leadership’s slowness was load-bearing.',
      hint: '',
    },
    {
      id: 'end_two_brothers_leave',
      name: 'Two Brothers Leave',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['left_with_sasuke', 'left_the_map'] },
      condition:
        'He picked up his brother and walked out of the south gate and let both institutions sort themselves out. This costs everything else — mother, father, friend, forty households, and any version of himself that gets to find out how it ended. It is also the only ending in which the person he cared most about is definitely alive and definitely with him.',
      epilogue:
        'They are three countries away before anybody stops arguing about whose failure it was. Sasuke is furious for four months and asks the same question every night, and gets a real answer every night, which is new. Neither of them ever finds out for certain what happened in the district, and they hear four different versions over the years, and none of them is right.',
      hint: '',
    },
    {
      id: 'end_mikotos_table',
      name: 'Mikoto’s Table',
      rarity: 'UNCOMMON',
      minTurn: 48,
      requires: {
        flagsSet: ['coup_stood_down', 'stayed_in_konoha'],
        minRelationship: [{ characterId: 'mikoto', dimension: 'trust', value: 75 }],
      },
      condition:
        'The deliberately small one. Nothing was solved by anybody heroic; it was talked down over several weeks by a family that started including each other, and the last scene is four people eating in the same room on an ordinary evening. Play it small and domestic and do not have anybody make a speech about what was nearly lost.',
      epilogue:
        'She puts a box on the shelf at half past five and somebody takes it. Sasuke gets his hour at the posts most weeks and is insufferable about his progress. Fugaku still checks the drawer, once now rather than twice. Nobody in the house ever refers to that fortnight directly, and all four of them can date the exact evening it stopped.',
      hint: '',
    },
    {
      id: 'end_the_clan_killer',
      name: 'The Clan Killer',
      rarity: 'UNCOMMON',
      minTurn: 42,
      requires: { flagsSet: ['the_legend_is_true'] },
      condition:
        'The village’s version turns out to be accurate. He did it, and not for peace, and not for his brother — for the thing the men in the room under the village always suspected was in him and kept calling maturity. Do not supply a hidden noble motive. The world does not know it is right about him and behaves exactly as it would either way, which is the horror of it.',
      epilogue:
        'The record says he killed his clan to measure himself and it is, for once, exactly what happened. Sasuke believes the record. So does Kakashi, who was on the roof that week and has spent years wondering what he might have said. There is nobody left alive who thinks there was more to it, because there was not.',
      hint: '',
    },
    {
      id: 'end_no_mangekyo',
      name: 'The Eyes He Kept',
      rarity: 'RARE',
      minTurn: 40,
      requires: { flagsSet: ['the_story_has_a_shape'], flagsUnset: ['knows:mangekyo'] },
      condition:
        'A whole fortnight decided, and nothing on that cliff ever happened to him. He came out of this with two ordinary Sharingan and the reputation of somebody who solved a political crisis with paperwork and conversations. Write what he is without the famous power, because this ending exists to show that most of what he did never needed it.',
      epilogue:
        'He goes on being extremely good and stops being spoken about as inevitable, which suits him. There is a technique the clan’s older records describe that he has read about and never seen, and about once a year somebody assumes he has it and he does not correct them. He is thirty-one when the war comes, and he is still there, and his eyes still work.',
      hint: '',
    },
    {
      id: 'end_walked_away',
      name: 'The Boy Who Left',
      rarity: 'COMMON',
      minTurn: 22,
      requires: {
        flagsSet: ['left_the_map'],
        flagsUnset: ['left_with_sasuke', 'the_massacre_happened'],
      },
      condition:
        'He went out of the gate on his own and did not explain it to anybody. Do not redeem this and do not make it tragic on his behalf — it is a coherent thing for a thirteen-year-old to do when two governments have spent two years deciding what he is for. The people it costs most are the ones who were on the step and at the stove.',
      epilogue:
        'The register at the south gate has his code in it and nothing else. Mikoto goes to the booth on the fourth day and reads it herself. Sasuke is told his brother is on a long assignment and works out on his own, at about nine, that this was not true. Whatever happened in the district that month happened without him, and he never learns which version to believe.',
      hint: '',
    },
    {
      id: 'end_it_happened_anyway',
      name: 'It Happened Anyway',
      rarity: 'COMMON',
      minTurn: 38,
      requires: { flagsSet: ['it_happened_without_you'], flagsUnset: ['you_led_it', 'coup_stood_down'] },
      condition:
        'He negotiated honestly for a fortnight with people four times his age and the men with a timetable stopped waiting for anybody. This must not read as a punishment for playing carefully. He did the correct things in the correct order and the correct things were not enough, which is the ordinary way that a thirteen-year-old loses an argument with adults.',
      epilogue:
        'It starts at nine without a signal. The police building goes in eleven minutes and the tower does not go at all, and by the fourth day there are two countries at the border and nobody in Konoha is talking about council seats. He spends that week getting his mother and his brother across three streets, which is the only part of it he ever describes to anybody afterwards.',
      hint: '',
    },
  ],
  opening:
    'Sasuke is on the step, and has been for two hours.\n\n' +
    'You can tell because the shuriken beside him are laid out in the dirt in a row, ordered by how good he thought the throw was, and the pile he is proudest of has eleven in it.\n\n' +
    '"You said maybe today," he says. He does not look up. "You said maybe."\n\n' +
    'Inside, your mother is doing something at the stove that involves a great deal more noise than it needs. That is how she asks.\n\n' +
    'Your bag has the mask in it. In eighty minutes your father expects you under the seventh mat with everything the tower told you this week, and the tower expects a report on Thursday about what happens under the seventh mat.\n\n' +
    'Sasuke picks one up and holds it out to you, handle first, still not looking up.',
  openingSuggestions: [
    'I take it, turn it over once, and point at his grip. "Two fingers, not three. You have been doing it the hard way for two hours." I have got eighty minutes. He can have forty of them.',
    'I sit down on the step beside him instead of going in. "Sasuke. Has anybody at school said anything about our family lately? Anything at all." I keep it light, because I want the honest answer rather than the careful one.',
    '"Not today." I say it plainly and I do not soften it, because softening it is what I did last week and the week before. Then I go inside to my mother. "Is Father still expecting me at eight, or has that moved as well?"',
  ],
  publishedAt: '2026-09-10T05:00:00.000Z',
};

export const ITACHI = StoryVersion.parse(raw);
