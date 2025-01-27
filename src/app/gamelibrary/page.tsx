import GameComponent from '@/components/GameLibrary/Games.component'
import GLHeroComponent from '@/components/GameLibrary/GLHero.component'
import MyLudoComponent from '@/components/GameLibrary/MyLudo.component'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'

export default function Page() {
	return (
		<div className='flex min-h-screen flex-col'>
			{/* Navbar */}
			<Navbar />
			<MobileNavbar />

			{/* Main Content */}
			<main className='flex w-full flex-grow flex-col items-center py-8 sm:py-16'>
				{/* GLHeroComponent */}
				<GLHeroComponent />

				{/* Other Components */}
				<div className='flex w-full flex-col items-center gap-10 sm:gap-20 md:gap-40'>
					<GameComponent />
					<MyLudoComponent />
				</div>
			</main>

			{/* Footer */}
			<FooterComponent />
		</div>
	)
}
