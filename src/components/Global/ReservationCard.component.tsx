'use client'
import { getReservationCardData } from '@/app/actions/GetReservationCardService'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const ReservationCardComponent = () => {
	const [ReservationData, setReservationData] = useState({
		buttonLabel: '',
		buttonUrl: '',
		description: '',
		gamesUrl: '',
		image: '',
		title: '',
	})
	const [error] = useState(null)

	useEffect(() => {
		async function fetchReservationData() {
			try {
				const data = await getReservationCardData()
				const ReservationData = data[0]

				setReservationData({
					buttonLabel: ReservationData.button_label || 'Boutton Indisponible',
					buttonUrl: ReservationData.button_url,
					description:
						ReservationData?.description || 'Description Indisponible',
					gamesUrl: ReservationData?.games_url,
					image: ReservationData?.image,
					title: ReservationData?.Title || 'Titre Indisponible',
				})
			} catch (err) {
				console.error('Erreur lors de la récupération des données :', err)
			}
		}
		fetchReservationData()
	}, [])

	if (error) {
		return <div className='text-red-500'>{error}</div>
	}

	return (
		<div className='mx-auto flex w-3/4 items-center gap-20 rounded bg-cardBG-100 p-10 py-5'>
			<div className='items-left flex w-2/3 flex-col gap-9 p-8 font-obraletra text-base text-title-200'>
				<h1 className='text-left font-cardinal text-2xl first-letter:text-title-100'>
					{ReservationData.title}
				</h1>
				<p>{ReservationData.description}</p>
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
				{/*{ReservationData.image}*/}
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
export default ReservationCardComponent
