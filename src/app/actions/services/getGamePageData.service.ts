'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

/**
 * Interface representing the structure of the games page data.
 * Defines the properties for the data fetched from the PocketBase 'games_pages' collection.
 */
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
	card1_button_aria: string
	card2_title: string
	card2_description: string
	card2_button_label: string
	card2_button_url: string
	card2_button_aria: string
	card3_title: string
	card3_description: string
	card3_button_label: string
	card3_button_url: string
	card3_button_aria: string
	myludo_component_title: string
	myludo_component_label: string
	myludo_component_url: string
	myludo_component_aria: string
	created: string
	updated: string
}

/**
 * Fetches game library page data from PocketBase.
 *
 * This function connects to PocketBase and retrieves data from the 'games_pages' collection,
 * returning the data as a `GamesPageData` object.
 *
 * @returns {Promise<GamesPageData>} Promise resolving to the `GamesPageData` object for the game library page.
 * @throws {Error} If PocketBase connection fails or data fetch fails.
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
		// Fetch the first 60 items from the 'games_pages' collection
		const result = await pb.collection('games_pages').getList(1, 60, {
			cache: 'no-store',
		})
		// Return the first item as GamesPageData
		return result.items[0] as GamesPageData
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error(
			'Error while fetching game library data from PocketBase:',
			error
		)
		throw error
	}
}
