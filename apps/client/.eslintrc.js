module.exports = {
  extends: ['@self-kit/eslint-config-react-ts'],
  parserOptions: {
    project: './tsconfig.eslint.json',
    createDefaultProgram: true,
  },
  rules: {
    'import/order': [
      'error',
      {
        pathGroups: [{ pattern: ' @exchange/**', group: 'internal', position: 'after' }],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['internal'],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'object', 'index'],
      },
    ],
  },
};
