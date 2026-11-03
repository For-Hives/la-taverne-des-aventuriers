// Chargé par `node --import` pour les tests unitaires et d'intégration : résout l'alias « @/ » de tsconfig vers
// src/, ajoute l'extension .ts des modules du dépôt et neutralise « server-only » (qui refuse tout hors Next).
import { existsSync } from 'node:fs'
import { registerHooks } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SRC = fileURLToPath(new URL('../../src/', import.meta.url))
const VIDE = 'data:text/javascript,export {}'

registerHooks({
	resolve(specifier, context, nextResolve) {
		if (specifier === 'server-only') return { shortCircuit: true, url: VIDE }
		if (specifier.startsWith('@/')) {
			const base = SRC + specifier.slice(2)
			const fichier = ['.ts', '.tsx', '/index.ts'].map(ext => base + ext).find(existsSync) ?? base
			return { shortCircuit: true, url: pathToFileURL(fichier).href }
		}
		return nextResolve(specifier, context)
	},
})
