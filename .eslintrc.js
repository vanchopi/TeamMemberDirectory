module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "vue/no-use-v-if-with-v-for": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-mutating-props": "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    withDefaults: "readonly",
    defineExpose: "readonly",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
