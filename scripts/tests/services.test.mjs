// Tests d'intégration des services de données (src/app/actions/services) contre le faux PocketBase servant
// l'instantané : transformation des enregistrements (URL des images), tri, 404 et pannes de PocketBase.
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { after, before, describe, test } from 'node:test'

const PORT = 18292
const PB = `http://127.0.0.1:${PORT}`
process.env.PB_SERVER_URL = PB
process.env.PB_USER_TOKEN = 'jeton-factice'

const { getNavBarData } = await import('../../src/app/actions/services/getNavData.service.ts')
const { getEventListData } = await import('../../src/app/actions/services/getEventListData.ts')
const { getEventData } = await import('../../src/app/actions/services/getEventData.ts')
const { getLandingData } = await import('../../src/app/actions/services/getLandingPageData.service.ts')
const { getCocktailBattleData } = await import('../../src/app/actions/services/getCocktailBattlePageData.service.ts')
const { getDrinkList } = await import('../../src/app/actions/services/DrinksData/getDrinkList.service.ts')
const { getWineData } = await import('../../src/app/actions/services/DrinksData/getWineData.service.ts')
const { getFooterData } = await import('../../src/app/actions/services/getFooterData.service.ts')

let serveur
before(async () => {
	serveur = spawn(process.execPath, ['scripts/fake-pocketbase.mjs'], {
		env: { ...process.env, FAKE_PB_PORT: String(PORT), PB_INSTANTANE: 'tests/instantane/pocketbase.json' },
		stdio: 'ignore',
	})
	for (let essai = 0; essai < 50; essai++) {
		try {
			await fetch(`${PB}/api/collections/NavBar/records`)
			return
		} catch {
			await new Promise(r => setTimeout(r, 100))
		}
	}
	throw new Error('faux PocketBase muet')
})
after(() => serveur.kill())

const urlFichier = /^http:\/\/127\.0\.0\.1:18292\/api\/files\/[^/]+\/[^/]+\/[^/]+$/

describe('services PocketBase', () => {
	test('barre de navigation : 6 entrées dans l’ordre', async () => {
		const nav = await getNavBarData()
		assert.deepEqual(
			nav.map(n => n.url),
			['/qui-sommes-nous', '/carte', '/bibliotheque-de-jeux', '/evenements', '/reservation', '/contact']
		)
	})

	test('liste des événements : triée du plus récent au plus ancien, images en URL complète', async () => {
		const evenements = await getEventListData()
		assert.equal(evenements.length, 11)
		const dates = evenements.map(e => e.event_date)
		assert.deepEqual(dates, [...dates].sort().reverse())
		for (const e of evenements) if (e.event_image) assert.match(e.event_image, urlFichier)
	})

	test('détail d’un événement par son slug', async () => {
		const e = await getEventData('soiree-1ans')
		assert.equal(e?.event_slug, 'soiree-1ans')
		assert.match(e?.event_image ?? '', urlFichier)
	})

	test('slug inconnu : null (la page affiche la 404 du site)', async () => {
		assert.equal(await getEventData('evenement-inconnu'), null)
	})

	test('slug piégé : nettoyé avant d’entrer dans le filtre PocketBase', async () => {
		assert.equal(await getEventData('soiree-1ans" || event_slug != "'), null)
	})

	test('panne de PocketBase (500) : l’erreur remonte, jamais confondue avec une 404', async () => {
		await assert.rejects(getEventData('erreur-serveur-simulee'))
	})

	test('accueil : image de présentation en URL complète', async () => {
		const accueil = await getLandingData()
		assert.ok(accueil.hero_title.length > 0)
		if (accueil.description_image) assert.match(accueil.description_image, urlFichier)
	})

	test('battle des cocktails : deux images en URL complète', async () => {
		const battle = await getCocktailBattleData()
		assert.match(battle.cocktail_1_image, urlFichier)
		assert.match(battle.cocktail_2_image, urlFichier)
	})

	test('carte : images des cocktails en URL complète, vins sans image', async () => {
		const { items } = await getDrinkList('Cocktails')
		assert.ok(items.length > 0)
		for (const c of items) if (c.image) assert.match(c.image, urlFichier)
		assert.equal((await getWineData()).length, 4)
	})

	test('pied de page : liens internes', async () => {
		const pied = await getFooterData()
		assert.equal(pied.menu_url, '/carte')
		assert.equal(pied.contact_url, '/contact')
	})

	test('sans jeton PocketBase, les services refusent de répondre', async () => {
		const jeton = process.env.PB_USER_TOKEN
		delete process.env.PB_USER_TOKEN
		try {
			await assert.rejects(getNavBarData(), /Failed to connect/)
		} finally {
			process.env.PB_USER_TOKEN = jeton
		}
	})
})
