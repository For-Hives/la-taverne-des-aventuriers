import ContactElements from '@/components/Contact/ContactElementsSection.component'
import HowToContact from '@/components/Contact/HowToContact.component'
import MapSection from '@/components/Contact/MapSection.component'
import ReservationComponent from '@/components/Contact/Reservation.component'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'

export default function Contact() {
	return (
		<div className='relative flex h-screen w-screen flex-col items-center gap-96'>
			{/* Navbar for desktop */}
			<Navbar />
			{/* Navbar for mobile */}
			<MobileNavbar />

			{/* Background image with custom mask */}
			<div className='mask-custom absolute bottom-0 left-0 h-[125vh] w-full -translate-y-[70vh] transform bg-whoareweimage opacity-75'></div>

			{/* Main content with spacing between sections */}
			<div className='relative mt-64 flex flex-col items-center gap-64'>
				{/* How to contact section */}
				<HowToContact />
				{/* Contact details section */}
				<ContactElements />
				{/* Reservation component */}
				<ReservationComponent />
				{/* Map section */}
				<MapSection />
			</div>

			{/* Footer */}
			<FooterComponent />
		</div>
	)
}
