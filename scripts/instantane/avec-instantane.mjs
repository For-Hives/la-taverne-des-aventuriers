// Lance une commande (build ou start de Next) sur les données figées des tests visuels :
// faux PocketBase servant l'instantané, date figée côté serveur, fuseau de Paris.
// Usage : node scripts/instantane/avec-instantane.mjs <commande...>
import { spawn } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { DATE_FIGEE } from './date-figee.mjs'

const racine = join(dirname(fileURLToPath(import.meta.url)), '../..')
const env = {
	...process.env,
	DATE_FIGEE,
	FAKE_PB_PORT: process.env.FAKE_PB_PORT ?? '18091',
	NEXT_TELEMETRY_DISABLED: '1',
	NODE_OPTIONS:
		`${process.env.NODE_OPTIONS ?? ''} --import ${join(racine, 'scripts/instantane/figer-date.mjs')}`.trim(),
	PB_INSTANTANE: join(racine, 'tests/instantane/pocketbase.json'),
	TZ: 'Europe/Paris',
}
const enfant = spawn(process.execPath, [join(racine, 'scripts/fake-pocketbase.mjs'), ...process.argv.slice(2)], {
	env,
	stdio: 'inherit',
})
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => enfant.kill(signal))
enfant.on('exit', code => {
	process.exitCode = code ?? 1
})
