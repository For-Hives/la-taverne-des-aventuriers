'use client'

import { ReservationPageData } from '@/app/actions/services/getReservationPageData.service'
import { motion } from 'framer-motion' // Importing motion for animations from Framer Motion
import Image from 'next/image'

export const AnimatedReservationComponent = ({
	data,
}: {
	data: ReservationPageData
}) => {
	return (
		<section className='relative w-full overflow-hidden rounded-lg'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 items-center gap-8 lg:grid-cols-2'>
					{/* Text Section */}
					<motion.div
						className='order-2 lg:order-1'
						initial={{ opacity: 0, y: 50 }} // Start from below with opacity 0
						animate={{ opacity: 1, y: 0 }} // Fade in and slide up when in view
						viewport={{ once: true }} // Trigger only once
						transition={{ delay: 0.2, duration: 1 }} // Delay for sequential animation
					>
						<div className='max-w-none'>
							{/* Title */}
							<motion.h2
								className='w-full text-left font-cardinal text-3xl text-customBrown-100 first-letter:text-customRed-100 lg:text-4xl'
								initial={{ opacity: 0, x: -50 }} // Initial left slide with opacity 0
								animate={{ opacity: 1, x: 0 }} // Fade in and move to normal position when in view
								viewport={{ once: true }} // Trigger only once
								transition={{ duration: 0.6 }}
							>
								<span dangerouslySetInnerHTML={{ __html: data.how_to_title }} />
							</motion.h2>

							{/* Description */}
							<div
								className='prose prose-customBrown mt-6 font-cardoRegular text-lg' // Styling for the description
								dangerouslySetInnerHTML={{ __html: data.description }} // Injecting HTML content for description
							/>
						</div>
					</motion.div>

					{/* Image Section */}
					<motion.div
						className='order-1 flex justify-center lg:order-2'
						initial={{ opacity: 0, x: -100 }} // Start from left with opacity 0
						animate={{ opacity: 1, x: 0 }} // Fade in and slide to position when in view
						viewport={{ once: true }} // Trigger only once
						transition={{ duration: 0.8 }} // Transition duration
					>
						<Image
							src='/assets/images/elements/ContactElements/maison.webp'
							alt='House illustration'
							width={458}
							height={578}
							className='hidden max-w-full rounded-lg object-contain lg:block lg:max-w-md'
						/>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
