import { getDrinkList } from '@/app/actions/getDrinksService'
import DrinkDivComponent from '@/components/Menu/DrinkDiv.component'

export default async function DrinkElement({
	collection_name,
}: {
	readonly collection_name: string
}) {
	// Fonction pour formater les noms des collections
	const formatDrinkName = (drink: string) => {
		if (drink === 'Short_long_drinks') {
			return 'Short / Long Drinks' // Cas particulier
		}
		// Remplace les underscores par des espaces et met la première lettre de chaque mot en majuscule
		return drink
			.replaceAll('_', ' ') // Remplace les underscores
			.replace(/(?:^|\s)\S/g, match => match.toUpperCase()) // Met en majuscule les premières lettres
	}

	const data = await getDrinkList(collection_name)

	return (
		<div className='flex w-3/4 flex-col items-center justify-center gap-20'>
			{/* Affichage du nom formaté */}
			<h2 className='font-cardinal text-8xl text-title-200 first-letter:text-title-100'>
				{formatDrinkName(collection_name)} {/* Utilisation du formatage */}
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
