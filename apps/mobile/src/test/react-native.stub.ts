/**
 * Enough of `react-native` to load app modules in node.
 *
 * The published package is Flow-typed source, which node's ESM parser rejects
 * outright ("Expected 'from', got 'typeOf'"), so anything importing it was
 * untestable off a device. That included `api/client.ts`, which touches exactly
 * one thing from it — `Platform.OS`, to pick a localhost that an Android
 * emulator can reach — and whose retry behaviour around 401 is worth pinning.
 *
 * Deliberately tiny. If a test needs more of React Native than this, it is a
 * test that wants a device, and it should say so rather than grow this file.
 */

export const Platform = {
  OS: 'ios' as 'ios' | 'android' | 'web',
  select: <T,>(specifics: { ios?: T; android?: T; default?: T }): T | undefined =>
    specifics.ios ?? specifics.default,
};
