import { getCocktailBattleData } from '@/app/actions/services/getCocktailBattlePageData.service'
import { getNavBarData } from '@/app/actions/services/getNavData.service'
import CocktailVersusComponent from '@/components/CocktailBattle/CocktailVersus.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import FooterComponent from "@/components/Global/Footer.component";
import { Metadata } from 'next'

/**
 * Generates metadata for battle page
 */
export async function generateMetadata(): Promise<Metadata> {
	return {
		alternates: {
			canonical: 'https://latavernedesaventuriers.fr/battle',
		},
		description:
			'Battle mensuelle des cocktails à La Taverne des Aventuriers. Votez pour votre cocktail préféré et décidez lequel restera sur notre carte. Une compétition unique tous les mois entre deux créations originales.',
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

					<div className='mask-custom absolute bottom-0 left-0 h-[125vh] w-full -translate-y-[70vh] transform bg-background-image opacity-75'></div>

					<div className='mt-64 flex w-full flex-col'>
						<CocktailVersusComponent data={BattleData} />

				</div>

				<FooterComponent />

			</div>
		)
	)
}
