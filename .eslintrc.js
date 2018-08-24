'use strict';

module.exports = {
  root: true,
  parser: 'typescript-eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    },
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'ember',
    'qunit'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    amd: true,
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    qunit: true,
    serviceworker: true,
    'shared-node-browser': true,
    worker: true
  },
  rules: {
  },
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'ember/no-attrs-snapshot': 'off'
      }
    },
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js'
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
      })
    }
  ]
};
