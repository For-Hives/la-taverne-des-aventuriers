import { EventListData } from '@/app/actions/services/getEventListData' // Import the interface for event list data
import { generateSlug } from '@/utils/slugUtils' // Import the Link component from Next.js for navigation
import Image from 'next/image' // Import the Image component from Next.js for optimized image rendering*
import Link from 'next/link'

// Define the EventListComponent function component which takes in 'data' as a prop
export default function EventListComponent({
	data, // Destructure the 'data' prop which is an array of EventListData
}: Readonly<{
	data: EventListData[] // Define the type of 'data' prop as an array of EventListData
}>) {
	return (
		<div className='w-1/2 p-6 max-lg:w-2/3 max-md:w-full'>
			{/* Container for the event list */}
			<ul className='space-y-4 max-sm:space-y-36'>
				{/* List container with space between each list item */}
				{data.map(
					(
						event // Iterate over the 'data' array to display each event
					) => (
						<li
							key={event.id}
							className='flex gap-6 rounded-lg p-4 max-sm:flex-col max-sm:gap-9'
						>
							{/* Each event item */}
							{event.event_image && ( // If an event image exists, render it
								<div className='flex w-1/3 items-center justify-center max-sm:w-full'>
									<Image
										src={event.event_image} // Image source (URL)
										alt={event.event_title} // Alt text for the image
										className='h-auto w-full max-sm:w-1/2' // Set the image to be responsive
										width={1920} // Set the image width
										height={1080} // Set the image height
									/>
								</div>
							)}
							<div className='flex w-2/3 flex-col items-start justify-center'>
								<h2 className='font-cardoRegular text-2xl text-customBrown-100 first-letter:text-customRed-100'>
									{event.event_title}
								</h2>
								{/* Display the event title */}
								<p className='font-obraletra text-customGray-100'>
									{/* Format the event date */}
									{new Date(event.event_date).toLocaleDateString('fr-FR')}
								</p>
								<p className='mt-2 font-cardoRegular text-customBrown-100'>
									{/* Paragraph for the event description */}
									<span
										dangerouslySetInnerHTML={{
											// Render the event description as HTML (with a preview)
											__html: event.summary,
										}}
									/>
								</p>
								<Link
									className='mt-4 inline-block font-cardoRegular text-customBlue-100 hover:underline'
									href={`/evenements/${generateSlug(event.event_title)}`} // Now only using the title slug
								>
									Lire La suite
								</Link>
							</div>
						</li>
					)
				)}
			</ul>
		</div>
	)
}
