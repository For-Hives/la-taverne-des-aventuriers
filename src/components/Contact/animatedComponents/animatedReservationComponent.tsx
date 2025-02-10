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
		<div className='relative flex h-full w-full items-center justify-center overflow-hidden'>
			<div className='grid h-full w-full grid-cols-3 grid-rows-2'>
				{/* Animated House Image */}
				<motion.div
					className='col-span-3 row-span-1 flex items-center justify-center md:col-span-1 md:row-span-2 md:justify-end'
					initial={{ opacity: 0, x: -100 }} // Start from left with opacity 0
					animate={{ opacity: 1, x: 0 }} // Fade in and slide to position when in view
					viewport={{ once: true }} // Trigger only once
					transition={{ duration: 0.8 }} // Transition duration
				>
					<Image
						src='/assets/images/elements/ContactElements/maison.png'
						alt='House illustration'
						width={720}
						height={480}
						className='w-3/4 rounded max-md:w-1/2'
					/>
				</motion.div>

				{/* Animated Text Section */}
				<motion.div
					className='col-span-3 row-span-1 flex items-center justify-center px-6 md:col-span-2 md:row-span-2'
					initial={{ opacity: 0, y: 50 }} // Start from below with opacity 0
					animate={{ opacity: 1, y: 0 }} // Fade in and slide up when in view
					viewport={{ once: true }} // Trigger only once
					transition={{ delay: 0.2, duration: 1 }} // Delay for sequential animation
				>
					<div className='flex w-full flex-col items-start justify-center gap-9 text-customBrown-100 max-md:w-full max-md:items-center md:w-2/3'>
						{/* How to Title */}
						<motion.h2
							className='font-cardinal text-3xl first-letter:text-customRed-100 md:text-4xl'
							initial={{ opacity: 0, x: -50 }} // Initial left slide with opacity 0
							animate={{ opacity: 1, x: 0 }} // Fade in and move to normal position when in view
							viewport={{ once: true }} // Trigger only once
							transition={{ duration: 0.6 }}
						>
							{data.how_to_title}
						</motion.h2>

						<div
							className={'prose prose-customBrown'} // Styling for the description
							dangerouslySetInnerHTML={{ __html: data.description }} // Injecting HTML content for description
						/>

						{/* Animated bag image */}
						<motion.div
							className='-translate-x-50 -translate-y-50 absolute right-0 top-0'
							initial={{ opacity: 0, scale: 0.8 }} // Start with opacity 0 and smaller size
							animate={{ opacity: 1, scale: 1 }} // Fade in and scale up when in view
							viewport={{ once: true }} // Trigger only once
							transition={{ delay: 0.6, duration: 0.6 }} // Delay for staggered effect
						>
							<Image
								src='/assets/images/elements/bourse.png'
								alt='bag illustration'
								width={200}
								height={150}
								className='w-4/6 rounded max-md:hidden'
							/>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</div>
	)
}
