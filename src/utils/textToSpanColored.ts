export const textToSpanColored = (text: string) => {
	return text.replace(
		/\*([A-Za-z]+)\*/g,
		'<span class="text-title-100">$1</span>'
	)
}
