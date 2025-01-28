import 'server-only' // Indique que ce fichier doit être exécuté côté serveur uniquement
import PocketBase from 'pocketbase' // Importe la bibliothèque PocketBase pour l'utiliser

/**
 * Authenticate with PocketBase using email and password
 * @returns {Promise<PocketBase | null>} Promise résolvant avec l'instance PocketBase ou null si l'authentification échoue
 */
export const authWithPocketBase = async (): Promise<PocketBase | null> => {
	// Récupère les variables d'environnement nécessaires pour l'authentification
	const pb_env = {
		PB_SERVER_URL: process.env.PB_SERVER_URL, // URL du serveur PocketBase
		PB_USER_EMAIL: process.env.PB_USER_EMAIL, // Email de l'utilisateur pour l'authentification
		PB_USER_PASSWORD: process.env.PB_USER_PASSWORD, // Mot de passe de l'utilisateur pour l'authentification
	}

	// Crée une instance de PocketBase en utilisant l'URL du serveur
	const pb = new PocketBase(pb_env.PB_SERVER_URL)

	// Vérifie si les informations d'identification (email et mot de passe) sont présentes
	if (pb_env.PB_USER_EMAIL && pb_env.PB_USER_PASSWORD) {
		// Authentifie l'utilisateur avec les informations fournies
		await pb
			.collection('users') // Sélectionne la collection des utilisateurs
			.authWithPassword(pb_env.PB_USER_EMAIL, pb_env.PB_USER_PASSWORD) // Authentifie avec l'email et le mot de passe
		// Si l'authentification est réussie, retourne l'instance PocketBase
		return pb
	}
	// Si les informations de connexion sont manquantes ou invalides, retourne null
	return null
}
