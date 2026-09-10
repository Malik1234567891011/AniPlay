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
import { HUSH_HOUSE } from './hush-house.js';
import { WINDOW_SEVEN } from './window-seven.js';
import { GOOD_MORNING_HUSBAND } from './good-morning-husband.js';
import { ITACHI as ITACHI_RAW } from './itachi.js';
import { PRIMAL_CROWN as PRIMAL_CROWN_RAW } from './primal-crown.js';

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

/**
 * Three of the newest worlds ship without generated art, deliberately.
 *
 * `withDerivedAssetKeys` fills in the key the image pipeline *would* produce,
 * which is right for a world whose art exists and wrong for one whose art has
 * not been commissioned: the story would declare a cover, the catalog would ask
 * for it, and every card would show a hole. The covers on the first ten are
 * locked and must not be regenerated, so these four carry null keys until
 * somebody runs the generator for them on purpose.
 */
export { HUSH_HOUSE } from './hush-house.js';
export { WINDOW_SEVEN } from './window-seven.js';
export { GOOD_MORNING_HUSBAND } from './good-morning-husband.js';

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
 * arrangement before the herds arrive, and the animals in it are animals.
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
] as const;
