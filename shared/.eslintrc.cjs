// electron/.eslintrc.cjs
module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': [
      'off',
      {
        varsIgnorePattern: '^(__)',
        argsIgnorePattern: '^(__)',
        destructuredArrayIgnorePattern: '^(__)',
        caughtErrorsIgnorePattern: '^(__)',
      },
    ],

    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        filter: { regex: '^(__)', match: false },
      },
    ],
    'no-underscore-dangle': [
      'off',
      { allowAfterThis: true, allowAfterSuper: true, enforceInMethodNames: false },
    ],
  },
};
