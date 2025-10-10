'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface EventData {
	id: string
	event_title: string
	event_date: string
	event_image?: string
	summary: string
	event_slug: string
	Important_One: boolean
}

export default function FeaturedEvent({ events }: { events: EventData[] }) {
	// Filter for important events
	const importantEvents = events.filter(event => event.Important_One)

	if (importantEvents.length === 0) {
		return null
	}

	return (
		<div className='mx-auto mb-32 max-w-7xl'>
			{importantEvents.map(event => (
				<motion.div
					key={event.id}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='border-custom-brown-100/20 hover:border-custom-brown-100/40 relative rounded-lg border bg-white p-6 shadow-lg transition-all'
				>
					<Star
						className={
							'absolute top-0 right-0 m-2 h-6 w-6 fill-amber-500 opacity-70'
						}
					/>
					<h4 className='font-cardo-regular text-custom-brown-100 mb-4 text-xl font-bold md:text-2xl lg:hidden'>
						{event.event_title}
					</h4>

					{/* Desktop Layout */}
					<div className='flex gap-8'>
						{event.event_image && (
							<div className='relative hidden h-auto min-h-96 w-full overflow-hidden rounded-lg lg:block'>
								<Image
									src={event.event_image}
									alt={event.event_title}
									fill
									className='object-cover transition-transform duration-300 hover:scale-105'
								/>
							</div>
						)}
						<div className='flex flex-col justify-between'>
							<div>
								<p className='font-cardinal text-custom-brown-100 mb-2 text-2xl'>
									{new Date(event.event_date).toLocaleDateString('fr-FR', {
										month: 'long',
										year: 'numeric',
									})}
								</p>
								<h4 className='font-cardo-regular text-custom-brown-100 mb-4 hidden text-3xl font-bold md:block'>
									{event.event_title}
								</h4>
								<div
									className='prose font-cardo-regular text-custom-brown-100 mb-4 hidden lg:block'
									dangerouslySetInnerHTML={{ __html: event.summary }}
								/>
							</div>

							<div>
								<Link
									href={`/evenements/${event.event_slug}`}
									className='bg-custom-brown-100 hover:bg-custom-brown-100/80 hidden rounded-md px-4 py-2 text-white transition-colors duration-300 lg:inline-block'
								>
									En savoir plus
								</Link>
							</div>
						</div>
					</div>

					{/* Mobile/Tablet Layout */}
					{event.event_image && (
						<div className='relative mb-4 h-72 w-full overflow-hidden rounded-lg md:h-96 lg:hidden'>
							<Image
								src={event.event_image}
								alt={event.event_title}
								fill
								className='object-cover transition-transform duration-300 hover:scale-105'
							/>
						</div>
					)}

					<div
						className='prose font-cardo-regular text-custom-brown-100 mb-4 lg:hidden'
						dangerouslySetInnerHTML={{ __html: event.summary }}
					/>
					<Link
						href={`/evenements/${event.event_slug}`}
						className='bg-custom-brown-100 hover:bg-custom-brown-100/80 inline-block rounded-md px-4 py-2 text-white transition-colors duration-300 lg:hidden'
					>
						En savoir plus
					</Link>
				</motion.div>
			))}
		</div>
	)
}
