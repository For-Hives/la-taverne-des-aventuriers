import { authWithPocketBase } from "@/app/actions/AuthService";  // Importing the function to authenticate and connect with PocketBase

// Define the structure for the event data
export interface EventData {
    collectionId: string;  // ID of the collection
    collectionName: string;  // Name of the collection
    id: string;  // Unique identifier of the event
    event_title: string;  // Title of the event
    event_date: string;  // Date of the event
    event_description: string;  // Description of the event
    summary: string; // Summary of the event
    event_image?: string;  // Optional image associated with the event
    button_label: string;  // Label for the event button
    button_url: string;  // URL for the event button
    created: string;  // Creation date of the event
    updated: string;  // Last update date of the event
}

// Function to fetch event data based on a slug
export async function getEventData(slug: string): Promise<EventData | null> {
    const pb = await authWithPocketBase();  // Authenticate and get the PocketBase instance

    if (!pb) {
        console.error('PocketBase connection failed');  // Log error if connection fails
        throw new Error('Failed to connect to PocketBase');  // Throw error if no connection
    }

    try {
        // Fetch a list of events (1 page, up to 100 items)
        const result = await pb.collection('Events').getList(1, 100);

        // Process each event item to generate the URL for the event image
        result.items.forEach((item) => {
            if (item.event_image) {  // If event has an image
                item.event_image = pb.files.getURL(item, item.event_image);  // Generate the URL for the image
            }
        });

        // Find the event with the given slug (matching event id)
        const event = result.items.find((item: { id: string }) => item.id === slug);

        // Return the event data or null if not found
        return event ? (event as EventData) : null;
    } catch (error) {
        console.error('Error fetching event data from PocketBase:', error);  // Log any error during the fetch operation
        throw error;  // Rethrow the error
    }
}
