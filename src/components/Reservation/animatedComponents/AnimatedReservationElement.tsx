'use client'
import { motion } from 'framer-motion' // Importing framer-motion for animations
import Image from 'next/image' // Importing Image component for handling images

import type { WhoAreWePageData } from '@/app/actions/services/getWhoAreWePageData.service' // Importing data type for the page

// Layout configuration for each card
const CARDS_CONFIG = {
	// Card 1 - Top Left (Who we are)
	card1: {
		animation: {
			animate: { opacity: 1, y: 0 },
			initial: { opacity: 0, y: 50 },
			transition: { delay: 0.2, duration: 0.8 },
		},
		className:
			'col-span-1 row-span-1 flex items-center justify-start rounded-xl border border-custom-brown-100 bg-custom-white-300 lg:col-span-9 lg:row-span-1',
	},
	// Card 2 - Middle Right (The team)
	card2: {
		animation: {
			animate: { opacity: 1, x: 0 },
			initial: { opacity: 0, x: -50 },
			transition: { delay: 0.4, duration: 0.8 },
		},
		className:
			'relative col-span-1 row-span-1 flex flex-col items-start justify-start rounded-xl border border-custom-brown-100 bg-custom-white-300 lg:row-span-3 lg:col-span-3',
	},
	// Card 3 - Middle Left (Our history)
	card3: {
		animation: {
			animate: { opacity: 1, x: 0 },
			initial: { opacity: 0, x: 50 },
			transition: { delay: 0.6, duration: 0.8 },
		},
		className:
			'col-span-1 row-span-1 flex flex-col items-start justify-start rounded-xl border border-custom-brown-100 bg-custom-white-300 lg:col-span-3 lg:row-span-2',
	},
	// Card 4 - Bottom Left (Information)
	card4: {
		animation: {
			animate: { opacity: 1, y: 0 },
			initial: { opacity: 0, y: 50 },
			transition: { delay: 1, duration: 0.8 },
		},
		className:
			'col-span-1 row-span-1 flex items-start justify-start rounded-xl border border-custom-brown-100 bg-custom-white-300  lg:row-span-1 lg:col-span-3',
	},
	// Card 5 - Bottom Right (Our services)
	card5: {
		animation: {
			animate: { opacity: 1, y: 0 },
			initial: { opacity: 0, y: -50 },
			transition: { delay: 1.2, duration: 0.8 },
		},
		className:
			'col-span-1 row-span-1 flex items-start justify-start rounded-xl border border-custom-brown-100 bg-custom-white-300 lg:col-span-3 lg:row-span-1',
	},
	centralLogo: {
		animation: {
			animate: { opacity: 1 },
			initial: { opacity: 0 },
			transition: { delay: 0.8, duration: 0.8 },
		},
		className:
			'relative lg:flex items-center justify-center rounded-xl border border-custom-brown-100 bg-custom-white-300 hidden  lg:row-span-1 lg:col-span-6',
	},
}

// Component to render animated reservation elements with the provided data
export const AnimatedReservationElement = ({ data }: { data: WhoAreWePageData }) => {
	return (
		<div className="font-cardo-regular text-custom-brown-100 flex h-full w-11/12 items-center justify-center">
			{/* Grid layout for the content */}
			<div className="grid h-full w-full grid-cols-1 grid-rows-1 gap-4 max-md:grid-rows-1 lg:grid-cols-12">
				{/* Card 1 - Top Left (Who we are) */}
				<motion.div className={CARDS_CONFIG.card1.className} {...CARDS_CONFIG.card1.animation}>
					<div className="relative flex h-full w-full items-start justify-start overflow-hidden rounded-xl p-5 sm:p-8">
						{/* Image with Next.js Image component */}
						<div
							className={'absolute -right-0 -bottom-32 hidden h-full w-full lg:flex xl:-right-12 xl:bottom-12 xl:w-3/6'}
						>
							<div className="relative h-full w-full">
								<Image
									src={'/assets/images/qui-sommes-nous.webp'}
									alt="Bar à jeu médiéval fantastique à Nantes avec une ambiance chaleureuse"
									fill={true}
									objectFit={'cover'}
									objectPosition={'right'}
									className="absolute inset-4 z-0 scale-125"
									quality={80}
								/>
							</div>
						</div>

						{/* Gradient overlay for the background */}
						<div className="from-custom-white-300 via-custom-white-300 to-custom-white-300/0 xl:from-custom-white-300 xl:via-custom-white-300 xl:to-custom-white-300/20 absolute inset-0 z-0 bg-linear-to-b via-45% to-70% xl:bg-linear-to-r xl:via-50% xl:to-60%" />
						{/* Content */}
						<div className="relative z-10 flex w-full flex-col gap-4 xl:w-1/2">
							<h1 className="font-cardinal first-letter:text-custom-red-100 text-2xl tracking-wider sm:text-3xl">
								{data.who_are_we_title}
							</h1>
							<div
								className={'prose prose-customBrown'}
								dangerouslySetInnerHTML={{ __html: data.description_card_1 }}
							/>
						</div>
					</div>
				</motion.div>

				{/* Card 2 - Middle Right (The team) */}
				<motion.div className={CARDS_CONFIG.card2.className} {...CARDS_CONFIG.card2.animation}>
					<div className="relative flex h-full w-full items-start justify-start overflow-hidden rounded-xl">
						<div className="relative z-10 flex flex-col p-8">
							<h2 className="font-cardinal first-letter:text-custom-red-100 text-2xl sm:text-3xl">{data.team_title}</h2>
							<div
								className={'prose prose-customBrown'}
								dangerouslySetInnerHTML={{ __html: data.description_card_4 }}
							/>
						</div>

						{/* Image en bas à gauche pour l'équipe - visible uniquement sur desktop (xl) */}
						<div className="absolute -right-4 -bottom-8 z-20 hidden xl:block">
							<Image
								src="/assets/images/elfattention.webp"
								alt="Illustration Équipe"
								width={250}
								height={250}
								className="h-auto w-auto -rotate-12 opacity-25"
							/>
						</div>
					</div>
					<Image
						className="absolute right-full bottom-0 z-40 w-[170px] translate-x-20 translate-y-20 opacity-50 max-xl:hidden"
						src="/assets/images/elements/WhoAreWeElement/dice.webp"
						alt="Dice"
						width={250}
						height={250}
					/>
				</motion.div>

				{/* Card 3 - Middle Left (Our history) */}
				<motion.div className={CARDS_CONFIG.card3.className} {...CARDS_CONFIG.card3.animation}>
					<div className="relative flex h-full w-full items-start justify-start overflow-hidden rounded-xl">
						{/* Gradient overlay for the background */}
						<div className="from-custom-white-300 via-custom-white-300 to-custom-white-300/25 absolute inset-0 z-0 bg-linear-to-b via-70% max-lg:bg-linear-to-r" />

						<div className="relative z-10 flex flex-col gap-4 p-8">
							<h2 className="font-cardinal first-letter:text-custom-red-100 text-2xl sm:text-3xl">
								{data.our_history_title}
							</h2>
							<div
								className={'prose prose-customBrown'}
								dangerouslySetInnerHTML={{ __html: data.description_card_2 }}
							/>
						</div>

						{/* Image en bas à gauche pour notre histoire - visible uniquement sur desktop (xl) */}
						{/* inverted */}
						<div className="absolute -bottom-4 -left-4 z-20 hidden xl:block">
							<Image
								src="/assets/images/nainkraken.webp"
								alt="Illustration Histoire"
								width={300}
								height={300}
								className="scale-x-[-1] -rotate-12 opacity-25"
							/>
						</div>
					</div>
				</motion.div>

				{/* Central Logo */}
				<motion.div className={CARDS_CONFIG.centralLogo.className} {...CARDS_CONFIG.centralLogo.animation}>
					<Image src="/assets/images/LTDALogo.webp" alt="LTDA Logo" width={520} height={520} />

					<Image
						className="absolute right-0 bottom-0 w-[170px] translate-x-10 translate-y-24"
						src="/assets/images/elements/WhoAreWeElement/dice.webp"
						alt="Dice"
						width={520}
						height={520}
					/>
				</motion.div>

				{/* Card 5 - Bottom Right (Our services) */}
				<motion.div className={CARDS_CONFIG.card5.className} {...CARDS_CONFIG.card5.animation}>
					<div className="flex flex-col p-8">
						<h2 className="font-cardinal first-letter:text-custom-red-100 text-2xl sm:text-3xl">
							{data.our_services_title}
						</h2>
						<div className={'prose prose-customBrown'} dangerouslySetInnerHTML={{ __html: data.description_card_3 }} />
					</div>
				</motion.div>

				{/* Card 4 - Bottom Left (Information) */}
				<motion.div className={CARDS_CONFIG.card4.className} {...CARDS_CONFIG.card4.animation}>
					<div className="relative flex h-full w-full items-start justify-start overflow-hidden rounded-xl">
						{/* Content */}
						<div className="relative z-10 flex flex-col gap-4 p-8">
							<h2 className="font-cardinal first-letter:text-custom-red-100 text-2xl sm:text-3xl">
								{data.information_title}
							</h2>
							<div
								className={'prose prose-customBrown'}
								dangerouslySetInnerHTML={{ __html: data.description_card_5 }}
							/>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	)
}
