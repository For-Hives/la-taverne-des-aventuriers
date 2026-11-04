// Tests unitaires des utilitaires d'affichage (titres colorés, noms des rubriques de la carte, classes CSS).
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { describe, test } from 'node:test'

import { cn } from '../../src/lib/utils.ts'
import { formatDrinkName } from '../../src/utils/FormatDrinksName.ts'
import {
	htmlToPlainText,
	splitColoredText,
	stripColorMarks,
	textToSpanColored,
} from '../../src/utils/textToSpanColored.ts'

describe('textToSpanColored', () => {
	test('colore chaque passage entre astérisques', () => {
		assert.equal(
			textToSpanColored('*L*a Taverne des *A*venturiers'),
			'<span class="text-custom-red-100">L</span>a Taverne des <span class="text-custom-red-100">A</span>venturiers'
		)
	})
	test('laisse un texte sans astérisque intact', () => {
		assert.equal(textToSpanColored('Événements & Animations'), 'Événements & Animations')
	})
	test('titre réel de la page Événements', () => {
		assert.equal(textToSpanColored('*É*vénements'), '<span class="text-custom-red-100">É</span>vénements')
	})
	test('titres réels de la prod : même rendu qu’avant (hero, landing, page Événements)', () => {
		const rouge = lettre => `<span class="text-custom-red-100">${lettre}</span>`
		assert.equal(
			textToSpanColored('*L*a&nbsp*T*averne&nbspdes *A*venturiers'),
			`${rouge('L')}a&nbsp${rouge('T')}averne&nbspdes ${rouge('A')}venturiers`
		)
		assert.equal(
			textToSpanColored('Votre *bar* à *Jeux* *Nantais* favoris !'),
			`Votre ${rouge('bar')} à ${rouge('Jeux')} ${rouge('Nantais')} favoris !`
		)
		assert.equal(
			textToSpanColored('*É*vénements &amp; *A*nimations'),
			`${rouge('É')}vénements &amp; ${rouge('A')}nimations`
		)
	})
	test('renvois de note : deux astérisques séparées par du texte ne colorent rien', () => {
		const description =
			'<p><strong>Initiation au jeu de rôle</strong>*</p>\r\n<p>Envie de découvrir le jeu de rôle ?</p>' +
			'<p><em>*Certains événements se déroulent en équipes aléatoires.</em></p>'
		assert.equal(textToSpanColored(description), description)
		assert.equal(textToSpanColored('Quiz WTF 2* et Loto* le même soir'), 'Quiz WTF 2* et Loto* le même soir')
	})
	test('un passage de plusieurs mots se colore comme avant le correctif', () => {
		assert.equal(textToSpanColored('*bar à jeux*'), '<span class="text-custom-red-100">bar à jeux</span>')
		assert.equal(
			textToSpanColored('Le *Bar à Jeux* nantais'),
			'Le <span class="text-custom-red-100">Bar à Jeux</span> nantais'
		)
	})
	test('même règle avec espace ou &nbsp; (titres du pied de page)', () => {
		assert.equal(textToSpanColored('*La Taverne*'), '<span class="text-custom-red-100">La Taverne</span>')
		assert.equal(textToSpanColored('*La&nbsp;Taverne*'), '<span class="text-custom-red-100">La&nbsp;Taverne</span>')
		assert.equal(textToSpanColored('* La*'), '* La*')
	})
	test('**gras** (réflexe Markdown) : coloré, sans astérisque visible', () => {
		assert.equal(textToSpanColored('**gras**'), '<span class="text-custom-red-100">gras</span>')
	})
	test('renvois collés à un mot puis ponctuation : rien n’est coloré', () => {
		assert.equal(textToSpanColored('Loto*, Quiz* ce soir'), 'Loto*, Quiz* ce soir')
		assert.equal(textToSpanColored('Quiz*. Loto*'), 'Quiz*. Loto*')
	})
	test('ne colore pas à cheval sur une balise ni une ligne, ni un passage vide', () => {
		assert.equal(textToSpanColored('*a<b>*c</b>'), '*a<b>*c</b>')
		assert.equal(textToSpanColored('*Quiz\nLoto*'), '*Quiz\nLoto*')
		assert.equal(textToSpanColored('**'), '**')
	})
	test('ne touche jamais un attribut HTML', () => {
		const lien = '<a href="https://exemple.fr/*x*">*L*ien</a>'
		assert.equal(
			textToSpanColored(lien),
			'<a href="https://exemple.fr/*x*"><span class="text-custom-red-100">L</span>ien</a>'
		)
	})
	test('valeur absente : chaîne vide', () => {
		assert.equal(textToSpanColored(undefined), '')
	})
})

// Données réelles de la prod (tests/instantane) : chaque titre coloré doit donner le même rendu qu'avec l'ancienne
// règle /\*(.*?)\*/ (celle d'avant la régression), et les descriptions à renvois de note ne doivent rien colorer.
describe('textToSpanColored sur les données réelles de la prod', () => {
	const { collections } = JSON.parse(readFileSync(new URL('../../tests/instantane/pocketbase.json', import.meta.url)))
	const champs = Object.entries(collections).flatMap(([collection, items]) =>
		items.flatMap(item =>
			Object.entries(item)
				.filter(([, valeur]) => typeof valeur === 'string' && valeur.includes('*'))
				.map(([champ, valeur]) => ({ champ: `${collection}.${champ}`, valeur }))
		)
	)
	const ancienneRegle = texte => texte.replace(/\*(.*?)\*/g, '<span class="text-custom-red-100">$1</span>')
	test('l’instantané contient bien des titres colorés et des renvois de note', () => {
		assert.ok(champs.some(({ champ }) => champ === 'landing_page.hero_title'))
		assert.ok(champs.some(({ champ }) => champ === 'Events.event_description'))
	})
	test('titres : même rendu que l’ancienne règle', () => {
		for (const { champ, valeur } of champs.filter(({ champ }) => champ !== 'Events.event_description')) {
			assert.equal(textToSpanColored(valeur), ancienneRegle(valeur), champ)
		}
	})
	test('descriptions d’événements à renvois de note : rien n’est coloré', () => {
		const descriptions = champs.filter(({ champ }) => champ === 'Events.event_description')
		for (const { champ, valeur } of descriptions) {
			assert.equal(textToSpanColored(valeur), valeur, champ)
			// Même HTML sur une seule ligne (l'éditeur ne garantit pas les sauts de ligne) : l'ancienne règle y colorait
			// tout le passage entre deux renvois, la nouvelle ne colore toujours rien.
			const surUneLigne = valeur.replace(/\r?\n/g, '')
			assert.equal(textToSpanColored(surUneLigne), surUneLigne, `${champ} sur une ligne`)
		}
		assert.ok(
			descriptions.some(({ valeur }) => ancienneRegle(valeur.replace(/\r?\n/g, '')) !== valeur.replace(/\r?\n/g, ''))
		)
	})
})

describe('splitColoredText (champs en texte brut, rendus par React)', () => {
	test('découpe en morceaux normaux et colorés', () => {
		assert.deepEqual(splitColoredText('*S*oirée *Loups-Garous* !'), [
			{ colored: true, text: 'S' },
			{ colored: false, text: 'oirée ' },
			{ colored: true, text: 'Loups-Garous' },
			{ colored: false, text: ' !' },
		])
	})
	test('sans astérisque : un seul morceau, le texte d’origine', () => {
		assert.deepEqual(splitColoredText('Programmation Novembre'), [{ colored: false, text: 'Programmation Novembre' }])
		assert.deepEqual(splitColoredText(''), [{ colored: false, text: '' }])
	})
	test('le HTML n’est pas interprété : il reste du texte (React l’échappe)', () => {
		assert.deepEqual(splitColoredText('*<b>*'), [{ colored: false, text: '*<b>*' }])
		assert.deepEqual(splitColoredText('*&*'), [{ colored: true, text: '&' }])
	})
	test('une astérisque de renvoi reste affichée', () => {
		assert.deepEqual(splitColoredText('Loups-Garous*'), [{ colored: false, text: 'Loups-Garous*' }])
	})
})

describe('stripColorMarks et htmlToPlainText (balise title, meta, alt, aria-label, JSON-LD)', () => {
	test('retire les astérisques de coloration et garde les lettres', () => {
		assert.equal(stripColorMarks('*E*xplorer Notre Collection Complète'), 'Explorer Notre Collection Complète')
		assert.equal(stripColorMarks('*S*oirée *Loups-Garous*'), 'Soirée Loups-Garous')
	})
	test('garde les astérisques de renvoi de note', () => {
		assert.equal(stripColorMarks('Initiation au jeu de rôle*'), 'Initiation au jeu de rôle*')
		assert.equal(stripColorMarks('Quiz* puis *Certains'), 'Quiz* puis *Certains')
	})
	test('champ HTML : entités et balises en texte, puis astérisques retirées', () => {
		assert.equal(htmlToPlainText('*L*a&nbsp*T*averne&nbspdes *A*venturiers'), 'La Taverne des Aventuriers')
		assert.equal(htmlToPlainText('*É*vénements &amp; *A*nimations'), 'Événements & Animations')
		assert.equal(htmlToPlainText('<p>*B*ienvenue&nbsp;!</p>'), 'Bienvenue !')
	})
	test('htmlToPlainText décode les entités de l’éditeur de PocketBase', () => {
		assert.equal(htmlToPlainText('R&eacute;servez &agrave; l&rsquo;avance'), 'Réservez à l’avance')
		assert.equal(htmlToPlainText('No&euml;l &ccedil;a &#233;t&#xE9; &oelig;uvre'), 'Noël ça été œuvre')
		assert.equal(htmlToPlainText('&lt;b&gt; &inconnue;'), '<b> &inconnue;')
	})
	test('htmlToPlainText : la coloration ne déborde pas sur une balise', () => {
		assert.equal(htmlToPlainText('<b>*L*</b>a'), 'L a')
	})
})

describe('formatDrinkName', () => {
	test('cas particulier des short et long drinks', () => {
		assert.equal(formatDrinkName('Short_long_drinks'), 'Short / Long Drinks')
	})
	test('remplace les soulignés et met une majuscule à chaque mot', () => {
		assert.equal(formatDrinkName('Cocktails'), 'Cocktails')
		assert.equal(formatDrinkName('hot_drinks'), 'Hot Drinks')
		assert.equal(formatDrinkName('Travelers_pleasures'), 'Travelers Pleasures')
	})
})

describe('cn', () => {
	test('fusionne les classes Tailwind en conflit (la dernière gagne)', () => {
		assert.equal(cn('px-2 py-1', 'px-4'), 'py-1 px-4')
	})
	test('ignore les valeurs fausses', () => {
		assert.equal(cn('a', false, undefined, null, 'b'), 'a b')
	})
})
