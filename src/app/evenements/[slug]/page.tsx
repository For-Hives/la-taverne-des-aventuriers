import { getEventData } from '@/app/actions/services/getEventData'
import { getNavBarData } from '@/app/actions/services/getNavData.service'
import SpecialEventComponent from '@/components/Events/SpecialEvent.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import { Metadata } from 'next'

type PageProps = Promise<{
	slug: string
}>

/**
 * Generates metadata for individual event pages
 */
export async function generateMetadata({
	params,
}: {
	params: PageProps
}): Promise<Metadata> {
	const { slug } = await params
	const eventData = await getEventData(slug)

	if (!eventData) {
		return {
			description: "La page demandée n'existe pas.",
			title: 'Événement non trouvé | La Taverne des Aventuriers',
		}
	}

	return {
		alternates: {
			canonical: `https://latavernedesaventuriers.fr/evenements/${eventData.event_slug}`,
		},
		description: eventData.summary,
		keywords: [
			'événement nantes',
			'soirée jeux nantes',
			'animation bar nantes',
			'taverne des aventuriers',
			eventData.event_title.toLowerCase(),
			'bar à jeux',
			'animation ludique',
			'sortie nantes',
		],
		robots: {
			follow: true,
			index: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
		title: `${eventData.event_title} | La Taverne des Aventuriers`,
	}
}

export default async function Page({
	params,
}: Readonly<{ params: PageProps }>) {
	const { slug } = await params
	const eventData = await getEventData(slug)
	const navItems = await getNavBarData()

	if (!eventData) {
		return (
			<div className='flex min-h-screen flex-col items-center justify-center'>
				<h1 className='text-2xl text-customBrown-100'>Événement non trouvé</h1>
			</div>
		)
	}

	// Structured data focused on event specifics
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'SocialEvent',
		description: eventData.summary,
		eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
		eventStatus: 'https://schema.org/EventScheduled',
		image: eventData.event_image
			? `https://latavernedesaventuriers.fr/assets/images/events/${eventData.event_image}`
			: undefined,
		isAccessibleForFree: false,
		location: {
			'@type': 'BarOrPub',
			address: {
				'@type': 'PostalAddress',
				addressCountry: 'FR',
				addressLocality: 'Nantes',
				postalCode: '44000',
				streetAddress: '13 Rue Kervégan',
			},
			name: 'La Taverne des Aventuriers',
		},
		name: eventData.event_title,
		organizer: {
			'@type': 'BarOrPub',
			name: 'La Taverne des Aventuriers',
			url: 'https://latavernedesaventuriers.fr',
		},
		startDate: eventData.event_date,
		typicalAgeRange: '18+',
	}

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			<div className='flex flex-col gap-64'>
				<Navbar navItems={navItems} />
				<MobileNavbar navItems={navItems} />

				<div className='relative mt-36 flex flex-col items-center gap-24'>
					<SpecialEventComponent data={eventData} />
				</div>
			</div>
		</>
	)
}
