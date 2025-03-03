import { getEventData } from '@/app/actions/services/getEventData'
import { getNavBarData } from '@/app/actions/services/getNavData.service'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import { textToSpanColored } from '@/utils/textToSpanColored'
import {
	faArrowLeft,
	faCalendarAlt,
	faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 10

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
	// Truncate description to max 155 characters and remove HTML tags
	const truncateDescription = (
		text: string,
		maxLength: number = 155
	): string => {
		// Remove HTML tags and special characters
		const cleanText = text
			.replace(/<[^>]*>/g, '') // Remove HTML tags
			.replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
			.replace(/&[^;]+;/g, '') // Remove other HTML entities
			.replace(/\s+/g, ' ') // Normalize whitespace
			.trim()

		if (cleanText.length <= maxLength) return cleanText
		// Find the last space before the limit to avoid cutting words
		const lastSpace = cleanText.substring(0, maxLength).lastIndexOf(' ')
		return cleanText.substring(0, lastSpace > 0 ? lastSpace : maxLength) + '...'
	}

	// Truncate title if needed (keeping under 60 characters ideally)
	const truncateTitle = (text: string, maxLength: number = 60): string => {
		// Remove "| La Taverne des Aventuriers" if it would be added later and cause overflow
		const baseText = text.replace(' | La Taverne des Aventuriers', '')
		if (baseText.length <= maxLength - 28) return baseText // 28 is length of " | La Taverne des Aventuriers"
		return truncateDescription(baseText, maxLength - 28)
	}

	// Format optimized metadata
	const optimizedTitle = `${truncateTitle(eventData.event_title)} | La Taverne des Aventuriers`
	const optimizedDescription = truncateDescription(eventData.summary)

	return {
		alternates: {
			canonical: `https://latavernedesaventuriers.fr/evenements/${eventData.event_slug}`,
		},
		description: optimizedDescription,
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
		title: optimizedTitle,
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

	// Format the date nicely in French
	const eventDate = new Date(eventData.event_date)
	const formattedDate = eventDate.toLocaleDateString('fr-FR', {
		day: 'numeric',
		month: 'long',
		weekday: 'long',
		year: 'numeric',
	})

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			<div className='min-h-screen'>
				<Navbar navItems={navItems} />
				<MobileNavbar navItems={navItems} />

				<main className='relative isolate mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8'>
					{/* Back to events link */}
					<Link
						href='/evenements'
						className='group my-4 flex items-center font-cardoRegular text-customBrown-100 hover:text-customRed-100'
					>
						<FontAwesomeIcon
							icon={faArrowLeft}
							className='mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1'
						/>
						Retour aux événements
					</Link>

					<div className=''>
						<div className='grid grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10'>
							{/* Text content */}
							<div className='lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:grid lg:w-full lg:grid-cols-2 lg:gap-x-8 lg:pr-8'>
								<div className='lg:pr-4'>
									<div className='lg:max-w-lg'>
										<p className='text-sm font-bold uppercase tracking-wide text-customRed-100'>
											Événement
										</p>
										<h1
											className='mt-6 font-cardinal text-4xl text-customBrown-100 sm:text-5xl'
											dangerouslySetInnerHTML={{
												__html: textToSpanColored(eventData.event_title),
											}}
										/>

										{/* Event details */}
										<div className='mt-6 flex flex-col gap-3 text-customBrown-100'>
											<div className='flex items-center'>
												<FontAwesomeIcon
													icon={faCalendarAlt}
													className='mr-2 h-5 w-5 text-customRed-100'
												/>
												<span className='font-cardoRegular'>
													{formattedDate}
												</span>
											</div>
											<div className='flex items-center'>
												<FontAwesomeIcon
													icon={faMapMarkerAlt}
													className='mr-2 h-5 w-5 text-customRed-100'
												/>
												<span className='font-cardoRegular'>
													La Taverne des Aventuriers, 13 Rue Kervégan, Nantes
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Event image */}
							<div className='lg:sticky lg:top-12 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:-ml-12 lg:-mt-12 lg:p-6'>
								{eventData.event_image && (
									<div className='relative'>
										<Image
											src={eventData.event_image}
											alt={eventData.event_title}
											className={
												'lg:min-h-auto min-h-[40vh] rounded-xl object-cover shadow-xl lg:min-h-0'
											}
											width={1000}
											height={1000}
										/>
									</div>
								)}
							</div>

							{/* Event description */}
							<div className='lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:grid lg:w-full lg:grid-cols-2 lg:gap-x-8 lg:pr-8'>
								<div className='lg:pr-4'>
									<div className='prose max-w-xl text-base text-customBrown-100 prose-headings:font-cardinal prose-headings:text-customBrown-100 prose-headings:first-letter:text-customRed-100 prose-strong:text-customBrown-100 lg:max-w-lg'>
										<div
											dangerouslySetInnerHTML={{
												__html: eventData.event_description,
											}}
										/>
									</div>

									{/* CTA button */}
									{eventData.button_url && (
										<div className='mt-10'>
											<Link
												href={eventData.button_url}
												className='inline-flex items-center rounded bg-customBrown-100 px-6 py-3 font-cardoRegular text-white shadow-sm hover:bg-customBrown-100/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBrown-100'
											>
												{eventData.button_label || "S'inscrire à cet événement"}
											</Link>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</main>

				<FooterComponent />
			</div>
		</>
	)
}
