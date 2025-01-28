import { getDrinkList } from '@/app/actions/services/getDrinkData.service' // Importing the function to get the list of drinks
import DrinkDivComponent from '@/components/Menu/DrinkDiv.component' // Importing the DrinkDivComponent

// Defining the Drink interface
interface Drink {
	id: string // Unique identifier for the drink
	title: string // Title of the drink
	description: string // Description of the drink
}

// Defining the RecordModel interface, which represents the structure of a record
interface RecordModel {
	id: string // Unique identifier for the record
	title: string // Title of the record
	description: string // Description of the record
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
		title: record.title || 'Default Title', // Provide default title if missing
	}
}

// The main DrinkElement component
export default async function DrinkElement({
	collection_name, // The name of the drink collection passed as a prop
}: {
	readonly collection_name: string // The collection name must be a string
}) {
	// Function to format the collection name (e.g., replace underscores and capitalize the first letters)
	const formatDrinkName = (drink: string) => {
		if (drink === 'Short_long_drinks') {
			return 'Short / Long Drinks' // Special case for "Short_long_drinks"
		}
		return drink
			.replaceAll('_', ' ') // Replace underscores with spaces
			.replace(/(?:^|\s)\S/g, match => match.toUpperCase()) // Capitalize the first letter of each word
	}

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

	return (
		<div className='flex w-3/4 flex-col items-center justify-center gap-20'>
			{/* Title of the page, formatted based on the collection name */}
			<h2 className='first-letter:text-customRed-100 text-customBrown-100 font-cardinal text-8xl max-sm:text-5xl'>
				{formatDrinkName(collection_name)}
			</h2>
			<div className='flex flex-col justify-center gap-28'>
				{/* Render each drink component */}
				{drinks.map((drink, index) => (
					<DrinkDivComponent
						key={drink.id || drink.title} // Use the drink id or title as the key
						drink={drink} // Pass the drink object as a prop
						isInverted={index % 2 !== 0} // Invert layout for odd-indexed drinks
					/>
				))}
			</div>
		</div>
	)
}
