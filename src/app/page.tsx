// imports
import { getLandingData } from '@/app/actions/services/getLandingPageData.service'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import ReservationCardComponent from '@/components/Global/ReservationCard.component'
import EventsComponent from '@/components/Landing/Events.component'
import HeroTextComponent from '@/components/Landing/HeroText.component'
import BackgroundVideoLP from '@/components/Landing/LpBackgroundVideo.component'
import WhoAreWeSection from '@/components/Landing/WhoAreWeSection.components'

// Landing Page
export default async function Home() {
	const dataLanding = await getLandingData()

	return (
		dataLanding && (
			// Page container
			<div className='relative h-auto w-full items-center justify-center'>
				{/* Navbar import for desktop */}
				<Navbar />
				{/* Navbar import for mobile */}
				<MobileNavbar />

				{/* Main content section */}
				<main className='absolute left-0 top-0 flex h-full w-full flex-col items-center gap-96 pt-20 sm:items-start'>
					{/* Hero section and cards */}
					<div className='flex w-full flex-col items-center gap-96'>
						{/* Hero section */}
						<div className='flex h-screen w-screen flex-col items-start justify-center gap-16'>
							{/* Background video component */}
							<BackgroundVideoLP />

							{/* Text and CTA button */}
							<HeroTextComponent data={dataLanding} />
						</div>

						{/* Events section and Cards */}
						<EventsComponent data={dataLanding} />

						{/* Who are we section */}
						<WhoAreWeSection data={dataLanding} />
					</div>

					{/* Reservation CTA card */}
					<ReservationCardComponent />

					{/* Footer component */}
					<FooterComponent />
				</main>
			</div>
		)
	)
}
