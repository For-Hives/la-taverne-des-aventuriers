'use server'

import { authWithPocketBase } from '@/app/actions/AuthService'

export async function getData() {
	const pb = await authWithPocketBase()
	if (!pb) {
		throw new Error('Failed to connect to PocketBase [Landing Service]')
	}
	try {
		const result = await pb.collection('landing_page').getList(1, 20) // Get first 20 items
		return result.items
	} catch (error) {
		console.error('Error while fetching data from PocketBase', error)
		throw error
	}
}
