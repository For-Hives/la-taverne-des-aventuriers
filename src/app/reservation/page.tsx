import ContactElements from '@/components/Contact/ContactElementsSection.component'
import ReservationComponent from '@/components/Contact/Reservation.component'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'

export default function reservation() {
	return (
		<div className='relative flex h-screen w-screen flex-col items-center gap-96'>
			{/* Navbar for desktop */}
			<Navbar />
			{/* Navbar for mobile */}
			<MobileNavbar />

			{/* Background image overlay */}
			<div className='mask-custom bg-background-image absolute bottom-0 left-0 h-[125vh] w-full -translate-y-[70vh] transform opacity-75'></div>

			{/* Main content section with spacing */}
			<div className='relative mt-64 flex flex-col items-center gap-64'>
				{/* Reservation section */}
				<ReservationComponent />
				{/* Contact elements section */}
				<ContactElements />
			</div>

			{/* Footer section */}
			<FooterComponent />
		</div>
	)
}
