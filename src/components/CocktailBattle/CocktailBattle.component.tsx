'use client'

import { CocktailBattleData } from '@/app/actions/services/getCocktailBattlePageData.service'
import { CocktailCard } from '@/components/CocktailBattle/CocktailCard'
import { ScoreCounter } from '@/components/CocktailBattle/ScoreCounter'

// Define props for the counter component
export interface CountGroupProps {
	groupCount: number
}

// Define props for the score counter
export interface ScoreCounterProps {
	data: number
}

// Main battle component
export default function CocktailBattleComponent({
	data,
}: Readonly<{
	data: CocktailBattleData
}>) {
	return (
		<div className='container mx-auto max-w-6xl px-4'>
			{/* Title */}
			<h1 className='mb-16 text-center font-cardinal text-8xl text-customBrown-100 first-letter:text-customRed-100 max-md:text-5xl'>
				Cocktail Battle!
			</h1>

			{/* Main battle section */}
			<div className='relative flex items-center justify-center gap-8 max-lg:flex-col'>
				{/* First cocktail */}
				<CocktailCard
					title={data.cocktail1_title}
					description={data.cocktail1_description}
					image={data.cocktail_1_image}
				/>

				{/* VS Badge */}
				<div className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 max-lg:static max-lg:translate-x-0 max-lg:translate-y-0'>
					<div className='relative'>
						<div className='absolute -inset-8 rounded-full bg-gradient-to-r from-customBrown-100/30 to-customRed-100/30 blur-xl' />
						<span className='relative font-cardinal text-7xl font-bold text-customBrown-100 drop-shadow-lg'>
							VS
						</span>
					</div>
				</div>

				{/* Second cocktail */}
				<CocktailCard
					title={data.cocktail2_title}
					description={data.cocktail2_description}
					image={data.cocktail_2_image}
				/>
			</div>

			{/* Score section */}
			<div className='mt-12 flex justify-center gap-8 max-lg:flex-col max-lg:items-center'>
				<div className='flex flex-col items-center gap-4'>
					<h3 className='font-cardinal text-2xl text-customBrown-100'>
						{data.cocktail1_title}
					</h3>
					<ScoreCounter data={data.cocktail1_score} />
				</div>
				<div className='flex flex-col items-center gap-4'>
					<h3 className='font-cardinal text-2xl text-customBrown-100'>
						{data.cocktail2_title}
					</h3>
					<ScoreCounter data={data.cocktail2_score} />
				</div>
			</div>
		</div>
	)
}
