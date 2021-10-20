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
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': ['**/*.js', '**/*.jsx'],
      'plugins': ['node', 'jest', 'prettier'],
      'extends': ['airbnb-base', 'plugin:jest/recommended', 'plugin:jest/style', 'prettier'],
      'rules': {
        'camelcase': 'off',
        'import/extensions': 'off',
        'no-template-curly-in-string': 'off',
        'no-underscore-dangle': 'off',
        'prefer-const': 'error',
        'prettier/prettier': 'error',
      },
    },
    {
      'files': ['*.test.js', '*.test.jsx'],
      'rules': {
        'jest/expect-expect': 'off',
        'jest/no-conditional-expect': 'off',
        'jest/no-done-callback': 'off',
        'jest/no-standalone-expect': 'off',
        'jest/no-try-expect': 'off',
        'no-unused-vars': 'off',
      },
    },
    {
      'files': ['**/*.ts', '**/*.tsx'],
      'env': {
        'node': true,
      },
      'extends': ['airbnb-typescript/base', 'prettier'],
      'parser': '@typescript-eslint/parser',
      'parserOptions': {
        'project': 'tsconfig.json',
        'sourceType': 'module',
      },
      'plugins': ['eslint-plugin-jsdoc', 'eslint-plugin-import', '@typescript-eslint', 'prettier'],
      'rules': {
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'max-len': 'off',
        'no-param-reassign': 'off',
        'no-underscore-dangle': 'off',
        'prettier/prettier': 'error',
        'spaced-comment': ['error', 'always', { 'exceptions': ['*'] }],
      },
    },
  ],
};
