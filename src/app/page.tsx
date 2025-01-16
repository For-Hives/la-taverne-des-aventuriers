// Client side (for 'UseState, UseRef,...' effects if needed
'use client'

// imports
import FooterComponent from '@/components/Global/Footer.component'
import ReservationCardComponent from '@/components/Global/ReservationCard.component'
import EventsComponent from '@/components/Landing/Events.component'
import HeroTextComponent from '@/components/Landing/HeroText.component'
import BackgroundVideoLP from '@/components/Landing/LpBackgroundVideo.component'
import WhoAreWeSection from '@/components/Landing/WhoAreWeSection.components'

import Navbar from '../components/Global/Navbar.component.js'

// Landing Page
export default function Home() {
	return (
		// Page
		<div className='relative h-auto w-screen items-center justify-center'>
			{/*Navbar import*/}
			<Navbar />

			{/*Main part*/}
			<main className='absolute left-0 top-0 flex h-full w-full flex-col items-center gap-8 pt-20 sm:items-start'>
				{/*Hero + cards*/}
				<div className='flex w-full flex-col items-center gap-96'>
					{/*Hero section*/}
					<div className='flex h-screen w-screen flex-col items-start justify-center gap-16'>
						{/*Background Video (Imported from components)*/}
						<BackgroundVideoLP />

						{/*Text And CTA button div*/}
						<HeroTextComponent />
					</div>

					{/*EventsComponent and Cards Div*/}
					<EventsComponent />

					{/*Who are We Section*/}
					<WhoAreWeSection />
				</div>

				{/*Reservation CTA Card (Imported from Components)*/}
				<ReservationCardComponent />

				{/*FooterComponent (Imported from Components)*/}
				<FooterComponent />
			</main>
		</div>
	)
}
