import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
    // PBKDF2 at 600,000 iterations is deliberately slow; the default 5s
    // per-test limit is too tight for key-derivation tests on CI hardware.
    testTimeout: 30000,
  },
});
