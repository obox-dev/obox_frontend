// import vitePluginSass from 'vite-plugin-sass';
import checker from 'vite-plugin-checker';
import config from '../vite.config';


export default {
  ...config,
  plugins: [checker({ typescript: true })],

  build: {
    outDir: '../build/public_html',
    emptyOutDir: true,
  },
};
