/** @format */
export const languages = {
	es: 'Español',
	en: 'English',
}
import { ui as ui_es } from './es/ui'
import { ui as ui_en } from './en/ui'
export const translations = {
	es: {
		...ui_es,
	},
	en: {
		...ui_en,
	},
}
