/**
 * © Copyright IBM Corporation 2020. All Rights Reserved.
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
  'plugins': ['header'],
  'extends': ['plugin:import/recommended'],
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': ['.ts', '.js', '.mjs'],
      },
    },
  },
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
      'files': ['**/*.js', '**/*.mjs'],
      'plugins': ['node', 'prettier'],
      'extends': ['airbnb-base', 'prettier'],
      'rules': {
        '@typescript-eslint/no-require-imports': 'error',
        'camelcase': 'off',
        'import/extensions': 'off',
        'no-template-curly-in-string': 'off',
        'no-underscore-dangle': 'off',
        'prefer-const': 'error',
        'prettier/prettier': 'error',
      },
    },
    // TypeScript specific rules
    {
      'files': ['**/*.ts'],
      'extends': [
        'airbnb-typescript/base',
        'plugin:import/typescript',
        'prettier',
      ],
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
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
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
        'no-console': 'off',
        'import/namespace': 'off',
        'import/no-unresolved': 'off',
      },
    },
    {
      'files': ['test/**/*.test.js', 'test/**/*.test.mjs'],
      'rules': {
        'jest/expect-expect': 'off',
        'jest/no-conditional-expect': 'off',
        'jest/no-done-callback': 'off',
      },
    },
    {
      'files': ['test/**/cloudant.*.test.js', 'test/**/auth-helper.js'],
      'rules': {
        '@typescript-eslint/no-require-imports': 'off',
        'prettier/prettier': 'off',
      },
    },
  ],
};
