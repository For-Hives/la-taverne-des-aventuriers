import { getDrinkList } from '@/app/actions/getDrinksService'
import DrinkDivComponent from '@/components/Menu/DrinkDiv.component'

interface Drink {
	id: string
	title: string
	description: string
}

interface RecordModel {
	id: string
	title: string
	description: string
}

interface DrinkListResponse {
	items: RecordModel[] // Changer ici si getDrinkList retourne directement un tableau RecordModel
}

const mapRecordToDrink = (record: RecordModel): Drink => {
	return {
		description: record.description || 'Description par défaut', // Utiliser description si elle existe, sinon valeur par défaut
		id: record.id,
		title: record.title || 'Titre par défaut', // Utiliser title si elle existe, sinon valeur par défaut
	}
}

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
		return drink
			.replaceAll('_', ' ') // Remplace les underscores
			.replace(/(?:^|\s)\S/g, match => match.toUpperCase()) // Met en majuscule les premières lettres
	}

	// Appel à la fonction getDrinkList
	const data = (await getDrinkList(
		collection_name
	)) as unknown as DrinkListResponse

	// Vérification de la structure des données retournées
	if (!data || !Array.isArray(data.items)) {
		// Si les données ne sont pas au bon format, renvoie une erreur ou une valeur par défaut
		return <div>Erreur : données non valides</div>
	}

	// Mappage des données de RecordModel vers Drink
	const drinks = data.items.map(mapRecordToDrink)

	return (
		<div className='flex w-3/4 flex-col items-center justify-center gap-20'>
			<h2 className='font-cardinal text-8xl text-title-200 first-letter:text-title-100'>
				{formatDrinkName(collection_name)}
			</h2>
			<div className='flex flex-col justify-center gap-28'>
				{drinks.map((drink, index) => (
					<DrinkDivComponent
						key={drink.id || drink.title} // Utilisation d'un identifiant unique
						drink={drink}
						isInverted={index % 2 !== 0} // Vérifie si l'index est impair directement
					/>
				))}
			</div>
		</div>
	)
}
