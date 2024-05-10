/** @format */

import type { TypesLang, TypesProjects, TypesUI } from './i18n.types'
import { translations } from './translations'
const defaultLang = 'es'
export const useTranslation = (lang: TypesLang) => {
	return function t(key: keyof TypesUI | keyof TypesProjects, params?: Record<string, string>) {
		let translation = translations[lang][key] || translations[defaultLang][key]
		// || translations[defaultLang][section]
		//  if (params) {
		//     Object.keys(params).forEach(paramKey => {
		//         const paramValue = params[paramKey];
		//         translation = translation.replace(`{{${paramKey}}}`, paramValue);
		//     });
		// }
		return translation
	}
}
