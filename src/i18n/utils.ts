/** @format */

import type { TypesLang } from './i18n.types'
import { ui, defaultLang } from './ui'
export const useTranslation = (lang: TypesLang) => {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key]
	}
}
