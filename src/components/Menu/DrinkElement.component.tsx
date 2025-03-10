import { getDrinkList } from '@/app/actions/services/DrinksData/getDrinkList.service' // Importing the function to get the list of drinks
import { formatDrinkName } from '@/utils/FormatDrinksName' // Importing the DrinkDivComponent
import Image from 'next/image'

// Defining the Drink interface
interface Drink {
	id: string // Unique identifier for the drink
	title: string // Title of the drink
	description: string // Description of the drink
	image: string
	price: number
	collection: string
}

// Defining the RecordModel interface, which represents the structure of a record
interface RecordModel {
	id: string // Unique identifier for the record
	title: string // Title of the record
	description: string // Description of the record
	image: string
	price: number
	collection: string
}

// Defining the response structure from the drink API
interface DrinkListResponse {
	items: RecordModel[] // Array of drink records
}

// Function to map RecordModel to the Drink interface
const mapRecordToDrink = (
	record: RecordModel,
	collection_name: string
): Drink => {
	return {
		collection: collection_name,
		description: record.description || 'Default Description', // Provide default description if missing
		id: record.id, // The id remains the same
		image: record.image,
		price: record.price,
		title: record.title || 'Default Title', // Provide default title if missing
	}
}

// Update the props interface
interface DrinkElementProps {
	readonly collection_name: string
	readonly priceDisplay?: 'global' | 'individual'
}

// The main DrinkElement component
export default async function DrinkElement({
	collection_name,
	priceDisplay = 'global',
}: DrinkElementProps) {
	// Fetching the drink list based on the collection name
	const data = (await getDrinkList(
		collection_name
	)) as unknown as DrinkListResponse

	// If the data is invalid, return an error message
	if (!data || !Array.isArray(data.items)) {
		return <div>Error: Invalid data</div>
	}

	// Map the records to the Drink interface
	const drinks = data.items.map(record =>
		mapRecordToDrink(record, collection_name)
	)

	// Use first item's price for global display
	const globalPrice = drinks[0]?.price || 0

	return (
		<div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
			{/* Title and global price section */}
			<div className='mb-16 flex flex-col items-center justify-center'>
				<h2 className='text-center font-cardinal text-8xl text-customBrown-100 first-letter:text-customRed-100 max-sm:text-6xl'>
					{formatDrinkName(collection_name)}
				</h2>

				{/* Global price display (for cocktails, mocktails, etc.) */}
				{priceDisplay === 'global' && globalPrice > 0 && (
					<div className='mt-4 flex items-center justify-center gap-2 rounded-full border-2 border-customBrown-100 bg-yellow-100/20 px-6 py-3 shadow-lg'>
						<span className='font-cardoRegular text-xl font-semibold text-customBrown-100'>
							{globalPrice}€
						</span>
						<Image
							src='/assets/images/elements/piece.webp'
							alt="Pièce d'or"
							width={24}
							height={24}
							className='h-6 w-6'
						/>
					</div>
				)}
			</div>

			{/* Drinks grid */}
			<div className='space-y-24'>
				{/* Render each drink */}
				{drinks.map((drink, index) => (
					<div key={drink.id || drink.title} className='w-full'>
						<div
							className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 ${
								index % 2 !== 0 ? 'lg:grid-flow-dense' : ''
							}`}
						>
							{/* Image section */}
							<div
								className={`flex justify-center ${
									index % 2 !== 0 ? 'lg:col-start-2' : ''
								}`}
							>
								{drink.image && (
									<Image
										src={drink.image}
										alt={drink.title}
										width={250}
										height={250}
										className='max-w-[250px] rounded-lg object-cover'
									/>
								)}
							</div>

							{/* Content section */}
							<div className='flex flex-col space-y-4'>
								<div className='flex flex-wrap items-start justify-between gap-4'>
									<h3 className='font-cardinal text-4xl text-customBrown-100 first-letter:text-customRed-100'>
										{drink.title}
									</h3>

									{/* Individual price display */}
									{priceDisplay === 'individual' && drink.price > 0 && (
										<div className='flex items-center justify-center gap-1 rounded-full border-2 border-customBrown-100 bg-yellow-100/20 px-4 py-1.5 shadow-md'>
											<span className='font-cardoRegular text-lg font-medium text-customBrown-100'>
												{drink.price}€
											</span>
											<Image
												src='/assets/images/elements/piece.webp'
												alt="Pièce d'or"
												width={20}
												height={20}
												className='h-5 w-5'
											/>
										</div>
									)}
								</div>

								<p className='font-cardoRegular text-base text-customBrown-100 lg:text-lg'>
									{drink.description}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
