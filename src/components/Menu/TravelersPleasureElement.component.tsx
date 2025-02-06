import { getTravelersPleasureData } from '@/app/actions/services/DrinksData/getTravelersPleasureData.service'
import Image from 'next/image'

export default async function TravelersPleasureElement() {
	const data = await getTravelersPleasureData()
	// Assume there are two objects in travelersPleasureData, one for each side
	const leftText = data[0]
	const rightText = data[1]
	const imageSrc = '/assets/images/Cocktails/Cocktail1.jpg'

	return (
		<div className='flex w-4/5 flex-col items-center justify-center gap-20 px-4'>
			<h2 className='font-cardinal text-4xl text-customBrown-100 first-letter:text-customRed-100 sm:text-6xl lg:text-8xl'>
				Les Plaisirs Du Voyageur
			</h2>
			<div className='flex w-full flex-col items-center justify-center gap-10 sm:gap-20 lg:flex-row'>
				{/* Left Column (Text 1) */}
				<div className='flex w-full flex-col justify-center gap-14 sm:w-1/3'>
					<h2 className='font-cardinal text-3xl text-customBrown-100 first-letter:text-customRed-100 sm:text-4xl'>
						{leftText.title}
					</h2>
					<p className='font-cardoRegular text-base text-customBrown-100 sm:text-lg'>
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
					<h2 className='font-cardinal text-3xl text-customBrown-100 first-letter:text-customRed-100 sm:text-4xl'>
						{rightText.title}
					</h2>
					<p className='font-cardoRegular text-base text-customBrown-100 sm:text-lg'>
						{rightText.description}
					</p>
				</div>
			</div>
		</div>
	)
}
