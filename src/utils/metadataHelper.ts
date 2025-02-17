// src/utils/metadata.ts

import { Metadata } from 'next'

interface BaseMetadataProps {
	title: string
	description: string
	path: string
	keywords?: string[]
	ogImage?: string
}

export function generateBaseMetadata({
	description,
	keywords = [],
	ogImage = '/assets/images/og-image.jpg',
	path,
	title,
}: BaseMetadataProps): Metadata {
	const baseUrl = 'https://latavernedesaventuriers.fr'
	const fullUrl = `${baseUrl}${path}`

	return {
		alternates: {
			canonical: fullUrl,
		},
		description,
		keywords: [
			'bar à jeux nantes',
			'taverne des aventuriers',
			'jeux de société nantes',
			'bar médiéval nantes',
			...keywords,
		],
		metadataBase: new URL(baseUrl),
		openGraph: {
			description,
			images: [
				{
					alt: `${title} - La Taverne des Aventuriers`,
					height: 630,
					url: ogImage,
					width: 1200,
				},
			],
			locale: 'fr_FR',
			siteName: 'La Taverne des Aventuriers',
			title,
			type: 'website',
			url: fullUrl,
		},
		robots: {
			follow: true,
			googleBot: {
				follow: true,
				index: true,
				'max-image-preview': 'large',
				'max-snippet': -1,
				'max-video-preview': -1,
			},
			index: true,
		},
		title: {
			absolute: `${title} | La Taverne des Aventuriers`,
			template: '%s | La Taverne des Aventuriers',
		},
	}
}
