import "i18next";
import en from "./locales/en/translation.json";

type TranslationKeys = typeof en;

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: TranslationKeys;
    };
    returnNull: false;
    allowObjectInHTMLChildren: true;
  }
}
