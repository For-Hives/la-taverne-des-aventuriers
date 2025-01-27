import Image from 'next/image'

interface Drink {
	title: string
	description: string
}

export default function DrinkDivComponent({
	drink,
	isInverted = false,
}: {
	readonly drink: Drink
	readonly isInverted?: boolean
}) {
	return (
		<div className={`flex flex-col items-center justify-center px-4 sm:px-8`}>
			<div
				className={`flex w-full flex-col items-center justify-center sm:flex-row ${
					isInverted ? 'sm:flex-row-reverse' : 'sm:flex-row'
				}`}
			>
				{/* Image Section */}
				<div className='mb-4 w-full sm:mb-0 sm:w-1/3'>
					<Image
						src='/assets/images/Cocktails/Cocktail1.jpg'
						alt='Drink Image'
						className='rounded'
						width={400}
						height={400}
					/>
				</div>

				{/* Text Section */}
				<div className='flex w-full flex-col gap-6 sm:w-2/3 sm:gap-9'>
					<h2 className='font-cardinal text-3xl text-title-200 first-letter:text-title-100 sm:text-4xl'>
						{drink.title}
					</h2>
					<p className='font-obraletra text-base text-title-200 sm:text-xs'>
						{drink.description}
					</p>
				</div>
			</div>
		</div>
	)
}
