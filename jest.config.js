module.exports = {
  testTimeout: 70000,
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transformIgnorePatterns: ["node_modules/(?!axios|html2pdf)"],
  setupFiles: ["jest-canvas-mock"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/unit/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "<rootDir>/tests/unit/__mocks__/styleMock.js",
    "tests/(.*)": "<rootDir>/tests/$1",
    quasar: "quasar/dist/quasar.umd.js",
  },
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
};
