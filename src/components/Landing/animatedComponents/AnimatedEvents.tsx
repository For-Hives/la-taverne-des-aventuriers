'use client';

import { LandingPageData } from '@/app/actions/services/getLandingPageData.service'; // Importing data type for the landing page
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Importing FontAwesome chevron icon for button arrow
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesomeIcon component for rendering icons
import { motion } from 'framer-motion'; // Importing motion for animations from Framer Motion
import Image from 'next/image'; // Importing Next.js Image component for optimized images
import Link from 'next/link'; // Importing Next.js Link component for navigation

// The AnimatedEvents component takes a prop 'data' of type LandingPageData
export const AnimatedEvents = ({ data }: { data: LandingPageData }) => {
	return (
		<div className='rounded-lg-lg flex h-screen w-3/4 flex-col items-start gap-9'>
			{/* Title Section */}
			<motion.h1
				className='font-obraletraBold text-4xl text-customBrown-100 max-sm:text-base'
				initial={{ opacity: 0 }} // Initial opacity set to 0
				animate={{ opacity: 1 }} // Animate opacity to 1 (fade-in effect)
				transition={{ duration: 0.5 }} // Duration of the fade-in is 0.5 seconds
			>
				{data.events_title} {/* Display the events title from the data */}
			</motion.h1>

			{/* Layout for Event Cards */}
			<div className='flex h-full w-full items-center gap-2 max-lg:flex-col'>
				{/* First Event Card */}
				<motion.div
					className='relative flex h-full w-1/2 flex-col flex-wrap items-start justify-end gap-2 rounded-lg bg-lp-card1-bg bg-cover bg-center font-cardoRegular text-customWhite-100 max-lg:w-full'
					initial={{ opacity: 0, x: -100 }} // Initial opacity is 0 and position X is -100 (off-screen left)
					animate={{ opacity: 1, x: 0 }} // Animate opacity to 1 and X to 0 (slide-in effect from the left)
					transition={{ duration: 0.6 }} // Duration of the animation is 0.6 seconds
				>
					{/* Overlay Gradient */}
					<div className='absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-black'></div>

					{/* Event Text and Content */}
					<div className='z-10 flex flex-col justify-start gap-9 p-12'>
						{/* Title and Date Section */}
						<div className='items-left flex flex-col justify-start'>
							<h2 className='font-obraletraBold text-2xl'>{data.event_card1_title}</h2> {/* Title of the event card */}
							<h3 className='text-base font-obraletra max-lg:text-xs'>
								{/* Format the event date */}
								{new Date(data.event_card1_date).toLocaleDateString('fr-FR')}
							</h3>
						</div>

						{/* Event Description */}
						<div
							className='text-base max-sm:text-xs'
							dangerouslySetInnerHTML={{
								__html: data.event_card1_description, // Injecting HTML for the description
							}}
						></div>

						{/* Link to Event Details */}
						<div>
							<Link
								href={data.event_card1_button_url} // Link URL
								className='flex items-center gap-3 text-base underline max-lg:text-xs'
							>
								<span>{data.event_card1_button_label}</span> {/* Button label */}
								<FontAwesomeIcon
									icon={faChevronRight} // FontAwesome icon for the arrow
									className='h-4 w-4 text-base text-customWhite-100 max-lg:text-xs max-sm:h-3 max-sm:w-3'
								/>
							</Link>
						</div>
					</div>
				</motion.div>

				{/* Second and Third Event Cards */}
				<div className='flex h-full w-1/2 flex-col items-start gap-2 text-customWhite-100 max-lg:w-full'>

					{/* Second Event Card */}
					<motion.div
						className='w-ful relative flex h-1/2 flex-col flex-wrap items-start justify-end gap-2 rounded-lg bg-lp-card2-bg bg-cover bg-center font-cardoRegular text-customWhite-100'
						initial={{ opacity: 0, x: 100 }} // Initial opacity is 0 and position X is 100 (off-screen right)
						animate={{ opacity: 1, x: 0 }} // Animate opacity to 1 and X to 0 (slide-in effect from the right)
						transition={{ duration: 0.6 }} // Duration of the animation is 0.6 seconds
					>
						{/* Overlay Gradient */}
						<div className='absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-black'></div>

						{/* Event Text and Content */}
						<div className='z-10 flex flex-col justify-start gap-6 p-12'>
							<div>
								<h2 className='font-obraletraBold text-2xl max-sm:text-base'>
									{data.event_card2_title} {/* Title of the second event card */}
								</h2>
								<h3 className='font-obraletraBold text-base max-lg:text-xs'>
									{/* Format the event date */}
									{new Date(data.event_card2_date).toLocaleDateString('fr-FR')}
								</h3>
							</div>

							{/* Event Description */}
							<div
								className='text-base max-lg:text-xs'
								dangerouslySetInnerHTML={{
									__html: data.event_card2_description, // Injecting HTML for the description
								}}
							></div>

							{/* Link to Event Details */}
							<div>
								<Link
									href={data.event_card2_button_url} // Link URL
									className='flex items-center gap-3 text-base underline max-lg:text-xs'
								>
									<span>{data.event_card2_button_label}</span> {/* Button label */}
									<FontAwesomeIcon
										icon={faChevronRight} // FontAwesome icon for the arrow
										className='h-4 w-4 text-base text-customWhite-100 max-lg:text-xs max-sm:h-3 max-sm:w-3'
									/>
								</Link>
							</div>
						</div>
					</motion.div>

					{/* Third Event Card */}
					<motion.div
						className='relative flex h-1/2 w-full flex-col flex-wrap items-start justify-end gap-2 rounded-lg bg-lp-card3-bg bg-cover bg-center font-cardoRegular text-customWhite-100 max-lg:w-full'
						initial={{ opacity: 0, y: 50 }} // Initial opacity is 0 and position Y is 50 (below the screen)
						animate={{ opacity: 1, y: 0 }} // Animate opacity to 1 and Y to 0 (slide-up effect)
						transition={{ duration: 0.6 }} // Duration of the animation is 0.6 seconds
					>
						{/* Overlay Gradient */}
						<div className='absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-black'></div>

						{/* Event Text and Content */}
						<div className='z-10 flex flex-col justify-start gap-6 p-12'>
							<div>
								<h2 className='font-obraletraBold text-2xl'>
									{data.event_card3_title} {/* Title of the third event card */}
								</h2>
								<h3 className='font-obraletraBold text-base max-lg:text-xs'>
									{/* Format the event date */}
									{new Date(data.event_card3_date).toLocaleDateString('fr-FR')}
								</h3>
							</div>

							{/* Event Description */}
							<div
								className='text-base max-lg:text-xs'
								dangerouslySetInnerHTML={{
									__html: data.event_card3_description, // Injecting HTML for the description
								}}
							></div>

							{/* Link to Event Details */}
							<div>
								<Link
									href={data.event_card3_button_url} // Link URL
									className='flex items-center gap-3 text-base underline max-lg:text-xs'
								>
									<span>{data.event_card3_button_label}</span> {/* Button label */}
									<FontAwesomeIcon
										icon={faChevronRight} // FontAwesome icon for the arrow
										className='h-4 w-4 text-customWhite-100 max-sm:h-3 max-sm:w-3'
									/>
								</Link>
							</div>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Image at the bottom-right corner */}
			<div className='flex w-full items-end justify-end gap-2'>
				<motion.div
					initial={{ opacity: 0 }} // Initial opacity is 0
					animate={{ opacity: 1 }} // Animate opacity to 1 (fade-in effect)
					transition={{ delay: 0.8, duration: 0.6 }} // Delay of 0.8s before the fade-in starts
				>
					<Image
						src='/assets/images/elements/fairy.png' // Image source
						alt='Vinbieres' // Image alt text
						width={100} // Image width
						height={100} // Image height
						className='h-auto max-w-full max-sm:w-1/2' // Responsive width and height settings
					/>
				</motion.div>
			</div>
		</div>
	)
};
