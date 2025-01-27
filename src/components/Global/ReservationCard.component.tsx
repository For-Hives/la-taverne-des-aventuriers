import { getReservationCardData } from '@/app/actions/getDatasService'
import { textToSpanColored } from '@/utils/textToSpanColored'
import Image from 'next/image'
import Link from 'next/link'

export default async function ReservationCardComponent() {
	const data = await getReservationCardData()
	/**
	 * Formats reservation card data into a structured object
	 * @param {ReservationCardData} data - The raw reservation card data
	 * @returns {ReservationData} Formatted reservation card object
	 */
	const ReservationData = {
		buttonLabel: data.button_label,
		buttonUrl: data.button_url,
		description: textToSpanColored(data.description),
		gamesUrl: data.games_url,
		image: data.image,
		title: textToSpanColored(data.Title),
	}

	return (
		<div className='mx-auto flex w-3/4 items-center gap-20 rounded bg-cardBG-100 p-10 py-5'>
			<div className='items-left flex w-2/3 flex-col gap-9 p-8 font-obraletra text-base text-title-200'>
				<h1 className='text-left font-cardinal text-2xl first-letter:text-title-100'>
					{ReservationData.title}
				</h1>

				<div
					dangerouslySetInnerHTML={{
						__html: ReservationData.description,
					}}
				></div>

				<Link
					href={ReservationData.gamesUrl}
					className='text-title-200 hover:underline'
				>
					{ReservationData.gamesUrl}
				</Link>
				<div>
					<button className='rounded bg-amber-100 p-2'>
						<Link
							href={ReservationData.buttonLabel}
							className='text-title-200 hover:underline'
						>
							{ReservationData.buttonLabel}
						</Link>
					</button>
				</div>
			</div>

			<div className='flex w-1/3 items-center justify-center'>
				<Image
					src='/assets/images/elements/ReservationCardIllustration.png'
					alt='LTDA Logo'
					width={300}
					height={200}
				/>
			</div>
		</div>
	)
}
