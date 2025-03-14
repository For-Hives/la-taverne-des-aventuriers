import { getCocktailBattleData } from '@/app/actions/services/getCocktailBattlePageData.service'
import { getNavBarData } from '@/app/actions/services/getNavData.service'
import CocktailBattleComponent from '@/components/CocktailBattle/CocktailBattle.component'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import { Metadata } from 'next'

export const revalidate = 10

/**
 * Generates metadata for battle page
 */
export async function generateMetadata(): Promise<Metadata> {
	return {
		alternates: {
			canonical: 'https://latavernedesaventuriers.fr/battle',
		},
		description:
			'Battle des cocktails à La Taverne des Aventuriers. Votez pour votre création préférée et décidez quel cocktail restera sur notre carte.',
		keywords: [
			'battle cocktails nantes',
			'compétition cocktails',
			'cocktails création nantes',
			'vote cocktails nantes',
			'taverne des aventuriers battle',
			'cocktails médiévaux',
			'bar thématique nantes',
			'événement cocktail nantes',
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
		title: 'Battle des Cocktails | La Taverne des Aventuriers',
	}
}

export default async function Page() {
	const navItems = await getNavBarData()
	const BattleData = await getCocktailBattleData()

	// Structured data pour la compétition
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Event',
		description: `Battle mensuelle entre ${BattleData.cocktail1_title} et ${BattleData.cocktail2_title}. Le cocktail gagnant restera sur notre carte !`,
		endDate: new Date(
			new Date().getFullYear(),
			new Date().getMonth() + 1,
			0
		).toISOString(),
		eventStatus: 'https://schema.org/EventScheduled',
		image: [BattleData.cocktail_1_image, BattleData.cocktail_2_image],
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
		name: 'Battle des Cocktails',
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
		startDate: new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			1
		).toISOString(),
	}

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			{BattleData && (
				<div>
					<Navbar navItems={navItems} />
					<MobileNavbar navItems={navItems} />

					<div className='mt-36 flex w-full flex-col'>
						<CocktailBattleComponent data={BattleData} />
					</div>

					<FooterComponent />
				</div>
			)}
		</>
	)
}
