import { getEventData } from '@/app/actions/services/getEventData';
import SpecialEventComponent from '@/components/Events/SpecialEvent.component';
import Navbar from '@/components/Global/Navbar.component';
import MobileNavbar from '@/components/Global/NavbarMobile.component';
import { generateSlug } from '@/utils/slugUtils';

type PageProps = Readonly<{
	params: {
		slug: string; // Slug format: "id-title-formatted"
	};
}>;

export default async function Page({ params }: PageProps) {
	const { slug } = params;

	// Split the slug to extract the ID and the title part
	const [id, ...titleParts] = slug.split('-'); // "id-title" => id = "s443kz6ee7e6laf", titleParts = ["mon", "evenement", "special"]
	const titleFromSlug = titleParts.join('-'); // Recombine the title parts

	// Fetch the event data by ID
	const eventdata = await getEventData(id);

	// If no event is found or the title doesn't match, show an error
	if (!eventdata || generateSlug(eventdata.event_title) !== titleFromSlug) {
		return <div>No event found for this link.</div>;
	}

	// Render the event page
	return (
		<div className="flex flex-col gap-64">
			<Navbar />
			<MobileNavbar />
			<div className="relative mt-36 flex flex-col items-center gap-24">
				<SpecialEventComponent data={eventdata} />
			</div>
		</div>
	);
}
