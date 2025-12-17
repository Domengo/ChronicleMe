module.exports = function (api) {
  api.cache(true);
  return {
    // presets: [
    //   ["babel-preset-expo"],
    // ],
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      'react-native-worklets/plugin', // Required for react-native-css-interop or worklets
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};