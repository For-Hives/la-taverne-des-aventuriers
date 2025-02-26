'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

/**
 * Interface representing the structure of a reservation card.
 * Defines the properties for each reservation card fetched from PocketBase.
 */
export interface ReservationCardData {
	collectionId: string
	collectionName: string
	id: string
	Title: string
	image: string
	description: string
	games_url: string
	button_aria: string
	button_label: string
	button_url: string
	button_myludo_aria: string
	button_myludo_label: string
	button_myludo_url: string
	created: string
	updated: string
}

/**
 * Fetches reservation card data from PocketBase.
 *
 * This function connects to PocketBase, retrieves the first reservation card from the 'reservation_card' collection,
 * and returns it as a `ReservationCardData` object.
 *
 * @returns {Promise<ReservationCardData>} Promise resolving to the `ReservationCardData` object for the reservation card.
 * @throws {Error} If PocketBase connection fails or the data fetch fails.
 */
export async function getReservationCardData(): Promise<ReservationCardData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error(
			'Failed to connect to PocketBase [Reservation Card Service]'
		)
	}

	try {
		// Fetch the first 20 items from the 'reservation_card' collection
		const result = await pb.collection('reservation_card').getList(1, 20, {
			cache: 'no-store',
		})
		result.items.forEach(item => {
			if (item.image) {
				item.image = pb.files.getURL(item, item.image)
			}
		})
		// Return the first reservation card as ReservationCardData
		return result.items[0] as ReservationCardData
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error(
			'Error while fetching reservation card data from PocketBase:',
			error
		)
		throw error
	}
}
