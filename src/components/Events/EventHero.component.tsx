import { EventPageData } from '@/app/actions/services/getEventPageData'


// Define the EventHeroComponent function component which takes in 'data' as a prop
export default function EventHeroComponent({
	data, // Destructure the 'data' prop which should follow the EventPageData interface
}: Readonly<{
	data: EventPageData // Define the type of 'data' prop as EventPageData
}>) {
	return (
		<div className='flex w-full flex-col items-center justify-center p-6'>
			{/* Container for the hero section */}
			<h1 className='mb-4 font-cardinal  text-8xl text-customBrown-100 first-letter:text-customRed-100 max-sm:text-5xl'>{data.page_title}</h1>
			{/* Display the event page title */}
			<p className='font-obraletra text-customBrown-100 w-3/5 text-center'>
				{/* Paragraph for event description */}
				<span
					dangerouslySetInnerHTML={{
						// Render the event description as HTML
						__html: data.event_description, // Set the inner HTML content to the event description
					}}
				/>
			</p>

		</div>
	)
}
