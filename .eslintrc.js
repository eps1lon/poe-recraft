module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:jsx-a11y/recommended', // TODO
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['jsx-a11y', 'react-hooks', 'react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off', // TODO
    '@typescript-eslint/camelcase': 'off', // TODO
    '@typescript-eslint/no-empty-interface': 'off', // still useful for documentation
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // TODO
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off', // TODO: revisit when changing data fetching
    '@typescript-eslint/explicit-function-return-type': 'off', // TODO

    'react/prop-types': 'off',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: '16.12',
    },
  },
};
