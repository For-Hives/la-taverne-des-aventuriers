'use client'

import { ContactPageData } from '@/app/actions/services/getContactPageData.service' // Importing the data type for the contact page
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons' // Importing Facebook and Instagram icons from Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // Font Awesome React component for icons
import { motion } from 'framer-motion' // Importing motion for animations from Framer Motion
import Image from 'next/image' // Next.js Image component
import Link from 'next/link' // Next.js Link component for navigation
import { useState } from 'react' // Importing useState for managing state in the component

// The AnimatedContactElementSection component is receiving `data` as props

export const AnimatedContactElementSection = ({
	data,
}: {
	data: ContactPageData
}) => {
	// State hook to manage hover state
	const [hovered, setHovered] = useState(false)

	return (
		<div className='flex w-full items-center justify-center gap-8 p-8 max-xl:flex-col max-lg:w-full'>
			{/* Grid Layout for Contact Sections */}
			<div className='grid w-1/2 max-w-6xl grid-cols-1 gap-8 max-xl:w-full lg:grid-cols-2'>
				{/* Bloc Horaires (Business Hours) */}
				<motion.div
					initial={{ opacity: 0, y: 100 }} // Start the animation off-screen
					whileInView={{ opacity: 1, y: 0 }} // Make it fade in and slide up when it enters the viewport
					viewport={{ once: true }} // Animation triggers once
					transition={{ duration: 0.8 }} // Duration for the animation
					className='flex flex-col items-start gap-6 rounded-2xl border-3 border-customBrown-100 bg-customWhite-300 p-6 font-obraletra shadow'
				>
					<h1 className='font-obraletra text-2xl text-customBrown-100 first-letter:font-obraletraBold'>
						{data.schedule_title}
					</h1>
					<div
						className={'prose prose-customBrown'} // Styling for the description
						dangerouslySetInnerHTML={{ __html: data.schedule_content }} // Injecting HTML content for description
					/>
				</motion.div>

				{/* Bloc Contact et Email (Contact and Email) */}
				<motion.div
					initial={{ opacity: 0, y: 100 }} // Same animation as the first block
					whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up
					viewport={{ once: true }} // Triggers once when it enters the viewport
					transition={{ duration: 0.8 }}
					className='flex flex-col gap-6 font-obraletra'
				>
					{/* Bloc Contact (Social Media) */}
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className='flex flex-col items-center gap-4 rounded-2xl border-3 border-customBrown-100 bg-customWhite-300 p-6 shadow'
					>
						<h2 className='w-full font-obraletra text-2xl text-customBrown-100 first-letter:font-obraletraBold'>
							{data.contact_socials_title}
						</h2>
						<div className='flex items-center justify-evenly gap-10'>
							<Link
								href={data.facebook_url}
								aria-label={data.facebook_aria}
								target='_blank'
								rel='noreferrer noopener'
								className='group flex h-12 w-12 items-center justify-center rounded-full bg-customWhite-400 hover:bg-customBrown-100'
							>
								<FontAwesomeIcon
									icon={faFacebook}
									className='h-8 w-8 text-customBrown-100 group-hover:text-customWhite-100'
								/>
							</Link>
							<Link
								href={data.myludo_url}
								aria-label={data.myludo_aria}
								target={'_blank'}
								rel={'noreferrer noopener'}
								className='group flex h-12 w-12 items-center justify-center rounded-full bg-customWhite-400 hover:bg-customBrown-100'
							>
								<Image
									src='/assets/images/elements/ContactElements/myludo_icon.png'
									alt='MyLudo Icon'
									className='h-8 w-8 group-hover:hidden'
									width={200}
									height={200}
								/>
								<Image
									src='/assets/images/elements/ContactElements/myludo_icon2.png'
									alt='MyLudo Icon'
									className='hidden h-8 w-8 group-hover:block'
									width={200}
									height={200}
								/>
							</Link>
							<Link
								href={data.instagram_url}
								aria-label={data.instagram_aria}
								target={'_blank'}
								rel={'noreferrer noopener'}
								className='group flex h-12 w-12 items-center justify-center rounded-full bg-customWhite-400 hover:bg-customBrown-100'
							>
								<FontAwesomeIcon
									icon={faInstagram}
									className='h-8 w-8 text-customBrown-100 group-hover:text-customWhite-100'
								/>
							</Link>
						</div>
					</motion.div>

					{/* Bloc Email */}
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className='relative flex flex-col gap-6 font-obraletra'
					>
						<button
							onMouseEnter={() => setHovered(true)} // Trigger hover state on mouse enter
							onMouseLeave={() => setHovered(false)} // Reset hover state on mouse leave
							className='flex flex-col items-start gap-4 rounded-2xl border-3 border-customBrown-100 bg-customWhite-300 p-6 shadow'
						>
							<h2 className='font-obraletra text-2xl text-customBrown-100 first-letter:font-obraletraBold'>
								{data.contact_email_title} {/* Display the email title */}
							</h2>
							<Link
								href={`mailto:${data.contact_email}`}
								aria-label={data.email_aria}
								className='font-cardoRegular text-customBrown-100 underline'
							>
								{data.contact_email}
							</Link>
						</button>
						{/* Conditional rendering of image when not hovered */}
						<div className='relative max-md:hidden'>
							<motion.img
								src='/assets/images/elements/ContactElements/petite_bestiole.png'
								alt='Petite Bestiole'
								initial={{ y: 0 }}
								animate={{ y: hovered ? 0 : -70 }} // Animate the image based on hover state
								transition={{ damping: 20, stiffness: 200, type: 'spring' }}
								className='absolute bottom-[-2rem] right-0 -z-20 h-20 w-20 object-contain'
							/>
						</div>
					</motion.div>
				</motion.div>
			</div>

			{/* Decorative Images (Dragon, Runes) */}
			<motion.div
				initial={{ opacity: 0, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
				className='relative flex w-1/2 justify-end max-xl:w-full max-xl:justify-center'
			>
				<Image
					src='/assets/images/elements/ContactElements/runes.png'
					alt='Runes'
					className='absolute left-20 top-[-4rem] h-1/4 w-1/4 object-contain max-lg:hidden'
					width={150}
					height={150}
				/>
				<Image
					src='/assets/images/elements/ContactElements/dragon.png'
					alt='Dragon'
					className='h-1/2 w-1/2 max-xl:h-fit max-xl:w-1/3 max-lg:w-3/4'
					width={400}
					height={400}
				/>
			</motion.div>
		</div>
	)
}
