'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

/**
 * Interface definition for Contact data structure
 * Defines all properties expected from the PocketBase contact collection
 */
export interface ContactPageData {
	collectionId: string
	collectionName: string
	id: string
	howtosection_title: string
	howtosection_description: string
	howtosection_image: string
	schedules_title: string
	schedules_monday: string
	schedules_tuesday: string
	schedules_wednesday: string
	schedules_thursday: string
	schedules_friday: string
	schedules_saturday: string
	schedules_sunday: string
	contact_email_title: string
	email: string
	contact_socials_title: string
	instagram_url: string
	facebook_url: string
	twitter_url: string
	adress_title: string
	address: string
	button_label: string
	button_url: string
	created: string
	updated: string
}

/**
 * Fetches contact data from PocketBase
 * @returns {Promise<ContactPageData>} Promise resolving to contact data
 * @throws {Error} If PocketBase connection fails or data fetch fails
 */
export async function getContactData(): Promise<ContactPageData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [contact Service]')
	}

	try {
		// Fetch data from PocketBase
		// console.log('Fetching contact data from PocketBase...')
		const result = await pb.collection('contact_page').getList(1, 60) // Get first 60 items

		// console.log('Successfully retrieved contact data')
		return result.items[0] as ContactPageData
	} catch (error) {
		console.error('Error while fetching contact data from PocketBase:', error)
		throw error
	}
}
