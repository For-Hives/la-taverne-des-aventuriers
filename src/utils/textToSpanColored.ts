// Convention du CMS : dans un titre saisi dans PocketBase, *L*a Taverne → le L s'affiche en rouge.
//
// Règle : on ne colore que *X* où X est collé aux deux astérisques (au moins un caractère, ni espace, ni
// astérisque, ni chevron). « *L*a », « *bar* à *jeux* » ou « *É*vénements &amp; *A*nimations » marchent comme
// avant. En revanche une astérisque de renvoi de note, comme dans les descriptions d'événements
// (« Initiation au jeu de rôle* … *Certains événements se déroulent à l'extérieur »), n'est jamais appariée avec
// la suivante : entre les deux il y a toujours des espaces ou des balises. L'ancienne expression /\*(.*?)\*/
// aurait coloré tout le passage entre deux renvois.
//
// Ce module reste sans JSX ni dépendance : les tests unitaires l'importent directement avec Node.

export const COLORED_TEXT_CLASS = 'text-custom-red-100'

const COLOR_MARK_SOURCE = String.raw`\*([^\s*<>]+)\*`
const colorMarks = () => new RegExp(COLOR_MARK_SOURCE, 'g')

/**
 * Champ traité comme du HTML (déjà injecté avec dangerouslySetInnerHTML) : entoure chaque *X* d'un span rouge.
 * La règle ne s'applique qu'au texte entre les balises, jamais à un attribut. Le HTML d'entrée n'est pas échappé
 * (ces champs contiennent volontairement « &nbsp » ou « &amp; ») : pour un champ en texte brut, passer par
 * splitColoredText (composant ColoredText), que React échappe.
 */
export const textToSpanColored = (text: string): string =>
	(text ?? '')
		.split(/(<[^>]*>)/)
		.map(part =>
			part.startsWith('<') ? part : part.replace(colorMarks(), `<span class="${COLORED_TEXT_CLASS}">$1</span>`)
		)
		.join('')

export interface ColoredSegment {
	text: string
	colored: boolean
}

/** Champ en texte brut : découpe en morceaux normaux et morceaux à colorer, pour un rendu React (échappé). */
export function splitColoredText(text: string): ColoredSegment[] {
	const value = text ?? ''
	const segments: ColoredSegment[] = []
	let last = 0
	for (const match of value.matchAll(colorMarks())) {
		const start = match.index ?? 0
		if (start > last) segments.push({ colored: false, text: value.slice(last, start) })
		segments.push({ colored: true, text: match[1] })
		last = start + match[0].length
	}
	if (last < value.length || segments.length === 0) segments.push({ colored: false, text: value.slice(last) })
	return segments
}

/**
 * Usages en texte brut (balise title, meta description, Open Graph, alt, aria-label, JSON-LD, plan du site) :
 * retire les astérisques de coloration et garde la lettre. Les astérisques de renvoi de note restent.
 */
export const stripColorMarks = (text: string): string => (text ?? '').replace(colorMarks(), '$1')

const ENTITIES: Record<string, string> = { amp: '&', apos: "'", nbsp: ' ', quot: '"' }

/**
 * Même chose pour un champ traité comme du HTML (ex. hero_title « *L*a&nbsp*T*averne », page_title
 * « *É*vénements &amp; *A*nimations ») : retire les balises, décode &nbsp (avec ou sans point-virgule), &amp;,
 * &quot; et &apos;, resserre les espaces, puis retire les astérisques de coloration. &lt; et &gt; restent
 * encodés : le résultat peut finir dans un script JSON-LD, où un « </script> » décodé fermerait la balise.
 */
export const htmlToPlainText = (html: string): string =>
	stripColorMarks(
		(html ?? '')
			.replace(/<[^>]*>/g, ' ')
			.replace(/&(amp|apos|nbsp|quot);?/g, (_, name: string) => ENTITIES[name])
			.replace(/\s+/g, ' ')
			.trim()
	)
