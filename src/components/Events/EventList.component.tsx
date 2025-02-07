import { EventListData } from "@/app/actions/services/getEventListData";  // Import the interface for event list data
import Image from 'next/image';  // Import the Image component from Next.js for optimized image rendering
import Link from 'next/link';  // Import the Link component from Next.js for navigation

// Define the EventListComponent function component which takes in 'data' as a prop
export default function EventListComponent({
											   data,  // Destructure the 'data' prop which is an array of EventListData
										   }: Readonly<{
	data: EventListData[];  // Define the type of 'data' prop as an array of EventListData
}>) {
	return (
		<div className='w-1/2 p-6'>  {/* Container for the event list */}
			<ul className='space-y-4'>  {/* List container with space between each list item */}
				{data.map((event) => (  // Iterate over the 'data' array to display each event
					<li key={event.id} className='rounded-lg border p-4 shadow flex'>  {/* Each event item */}
						{event.event_image && (  // If an event image exists, render it
							<Image
								src={event.event_image}  // Image source (URL)
								alt={event.event_title}  // Alt text for the image
								className='h-auto w-2/6'  // Set the image to be responsive
								width={1920}  // Set the image width
								height={1080}  // Set the image height
							/>
						)}
						<div className='flex flex-col justify-center items-start'>
							<h2 className='text-2xl font-obraletra'>{event.event_title}</h2>  {/* Display the event title */}
							<p className='text-gray-600 font-obraletra'>
								{/* Format the event date */}
								{new Date(event.event_date).toLocaleDateString('fr-FR')}
							</p>

							<p className='mt-2 font-cardoRegular'>  {/* Paragraph for the event description */}
								<span
									dangerouslySetInnerHTML={{  // Render the event description as HTML (with a preview)
										__html: (event.summary)
									}}
								/>
							</p>

							<Link
								className='mt-4 inline-block rounded bg-customBrown-100 border-3 border-customBrown-100 hover:bg-customWhite-100 px-4 py-2 text-customWhite-100 hover:text-customBrown-100 font-cardoRegular'  // Button-like Link
								href={`/events/${event.id}`}  // Link to the event's detailed page
							>
								Lire La suite {/* Button text */}
							</Link>
						</div>


					</li>
				))}
			</ul>
		</div>
	);
}
