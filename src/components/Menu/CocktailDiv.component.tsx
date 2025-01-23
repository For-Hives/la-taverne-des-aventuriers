import { getCocktailByOrder } from '@/app/actions/getCocktailsService'
import Image from 'next/image'

interface CocktailDivComponentProps {
	isInverted?: boolean
	order: number
	collection: string
}

export default async function CocktailDivComponent({
	collection,
	isInverted = false,
	order,
}: Readonly<CocktailDivComponentProps>) {
	const data = await getCocktailByOrder(order, collection)

	const Element = {
		cocktail_description: data.description,
		cocktail_image: data.image,
		cocktail_title: data.title,
	}

	return (
		<div className={`flex flex-col items-center justify-center`}>
			<div
				className={`flex items-center justify-center ${isInverted ? 'flex-row-reverse' : 'flex-row'}`}
			>
				<div className='w-1/3'>
					<Image
						src='/assets/images/Cocktails/Cocktail1.jpg'
						alt='LTDA Logo'
						className='rounded'
						width={400}
						height={400}
					/>
				</div>
				<div className='flex w-2/3 flex-col gap-9'>
					<h2 className='font-cardinal text-4xl text-title-200 first-letter:text-title-100'>
						{Element.cocktail_title}
					</h2>
					<p className='font-obraletra text-xs text-title-200'>
						{Element.cocktail_description}
					</p>
				</div>
			</div>
		</div>
	)
}
