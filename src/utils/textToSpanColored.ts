// Fonction pour transformer du texte en ajoutant une balise <span> avec une couleur spécifique
export const textToSpanColored = (text: string) => {
	// Utilise une expression régulière pour chercher tout texte entouré par des astérisques (*texte*)
	// Remplace ces occurrences par un élément <span> avec une classe 'text-title-100' qui stylise le texte
	return text.replace(
		/\*([A-Za-z]+)\*/g, // Recherche des mots constitués uniquement de lettres majuscules/minuscules entre des astérisques
		'<span class="text-customRed-100">$1</span>' // Remplace le texte trouvé par un <span> contenant ce texte avec une classe spécifique
	)
}
