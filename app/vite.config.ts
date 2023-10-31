import config from '../vite.config';

export default {
  ...config,
  build: {
    outDir: '../build/app',
    emptyOutDir: true,
    sourcemap: true,
  },
};
