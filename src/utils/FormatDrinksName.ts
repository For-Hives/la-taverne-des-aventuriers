// Function to format the collection name (e.g., replace underscores and capitalize the first letters)
export const formatDrinkName = (drink: string) => {
	if (drink === 'Short_long_drinks') {
		return 'Short / Long Drinks' // Special case for "Short_long_drinks"
	}
	return drink
		.replaceAll('_', ' ') // Replace underscores with spaces
		.replace(/(?:^|\s)\S/g, match => match.toUpperCase()) // Capitalize the first letter of each word
}
