import { getReservationCardData } from '@/app/actions/services/getReservationCardData.service'
import { textToSpanColored } from '@/utils/textToSpanColored'
import Image from 'next/image'
import Link from 'next/link'

export default async function ReservationCardComponent() {
	// Fetch data for the reservation card
	const data = await getReservationCardData()

	// Structure the data into a usable object
	const ReservationData = {
		buttonLabel: data.button_label,
		buttonUrl: data.button_url,
		description: textToSpanColored(data.description),
		gamesUrl: data.games_url,
		image: data.image,
		title: textToSpanColored(data.Title),
	}

	return (
		<div className='mx-auto flex w-full max-w-6xl flex-col items-center gap-8 rounded bg-cardBG-100 p-4 sm:flex-row sm:gap-20 sm:p-10'>
			{/* Text Section */}
			<div className='flex w-full flex-col gap-6 p-4 font-obraletra text-base text-title-200 sm:w-2/3 sm:gap-9 sm:p-8'>
				{/* Title */}
				<h1 className='text-left font-cardinal text-xl first-letter:text-title-100 sm:text-2xl'>
					{ReservationData.title}
				</h1>

				{/* Description (rendering HTML content) */}
				<div
					dangerouslySetInnerHTML={{
						__html: ReservationData.description,
					}}
				></div>

				{/* Link to the games URL */}
				<Link
					href={ReservationData.gamesUrl}
					className='text-xs text-title-200 hover:underline sm:text-base'
				>
					{ReservationData.gamesUrl}
				</Link>

				{/* Button Section */}
				<div>
					<button className='rounded bg-amber-100 p-2'>
						{/* Button Link */}
						<Link
							href={ReservationData.buttonLabel}
							className='text-xs text-title-200 hover:underline sm:text-base'
						>
							{ReservationData.buttonLabel}
						</Link>
					</button>
				</div>
			</div>

			{/* Image Section */}
			<div className='flex w-full items-center justify-center sm:w-1/3'>
				{/* Reservation Image */}
				<Image
					src='/assets/images/elements/ReservationCardIllustration.png'
					alt='LTDA Logo'
					width={300}
					height={200}
					className='h-auto max-w-full'
				/>
			</div>
		</div>
	)
}
