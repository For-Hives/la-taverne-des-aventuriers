import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/who_are_we/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	plugins: [],
	theme: {
		borderWidth: {
			'0': '0',
			'2': '2px',
			'3': '3px',
			'4': '4px',
			'6': '6px',
			'8': '8px',
			DEFAULT: '1px',
		},
		extend: {
			backgroundImage: {
				'lp-card1-bg': "url('/assets/images/Cocktails/Cocktail1.jpg')",
				'lp-card2-bg': "url('/assets/images/Cocktails/Cocktail2.jpg')",
				'lp-card3-bg': "url('/assets/images/Cocktails/Cocktail3.jpg')",
				// 'lp-hero-bg': "url('/assets/videos/AnimationCarte.mp4')",
			},

			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				title: {
					100: '#8D2026',
					200: '#582615',
					300: '#FFFCEE',
				},
			},
			fontFamily: {
				cardinal: ['"Cardinal"', 'sans-serif'],
				obraletra: ['var(--kc-obra-letra)'],
				obraletraBold: ['var(--kc-obra-letra-bold)'],
			},
		},
	},
} satisfies Config
