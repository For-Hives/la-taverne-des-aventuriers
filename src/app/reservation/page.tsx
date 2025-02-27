// app/reservation/page.tsx

import { getContactData } from '@/app/actions/services/getContactPageData.service'
import { getNavBarData } from '@/app/actions/services/getNavData.service'
import ContactElements from '@/components/Contact/ContactElementsSection.component'
import ReservationComponent from '@/components/Contact/Reservation.component'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import { Metadata } from 'next'

export const revalidate = 10

/**
 * Generates metadata for reservation page
 */
export async function generateMetadata(): Promise<Metadata> {
	return {
		alternates: {
			canonical: 'https://latavernedesaventuriers.fr/reservation',
		},
		description:
			'Réservez votre soirée à La Taverne des Aventuriers. Réservation obligatoire pour les groupes de plus de 12 personnes. Bar à jeux idéal pour vos événements au centre de Nantes.',
		keywords: [
			'réservation bar nantes',
			'réserver groupe nantes',
			'bar jeux réservation',
			'event bar nantes',
			'réserver taverne aventuriers',
			'soirée groupe nantes',
			'réservation ludothèque',
			'organiser soirée nantes',
		],
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
			nocache: true,
		},
		title: 'Réservation | La Taverne des Aventuriers',
	}
}

export default async function Reservation() {
	const dataContact = await getContactData()
	const navItems = await getNavBarData()

	// Structured data for reservation page
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'FoodEstablishment',
		acceptsReservations: true,
		address: {
			'@type': 'PostalAddress',
			addressCountry: 'FR',
			addressLocality: 'Nantes',
			postalCode: '44000',
			streetAddress: dataContact.address,
		},
		description: 'Bar à jeux médiéval-fantastique',
		hasMap: 'https://maps.app.goo.gl/2dFvnKAXgHZYDFu58',
		image: '/assets/images/LTDALogo.webp',
		name: 'La Taverne des Aventuriers',
		openingHours: [
			'Mo 17:00-00:00',
			'Tu Closed',
			'We 14:00-00:00',
			'Th 17:00-00:00',
			'Fr 17:00-02:00',
			'Sa 14:00-02:00',
			'Su 14:00-00:00',
		],
		priceRange: '€',
		publicAccess: true,
		servesCuisine: 'Bar à jeux',
		smokingAllowed: false,
		url: 'https://latavernedesaventuriers.fr',
	}

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			<div className='flex min-h-screen w-full flex-col items-center'>
				<Navbar navItems={navItems} />
				<MobileNavbar navItems={navItems} />

				<div className='mask-custom absolute bottom-0 left-0 h-[125vh] w-full -translate-y-[70vh] transform bg-background-image opacity-75'></div>

				<div className='container relative mx-auto max-w-7xl px-4 sm:px-6 lg:mt-72 lg:px-8'>
					<div className='flex flex-col items-center justify-center gap-24 lg:gap-32'>
						<div className='w-full'>
							<ReservationComponent />
						</div>

						<div className='w-full pb-16'>
							<ContactElements data={dataContact} />
						</div>
					</div>
				</div>

				<FooterComponent />
			</div>
		</>
	)
}
