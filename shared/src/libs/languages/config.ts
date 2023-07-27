import i18n from "@libs/i18next";
import { initReactI18next } from "@libs/react-i18next";
import en from "./en";
import ua from "./ua";

export const resources = {
  en,
  ua,
} as const;

console.log(resources);


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
