/**
 * Launch content: like counts, comments, and the featured rotation.
 *
 * A catalogue that opens with every world on zero looks abandoned, and the
 * first real player has no way to tell which of twenty-three worlds is worth
 * their evening. This is the editorial answer to that.
 *
 * Two things keep it honest rather than deceptive:
 *
 * 1. Every seeded row is `kind = 'SEEDED'`. They can be counted separately,
 *    excluded from analytics, or deleted in one statement, and nothing
 *    downstream can report them as customer engagement by accident.
 * 2. Real likes are **added to** the seeded figure, never merged into it, so a
 *    real person tapping like always moves the number they are looking at.
 *
 * Idempotent: running it twice does not double anything.
 *
 *   npm run seed:social
 */
import { Pool } from 'pg';
import { randomUUID } from 'node:crypto';

/**
 * Where each world starts, and which six are in the shop window.
 *
 * Ordered deliberately rather than generated: the top of the list is where a
 * new player is being pointed, so it is the strongest art and the clearest
 * premises. The six featured are chosen for **range** — a shinobi tragedy, a
 * beastfolk arena, a resort mystery, a domestic romance, a horror, a piece of
 * military science fiction — because a rotation of six similar things tells a
 * new player the catalogue is narrow.
 */
const CATALOGUE: Array<{ id: string; likes: number; featured?: number; staffPick?: boolean }> = [
  { id: 'story_itachi', likes: 10_400, featured: 1, staffPick: true },
  { id: 'story_second_skin', likes: 8_900, featured: 2 },
  { id: 'story_pink_tide', likes: 7_600, featured: 3 },
  { id: 'story_good_morning_husband', likes: 6_800, featured: 4, staffPick: true },
  { id: 'story_hush_house', likes: 6_100, featured: 5 },
  { id: 'story_zero_throne', likes: 5_400, featured: 6 },
  { id: 'story_nine_weeks', likes: 4_900 },
  { id: 'story_red_moon', likes: 4_300 },
  { id: 'story_blackwake', likes: 3_800, staffPick: true },
  { id: 'story_primal_crown', likes: 3_400 },
  { id: 'story_seven_days', likes: 3_100 },
  { id: 'story_window_seven', likes: 2_700 },
  { id: 'story_red_floor', likes: 2_400 },
  { id: 'story_last_five', likes: 2_100 },
  { id: 'story_tidewall', likes: 1_900 },
  { id: 'story_seven_names', likes: 1_600 },
  { id: 'story_unbound', likes: 1_400 },
  { id: 'story_salt_road', likes: 1_200 },
  { id: 'story_fourth_beast', likes: 1_050 },
  { id: 'story_ninth_archive', likes: 900 },
  { id: 'story_understudy', likes: 760 },
  { id: 'story_blank_prophecy', likes: 640 },
  { id: 'story_last_service', likes: 520 },
];

const NAMES = [
  'mothdust', 'kenta_wav', 'not_a_robot_99', 'salt.and.iron', 'peachpit', 'VOIDWALKER',
  'hoshino_bread', 'greg', 'lantern_eater', 'ohno_itsyou', 'tired_archivist', 'rin.exe',
  'blue_hour_', 'chronically0nline', 'mmmnoodles', 'SeventhMat', 'akari_stan', 'bldy_mary',
  'quietpart_loud', 'nocturne22', 'plumrain', 'wrongnumber', 'fig_and_smoke', 'yuzu_bit',
  'the_real_kaz', 'sundaydriver', 'oldgodsnew', 'paperlantern', 'HALCYON_', 'mint_condition',
  'somebodys_ex', 'gh0stwriter', 'tsukiyo_', 'bad_at_names', 'reineke', 'cassette_ghost',
  'burntoast_', 'no_thoughts_', 'kettle.on', 'marrowmilk', 'definitely_steve', 'ex_husband_of',
  'wet_sock_', 'pigeon.mp3', 'HOURGLASS__', 'nine_lives_left', 'soggy_receipt', 'my_othr_acct',
  'terminal_velocity_', 'sweater.weather', 'unpaid_intern', 'moth_to_lamp', 'frogpond_', 'kkkarin',
  'second_breakfast', 'dial_tone_', 'vhs_rot', 'not_that_deep', 'lukewarm_', 'certified_hater',
  'chair_enjoyer', 'bus_window', 'minor_inconvenience', 'threeAM_thoughts', 'saltlick_', 'gone_fishing_brb',
];

/**
 * The like count, roughened.
 *
 * `CATALOGUE` carries round planning figures (10,400 / 8,900 / 7,600) because
 * that is how you reason about a shelf. Shipped as-is they read as invented:
 * every world in the app ending in two zeroes is not something that happens to
 * real numbers, and a player who notices stops believing the rest of the page.
 *
 * Deterministic, so the figure is stable across re-seeds rather than drifting
 * every time this runs. The offset is small enough to preserve the ordering the
 * catalogue was arranged in.
 */
function roughen(storyId: string, likes: number): number {
  let seed = 0;
  for (const ch of storyId) seed = (seed * 131 + ch.charCodeAt(0)) >>> 0;
  const spread = Math.max(12, Math.round(likes * 0.011));
  const offset = (seed % (spread * 2 + 1)) - spread;
  const rough = likes + offset;
  // A trailing zero is fine; three of them is the tell.
  return rough % 100 === 0 ? rough + ((seed % 9) + 1) : rough;
}

/** Roughly a comment per 90 likes, so the two numbers look like each other. */
const commentsFor = (likes: number): number => Math.max(3, Math.round(likes / 90));

/**
 * Why these are written per world instead of drawn from one pool.
 *
 * The first version of this file had a single PRAISE / CRITICAL / NONSENSE pool
 * and sprayed it across all twenty-three worlds. Even after the per-story
 * shuffle stopped bodies repeating *inside* a story, the database held 681
 * comments built from 92 distinct sentences: every substantive line appeared on
 * roughly seven different worlds. A player who opened Itachi and then Hush
 * House read "the ending actually got me. i sat there for a minute" twice, from
 * two different usernames, about two completely different stories. That is the
 * tell, and it is worse than empty comment sections, because it is the one
 * artefact that proves the rest of the page is manufactured too.
 *
 * A real comment names something. A character, a room, a time on a clock, a
 * choice the commenter made and regretted. So the substantive half of every
 * section is written against the world's own fixture in
 * `packages/test-fixtures/src` — the names, places, items and endings below are
 * all things that are actually true of these stories, because a comment that
 * misdescribes the world is worse than a generic one.
 *
 * Short noise is the exception and stays shared. "first", "w", "peak", "is
 * there a discord" repeating across twenty-three worlds is not a tell, it is
 * what a real comment section looks like. It is *long, specific praise*
 * repeating that gives the game away.
 *
 * Register: lowercase, phone-typed, tolerant of missing apostrophes, allowed to
 * be rude. No marketing copy. No em dashes or en dashes anywhere — `assertPools`
 * below fails the run rather than trusting anybody to remember.
 */
type WorldVoice = { praise: readonly string[]; critical: readonly string[] };

const WORLDS: Record<string, WorldVoice> = {
  story_itachi: {
    praise: [
      'sasuke waiting on the step every evening in case you come home early. i was not ready',
      'i got shisui lives on my second run and actually shouted',
      'reporting to your father and to danzo on the same day and neither of them knowing. the stress is real',
      'mikoto is right there the whole time and it took me two runs to think of asking her',
      'told sasuke the truth in the first week and the whole story bent around it',
      'the settlement took me four tries and i still think about it',
      'kakashi is the only one in the ready room who never asks you anything and somehow that says the most',
      'fugaku is not written as a villain and that is exactly why it hurts',
      'spent two weeks trying to avoid the obvious ending and got it anyway',
      'izumi deciding the two of you are friends on no encouragement whatsoever is so good',
      'you can bring evidence instead of making an accusation and it lands completely differently',
      'thirteen years old carrying all of this and the game never once lets you forget the number',
      'went for two brothers leave and it felt like cheating and i loved it',
      'danzo has been extremely polite to you for two years. scarier than any fight in this',
      'i tried telling hiruzen everything and he is just so tired. brutal',
      'the tea place is the only room in this game where you get to breathe',
    ],
    critical: [
      'the two week clock is too tight, i wanted more time with sasuke',
      'good but there are a lot of names to hold in the first hour',
      'wish the clan meetings varied more between runs',
      'kept trying to just take my brother and leave and it would not let me early on',
      'strong writing but the ending i got felt like it was always going to happen',
    ],
  },
  story_second_skin: {
    praise: [
      'maren chose wolf in front of four generations of wolf wardens and wanted hawk. that one line broke me',
      'ninety seconds to pick who you are for the rest of your life, in front of your family',
      'ward seven. i knew it would be bad. i did not know it was that',
      'got lio home on my third run and had to put the phone down',
      'the concord is not evil and that makes every argument with them harder',
      'kaia coming through the window with wardens behind her is the best opening in the app',
      'your ears and hands changing over weeks instead of instantly is such a good detail',
      'edran sol is so persuasive i agreed with him twice and then felt ill about it',
      'ilyra is just doing her lawful job and i could not bring myself to lie to her',
      'twiceborn. that is all i am going to say in a comment section',
      'sai velo wrote the protocol and his own institution declined to publish it. very real',
      'the shape traits change ordinary life not just the checks',
      'went back and picked hawk like tessa and the second half was a different game',
      'i lied about what i saw in the hall and it followed me the entire story',
      'my one skin is the quiet ending and honestly the strongest one',
      'four hundred people watching black feathers come up her arm. what a scene',
    ],
    critical: [
      'the concord house middle section drags a bit',
      'wanted a lot more time in the undercroft than i got',
      'the traits could do more outside of rolls',
      'good but your first choice locks you out of more than i realised',
      'veyr pass felt rushed compared to everything before it',
    ],
  },
  story_pink_tide: {
    praise: [
      'sora splashing you in the shallow end and then her smile dropping for exactly one second',
      'i ignored the whole adrian thing and just had a holiday and it let me. perfect week',
      'the blue bag locked in the watersports shed is such a clean way to start a mystery',
      'eli confesses got me. the man has been awake since tuesday and you can tell',
      'the tide fills the east caves twice a day and that is your actual clock',
      'celeste has the only photographs that matter and has no idea',
      'june on the roof bar is the best informed person on that island and she drinks for free now',
      'went diving with luka instead of investigating and had the best evening of my week',
      'got too late and i earned it. i spent two whole days flirting',
      'her real smile is worth every replay',
      'the resort notices you poking around, staff start being odd with you',
      'nami started all of this with one anonymous email and then has to live on the island',
      'the sunday ferry goes either way and that is such good pressure for a holiday story',
      'found him alive on the ledge and then had to decide what to do about it',
      'reika is the only person who can halt anything and she will not, and she is right not to',
      'this is the one i send people who assume these are all swords and magic',
    ],
    critical: [
      'the resort is big and i got lost in the service corridors for ages',
      'good but that is a lot of guests to track in seven nights',
      'wanted more luka, he vanished for most of my back half',
      'the clues never move to suit you which is fair but i missed the window and had to restart',
      'the romance and the mystery pull against each other and i never landed both',
    ],
  },
  story_good_morning_husband: {
    praise: [
      'the ring does not come off because your finger grew around it. i sat with that for a while',
      'i told hana on day one and she assumed i was joking. of course she did',
      'the half built bookshelf is doing more emotional work than most whole games',
      'the fellowship letter has a deadline and she has not told you. brutal',
      'played along until it stopped being playing, which is exactly what the title says',
      'platform 11. i was not fine after that one',
      'emi has been her friend since art school and not yours and she clocks you immediately',
      'ordinary saturdays actually count here. i did a supermarket run and it mattered',
      'kenji runs a flooring firm with four vans and eleven opinions. best character line in the app',
      'i kept this life and it felt like a choice, not a consolation prize',
      'go and look at the sketchbook. that is the whole review',
      'a romance where she can say no and means it',
      'got separate rooms because i was honest too quickly and it still felt earned',
      'the mystery is optional and i think the run where you skip it is better',
      'nao is the only person who will say the platform number out loud and that sentence kept me up',
    ],
    critical: [
      'lovely but not a lot happens if you ignore the mystery, which i did',
      'wanted more lucia, she is set up and then barely there',
      'the middle weekend is slow',
      'the amnesia setup is a bit convenient honestly',
      'good writing but there are no stakes at all until the letter turns up',
    ],
  },
  story_hush_house: {
    praise: [
      'the 2:13 knock. i sat with my thumb over the screen for a full minute',
      'ayame hands you three rules like somebody explaining the bins and that is why it works',
      'the light outside 309 being on a different circuit from the rest of the floor. perfect detail',
      'i looked through the peephole. do not look through the peephole',
      'the konbini runs at midnight are genuinely nice and that is what makes the rest land',
      'mrs vale answers the question next to the one you asked. every single time',
      'got room 312 and it is warm and that is the worst part of it',
      'nia keeps filming the hallway and she knows how that goes and keeps filming',
      'the lift opening on a floor labelled 0 made me put my phone face down',
      'mika comes home and nobody tests her and they just choose to live with it',
      'you always know what happened and never why. that is the whole trick and it holds',
      'i burned it down and the game would not let me feel good about it',
      'tomas coming off nights too tired to care is such a good horror character',
      'the last tenants name is still on the mailbox. that is the hook, right there',
      'ayames choice is the ending that stayed with me',
      'moved out on day four and it counts as a real ending. respect',
    ],
    critical: [
      'scary but the rent and laundry stuff went on a bit long for me',
      'i broke all three rules in the first hour and the pacing never recovered',
      'the sub basement is the weakest part, everything above ground is better',
      'wanted more nia, she has the best setup and the least screen time',
      'good but the house learns you faster than i could learn the rules',
    ],
  },
  story_zero_throne: {
    praise: [
      'it walks the whole length of the plaza and kneels in front of you with every camera running',
      'morrow has been awake in the dark for eighteen years. i think about that a lot',
      'you can refuse the cockpit and it is a real route, not a fake one',
      'mina treats it like a machine while everyone else treats it like a god. instant favourite',
      'the lie that saved us against the truth of lysandra is the best choice in this whole app',
      'eli is nineteen and every person he meets wants exactly one fact from him',
      'rhea did not run when it came through the glass and i decided about her right then',
      'six reputations instead of one means you cannot keep everybody and the game knows it',
      'people do things while you are somewhere else and you find out afterwards. rare',
      'talon is officially an observer and unofficially a whole problem',
      'took walk away on purpose and it still gave me a proper ending',
      'sera has read the entire file and every conversation with her is a negotiation',
      'jace has spent eighteen years being the reasonable man in rooms where that was not enough',
      'freewake. i genuinely did not think it would let me',
      'both governments signing the same treaty on the same day every year and calling it peace',
    ],
    critical: [
      'the politics get dense in the middle and i lost the thread',
      'wanted more actual piloting, it is more rooms and talking than i expected',
      'six reputations is one or two too many to track on a phone',
      'good but the station starts to feel small by the back half',
      'never got near the lysandra truth and felt like i missed the real game',
    ],
  },
  story_nine_weeks: {
    praise: [
      'juno gets off the bus with teo and you have nine weeks of that. i felt ill in a good way',
      'the shift rota is real and it decides who you actually see. genuinely clever',
      'teo is kind and funny and does not deserve any of this and the game makes sure you know',
      'i got rejected properly and it did not soften it afterwards. respect',
      'nadia is on her fourth season and has watched this exact thing happen before',
      'the back steps at one in the morning is the entire game',
      'everybody in those six cabins has an opinion about you and they are all talking',
      'week three is when it goes wrong and it is basically scheduled to',
      'cass is the friend you cost something and i did not notice until it was done',
      'i spent the whole summer not saying it and that was also an ending',
      'nine weeks is exactly the right length, it would not survive being longer',
      'the dock scenes. reading those on a bus in january was a choice i made',
    ],
    critical: [
      'good but there are really only four people who matter',
      'the rota gets repetitive around week five',
      'wanted teo to be more than the obstacle',
      'lovely writing, not a lot happens if you keep your head down',
    ],
  },
  story_red_moon: {
    praise: [
      'nine seconds of shell across your forearm, and it getting easier, is the actual horror',
      'venn not asking you anything is so much worse than voss asking twice',
      'wick is proof you are not the first and that scene changed the whole run for me',
      'the quiet one. that is all i am putting in a comment',
      'hiding what you are while running a squad mission is unbelievably tense',
      'i showed venn on purpose to see what she would do and i do not regret it',
      'six of you went out and one came back and the official record says luck',
      'the nettlejaw made me throw out my entire weapon style',
      'instability going up as the power gets better is such a clean trade',
      'ossa in the quartermaster store is the only normal conversation in this game and i needed it',
      'ren was supposed to be first and handles that worse than you expect',
      'six sets of tags sitting in your kit. i never put them down',
    ],
    critical: [
      'the hunts start to blur after the third one',
      'wanted more from commander vale, she is barely in it',
      'good but instability punishes the fun stuff quite hard',
      'fort ember could use more to do between missions',
    ],
  },
  story_blackwake: {
    praise: [
      'nobody knows your name yet. best closing line of a premise in the catalogue',
      'tolla will fix your keel and then tell you exactly what you did to the ship',
      'the compass points somewhere no compass points and i chased it for eleven hours',
      'mako is sixteen and absolutely certain and i would sink for her',
      'nessa can read your guardians handwriting and will not say why. i never did find out',
      'a crew that has opinions about where you are sailing them. yes',
      'got the yard with your name on it and honestly that is a happy ending',
      'veyra is not a villain, she just has an inshore squadron and a job',
      'went for the crownless sea and lost half the crew getting there',
      'rook being ex ninth fleet makes every navy encounter awkward in the best way',
      'the crew buries you ashore. i did not know that was on the table',
      'harrow at the drift will sell you anything, including you',
    ],
    critical: [
      'the sailing between islands gets samey',
      'wanted more of the crownless sea once you actually reach it',
      'good but upgrading the ship is slow going early on',
      'lost track of who owned which island around the third arc',
    ],
  },
  story_primal_crown: {
    praise: [
      'three days to redraw an arrangement that took forty years. the clock does all the work',
      'kaia is still arguing about the corridor when everybody else has gone to bed. accurate',
      'mako will treat your animal for nothing and then tell you exactly what you did to it',
      'bonded animals dying in the north and nobody will raise it until the corridor is settled',
      'suri talks least and notices most and i trusted her the whole way through',
      'the animals are not vehicles and the game absolutely means that',
      'got the sixth banner and i am still smug about it',
      'ilya has already sold what he knows to two peoples and is very open to a third',
      'white maws rider. did not think that was possible',
      'torren is a lot sharper than his manners and i underestimated him twice',
      'you can turn up with no mount, no people and a name nobody has heard. real start',
      'the thing in the north is not a villain and the game holds that line',
    ],
    critical: [
      'five peoples to keep straight in three days is a lot',
      'the market lanes scenes repeat a bit',
      'wanted longer than three days honestly',
      'good but i never worked out how the corridor stones were meant to help me',
    ],
  },
  story_seven_days: {
    praise: [
      'mina says the same thing on the platform every monday and by loop four i could not look at her',
      'ivy disappears on wednesday every time and it took me six loops to be there for it',
      'the timetable is real. people are where they said they would be. that is the whole game',
      'elias is the one everyone says is unwell. everyone is wrong',
      'spent one loop doing nothing except going to the bar. best loop i had',
      'the notebook is the only thing you keep and it turns out to be enough',
      'a detective investigating something that has not happened yet. great line',
      'clock tower at the top, marina at the bottom. i could draw this city now',
      'harrow arrives thursday and leaves friday and i wasted three loops missing her',
      'knowing the week is a completely different feeling to knowing a map',
      'sunday at midnight the first time is a proper punch',
      'i tried warning people and it goes exactly as well as you would think',
    ],
    critical: [
      'the early loops are slow because you do not know what is safe to skip',
      'wanted a way to fast forward days i had already solved',
      'good but the loop repeats a lot of the same text',
      'solved it half by accident and skipped most of the middle',
    ],
  },
  story_window_seven: {
    praise: [
      'she waves at a lens she has no way of knowing about, at 1:16, on night one',
      'mara organises the safehouse food by expiry date and that tells you everything about her',
      'the black case in the wardrobe. i opened it on night five and i should not have',
      'four rules that fit on one line, and the game is about which one you break first',
      'the target was right. seven nights for that',
      'everything you do is logged and it comes back for you later',
      'left the flat on night two and the whole operation went sideways. worth it',
      'juno on the front desk knows everybody on that avenue and will absolutely trade',
      'tobin is not on this operation and he is on this street. best sentence in the app',
      'four words from glass and i rewrote my entire plan',
      'maras order is the one that made me set the phone down',
      'an entire thriller in one room and it never feels small',
      'voss built the thing she is trying to destroy and you find that out far too late',
    ],
    critical: [
      'sitting in a flat for seven nights is as slow as it sounds for the first two',
      'wanted more outside the flat than the game is willing to give you',
      'good but filing the report every morning gets repetitive',
      'the twist landed for me but the middle nights dragged',
    ],
  },
  story_red_floor: {
    praise: [
      'no cameras, no records, no rankings. the game never once cheats on that',
      'maki asked a doctor for one more round twenty years ago and got it. that is why he keeps the floor',
      'mei can say no and actually stop you and i hated it and she is right',
      'koji works in his uncles print shop and loves this anyway. he is the heart of it',
      'aya teaches you to be frightened of standing still. best fight in the app',
      'damage does not go away between sundays and i learned that the expensive way',
      'got enough as an ending and it is not a loss and the game knows it is not',
      'daigo trains in a warehouse an hour out of the city with eleven people and no press',
      'junpei is frightened of mondays. one line and i understood the entire man',
      'every discipline in one room and the matchups genuinely feel different',
      'coach. i did not go down those stairs for that and it was the right ending',
      'riku has a proper gym and a proper team and comes down to a basement anyway',
    ],
    critical: [
      'the fights get technical and i did not always follow what had happened',
      'wanted more outside mikado, the arcade scenes are good and rare',
      'good but losing early leaves you behind for a long time',
      'the injury system is realistic and not always fun',
    ],
  },
  story_last_five: {
    praise: [
      'two points short. i am not okay. best sports ending i have played anywhere',
      'bo was a swimmer in september and plays like it, and it is funny, and then it is not',
      'noris cut of the film is the actual scouting and i started watching it every week',
      'dai has never started a game he did not have to. that is the whole captain arc',
      'the match clock is real and i lost one with eleven seconds on it',
      'what actually happened. i needed to know why the five left and it was worth the runs',
      'kai weighs about as much as a wet towel and runs the entire offense',
      'your style comes from what you actually do in games, not from a menu',
      'the five rivals scout you back and it shows up in the next game',
      'forty minutes of practice to make an impression is such a good first scene',
      'got the program stays and shouted in a quiet room',
      'torakawa is in her second year of coaching and it shows and she knows it shows',
    ],
    critical: [
      'the games take a while and there are a lot of them',
      'five rival schools is a lot of people for one season',
      'good but the practice weeks repeat more than the games do',
      'i never got bo to be any use and it felt like my fault in a bad way',
    ],
  },
  story_tidewall: {
    praise: [
      'a survivor tells you once, quietly, that he saw your sister walk north. and nobody senior will hear it',
      'four months to get near the top of the roll or the pass shuts for another year',
      'your order decides which parts of the wall you are even allowed to stand on, and it is permanent',
      'hollis is first on the roll and is not a jerk about it, which made it worse',
      'bec wrote his account down for me and i carried that page the whole game',
      'verne drills the intake like they are already dead, which is the correct approach',
      'wrens sword in your hands the whole time is such a good bit of design',
      'the animals come down like weather rather than like monsters. that framing works',
      'picked longwatch and the route through the whole story changed',
      'the eleventh gate. i have been thinking about it since',
      'order politics is half of this game and i did not expect that at all',
      'ansett runs the eastern run and has already decided what you are',
    ],
    critical: [
      'four months of drills before anything really happens',
      'your class locks you out of a lot and i think i picked wrong',
      'good but the siege stuff is better than the ranking stuff',
      'wanted more wren and got less than i hoped',
    ],
  },
  story_seven_names: {
    praise: [
      'a name on a list is not the same as a person who deserves to die. marcel says it once and the game is that',
      'seventeen minutes past one and a brick falls out of the wall. i was in immediately',
      'got seven graves and the epilogue made me feel genuinely bad about myself',
      'celeste is a financiers daughter four nights a week and the best burglar in paris the other three',
      'the game never tells you whether you actually did it. i love that more than i can say',
      'building an alias the whole country believes in is the best mechanic in here',
      'renaud is the only man in france who never signed off on your drowning and that carries the back half',
      'burned the registry unread. i will always wonder what was in it',
      'solene turned you into a national monster in nine days with six newspapers',
      'the eighth name is the reason to replay this one',
      'anais signed the timeline and is not a villain, which is worse',
      'you can just get on a boat in the first hour and that is a real ending',
      'veyrac gave the eulogy. i think about that every time he is polite to me',
    ],
    critical: [
      'seven threads is a lot to hold at once',
      'the paris half is stronger than the marseille half',
      'good but i got the road out by accident on my first run',
      'the period voice is thick and takes a while to get into',
    ],
  },
  story_unbound: {
    praise: [
      'the kiln trains nothing like the way you were raised and every drill reminds you of it',
      'probation means you are a guest who can be sent away. that never lets up',
      'renna holds your probation and is completely fair, which is somehow more stressful',
      'your master says he never taught it. three deaths this year say somebody did',
      'tam is third year and owes you nothing and helps anyway',
      'forms you awaken instead of picking off a list. i got one i did not plan for',
      'sera was sent to the long quiet and the game does not soften what that means',
      'contract work in the night market to pay for a place you have not earned yet',
      'they sealed the doors and parcelled the students out like furniture. cold',
      'kell took the oyan ruling and has to live inside it and you can hear it',
      'build freedom that comes from how you actually fight rather than a skill tree',
    ],
    critical: [
      'the five schools are not all equally developed',
      'wanted more of the dissolved school and got mostly the kiln',
      'good but the forms take a while to come online',
      'the concord hall scenes are dry next to the rest of it',
    ],
  },
  story_salt_road: {
    praise: [
      'nine days of water and eleven days of walking. that is the whole horror and there are no monsters',
      'oren has never once been asleep when i woke up and i thought about that for six days',
      'the third well is unreliable and i built my entire plan on it holding',
      'ferrow has crossed nine times and still will not promise you anything',
      'sabe packed badly and will not turn back and you have to decide what that costs',
      'died on day nine, permanently, entirely because of my own arithmetic',
      'i never opened the case. i am weirdly proud of that',
      'no monsters, just distance and maths, and it is the tensest thing in here',
      'stopped too long at the wrecks and paid for it three days later',
      'every choice about pace spends water you cannot get back',
      'four people drink faster than one and you feel every canteen',
    ],
    critical: [
      'very short compared to the others',
      'wanted more at the coast, it ends fast once you get there',
      'good but there are only three people to talk to',
      'permanent death plus a resource puzzle is a lot to lose an hour to',
    ],
  },
  story_fourth_beast: {
    praise: [
      'you choose first and camille gets whatever is left and she never lets you forget it',
      'the beast has opinions about you. mine sulked for two days after i ran from something',
      'lina had every disappearance on one map before anybody official did, and she is a student',
      'three weeks before the man in the pale coat notices somebody can finally hurt him',
      'theo is alive down there and finding that out changed my entire run',
      'got more than rivals and it earned every bit of it',
      'morel grew three animals in a basement because nothing else in the world touches this man',
      'paris notices an impossible animal on the roofline and there are consequences. finally',
      'ravel turns the evidence board around when anybody senior visits. one detail, whole character',
      'the quarries are the best horror in a game that is not a horror game',
      'camille wins is a real ending and it stung in exactly the right way',
      'the metro sequence. i have played it three times now',
    ],
    critical: [
      'good but i picked my beast in ten seconds and regretted it for six hours',
      'camille solves things without you and sometimes that felt like being sidelined',
      'the investigation stalls badly if you miss lina',
      'wanted more paris above ground, it goes underneath and stays there',
    ],
  },
  story_ninth_archive: {
    praise: [
      'the warden is extremely kind to you and it is the most frightening thing in the game',
      'students are never expelled here, they are transferred, and the transfers do not arrive anywhere',
      'standing at the gate holding your acceptance letter while it says you were never admitted',
      'mira covers for you and obviously knows more and will not say. i spent a whole term on her',
      'kael is ordered to investigate you and is genuinely good at it',
      'the stacks at night with cartwrights lens is the best part of this',
      'bram will get you anything for the right trade and never asks what for',
      'the gate goes red and every student on the lawn turns around. i felt that',
      'ward chalk actually mattering in a fight was a nice surprise',
      'found the torn ledger page and then had to decide who to show it to. no good options',
    ],
    critical: [
      'the academy is small, i wanted more rooms to poke at',
      'good but the investigation stalls if you miss one lead',
      'shorter than the other big ones in here',
      'wanted more kael after the midpoint',
    ],
  },
  story_understudy: {
    praise: [
      'the company book is read out loud at the end of term. every favour you took is in it',
      'nobody in that building ever raises their voice and it is the most dangerous place in the app',
      'talia is better than you at one thing and worse at four and everybody knows, including her',
      'deare does not recast after the third week so you have to become necessary instead',
      'marta in wardrobe owes nobody anything, which makes her the most powerful person there',
      'i helped somebody and it went in the book against me. perfect mechanic',
      'six weeks and the date never moves. it really does not move',
      'learning the whole part knowing you will not perform it is a horrible thing to play',
      'got on stage without doing anything unkind and it took four runs',
      'green room politics that beat most of the fantasy plots in here',
    ],
    critical: [
      'small cast, and you feel it by week four',
      'good but it is all conversation, if you want anything else look elsewhere',
      'never worked out how the book actually scores you',
      'wanted more rehearsal scenes and got more corridor scenes',
    ],
  },
  story_blank_prophecy: {
    praise: [
      'they read your thread and there is nothing there. best premise in the catalogue',
      'hecate at a junction on the edge of athens with a shoebox shrine in a wall. exactly right',
      'hermes turns up because he wants something and says so. most honest god in fiction',
      'despina has kept the oldest rule in the world for thirty years and it is just a kitchen that stays open',
      'kyros spent four years proving that being told your future is what causes it. he might be right',
      'nothing can predict you and nothing protects you either. the game means both halves',
      'eirene kept a failed reading against nineteen years of her own procedure. my favourite',
      'the things that eat fate started following me home and i had to go back to the guesthouse',
      'a better loom. i just sat there afterwards',
      'thalia clocks you the second you look up at the roof of that train',
    ],
    critical: [
      'a lot of gods and a lot of lore in the first hour',
      'good but i never understood how the thread stuff worked mechanically',
      'the athens sections are better than the road to delphi',
      'twelve endings and most of my runs found the same three',
    ],
  },
  story_last_service: {
    praise: [
      'the extractor hood making a noise it should not make. i knew this restaurant in one paragraph',
      'mina comes in out of the rain with a knife roll and every cook on the line clocks her',
      'emi is the entire front of house and the reason that kitchen gets away with anything',
      'daichi has been on that line four years and nobody has thanked him. i made sure somebody did',
      'you can cook anything you can describe and it judges it properly. should not work, does',
      'keiko has not taken a full day since march and will not discuss the loan',
      'closing well is an ending and that is the bravest thing in this app',
      'got the dish with no name on my fourth run and it was worth every credit',
      'gin is not trying to be formidable, which is precisely why he is',
      'kado can fill thirty seats for a year with four hundred words and everybody knows it',
    ],
    critical: [
      'thirty days goes fast and i spent too many of them at the market',
      'good but not every dish is scored and i wanted to know which ones were',
      'wanted more takumi, he is great and was barely in my run',
      'the services get samey by the third week',
    ],
  },
};

/**
 * Ending names, for the comments that give one away without saying "ending".
 *
 * The spoiler tap only works if something upstream knows a comment is a
 * spoiler, and the previous heuristic was the word "ending" appearing in the
 * body. That misses the way people actually spoil things: "twiceborn. that is
 * all i am going to say", "platform 11. i was not fine after that one", "got
 * seven graves". Those are ending names, they are the whole reason the tap
 * exists, and they were going out untapped.
 *
 * Lowercase, matched as substrings, and only the names that some body in this
 * file actually uses — `assertPools` fails on a phrase that matches nothing, so
 * this list cannot rot into decoration.
 */
const ENDING_NAMES: Record<string, readonly string[]> = {
  story_itachi: ['shisui lives', 'the settlement', 'two brothers leave'],
  story_second_skin: ['twiceborn', 'lio home', 'my one skin'],
  story_pink_tide: ['perfect week', 'eli confesses', 'too late', 'her real smile'],
  story_good_morning_husband: ['platform 11', 'separate rooms'],
  story_hush_house: ['room 312', 'mika comes home'],
  story_zero_throne: ['the lie that saved us', 'the truth of lysandra', 'freewake', 'walk away'],
  story_blackwake: ['the yard with your name on it', 'the crownless sea', 'the crew buries you ashore'],
  story_primal_crown: ['the sixth banner', 'white maws rider'],
  story_window_seven: ['the target was right', 'maras order'],
  story_last_five: ['two points short', 'what actually happened', 'the program stays'],
  story_seven_names: ['seven graves', 'the eighth name', 'burned the registry'],
  story_fourth_beast: ['more than rivals', 'camille wins'],
  story_blank_prophecy: ['a better loom'],
  story_last_service: ['the dish with no name'],
  story_red_floor: ['coach.'],
};

/**
 * The shared half, and the only part that is allowed to repeat across worlds.
 *
 * Every line here is short enough that a player seeing it twice reads it as two
 * people being unoriginal rather than as one pool being sprayed around, which
 * is exactly how real comment sections behave.
 *
 * `notOn` exists for the cross-references. "god the itachi one was much better"
 * is a good comment on twenty-two worlds and a stupid one on Itachi.
 */
const NOISE: ReadonlyArray<{ body: string; notOn?: string }> = [
  { body: 'first' },
  { body: 'w' },
  { body: 'peak' },
  { body: 'is there a discord' },
  { body: 'anyone else here from tiktok' },
  { body: 'brb replaying' },
  { body: 'chat is this real' },
  { body: 'commenting so i can find this later' },
  { body: 'im supposed to be asleep' },
  { body: 'reading this instead of studying' },
  { body: 'the algorithm sent me here at 3am' },
  { body: 'why do i always pick the worst option' },
  { body: 'do not talk to me until i finish this' },
  { body: 'i have zero credits left and no regrets' },
  { body: 'somebody make a tier list of these' },
  { body: 'reading this on the toilet at my job' },
  { body: 'how do people write this fast' },
  { body: 'unemployed behaviour from me today' },
  { body: 'no way that worked' },
  { body: 'who else broke it by typing nonsense' },
  { body: 'my cat walked on my phone and i got a whole new scene' },
  { body: 'they should add multiplayer' },
  { body: 'follow me and i fllw back' },
  { body: 'found this from a comment on another one lol' },
  { body: 'i typed my ex name in and now i feel weird' },
  { body: 'idk why i read this at work' },
  { body: 'second time through and im still missing things' },
  { body: 'saving this for the flight' },
  { body: 'ok who is doing the wiki for these' },
  { body: 'this app is going to wreck my sleep schedule' },
  { body: 'me telling myself i will only do one turn' },
  { body: 'god the itachi one was much better', notOn: 'story_itachi' },
  { body: 'ITACHI SLANDER WILL NOT BE TOLERATED', notOn: 'story_itachi' },
  { body: 'came here straight from hush house and i am still jumpy', notOn: 'story_hush_house' },
  { body: 'if you liked this go and play pink tide', notOn: 'story_pink_tide' },
];

/**
 * The rules the pools have to satisfy, checked before a single row is written.
 *
 * All three of these have been broken by hand at least once, and none of them
 * is visible in a diff. A dash slips in from a paste, a good line gets copied
 * onto a second world, a body gets written twice in the same list. The script
 * refuses to seed rather than putting any of that in front of a player.
 */
function assertPools(): void {
  const dashes = /[—–]/;
  const seenBody = new Map<string, string>();

  for (const { body } of NOISE) {
    if (dashes.test(body)) throw new Error(`Dash in shared noise: ${body}`);
  }

  for (const [storyId, voice] of Object.entries(WORLDS)) {
    const local = new Set<string>();
    for (const body of [...voice.praise, ...voice.critical]) {
      if (dashes.test(body)) throw new Error(`Dash in ${storyId}: ${body}`);
      if (local.has(body)) throw new Error(`Repeated within ${storyId}: ${body}`);
      local.add(body);
      const owner = seenBody.get(body);
      // Substantive comments belong to exactly one world. If a line is true of
      // two worlds it was not specific enough to be worth writing.
      if (owner !== undefined) throw new Error(`"${body}" is on both ${owner} and ${storyId}`);
      seenBody.set(body, storyId);
    }
    if (voice.praise.length < 8) throw new Error(`${storyId} has too few praise lines to fill a section`);

    // An ending name that matches nothing is a phrase somebody edited out of a
    // comment and left behind here, and it silently stops protecting anything.
    for (const name of ENDING_NAMES[storyId] ?? []) {
      if (name !== name.toLowerCase()) throw new Error(`Ending name must be lowercase: ${name}`);
      const used = [...voice.praise, ...voice.critical].some((b) => b.toLowerCase().includes(name));
      if (!used) throw new Error(`No comment on ${storyId} mentions "${name}"`);
    }
  }

  for (const story of CATALOGUE) {
    if (!WORLDS[story.id]) throw new Error(`No comment pool written for ${story.id}`);
  }
  for (const storyId of Object.keys(ENDING_NAMES)) {
    if (!WORLDS[storyId]) throw new Error(`Ending names for a world with no pool: ${storyId}`);
  }
}

/** A small deterministic PRNG, seeded off the story id. */
function rngFor(storyId: string): () => number {
  let seed = 0;
  for (const ch of storyId) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  return () => {
    seed = (seed * 1_664_525 + 1_013_904_223) >>> 0;
    return seed / 0x1_0000_0000;
  };
}

function shuffledWith<T>(list: readonly T[], next: () => number): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

/**
 * A comment written `days` ago, jittered so they are not all on the hour.
 *
 * The jitter comes off the story's own generator rather than `Math.random`, so
 * two re-seeds lay the section out with the same spacing instead of quietly
 * reshuffling which comment reads as the oldest.
 */
function when(daysAgo: number, next: () => number): string {
  const ms = daysAgo * 86_400_000 + Math.floor(next() * 86_400_000);
  return new Date(Date.now() - ms).toISOString();
}

/** Does this body name an ending, either by the word or by the ending's name? */
function spoils(storyId: string, body: string): boolean {
  if (/\bending\b/i.test(body)) return true;
  const named = ENDING_NAMES[storyId] ?? [];
  const lower = body.toLowerCase();
  return named.some((name) => lower.includes(name));
}

type Seeded = { body: string; spoiler: boolean; author: string };

/**
 * One world's comment section: who said what, in what order.
 *
 * The mix is roughly six positive to two critical to two noise, which is what a
 * real section looks like and a wall of praise is not. The substantive two
 * thirds come from this world's own pool; only the noise is shared with the
 * other twenty-two.
 *
 * Nothing is drawn twice. The story runs out of section when its praise pool is
 * spent, which is deliberate: a world with ten thousand likes does not get to
 * repeat itself just because the likes-to-comments ratio says it should have a
 * hundred comments.
 *
 * Names get the same treatment. The previous version walked one fixed cycle
 * through NAMES with a per-world offset, so every world had the same roster in
 * the same order, five seats along. Now each world shuffles the full list and
 * takes the front of it, which leaves the overlap a real app has (an active
 * commenter turns up on several worlds) without the rosters matching.
 */
function deckFor(storyId: string): Seeded[] {
  const voice = WORLDS[storyId]!;
  const next = rngFor(storyId);

  const praise = shuffledWith(voice.praise, next);
  const critical = shuffledWith(voice.critical, next);
  const noise = shuffledWith(
    NOISE.filter((n) => n.notOn !== storyId).map((n) => n.body),
    next,
  );
  const names = shuffledWith(NAMES, next);

  const share = Math.round(praise.length / 3);
  const budget = {
    praise: praise.length,
    critical: Math.min(critical.length, share),
    noise: Math.min(noise.length, share),
  };
  const pools = { praise, critical, noise };

  const deck: Seeded[] = [];
  for (let i = 0; budget.praise + budget.critical + budget.noise > 0; i += 1) {
    const slot = i % 10;
    const key = slot < 6 ? 'praise' : slot < 8 ? 'critical' : 'noise';
    if (budget[key] === 0) continue;
    budget[key] -= 1;
    const body = pools[key].shift()!;
    deck.push({
      body,
      // A comment naming an ending is hidden behind the spoiler tap, which is
      // also the feature demonstrating itself. Noise never names one.
      spoiler: key !== 'noise' && spoils(storyId, body),
      author: names[deck.length]!,
    });
  }
  return deck;
}

async function main(): Promise<void> {
  assertPools();

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  let comments = 0;

  try {
    for (const story of CATALOGUE) {
      // The like floor lives on the signal rollup, which is what the projection
      // already reads. Real likes are counted on top of it.
      await pool.query(
        `INSERT INTO story_signals (story_id, likes) VALUES ($1, $2)
         ON CONFLICT (story_id) DO UPDATE SET likes = EXCLUDED.likes, updated_at = now()`,
        [story.id, roughen(story.id, story.likes)],
      );

      await pool.query(
        `INSERT INTO story_editorial (story_id, featured_rank, staff_pick)
         VALUES ($1, $2, $3)
         ON CONFLICT (story_id) DO UPDATE
           SET featured_rank = EXCLUDED.featured_rank,
               staff_pick = EXCLUDED.staff_pick,
               updated_at = now()`,
        [story.id, story.featured ?? null, story.staffPick ?? false],
      );

      // Idempotent: a second run finds these and adds nothing.
      const { rows } = await pool.query<{ n: string }>(
        `SELECT COUNT(*)::text AS n FROM story_comments WHERE story_id = $1 AND kind = 'SEEDED'`,
        [story.id],
      );
      if (Number(rows[0]?.n ?? 0) > 0) continue;

      const deck = deckFor(story.id);
      const want = Math.min(commentsFor(roughen(story.id, story.likes)), deck.length);
      const clock = rngFor(`${story.id}:when`);
      for (let i = 0; i < want; i += 1) {
        const { body, spoiler, author } = deck[i]!;
        await pool.query(
          `INSERT INTO story_comments
             (comment_id, story_id, user_id, author_name, body, kind, spoiler, likes, created_at)
           VALUES ($1,$2,NULL,$3,$4,'SEEDED',$5,$6,$7)`,
          [
            `cmt_seed_${randomUUID()}`,
            story.id,
            author,
            body,
            spoiler,
            // Older comments have had longer to collect likes.
            Math.max(0, Math.round((want - i) * 1.7) + ((i * 13) % 9)),
            when(i * 1.5 + 1, clock),
          ],
        );
        comments += 1;
      }
    }

    console.log(`Seeded ${CATALOGUE.length} worlds, 6 featured, ${comments} comments.`);
    console.log('All comments are kind=SEEDED and can be removed with:');
    console.log("  DELETE FROM story_comments WHERE kind = 'SEEDED';");
  } finally {
    await pool.end();
  }
}

void main().catch((error) => {
  console.error(error);
  process.exit(1);
});
