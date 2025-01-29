import 'server-only' // Indique que ce fichier doit être exécuté côté serveur uniquement
import PocketBase from 'pocketbase' // Importe la bibliothèque PocketBase pour l'utiliser

let instance: PocketBase | null = null

export const authWithPocketBase = async (): Promise<PocketBase | null> => {
	if (instance && instance?.authStore?.isValid) {
		return instance
	}
	const token = process.env.PB_USER_TOKEN
	const url = process.env.PB_SERVER_URL

	if (!token) {
		return null
	}

	instance = new PocketBase(url)
	instance.authStore.save(token, null)

	return instance
}
