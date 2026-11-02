// Test de fumée : démarre le site déjà construit (next start) contre le faux PocketBase et contrôle les pages principales.
// Lancer avec : pnpm test (après pnpm build:ci).
import { spawn } from 'node:child_process'

const PORT = Number(process.env.SMOKE_PORT ?? 13100)
const BASE = `http://127.0.0.1:${PORT}`

// [chemin, statut attendu, texte attendu dans le HTML : il prouve que la donnée du faux PocketBase arrive bien dans la page,
//  textes interdits facultatifs]
const PAGES = [
	['/', 200, 'soiree-jeux'],
	['/carte', 200, 'Cocktail factice'],
	['/evenements', 200, 'soiree-future'],
	['/evenements/soiree-future', 200, 'soiree-future'],
	['/bibliotheque-de-jeux', 200, 'Jeux games_hero_title'],
	['/contact', 200, 'Contact schedule_title'],
	['/reservation', 200, 'Réservation how_to_title'],
	['/qui-sommes-nous', 200, 'Qui who_are_we_title'],
	['/battle/cocktails', 200, 'Cocktail A'],
	['/battle/mocktails', 200, 'Mocktail A'],
	['/mentions-legales', 200, 'Mentions'],
	['/plan-du-site', 200, 'Plan du site | La Taverne des Aventuriers'],
	['/page-qui-n-existe-pas', 404, ''],
	// Un événement inconnu doit donner la 404 du site, pas une erreur 500.
	['/evenements/evenement-inconnu', 404, 'noindex', ['could not be found', 'Événement non trouvé']],
	// Une erreur de PocketBase autre que « introuvable » doit rester une erreur, jamais une 404.
	['/evenements/erreur-serveur-simulee', 500, ''],
]

// Chevalier de la page 404 : fichiers Rive intacts (ils avaient été réencodés en UTF-8, ce qui les rendait illisibles).
const RIVE = [
	['/assets/animation/chevalier.riv', 4681635],
	['/assets/animation/chevaliermobile.riv', 4681655],
]

// PocketBase injoignable : port fermé, mais jeton présent pour passer par le vrai chemin d'appel.
const OUTAGE_PORT = PORT + 1
const OUTAGE_PB_URL = `http://127.0.0.1:${Number(process.env.SMOKE_CLOSED_PORT ?? PORT + 2)}`

function startServer(port, env = {}) {
	return spawn('pnpm', ['exec', 'next', 'start', '-H', '127.0.0.1', '-p', String(port)], {
		detached: true,
		env: { ...process.env, ...env },
		stdio: ['ignore', 'inherit', 'inherit'],
	})
}

const servers = [startServer(PORT)]

async function waitForServer(base) {
	for (let attempt = 0; attempt < 60; attempt += 1) {
		try {
			await fetch(`${base}/favicon.ico`)
			return
		} catch {
			await new Promise(resolve => setTimeout(resolve, 500))
		}
	}
	throw new Error('next start ne répond pas')
}

const SITE = 'https://latavernedesaventuriers.fr'
const SITEMAP_URLS = [
	SITE,
	...[
		'/carte',
		'/evenements',
		'/bibliotheque-de-jeux',
		'/reservation',
		'/contact',
		'/qui-sommes-nous',
		'/battle/cocktails',
		'/battle/mocktails',
		'/mentions-legales',
		'/plan-du-site',
	].map(path => SITE + path),
	// Événements du faux PocketBase (scripts/fake-pocketbase.mjs), qui les renvoie sans les trier.
	...['soiree-future', 'soiree-passee', 'soiree-jeux', 'soiree-quiz'].map(slug => `${SITE}/evenements/${slug}`),
]

/** Intégration : /sitemap.xml et /robots.txt tels que le build de production les sert. */
async function checkSitemapAndRobots() {
	const failures = []
	const check = (ok, label) => {
		console.log(`${ok ? 'ok ' : 'KO '} ${label}`)
		if (!ok) failures.push(label)
	}

	const sitemap = await fetch(`${BASE}/sitemap.xml`)
	const xml = await sitemap.text()
	check(sitemap.status === 200, `${sitemap.status} /sitemap.xml`)
	check(sitemap.headers.get('content-type')?.startsWith('application/xml'), `/sitemap.xml en ${sitemap.headers.get('content-type')}`)
	check(xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), '/sitemap.xml : balise urlset')
	const locs = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map(match => match[1])
	check(JSON.stringify(locs) === JSON.stringify(SITEMAP_URLS), `/sitemap.xml : ${locs.length} adresses attendues`)
	check(!xml.includes('og-generator'), '/sitemap.xml sans /og-generator')
	check(xml.includes('<lastmod>2026-01-01T00:00:00.000Z</lastmod>'), '/sitemap.xml : date des événements')

	const robots = await fetch(`${BASE}/robots.txt`)
	const txt = await robots.text()
	check(robots.status === 200, `${robots.status} /robots.txt`)
	check(robots.headers.get('content-type')?.startsWith('text/plain'), `/robots.txt en ${robots.headers.get('content-type')}`)
	check(/^User-Agent: \*$/m.test(txt) && /^Allow: \/$/m.test(txt), '/robots.txt : tout le site autorisé')
	check(/^Disallow: \/og-generator$/m.test(txt), '/robots.txt : /og-generator interdit')
	check(txt.includes(`Sitemap: ${SITE}/sitemap.xml`), '/robots.txt : adresse du sitemap')
	return failures
}

const hasReplacementChar = bytes => {
	for (let i = 0; i + 2 < bytes.length; i += 1) {
		if (bytes[i] === 0xef && bytes[i + 1] === 0xbf && bytes[i + 2] === 0xbd) return true
	}
	return false
}

async function main() {
	await waitForServer(BASE)
	const failures = []
	for (const [path, status, marker, forbidden = []] of PAGES) {
		const res = await fetch(BASE + path)
		const html = await res.text()
		const ok = res.status === status && html.includes(marker) && !forbidden.some(text => html.includes(text))
		console.log(`${ok ? 'ok ' : 'KO '} ${res.status} ${path}`)
		if (!ok) failures.push(path)
	}
	// L'optimiseur d'images repose sur sharp : une image locale doit ressortir en WebP.
	const image = await fetch(`${BASE}/_next/image?url=%2Fassets%2Fimages%2Felfattention.png&w=256&q=75`, {
		headers: { accept: 'image/webp' },
	})
	const imageOk = image.status === 200 && image.headers.get('content-type') === 'image/webp'
	console.log(`${imageOk ? 'ok ' : 'KO '} ${image.status} ${image.headers.get('content-type')} /_next/image`)
	if (!imageOk) failures.push('/_next/image')
	failures.push(...(await checkSitemapAndRobots()))
	for (const [path, size] of RIVE) {
		const res = await fetch(BASE + path)
		const bytes = new Uint8Array(await res.arrayBuffer())
		const header = new TextDecoder().decode(bytes.subarray(0, 4))
		const ok = res.status === 200 && header === 'RIVE' && bytes.length === size && !hasReplacementChar(bytes)
		console.log(`${ok ? 'ok ' : 'KO '} ${res.status} ${bytes.length} octets ${path}`)
		if (!ok) failures.push(path)
	}
	// Panne de PocketBase : une page d'événement doit répondre en erreur (5xx), surtout pas en 404.
	const outageBase = `http://127.0.0.1:${OUTAGE_PORT}`
	servers.push(startServer(OUTAGE_PORT, { PB_SERVER_URL: OUTAGE_PB_URL, PB_USER_TOKEN: 'jeton-factice' }))
	await waitForServer(outageBase)
	const outage = await fetch(`${outageBase}/evenements/pocketbase-injoignable`)
	await outage.text()
	const outageOk = outage.status >= 500
	console.log(`${outageOk ? 'ok ' : 'KO '} ${outage.status} /evenements/pocketbase-injoignable (PocketBase injoignable)`)
	if (!outageOk) failures.push('/evenements/pocketbase-injoignable (PocketBase injoignable)')
	if (failures.length > 0) throw new Error(`Pages en échec : ${failures.join(', ')}`)
}

try {
	await main()
	console.log('Test de fumée réussi')
} catch (error) {
	console.error(error)
	process.exitCode = 1
} finally {
	for (const server of servers) {
		try {
			process.kill(-server.pid)
		} catch {
			// next start s'est déjà arrêté.
		}
	}
}
