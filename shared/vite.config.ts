import config from '../vite.config';

export default {
    ...config,
    build: {
      outDir: '../build/shared',
      emptyOutDir: true,
      sourcemap: true,
    },
}
