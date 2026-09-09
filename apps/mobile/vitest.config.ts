import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

/**
 * Only the parts of the app that do not need a device.
 *
 * The auth client is pure `fetch`, so its request shapes and its error copy are
 * worth pinning here. Screens and anything importing a native module are not
 * testable in node and are not pretended to be.
 */
export default defineConfig({
  resolve: {
    // `react-native` is Flow-typed source node cannot parse. See the stub.
    alias: {
      'react-native': fileURLToPath(new URL('./src/test/react-native.stub.ts', import.meta.url)),
    },
  },
  test: {
    include: ['src/api/**/*.spec.ts', 'src/auth/**/*.spec.ts', 'src/store/**/*.spec.ts'],
    environment: 'node',
  },
});
