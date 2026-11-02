// Tests unitaires de la génération du sitemap, avec un PocketBase simulé (y compris en panne).
// Lancer avec : pnpm test:unit (Node 22.18+ lit le TypeScript du module sans compilation).
import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { buildSitemap, fetchEventEntries, PUBLIC_PAGES, SITE_URL } from '../../src/lib/sitemap-pages.ts'

const FIXED_URLS = [
	'https://latavernedesaventuriers.fr',
	'https://latavernedesaventuriers.fr/carte',
	'https://latavernedesaventuriers.fr/evenements',
	'https://latavernedesaventuriers.fr/bibliotheque-de-jeux',
	'https://latavernedesaventuriers.fr/reservation',
	'https://latavernedesaventuriers.fr/contact',
	'https://latavernedesaventuriers.fr/qui-sommes-nous',
	'https://latavernedesaventuriers.fr/battle/cocktails',
	'https://latavernedesaventuriers.fr/battle/mocktails',
	'https://latavernedesaventuriers.fr/mentions-legales',
	'https://latavernedesaventuriers.fr/plan-du-site',
]

/** Faux client PocketBase : `pages` est la liste des pages de résultats renvoyées par getList. */
function fakePocketBase(pages, calls = []) {
	return {
		collection(name) {
			return {
				async getList(page, perPage, options) {
					calls.push({ name, options, page, perPage })
					return { items: pages[page - 1] ?? [], totalPages: pages.length }
				},
			}
		},
	}
}

const failingPocketBase = error => ({
	collection: () => ({
		getList: async () => {
			throw error
		},
	}),
})

const silentPocketBase = { collection: () => ({ getList: () => new Promise(() => {}) }) }

// Les cas en panne écrivent un avertissement : on le capture pour garder la sortie lisible et le vérifier.
async function withCapturedWarnings(run) {
	const original = console.warn
	const warnings = []
	console.warn = (...args) => warnings.push(args.map(String).join(' '))
	try {
		return { result: await run(), warnings }
	} finally {
		console.warn = original
	}
}

describe('buildSitemap', () => {
	test('liste toutes les pages publiques, sans /og-generator, au format des balises canonical', () => {
		const urls = buildSitemap([]).map(entry => entry.url)
		assert.deepEqual(urls, FIXED_URLS)
		assert.ok(urls.every(url => !url.includes('og-generator')))
		assert.equal(SITE_URL, 'https://latavernedesaventuriers.fr')
	})

	test('ajoute une entrée par événement, avec sa date de mise à jour', () => {
		const updated = new Date('2026-03-04T10:00:00.000Z')
		const entries = buildSitemap([
			{ lastModified: updated, slug: 'soiree-quiz', title: 'Soirée quiz' },
			{ slug: 'sans-date', title: 'Sans date' },
		])
		assert.equal(entries.length, PUBLIC_PAGES.length + 2)
		const [quiz, noDate] = entries.slice(-2)
		assert.equal(quiz.url, 'https://latavernedesaventuriers.fr/evenements/soiree-quiz')
		assert.equal(quiz.lastModified, updated)
		assert.equal(noDate.url, 'https://latavernedesaventuriers.fr/evenements/sans-date')
		assert.equal('lastModified' in noDate, false)
	})

	test('chaque priorité est comprise entre 0 et 1', () => {
		for (const entry of buildSitemap([{ slug: 'a', title: 'A' }])) {
			assert.ok(entry.priority >= 0 && entry.priority <= 1, entry.url)
		}
	})
})

describe('fetchEventEntries', () => {
	test('lit les événements de PocketBase et convertit la date PocketBase', async () => {
		const calls = []
		const pb = fakePocketBase(
			[
				[
					{ event_slug: 'soiree-jeux', event_title: ' Soirée jeux ', updated: '2026-01-01 00:00:00.000Z' },
					{ event_slug: 'soiree-quiz', event_title: '', updated: 'pas une date' },
				],
			],
			calls
		)
		const events = await fetchEventEntries(pb)
		assert.deepEqual(events, [
			{ lastModified: new Date('2026-01-01T00:00:00.000Z'), slug: 'soiree-jeux', title: 'Soirée jeux' },
			{ lastModified: undefined, slug: 'soiree-quiz', title: 'soiree-quiz' },
		])
		assert.equal(calls.length, 1)
		assert.equal(calls[0].name, 'Events')
		assert.equal(calls[0].options.sort, '-event_date')
	})

	test('parcourt toutes les pages de résultats, puis s’arrête', async () => {
		const calls = []
		const pb = fakePocketBase([[{ event_slug: 'page-un' }], [{ event_slug: 'page-deux' }], [{ event_slug: 'page-trois' }]], calls)
		const events = await fetchEventEntries(pb)
		assert.deepEqual(
			events.map(event => event.slug),
			['page-un', 'page-deux', 'page-trois']
		)
		assert.deepEqual(
			calls.map(call => call.page),
			[1, 2, 3]
		)
	})

	test('écarte les slugs invalides ou en double', async () => {
		const pb = fakePocketBase([
			[
				{ event_slug: 'ok-1' },
				{ event_slug: 'ok-1' },
				{ event_slug: 'avec espace' },
				{ event_slug: '../admin' },
				{ event_slug: '' },
				{ event_slug: null },
				{},
				{ event_slug: 'ok_2' },
			],
		])
		const events = await fetchEventEntries(pb)
		assert.deepEqual(
			events.map(event => event.slug),
			['ok-1', 'ok_2']
		)
	})

	test('sans PocketBase (pas de jeton) : liste vide, le sitemap garde les pages fixes', async () => {
		const events = await fetchEventEntries(null)
		assert.deepEqual(events, [])
		assert.deepEqual(
			buildSitemap(events).map(entry => entry.url),
			FIXED_URLS
		)
	})

	test('PocketBase en erreur : liste vide et avertissement, sans exception', async () => {
		const { result, warnings } = await withCapturedWarnings(() =>
			fetchEventEntries(failingPocketBase(new Error('fetch failed: ECONNREFUSED')))
		)
		assert.deepEqual(result, [])
		assert.equal(warnings.length, 1)
		assert.match(warnings[0], /ECONNREFUSED/)
	})

	test('PocketBase muet : abandon après le délai, sans bloquer', async () => {
		const start = Date.now()
		const { result, warnings } = await withCapturedWarnings(() =>
			fetchEventEntries(silentPocketBase, { timeoutMs: 50 })
		)
		assert.deepEqual(result, [])
		assert.ok(Date.now() - start < 2000)
		assert.match(warnings[0], /n'a pas répondu en 50 ms/)
	})

	test('réponse mal formée : liste vide, sans exception', async () => {
		const pb = { collection: () => ({ getList: async () => ({ items: null, totalPages: 1 }) }) }
		const { result } = await withCapturedWarnings(() => fetchEventEntries(pb))
		assert.deepEqual(result, [])
	})
})
