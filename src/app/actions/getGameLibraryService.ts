'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

export interface GamesPageData {
	collectionId: string
	collectionName: string
	id: string
	games_hero_title: string
	games_hero_description: string
	Card_Title: string
	card1_title: string
	card1_description: string
	card1_button_label: string
	card1_button_url: string
	card2_title: string
	card2_description: string
	card2_button_label: string
	card2_button_url: string
	card3_title: string
	card3_description: string
	card3_button_label: string
	card3_button_url: string
	myludo_component_title: string
	myludo_component_label: string
	myludo_component_url: string
	created: string
	updated: string
}

/**
 * Fetches GameLibrary data from PocketBase
 * @returns {Promise<GamesPageData>} Promise resolving to GameLibrary data
 * @throws {Error} If PocketBase connection fails or data fetch fails
 */
export async function getGameLibraryPageData(): Promise<GamesPageData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [GameLibrary Service]')
	}

	try {
		// Fetch data from PocketBase
		// console.log('Fetching GameLibrary data from PocketBase...')
		const result = await pb.collection('games_pages').getList(1, 60) // Get first 60 items

		// console.log('Successfully retrieved GameLibrary data')
		return result.items[0] as GamesPageData
	} catch (error) {
		console.error(
			'Error while fetching GameLibrary data from PocketBase:',
			error
		)
		throw error
	}
}
