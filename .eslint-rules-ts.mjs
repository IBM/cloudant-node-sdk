export default {
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
    'eqeqeq': 'error',
    // We use `import { default as CloudantV1 } from ...` only for CloudantV1,
    // other classes should be _named exports_ resulting ` import { ClassName } from ...`:
    'import/no-named-default': 'off',
    // For clarity and explicitness we do not prefer default exports other than the generated CloudantV1 class:
    'import/prefer-default-export': 'off',
    'lines-between-class-members': [
      'error',
      {
        'enforce': [{ blankLine: 'never', prev: 'field', next: 'field' }],
      },
    ],
    'no-dupe-class-members': 'off', // it is safe to disable this rule when using TS because TS's compiler enforces this check
    // Don't use no-undef in TS files.
    // https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
    'no-undef': 'off',
    'no-unused-vars': 'off', // disable base rule in favour of the extended typescript rule:
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        'vars': 'all',
        'args': 'none',
        'ignoreRestSiblings': true,
      },
    ],
  },
};
