import { CocktailBattleData } from '@/app/actions/services/getCocktailBattlePageData.service'

import { CocktailCard } from './CocktailCard'
import { ScoreCounter } from './ScoreCounter'

export default function CocktailBattleComponent({
	data,
}: {
	data: CocktailBattleData
}) {
	return (
		<div className='container mx-auto max-w-6xl px-4 pb-12 lg:pb-36'>
			<h1 className='mb-16 text-center font-cardinal text-8xl text-customBrown-100 first-letter:text-customRed-100 max-md:text-5xl'>
				Bataille de Cocktails!
			</h1>

			<div
				className={
					'prose prose-customBrown mx-auto mb-24 max-w-6xl text-center'
				}
				dangerouslySetInnerHTML={{ __html: data.explanation }}
			/>

			<div className='relative flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-16'>
				<div className='flex flex-col items-center gap-8'>
					<CocktailCard
						title={data.cocktail1_title}
						description={data.cocktail1_description}
						image={data.cocktail_1_image}
					/>
					<div className='flex flex-col items-center gap-4'>
						<ScoreCounter
							data={data.cocktail1_score}
							title={data.cocktail1_title}
						/>
					</div>
				</div>

				{/* Badge VS */}
				<div className='lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2'>
					<div className='relative mb-8 lg:mb-72'>
						<div className='absolute -inset-8 rounded-full bg-gradient-to-r from-customBrown-100/30 to-customRed-100/30 blur-xl' />
						<span className='relative font-cardinal text-7xl font-bold text-customBrown-100 drop-shadow-lg'>
							VS
						</span>
					</div>
				</div>

				<div className='flex flex-col items-center gap-8'>
					<CocktailCard
						title={data.cocktail2_title}
						description={data.cocktail2_description}
						image={data.cocktail_2_image}
					/>
					<div className='flex flex-col items-center gap-4'>
						<ScoreCounter
							data={data.cocktail2_score}
							title={data.cocktail2_title}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
