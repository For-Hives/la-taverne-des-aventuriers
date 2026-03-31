import type { Metadata } from 'next'

import { getMocktailBattleData } from '@/app/actions/services/getMocktailBattlePageData.service'
import { getNavBarData } from '@/app/actions/services/getNavData.service'
import MocktailBattleComponent from '@/components/CocktailBattle/MocktailBattle.component'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'

export const revalidate = 10

/**
 * Generates metadata for battle page
 */
export async function generateMetadata(): Promise<Metadata> {
	return {
		alternates: {
			canonical: 'https://latavernedesaventuriers.fr/battle/mocktails',
		},
		description:
			'Battle des mocktails à La Taverne des Aventuriers. Votez pour votre création préférée et décidez quel mocktail restera sur notre carte.',
		keywords: [
			'battle mocktails nantes',
			'compétition mocktails',
			'mocktails création nantes',
			'vote mocktails nantes',
			'taverne des aventuriers battle',
			'mocktails médiévaux',
			'bar thématique nantes',
			'événement mocktail nantes',
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
		title: 'Battle des Mocktails | La Taverne des Aventuriers',
	}
}

export default async function Page() {
	const navItems = await getNavBarData()
	const BattleData = await getMocktailBattleData()

	// Structured data pour la compétition
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Event',
		description: `Battle mensuelle entre ${BattleData.mocktail1_title} et ${BattleData.mocktail2_title}. Le mocktail gagnant restera sur notre carte !`,
		endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString(),
		eventStatus: 'https://schema.org/EventScheduled',
		image: [BattleData.mocktail_1_image, BattleData.mocktail_2_image],
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
		name: 'Battle des Mocktails',
		offers: {
			'@type': 'Offer',
			availability: 'https://schema.org/InStock',
			price: '9.00',
			priceCurrency: 'EUR',
		},
		organizer: {
			'@type': 'BarOrPub',
			name: 'La Taverne des Aventuriers',
			url: 'https://latavernedesaventuriers.fr',
		},
		startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
	}

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			{BattleData && (
				<div>
					<Navbar navItems={navItems} />
					<MobileNavbar navItems={navItems} />

					<div className="mt-36 flex w-full flex-col">
						<MocktailBattleComponent data={BattleData} />
					</div>

					<FooterComponent />
				</div>
			)}
		</>
	)
}
