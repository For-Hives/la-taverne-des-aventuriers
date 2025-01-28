import { getLandingData } from '@/app/actions/services/getLandingPageData.service'
import { textToSpanColored } from '@/utils/textToSpanColored'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

export default async function WhoAreWeSection() {
	const data = await getLandingData()

	const Element = {
		description_button_label: data.description_button_label,
		description_button_url: data.description_button_url,
		description_image: data.description_image,
		description_text: textToSpanColored(data.description_text),
		description_title: textToSpanColored(data.description_title),
	}

	return (
		<div className='flex w-3/4 flex-col items-center justify-center gap-8 rounded lg:flex-row'>
			<div className='flex w-full items-center justify-center lg:w-1/3'>
				{/* Image */}
				<Image
					src='/assets/images/elements/ImageLPReservations.png'
					alt='Vinbieres'
					width={300}
					height={300}
					className='h-auto max-w-full max-sm:w-1/2'
				/>
			</div>

			{/* Text */}
			<div className='text-customBrown-100 flex w-full flex-col items-center justify-center gap-6 p-4 font-obraletra text-base max-lg:text-xs lg:w-2/3 lg:items-start'>
				{/* Title */}
				<h2 className='text-center lg:text-left'>
					{Element.description_title}
				</h2>

				{/* Description */}
				<div
					className='w-full text-center text-base max-lg:text-xs lg:text-left'
					dangerouslySetInnerHTML={{
						__html: Element.description_text,
					}}
				></div>

				{/* Link */}
				<div className='text-center lg:text-left'>
					<Link
						href={Element.description_button_url}
						className='flex items-center justify-center gap-3 text-base underline max-lg:text-xs lg:justify-start'
					>
						<span>{Element.description_button_label}</span>
						<FontAwesomeIcon
							icon={faChevronRight}
							className='text-customBrown-100 h-4 w-4'
						/>
					</Link>
				</div>
			</div>
		</div>
	)
}
