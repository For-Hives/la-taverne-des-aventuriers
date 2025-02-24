import { getTravelersPleasureData } from '@/app/actions/services/DrinksData/getTravelersPleasureData.service'
import Image from 'next/image'

export default async function TravelersPleasureElement() {
	const data = await getTravelersPleasureData()
	// Assume there are two objects in travelersPleasureData, one for each side
	const leftText = data[0]
	const rightText = data[1]
	const imageSrc = '/assets/images/Cocktail1.webp'

	return (
		<div className='flex w-4/5 flex-col items-center justify-center gap-20 px-4'>
			<h2 className='font-cardinal text-4xl text-customBrown-100 first-letter:text-customRed-100 sm:text-6xl md:text-8xl'>
				Les Plaisirs Du Voyageur
			</h2>

			<div className='flex h-full w-full items-center justify-center'>
				<div className='grid h-full w-full grid-cols-10 grid-rows-10 gap-1 rounded-lg p-2'>
					<div className='col-span-3 row-span-10 flex flex-col items-start justify-center gap-6 rounded-lg max-lg:col-span-10 max-lg:row-span-3'>
						<h2 className='font-cardinal text-3xl text-customBrown-100 first-letter:text-customRed-100 sm:text-4xl'>
							{leftText.title}
						</h2>
						<p className='font-cardoRegular text-base text-customBrown-100 sm:text-lg'>
							{leftText.description}
						</p>
					</div>

					<div className='col-span-4 row-span-10 flex items-center justify-center rounded-lg max-lg:col-span-10 max-lg:row-span-4'>
						<Image
							src={imageSrc}
							alt='Cocktail Image'
							className='w-full rounded-lg sm:w-2/3'
							width={400}
							height={400}
						/>
					</div>

					<div className='col-span-3 row-span-10 flex flex-col items-start justify-center gap-6 rounded-lg max-lg:col-span-10 max-lg:row-span-3'>
						<h2 className='font-cardinal text-3xl text-customBrown-100 first-letter:text-customRed-100 sm:text-4xl'>
							{rightText.title}
						</h2>
						<p className='font-cardoRegular text-base text-customBrown-100 sm:text-lg'>
							{rightText.description}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
