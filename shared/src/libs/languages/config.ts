import i18n from "@libs/i18next";
import { initReactI18next } from "@libs/react-i18next";
import en from "./en";
import ua from "./ua";

export const resources = {
  en,
  ua,
} as const;

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    ns: ["common"],
    fallbackLng: "ua",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
    supportedLngs: ["en", "ua"],
  });
