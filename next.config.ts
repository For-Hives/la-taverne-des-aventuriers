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
	allowedDevOrigins: ['192.168.1.128', 'localhost', '127.0.0.1'],
}

module.exports = nextConfig
