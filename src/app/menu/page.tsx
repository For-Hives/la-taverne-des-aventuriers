import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import BeerWineElement from '@/components/Menu/BeerWineElements.component'
import DrinkElement from '@/components/Menu/DrinkElement.component'
import MenuHeroComponent from '@/components/Menu/MenuHero.component'
import MenuNavbar from '@/components/Menu/MenuNavbar.component'
import SoftsAndHotElement from '@/components/Menu/SoftsAndHotElement.component'
import TravelersPleasureElement from '@/components/Menu/TravelersPleasureElement.component'

const listDrinkCollection = [
	'Cocktails',
	'Mocktails',
	'Shooters',
	'Short_long_drinks',
	'Boards',
]

export default function Page() {
	return (
		<div className='flex h-screen w-screen flex-col items-center'>
			{/* Navbar */}
			<Navbar />
			<MobileNavbar />

			<MenuHeroComponent />

			{/* Menu Section */}
			<div className='items flex w-full flex-col justify-center py-16'>
				<MenuNavbar />
				<div className='flex flex-col items-center gap-40'>
					{listDrinkCollection.map((drink, index) => (
						<DrinkElement collection_name={drink} key={index} />
					))}

					<BeerWineElement />
					<TravelersPleasureElement />
					<SoftsAndHotElement />
				</div>
			</div>

			{/* Footer */}
			<div className='w-full'>
				<FooterComponent />
			</div>
		</div>
	)
}
