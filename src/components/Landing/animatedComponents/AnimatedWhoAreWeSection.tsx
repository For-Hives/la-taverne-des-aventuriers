'use client'

import { faChevronRight } from '@fortawesome/free-solid-svg-icons' // Importing the chevron icon from FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // Importing the FontAwesomeIcon component
import { motion } from 'framer-motion' // Importing motion for animations
import Image from 'next/image' // Importing the Image component from Next.js
import Link from 'next/link' // Importing the Link component from Next.js

// Importing necessary components and utilities
import { LandingPageData } from '@/app/actions/services/getLandingPageData.service' // Importing the type for landing page data
import { textToSpanColored } from '@/utils/textToSpanColored' // Importing a function to color text

// AnimatedWAWSection component that takes data as a prop
export const AnimatedWAWSection = ({ data }: { data: LandingPageData }) => {
	return (
		// Main wrapper div
		<div className='relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-8 max-lg:w-full max-lg:px-4 md:grid-cols-5 md:p-0'>
			{/* Image with animation */}
			<motion.div
				className='col-span-2 flex items-center justify-center' // On md and above, image appears last
				initial={{ opacity: 0, x: -100 }} // Animation: starts from the left
				animate={{ opacity: 1, x: 0 }} // Animation: moves to the center
				transition={{ duration: 0.6 }} // Duration of 0.6 seconds
			>
				<Image
					src={data?.description_image} // Image source
					alt='Vinbieres' // Alt text
					width={350} // Width
					height={350} // Height
					className='hidden h-auto max-w-full xl:block' // Additional styles
				/>
				<Image
					src={data?.description_image} // Image source
					alt='Vinbieres' // Alt text
					width={250} // Width
					height={250} // Height
					className='hidden h-auto max-w-full lg:block xl:hidden' // Additional styles
				/>
				<Image
					src={data?.description_image} // Image source
					alt='Vinbieres' // Alt text
					width={200} // Width
					height={200} // Height
					className='block h-auto max-w-full lg:hidden' // Additional styles
				/>
			</motion.div>

			{/* Text content with animation */}
			<motion.div
				className='font-obraletra text-custom-brown-100 col-span-1 flex flex-col justify-center gap-6 p-4 text-base md:col-span-3 lg:items-start' // The text takes 2 cells on md and above
				initial={{ opacity: 0, y: 50 }} // Animation: starts from the bottom
				animate={{ opacity: 1, y: 0 }} // Animation: moves up to the original position
				transition={{ delay: 0.2, duration: 0.6 }} // Delay and duration of 0.6 seconds
			>
				{/* Title */}
				<h2
					className='text-2xl lg:text-left' // Title aligned to the left on large screens
					dangerouslySetInnerHTML={{
						__html: textToSpanColored(data.description_title), // Function to colorize the title
					}}
				></h2>

				{/* Description */}
				<div
					className='font-cardo-regular text-base lg:text-left' // Description aligned to the left on large screens
					dangerouslySetInnerHTML={{
						__html: textToSpanColored(data.description_text), // Function to colorize the description
					}}
				></div>

				{/* Button */}
				<motion.div
					className='text-center lg:text-left' // Button aligned to the left on large screens
					initial={{ opacity: 0 }} // Starts invisible
					animate={{ opacity: 1 }} // Fades in
					transition={{ delay: 0.4, duration: 0.5 }} // Delay and duration of 0.5 seconds
				>
					<Link
						href={data.description_button_url} // Button link
						aria-label={data.description_button_aria}
						className='flex items-center justify-center gap-3 text-base underline lg:justify-start' // Button styles
					>
						<span>{data.description_button_label}</span> {/* Button label */}
						<FontAwesomeIcon
							icon={faChevronRight} // Chevron icon
							className='text-custom-brown-100 h-3 w-3' // Icon styles
						/>
					</Link>
				</motion.div>
			</motion.div>
			{/* Decorative Element */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8, duration: 0.6 }}
				className='absolute -bottom-48 left-0 mt-4 hidden w-full justify-start md:flex'
			>
				<Image
					src='/assets/images/elements/fairy.webp'
					alt='Decorative fairy'
					width={100}
					height={100}
					className='h-auto max-w-full max-sm:w-1/3'
				/>
			</motion.div>
		</div>
	)
}
