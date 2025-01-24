'use server'

import { authWithPocketBase } from '@/app/actions/AuthService'

/**
 * Interface representing the structure of drink cards
 * @interface DrinkData
 */
export interface DrinkData {
	collectionId: string
	collectionName: string
	id: string
	title: string
	description: string
	price: number // Assure-toi que price est un nombre (et non une chaîne)
	image: string
	order: number
	created: string
	updated: string
}

// /**
//  * Fetches a specific drink's data from PocketBase using its order number
//  * @param {number} orderNumber - The order number of the desired drink
//  * @returns {Promise<DrinkData>} Promise resolving to the drink data
//  * @throws {Error} If PocketBase connection fails or data fetch fails
//  */
// export async function getDrinkByOrder(
// 	orderNumber: number,
// 	collection: string
// ): Promise<DrinkData> {
// 	// Initialize PocketBase connection
// 	const pb = await authWithPocketBase()
//
// 	// Validate PocketBase connection
// 	if (!pb) {
// 		console.error('PocketBase connection failed')
// 		throw new Error('Failed to connect to PocketBase [drink Card Service]')
// 	}
//
// 	try {
// 		// Fetch data from PocketBase
// 		// console.log('Fetching specific drink data from PocketBase...');
// 		const result = await pb.collection(collection).getList(1, 20) // Get first 20 items
//
// 		// Find the drink with the matching order number
// 		const drink = result.items.find((item: any) => item.order === orderNumber)
//
// 		if (!drink) {
// 			throw new Error(`Drink with order number ${orderNumber} not found`)
// 		}
//
// 		return drink as DrinkData
// 	} catch (error) {
// 		console.error('Error while fetching data from PocketBase:', error)
// 		throw error
// 	}
// }

export async function getDrinkList(collection: string) {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [drink Card Service]')
	}

	try {
		// Fetch data from PocketBase
		// console.log('Fetching specific drink data from PocketBase...');
		// Get first 20 items
		return await pb.collection(collection).getList(1, 20)
	} catch (error) {
		console.error('Error while fetching data from PocketBase:', error)
		throw error
	}
}
