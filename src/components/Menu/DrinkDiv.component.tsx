import Image from 'next/image'

interface Drink {
	title: string // Title of the drink
	description: string // Description of the drink
}

export default function DrinkDivComponent({
	drink,
	isInverted = false, // Boolean to control the layout inversion (default is false)
}: {
	readonly drink: Drink
	readonly isInverted?: boolean // Optional prop to reverse layout direction
}) {
	return (
		<div className={`flex flex-col items-center justify-center px-4 sm:px-8`}>
			{/* Container for the drink, with optional layout inversion for small screens */}
			<div
				className={`flex w-full flex-col items-center justify-center sm:flex-row ${
					isInverted ? 'sm:flex-row-reverse' : 'sm:flex-row'
				}`}
			>
				{/* Image Section */}
				<div className='mb-4 w-full sm:mb-0 sm:w-1/3'>
					{/* Drink image */}
					<Image
						src='/assets/images/Cocktails/Cocktail1.jpg' // Path to the image
						alt={drink.title} // Alt text for accessibility
						className='rounded' // Apply rounded corners to the image
						width={400} // Set width of the image
						height={400} // Set height of the image
					/>
				</div>

				{/* Text Section */}
				<div className='flex w-full flex-col gap-6 sm:w-2/3 sm:gap-9'>
					{/* Drink title */}
					<h2 className='font-cardinal text-3xl text-customBrown-100 first-letter:text-customRed-100 sm:text-4xl'>
						{drink.title}
					</h2>
					{/* Drink description */}
					<p className='font-obraletra text-base text-customBrown-100 sm:text-xs'>
						{drink.description}
					</p>
				</div>
			</div>
		</div>
	)
}
