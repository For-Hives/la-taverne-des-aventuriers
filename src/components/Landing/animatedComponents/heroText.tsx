'use client'

// Importing necessary components and utilities
import { LandingPageData } from '@/app/actions/services/getLandingPageData.service' // Importing the type for landing page data
import { textToSpanColored } from '@/utils/textToSpanColored' // Importing a function to color text
import { faChevronRight } from '@fortawesome/free-solid-svg-icons' // Importing the chevron icon from FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // Importing the FontAwesomeIcon component
import { motion } from 'framer-motion' // Importing motion for animations
import Link from 'next/link' // Importing the Link component from Next.js

// HeroTextAnimated component that takes data as a prop
export const HeroTextAnimated = ({ data }: { data: LandingPageData }) => {
	return (
		// Main wrapper div with motion for fade-in effect and vertical movement
		<motion.div
			className='bottom-0 left-0 z-40 flex flex-col items-start gap-6 p-6 sm:p-12 md:p-16 lg:p-52' // Styling for layout and padding
			initial={{ opacity: 0, y: 50 }} // Initial state: invisible and shifted vertically
			animate={{ opacity: 1, y: 0 }} // Final state: fully visible and original position
			transition={{ duration: 0.8 }} // Transition duration of 0.8 seconds
		>
			{/* Hero Title with fade-in animation */}
			<motion.h1
				className='text-with-outline flex w-full flex-col gap-2 font-cardinal text-4xl font-bold text-customBrown-100 first-letter:text-customRed-100 sm:w-2/3 sm:text-5xl md:text-6xl lg:text-8xl' // Styling for title
				initial={{ opacity: 0 }} // Initial state: invisible
				animate={{ opacity: 1 }} // Final state: fully visible
				transition={{ delay: 0.3, duration: 0.8 }} // Delay and duration for the fade-in animation
			>
				{/* Title text with color applied */}
				<span
					dangerouslySetInnerHTML={{
						__html: textToSpanColored(data.hero_title), // Using the function to color the title text
					}}
				/>
			</motion.h1>

			{/* Description with fade-in animation */}
			<motion.div
				className='flex flex-col items-start gap-6 sm:gap-8 md:gap-10' // Styling for the description section
				initial={{ opacity: 0 }} // Initial state: invisible
				animate={{ opacity: 1 }} // Final state: fully visible
				transition={{ delay: 0.5, duration: 0.8 }} // Delay and duration for the fade-in animation
			>
				{/* Description text with color applied */}
				<p className='text-with-outline-light flex items-center gap-2 font-obraletra text-lg font-bold text-customBrown-100 sm:gap-3 sm:text-xl md:text-2xl'>
					<span
						dangerouslySetInnerHTML={{
							__html: textToSpanColored(data.hero_description), // Using the function to color the description text
						}}
					/>
				</p>

				{/* Button section */}
				<div className='flex flex-wrap items-start gap-4 sm:gap-6'>
					{/* Button 1 with hover effect */}
					<Link
						href={data.hero_left_button_url} // URL for the left button
						className='flex h-12 items-center gap-2 rounded border-3 border-customBrown-100 bg-customBrown-100 px-4 font-obraletra text-lg text-customWhite-100 hover:underline sm:text-xl'
					>
						{data.hero_left_button_label} {/* Button label */}
						<FontAwesomeIcon
							icon={faChevronRight} // Chevron icon for the button
							className='h-4 w-4 text-customWhite-100' // Icon styling
						/>
					</Link>

					{/* Button 2 with animated slide-in effect */}
					<motion.div
						initial={{ opacity: 0, x: 50 }} // Initial state: invisible and shifted horizontally
						animate={{ opacity: 1, x: 0 }} // Final state: fully visible and original position
						transition={{ delay: 0.7, duration: 0.8 }} // Delay and duration for the slide-in animation
					>
						<Link
							href={data.hero_right_button_url} // URL for the right button
							className='flex h-12 items-center rounded border-3 border-solid border-customBrown-100 bg-customWhite-100 px-4 font-obraletra text-lg text-customBrown-100 hover:underline sm:text-xl'
						>
							{data.hero_right_button_label} {/* Button label */}
						</Link>
					</motion.div>
				</div>
			</motion.div>
		</motion.div>
	)
}
