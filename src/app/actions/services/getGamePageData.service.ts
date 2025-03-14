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
	card1_image: string // Image URL for card1

	card2_title: string
	card2_description: string
	card2_button_label: string
	card2_button_url: string
	card2_button_aria: string
	card2_image: string // Image URL for card2

	card3_title: string
	card3_description: string
	card3_button_label: string
	card3_button_url: string
	card3_button_aria: string
	card3_image: string // Image URL for card3

	myludo_component_url: string
	myludo_component_title: string
	myludo_component_description: string
	myludo_component_button_label: string
	myludo_component_button_url: string
	myludo_component_button_aria: string
	myludo_component_image: string
	created: string
	updated: string
}

/**
 * Retrieves game library page data from PocketBase.
 *
 * This function connects to PocketBase and fetches data from the 'games_pages' collection,
 * processes image URLs and returns a `GamesPageData` object.
 *
 * @returns {Promise<GamesPageData>} Promise resolving to the `GamesPageData` object for the game library page.
 * @throws {Error} If PocketBase connection fails or if data retrieval fails.
 */
export async function getGamePageData(): Promise<GamesPageData> {
	const pb = await authWithPocketBase()

	// Valider la connexion PocketBase
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [GameLibrary Service]')
	}

	try {
		const result = await pb.collection('games_pages').getList(1, 60)

		result.items.forEach(item => {
			if (item.card1_image) {
				item.card1_image = pb.files.getURL(item, item.card1_image)
			}
			if (item.card2_image) {
				item.card2_image = pb.files.getURL(item, item.card2_image)
			}
			if (item.card3_image) {
				item.card3_image = pb.files.getURL(item, item.card3_image)
			}
			if (item.myludo_component_image) {
				item.myludo_component_image = pb.files.getURL(
					item,
					item.myludo_component_image
				)
			}
		})

		return result.items[0] as GamesPageData
	} catch (error) {
		console.error(
			'Error while fetching game library data from PocketBase:',
			error
		)
		throw error
	}
}
