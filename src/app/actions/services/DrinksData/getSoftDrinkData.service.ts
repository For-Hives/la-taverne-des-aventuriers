'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

export interface SoftDrinkData {
	collectionId: string
	collectionName: string
	id: string
	title: string
	volume: number
	price: number
	order: number
	created: string
	updated: string
}

/**
 * Fetches a list of soft drinks from PocketBase.
 *
 * This function connects to PocketBase, retrieves up to 60 soft drinks from the 'Softs_drinks' collection,
 * and returns the data as an array of `SoftDrinkData`.
 *
 * @returns {Promise<SoftDrinkData[]>} Promise resolving to an array of `SoftDrinkData`
 * @throws {Error} If PocketBase connection fails or data fetch fails
 */
export async function getSoftDrinkData(): Promise<SoftDrinkData[]> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [SoftDrinkData Service]')
	}

	try {
		// Fetch up to 60 soft drinks from PocketBase collection
		const result = await pb.collection('Softs_drinks').getList(1, 60, {
			cache: 'no-store',
		}) // Retrieve up to 60 soft drinks
		return result.items as SoftDrinkData[] // Return the list of soft drinks as an array
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching SoftDrinkData from PocketBase:', error)
		throw error
	}
}
