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
  'env': {
    'node': true,
  },
  parser: '@typescript-eslint/parser',
  'plugins': ['node', 'prettier', 'header', '@typescript-eslint'],
  'extends': [
    'eslint:recommended',
    'google',
    'plugin:node/recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  'rules': {
    'prettier/prettier': ['error', { 'singleQuote': true, 'printWidth': 80 }],
    'prefer-const': 'error',
    'prefer-rest-params': 'off', // https://github.com/mysticatea/eslint-plugin-node/issues/63
    // The rest of these override rules that are enabled by one of the configs we extend but not compatible with current codebase
    // todo: fix issues and then remove overrides here
    'valid-jsdoc': 'off', // too many issues; drowns out everything else
    'camelcase': 'off', // todo: determine if we should keep this off globally, or disable it on a per-line basis
    'import/extensions': 'off',
    'header/header': [
      2,
      'block',
      [
        '*',
        {
          pattern:
            ' * (© Copyright IBM Corporation 20\\d\\d(?:, 20\\d\\d)?\\. All Rights Reserved\\.|\\(C\\) Copyright IBM Corp\\. 20\\d\\d\\.)',
          template: ' * © Copyright IBM Corporation 2021. All Rights Reserved.',
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
  },
  overrides: [
    {
      files: ['test/unit/cloudant.v1.test.js'],
      rules: {
        'node/no-missing-require': 'off',
        'prettier/prettier': 'off',
      },
    },
    {
      files: ['cloudant/v1.ts'],
      rules: {
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-redeclare': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'node/no-missing-import': 'off',
        'node/no-unsupported-features/es-syntax': 'off',
        'prettier': 'off',
        'prettier/prettier': 'off',
        'require-jsdoc': 'off',
        'spaced-comment': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['lib', 'test'],
        extensions: ['.js', '.ts'],
        moduleDirectory: ['node_modules'],
      },
    },
  },
};
