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
					className='relative rounded-lg border border-customBrown-100/20 bg-white p-6 shadow-lg transition-all hover:border-customBrown-100/40'
				>
					<Star
						className={
							'absolute right-0 top-0 m-2 h-6 w-6 fill-amber-500 opacity-70'
						}
					/>
					<h4 className='mb-4 font-cardoRegular text-xl font-bold text-customBrown-100 md:text-2xl lg:hidden'>
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
								<p className='mb-2 font-cardinal text-2xl text-customBrown-100'>
									{new Date(event.event_date).toLocaleDateString('fr-FR', {
										month: 'long',
										year: 'numeric',
									})}
								</p>
								<h4 className='mb-4 hidden font-cardoRegular text-3xl font-bold text-customBrown-100 md:block'>
									{event.event_title}
								</h4>
								<div
									className='prose mb-4 hidden font-cardoRegular text-customBrown-100 lg:block'
									dangerouslySetInnerHTML={{ __html: event.summary }}
								/>
							</div>

							<div>
								<Link
									href={`/evenements/${event.event_slug}`}
									className='hidden rounded-md bg-customBrown-100 px-4 py-2 text-white transition-colors duration-300 hover:bg-customBrown-100/80 lg:inline-block'
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
						className='prose mb-4 font-cardoRegular text-customBrown-100 lg:hidden'
						dangerouslySetInnerHTML={{ __html: event.summary }}
					/>
					<Link
						href={`/evenements/${event.event_slug}`}
						className='inline-block rounded-md bg-customBrown-100 px-4 py-2 text-white transition-colors duration-300 hover:bg-customBrown-100/80 lg:hidden'
					>
						En savoir plus
					</Link>
				</motion.div>
			))}
		</div>
	)
}
