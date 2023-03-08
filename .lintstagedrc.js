module.exports = {
  "apps/server/**/*.{ts,tsx}": [
    "npm run lint:fix --prefix apps/server",
    "git add"
  ],
};
