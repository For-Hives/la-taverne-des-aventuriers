import { getReservationData } from '@/app/actions/services/getReservationPageData.service'
import Image from 'next/image'

export default async function ReservationComponent() {
	// Fetch reservation data
	const data = await getReservationData()

	return (
		<div className='relative flex w-4/5 items-center justify-center px-2 max-sm:flex-col sm:px-8'>

			{/* Left side: Image */}
			<div className='mb-6 flex w-full justify-center sm:mb-0 sm:w-1/3'>
				<Image
					src='/assets/images/elements/ContactElements/maison.png'
					alt='House illustration'
					width={720}
					height={480}
					className='rounded w-2/3 max-sm:w-1/2'
				/>
			</div>

			{/* Right side: Reservation Information */}
			<div className='flex w-full flex-col items-start justify-center gap-9 text-customBrown-100 max-sm:w-full max-sm:items-center sm:w-2/3'>
				{/* How to Title */}
				<h2 className='font-cardinal text-2xl first-letter:text-customRed-100 sm:text-3xl'>
					{data.how_to_title}
				</h2>

				{/* Description content */}
				<div
					className='w-full font-cardo text-base sm:text-lg'
					dangerouslySetInnerHTML={{
						__html: data.description,
					}}
				/>

				<Image
					src='/assets/images/elements/bourse.png'
					alt='House illustration'
					width={50}
					height={50}
					className='absolute top-0 right-0 -translate-x-50 -translate-y-50 rounded w-1/12 max-md:hidden'
				/>
			</div>
		</div>
	)
}
