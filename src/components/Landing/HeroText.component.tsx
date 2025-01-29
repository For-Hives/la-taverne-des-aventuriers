import { LandingPageData } from '@/app/actions/services/getLandingPageData.service'
import { textToSpanColored } from '@/utils/textToSpanColored'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default async function HeroTextComponent({
	data,
}: Readonly<{
	data: LandingPageData
}>) {
	return (
		<div className='bottom-0 left-0 flex flex-col items-start gap-6 p-6 sm:p-12 md:p-16 lg:p-52'>
			{/* Hero Title */}
			<h1 className='flex w-full flex-col gap-2 font-cardinal text-4xl font-bold text-customBrown-100 first-letter:text-customRed-100 sm:w-2/3 sm:text-5xl md:text-6xl lg:text-8xl'>
				<span
					dangerouslySetInnerHTML={{
						__html: textToSpanColored(data.hero_title),
					}}
				/>
			</h1>

			<div className='flex flex-col items-start gap-6 sm:gap-8 md:gap-10'>
				{/* Description */}
				<p className='flex items-center gap-2 font-obraletra text-lg text-customBrown-100 sm:gap-3 sm:text-xl md:text-2xl'>
					<span
						dangerouslySetInnerHTML={{
							__html: textToSpanColored(data.hero_description),
						}}
					/>
				</p>

				{/* Button div */}
				<div className='flex flex-wrap items-start gap-4 sm:gap-6'>
					{/* Button 1 */}
					<Link
						href={data.hero_left_button_url}
						className='flex h-10 items-center gap-4 rounded bg-customBrown-100 p-2 font-obraletra text-lg text-customWhite-100 hover:underline sm:text-xl'
					>
						{data.hero_left_button_label}
						<FontAwesomeIcon
							icon={faChevronRight}
							className='h-4 w-4 text-customWhite-100'
						/>
					</Link>

					{/* Button 2 */}
					<Link
						href={data.hero_right_button_url}
						className='h-10 rounded border-3 border-solid border-customBrown-100 p-1 font-obraletra text-lg text-customBrown-100 hover:underline sm:text-xl'
					>
						{data.hero_right_button_label}
					</Link>
				</div>
			</div>
		</div>
	)
}
