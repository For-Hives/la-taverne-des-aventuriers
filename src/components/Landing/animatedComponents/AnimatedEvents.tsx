'use client'

import { EventData } from '@/app/actions/services/getEventData'
import { LandingPageData } from '@/app/actions/services/getLandingPageData.service'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface AnimationProps {
	initial: {
		opacity: number
		x?: number
		y?: number
	}
	animate: {
		opacity: number
		x?: number
		y?: number
	}
	transition: {
		duration: number
	}
}

interface EventCardProps {
	event: EventData
	animationProps: AnimationProps
	className?: string
}

// Animation configurations
const cardAnimations: Record<string, AnimationProps> = {
	firstCard: {
		animate: { opacity: 1, x: 0 },
		initial: { opacity: 0, x: -100 },
		transition: { duration: 0.6 },
	},
	secondCard: {
		animate: { opacity: 1, x: 0 },
		initial: { opacity: 0, x: 100 },
		transition: { duration: 0.6 },
	},
	thirdCard: {
		animate: { opacity: 1, y: 0 },
		initial: { opacity: 0, y: 50 },
		transition: { duration: 0.6 },
	},
}

/**
 * Individual Event Card Component
 */
const EventCard: React.FC<EventCardProps> = ({
	animationProps,
	className = '',
	event,
}) => {
	return (
		<motion.div
			className={`relative flex flex-col flex-wrap items-start justify-end gap-2 rounded-lg bg-cover bg-center font-cardoRegular px-4 min-h-[50vh] text-customWhite-100 ${className}`}
			{...animationProps}
		>
			{/* Background Image */}
			<div
				className='absolute inset-0 rounded-lg'
				style={{
					backgroundImage: `url(${event.event_image})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
				}}
			/>

			{/* Gradient Overlay */}
			<div className='absolute inset-0 rounded-lg bg-gradient-to-b from-black/10 via-black/65 to-black' />

			{/* Content */}
			<div className='z-10 flex flex-col w-full justify-start gap-9 p-12 max-md:bg-black/50 rounded'>
				<div className='items-left flex flex-col justify-start'>
					<h2 className='font-obraletraBold text-2xl'>{event.event_title}</h2>
					<h3 className='font-obraletra text-base max-lg:text-sm'>
						{new Date(event.event_date).toLocaleDateString('fr-FR')}
					</h3>
				</div>

				<div
					className='text-base max-sm:text-base'
					dangerouslySetInnerHTML={{ __html: event.summary }}
				/>

				<Link
					href={`evenements/${event.event_slug}` || '#'}
					aria-label={event.button_aria}
					className='flex items-center gap-3 text-base underline max-lg:text-base'
				>
					<span>{event.button_label || 'Learn more'}</span>
					<FontAwesomeIcon
						icon={faChevronRight}
						className='h-3 w-3 text-base text-customWhite-100 max-lg:text-xs max-sm:h-3 max-sm:w-3'
					/>
				</Link>
			</div>
		</motion.div>
	)
}

interface AnimatedEventsProps {
	data: LandingPageData
	dataEvents: EventData[]
}

/**
 * Main Animated Events Component
 */
export const AnimatedEvents: React.FC<AnimatedEventsProps> = ({
	data,
	dataEvents,
}) => {
	return (
		<div className='rounded-lg-lg flex h-screen min-h-fit w-3/4 max-lg:w-full max-lg:px-4 flex-col items-start gap-9'>
			{/* Title */}
			<motion.h1
				className='font-obraletraBold text-4xl text-customBrown-100 max-sm:text-xl'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				{data.events_title}
			</motion.h1>

			{/* Cards Layout */}
			<div className='flex h-full w-full items-center gap-2 max-lg:flex-col'>
				{/* First Card (Full Height) */}
				<div className='h-full w-1/2 max-lg:w-full max-lg:min-h-[70vh]'>
					{dataEvents[0] && (
						<EventCard
							event={dataEvents[0]}
							animationProps={cardAnimations.firstCard}
							className='h-full w-full'
						/>
					)}
				</div>

				{/* Column with Two Cards */}
				<div className='flex h-full w-1/2 flex-col gap-2 text-customWhite-100 max-lg:w-full'>
					{dataEvents[1] && (
						<EventCard
							event={dataEvents[1]}
							animationProps={cardAnimations.secondCard}
							className='h-1/2 w-full max-lg:min-h-[70vh]'
						/>
					)}

					{dataEvents[2] && (
						<EventCard
							event={dataEvents[2]}
							animationProps={cardAnimations.thirdCard}
							className='h-1/2 w-full max-lg:min-h-[70vh]'
						/>
					)}
				</div>
			</div>

			{/* Decorative Image */}
			<div className='flex w-full items-end justify-end gap-2'>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8, duration: 0.6 }}
				>
					<Image
						src='/assets/images/elements/fairy.png'
						alt='Decorative fairy'
						width={100}
						height={100}
						className='h-auto max-w-full max-sm:w-1/2'
					/>
				</motion.div>
			</div>
		</div>
	)
}
