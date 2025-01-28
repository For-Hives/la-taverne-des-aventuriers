import { getLandingData } from '@/app/actions/getDatasService'
import { textToSpanColored } from '@/utils/textToSpanColored'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default async function HeroTextComponent() {
	const data = await getLandingData()
	const heroData = {
		heroDescription: textToSpanColored(data.hero_description),
		heroLeftButtonLabel: data.hero_left_button_label,
		heroLeftButtonUrl: data.hero_left_button_url,
		heroRightButtonLabel: data.hero_right_button_label,
		heroRightButtonUrl: data.hero_right_button_url,
		heroTitle: textToSpanColored(data.hero_title),
	}

	return (
		<div className='bottom-0 left-0 flex flex-col items-start gap-6 p-6 sm:p-12 md:p-16 lg:p-52'>
			{/* Hero Title */}
			<h1 className='flex w-full flex-col gap-2 font-cardinal text-4xl font-bold text-title-200 sm:w-2/3 sm:text-5xl md:text-6xl lg:text-8xl'>
				<span dangerouslySetInnerHTML={{ __html: heroData.heroTitle }} />
			</h1>

			<div className='flex flex-col items-start gap-6 sm:gap-8 md:gap-10'>
				{/* Description */}
				<p className='flex items-center gap-2 font-obraletra text-lg text-title-200 sm:gap-3 sm:text-xl md:text-2xl'>
					<span
						dangerouslySetInnerHTML={{ __html: heroData.heroDescription }}
					/>
				</p>

				{/* Button div */}
				<div className='flex flex-wrap items-start gap-4 sm:gap-6'>
					{/* Button 1 */}
					<Link
						href={heroData.heroLeftButtonUrl}
						className='flex h-10 items-center gap-4 rounded bg-title-200 p-2 font-obraletra text-lg text-title-300 hover:underline sm:text-xl'
					>
						{heroData.heroLeftButtonLabel}
						<FontAwesomeIcon
							icon={faChevronRight}
							className='h-4 w-4 text-title-300'
						/>
					</Link>

					{/* Button 2 */}
					<Link
						href={heroData.heroRightButtonUrl}
						className='h-10 rounded border-3 border-solid border-title-200 p-1 font-obraletra text-lg text-title-200 hover:underline sm:text-xl'
					>
						{heroData.heroRightButtonLabel}
					</Link>
				</div>
			</div>
		</div>
	)
}
