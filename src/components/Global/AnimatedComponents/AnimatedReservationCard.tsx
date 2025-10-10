'use client'
import { ReservationCardData } from '@/app/actions/services/getReservationCardData.service'
import { textToSpanColored } from '@/utils/textToSpanColored'
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
				className='border-custom-brown-100 bg-custom-white-300 mx-auto flex w-3/4 flex-col items-center rounded border-3 p-4 max-lg:w-full lg:flex-row lg:gap-8 lg:gap-20 lg:p-10'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
			>
				{/* Text Section */}
				<motion.div
					className='font-cardo-regular text-custom-brown-100 order-2 flex w-full flex-col gap-6 p-4 text-sm lg:order-0 lg:w-2/3 lg:gap-9 lg:p-8 lg:text-base'
					initial={{ opacity: 0, x: -100 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
				>
					{/* Title with textToSpanColored */}
					<h2 className='font-cardinal first-letter:text-custom-red-100 text-left text-2xl sm:text-3xl'>
						<span
							dangerouslySetInnerHTML={{
								__html: textToSpanColored(data.title),
							}}
						/>
					</h2>

					{/* Description rendered as HTML content */}
					<div
						className='prose prose-customBrown font-cardo-regular'
						dangerouslySetInnerHTML={{
							__html: data.description,
						}}
					/>

					{/* Button Section */}
					<div className='flex gap-6 max-sm:flex-col'>
						{/* Primary Button */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.6, duration: 0.5 }}
						>
							<Link
								href={data.button_url}
								target='_blank'
								aria-label={data.button_aria}
								className='border-custom-brown-100 bg-custom-brown-100 font-obraletra text-custom-white-100 flex h-12 items-center gap-2 rounded border-3 px-4 text-xs hover:underline sm:text-sm'
							>
								{data.button_label}
								<FontAwesomeIcon
									icon={faChevronRight}
									className='text-custom-white-100 h-4 w-4'
								/>
							</Link>
						</motion.div>

						{/* Secondary Button */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.8, duration: 0.5 }}
						>
							<Link
								href={data.games_url}
								target='_blank'
								aria-label={data.button_myludo_aria}
								className='border-custom-brown-100 font-obraletra text-custom-brown-100 flex h-12 items-center rounded border-3 border-solid px-4 text-xs hover:underline sm:text-sm'
							>
								{data.button_myludo_label}
							</Link>
						</motion.div>
					</div>
				</motion.div>

				{/* Image Section */}
				<motion.div
					className='flex w-full items-center justify-center lg:w-1/3'
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
				>
					{/* Reservation Image */}
					<Image
						src='/assets/images/elements/ReservationCardIllustration.webp'
						alt='Reservation Card Illustration'
						width={500}
						height={300}
						className='h-auto max-w-full'
					/>
				</motion.div>
			</motion.div>
		</div>
	)
}
