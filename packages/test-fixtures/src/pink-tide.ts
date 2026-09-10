import { StoryVersion } from '@aniplay/contracts';

/**
 * "Pink Tide" — Aster Cove, seven nights, and a guest who checked out without
 * leaving.
 *
 * The bible's north star is tonal and it is the thing most likely to break:
 * **the resort has to stay genuinely desirable while something is wrong.** A
 * world that turns grim has thrown away its own premise, and a world whose
 * mystery never bites is a brochure. So the two are built to occupy the same
 * scenes rather than alternate — flirting with somebody who is watching a
 * manager over your shoulder, looking under a cabana while a waiter keeps
 * bringing drinks, pancakes the morning after the worst night of the week.
 *
 * The span is the stay: day one at 14:17 by the infinity pool through the
 * seventh morning at the ferry. Everything before it is fact the world already
 * knows — Adrian's five days, the fall, the cover-up, and a shipment of
 * solvent barrels put into the sea caves eight years ago — and everything
 * after it is epilogue. The clock is a day at a resort, so a run that never
 * investigates still has somewhere to be at four in the afternoon.
 *
 * Three variables, and Ease is the only GOOD_HIGH because the vacation is the
 * resource: sun, sleep, a long lunch, an afternoon that nobody needs anything
 * from you for. Every investigating ability spends it, which is the mechanical
 * version of the design rule — chasing this costs you the week you paid for.
 * Heat is first among the descending pair (the generic cost path and
 * PUBLIC_VIOLENCE both take the first GOOD_LOW in array order, and management
 * noticing you is exactly the right consequence for a scene at a pool), and
 * Tab is the resort's own pressure: everything here can be put on the room,
 * and the number is waiting at checkout.
 *
 * Adrian is a CharacterDef rather than a quest object because he is alive on a
 * ledge for most of the week and has to be able to talk when he is found —
 * furious, self-justifying, and not a pure hero. Detective Nishimura is not
 * one: she arrives through world events and quest routes, and giving her
 * voiceSamples would make the police a companion rather than a consequence.
 *
 * BLANK protagonist. An adult on holiday inventing themselves for a week is
 * the premise's own subject, and section 61 of the bible is explicit about it:
 * what do people become when nobody from their real life is watching.
 */

const raw = {
  id: 'sv_pink_tide_1',
  storyId: 'story_pink_tide',
  version: 1,
  title: 'Pink Tide',
  fantasyLabel: 'Paradise. One week. One missing man.',
  hook: 'You came to Aster Cove for seven nights of sun. Forty minutes after check-in, the pink-haired host who splashed you at the pool tells you a guest has been missing for three days and management insists he checked out this morning.',
  premise:
    'Aster Cove is an adults-only resort island forty minutes by fast ferry from the southern Japanese coast, and at 2:17 in the afternoon the white stone around its infinity pool is hot enough to hurt.\n\n' +
    'You have been here forty minutes. You have not unpacked. The water is the colour the brochure promised, there is music coming off the beach club, and somebody in the shallow end has just splashed you on purpose.\n\n' +
    'Her name is Sora, her hair is bubblegum pink, and she has decided your vacation posture is unacceptable.\n\n' +
    'Twenty minutes later, after a drink you did not order and a swim you did not plan, her smile drops for exactly one second as an assistant manager crosses the deck behind you.\n\n' +
    'Then she asks whether you want to hear something weird.\n\n' +
    'A guest called Adrian Vale checked out this morning at ten past eight. The problem is that she saw his blue equipment bag locked inside the watersports shed at half past nine, which means the resort’s own records are wrong about where he is. She has told nobody else, and she is watching your face to see what you do with it.\n\n' +
    'Nobody has reported him missing, the tide fills the eastern caves twice a day, and on Sunday morning you get on a ferry either way. If you decide this is not your week for it, that is a real answer, and the island will simply carry on being the best place you have ever stayed.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Mystery', 'Slice of life', 'Thriller'],
  mechanicsChips: [
    'Flirt, swim, or investigate',
    'Every guest is hiding something',
    'Clues never change to suit you',
    'The resort notices you',
    'Leaving early is an ending',
  ],
  contentDescriptors: ['ROMANCE', 'SUGGESTIVE_THEMES', 'ALCOHOL_REFERENCES', 'PSYCHOLOGICAL_THEMES', 'MORAL_AMBIGUITY'],
  intensity: 'MODERATE',
  creatorNote:
    'You can spend seven days at this pool and never once look into any of it, and that is a real way to play — the world will resolve without you and Sora will text you about it afterwards. The trick this world is built around is that both halves live in the same scene: she flirts with you while watching a manager over your shoulder, and the morning after the worst night of the week the breakfast is still excellent. Nothing here is supernatural, nobody is a serial killer, and the man who caused all of this panicked rather than planned.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: false,
    allowsRomance: true,
    startingLocationId: 'infinity_pool',
    startWorldMinute: 14 * 60 + 17,
    startingItems: [{ itemId: 'room_key', qty: 1 }, { itemId: 'phone', qty: 1 }],
    hardCanon: [
      'Aster Cove is an adults-only resort island forty minutes by fast ferry from Kagetsu. Everybody in this world is an adult and the player is between twenty-one and twenty-nine.',
      'Adrian Vale fell from a service ledge above east cove two nights before the player arrived, during a struggle over his camera with assistant manager Eli Mercer. Eli did not go there intending to hurt him.',
      'Adrian is alive on a tidal shelf in the sea cave beneath east cove, with a broken wrist, a deep leg cut, concussion symptoms and an old maintenance cache of water and first aid. He can die if enough time passes.',
      'Eli faked the checkout: the room, the bill, the ferry log, a distant camera shot of somebody in Adrian’s hat, the phone left by the pool, the blue bag in the watersports shed. He does not know whether Adrian survived.',
      'Eight years ago the parent company stored industrial solvent barrels in the east cove sea caves after a mainland logistics emergency. At least two ruptured. A contracted dive worker became ill and the matter was settled quietly. The contamination is localised: the rest of the island and its water are genuinely fine.',
      'Sora was near east cove the night Adrian fell, meeting Luka Reyes, and heard two male voices and an impact. She hid it because the area is restricted, because Luka could be fired, and because she was embarrassed. She does not know a crime happened.',
      'Nothing in this world is supernatural. The pink tide is bioluminescent plankton, the lighthouse is not haunted, and there is no cult, no serial killer and no secret order.',
      'Phones, wifi and ferries work. The mystery survives technology; it does not depend on a dead zone.',
      'Clues do not mutate. A timestamp, a photograph, an object’s location or a statement stays what it was unless a character physically changes it, and the story never rewrites evidence because the player guessed early.',
    ],
    toneGuide:
      'Bright, expensive and specific: white stone hot underfoot, a swim-up bar, cold glasses sweating on a tray, linen shirts, music carrying over water, room-service pancakes, a paddleboard at sunset. Write the pleasure with the same care as the dread and never apologise for it. ' +
      'The horror is daylight horror. A bloodstain under a white cabana at nine in the morning while somebody twenty feet away orders mango pancakes, a security camera pointed politely away, a key that stops working for four hours. Nothing lurks. ' +
      'Everybody here is escaping something and almost none of it is the crime: debt behind an influencer’s brand, a surgeon whose spouse left him a fortnight before the anniversary trip, a dive instructor running unauthorised dawn dives for cash. A lie is not a confession. ' +
      'Sora is deliberately gorgeous and completely comfortable about it, and the prose should establish that strongly and then let expression and behaviour carry it rather than describing her chest every time she walks in. ' +
      'Staff and guests are different species sharing a building. A uniform is close to invisible, which is how a man moved a dead man’s luggage through a lobby at eight in the morning without anybody looking twice.',
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 11, agility: 13, mind: 13, presence: 13, resolve: 12, arcana: 3 },
  skills: [
    { id: 'charm', name: 'Charm', attribute: 'presence', description: 'Being fun to be around, and the specific talent of getting a stranger on a boat with you by four o’clock.' },
    { id: 'read_people', name: 'Read People', attribute: 'mind', description: 'Who is lying, who is frightened, who has been awake since three, and which of those is about the thing you care about.' },
    { id: 'water', name: 'Water', attribute: 'might', description: 'Swimming, diving, boards, boats, surf and the honest question of whether you should be in this particular water at this particular hour.' },
    { id: 'notice', name: 'Notice', attribute: 'mind', description: 'The bag that should not be there, the watch that is missing from the footage, the towel that moved while you were at lunch.' },
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Walking through a door marked staff only, and staying calm while somebody in a blazer asks you politely what you are doing.' },
    { id: 'money', name: 'Money', attribute: 'presence', description: 'What a tip, a charter, a bar tab or an upgrade can buy on an island where everything is billed to the room.' },
    { id: 'stamina', name: 'Stamina', attribute: 'resolve', description: 'Three hours of sleep, a full day of sun and doing it again, which is most of what a week like this actually asks.' },
  ],
  resources: [
    {
      id: 'ease',
      name: 'Ease',
      max: 100,
      start: 74,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'You are on the most beautiful island you have ever paid to visit and you have not looked at it in two days. You are sunburnt, four hours short of sleep, jumpy with people who are simply doing their jobs, and no longer any fun at all — which is the one thing that makes a stranger tell you something at a bar.',
      color: '#37B3C9',
      bands: [
        {
          upTo: 22,
          behaviour:
            'Wrecked. Salt in everything, no sleep, and the specific paranoia of a person who has spent a holiday watching staff. People stop offering you things. Sora notices before you do and stops asking you to swim.',
        },
        {
          upTo: 55,
          behaviour:
            'Running on it. You are keeping up with the week and not enjoying much of it. Fine for one more late night, honest about not being fine for two, and one long lunch would fix more than another hour in a service corridor.',
        },
        {
          upTo: 82,
          behaviour:
            'On holiday, properly. Rested, sunned, unhurried, and easy to talk to — which is worth more here than any amount of nerve, because everything in this world is told to somebody who seemed pleasant to sit next to.',
        },
        {
          upTo: 100,
          behaviour:
            'The vacation people are actually sold. You have slept, swum, eaten well and stopped checking the time. Everybody wants you at their table, and the island is doing exactly what you paid for.',
        },
      ],
    },
    {
      id: 'heat',
      name: 'Heat',
      max: 100,
      start: 6,
      regenPerHour: -1.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence: '',
      color: '#E4693C',
      bands: [
        {
          upTo: 20,
          behaviour:
            'A guest. Nobody in a blazer has any idea who you are, doors are held for you, and the whole island runs on the assumption that you are here to enjoy yourself.',
        },
        {
          upTo: 48,
          behaviour:
            'Noticed. Somebody has mentioned you in a staff briefing. Service stays perfect and gets a half-second slower, a manager knows your room number, and the door you walked through yesterday is now locked at the same hour.',
        },
        {
          upTo: 74,
          behaviour:
            'A problem being managed. Your key stops working and gets apologised for. Somebody watches you at breakfast. Staff who liked you go careful, because being seen talking to you now costs them something.',
        },
        {
          upTo: 100,
          behaviour:
            'Handled. There is a folder about you: a complaint, a trespass note, an offer of an early ferry with the balance waived. Reika has read it. Marcus has been told your name, and Eli has stopped bothering to be subtle.',
        },
      ],
    },
    {
      id: 'tab',
      name: 'The Tab',
      max: 100,
      start: 10,
      regenPerHour: 0,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence: '',
      color: '#D8A23A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Ordinary. Drinks, lunch, one excursion. Nothing here is going to be a conversation when the folder arrives under your door on the last morning.',
        },
        {
          upTo: 58,
          behaviour:
            'Generous. Rounds for the rooftop, a private charter, tips large enough that staff remember your name — which buys real access here, and is also the reason somebody upstairs now knows exactly how much you are spending and on whom.',
        },
        {
          upTo: 100,
          behaviour:
            'A number you will think about on the ferry. It bought boats, silence, favours and one door that should not have opened, and at least one person has worked out that money is how you solve things and priced you accordingly.',
        },
      ],
    },
  ],
  items: [
    {
      id: 'room_key',
      name: 'Your Room Key',
      tags: ['gear'],
      questItem: false,
      droppable: false,
      description: 'A white card in a paper sleeve with your room number written on it in blue biro. It opens your door, the pool gate, the beach club and the gym, and nothing else on this island.',
      loreText: 'It is also a record. Every door it touches is a line in a system that somebody in management can read, which has not occurred to you yet and has occurred to somebody else.',
      icon: 'key',
    },
    {
      id: 'phone',
      name: 'Your Phone',
      tags: ['gear'],
      questItem: false,
      droppable: false,
      description: 'Full signal everywhere except one place on this island. Camera, notes, the group chat you are ignoring, and eleven photographs of a pool.',
      loreText: 'Nothing about this world requires you to lose it. The mystery here survives having a working phone, which is the point.',
      icon: 'phone',
    },
    {
      id: 'the_blue_bag',
      name: 'Adrian’s Blue Bag',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'A blue waterproof equipment bag, scuffed at the corners, sitting inside a shed that was locked. A dive slate, a torn page from a waterproof notebook, and a chalky grey residue in the seams that does not come from this beach.',
      loreText: 'It is the only physical object on the island that flatly contradicts the resort’s own records, which is why it does not stay where it is.',
      icon: 'bag',
    },
    {
      id: 'the_notebook_page',
      name: 'The Torn Page',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { notice: 2 },
      description: 'Half a page of waterproof notebook in small hard handwriting. Four dates, a barrel count, the word CACHE underlined twice, and a phone number with a Kagetsu prefix.',
      loreText: 'The number belongs to a marine biologist who has been regretting giving it out for about nine days.',
      icon: 'papers',
    },
    {
      id: 'celestes_photos',
      name: 'The Lobby Set',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'Thirty-one mirror photographs taken in the lobby between eight and half past, most of them of a woman in a green dress. In four of them, behind her, a man in a hat is wheeling a case toward the doors.',
      loreText: 'She will not hand these over easily. Half the frame is unreleased campaign work for a brand that has not paid her yet, and she needs that money considerably more than she lets on.',
      icon: 'camera',
    },
    {
      id: 'the_dive_watch',
      name: 'The Orange Dive Watch',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'Bright orange, rubber strapped, scratched to death, and the single thing Adrian Vale wore every day of his stay. It is not on the man in the checkout footage.',
      loreText: 'Sora remembers it because she made a joke about it on his first afternoon and he laughed and told her it had been in worse water than this.',
      icon: 'watch',
    },
    {
      id: 'the_survey_file',
      name: 'The East Cove Survey',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { read_people: 1 },
      description: 'A sustainability assessment for the marina expansion, printed and bound, with two sample sites in the appendix whose numbers do not match the summary at the front.',
      loreText: 'The woman who wrote it did the sampling honestly and then wrote a summary she could live with. She has thought about those two pages every day since.',
      icon: 'papers',
    },
    {
      id: 'the_flare',
      name: 'The Cache Flare',
      tags: ['gear'],
      questItem: false,
      description: 'An old orange handheld flare from a maintenance cache, sealed, with a date stamped on the cap that is eleven years past.',
      loreText: 'Old flares mostly still work. Mostly is doing a lot of work in that sentence, and anybody who has been on boats knows it.',
      icon: 'flare',
    },
    {
      id: 'the_notebook',
      name: 'Tide & Salt',
      tags: ['quest', 'personal'],
      questItem: true,
      description: 'A cheap ring-bound notebook with a paddleboard sketched on the cover. Equipment costs, three menus, rental pricing, two beach leases near Kagetsu and a page of numbers that very nearly work.',
      loreText: 'She does not show this to guests. If it is in your hands, it is because she decided something about you.',
      icon: 'book',
    },
  ],
  abilities: [
    {
      id: 'be_a_guest',
      name: 'Be A Guest',
      tags: ['social'],
      description: 'Order something, get in the water, laugh at the right time, and let the whole island go back to assuming you are here for the reason everybody else is.',
      affordances: ['relax', 'have a drink', 'act normal', 'enjoy yourself', 'blend in', 'order a cocktail', 'sunbathe'],
      costs: [{ resourceId: 'ease', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 10 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'notice_the_wrong_thing',
      name: 'Notice The Wrong Thing',
      tags: ['sight'],
      description: 'The bag in a locked shed, the towel that moved while you were at lunch, the camera angled politely away from one path. Small, specific and never proof on its own.',
      affordances: ['look closer', 'notice', 'check', 'what is off', 'examine', 'scan the room', 'look around'],
      costs: [{ resourceId: 'ease', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'notice', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'flirt_like_you_mean_it',
      name: 'Flirt Like You Mean It',
      tags: ['social'],
      description: 'The island’s native language. It opens more here than nerve does, and with one person in particular it is also how she avoids saying anything true.',
      affordances: ['flirt', 'tease', 'charm her', 'lean in', 'banter', 'buy her a drink', 'ask her out'],
      costs: [{ resourceId: 'ease', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'get_in_the_water',
      name: 'Get In The Water',
      tags: ['utility'],
      description: 'Swim, board, snorkel, jump off the back of a boat. Half of this island’s answers are on the other side of a bit of water and all of its pleasure is.',
      affordances: ['swim', 'dive in', 'paddleboard', 'snorkel', 'go for a swim', 'night swim', 'get in'],
      costs: [{ resourceId: 'ease', amount: 9 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'water', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ask_a_staff_member_a_real_question',
      name: 'Ask A Real Question',
      tags: ['social'],
      description: 'Not what time the boat goes. Who was working, what the log says, why that door is locked now when it was not on Tuesday — asked of somebody whose job depends on the answer.',
      affordances: ['ask about', 'question', 'ask the staff', 'find out', 'ask who', 'ask what happened'],
      costs: [
        { resourceId: 'ease', amount: 5 },
        { resourceId: 'heat', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'read_people', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'put_it_on_the_room',
      name: 'Put It On The Room',
      tags: ['utility'],
      description: 'A round for the rooftop, a private charter, a tip that means something to somebody on a seasonal wage. Money is a key on this island and it leaves a record like every other key.',
      affordances: ['pay', 'tip', 'buy a round', 'charter a boat', 'bill it to the room', 'offer money', 'upgrade'],
      costs: [
        { resourceId: 'ease', amount: 3 },
        { resourceId: 'tab', amount: 11 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'presence', skillId: 'money', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_where_guests_do_not',
      name: 'Go Where Guests Do Not',
      tags: ['utility'],
      description: 'A staff corridor, a shed, a survey fence, a cliff path with a sign on it. Nothing here is guarded. It is simply somewhere you are obviously not supposed to be.',
      affordances: ['sneak', 'go backstage', 'service corridor', 'climb the fence', 'break in', 'follow the path', 'restricted area'],
      costs: [
        { resourceId: 'ease', amount: 11 },
        { resourceId: 'heat', amount: 13 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'document_it_properly',
      name: 'Document It Properly',
      tags: ['utility'],
      description: 'Photograph it where it lies, with something in frame for scale and the time on it. The difference between a thing you saw and a thing that exists after somebody moves it.',
      affordances: ['photograph', 'take a picture', 'record it', 'document', 'get evidence', 'film it', 'timestamp'],
      costs: [
        { resourceId: 'ease', amount: 7 },
        { resourceId: 'heat', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'notice', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'push_somebody_who_is_lying',
      name: 'Push Somebody Who Is Lying',
      tags: ['social'],
      description: 'Name the inconsistency out loud and stay in the chair. It works. It also tells them precisely how much you know, and on this island that travels by dinner.',
      affordances: ['confront', 'call them out', 'press', 'accuse', 'push back', 'say what you know', 'challenge'],
      costs: [
        { resourceId: 'ease', amount: 9 },
        { resourceId: 'heat', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'read_people', baseDc: 15 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_out_in_it',
      name: 'Go Out In It',
      tags: ['utility'],
      description: 'Night water, a cliff path in wind, a cave that is only open around low tide. This is the one thing on this island that can actually hurt you, and it does not care how good a swimmer you are.',
      affordances: ['go anyway', 'swim out', 'in the storm', 'at night', 'into the cave', 'dive the cove', 'push on'],
      costs: [
        { resourceId: 'ease', amount: 17 },
        { resourceId: 'heat', amount: 7 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'water', baseDc: 16 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'sit_with_her_when_she_is_not_being_fun',
      name: 'Sit With Her Anyway',
      tags: ['social'],
      description: 'She twists the star earring and offers you an activity, and you decline the activity and stay. Nothing gets solved. It is the single most important thing anybody does for her all week.',
      affordances: ['stay with her', 'let it be quiet', 'just sit', 'do not joke', 'be there', 'hold her', 'listen'],
      costs: [{ resourceId: 'ease', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'read_people', baseDc: 13 },
      unlockedByDefault: false,
      requires: { flagsSet: ['knows:the_earring'], flagsUnset: [] },
      tendencies: [],
      countersTendency: null,
    },
  ],
  locations: [
    {
      id: 'infinity_pool',
      name: 'The Infinity Pool',
      shortName: 'The Pool',
      description:
        'Forty metres of turquoise with no visible far edge, so the water appears to run straight into the ocean. White stone hot enough to punish bare feet, twelve cabanas, a swim-up bar, and music at a volume somebody has thought about carefully. This is the emotional centre of the island and everybody ends up here by four.',
      artDirection:
        'Enormous luxury infinity pool at a tropical resort merging visually into turquoise ocean, white stone deck, white cabanas with gauze curtains, palms, a swim-up bar, bright afternoon sun, a scatter of adult guests. Glossy, expensive, inviting.',
      connections: [
        { to: 'the_lobby', travelMinutes: 2, label: 'Up to the lobby' },
        { to: 'beach_club', travelMinutes: 4, label: 'Down to the sand' },
        { to: 'your_room', travelMinutes: 5, label: 'Back to your room' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'celestes_photos', qty: 1, ownerId: 'celeste', aka: ['the photos', 'the frames', 'the lobby set', 'her pictures'] },
      ],
    },
    {
      id: 'the_lobby',
      name: 'The Lobby',
      shortName: 'The Lobby',
      description:
        'Cool marble after the heat, a wall of glass onto the water, orchids that are replaced every second day, and a front desk with three people behind it who have never once said no to anybody. The lifts to the towers are on the left. The doors to the ferry road are behind you, and a camera above them is pointed at the desk rather than the doors.',
      artDirection:
        'Grand tropical resort lobby, cool marble floor, floor-to-ceiling glass onto the sea, orchids, a long reception desk with uniformed staff, luggage trolleys, warm daylight. Polished, expensive, quietly busy.',
      connections: [
        { to: 'infinity_pool', travelMinutes: 2, label: 'Out to the pool' },
        { to: 'your_room', travelMinutes: 3, label: 'The lifts' },
        { to: 'rooftop_bar', travelMinutes: 3, label: 'The lift to the roof' },
        { to: 'service_corridors', travelMinutes: 1, label: 'The door marked staff only' },
        { to: 'ferry_dock', travelMinutes: 6, label: 'The road to the dock' },
        { to: 'adrian_room', travelMinutes: 3, label: 'Ocean Tower, eighth floor' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [],
    },
    {
      id: 'your_room',
      name: 'Your Room',
      shortName: 'Your Room',
      description:
        'Better than you expected. A bed you could lose somebody in, a balcony over the palms, a mini bar you have already opened, and a bathroom with a window onto the sea. It is the only door on this island that is yours, which is why it matters so much when something in it has been moved.',
      artDirection:
        'Luxurious tropical resort suite, white linen, dark wood, open balcony doors onto palms and ocean, sheer curtains moving in the breeze, an unpacked suitcase. Warm late-afternoon light.',
      connections: [
        { to: 'the_lobby', travelMinutes: 3, label: 'Down to the lobby' },
        { to: 'infinity_pool', travelMinutes: 5, label: 'Out to the pool' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: -1 },
      takeableItems: [],
    },
    {
      id: 'beach_club',
      name: 'The Beach Club',
      shortName: 'The Beach',
      description:
        'White sand, sixty loungers, a volleyball net that gets serious after five, paddleboards stacked by colour, and a kitchen doing plates of grilled fish and cold beer until sunset. At night there is a bonfire and a DJ and a great deal of behaviour that nobody will mention at breakfast.',
      artDirection:
        'Beach club on white sand, rows of loungers and parasols, a volleyball net, stacked paddleboards and kayaks, a low timber bar, turquoise shallows, bright sun. Relaxed, stylish, busy.',
      connections: [
        { to: 'infinity_pool', travelMinutes: 4, label: 'Up to the pool' },
        { to: 'watersports_shed', travelMinutes: 2, label: 'The shed at the end' },
        { to: 'dive_centre', travelMinutes: 3, label: 'The dive centre' },
        { to: 'pink_tide_shore', travelMinutes: 6, label: 'Along the sand, away from the lights' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'watersports_shed',
      name: 'The Watersports Shed',
      shortName: 'The Shed',
      description:
        'Timber, salt-bleached, padlocked at night. Boards, fins, buoyancy jackets, two jet skis on trailers and a smell of neoprene and sunscreen. There is a blue equipment bag in here that belongs to a man the resort says left this morning.',
      artDirection:
        'Salt-bleached timber watersports shed at a resort beach, paddleboards and fins racked, wetsuits hanging, jet skis on trailers, bright sun through open doors, a blue waterproof equipment bag on a low shelf.',
      connections: [
        { to: 'beach_club', travelMinutes: 2, label: 'Back to the loungers' },
        { to: 'dive_centre', travelMinutes: 2, label: 'The dive centre' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 1 },
      takeableItems: [
        { itemId: 'the_blue_bag', qty: 1, ownerId: null, aka: ['the bag', 'the blue bag', 'adrian’s bag', 'equipment bag'] },
        { itemId: 'the_notebook_page', qty: 1, ownerId: null, aka: ['the page', 'torn page', 'the notebook page', 'the paper in the bag'] },
      ],
    },
    {
      id: 'dive_centre',
      name: 'The Dive Centre',
      shortName: 'Dive Centre',
      description:
        'Tanks in racks, a compressor that runs at seven, a whiteboard with tide times and today’s sites, and a laminated map of the coast with one area politely crossed out. Luka runs it, mostly alone, and knows more about the water around this island than anybody who has ever managed it.',
      artDirection:
        'Resort dive centre, scuba tanks racked in rows, wetsuits on hangers, a whiteboard with tide times, a laminated coastal map on the wall, an open roller door onto the beach. Practical, salty, sunlit.',
      connections: [
        { to: 'beach_club', travelMinutes: 3, label: 'Back along the sand' },
        { to: 'watersports_shed', travelMinutes: 2, label: 'The shed' },
        { to: 'the_marina', travelMinutes: 4, label: 'Round to the marina' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 2 },
      takeableItems: [],
    },
    {
      id: 'rooftop_bar',
      name: 'The Rooftop Bar',
      shortName: 'The Rooftop',
      description:
        'Eleven floors up, open to the sky, a pool you are not supposed to swim in and a view of the whole island — the pool, the beach, the marina lights, and the dark unlit stretch of coast to the east that nobody has explained to you. June works the late shift and remembers who left with whom.',
      artDirection:
        'Rooftop bar of a tropical resort at night, low glowing tables, a lit shallow pool, a long bar with a bartender, string lights, the dark ocean and island coastline beyond. Glamorous, warm, adult.',
      connections: [
        { to: 'the_lobby', travelMinutes: 3, label: 'The lift down' },
        { to: 'staff_backstep', travelMinutes: 2, label: 'The door behind the bar' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: -2 },
      takeableItems: [],
    },
    {
      id: 'service_corridors',
      name: 'The Service Corridors',
      shortName: 'Backstage',
      description:
        'Bare concrete and strip light behind all that marble. Laundry carts, a staff lift, dry storage, a whiteboard rota and a bank of monitors in a room with a door that is usually open. Nobody here is hiding anything. They simply stop seeing you the moment you are wearing the right shirt.',
      artDirection:
        'Back-of-house resort service corridor, bare concrete floor, strip lighting, laundry carts and linen shelves, a staff lift, a rota whiteboard, a security monitor room glimpsed through an open door.',
      connections: [
        { to: 'the_lobby', travelMinutes: 1, label: 'Out into the lobby' },
        { to: 'staff_backstep', travelMinutes: 2, label: 'The step where staff smoke' },
        { to: 'adrian_room', travelMinutes: 3, label: 'The staff lift to eight' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 0, y: -2 },
      takeableItems: [],
    },
    {
      id: 'staff_backstep',
      name: 'The Staff Backstep',
      shortName: 'The Backstep',
      description:
        'Three concrete steps, a bin, an ashtray and a view of the generator. It is where every real conversation on this island happens: who is leaving, who is sleeping with whom, who got shouted at, and which manager has been strange all week.',
      artDirection:
        'Quiet back-of-house step behind a resort building at dusk, concrete steps, a bin and ashtray, service pipes and a generator housing, one or two uniformed staff sitting down. Unglamorous, honest, warm light.',
      connections: [
        { to: 'service_corridors', travelMinutes: 2, label: 'Back inside' },
        { to: 'rooftop_bar', travelMinutes: 2, label: 'Up behind the bar' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: -3 },
      takeableItems: [
        { itemId: 'the_notebook', qty: 1, ownerId: 'sora', aka: ['the notebook', 'tide and salt', 'her plans', 'the business notebook'] },
      ],
    },
    {
      id: 'adrian_room',
      name: 'Ocean Tower 808',
      shortName: 'Room 808',
      description:
        'Cleaned to a standard the rest of the hotel does not quite reach. Bed made, surfaces wiped, nothing on the desk. A charger still in the wall behind the nightstand, a cheap shirt fallen behind a drawer, a bandage wrapper in the bin liner, and not nearly enough mess for a man who packed for himself.',
      artDirection:
        'Immaculately cleaned resort hotel suite with the curtains open onto the sea, bed made too perfectly, empty desk, one phone charger still plugged in behind the nightstand. Bright, still, faintly wrong.',
      connections: [
        { to: 'the_lobby', travelMinutes: 3, label: 'Down to the lobby' },
        { to: 'service_corridors', travelMinutes: 3, label: 'The staff lift' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: -1, y: -2 },
      takeableItems: [
        { itemId: 'the_dive_watch', qty: 1, ownerId: null, aka: ['the watch', 'orange watch', 'dive watch'] },
      ],
    },
    {
      id: 'the_marina',
      name: 'The Marina',
      shortName: 'The Marina',
      description:
        'Forty berths, a fuel dock, two resort launches and a row of private boats belonging to people who did not come here on the ferry. The staff boat leaves at six and returns at eleven, and the log of who was on it is kept in a book rather than a computer.',
      artDirection:
        'Small luxury resort marina at golden hour, pontoons and cleats, two white resort launches and several private yachts, fuel dock, ropes and fenders, a wooden logbook on a lectern by the gate.',
      connections: [
        { to: 'dive_centre', travelMinutes: 4, label: 'Along to the dive centre' },
        { to: 'ferry_dock', travelMinutes: 3, label: 'Round to the ferry berth' },
        { to: 'east_cove', travelMinutes: 12, label: 'By water, east along the coast' },
        { to: 'the_villas', travelMinutes: 5, label: 'Up to the villas' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -3, y: 2 },
      takeableItems: [],
    },
    {
      id: 'ferry_dock',
      name: 'The Ferry Dock',
      shortName: 'The Dock',
      description:
        'A covered berth, a bench, a luggage trolley and a board with four crossings a day on it. Forty minutes from here to Kagetsu and everything that is waiting for you there. Every arrival and departure on this island is a moment somebody watches.',
      artDirection:
        'Covered ferry berth at a resort island, timber decking, a departures board, luggage trolleys, a fast catamaran ferry alongside, ocean beyond, bright hard sunlight.',
      connections: [
        { to: 'the_lobby', travelMinutes: 6, label: 'The road up to the hotel' },
        { to: 'the_marina', travelMinutes: 3, label: 'Along to the marina' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: -1 },
      takeableItems: [],
    },
    {
      id: 'the_villas',
      name: 'The Private Villas',
      shortName: 'The Villas',
      description:
        'Forty of them along the headland, each with a plunge pool, a golf buggy and a gate. The people staying in these are not on holiday in the way everybody at the pool is; there are meetings happening in at least two of them this week, with printed papers on the table.',
      artDirection:
        'Row of private resort villas along a headland, white walls and timber decks, individual plunge pools, bougainvillea, golf buggies on a path, sea view. Discreet, expensive, quiet.',
      connections: [
        { to: 'the_marina', travelMinutes: 5, label: 'Down to the marina' },
        { to: 'east_cove', travelMinutes: 9, label: 'The headland path east' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -3, y: 0 },
      takeableItems: [
        { itemId: 'the_survey_file', qty: 1, ownerId: 'nami', aka: ['the survey', 'the file', 'the assessment', 'her report'] },
      ],
    },
    {
      id: 'east_cove',
      name: 'East Cove',
      shortName: 'East Cove',
      description:
        'Closed for marina-expansion surveys, which is partly true. A fence, two signs about unstable cliffs, orange survey markers on the rock, and beneath all of it a shoreline so beautiful that closing it is a genuine loss. A service ledge runs along the cliff about four metres above the water.',
      artDirection:
        'Beautiful restricted cove on a resort island, turquoise water and pale cliffs, survey markers and a wire fence with warning signs, a narrow concrete service ledge along the rock, no people. Gorgeous and forbidden.',
      connections: [
        { to: 'the_villas', travelMinutes: 9, label: 'The headland path back' },
        { to: 'the_marina', travelMinutes: 12, label: 'By water, back to the marina' },
        { to: 'lighthouse', travelMinutes: 7, label: 'Up the cliff path' },
        { to: 'sea_cave', travelMinutes: 8, label: 'Down to the water, at low tide' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: -4, y: 0 },
      takeableItems: [],
    },
    {
      id: 'lighthouse',
      name: 'The Old Lighthouse',
      shortName: 'The Lighthouse',
      description:
        'Decommissioned eleven years ago and left standing because it is beautiful. Sun-bleached, salt-eaten, with a keeper’s quarters at the base whose door does not lock properly. Somebody slept in here recently: a rolled mat, three water bottles and a phone charger with no phone.',
      artDirection:
        'Sun-bleached decommissioned lighthouse on a headland, peeling white paint, rusted rail, a small keeper’s quarters at the base with an open door, dry grass, hard blue sky and sea. Beautiful and abandoned.',
      connections: [
        { to: 'east_cove', travelMinutes: 7, label: 'Down the cliff path' },
        { to: 'pink_tide_shore', travelMinutes: 10, label: 'The long way round the shore' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: -4, y: -1 },
      takeableItems: [],
    },
    {
      id: 'sea_cave',
      name: 'The Sea Cave',
      shortName: 'The Cave',
      description:
        'A tidal mouth under the east cliffs that is open around low water and closed the rest of the time. Inside: a shelf of dry rock three metres above the surge, a rusted maintenance cache, and the sound of the sea doing something enormous in the dark. There is almost no phone signal in here. It is the only place on the island where that is true.',
      artDirection:
        'Dark tidal sea cave beneath cliffs, a dry rock shelf above surging water, an old rusted maintenance locker, a shaft of daylight from the tidal mouth, wet stone. Cold, dangerous, real.',
      connections: [
        { to: 'east_cove', travelMinutes: 8, label: 'Out and up, if the tide allows' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: -5, y: 0 },
      takeableItems: [
        { itemId: 'the_flare', qty: 1, ownerId: null, aka: ['flare', 'the flare', 'emergency flare'] },
      ],
    },
    {
      id: 'pink_tide_shore',
      name: 'The Pink Tide Shore',
      shortName: 'The Shore',
      description:
        'Ten minutes along the sand from the beach club, away from every light the resort owns. For a few weeks each year the plankton here glow rose-magenta when the water is disturbed, so every stroke you take leaves light behind you. The resort markets it heavily and it is still, genuinely, the most beautiful thing on the island.',
      artDirection:
        'Dark tropical shoreline at night with rose-pink bioluminescent water glowing where the waves break, silhouetted palms, stars, no artificial light, two sets of footprints in wet sand. Dreamlike and romantic.',
      connections: [
        { to: 'beach_club', travelMinutes: 6, label: 'Back toward the lights' },
        { to: 'lighthouse', travelMinutes: 10, label: 'Round the shore to the headland' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_house',
      name: 'The House',
      description: 'Aster Cove management: Reika Mori, her assistant managers, the front desk and the duty rota. Their job is that four hundred guests a night have the week they paid for, and they are extremely good at it.',
      startingReputation: 20,
      ranks: [
        { atReputation: -40, label: 'A situation' },
        { atReputation: 0, label: 'A guest in room 412' },
        { atReputation: 40, label: 'A guest worth keeping' },
        { atReputation: 70, label: 'Somebody Reika takes calls from' },
      ],
      allies: ['faction_corporate'],
      enemies: [],
    },
    {
      id: 'faction_floor',
      name: 'The Floor',
      description: 'The people who actually run this island: hosts, bartenders, dive instructors, housekeeping, the boat crew. Seasonal wages, shared rooms, and a network that moves information faster than any system management owns.',
      startingReputation: 10,
      ranks: [
        { atReputation: -40, label: 'A guest who gets people fired' },
        { atReputation: 0, label: 'Another guest' },
        { atReputation: 40, label: 'All right, for a guest' },
        { atReputation: 70, label: 'One of ours, nearly' },
      ],
      allies: [],
      enemies: ['faction_corporate'],
    },
    {
      id: 'faction_corporate',
      name: 'Kagetsu Aster Holdings',
      description: 'The parent company: a development executive in a villa, a legal department in Kagetsu, a marina expansion waiting on an environmental sign-off, and an eight-year-old settlement everybody involved would prefer stayed settled.',
      startingReputation: 0,
      ranks: [
        { atReputation: -40, label: 'A liability with a room number' },
        { atReputation: 0, label: 'Nobody’s problem' },
        { atReputation: 40, label: 'Somebody worth having lunch with' },
        { atReputation: 70, label: 'Inside the conversation' },
      ],
      allies: ['faction_house'],
      enemies: ['faction_offisland'],
    },
    {
      id: 'faction_offisland',
      name: 'Off-Island',
      description: 'Everything forty minutes away: the Kagetsu prefectural police, a detective called Ayaka Nishimura, a documentary editor called Mel Chen, a regulator who could halt an expansion, and the version of this story that gets told where the resort cannot manage it.',
      startingReputation: 0,
      ranks: [
        { atReputation: -40, label: 'A time-waster' },
        { atReputation: 0, label: 'An unverified caller' },
        { atReputation: 40, label: 'A credible witness' },
        { atReputation: 70, label: 'The reason there is a case' },
      ],
      allies: [],
      enemies: ['faction_corporate'],
    },
  ],
  characters: [
    {
      id: 'sora',
      name: 'Sora Amemiya',
      role: 'Twenty-three, third summer as a guest-experience host, and the reason most people remember this island',
      cardBlurb:
        'She splashed you before you had unpacked and she has already decided what your week is going to be. She remembers your drink, your name and who you sat with at dinner, which is her actual job and also why she is the only person on this island who has noticed that a guest is missing.',
      pronouns: 'she/her',
      publicTraits: ['Remembers every name, drink and room change on the island', 'Gets strangers into the water within about ten minutes', 'Gets louder and more fun the more frightened she is'],
      hiddenDrives: [
        'She wants to leave seasonal work and open a small beach café and board hire with her sister, and is close enough to doing it that it frightens her',
        'She wants to find out whether somebody would still choose her on a day when she is no fun at all',
      ],
      values: [
        'Nobody at her pool has a bad week if she can prevent it, including the ones who are rude to her',
        'Being fun is a real skill and a real kindness, and she will not have it called shallow',
      ],
      fears: [
        'That if she stops being the fun one, people simply stop picking her, which she believes about her entire life',
        'That the beach business is her late father’s dream rather than her own, and she will find that out after she has spent the money',
      ],
      socialStyle:
        'Warm, direct and physical. Steals your sunglasses, argues about volleyball scoring, touches your arm to make a point. Asks far more questions than she answers, and when a conversation gets near anything true she offers an activity instead.',
      boundaries: [
        'Will not discuss another guest’s private business with you however much she likes you, because that is the one line the floor does not cross',
        'Backs off romance completely and permanently the moment somebody says they are not interested, and stays warm about it',
      ],
      goals: [
        'Get through the season with enough saved for the first payment on a beach lot near Kagetsu',
        'Find out what actually happened to the man who did not turn up to her paddle excursion',
      ],
      secrets: [
        {
          id: 'sora_east_cove',
          fact: 'She was near east cove after hours the night Adrian fell, meeting Luka, and heard two men arguing and then a hard impact. She did not go and look. She has told nobody: the area is restricted, Luka would be sacked, and she is embarrassed about who she was with.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It comes out when somebody puts the keycard log in front of her, or at two in the morning when the guilt finally outweighs the embarrassment.',
        },
        {
          id: 'sora_the_notebook',
          fact: 'The Tide & Salt notebook is in her locker and no guest has ever seen it. The numbers very nearly work. What she cannot work out is whether she wants the business or wants her father to have been right about her.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows it to somebody who sat through one quiet hour with her without trying to cheer her up.',
        },
      ],
      speechStyle:
        'Fast, teasing and specific, with real questions hidden inside jokes. Talks in the second person — tells you what you are doing and what you are about to do next. Frightened, the jokes speed up and she suggests going somewhere. When she finally stops performing the sentences get short and she looks at the water instead of at you.',
      topics: ['the pool', 'your week', 'the pink tide', 'the blue bag', 'Tide & Salt', 'her sister'],
      voiceSamples: [
        'You have been here forty minutes and you still look like you are at an airport. Unacceptable. Put the phone down, get in, I will hold the drink.',
        'He booked the sunset paddle. Nobody books the sunset paddle and then leaves without doing it, they just do not, and his bag was in a shed that was locked at half past nine.',
        'Okay, you are going to love the catamaran, and if you hate the catamaran I will personally swim you back to the beach and never mention it again.',
        'I flirt with everybody. It is ninety per cent of the job and about half my personality and I am apologising for neither. This is not that, and I would quite like you to know the difference.',
      ],
      appearance:
        'Twenty-three, long vivid bubblegum-pink hair to the lower back in loose beach waves and usually half wet, warm golden-brown eyes, bronzed skin, a small beauty mark below the left eye, a tiny gold star earring in the right ear and a fine shell belly chain. An oversized open white linen shirt over a white swim top, a coral wrap sarong knotted at one hip, sunglasses pushed up into her hair, and the easy posture of somebody who has been in and out of the water since eight.',
      visualHook: 'Bubblegum-pink hair, half wet, and a tiny gold star earring she twists when she is frightened.',
      silhouette: 'Half turned at the pool edge, sunglasses pushed up into her hair, mid-sentence.',
      artSeed: 'pt-sora-01',
      portrait: null,
      expressions: ['neutral', 'flirty', 'delighted', 'suspicious', 'scared', 'quiet'],
      schedule: [
        { startMinute: 0, endMinute: 150, locationId: 'rooftop_bar', activity: 'off shift at the end of the bar, arguing with June about something unimportant' },
        { startMinute: 150, endMinute: 480, locationId: 'staff_backstep', activity: 'asleep in staff accommodation, six hours if the night has been kind' },
        { startMinute: 480, endMinute: 660, locationId: 'beach_club', activity: 'morning board hire, the volleyball net, and thirty guests greeted by name' },
        { startMinute: 660, endMinute: 1140, locationId: 'infinity_pool', activity: 'the pool shift: the activities board, drinks orders, and everybody’s week being quietly fixed' },
        { startMinute: 1140, endMinute: 1320, locationId: 'beach_club', activity: 'the sunset paddle and whatever the evening turns into' },
        { startMinute: 1320, endMinute: 1440, locationId: 'rooftop_bar', activity: 'off duty on the roof, still working the room out of habit' },
      ],
      homeLocationId: 'infinity_pool',
      knowledgeScope: ['sora', 'aster_guests', 'the_floor', 'adrian_vale', 'the_pink_tide', 'tide_and_salt'],
      startingRelationship: { trust: 25, affection: 30, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        { id: 'sora_off_duty', label: 'She comes to find you when she is not working', kind: 'TRUST', requires: { trust: 50, affection: 45 } },
        { id: 'sora_the_truth', label: 'She tells you where she was that night', kind: 'TRUST', requires: { trust: 65, respect: 45 } },
        { id: 'sora_the_notebook', label: 'She shows you the notebook', kind: 'TRUST', requires: { trust: 72, affection: 62 } },
        { id: 'sora_real', label: 'Neither of you is calling this a holiday thing', kind: 'ROMANCE', requires: { trust: 70, affection: 75 } },
      ],
      attributes: { might: 14, agility: 15, mind: 15, presence: 18, resolve: 13, arcana: 3 },
      companion: null,
      scouting: {
        learnRate: 1.8,
        cap: 8,
        revealCopy: 'She has your drink order, your first name and the fact that you look at the door every time somebody comes through it. "You are waiting for something to go wrong," she says. "Stop it. Nothing is going wrong today."',
      },
      combatant: null,
    },
    {
      id: 'eli',
      name: 'Eli Mercer',
      role: 'Thirty-one, assistant manager, nine years from the front desk to the fourth floor, and awake since Tuesday',
      cardBlurb:
        'He will solve any problem you have on this island in about four minutes and he would very much like you to enjoy being a guest. Two nights before you arrived he grabbed at a camera on a service ledge above east cove, and everything since has been one exhausted man trying to keep four hundred jobs and his own life intact.',
      pronouns: 'he/him',
      publicTraits: ['Solves your problem before you have finished describing it', 'Has never raised his voice on the floor in nine years', 'Is always, gently, standing where he can see you'],
      hiddenDrives: [
        'He wants somebody to tell him that what happened on the ledge was an accident, and there is nobody he can ask',
        'He wants Aster Cove to outlast him, which he now knows requires him to be given up, and cannot make himself accept',
      ],
      values: [
        'People who expose an institution rarely have to live among what happens to everybody inside it afterwards',
        'Service is a real moral good: four hundred people go home rested because this building is run properly',
      ],
      fears: [
        'The hour when somebody finally says that man’s name to him in front of a witness',
        'That the man he could not find has been alive the whole time, which he thinks about nightly and cannot look at directly',
      ],
      socialStyle:
        'Immaculate hospitality manner, unfailingly pleasant, never hurried. Answers a question with an offer. Under pressure he gets quieter rather than louder, and the only tell is that he stops using your name.',
      boundaries: [
        'Will not be alone in a room with you if he can arrange for somebody else to be present, and he can always arrange it',
        'Will not say one sentence about east cove that is not on the printed statement about survey work',
      ],
      goals: [
        'Get the blue bag off this island, then the ledge cleaned, then one week where nobody asks him anything',
        'Keep Reika Mori from ever having to know, which he tells himself is loyalty',
      ],
      secrets: [
        {
          id: 'eli_the_ledge',
          fact: 'He caught Adrian Vale filming on the restricted service path, they struggled over the camera, and Adrian went over into the dark. He did not go there intending to hurt anybody, and he has never been able to say aloud whether he pushed.',
          visibility: 'CREATOR_ONLY',
          revealHint: 'He says it in one flat sentence to somebody who has closed the exits without threatening him, and sounds more relieved than caught.',
        },
        {
          id: 'eli_the_cover',
          fact: 'He faked the checkout: the deactivated key, the settled bill, the ferry log, the hat and jacket in front of the lobby camera, the phone left by the pool, the bag in the shed, and one missing segment of footage.',
          visibility: 'CREATOR_ONLY',
          revealHint: 'The metadata is checkable by anybody with access and patience, and every day it sits there it gets easier to find.',
        },
      ],
      speechStyle:
        'Trained hospitality register: complete sentences, no contractions when he is nervous, everything phrased as an offer or an apology. Converts questions into arrangements — a table, a boat, an upgrade. Never threatens; the closest he comes is reminding you what a lovely week you are having.',
      topics: ['your stay', 'the survey work', 'the restricted area', 'rotas', 'Reika', 'what a resort is for'],
      voiceSamples: [
        'Of course. I will have somebody look into it and come back to you before dinner. In the meantime, may I move you to a cabana? The one you have is in the sun after three.',
        'The eastern cove is closed for survey work and has been since March. I am sorry. I know it looks like the nicest part of the island, and honestly it is.',
        'You are a guest. Enjoy being one. That is not a warning, it is the best advice anybody on this floor can give you.',
        'Four hundred and eleven people work here and most of them send money to somebody. I have watched what a story does to a place like this, and nobody who writes one ever stays to see it.',
      ],
      appearance:
        'Thirty-one, neat dark hair, a pressed pale linen resort blazer with a name badge, tanned the way somebody is who works outdoors and is never off duty, a wristwatch he checks constantly, and shadows under his eyes that professionalism does not quite cover.',
      visualHook: 'A pale linen resort blazer and a name badge, immaculate at eleven at night.',
      silhouette: 'Standing at the edge of a scene with his hands folded, watching the room rather than you.',
      artSeed: 'pt-eli-01',
      portrait: null,
      expressions: ['neutral', 'courteous', 'strained', 'cornered', 'undone'],
      schedule: [
        { startMinute: 0, endMinute: 120, locationId: 'service_corridors', activity: 'the night duty walk, and forty minutes in the monitor room he could not explain' },
        { startMinute: 120, endMinute: 420, locationId: 'staff_backstep', activity: 'three hours in a staff room he has not gone home from since Tuesday' },
        { startMinute: 420, endMinute: 840, locationId: 'the_lobby', activity: 'the morning floor: arrivals, complaints, the rota, and being visible' },
        { startMinute: 840, endMinute: 900, locationId: 'infinity_pool', activity: 'the deck walk, counting sunbeds and looking at nothing in particular' },
        { startMinute: 900, endMinute: 1260, locationId: 'the_lobby', activity: 'the evening floor, and one long unexplained absence around eight' },
        { startMinute: 1260, endMinute: 1440, locationId: 'service_corridors', activity: 'back of house, moving things that do not need moving' },
      ],
      homeLocationId: 'the_lobby',
      knowledgeScope: ['aster_operations', 'the_house', 'east_cove', 'adrian_vale', 'the_cover_up'],
      startingRelationship: { trust: 10, affection: 5, respect: 20, fear: 0, rivalry: 15 },
      gates: [
        { id: 'eli_drops_the_manner', label: 'He stops talking to you like a guest', kind: 'TRUST', requires: { trust: 40, respect: 45 } },
        { id: 'eli_says_it', label: 'He tells somebody what happened on the ledge', kind: 'TRUST', requires: { trust: 62, respect: 55 } },
      ],
      attributes: { might: 12, agility: 12, mind: 16, presence: 16, resolve: 11, arcana: 3 },
      companion: null,
      scouting: {
        learnRate: 1.2,
        cap: 7,
        revealCopy: 'He knows your room number without looking it up, which room you moved from, and that you were on the beach path at eleven last night. He mentions none of it. He asks whether the air conditioning has been all right.',
      },
      combatant: null,
    },
    {
      id: 'luka',
      name: 'Luka Reyes',
      role: 'Twenty-five, dive instructor, and the person who understands the water round this island better than anybody who has ever managed it',
      cardBlurb:
        'He argued with Adrian Vale two days before the man vanished and he was at east cove the night it happened, so he is going to look guilty for most of your week. He is not. He is guilty of running unauthorised dawn dives for cash, which would end his career here and has nothing to do with any of it.',
      pronouns: 'he/him',
      publicTraits: ['Reads water like a page', 'Makes the joke about himself before anybody else can', 'Refuses a bad dive plan every single time, cheerfully'],
      hiddenDrives: [
        'He wants his own boat and a small dive operation on the mainland, and is about eleven thousand short',
        'He would like Sora to have been serious about him once, which he has never asked and has mostly stopped hoping for',
      ],
      values: [
        'Nobody drowns on his watch, which he means literally and has arranged his whole working life around',
        'The sea is not scenery and does not care what your holiday cost',
      ],
      fears: [
        'Being blamed for something he did not do by people who decided what he was before he opened his mouth',
        'The dawn dives surfacing and taking the job, the reference and the boat with them',
      ],
      socialStyle:
        'Easy, physical, disarming. Explains dangerous things calmly and refuses dangerous things without moralising. Deflects accusations with a joke, which reads badly and is simply how he was raised.',
      boundaries: [
        'Will not take anybody into the east caves without a tide table in his hand and a second person on the boat',
        'Will not discuss what Sora is or is not to him with a guest who is obviously interested in her',
      ],
      goals: [
        'Finish the season with the dawn dives unnoticed and a deposit paid on a second-hand boat',
        'Stop being the first person everybody looks at when something goes wrong here',
      ],
      secrets: [
        {
          id: 'luka_the_dives',
          fact: 'He runs unauthorised dives at dawn for wealthy guests, cash, outside the resort’s insurance. They are safe and well run and would end his career here inside a day.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'A guest who has been on one mentions it, or somebody hears the compressor running at five in the morning.',
        },
        {
          id: 'luka_that_night',
          fact: 'He was at east cove with Sora the night Adrian fell. He heard the same voices and the same impact and told himself it was the survey rig. He has since worked out that it was not.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He confirms it the moment somebody who already knows Sora was there asks him directly, and is relieved to be asked.',
        },
      ],
      speechStyle:
        'Relaxed and concrete, all tide and depth and weather. Short declaratives. Turns tension into a joke about himself and then answers the question honestly anyway. Genuinely angry, the jokes stop entirely and the sentences go very plain.',
      topics: ['the tides', 'the caves', 'that argument', 'Sora', 'the dawn dives', 'the boat he wants'],
      voiceSamples: [
        'He wanted a night dive on the east side with no boat cover and no second. I said no. He asked again in a way that was meant to be charming and I said no louder, and that is our entire famous argument.',
        'Low water is twenty past six tomorrow. The mouth is open ninety minutes either side of that and then it is not open, and it does not care that you are already inside.',
        'Everybody has decided it was me. Look at me: the guy with the boat keys and the bad haircut who fought with him. I would suspect me. I would be wrong, but I would suspect me.',
        'Whatever she told you about last season is probably true, and it was two people having a good time, and I am not doing the rest of that conversation at eleven in the morning.',
      ],
      appearance:
        'Twenty-five, Filipino-Japanese, sun-bleached dark hair, deep tan, swimmer’s shoulders, a rash guard shoved down to the waist, a propeller scar across one shin, a dive computer permanently on the left wrist and no shoes anywhere he can avoid them.',
      visualHook: 'A dive computer on the left wrist and a rash guard pushed down to the waist.',
      silhouette: 'Crouched over a tank on a pontoon with the sun behind him.',
      artSeed: 'pt-luka-01',
      portrait: null,
      expressions: ['neutral', 'easy', 'amused', 'flat', 'cornered'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'staff_backstep', activity: 'asleep, badly, in a shared room above the dive centre' },
        { startMinute: 300, endMinute: 420, locationId: 'the_marina', activity: 'the dive he is not supposed to be running, back before the compressor is missed' },
        { startMinute: 420, endMinute: 1020, locationId: 'dive_centre', activity: 'tanks, certifications, two boat dives and thirty nervous beginners' },
        { startMinute: 1020, endMinute: 1200, locationId: 'beach_club', activity: 'kit off the boat, tanks rinsed, and one beer he makes last' },
        { startMinute: 1200, endMinute: 1440, locationId: 'rooftop_bar', activity: 'an hour on the roof, then gone before the expensive part of the night' },
      ],
      homeLocationId: 'dive_centre',
      knowledgeScope: ['the_water', 'east_cove', 'the_sea_caves', 'the_floor', 'sora'],
      startingRelationship: { trust: 20, affection: 10, respect: 20, fear: 0, rivalry: 10 },
      gates: [
        { id: 'luka_the_dawn_dives', label: 'He admits what he runs at five in the morning', kind: 'TRUST', requires: { trust: 55, respect: 45 } },
        { id: 'luka_takes_you_east', label: 'He will take you round to the cove himself', kind: 'TRUST', requires: { trust: 65, respect: 60 } },
      ],
      attributes: { might: 17, agility: 16, mind: 14, presence: 14, resolve: 15, arcana: 3 },
      companion: null,
      scouting: {
        learnRate: 1.4,
        cap: 7,
        revealCopy: 'He watches you climb out of the pool and remarks, without emphasis, that you swim like somebody who learned in a lake. He is right, he is not being unkind, and he now knows exactly what you can and cannot be taken into.',
      },
      combatant: null,
    },
    {
      id: 'nami',
      name: 'Nami Kuroda',
      role: 'Twenty-nine, marine biologist contracted to the expansion assessment, and the person who started all of this with one anonymous email',
      cardBlurb:
        'She has been sampling the eastern seabed for four months and two of her sites disagree with her own summary. She contacted a documentary producer, regretted it inside a week and destroyed one copy of what she sent him, and if you can convince her you are not about to detonate four hundred jobs she is the person who knows what is down there.',
      pronouns: 'she/her',
      publicTraits: ['Corrects imprecise language automatically and then apologises for it', 'Works alone at the far end of every beach', 'Puts a hand flat on the table before saying anything difficult'],
      hiddenDrives: [
        'She wants the expansion stopped and the caves cleaned properly, and she does not want four hundred people to lose their jobs for it',
        'She wants to be told that inviting a journalist in was not the worst decision of her professional life',
      ],
      values: [
        'A number is either measured or it is not, and a summary that softens it is a lie with a signature on it',
        'The people who work at a resort are not the company that owns it, and consequences never land on the same heads',
      ],
      fears: [
        'A lawsuit from a company with a legal department the size of her whole department',
        'That a man is dead because she sent one email from an account she thought was anonymous',
      ],
      socialStyle:
        'Reserved, dry, precise, and slower to speak than anybody else here. Hates hospitality language and says so. Warms up considerably around anybody who asks a technical question honestly rather than to seem clever.',
      boundaries: [
        'Will not describe an unpublished result as a finding, ever, however much easier it would make the conversation',
        'Will not go to east cove after dark with somebody she met yesterday, and will explain exactly why in tidal terms',
      ],
      goals: [
        'Get an independent audit of the eastern sites written into the expansion consent',
        'Find out whether Adrian Vale is alive, which she has been unable to ask anybody in a blazer',
      ],
      secrets: [
        {
          id: 'nami_the_email',
          fact: 'She is the source. She sent Adrian the sample discrepancies and the eight-year-old settlement reference from a personal account, then panicked, deleted the file and stopped replying to him four days before he fell.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it out loud to somebody who already has the torn notebook page with her own phone number on it.',
        },
        {
          id: 'nami_the_cache',
          fact: 'She knows the barrels were put into the east caves eight years ago, that at least two ruptured, that a contracted diver became ill, and that the cleanup certificate does not match the sediment she has personally pulled up.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She hands over the survey file once somebody has demonstrated they will not simply set it on fire in public.',
        },
      ],
      speechStyle:
        'Technical, unhurried and exact. Gives units, dates and site numbers. Refuses vague words and replaces them with narrower ones. Dry rather than warm, and funnier than she intends when she is tired. Never raises her voice and never rounds a figure up.',
      topics: ['the sediment', 'the expansion', 'the settlement', 'Adrian', 'what the survey says', 'diving alone'],
      voiceSamples: [
        'Two of my sites disagree with the summary I wrote at the front of my own report. Not dramatically. Enough that I have read those pages every night for four months.',
        'The word you want is localised. It is a fifty metre stretch of seabed inside two caves, it is not the ocean, and if anybody prints that this island is poisoned they will be wrong and I will have to say so.',
        'I sent one email from an account I believed was anonymous. Nine days later he stopped replying. You can do the arithmetic on that as fast as I did.',
        'I am not anti-tourism. I am anti pristine ecosystem, which is a phrase in a brochure describing a bay I have personally taken four hundred samples out of.',
      ],
      appearance:
        'Twenty-nine, black hair cut short and pushed back, field-tanned unevenly, a rash vest over a swimsuit most days with a battered dry bag over one shoulder, reading glasses she loses constantly, and a waterproof notebook with the corners rounded off by use.',
      visualHook: 'A battered dry bag over one shoulder and a waterproof notebook with the corners worn round.',
      silhouette: 'Crouched at the tideline with a sample bottle held up against the light.',
      artSeed: 'pt-nami-01',
      portrait: null,
      expressions: ['neutral', 'exact', 'guarded', 'tired', 'unburdened'],
      schedule: [
        { startMinute: 0, endMinute: 390, locationId: 'the_villas', activity: 'asleep in the consultant’s room at the end of the villa row, badly' },
        { startMinute: 390, endMinute: 720, locationId: 'east_cove', activity: 'the sample run, at low water, alone, which she knows is unwise' },
        { startMinute: 720, endMinute: 900, locationId: 'the_marina', activity: 'bottles logged, kit rinsed, and an hour of paperwork at the fuel dock table' },
        { startMinute: 900, endMinute: 1200, locationId: 'the_villas', activity: 'writing up, and rereading two pages of appendix she cannot leave alone' },
        { startMinute: 1200, endMinute: 1440, locationId: 'rooftop_bar', activity: 'one drink at the quiet end, watching the door' },
      ],
      homeLocationId: 'east_cove',
      knowledgeScope: ['the_survey', 'east_cove', 'the_settlement', 'adrian_vale', 'marine_science'],
      startingRelationship: { trust: 10, affection: 5, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        { id: 'nami_admits_it', label: 'She admits she is the source', kind: 'TRUST', requires: { trust: 55, respect: 50 } },
        { id: 'nami_hands_it_over', label: 'She gives you the survey file', kind: 'TRUST', requires: { trust: 68, respect: 62 } },
      ],
      attributes: { might: 13, agility: 13, mind: 18, presence: 12, resolve: 15, arcana: 3 },
      companion: null,
      scouting: {
        learnRate: 1.5,
        cap: 7,
        revealCopy: 'She looks at the residue you photographed for about two seconds. "That is not from this beach," she says, and then stops talking, because she has just told you considerably more than she meant to.',
      },
      combatant: null,
    },
    {
      id: 'reika',
      name: 'Reika Mori',
      role: 'Forty-six, general manager of Aster Cove, and the only person on this island who can halt anything',
      cardBlurb:
        'She runs a building of four hundred and eleven staff and a hundred and eighty rooms to a standard you can feel in the towels. She knows there was an old environmental settlement and believes the cleanup was finished. She does not know what her assistant manager did, and the hour she finds out is the hinge of this whole story.',
      pronouns: 'she/her',
      publicTraits: ['Notices a folded napkin wrong from ten metres', 'Uses your name at the start and end of every sentence she means', 'Never appears to be in a hurry, ever'],
      hiddenDrives: [
        'She wants this resort to be the best-run hotel in the region and is close enough that the expansion feels like a threat rather than a prize',
        'She wants to be the kind of manager who is told things, and has slowly built a building where nobody tells her anything',
      ],
      values: [
        'A guest’s week is a promise the building made and the building keeps it',
        'Staff are hers to protect, including from the company that owns them, which she has done twice at real cost',
      ],
      fears: [
        'A scandal that closes this place and puts four hundred people on a ferry with a box each',
        'Discovering that the thing she has been managing all week was a crime she helped to hide by managing it',
      ],
      socialStyle:
        'Warm, controlled, entirely unflappable, with a hospitality manner that is real rather than performed. Listens completely, takes notes, and gives you a decision by a stated time. Becomes formal and very slightly cold when she suspects she is being handled.',
      boundaries: [
        'Will not act publicly on a rumour, ever, and will say so plainly rather than pretend it is not a rumour',
        'Will not let a member of her staff be blamed for something in front of guests, whatever they have done',
      ],
      goals: [
        'Get through the season with the expansion decided honestly and the building intact',
        'Find out what her own people have been doing at east cove, once she has the first solid reason to look',
      ],
      secrets: [
        {
          id: 'reika_the_settlement',
          fact: 'She knows there was a settlement eight years ago involving a sick contractor and the eastern caves. She was told the cleanup was completed and signed off, and she has never read the certificate herself.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it, evenly, to somebody who has produced a document rather than an accusation.',
        },
        {
          id: 'reika_the_pressure',
          fact: 'Corporate wants the marina consent signed inside the quarter and has made it clear her contract renewal is adjacent to that timeline. She has told nobody in the building.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It comes out when somebody asks her, without contempt, why she has not simply halted the survey herself.',
        },
      ],
      speechStyle:
        'Measured, balanced, complete. Long sentences that arrive exactly where they set out for. Quotes numbers of rooms, staff and years the way other people quote feelings. When she disagrees with you she says so once, clearly, and then does not repeat it.',
      topics: ['the building', 'her staff', 'the expansion', 'the settlement', 'what she can act on', 'Eli'],
      voiceSamples: [
        'A hundred and eighty rooms, forty villas, four hundred and eleven staff, and eleven weeks of season left. That is the thing I am holding. Tell me what you have and I will tell you what I can do with it today.',
        'You have brought me a feeling and a photograph of a bag. I believe you completely and I cannot act on either. Bring me the door log and I will have a different conversation with you before dinner.',
        'I have suspended two members of staff in nine years and I found both of them work afterwards, because the company will not and somebody has to.',
        'If it turns out I have spent this week smoothing over a crime, I would like to be the one who says so publicly, and I am aware of how self-serving that sounds.',
      ],
      appearance:
        'Forty-six, black hair in a low chignon, a fitted cream linen suit with no resort logo on it anywhere, small pearl earrings, half-moon reading glasses on a chain, and a leather folio she carries everywhere and writes in constantly.',
      visualHook: 'A leather folio under one arm and half-moon glasses on a fine chain.',
      silhouette: 'Standing perfectly still in the middle of a busy lobby, watching the flow of it.',
      artSeed: 'pt-reika-01',
      portrait: null,
      expressions: ['neutral', 'gracious', 'considering', 'cold', 'shaken'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'the_villas', activity: 'the manager’s house at the end of the row, and five hours of sleep' },
        { startMinute: 360, endMinute: 600, locationId: 'the_lobby', activity: 'the six o’clock walk of the whole building before any guest is awake' },
        { startMinute: 600, endMinute: 960, locationId: 'the_lobby', activity: 'arrivals, the diary, two suppliers and a call with Kagetsu she takes standing up' },
        { startMinute: 960, endMinute: 1200, locationId: 'the_villas', activity: 'the expansion meetings, in a villa, with printed papers on the table' },
        { startMinute: 1200, endMinute: 1440, locationId: 'the_lobby', activity: 'dinner service, the floor, and every table looked at once' },
      ],
      homeLocationId: 'the_lobby',
      knowledgeScope: ['aster_operations', 'the_house', 'the_expansion', 'the_settlement', 'her_staff'],
      startingRelationship: { trust: 15, affection: 5, respect: 25, fear: 0, rivalry: 0 },
      gates: [
        { id: 'reika_takes_you_seriously', label: 'She starts treating you as a witness rather than a guest', kind: 'TRUST', requires: { trust: 50, respect: 55 } },
        { id: 'reika_acts', label: 'She will move against her own building for you', kind: 'TRUST', requires: { trust: 68, respect: 70 } },
      ],
      attributes: { might: 10, agility: 11, mind: 18, presence: 18, resolve: 17, arcana: 3 },
      companion: null,
      scouting: {
        learnRate: 1.3,
        cap: 8,
        revealCopy: 'She has already read the incident log, the door records and one complaint with your name on it. "You have had a busy holiday," she says, and it is not sarcasm, which is worse.',
      },
      combatant: null,
    },
    {
      id: 'marcus',
      name: 'Marcus Vane',
      role: 'Thirty-nine, regional development executive, in villa nine for the expansion meetings',
      cardBlurb:
        'He knows the contamination was worse than the public version and he did not order anybody to hurt anyone; his instruction was to keep a journalist out of the restricted zone and tell legal. He will buy you a drink, lay out your options as though he were on your side, and two of them always will be — and once he works out what his assistant manager did, he is the most dangerous person on this island.',
      pronouns: 'he/him',
      publicTraits: ['Offers you a drink and a chair before you have finished your first sentence', 'Never raises a voice or a threat, and never needs to', 'Answers the question you should have asked'],
      hiddenDrives: [
        'He wants the marina consent signed this quarter and a promotion off this coast entirely',
        'He would like to solve this without anybody being destroyed, and will destroy somebody the moment that becomes cheaper',
      ],
      values: [
        'Every problem has a price and the mistake amateurs make is refusing to name it out loud',
        'Institutions survive by containing damage, and containment is a legitimate profession',
      ],
      fears: [
        'A criminal matter attaching to a corporate timeline, which is the one kind of exposure money does not fix',
        'Being personally in the room when it happens, which is why he is careful about rooms',
      ],
      socialStyle:
        'Hospitable, quick, transactional and genuinely good company for about forty minutes. Lays out your options as though he were on your side, and two of them always are. Never insults anybody; regards it as unprofessional.',
      boundaries: [
        'Will not put anything in writing, at all, and will notice if your phone is face up on the table',
        'Will not be in a room alone with Eli Mercer after the moment he understands what happened',
      ],
      goals: [
        'Get the consent through with the environmental question answered on paper rather than in a newspaper',
        'Decide, before anybody else does, whether Eli is an asset to be protected or a cost to be booked',
      ],
      secrets: [
        {
          id: 'marcus_the_worse_version',
          fact: 'He has read the original incident file. Four barrels, not two, a diver with liver damage, a settlement with a confidentiality schedule, and a cleanup certificate signed by a testing firm the company was paying directly.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He concedes it once somebody shows him they already have the sample numbers, because denying a fact he cannot move is inefficient.',
        },
        {
          id: 'marcus_the_instruction',
          fact: 'His instruction about Adrian was to keep him out of the restricted zone and inform legal. Nothing more. He can prove it, and proving it means giving Eli to the police.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He produces it the instant it protects him, and he will do that without a flicker of hesitation.',
        },
      ],
      speechStyle:
        'Structured and brisk. Numbers his options aloud. Uses commercial vocabulary — exposure, timeline, quarter, position — and applies it to human beings without noticing he is doing it. Warm and quick, and every warmth has a purpose behind it.',
      topics: ['the expansion', 'your position', 'options', 'the settlement', 'legal', 'what this costs'],
      voiceSamples: [
        'There are three versions of the next fortnight and two of them are fine for you. Let me lay all three out, including the one where you keep everything you have and leave on Sunday.',
        'I told him to keep the man out of the restricted zone and to call legal. That is the whole instruction. I have it, it is timed, and the moment I produce it, somebody I have worked with for six years goes to prison.',
        'You are describing an environmental question as though it were a moral one. It is both, and only one of them has a deadline in it, which is the part I get paid for.',
        'I am not going to insult you with an envelope. I am going to ask what you actually want out of this week, because so far you have behaved like somebody who wants something specific.',
      ],
      appearance:
        'Thirty-nine, close-cropped hair going grey at the temples, unstructured navy jacket over a plain white tee, expensive plain watch, deck shoes with no socks, and a leather notebook he never once opens in front of you.',
      visualHook: 'An unstructured navy jacket over a plain white tee, in thirty-one degree heat, all week.',
      silhouette: 'Leaning back at a villa table with printed papers turned face down.',
      artSeed: 'pt-marcus-01',
      portrait: null,
      expressions: ['neutral', 'affable', 'calculating', 'clipped', 'decided'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_villas', activity: 'villa nine, asleep, phone face down and charging' },
        { startMinute: 420, endMinute: 540, locationId: 'the_villas', activity: 'the plunge pool, forty lengths of nothing, and two calls to Kagetsu' },
        { startMinute: 540, endMinute: 900, locationId: 'the_villas', activity: 'the expansion meetings: consultants, surveyors and papers turned face down' },
        { startMinute: 900, endMinute: 1140, locationId: 'the_marina', activity: 'a launch out to look at the eastern headland with somebody from planning' },
        { startMinute: 1140, endMinute: 1440, locationId: 'rooftop_bar', activity: 'dinner and drinks at the good table, being excellent company' },
      ],
      homeLocationId: 'the_villas',
      knowledgeScope: ['the_expansion', 'the_settlement', 'corporate', 'legal_exposure', 'the_house'],
      startingRelationship: { trust: 5, affection: 5, respect: 15, fear: 0, rivalry: 10 },
      gates: [
        { id: 'marcus_talks_straight', label: 'He stops selling and starts pricing', kind: 'TRUST', requires: { trust: 45, respect: 50 } },
        { id: 'marcus_deals', label: 'He puts a real offer on the table', kind: 'TRUST', requires: { trust: 60, respect: 65 } },
      ],
      attributes: { might: 12, agility: 12, mind: 18, presence: 17, resolve: 16, arcana: 3 },
      companion: null,
      scouting: {
        learnRate: 1.3,
        cap: 7,
        revealCopy: 'He asks two friendly questions about your job and your flight, and by the third you understand that he has established what you earn, what you can afford to lose and who would miss you if you left tomorrow.',
      },
      combatant: null,
    },
    {
      id: 'celeste',
      name: 'Celeste Ward',
      role: 'Twenty-seven, fashion influencer on a sponsored stay, and the accidental owner of the only photographs that matter',
      cardBlurb:
        'She took thirty-one mirror shots in the lobby on the morning of the fake checkout and four of them have a man wheeling a case behind her. She will not simply hand them to you: half of every frame is unreleased campaign work for a brand that has not paid her, and she needs that money considerably more than her feed suggests.',
      pronouns: 'she/her',
      publicTraits: ['Arrives everywhere with three outfit options and a tripod', 'Is funnier off camera than on it, deliberately', 'Knows the exact hour the light is good at every point on this island'],
      hiddenDrives: [
        'She wants one contract that pays enough to clear the debt left by a clothing label that folded eleven months ago',
        'She wants somebody here to like her without having seen her numbers first',
      ],
      values: [
        'Work is work: the pose, the grid, the deal, and nobody gets to sneer at it who has not tried to make rent from it',
        'You do not publish somebody else’s bad week for engagement, which she has been offered money to do twice',
      ],
      fears: [
        'The debt becoming public, which would end the only income she has',
        'Being the punchline in somebody else’s story about influencers',
      ],
      socialStyle:
        'Fast, glossy, self-aware and genuinely warm once she has decided you are not laughing at her. Performs constantly and knows she is performing and will say so. Negotiates everything, out of habit, including breakfast.',
      boundaries: [
        'Will not release unedited campaign frames before the brand does, for anybody, at any price, because it would end her professionally',
        'Will not be filmed crying, which happened once, and which she does not discuss',
      ],
      goals: [
        'Deliver the campaign, get paid, and get through the week without anybody working out how bad the money is',
        'Get whatever is going on at this resort into her own hands before it gets into somebody else’s',
      ],
      secrets: [
        {
          id: 'celeste_the_debt',
          fact: 'Her clothing label collapsed owing suppliers, and she personally guaranteed part of it. The villa, the dresses and the trip are all sponsored and she has under nine hundred in her account.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells somebody who has just quietly paid for something without making it a moment.',
        },
        {
          id: 'celeste_the_frames',
          fact: 'The full set includes four frames of the checkout figure and one clear shot of Eli Mercer in the corridor behind the desk at 8:04, which she has not looked at closely enough to notice.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She scrolls back through the set herself once somebody gives her a reason to care about the timestamps.',
        },
      ],
      speechStyle:
        'Quick, brand-fluent and ironic about her own vocabulary. Mixes commercial language with real feeling in the same sentence and lets you sort out which is which. Talks in deliverables and deadlines. When something actually frightens her the polish drops entirely and she gets very plain.',
      topics: ['the campaign', 'the grid', 'her numbers', 'that morning in the lobby', 'the brand', 'what she is owed'],
      voiceSamples: [
        'I shot thirty-one frames in that lobby between eight and half past because the marble does something with the light that I cannot get anywhere else on this island.',
        'Everybody thinks the villa is mine. The villa is a line item. I have a dress on loan, a deadline on Thursday and a brand that has not paid an invoice since April.',
        'I will give you four frames. Four. Cropped by me, watermarked, and if a single unreleased look ends up anywhere I lose the only contract holding my life together.',
        'You want me to feel bad about being a product. Sweetheart, I am extremely good at being a product, and it is currently paying for eleven people’s work.',
      ],
      appearance:
        'Twenty-seven, long honey-blonde waves with an inch of deliberate root, gold jewellery layered exactly, a different immaculate resort look every four hours, oversized sunglasses, and a phone in a ring holder that is never further than her hand.',
      visualHook: 'A phone in a gold ring holder, never further away than her own hand.',
      silhouette: 'Half turned to a mirrored column with one hip out and the phone at eye level.',
      artSeed: 'pt-celeste-01',
      portrait: null,
      expressions: ['neutral', 'bright', 'wry', 'annoyed', 'plain'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_villas', activity: 'asleep in a sponsored villa she cannot afford, phone charging on the pillow' },
        { startMinute: 420, endMinute: 540, locationId: 'the_lobby', activity: 'the morning shoot, because the marble light is only right before nine' },
        { startMinute: 540, endMinute: 900, locationId: 'infinity_pool', activity: 'four looks, one tripod, and eleven minutes of actual swimming' },
        { startMinute: 900, endMinute: 1200, locationId: 'beach_club', activity: 'golden hour on the sand, then editing on a lounger with a drink going warm' },
        { startMinute: 1200, endMinute: 1440, locationId: 'rooftop_bar', activity: 'the rooftop, being visibly delighted, watching the door for the brand’s regional man' },
      ],
      homeLocationId: 'infinity_pool',
      knowledgeScope: ['aster_guests', 'the_lobby_morning', 'social_media', 'the_brand'],
      startingRelationship: { trust: 15, affection: 15, respect: 10, fear: 0, rivalry: 20 },
      gates: [
        { id: 'celeste_the_frames', label: 'She goes back through the full set with you', kind: 'TRUST', requires: { trust: 50, respect: 40 } },
        { id: 'celeste_off_camera', label: 'She talks to you with the phone face down', kind: 'TRUST', requires: { trust: 62, affection: 55 } },
      ],
      attributes: { might: 10, agility: 13, mind: 15, presence: 18, resolve: 13, arcana: 3 },
      companion: null,
      scouting: {
        learnRate: 1.6,
        cap: 7,
        revealCopy: 'She has clocked your watch, your shoes and the fact that you have not photographed anything since you arrived. "You are not here for content," she says, delighted. "God, that is restful."',
      },
      combatant: null,
    },
    {
      id: 'june',
      name: 'June Kato',
      role: 'Twenty-six, night bartender on the roof, and the best-informed person on this island',
      cardBlurb:
        'She works midnight to four and remembers who came up, who left with whom, and who was drinking alone on a Tuesday. She will not trade any of it for your curiosity. She is also Sora’s closest friend here, and she can tell the difference between Sora flirting and Sora meaning it from ten metres away.',
      pronouns: 'she/her',
      publicTraits: ['Puts the right drink down before you order it', 'Answers a nosy question with a completely different answer', 'Is the last person awake on this island every single night'],
      hiddenDrives: [
        'She wants to keep the one job where nobody asks her to be cheerful, and to save enough to stop working nights',
        'She wants Sora to leave this island before the island eats another three years of her',
      ],
      values: [
        'What happens at her bar stays at her bar, including the parts that would be useful to you',
        'Staff look after staff, because nobody else on this island is going to',
      ],
      fears: [
        'Being made to choose between a guest she likes and a colleague she has covered for',
        'That she has become the person who watches everybody else have a life',
      ],
      socialStyle:
        'Dry, minimal and unhurried, with the specific composure of somebody who has poured drinks for four hundred drunk people and been surprised by none of them. Warm in very small doses. Excellent silences.',
      boundaries: [
        'Will not tell you which room somebody went to, ever, and does not soften the refusal',
        'Will not gossip about Sora to somebody who is obviously trying to work out where they stand',
      ],
      goals: [
        'Get through the season, bank the tips, and keep the roof calm',
        'Make sure whatever Sora has got herself into does not end with Sora losing this job',
      ],
      secrets: [
        {
          id: 'june_the_night',
          fact: 'She saw Eli Mercer come back through the staff lift at twenty past one the night Adrian fell, soaked to the knee, and say good evening to her in a completely normal voice.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it to somebody who has already given her a reason to believe the resort is not going to protect anybody on the floor.',
        },
        {
          id: 'june_and_sora',
          fact: 'She knows Sora was out at east cove with Luka that night, because Sora told her at four in the morning and then asked her never to mention it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She will not say this at all. The most she will do is tell you to ask Sora, and to be kind about it.',
        },
      ],
      speechStyle:
        'Short lines with long gaps. Understatement as a default setting. Answers a question with a fact about drinks, or with silence, or with a question that is better than yours. Never dramatic, and everything she does say is exactly true.',
      topics: ['the late shift', 'who was up here', 'Sora', 'staff accommodation', 'what she will not tell you', 'last orders'],
      voiceSamples: [
        'Two in the morning is when people say the true thing. I have been behind this bar for three seasons and I have not repeated one of them yet.',
        'I am not telling you which room he went to. I will tell you he had four, he paid cash for two of them and he tipped like somebody apologising.',
        'She is not flirting with you. She flirts with the whole roof, I watch it every night, and she has not been up here since Tuesday because you are downstairs.',
        'Ask her yourself. Do it somewhere with no other people in it, and do not do the voice you are doing now.',
      ],
      appearance:
        'Twenty-six, black hair scraped into a knot with a bar pencil through it, black shirt with the sleeves rolled, forearms marked from ten thousand shakers, no jewellery except a thin steel watch turned face-in, and an expression that has seen everything twice.',
      visualHook: 'A bar pencil through a black knot of hair and a watch worn face-in.',
      silhouette: 'Both palms flat on the bar, leaning slightly, looking at somebody over the top of the room.',
      artSeed: 'pt-june-01',
      portrait: null,
      expressions: ['neutral', 'level', 'wry', 'flat', 'softened'],
      schedule: [
        { startMinute: 0, endMinute: 240, locationId: 'rooftop_bar', activity: 'the late shift, last orders, and every true sentence anybody says up here' },
        { startMinute: 240, endMinute: 330, locationId: 'staff_backstep', activity: 'the clean-down, a cigarette she does not smoke, and the walk back' },
        { startMinute: 330, endMinute: 900, locationId: 'staff_backstep', activity: 'asleep in staff accommodation while the island is at its loudest' },
        { startMinute: 900, endMinute: 1140, locationId: 'beach_club', activity: 'her own afternoon: the sand at the far end, alone, in the shade' },
        { startMinute: 1140, endMinute: 1440, locationId: 'rooftop_bar', activity: 'setting up, ice, garnish, and the first hour of the evening' },
      ],
      homeLocationId: 'rooftop_bar',
      knowledgeScope: ['the_late_shift', 'the_floor', 'aster_guests', 'sora', 'staff_accommodation'],
      startingRelationship: { trust: 15, affection: 10, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        { id: 'june_says_something', label: 'She tells you one thing she has never repeated', kind: 'TRUST', requires: { trust: 60, respect: 55 } },
        { id: 'june_takes_a_side', label: 'She decides you are worth protecting Sora with', kind: 'TRUST', requires: { trust: 70, respect: 65 } },
      ],
      attributes: { might: 11, agility: 13, mind: 17, presence: 15, resolve: 16, arcana: 3 },
      companion: null,
      scouting: {
        learnRate: 1.5,
        cap: 7,
        revealCopy: 'She puts down a drink you did not order and it is exactly right. "Third night in a row you have come up here alone at eleven," she says. "That is not a criticism. It is just a thing I noticed, like everything else."',
      },
      combatant: null,
    },
    {
      id: 'adrian',
      name: 'Adrian Vale',
      role: 'Thirty-four, documentary producer, missing since Tuesday night, and alive on a ledge under the east cliffs',
      cardBlurb:
        'Everybody is looking for a body and he has been rationing an old maintenance cache for three days with a broken wrist and a leg wound going bad. He is not your hero: he staged a disappearance to see who would move the evidence, he leaned hard on a frightened source, and he never once thought about the people who would look for him.',
      pronouns: 'he/him',
      publicTraits: ['Talks like somebody being interviewed even when nobody is recording', 'Remembers every date and document number', 'Apologises after the sentence rather than before it'],
      hiddenDrives: [
        'He wants the film that gets him out of contract work and back to the kind of story he made at twenty-eight',
        'He wants his source to be safe, which he has not once arranged for and repeats often',
      ],
      values: [
        'A settlement with a confidentiality schedule is a wrong that has been made administrative, and somebody has to un-administer it',
        'The story is worth some risk, and he has never been rigorous about whose risk it is',
      ],
      fears: [
        'Dying on a rock shelf sixty metres from a resort that is serving dinner',
        'Being the reason a marine biologist loses her career for an email she regretted in a week',
      ],
      socialStyle:
        'Charming, quick and relentlessly persuasive, with the specific warmth of somebody who needs you to keep talking. Injured, that all falls away and what is left is a frightened man being extremely precise about facts.',
      boundaries: [
        'Will not name his source, at all, under any pressure, including from the police, which is the one line he has never crossed',
        'Will not accept a settlement that includes silence, which is both principle and vanity',
      ],
      goals: [
        'Get off this ledge, get his footage back, and get four barrels and one sick contractor onto a public record',
        'Find out which of the two men on that path above him was the one who reached for the camera',
      ],
      secrets: [
        {
          id: 'adrian_the_stage',
          fact: 'The disappearance was his own idea. He hid in the lighthouse keeper’s quarters to see whether anybody moved the evidence, with a dead-man arrangement at his editor’s. Then Eli caught him on the path and it stopped being a plan.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it as soon as he is found, badly, while apologising to the wrong person.',
        },
        {
          id: 'adrian_the_packet',
          fact: 'The material he has is suggestive rather than conclusive: sample discrepancies, a settlement reference and a cleanup certificate from a firm the company paid. It is not publishable alone, which is exactly why he went to the cove with a camera.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'His editor says it plainly on the phone, and he confirms it with visible reluctance.',
        },
      ],
      speechStyle:
        'Journalistic and self-justifying: dates, document numbers, and the framing already built. Hurt and dehydrated, the performance goes and the sentences get short and accurate. Says "I know how this sounds" before things that sound exactly as bad as they are.',
      topics: ['the barrels', 'his source', 'the fall', 'the ledge', 'his editor', 'what he did wrong'],
      voiceSamples: [
        'Four barrels went into these caves eight years ago and two of them opened. There is a man in Kagetsu with liver damage who signed a schedule that stops him saying so. That is the story. It is not a big one and it is true.',
        'I know how this sounds. I staged it. I wanted to see who moved my bag, and I did not think about the person who would spend three days wondering whether she should have said something.',
        'There were two voices above me and then a hand on the camera strap. I do not know if he pushed. I have had three days to be certain about it and I am not certain about it.',
        'Do not tell them who sent me the email. Whatever else happens this week, that name does not go into anybody’s notebook, including yours.',
      ],
      appearance:
        'Thirty-four, sun-ruined stubble, a torn technical shirt, a wrist strapped with tape from a decade-old first aid kit, a deep sutured-with-nothing cut down one calf, cracked lips, and a bright orange dive watch that is not on his wrist because it came off in the fall.',
      visualHook: 'A wrist taped with an eleven-year-old bandage and a leg wound wrapped in a shirt sleeve.',
      silhouette: 'Sitting up against wet rock with one leg straight out and a hand raised against a torch beam.',
      artSeed: 'pt-adrian-01',
      portrait: null,
      expressions: ['neutral', 'urgent', 'wretched', 'lucid', 'grateful'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'sea_cave', activity: 'the shelf, the cache, and the tide coming in and going out again' },
      ],
      homeLocationId: 'sea_cave',
      knowledgeScope: ['the_barrels', 'the_settlement', 'the_fall', 'his_editor', 'the_cave'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        { id: 'adrian_talks', label: 'He tells you what happened on the path', kind: 'TRUST', requires: { trust: 40, respect: 30 } },
        { id: 'adrian_gives_you_it', label: 'He gives you the whole file and the contingency', kind: 'TRUST', requires: { trust: 62, respect: 55 } },
      ],
      attributes: { might: 9, agility: 9, mind: 17, presence: 15, resolve: 16, arcana: 3 },
      companion: null,
      scouting: {
        learnRate: 1.1,
        cap: 6,
        revealCopy: 'Even here, with a torch in his face, he asks your name, where you are from and how you found him, in that order, and you realise he is establishing whether you can be quoted.',
      },
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_the_first_afternoon',
      title: 'The First Afternoon',
      summary: 'Forty minutes on the island, a woman in the shallow end who has decided your posture is unacceptable, and a question you can absolutely say no to.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['sora', 'eli'],
      involvedLocationIds: ['infinity_pool', 'beach_club', 'your_room'],
      knownRewardCopy: 'What this week is going to be, decided by you in the first hour of it.',
      steps: [
        {
          id: 'the_splash',
          playerCopy: 'Somebody in the shallow end has just splashed you on purpose.',
          directorNotes:
            'Paradise arrives first. This is a flirt scene at a beautiful pool and nothing else, and it should be genuinely enjoyable to play whether the player flirts back, is dry about it, or gets out of the water and goes to unpack. Do not mention Adrian in this step at all.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'played_along',
              label: 'Play along and let her run the afternoon',
              predicate: { flagsSet: ['used:flirt_like_you_mean_it'] },
              setsFlags: ['she_likes_you', 'the_week_started_well'],
              closesFlags: [],
            },
            {
              routeId: 'got_in',
              label: 'Get in the water',
              predicate: { flagsSet: ['used:get_in_the_water'] },
              setsFlags: ['got_in_the_water', 'the_week_started_well'],
              closesFlags: [],
            },
            {
              routeId: 'bought_the_round',
              label: 'Put something on the room and make it an afternoon',
              predicate: { flagsSet: ['used:put_it_on_the_room'] },
              setsFlags: ['the_week_started_well', 'the_floor_noticed_you'],
              closesFlags: [],
            },
            {
              routeId: 'kept_to_yourself',
              label: 'Be pleasant about it and go and unpack',
              predicate: { atLocation: 'your_room' },
              setsFlags: ['kept_to_yourself'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 40, items: [], flags: ['knows:sora'], abilities: [], reputation: [] },
        },
        {
          id: 'the_thing_she_noticed',
          playerCopy: 'Her smile drops for one second as an assistant manager crosses the deck.',
          directorNotes:
            'She asks whether you want to hear something weird, and then tells you about the bag. Saying no is a complete route with no nagging afterwards: the resort stays wonderful, she keeps inviting you to things, and the world resolves this without you. Do not punish it and do not have her sulk.',
          enterWhen: { flagsSet: ['knows:sora'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'want_to_hear_it',
              label: 'Ask what she means',
              predicate: { flagsSet: ['spoke:sora'] },
              setsFlags: ['in_it', 'knows:the_bag'],
              closesFlags: ['not_my_problem'],
            },
            {
              routeId: 'not_my_problem',
              label: 'Tell her honestly that this is not your week for it',
              predicate: { flagsSet: ['used:be_a_guest'] },
              setsFlags: ['not_my_problem', 'she_carries_on_anyway'],
              closesFlags: [],
            },
            {
              routeId: 'asked_the_manager',
              label: 'Go and ask the man in the blazer directly',
              predicate: { flagsSet: ['spoke:eli'] },
              setsFlags: ['in_it', 'knows:the_bag', 'eli_has_your_name'],
              closesFlags: ['not_my_problem'],
            },
          ],
          rewards: { xp: 50, items: [], flags: ['the_first_day_is_over'], abilities: [], reputation: [{ factionId: 'faction_floor', amount: 8 }] },
        },
      ],
    },
    {
      id: 'q_the_bag',
      title: 'The Bag In The Shed',
      summary: 'A man checked out at ten past eight and his equipment was locked in a shed at half past nine, and both of those things are on record somewhere.',
      kind: 'MAIN',
      startsActive: false,
      involvedCharacterIds: ['sora', 'celeste', 'eli', 'june'],
      involvedLocationIds: ['watersports_shed', 'adrian_room', 'the_lobby', 'rooftop_bar'],
      knownRewardCopy: 'Enough that it stops being a feeling and starts being a contradiction.',
      steps: [
        {
          id: 'what_is_in_the_shed',
          playerCopy: 'The blue bag is exactly where she said it was.',
          directorNotes:
            'Sunlight, sunscreen, a padlock somebody opened for a reason. Whatever the player does, the bag does not stay here past the second night. Photograph it and the photograph survives; leave it and there is nothing to point at afterwards.',
          enterWhen: { flagsSet: ['in_it'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'photographed_it',
              label: 'Photograph it where it lies, with the time on it',
              predicate: { flagsSet: ['used:document_it_properly'] },
              setsFlags: ['have_the_photo', 'knows:the_residue'],
              closesFlags: [],
            },
            {
              routeId: 'took_the_page',
              label: 'Take the torn page out of it',
              predicate: { hasItems: ['the_notebook_page'] },
              setsFlags: ['have_the_page', 'knows:the_number'],
              closesFlags: [],
            },
            {
              routeId: 'left_it_alone',
              label: 'Look, touch nothing, and let staff arrive',
              predicate: { flagsSet: ['used:notice_the_wrong_thing'] },
              setsFlags: ['saw_the_bag', 'knows:the_residue'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['the_bag_is_established'], abilities: [], reputation: [] },
        },
        {
          id: 'the_room_that_was_cleaned',
          playerCopy: 'Ocean Tower 808 has been cleaned to a standard the rest of this hotel does not reach.',
          directorNotes:
            'Nothing in here is proof. A charger in the wall, a shirt behind a drawer, a bandage wrapper, and not enough mess for a man who packed himself. The orange dive watch is the one hard object, and only because Sora made a joke about it on his first afternoon.',
          enterWhen: { flagsSet: ['the_bag_is_established'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'got_in_the_room',
              label: 'Get into 808 yourself',
              predicate: { atLocation: 'adrian_room' },
              setsFlags: ['saw_the_room', 'knows:the_watch'],
              closesFlags: [],
            },
            {
              routeId: 'housekeeping_told_you',
              label: 'Ask the housekeeper who cleaned it what she found',
              predicate: { flagsSet: ['used:ask_a_staff_member_a_real_question'] },
              setsFlags: ['the_floor_helped_you', 'knows:the_watch'],
              closesFlags: [],
            },
            {
              routeId: 'the_bar_remembers',
              label: 'Ask the woman who works the late shift what he was like',
              predicate: { flagsSet: ['spoke:june'] },
              setsFlags: ['june_is_talking', 'knows:the_watch'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['knows:the_checkout_is_wrong'], abilities: [], reputation: [{ factionId: 'faction_floor', amount: 10 }] },
        },
        {
          id: 'the_man_on_the_camera',
          playerCopy: 'Somebody in his hat wheeled a case across that lobby at four minutes past eight.',
          directorNotes:
            'The footage is genuinely distant and management’s case is genuinely plausible. The dive watch is the crack: the man in the frame is not wearing it. Celeste holds the only clear images and will not release unedited campaign work, which is a real professional stake and not obstruction for its own sake.',
          enterWhen: { flagsSet: ['knows:the_checkout_is_wrong'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'got_the_frames',
              label: 'Get four frames out of Celeste',
              predicate: { hasItems: ['celestes_photos'] },
              setsFlags: ['have_the_frames', 'knows:it_was_not_him'],
              closesFlags: [],
            },
            {
              routeId: 'the_watch',
              label: 'Prove the man in the footage is not wearing the watch',
              predicate: { hasItems: ['the_dive_watch'] },
              setsFlags: ['knows:it_was_not_him', 'have_the_watch'],
              closesFlags: [],
            },
            {
              routeId: 'the_system_itself',
              label: 'Get somebody to look at the checkout metadata',
              predicate: { flagsSet: ['used:push_somebody_who_is_lying'] },
              setsFlags: ['knows:it_was_not_him', 'the_house_is_looking'],
              closesFlags: [],
            },
            {
              routeId: 'never_proved_it',
              label: 'Never manage to get past the resort’s own records',
              predicate: { flagsSet: ['used:be_a_guest'], afterWorldMinute: 1200 },
              setsFlags: ['the_records_held'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['the_checkout_question_is_settled'], abilities: [], reputation: [{ factionId: 'faction_offisland', amount: 12 }] },
        },
      ],
    },
    {
      id: 'q_the_lie',
      title: 'Where She Was That Night',
      summary: 'A keycard opened the east path gate at eleven forty on Tuesday and the name on it is the person who brought you into this.',
      kind: 'MAIN',
      startsActive: false,
      involvedCharacterIds: ['sora', 'luka', 'nami', 'june'],
      involvedLocationIds: ['east_cove', 'dive_centre', 'staff_backstep', 'pink_tide_shore'],
      knownRewardCopy: 'The truth about the one person here you were not investigating.',
      steps: [
        {
          id: 'the_keycard',
          playerCopy: 'Her card opened the east gate the night he fell, and she told you she was on the roof.',
          directorNotes:
            'This is the world’s cruellest ordinary moment. She lied about being somewhere restricted with an ex-fling and she is far more embarrassed than guilty. Confront her harshly and it costs real relationship; ask fairly and she tells you everything including the impact she heard and did not investigate.',
          enterWhen: { flagsSet: ['the_bag_is_established'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_her_kindly',
              label: 'Ask her somewhere with nobody else in it',
              predicate: { flagsSet: ['spoke:sora'], atLocation: 'pink_tide_shore' },
              setsFlags: ['she_told_you', 'knows:the_impact', 'she_trusts_you_now'],
              closesFlags: [],
            },
            {
              routeId: 'pushed_her',
              label: 'Put the log in front of her and press',
              predicate: { flagsSet: ['used:push_somebody_who_is_lying'] },
              setsFlags: ['she_told_you', 'knows:the_impact', 'you_hurt_her'],
              closesFlags: [],
            },
            {
              routeId: 'luka_said_it_first',
              label: 'Get it from Luka instead',
              predicate: { flagsSet: ['spoke:luka'] },
              setsFlags: ['luka_told_you', 'knows:the_impact'],
              closesFlags: [],
            },
            {
              routeId: 'accused_them',
              label: 'Decide the pair of them did it and say so out loud',
              predicate: { flagsSet: ['used:push_somebody_who_is_lying'], atLocation: 'infinity_pool' },
              setsFlags: ['accused_luka', 'you_hurt_her'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 70, items: [], flags: ['knows:she_was_there'], abilities: [], reputation: [] },
        },
        {
          id: 'the_woman_at_the_far_end_of_the_beach',
          playerCopy: 'The phone number on the torn page has a Kagetsu prefix and belongs to somebody on this island.',
          directorNotes:
            'Nami is not hiding from you, she is hiding from a legal department. She talks in units and dates and she will not describe an unpublished result as a finding. What she wants is a cleanup and an honest assessment, not the resort destroyed, and the difference matters to every ending in this world.',
          enterWhen: { flagsSet: ['knows:she_was_there'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_admitted_it',
              label: 'Show her the page with her own number on it',
              predicate: { hasItems: ['the_notebook_page'] },
              setsFlags: ['nami_is_the_source', 'knows:the_barrels'],
              closesFlags: [],
            },
            {
              routeId: 'talked_science',
              label: 'Ask her an honest technical question and listen to the answer',
              predicate: { flagsSet: ['spoke:nami'] },
              setsFlags: ['nami_is_the_source', 'knows:the_barrels', 'she_rates_you'],
              closesFlags: [],
            },
            {
              routeId: 'the_survey_file',
              label: 'Get the survey out of her hands and into yours',
              predicate: { hasItems: ['the_survey_file'] },
              setsFlags: ['have_the_survey', 'knows:the_barrels'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['knows:what_this_is_about'], abilities: ['sit_with_her_when_she_is_not_being_fun'], reputation: [{ factionId: 'faction_offisland', amount: 10 }] },
        },
      ],
    },
    {
      id: 'q_the_cove',
      title: 'East Cove',
      summary: 'A fence, a survey sign, a service ledge four metres above the water, and a cave mouth that is open for ninety minutes either side of low tide.',
      kind: 'MAIN',
      startsActive: false,
      involvedCharacterIds: ['luka', 'nami', 'adrian', 'eli', 'sora'],
      involvedLocationIds: ['east_cove', 'lighthouse', 'sea_cave', 'the_marina'],
      knownRewardCopy: 'The man everybody has been arguing about, one way or the other.',
      steps: [
        {
          id: 'the_lighthouse',
          playerCopy: 'Somebody slept in the keeper’s quarters recently, and left in a hurry.',
          directorNotes:
            'A rolled mat, three water bottles, a charger with no phone. This is where the staged disappearance stops being a theory. It is also a beautiful place in hard sunlight and should be written as one.',
          enterWhen: { flagsSet: ['knows:she_was_there'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'found_the_camp',
              label: 'Get up the cliff path and into the keeper’s quarters',
              predicate: { atLocation: 'lighthouse' },
              setsFlags: ['knows:he_staged_it', 'found_the_camp'],
              closesFlags: [],
            },
            {
              routeId: 'nami_admitted_helping',
              label: 'Get Nami to admit she helped him hide',
              predicate: { flagsSet: ['nami_is_the_source'] },
              setsFlags: ['knows:he_staged_it'],
              closesFlags: [],
            },
            {
              routeId: 'the_editor',
              label: 'Get his editor on the phone',
              predicate: { flagsSet: ['used:ask_a_staff_member_a_real_question'], afterWorldMinute: 540 },
              setsFlags: ['knows:he_staged_it', 'the_editor_is_awake'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['the_lighthouse_is_understood'], abilities: [], reputation: [] },
        },
        {
          id: 'the_night_it_gets_bad',
          playerCopy: 'The ferries are cancelled, the pool is closed, and somebody is using the weather to move things.',
          directorNotes:
            'Storm night. The building is full of guests and still serving dinner, which is the tonal identity of this world in one image. Sora becomes professional and decisive and stops being fun, and that is the first time the player sees the real one.',
          enterWhen: { flagsSet: ['the_lighthouse_is_understood'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'watched_him_move_it',
              label: 'Watch who goes back of house while the lobby is full',
              predicate: { flagsSet: ['used:notice_the_wrong_thing'], atLocation: 'service_corridors' },
              setsFlags: ['saw_eli_move_it', 'knows:it_was_eli'],
              closesFlags: [],
            },
            {
              routeId: 'stayed_with_her',
              label: 'Stay with Sora through the worst of it',
              predicate: { flagsSet: ['used:sit_with_her_when_she_is_not_being_fun'] },
              setsFlags: ['stayed_with_her', 'knows:the_earring'],
              closesFlags: [],
            },
            {
              routeId: 'cornered_him',
              label: 'Corner Eli somewhere public with what you have',
              predicate: { flagsSet: ['used:push_somebody_who_is_lying'], flagsUnset: ['not_my_problem'] },
              setsFlags: ['eli_cracked', 'knows:it_was_eli', 'knows:where_he_went_over'],
              closesFlags: [],
            },
            {
              routeId: 'slept_through_it',
              label: 'Have dinner, go to bed, and let the island handle its own weather',
              predicate: { atLocation: 'your_room', afterWorldMinute: 1320 },
              setsFlags: ['slept_through_it'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 90, items: [], flags: ['the_storm_happened'], abilities: [], reputation: [{ factionId: 'faction_floor', amount: 12 }, { factionId: 'faction_house', amount: 14 }] },
        },
        {
          id: 'the_shelf_in_the_cave',
          playerCopy: 'The mouth is open for ninety minutes and there is somebody on the shelf inside it.',
          directorNotes:
            'The one genuinely dangerous place in this world. He is alive unless the run has taken too long, in which case he is not, and the writing must not soften either outcome. If he is found, Owen Kent can keep him stable until the launch gets round the headland.',
          enterWhen: { flagsSet: ['the_storm_happened'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_in_at_low_water',
              label: 'Go in at low water with somebody who knows the tide',
              predicate: { flagsSet: ['used:go_out_in_it'], atLocation: 'sea_cave' },
              setsFlags: ['found_him_alive', 'adrian_is_out'],
              closesFlags: ['too_late'],
            },
            {
              routeId: 'luka_took_you_round',
              label: 'Get Luka to take the boat round the headland',
              predicate: { flagsSet: ['spoke:luka'], atLocation: 'sea_cave' },
              setsFlags: ['found_him_alive', 'adrian_is_out', 'luka_is_cleared'],
              closesFlags: ['too_late'],
            },
            {
              routeId: 'sent_the_professionals',
              label: 'Give the police and the coastguard the location and let them do it',
              predicate: { flagsSet: ['knows:where_he_went_over'] },
              setsFlags: ['adrian_is_out', 'police_found_him'],
              closesFlags: ['too_late'],
            },
            {
              routeId: 'too_late',
              label: 'Get there after the week has already taken too long',
              predicate: { flagsSet: ['the_storm_happened'], afterWorldMinute: 1380 },
              setsFlags: ['too_late', 'adrian_died'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 120, items: [], flags: ['the_missing_man_is_answered'], abilities: [], reputation: [{ factionId: 'faction_offisland', amount: 20 }, { factionId: 'faction_corporate', amount: 20 }] },
        },
      ],
    },
    {
      id: 'q_checkout',
      title: 'Checkout',
      summary: 'What happens to the man who covered it up, what happens to four barrels in a cave, and what happens on the ferry on Sunday morning.',
      kind: 'MAIN',
      startsActive: false,
      involvedCharacterIds: ['reika', 'marcus', 'eli', 'nami', 'sora'],
      involvedLocationIds: ['the_lobby', 'the_villas', 'ferry_dock', 'infinity_pool'],
      knownRewardCopy: 'A week that ends the way you chose to end it.',
      steps: [
        {
          id: 'what_happens_to_eli',
          playerCopy: 'A man who has not slept since Tuesday is standing in a lobby he built his whole life around.',
          directorNotes:
            'He is not a monster and must not be written as one. He panicked over a camera strap and then made every following hour worse. A confession, an arrest, a resignation and a man who is never charged at all are all real outcomes here.',
          enterWhen: { flagsSet: ['the_missing_man_is_answered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_confessed',
              label: 'Get him to say it himself, before anybody makes him',
              predicate: { flagsSet: ['eli_cracked'] },
              setsFlags: ['eli_confessed'],
              closesFlags: [],
            },
            {
              routeId: 'the_police_took_him',
              label: 'Hand the metadata and the frames to the detective',
              predicate: { flagsSet: ['knows:it_was_eli', 'have_the_frames'] },
              setsFlags: ['eli_arrested'],
              closesFlags: [],
            },
            {
              routeId: 'marcus_gave_him_up',
              label: 'Let corporate decide he is the cheaper loss',
              predicate: { flagsSet: ['spoke:marcus'] },
              setsFlags: ['eli_arrested', 'corporate_moved_first'],
              closesFlags: [],
            },
            {
              routeId: 'nothing_stuck',
              label: 'Never get anything on him that holds',
              predicate: { flagsSet: ['the_records_held'] },
              setsFlags: ['eli_walked'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 100, items: [], flags: ['the_man_is_answered'], abilities: [], reputation: [{ factionId: 'faction_house', amount: 20 }, { factionId: 'faction_corporate', amount: 22 }] },
        },
        {
          id: 'what_happens_to_the_cove',
          playerCopy: 'Four barrels went into those caves eight years ago and the expansion consent is waiting on a signature.',
          directorNotes:
            'The second question, and it does not resolve automatically with the first. Full exposure, a negotiated cleanup, a regulator route, a settlement with your own silence in it and simply walking away are all authored outcomes with different people paying for each.',
          enterWhen: { flagsSet: ['the_man_is_answered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'published',
              label: 'Put all of it into the open',
              predicate: { flagsSet: ['knows:the_barrels', 'the_editor_is_awake'] },
              setsFlags: ['it_went_public', 'the_cove_is_answered'],
              closesFlags: [],
            },
            {
              routeId: 'the_moderate_solution',
              label: 'Halt the expansion, get an independent audit and keep the doors open',
              predicate: { flagsSet: ['knows:the_barrels'], minFactionReputation: [{ factionId: 'faction_house', value: 45 }] },
              setsFlags: ['cleanup_secured', 'resort_survives', 'the_cove_is_answered'],
              closesFlags: [],
            },
            {
              routeId: 'took_the_deal',
              label: 'Take what Marcus is offering',
              predicate: { flagsSet: ['spoke:marcus'], minFactionReputation: [{ factionId: 'faction_corporate', value: 40 }] },
              setsFlags: ['took_the_settlement', 'the_cove_is_answered'],
              closesFlags: [],
            },
            {
              routeId: 'left_it',
              label: 'Decide this part is not yours to carry',
              predicate: { flagsSet: ['used:be_a_guest'], afterWorldMinute: 600 },
              setsFlags: ['left_the_cove_alone', 'the_cove_is_answered'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 110, items: [], flags: ['the_cove_question_is_settled'], abilities: [], reputation: [{ factionId: 'faction_offisland', amount: 15 }] },
        },
        {
          id: 'the_ferry_on_sunday',
          playerCopy: 'Four crossings a day, and one of them has your name against it.',
          directorNotes:
            'The last morning. Whatever happened this week, this is a question about two people at a dock and what either of them is willing to say out loud. Leaving is not a failure and staying is not a reward.',
          enterWhen: { flagsSet: ['the_first_day_is_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'you_kept_it',
              label: 'Agree, out loud, that this continues past the ferry',
              predicate: { flagsSet: ['she_trusts_you_now'], minRelationship: [{ characterId: 'sora', dimension: 'affection', value: 70 }] },
              setsFlags: ['it_survived_checkout'],
              closesFlags: [],
            },
            {
              routeId: 'you_let_it_be_summer',
              label: 'Let it be exactly what it was and say goodbye properly',
              predicate: { minRelationship: [{ characterId: 'sora', dimension: 'affection', value: 55 }] },
              setsFlags: ['just_summer'],
              closesFlags: [],
            },
            {
              routeId: 'you_stayed',
              label: 'Miss the boat on purpose',
              predicate: { flagsSet: ['used:be_a_guest'], atLocation: 'ferry_dock' },
              setsFlags: ['stayed_on'],
              closesFlags: [],
            },
            {
              routeId: 'you_went_early',
              label: 'Take an early crossing and go home',
              predicate: { atLocation: 'ferry_dock' },
              setsFlags: ['left_early', 'left_the_map'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 90, items: [], flags: ['the_week_is_over'], abilities: [], reputation: [] },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_pink_tide',
      atWorldMinute: 1440 + 22 * 60 + 30,
      locationId: 'pink_tide_shore',
      publicCopy:
        'Ten minutes along the sand from the beach club, away from every light the resort owns, the water is glowing. Rose-magenta, faint, and brighter wherever anything moves through it. Sora is already ankle deep and turning round to see whether you are coming.',
      directorNotes:
        'Pure beauty first. Do not put a clue in this scene, do not have anybody watching from a cliff, and do not cut it short. It is the best thing on this island and it is being offered to the player with no agenda at all. The same light becomes useful later, and only later.',
      setsFlags: ['the_pink_tide_happened'],
      cancelledByFlags: ['left_early'],
      requiresFlags: ['knows:sora'],
      movesCharacters: [{ characterId: 'sora', toLocationId: 'pink_tide_shore' }],
    },
    {
      id: 'we_the_bag_is_gone',
      atWorldMinute: 1440 + 11 * 60,
      locationId: 'watersports_shed',
      publicCopy:
        'The shed is open, two board hires are being signed out, and there is a clean rectangle of dust on the shelf where the blue bag was.',
      directorNotes:
        'This is the moment the world stops being a rumour. Nobody is dramatic about it. A member of staff is standing right there, cheerfully, and has no idea what has been moved or why.',
      setsFlags: ['the_bag_is_gone'],
      cancelledByFlags: ['have_the_photo'],
      requiresFlags: ['knows:the_bag'],
      movesCharacters: [],
    },
    {
      id: 'we_your_key_stops_working',
      atWorldMinute: 2 * 1440 + 15 * 60 + 40,
      locationId: 'your_room',
      publicCopy:
        'Your key does not work. Front desk apologise beautifully, offer you a drink while they fix it, and it takes four hours and eleven minutes to fix. Nothing in your room has been touched, except that the towel you left on the balcony rail is on the chair.',
      directorNotes:
        'Eli’s warning style: no threat, no confrontation, perfect service, and a message that only lands if you were already asking questions. The towel might genuinely be housekeeping. Leave the ambiguity in.',
      setsFlags: ['the_key_stopped_working', 'eli_has_your_name'],
      cancelledByFlags: ['not_my_problem'],
      requiresFlags: ['in_it'],
      movesCharacters: [],
    },
    {
      id: 'we_the_rooftop_party',
      atWorldMinute: 2 * 1440 + 21 * 60,
      locationId: 'rooftop_bar',
      publicCopy:
        'Eleven floors up, the whole guest list at once: an influencer working four looks, a surgeon on his own being very good company, a honeymoon couple who are not speaking, and a bartender putting the right drink down in front of everybody before they ask.',
      directorNotes:
        'The ensemble scene. Everybody here is escaping something and almost none of it is the crime. This is where a player who is not investigating has the best night of their week, and where a player who is picks up three things by accident.',
      setsFlags: ['the_rooftop_party_happened'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'celeste', toLocationId: 'rooftop_bar' },
        { characterId: 'luka', toLocationId: 'rooftop_bar' },
      ],
    },
    {
      id: 'we_celeste_posts',
      atWorldMinute: 3 * 1440 + 10 * 60,
      locationId: 'infinity_pool',
      publicCopy:
        'Celeste posts the lobby set. Thirty-one frames, beautifully graded, and in four of them, small and out of focus behind her shoulder, a man in a hat is wheeling a case toward the doors.',
      directorNotes:
        'The clue arrives by accident and in public. It is real, timestamped and unhelpfully cropped, and getting the originals means dealing with a woman whose entire income depends on unreleased campaign work staying unreleased.',
      setsFlags: ['the_set_is_public'],
      cancelledByFlags: ['have_the_frames'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_nami_almost_tells_you',
      atWorldMinute: 3 * 1440 + 20 * 60 + 30,
      locationId: 'rooftop_bar',
      publicCopy:
        'The woman from the far end of the beach is at the quiet end of the bar with one drink and her back to the room, and she looks at you for slightly too long before deciding not to say whatever it was.',
      directorNotes:
        'She is four days into wondering whether a man is dead because of one email. She is not mysterious about it; she is frightened of a legal department. If somebody sits down and asks a real question, she nearly answers it.',
      setsFlags: ['nami_nearly_said_it'],
      cancelledByFlags: ['nami_is_the_source'],
      requiresFlags: ['knows:the_number'],
      movesCharacters: [{ characterId: 'nami', toLocationId: 'rooftop_bar' }],
    },
    {
      id: 'we_the_detective',
      atWorldMinute: 4 * 1440 + 11 * 60,
      locationId: 'the_lobby',
      publicCopy:
        'A woman in a linen jacket comes off the eleven o’clock ferry with one bag and no swimwear. Detective Ayaka Nishimura, Kagetsu prefectural police, here because somebody made a call. She is polite, quick, and entirely unimpressed by the lobby.',
      directorNotes:
        'The police are competent and the mystery survives them, because the evidence is genuinely ambiguous rather than because anybody is stupid. She can request footage, contact the editor and inspect a room, and all of that takes the time it takes.',
      setsFlags: ['the_police_are_here'],
      cancelledByFlags: ['not_my_problem'],
      requiresFlags: ['knows:the_checkout_is_wrong'],
      movesCharacters: [],
    },
    {
      id: 'we_the_storm_warning',
      atWorldMinute: 4 * 1440 + 16 * 60,
      locationId: 'beach_club',
      publicCopy:
        'The activities board gets rewritten in front of everybody: no catamaran, no dive, no jet ski from tomorrow afternoon. The sea is still flat and gorgeous. The staff have started doing the small unhurried things that people do when they have done this before.',
      directorNotes:
        'Weather as pressure, once, briefly. Boats stop, the eastern tide gets dangerous, and every plan involving the cave now has a deadline attached to it.',
      setsFlags: ['the_storm_is_coming'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_storm_night',
      atWorldMinute: 5 * 1440 + 21 * 60,
      locationId: 'the_lobby',
      publicCopy:
        'Wind slams the palms flat and the generator flickers twice and holds. Four hundred guests are packed into the lobby and the restaurants, and the kitchen is still sending out dinner. Somewhere behind the marble a service door opens and closes.',
      directorNotes:
        'Classic closed-circle pressure in one night. Sora runs the room and stops being fun, which is the first honest look at her anybody gets. Somebody uses the chaos to move or destroy something, and the east cove tide becomes genuinely lethal.',
      setsFlags: ['the_storm_broke'],
      cancelledByFlags: [],
      requiresFlags: ['the_storm_is_coming'],
      movesCharacters: [
        { characterId: 'sora', toLocationId: 'the_lobby' },
        { characterId: 'eli', toLocationId: 'service_corridors' },
      ],
    },
    {
      id: 'we_breakfast_after',
      atWorldMinute: 6 * 1440 + 8 * 60 + 30,
      locationId: 'infinity_pool',
      publicCopy:
        'The morning after is absurdly beautiful. Palm fronds all over the deck, two staff sweeping, the water flat as glass, and Sora at a table with an enormous stack of pancakes and wet hair, eating like somebody who has not eaten since Thursday.',
      directorNotes:
        'The tonal thesis of the entire world. Whatever happened last night, the resort breakfast is still excellent and she is still hungry. If the player asks how she can eat, she has an answer, and it is not a brave speech.',
      setsFlags: ['breakfast_after_the_bad_night'],
      cancelledByFlags: ['left_early'],
      requiresFlags: ['the_storm_broke'],
      movesCharacters: [{ characterId: 'sora', toLocationId: 'infinity_pool' }],
    },
  ],
  promises: [
    {
      id: 'p_the_week',
      kind: 'FINALE',
      label: 'A vacation you genuinely do not want to end',
      seedHint: 'Hot stone, a swim-up bar, and forty minutes on the island before somebody decides your posture is unacceptable.',
      payoffHint: 'A last breakfast at a table by the water, with everything that happened this week sitting at it too.',
      weight: 1,
    },
    {
      id: 'p_sora',
      kind: 'RELATIONSHIP',
      label: 'Who she is on a day when she cannot be fun',
      seedHint: 'She gets louder and more entertaining every time a conversation gets close to anything true.',
      payoffHint: 'One quiet hour in which nothing is solved and she twists a small gold star earring the whole way through it.',
      weight: 1,
    },
    {
      id: 'p_the_missing_man',
      kind: 'MYSTERY',
      label: 'The guest who checked out without leaving',
      seedHint: 'A blue equipment bag inside a shed that was locked, an hour and twenty minutes after he supposedly took the ferry.',
      payoffHint: 'A tidal shelf under the east cliffs, an eleven-year-old maintenance cache, and a man who is much angrier than grateful.',
      weight: 1,
    },
    {
      id: 'p_east_cove',
      kind: 'MYSTERY',
      label: 'What is actually under the water at the pretty end of the island',
      seedHint: 'A cove closed for survey work, which is partly true, and a security camera pointed politely away from it.',
      payoffHint: 'Four barrels, eight years, one sick contractor, and a signature waiting on a marina consent.',
      weight: 0.9,
    },
    {
      id: 'p_checkout',
      kind: 'FINALE',
      label: 'Whether any of this survives the ferry',
      seedHint: 'Four crossings a day and a departures board you keep not looking at.',
      payoffHint: 'A dock on Sunday morning, two people, and whichever of them is willing to say it out loud first.',
      weight: 0.9,
    },
  ],
  archetypes: [
    {
      id: 'arch_burnt_out',
      name: 'You Have Not Stopped',
      role: 'Perception and stubbornness',
      summary: 'Somebody made you take this week. You have not slept properly since the spring, you notice everything because noticing is the last thing your job left you, and you are physically bad at relaxing.',
      playstyle: ['Observant', 'Restless', 'Slow to relax'],
      blurb: 'You are the guest who spots the bag on day one and has to be persuaded into the water, and both of those are the same trait.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { notice: 3, read_people: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [],
    },
    {
      id: 'arch_easy_company',
      name: 'People Tell You Things',
      role: 'Charm and access',
      summary: 'You are good in a bar. Strangers hand you their whole lives by the second drink and always have, and you have never entirely worked out whether that is a talent or a way of avoiding your own.',
      playstyle: ['Charming', 'Sociable', 'Nosy'],
      blurb: 'Every closed door on this island has a person standing next to it, and people is the thing you are unreasonably good at.',
      attributeBonus: { presence: 3, mind: 1 },
      skillProficiencies: { charm: 3, read_people: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_floor', amount: 10 }],
    },
    {
      id: 'arch_water',
      name: 'You Are Better In Water',
      role: 'Swimming and boats',
      summary: 'Open water since you were a child. You have done the certifications, you read a swell without thinking about it, and you are the only guest here who could get to the far side of that headland unaided.',
      playstyle: ['Strong swimmer', 'Physical', 'Direct'],
      blurb: 'Half of this island’s secrets are on the other side of a stretch of water, and you are the person on this ferry least worried about that.',
      attributeBonus: { might: 3, agility: 1 },
      skillProficiencies: { water: 3, stamina: 2 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [],
    },
    {
      id: 'arch_checker',
      name: 'You Check Things',
      role: 'Documents and inconsistencies',
      summary: 'Audit, claims, compliance, procurement — whichever it was, your whole professional life is reading a record and finding the line where two documents stop agreeing with each other.',
      playstyle: ['Methodical', 'Sceptical', 'Patient'],
      blurb: 'You are not a detective and you have never wanted to be. You simply cannot stop noticing when a checkout time and a padlock disagree.',
      attributeBonus: { mind: 3, presence: 1 },
      skillProficiencies: { notice: 2, nerve: 2, money: 1 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_offisland', amount: 8 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What is on the booking?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Rin' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'What did you bring with you?',
      helpText:
        'Who you are away from this island, which decides what you are unreasonably good at here and what everybody assumes about you at the pool. It is fixed for the week. It does not decide whether you investigate anything, who you fall for, or how any of this ends.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'How did you end up with seven nights at Aster Cove?',
      helpText: 'Entirely yours. A prize, a work perk, a transferred cancellation, a birthday, a honeymoon you are on alone. One line, and the island will believe it.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. A colleague won it in a raffle, could not go, and I said yes before I thought about it.',
    },
    {
      id: 'what_you_are_escaping',
      label: 'What did you leave at home?',
      helpText: 'Everybody at this resort is escaping something. A starting position, not a commitment — you are allowed to discover halfway through the week that it was something else.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'a_job', label: 'A job that has taken three years and given nothing back' },
        { id: 'a_person', label: 'Somebody you have not finished being angry with' },
        { id: 'nothing_at_all', label: 'Nothing. You are genuinely just here for the pool' },
        { id: 'a_decision', label: 'A decision waiting for you on Monday that you have not made' },
        { id: 'yourself', label: 'The version of you that everybody at home already agreed on' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does the pool see when you walk out onto the deck?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Someone whose swimwear is brand new and whose tan line is from a shirt collar.',
    },
  ],
  endings: [
    {
      id: 'end_perfect_week',
      name: 'Perfect Week',
      rarity: 'COMMON',
      minTurn: 34,
      requires: { flagsSet: ['the_week_started_well', 'the_week_is_over'], flagsUnset: ['adrian_died'] },
      condition:
        'They had the holiday. Swimming, sunburn, a rooftop night they will describe badly to people at home, and somebody else’s crisis resolving quietly in the background. Write this as the genuine good outcome it is, not as a missed opportunity, because for most people it is the point of a resort.',
      epilogue:
        'Eleven photographs, four of which are of the pool. They sleep on the ferry. Three weeks later a message arrives from a number saved as SORA POOL that begins "okay you are not going to believe what happened after you left", and it takes eleven minutes to read.',
      hint: '',
    },
    {
      id: 'end_pink_tide',
      name: 'Pink Tide',
      rarity: 'RARE',
      minTurn: 40,
      requires: {
        flagsSet: ['it_survived_checkout'],
        minRelationship: [
          { characterId: 'sora', dimension: 'affection', value: 75 },
          { characterId: 'sora', dimension: 'trust', value: 70 },
        ],
      },
      condition:
        'Both of them said it out loud, at a dock, in daylight, with no glowing water to help. This is an adult decision about distance, work and two lives that are currently four hundred kilometres apart, and it should read as a plan rather than a swoon.',
      epilogue:
        'The first month is ferries and terrible sleep. She comes to the mainland in October when the season ends, with one bag and a notebook, and stays longer each time. Neither of them ever quite agrees on which night it started, and both of them are wrong, because it was the first afternoon at the pool.',
      hint: '',
    },
    {
      id: 'end_just_summer',
      name: 'Just Summer',
      rarity: 'UNCOMMON',
      minTurn: 38,
      requires: { flagsSet: ['just_summer'] },
      condition:
        'A real thing that both of them chose to let end at the ferry. No betrayal, no cowardice, nobody secretly hoping. Write the goodbye as warm and slightly wrecked and absolutely not as a failure — this is the most common true story about a week like this and it deserves the same care as the other one.',
      epilogue:
        'They kiss on the dock in front of the eleven o’clock crossing and mean every part of it. She goes back up the hill to a shift. He or she stands on the top deck until the island is a shape. They text for about five weeks and then stop, and neither of them minds as much as they expected to.',
      hint: '',
    },
    {
      id: 'end_her_real_smile',
      name: 'Her Real Smile',
      rarity: 'RARE',
      minTurn: 40,
      requires: {
        flagsSet: ['stayed_with_her', 'knows:the_earring'],
        minRelationship: [{ characterId: 'sora', dimension: 'trust', value: 75 }],
      },
      condition:
        'She stopped believing she has to be entertaining to be kept. This is the quietest ending in the world and the one the whole character is built toward, and it can sit alongside any romance outcome or none at all.',
      epilogue:
        'She takes a Tuesday off and does not organise anything on it. June notices first and says nothing, which from June is a standing ovation. The performance does not disappear — it is half of who she is and she likes it — but it stops being the rent she pays to be chosen.',
      hint: '',
    },
    {
      id: 'end_tide_and_salt',
      name: 'Tide & Salt',
      rarity: 'RARE',
      minTurn: 42,
      requires: {
        flagsSet: ['the_week_is_over'],
        minRelationship: [{ characterId: 'sora', dimension: 'trust', value: 72 }],
        minFactionReputation: [{ factionId: 'faction_floor', value: 55 }],
      },
      condition:
        'The notebook became a lease. Player involvement can be friend, partner, investor or nothing but the person who told her the numbers worked. Do not write the business as a reward for romance; she has been forty per cent of the way to this for two years.',
      epilogue:
        'Twenty-two square metres, four boards, a coffee machine that was a terrible idea and a sign her sister painted. It is not immediately profitable. She works the season at the resort for one more summer to cover the gap, and stops telling people it was her father’s idea, because by the second winter it is plainly hers.',
      hint: '',
    },
    {
      id: 'end_sora_stays',
      name: 'Sora Stays',
      rarity: 'UNCOMMON',
      minTurn: 42,
      requires: {
        flagsSet: ['the_week_is_over'],
        minFactionReputation: [{ factionId: 'faction_house', value: 55 }],
      },
      condition:
        'Reika offers her something real after the way she ran a lobby full of frightened guests, and she takes it. This is not selling out and must never be written as one: it is a career, with a salary, at a place she loves and understands better than anybody in management.',
      epilogue:
        'Guest experience manager by the following spring, which means rotas, budgets and being the person who says no. She is startlingly good at it. The notebook stays in the locker and gets a new page about once a month, which is not the same as being over.',
      hint: '',
    },
    {
      id: 'end_the_missing_man',
      name: 'The Missing Man',
      rarity: 'RARE',
      minTurn: 38,
      requires: { flagsSet: ['adrian_is_out', 'the_man_is_answered'] },
      condition:
        'He came off that shelf alive and the record now says what actually happened on the path. Write the rescue as logistics rather than heroics — a tide window, a launch, a surgeon on holiday, and a man too dehydrated to be as articulate as he would like.',
      epilogue:
        'Two operations on the wrist and a scar down the calf he will show people for the rest of his life. He is furious with himself in interviews and charming about it, which is the same thing he was before. He sends exactly one message that is not about the story, and it is an apology to somebody who spent three days wondering whether she should have spoken up.',
      hint: '',
    },
    {
      id: 'end_eli_confesses',
      name: 'Eli Confesses',
      rarity: 'RARE',
      minTurn: 40,
      requires: { flagsSet: ['eli_confessed'] },
      condition:
        'He said it himself, before anybody could make him, and what he gave up was the one thing nobody else had: where on that path the man went over. He is not redeemed by it. He is a man who has not slept in five days being allowed to stop.',
      epilogue:
        'He pleads to what he actually did and the difference between the shove and the grab never gets settled, including by him. Two years, out in fourteen months. Reika writes a letter to the court that costs her something, and puts it on the file that four hundred and eleven people kept their jobs partly because of the way he ran that building for nine years.',
      hint: '',
    },
    {
      id: 'end_paradise_saved',
      name: 'Paradise Saved',
      rarity: 'RARE',
      minTurn: 42,
      requires: { flagsSet: ['cleanup_secured', 'resort_survives'] },
      condition:
        'The hardest outcome to reach and the one the whole world is arguing for: the truth came out, the caves get cleaned, the expansion stops, and the place stays open. Nobody gets everything. Nami wanted more disclosure, corporate wanted less, and both of them signed.',
      epilogue:
        'An independent audit, a public statement with one paragraph that took nine days to negotiate, and a compensation payment to a contractor in Kagetsu who has been ill for eight years. East cove reopens the following summer and is immediately the most photographed part of the island, which almost nobody there understands the joke of.',
      hint: '',
    },
    {
      id: 'end_the_settlement',
      name: 'The Settlement',
      rarity: 'UNIQUE',
      minTurn: 42,
      requires: { flagsSet: ['took_the_settlement'] },
      condition:
        'They took what Marcus offered. It is a real deal with real cleanup in it and a schedule of things that are never said in public, one of which has the player’s signature under it. No authorial sneering: this genuinely gets barrels out of a cave, and it genuinely keeps a name out of the record.',
      epilogue:
        'The caves are cleaned in the winter by a firm with an unpronounceable name and no press release. The money arrives in two parts. Nami stops answering messages by about March, not angrily, and that turns out to be the actual price. It buys a great deal and it was not free.',
      hint: '',
    },
    {
      id: 'end_paradise_closed',
      name: 'Paradise Closed',
      rarity: 'RARE',
      minTurn: 42,
      requires: { flagsSet: ['it_went_public'], flagsUnset: ['resort_survives'] },
      condition:
        'All of it went out, and the resort did not survive the year. This is a real outcome of doing the right thing loudly and it must not be written as a punishment, or as a triumph. Follow the staff rather than the company: four hundred and eleven people and where each kind of them ends up.',
      epilogue:
        'The pool holds water for another eleven months and then stops being cleaned. Luka gets a boat, badly, and makes it work. June is running a bar in Kagetsu within a year and is better paid. Reika does not work in hospitality again, by choice, and answers her phone to former staff for years afterwards.',
      hint: '',
    },
    {
      id: 'end_checked_out',
      name: 'Checked Out',
      rarity: 'UNCOMMON',
      minTurn: 36,
      requires: { flagsSet: ['eli_walked', 'the_records_held'] },
      condition:
        'The fake departure held. The system says he left at ten past eight, and every person who could contradict it either did not know, could not prove it, or had too much to lose. This is a loss and it should be written flatly, without a last-minute hint that justice is coming.',
      epilogue:
        'A missing-person file opens on the mainland six weeks later, when an editor finally goes to the police, and by then a resort has had two months to be extremely helpful. Somebody sweeps the deck every morning. The pool is beautiful. Nothing about the island looks like the place where this happened, which is exactly the problem.',
      hint: '',
    },
    {
      id: 'end_too_late',
      name: 'Too Late',
      rarity: 'COMMON',
      minTurn: 36,
      requires: { flagsSet: ['adrian_died'] },
      condition:
        'He died on the shelf before anybody reached it. The world does not become grey to mark it. Breakfast is still excellent, the water is still that colour, and the horror of this ending is precisely that paradise continues at full brightness.',
      epilogue:
        'The coastguard recovers him on the Monday. The resort closes east cove properly and puts a second sign up. Sora goes to the mainland for a fortnight and comes back, and nobody who was not there that week can understand why she stops going into the water after dark.',
      hint: '',
    },
    {
      id: 'end_wrong_person',
      name: 'Wrong Person',
      rarity: 'UNCOMMON',
      minTurn: 34,
      requires: { flagsSet: ['accused_luka'] },
      condition:
        'They said it publicly, about somebody who did not do it, and the island believed them for long enough. Solving the case afterwards does not undo this and the story must not pretend otherwise. He was guilty of dawn dives and of being the obvious shape of a suspect.',
      epilogue:
        'He is suspended within a day and finished here within three, because a resort cannot have a rumour standing at the dive centre. He is cleared in a paragraph nobody reads. Two seasons later he has a second-hand boat and a small operation on the mainland and does not take bookings from anybody who was staying at Aster Cove that week.',
      hint: '',
    },
    {
      id: 'end_sunrise_ferry',
      name: 'Sunrise Ferry',
      rarity: 'COMMON',
      minTurn: 22,
      requires: { flagsSet: ['left_early', 'left_the_map'] },
      condition:
        'They left early, on purpose, and it is neither failure nor tragedy. A week at a resort you have gone off is a bad week, and getting on the first boat is a completely reasonable thing an adult does. Write the leaving as a decision, not a retreat.',
      epilogue:
        'The six-forty crossing is nearly empty and the coffee on it is bad. Three days at home, which turn out to be the actual holiday. About a month later a message arrives about something that happened on that island after they left, and they read it twice, and go to work.',
      hint: '',
    },
    {
      id: 'end_one_more_night',
      name: 'One More Night',
      rarity: 'UNIQUE',
      minTurn: 44,
      requires: { flagsSet: ['stayed_on'] },
      condition:
        'They kept extending. A night, then three, then the room becomes a rate, then somebody offers them something to do. This is not a fantasy of escape and should not be written as one — it is a real decision with a job, a lease and a life left unattended on the mainland.',
      epilogue:
        'Three months later they are stacking paddleboards at sunset and being handed a beer by a dive instructor, and cannot say precisely which day the vacation ended. Two things at home were dealt with by phone. One was not, and it is still sitting there, and they know exactly what it is.',
      hint: '',
    },
  ],
  opening:
    'Two seventeen, and the stone around the pool is hot enough to hurt.\n\n' +
    'Forty minutes on this island and you have not unpacked. The water runs out to a far edge that is not there and the ocean carries straight on from it.\n\n' +
    'Then you are wet from the ribs down, because somebody in the shallow end splashed you on purpose.\n\n' +
    'She pushes vivid pink hair back over one shoulder and looks entirely unrepentant about it.\n\n' +
    '"You have been here forty minutes," she says, "and you still look like you are at an airport."\n\n' +
    'She looks you over, unhurried, and decides something.\n\n' +
    '"That is unacceptable."\n\n' +
    'Behind her the whole afternoon is waiting: the swim-up bar, the loungers, a volleyball game somebody is losing badly. A man in a pale linen blazer crosses the far end of the deck counting sunbeds, and does not look at either of you.',
  openingSuggestions: [
    'I wipe the water off my face and look her over right back. "Do all the staff attack guests before they have unpacked, or am I getting the premium package?"',
    'I put the phone down on the lounger, walk to the edge and get in, all at once, in the shirt. "Fine. You were right. Tell me what I am supposed to be doing instead."',
    'I look down at my soaked shirt and say, entirely deadpan, "Amazing. Forty minutes on the island and I already have an enemy." Then I sit on the edge with my feet in the water, because it is very hot and she is not wrong.',
  ],
  coverDirection: [
    'SUBJECT: Sora Amemiya alone at the front of the frame, a key visual for a bright summer anime about a resort island.',
    'Sora fills the foreground from mid-thigh up, centred and close, holding roughly three quarters of the picture.',
    'She is an extremely attractive adult woman of twenty-three: long vivid bubblegum-pink hair to her lower back in',
    'wet beach waves, warm golden-brown eyes, bronzed summer skin, a small beauty mark below her left eye, a very',
    'curvy hourglass figure, a tiny gold star earring in her right ear and a fine gold and shell belly chain.',
    'She wears a white triangle bikini, a low coral-pink wrap sarong knotted loosely at one hip, and an oversized',
    'open white linen shirt slipping off one shoulder, with sunglasses pushed up into her hair.',
    'She stands ankle deep at the edge of a huge infinity pool, turned back toward the viewer over one shoulder with',
    'a playful flirtatious half-smile, one hand out and open, asking them to follow her into the water.',
    '',
    'BEHIND HER, small and secondary, arranged as a bright resort backdrop rather than a group photograph:',
    'white resort architecture, palm trees and a row of white cabanas at the left; turquoise water running out to',
    'the sea at the right; a pink and gold late-afternoon sky.',
    'The thriller note must be almost subliminal and must never dominate: far away at the right edge, on a restricted',
    'cliff path above the water, one lone adult silhouette stands facing away, and a small security camera on a post',
    'near it is angled deliberately away from that path.',
    '',
    'MOOD: bright, sexy, feel-good vacation fantasy first and mystery a distant second. Hot sunlight, saturated',
    'turquoise and coral, glossy wet skin and hair. Every person in the image is an adult. No text, no logos.',
  ].join(' '),
  publishedAt: '2026-09-10T20:00:00.000Z',
};

export const PINK_TIDE = StoryVersion.parse(raw);
