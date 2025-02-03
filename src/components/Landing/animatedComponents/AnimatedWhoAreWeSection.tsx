'use client'

// Importing necessary components and utilities
import { LandingPageData } from '@/app/actions/services/getLandingPageData.service' // Importing the type for landing page data
import { textToSpanColored } from '@/utils/textToSpanColored'; // Importing a function to color text
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Importing the chevron icon from FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing the FontAwesomeIcon component
import { motion } from 'framer-motion'; // Importing motion for animations
import Image from 'next/image'; // Importing the Image component from Next.js
import Link from 'next/link'; // Importing the Link component from Next.js

// AnimatedWAWSection component that takes data as a prop
export const AnimatedWAWSection = ({ data }: { data: LandingPageData }) => {
	return (
		// Main wrapper div
		<div className='flex w-3/4 flex-col'>
			{/* Fade-in animation for the first image */}
			<motion.div
				initial={{ opacity: 0 }} // Initial state: invisible
				animate={{ opacity: 1 }} // Final state: fully visible
				transition={{ duration: 0.5 }} // Transition duration of 0.5 seconds
			>
				<Image
					src='/assets/images/elements/fairy.png' // Image source
					alt='Vinbieres' // Alt text for the image
					width={100} // Image width
					height={100} // Image height
					className='h-auto max-w-full max-sm:w-1/2' // Image styling
				/>
			</motion.div>

			{/* Container for the animated elements */}
			<div className='flex w-3/4 flex-col items-center justify-center gap-8 rounded lg:flex-row'>
				{/* Animated image on the left */}
				<motion.div
					className='flex w-full items-center justify-center lg:w-1/3' // Styling for positioning
					initial={{ opacity: 0, x: -100 }} // Start off-screen with no opacity
					animate={{ opacity: 1, x: 0 }} // Animate to visible and centered position
					transition={{ duration: 0.6 }} // Transition duration of 0.6 seconds
				>
					<Image
						src={data?.event_card1_image} // Image source from data prop
						alt='Vinbieres' // Alt text for the image
						width={300} // Image width
						height={300} // Image height
						className='h-auto max-w-full max-sm:w-1/2' // Image styling
					/>
				</motion.div>

				{/* Animated text block */}
				<motion.div
					className='flex w-full flex-col items-center justify-center gap-6 p-4 font-obraletra text-base text-customBrown-100 max-lg:text-xs lg:w-2/3 lg:items-start' // Styling for text block
					initial={{ opacity: 0, y: 50 }} // Start with no opacity and shifted vertically
					animate={{ opacity: 1, y: 0 }} // Animate to full opacity and original position
					transition={{ delay: 0.2, duration: 0.6 }} // Delayed animation with 0.6s duration
				>
					{/* Title with animated effect */}
					<h2
						className='w-full text-center text-xl max-lg:text-base lg:text-left' // Styling for title text
						dangerouslySetInnerHTML={{
							__html: textToSpanColored(data.description_title), // Using the function to color the title text
						}}
					></h2>

					{/* Description with animated effect */}
					<div
						className='w-full text-center text-base max-lg:text-xs lg:text-left' // Styling for description text
						dangerouslySetInnerHTML={{
							__html: textToSpanColored(data.description_text), // Applying color to description text
						}}
					></div>

					{/* Animated button */}
					<motion.div
						className='text-center lg:text-left' // Button alignment
						initial={{ opacity: 0 }} // Start with invisible button
						animate={{ opacity: 1 }} // Fade in button
						transition={{ delay: 0.4, duration: 0.5 }} // Delayed animation with 0.5s duration
					>
						{/* Link to the URL from the data */}
						<Link
							href={data.description_button_url} // URL for the button link
							className='flex items-center justify-center gap-3 text-base underline max-lg:text-xs lg:justify-start' // Styling for button
						>
							<span>{data.description_button_label}</span> {/* Button label */}
							<FontAwesomeIcon
								icon={faChevronRight} // Chevron icon for button
								className='h-4 w-4 text-customBrown-100' // Icon styling
							/>
						</Link>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};
