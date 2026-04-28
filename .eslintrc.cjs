module.exports = {
  env: {
    node: true,
    es2022: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: {
    navigator: 'readonly',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'no-empty-pattern': 'off',
  },
};
