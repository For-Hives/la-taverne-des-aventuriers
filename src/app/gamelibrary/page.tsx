import GameComponent from '@/components/GameLibrary/Games.component'
import GLHeroComponent from '@/components/GameLibrary/GLHero.component'
import MyLudoComponent from '@/components/GameLibrary/MyLudo.component'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'

export default function Page() {
	return (
		<div className='flex h-screen w-screen flex-col items-center'>
			{/* Navbar */}
			<Navbar />
			<MobileNavbar />

			<GLHeroComponent />

			{/* Main Content */}
			<div className='items flex w-full flex-col justify-center py-16'>
				<div className='flex flex-col items-center gap-40'>
					<GameComponent />
					<MyLudoComponent />
				</div>
			</div>

			{/* Footer */}
			<div className='w-full'>
				<FooterComponent />
			</div>
		</div>
	)
}
