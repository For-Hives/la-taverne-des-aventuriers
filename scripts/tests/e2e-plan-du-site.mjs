// Test de bout en bout, dans un vrai navigateur (Chromium via Playwright) :
// depuis le pied de page, clic sur « Plan du site », puis chaque lien du plan doit répondre sans 404.
// Lancer avec : pnpm test:e2e (après pnpm build:ci ; le faux PocketBase est démarré par le script).
// Navigateur requis une fois : pnpm exec playwright install chromium
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

import { chromium } from 'playwright'

const PORT = Number(process.env.E2E_PORT ?? 13200)
const BASE = `http://127.0.0.1:${PORT}`

const VIEWPORTS = {
	bureau: { viewport: { height: 900, width: 1440 } },
	telephone: { hasTouch: true, isMobile: true, viewport: { height: 844, width: 390 } },
}

const server = spawn('pnpm', ['exec', 'next', 'start', '-H', '127.0.0.1', '-p', String(PORT)], {
	detached: true,
	stdio: ['ignore', 'inherit', 'inherit'],
})

async function waitForServer() {
	for (let attempt = 0; attempt < 60; attempt += 1) {
		try {
			await fetch(`${BASE}/favicon.ico`)
			return
		} catch {
			await new Promise(resolve => setTimeout(resolve, 500))
		}
	}
	throw new Error('next start ne répond pas')
}

async function run(browser, name, options) {
	const context = await browser.newContext({ ...options, locale: 'fr-FR', reducedMotion: 'reduce' })
	const page = await context.newPage()
	const pageErrors = []
	page.on('pageerror', error => pageErrors.push(String(error)))

	await page.goto(`${BASE}/contact`, { waitUntil: 'load' })
	const footerLink = page.getByRole('link', { exact: true, name: 'Plan du site' })
	const legalLink = page.getByRole('link', { exact: true, name: 'Mentions légales' })
	await footerLink.scrollIntoViewIfNeeded()
	await assert.doesNotReject(footerLink.waitFor({ state: 'visible' }), `${name} : lien du pied de page visible`)

	// Le nouveau lien est sur la même ligne que « Mentions légales », avec le même style.
	const [footerBox, legalBox] = [await footerLink.boundingBox(), await legalLink.boundingBox()]
	assert.equal(Math.round(footerBox.y), Math.round(legalBox.y), `${name} : même ligne que Mentions légales`)
	assert.equal(Math.round(footerBox.height), Math.round(legalBox.height), `${name} : même hauteur de ligne`)
	const styleOf = locator =>
		locator.evaluate(element => {
			const style = getComputedStyle(element)
			return [element.className, style.fontFamily, style.fontSize, style.color, style.lineHeight].join('|')
		})
	assert.equal(await styleOf(footerLink), await styleOf(legalLink), `${name} : même style que Mentions légales`)

	await Promise.all([page.waitForURL(`${BASE}/plan-du-site`), footerLink.click()])
	assert.equal(await page.title(), 'Plan du site | La Taverne des Aventuriers')
	assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), 'Plan du site')
	assert.equal(
		await page.locator('link[rel="canonical"]').getAttribute('href'),
		'https://latavernedesaventuriers.fr/plan-du-site'
	)

	const hrefs = await page
		.locator('main a[href^="/"], .container a[href^="/"]')
		.evaluateAll(links => [...new Set(links.map(link => link.getAttribute('href')))])
	for (const expected of ['/', '/carte', '/evenements', '/mentions-legales', '/evenements/soiree-future']) {
		assert.ok(hrefs.includes(expected), `${name} : le plan contient ${expected}`)
	}
	assert.ok(!hrefs.includes('/og-generator'), `${name} : le plan ne contient pas /og-generator`)
	for (const href of hrefs) {
		const response = await page.request.get(BASE + href)
		console.log(`${response.status() === 200 ? 'ok ' : 'KO '} ${name} ${response.status()} ${href}`)
		assert.equal(response.status(), 200, `${name} : ${href} répond ${response.status()}`)
	}

	// Un lien du plan s'ouvre vraiment dans le navigateur.
	await Promise.all([
		page.waitForURL(`${BASE}/mentions-legales`),
		page.locator('.container').getByRole('link', { exact: true, name: 'Mentions légales' }).click(),
	])
	assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), 'Mentions Légales')
	assert.deepEqual(pageErrors, [], `${name} : aucune erreur JavaScript`)
	console.log(`ok  ${name} : pied de page → plan du site → ${hrefs.length} liens sans 404`)
	await context.close()
}

try {
	await waitForServer()
	const browser = await chromium.launch()
	try {
		for (const [name, options] of Object.entries(VIEWPORTS)) await run(browser, name, options)
	} finally {
		await browser.close()
	}
	console.log('Test de bout en bout réussi')
} catch (error) {
	console.error(error)
	process.exitCode = 1
} finally {
	try {
		process.kill(-server.pid)
	} catch {
		// next start s'est déjà arrêté.
	}
}
