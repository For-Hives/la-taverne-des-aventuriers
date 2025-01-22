import { getLandingData } from '@/app/actions/GetLandingService'
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
		<div className='flex w-3/4 items-center justify-center gap-16 rounded'>
			<div className='flex w-1/3 items-center justify-center'>
				{/*Image*/}
				<Image
					src='/assets/images/elements/ImageLPReservations.png'
					alt='Vinbieres'
					width={300}
					height={300}
				/>
			</div>

			{/*Text*/}
			<div className='flex w-2/3 flex-col items-start justify-center gap-9 p-4 font-obraletra text-title-200'>
				{/*title*/}
				<h2>{Element.description_title}</h2>

				{/*Description*/}
				<div
					className='w-full'
					dangerouslySetInnerHTML={{
						__html: Element.description_text,
					}}
				></div>

				{/* Link */}
				<div>
					<Link
						href={Element.description_button_url}
						className='flex items-center gap-3 underline'
					>
						<span>{Element.description_button_label}</span>
						<FontAwesomeIcon
							icon={faChevronRight}
							className='h-4 w-4 text-title-200'
						/>
					</Link>
				</div>
			</div>
		</div>
	)
}
