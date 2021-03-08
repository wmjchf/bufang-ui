module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ["eslint:recommended", "airbnb", "standard"], // 扩展的规则
  globals: {
    $: true,
    process: true,
    __dirname: true
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module",
    ecmaVersion: 7
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "no-console": 1, // 不禁用console
    "react/jsx-uses-react": 2, // 防止反应被错误地标记为未使用
    "@typescript-eslint/no-var-requires": 0,
    quotes: [2, "double"],
    "linebreak-style": 0,
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    semi: ["error", "always"]
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
