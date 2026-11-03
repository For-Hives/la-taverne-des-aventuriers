// Parcours dans un vrai navigateur, sur les données figées : chaque page répond, la navigation principale
// (bureau et téléphone) et le pied de page mènent aux bonnes pages, les données arrivent jusqu'à l'écran.
// Le site n'a aucun formulaire : le contact passe par un lien mailto, la réservation par des liens.
import { expect, PAGES, test } from './outils'

const MENU = [
	['Qui Sommes-nous', '/qui-sommes-nous'],
	['Carte', '/carte'],
	['Ludothèque', '/bibliotheque-de-jeux'],
	['Évènements', '/evenements'],
	['Réservation', '/reservation'],
	['Contact', '/contact'],
] as const

for (const [nom, chemin, statut] of PAGES) {
	test(`la page ${nom} répond ${statut} sans erreur JavaScript`, async ({ erreursPage, page }) => {
		const reponse = await page.goto(chemin)
		expect(reponse?.status()).toBe(statut)
		await expect(page.locator('body')).not.toBeEmpty()
		expect(erreursPage).toEqual([])
	})
}

test('menu principal : chaque entrée ouvre sa page', async ({ page }) => {
	const telephone = test.info().project.name === 'telephone'
	for (const [libelle, chemin] of MENU) {
		await page.goto('/mentions-legales')
		if (telephone) {
			await page.getByRole('button', { name: 'Toggle navigation menu' }).click()
		}
		const lien = page.getByRole('link', { exact: true, name: libelle }).filter({ visible: true }).first()
		await lien.click()
		await expect(page).toHaveURL(chemin)
		await expect(page.locator('h1').first()).toBeVisible()
	}
})

test('pied de page : liens internes et réseaux sociaux', async ({ page }) => {
	await page.goto('/')
	const pied = page.locator('.bg-FooterImage')
	for (const [libelle, chemin] of [
		['Carte', '/carte'],
		['Qui sommes-nous ?', '/qui-sommes-nous'],
		['Evènements', '/evenements'],
		['Ludothèque', '/bibliotheque-de-jeux'],
		['Contact', '/contact'],
		['Mentions légales', '/mentions-legales'],
		['Plan du site', '/plan-du-site'],
	] as const) {
		// Nom accessible = aria-label venu du CMS : on cible le texte affiché.
		await expect(pied.locator('a').filter({ hasText: new RegExp(`^${libelle.replace('?', '\\?')}$`) })).toHaveAttribute(
			'href',
			chemin
		)
	}
	await expect(pied.getByRole('link', { name: 'allez sur notre instagram' })).toHaveAttribute('href', /instagram\.com/)
	await expect(pied.getByRole('link', { name: 'allez sur notre facebook' })).toHaveAttribute('href', /facebook\.com/)
	await pied.locator('a[href="/plan-du-site"]').click()
	await expect(page).toHaveURL('/plan-du-site')
})

test('contact : adresse e-mail en lien mailto', async ({ page }) => {
	await page.goto('/contact')
	await expect(page.locator('a[href="mailto:contact@latavernedesaventuriers.fr"]').first()).toBeAttached()
})

test('carte : les bières et les vins arrivent par action serveur', async ({ page }) => {
	await page.goto('/carte')
	await expect(page.getByRole('heading', { name: 'Bières et Vins' })).toBeVisible()
	// La liste se remplit côté client après le chargement, depuis l'instantané (première bière enregistrée).
	await expect(page.locator('#beer-wine').getByText('La Moustache (Brasserie du Bouffay) 4.5%')).toBeVisible()
})

test('battles : on passe des cocktails aux mocktails et retour', async ({ page }) => {
	await page.goto('/battle/cocktails')
	await page.getByRole('link', { name: 'Battle de mocktails' }).click()
	await expect(page).toHaveURL('/battle/mocktails')
	await page.getByRole('link', { name: 'Battle de cocktails' }).click()
	await expect(page).toHaveURL('/battle/cocktails')
})

test("événements : la page liste ouvre le détail d'un événement", async ({ page }) => {
	await page.goto('/evenements')
	await page.locator('a[href="/evenements/soiree-1ans"]').filter({ visible: true }).first().click()
	await expect(page).toHaveURL('/evenements/soiree-1ans')
	await expect(page.locator('h1').first()).toContainText('1 Ans')
})
