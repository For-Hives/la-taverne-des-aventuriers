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
				'background-image':
					"url('/assets/images/elements/ContactElements/t3.png')", //fix
				FooterImage: "url('/assets/images/MaskFooter.png')", //ok
				'gl-card1-bg':
					"url('/assets/images/elements/GameLibraryElements/BG1.png')", //ok
				'gl-card2-bg':
					"url('/assets/images/elements/GameLibraryElements/BG2.png')", //ok
				'gl-card3-bg':
					"url('/assets/images/elements/GameLibraryElements/BG3.png')", //ok
				'lp-blured-image': "url('/assets/images/elements/background2.png')", //fix
				'lp-card1-bg': "url('/assets/images/Cocktails/Cocktail1.jpg')", //ok
				'lp-card2-bg': "url('/assets/images/Cocktails/Cocktail2.jpg')", //ok
				'lp-card3-bg': "url('/assets/images/Cocktails/Cocktail3.jpg')", //ok
				'menu-background-image':
					"url('/assets/images/elements/MenuElements/BGImage.png')", //fix
				'waw-card1-bg':
					"url('/assets/images/elements/WhoAreWeElement/planche1.png')", //ok
				'waw-card2-bg':
					"url('/assets/images/elements/WhoAreWeElement/Barman.png')", //ok
			},
			colors: {
				background: 'var(--background)',

				customBrown: {
					100: '#582615',
					200: 'rgba(88,38,21,0.32)',
				},
				customRed: {
					100: '#8D2026',
				},
				customWhite: {
					100: '#FFFCEE',
					200: '#f2edd3',
					300: '#fdfbf6',
					400: '#ead4bf',
					500: '#F2EFE2',
				},
				foreground: 'var(--foreground)',
			},
			fontFamily: {
				cardinal: ['"Cardinal"', 'sans-serif'],
				obraletra: ['var(--kc-obra-letra)'],
				obraletraBold: ['var(--kc-obra-letra-bold)'],
			},
		},
	},
} satisfies Config

// 'bg-first-image': "url('/assets/images/elements/background2.png')",
// 	FooterImage: "url('/assets/images/MaskFooter.png')",
// 	'gl-card1-bg':
// "url('/assets/images/elements/GameLibraryElements/BG1.png')",
// 	'gl-card2-bg':
// "url('/assets/images/elements/GameLibraryElements/BG2.png')",
// 	'gl-card3-bg':
// "url('/assets/images/elements/GameLibraryElements/BG3.png')",
// 	'lp-card1-bg': "url('/assets/images/Cocktails/Cocktail1.jpg')",
// 	'lp-card2-bg': "url('/assets/images/Cocktails/Cocktail2.jpg')",
// 	'lp-card3-bg': "url('/assets/images/Cocktails/Cocktail3.jpg')",
// 	menuBGImage: "url('/assets/images/elements/MenuElements/BGImage.png')",
// 	'waw-card1-bg':
// "url('/assets/images/elements/WhoAreWeElement/planche1.png')",
// 	'waw-card2-bg':
// "url('/assets/images/elements/WhoAreWeElement/Barman.png')",
// 	whoareweimage: "url('/assets/images/elements/ContactElements/t3.png')",
