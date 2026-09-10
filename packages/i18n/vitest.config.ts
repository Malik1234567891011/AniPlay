import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

/**
 * The polyfill is loaded as a setup file so the tests assert the same CLDR the
 * device will run, rather than whatever ICU this machine's Node was built
 * against. Without it these tests pass here and fail on a phone.
 */
export default defineConfig({
  test: {
    setupFiles: [fileURLToPath(new URL('./src/polyfill.ts', import.meta.url))],
  },
});
