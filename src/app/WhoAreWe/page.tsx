import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import ReservationElementComponent from '@/components/Reservation/ReservationElementsSection'

export default function Page() {
	return (
		<div className='flex flex-col items-center'>
			{/* Navbar for desktop */}
			<Navbar />
			{/* Navbar for mobile */}
			<MobileNavbar />

			{/* Background overlay (mask and image) */}
			<div className='mask-custom absolute bottom-0 left-0 h-[125%] w-full -translate-y-[55%] transform bg-whoareweimage opacity-75'></div>

			{/* Main content section with a margin at the top */}
			<div className='relative mt-[256px] flex flex-col items-center gap-[256px]'>
				{/* Reservation section */}
				<ReservationElementComponent />
				{/* Footer section */}
				<FooterComponent />
			</div>
		</div>
	)
}
