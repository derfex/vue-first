/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [
    {
      extends: [
        'plugin:playwright/recommended'
      ],
      files: [
        'e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'
      ],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  root: true,
}
