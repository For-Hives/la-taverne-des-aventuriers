'use client'

import { GamesPageData } from '@/app/actions/services/getGamePageData.service' // Importing data type for game page data
import { faChevronRight } from '@fortawesome/free-solid-svg-icons' // Importing FontAwesome chevron icon for button arrow
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // FontAwesomeIcon component for rendering icons
import { motion } from 'framer-motion' // Importing motion for animations from Framer Motion
import Link from 'next/link' // Importing Next.js Link component for navigation

// The AnimatedGameComponent takes a prop 'data' of type GamesPageData
export const AnimatedGameComponent = ({ data }: { data: GamesPageData }) => {
	return (
		<div className='flex h-screen w-3/4 flex-col items-start gap-9 max-lg:w-full max-lg:px-4'>
			{/* Title Section */}
			<motion.h2
				className='font-obraletraBold text-4xl text-customBrown-100 max-lg:text-3xl'
				initial={{ opacity: 0 }} // Initial opacity is 0 (hidden)
				animate={{ opacity: 1 }} // Animate opacity to 1 (fully visible)
				transition={{ duration: 0.6 }} // Transition duration is 0.6 seconds
			>
				{data.Card_Title} {/* Displaying the card title from data */}
			</motion.h2>

			{/* Layout for Event Cards */}
			<div className='flex h-full w-full items-center gap-2 max-lg:flex-col'>
				{/* First Card */}
				<motion.div
					className='relative flex h-full w-1/2 flex-col flex-wrap items-start justify-end gap-2 rounded-lg bg-gl-card1-bg bg-cover bg-center font-obraletra text-customWhite-100 max-lg:w-full'
					initial={{ opacity: 0, x: -100 }} // Initially hidden with opacity 0 and positioned to the left
					whileInView={{ opacity: 1, x: 0 }} // When in view, animate to opacity 1 and position 0 (in place)
					viewport={{ once: true }} // Trigger the animation only once when visible
					transition={{ duration: 0.8 }} // Transition duration of 0.8 seconds
				>
					{/* Overlay Gradient */}
					<div className='absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-black'></div>
					{/* Card Content */}
					<div className='z-10 flex flex-col justify-start gap-9 p-12'>
						<h2 className='font-obraletraBold text-2xl'>{data.card1_title}</h2>
						{/* Rendering card1 description with dangerouslySetInnerHTML to inject HTML content */}
						<div
							className='font-cardoRegular'
							dangerouslySetInnerHTML={{
								__html: data.card1_description,
							}}
						></div>
						{/* Button with link and icon */}
						<Link
							target='_blank'
							href={data.card1_button_url}
							aria-label={data.card1_button_aria}
							className='flex items-center gap-3 underline'
						>
							<span>{data.card1_button_label}</span>
							<FontAwesomeIcon
								icon={faChevronRight} // Displaying chevron icon
								className='h-4 w-4 text-customWhite-100'
							/>
						</Link>
					</div>
				</motion.div>

				{/* Second Column */}
				<div className='flex h-full w-1/2 flex-col items-center gap-2 text-customWhite-100 max-lg:w-full'>
					{/* Second Card */}
					<motion.div
						className='relative flex h-1/2 w-full flex-col flex-wrap items-start justify-end gap-2 rounded-lg bg-gl-card2-bg bg-cover bg-center max-lg:w-full'
						initial={{ opacity: 0, x: 100 }} // Initially hidden with opacity 0 and positioned to the right
						whileInView={{ opacity: 1, x: 0 }} // Animate to opacity 1 and position 0 (in place) when in view
						viewport={{ once: true }} // Trigger the animation only once when visible
						transition={{ duration: 0.8 }} // Transition duration of 0.8 seconds
					>
						{/* Overlay Gradient */}
						<div className='absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-black'></div>
						<div className='z-10 flex flex-col justify-start gap-6 p-12'>
							<h2 className='font-obraletraBold text-2xl'>
								{data.card2_title}
							</h2>
							{/* Rendering card2 description with dangerouslySetInnerHTML */}
							<div
								className='font-cardoRegular'
								dangerouslySetInnerHTML={{
									__html: data.card2_description,
								}}
							></div>
							{/* Button with link and icon */}
							<Link
								target='_blank'
								href={data.card2_button_url}
								aria-label={data.card2_button_aria}
								className='flex items-center gap-3 underline'
							>
								<span>{data.card2_button_label}</span>
								<FontAwesomeIcon icon={faChevronRight} className='h-4 w-4' />
							</Link>
						</div>
					</motion.div>

					{/* Third Card */}
					<motion.div
						className='relative flex h-1/2 w-full flex-col flex-wrap items-start justify-end gap-2 rounded-lg bg-gl-card3-bg bg-cover bg-center max-lg:w-full'
						initial={{ opacity: 0, y: 100 }} // Initially hidden with opacity 0 and positioned downwards
						whileInView={{ opacity: 1, y: 0 }} // Animate to opacity 1 and position 0 (in place) when in view
						viewport={{ once: true }} // Trigger the animation only once when visible
						transition={{ duration: 0.8 }} // Transition duration of 0.8 seconds
					>
						{/* Overlay Gradient */}
						<div className='absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-black'></div>
						<div className='z-10 flex flex-col justify-start gap-6 p-12'>
							<h2 className='font-obraletraBold text-2xl'>
								{data.card3_title}
							</h2>
							{/* Rendering card3 description with dangerouslySetInnerHTML */}
							<div
								className='font-cardoRegular'
								dangerouslySetInnerHTML={{
									__html: data.card3_description,
								}}
							></div>
							{/* Button with link and icon */}
							<Link
								target='_blank'
								href={data.card3_button_url}
								aria-label={data.card3_button_aria}
								className='flex items-center gap-3 underline'
							>
								<span>{data.card3_button_label}</span>
								<FontAwesomeIcon icon={faChevronRight} className='h-4 w-4' />
							</Link>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	)
}
