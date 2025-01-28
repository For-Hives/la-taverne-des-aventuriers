'use client'
import {
	TravelersPleasureData,
	getTravelersPleasureData,
} from '@/app/actions/getDatasService'
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
			<h2 className='font-cardinal text-4xl text-title-200 first-letter:text-title-100 sm:text-6xl lg:text-8xl'>
				Les Plaisirs Du Voyageur
			</h2>
			<div className='flex w-full flex-col items-center justify-center gap-10 sm:gap-20 lg:flex-row'>
				{/* Left Column (Text 1) */}
				<div className='flex w-full flex-col justify-center gap-14 sm:w-1/3'>
					<h2 className='font-cardinal text-3xl text-title-200 first-letter:text-title-100 sm:text-4xl'>
						{leftText.title}
					</h2>
					<p className='font-obraletra text-base text-title-200 sm:text-lg'>
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
					<h2 className='font-cardinal text-3xl text-title-200 first-letter:text-title-100 sm:text-4xl'>
						{rightText.title}
					</h2>
					<p className='font-obraletra text-base text-title-200 sm:text-lg'>
						{rightText.description}
					</p>
				</div>
			</div>
		</div>
	)
}
