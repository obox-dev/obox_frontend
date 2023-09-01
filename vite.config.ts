import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    sourcemap: 'external',
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'app/src'),
      '@admin': path.resolve(__dirname, 'admin/src'),
      '@shared': path.resolve(__dirname, 'shared/src'),
      '@libs': path.resolve(__dirname, 'node_modules'),
    },
  },
});
