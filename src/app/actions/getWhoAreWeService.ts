'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

export interface WhoAreWePageData {
	collectionId: string
	collectionName: string
	id: string
	who_are_we_title: string
	description_card_1: string
	our_history_title: string
	description_card_2: string
	our_services_title: string
	description_card_3: string
	team_title: string
	description_card_4: string
	information_title: string
	description_card_5: string
	created: string
	updated: string
}

/**
 * Fetches whoAreWe data from PocketBase
 * @returns {Promise<WhoAreWePageData>} Promise resolving to whoAreWe data
 * @throws {Error} If PocketBase connection fails or data fetch fails
 */
export async function getWhoAreWePageData(): Promise<WhoAreWePageData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [whoAreWe Service]')
	}

	try {
		// Fetch data from PocketBase
		// console.log('Fetching whoAreWe data from PocketBase...')
		const result = await pb.collection('who_are_we_page').getList(1, 60) // Get first 60 items

		// console.log('Successfully retrieved whoAreWe data')
		return result.items[0] as WhoAreWePageData
	} catch (error) {
		console.error('Error while fetching whoAreWe data from PocketBase:', error)
		throw error
	}
}
