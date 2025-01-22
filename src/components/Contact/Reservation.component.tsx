import { getReservationData } from '@/app/actions/getReservationService'
import Image from 'next/image'

export default async function ReservationComponent() {
	const data = await getReservationData()

	const ReservationData = {
		description: data.description,
		how_to_title: data.how_to_title,
	}

	return (
		<div className='flex w-3/4 items-center justify-center'>
			<div className='flex w-1/3 items-center justify-center'>
				<Image
					src='/assets/images/elements/ContactElements/maison.png'
					alt='LTDA Logo'
					width={1080}
					height={720}
				/>
			</div>
			<div className='flex w-2/3 flex-col items-start justify-center gap-9 text-title-200'>
				<h2 className='font-cardinal text-2xl first-letter:text-title-100'>
					{ReservationData.how_to_title}
				</h2>
				<div
					className='w-full font-obraletra text-base'
					dangerouslySetInnerHTML={{
						__html: ReservationData.description,
					}}
				></div>
			</div>
		</div>
	)
}
