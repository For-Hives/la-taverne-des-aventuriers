import { getEventData } from '@/app/actions/services/getEventData' // Import the function to fetch event data by slug
import SpecialEventComponent from '@/components/Events/SpecialEvent.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
// import FooterComponent from '@/components/Global/Footer.component' // Import the component to display event details

type PageProps = Readonly<{
	params: {
		slug: string;
	};
}>;

// Define the default export async function for the event page
export default async function Page({ params }: PageProps) {
	const { slug } = params // Extract the 'slug' parameter from the route params
	const eventdata = await getEventData(slug) // Fetch event data using the slug

	// If no event data is found, display a message
	if (!eventdata) {
		return <div>No event found for this link.</div> // Message if event data is null or undefined
	}

	// Return the page layout with event data passed to the SpecialEventComponent
	return (
		<div className='flex flex-col gap-64'>
			{/* Navbar for desktop */}
			<Navbar />
			{/* Navbar for mobile */}
			<MobileNavbar />

			<div className='relative mt-36 flex flex-col items-center gap-24'>
				<SpecialEventComponent data={eventdata} />
			</div>

			{/*<div>*/}
			{/*	/!* Footer *!/*/}
			{/*	<FooterComponent />*/}
			{/*</div>*/}
		</div>
	)
}
