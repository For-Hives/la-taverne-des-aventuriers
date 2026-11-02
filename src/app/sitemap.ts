import type { MetadataRoute } from 'next'

import { authWithPocketBase } from '@/app/actions/AuthService'
import { buildSitemap, fetchEventEntries } from '@/lib/sitemap-pages'

// Régénéré au plus toutes les heures : un nouvel événement apparaît sans redéploiement,
// et un PocketBase absent au moment du build ne fige pas un sitemap sans événements.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const pb = await authWithPocketBase().catch(() => null)
	return buildSitemap(await fetchEventEntries(pb))
}
