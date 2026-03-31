'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

/**
 * Interface definition for Contact data structure
 * Defines all properties expected from the PocketBase contact collection
 */
export interface MocktailBattleData {
	collectionId: string
	collectionName: string
	id: string
	explanation: string
	mocktail_1_image: string
	mocktail1_title: string
	mocktail1_description: string
	mocktail1_score: number
	mocktail_2_image: string
	mocktail2_title: string
	mocktail2_description: string
	mocktail2_score: number
	mocktail1_stars: number
	mocktail2_stars: number
	created: string
	updated: string
	chain_win_label: string
	chain_win_score: number
}

/**
 * Fetches contact data from PocketBase.
 * Retrieves information about how-to section, schedules, contact details, and social media links.
 *
 * @returns {Promise<MocktailBattleData>} Promise resolving to the contact page data.
 * @throws {Error} If PocketBase connection fails or data fetch fails.
 */
export async function getMocktailBattleData(): Promise<MocktailBattleData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [mocktailbattle Service]')
	}

	try {
		// Fetch the first 60 items from the 'MocktailBattleData' collection
		const result = await pb.collection('Battle_Mocktails').getList(1, 60)

		if (result.items[0].mocktail_1_image) {
			result.items[0].mocktail_1_image = pb.files.getURL(result.items[0], result.items[0].mocktail_1_image) // Generate the full URL for the event image
		}
		if (result.items[0].mocktail_2_image) {
			result.items[0].mocktail_2_image = pb.files.getURL(result.items[0], result.items[0].mocktail_2_image) // Generate the full URL for the event image
		}

		return result.items[0] as MocktailBattleData
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching contact data from PocketBase:', error)
		throw error
	}
}
