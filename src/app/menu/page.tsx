import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import BeerWineElement from '@/components/Menu/BeerWineElements.component'
import CocktailElement from '@/components/Menu/CocktailElement.component'
import MenuNavbar from '@/components/Menu/MenuNavbar.component'
import MocktailElement from '@/components/Menu/MocktailElement.component'
import PlanchElement from '@/components/Menu/PlanchElement.component'
import ShooterElement from '@/components/Menu/ShooterElement.component'
import ShortLongDrinksElement from '@/components/Menu/ShortLongDrinksElement.component'
import SoftsAndHotElement from '@/components/Menu/SoftsAndHotElement.component'
import TravelersPleasureElement from '@/components/Menu/TravelersPleasureElement.component'

export default function Page() {
	return (
		<div className='flex h-screen w-screen flex-col items-center'>
			{/* Navbar */}
			<Navbar />

			{/* Section Hero */}
			{/* todo: make it component */}
			<div className={'relative'}>
				<div>
					<div className='absolute left-1/2 top-[40%] z-30 flex w-1/2 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-12'>
						<h1 className='font-cardinal text-8xl text-title-200 opacity-100 first-letter:text-title-100'>
							Carte
						</h1>
						<p className='text-center font-obraletra text-xl text-title-200'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut
							turpis dictum, feugiat justo nec, ultrices urna. Curabitur ut
							ipsum et libero pretium viverra. Nullam sed lacus enim. Sed
							tincidunt tincidunt urna, in lacinia ipsum ullamcorper eu. Nunc
							tempus eget augue at interdum. Aliquam in maximus nisl. Duis
							accumsan venenatis dui, dignissim congue leo scelerisque in.
						</p>
					</div>
					<div className='mask-custom h-[115vh] min-h-[115vh] w-[100vw] bg-menuBGImage bg-cover bg-center opacity-75' />
				</div>
			</div>

			{/* Menu Section */}
			<div className='items flex w-full flex-col justify-center py-16'>
				<MenuNavbar />
				<div className='flex flex-col items-center gap-40'>
					<CocktailElement />
					<MocktailElement />
					<ShooterElement />
					<ShortLongDrinksElement />
					<BeerWineElement />
					<TravelersPleasureElement />
					<PlanchElement />
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
