module.exports = {
  './**/*.ts': ['npm run lint:fix', 'git add'],
  './client/**/*.{js,.jsx,.ts,.tsx}': ['npm run lint:fix-client', 'git add'],
  './**/*': ['prettier --write', 'git add'],
};
