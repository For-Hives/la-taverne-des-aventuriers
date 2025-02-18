// Card component for displaying each cocktail
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
	return (
		<Card className='group relative h-[600px] w-[400px] cursor-pointer overflow-hidden border-2 border-customBrown-100/20 p-0 transition-all hover:border-customBrown-100/40 max-lg:h-[500px] max-lg:w-full'>
			{/* Background image */}
			<div className='absolute inset-0'>
				<Image
					src={image}
					alt={title}
					fill
					className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
				/>
			</div>

			{/* Text readability gradient */}
			<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />

			{/* Content */}
			<div className='absolute inset-x-0 bottom-0 p-6 text-white'>
				<h2 className='mb-4 font-cardinal text-3xl'>{title}</h2>
				<div
					className='prose prose-invert font-cardoRegular'
					dangerouslySetInnerHTML={{ __html: description }}
				/>
			</div>
		</Card>
	)
}
