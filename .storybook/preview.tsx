import i18n from './i18n';
import '../shared/src/styles/style.scss';

/** @type { import('@storybook/react').Preview } */
const preview = {
  globals: {
    locale: 'en',
    locales: {
      en: 'EN',
      ua: 'UA',
    },
  },
  parameters: {
    i18n,
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
