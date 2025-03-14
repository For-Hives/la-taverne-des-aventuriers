import { getNavBarData } from '@/app/actions/services/getNavData.service'
import BattleBanner from '@/components/CocktailBattle/BattleBanner.component'
import BackToTop from '@/components/Global/BackToTop.component'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import BeerWineElement from '@/components/Menu/BeerWineElements.component'
import DrinkElement from '@/components/Menu/DrinkElement.component'
import MenuDock from '@/components/Menu/MenuDock.component'
import SoftsAndHotElement from '@/components/Menu/SoftsAndHotElement.component'
import TravelersPleasureElement from '@/components/Menu/TravelersPleasureElement.component'
import { Metadata } from 'next'

export const revalidate = 10

/**
 * Generates metadata for menu page
 */
export async function generateMetadata(): Promise<Metadata> {
	return {
		alternates: {
			canonical: 'https://latavernedesaventuriers.fr/carte',
		},
		description:
			'Découvrez nos cocktails, bières artisanales et planches à partager. Menu thématique médiéval dans votre bar à jeux à Nantes.',
		keywords: [
			'cocktails nantes',
			'mocktails',
			'bières artisanales',
			'bar thématique',
			'planches apéritives',
			'carte bar nantes',
			'cocktails médiévaux',
			'bar centre-ville nantes',
		],
		robots: {
			follow: true,
			index: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
		title: 'Carte & Boissons | La Taverne des Aventuriers',
	}
}

export default async function Page() {
	const navItems = await getNavBarData()

	const listDrinkCollection = [
		'Cocktails',
		'Mocktails',
		'Shooters',
		'Short_long_drinks',
		'Planches',
	]

	// Whether to show prices globally (at top of section) or individually
	const pricingConfig = {
		Cocktails: 'global',
		Mocktails: 'global',
		Planches: 'individual',
		Shooters: 'global',
		Short_long_drinks: 'global',
	} as const

	// Structured data for menu
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Menu',
		description:
			'Cocktails, mocktails, bières artisanales et planches à partager',
		hasMenuSection: [
			{
				'@type': 'MenuSection',
				description: 'Cocktails originaux dans un univers médiéval-fantastique',
				name: 'Cocktails',
			},
			{
				'@type': 'MenuSection',
				description: 'Cocktails sans alcool créatifs',
				name: 'Mocktails',
			},
			{
				'@type': 'MenuSection',
				description: 'Sélection de bières artisanales et vins',
				name: 'Bières et Vins',
			},
			{
				'@type': 'MenuSection',
				description: 'Planches à partager de fromages et charcuteries',
				name: 'Planches',
			},
		],
		inLanguage: 'fr-FR',
		isAvailableAt: {
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
		name: 'Carte de La Taverne des Aventuriers',
	}

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			{/* SEO H1 heading - visually hidden but present for search engines */}
			<h1 className='sr-only'>
				Carte & Boissons - Cocktails et Menu de La Taverne des Aventuriers
			</h1>

			<div className='flex h-screen w-screen flex-col items-center'>
				{/* Navigation */}
				<Navbar navItems={navItems} />
				<MobileNavbar navItems={navItems} />

				{/* Background */}
				<div className='mask-custom absolute bottom-0 left-0 h-[125vh] w-full -translate-y-[70vh] transform bg-background-image opacity-75'></div>

				{/* Battle des Cocktails Banner */}
				<div className='mt-[20vh] flex w-full flex-col justify-center py-16'>
					<BattleBanner />

					{/* Menu Content */}
					<div className='flex flex-col items-center justify-center gap-40'>
						{/* Menu Sections */}
						{listDrinkCollection.map(drink => (
							<div
								id={drink.toLowerCase().replaceAll('_', '-')}
								key={drink}
								className='flex w-full scroll-mt-32 justify-center'
							>
								<DrinkElement
									collection_name={drink}
									priceDisplay={
										pricingConfig[drink as keyof typeof pricingConfig]
									}
								/>
							</div>
						))}

						<div id='travelers' className='flex scroll-mt-32 justify-center'>
							<TravelersPleasureElement priceDisplay='global' />
						</div>

						{/* Other Sections */}
						<div id='beer-wine' className='flex scroll-mt-32 justify-center'>
							<BeerWineElement />
						</div>

						<div
							id='softs-hot-drinks'
							className='flex scroll-mt-32 justify-center'
						>
							<SoftsAndHotElement />
						</div>

						{/* Back to Top Button */}
						<BackToTop />
					</div>
				</div>

				{/* Floating Menu Dock */}
				<MenuDock />

				{/* Footer */}
				<div className='w-full'>
					<FooterComponent />
				</div>
			</div>
		</>
	)
}
