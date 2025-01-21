'use server'
import { authWithPocketBase } from '@/app/actions/AuthService'

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
