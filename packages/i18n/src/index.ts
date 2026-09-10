/**
 * `@aniplay/i18n` — the locale seam.
 *
 * A leaf package with no dependency on any other workspace package, so
 * `@aniplay/contracts` can build its `Locale` schema on it without a cycle.
 *
 * The side-effecting polyfill is deliberately **not** re-exported here. Import
 * `@aniplay/i18n/polyfill` explicitly, first, at the app entry point.
 */

export * from './locale.js';
export * from './typography.js';
export * from './format.js';
export * from './search.js';
export * from './conformance.js';
