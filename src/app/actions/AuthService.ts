import 'server-only' // Indicates that this file must be executed on the server only
import PocketBase from 'pocketbase' // Imports the PocketBase library for usage

let instance: PocketBase | null = null

export const authWithPocketBase = async (): Promise<PocketBase | null> => {
	if (instance?.authStore?.isValid) {
		return instance // Returns the existing instance if it is valid
	}
	const token = process.env.PB_USER_TOKEN // Retrieves the user token from environment variables
	const url = process.env.PB_SERVER_URL // Retrieves the server URL from environment variables

	if (!token) {
		return null // Returns null if no token is available
	}

	instance = new PocketBase(url) // Creates a new PocketBase instance with the server URL
	instance.authStore.save(token, null) // Saves the token in the authentication store

	return instance // Returns the PocketBase instance
}
