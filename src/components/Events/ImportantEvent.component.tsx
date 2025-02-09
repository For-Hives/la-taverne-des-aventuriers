import { EventData } from '@/app/actions/services/getEventData'
import Image from 'next/image' // Import the Image component from Next.js for optimized image rendering
import Link from 'next/link'

// Define the EventListComponent function component which takes in 'data' as a prop
export default function ImportantEventComponent({
	data, // Destructure the 'data' prop which is an array of EventListData
}: Readonly<{
	data: EventData[] // Define the type of 'data' prop as an array of EventListData
}>) {
	// Filter the data to only include events where `Important_One` is true
	const importantEvents = data.filter(event => event.Important_One)

	return (
		<div className='w-full p-6 md:w-2/3 lg:w-1/2'>
			{' '}
			{/* Container for the event list */}
			<ul className='space-y-4'>
				{' '}
				{/* List container with space between each list item */}
				{importantEvents.map(
					(
						event // Iterate over the filtered 'importantEvents' array
					) => (
						<li
							key={event.id}
							className='flex items-start justify-center gap-6 rounded-lg border border-customBrown-100 p-4 max-sm:flex-col'
						>
							{' '}
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
							<div className='flex w-2/3 flex-col items-start justify-center max-sm:w-full'>
								<h2 className='font-cardoRegular text-2xl text-customBrown-100 first-letter:text-customRed-100'>
									{event.event_title}
								</h2>{' '}
								{/* Display the event title */}
								<p className='font-obraletra text-customGray-100'>
									{/* Format the event date */}
									{new Date(event.event_date).toLocaleDateString('fr-FR')}
								</p>
								<p className='mt-2 font-cardoRegular text-customBrown-100'>
									{' '}
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
									href={`/evenements/${event.event_slug}`} // Now only using the title slug
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
