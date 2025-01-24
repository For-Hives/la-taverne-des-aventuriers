import { getDrinkList } from '@/app/actions/getDrinksService'
import DrinkDivComponent from '@/components/Menu/DrinkDiv.component'

export default async function DrinkElement({
	collection_name,
}: {
	readonly collection_name: string
}) {
	const data = await getDrinkList(collection_name)

	return (
		<div className='flex w-3/4 flex-col items-center justify-center gap-20'>
			<h2 className='font-cardinal text-8xl text-title-200 first-letter:text-title-100'>
				{collection_name}
			</h2>
			<div className='flex flex-col justify-center gap-28'>
				{data.items.map((drink, index) => (
					<DrinkDivComponent
						key={index}
						drink={drink}
						isInverted={index % 2 !== 0}
					/>
				))}
			</div>
		</div>
	)
}
