// Function to transform text by wrapping specific portions with a <span> tag and applying a specific color
export const textToSpanColored = (text: string) => {
	// Uses a regular expression to find any text surrounded by asterisks (*text*)
	// Replaces these occurrences with a <span> element that has the 'text-title-100' class for styling
	return text.replace(
		/\*([A-Za-z]+)\*/g, // Matches words composed only of uppercase/lowercase letters enclosed by asterisks
		'<span class="text-customRed-100">$1</span>' // Replaces the matched text with a <span> containing it and a specific class
	)
}
