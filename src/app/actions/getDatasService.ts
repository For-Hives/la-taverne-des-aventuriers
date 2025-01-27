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

/**
 * Interface representing the structure of cocktails cards
 * @interface CocktailsData
 */
export interface CocktailsData {
	collectionId: string
	collectionName: string
	id: string
	title: string
	description: string
	price: string
	image: string
	order: number
	created: string
	updated: string
}

/**
 * Fetches a specific cocktail's data from PocketBase using its order number
 * @param {number} orderNumber - The order number of the desired cocktail
 * @returns {Promise<CocktailsData>} Promise resolving to the cocktail data
 * @throws {Error} If PocketBase connection fails or data fetch fails
 */
export async function getCocktailByOrder(
	orderNumber: number,
	collection: string
): Promise<CocktailsData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [cocktails Card Service]')
	}

	try {
		// Fetch data from PocketBase
		// console.log('Fetching specific cocktail data from PocketBase...');
		const result = await pb.collection(collection).getList(1, 20) // Get first 20 items

		// Find the cocktail with the matching order number
		const cocktail = result.items.find(
			(item: any) => item.order === orderNumber
		)

		if (!cocktail) {
			throw new Error(`Cocktail with order number ${orderNumber} not found`)
		}

		return cocktail as CocktailsData
	} catch (error) {
		console.error('Error while fetching data from PocketBase:', error)
		throw error
	}
}

/**
 * Interface representing the structure of drink cards
 * @interface DrinkData
 */
export interface DrinkData {
	collectionId: string
	collectionName: string
	id: string
	title: string
	description: string
	price: number // Assure-toi que price est un nombre (et non une chaîne)
	image: string
	order: number
	created: string
	updated: string
}

export async function getDrinkList(collection: string) {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [drink Card Service]')
	}

	try {
		// Fetch data from PocketBase
		// console.log('Fetching specific drink data from PocketBase...');
		// Get first 20 items
		return await pb.collection(collection).getList(1, 20)
	} catch (error) {
		console.error('Error while fetching data from PocketBase:', error)
		throw error
	}
}

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
 * Fetches footer data from PocketBase
 * @returns {Promise<FooterData>} Promise resolving to footer data
 * @throws {Error} If PocketBase connection fails or data fetch fails
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
		// Fetch data from PocketBase
		// console.log('Fetching footer data from PocketBase...')
		const result = await pb.collection('footer').getList(1, 60) // Get first 60 items

		// console.log('Successfully retrieved footer data')
		return result.items[0] as FooterData
	} catch (error) {
		console.error('Error while fetching footer data from PocketBase:', error)
		throw error
	}
}

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
 * Fetches GameLibrary data from PocketBase
 * @returns {Promise<GamesPageData>} Promise resolving to GameLibrary data
 * @throws {Error} If PocketBase connection fails or data fetch fails
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
		// Fetch data from PocketBase
		// console.log('Fetching GameLibrary data from PocketBase...')
		const result = await pb.collection('games_pages').getList(1, 60) // Get first 60 items

		// console.log('Successfully retrieved GameLibrary data')
		return result.items[0] as GamesPageData
	} catch (error) {
		console.error(
			'Error while fetching GameLibrary data from PocketBase:',
			error
		)
		throw error
	}
}

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

export async function getLandingData(): Promise<LandingPageData> {
	const pb = await authWithPocketBase()
	if (!pb) {
		throw new Error('Failed to connect to PocketBase [Landing Service]')
	}
	try {
		const result = await pb.collection('landing_page').getList(1, 20) // Get first 20 items
		return result.items[0] as LandingPageData
	} catch (error) {
		console.error('Error while fetching data from PocketBase', error)
		throw error
	}
}
/**
 * Interface representing the structure of a reservation card
 * @interface ReservationCardData
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
 * Fetches landing page data from PocketBase
 * @returns {Promise<ReservationCardData>} Promise resolving to reservation card data
 * @throws {Error} If PocketBase connection fails or data fetch fails
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
		// Fetch data from PocketBase
		// console.log('Fetching reservation card data from PocketBase...')
		const result = await pb.collection('reservation_card').getList(1, 20) // Get first 20 items

		// console.log('Successfully retrieved reservation card data')
		return result.items[0] as ReservationCardData
	} catch (error) {
		console.error('Error while fetching data from PocketBase:', error)
		throw error
	}
}

/**
 * Interface definition for reservation data structure
 * Defines all properties expected from the PocketBase reservation collection
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
 * Fetches reservation data from PocketBase
 * @returns {Promise<ReservationPageData>} Promise resolving to reservation data
 * @throws {Error} If PocketBase connection fails or data fetch fails
 */
export async function getReservationData(): Promise<ReservationPageData> {
	// Initialize PocketBase connection
	const pb = await authWithPocketBase()

	// Validate PocketBase connection
	if (!pb) {
		console.error('PocketBase connection failed')
		throw new Error('Failed to connect to PocketBase [reservation Service]')
	}

	try {
		// Fetch data from PocketBase
		// console.log('Fetching reservation data from PocketBase...')
		const result = await pb.collection('reservation_page').getList(1, 60) // Get first 60 items

		// console.log('Successfully retrieved reservation data')
		return result.items[0] as ReservationPageData
	} catch (error) {
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
