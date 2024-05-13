/** @format */

// TECH: React | ReactNative | Next.js | StyledComponents | MUI | Tailwind | Javasript | Typscript | NativeBase
import { wordsToHighLight } from '../constants'
export const getColorsByTech = (val: string) => {
	switch (val.toLowerCase()) {
		case 'react':
			return 'bg-cyan-600 text-cyan-100'
		case 'react native':
			return 'bg-cyan-700 text-cyan-100'
		case 'next.js':
			return 'bg-gray-900 text-gray-200'
		case 'tailwind':
			return 'bg-green-900 text-green-200'
		case 'mui':
			return 'bg-blue-900 text-blue-200'
		case 'styled components':
			return 'bg-orange-300 text-orange-800'
		case 'native base':
			return 'bg-purple-900 text-purple-200'
		case 'javascript':
			return 'bg-yellow-600 text-yellow-100'
		case 'typescript':
			return 'bg-blue-700 text-blue-100'
		default:
			return 'bg-gray-200 text-gray-700'
	}
}

export const highlightWord = (text: string) => {
	const escapedWords = wordsToHighLight.map((wordObj) => wordObj.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
	const regex = new RegExp(`(${escapedWords.join('|')})`, 'gi')
	const parts = text.split(regex)
	return parts.map((part, index) => {
		if (index % 2 !== 0) {
			const matchedWordObj = wordsToHighLight.find((item) => new RegExp(item.word, 'i').test(part))
			return `<span class="${matchedWordObj?.className}">${part}</span>`
		}
		return part
	})
}
