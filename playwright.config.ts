import { defineConfig } from '@playwright/test'

// Tests e2e et visuels, sur un `next start` alimenté par l'instantané des données (tests/instantane)
// et une date figée : voir scripts/instantane/avec-instantane.mjs.
// Les captures de référence se produisent dans l'image Docker officielle de Playwright, la même qu'en CI :
// pnpm test:visuel:docker (vérifier) et pnpm test:visuel:maj (régénérer).
const PORT = Number(process.env.E2E_PORT ?? 13300)
const URL_BASE = `http://127.0.0.1:${PORT}`

export default defineConfig({
	expect: {
		timeout: 15_000,
		toHaveScreenshot: {
			animations: 'disabled',
			caret: 'hide',
			// Seuil zéro : un seul pixel différent, sur un seul canal, fait échouer le test.
			maxDiffPixels: 0,
			scale: 'css',
			threshold: 0,
		},
	},
	forbidOnly: Boolean(process.env.CI),
	fullyParallel: true,
	outputDir: 'test-results',
	projects: [
		{ name: 'bureau', use: { viewport: { height: 900, width: 1440 } } },
		// isMobile reste désactivé : en émulation mobile, Chromium élargit la fenêtre à la largeur du contenu, et
		// /contact et /reservation débordent (100vw de la carte, lien YouTube) : largeur 406 ou 414 selon le moment,
		// donc des captures instables. Sans isMobile, la page fait 390 px et son débordement reste visible.
		{ name: 'telephone', use: { hasTouch: true, isMobile: false, viewport: { height: 844, width: 390 } } },
	],
	reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : [['list']],
	retries: 0,
	snapshotPathTemplate: '{testDir}/captures/{projectName}/{arg}{ext}',
	testDir: 'tests/e2e',
	timeout: 180_000,
	use: {
		baseURL: URL_BASE,
		colorScheme: 'light',
		deviceScaleFactor: 1,
		locale: 'fr-FR',
		reducedMotion: 'reduce',
		serviceWorkers: 'block',
		timezoneId: 'Europe/Paris',
		trace: 'retain-on-failure',
	},
	webServer: {
		command: `node scripts/instantane/avec-instantane.mjs node_modules/.bin/next start -H 127.0.0.1 -p ${PORT}`,
		reuseExistingServer: false,
		stdout: 'ignore',
		timeout: 120_000,
		url: `${URL_BASE}/robots.txt`,
	},
	workers: Number(process.env.E2E_WORKERS ?? 2),
})
