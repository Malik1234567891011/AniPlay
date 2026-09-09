import { defineConfig } from 'vitest/config';

/**
 * Only the parts of the app that do not need a device.
 *
 * The auth client is pure `fetch`, so its request shapes and its error copy are
 * worth pinning here. Screens and anything importing a native module are not
 * testable in node and are not pretended to be.
 */
export default defineConfig({
  test: {
    include: ['src/auth/**/*.spec.ts'],
    environment: 'node',
  },
});
