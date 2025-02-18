import { CocktailBattleData } from '@/app/actions/services/getCocktailBattlePageData.service'
import ScoreCounterComponent from "@/components/CocktailBattle/Counter.component";
import Image from 'next/image'

export default function CocktailVersusComponent({
	data,
}: Readonly<{
	data: CocktailBattleData
}>) {

	const Cocktail1score = data.cocktail1_score
	const Cocktail2score = data.cocktail2_score

	return (
		<div className='flex h-fit w-full items-stretch justify-center gap-4 px-20 font-cardoRegular text-lg text-customBrown-100 max-md:flex-col'>
			{/* Column 1 */}
			<div className='min-h-screen relative flex flex-col h-fit w-1/2 items-end justify-center max-md:w-full max-md:gap-20'>
				<div className='relative min-h-screen flex flex-col w-full h-full items_center justify-end max-md:w-full'>
					{/* Image */}
					<div className='absolute inset-0 z-0'>
						<Image
							src={data.cocktail_1_image}
							alt={data.cocktail1_title}
							fill
							className='object-cover'
						/>
					</div>

					{/* Text */}
					<div
						className='relative z-10 flex min-h-[25vh] w-full flex-col justify-center gap-9 bg-black/30 px-4 rounded '>
						<h2 className='font-cardinal text-3xl first-letter:text-customRed-100'>
							{data.cocktail1_title}
						</h2>
						<p>
						<span
							dangerouslySetInnerHTML={{
								__html: data.cocktail1_description,
							}}
						/>
						</p>
					</div>

				</div>

				{/* Score Counter*/}
				<div className='relative z-10 w-full h-fit flex justify-center mt-4'>
					<ScoreCounterComponent data={Cocktail1score} />
				</div>
			</div>
			{/* Column */}
			<div className='min-h-screen relative flex flex-col h-full w-1/2 items-end justify-center max-md:w-full'>
				<div className='relative min-h-screen flex flex-col w-full h-full items_center justify-end max-md:w-full'>
					{/* Image*/}
					<div className='absolute inset-0 z-0'>
						<Image
							src={data.cocktail_2_image}
							alt={data.cocktail2_title}
							fill
							className='object-cover'
						/>
					</div>

					{/* text */}
					<div
						className='relative z-10 flex min-h-[25vh] w-full flex-col justify-center gap-9 bg-black/30 px-4 rounded '>
						<h2 className='font-cardinal text-3xl first-letter:text-customRed-100'>
							{data.cocktail2_title}
						</h2>
						<p>
						<span
							dangerouslySetInnerHTML={{
								__html: data.cocktail2_description,
							}}
						/>
						</p>
					</div>

				</div>

				{/* Score Counter */}
				<div className='relative z-10 w-full flex justify-center mt-4'>
					<ScoreCounterComponent data={Cocktail2score} />
				</div>
			</div>

		</div>
	)
}
