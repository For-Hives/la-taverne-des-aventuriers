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
	schedule_title: string
	schedule_content: string
	contact_email_title: string
	email: string
	contact_socials_title: string
	instagram_url: string
	facebook_url: string
	myludo_url: string
	address_title: string
	address: string
	button_label: string
	button_url: string
	created: string
	updated: string
}

/**
 * Fetches contact data from PocketBase.
 * Retrieves information about how-to section, schedules, contact details, and social media links.
 *
 * @returns {Promise<ContactPageData>} Promise resolving to the contact page data.
 * @throws {Error} If PocketBase connection fails or data fetch fails.
 */
export async function getContactData(): Promise<ContactPageData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [Contact Service]')
	}

	try {
		// Fetch the first 60 items from the 'contact_page' collection
		const result = await pb.collection('contact_page').getList(1, 60)

		if (result.items[0].howtosection_image) {
			result.items[0].howtosection_image = pb.files.getURL(
				result.items[0],
				result.items[0].howtosection_image
			) // Generate the full URL for the event image
		}

		return result.items[0] as ContactPageData
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching contact data from PocketBase:', error)
		throw error
	}
}
