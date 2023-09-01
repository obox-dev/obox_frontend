import config from '../vite.config';

export default {
    ...config,
    build: {
      outDir: '../build/admin',
      emptyOutDir: true,
      sourcemap: 'external',
    },
}
