'use server'

import PocketBase from 'pocketbase'

export async function getData() {
	const pb = new PocketBase('https://api.ltda.andy-cinquin.fr')

	try {
		const userData = await pb
			.collection('users')
			.authWithPassword(
				'admin@latavernedesaventuriers.fr',
				'n9@N$Ug$zEmskGFLyd#p'
			)
		const result = await pb.collection('landing_page').getList(1, 20) // Récupère les 20 premiers enregistrements
		return result.items
	} catch (error) {
		console.error(
			"Erreur lors de l'authentification ou de la récupération des données:",
			error
		)
		throw error
	}
}
