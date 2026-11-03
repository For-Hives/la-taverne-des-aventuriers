// Tests unitaires des utilitaires d'affichage (titres colorés, noms des rubriques de la carte, classes CSS).
import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { cn } from '../../src/lib/utils.ts'
import { formatDrinkName } from '../../src/utils/FormatDrinksName.ts'
import { textToSpanColored } from '../../src/utils/textToSpanColored.ts'

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
