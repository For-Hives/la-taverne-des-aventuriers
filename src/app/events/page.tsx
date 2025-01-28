import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'

export default function Page() {
	return (
		<div className='flex w-full flex-col items-center justify-center gap-40'>
			{/* Navbar for desktop */}
			<Navbar />
			{/* Navbar for mobile */}
			<MobileNavbar />
		</div>
	)
}
