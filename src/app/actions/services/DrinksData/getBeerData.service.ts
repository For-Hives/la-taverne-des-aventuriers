'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

export interface BeerData {
	collectionId: string
	collectionName: string
	id: string
	title: string
	description: string
	volume: number
	price: number
	order: number
	created: string
	updated: string
}

/*
 * Fetches a list of beer data from PocketBase.
 *
 * This function connects to PocketBase, retrieves up to 60 items from the 'Beers' collection,
 * and returns the data as an array of `BeerData`.
 *
 * @returns {Promise<BeerData[]>} Promise resolving to an array of `BeerData`
 * @throws {Error} If PocketBase connection fails or data fetch fails
 */
export async function getBeerData(): Promise<BeerData[]> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed') // Log an error if the connection fails
		throw new Error('Failed to connect to PocketBase [BeerData Service]') // Throw an error if connection is unsuccessful
	}

	try {
		// Fetch up to 60 beers from the 'Beers' collection in PocketBase
		const result = await pb.collection('Beers').getList(1, 60) // Retrieve up to 60 items

		// Return the fetched data, mapping it to the BeerData interface
		return result.items.map(beer => ({
			collectionId: beer.collectionId,
			collectionName: beer.collectionName,
			created: beer.created,
			description: beer.description,
			id: beer.id,
			order: beer.order,
			price: beer.price,
			title: beer.title,
			updated: beer.updated,
			volume: beer.volume,
		})) // Return the mapped items directly
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching BeerData from PocketBase:', error)
		throw error
	}
}
