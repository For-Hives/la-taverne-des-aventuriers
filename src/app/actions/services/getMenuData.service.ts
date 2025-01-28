'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

export interface MenuData {
	collectionId: string
	collectionName: string
	id: string
	menu_hero_title: string
	menu_hero_description: string
	cocktails_title: string
	mocktails_title: string
	shooter_title: string
	short_long_drinks_title: string
	beer_and_wine_title: string
	travelers_pleasure_title: string
	boards_title: string
	soft_hot_drinks_title: string
	created: string
	updated: string
}

/**
 * Fetches the menu page data from PocketBase.
 *
 * This function connects to PocketBase, retrieves the first item from the 'menu_page' collection,
 * and returns it as a `MenuData` object.
 *
 * @returns {Promise<MenuData>} Promise resolving to the `MenuData` object for the menu page.
 * @throws {Error} If PocketBase connection fails or the data fetch fails.
 */
export async function getMenuPageData(): Promise<MenuData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [MenuData Service]')
	}

	try {
		// Fetch the first item from the 'menu_page' collection
		const result = await pb.collection('menu_page').getList(1, 60) // Retrieve first 60 items (if any)

		// Return the first item as MenuData
		return result.items[0] as MenuData
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching MenuData from PocketBase:', error)
		throw error
	}
}
