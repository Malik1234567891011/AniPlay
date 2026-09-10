import { withDerivedAssetKeys } from './derive-assets.js';
import { NINTH_ARCHIVE as NINTH_ARCHIVE_RAW } from './ninth-archive.js';
import { UNDERSTUDY as UNDERSTUDY_RAW } from './understudy.js';
import { SALT_ROAD as SALT_ROAD_RAW } from './salt-road.js';
import { TIDEWALL as TIDEWALL_RAW } from './tidewall.js';
import { UNBOUND as UNBOUND_RAW } from './unbound.js';
import { NINE_WEEKS as NINE_WEEKS_RAW } from './nine-weeks.js';
import { RED_MOON as RED_MOON_RAW } from './red-moon.js';
import { SEVEN_DAYS as SEVEN_DAYS_RAW } from './seven-days.js';
import { BLACKWAKE as BLACKWAKE_RAW } from './blackwake.js';
import { LAST_FIVE as LAST_FIVE_RAW } from './last-five.js';
import { HUSH_HOUSE as HUSH_HOUSE_RAW } from './hush-house.js';
import { WINDOW_SEVEN as WINDOW_SEVEN_RAW } from './window-seven.js';
import { GOOD_MORNING_HUSBAND as GOOD_MORNING_HUSBAND_RAW } from './good-morning-husband.js';
import { ITACHI as ITACHI_RAW } from './itachi.js';
import { PRIMAL_CROWN as PRIMAL_CROWN_RAW } from './primal-crown.js';
import { ZERO_THRONE as ZERO_THRONE_RAW } from './zero-throne.js';
import { FOURTH_BEAST as FOURTH_BEAST_RAW } from './fourth-beast.js';
import { SEVEN_NAMES as SEVEN_NAMES_RAW } from './seven-names.js';
import { BLANK_PROPHECY as BLANK_PROPHECY_RAW } from './blank-prophecy.js';
import { RED_FLOOR as RED_FLOOR_RAW } from './red-floor.js';
import { SECOND_SKIN as SECOND_SKIN_RAW } from './second-skin.js';
import { LAST_SERVICE as LAST_SERVICE_RAW } from './last-service.js';
import { PINK_TIDE as PINK_TIDE_RAW } from './pink-tide.js';


export { withDerivedAssetKeys } from './derive-assets.js';

export const NINTH_ARCHIVE = withDerivedAssetKeys(NINTH_ARCHIVE_RAW);
export const UNDERSTUDY = withDerivedAssetKeys(UNDERSTUDY_RAW);
export const SALT_ROAD = withDerivedAssetKeys(SALT_ROAD_RAW);
export const TIDEWALL = withDerivedAssetKeys(TIDEWALL_RAW);
export const UNBOUND = withDerivedAssetKeys(UNBOUND_RAW);
export const NINE_WEEKS = withDerivedAssetKeys(NINE_WEEKS_RAW);
export const RED_MOON = withDerivedAssetKeys(RED_MOON_RAW);
export const SEVEN_DAYS = withDerivedAssetKeys(SEVEN_DAYS_RAW);
export const BLACKWAKE = withDerivedAssetKeys(BLACKWAKE_RAW);
export const LAST_FIVE = withDerivedAssetKeys(LAST_FIVE_RAW);
export const ITACHI = withDerivedAssetKeys(ITACHI_RAW);
export const PRIMAL_CROWN = withDerivedAssetKeys(PRIMAL_CROWN_RAW);
export const ZERO_THRONE = withDerivedAssetKeys(ZERO_THRONE_RAW);
export const FOURTH_BEAST = withDerivedAssetKeys(FOURTH_BEAST_RAW);
export const SEVEN_NAMES = withDerivedAssetKeys(SEVEN_NAMES_RAW);
export const BLANK_PROPHECY = withDerivedAssetKeys(BLANK_PROPHECY_RAW);
export const RED_FLOOR = withDerivedAssetKeys(RED_FLOOR_RAW);
export const SECOND_SKIN = withDerivedAssetKeys(SECOND_SKIN_RAW);
export const LAST_SERVICE = withDerivedAssetKeys(LAST_SERVICE_RAW);
export const PINK_TIDE = withDerivedAssetKeys(PINK_TIDE_RAW);

/**
 * These three shipped with null asset keys on purpose, and no longer need to.
 *
 * `withDerivedAssetKeys` fills in the key the image pipeline *would* produce,
 * which is right for a world whose art exists and wrong for one whose art has
 * not been commissioned: the story would declare a cover, the catalog would ask
 * for it, and every card would show a hole. So they carried null keys "until
 * somebody runs the generator for them on purpose" — which has now happened,
 * 180 assets across the three, so they join the rest.
 *
 * Worth keeping in mind next time: the gap between generating a world's art and
 * wrapping it here is invisible everywhere except a screenshot, which is
 * exactly what `derive-assets.ts` says it wanted to design out. `catalog.spec`
 * now checks the pair rather than trusting it.
 */
export const HUSH_HOUSE = withDerivedAssetKeys(HUSH_HOUSE_RAW);
export const WINDOW_SEVEN = withDerivedAssetKeys(WINDOW_SEVEN_RAW);
export const GOOD_MORNING_HUSBAND = withDerivedAssetKeys(GOOD_MORNING_HUSBAND_RAW);

/**
 * The official launch catalog.
 *
 * Deliberately different spines, so the engine is exercised rather than
 * decorated: The Ninth Archive is investigation with fail-forward defeat, The
 * Understudy is pure social systems with no combat at all, The Salt Road is
 * travel arithmetic with permanent death, and The Tidewall is a class RPG where
 * the class picks the route through every door, and The Unbound is build
 * freedom where half the abilities are awakened rather than chosen, and Nine
 * Weeks is a romance with no combat at all where the romance can genuinely fail,
 * and Red Moon Brigade is a monster hunt where the meter that makes you strong
 * is the same one that stops you being a person, and Seven Days to Midnight is
 * a week that restarts where the only thing you keep is what you found out, and
 * Blackwake is an ocean where the crew are people who can leave, and Last Five
 * is a sport where your position is counted out of what you kept trying and
 * every rival who watches film makes it harder, and Hush House is a building
 * that has spent a hundred years learning how people behave and gets better at
 * imitating the ones you let matter to you, and Window Seven is seven nights at
 * a camera where the brief is the thing every route through the story breaks, and
 * Good Morning, Husband is a marriage that already has four years of history in
 * it on the morning the player arrives with none, and Itachi is a fortnight in
 * which a thirteen-year-old is the only channel between two organisations that
 * have each decided he is theirs, and the famous thing at the end of it is one
 * of twelve destinations rather than the shape of the world, and Primal Crown is
 * three days at a market where five peoples have to redraw a forty-year
 * arrangement before the herds arrive, and the animals in it are animals, and
 * Zero Throne is a machine that opened for nobody for eighteen years walking the
 * length of a memorial plaza on turn one and kneeling to somebody who has no
 * idea why, and The Fourth Beast is three small creatures in open habitats under
 * a Paris institute, of which you are choosing one and somebody else is getting
 * whichever you leave, and Seven Names is a list handed to a condemned prisoner
 * six hours before the execution, by a man who says the first thing to understand
 * about it is that a name on a list is not a person who deserves to die, and The Blank Prophecy is a world that decides who everybody is
 * going to be by reading a thread, and a person it read and found nothing on, and The Red Floor is a storage level under an ageing gym where
 * fighters from every discipline meet after midnight and nothing that happens
 * down there has ever been written down, and Second Skin is a world where everybody chooses which animal
 * they become at sixteen and keeps it for life, and a woman who has done it twice
 * comes through the ceremony window, and Last Service is a thirty-seat family
 * restaurant with thirty days left on a loan and a hood that is making a noise, and Pink Tide is seven nights at an adults-only
 * island resort where a guest checked out this morning without leaving.
 */
export const LAUNCH_CATALOG = [
  NINTH_ARCHIVE,
  UNDERSTUDY,
  SALT_ROAD,
  TIDEWALL,
  UNBOUND,
  NINE_WEEKS,
  RED_MOON,
  SEVEN_DAYS,
  BLACKWAKE,
  LAST_FIVE,
  HUSH_HOUSE,
  WINDOW_SEVEN,
  GOOD_MORNING_HUSBAND,
  ITACHI,
  PRIMAL_CROWN,
  ZERO_THRONE,
  FOURTH_BEAST,
  SEVEN_NAMES,
  BLANK_PROPHECY,
  RED_FLOOR,
  SECOND_SKIN,
  LAST_SERVICE,
  PINK_TIDE,
] as const;
