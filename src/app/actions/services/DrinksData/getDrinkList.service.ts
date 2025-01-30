'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

/**
 * Fetches specific drink data from PocketBase based on the provided collection.
 *
 * @param {string} collection - The name of the collection to fetch drink data from.
 * @returns {Promise<any>} Promise resolving to the drink data from the specified collection.
 * @throws {Error} If PocketBase connection fails or data fetch fails.
 */
export async function getDrinkList(collection: string) {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error(
			`Failed to connect to PocketBase [Drink Service for ${collection}]`
		)
	}

	try {
		// Fetch the first 20 items from the specified collection
		const data = await pb.collection(collection).getList(1, 20)
		data.items.forEach(item => {
			if (item.image) {
				item.image = pb.files.getURL(item, item.image)
			}
		})
		return data
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching drink data from PocketBase:', error)
		throw error
	}
}
