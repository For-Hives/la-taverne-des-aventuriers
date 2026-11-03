// Intégration SEO, par requêtes HTTP sur le serveur Next (données figées) : titres, canonical, robots,
// données structurées, robots.txt et sitemap.xml. Fige le comportement actuel du site.
import { expect, test } from './outils'

const SITE = 'https://latavernedesaventuriers.fr'
const INDEXABLE = 'index, follow'
const INDEXABLE_IMAGES = 'index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1'
const INDEXABLE_SANS_CACHE = 'index, follow, nocache'

// [chemin, titre, canonical, robots, nombre de blocs JSON-LD]
const ATTENDU = [
	['/', 'Bar à Jeux Médiéval à Nantes | La Taverne des Aventuriers', SITE, INDEXABLE, 1],
	['/carte', 'Carte & Boissons | La Taverne des Aventuriers', `${SITE}/carte`, INDEXABLE_IMAGES, 2],
	['/evenements', 'Événements | La Taverne des Aventuriers', `${SITE}/evenements`, INDEXABLE_SANS_CACHE, 2],
	[
		'/evenements/soiree-1ans',
		'1 Ans de la Taverne des... | La Taverne des Aventuriers',
		`${SITE}/evenements/soiree-1ans`,
		INDEXABLE_IMAGES,
		2,
	],
	[
		'/bibliotheque-de-jeux',
		'Ludothèque | La Taverne des Aventuriers',
		`${SITE}/bibliotheque-de-jeux`,
		INDEXABLE_SANS_CACHE,
		2,
	],
	['/contact', 'Contact | La Taverne des Aventuriers', `${SITE}/contact`, INDEXABLE_SANS_CACHE, 2],
	['/reservation', 'Réservation | La Taverne des Aventuriers', `${SITE}/reservation`, INDEXABLE_IMAGES, 2],
	['/qui-sommes-nous', 'Qui Sommes-Nous | La Taverne des Aventuriers', `${SITE}/qui-sommes-nous`, INDEXABLE_IMAGES, 2],
	[
		'/battle/cocktails',
		'Battle des Cocktails | La Taverne des Aventuriers',
		`${SITE}/battle/cocktails`,
		INDEXABLE_SANS_CACHE,
		2,
	],
	[
		'/battle/mocktails',
		'Battle des Mocktails | La Taverne des Aventuriers',
		`${SITE}/battle/mocktails`,
		INDEXABLE_SANS_CACHE,
		2,
	],
	[
		'/mentions-legales',
		'Mentions Légales | La Taverne des Aventuriers',
		`${SITE}/mentions-legales`,
		INDEXABLE_SANS_CACHE,
		2,
	],
	['/plan-du-site', 'Plan du site | La Taverne des Aventuriers', `${SITE}/plan-du-site`, INDEXABLE, 1],
	['/og-generator', 'Bar à Jeux Médiéval à Nantes | La Taverne des Aventuriers', SITE, 'noindex, nofollow, nocache', 1],
] as const

// Le SEO ne dépend pas de la taille d'écran : un seul projet suffit.
test.beforeEach(() => test.skip(test.info().project.name === 'telephone', 'contrôle HTTP, identique en téléphone'))

for (const [chemin, titre, canonical, robots, blocsJsonLd] of ATTENDU) {
	test(`métadonnées de ${chemin}`, async ({ page }) => {
		const reponse = await page.goto(chemin)
		expect(reponse?.status()).toBe(200)
		await expect(page).toHaveTitle(titre)
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical)
		await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', robots)
		await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S/)
		const blocs = await page.locator('script[type="application/ld+json"]').allTextContents()
		expect(blocs).toHaveLength(blocsJsonLd)
		for (const bloc of blocs) expect(() => JSON.parse(bloc)).not.toThrow()
	})
}

test('une page inconnue est une vraie 404, non indexable', async ({ page }) => {
	const reponse = await page.goto('/evenements/evenement-inconnu')
	expect(reponse?.status()).toBe(404)
	// Constat : la 404 porte deux balises robots, « noindex » et « index, follow » héritée de la mise en page.
	// Google retient la plus restrictive ; on vérifie que « noindex » est bien présente.
	await expect(page.locator('meta[name="robots"][content="noindex"]')).toHaveCount(1)
})

test('robots.txt', async ({ request }) => {
	const reponse = await request.get('/robots.txt')
	expect(reponse.status()).toBe(200)
	expect(await reponse.text()).toBe(
		`User-Agent: *\nAllow: /\nDisallow: /og-generator\n\nSitemap: ${SITE}/sitemap.xml\n`
	)
})

test("sitemap.xml : les 11 pages fixes et les 11 événements de l'instantané", async ({ request }) => {
	const reponse = await request.get('/sitemap.xml')
	expect(reponse.status()).toBe(200)
	const adresses = [...(await reponse.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
	expect(adresses).toHaveLength(22)
	expect(new Set(adresses).size).toBe(22)
	expect(adresses).toContain(`${SITE}/plan-du-site`)
	expect(adresses).toContain(`${SITE}/evenements/soiree-1ans`)
	expect(adresses.every(a => a.startsWith(SITE))).toBe(true)
})
