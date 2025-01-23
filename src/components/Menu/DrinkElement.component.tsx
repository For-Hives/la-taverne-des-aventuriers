import { getDrinkList } from '@/app/actions/getDrinksService'
import CocktailDivComponent from '@/components/Menu/CocktailDiv.component'

export default async function DrinkElement({
	collection_name,
}: {
	collection_name: string
}) {
	const data = await getDrinkList(collection_name)

	return (
		<div className='flex w-3/4 flex-col items-center justify-center gap-20'>
			<h2 className='font-cardinal text-8xl text-title-200 first-letter:text-title-100'>
				{collection_name}
			</h2>
			<div className='flex flex-col justify-center gap-28'>
				{data.items.map((drink, index) => {
					return (
						<CocktailDivComponent
							key={index}
							order={index}
							isInverted={index % 2 !== 0}
							collection={drink.collectionName}
						/>
					)
				})}
			</div>
		</div>
	)
}
