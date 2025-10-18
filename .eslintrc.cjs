module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    },
  },
  overrides: [{ files: ['**/*.ts', '**/*.tsx'], excludedFiles: ['electron/**'] }],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/require-default-props': 'off',
    'class-methods-use-this': 'off',

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

  ignorePatterns: [
    'package.json',
    'package-lock.json',
    '*.css',
    '*.json',
    'scripts/**/*.js',
    'src/styles/typography/fonts/**/*',
  ],
};
