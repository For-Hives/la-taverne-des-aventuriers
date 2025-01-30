import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				hostname: '**.andy-cinquin.fr',
				protocol: 'https',
			},
			{
				hostname: '**.latavernedesaventuriers.fr',
				protocol: 'https',
			},
			{
				hostname: '**.latavernedesaventuriers.com',
				protocol: 'https',
			},
		],
	},
}

export default nextConfig
