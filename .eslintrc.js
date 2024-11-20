/**
 * © Copyright IBM Corporation 2020, 2024. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-require-imports */
const {
  rules: baseBestPracticesRules,
} = require('eslint-config-airbnb-base/rules/best-practices');
const {
  rules: baseErrorsRules,
} = require('eslint-config-airbnb-base/rules/errors');
const { rules: baseES6Rules } = require('eslint-config-airbnb-base/rules/es6');
const {
  rules: baseImportsRules,
} = require('eslint-config-airbnb-base/rules/imports');
const {
  rules: baseStyleRules,
} = require('eslint-config-airbnb-base/rules/style');
const {
  rules: baseVariablesRules,
} = require('eslint-config-airbnb-base/rules/variables');
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-require-imports */

module.exports = {
  'root': true,
  'env': {
    'node': true,
  },
  'plugins': ['header'],
  'extends': ['plugin:import/recommended'],
  'rules': {
    'header/header': [
      2,
      'block',
      [
        '*',
        {
          pattern:
            ' * (© Copyright IBM Corporation 20\\d\\d(?:, 20\\d\\d)?\\. All Rights Reserved\\.|\\(C\\) Copyright IBM Corp\\. 20\\d\\d\\.)',
          template:
            ' * © Copyright IBM Corporation 2021. All Rights Reserved.',
        },
        ' *',
        ' * Licensed under the Apache License, Version 2.0 (the "License");',
        ' * you may not use this file except in compliance with the License.',
        ' * You may obtain a copy of the License at',
        ' *',
        ' *      http://www.apache.org/licenses/LICENSE-2.0',
        ' *',
        ' * Unless required by applicable law or agreed to in writing, software',
        ' * distributed under the License is distributed on an "AS IS" BASIS,',
        ' * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.',
        ' * See the License for the specific language governing permissions and',
        ' * limitations under the License.',
        ' ',
      ],
    ],
    'max-len': ['error', { 'code': 100 }],
  },
  'overrides': [
    // JavaScript specific rules
    {
      'files': ['**/*.js'],
      'plugins': ['node', 'prettier'],
      'extends': ['airbnb-base', 'prettier'],
      'rules': {
        'camelcase': 'off',
        'import/extensions': 'off',
        'no-template-curly-in-string': 'off',
        'no-underscore-dangle': 'off',
        'prefer-const': 'error',
        'prettier/prettier': 'error',
        '@typescript-eslint/no-require-imports': 'error',
      },
    },
    // TypeScript specific rules
    {
      'files': ['**/*.ts'],
      'extends': ['plugin:import/typescript', 'prettier'],
      'parser': '@typescript-eslint/parser',
      'parserOptions': {
        'project': 'tsconfig.json',
        'sourceType': 'module',
      },
      'plugins': [
        'eslint-plugin-jsdoc',
        'eslint-plugin-import',
        '@typescript-eslint',
        'prettier',
      ],
      'rules': {
        'default-param-last': 'off', // disable base rule in favour of the extended typescript rule:
        '@typescript-eslint/default-param-last':
          baseBestPracticesRules['default-param-last'],

        'dot-notation': 'off', // disable base rule in favour of the extended typescript rule:
        '@typescript-eslint/dot-notation':
          baseBestPracticesRules['dot-notation'],

        'no-array-constructor': 'off', // disable base rule in favour of the extended typescript rule:
        '@typescript-eslint/no-array-constructor':
          baseStyleRules['no-array-constructor'],

        'no-empty-function': 'off', // disable base rule in favour of the extended typescript rule:
        '@typescript-eslint/no-empty-function':
          baseBestPracticesRules['no-empty-function'],

        'no-implied-eval': 'off', // disable base rule in favour of the extended typescript rule:
        '@typescript-eslint/no-implied-eval':
          baseBestPracticesRules['no-implied-eval'],

        // @typescript-eslint/no-loss-of-precision is deprecated, but
        // we still need error on no-loss-of-precision:
        'no-loss-of-precision': baseErrorsRules['no-loss-of-precision'],

        'no-loop-func': 'off', // disable base rule in favour of the extended typescript rule:
        '@typescript-eslint/no-loop-func':
          baseBestPracticesRules['no-loop-func'],

        'no-shadow': 'off', // disable base rule in favour of the extended typescript rule:
        '@typescript-eslint/no-shadow': baseVariablesRules['no-shadow'],

        'no-throw-literal': 'off', // disable base rule in favour of the extended typescript rule:
        // in @typescript-eslint no-throw-literal became only-throw-error:
        '@typescript-eslint/only-throw-error':
          baseBestPracticesRules['no-throw-literal'],

        'no-unused-expressions': 'off', // disable base rule in favour of the extended typescript rule:
        '@typescript-eslint/no-unused-expressions':
          baseBestPracticesRules['no-unused-expressions'],

        'no-use-before-define': 'off', // disable base rule in favour of the extended typescript rule:
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            'functions': false,
            'classes': false,
            'enums': false,
            'typedefs': false,
          },
        ],

        'no-useless-constructor': 'off', // disable base rule in favour of the extended typescript rule:
        '@typescript-eslint/no-useless-constructor':
          baseES6Rules['no-useless-constructor'],

        'return-await': 'off', // disable base rule in favour of the extended typescript rule:
        '@typescript-eslint/return-await': [
          baseBestPracticesRules['no-return-await'],
          'in-try-catch',
        ],

        'import/no-unresolved': 'error',

        // Ensure consistent use of file extension within the import path
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
        // and append 'ts' and 'tsx' to Airbnb 'import/extensions' config
        'import/extensions': [
          baseImportsRules['import/extensions'][0],
          baseImportsRules['import/extensions'][1],
          {
            ...baseImportsRules['import/extensions'][2],
            ts: 'never',
            tsx: 'never',
          },
        ],

        'import/no-extraneous-dependencies': [
          'error',
          { 'devDependencies': false, 'optionalDependencies': false },
        ],

        'no-param-reassign': 'off',
        'no-underscore-dangle': 'off',
        'prettier/prettier': 'error',
        'spaced-comment': ['error', 'always', { 'exceptions': ['*'] }],
      },
    },
    {
      'files': ['cloudant/v1.ts'],
      'rules': {
        'prettier/prettier': 'off',
        'max-len': 'off',
      },
    },
    // Test folder specific rules
    {
      'files': ['test/**/*.*'],
      'env': {
        'jest': true,
        'es6': true,
      },
      'plugins': ['jest'],
      'extends': ['plugin:jest/recommended', 'plugin:jest/style'],
      'rules': {
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
    {
      'files': ['test/**/*.test.js'],
      'rules': {
        'jest/expect-expect': 'off',
        'jest/no-conditional-expect': 'off',
        'jest/no-done-callback': 'off',
      },
    },
    {
      'files': ['test/**/cloudant.v1.test.js'],
      'rules': {
        'prettier/prettier': 'off',
        'object-shorthand': 'off',
      },
    },
    {
      'files': [
        'test/**/readme.integration.test.js',
        'test/examples/src/ts/*.ts',
      ],
      'rules': {
        'no-console': 'off',
      },
    },
  ],
};
