import BackToTop from '@/components/Global/BackToTop.component'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import BeerWineElement from '@/components/Menu/BeerWineElements.component'
import DrinkElement from '@/components/Menu/DrinkElement.component'
import MenuHeroComponent from '@/components/Menu/MenuHero.component'
import MenuNavbar from '@/components/Menu/MenuNavbar.component'
import SoftsAndHotElement from '@/components/Menu/SoftsAndHotElement.component'
import TravelersPleasureElement from '@/components/Menu/TravelersPleasureElement.component'

export default function Page() {
	const listDrinkCollection = [
		'Cocktails',
		'Mocktails',
		'Shooters',
		'Short_long_drinks',
		'Boards',
	]

	return (
		<div className='flex h-screen w-screen flex-col items-center'>
			{/* Navbar */}
			<Navbar />
			<MobileNavbar />

			<MenuHeroComponent />

			{/* Menu Section */}
			<div className='items flex w-full flex-col justify-center py-16'>
				<MenuNavbar />
				<div className='flex flex-col items-center justify-center gap-40'>
					{listDrinkCollection.map(drink => (
						<div
							id={drink.toLowerCase().replaceAll('_', '-')}
							key={drink}
							className='flex w-full justify-center'
						>
							{/* Utilisation du nom de collection sans formatage supplémentaire */}
							<DrinkElement collection_name={drink} />
						</div>
					))}

					<div id='beer-wine' className='flex justify-center'>
						<BeerWineElement />
					</div>
					<div id='boards' className='flex justify-center'>
						<TravelersPleasureElement />
					</div>
					<div id='softs-hot-drinks' className='flex justify-center'>
						<SoftsAndHotElement />
					</div>
					<BackToTop />
				</div>
			</div>

			{/* Footer */}
			<div className='w-full'>
				<FooterComponent />
			</div>
		</div>
	)
}
