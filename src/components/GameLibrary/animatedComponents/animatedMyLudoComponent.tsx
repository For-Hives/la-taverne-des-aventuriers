'use client' // Declares this as a client-side component

import { GamesPageData } from '@/app/actions/services/getGamePageData.service' // Importing the type for game page data
import { textToSpanColored } from '@/utils/textToSpanColored' // Importing the textToSpanColored function
import { motion } from 'framer-motion' // Importing motion from Framer Motion for animations
import Image from 'next/image' // Importing Next.js Image component for optimized image rendering
import Link from 'next/link' // Importing Next.js Link component for client-side navigation

// Component declaration, accepting a prop 'data' of type 'GamesPageData'
export const AnimatedMyLudoComponent = ({ data }: { data: GamesPageData }) => {
	return (
		<div className='w-full py-8 max-lg:px-4 lg:w-3/4'>
			{/* Main container for title and content */}
			<div className='flex w-full flex-col items-start justify-center gap-8 sm:gap-12'>
				{/* Title of the component */}
				<motion.h2
					className='font-cardinal text-4xl text-customBrown-100 first-letter:text-customRed-100 max-sm:text-xl'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<span
						dangerouslySetInnerHTML={{
							__html: textToSpanColored(data.myludo_component_title),
						}}
					/>
				</motion.h2>

				{/* Motion container for the image and link */}
				<motion.div
					className='relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg'
					initial={{ opacity: 0, y: 100 }} // Initial animation: invisible and offset downwards
					whileInView={{ opacity: 1, y: 0 }} // Animation when in view: fade in and move to normal position
					transition={{ duration: 0.8 }} // Transition duration of the animation
					viewport={{ once: true }} // Ensures animation triggers only once per page load
				>
					{/* Wrapping the image and text with a clickable link */}
					<Link
						target='_blank' // Opens the link in a new tab
						className='relative block w-full'
						href={data.myludo_component_url} // URL fetched from the data prop
						aria-label={data.myludo_component_aria} // Accessible label for the link
					>
						{/* Aspect-ratio container for maintaining image proportions */}
						<div
							className='relative w-full overflow-hidden rounded-lg'
							style={{ aspectRatio: '16/9' }} // Maintains a 16:9 aspect ratio
						>
							{/* Inner container for the zoom effect on hover */}
							<div className='relative h-full w-full transform transition-transform duration-300 hover:scale-105'>
								{/* Image with responsive properties */}
								<Image
									src='/assets/images/elements/GameLibraryElements/MyLudoImage.webp' // Path to the image
									alt='MyLudo Logo' // Alt text for accessibility
									className='absolute inset-0 h-full w-full object-cover' // Ensures image covers the entire container
									fill // Fills the container
									sizes='100vw' // Responsive sizing for optimization
								/>
								{/* Gradient overlay over the image */}
								<div className='absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-black'></div>
							</div>
						</div>
						{/* Text displayed over the image */}
						<span className='absolute bottom-5 left-10 text-center font-obraletra text-lg text-customWhite-100 underline'>
							<span
								dangerouslySetInnerHTML={{
									__html: textToSpanColored(data.myludo_component_label),
								}}
							/>
						</span>
					</Link>
				</motion.div>
			</div>
		</div>
	)
}
