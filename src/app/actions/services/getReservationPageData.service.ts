'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

/**
 * Interface definition for the reservation data structure.
 * Defines all properties expected from the PocketBase reservation collection.
 */
export interface ReservationPageData {
	collectionId: string
	collectionName: string
	id: string
	how_to_title: string
	description: string
	created: string
	updated: string
}

/**
 * Fetches reservation data from PocketBase.
 *
 * This function connects to PocketBase, retrieves the first item from the 'reservation_page' collection,
 * and returns it as a `ReservationPageData` object.
 *
 * @returns {Promise<ReservationPageData>} Promise resolving to the `ReservationPageData` object for the reservation page.
 * @throws {Error} If PocketBase connection fails or the data fetch fails.
 */
export async function getReservationData(): Promise<ReservationPageData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [Reservation Service]')
	}

	try {
		// Fetch the first item from the 'reservation_page' collection
		const result = await pb.collection('reservation_page').getList(1, 60) // Retrieve first 60 items (if any)

		// Return the first item as ReservationPageData
		return result.items[0] as ReservationPageData
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching reservation data from PocketBase:', error)
		throw error
	}
}
