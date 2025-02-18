import { CocktailBattleData } from '@/app/actions/services/getCocktailBattlePageData.service'
import { CocktailCard } from '@/components/CocktailBattle/CocktailCard'
import { ScoreCounter } from '@/components/CocktailBattle/ScoreCounter'
import { VsBadge } from '@/components/CocktailBattle/VsBadge'

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
}: {
	data: CocktailBattleData
}) {
	return (
		<div className='container mx-auto max-w-6xl px-4'>
			<h1 className='mb-16 text-center font-cardinal text-8xl text-customBrown-100 first-letter:text-customRed-100 max-md:text-5xl'>
				Bataille de Cocktails!
			</h1>

			<div className='relative flex items-center justify-center gap-16 max-lg:flex-col'>
				<CocktailCard
					title={data.cocktail1_title}
					description={data.cocktail1_description}
					image={data.cocktail_1_image}
				/>

				<VsBadge />

				<CocktailCard
					title={data.cocktail2_title}
					description={data.cocktail2_description}
					image={data.cocktail_2_image}
				/>
			</div>

			<div className='mt-12 flex justify-center gap-8 max-lg:flex-col max-lg:items-center'>
				<div className='flex flex-col items-end justify-center gap-4'>
					<ScoreCounter data={data.cocktail1_score} />
				</div>
				<div className='flex flex-col items-center gap-4'>
					<ScoreCounter data={data.cocktail2_score} />
				</div>
			</div>
		</div>
	)
}
