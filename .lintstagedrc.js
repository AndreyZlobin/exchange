module.exports = {
  "./apps/server/**/*.ts": ["npm run server:lint-fix", "git add"],
  "./apps/client/**/*.{js,.jsx,.ts,.tsx}": [
    "npm run client:lint-fix",
    "git add",
  ],
};
