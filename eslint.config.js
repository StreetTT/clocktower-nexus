const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/.git/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.cache/**',
      '**/.turbo/**',
      '**/*.tsbuildinfo',
      'docs/**',
    ],
  },
  {
    files: [
      'apps/**/*.ts',
      'apps/**/*.tsx',
      'packages/**/*.ts',
      'packages/**/*.tsx',
    ],
    extends: [...tseslint.configs.recommended],
  },
);
