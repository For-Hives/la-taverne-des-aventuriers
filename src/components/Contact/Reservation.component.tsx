import { getReservationData } from '@/app/actions/services/getReservationPageData.service'
import Image from 'next/image'

export default async function ReservationComponent() {
	// Fetch reservation data
	const data = await getReservationData()

	return (
		<div className='flex w-3/4 items-center justify-center'>
			{/* Left side: Image */}
			<div className='flex w-1/3 items-center justify-center'>
				<Image
					src='/assets/images/elements/ContactElements/maison.png'
					alt='House illustration'
					width={1080}
					height={720}
				/>
			</div>
			{/* Right side: Reservation Information */}
			<div className='flex w-2/3 flex-col items-start justify-center gap-9 text-customBrown-100'>
				{/* How to Title */}
				<h2 className='font-cardinal text-2xl first-letter:text-customRed-100'>
					{data.how_to_title}
				</h2>
				{/* Description content */}
				<div
					className='w-full font-obraletra text-base'
					dangerouslySetInnerHTML={{
						__html: data.description,
					}}
				></div>
			</div>
		</div>
	)
}
