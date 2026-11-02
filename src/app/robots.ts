import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/sitemap-pages'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			allow: '/',
			disallow: '/og-generator',
			userAgent: '*',
		},
		sitemap: `${SITE_URL}/sitemap.xml`,
	}
}
