'use client'
import { motion } from 'framer-motion' // Import the motion component from the Framer Motion library
import Image from 'next/image' // Import the Image component from Next.js for optimized image rendering

// Define the Drink interface to ensure strong typing for the drink object
interface Drink {
	title: string // Title of the drink
	description: string // Description of the drink
	image: string // URL or path to the image of the drink
	price?: number // Price of the drink (optional)
}

// Define the DrinkDivComponent functional component
export default function DrinkDivComponent({
	drink, // The drink object containing title, description, and image
	isInverted = false, // Optional boolean prop to reverse the layout direction (default is false)
	priceDisplay = 'global', // Whether to display individual prices
}: {
	readonly drink: Drink // The drink object is a required prop
	readonly isInverted?: boolean // Optional prop to specify if layout should be inverted
	readonly priceDisplay?: 'global' | 'individual' // Price display mode
}) {
	// Check if the drink has a valid image
	const hasImage = drink.image && drink.image !== ''

	return (
		<motion.div
			className='w-full px-4 lg:px-8' // Styling for the outermost container
			initial={{ opacity: 0, y: 50 }} // Animation starting state (hidden and slightly below)
			whileInView={{ opacity: 1, y: 0 }} // Animation end state (fully visible and positioned normally)
			viewport={{ amount: 0.3, once: true }} // Trigger animation once when 30% of the component is in view
			transition={{ duration: 0.6, ease: 'easeOut' }} // Smooth transition for the animation
		>
			{/* Container with grid layout */}
			<div
				className={`grid w-full grid-cols-1 items-center justify-center gap-4 lg:grid-cols-3 lg:gap-4`}
			>
				{/* Image Section */}
				{hasImage && (
					<div
						className={`col-span-1 flex w-full items-center justify-center lg:col-span-1 lg:px-4 ${
							isInverted ? 'lg:order-2' : 'lg:order-1' // Change order based on the isInverted prop
						}`}
					>
						<Image
							src={drink.image} // Source path for the image
							alt={drink.title} // Alt text for accessibility
							className='w-1/2 rounded lg:w-2/3 2xl:w-1/2' // Styling for the image
							width={400} // Set the width of the image
							height={400} // Set the height of the image
						/>
					</div>
				)}

				{/* Text Section */}
				<div
					className={`${
						hasImage ? 'lg:col-span-2' : 'lg:col-span-3' // Adjust grid span based on image presence
					} flex flex-col gap-9 lg:px-4 ${
						isInverted ? 'lg:order-1' : 'lg:order-2' // Change order based on the isInverted prop
					}`}
				>
					<div className='relative flex flex-col gap-4'>
						{/* Drink title */}
						<h2 className='font-cardinal text-3xl text-customBrown-100 first-letter:text-customRed-100 lg:text-4xl'>
							{drink.title} {/* Display the title of the drink */}
						</h2>

						{/* Individual price display for planches */}
						{priceDisplay === 'individual' &&
							drink.price &&
							drink.price > 0 && (
								<div className='absolute right-0 top-0'>
									<div className='flex items-center justify-center gap-1 self-start rounded-full border-2 border-customBrown-100 bg-yellow-100/20 px-4 py-1.5 shadow-md'>
										<span className='font-cardoRegular text-lg font-medium text-customBrown-100'>
											{drink.price}€
										</span>
										<Image
											src='/assets/images/elements/piece.webp'
											alt="Pièce d'or"
											width={20}
											height={20}
											className='h-5 w-5'
										/>
									</div>
								</div>
							)}
					</div>

					{/* Drink description */}
					<p className='font-cardoRegular text-base text-customBrown-100 lg:text-lg'>
						{drink.description} {/* Display the description of the drink */}
					</p>
				</div>
			</div>
		</motion.div>
	)
}
