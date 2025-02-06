'use client'
import { motion } from 'framer-motion'; // Import the motion component from the Framer Motion library
import Image from 'next/image'; // Import the Image component from Next.js for optimized image rendering

// Define the Drink interface to ensure strong typing for the drink object
interface Drink {
	title: string; // Title of the drink
	description: string; // Description of the drink
	image: string; // URL or path to the image of the drink
}

// Define the DrinkDivComponent functional component
export default function DrinkDivComponent({
											  drink, // The drink object containing title, description, and image
											  isInverted = false, // Optional boolean prop to reverse the layout direction (default is false)
										  }: {
	readonly drink: Drink; // The drink object is a required prop
	readonly isInverted?: boolean; // Optional prop to specify if layout should be inverted
}) {
	// Check if the drink has a valid image
	const hasImage = drink.image && drink.image !== '';

	return (
		<motion.div
			className='w-full px-4 sm:px-8' // Styling for the outermost container
			initial={{ opacity: 0, y: 50 }} // Animation starting state (hidden and slightly below)
			whileInView={{ opacity: 1, y: 0 }} // Animation end state (fully visible and positioned normally)
			viewport={{ amount: 0.3, once: true }} // Trigger animation once when 30% of the component is in view
			transition={{ duration: 0.6, ease: 'easeOut' }} // Smooth transition for the animation
		>
			{/* Container with grid layout */}
			<div className={`justify-center items-center grid w-full grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4`}>
				{/* Image Section */}
				{hasImage && (
					<div
						className={`w-full col-span-1 flex justify-center items-center sm:col-span-1 sm:px-4 ${
							isInverted ? 'sm:order-2' : 'sm:order-1' // Change order based on the isInverted prop
						}`}
					>
						<Image
							src={drink.image} // Source path for the image
							alt={drink.title} // Alt text for accessibility
							className='rounded w-1/2' // Styling for the image
							width={400} // Set the width of the image
							height={400} // Set the height of the image
						/>
					</div>
				)}

				{/* Text Section */}
				<div
					className={`${
						hasImage ? 'sm:col-span-2' : 'sm:col-span-3' // Adjust grid span based on image presence
					} flex flex-col gap-9 sm:px-4 ${
						isInverted ? 'sm:order-1' : 'sm:order-2' // Change order based on the isInverted prop
					}`}
				>
					{/* Drink title */}
					<h2 className='font-cardinal text-3xl text-customBrown-100 first-letter:text-customRed-100 sm:text-4xl'>
						{drink.title} {/* Display the title of the drink */}
					</h2>
					{/* Drink description */}
					<p className='font-cardoRegular text-base text-customBrown-100 sm:text-lg'>
						{drink.description} {/* Display the description of the drink */}
					</p>
				</div>
			</div>
		</motion.div>
	);
}
