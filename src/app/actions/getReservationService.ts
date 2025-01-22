'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

/**
 * Interface definition for reservation data structure
 * Defines all properties expected from the PocketBase reservation collection
 */
export interface ReservationPageData {
	collectionId: string
	collectionName: string
	id: string
	how_to_title: string
	description: string
	contacts_button_title: string
	contact_button_url: string
	instagram_url: string
	facebook_url: string
	created: string
	updated: string
}

/**
 * Fetches reservation data from PocketBase
 * @returns {Promise<ReservationPageData>} Promise resolving to reservation data
 * @throws {Error} If PocketBase connection fails or data fetch fails
 */
export async function getReservationData(): Promise<ReservationPageData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [reservation Service]')
	}

	try {
		// Fetch data from PocketBase
		// console.log('Fetching reservation data from PocketBase...')
		const result = await pb.collection('reservation_page').getList(1, 60) // Get first 60 items

		// console.log('Successfully retrieved reservation data')
		return result.items[0] as ReservationPageData
	} catch (error) {
		console.error(
			'Error while fetching reservation data from PocketBase:',
			error
		)
		throw error
	}
}
