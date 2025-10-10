import Image from 'next/image' // Import the Image component from Next.js for optimized image rendering
import Link from 'next/link' // Import the EventData interface

import { EventData } from '@/app/actions/services/getEventData'

// Define the SpecialEventComponent function component, which takes 'data' as a prop
export default function SpecialEventComponent({
	data, // Destructure the 'data' prop, which is of type EventData
}: Readonly<{ data: EventData }>) {
	// Use Readonly for the data prop to ensure immutability
	if (!data) {
		// Check if no event data is passed
		return (
			<div>
				Aucun événement trouvé. Veuillez vérifier le lien ou essayer plus tard.
			</div>
		) // Return a message if no event data is found
	}

	return (
		<div className='flex flex-col items-start justify-center gap-24 p-6'>
			<div className='flex w-full items-center justify-center max-md:flex-col'>
				<div className='flex w-1/2 flex-col items-center justify-center max-md:w-full'>
					{/* Conditionally render the event image if it exists */}
					{data.event_image && (
						<Image
							src={data.event_image} // Image source (URL)
							alt={data.event_title} // Alt text for the image (event title)
							width={300} // Set the image width
							height={300} // Set the image height
							className='h-auto w-1/2 max-md:w-3/4' // Responsive image styling
						/>
					)}
				</div>
				<div className='font-cardo-regular text-custom-brown-100 flex w-1/2 flex-col items-start justify-center gap-9 max-md:w-full'>
					<div className='flex w-full flex-col items-start justify-center'>
						<h1 className='first-letter:text-custom-red-100 mb-4 text-4xl'>
							{data.event_title}
						</h1>{' '}
						{/* Display the event title */}
						<h2 className='text-custom-gray-100'>
							{new Date(data.event_date).toLocaleDateString('fr-FR')}
						</h2>{' '}
						{/* Display the event date */}
					</div>

					<p>
						<span
							className='prose prose-customBrown'
							dangerouslySetInnerHTML={{
								// Render the event description as HTML (with a preview)
								__html: data.event_description,
							}}
						/>
					</p>

					<Link
						className='border-custom-brown-100 bg-custom-brown-100 font-cardo-regular hover:bg-custom-white-100 hover:text-custom-brown-100 mt-4 inline-block rounded border-3 px-4 py-2 text-white' // Button-like Link
						href={data.button_url} // Link to the event's detailed page
					>
						{data.button_label} {/* Button text */}
					</Link>
				</div>
			</div>

			<Link
				className='border-custom-brown-100 bg-custom-brown-100 font-cardo-regular hover:bg-custom-white-100 hover:text-custom-brown-100 mt-4 inline-block rounded border-3 px-4 py-2 text-white' // Button-like Link
				href='/evenements' // Link to the event's detailed page
			>
				Revenir aux évènements {/* Button text */}
			</Link>
		</div>
	)
}
