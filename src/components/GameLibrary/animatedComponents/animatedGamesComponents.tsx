'use client'

import { GamesPageData } from '@/app/actions/services/getGamePageData.service'
import { cn } from '@/lib/utils'
import { textToSpanColored } from '@/utils/textToSpanColored'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * Individual Game Card Component
 */
const GameCard = ({
	backgroundClass,
	backgroundImage,
	buttonAria,
	buttonLabel,
	buttonUrl,
	className = '',
	description,
	index,
	maxDescriptionLength = 600,
	title,
}: {
	title: string
	description: string
	buttonLabel: string
	buttonUrl: string
	buttonAria: string
	backgroundClass: string
	backgroundImage?: string
	index: number
	className?: string
	maxDescriptionLength?: number
}) => {
	const handleCardClick = (e: React.MouseEvent) => {
		// If the click is on the link or inside the link, do nothing
		// as the link will handle the click itself
		if ((e.target as HTMLElement).closest('a')) {
			return
		}

		// Otherwise, navigate to the URL without opening a new tab
		window.location.href = buttonUrl
	}

	// Fonction pour tronquer le texte HTML tout en préservant les balises
	const truncateHtml = (html: string, maxLength: number) => {
		if (html.replace(/<[^>]*>/g, '').length <= maxLength) return html

		let charCount = 0
		let result = ''
		let inTag = false

		for (const char of html) {
			if (char === '<') inTag = true
			if (!inTag) charCount++
			if (char === '>') inTag = false

			result += char

			if (charCount >= maxLength && !inTag) {
				return result + '...'
			}
		}

		return result
	}

	// Tronquer la description
	const truncatedDescription = truncateHtml(description, maxDescriptionLength)

	// Style dynamique pour l'image de fond
	const cardStyle = backgroundImage
		? { backgroundImage: `url(${backgroundImage})` }
		: {}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: index * 0.2, duration: 0.6 }}
			className={cn(
				'group/card relative flex cursor-pointer flex-col justify-end overflow-hidden rounded-xl shadow-lg',
				backgroundImage ? 'bg-cover bg-center' : backgroundClass,
				className
			)}
			onClick={handleCardClick}
			style={cardStyle}
		>
			{/* Gradient Overlay */}
			<div className='absolute inset-0 rounded-xl bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 group-hover/card:opacity-80' />

			{/* Content */}
			<div className='relative z-10 flex flex-col p-6 lg:p-10'>
				<h2 className='mb-3 font-obraletra text-xl text-customWhite-100 group-hover/card:text-customWhite-200 md:text-2xl'>
					{title}
				</h2>

				<div
					className='mb-4 font-cardoRegular text-sm text-customWhite-100/90'
					dangerouslySetInnerHTML={{ __html: truncatedDescription }}
				/>

				<Link
					href={buttonUrl}
					aria-label={buttonAria}
					className='group/link inline-flex items-center font-cardoRegular text-sm text-customWhite-100 underline'
					target='_blank'
					onClick={e => e.stopPropagation()} // Prevents the link click from triggering the card click
				>
					<span>{buttonLabel}</span>
					<FontAwesomeIcon
						icon={faChevronRight}
						className='ml-2 h-2.5 w-2.5 transition-transform duration-300 group-hover/link:translate-x-1'
					/>
				</Link>
			</div>
		</motion.div>
	)
}

/**
 * Main Animated Game Component
 */
export const AnimatedGameComponent = ({ data }: { data: GamesPageData }) => {
	return (
		<div className='mx-auto w-full max-w-7xl px-4'>
			<motion.h2
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='mb-6 font-cardinal text-3xl text-customBrown-100 first-letter:text-customRed-100 lg:text-4xl'
			>
				<span
					dangerouslySetInnerHTML={{
						__html: textToSpanColored(data.Card_Title),
					}}
				/>
			</motion.h2>

			{/* Bento Grid Layout */}
			<div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-none md:gap-0 lg:min-h-[45rem]'>
				{/* Left Column - Large Card */}
				<GameCard
					title={data.card1_title}
					description={data.card1_description}
					buttonLabel={data.card1_button_label}
					buttonUrl={data.card1_button_url}
					buttonAria={data.card1_button_aria}
					backgroundClass='bg-gl-card1-bg'
					backgroundImage={data.card1_image}
					index={0}
					className='mr-0 min-h-[25rem] md:row-span-2 md:mr-4 lg:min-h-[45rem]'
					maxDescriptionLength={600}
				/>

				{/* Right Column - Two Smaller Cards */}
				<div className='grid h-full grid-cols-1 gap-4 md:min-h-[45rem] md:gap-4'>
					<GameCard
						title={data.card2_title}
						description={data.card2_description}
						buttonLabel={data.card2_button_label}
						buttonUrl={data.card2_button_url}
						buttonAria={data.card2_button_aria}
						backgroundClass='bg-gl-card2-bg'
						backgroundImage={data.card2_image}
						index={1}
						className='min-h-[25rem] md:h-full'
						maxDescriptionLength={400}
					/>
					<GameCard
						title={data.card3_title}
						description={data.card3_description}
						buttonLabel={data.card3_button_label}
						buttonUrl={data.card3_button_url}
						buttonAria={data.card3_button_aria}
						backgroundClass='bg-gl-card3-bg'
						backgroundImage={data.card3_image}
						index={2}
						className='min-h-[25rem] md:h-full'
						maxDescriptionLength={400}
					/>
				</div>
			</div>
		</div>
	)
}

export default AnimatedGameComponent
