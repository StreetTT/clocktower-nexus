const tseslint = require('typescript-eslint');
const jsdoc = require('eslint-plugin-jsdoc');

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
  {
    files: ['packages/domain/**/*.ts', 'packages/protocol/**/*.ts'],
    ignores: [
      'packages/domain/tests/**/*.ts',
      'packages/domain/vitest.config.ts',
    ],
    plugins: {
      jsdoc,
    },
    settings: {
      jsdoc: {
        mode: 'typescript',
      },
    },
    rules: {
      'no-warning-comments': [
        'error',
        {
          terms: ['todo', 'fixme'],
          location: 'start',
        },
      ],
      'jsdoc/check-syntax': 'error',
      'jsdoc/check-tag-names': 'error',
      'jsdoc/require-description': 'off',
      'jsdoc/require-jsdoc': [
        'error',
        {
          publicOnly: {
            esm: true,
          },
          contexts: [
            'TSInterfaceDeclaration',
            'TSTypeAliasDeclaration',
            'VariableDeclaration',
          ],
          require: {
            ArrowFunctionExpression: false,
            ClassDeclaration: false,
            FunctionDeclaration: false,
            FunctionExpression: false,
            MethodDefinition: false,
          },
        },
      ],
    },
  },
);
