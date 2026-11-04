// Convention du CMS : dans un titre saisi dans PocketBase, *L*a Taverne → le L s'affiche en rouge.
//
// Règle : on colore *X*, où X est un passage d'une ligne qui commence et finit collé aux astérisques (ni espace
// juste après l'astérisque ouvrante, ni juste avant la fermante) et ne contient ni astérisque ni balise.
// « *L*a », « *bar à jeux* », « *É*vénements &amp; *A*nimations » ou « *L*a&nbsp*T*averne » marchent comme avant
// la régression, avec la même règle sur tous les champs (espace ou &nbsp; dans le passage). « **gras** » (réflexe
// Markdown) est coloré aussi, sans astérisque visible.
//
// Piège des renvois de note (descriptions d'événements : « Initiation au jeu de rôle* … *Certains événements se
// déroulent à l'extérieur ») : l'ancienne expression /\*(.*?)\*/ colorait tout le passage entre deux renvois.
// Ici, une astérisque qui termine un mot (« rôle* », « Loto*, Quiz* ») n'ouvre jamais un passage : avant
// l'astérisque ouvrante il faut un début de texte, une espace, une ponctuation ou l'entité &nbsp, ou bien elle est
// au milieu d'un mot (« Aventu*r*iers » colore le r, comme avant). Un passage ne traverse ni balise ni saut de ligne.
//
// Ce module reste sans JSX ni dépendance : les tests unitaires l'importent directement avec Node.

export const COLORED_TEXT_CLASS = 'text-custom-red-100'

const COLOR_MARK_SOURCE = String.raw`(?:(?<![\p{L}\p{N}])|(?<=&nbsp)|(?<=[\p{L}\p{N}])(?=\*\*?[\p{L}\p{N}]))(\*\*?)([^\s*<>](?:[^*<>\n]*?[^\s*<>])?)\1`
const colorMarks = () => new RegExp(COLOR_MARK_SOURCE, 'gu')

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
			part.startsWith('<') ? part : part.replace(colorMarks(), `<span class="${COLORED_TEXT_CLASS}">$2</span>`)
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
		segments.push({ colored: true, text: match[2] })
		last = start + match[0].length
	}
	if (last < value.length || segments.length === 0) segments.push({ colored: false, text: value.slice(last) })
	return segments
}

/**
 * Usages en texte brut (balise title, meta description, Open Graph, alt, aria-label, JSON-LD, plan du site) :
 * retire les astérisques de coloration et garde la lettre. Les astérisques de renvoi de note restent.
 */
export const stripColorMarks = (text: string): string => (text ?? '').replace(colorMarks(), '$2')

// Entités nommées que l'éditeur de PocketBase produit en français (lettres accentuées, typographie). Les lettres
// accentuées se recomposent (« e » + accent aigu → « é ») ; une entité inconnue reste telle quelle.
const ENTITIES: Record<string, string> = {
	amp: '&',
	apos: "'",
	bdquo: '„',
	euro: '€',
	gt: '>',
	hellip: '…',
	laquo: '«',
	ldquo: '“',
	lsquo: '‘',
	lt: '<',
	mdash: '—',
	nbsp: ' ',
	ndash: '–',
	quot: '"',
	raquo: '»',
	rdquo: '”',
	rsquo: '’',
	szlig: 'ß',
}
const LIGATURES: Record<string, string> = { AElig: 'Æ', aelig: 'æ', OElig: 'Œ', oelig: 'œ' }
const ACCENTS: Record<string, string> = {
	acute: '\u0301',
	cedil: '\u0327',
	circ: '\u0302',
	grave: '\u0300',
	ring: '\u030A',
	tilde: '\u0303',
	uml: '\u0308',
}

const decodeEntity = (entity: string, name: string): string => {
	if (name.startsWith('#')) {
		const code = name[1] === 'x' || name[1] === 'X' ? Number.parseInt(name.slice(2), 16) : Number(name.slice(1))
		return Number.isInteger(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : entity
	}
	if (name in ENTITIES) return ENTITIES[name]
	if (name in LIGATURES) return LIGATURES[name]
	const accent = /^([a-zA-Z])(acute|cedil|circ|grave|ring|tilde|uml)$/.exec(name)
	return accent ? (accent[1] + ACCENTS[accent[2]]).normalize('NFC') : entity
}

/**
 * Même chose pour un champ traité comme du HTML (ex. hero_title « *L*a&nbsp*T*averne », page_title
 * « *É*vénements &amp; *A*nimations ») : retire les astérisques de coloration, puis les balises, décode les
 * entités (&nbsp avec ou sans point-virgule, &eacute;, &rsquo;, &#233;…) et resserre les espaces.
 * Le HTML n'est pas réinterprété : le résultat est du texte brut destiné à React (h1 sr-only du héros), qui
 * l'échappe, d'où le décodage de &lt; et &gt;.
 */
export const htmlToPlainText = (html: string): string =>
	stripColorMarks(html ?? '')
		.replace(/<[^>]*>/g, ' ')
		.replace(/&nbsp(?!;)/g, ' ')
		.replace(/&(#\d+|#[xX][\da-fA-F]+|[a-zA-Z]+);/g, decodeEntity)
		.replace(/\s+/g, ' ')
		.trim()
