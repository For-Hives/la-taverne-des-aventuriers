// Tests unitaires de l'extraction de l'instantané (charge RSC de Next) et de son service par le faux PocketBase.
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { after, before, describe, test } from 'node:test'

import { enregistrementsRsc, flightDepuisHtml, lignesTexteRsc } from '../instantane/extraire-prod.mjs'

describe('lecture de la charge RSC', () => {
	test('recolle les morceaux self.__next_f.push', () => {
		const html =
			'<script>self.__next_f.push([1,"0:{\\"a\\":1}\\n"])</script><script>self.__next_f.push([1,"1:[]\\n"])</script>'
		assert.equal(flightDepuisHtml(html), '0:{"a":1}\n1:[]\n')
	})

	test('trouve un enregistrement même quand collectionName n’est pas la première clé (clés triées)', () => {
		const flight =
			'5:["$","$L1",null,{"data":{"Important_One":true,"collectionId":"c1","collectionName":"Events","id":"e1","titre":"a } b"}}]\n'
		assert.deepEqual(enregistrementsRsc(flight), [
			{ collectionId: 'c1', collectionName: 'Events', id: 'e1', Important_One: true, titre: 'a } b' },
		])
	})

	test('résout les longues chaînes déportées en lignes texte, longueur comptée en octets', () => {
		const texte = 'Été à la « Taverne »'
		const longueur = Buffer.byteLength(texte).toString(16)
		const flight = `2a:T${longueur},${texte}3:{"collectionId":"c","collectionName":"landing_page","description_text":"$2a","id":"x","vide":"$undefined","prix":"$$5"}\n`
		assert.equal(lignesTexteRsc(flight).get('2a'), texte)
		assert.deepEqual(enregistrementsRsc(flight), [
			{ collectionId: 'c', collectionName: 'landing_page', description_text: texte, id: 'x', prix: '$5' },
		])
	})

	test('refuse une référence introuvable plutôt que de la recopier', () => {
		assert.throws(() => enregistrementsRsc('0:{"collectionName":"x","id":"1","champ":"$ff"}\n'), /non résolue/)
	})
})

describe('instantané servi par le faux PocketBase', () => {
	const PORT = 18291
	const BASE = `http://127.0.0.1:${PORT}`
	let serveur

	before(async () => {
		serveur = spawn(process.execPath, ['scripts/fake-pocketbase.mjs'], {
			env: { ...process.env, FAKE_PB_PORT: String(PORT), PB_INSTANTANE: 'tests/instantane/pocketbase.json' },
			stdio: 'ignore',
		})
		for (let essai = 0; essai < 50; essai++) {
			try {
				await fetch(`${BASE}/api/collections/NavBar/records`)
				return
			} catch {
				await new Promise(r => setTimeout(r, 100))
			}
		}
		throw new Error('faux PocketBase muet')
	})
	after(() => serveur.kill())

	test('chaque image citée par l’instantané est présente dans tests/instantane/fichiers', async () => {
		const { collections } = JSON.parse(readFileSync('tests/instantane/pocketbase.json', 'utf8'))
		let images = 0
		for (const enregistrements of Object.values(collections)) {
			for (const e of enregistrements) {
				for (const [cle, valeur] of Object.entries(e)) {
					if (!/image/i.test(cle) || !valeur) continue
					const reponse = await fetch(`${BASE}/api/files/${e.collectionId}/${e.id}/${encodeURIComponent(valeur)}`)
					assert.equal(reponse.status, 200, `${e.collectionName}.${cle}`)
					assert.equal(reponse.headers.get('content-type'), 'image/webp')
					images++
				}
			}
		}
		assert.ok(images > 20, `${images} images seulement`)
	})

	test('refuse de sortir du dossier des fichiers', async () => {
		const reponse = await fetch(`${BASE}/api/files/..%2F..%2Fpackage.json`)
		assert.equal(reponse.status, 404)
	})

	test('trie comme PocketBase (sort=-event_date)', async () => {
		const { items } = await (await fetch(`${BASE}/api/collections/Events/records?sort=-event_date`)).json()
		const dates = items.map(e => e.event_date)
		assert.deepEqual(dates, [...dates].sort().reverse())
	})
})
