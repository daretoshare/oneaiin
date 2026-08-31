import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['app/lib/__tests__/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      all: true,
      include: ['app/lib/**/*.ts'],
      exclude: ['app/lib/**/__tests__/**', 'app/lib/site.ts'],
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        statements: 80,
        branches: 60,
      },
    },
  },
  resolve: {
    alias: {
      '@': import.meta.dirname,
    },
  },
});
