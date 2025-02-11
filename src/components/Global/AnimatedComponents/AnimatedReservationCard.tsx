'use client'
import { ReservationCardData } from '@/app/actions/services/getReservationCardData.service'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// AnimatedReservationCard Component
export const AnimatedReservationCard = ({
	data,
}: {
	data: ReservationCardData
}) => {
	return (
		<div className='w-full max-lg:px-4'>
			<motion.div
				className='mx-auto flex w-3/4 flex-col items-center gap-8 rounded border-3 border-customBrown-100 bg-customWhite-300 p-4 sm:flex-row sm:gap-20 sm:p-10 max-lg:w-full'
				initial={{ opacity: 0 }} // Initial opacity for fade-in
				animate={{ opacity: 1 }} // Final opacity for fade-in
				transition={{ duration: 0.8 }} // Animation duration
			>
				{/* Text Section */}
				<motion.div
					className='flex w-full flex-col gap-6 p-4 font-cardoRegular text-sm text-customBrown-100 sm:w-2/3 sm:gap-9 sm:p-8 md:text-base'
					initial={{ opacity: 0, x: -100 }} // Initial position and opacity for slide-in effect
					animate={{ opacity: 1, x: 0 }} // Final position and opacity for the text
					transition={{ duration: 0.8 }} // Animation duration
				>
					{/* Title of the reservation */}
					<h2 className='text-left font-cardinal text-2xl first-letter:text-customRed-100 sm:text-3xl'>
						{data.Title}
					</h2>

					{/* Description rendered as HTML content */}
					<div
						className='font-cardoRegular'
						dangerouslySetInnerHTML={{
							__html: data.description, // Render HTML directly from data
						}}
					/>

					{/* Button Section */}
					<div className='flex gap-6 max-sm:flex-col'>
						{/* Primary Button */}
						<motion.div
							initial={{ opacity: 0 }} // Initial opacity for fade-in
							animate={{ opacity: 1 }} // Final opacity for fade-in
							transition={{ delay: 0.6, duration: 0.5 }} // Button fade-in delay and duration
						>
							<Link
								href={data.button_url} // Link to the button URL
								target='_blank'
								aria-label={data.button_aria}
								className='flex h-12 items-center gap-2 rounded border-3 border-customBrown-100 bg-customBrown-100 px-4 font-obraletra text-xs text-customWhite-100 hover:underline sm:text-sm'
							>
								{/* Button label */}
								{data.button_label}
								{/* Right Chevron icon */}
								<FontAwesomeIcon
									icon={faChevronRight}
									className='h-4 w-4 text-customWhite-100'
								/>
							</Link>
						</motion.div>

						{/* Secondary Button */}
						<motion.div
							initial={{ opacity: 0 }} // Initial opacity for fade-in
							animate={{ opacity: 1 }} // Final opacity for fade-in
							transition={{ delay: 0.8, duration: 0.5 }} // Button fade-in delay and duration
						>
							<Link
								href={data.games_url} // Link to the secondary button URL
								target='_blank' // Opens in a new tab
								aria-label={data.button_myludo_aria}
								className='flex h-12 items-center rounded border-3 border-solid border-customBrown-100 px-4 font-obraletra text-xs text-customBrown-100 hover:underline sm:text-sm'
							>
								{/* Secondary button label */}
								{data.button_myludo_label}
							</Link>
						</motion.div>
					</div>
				</motion.div>

				{/* Image Section */}
				<motion.div
					className='flex w-full items-center justify-center sm:w-1/3'
					initial={{ opacity: 0, x: 100 }} // Initial position and opacity for slide-in effect
					animate={{ opacity: 1, x: 0 }} // Final position and opacity for the image
					transition={{ duration: 0.8 }} // Animation duration
				>
					{/* Reservation Image */}
					<Image
						src='/assets/images/elements/ReservationCardIllustration.png'
						alt='Reservation Card Illustration' // Alt text for the image
						width={300} // Image width
						height={200} // Image height
						className='h-auto max-w-full' // CSS classes for image styling
					/>
				</motion.div>
			</motion.div>
		</div>

	)
}
