import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

/**
 * The whole monorepo's tests, run from the root.
 *
 * The only thing configured here is the React Native stand-in. The published
 * `react-native` package is Flow-typed source that node cannot parse, so every
 * module that imports it — including the API client, whose 401 retry rule is
 * exactly the kind of thing that should be pinned — was untestable off a
 * device. Screens still are, and are not pretended otherwise.
 */
export default defineConfig({
  resolve: {
    alias: {
      'react-native': fileURLToPath(
        new URL('./apps/mobile/src/test/react-native.stub.ts', import.meta.url),
      ),
    },
  },
});
