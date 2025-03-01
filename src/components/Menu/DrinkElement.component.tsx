import { getDrinkList } from '@/app/actions/services/DrinksData/getDrinkList.service' // Importing the function to get the list of drinks
import DrinkDivComponent from '@/components/Menu/DrinkDiv.component'
import { formatDrinkName } from '@/utils/FormatDrinksName' // Importing the DrinkDivComponent
import Image from 'next/image'

// Defining the Drink interface
interface Drink {
	id: string // Unique identifier for the drink
	title: string // Title of the drink
	description: string // Description of the drink
	image: string
}

// Defining the RecordModel interface, which represents the structure of a record
interface RecordModel {
	id: string // Unique identifier for the record
	title: string // Title of the record
	description: string // Description of the record
	image: string
	price: number
}

// Defining the response structure from the drink API
interface DrinkListResponse {
	items: RecordModel[] // Array of drink records
}

// Function to map RecordModel to the Drink interface
const mapRecordToDrink = (record: RecordModel): Drink => {
	return {
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
	collection_name, // The name of the drink collection passed as a prop
	priceDisplay = 'global', // Default to global for cocktails, mocktails, etc.
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
	const drinks = data.items.map(mapRecordToDrink)

	// Use first item's price for global display
	const globalPrice = drinks[0]?.price || 0

	return (
		<div className='flex w-3/4 flex-col items-center justify-center gap-20 max-lg:w-full max-lg:px-4'>
			{/* Title of the page, formatted based on the collection name */}
			<div className='flex flex-col items-center'>
				<h2 className='font-cardinal text-8xl text-customBrown-100 first-letter:text-customRed-100 max-sm:text-5xl'>
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

			<div className='flex flex-col justify-center gap-28'>
				{/* Render each drink component */}
				{drinks.map((drink, index) => (
					<DrinkDivComponent
						key={drink.id || drink.title} // Use the drink id or title as the key
						drink={drink} // Pass the drink object as a prop
						isInverted={index % 2 !== 0} // Invert layout for odd-indexed drinks
						priceDisplay={priceDisplay} // Pass the price display mode
					/>
				))}
			</div>
		</div>
	)
}
