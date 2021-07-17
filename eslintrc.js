module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    tsconfigRootDir: './',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'import'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/extensions': ['.js', '.jsx'],
  },
  rules: {
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/camelcase': 0,
    'react/no-unescaped-entities': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
  },
};
