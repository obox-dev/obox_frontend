import config from '../vite.config';

export default {
    ...config,
    build: {
      outDir: '../build/public_html',
      emptyOutDir: true,
    },
}
