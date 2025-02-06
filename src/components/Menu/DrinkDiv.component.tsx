import Image from 'next/image'

interface Drink {
	title: string // Title of the drink
	description: string // Description of the drink
	image: string
}

export default function DrinkDivComponent({
																						drink,
																						isInverted = false, // Boolean to control the layout inversion (default is false)
																					}: {
	readonly drink: Drink
	readonly isInverted?: boolean // Optional prop to reverse layout direction
}) {
	const hasImage = drink.image && drink.image !== ''

	return (
		<div className='w-full px-4 sm:px-8'>
			{/* Container with grid layout */}
			<div className={`justify-center items-center grid w-full grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4`}>
				{/* Image Section */}
				{hasImage && (
					<div
						className={`w-full col-span-1 flex justify-center items-center sm:col-span-1 sm:px-4 ${
							isInverted ? 'sm:order-2' : 'sm:order-1'
						}`}
					>
						<Image
							src={drink.image} // Path to the image
							alt={drink.title} // Alt text for accessibility
							className='rounded w-1/2'
							width={400} // Set width of the image
							height={400} // Set height of the image
						/>
					</div>
				)}

				{/* Text Section */}
				<div
					className={`${
						hasImage ? 'sm:col-span-2' : 'sm:col-span-3' // If there's no image, text takes 3 columns
					} flex flex-col gap-9 sm:px-4 ${
						isInverted ? 'sm:order-1' : 'sm:order-2'
					}`}
				>
					{/* Drink title */}
					<h2 className='font-cardinal text-3xl text-customBrown-100 first-letter:text-customRed-100 sm:text-4xl'>
						{drink.title}
					</h2>
					{/* Drink description */}
					<p className='font-cardoRegular text-base text-customBrown-100 sm:text-lg'>
						{drink.description}
					</p>
				</div>
			</div>
		</div>
	)
}
