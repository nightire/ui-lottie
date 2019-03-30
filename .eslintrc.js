'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['ember', 'qunit', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:qunit/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'no-unused-vars': ['error', { args: 'after-used' }],
  },
  overrides: [
    {
      parser: '@typescript-eslint/parser',
      files: ['**/*.ts'],
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'ember/no-attrs-snapshot': 'off',
      },
    },
    {
      files: [
        '.ember-cli.js',
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
        browser: false,
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
