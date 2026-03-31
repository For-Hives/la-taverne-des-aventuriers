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
	allowedDevOrigins: ['http://localhost:3000', 'http://192.168.1.128'],
}

export default nextConfig
