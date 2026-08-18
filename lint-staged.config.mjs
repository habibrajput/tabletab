/**
 * Staged files are formatted with Prettier, then linted with ESLint (--fix).
 * ESLint errors (e.g. unused vars, no-explicit-any is a warning) block the commit.
 */
const config = {
  "**/*.{ts,tsx,js,jsx}": ["prettier --write", "eslint --fix"],
  "**/*.{json,css,md}": ["prettier --write"],
};

export default config;
