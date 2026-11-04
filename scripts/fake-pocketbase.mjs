// Faux PocketBase pour la CI et les essais locaux : aucun jeton réel, aucun appel au vrai PocketBase.
// Usage : node scripts/fake-pocketbase.mjs <commande...> lance la commande avec PB_SERVER_URL et
// PB_USER_TOKEN pointant vers ce serveur, puis l'arrête. Sans commande, le serveur reste à l'écoute.
// Deux jeux de données :
// - par défaut, des données factices (tests de fumée : chaque champ affiche son nom) ;
// - avec PB_INSTANTANE=<fichier.json>, l'instantané des vraies données du site (tests visuels), images comprises,
//   lues dans le dossier fichiers/ voisin. Voir scripts/instantane/extraire-prod.mjs.
import { spawn } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { dirname, join, normalize } from 'node:path'

const PORT = Number(process.env.FAKE_PB_PORT ?? 18090)

/** Remplit chaque champ avec un texte factice ; les *_url deviennent un lien interne et les images un nom de fichier. */
function fill(label, fields) {
	return Object.fromEntries(
		fields.map(field => {
			if (field.endsWith('_url')) return [field, '/contact']
			if (field.includes('image')) return [field, 'factice.png']
			return [field, `${label} ${field}`]
		})
	)
}

// Coloration du CMS (*L*a → L en rouge) sur des champs de chaque type de rendu : texte brut rendu par React
// (ColoredText), champ HTML (textToSpanColored), passage de plusieurs mots, pied de page avec &nbsp;. Le test de
// fumée vérifie le span rouge à l'écran et l'absence d'astérisques dans title, meta, alt, aria-label et JSON-LD.
const drink = (title, extra = {}) => ({ description: `Description ${title}`, order: 1, price: 8, title, ...extra })
const drinks = title => [drink(title, { image: 'factice.png' })]

const nav = [
	['Accueil', '/'],
	['Carte', '/carte'],
	['Événements', '/evenements'],
	['Jeux', '/bibliotheque-de-jeux'],
	['Contact', '/contact'],
]

const event = (slug, event_date, Important_One) => ({
	button_aria: 'En savoir plus',
	button_label: 'En savoir plus',
	button_url: `/evenements/${slug}`,
	event_date,
	event_description: `<p>Description de ${slug}</p>`,
	event_image: 'factice.png',
	event_slug: slug,
	event_title: `*É*vénement ${slug}`,
	Important_One,
	summary: `<p>Résumé de ${slug}</p>`,
})

const battle = (kind, n1, n2) => ({
	...fill('Battle', ['explanation', 'chain_win_label']),
	chain_win_score: 3,
	[`${kind}_1_image`]: 'factice.png',
	[`${kind}_2_image`]: 'factice.png',
	[`${kind}1_description`]: `Description ${n1}`,
	[`${kind}1_score`]: 12,
	[`${kind}1_stars`]: 4,
	[`${kind}1_title`]: `*${n1[0]}*${n1.slice(1)}`,
	[`${kind}2_description`]: `Description ${n2}`,
	[`${kind}2_score`]: 9,
	[`${kind}2_stars`]: 3,
	[`${kind}2_title`]: n2,
})

const COLLECTIONS = {
	Battle_Cocktails: [battle('cocktail', 'Cocktail A', 'Cocktail B')],
	Battle_Mocktails: [battle('mocktail', 'Mocktail A', 'Mocktail B')],
	Beers: [drink('Bière factice', { volume: 25 })],
	Cocktails: drinks('Cocktail factice'),
	contact_page: [
		{
			...fill('Contact', [
				'howtosection_title',
				'howtosection_description',
				'howtosection_image',
				'schedule_title',
				'schedule_content',
				'contact_email_title',
				'contact_email',
				'email_aria',
				'contact_socials_title',
				'instagram_url',
				'instagram_aria',
				'myludo_url',
				'myludo_aria',
				'facebook_url',
				'facebook_aria',
				'address_title',
				'address',
				'button_label',
				'button_url',
				'button_aria',
			]),
			schedule_title: '*C*ontact schedule_title',
			howtosection_title: '*Nous trouver* howtosection_title',
		},
	],
	Event_Page: [fill('Événements', ['page_title', 'event_description', 'bar_event_title'])],
	Events: [
		event('soiree-future', '2099-06-15 19:00:00.000Z', true),
		event('soiree-passee', '2020-06-15 19:00:00.000Z', false),
		event('soiree-jeux', '2099-07-15 19:00:00.000Z', false),
		event('soiree-quiz', '2099-08-15 19:00:00.000Z', false),
	],
	footer: [
		{
			...fill('Pied', [
				'bar_title',
				'support_title',
				'menu_link_title',
				'menu_url',
				'menu_aria',
				'description_title',
				'description_url',
				'description_aria',
				'events_title',
				'events_url',
				'event_aria',
				'contact_title',
				'contact_url',
				'contact_aria',
				'reservation_link_label',
				'reservation_url',
				'reservation_aria',
				'game_library_title',
				'game_library_url',
				'game_library_aria',
				'socials_title',
				'facebook_url',
				'facebook_aria',
				'instagram_url',
				'instagram_aria',
				'myludo_url',
				'myludo_aria',
			]),
			bar_title: '*La Taverne* bar_title',
		},
	],
	games_pages: [
		{
			...fill('Jeux', [
				'games_hero_title',
				'games_hero_description',
				'Card_Title',
				...[1, 2, 3].flatMap(n =>
					['title', 'description', 'button_label', 'button_url', 'button_aria', 'image'].map(f => `card${n}_${f}`)
				),
				'myludo_component_url',
				'myludo_component_title',
				'myludo_component_description',
				'myludo_component_button_label',
				'myludo_component_button_url',
				'myludo_component_button_aria',
				'myludo_component_image',
			]),
			card1_title: '*C*arte card1_title',
			games_hero_title: '*J*eux games_hero_title',
		},
	],
	Hot_drinks: [drink('Boisson chaude factice')],
	landing_page: [
		fill('Accueil', [
			'description_button_label',
			'description_button_url',
			'description_button_aria',
			'description_image',
			'description_text',
			'description_title',
			'events_title',
			'hero_description',
			'hero_left_button_aria',
			'hero_left_button_label',
			'hero_left_button_url',
			'hero_right_button_aria',
			'hero_right_button_label',
			'hero_right_button_url',
			'hero_title',
		]),
	],
	Mocktails: drinks('Mocktail factice'),
	NavBar: nav.map(([label, url], order) => ({ label, order, url })),
	Planches: drinks('Planche factice'),
	reservation_card: [
		{
			...fill('Réservation', [
				'title',
				'image',
				'description',
				'games_url',
				'button_aria',
				'button_label',
				'button_url',
				'button_myludo_aria',
				'button_myludo_label',
				'button_myludo_url',
			]),
			description: '<p>*R*éservez reservation_card description</p>',
		},
	],
	reservation_page: [
		{ ...fill('Réservation', ['how_to_title', 'description']), how_to_title: '*R*éservation how_to_title' },
	],
	Short_long_drinks: drinks('Long drink factice'),
	Shooters: drinks('Shooter factice'),
	Softs_drinks: [drink('Soft factice', { volume: 33 })],
	Travelers_pleasures: [
		drink('Plaisir factice 1'),
		drink('Plaisir factice 2'),
		drink('Plaisir factice 3'),
		drink('Plaisir factice 4'),
	],
	who_are_we_page: [
		{
			...fill('Qui', [
				'who_are_we_title',
				'description_card_1',
				'our_history_title',
				'description_card_2',
				'our_services_title',
				'description_card_3',
				'team_title',
				'description_card_4',
				'information_title',
				'description_card_5',
			]),
			who_are_we_title: '*Q*ui who_are_we_title',
		},
	],
	Wines: [drink('Vin factice', { price_bottle: 24, price_glass: 5, type: 'Rouge' })],
}

// PNG transparent de 1 pixel, pour les éventuels appels à /api/files.
const PIXEL = Buffer.from(
	'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
	'base64'
)

const INSTANTANE = process.env.PB_INSTANTANE
const instantane = INSTANTANE ? JSON.parse(readFileSync(INSTANTANE, 'utf8')).collections : null
const DOSSIER_FICHIERS = INSTANTANE ? join(dirname(INSTANTANE), 'fichiers') : null

/** Fichier d'image de l'instantané, ou null (chemin confiné au dossier fichiers/). */
function fichierInstantane(chemin) {
	const relatif = normalize(decodeURIComponent(chemin.replace(/^\/api\/files\//, '')))
	if (relatif.startsWith('..')) return null
	const complet = join(DOSSIER_FICHIERS, relatif)
	return existsSync(complet) ? readFileSync(complet) : null
}

/** Tri façon PocketBase pour un seul champ : « champ » ou « -champ ». */
function trier(items, sort) {
	if (!sort) return items
	const descendant = sort.startsWith('-')
	const champ = sort.replace(/^[-+]/, '')
	return [...items].sort((a, b) => (a[champ] < b[champ] ? -1 : a[champ] > b[champ] ? 1 : 0) * (descendant ? -1 : 1))
}

function record(name, data, index) {
	return {
		collectionId: `fake_${name}`,
		collectionName: name,
		created: '2026-01-01 00:00:00.000Z',
		id: `fake${String(index).padStart(11, '0')}`,
		updated: '2026-01-01 00:00:00.000Z',
		...data,
	}
}

function json(res, status, body) {
	res.writeHead(status, { 'content-type': 'application/json' })
	res.end(JSON.stringify(body))
}

const server = createServer((req, res) => {
	const url = new URL(req.url, `http://127.0.0.1:${PORT}`)
	if (url.pathname.startsWith('/api/files/')) {
		if (instantane) {
			const contenu = fichierInstantane(url.pathname)
			if (!contenu) {
				json(res, 404, { data: {}, message: "Fichier absent de l'instantané", status: 404 })
				return
			}
			res.writeHead(200, { 'content-type': 'image/webp' })
			res.end(contenu)
			return
		}
		res.writeHead(200, { 'content-type': 'image/png' })
		res.end(PIXEL)
		return
	}
	const name = url.pathname.match(/^\/api\/collections\/([^/]+)\/records$/)?.[1]
	const source = instantane ?? COLLECTIONS
	if (!name || !(name in source)) {
		// Une collection inconnue doit faire échouer le build : c'est le signal d'un faux serveur à compléter.
		json(res, 404, { data: {}, message: `Collection factice inconnue : ${url.pathname}`, status: 404 })
		return
	}
	let items = instantane
		? trier(instantane[name], url.searchParams.get('sort'))
		: COLLECTIONS[name].map((data, index) => record(name, data, index))
	const slug = url.searchParams.get('filter')?.match(/event_slug="([^"]*)"/)?.[1]
	if (slug === 'erreur-serveur-simulee') {
		// Simule une panne de PocketBase (erreur 500) pour vérifier qu'elle n'est pas prise pour une page introuvable.
		json(res, 500, { data: {}, message: 'Erreur simulée', status: 500 })
		return
	}
	if (slug !== undefined) items = items.filter(item => item.event_slug === slug)
	json(res, 200, { items, page: 1, perPage: items.length, totalItems: items.length, totalPages: 1 })
})

server.listen(PORT, '127.0.0.1', () => {
	const [command, ...args] = process.argv.slice(2)
	if (!command) {
		console.log(`Faux PocketBase sur http://127.0.0.1:${PORT}`)
		return
	}
	const child = spawn(command, args, {
		env: { ...process.env, PB_SERVER_URL: `http://127.0.0.1:${PORT}`, PB_USER_TOKEN: 'jeton-factice' },
		shell: process.platform === 'win32',
		stdio: 'inherit',
	})
	child.on('exit', code => {
		server.close()
		server.closeAllConnections()
		process.exitCode = code ?? 1
	})
})
