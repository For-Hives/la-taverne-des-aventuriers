'use client'

import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import BeerWineElement from '@/components/Menu/BeerWineElements.component'
import DrinkElement from '@/components/Menu/DrinkElement.component'
import MenuHeroComponent from '@/components/Menu/MenuHero.component'
import MenuNavbar from '@/components/Menu/MenuNavbar.component'
import SoftsAndHotElement from '@/components/Menu/SoftsAndHotElement.component'
import TravelersPleasureElement from '@/components/Menu/TravelersPleasureElement.component'
import { useStore } from '@/stores/MenuNavbarStore'

/**
 * List of available drink collections
 */
const listDrinkCollection = [
	'Cocktails',
	'Mocktails',
	'Shooters',
	'Short_long_drinks',
	'Boards',
]

/**
 * Menu Page Component
 */
export default function Page() {
	// Get active category from store
	const activeCategory = useStore(state => state.activeCategory)

	// Filter items based on active category
	const filteredItems = listDrinkCollection.filter(
		drink => activeCategory === 'All' || drink === activeCategory
	)

	return (
		<div className='flex h-screen w-screen flex-col items-center'>
			{/* Navigation */}
			<Navbar />
			<MobileNavbar />

			{/* Hero Section */}
			<MenuHeroComponent />

			{/* Menu Section */}
			<div className='items flex w-full flex-col justify-center py-16'>
				<MenuNavbar />
				<div className='flex flex-col items-center gap-40'>
					{/* Drink Elements */}
					{filteredItems.map((drink, index) => (
						<DrinkElement collection_name={drink} key={`drink-${drink}`} />
					))}

					{/* Additional Elements */}
					{(activeCategory === 'All' ||
						activeCategory === 'Bièrres et Vins') && <BeerWineElement />}

					{(activeCategory === 'All' ||
						activeCategory === 'Softs et Boissons Chaudes') && (
						<SoftsAndHotElement />
					)}

					{(activeCategory === 'All' || activeCategory === 'Planche') && (
						<TravelersPleasureElement />
					)}
				</div>
			</div>

			{/* Footer */}
			<div className='w-full'>
				<FooterComponent />
			</div>
		</div>
	)
}
