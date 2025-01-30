import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				hostname: '**.andy-cinquin.fr',
				protocol: 'https',
			},
		],
	},
}

export default nextConfig
