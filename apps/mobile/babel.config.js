module.exports = function (api) {
  api.cache(true);
  // The app uses React Native's built-in Animated API, so no Reanimated /
  // worklets plugin is needed.
  return { presets: ['babel-preset-expo'] };
};
