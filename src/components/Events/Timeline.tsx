// components/Events/Timeline.tsx
'use client'
import { useScroll, useTransform, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface TimelineEntry {
	id: string
	date: string
	title: string
	summary: string
	image?: string
	slug: string
	important: boolean
}

export const Timeline = ({ events }: { events: TimelineEntry[] }) => {
	const ref = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const [height, setHeight] = useState(0)

	useEffect(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect()
			setHeight(rect.height)
		}
	}, [ref])

	const { scrollYProgress } = useScroll({
		offset: ['start start', 'end end'],
		target: containerRef,
	})

	const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
	const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 0.4])

	return (
		<div className='relative w-full font-sans' ref={containerRef}>
			<div className='relative mx-auto max-w-7xl pb-20'>
				<div
					style={{
						height: height + 'px',
					}}
					className='absolute left-[18px] top-0 w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-customBrown-100/20 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] lg:left-[-12px]'
				>
					<motion.div
						style={{
							height: heightTransform,
							opacity: opacityTransform,
						}}
						className='absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-customBrown-100 via-customRed-100 to-transparent'
					/>
				</div>

				<div ref={ref}>
					{events.map((event, index) => (
						<div
							key={index}
							className='flex -translate-x-2 transform justify-start gap-10 pt-40 lg:-translate-x-10'
						>
							<div className='sticky top-40 z-40 flex flex-row items-center self-start'>
								<div className='absolute left-3 flex h-8 w-8 items-center justify-center rounded-full bg-customWhite-100 shadow-lg'>
									<div className='h-3 w-3 rounded-full bg-customBrown-100' />
								</div>
								<h3 className='hidden pl-20 font-cardinal text-4xl text-customBrown-100 md:block'>
									{new Date(event.date).toLocaleDateString('fr-FR', {
										month: 'long',
										year: 'numeric',
									})}
								</h3>
							</div>
							<div className='relative w-full max-w-5xl pl-4'>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1, duration: 0.5 }}
									viewport={{ once: true }}
									className='rounded-lg border border-customBrown-100/20 bg-white p-6 shadow-lg transition-all hover:border-customBrown-100/40'
								>
									<h4 className='mb-4 font-cardoRegular text-xl font-bold text-customBrown-100 md:text-2xl lg:hidden'>
										{event.title}
									</h4>

									{/* Desktop */}
									<div className={'flex gap-8'}>
										{event.image && (
											<div className='relative hidden h-auto min-h-96 w-full overflow-hidden rounded-lg lg:block'>
												<Image
													src={event.image}
													alt={event.title}
													fill
													className='object-cover transition-transform duration-300 hover:scale-105'
												/>
											</div>
										)}
										<div className={'flex flex-col justify-between'}>
											<div>
												<h4 className='mb-4 hidden font-cardoRegular text-3xl font-bold text-customBrown-100 md:block'>
													{event.title}
												</h4>
												<div
													className='prose mb-4 hidden font-cardoRegular text-customBrown-100 lg:block'
													dangerouslySetInnerHTML={{ __html: event.summary }}
												/>
											</div>

											<div>
												<Link
													href={`/evenements/${event.slug}`}
													className='hidden rounded-md bg-customBrown-100 px-4 py-2 text-white transition-colors duration-300 hover:bg-customBrown-100/80 lg:inline-block'
												>
													En savoir plus
												</Link>
											</div>
										</div>
									</div>

									{/*Mobile / tablet */}
									{event.image && (
										<div className='relative mb-4 h-72 w-full overflow-hidden rounded-lg md:h-96 lg:hidden'>
											<Image
												src={event.image}
												alt={event.title}
												fill
												className='object-cover transition-transform duration-300 hover:scale-105 lg:hidden'
											/>
										</div>
									)}

									<div
										className='prose mb-4 font-cardoRegular text-customBrown-100 lg:hidden'
										dangerouslySetInnerHTML={{ __html: event.summary }}
									/>
									<Link
										href={`/evenements/${event.slug}`}
										className='inline-block rounded-md bg-customBrown-100 px-4 py-2 text-white transition-colors duration-300 hover:bg-customBrown-100/80 lg:hidden'
									>
										En savoir plus
									</Link>
								</motion.div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
