import { withDerivedAssetKeys } from './derive-assets.js';
import { NINTH_ARCHIVE as NINTH_ARCHIVE_RAW } from './ninth-archive.js';
import { UNDERSTUDY as UNDERSTUDY_RAW } from './understudy.js';
import { SALT_ROAD as SALT_ROAD_RAW } from './salt-road.js';
import { TIDEWALL as TIDEWALL_RAW } from './tidewall.js';
import { UNBOUND as UNBOUND_RAW } from './unbound.js';

export { withDerivedAssetKeys } from './derive-assets.js';

export const NINTH_ARCHIVE = withDerivedAssetKeys(NINTH_ARCHIVE_RAW);
export const UNDERSTUDY = withDerivedAssetKeys(UNDERSTUDY_RAW);
export const SALT_ROAD = withDerivedAssetKeys(SALT_ROAD_RAW);
export const TIDEWALL = withDerivedAssetKeys(TIDEWALL_RAW);
export const UNBOUND = withDerivedAssetKeys(UNBOUND_RAW);

/**
 * The official launch catalog.
 *
 * Deliberately different spines, so the engine is exercised rather than
 * decorated: The Ninth Archive is investigation with fail-forward defeat, The
 * Understudy is pure social systems with no combat at all, The Salt Road is
 * travel arithmetic with permanent death, and The Tidewall is a class RPG where
 * the class picks the route through every door, and The Unbound is build
 * freedom where half the abilities are awakened rather than chosen.
 */
export const LAUNCH_CATALOG = [NINTH_ARCHIVE, UNDERSTUDY, SALT_ROAD, TIDEWALL, UNBOUND] as const;
