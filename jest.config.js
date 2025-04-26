module.exports = {
  testTimeout: 6000,
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transformIgnorePatterns: ["node_modules/(?!quasar|axios|html2pdf)"],
  setupFiles: ["jest-canvas-mock"],
  globals: {
    __QUASAR_SSR__: false,
    __QUASAR_SSR_SERVER__: false,
    __QUASAR_SSR_CLIENT__: false,
    __QUASAR_VERSION__: '"2.16.0"',
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/unit/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "<rootDir>/tests/unit/__mocks__/styleMock.js",
    "tests/(.*)": "<rootDir>/tests/$1",
    "^quasar$": "<rootDir>/node_modules/quasar/src/vue-plugin.js",
  },
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
};
