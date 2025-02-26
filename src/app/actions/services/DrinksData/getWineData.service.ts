'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

export interface WineData {
	collectionId: string
	collectionName: string
	id: string
	title: string
	type: string
	description: string
	price_glass: number
	price_bottle: number
	order: number
	created: string
	updated: string
}

/**
 * Fetches a list of wine data from PocketBase.
 *
 * This function connects to PocketBase, retrieves up to 60 items from the 'Wines' collection,
 * and returns the data as an array of `WineData`.
 *
 * @returns {Promise<WineData[]>} Promise resolving to an array of `WineData`
 * @throws {Error} If PocketBase connection fails or data fetch fails
 */
export async function getWineData(): Promise<WineData[]> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [WineData Service]')
	}

	try {
		// Fetch up to 60 wines from the PocketBase collection
		const result = await pb.collection('Wines').getList(1, 60, {
			cache: 'no-store',
		}) // Retrieve up to 60 items
		return result.items as WineData[] // Return the list of wines as an array
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching WineData from PocketBase:', error)
		throw error
	}
}
