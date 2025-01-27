import Image from 'next/image'

const TravelersPleasureElement = () => {
	return (
		<div className='flex w-full flex-col items-center justify-center gap-20 px-4'>
			<h2 className='font-cardinal text-4xl text-title-200 first-letter:text-title-100 sm:text-6xl lg:text-8xl'>
				Les Plaisirs Du Voyageur
			</h2>
			<div className='flex flex-col justify-center gap-10 sm:flex-row sm:gap-20'>
				<div className='flex w-full flex-col justify-center gap-14 sm:w-1/3'>
					<h2 className='font-cardinal text-3xl text-title-200 first-letter:text-title-100 sm:text-4xl'>
						Festin des Elfes
					</h2>
					<p className='font-obraletra text-base text-title-200 sm:text-lg'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut
						turpis dictum, feugiat justo nec, ultrices urna. Curabitur ut ipsum
						et libero pretium viverra.
					</p>
				</div>

				<Image
					src='/assets/images/Cocktails/Cocktail1.jpg'
					alt='Cocktail Image'
					className='w-full rounded-lg sm:w-1/3'
					width={400}
					height={400}
				/>

				<div className='flex w-full flex-col justify-center gap-14 sm:w-1/3'>
					<h2 className='font-cardinal text-3xl text-title-200 first-letter:text-title-100 sm:text-4xl'>
						Festin des Elfes
					</h2>
					<p className='font-obraletra text-base text-title-200 sm:text-lg'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut
						turpis dictum, feugiat justo nec, ultrices urna. Curabitur ut ipsum
						et libero pretium viverra.
					</p>
				</div>
			</div>
		</div>
	)
}

export default TravelersPleasureElement
