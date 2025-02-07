import { EventListData } from "@/app/actions/services/getEventListData"; // Import the interface for event list data
import Image from 'next/image'; // Import the Image component from Next.js for optimized image rendering
import Link from 'next/link';
import {generateSlug} from "@/utils/slugUtils"; // Import the Link component from Next.js for navigation

// Define the EventListComponent function component which takes in 'data' as a prop
export default function ImportantEventComponent({
                                                    data, // Destructure the 'data' prop which is an array of EventListData
                                                }: Readonly<{
    data: EventListData[]; // Define the type of 'data' prop as an array of EventListData
}>) {
    // Filter the data to only include events where `Important_One` is true
    const importantEvents = data.filter((event) => event.Important_One);

    return (
        <div className='w-1/2 p-6'> {/* Container for the event list */}
            <ul className='space-y-4'> {/* List container with space between each list item */}
                {importantEvents.map((event) => ( // Iterate over the filtered 'importantEvents' array
                    <li key={event.id} className='rounded-lg p-4 border border-customBrown-100 flex gap-6'> {/* Each event item */}
                        {event.event_image && ( // If an event image exists, render it
                            <div className='w-1/3 items-center justify-center flex'>
                                <Image
                                    src={event.event_image} // Image source (URL)
                                    alt={event.event_title} // Alt text for the image
                                    className='h-auto w-full' // Set the image to be responsive
                                    width={1920} // Set the image width
                                    height={1080} // Set the image height
                                />
                            </div>
                        )}
                        <div className='flex flex-col justify-center items-start w-2/3'>
                            <h2 className='text-2xl font-cardoRegular text-customBrown-100 first-letter:text-customRed-100'>{event.event_title}</h2> {/* Display the event title */}
                            <p className='text-customGray-100 font-obraletra'>
                                {/* Format the event date */}
                                {new Date(event.event_date).toLocaleDateString('fr-FR')}
                            </p>

                            <p className='mt-2 font-cardoRegular text-customBrown-100'> {/* Paragraph for the event description */}
                                <span
                                    dangerouslySetInnerHTML={{ // Render the event description as HTML (with a preview)
                                        __html: (event.summary)
                                    }}
                                />
                            </p>

                            <Link
                                className='mt-4 inline-block text-customBlue-100 font-cardoRegular hover:underline' // Button-like Link
                                href={`/events/${event.id}-${generateSlug(event.event_title)}`} // Combine ID and slug
                                // Link to the event's detailed page
                            >
                                En savoir plus {/* Button text */}
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
