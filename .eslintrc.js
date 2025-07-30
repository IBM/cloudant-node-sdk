/**
 * © Copyright IBM Corporation 2020, 2025. All Rights Reserved.
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

module.exports = {
  'root': true,
  'env': {
    'node': true,
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': ['header'],
  'extends': ['./.eslint-rules.json'],
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
      'extends': ['prettier'],
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
      },
      'plugins': [
        'eslint-plugin-jsdoc',
        'eslint-plugin-import',
        '@typescript-eslint',
        'prettier',
      ],
      'rules': {
        'default-param-last': 'off', // disable base rule in favour of the extended typescript rule:
        // https://eslint.org/docs/rules/default-param-last
        '@typescript-eslint/default-param-last': 'error',

        'dot-notation': 'off', // disable base rule in favour of the extended typescript rule:
        '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],

        'no-array-constructor': 'off', // disable base rule in favour of the extended typescript rule:
        // disallow use of the Array constructor
        '@typescript-eslint/no-array-constructor': 'error',

        'no-empty-function': 'off', // disable base rule in favour of the extended typescript rule:
        // disallow empty functions, except for standalone funcs/arrows
        // https://eslint.org/docs/rules/no-empty-function
        '@typescript-eslint/no-empty-function': [
          'error',
          {
            allow: ['arrowFunctions', 'functions', 'methods'],
          },
        ],

        'no-implied-eval': 'off', // disable base rule in favour of the extended typescript rule:
        // disallow use of eval()-like methods
        // https://eslint.org/docs/rules/no-implied-eval
        '@typescript-eslint/no-implied-eval': 'error',

        // @typescript-eslint/no-loss-of-precision is deprecated, but
        // we still need error on no-loss-of-precision:
        // Disallow Number Literals That Lose Precision
        // https://eslint.org/docs/rules/no-loss-of-precision
        'no-loss-of-precision': 'error',

        'no-loop-func': 'off', // disable base rule in favour of the extended typescript rule:
        // disallow creation of functions within loops
        // https://eslint.org/docs/rules/no-loop-func
        '@typescript-eslint/no-loop-func': 'error',

        'no-shadow': 'off', // disable base rule in favour of the extended typescript rule:
        // disallow declaration of variables already declared in the outer scope
        '@typescript-eslint/no-shadow': 'error',

        'no-throw-literal': 'off', // disable base rule in favour of the extended typescript rule:
        // in @typescript-eslint no-throw-literal became only-throw-error:
        // restrict what can be thrown as an exception
        // https://eslint.org/docs/rules/no-throw-literal
        '@typescript-eslint/only-throw-error': 'error',

        'no-unused-expressions': 'off', // disable base rule in favour of the extended typescript rule:
        // disallow usage of expressions in statement position
        // https://eslint.org/docs/rules/no-unused-expressions
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: false,
            allowTernary: false,
            allowTaggedTemplates: false,
          },
        ],

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
        // disallow unnecessary constructor
        // https://eslint.org/docs/rules/no-useless-constructor
        '@typescript-eslint/no-useless-constructor': 'error',

        'return-await': 'off', // disable base rule in favour of the extended typescript rule:
        // disallow redundant `return await`
        // https://eslint.org/docs/rules/no-return-await
        '@typescript-eslint/return-await': ['error', 'in-try-catch'],

        'import/no-unresolved': 'error',

        // Ensure consistent use of file extension within the import path
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
        // and append 'ts' and 'tsx' to Airbnb 'import/extensions' config
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            mjs: 'never',
            jsx: 'never',
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

        'class-methods-use-this': 'off', // disable base rule in favour of the extended typescript rule:
        '@typescript-eslint/class-methods-use-this': [
          'error',
          {
            'ignoreOverrideMethods': true,
            'ignoreClassesThatImplementAnInterface': true,
          },
        ],
        'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
        'import/no-cycle': 'off',
        'no-dupe-class-members': 'off', // it is safe to disable this rule when using TS because TS's compiler enforces this check
        // Don't use no-undef in TS files.
        // https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
        'no-undef': 'off',
        'no-unused-vars': 'off', // disable base rule in favour of the extended typescript rule:
        '@typescript-eslint/no-unused-vars': 'error',
      },
    },
    {
      'files': ['cloudant/v1.ts'],
      'rules': {
        'prettier/prettier': 'off',
        'max-len': 'off',
        'no-redeclare': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'prefer-const': 'off',
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
