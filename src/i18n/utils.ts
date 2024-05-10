/** @format */

import type { TypesLang } from './i18n.types'
import { ui, defaultLang } from './ui'
export const useTranslation = (lang: TypesLang) => {
	return function t(key: keyof (typeof ui)[typeof defaultLang], params?: Record<string, string>) {
		let translation = ui[lang][key] || ui[defaultLang][key]
		if (params) {
			Object.keys(params).forEach((paramKey) => {
				const paramValue = params[paramKey]
				translation = translation.replace(`{{${paramKey}}}`, paramValue)
			})
		}
		return translation
	}
}
