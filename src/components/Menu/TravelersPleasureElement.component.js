import Image from 'next/image'

const TravelersPleasureElement = () => {
	return (
		<div className='flex w-3/4 flex-col items-center justify-center gap-20'>
			<h2 className='font-cardinal text-8xl text-title-200 first-letter:text-title-100'>
				Les Plaisirs Du Voyageur
			</h2>
			<div className='flex justify-center gap-28'>
				<div className='flex w-1/3 flex-col justify-center gap-14'>
					<h2 className='font-cardinal text-4xl text-title-200 first-letter:text-title-100'>
						Festin des Elfes
					</h2>
					<p className='font-obraletra text-base text-title-200'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut
						turpis dictum, feugiat justo nec, ultrices urna. Curabitur ut ipsum
						et libero pretium viverra. .
					</p>
				</div>
				<Image
					src='/assets/images/Cocktails/Cocktail1.jpg'
					alt='LTDA Logo'
					className='w-1/3 rounded'
					width={400}
					height={400}
				/>
				<div className='flex w-1/3 flex-col justify-center gap-14'>
					<h2 className='font-cardinal text-4xl text-title-200 first-letter:text-title-100'>
						Festin des Elfes
					</h2>
					<p className='font-obraletra text-base text-title-200'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut
						turpis dictum, feugiat justo nec, ultrices urna. Curabitur ut ipsum
						et libero pretium viverra. .
					</p>
				</div>
			</div>
		</div>
	)
}

export default TravelersPleasureElement
