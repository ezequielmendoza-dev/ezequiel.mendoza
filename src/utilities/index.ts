/** @format */

// TECH: React | ReactNative | Next.js | StyledComponents | MUI | Tailwind | Javasript | Typscript | NativeBase

export const getColorsByTech = (val: string) => {
	switch (val) {
		case 'React':
			return 'bg-indigo-500 text-indigo-200'
		case 'React Native':
			return 'bg-blue-700 text-blue-300'
		case 'Next.js':
			return 'bg-gray-900 text-gray-300'

		default:
			return 'bg-gray-200 text-gray-700'
	}
}
