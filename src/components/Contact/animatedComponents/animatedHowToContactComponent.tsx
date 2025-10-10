'use client'

import { ContactPageData } from '@/app/actions/services/getContactPageData.service'
import { motion } from 'framer-motion' // Importing motion for animations from Framer Motion
import Image from 'next/image'

export const AnimatedHowToContactComponent = ({
	data,
}: {
	data: ContactPageData
}) => {
	return (
		<div className='relative flex h-full w-full max-w-7xl items-center justify-center overflow-hidden'>
			<div className='grid h-full w-full grid-cols-3 grid-rows-2'>
				{/* Animated House Image */}
				<motion.div
					className='col-span-3 row-span-1 flex items-center justify-center lg:col-span-1 lg:row-span-2 lg:justify-end'
					initial={{ opacity: 0, x: -100 }} // Start from left with opacity 0
					animate={{ opacity: 1, x: 0 }} // Fade in and slide to position when in view
					viewport={{ once: true }} // Trigger only once
					transition={{ duration: 0.8 }} // Transition duration
				>
					<Image
						src={
							data.howtosection_image ||
							'/assets/images/elements/ReservationCardIllustration.webp'
						}
						alt='illustration'
						width={480}
						height={480}
					/>
				</motion.div>

				{/* Animated Text Section */}
				<motion.div
					className='col-span-3 row-span-1 flex items-center justify-center px-6 lg:col-span-2 lg:row-span-2'
					initial={{ opacity: 0, y: 50 }} // Start from below with opacity 0
					animate={{ opacity: 1, y: 0 }} // Fade in and slide up when in view
					viewport={{ once: true }} // Trigger only once
					transition={{ delay: 0.2, duration: 1 }} // Delay for sequential animation
				>
					<div className='text-custom-brown-100 flex w-full flex-col items-start justify-center gap-0 max-lg:w-full lg:w-2/3 lg:items-center'>
						{/* How to Title */}
						<motion.h2
							className='font-cardinal first-letter:text-custom-red-100 w-full text-left text-3xl lg:text-4xl'
							initial={{ opacity: 0, x: -50 }} // Initial left slide with opacity 0
							animate={{ opacity: 1, x: 0 }} // Fade in and move to normal position when in view
							viewport={{ once: true }} // Trigger only once
							transition={{ duration: 0.6 }}
						>
							<span
								dangerouslySetInnerHTML={{ __html: data.howtosection_title }}
							/>
						</motion.h2>

						<div
							className={'prose prose-customBrown font-cardo-regular w-full'} // Styling for the description
							dangerouslySetInnerHTML={{
								__html: data.howtosection_description,
							}} // Injecting HTML content for description
						/>
					</div>
				</motion.div>
			</div>
		</div>
	)
}
