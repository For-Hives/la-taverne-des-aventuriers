// components/Events/Timeline.tsx
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
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
		<div className="relative w-full font-sans" ref={containerRef}>
			<div className="relative mx-auto max-w-7xl pb-20">
				<div
					style={{
						height: height + 'px',
					}}
					className="via-custom-brown-100/20 absolute top-0 left-[18px] w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% to-transparent to-99% mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] lg:left-[-12px]"
				>
					<motion.div
						style={{
							height: heightTransform,
							opacity: opacityTransform,
						}}
						className="from-custom-brown-100 via-custom-red-100 absolute inset-x-0 top-0 w-[2px] rounded-full bg-linear-to-t to-transparent"
					/>
				</div>

				<div ref={ref}>
					{events.map((event, index) => (
						<div key={index} className="flex -translate-x-2 transform justify-start gap-10 pt-40 lg:-translate-x-10">
							<div className="sticky top-40 z-40 flex flex-row items-center self-start">
								<div className="bg-custom-white-100 absolute left-3 flex h-8 w-8 items-center justify-center rounded-full shadow-lg">
									<div className="bg-custom-brown-100 h-3 w-3 rounded-full" />
								</div>
								<h3 className="font-cardinal text-custom-brown-100 hidden pl-20 text-4xl md:block">
									{new Date(event.date).toLocaleDateString('fr-FR', {
										day: 'numeric',
										month: 'long',
										year: 'numeric',
									})}
								</h3>
							</div>
							<div className="relative w-full max-w-5xl pl-4">
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1, duration: 0.5 }}
									viewport={{ once: true }}
									className="border-custom-brown-100/20 hover:border-custom-brown-100/40 rounded-lg border bg-white p-6 shadow-lg transition-all"
								>
									<h4 className="font-cardo-regular text-custom-brown-100 mb-4 text-xl font-bold md:text-2xl lg:hidden">
										{event.title}
									</h4>

									{/* Mobile date display - only visible on mobile */}
									<div className="mb-3 flex items-center lg:hidden">
										<span className="bg-custom-brown-100/10 text-custom-brown-100 inline-block rounded-full px-3 py-1 text-sm font-medium">
											{new Date(event.date).toLocaleDateString('fr-FR', {
												day: 'numeric',
												month: 'long',
												year: 'numeric',
											})}
										</span>
									</div>

									{/* Desktop */}
									<div className={'flex gap-8'}>
										{event.image && (
											<div className="relative hidden h-auto min-h-96 w-full overflow-hidden rounded-lg lg:block">
												<Image
													src={event.image}
													alt={event.title}
													fill
													className="object-cover transition-transform duration-300 hover:scale-105"
												/>
											</div>
										)}
										<div className={'flex flex-col justify-between'}>
											<div>
												<h4 className="font-cardo-regular text-custom-brown-100 mb-4 hidden text-3xl font-bold md:block">
													{event.title}
												</h4>
												<div
													className="prose font-cardo-regular text-custom-brown-100 mb-4 hidden lg:block"
													dangerouslySetInnerHTML={{ __html: event.summary }}
												/>
											</div>

											<div>
												<Link
													href={`/evenements/${event.slug}`}
													className="bg-custom-brown-100 hover:bg-custom-brown-100/80 hidden rounded-md px-4 py-2 text-white transition-colors duration-300 lg:inline-block"
												>
													En savoir plus
												</Link>
											</div>
										</div>
									</div>

									{/*Mobile / tablet */}
									{event.image && (
										<div className="relative mb-4 h-72 w-full overflow-hidden rounded-lg md:h-96 lg:hidden">
											<Image
												src={event.image}
												alt={event.title}
												fill
												className="object-cover transition-transform duration-300 hover:scale-105 lg:hidden"
											/>
										</div>
									)}

									<div
										className="prose font-cardo-regular text-custom-brown-100 mb-4 lg:hidden"
										dangerouslySetInnerHTML={{ __html: event.summary }}
									/>
									<Link
										href={`/evenements/${event.slug}`}
										className="bg-custom-brown-100 hover:bg-custom-brown-100/80 inline-block rounded-md px-4 py-2 text-white transition-colors duration-300 lg:hidden"
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
