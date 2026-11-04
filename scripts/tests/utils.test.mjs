// Tests unitaires des utilitaires d'affichage (titres colorés, noms des rubriques de la carte, classes CSS).
import assert from 'node:assert/strict'
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
	test('ne colore pas un passage avec une espace, ni à cheval sur une balise', () => {
		assert.equal(textToSpanColored('*bar à jeux*'), '*bar à jeux*')
		assert.equal(textToSpanColored('*a<b>*c</b>'), '*a<b>*c</b>')
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
	test('htmlToPlainText laisse &lt; encodé (le texte peut finir dans un script JSON-LD)', () => {
		assert.equal(htmlToPlainText('&lt;/script&gt;'), '&lt;/script&gt;')
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
