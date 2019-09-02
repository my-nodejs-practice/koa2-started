module.exports = {
  env: {
    commonjs: true,
    es6: true
  },
  extends: ['eslint:recommended', 'plugin:xmfe/node'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'require-atomic-updates': 'off'
  }
};
