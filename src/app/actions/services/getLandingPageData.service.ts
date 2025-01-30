'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

/**
 * Interface representing the structure of the landing page data.
 * Defines the properties for the data fetched from the PocketBase 'landing_page' collection.
 */
export interface LandingPageData {
	collectionId: string
	collectionName: string
	created: string
	description_button_label: string
	description_button_url: string
	description_image: string
	description_text: string
	description_title: string
	event_card1_button_label: string
	event_card1_button_url: string
	event_card1_date: string
	event_card1_description: string
	event_card1_image: string
	event_card1_title: string
	event_card2_button_label: string
	event_card2_button_url: string
	event_card2_date: string
	event_card2_description: string
	event_card2_image: string
	event_card2_title: string
	event_card3_button_label: string
	event_card3_button_url: string
	event_card3_date: string
	event_card3_description: string
	event_card3_image: string
	event_card3_title: string
	events_title: string
	hero_description: string
	hero_left_button_label: string
	hero_left_button_url: string
	hero_right_button_label: string
	hero_right_button_url: string
	hero_title: string
	id: string
	updated: string
}

/**
 * Fetches landing page data from PocketBase.
 *
 * This function connects to PocketBase and retrieves the landing page data from the 'landing_page' collection.
 * It returns the data as a `LandingPageData` object.
 *
 * @returns {Promise<LandingPageData>} Promise resolving to the `LandingPageData` object for the landing page.
 * @throws {Error} If PocketBase connection fails or the data fetch fails.
 */
export async function getLandingData(): Promise<LandingPageData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [Landing Service]')
	}

	try {
		// Fetch the first 20 items from the 'landing_page' collection
		const result = await pb.collection('landing_page').getList(1, 20)
		// Return the first item as LandingPageData
		return result.items[0] as LandingPageData
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error(
			'Error while fetching landing page data from PocketBase:',
			error
		)
		throw error
	}
}
