import { getContactData } from '@/app/actions/services/getContactPageData.service'
import ContactElements from '@/components/Contact/ContactElementsSection.component'
import HowToContact from '@/components/Contact/HowToContact.component'
import MapSection from '@/components/Contact/MapSection.component'
import ReservationComponent from '@/components/Contact/Reservation.component'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'

export default async function Contact() {
	const dataContact = await getContactData()

	return (
		dataContact && (
			<div className='relative flex h-screen w-screen flex-col items-center gap-96'>
				{/* Navbar for desktop */}
				<Navbar />
				{/* Navbar for mobile */}
				<MobileNavbar />

				{/* Background image with custom mask */}
				<div className='mask-custom absolute bottom-0 left-0 h-[125vh] w-full -translate-y-[70vh] transform bg-background-image opacity-75'></div>

				{/* Main content with spacing between sections */}
				<div className='relative mt-64 flex flex-col items-center gap-64'>
					{/* How to contact section */}
					<HowToContact data={dataContact} />
					{/* Contact details section */}
					<ContactElements data={dataContact} />
					{/* Reservation component */}
					<ReservationComponent />
					{/* Map section */}
					<MapSection data={dataContact} />
				</div>

				<div>
					{/* Footer */}
					<FooterComponent />
				</div>
			</div>
		)
	)
}
