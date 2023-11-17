import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'app/src'),
      '@admin': path.resolve(__dirname, 'admin/src'),
      '@shared': path.resolve(__dirname, 'shared/src'),
      '@libs': path.resolve(__dirname, 'node_modules'),
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: '@use "@shared/src/style/variables.scss";',
  //     },
  //   },
  // },
});
