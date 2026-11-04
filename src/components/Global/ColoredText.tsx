import { COLORED_TEXT_CLASS, splitColoredText } from '@/utils/textToSpanColored'

/**
 * Affiche un champ texte du CMS en appliquant la convention *L*a → L en rouge (voir textToSpanColored.ts).
 * Rendu React, donc échappé : à préférer à dangerouslySetInnerHTML pour un champ en texte brut. Sans astérisque,
 * le rendu est exactement le texte d'origine.
 */
export function ColoredText({ text }: Readonly<{ text: string }>) {
	return (
		<>
			{splitColoredText(text).map((segment, index) =>
				segment.colored ? (
					// biome-ignore lint/suspicious/noArrayIndexKey: liste figée, recalculée à chaque rendu depuis le même texte
					<span key={index} className={COLORED_TEXT_CLASS}>
						{segment.text}
					</span>
				) : (
					segment.text
				)
			)}
		</>
	)
}
