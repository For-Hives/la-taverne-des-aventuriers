import { getNavBarData } from '@/app/actions/services/getNavData.service'
import BackToTop from '@/components/Global/BackToTop.component'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import BeerWineElement from '@/components/Menu/BeerWineElements.component'
import ButtonBattleCocktailsComponent from '@/components/Menu/ButtonBattleCocktails.component'
import DrinkElement from '@/components/Menu/DrinkElement.component'
import MenuNavbar from '@/components/Menu/MenuNavbar.component'
import MenuNavbarOnScroll from '@/components/Menu/MenuNavbarOnScroll.component'
import SoftsAndHotElement from '@/components/Menu/SoftsAndHotElement.component'
import TravelersPleasureElement from '@/components/Menu/TravelersPleasureElement.component'
import { Metadata } from 'next'

/**
 * Generates metadata for menu page
 */
export async function generateMetadata(): Promise<Metadata> {
	return {
		alternates: {
			canonical: 'https://latavernedesaventuriers.fr/carte',
		},
		description:
			'Découvrez notre carte de cocktails, mocktails, bières artisanales et planches à partager. Menu thématique médiéval-fantastique dans votre bar à jeux à Nantes.',
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
		title: 'Carte | La Taverne des Aventuriers',
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
			<div className='flex h-screen w-screen flex-col items-center'>
				{/* Existing UI code... */}
				<Navbar navItems={navItems} />
				<MobileNavbar navItems={navItems} />

				<div className='mask-custom absolute bottom-0 left-0 h-[125vh] w-full -translate-y-[70vh] transform bg-background-image opacity-75'></div>

				<div className='mt-[30vh] flex w-full flex-col justify-center py-16'>
					<ButtonBattleCocktailsComponent />

					<MenuNavbar />
					<MenuNavbarOnScroll />

					<div className='flex flex-col items-center justify-center gap-40'>
						{listDrinkCollection.map(drink => (
							<div
								id={drink.toLowerCase().replaceAll('_', '-')}
								key={drink}
								className='flex w-full justify-center'
							>
								<DrinkElement collection_name={drink} />
							</div>
						))}

						<div id='beer-wine' className='flex justify-center lg:w-3/4'>
							<BeerWineElement />
						</div>
						<div id='travelers' className='flex justify-center'>
							<TravelersPleasureElement />
						</div>
						<div id='softs-hot-drinks' className='flex justify-center'>
							<SoftsAndHotElement />
						</div>
						<BackToTop />
					</div>
				</div>

				<div className='w-full'>
					<FooterComponent />
				</div>
			</div>
		</>
	)
}
