module.exports = {
  ignorePatterns: ['.eslintrc.js', './client/**/*'],
  extends: ['./.eslintrc.base.js'],
  env: { node: true, jest: true, es6: true },
  rules: {
    'import/no-default-export': ['error'],
    'import/prefer-default-export': 'off',
    'no-debugger': ['error'],
  },
};
