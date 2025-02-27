'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

export interface TravelersPleasureData {
	collectionId: string
	collectionName: string
	id: string
	title: string
	description: string
	price: number
	order: number
	created: string
	updated: string
}

/**
 * Fetches a list of travelers' pleasures from PocketBase.
 *
 * This function connects to PocketBase, retrieves up to 60 items from the 'Travelers_pleasures' collection,
 * and returns the data as an array of `TravelersPleasureData`.
 *
 * @returns {Promise<TravelersPleasureData[]>} Promise resolving to an array of `TravelersPleasureData`
 * @throws {Error} If PocketBase connection fails or data fetch fails
 */
export async function getTravelersPleasureData(): Promise<
	TravelersPleasureData[]
> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error(
			'Failed to connect to PocketBase [TravelersPleasureData Service]'
		)
	}

	try {
		// Fetch up to 60 travelers' pleasures from the PocketBase collection
		const result = await pb.collection('Travelers_pleasures').getList(1, 60) // Retrieve up to 60 items
		return result.items as TravelersPleasureData[] // Return the list of travelers' pleasures as an array
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error(
			'Error while fetching TravelersPleasureData from PocketBase:',
			error
		)
		throw error
	}
}
