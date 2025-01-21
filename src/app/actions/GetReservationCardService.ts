'use server'

import { authWithPocketBase } from '@/app/actions/AuthService'

/**
 * Interface representing the structure of a reservation card
 * @interface ReservationCardData
 */
export interface ReservationCardData {
	collectionId: string
	collectionName: string
	id: string
	Title: string
	image: string
	description: string
	games_url: string
	button_label: string
	button_url: string
	created: string
	updated: string
}

/**
 * Fetches landing page data from PocketBase
 * @returns {Promise<ReservationCardData>} Promise resolving to reservation card data
 * @throws {Error} If PocketBase connection fails or data fetch fails
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
		// Fetch data from PocketBase
		// console.log('Fetching reservation card data from PocketBase...')
		const result = await pb.collection('reservation_card').getList(1, 20) // Get first 20 items

		// console.log('Successfully retrieved reservation card data')
		return result.items[0] as ReservationCardData
	} catch (error) {
		console.error('Error while fetching data from PocketBase:', error)
		throw error
	}
}
