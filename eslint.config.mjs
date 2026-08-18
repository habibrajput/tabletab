import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
// Turns off ESLint formatting rules that would fight Prettier (must come last).
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  // Correctness rules promoted to errors so the pre-commit hook actually blocks
  // real mistakes. Prefix an intentionally-unused binding with `_` to allow it.
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
      "no-const-assign": "error",
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      // React Compiler advisories: informative, but must not block commits.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/incompatible-library": "warn",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
