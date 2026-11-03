import type { NextConfig } from 'next'

// Tests visuels uniquement (PB_INSTANTANE défini) : les images viennent du faux PocketBase local
// (scripts/fake-pocketbase.mjs). Sans cette variable, la configuration est celle de la production.
const fauxPocketBase = process.env.PB_INSTANTANE
	? {
			dangerouslyAllowLocalIP: true,
			fauxHote: [{ hostname: '127.0.0.1', port: process.env.FAKE_PB_PORT ?? '18090', protocol: 'http' as const }],
		}
	: { dangerouslyAllowLocalIP: undefined, fauxHote: [] }

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		...(fauxPocketBase.dangerouslyAllowLocalIP ? { dangerouslyAllowLocalIP: true } : {}),
		remotePatterns: [
			...fauxPocketBase.fauxHote,
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
