import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/who_are_we/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	plugins: [],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
			backgroundImage: {
				'lp-card1-bg': "url('/assets/images/vinbiere.png')",
				'lp-card2-bg': "url('/assets/images/vinbiere.png')",
				'lp-card3-bg': "url('/assets/images/vinbiere.png')",
				// 'lp-hero-bg': "url('/assets/videos/AnimationCarte.mp4')",
			}
		},
	},
} satisfies Config
