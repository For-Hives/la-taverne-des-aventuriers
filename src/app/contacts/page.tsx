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
			{/* Navbar */}
			<Navbar />
			<MobileNavbar />

			{/* Image de fond */}
			<div className='mask-custom absolute bottom-0 left-0 h-[125%] w-full -translate-y-[55%] transform bg-whoareweimage opacity-75'></div>

			{/* Contenu principal avec espacement */}
			<div className='relative mt-[256px] flex flex-col items-center gap-[256px]'>
				<HowToContact />
				<ContactElements />
				<ReservationComponent />
				<MapSection />
			</div>

			<FooterComponent />
		</div>
	)
}
