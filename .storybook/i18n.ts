import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../shared/src/libs/languages/en";
import ua from "../shared/src/libs/languages/ua";

export const resources = {
  en,
  ua,
} as const;

i18n
  .use(initReactI18next)
  .init({
    ns: ["common", "home"],
    fallbackLng: "ua",
    interpolation: {
      escapeValue: false,
    },
    resources,
    supportedLngs: ["en", "ua"],
  });

export default i18n;
