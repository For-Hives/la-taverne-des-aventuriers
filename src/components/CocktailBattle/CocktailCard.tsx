import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

export function CocktailCard({
	description,
	image,
	title,
}: {
	title: string
	description: string
	image: string
}) {
	// Parse ingredients from HTML description
	const getIngredientsFromDescription = (desc: string) => {
		// Remove HTML tags and decode HTML entities
		const cleanDescription = desc
			.replace(/<\/?p>/g, '\n') // Replace <p> tags with newlines
			.replace(/<[^>]*>/g, '') // Remove any other HTML tags
			.replace(/&eacute;/g, 'é')
			.replace(/&egrave;/g, 'è')
			.replace(/&agrave;/g, 'à')
			.replace(/&nbsp;/g, ' ')
			.trim()

		// Split by newlines and filter empty lines
		return cleanDescription
			.split('\n')
			.map(line => line.trim())
			.filter(line => line.length > 0)
	}

	const ingredients = getIngredientsFromDescription(description)

	return (
		<Card className='group relative h-[600px] w-[400px] cursor-pointer overflow-hidden border-2 border-customBrown-100/20 p-0 transition-all hover:border-customBrown-100/40 max-lg:h-[500px] max-lg:w-full'>
			<div className='absolute inset-0'>
				<Image
					src={image}
					alt={title}
					fill
					className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
				/>
			</div>

			<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />

			<div className='absolute inset-x-0 bottom-0 p-6 text-white'>
				<h2 className='mb-4 font-cardinal text-3xl'>{title}</h2>
				<div className='mb-4 flex flex-wrap gap-2'>
					{ingredients.map((ingredient, index) => (
						<Badge
							key={index}
							className='border-white/30 bg-black/30 text-base text-white backdrop-blur-sm'
							variant='outline'
						>
							{ingredient}
						</Badge>
					))}
				</div>
			</div>
		</Card>
	)
}
