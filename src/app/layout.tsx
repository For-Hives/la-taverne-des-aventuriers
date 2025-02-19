import '@/app/styles/global.css'

import type { Metadata } from 'next'

import { getContactData } from '@/app/actions/services/getContactPageData.service'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import Script from 'next/script'
import React from 'react'

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

const Cardinal = localFont({
	display: 'swap',
	src: './fonts/cardinal/Cardinal.ttf',
	variable: '--cardinal',
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
	description:
		'Bar à jeux médiéval-fantastique au cœur de Nantes avec une collection de plus de 90 jeux de société. Ambiance unique, cocktails créatifs et soirées thématiques.',
	email: contactData.contact_email,
	geo: {
		'@type': 'GeoCoordinates',
		latitude: '47.2127234',
		longitude: '-1.5555402',
	},
	image: [
		'https://latavernedesaventuriers.fr/assets/images/LTDALogo.webp',
		'https://latavernedesaventuriers.fr/assets/images/taverne-interieur.webp',
	],
	name: 'La Taverne des Aventuriers',
	openingHoursSpecification: [
		{
			'@type': 'OpeningHoursSpecification',
			closes: '00:00',
			dayOfWeek: 'Monday',
			opens: '18:00',
		},
		{
			'@type': 'OpeningHoursSpecification',
			closes: '00:00',
			dayOfWeek: 'Wednesday',
			opens: '15:00',
		},
		{
			'@type': 'OpeningHoursSpecification',
			closes: '00:00',
			dayOfWeek: 'Thursday',
			opens: '18:00',
		},
		{
			'@type': 'OpeningHoursSpecification',
			closes: '01:00',
			dayOfWeek: 'Friday',
			opens: '18:00',
		},
		{
			'@type': 'OpeningHoursSpecification',
			closes: '01:00',
			dayOfWeek: 'Saturday',
			opens: '15:00',
		},
		{
			'@type': 'OpeningHoursSpecification',
			closes: '00:00',
			dayOfWeek: 'Sunday',
			opens: '15:00',
		},
	],
	potentialAction: {
		'@type': 'ReserveAction',
		target: {
			'@type': 'EntryPoint',
			urlTemplate: 'https://latavernedesaventuriers.fr/reservation',
		},
	},
	priceRange: '€',
	sameAs: [
		contactData.facebook_url,
		contactData.instagram_url,
		contactData.myludo_url,
	],
	url: 'https://latavernedesaventuriers.fr',
})

export async function generateMetadata(): Promise<Metadata> {
	return {
		alternates: {
			canonical: 'https://latavernedesaventuriers.fr',
		},
		applicationName: 'La Taverne des Aventuriers',
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
		icons: {
			apple: [
				{ sizes: '57x57', url: '/assets/icons/favicon-57x57.png' },
				{ sizes: '60x60', url: '/assets/icons/favicon-60x60.png' },
				{ sizes: '72x72', url: '/assets/icons/favicon-72x72.png' },
				{ sizes: '76x76', url: '/assets/icons/favicon-76x76.png' },
				{ sizes: '114x114', url: '/assets/icons/favicon-114x114.png' },
				{ sizes: '120x120', url: '/assets/icons/favicon-120x120.png' },
				{ sizes: '144x144', url: '/assets/icons/favicon-144x144.png' },
				{ sizes: '152x152', url: '/assets/icons/favicon-152x152.png' },
				{ sizes: '180x180', url: '/assets/icons/favicon-180x180.png' },
			],
			icon: [
				{ type: 'image/svg+xml', url: '/assets/icons/favicon.svg' },
				{
					sizes: '16x16',
					type: 'image/png',
					url: '/assets/icons/favicon-16x16.png',
				},
				{
					sizes: '32x32',
					type: 'image/png',
					url: '/assets/icons/favicon-32x32.png',
				},
				{
					sizes: '96x96',
					type: 'image/png',
					url: '/assets/icons/favicon-96x96.png',
				},
				{
					sizes: '192x192',
					type: 'image/png',
					url: '/assets/icons/favicon-192x192.png',
				},
			],
			shortcut: { url: '/favicon.ico' },
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
		manifest: '/assets/icons/manifest.json',
		metadataBase: new URL('https://latavernedesaventuriers.fr'),
		openGraph: {
			description:
				'Bar à jeux médiéval-fantastique au cœur de Nantes. Découvrez plus de 90 jeux et nos cocktails créatifs dans une ambiance unique.',
			images: [
				{
					alt: 'La Taverne des Aventuriers - Ambiance médiévale et jeux',
					height: 630,
					url: '/assets/images/og-image.webp',
					width: 1200,
				},
			],
			locale: 'fr_FR',
			siteName: 'La Taverne des Aventuriers',
			title: 'La Taverne des Aventuriers - Bar à Jeux Médiéval',
			type: 'website',
			url: 'https://latavernedesaventuriers.fr',
		},
		// Paramètres Microsoft
		other: {
			'msapplication-config': '/assets/icons/browserconfig.xml',
			'msapplication-TileColor': '#ffffff',
			'msapplication-TileImage': '/assets/icons/favicon-144x144.png',
			'theme-color': '#ffffff',
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
		twitter: {
			card: 'summary_large_image',
			creator: '@TaverneNantes',
			description: 'Bar à jeux médiéval-fantastique au cœur de Nantes',
			images: ['/assets/images/og-image.webp'],
			title: 'La Taverne des Aventuriers',
		},
	}
}

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
				className={`${ObraLetra.variable} ${ObraLetraBold.variable} ${CardoRegular.variable} ${geistSans.variable} ${geistMono.variable} ${Cardinal.variable} antialiased`}
			>
				{children}
				{/* Google Analytics */}
				<GoogleAnalytics gaId='G-237Y7E1JZW' />
				<Script
					src='https://umami.wadefade.fr/script.js'
					data-website-id='d1af4b0d-f3e6-4760-89d5-c40f2eaa646b'
					strategy='afterInteractive'
				/>
			</body>
		</html>
	)
}
