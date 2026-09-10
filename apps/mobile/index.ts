// First line, deliberately, and before anything that touches `Intl`.
//
// Hermes on iOS has no `Intl.NumberFormat.prototype.formatToParts` and no
// compact notation; Hermes on Android bridges to whatever ICU the OS release
// shipped, so the French thousands separator is U+00A0 on one phone and U+202F
// on the next. This import replaces `Intl` with one JavaScript implementation
// and one CLDR version on every platform. See `@aniplay/i18n/polyfill`.
import '@aniplay/i18n/polyfill';

import { registerRootComponent } from 'expo';
import App from './src/App';

registerRootComponent(App);
