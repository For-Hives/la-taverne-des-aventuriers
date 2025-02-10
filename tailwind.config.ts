import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require('@tailwindcss/typography')],
	safelist: [
		'mask-custom',
		'absolute',
		'left-1/2',
		'top-1/2',
		'-translate-x-1/2',
		'-translate-y-1/2',
		'min-w-screen',
		'min-h-screen',
		'w-auto',
		'h-auto',
		'object-cover',
		'mix-difference',
		'opacity-75',
	],
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

				customBlue: {
					100: '#0077FF',
				},
				customBrown: {
					100: '#582615',
				},
				customBrownTransparent: {
					100: 'rgba(88,38,21,0.32)',
				},
				customGray: {
					100: '#6A6A6A',
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
				cardoRegular: ['var(--cardo-regular)'],
				obraletra: ['var(--kc-obra-letra)'],
				obraletraBold: ['var(--kc-obra-letra-bold)'],
			},
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			typography: ({ theme }) => ({
				customBrown: {
					css: {
						'--tw-prose-body': '#582615', // Base brown
						'--tw-prose-bold': '#3d1a0e', // Darker brown
						'--tw-prose-bullets': '#d4a795', // Light brown
						'--tw-prose-captions': '#6b2e19', // Medium brown
						'--tw-prose-code': '#3d1a0e', // Darker brown
						'--tw-prose-counters': '#8b3d21', // Medium-dark brown
						'--tw-prose-headings': '#3d1a0e', // Darker brown
						'--tw-prose-hr': '#e8c5b8', // Very light brown
						'--tw-prose-invert-body': '#d4a795', // Light brown
						'--tw-prose-invert-bold': '#ffffff', // White
						'--tw-prose-invert-bullets': '#8b3d21', // Medium-dark brown
						'--tw-prose-invert-captions': '#d4a795', // Light brown
						'--tw-prose-invert-code': '#ffffff', // White
						'--tw-prose-invert-counters': '#d4a795', // Light brown
						'--tw-prose-invert-headings': '#ffffff', // White
						'--tw-prose-invert-hr': '#6b2e19', // Medium brown
						'--tw-prose-invert-lead': '#e8c5b8', // Very light brown
						'--tw-prose-invert-links': '#ffffff', // White
						'--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)', // Semi-transparent black
						'--tw-prose-invert-pre-code': '#e8c5b8', // Very light brown
						'--tw-prose-invert-quote-borders': '#6b2e19', // Medium brown
						'--tw-prose-invert-quotes': '#f4e6e1', // Lightest brown
						'--tw-prose-invert-td-borders': '#6b2e19', // Medium brown
						'--tw-prose-invert-th-borders': '#8b3d21', // Medium-dark brown
						'--tw-prose-lead': '#6b2e19', // Medium brown
						'--tw-prose-links': '#3d1a0e', // Darker brown
						'--tw-prose-pre-bg': '#3d1a0e', // Darker brown
						'--tw-prose-pre-code': '#f4e6e1', // Lightest brown
						'--tw-prose-quote-borders': '#e8c5b8', // Very light brown
						'--tw-prose-quotes': '#3d1a0e', // Darker brown
						'--tw-prose-td-borders': '#f4e6e1', // Lightest brown
						'--tw-prose-th-borders': '#e8c5b8', // Very light brown
					},
				},
			}),
		},
	},
} satisfies Config
