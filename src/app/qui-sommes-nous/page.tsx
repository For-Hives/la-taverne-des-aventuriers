import { getNavBarData } from '@/app/actions/services/getNavData.service'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import ReservationElementComponent from '@/components/Reservation/ReservationElementsSection'

export default async function Page() {
	const navItems = await getNavBarData()

	return (
		<div className='flex flex-col items-center'>
			<Navbar navItems={navItems} />
			<MobileNavbar navItems={navItems} />

			{/* Background overlay (mask and image) */}
			<div className='mask-custom absolute bottom-0 left-0 h-[125vh] w-full -translate-y-[70vh] transform bg-background-image opacity-75'></div>

			{/* Main content section with a margin at the top */}
			<div className='relative mt-64 flex flex-col items-center gap-64'>
				{/* Reservation section */}
				<ReservationElementComponent />
				{/* Footer section */}
				<FooterComponent />
			</div>
		</div>
	)
}
