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
		return await pb.collection(collection).getList(1, 20)
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching drink data from PocketBase:', error)
		throw error
	}
}

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
		const result = await pb.collection('Softs_drinks').getList(1, 60) // Retrieve up to 60 soft drinks
		return result.items as SoftDrinkData[] // Return the list of soft drinks as an array
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching SoftDrinkData from PocketBase:', error)
		throw error
	}
}

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
		const result = await pb.collection('Hot_drinks').getList(1, 60) // Retrieve up to 60 hot drinks
		return result.items as HotDrinkData[] // Return the list of hot drinks as an array
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching HotDrinkData from PocketBase:', error)
		throw error
	}
}

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
		const result = await pb.collection('Wines').getList(1, 60) // Retrieve up to 60 items
		return result.items as WineData[] // Return the list of wines as an array
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching WineData from PocketBase:', error)
		throw error
	}
}
