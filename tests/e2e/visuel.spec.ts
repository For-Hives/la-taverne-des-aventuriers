// Non-régression visuelle au pixel près : chaque page publique, en bureau et en téléphone, sur les données
// figées de tests/instantane. Références dans tests/e2e/captures/, produites dans l'image Docker de Playwright
// (pnpm test:visuel:maj). Un seul pixel d'écart fait échouer le test.
import { expect, masquerElementsFixes, PAGES, preparerPage, test } from './outils'

// Au-delà de cette hauteur, capture par tranches : d'un seul tenant, Chromium laisse des tuiles vides
// sur les très longues pages (/evenements dépasse 60 000 px avec ses 100 événements).
const SEUIL_TRANCHES = 8000
const TRANCHE = 4000

for (const [nom, chemin, statut] of PAGES) {
	test(`visuel ${nom}`, async ({ erreursPage, page }) => {
		const reponse = await page.goto(chemin, { waitUntil: 'load' })
		expect(reponse?.status()).toBe(statut)
		await preparerPage(page)
		// Flou d'arrière-plan (backdrop-filter : badges des battles, dock de la carte, cartes d'événements) : son
		// rendu varie de quelques pixels d'une exécution à l'autre dans Chromium. Ces zones sont masquées (aplat).
		await page.evaluate(() => {
			for (const element of document.querySelectorAll<HTMLElement>('body *')) {
				const flou = getComputedStyle(element).backdropFilter
				if (flou && flou !== 'none') element.dataset.captureFlou = ''
			}
		})
		const mask = [page.locator('[data-capture-flou]')]
		if (test.info().project.name === 'telephone') {
			// Téléphone : la barre de navigation fixe est dessinée à une hauteur variable dans une capture pleine
			// page. On la vérifie dans l'écran d'ouverture, puis on masque les éléments fixes pour la page entière.
			// (En bureau, la capture pleine page la place toujours en haut : une seule capture suffit.)
			await expect(page).toHaveScreenshot(`${nom}-ecran.png`, { mask })
			await masquerElementsFixes(page)
		}
		const { hauteur, largeur } = await page.evaluate(() => ({
			hauteur: document.documentElement.scrollHeight,
			largeur: document.documentElement.clientWidth,
		}))
		if (hauteur <= SEUIL_TRANCHES) {
			await expect(page).toHaveScreenshot(`${nom}.png`, { fullPage: true, mask })
		} else {
			for (let y = 0, n = 1; y < hauteur; y += TRANCHE, n++) {
				const clip = { height: Math.min(TRANCHE, hauteur - y), width: largeur, x: 0, y }
				await expect(page).toHaveScreenshot(`${nom}-${String(n).padStart(2, '0')}.png`, { clip, fullPage: true, mask })
			}
		}
		expect(erreursPage).toEqual([])
	})
}
