import FooterComponent from '@/components/Global/Footer.component'
// imports
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import ReservationCardComponent from '@/components/Global/ReservationCard.component'
import EventsComponent from '@/components/Landing/Events.component'
import HeroTextComponent from '@/components/Landing/HeroText.component'
import BackgroundVideoLP from '@/components/Landing/LpBackgroundVideo.component'
import WhoAreWeSection from '@/components/Landing/WhoAreWeSection.components'

// Landing Page
export default function Home() {
	return (
		// Page
		<div className='relative h-auto w-full items-center justify-center'>
			{/*Navbar import*/}
			<Navbar />
			<MobileNavbar />

			{/*Main part*/}
			<main className='absolute left-0 top-0 flex h-full w-full flex-col items-center gap-96 pt-20 sm:items-start'>
				{/*Hero + cards*/}
				<div className='flex w-full flex-col items-center gap-96 max-sm:gap-64'>
					{/*Hero section*/}
					<div className='flex h-screen w-screen flex-col items-center justify-center gap-16'>
						{/*Background Video (Imported from components)*/}
						<BackgroundVideoLP />

						{/*Text And CTA button div*/}
						<HeroTextComponent />
					</div>

					{/*EventsComponent and Cards Div*/}
					<EventsComponent />

					{/*Who are We Section*/}
					<WhoAreWeSection />

					{/*Reservation CTA Card (Imported from Components)*/}
					<ReservationCardComponent />
				</div>

				{/*FooterComponent (Imported from Components)*/}
				<FooterComponent />
			</main>
		</div>
	)
}
