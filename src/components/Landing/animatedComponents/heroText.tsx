'use client'

// Importing necessary components and utilities
import { LandingPageData } from '@/app/actions/services/getLandingPageData.service'
import { textToSpanColored } from '@/utils/textToSpanColored'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import Link from 'next/link'

// HeroTextAnimated component that takes data as a prop
export const HeroTextAnimated = ({ data }: { data: LandingPageData }) => {
	return (
		// Main wrapper div with motion for fade-in effect and vertical movement
		<motion.div
			className='bottom-0 left-0 z-40 flex flex-col items-start gap-6 p-6 sm:p-12 md:p-16 lg:p-52'
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			// Reduced animation delay from 3s to 1s
			transition={{ delay: 1, duration: 0.8 }}
		>
			<h1 className='sr-only'>
				{/* SEO H1 heading - visually hidden but present for search engines */}
				{/* replace all the special characters with a space */}
				{data.hero_title.replace(/[^a-zA-Z0-9\s]/g, ' ')}
			</h1>
			{/* Hero Title with fade-in animation */}
			<motion.div
				className='text-with-outline flex w-full flex-col gap-2 font-cardinal text-4xl font-bold text-customBrown-100 first-letter:text-customRed-100 sm:w-2/3 sm:text-5xl md:text-6xl lg:text-8xl'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				// Adjusted delay to be relative to parent (1s + 0.3s)
				transition={{ delay: 0.3, duration: 0.8 }}
			>
				{/* Title text with color applied */}
				<span
					dangerouslySetInnerHTML={{
						__html: textToSpanColored(data.hero_title),
					}}
				/>
			</motion.div>

			{/* Description with fade-in animation */}
			<motion.div
				className='flex flex-col items-start gap-6 sm:gap-8 md:gap-10'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				// Adjusted delay to be relative to parent (1s + 0.5s)
				transition={{ delay: 0.5, duration: 0.8 }}
			>
				{/* Description text with color applied */}
				<p className='text-with-outline-light flex items-center gap-2 font-obraletra text-lg font-bold text-customBrown-100 sm:gap-3 sm:text-xl md:text-2xl'>
					<span
						dangerouslySetInnerHTML={{
							__html: textToSpanColored(data.hero_description),
						}}
					/>
				</p>

				{/* Button section */}
				<div className='flex flex-wrap items-start gap-4 sm:gap-6'>
					{/* Button 1 with hover effect */}
					<Link
						href={data.hero_left_button_url}
						aria-label={data.hero_left_button_aria}
						className='text flex h-12 items-center gap-2 rounded border-3 border-customBrown-100 bg-customBrown-100 px-4 font-obraletra text-customWhite-100 hover:underline sm:text-xl'
					>
						{data.hero_left_button_label}
						<FontAwesomeIcon
							icon={faChevronRight}
							className='h-4 w-4 text-customWhite-100'
						/>
					</Link>

					{/* Button 2 with animated slide-in effect */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						// Adjusted delay to be relative to parent (1s + 0.7s)
						transition={{ delay: 0.7, duration: 0.8 }}
					>
						<Link
							href={data.hero_right_button_url}
							aria-label={data.hero_right_button_aria}
							className='text flex h-12 items-center rounded border-3 border-solid border-customBrown-100 bg-customWhite-100 px-4 font-obraletra text-customBrown-100 hover:underline sm:text-xl'
						>
							{data.hero_right_button_label}
						</Link>
					</motion.div>
				</div>
			</motion.div>
		</motion.div>
	)
}
