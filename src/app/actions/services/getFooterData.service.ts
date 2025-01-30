'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

/**
 * Interface representing the structure of footer data.
 * Defines the properties for the data fetched from the PocketBase 'footer' collection.
 */
export interface FooterData {
	collectionId: string
	collectionName: string
	id: string
	bar_title: string
	support_title: string
	menu_link_title: string
	menu_url: string
	description_title: string
	description_url: string
	events_title: string
	events_url: string
	contact_title: string
	contact_url: string
	reservation_link_label: string
	reservation_url: string
	game_library_title: string
	game_library_url: string
	socials_title: string
	facebook_url: string
	instagram_url: string
	twitter_url: string
	copyright: string
	image1: string
	image2: string
	created: string
	updated: string
}

/**
 * Fetches footer data from PocketBase.
 *
 * This function connects to PocketBase and retrieves data from the 'footer' collection,
 * returning the data as a `FooterData` object.
 *
 * @returns {Promise<FooterData>} Promise resolving to the `FooterData` object for the footer section.
 * @throws {Error} If PocketBase connection fails or data fetch fails.
 */
export async function getFooterData(): Promise<FooterData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [Footer Service]')
	}

	try {
		// Fetch the first 60 items from the 'footer' collection
		const result = await pb.collection('footer').getList(1, 60)
		result.items.forEach(item => {
			if (item.image1) {
				item.image1 = pb.files.getURL(item, item.image1)
			}
			if (item.image2) {
				item.image2 = pb.files.getURL(item, item.image2)
			}
		})
		// Return the first item as FooterData
		return result.items[0] as FooterData
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching footer data from PocketBase:', error)
		throw error
	}
}
