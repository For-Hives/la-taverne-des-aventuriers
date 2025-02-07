import { getEventListData } from '@/app/actions/services/getEventListData' // Importing the function to fetch event list data
import { getEventPageData } from '@/app/actions/services/getEventPageData' // Importing the function to fetch event page metadata
import EventHeroComponent from '@/components/Events/EventHero.component' // Importing the component that displays the event hero section
import EventListComponent from '@/components/Events/EventList.component' // Importing the component that displays the list of events
import FooterComponent from '@/components/Global/Footer.component' // Importing the footer component
import Navbar from '@/components/Global/Navbar.component'

export default async function Page() {
	// Fetching data
	const eventPageData = await getEventPageData() // Fetching the metadata for the page
	const eventsData = await getEventListData() // Fetching the list of events

	return (
		eventPageData && ( // Ensure that eventPageData exists before rendering the page
			<div className='relative flex w-full flex-col justify-center'>
				<Navbar /> {/* Rendering the Navbar component */}
				<div className='w-full relative mt-36 flex flex-col items-start gap-24'>
					<EventHeroComponent data={eventPageData} />
					{/* Rendering the event hero section with the fetched data */}
					<EventListComponent data={eventsData} />
					{/* Rendering the list of events with the fetched data */}
				</div>
				<div>
					{/* Footer */}
					<FooterComponent />
				</div>
			</div>
		)
	)
}
