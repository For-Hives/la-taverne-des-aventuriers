'use client'
import { useScroll, useTransform, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

interface TimelineEvent {
	date: string
	id: string
	image?: string
	important: boolean
	slug: string
	summary: string
	title: string
}

interface TimelineProps {
	events: TimelineEvent[]
}

export const Timeline = ({ events }: TimelineProps) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const ref = useRef<HTMLDivElement>(null)
	const [height, setHeight] = useState(0)

	useEffect(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect()
			setHeight(rect.height)
		}
	}, [ref])

	const { scrollYProgress } = useScroll({
		offset: ['start 10%', 'end 50%'],
		target: containerRef,
	})

	const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
	const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

	if (!events || events.length === 0) {
		return <div>No events to display</div>
	}

	// Sort events by date in descending order
	const sortedEvents = [...events].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	)

	return (
		<div className='w-full bg-customWhite-200 font-sans' ref={containerRef}>
			<div ref={ref} className='relative mx-auto max-w-7xl pb-20'>
				{sortedEvents.map((event, index) => (
					<div
						key={event.id}
						className='flex justify-start pt-10 md:gap-10 md:pt-40'
					>
						<div className='sticky top-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm'>
							{/* Timeline dot */}
							<div className='absolute left-2 flex h-10 w-10 items-center justify-center md:left-3'>
								<div className='h-3 w-3 rounded-full border border-customBrown-100 bg-customWhite-300 md:h-4 md:w-4' />
							</div>

							{/* Date */}
							<h3 className='hidden pl-20 font-cardinal text-xl text-customBrown-100 md:block md:text-5xl'>
								{new Date(event.date).toLocaleDateString('fr-FR', {
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})}
							</h3>
						</div>

						<div className='relative w-full pl-12 pr-4 md:pl-4'>
							{/* Mobile date */}
							<h3 className='mb-4 block text-left font-cardinal text-base text-customBrown-100 md:hidden'>
								{new Date(event.date).toLocaleDateString('fr-FR', {
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})}
							</h3>

							{/* Event content */}
							<div className='rounded-lg border border-customBrown-100 bg-customWhite-300 p-6'>
								<div className='flex flex-col gap-4'>
									<h4 className='font-cardinal text-xl text-customBrown-100 first-letter:text-customRed-100'>
										{event.title}
									</h4>
									{event.image && (
										<div className='relative h-48 w-full overflow-hidden rounded-lg'>
											<Image
												src={event.image}
												alt={event.title}
												fill
												className='object-cover'
											/>
										</div>
									)}
									<div
										className='font-cardoRegular text-customBrown-100'
										dangerouslySetInnerHTML={{ __html: event.summary }}
									/>
									<Link
										href={`/evenements/${event.slug}`}
										className='mt-2 text-customBlue-100 hover:underline'
									>
										Lire la suite
									</Link>
								</div>
							</div>
						</div>
					</div>
				))}

				{/* Timeline line */}
				<div
					style={{ height: height + 'px' }}
					className='absolute left-4 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-customBrown-100 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8'
				>
					<motion.div
						style={{
							height: heightTransform,
							opacity: opacityTransform,
						}}
						className='absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-customRed-100 from-[0%] via-customBrown-100 via-[10%] to-transparent'
					/>
				</div>
			</div>
		</div>
	)
}

export default Timeline
