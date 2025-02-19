import { getEventListData } from '@/app/actions/services/getEventListData'
import { getEventPageData } from '@/app/actions/services/getEventPageData'
import { getNavBarData } from '@/app/actions/services/getNavData.service'
import EventHeroComponent from '@/components/Events/EventHero.component'
import EventListComponent from '@/components/Events/EventList.component'
import ImportantEventComponent from '@/components/Events/ImportantEvent.component'
import { Timeline } from '@/components/Events/Timeline'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import { Metadata } from 'next'

/**
 * Generates metadata for events page
 */
export async function generateMetadata(): Promise<Metadata> {
	const events = await getEventListData()

	// Get the upcoming events for metadata
	const upcomingEvents = events.filter(
		event => new Date(event.event_date) > new Date()
	)
	const nextEvent = upcomingEvents[0]

	return {
		alternates: {
			canonical: 'https://latavernedesaventuriers.fr/evenements',
		},
		description: `Découvrez nos prochains événements : soirées jeux, tournois, quiz et animations à La Taverne des Aventuriers. ${nextEvent ? `Prochain événement : ${nextEvent.event_title}` : ''}`,
		keywords: [
			'événements nantes',
			'soirées jeux nantes',
			'quiz bar nantes',
			'animations bar jeux',
			'tournois jeux société',
			'soirées à thème nantes',
			'agenda taverne aventuriers',
			'animation ludique nantes',
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
		title: 'Événements | La Taverne des Aventuriers',
	}
}

export default async function Page() {
	const eventPageData = await getEventPageData()
	const eventsData = await getEventListData()
	const navItems = await getNavBarData()

	const timelineEvents = eventsData.map(event => ({
		date: event.event_date,
		id: event.id,
		image: event.event_image,
		important: event.Important_One,
		slug: event.event_slug,
		summary: event.summary,
		title: event.event_title,
	}))

	// Structured data for events
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'EventSeries',
		description: eventPageData.event_description,
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
		name: 'Événements à La Taverne des Aventuriers',
		subEvents: eventsData.map(event => ({
			'@type': 'Event',
			description: event.event_description,
			eventStatus: 'https://schema.org/EventScheduled',
			image: event.event_image
				? `https://latavernedesaventuriers.fr${event.event_image}`
				: undefined,
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
			name: event.event_title,
			startDate: event.event_date,
		})),
	}

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			<div className='relative min-h-screen bg-customWhite-200'>
				<Navbar navItems={navItems} />
				<MobileNavbar navItems={navItems} />

				<div className='relative mt-36 px-4 md:px-8'>
					<div className='mx-auto mb-16 max-w-4xl text-center'>
						<h1 className='mb-8 font-cardinal text-6xl text-customBrown-100 md:text-8xl'>
							{eventPageData.page_title}
						</h1>
						<div
							className='font-cardoRegular text-lg text-customBrown-100'
							dangerouslySetInnerHTML={{
								__html: eventPageData.event_description,
							}}
						/>
					</div>

					<Timeline events={timelineEvents} />
				</div>

				<FooterComponent />
			</div>
		</>
	)
}
