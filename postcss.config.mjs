/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: {
		'@tailwindcss/postcss': {
			plugins: ['@tailwindcss/typography'],
		},
	},
}

export default config
