// Import necessary functions and components for the page
import { getEventData } from '@/app/actions/services/getEventData';  // Modified function to take a slug for event lookup
import SpecialEventComponent from '@/components/Events/SpecialEvent.component';  // Component for rendering the event details
import Navbar from '@/components/Global/Navbar.component';  // Global Navbar component
import MobileNavbar from '@/components/Global/NavbarMobile.component';  // Mobile Navbar component

// Define the structure for the Page props
type PageProps = Readonly<{
	params: {
		slug: string;  // Slug is now used to look up the event by its title
	};
}>;

// Main component for rendering the event page based on the slug
export default async function Page({ params }: PageProps) {
	const { slug } = params;  // Extract slug from params

	// Fetch the event data using the slug
	const eventdata = await getEventData(slug);  // Fetch data for the event that matches the slug

	// If no event is found, display an error message
	if (!eventdata) {
		return <div>No event found for this title.</div>;  // Show an error message if event is not found
	}

	// If the event is found, render the event page
	return (
		<div className="flex flex-col gap-64">
			{/* Render Navbar components */}
			<Navbar />
			<MobileNavbar />

			{/* Main content area for the event */}
			<div className="relative mt-36 flex flex-col items-center gap-24">
				<SpecialEventComponent data={eventdata} />  {/* Render the event details */}
			</div>
		</div>
	);
}
