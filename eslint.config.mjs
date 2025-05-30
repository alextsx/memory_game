import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      '.eslintrc.js',
      'commitlint.config.js',
      'lint-staged.config.js',
      '.prettierrc.js',
      'node_modules',
      '.next/',
      '_next/',
      '.vscode/',
      'dist/',
      'e2e-tests/',
      'public',
      '.github',
      'build',
      'coverage'
    ]
  }
];

export default eslintConfig;
