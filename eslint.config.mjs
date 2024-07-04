import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: { process: true, console: true } } },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 2,
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 1,
    },
  },
  {
    ignores: ['dist/', 'node_modules/', 'config'],
  },
];
