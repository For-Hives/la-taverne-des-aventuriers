// Importing the necessary functions for PocketBase authentication and slug generation
import { authWithPocketBase } from '@/app/actions/AuthService'

// Define the structure of the event data
export interface EventData {
	collectionId: string // ID of the collection where the event is stored
	collectionName: string // Name of the collection
	id: string // Unique identifier of the event
	event_title: string // Title of the event
	event_slug: string // Slug generated from the event title
	event_date: string // Date of the event
	event_description: string // Description of the event
	event_image?: string // Optional image associated with the event
	button_label: string // Label for the button linked to the event
	button_url: string // URL linked to the event button
	button_aria: string // Aria for accessibility
	summary: string // A brief summary of the event
	Important_One: boolean // Indicates if the event is the most important one
	created: string // The date when the event was created
	updated: string // The date when the event was last updated
}

// Function to sanitize the slug and prevent injection attacks
function sanitizeSlug(slug: string): string {
	// Escape special characters to prevent injections
	return slug.replace(/[^a-zA-Z0-9-_]/g, ''); // Allow only alphanumeric characters, hyphens, and underscores
}

// Function to fetch event data based on a slug (which is derived from the event title)
export async function getEventData(slug: string): Promise<EventData | null> {
	// Authenticate and get the PocketBase instance
	const pb = await authWithPocketBase()

	const sanitizedSlug = sanitizeSlug(slug);

	// Check if PocketBase connection is successful
	if (!pb) {
		console.error('PocketBase connection failed') // Log an error if the connection fails
		throw new Error('Failed to connect to PocketBase') // Throw an error if connection fails
	}

	try {
		// Fetch the list of events (up to 100 events, from the first page)
		const result = await pb
			.collection('Events')
			.getFirstListItem(`event_slug="${sanitizedSlug}"`);

		if (result.event_image) {
			result.event_image = pb.files.getURL(result, result.event_image) // Generate the full URL for the event image
		}

		// Return the event data if found, or null if no event matches the slug
		return result as EventData
	} catch (error) {
		// Log any errors encountered during the fetch process
		console.error('Error fetching event data from PocketBase:', error)
		throw error // Rethrow the error for further handling
	}
}
