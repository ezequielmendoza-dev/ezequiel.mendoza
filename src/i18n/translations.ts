/** @format */
export const languages = {
	es: 'Español',
	en: 'English',
}
import { projects as projects_es } from './es/projects'
import { ui as ui_es } from './es/ui'
import { projects as projects_en } from './en/projects'
import { ui as ui_en } from './en/ui'
export const translations = {
	es: {
		...projects_es,
		...ui_es,
	},
	en: {
		...projects_en,
		...ui_en,
	},
}
