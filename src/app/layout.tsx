import '@/app/styles/global.css'

import type { Metadata } from 'next'

import { getContactData } from '@/app/actions/services/getContactPageData.service'
import { Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import Script from 'next/script'

// Font configurations
const ObraLetra = localFont({
	display: 'swap',
	src: './fonts/kc-obra-letra/kc-obra-letra-regular.ttf',
	variable: '--kc-obra-letra',
})

const ObraLetraBold = localFont({
	display: 'swap',
	src: './fonts/kc-obra-letra/kc-obra-letra-bold.ttf',
	variable: '--kc-obra-letra-bold',
})

const CardoRegular = localFont({
	display: 'swap',
	src: './fonts/cardo/cardo-regular.ttf',
	variable: '--cardo-regular',
})

const geistSans = Geist({
	subsets: ['latin'],
	variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-geist-mono',
})

/**
 * Helper function to create structured data
 * @param contactData Contact data from API
 * @returns Structured data object for JSON-LD
 */
const createStructuredData = (
	contactData: Awaited<ReturnType<typeof getContactData>>
) => ({
	'@context': 'https://schema.org',
	'@id': 'https://latavernedesaventuriers.fr',
	'@type': ['BarOrPub', 'EntertainmentBusiness'],
	address: {
		'@type': 'PostalAddress',
		addressCountry: 'FR',
		addressLocality: 'Nantes',
		postalCode: '44000',
		streetAddress: contactData.address,
	},
	description: 'Bar à jeux médiéval-fantastique au cœur de Nantes',
	email: contactData.contact_email,
	geo: {
		'@type': 'GeoCoordinates',
		latitude: '47.2127234',
		longitude: '-1.5555402',
	},
	image: '/assets/images/LTDALogo.png',
	name: 'La Taverne des Aventuriers',
	openingHoursSpecification: [
		{
			'@type': 'OpeningHoursSpecification',
			closes: '00:00',
			dayOfWeek: 'Monday',
			opens: '17:00',
		},
		{
			'@type': 'OpeningHoursSpecification',
			closes: '00:00',
			dayOfWeek: 'Tuesday',
			opens: '00:00',
		},
		// ... autres jours
	],
	potentialAction: {
		'@type': 'ReserveAction',
		target: {
			'@type': 'EntryPoint',
			urlTemplate: 'https://latavernedesaventuriers.fr/reservation',
		},
	},
	priceRange: '€€',
	sameAs: [
		contactData.facebook_url,
		contactData.instagram_url,
		contactData.myludo_url,
	],
	url: 'https://latavernedesaventuriers.fr',
})

/**
 * Generates metadata for the application using dynamic data
 */
export async function generateMetadata(): Promise<Metadata> {
	return {
		alternates: {
			canonical: 'https://latavernedesaventuriers.fr',
		},
		authors: [{ name: 'La Taverne des Aventuriers' }],
		category: 'business.food_and_drinks',
		creator: 'La Taverne des Aventuriers',
		description:
			'Découvrez La Taverne des Aventuriers, votre bar à jeux médiéval-fantastique à Nantes. Plus de 90 jeux de société, cocktails créatifs et ambiance unique.',
		formatDetection: {
			address: false,
			email: false,
			telephone: false,
		},
		keywords: [
			'bar à jeux',
			'Nantes',
			'jeux de société',
			'médiéval',
			'fantastique',
			'bar thématique',
			'cocktails',
			'jeux de rôle',
			'ludothèque Nantes',
			'bar centre-ville Nantes',
		],
		metadataBase: new URL('https://latavernedesaventuriers.fr'),
		openGraph: {
			description:
				'Bar à jeux médiéval-fantastique au cœur de Nantes. Découvrez plus de 90 jeux et nos cocktails créatifs dans une ambiance unique.',
			images: [
				{
					alt: 'La Taverne des Aventuriers - Ambiance médiévale et jeux',
					height: 630,
					url: '/assets/images/og-image.jpg',
					width: 1200,
				},
			],
			locale: 'fr_FR',
			siteName: 'La Taverne des Aventuriers',
			title: 'La Taverne des Aventuriers - Bar à Jeux Médiéval',
			type: 'website',
			url: 'https://latavernedesaventuriers.fr',
		},
		publisher: 'La Taverne des Aventuriers',
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
			default: 'La Taverne des Aventuriers - Bar à Jeux Médiéval à Nantes',
			template: '%s | La Taverne des Aventuriers',
		},
	}
}

/**
 * Root layout component
 */
export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const contactData = await getContactData()
	const structuredData = createStructuredData(contactData)

	return (
		<html lang='fr'>
			<head>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>
			</head>
			<body
				className={`${ObraLetra.variable} ${ObraLetraBold.variable} ${CardoRegular.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
				<Script
					src='https://umami.wadefade.fr/script.js'
					data-website-id='d1af4b0d-f3e6-4760-89d5-c40f2eaa646b'
					strategy='afterInteractive'
				/>
			</body>
		</html>
	)
}
