import i18n from './i18n';
import '../shared/src/styles/style.scss';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

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
  decorators: [(Story) => (<MemoryRouter><Story/></MemoryRouter>)],
};

export default preview;
