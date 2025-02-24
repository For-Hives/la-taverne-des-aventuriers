'use client'

import { EventData } from '@/app/actions/services/getEventData'
import { LandingPageData } from '@/app/actions/services/getLandingPageData.service'
import { cn } from '@/lib/utils'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

/**
 * Individual Event Card Component
 */
export const EventCard = ({
	className = '',
	event,
	index,
}: {
	event: EventData
	index: number
	className?: string
}) => {
	const ref = useRef<HTMLAnchorElement>(null)
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.2, duration: 0.6 }}
			className={cn(
				'group/card relative flex cursor-pointer flex-col justify-end overflow-hidden rounded-xl shadow-lg',
				className
			)}
			onClick={() => ref.current !== null && ref.current.click()}
		>
			{/* Background Image with Overlay */}
			<div
				className='absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-500 group-hover/card:scale-105'
				style={{
					backgroundImage: `url(${event.event_image})`,
				}}
			/>

			{/* Gradient Overlay */}
			<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 group-hover/card:opacity-80' />

			{/* Content */}
			<div className='relative z-10 flex flex-col p-6'>
				<div className='mb-2'>
					<span className='inline-block rounded-full bg-customBrown-100/70 px-3 py-1 font-obraletra text-xs text-customWhite-100 backdrop-blur-sm'>
						{new Date(event.event_date).toLocaleDateString('fr-FR', {
							day: 'numeric',
							month: 'long',
							year: 'numeric',
						})}
					</span>
				</div>

				<h2 className='mb-3 font-obraletra text-xl text-customWhite-100 group-hover/card:text-customWhite-200 md:text-2xl'>
					{event.event_title}
				</h2>

				<div
					className='mb-4 line-clamp-3 font-cardoRegular text-sm text-customWhite-100/90'
					dangerouslySetInnerHTML={{ __html: event.summary }}
				/>

				<Link
					ref={ref}
					href={`evenements/${event.event_slug}`}
					aria-label={event.button_aria || "En savoir plus sur l'événement"}
					className='group/link inline-flex items-center font-cardoRegular text-sm text-customWhite-100 underline'
				>
					<span>{event.button_label || 'En savoir plus'}</span>
					<FontAwesomeIcon
						icon={faChevronRight}
						className='ml-2 h-2.5 w-2.5 transition-transform duration-300 group-hover/link:translate-x-1'
					/>
				</Link>
			</div>
		</motion.div>
	)
}

interface BentoEventsGridProps {
	data: LandingPageData
	dataEvents: EventData[]
}

/**
 * Main Bento Events Grid Component
 */
export const BentoEventsGrid = ({ data, dataEvents }: BentoEventsGridProps) => {
	if (!dataEvents || dataEvents.length < 3) {
		// Fallback if there aren't enough events
		return (
			<div className='mx-auto w-full max-w-7xl px-4 py-8'>
				<h2 className='mb-6 font-cardinal text-3xl text-customBrown-100'>
					{data?.events_title || 'Nos événements'}
				</h2>
				<p>Nos prochains événements seront bientôt disponibles.</p>
			</div>
		)
	}

	// Sort events if needed
	const sortedEvents = [...dataEvents].slice(0, 3)

	return (
		<div className='mx-auto w-full max-w-7xl px-4 py-8'>
			<motion.h2
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='mb-6 font-cardinal text-3xl text-customBrown-100 lg:text-4xl'
			>
				{data.events_title}
			</motion.h2>

			{/* Bento Grid Layout with explicitly sized grid */}
			<div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-none md:gap-0 lg:min-h-[45rem]'>
				{/* Left Column - Featured Event (full height) */}
				<EventCard
					event={sortedEvents[0]}
					index={0}
					className='mr-2 min-h-[25rem] md:row-span-2 lg:min-h-[45rem]'
				/>

				{/* Right Column - Two Smaller Events in a grid */}
				<div className='grid h-full grid-cols-1 gap-2 md:min-h-[45rem]'>
					<EventCard
						event={sortedEvents[1]}
						index={1}
						className='min-h-[25rem] md:h-full'
					/>
					<EventCard
						event={sortedEvents[2]}
						index={2}
						className='min-h-[25rem] md:h-full'
					/>
				</div>
			</div>

			{/* Decorative Element */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8, duration: 0.6 }}
				className='absolute right-0 mr-4 flex w-full justify-end md:mr-24 lg:mr-[20vw]'
			>
				<Image
					src='/assets/images/elements/fairy.webp'
					alt='Decorative fairy'
					width={100}
					height={100}
					className='h-auto max-w-full max-sm:w-1/3'
				/>
			</motion.div>
		</div>
	)
}

export default BentoEventsGrid
