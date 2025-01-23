import type { Config } from 'tailwindcss'

export default {
	content: [
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
				FooterImage: "url('/assets/images/MaskFooter.png')",
				'gl-card1-bg':
					"url('/assets/images/elements/GameLibraryElements/BG1.png')",
				'gl-card2-bg':
					"url('/assets/images/elements/GameLibraryElements/BG2.png')",
				'gl-card3-bg':
					"url('/assets/images/elements/GameLibraryElements/BG3.png')",
				'lp-card1-bg': "url('/assets/images/Cocktails/Cocktail1.jpg')",
				'lp-card2-bg': "url('/assets/images/Cocktails/Cocktail2.jpg')",
				'lp-card3-bg': "url('/assets/images/Cocktails/Cocktail3.jpg')",
				menuBGImage: "url('/assets/images/elements/MenuElements/BGImage.png')",
				'waw-card1-bg':
					"url('/assets/images/elements/WhoAreWeElement/planche1.png')",
				'waw-card2-bg':
					"url('/assets/images/elements/WhoAreWeElement/Barman.png')",
				whoareweimage: "url('/assets/images/elements/ContactElements/t3.png')",
			},
			colors: {
				background: 'var(--background)',
				cardBG: {
					100: '#F2EFE2',
				},
				foreground: 'var(--foreground)',
				title: {
					100: '#8D2026',
					200: '#582615',
					300: '#FFFCEE',
					400: '#f2edd3',
					500: 'rgba(88,38,21,0.32)',
					600: '#fdfbf6',
					700: '#ead4bf',
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
