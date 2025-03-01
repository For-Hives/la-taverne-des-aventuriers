'use client'

import { ContactPageData } from '@/app/actions/services/getContactPageData.service'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion' // Importing motion for animations from Framer Motion
import Image from 'next/image'
import Link from 'next/link'

export const AnimatedMapSectionComponent = ({
	data,
}: {
	data: ContactPageData
}) => {
	return (
		<div className='flex w-full flex-col items-center gap-8 pt-12 font-obraletra text-customBrown-100 md:flex-row md:p-16'>
			{/* Text Section */}
			<motion.div
				className='flex w-full flex-col items-start gap-8 p-4 md:w-1/3'
				initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly offset
				whileInView={{ opacity: 1, y: 0 }} // Animate when in view: fade in and slide up
				viewport={{ once: true }} // Trigger animation only once
				transition={{ duration: 0.8 }} // Transition duration
			>
				{/* Title of the address */}
				<motion.h1
					className='font-cardinal text-4xl first-letter:text-customRed-100 md:text-6xl'
					initial={{ opacity: 0, x: -50 }} // Start from left with opacity 0
					whileInView={{ opacity: 1, x: 0 }} // Fade in and slide to normal position
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					{data.address_title} {/* Display the address title */}
				</motion.h1>

				{/* Temporary Field - Prose Section */}
				<motion.div
					className='prose max-w-xl text-base text-customBrown-100 prose-headings:font-cardinal prose-headings:text-customBrown-100 prose-headings:first-letter:text-customRed-100 prose-strong:text-customBrown-100'
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.1, duration: 0.7 }}
				>
					<div
						dangerouslySetInnerHTML={{
							__html: data.temporary_field || '',
						}}
					/>
				</motion.div>

				{/* Address */}
				{/* <motion.p
					className='text-lg md:text-3xl'
					initial={{ opacity: 0, y: 30 }} // Start from below
					whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up
					viewport={{ once: true }}
					transition={{ delay: 0.2, duration: 0.8 }}
				>
					{data.address} {/* Display the address */}
				{/* </motion.p> */}
				{/* Button linking to the URL */}
				<motion.div
					initial={{ opacity: 0, y: 30 }} // Start from below
					whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up
					viewport={{ once: true }}
					transition={{ delay: 0.4, duration: 0.8 }}
				>
					<Link
						target='_blank'
						rel='noreferrer noopener'
						href={data.button_url}
						aria-label={data.button_aria}
						className='flex items-center justify-center gap-4 rounded border-3 border-customBrown-100 bg-customBrown-100 px-8 py-3 font-cardoRegular text-base text-customWhite-100 transition hover:border-3 hover:border-customBrown-100 hover:bg-customWhite-100 hover:text-customBrown-100 md:min-w-52 lg:min-w-60'
					>
						<span className='font-cardoRegular text-base'>
							{data.button_label}
						</span>
						{/* Chevron icon for the button */}
						<FontAwesomeIcon
							icon={faChevronRight}
							className='h-4 w-4 opacity-95'
						/>
					</Link>
				</motion.div>
			</motion.div>

			{/* Image Section */}
			<motion.div
				className='relative w-full'
				initial={{ opacity: 0 }} // Start with opacity 0
				whileInView={{ opacity: 1 }} // Fade in when in view
				viewport={{ once: true }} // Trigger animation only once
				transition={{ duration: 0.8 }} // Transition duration
			>
				{/* Image for small screens */}
				<div className='min-w-screen maskMapMobile block h-full min-h-screen w-full md:hidden'>
					<Image
						src='/assets/images/map2.webp' // Image source for small screens
						alt='Map for small screens'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw'
						fill
						className='h-full min-h-[80vh] w-full min-w-[50vw] rounded-lg object-cover shadow-md' /* Image that fills the container */
					/>
				</div>

				{/* Image for large screens */}
				<div className='maskMap hidden md:block'>
					<Image
						src='/assets/images/map.webp' // Image source for large screens
						alt='Map for large screens'
						width={1920}
						height={1080}
						className='h-[50vh] w-full rounded-lg object-cover shadow-md md:min-w-[75vw] xl:min-w-[50vw]' /* Image that fills the container */
					/>
				</div>
			</motion.div>
		</div>
	)
}
