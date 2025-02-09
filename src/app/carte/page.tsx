import { getNavBarData } from '@/app/actions/services/getNavData.service'
import BackToTop from '@/components/Global/BackToTop.component'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import BeerWineElement from '@/components/Menu/BeerWineElements.component'
import DrinkElement from '@/components/Menu/DrinkElement.component'
import MenuNavbar from '@/components/Menu/MenuNavbar.component'
import MenuNavbarOnScroll from '@/components/Menu/MenuNavbarOnScroll.component'
import SoftsAndHotElement from '@/components/Menu/SoftsAndHotElement.component'
import TravelersPleasureElement from '@/components/Menu/TravelersPleasureElement.component'

export default async function Page() {
	const navItems = await getNavBarData()

	// List of drink categories
	const listDrinkCollection = [
		'Cocktails',
		'Mocktails',
		'Shooters',
		'Short_long_drinks',
		'Planches',
	]

	return (
		<div className='flex h-screen w-screen flex-col items-center'>
			<Navbar navItems={navItems} />
			<MobileNavbar navItems={navItems} />

			{/* Menu Hero section */}
			<div className='mask-custom absolute bottom-0 left-0 h-[125vh] w-full -translate-y-[70vh] transform bg-background-image opacity-75'></div>

			{/* Menu Section */}
			<div className='mt-[30vh] flex w-full flex-col justify-center py-16'>
				{/* This margin-top pushes the content below the Menu Hero section */}
				<MenuNavbar />
				<MenuNavbarOnScroll />
				{/* Drink categories mapped to their corresponding component */}
				<div className='flex flex-col items-center justify-center gap-40'>
					{listDrinkCollection.map(drink => (
						<div
							id={drink.toLowerCase().replaceAll('_', '-')}
							key={drink}
							className='flex w-full justify-center'
						>
							{/* Drink category element */}
							<DrinkElement collection_name={drink} />
						</div>
					))}

					{/* Beer and Wine section */}
					<div id='beer-wine' className='flex justify-center lg:w-3/4'>
						<BeerWineElement />
					</div>
					{/* Travelers' Pleasure section */}
					<div id='travelers' className='flex justify-center'>
						<TravelersPleasureElement />
					</div>
					{/* Soft drinks and hot drinks section */}
					<div id='softs-hot-drinks' className='flex justify-center'>
						<SoftsAndHotElement />
					</div>
					{/* Back to top button */}
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
