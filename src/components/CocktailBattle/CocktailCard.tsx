import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

interface CocktailCardProps {
	title: string
	description: string
	image: string
	stars?: number
	inverted?: boolean
}

export function CocktailCard({
	description,
	image,
	inverted = false,
	stars = 0,
	title,
}: Readonly<CocktailCardProps>) {
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
		<Card className='group border-custom-brown-100/20 hover:border-custom-brown-100/40 relative h-[500px] w-[500px] overflow-hidden border-2 p-0 transition-all max-lg:h-[500px] max-lg:w-full'>
			<div className='absolute inset-0 flex w-full items-center justify-center'>
				<Image
					src={image}
					alt={title}
					fill
					className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
				/>
			</div>

			<div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent' />

			<div className='absolute inset-x-0 bottom-0 p-6 text-white'>
				<h2
					className={`mb-4 ${inverted ? 'text-left' : 'text-right'} font-cardinal text-3xl`}
				>
					{title}
				</h2>
				<div
					className={`mb-4 flex flex-wrap ${inverted ? 'justify-start' : 'justify-end'} gap-2`}
				>
					{ingredients.map((ingredient, index) => (
						<Badge
							key={index}
							className='border-white/30 bg-black/30 text-base text-white backdrop-blur-xs'
							variant='outline'
						>
							{ingredient}
						</Badge>
					))}
				</div>
			</div>

			{/* Étoile et compteur - seulement visible si stars > 0 */}
			{stars > 0 && (
				<div
					className={`absolute ${inverted ? 'left-3' : 'right-3'} top-3 flex items-center rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md transition-opacity duration-300 ease-in-out`}
					style={{
						backdropFilter: 'blur(8px)',
						boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
						WebkitBackdropFilter: 'blur(8px)',
					}}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='currentColor'
						className='h-5 w-5 text-yellow-300 drop-shadow-xs'
					>
						<path
							fillRule='evenodd'
							d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
							clipRule='evenodd'
						/>
					</svg>
					<span className='ml-1 text-lg font-bold text-white'>{stars}</span>
				</div>
			)}
		</Card>
	)
}
