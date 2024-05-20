/** @format */

import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
const SERVER_PORT = 4321
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`
const PRODUCTION_URL = 'https://checomendoza.github.io/ezequiel.mendoza'
let BASE_URL = LOCALHOST_URL
const SCRIPT = process.env.npm_lifecycle_script || ''
const isBuild = SCRIPT.includes('astro build')
if (isBuild) {
	BASE_URL = PRODUCTION_URL
}
// https://astro.build/config
export default defineConfig({
	site: BASE_URL,
	// base: '/ezequiel.mendoza',
	integrations: [tailwind()],
	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
})
