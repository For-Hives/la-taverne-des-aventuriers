import Image from 'next/image'

export default async function DrinkDivComponent({
	drink,
	isInverted = false,
}: {
	// todo: add interface for drink
	drink: any
	isInverted?: boolean
}) {
	return (
		<div className={`flex flex-col items-center justify-center`}>
			<div
				className={`flex items-center justify-center ${isInverted ? 'flex-row-reverse' : 'flex-row'}`}
			>
				<div className='w-1/3'>
					<Image
						src='/assets/images/Drinks/Drink1.jpg'
						alt='LTDA Logo'
						className='rounded'
						width={400}
						height={400}
					/>
				</div>
				<div className='flex w-2/3 flex-col gap-9'>
					<h2 className='font-cardinal text-4xl text-title-200 first-letter:text-title-100'>
						{drink.drink_title}
					</h2>
					<p className='font-obraletra text-xs text-title-200'>
						{drink.drink_description}
					</p>
				</div>
			</div>
		</div>
	)
}
