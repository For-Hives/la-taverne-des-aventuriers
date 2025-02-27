import { getContactData } from '@/app/actions/services/getContactPageData.service'
import { getNavBarData } from '@/app/actions/services/getNavData.service'
import ContactElements from '@/components/Contact/ContactElementsSection.component'
import HowToContact from '@/components/Contact/HowToContact.component'
import MapSection from '@/components/Contact/MapSection.component'
import ReservationComponent from '@/components/Contact/Reservation.component'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import { Metadata } from 'next'

// Force dynamic rendering to avoid any static optimization
export const dynamic = 'force-dynamic'

/**
 * Generates metadata for contact page
 */
export async function generateMetadata(): Promise<Metadata> {
	return {
		alternates: {
			canonical: 'https://latavernedesaventuriers.fr/contact',
		},
		description:
			"Contactez La Taverne des Aventuriers à Nantes. Réservations, horaires d'ouverture, accès et localisation de votre bar à jeux au centre-ville.",
		keywords: [
			'contact bar nantes',
			'réservation bar jeux',
			'horaires taverne aventuriers',
			'bar centre nantes',
			'accès taverne aventuriers',
			'réservation groupe nantes',
			'bar jeux contact',
			'contact ludothèque nantes',
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
		title: 'Contact | La Taverne des Aventuriers',
	}
}

export default async function Contact() {
	const dataContact = await getContactData()
	const navItems = await getNavBarData()

	// Structured data for contact page
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BarOrPub',
		address: {
			'@type': 'PostalAddress',
			addressCountry: 'FR',
			addressLocality: 'Nantes',
			postalCode: '44000',
			streetAddress: dataContact.address,
		},
		contactPoint: {
			'@type': 'ContactPoint',
			availableLanguage: ['French'],
			contactType: 'reservations',
		},
		description: 'Bar à jeux médiéval-fantastique à Nantes',
		email: dataContact.contact_email,
		geo: {
			'@type': 'GeoCoordinates',
			latitude: '47.2127234',
			longitude: '-1.5555402,17',
		},
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
		sameAs: [
			dataContact.facebook_url,
			dataContact.instagram_url,
			dataContact.myludo_url,
		],
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
			<div className='relative flex h-screen w-screen flex-col items-center gap-96'>
				{/* Existing UI code... */}
				<Navbar navItems={navItems} />
				<MobileNavbar navItems={navItems} />

				<div className='mask-custom absolute bottom-0 left-0 h-[125vh] w-full -translate-y-[70vh] transform bg-background-image opacity-75'></div>

				<div className='relative mt-64 flex flex-col items-center gap-64'>
					<HowToContact data={dataContact} />
					<ContactElements data={dataContact} />
					<ReservationComponent />
					<MapSection data={dataContact} />
				</div>

				<div>
					<FooterComponent />
				</div>
			</div>
		</>
	)
}
