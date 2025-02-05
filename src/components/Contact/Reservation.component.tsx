import { getReservationData } from '@/app/actions/services/getReservationPageData.service'
import Image from 'next/image'

export default async function ReservationComponent() {
	// Fetch reservation data
	const data = await getReservationData()

	return (


		<div className="relative flex h-full w-full items-center justify-center overflow-hidden ">
			<div className="grid h-full w-full grid-cols-3 grid-rows-3 ">

				<div
					className="col-span-3 row-span-1  md:col-span-1 md:row-span-2 flex items-center justify-center md:justify-end"
				>
						<Image
							src="/assets/images/elements/ContactElements/maison.png"
							alt="House illustration"
							width={720}
							height={480}
							className="rounded w-3/4 max-md:w-1/2"
						/>
				</div>

				<div
					className="col-span-3 row-span-1 px-6 md:col-span-2 md:row-span-2 flex items-center justify-center"
				>
					<div
						className='flex w-full flex-col items-start justify-center gap-9 text-customBrown-100 max-md:w-full max-md:items-center md:w-2/3'>
						{/* How to Title */}
						<h2 className='font-cardinal text-3xl first-letter:text-customRed-100 md:text-4xl'>
							{data.how_to_title}
						</h2>

						{/* Description content */}
						<div
							className='w-full *:font-cardoRegular text-base md:text-lg'
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

			</div>
		</div>

)
}
