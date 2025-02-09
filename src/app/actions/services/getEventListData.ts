'use server'
import { authWithPocketBase } from '@/app/actions/AuthService' // Importing the function to authenticate and connect with PocketBase
import { EventData } from '@/app/actions/services/getEventData'

/**
 * Fetches event data from PocketBase.
 *
 * This function connects to PocketBase and retrieves data from the 'Events' collection,
 * returning the data as an array of `EventListData[]` objects.
 *
 * @returns {Promise<EventListData[]>} Promise that resolves to an array of `EventListData` for the events.
 * @throws {Error} If the PocketBase connection fails or data retrieval fails.
 */
export async function getEventListData(): Promise<EventData[]> {
	const pb = await authWithPocketBase() // Authenticate and get the PocketBase instance

	if (!pb) {
		console.error('Failed to connect to PocketBase') // Log error if connection fails
		throw new Error('Failed to connect to PocketBase') // Throw error if connection fails
	}

	try {
		// Fetch a list of events (1 page, up to 100 items)
		const result = await pb.collection('Events').getList(1, 100)

		// Ensure 'items' is an array before mapping over it
		if (Array.isArray(result.items)) {
			result.items.forEach(item => {
				if (item.event_image) {
					// If event has an image
					item.event_image = pb.files.getURL(item, item.event_image) // Generate the image URL
				}
			})

			// Return the correctly typed array of events
			return result.items as EventData[]
		} else {
			throw new Error('The returned data is not in array form') // Handle if items is not an array
		}
	} catch (error) {
		console.error('Error fetching events from PocketBase:', error) // Log any error during the fetch operation
		throw error // Rethrow the error
	}
}
