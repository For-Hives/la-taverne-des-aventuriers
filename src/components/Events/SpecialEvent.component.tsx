import Image from "next/image";  // Import the Image component from Next.js for optimized image rendering
import { EventData } from "@/app/actions/services/getEventData";
import Link from "next/link";  // Import the EventData interface

// Define the SpecialEventComponent function component, which takes 'data' as a prop
export default function SpecialEventComponent({
                                                  data,  // Destructure the 'data' prop, which is of type EventData
                                              }: Readonly<{ data: EventData }>) {  // Use Readonly for the data prop to ensure immutability
    if (!data) {  // Check if no event data is passed
        return <div>Aucun événement trouvé. Veuillez vérifier le lien ou essayer plus tard.</div>;  // Return a message if no event data is found
    }

    return (
		<div className='p-6 flex flex-col justify-center items-start gap-24'>
			<div className='flex items-center justify-center w-full'>
				<div className='flex items-center justify-center flex-col w-1/2'>
					{/* Conditionally render the event image if it exists */}
					{data.event_image && (
						<Image
							src={data.event_image} // Image source (URL)
							alt={data.event_title} // Alt text for the image (event title)
							width={300} // Set the image width
							height={300} // Set the image height
							className='h-auto max-w-full' // Responsive image styling
						/>
					)}
				</div>
				<div className='flex items-start justify-center flex-col w-1/2 gap-9'>
					<div className='flex items-start justify-center flex-col w-full'>
						<h1 className='mb-4 text-4xl'>{data.event_title}</h1>{' '}
						{/* Display the event title */}
						<h2>{data.event_date}</h2> {/* Display the event date */}
					</div>

					<p>
						<span
							dangerouslySetInnerHTML={{
								// Render the event description as HTML (with a preview)
								__html: data.event_description
							}}
						/>
					</p>

					<Link
						className='mt-4 inline-block rounded bg-customBrown-100 border-3 border-customBrown-100 hover:bg-customWhite-100 hover:text-customBrown-100 px-4 py-2 text-white font-cardoRegular ' // Button-like Link
						href={data.button_url} // Link to the event's detailed page
					>
						{data.button_label} {/* Button text */}
					</Link>
				</div>


			</div>


			<Link
				className='mt-4 inline-block rounded bg-customBrown-100 border-3 border-customBrown-100 hover:bg-customWhite-100 hover:text-customBrown-100 px-4 py-2 text-white font-cardoRegular ' // Button-like Link
				href='/events' // Link to the event's detailed page
			>
				Revenir aux évènements {/* Button text */}
			</Link>
		</div>
	)
}
