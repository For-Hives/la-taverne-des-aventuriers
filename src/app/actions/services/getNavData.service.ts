'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

/**
 * Interface representing a single navigation item.
 */
export interface NavItem {
	id: string
	collectionId: string
	collectionName: string
	label: string
	url: string
	order: number
	created: string
	updated: string
}

/**
 * Type representing the array of navigation items.
 */
export type NavBarData = NavItem[]

/**
 * Fetches navigation data from PocketBase.
 *
 * This function connects to PocketBase and retrieves data from the 'NavBar' collection,
 * sorts items by order, and returns them as a NavBarData array.
 *
 * @returns {Promise<NavBarData>} Promise resolving to an array of navigation items.
 * @throws {Error} If PocketBase connection fails or data fetch fails.
 */
export async function getNavBarData(): Promise<NavBarData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [NavBar Service]')
	}

	try {
		// Fetch all items from the 'NavBar' collection
		const result = await pb.collection('NavBar').getList(1, 60, {
			cache: 'no-store', // Disable caching
			sort: 'order', // Sort by the order field
		})

		// Return the sorted items as NavBarData
		return result.items as NavBarData
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching navbar data from PocketBase:', error)
		throw error
	}
}
