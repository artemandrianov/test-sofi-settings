import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  ignores: [
    'dist',
    '**/.vscode/',
    '**/node_modules/',
    '**/.pnpm-store/',
    '**/env.d.ts',
    '**/**.yaml',
  ],
  formatters: {
    css: true,
    html: true,
  },
  rules: {
    'ts/consistent-type-imports': 'off',
    'ts/prefer-literal-enum-member': 'off',
    'unicorn/prefer-dom-node-text-content': 'off',
    'prefer-regex-literals': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/order': 'off',
    'sort-imports': 'off',
    'style/indent-binary-ops': ['error', 2],
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/max-attributes-per-line': ['error', { singleline: 1 }],
    'unused-imports/no-unused-vars': ['error', {
      caughtErrors: 'none',
      destructuredArrayIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      argsIgnorePattern: '^_',
    }],
  },
})
