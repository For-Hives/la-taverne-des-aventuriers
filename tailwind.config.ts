import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: ['class'],
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
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
					"url('/assets/images/elements/ContactElements/t3.png')",
				FooterImage: "url('/assets/images/MaskFooter.png')",
				'gl-card1-bg':
					"url('/assets/images/elements/GameLibraryElements/BG1.png')",
				'gl-card2-bg':
					"url('/assets/images/elements/GameLibraryElements/BG2.png')",
				'gl-card3-bg':
					"url('/assets/images/elements/GameLibraryElements/BG3.png')",
				'lp-blured-image': "url('/assets/images/elements/background2.png')",
				'lp-card1-bg': "url('/assets/images/Cocktails/Cocktail1.jpg')",
				'lp-card2-bg': "url('/assets/images/Cocktails/Cocktail2.jpg')",
				'lp-card3-bg': "url('/assets/images/Cocktails/Cocktail3.jpg')",
				'menu-background-image':
					"url('/assets/images/elements/MenuElements/BGImage.png')",
				'waw-card1-bg':
					"url('/assets/images/elements/WhoAreWeElement/planche1.png')",
				'waw-card2-bg':
					"url('/assets/images/elements/WhoAreWeElement/Barman.png')",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				background: 'hsl(var(--background))',
				border: 'hsl(var(--border))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))',
				},
				customBlue: {
					'100': '#0077FF',
				},
				customBrown: {
					'100': '#582615',
				},
				customBrownTransparent: {
					'100': 'rgba(88,38,21,0.32)',
				},
				customGray: {
					'100': '#6A6A6A',
				},
				customRed: {
					'100': '#8D2026',
				},
				customWhite: {
					'100': '#FFFCEE',
					'200': '#f2edd3',
					'300': '#fdfbf6',
					'400': '#ead4bf',
					'500': '#F2EFE2',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				foreground: 'hsl(var(--foreground))',
				input: 'hsl(var(--input))',
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				ring: 'hsl(var(--ring))',
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
			},
			fontFamily: {
				cardinal: ['Cardinal"', 'sans-serif'],
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
