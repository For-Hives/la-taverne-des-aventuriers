// Liste des pages publiques du site, partagée par /sitemap.xml et la page /plan-du-site.
// Ce module ne dépend ni de Next ni de PocketBase à l'exécution (imports de types seulement) :
// les tests unitaires l'importent directement avec Node (scripts/tests/sitemap.test.mjs).
import type { MetadataRoute } from 'next'

export const SITE_URL = 'https://latavernedesaventuriers.fr'

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>

export interface PublicPage {
	path: string
	label: string
	changeFrequency: ChangeFrequency
	priority: number
}

/** Pages fixes, dans l'ordre d'affichage du plan du site. /og-generator n'y figure pas : c'est un outil interne. */
export const PUBLIC_PAGES: PublicPage[] = [
	{ changeFrequency: 'weekly', label: 'Accueil', path: '/', priority: 1 },
	{ changeFrequency: 'weekly', label: 'La carte', path: '/carte', priority: 0.9 },
	{ changeFrequency: 'daily', label: 'Événements', path: '/evenements', priority: 0.9 },
	{ changeFrequency: 'monthly', label: 'Bibliothèque de jeux', path: '/bibliotheque-de-jeux', priority: 0.8 },
	{ changeFrequency: 'monthly', label: 'Réservation', path: '/reservation', priority: 0.8 },
	{ changeFrequency: 'monthly', label: 'Contact', path: '/contact', priority: 0.7 },
	{ changeFrequency: 'monthly', label: 'Qui sommes-nous ?', path: '/qui-sommes-nous', priority: 0.6 },
	{ changeFrequency: 'weekly', label: 'Battle des cocktails', path: '/battle/cocktails', priority: 0.6 },
	{ changeFrequency: 'weekly', label: 'Battle des mocktails', path: '/battle/mocktails', priority: 0.6 },
	{ changeFrequency: 'yearly', label: 'Mentions légales', path: '/mentions-legales', priority: 0.2 },
	{ changeFrequency: 'yearly', label: 'Plan du site', path: '/plan-du-site', priority: 0.2 },
]

export interface EventEntry {
	slug: string
	title: string
	lastModified?: Date
}

/** Ce qu'il faut d'un client PocketBase pour lister les événements (le vrai client ou un faux, en test). */
export interface EventsSource {
	collection(name: string): {
		getList(
			page: number,
			perPage: number,
			options?: Record<string, unknown>
		): Promise<{ items: Record<string, unknown>[]; totalPages: number }>
	}
}

// Même règle que getEventData : un slug avec d'autres caractères ne mène à aucune page.
const VALID_SLUG = /^[a-zA-Z0-9_-]+$/
const PER_PAGE = 200
const MAX_PAGES = 10

/** URL absolue d'un chemin, au format des balises canonical du site (accueil sans barre finale). */
export function absoluteUrl(path: string): string {
	return path === '/' ? SITE_URL : `${SITE_URL}${path}`
}

/** PocketBase renvoie « 2026-01-01 00:00:00.000Z » : on le convertit en date, ou rien si illisible. */
function parsePocketBaseDate(value: unknown): Date | undefined {
	if (typeof value !== 'string' || value === '') return undefined
	const date = new Date(value.replace(' ', 'T'))
	return Number.isNaN(date.getTime()) ? undefined : date
}

async function readAllEvents(pb: EventsSource): Promise<EventEntry[]> {
	const entries: EventEntry[] = []
	const seen = new Set<string>()
	for (let page = 1; page <= MAX_PAGES; page++) {
		const result = await pb.collection('Events').getList(page, PER_PAGE, {
			fields: 'event_slug,event_title,updated',
			sort: '-event_date',
		})
		for (const item of result.items) {
			const slug = item.event_slug
			if (typeof slug !== 'string' || !VALID_SLUG.test(slug) || seen.has(slug)) continue
			seen.add(slug)
			entries.push({
				lastModified: parsePocketBaseDate(item.updated),
				slug,
				title: typeof item.event_title === 'string' && item.event_title.trim() ? item.event_title.trim() : slug,
			})
		}
		if (!(page < result.totalPages)) break
	}
	return entries
}

/**
 * Lit les événements publiés. Ne lève jamais : sans PocketBase (pas de jeton, erreur, ou pas de
 * réponse avant `timeoutMs`), renvoie une liste vide pour que le sitemap garde au moins les pages fixes.
 */
export async function fetchEventEntries(
	pb: EventsSource | null,
	{ timeoutMs = 5000 }: { timeoutMs?: number } = {}
): Promise<EventEntry[]> {
	if (!pb) return []
	let timer: ReturnType<typeof setTimeout> | undefined
	const timeout = new Promise<never>((_, reject) => {
		timer = setTimeout(() => reject(new Error(`PocketBase n'a pas répondu en ${timeoutMs} ms`)), timeoutMs)
	})
	try {
		return await Promise.race([readAllEvents(pb), timeout])
	} catch (error) {
		console.warn('[sitemap] Événements indisponibles, pages fixes seulement :', error)
		return []
	} finally {
		clearTimeout(timer)
	}
}

/** Entrées de /sitemap.xml : les pages fixes puis une entrée par événement. */
export function buildSitemap(events: EventEntry[]): MetadataRoute.Sitemap {
	return [
		...PUBLIC_PAGES.map(page => ({
			changeFrequency: page.changeFrequency,
			priority: page.priority,
			url: absoluteUrl(page.path),
		})),
		...events.map(event => ({
			changeFrequency: 'monthly' as const,
			...(event.lastModified ? { lastModified: event.lastModified } : {}),
			priority: 0.5,
			url: absoluteUrl(`/evenements/${event.slug}`),
		})),
	]
}
