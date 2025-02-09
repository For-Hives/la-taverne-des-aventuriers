import { getGameLibraryPageData } from '@/app/actions/services/getGamePageData.service'
import { getNavBarData } from '@/app/actions/services/getNavData.service'
import GameComponent from '@/components/GameLibrary/Games.component'
import GLHeroComponent from '@/components/GameLibrary/GLHero.component'
import MyLudoComponent from '@/components/GameLibrary/MyLudo.component'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'

export default async function Page() {
	const dataGameLibrary = await getGameLibraryPageData()
	const navItems = await getNavBarData()

	return (
		dataGameLibrary && (
			<div className='flex min-h-screen flex-col'>
				<Navbar navItems={navItems} />
				<MobileNavbar navItems={navItems} />

				<GLHeroComponent data={dataGameLibrary} />

				{/* Main Content */}
				<main className='flex w-full flex-grow flex-col items-center py-8 sm:py-16'>
					{/* Hero section for Game Library */}

					{/* Other components such as game list and My Ludo */}
					<div className='flex w-full flex-col items-center gap-40'>
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
