module.exports = {
  ignorePatterns: ['.eslintrc.js', './client/**/*'],
  extends: ['../../.eslintrc.base.js'],
  globals: { Atomics: 'readonly', SharedArrayBuffer: 'readonly' },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
  },
  env: { node: true, jest: true, es6: true },
  rules: {
    'import/no-default-export': ['error'],
    'import/prefer-default-export': 'off',
    'no-debugger': ['error'],
  },
};
