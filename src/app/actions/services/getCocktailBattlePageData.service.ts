'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

/**
 * Interface definition for Contact data structure
 * Defines all properties expected from the PocketBase contact collection
 */
export interface CocktailBattleData {
	collectionId: string
	collectionName: string
	id: string
	cocktail_1_image: string
	cocktail1_title: string
	cocktail1_description: string
	cocktail1_score: number
	cocktail_2_image: string
	cocktail2_title: string
	cocktail2_description: string
	cocktail2_score: number
	created: string
	updated: string
}

/**
 * Fetches contact data from PocketBase.
 * Retrieves information about how-to section, schedules, contact details, and social media links.
 *
 * @returns {Promise<CocktailBattleData>} Promise resolving to the contact page data.
 * @throws {Error} If PocketBase connection fails or data fetch fails.
 */
export async function getCocktailBattleData(): Promise<CocktailBattleData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [cocktailbattle Service]')
	}

	try {
		// Fetch the first 60 items from the 'CocktailBattleData' collection
		const result = await pb.collection('Battle_Cocktails').getList(1, 60)

		if (result.items[0].cocktail_1_image) {
			result.items[0].cocktail_1_image = pb.files.getURL(
				result.items[0],
				result.items[0].cocktail_1_image
			) // Generate the full URL for the event image
		}
		if (result.items[0].cocktail_2_image) {
			result.items[0].cocktail_2_image = pb.files.getURL(
				result.items[0],
				result.items[0].cocktail_2_image
			) // Generate the full URL for the event image
		}

		return result.items[0] as CocktailBattleData
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching contact data from PocketBase:', error)
		throw error
	}
}
