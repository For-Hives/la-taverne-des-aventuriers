import PocketBase from 'pocketbase'

/**
 * Authenticate with PocketBase using email and password
 * @returns {Promise<PocketBase>} PocketBase instance
 */
export const authWithPocketBase = async (): Promise<PocketBase | null> => {
	const pb_env = {
		PB_SERVER_URL: process.env.PB_SERVER_URL,
		PB_USER_EMAIL: process.env.PB_USER_EMAIL,
		PB_USER_PASSWORD: process.env.PB_USER_PASSWORD,
	}
	const pb = new PocketBase(pb_env.PB_SERVER_URL)
	if (pb_env.PB_USER_EMAIL && pb_env.PB_USER_PASSWORD) {
		await pb
			.collection('users')
			.authWithPassword(pb_env.PB_USER_EMAIL, pb_env.PB_USER_PASSWORD)
		return pb
	}
	return null
}
