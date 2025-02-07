'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'  // Importing the authentication function for PocketBase

/**
 * Interface representing the structure of footer data.
 * Defines the properties for the data fetched from the PocketBase 'footer' collection.
 */
export interface EventPageData {
    collectionId: string;  // The ID of the collection
    collectionName: string;  // The name of the collection
    id: string;  // The unique identifier of the event page
    page_title: string;  // The title of the event page
    event_description: string;  // Description of the event
    bar_event_title: string;  // Title for the event bar
    created: string;  // The creation date of the event page
    updated: string;  // The date of the last update
}

/**
 * Fetches footer data from PocketBase.
 *
 * This function connects to PocketBase and retrieves data from the 'Event_Page' collection,
 * returning the data as an `EventPageData` object for use in the footer.
 *
 * @returns {Promise<EventPageData>} Promise resolving to the `EventPageData` object containing footer data.
 * @throws {Error} If PocketBase connection fails or data retrieval fails.
 */
export async function getEventPageData(): Promise<EventPageData> {
    // Initialize PocketBase connection
    const pb = await authWithPocketBase();  // Authenticate and get the PocketBase instance

    // Validate PocketBase connection
    if (!pb) {
        console.error('PocketBase connection failed');  // Log error if connection fails
        throw new Error('Failed to connect to PocketBase [Footer Service]');  // Throw error if no connection
    }

    try {
        // Fetch the first 100 items from the 'Event_Page' collection
        const result = await pb.collection('Event_Page').getList(1, 100);

        // Return the first item from the result as EventPageData
        return result.items[0] as EventPageData;  // Assuming there is always at least one item
    } catch (error) {
        // Log and throw any errors that occur during the data fetch
        console.error('Error while fetching footer data from PocketBase:', error);  // Log the error
        throw error;  // Rethrow the error for the caller to handle
    }
}
