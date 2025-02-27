'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

export interface WhoAreWePageData {
	collectionId: string
	collectionName: string
	id: string
	who_are_we_title: string
	description_card_1: string
	image_card1: string
	our_history_title: string
	description_card_2: string
	our_services_title: string
	description_card_3: string
	team_title: string
	description_card_4: string
	information_title: string
	description_card_5: string
	image_card5: string
	created: string
	updated: string
}

/**
 * Fetches the "Who Are We" page data from PocketBase.
 *
 * This function connects to PocketBase, retrieves the first item from the 'who_are_we_page' collection,
 * and returns it as a `WhoAreWePageData` object.
 *
 * @returns {Promise<WhoAreWePageData>} Promise resolving to the `WhoAreWePageData` object for the "Who Are We" page.
 * @throws {Error} If PocketBase connection fails or the data fetch fails.
 */
export async function getWhoAreWePageData(): Promise<WhoAreWePageData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [WhoAreWe Service]')
	}

	try {
		// Fetch the first item from the 'who_are_we_page' collection
		const result = await pb.collection('who_are_we_page').getList(1, 60) // Retrieve first 60 items (if any)
		result.items.forEach(item => {
			if (item.image_card1) {
				item.image_card1 = pb.files.getURL(item, item.image_card1)
			}
			if (item.image_card5) {
				item.image_card5 = pb.files.getURL(item, item.image_card5)
			}
		})
		// Return the first item as WhoAreWePageData
		return result.items[0] as WhoAreWePageData
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching WhoAreWe data from PocketBase:', error)
		throw error
	}
}
