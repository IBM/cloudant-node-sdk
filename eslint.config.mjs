import { defineConfig } from 'eslint/config';
import globals from 'globals';
import header from 'eslint-plugin-header';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-plugin-prettier/recommended';
import tsParser from '@typescript-eslint/parser';
import jsdoc from 'eslint-plugin-jsdoc';
import importPlugin from 'eslint-plugin-import';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import jest from 'eslint-plugin-jest';
import js from '@eslint/js';
import customRules from './.eslint-rules.json' with { type: 'json' };
import customTsRules from './.eslint-rules-ts.mjs';

// Disable schema checking for eslint-plugin-header
header.rules.header.meta.schema = false;

export default defineConfig([{
    languageOptions: {
        globals: {
            ...globals.node,
        },

        'ecmaVersion': 2023,
        'sourceType': 'module',
        parserOptions: {},
    },

    plugins: {
        header,
        importPlugin,
        jsdoc,
        prettier,
    },

    extends: [
        js.configs.recommended, // js recommended
        importPlugin.flatConfigs.recommended, // import plugin rules
        eslintConfigPrettier, // disable things that mess with prettier style
        customRules,
    ],
    rules: {
        'header/header': [2, 'block', [
            '*',
            { pattern: '^ \\* (?:©|(?:\\(C\\))) Copyright IBM Corp(?:\\.|(?:oration)) 20\\d\\d(?:, 20\\d\\d)?\\.(?: All Rights Reserved\\.)?$' },
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
            ' '
        ]],

        'max-len': ['error', {
            'code': 120,
        }],
    },
},
// JavaScript specific rules
{
    files: ['**/*.js'],

    'rules': {
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
    files: ['**/*.ts'],
    extends: [
        importPlugin.flatConfigs.typescript,
        customTsRules
    ],

    languageOptions: {
        parser: tsParser,

        parserOptions: {
            'project': 'tsconfig.json',
        },
    },

    plugins: {
        '@typescript-eslint': typescriptEslint,
    },
}, {
    files: ['cloudant/v1.ts'],

    'rules': {
        'prettier/prettier': 'off',
        'max-len': 'off',
        'no-redeclare': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'prefer-const': 'off',
        'lines-between-class-members': 'off',
    },
},
// Test folder specific rules
{
    files: ['test/**/*.*'],

    languageOptions: {
        globals: {
            ...globals.jest,
        },
    },

    plugins: {
        jest,
    },

    extends: [
        jest.configs['flat/recommended'],
        jest.configs['flat/style'],
    ],

    'rules': {
        '@typescript-eslint/no-require-imports': 'off',
    },
}, {
    files: ['test/**/*.test.js'],

    'rules': {
        'jest/expect-expect': 'off',
        'jest/no-conditional-expect': 'off',
        'jest/no-done-callback': 'off',
    },
}, {
    files: ['test/**/cloudant.v1.test.js'],

    'rules': {
        'max-len': 'off',
        'prettier/prettier': 'off',
        'object-shorthand': 'off',
    },
}, {
    files: ['test/integration/readme.integration.test.js', 'test/examples/src/ts/*.ts'],

    'rules': {
        'no-console': 'off',
    },
}, {
    ignores: [
        'eslint.config.mjs',
        '.eslint-rules-ts.mjs',
        '.prettierrc.js',
        '**/apidocs/',
        '**/coverage/',
        '**/dist/',
        '**/examples/',
        '**/gh-pages/',
        '**/junitreports/',
        '**/node_modules/',
        'scripts/typedoc/',
        '**/stubs',
        'auth/*.js',
        'cloudant/v1.js',
        'lib/*.js',
    ]
},
]);
