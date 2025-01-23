'use server'

import { authWithPocketBase } from '@/app/actions/AuthService'

/**
 * Interface representing the structure of cocktails cards
 * @interface CocktailsData
 */
export interface CocktailsData {
	collectionId: string
	collectionName: string
	id: string
	title: string
	description: string
	price: string
	image: string
	order: number
	created: string
	updated: string
}

/**
 * Fetches a specific cocktail's data from PocketBase using its order number
 * @param {number} orderNumber - The order number of the desired cocktail
 * @returns {Promise<CocktailsData>} Promise resolving to the cocktail data
 * @throws {Error} If PocketBase connection fails or data fetch fails
 */
export async function getCocktailByOrder(
	orderNumber: number,
	collection: string
): Promise<CocktailsData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [cocktails Card Service]')
	}

	try {
		// Fetch data from PocketBase
		// console.log('Fetching specific cocktail data from PocketBase...');
		const result = await pb.collection(collection).getList(1, 20) // Get first 20 items

		// Find the cocktail with the matching order number
		const cocktail = result.items.find(
			(item: any) => item.order === orderNumber
		)

		if (!cocktail) {
			throw new Error(`Cocktail with order number ${orderNumber} not found`)
		}

		return cocktail as CocktailsData
	} catch (error) {
		console.error('Error while fetching data from PocketBase:', error)
		throw error
	}
}
