'use client'

import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons' // Importing Facebook and Instagram icons from Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // Font Awesome React component for icons
import { motion } from 'framer-motion' // Importing motion for animations from Framer Motion
import Image from 'next/image' // Next.js Image component
import Link from 'next/link' // Next.js Link component for navigation
import { useState } from 'react' // Importing useState for managing state in the component

import type { ContactPageData } from '@/app/actions/services/getContactPageData.service' // Importing the data type for the contact page

// The AnimatedContactElementSection component is receiving `data` as props

export const AnimatedContactElementSection = ({ data }: { data: ContactPageData }) => {
	// State hook to manage hover state
	const [hovered, setHovered] = useState(false)

	return (
		<section className="relative w-full rounded-lg">
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
					{/* Contact and Info Cards */}
					<div className="lg:col-span-7">
						<div className="grid gap-8 sm:grid-cols-2">
							{/* Business Hours */}
							<motion.div
								initial={{ opacity: 0, y: 100 }} // Start the animation off-screen
								whileInView={{ opacity: 1, y: 0 }} // Make it fade in and slide up when it enters the viewport
								viewport={{ once: true }} // Animation triggers once
								transition={{ duration: 0.8 }} // Duration for the animation
								className="border-custom-brown-100 bg-custom-white-300 font-obraletra flex flex-col items-start gap-6 rounded-2xl border-3 p-6 shadow-sm"
							>
								<h3 className="font-obraletra text-custom-brown-100 first-letter:font-obraletra-bold text-2xl">
									{data.schedule_title}
								</h3>
								<div
									className={'prose prose-customBrown'} // Styling for the description
									dangerouslySetInnerHTML={{ __html: data.schedule_content }} // Injecting HTML content for description
								/>
							</motion.div>

							{/* Contact Block */}
							<motion.div
								initial={{ opacity: 0, y: 100 }} // Same animation as the first block
								whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up
								viewport={{ once: true }} // Triggers once when it enters the viewport
								transition={{ delay: 0.2, duration: 0.8 }}
								className="font-obraletra flex flex-col gap-6"
							>
								{/* Social Media */}
								<div className="border-custom-brown-100 bg-custom-white-300 flex flex-col items-start gap-4 rounded-2xl border-3 p-6 shadow-sm">
									<h3 className="font-obraletra text-custom-brown-100 first-letter:font-obraletra-bold w-full text-2xl">
										{data.contact_socials_title}
									</h3>
									<div className="flex items-center justify-start gap-10">
										<Link
											href={data.facebook_url}
											aria-label={data.facebook_aria}
											target="_blank"
											rel="noreferrer noopener"
											className="group bg-custom-white-400 hover:bg-custom-brown-100 flex h-12 w-12 items-center justify-center rounded-full"
										>
											<FontAwesomeIcon
												icon={faFacebook}
												className="text-custom-brown-100 text-3xl group-hover:text-custom-white-100 h-8 w-8"
											/>
										</Link>
										<Link
											href={data.myludo_url}
											aria-label={data.myludo_aria}
											target={'_blank'}
											rel={'noreferrer noopener'}
											className="group bg-custom-white-400 hover:bg-custom-brown-100 flex h-12 w-12 items-center justify-center rounded-full"
										>
											<Image
												src="/assets/images/elements/ContactElements/myludo_icon.webp"
												alt="MyLudo Icon"
												className="text-3xl h-8 w-8 group-hover:hidden"
												width={200}
												height={200}
											/>
											<Image
												src="/assets/images/elements/ContactElements/myludo_icon2.webp"
												alt="MyLudo Icon"
												className="hidden text-3xl h-8 w-8 group-hover:block"
												width={200}
												height={200}
											/>
										</Link>
										<Link
											href={data.instagram_url}
											aria-label={data.instagram_aria}
											target={'_blank'}
											rel={'noreferrer noopener'}
											className="group bg-custom-white-400 hover:bg-custom-brown-100 flex h-12 w-12 items-center justify-center rounded-full"
										>
											<FontAwesomeIcon
												icon={faInstagram}
												className="text-custom-brown-100 text-3xl group-hover:text-custom-white-100 h-8 w-8"
											/>
										</Link>
									</div>
								</div>

								{/* Email Block */}
								<div className="font-obraletra relative flex flex-col gap-6">
									<button
										type="button"
										onMouseEnter={() => setHovered(true)} // Trigger hover state on mouse enter
										onMouseLeave={() => setHovered(false)} // Reset hover state on mouse leave
										className="border-custom-brown-100 bg-custom-white-300 flex flex-col items-start gap-4 rounded-2xl border-3 p-6 shadow-sm"
									>
										<h3 className="font-obraletra text-custom-brown-100 first-letter:font-obraletra-bold text-2xl">
											{data.contact_email_title} {/* Display the email title */}
										</h3>
										<Link
											href={`mailto:${data.contact_email}`}
											aria-label={data.email_aria}
											className="font-cardo-regular text-custom-brown-100 underline"
										>
											{data.contact_email}
										</Link>
									</button>
									{/* Conditional rendering of image when not hovered */}
									<motion.div
										className="relative max-lg:hidden -z-20"
										initial={{ y: 0 }}
										animate={{ y: hovered ? 0 : -70 }} // Animate the image based on hover state
										transition={{
											damping: 20,
											stiffness: 200,
											type: 'spring',
										}}
									>
										<Image
											src="/assets/images/elements/ContactElements/petite_bestiole.webp"
											alt="Petite Bestiole"
											width={80}
											height={80}
											className="absolute right-0 -bottom-8 -z-20 h-20 w-20 object-contain"
										/>
									</motion.div>
								</div>
							</motion.div>
						</div>
					</div>

					{/* Decorative Image */}
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.4, duration: 0.8 }}
						className="flex items-center justify-center lg:col-span-5"
					>
						<div className="relative">
							<Image
								src="/assets/images/elements/ContactElements/runes.webp"
								alt="Runes"
								className="absolute -top-32 -left-24 h-32 w-auto opacity-60 max-lg:hidden"
								width={150}
								height={150}
							/>
							<Image
								src="/assets/images/elements/ContactElements/dragon.webp"
								alt="Dragon"
								className="hidden w-full max-w-md md:block"
								width={325}
								height={325}
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
