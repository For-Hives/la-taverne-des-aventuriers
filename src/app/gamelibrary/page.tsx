import { getGameLibraryPageData } from '@/app/actions/services/getGamePageData.service'
import GameComponent from '@/components/GameLibrary/Games.component'
import GLHeroComponent from '@/components/GameLibrary/GLHero.component'
import MyLudoComponent from '@/components/GameLibrary/MyLudo.component'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'

export default async function Page() {
	const dataGameLibrary = await getGameLibraryPageData()
	return (
		dataGameLibrary && (
			<div className='flex min-h-screen flex-col'>
				{/* Navbar for desktop */}
				<Navbar />
				{/* Navbar for mobile */}
				<MobileNavbar />

				{/* Main Content */}
				<main className='flex w-full flex-grow flex-col items-center py-8 sm:py-16'>
					{/* Hero section for Game Library */}
					<GLHeroComponent data={dataGameLibrary} />

					{/* Other components such as game list and My Ludo */}
					<div className='flex w-full flex-col items-center gap-10 sm:gap-20 md:gap-40'>
						{/* Display the list of games */}
						<GameComponent data={dataGameLibrary} />
						{/* Display the My Ludo game */}
						<MyLudoComponent data={dataGameLibrary} />
					</div>
				</main>

				{/* Footer */}
				<FooterComponent />
			</div>
		)
	)
}
