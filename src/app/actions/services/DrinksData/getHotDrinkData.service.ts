'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

export interface HotDrinkData {
	collectionId: string
	collectionName: string
	id: string
	title: string
	price: number
	order: number
	created: string
	updated: string
}

/**
 * Fetches a list of hot drinks from PocketBase.
 *
 * This function connects to PocketBase, retrieves up to 60 hot drinks from the 'Hot_drinks' collection,
 * and returns the data as an array of `HotDrinkData`.
 *
 * @returns {Promise<HotDrinkData[]>} Promise resolving to an array of `HotDrinkData`
 * @throws {Error} If PocketBase connection fails or data fetch fails
 */
export async function getHotDrinkData(): Promise<HotDrinkData[]> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [HotDrinkData Service]')
	}

	try {
		// Fetch up to 60 hot drinks from PocketBase collection
		const result = await pb.collection('Hot_drinks').getList(1, 60, {
			cache: 'no-store',
		}) // Retrieve up to 60 hot drinks
		return result.items as HotDrinkData[] // Return the list of hot drinks as an array
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching HotDrinkData from PocketBase:', error)
		throw error
	}
}
