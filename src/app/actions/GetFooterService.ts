'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

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
	reservation_link_url: string
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
 * Fetches footer data from PocketBase
 * @returns {Promise<FooterData>} Promise resolving to footer data
 * @throws {Error} If PocketBase connection fails or data fetch fails
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
		// Fetch data from PocketBase
		// console.log('Fetching footer data from PocketBase...')
		const result = await pb.collection('footer').getList(1, 60) // Get first 60 items

		// console.log('Successfully retrieved footer data')
		return result.items[0] as FooterData
	} catch (error) {
		console.error('Error while fetching footer data from PocketBase:', error)
		throw error
	}
}
