/** @format */

import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
const SERVER_PORT = 4321
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`
const PRODUCTION_HOST_URL = 'https://checomendoza.github.io'
let SITE_URL = LOCALHOST_URL
let BASE_URL = ''

const SCRIPT = process.env.npm_lifecycle_script || ''
const isBuild = SCRIPT.includes('astro build')
if (isBuild) {
	SITE_URL = PRODUCTION_HOST_URL
	BASE_URL = '/ezequiel.mendoza'
}
// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	base: BASE_URL,
	integrations: [tailwind()],
	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
})
