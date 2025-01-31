import { getReservationCardData } from '@/app/actions/services/getReservationCardData.service'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'



export default async function ReservationCardComponent() {
	const data = await getReservationCardData()

	return (
		<div className='mx-auto border-3 border-customBrown-100 flex w-3/4 flex-col items-center gap-8 rounded bg-customWhite-300 p-4 sm:flex-row sm:gap-20 sm:p-10'>
			{/* Text Section */}
			<div className='flex w-full flex-col gap-6 p-4 font-cardoRegular text-sm text-customBrown-100 sm:w-2/3 sm:gap-9 sm:p-8'>
				{/* Title */}
				<h2 className='text-left font-cardinal text-xl first-letter:text-customRed-100 sm:text-2xl'>
					{data.Title}
				</h2>

				{/* Description (rendering HTML content) */}
				<div
					dangerouslySetInnerHTML={{
						__html: data.description,
					}}
				/>

				{/* Button Section */}
				<div className='flex gap-6  max-sm:flex-col'>

					<Link
						href={data.button_url}
						className='flex h-12 items-center gap-2 rounded border-3 border-customBrown-100 bg-customBrown-100 px-4 font-obraletra text-xs text-customWhite-100 hover:underline sm:text-sm'
					>
						{data.button_label}
						<FontAwesomeIcon
							icon={faChevronRight}
							className='h-4 w-4 text-customWhite-100'
						/>
					</Link>

					{/* Button 2 */}
					<Link
						href={data.games_url}
						target='_blank'
						className='flex h-12 items-center rounded border-3 border-solid border-customBrown-100 px-4 font-obraletra text-xs text-customBrown-100 hover:underline sm:text-sm'
					>
						{data.button_myludo_label}
					</Link>

				</div>
			</div>

			{/* Image Section */}
			<div className='flex w-full items-center justify-center sm:w-1/3'>
				{/* Reservation Image */}
				<Image
					src='/assets/images/elements/ReservationCardIllustration.png'
					alt='Reservation Card Illustration'
					width={300}
					height={200}
					className='h-auto max-w-full'
				/>
			</div>
		</div>
	)
}
