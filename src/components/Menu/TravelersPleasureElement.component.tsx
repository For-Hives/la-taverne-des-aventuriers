'use client'
import {
	TravelersPleasureData,
	getTravelersPleasureData,
} from '@/app/actions/services/getDrinkData.service'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function TravelersPleasureElement() {
	// State to manage the data
	const [travelersPleasureData, setTravelersPleasureData] = useState<
		TravelersPleasureData[] | null
	>(null)

	useEffect(() => {
		const fetchTravelersPleasureData = async () => {
			try {
				const data = await getTravelersPleasureData()
				setTravelersPleasureData(data)
			} catch (error) {
				console.error('Error fetching the data:', error)
			}
		}
		fetchTravelersPleasureData()
	}, [])

	// Check if the data has been fetched before displaying it
	if (!travelersPleasureData) {
		return <div>Loading...</div>
	}

	// Assume there are two objects in travelersPleasureData, one for each side
	const leftText = travelersPleasureData[0]
	const rightText = travelersPleasureData[1]
	const imageSrc = '/assets/images/Cocktails/Cocktail1.jpg'

	return (
		<div className='flex w-full flex-col items-center justify-center gap-20 px-4'>
			<h2 className='text-customBrown-100 first-letter:text-customRed-100 font-cardinal text-4xl sm:text-6xl lg:text-8xl'>
				Les Plaisirs Du Voyageur
			</h2>
			<div className='flex w-full flex-col items-center justify-center gap-10 sm:gap-20 lg:flex-row'>
				{/* Left Column (Text 1) */}
				<div className='flex w-full flex-col justify-center gap-14 sm:w-1/3'>
					<h2 className='text-customBrown-100 first-letter:text-customRed-100 font-cardinal text-3xl sm:text-4xl'>
						{leftText.title}
					</h2>
					<p className='text-customBrown-100 font-obraletra text-base sm:text-lg'>
						{leftText.description}
					</p>
				</div>

				{/* Image in the center */}
				<Image
					src={imageSrc}
					alt='Cocktail Image'
					className='w-full rounded-lg sm:w-1/3'
					width={400}
					height={400}
				/>

				{/* Right Column (Text 2) */}
				<div className='flex w-full flex-col justify-center gap-14 sm:w-1/3'>
					<h2 className='text-customBrown-100 first-letter:text-customRed-100 font-cardinal text-3xl sm:text-4xl'>
						{rightText.title}
					</h2>
					<p className='text-customBrown-100 font-obraletra text-base sm:text-lg'>
						{rightText.description}
					</p>
				</div>
			</div>
		</div>
	)
}
