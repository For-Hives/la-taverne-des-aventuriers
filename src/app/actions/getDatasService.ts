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
	schedules_exceptional: string
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
		return result.items[0] as ContactPageData
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching contact data from PocketBase:', error)
		throw error
	}
}

/**
 * Fetches specific drink data from PocketBase based on the provided collection.
 *
 * @param {string} collection - The name of the collection to fetch drink data from.
 * @returns {Promise<any>} Promise resolving to the drink data from the specified collection.
 * @throws {Error} If PocketBase connection fails or data fetch fails.
 */
export async function getDrinkList(collection: string) {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error(
			`Failed to connect to PocketBase [Drink Service for ${collection}]`
		)
	}

	try {
		// Fetch the first 20 items from the specified collection
		return await pb.collection(collection).getList(1, 20)
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching drink data from PocketBase:', error)
		throw error
	}
}

/**
 * Interface representing the structure of footer data.
 * Defines the properties for the data fetched from the PocketBase 'footer' collection.
 */
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
 * Fetches footer data from PocketBase.
 *
 * This function connects to PocketBase and retrieves data from the 'footer' collection,
 * returning the data as a `FooterData` object.
 *
 * @returns {Promise<FooterData>} Promise resolving to the `FooterData` object for the footer section.
 * @throws {Error} If PocketBase connection fails or data fetch fails.
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
		// Fetch the first 60 items from the 'footer' collection
		const result = await pb.collection('footer').getList(1, 60)

		// Return the first item as FooterData
		return result.items[0] as FooterData
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching footer data from PocketBase:', error)
		throw error
	}
}

/**
 * Interface representing the structure of the games page data.
 * Defines the properties for the data fetched from the PocketBase 'games_pages' collection.
 */
export interface GamesPageData {
	collectionId: string
	collectionName: string
	id: string
	games_hero_title: string
	games_hero_description: string
	Card_Title: string
	card1_title: string
	card1_description: string
	card1_button_label: string
	card1_button_url: string
	card2_title: string
	card2_description: string
	card2_button_label: string
	card2_button_url: string
	card3_title: string
	card3_description: string
	card3_button_label: string
	card3_button_url: string
	myludo_component_title: string
	myludo_component_label: string
	myludo_component_url: string
	created: string
	updated: string
}

/**
 * Fetches game library page data from PocketBase.
 *
 * This function connects to PocketBase and retrieves data from the 'games_pages' collection,
 * returning the data as a `GamesPageData` object.
 *
 * @returns {Promise<GamesPageData>} Promise resolving to the `GamesPageData` object for the game library page.
 * @throws {Error} If PocketBase connection fails or data fetch fails.
 */
export async function getGameLibraryPageData(): Promise<GamesPageData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [GameLibrary Service]')
	}

	try {
		// Fetch the first 60 items from the 'games_pages' collection
		const result = await pb.collection('games_pages').getList(1, 60)

		// Return the first item as GamesPageData
		return result.items[0] as GamesPageData
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error(
			'Error while fetching game library data from PocketBase:',
			error
		)
		throw error
	}
}

/**
 * Interface representing the structure of the landing page data.
 * Defines the properties for the data fetched from the PocketBase 'landing_page' collection.
 */
export interface LandingPageData {
	collectionId: string
	collectionName: string
	created: string
	description_button_label: string
	description_button_url: string
	description_image: string
	description_text: string
	description_title: string
	event_card1_button_label: string
	event_card1_button_url: string
	event_card1_date: string
	event_card1_description: string
	event_card1_image: string
	event_card1_title: string
	event_card2_button_label: string
	event_card2_button_url: string
	event_card2_date: string
	event_card2_description: string
	event_card2_image: string
	event_card2_title: string
	event_card3_button_label: string
	event_card3_button_url: string
	event_card3_date: string
	event_card3_description: string
	event_card3_image: string
	event_card3_title: string
	events_title: string
	hero_description: string
	hero_left_button_label: string
	hero_left_button_url: string
	hero_right_button_label: string
	hero_right_button_url: string
	hero_title: string
	id: string
	updated: string
}

/**
 * Fetches landing page data from PocketBase.
 *
 * This function connects to PocketBase and retrieves the landing page data from the 'landing_page' collection.
 * It returns the data as a `LandingPageData` object.
 *
 * @returns {Promise<LandingPageData>} Promise resolving to the `LandingPageData` object for the landing page.
 * @throws {Error} If PocketBase connection fails or the data fetch fails.
 */
export async function getLandingData(): Promise<LandingPageData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [Landing Service]')
	}

	try {
		// Fetch the first 20 items from the 'landing_page' collection
		const result = await pb.collection('landing_page').getList(1, 20)

		// Return the first item as LandingPageData
		return result.items[0] as LandingPageData
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error(
			'Error while fetching landing page data from PocketBase:',
			error
		)
		throw error
	}
}

/**
 * Interface representing the structure of a reservation card.
 * Defines the properties for each reservation card fetched from PocketBase.
 */
export interface ReservationCardData {
	collectionId: string
	collectionName: string
	id: string
	Title: string
	image: string
	description: string
	games_url: string
	button_label: string
	button_url: string
	created: string
	updated: string
}

/**
 * Fetches reservation card data from PocketBase.
 *
 * This function connects to PocketBase, retrieves the first reservation card from the 'reservation_card' collection,
 * and returns it as a `ReservationCardData` object.
 *
 * @returns {Promise<ReservationCardData>} Promise resolving to the `ReservationCardData` object for the reservation card.
 * @throws {Error} If PocketBase connection fails or the data fetch fails.
 */
export async function getReservationCardData(): Promise<ReservationCardData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error(
			'Failed to connect to PocketBase [Reservation Card Service]'
		)
	}

	try {
		// Fetch the first 20 items from the 'reservation_card' collection
		const result = await pb.collection('reservation_card').getList(1, 20)

		// Return the first reservation card as ReservationCardData
		return result.items[0] as ReservationCardData
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error(
			'Error while fetching reservation card data from PocketBase:',
			error
		)
		throw error
	}
}

/**
 * Interface definition for the reservation data structure.
 * Defines all properties expected from the PocketBase reservation collection.
 */
export interface ReservationPageData {
	collectionId: string
	collectionName: string
	id: string
	how_to_title: string
	description: string
	contacts_button_title: string
	contact_button_url: string
	instagram_url: string
	facebook_url: string
	created: string
	updated: string
}

/**
 * Fetches reservation data from PocketBase.
 *
 * This function connects to PocketBase, retrieves the first item from the 'reservation_page' collection,
 * and returns it as a `ReservationPageData` object.
 *
 * @returns {Promise<ReservationPageData>} Promise resolving to the `ReservationPageData` object for the reservation page.
 * @throws {Error} If PocketBase connection fails or the data fetch fails.
 */
export async function getReservationData(): Promise<ReservationPageData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [Reservation Service]')
	}

	try {
		// Fetch the first item from the 'reservation_page' collection
		const result = await pb.collection('reservation_page').getList(1, 60) // Retrieve first 60 items (if any)

		// Return the first item as ReservationPageData
		return result.items[0] as ReservationPageData
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error(
			'Error while fetching reservation data from PocketBase:',
			error
		)
		throw error
	}
}

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
 * Fetches the "Who Are We" page data from PocketBase.
 *
 * This function connects to PocketBase, retrieves the first item from the 'who_are_we_page' collection,
 * and returns it as a `WhoAreWePageData` object.
 *
 * @returns {Promise<WhoAreWePageData>} Promise resolving to the `WhoAreWePageData` object for the "Who Are We" page.
 * @throws {Error} If PocketBase connection fails or the data fetch fails.
 */
export async function getWhoAreWePageData(): Promise<WhoAreWePageData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [WhoAreWe Service]')
	}

	try {
		// Fetch the first item from the 'who_are_we_page' collection
		const result = await pb.collection('who_are_we_page').getList(1, 60) // Retrieve first 60 items (if any)

		// Return the first item as WhoAreWePageData
		return result.items[0] as WhoAreWePageData
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching WhoAreWe data from PocketBase:', error)
		throw error
	}
}

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

export interface BeerData {
	collectionId: string
	collectionName: string
	id: string
	title: string
	description: string
	volume: number
	price: number
	order: number
	created: string
	updated: string
}

/*
 * Fetches a list of beer data from PocketBase.
 *
 * This function connects to PocketBase, retrieves up to 60 items from the 'Beers' collection,
 * and returns the data as an array of `BeerData`.
 *
 * @returns {Promise<BeerData[]>} Promise resolving to an array of `BeerData`
 * @throws {Error} If PocketBase connection fails or data fetch fails
 */
export async function getBeerData(): Promise<BeerData[]> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed') // Log an error if the connection fails
		throw new Error('Failed to connect to PocketBase [BeerData Service]') // Throw an error if connection is unsuccessful
	}

	try {
		// Fetch up to 60 beers from the 'Beers' collection in PocketBase
		const result = await pb.collection('Beers').getList(1, 60) // Retrieve up to 60 items

		// Return the fetched data, mapping it to the BeerData interface
		return result.items.map(beer => ({
			collectionId: beer.collectionId,
			collectionName: beer.collectionName,
			created: beer.created,
			description: beer.description,
			id: beer.id,
			order: beer.order,
			price: beer.price,
			title: beer.title,
			updated: beer.updated,
			volume: beer.volume,
		})) // Return the mapped items directly
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching BeerData from PocketBase:', error)
		throw error
	}
}

export interface TravelersPleasureData {
	collectionId: string
	collectionName: string
	id: string
	title: string
	description: string
	price: number
	order: number
	created: string
	updated: string
}

/**
 * Fetches a list of travelers' pleasures from PocketBase.
 *
 * This function connects to PocketBase, retrieves up to 60 items from the 'Travelers_pleasures' collection,
 * and returns the data as an array of `TravelersPleasureData`.
 *
 * @returns {Promise<TravelersPleasureData[]>} Promise resolving to an array of `TravelersPleasureData`
 * @throws {Error} If PocketBase connection fails or data fetch fails
 */
export async function getTravelersPleasureData(): Promise<
	TravelersPleasureData[]
> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error(
			'Failed to connect to PocketBase [TravelersPleasureData Service]'
		)
	}

	try {
		// Fetch up to 60 travelers' pleasures from the PocketBase collection
		const result = await pb.collection('Travelers_pleasures').getList(1, 60) // Retrieve up to 60 items
		return result.items as TravelersPleasureData[] // Return the list of travelers' pleasures as an array
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error(
			'Error while fetching TravelersPleasureData from PocketBase:',
			error
		)
		throw error
	}
}

export interface SoftDrinkData {
	collectionId: string
	collectionName: string
	id: string
	title: string
	volume: number
	price: number
	order: number
	created: string
	updated: string
}

/**
 * Fetches a list of soft drinks from PocketBase.
 *
 * This function connects to PocketBase, retrieves up to 60 soft drinks from the 'Softs_drinks' collection,
 * and returns the data as an array of `SoftDrinkData`.
 *
 * @returns {Promise<SoftDrinkData[]>} Promise resolving to an array of `SoftDrinkData`
 * @throws {Error} If PocketBase connection fails or data fetch fails
 */
export async function getSoftDrinkData(): Promise<SoftDrinkData[]> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [SoftDrinkData Service]')
	}

	try {
		// Fetch up to 60 soft drinks from PocketBase collection
		const result = await pb.collection('Softs_drinks').getList(1, 60) // Retrieve up to 60 soft drinks
		return result.items as SoftDrinkData[] // Return the list of soft drinks as an array
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching SoftDrinkData from PocketBase:', error)
		throw error
	}
}

export interface HotDrinkData {
	collectionId: string
	collectionName: string
	id: string
	title: string
	price: number
	order: number
	created: string
	updated: string
}

/**
 * Fetches a list of hot drinks from PocketBase.
 *
 * This function connects to PocketBase, retrieves up to 60 hot drinks from the 'Hot_drinks' collection,
 * and returns the data as an array of `HotDrinkData`.
 *
 * @returns {Promise<HotDrinkData[]>} Promise resolving to an array of `HotDrinkData`
 * @throws {Error} If PocketBase connection fails or data fetch fails
 */
export async function getHotDrinkData(): Promise<HotDrinkData[]> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [HotDrinkData Service]')
	}

	try {
		// Fetch up to 60 hot drinks from PocketBase collection
		const result = await pb.collection('Hot_drinks').getList(1, 60) // Retrieve up to 60 hot drinks
		return result.items as HotDrinkData[] // Return the list of hot drinks as an array
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching HotDrinkData from PocketBase:', error)
		throw error
	}
}

export interface WineData {
	collectionId: string
	collectionName: string
	id: string
	title: string
	type: string
	description: string
	price_glass: number
	price_bottle: number
	order: number
	created: string
	updated: string
}

/**
 * Fetches a list of wine data from PocketBase.
 *
 * This function connects to PocketBase, retrieves up to 60 items from the 'Wines' collection,
 * and returns the data as an array of `WineData`.
 *
 * @returns {Promise<WineData[]>} Promise resolving to an array of `WineData`
 * @throws {Error} If PocketBase connection fails or data fetch fails
 */
export async function getWineData(): Promise<WineData[]> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [WineData Service]')
	}

	try {
		// Fetch up to 60 wines from the PocketBase collection
		const result = await pb.collection('Wines').getList(1, 60) // Retrieve up to 60 items
		return result.items as WineData[] // Return the list of wines as an array
	} catch (error) {
		// Log and throw any errors that occur during the fetch
		console.error('Error while fetching WineData from PocketBase:', error)
		throw error
	}
}
