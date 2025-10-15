import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
  globalIgnores([
    'dist',
    'tcm-physical-pc',
    'node_modules',
    'build/',
    'out/',
    'coverage/',
    'temp/',
    'tmp/',
    '.cache/',
    '.next/',
    '.storybook-out/',
    '.vite/',
    'vite-dist/',
    '*.min.js',
    '*.bundle.js',
    '*.map',
    '*.log',
    '*.lock',
    '*.svg',
    '*.png',
    '*.jpg',
    '*.jpeg',
    '*.gif',
    '*.ico',
    '.idea/',
    '.vscode/',
    '.DS_Store',
    '__snapshots__/',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
