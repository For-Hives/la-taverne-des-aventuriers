import { getLandingData } from '@/app/actions/GetLandingService'
import { textToSpanColored } from '@/utils/textToSpanColored'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

// eslint-disable-next-line @next/next/no-async-client-component
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
		<div className='bottom-0 left-0 flex flex-col items-start gap-10 p-52'>
			{/*Hero Title*/}
			<h1 className='flex w-2/3 flex-col gap-2 font-cardinal text-8xl font-bold text-title-300'>
				<span dangerouslySetInnerHTML={{ __html: heroData.heroTitle }} />
			</h1>

			<div className='flex flex-col items-start gap-9'>
				{/*Description*/}
				<p className='flex items-center gap-1 font-obraletra text-2xl text-title-200'>
					<span
						dangerouslySetInnerHTML={{ __html: heroData.heroDescription }}
					/>
				</p>

				{/*Button div*/}
				<div className='flex flex-wrap items-start gap-6'>
					{/*Button 1*/}
					<Link
						href={heroData.heroLeftButtonUrl}
						className='flex h-10 items-center gap-4 rounded bg-title-200 p-2 font-obraletra text-xl text-title-300 hover:underline'
					>
						{heroData.heroLeftButtonLabel}
						<FontAwesomeIcon
							icon={faChevronRight}
							className='h-4 w-4 text-title-300'
						/>
					</Link>

					{/*Button 2*/}
					<Link
						href={heroData.heroRightButtonUrl}
						className='h-10 rounded border-3 border-solid border-title-200 p-1 font-obraletra text-xl text-title-200 hover:underline'
					>
						{heroData.heroRightButtonLabel}
					</Link>
				</div>
			</div>
		</div>
	)
}
