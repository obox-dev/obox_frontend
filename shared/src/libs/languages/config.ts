import i18n from '@libs/i18next';
import { initReactI18next } from '@libs/react-i18next';
import en from './en';
import ua from './ua';

export const supportedLanguages = {
  en: 'en-US',
  ua: 'uk-UA'
};

export const resources: Record<keyof typeof supportedLanguages, typeof en | typeof ua> = {
  en,
  ua,
} as const;


i18n
  .use(initReactI18next)
  .init({
    ns: ['common', 'home'],
    fallbackLng: 'ua',
    interpolation: {
      escapeValue: false,
    },
    resources,
    supportedLngs: ['en', 'ua'],
  });
