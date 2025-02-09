import { getEventListData } from '@/app/actions/services/getEventListData' // Importing the function to fetch event list data
import { getEventPageData } from '@/app/actions/services/getEventPageData' // Importing the function to fetch event page metadata
import { getNavBarData } from '@/app/actions/services/getNavData.service'
import EventHeroComponent from '@/components/Events/EventHero.component' // Importing the component that displays the event hero section
import EventListComponent from '@/components/Events/EventList.component' // Importing the component that displays the list of events
import ImportantEventComponent from '@/components/Events/ImportantEvent.component'
import FooterComponent from '@/components/Global/Footer.component' // Importing the footer component
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'

export default async function Page() {
	// Fetching data
	const eventPageData = await getEventPageData() // Fetching the metadata for the page
	const eventsData = await getEventListData() // Fetching the list of events
	const navItems = await getNavBarData()

	return (
		eventPageData && ( // Ensure that eventPageData exists before rendering the page
			<div className='relative flex w-full flex-col justify-center'>
				<Navbar navItems={navItems} />
				<MobileNavbar navItems={navItems} />

				<div className='relative mt-36 flex w-full flex-col items-center gap-24'>
					{/* Rendering the event hero section with the fetched data */}
					<EventHeroComponent data={eventPageData} />
					<ImportantEventComponent data={eventsData} />
					{/* Adding a separation */}
					<div className='h-[0.05rem] w-3/4 bg-customBrown-100'></div>{' '}
					{/* This div adds vertical space between components */}
					<div className='flex w-full flex-col items-start'>
						{/* Rendering the list of events with the fetched data */}
						<EventListComponent data={eventsData} />
					</div>
				</div>
				<div>
					{/* Footer */}
					<FooterComponent />
				</div>
			</div>
		)
	)
}
