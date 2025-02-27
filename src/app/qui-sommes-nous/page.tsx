import { getNavBarData } from '@/app/actions/services/getNavData.service'
import { getWhoAreWePageData } from '@/app/actions/services/getWhoAreWePageData.service'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import { ReservationElementComponent as WhoAreWeElementComponent } from '@/components/Reservation/ReservationElementsSection'
import { Metadata } from 'next'

export const revalidate = 3600

/**
 * Generates metadata for about page
 */
export async function generateMetadata(): Promise<Metadata> {
	return {
		alternates: {
			canonical: 'https://latavernedesaventuriers.fr/qui-sommes-nous',
		},
		description:
			"Découvrez l'histoire de La Taverne des Aventuriers, votre bar à jeux médiéval-fantastique à Nantes. Notre concept unique, notre équipe passionnée et notre collection de plus de 90 jeux.",
		keywords: [
			'bar à jeux nantes',
			'taverne des aventuriers',
			'concept bar jeux',
			'bar médiéval nantes',
			'histoire taverne aventuriers',
			'équipe bar jeux',
			'bar centre nantes',
			'concept original nantes',
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
		title: 'Qui Sommes-Nous | La Taverne des Aventuriers',
	}
}

export default async function Page() {
	const navItems = await getNavBarData()
	const whoAreWeData = await getWhoAreWePageData()

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'AboutPage',
		description: whoAreWeData.description_card_1,
		name: whoAreWeData.who_are_we_title,
		provider: {
			'@type': 'BarOrPub',
			description: 'Bar à jeux médiéval-fantastique à Nantes',
			foundingDate: '2024',
			name: 'La Taverne des Aventuriers',
			numberOfEmployees: {
				'@type': 'QuantitativeValue',
				maxValue: '10',
				minValue: '1',
			},
		},
	}

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			<div className='flex flex-col items-center'>
				<Navbar navItems={navItems} />
				<MobileNavbar navItems={navItems} />

				<div className='mask-custom absolute bottom-0 left-0 h-[125vh] w-full -translate-y-[70vh] transform bg-background-image opacity-75'></div>

				<div className='relative mt-64 flex flex-col items-center gap-64'>
					<WhoAreWeElementComponent />
					<FooterComponent />
				</div>
			</div>
		</>
	)
}
