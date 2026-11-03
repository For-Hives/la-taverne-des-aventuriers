// Fabrique l'instantané des données PocketBase à partir du site en production, en lecture seule et sans aucun jeton.
// Les tests visuels tournent ensuite sur ces données figées (voir scripts/fake-pocketbase.mjs, PB_INSTANTANE).
// Usage : node scripts/instantane/extraire-prod.mjs [url-du-site]
// Écrit tests/instantane/pocketbase.json et les images dans tests/instantane/fichiers/.
//
// D'où viennent les enregistrements :
// - la plupart sont sérialisés tels quels dans la charge RSC des pages (props des composants client) ;
// - Beers et Wines arrivent par une action serveur sur /carte (réponse lue au passage) ;
// - footer, Event_Page, les battles et les boissons de /carte sont rendus côté serveur : ils sont reconstruits
//   depuis le DOM, champ par champ, d'après les composants qui les affichent.
// Les champs image redeviennent de simples noms de fichier, comme PocketBase les renvoie ; les octets sont
// téléchargés via l'optimiseur d'images de la production (les fichiers PocketBase ne sont pas tous publics).
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium } from 'playwright'

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '../../tests/instantane')
const SITE = (process.argv[2] ?? 'https://latavernedesaventuriers.fr').replace(/\/$/, '')
// Largeur demandée à l'optimiseur de la production pour chaque image (il ne grossit jamais une image).
// Événements : 828, la largeur que le navigateur demande en bureau (sizes 768px) ; le poids reste raisonnable.
// Nombre d'événements gardés (les plus récents), plus ceux cités par les tests.
const EVENEMENTS_GARDES = 10
const EVENEMENTS_TOUJOURS = ['soiree-1ans']
const largeurImage = collectionId => (collectionId === 'pbc_1664626482' ? 828 : 1080)

/** Fin de l'objet JSON qui commence à `debut` (accolade fermante correspondante), ou -1. */
function finObjet(texte, debut) {
	let profondeur = 0
	let dansChaine = false
	for (let i = debut; i < texte.length; i++) {
		const c = texte[i]
		if (dansChaine) {
			if (c === '\\') i++
			else if (c === '"') dansChaine = false
		} else if (c === '"') dansChaine = true
		else if (c === '{') profondeur++
		else if (c === '}' && --profondeur === 0) return i
	}
	return -1
}

/**
 * Lignes texte d'un flux RSC (« id:T<longueur hexadécimale en octets>,<texte> ») : React y place les longues
 * chaînes et les remplace dans les props par une référence « $id ». Parcours séquentiel, en octets.
 */
export function lignesTexteRsc(flight) {
	const octets = Buffer.from(flight)
	const textes = new Map()
	let i = 0
	while (i < octets.length) {
		const deuxPoints = octets.indexOf(0x3a, i)
		if (deuxPoints < 0) break
		const id = octets.toString('latin1', i, deuxPoints).replace(/^\n+/, '')
		if (/^[0-9a-f]+$/.test(id) && octets[deuxPoints + 1] === 0x54) {
			const virgule = octets.indexOf(0x2c, deuxPoints)
			const longueur = Number.parseInt(octets.toString('latin1', deuxPoints + 2, virgule), 16)
			textes.set(id, octets.toString('utf8', virgule + 1, virgule + 1 + longueur))
			i = virgule + 1 + longueur
			continue
		}
		const finLigne = octets.indexOf(0x0a, deuxPoints)
		if (finLigne < 0) break
		i = finLigne + 1
	}
	return textes
}

/** Remplace les références RSC d'un enregistrement (« $2a », « $undefined », « $$… ») par leur valeur. */
function resoudreReferences(enregistrement, textes) {
	for (const [cle, valeur] of Object.entries(enregistrement)) {
		if (typeof valeur !== 'string' || !valeur.startsWith('$')) continue
		if (valeur === '$undefined') delete enregistrement[cle]
		else if (valeur.startsWith('$$')) enregistrement[cle] = valeur.slice(1)
		else if (/^\$[0-9a-f]+$/.test(valeur) && textes.has(valeur.slice(1)))
			enregistrement[cle] = textes.get(valeur.slice(1))
		else throw new Error(`Référence RSC non résolue : ${cle} = ${valeur}`)
	}
	return enregistrement
}

/**
 * Extrait d'un texte RSC chaque enregistrement PocketBase (objet JSON portant collectionName au premier niveau).
 * PocketBase trie les clés : collectionName n'est pas forcément en tête, on remonte donc jusqu'à l'objet englobant.
 */
export function enregistrementsRsc(flight) {
	const textes = lignesTexteRsc(flight)
	const trouves = []
	let depuis = 0
	for (;;) {
		const position = flight.indexOf('"collectionName":"', depuis)
		if (position < 0) break
		let trouve = null
		for (
			let debut = flight.lastIndexOf('{', position);
			debut >= 0 && !trouve;
			debut = flight.lastIndexOf('{', debut - 1)
		) {
			const fin = finObjet(flight, debut)
			if (fin < position) continue
			try {
				const objet = JSON.parse(flight.slice(debut, fin + 1))
				if (typeof objet.collectionName === 'string') trouve = { fin, objet }
			} catch {}
		}
		if (!trouve) throw new Error(`Enregistrement illisible autour de ${flight.slice(position, position + 80)}`)
		trouves.push(resoudreReferences(trouve.objet, textes))
		depuis = trouve.fin + 1
	}
	return trouves
}

/** Recolle les morceaux self.__next_f.push([1,"…"]) d'une page HTML. */
export function flightDepuisHtml(html) {
	let texte = ''
	for (const m of html.matchAll(/self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g)) texte += JSON.parse(m[1])
	return texte
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await extraire()

async function extraire() {
	const navigateur = await chromium.launch()
	const contexte = await navigateur.newContext({
		locale: 'fr-FR',
		timezoneId: 'Europe/Paris',
		viewport: { height: 900, width: 1440 },
	})
	await contexte.route('**/*', route => {
		const requete = route.request()
		const hote = new URL(requete.url()).hostname
		// Aucune mesure d'audience ni lecteur tiers ; aucun POST hormis les lectures par action serveur.
		if (/umami|google|doubleclick|vimeo|myludo/.test(hote)) return route.abort('blockedbyclient')
		if (requete.method() === 'POST' && !requete.headers()['next-action']) return route.abort('blockedbyclient')
		return route.continue()
	})

	const collections = new Map()
	const ajouter = (nom, enregistrement) => {
		const liste = collections.get(nom) ?? new Map()
		if (!liste.has(enregistrement.id)) liste.set(enregistrement.id, enregistrement)
		collections.set(nom, liste)
	}
	// Nom demandé par le code -> collectionName renvoyé par PocketBase (la casse diffère pour la barre de navigation).
	const NOMS_CODE = { Navbar: 'NavBar' }

	async function ouvrir(chemin) {
		const page = await contexte.newPage()
		const actions = []
		page.on('response', async reponse => {
			if (reponse.request().method() === 'POST' && reponse.request().headers()['next-action']) {
				actions.push(reponse.text().catch(() => ''))
			}
		})
		const reponse = await page.goto(SITE + chemin, { timeout: 90000, waitUntil: 'networkidle' })
		const flight = flightDepuisHtml(await reponse.text())
		for (const e of enregistrementsRsc(flight)) ajouter(NOMS_CODE[e.collectionName] ?? e.collectionName, e)
		return { actions, flight, page }
	}

	// 1. Pages dont les enregistrements sont dans la charge RSC, plus Event_Page et le pied de page.
	for (const chemin of ['/', '/evenements', '/contact', '/bibliotheque-de-jeux', '/reservation', '/qui-sommes-nous']) {
		const { page } = await ouvrir(chemin)
		if (chemin === '/evenements') {
			const champs = await page.evaluate(() => {
				const h1 = document.querySelector('h1.font-cardinal')
				return {
					event_description: h1?.nextElementSibling?.innerHTML ?? '',
					page_title: (h1?.innerHTML ?? '').replace(/<span class="text-custom-red-100">(.*?)<\/span>/g, '*$1*'),
				}
			})
			ajouter('Event_Page', {
				bar_event_title: '',
				collectionId: 'instantane_evp',
				collectionName: 'Event_Page',
				id: 'eventpage000001',
				...champs,
			})
		}
		if (chemin === '/') {
			const pied = await page.evaluate(() => {
				const racine = document.querySelector('.bg-FooterImage')
				const titres = [...racine.querySelectorAll('h2')].map(h => h.textContent.replaceAll(' ', ' '))
				const liens = [...racine.querySelectorAll('a')].map(a => ({
					aria: a.getAttribute('aria-label') ?? '',
					href: a.getAttribute('href') ?? '',
					texte: a.textContent.trim(),
				}))
				return { liens, titres }
			})
			const [menu, description, events, jeux, contact, reservation, , , instagram, facebook, myludo] = pied.liens
			ajouter('footer', {
				bar_title: pied.titres[0],
				collectionId: 'instantane_ftr',
				collectionName: 'footer',
				contact_aria: contact.aria,
				contact_title: contact.texte,
				contact_url: contact.href,
				description_aria: description.aria,
				description_title: description.texte,
				description_url: description.href,
				event_aria: events.aria,
				events_title: events.texte,
				events_url: events.href,
				facebook_aria: facebook.aria,
				facebook_url: facebook.href,
				game_library_aria: jeux.aria,
				game_library_title: jeux.texte,
				game_library_url: jeux.href,
				id: 'footer000000001',
				instagram_aria: instagram.aria,
				instagram_url: instagram.href,
				menu_aria: menu.aria,
				menu_link_title: menu.texte,
				menu_url: menu.href,
				myludo_aria: myludo.aria,
				myludo_url: myludo.href,
				reservation_aria: reservation.aria,
				reservation_link_label: reservation.texte,
				reservation_url: reservation.href,
				socials_title: pied.titres[2],
				support_title: pied.titres[1],
			})
		}
		await page.close()
	}

	// 2. Battles : composants serveur ; les scores viennent des props du compteur client dans la charge RSC.
	for (const [genre, chemin] of [
		['cocktail', '/battle/cocktails'],
		['mocktail', '/battle/mocktails'],
	]) {
		const { flight, page } = await ouvrir(chemin)
		const brut = await page.evaluate(() => {
			const cartes = [...document.querySelectorAll('.group')].filter(
				c => c.querySelector(':scope h2.font-cardinal') && c.querySelector('img')
			)
			const chaine = document.querySelector('.tracking-wider.uppercase')
			return {
				cartes: cartes.map(carte => ({
					etoiles: Number(carte.querySelector('[aria-label="Star rating"]')?.nextElementSibling?.textContent ?? 0),
					ingredients: [...carte.querySelectorAll('h2 + div > *')].map(b => b.textContent),
					src: carte.querySelector('img').getAttribute('src'),
					titre: carte.querySelector('h2').textContent,
				})),
				chaine: chaine
					? {
							label: chaine.textContent,
							score: Number(chaine.parentElement.textContent.match(/(\d+)\s*victoire/)?.[1] ?? 0),
						}
					: null,
				explanation: document.querySelector('div.prose')?.innerHTML ?? '',
			}
		})
		const score = titre => {
			const motif = `"data":(\\d+),"title":${JSON.stringify(titre).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`
			return Number(flight.match(new RegExp(motif))?.[1] ?? 0)
		}
		const [c1, c2] = brut.cartes
		const nom = `Battle_${genre[0].toUpperCase()}${genre.slice(1)}s`
		ajouter(nom, {
			chain_win_label: brut.chaine?.label ?? '',
			chain_win_score: brut.chaine?.score ?? 0,
			collectionId: `instantane_bt${genre[0]}`,
			collectionName: nom,
			explanation: brut.explanation,
			id: `battle${genre}01`.padEnd(15, '0'),
			[`${genre}1_description`]: c1.ingredients.map(i => `<p>${i}</p>`).join(''),
			[`${genre}1_score`]: score(c1.titre),
			[`${genre}1_stars`]: c1.etoiles,
			[`${genre}1_title`]: c1.titre,
			[`${genre}2_description`]: c2.ingredients.map(i => `<p>${i}</p>`).join(''),
			[`${genre}2_score`]: score(c2.titre),
			[`${genre}2_stars`]: c2.etoiles,
			[`${genre}2_title`]: c2.titre,
			[`${genre}_1_image`]: c1.src,
			[`${genre}_2_image`]: c2.src,
		})
		await page.close()
	}

	// 3. La carte : bières et vins par action serveur, le reste reconstruit depuis le DOM.
	{
		// Les bières et les vins arrivent par deux actions serveur après l'hydratation. Playwright perd parfois
		// le corps d'une des deux réponses : on recharge la page jusqu'à avoir les deux collections.
		let page
		for (let essai = 1; ; essai++) {
			const ouverte = await ouvrir('/carte')
			page = ouverte.page
			await page.waitForFunction(() => document.querySelectorAll('#beer-wine .font-cardo-regular').length > 4, null, {
				timeout: 60000,
			})
			await page.waitForLoadState('networkidle')
			for (const texte of await Promise.all(ouverte.actions)) {
				for (const e of enregistrementsRsc(texte)) ajouter(e.collectionName, e)
			}
			if ((collections.get('Beers')?.size && collections.get('Wines')?.size) || essai === 5) break
			await page.close()
		}
		const sections = await page.evaluate(() => {
			const prix = el => Number((el?.textContent ?? '0').replace('€', '').trim())
			const cartes = {}
			for (const id of ['cocktails', 'mocktails', 'shooters', 'short-long-drinks', 'planches']) {
				const bloc = document.getElementById(id)
				if (!bloc) continue
				cartes[id] = {
					boissons: [...bloc.querySelectorAll('.space-y-24 > .w-full')].map(b => ({
						description: b.querySelector('p')?.textContent ?? '',
						image: b.querySelector('img')?.getAttribute('src') ?? '',
						prix: prix(b.querySelector('.text-lg.font-medium')),
						titre: b.querySelector('h3')?.textContent ?? '',
					})),
					prixGlobal: prix(bloc.querySelector('.mb-16 .text-xl')),
				}
			}
			const voyageur = document.getElementById('travelers')
			const plaisirs = [...voyageur.querySelectorAll('.lg\\:grid-cols-3 > div')]
				.filter(d => d.querySelector('h3'))
				.map(d => ({ description: d.querySelector('p')?.textContent ?? '', titre: d.querySelector('h3').textContent }))
			const colonnes = {}
			for (const ligne of document.querySelectorAll('.flex.justify-between.border-b')) {
				const colonne = ligne.parentElement.parentElement.querySelector('h3')?.textContent.trim()
				const [nom, montant] = [...ligne.querySelectorAll('span')]
				if (!colonne || !montant) continue
				colonnes[colonne] = [...(colonnes[colonne] ?? []), { nom: nom.textContent, prix: prix(montant) }]
			}
			return { cartes, colonnes, plaisirs, prixVoyageur: prix(voyageur.querySelector('.mb-16 .text-xl')) }
		})
		const COLLECTIONS_CARTE = {
			cocktails: 'Cocktails',
			mocktails: 'Mocktails',
			planches: 'Planches',
			'short-long-drinks': 'Short_long_drinks',
			shooters: 'Shooters',
		}
		const boisson = (nom, n, champs) => ({
			collectionId: `instantane_${nom.slice(0, 6).toLowerCase()}`,
			collectionName: nom,
			id:
				`${nom
					.replace(/[^a-z]/gi, '')
					.slice(0, 9)
					.toLowerCase()}`.padEnd(12, '0') + String(n).padStart(3, '0'),
			order: n,
			...champs,
		})
		for (const [id, nom] of Object.entries(COLLECTIONS_CARTE)) {
			const { boissons, prixGlobal } = sections.cartes[id]
			// En affichage « global », seul le prix du premier élément est visible : on le reporte sur tous.
			for (const [n, b] of boissons.entries()) {
				const champs = { description: b.description, image: b.image, price: b.prix || prixGlobal, title: b.titre }
				ajouter(nom, boisson(nom, n, champs))
			}
		}
		for (const [n, p] of sections.plaisirs.entries()) {
			const champs = { description: p.description, price: sections.prixVoyageur, title: p.titre }
			ajouter('Travelers_pleasures', boisson('Travelers_pleasures', n, champs))
		}
		for (const [n, l] of (sections.colonnes['Boissons Chaudes'] ?? []).entries()) {
			ajouter('Hot_drinks', boisson('Hot_drinks', n, { price: l.prix, title: l.nom }))
		}
		;(sections.colonnes['Soft Drinks'] ?? []).forEach((l, n) => {
			// Rendu : « {title} {volume ? `(${volume}cl)` : ''} ».
			const m = l.nom.match(/^(.*) \((\d+(?:[.,]\d+)?)cl\)$/)
			const champs = m
				? { title: m[1], volume: Number(m[2].replace(',', '.')) }
				: { title: l.nom.replace(/ $/, ''), volume: 0 }
			ajouter('Softs_drinks', boisson('Softs_drinks', n, { price: l.prix, ...champs }))
		})
		await page.close()
	}

	await navigateur.close()

	// 4. Images : URL PocketBase -> nom de fichier ; octets récupérés via l'optimiseur de la production.
	rmSync(join(RACINE, 'fichiers'), { force: true, recursive: true })
	const aTelecharger = new Map()
	const versNomDeFichier = (nomCollection, e) => {
		for (const [cle, valeur] of Object.entries(e)) {
			if (!/image/i.test(cle) || typeof valeur !== 'string' || !valeur) continue
			const source = new URL(valeur, SITE)
			const urlPb = source.pathname === '/_next/image' ? source.searchParams.get('url') : source.href
			const m = urlPb?.match(/\/api\/files\/([^/]+)\/([^/]+)\/([^/?]+)$/)
			if (!m) throw new Error(`Image sans URL PocketBase : ${nomCollection}.${cle} = ${valeur}`)
			const nom = decodeURIComponent(m[3])
			// Les enregistrements reconstruits prennent l'identifiant de collection et d'enregistrement du fichier.
			if (e.collectionId.startsWith('instantane_')) {
				e.collectionId = m[1]
				e.id = m[2]
			}
			e[cle] = nom
			aTelecharger.set(`${m[1]}/${m[2]}/${nom}`, urlPb)
		}
		return e
	}
	const ATTENDUES = [
		'Battle_Cocktails',
		'Battle_Mocktails',
		'Beers',
		'Cocktails',
		'contact_page',
		'Event_Page',
		'Events',
		'footer',
		'games_pages',
		'Hot_drinks',
		'landing_page',
		'Mocktails',
		'NavBar',
		'Planches',
		'reservation_card',
		'reservation_page',
		'Shooters',
		'Short_long_drinks',
		'Softs_drinks',
		'Travelers_pleasures',
		'who_are_we_page',
		'Wines',
	]
	const manquantes = ATTENDUES.filter(nom => !collections.get(nom)?.size)
	if (manquantes.length) throw new Error(`Collections absentes de l'extraction : ${manquantes.join(', ')}`)

	// Événements : les plus récents suffisent à exercer l'accueil, la une et la frise ; les 100 de la production
	// donneraient une page de 60 000 px et plus de 100 Mo de captures de référence.
	const evenements = [...(collections.get('Events')?.values() ?? [])].sort((a, b) =>
		b.event_date.localeCompare(a.event_date)
	)
	collections.set(
		'Events',
		new Map(
			evenements
				.filter((e, rang) => rang < EVENEMENTS_GARDES || EVENEMENTS_TOUJOURS.includes(e.event_slug))
				.map(e => [e.id, e])
		)
	)
	const sortie = {}
	for (const [nom, liste] of [...collections].sort(([a], [b]) => a.localeCompare(b))) {
		sortie[nom] = [...liste.values()].map(e => versNomDeFichier(nom, e))
	}
	let octets = 0
	for (const [chemin, urlPb] of aTelecharger) {
		const url = `${SITE}/_next/image?url=${encodeURIComponent(urlPb)}&w=${largeurImage(chemin.split('/')[0])}&q=75`
		const reponse = await fetch(url, { headers: { accept: 'image/webp' } })
		if (!reponse.ok) throw new Error(`${reponse.status} ${url}`)
		const contenu = Buffer.from(await reponse.arrayBuffer())
		const cible = join(RACINE, 'fichiers', chemin)
		mkdirSync(dirname(cible), { recursive: true })
		writeFileSync(cible, contenu)
		octets += contenu.length
	}
	writeFileSync(
		join(RACINE, 'pocketbase.json'),
		`${JSON.stringify({ capture: { date: new Date().toISOString(), site: SITE }, collections: sortie }, null, '\t')}\n`
	)
	console.log(
		Object.entries(sortie)
			.map(([n, l]) => `${n} : ${l.length}`)
			.join('\n')
	)
	console.log(`${aTelecharger.size} images, ${(octets / 1e6).toFixed(1)} Mo`)
}
