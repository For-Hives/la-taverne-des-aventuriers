import { getContactData } from '@/app/actions/services/getContactPageData.service'
import ContactElements from '@/components/Contact/ContactElementsSection.component'
import ReservationComponent from '@/components/Contact/Reservation.component'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'

export default async function reservation() {
	const dataContact = await getContactData()

	return (
		dataContact && (
			<div className='relative flex h-screen w-screen flex-col items-center gap-96'>
				{/* Navbar for desktop */}
				<Navbar />
				{/* Navbar for mobile */}
				<MobileNavbar />

				{/* Background image overlay */}
				<div className='mask-custom absolute bottom-0 left-0 h-[125vh] w-full -translate-y-[70vh] transform bg-background-image opacity-75'></div>

				{/* Main content section with spacing */}
				<div className='relative mt-64 flex flex-col items-center gap-64'>
					{/* Reservation section */}
					<ReservationComponent />
					{/* Contact elements section */}
					<ContactElements data={dataContact} />
				</div>

				{/* Footer section */}
				<FooterComponent />
			</div>
		)
	)
}
