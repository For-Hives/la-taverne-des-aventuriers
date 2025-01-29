import 'server-only' // Indique que ce fichier doit être exécuté côté serveur uniquement
import PocketBase from 'pocketbase' // Importe la bibliothèque PocketBase pour l'utiliser

export const authWithPocketBase = async (): Promise<PocketBase | null> => {
	const token = process.env.PB_USER_TOKEN
	const url = process.env.PB_SERVER_URL

	if (!token) {
		return null
	}

	const pb = new PocketBase(url)

	pb.authStore.save(token, null)

	return pb
}
