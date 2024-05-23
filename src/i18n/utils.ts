/** @format */

import type { TypesLang, TypesUI } from "./i18n.types";
import { translations } from "./translations";
const defaultLang = "es";
export const useTranslation = (lang: TypesLang) => {
  return function t(key: keyof TypesUI, params?: Record<string, string>) {
    let translation = translations[lang][key] || translations[defaultLang][key];

    return translation;
  };
};
