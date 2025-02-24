import { EventData } from '@/app/actions/services/getEventData'
import { LandingPageData } from '@/app/actions/services/getLandingPageData.service'
import { NavItem } from '@/app/actions/services/getNavData.service'
import FooterComponent from '@/components/Global/Footer.component'
import LoadingLogo from '@/components/Global/LogoLoader'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import ReservationCardComponent from '@/components/Global/ReservationCard.component'
import EventsComponent from '@/components/Landing/Events.component'
import HeroTextComponent from '@/components/Landing/HeroText.component'
import BackgroundVideoLP from '@/components/Landing/LpBackgroundVideo.component'
import WhoAreWeSection from '@/components/Landing/WhoAreWeSection.components'

export default function LandingWrapper({
	data,
	dataEvents,
	navItems,
}: Readonly<{
	data: LandingPageData
	dataEvents: EventData[]
	navItems: NavItem[]
}>) {
	return (
		data && (
			<>
				<LoadingLogo />
				{/* Navigation */}
				<Navbar navItems={navItems} />
				<MobileNavbar navItems={navItems} />

				{/*block to avoid displaying something in this part*/}
				<div className={'-z-10 h-screen w-screen'}></div>

				<div className='mask absolute left-0 top-0 z-10 min-h-screen w-screen'>
					<div className='mask absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center'>
						<BackgroundVideoLP />
					</div>
					{/* Hero Section */}
					<div className='z-10 flex h-screen w-screen flex-col items-start justify-center gap-16'>
						<HeroTextComponent data={data} />
					</div>
				</div>

				{/* Main Content */}
				<div className='relative pt-32'>
					<div className='flex w-full flex-col items-center gap-32'>
						<EventsComponent data={data} dataEvents={dataEvents} />
						<WhoAreWeSection data={data} />
						<div
							className={'flex w-full flex-col items-center gap-16 md:mt-24'}
						>
							<ReservationCardComponent />
						</div>
						<FooterComponent />
					</div>
				</div>
			</>
		)
	)
}
