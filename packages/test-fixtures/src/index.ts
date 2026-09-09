import { withDerivedAssetKeys } from './derive-assets.js';
import { NINTH_ARCHIVE as NINTH_ARCHIVE_RAW } from './ninth-archive.js';
import { UNDERSTUDY as UNDERSTUDY_RAW } from './understudy.js';
import { SALT_ROAD as SALT_ROAD_RAW } from './salt-road.js';

export { withDerivedAssetKeys } from './derive-assets.js';

export const NINTH_ARCHIVE = withDerivedAssetKeys(NINTH_ARCHIVE_RAW);
export const UNDERSTUDY = withDerivedAssetKeys(UNDERSTUDY_RAW);
export const SALT_ROAD = withDerivedAssetKeys(SALT_ROAD_RAW);

/**
 * The official launch catalog.
 *
 * Deliberately three different spines, so the engine is exercised rather than
 * decorated: The Ninth Archive is investigation with fail-forward defeat, The
 * Understudy is pure social systems with no combat at all, and The Salt Road is
 * travel arithmetic with permanent death.
 */
export const LAUNCH_CATALOG = [NINTH_ARCHIVE, UNDERSTUDY, SALT_ROAD] as const;
