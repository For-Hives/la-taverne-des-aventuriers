import { test as base, expect, type Page } from '@playwright/test'

/** Pages publiques couvertes : [nom de la capture, chemin, statut HTTP attendu]. */
export const PAGES: ReadonlyArray<readonly [string, string, number]> = [
	['accueil', '/', 200],
	['carte', '/carte', 200],
	['evenements', '/evenements', 200],
	['evenement-detail', '/evenements/soiree-1ans', 200],
	['evenement-a-la-une', '/evenements/programme-novembre-2026', 200],
	['bibliotheque-de-jeux', '/bibliotheque-de-jeux', 200],
	['contact', '/contact', 200],
	['reservation', '/reservation', 200],
	['qui-sommes-nous', '/qui-sommes-nous', 200],
	['battle-cocktails', '/battle/cocktails', 200],
	['battle-mocktails', '/battle/mocktails', 200],
	['mentions-legales', '/mentions-legales', 200],
	['plan-du-site', '/plan-du-site', 200],
	['og-generator', '/og-generator', 200],
	['404', '/page-inexistante', 404],
	['evenement-inconnu', '/evenements/evenement-inconnu', 404],
]

/**
 * Chaque test tourne hors ligne : tout ce qui ne vient pas du serveur local est refusé (Vimeo, Google Analytics,
 * Umami, fichier wasm de Rive sur un CDN…). Les erreurs JavaScript de la page sont relevées.
 */
export const test = base.extend<{ erreursPage: string[] }>({
	erreursPage: [
		async ({ page }, use) => {
			const erreurs: string[] = []
			page.on('pageerror', erreur => erreurs.push(String(erreur)))
			await page.context().route('**/*', route => {
				const url = new URL(route.request().url())
				return url.hostname === '127.0.0.1' ? route.continue() : route.abort('blockedbyclient')
			})
			await use(erreurs)
		},
		{ auto: true },
	],
})

export { expect }

/**
 * Zones neutralisées dans les captures, faute de pouvoir les figer :
 * - la vidéo Vimeo de l'accueil (lecteur tiers, bloqué hors ligne) ;
 * - les animations Rive (canvas : chevalier de la page 404), qui avancent avec le temps.
 * Elles restent dans la mise en page (visibility), seul leur contenu est masqué.
 */
const STYLE_CAPTURE = `
	iframe[src*="vimeo"], canvas { visibility: hidden !important; }
`

/** Fait défiler toute la page pour déclencher les apparitions au défilement, puis attend images et polices. */
export async function preparerPage(page: Page) {
	// Pas d'horloge figée côté navigateur : GSAP avance avec Date.now, le chargeur ne disparaîtrait jamais.
	// Les dates affichées dépendent du serveur, figé par DATE_FIGEE (scripts/instantane/figer-date.mjs).
	// Le chargeur finit à opacité 0 (il reste dans le DOM) : on attend cet état, échec franc sinon.
	await page.waitForFunction(
		() => [...document.querySelectorAll('.loader-wrapper')].every(e => getComputedStyle(e).opacity === '0'),
		null,
		{ polling: 100, timeout: 20_000 }
	)
	const hauteurVue = page.viewportSize()?.height ?? 900
	for (let y = 0, tours = 0; tours < 400; tours++) {
		const total = await page.evaluate(() => document.documentElement.scrollHeight)
		if (y >= total) break
		await page.evaluate(v => window.scrollTo({ behavior: 'instant', top: v }), y)
		await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))
		y += Math.round(hauteurVue * 0.7)
	}
	await page.evaluate(() => window.scrollTo({ behavior: 'instant', top: document.documentElement.scrollHeight }))
	// Rattrapage : éléments encore à opacité 0 parce que leur IntersectionObserver a été manqué.
	for (let passe = 0; passe < 4; passe++) {
		const reste = await page.evaluate(async () => {
			const caches = [
				...document.querySelectorAll<HTMLElement>('body [style*="opacity:0"], body [style*="opacity: 0"]'),
			].filter(e => e.getBoundingClientRect().height > 0 && !e.closest('.loader-wrapper'))
			for (const e of caches) {
				e.scrollIntoView({ behavior: 'instant', block: 'center' })
				await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
			}
			return caches.length
		})
		if (!reste) break
	}
	await page.evaluate(async () => {
		const images = [...document.images]
		for (const image of images) image.loading = 'eager'
		const limite = Date.now() + 30_000
		while (Date.now() < limite && images.some(i => !i.complete)) await new Promise(r => setTimeout(r, 100))
		await Promise.all(images.filter(i => i.complete && i.naturalWidth).map(i => i.decode().catch(() => {})))
		await document.fonts.ready
	})
	await page.evaluate(() => window.scrollTo({ behavior: 'instant', top: 0 }))
	await page.addStyleTag({ content: STYLE_CAPTURE })
	await page.waitForLoadState('networkidle')
	// Laisse finir les animations JS (GSAP, framer-motion) relancées par le retour en haut de page.
	await page.waitForFunction(
		() =>
			document.getAnimations().filter(
				a =>
					a.playState === 'running' &&
					// Les animations liées au défilement (frise des événements) ne finissent jamais : on les ignore.
					a.timeline === document.timeline &&
					a.effect?.getComputedTiming().iterations !== Number.POSITIVE_INFINITY
			).length === 0,
		null,
		{ polling: 200, timeout: 15_000 }
	)
}

/**
 * Pour les captures pleine page : masque les éléments fixes (barre de navigation, menu mobile, bouton de retour
 * en haut). En émulation téléphone, Chromium les dessine à une hauteur qui varie d'une capture pleine page à
 * l'autre ; ils sont vérifiés à part, dans la capture de l'écran d'ouverture.
 */
export async function masquerElementsFixes(page: Page) {
	await page.evaluate(() => {
		for (const element of document.querySelectorAll<HTMLElement>('body *')) {
			if (getComputedStyle(element).position === 'fixed') element.style.setProperty('visibility', 'hidden', 'important')
		}
	})
}
