'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    // ecmaFeatures: {
    //   legacyDecorators: true,
    //   experimentalDecorators: true,
    //   experimentalObjectRestSpread: true,
    // },
    sourceType: 'module',
  },
  plugins: ['ember', 'qunit', 'typescript'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:qunit/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {},
  overrides: [
    {
      parser: 'typescript-eslint-parser',
      files: ['**/*.ts'],
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'ember/no-attrs-snapshot': 'off',
      },
    },
    {
      files: [
        '.eslintrc.js',
        '.prettierrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js',
        'tests/dummy/config/**/*.js',
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**',
        'types',
      ],
      parserOptions: {
        ecmaVersion: 2015,
        sourceType: 'script',
      },
      env: {
        node: true,
      },
      plugins: ['node'],
      rules: Object.assign(
        {},
        require('eslint-plugin-node').configs.recommended.rules,
        {
          'node/no-extraneous-require': 'off',
          'node/no-unpublished-require': 'off',
        }
      ),
    },
  ],
};
