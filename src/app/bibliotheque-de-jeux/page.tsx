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

				{/* Background image with custom mask */}
				<div className='mask-custom absolute bottom-0 left-0 h-[125vh] w-full -translate-y-[70vh] transform bg-background-image opacity-75'></div>

				{/* Main content with spacing between sections */}
				<div className='mt-64 flex w-full flex-col items-center justify-center gap-24'>
					<GLHeroComponent data={dataGameLibrary} />
					<div className='mt-64 flex w-full flex-col items-center justify-center gap-64'>
						<GameComponent data={dataGameLibrary} />
						<MyLudoComponent data={dataGameLibrary} />
					</div>
				</div>

				{/* Main Content */}
				<main className='flex w-full flex-grow flex-col items-center py-8 sm:py-16'>
					{/* Other components such as game list and My Ludo */}
					<div className='flex w-full flex-col items-center gap-40'>
						{/* Hero section for Game Library */}
						<div className='flex w-full flex-col'></div>
						{/* Display the list of games */}
					</div>
				</main>

				{/* Footer */}
				<FooterComponent />
			</div>
		)
	)
}